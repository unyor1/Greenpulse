@echo off
REM startup.bat - Helper script for Windows to start services

echo.
echo 🌱 Plant Care Assistant - Windows Startup
echo =========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo.
)

echo 🚀 Ready to start!
echo.
echo IMPORTANT: Start in this order:
echo.
echo 1. Open PowerShell/CMD in new window and run:
echo    ollama serve
echo.
echo 2. Then in another window, run:
echo    cd backend
echo    npm start
echo.
echo 3. Open frontend/public/index.html in your browser
echo.
pause
