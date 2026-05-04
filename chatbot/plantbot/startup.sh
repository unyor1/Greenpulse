#!/bin/bash
# startup.sh - Helper script to start all services

echo "🌱 Plant Care Assistant - Startup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js which includes npm"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

echo ""
echo "🚀 Starting services..."
echo ""
echo "1. Start Ollama in a new terminal:"
echo "   ollama serve"
echo ""
echo "2. Starting Backend..."
cd backend
npm start
