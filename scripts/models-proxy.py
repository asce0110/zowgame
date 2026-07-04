#!/usr/bin/env python3
"""Tiny local proxy: intercepts /v1/models to inject 1M context window.
All other requests forwarded to CC Switch (127.0.0.1:15721)."""
import http.server, urllib.request, json, sys

TARGET = ("127.0.0.1", 15721)
LISTEN = ("127.0.0.1", 15722)

MODELS = {
    "object": "list",
    "data": [{"id": "gpt-5.5", "object": "model", "owned_by": "deepseek", "max_context_length": 1000000}]
}

class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/v1/models"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json"); self.end_headers()
            self.wfile.write(json.dumps(MODELS).encode()); return
        self._fwd("GET")
    def do_POST(self): self._fwd("POST")
    def do_OPTIONS(self): self._fwd("OPTIONS")
    def _fwd(self, method):
        url = f"http://{TARGET[0]}:{TARGET[1]}{self.path}"
        cl = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(cl) if cl > 0 else None
        req = urllib.request.Request(url, data=body, method=method)
        for k, v in self.headers.items():
            if k.lower() in ("host", "content-length"): continue
            req.add_header(k, v)
        try:
            with urllib.request.urlopen(req, timeout=600) as r:
                self.send_response(r.status)
                is_stream = False
                for k, v in r.headers.items():
                    if k.lower() == "content-length": continue
                    self.send_header(k, v)
                    if k.lower() == "content-type" and "event-stream" in v: is_stream = True
                self.end_headers()
                if is_stream:
                    while True:
                        chunk = r.read(4096)
                        if not chunk: break
                        try: self.wfile.write(chunk); self.wfile.flush()
                        except: break
                else: self.wfile.write(r.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code); self.end_headers(); self.wfile.write(e.read())
        except Exception as e:
            self.send_response(502); self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
    def log_message(self, *a): pass

if __name__ == "__main__":
    srv = http.server.HTTPServer(LISTEN, H)
    print(f"proxy: {LISTEN[0]}:{LISTEN[1]} -> {TARGET[0]}:{TARGET[1]}")
    try: srv.serve_forever()
    except KeyboardInterrupt: srv.shutdown()
