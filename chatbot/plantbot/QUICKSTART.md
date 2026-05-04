# 🚀 Quick Start Guide

## 1-Minute Setup

1. **Install Node.js** → https://nodejs.org (LTS)
2. **Done!** No other dependencies needed

## 2 Steps to Run

**Window 1: Start Backend**
```powershell
cd "Plant Assistant\backend"
npm install
npm start
```

**Window 2: Open App**
```powershell
cd "Plant Assistant\frontend\public"
# Windows: Double-click index.html
# Or: start index.html
```

## That's It!
- Chat window opens in your browser
- Start asking about plant care!
- No waiting for models to load
- Instant responses using plant care APIs

## Features You Have

✅ **Chat** - Ask about plant care (instant responses)  
✅ **Diagnose** - Describe plant problems  
✅ **Plant Library** - Browse care info  
✅ **Quick Guide** - Tips and tricks  

## If Something Doesn't Work

| Problem | Solution |
|---------|----------|
| Backend won't start | Make sure Node.js is installed: `node --version` |
| npm install fails | Try: `npm install` in the backend folder again |
| Can't find backend | Check http://localhost:5000 in browser |
| Browser won't load | Make sure you're opening `frontend/public/index.html` |

## Files to Know

- **frontend/public/index.html** - Main web page
- **backend/server.js** - Chat and API engine
- **backend/plantKnowledgeBase.js** - Plant and disease data
- **.env** - Configuration (in backend/)

## Adding More Plants

Edit `backend/plantKnowledgeBase.js` and add:
```javascript
yourPlant: {
    name: 'Your Plant',
    wateringFrequency: '2-3 days',
    sunlight: '6-8 hours full sun',
    temperature: '20-25°C',
    ph: '6.0-7.0',
    commonDiseases: ['Disease1', 'Disease2'],
    symptoms: {
        overwatered: 'Yellow leaves',
        underwatered: 'Brown tips'
    },
    tips: ['Tip 1', 'Tip 2']
}
```

Then restart backend (Ctrl+C, then `npm start`)

## APIs Used

- 🌿 **Perenual API** - Real plant database (free, no key needed)
- 📚 **Local Knowledge Base** - Curated disease & care info
- ⚡ **Zero Setup** - Everything works out of the box

## Next Steps

- [ ] Try asking the chatbot questions
- [ ] Test the disease diagnosis
- [ ] Add your favorite plants to the database
- [ ] Explore the plant library
- [ ] Share with friends!

---

Need more help? See **README.md** or **INSTALLATION.md**
