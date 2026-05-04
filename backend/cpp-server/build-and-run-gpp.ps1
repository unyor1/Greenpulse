$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$compiler = Get-Command g++ -ErrorAction SilentlyContinue
if (-not $compiler) {
  Write-Error "g++ not found. Install MinGW-w64 and ensure g++ is on PATH, or use build-and-run.ps1 with MSVC."
}

g++ -std=c++17 -O2 -Wall -Wextra main.cpp -lws2_32 -o cpp-backend.exe
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "Starting C++ backend on http://localhost:8080"
./cpp-backend.exe
