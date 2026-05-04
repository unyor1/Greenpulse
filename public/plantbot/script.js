// Configuration
const API_BASE_URL = window.API_BASE_URL || "https://backend-bot-production-1865.up.railway.app";

// DOM Elements
const widgetWindow = document.getElementById("widgetWindow");
const widgetClose = document.getElementById("widgetClose");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const plantsList = document.getElementById("plantsList");
const plantsSearchInput = document.getElementById("plantsSearchInput");
const plantsSearchBtn = document.getElementById("plantsSearchBtn");
const plantsClearBtn = document.getElementById("plantsClearBtn");
const plantsStatus = document.getElementById("plantsStatus");
const diseasesList = document.getElementById("diseasesList");
const diseaseSearchInput = document.getElementById("diseaseSearchInput");
const tabButtons = document.querySelectorAll(".widget-tab-btn");
const tabs = document.querySelectorAll(".widget-tab");

let cachedDiseases = null;

// Widget Close
widgetClose.addEventListener("click", () => {
    widgetWindow.classList.remove("open");
});

// Tab Navigation
tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Remove active from all
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabs.forEach((tab) => tab.classList.remove("active"));

        // Add active to clicked
        btn.classList.add("active");
        const tabName = btn.dataset.tab;
        document.getElementById(`${tabName}-tab`).classList.add("active");

        // Load data for specific tabs
        if (tabName === "plants") {
            loadPlants({ force: false });
        }
        if (tabName === "diseases") {
            loadDiseases();
            diseaseSearchInput?.focus();
        }
    });
});

function activateTab(tabName) {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabs.forEach((tab) => tab.classList.remove("active"));

    const button = Array.from(tabButtons).find((btn) => btn.dataset.tab === tabName);
    if (button) button.classList.add("active");

    const tab = document.getElementById(`${tabName}-tab`);
    if (tab) tab.classList.add("active");
}

// Chat Functions
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, "user");
    chatInput.value = "";

    // Show loading indicator
    const loadingMsg = addMessage("", "ai");
    loadingMsg.querySelector(".message-content").innerHTML = '<div class="loading"></div>';

    try {
        // Ensure a persistent client id is sent so backend can track session context
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
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Client-Id": clientId },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error("Failed to send message");

        const data = await response.json();
        loadingMsg.remove();
        addMessage(data.message, "ai");
    } catch (error) {
        console.error("Chat error:", error);
        loadingMsg.remove();
        addMessage("Sorry, I couldn't process your message. Check if the backend is running.", "ai");
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const content = document.createElement("div");
    content.className = "message-content";
    content.innerHTML = formatMessage(text);

    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatMessage(text) {
    const safe = escapeHtml(text || "");
    return safe
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}

// Plant Library Functions
plantsSearchBtn.addEventListener("click", () => searchPlants());
plantsClearBtn.addEventListener("click", clearPlantSearch);
plantsSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchPlants();
    }
});

if (diseaseSearchInput) {
    diseaseSearchInput.addEventListener("input", () => {
        const query = diseaseSearchInput.value.trim();
        if (!query) {
            if (cachedDiseases) {
                void renderDiseases(cachedDiseases);
            } else {
                loadDiseases();
            }
            return;
        }
        searchDiseases(query);
    });
}

function renderPlantCards(plants) {
    plantsList.innerHTML = "";
    plants.forEach((plant) => {
        const card = document.createElement("div");
        card.className = "plant-card";
        if (plant.id) {
            card.dataset.id = plant.id;
        }
        card.innerHTML = `
            <div class="plant-card-title">${plant.name}</div>
            <div class="plant-info">
                <div>Water: ${plant.watering}</div>
                <div>Light: ${plant.sunlight}</div>
            </div>
            <div class="plant-details"></div>
        `;
        plantsList.appendChild(card);
    });
}

async function loadPlants(options = {}) {
    const force = options.force === true;
    if (!force && plantsList.dataset.loaded === "true") return;

    try {
        plantsStatus.textContent = "Loading plants...";
        const response = await fetch(`${API_BASE_URL}/api/plants`);
        if (!response.ok) throw new Error("Failed to load plants");

        const plants = await response.json();
        renderPlantCards(plants);
        plantsList.dataset.loaded = "true";
        plantsStatus.textContent = `${plants.length} plants available`;
    } catch (error) {
        console.error("Error loading plants:", error);
        plantsList.innerHTML = "<p>Error loading plants.</p>";
        plantsStatus.textContent = "";
    }
}

async function searchPlants() {
    const query = plantsSearchInput.value.trim();
    if (!query) {
        loadPlants({ force: true });
        return;
    }

    try {
        plantsStatus.textContent = `Searching for "${query}"...`;
        const response = await fetch(`${API_BASE_URL}/api/search-plants?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();
        const results = data.plants || [];

        if (results.length === 0) {
            plantsList.innerHTML = "<p>No matching plants found.</p>";
            plantsStatus.textContent = "0 results";
            return;
        }

        const detailedResults = await Promise.all(
            results.map(async (plant) => {
                try {
                    const detailResponse = await fetch(
                        `${API_BASE_URL}/api/plants/${encodeURIComponent(plant.id)}`
                    );
                    if (!detailResponse.ok) {
                        return {
                            id: plant.id,
                            name: plant.name,
                            watering: "N/A",
                            sunlight: "N/A"
                        };
                    }

                    const info = await detailResponse.json();
                    return {
                        id: plant.id,
                        name: info.name || plant.name,
                        watering: info.wateringFrequency || info.watering || "N/A",
                        sunlight: info.sunlight || "N/A"
                    };
                } catch (detailError) {
                    console.error("Error loading plant details:", detailError);
                    return {
                        id: plant.id,
                        name: plant.name,
                        watering: "N/A",
                        sunlight: "N/A"
                    };
                }
            })
        );

        renderPlantCards(detailedResults);
        plantsStatus.textContent = `${results.length} result${results.length > 1 ? "s" : ""}`;
    } catch (error) {
        console.error("Error searching plants:", error);
        plantsList.innerHTML = "<p>Error searching plants.</p>";
        plantsStatus.textContent = "";
    }
}

function clearPlantSearch() {
    plantsSearchInput.value = "";
    plantsList.dataset.loaded = "false";
    loadPlants({ force: true });
}

plantsList.addEventListener("click", (event) => {
    const card = event.target.closest(".plant-card");
    if (!card || !plantsList.contains(card)) return;
    togglePlantDetails(card);
});

async function togglePlantDetails(card) {
    const details = card.querySelector(".plant-details");
    if (!details) return;

    const isExpanded = card.classList.contains("expanded");
    if (isExpanded) {
        card.classList.remove("expanded");
        return;
    }

    plantsList.querySelectorAll(".plant-card.expanded").forEach((expanded) => {
        if (expanded !== card) expanded.classList.remove("expanded");
    });

    const plantId = card.dataset.id;
    if (!plantId) {
        details.textContent = "Plant details unavailable.";
        card.classList.add("expanded");
        return;
    }

    if (card.dataset.loaded === "true") {
        card.classList.add("expanded");
        return;
    }

    details.innerHTML = '<div class="loading"></div>';
    card.classList.add("expanded");

    try {
        const response = await fetch(`${API_BASE_URL}/api/plants/${encodeURIComponent(plantId)}`);
        if (!response.ok) throw new Error("Failed to load plant details");

        const info = await response.json();
        details.innerHTML = renderPlantDetails(info);
        card.dataset.loaded = "true";
    } catch (error) {
        console.error("Error loading plant details:", error);
        details.textContent = "Error loading plant details.";
    }
}

function renderPlantDetails(plant) {
    const watering = plant.wateringFrequency || plant.watering || "N/A";
    const sunlight = plant.sunlight || "N/A";
    const temperature = plant.temperature || "N/A";
    const ph = plant.ph || "N/A";
    const commonDiseases = formatList(plant.commonDiseases);
    const symptoms = formatSymptoms(plant.symptoms);
    const tips = formatList(plant.tips);

    return `
        <div class="plant-details-row"><strong>Watering:</strong> ${watering}</div>
        <div class="plant-details-row"><strong>Sunlight:</strong> ${sunlight}</div>
        <div class="plant-details-row"><strong>Temperature:</strong> ${temperature}</div>
        <div class="plant-details-row"><strong>pH:</strong> ${ph}</div>
        <div class="plant-details-row"><strong>Common diseases:</strong> ${commonDiseases}</div>
        <div class="plant-details-row"><strong>Symptoms:</strong> ${symptoms}</div>
        <div class="plant-details-row"><strong>Tips:</strong> ${tips}</div>
    `;
}

function formatList(value) {
    if (!value) return "N/A";
    if (Array.isArray(value)) {
        return value.length > 0 ? value.join(", ") : "N/A";
    }
    if (typeof value === "string") return value;
    return "N/A";
}

function formatSymptoms(symptoms) {
    if (!symptoms) return "N/A";
    if (typeof symptoms === "string") return symptoms;
    if (typeof symptoms === "object") {
        const entries = Object.entries(symptoms).map(
            ([key, val]) => `${humanizeKey(key)}: ${val}`
        );
        return entries.length > 0 ? entries.join("; ") : "N/A";
    }
    return "N/A";
}

function humanizeKey(value) {
    return value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function loadDiseases() {
    if (cachedDiseases) {
        await renderDiseases(cachedDiseases);
        return;
    }

    if (diseasesList) {
        diseasesList.innerHTML = '<div class="loading"></div>';
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/diseases`);
        if (!response.ok) throw new Error("Failed to load diseases");

        const diseases = await response.json();
        cachedDiseases = diseases;
        renderDiseases(diseases);
    } catch (error) {
        console.error("Error loading diseases:", error);
        if (diseasesList) {
            diseasesList.innerHTML = "<p>Error loading diseases.</p>";
        }
    }
}

async function searchDiseases(query) {
    if (!diseasesList) return;
    diseasesList.innerHTML = '<div class="loading"></div>';

    try {
        const response = await fetch(
            `${API_BASE_URL}/api/search-diseases?query=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error("Failed to search diseases");

        const data = await response.json();
        await renderDiseases(data.diseases || []);
    } catch (error) {
        console.error("Error searching diseases:", error);
        diseasesList.innerHTML = "<p>Error searching diseases.</p>";
    }
}

function formatTreatment(treatment) {
    if (!treatment) return "N/A";
    if (Array.isArray(treatment) && treatment.length > 0) {
        return treatment.map((item) => `• ${item}`).join("<br>");
    }
    return String(treatment);
}

async function fetchDiseaseDetails(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/diseases/${encodeURIComponent(id)}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch disease details:", error);
        return null;
    }
}

async function renderDiseases(diseases) {
    if (!diseasesList) return;

    if (!diseases || diseases.length === 0) {
        diseasesList.innerHTML = "<p>No diseases found.</p>";
        return;
    }

    diseasesList.innerHTML = "";
    for (const disease of diseases) {
        if (!disease.treatment || disease.treatment.length === 0) {
            const details = await fetchDiseaseDetails(disease.id);
            if (details && details.treatment) {
                disease.treatment = details.treatment;
            }
        }

        const card = document.createElement("div");
        card.className = "disease-card";
        card.dataset.diseaseId = disease.id;
        card.innerHTML = `
            <div class="disease-card-title">${disease.name}</div>
            <div class="disease-meta"><strong>Symptoms:</strong> ${disease.symptoms}</div>
            <div class="disease-meta"><strong>Causes:</strong> ${disease.causes}</div>
            <div class="disease-card-hint">Click to expand treatment</div>
            <div class="disease-details">
                <div class="disease-meta"><strong>Treatment:</strong><br>${formatTreatment(disease.treatment)}</div>
            </div>
        `;

        card.addEventListener("click", () => {
            const isExpanded = card.classList.toggle("expanded");
            if (isExpanded) {
                Array.from(diseasesList.children).forEach((child) => {
                    if (child !== card) child.classList.remove("expanded");
                });
            }
        });

        diseasesList.appendChild(card);
    }
}

// Status Check on Load
window.addEventListener("load", async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (response.ok) {
            console.log("Backend connected");
        }
    } catch (error) {
        console.warn("Backend not reachable");
    }
});

// Initial greeting
setTimeout(() => {
    if (chatMessages.children.length === 0) {
        addMessage("Hi! I'm your plant care assistant. Ask me anything about plant care, watering, pests, or plant diseases!", "ai");
    }
}, 500);
