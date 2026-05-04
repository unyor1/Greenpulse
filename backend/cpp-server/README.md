# C++ Backend (Windows)

This folder contains a minimal C++ HTTP server for the dashboard.

## Endpoints

- `GET /health` -> `{ "ok": true }`


## Build and run (MSVC)

1. Open **x64 Native Tools Command Prompt for VS**.
2. Run:

```powershell
cd c:\xampp\htdocs\greenpulse\backend\cpp-server
powershell -ExecutionPolicy Bypass -File .\build-and-run.ps1
```

The API will be available at `http://localhost:8080`.

## Build and run (MinGW g++)

If you use MinGW-w64 and `g++` is on PATH:

```powershell
cd c:\xampp\htdocs\greenpulse\backend\cpp-server
powershell -ExecutionPolicy Bypass -File .\build-and-run-gpp.ps1
```

## Notes

- This sample is intentionally small and provides lightweight demo endpoints.
- If you restart the server, any in-memory state resets.
- CORS is enabled for local frontend development.
