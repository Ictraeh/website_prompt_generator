#!/bin/bash
# Double-click in Finder. Keeps this window open while the server runs.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR" || exit 1

PORT=8765
if ! command -v python3 >/dev/null 2>&1; then
  osascript -e 'display dialog "python3 was not found. Install Python 3, or double-click open-standalone.command in this folder to open the page without a server." buttons {"OK"} default button "OK"' 2>/dev/null || \
    echo "python3 not found. Install Python 3 or use open-standalone.command"
  exit 1
fi

while lsof -iTCP:"$PORT" -sTCP:LISTEN -n -P >/dev/null 2>&1; do
  echo "Port $PORT is in use, trying $((PORT + 1))..."
  PORT=$((PORT + 1))
  if [[ "$PORT" -gt 8805 ]]; then
    echo "No free port between 8765-8805."
    exit 1
  fi
done

URL="http://127.0.0.1:$PORT/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Folder: $DIR"
echo "  App:    $URL  → index.html (serve-local.py)"
echo "  Also:   http://127.0.0.1:$PORT/standalone.html"
echo "  Leave this window open while serving (Ctrl+C to stop)."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

( sleep 1 && open "$URL" ) &

exec python3 "$DIR/serve-local.py" "$PORT"
