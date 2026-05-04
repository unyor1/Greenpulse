// Plant Care Knowledge Base
export const plantKnowledgeBase = {
  tomato: {
    name: 'Tomato',
    wateringFrequency: '2-3 days',
    sunlight: '6-8 hours full sun',
    temperature: '21-24°C (70-75°F)',
    ph: '6.0-6.8',
    commonDiseases: ['Early blight', 'Late blight', 'Septoria leaf spot'],
    symptoms: {
      overwatered: 'Yellowing leaves, root rot, wilting',
      underwatered: 'Dry leaves, stunted growth',
      sunlight_deficit: 'Pale leaves, weak stems'
    },
    tips: [
      'Plant in well-draining soil',
      'Provide support with stakes or cages',
      'Remove lower leaves to prevent disease',
      'Water at the base, not foliage',
      'Prune suckers for better fruit production'
    ]
  },
  basil: {
    name: 'Basil',
    wateringFrequency: '1-2 days',
    sunlight: '6-8 hours full sun',
    temperature: '18-25°C (65-75°F)',
    ph: '6.0-7.0',
    commonDiseases: ['Fusarium wilt', 'Leaf spot', 'Powdery mildew'],
    symptoms: {
      overwatered: 'Root rot, fungal infections',
      underwatered: 'Wilting, slow growth',
      sunlight_deficit: 'Leggy growth, pale leaves'
    },
    tips: [
      'Pinch off flower buds to encourage leaf growth',
      'Keep soil consistently moist but not soggy',
      'Harvest regularly to promote bushiness',
      'Provide warm conditions',
      'Improve air circulation'
    ]
  },
  succulent: {
    name: 'Succulent',
    wateringFrequency: '7-14 days',
    sunlight: '4-6 hours bright light',
    temperature: '13-24°C (55-75°F)',
    ph: '6.0-7.5',
    commonDiseases: ['Root rot', 'Mealybugs', 'Scale insects'],
    symptoms: {
      overwatered: 'Soft, translucent leaves, mushy stems',
      underwatered: 'Shriveled leaves, brown edges',
      sunlight_deficit: 'Etiolation, pale color'
    },
    tips: [
      'Use well-draining cactus soil',
      'Water sparingly, only when soil is dry',
      'Ensure excellent drainage and air circulation',
      'Place in bright light location',
      'Reduce watering in winter'
    ]
  },
  pothos: {
    name: 'Pothos (Devil\'s Ivy)',
    wateringFrequency: '1-2 weeks',
    sunlight: '2-4 hours indirect light',
    temperature: '18-25°C (65-75°F)',
    ph: '6.1-6.5',
    commonDiseases: ['Root rot', 'Leaf spot', 'Mealybugs'],
    symptoms: {
      overwatered: 'Yellow leaves, soft stems',
      underwatered: 'Brown leaf tips, slow growth',
      sunlight_deficit: 'No obvious decline, adapts well'
    },
    tips: [
      'Place in bright, indirect light',
      'Allow soil to dry between waterings',
      'Provide support or trailing space',
      'Wipe leaves occasionally to remove dust',
      'Trim regularly to promote bushiness'
    ]
  },
  monstera: {
    name: 'Monstera Deliciosa',
    wateringFrequency: '1 week',
    sunlight: '3-4 hours bright indirect light',
    temperature: '18-27°C (65-80°F)',
    ph: '5.5-7.0',
    commonDiseases: ['Root rot', 'Leaf spot', 'Spider mites'],
    symptoms: {
      overwatered: 'Yellow leaves, stem rot',
      underwatered: 'Brown edges, small leaves',
      sunlight_deficit: 'Fewer leaf splits (fenestrations)'
    },
    tips: [
      'Needs climbing support or moss pole',
      'Allow soil to dry slightly between waterings',
      'Provide bright, indirect light',
      'Mist leaves occasionally',
      'Clean leaves monthly with water'
    ]
  },
  rice: {
    name: 'Rice',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: '6-8 hours full sun',
    temperature: '20-35 C (68-95 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Blast', 'Bacterial blight', 'Sheath blight'],
    symptoms: {
      overwatered: 'Yellowing leaves, weak tillers',
      underwatered: 'Leaf rolling, stunted growth',
      sunlight_deficit: 'Thin stems, poor grain filling'
    },
    tips: [
      'Maintain shallow water during vegetative stage',
      'Use balanced fertilizer at key growth stages',
      'Control weeds early',
      'Ensure proper spacing for airflow'
    ]
  },
  corn: {
    name: 'Corn (Maize)',
    wateringFrequency: '1-2 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Rust', 'Leaf blight', 'Downy mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, poor root health',
      underwatered: 'Leaf curling, poor ear development',
      sunlight_deficit: 'Weak stalks, small ears'
    },
    tips: [
      'Plant in blocks for good pollination',
      'Side-dress nitrogen at knee height',
      'Keep soil evenly moist during tasseling'
    ]
  },
  sugarcane: {
    name: 'Sugarcane',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '21-32 C (70-90 F)',
    ph: '5.0-8.5',
    commonDiseases: ['Red rot', 'Smut', 'Mosaic virus'],
    symptoms: {
      overwatered: 'Yellowing, weak stalks',
      underwatered: 'Slow growth, thin canes',
      sunlight_deficit: 'Low sugar content'
    },
    tips: [
      'Use healthy setts for planting',
      'Control weeds early',
      'Hill up soil as canes grow'
    ]
  },
  coconut: {
    name: 'Coconut',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '25-32 C (77-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Bud rot', 'Root wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow fronds, root stress',
      underwatered: 'Wilting, slow frond growth',
      sunlight_deficit: 'Poor nut set'
    },
    tips: [
      'Plant in well-drained soil',
      'Mulch to retain moisture',
      'Fertilize with potassium-rich mix'
    ]
  },
  banana_saba: {
    name: 'Banana (Saba)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Leaf scorch, small bunches',
      sunlight_deficit: 'Weak pseudostem'
    },
    tips: [
      'Keep soil evenly moist',
      'Remove suckers to keep 1-2 per mat',
      'Provide wind protection'
    ]
  },
  banana_lakatan: {
    name: 'Banana (Lakatan)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Dry edges, small fingers',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Use disease-free planting materials',
      'Apply mulch regularly',
      'Remove old leaves for airflow'
    ]
  },
  banana_latundan: {
    name: 'Banana (Latundan)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Leaf scorch, small bunches',
      sunlight_deficit: 'Weak pseudostem'
    },
    tips: [
      'Maintain good drainage',
      'Fertilize with balanced NPK',
      'Support bunches during fruiting'
    ]
  },
  banana_cardava: {
    name: 'Banana (Cardava)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Dry tips, slow growth',
      sunlight_deficit: 'Thin pseudostem'
    },
    tips: [
      'Keep soil evenly moist',
      'Remove excess suckers',
      'Use organic mulch'
    ]
  },
  mango: {
    name: 'Mango',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Anthracnose', 'Powdery mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruit set',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune after harvest for shape',
      'Water deeply during flowering and fruiting',
      'Ensure good airflow'
    ]
  },
  pineapple: {
    name: 'Pineapple',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '4.5-6.5',
    commonDiseases: ['Heart rot', 'Root rot'],
    symptoms: {
      overwatered: 'Soft core, wilting',
      underwatered: 'Slow growth, small fruit',
      sunlight_deficit: 'Poor fruit size'
    },
    tips: [
      'Plant in well-drained sandy soil',
      'Avoid water in the crown',
      'Fertilize lightly but regularly'
    ]
  },
  papaya: {
    name: 'Papaya',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Anthracnose', 'Phytophthora'],
    symptoms: {
      overwatered: 'Root rot, yellow leaves',
      underwatered: 'Leaf drop, small fruit',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Plant in well-drained soil',
      'Stake young plants against wind',
      'Remove diseased fruits early'
    ]
  },
  calamansi: {
    name: 'Calamansi',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf curl, fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune lightly to shape',
      'Fertilize with citrus mix',
      'Control pests early'
    ]
  },
  jackfruit: {
    name: 'Jackfruit',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '23-32 C (73-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Fruit rot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Leaf drop, small fruit',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Provide mulch to retain moisture',
      'Thin fruits for better size',
      'Keep area weed-free'
    ]
  },
  lanzones: {
    name: 'Lanzones',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Partial to full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Sooty mold'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruiting',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Maintain moderate moisture',
      'Mulch to protect roots',
      'Prune lightly after harvest'
    ]
  },
  rambutan: {
    name: 'Rambutan',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Fruit rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor fruit set',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Water during flowering and fruiting',
      'Provide mulch',
      'Prune for airflow'
    ]
  },
  durian: {
    name: 'Durian',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Stem canker'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Plant in deep, well-drained soil',
      'Mulch heavily',
      'Avoid waterlogging'
    ]
  },
  mangosteen: {
    name: 'Mangosteen',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Partial to full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Slow growth',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Keep soil evenly moist',
      'Mulch to retain moisture',
      'Avoid strong winds'
    ]
  },
  guava: {
    name: 'Guava',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.0-7.0',
    commonDiseases: ['Fruit fly', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Fruit drop, leaf curl',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune to keep manageable size',
      'Bag fruits to prevent pests',
      'Fertilize regularly'
    ]
  },
  avocado: {
    name: 'Avocado',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '16-30 C (60-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Root rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Wilting, leaf drop',
      underwatered: 'Brown leaf tips',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Ensure good drainage',
      'Mulch to protect roots',
      'Avoid overwatering'
    ]
  },
  watermelon: {
    name: 'Watermelon',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Fusarium wilt'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor sweetness'
    },
    tips: [
      'Water at base to reduce disease',
      'Mulch to keep fruit clean',
      'Allow vines to spread'
    ]
  },
  cantaloupe: {
    name: 'Cantaloupe',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Downy mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Low sugar'
    },
    tips: [
      'Water consistently until fruit set',
      'Reduce watering near harvest',
      'Use mulch for moisture'
    ]
  },
  honeydew_melon: {
    name: 'Honeydew Melon',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor sweetness'
    },
    tips: [
      'Provide trellis if space is limited',
      'Water at base',
      'Harvest when fruit turns creamy'
    ]
  },
  cucumber: {
    name: 'Cucumber',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '21-30 C (70-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Downy mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Bitter fruits, leaf wilt',
      sunlight_deficit: 'Poor yield'
    },
    tips: [
      'Trellis for better airflow',
      'Harvest regularly',
      'Water consistently'
    ]
  },
  eggplant: {
    name: 'Eggplant (Talong)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Bacterial wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Drooping leaves, poor fruit',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Stake plants for support',
      'Remove old leaves',
      'Harvest when glossy'
    ]
  },
  okra: {
    name: 'Okra',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-34 C (72-93 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Powdery mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Small pods, leaf wilt',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest pods young',
      'Water at base',
      'Use mulch to retain moisture'
    ]
  },
  bitter_gourd: {
    name: 'Bitter Gourd (Ampalaya)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis support',
      'Harvest fruits regularly',
      'Water evenly'
    ]
  },
  squash: {
    name: 'Squash (Kalabasa)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Vine borer'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor fruit set'
    },
    tips: [
      'Allow vines to spread',
      'Hand pollinate if needed',
      'Mulch to reduce weeds'
    ]
  },
  bottle_gourd: {
    name: 'Bottle Gourd (Upo)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Train on trellis',
      'Harvest when young',
      'Water evenly'
    ]
  },
  sponge_gourd: {
    name: 'Sponge Gourd (Patola)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Use trellis for straight fruits',
      'Harvest young for eating',
      'Water consistently'
    ]
  },
  chayote: {
    name: 'Chayote (Sayote)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis support',
      'Harvest young',
      'Keep soil moist'
    ]
  },
  winged_bean: {
    name: 'Winged Bean (Sigarilyas)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis',
      'Harvest pods young',
      'Water consistently'
    ]
  },
  yardlong_bean: {
    name: 'Yardlong Bean (Sitaw)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Mosaic virus'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Short pods, leaf wilt',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Use trellis or poles',
      'Pick pods regularly',
      'Mulch to retain moisture'
    ]
  },
  mung_bean: {
    name: 'Mung Bean (Munggo)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Plant in well-drained soil',
      'Avoid waterlogging',
      'Harvest when pods are dry'
    ]
  },
  peanut: {
    name: 'Peanut',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small pods',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Hill soil around plants',
      'Water during flowering',
      'Harvest when leaves yellow'
    ]
  },
  soybean: {
    name: 'Soybean',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Small pods',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Inoculate seeds if possible',
      'Avoid waterlogging',
      'Harvest when pods dry'
    ]
  },
  cowpea: {
    name: 'Cowpea',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Aphids', 'Mosaic virus'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Provide support for climbing types',
      'Harvest pods regularly',
      'Keep soil moderately moist'
    ]
  },
  pigeon_pea: {
    name: 'Pigeon Pea (Kadyos)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune lightly to encourage branching',
      'Water during flowering',
      'Harvest pods when green'
    ]
  },
  cassava: {
    name: 'Cassava',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Mosaic virus', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Slow growth',
      sunlight_deficit: 'Low root yield'
    },
    tips: [
      'Plant cuttings in well-drained soil',
      'Weed regularly',
      'Harvest after 8-12 months'
    ]
  },
  sweet_potato: {
    name: 'Sweet Potato (Kamote)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Weevil', 'Leaf spot'],
    symptoms: {
      overwatered: 'Root rot, yellow leaves',
      underwatered: 'Small roots',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Use vine cuttings to plant',
      'Keep soil loose',
      'Harvest after 3-4 months'
    ]
  },
  taro: {
    name: 'Taro (Gabi)',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: 'Full sun to partial sun',
    temperature: '21-30 C (70-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf blight', 'Root rot'],
    symptoms: {
      overwatered: 'Soft corms, yellow leaves',
      underwatered: 'Small corms',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in moist soil',
      'Remove diseased leaves',
      'Harvest after 6-8 months'
    ]
  },
  ube: {
    name: 'Purple Yam (Ube)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Rotting tubers',
      underwatered: 'Small tubers',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Provide trellis for vines',
      'Use loose soil',
      'Harvest after vines die back'
    ]
  },
  yam: {
    name: 'Yam (Greater Yam)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Rotting tubers',
      underwatered: 'Small tubers',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Provide trellis for vines',
      'Use well-drained soil',
      'Harvest after 8-10 months'
    ]
  },
  ginger: {
    name: 'Ginger (Luya)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Rhizome rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose, rich soil',
      'Mulch to keep soil moist',
      'Harvest after 8-10 months'
    ]
  },
  turmeric: {
    name: 'Turmeric (Luyang Dilaw)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Rhizome rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose soil',
      'Mulch to retain moisture',
      'Harvest after 8-10 months'
    ]
  },
  garlic: {
    name: 'Garlic',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '13-24 C (55-75 F)',
    ph: '6.0-7.0',
    commonDiseases: ['White rot', 'Rust'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Plant in well-drained soil',
      'Reduce watering near harvest',
      'Harvest when tops yellow'
    ]
  },
  onion: {
    name: 'Onion',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '13-27 C (55-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Purple blotch', 'Downy mildew'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Keep soil moist but not soggy',
      'Weed regularly',
      'Harvest when tops fall over'
    ]
  },
  shallot: {
    name: 'Shallot',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-27 C (59-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Purple blotch', 'Downy mildew'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Use well-drained soil',
      'Water consistently',
      'Harvest when tops yellow'
    ]
  },
  spring_onion: {
    name: 'Spring Onion',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-27 C (59-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Thrips'],
    symptoms: {
      overwatered: 'Soft bases',
      underwatered: 'Thin leaves',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest regularly to encourage growth',
      'Keep soil moist',
      'Use mulch'
    ]
  },

  bell_pepper: {
    name: 'Bell Pepper',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Bacterial spot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Blossom drop',
      sunlight_deficit: 'Small fruits'
    },
    tips: [
      'Mulch to retain moisture',
      'Keep soil evenly moist',
      'Harvest when firm'
    ]
  },
  black_pepper: {
    name: 'Black Pepper',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Foot rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Provide sturdy support',
      'Mulch to keep roots cool',
      'Avoid waterlogging'
    ]
  },
  lemongrass: {
    name: 'Lemongrass',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Rust', 'Leaf blight'],
    symptoms: {
      overwatered: 'Yellowing leaves',
      underwatered: 'Dry tips',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Harvest outer stalks first',
      'Divide clumps to propagate',
      'Keep soil moderately moist'
    ]
  },
  pandan: {
    name: 'Pandan',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Partial sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Dry tips',
      sunlight_deficit: 'Pale leaves'
    },
    tips: [
      'Keep soil moist but not soggy',
      'Harvest mature leaves',
      'Provide light shade in hot areas'
    ]
  },
  moringa: {
    name: 'Moringa (Malunggay)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-35 C (72-95 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Caterpillars'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Prune regularly for leafy growth',
      'Water during dry season',
      'Harvest young leaves'
    ]
  },
  kangkong: {
    name: 'Water Spinach (Kangkong)',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: 'Full sun to partial sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Harvest tips regularly',
      'Keep soil moist',
      'Replant from cuttings'
    ]
  },
  pechay: {
    name: 'Pechay',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Harvest at 25-30 days',
      'Water consistently',
      'Keep pests under control'
    ]
  },
  bok_choy: {
    name: 'Bok Choy',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Harvest young for tenderness',
      'Water consistently',
      'Provide light shade in heat'
    ]
  },
  cabbage: {
    name: 'Cabbage',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Black rot', 'Clubroot'],
    symptoms: {
      overwatered: 'Soft heads, rot',
      underwatered: 'Small heads',
      sunlight_deficit: 'Loose heads'
    },
    tips: [
      'Provide steady moisture',
      'Use crop rotation',
      'Harvest when heads are firm'
    ]
  },
  lettuce: {
    name: 'Lettuce',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak heads'
    },
    tips: [
      'Water early morning',
      'Harvest young leaves',
      'Provide shade in hot months'
    ]
  },
  spinach: {
    name: 'Spinach',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Small leaves',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest outer leaves first',
      'Keep soil moist',
      'Use mulch'
    ]
  },
  mustard_greens: {
    name: 'Mustard Greens',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Aphids', 'Downy mildew'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest young leaves',
      'Water consistently',
      'Use insect netting if needed'
    ]
  },
  amaranth: {
    name: 'Amaranth (Kulitis)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Harvest young leaves',
      'Keep soil moist',
      'Sow every 2-3 weeks for steady harvest'
    ]
  },
  radish: {
    name: 'Radish (Labanos)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-27 C (59-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Root maggot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Root rot',
      underwatered: 'Pithy roots',
      sunlight_deficit: 'Small roots'
    },
    tips: [
      'Keep soil consistently moist',
      'Thin seedlings',
      'Harvest on time'
    ]
  },
  carrot: {
    name: 'Carrot',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Root rot', 'Leaf blight'],
    symptoms: {
      overwatered: 'Forked roots, rot',
      underwatered: 'Short roots',
      sunlight_deficit: 'Small roots'
    },
    tips: [
      'Use loose, sandy soil',
      'Keep soil evenly moist',
      'Thin seedlings early'
    ]
  },
  potato: {
    name: 'Potato',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '5.0-6.5',
    commonDiseases: ['Late blight', 'Scab'],
    symptoms: {
      overwatered: 'Rotting tubers',
      underwatered: 'Small tubers',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Hill soil around stems',
      'Water during tuber formation',
      'Harvest after vines die back'
    ]
  },
  jicama: {
    name: 'Jicama (Singkamas)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Rotting roots',
      underwatered: 'Small roots',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Provide trellis for vines',
      'Use loose soil',
      'Harvest after 5-6 months'
    ]
  },
  soursop: {
    name: 'Soursop (Guyabano)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Anthracnose', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruiting',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Mulch to conserve moisture',
      'Prune lightly',
      'Protect fruits from pests'
    ]
  },
  star_apple: {
    name: 'Star Apple (Caimito)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune after harvest',
      'Water during fruiting',
      'Mulch to retain moisture'
    ]
  },
  sapodilla: {
    name: 'Sapodilla (Chico)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Provide mulch',
      'Prune lightly',
      'Harvest when fruit is soft'
    ]
  },
  santol: {
    name: 'Santol',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Fruit rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune for airflow',
      'Mulch during dry season',
      'Harvest when fruit is mature'
    ]
  },
  pomelo: {
    name: 'Pomelo',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Fertilize with citrus mix',
      'Prune to open canopy',
      'Control pests early'
    ]
  },
  dalandan_orange: {
    name: 'Dalandan (Orange)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf curl',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Mulch to retain moisture',
      'Prune lightly',
      'Fertilize regularly'
    ]
  },
  tangerine: {
    name: 'Tangerine',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf curl',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune after harvest',
      'Water during flowering',
      'Control pests'
    ]
  },
  dayap_lime: {
    name: 'Dayap (Lime)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf curl',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide mulch',
      'Prune lightly',
      'Fertilize regularly'
    ]
  },
  dragonfruit: {
    name: 'Dragon Fruit',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Stem rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Shriveled stems',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide sturdy support posts',
      'Avoid water on stems',
      'Fertilize during flowering'
    ]
  },
  passionfruit: {
    name: 'Passionfruit',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Fusarium wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor fruit set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Prune to maintain airflow',
      'Water during flowering'
    ]
  },
  strawberry: {
    name: 'Strawberry',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Gray mold', 'Leaf spot'],
    symptoms: {
      overwatered: 'Fruit rot, yellow leaves',
      underwatered: 'Small berries',
      sunlight_deficit: 'Poor yield'
    },
    tips: [
      'Use mulch to keep fruit clean',
      'Avoid wetting leaves',
      'Harvest when fully red'
    ]
  },
  coffee: {
    name: 'Coffee',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf rust', 'Berry disease'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide shade in hot areas',
      'Prune to maintain shape',
      'Mulch to conserve moisture'
    ]
  },
  cacao: {
    name: 'Cacao',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Black pod', 'Vascular streak dieback'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low pod set'
    },
    tips: [
      'Provide shade for young trees',
      'Prune for airflow',
      'Remove diseased pods'
    ]
  },
  breadfruit: {
    name: 'Breadfruit (Rimas)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Fruit rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Mulch to retain moisture',
      'Prune lightly',
      'Harvest when fruit is mature'
    ]
  },
  tamarind: {
    name: 'Tamarind (Sampalok)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Pod borers'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune to maintain shape',
      'Mulch during dry months',
      'Harvest pods when brown'
    ]
  },
  cashew: {
    name: 'Cashew',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.0-6.5',
    commonDiseases: ['Anthracnose', 'Dieback'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Plant in well-drained soil',
      'Prune after harvest',
      'Control pests early'
    ]
  },
  pili_nut: {
    name: 'Pili Nut',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide mulch',
      'Prune lightly',
      'Harvest when fruits are mature'
    ]
  },
  sesame: {
    name: 'Sesame',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor seed set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Plant in well-drained soil',
      'Avoid waterlogging',
      'Harvest when pods dry'
    ]
  },
  sugar_apple: {
    name: 'Sugar Apple (Atis)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Anthracnose', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune for airflow',
      'Bag fruits to protect from pests',
      'Mulch to conserve moisture'
    ]
  },
  java_plum: {
    name: 'Java Plum (Duhat)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune to keep manageable size',
      'Mulch during dry season',
      'Harvest when fruits are deep purple'
    ]
  },
  starfruit: {
    name: 'Starfruit (Balimbing)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Fruit rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Water during flowering',
      'Prune lightly',
      'Mulch to retain moisture'
    ]
  },
  bilimbi: {
    name: 'Bilimbi (Kamias)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune after harvest',
      'Mulch to conserve moisture',
      'Harvest when fruits are firm'
    ]
  },
  wax_apple: {
    name: 'Wax Apple (Macopa)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Fruit rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Fruit drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Provide mulch',
      'Prune for airflow',
      'Harvest when fruits are glossy'
    ]
  },
  spanish_plum: {
    name: 'Spanish Plum (Siniguelas)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Leaf spot', 'Fruit fly'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Bag fruits to reduce pests',
      'Prune lightly',
      'Mulch during dry season'
    ]
  },
  marang: {
    name: 'Marang',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Fruit rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Mulch to conserve moisture',
      'Prune lightly',
      'Harvest when fruits are mature'
    ]
  },
  longan: {
    name: 'Longan',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune after harvest',
      'Water during flowering',
      'Mulch to conserve moisture'
    ]
  },
  lychee: {
    name: 'Lychee',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune lightly after harvest',
      'Maintain even moisture',
      'Mulch to retain moisture'
    ]
  },
  banana_cavendish: {
    name: 'Banana (Cavendish)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use disease-free planting materials',
      'Remove old leaves',
      'Mulch to retain moisture'
    ]
  },
  banana_senorita: {
    name: 'Banana (Senorita)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Keep soil evenly moist',
      'Remove excess suckers',
      'Provide wind protection'
    ]
  },
  banana_bungulan: {
    name: 'Banana (Bungulan)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use healthy planting materials',
      'Mulch to conserve moisture',
      'Support bunches during fruiting'
    ]
  },
  siling_labuyo: {
    name: 'Siling Labuyo',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Anthracnose', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Flower drop',
      sunlight_deficit: 'Low fruit set'
    },
    tips: [
      'Avoid wetting foliage',
      'Provide support for heavy fruiting',
      'Harvest regularly'
    ]
  },
  siling_haba: {
    name: 'Siling Haba',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Anthracnose', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Flower drop',
      sunlight_deficit: 'Low fruit set'
    },
    tips: [
      'Keep soil evenly moist',
      'Mulch to reduce weeds',
      'Harvest when fruits are firm'
    ]
  },
  sweet_corn: {
    name: 'Sweet Corn',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Rust', 'Leaf blight'],
    symptoms: {
      overwatered: 'Yellow leaves, weak roots',
      underwatered: 'Poor ear fill',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Plant in blocks for pollination',
      'Water during silking',
      'Harvest when silk turns brown'
    ]
  },
  green_peas: {
    name: 'Green Peas',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Powdery mildew', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Harvest regularly',
      'Water at base'
    ]
  },
  alugbati: {
    name: 'Alugbati (Malabar Spinach)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems, yellow leaves',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin vines'
    },
    tips: [
      'Harvest young leaves',
      'Provide support for vines',
      'Keep soil evenly moist'
    ]
  },
  saluyot: {
    name: 'Saluyot (Jute Mallow)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin growth'
    },
    tips: [
      'Harvest tender shoots',
      'Water consistently',
      'Sow every few weeks for steady harvest'
    ]
  },
  chinese_kale: {
    name: 'Chinese Kale (Kai Lan)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Harvest before flowering',
      'Keep soil moist',
      'Use insect netting if needed'
    ]
  },
  napa_cabbage: {
    name: 'Napa Cabbage',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Black rot', 'Downy mildew'],
    symptoms: {
      overwatered: 'Soft heads',
      underwatered: 'Loose heads',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Water steadily',
      'Use crop rotation',
      'Harvest when heads are firm'
    ]
  },
  cauliflower: {
    name: 'Cauliflower',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Black rot', 'Clubroot'],
    symptoms: {
      overwatered: 'Soft curds',
      underwatered: 'Small heads',
      sunlight_deficit: 'Loose curds'
    },
    tips: [
      'Blanch heads by tying leaves',
      'Maintain even moisture',
      'Harvest when curds are tight'
    ]
  },
  broccoli: {
    name: 'Broccoli',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Black rot'],
    symptoms: {
      overwatered: 'Soft heads',
      underwatered: 'Small heads',
      sunlight_deficit: 'Loose heads'
    },
    tips: [
      'Harvest central head first',
      'Keep soil moist',
      'Feed with balanced fertilizer'
    ]
  },
  broccolini: {
    name: 'Broccolini',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Black rot'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Thin stems',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Harvest stalks regularly',
      'Keep soil moist',
      'Provide light fertilizer'
    ]
  },
  broccoli_rabe: {
    name: 'Broccoli Rabe',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Thin growth'
    },
    tips: [
      'Harvest tender shoots',
      'Water consistently',
      'Use mulch to retain moisture'
    ]
  },
  celery: {
    name: 'Celery',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Root rot'],
    symptoms: {
      overwatered: 'Soft stalks',
      underwatered: 'Stringy stalks',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Keep soil evenly moist',
      'Use compost-rich soil',
      'Harvest outer stalks first'
    ]
  },
  leek: {
    name: 'Leek',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Thrips'],
    symptoms: {
      overwatered: 'Soft bases',
      underwatered: 'Thin stems',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Hill soil to blanch stems',
      'Water consistently',
      'Remove weeds early'
    ]
  },
  chives: {
    name: 'Chives',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Thrips'],
    symptoms: {
      overwatered: 'Soft bases',
      underwatered: 'Dry tips',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Harvest regularly',
      'Divide clumps every season',
      'Keep soil moist'
    ]
  },
  parsley: {
    name: 'Parsley',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest outer leaves first',
      'Keep soil moist',
      'Use rich soil'
    ]
  },
  cilantro: {
    name: 'Cilantro',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest before flowering',
      'Water consistently',
      'Succession sow every 2-3 weeks'
    ]
  },
  dill: {
    name: 'Dill',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Harvest young leaves',
      'Support tall plants',
      'Avoid overwatering'
    ]
  },
  mint: {
    name: 'Mint',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-28 C (59-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Dry tips',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Grow in containers to control spread',
      'Harvest regularly',
      'Keep soil evenly moist'
    ]
  },
  oregano: {
    name: 'Oregano',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Dry leaves',
      sunlight_deficit: 'Leggy growth'
    },
    tips: [
      'Let soil dry between watering',
      'Prune to encourage bushiness',
      'Harvest before flowering'
    ]
  },
  thyme: {
    name: 'Thyme',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Dry leaves',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use well-drained soil',
      'Avoid overwatering',
      'Trim after flowering'
    ]
  },
  rosemary: {
    name: 'Rosemary',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Dry needles',
      sunlight_deficit: 'Leggy growth'
    },
    tips: [
      'Use well-drained soil',
      'Water sparingly',
      'Prune lightly'
    ]
  },
  sage: {
    name: 'Sage',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Dry leaves',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use well-drained soil',
      'Avoid overwatering',
      'Prune after flowering'
    ]
  },
  bay_leaf: {
    name: 'Bay Leaf',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun to partial sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Scale insects'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Dry leaves',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Use well-drained soil',
      'Prune to shape',
      'Harvest mature leaves'
    ]
  },
  arugula: {
    name: 'Arugula',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small leaves'
    },
    tips: [
      'Harvest young leaves',
      'Keep soil moist',
      'Provide light shade in heat'
    ]
  },
  kale: {
    name: 'Kale',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Aphids', 'Downy mildew'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small leaves'
    },
    tips: [
      'Harvest outer leaves first',
      'Water consistently',
      'Use compost-rich soil'
    ]
  },
  swiss_chard: {
    name: 'Swiss Chard',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-28 C (59-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Harvest outer leaves',
      'Keep soil moist',
      'Provide light shade in heat'
    ]
  },
  endive: {
    name: 'Endive',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Water steadily',
      'Harvest when heads are firm',
      'Provide light shade in heat'
    ]
  },
  radicchio: {
    name: 'Radicchio',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Water consistently',
      'Harvest when heads are firm',
      'Keep soil evenly moist'
    ]
  },
  romaine_lettuce: {
    name: 'Romaine Lettuce',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak heads'
    },
    tips: [
      'Harvest when heads are firm',
      'Water early morning',
      'Provide shade in hot months'
    ]
  },
  butterhead_lettuce: {
    name: 'Butterhead Lettuce',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak heads'
    },
    tips: [
      'Harvest young heads',
      'Water consistently',
      'Provide shade in heat'
    ]
  },
  iceberg_lettuce: {
    name: 'Iceberg Lettuce',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Loose heads'
    },
    tips: [
      'Maintain even moisture',
      'Harvest when heads are tight',
      'Provide shade in heat'
    ]
  },
  asparagus: {
    name: 'Asparagus',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.5-7.5',
    commonDiseases: ['Rust', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow fronds',
      underwatered: 'Thin spears',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use deep, well-drained soil',
      'Harvest spears early',
      'Allow fronds to grow after harvest'
    ]
  },
  artichoke: {
    name: 'Artichoke',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-28 C (59-82 F)',
    ph: '6.5-7.5',
    commonDiseases: ['Aphids', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small buds',
      sunlight_deficit: 'Weak stems'
    },
    tips: [
      'Use rich, well-drained soil',
      'Harvest buds before opening',
      'Mulch to retain moisture'
    ]
  },
  beet: {
    name: 'Beet',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Rotting roots',
      underwatered: 'Small roots',
      sunlight_deficit: 'Weak tops'
    },
    tips: [
      'Thin seedlings early',
      'Keep soil evenly moist',
      'Harvest at desired size'
    ]
  },
  turnip: {
    name: 'Turnip',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Root maggot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Rotting roots',
      underwatered: 'Woody roots',
      sunlight_deficit: 'Small roots'
    },
    tips: [
      'Keep soil moist',
      'Thin seedlings',
      'Harvest on time'
    ]
  },
  parsnip: {
    name: 'Parsnip',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Rotting roots',
      underwatered: 'Small roots',
      sunlight_deficit: 'Weak tops'
    },
    tips: [
      'Use loose soil',
      'Keep soil evenly moist',
      'Harvest after roots mature'
    ]
  },
  sorghum: {
    name: 'Sorghum',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf blight', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor grain fill',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Plant in well-drained soil',
      'Control weeds early',
      'Harvest when heads are dry'
    ]
  },
  millet: {
    name: 'Millet',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf blight', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor grain fill',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Plant in well-drained soil',
      'Avoid waterlogging',
      'Harvest when heads are dry'
    ]
  },
  barley: {
    name: 'Barley',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor grain fill',
      sunlight_deficit: 'Weak stems'
    },
    tips: [
      'Plant in well-drained soil',
      'Water during heading',
      'Harvest when heads are dry'
    ]
  },
  oats: {
    name: 'Oats',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor grain fill',
      sunlight_deficit: 'Weak stems'
    },
    tips: [
      'Use well-drained soil',
      'Keep weeds controlled',
      'Harvest when grains are dry'
    ]
  },
  chickpea: {
    name: 'Chickpea',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Blight', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Avoid waterlogging',
      'Harvest when pods dry',
      'Rotate crops yearly'
    ]
  },
  lentil: {
    name: 'Lentil',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Blight', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use well-drained soil',
      'Harvest when pods are dry',
      'Avoid overhead watering'
    ]
  },
  black_bean: {
    name: 'Black Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Use trellis if climbing',
      'Avoid waterlogging',
      'Harvest when pods are dry'
    ]
  },
  kidney_bean: {
    name: 'Kidney Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Provide trellis support',
      'Water during flowering',
      'Harvest when pods dry'
    ]
  },
  navy_bean: {
    name: 'Navy Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Avoid waterlogging',
      'Harvest when pods dry',
      'Rotate crops yearly'
    ]
  },
  lima_bean: {
    name: 'Lima Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Use trellis for climbing types',
      'Water during flowering',
      'Harvest when pods are plump'
    ]
  },
  fava_bean: {
    name: 'Fava Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Stake plants if tall',
      'Keep soil moist',
      'Harvest when pods are full'
    ]
  },
  adzuki_bean: {
    name: 'Adzuki Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Avoid waterlogging',
      'Harvest when pods dry',
      'Keep weeds controlled'
    ]
  },
  snow_peas: {
    name: 'Snow Peas',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Powdery mildew', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Harvest pods young',
      'Water at base'
    ]
  },
  sugar_snap_peas: {
    name: 'Sugar Snap Peas',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Powdery mildew', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Use trellis support',
      'Harvest regularly',
      'Keep soil moist'
    ]
  },
  bamboo_shoots: {
    name: 'Bamboo Shoots',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun to partial sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor shoot growth',
      sunlight_deficit: 'Thin shoots'
    },
    tips: [
      'Harvest young shoots',
      'Mulch to retain moisture',
      'Control spreading with barriers'
    ]
  },
  lotus_root: {
    name: 'Lotus Root',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Rhizome rot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Weak leaves'
    },
    tips: [
      'Grow in shallow water',
      'Harvest mature rhizomes',
      'Remove old leaves'
    ]
  },
  arrowroot: {
    name: 'Arrowroot',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '20-30 C (68-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Rotting rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose soil',
      'Keep soil moist',
      'Harvest after leaves yellow'
    ]
  },
  taro_leaves: {
    name: 'Taro Leaves (Gabi Leaves)',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: 'Full sun to partial sun',
    temperature: '21-30 C (70-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf blight', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Small leaves'
    },
    tips: [
      'Harvest young leaves',
      'Remove diseased leaves',
      'Keep soil moist'
    ]
  },
  sweet_potato_leaves: {
    name: 'Sweet Potato Leaves',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin vines'
    },
    tips: [
      'Harvest tender shoots',
      'Keep soil moist',
      'Replant from cuttings'
    ]
  },
  cassava_leaves: {
    name: 'Cassava Leaves',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Mosaic virus', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest young leaves',
      'Keep soil moderately moist',
      'Use clean planting material'
    ]
  },
  tomato_cherry: {
    name: 'Cherry Tomato',
    wateringFrequency: '2-3 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '21-30 C (70-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Early blight', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Cracked fruits',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Support with stakes',
      'Water at base',
      'Harvest when fully colored'
    ]
  },
  tomato_plum: {
    name: 'Plum Tomato',
    wateringFrequency: '2-3 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '21-30 C (70-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Early blight', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Blossom end rot',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Use mulch to retain moisture',
      'Prune lower leaves',
      'Harvest when firm'
    ]
  },
  tomato_beefsteak: {
    name: 'Beefsteak Tomato',
    wateringFrequency: '2-3 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '21-30 C (70-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Early blight', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Cracked fruits',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Support with stakes',
      'Water consistently',
      'Harvest when fully colored'
    ]
  },
  
 
  okra_green: {
    name: 'Okra (Green)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-34 C (72-93 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Powdery mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small pods',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest pods young',
      'Water at base',
      'Use mulch'
    ]
  },
  okra_red: {
    name: 'Okra (Red)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-34 C (72-93 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Powdery mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small pods',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest pods young',
      'Water at base',
      'Provide mulch'
    ]
  },
  bitter_gourd_long: {
    name: 'Bitter Gourd (Long)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis',
      'Harvest regularly',
      'Water evenly'
    ]
  },
  bitter_gourd_short: {
    name: 'Bitter Gourd (Short)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis',
      'Water evenly',
      'Harvest when firm'
    ]
  },
  squash_butternut: {
    name: 'Butternut Squash',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Vine borer'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor fruit set'
    },
    tips: [
      'Allow vines to spread',
      'Mulch to reduce weeds',
      'Harvest when rind hardens'
    ]
  },
  squash_kabocha: {
    name: 'Kabocha Squash',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Vine borer'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor fruit set'
    },
    tips: [
      'Provide space for vines',
      'Water at base',
      'Harvest when rind is hard'
    ]
  },
  squash_spaghetti: {
    name: 'Spaghetti Squash',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Vine borer'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor fruit set'
    },
    tips: [
      'Allow vines to spread',
      'Mulch to retain moisture',
      'Harvest when rind hardens'
    ]
  },
  cucumber_slicing: {
    name: 'Cucumber (Slicing)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '21-30 C (70-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Downy mildew'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Bitter fruits',
      sunlight_deficit: 'Poor yield'
    },
    tips: [
      'Trellis for airflow',
      'Harvest regularly',
      'Water consistently'
    ]
  },
  cucumber_pickling: {
    name: 'Cucumber (Pickling)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '21-30 C (70-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Powdery mildew', 'Downy mildew'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Bitter fruits',
      sunlight_deficit: 'Poor yield'
    },
    tips: [
      'Harvest when small',
      'Trellis for airflow',
      'Water consistently'
    ]
  },
  zucchini: {
    name: 'Zucchini',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Powdery mildew', 'Vine borer'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor fruit set'
    },
    tips: [
      'Harvest young fruits',
      'Water at base',
      'Provide space for vines'
    ]
  },
  patty_pan_squash: {
    name: 'Patty Pan Squash',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Powdery mildew', 'Vine borer'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor fruit set'
    },
    tips: [
      'Harvest young fruits',
      'Water consistently',
      'Provide mulch'
    ]
  },
  ridge_gourd: {
    name: 'Ridge Gourd',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis',
      'Harvest young fruits',
      'Water evenly'
    ]
  },
  snake_gourd: {
    name: 'Snake Gourd',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Use trellis for straight fruits',
      'Harvest young fruits',
      'Water consistently'
    ]
  },
  wax_gourd: {
    name: 'Wax Gourd',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Allow vines to spread',
      'Water at base',
      'Harvest when rind is firm'
    ]
  },
  hyacinth_bean: {
    name: 'Hyacinth Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Harvest pods young',
      'Water during flowering'
    ]
  },
  lablab_bean: {
    name: 'Lablab Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Use trellis support',
      'Harvest pods regularly',
      'Keep soil moderately moist'
    ]
  },
  sword_bean: {
    name: 'Sword Bean',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Harvest pods young',
      'Water during flowering'
    ]
  },
  cluster_bean: {
    name: 'Cluster Bean (Guar)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest pods young',
      'Avoid waterlogging',
      'Keep weeds controlled'
    ]
  },
  breadnut: {
    name: 'Breadnut (Kamansi)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Fruit rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Mulch to retain moisture',
      'Prune lightly',
      'Harvest when fruit is mature'
    ]
  },
  bignay: {
    name: 'Bignay',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune after harvest',
      'Mulch during dry season',
      'Harvest when berries are dark'
    ]
  },
  mulberry: {
    name: 'Mulberry',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune to control size',
      'Water during fruiting',
      'Harvest when berries are dark'
    ]
  },
  star_gooseberry: {
    name: 'Star Gooseberry',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune lightly',
      'Mulch to retain moisture',
      'Harvest when fruit is firm'
    ]
  },
  tamarillo: {
    name: 'Tamarillo',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun to partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide support against wind',
      'Mulch to retain moisture',
      'Prune after harvest'
    ]
  },
  atemoya: {
    name: 'Atemoya',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Anthracnose', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune for airflow',
      'Bag fruits to reduce pests',
      'Mulch to conserve moisture'
    ]
  },
  sweet_potato_orange: {
    name: 'Sweet Potato (Orange)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Weevil', 'Leaf spot'],
    symptoms: {
      overwatered: 'Root rot',
      underwatered: 'Small roots',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Use vine cuttings',
      'Keep soil loose',
      'Harvest after 3-4 months'
    ]
  },
  sweet_potato_white: {
    name: 'Sweet Potato (White)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Weevil', 'Leaf spot'],
    symptoms: {
      overwatered: 'Root rot',
      underwatered: 'Small roots',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Use vine cuttings',
      'Keep soil loose',
      'Harvest after 3-4 months'
    ]
  },
  basil_thai: {
    name: 'Thai Basil',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Root rot, yellow leaves',
      underwatered: 'Wilting',
      sunlight_deficit: 'Leggy growth'
    },
    tips: [
      'Pinch tips to bush out',
      'Harvest regularly',
      'Water at base'
    ]
  },
  basil_holy: {
    name: 'Holy Basil (Tulsi)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Wilting',
      sunlight_deficit: 'Leggy growth'
    },
    tips: [
      'Prune to encourage bushiness',
      'Harvest before flowering',
      'Keep soil moist'
    ]
  },
  fenugreek: {
    name: 'Fenugreek',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small leaves',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest young leaves',
      'Keep soil moist',
      'Sow every few weeks'
    ]
  },
  cumin: {
    name: 'Cumin',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor seed set',
      sunlight_deficit: 'Weak stems'
    },
    tips: [
      'Use well-drained soil',
      'Harvest seeds when dry',
      'Avoid overwatering'
    ]
  },
  fennel: {
    name: 'Fennel',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Thin stems',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Keep soil moist',
      'Harvest bulbs or seeds',
      'Provide good airflow'
    ]
  },
  anise: {
    name: 'Anise',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor seed set',
      sunlight_deficit: 'Weak stems'
    },
    tips: [
      'Harvest seeds when dry',
      'Use well-drained soil',
      'Avoid waterlogging'
    ]
  },
  garlic_chives: {
    name: 'Garlic Chives',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-27 C (59-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Thrips'],
    symptoms: {
      overwatered: 'Soft bases',
      underwatered: 'Dry tips',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Harvest regularly',
      'Divide clumps',
      'Keep soil moist'
    ]
  },
  galangal: {
    name: 'Galangal (Langkawas)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Rhizome rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose soil',
      'Mulch to retain moisture',
      'Harvest after 8-10 months'
    ]
  },
  white_pepper: {
    name: 'White Pepper',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Foot rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Provide sturdy support',
      'Avoid waterlogging',
      'Mulch to keep roots cool'
    ]
  },
  clove: {
    name: 'Clove',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun to full sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Keep soil moist',
      'Provide shade when young',
      'Harvest flower buds at right stage'
    ]
  },
  cinnamon: {
    name: 'Cinnamon',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun to full sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Mulch to retain moisture',
      'Prune lightly',
      'Harvest bark from mature stems'
    ]
  },
  nutmeg: {
    name: 'Nutmeg',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun to full sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Provide shade when young',
      'Mulch to retain moisture',
      'Harvest fruits when split'
    ]
  },
  vanilla: {
    name: 'Vanilla',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Stem rot'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Shriveled vines',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide sturdy support',
      'Use well-drained medium',
      'Hand pollinate flowers'
    ]
  },
  adlai: {
    name: "Adlai (Job's Tears)",
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Leaf blight', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves, weak tillers',
      underwatered: 'Poor grain fill',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Plant in well-drained soil',
      'Weed early',
      'Harvest when grains are hard'
    ]
  },
  rice_glutinous: {
    name: 'Glutinous Rice (Malagkit)',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: '6-8 hours full sun',
    temperature: '20-35 C (68-95 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Blast', 'Sheath blight'],
    symptoms: {
      overwatered: 'Yellowing leaves, weak tillers',
      underwatered: 'Leaf rolling, stunted growth',
      sunlight_deficit: 'Poor grain filling'
    },
    tips: [
      'Maintain shallow water during vegetative stage',
      'Apply balanced fertilizer',
      'Ensure proper spacing'
    ]
  },
  rice_red: {
    name: 'Red Rice',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: '6-8 hours full sun',
    temperature: '20-35 C (68-95 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Blast', 'Bacterial blight'],
    symptoms: {
      overwatered: 'Yellowing leaves, weak tillers',
      underwatered: 'Leaf rolling',
      sunlight_deficit: 'Low grain yield'
    },
    tips: [
      'Use clean seed stock',
      'Control weeds early',
      'Drain fields before harvest'
    ]
  },
  rice_black: {
    name: 'Black Rice',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: '6-8 hours full sun',
    temperature: '20-35 C (68-95 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Blast', 'Sheath blight'],
    symptoms: {
      overwatered: 'Yellowing leaves, weak tillers',
      underwatered: 'Leaf rolling',
      sunlight_deficit: 'Poor grain filling'
    },
    tips: [
      'Maintain shallow water during tillering',
      'Use balanced fertilizer',
      'Harvest when panicles mature'
    ]
  },
  rice_upland: {
    name: 'Upland Rice',
    wateringFrequency: '1-2 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '20-35 C (68-95 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Blast', 'Leaf blight'],
    symptoms: {
      overwatered: 'Yellow leaves, weak stems',
      underwatered: 'Leaf rolling, stunted growth',
      sunlight_deficit: 'Low grain yield'
    },
    tips: [
      'Use well-drained soil',
      'Mulch to retain moisture',
      'Weed regularly'
    ]
  },
  rice_brown: {
    name: 'Brown Rice',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: '6-8 hours full sun',
    temperature: '20-35 C (68-95 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Blast', 'Sheath blight'],
    symptoms: {
      overwatered: 'Yellow leaves, weak tillers',
      underwatered: 'Leaf rolling',
      sunlight_deficit: 'Poor grain filling'
    },
    tips: [
      'Maintain shallow water level',
      'Apply fertilizer at tillering',
      'Harvest when grains are hard'
    ]
  },
  corn_glutinous: {
    name: 'Glutinous Corn (Malagkit)',
    wateringFrequency: '1-2 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Rust', 'Leaf blight'],
    symptoms: {
      overwatered: 'Yellow leaves, weak roots',
      underwatered: 'Poor ear fill',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Plant in blocks for pollination',
      'Water during silking',
      'Harvest at milk stage'
    ]
  },
  corn_white: {
    name: 'White Corn',
    wateringFrequency: '1-2 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Rust', 'Leaf blight'],
    symptoms: {
      overwatered: 'Yellow leaves, weak roots',
      underwatered: 'Poor ear fill',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Plant in blocks',
      'Side-dress nitrogen',
      'Harvest when silks brown'
    ]
  },
  corn_yellow: {
    name: 'Yellow Corn',
    wateringFrequency: '1-2 times per week',
    sunlight: '6-8 hours full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Rust', 'Leaf blight'],
    symptoms: {
      overwatered: 'Yellow leaves, weak roots',
      underwatered: 'Poor ear fill',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Plant in blocks for pollination',
      'Water during tasseling',
      'Harvest when kernels are firm'
    ]
  },
  banana_tundan: {
    name: 'Banana (Tundan)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak pseudostem'
    },
    tips: [
      'Use disease-free planting materials',
      'Remove old leaves for airflow',
      'Provide wind protection'
    ]
  },
  banana_morado: {
    name: 'Banana (Morado)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak pseudostem'
    },
    tips: [
      'Keep soil evenly moist',
      'Mulch to retain moisture',
      'Support bunches during fruiting'
    ]
  },
  banana_pisang_awak: {
    name: 'Banana (Pisang Awak)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Remove excess suckers',
      'Provide wind protection',
      'Maintain good drainage'
    ]
  },
  banana_pisang_mas: {
    name: 'Banana (Pisang Mas)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak pseudostem'
    },
    tips: [
      'Use healthy planting materials',
      'Apply mulch regularly',
      'Remove old leaves'
    ]
  },
  banana_plantain: {
    name: 'Plantain Banana',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '24-30 C (75-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Panama disease', 'Black sigatoka'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small bunches',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Keep soil evenly moist',
      'Remove excess suckers',
      'Provide wind protection'
    ]
  },
  mango_carabao: {
    name: 'Mango (Carabao)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Anthracnose', 'Powdery mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruit set',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune after harvest',
      'Water during flowering',
      'Ensure good airflow'
    ]
  },
  mango_pico: {
    name: 'Mango (Pico)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Anthracnose', 'Powdery mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruit set',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune lightly after harvest',
      'Water during fruiting',
      'Maintain mulch layer'
    ]
  },
  mango_indian: {
    name: 'Mango (Indian)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Anthracnose', 'Powdery mildew'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruit set',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Water deeply during dry months',
      'Prune to open canopy',
      'Ensure good airflow'
    ]
  },
  pineapple_smooth_cayenne: {
    name: 'Pineapple (Smooth Cayenne)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '4.5-6.5',
    commonDiseases: ['Heart rot', 'Root rot'],
    symptoms: {
      overwatered: 'Soft core, wilting',
      underwatered: 'Slow growth, small fruit',
      sunlight_deficit: 'Poor fruit size'
    },
    tips: [
      'Plant in well-drained sandy soil',
      'Avoid water in the crown',
      'Fertilize lightly but regularly'
    ]
  },
  pineapple_queen: {
    name: 'Pineapple (Queen)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '4.5-6.5',
    commonDiseases: ['Heart rot', 'Root rot'],
    symptoms: {
      overwatered: 'Soft core, wilting',
      underwatered: 'Slow growth, small fruit',
      sunlight_deficit: 'Poor fruit size'
    },
    tips: [
      'Plant in well-drained soil',
      'Avoid water in the crown',
      'Mulch to retain moisture'
    ]
  },
  pineapple_red_spanish: {
    name: 'Pineapple (Red Spanish)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '4.5-6.5',
    commonDiseases: ['Heart rot', 'Root rot'],
    symptoms: {
      overwatered: 'Soft core, wilting',
      underwatered: 'Slow growth, small fruit',
      sunlight_deficit: 'Poor fruit size'
    },
    tips: [
      'Plant in well-drained soil',
      'Avoid water in the crown',
      'Harvest when fruit is aromatic'
    ]
  },
  papaya_red_lady: {
    name: 'Papaya (Red Lady)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Anthracnose', 'Phytophthora'],
    symptoms: {
      overwatered: 'Root rot, yellow leaves',
      underwatered: 'Leaf drop, small fruit',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Plant in well-drained soil',
      'Stake young plants',
      'Remove diseased fruits early'
    ]
  },
  papaya_solo: {
    name: 'Papaya (Solo)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Anthracnose', 'Phytophthora'],
    symptoms: {
      overwatered: 'Root rot, yellow leaves',
      underwatered: 'Leaf drop, small fruit',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Use well-drained soil',
      'Water consistently',
      'Remove diseased fruits'
    ]
  },
  aratiles: {
    name: 'Aratiles (Jamaican Cherry)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Fruit fly'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune lightly after harvest',
      'Mulch during dry months',
      'Harvest when fruits are red'
    ]
  },
  mabolo: {
    name: 'Mabolo (Velvet Apple)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Leaf spot', 'Fruit rot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune to open canopy',
      'Mulch to retain moisture',
      'Harvest when fruits soften'
    ]
  },
  sampinit: {
    name: 'Sampinit (Wild Raspberry)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Small berries',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Provide trellis support',
      'Mulch to retain moisture',
      'Harvest when berries are dark'
    ]
  },
  lanzones_longkong: {
    name: 'Lanzones (Longkong)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Partial to full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Sooty mold'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, poor fruiting',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Maintain moderate moisture',
      'Mulch to protect roots',
      'Prune lightly after harvest'
    ]
  },
  rambutan_rapiah: {
    name: 'Rambutan (Rapiah)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Fruit rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor fruit set',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Water during flowering and fruiting',
      'Provide mulch',
      'Prune for airflow'
    ]
  },
  durian_puyat: {
    name: 'Durian (Puyat)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Stem canker'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Plant in deep, well-drained soil',
      'Mulch heavily',
      'Avoid waterlogging'
    ]
  },
  durian_d24: {
    name: 'Durian (D24)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Stem canker'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop, fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Use deep, well-drained soil',
      'Mulch to conserve moisture',
      'Avoid waterlogging'
    ]
  },
  mangosteen_lambi: {
    name: 'Mangosteen (Lambi)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Partial to full sun',
    temperature: '24-32 C (75-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Slow growth',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Keep soil evenly moist',
      'Mulch to retain moisture',
      'Avoid strong winds'
    ]
  },
  pomelo_suha: {
    name: 'Pomelo (Suha)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Fertilize with citrus mix',
      'Prune to open canopy',
      'Control pests early'
    ]
  },
  pomelo_fancy: {
    name: 'Pomelo (Fancy)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Use citrus fertilizer',
      'Mulch to retain moisture',
      'Prune lightly after harvest'
    ]
  },
  calamansi_seedless: {
    name: 'Calamansi (Seedless)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Citrus canker', 'Greening'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf curl, fruit drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune lightly to shape',
      'Fertilize with citrus mix',
      'Control pests early'
    ]
  },
  avocado_hass: {
    name: 'Avocado (Hass)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '16-30 C (60-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Root rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Wilting, leaf drop',
      underwatered: 'Brown leaf tips',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Ensure good drainage',
      'Mulch to protect roots',
      'Avoid overwatering'
    ]
  },
  avocado_fuerte: {
    name: 'Avocado (Fuerte)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '16-30 C (60-86 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Root rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Wilting, leaf drop',
      underwatered: 'Brown leaf tips',
      sunlight_deficit: 'Poor fruiting'
    },
    tips: [
      'Use well-drained soil',
      'Mulch to conserve moisture',
      'Avoid waterlogging'
    ]
  },
  guava_pink: {
    name: 'Guava (Pink)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.0-7.0',
    commonDiseases: ['Fruit fly', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Fruit drop, leaf curl',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune to keep manageable size',
      'Bag fruits to prevent pests',
      'Fertilize regularly'
    ]
  },
  guava_white: {
    name: 'Guava (White)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.0-7.0',
    commonDiseases: ['Fruit fly', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Fruit drop, leaf curl',
      sunlight_deficit: 'Low fruiting'
    },
    tips: [
      'Prune to open canopy',
      'Bag fruits to prevent pests',
      'Fertilize regularly'
    ]
  },
  dragonfruit_red: {
    name: 'Dragon Fruit (Red)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Stem rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Shriveled stems',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide sturdy support posts',
      'Avoid water on stems',
      'Fertilize during flowering'
    ]
  },
  dragonfruit_white: {
    name: 'Dragon Fruit (White)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Stem rot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Shriveled stems',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Use sturdy support posts',
      'Avoid water on stems',
      'Fertilize during flowering'
    ]
  },
  passionfruit_purple: {
    name: 'Passionfruit (Purple)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Fusarium wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor fruit set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Prune to maintain airflow',
      'Water during flowering'
    ]
  },
  passionfruit_yellow: {
    name: 'Passionfruit (Yellow)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Fusarium wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor fruit set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Prune to maintain airflow',
      'Water during flowering'
    ]
  },
  cacao_trinitario: {
    name: 'Cacao (Trinitario)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Black pod', 'Vascular streak dieback'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low pod set'
    },
    tips: [
      'Provide shade for young trees',
      'Prune for airflow',
      'Remove diseased pods'
    ]
  },
  cacao_forestero: {
    name: 'Cacao (Forastero)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Black pod', 'Vascular streak dieback'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low pod set'
    },
    tips: [
      'Provide shade for young trees',
      'Prune for airflow',
      'Remove diseased pods'
    ]
  },
  coffee_arabica: {
    name: 'Coffee (Arabica)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf rust', 'Berry disease'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide shade in hot areas',
      'Prune to maintain shape',
      'Mulch to conserve moisture'
    ]
  },
  coffee_robusta: {
    name: 'Coffee (Robusta)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '20-30 C (68-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf rust', 'Berry disease'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Provide light shade in hot areas',
      'Prune to maintain shape',
      'Mulch to conserve moisture'
    ]
  },
  coconut_tall: {
    name: 'Coconut (Tall)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '25-32 C (77-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Bud rot', 'Root wilt'],
    symptoms: {
      overwatered: 'Yellow fronds, root stress',
      underwatered: 'Wilting, slow frond growth',
      sunlight_deficit: 'Poor nut set'
    },
    tips: [
      'Plant in well-drained soil',
      'Mulch to retain moisture',
      'Fertilize with potassium-rich mix'
    ]
  },
  coconut_dwarf: {
    name: 'Coconut (Dwarf)',
    wateringFrequency: 'Weekly for young trees',
    sunlight: 'Full sun',
    temperature: '25-32 C (77-90 F)',
    ph: '5.5-7.5',
    commonDiseases: ['Bud rot', 'Root wilt'],
    symptoms: {
      overwatered: 'Yellow fronds, root stress',
      underwatered: 'Wilting, slow frond growth',
      sunlight_deficit: 'Poor nut set'
    },
    tips: [
      'Plant in well-drained soil',
      'Mulch to retain moisture',
      'Fertilize with potassium-rich mix'
    ]
  },
  sugarcane_black: {
    name: 'Sugarcane (Black)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '21-32 C (70-90 F)',
    ph: '5.0-8.5',
    commonDiseases: ['Red rot', 'Smut'],
    symptoms: {
      overwatered: 'Yellowing, weak stalks',
      underwatered: 'Slow growth, thin canes',
      sunlight_deficit: 'Low sugar content'
    },
    tips: [
      'Use healthy setts for planting',
      'Control weeds early',
      'Hill up soil as canes grow'
    ]
  },
  sugarcane_green: {
    name: 'Sugarcane (Green)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '21-32 C (70-90 F)',
    ph: '5.0-8.5',
    commonDiseases: ['Red rot', 'Smut'],
    symptoms: {
      overwatered: 'Yellowing, weak stalks',
      underwatered: 'Slow growth, thin canes',
      sunlight_deficit: 'Low sugar content'
    },
    tips: [
      'Use healthy setts for planting',
      'Control weeds early',
      'Hill up soil as canes grow'
    ]
  },
  cassava_golden: {
    name: 'Cassava (Golden)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Mosaic virus', 'Root rot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Slow growth',
      sunlight_deficit: 'Low root yield'
    },
    tips: [
      'Plant cuttings in well-drained soil',
      'Weed regularly',
      'Harvest after 8-12 months'
    ]
  },
  sweet_potato_purple: {
    name: 'Sweet Potato (Purple)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Weevil', 'Leaf spot'],
    symptoms: {
      overwatered: 'Root rot, yellow leaves',
      underwatered: 'Small roots',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Use vine cuttings to plant',
      'Keep soil loose',
      'Harvest after 3-4 months'
    ]
  },
  taro_gabi_bali: {
    name: 'Taro (Gabi Bali)',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: 'Full sun to partial sun',
    temperature: '21-30 C (70-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf blight', 'Root rot'],
    symptoms: {
      overwatered: 'Soft corms, yellow leaves',
      underwatered: 'Small corms',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in moist soil',
      'Remove diseased leaves',
      'Harvest after 6-8 months'
    ]
  },
  ube_kinampay: {
    name: 'Ube (Kinampay)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Root rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Rotting tubers',
      underwatered: 'Small tubers',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Provide trellis for vines',
      'Use loose soil',
      'Harvest after vines die back'
    ]
  },
  ginger_young: {
    name: 'Ginger (Young)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Rhizome rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose, rich soil',
      'Mulch to keep soil moist',
      'Harvest after 5-7 months'
    ]
  },
  turmeric_madre: {
    name: 'Turmeric (Madre de Cacao)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Rhizome rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose soil',
      'Mulch to retain moisture',
      'Harvest after 8-10 months'
    ]
  },
  galangal_red: {
    name: 'Galangal (Red)',
    wateringFrequency: 'Weekly',
    sunlight: 'Partial sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Rhizome rot', 'Leaf spot'],
    symptoms: {
      overwatered: 'Soft rhizomes',
      underwatered: 'Small rhizomes',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Plant in loose soil',
      'Mulch to retain moisture',
      'Harvest after 8-10 months'
    ]
  },
  garlic_elephant: {
    name: 'Garlic (Elephant)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '13-24 C (55-75 F)',
    ph: '6.0-7.0',
    commonDiseases: ['White rot', 'Rust'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Plant in well-drained soil',
      'Reduce watering near harvest',
      'Harvest when tops yellow'
    ]
  },
  onion_red: {
    name: 'Onion (Red)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '13-27 C (55-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Purple blotch', 'Downy mildew'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Keep soil moist but not soggy',
      'Weed regularly',
      'Harvest when tops fall over'
    ]
  },
  onion_white: {
    name: 'Onion (White)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '13-27 C (55-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Purple blotch', 'Downy mildew'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Keep soil moist but not soggy',
      'Weed regularly',
      'Harvest when tops fall over'
    ]
  },
  shallot_red: {
    name: 'Shallot (Red)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '15-27 C (59-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Purple blotch', 'Downy mildew'],
    symptoms: {
      overwatered: 'Bulb rot',
      underwatered: 'Small bulbs',
      sunlight_deficit: 'Thin leaves'
    },
    tips: [
      'Use well-drained soil',
      'Water consistently',
      'Harvest when tops yellow'
    ]
  },
  spring_onion_japanese: {
    name: 'Spring Onion (Japanese)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '15-27 C (59-80 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Thrips'],
    symptoms: {
      overwatered: 'Soft bases',
      underwatered: 'Thin leaves',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest regularly to encourage growth',
      'Keep soil moist',
      'Use mulch'
    ]
  },
  jalapeno: {
    name: 'jalapeno',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Anthracnose', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Flower drop',
      sunlight_deficit: 'Low fruit set'
    },
    tips: [
      'Avoid wetting foliage',
      'Provide support if needed',
      'Harvest regularly'
    ]
  },
  
  bell_pepper_green: {
    name: 'Bell Pepper (Green)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Bacterial spot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Blossom drop',
      sunlight_deficit: 'Small fruits'
    },
    tips: [
      'Mulch to retain moisture',
      'Keep soil evenly moist',
      'Harvest when firm'
    ]
  },
  bell_pepper_red: {
    name: 'Bell Pepper (Red)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Bacterial spot', 'Anthracnose'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Blossom drop',
      sunlight_deficit: 'Small fruits'
    },
    tips: [
      'Mulch to retain moisture',
      'Keep soil evenly moist',
      'Harvest when fully colored'
    ]
  },
  
 
  okra_clemson: {
    name: 'Okra (Clemson Spineless)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-34 C (72-93 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Powdery mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small pods',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest pods young',
      'Water at base',
      'Use mulch'
    ]
  },
  okra_candle: {
    name: 'Okra (Candle)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-34 C (72-93 F)',
    ph: '5.8-7.0',
    commonDiseases: ['Powdery mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small pods',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Harvest pods young',
      'Water at base',
      'Provide mulch'
    ]
  },
  bitter_gourd_indian: {
    name: 'Bitter Gourd (Indian)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis',
      'Harvest regularly',
      'Water evenly'
    ]
  },
  bitter_gourd_chinese: {
    name: 'Bitter Gourd (Chinese)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis',
      'Water evenly',
      'Harvest when firm'
    ]
  },
  bottle_gourd_round: {
    name: 'Bottle Gourd (Round)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Train on trellis',
      'Harvest when young',
      'Water evenly'
    ]
  },
  sponge_gourd_turay: {
    name: 'Sponge Gourd (Turay)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Small fruits',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Use trellis for straight fruits',
      'Harvest young for eating',
      'Water consistently'
    ]
  },
  chayote_green: {
    name: 'Chayote (Green)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis support',
      'Harvest young',
      'Keep soil moist'
    ]
  },
  chayote_white: {
    name: 'Chayote (White)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-6.8',
    commonDiseases: ['Downy mildew', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small fruits, leaf wilt',
      sunlight_deficit: 'Poor flowering'
    },
    tips: [
      'Provide trellis support',
      'Harvest young',
      'Keep soil moist'
    ]
  },
  winged_bean_green: {
    name: 'Winged Bean (Green)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-30 C (72-86 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis',
      'Harvest pods young',
      'Water consistently'
    ]
  },
  yardlong_bean_green: {
    name: 'Yardlong Bean (Green)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Mosaic virus'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Short pods, leaf wilt',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Use trellis or poles',
      'Pick pods regularly',
      'Mulch to retain moisture'
    ]
  },
  mung_bean_green: {
    name: 'Mung Bean (Green)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Plant in well-drained soil',
      'Avoid waterlogging',
      'Harvest when pods are dry'
    ]
  },
  peanut_spanish: {
    name: 'Peanut (Spanish)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small pods',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Hill soil around plants',
      'Water during flowering',
      'Harvest when leaves yellow'
    ]
  },
  peanut_valencia: {
    name: 'Peanut (Valencia)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.5',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves, root rot',
      underwatered: 'Small pods',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Hill soil around plants',
      'Water during flowering',
      'Harvest when leaves yellow'
    ]
  },
  soybean_edamame: {
    name: 'Soybean (Edamame)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '20-30 C (68-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Small pods',
      sunlight_deficit: 'Low yield'
    },
    tips: [
      'Inoculate seeds if possible',
      'Avoid waterlogging',
      'Harvest when pods are plump'
    ]
  },
  cowpea_blackeye: {
    name: 'Cowpea (Black-eyed)',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Aphids', 'Mosaic virus'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Provide support for climbing types',
      'Harvest pods regularly',
      'Keep soil moderately moist'
    ]
  },
  pigeon_pea_red: {
    name: 'Pigeon Pea (Red)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '20-32 C (68-90 F)',
    ph: '5.5-7.0',
    commonDiseases: ['Wilt', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves, root stress',
      underwatered: 'Leaf drop',
      sunlight_deficit: 'Low flowering'
    },
    tips: [
      'Prune lightly to encourage branching',
      'Water during flowering',
      'Harvest pods when green'
    ]
  },
  lablab_bataw: {
    name: 'Lablab (Bataw)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Use trellis support',
      'Harvest pods regularly',
      'Keep soil moderately moist'
    ]
  },
  hyacinth_bean_purple: {
    name: 'Hyacinth Bean (Purple)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '5.5-6.8',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak vines'
    },
    tips: [
      'Provide trellis support',
      'Harvest pods young',
      'Water during flowering'
    ]
  },
  cluster_bean_green: {
    name: 'Cluster Bean (Green)',
    wateringFrequency: 'Weekly',
    sunlight: 'Full sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.5',
    commonDiseases: ['Leaf spot', 'Rust'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod set',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest pods young',
      'Avoid waterlogging',
      'Keep weeds controlled'
    ]
  },
  green_bean: {
    name: 'Green Bean',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Provide support for climbing types',
      'Water during flowering',
      'Harvest pods regularly'
    ]
  },
  snap_bean: {
    name: 'Snap Bean',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest pods young',
      'Avoid waterlogging',
      'Mulch to retain moisture'
    ]
  },
  bush_bean: {
    name: 'Bush Bean',
    wateringFrequency: '1-2 times per week',
    sunlight: 'Full sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Rust', 'Leaf spot'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Poor pod fill',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Plant with proper spacing',
      'Water during flowering',
      'Harvest pods regularly'
    ]
  },
  kulantro: {
    name: 'Kulantro (Sawtooth Coriander)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Partial sun',
    temperature: '18-30 C (64-86 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Yellow leaves',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Slow growth'
    },
    tips: [
      'Keep soil moist',
      'Harvest outer leaves first',
      'Provide light shade in heat'
    ]
  },
  kinchay: {
    name: 'Kinchay (Chinese Celery)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Root rot'],
    symptoms: {
      overwatered: 'Soft stalks',
      underwatered: 'Stringy stalks',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Keep soil evenly moist',
      'Use compost-rich soil',
      'Harvest outer stalks first'
    ]
  },
  watercress: {
    name: 'Watercress',
    wateringFrequency: 'Keep soil consistently moist',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.5-7.5',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Grow in consistently moist soil',
      'Harvest tender shoots',
      'Provide light shade in heat'
    ]
  },
  pechay_baguio: {
    name: 'Pechay (Baguio)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Harvest at 30-35 days',
      'Water consistently',
      'Keep pests under control'
    ]
  },
  pechay_tagalog: {
    name: 'Pechay (Tagalog)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Small heads'
    },
    tips: [
      'Harvest at 25-30 days',
      'Water consistently',
      'Keep pests under control'
    ]
  },
  lettuce_red_leaf: {
    name: 'Lettuce (Red Leaf)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak heads'
    },
    tips: [
      'Water early morning',
      'Harvest young leaves',
      'Provide shade in hot months'
    ]
  },
  lettuce_green_leaf: {
    name: 'Lettuce (Green Leaf)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak heads'
    },
    tips: [
      'Water early morning',
      'Harvest young leaves',
      'Provide shade in hot months'
    ]
  },
  mustard_spinach: {
    name: 'Mustard Spinach (Komatsuna)',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '15-25 C (59-77 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Downy mildew', 'Aphids'],
    symptoms: {
      overwatered: 'Soft rot',
      underwatered: 'Bitter leaves',
      sunlight_deficit: 'Weak growth'
    },
    tips: [
      'Harvest young leaves',
      'Water consistently',
      'Use insect netting if needed'
    ]
  },
  chinese_celery: {
    name: 'Chinese Celery',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '18-28 C (64-82 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf blight', 'Root rot'],
    symptoms: {
      overwatered: 'Soft stalks',
      underwatered: 'Stringy stalks',
      sunlight_deficit: 'Thin stalks'
    },
    tips: [
      'Keep soil evenly moist',
      'Use compost-rich soil',
      'Harvest outer stalks first'
    ]
  },
  upland_kangkong: {
    name: 'Upland Kangkong',
    wateringFrequency: '2-3 times per week',
    sunlight: 'Full sun to partial sun',
    temperature: '22-32 C (72-90 F)',
    ph: '6.0-7.0',
    commonDiseases: ['Leaf spot', 'Aphids'],
    symptoms: {
      overwatered: 'Soft stems',
      underwatered: 'Leaf wilt',
      sunlight_deficit: 'Thin stems'
    },
    tips: [
      'Harvest tips regularly',
      'Keep soil moist',
      'Replant from cuttings'
    ]
  }
};

const ornamentalTemplate = {
  wateringFrequency: '1-2 times per week',
  sunlight: 'Bright indirect light',
  temperature: '20-30 C (68-86 F)',
  ph: '6.0-7.0',
  commonDiseases: ['Root rot', 'Leaf spot', 'Mealybugs'],
  symptoms: {
    overwatered: 'Yellow leaves, soft stems',
    underwatered: 'Dry edges, drooping',
    sunlight_deficit: 'Leggy growth, pale leaves'
  },
  tips: [
    'Use well-draining potting mix',
    'Allow top soil to dry slightly',
    'Keep away from harsh afternoon sun'
  ]
};

const flowerTemplate = {
  wateringFrequency: '2-3 times per week',
  sunlight: 'Full sun to partial sun',
  temperature: '20-32 C (68-90 F)',
  ph: '5.5-6.8',
  commonDiseases: ['Powdery mildew', 'Leaf spot', 'Aphids'],
  symptoms: {
    overwatered: 'Yellow leaves, bud drop',
    underwatered: 'Wilting, small blooms',
    sunlight_deficit: 'Few flowers, weak stems'
  },
  tips: [
    'Water at the base, not foliage',
    'Remove spent blooms regularly',
    'Fertilize during flowering'
  ]
};

const ornamentalPlants = [
  { id: 'orn_aglaonema_green', name: 'Aglaonema (Chinese Evergreen)', aliases: ['aglaonema', 'chinese evergreen', 'aglaonema green'] },
  { id: 'orn_aglaonema_red_siam', name: 'Aglaonema (Red Siam)', aliases: ['aglaonema red', 'red siam', 'aglaonema siam'] },
  { id: 'orn_aglaonema_silver_bay', name: 'Aglaonema (Silver Bay)', aliases: ['aglaonema silver bay', 'silver bay', 'aglaonema silver'] },
  { id: 'orn_aglaonema_lady_valentine', name: 'Aglaonema (Lady Valentine)', aliases: ['lady valentine', 'aglaonema valentine'] },
  { id: 'orn_alocasia_polly', name: 'Alocasia (Polly)', aliases: ['alocasia polly', 'african mask', 'alocasia'] },
  { id: 'orn_alocasia_amazonica', name: 'Alocasia (Amazonica)', aliases: ['alocasia amazonica', 'amazonica', 'elephant ear'] },
  { id: 'orn_alocasia_zebrina', name: 'Alocasia (Zebrina)', aliases: ['alocasia zebrina', 'zebra alocasia'] },
  { id: 'orn_alocasia_stingray', name: 'Alocasia (Stingray)', aliases: ['alocasia stingray', 'stingray alocasia'] },
  { id: 'orn_alocasia_macrorrhiza', name: 'Alocasia (Giant Taro)', aliases: ['giant taro', 'alocasia macrorrhiza'] },
  { id: 'orn_anthurium_clarinervium', name: 'Anthurium Clarinervium', aliases: ['anthurium clarinervium', 'velvet anthurium'] },
  { id: 'orn_anthurium_crystallinum', name: 'Anthurium Crystallinum', aliases: ['anthurium crystallinum', 'crystal anthurium'] },
  { id: 'orn_areca_palm', name: 'Areca Palm', aliases: ['areca palm', 'butterfly palm', 'palmera'] },
  { id: 'orn_bamboo_palm', name: 'Bamboo Palm', aliases: ['bamboo palm', 'chamaedorea seifrizii'] },
  { id: 'orn_kentia_palm', name: 'Kentia Palm', aliases: ['kentia palm', 'howea'] },
  { id: 'orn_lady_palm', name: 'Lady Palm', aliases: ['lady palm', 'rapis'] },
  { id: 'orn_parlor_palm', name: 'Parlor Palm', aliases: ['parlor palm', 'chamaedorea elegans'] },
  { id: 'orn_fishtail_palm', name: 'Fishtail Palm', aliases: ['fishtail palm', 'caryota'] },
  { id: 'orn_pony_tail_palm', name: 'Ponytail Palm', aliases: ['ponytail palm', 'elephant foot'] },
  { id: 'orn_sago_palm', name: 'Sago Palm', aliases: ['sago palm', 'cycad'] },
  { id: 'orn_bird_of_paradise_white', name: 'Bird of Paradise (White)', aliases: ['white bird of paradise', 'strelitzia nicolai'] },
  { id: 'orn_boston_fern', name: 'Boston Fern', aliases: ['boston fern', 'sword fern'] },
  { id: 'orn_bird_nest_fern', name: 'Bird’s Nest Fern', aliases: ['birds nest fern', 'asplenium nidus'] },
  { id: 'orn_maidenhair_fern', name: 'Maidenhair Fern', aliases: ['maidenhair fern', 'adiantum'] },
  { id: 'orn_staghorn_fern', name: 'Staghorn Fern', aliases: ['staghorn fern', 'platycerium'] },
  { id: 'orn_asparagus_fern', name: 'Asparagus Fern', aliases: ['asparagus fern', 'foxtail fern'] },
  { id: 'orn_calathea_makoyana', name: 'Calathea Makoyana', aliases: ['calathea makoyana', 'peacock plant'] },
  { id: 'orn_calathea_orbifolia', name: 'Calathea Orbifolia', aliases: ['calathea orbifolia', 'orbifolia'] },
  { id: 'orn_calathea_rattlesnake', name: 'Calathea Rattlesnake', aliases: ['rattlesnake plant', 'calathea lancifolia'] },
  { id: 'orn_calathea_freddie', name: 'Calathea Freddie', aliases: ['calathea freddie', 'goeppertia concinna'] },
  { id: 'orn_calathea_medallion', name: 'Calathea Medallion', aliases: ['calathea medallion', 'medallion plant'] },
  { id: 'orn_calathea_white_fusion', name: 'Calathea White Fusion', aliases: ['white fusion', 'calathea white'] },
  { id: 'orn_maranta_prayer', name: 'Prayer Plant', aliases: ['prayer plant', 'maranta'] },
  { id: 'orn_stromanthe_triostar', name: 'Stromanthe Triostar', aliases: ['stromanthe triostar', 'triostar'] },
  { id: 'orn_coleus', name: 'Coleus', aliases: ['coleus', 'mayana'] },
  { id: 'orn_cordyline_red', name: 'Cordyline (Red)', aliases: ['cordyline red', 'ti plant', 'ti'] },
  { id: 'orn_croton_petra', name: 'Croton (Petra)', aliases: ['croton', 'croton petra'] },
  { id: 'orn_dracaena_marginata', name: 'Dracaena Marginata', aliases: ['dracaena marginata', 'dragon tree'] },
  { id: 'orn_dracaena_fragrans', name: 'Dracaena Fragrans', aliases: ['corn plant', 'dracaena fragrans'] },
  { id: 'orn_dracaena_song_of_india', name: 'Dracaena Song of India', aliases: ['song of india', 'dracaena reflexa'] },
  { id: 'orn_dracaena_compacta', name: 'Dracaena Compacta', aliases: ['dracaena compacta', 'janet craig compacta'] },
  { id: 'orn_dracaena_lemons', name: 'Dracaena Lemon Lime', aliases: ['dracaena lemon lime', 'lemon lime'] },
  { id: 'orn_dracaena_janet', name: 'Dracaena Janet Craig', aliases: ['janet craig', 'dracaena janet'] },
  { id: 'orn_rubber_plant', name: 'Rubber Plant', aliases: ['rubber plant', 'ficus elastica'] },
  { id: 'orn_rubber_tineke', name: 'Rubber Plant (Tineke)', aliases: ['rubber tineke', 'ficus tineke'] },
  { id: 'orn_fiddle_leaf_fig', name: 'Fiddle Leaf Fig', aliases: ['fiddle leaf fig', 'ficus lyrata'] },
  { id: 'orn_weeping_fig', name: 'Weeping Fig', aliases: ['weeping fig', 'ficus benjamina'] },
  { id: 'orn_zz_plant', name: 'ZZ Plant', aliases: ['zz plant', 'zamioculcas'] },
  { id: 'orn_snake_plant_laurentii', name: 'Snake Plant (Laurentii)', aliases: ['snake plant', 'sansevieria', 'espada'] },
  { id: 'orn_snake_plant_cylindrica', name: 'Snake Plant (Cylindrica)', aliases: ['cylindrica', 'sansevieria cylindrica'] },
  { id: 'orn_philodendron_heartleaf', name: 'Philodendron Heartleaf', aliases: ['heartleaf philodendron', 'philodendron hederaceum'] },
  { id: 'orn_philodendron_micans', name: 'Philodendron Micans', aliases: ['philodendron micans', 'velvet philodendron'] },
  { id: 'orn_philodendron_selloum', name: 'Philodendron Selloum', aliases: ['philodendron selloum', 'tree philodendron'] },
  { id: 'orn_philodendron_birkin', name: 'Philodendron Birkin', aliases: ['philodendron birkin', 'birkin'] },
  { id: 'orn_philodendron_rojo', name: 'Philodendron Rojo Congo', aliases: ['rojo congo', 'philodendron rojo'] },
  { id: 'orn_philodendron_xanadu', name: 'Philodendron Xanadu', aliases: ['philodendron xanadu', 'xanadu'] },
  { id: 'orn_philodendron_gloriosum', name: 'Philodendron Gloriosum', aliases: ['philodendron gloriosum', 'gloriosum'] },
  { id: 'orn_monstera_adansonii', name: 'Monstera Adansonii', aliases: ['monstera adansonii', 'swiss cheese vine'] },
  { id: 'orn_pothos_golden', name: 'Pothos (Golden)', aliases: ['golden pothos', 'devils ivy'] },
  { id: 'orn_pothos_marble', name: 'Pothos (Marble Queen)', aliases: ['marble queen pothos', 'pothos marble'] },
  { id: 'orn_pothos_neon', name: 'Pothos (Neon)', aliases: ['neon pothos', 'pothos neon'] },
  { id: 'orn_scindapsus_pictus', name: 'Scindapsus Pictus', aliases: ['scindapsus pictus', 'satin pothos'] },
  { id: 'orn_peperomia_obtusifolia', name: 'Peperomia Obtusifolia', aliases: ['baby rubber plant', 'peperomia obtusifolia'] },
  { id: 'orn_peperomia_watermelon', name: 'Peperomia Watermelon', aliases: ['watermelon peperomia', 'peperomia argyreia'] },
  { id: 'orn_peperomia_ripple', name: 'Peperomia Ripple', aliases: ['peperomia ripple', 'peperomia caperata'] },
  { id: 'orn_pilea_peperomioides', name: 'Pilea Peperomioides', aliases: ['chinese money plant', 'pilea'] },
  { id: 'orn_spider_plant', name: 'Spider Plant', aliases: ['spider plant', 'chlorophytum'] },
  { id: 'orn_tradescantia_zebrina', name: 'Tradescantia Zebrina', aliases: ['wandering jew', 'tradescantia zebrina'] },
  { id: 'orn_tradescantia_pallida', name: 'Tradescantia Pallida', aliases: ['purple heart', 'tradescantia pallida'] },
  { id: 'orn_fittonia', name: 'Fittonia', aliases: ['nerve plant', 'fittonia'] },
  { id: 'orn_polka_dot_plant', name: 'Polka Dot Plant', aliases: ['polka dot plant', 'hypoestes'] },
  { id: 'orn_hoya_carnosa', name: 'Hoya Carnosa', aliases: ['hoya carnosa', 'wax plant'] },
  { id: 'orn_hoya_kerrii', name: 'Hoya Kerrii', aliases: ['hoya kerrii', 'sweetheart hoya'] },
  { id: 'orn_jade_plant', name: 'Jade Plant', aliases: ['jade plant', 'crassula ovata'] },
  { id: 'orn_aloe_vera', name: 'Aloe Vera', aliases: ['aloe vera', 'sabila'] },
  { id: 'orn_aloe_tiger', name: 'Aloe (Tiger)', aliases: ['tiger aloe', 'aloe variegata'] },
  { id: 'orn_haworthia_zebra', name: 'Haworthia Zebra', aliases: ['zebra haworthia', 'haworthia'] },
  { id: 'orn_echeveria_elegans', name: 'Echeveria', aliases: ['echeveria', 'hen and chicks'] },
  { id: 'orn_sedum_burrito', name: 'Sedum Burrito', aliases: ['burro tail', 'sedum burrito'] },
  { id: 'orn_cactus_bunny_ears', name: 'Cactus (Bunny Ears)', aliases: ['bunny ears cactus', 'opuntia'] },
  { id: 'orn_cactus_golden_barrel', name: 'Cactus (Golden Barrel)', aliases: ['golden barrel cactus', 'echinocactus'] },
  { id: 'orn_cactus_moon', name: 'Cactus (Moon)', aliases: ['moon cactus', 'gymnocalycium'] },
  { id: 'orn_money_tree', name: 'Money Tree', aliases: ['money tree', 'pachira'] },
  { id: 'orn_umbrella_plant', name: 'Umbrella Plant', aliases: ['umbrella plant', 'schefflera'] },
  { id: 'orn_cast_iron_plant', name: 'Cast Iron Plant', aliases: ['cast iron plant', 'aspidistra'] },
  { id: 'orn_lucky_bamboo', name: 'Lucky Bamboo', aliases: ['lucky bamboo', 'dracaena sanderiana'] },
  { id: 'orn_syngonium_white', name: 'Syngonium (White Butterfly)', aliases: ['syngonium', 'arrowhead plant'] },
  { id: 'orn_syngonium_pink', name: 'Syngonium (Pink)', aliases: ['syngonium pink', 'pink arrowhead'] },
  { id: 'orn_syngonium_neon', name: 'Syngonium (Neon)', aliases: ['syngonium neon', 'neon arrowhead'] },
  { id: 'orn_dieffenbachia', name: 'Dieffenbachia', aliases: ['dieffenbachia', 'dumb cane'] },
  { id: 'orn_begonia_rex', name: 'Begonia Rex', aliases: ['begonia rex', 'rex begonia'] },
  { id: 'orn_begonia_maculata', name: 'Begonia Maculata', aliases: ['begonia maculata', 'polka dot begonia'] },
  { id: 'orn_caladium_red', name: 'Caladium (Red)', aliases: ['caladium red', 'angel wings'] },
  { id: 'orn_caladium_white', name: 'Caladium (White)', aliases: ['caladium white', 'angel wings'] },
  { id: 'orn_colocasia_black', name: 'Colocasia (Black)', aliases: ['black taro', 'colocasia black'] },
  { id: 'orn_xanthosoma_lime', name: 'Xanthosoma (Lime)', aliases: ['xanthosoma', 'elephant ear lime'] },
  { id: 'orn_oxalis_purple', name: 'Oxalis (Purple Shamrock)', aliases: ['purple shamrock', 'oxalis'] },
  { id: 'orn_bromeliad_guzmania', name: 'Bromeliad (Guzmania)', aliases: ['guzmania', 'bromeliad'] },
  { id: 'orn_bromeliad_aechmea', name: 'Bromeliad (Aechmea)', aliases: ['aechmea', 'bromeliad aechmea'] },
  { id: 'orn_bromeliad_neoregelia', name: 'Bromeliad (Neoregelia)', aliases: ['neoregelia', 'bromeliad neoregelia'] },
  { id: 'orn_tillandsia', name: 'Tillandsia (Air Plant)', aliases: ['air plant', 'tillandsia'] }
];

const flowerPlants = [
  { id: 'flw_rose', name: 'Rose', aliases: ['rose', 'rosal'] },
  { id: 'flw_rose_damask', name: 'Rose (Damask)', aliases: ['damask rose', 'rosa damascena'] },
  { id: 'flw_rose_mini', name: 'Rose (Miniature)', aliases: ['mini rose', 'miniature rose'] },
  { id: 'flw_hibiscus', name: 'Hibiscus (Gumamela)', aliases: ['hibiscus', 'gumamela'] },
  { id: 'flw_hibiscus_double', name: 'Hibiscus (Double)', aliases: ['double hibiscus', 'gumamela double'] },
  { id: 'flw_sampaguita', name: 'Sampaguita (Jasmine Sambac)', aliases: ['sampaguita', 'jasmine sambac'] },
  { id: 'flw_bougainvillea', name: 'Bougainvillea', aliases: ['bougainvillea', 'bugambilia'] },
  { id: 'flw_bougainvillea_pink', name: 'Bougainvillea (Pink)', aliases: ['bougainvillea pink', 'pink bougainvillea'] },
  { id: 'flw_bougainvillea_white', name: 'Bougainvillea (White)', aliases: ['bougainvillea white', 'white bougainvillea'] },
  { id: 'flw_bougainvillea_orange', name: 'Bougainvillea (Orange)', aliases: ['bougainvillea orange', 'orange bougainvillea'] },
  { id: 'flw_santan', name: 'Santan (Ixora)', aliases: ['santan', 'ixora'] },
  { id: 'flw_santan_dwarf', name: 'Santan (Dwarf)', aliases: ['dwarf santan', 'ixora dwarf'] },
  { id: 'flw_ylang_ylang', name: 'Ilang-ilang (Ylang-ylang)', aliases: ['ilang ilang', 'ylang ylang'] },
  { id: 'flw_dama_de_noche', name: 'Dama de Noche', aliases: ['dama de noche', 'night-blooming jasmine'] },
  { id: 'flw_kalachuchi', name: 'Kalachuchi (Plumeria)', aliases: ['kalachuchi', 'plumeria'] },
  { id: 'flw_anthurium', name: 'Anthurium (Flamingo Flower)', aliases: ['anthurium flower', 'flamingo flower'] },
  { id: 'flw_orchid_phalaenopsis', name: 'Orchid (Phalaenopsis)', aliases: ['phalaenopsis', 'moth orchid'] },
  { id: 'flw_orchid_dendrobium', name: 'Orchid (Dendrobium)', aliases: ['dendrobium', 'dendrobium orchid'] },
  { id: 'flw_orchid_vanda', name: 'Orchid (Vanda)', aliases: ['vanda', 'vanda orchid'] },
  { id: 'flw_orchid_cattleya', name: 'Orchid (Cattleya)', aliases: ['cattleya', 'cattleya orchid'] },
  { id: 'flw_orchid_oncidium', name: 'Orchid (Oncidium)', aliases: ['oncidium', 'dancing lady orchid'] },
  { id: 'flw_orchid_mokara', name: 'Orchid (Mokara)', aliases: ['mokara', 'mokara orchid'] },
  { id: 'flw_waling_waling', name: 'Waling-waling', aliases: ['waling waling', 'vanda sanderiana'] },
  { id: 'flw_chrysanthemum', name: 'Chrysanthemum', aliases: ['chrysanthemum', 'mums'] },
  { id: 'flw_marigold_african', name: 'Marigold (African)', aliases: ['african marigold', 'marigold'] },
  { id: 'flw_marigold_french', name: 'Marigold (French)', aliases: ['french marigold', 'marigold'] },
  { id: 'flw_zinnia', name: 'Zinnia', aliases: ['zinnia', 'zinnia flower'] },
  { id: 'flw_sunflower', name: 'Sunflower', aliases: ['sunflower', 'helianthus'] },
  { id: 'flw_sunflower_dwarf', name: 'Sunflower (Dwarf)', aliases: ['dwarf sunflower', 'sunflower dwarf'] },
  { id: 'flw_cosmos', name: 'Cosmos', aliases: ['cosmos', 'cosmos flower'] },
  { id: 'flw_gladiolus', name: 'Gladiolus', aliases: ['gladiolus', 'glads'] },
  { id: 'flw_gerbera', name: 'Gerbera Daisy', aliases: ['gerbera', 'gerbera daisy'] },
  { id: 'flw_shasta_daisy', name: 'Daisy (Shasta)', aliases: ['shasta daisy', 'daisy'] },
  { id: 'flw_dahlia', name: 'Dahlia', aliases: ['dahlia', 'dahlia flower'] },
  { id: 'flw_canna_lily', name: 'Canna Lily', aliases: ['canna lily', 'canna'] },
  { id: 'flw_calla_lily', name: 'Calla Lily', aliases: ['calla lily', 'zantedeschia'] },
  { id: 'flw_lily_asiatic', name: 'Lily (Asiatic)', aliases: ['asiatic lily', 'lily'] },
  { id: 'flw_lily_oriental', name: 'Lily (Oriental)', aliases: ['oriental lily', 'lily'] },
  { id: 'flw_tuberose', name: 'Tuberose (Tuberosa)', aliases: ['tuberose', 'tuberosa'] },
  { id: 'flw_gardenia', name: 'Gardenia', aliases: ['gardenia', 'rosas de noche'] },
  { id: 'flw_azalea', name: 'Azalea', aliases: ['azalea', 'azalea flower'] },
  { id: 'flw_hydrangea', name: 'Hydrangea', aliases: ['hydrangea', 'hortensia'] },
  { id: 'flw_camellia', name: 'Camellia', aliases: ['camellia', 'camellia flower'] },
  { id: 'flw_petunia', name: 'Petunia', aliases: ['petunia', 'petunia flower'] },
  { id: 'flw_petunia_wave', name: 'Petunia (Wave)', aliases: ['wave petunia', 'petunia wave'] },
  { id: 'flw_impatiens', name: 'Impatiens', aliases: ['impatiens', 'busy lizzie'] },
  { id: 'flw_vinca', name: 'Vinca (Catharanthus)', aliases: ['vinca', 'periwinkle'] },
  { id: 'flw_lantana', name: 'Lantana', aliases: ['lantana', 'santan-lantana'] },
  { id: 'flw_portulaca', name: 'Portulaca (Moss Rose)', aliases: ['portulaca', 'moss rose'] },
  { id: 'flw_snapdragon', name: 'Snapdragon', aliases: ['snapdragon', 'antirrhinum'] },
  { id: 'flw_poinsettia', name: 'Poinsettia', aliases: ['poinsettia', 'painted leaf'] },
  { id: 'flw_begonia_wax', name: 'Begonia (Wax)', aliases: ['wax begonia', 'begonia'] },
  { id: 'flw_kalanchoe', name: 'Kalanchoe', aliases: ['kalanchoe', 'flaming katy'] },
  { id: 'flw_morning_glory', name: 'Morning Glory', aliases: ['morning glory', 'campanilla'] },
  { id: 'flw_allamanda', name: 'Allamanda (Golden Trumpet)', aliases: ['allamanda', 'golden trumpet'] },
  { id: 'flw_angel_trumpet', name: 'Angel’s Trumpet', aliases: ['angels trumpet', 'brugmansia'] },
  { id: 'flw_queen_of_night', name: 'Queen of the Night', aliases: ['queen of the night', 'epiphyllum'] },
  { id: 'flw_heliconia', name: 'Heliconia', aliases: ['heliconia', 'lobster claw'] },
  { id: 'flw_torch_ginger', name: 'Torch Ginger', aliases: ['torch ginger', 'etlingera'] },
  { id: 'flw_red_ginger', name: 'Red Ginger', aliases: ['red ginger', 'alpinia'] },
  { id: 'flw_ginger_lily', name: 'Ginger Lily', aliases: ['ginger lily', 'hedychium'] },
  { id: 'flw_lotus', name: 'Lotus', aliases: ['lotus', 'sacred lotus'] },
  { id: 'flw_water_lily', name: 'Water Lily', aliases: ['water lily', 'nymphaea'] },
  { id: 'flw_bird_of_paradise', name: 'Bird of Paradise (Orange)', aliases: ['bird of paradise', 'strelitzia reginae'] },
  { id: 'flw_duranta', name: 'Duranta (Golden Dewdrop)', aliases: ['duranta', 'golden dewdrop'] },
  { id: 'flw_butterfly_pea', name: 'Butterfly Pea', aliases: ['butterfly pea', 'blue ternate'] },
  { id: 'flw_rangoon_creeper', name: 'Rangoon Creeper', aliases: ['rangoon creeper', 'niyog-niyogan'] },
  { id: 'flw_mussaenda', name: 'Mussaenda', aliases: ['mussaenda', 'dona'] },
  { id: 'flw_golden_penda', name: 'Golden Penda', aliases: ['golden penda', 'xanthostemon'] },
  { id: 'flw_banaba', name: 'Banaba', aliases: ['banaba', 'lagerstroemia'] },
  { id: 'flw_plumbago', name: 'Plumbago', aliases: ['plumbago', 'blue plumbago'] },
  { id: 'flw_rain_lily_pink', name: 'Rain Lily (Pink)', aliases: ['pink rain lily', 'zephyranthes'] },
  { id: 'flw_rain_lily_white', name: 'Rain Lily (White)', aliases: ['white rain lily', 'zephyranthes white'] },
  { id: 'flw_yellow_bells', name: 'Yellow Bells', aliases: ['yellow bells', 'tecoma stans'] },
  { id: 'flw_firecracker', name: 'Firecracker Flower', aliases: ['firecracker plant', 'russelia'] },
  { id: 'flw_bottlebrush', name: 'Bottlebrush', aliases: ['bottlebrush', 'callistemon'] },
  { id: 'flw_champaca', name: 'Champaca', aliases: ['champaca', 'tsampaka'] },
  { id: 'flw_sampaguita_double', name: 'Sampaguita (Double)', aliases: ['sampaguita double', 'double jasmine'] },
  { id: 'flw_orchid_philippine', name: 'Philippine Orchid', aliases: ['philippine orchid', 'waling-waling orchid'] },
  { id: 'flw_crown_of_thorns', name: 'Crown of Thorns', aliases: ['crown of thorns', 'christ plant'] },
  { id: 'flw_butterfly_bush', name: 'Butterfly Bush', aliases: ['butterfly bush', 'buddleja'] },
  { id: 'flw_fuchsia', name: 'Fuchsia', aliases: ['fuchsia', 'fuchsia flower'] },
  { id: 'flw_honeysuckle', name: 'Honeysuckle', aliases: ['honeysuckle', 'lonicera'] },
  { id: 'flw_jasmine_malabar', name: 'Malabar Jasmine', aliases: ['malabar jasmine', 'sampaguita vine'] },
  { id: 'flw_lily_of_valley', name: 'Lily of the Valley', aliases: ['lily of the valley', 'convallaria'] },
  { id: 'flw_tulip', name: 'Tulip', aliases: ['tulip', 'tulip flower'] },
  { id: 'flw_freesia', name: 'Freesia', aliases: ['freesia', 'freesia flower'] },
  { id: 'flw_carnation', name: 'Carnation', aliases: ['carnation', 'dianthus'] },
  { id: 'flw_geranium', name: 'Geranium', aliases: ['geranium', 'pelargonium'] },
  { id: 'flw_hollyhock', name: 'Hollyhock', aliases: ['hollyhock', 'alcea'] },
  { id: 'flw_lilac', name: 'Lilac', aliases: ['lilac', 'syringa'] },
  { id: 'flw_sweet_pea', name: 'Sweet Pea', aliases: ['sweet pea', 'lathyrus'] },
  { id: 'flw_pansy', name: 'Pansy', aliases: ['pansy', 'viola'] },
  { id: 'flw_celosia', name: 'Celosia', aliases: ['celosia', 'cockscomb'] },
  { id: 'flw_amaryllis', name: 'Amaryllis', aliases: ['amaryllis', 'hippeastrum'] },
  { id: 'flw_iris', name: 'Iris', aliases: ['iris', 'iris flower'] },
  { id: 'flw_lavender', name: 'Lavender', aliases: ['lavender', 'lavandula'] },
  { id: 'flw_sunflower_tall', name: 'Sunflower (Tall)', aliases: ['sunflower tall', 'sunflower giant'] },
  { id: 'flw_everlasting', name: 'Everlasting Flower', aliases: ['everlasting', 'strawflower'] },
  { id: 'flw_gomphrena', name: 'Gomphrena', aliases: ['gomphrena', 'globe amaranth'] }
];

ornamentalPlants.forEach((plant) => {
  plantKnowledgeBase[plant.id] = {
    ...ornamentalTemplate,
    name: plant.name,
    aliases: plant.aliases
  };
});

flowerPlants.forEach((plant) => {
  plantKnowledgeBase[plant.id] = {
    ...flowerTemplate,
    name: plant.name,
    aliases: plant.aliases
  };
});

export const diseaseDatabase = {
  powdery_mildew: {
    name: 'Powdery Mildew',
    symptoms: 'White powdery coating on leaves and stems',
    causes: 'Fungal infection, poor air circulation',
    treatment: [
      'Remove affected leaves',
      'Improve air circulation',
      'Apply sulfur-based fungicide',
      'Reduce humidity levels',
      'Avoid overhead watering'
    ]
  },
  root_rot: {
    name: 'Root Rot',
    symptoms: 'Mushy stems, yellowing leaves, foul smell from soil',
    causes: 'Overwatering, poor drainage, fungal infection',
    treatment: [
      'Reduce watering immediately',
      'Repot in fresh, dry soil',
      'Remove affected roots',
      'Improve drainage with perlite/sand',
      'Treat with fungicide if needed'
    ]
  },
  leaf_spot: {
    name: 'Leaf Spot',
    symptoms: 'Brown or black spots on leaves, yellow halos',
    causes: 'Fungal or bacterial infection, wet foliage',
    treatment: [
      'Remove affected leaves',
      'Avoid wetting foliage when watering',
      'Apply copper fungicide',
      'Improve air circulation',
      'Isolate plant from other plants'
    ]
  },
  spider_mites: {
    name: 'Spider Mites',
    symptoms: 'Fine webbing, stippled leaves, tiny moving dots',
    causes: 'Hot, dry conditions, pest infestation',
    treatment: [
      'Increase humidity with misting',
      'Spray with neem oil',
      'Remove heavily infested leaves',
      'Isolate from other plants',
      'Repeat treatment weekly'
    ]
  },
  mealybugs: {
    name: 'Mealybugs',
    symptoms: 'White cottony clusters, yellowing leaves, sticky residue',
    causes: 'Pest infestation, warm and humid conditions',
    treatment: [
      'Remove with cotton swab dipped in alcohol',
      'Spray with neem oil',
      'Isolate plant',
      'Repeat treatment every 7-10 days',
      'Reduce humidity if possible'
    ]
  },
  rice_blast: {
    name: 'Rice Blast',
    symptoms: 'Diamond-shaped gray lesions on leaves, neck rot, poor grain fill',
    causes: 'Fungal infection, high humidity, dense planting',
    treatment: [
      'Use resistant varieties',
      'Apply recommended fungicide',
      'Improve field drainage',
      'Avoid excessive nitrogen',
      'Maintain proper spacing'
    ]
  },
  bacterial_blight_rice: {
    name: 'Bacterial Blight (Rice)',
    symptoms: 'Yellowing and drying of leaf margins, wilting, reduced yield',
    causes: 'Bacterial infection, wounds, heavy rain and wind',
    treatment: [
      'Use resistant varieties',
      'Avoid excessive nitrogen',
      'Remove infected plants',
      'Maintain field sanitation',
      'Avoid water stress'
    ]
  },
  sheath_blight: {
    name: 'Sheath Blight',
    symptoms: 'Oval lesions on leaf sheath, rotting at the base, lodging',
    causes: 'Fungal infection, high humidity, dense canopy',
    treatment: [
      'Reduce plant density',
      'Apply recommended fungicide',
      'Avoid excessive nitrogen',
      'Improve airflow',
      'Remove crop residues'
    ]
  },
  tungro: {
    name: 'Rice Tungro',
    symptoms: 'Yellow-orange leaves, stunted growth, reduced tillering',
    causes: 'Viral disease transmitted by leafhoppers',
    treatment: [
      'Use resistant varieties',
      'Control leafhopper vectors',
      'Remove infected plants',
      'Synchronize planting',
      'Maintain field sanitation'
    ]
  },
  downy_mildew: {
    name: 'Downy Mildew',
    symptoms: 'Yellow patches on leaves with gray growth underneath',
    causes: 'Fungal-like pathogen, cool and humid conditions',
    treatment: [
      'Improve air circulation',
      'Avoid overhead watering',
      'Apply recommended fungicide',
      'Remove infected leaves',
      'Rotate crops'
    ]
  },
  fusarium_wilt: {
    name: 'Fusarium Wilt',
    symptoms: 'Wilting, yellowing leaves, brown vascular tissue',
    causes: 'Soil-borne fungal infection',
    treatment: [
      'Use resistant varieties',
      'Rotate crops',
      'Improve soil drainage',
      'Remove infected plants',
      'Avoid overwatering'
    ]
  },
  
  black_sigatoka: {
    name: 'Black Sigatoka',
    symptoms: 'Dark streaks on banana leaves, leaf drying, reduced yield',
    causes: 'Fungal infection, humid conditions',
    treatment: [
      'Remove infected leaves',
      'Apply recommended fungicide',
      'Improve airflow',
      'Use resistant varieties',
      'Maintain field sanitation'
    ]
  },
  panama_disease: {
    name: 'Panama Disease',
    symptoms: 'Yellowing leaves, wilting, brown vascular discoloration',
    causes: 'Soil-borne fungus (Fusarium)',
    treatment: [
      'Use resistant varieties',
      'Avoid moving contaminated soil',
      'Remove infected plants',
      'Improve drainage',
      'Sanitize tools'
    ]
  },
  citrus_greening: {
    name: 'Citrus Greening (HLB)',
    symptoms: 'Yellow shoots, blotchy mottled leaves, misshapen fruit',
    causes: 'Bacterial infection spread by psyllids',
    treatment: [
      'Control psyllid vectors',
      'Remove infected trees',
      'Use healthy planting materials',
      'Improve tree nutrition',
      'Maintain orchard sanitation'
    ]
  },
  citrus_canker: {
    name: 'Citrus Canker',
    symptoms: 'Raised corky lesions with yellow halos on leaves and fruit',
    causes: 'Bacterial infection, wind-driven rain',
    treatment: [
      'Prune infected branches',
      'Apply copper sprays',
      'Avoid overhead irrigation',
      'Use windbreaks',
      'Disinfect tools'
    ]
  },
  bacterial_wilt: {
    name: 'Bacterial Wilt',
    symptoms: 'Sudden wilting, brown vascular tissue, plant collapse',
    causes: 'Soil-borne bacteria, warm wet soils',
    treatment: [
      'Rotate with non-host crops',
      'Use resistant varieties',
      'Improve soil drainage',
      'Remove infected plants',
      'Avoid overhead watering'
    ]
  },
  late_blight: {
    name: 'Late Blight',
    symptoms: 'Water-soaked lesions, white mold under leaves, fruit rot',
    causes: 'Fungal-like pathogen, cool wet weather',
    treatment: [
      'Apply recommended fungicide',
      'Remove infected leaves',
      'Improve airflow',
      'Avoid overhead watering',
      'Rotate crops'
    ]
  },
  early_blight: {
    name: 'Early Blight',
    symptoms: 'Target-like brown spots on leaves, yellowing, leaf drop',
    causes: 'Fungal infection, warm humid conditions',
    treatment: [
      'Remove infected leaves',
      'Apply fungicide',
      'Mulch to prevent soil splash',
      'Rotate crops',
      'Maintain plant spacing'
    ]
  },
  mosaic_virus: {
    name: 'Mosaic Virus',
    symptoms: 'Mottled leaves, stunted growth, distorted fruits',
    causes: 'Viral infection spread by insects and tools',
    treatment: [
      'Remove infected plants',
      'Control insect vectors',
      'Disinfect tools',
      'Use resistant varieties',
      'Avoid handling when wet'
    ]
  },
  leaf_rust: {
    name: 'Leaf Rust',
    symptoms: 'Orange-brown pustules on leaves, yellowing, defoliation',
    causes: 'Fungal infection, humid conditions',
    treatment: [
      'Apply recommended fungicide',
      'Remove infected leaves',
      'Improve airflow',
      'Avoid overhead watering',
      'Use resistant varieties'
    ]
  },
  papaya_ringspot: {
    name: 'Papaya Ringspot',
    symptoms: 'Ring-like spots on fruit, leaf distortion, stunted plants',
    causes: 'Viral infection spread by aphids',
    treatment: [
      'Remove infected plants',
      'Control aphids',
      'Use healthy seedlings',
      'Rogue volunteer plants',
      'Maintain field sanitation'
    ]
  },
  clubroot: {
    name: 'Clubroot',
    symptoms: 'Swollen roots, wilting in heat, stunted growth',
    causes: 'Soil-borne pathogen in brassicas',
    treatment: [
      'Rotate crops for 3-4 years',
      'Raise soil pH with lime',
      'Use resistant varieties',
      'Improve drainage',
      'Remove infected plants'
    ]
  },
  leaf_smut: {
    name: 'Leaf Smut',
    symptoms: 'Dark streaks and spots on leaves, reduced vigor',
    causes: 'Fungal infection, wet conditions',
    treatment: [
      'Remove infected leaves',
      'Avoid overhead watering',
      'Apply fungicide if needed',
      'Improve airflow',
      'Maintain plant spacing'
    ]
  },
  root_knot_nematode: {
    name: 'Root-knot Nematode',
    symptoms: 'Galls on roots, stunted growth, yellowing leaves',
    causes: 'Soil-borne nematodes, warm soils',
    treatment: [
      'Rotate with non-host crops',
      'Use resistant varieties',
      'Incorporate organic matter',
      'Solarize soil',
      'Remove infected roots'
    ]
  },
  rice_brown_spot: {
    name: 'Rice Brown Spot',
    aliases: ['brown spot rice', 'palay brown spot', 'sakit ng palay brown spot'],
    symptoms: 'Brown circular spots on leaves, poor grain fill',
    causes: 'Fungal infection, nutrient stress',
    treatment: [
      'Use resistant varieties',
      'Apply recommended fungicide',
      'Improve field drainage',
      'Balanced fertilization',
      'Remove infected debris'
    ]
  },
  rice_bacterial_leaf_streak: {
    name: 'Rice Bacterial Leaf Streak',
    aliases: ['leaf streak rice', 'palay leaf streak', 'bacterial leaf streak rice'],
    symptoms: 'Narrow water-soaked streaks that turn brown',
    causes: 'Bacterial infection, windy rain',
    treatment: [
      'Use resistant varieties',
      'Avoid excessive nitrogen',
      'Plant clean seed',
      'Improve field sanitation',
      'Avoid mechanical injury'
    ]
  },
  rice_sheath_rot: {
    name: 'Rice Sheath Rot',
    aliases: ['sheath rot rice', 'palay sheath rot', 'rice sheath rot disease'],
    symptoms: 'Brown lesions on sheath, panicle discoloration',
    causes: 'Fungal infection, high humidity',
    treatment: [
      'Use resistant varieties',
      'Improve airflow',
      'Avoid dense planting',
      'Apply recommended fungicide',
      'Remove infected tillers'
    ]
  },
  rice_false_smut: {
    name: 'Rice False Smut',
    aliases: ['false smut rice', 'palay false smut', 'rice smut'],
    symptoms: 'Greenish smut balls on grains, reduced yield',
    causes: 'Fungal infection near flowering',
    treatment: [
      'Use resistant varieties',
      'Apply fungicide at booting',
      'Avoid excess nitrogen',
      'Improve field sanitation',
      'Use clean seed'
    ]
  },
  rice_grassy_stunt: {
    name: 'Rice Grassy Stunt',
    aliases: ['grassy stunt rice', 'palay grassy stunt', 'rice grassy stunt virus'],
    symptoms: 'Yellowing, stunted growth, excessive tillering',
    causes: 'Viral disease transmitted by brown planthopper',
    treatment: [
      'Control planthoppers',
      'Use resistant varieties',
      'Remove infected plants',
      'Synchronize planting',
      'Avoid volunteer rice'
    ]
  },
  rice_ragged_stunt: {
    name: 'Rice Ragged Stunt',
    aliases: ['ragged stunt rice', 'palay ragged stunt', 'rice ragged stunt virus'],
    symptoms: 'Ragged leaves, twisted growth, stunting',
    causes: 'Viral disease transmitted by brown planthopper',
    treatment: [
      'Control planthoppers',
      'Use resistant varieties',
      'Remove infected plants',
      'Synchronize planting',
      'Maintain field sanitation'
    ]
  },
  banana_bunchy_top: {
    name: 'Banana Bunchy Top',
    aliases: ['bunchy top', 'banana bunchy top virus', 'saging bunchy top'],
    symptoms: 'Upright bunchy leaves, dark green streaks on midrib',
    causes: 'Banana bunchy top virus spread by aphids',
    treatment: [
      'Remove infected mats',
      'Control aphids',
      'Use virus-free planting materials',
      'Sanitize tools',
      'Avoid moving infected suckers'
    ]
  },
  banana_moko: {
    name: 'Banana Moko',
    aliases: ['moko disease', 'banana moko', 'saging moko'],
    symptoms: 'Wilting, yellowing leaves, bacterial ooze in fruit',
    causes: 'Bacterial infection (Ralstonia), contaminated tools or soil',
    treatment: [
      'Remove infected plants',
      'Disinfect tools',
      'Avoid moving contaminated soil',
      'Use clean planting material',
      'Control insect vectors'
    ]
  },
  banana_yellow_sigatoka: {
    name: 'Banana Yellow Sigatoka',
    aliases: ['yellow sigatoka', 'banana leaf streak', 'saging sigatoka'],
    symptoms: 'Yellow streaks on leaves, leaf necrosis',
    causes: 'Fungal infection, humid conditions',
    treatment: [
      'Remove infected leaves',
      'Apply recommended fungicide',
      'Improve airflow',
      'Use resistant varieties',
      'Maintain field sanitation'
    ]
  },
  corn_downy_mildew: {
    name: 'Corn Downy Mildew',
    aliases: ['downy mildew corn', 'mais downy mildew', 'philippine downy mildew'],
    symptoms: 'Chlorotic streaks, white downy growth on leaves',
    causes: 'Fungal-like pathogen, infected seed',
    treatment: [
      'Use resistant varieties',
      'Treat seed',
      'Rogue infected plants',
      'Crop rotation',
      'Improve field hygiene'
    ]
  },
  corn_stalk_rot: {
    name: 'Corn Stalk Rot',
    aliases: ['stalk rot corn', 'mais stalk rot', 'corn stem rot'],
    symptoms: 'Soft rotting stalks, lodging',
    causes: 'Fungal infection, drought stress',
    treatment: [
      'Use resistant varieties',
      'Balanced fertilization',
      'Avoid plant stress',
      'Remove infected residues',
      'Rotate crops'
    ]
  },
  corn_leaf_blight: {
    name: 'Corn Leaf Blight',
    aliases: ['northern leaf blight', 'mais leaf blight', 'corn blight'],
    symptoms: 'Long gray-green lesions, leaf drying',
    causes: 'Fungal infection, warm humid conditions',
    treatment: [
      'Use resistant varieties',
      'Apply fungicide if needed',
      'Rotate crops',
      'Remove crop residues',
      'Ensure proper spacing'
    ]
  },
  cassava_mosaic: {
    name: 'Cassava Mosaic',
    aliases: ['cassava mosaic virus', 'kamoteng kahoy mosaic', 'balanggot na dahon'],
    symptoms: 'Mosaic patterns, leaf distortion, stunting',
    causes: 'Viral infection spread by whiteflies or infected cuttings',
    treatment: [
      'Use virus-free cuttings',
      'Control whiteflies',
      'Rogue infected plants',
      'Avoid planting infected material',
      'Sanitize tools'
    ]
  },
  cassava_bacterial_blight: {
    name: 'Cassava Bacterial Blight',
    aliases: ['cassava blight', 'kamoteng kahoy blight', 'bacterial blight cassava'],
    symptoms: 'Angular leaf spots, blight, wilting',
    causes: 'Bacterial infection, wet conditions',
    treatment: [
      'Use resistant varieties',
      'Plant clean cuttings',
      'Avoid overhead irrigation',
      'Remove infected plants',
      'Improve field sanitation'
    ]
  },
  sweet_potato_scurf: {
    name: 'Sweet Potato Scurf',
    aliases: ['kamote scurf', 'sweet potato skin disease', 'kamote scurf disease'],
    symptoms: 'Dark patches on skin, reduced market quality',
    causes: 'Fungal infection, contaminated soil',
    treatment: [
      'Use clean slips',
      'Rotate crops',
      'Avoid planting infected roots',
      'Cure roots properly',
      'Improve soil drainage'
    ]
  },
  taro_leaf_blight: {
    name: 'Taro Leaf Blight',
    aliases: ['gabi leaf blight', 'taro blight', 'gabi blight'],
    symptoms: 'Water-soaked spots, rapid leaf blight',
    causes: 'Phytophthora infection, wet weather',
    treatment: [
      'Improve spacing',
      'Avoid overhead watering',
      'Remove infected leaves',
      'Use resistant varieties',
      'Apply fungicide if needed'
    ]
  },
  onion_purple_blotch: {
    name: 'Onion Purple Blotch',
    aliases: ['purple blotch onion', 'sibuyas purple blotch', 'onion blotch'],
    symptoms: 'Purple lesions with yellow halos on leaves',
    causes: 'Fungal infection, wet foliage',
    treatment: [
      'Improve airflow',
      'Avoid overhead irrigation',
      'Apply fungicide',
      'Remove infected leaves',
      'Rotate crops'
    ]
  },
  onion_downy_mildew: {
    name: 'Onion Downy Mildew',
    aliases: ['downy mildew onion', 'sibuyas downy mildew', 'onion mildew'],
    symptoms: 'Pale lesions, gray-purple growth on leaves',
    causes: 'Fungal-like pathogen, cool humid weather',
    treatment: [
      'Improve airflow',
      'Avoid overhead watering',
      'Apply fungicide',
      'Use clean seed',
      'Rotate crops'
    ]
  },
  garlic_rust: {
    name: 'Garlic Rust',
    aliases: ['bawang rust', 'garlic leaf rust', 'rust on garlic'],
    symptoms: 'Orange pustules, leaf yellowing',
    causes: 'Fungal infection, humid conditions',
    treatment: [
      'Apply fungicide',
      'Remove infected leaves',
      'Improve airflow',
      'Avoid overhead irrigation',
      'Rotate crops'
    ]
  },
  eggplant_bacterial_wilt: {
    name: 'Eggplant Bacterial Wilt',
    aliases: ['talong bacterial wilt', 'eggplant wilt', 'bacterial wilt talong'],
    symptoms: 'Sudden wilting, brown vascular tissue',
    causes: 'Soil-borne bacteria, warm wet soils',
    treatment: [
      'Use resistant varieties',
      'Rotate crops',
      'Improve soil drainage',
      'Remove infected plants',
      'Avoid overhead watering'
    ]
  },
  tomato_leaf_curl: {
    name: 'Tomato Leaf Curl',
    aliases: ['tomato leaf curl virus', 'kamatis leaf curl', 'leaf curl kamatis'],
    symptoms: 'Upward curling leaves, stunting, yellowing',
    causes: 'Viral infection spread by whiteflies',
    treatment: [
      'Control whiteflies',
      'Use resistant varieties',
      'Remove infected plants',
      'Use reflective mulch',
      'Install insect netting'
    ]
  },
  tomato_bacterial_spot: {
    name: 'Tomato Bacterial Spot',
    aliases: ['bacterial spot', 'tomato spot', 'kamatis bacterial spot'],
    symptoms: 'Small water-soaked spots on leaves and fruit, may turn dark and scabby',
    causes: 'Bacterial infection spread by water splash and contaminated tools',
    treatment: [
      'Remove infected leaves and fruit',
      'Avoid overhead watering',
      'Apply copper-based bactericide',
      'Disinfect pruning tools',
      'Plant resistant varieties or seedlings'
    ]
  },
  cucumber_downy_mildew: {
    name: 'Cucumber Downy Mildew',
    aliases: ['downy mildew cucumber', 'pipino downy mildew', 'cucumber mildew'],
    symptoms: 'Yellow angular spots on leaves with grayish down on the underside',
    causes: 'Fungal-like pathogen favored by cool, humid conditions',
    treatment: [
      'Improve air circulation around plants',
      'Avoid overhead watering',
      'Apply recommended fungicide',
      'Remove and destroy infected leaves',
      'Plant resistant varieties'
    ]
  },
  eggplant_fruit_rot: {
    name: 'Eggplant Fruit Rot',
    aliases: ['talong fruit rot', 'eggplant rot', 'rot on eggplant fruit'],
    symptoms: 'Soft, rotten patches on fruit and calyx, brown lesions',
    causes: 'Fungal infection from wet conditions and poor air flow',
    treatment: [
      'Remove affected fruit and leaves',
      'Avoid overhead irrigation',
      'Improve spacing and airflow',
      'Apply fungicide if needed',
      'Harvest regularly to reduce disease pressure'
    ]
  },
  okra_powdery_mildew: {
    name: 'Okra Powdery Mildew',
    aliases: ['okra mildew', 'okra powdery mildew', 'okra fungal growth'],
    symptoms: 'White powdery coating on okra leaves and stems',
    causes: 'Fungal infection in warm, dry weather with poor airflow',
    treatment: [
      'Remove and destroy infected leaves',
      'Increase spacing between plants',
      'Apply sulfur or potassium bicarbonate spray',
      'Water at the base and avoid wetting foliage',
      'Improve air circulation'
    ]
  }
};
