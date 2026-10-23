import { Character, MonsterStatblock } from '../types';

export const XP_BY_CR: Record<string, number> = {
  '0': 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
};

export const XP_THRESHOLDS_BY_LEVEL: Record<number, { easy: number; medium: number; hard: number; deadly: number; daily: number }> = {
  1: { easy: 25, medium: 50, hard: 75, deadly: 100, daily: 300 },
  2: { easy: 50, medium: 100, hard: 150, deadly: 200, daily: 600 },
  3: { easy: 75, medium: 150, hard: 225, deadly: 400, daily: 1200 },
  4: { easy: 125, medium: 250, hard: 375, deadly: 500, daily: 1700 },
  5: { easy: 250, medium: 500, hard: 750, deadly: 1100, daily: 3500 },
  6: { easy: 300, medium: 600, hard: 900, deadly: 1400, daily: 4000 },
  7: { easy: 350, medium: 750, hard: 1100, deadly: 1700, daily: 5000 },
  8: { easy: 450, medium: 900, hard: 1400, deadly: 2100, daily: 6000 },
  9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400, daily: 7500 },
  10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800, daily: 9000 },
  11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600, daily: 10500 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500, daily: 11500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100, daily: 13500 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700, daily: 15000 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400, daily: 18000 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200, daily: 20000 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800, daily: 25000 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500, daily: 27000 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900, daily: 30000 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700, daily: 40000 },
};

export function getXpForCr(cr: string | number): number {
  const crStr = String(cr).trim();
  return XP_BY_CR[crStr] || 0;
}

export function getMonsterMultiplier(monsterCount: number, partySize: number): number {
  if (monsterCount <= 0) return 1;

  const brackets = [
    { count: 1, mult: 1 },
    { count: 2, mult: 1.5 },
    { count: 6, mult: 2 },
    { count: 10, mult: 2.5 },
    { count: 14, mult: 3 },
    { count: Infinity, mult: 4 },
  ];

  let bracketIndex = brackets.findIndex((b) => monsterCount <= b.count);
  if (bracketIndex === -1) bracketIndex = brackets.length - 1;

  // Party size adjustments (DMG p. 83)
  if (partySize < 3) {
    bracketIndex = Math.min(bracketIndex + 1, brackets.length - 1);
  } else if (partySize >= 6) {
    bracketIndex = Math.max(bracketIndex - 1, 0);
  }

  return brackets[bracketIndex].mult;
}

export interface EncounterCalculation {
  partySize: number;
  averageLevel: number;
  thresholds: {
    easy: number;
    medium: number;
    hard: number;
    deadly: number;
    daily: number;
  };
  totalMonsters: number;
  rawXp: number;
  adjustedXp: number;
  multiplier: number;
  difficulty: 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Deadly';
  difficultyColor: string;
  difficultyBadgeClass: string;
  analysisMessage: string;
  lethalityWarning?: string;
}

export function calculateEncounter(
  party: Character[],
  enemyList: Array<{ monster: MonsterStatblock; count: number }>
): EncounterCalculation {
  const partySize = Math.max(party.length, 1);
  let totalLevel = 0;

  const thresholds = {
    easy: 0,
    medium: 0,
    hard: 0,
    deadly: 0,
    daily: 0,
  };

  party.forEach((char) => {
    const lvl = Math.min(Math.max(char.level || 1, 1), 20);
    totalLevel += lvl;
    const t = XP_THRESHOLDS_BY_LEVEL[lvl];
    if (t) {
      thresholds.easy += t.easy;
      thresholds.medium += t.medium;
      thresholds.hard += t.hard;
      thresholds.deadly += t.deadly;
      thresholds.daily += t.daily;
    }
  });

  const averageLevel = party.length > 0 ? Math.round((totalLevel / party.length) * 10) / 10 : 1;

  let totalMonsters = 0;
  let rawXp = 0;
  let highestMonsterCr = 0;

  enemyList.forEach(({ monster, count }) => {
    if (count > 0 && monster) {
      totalMonsters += count;
      const monsterXp = monster.xp || getXpForCr(monster.cr);
      rawXp += monsterXp * count;

      // Numerical CR for lethality check
      let numCr = 0;
      if (monster.cr === '1/8') numCr = 0.125;
      else if (monster.cr === '1/4') numCr = 0.25;
      else if (monster.cr === '1/2') numCr = 0.5;
      else numCr = parseFloat(monster.cr) || 0;

      if (numCr > highestMonsterCr) highestMonsterCr = numCr;
    }
  });

  const multiplier = getMonsterMultiplier(totalMonsters, partySize);
  const adjustedXp = Math.round(rawXp * multiplier);

  let difficulty: 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Deadly' = 'Trivial';
  let difficultyColor = '#10b981'; // green
  let difficultyBadgeClass = 'bg-emerald-950 text-emerald-400 border-emerald-700';
  let analysisMessage = 'Un paseo para el grupo. Casi ningún gasto de recursos.';

  if (adjustedXp >= thresholds.deadly) {
    difficulty = 'Deadly';
    difficultyColor = '#ef4444'; // red
    difficultyBadgeClass = 'bg-red-950 text-red-400 border-red-700';
    analysisMessage = '¡Encuentro Mortal! Podría resultar en la muerte de uno o varios aventureros.';
  } else if (adjustedXp >= thresholds.hard) {
    difficulty = 'Hard';
    difficultyColor = '#f97316'; // orange
    difficultyBadgeClass = 'bg-amber-950 text-amber-400 border-amber-700';
    analysisMessage = 'Encuentro Difícil. Los personajes necesitarán gastar recursos valiosos y jugar con táctica.';
  } else if (adjustedXp >= thresholds.medium) {
    difficulty = 'Medium';
    difficultyColor = '#eab308'; // yellow
    difficultyBadgeClass = 'bg-yellow-950 text-yellow-400 border-yellow-700';
    analysisMessage = 'Encuentro Medio. Desafío estándar; los aventureros sufrirán daño menor sin correr riesgo crítico.';
  } else if (adjustedXp >= thresholds.easy) {
    difficulty = 'Easy';
    difficultyColor = '#3b82f6'; // blue
    difficultyBadgeClass = 'bg-blue-950 text-blue-400 border-blue-700';
    analysisMessage = 'Encuentro Fácil. Victoria casi asegurada con consumo mínimo de recursos.';
  }

  // Lethality warning: if a single monster has CR significantly higher than average party level
  let lethalityWarning: string | undefined;
  if (party.length > 0 && highestMonsterCr > averageLevel + 2) {
    lethalityWarning = `⚠️ ¡Cuidado con el CR individual! Un enemigo tiene CR ${highestMonsterCr}, superando por mucho el nivel promedio del grupo (${averageLevel}). Existe alto riesgo de muerte instantánea por un solo golpe crítico.`;
  } else if (totalMonsters >= 8 && partySize <= 4) {
    lethalityWarning = `⚠️ Economía de acciones desfavorable: Hay ${totalMonsters} enemigos contra ${partySize} aventureros. Los múltiples ataques por turno pueden abrumar al grupo.`;
  }

  return {
    partySize,
    averageLevel,
    thresholds,
    totalMonsters,
    rawXp,
    adjustedXp,
    multiplier,
    difficulty,
    difficultyColor,
    difficultyBadgeClass,
    analysisMessage,
    lethalityWarning,
  };
}

export function formatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
