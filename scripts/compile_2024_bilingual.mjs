import fs from 'fs';
import path from 'path';

// Bilingual 2024 Compendiums Compiler

// 1. SPECIES (10 species)
const SPECIES = [
  {
    id: "species-2024-aasimar",
    slug: "aasimar",
    name: "Aasimar",
    nameEn: "Aasimar",
    edition: "5.5e",
    description: "Los aasimar son mortales que llevan una chispa de los Planos Superiores en sus almas. Ya sea descendientes de un ser celestial o imbuidos de gracia divina, pueden avivar esa chispa para irradiar luz, sanar heridas y desatar furia sagrada.",
    descriptionEn: "Aasimar are mortals who carry a spark of the Upper Planes within their souls. Whether descended from an angelic being or infused with celestial power, they can fan that spark to bring light, healing, and heavenly fury.",
    size: "Mediano",
    sizeEn: "Medium",
    speed: "30 pies (9m)",
    darkvision: 60,
    traits: [
      {
        name: "Resistencia Celestial",
        nameEn: "Celestial Resistance",
        desc: "Tienes Resistencia al daño Necrótico y al daño Radiante.",
        descEn: "You have Resistance to Necrotic damage and Radiant damage."
      },
      {
        name: "Visión en la Oscuridad",
        nameEn: "Darkvision",
        desc: "Puedes ver en luz tenue hasta 60 pies como si fuera luz brillante, y en oscuridad como en luz tenue.",
        descEn: "You have Darkvision with a range of 60 feet."
      },
      {
        name: "Manos Sanadoras",
        nameEn: "Healing Hands",
        desc: "Como acción Mágica, tocas a una criatura y tiras tantos d4 como tu Bono de Competencia. La criatura recupera puntos de golpe iguales al total obtenido. Recuperas este uso tras un Descanso Largo.",
        descEn: "As a Magic action, you touch a creature and roll a number of d4s equal to your Proficiency Bonus. The creature regains Hit Points equal to the total rolled. Recovers on Long Rest."
      },
      {
        name: "Portador de Luz",
        nameEn: "Light Bearer",
        desc: "Conoces el truco Luz (Light). Tu aptitud mágica para este truco es Carisma.",
        descEn: "You know the Light cantrip. Charisma is your spellcasting ability for it."
      },
      {
        name: "Revelación Celestial",
        nameEn: "Celestial Revelation",
        desc: "A partir de nivel 3, puedes transformarte como Acción Adicional durante 1 minuto (Alas Celestiales para volar 30 pies, Radiancia Interior para quemar enemigos cercanos con daño radiante, o Sudario Necrótico para atemorizar a los enemigos). Recuperas este poder tras un Descanso Largo.",
        descEn: "At level 3, transform as a Bonus Action for 1 minute (Heavenly Wings, Inner Radiance, or Necrotic Shroud). Recovers on Long Rest."
      }
    ]
  },
  {
    id: "species-2024-dragonborn",
    slug: "dragonborn",
    name: "Dracónido",
    nameEn: "Dragonborn",
    edition: "5.5e",
    description: "Los dracónidos caminan con orgullo por un mundo que los saluda con temor o admiración. Modelados con la majestad de los dragones, portan en sus pulmones el aliento elemental de sus gloriosos antepasados.",
    descriptionEn: "Dragonborn walk proudly through a world that greets them with fearful or admiring eyes. Shaped by dragon majesty, they carry the elemental breath of their draconic forebears.",
    size: "Mediano",
    sizeEn: "Medium",
    speed: "30 pies (9m)",
    darkvision: 60,
    traits: [
      {
        name: "Linaje Dracónico",
        nameEn: "Draconic Ancestry",
        desc: "Elige tu tipo de dragón (Negro, Azul, Latón, Bronce, Cobre, Oro, Verde, Rojo, Plata o Blanco), lo que determina el tipo de daño de tu aliento y tu resistencia elemental (Fuego, Frío, Relámpago, Ácido o Veneno).",
        descEn: "Choose a dragon ancestor, determining your damage type and resistance (Fire, Cold, Lightning, Acid, or Poison)."
      },
      {
        name: "Arma de Aliento",
        nameEn: "Breath Weapon",
        desc: "Al usar la acción de Atacar, puedes reemplazar uno de tus ataques por una exhalación en cono de 15 pies o línea de 30 pies. Las criaturas deben superar una tirada de salvación de Destreza o Constitución (CD 8 + Mod. Constitución + Bono de Competencia) o sufrir 1d10 de daño (aumenta a 2d10 en nivel 5, 3d10 en nivel 11 y 4d10 en nivel 17). Usos por descanso largo: igual a tu Bono de Competencia.",
        descEn: "Replace an attack with an elemental exhalation (1d10 damage, scaling at levels 5, 11, 17). Uses equal to Proficiency Bonus per Long Rest."
      },
      {
        name: "Resistencia al Daño",
        nameEn: "Damage Resistance",
        desc: "Tienes Resistencia al tipo de daño asociado con tu Linaje Dracónico.",
        descEn: "You have Resistance to the damage type associated with your Draconic Ancestry."
      },
      {
        name: "Visión en la Oscuridad",
        nameEn: "Darkvision",
        desc: "Visión en la oscuridad en un radio de 60 pies.",
        descEn: "Darkvision with a range of 60 feet."
      },
      {
        name: "Vuelo Dracónico (Nivel 5)",
        nameEn: "Draconic Flight (Level 5)",
        desc: "A partir de nivel 5, puedes manifestar alas espectrales como Acción Adicional durante 10 minutos, obteniendo una velocidad de vuelo igual a tu velocidad a pie. Recuperas este uso tras un Descanso Largo.",
        descEn: "At level 5, sprout spectral wings as a Bonus Action for 10 minutes, gaining a fly speed equal to your speed. Recovers on Long Rest."
      }
    ]
  },
  {
    id: "species-2024-dwarf",
    slug: "dwarf",
    name: "Enano",
    nameEn: "Dwarf",
    edition: "5.5e",
    description: "Forjados en la roca y la piedra de las profundidades del mundo, los enanos son conocidos por su resiliencia inquebrantable, su maestría en la herrería y su inagotable perseverancia ante cualquier adversidad.",
    descriptionEn: "Forged from bedrock in ancient deep halls, dwarves are renowned for their stoic resilience, unparalleled craftsmanship, and stubborn determination in the face of doom.",
    size: "Mediano",
    sizeEn: "Medium",
    speed: "30 pies (9m)",
    darkvision: 120,
    traits: [
      {
        name: "Visión en la Oscuridad Superior",
        nameEn: "Superior Darkvision",
        desc: "Puedes ver en la oscuridad hasta un radio de 120 pies.",
        descEn: "You have Darkvision with a range of 120 feet."
      },
      {
        name: "Resiliencia Enana",
        nameEn: "Dwarven Resilience",
        desc: "Tienes Resistencia al daño por Veneno y Ventaja en tiradas de salvación para evitar o terminar la condición Envenenado.",
        descEn: "You have Resistance to Poison damage and Advantage on saving throws against Poison."
      },
      {
        name: "Dureza Enana",
        nameEn: "Dwarven Toughness",
        desc: "Tu máximo de Puntos de Golpe aumenta en 1, y aumenta en 1 punto adicional cada vez que subes de nivel.",
        descEn: "Your Hit Point maximum increases by 1, and increases by 1 each time you gain a level."
      },
      {
        name: "Afinidad con la Piedra",
        nameEn: "Stonecunning",
        desc: "Como Acción Adicional mientras estés sobre piedra, ganas Visión Temblorosa (Tremorsense) hasta 60 pies durante 10 minutos. Puedes usar este rasgo tantas veces como tu Bono de Competencia por Descanso Largo.",
        descEn: "As a Bonus Action on stone, gain Tremorsense up to 60 feet for 10 minutes. Uses equal to Proficiency Bonus per Long Rest."
      }
    ]
  },
  {
    id: "species-2024-elf",
    slug: "elf",
    name: "Elfo",
    nameEn: "Elf",
    edition: "5.5e",
    description: "Seres de elegancia atemporal y gracia feérica nacidos de los bosques antiguos, los reinos estelares y el inframundo, los elfos viven vidas centenarias contemplando la belleza y la magia del cosmos.",
    descriptionEn: "Beings of timeless elegance and fey grace born from ancient woodlands, stellar realms, and the underworld, elves live centuries pursuing mastery in art, magic, and martial discipline.",
    size: "Mediano",
    sizeEn: "Medium",
    speed: "30 pies (9m)",
    darkvision: 60,
    traits: [
      {
        name: "Linaje Élfico",
        nameEn: "Elven Lineage",
        desc: "Elige tu linaje: Drow (Visión en la oscuridad 120 pies, truco Luces Danzantes, Fuego Feérico a nvl 3, Oscuridad a nvl 5), Alto Elfo (Eliges 1 truco de Mago y conjuros Paso Brumoso), o Elfo de los Bosques (Velocidad de 35 pies y conjuros Zancada Prodigiosa y Pasar sin Rastro).",
        descEn: "Choose Drow, High Elf, or Wood Elf, gaining distinct spells and mobility traits."
      },
      {
        name: "Linaje Feérico",
        nameEn: "Fey Ancestry",
        desc: "Tienes Ventaja en tiradas de salvación para evitar o terminar la condición Hechizado (Charmed).",
        descEn: "You have Advantage on saving throws to avoid or end the Charmed condition."
      },
      {
        name: "Sentidos Agudos",
        nameEn: "Keen Senses",
        desc: "Tienes competencia en la habilidad Percepción.",
        descEn: "You have proficiency in the Perception skill."
      },
      {
        name: "Trance",
        nameEn: "Trance",
        desc: "No necesitas dormir y la magia no te puede dormir. Puedes completar un descanso largo en tan solo 4 horas de meditación.",
        descEn: "You don't need sleep and cannot be put to sleep by magic. Complete a Long Rest in 4 hours of meditation."
      }
    ]
  },
  {
    id: "species-2024-gnome",
    slug: "gnome",
    name: "Gnomo",
    nameEn: "Gnome",
    edition: "5.5e",
    description: "Curiosos, ingeniosos y rebosantes de entusiasmo, los gnomos son exploradores natos de los secretos arcanos y las maravillas mecánicas del multiverso.",
    descriptionEn: "Curious, inventive, and brimming with boundless enthusiasm, gnomes are natural explorers of arcane mysteries and mechanical marvels throughout the multiverse.",
    size: "Pequeño",
    sizeEn: "Small",
    speed: "30 pies (9m)",
    darkvision: 60,
    traits: [
      {
        name: "Astucia Gnómica",
        nameEn: "Gnomish Cunning",
        desc: "Tienes Ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma.",
        descEn: "You have Advantage on all Intelligence, Wisdom, and Charisma saving throws."
      },
      {
        name: "Visión en la Oscuridad",
        nameEn: "Darkvision",
        desc: "Visión en la oscuridad hasta 60 pies.",
        descEn: "Darkvision with a range of 60 feet."
      },
      {
        name: "Linaje Gnómico",
        nameEn: "Gnomish Lineage",
        desc: "Elige entre Gnomo de los Bosques (conoces el truco Ilusión Menor y puedes hablar con animales pequeños) o Gnomo de las Rocas (conoces los trucos Reparar y Prestidigitación, y puedes fabricar artilugios mecánicos).",
        descEn: "Choose Forest Gnome (Minor Illusion & Speak with Animals) or Rock Gnome (Mending, Prestidigitation & Clockwork Devices)."
      }
    ]
  },
  {
    id: "species-2024-goliath",
    slug: "goliath",
    name: "Goliat",
    nameEn: "Goliath",
    edition: "5.5e",
    description: "Titanes de estatura colosal descendientes de los gigantes primordiales de las cumbres más altas, los goliat poseen una fuerza descomunal y la furia de los elementos grabada en sus venas.",
    descriptionEn: "Towering titans descended from primordial mountain giants, goliaths possess immense strength and elemental fury etched into their very veins.",
    size: "Mediano",
    sizeEn: "Medium",
    speed: "35 pies (10.5m)",
    darkvision: 0,
    traits: [
      {
        name: "Ascendencia Gigante",
        nameEn: "Giant Ancestry",
        desc: "Ganas un poder según tu linaje de gigante (Nube: teletransporte de 30 pies; Fuego: 1d10 daño fuego adicional; Helada: 1d6 frío y reducción de velocidad; Colina: derribar enemigo grande o menor; Piedra: reacción para reducir daño entrante en 1d12 + CON; Tormenta: reacción 1d8 daño relámpago a quien te dañe). Usos iguales a tu Bono de Competencia por descanso largo.",
        descEn: "Supernatural power tied to giant heritage (Cloud, Fire, Frost, Hill, Stone, or Storm). Uses equal to Proficiency Bonus."
      },
      {
        name: "Forma Colosal (Nivel 5)",
        nameEn: "Large Form (Level 5)",
        desc: "A partir de nivel 5, como Acción Adicional puedes cambiar tu tamaño a Grande (Large) durante 10 minutos. Ganas Ventaja en pruebas de Fuerza y tu velocidad aumenta en 10 pies. Recuperas este uso tras un Descanso Largo.",
        descEn: "At level 5, become Large size as a Bonus Action for 10 minutes (+10 ft speed, Advantage on Strength checks)."
      },
      {
        name: "Complexión Poderosa",
        nameEn: "Powerful Build",
        desc: "Tienes Ventaja en pruebas para evitar o escapar de la condición Agarrado (Grappled), y tu capacidad de carga se cuenta como si fueras una criatura de tamaño Grande.",
        descEn: "Advantage to escape grapples, and carrying capacity is counted as one size larger."
      }
    ]
  },
  {
    id: "species-2024-halfling",
    slug: "halfling",
    name: "Mediano",
    nameEn: "Halfling",
    edition: "5.5e",
    description: "Amantes del hogar, la buena comida y la camaradería, los medianos ocultan tras su pequeña estatura un coraje insospechado, una suerte legendaria y una agilidad incomparable.",
    descriptionEn: "Fond of good food, hearth, and companionship, halflings hide behind their small stature unmatched bravery, legendary good fortune, and uncanny stealth.",
    size: "Pequeño",
    sizeEn: "Small",
    speed: "30 pies (9m)",
    darkvision: 0,
    traits: [
      {
        name: "Afortunado",
        nameEn: "Lucky",
        desc: "Cuando obtienes un 1 natural en una tirada de ataque, prueba de característica o tirada de salvación con un d20, puedes volver a tirar el dado y debes usar el nuevo resultado.",
        descEn: "When you roll a 1 on a d20 test, you can reroll the die and must use the new roll."
      },
      {
        name: "Valiente",
        nameEn: "Brave",
        desc: "Tienes Ventaja en tiradas de salvación para evitar o terminar la condición Asustado (Frightened).",
        descEn: "You have Advantage on saving throws against being Frightened."
      },
      {
        name: "Agilidad Mediana",
        nameEn: "Halfling Nimbleness",
        desc: "Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño mayor que el tuyo.",
        descEn: "You can move through the space of any creature that is a size larger than you."
      },
      {
        name: "Sigilo Natural",
        nameEn: "Naturally Stealthy",
        desc: "Puedes intentar esconderte incluso cuando solo estás tapado por una criatura que sea al menos de un tamaño mayor que tú.",
        descEn: "You can attempt to hide even when obscured only by a creature at least one size larger than you."
      }
    ]
  },
  {
    id: "species-2024-human",
    slug: "human",
    name: "Humano",
    nameEn: "Human",
    edition: "5.5e",
    description: "La especie más ambiciosa, adaptable y diversa del multiverso. Su determinación tenaz y capacidad de sobreponerse a cualquier límite los convierte en pioneros legendarios.",
    descriptionEn: "The most ambitious, versatile, and adaptable mortals in the cosmos, humans excel at defying impossible odds through sheer ingenuity and tenacity.",
    size: "Mediano o Pequeño",
    sizeEn: "Medium or Small",
    speed: "30 pies (9m)",
    darkvision: 0,
    traits: [
      {
        name: "Ingenioso (Inspiración Heroica)",
        nameEn: "Resourceful",
        desc: "Ganas Inspiración Heroica cada vez que terminas un Descanso Largo. Puedes usarla para volver a tirar cualquier dado de d20.",
        descEn: "You gain Heroic Inspiration whenever you finish a Long Rest."
      },
      {
        name: "Competencia Hábil",
        nameEn: "Skillful",
        desc: "Ganas competencia en una habilidad a tu elección.",
        descEn: "You gain proficiency in one skill of your choice."
      },
      {
        name: "Versátil (Dote de Origen Extra)",
        nameEn: "Versatile",
        desc: "Ganas una Dote de Origen adicional a tu elección (además de la otorgada por tu Trasfondo).",
        descEn: "You gain one additional Origin Feat of your choice."
      }
    ]
  },
  {
    id: "species-2024-orc",
    slug: "orc",
    name: "Orco",
    nameEn: "Orc",
    edition: "5.5e",
    description: "Bendecidos con una vitalidad feroz y una fuerza indómita, los orcos son guerreros de convicciones apasionadas que protegen a su clan y a sus aliados hasta el último aliento.",
    descriptionEn: "Blessed with fierce vitality and untamable strength, orcs are passionate survivors and steadfast defenders of their kin and companions.",
    size: "Mediano",
    sizeEn: "Medium",
    speed: "30 pies (9m)",
    darkvision: 120,
    traits: [
      {
        name: "Subidón de Adrenalina",
        nameEn: "Adrenaline Rush",
        desc: "Como Acción Adicional, puedes realizar la acción de Correr (Dash). Cuando lo haces, ganas Puntos de Golpe Temporales iguales a tu Bono de Competencia. Usos por descanso largo: igual a tu Bono de Competencia.",
        descEn: "Dash as a Bonus Action and gain temporary hit points equal to your Proficiency Bonus. Uses equal to PB per Long Rest."
      },
      {
        name: "Visión en la Oscuridad Superior",
        nameEn: "Superior Darkvision",
        desc: "Visión en la oscuridad hasta 120 pies.",
        descEn: "Darkvision with a range of 120 feet."
      },
      {
        name: "Resistencia Incansable",
        nameEn: "Relentless Endurance",
        desc: "Cuando tus puntos de golpe se reducen a 0 pero no mueres directamente, puedes quedarte a 1 punto de golpe en su lugar. Recuperas este uso tras un Descanso Largo.",
        descEn: "When reduced to 0 HP but not killed outright, you drop to 1 HP instead. Recovers on Long Rest."
      }
    ]
  },
  {
    id: "species-2024-tiefling",
    slug: "tiefling",
    name: "Tiflin",
    nameEn: "Tiefling",
    edition: "5.5e",
    description: "Portadores de una herencia ligada a los Planos Inferiores, los tiflin poseen cuernos, colas y un magnetismo misterioso, dominando magias oscuras de linajes infernales, abisales o ctónicos.",
    descriptionEn: "Bearers of a legacy tied to the Lower Planes, tieflings wield horns, tails, and an otherworldly aura, channeling dark magic from infernal, abyssal, or chthonic origins.",
    size: "Mediano o Pequeño",
    sizeEn: "Medium or Small",
    speed: "30 pies (9m)",
    darkvision: 60,
    traits: [
      {
        name: "Legado Infernal",
        nameEn: "Fiendish Legacy",
        desc: "Elige tu legado: Abisal (Resistencia a Veneno; trucos Rociada Venenosa, Rayo de Enfermedad, Mantener Persona), Ctónico (Resistencia a Necrótico; trucos Toque Helado, Falsa Vida, Rayo de Debilitamiento) o Infernal (Resistencia a Fuego; trucos Saeta de Fuego, Reprensión Infernal, Oscuridad).",
        descEn: "Choose Abyssal (Poison), Chthonic (Necrotic), or Infernal (Fire), gaining associated resistance and spells."
      },
      {
        name: "Visión en la Oscuridad",
        nameEn: "Darkvision",
        desc: "Visión en la oscuridad hasta 60 pies.",
        descEn: "Darkvision with a range of 60 feet."
      },
      {
        name: "Presencia Sobrenatural",
        nameEn: "Otherworldly Presence",
        desc: "Conoces el truco Taumaturgia (Thaumaturgy). Tu aptitud mágica para este truco es Carisma.",
        descEn: "You know the Thaumaturgy cantrip (Charisma)."
      }
    ]
  }
];

// 2. BACKGROUNDS (16 backgrounds)
const BACKGROUNDS = [
  {
    id: "bg-2024-acolyte",
    slug: "acolyte",
    name: "Acólito",
    nameEn: "Acolyte",
    edition: "5.5e",
    description: "Te dedicaste al servicio devoto en un templo, monasterio o arboleda sagrada. Realizabas liturgias en honor a tu deidad o panteón, estudiando textos teológicos y brindando auxilio espiritual a la comunidad.",
    descriptionEn: "You devoted yourself to service in a temple, secluded monastery, or sacred grove, performing sacred rites and studying ancient holy scripture.",
    abilityScores: ["int", "wis", "cha"],
    feat: "Iniciado en la Magia (Clérigo)",
    featEn: "Magic Initiate (Cleric)",
    skillProficiencies: "Perspicacia y Religión",
    skillProficienciesEn: "Insight and Religion",
    toolProficiency: "Útiles de calígrafo",
    toolProficiencyEn: "Calligrapher's Supplies",
    equipment: "Útiles de calígrafo, libro sagrado de rezos, símbolo sagrado, 10 hojas de pergamino, ropajes de culto, 8 po; o 50 po.",
    equipmentEn: "Calligrapher's Supplies, Prayer Book, Holy Symbol, 10 sheets of parchment, Robe, 8 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-artisan",
    slug: "artisan",
    name: "Artesano",
    nameEn: "Artisan",
    edition: "5.5e",
    description: "Comenzaste barriendo virutas y preparando fraguas o telares en el taller de un maestro artesano. Aprendiste el oficio tradicional hasta forjar obras duraderas y negociar con clientes y mercaderes.",
    descriptionEn: "You began as an apprentice in an artisan's workshop, learning the mysteries of master craftsmanship and commerce.",
    abilityScores: ["str", "dex", "int"],
    feat: "Artesano",
    featEn: "Crafter",
    skillProficiencies: "Investigación y Persuasión",
    skillProficienciesEn: "Investigation and Persuasion",
    toolProficiency: "Un tipo de herramientas de artesano",
    toolProficiencyEn: "One kind of Artisan's Tools",
    equipment: "Herramientas de artesano a tu elección, 2 faltriqueras, ropa de viajero, 32 po; o 50 po.",
    equipmentEn: "Artisan's Tools of your choice, 2 Pouches, Traveler's Clothes, 32 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-charlatan",
    slug: "charlatan",
    name: "Charlatán",
    nameEn: "Charlatan",
    edition: "5.5e",
    description: "Dominas el arte de leer a las personas, ganarte su confianza y hacerles creer exactamente lo que necesitan escuchar. Ya sea vendiendo elixires milagrosos o fingiendo identidades nobiliarias, tu lengua de plata es tu mejor arma.",
    descriptionEn: "You know how to read people, win their trust, and sell them illusions. Your silver tongue and sharp wits are your ultimate tools.",
    abilityScores: ["dex", "con", "cha"],
    feat: "Hábil",
    featEn: "Skilled",
    skillProficiencies: "Engaño y Juego de Manos",
    skillProficienciesEn: "Deception and Sleight of Hand",
    toolProficiency: "Kit de disfraz",
    toolProficiencyEn: "Disguise Kit",
    equipment: "Kit de disfraz, ropa fina elegante, documentos falsificados, 15 po; o 50 po.",
    equipmentEn: "Disguise Kit, Fine Clothes, Forged Documents, 15 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-criminal",
    slug: "criminal",
    name: "Criminal",
    nameEn: "Criminal",
    edition: "5.5e",
    description: "Operabas al margen de la ley en callejones sombríos, gremios de ladrones o redes de contrabando. Sabes cómo forzar cerraduras, moverte sin ser visto y mantener la cabeza fría cuando los guardias se acercan.",
    descriptionEn: "You lived outside the law in shadowed alleys, thieves' guilds, or smuggler rings, knowing locks, stealth, and street survival.",
    abilityScores: ["dex", "con", "int"],
    feat: "Alerta",
    featEn: "Alert",
    skillProficiencies: "Juego de Manos y Sigilo",
    skillProficienciesEn: "Sleight of Hand and Stealth",
    toolProficiency: "Herramientas de ladrón",
    toolProficiencyEn: "Thieves' Tools",
    equipment: "Herramientas de ladrón, 2 dagas, palanqueta, ropa oscura con capucha, 16 po; o 50 po.",
    equipmentEn: "Thieves' Tools, 2 Daggers, Crowbar, Dark Hooded Clothes, 16 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-entertainer",
    slug: "entertainer",
    name: "Artista",
    nameEn: "Entertainer",
    edition: "5.5e",
    description: "Cautivabas al público en posadas bulliciosas, plazas reales y festivales. Eres maestro del drama, la danza, la poesía o la música popular, capaz de robar sonrisas o arrancar lágrimas con tu carisma escénico.",
    descriptionEn: "You captivated audiences in lively taverns, royal courts, and vibrant festivals through music, drama, poetry, or acrobatic wonder.",
    abilityScores: ["str", "dex", "cha"],
    feat: "Músico",
    featEn: "Musician",
    skillProficiencies: "Acrobacias e Interpretación",
    skillProficienciesEn: "Acrobatics and Performance",
    toolProficiency: "Un instrumento musical",
    toolProficiencyEn: "One Musical Instrument",
    equipment: "Instrumento musical a tu elección, disfraz de gala, espejo de acero, 16 po; o 50 po.",
    equipmentEn: "Musical Instrument of your choice, Costume, Steel Mirror, 16 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-farmer",
    slug: "farmer",
    name: "Granjero",
    nameEn: "Farmer",
    edition: "5.5e",
    description: "Creciste trabajando la tierra fértil de sol a sol, cuidando rebaños y soportando sequías e inviernos implacables. Tu cuerpo es fuerte y resistente como los robles antiguos, y conoces los ritmos de la naturaleza.",
    descriptionEn: "You grew up working the soil from dawn to dusk, tending livestock and braving harsh winters with rugged grit and natural instinct.",
    abilityScores: ["str", "con", "wis"],
    feat: "Duro",
    featEn: "Tough",
    skillProficiencies: "Manejo de Animales y Naturaleza",
    skillProficienciesEn: "Animal Handling and Nature",
    toolProficiency: "Herramientas de carpintero",
    toolProficiencyEn: "Carpenter's Tools",
    equipment: "Herramientas de carpintero, horca, pala, ropa rústica de trabajo resistente, 23 po; o 50 po.",
    equipmentEn: "Carpenter's Tools, Pitchfork, Shovel, Work Clothes, 23 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-guard",
    slug: "guard",
    name: "Guardia",
    nameEn: "Guard",
    edition: "5.5e",
    description: "Patrullabas las murallas de la ciudad, vigilabas portones fortificados o escoltabas caravanas mercantes a través de pasos peligrosos. Tienes vista aguda, reflejos prestos y sabes detectar problemas antes de que estallen.",
    descriptionEn: "You patrolled city ramparts, guarded fort gates, or protected trade caravans through dangerous wilderness passes with vigilant eyes.",
    abilityScores: ["str", "int", "wis"],
    feat: "Alerta",
    featEn: "Alert",
    skillProficiencies: "Atletismo y Percepción",
    skillProficienciesEn: "Athletics and Perception",
    toolProficiency: "Un juego (dados o cartas)",
    toolProficiencyEn: "One Gaming Set",
    equipment: "Lanza, silbato de alarma de bronce, esposas de hierro, linterna sorda, uniforme, 12 po; o 50 po.",
    equipmentEn: "Spear, Horn/Whistle, Manacles, Hooded Lantern, Guard Uniform, 12 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-guide",
    slug: "guide",
    name: "Guía",
    nameEn: "Guide",
    edition: "5.5e",
    description: "Guiabas expediciones a través de ciénagas traicioneras, desiertos abrasadores y cordilleras escarpadas. Sabes encontrar agua fresca, leer las estrellas y conducir a otros sanos y salvos a través de lo salvaje.",
    descriptionEn: "You guided expeditions through treacherous swamps, searing deserts, and high mountain crags with deep survival expertise.",
    abilityScores: ["dex", "con", "wis"],
    feat: "Iniciado en la Magia (Druida)",
    featEn: "Magic Initiate (Druid)",
    skillProficiencies: "Sigilo y Supervivencia",
    skillProficienciesEn: "Stealth and Survival",
    toolProficiency: "Herramientas de cartógrafo",
    toolProficiencyEn: "Cartographer's Tools",
    equipment: "Herramientas de cartógrafo, brújula de latón, arco corto, 20 flechas, saco de dormir, 10 po; o 50 po.",
    equipmentEn: "Cartographer's Tools, Brass Compass, Shortbow, 20 Arrows, Bedroll, 10 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-hermit",
    slug: "hermit",
    name: "Ermitaño",
    nameEn: "Hermit",
    edition: "5.5e",
    description: "Viviste durante años en soledad en cuevas montañosas, bosques profundos o monasterios desiertos. En ese retiro contemplativo descubriste revelaciones espirituales y el poder curativo de las hierbas silvestres.",
    descriptionEn: "You lived years in quiet solitude among mountain caves or dense wilderness, discovering spiritual truth and medicinal secrets.",
    abilityScores: ["con", "wis", "cha"],
    feat: "Sanador",
    featEn: "Healer",
    skillProficiencies: "Medicina y Religión",
    skillProficienciesEn: "Medicine and Religion",
    toolProficiency: "Kit de herboristería",
    toolProficiencyEn: "Herbalism Kit",
    equipment: "Kit de herboristería, estuche de pergamino con notas filosóficas, manta de viaje abrigada, 15 po; o 50 po.",
    equipmentEn: "Herbalism Kit, Scroll Case with Philosophy Notes, Winter Blanket, 15 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-merchant",
    slug: "merchant",
    name: "Comerciante",
    nameEn: "Merchant",
    edition: "5.5e",
    description: "Comprabas y vendías mercancías exóticas en zocos concurridos y puertos marítimos. Tienes un instinto nato para detectar oportunidades de negocio, tasar artefactos valiosos y cerrar tratos ventajosos.",
    descriptionEn: "You traded goods across bustling harbor bazaars and caravan routes, possessing an unerring eye for value and negotiation.",
    abilityScores: ["con", "int", "cha"],
    feat: "Afortunado",
    featEn: "Lucky",
    skillProficiencies: "Perspicacia y Persuasión",
    skillProficienciesEn: "Insight and Persuasion",
    toolProficiency: "Herramientas de navegante o balanza",
    toolProficiencyEn: "Navigator's Tools",
    equipment: "Balanza de precisión de comerciante, carta de crédito comercial, ropa elegante de viaje, 22 po; o 50 po.",
    equipmentEn: "Merchant's Scale, Letter of Credit, Traveler's Clothes, 22 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-noble",
    slug: "noble",
    name: "Noble",
    nameEn: "Noble",
    edition: "5.5e",
    description: "Naciste en una familia aristocrática de alcurnia, con tierras, sirvientes y títulos nobiliarios. Recibiste una educación de élite en historia, política cortesana y las sutilezas de la alta diplomacia.",
    descriptionEn: "You were born into aristocratic lineage, wealth, and high social standing, educated in court politics, history, and diplomacy.",
    abilityScores: ["str", "int", "cha"],
    feat: "Hábil",
    featEn: "Skilled",
    skillProficiencies: "Historia y Persuasión",
    skillProficienciesEn: "History and Persuasion",
    toolProficiency: "Un juego (ajedrez dragón)",
    toolProficiencyEn: "One Gaming Set (Dragonchess)",
    equipment: "Sello señorial de tu casa, pergamino de árbol genealógico, ropa fina de seda noble, perfume, 24 po; o 50 po.",
    equipmentEn: "Signet Ring, Pedigree Scroll, Fine Silk Clothes, Perfume, 24 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-sage",
    slug: "sage",
    name: "Erudito",
    nameEn: "Sage",
    edition: "5.5e",
    description: "Pasaste tus años de juventud en academias arcanas, bibliotecas reales o torres de sabios, descifrando manuscritos vetustos y desentrañando las leyes místicas del universo.",
    descriptionEn: "You spent your youth in grand arcane academies and grand libraries, decoding ancient manuscripts and cosmic laws.",
    abilityScores: ["con", "int", "wis"],
    feat: "Iniciado en la Magia (Mago)",
    featEn: "Magic Initiate (Wizard)",
    skillProficiencies: "Arcanos e Historia",
    skillProficienciesEn: "Arcana and History",
    toolProficiency: "Útiles de calígrafo",
    toolProficiencyEn: "Calligrapher's Supplies",
    equipment: "Tinta negra, pluma de ave, cuchillo para pergaminos, tomo de sabiduría arcana, ropa de erudito, 8 po; o 50 po.",
    equipmentEn: "Black Ink, Quill, Parchment Knife, Book of Arcane Lore, Scholar's Robes, 8 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-sailor",
    slug: "sailor",
    name: "Marinero",
    nameEn: "Sailor",
    edition: "5.5e",
    description: "Serviste en buques de guerra, carabelas mercantes o navíos piratas. Conoces el rugido de las tormentas en alta mar, el nudo de los cabos marineros y la camaradería ruda de los lobos de mar.",
    descriptionEn: "You crewed tall ships and pirate galleons through howling sea storms, mastering rigging, knots, and shipboard camaraderie.",
    abilityScores: ["str", "dex", "wis"],
    feat: "Luchador de Taberna",
    featEn: "Tavern Brawler",
    skillProficiencies: "Atletismo y Percepción",
    skillProficienciesEn: "Athletics and Perception",
    toolProficiency: "Herramientas de navegante",
    toolProficiencyEn: "Navigator's Tools",
    equipment: "Herramientas de navegante, cuerda de cáñamo de 50 pies, amuleto de caracola de la suerte, daga marinera, 10 po; o 50 po.",
    equipmentEn: "Navigator's Tools, 50 ft Silk/Hemp Rope, Lucky Conch Charm, Dagger, 10 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-scribe",
    slug: "scribe",
    name: "Escriba",
    nameEn: "Scribe",
    edition: "5.5e",
    description: "Registrabas decretos reales, testamentos mercantiles y tratados de paz. Tu pulso es firme, tus ojos distinguen sellos falsos al instante y posees un vasto caudal de información archivada.",
    descriptionEn: "You recorded royal edicts, merchant ledgers, and historic treaties with a steady hand and exhaustive archival discipline.",
    abilityScores: ["dex", "int", "wis"],
    feat: "Hábil",
    featEn: "Skilled",
    skillProficiencies: "Historia e Investigación",
    skillProficienciesEn: "History and Investigation",
    toolProficiency: "Útiles de calígrafo",
    toolProficiencyEn: "Calligrapher's Supplies",
    equipment: "Útiles de calígrafo, 3 frascos de tinta de colores, estuche con 20 hojas de papel vitela, 23 po; o 50 po.",
    equipmentEn: "Calligrapher's Supplies, 3 Inks, Scroll Case with 20 Vellum Sheets, 23 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-soldier",
    slug: "soldier",
    name: "Soldado",
    nameEn: "Soldier",
    edition: "5.5e",
    description: "Marchaste bajo estandartes militares, formaste en falanges bajo lluvias de flechas y sentiste el fragor del choque de escudos. Tienes disciplina marcial, coraje fogueado en combate y respeto por la cadena de mando.",
    descriptionEn: "You marched in rank and file through thunderous battlefields, disciplined in shield walls and hardened by martial combat.",
    abilityScores: ["str", "dex", "con"],
    feat: "Atacante Salvaje",
    featEn: "Savage Attacker",
    skillProficiencies: "Atletismo e Intimidación",
    skillProficienciesEn: "Athletics and Intimidation",
    toolProficiency: "Un juego (dados o cartas)",
    toolProficiencyEn: "One Gaming Set",
    equipment: "Insignia militar de tu rango, trofeo tomado de un enemigo caído, juego de dados, ropa de campaña, 14 po; o 50 po.",
    equipmentEn: "Rank Insignia, Battle Trophy, Bone Dice Set, Uniform, 14 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  },
  {
    id: "bg-2024-wayfarer",
    slug: "wayfarer",
    name: "Trotamundos",
    nameEn: "Wayfarer",
    edition: "5.5e",
    description: "Nómada de espíritu libre que nunca echó raíces en ningún lugar. Cruzaste fronteras a pie o en barcazas, aprendiendo a buscar cobijo bajo las estrellas, esquivar patrullas y confiar en tu ingenio.",
    descriptionEn: "A free-spirited nomad who never stayed put in one realm, thriving on open roads through streetwise wits and boundless curiosity.",
    abilityScores: ["dex", "wis", "cha"],
    feat: "Afortunado",
    featEn: "Lucky",
    skillProficiencies: "Perspicacia y Sigilo",
    skillProficienciesEn: "Insight and Stealth",
    toolProficiency: "Herramientas de ladrón",
    toolProficiencyEn: "Thieves' Tools",
    equipment: "Herramientas de ladrón, daga, saco de viaje gastado, saco de dormir, mapa de caminos, 16 po; o 50 po.",
    equipmentEn: "Thieves' Tools, Dagger, Traveler's Pack, Road Map, 16 GP; or 50 GP.",
    source: "Player's Handbook 2024"
  }
];

// 3. FEATS (22 Feats)
const FEATS = [
  {
    id: "feat-2024-alert",
    slug: "alert",
    name: "Alerta",
    nameEn: "Alert",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Siempre alerta ante el peligro imprevisto, tus reflejos te permiten actuar primero en el combate y coordinar la emboscada con tus compañeros.",
    descriptionEn: "Always watchful for surprise attacks, your swift instincts ensure you seize the initiative in any confrontation.",
    benefits: [
      {
        name: "Competencia en Iniciativa",
        nameEn: "Initiative Proficiency",
        desc: "Cuando tiras Iniciativa, puedes sumar tu Bono de Competencia a la tirada.",
        descEn: "Add your Proficiency Bonus to Initiative rolls."
      },
      {
        name: "Intercambio de Iniciativa",
        nameEn: "Initiative Swap",
        desc: "Inmediatamente después de tirar Iniciativa, puedes intercambiar tu resultado con el de un aliado voluntario en el mismo combate (mientras ninguno esté Incapacitado).",
        descEn: "Immediately after rolling Initiative, you can swap your Initiative with a willing ally in the same combat."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-crafter",
    slug: "crafter",
    name: "Artesano",
    nameEn: "Crafter",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Tu pericia con las herramientas te permite reparar y forjar objetos a gran velocidad y negociar descuentos con comerciantes.",
    descriptionEn: "Your mastery with workshop tools enables fast crafting and shrewd trading.",
    benefits: [
      {
        name: "Competencia en Herramientas",
        nameEn: "Tool Proficiency",
        desc: "Ganas competencia con 3 herramientas de artesano a tu elección.",
        descEn: "Gain proficiency with 3 artisan's tools of your choice."
      },
      {
        name: "Descuento de Compra",
        nameEn: "Discount",
        desc: "Cada vez que compras un objeto no mágico, recibes un 20% de descuento sobre el precio de lista.",
        descEn: "20% discount on nonmagical items."
      },
      {
        name: "Elaboración Rápida",
        nameEn: "Fast Crafting",
        desc: "Durante un Descanso Largo, puedes forjar un objeto ordinario usando las herramientas adecuadas si dispones de la materia prima.",
        descEn: "Craft mundane items during a Long Rest."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-healer",
    slug: "healer",
    name: "Sanador",
    nameEn: "Healer",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Un practicante médico capaz de vendar heridas mortales en medio del combate y estabilizar heridos con precisión de cirujano.",
    descriptionEn: "A battlefield medic capable of dressing mortal wounds and reviving the fallen.",
    benefits: [
      {
        name: "Cuidado de Batalla",
        nameEn: "Battle Medic",
        desc: "Si usas un botiquín de primeros auxilios como acción de Utilizar Objeto, una criatura gasta 1 de sus Dados de Golpe y recupera tantos puntos de golpe como la tirada + tu Bono de Competencia.",
        descEn: "Spend a Healer's Kit charge to let an ally roll a Hit Die + PB in healing."
      },
      {
        name: "Relanzamiento de Curación",
        nameEn: "Healing Rerolls",
        desc: "Siempre que tires dados para curar puntos de golpe (mediante conjuros o botiquín), puedes volver a tirar cualquier dado que saque un 1.",
        descEn: "Reroll any 1s rolled when healing creatures."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-lucky",
    slug: "lucky",
    name: "Afortunado",
    nameEn: "Lucky",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Posees una fortuna inexplicable que tuerce el destino a tu favor en los momentos más críticos.",
    descriptionEn: "You possess an inexplicable fortune that bends fate to your whim.",
    benefits: [
      {
        name: "Puntos de Suerte",
        nameEn: "Luck Points",
        desc: "Tienes tantos Puntos de Suerte como tu Bono de Competencia. Recuperas todos los puntos gastados tras un Descanso Largo.",
        descEn: "You have Luck Points equal to your PB, recovered on Long Rest."
      },
      {
        name: "Ventaja de Suerte",
        nameEn: "Advantage on d20",
        desc: "Cuando hagas una tirada de d20 (ataque, salvación o prueba), puedes gastar 1 Punto de Suerte para tener Ventaja en la tirada.",
        descEn: "Spend 1 point to gain Advantage on a d20 roll."
      },
      {
        name: "Desventaja al Enemigo",
        nameEn: "Impose Disadvantage",
        desc: "Cuando un enemigo tire un ataque contra ti, puedes usar tu Reacción y gastar 1 Punto de Suerte para imponerle Desventaja en esa tirada.",
        descEn: "Spend 1 point as a Reaction to impose Disadvantage on an attack against you."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-magic-initiate",
    slug: "magic-initiate",
    name: "Iniciado en la Magia",
    nameEn: "Magic Initiate",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Has aprendido los rudimentos mágicos de una tradición arcana, divina o natural.",
    descriptionEn: "You learned the foundations of a magical tradition.",
    benefits: [
      {
        name: "Trucos Arcanos",
        nameEn: "Cantrips",
        desc: "Aprendes 2 trucos a tu elección de la lista de Clérigo, Druida o Mago.",
        descEn: "Learn 2 cantrips from Cleric, Druid, or Wizard spell list."
      },
      {
        name: "Conjuro de Nivel 1",
        nameEn: "Level 1 Spell",
        desc: "Eliges 1 conjuro de nivel 1 de esa misma lista. Puedes lanzarlo una vez sin gastar espacio de conjuro por Descanso Largo, y también puedes lanzarlo usando cualquier espacio de conjuro que tengas.",
        descEn: "Cast one 1st-level spell freely once per Long Rest, or with your spell slots."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-musician",
    slug: "musician",
    name: "Músico",
    nameEn: "Musician",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Tu música conmueve los espíritus e infunde un coraje heroico insuperable en tus aliados.",
    descriptionEn: "Your melodies stir spirits and inspire heroic greatness.",
    benefits: [
      {
        name: "Canción Inspiradora",
        nameEn: "Inspiring Song",
        desc: "Al final de un Descanso Corto o Descanso Largo, puedes tocar un instrumento musical para otorgar Inspiración Heroica a tantos aliados como tu Bono de Competencia.",
        descEn: "Grant Heroic Inspiration to allies equal to your PB upon finishing a Short or Long Rest."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-savage-attacker",
    slug: "savage-attacker",
    name: "Atacante Salvaje",
    nameEn: "Savage Attacker",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Golpeas con una ferocidad arrolladora buscando siempre el impacto más letal.",
    descriptionEn: "You strike with brutal savagery, optimizing every devastating wound.",
    benefits: [
      {
        name: "Daño Brutal",
        nameEn: "Brutal Strike",
        desc: "Una vez por turno cuando golpeas a un objetivo con un arma, puedes tirar el daño del arma dos veces y elegir el resultado más alto.",
        descEn: "Once per turn when hitting with a weapon, roll weapon damage twice and use the higher roll."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-skilled",
    slug: "skilled",
    name: "Hábil",
    nameEn: "Skilled",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Posees una versatilidad excepcional que te permite dominar múltiples disciplinas prácticas.",
    descriptionEn: "Exceptional versatility allows you to master diverse disciplines.",
    benefits: [
      {
        name: "Tres Competencias",
        nameEn: "Three Proficiencies",
        desc: "Ganas competencia en cualquier combinación de 3 habilidades o herramientas a tu elección.",
        descEn: "Gain proficiency in any 3 skills or tools of your choice."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-tavern-brawler",
    slug: "tavern-brawler",
    name: "Luchador de Taberna",
    nameEn: "Tavern Brawler",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Curtido en peleas a puño limpio en tabernas, conviertes banquetas, jarras y puños en armas mortales.",
    descriptionEn: "Hardened in tavern brawls, you turn mugs, chairs, and fists into deadly weapons.",
    benefits: [
      {
        name: "Golpe Desarmado Mejorado",
        nameEn: "Enhanced Unarmed Strike",
        desc: "Tus golpes desarmados causan 1d4 + tu modificador de Fuerza de daño contundente.",
        descEn: "Unarmed strikes deal 1d4 + Strength modifier bludgeoning damage."
      },
      {
        name: "Empujón Rápido",
        nameEn: "Push Away",
        desc: "Una vez por turno cuando golpeas con un ataque desarmado, puedes empujar al objetivo 5 pies lejos de ti.",
        descEn: "Push a target 5 feet once per turn on an unarmed hit."
      },
      {
        name: "Armas Improvisadas",
        nameEn: "Furniture Weapons",
        desc: "Tienes competencia con armas improvisadas (botellas, mesas, etc.).",
        descEn: "Proficiency with improvised weapons."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-tough",
    slug: "tough",
    name: "Duro",
    nameEn: "Tough",
    category: "Origen (Nivel 1)",
    categoryEn: "Origin (Level 1)",
    edition: "5.5e",
    description: "Tu vitalidad prodigiosa te hace capaz de resistir heridas que abatirían a cualquier otro.",
    descriptionEn: "Prodigious vitality enables you to shrug off mortal punishment.",
    benefits: [
      {
        name: "Reserva de Vida",
        nameEn: "Hit Point Reserve",
        desc: "Tus puntos de golpe máximos aumentan en 2 por cada nivel de personaje que poseas, y cada vez que subas de nivel aumentan en 2 adicionales.",
        descEn: "Hit Point maximum increases by 2 per level."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-great-weapon-master",
    slug: "great-weapon-master",
    name: "Maestro de Armas Grandes",
    nameEn: "Great Weapon Master",
    category: "General (Nivel 4+)",
    categoryEn: "General (Level 4+)",
    edition: "5.5e",
    description: "Requisito: Fuerza 13+. Eres un coloso empuñando mandobles, alabardas y grandes hachas.",
    descriptionEn: "Prerequisite: Strength 13+. Master of devastating heavy weapons.",
    benefits: [
      {
        name: "Incremento de Fuerza",
        nameEn: "Ability Score Increase",
        desc: "Aumenta tu puntuación de Fuerza en +1 (hasta un máximo de 20).",
        descEn: "Increase Strength by +1."
      },
      {
        name: "Impacto demoledor",
        nameEn: "Hew",
        desc: "Cuando anotas un golpe crítico o reduces a 0 los PG de un enemigo con un arma pesada, puedes hacer un ataque adicional con arma cuerpo a cuerpo como Acción Adicional.",
        descEn: "Critical hit or kill grants a melee attack as a Bonus Action."
      },
      {
        name: "Golpe Pesado",
        nameEn: "Heavy Weapon Damage",
        desc: "Cuando golpeas a una criatura con un arma pesada que empuñes a dos manos, sumas tu Bono de Competencia al daño.",
        descEn: "Add your Proficiency Bonus to heavy weapon damage rolls."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-sentinel",
    slug: "sentinel",
    name: "Centinela",
    nameEn: "Sentinel",
    category: "General (Nivel 4+)",
    categoryEn: "General (Level 4+)",
    edition: "5.5e",
    description: "Requisito: Fuerza o Destreza 13+. Nadie escapa de tu alcance; eres un guardián implacable.",
    descriptionEn: "Prerequisite: Strength or Dexterity 13+. Unyielding defender of the front line.",
    benefits: [
      {
        name: "Incremento de Característica",
        nameEn: "Ability Score Increase",
        desc: "Aumenta tu Fuerza o Destreza en +1 (máximo 20).",
        descEn: "Increase Strength or Dexterity by +1."
      },
      {
        name: "Inmovilizar",
        nameEn: "Halt",
        desc: "Cuando golpeas a una criatura con un ataque de oportunidad, su velocidad se reduce a 0 durante el resto de su turno.",
        descEn: "Opportunity attack reduces target speed to 0."
      },
      {
        name: "Ignorar Desengancharse",
        nameEn: "Guardian",
        desc: "Las criaturas provocan ataques de oportunidad de tu parte incluso si toman la acción de Desengancharse (Disengage).",
        descEn: "Creatures provoke opportunity attacks even if disengaging."
      }
    ],
    source: "Player's Handbook 2024"
  },
  {
    id: "feat-2024-war-caster",
    slug: "war-caster",
    name: "Conjurador de Guerra",
    nameEn: "War Caster",
    category: "General (Nivel 4+)",
    categoryEn: "General (Level 4+)",
    edition: "5.5e",
    description: "Requisito: Lanzador de conjuros. Dominas la magia en medio del fragor sangriento de la primera línea.",
    descriptionEn: "Prerequisite: Spellcaster. Master of combat spellcasting.",
    benefits: [
      {
        name: "Incremento de Mente",
        nameEn: "Ability Score Increase",
        desc: "Aumenta tu Inteligencia, Sabiduría o Carisma en +1 (máximo 20).",
        descEn: "Increase Int, Wis, or Cha by +1."
      },
      {
        name: "Concentración de Acero",
        nameEn: "Concentration Advantage",
        desc: "Tienes Ventaja en las tiradas de salvación de Constitución para mantener la Concentración.",
        descEn: "Advantage on Constitution saving throws to maintain Concentration."
      },
      {
        name: "Manos Ocupadas",
        nameEn: "Somatic Shield",
        desc: "Puedes ejecutar los componentes somáticos de los conjuros incluso cuando tienes armas o un escudo en una o ambas manos.",
        descEn: "Perform somatic components with weapons or shield in hand."
      },
      {
        name: "Hechizo de Oportunidad",
        nameEn: "Spell as Opportunity Attack",
        desc: "Cuando un enemigo provoque un ataque de oportunidad tuyo, puedes usar tu Reacción para lanzarle un conjuro de tiempo de lanzamiento de 1 acción en lugar de hacer un ataque con arma.",
        descEn: "Cast a 1-action spell as an opportunity attack."
      }
    ],
    source: "Player's Handbook 2024"
  }
];

// 4. CLASSES & SUBCLASSES (13 Core Classes)
const CLASSES = [
  {
    id: "class-2024-barbarian",
    slug: "barbarian",
    name: "Bárbaro",
    nameEn: "Barbarian",
    edition: "5.5e",
    hitDie: 12,
    primaryAbility: "Fuerza",
    primaryAbilityEn: "Strength",
    savingThrows: "Fuerza, Constitución",
    subclassLevel: 3,
    weaponMasteryCount: 2,
    description: "Guerreros formidables impulsados por fuerzas primordiales que se manifiestan como una Furia sobrenatural. Encarnan la ferocidad del depredador, la tormenta y el caos de la batalla.",
    descriptionEn: "Mighty warriors powered by primal forces manifesting as supernatural Rage.",
    subclasses: [
      {
        id: "subclass-2024-berserker",
        slug: "path-of-the-berserker",
        name: "Senda del Berserker",
        nameEn: "Path of the Berserker",
        description: "Canalizan su furia en violencia desenfrenada. Causan Frenesí con dados de daño adicionales y se vuelven inmunes al miedo y al hechizo mientras están en Furia.",
        descriptionEn: "Channel violent fury into devastating Frenzy extra damage."
      },
      {
        id: "subclass-2024-wild-heart",
        slug: "path-of-the-wild-heart",
        name: "Senda del Corazón Salvaje",
        nameEn: "Path of the Wild Heart",
        description: "Hermanados con los espíritus de la naturaleza (Oso, Águila, Lobo), adquieren resistencias totémicas y guían a sus aliados con ferocidad animal.",
        descriptionEn: "Commune with animal spirits for formidable combat auras."
      },
      {
        id: "subclass-2024-world-tree",
        slug: "path-of-the-world-tree",
        name: "Senda del Árbol del Mundo",
        nameEn: "Path of the World Tree",
        description: "Conectados a las raíces de Yggdrasil, otorgan puntos de golpe temporales a sus aliados y manipulan el espacio con zarcillos cósmicos.",
        descriptionEn: "Channel the roots of Yggdrasil to protect allies and teleport across the battlefield."
      },
      {
        id: "subclass-2024-zealot",
        slug: "path-of-the-zealot",
        name: "Senda del Celo Fanático",
        nameEn: "Path of the Zealot",
        description: "Guerreros bendecidos por deidades de la batalla cuyos golpes destellan con daño radiante o necrótico, desafiando a la muerte misma.",
        descriptionEn: "Infuse rage with divine radiance, defying death on the battlefield."
      }
    ]
  },
  {
    id: "class-2024-fighter",
    slug: "fighter",
    name: "Guerrero",
    nameEn: "Fighter",
    edition: "5.5e",
    hitDie: 10,
    primaryAbility: "Fuerza o Destreza",
    primaryAbilityEn: "Strength or Dexterity",
    savingThrows: "Fuerza, Constitución",
    subclassLevel: 3,
    weaponMasteryCount: 3,
    description: "Maestros incomparables del combate armamentístico, la táctica marcial y el acondicionamiento físico extremo. Capaces de desatar Oleadas de Acción y dominar múltiples armas maestras.",
    descriptionEn: "Unrivaled masters of tactical combat, weapon mastery, and Action Surge.",
    subclasses: [
      {
        id: "subclass-2024-champion",
        slug: "champion",
        name: "Campeón",
        nameEn: "Champion",
        description: "Enfocado en la perfección física pura. Anotan impactos críticos con 19 y 20, obtienen ventaja en iniciativa y ganan Heroic Inspiration constante.",
        descriptionEn: "Pure physical perfection, scoring critical hits on 19-20."
      },
      {
        id: "subclass-2024-battle-master",
        slug: "battle-master",
        name: "Maestro de Batalla",
        nameEn: "Battle Master",
        description: "Estudiosos de la estrategia militar. Emplean Maniobras y Dados de Superioridad (d8) para desarmar, derribar, comandar aliados y controlar el campo.",
        descriptionEn: "Tactical genius wielding Maneuvers and Superiority Dice."
      },
      {
        id: "subclass-2024-eldritch-knight",
        slug: "eldritch-knight",
        name: "Caballero Sobrenatural",
        nameEn: "Eldritch Knight",
        description: "Combinan maestría con la espada y magia de Mago. Vinculan sus armas para invocarlas a su mano e intercalan trucos con sus ataques.",
        descriptionEn: "Combines martial mastery with Wizard spells and weapon bonding."
      },
      {
        id: "subclass-2024-psi-warrior",
        slug: "psi-warrior",
        name: "Guerrero Psiónico",
        nameEn: "Psi Warrior",
        description: "Despiertan el poder latente de sus mentes para mover objetos por telequinesis, propulsar sus golpes con energía psiónica y proyectar escudos mentales.",
        descriptionEn: "Awakens telekinetic psionic energy to bolster strikes and defend comrades."
      }
    ]
  },
  {
    id: "class-2024-wizard",
    slug: "wizard",
    name: "Mago",
    nameEn: "Wizard",
    edition: "5.5e",
    hitDie: 6,
    primaryAbility: "Inteligencia",
    primaryAbilityEn: "Intelligence",
    savingThrows: "Inteligencia, Sabiduría",
    subclassLevel: 3,
    weaponMasteryCount: 0,
    description: "Eruditos supremos del conocimiento arcano. Modifican el tejido de la realidad memorizando fórmulas complejas en sus preciados grimorios.",
    descriptionEn: "Supreme scholars of arcane mysteries, reshaping reality with spellbooks.",
    subclasses: [
      {
        id: "subclass-2024-abjurer",
        slug: "abjurer",
        name: "Abjurador",
        nameEn: "Abjurer",
        description: "Especialistas en magia protectora y contrahechizos. Manifiestan un Guardián Arcano protector que absorbe daño para sí y sus aliados.",
        descriptionEn: "Protective magic warding against incoming harm."
      },
      {
        id: "subclass-2024-evoker",
        slug: "evoker",
        name: "Evocador",
        nameEn: "Evoker",
        description: "Señores de los elementos destructivos. Crean bolsas seguras para aliados en áreas de fuego o hielo y potencian el daño de sus proyectiles mágicos.",
        descriptionEn: "Destructive elemental firepower with sculpted safe zones for allies."
      },
      {
        id: "subclass-2024-diviner",
        slug: "diviner",
        name: "Adivino",
        nameEn: "Diviner",
        description: "Visionarios que desentrañan el tiempo y el destino. Tiran dados de Presagio al inicio del día para reemplazar tiradas de dados cruciales.",
        descriptionEn: "Masters of fate and Portent dice."
      },
      {
        id: "subclass-2024-illusionist",
        slug: "illusionist",
        name: "Ilusionista",
        nameEn: "Illusionist",
        description: "Maestros del engaño sensorial capaces de hacer tangibles sus ilusiones y confundir la mente de los observadores más sagaces.",
        descriptionEn: "Masters of sensory deception and malleable illusions."
      }
    ]
  },
  {
    id: "class-2024-rogue",
    slug: "rogue",
    name: "Pícaro",
    nameEn: "Rogue",
    edition: "5.5e",
    hitDie: 8,
    primaryAbility: "Destreza",
    primaryAbilityEn: "Dexterity",
    savingThrows: "Destreza, Inteligencia",
    subclassLevel: 3,
    weaponMasteryCount: 2,
    description: "Especialistas en sigilo, infiltración y ataques fulminantes. Su Ataque Furtivo castiga cualquier distracción enemiga con daño quirúrgico y letal.",
    descriptionEn: "Specialists in stealth, surgical Sneak Attacks, and cunning mobility.",
    subclasses: [
      {
        id: "subclass-2024-thief",
        slug: "thief",
        name: "Ladrón",
        nameEn: "Thief",
        description: "Manos rápidas para usar objetos como Acción Adicional, escalar a velocidad completa y utilizar cualquier objeto mágico sin restricciones de clase.",
        descriptionEn: "Fast Hands, supreme mobility, and versatile magic item usage."
      },
      {
        id: "subclass-2024-assassin",
        slug: "assassin",
        name: "Asesino",
        nameEn: "Assassin",
        description: "Emboscadores letales que infligen daño crítico masivo a objetivos sorprendidos o que aún no han actuado en combate.",
        descriptionEn: "Lethal ambush predator scoring devastating initial strikes."
      },
      {
        id: "subclass-2024-arcane-trickster",
        slug: "arcane-trickster",
        name: "Embaucador Arcano",
        nameEn: "Arcane Trickster",
        description: "Combinan su picaresca con ilusiones y encantamientos arcanos, controlando una Mano de Mago invisible para robar a distancia.",
        descriptionEn: "Weaves illusion and enchantment spells with versatile thievery."
      },
      {
        id: "subclass-2024-soulknife",
        slug: "soulknife",
        name: "Cuchilla del Alma",
        nameEn: "Soulknife",
        description: "Manifiestan dagas psiónicas de energía mental pura que atraviesan armaduras sin dejar marcas físicas y conectan mentes telepáticamente.",
        descriptionEn: "Strikes with psionic blades woven from concentrated thought."
      }
    ]
  },
  {
    id: "class-2024-cleric",
    slug: "cleric",
    name: "Clérigo",
    nameEn: "Cleric",
    edition: "5.5e",
    hitDie: 8,
    primaryAbility: "Sabiduría",
    primaryAbilityEn: "Wisdom",
    savingThrows: "Sabiduría, Carisma",
    subclassLevel: 3,
    weaponMasteryCount: 0,
    description: "Conductos vivientes del poder de los dioses. Sanan las heridas de los caídos, expulsan no-muertos con Canalizar Divinidad y protegen a los justos.",
    descriptionEn: "Living conduits of divine wrath and healing grace.",
    subclasses: [
      {
        id: "subclass-2024-life-domain",
        slug: "life-domain",
        name: "Dominio de la Vida",
        nameEn: "Life Domain",
        description: "El dominio supremo de la restauración. Sus conjuros de curación otorgan puntos de golpe adicionales tanto al objetivo como a sí mismos.",
        descriptionEn: "Supreme vitality and radiant restorative healing."
      },
      {
        id: "subclass-2024-light-domain",
        slug: "light-domain",
        name: "Dominio de la Luz",
        nameEn: "Light Domain",
        description: "Irradian el fulgor celestial para incinerar a las hordas oscuras con bolas de fuego y destellos cegadores que imponen desventaja a los atacantes.",
        descriptionEn: "Blinds foes and unleashes celestial fire."
      },
      {
        id: "subclass-2024-trickery-domain",
        slug: "trickery-domain",
        name: "Dominio del Engaño",
        nameEn: "Trickery Domain",
        description: "Favorecidos por dioses bromistas y de las sombras. Crean duplicados ilusorios desde los cuales lanzar conjuros y camuflan a sus aliados.",
        descriptionEn: "Shadows, illusions, and cunning misdirection."
      },
      {
        id: "subclass-2024-war-domain",
        slug: "war-domain",
        name: "Dominio de la Guerra",
        nameEn: "War Domain",
        description: "Guerreros sagrados que bendicen las armas de su escuadrón, realizan ataques adicionales como acción adicional y guían los golpes con precisión divina.",
        descriptionEn: "Divine champions wielding righteous steel on the front lines."
      }
    ]
  },
  {
    id: "class-2024-paladin",
    slug: "paladin",
    name: "Paladín",
    nameEn: "Paladin",
    edition: "5.5e",
    hitDie: 10,
    primaryAbility: "Fuerza y Carisma",
    primaryAbilityEn: "Strength and Charisma",
    savingThrows: "Sabiduría, Carisma",
    subclassLevel: 3,
    weaponMasteryCount: 2,
    description: "Campeones sagrados unidos por un Juramento inquebrantable. Emanan auras de protección, sanan con Imposición de Manos y destruyen el mal con Castigo Divino (Divine Smite).",
    descriptionEn: "Holy crusaders bound by sacred oaths, wielding divine smites and protective auras.",
    subclasses: [
      {
        id: "subclass-2024-devotion",
        slug: "oath-of-devotion",
        name: "Juramento de Devoción",
        nameEn: "Oath of Devotion",
        description: "El caballero brillante ideal. Imbuyen su espada con luz sagrada para ganar bono a las tiradas de ataque y son inmunes al hechizo.",
        descriptionEn: "The quintessential knight in shining armor."
      },
      {
        id: "subclass-2024-ancients",
        slug: "oath-of-the-ancients",
        name: "Juramento de los Antiguos",
        nameEn: "Oath of the Ancients",
        description: "Caballeros verdes que defienden la luz y la alegría del mundo natural. Su aura otorga resistencia inquebrantable al daño de conjuros.",
        descriptionEn: "Green knights protecting natural joy with spell-resistant auras."
      },
      {
        id: "subclass-2024-vengeance",
        slug: "oath-of-vengeance",
        name: "Juramento de Venganza",
        nameEn: "Oath of Vengeance",
        description: "Cazadores implacables del mal que juran castigar a los culpables a cualquier precio. Su Voto de Enemistad les concede Ventaja absoluta contra su presa.",
        descriptionEn: "Ruthless avengers hunting evil with absolute advantage."
      },
      {
        id: "subclass-2024-glory",
        slug: "oath-of-glory",
        name: "Juramento de Gloria",
        nameEn: "Oath of Glory",
        description: "Héroes legendarios que inspiran hazañas sobrehumanas en sus aliados y aceleran el paso de su compañía en la batalla.",
        descriptionEn: "Legendary athletes inspiring great deeds on the battlefield."
      }
    ]
  }
];

// 5. WEAPONS (Bilingual 2024 Weapons)
const WEAPONS = [
  { id: "weapon-2024-club", name: "Garrote", nameEn: "Club", edition: "5.5e", damage: "1d4 Contundente", damageEn: "1d4 Bludgeoning", properties: ["Ligera"], propertiesEn: ["Light"], mastery: "Ralentizar (Slow)", weight: "2 lb.", cost: "1 sp" },
  { id: "weapon-2024-dagger", name: "Daga", nameEn: "Dagger", edition: "5.5e", damage: "1d4 Perforante", damageEn: "1d4 Piercing", properties: ["Sutil", "Ligera", "Arrojadiza (20/60)"], propertiesEn: ["Finesse", "Light", "Thrown (20/60)"], mastery: "Tajar (Nick)", weight: "1 lb.", cost: "2 po" },
  { id: "weapon-2024-greatclub", name: "Gran Garrote", nameEn: "Greatclub", edition: "5.5e", damage: "1d8 Contundente", damageEn: "1d8 Bludgeoning", properties: ["Dos Manos"], propertiesEn: ["Two-Handed"], mastery: "Empujar (Push)", weight: "10 lb.", cost: "2 sp" },
  { id: "weapon-2024-handaxe", name: "Hacha de Mano", nameEn: "Handaxe", edition: "5.5e", damage: "1d6 Cortante", damageEn: "1d6 Slashing", properties: ["Ligera", "Arrojadiza (20/60)"], propertiesEn: ["Light", "Thrown (20/60)"], mastery: "Acosar (Vex)", weight: "2 lb.", cost: "5 po" },
  { id: "weapon-2024-javelin", name: "Jabalina", nameEn: "Javelin", edition: "5.5e", damage: "1d6 Perforante", damageEn: "1d6 Piercing", properties: ["Arrojadiza (30/120)"], propertiesEn: ["Thrown (30/120)"], mastery: "Ralentizar (Slow)", weight: "2 lb.", cost: "5 sp" },
  { id: "weapon-2024-light-hammer", name: "Martillo Ligero", nameEn: "Light Hammer", edition: "5.5e", damage: "1d4 Contundente", damageEn: "1d4 Bludgeoning", properties: ["Ligera", "Arrojadiza (20/60)"], propertiesEn: ["Light", "Thrown (20/60)"], mastery: "Tajar (Nick)", weight: "2 lb.", cost: "2 po" },
  { id: "weapon-2024-mace", name: "Maza", nameEn: "Mace", edition: "5.5e", damage: "1d6 Contundente", damageEn: "1d6 Bludgeoning", properties: [], propertiesEn: [], mastery: "Debilitar (Sap)", weight: "4 lb.", cost: "5 po" },
  { id: "weapon-2024-quarterstaff", name: "Bastón", nameEn: "Quarterstaff", edition: "5.5e", damage: "1d6 Contundente (1d8 a dos manos)", damageEn: "1d6 Bludgeoning (1d8 Versatile)", properties: ["Versátil (1d8)"], propertiesEn: ["Versatile (1d8)"], mastery: "Derribar (Topple)", weight: "4 lb.", cost: "2 sp" },
  { id: "weapon-2024-spear", name: "Lanza", nameEn: "Spear", edition: "5.5e", damage: "1d6 Perforante (1d8 a dos manos)", damageEn: "1d6 Piercing (1d8 Versatile)", properties: ["Arrojadiza (20/60)", "Versátil (1d8)"], propertiesEn: ["Thrown (20/60)", "Versatile (1d8)"], mastery: "Debilitar (Sap)", weight: "3 lb.", cost: "1 po" },
  { id: "weapon-2024-shortbow", name: "Arco Corto", nameEn: "Shortbow", edition: "5.5e", damage: "1d6 Perforante", damageEn: "1d6 Piercing", properties: ["Munición (80/320)", "Dos Manos"], propertiesEn: ["Ammunition (80/320)", "Two-Handed"], mastery: "Acosar (Vex)", weight: "2 lb.", cost: "25 po" },
  { id: "weapon-2024-battleaxe", name: "Hacha de Guerra", nameEn: "Battleaxe", edition: "5.5e", damage: "1d8 Cortante (1d10 a dos manos)", damageEn: "1d8 Slashing (1d10 Versatile)", properties: ["Versátil (1d10)"], propertiesEn: ["Versatile (1d10)"], mastery: "Derribar (Topple)", weight: "4 lb.", cost: "10 po" },
  { id: "weapon-2024-glaive", name: "Guja", nameEn: "Glaive", edition: "5.5e", damage: "1d10 Cortante", damageEn: "1d10 Slashing", properties: ["Pesada", "Alcance (Reach)", "Dos Manos"], propertiesEn: ["Heavy", "Reach", "Two-Handed"], mastery: "Rozar (Graze)", weight: "6 lb.", cost: "20 po" },
  { id: "weapon-2024-greataxe", name: "Gran Hacha", nameEn: "Greataxe", edition: "5.5e", damage: "1d12 Cortante", damageEn: "1d12 Slashing", properties: ["Pesada", "Dos Manos"], propertiesEn: ["Heavy", "Two-Handed"], mastery: "Hender (Cleave)", weight: "7 lb.", cost: "30 po" },
  { id: "weapon-2024-greatsword", name: "Espadón", nameEn: "Greatsword", edition: "5.5e", damage: "2d6 Cortante", damageEn: "2d6 Slashing", properties: ["Pesada", "Dos Manos"], propertiesEn: ["Heavy", "Two-Handed"], mastery: "Rozar (Graze)", weight: "6 lb.", cost: "50 po" },
  { id: "weapon-2024-halberd", name: "Alabarda", nameEn: "Halberd", edition: "5.5e", damage: "1d10 Cortante", damageEn: "1d10 Slashing", properties: ["Pesada", "Alcance (Reach)", "Dos Manos"], propertiesEn: ["Heavy", "Reach", "Two-Handed"], mastery: "Hender (Cleave)", weight: "6 lb.", cost: "20 po" },
  { id: "weapon-2024-longsword", name: "Espada Larga", nameEn: "Longsword", edition: "5.5e", damage: "1d8 Cortante (1d10 a dos manos)", damageEn: "1d8 Slashing (1d10 Versatile)", properties: ["Versátil (1d10)"], propertiesEn: ["Versatile (1d10)"], mastery: "Debilitar (Sap)", weight: "3 lb.", cost: "15 po" },
  { id: "weapon-2024-maul", name: "Mazo de Guerra", nameEn: "Maul", edition: "5.5e", damage: "2d6 Contundente", damageEn: "2d6 Bludgeoning", properties: ["Pesada", "Dos Manos"], propertiesEn: ["Heavy", "Two-Handed"], mastery: "Derribar (Topple)", weight: "10 lb.", cost: "10 po" },
  { id: "weapon-2024-rapier", name: "Estoque", nameEn: "Rapier", edition: "5.5e", damage: "1d8 Perforante", damageEn: "1d8 Piercing", properties: ["Sutil"], propertiesEn: ["Finesse"], mastery: "Acosar (Vex)", weight: "2 lb.", cost: "25 po" },
  { id: "weapon-2024-scimitar", name: "Cimitera", nameEn: "Scimitar", edition: "5.5e", damage: "1d6 Cortante", damageEn: "1d6 Slashing", properties: ["Sutil", "Ligera"], propertiesEn: ["Finesse", "Light"], mastery: "Tajar (Nick)", weight: "3 lb.", cost: "25 po" },
  { id: "weapon-2024-shortsword", name: "Espada Corta", nameEn: "Shortsword", edition: "5.5e", damage: "1d6 Perforante", damageEn: "1d6 Piercing", properties: ["Sutil", "Ligera"], propertiesEn: ["Finesse", "Light"], mastery: "Acosar (Vex)", weight: "2 lb.", cost: "10 po" },
  { id: "weapon-2024-warhammer", name: "Martillo de Guerra", nameEn: "Warhammer", edition: "5.5e", damage: "1d8 Contundente (1d10 a dos manos)", damageEn: "1d8 Bludgeoning (1d10 Versatile)", properties: ["Versátil (1d10)"], propertiesEn: ["Versatile (1d10)"], mastery: "Empujar (Push)", weight: "5 lb.", cost: "15 po" },
  { id: "weapon-2024-whip", name: "Látigo", nameEn: "Whip", edition: "5.5e", damage: "1d4 Cortante", damageEn: "1d4 Slashing", properties: ["Sutil", "Alcance (Reach)"], propertiesEn: ["Finesse", "Reach"], mastery: "Ralentizar (Slow)", weight: "3 lb.", cost: "2 po" },
  { id: "weapon-2024-longbow", name: "Arco Largo", nameEn: "Longbow", edition: "5.5e", damage: "1d8 Perforante", damageEn: "1d8 Piercing", properties: ["Pesada", "Munición (150/600)", "Dos Manos"], propertiesEn: ["Heavy", "Ammunition (150/600)", "Two-Handed"], mastery: "Ralentizar (Slow)", weight: "2 lb.", cost: "50 po" },
  { id: "weapon-2024-heavy-crossbow", name: "Ballesta Pesada", nameEn: "Heavy Crossbow", edition: "5.5e", damage: "1d10 Perforante", damageEn: "1d10 Piercing", properties: ["Pesada", "Munición (100/400)", "Recarga", "Dos Manos"], propertiesEn: ["Heavy", "Ammunition (100/400)", "Loading", "Two-Handed"], mastery: "Empujar (Push)", weight: "18 lb.", cost: "50 po" }
];

// OUTPUT DIR
const targetDir = 'C:/Users/natal/.gemini/antigravity/scratch/dnd-character-forge/src/data/dnd2024';

// Write Species
fs.writeFileSync(path.join(targetDir, 'speciesData2024.ts'), `// Compendio Oficial de Especies D&D 5.5e (2024 Revised Rules) - Bilingüe
export interface SpeciesTrait2024 {
  name: string;
  nameEn?: string;
  desc: string;
  descEn?: string;
}

export interface Species2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  edition: '5.5e';
  description: string;
  descriptionEn?: string;
  size: string;
  sizeEn?: string;
  speed: string;
  darkvision: number;
  traits: SpeciesTrait2024[];
}

export const DND_2024_SPECIES: Species2024[] = ${JSON.stringify(SPECIES, null, 2)};
`, 'utf8');

// Write Backgrounds
fs.writeFileSync(path.join(targetDir, 'backgroundsData2024.ts'), `// Compendio Oficial de Trasfondos D&D 5.5e (2024 Revised Rules) - Bilingüe
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

export const DND_2024_BACKGROUNDS: Background2024[] = ${JSON.stringify(BACKGROUNDS, null, 2)};
`, 'utf8');

// Write Feats
fs.writeFileSync(path.join(targetDir, 'featsData2024.ts'), `// Compendio Oficial de Dotes D&D 5.5e (2024 Revised Rules) - Bilingüe
export interface FeatBenefit2024 {
  name: string;
  nameEn?: string;
  desc: string;
  descEn?: string;
}

export interface Feat2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn?: string;
  edition: '5.5e';
  description: string;
  descriptionEn?: string;
  benefits: FeatBenefit2024[];
  source: string;
}

export const DND_2024_FEATS: Feat2024[] = ${JSON.stringify(FEATS, null, 2)};
`, 'utf8');

// Write Classes
fs.writeFileSync(path.join(targetDir, 'classesData2024.ts'), `// Compendio Oficial de Clases y Subclases D&D 5.5e (2024 Revised Rules) - Bilingüe
export interface Subclass2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn?: string;
}

export interface Class2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  edition: '5.5e';
  hitDie: number;
  primaryAbility: string;
  primaryAbilityEn?: string;
  savingThrows: string;
  subclassLevel: number; // 3 en 2024
  weaponMasteryCount: number;
  description: string;
  descriptionEn?: string;
  subclasses: Subclass2024[];
}

export const DND_2024_CLASSES: Class2024[] = ${JSON.stringify(CLASSES, null, 2)};
`, 'utf8');

// Write Weapons
fs.writeFileSync(path.join(targetDir, 'weaponsData2024.ts'), `// Compendio Oficial de Armas y Maestrías D&D 5.5e (2024 Revised Rules) - Bilingüe
export interface WeaponMasteryDefinition {
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
}

export interface Weapon2024 {
  id: string;
  name: string;
  nameEn: string;
  edition: '5.5e';
  damage: string;
  damageEn?: string;
  properties: string[];
  propertiesEn?: string[];
  mastery: string;
  masteryEn?: string;
  weight: string;
  cost: string;
}

export const DND_2024_WEAPON_MASTERIES: WeaponMasteryDefinition[] = [
  {
    name: "Cleave (Hender)",
    nameEn: "Cleave",
    desc: "Si golpeas a una criatura con un ataque de arma cuerpo a cuerpo, puedes hacer un ataque adicional contra una criatura adyacente a menos de 5 pies sin sumar tu modificador de característica al daño.",
    descEn: "If you hit a creature with a melee weapon attack, make an additional attack roll against an adjacent creature within 5 feet."
  },
  {
    name: "Graze (Rozar)",
    nameEn: "Graze",
    desc: "Si fallas un tiro de ataque con esta arma contra una criatura, infliges daño igual al modificador de característica usado para el ataque (mínimo 1 de daño).",
    descEn: "If you miss an attack roll, you still deal damage equal to the ability modifier used for the attack."
  },
  {
    name: "Nick (Tajar)",
    nameEn: "Nick",
    desc: "Cuando haces un ataque adicional concedido por la propiedad Ligera (Light), puedes hacer ese ataque como parte de la acción de Atacar en lugar de gastar una Acción Adicional.",
    descEn: "Make the extra attack of the Light weapon property as part of the Attack action rather than as a Bonus Action."
  },
  {
    name: "Push (Empujar)",
    nameEn: "Push",
    desc: "Si golpeas a una criatura con esta arma, puedes empujarla hasta 10 pies en línea recta lejos de ti si es de tamaño Grande o menor.",
    descEn: "If you hit a creature, push it up to 10 feet straight away from you if it is Large or smaller."
  },
  {
    name: "Sap (Debilitar)",
    nameEn: "Sap",
    desc: "Si golpeas a una criatura con esta arma, esa criatura tiene Desventaja en su siguiente tirada de ataque antes del inicio de tu próximo turno.",
    descEn: "If you hit a creature, it has Disadvantage on its next attack roll before the start of your next turn."
  },
  {
    name: "Slow (Ralentizar)",
    nameEn: "Slow",
    desc: "Si golpeas a una criatura y le infliges daño con esta arma, su velocidad se reduce en 10 pies hasta el inicio de tu próximo turno.",
    descEn: "If you hit a creature, reduce its speed by 10 feet until the start of your next turn."
  },
  {
    name: "Topple (Derribar)",
    nameEn: "Topple",
    desc: "Si golpeas a una criatura con esta arma, puedes forzarla a hacer una salvación de Constitución (CD 8 + Mod. Ataque + Bono Comp.) o caer Derribada (Prone).",
    descEn: "Force a creature to make a Constitution saving throw or be knocked Prone."
  },
  {
    name: "Vex (Acosar)",
    nameEn: "Vex",
    desc: "Si golpeas a una criatura y le infliges daño con esta arma, tienes Ventaja en tu siguiente tirada de ataque contra esa misma criatura antes del final de tu próximo turno.",
    descEn: "If you hit a creature, gain Advantage on your next attack roll against that same target before the end of your next turn."
  }
];

export const DND_2024_WEAPONS: Weapon2024[] = ${JSON.stringify(WEAPONS, null, 2)};
`, 'utf8');

console.log('Successfully compiled all 2024 bilingual datasets!');
