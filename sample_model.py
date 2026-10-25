"""Fictional sample data for Hirepath. Every record is invented for demonstration."""
from datetime import date, timedelta

TODAY = date(2026, 10, 25)
START = date(2026, 9, 14)
SAMPLE_PREFIX = "SAMPLE · "


def d(offset):
    return START + timedelta(days=offset)


# ----------------------------------------------------------------------------
# Settings (defaults)
# ----------------------------------------------------------------------------
CATEGORIES = [
    ("AI Engineering", "Primary"),
    ("Data Science & Machine Learning", "Primary"),
    ("Python Development", "Primary"),
    ("AI Automation", "Primary"),
    ("Data Engineering", "Secondary"),
    ("DevOps", "Secondary"),
    ("Data Analytics", "Secondary"),
]

# label, stage code (1-5), outcome class, rejection stage, counts as response
STATUSES = [
    ("Applied — awaiting response", 1, "Pending", "", "No"),
    ("Resume rejected", 1, "Rejected", "Resume screening", "Yes"),
    ("HR interview invited", 2, "Pending", "", "Yes"),
    ("HR interview completed", 2, "Pending", "", "Yes"),
    ("HR rejected", 2, "Rejected", "HR", "Yes"),
    ("Technical interview invited", 3, "Pending", "", "Yes"),
    ("Technical interview completed", 3, "Pending", "", "Yes"),
    ("Technical rejected", 3, "Rejected", "Technical", "Yes"),
    ("Final interview invited", 4, "Pending", "", "Yes"),
    ("Final interview completed", 4, "Pending", "", "Yes"),
    ("Final rejected", 4, "Rejected", "Final", "Yes"),
    ("Offer received", 5, "Offer", "", "Yes"),
    ("Offer accepted", 5, "Offer", "", "Yes"),
    ("Withdrawn by me", 1, "Withdrawn", "", "No"),
    ("Position closed / no response", 1, "Closed", "", "No"),
]
STATUS_MAP = {s[0]: s for s in STATUSES}

RESUMES = [
    "v1 – General Python",
    "v2 – AI/ML focused",
    "v3 – LLM/Agent tailored",
]
SOURCES = [
    "LinkedIn", "Company website", "Job board (other)", "Indeed", "Glassdoor",
    "Referral", "Recruiter outreach", "Career fair / event", "Other",
]
SENIORITY = ["Intern", "Junior", "Mid-level", "Senior", "Unknown"]
ARRANGEMENT = ["Remote", "Hybrid", "Onsite", "Unknown"]
YESNO = ["Yes", "No"]
TIERS = ["Primary", "Secondary"]

# settings row => (label, value, description)
TARGETS = {
    72: ("Daily application target", 1, "Applications needed for a day to count as 'on target'."),
    73: ("Daily minutes target", 45, "Minutes of job-search work for the daily effort target."),
    74: ("Weekly application target", 8, "Used by the weekly target-completion chart."),
    75: ("Weekly active-day target", 5, "How many days per week you aim to show up."),
    76: ("No-response review threshold (days)", 21, "Pending applications older than this are flagged for follow-up. They are NEVER counted as rejections."),
    77: ("Minimum sample size (n)", 10, "Comparisons below this n are labelled 'insufficient evidence'."),
    78: ("Maturity window (days)", 21, "Funnel 'mature cohort' only includes applications at least this old."),
    79: ("Job-search start date", START, "First day of the log. Drives the pre-filled Daily Log dates."),
    80: ("Follow-up reminder lead (days)", 3, "Highlight a follow-up this many days before its due date."),
    81: ("Auto-stamp dates on status change", "Yes", "Used by the optional Apps Script onEdit trigger."),
}

DAILY_APPS_TARGET = 1
DAILY_MINUTES_TARGET = 45
WEEKLY_APPS_TARGET = 8
NORESP_DAYS = 21
MIN_N = 10
MATURITY_DAYS = 21
FOLLOWUP_LEAD = 3

# ----------------------------------------------------------------------------
# Fictional applications. Every company name begins with "SAMPLE · ".
# spec: company, title, category, seniority, location, arrangement, source,
#       resume, tailored, cover, referral, applied_offset, status,
#       stage offsets dict, closed_offset, followup_offset, note
# ----------------------------------------------------------------------------
RAW = [
    ("Aalto AI Labs", "AI Engineer", "AI Engineering", "Junior", "Helsinki, Finland", "Hybrid", "LinkedIn", "v2 – AI/ML focused", "Yes", "No", "No", 0, "HR interview completed", {"hri": 7, "hrd": 10}, None, None, "Recruiter asked about LLM deployment experience."),
    ("Northwind Data", "Machine Learning Engineer", "Data Science & Machine Learning", "Junior", "Remote – EU", "Remote", "LinkedIn", "v2 – AI/ML focused", "Yes", "Yes", "No", 1, "Technical rejected", {"hri": 8, "hrd": 11, "ti": 15, "td": 19}, 23, 16, "Take-home task feedback: weak on model serving."),
    ("Lumen Systems", "Python Backend Engineer", "Python Development", "Junior", "Tampere, Finland", "Onsite", "Company website", "v1 – General Python", "No", "No", "No", 2, "Resume rejected", {}, 9, None, "Generic resume sent; no reply until rejection."),
    ("Flowmatic", "n8n Developer", "AI Automation", "Junior", "Remote – EU", "Remote", "Job board (other)", "v3 – LLM/Agent tailored", "Yes", "No", "No", 3, "Offer accepted", {"hri": 10, "hrd": 14, "ti": 17, "td": 22, "fi": 25, "fd": 29, "off": 32}, 32, None, "Referred-style outreach worked well."),
    ("Vectorly", "Generative AI Engineer", "AI Engineering", "Mid-level", "Berlin, Germany", "Hybrid", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "Yes", 4, "Technical interview completed", {"hri": 11, "hrd": 15, "ti": 21, "td": 29}, None, 33, "System-design round pending."),
    ("Baltic Data Co", "Data Engineer", "Data Engineering", "Junior", "Remote – EU", "Remote", "Indeed", "v1 – General Python", "No", "No", "No", 5, "Resume rejected", {}, 14, None, "Job needed dbt + Airflow, absent from resume."),
    ("Vertex AI", "AI Engineer", "AI Engineering", "Junior", "Remote – EU", "Remote", "Referral", "v3 – LLM/Agent tailored", "Yes", "Yes", "Yes", 5, "Offer received", {"hri": 13, "hrd": 17, "ti": 20, "td": 24, "fi": 27, "fd": 30, "off": 37}, 37, None, "Offer under review; comparing with another process."),
    ("CloudNest", "Junior DevOps Engineer", "DevOps", "Junior", "Helsinki, Finland", "Hybrid", "LinkedIn", "v1 – General Python", "No", "No", "No", 7, "Applied — awaiting response", {}, None, 30, "No reply yet — send a polite follow-up."),
    ("Insightly BI", "Power BI Developer", "Data Analytics", "Junior", "Remote – EU", "Remote", "Glassdoor", "v2 – AI/ML focused", "Yes", "No", "No", 8, "Position closed / no response", {}, 27, None, "Posting disappeared; no employer contact."),
    ("Cortex Labs", "LLM Engineer", "AI Engineering", "Junior", "Amsterdam, Netherlands", "Hybrid", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 9, "HR rejected", {"hri": 15, "hrd": 18}, 21, None, "Salary expectation mismatch."),
    ("Nova Analytics", "Data Scientist", "Data Science & Machine Learning", "Junior", "Espoo, Finland", "Onsite", "Company website", "v2 – AI/ML focused", "Yes", "No", "No", 10, "Resume rejected", {}, 18, None, "Required 3+ years; I have less."),
    ("Automata Works", "AI Automation Engineer", "AI Automation", "Mid-level", "Remote – EU", "Remote", "Referral", "v3 – LLM/Agent tailored", "Yes", "Yes", "Yes", 11, "Final interview invited", {"hri": 17, "hrd": 21, "ti": 24, "td": 28, "fi": 32}, None, 36, "Final round with the CTO."),
    ("Pythia Software", "Python Developer", "Python Development", "Junior", "London, United Kingdom", "Remote", "LinkedIn", "v1 – General Python", "No", "No", "No", 12, "Applied — awaiting response", {}, None, 34, "Generic application."),
    ("Solstice Data", "Data Engineer", "Data Engineering", "Junior", "Berlin, Germany", "Hybrid", "LinkedIn", "v2 – AI/ML focused", "Yes", "No", "No", 13, "Technical rejected", {"hri": 20, "hrd": 23, "ti": 26, "td": 30}, 35, None, "SQL round was the weak point."),
    ("Delta MLOps", "MLOps Engineer", "Data Science & Machine Learning", "Mid-level", "Remote – EU", "Remote", "Job board (other)", "v2 – AI/ML focused", "Yes", "No", "No", 14, "Resume rejected", {}, 23, None, "Wanted Kubernetes in production."),
    ("Orion AI", "AI Agent Engineer", "AI Engineering", "Junior", "Helsinki, Finland", "Hybrid", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "Yes", 15, "HR interview invited", {"hri": 29}, None, 38, "Referral from a former classmate."),
    ("Quanta BI", "Data Analyst", "Data Analytics", "Intern", "Helsinki, Finland", "Onsite", "Career fair / event", "v1 – General Python", "No", "No", "No", 16, "Withdrawn by me", {}, 24, None, "Withdrew: unpaid internship."),
    ("Riverstone Tech", "Deep Learning Engineer", "Data Science & Machine Learning", "Junior", "Stockholm, Sweden", "Hybrid", "LinkedIn", "v2 – AI/ML focused", "Yes", "No", "No", 17, "Final rejected", {"hri": 22, "hrd": 25, "ti": 28, "td": 31, "fi": 34, "fd": 36}, 38, None, "Lost to a candidate with a publication record."),
    ("Bottlerocket", "Workflow Automation Developer", "AI Automation", "Junior", "Remote – EU", "Remote", "Indeed", "v3 – LLM/Agent tailored", "Yes", "No", "No", 18, "HR interview completed", {"hri": 27, "hrd": 31}, None, 39, "Asked for a portfolio link — add one."),
    ("Greenline Energy", "Python Software Engineer", "Python Development", "Mid-level", "Berlin, Germany", "Hybrid", "Company website", "v1 – General Python", "No", "No", "No", 19, "Resume rejected", {}, 29, None, "No tailoring."),
    ("Bluepeak Analytics", "Power BI Developer", "Data Analytics", "Junior", "Helsinki, Finland", "Hybrid", "Company website", "v1 – General Python", "No", "No", "No", 19, "Resume rejected", {}, 30, None, "Generic resume again."),
    ("Helio Data", "Data Engineer", "Data Engineering", "Junior", "Remote – EU", "Remote", "LinkedIn", "v2 – AI/ML focused", "Yes", "Yes", "No", 21, "Applied — awaiting response", {}, None, None, "Tailored around Spark projects."),
    ("Skyline Cloud", "Junior DevOps Engineer", "DevOps", "Intern", "Helsinki, Finland", "Onsite", "Job board (other)", "v1 – General Python", "No", "No", "No", 22, "Applied — awaiting response", {}, None, None, "Stretch category."),
    ("Meridian AI", "AI Software Engineer", "AI Engineering", "Junior", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 23, "HR interview invited", {"hri": 39}, None, None, "Fast response after a tailored summary."),
    ("Polaris Labs", "Machine Learning Engineer", "Data Science & Machine Learning", "Junior", "Copenhagen, Denmark", "Hybrid", "Referral", "v3 – LLM/Agent tailored", "Yes", "Yes", "Yes", 24, "Technical interview invited", {"hri": 30, "hrd": 33, "ti": 37}, None, None, "Referral skipped the resume screen."),
    ("Echo Analytics", "Data Analyst", "Data Analytics", "Junior", "Remote – EU", "Remote", "LinkedIn", "v2 – AI/ML focused", "No", "No", "No", 25, "Applied — awaiting response", {}, None, None, "Low-priority application."),
    ("Cobalt Systems", "Python Backend Engineer", "Python Development", "Senior", "Remote – EU", "Remote", "LinkedIn", "v1 – General Python", "No", "No", "No", 26, "Resume rejected", {}, 39, None, "Over-level; expected rejection."),
    ("Finch AI", "LLM Engineer", "AI Engineering", "Mid-level", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 27, "HR interview completed", {"hri": 35, "hrd": 38}, None, None, "Good conversation about RAG pipelines."),
    ("Aurora AI", "Generative AI Engineer", "AI Engineering", "Mid-level", "Helsinki, Finland", "Hybrid", "Company website", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 28, "Applied — awaiting response", {}, None, None, "Recent application — too early to judge."),
    ("Nimbus Ops", "AI Automation Engineer", "AI Automation", "Junior", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "No", "No", 29, "Applied — awaiting response", {}, None, None, "Recent application — too early to judge."),
    ("Teradata Nordics", "Data Engineer", "Data Engineering", "Mid-level", "Helsinki, Finland", "Onsite", "Recruiter outreach", "v2 – AI/ML focused", "Yes", "Yes", "No", 30, "Applied — awaiting response", {}, None, None, "Recruiter contacted me first."),
    ("Bright Intelligence", "AI Engineer", "AI Engineering", "Junior", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 30, "Applied — awaiting response", {}, None, None, "Recent application."),
    ("Signal Forge", "Python Developer", "Python Development", "Junior", "Tallinn, Estonia", "Hybrid", "Indeed", "v1 – General Python", "No", "No", "No", 32, "Applied — awaiting response", {}, None, None, "Generic resume."),
    ("Halcyon ML", "Deep Learning Engineer", "Data Science & Machine Learning", "Junior", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "No", "No", 33, "Applied — awaiting response", {}, None, None, "Testing the newer resume."),
    ("Pinewood Systems", "Python Developer", "Python Development", "Junior", "Helsinki, Finland", "Onsite", "Indeed", "v2 – AI/ML focused", "Yes", "No", "No", 34, "Applied — awaiting response", {}, None, None, "Recent application."),
    ("Alpine Automation", "AI Automation Engineer", "AI Automation", "Junior", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "No", "No", 35, "Applied — awaiting response", {}, None, None, "Recent application."),
    ("Kestrel ML", "Data Scientist", "Data Science & Machine Learning", "Junior", "Amsterdam, Netherlands", "Hybrid", "Glassdoor", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 36, "Applied — awaiting response", {}, None, None, "Recent application."),
    ("Copper Cloud", "Junior DevOps Engineer", "DevOps", "Intern", "Remote – EU", "Remote", "Job board (other)", "v1 – General Python", "No", "No", "No", 37, "Applied — awaiting response", {}, None, None, "Stretch category."),
    ("Lighthouse BI", "Data Analyst", "Data Analytics", "Junior", "Helsinki, Finland", "Hybrid", "LinkedIn", "v2 – AI/ML focused", "No", "No", "No", 38, "Applied — awaiting response", {}, None, None, "Recent application."),
    ("Ember AI", "AI Agent Engineer", "AI Engineering", "Junior", "Remote – EU", "Remote", "LinkedIn", "v3 – LLM/Agent tailored", "Yes", "Yes", "No", 40, "Applied — awaiting response", {}, None, None, "Most recent application."),
]

STAGE_KEYS = ["hri", "hrd", "ti", "td", "fi", "fd", "off"]


def build_apps():
    apps = []
    for i, r in enumerate(RAW, start=1):
        (company, title, cat, sen, loc, arr, src, resume, tailored, cover,
         referral, applied_off, status, stages, closed_off, follow_off, note) = r
        a = {
            "n": i,
            "id": "APP-%04d" % i,
            "company": SAMPLE_PREFIX + company,
            "title": title,
            "category": cat,
            "seniority": sen,
            "location": loc,
            "arrangement": arr,
            "url": "https://example.org/jobs/demo-%04d" % i,
            "source": src,
            "discovered": d(max(0, applied_off - 2)),
            "applied": d(applied_off),
            "status": status,
            "followup": d(follow_off) if follow_off is not None else None,
            "notes": "Fictional demo record. " + note,
            "resume": resume,
            "cover": cover,
            "referral": referral,
            "tailored": tailored,
            "hri": d(stages["hri"]) if "hri" in stages else None,
            "hrd": d(stages["hrd"]) if "hrd" in stages else None,
            "ti": d(stages["ti"]) if "ti" in stages else None,
            "td": d(stages["td"]) if "td" in stages else None,
            "fi": d(stages["fi"]) if "fi" in stages else None,
            "fd": d(stages["fd"]) if "fd" in stages else None,
            "off": d(stages["off"]) if "off" in stages else None,
            "closed": d(closed_off) if closed_off is not None else None,
        }
        sm = STATUS_MAP[status]
        st = sm[1]
        if a["hri"] or a["hrd"]:
            st = max(st, 2)
        if a["ti"] or a["td"]:
            st = max(st, 3)
        if a["fi"] or a["fd"]:
            st = max(st, 4)
        if a["off"]:
            st = max(st, 5)
        a["stage"] = st
        a["cls"] = sm[2]
        a["rej"] = sm[3] if sm[2] == "Rejected" else ""
        cand = [x for x in [a["hri"], a["hrd"], a["ti"], a["td"], a["fi"], a["fd"], a["off"]] if x]
        if sm[2] == "Rejected" and a["closed"]:
            cand.append(a["closed"])
        a["first"] = min(cand) if cand else None
        a["response"] = 1 if (st >= 2 or a["cls"] in ("Rejected", "Offer")) else 0
        a["days_first"] = (a["first"] - a["applied"]).days if a["first"] else None
        a["days_outcome"] = (a["closed"] - a["applied"]).days if a["closed"] and a["cls"] != "Pending" else None
        a["age"] = (TODAY - a["applied"]).days
        a["week"] = a["applied"] - timedelta(days=a["applied"].weekday())
        a["month"] = date(a["applied"].year, a["applied"].month, 1)
        a["stale"] = 1 if (a["cls"] == "Pending" and st == 1 and a["age"] >= NORESP_DAYS) else 0
        a["followup_due"] = 1 if (a["cls"] == "Pending" and a["followup"] and a["followup"] <= TODAY + timedelta(days=FOLLOWUP_LEAD)) else 0
        a["days_apphr"] = (a["hri"] - a["applied"]).days if a["hri"] else None
        a["days_hrtech"] = (a["ti"] - a["hri"]).days if (a["ti"] and a["hri"]) else None
        a["days_techfinal"] = (a["fi"] - a["ti"]).days if (a["fi"] and a["ti"]) else None
        a["days_finaloffer"] = (a["off"] - a["fi"]).days if (a["off"] and a["fi"]) else None
        apps.append(a)
    return apps


APPS = build_apps()

# ----------------------------------------------------------------------------
# Fictional daily-log manual entries (columns B, F, G, I, J).
# C, D, E, H and K-Q are calculated by spreadsheet formulas.
# ----------------------------------------------------------------------------
LESSONS = {
    2: "Noticed generic resumes get no replies — start tailoring summaries.",
    8: "Set a 25-minute timer for sourcing; it kept me focused.",
    13: "Two short networking messages led to one useful conversation.",
    18: "Interview feedback: prepare concrete deployment stories.",
    22: "Rest day. Skipping a day is fine; quitting is not.",
    27: "Referrals seem to bypass the resume screen — track this.",
    33: "Rewrote the first two bullets of v3; clearer impact numbers.",
    37: "Weekly review: AI Automation and AI Engineering respond best.",
    40: "Keep volume steady; do not send ten rushed applications.",
}
REST_DAYS = {6, 20, 31, 39}  # deliberately zero-activity days (no applications either)


def build_days():
    apps_by_day = {}
    for a in APPS:
        apps_by_day[a["applied"]] = apps_by_day.get(a["applied"], 0) + 1
    days = []
    for off in range(41):
        day = d(off)
        napps = apps_by_day.get(day, 0)
        weekend = day.weekday() >= 5
        discovered = (napps * 2 + (off * 3) % 5) if not weekend else ((off * 2) % 3)
        minutes = 0 if off in REST_DAYS else (35 + (off * 17) % 70 if not weekend else 20 + (off * 11) % 40)
        followups = 0 if off in REST_DAYS else (off // 7) % 3
        messages = 0 if off in REST_DAYS else (2 + (off * 5) % 5)
        if off in REST_DAYS:
            discovered = 0
        note = LESSONS.get(off, "")
        days.append({
            "n": off, "date": day, "discovered": discovered,
            "followups": followups, "messages": messages, "minutes": minutes,
            "notes": note, "apps": napps,
        })
    return days


DAYS = build_days()

# ----------------------------------------------------------------------------
# Model helpers (used to compute cached display values)
# ----------------------------------------------------------------------------
FROM_EFF = date(2000, 1, 1)
TO_EFF = TODAY


def cohort(frm=FROM_EFF, to=TO_EFF):
    return [a for a in APPS if frm <= a["applied"] <= to]


COH = cohort()


def mature(frm=FROM_EFF, to=TO_EFF):
    return [a for a in cohort(frm, to) if a["age"] >= MATURITY_DAYS]


def n_where(lst, fn):
    return sum(1 for a in lst if fn(a))


def n_stage(lst, k, op=">="):
    if op == ">=":
        return n_where(lst, lambda a: a["stage"] >= k)
    return n_where(lst, lambda a: a["stage"] == k)


def ratio(num, den):
    return "" if not den else num / den


def avg(vals):
    vals = [v for v in vals if isinstance(v, (int, float))]
    return sum(vals) / len(vals) if vals else ""


def week_monday(day):
    return day - timedelta(days=day.weekday())


def month_start(day):
    return date(day.year, day.month, 1)


def add_month(day, k=1):
    y, m = day.year, day.month + k
    while m > 12:
        m -= 12
        y += 1
    while m < 1:
        m += 12
        y -= 1
    return date(y, m, 1)


def ser(day):
    """Excel/Sheets date serial (1900 system)."""
    return (day - date(1899, 12, 30)).days


def daily_auto(day):
    """Values of the formula-driven Daily Log columns for a given date."""
    napp = n_where(APPS, lambda a: a["applied"] == day)
    tail = n_where(APPS, lambda a: a["applied"] == day and a["tailored"] == "Yes")
    cover = n_where(APPS, lambda a: a["applied"] == day and a["cover"] == "Yes")
    interviews = sum(1 for a in APPS for k in ("hrd", "td", "fd") if a[k] == day)
    return napp, tail, cover, interviews


# active-day / streak model (for cached values)
def daily_flags():
    flags = []
    streak = 0
    for x in DAYS:
        na, ta, co, iv = daily_auto(x["date"])
        active = 1 if (x["discovered"] > 0 or na > 0 or ta > 0 or co > 0 or
                       x["followups"] > 0 or x["messages"] > 0 or iv > 0 or
                       x["minutes"] > 0 or x["notes"]) else 0
        streak = streak + 1 if active else 0
        flags.append({
            "date": x["date"], "apps": na, "tailored": ta, "cover": co,
            "interviews": iv, "active": active,
            "apps_target": 1 if na >= DAILY_APPS_TARGET else 0,
            "min_target": 1 if x["minutes"] >= DAILY_MINUTES_TARGET else 0,
            "week": week_monday(x["date"]), "streak": streak,
        })
    return flags


FLAGS = daily_flags()
ACTIVE_DAYS = sum(f["active"] for f in FLAGS)
LONGEST_STREAK = max(f["streak"] for f in FLAGS)
CURRENT_STREAK = FLAGS[-1]["streak"]
DAYS_ELAPSED = sum(1 for f in FLAGS if f["date"] <= TODAY) or 1
DAYS_TARGET_MET = sum(f["apps_target"] for f in FLAGS)
TOTAL_MINUTES = sum(x["minutes"] for x in DAYS)
TOTAL_APPS = len(APPS)
KNOWN = n_where(COH, lambda a: a["cls"] != "Pending")
REJECTED = n_where(COH, lambda a: a["cls"] == "Rejected")
OFFERS = n_where(COH, lambda a: a["cls"] == "Offer")
PENDING = n_where(COH, lambda a: a["cls"] == "Pending")
RESPONSES = sum(a["response"] for a in COH)
STALE = sum(a["stale"] for a in COH)
