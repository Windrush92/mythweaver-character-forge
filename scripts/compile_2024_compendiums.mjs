import fs from 'fs';
import path from 'path';

const rawDir = path.resolve('src/data/dnd2024/raw');
const outDir = path.resolve('src/data/dnd2024');

// Load raw data
const speciesRaw = JSON.parse(fs.readFileSync(path.join(rawDir, 'species_raw.json'), 'utf8'));
const backgroundsRaw = JSON.parse(fs.readFileSync(path.join(rawDir, 'backgrounds_raw.json'), 'utf8'));
const featsRaw = JSON.parse(fs.readFileSync(path.join(rawDir, 'feats_raw.json'), 'utf8'));
const classesRaw = JSON.parse(fs.readFileSync(path.join(rawDir, 'classes_raw.json'), 'utf8'));
const equipmentRaw = JSON.parse(fs.readFileSync(path.join(rawDir, 'equipment_raw.json'), 'utf8'));

// -------------------------------------------------------------
// 1. COMPILE SPECIES 2024
// -------------------------------------------------------------
console.log('Compiling 2024 Species...');
const compiledSpecies = speciesRaw.map(sp => {
  const html = sp.rawHtml;
  const clean = sp.cleanText;

  // Extract Size
  let size = 'Mediano';
  if (/Size:\s*Small/i.test(clean) || sp.slug === 'halfling' || sp.slug === 'gnome') {
    size = 'Pequeño';
  } else if (/Medium\s*or\s*Small/i.test(clean)) {
    size = 'Mediano o Pequeño';
  }

  // Extract Speed
  const speedMatch = clean.match(/Speed:\s*(\d+)\s*feet/i);
  const speed = speedMatch ? `${speedMatch[1]} pies (9m)` : '30 pies (9m)';

  // Extract Darkvision
  const darkMatch = clean.match(/Darkvision\s+with\s+a\s+range\s+of\s+(\d+)\s+feet/i)
    || clean.match(/range\s+of\s+(\d+)\s+feet/i);
  const darkvision = /Darkvision/i.test(clean) && darkMatch ? parseInt(darkMatch[1], 10) : (/Darkvision/i.test(clean) ? 60 : 0);

  // Extract traits from <p><strong>Trait.</strong> ...</p>
  const traitMatches = [...html.matchAll(/<p><strong>([^:<]+?)\.?<\/strong>\s*([\s\S]*?)<\/p>/gi)];
  const traits = [];
  for (const m of traitMatches) {
    const title = m[1].replace(/<[^>]+>/g, '').trim().replace(/\.$/, '');
    const desc = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (['Creature Type', 'Size', 'Speed', 'Source'].includes(title)) continue;
    if (desc.length > 5) {
      traits.push({ name: title, desc });
    }
  }

  // Sublineages (if any, like Elf High/Wood/Drow, Tiefling, Goliath)
  return {
    id: `species-2024-${sp.slug}`,
    slug: sp.slug,
    name: sp.name,
    nameEn: sp.name,
    edition: '5.5e',
    description: clean.slice(0, 350) + '...',
    size,
    speed,
    darkvision,
    traits,
    source: "Player's Handbook 2024"
  };
});

const speciesTs = `// Compendio Oficial de Especies D&D 5.5e (2024 Revised Rules)
// Fuentes: Player's Handbook 2024 & dnd2024.wikidot.com

export interface SpeciesTrait2024 {
  name: string;
  desc: string;
}

export interface Species2024 {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  edition: '5.5e';
  description: string;
  size: string;
  speed: string;
  darkvision: number;
  traits: SpeciesTrait2024[];
  source: string;
}

export const DND_2024_SPECIES: Species2024[] = ${JSON.stringify(compiledSpecies, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'speciesData2024.ts'), speciesTs, 'utf8');

// -------------------------------------------------------------
// 2. COMPILE BACKGROUNDS 2024
// -------------------------------------------------------------
console.log('Compiling 2024 Backgrounds...');
const ABILITY_MAP = {
  'strength': 'str',
  'dexterity': 'dex',
  'constitution': 'con',
  'intelligence': 'int',
  'wisdom': 'wis',
  'charisma': 'cha'
};

const compiledBackgrounds = backgroundsRaw.map(bg => {
  const clean = bg.cleanText;

  // Ability Scores
  const abilityMatch = clean.match(/Ability Scores:\s*([^\.]+)/i);
  const abilities = [];
  if (abilityMatch) {
    const rawScores = abilityMatch[1].toLowerCase();
    for (const [fullName, shortKey] of Object.entries(ABILITY_MAP)) {
      if (rawScores.includes(fullName)) {
        abilities.push(shortKey);
      }
    }
  }

  // Origin Feat
  const featMatch = clean.match(/Feat:\s*([A-Za-z\s'\-]+?)(?=Skill Proficiencies|\.|$)/i);
  const feat = featMatch ? featMatch[1].trim() : 'Tough';

  // Skill Proficiencies
  const skillsMatch = clean.match(/Skill Proficiencies:\s*([^\.]+)/i);
  const skillStr = skillsMatch ? skillsMatch[1].trim() : '';

  // Tool Proficiency
  const toolMatch = clean.match(/Tool Proficiency:\s*([^\.]+)/i);
  const tool = toolMatch ? toolMatch[1].trim() : 'Ninguna';

  // Equipment
  const equipMatch = clean.match(/Equipment:\s*([\s\S]+?)(?=$)/i);
  const equipment = equipMatch ? equipMatch[1].trim() : 'Equipo básico y 50 po';

  return {
    id: `bg-2024-${bg.slug}`,
    slug: bg.slug,
    name: bg.name,
    edition: '5.5e',
    description: clean.slice(0, 300) + '...',
    abilityScores: abilities.length > 0 ? abilities : ['str', 'con', 'wis'],
    feat,
    skillProficiencies: skillStr,
    toolProficiency: tool,
    equipment,
    source: "Player's Handbook 2024"
  };
});

const backgroundsTs = `// Compendio Oficial de Trasfondos D&D 5.5e (2024 Revised Rules)
// En 2024, los trasfondos otorgan +2/+1 o +1/+1/+1 entre sus 3 atributos y una Dote de Origen

export interface Background2024 {
  id: string;
  slug: string;
  name: string;
  edition: '5.5e';
  description: string;
  abilityScores: ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha')[];
  feat: string;
  skillProficiencies: string;
  toolProficiency: string;
  equipment: string;
  source: string;
}

export const DND_2024_BACKGROUNDS: Background2024[] = ${JSON.stringify(compiledBackgrounds, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'backgroundsData2024.ts'), backgroundsTs, 'utf8');

// -------------------------------------------------------------
// 3. COMPILE FEATS 2024
// -------------------------------------------------------------
console.log('Compiling 2024 Feats...');
const compiledFeats = featsRaw.map(f => {
  const clean = f.cleanText;
  const html = f.rawHtml;

  // Benefits
  const benefitMatches = [...html.matchAll(/<p><strong>([^:<]+?)\.?<\/strong>\s*([\s\S]*?)<\/p>/gi)];
  const benefits = [];
  for (const m of benefitMatches) {
    const title = m[1].replace(/<[^>]+>/g, '').trim().replace(/\.$/, '');
    const desc = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (['Source', 'Prerequisite'].includes(title)) continue;
    if (desc.length > 5) {
      benefits.push({ name: title, desc });
    }
  }

  // Category
  let category = 'General';
  const isOrigin = ['alert', 'crafter', 'healer', 'lucky', 'magic-initiate', 'musician', 'savage-attacker', 'skilled', 'tavern-brawler', 'tough'].includes(f.slug);
  if (isOrigin) category = 'Origen (Nivel 1)';

  return {
    id: `feat-2024-${f.slug}`,
    slug: f.slug,
    name: f.name,
    category,
    edition: '5.5e',
    description: clean.slice(0, 250) + '...',
    benefits,
    source: "Player's Handbook 2024"
  };
});

const featsTs = `// Compendio Oficial de Dotes D&D 5.5e (2024 Revised Rules)

export interface FeatBenefit2024 {
  name: string;
  desc: string;
}

export interface Feat2024 {
  id: string;
  slug: string;
  name: string;
  category: string;
  edition: '5.5e';
  description: string;
  benefits: FeatBenefit2024[];
  source: string;
}

export const DND_2024_FEATS: Feat2024[] = ${JSON.stringify(compiledFeats, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'featsData2024.ts'), featsTs, 'utf8');

// -------------------------------------------------------------
// 4. COMPILE WEAPONS & WEAPON MASTERIES 2024
// -------------------------------------------------------------
console.log('Compiling 2024 Weapons & Masteries...');
const weaponMasteries = [
  {
    name: 'Cleave (Hender)',
    desc: 'Si golpeas a una criatura con un ataque de arma cuerpo a cuerpo, puedes hacer un ataque adicional contra una criatura adyacente a menos de 5 pies sin sumar tu modificador de característica al daño.'
  },
  {
    name: 'Graze (Rozar)',
    desc: 'Si fallas un tiro de ataque con esta arma contra una criatura, infliges daño igual al modificador de característica usado para el ataque (mínimo 1 de daño).'
  },
  {
    name: 'Nick (Tajar)',
    desc: 'Cuando haces un ataque adicional concedido por la propiedad Ligera (Light), puedes hacer ese ataque como parte de la acción de Atacar en lugar de gastar una Acción Adicional.'
  },
  {
    name: 'Push (Empujar)',
    desc: 'Si golpeas a una criatura con esta arma, puedes empujarla hasta 10 pies en línea recta lejos de ti si es de tamaño Grande o menor.'
  },
  {
    name: 'Sap (Debilitar)',
    desc: 'Si golpeas a una criatura con esta arma, esa criatura tiene Desventaja en su siguiente tirada de ataque antes del inicio de tu próximo turno.'
  },
  {
    name: 'Slow (Ralentizar)',
    desc: 'Si golpeas a una criatura y le infliges daño con esta arma, su velocidad se reduce en 10 pies hasta el inicio de tu próximo turno.'
  },
  {
    name: 'Topple (Derribar)',
    desc: 'Si golpeas a una criatura con esta arma, puedes forzarla a hacer una tirada de salvación de Constitución (CD 8 + Modificador de Ataque + Bono de Competencia) o caer Derribada (Prone).'
  },
  {
    name: 'Vex (Acosar)',
    desc: 'Si golpeas a una criatura y le infliges daño con esta arma, tienes Ventaja en tu siguiente tirada de ataque contra esa misma criatura antes del final de tu próximo turno.'
  }
];

// Parse weapons from raw HTML table
const weaponsHtml = equipmentRaw.weapons.rawHtml;
const rowMatches = [...weaponsHtml.matchAll(/<tr>\s*<td>([A-Za-z\s'\-]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([A-Za-z]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<\/tr>/gi)];

const compiledWeapons = rowMatches.map(m => {
  const name = m[1].trim();
  const damage = m[2].trim();
  const properties = m[3].replace(/&#160;/g, ' ').trim().split(',').map(s => s.trim());
  const mastery = m[4].trim();
  const weight = m[5].replace(/&#160;/g, ' ').trim();
  const cost = m[6].replace(/&#160;/g, ' ').trim();

  return {
    id: `weapon-2024-${name.toLowerCase().replace(/[\s']+/g, '-')}`,
    name,
    edition: '5.5e',
    damage,
    properties,
    mastery,
    weight,
    cost
  };
});

const weaponsTs = `// Compendio Oficial de Armas y Maestrías D&D 5.5e (2024 Revised Rules)

export interface WeaponMasteryDefinition {
  name: string;
  desc: string;
}

export interface Weapon2024 {
  id: string;
  name: string;
  edition: '5.5e';
  damage: string;
  properties: string[];
  mastery: string;
  weight: string;
  cost: string;
}

export const DND_2024_WEAPON_MASTERIES: WeaponMasteryDefinition[] = ${JSON.stringify(weaponMasteries, null, 2)};
export const DND_2024_WEAPONS: Weapon2024[] = ${JSON.stringify(compiledWeapons, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'weaponsData2024.ts'), weaponsTs, 'utf8');

// -------------------------------------------------------------
// 5. COMPILE CLASSES 2024
// -------------------------------------------------------------
console.log('Compiling 2024 Classes & Subclasses...');
const compiledClasses = classesRaw.map(cls => {
  const clean = cls.cleanText;
  
  // Hit Die
  const hitDieMatch = clean.match(/Hit Point Die:\s*D(\d+)/i) || clean.match(/D(\d+)\s*per/i);
  const hitDie = hitDieMatch ? parseInt(hitDieMatch[1], 10) : 8;

  // Primary Ability
  const primaryMatch = clean.match(/Primary Ability:\s*([^\.]+)/i);
  const primaryAbility = primaryMatch ? primaryMatch[1].trim() : 'Fuerza o Destreza';

  // Saving Throws
  const savesMatch = clean.match(/Saving Throw Proficiencies:\s*([^\.]+)/i);
  const savingThrows = savesMatch ? savesMatch[1].trim() : '';

  // Weapon Masteries count
  let weaponMasteryCount = 0;
  if (cls.slug === 'fighter') weaponMasteryCount = 3;
  else if (['barbarian', 'paladin', 'ranger', 'rogue'].includes(cls.slug)) weaponMasteryCount = 2;

  const subclasses = cls.subclasses.map(sub => ({
    id: sub.id,
    slug: sub.slug,
    name: sub.name,
    description: sub.cleanText.slice(0, 250) + '...'
  }));

  return {
    id: cls.id,
    slug: cls.slug,
    name: cls.name,
    edition: '5.5e',
    hitDie,
    primaryAbility,
    savingThrows,
    subclassLevel: 3, // All 2024 classes get subclasses at level 3!
    weaponMasteryCount,
    description: clean.slice(0, 300) + '...',
    subclasses,
    source: "Player's Handbook 2024"
  };
});

const classesTs = `// Compendio Oficial de Clases y Subclases D&D 5.5e (2024 Revised Rules)
// En 2024, todas las clases eligen su subclase en el Nivel 3

export interface Subclass2024 {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface Class2024 {
  id: string;
  slug: string;
  name: string;
  edition: '5.5e';
  hitDie: number;
  primaryAbility: string;
  savingThrows: string;
  subclassLevel: number; // Siempre 3 en 2024
  weaponMasteryCount: number;
  description: string;
  subclasses: Subclass2024[];
  source: string;
}

export const DND_2024_CLASSES: Class2024[] = ${JSON.stringify(compiledClasses, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'classesData2024.ts'), classesTs, 'utf8');

// -------------------------------------------------------------
// 6. BARREL EXPORT (index.ts)
// -------------------------------------------------------------
const indexTs = `// D&D 5.5e (2024 Revised Rules) Unified Data Module
export * from './speciesData2024';
export * from './backgroundsData2024';
export * from './featsData2024';
export * from './weaponsData2024';
export * from './classesData2024';
`;

fs.writeFileSync(path.join(outDir, 'index.ts'), indexTs, 'utf8');

console.log('✅ ALL 2024 COMPENDIUM MODULES COMPILED CLEANLY!');
