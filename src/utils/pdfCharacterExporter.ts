import * as pdfjsLib from 'pdfjs-dist';
import { Character, AbilityScores, CharacterAttack, Spell } from '../types';

// Configure local worker in browser
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

/**
 * Maps class names to standard hit dice
 */
export function getHitDieForClass(className: string): string {
  const norm = className.toLowerCase();
  if (norm.includes('bárbaro') || norm.includes('barbaro') || norm.includes('barbarian')) return 'd12';
  if (
    norm.includes('guerrero') ||
    norm.includes('fighter') ||
    norm.includes('paladín') ||
    norm.includes('paladin') ||
    norm.includes('explorador') ||
    norm.includes('ranger')
  ) {
    return 'd10';
  }
  if (
    norm.includes('mago') ||
    norm.includes('wizard') ||
    norm.includes('hechicero') ||
    norm.includes('sorcerer')
  ) {
    return 'd6';
  }
  // Bardo, Clérigo, Druida, Monje, Pícaro, Brujo, etc.
  return 'd8';
}

/**
 * Calculate proficiency bonus from level
 */
export function getProficiencyBonus(level: number): number {
  return Math.floor(((level || 1) - 1) / 4) + 2;
}

/**
 * Calculate ability score modifier
 */
export function getAbilityModifier(score: number): number {
  return Math.floor(((score || 10) - 10) / 2);
}

/**
 * Format modifier with leading + or -
 */
export function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// 18 Standard 5e Skills mapping to AcroForm checkbox and modifier fields
const SKILLS_CONFIG: {
  fieldCheck: string;
  fieldMod: string;
  stat: keyof AbilityScores;
  aliases: string[];
}[] = [
  { fieldCheck: 'acroPROF', fieldMod: 'Acrobatics', stat: 'dex', aliases: ['acrobacias', 'acrobatics'] },
  { fieldCheck: 'anhanPROF', fieldMod: 'AnHan', stat: 'wis', aliases: ['trato con animales', 'animal handling', 'manejo de animales'] },
  { fieldCheck: 'arcanaPROF', fieldMod: 'Arcana', stat: 'int', aliases: ['conocimiento arcano', 'arcana', 'arcano'] },
  { fieldCheck: 'athPROF', fieldMod: 'Athletics', stat: 'str', aliases: ['atletismo', 'athletics'] },
  { fieldCheck: 'decepPROF', fieldMod: 'Deception', stat: 'cha', aliases: ['engaño', 'engano', 'deception'] },
  { fieldCheck: 'histPROF', fieldMod: 'History', stat: 'int', aliases: ['historia', 'history'] },
  { fieldCheck: 'insightPROF', fieldMod: 'Insight', stat: 'wis', aliases: ['perspicacia', 'insight', 'intuicion', 'intuición'] },
  { fieldCheck: 'intimPROF', fieldMod: 'Intimidation', stat: 'cha', aliases: ['intimidación', 'intimidacion', 'intimidation'] },
  { fieldCheck: 'investPROF', fieldMod: 'Investigation', stat: 'int', aliases: ['investigación', 'investigacion', 'investigation'] },
  { fieldCheck: 'medPROF', fieldMod: 'Medicine', stat: 'wis', aliases: ['medicina', 'medicine'] },
  { fieldCheck: 'naturePROF', fieldMod: 'Nature', stat: 'int', aliases: ['naturaleza', 'nature'] },
  { fieldCheck: 'perPROF', fieldMod: 'Perception', stat: 'wis', aliases: ['percepción', 'percepcion', 'perception'] },
  { fieldCheck: 'perfPROF', fieldMod: 'Performance', stat: 'cha', aliases: ['interpretación', 'interpretacion', 'performance', 'actuacion', 'actuación'] },
  { fieldCheck: 'persPROF', fieldMod: 'Persuasion', stat: 'cha', aliases: ['persuasión', 'persuasion'] },
  { fieldCheck: 'religPROF', fieldMod: 'Religion', stat: 'int', aliases: ['religión', 'religion'] },
  { fieldCheck: 'sohPROF', fieldMod: 'SleightofHand', stat: 'dex', aliases: ['juego de manos', 'sleight of hand'] },
  { fieldCheck: 'stealthPROF', fieldMod: 'Stealth', stat: 'dex', aliases: ['sigilo', 'stealth'] },
  { fieldCheck: 'survPROF', fieldMod: 'Survival', stat: 'wis', aliases: ['supervivencia', 'survival'] },
];

// Page 3 Spell Slot and Spell Text field order
const SPELL_PAGE_CONFIG: {
  level: number;
  slotTotalField?: string;
  slotRemainingField?: string;
  spellFields: string[];
}[] = [
  {
    level: 0,
    spellFields: [
      'Spells 1014', 'Spells 1016', 'Spells 1017', 'Spells 1018',
      'Spells 1019', 'Spells 1020', 'Spells 1021', 'Spells 1022',
    ],
  },
  {
    level: 1,
    slotTotalField: 'SlotsTotal 19',
    slotRemainingField: 'SlotsRemaining 19',
    spellFields: [
      'Spells 1015', 'Spells 1023', 'Spells 1024', 'Spells 1025',
      'Spells 1026', 'Spells 1027', 'Spells 1028', 'Spells 1029',
      'Spells 1030', 'Spells 1031', 'Spells 1032', 'Spells 1033',
    ],
  },
  {
    level: 2,
    slotTotalField: 'SlotsTotal 20',
    slotRemainingField: 'SlotsRemaining 20',
    spellFields: [
      'Spells 1046', 'Spells 1034', 'Spells 1035', 'Spells 1036',
      'Spells 1037', 'Spells 1038', 'Spells 1039', 'Spells 1040',
      'Spells 1041', 'Spells 1042', 'Spells 1043', 'Spells 1044',
      'Spells 1045',
    ],
  },
  {
    level: 3,
    slotTotalField: 'SlotsTotal 21',
    slotRemainingField: 'SlotsRemaining 21',
    spellFields: [
      'Spells 1048', 'Spells 1047', 'Spells 1049', 'Spells 1050',
      'Spells 1051', 'Spells 1052', 'Spells 1053', 'Spells 1054',
      'Spells 1055', 'Spells 1056', 'Spells 1057', 'Spells 1058',
      'Spells 1059',
    ],
  },
  {
    level: 4,
    slotTotalField: 'SlotsTotal 22',
    slotRemainingField: 'SlotsRemaining 22',
    spellFields: [
      'Spells 1061', 'Spells 1060', 'Spells 1062', 'Spells 1063',
      'Spells 1064', 'Spells 1065', 'Spells 1066', 'Spells 1067',
      'Spells 1068', 'Spells 1069', 'Spells 1070', 'Spells 1071',
      'Spells 1072',
    ],
  },
  {
    level: 5,
    slotTotalField: 'SlotsTotal 23',
    slotRemainingField: 'SlotsRemaining 23',
    spellFields: [
      'Spells 1074', 'Spells 1073', 'Spells 1075', 'Spells 1076',
      'Spells 1077', 'Spells 1078', 'Spells 1079', 'Spells 1080',
      'Spells 1081',
    ],
  },
  {
    level: 6,
    slotTotalField: 'SlotsTotal 24',
    slotRemainingField: 'SlotsRemaining 24',
    spellFields: [
      'Spells 1083', 'Spells 1082', 'Spells 1084', 'Spells 1085',
      'Spells 1086', 'Spells 1087', 'Spells 1088', 'Spells 1089',
      'Spells 1090',
    ],
  },
  {
    level: 7,
    slotTotalField: 'SlotsTotal 25',
    slotRemainingField: 'SlotsRemaining 25',
    spellFields: [
      'Spells 1092', 'Spells 1091', 'Spells 1093', 'Spells 1094',
      'Spells 1095', 'Spells 1096', 'Spells 1097', 'Spells 1098',
      'Spells 1099',
    ],
  },
  {
    level: 8,
    slotTotalField: 'SlotsTotal 26',
    slotRemainingField: 'SlotsRemaining 26',
    spellFields: [
      'Spells 10101', 'Spells 10100', 'Spells 10102', 'Spells 10103',
      'Spells 10104', 'Spells 10105', 'Spells 10106',
    ],
  },
  {
    level: 9,
    slotTotalField: 'SlotsTotal 27',
    slotRemainingField: 'SlotsRemaining 27',
    spellFields: [
      'Spells 10108', 'Spells 10107', 'Spells 10109', 'Spells 101010',
      'Spells 101011', 'Spells 101012', 'Spells 101013',
    ],
  },
];

// Checkbox pairs for prepared spells
const SPELL_CHECKBOX_PAIRS: Record<string, string> = {
  'Spells 1015': 'Check Box 251',
  'Spells 1023': 'Check Box 309',
  'Spells 1024': 'Check Box 3010',
  'Spells 1025': 'Check Box 3011',
  'Spells 1026': 'Check Box 3012',
  'Spells 1027': 'Check Box 3013',
  'Spells 1028': 'Check Box 3014',
  'Spells 1029': 'Check Box 3015',
  'Spells 1030': 'Check Box 3016',
  'Spells 1031': 'Check Box 3017',
  'Spells 1032': 'Check Box 3018',
  'Spells 1033': 'Check Box 3019',
  'Spells 1034': 'Check Box 310',
  'Spells 1035': 'Check Box 3020',
  'Spells 1036': 'Check Box 3021',
  'Spells 1037': 'Check Box 3022',
  'Spells 1038': 'Check Box 3023',
  'Spells 1039': 'Check Box 3024',
  'Spells 1040': 'Check Box 3025',
  'Spells 1041': 'Check Box 3026',
  'Spells 1042': 'Check Box 3027',
  'Spells 1043': 'Check Box 3028',
  'Spells 1044': 'Check Box 3029',
  'Spells 1045': 'Check Box 3030',
  'Spells 1046': 'Check Box 313',
  'Spells 1047': 'Check Box 314',
  'Spells 1048': 'Check Box 315',
  'Spells 1049': 'Check Box 3031',
  'Spells 1050': 'Check Box 3032',
  'Spells 1051': 'Check Box 3033',
  'Spells 1052': 'Check Box 3034',
  'Spells 1053': 'Check Box 3035',
  'Spells 1054': 'Check Box 3036',
  'Spells 1055': 'Check Box 3037',
  'Spells 1056': 'Check Box 3038',
  'Spells 1057': 'Check Box 3039',
  'Spells 1058': 'Check Box 3040',
  'Spells 1059': 'Check Box 3041',
  'Spells 1060': 'Check Box 317',
  'Spells 1061': 'Check Box 316',
  'Spells 1062': 'Check Box 3042',
  'Spells 1063': 'Check Box 3043',
  'Spells 1064': 'Check Box 3044',
  'Spells 1065': 'Check Box 3045',
  'Spells 1066': 'Check Box 3046',
  'Spells 1067': 'Check Box 3047',
  'Spells 1068': 'Check Box 3048',
  'Spells 1069': 'Check Box 3049',
  'Spells 1070': 'Check Box 3050',
  'Spells 1071': 'Check Box 3051',
  'Spells 1072': 'Check Box 3052',
  'Spells 1073': 'Check Box 319',
  'Spells 1074': 'Check Box 318',
  'Spells 1075': 'Check Box 3053',
  'Spells 1076': 'Check Box 3054',
  'Spells 1077': 'Check Box 3055',
  'Spells 1078': 'Check Box 3056',
  'Spells 1079': 'Check Box 3057',
  'Spells 1080': 'Check Box 3058',
  'Spells 1081': 'Check Box 3059',
  'Spells 1082': 'Check Box 321',
  'Spells 1083': 'Check Box 320',
  'Spells 1084': 'Check Box 3060',
  'Spells 1085': 'Check Box 3061',
  'Spells 1086': 'Check Box 3062',
  'Spells 1087': 'Check Box 3063',
  'Spells 1088': 'Check Box 3064',
  'Spells 1089': 'Check Box 3065',
  'Spells 1090': 'Check Box 3066',
  'Spells 1091': 'Check Box 323',
  'Spells 1092': 'Check Box 322',
  'Spells 1093': 'Check Box 3067',
  'Spells 1094': 'Check Box 3068',
  'Spells 1095': 'Check Box 3069',
  'Spells 1096': 'Check Box 3070',
  'Spells 1097': 'Check Box 3071',
  'Spells 1098': 'Check Box 3072',
  'Spells 1099': 'Check Box 3073',
  'Spells 10100': 'Check Box 325',
  'Spells 10101': 'Check Box 324',
  'Spells 10102': 'Check Box 3074',
  'Spells 10103': 'Check Box 3075',
  'Spells 10104': 'Check Box 3076',
  'Spells 10105': 'Check Box 3077',
  'Spells 10106': 'Check Box 3078',
  'Spells 10107': 'Check Box 327',
  'Spells 10108': 'Check Box 326',
  'Spells 10109': 'Check Box 3079',
  'Spells 101010': 'Check Box 3080',
  'Spells 101011': 'Check Box 3081',
  'Spells 101012': 'Check Box 3082',
  'Spells 101013': 'Check Box 3083',
};

/**
 * Main export function: fills the official 5e character sheet PDF and initiates browser download
 */
export async function exportCharacterToOfficialPdf(
  character: Character,
  templateUrl = '/templates/Hoja_de_Personaje_Editable.pdf'
): Promise<void> {
  // 1. Fetch template binary data
  const response = await fetch(templateUrl);
  if (!response.ok) {
    throw new Error(`No se pudo cargar la plantilla PDF oficial en ${templateUrl} (HTTP ${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();

  // 2. Open PDF with pdfjsLib
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    standardFontDataUrl: '/standard_fonts/',
    cMapUrl: '/cmaps/',
    cMapPacked: true,
  });
  const doc = await loadingTask.promise;

  // 3. Index all interactive AcroForm fields across all pages
  const fieldMap = new Map<string, { id: string; page: number; checkBox: boolean }>();
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const annots = await page.getAnnotations();
    for (const a of annots) {
      if (a.fieldName) {
        fieldMap.set(a.fieldName, { id: a.id, page: p, checkBox: !!a.checkBox });
      }
    }
  }

  // Safe setter helper (handles exact name or trimmed/case-insensitive match)
  const setField = (fieldName: string, value: string | boolean | number) => {
    let info = fieldMap.get(fieldName);
    if (!info) {
      const trimmedTarget = fieldName.trim().toLowerCase();
      for (const [key, val] of fieldMap.entries()) {
        if (key.trim().toLowerCase() === trimmedTarget) {
          info = val;
          break;
        }
      }
    }
    if (!info) return;

    if (info.checkBox) {
      doc.annotationStorage.setValue(info.id, { value: Boolean(value) });
    } else {
      doc.annotationStorage.setValue(info.id, { value: String(value ?? '') });
    }
  };

  // Base stats & calculations
  const level = character.level || 1;
  const profBonus = getProficiencyBonus(level);
  const stats = character.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const strMod = getAbilityModifier(stats.str);
  const dexMod = getAbilityModifier(stats.dex);
  const conMod = getAbilityModifier(stats.con);
  const intMod = getAbilityModifier(stats.int);
  const wisMod = getAbilityModifier(stats.wis);
  const chaMod = getAbilityModifier(stats.cha);

  const mods: Record<keyof AbilityScores, number> = {
    str: strMod,
    dex: dexMod,
    con: conMod,
    int: intMod,
    wis: wisMod,
    cha: chaMod,
  };

  // ==========================================
  // PAGE 1: IDENTITY & CORE COMBAT
  // ==========================================
  setField('CharacterName', character.name || 'Héroe');
  setField('CharacterName 2', character.name || 'Héroe'); // Page 2 header

  const classLevelStr = `${character.class || 'Aventurero'}${character.subclass ? ` (${character.subclass})` : ''} ${level}`;
  setField('ClassLevel', classLevelStr);
  setField('Background', character.background || '');
  setField('PlayerName', character.playerName || '');

  const raceStr = `${character.race || 'Humano'}${character.subrace ? ` (${character.subrace})` : ''}`;
  setField('Race ', raceStr); // Note trailing space in PDF template
  setField('Alignment', character.alignment || 'Neutral');
  setField('XP', '');
  setField('ProfBonus', `+${profBonus}`);

  // Combat Vitals
  setField('AC', character.ac || 10);
  const initBonus = character.initiativeBonus !== undefined ? character.initiativeBonus : dexMod;
  setField('Initiative', formatMod(initBonus));
  setField('Speed', character.speed || '30 pies');
  setField('HPMax', character.maxHp || 10);
  setField('HPCurrent', character.currentHp !== undefined ? character.currentHp : character.maxHp || 10);
  if (character.tempHp && character.tempHp > 0) {
    setField('HPTemp', character.tempHp);
  }

  const hitDie = getHitDieForClass(character.class || '');
  setField('HDTotal', `${level}${hitDie}`);
  setField('HD', `${level}`);

  // Ability Scores
  setField('STRscore', stats.str);
  setField('STRbonus', formatMod(strMod));
  setField('DEXscore', stats.dex);
  setField('DEXbonus', formatMod(dexMod));
  setField('CONscore', stats.con);
  setField('CONbonus', formatMod(conMod));
  setField('INTscore', stats.int);
  setField('INTbonus', formatMod(intMod));
  setField('WISscore', stats.wis);
  setField('WISbonus', formatMod(wisMod));
  setField('CHAscore', stats.cha);
  setField('CHAbonus', formatMod(chaMod));

  // Saving Throws
  const savesArr = character.savingThrows || [];
  const isSaveProf = (key: keyof AbilityScores, nameEs: string, nameEn: string): boolean => {
    return savesArr.some((s) => {
      const l = s.toLowerCase();
      return l.includes(key) || l.includes(nameEs.toLowerCase()) || l.includes(nameEn.toLowerCase());
    });
  };

  const saveConfig: { key: keyof AbilityScores; profField: string; valField: string; es: string; en: string }[] = [
    { key: 'str', profField: 'STRsavePROF', valField: 'STRsave', es: 'fuerza', en: 'strength' },
    { key: 'dex', profField: 'DEXsavePROF', valField: 'DEXsave', es: 'destreza', en: 'dexterity' },
    { key: 'con', profField: 'CONsavePROF', valField: 'CONsave', es: 'constitución', en: 'constitution' },
    { key: 'int', profField: 'INTsavePROF', valField: 'INTsave', es: 'inteligencia', en: 'intelligence' },
    { key: 'wis', profField: 'WISsavePROF', valField: 'WISsave', es: 'sabiduría', en: 'wisdom' },
    { key: 'cha', profField: 'CHAsavePROF', valField: 'CHAsave', es: 'carisma', en: 'charisma' },
  ];

  for (const s of saveConfig) {
    const isProf = isSaveProf(s.key, s.es, s.en);
    const saveBonus = mods[s.key] + (isProf ? profBonus : 0);
    setField(s.profField, isProf);
    setField(s.valField, formatMod(saveBonus));
  }

  // Skills
  const charSkills = (character.skills || []).map((sk) => sk.toLowerCase().trim());
  let perceptionBonus = wisMod;

  for (const sk of SKILLS_CONFIG) {
    const isProf = sk.aliases.some((alias) => charSkills.includes(alias.toLowerCase()));
    // Check if expertise is noted in skills or notes
    const hasExpertise = (character.notes || '').toLowerCase().includes(`pericia (doble competencia x2) en:\n${sk.aliases[0]}`);
    const skillBonus = mods[sk.stat] + (hasExpertise ? 2 * profBonus : isProf ? profBonus : 0);

    setField(sk.fieldCheck, isProf);
    setField(sk.fieldMod, formatMod(skillBonus));

    if (sk.fieldMod === 'Perception') {
      perceptionBonus = skillBonus;
    }
  }

  // Passive Perception
  const passive = character.passivePerception || 10 + perceptionBonus;
  setField('PWP', passive);

  // Weapons & Attacks
  const attacks: CharacterAttack[] = character.attacks || [];
  if (attacks[0]) {
    setField('Wpn Name', attacks[0].name);
    setField('Wpn1 AtkBonus', attacks[0].bonus);
    setField('Wpn1 Damage', `${attacks[0].damage} ${attacks[0].type || ''}`.trim());
  }
  if (attacks[1]) {
    setField('Wpn Name 2', attacks[1].name);
    setField('Wpn2 AtkBonus ', attacks[1].bonus); // Trailing space
    setField('Wpn2 Damage ', `${attacks[1].damage} ${attacks[1].type || ''}`.trim());
  }
  if (attacks[2]) {
    setField('Wpn Name 3', attacks[2].name);
    setField('Wpn3 AtkBonus   ', attacks[2].bonus); // 3 trailing spaces
    setField('Wpn3 Damage ', `${attacks[2].damage} ${attacks[2].type || ''}`.trim());
  }

  // Extra attacks and spellcasting notes
  const attackNotes: string[] = [];
  if (attacks.length > 3) {
    attacks.slice(3).forEach((att) => {
      attackNotes.push(`• ${att.name}: ${att.bonus} impacto | ${att.damage} (${att.type})`);
    });
  }
  if (character.spellSaveDc || character.spellAttackBonus !== undefined) {
    attackNotes.unshift(
      `Magia: CD Salvación ${character.spellSaveDc || 8 + profBonus + intMod} | Ataque de Hechizo ${
        character.spellAttackBonus !== undefined ? formatMod(character.spellAttackBonus) : formatMod(profBonus + intMod)
      }`
    );
  }
  if (attackNotes.length > 0) {
    setField('AttacksSpellcasting', attackNotes.join('\n'));
  }

  // Roleplay traits (Page 1)
  setField('PersonalityTraits ', character.personalityTraits || '');
  setField('Ideals', character.ideals || '');
  setField('Bonds', character.bonds || '');
  setField('Flaws', character.flaws || '');

  // Extract equipment, proficiencies and features from notes if present
  let featuresText = '';
  let profLangText = '';
  let equipmentText = '';
  let coinsText = '';

  if (character.gold !== undefined) {
    setField('GP', character.gold);
  } else if (character.notes) {
    const goldMatch = character.notes.match(/Monedas:\s*(\d+)\s*po/i);
    if (goldMatch) {
      setField('GP', goldMatch[1]);
    }
  }

  if (character.silver !== undefined) {
    setField('SP', character.silver);
  } else if (character.notes) {
    const silverMatch = character.notes.match(/(\d+)\s*(?:sp|piezas?\s+de\s+plata|pp\s*\(pieza\s+de\s+plata\))/i);
    if (silverMatch) {
      setField('SP', silverMatch[1]);
    }
  }

  if (character.copper !== undefined) {
    setField('CP', character.copper);
  }

  if (character.platinum !== undefined) {
    setField('PP', character.platinum);
  }

  if (character.notes) {
    const raw = character.notes;

    // Split sections from roleplay notes
    const sections = raw.split('\n\n');
    const extraFeats: string[] = [];

    for (const sec of sections) {
      const lower = sec.toLowerCase();
      if (lower.startsWith('rasgos y atributos:')) {
        featuresText += sec.replace(/^rasgos y atributos:\s*/i, '') + '\n\n';
      } else if (lower.startsWith('dotes oficiales elegidas:')) {
        extraFeats.push(sec);
      } else if (lower.startsWith('rasgo de trasfondo')) {
        featuresText += sec + '\n\n';
      } else if (lower.startsWith('inventario & riqueza inicial:')) {
        equipmentText += sec.replace(/^inventario & riqueza inicial:\s*/i, '') + '\n';
      } else if (lower.includes('competencia') || lower.includes('idioma') || lower.includes('pericia')) {
        profLangText += sec + '\n\n';
      }
    }

    if (extraFeats.length > 0) {
      setField('Feat+Traits', extraFeats.join('\n\n'));
    }
  }

  // Set Page 1 Features and Traits
  if (featuresText.trim()) {
    setField('Features and Traits', featuresText.trim());
  } else {
    // Basic fallback from class/race
    setField('Features and Traits', `• Rasgos raciales de ${raceStr}\n• Rasgos de clase de ${classLevelStr}`);
  }

  // Set Page 1 Proficiencies and Languages
  if (profLangText.trim()) {
    setField('ProficienciesLang', profLangText.trim());
  } else {
    setField('ProficienciesLang', `Competencias de salvación: ${savesArr.join(', ') || 'Estándar'}\nHabilidades: ${(character.skills || []).join(', ')}`);
  }

  // Set Equipment
  if (equipmentText.trim()) {
    setField('Equipment', equipmentText.trim());
  }

  // ==========================================
  // PAGE 2: BACKSTORY & DETAILS
  // ==========================================
  if (character.backstory) {
    setField('Backstory', character.backstory);
  }

  // ==========================================
  // PAGE 3: SPELLCASTING & GRIMOIRE
  // ==========================================
  if (character.spells && character.spells.length > 0) {
    setField('Spellcasting Class 2', character.class || 'Conjurador');

    const abilityName = character.spellcastingAbility
      ? character.spellcastingAbility.toUpperCase()
      : 'INT';
    setField('SpellcastingAbility 2', abilityName);

    const spellAbility = (character.spellcastingAbility || 'int') as keyof AbilityScores;
    const spellMod = mods[spellAbility] || 0;
    const dc = character.spellSaveDc || 8 + profBonus + spellMod;
    const atk = character.spellAttackBonus !== undefined ? character.spellAttackBonus : profBonus + spellMod;

    setField('SpellSaveDC  2', dc);
    setField('SpellAtkBonus 2', formatMod(atk));

    // Fill Spell Slots (Levels 1 to 9)
    if (character.spellSlots) {
      for (let lvl = 1; lvl <= 9; lvl++) {
        const slotKey = `lvl${lvl}` as keyof typeof character.spellSlots;
        const slot = character.spellSlots[slotKey];
        const pageLvlConfig = SPELL_PAGE_CONFIG.find((c) => c.level === lvl);
        if (slot && pageLvlConfig && pageLvlConfig.slotTotalField && pageLvlConfig.slotRemainingField) {
          setField(pageLvlConfig.slotTotalField, slot.max > 0 ? slot.max : '');
          const remaining = Math.max(0, slot.max - slot.used);
          setField(pageLvlConfig.slotRemainingField, slot.max > 0 ? remaining : '');
        }
      }
    }

    // Group Spells by Level
    const spellsByLevel: Record<number, Spell[]> = {};
    for (const sp of character.spells) {
      const lvl = sp.level || 0;
      if (!spellsByLevel[lvl]) spellsByLevel[lvl] = [];
      spellsByLevel[lvl].push(sp);
    }

    // Populate each level's fields
    for (const pageLvlConfig of SPELL_PAGE_CONFIG) {
      const spells = spellsByLevel[pageLvlConfig.level] || [];
      const fields = pageLvlConfig.spellFields;

      spells.forEach((sp, idx) => {
        if (idx < fields.length) {
          const fieldName = fields[idx];
          // Write spell name with tag if ritual or concentration
          let display = sp.name;
          const tags: string[] = [];
          if (sp.ritual) tags.push('R');
          if (sp.concentration) tags.push('C');
          if (tags.length > 0) display += ` [${tags.join(',')}]`;

          setField(fieldName, display);

          // Mark prepared checkbox if applicable
          if (sp.prepared) {
            const cbField = SPELL_CHECKBOX_PAIRS[fieldName];
            if (cbField) {
              setField(cbField, true);
            }
          }
        }
      });
    }
  }

  // 4. Save and generate PDF binary output
  const pdfBytes = await doc.saveDocument();

  // 5. Trigger browser download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  const sanitizedName = (character.name || 'Personaje')
    .replace(/[^a-zA-Z0-9_\-áéíóúÁÉÍÓÚñÑ ]/g, '')
    .trim()
    .replace(/\s+/g, '_');
  const filename = `${sanitizedName}_Hoja_Oficial_5e.pdf`;

  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(blobUrl);
}
