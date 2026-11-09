// Compendio Oficial de Dotes D&D 5.5e (2024 Revised Rules) - Bilingüe
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

export const DND_2024_FEATS: Feat2024[] = [
  {
    "id": "feat-2024-alert",
    "slug": "alert",
    "name": "Alerta",
    "nameEn": "Alert",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Siempre alerta ante el peligro imprevisto, tus reflejos te permiten actuar primero en el combate y coordinar la emboscada con tus compañeros.",
    "descriptionEn": "Always watchful for surprise attacks, your swift instincts ensure you seize the initiative in any confrontation.",
    "benefits": [
      {
        "name": "Competencia en Iniciativa",
        "nameEn": "Initiative Proficiency",
        "desc": "Cuando tiras Iniciativa, puedes sumar tu Bono de Competencia a la tirada.",
        "descEn": "Add your Proficiency Bonus to Initiative rolls."
      },
      {
        "name": "Intercambio de Iniciativa",
        "nameEn": "Initiative Swap",
        "desc": "Inmediatamente después de tirar Iniciativa, puedes intercambiar tu resultado con el de un aliado voluntario en el mismo combate (mientras ninguno esté Incapacitado).",
        "descEn": "Immediately after rolling Initiative, you can swap your Initiative with a willing ally in the same combat."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-crafter",
    "slug": "crafter",
    "name": "Artesano",
    "nameEn": "Crafter",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Tu pericia con las herramientas te permite reparar y forjar objetos a gran velocidad y negociar descuentos con comerciantes.",
    "descriptionEn": "Your mastery with workshop tools enables fast crafting and shrewd trading.",
    "benefits": [
      {
        "name": "Competencia en Herramientas",
        "nameEn": "Tool Proficiency",
        "desc": "Ganas competencia con 3 herramientas de artesano a tu elección.",
        "descEn": "Gain proficiency with 3 artisan's tools of your choice."
      },
      {
        "name": "Descuento de Compra",
        "nameEn": "Discount",
        "desc": "Cada vez que compras un objeto no mágico, recibes un 20% de descuento sobre el precio de lista.",
        "descEn": "20% discount on nonmagical items."
      },
      {
        "name": "Elaboración Rápida",
        "nameEn": "Fast Crafting",
        "desc": "Durante un Descanso Largo, puedes forjar un objeto ordinario usando las herramientas adecuadas si dispones de la materia prima.",
        "descEn": "Craft mundane items during a Long Rest."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-healer",
    "slug": "healer",
    "name": "Sanador",
    "nameEn": "Healer",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Un practicante médico capaz de vendar heridas mortales en medio del combate y estabilizar heridos con precisión de cirujano.",
    "descriptionEn": "A battlefield medic capable of dressing mortal wounds and reviving the fallen.",
    "benefits": [
      {
        "name": "Cuidado de Batalla",
        "nameEn": "Battle Medic",
        "desc": "Si usas un botiquín de primeros auxilios como acción de Utilizar Objeto, una criatura gasta 1 de sus Dados de Golpe y recupera tantos puntos de golpe como la tirada + tu Bono de Competencia.",
        "descEn": "Spend a Healer's Kit charge to let an ally roll a Hit Die + PB in healing."
      },
      {
        "name": "Relanzamiento de Curación",
        "nameEn": "Healing Rerolls",
        "desc": "Siempre que tires dados para curar puntos de golpe (mediante conjuros o botiquín), puedes volver a tirar cualquier dado que saque un 1.",
        "descEn": "Reroll any 1s rolled when healing creatures."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-lucky",
    "slug": "lucky",
    "name": "Afortunado",
    "nameEn": "Lucky",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Posees una fortuna inexplicable que tuerce el destino a tu favor en los momentos más críticos.",
    "descriptionEn": "You possess an inexplicable fortune that bends fate to your whim.",
    "benefits": [
      {
        "name": "Puntos de Suerte",
        "nameEn": "Luck Points",
        "desc": "Tienes tantos Puntos de Suerte como tu Bono de Competencia. Recuperas todos los puntos gastados tras un Descanso Largo.",
        "descEn": "You have Luck Points equal to your PB, recovered on Long Rest."
      },
      {
        "name": "Ventaja de Suerte",
        "nameEn": "Advantage on d20",
        "desc": "Cuando hagas una tirada de d20 (ataque, salvación o prueba), puedes gastar 1 Punto de Suerte para tener Ventaja en la tirada.",
        "descEn": "Spend 1 point to gain Advantage on a d20 roll."
      },
      {
        "name": "Desventaja al Enemigo",
        "nameEn": "Impose Disadvantage",
        "desc": "Cuando un enemigo tire un ataque contra ti, puedes usar tu Reacción y gastar 1 Punto de Suerte para imponerle Desventaja en esa tirada.",
        "descEn": "Spend 1 point as a Reaction to impose Disadvantage on an attack against you."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-magic-initiate",
    "slug": "magic-initiate",
    "name": "Iniciado en la Magia",
    "nameEn": "Magic Initiate",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Has aprendido los rudimentos mágicos de una tradición arcana, divina o natural.",
    "descriptionEn": "You learned the foundations of a magical tradition.",
    "benefits": [
      {
        "name": "Trucos Arcanos",
        "nameEn": "Cantrips",
        "desc": "Aprendes 2 trucos a tu elección de la lista de Clérigo, Druida o Mago.",
        "descEn": "Learn 2 cantrips from Cleric, Druid, or Wizard spell list."
      },
      {
        "name": "Conjuro de Nivel 1",
        "nameEn": "Level 1 Spell",
        "desc": "Eliges 1 conjuro de nivel 1 de esa misma lista. Puedes lanzarlo una vez sin gastar espacio de conjuro por Descanso Largo, y también puedes lanzarlo usando cualquier espacio de conjuro que tengas.",
        "descEn": "Cast one 1st-level spell freely once per Long Rest, or with your spell slots."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-musician",
    "slug": "musician",
    "name": "Músico",
    "nameEn": "Musician",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Tu música conmueve los espíritus e infunde un coraje heroico insuperable en tus aliados.",
    "descriptionEn": "Your melodies stir spirits and inspire heroic greatness.",
    "benefits": [
      {
        "name": "Canción Inspiradora",
        "nameEn": "Inspiring Song",
        "desc": "Al final de un Descanso Corto o Descanso Largo, puedes tocar un instrumento musical para otorgar Inspiración Heroica a tantos aliados como tu Bono de Competencia.",
        "descEn": "Grant Heroic Inspiration to allies equal to your PB upon finishing a Short or Long Rest."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-savage-attacker",
    "slug": "savage-attacker",
    "name": "Atacante Salvaje",
    "nameEn": "Savage Attacker",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Golpeas con una ferocidad arrolladora buscando siempre el impacto más letal.",
    "descriptionEn": "You strike with brutal savagery, optimizing every devastating wound.",
    "benefits": [
      {
        "name": "Daño Brutal",
        "nameEn": "Brutal Strike",
        "desc": "Una vez por turno cuando golpeas a un objetivo con un arma, puedes tirar el daño del arma dos veces y elegir el resultado más alto.",
        "descEn": "Once per turn when hitting with a weapon, roll weapon damage twice and use the higher roll."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-skilled",
    "slug": "skilled",
    "name": "Hábil",
    "nameEn": "Skilled",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Posees una versatilidad excepcional que te permite dominar múltiples disciplinas prácticas.",
    "descriptionEn": "Exceptional versatility allows you to master diverse disciplines.",
    "benefits": [
      {
        "name": "Tres Competencias",
        "nameEn": "Three Proficiencies",
        "desc": "Ganas competencia en cualquier combinación de 3 habilidades o herramientas a tu elección.",
        "descEn": "Gain proficiency in any 3 skills or tools of your choice."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-tavern-brawler",
    "slug": "tavern-brawler",
    "name": "Luchador de Taberna",
    "nameEn": "Tavern Brawler",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Curtido en peleas a puño limpio en tabernas, conviertes banquetas, jarras y puños en armas mortales.",
    "descriptionEn": "Hardened in tavern brawls, you turn mugs, chairs, and fists into deadly weapons.",
    "benefits": [
      {
        "name": "Golpe Desarmado Mejorado",
        "nameEn": "Enhanced Unarmed Strike",
        "desc": "Tus golpes desarmados causan 1d4 + tu modificador de Fuerza de daño contundente.",
        "descEn": "Unarmed strikes deal 1d4 + Strength modifier bludgeoning damage."
      },
      {
        "name": "Empujón Rápido",
        "nameEn": "Push Away",
        "desc": "Una vez por turno cuando golpeas con un ataque desarmado, puedes empujar al objetivo 5 pies lejos de ti.",
        "descEn": "Push a target 5 feet once per turn on an unarmed hit."
      },
      {
        "name": "Armas Improvisadas",
        "nameEn": "Furniture Weapons",
        "desc": "Tienes competencia con armas improvisadas (botellas, mesas, etc.).",
        "descEn": "Proficiency with improvised weapons."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-tough",
    "slug": "tough",
    "name": "Duro",
    "nameEn": "Tough",
    "category": "Origen (Nivel 1)",
    "categoryEn": "Origin (Level 1)",
    "edition": "5.5e",
    "description": "Tu vitalidad prodigiosa te hace capaz de resistir heridas que abatirían a cualquier otro.",
    "descriptionEn": "Prodigious vitality enables you to shrug off mortal punishment.",
    "benefits": [
      {
        "name": "Reserva de Vida",
        "nameEn": "Hit Point Reserve",
        "desc": "Tus puntos de golpe máximos aumentan en 2 por cada nivel de personaje que poseas, y cada vez que subas de nivel aumentan en 2 adicionales.",
        "descEn": "Hit Point maximum increases by 2 per level."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-great-weapon-master",
    "slug": "great-weapon-master",
    "name": "Maestro de Armas Grandes",
    "nameEn": "Great Weapon Master",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "description": "Requisito: Fuerza 13+. Eres un coloso empuñando mandobles, alabardas y grandes hachas.",
    "descriptionEn": "Prerequisite: Strength 13+. Master of devastating heavy weapons.",
    "benefits": [
      {
        "name": "Incremento de Fuerza",
        "nameEn": "Ability Score Increase",
        "desc": "Aumenta tu puntuación de Fuerza en +1 (hasta un máximo de 20).",
        "descEn": "Increase Strength by +1."
      },
      {
        "name": "Impacto demoledor",
        "nameEn": "Hew",
        "desc": "Cuando anotas un golpe crítico o reduces a 0 los PG de un enemigo con un arma pesada, puedes hacer un ataque adicional con arma cuerpo a cuerpo como Acción Adicional.",
        "descEn": "Critical hit or kill grants a melee attack as a Bonus Action."
      },
      {
        "name": "Golpe Pesado",
        "nameEn": "Heavy Weapon Damage",
        "desc": "Cuando golpeas a una criatura con un arma pesada que empuñes a dos manos, sumas tu Bono de Competencia al daño.",
        "descEn": "Add your Proficiency Bonus to heavy weapon damage rolls."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-sentinel",
    "slug": "sentinel",
    "name": "Centinela",
    "nameEn": "Sentinel",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "description": "Requisito: Fuerza o Destreza 13+. Nadie escapa de tu alcance; eres un guardián implacable.",
    "descriptionEn": "Prerequisite: Strength or Dexterity 13+. Unyielding defender of the front line.",
    "benefits": [
      {
        "name": "Incremento de Característica",
        "nameEn": "Ability Score Increase",
        "desc": "Aumenta tu Fuerza o Destreza en +1 (máximo 20).",
        "descEn": "Increase Strength or Dexterity by +1."
      },
      {
        "name": "Inmovilizar",
        "nameEn": "Halt",
        "desc": "Cuando golpeas a una criatura con un ataque de oportunidad, su velocidad se reduce a 0 durante el resto de su turno.",
        "descEn": "Opportunity attack reduces target speed to 0."
      },
      {
        "name": "Ignorar Desengancharse",
        "nameEn": "Guardian",
        "desc": "Las criaturas provocan ataques de oportunidad de tu parte incluso si toman la acción de Desengancharse (Disengage).",
        "descEn": "Creatures provoke opportunity attacks even if disengaging."
      }
    ],
    "source": "Player's Handbook 2024"
  },
  {
    "id": "feat-2024-war-caster",
    "slug": "war-caster",
    "name": "Conjurador de Guerra",
    "nameEn": "War Caster",
    "category": "General (Nivel 4+)",
    "categoryEn": "General (Level 4+)",
    "edition": "5.5e",
    "description": "Requisito: Lanzador de conjuros. Dominas la magia en medio del fragor sangriento de la primera línea.",
    "descriptionEn": "Prerequisite: Spellcaster. Master of combat spellcasting.",
    "benefits": [
      {
        "name": "Incremento de Mente",
        "nameEn": "Ability Score Increase",
        "desc": "Aumenta tu Inteligencia, Sabiduría o Carisma en +1 (máximo 20).",
        "descEn": "Increase Int, Wis, or Cha by +1."
      },
      {
        "name": "Concentración de Acero",
        "nameEn": "Concentration Advantage",
        "desc": "Tienes Ventaja en las tiradas de salvación de Constitución para mantener la Concentración.",
        "descEn": "Advantage on Constitution saving throws to maintain Concentration."
      },
      {
        "name": "Manos Ocupadas",
        "nameEn": "Somatic Shield",
        "desc": "Puedes ejecutar los componentes somáticos de los conjuros incluso cuando tienes armas o un escudo en una o ambas manos.",
        "descEn": "Perform somatic components with weapons or shield in hand."
      },
      {
        "name": "Hechizo de Oportunidad",
        "nameEn": "Spell as Opportunity Attack",
        "desc": "Cuando un enemigo provoque un ataque de oportunidad tuyo, puedes usar tu Reacción para lanzarle un conjuro de tiempo de lanzamiento de 1 acción en lugar de hacer un ataque con arma.",
        "descEn": "Cast a 1-action spell as an opportunity attack."
      }
    ],
    "source": "Player's Handbook 2024"
  }
];
