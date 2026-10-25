#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "Hirepath — Job Search OS"
echo "========================"

if command -v docker >/dev/null 2>&1; then
  if docker compose version >/dev/null 2>&1; then
    COMPOSE="docker compose"
  elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE="docker-compose"
  else
    COMPOSE=""
  fi

  if [ -n "$COMPOSE" ]; then
    mkdir -p data
    echo "Building and starting the container on http://localhost:2027 ..."
    $COMPOSE up -d --build
    echo
    echo "Running. Open http://localhost:2027"
    echo "Logs:  $COMPOSE logs -f"
    echo "Stop:  $COMPOSE down"
    exit 0
  fi
fi

echo "Docker not found — starting with the system Python instead."
echo "(Install Docker for the recommended setup.)"
mkdir -p data
PORT=2027 DB_PATH="$(pwd)/data/jobsearch.db" python3 server.py
