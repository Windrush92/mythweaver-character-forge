import * as pdfjsLib from 'pdfjs-dist';
import { Character, CharacterAttack, AbilityScores } from '../types';

// Configure local worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export async function parsePdfCharacterSheet(
  source: File | ArrayBuffer | Uint8Array,
  campaignId: string
): Promise<Character> {
  let arrayBuffer: ArrayBuffer;
  if (source instanceof File) {
    arrayBuffer = await source.arrayBuffer();
  } else if (source instanceof Uint8Array) {
    arrayBuffer = source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength) as ArrayBuffer;
  } else {
    arrayBuffer = source;
  }

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
  });

  const doc = await loadingTask.promise;

  const fields: Record<string, string> = {};
  const allTextLines: string[] = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);

    // 1. Collect interactive annotations / AcroForm fields
    const annotations = await page.getAnnotations();
    for (const annot of annotations) {
      if (annot.fieldName) {
        const val = annot.fieldValue !== undefined && annot.fieldValue !== null ? String(annot.fieldValue).trim() : '';
        fields[annot.fieldName.trim()] = val;
        // Keep original with spaces just in case
        fields[annot.fieldName] = val;
      }
    }

    // 2. Collect visible text
    const textContent = await page.getTextContent();
    for (const item of textContent.items) {
      if ('str' in item && typeof item.str === 'string') {
        const clean = item.str.trim();
        if (clean) allTextLines.push(clean);
      }
    }
  }

  const getF = (...keys: string[]): string => {
    for (const k of keys) {
      if (fields[k] && fields[k].trim().length > 0) return fields[k].trim();
      // Case insensitive match
      const lower = k.toLowerCase();
      for (const fk of Object.keys(fields)) {
        if (fk.toLowerCase() === lower && fields[fk].trim().length > 0) return fields[fk].trim();
      }
    }
    return '';
  };

  const getNum = (def: number, ...keys: string[]): number => {
    const val = getF(...keys);
    if (!val) return def;
    const n = parseInt(val.replace(/[^0-9-]/g, ''), 10);
    return isNaN(n) ? def : n;
  };

  // Name
  let name = getF('CharacterName', 'CharacterName 2', 'NOMBRE DEL PERSONAJE', 'Nombre', 'Name');
  if (!name) {
    name = 'Héroe Desconocido';
  }

  // Class and Level
  const classLevelStr = getF('ClassLevel', 'CLASE Y NIVEL', 'Class', 'Clase');
  let className = 'Guerrero';
  let level = 1;
  if (classLevelStr) {
    const match = classLevelStr.match(/^(.*?)\s*(\d+)$/);
    if (match) {
      className = match[1].trim() || 'Guerrero';
      level = parseInt(match[2], 10) || 1;
    } else {
      className = classLevelStr;
    }
  }

  // Player, Race, Background
  const playerName = getF('PlayerName', 'NOMBRE DEL JUGADOR', 'Player');
  const race = getF('Race ', 'Race', 'RAZA', 'Raza') || 'Humano';
  const background = getF('Background', 'TRASFONDO', 'Trasfondo');

  // Combat Stats
  const ac = getNum(10, 'AC', 'ARMADURA', 'ArmorClass', 'CA');
  const maxHp = getNum(20, 'HPMax', 'Puntos de golpe máximos', 'MaxHP', 'HP');
  const currentHp = getNum(maxHp, 'HPCurrent', 'Puntos de golpe actuales', 'CurrentHP');
  const tempHp = getNum(0, 'HPTemp', 'Puntos de golpe temporales', 'TempHP');
  const initiativeBonus = getNum(0, 'Initiative', 'INICIATIVA', 'Iniciativa');
  const speed = getF('Speed', 'VELOCIDAD', 'Velocidad') || '30 ft.';
  const passivePerception = getNum(10, 'PWP', 'Passive', 'SABIDURÍA (PERCEPCIÓN) PASIVA', 'PercepcionPasiva');

  // Ability Scores
  const stats: AbilityScores = {
    str: getNum(10, 'STRscore', 'STR', 'FUERZA', 'Fuerza', 'Strength'),
    dex: getNum(10, 'DEXscore', 'DEX', 'DESTREZA', 'Destreza', 'Dexterity'),
    con: getNum(10, 'CONscore', 'CON', 'CONSTITUCIÓN', 'Constitución', 'Constitution'),
    int: getNum(10, 'INTscore', 'INT', 'INTELIGENCIA', 'Inteligencia', 'Intelligence'),
    wis: getNum(10, 'WISscore', 'WIS', 'SABIDURÍA', 'Sabiduría', 'Wisdom'),
    cha: getNum(10, 'CHAscore', 'CHA', 'CARISMA', 'Carisma', 'Charisma'),
  };

  // Saving Throws
  const savingThrows: string[] = [];
  const savesMap = [
    { key: 'STRsave', prof: 'STRsavePROF', label: 'Fuerza' },
    { key: 'DEXsave', prof: 'DEXsavePROF', label: 'Destreza' },
    { key: 'CONsave', prof: 'CONsavePROF', label: 'Constitución' },
    { key: 'INTsave', prof: 'INTsavePROF', label: 'Inteligencia' },
    { key: 'WISsave', prof: 'WISsavePROF', label: 'Sabiduría' },
    { key: 'CHAsave', prof: 'CHAsavePROF', label: 'Carisma' },
  ];
  for (const s of savesMap) {
    const val = getF(s.key);
    const hasProf = getF(s.prof) === 'Yes' || getF(s.prof) === 'true' || getF(s.prof) === 'X';
    if (val) {
      savingThrows.push(`${s.label} ${val.startsWith('+') || val.startsWith('-') ? val : '+' + val}`);
    } else if (hasProf) {
      savingThrows.push(`${s.label} (Competente)`);
    }
  }

  // Attacks
  const attacks: CharacterAttack[] = [];
  const w1 = getF('Wpn Name');
  if (w1) {
    attacks.push({
      id: 'att-1',
      name: w1,
      bonus: getF('Wpn1 AtkBonus') || '+0',
      damage: getF('Wpn1 Damage') || '1d6',
      type: 'Ataque Principal',
    });
  }
  const w2 = getF('Wpn Name 2', 'Wpn Name2');
  if (w2) {
    attacks.push({
      id: 'att-2',
      name: w2,
      bonus: getF('Wpn2 AtkBonus ', 'Wpn2 AtkBonus') || '+0',
      damage: getF('Wpn2 Damage ', 'Wpn2 Damage') || '1d6',
      type: 'Arma Secundaria',
    });
  }
  const w3 = getF('Wpn Name 3', 'Wpn Name3');
  if (w3) {
    attacks.push({
      id: 'att-3',
      name: w3,
      bonus: getF('Wpn3 AtkBonus  ', 'Wpn3 AtkBonus') || '+0',
      damage: getF('Wpn3 Damage ', 'Wpn3 Damage') || '1d6',
      type: 'Arma / Conjuro',
    });
  }

  // Fallback if no attacks in fields
  if (attacks.length === 0) {
    attacks.push({
      id: 'att-1',
      name: 'Ataque con Arma',
      bonus: '+4',
      damage: '1d8+2',
      type: 'Cortante',
    });
  }

  // Notes & Roleplay
  const noteParts: string[] = [];
  const traits = getF('Features and Traits', 'RASGOS Y ATRIBUTOS');
  if (traits) noteParts.push(`Rasgos y Atributos:\n${traits}`);

  const personality = getF('PersonalityTraits ', 'PersonalityTraits', 'RASGOS DE PERSONALIDAD');
  if (personality) noteParts.push(`Personalidad: ${personality}`);

  const ideals = getF('Ideals', 'IDEALES');
  if (ideals) noteParts.push(`Ideales: ${ideals}`);

  const bonds = getF('Bonds', 'VÍNCULOS');
  if (bonds) noteParts.push(`Vínculos: ${bonds}`);

  const flaws = getF('Flaws', 'DEFECTOS');
  if (flaws) noteParts.push(`Defectos: ${flaws}`);

  const equipment = getF('Equipment', 'Equipment 2', 'EQUIPO');
  if (equipment) noteParts.push(`Equipo:\n${equipment}`);

  if (background) noteParts.push(`Trasfondo: ${background}`);

  return {
    id: 'char-pdf-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    campaignId,
    name,
    playerName,
    race,
    class: className,
    level,
    maxHp,
    currentHp,
    tempHp,
    ac,
    initiativeBonus,
    speed,
    passivePerception,
    stats,
    savingThrows,
    attacks,
    notes: noteParts.join('\n\n'),
    avatarUrl: '', // ready to be set or uploaded
  };
}
