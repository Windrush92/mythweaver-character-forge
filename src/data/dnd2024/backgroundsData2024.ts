// Compendio Oficial de Trasfondos D&D 5.5e (2024 Revised Rules) - Bilingüe
export interface Background2024ToolChoice {
  count: number;
  category: 'artisan' | 'instrument' | 'gaming';
  label: string;
  labelEn?: string;
  options: string[];
}

export interface Background2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  edition: '5.5e';
  description: string;
  descriptionEn?: string;
  abilityScores: ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha')[];
  feat: string;
  featEn?: string;
  bonusFeatId: string;
  bonusFeatSpellList?: 'Clérigo' | 'Druida' | 'Mago';
  skills: string[];
  skillProficiencies: string;
  skillProficienciesEn?: string;
  toolProficiency: string;
  toolProficiencyEn?: string;
  toolChoice?: Background2024ToolChoice;
  equipment: string;
  equipmentEn?: string;
  startingGold?: number;
  source: string;
}

export const ARTISAN_TOOLS_2024: string[] = [
  "Herramientas de albañil",
  "Herramientas de alfarero",
  "Herramientas de carpintero",
  "Herramientas de cartógrafo",
  "Herramientas de curtidor",
  "Herramientas de ebanista",
  "Herramientas de herrero",
  "Herramientas de hojalatero",
  "Herramientas de joyero",
  "Herramientas de manitas",
  "Herramientas de soplador de vidrio",
  "Herramientas de tejedor",
  "Herramientas de zapatero",
  "Suministros de alquimista",
  "Suministros de cervecero",
  "Suministros de pintor",
  "Útiles de calígrafo"
];

export const MUSICAL_INSTRUMENTS_2024: string[] = [
  "Laúd",
  "Lira",
  "Flauta",
  "Flauta de pan",
  "Cuerno",
  "Tambor",
  "Dulcimer",
  "Gaita",
  "Chirimía",
  "Viola"
];

export const GAMING_SETS_2024: string[] = [
  "Juego de dados",
  "Naipes",
  "Ajedrez dragón",
  "Juego de los Tres Dragones"
];

export const DND_2024_BACKGROUNDS: Background2024[] = [
  {
    "id": "bg-2024-acolyte",
    "slug": "acolyte",
    "name": "Acólito",
    "nameEn": "Acolyte",
    "edition": "5.5e",
    "description": "Te dedicaste al servicio devoto en un templo, monasterio o arboleda sagrada. Realizabas liturgias en honor a tu deidad o panteón, estudiando textos teológicos y brindando auxilio espiritual a la comunidad.",
    "descriptionEn": "You devoted yourself to service in a temple, secluded monastery, or sacred grove, performing sacred rites and studying ancient holy scripture.",
    "abilityScores": [
      "int",
      "wis",
      "cha"
    ],
    "feat": "Iniciado en la Magia (Clérigo)",
    "featEn": "Magic Initiate (Cleric)",
    "skillProficiencies": "Perspicacia y Religión",
    "skillProficienciesEn": "Insight and Religion",
    "toolProficiency": "Útiles de calígrafo",
    "toolProficiencyEn": "Calligrapher's Supplies",
    "equipment": "Útiles de calígrafo, libro (rezos), símbolo sagrado, 10 hojas de pergamino, túnica, 8 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Calligrapher's Supplies, Book (prayers), Holy Symbol, Parchment (10 sheets), Robe, 8 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-magic-initiate",
    "bonusFeatSpellList": "Clérigo",
    "skills": [
      "Perspicacia",
      "Religión"
    ],
    "startingGold": 8
  },
  {
    "id": "bg-2024-artisan",
    "slug": "artisan",
    "name": "Artesano",
    "nameEn": "Artisan",
    "edition": "5.5e",
    "description": "Comenzaste barriendo virutas y preparando fraguas o telares en el taller de un maestro artesano. Aprendiste el oficio tradicional hasta forjar obras duraderas y negociar con clientes y mercaderes.",
    "descriptionEn": "You began as an apprentice in an artisan's workshop, learning the mysteries of master craftsmanship and commerce.",
    "abilityScores": [
      "str",
      "dex",
      "int"
    ],
    "feat": "Artesano",
    "featEn": "Crafter",
    "skillProficiencies": "Investigación y Persuasión",
    "skillProficienciesEn": "Investigation and Persuasion",
    "toolProficiency": "Un tipo de herramientas de artesano (a elección)",
    "toolProficiencyEn": "Choose one kind of Artisan's Tools",
    "equipment": "Herramientas de artesano (elegidas arriba), 2 faltriqueras, ropa de viajero, 32 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Artisan's Tools (same as above), 2 Pouches, Traveler's Clothes, 32 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-crafter",
    "skills": [
      "Investigación",
      "Persuasión"
    ],
    "toolChoice": {
      "count": 1,
      "category": "artisan",
      "label": "Elige un tipo de Herramientas de Artesano",
      "labelEn": "Choose one kind of Artisan's Tools",
      "options": [
        "Herramientas de albañil",
        "Herramientas de alfarero",
        "Herramientas de carpintero",
        "Herramientas de cartógrafo",
        "Herramientas de curtidor",
        "Herramientas de ebanista",
        "Herramientas de herrero",
        "Herramientas de hojalatero",
        "Herramientas de joyero",
        "Herramientas de manitas",
        "Herramientas de soplador de vidrio",
        "Herramientas de tejedor",
        "Herramientas de zapatero",
        "Suministros de alquimista",
        "Suministros de cervecero",
        "Suministros de pintor",
        "Útiles de calígrafo"
      ]
    },
    "startingGold": 32
  },
  {
    "id": "bg-2024-charlatan",
    "slug": "charlatan",
    "name": "Charlatán",
    "nameEn": "Charlatan",
    "edition": "5.5e",
    "description": "Dominas el arte de leer a las personas, ganarte su confianza y hacerles creer exactamente lo que necesitan escuchar. Ya sea vendiendo elixires milagrosos o fingiendo identidades nobiliarias, tu lengua de plata es tu mejor arma.",
    "descriptionEn": "You know how to read people, win their trust, and sell them illusions. Your silver tongue and sharp wits are your ultimate tools.",
    "abilityScores": [
      "dex",
      "con",
      "cha"
    ],
    "feat": "Hábil",
    "featEn": "Skilled",
    "skillProficiencies": "Engaño y Juego de Manos",
    "skillProficienciesEn": "Deception and Sleight of Hand",
    "toolProficiency": "Kit de falsificación",
    "toolProficiencyEn": "Forgery Kit",
    "equipment": "Kit de falsificación, disfraz, ropa fina, 15 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Forgery Kit, Costume, Fine Clothes, 15 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-skilled",
    "skills": [
      "Engaño",
      "Juego de Manos"
    ],
    "startingGold": 15
  },
  {
    "id": "bg-2024-criminal",
    "slug": "criminal",
    "name": "Criminal",
    "nameEn": "Criminal",
    "edition": "5.5e",
    "description": "Operabas al margen de la ley en callejones sombríos, gremios de ladrones o redes de contrabando. Sabes cómo forzar cerraduras, moverte sin ser visto y mantener la cabeza fría cuando los guardias se acercan.",
    "descriptionEn": "You lived outside the law in shadowed alleys, thieves' guilds, or smuggler rings, knowing locks, stealth, and street survival.",
    "abilityScores": [
      "dex",
      "con",
      "int"
    ],
    "feat": "Alerta",
    "featEn": "Alert",
    "skillProficiencies": "Juego de Manos y Sigilo",
    "skillProficienciesEn": "Sleight of Hand and Stealth",
    "toolProficiency": "Herramientas de ladrón",
    "toolProficiencyEn": "Thieves' Tools",
    "equipment": "2 dagas, herramientas de ladrón, palanqueta, 2 faltriqueras, ropa de viajero, 16 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) 2 Daggers, Thieves' Tools, Crowbar, 2 Pouches, Traveler's Clothes, 16 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-alert",
    "skills": [
      "Juego de Manos",
      "Sigilo"
    ],
    "startingGold": 16
  },
  {
    "id": "bg-2024-entertainer",
    "slug": "entertainer",
    "name": "Artista",
    "nameEn": "Entertainer",
    "edition": "5.5e",
    "description": "Cautivabas al público en posadas bulliciosas, plazas reales y festivales. Eres maestro del drama, la danza, la poesía o la música popular, capaz de robar sonrisas o arrancar lágrimas con tu carisma escénico.",
    "descriptionEn": "You captivated audiences in lively taverns, royal courts, and vibrant festivals through music, drama, poetry, or acrobatic wonder.",
    "abilityScores": [
      "str",
      "dex",
      "cha"
    ],
    "feat": "Músico",
    "featEn": "Musician",
    "skillProficiencies": "Acrobacias e Interpretación",
    "skillProficienciesEn": "Acrobatics and Performance",
    "toolProficiency": "Un instrumento musical (a elección)",
    "toolProficiencyEn": "Choose one kind of Musical Instrument",
    "equipment": "Instrumento musical (elegido arriba), 2 disfraces, espejo, perfume, ropa de viajero, 11 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Musical Instrument (same as above), 2 Costumes, Mirror, Perfume, Traveler's Clothes, 11 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-musician",
    "skills": [
      "Acrobacias",
      "Interpretación"
    ],
    "toolChoice": {
      "count": 1,
      "category": "instrument",
      "label": "Elige un Instrumento Musical",
      "labelEn": "Choose one kind of Musical Instrument",
      "options": [
        "Laúd",
        "Lira",
        "Flauta",
        "Flauta de pan",
        "Cuerno",
        "Tambor",
        "Dulcimer",
        "Gaita",
        "Chirimía",
        "Viola"
      ]
    },
    "startingGold": 11
  },
  {
    "id": "bg-2024-farmer",
    "slug": "farmer",
    "name": "Granjero",
    "nameEn": "Farmer",
    "edition": "5.5e",
    "description": "Creciste trabajando la tierra fértil de sol a sol, cuidando rebaños y soportando sequías e inviernos implacables. Tu cuerpo es fuerte y resistente como los robles antiguos, y conoces los ritmos de la naturaleza.",
    "descriptionEn": "You grew up working the soil from dawn to dusk, tending livestock and braving harsh winters with rugged grit and natural instinct.",
    "abilityScores": [
      "str",
      "con",
      "wis"
    ],
    "feat": "Duro",
    "featEn": "Tough",
    "skillProficiencies": "Trato con Animales y Naturaleza",
    "skillProficienciesEn": "Animal Handling and Nature",
    "toolProficiency": "Herramientas de carpintero",
    "toolProficiencyEn": "Carpenter's Tools",
    "equipment": "Hoz, herramientas de carpintero, kit de curandero, olla de hierro, pala, ropa de viajero, 30 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Sickle, Carpenter's Tools, Healer's Kit, Iron Pot, Shovel, Traveler's Clothes, 30 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-tough",
    "skills": [
      "Trato con Animales",
      "Naturaleza"
    ],
    "startingGold": 30
  },
  {
    "id": "bg-2024-guard",
    "slug": "guard",
    "name": "Guardia",
    "nameEn": "Guard",
    "edition": "5.5e",
    "description": "Patrullabas las murallas de la ciudad, vigilabas portones fortificados o escoltabas caravanas mercantes a través de pasos peligrosos. Tienes vista aguda, reflejos prestos y sabes detectar problemas antes de que estallen.",
    "descriptionEn": "You patrolled city ramparts, guarded fort gates, or protected trade caravans through dangerous wilderness passes with vigilant eyes.",
    "abilityScores": [
      "str",
      "int",
      "wis"
    ],
    "feat": "Alerta",
    "featEn": "Alert",
    "skillProficiencies": "Atletismo y Percepción",
    "skillProficienciesEn": "Athletics and Perception",
    "toolProficiency": "Un juego de azar (a elección)",
    "toolProficiencyEn": "Choose one kind of Gaming Set",
    "equipment": "Lanza, ballesta ligera, 20 virotes, juego de azar (elegido arriba), linterna sorda, esposas, carcaj, ropa de viajero, 12 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Spear, Light Crossbow, 20 Bolts, Gaming Set (same as above), Hooded Lantern, Manacles, Quiver, Traveler's Clothes, 12 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-alert",
    "skills": [
      "Atletismo",
      "Percepción"
    ],
    "toolChoice": {
      "count": 1,
      "category": "gaming",
      "label": "Elige un Juego de Azar",
      "labelEn": "Choose one kind of Gaming Set",
      "options": [
        "Juego de dados",
        "Naipes",
        "Ajedrez dragón",
        "Juego de los Tres Dragones"
      ]
    },
    "startingGold": 12
  },
  {
    "id": "bg-2024-guide",
    "slug": "guide",
    "name": "Guía",
    "nameEn": "Guide",
    "edition": "5.5e",
    "description": "Guiabas expediciones a través de ciénagas traicioneras, desiertos abrasadores y cordilleras escarpadas. Sabes encontrar agua fresca, leer las estrellas y conducir a otros sanos y salvos a través de lo salvaje.",
    "descriptionEn": "You guided expeditions through treacherous swamps, searing deserts, and high mountain crags with deep survival expertise.",
    "abilityScores": [
      "dex",
      "con",
      "wis"
    ],
    "feat": "Iniciado en la Magia (Druida)",
    "featEn": "Magic Initiate (Druid)",
    "skillProficiencies": "Sigilo y Supervivencia",
    "skillProficienciesEn": "Stealth and Survival",
    "toolProficiency": "Herramientas de cartógrafo",
    "toolProficiencyEn": "Cartographer's Tools",
    "equipment": "Arco corto, 20 flechas, herramientas de cartógrafo, saco de dormir, carcaj, tienda de campaña, ropa de viajero, 3 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Shortbow, 20 Arrows, Cartographer's Tools, Bedroll, Quiver, Tent, Traveler's Clothes, 3 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-magic-initiate",
    "bonusFeatSpellList": "Druida",
    "skills": [
      "Sigilo",
      "Supervivencia"
    ],
    "startingGold": 3
  },
  {
    "id": "bg-2024-hermit",
    "slug": "hermit",
    "name": "Ermitaño",
    "nameEn": "Hermit",
    "edition": "5.5e",
    "description": "Viviste durante años en soledad en cuevas montañosas, bosques profundos o monasterios desiertos. En ese retiro contemplativo descubriste revelaciones espirituales y el poder curativo de las hierbas silvestres.",
    "descriptionEn": "You lived years in quiet solitude among mountain caves or dense wilderness, discovering spiritual truth and medicinal secrets.",
    "abilityScores": [
      "con",
      "wis",
      "cha"
    ],
    "feat": "Sanador",
    "featEn": "Healer",
    "skillProficiencies": "Medicina y Religión",
    "skillProficienciesEn": "Medicine and Religion",
    "toolProficiency": "Kit de herboristería",
    "toolProficiencyEn": "Herbalism Kit",
    "equipment": "Bastón, kit de herboristería, saco de dormir, libro (filosofía), lámpara, aceite (3 frascos), ropa de viajero, 16 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Quarterstaff, Herbalism Kit, Bedroll, Book (philosophy), Lamp, Oil (3 flasks), Traveler's Clothes, 16 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-healer",
    "skills": [
      "Medicina",
      "Religión"
    ],
    "startingGold": 16
  },
  {
    "id": "bg-2024-merchant",
    "slug": "merchant",
    "name": "Comerciante",
    "nameEn": "Merchant",
    "edition": "5.5e",
    "description": "Comprabas y vendías mercancías exóticas en zocos concurridos y puertos marítimos. Tienes un instinto nato para detectar oportunidades de negocio, tasar artefactos valiosos y cerrar tratos ventajosos.",
    "descriptionEn": "You traded goods across bustling harbor bazaars and caravan routes, possessing an unerring eye for value and negotiation.",
    "abilityScores": [
      "con",
      "int",
      "cha"
    ],
    "feat": "Afortunado",
    "featEn": "Lucky",
    "skillProficiencies": "Trato con Animales y Persuasión",
    "skillProficienciesEn": "Animal Handling and Persuasion",
    "toolProficiency": "Herramientas de navegante",
    "toolProficiencyEn": "Navigator's Tools",
    "equipment": "Herramientas de navegante, 2 faltriqueras, ropa de viajero, 22 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Navigator's Tools, 2 Pouches, Traveler's Clothes, 22 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-lucky",
    "skills": [
      "Trato con Animales",
      "Persuasión"
    ],
    "startingGold": 22
  },
  {
    "id": "bg-2024-noble",
    "slug": "noble",
    "name": "Noble",
    "nameEn": "Noble",
    "edition": "5.5e",
    "description": "Naciste en una familia aristocrática de alcurnia, con tierras, sirvientes y títulos nobiliarios. Recibiste una educación de élite en historia, política cortesana y las sutilezas de la alta diplomacia.",
    "descriptionEn": "You were born into aristocratic lineage, wealth, and high social standing, educated in court politics, history, and diplomacy.",
    "abilityScores": [
      "str",
      "int",
      "cha"
    ],
    "feat": "Hábil",
    "featEn": "Skilled",
    "skillProficiencies": "Historia y Persuasión",
    "skillProficienciesEn": "History and Persuasion",
    "toolProficiency": "Un juego de azar (a elección)",
    "toolProficiencyEn": "Choose one kind of Gaming Set",
    "equipment": "Juego de azar (elegido arriba), ropa fina, perfume, 29 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Gaming Set (same as above), Fine Clothes, Perfume, 29 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-skilled",
    "skills": [
      "Historia",
      "Persuasión"
    ],
    "toolChoice": {
      "count": 1,
      "category": "gaming",
      "label": "Elige un Juego de Azar",
      "labelEn": "Choose one kind of Gaming Set",
      "options": [
        "Juego de dados",
        "Naipes",
        "Ajedrez dragón",
        "Juego de los Tres Dragones"
      ]
    },
    "startingGold": 29
  },
  {
    "id": "bg-2024-sage",
    "slug": "sage",
    "name": "Erudito",
    "nameEn": "Sage",
    "edition": "5.5e",
    "description": "Pasaste tus años de juventud en academias arcanas, bibliotecas reales o torres de sabios, descifrando manuscritos vetustos y desentrañando las leyes místicas del universo.",
    "descriptionEn": "You spent your youth in grand arcane academies and grand libraries, decoding ancient manuscripts and cosmic laws.",
    "abilityScores": [
      "con",
      "int",
      "wis"
    ],
    "feat": "Iniciado en la Magia (Mago)",
    "featEn": "Magic Initiate (Wizard)",
    "skillProficiencies": "Conocimiento Arcano e Historia",
    "skillProficienciesEn": "Arcana and History",
    "toolProficiency": "Útiles de calígrafo",
    "toolProficiencyEn": "Calligrapher's Supplies",
    "equipment": "Bastón, útiles de calígrafo, libro (historia), pergamino (8 hojas), túnica, 8 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Quarterstaff, Calligrapher's Supplies, Book (history), Parchment (8 sheets), Robe, 8 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-magic-initiate",
    "bonusFeatSpellList": "Mago",
    "skills": [
      "Conocimiento Arcano",
      "Historia"
    ],
    "startingGold": 8
  },
  {
    "id": "bg-2024-sailor",
    "slug": "sailor",
    "name": "Marinero",
    "nameEn": "Sailor",
    "edition": "5.5e",
    "description": "Serviste en buques de guerra, carabelas mercantes o navíos piratas. Conoces el rugido de las tormentas en alta mar, el nudo de los cabos marineros y la camaradería ruda de los lobos de mar.",
    "descriptionEn": "You crewed tall ships and pirate galleons through howling sea storms, mastering rigging, knots, and shipboard camaraderie.",
    "abilityScores": [
      "str",
      "dex",
      "wis"
    ],
    "feat": "Luchador de Taberna",
    "featEn": "Tavern Brawler",
    "skillProficiencies": "Acrobacias y Percepción",
    "skillProficienciesEn": "Acrobatics and Perception",
    "toolProficiency": "Herramientas de navegante",
    "toolProficiencyEn": "Navigator's Tools",
    "equipment": "Daga, herramientas de navegante, cuerda, ropa de viajero, 20 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Dagger, Navigator's Tools, Rope, Traveler's Clothes, 20 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-tavern-brawler",
    "skills": [
      "Acrobacias",
      "Percepción"
    ],
    "startingGold": 20
  },
  {
    "id": "bg-2024-scribe",
    "slug": "scribe",
    "name": "Escriba",
    "nameEn": "Scribe",
    "edition": "5.5e",
    "description": "Registrabas decretos reales, testamentos mercantiles y tratados de paz. Tu pulso es firme, tus ojos distinguen sellos falsos al instante y posees un vasto caudal de información archivada.",
    "descriptionEn": "You recorded royal edicts, merchant ledgers, and historic treaties with a steady hand and exhaustive archival discipline.",
    "abilityScores": [
      "dex",
      "int",
      "wis"
    ],
    "feat": "Hábil",
    "featEn": "Skilled",
    "skillProficiencies": "Investigación y Percepción",
    "skillProficienciesEn": "Investigation and Perception",
    "toolProficiency": "Útiles de calígrafo",
    "toolProficiencyEn": "Calligrapher's Supplies",
    "equipment": "Útiles de calígrafo, ropa fina, lámpara, aceite (3 frascos), pergamino (12 hojas), 23 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Calligrapher's Supplies, Fine Clothes, Lamp, Oil (3 flasks), Parchment (12 sheets), 23 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-skilled",
    "skills": [
      "Investigación",
      "Percepción"
    ],
    "startingGold": 23
  },
  {
    "id": "bg-2024-soldier",
    "slug": "soldier",
    "name": "Soldado",
    "nameEn": "Soldier",
    "edition": "5.5e",
    "description": "Marchaste bajo estandartes militares, formaste en falanges bajo lluvias de flechas y sentiste el fragor del choque de escudos. Tienes disciplina marcial, coraje fogueado en combate y respeto por la cadena de mando.",
    "descriptionEn": "You marched in rank and file through thunderous battlefields, disciplined in shield walls and hardened by martial combat.",
    "abilityScores": [
      "str",
      "dex",
      "con"
    ],
    "feat": "Atacante Salvaje",
    "featEn": "Savage Attacker",
    "skillProficiencies": "Atletismo e Intimidación",
    "skillProficienciesEn": "Athletics and Intimidation",
    "toolProficiency": "Un juego de azar (a elección)",
    "toolProficiencyEn": "Choose one kind of Gaming Set",
    "equipment": "Lanza, arco corto, 20 flechas, juego de azar (elegido arriba), kit de curandero, carcaj, ropa de viajero, 14 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) Spear, Shortbow, 20 Arrows, Gaming Set (same as above), Healer's Kit, Quiver, Traveler's Clothes, 14 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-savage-attacker",
    "skills": [
      "Atletismo",
      "Intimidación"
    ],
    "toolChoice": {
      "count": 1,
      "category": "gaming",
      "label": "Elige un Juego de Azar",
      "labelEn": "Choose one kind of Gaming Set",
      "options": [
        "Juego de dados",
        "Naipes",
        "Ajedrez dragón",
        "Juego de los Tres Dragones"
      ]
    },
    "startingGold": 14
  },
  {
    "id": "bg-2024-wayfarer",
    "slug": "wayfarer",
    "name": "Trotamundos",
    "nameEn": "Wayfarer",
    "edition": "5.5e",
    "description": "Nómada de espíritu libre que nunca echó raíces en ningún lugar. Cruzaste fronteras a pie o en barcazas, aprendiendo a buscar cobijo bajo las estrellas, esquivar patrullas y confiar en tu ingenio.",
    "descriptionEn": "A free-spirited nomad who never stayed put in one realm, thriving on open roads through streetwise wits and boundless curiosity.",
    "abilityScores": [
      "dex",
      "wis",
      "cha"
    ],
    "feat": "Afortunado",
    "featEn": "Lucky",
    "skillProficiencies": "Perspicacia y Sigilo",
    "skillProficienciesEn": "Insight and Stealth",
    "toolProficiency": "Herramientas de ladrón",
    "toolProficiencyEn": "Thieves' Tools",
    "equipment": "2 dagas, herramientas de ladrón, juego de azar (cualquiera), saco de dormir, 2 faltriqueras, ropa de viajero, 16 po; o 50 po.",
    "equipmentEn": "Choose A or B: (A) 2 Daggers, Thieves' Tools, Gaming Set (any), Bedroll, 2 Pouches, Traveler's Clothes, 16 GP; or (B) 50 GP.",
    "source": "Player's Handbook 2024",
    "bonusFeatId": "feat-2024-lucky",
    "skills": [
      "Perspicacia",
      "Sigilo"
    ],
    "startingGold": 16
  }
];
