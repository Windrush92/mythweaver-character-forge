// Compendio Oficial de Especies D&D 5.5e (2024 Revised Rules) - Bilingüe
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

export const DND_2024_SPECIES: Species2024[] = [
  {
    "id": "species-2024-aasimar",
    "slug": "aasimar",
    "name": "Aasimar",
    "nameEn": "Aasimar",
    "edition": "5.5e",
    "description": "Los aasimar son mortales que llevan una chispa de los Planos Superiores en sus almas. Ya sea descendientes de un ser celestial o imbuidos de gracia divina, pueden avivar esa chispa para irradiar luz, sanar heridas y desatar furia sagrada.",
    "descriptionEn": "Aasimar are mortals who carry a spark of the Upper Planes within their souls. Whether descended from an angelic being or infused with celestial power, they can fan that spark to bring light, healing, and heavenly fury.",
    "size": "Mediano",
    "sizeEn": "Medium",
    "speed": "30 pies (9m)",
    "darkvision": 60,
    "traits": [
      {
        "name": "Resistencia Celestial",
        "nameEn": "Celestial Resistance",
        "desc": "Tienes Resistencia al daño Necrótico y al daño Radiante.",
        "descEn": "You have Resistance to Necrotic damage and Radiant damage."
      },
      {
        "name": "Visión en la Oscuridad",
        "nameEn": "Darkvision",
        "desc": "Puedes ver en luz tenue hasta 60 pies como si fuera luz brillante, y en oscuridad como en luz tenue.",
        "descEn": "You have Darkvision with a range of 60 feet."
      },
      {
        "name": "Manos Sanadoras",
        "nameEn": "Healing Hands",
        "desc": "Como acción Mágica, tocas a una criatura y tiras tantos d4 como tu Bono de Competencia. La criatura recupera puntos de golpe iguales al total obtenido. Recuperas este uso tras un Descanso Largo.",
        "descEn": "As a Magic action, you touch a creature and roll a number of d4s equal to your Proficiency Bonus. The creature regains Hit Points equal to the total rolled. Recovers on Long Rest."
      },
      {
        "name": "Portador de Luz",
        "nameEn": "Light Bearer",
        "desc": "Conoces el truco Luz (Light). Tu aptitud mágica para este truco es Carisma.",
        "descEn": "You know the Light cantrip. Charisma is your spellcasting ability for it."
      },
      {
        "name": "Revelación Celestial",
        "nameEn": "Celestial Revelation",
        "desc": "A partir de nivel 3, puedes transformarte como Acción Adicional durante 1 minuto (Alas Celestiales para volar 30 pies, Radiancia Interior para quemar enemigos cercanos con daño radiante, o Sudario Necrótico para atemorizar a los enemigos). Recuperas este poder tras un Descanso Largo.",
        "descEn": "At level 3, transform as a Bonus Action for 1 minute (Heavenly Wings, Inner Radiance, or Necrotic Shroud). Recovers on Long Rest."
      }
    ]
  },
  {
    "id": "species-2024-dragonborn",
    "slug": "dragonborn",
    "name": "Dracónido",
    "nameEn": "Dragonborn",
    "edition": "5.5e",
    "description": "Los dracónidos caminan con orgullo por un mundo que los saluda con temor o admiración. Modelados con la majestad de los dragones, portan en sus pulmones el aliento elemental de sus gloriosos antepasados.",
    "descriptionEn": "Dragonborn walk proudly through a world that greets them with fearful or admiring eyes. Shaped by dragon majesty, they carry the elemental breath of their draconic forebears.",
    "size": "Mediano",
    "sizeEn": "Medium",
    "speed": "30 pies (9m)",
    "darkvision": 60,
    "traits": [
      {
        "name": "Linaje Dracónico",
        "nameEn": "Draconic Ancestry",
        "desc": "Elige tu tipo de dragón (Negro, Azul, Latón, Bronce, Cobre, Oro, Verde, Rojo, Plata o Blanco), lo que determina el tipo de daño de tu aliento y tu resistencia elemental (Fuego, Frío, Relámpago, Ácido o Veneno).",
        "descEn": "Choose a dragon ancestor, determining your damage type and resistance (Fire, Cold, Lightning, Acid, or Poison)."
      },
      {
        "name": "Arma de Aliento",
        "nameEn": "Breath Weapon",
        "desc": "Al usar la acción de Atacar, puedes reemplazar uno de tus ataques por una exhalación en cono de 15 pies o línea de 30 pies. Las criaturas deben superar una tirada de salvación de Destreza o Constitución (CD 8 + Mod. Constitución + Bono de Competencia) o sufrir 1d10 de daño (aumenta a 2d10 en nivel 5, 3d10 en nivel 11 y 4d10 en nivel 17). Usos por descanso largo: igual a tu Bono de Competencia.",
        "descEn": "Replace an attack with an elemental exhalation (1d10 damage, scaling at levels 5, 11, 17). Uses equal to Proficiency Bonus per Long Rest."
      },
      {
        "name": "Resistencia al Daño",
        "nameEn": "Damage Resistance",
        "desc": "Tienes Resistencia al tipo de daño asociado con tu Linaje Dracónico.",
        "descEn": "You have Resistance to the damage type associated with your Draconic Ancestry."
      },
      {
        "name": "Visión en la Oscuridad",
        "nameEn": "Darkvision",
        "desc": "Visión en la oscuridad en un radio de 60 pies.",
        "descEn": "Darkvision with a range of 60 feet."
      },
      {
        "name": "Vuelo Dracónico (Nivel 5)",
        "nameEn": "Draconic Flight (Level 5)",
        "desc": "A partir de nivel 5, puedes manifestar alas espectrales como Acción Adicional durante 10 minutos, obteniendo una velocidad de vuelo igual a tu velocidad a pie. Recuperas este uso tras un Descanso Largo.",
        "descEn": "At level 5, sprout spectral wings as a Bonus Action for 10 minutes, gaining a fly speed equal to your speed. Recovers on Long Rest."
      }
    ]
  },
  {
    "id": "species-2024-dwarf",
    "slug": "dwarf",
    "name": "Enano",
    "nameEn": "Dwarf",
    "edition": "5.5e",
    "description": "Forjados en la roca y la piedra de las profundidades del mundo, los enanos son conocidos por su resiliencia inquebrantable, su maestría en la herrería y su inagotable perseverancia ante cualquier adversidad.",
    "descriptionEn": "Forged from bedrock in ancient deep halls, dwarves are renowned for their stoic resilience, unparalleled craftsmanship, and stubborn determination in the face of doom.",
    "size": "Mediano",
    "sizeEn": "Medium",
    "speed": "30 pies (9m)",
    "darkvision": 120,
    "traits": [
      {
        "name": "Visión en la Oscuridad Superior",
        "nameEn": "Superior Darkvision",
        "desc": "Puedes ver en la oscuridad hasta un radio de 120 pies.",
        "descEn": "You have Darkvision with a range of 120 feet."
      },
      {
        "name": "Resiliencia Enana",
        "nameEn": "Dwarven Resilience",
        "desc": "Tienes Resistencia al daño por Veneno y Ventaja en tiradas de salvación para evitar o terminar la condición Envenenado.",
        "descEn": "You have Resistance to Poison damage and Advantage on saving throws against Poison."
      },
      {
        "name": "Dureza Enana",
        "nameEn": "Dwarven Toughness",
        "desc": "Tu máximo de Puntos de Golpe aumenta en 1, y aumenta en 1 punto adicional cada vez que subes de nivel.",
        "descEn": "Your Hit Point maximum increases by 1, and increases by 1 each time you gain a level."
      },
      {
        "name": "Afinidad con la Piedra",
        "nameEn": "Stonecunning",
        "desc": "Como Acción Adicional mientras estés sobre piedra, ganas Visión Temblorosa (Tremorsense) hasta 60 pies durante 10 minutos. Puedes usar este rasgo tantas veces como tu Bono de Competencia por Descanso Largo.",
        "descEn": "As a Bonus Action on stone, gain Tremorsense up to 60 feet for 10 minutes. Uses equal to Proficiency Bonus per Long Rest."
      }
    ]
  },
  {
    "id": "species-2024-elf",
    "slug": "elf",
    "name": "Elfo",
    "nameEn": "Elf",
    "edition": "5.5e",
    "description": "Seres de elegancia atemporal y gracia feérica nacidos de los bosques antiguos, los reinos estelares y el inframundo, los elfos viven vidas centenarias contemplando la belleza y la magia del cosmos.",
    "descriptionEn": "Beings of timeless elegance and fey grace born from ancient woodlands, stellar realms, and the underworld, elves live centuries pursuing mastery in art, magic, and martial discipline.",
    "size": "Mediano",
    "sizeEn": "Medium",
    "speed": "30 pies (9m)",
    "darkvision": 60,
    "traits": [
      {
        "name": "Linaje Élfico",
        "nameEn": "Elven Lineage",
        "desc": "Elige tu linaje: Drow (Visión en la oscuridad 120 pies, truco Luces Danzantes, Fuego Feérico a nvl 3, Oscuridad a nvl 5), Alto Elfo (Eliges 1 truco de Mago y conjuros Paso Brumoso), o Elfo de los Bosques (Velocidad de 35 pies y conjuros Zancada Prodigiosa y Pasar sin Rastro).",
        "descEn": "Choose Drow, High Elf, or Wood Elf, gaining distinct spells and mobility traits."
      },
      {
        "name": "Linaje Feérico",
        "nameEn": "Fey Ancestry",
        "desc": "Tienes Ventaja en tiradas de salvación para evitar o terminar la condición Hechizado (Charmed).",
        "descEn": "You have Advantage on saving throws to avoid or end the Charmed condition."
      },
      {
        "name": "Sentidos Agudos",
        "nameEn": "Keen Senses",
        "desc": "Tienes competencia en la habilidad Percepción.",
        "descEn": "You have proficiency in the Perception skill."
      },
      {
        "name": "Trance",
        "nameEn": "Trance",
        "desc": "No necesitas dormir y la magia no te puede dormir. Puedes completar un descanso largo en tan solo 4 horas de meditación.",
        "descEn": "You don't need sleep and cannot be put to sleep by magic. Complete a Long Rest in 4 hours of meditation."
      }
    ]
  },
  {
    "id": "species-2024-gnome",
    "slug": "gnome",
    "name": "Gnomo",
    "nameEn": "Gnome",
    "edition": "5.5e",
    "description": "Curiosos, ingeniosos y rebosantes de entusiasmo, los gnomos son exploradores natos de los secretos arcanos y las maravillas mecánicas del multiverso.",
    "descriptionEn": "Curious, inventive, and brimming with boundless enthusiasm, gnomes are natural explorers of arcane mysteries and mechanical marvels throughout the multiverse.",
    "size": "Pequeño",
    "sizeEn": "Small",
    "speed": "30 pies (9m)",
    "darkvision": 60,
    "traits": [
      {
        "name": "Astucia Gnómica",
        "nameEn": "Gnomish Cunning",
        "desc": "Tienes Ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma.",
        "descEn": "You have Advantage on all Intelligence, Wisdom, and Charisma saving throws."
      },
      {
        "name": "Visión en la Oscuridad",
        "nameEn": "Darkvision",
        "desc": "Visión en la oscuridad hasta 60 pies.",
        "descEn": "Darkvision with a range of 60 feet."
      },
      {
        "name": "Linaje Gnómico",
        "nameEn": "Gnomish Lineage",
        "desc": "Elige entre Gnomo de los Bosques (conoces el truco Ilusión Menor y puedes hablar con animales pequeños) o Gnomo de las Rocas (conoces los trucos Reparar y Prestidigitación, y puedes fabricar artilugios mecánicos).",
        "descEn": "Choose Forest Gnome (Minor Illusion & Speak with Animals) or Rock Gnome (Mending, Prestidigitation & Clockwork Devices)."
      }
    ]
  },
  {
    "id": "species-2024-goliath",
    "slug": "goliath",
    "name": "Goliat",
    "nameEn": "Goliath",
    "edition": "5.5e",
    "description": "Titanes de estatura colosal descendientes de los gigantes primordiales de las cumbres más altas, los goliat poseen una fuerza descomunal y la furia de los elementos grabada en sus venas.",
    "descriptionEn": "Towering titans descended from primordial mountain giants, goliaths possess immense strength and elemental fury etched into their very veins.",
    "size": "Mediano",
    "sizeEn": "Medium",
    "speed": "35 pies (10.5m)",
    "darkvision": 0,
    "traits": [
      {
        "name": "Ascendencia Gigante",
        "nameEn": "Giant Ancestry",
        "desc": "Ganas un poder según tu linaje de gigante (Nube: teletransporte de 30 pies; Fuego: 1d10 daño fuego adicional; Helada: 1d6 frío y reducción de velocidad; Colina: derribar enemigo grande o menor; Piedra: reacción para reducir daño entrante en 1d12 + CON; Tormenta: reacción 1d8 daño relámpago a quien te dañe). Usos iguales a tu Bono de Competencia por descanso largo.",
        "descEn": "Supernatural power tied to giant heritage (Cloud, Fire, Frost, Hill, Stone, or Storm). Uses equal to Proficiency Bonus."
      },
      {
        "name": "Forma Colosal (Nivel 5)",
        "nameEn": "Large Form (Level 5)",
        "desc": "A partir de nivel 5, como Acción Adicional puedes cambiar tu tamaño a Grande (Large) durante 10 minutos. Ganas Ventaja en pruebas de Fuerza y tu velocidad aumenta en 10 pies. Recuperas este uso tras un Descanso Largo.",
        "descEn": "At level 5, become Large size as a Bonus Action for 10 minutes (+10 ft speed, Advantage on Strength checks)."
      },
      {
        "name": "Complexión Poderosa",
        "nameEn": "Powerful Build",
        "desc": "Tienes Ventaja en pruebas para evitar o escapar de la condición Agarrado (Grappled), y tu capacidad de carga se cuenta como si fueras una criatura de tamaño Grande.",
        "descEn": "Advantage to escape grapples, and carrying capacity is counted as one size larger."
      }
    ]
  },
  {
    "id": "species-2024-halfling",
    "slug": "halfling",
    "name": "Mediano",
    "nameEn": "Halfling",
    "edition": "5.5e",
    "description": "Amantes del hogar, la buena comida y la camaradería, los medianos ocultan tras su pequeña estatura un coraje insospechado, una suerte legendaria y una agilidad incomparable.",
    "descriptionEn": "Fond of good food, hearth, and companionship, halflings hide behind their small stature unmatched bravery, legendary good fortune, and uncanny stealth.",
    "size": "Pequeño",
    "sizeEn": "Small",
    "speed": "30 pies (9m)",
    "darkvision": 0,
    "traits": [
      {
        "name": "Afortunado",
        "nameEn": "Lucky",
        "desc": "Cuando obtienes un 1 natural en una tirada de ataque, prueba de característica o tirada de salvación con un d20, puedes volver a tirar el dado y debes usar el nuevo resultado.",
        "descEn": "When you roll a 1 on a d20 test, you can reroll the die and must use the new roll."
      },
      {
        "name": "Valiente",
        "nameEn": "Brave",
        "desc": "Tienes Ventaja en tiradas de salvación para evitar o terminar la condición Asustado (Frightened).",
        "descEn": "You have Advantage on saving throws against being Frightened."
      },
      {
        "name": "Agilidad Mediana",
        "nameEn": "Halfling Nimbleness",
        "desc": "Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño mayor que el tuyo.",
        "descEn": "You can move through the space of any creature that is a size larger than you."
      },
      {
        "name": "Sigilo Natural",
        "nameEn": "Naturally Stealthy",
        "desc": "Puedes intentar esconderte incluso cuando solo estás tapado por una criatura que sea al menos de un tamaño mayor que tú.",
        "descEn": "You can attempt to hide even when obscured only by a creature at least one size larger than you."
      }
    ]
  },
  {
    "id": "species-2024-human",
    "slug": "human",
    "name": "Humano",
    "nameEn": "Human",
    "edition": "5.5e",
    "description": "La especie más ambiciosa, adaptable y diversa del multiverso. Su determinación tenaz y capacidad de sobreponerse a cualquier límite los convierte en pioneros legendarios.",
    "descriptionEn": "The most ambitious, versatile, and adaptable mortals in the cosmos, humans excel at defying impossible odds through sheer ingenuity and tenacity.",
    "size": "Mediano o Pequeño",
    "sizeEn": "Medium or Small",
    "speed": "30 pies (9m)",
    "darkvision": 0,
    "traits": [
      {
        "name": "Ingenioso (Inspiración Heroica)",
        "nameEn": "Resourceful",
        "desc": "Ganas Inspiración Heroica cada vez que terminas un Descanso Largo. Puedes usarla para volver a tirar cualquier dado de d20.",
        "descEn": "You gain Heroic Inspiration whenever you finish a Long Rest."
      },
      {
        "name": "Competencia Hábil",
        "nameEn": "Skillful",
        "desc": "Ganas competencia en una habilidad a tu elección.",
        "descEn": "You gain proficiency in one skill of your choice."
      },
      {
        "name": "Versátil (Dote de Origen Extra)",
        "nameEn": "Versatile",
        "desc": "Ganas una Dote de Origen adicional a tu elección (además de la otorgada por tu Trasfondo).",
        "descEn": "You gain one additional Origin Feat of your choice."
      }
    ]
  },
  {
    "id": "species-2024-orc",
    "slug": "orc",
    "name": "Orco",
    "nameEn": "Orc",
    "edition": "5.5e",
    "description": "Bendecidos con una vitalidad feroz y una fuerza indómita, los orcos son guerreros de convicciones apasionadas que protegen a su clan y a sus aliados hasta el último aliento.",
    "descriptionEn": "Blessed with fierce vitality and untamable strength, orcs are passionate survivors and steadfast defenders of their kin and companions.",
    "size": "Mediano",
    "sizeEn": "Medium",
    "speed": "30 pies (9m)",
    "darkvision": 120,
    "traits": [
      {
        "name": "Subidón de Adrenalina",
        "nameEn": "Adrenaline Rush",
        "desc": "Como Acción Adicional, puedes realizar la acción de Correr (Dash). Cuando lo haces, ganas Puntos de Golpe Temporales iguales a tu Bono de Competencia. Usos por descanso largo: igual a tu Bono de Competencia.",
        "descEn": "Dash as a Bonus Action and gain temporary hit points equal to your Proficiency Bonus. Uses equal to PB per Long Rest."
      },
      {
        "name": "Visión en la Oscuridad Superior",
        "nameEn": "Superior Darkvision",
        "desc": "Visión en la oscuridad hasta 120 pies.",
        "descEn": "Darkvision with a range of 120 feet."
      },
      {
        "name": "Resistencia Incansable",
        "nameEn": "Relentless Endurance",
        "desc": "Cuando tus puntos de golpe se reducen a 0 pero no mueres directamente, puedes quedarte a 1 punto de golpe en su lugar. Recuperas este uso tras un Descanso Largo.",
        "descEn": "When reduced to 0 HP but not killed outright, you drop to 1 HP instead. Recovers on Long Rest."
      }
    ]
  },
  {
    "id": "species-2024-tiefling",
    "slug": "tiefling",
    "name": "Tiflin",
    "nameEn": "Tiefling",
    "edition": "5.5e",
    "description": "Portadores de una herencia ligada a los Planos Inferiores, los tiflin poseen cuernos, colas y un magnetismo misterioso, dominando magias oscuras de linajes infernales, abisales o ctónicos.",
    "descriptionEn": "Bearers of a legacy tied to the Lower Planes, tieflings wield horns, tails, and an otherworldly aura, channeling dark magic from infernal, abyssal, or chthonic origins.",
    "size": "Mediano o Pequeño",
    "sizeEn": "Medium or Small",
    "speed": "30 pies (9m)",
    "darkvision": 60,
    "traits": [
      {
        "name": "Legado Infernal",
        "nameEn": "Fiendish Legacy",
        "desc": "Elige tu legado: Abisal (Resistencia a Veneno; trucos Rociada Venenosa, Rayo de Enfermedad, Mantener Persona), Ctónico (Resistencia a Necrótico; trucos Toque Helado, Falsa Vida, Rayo de Debilitamiento) o Infernal (Resistencia a Fuego; trucos Saeta de Fuego, Reprensión Infernal, Oscuridad).",
        "descEn": "Choose Abyssal (Poison), Chthonic (Necrotic), or Infernal (Fire), gaining associated resistance and spells."
      },
      {
        "name": "Visión en la Oscuridad",
        "nameEn": "Darkvision",
        "desc": "Visión en la oscuridad hasta 60 pies.",
        "descEn": "Darkvision with a range of 60 feet."
      },
      {
        "name": "Presencia Sobrenatural",
        "nameEn": "Otherworldly Presence",
        "desc": "Conoces el truco Taumaturgia (Thaumaturgy). Tu aptitud mágica para este truco es Carisma.",
        "descEn": "You know the Thaumaturgy cantrip (Charisma)."
      }
    ]
  }
];
