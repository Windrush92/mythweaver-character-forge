// Compendio Oficial de Clases y Subclases D&D 5.5e (2024 Revised Rules) - Bilingüe
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

export const DND_2024_CLASSES: Class2024[] = [
  {
    "id": "class-2024-barbarian",
    "slug": "barbarian",
    "name": "Bárbaro",
    "nameEn": "Barbarian",
    "edition": "5.5e",
    "hitDie": 12,
    "primaryAbility": "Fuerza",
    "primaryAbilityEn": "Strength",
    "savingThrows": "Fuerza, Constitución",
    "subclassLevel": 3,
    "weaponMasteryCount": 2,
    "description": "Guerreros formidables impulsados por fuerzas primordiales que se manifiestan como una Furia sobrenatural. Encarnan la ferocidad del depredador, la tormenta y el caos de la batalla.",
    "descriptionEn": "Mighty warriors powered by primal forces manifesting as supernatural Rage.",
    "subclasses": [
      {
        "id": "subclass-2024-berserker",
        "slug": "path-of-the-berserker",
        "name": "Senda del Berserker",
        "nameEn": "Path of the Berserker",
        "description": "Canalizan su furia en violencia desenfrenada. Causan Frenesí con dados de daño adicionales y se vuelven inmunes al miedo y al hechizo mientras están en Furia.",
        "descriptionEn": "Channel violent fury into devastating Frenzy extra damage."
      },
      {
        "id": "subclass-2024-wild-heart",
        "slug": "path-of-the-wild-heart",
        "name": "Senda del Corazón Salvaje",
        "nameEn": "Path of the Wild Heart",
        "description": "Hermanados con los espíritus de la naturaleza (Oso, Águila, Lobo), adquieren resistencias totémicas y guían a sus aliados con ferocidad animal.",
        "descriptionEn": "Commune with animal spirits for formidable combat auras."
      },
      {
        "id": "subclass-2024-world-tree",
        "slug": "path-of-the-world-tree",
        "name": "Senda del Árbol del Mundo",
        "nameEn": "Path of the World Tree",
        "description": "Conectados a las raíces de Yggdrasil, otorgan puntos de golpe temporales a sus aliados y manipulan el espacio con zarcillos cósmicos.",
        "descriptionEn": "Channel the roots of Yggdrasil to protect allies and teleport across the battlefield."
      },
      {
        "id": "subclass-2024-zealot",
        "slug": "path-of-the-zealot",
        "name": "Senda del Celo Fanático",
        "nameEn": "Path of the Zealot",
        "description": "Guerreros bendecidos por deidades de la batalla cuyos golpes destellan con daño radiante o necrótico, desafiando a la muerte misma.",
        "descriptionEn": "Infuse rage with divine radiance, defying death on the battlefield."
      }
    ]
  },
  {
    "id": "class-2024-fighter",
    "slug": "fighter",
    "name": "Guerrero",
    "nameEn": "Fighter",
    "edition": "5.5e",
    "hitDie": 10,
    "primaryAbility": "Fuerza o Destreza",
    "primaryAbilityEn": "Strength or Dexterity",
    "savingThrows": "Fuerza, Constitución",
    "subclassLevel": 3,
    "weaponMasteryCount": 3,
    "description": "Maestros incomparables del combate armamentístico, la táctica marcial y el acondicionamiento físico extremo. Capaces de desatar Oleadas de Acción y dominar múltiples armas maestras.",
    "descriptionEn": "Unrivaled masters of tactical combat, weapon mastery, and Action Surge.",
    "subclasses": [
      {
        "id": "subclass-2024-champion",
        "slug": "champion",
        "name": "Campeón",
        "nameEn": "Champion",
        "description": "Enfocado en la perfección física pura. Anotan impactos críticos con 19 y 20, obtienen ventaja en iniciativa y ganan Heroic Inspiration constante.",
        "descriptionEn": "Pure physical perfection, scoring critical hits on 19-20."
      },
      {
        "id": "subclass-2024-battle-master",
        "slug": "battle-master",
        "name": "Maestro de Batalla",
        "nameEn": "Battle Master",
        "description": "Estudiosos de la estrategia militar. Emplean Maniobras y Dados de Superioridad (d8) para desarmar, derribar, comandar aliados y controlar el campo.",
        "descriptionEn": "Tactical genius wielding Maneuvers and Superiority Dice."
      },
      {
        "id": "subclass-2024-eldritch-knight",
        "slug": "eldritch-knight",
        "name": "Caballero Sobrenatural",
        "nameEn": "Eldritch Knight",
        "description": "Combinan maestría con la espada y magia de Mago. Vinculan sus armas para invocarlas a su mano e intercalan trucos con sus ataques.",
        "descriptionEn": "Combines martial mastery with Wizard spells and weapon bonding."
      },
      {
        "id": "subclass-2024-psi-warrior",
        "slug": "psi-warrior",
        "name": "Guerrero Psiónico",
        "nameEn": "Psi Warrior",
        "description": "Despiertan el poder latente de sus mentes para mover objetos por telequinesis, propulsar sus golpes con energía psiónica y proyectar escudos mentales.",
        "descriptionEn": "Awakens telekinetic psionic energy to bolster strikes and defend comrades."
      }
    ]
  },
  {
    "id": "class-2024-wizard",
    "slug": "wizard",
    "name": "Mago",
    "nameEn": "Wizard",
    "edition": "5.5e",
    "hitDie": 6,
    "primaryAbility": "Inteligencia",
    "primaryAbilityEn": "Intelligence",
    "savingThrows": "Inteligencia, Sabiduría",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Eruditos supremos del conocimiento arcano. Modifican el tejido de la realidad memorizando fórmulas complejas en sus preciados grimorios.",
    "descriptionEn": "Supreme scholars of arcane mysteries, reshaping reality with spellbooks.",
    "subclasses": [
      {
        "id": "subclass-2024-abjurer",
        "slug": "abjurer",
        "name": "Abjurador",
        "nameEn": "Abjurer",
        "description": "Especialistas en magia protectora y contrahechizos. Manifiestan un Guardián Arcano protector que absorbe daño para sí y sus aliados.",
        "descriptionEn": "Protective magic warding against incoming harm."
      },
      {
        "id": "subclass-2024-evoker",
        "slug": "evoker",
        "name": "Evocador",
        "nameEn": "Evoker",
        "description": "Señores de los elementos destructivos. Crean bolsas seguras para aliados en áreas de fuego o hielo y potencian el daño de sus proyectiles mágicos.",
        "descriptionEn": "Destructive elemental firepower with sculpted safe zones for allies."
      },
      {
        "id": "subclass-2024-diviner",
        "slug": "diviner",
        "name": "Adivino",
        "nameEn": "Diviner",
        "description": "Visionarios que desentrañan el tiempo y el destino. Tiran dados de Presagio al inicio del día para reemplazar tiradas de dados cruciales.",
        "descriptionEn": "Masters of fate and Portent dice."
      },
      {
        "id": "subclass-2024-illusionist",
        "slug": "illusionist",
        "name": "Ilusionista",
        "nameEn": "Illusionist",
        "description": "Maestros del engaño sensorial capaces de hacer tangibles sus ilusiones y confundir la mente de los observadores más sagaces.",
        "descriptionEn": "Masters of sensory deception and malleable illusions."
      }
    ]
  },
  {
    "id": "class-2024-rogue",
    "slug": "rogue",
    "name": "Pícaro",
    "nameEn": "Rogue",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Destreza",
    "primaryAbilityEn": "Dexterity",
    "savingThrows": "Destreza, Inteligencia",
    "subclassLevel": 3,
    "weaponMasteryCount": 2,
    "description": "Especialistas en sigilo, infiltración y ataques fulminantes. Su Ataque Furtivo castiga cualquier distracción enemiga con daño quirúrgico y letal.",
    "descriptionEn": "Specialists in stealth, surgical Sneak Attacks, and cunning mobility.",
    "subclasses": [
      {
        "id": "subclass-2024-thief",
        "slug": "thief",
        "name": "Ladrón",
        "nameEn": "Thief",
        "description": "Manos rápidas para usar objetos como Acción Adicional, escalar a velocidad completa y utilizar cualquier objeto mágico sin restricciones de clase.",
        "descriptionEn": "Fast Hands, supreme mobility, and versatile magic item usage."
      },
      {
        "id": "subclass-2024-assassin",
        "slug": "assassin",
        "name": "Asesino",
        "nameEn": "Assassin",
        "description": "Emboscadores letales que infligen daño crítico masivo a objetivos sorprendidos o que aún no han actuado en combate.",
        "descriptionEn": "Lethal ambush predator scoring devastating initial strikes."
      },
      {
        "id": "subclass-2024-arcane-trickster",
        "slug": "arcane-trickster",
        "name": "Embaucador Arcano",
        "nameEn": "Arcane Trickster",
        "description": "Combinan su picaresca con ilusiones y encantamientos arcanos, controlando una Mano de Mago invisible para robar a distancia.",
        "descriptionEn": "Weaves illusion and enchantment spells with versatile thievery."
      },
      {
        "id": "subclass-2024-soulknife",
        "slug": "soulknife",
        "name": "Cuchilla del Alma",
        "nameEn": "Soulknife",
        "description": "Manifiestan dagas psiónicas de energía mental pura que atraviesan armaduras sin dejar marcas físicas y conectan mentes telepáticamente.",
        "descriptionEn": "Strikes with psionic blades woven from concentrated thought."
      }
    ]
  },
  {
    "id": "class-2024-cleric",
    "slug": "cleric",
    "name": "Clérigo",
    "nameEn": "Cleric",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Sabiduría",
    "primaryAbilityEn": "Wisdom",
    "savingThrows": "Sabiduría, Carisma",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Conductos vivientes del poder de los dioses. Sanan las heridas de los caídos, expulsan no-muertos con Canalizar Divinidad y protegen a los justos.",
    "descriptionEn": "Living conduits of divine wrath and healing grace.",
    "subclasses": [
      {
        "id": "subclass-2024-life-domain",
        "slug": "life-domain",
        "name": "Dominio de la Vida",
        "nameEn": "Life Domain",
        "description": "El dominio supremo de la restauración. Sus conjuros de curación otorgan puntos de golpe adicionales tanto al objetivo como a sí mismos.",
        "descriptionEn": "Supreme vitality and radiant restorative healing."
      },
      {
        "id": "subclass-2024-light-domain",
        "slug": "light-domain",
        "name": "Dominio de la Luz",
        "nameEn": "Light Domain",
        "description": "Irradian el fulgor celestial para incinerar a las hordas oscuras con bolas de fuego y destellos cegadores que imponen desventaja a los atacantes.",
        "descriptionEn": "Blinds foes and unleashes celestial fire."
      },
      {
        "id": "subclass-2024-trickery-domain",
        "slug": "trickery-domain",
        "name": "Dominio del Engaño",
        "nameEn": "Trickery Domain",
        "description": "Favorecidos por dioses bromistas y de las sombras. Crean duplicados ilusorios desde los cuales lanzar conjuros y camuflan a sus aliados.",
        "descriptionEn": "Shadows, illusions, and cunning misdirection."
      },
      {
        "id": "subclass-2024-war-domain",
        "slug": "war-domain",
        "name": "Dominio de la Guerra",
        "nameEn": "War Domain",
        "description": "Guerreros sagrados que bendicen las armas de su escuadrón, realizan ataques adicionales como acción adicional y guían los golpes con precisión divina.",
        "descriptionEn": "Divine champions wielding righteous steel on the front lines."
      }
    ]
  },
  {
    "id": "class-2024-paladin",
    "slug": "paladin",
    "name": "Paladín",
    "nameEn": "Paladin",
    "edition": "5.5e",
    "hitDie": 10,
    "primaryAbility": "Fuerza y Carisma",
    "primaryAbilityEn": "Strength and Charisma",
    "savingThrows": "Sabiduría, Carisma",
    "subclassLevel": 3,
    "weaponMasteryCount": 2,
    "description": "Campeones sagrados unidos por un Juramento inquebrantable. Emanan auras de protección, sanan con Imposición de Manos y destruyen el mal con Castigo Divino (Divine Smite).",
    "descriptionEn": "Holy crusaders bound by sacred oaths, wielding divine smites and protective auras.",
    "subclasses": [
      {
        "id": "subclass-2024-devotion",
        "slug": "oath-of-devotion",
        "name": "Juramento de Devoción",
        "nameEn": "Oath of Devotion",
        "description": "El caballero brillante ideal. Imbuyen su espada con luz sagrada para ganar bono a las tiradas de ataque y son inmunes al hechizo.",
        "descriptionEn": "The quintessential knight in shining armor."
      },
      {
        "id": "subclass-2024-ancients",
        "slug": "oath-of-the-ancients",
        "name": "Juramento de los Antiguos",
        "nameEn": "Oath of the Ancients",
        "description": "Caballeros verdes que defienden la luz y la alegría del mundo natural. Su aura otorga resistencia inquebrantable al daño de conjuros.",
        "descriptionEn": "Green knights protecting natural joy with spell-resistant auras."
      },
      {
        "id": "subclass-2024-vengeance",
        "slug": "oath-of-vengeance",
        "name": "Juramento de Venganza",
        "nameEn": "Oath of Vengeance",
        "description": "Cazadores implacables del mal que juran castigar a los culpables a cualquier precio. Su Voto de Enemistad les concede Ventaja absoluta contra su presa.",
        "descriptionEn": "Ruthless avengers hunting evil with absolute advantage."
      },
      {
        "id": "subclass-2024-glory",
        "slug": "oath-of-glory",
        "name": "Juramento de Gloria",
        "nameEn": "Oath of Glory",
        "description": "Héroes legendarios que inspiran hazañas sobrehumanas en sus aliados y aceleran el paso de su compañía en la batalla.",
        "descriptionEn": "Legendary athletes inspiring great deeds on the battlefield."
      }
    ]
  }
];
