#!/usr/bin/env python3
"""
Static file server for local preview.
`python3 -m http.server` does NOT serve index.html for GET / — only a directory listing.
This handler maps / → index.html so http://127.0.0.1:PORT/ opens the vibe tool.
"""
from __future__ import annotations

import argparse
import http.server
import os
import socketserver
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent


class RootIndexHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self) -> None:  # noqa: N802 — stdlib name
        u = urlparse(self.path)
        if u.path in ("", "/"):
            self.path = "/index.html" + (f"?{u.query}" if u.query else "")
        return super().do_GET()


def main() -> None:
    p = argparse.ArgumentParser(description="Serve vibe-prompt-tool with / → index.html")
    p.add_argument(
        "port",
        type=int,
        nargs="?",
        default=int(os.environ.get("PORT", "8765")),
        help="Listen port (default: PORT env or 8765)",
    )
    args = p.parse_args()
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", args.port), RootIndexHandler) as httpd:
        print(f"Serving {ROOT}")
        print(f"  http://127.0.0.1:{args.port}/  → index.html")
        print(f"  http://127.0.0.1:{args.port}/standalone.html  (bundled offline)")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
