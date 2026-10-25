# Hirepath — Job Search OS

Hirepath is a self-hosted job-search tracking application that runs locally on your computer and is accessible at **http://localhost:2027**.

It helps you track job applications, daily effort, interview progress, response rates, and job-search strategy through a dashboard and analytics.

## Key Features

- **Private by default:** No cloud account, sign-in, external API, CDN, external fonts, or telemetry is required by the application.
- **Self-hosted:** Your application records and analytics data stay on your own computer.
- **Containerized deployment:** Docker provides a consistent setup across supported operating systems.
- **Persistent storage:** SQLite stores your data in a local directory that survives container restarts and rebuilds.
- **Lightweight architecture:** Python's standard library and SQLite power the backend; the frontend uses plain HTML, CSS, and JavaScript.
- **Honest analytics:** Pending applications are not treated as rejections, silence is not automatically treated as a response, and small samples are flagged to discourage misleading conclusions.
- **Fictional demo data:** Sample records let you explore the dashboard before entering your own information.

---

## 1. Requirements

Hirepath supports two ways to run the application.

### Option A: Docker (recommended)

Install the following:

- Docker Engine or Docker Desktop, depending on your operating system.
- Docker Compose v2.
- A terminal or command-line environment.

Verify the installation:

```bash
docker --version
docker compose version
```

If either command fails, complete the installation and configuration steps for your platform before continuing.

Official Docker installation guides:

- [Docker Desktop](https://docs.docker.com/desktop/)
- [Docker Engine](https://docs.docker.com/engine/install/)

On some systems, Docker commands may require administrator privileges or additional permission configuration.

### Option B: Run directly with Python

For a lightweight local trial, install **Python 3.10 or newer**.

This option avoids Docker but requires the appropriate Python runtime and any other prerequisites specified by the project.

---

## 2. Installation and Startup

### Step 1: Obtain the project

Clone the repository or download and extract the project files.

If you use Git:

```bash
git clone https://github.com/A-janjan/hirepath.git
cd hirepath
```

Replace the placeholders with the actual repository URL and directory name.

### Step 2: Start with Docker

From the project root, run:

```bash
docker compose up -d --build
```

Docker builds the application image if needed and starts the configured services in the background.

If the project provides a startup script compatible with your environment, you may use that instead.

On the first run, an internet connection may be required to download container images and dependencies. Subsequent startup may work offline if all required images and resources are already available locally.

### Step 3: Open the application

Visit:

**http://localhost:2027**

The application should be available through your local browser once the server has started successfully.

The provided Compose configuration binds the application to `127.0.0.1`, restricting access to the local computer by default.

### Step 4: Verify the startup

Check the service status:

```bash
docker compose ps
```

If the application does not start, inspect its logs:

```bash
docker compose logs -f
```

Use `Ctrl+C` to stop following the logs. This does not stop the application.

### Running without Docker

If you prefer the direct Python setup, open a terminal in the project directory and run:

```bash
python server.py
```

Depending on your environment, the Python executable may instead be named `python3` or `py`.

Then open http://localhost:2027.

This mode uses the application's configured SQLite data file. Docker remains the recommended option for a more consistent deployment.

---

## 3. First-Run Setup

Hirepath starts with a small set of **fictional sample applications and daily activity records**. These provide meaningful dashboard charts and analytics before you have entered your own data.

Follow these steps to configure your workspace:

1. Explore the Overview, application funnel, category comparisons, and Insights.
2. Open **Settings → Data management → Remove sample data** before entering real applications.
3. Configure your targets, application categories, statuses, resume versions, job sources, seniority levels, work arrangements, and location lists.
4. Set the job-search start date to the date you actually began tracking your search.
5. Add your first real application using **Add application**.

Removing sample data deletes only records marked as samples. Non-sample application and daily-log records are retained.

Reloading demo data does not overwrite an existing daily log for the same date.

---

## 4. Daily Workflow

Hirepath is designed to make daily job-search tracking take approximately **2–5 minutes**, excluding the time spent applying for jobs or preparing for interviews.

### When you apply for a job

Select **Add application** and record:

- Company and job title.
- Application category.
- Application date and current status.
- Resume version.
- Whether the resume was tailored.
- Whether you submitted a cover letter.
- Whether you used a referral.
- Job posting URL and any relevant notes.

Create one record per unique application.

When the process advances, update the existing record rather than creating a duplicate. Record interview invitation and completion dates as they occur.

The application supports HR, technical, and final interview stages, as well as offer and closure dates.

### At the end of a job-search session

Open **Daily Log → Log today**.

The application automatically calculates:

- Applications submitted.
- Tailored applications.
- Cover letters submitted.
- Interviews attended.

Record the remaining activity manually:

- New positions discovered.
- Follow-ups completed.
- Recruiter and networking messages.
- Time invested in minutes.
- Notes, lessons, and observations.

A day without applications can still be productive. Sourcing opportunities, networking, interview preparation, and learning all contribute to the job search.

Use the Daily Log to capture this work without duplicating application data.

### Weekly review

At the end of each week:

1. Compare your application count with your weekly target.
2. Review overdue follow-ups and long-pending applications.
3. Examine stage conversion and rejection rates.
4. Compare categories and application strategies, taking sample sizes into account.
5. Choose one experiment for the next two or three weeks.

Examples include tailoring every application in a specific category or testing a revised resume version.

---

## 5. Understanding the Analytics

### Pending applications are not failures

Applications awaiting a decision remain **Pending**, including applications for which an interview invitation has been received.

A long wait may trigger a follow-up reminder, but silence alone does not automatically count as rejection.

**Position closed / no response** is a separate outcome classification.

This distinction helps prevent unresolved applications from distorting rejection and response statistics.

### Funnel conversion and rejection rates

These metrics answer different questions.

- **Stage conversion rate:** Applications that reached the next stage divided by applications that reached the previous eligible stage. For example, technical interview invitations divided by HR interview invitations.
- **Stage rejection rate:** Explicit rejections at a particular stage divided by applications that reached that stage.
- **Resume-screen rejection rate:** Explicit resume rejections divided by applications with a known outcome, excluding pending applications.
- **Overall explicit rejection rate:** All explicit rejections divided by applications with a known outcome.
- **Response rate:** Applications with a recorded interview invitation, explicit rejection, or offer divided by the relevant application cohort. A no-response closure is not considered a response.
- **Offer rate:** Offers divided by applications in the selected application cohort.

Counts are displayed alongside percentages. When a denominator is zero, the application displays a dash instead of fabricating a rate.

### Cohorts, maturity, and sample size

Use **Change filter** to analyze applications submitted within a selected date range.

Recent applications have had less time to receive responses. Hirepath therefore also provides a **mature cohort** rate based on applications that are at least the configured maturity window old.

Configure the maturity window in Settings to reflect the typical response cycle for your target roles.

Small samples are labeled **Low n / Insufficient data**, while somewhat larger but still limited samples may be labeled **Early signal**.

These labels are practical warnings, not statistical guarantees.

Avoid major strategy changes based on a small number of applications or differences of only a few percentage points.

### Habit and consistency metrics

- **Active day:** A day on which applications, sourcing, follow-ups, messages, interview activity, time, or a note was recorded.
- **Show-up rate:** Active days divided by elapsed calendar days since the job-search start date.
- **Daily target attainment:** Days meeting the configured daily application target divided by active days.
- **Weekly target chart:** Applications submitted per week compared with the weekly target.
- **Time invested:** Minutes explicitly recorded in the Daily Log.

The application is intended to support a sustainable routine rather than reward overwork. Planned rest days reduce the calendar-based show-up rate, so configure your start date and targets according to your intended routine.

---

## 6. Data Storage, Backups, and Privacy

### Where data is stored

The default SQLite database is:

```text
./data/jobsearch.db
```

In Docker deployments, this directory is mounted into the container at `/app/data`.

Consequently, rebuilding or replacing the application container should not delete your records, provided the configured persistent storage is preserved.

### Exporting a backup

Open **Settings → Data management → Export backup** to download a JSON backup containing your application data and settings.

Create backups regularly and store them somewhere separate from the project directory. For additional protection, consider encrypted storage.

### Importing a backup

Use **Import backup** to restore a previously exported JSON backup.

**Important:** Importing a backup replaces the current records and settings. It is not a merge operation. Export your current data before importing another backup.

### Removing sample data versus resetting everything

- **Remove sample data:** Deletes records marked as samples while preserving non-sample records.
- **Reset everything:** Destructively removes records and settings and returns the application to its demo state.

Use the reset option only when you intend to start over.

### Security considerations

Hirepath is designed for one trusted user on the local computer. The application has no login system.

- Keep the service bound to `127.0.0.1` unless you have deliberately configured and secured another access method.
- Do not expose the application directly to a public network or the internet.
- Do not remove the localhost restriction from the Docker port mapping without understanding the security implications.
- Protect the project directory, database, and backups because they contain personal job-search information.
- Avoid sharing database files or backups unless you explicitly intend to disclose their contents.

Local hosting reduces exposure to external services, but it does not by itself encrypt local files or protect against malware or other users with access to your computer.

---

## 7. Troubleshooting

### The application is not accessible

1. Check whether the containers are running:

   ```bash
   docker compose ps
   ```

2. Inspect the logs:

   ```bash
   docker compose logs --tail=100
   ```

3. Confirm that the configured application port matches the address you are opening.
4. Check whether another application is already using the port.
5. Verify that the server started successfully before opening the browser.

### The configured port is already in use

Another application may already be listening on port `2027`.

Either stop the conflicting service or change the host-side port mapping in the Compose configuration.

For example, a mapping of `127.0.0.1:2028:2027` exposes the application at `http://localhost:2028` while retaining port `2027` inside the container.

If the application also reads a `PORT` environment variable, distinguish the host port from the internal application port and configure them according to the project's actual implementation.

### Docker reports a permission error

Check that the Docker service is running and that your user has permission to access it.

Depending on your platform and installation method, you may need administrator privileges or additional Docker configuration.

Follow the official documentation for your environment rather than applying platform-specific permission changes blindly.

### The dashboard shows only demo data

Open **Settings → Data management** and remove the sample records.

Then add your own applications. The application displays a warning when sample records remain.

### Back up data before updating

First export a JSON backup from the application.

You can also copy the SQLite database while the container is stopped:

```bash
docker compose down
```

```bash
cp data/jobsearch.db "$HOME/jobsearch-backup-$(date +%F).db"
```

```bash
docker compose up -d
```

The example uses a Unix-like shell. On other platforms, use the equivalent file-copy operation for your environment.

Do not delete the persistent data directory as part of an ordinary application update.

### The application cannot start without internet access

The application itself does not require external runtime services according to its intended architecture. However, a first-time Docker build may need to download images, and other setup steps may need to obtain dependencies.

Prepare the required images and dependencies in advance if you need to operate in an offline environment.

---

## 8. Project Structure

```text
project/
├── server.py
├── store.py
├── analytics.py
├── sample_model.py
├── web/
├── Dockerfile
├── docker-compose.yml
├── run.sh
└── data/
```

| File or directory | Purpose |
|---|---|
| `server.py` | Local HTTP server and JSON API |
| `store.py` | SQLite schema, persistence, import/export, and sample-data operations |
| `analytics.py` | Cohort, funnel, rejection, activity, comparison, and insight calculations |
| `sample_model.py` | Clearly identified fictional demo records |
| `web/` | Responsive interface and dependency-free SVG charts |
| `Dockerfile` | Container image definition |
| `docker-compose.yml` | Service configuration and startup settings |
| `run.sh` | Convenience script for compatible environments |
| `data/` | Runtime data directory; keep it private |

The data directory is created at runtime and should be preserved when updating the application.

---

## 9. Design Principles

Hirepath follows several principles:

1. **Privacy first:** Keep job-search records under the user's control.
2. **Low-friction tracking:** Make daily logging quick enough to sustain over time.
3. **Honest measurement:** Distinguish pending outcomes, explicit rejections, and non-responses.
4. **Evidence over intuition:** Use cohort analysis, stage conversion, and sample-size warnings to evaluate strategy.
5. **Data ownership:** Support exporting, backing up, and restoring user data.
6. **Portable deployment:** Prefer a consistent containerized setup while retaining a lightweight Python execution option.

Hirepath is a personal job-search management tool, not a guarantee of employment or a statistical prediction system. Its analytics are most useful when records are accurate, outcomes are updated consistently, and conclusions are proportional to the available evidence.
