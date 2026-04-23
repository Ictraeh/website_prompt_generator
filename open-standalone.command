#!/bin/bash
# No Python / no port: opens standalone.html in your default browser (file://).
DIR="$(cd "$(dirname "$0")" && pwd)"
open "$DIR/standalone.html"
echo "Opened: $DIR/standalone.html"
sleep 2
