import { Campaign, Character, MonsterStatblock, Encounter } from '../types';

export const DEFAULT_CAMPAIGNS: Campaign[] = [
  {
    "id": "camp-motor-alma",
    "name": "Motor Alma y Sangre",
    "description": "Campaña techno-fantasía donde la magia antigua y la ingeniería cibernética colisionan. Enfrentamientos contra androides de combate y misterios del Código Anciano.",
    "dmName": "Pablo",
    "createdAt": "2026-10-05T14:17:04.191Z",
    "worldMapUrl": "/vault/maps/MAPA_ELORIA_COMPLETO.webp",
    "worldMapPins": [
      {
        "id": "pin-party-motor",
        "x": 46.5,
        "y": 48.2,
        "title": "Posición de la Party 🧭",
        "description": "Posición actual del grupo de aventureros en el sector exterior.",
        "type": "party",
        "color": "#eab308"
      },
      {
        "id": "pin-laboratorio",
        "x": 52,
        "y": 42,
        "title": "Laboratorio de Autómatas",
        "description": "Instalación donde se ensamblaron los Robo Asesinos y Robo Magos.",
        "type": "dungeon",
        "color": "#ef4444"
      },
      {
        "id": "pin-base-aerea",
        "x": 40,
        "y": 60,
        "title": "Base Aérea Cyberpunk",
        "description": "Pista de aterrizaje fortificada custodiada por robots prototipo.",
        "type": "city",
        "color": "#3b82f6"
      }
    ],
    "notes": "Lore Principal de la Campaña:\n- El Inhibidor y la obtención del código anciano.\n- Enemigos encontrados: Robo Asesino, Robo Bárbaro, Robo Clérigo, Robo Mago, Robo Warlock.\n- Aliados / NPCs: Arthur Aving, Elena, Lila, Liligus, Malakar, Qu, F410P4 y Dinosapiens Mago.",
    "dmNotes": "Lore Principal de la Campaña:\n- El Inhibidor y la obtención del código anciano.\n- Enemigos encontrados: Robo Asesino, Robo Bárbaro, Robo Clérigo, Robo Mago, Robo Warlock.\n- Aliados / NPCs: Arthur Aving, Elena, Lila, Liligus, Malakar, Qu, F410P4 y Dinosapiens Mago.",
    "sharedNotes": "📜 Bitácora de la Compañía de Aventureros:\n- Infiltración en el sector exterior.\n- Puntos clave: Laboratorio de Autómatas y Base Aérea.\n- Objetivo acordado: Descifrar el Código Anciano.",
    "invitedUserIds": [],
    "inviteCode": "MOTOR-ALMA"
  },
  {
    "id": "camp-hielo-quebrado",
    "name": "02: El Susurro en el Hielo Quebrado",
    "description": "Aventura en la fría posta del Cuerno Quebrado. Una aberración gélida acecha bajo las grietas de la bodega congelada.",
    "dmName": "Pablo",
    "createdAt": "2026-10-05T14:17:04.194Z",
    "worldMapUrl": "/vault/maps/exterior_posta.jpg",
    "worldMapPins": [
      {
        "id": "pin-posta",
        "x": 50,
        "y": 50,
        "title": "La Posta del Cuerno Quebrado 🧭",
        "description": "Refugio en la tormenta de nieve. Administrado por Vann y su perro Colmillo.",
        "type": "party",
        "color": "#eab308"
      },
      {
        "id": "pin-bodega",
        "x": 55,
        "y": 65,
        "title": "La Bodega & Grieta Glacial",
        "description": "Lugar donde emergen las Larvas de Escarcha y la Aberración de Savia Gélida.",
        "type": "dungeon",
        "color": "#ef4444"
      }
    ],
    "notes": "Acto 1: La Posada del Cuerno Quebrado.\nActo 2: El Grito a Medianoche.\nActo 3: El Descenso a la Bodega Helada (Larvas de Escarcha).\nActo 4: El Clímax en la Caverna Helada (Aberración de Savia Gélida con Escudo Quebradizo y Aura Glacial).",
    "dmNotes": "Acto 1: La Posada del Cuerno Quebrado.\nActo 2: El Grito a Medianoche.\nActo 3: El Descenso a la Bodega Helada (Larvas de Escarcha).\nActo 4: El Clímax en la Caverna Helada (Aberración de Savia Gélida con Escudo Quebradizo y Aura Glacial).",
    "sharedNotes": "📜 Diario de la Expedición en el Hielo:\n- Refugio encontrado en la Posta del Cuerno Quebrado.\n- Ruidos extraños procedentes de las bodegas inferiores.\n- Alerta con la ventisca exterior.",
    "invitedUserIds": [],
    "inviteCode": "CUERNO-HIELO"
  },
  {
    "id": "camp-corazon-savia",
    "name": "Corazón de Savia (Eloria)",
    "description": "En las profundidades del Raigal Profundo y el pueblo de Grisvado, la Herida Negra y el meteorito de cristal oscuro alteran el equilibrio del bosque.",
    "dmName": "Pablo",
    "createdAt": "2026-10-05T14:17:04.194Z",
    "worldMapUrl": "/vault/maps/MAPA_ELORIA_COMPLETO.webp",
    "worldMapPins": [
      {
        "id": "pin-grisvado",
        "x": 48,
        "y": 54,
        "title": "Grisvado - Pueblo al borde del bosque 🧭",
        "description": "La Posada El Brote Dorado. Punto neurálgico antes de internarse en el Raigal.",
        "type": "party",
        "color": "#eab308"
      },
      {
        "id": "pin-valneria-nieve",
        "x": 35,
        "y": 20,
        "title": "Ciudadela de Nieve (Valneria)",
        "description": "Fortaleza sobre glaciar en movimiento. Magos del hielo.",
        "type": "city",
        "color": "#3b82f6"
      },
      {
        "id": "pin-cumbres-heladas",
        "x": 30,
        "y": 28,
        "title": "Cumbres Heladas",
        "description": "Ciudades enanas excavadas en roca.",
        "type": "dungeon",
        "color": "#ef4444"
      },
      {
        "id": "pin-desierto-sythar",
        "x": 65,
        "y": 60,
        "title": "Desierto de Sythar (Xelara)",
        "description": "Vastas arenas azotadas por tormentas mágicas.",
        "type": "hazard",
        "color": "#f97316"
      },
      {
        "id": "pin-selva-umbaluz",
        "x": 72,
        "y": 70,
        "title": "Selva de Umbaluz (Xelara)",
        "description": "Vegetación fosforescente y ruinas del Templo del Crepúsculo.",
        "type": "dungeon",
        "color": "#10b981"
      },
      {
        "id": "pin-mar-cristal",
        "x": 20,
        "y": 75,
        "title": "Mar de Cristal & Archipiélago (Yldros)",
        "description": "Mil islas y la legendaria Isla Perdida de Thalassos.",
        "type": "city",
        "color": "#3b82f6"
      }
    ],
    "notes": "Pruebas del Dios Ombú:\n1. El camino sin retorno.\n2. El sacrificio de la laguna.\n3. El equilibrio del bosque.\nEl Concilio de la Enmienda y Severin Rael.",
    "dmNotes": "Pruebas del Dios Ombú:\n1. El camino sin retorno.\n2. El sacrificio de la laguna.\n3. El equilibrio del bosque.\nEl Concilio de la Enmienda y Severin Rael.",
    "sharedNotes": "📜 Bitácora de la Compañía de Aventureros:\n- Llegada al pueblo de Grisvado al borde del bosque.\n- Punto de encuentro: La Posada El Brote Dorado.\n- Rumores sobre anomalías en la vegetación y criaturas perturbadas en el Raigal Profundo.",
    "invitedUserIds": [],
    "inviteCode": "CORAZON-SAVIA"
  },
  {
    "id": "camp-walpurgisnacht",
    "name": "01: Walpurgisnacht",
    "description": "Los sucesos misteriosos y el epílogo del incidente de Durholt.",
    "dmName": "Pablo",
    "createdAt": "2026-10-05T14:17:04.194Z",
    "worldMapUrl": "/vault/maps/MAPA_ELORIA_COMPLETO.webp",
    "worldMapPins": [
      {
        "id": "pin-durholt",
        "x": 45,
        "y": 48,
        "title": "Durholt",
        "description": "Lugar del incidente sobrenatural de Walpurgisnacht.",
        "type": "party",
        "color": "#eab308"
      }
    ],
    "notes": "Epílogo del incidente de Durholt tras liberar el raigal.",
    "dmNotes": "Epílogo del incidente de Durholt tras liberar el raigal.",
    "sharedNotes": "📜 Investigaciones en Durholt:\n- Registro de testimonios sobre los sucesos de la noche de Walpurgis.",
    "invitedUserIds": [],
    "inviteCode": "DURHOLT-NOCHE"
  }
];

export const DEFAULT_CHARACTERS: Character[] = [
  {
    id: "char-rene-gadd-o",
    name: "René Gadd-O",
    playerName: "Ivana",
    race: "Humano",
    class: "Mago (Wizard)",
    subclass: "Evocación",
    level: 2,
    maxHp: 12,
    currentHp: 12,
    tempHp: 0,
    ac: 10,
    initiativeBonus: 0,
    speed: "30 pies",
    passivePerception: 9,
    stats: { str: 8, dex: 10, con: 14, int: 16, wis: 9, cha: 12 },
    campaignId: "camp-motor-alma",
    campaignIds: ["all", "camp-motor-alma", "camp-hielo-quebrado", "camp-walpurgisnacht"],
    avatarFrame: "frame-arcane",
    attacks: [{ id: "atk-1", name: "Daga Mística", bonus: "+2", damage: "1d4", type: "Perforante" }],
    spellSlots: { lvl1: { max: 3, used: 0 } },
    spells: []
  },
  {
    id: "char-dario-ashfall",
    name: "Darío Ashfall",
    playerName: "Pablo",
    race: "Enano de las Colinas",
    class: "Paladín",
    subclass: "Voto de Devoción",
    level: 3,
    maxHp: 28,
    currentHp: 28,
    tempHp: 0,
    ac: 18,
    initiativeBonus: 0,
    speed: "25 pies",
    passivePerception: 12,
    stats: { str: 16, dex: 10, con: 16, int: 9, wis: 12, cha: 14 },
    campaignId: "camp-motor-alma",
    campaignIds: ["all", "camp-motor-alma", "camp-hielo-quebrado", "camp-walpurgisnacht"],
    avatarFrame: "frame-forge-dwarven",
    attacks: [{ id: "atk-2", name: "Martillo de Guerra", bonus: "+5", damage: "1d8+3", type: "Contundente" }],
    spellSlots: { lvl1: { max: 3, used: 0 } },
    spells: []
  },
  {
    id: "char-kara-shadowstrike",
    name: "Kara Shadowstrike",
    playerName: "Ivana",
    race: "Tiefling",
    class: "Pícaro",
    subclass: "Asesino",
    level: 3,
    maxHp: 24,
    currentHp: 24,
    tempHp: 0,
    ac: 15,
    initiativeBonus: 3,
    speed: "30 pies",
    passivePerception: 14,
    stats: { str: 10, dex: 16, con: 12, int: 14, wis: 12, cha: 14 },
    campaignId: "camp-motor-alma",
    campaignIds: ["all", "camp-motor-alma", "camp-hielo-quebrado", "camp-walpurgisnacht"],
    avatarFrame: "frame-nature-fae",
    attacks: [{ id: "atk-3", name: "Estoque", bonus: "+5", damage: "1d8+3", type: "Perforante" }],
    spellSlots: {},
    spells: []
  }
];

export const DEFAULT_MONSTERS: MonsterStatblock[] = [
{
      "id": "mon-aberraci-n-de-savia-g-lida",
      "campaignId": "camp-hielo-quebrado",
      "name": "Aberración de Savia Gélida",
      "size": "Medium",
      "type": "aberration",
      "subtype": "",
      "alignment": "neutral evil",
      "ac": 13,
      "acDescription": "",
      "hp": 38,
      "hitDice": "5d8 + 15",
      "speed": "30 ft., climb 30 ft.",
      "stats": {
        "str": 15,
        "dex": 12,
        "con": 16,
        "int": 4,
        "wis": 12,
        "cha": 5
      },
      "damageResistances": "bludgeoning, piercing, and slashing from nonmagical attacks",
      "damageImmunities": "cold, poison",
      "conditionImmunities": "paralyzed, poisoned, exhaustion",
      "senses": "blindsight 60 ft., passive Perception 11",
      "languages": "—",
      "cr": "2",
      "xp": 450,
      "traits": [
        {
          "name": "Escudo de Hielo Quebradizo",
          "desc": "La primera vez en cada ronda que la aberración reciba daño de Fuego, su coraza se resquebraja: su CA se reduce a 11 y pierde sus resistencias a daño físico hasta el final de su siguiente turno."
        },
        {
          "name": "Aura Glacial",
          "desc": "Cualquier criatura que empiece su turno a 5 pies de la aberración sufre 2 (1d4) puntos de daño por frío debido al contacto térmico."
        },
        {
          "name": "Vínculo con el Cristal Oscuro",
          "desc": "Mientras la aberración se encuentre a 10 pies o menos del nido de cristales oscuros, tiene ventaja en las tiradas de salvación contra ser derribada, aturdida o empujada."
        }
      ],
      "actions": [
        {
          "name": "Multiataque",
          "desc": "La criatura realiza dos ataques: uno con su Golpe de Zarza y uno con su Mordisco Helado."
        },
        {
          "name": "Golpe de Zarza",
          "desc": "Ataque de arma cuerpo a cuerpo: +4 al impacto, alcance 10 pies, un objetivo. Impacto: 6 (1d8 + 2) de daño cortante más 2 (1d4) de daño por frío."
        },
        {
          "name": "Mordisco Helado",
          "desc": "Ataque de arma cuerpo a cuerpo: +4 al impacto, alcance 5 pies, un objetivo. Impacto: 5 (1d6 + 2) de daño perforante más 2 (1d4) de daño por frío. Si el objetivo es una criatura, su velocidad se reduce en 10 pies hasta el final de su próximo turno."
        },
        {
          "name": "Exhalación de Escarcha (Recarga 5-6)",
          "desc": "La criatura exhala una ráfaga glacial en un cono de 15 pies. Cada criatura en el área debe realizar una Tirada de Salvación de Constitución CD 12, sufriendo 9 (2d8) puntos de daño por frío si falla, o la mitad si tiene éxito."
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "El Susurro en el Hielo Quebrado"
    },
    {
      "id": "mon-larva-de-escarcha",
      "campaignId": "camp-hielo-quebrado",
      "name": "Larva de Escarcha",
      "size": "Tiny",
      "type": "monstrosity",
      "subtype": "",
      "alignment": "neutral evil",
      "ac": 11,
      "acDescription": "",
      "hp": 6,
      "hitDice": "2d4 + 1",
      "speed": "20 ft., climb 20 ft.",
      "stats": {
        "str": 6,
        "dex": 13,
        "con": 12,
        "int": 2,
        "wis": 10,
        "cha": 3
      },
      "damageResistances": "",
      "damageImmunities": "cold, poison",
      "conditionImmunities": "",
      "senses": "blindsight 30 ft., passive Perception 10",
      "languages": "—",
      "cr": "1/8",
      "xp": 25,
      "traits": [],
      "actions": [
        {
          "name": "Mordisco Gélido",
          "desc": "Ataque de arma cuerpo a cuerpo: +3 al impacto, alcance 5 pies, un objetivo. Impacto: 3 (1d4 + 1) de daño perforante más 1 de daño por frío."
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "El Susurro en el Hielo Quebrado"
    },
    {
      "id": "mon-colmillo",
      "campaignId": "camp-hielo-quebrado",
      "name": "Colmillo",
      "size": "Medium",
      "type": "beast",
      "subtype": "",
      "alignment": "unaligned",
      "ac": 12,
      "acDescription": "",
      "hp": 15,
      "hitDice": "2d8 + 6",
      "speed": "40 ft.",
      "stats": {
        "str": 14,
        "dex": 14,
        "con": 15,
        "int": 3,
        "wis": 13,
        "cha": 7
      },
      "damageResistances": "",
      "damageImmunities": "",
      "conditionImmunities": "",
      "senses": "passive Perception 13",
      "languages": "—",
      "cr": "1/4",
      "xp": 50,
      "traits": [
        {
          "name": "Oído y Olfato Agudos",
          "desc": "Colmillo tiene ventaja en las pruebas de Sabiduría (Percepción) que dependan del oído o del olfato."
        },
        {
          "name": "Sexto Sentido Antinatural",
          "desc": "Colmillo percibe la presencia de anomalías y frío sobrenatural a menos de 60 pies, gruñendo en dirección a la fuente."
        }
      ],
      "actions": [
        {
          "name": "Mordisco",
          "desc": "Ataque de arma cuerpo a cuerpo: +4 al impacto, alcance 5 pies, un objetivo. Impacto: 5 (1d6 + 2) de daño perforante. Si el objetivo es una criatura, debe superar una tirada de salvación de Fuerza CD 12 o ser derribada (Prone)."
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "El Susurro en el Hielo Quebrado"
    },
    {
      "id": "mon-robo-asesino",
      "campaignId": "camp-motor-alma",
      "name": "Robo Asesino",
      "size": "Medium",
      "type": "Constructo (Robot)",
      "subtype": "autómata de combate",
      "alignment": "Neutral Evil",
      "ac": 17,
      "acDescription": "Armadura Ligera con Mejoras",
      "hp": 85,
      "hitDice": "10d8 + 40",
      "speed": "40 pies",
      "stats": {
        "str": 14,
        "dex": 20,
        "con": 18,
        "int": 16,
        "wis": 14,
        "cha": 12
      },
      "saves": "Destreza +9, Inteligencia +7",
      "skills": "",
      "damageResistances": "Daño cortante, psíquico.",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado, Agotamiento",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
      "languages": "Común, Binario Arcano",
      "cr": "4",
      "xp": 1100,
      "traits": [
        {
          "name": "Sneak Attack:",
          "desc": "Si el Robo-Assassin tiene ventaja en una tirada de ataque, añade (4d6) de daño extra."
        },
        {
          "name": "Invisibility Cloak (Recarga 4-6):",
          "desc": "El Robo-Assassin se vuelve invisible hasta que ataque o reciba daño."
        },
        {
          "name": "Deadly Precision:",
          "desc": "Si el Robo-Assassin falla un ataque, puede gastar su reacción para volver a tirar el dado, pero debe usar el segundo resultado."
        }
      ],
      "actions": [
        {
          "name": "Cuchillas Retráctiles:",
          "desc": "+9 al ataque, alcance 5 pies, un objetivo. Impacto: 18 (3d6 + 5) de daño cortante más 10 (3d6) de daño de energía si ataca con ventaja."
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "Motor Alma y Sangre"
    },
    {
      "id": "mon-robo-barbaro",
      "campaignId": "camp-motor-alma",
      "name": "Robo Barbaro",
      "size": "Medium",
      "type": "Constructo (Robot)",
      "subtype": "autómata de combate",
      "alignment": "Neutral Evil",
      "ac": 16,
      "acDescription": "Armadura de Placas",
      "hp": 112,
      "hitDice": "12d10 + 48",
      "speed": "40 pies",
      "stats": {
        "str": 20,
        "dex": 14,
        "con": 18,
        "int": 8,
        "wis": 10,
        "cha": 10
      },
      "saves": "- **Fuerza +9, Constitución +8**",
      "skills": "Percepción pasiva:",
      "damageResistances": "Daño cortante, perforante y contundente no mágico.",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado, Agotamiento",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
      "languages": "Común, Binario Arcano",
      "cr": "5",
      "xp": 1800,
      "traits": [
        {
          "name": "Rage Protocol (Recarga 5-6):",
          "desc": "Como acción de bonificación, el Robo-Barbarian entra en modo de furia, lo que le da ventaja en tiradas de ataque y daño con armas cuerpo a cuerpo y resistencia al daño contundente, cortante, y perforante durante 1 minuto."
        },
        {
          "name": "Unstoppable:",
          "desc": "Si el Robo-Barbarian recibe daño que lo reduce a 0 puntos de golpe, puede realizar una tirada de Constitución (DC 10). Si tiene éxito, recupera 20 puntos de golpe y sigue combatiendo."
        }
      ],
      "actions": [
        {
          "name": "Ataque Frenético:",
          "desc": "_Multiataque_ — El Robo-Barbarian realiza tres ataques con su Hacha Energética."
        },
        {
          "name": "Hacha Energética:",
          "desc": "+9 al ataque, alcance 5 pies, un objetivo. Impacto: (2d8 + 5) de daño cortante más (1d10) de daño de energía."
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "Motor Alma y Sangre"
    },
    {
      "id": "mon-robo-clerigo",
      "campaignId": "camp-motor-alma",
      "name": "Robo Clerigo",
      "size": "Medium",
      "type": "Constructo (Robot)",
      "subtype": "autómata de combate",
      "alignment": "Neutral Evil",
      "ac": 18,
      "acDescription": "Armadura Completa",
      "hp": 95,
      "hitDice": "10d8 + 40",
      "speed": "30 pies",
      "stats": {
        "str": 16,
        "dex": 10,
        "con": 18,
        "int": 14,
        "wis": 20,
        "cha": 12
      },
      "saves": "Sabiduría +9, Constitución +8",
      "skills": "Percepción pasiva:",
      "damageResistances": "Daño radiante, necrótico.",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado, Agotamiento",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
      "languages": "Común, Binario Arcano",
      "cr": "4",
      "xp": 1100,
      "traits": [
        {
          "name": "Aura of Protection:",
          "desc": "Todos los aliados a 10 pies del Robo-Cleric tienen un bono de +2 a las tiradas de salvación."
        },
        {
          "name": "Healing Surge (Recarga 5-6):",
          "desc": "El Robo-Cleric emite una onda de energía sanadora, restaurando 20 puntos de golpe a sí mismo y a todos los aliados dentro de un radio de 20 pies."
        }
      ],
      "actions": [
        {
          "name": "Maza Sagrada:",
          "desc": "+7 al ataque, alcance 5 pies, un objetivo. Impacto: 8 (1d8 + 4) de daño contundente más 4 (1d8) de daño radiante."
        },
        {
          "name": "Protocolo de Conjuros",
          "desc": "(CD de Hechizo 17, +9 al ataque de hechizos) • - **Nivel 3 (3/día cada uno):** _Curar heridas, Infligir heridas_ • - **Nivel 5 (2/día cada uno):** _Disipar el bien y el mal, Arma espiritual_"
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "Motor Alma y Sangre"
    },
    {
      "id": "mon-robo-mago",
      "campaignId": "camp-motor-alma",
      "name": "Robo Mago",
      "size": "Medium",
      "type": "Constructo (Robot)",
      "subtype": "autómata de combate",
      "alignment": "Neutral Evil",
      "ac": 15,
      "acDescription": "Armadura de Energía",
      "hp": 68,
      "hitDice": "8d8 + 32",
      "speed": "30 pies",
      "stats": {
        "str": 8,
        "dex": 14,
        "con": 18,
        "int": 20,
        "wis": 12,
        "cha": 14
      },
      "saves": "Inteligencia +9, Sabiduría +5",
      "skills": "Arcana +9, Percepción pasiva:",
      "damageResistances": "Daño de energía, psíquico.",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado, Agotamiento",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
      "languages": "Común, Binario Arcano",
      "cr": "3",
      "xp": 700,
      "traits": [
        {
          "name": "Energy Shield (Recarga 5-6):",
          "desc": "Como reacción, el Robo-Mage puede desplegar un escudo de energía que le da +5 a la CA hasta el inicio de su próximo turno."
        },
        {
          "name": "Overload (1/día):",
          "desc": "El Robo-Mage puede sobrecargar sus circuitos, lanzando una versión potenciada de cualquier hechizo de nivel 5 o inferior, infligiendo el máximo daño posible."
        }
      ],
      "actions": [
        {
          "name": "Rayo de Energía:",
          "desc": "+9 al ataque, alcance 120 pies, un objetivo. Impacto: 22 (4d8 + 5) de daño de energía."
        },
        {
          "name": "Protocolo de Conjuros",
          "desc": "(CD de Hechizo 17, +9 al ataque de hechizos) • - **Cantrips:** _Mano de Mago, Prestidigitación, Rayo de Escarcha_ • - **Nivel 1 (4/día):** _Misil mágico, Escudo_ • - **Nivel 3 (3/día):** _Relámpago, Contrahechizo_ • - **Nivel 5 (2/día):** _Bola de fuego, Teletransporte_"
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "Motor Alma y Sangre"
    },
    {
      "id": "mon-robo-warlock",
      "campaignId": "camp-motor-alma",
      "name": "Robo Warlock",
      "size": "Medium",
      "type": "Constructo (Robot)",
      "subtype": "autómata de combate",
      "alignment": "Neutral Evil",
      "ac": 16,
      "acDescription": "Armadura de Energía",
      "hp": 75,
      "hitDice": "9d8 + 27",
      "speed": "30 pies",
      "stats": {
        "str": 10,
        "dex": 14,
        "con": 16,
        "int": 12,
        "wis": 10,
        "cha": 20
      },
      "saves": "Constitución +7, Carisma +9",
      "skills": "Arcana +8, Intimidación +9, Percepción pasiva:",
      "damageResistances": "Daño necrótico, fuerza.",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado, Agotamiento",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
      "languages": "Común, Binario Arcano",
      "cr": "3",
      "xp": 700,
      "traits": [
        {
          "name": "Dark Pact (Recarga 5-6):",
          "desc": "El Robo-Warlock puede invocar el poder de su pacto, restaurando 25 puntos de golpe y lanzando _Toque Vampírico_ como acción de bonificación."
        },
        {
          "name": "Hellfire Rebuke:",
          "desc": "Como reacción, cuando es atacado, el Robo-Warlock puede lanzar _Reprensión Infernal_ como acción de respuesta."
        }
      ],
      "actions": [
        {
          "name": "Eldritch Blast",
          "desc": "Ataque de combate o arma energética."
        },
        {
          "name": "Protocolo de Conjuros",
          "desc": "(CD de Hechizo 17, +9 al ataque de hechizos) • - **Cantrips:** _Rayo de Escarcha, Mano de Mago_ • - **Nivel 3 (3/día):** _Maleficio, Rayo de Enfermedad_ • - **Nivel 5 (2/día):** _Toque Vampírico"
        }
      ],
      "bonusActions": [],
      "reactions": [],
      "source": "Motor Alma y Sangre"
    },
    {
      "id": "mon-lobo",
      "campaignId": "global",
      "name": "Lobo (Wolf)",
      "size": "Medium",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 13,
      "acDescription": "armadura natural",
      "hp": 11,
      "hitDice": "2d8 + 2",
      "speed": "40 pies",
      "stats": { "str": 12, "dex": 15, "con": 12, "int": 3, "wis": 12, "cha": 6 },
      "skills": "Percepción +3, Sigilo +4",
      "senses": "Percepción pasiva 13",
      "languages": "--",
      "cr": "1/4",
      "xp": 50,
      "traits": [
        {
          "name": "Oído y Olfato Agudos",
          "desc": "El lobo tiene ventaja en las pruebas de Sabiduría (Percepción) que dependan del oído o del olfato."
        },
        {
          "name": "Tácticas de Manada",
          "desc": "El lobo tiene ventaja en las tiradas de ataque contra una criatura si al menos uno de los aliados del lobo está a 5 pies de la criatura y no está incapacitado."
        }
      ],
      "actions": [
        {
          "name": "Mordisco",
          "desc": "Ataque con arma cuerpo a cuerpo: +4 para impactar, alcance 5 pies, un objetivo. Impacto: 7 (2d4 + 2) de daño perforante. Si el objetivo es una criatura, debe superar una tirada de salvación de Fuerza CD 11 o ser derribada (prone)."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-lobo-terrible",
      "campaignId": "global",
      "name": "Lobo Terrible (Dire Wolf)",
      "size": "Large",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 14,
      "acDescription": "armadura natural",
      "hp": 37,
      "hitDice": "5d10 + 10",
      "speed": "50 pies",
      "stats": { "str": 17, "dex": 15, "con": 15, "int": 3, "wis": 12, "cha": 7 },
      "skills": "Percepción +3, Sigilo +4",
      "senses": "Percepción pasiva 13",
      "languages": "--",
      "cr": "1",
      "xp": 200,
      "traits": [
        {
          "name": "Oído y Olfato Agudos",
          "desc": "Ventaja en pruebas de Percepción que dependan del oído o el olfato."
        },
        {
          "name": "Tácticas de Manada",
          "desc": "Ventaja en ataques contra una criatura si un aliado no incapacitado está a 5 pies de ella."
        }
      ],
      "actions": [
        {
          "name": "Mordisco Brutal",
          "desc": "Ataque con arma cuerpo a cuerpo: +5 para impactar, alcance 5 pies. Impacto: 10 (2d6 + 3) de daño perforante. Salvación de Fuerza CD 13 o derribado."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-oso-pardo",
      "campaignId": "global",
      "name": "Oso Pardo (Brown Bear)",
      "size": "Large",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 11,
      "acDescription": "armadura natural",
      "hp": 34,
      "hitDice": "4d10 + 12",
      "speed": "40 pies, trepar 30 pies",
      "stats": { "str": 19, "dex": 10, "con": 16, "int": 2, "wis": 13, "cha": 7 },
      "skills": "Percepción +3",
      "senses": "Percepción pasiva 13",
      "languages": "--",
      "cr": "1",
      "xp": 200,
      "traits": [
        {
          "name": "Olfato Agudo",
          "desc": "El oso tiene ventaja en las pruebas de Percepción que dependan del olfato."
        }
      ],
      "actions": [
        {
          "name": "Ataque Múltiple",
          "desc": "El oso realiza dos ataques: uno con su mordisco y otro con sus garras."
        },
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +6 para impactar, alcance 5 pies. Impacto: 8 (1d8 + 4) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +6 para impactar, alcance 5 pies. Impacto: 11 (2d6 + 4) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-oso-negro",
      "campaignId": "global",
      "name": "Oso Negro (Black Bear)",
      "size": "Medium",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 11,
      "acDescription": "armadura natural",
      "hp": 19,
      "hitDice": "3d8 + 6",
      "speed": "40 pies, trepar 30 pies",
      "stats": { "str": 15, "dex": 10, "con": 14, "int": 2, "wis": 12, "cha": 7 },
      "skills": "Percepción +3",
      "senses": "Percepción pasiva 13",
      "languages": "--",
      "cr": "1/2",
      "xp": 100,
      "traits": [
        {
          "name": "Olfato Agudo",
          "desc": "Ventaja en pruebas de Percepción basadas en olfato."
        }
      ],
      "actions": [
        {
          "name": "Ataque Múltiple",
          "desc": "El oso realiza dos ataques: uno con su mordisco y uno con sus garras."
        },
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +4 para impactar. Impacto: 5 (1d6 + 2) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +4 para impactar. Impacto: 7 (2d4 + 2) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-jabali",
      "campaignId": "global",
      "name": "Jabalí (Boar)",
      "size": "Medium",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 11,
      "acDescription": "armadura natural",
      "hp": 11,
      "hitDice": "2d8 + 2",
      "speed": "40 pies",
      "stats": { "str": 13, "dex": 11, "con": 12, "int": 2, "wis": 9, "cha": 5 },
      "senses": "Percepción pasiva 9",
      "languages": "--",
      "cr": "1/4",
      "xp": 50,
      "traits": [
        {
          "name": "Carga",
          "desc": "Si el jabalí se mueve al menos 20 pies en línea recta hacia un objetivo y luego impacta con sus colmillos en el mismo turno, el objetivo sufre 3 (1d6) de daño adicional. Si es una criatura, salvación de Fuerza CD 11 o derribada."
        },
        {
          "name": "Implacable (Relentless - 1/Descanso Corto)",
          "desc": "Si el jabalí sufre 7 de daño o menos que lo reduciría a 0 puntos de golpe, se reduce a 1 punto de golpe en su lugar."
        }
      ],
      "actions": [
        {
          "name": "Colmillos",
          "desc": "Ataque con arma cuerpo a cuerpo: +3 para impactar, alcance 5 pies. Impacto: 4 (1d6 + 1) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-arana-gigante",
      "campaignId": "global",
      "name": "Araña Gigante (Giant Spider)",
      "size": "Large",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 14,
      "acDescription": "armadura natural",
      "hp": 26,
      "hitDice": "4d10 + 4",
      "speed": "30 pies, trepar 30 pies",
      "stats": { "str": 14, "dex": 16, "con": 12, "int": 2, "wis": 11, "cha": 4 },
      "skills": "Sigilo +7",
      "senses": "Visión a ciegas 10 pies, visión en la oscuridad 60 pies, Percepción pasiva 10",
      "languages": "--",
      "cr": "1",
      "xp": 200,
      "traits": [
        {
          "name": "Caminar por Telarañas",
          "desc": "La araña ignora las restricciones de movimiento provocadas por las telarañas."
        },
        {
          "name": "Escalar como Araña",
          "desc": "La araña puede trepar por superficies difíciles, incluidos techos cabeza abajo, sin necesidad de realizar pruebas de característica."
        }
      ],
      "actions": [
        {
          "name": "Mordisco Venenoso",
          "desc": "Ataque cuerpo a cuerpo: +5 para impactar, alcance 5 pies. Impacto: 7 (1d8 + 3) de daño perforante, y el objetivo debe realizar una salvación de Constitución CD 11: 9 (2d8) de daño por veneno si falla (mitad si supera). Si el veneno reduce a 0 HP, la criatura queda paralizada y estable."
        },
        {
          "name": "Telaraña (Recarga 5-6)",
          "desc": "Ataque a distancia: +5 para impactar, alcance 30/60 pies. Impacto: El objetivo queda apresado por telarañas. Puede liberarse con una prueba de Fuerza CD 12."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-pantera",
      "campaignId": "global",
      "name": "Pantera (Panther)",
      "size": "Medium",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 12,
      "acDescription": "",
      "hp": 13,
      "hitDice": "3d8",
      "speed": "50 pies, trepar 40 pies",
      "stats": { "str": 14, "dex": 15, "con": 10, "int": 3, "wis": 14, "cha": 7 },
      "skills": "Percepción +4, Sigilo +6",
      "senses": "Percepción pasiva 14",
      "languages": "--",
      "cr": "1/4",
      "xp": 50,
      "traits": [
        {
          "name": "Oído y Olfato Agudos",
          "desc": "Ventaja en pruebas de Sabiduría (Percepción) basadas en oído y olfato."
        },
        {
          "name": "Abalanzarse (Pounce)",
          "desc": "Si se mueve 20 pies en línea recta e impacta con garra, salvación de Fuerza CD 12 o derribado. Si es derribado, la pantera puede hacer un mordisco como acción adicional."
        }
      ],
      "actions": [
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +4 para impactar. Impacto: 5 (1d6 + 2) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +4 para impactar. Impacto: 4 (1d4 + 2) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-tigre",
      "campaignId": "global",
      "name": "Tigre (Tiger)",
      "size": "Large",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 12,
      "acDescription": "",
      "hp": 37,
      "hitDice": "5d10 + 10",
      "speed": "40 pies",
      "stats": { "str": 17, "dex": 15, "con": 14, "int": 3, "wis": 12, "cha": 8 },
      "skills": "Percepción +3, Sigilo +6",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 13",
      "languages": "--",
      "cr": "1",
      "xp": 200,
      "traits": [
        {
          "name": "Abalanzarse (Pounce)",
          "desc": "Si se mueve 20 pies en línea recta e impacta con garra, salvación de Fuerza CD 13 o derribado, permitiendo un mordisco como acción adicional."
        }
      ],
      "actions": [
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +5 para impactar. Impacto: 8 (1d10 + 3) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +5 para impactar. Impacto: 7 (1d8 + 3) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-aguila-gigante",
      "campaignId": "global",
      "name": "Águila Gigante (Giant Eagle)",
      "size": "Large",
      "type": "beast",
      "alignment": "neutral good",
      "ac": 13,
      "acDescription": "",
      "hp": 26,
      "hitDice": "4d10 + 4",
      "speed": "10 pies, volar 80 pies",
      "stats": { "str": 16, "dex": 17, "con": 13, "int": 8, "wis": 14, "cha": 10 },
      "skills": "Percepción +4",
      "senses": "Percepción pasiva 14",
      "languages": "Entiende Auran y Común pero no habla",
      "cr": "1",
      "xp": 200,
      "traits": [
        {
          "name": "Vista Aguda",
          "desc": "Ventaja en pruebas de Percepción que dependan de la vista."
        }
      ],
      "actions": [
        {
          "name": "Ataque Múltiple",
          "desc": "El águila realiza dos ataques: uno con su pico y otro con sus garras."
        },
        {
          "name": "Pico",
          "desc": "Ataque cuerpo a cuerpo: +5 para impactar. Impacto: 6 (1d6 + 3) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +5 para impactar. Impacto: 10 (2d6 + 3) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-serpiente-venenosa-gigante",
      "campaignId": "global",
      "name": "Serpiente Venenosa Gigante",
      "size": "Medium",
      "type": "beast",
      "alignment": "unaligned",
      "ac": 14,
      "acDescription": "",
      "hp": 11,
      "hitDice": "2d8 + 2",
      "speed": "30 pies, nadar 30 pies",
      "stats": { "str": 10, "dex": 18, "con": 13, "int": 2, "wis": 10, "cha": 3 },
      "skills": "Percepción +2",
      "senses": "Visión a ciegas 10 pies, Percepción pasiva 12",
      "languages": "--",
      "cr": "1/4",
      "xp": 50,
      "actions": [
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +6 para impactar, alcance 10 pies. Impacto: 6 (1d4 + 4) de daño perforante, y el objetivo debe realizar una salvación de Constitución CD 11: 10 (3d6) de daño por veneno si falla, o mitad si supera."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-osochuza",
      "campaignId": "global",
      "name": "Osochuza (Owlbear)",
      "size": "Large",
      "type": "monstrosity",
      "alignment": "unaligned",
      "ac": 13,
      "acDescription": "armadura natural",
      "hp": 59,
      "hitDice": "7d10 + 21",
      "speed": "40 pies",
      "stats": { "str": 20, "dex": 12, "con": 17, "int": 3, "wis": 12, "cha": 7 },
      "skills": "Percepción +3",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 13",
      "languages": "--",
      "cr": "3",
      "xp": 700,
      "traits": [
        {
          "name": "Vista y Olfato Agudos",
          "desc": "El osochuza tiene ventaja en las pruebas de Sabiduría (Percepción) basadas en la vista o el olfato."
        }
      ],
      "actions": [
        {
          "name": "Ataque Múltiple",
          "desc": "El osochuza realiza dos ataques: uno con su pico y otro con sus garras."
        },
        {
          "name": "Pico",
          "desc": "Ataque cuerpo a cuerpo: +7 para impactar, alcance 5 pies. Impacto: 10 (1d10 + 5) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +7 para impactar, alcance 5 pies. Impacto: 14 (2d8 + 5) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-troll",
      "campaignId": "global",
      "name": "Troll",
      "size": "Large",
      "type": "giant",
      "alignment": "chaotic evil",
      "ac": 15,
      "acDescription": "armadura natural",
      "hp": 84,
      "hitDice": "8d10 + 40",
      "speed": "30 pies",
      "stats": { "str": 18, "dex": 13, "con": 20, "int": 7, "wis": 9, "cha": 7 },
      "skills": "Percepción +2",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 12",
      "languages": "Gigante",
      "cr": "5",
      "xp": 1800,
      "traits": [
        {
          "name": "Regeneración Voraz",
          "desc": "El troll recupera 10 puntos de golpe al principio de su turno. Si sufre daño por ácido o por fuego, este rasgo no funciona al principio de su siguiente turno. El troll muere solo si empieza su turno con 0 puntos de golpe y no puede regenerarse."
        }
      ],
      "actions": [
        {
          "name": "Ataque Múltiple",
          "desc": "El troll realiza tres ataques: uno con su mordisco y dos con sus garras."
        },
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +7 para impactar. Impacto: 7 (1d6 + 4) de daño perforante."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +7 para impactar. Impacto: 11 (2d6 + 4) de daño cortante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-ogro",
      "campaignId": "global",
      "name": "Ogro (Ogre)",
      "size": "Large",
      "type": "giant",
      "alignment": "chaotic evil",
      "ac": 11,
      "acDescription": "pieles",
      "hp": 59,
      "hitDice": "7d10 + 21",
      "speed": "40 pies",
      "stats": { "str": 19, "dex": 8, "con": 16, "int": 5, "wis": 7, "cha": 7 },
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 8",
      "languages": "Común, Gigante",
      "cr": "2",
      "xp": 450,
      "actions": [
        {
          "name": "Garrote Gigante",
          "desc": "Ataque con arma cuerpo a cuerpo: +6 para impactar, alcance 5 pies. Impacto: 13 (2d8 + 4) de daño contundente."
        },
        {
          "name": "Jabalina",
          "desc": "Ataque a distancia: +6 para impactar, alcance 30/120 pies. Impacto: 11 (2d6 + 4) de daño perforante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-orco",
      "campaignId": "global",
      "name": "Orco (Orc)",
      "size": "Medium",
      "type": "humanoid (orco)",
      "alignment": "chaotic evil",
      "ac": 13,
      "acDescription": "armadura de pieles",
      "hp": 15,
      "hitDice": "2d8 + 6",
      "speed": "30 pies",
      "stats": { "str": 16, "dex": 12, "con": 16, "int": 7, "wis": 11, "cha": 10 },
      "skills": "Intimidación +2",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 10",
      "languages": "Común, Orco",
      "cr": "1/2",
      "xp": 100,
      "traits": [
        {
          "name": "Agresivo (Aggressive)",
          "desc": "Como acción adicional, el orco puede moverse hasta su velocidad hacia una criatura hostil que pueda ver."
        }
      ],
      "actions": [
        {
          "name": "Gran Hacha",
          "desc": "Ataque cuerpo a cuerpo: +5 para impactar, alcance 5 pies. Impacto: 9 (1d12 + 3) de daño cortante."
        },
        {
          "name": "Jabalina",
          "desc": "Ataque a distancia: +5 para impactar, alcance 30/120 pies. Impacto: 6 (1d6 + 3) de daño perforante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-esqueleto",
      "campaignId": "global",
      "name": "Esqueleto (Skeleton)",
      "size": "Medium",
      "type": "undead",
      "alignment": "lawful evil",
      "ac": 13,
      "acDescription": "restos de armadura",
      "hp": 13,
      "hitDice": "2d8 + 4",
      "speed": "30 pies",
      "stats": { "str": 10, "dex": 14, "con": 15, "int": 6, "wis": 8, "cha": 5 },
      "damageVulnerabilities": "Daño contundente",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado, Agotamiento",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 9",
      "languages": "Entiende los idiomas que conocía en vida pero no habla",
      "cr": "1/4",
      "xp": 50,
      "actions": [
        {
          "name": "Espada Corta",
          "desc": "Ataque cuerpo a cuerpo: +4 para impactar. Impacto: 5 (1d6 + 2) de daño perforante."
        },
        {
          "name": "Arco Corto",
          "desc": "Ataque a distancia: +4 para impactar, alcance 80/320 pies. Impacto: 5 (1d6 + 2) de daño perforante."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-zombie",
      "campaignId": "global",
      "name": "Zombi (Zombie)",
      "size": "Medium",
      "type": "undead",
      "alignment": "neutral evil",
      "ac": 8,
      "acDescription": "",
      "hp": 22,
      "hitDice": "3d8 + 9",
      "speed": "20 pies",
      "stats": { "str": 13, "dex": 6, "con": 16, "int": 3, "wis": 6, "cha": 5 },
      "saves": "Sabiduría +0",
      "damageImmunities": "Veneno",
      "conditionImmunities": "Envenenado",
      "senses": "Visión en la oscuridad 60 pies, Percepción pasiva 8",
      "languages": "Entiende los idiomas de su vida pasada",
      "cr": "1/4",
      "xp": 50,
      "traits": [
        {
          "name": "Fortaleza de los Muertos Vivientes",
          "desc": "Si el daño reduce al zombi a 0 puntos de golpe, debe realizar una tirada de salvación de Constitución con una CD de 5 + el daño sufrido, a menos que el daño sea radiante o de un golpe crítico. Si tiene éxito, se reduce a 1 punto de golpe en su lugar."
        }
      ],
      "actions": [
        {
          "name": "Golpe Contundente",
          "desc": "Ataque cuerpo a cuerpo: +3 para impactar. Impacto: 4 (1d6 + 1) de daño contundente."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
    {
      "id": "mon-dragon-rojo-joven",
      "campaignId": "global",
      "name": "Dragón Rojo Joven (Young Red Dragon)",
      "size": "Large",
      "type": "dragon",
      "alignment": "chaotic evil",
      "ac": 18,
      "acDescription": "armadura natural",
      "hp": 178,
      "hitDice": "17d10 + 85",
      "speed": "40 pies, trepar 40 pies, volar 80 pies",
      "stats": { "str": 23, "dex": 10, "con": 21, "int": 14, "wis": 11, "cha": 19 },
      "saves": "Destreza +4, Constitución +9, Sabiduría +4, Carisma +8",
      "skills": "Percepción +8, Sigilo +4",
      "damageImmunities": "Fuego",
      "senses": "Visión a ciegas 30 pies, visión en la oscuridad 120 pies, Percepción pasiva 18",
      "languages": "Común, Dracónico",
      "cr": "10",
      "xp": 5900,
      "actions": [
        {
          "name": "Ataque Múltiple",
          "desc": "El dragón realiza tres ataques: uno con su mordisco y dos con sus garras."
        },
        {
          "name": "Mordisco",
          "desc": "Ataque cuerpo a cuerpo: +10 para impactar, alcance 10 pies. Impacto: 17 (2d10 + 6) de daño perforante más 3 (1d6) de daño por fuego."
        },
        {
          "name": "Garras",
          "desc": "Ataque cuerpo a cuerpo: +10 para impactar, alcance 5 pies. Impacto: 13 (2d6 + 6) de daño cortante."
        },
        {
          "name": "Aliento de Fuego (Recarga 5-6)",
          "desc": "El dragón exhala fuego en un cono de 30 pies. Cada criatura debe superar una salvación de Destreza CD 17: 56 (16d6) de daño por fuego si falla, o mitad si supera."
        }
      ],
      "source": "SRD 5e Bestiario"
    },
{
    "id": "mon-goblin",
    "name": "Goblin",
    "size": "Small",
    "type": "Humanoid",
    "subtype": "goblinoid",
    "alignment": "Neutral Evil",
    "ac": 15,
    "acDescription": "armadura de cuero, escudo",
    "hp": 7,
    "hitDice": "2d6",
    "speed": "30 ft.",
    "stats": {
      "str": 8,
      "dex": 14,
      "con": 10,
      "int": 10,
      "wis": 8,
      "cha": 8
    },
    "skills": "Sigilo +6",
    "senses": "Visión en la oscuridad 60 ft., Percepción pasiva 9",
    "languages": "Común, Goblin",
    "cr": "1/4",
    "xp": 50,
    "traits": [
      {
        "name": "Escape Ágil (Nimble Escape)",
        "desc": "El goblin puede realizar la acción de Destrabarse o Esconderse como acción adicional en cada uno de sus turnos."
      }
    ],
    "actions": [
      {
        "name": "Cimitarra",
        "desc": "Ataque de arma cuerpo a cuerpo: +4 para impactar, alcance 5 ft. Impacto: 5 (1d6 + 2) daño cortante."
      },
      {
        "name": "Arco Corto",
        "desc": "Ataque de arma a distancia: +4 para impactar, distancia 80/320 ft. Impacto: 5 (1d6 + 2) daño perforante."
      }
    ]
  }
];

export const DEFAULT_ENCOUNTERS: Encounter[] = [
  {
    "id": "enc-asalto-automatas",
    "campaignId": "camp-motor-alma",
    "name": "Emboscada de Escuadrón Mecánico",
    "description": "Un Robo Asesino apoyado por un Robo Mago y un Robo Bárbaro atacan a la party.",
    "enemies": [
      {
        "monsterId": "mon-robo-barbaro",
        "count": 1
      },
      {
        "monsterId": "mon-robo-asesino",
        "count": 1
      },
      {
        "monsterId": "mon-robo-mago",
        "count": 1
      }
    ],
    "difficulty": "Deadly",
    "totalXp": 2500,
    "adjustedXp": 5000,
    "status": "planned"
  },
  {
    "id": "enc-duo-oscuro",
    "campaignId": "camp-motor-alma",
    "name": "Pacto de Sangre y Metal",
    "description": "Robo Warlock y Robo Clérigo protegiendo la terminal del inhibidor.",
    "enemies": [
      {
        "monsterId": "mon-robo-warlock",
        "count": 1
      },
      {
        "monsterId": "mon-robo-clerigo",
        "count": 1
      }
    ],
    "difficulty": "Hard",
    "totalXp": 1800,
    "adjustedXp": 2700,
    "status": "planned"
  },
  {
    "id": "enc-climax-hielo",
    "campaignId": "camp-hielo-quebrado",
    "name": "El Clímax en la Caverna Glacial",
    "description": "La temible Aberración de Savia Gélida custodiada por 3 Larvas de Escarcha.",
    "enemies": [
      {
        "monsterId": "mon-aberraci-n-de-savia-g-lida",
        "count": 1
      },
      {
        "monsterId": "mon-larva-de-escarcha",
        "count": 3
      }
    ],
    "difficulty": "Hard",
    "totalXp": 525,
    "adjustedXp": 1050,
    "status": "planned"
  }
];

export const OBSIDIAN_VAULT_EXPORT = {
  campaigns: DEFAULT_CAMPAIGNS,
  activeCampaignId: DEFAULT_CAMPAIGNS[0].id,
  characters: DEFAULT_CHARACTERS,
  monsters: DEFAULT_MONSTERS,
  encounters: DEFAULT_ENCOUNTERS,
  exportedAt: "2026-10-05T14:17:04.194Z"
};
