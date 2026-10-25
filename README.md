# Hirepath — Job Search OS

A beautiful, private job-search tracker you run on your own Ubuntu laptop at **http://localhost:2027**. It replaces the spreadsheet with a responsive web app, SQLite database, analytics, and charts.

- **Self-hosted and private:** no cloud account, sign-in, external API, CDN, fonts, or telemetry. Data stays on your laptop.
- **Dockerized:** one command to build and start; the database is stored in `./data/` and survives container restarts.
- **No app dependencies:** Python standard library + SQLite on the server; plain HTML/CSS/JavaScript in the browser.
- **Honest metrics:** pending is not a rejection, no reply is not a response, and small samples are flagged rather than over-interpreted.
- **Fictional demo data:** a banner labels the sample records; remove them before entering real applications.

---

## 1. Install on Ubuntu

### Prerequisite: Docker Engine + Docker Compose v2

Install Docker Engine and the Docker Compose plugin using Docker's official Ubuntu instructions: <https://docs.docker.com/engine/install/ubuntu/>. Verify the tools are present:

```bash
docker --version
docker compose version
```

If you prefer Ubuntu packages, `docker.io` and `docker-compose-v2` may be available for your Ubuntu release. You may need to prefix Docker commands with `sudo`, or follow Docker's post-install instructions to use Docker as your normal user.

### Start Hirepath

1. Copy the `job-search-tracker` folder to your Ubuntu laptop.
2. In a terminal, go into that folder:

   ```bash
   cd ~/job-search-tracker
   ```

3. Start the app:

   ```bash
   ./run.sh
   ```

   On first run, Docker builds the image. An internet connection is needed only to download the base image; the app itself has no external runtime dependencies.

4. Open **http://localhost:2027** in your browser.

The Compose configuration binds the app to **127.0.0.1 only**. Other computers on the network cannot reach it by default.

### Stop, start, update

```bash
# Stop the app; data is kept
docker compose down

# Start again
docker compose up -d

# Rebuild after updating app files
docker compose up -d --build

# Follow server logs
docker compose logs -f
```

You can also stop the foreground app with `Ctrl+C` if you use the no-Docker fallback below.

### No-Docker fallback

For a quick local trial, Python 3.10+ is sufficient:

```bash
cd ~/job-search-tracker
python3 server.py
```

Then open **http://localhost:2027**. This uses the same SQLite data file under `./data/`. Docker remains the recommended long-term setup.

---

## 2. First-run setup

Hirepath starts with a small set of **fictional** sample applications and daily activity. This makes the dashboard and charts useful before you have any personal records.

1. Explore the Overview, funnel, category comparisons, and Insights.
2. Open **Settings → Data management → Remove sample data** before entering real applications. The demo records have a visible warning banner and sample markers.
3. In **Settings**, edit your targets, categories, statuses, resume versions, job sources, seniority, work-arrangement, and location lists. Set the **job-search start date** to the date you actually began (or are beginning) your search so the show-up rate uses the right calendar window.
4. Add your first real application from the **Add application** button.

Removing the demo data deletes only rows marked as sample. Your non-sample application rows and daily-log rows are retained. The demo reload action does not overwrite a daily log that already exists on the same date.

---

## 3. Daily use (about 2–5 minutes)

### When you apply

Use **Add application** and enter company, role, category, date applied, current status, resume version, and the three strategy flags: tailored, cover letter, referral. Add the job URL and other context if useful. There is one record per unique application.

When the process moves forward, edit the same application and update its status. Add the **invited** and **completed** dates for HR, technical, and final interviews as they happen. These dates preserve stage history and let the app distinguish an invitation from an interview attended. Add the offer date or close date when appropriate.

### At the end of a job-search session

Open **Daily Log → Log today**. Applications submitted, tailored applications, cover letters, and attended interviews are automatically calculated from the Applications list. You only enter the other activity: new positions discovered, follow-ups, recruiter/networking messages, minutes, and a note or lesson.

A zero-application day can still be an active day: sourcing, networking, interview preparation, or learning counts. Use the log to capture that work, not to duplicate application data.

### Weekly review

- Check your weekly applications against the target.
- Review follow-ups due and old pending applications.
- Compare stage conversion in **Funnel & Rates**.
- Look for category and strategy patterns, while noting sample sizes.
- Pick one experiment for the next 2–3 weeks (for example: tailor every application in one category, or revise one resume version).

---

## 4. How to read the analytics

### Pending is not failure

Applications still awaiting a decision remain **Pending**, including applications that have received an interview invitation. A long wait may trigger a follow-up reminder, but the app does **not** automatically mark silence as rejection. **Position closed / no response** is a separate outcome class.

### Funnel rates and rejection rates answer different questions

- **Conversion:** applications that reached the next stage ÷ applications that reached the prior eligible stage. Example: technical invitations ÷ HR invitations.
- **Stage rejection:** explicit rejections at a given stage ÷ applications that reached that stage.
- **Resume-screen rejection:** explicit resume rejections ÷ applications with a known outcome (pending excluded).
- **Overall explicit rejection:** all explicit rejections ÷ applications with a known outcome.
- **Response rate:** an application counts as a response if an interview invitation, explicit rejection, or offer is recorded. A no-response closure is not a response.
- **Offer rate:** offers ÷ applications in the selected application cohort.

Counts are shown alongside percentages. If the denominator is zero, the app displays a dash rather than inventing a rate.

### Cohorts, maturity, and sample size

Use **Change filter** to compare applications submitted within a date range. Recent applications have not had as much time to receive replies, so the app also shows a **mature cohort** rate based on applications at least the configured maturity window old. Set the maturity window in Settings to reflect the typical response cycle for the roles you target.

Comparisons below the minimum sample size are labelled **Low n / Insufficient data**; somewhat larger groups remain an **Early signal**. These are guideposts, not statistical guarantees. Do not make a major strategy change based on a tiny sample or a difference of a few percentage points.

### Habit metrics

- **Active day:** applications, sourcing, follow-ups, messages, interview activity, time, or a note was recorded.
- **Show-up rate:** active days ÷ elapsed days since the start of your search.
- **Daily target attainment:** days with at least the configured daily application target ÷ active days.
- **Weekly target chart:** submitted applications by week compared to your weekly target.
- **Time invested:** minutes explicitly logged in Daily Log; application data is not used to guess effort time.

Consistency is meant to support a sustainable routine, not to reward overwork. A planned rest day will reduce the calendar show-up percentage; choose your start date and targets to suit the rhythm you want to maintain.

---

## 5. Data, backups, and privacy

- The SQLite database is `./data/jobsearch.db`. Docker mounts this folder to `/app/data` inside the container, so rebuilding or replacing the container does not remove your records.
- In **Settings → Data management → Export backup**, download a JSON copy periodically. Keep the backup somewhere separate from the project folder (for example, an encrypted drive).
- Use **Import backup** to replace the current records and settings with a saved JSON export. Import is a full replacement, not a merge.
- Removing a sample set is safe and selective. **Reset everything** is destructive: it wipes records and settings and returns to the demo state.
- The server is intended for one trusted user on the same laptop. It has no login. Keep the port bound to localhost; do not remove the `127.0.0.1:` prefix from the Compose port mapping or expose it through a router/proxy.
- `./data/` is excluded from the Docker build context. Never share the database or a backup unless you intend to share personal job-search information.

---

## 6. Current fields

### Applications

Application ID; company; title; configurable category; seniority; location/country; remote/hybrid/onsite; posting URL; source; discovery date; applied date; status; follow-up date; notes; resume version; cover letter; referral; tailored; HR invitation/completion dates; technical invitation/completion dates; final invitation/completion dates; offer date; closed date.

### Daily Log

Date; new positions discovered; applications submitted (automatic); tailored applications (automatic); cover letters (automatic); follow-ups; recruiter/networking messages; interviews attended (automatic from completion dates); minutes; notes and lessons.

---

## 7. Troubleshooting

### Port 2027 is already in use

Find the process occupying it, stop that process, or change both the host side of the Compose mapping and the `PORT` setting. To retain the requested address, stop the competing service and run `docker compose up -d` again.

### Docker says permission denied

Run the Docker commands with `sudo`, or apply Docker's official post-install steps to allow your user to access the Docker daemon. Log out and back in after changing Docker group membership.

### Dashboard has only demo numbers

Remove the sample records from **Settings → Data management** and add your own applications. The banner explicitly indicates when any sample rows remain.

### I need to back up before updating

Use **Export backup**, then optionally copy `./data/jobsearch.db` while the container is stopped:

```bash
docker compose down
cp data/jobsearch.db "$HOME/jobsearch-backup-$(date +%F).db"
docker compose up -d
```

---

## Project files

- `server.py` — local HTTP server and JSON API
- `store.py` — SQLite schema, persistence, import/export, and sample-data actions
- `analytics.py` — cohort, funnel, rejection, activity, comparison, and insight calculations
- `sample_model.py` — clearly fictional demo records
- `web/` — responsive UI and dependency-free SVG charts
- `Dockerfile`, `docker-compose.yml`, `run.sh` — container/build/start setup
- `data/` — created at runtime; keep it private
