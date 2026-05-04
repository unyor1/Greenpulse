// Configuration
const API_BASE_URL = window.API_BASE_URL || 'https://backend-bot-production-1865.up.railway.app';

// DOM Elements
const widgetToggle = document.getElementById('widgetToggle');
const widgetWindow = document.getElementById('widgetWindow');
const widgetClose = document.getElementById('widgetClose');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const symptomsInput = document.getElementById('symptomsInput');
const diagnoseBtn = document.getElementById('diagnoseBtn');
const diagnosisResult = document.getElementById('diagnosisResult');
const plantsList = document.getElementById('plantsList');
const diseasesList = document.getElementById('diseasesList');
const diseaseSearchInput = document.getElementById('diseaseSearchInput');
const tabButtons = document.querySelectorAll('.widget-tab-btn');
const tabs = document.querySelectorAll('.widget-tab');

let cachedDiseases = null;

// Widget Toggle
widgetToggle.addEventListener('click', () => {
    widgetWindow.classList.add('open');
});

widgetClose.addEventListener('click', () => {
    widgetWindow.classList.remove('open');
});

// Tab Navigation
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        tabButtons.forEach(b => b.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add active to clicked
        btn.classList.add('active');
        const tabName = btn.dataset.tab;
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Load data for specific tabs
        if (tabName === 'plants') {
            loadPlants();
        }
        if (tabName === 'diseases') {
            loadDiseases();
            diseaseSearchInput?.focus();
        }
    });
});

// Chat Functions
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';

    // Show loading indicator
    const loadingMsg = addMessage('', 'ai');
    loadingMsg.querySelector('.message-content').innerHTML = '<div class="loading"></div>';

    try {
        const CLIENT_ID_KEY = 'plantbot_client_id';
        function getClientId() {
            let id = localStorage.getItem(CLIENT_ID_KEY);
            if (!id) {
                try {
                    id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
                } catch (e) {
                    id = 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
                }
                localStorage.setItem(CLIENT_ID_KEY, id);
            }
            return id;
        }

        const clientId = getClientId();

        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Client-Id': clientId },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error('Failed to send message');

        const data = await response.json();
        loadingMsg.remove();
        addMessage(data.message, 'ai');
    } catch (error) {
        console.error('Chat error:', error);
        loadingMsg.remove();
        addMessage('Sorry, I couldn\'t process your message. Check if the backend is running.', 'ai');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = formatMessage(text);

    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatMessage(text) {
    const safe = escapeHtml(text || '');
    return safe
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

// Disease Library Functions
if (diseaseSearchInput) {
    diseaseSearchInput.addEventListener('input', () => {
        const query = diseaseSearchInput.value.trim();
        if (!query) {
            if (cachedDiseases) {
                renderDiseases(cachedDiseases);
            } else {
                loadDiseases();
            }
            return;
        }
        searchDiseases(query);
    });
}

// Diagnosis Functions
diagnoseBtn.addEventListener('click', diagnosePlant);

async function diagnosePlant() {
    const symptoms = symptomsInput.value.trim();
    if (!symptoms) {
        alert('Please describe the symptoms');
        return;
    }

    diagnosisResult.innerHTML = '<div class="loading"></div> Analyzing...';
    diagnosisResult.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE_URL}/api/diagnose`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms })
        });

        if (!response.ok) throw new Error('Failed to diagnose');

        const data = await response.json();
        diagnosisResult.innerHTML = data.diagnosis;
    } catch (error) {
        console.error('Diagnosis error:', error);
        diagnosisResult.innerHTML = 'Error analyzing symptoms. Try again!';
    }
}

// Plant Library Functions
async function loadPlants() {
    if (plantsList.innerHTML) return; // Already loaded

    try {
        const response = await fetch(`${API_BASE_URL}/api/plants`);
        if (!response.ok) throw new Error('Failed to load plants');

        const plants = await response.json();
        plantsList.innerHTML = '';

        plants.forEach(plant => {
            const card = document.createElement('div');
            card.className = 'plant-card';
            card.innerHTML = `
                <div class="plant-card-title">${plant.name}</div>
                <div class="plant-info">
                    <div>💧 ${plant.watering}</div>
                    <div>☀️ ${plant.sunlight}</div>
                </div>
            `;
            plantsList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading plants:', error);
        plantsList.innerHTML = '<p>Error loading plants.</p>';
    }
}

async function loadDiseases() {
    if (cachedDiseases) {
        renderDiseases(cachedDiseases);
        return;
    }

    if (diseasesList) {
        diseasesList.innerHTML = '<div class="loading"></div>';
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/diseases`);
        if (!response.ok) throw new Error('Failed to load diseases');

        const diseases = await response.json();
        cachedDiseases = diseases;
        renderDiseases(diseases);
    } catch (error) {
        console.error('Error loading diseases:', error);
        if (diseasesList) {
            diseasesList.innerHTML = '<p>Error loading diseases.</p>';
        }
    }
}

async function searchDiseases(query) {
    if (!diseasesList) return;
    diseasesList.innerHTML = '<div class="loading"></div>';

    try {
        const response = await fetch(`${API_BASE_URL}/api/search-diseases?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to search diseases');

        const data = await response.json();
        renderDiseases(data.diseases || []);
    } catch (error) {
        console.error('Error searching diseases:', error);
        diseasesList.innerHTML = '<p>Error searching diseases.</p>';
    }
}

function renderDiseases(diseases) {
    if (!diseasesList) return;

    if (!diseases || diseases.length === 0) {
        diseasesList.innerHTML = '<p>No diseases found.</p>';
        return;
    }

    diseasesList.innerHTML = '';
    diseases.forEach(disease => {
        const card = document.createElement('div');
        card.className = 'disease-card';
        card.innerHTML = `
            <div class="disease-card-title">${disease.name}</div>
            <div class="disease-meta"><strong>Symptoms:</strong> ${disease.symptoms}</div>
            <div class="disease-meta"><strong>Causes:</strong> ${disease.causes}</div>
        `;
        diseasesList.appendChild(card);
    });
}

// Status Check on Load
window.addEventListener('load', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (response.ok) {
            console.log('✅ Backend connected');
        }
    } catch (error) {
        console.warn('⚠️ Backend not reachable');
    }
});

// Initial greeting
setTimeout(() => {
    if (chatMessages.children.length === 0) {
        addMessage('👋 Hi! I\'m your plant care assistant. Ask me anything about plant care!', 'ai');
    }
}, 500);
