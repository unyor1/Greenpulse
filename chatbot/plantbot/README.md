# 🌱 Plant Care Assistant - AI Chatbot

A smart AI-powered chatbot for plant care advice, disease diagnosis, and gardening tips. Built with Node.js/Express backend and vanilla JavaScript frontend, powered by plant care APIs.

## Features

- 💬 **Chat with Expert** - Ask questions about plant care, watering, lighting, etc.
- 🔍 **Disease Diagnosis** - Describe symptoms and get disease identification and treatment
- 🌿 **Plant Library** - Browse care information for plants
- 📖 **Quick Guide** - Essential plant care tips and best practices
- ⚡ **Zero Setup** - No local AI training, uses plant care APIs

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **APIs**: Perenual (plant database), local knowledge base
- **No AI Training Needed**: Pure plant knowledge database

## Prerequisites

- Node.js 16+ ([Download](https://nodejs.org))
- npm (comes with Node.js)

## Installation

### 1. Clone/Extract the Project
```bash
cd "PLANT ASSISTANT"
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

## Running the Application

### Start Backend
```bash
cd backend
npm start
# Or use nodemon for development:
npm run dev
```
Backend will run on http://localhost:5000

### Open Frontend
Open `frontend/public/index.html` in your browser

Or serve it with Python:
```bash
cd frontend
python -m http.server 3000
# Then visit http://localhost:3000
```

## How to Use

### Chat Tab
- Ask any plant care question
- Describe plant symptoms
- Get watering and lighting advice
- Example: "How often should I water basil?"

### Diagnose Tab
- Describe plant symptoms in detail
- Get diagnosis of potential diseases
- Receive treatment recommendations
- Example: "Yellow leaves, soft stem"

### Plant Library
- Browse pre-loaded plant information
- View care requirements
- See common diseases and solutions
- Click any plant to see full details

### Quick Guide
- Quick reference for common care topics
- Watering, lighting, humidity, fertilizing tips
- Common pest identification
- General best practices

## API Endpoints

### Chat
```bash
POST /api/chat
Body: { "message": "Your question" }
Response: { "id": "uuid", "message": "Response", "source": "plant-database" }
```

### Disease Diagnosis
```bash
POST /api/diagnose
Body: { "symptoms": "Describe symptoms" }
Response: { "diagnosis": "Diagnosis and treatment" }
```

### Search Plants
```bash
GET /api/search-plants?query=tomato
GET /api/plants-search/tomato
```

### Plant Information
```bash
GET /api/plants
GET /api/plants/{plantName}
```

### Health Check
```bash
GET /api/health
```

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check Node.js is installed: `node --version`
- Try: `npm install` again

### npm install takes forever
- Try clearing cache: `npm cache clean --force`
- Check internet connection
- Try again

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check http://localhost:5000/api/health works
- Try opening http://localhost:5000 in browser

## Customization

### Add More Plants
Edit `backend/plantKnowledgeBase.js`:
```javascript
export const plantKnowledgeBase = {
  yourPlant: {
    name: 'Your Plant',
    wateringFrequency: '2-3 days',
    sunlight: '6-8 hours',
    // ... more properties
  }
};
```

### Add More Diseases
Edit `backend/plantKnowledgeBase.js`:
```javascript
export const diseaseDatabase = {
  your_disease: {
    name: 'Your Disease',
    symptoms: 'Describe symptoms',
    causes: 'What causes it',
    treatment: ['Solution 1', 'Solution 2']
  }
};
```

### Customize Styling
Edit `frontend/public/styles.css` - all CSS variables are configurable

## Performance

- Instant responses (no model loading)
- Lightweight (< 5MB)
- Works without internet (uses local database)
- Can be deployed anywhere

## Project Structure
```
PLANT ASSISTANT/
├── backend/
│   ├── server.js                 (Main Express server)
│   ├── plantKnowledgeBase.js     (Plant & disease data)
│   ├── package.json
│   └── .env.example
├── frontend/
│   └── public/
│       ├── index.html            (Main UI)
│       ├── styles.css            (Styling)
│       └── script.js             (Client logic)
└── README.md
```

## Future Enhancements

- [ ] Plant identification from photos (using PlantSnap API)
- [ ] Weather-based watering reminders
- [ ] User accounts and plant tracking
- [ ] Mobile app version
- [ ] Real-time plant monitoring with IoT
- [ ] Community forum for plant tips
- [ ] Multiple language support

## License

MIT - Feel free to use and modify!

## Support

For issues or questions:
1. Check troubleshooting section above
2. Verify backend is running
3. Check browser console for errors (F12)
4. Review backend logs for API issues

Enjoy growing your plants! 🌿
