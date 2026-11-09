// Compendio Oficial de Armas y Maestrías D&D 5.5e (2024 Revised Rules) - Bilingüe
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

export const DND_2024_WEAPONS: Weapon2024[] = [
  {
    "id": "weapon-2024-club",
    "name": "Garrote",
    "nameEn": "Club",
    "edition": "5.5e",
    "damage": "1d4 Contundente",
    "damageEn": "1d4 Bludgeoning",
    "properties": [
      "Ligera"
    ],
    "propertiesEn": [
      "Light"
    ],
    "mastery": "Ralentizar (Slow)",
    "weight": "2 lb.",
    "cost": "1 sp"
  },
  {
    "id": "weapon-2024-dagger",
    "name": "Daga",
    "nameEn": "Dagger",
    "edition": "5.5e",
    "damage": "1d4 Perforante",
    "damageEn": "1d4 Piercing",
    "properties": [
      "Sutil",
      "Ligera",
      "Arrojadiza (20/60)"
    ],
    "propertiesEn": [
      "Finesse",
      "Light",
      "Thrown (20/60)"
    ],
    "mastery": "Tajar (Nick)",
    "weight": "1 lb.",
    "cost": "2 po"
  },
  {
    "id": "weapon-2024-greatclub",
    "name": "Gran Garrote",
    "nameEn": "Greatclub",
    "edition": "5.5e",
    "damage": "1d8 Contundente",
    "damageEn": "1d8 Bludgeoning",
    "properties": [
      "Dos Manos"
    ],
    "propertiesEn": [
      "Two-Handed"
    ],
    "mastery": "Empujar (Push)",
    "weight": "10 lb.",
    "cost": "2 sp"
  },
  {
    "id": "weapon-2024-handaxe",
    "name": "Hacha de Mano",
    "nameEn": "Handaxe",
    "edition": "5.5e",
    "damage": "1d6 Cortante",
    "damageEn": "1d6 Slashing",
    "properties": [
      "Ligera",
      "Arrojadiza (20/60)"
    ],
    "propertiesEn": [
      "Light",
      "Thrown (20/60)"
    ],
    "mastery": "Acosar (Vex)",
    "weight": "2 lb.",
    "cost": "5 po"
  },
  {
    "id": "weapon-2024-javelin",
    "name": "Jabalina",
    "nameEn": "Javelin",
    "edition": "5.5e",
    "damage": "1d6 Perforante",
    "damageEn": "1d6 Piercing",
    "properties": [
      "Arrojadiza (30/120)"
    ],
    "propertiesEn": [
      "Thrown (30/120)"
    ],
    "mastery": "Ralentizar (Slow)",
    "weight": "2 lb.",
    "cost": "5 sp"
  },
  {
    "id": "weapon-2024-light-hammer",
    "name": "Martillo Ligero",
    "nameEn": "Light Hammer",
    "edition": "5.5e",
    "damage": "1d4 Contundente",
    "damageEn": "1d4 Bludgeoning",
    "properties": [
      "Ligera",
      "Arrojadiza (20/60)"
    ],
    "propertiesEn": [
      "Light",
      "Thrown (20/60)"
    ],
    "mastery": "Tajar (Nick)",
    "weight": "2 lb.",
    "cost": "2 po"
  },
  {
    "id": "weapon-2024-mace",
    "name": "Maza",
    "nameEn": "Mace",
    "edition": "5.5e",
    "damage": "1d6 Contundente",
    "damageEn": "1d6 Bludgeoning",
    "properties": [],
    "propertiesEn": [],
    "mastery": "Debilitar (Sap)",
    "weight": "4 lb.",
    "cost": "5 po"
  },
  {
    "id": "weapon-2024-quarterstaff",
    "name": "Bastón",
    "nameEn": "Quarterstaff",
    "edition": "5.5e",
    "damage": "1d6 Contundente (1d8 a dos manos)",
    "damageEn": "1d6 Bludgeoning (1d8 Versatile)",
    "properties": [
      "Versátil (1d8)"
    ],
    "propertiesEn": [
      "Versatile (1d8)"
    ],
    "mastery": "Derribar (Topple)",
    "weight": "4 lb.",
    "cost": "2 sp"
  },
  {
    "id": "weapon-2024-spear",
    "name": "Lanza",
    "nameEn": "Spear",
    "edition": "5.5e",
    "damage": "1d6 Perforante (1d8 a dos manos)",
    "damageEn": "1d6 Piercing (1d8 Versatile)",
    "properties": [
      "Arrojadiza (20/60)",
      "Versátil (1d8)"
    ],
    "propertiesEn": [
      "Thrown (20/60)",
      "Versatile (1d8)"
    ],
    "mastery": "Debilitar (Sap)",
    "weight": "3 lb.",
    "cost": "1 po"
  },
  {
    "id": "weapon-2024-shortbow",
    "name": "Arco Corto",
    "nameEn": "Shortbow",
    "edition": "5.5e",
    "damage": "1d6 Perforante",
    "damageEn": "1d6 Piercing",
    "properties": [
      "Munición (80/320)",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Ammunition (80/320)",
      "Two-Handed"
    ],
    "mastery": "Acosar (Vex)",
    "weight": "2 lb.",
    "cost": "25 po"
  },
  {
    "id": "weapon-2024-battleaxe",
    "name": "Hacha de Guerra",
    "nameEn": "Battleaxe",
    "edition": "5.5e",
    "damage": "1d8 Cortante (1d10 a dos manos)",
    "damageEn": "1d8 Slashing (1d10 Versatile)",
    "properties": [
      "Versátil (1d10)"
    ],
    "propertiesEn": [
      "Versatile (1d10)"
    ],
    "mastery": "Derribar (Topple)",
    "weight": "4 lb.",
    "cost": "10 po"
  },
  {
    "id": "weapon-2024-glaive",
    "name": "Guja",
    "nameEn": "Glaive",
    "edition": "5.5e",
    "damage": "1d10 Cortante",
    "damageEn": "1d10 Slashing",
    "properties": [
      "Pesada",
      "Alcance (Reach)",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Reach",
      "Two-Handed"
    ],
    "mastery": "Rozar (Graze)",
    "weight": "6 lb.",
    "cost": "20 po"
  },
  {
    "id": "weapon-2024-greataxe",
    "name": "Gran Hacha",
    "nameEn": "Greataxe",
    "edition": "5.5e",
    "damage": "1d12 Cortante",
    "damageEn": "1d12 Slashing",
    "properties": [
      "Pesada",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Two-Handed"
    ],
    "mastery": "Hender (Cleave)",
    "weight": "7 lb.",
    "cost": "30 po"
  },
  {
    "id": "weapon-2024-greatsword",
    "name": "Espadón",
    "nameEn": "Greatsword",
    "edition": "5.5e",
    "damage": "2d6 Cortante",
    "damageEn": "2d6 Slashing",
    "properties": [
      "Pesada",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Two-Handed"
    ],
    "mastery": "Rozar (Graze)",
    "weight": "6 lb.",
    "cost": "50 po"
  },
  {
    "id": "weapon-2024-halberd",
    "name": "Alabarda",
    "nameEn": "Halberd",
    "edition": "5.5e",
    "damage": "1d10 Cortante",
    "damageEn": "1d10 Slashing",
    "properties": [
      "Pesada",
      "Alcance (Reach)",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Reach",
      "Two-Handed"
    ],
    "mastery": "Hender (Cleave)",
    "weight": "6 lb.",
    "cost": "20 po"
  },
  {
    "id": "weapon-2024-longsword",
    "name": "Espada Larga",
    "nameEn": "Longsword",
    "edition": "5.5e",
    "damage": "1d8 Cortante (1d10 a dos manos)",
    "damageEn": "1d8 Slashing (1d10 Versatile)",
    "properties": [
      "Versátil (1d10)"
    ],
    "propertiesEn": [
      "Versatile (1d10)"
    ],
    "mastery": "Debilitar (Sap)",
    "weight": "3 lb.",
    "cost": "15 po"
  },
  {
    "id": "weapon-2024-maul",
    "name": "Mazo de Guerra",
    "nameEn": "Maul",
    "edition": "5.5e",
    "damage": "2d6 Contundente",
    "damageEn": "2d6 Bludgeoning",
    "properties": [
      "Pesada",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Two-Handed"
    ],
    "mastery": "Derribar (Topple)",
    "weight": "10 lb.",
    "cost": "10 po"
  },
  {
    "id": "weapon-2024-rapier",
    "name": "Estoque",
    "nameEn": "Rapier",
    "edition": "5.5e",
    "damage": "1d8 Perforante",
    "damageEn": "1d8 Piercing",
    "properties": [
      "Sutil"
    ],
    "propertiesEn": [
      "Finesse"
    ],
    "mastery": "Acosar (Vex)",
    "weight": "2 lb.",
    "cost": "25 po"
  },
  {
    "id": "weapon-2024-scimitar",
    "name": "Cimitera",
    "nameEn": "Scimitar",
    "edition": "5.5e",
    "damage": "1d6 Cortante",
    "damageEn": "1d6 Slashing",
    "properties": [
      "Sutil",
      "Ligera"
    ],
    "propertiesEn": [
      "Finesse",
      "Light"
    ],
    "mastery": "Tajar (Nick)",
    "weight": "3 lb.",
    "cost": "25 po"
  },
  {
    "id": "weapon-2024-shortsword",
    "name": "Espada Corta",
    "nameEn": "Shortsword",
    "edition": "5.5e",
    "damage": "1d6 Perforante",
    "damageEn": "1d6 Piercing",
    "properties": [
      "Sutil",
      "Ligera"
    ],
    "propertiesEn": [
      "Finesse",
      "Light"
    ],
    "mastery": "Acosar (Vex)",
    "weight": "2 lb.",
    "cost": "10 po"
  },
  {
    "id": "weapon-2024-warhammer",
    "name": "Martillo de Guerra",
    "nameEn": "Warhammer",
    "edition": "5.5e",
    "damage": "1d8 Contundente (1d10 a dos manos)",
    "damageEn": "1d8 Bludgeoning (1d10 Versatile)",
    "properties": [
      "Versátil (1d10)"
    ],
    "propertiesEn": [
      "Versatile (1d10)"
    ],
    "mastery": "Empujar (Push)",
    "weight": "5 lb.",
    "cost": "15 po"
  },
  {
    "id": "weapon-2024-whip",
    "name": "Látigo",
    "nameEn": "Whip",
    "edition": "5.5e",
    "damage": "1d4 Cortante",
    "damageEn": "1d4 Slashing",
    "properties": [
      "Sutil",
      "Alcance (Reach)"
    ],
    "propertiesEn": [
      "Finesse",
      "Reach"
    ],
    "mastery": "Ralentizar (Slow)",
    "weight": "3 lb.",
    "cost": "2 po"
  },
  {
    "id": "weapon-2024-longbow",
    "name": "Arco Largo",
    "nameEn": "Longbow",
    "edition": "5.5e",
    "damage": "1d8 Perforante",
    "damageEn": "1d8 Piercing",
    "properties": [
      "Pesada",
      "Munición (150/600)",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Ammunition (150/600)",
      "Two-Handed"
    ],
    "mastery": "Ralentizar (Slow)",
    "weight": "2 lb.",
    "cost": "50 po"
  },
  {
    "id": "weapon-2024-heavy-crossbow",
    "name": "Ballesta Pesada",
    "nameEn": "Heavy Crossbow",
    "edition": "5.5e",
    "damage": "1d10 Perforante",
    "damageEn": "1d10 Piercing",
    "properties": [
      "Pesada",
      "Munición (100/400)",
      "Recarga",
      "Dos Manos"
    ],
    "propertiesEn": [
      "Heavy",
      "Ammunition (100/400)",
      "Loading",
      "Two-Handed"
    ],
    "mastery": "Empujar (Push)",
    "weight": "18 lb.",
    "cost": "50 po"
  }
];
