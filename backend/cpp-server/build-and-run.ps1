$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$compiler = Get-Command cl.exe -ErrorAction SilentlyContinue
if (-not $compiler) {
  Write-Error "MSVC cl.exe not found. Open 'x64 Native Tools Command Prompt for VS' and run this script again."
}

cl.exe /nologo /std:c++17 /EHsc main.cpp /Fe:cpp-backend.exe /link Ws2_32.lib
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "Starting C++ backend on http://localhost:8080"
./cpp-backend.exe
