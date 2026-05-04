import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { plantKnowledgeBase, diseaseDatabase } from './plantKnowledgeBase.js';

dotenv.config();

const lastPlantByClient = new Map();
const lastDiseaseByClient = new Map();

const app = express();
const PORT = process.env.PORT || 5000;
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT) || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const normalizeText = (text) => text
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const getPlantAliases = (id, plant) => {
  const aliases = new Set();
  const nameNormalized = normalizeText(plant.name);
  const idNormalized = normalizeText(id.replace(/_/g, ' '));

  if (nameNormalized) aliases.add(nameNormalized);
  if (idNormalized) aliases.add(idNormalized);

  if (Array.isArray(plant.aliases)) {
    plant.aliases
      .map((alias) => normalizeText(alias))
      .filter(Boolean)
      .forEach((alias) => aliases.add(alias));
  }

  const parenMatches = plant.name.matchAll(/\(([^)]+)\)/g);
  for (const match of parenMatches) {
    match[1].split(/[,/|]/).forEach((part) => {
      const alias = normalizeText(part);
      if (alias) aliases.add(alias);
    });
  }

  return Array.from(aliases);
};

const getPlantMatchScore = (aliases, normalizedQuery, tokens) => {
  if (!normalizedQuery) return 0;
  let score = 0;

  aliases.forEach((alias) => {
    if (alias === normalizedQuery) score = Math.max(score, 4);
    if (alias.includes(normalizedQuery)) score = Math.max(score, 3);
    if (normalizedQuery.includes(alias)) score = Math.max(score, 2);
  });

  if (tokens.length > 0 && tokens.every((token) => aliases.some((alias) => alias.includes(token)))) {
    score += 2;
  } else if (tokens.length > 0 && tokens.some((token) => aliases.some((alias) => alias.includes(token)))) {
    score += 1;
  }

  return score;
};

const getPlantSuggestions = (userQuery, limit = 5) => {
  const normalizedQuery = normalizeText(userQuery);
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(' ').filter(Boolean);

  return Object.entries(plantKnowledgeBase)
    .map(([id, plant]) => {
      const aliases = getPlantAliases(id, plant);
      const score = getPlantMatchScore(aliases, normalizedQuery, tokens);

      return {
        id,
        name: plant.name,
        score
      };
    })
    .filter((plant) => plant.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map(({ score, ...plant }) => plant);
};

const diseaseAliasMap = {
  powdery_mildew: ['powdery mildew', 'pulbos na mildew', 'harian na amag'],
  root_rot: ['root rot', 'ugat rot', 'pagkabulok ng ugat', 'ugat bulok'],
  leaf_spot: ['leaf spot', 'batik sa dahon', 'mga batik sa dahon'],
  spider_mites: ['spider mites', 'kuliglig sa dahon'],
  mealybugs: ['mealybugs', 'puting kulisap', 'puting mga kula'],
  rice_blast: ['rice blast', 'palay blast'],
  bacterial_blight_rice: ['rice bacterial blight', 'bacterial blight ng palay', 'sakit ng palay bacterial blight'],
  sheath_blight: ['sheath blight', 'sheath blight ng palay', 'sakit ng palay sheath blight'],
  tungro: ['tungro', 'tungro ng palay'],
  downy_mildew: ['downy mildew', 'downy mildew sa palay', 'palay downy mildew'],
  fusarium_wilt: ['fusarium wilt', 'fusarium wilt sa saging', 'sakit ng saging fusarium'],
  anthracnose: ['anthracnose', 'sakit ng anthology', 'sakit ng prutas'],
  black_sigatoka: ['black sigatoka', 'sigatoka', 'sakit ng saging sigatoka'],
  panama_disease: ['panama disease', 'sakit ng saging panama', 'panama disease sa saging'],
  citrus_greening: ['citrus greening', 'hlb', 'sakit ng citrus greening'],
  citrus_canker: ['citrus canker', 'bukol sa citrus'],
  bacterial_wilt: ['bacterial wilt', 'pagkabulok ng halaman', 'bacterial wilt sa halaman'],
  late_blight: ['late blight', 'kamatis late blight', 'patatas late blight'],
  early_blight: ['early blight', 'kamatis early blight', 'patatas early blight'],
  mosaic_virus: ['mosaic virus', 'virus ng mosaic', 'mosaic virus sa papaya'],
  leaf_rust: ['leaf rust', 'kalawang sa dahon'],
  papaya_ringspot: ['papaya ringspot', 'sakit ng papaya ringspot'],
  clubroot: ['clubroot', 'sakit sa ugat clubroot'],
  leaf_smut: ['leaf smut', 'smut sa dahon'],
  root_knot_nematode: ['root knot nematode', 'sakit ng ugat nematode'],
  rice_brown_spot: ['rice brown spot', 'brown spot palay'],
  rice_bacterial_leaf_streak: ['rice bacterial leaf streak', 'palay leaf streak'],
  rice_sheath_rot: ['rice sheath rot', 'sheath rot palay'],
  rice_false_smut: ['rice false smut', 'false smut palay'],
  rice_grassy_stunt: ['rice grassy stunt', 'grassy stunt palay'],
  rice_ragged_stunt: ['rice ragged stunt', 'ragged stunt palay'],
  banana_bunchy_top: ['banana bunchy top', 'saging bunchy top'],
  banana_yellow_sigatoka: ['banana yellow sigatoka', 'yellow sigatoka'],
  corn_downy_mildew: ['corn downy mildew', 'mais downy mildew'],
  corn_stalk_rot: ['corn stalk rot', 'mais stalk rot'],
  corn_leaf_blight: ['corn leaf blight', 'mais leaf blight'],
  cassava_mosaic: ['cassava mosaic', 'kamoteng kahoy mosaic'],
  cassava_bacterial_blight: ['cassava bacterial blight', 'kamoteng kahoy bacterial blight'],
  sweet_potato_scurf: ['sweet potato scurf', 'kamote scurf'],
  taro_leaf_blight: ['taro leaf blight', 'gabi leaf blight'],
  onion_purple_blotch: ['onion purple blotch', 'sibuyas purple blotch'],
  onion_downy_mildew: ['onion downy mildew', 'sibuyas downy mildew'],
  garlic_rust: ['garlic rust', 'bawang rust'],
  eggplant_bacterial_wilt: ['eggplant bacterial wilt', 'talong bacterial wilt'],
  tomato_leaf_curl: ['tomato leaf curl', 'kamatis leaf curl']
};

const getDiseaseAliases = (id, disease) => {
  const aliases = new Set();
  const nameNormalized = normalizeText(disease.name);
  const idNormalized = normalizeText(id.replace(/_/g, ' '));

  if (nameNormalized) aliases.add(nameNormalized);
  if (idNormalized) aliases.add(idNormalized);

  if (Array.isArray(disease.aliases)) {
    disease.aliases
      .map((alias) => normalizeText(alias))
      .filter(Boolean)
      .forEach((alias) => aliases.add(alias));
  }

  if (diseaseAliasMap[id]) {
    diseaseAliasMap[id]
      .map((alias) => normalizeText(alias))
      .filter(Boolean)
      .forEach((alias) => aliases.add(alias));
  }

  const parenMatches = disease.name.matchAll(/\(([^)]+)\)/g);
  for (const match of parenMatches) {
    match[1].split(/[,/|]/).forEach((part) => {
      const alias = normalizeText(part);
      if (alias) aliases.add(alias);
    });
  }

  return Array.from(aliases);
};

const getDiseaseMatchScore = (aliases, normalizedQuery, tokens) => {
  if (!normalizedQuery) return 0;
  let score = 0;

  aliases.forEach((alias) => {
    if (alias === normalizedQuery) score = Math.max(score, 4);
    if (alias.includes(normalizedQuery)) score = Math.max(score, 3);
    if (normalizedQuery.includes(alias)) score = Math.max(score, 2);
  });

  if (tokens.length > 0 && tokens.every((token) => aliases.some((alias) => alias.includes(token)))) {
    score += 2;
  } else if (tokens.length > 0 && tokens.some((token) => aliases.some((alias) => alias.includes(token)))) {
    score += 1;
  }

  return score;
};

const getDiseaseSuggestions = (userQuery, limit = 20) => {
  const normalizedQuery = normalizeText(userQuery);
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(' ').filter(Boolean);

  return Object.entries(diseaseDatabase)
    .map(([id, disease]) => {
      const aliases = getDiseaseAliases(id, disease);
      const score = getDiseaseMatchScore(aliases, normalizedQuery, tokens);
      const symptoms = normalizeText(disease.symptoms);
      const causes = normalizeText(disease.causes);

      let extraScore = 0;
      if (symptoms.includes(normalizedQuery)) extraScore += 1;
      if (causes.includes(normalizedQuery)) extraScore += 1;

      return {
        id,
        name: disease.name,
        symptoms: disease.symptoms,
        causes: disease.causes,
        treatment: disease.treatment,
        score: score + extraScore
      };
    })
    .filter((disease) => disease.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map(({ score, ...disease }) => disease);
};

const shouldSuggestPlants = (userQuery) => {
  const query = normalizeText(userQuery);
  if (!query) return false;
  return /(plant|care|water|watering|sun|light|soil|fertiliz|temperature|disease|problem|pest|leaf|flower|fruit|seed|grow)/.test(query);
};

// Analyze plant query using knowledge base
const analyzeQuery = (userQuery) => {
  const query = userQuery.toLowerCase();
  const normalizedQuery = normalizeText(userQuery);

  const queryTokens = normalizedQuery.split(' ').filter(Boolean);
  const containsAliasPhrase = (alias) => {
    const aliasTokens = alias.split(' ').filter(Boolean);
    if (aliasTokens.length === 0 || queryTokens.length === 0) return false;
    if (aliasTokens.length > queryTokens.length) return false;

    for (let i = 0; i <= queryTokens.length - aliasTokens.length; i += 1) {
      let match = true;
      for (let j = 0; j < aliasTokens.length; j += 1) {
        if (queryTokens[i + j] !== aliasTokens[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }

    return false;
  };
  
  // Check for specific plant names first
  const plantMatch = Object.entries(plantKnowledgeBase).find(([id, plant]) => {
    const aliases = getPlantAliases(id, plant);
    return aliases.some((alias) => normalizedQuery === alias || containsAliasPhrase(alias));
  });
  if (plantMatch) {
    return { type: 'plant', plant: plantMatch[1] };
  }
  
  // Check for specific topics
  if (query.includes('water') || query.includes('watering') || query.includes('dry') || query.includes('thirsty')) {
    return { type: 'watering' };
  }
  if (query.includes('light') || query.includes('sun') || query.includes('bright') || query.includes('dark')) {
    return { type: 'light' };
  }
  if (query.includes('disease') || query.includes('problem') || query.includes('issue') || query.includes('sick') || query.includes('yellow') || query.includes('brown') || query.includes('spot') || query.includes('mold') || query.includes('rot') || query.includes('blight') || query.includes('rust') || query.includes('mildew')) {
    return { type: 'disease' };
  }
  if (query.includes('temperature') || query.includes('humid') || query.includes('humidity') || query.includes('hot') || query.includes('cold')) {
    return { type: 'environment' };
  }
  if (query.includes('fertiliz') || query.includes('soil') || query.includes('feed') || query.includes('nutrient')) {
    return { type: 'fertilizer' };
  }
  if (query.includes('pest') || query.includes('bug') || query.includes('insect') || query.includes('spider') || query.includes('mealy')) {
    return { type: 'pest' };
  }
  if (query.includes('pot') || query.includes('repot') || query.includes('transplant')) {
    return { type: 'potting' };
  }
  
  // General queries
  if (query.includes('how') || query.includes('what') || query.includes('when') || query.includes('why')) {
    return { type: 'question' };
  }
  
  return { type: 'general' };
};

// Generate helpful response based on query type
const formatDiseaseInfo = (disease) => {
  if (!disease) return 'No record.';
  return `**${disease.name}**\n` +
    `Symptoms: ${disease.symptoms}\n` +
    `Causes: ${disease.causes}\n` +
    `Treatment:\n` +
    disease.treatment.map((t) => `• ${t}`).join('\n');
};

const getDiseaseFromQuery = (userQuery) => {
  const normalized = normalizeText(userQuery);
  if (!normalized) return null;

  // 1) Try exact normalized name or id match
  for (const [id, disease] of Object.entries(diseaseDatabase)) {
    if (normalizeText(disease.name) === normalized) return disease;
    if (normalizeText(id.replace(/_/g, ' ')) === normalized) return disease;
  }

  // 2) Try aliases (normalized)
  for (const [id, disease] of Object.entries(diseaseDatabase)) {
    const aliases = getDiseaseAliases(id, disease);
    if (aliases.includes(normalized)) return disease;
  }

  // 3) Fall back to fuzzy/suggestion-based matching
  const results = getDiseaseSuggestions(userQuery, 5);
  if (results.length === 0) return null;
  const diseaseId = results[0].id;
  return diseaseDatabase[diseaseId] || null;
};

// Strict disease lookup: only exact name/id or aliases (no fuzzy suggestions)
const getDiseaseFromQueryStrict = (userQuery) => {
  const normalized = normalizeText(userQuery);
  if (!normalized) return null;

  // exact name or id
  for (const [id, disease] of Object.entries(diseaseDatabase)) {
    if (normalizeText(disease.name) === normalized) return disease;
    if (normalizeText(id.replace(/_/g, ' ')) === normalized) return disease;
  }

  // aliases only
  for (const [id, disease] of Object.entries(diseaseDatabase)) {
    const aliases = getDiseaseAliases(id, disease);
    if (aliases.includes(normalized)) return disease;
  }

  return null;
};

const generatePlantResponse = (userQuery, queryAnalysis, lastPlant, lastDisease) => {
  const query = userQuery.toLowerCase();
  const normalizedQuery = normalizeText(userQuery);

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
    return 'Hi! Tell me the plant name and what you need (watering, sunlight, temperature, diseases, symptoms, or tips).';
  }

  const request = {
    wantsPlantCare: /(plant\s*care|care guide|care for|how to care)/.test(query),
    wantsWatering: /(watering schedule|watering frequency|how often|water(ing)?)/.test(query),
    wantsWateringGuide: /(watering guide|how to water|watering tips)/.test(query),
    wantsTemperature: /(temperature|temp|heat|cold)/.test(query),
    wantsSunlight: /(sunlight|light|sun exposure|bright|shade)/.test(query),
    wantsDiseases: /(common diseases|disease|problem|issue)/.test(query),
    wantsPests: /(common pests|pests|insects|bugs)/.test(query),
    wantsSymptoms: /(symptom|yellowing|spots|wilting|mold|rot)/.test(query),
    wantsTreat: /(how to treat|treat it|how to cure|treatment|treat)/.test(query),
    wantsTips: /(tips|advice|best practices)/.test(query),
    wantsEnvironment: /(best environment|environment|humidity|soil|ph)/.test(query)
  };

  const pestLibrary = [
    {
      key: 'spider mites',
      aliases: ['spider mites', 'spider mite'],
      summary: 'Tiny moving dots, fine webbing',
      treatment: 'Increase humidity, neem oil spray'
    },
    {
      key: 'mealybugs',
      aliases: ['mealybugs', 'mealy bug', 'mealy bugs'],
      summary: 'White cottony clusters',
      treatment: 'Remove with alcohol-soaked cotton'
    },
    {
      key: 'scale insects',
      aliases: ['scale insects', 'scale insect', 'scale'],
      summary: 'Brown raised bumps on stems',
      treatment: 'Scrape off, insecticidal soap'
    },
    {
      key: 'fungus gnats',
      aliases: ['fungus gnats', 'fungus gnat', 'gnats'],
      summary: 'Small flying insects',
      treatment: 'Let soil dry, use sticky traps'
    },
    {
      key: 'aphids',
      aliases: ['aphids', 'aphid'],
      summary: 'Soft green/black clusters on new growth',
      treatment: 'Rinse off, insecticidal soap'
    },
    {
      key: 'thrips',
      aliases: ['thrips', 'thrip'],
      summary: 'Silvery streaks, tiny black specks',
      treatment: 'Blue sticky traps, neem oil'
    },
    {
      key: 'whiteflies',
      aliases: ['whiteflies', 'whitefly', 'white flies', 'white fly'],
      summary: 'White moth-like insects, leaf yellowing',
      treatment: 'Yellow sticky traps, neem oil'
    }
  ];

  const getRequestedPests = () => {
    return pestLibrary.filter((pest) =>
      pest.aliases.some((alias) => normalizedQuery.includes(alias))
    );
  };

  const formatPestBlocks = (pests) => {
    if (!pests || pests.length === 0) return 'No record.';
    return pests
      .map((pest) => {
        return `**${pest.key}**\n• ${pest.summary}\n• Treatment: ${pest.treatment}`;
      })
      .join('\n\n');
  };

  const wantsSpecificPlantField =
    request.wantsWatering ||
    request.wantsWateringGuide ||
    request.wantsTemperature ||
    request.wantsSunlight ||
    request.wantsDiseases ||
    request.wantsPests ||
    request.wantsSymptoms ||
    request.wantsTips ||
    request.wantsEnvironment;

  const getResponseForPlant = (plant, lastDisease) => {
    if (request.wantsPlantCare) {
      return buildPlantInfo(plant, 'general');
    }

    if (request.wantsWatering) {
      return `**${plant.name}** watering frequency: ${plant.wateringFrequency || 'N/A'}`;
    }
    if (request.wantsWateringGuide) {
      return `**${plant.name}** watering guide: ${plant.wateringFrequency || 'N/A'}`;
    }
    if (request.wantsTemperature) {
      return `**${plant.name}** temperature: ${plant.temperature || 'N/A'}`;
    }
    if (request.wantsSunlight) {
      return `**${plant.name}** sunlight: ${plant.sunlight || 'N/A'}`;
    }
    if (request.wantsDiseases || request.wantsTreat) {
      // Prefer prior context or explicit strict match passed in; only fall back to fuzzy suggestions
      const diseaseMatch = lastDisease || getDiseaseFromQuery(userQuery);
      if (diseaseMatch) {
        return formatDiseaseInfo(diseaseMatch);
      }

      // If the plant has listed common diseases, surface their treatment
      // information from the disease database. Do NOT return a generic
      // "complete problems" listing — only treatments from the DB.
      const diseases = plant.commonDiseases || [];
      if (diseases.length > 0) {
        const lines = diseases.map((diseaseName) => {
          // Resolve disease via suggestions or by normalized key/name
          let matched = getDiseaseFromQuery(diseaseName);
          if (!matched) {
            const normalized = normalizeText(diseaseName);
            for (const key of Object.keys(diseaseDatabase)) {
              const entry = diseaseDatabase[key];
              if (normalizeText(entry.name) === normalized || normalizeText(key) === normalized) {
                matched = entry; break;
              }
            }
          }

          if (matched) {
            const treatment = Array.isArray(matched.treatment) ? matched.treatment.join('; ') : matched.treatment;
            return `• ${matched.name}\n  Treatment: ${treatment}`;
          }
          return `• ${diseaseName}`;
        }).join('\n\n');

        return `**${plant.name}** common diseases - treatments:\n\n${lines}`;
      }

      return 'I could not determine a disease. Please name the disease or describe symptoms so I can provide treatment guidance.';
    }
    if (request.wantsPests) {
      const pests = (plant.commonPests || []).join(', ') || 'N/A';
      return `**${plant.name}** common pests:\n• ${pests}`;
    }
    if (request.wantsSymptoms) {
      const symptoms = plant.symptoms
        ? Object.entries(plant.symptoms)
          .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
          .join('; ')
        : 'N/A';
      return `**${plant.name}** symptoms:\n• ${symptoms}`;
    }
    if (request.wantsTips) {
      const tips = Array.isArray(plant.tips) && plant.tips.length > 0
        ? plant.tips.join('; ')
        : 'N/A';
      return `**${plant.name}** tips: ${tips}`;
    }
    if (request.wantsEnvironment) {
      const environmentParts = [];
      if (plant.sunlight) environmentParts.push(`Sunlight: ${plant.sunlight}`);
      if (plant.temperature) environmentParts.push(`Temperature: ${plant.temperature}`);
      if (plant.ph) environmentParts.push(`pH: ${plant.ph}`);
      const environment = environmentParts.length > 0 ? environmentParts.join('; ') : 'N/A';
      return `**${plant.name}** best environment: ${environment}`;
    }

    return buildPlantInfo(plant, 'general');
  };

  // Handle specific plant queries
  if (queryAnalysis.type === 'plant') {
    const plant = queryAnalysis.plant;
    return getResponseForPlant(plant, lastDisease);
  }

  // Use last referenced plant for follow-up questions
  if ((wantsSpecificPlantField || request.wantsPlantCare) && lastPlant) {
    return getResponseForPlant(lastPlant, lastDisease);
  }

  // If user asked for pests/problems without a plant, return generic guidance
  if (request.wantsPests) {
    const specificPests = getRequestedPests();
    if (specificPests.length > 0) {
      return formatPestBlocks(specificPests);
    }
    return `Common plant pests:\n\n${formatPestBlocks(pestLibrary)}`;
  }
  if (request.wantsDiseases || request.wantsTreat) {
      const diseaseMatch = lastDisease || getDiseaseFromQuery(userQuery);
      if (diseaseMatch) {
        return formatDiseaseInfo(diseaseMatch);
      }
      return 'I could not identify a specific disease from that query. Please mention the disease name or describe the symptoms so I can provide:' +
        '\n• Symptoms\n' +
        '• Causes\n' +
        '• Treatment\n\n' +
        'For example: "How do I treat powdery mildew on tomato?" or "My plant has yellow spots."';
  }

  // Handle different query types
  switch (queryAnalysis.type) {
    case 'watering':
      if (query.includes('how often') || query.includes('frequency')) {
        return 'Watering frequency depends on the plant type, season, and environment:\n\n' +
          'Houseplants: Water when top 1-2 inches of soil are dry\n' +
          'Succulents/Cacti: Every 2-3 weeks, let soil dry completely\n' +
          'Vegetables: Keep soil consistently moist\n' +
          'Flowering plants: Water when soil surface feels dry\n\n' +
          'Tips: Always check soil moisture before watering. Better to underwater than overwater.';
      }
      return 'Watering guide:\n\n' +
        '• Check soil moisture by inserting finger 1-2 inches deep\n' +
        '• Water thoroughly until it drains from bottom\n' +
        '• Empty saucer after 30 minutes to prevent root rot\n' +
        '• Use room temperature water\n' +
        '• Water early morning or evening, not midday\n' +
        '• Reduce watering in winter when growth slows';
    case 'light':
      return 'Light requirements:\n\n' +
        'Bright indirect light (best for most houseplants):\n' +
        '• 3-4 hours of morning/evening sun\n' +
        '• North or east-facing windows\n' +
        '• 3-6 feet from south-facing window\n\n' +
        'Full sun: 6+ hours direct sunlight\n' +
        'Partial shade: 2-4 hours of light\n' +
        'Low light: Can survive with minimal light\n\n' +
        'Tip: Rotate plants weekly for even growth.';
    
    case 'disease': {
      const diseaseMatch = lastDisease || getDiseaseFromQuery(userQuery);
      if (diseaseMatch) {
        return formatDiseaseInfo(diseaseMatch);
      }
      return 'I could not find a specific disease from that query. Please ask about a named disease or describe symptoms clearly so I can show:' +
        '\n• Symptoms\n• Causes\n• Treatment';
    }
    
    case 'environment':
      return 'Temperature and humidity:\n\n' +
        'Ideal range: 65-75 F (18-24 C) for most plants\n\n' +
        'Humidity levels:\n' +
        '• Low (<40%): Most homes, use pebble trays\n' +
        '• Medium (40-60%): Ideal for most plants\n' +
        '• High (>60%): Tropical plants prefer this\n\n' +
        'Tips:\n' +
        '• Group plants together to increase humidity\n' +
        '• Use humidifier in dry climates\n' +
        '• Mist leaves (but not in direct sun)\n' +
        '• Avoid cold drafts and heat vents';
    
    case 'fertilizer':
      return 'Fertilizing guide:\n\n' +
        'When to fertilize:\n' +
        '• Spring through summer (growing season)\n' +
        '• Every 4-6 weeks for houseplants\n' +
        '• Reduce in fall/winter\n\n' +
        'Types of fertilizer:\n' +
        '• Balanced (10-10-10): All-purpose\n' +
        '• High nitrogen: For leafy growth\n' +
        '• High phosphorus: For flowers/fruits\n' +
        '• Organic: Slower release, better for soil\n\n' +
        'Important: Never fertilize dry soil or stressed plants.';
    
    case 'pest':
      return 'Common plant pests:\n\n' +
        'Spider mites:\n' +
        '• Tiny moving dots, fine webbing\n' +
        '• Treatment: Increase humidity, neem oil spray\n\n' +
        'Mealybugs:\n' +
        '• White cottony clusters\n' +
        '• Treatment: Remove with alcohol-soaked cotton\n\n' +
        'Scale insects:\n' +
        '• Brown raised bumps on stems\n' +
        '• Treatment: Scrape off, insecticidal soap\n\n' +
        'Fungus gnats:\n' +
        '• Small flying insects\n' +
        '• Treatment: Let soil dry, use sticky traps\n\n' +
        'Aphids:\n' +
        '• Soft green/black clusters on new growth\n' +
        '• Treatment: Rinse off, insecticidal soap\n\n' +
        'Thrips:\n' +
        '• Silvery streaks, tiny black specks\n' +
        '• Treatment: Blue sticky traps, neem oil\n\n' +
        'Whiteflies:\n' +
        '• White moth-like insects, leaf yellowing\n' +
        '• Treatment: Yellow sticky traps, neem oil';
    
    case 'potting':
      return 'Potting and repotting:\n\n' +
        'When to repot:\n' +
        '• Roots growing out drainage holes\n' +
        '• Plant growing too large for pot\n' +
        '• Soil not holding moisture\n' +
        '• Every 1-2 years for houseplants\n\n' +
        'How to repot:\n' +
        '1. Choose pot 1-2 inches larger\n' +
        '2. Use fresh, well-draining soil\n' +
        '3. Gently remove plant, loosen roots\n' +
        '4. Place in new pot, fill with soil\n' +
        '5. Water thoroughly\n\n' +
        'Best time: Spring or early summer';
    
    case 'question':
      return 'No record.';
    
    default:
      return 'No record.';
  }
};

const buildPlantInfo = (plant, queryType) => {
  const watering = plant.wateringFrequency || 'N/A';
  const sunlight = plant.sunlight || 'N/A';
  const temperature = plant.temperature || 'N/A';
  const ph = plant.ph || 'N/A';
  const diseases = (plant.commonDiseases || []).join(', ') || 'N/A';
  const symptoms = plant.symptoms
    ? Object.entries(plant.symptoms)
      .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
      .join('; ')
    : 'N/A';
  const tips = Array.isArray(plant.tips) && plant.tips.length > 0
    ? plant.tips.join('; ')
    : 'N/A';

  return `**${plant.name}** care guide:\n\n` +
    `• Watering: ${watering}\n` +
    `• Sunlight: ${sunlight}\n` +
    `• Temperature: ${temperature}\n` +
    `• pH: ${ph}\n` +
    `• Common diseases: ${diseases}\n` +
    `• Symptoms: ${symptoms}\n` +
    `• Tips: ${tips}`;
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', service: 'Plant Care APIs' });
});

// Chat endpoint - Uses plant knowledge base for responses
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prefer an explicit client id header for stable per-client session state.
    const clientKey = req.headers['x-client-id'] || req.headers['x-forwarded-for'] || req.ip || 'local';
    const normalizedMessage = normalizeText(message);
    if (normalizedMessage === 'clear') {
      lastPlantByClient.delete(clientKey);
      lastDiseaseByClient.delete(clientKey);
      return res.json({
        id: uuidv4(),
        message: 'Memory cleared.',
        timestamp: new Date(),
        source: 'plant-database'
      });
    }

    const queryAnalysis = analyzeQuery(message);
    const lastPlant = lastPlantByClient.get(clientKey);
    const lastDisease = lastDiseaseByClient.get(clientKey);

    console.log('[CHAT] clientKey=', clientKey, 'incoming=', message);
    console.log('[CHAT] priorLastDisease=', lastDisease ? lastDisease.name : null);

    // Use strict matching to detect explicit disease mentions (exact name or aliases)
    const explicitDisease = getDiseaseFromQueryStrict(message);
    if (explicitDisease) {
      lastDiseaseByClient.set(clientKey, explicitDisease);
      console.log('[CHAT] set explicitDisease for', clientKey, explicitDisease.name);
    }

    // For response, prefer explicitDisease, then previously stored lastDisease.
    // Only fall back to fuzzy suggestions if neither exists.
    let diseaseForResponse = explicitDisease || lastDisease;
    if (!diseaseForResponse) {
      diseaseForResponse = getDiseaseFromQuery(message);
    }

    console.log('[CHAT] diseaseForResponse=', diseaseForResponse ? diseaseForResponse.name : null);
    const response = generatePlantResponse(message, queryAnalysis, lastPlant, diseaseForResponse);

    if (queryAnalysis.type === 'plant') {
      lastPlantByClient.set(clientKey, queryAnalysis.plant);
    }

    res.json({
      id: uuidv4(),
      message: response,
      timestamp: new Date(),
      source: 'plant-database'
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Disease diagnosis endpoint using knowledge base
app.post('/api/diagnose', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Symptoms are required' });
    }

    const diagnosis = generateDiagnosis(symptoms);

    res.json({
      diagnosis: diagnosis,
      timestamp: new Date(),
      source: 'disease-database'
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ error: 'Failed to diagnose' });
  }
});

// Generate diagnosis from symptoms
const generateDiagnosis = (symptoms) => {
  const sym = symptoms.toLowerCase();

  // Check symptom patterns
  for (const [key, disease] of Object.entries(diseaseDatabase)) {
    if (disease.symptoms.toLowerCase().split(',').some(s => sym.includes(s.trim()))) {
      let response = `🔍 Possible Diagnosis: ${disease.name}\n\n`;
      response += `Symptoms: ${disease.symptoms}\n\n`;
      response += `Treatment:\n`;
      disease.treatment.forEach(t => {
        response += `• ${t}\n`;
      });
      return response;
    }
  }

  // Generic diagnosis if no match
  if (sym.includes('mushy') || sym.includes('soft') || sym.includes('rot')) {
    return 'Root Rot Detected\n\nSymptoms: Soft stems, mushy roots, foul soil smell\n\nTreatment:\n• Stop watering immediately\n• Repot in fresh, dry soil\n• Remove all affected roots with clean knife\n• Improve drainage with perlite mix\n• Allow soil to dry between waterings';
  }

  return 'Unable to identify specific disease from symptoms. Please describe more details or try the chat feature for more guidance.';
};

// Search for plants using local knowledge base
app.get('/api/search-plants', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query required' });
    }

    const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

    // Use local knowledge base with broader matching and scoring
    const results = Object.entries(plantKnowledgeBase)
      .map(([id, plant]) => {
        const name = plant.name.toLowerCase();
        const key = id.toLowerCase();
        let score = 0;

        if (name.includes(normalizedQuery)) score += 3;
        if (key.includes(normalizedQuery)) score += 2;
        if (tokens.length > 0 && tokens.every((token) => name.includes(token))) score += 2;
        if (tokens.length > 0 && tokens.some((token) => name.includes(token))) score += 1;

        return {
          id,
          name: plant.name,
          source: 'local',
          score
        };
      })
      .filter((plant) => plant.score > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 20)
      .map(({ score, ...plant }) => plant);

    res.json({ 
      plants: results, 
      source: results.length > 0 ? 'local-database' : 'none'
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get plant details from local knowledge base
app.get('/api/plants-search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const plant = plantKnowledgeBase[query.toLowerCase()] || 
                  Object.entries(plantKnowledgeBase).find(([_, p]) => 
                    p.name.toLowerCase() === query.toLowerCase()
                  )?.[1];

    if (plant) {
      return res.json({
        ...plant,
        source: 'local-database'
      });
    }

    res.status(404).json({ error: 'Plant not found' });
  } catch (error) {
    console.error('Plant details error:', error);
    res.status(500).json({ error: 'Failed to get plant details' });
  }
});

// Get plant info endpoint
app.get('/api/plants/:plantName', (req, res) => {
  const plantName = req.params.plantName.toLowerCase();
  const plant = plantKnowledgeBase[plantName];

  if (!plant) {
    return res.status(404).json({ error: 'Plant not found in database' });
  }

  res.json(plant);
});

// Get all plants endpoint
app.get('/api/plants', (req, res) => {
  const plants = Object.entries(plantKnowledgeBase).map(([key, value]) => ({
    id: key,
    name: value.name,
    watering: value.wateringFrequency,
    sunlight: value.sunlight
  }));
  res.json(plants);
});

// Get all diseases endpoint
app.get('/api/diseases', (req, res) => {
  const diseases = Object.entries(diseaseDatabase).map(([key, value]) => ({
    id: key,
    name: value.name,
    symptoms: value.symptoms,
    causes: value.causes,
    treatment: value.treatment
  }));
  res.json(diseases);
});

// Debug: inspect lastPlant/lastDisease for a given client id (for local debugging only)
app.get('/api/debug/client/:id', (req, res) => {
  const id = req.params.id;
  const lastPlant = lastPlantByClient.get(id);
  const lastDisease = lastDiseaseByClient.get(id);
  res.json({
    clientId: id,
    lastPlant: lastPlant ? (lastPlant.name || null) : null,
    lastDisease: lastDisease ? (lastDisease.name || null) : null
  });
});

// Search diseases using local knowledge base
app.get('/api/search-diseases', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query required' });
    }

    const results = getDiseaseSuggestions(query, 25);

    res.json({
      diseases: results,
      source: results.length > 0 ? 'local-database' : 'none'
    });
  } catch (error) {
    console.error('Disease search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get disease info endpoint
app.get('/api/diseases/:diseaseName', (req, res) => {
  const diseaseName = req.params.diseaseName.toLowerCase().replace(/\s+/g, '_');
  const disease = diseaseDatabase[diseaseName];

  if (!disease) {
    return res.status(404).json({ error: 'Disease not found in database' });
  }

  res.json(disease);
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Plant Assistant Backend is running on http://localhost:${PORT}`);
  console.log(`📚 Using Plant Care APIs (Local Database Only)`);
  console.log(`✅ No setup needed - just start chatting!`);
});


