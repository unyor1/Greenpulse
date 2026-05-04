# Installation Guide for Plant Care Assistant

## Simple Setup - Just Node.js!

This chatbot is simple to set up - only needs Node.js, no complex dependencies.

## Step 1: Install Node.js
1. Go to https://nodejs.org
2. Download LTS version (recommended)
3. Run installer, accept defaults
4. Open PowerShell/Terminal and verify:
   ```
   node --version
   npm --version
   ```

## That's It for Setup!
You don't need Ollama, Docker, or any other dependencies. Just Node.js.

## Step 2: Install Backend Dependencies
```powershell
cd "Plant Assistant"
cd backend
npm install
```

This downloads all the packages (takes 1-2 minutes first time).

## Step 3: Start the Application

**Terminal 1: Start Backend**
```powershell
cd "Plant Assistant\backend"
npm start
```

You should see:
```
🌱 Plant Assistant Backend is running on http://localhost:5000
📚 Using Plant Care APIs (Perenual + Local Database)
✅ No setup needed - just start chatting!
```

**Terminal 2: Open Frontend**
```powershell
cd "Plant Assistant\frontend\public"
start index.html
```

## That's It!
- Browser opens with the plant assistant
- Chat immediately - no waiting
- No model downloads
- No AI training

## First Run

When you send your first message:
- Instant response (1-2 seconds)
- Uses plant care database
- Real, curated information

## Troubleshooting

### "node: command not found"
- **Solution**: Restart your terminal after installing Node.js
- If still doesn't work, add Node.js to PATH:
  1. Control Panel → System → Advanced System Settings
  2. Environment Variables
  3. Add Node.js installation folder to PATH

### "npm ERR! code ENOENT"
- **Solution**: Make sure you're in the right directory
  ```powershell
  cd "Plant Assistant\backend"
  npm install
  ```

### "npm ERR! code EACCES"
- **Solution**: Try running PowerShell as Administrator
- Or: Clear npm cache: `npm cache clean --force`

### "Cannot find module express"
- **Solution**: Run `npm install` in the backend folder
- Make sure you're in: `Plant Assistant\backend`

### Port 5000 already in use
- **Solution**: Either:
  1. Close the other application using port 5000
  2. Or change port in `.env` file to 5001, etc.

### Browser won't load
- Make sure you're opening: `frontend/public/index.html`
- Not: `index.html` or any other file
- Full path: `C:\Users\Osurman\Desktop\PLANT ASSISTANT\frontend\public\index.html`

### Backend shows error
- Check error message in terminal
- Most common: "Port already in use"
- Solution: Change PORT in `.env` to 5001 or different number

## Configuration

Edit `backend/.env` if you need to change settings:
```
PORT=5000                    # Change if port is busy
PERENUAL_API_URL=...         # Plant API (leave as is)
NODE_ENV=development         # Change to 'production' for deployment
```

## What Gets Downloaded?

When you run `npm install`, these packages are downloaded:
- **express** (web server framework)
- **cors** (cross-origin requests)
- **axios** (HTTP requests)
- **dotenv** (environment config)
- **uuid** (unique IDs)
- **sharp** (image processing)

Total: ~50MB for all dependencies

## Updating Dependencies

To update all packages to latest versions:
```powershell
npm update
```

## Running in Development Mode

For faster restart during development:
```powershell
npm install -g nodemon  # Install once globally
npm run dev             # Use development mode
```

nodemon restarts server automatically when you edit files.

## Next Steps

1. ✅ Start backend: `npm start`
2. ✅ Open frontend: `index.html`
3. ✅ Ask the chatbot questions
4. ✅ Test disease diagnosis
5. ✅ Explore plant library
6. ✅ Customize with your own plants

## Advanced: Environment Variables

Edit `backend/.env` to customize:

```env
# Server port
PORT=5000

# API endpoints
PERENUAL_API_URL=https://perenual.com/api

# Frontend origin (for CORS)
CORS_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=development

# Request timeout (milliseconds)
API_TIMEOUT=10000
```

## Need Help?

- **Quick Start**: See `QUICKSTART.md`
- **Full Guide**: See `README.md`
- **Errors**: Check backend terminal output first
- **Browser Issues**: Press F12 to open Developer Tools

---

Enjoy your plant assistant! 🌿
