FROM python:3.11-slim

# Zero third-party dependencies: the whole app runs on the Python standard
# library + SQLite. No pip install, no build step, works fully offline.
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=2027 \
    DB_PATH=/app/data/jobsearch.db \
    TZ=Europe/Helsinki

WORKDIR /app
COPY . .
RUN mkdir -p /app/data && python -m compileall -q server.py store.py analytics.py sample_model.py

EXPOSE 2027

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:2027/api/health', timeout=3)" || exit 1

CMD ["python", "server.py"]
