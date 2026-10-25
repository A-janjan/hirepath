"""SQLite persistence for Job Search Tracker. Standard library only."""
import os
import json
import sqlite3
import uuid
from datetime import date, timedelta
from pathlib import Path

import sample_model as M

BASE = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("DB_PATH", str(BASE / "data" / "jobsearch.db")))

APP_FIELDS = [
    "id", "company", "title", "category", "seniority", "location", "arrangement",
    "url", "source", "discovered", "applied", "status", "followup", "notes",
    "resume", "cover", "referral", "tailored", "hr_invited", "hr_completed",
    "tech_invited", "tech_completed", "final_invited", "final_completed",
    "offer_date", "closed_date", "is_sample", "created_at",
]
DAY_FIELDS = ["date", "discovered", "followups", "messages", "minutes", "notes", "is_sample"]

STAGE_KEYS = {"hri": "hr_invited", "hrd": "hr_completed", "ti": "tech_invited",
              "td": "tech_completed", "fi": "final_invited", "fd": "final_completed",
              "off": "offer_date", "closed": "closed_date"}


def connect():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(str(DB_PATH), timeout=20)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA journal_mode=WAL")
    con.execute("PRAGMA busy_timeout=10000")
    return con


def default_settings():
    today = date.today()
    start = today - timedelta(days=40)
    return {
        "categories": [{"name": n, "tier": t} for n, t in M.CATEGORIES],
        "statuses": [
            {"label": s[0], "stage": s[1], "outcome": s[2],
             "rejection": s[3], "response": s[4] == "Yes"}
            for s in M.STATUSES
        ],
        "resumes": list(M.RESUMES),
        "sources": list(M.SOURCES),
        "seniority": list(M.SENIORITY),
        "arrangements": list(M.ARRANGEMENT),
        "locations": ["Finland", "Germany", "Netherlands", "United Kingdom",
                      "Sweden", "Denmark", "Estonia", "Remote – EU"],
        "targets": {
            "daily_apps": 1,
            "daily_minutes": 45,
            "weekly_apps": 8,
            "weekly_days": 5,
            "no_response_days": 21,
            "min_sample": 10,
            "maturity_days": 21,
            "start_date": start.isoformat(),
            "followup_lead": 3,
        },
    }


def init_db():
    con = connect()
    con.executescript("""
        CREATE TABLE IF NOT EXISTS applications (
            id TEXT PRIMARY KEY, company TEXT NOT NULL DEFAULT '', title TEXT DEFAULT '',
            category TEXT DEFAULT '', seniority TEXT DEFAULT '', location TEXT DEFAULT '',
            arrangement TEXT DEFAULT '', url TEXT DEFAULT '', source TEXT DEFAULT '',
            discovered TEXT DEFAULT '', applied TEXT DEFAULT '', status TEXT DEFAULT '',
            followup TEXT DEFAULT '', notes TEXT DEFAULT '', resume TEXT DEFAULT '',
            cover TEXT DEFAULT 'No', referral TEXT DEFAULT 'No', tailored TEXT DEFAULT 'No',
            hr_invited TEXT DEFAULT '', hr_completed TEXT DEFAULT '',
            tech_invited TEXT DEFAULT '', tech_completed TEXT DEFAULT '',
            final_invited TEXT DEFAULT '', final_completed TEXT DEFAULT '',
            offer_date TEXT DEFAULT '', closed_date TEXT DEFAULT '',
            is_sample INTEGER DEFAULT 0, created_at TEXT DEFAULT ''
        );
        CREATE TABLE IF NOT EXISTS daily_log (
            date TEXT PRIMARY KEY, discovered INTEGER DEFAULT 0, followups INTEGER DEFAULT 0,
            messages INTEGER DEFAULT 0, minutes INTEGER DEFAULT 0, notes TEXT DEFAULT '',
            is_sample INTEGER DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE INDEX IF NOT EXISTS idx_app_applied ON applications(applied);
    """)
    row = con.execute("SELECT value FROM settings WHERE key='config'").fetchone()
    if row is None:
        con.execute("INSERT INTO settings(key,value) VALUES('config',?)",
                    (json.dumps(default_settings()),))
    seeded = con.execute("SELECT value FROM meta WHERE key='seeded'").fetchone()
    if seeded is None:
        seed_sample(con)
        con.execute("INSERT OR REPLACE INTO meta(key,value) VALUES('seeded','1')")
    con.commit()
    con.close()


# ---------------------------------------------------------------------------
# Settings
# ---------------------------------------------------------------------------
def get_settings(con):
    row = con.execute("SELECT value FROM settings WHERE key='config'").fetchone()
    cfg = json.loads(row["value"]) if row else default_settings()
    base = default_settings()
    for k, v in base.items():
        cfg.setdefault(k, v)
    for k, v in base["targets"].items():
        cfg["targets"].setdefault(k, v)
    return cfg


def save_settings(con, cfg):
    con.execute("INSERT OR REPLACE INTO settings(key,value) VALUES('config',?)",
                (json.dumps(cfg, ensure_ascii=False),))
    con.commit()
    return get_settings(con)


# ---------------------------------------------------------------------------
# Applications
# ---------------------------------------------------------------------------
def _row_to_app(r):
    return {k: r[k] for k in APP_FIELDS}


def all_applications(con):
    rows = con.execute("SELECT * FROM applications ORDER BY applied DESC, created_at DESC").fetchall()
    return [_row_to_app(r) for r in rows]


def upsert_application(con, rec):
    # A PUT may be partial; preserve omitted fields (including demo provenance).
    app_id = rec.get("id") or ("APP-" + uuid.uuid4().hex[:8].upper())
    existing = con.execute("SELECT * FROM applications WHERE id=?", (app_id,)).fetchone()
    clean = {k: (existing[k] if existing is not None else "") for k in APP_FIELDS}
    clean.update({k: rec[k] for k in APP_FIELDS if k in rec})
    clean["id"] = app_id
    clean["company"] = (clean["company"] or "").strip()
    clean["is_sample"] = int(bool(clean.get("is_sample", 0)))
    clean["created_at"] = clean["created_at"] or date.today().isoformat()
    cols = ",".join(APP_FIELDS)
    marks = ",".join("?" for _ in APP_FIELDS)
    updates = ",".join("%s=excluded.%s" % (c, c) for c in APP_FIELDS if c != "id")
    con.execute("INSERT INTO applications(%s) VALUES(%s) ON CONFLICT(id) DO UPDATE SET %s"
                % (cols, marks, updates), [clean[c] for c in APP_FIELDS])
    con.commit()
    return clean["id"]


def delete_application(con, app_id):
    con.execute("DELETE FROM applications WHERE id=?", (app_id,))
    con.commit()


# ---------------------------------------------------------------------------
# Daily log
# ---------------------------------------------------------------------------
def all_days(con):
    rows = con.execute("SELECT * FROM daily_log ORDER BY date").fetchall()
    return [{k: r[k] for k in DAY_FIELDS} for r in rows]


def upsert_day(con, rec):
    clean = {k: rec.get(k, 0) for k in DAY_FIELDS}
    clean["date"] = (clean["date"] or "")[:10]
    for k in ("discovered", "followups", "messages", "minutes"):
        try:
            clean[k] = max(0, int(clean[k] or 0))
        except (TypeError, ValueError):
            clean[k] = 0
    clean["is_sample"] = int(bool(clean.get("is_sample", 0)))
    cols = ",".join(DAY_FIELDS)
    marks = ",".join("?" for _ in DAY_FIELDS)
    updates = ",".join("%s=excluded.%s" % (c, c) for c in DAY_FIELDS if c != "date")
    con.execute("INSERT INTO daily_log(%s) VALUES(%s) ON CONFLICT(date) DO UPDATE SET %s"
                % (cols, marks, updates), [clean[c] for c in DAY_FIELDS])
    con.commit()
    return clean["date"]


def delete_day(con, day):
    con.execute("DELETE FROM daily_log WHERE date=?", (day,))
    con.commit()


# ---------------------------------------------------------------------------
# Sample data (fictional — always marked is_sample=1)
# ---------------------------------------------------------------------------
def _shift(d, delta):
    if not d:
        return ""
    if isinstance(d, date):
        return (d + delta).isoformat()
    return str(d)[:10]


def sample_payload():
    """Returns (apps, days, start_date) shifted so the demo is always recent."""
    delta = date.today() - M.TODAY
    apps = []
    for a in M.APPS:
        rec = {
            "id": a["id"], "company": a["company"], "title": a["title"],
            "category": a["category"], "seniority": a["seniority"],
            "location": a["location"], "arrangement": a["arrangement"],
            "url": a["url"], "source": a["source"],
            "discovered": _shift(a["discovered"], delta), "applied": _shift(a["applied"], delta),
            "status": a["status"], "followup": _shift(a["followup"], delta),
            "notes": a["notes"], "resume": a["resume"], "cover": a["cover"],
            "referral": a["referral"], "tailored": a["tailored"],
            "is_sample": 1, "created_at": date.today().isoformat(),
        }
        for k, field in STAGE_KEYS.items():
            rec[field] = _shift(a.get(k), delta)
        apps.append(rec)
    days = []
    for x in M.DAYS:
        days.append({
            "date": (x["date"] + delta).isoformat(),
            "discovered": x["discovered"], "followups": x["followups"],
            "messages": x["messages"], "minutes": x["minutes"],
            "notes": x["notes"], "is_sample": 1,
        })
    return apps, days, (M.START + delta).isoformat()


def seed_sample(con):
    apps, days, start = sample_payload()
    # Do not change a user's chosen settings when reloading demo rows.
    for a in apps:
        upsert_application(con, a)
    # Sample activity is only a preview: never overwrite a real log row on the
    # same date (the date column is the daily-log primary key).
    for d in days:
        con.execute(
            "INSERT OR IGNORE INTO daily_log(date,discovered,followups,messages,minutes,notes,is_sample) "
            "VALUES(?,?,?,?,?,?,1)",
            (d["date"], d["discovered"], d["followups"], d["messages"], d["minutes"], d["notes"]),
        )
    con.commit()


def clear_sample(con):
    con.execute("DELETE FROM applications WHERE is_sample=1")
    con.execute("DELETE FROM daily_log WHERE is_sample=1")
    con.commit()


def reset_all(con):
    con.execute("DELETE FROM applications")
    con.execute("DELETE FROM daily_log")
    con.execute("DELETE FROM settings")
    con.execute("DELETE FROM meta")
    con.commit()
    init_db()


def export_all(con):
    return {
        "format": "job-search-tracker/v1",
        "exported_at": date.today().isoformat(),
        "settings": get_settings(con),
        "applications": all_applications(con),
        "daily_log": all_days(con),
    }


def import_all(con, payload):
    con.execute("DELETE FROM applications")
    con.execute("DELETE FROM daily_log")
    con.commit()
    if isinstance(payload.get("settings"), dict):
        save_settings(con, payload["settings"])
    for a in payload.get("applications", []):
        upsert_application(con, a)
    for d in payload.get("daily_log", []):
        upsert_day(con, d)
    con.execute("INSERT OR REPLACE INTO meta(key,value) VALUES('seeded','1')")
    con.commit()
