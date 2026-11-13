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

export function getWeaponMasteryLimit2024(className: string, level: number): number {
  const norm = (className || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (norm.includes('guerrero') || norm.includes('fighter')) {
    if (level >= 16) return 6;
    if (level >= 10) return 5;
    if (level >= 4) return 4;
    return 3;
  }
  if (norm.includes('barbaro') || norm.includes('barbarian')) {
    if (level >= 10) return 4;
    if (level >= 4) return 3;
    return 2;
  }
  if (norm.includes('palad') || norm.includes('explorador') || norm.includes('ranger') || norm.includes('picaro') || norm.includes('rogue')) {
    return 2;
  }
  return 0;
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
    "id": "class-2024-bard",
    "slug": "bard",
    "name": "Bardo",
    "nameEn": "Bard",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Carisma",
    "primaryAbilityEn": "Charisma",
    "savingThrows": "Destreza y Carisma",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Canalizan las Palabras de la Creación mediante música, danza e ingenio para inspirar aliados, sanar heridas, desmoralizar rivales y lanzar conjuros arcanos.",
    "descriptionEn": "Invoking magic through music, dance, and verse, Bards inspire others, soothe hurts, and cast versatile spells.",
    "subclasses": [
      {
        "id": "subclass-2024-college-of-dance",
        "slug": "college-of-dance",
        "name": "Colegio de la Danza",
        "nameEn": "College of Dance",
        "description": "Unen la agilidad sin armadura con Golpes Desarmados cargados de Inspiración Bárdica y evasión acrobática.",
        "descriptionEn": "Blend unarmored agility, unarmed strikes, and graceful evasion in harmony with the cosmos."
      },
      {
        "id": "subclass-2024-college-of-glamour",
        "slug": "college-of-glamour",
        "name": "Colegio del Glamour",
        "nameEn": "College of Glamour",
        "description": "Tejen la magia hechizante de los Fey para cautivar enemigos, otorgar PG temporales y mover aliados con majestad.",
        "descriptionEn": "Weave beguiling Feywild magic to awe foes and shield allies."
      },
      {
        "id": "subclass-2024-college-of-lore",
        "slug": "college-of-lore",
        "name": "Colegio del Conocimiento",
        "nameEn": "College of Lore",
        "description": "Eruditos versátiles con tres habilidades extra, Palabras Cortantes que frustran ataques y Secretos Mágicos tempranos.",
        "descriptionEn": "Gather diverse knowledge, extra skills, Cutting Words, and early Magical Secrets."
      },
      {
        "id": "subclass-2024-college-of-valor",
        "slug": "college-of-valor",
        "name": "Colegio del Valor",
        "nameEn": "College of Valor",
        "description": "Escaldos guerreros con entrenamiento en armas marciales, armadura media, escudos y Ataque Extra.",
        "descriptionEn": "Daring storytellers trained with martial weapons, medium armor, shields, and Extra Attack."
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
    "id": "class-2024-druid",
    "slug": "druid",
    "name": "Druida",
    "nameEn": "Druid",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Sabiduría",
    "primaryAbilityEn": "Wisdom",
    "savingThrows": "Inteligencia y Sabiduría",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Guardianes primigenios del equilibrio natural. Eligen Orden Primigenio (Mago o Guardián) en nivel 1 y adoptan Forma Salvaje con usos flexibles.",
    "descriptionEn": "Primal guardians who choose Primal Order at level 1 and channel Wild Shape and nature magic.",
    "subclasses": [
      {
        "id": "subclass-2024-circle-of-the-land",
        "slug": "circle-of-the-land",
        "name": "Círculo de la Tierra",
        "nameEn": "Circle of the Land",
        "description": "Místicos vinculados a biomas Árido, Polar, Templado o Tropical que cambian sus conjuros de círculo tras cada Descanso Largo.",
        "descriptionEn": "Mystics attuned to Arid, Polar, Temperate, or Tropical lands."
      },
      {
        "id": "subclass-2024-circle-of-the-moon",
        "slug": "circle-of-the-moon",
        "name": "Círculo de la Luna",
        "nameEn": "Circle of the Moon",
        "description": "Maestros de la transformación combativa que asumen Formas Salvajes poderosas con CA mejorada y conjuros lunares.",
        "descriptionEn": "Shapechangers channeling lunar magic into powerful combat Wild Shape forms."
      },
      {
        "id": "subclass-2024-circle-of-the-sea",
        "slug": "circle-of-the-sea",
        "name": "Círculo del Mar",
        "nameEn": "Circle of the Sea",
        "description": "Desatan la furia de las mareas y tormentas rodeándose de una Ira del Mar que daña y empuja rivales.",
        "descriptionEn": "Channel ocean tides and tempests with Wrath of the Sea."
      },
      {
        "id": "subclass-2024-circle-of-the-stars",
        "slug": "circle-of-the-stars",
        "name": "Círculo de las Estrellas",
        "nameEn": "Circle of the Stars",
        "description": "Astrónomos místicos que asumen Forma Estelar (Arquero, Cáliz o Dragón) gracias a su mapa estelar.",
        "descriptionEn": "Cosmic mystics adopting Archer, Chalice, or Dragon Starry Forms."
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
    "id": "class-2024-monk",
    "slug": "monk",
    "name": "Monje",
    "nameEn": "Monk",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Destreza y Sabiduría",
    "primaryAbilityEn": "Dexterity and Wisdom",
    "savingThrows": "Fuerza y Destreza",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Artistas marciales que canalizan Puntos de Concentración (Focus) desde nivel 2, desvían todo tipo de ataques con Deflectar Ataques y escalan sus Artes Marciales de d6 a d12.",
    "descriptionEn": "Disciplined martial artists channeling Focus points, Martial Arts dice from d6 to d12, and Deflect Attacks.",
    "subclasses": [
      {
        "id": "subclass-2024-warrior-of-mercy",
        "slug": "warrior-of-mercy",
        "name": "Guerrero de la Misericordia",
        "nameEn": "Warrior of Mercy",
        "description": "Médicos enmascarados que equilibran Mano de Curación y Mano de Daño necrótico con Puntos de Concentración.",
        "descriptionEn": "Masked physicians wielding Hand of Healing and necrotic Hand of Harm."
      },
      {
        "id": "subclass-2024-warrior-of-shadow",
        "slug": "warrior-of-shadow",
        "name": "Guerrero de la Sombra",
        "nameEn": "Warrior of Shadow",
        "description": "Infiltradores del Páramo Sombrío que ven a través de su propia Oscuridad mágica y se teletransportan entre sombras.",
        "descriptionEn": "Shadowfell stalkers conjuring Darkness they can see through and leaping between shadows."
      },
      {
        "id": "subclass-2024-warrior-of-the-elements",
        "slug": "warrior-of-the-elements",
        "name": "Guerrero de los Elementos",
        "nameEn": "Warrior of the Elements",
        "description": "Canalizan el Caos Elemental para golpear a 15 pies de alcance con daño ácido, frío, fuego o relámpago y volar en niveles altos.",
        "descriptionEn": "Channel elemental energy for 15-foot elemental unarmed strikes and flight."
      },
      {
        "id": "subclass-2024-warrior-of-the-open-hand",
        "slug": "warrior-of-the-open-hand",
        "name": "Guerrero de la Mano Abierta",
        "nameEn": "Warrior of the Open Hand",
        "description": "Maestros del combate sin armas que aturden reacciones, empujan 15 pies y derriban con cada Ráfaga de Golpes.",
        "descriptionEn": "Unarmed masters adding Addle, Push, and Topple techniques to Flurry of Blows."
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
  },
  {
    "id": "class-2024-ranger",
    "slug": "ranger",
    "name": "Explorador",
    "nameEn": "Ranger",
    "edition": "5.5e",
    "hitDie": 10,
    "primaryAbility": "Destreza y Sabiduría",
    "primaryAbilityEn": "Dexterity and Wisdom",
    "savingThrows": "Fuerza y Destreza",
    "subclassLevel": 3,
    "weaponMasteryCount": 2,
    "description": "Cazadores y rastreadores letales. Desde nivel 1 lanzan conjuros, preparan Marca del Cazador gratis con Enemigo Predilecto y dominan 2 Maestrías de Arma; en nivel 2 obtienen Estilo de Combate y Explorador Hábil.",
    "descriptionEn": "Deadly trackers with Level 1 Spellcasting, Favored Enemy (Hunter Mark), 2 Weapon Masteries, and Level 2 Fighting Style.",
    "subclasses": [
      {
        "id": "subclass-2024-beast-master",
        "slug": "beast-master",
        "name": "Señor de las Bestias",
        "nameEn": "Beast Master",
        "description": "Vínculo primigenio con una Bestia de la Tierra, del Mar o del Cielo que actúa con tu Acción Adicional o sacrificio de ataque.",
        "descriptionEn": "Bond with a Primal Beast of the Land, Sea, or Sky."
      },
      {
        "id": "subclass-2024-fey-wanderer",
        "slug": "fey-wanderer",
        "name": "Caminante Feérico",
        "nameEn": "Fey Wanderer",
        "description": "Suman daño psíquico feérico y Sabiduría a pruebas de Carisma gracias a la bendición de los Fey.",
        "descriptionEn": "Infuse strikes with Psychic damage and add Wisdom to Charisma checks."
      },
      {
        "id": "subclass-2024-gloom-stalker",
        "slug": "gloom-stalker",
        "name": "Acechador de la Penumbra",
        "nameEn": "Gloom Stalker",
        "description": "Emboscadores letales invisibles en la oscuridad, con bono de Sabiduría a Iniciativa y golpes psíquicos.",
        "descriptionEn": "Deadly ambushers unseen by Darkvision with extra speed and Psychic strikes."
      },
      {
        "id": "subclass-2024-hunter",
        "slug": "hunter",
        "name": "Cazador",
        "nameEn": "Hunter",
        "description": "Analizan inmunidades y vulnerabilidades con su Marca del Cazador y eligen técnicas como Matacolosos o Rompehordas.",
        "descriptionEn": "Reveal prey resistances via Hunter Mark and master Colossus Slayer or Horde Breaker."
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
    "id": "class-2024-sorcerer",
    "slug": "sorcerer",
    "name": "Hechicero",
    "nameEn": "Sorcerer",
    "edition": "5.5e",
    "hitDie": 6,
    "primaryAbility": "Carisma",
    "primaryAbilityEn": "Charisma",
    "savingThrows": "Constitución y Carisma",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Portadores de magia innata. Activan Hechicería Innata desde nivel 1 (+1 CD y Ventaja en ataques mágicos), desbloquean Metamagia en nivel 2 y acceden a 22 conjuros preparados a nivel 20.",
    "descriptionEn": "Wield innate magic with Level 1 Innate Sorcery (+1 save DC & Advantage on spell attacks) and Level 2 Metamagic.",
    "subclasses": [
      {
        "id": "subclass-2024-aberrant-sorcery",
        "slug": "aberrant-sorcery",
        "name": "Hechicería Aberrante",
        "nameEn": "Aberrant Sorcery",
        "description": "Magia psiónica y telepatía surgida del Plano Astral o el Reino Lejano, con lista de conjuros psíquicos siempre preparada.",
        "descriptionEn": "Psionic magic, telepathy, and Far Realm bonus spells."
      },
      {
        "id": "subclass-2024-clockwork-sorcery",
        "slug": "clockwork-sorcery",
        "name": "Hechicería Mecánica",
        "nameEn": "Clockwork Sorcery",
        "description": "Equilibran el caos y orden de Mechanus anulando Ventajas/Desventajas y proyectando bastiones de protección.",
        "descriptionEn": "Channel Mechanus cosmic order to restore balance and negate Advantage/Disadvantage."
      },
      {
        "id": "subclass-2024-draconic-sorcery",
        "slug": "draconic-sorcery",
        "name": "Hechicería Dracónica",
        "nameEn": "Draconic Sorcery",
        "description": "Resiliencia Dracónica (+1 PG/nivel y CA 10 + DES + CAR sin armadura), afinidad elemental y alas de dragón.",
        "descriptionEn": "Draconic scales (AC 10+DEX+CHA), extra HP, elemental affinity, and dragon wings."
      },
      {
        "id": "subclass-2024-wild-magic-sorcery",
        "slug": "wild-magic-sorcery",
        "name": "Hechicería de Magia Salvaje",
        "nameEn": "Wild Magic Sorcery",
        "description": "Manipulan Mareas del Caos y Oleadas de Magia Salvaje para doblar probabilidades a su favor.",
        "descriptionEn": "Bend fate with Tides of Chaos and unpredictable Wild Magic Surges."
      }
    ]
  },
  {
    "id": "class-2024-warlock",
    "slug": "warlock",
    "name": "Brujo",
    "nameEn": "Warlock",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Carisma",
    "primaryAbilityEn": "Charisma",
    "savingThrows": "Sabiduría y Carisma",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Ocultistas de pacto que desbloquean su primera Invocación Sobrenatural en nivel 1 (incluidos Pacto de la Hoja, Cadena o Tomo) hasta alcanzar 10 invocaciones, recuperan espacios en Descanso Corto y ejecutan Astucia Mágica en nivel 2.",
    "descriptionEn": "Pact-bound occultists unlocking Eldritch Invocations at Level 1 (up to 10 total, including Pact Blade/Chain/Tome) and Magical Cunning at Level 2.",
    "subclasses": [
      {
        "id": "subclass-2024-archfey-patron",
        "slug": "archfey-patron",
        "name": "Patrón Archifey",
        "nameEn": "Archfey Patron",
        "description": "Dominio feérico de Pasos de los Fey: Paso Brumoso gratuito con efectos refrescantes, ilusorios o provocadores.",
        "descriptionEn": "Feywild patron granting enhanced free Misty Step uses and beguiling teleportation."
      },
      {
        "id": "subclass-2024-celestial-patron",
        "slug": "celestial-patron",
        "name": "Patrón Celestial",
        "nameEn": "Celestial Patron",
        "description": "Luz Sanadora como Acción Adicional a distancia y bendiciones radiantes y de fuego de los Planos Superiores.",
        "descriptionEn": "Upper Planes patron offering Healing Light bonus actions and radiant protection."
      },
      {
        "id": "subclass-2024-fiend-patron",
        "slug": "fiend-patron",
        "name": "Patrón Fiéndico",
        "nameEn": "Fiend Patron",
        "description": "Bendición del Oscuro para absorber PG temporales al caer enemigos cerca, Suerte Propia y resistencia infernal.",
        "descriptionEn": "Lower Planes patron granting Dark One Blessing temporary HP and Fiendish Resilience."
      },
      {
        "id": "subclass-2024-great-old-one-patron",
        "slug": "great-old-one-patron",
        "name": "Patrón Gran Primigenio",
        "nameEn": "Great Old One Patron",
        "description": "Telepatía de Mente Despierta y conjuros psíquicos silenciosos sin componentes verbales ni somáticos.",
        "descriptionEn": "Far Realm patron granting Awakened Mind telepathy and subtle Psychic Spells."
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
    "id": "class-2024-artificer",
    "slug": "artificer",
    "name": "Artífice (Eberron / 2024)",
    "nameEn": "Artificer (2024)",
    "edition": "5.5e",
    "hitDie": 8,
    "primaryAbility": "Inteligencia",
    "primaryAbilityEn": "Intelligence",
    "savingThrows": "Constitución e Inteligencia",
    "subclassLevel": 3,
    "weaponMasteryCount": 0,
    "description": "Inventores arcanos que infunden objetos mágicos con Planos de Artífice, lanzan conjuros desde nivel 1 y potencian sus herramientas.",
    "descriptionEn": "Arcane inventors using Tinker Magic, Level 1 Spellcasting, and Replicate Magic Item plans.",
    "subclasses": [
      {
        "id": "subclass-2024-alchemist",
        "slug": "alchemist",
        "name": "Alquimista",
        "nameEn": "Alchemist",
        "description": "Prepara elixires experimentales con efectos curativos, de vuelo, velocidad o refuerzo defensivo.",
        "descriptionEn": "Brew experimental elixirs and potent chemical reagents."
      },
      {
        "id": "subclass-2024-armorer",
        "slug": "armorer",
        "name": "Armero",
        "nameEn": "Armorer",
        "description": "Transforma su armadura en un traje arcano Guardián, Infiltrador o Acorazado.",
        "descriptionEn": "Modify armor into a magical Arcane Armor second skin."
      },
      {
        "id": "subclass-2024-artillerist",
        "slug": "artillerist",
        "name": "Artillero",
        "nameEn": "Artillerist",
        "description": "Despliega cañones arcanos portátiles lanzallamas, balistas o protectores.",
        "descriptionEn": "Summon handheld or mobile Eldritch Cannons."
      },
      {
        "id": "subclass-2024-battle-smith",
        "slug": "battle-smith",
        "name": "Herrero de Batalla",
        "nameEn": "Battle Smith",
        "description": "Lucha codo a codo con un Defensor de Acero e imbuye armas con Inteligencia.",
        "descriptionEn": "Command a Steel Defender construct and wield weapons using Intelligence."
      }
    ]
  }
];
