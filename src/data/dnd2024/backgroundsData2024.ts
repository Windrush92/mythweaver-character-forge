// Compendio Oficial de Trasfondos D&D 5.5e (2024 Revised Rules) - Bilingüe
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
  skillProficiencies: string;
  skillProficienciesEn?: string;
  toolProficiency: string;
  toolProficiencyEn?: string;
  equipment: string;
  equipmentEn?: string;
  source: string;
}

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
    "equipment": "Útiles de calígrafo, libro sagrado de rezos, símbolo sagrado, 10 hojas de pergamino, ropajes de culto, 8 po; o 50 po.",
    "equipmentEn": "Calligrapher's Supplies, Prayer Book, Holy Symbol, 10 sheets of parchment, Robe, 8 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "toolProficiency": "Un tipo de herramientas de artesano",
    "toolProficiencyEn": "One kind of Artisan's Tools",
    "equipment": "Herramientas de artesano a tu elección, 2 faltriqueras, ropa de viajero, 32 po; o 50 po.",
    "equipmentEn": "Artisan's Tools of your choice, 2 Pouches, Traveler's Clothes, 32 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "toolProficiency": "Kit de disfraz",
    "toolProficiencyEn": "Disguise Kit",
    "equipment": "Kit de disfraz, ropa fina elegante, documentos falsificados, 15 po; o 50 po.",
    "equipmentEn": "Disguise Kit, Fine Clothes, Forged Documents, 15 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "equipment": "Herramientas de ladrón, 2 dagas, palanqueta, ropa oscura con capucha, 16 po; o 50 po.",
    "equipmentEn": "Thieves' Tools, 2 Daggers, Crowbar, Dark Hooded Clothes, 16 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "toolProficiency": "Un instrumento musical",
    "toolProficiencyEn": "One Musical Instrument",
    "equipment": "Instrumento musical a tu elección, disfraz de gala, espejo de acero, 16 po; o 50 po.",
    "equipmentEn": "Musical Instrument of your choice, Costume, Steel Mirror, 16 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "skillProficiencies": "Manejo de Animales y Naturaleza",
    "skillProficienciesEn": "Animal Handling and Nature",
    "toolProficiency": "Herramientas de carpintero",
    "toolProficiencyEn": "Carpenter's Tools",
    "equipment": "Herramientas de carpintero, horca, pala, ropa rústica de trabajo resistente, 23 po; o 50 po.",
    "equipmentEn": "Carpenter's Tools, Pitchfork, Shovel, Work Clothes, 23 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "toolProficiency": "Un juego (dados o cartas)",
    "toolProficiencyEn": "One Gaming Set",
    "equipment": "Lanza, silbato de alarma de bronce, esposas de hierro, linterna sorda, uniforme, 12 po; o 50 po.",
    "equipmentEn": "Spear, Horn/Whistle, Manacles, Hooded Lantern, Guard Uniform, 12 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "equipment": "Herramientas de cartógrafo, brújula de latón, arco corto, 20 flechas, saco de dormir, 10 po; o 50 po.",
    "equipmentEn": "Cartographer's Tools, Brass Compass, Shortbow, 20 Arrows, Bedroll, 10 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "equipment": "Kit de herboristería, estuche de pergamino con notas filosóficas, manta de viaje abrigada, 15 po; o 50 po.",
    "equipmentEn": "Herbalism Kit, Scroll Case with Philosophy Notes, Winter Blanket, 15 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "skillProficiencies": "Perspicacia y Persuasión",
    "skillProficienciesEn": "Insight and Persuasion",
    "toolProficiency": "Herramientas de navegante o balanza",
    "toolProficiencyEn": "Navigator's Tools",
    "equipment": "Balanza de precisión de comerciante, carta de crédito comercial, ropa elegante de viaje, 22 po; o 50 po.",
    "equipmentEn": "Merchant's Scale, Letter of Credit, Traveler's Clothes, 22 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "toolProficiency": "Un juego (ajedrez dragón)",
    "toolProficiencyEn": "One Gaming Set (Dragonchess)",
    "equipment": "Sello señorial de tu casa, pergamino de árbol genealógico, ropa fina de seda noble, perfume, 24 po; o 50 po.",
    "equipmentEn": "Signet Ring, Pedigree Scroll, Fine Silk Clothes, Perfume, 24 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "skillProficiencies": "Arcanos e Historia",
    "skillProficienciesEn": "Arcana and History",
    "toolProficiency": "Útiles de calígrafo",
    "toolProficiencyEn": "Calligrapher's Supplies",
    "equipment": "Tinta negra, pluma de ave, cuchillo para pergaminos, tomo de sabiduría arcana, ropa de erudito, 8 po; o 50 po.",
    "equipmentEn": "Black Ink, Quill, Parchment Knife, Book of Arcane Lore, Scholar's Robes, 8 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "skillProficiencies": "Atletismo y Percepción",
    "skillProficienciesEn": "Athletics and Perception",
    "toolProficiency": "Herramientas de navegante",
    "toolProficiencyEn": "Navigator's Tools",
    "equipment": "Herramientas de navegante, cuerda de cáñamo de 50 pies, amuleto de caracola de la suerte, daga marinera, 10 po; o 50 po.",
    "equipmentEn": "Navigator's Tools, 50 ft Silk/Hemp Rope, Lucky Conch Charm, Dagger, 10 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "skillProficiencies": "Historia e Investigación",
    "skillProficienciesEn": "History and Investigation",
    "toolProficiency": "Útiles de calígrafo",
    "toolProficiencyEn": "Calligrapher's Supplies",
    "equipment": "Útiles de calígrafo, 3 frascos de tinta de colores, estuche con 20 hojas de papel vitela, 23 po; o 50 po.",
    "equipmentEn": "Calligrapher's Supplies, 3 Inks, Scroll Case with 20 Vellum Sheets, 23 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "toolProficiency": "Un juego (dados o cartas)",
    "toolProficiencyEn": "One Gaming Set",
    "equipment": "Insignia militar de tu rango, trofeo tomado de un enemigo caído, juego de dados, ropa de campaña, 14 po; o 50 po.",
    "equipmentEn": "Rank Insignia, Battle Trophy, Bone Dice Set, Uniform, 14 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
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
    "equipment": "Herramientas de ladrón, daga, saco de viaje gastado, saco de dormir, mapa de caminos, 16 po; o 50 po.",
    "equipmentEn": "Thieves' Tools, Dagger, Traveler's Pack, Road Map, 16 GP; or 50 GP.",
    "source": "Player's Handbook 2024"
  }
];
