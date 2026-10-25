"""All metrics for the Job Search Tracker. Pure functions, no I/O.

Design rules (mirrors the spreadsheet):
  * Pending is never a failure. Silence is never a response.
  * Rejection rates use known-outcome or stage-specific denominators.
  * A "mature cohort" (applied >= N days ago) is reported next to every funnel rate.
  * Every comparison carries its sample size and an evidence label.
"""
from datetime import date, timedelta


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------
def parse(d):
    if not d:
        return None
    if isinstance(d, date):
        return d
    try:
        return date.fromisoformat(str(d)[:10])
    except Exception:
        return None


def iso(d):
    return d.isoformat() if d else ""


def monday(d):
    return d - timedelta(days=d.weekday())


def month_start(d):
    return date(d.year, d.month, 1)


def add_month(d, k=1):
    y, m = d.year, d.month + k
    while m > 12:
        m -= 12
        y += 1
    while m < 1:
        m += 12
        y -= 1
    return date(y, m, 1)


def ratio(n, d):
    return round(n / d, 4) if d else None


def avg(vals):
    nums = [v for v in vals if isinstance(v, (int, float)) and not isinstance(v, bool)]
    return round(sum(nums) / len(nums), 1) if nums else None


def n_where(seq, fn):
    return sum(1 for x in seq if fn(x))


def n_stage(seq, k):
    return n_where(seq, lambda a: a["stage"] >= k)


def pct(x):
    return "n/a" if x is None else "%d%%" % round(x * 100)


def pp(x):
    return "n/a" if x is None else "%+.0f pp" % (x * 100)


def evidence(n, min_n):
    if not n or n < min_n:
        return "Insufficient data"
    if n < 2 * min_n:
        return "Early signal"
    return "Reasonable"


# ---------------------------------------------------------------------------
# derive per-application fields
# ---------------------------------------------------------------------------
def derive(apps, cfg, today, ref=None):
    ref = ref or today
    smap = {s["label"]: s for s in cfg["statuses"]}
    t = cfg["targets"]
    lead = int(t.get("followup_lead", 3))
    stale_days = int(t.get("no_response_days", 21))
    out = []
    for a in apps:
        x = dict(a)
        st = smap.get(a.get("status") or "", {})
        outcome = st.get("outcome", "Pending") or "Pending"
        stage = int(st.get("stage", 1) or 1)
        dates = {k: parse(a.get(k)) for k in (
            "hr_invited", "hr_completed", "tech_invited", "tech_completed",
            "final_invited", "final_completed", "offer_date", "closed_date")}
        if dates["hr_invited"] or dates["hr_completed"]:
            stage = max(stage, 2)
        if dates["tech_invited"] or dates["tech_completed"]:
            stage = max(stage, 3)
        if dates["final_invited"] or dates["final_completed"]:
            stage = max(stage, 4)
        if dates["offer_date"]:
            stage = max(stage, 5)

        first_candidates = [dates[k] for k in (
            "hr_invited", "hr_completed", "tech_invited", "tech_completed",
            "final_invited", "final_completed", "offer_date") if dates[k]]
        if outcome == "Rejected" and dates["closed_date"]:
            first_candidates.append(dates["closed_date"])
        first = min(first_candidates) if first_candidates else None

        applied = parse(a.get("applied"))
        closed = dates["closed_date"]
        fup = parse(a.get("followup"))
        x.update({
            "_applied": applied,
            "_discovered": parse(a.get("discovered")),
            "_followup": fup,
            "_dates": dates,
            "stage": stage,
            "outcome": outcome,
            "rejection": (st.get("rejection") or "") if outcome == "Rejected" else "",
            "response": 1 if (stage >= 2 or outcome in ("Rejected", "Offer")) else 0,
            "first_response": iso(first),
            "days_first": (first - applied).days if (first and applied) else None,
            "days_outcome": (closed - applied).days if (closed and applied and outcome != "Pending") else None,
            "age": (today - applied).days if applied else None,
            "cohort_age": (ref - applied).days if applied else None,
            "stale": bool(outcome == "Pending" and stage == 1 and applied and (today - applied).days >= stale_days),
            "followup_due": bool(outcome == "Pending" and fup and
                                 fup <= today + timedelta(days=lead)),
            "days_app_hr": (dates["hr_invited"] - applied).days if (dates["hr_invited"] and applied) else None,
            "days_hr_tech": (dates["tech_invited"] - dates["hr_invited"]).days
                            if (dates["tech_invited"] and dates["hr_invited"]) else None,
            "days_tech_final": (dates["final_invited"] - dates["tech_invited"]).days
                               if (dates["final_invited"] and dates["tech_invited"]) else None,
            "days_final_offer": (dates["offer_date"] - dates["final_invited"]).days
                                if (dates["offer_date"] and dates["final_invited"]) else None,
        })
        out.append(x)
    return out


# ---------------------------------------------------------------------------
# daily habit series
# ---------------------------------------------------------------------------
def daily_series(days, apps_derived, cfg, today):
    stored = {parse(d["date"]): d for d in days if parse(d["date"])}
    start = parse(cfg["targets"].get("start_date")) or (today - timedelta(days=90))
    if stored:
        start = min(start, min(stored))
    end = max(today, max(stored) if stored else today)
    t = cfg["targets"]
    daily_target = int(t.get("daily_apps", 1))
    minutes_target = int(t.get("daily_minutes", 45))

    by_applied = {}
    for a in apps_derived:
        if a["_applied"]:
            by_applied.setdefault(a["_applied"], []).append(a)
    interviews = {}
    for a in apps_derived:
        for k in ("hr_completed", "tech_completed", "final_completed"):
            d = a["_dates"].get(k)
            if d:
                interviews[d] = interviews.get(d, 0) + 1

    series, streak, longest = [], 0, 0
    cur = start
    while cur <= end:
        row = stored.get(cur, {})
        group = by_applied.get(cur, [])
        apps_n = len(group)
        tailored = n_where(group, lambda a: a.get("tailored") == "Yes")
        covers = n_where(group, lambda a: a.get("cover") == "Yes")
        iv = interviews.get(cur, 0)
        discovered = int(row.get("discovered") or 0)
        followups = int(row.get("followups") or 0)
        messages = int(row.get("messages") or 0)
        minutes = int(row.get("minutes") or 0)
        notes = row.get("notes") or ""
        active = int(bool(apps_n or tailored or covers or iv or discovered or
                          followups or messages or minutes or notes))
        if cur <= today:
            streak = streak + 1 if active else 0
            longest = max(longest, streak)
        series.append({
            "date": iso(cur), "apps": apps_n, "tailored": tailored, "covers": covers,
            "interviews": iv, "discovered": discovered, "followups": followups,
            "messages": messages, "minutes": minutes, "notes": notes,
            "active": active, "week": iso(monday(cur)),
            "apps_target_met": int(apps_n >= daily_target),
            "minutes_target_met": int(minutes >= minutes_target),
            "streak": streak, "logged": bool(row),
        })
        cur += timedelta(days=1)
    past = [d for d in series if parse(d["date"]) <= today]
    return {
        "series": series,
        "past": past,
        "active_days": sum(d["active"] for d in past),
        "elapsed": max(1, len(past)),
        "showup": ratio(sum(d["active"] for d in past), max(1, len(past))),
        "target_days": sum(d["apps_target_met"] for d in past),
        "minutes_target_days": sum(d["minutes_target_met"] for d in past),
        "minutes_target_pct": ratio(sum(d["minutes_target_met"] for d in past), sum(d["active"] for d in past)),
        "current_streak": past[-1]["streak"] if past else 0,
        "longest_streak": longest,
        "minutes": sum(d["minutes"] for d in past),
        "week_minutes": sum(d["minutes"] for d in past[-7:]),
        "week_active_days": sum(d["active"] for d in past if parse(d["date"]) >= monday(today)),
        "week_applications": sum(d["apps"] for d in past if parse(d["date"]) >= monday(today)),
        "week_effort_days": sum(d["minutes_target_met"] for d in past if parse(d["date"]) >= monday(today)),
    }


# ---------------------------------------------------------------------------
# main analytics builder
# ---------------------------------------------------------------------------
def build(apps, days, cfg, frm=None, to=None, today=None):
    today = today or date.today()
    ref = min(to or today, today)
    t = cfg["targets"]
    min_n = int(t.get("min_sample", 10))
    maturity = int(t.get("maturity_days", 21))

    derived = derive(apps, cfg, today, ref)
    cohort = [a for a in derived if a["_applied"] and
              (not frm or a["_applied"] >= frm) and (not to or a["_applied"] <= to)]
    mature = [a for a in cohort if a["cohort_age"] is not None and a["cohort_age"] >= maturity]
    habit = daily_series(days, derived, cfg, today)

    total = len(cohort)
    week_start = monday(today)
    mstart = month_start(today)

    def ca(fn):
        return n_where(cohort, fn)

    overall = {
        "total": total,
        "today": ca(lambda a: a["_applied"] == today),
        "week": ca(lambda a: week_start <= a["_applied"] <= today),
        "month": ca(lambda a: mstart <= a["_applied"] <= today),
        "last7": ca(lambda a: today - timedelta(days=6) <= a["_applied"] <= today),
        "prev7": ca(lambda a: today - timedelta(days=13) <= a["_applied"] <= today - timedelta(days=7)),
        "pending": ca(lambda a: a["outcome"] == "Pending"),
        "pending_first": ca(lambda a: a["outcome"] == "Pending" and a["stage"] == 1),
        "pending_process": ca(lambda a: a["outcome"] == "Pending" and a["stage"] >= 2),
        "stale": ca(lambda a: a["stale"]),
        "closed_noresp": ca(lambda a: a["outcome"] == "Closed"),
        "hr_inv": n_stage(cohort, 2),
        "tech_inv": n_stage(cohort, 3),
        "final_inv": n_stage(cohort, 4),
        "offers": ca(lambda a: a["outcome"] == "Offer"),
        "offers_accepted": ca(lambda a: a["status"] == "Offer accepted"),
        "rejections": ca(lambda a: a["outcome"] == "Rejected"),
        "known": ca(lambda a: a["outcome"] != "Pending"),
        "responses": sum(a["response"] for a in cohort),
        "interviews_attended": sum(
            1 for a in cohort for k in ("hr_completed", "tech_completed", "final_completed")
            if a["_dates"].get(k)
        ),
        "mature_n": len(mature),
        "cohort_size": total,
        "sample_present": any(a.get("is_sample") for a in apps) or any(d.get("is_sample") for d in days),
    }
    overall["response_rate"] = ratio(overall["responses"], total)
    overall["offer_rate"] = ratio(overall["offers"], total)
    overall["avg_days_first"] = avg([a["days_first"] for a in cohort])
    overall["tailored_n"] = ca(lambda a: a.get("tailored") == "Yes")
    overall["tailored_rate"] = ratio(overall["tailored_n"], total)
    overall["active_days"] = habit["active_days"]
    overall["elapsed"] = habit["elapsed"]
    overall["showup"] = habit["showup"]
    overall["target_days"] = habit["target_days"]
    overall["target_pct"] = ratio(habit["target_days"], habit["active_days"])
    overall["minutes_target_pct"] = habit["minutes_target_pct"]
    overall["apps_per_active_day"] = ratio(total, habit["active_days"])
    overall["minutes"] = habit["minutes"]
    overall["hours"] = round(habit["minutes"] / 60, 1)
    overall["current_streak"] = habit["current_streak"]
    overall["longest_streak"] = habit["longest_streak"]

    # ---- funnel -----------------------------------------------------------
    funnel_specs = [
        ("Applications → HR interview invitations", 2, None,
         "Applications that reached HR ÷ all applications in the cohort."),
        ("HR invitations → Technical invitations", 3, 2,
         "Applications that reached technical ÷ applications that reached HR."),
        ("Technical → Final interview invitations", 4, 3,
         "Applications that reached final ÷ applications that reached technical."),
        ("Final interviews → Offers", 5, 4,
         "Offers ÷ applications that reached the final stage."),
        ("Applications → Offers (end-to-end)", 5, None,
         "Offers ÷ all applications in the cohort."),
    ]
    funnel = []
    for label, ns, ds, definition in funnel_specs:
        num = n_stage(cohort, ns)
        den = total if ds is None else n_stage(cohort, ds)
        mnum = n_stage(mature, ns)
        mden = len(mature) if ds is None else n_stage(mature, ds)
        funnel.append({
            "label": label, "num": num, "den": den, "rate": ratio(num, den),
            "mnum": mnum, "mden": mden, "mrate": ratio(mnum, mden),
            "definition": definition,
        })

    # ---- rejection rates --------------------------------------------------
    rej_specs = [
        ("Resume screening rejection rate", "Resume screening", "known",
         "Explicit resume rejections ÷ applications with a known outcome (pending excluded)."),
        ("HR rejection rate", "HR", 2,
         "HR rejections ÷ applications that reached the HR stage."),
        ("Technical rejection rate", "Technical", 3,
         "Technical rejections ÷ applications that reached the technical stage."),
        ("Final rejection rate", "Final", 4,
         "Final-stage rejections ÷ applications that reached the final stage."),
        ("Overall explicit rejection rate", "__all__", "known",
         "All explicit rejections ÷ applications with a known outcome."),
        ("No-response closure rate", "__closed__", "known",
         "Positions closed / no employer reply ÷ known outcomes. Silence is never a rejection."),
    ]
    rejections = []
    for label, key, dentype, definition in rej_specs:
        if key == "__all__":
            numf = lambda a: a["outcome"] == "Rejected"
        elif key == "__closed__":
            numf = lambda a: a["outcome"] == "Closed"
        else:
            numf = lambda a, k=key: a["rejection"] == k
        if dentype == "known":
            den = ca(lambda a: a["outcome"] != "Pending")
            mden = n_where(mature, lambda a: a["outcome"] != "Pending")
        else:
            den = n_stage(cohort, dentype)
            mden = n_stage(mature, dentype)
        num = ca(numf)
        mnum = n_where(mature, numf)
        rejections.append({
            "label": label, "num": num, "den": den, "rate": ratio(num, den),
            "mnum": mnum, "mden": mden, "mrate": ratio(mnum, mden),
            "definition": definition,
        })

    # ---- stage timing -----------------------------------------------------
    timing_specs = [
        ("Applied → HR invitation", "days_app_hr", "HR invited date − Date applied."),
        ("HR → Technical invitation", "days_hr_tech", "Technical invited − HR invited."),
        ("Technical → Final invitation", "days_tech_final", "Final invited − Technical invited."),
        ("Final → Offer", "days_final_offer", "Offer date − Final invited."),
    ]
    timing = []
    for label, key, definition in timing_specs:
        vals = [a[key] for a in derived]
        timing.append({"label": label, "days": avg(vals),
                       "n": sum(1 for v in vals if isinstance(v, (int, float))),
                       "definition": definition})

    # ---- generic comparison block ----------------------------------------
    def block(rows, match, label_key="label"):
        out = []
        for item in rows:
            sub = [a for a in cohort if match(a, item)]
            n = len(sub)
            out.append({
                "label": item[label_key] if isinstance(item, dict) else item,
                "n": n,
                "responses": sum(a["response"] for a in sub),
                "response_rate": ratio(sum(a["response"] for a in sub), n),
                "hr_rate": ratio(n_stage(sub, 2), n),
                "tech_rate": ratio(n_stage(sub, 3), n),
                "offer_rate": ratio(n_stage(sub, 5), n),
                "avg_days": avg([a["days_first"] for a in sub]),
                "evidence": evidence(n, min_n),
            })
        return out

    def eq(field):
        return lambda a, item, f=field: (a.get(f) or "") == item

    categories = []
    for c in cfg["categories"]:
        name = c["name"] if isinstance(c, dict) else c
        row = block([name], eq("category"))[0]
        row["tier"] = c.get("tier", "Primary") if isinstance(c, dict) else "Primary"
        sub = [a for a in cohort if a.get("category") == name]
        n = len(sub)
        for stage in ("Resume screening", "HR", "Technical", "Final"):
            row["rej_" + stage.replace(" ", "_").lower()] = n_where(sub, lambda a, s=stage: a["rejection"] == s)
        row["rej_resume"] = row.pop("rej_resume_screening")
        row["offers_n"] = n_stage(sub, 5)
        row["eligible"] = n >= min_n
        categories.append(row)

    strategy = {
        "resume": {"title": "Resume version", "rows": block(cfg["resumes"], eq("resume"))},
        "tailored": {"title": "Tailored to the job description", "rows": block(["Yes", "No"], eq("tailored"))},
        "cover": {"title": "Cover letter submitted", "rows": block(["Yes", "No"], eq("cover"))},
        "referral": {"title": "Referral", "rows": block(["Yes", "No"], eq("referral"))},
        "source": {"title": "Job source", "rows": block(cfg["sources"], eq("source"))},
        "seniority": {"title": "Seniority level", "rows": block(cfg["seniority"], eq("seniority"))},
        "arrangement": {"title": "Work arrangement", "rows": block(cfg["arrangements"], eq("arrangement"))},
        "location": {"title": "Location / country", "substring": True,
                     "rows": block(cfg["locations"],
                                   lambda a, item: item.lower() in (a.get("location") or "").lower())},
    }

    # ---- trends -----------------------------------------------------------
    past = habit["past"]
    daily = []
    for i, d in enumerate(past[-70:]):
        window = past[max(0, len(past) - 70 + i - 6): len(past) - 70 + i + 1] if len(past) >= 70 else past[max(0, i - 6): i + 1]
        daily.append({"date": d["date"], "apps": d["apps"],
                      "avg7": round(sum(x["apps"] for x in window) / len(window), 2) if window else 0,
                      "active": d["active"], "minutes": d["minutes"]})

    weekly = []
    w0 = monday(today) - timedelta(weeks=15)
    by_week = {}
    for d in past:
        by_week.setdefault(d["week"], []).append(d)
    weekly_target = int(t.get("weekly_apps", 8))
    for i in range(16):
        wk = iso(w0 + timedelta(weeks=i))
        rows = by_week.get(wk, [])
        apps_w = sum(r["apps"] for r in rows)
        hr = sum(1 for a in derived if a["_dates"]["hr_invited"] and
                 monday(a["_dates"]["hr_invited"]).isoformat() == wk)
        tech = sum(1 for a in derived if a["_dates"]["tech_invited"] and
                   monday(a["_dates"]["tech_invited"]).isoformat() == wk)
        offers_w = sum(1 for a in derived if a["_dates"]["offer_date"] and
                       monday(a["_dates"]["offer_date"]).isoformat() == wk)
        rej_w = {}
        for stage in ("Resume screening", "HR", "Technical", "Final"):
            rej_w[stage] = sum(1 for a in derived if a["outcome"] == "Rejected" and
                               a["rejection"] == stage and a["_dates"]["closed_date"] and
                               monday(a["_dates"]["closed_date"]).isoformat() == wk)
        active = sum(r["active"] for r in rows)
        weekly.append({
            "week": wk, "label": (w0 + timedelta(weeks=i)).strftime("%d %b"),
            "apps": apps_w, "target": weekly_target,
            "completion": ratio(apps_w, weekly_target), "active": active,
            "minutes": sum(r["minutes"] for r in rows), "hr": hr, "tech": tech,
            "offers": offers_w, "interviews": sum(r["interviews"] for r in rows),
            "rej_resume": rej_w["Resume screening"], "rej_hr": rej_w["HR"],
            "rej_tech": rej_w["Technical"], "rej_final": rej_w["Final"],
        })

    monthly = []
    m0 = add_month(month_start(today), -11)
    for i in range(12):
        m = add_month(m0, i)
        nxt = add_month(m, 1)
        sub = [a for a in derived if a["_applied"] and m <= a["_applied"] < nxt]
        n = len(sub)
        h2, h3, h4, h5 = (n_stage(sub, k) for k in (2, 3, 4, 5))
        monthly.append({"month": iso(m), "label": m.strftime("%b %y"), "apps": n,
                        "app_hr": ratio(h2, n), "hr_tech": ratio(h3, h2),
                        "tech_final": ratio(h4, h3), "final_offer": ratio(h5, h4),
                        "app_offer": ratio(h5, n)})

    # ---- insights ---------------------------------------------------------
    insights = build_insights(cohort, mature, derived, overall, funnel, rejections,
                              categories, strategy, habit, min_n, maturity, today)

    # ---- attention lists --------------------------------------------------
    attention = {
        "followups": [{"id": a["id"], "company": a["company"], "title": a["title"],
                       "date": iso(a["_followup"]), "age": a["age"]}
                      for a in derived if a["followup_due"]],
        "stale": [{"id": a["id"], "company": a["company"], "title": a["title"], "age": a["age"]}
                  for a in derived if a["stale"]],
        "missing": [{"id": a["id"], "company": a["company"],
                     "fields": [f for f in ("applied", "status", "resume", "category")
                                if not (a.get(f) or "").strip()]}
                    for a in derived],
    }
    attention["missing"] = [m for m in attention["missing"] if m["fields"]]

    recent = sorted([a for a in derived if a["_applied"]],
                    key=lambda a: (a["_applied"], a["id"]), reverse=True)[:8]
    recent = [{
        "id": a["id"], "company": a["company"], "title": a["title"],
        "category": a["category"], "applied": iso(a["_applied"]),
        "status": a["status"], "outcome": a["outcome"], "stage": a["stage"],
        "is_sample": bool(a.get("is_sample")),
    } for a in recent]

    return {
        "meta": {
            "today": iso(today), "from": iso(frm), "to": iso(to),
            "maturity": maturity, "min_sample": min_n,
            "weekly_target": weekly_target,
            "weekly_days_target": int(t.get("weekly_days", 5)),
            "daily_target": int(t.get("daily_apps", 1)),
            "daily_minutes_target": int(t.get("daily_minutes", 45)), 
            "start_date": t.get("start_date"),
        },
        "overall": overall, "funnel": funnel, "rejections": rejections,
        "timing": timing, "categories": categories, "strategy": strategy,
        "trends": {"daily": daily, "weekly": weekly, "monthly": monthly},
        "habit": {"series": habit["series"][-140:], "active_days": habit["active_days"],
                  "elapsed": habit["elapsed"], "showup": habit["showup"],
                  "current_streak": habit["current_streak"],
                  "longest_streak": habit["longest_streak"],
                  "week_minutes": habit["week_minutes"],
                  "week_active_days": habit["week_active_days"],
                  "week_applications": habit["week_applications"],
                  "week_effort_days": habit["week_effort_days"],
                  "minutes_target_days": habit["minutes_target_days"],
                  "minutes_target_pct": habit["minutes_target_pct"]},
        "insights": insights, "attention": attention, "recent": recent,
    }


# ---------------------------------------------------------------------------
# insights
# ---------------------------------------------------------------------------
def build_insights(cohort, mature, derived, overall, funnel, rejections,
                   categories, strategy, habit, min_n, maturity, today):
    out = []

    def add(topic, observation, experiment, n, tone="neutral"):
        out.append({"topic": topic, "observation": observation,
                    "experiment": experiment, "n": n,
                    "evidence": evidence(n, min_n), "tone": tone})

    if overall["sample_present"]:
        add("Demo data active",
            "Fictional sample records are still loaded. Every number here is a DEMO, not your job search.",
            "Open Settings → Data management → Remove sample data, then enter your own applications.",
            overall["total"], "warn")

    add("Consistency is the foundation",
        "You showed up on %d of %d elapsed days (%s). Longest streak: %d days; current streak: %d." %
        (habit["active_days"], habit["elapsed"], pct(habit["showup"]),
         habit["longest_streak"], habit["current_streak"]),
        "Protect a fixed 25-minute daily slot. A zero-application day still counts if you sourced, messaged or learned.",
        habit["active_days"])

    l7, p7 = overall["last7"], overall["prev7"]
    add("Activity direction",
        "Last 7 days: %d applications. Previous 7 days: %d. %s" %
        (l7, p7, "Volume is up." if l7 > p7 else ("Volume is down." if l7 < p7 else "Volume is steady.")),
        "Aim for a steady range rather than bursts. If volume fell, check whether sourcing time fell too.",
        l7 + p7)

    add("Quality vs quantity",
        "%d of %d applications (%s) were tailored to the job description." %
        (overall["tailored_n"], overall["total"], pct(overall["tailored_rate"])),
        "If tailoring is below ~70%, try 3 tailored applications instead of 8 generic ones for two weeks.",
        overall["total"])

    eligible = [c for c in categories if c["eligible"] and c["response_rate"] is not None]
    if eligible:
        best = max(eligible, key=lambda c: c["response_rate"])
        worst = min(eligible, key=lambda c: c["response_rate"])
        add("Best-performing category",
            "%s has the highest response rate among categories with enough data (%s, n=%d)." %
            (best["label"], pct(best["response_rate"]), best["n"]),
            "Shift one or two weekly applications here, but keep a small bet on other categories so you keep learning.",
            best["n"], "good")
        add("Weakest category",
            "%s has the lowest eligible response rate (%s, n=%d). Categories below n=%d are unknown, not bad." %
            (worst["label"], pct(worst["response_rate"]), worst["n"], min_n),
            "Before dropping a category, send at least %d tailored applications there." % min_n,
            worst["n"])
    else:
        add("Categories need more data",
            "No category has reached the minimum sample size of %d yet." % min_n,
            "Keep collecting data. A handful of applications cannot distinguish a bad category from bad luck.",
            overall["total"])

    def best_block(key):
        rows = [r for r in strategy[key]["rows"] if r["n"] >= min_n and r["response_rate"] is not None]
        return max(rows, key=lambda r: r["response_rate"]) if rows else None

    b = best_block("resume")
    add("Resume version",
        ("%s currently has the best response rate (%s, n=%d) among versions with enough data." %
         (b["label"], pct(b["response_rate"]), b["n"])) if b else
        "No resume version has reached the minimum sample size yet.",
        "Change ONE thing at a time (headline, first two bullets, project order) and log it as a new version in Settings.",
        b["n"] if b else 0, "good" if b else "neutral")

    for key, topic, experiment in [
        ("tailored", "Tailoring effect",
         "For two weeks, tailor every application in one category and compare against that category's earlier rate."),
        ("cover", "Cover letter effect",
         "A/B test on similar roles: same resume, cover letter on alternating applications."),
        ("referral", "Referral effect",
         "Spend 15 minutes a day on one warm message; log it in the Daily Log so you can see the effort cost."),
    ]:
        rows = strategy[key]["rows"]
        yes = next((r for r in rows if r["label"] == "Yes"), None)
        no = next((r for r in rows if r["label"] == "No"), None)
        if yes and no:
            lift = (yes["response_rate"] - no["response_rate"]
                    if None not in (yes["response_rate"], no["response_rate"]) else None)
            add(topic,
                "Response rate %s with (n=%d) versus %s without (n=%d). Difference: %s." %
                (pct(yes["response_rate"]), yes["n"], pct(no["response_rate"]), no["n"],
                 "not measurable yet" if lift is None else pp(lift)),
                experiment, min(yes["n"], no["n"]),
                "good" if lift is not None and lift > 0.1 else "neutral")

    valid = [f for f in funnel[:4] if f["rate"] is not None]
    if valid:
        leak = min(valid, key=lambda f: f["rate"])
        add("Biggest funnel leak",
            "The smallest conversion is %s at %s (denominator n=%d). Mature-cohort rate: %s." %
            (leak["label"], pct(leak["rate"]), leak["den"], pct(leak["mrate"])),
            "A low App→HR rate points to resume/targeting; HR→Tech to screening stories; Final→Offer to fit or negotiation.",
            leak["den"])

    mature_rej = next((r for r in rejections if r["label"] == "Resume screening rejection rate"), None)
    if mature_rej:
        add("Resume screen (mature cohort)",
            "Among applications at least %d days old, resume-screen rejections are %s of known outcomes (n=%d)." %
            (maturity, pct(mature_rej["mrate"]), mature_rej["mden"]),
            "If high, rewrite the top third of the resume and mirror the job description's keywords before increasing volume.",
            mature_rej["mden"])

    add("Pending backlog (not failures)",
        "There are %d pending applications and %d with no reply beyond the configured threshold." %
        (overall["pending"], overall["stale"]),
        "Send polite follow-ups to the overdue ones. Never mark them as rejections — they are still alive.",
        overall["pending"])

    add("Offers so far",
        "Offers: %d from %d applications (%s end-to-end)." %
        (overall["offers"], overall["total"], pct(overall["offer_rate"])),
        "Offers are rare events. Judge progress with intermediate signals (responses, HR invitations), not just offers.",
        overall["total"])

    b = best_block("source")
    add("Best job source",
        ("%s has the strongest response rate (%s, n=%d) among sources with enough data." %
         (b["label"], pct(b["response_rate"]), b["n"])) if b else
        "No source has reached the minimum sample size yet.",
        "Double down on the winning source, but keep one secondary channel so you are not dependent on a single platform.",
        b["n"] if b else 0)

    missing = sum(1 for a in derived if not (a.get("applied") or "").strip() or
                  not (a.get("status") or "").strip() or not (a.get("resume") or "").strip())
    add("Data quality",
        "%d application(s) are missing a date applied, status or resume version." % missing,
        "Fill those in — an application without a Date applied is invisible to every cohort metric.",
        overall["total"], "warn" if missing else "neutral")

    add("How to read these lines",
        "Minimum reliable n = %d. Below that, differences of a few percentage points are usually noise." % min_n,
        "Run one experiment at a time for 2–3 weeks. Use the cohort filter to compare before/after periods fairly.",
        overall["total"])
    return out
