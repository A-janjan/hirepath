#!/usr/bin/env python3
"""Job Search Tracker — zero-dependency HTTP server (Python standard library only)."""
import json
import mimetypes
import os
import re
import sys
import traceback
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote

import store
import analytics

BASE = Path(__file__).resolve().parent
WEB = BASE / "web"
PORT = int(os.environ.get("PORT", "2027"))

MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".json": "application/json; charset=utf-8",
    ".ico": "image/x-icon",
    ".png": "image/png",
}


def parse_date(s):
    return analytics.parse(s)


def state_payload(qs):
    frm = parse_date((qs.get("from") or [""])[0])
    to = parse_date((qs.get("to") or [""])[0])
    con = store.connect()
    try:
        cfg = store.get_settings(con)
        apps = store.all_applications(con)
        days = store.all_days(con)
        a = analytics.build(apps, days, cfg, frm=frm, to=to)
        return {
            "settings": cfg,
            "applications": apps,
            "daily_log": days,
            "analytics": a,
        }
    finally:
        con.close()


class Handler(BaseHTTPRequestHandler):
    server_version = "JobSearchTracker/1.0"

    # ------------------------------------------------------------------ utils
    def _send(self, code, body, ctype="application/json; charset=utf-8", extra=None):
        if isinstance(body, (dict, list)):
            body = json.dumps(body, ensure_ascii=False, default=str).encode("utf-8")
        elif isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _json_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if not length:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def _static(self, path):
        rel = "index.html" if path in ("/", "") else path.lstrip("/")
        rel = unquote(rel).replace("..", "")
        f = WEB / rel
        if not f.is_file() or not str(f.resolve()).startswith(str(WEB.resolve())):
            return self._send(404, {"error": "Not found"})
        ctype = MIME.get(f.suffix.lower()) or mimetypes.guess_type(str(f))[0] or "application/octet-stream"
        return self._send(200, f.read_bytes(), ctype)

    def log_message(self, fmt, *args):
        if os.environ.get("QUIET") != "1":
            sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), fmt % args))

    # ------------------------------------------------------------------- verbs
    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        u = urlparse(self.path)
        p, qs = u.path, parse_qs(u.query)
        try:
            if not p.startswith("/api/"):
                return self._static(p)
            if p == "/api/health":
                return self._send(200, {"ok": True, "date": date.today().isoformat()})
            if p == "/api/state":
                return self._send(200, state_payload(qs))
            if p == "/api/export":
                con = store.connect()
                try:
                    return self._send(200, store.export_all(con), extra={
                        "Content-Disposition": 'attachment; filename="job-search-backup.json"'})
                finally:
                    con.close()
            return self._send(404, {"error": "Unknown endpoint"})
        except Exception as exc:
            traceback.print_exc()
            return self._send(500, {"error": str(exc)})

    def do_POST(self):
        self._mutate("POST")

    def do_PUT(self):
        self._mutate("PUT")

    def do_DELETE(self):
        self._mutate("DELETE")

    def _mutate(self, method):
        u = urlparse(self.path)
        p = u.path
        con = store.connect()
        try:
            body = {}
            if method in ("POST", "PUT"):
                try:
                    body = self._json_body()
                except Exception:
                    return self._send(400, {"error": "Invalid JSON body"})

            if p == "/api/applications" and method == "POST":
                if not (body.get("company") or "").strip():
                    return self._send(400, {"error": "Company name is required"})
                return self._send(201, {"id": store.upsert_application(con, body)})

            m = re.match(r"^/api/applications/(.+)$", p)
            if m:
                aid = unquote(m.group(1))
                if method == "PUT":
                    body["id"] = aid
                    return self._send(200, {"id": store.upsert_application(con, body)})
                if method == "DELETE":
                    store.delete_application(con, aid)
                    return self._send(200, {"ok": True})

            if p == "/api/daily-log" and method == "POST":
                if not body.get("date"):
                    return self._send(400, {"error": "Date is required"})
                return self._send(201, {"date": store.upsert_day(con, body)})

            m = re.match(r"^/api/daily-log/(.+)$", p)
            if m and method == "DELETE":
                store.delete_day(con, unquote(m.group(1)))
                return self._send(200, {"ok": True})

            if p == "/api/settings" and method == "PUT":
                cfg = body.get("settings", body)
                return self._send(200, {"settings": store.save_settings(con, cfg)})

            if p == "/api/sample/clear" and method == "POST":
                store.clear_sample(con)
                return self._send(200, {"ok": True})

            if p == "/api/sample/load" and method == "POST":
                store.seed_sample(con)
                return self._send(200, {"ok": True})

            if p == "/api/reset" and method == "POST":
                store.reset_all(con)
                return self._send(200, {"ok": True})

            if p == "/api/import" and method == "POST":
                payload = body.get("payload", body)
                if not isinstance(payload, dict) or "applications" not in payload:
                    return self._send(400, {"error": "Not a valid backup file"})
                store.import_all(con, payload)
                return self._send(200, {"ok": True})

            return self._send(404, {"error": "Unknown endpoint"})
        except Exception as exc:
            traceback.print_exc()
            return self._send(500, {"error": str(exc)})
        finally:
            con.close()


def main():
    store.init_db()
    srv = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    srv.daemon_threads = True
    print("Job Search Tracker running at http://0.0.0.0:%d" % PORT, flush=True)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        srv.shutdown()


if __name__ == "__main__":
    main()
