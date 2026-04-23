#!/bin/bash
# Double-click in Finder. Keeps this window open while the server runs.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR" || exit 1

PORT=8765
if ! command -v python3 >/dev/null 2>&1; then
  osascript -e 'display dialog "未检测到 python3。请安装 Python 3，或双击同目录的 open-standalone.command 直接打开页面（无需服务器）。" buttons {"OK"} default button "OK"' 2>/dev/null || \
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

URL="http://127.0.0.1:$PORT/standalone.html"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  目录: $DIR"
echo "  地址: $URL"
echo "  勿关闭本窗口；关闭即停止服务 (Ctrl+C 也可停止)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

( sleep 1 && open "$URL" ) &

exec python3 -m http.server "$PORT"
