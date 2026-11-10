"""Serve the website locally, choosing the next port if one is busy."""

import errno
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def main():
    root = Path(__file__).resolve().parent.parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    for port in range(4173, 4273):
        try:
            server = ThreadingHTTPServer(("127.0.0.1", port), handler)
            break
        except OSError as error:
            if error.errno != errno.EADDRINUSE:
                raise
    else:
        raise SystemExit("No available local port between 4173 and 4272.")

    if port != 4173:
        print(f"Port 4173 is busy; using port {port} instead.", flush=True)
    print(f"Website: http://127.0.0.1:{port}\nPress Ctrl+C to stop.", flush=True)
    with server:
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
