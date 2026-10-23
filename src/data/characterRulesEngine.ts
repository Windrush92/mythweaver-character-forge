// Motor de Reglas Oficiales D&D 5e / Baldur's Gate 3
// Gestiona el cálculo dinámico y reactivo de velocidad, CA, bono de competencia,
// ataques derivados, recursos de clase, dados de golpe y rasgos por nivel.

import { Character, AbilityScores, CharacterAttack, ClassResource, MulticlassEntry, CharacterSpellSlots } from '../types';
import { findArmorByName, ArmorDef, calculateEquippedAc, findWeaponByName, generateAttackFromWeapon } from './weaponsAndArmorData';
import { WIKIDOT_RACES, FULL_CASTER_SLOTS_TABLE, WARLOCK_PACT_SLOTS_TABLE } from './wikidotData';

// 1. Bono de Competencia Oficial 5e
export function getProficiencyBonus(level: number): number {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

// 2. Modificador de Característica
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// 3. Cálculo Dinámico de Velocidad (Speed) 5e
export interface SpeedCalculationResult {
  speedStr: string;
  speedFeet: number;
  baseFeet: number;
  bonusFeet: number;
  breakdown: string[];
  isFastMovementActive: boolean;
  isUnarmoredMovementActive: boolean;
}

export function calculateCharacterSpeed(params: {
  baseSpeed?: string;
  characterClass?: string;
  subclass?: string;
  level?: number;
  equippedItems?: string[];
  notes?: string;
  raceName?: string;
  strength?: number;
}): SpeedCalculationResult {
  const {
    baseSpeed = '30 pies',
    characterClass = '',
    subclass = '',
    level = 1,
    equippedItems = [],
    notes = '',
    raceName = '',
    strength = 10,
  } = params;

  // 1. Obtener la velocidad racial base verdadera (no inflada por cálculos previos o guardados)
  let baseFeet = 30;
  const rLower = (raceName || '').toLowerCase().trim();

  // Buscar coincidencia en compendio de razas
  const raceEntry = WIKIDOT_RACES.find(
    (r) =>
      r.name.toLowerCase() === rLower ||
      r.id.toLowerCase() === rLower ||
      (rLower.length >= 4 && (rLower.includes(r.name.toLowerCase()) || r.name.toLowerCase().includes(rLower)))
  );

  if (raceEntry && raceEntry.speed) {
    const match = raceEntry.speed.match(/(\d+)\s*(pies|ft)/i);
    if (match) {
      baseFeet = parseInt(match[1], 10);
    }
  } else if (
    rLower.includes('enano') || rLower.includes('dwarf') ||
    rLower.includes('mediano') || rLower.includes('halfling') ||
    rLower.includes('gnomo') || rLower.includes('gnome') ||
    rLower.includes('kobold') || rLower.includes('goblin')
  ) {
    baseFeet = 25;
  } else if (rLower.includes('elfo de los bosques') || rLower.includes('wood elf') || rLower.includes('dhampir')) {
    baseFeet = 35;
  } else if (rLower.includes('centauro') || rLower.includes('centaur')) {
    baseFeet = 40;
  } else {
    // Si no se identificó la raza por nombre, inspeccionar baseSpeed
    const matchFeet = baseSpeed.match(/(\d+)\s*(pies|ft)/i);
    if (matchFeet) {
      const parsed = parseInt(matchFeet[1], 10);
      // Si parsed ya contiene bonificaciones previas (ej. 40 o 50 pies para bárbaro/monje),
      // no acumular sobre el valor ya inflado: el estándar de razas medianas es 30.
      baseFeet = parsed <= 35 ? parsed : 30;
    }
  }

  let bonusFeet = 0;
  const breakdown: string[] = [`Base: ${baseFeet} pies`];
  let isFastMovementActive = false;
  let isUnarmoredMovementActive = false;

  const cLower = characterClass.toLowerCase();
  const notesLower = notes.toLowerCase();

  // Detectar armaduras y escudos equipados
  let equippedHeavyArmor: ArmorDef | null = null;
  let equippedArmor: ArmorDef | null = null;
  let hasShield = false;

  for (const itemName of equippedItems) {
    const itemLower = itemName.toLowerCase();
    if (
      itemLower.includes('escudo') &&
      !itemLower.includes('hechizo') &&
      !itemLower.includes('conjuro') &&
      !itemLower.includes('maestro de escudos')
    ) {
      hasShield = true;
    }
    const armor = findArmorByName(itemName);
    if (armor && armor.category !== 'shield') {
      equippedArmor = armor;
      if (armor.category === 'heavy') {
        equippedHeavyArmor = armor;
      }
    }
  }

  // A. Bárbaro: Movimiento Rápido (Fast Movement - Nivel 5+)
  // "Starting at 5th level, your speed increases by 10 feet while you aren't wearing heavy armor."
  const isBarbarian = cLower.includes('bárbaro') || cLower.includes('barbaro') || cLower.includes('barbarian');
  if (isBarbarian && level >= 5) {
    if (!equippedHeavyArmor) {
      bonusFeet += 10;
      isFastMovementActive = true;
      breakdown.push('Movimiento Rápido (Bárbaro Nv 5+): +10 pies');
    } else {
      breakdown.push('Movimiento Rápido (Bárbaro): Desactivado por armadura pesada');
    }
  }

  // B. Monje: Movimiento Sin Armadura (Unarmored Movement - Nivel 2+)
  // Solo activo si NO lleva armadura de ningún tipo Y no lleva escudo
  const isMonk = cLower.includes('monje') || cLower.includes('monk');
  if (isMonk && level >= 2) {
    if (!equippedArmor && !hasShield) {
      let monkBonus = 10;
      if (level >= 18) monkBonus = 30;
      else if (level >= 14) monkBonus = 25;
      else if (level >= 10) monkBonus = 20;
      else if (level >= 6) monkBonus = 15;

      bonusFeet += monkBonus;
      isUnarmoredMovementActive = true;
      breakdown.push(`Movimiento Sin Armadura (Monje Nv ${level}): +${monkBonus} pies`);
    } else {
      breakdown.push('Movimiento Sin Armadura (Monje): Desactivado por armadura o escudo');
    }
  }

  // B.1 Paladín: Aura de Alacridad (Oath of Glory - Nivel 7+)
  const subLower = (subclass || '').toLowerCase();
  const isPaladin = cLower.includes('paladín') || cLower.includes('paladin');
  const isGlory = subLower.includes('gloria') || subLower.includes('glory') || notesLower.includes('gloria') || notesLower.includes('glory') || notesLower.includes('alacridad');
  if (isPaladin && isGlory && level >= 7) {
    bonusFeet += 10;
    breakdown.push(`Aura de Alacridad (Paladín de la Gloria Nv ${level}): +10 pies`);
  }

  // B.2 Pícaro: Movimiento Superior (Scout / Explorador Silvano - Nivel 9+)
  const isRogue = cLower.includes('pícaro') || cLower.includes('picaro') || cLower.includes('rogue');
  const isScout = subLower.includes('scout') || subLower.includes('explorador') || notesLower.includes('scout') || notesLower.includes('explorador');
  if (isRogue && isScout && level >= 9) {
    bonusFeet += 10;
    breakdown.push(`Movimiento Superior (Pícaro Explorador Silvano Nv ${level}): +10 pies`);
  }

  // C. Dote: Móvil (Mobile Feat)
  const hasMobileFeat =
    notesLower.includes('móvil') ||
    notesLower.includes('movil') ||
    notesLower.includes('mobile');
  if (hasMobileFeat) {
    bonusFeet += 10;
    breakdown.push('Dote Móvil (Mobile): +10 pies');
  }

  // D. Penalización de Fuerza por Armadura Pesada (a menos que sea Enano)
  const isDwarf = raceName.toLowerCase().includes('enano') || raceName.toLowerCase().includes('dwarf');
  const heavyArmor: ArmorDef | null = equippedHeavyArmor;
  if (heavyArmor && heavyArmor.strengthReq > 0 && strength < heavyArmor.strengthReq && !isDwarf) {
    bonusFeet -= 10;
    breakdown.push(`Fuerza insuficiente (${strength} < ${heavyArmor.strengthReq}): -10 pies`);
  }

  const finalFeet = Math.max(5, baseFeet + bonusFeet);

  // Reensamblar string preservando otros modos de movimiento (vuelo, trepar, nado)
  let speedStr = `${finalFeet} pies`;
  if (baseSpeed.includes(',')) {
    // Si contiene modos adicionales como ", volar 30 pies"
    const extraModes = baseSpeed.substring(baseSpeed.indexOf(',') + 1).trim();
    speedStr = `${finalFeet} pies, ${extraModes}`;
  }

  return {
    speedStr,
    speedFeet: finalFeet,
    baseFeet,
    bonusFeet,
    breakdown,
    isFastMovementActive,
    isUnarmoredMovementActive,
  };
}

// 4. Ataque Adicional (Extra Attack) 5e
export interface ExtraAttackInfo {
  hasExtraAttack: boolean;
  attacksCount: number;
  label: string;
}

export function getExtraAttackInfo(characterClass: string, level: number, subclass?: string): ExtraAttackInfo {
  const cLower = characterClass.toLowerCase();
  const sLower = (subclass || '').toLowerCase();

  // Guerrero: 2 ataques a Nv 5, 3 a Nv 11, 4 a Nv 20
  if (cLower.includes('guerrero') || cLower.includes('fighter')) {
    if (level >= 20) return { hasExtraAttack: true, attacksCount: 4, label: 'Ataque Adicional (4 ataques por acción de atacar)' };
    if (level >= 11) return { hasExtraAttack: true, attacksCount: 3, label: 'Ataque Adicional (3 ataques por acción de atacar)' };
    if (level >= 5) return { hasExtraAttack: true, attacksCount: 2, label: 'Ataque Adicional (2 ataques por acción de atacar)' };
  }

  // Bárbaro, Paladín, Explorador, Monje a Nivel 5+
  if (
    cLower.includes('bárbaro') || cLower.includes('barbaro') || cLower.includes('barbarian') ||
    cLower.includes('paladín') || cLower.includes('paladin') ||
    cLower.includes('explorador') || cLower.includes('ranger') ||
    cLower.includes('monje') || cLower.includes('monk') ||
    cLower.includes('pugilist')
  ) {
    if ((cLower.includes('monje') || cLower.includes('monk')) && level >= 17 && (sLower.includes('yo-astral') || sLower.includes('astral'))) {
      return { hasExtraAttack: true, attacksCount: 3, label: 'Despertar Astral (3 ataques con Brazos Astrales por acción de atacar)' };
    }
    if (level >= 5) {
      return { hasExtraAttack: true, attacksCount: 2, label: 'Ataque Adicional (2 ataques por acción de atacar)' };
    }
  }

  // Bardo de Colegio del Valor o Espadas a Nivel 6+
  if ((cLower.includes('bardo') || cLower.includes('bard')) && (sLower.includes('valor') || sLower.includes('espadas') || sLower.includes('swords'))) {
    if (level >= 6) {
      return { hasExtraAttack: true, attacksCount: 2, label: 'Ataque Adicional de Bardo (2 ataques por acción de atacar)' };
    }
  }

  // Mago Cantor de la Hoja (Bladesinger) a Nivel 6+
  if (cLower.includes('mago') && (sLower.includes('cantor') || sLower.includes('hoja') || sLower.includes('bladesing'))) {
    if (level >= 6) {
      return { hasExtraAttack: true, attacksCount: 2, label: 'Ataque Adicional de Cantor de la Hoja (2 ataques por acción de atacar)' };
    }
  }

  return { hasExtraAttack: false, attacksCount: 1, label: '1 ataque estándar por acción de atacar' };
}

// 5. Daño de Furia del Bárbaro (Rage Damage)
export function getBarbarianRageDamageBonus(level: number): number {
  if (level >= 16) return 4;
  if (level >= 9) return 3;
  return 2;
}

// 6. Usos Máximos de Furia del Bárbaro
export function getBarbarianMaxRages(level: number): number {
  if (level >= 20) return 999; // Ilimitada
  if (level >= 17) return 6;
  if (level >= 12) return 5;
  if (level >= 6) return 4;
  if (level >= 3) return 3;
  return 2;
}

// 7. Dado de Inspiración Bárdica
export function getBardicInspirationDie(level: number): 'd6' | 'd8' | 'd10' | 'd12' {
  if (level >= 15) return 'd12';
  if (level >= 10) return 'd10';
  if (level >= 5) return 'd8';
  return 'd6';
}

// 8. Dado de Canción de Descanso
export function getSongOfRestDie(level: number): 'd6' | 'd8' | 'd10' | 'd12' {
  if (level >= 17) return 'd12';
  if (level >= 13) return 'd10';
  if (level >= 9) return 'd8';
  return 'd6';
}

// 8.1 Dado de Artes Marciales del Monje (PHB p.78)
export function getMonkMartialArtsDie(level: number): string {
  if (level >= 17) return '1d10';
  if (level >= 11) return '1d8';
  if (level >= 5) return '1d6';
  return '1d4';
}

// 8.2 Bonificador de Movimiento Sin Armadura del Monje (PHB p.78)
export function getMonkUnarmoredMovementBonus(level: number): number {
  if (level < 2) return 0;
  if (level >= 18) return 30;
  if (level >= 14) return 25;
  if (level >= 10) return 20;
  if (level >= 6) return 15;
  return 10;
}

// 9. Usos de Canalizar Divinidad del Clérigo (Channel Divinity)
export function getClericChannelDivinityUses(level: number): number {
  if (level < 2) return 0;
  if (level >= 18) return 3;
  if (level >= 6) return 2;
  return 1;
}

// 10. Umbral de Destruir Muertos Vivientes (Destroy Undead CR)
export function getClericDestroyUndeadCr(level: number): string | null {
  if (level >= 17) return 'VD 4 o menor';
  if (level >= 14) return 'VD 3 o menor';
  if (level >= 11) return 'VD 2 o menor';
  if (level >= 8) return 'VD 1 o menor';
  if (level >= 5) return 'VD 1/2 o menor';
  return null;
}

// 11. Rasgo de Daño a Nivel 8 del Clérigo (Golpe Divino / Lanzamiento Potente)
export function getClericLevel8Feature(subclassName?: string, level: number = 8): {
  type: 'divine_strike' | 'potent_spellcasting';
  label: string;
  damageDiceOrBonus: string;
} {
  const sub = (subclassName || '').toLowerCase();
  // Dominios de Lanzamiento Potente: Luz, Conocimiento, Tumba, Paz, Arcano
  if (
    sub.includes('luz') || sub.includes('light') ||
    sub.includes('conocimiento') || sub.includes('knowledge') ||
    sub.includes('tumba') || sub.includes('grave') ||
    sub.includes('paz') || sub.includes('peace') ||
    sub.includes('arcano') || sub.includes('arcana')
  ) {
    return {
      type: 'potent_spellcasting',
      label: 'Lanzamiento Potente de Conjuros (Potent Spellcasting)',
      damageDiceOrBonus: '+Mod Sabiduría a trucos de clérigo',
    };
  }
  // Dominios de Golpe Divino: Vida, Guerra, Tempestad, Forja, Muerte, Naturaleza, Engaño, Crepúsculo, Orden
  const dice = level >= 14 ? '2d8' : '1d8';
  let dmgType = 'radiante';
  if (sub.includes('guerra') || sub.includes('war')) dmgType = 'del arma';
  else if (sub.includes('tempestad') || sub.includes('tempest')) dmgType = 'trueno o relámpago';
  else if (sub.includes('forja') || sub.includes('forge')) dmgType = 'fuego';
  else if (sub.includes('muerte') || sub.includes('death')) dmgType = 'necrótico';
  else if (sub.includes('naturaleza') || sub.includes('nature')) dmgType = 'frío, fuego o relámpago';
  else if (sub.includes('engano') || sub.includes('engaño') || sub.includes('trickery')) dmgType = 'veneno';
  else if (sub.includes('orden') || sub.includes('order')) dmgType = 'psíquico';
  else if (sub.includes('crepusculo') || sub.includes('crepúsculo') || sub.includes('twilight')) dmgType = 'radiante';

  return {
    type: 'divine_strike',
    label: `Golpe Divino: ${dmgType.toUpperCase()} (${dice})`,
    damageDiceOrBonus: `${dice} daño ${dmgType}`,
  };
}

// 12. Usos Máximos de Forma Salvaje del Druida (Wild Shape)
export function getDruidWildShapeMaxUses(level: number): number {
  if (level < 2) return 0;
  if (level >= 20) return 999; // Archidruida ilimitado a Nivel 20
  return 2;
}

// 13. Duración en Horas de Forma Salvaje
export function getDruidWildShapeDurationHours(level: number): number {
  if (level < 2) return 0;
  return Math.floor(level / 2);
}

// 14. Límites Oficiales de Forma Salvaje (VD, Nado, Vuelo, Elementales)
export function getDruidWildShapeLimits(level: number, isMoonCircle: boolean = false): {
  maxCr: string;
  maxCrNumber: number;
  canSwim: boolean;
  canFly: boolean;
  canElemental: boolean;
} {
  if (level < 2) return { maxCr: '0', maxCrNumber: 0, canSwim: false, canFly: false, canElemental: false };
  const canSwim = level >= 4;
  const canFly = level >= 8;

  if (isMoonCircle) {
    const canElemental = level >= 10;
    if (level >= 6) {
      const moonCr = Math.floor(level / 3);
      return { maxCr: `VD ${moonCr}`, maxCrNumber: moonCr, canSwim, canFly, canElemental };
    }
    return { maxCr: 'VD 1', maxCrNumber: 1, canSwim, canFly, canElemental: false };
  }

  if (level >= 8) return { maxCr: 'VD 1', maxCrNumber: 1, canSwim: true, canFly: true, canElemental: false };
  if (level >= 4) return { maxCr: 'VD 1/2', maxCrNumber: 0.5, canSwim: true, canFly: false, canElemental: false };
  return { maxCr: 'VD 1/4', maxCrNumber: 0.25, canSwim: false, canFly: false, canElemental: false };
}

// 15. Generación y Actualización Oficial de Recursos de Clase
export function generateClassResourcesForCharacter(
  characterClass: string,
  level: number,
  stats: AbilityScores,
  existingResources?: ClassResource[],
  subclassName?: string
): ClassResource[] {
  const cLower = characterClass.toLowerCase();
  const chaMod = getAbilityModifier(stats.cha || 10);
  const result: ClassResource[] = [];

  const findExistingCurrent = (resId: string, maxVal: number): number => {
    const prev = existingResources?.find((r) => r.id === resId);
    if (!prev) return maxVal;
    return Math.min(prev.current, maxVal);
  };

  // BÁRBARO
  if (cLower.includes('bárbaro') || cLower.includes('barbaro') || cLower.includes('barbarian')) {
    const maxRages = getBarbarianMaxRages(level);
    const rageDmg = getBarbarianRageDamageBonus(level);
    result.push({
      id: 'res-furia',
      name: 'Usos de Furia (Rage)',
      current: findExistingCurrent('res-furia', maxRages),
      max: maxRages,
      resetOn: 'long',
      description: `+${rageDmg} al daño cuerpo a cuerpo con FUE, ventaja en pruebas de Fuerza y resistencia a daño contundente, cortante y perforante.${level >= 20 ? ' (Furia ilimitada a Nivel 20)' : ''}`,
    });

    const subLower = (subclassName || '').toLowerCase();
    const conMod = getAbilityModifier(stats.con || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;

    // 1. Fanático (Zealot) Nivel 10: Presencia Fanática (Zealous Presence)
    if ((subLower.includes('fanático') || subLower.includes('fanatico') || subLower.includes('zealot')) && level >= 10) {
      result.push({
        id: 'res-presencia-fanatica',
        name: 'Presencia Fanática (Zealous Presence)',
        current: findExistingCurrent('res-presencia-fanatica', 1),
        max: 1,
        resetOn: 'long',
        description: 'Acción adicional (1/descanso largo): hasta 10 aliados a 60 pies ganan ventaja en tiradas de ataque y salvaciones hasta el inicio de tu siguiente turno.',
      });
    }

    // 2. Magia Salvaje (Wild Magic) Nivel 6: Magia Nutritiva (Bolstering Magic)
    if ((subLower.includes('magia salvaje') || subLower.includes('wild magic')) && level >= 6) {
      const maxBolster = Math.max(1, conMod);
      result.push({
        id: 'res-magia-nutritiva',
        name: 'Magia Nutritiva (Bolstering Magic)',
        current: findExistingCurrent('res-magia-nutritiva', maxBolster),
        max: maxBolster,
        resetOn: 'long',
        description: `Acción (${maxBolster}/descanso largo): Toca una criatura para otorgar +1d3 a tiradas de ataque/habilidad (10 min) o recuperar una ranura de conjuro de nivel 1d3 (o nivel 1d4 a Nv 10+).`,
      });
    }

    // 3. Bestia (Path of the Beast):
    if (subLower.includes('bestia') || subLower.includes('beast')) {
      if (level >= 10) {
        result.push({
          id: 'res-furia-infecciosa',
          name: 'Furia Infecciosa (Infectious Fury)',
          current: findExistingCurrent('res-furia-infecciosa', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Al impactar con armas bestiales (${profBonus}/descanso largo): Objetivo sufre 2d12 daño psíquico o gasta su reacción atacando a otra criatura (salvación Sabiduría CD ${8 + profBonus + conMod}).`,
        });
      }
      if (level >= 14) {
        const maxCall = Math.max(1, conMod);
        result.push({
          id: 'res-llamada-manada',
          name: 'Llamada a la Manada (Call of the Hunt)',
          current: findExistingCurrent('res-llamada-manada', maxCall),
          max: maxCall,
          resetOn: 'long',
          description: `Al enfurecerte (${maxCall}/descanso largo): Otorga a ti y aliados a 30 pies 5 PG temporales por criatura dispuesta; los aliados suman 1d6 daño en un ataque cada turno.`,
        });
      }
    }
  }

  // MONJE
  else if (cLower.includes('monje') || cLower.includes('monk')) {
    const wisMod = getAbilityModifier(stats.wis || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();
    const martialArtsDie = getMonkMartialArtsDie(level);

    // Ki (Energía Mística - Nivel 2+)
    if (level >= 2) {
      const maxKi = level;
      result.push({
        id: 'res-puntos-ki',
        name: 'Puntos de Ki',
        current: findExistingCurrent('res-puntos-ki', findExistingCurrent('res-ki', maxKi)),
        max: maxKi,
        resetOn: 'short',
        description: `Energía mística (${maxKi} puntos, recarga en descanso corto): Ráfaga de Golpes (1 Ki, 2 ataques desarmados de ${martialArtsDie}), Defensa Paciente (1 Ki, Esquivar como acción adicional), Paso del Viento (1 Ki, Destrabarse o Correr con salto doble)${level >= 5 ? ', Golpe Aturdidor (1 Ki, salvación Con CD ' + (8 + profBonus + wisMod) + ' o Aturdido)' : ''}.`,
      });
    }

    // Alma de Diamante (Diamond Soul - Nivel 14+)
    if (level >= 14) {
      result.push({
        id: 'res-alma-diamante',
        name: 'Alma de Diamante (Diamond Soul)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: 'Competencia en todas las tiradas de salvación. Además, si fallas una tirada de salvación, puedes gastar 1 Ki para volver a tirarla.',
      });
    }

    // Cuerpo Vacío (Empty Body - Nivel 18+)
    if (level >= 18) {
      result.push({
        id: 'res-cuerpo-vacio',
        name: 'Cuerpo Vacío (Empty Body)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: 'Como acción por 4 Ki: te vuelves invisible durante 1 min y obtienes resistencia a todo daño excepto fuerza. Por 8 Ki: lanzas Proyección Astral.',
      });
    }

    // --- RECURSOS Y RASGOS DE LAS 10 SUBCLASES DE MONJE ---

    // 1. Camino de la Palma Abierta (Way of the Open Hand)
    if (subLower.includes('palma') || subLower.includes('abierta') || subLower.includes('open hand')) {
      if (level >= 6) {
        result.push({
          id: 'res-plenitud-cuerpo',
          name: 'Plenitud del Cuerpo (Wholeness of Body)',
          current: findExistingCurrent('res-plenitud-cuerpo', 1),
          max: 1,
          resetOn: 'long',
          description: `Acción (1/descanso largo): recuperas ${3 * level} puntos de golpe canalizando la armonía de tu Ki interno.`,
        });
      }
      if (level >= 17) {
        result.push({
          id: 'res-palma-tremula',
          name: 'Palma Trémula (Quivering Palm)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Gastas 3 Ki al golpear con ataque desarmado para fijar vibraciones letales. Como acción posterior: salvación Con o cae a 0 PG (o sufre 10d10 daño necrótico si tiene éxito).',
        });
      }
    }

    // 2. Senda de la Misericordia (Way of Mercy)
    if (subLower.includes('misericordia') || subLower.includes('mercy')) {
      if (level >= 3) {
        result.push({
          id: 'res-manos-sanacion',
          name: 'Manos de Sanación & Daño',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Sanación: 1 Ki (o en Ráfaga) cura ${martialArtsDie} + ${wisMod} PG${level >= 6 ? ' y elimina enfermedades o condiciones (ceguera/parálisis/aturdimiento)' : ''}. Daño: 1 Ki causa ${martialArtsDie} + ${wisMod} daño necrótico${level >= 6 ? ' y envenena al objetivo' : ''}${level >= 11 ? ' (sin Ki en Ráfaga)' : ''}.`,
        });
      }
      if (level >= 17) {
        result.push({
          id: 'res-gracia-final',
          name: 'Mano de la Gracia Final (Hand of Ultimate Mercy)',
          current: findExistingCurrent('res-gracia-final', 1),
          max: 1,
          resetOn: 'long',
          description: `Acción (1/descanso largo): tocas a una criatura muerta en las últimas 24 horas y gastas 5 Ki para revivirla con 4d10 + ${wisMod} puntos de golpe.`,
        });
      }
    }

    // 3. Senda del Dragón Ascendente (Way of the Ascendant Dragon)
    if (subLower.includes('dragon') || subLower.includes('dragón') || subLower.includes('ascendant')) {
      if (level >= 3) {
        result.push({
          id: 'res-aliento-dragon',
          name: 'Aliento del Dragón (Breath of the Dragon)',
          current: findExistingCurrent('res-aliento-dragon', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Al atacar (${profBonus}/descanso largo, o por 2 Ki): sustituyes 1 ataque por cono de 20 pies o línea de 30 pies infligiendo 2 dados de artes marciales (2${martialArtsDie.replace('1', '')}) de daño ácido, frío, fuego, relámpago o veneno.`,
        });
      }
      if (level >= 6) {
        result.push({
          id: 'res-alas-desplegadas',
          name: 'Alas Desplegadas (Wings Unfurled)',
          current: findExistingCurrent('res-alas-desplegadas', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Al usar Paso del Viento (${profBonus}/descanso largo): despliegas alas dracónicas ganando velocidad de vuelo igual a tu velocidad terrestre hasta el final del turno.`,
        });
      }
      if (level >= 11) {
        result.push({
          id: 'res-aspecto-dragon',
          name: 'Aspecto del Dragón (Aspect of the Wyrm)',
          current: findExistingCurrent('res-aspecto-dragon', 1),
          max: 1,
          resetOn: 'long',
          description: `Acción adicional (1/descanso largo, o por 3 Ki): emanas aura dracónica de 10 pies (1 min) otorgando resistencia elemental a aliados y atemorizando enemigos.`,
        });
      }
    }

    // 4. Camino de la Muerte Larga (Way of the Long Death)
    if (subLower.includes('muerte') || subLower.includes('long death') || subLower.includes('long-death')) {
      if (level >= 3) {
        const tempHpTouch = Math.max(1, wisMod + level);
        result.push({
          id: 'res-toque-muerte',
          name: 'Toque de la Muerte (Touch of Death)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Pasiva: cuando reduces a una criatura a 0 PG a 5 pies de ti o menos, obtienes ${tempHpTouch} puntos de golpe temporales.`,
        });
      }
      if (level >= 11) {
        result.push({
          id: 'res-maestria-muerte',
          name: 'Maestría de la Muerte (Mastery of Death)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Cuando quedas reducido a 0 puntos de golpe, puedes gastar 1 punto de Ki (sin usar ninguna acción) para quedar a 1 punto de golpe en su lugar.',
        });
      }
      if (level >= 17) {
        result.push({
          id: 'res-toque-muerte-larga',
          name: 'Toque de la Muerte Larga',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Como acción a 5 pies: gastas de 1 a 10 Ki. La criatura supera salvación Con o recibe 2d10 de daño necrótico por punto de Ki (mitad si tiene éxito).',
        });
      }
    }

    // 5. Senda del Kensei (Way of the Kensei)
    if (subLower.includes('kensei')) {
      if (level >= 3) {
        result.push({
          id: 'res-bloqueo-agil',
          name: 'Bloqueo Ágil de Kensei (+2 CA)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Pasiva: si realizas un ataque desarmado durante tu acción de atacar sosteniendo un arma kensei cuerpo a cuerpo, ganas +2 a la CA hasta el inicio de tu próximo turno.',
        });
      }
      if (level >= 6) {
        result.push({
          id: 'res-uno-espada',
          name: 'Uno con la Espada (Golpe Kensei)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Tus armas kensei cuentan como mágicas. Una vez por turno al impactar con arma kensei, puedes gastar 1 Ki para infligir +${martialArtsDie} de daño.`,
        });
      }
      if (level >= 11) {
        result.push({
          id: 'res-afilar-hoja',
          name: 'Afilar la Hoja (Sharpen the Blade)',
          current: 3,
          max: 3,
          resetOn: 'short',
          description: 'Acción adicional: gastas hasta 3 Ki para otorgar a un arma kensei no mágica un bonificador de hasta +3 a tiradas de ataque y daño durante 1 minuto.',
        });
      }
    }

    // 6. Senda del Alma Solar (Way of the Sun Soul)
    if (subLower.includes('solar') || subLower.includes('sun soul')) {
      if (level >= 3) {
        result.push({
          id: 'res-proyectil-solar',
          name: 'Proyectil Radiante del Sol (Radiant Sun Bolt)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Ataque a distancia (30 pies): dado ${martialArtsDie} + Des daño radiante. 1 Ki: disparas 2 proyectiles más con tu acción adicional.${level >= 6 ? ' A Nivel 6+: por 2 Ki lanzas Manos Ardientes tras atacar.' : ''}${level >= 11 ? ' A Nivel 11+: Estallido Solar Llameante a 150 pies (2d6 radiante + 2d6 por cada Ki adicional).' : ''}`,
        });
      }
      if (level >= 17) {
        result.push({
          id: 'res-escudo-sol',
          name: 'Escudo del Sol (Sun Shield)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Emanas luz brillante en 30 pies. Reacción al ser impactado a 5 pies: infliges ${5 + wisMod} de daño radiante al atacante.`,
        });
      }
    }

    // 7. Camino de la Sombra (Way of Shadow)
    if (subLower.includes('sombra') || subLower.includes('shadow')) {
      if (level >= 3) {
        result.push({
          id: 'res-artes-sombras',
          name: 'Artes de las Sombras',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Gastas 2 Ki para lanzar Oscuridad, Pasar sin Huella, Silencio o Visión en la Oscuridad sin componentes materiales.${level >= 6 ? ' A Nivel 6+: como acción adicional te teletransportas 60 pies entre sombras con ventaja en el siguiente ataque.' : ''}${level >= 11 ? ' A Nivel 11+: te vuelves invisible en penumbra u oscuridad.' : ''}`,
        });
      }
    }

    // 8. Senda de los Cuatro Elementos (Way of the Four Elements)
    if (subLower.includes('cuatro') || subLower.includes('four elements') || subLower.includes('elemental')) {
      if (level >= 3) {
        const maxKiDisc = level >= 17 ? 6 : level >= 13 ? 5 : level >= 9 ? 4 : level >= 5 ? 3 : 2;
        result.push({
          id: 'res-disciplinas-elementales',
          name: 'Límite de Ki Elemental',
          current: maxKiDisc,
          max: maxKiDisc,
          resetOn: 'short',
          description: `Límite máximo de Ki por disciplina elemental: ${maxKiDisc} Ki. CD de salvación de Ki: ${8 + profBonus + wisMod}. Canaliza disciplinas de agua, tierra, fuego y aire.`,
        });
      }
    }

    // 9. Senda del Maestro Borracho (Way of the Drunken Master)
    if (subLower.includes('borracho') || subLower.includes('drunken')) {
      if (level >= 3) {
        result.push({
          id: 'res-tecnica-borracho',
          name: 'Técnica del Borracho',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Al usar Ráfaga de Golpes: ganas Retirada gratuita y +10 pies de velocidad.${level >= 6 ? ' A Nivel 6+: levantarse cuesta solo 5 pies; y por 1 Ki como reacción rediriges un ataque cuerpo a cuerpo fallado a otro enemigo a 5 pies.' : ''}${level >= 11 ? ' A Nivel 11+: por 2 Ki cancelas desventaja en salvación o prueba.' : ''}`,
        });
      }
    }

    // 10. Senda del Yo Astral (Way of the Astral Self)
    if (subLower.includes('astral')) {
      if (level >= 3) {
        result.push({
          id: 'res-brazos-astrales',
          name: 'Brazos del Yo Astral',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Acción adicional (1 Ki, 10 min): invocas brazos de energía con 10 pies de alcance. Usas Sabiduría (+${wisMod}) para ataques desarmados e infliges daño de fuerza.${level >= 6 ? ' Rostro astral (1 Ki): visión mágica 120 pies y ventaja en Perspicacia/Intimidación.' : ''}${level >= 11 ? ' Cuerpo astral: reduces daño elemental en 1d10 + Sab y sumas +' + martialArtsDie + ' de daño.' : ''}${level >= 17 ? ' Despertar astral (5 Ki): +2 CA y 3 ataques con Brazos por acción de Atacar.' : ''}`,
        });
      }
    }
  }

  // GUERRERO (FIGHTER)
  else if (cLower.includes('guerrero') || cLower.includes('fighter')) {
    const conMod = getAbilityModifier(stats.con || 10);
    const strMod = getAbilityModifier(stats.str || 10);
    const intMod = getAbilityModifier(stats.int || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Segundo Aliento (Nivel 1+)
    result.push({
      id: 'res-segundo-aliento',
      name: 'Segundo Aliento (Second Wind)',
      current: findExistingCurrent('res-segundo-aliento', findExistingCurrent('res-segundo-aire', 1)),
      max: 1,
      resetOn: 'short',
      diceType: '1d10',
      description: `Acción adicional (1/descanso corto o largo): recuperas 1d10 + ${level} puntos de golpe.`,
    });

    // 2. Oleada de Acción (Nivel 2+)
    if (level >= 2) {
      const maxActionSurge = level >= 17 ? 2 : 1;
      result.push({
        id: 'res-oleada-accion',
        name: 'Oleada de Acción (Action Surge)',
        current: findExistingCurrent('res-oleada-accion', findExistingCurrent('res-oleada', maxActionSurge)),
        max: maxActionSurge,
        resetOn: 'short',
        description: `Toma una acción adicional completa en tu turno (${maxActionSurge} uso${maxActionSurge > 1 ? 's' : ''}/descanso corto o largo).`,
      });
    }

    // 3. Indómito (Nivel 9+)
    if (level >= 9) {
      const maxIndomitable = level >= 17 ? 3 : level >= 13 ? 2 : 1;
      result.push({
        id: 'res-indomito',
        name: 'Indómito (Indomitable)',
        current: findExistingCurrent('res-indomito', maxIndomitable),
        max: maxIndomitable,
        resetOn: 'long',
        description: `Repite una tirada de salvación fallida (${maxIndomitable} uso${maxIndomitable > 1 ? 's' : ''}/descanso largo).`,
      });
    }

    // --- RECURSOS DE LAS 10 SUBCLASES DE GUERRERO ---

    // 1. Maestro de Batalla (Battle Master)
    if (subLower.includes('maestro') || subLower.includes('batalla') || subLower.includes('battle master') || subLower.includes('battlemaster')) {
      if (level >= 3) {
        const diceCount = level >= 15 ? 6 : level >= 7 ? 5 : 4;
        const dieType = level >= 18 ? 'd12' : level >= 10 ? 'd10' : 'd8';
        result.push({
          id: 'res-dados-superioridad',
          name: `Dados de Superioridad (${dieType})`,
          current: findExistingCurrent('res-dados-superioridad', diceCount),
          max: diceCount,
          diceType: dieType,
          resetOn: 'short',
          description: `Ganas ${diceCount} dados marciales (${dieType}) para ejecutar maniobras tácticas (recarga en descanso corto o largo).`,
        });
      }
    }

    // 2. Caballero del Eco (Echo Knight)
    if (subLower.includes('eco') || subLower.includes('echo')) {
      if (level >= 3) {
        const maxUnleash = Math.max(1, conMod);
        result.push({
          id: 'res-encarnacion-desatada',
          name: 'Encarnación Desatada (Unleash Incarnation)',
          current: findExistingCurrent('res-encarnacion-desatada', maxUnleash),
          max: maxUnleash,
          resetOn: 'long',
          description: `Al Atacar (${maxUnleash}/descanso largo): realizas un ataque cuerpo a cuerpo adicional con arma a través de la posición de tu eco.`,
        });
      }
    }

    // 3. Caballero Rúnico (Rune Knight)
    if (subLower.includes('runico') || subLower.includes('rúnico') || subLower.includes('rune')) {
      if (level >= 3) {
        const giantDmg = level >= 18 ? '1d10' : level >= 10 ? '1d8' : '1d6';
        result.push({
          id: 'res-fuerza-gigante',
          name: `Fuerza de Gigante (+${giantDmg})`,
          current: findExistingCurrent('res-fuerza-gigante', profBonus),
          max: profBonus,
          resetOn: 'long',
          diceType: giantDmg,
          description: `Acción adicional (${profBonus}/descanso largo, 1 min): te vuelves ${level >= 18 ? 'Enorme' : 'Grande'}, ganas ventaja en pruebas/salvaciones de Fuerza y +${giantDmg} al daño de arma una vez por turno.`,
        });
      }
      if (level >= 7) {
        result.push({
          id: 'res-escudo-runico',
          name: 'Escudo Rúnico (Runic Shield)',
          current: findExistingCurrent('res-escudo-runico', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Reacción (${profBonus}/descanso largo): cuando una criatura impacte a un aliado a 60 pies, la fuerzas a repetir la tirada de ataque con el nuevo resultado.`,
        });
      }
    }

    // 4. Guerrero Psiónico (Psi Warrior)
    if (subLower.includes('psionico') || subLower.includes('psiónico') || subLower.includes('psi')) {
      if (level >= 3) {
        const maxPsiDice = profBonus * 2;
        const psiDieType = level >= 17 ? 'd12' : level >= 11 ? 'd10' : level >= 5 ? 'd8' : 'd6';
        result.push({
          id: 'res-dados-psionicos',
          name: `Dados de Poder Psiónico (${psiDieType})`,
          current: findExistingCurrent('res-dados-psionicos', maxPsiDice),
          max: maxPsiDice,
          diceType: psiDieType,
          resetOn: 'long',
          description: `Reserva de ${maxPsiDice} dados (${psiDieType}) para Campo Protector, Golpe Psiónico y Movimiento Telequinético. Acción adicional recupera 1 dado (1/descanso corto).`,
        });
      }
    }

    // 5. Samurái (Samurai)
    if (subLower.includes('samurai') || subLower.includes('samurái')) {
      if (level >= 3) {
        const tempHp = level >= 15 ? 15 : level >= 10 ? 10 : 5;
        result.push({
          id: 'res-espiritu-combatiente',
          name: 'Espíritu Combatiente (Fighting Spirit)',
          current: findExistingCurrent('res-espiritu-combatiente', 3),
          max: 3,
          resetOn: 'long',
          description: `Acción adicional (3/descanso largo): obtienes ventaja en todas tus tiradas de ataque con armas este turno y ganas ${tempHp} puntos de golpe temporales.`,
        });
      }
    }

    // 6. Arquero Arcano (Arcane Archer)
    if (subLower.includes('arquero') || subLower.includes('arcane archer')) {
      if (level >= 3) {
        result.push({
          id: 'res-disparo-arcano',
          name: 'Disparos Arcanos (Arcane Shot)',
          current: findExistingCurrent('res-disparo-arcano', 2),
          max: 2,
          resetOn: 'short',
          description: `2 usos por descanso corto o largo: imbúe flechas con efectos mágicos arcanos (Bramido, Desterradora, Enredadera, Perforante, Buscadora, Sombría, Debilitadora o Fascinante).`,
        });
      }
    }

    // 7. Caballero Jinete (Cavalier)
    if (subLower.includes('cavalier') || subLower.includes('jinete')) {
      if (level >= 3) {
        const maxMarks = Math.max(1, strMod);
        result.push({
          id: 'res-marca-incondicional',
          name: 'Ataque de Marca Incondicional',
          current: findExistingCurrent('res-marca-incondicional', maxMarks),
          max: maxMarks,
          resetOn: 'long',
          description: `Acción adicional (${maxMarks}/descanso largo): ataque cuerpo a cuerpo especial con ventaja contra criatura marcada que causa +${Math.floor(level / 2)} de daño.`,
        });
      }
      if (level >= 7) {
        const maxWarding = Math.max(1, conMod);
        result.push({
          id: 'res-maniobra-protectora',
          name: 'Maniobra Protectora (Warding Maneuver)',
          current: findExistingCurrent('res-maniobra-protectora', maxWarding),
          max: maxWarding,
          resetOn: 'long',
          description: `Reacción (${maxWarding}/descanso largo): tira 1d8 para sumar a tu CA o la de un aliado a 5 pies al ser impactado (si aún impacta, otorga resistencia al daño).`,
        });
      }
    }

    // 8. Campeón (Champion)
    if (subLower.includes('campeon') || subLower.includes('campeón') || subLower.includes('champion')) {
      if (level >= 18) {
        result.push({
          id: 'res-superviviente',
          name: 'Superviviente (Regeneración de PG)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Pasiva: al inicio de cada turno recuperas ${5 + conMod} PG si estás por debajo de la mitad de tus PG máximos y no tienes 0 PG.`,
        });
      }
    }

    // 9. Caballero Arcano (Eldritch Knight)
    if (subLower.includes('arcano') || subLower.includes('eldritch knight') || subLower.includes('eldritch-knight')) {
      if (level >= 3) {
        result.push({
          id: 'res-vinculo-arma',
          name: 'Vínculo con el Arma (Weapon Bond)',
          current: 2,
          max: 2,
          resetOn: 'short',
          description: `Mantienes hasta 2 armas vinculadas mágica y ritualmente: no puedes ser desarmado y puedes convocarlas instantáneamente a tu mano como acción adicional.`,
        });
      }
    }

    // 10. Caballero del Dragón Púrpura (Purple Dragon Knight / Banneret)
    if (subLower.includes('purpura') || subLower.includes('púrpura') || subLower.includes('banneret') || subLower.includes('purple dragon') || subLower.includes('purple-dragon')) {
      if (level >= 3) {
        result.push({
          id: 'res-grito-concentracion',
          name: 'Grito de Concentración (Rallying Cry)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Al usar Segundo Aliento: hasta 3 aliados a 60 pies recuperan ${level} puntos de golpe si pueden verte u oírte.`,
        });
      }
    }
  }

  // PALADÍN
  else if (cLower.includes('paladín') || cLower.includes('paladin')) {
    const chaMod = getAbilityModifier(stats.cha || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Imposición de Manos (Lay on Hands - Nivel 1+)
    const maxLoH = level * 5;
    result.push({
      id: 'res-imposicion-manos',
      name: 'Imposición de Manos (Lay on Hands)',
      current: findExistingCurrent('res-imposicion-manos', findExistingCurrent('res-manos', maxLoH)),
      max: maxLoH,
      resetOn: 'long',
      description: `Reserva curativa de ${maxLoH} PG (recarga en descanso largo). Con un toque sanas puntos de golpe o gastas 5 PG de la reserva para curar 1 enfermedad o neutralizar 1 veneno.`,
    });

    // 2. Sentido Divino (Divine Sense - Nivel 1+)
    const maxSense = Math.max(1, 1 + chaMod);
    result.push({
      id: 'res-sentido-divino',
      name: 'Sentido Divino (Divine Sense)',
      current: findExistingCurrent('res-sentido-divino', maxSense),
      max: maxSense,
      resetOn: 'long',
      description: `Acción (${maxSense}/descanso largo): detectas la presencia y ubicación exacta de celestiales, infernales y muertos vivientes a 60 pies que no tengan cobertura total.`,
    });

    // 3. Canalizar Divinidad (Channel Divinity - Nivel 3+)
    if (level >= 3) {
      result.push({
        id: 'res-canalizar-divinidad-paladin',
        name: 'Canalizar Divinidad (Channel Divinity)',
        current: findExistingCurrent('res-canalizar-divinidad-paladin', 1),
        max: 1,
        resetOn: 'short',
        description: '1 uso por descanso corto o largo para invocar el poder sagrado de tu Juramento.',
      });
    }

    const auraRange = level >= 18 ? '30 pies' : '10 pies';

    // 4. Aura de Protección (Aura of Protection - Nivel 6+)
    if (level >= 6) {
      result.push({
        id: 'res-aura-proteccion',
        name: `Aura de Protección (${auraRange})`,
        current: 1,
        max: 1,
        resetOn: 'short',
        description: `Tú y las criaturas aliadas a ${auraRange} sumáis +${Math.max(1, chaMod)} a todas las tiradas de salvación mientras estés consciente.`,
      });
    }

    // 5. Aura de Valor (Aura of Courage - Nivel 10+)
    if (level >= 10) {
      result.push({
        id: 'res-aura-coraje',
        name: `Aura de Valor (${auraRange})`,
        current: 1,
        max: 1,
        resetOn: 'short',
        description: `Tú y las criaturas aliadas a ${auraRange} sois completamente inmunes a ser Asustados mientras estés consciente.`,
      });
    }

    // 6. Castigo Divino Mejorado (Improved Divine Smite - Nivel 11+)
    if (level >= 11) {
      result.push({
        id: 'res-castigo-mejorado',
        name: 'Castigo Divino Mejorado (+1d8 Radiante)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: 'Tus ataques con armas cuerpo a cuerpo infligen permanentemente +1d8 de daño radiante pasivo automático en cada impacto.',
      });
    }

    // 7. Toque Limpiador (Cleansing Touch - Nivel 14+)
    if (level >= 14) {
      const maxCleansing = Math.max(1, chaMod);
      result.push({
        id: 'res-toque-limpiador',
        name: 'Toque Limpiador (Cleansing Touch)',
        current: findExistingCurrent('res-toque-limpiador', maxCleansing),
        max: maxCleansing,
        resetOn: 'long',
        description: `Acción (${maxCleansing}/descanso largo): finaliza un conjuro activo sobre ti mismo o una criatura voluntaria a la que toques.`,
      });
    }

    // --- RECURSOS ESPECÍFICOS DE LAS 9 SUBCLASES DE PALADÍN ---

    // 1. Juramento de los Antiguos (Oath of the Ancients)
    if (subLower.includes('antiguos') || subLower.includes('ancients')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-antiguos',
          name: `Aura contra Conjuros (${auraRange})`,
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Tú y las criaturas aliadas a ${auraRange} tenéis resistencia al daño infligido por conjuros.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-centinela-inmortal',
          name: 'Centinela Inmortal (Undying Sentinel)',
          current: findExistingCurrent('res-centinela-inmortal', 1),
          max: 1,
          resetOn: 'long',
          description: 'Reacción (1/descanso largo): cuando tus PG se reduzcan a 0 y no mueras instantáneamente, quedas a 1 PG en su lugar.',
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-campeon-anciano',
          name: 'Campeón Anciano (Elder Champion)',
          current: findExistingCurrent('res-campeon-anciano', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 min): regeneras 10 PG al inicio de tu turno, lanzas conjuros de paladín con tiempo de 1 acción como acción adicional, y enemigos a 10 pies tienen desventaja contra tus conjuros.',
        });
      }
    }

    // 2. Juramento de Conquista (Oath of Conquest)
    if (subLower.includes('conquista') || subLower.includes('conquest')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-conquista',
          name: `Aura de Conquista (${auraRange})`,
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Criaturas asustadas a ${auraRange} reducen su velocidad a 0 y sufren ${Math.floor(level / 2)} daño psíquico al iniciar su turno en tu aura.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-reprimenda-despreciativa',
          name: 'Reprimenda Despreciativa (Scornful Rebuke)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Cada vez que una criatura te impacte con un ataque, sufre ${Math.max(1, chaMod)} de daño psíquico mientras no estés incapacitado.`,
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-conquistador-invencible',
          name: 'Señor de la Guerra Invencible (Invincible Conqueror)',
          current: findExistingCurrent('res-conquistador-invencible', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 min): resistencia a todo daño con armas, crítico 19-20 y realizas un ataque adicional al tomar la acción de Atacar.',
        });
      }
    }

    // 3. Juramento de Devoción (Oath of Devotion)
    if (subLower.includes('devocion') || subLower.includes('devoción') || subLower.includes('devotion')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-devocion',
          name: `Aura de Devoción (${auraRange})`,
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Tú y las criaturas aliadas a ${auraRange} sois completamente inmunes a ser Hechizados mientras estés consciente.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-pureza-espiritu',
          name: 'Pureza de Espíritu (Purity of Spirit)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Estás permanentemente bajo los efectos del conjuro Protección contra el Mal y el Bien.',
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-halo-sagrado',
          name: 'Halo Sagrado (Holy Nimbus)',
          current: findExistingCurrent('res-halo-sagrado', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 min): emanas luz solar en 30 pies infligiendo 10 daño radiante a infernales/no muertos por turno y ventaja en salvaciones contra conjuros.',
        });
      }
    }

    // 4. Juramento de Venganza (Oath of Vengeance)
    if (subLower.includes('venganza') || subLower.includes('vengeance')) {
      if (level >= 7) {
        result.push({
          id: 'res-vengador-implacable',
          name: 'Vengador Implacable (Relentless Avenger)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Al golpear con un ataque de oportunidad, puedes moverte hasta la mitad de tu velocidad como parte de la misma reacción sin provocar ataques de oportunidad.',
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-alma-venganza',
          name: 'Alma de Venganza (Soul of Vengeance)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Reacción: cuando una criatura bajo tu Voto de Enemistad realice un ataque, puedes hacer un ataque cuerpo a cuerpo contra ella si está a tu alcance.',
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-angel-vengador',
          name: 'Ángel Vengador (Avenging Angel)',
          current: findExistingCurrent('res-angel-vengador', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 hora): alas espectrales con 60 pies de vuelo y aura de terror de 30 pies.',
        });
      }
    }

    // 5. Juramento de la Gloria (Oath of Glory)
    if (subLower.includes('gloria') || subLower.includes('glory')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-alacridad',
          name: 'Aura de Alacridad (+10 pies Vel)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Tu velocidad terrestre aumenta en 10 pies. Cualquier aliado que comience su turno a ${level >= 18 ? '10 pies' : '5 pies'} gana +10 pies de velocidad durante ese turno.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-defensa-gloriosa',
          name: 'Defensa Gloriosa (Glorious Defense)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Reacción cuando tú o una criatura a 10 pies sea atacada: sumas +${Math.max(1, chaMod)} a su CA; si falla, haces un ataque de arma inmediato contra el atacante.`,
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-heroe-viviente',
          name: 'Héroe Viviente (Living Legend)',
          current: findExistingCurrent('res-heroe-viviente', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción adicional (1/descanso largo, 1 min): ventaja en pruebas de Carisma, repite 1 ataque fallado cada turno y supera salvaciones falladas usando tu reacción.',
        });
      }
    }

    // 6. Juramento de los Vigilantes (Oath of the Watchers)
    if (subLower.includes('vigilantes') || subLower.includes('watchers')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-centinela',
          name: `Aura del Centinela (+${profBonus} Iniciativa)`,
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Tú y las criaturas aliadas a ${auraRange} sumáis vuestro bonificador de competencia (+${profBonus}) a las tiradas de Iniciativa.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-venganza-mental',
          name: 'Venganza Mental (Vigilant Rebuke)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Reacción: cuando tú o un aliado protegido supere una salvación contra un conjuro, el lanzador sufre 2d8 + ${Math.max(1, chaMod)} de daño de fuerza.`,
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-baluarte-mortal',
          name: 'Baluarte Mortal (Mortal Bulwark)',
          current: findExistingCurrent('res-baluarte-mortal', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 min): visión verdadera 120 pies, ventaja en ataques contra aberraciones/celestiales/elementales/fey/infernales y posibilidad de desterrarlos al impactar.',
        });
      }
    }

    // 7. Juramento de la Corona (Oath of the Crown)
    if (subLower.includes('corona') || subLower.includes('crown')) {
      if (level >= 7) {
        result.push({
          id: 'res-fidelidad-inquebrantable',
          name: 'Fidelidad Inquebrantable (Divine Allegiance)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Reacción cuando una criatura a 5 pies sufra daño: puedes absorber mágicamente todo ese daño tú mismo en su lugar.',
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-espiritu-inquebrantable',
          name: 'Espíritu Inquebrantable (Unyielding Saint)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Tienes ventaja en tiradas de salvación contra efectos que te dejen paralizado o aturdido.',
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-campeon-exaltado',
          name: 'Campeón Exaltado (Exalted Champion)',
          current: findExistingCurrent('res-campeon-exaltado', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 hora): resistencia a daño físico no mágico, ventaja en salvaciones de muerte a aliados en 30 pies y ventaja en salvaciones de Sabiduría.',
        });
      }
    }

    // 8. Rompejuramentos (Oathbreaker)
    if (subLower.includes('rompejuramentos') || subLower.includes('oathbreaker')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-odio',
          name: `Aura de Odio (+${Math.max(1, chaMod)} Daño)`,
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Tú, así como cualquier infernal o no muerto a ${auraRange}, sumáis +${Math.max(1, chaMod)} a todas las tiradas de daño con armas cuerpo a cuerpo.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-resistencia-sobrenatural',
          name: 'Resistencia Sobrenatural (Supernatural Resistance)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Ganas resistencia permanente al daño contundente, perforante y cortante infligido por armas no mágicas.',
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-senor-del-terror',
          name: 'Señor del Terror (Dread Lord)',
          current: findExistingCurrent('res-senor-del-terror', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo, 1 min): manto de sombras de 30 pies, 4d10 daño psíquico a enemigos y ataque sombrío con acción adicional.',
        });
      }
    }

    // 9. Juramento de Redención (Oath of Redemption)
    if (subLower.includes('redencion') || subLower.includes('redención') || subLower.includes('redemption')) {
      if (level >= 7) {
        result.push({
          id: 'res-aura-guardian',
          name: `Aura del Guardián (${auraRange})`,
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Cuando una criatura a ${auraRange} sufra daño, puedes usar tu reacción para absorber mágicamente todo ese daño tú mismo.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-espiritu-protector',
          name: 'Espíritu Protector (Protective Spirit)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Pasiva: recuperas 1d6 + ${Math.floor(level / 2)} PG al final de tu turno en combate si estás por debajo de la mitad de tus PG máximos y no tienes 0 PG.`,
        });
      }
      if (level >= 20) {
        result.push({
          id: 'res-emisario-redencion',
          name: 'Emisario de la Redención (Emissary of Redemption)',
          current: 1,
          max: 1,
          resetOn: 'long',
          description: 'Ganas resistencia a todo el daño infligido por otras criaturas y reflejas la mitad del daño a los atacantes como daño radiante mientras no las ataques primero ni les lances conjuros dañinos.',
        });
      }
    }
  }

  // BARDO
  else if (cLower.includes('bardo') || cLower.includes('bard')) {
    const maxInsp = Math.max(1, chaMod);
    const inspDie = getBardicInspirationDie(level);
    result.push({
      id: 'res-insp',
      name: 'Inspiración Bárdica',
      current: findExistingCurrent('res-insp', maxInsp),
      max: maxInsp,
      diceType: inspDie,
      resetOn: level >= 5 ? 'short' : 'long', // Fuente de Inspiración a Nivel 5 se recarga en descanso corto
      description: `Otorga 1${inspDie} a un aliado para sumar a una tirada de ataque, prueba de característica o salvación.`,
    });

    // Canción de Descanso (Nivel 2+)
    if (level >= 2) {
      const restDie = getSongOfRestDie(level);
      result.push({
        id: 'res-cancion-descanso',
        name: `Canción de Descanso (${restDie})`,
        current: 1,
        max: 1,
        resetOn: 'short',
        diceType: restDie,
        description: `Tú y cualquier aliado que escuche tu música durante un descanso corto recuperan 1${restDie} puntos de golpe adicionales al gastar uno o más dados de golpe.`,
      });
    }

    const subLower = (subclassName || '').toLowerCase();

    // 1. Colegio del Glamour: Manto de Majestad (Nv 6) y Majestuosidad Inquebrantable (Nv 14)
    if (subLower.includes('glamour')) {
      if (level >= 6) {
        result.push({
          id: 'res-manto-majestad',
          name: 'Manto de Majestad (Mantle of Majesty)',
          current: findExistingCurrent('res-manto-majestad', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción adicional (1/descanso largo): Durante 1 minuto puedes lanzar Mando (Command) como acción adicional en cada turno sin gastar ranuras.',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-majestad-inquebrantable',
          name: 'Majestad Inquebrantable (Unbreakable Majesty)',
          current: findExistingCurrent('res-majestad-inquebrantable', 1),
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional (1/descanso corto o largo): Durante 1 minuto, enemigos que intenten atacarte deben superar salvación de Carisma o perder/redirigir su ataque.',
        });
      }
    }

    // 2. Colegio de los Susurros: Manto de Susurros (Nv 6) y Sabotaje Sombrío (Nv 14)
    if (subLower.includes('susurro') || subLower.includes('whisper')) {
      if (level >= 6) {
        result.push({
          id: 'res-manto-susurros',
          name: 'Manto de Susurros (Mantle of Whispers)',
          current: findExistingCurrent('res-manto-susurros', 1),
          max: 1,
          resetOn: 'short',
          description: 'Reacción (1/descanso corto o largo): Captura la sombra de un humanoide muerto a 30 pies para disfrazarte de él y obtener sus recuerdos durante 1 hora.',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-sabotaje-sombrio',
          name: 'Sabotaje Sombrío (Shadow Lore)',
          current: findExistingCurrent('res-sabotaje-sombrio', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo): Siembra un secreto ficticio en una criatura a 30 pies (salva Sabiduría o queda encantada 8 horas creyendo que tienes su secreto más oscuro).',
        });
      }
    }

    // 3. Colegio de la Elocuencia: Discurso Universal (Nv 6) e Inspiración Infecciosa (Nv 14)
    if (subLower.includes('elocuencia') || subLower.includes('eloquence')) {
      if (level >= 6) {
        result.push({
          id: 'res-discurso-universal',
          name: 'Discurso Universal (Universal Speech)',
          current: findExistingCurrent('res-discurso-universal', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo): Hasta Carisma criaturas a 60 pies comprenden mágicamente tus palabras durante 1 hora.',
        });
      }
      if (level >= 14) {
        const maxInfectious = Math.max(1, chaMod);
        result.push({
          id: 'res-inspiracion-infecciosa',
          name: 'Inspiración Infecciosa (Infectious Inspiration)',
          current: findExistingCurrent('res-inspiracion-infecciosa', maxInfectious),
          max: maxInfectious,
          resetOn: 'long',
          description: `Reacción (${maxInfectious}/descanso largo): Cuando un aliado use tu dado con éxito, otorga un dado a otro aliado a 60 pies sin gastar tus propios usos.`,
        });
      }
    }

    // 4. Colegio de la Creación: Actuación de la Creación (Nv 3) y Compañero Danzante (Nv 6)
    if (subLower.includes('creacion') || subLower.includes('creación') || subLower.includes('creation')) {
      if (level >= 3) {
        result.push({
          id: 'res-actuacion-creacion',
          name: 'Actuación de la Creación (Performance of Creation)',
          current: findExistingCurrent('res-actuacion-creacion', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo o ranura nivel 2+): Crea un objeto no mágico a 10 pies (valor máx 20 × nivel de bardo en mo, tamaño Mediano o menor; Grande a Nv 6, Enorme a Nv 14).',
        });
      }
      if (level >= 6) {
        result.push({
          id: 'res-objeto-danzante',
          name: 'Compañero Danzante (Animating Performance)',
          current: findExistingCurrent('res-objeto-danzante', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo o ranura nivel 3+): Anima un objeto Grande o menor como Objeto Danzante (CA 16, PG = 10 + 5×Nv, velocidad 30 pies y vuelo 30 pies).',
        });
      }
    }

    // 5. Colegio de los Espíritus: Sesión Espiritual (Nv 6)
    if (subLower.includes('espiritus') || subLower.includes('espíritus') || subLower.includes('spirits')) {
      if (level >= 6) {
        result.push({
          id: 'res-sesion-espiritual',
          name: 'Sesión Espiritual (Spirit Session)',
          current: findExistingCurrent('res-sesion-espiritual', 1),
          max: 1,
          resetOn: 'long',
          description: 'Ritual de 1 hora (1/descanso largo): Conoce temporalmente 1 conjuro de Adivinación o Nigromancia de cualquier clase hasta tu próximo descanso largo.',
        });
      }
    }
  }

  // HECHICERO
  else if (cLower.includes('hechicero') || cLower.includes('sorcerer')) {
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    const chaMod = getAbilityModifier(stats.cha || 10);

    // 1. Puntos de Hechicería (Nivel 2+)
    if (level >= 2) {
      const currentPts = existingResources?.find((r) => r.id === 'res-sorcery-pts' || r.id === 'res-puntos-hechiceria')?.current ?? level;
      result.push({
        id: 'res-sorcery-pts',
        name: 'Puntos de Hechicería (Sorcery Points)',
        current: currentPts,
        max: level,
        resetOn: 'long',
        description: `Puntos arcanos (${level} máx) para moldear conjuros con Metamagia o crear/convertir ranuras de conjuro.${level >= 20 ? ' A nivel 20 recuperas 4 puntos en cada descanso corto (Restauración Hechicera).' : ''}`,
      });
    }

    // 2. Metamagia (Nivel 3+)
    if (level >= 3) {
      const metamagicCount = level >= 17 ? 4 : level >= 10 ? 3 : 2;
      result.push({
        id: 'res-metamagia-info',
        name: `Metamagia (${metamagicCount} opciones)`,
        current: 1,
        max: 1,
        resetOn: 'short',
        description: `Permite alterar y potenciar conjuros gastando Puntos de Hechicería (${metamagicCount} opciones aprendidas: Rápido, Gemelo, Sutil, Potenciado, Cuidadoso, Extendido, Elevado, Transmutado, Buscador, Distante).`,
      });
    }

    // 3. Restauración Hechicera (Nivel 20)
    if (level >= 20) {
      result.push({
        id: 'res-restauracion-hechicera',
        name: 'Restauración Hechicera (Sorcerous Restoration)',
        current: findExistingCurrent('res-restauracion-hechicera', 1),
        max: 1,
        resetOn: 'short',
        description: 'Recuperas 4 puntos de hechicería gastados al terminar un descanso corto.',
      });
    }

    // --- RECURSOS DE LAS 8 SUBCLASES DE HECHICERO ---

    // 1. Magia Salvaje (Wild Magic)
    if (subLower.includes('salvaje') || subLower.includes('wild')) {
      result.push({
        id: 'res-mareas-caos',
        name: 'Mareas de Caos (Tides of Chaos)',
        current: findExistingCurrent('res-mareas-caos', 1),
        max: 1,
        resetOn: 'long',
        description: 'Ganas ventaja en una tirada de ataque, prueba de característica o tirada de salvación (1 uso por descanso largo; se recarga cuando el DM activa una Ola de Magia Salvaje).',
      });
      if (level >= 6) {
        result.push({
          id: 'res-doblegar-suerte',
          name: 'Doblegar la Suerte (Bend Luck)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Reacción (2 puntos de hechicería): tiras 1d4 para sumar o restar al resultado de d20 de otra criatura visible a 30 pies.',
        });
      }
    }

    // 2. Linaje Dracónico (Draconic Bloodline)
    if (subLower.includes('draconico') || subLower.includes('dracónico') || subLower.includes('draconic')) {
      if (level >= 6) {
        result.push({
          id: 'res-afinidad-elemental',
          name: 'Afinidad Elemental (Elemental Affinity)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Sumas tu Carisma (+${chaMod}) al daño de conjuros del tipo de tu ancestro dracónico. Puedes gastar 1 punto de hechicería para ganar resistencia a ese elemento durante 1 hora.`,
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-alas-dragon',
          name: 'Alas de Dragón (Dragon Wings)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Como acción adicional brotan alas dracónicas de tu espalda otorgándote una velocidad de vuelo igual a tu velocidad terrestre.',
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-presencia-draconica',
          name: 'Presencia Dracónica (Draconic Presence)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Como acción por 5 puntos de hechicería: emites un aura de 60 pies durante 1 minuto que deja a los enemigos Hechizados o Asustados (salvación de Sabiduría).',
        });
      }
    }

    // 3. Alma Divina (Divine Soul)
    if (subLower.includes('divin') || subLower.includes('divine')) {
      result.push({
        id: 'res-bendicion-dioses',
        name: 'Bendición de los Dioses (Favored by the Gods)',
        current: findExistingCurrent('res-bendicion-dioses', 1),
        max: 1,
        resetOn: 'short',
        description: 'Si fallas una tirada de ataque o salvación, tiras 2d4 y lo sumas al resultado, pudiendo convertir el fallo en éxito (1 uso por descanso corto o largo).',
      });
      if (level >= 6) {
        result.push({
          id: 'res-curacion-fortalecida',
          name: 'Curación Fortalecida (Empowered Healing)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Reacción (1 punto de hechicería): cuando tú o un aliado a 5 pies tire dados para recuperar PG con un conjuro, relanzas cualquier cantidad de dados de curación.',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-alas-angelicales',
          name: 'Alas Angelicales (Otherworldly Wings)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Como acción adicional manifiestas alas de energía que te otorgan velocidad de vuelo de 30 pies.',
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-recuperacion-sobrenatural',
          name: 'Recuperación Sobrenatural (Unearthly Recovery)',
          current: findExistingCurrent('res-recuperacion-sobrenatural', 1),
          max: 1,
          resetOn: 'long',
          description: 'Como acción adicional cuando tengas menos de la mitad de tus PG máximos, recuperas la mitad de tus PG máximos (1 uso por descanso largo).',
        });
      }
    }

    // 4. Hechicería de las Sombras (Shadow Magic)
    if (subLower.includes('sombra') || subLower.includes('shadow')) {
      result.push({
        id: 'res-fuerza-sepulcro',
        name: 'Fuerza del Sepulcro (Strength of the Grave)',
        current: findExistingCurrent('res-fuerza-sepulcro', 1),
        max: 1,
        resetOn: 'long',
        description: 'Si daño no radiante ni crítico te reduce a 0 PG, superas una salvación de Carisma (CD 5 + daño) para quedar a 1 PG en su lugar (1 uso por descanso largo).',
      });
      result.push({
        id: 'res-ojos-oscuridad',
        name: 'Ojos de la Oscuridad (Eyes of the Dark)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: 'Visión en la oscuridad a 120 pies. A nivel 3 puedes lanzar Oscuridad por 2 puntos de hechicería pudiendo ver a través de ella.',
      });
      if (level >= 6) {
        result.push({
          id: 'res-sabueso-infortunio',
          name: 'Sabueso del Infortunio (Hound of Ill Omen)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional (3 puntos de hechicería): invocas un can tenebroso a 30 pies; mientras esté a 5 pies de su presa, esta tiene desventaja en salvaciones contra tus conjuros.',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-paseo-sombras',
          name: 'Paseo de las Sombras (Shadow Walk)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional en luz tenue u oscuridad: te teletransportas mágicamente hasta 120 pies a otro espacio desocupado en penumbra u oscuridad.',
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-forma-sombria',
          name: 'Forma Sombría (Umbral Form)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional (6 puntos de hechicería, 1 min): resistencia a todo daño excepto radiante y fuerza, y puedes atravesar criaturas y objetos sólidos.',
        });
      }
    }

    // 5. Hechicería de la Tormenta (Storm Sorcery)
    if (subLower.includes('tormenta') || subLower.includes('storm')) {
      result.push({
        id: 'res-magia-viento',
        name: 'Magia de Viento (Tempestuous Magic)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: 'Acción adicional antes o después de lanzar un conjuro de nivel 1+: vuelas hasta 10 pies sin provocar ataques de oportunidad.',
      });
      if (level >= 6) {
        result.push({
          id: 'res-corazon-tormenta',
          name: 'Corazón de la Tormenta (Heart of the Storm)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Resistencia permanente a daño de relámpago y trueno. Al lanzar conjuros de trueno/relámpago Nv 1+, causas ${Math.max(1, Math.floor(level / 2))} daño a enemigos a 10 pies.`,
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-furia-tormenta',
          name: 'Furia de la Tormenta (Storm\'s Fury)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Reacción al ser alcanzado por ataque cuerpo a cuerpo: infliges ${level} de daño de relámpago al atacante y debe superar salvación de Fuerza o ser empujado 20 pies.`,
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-alma-viento',
          name: 'Alma del Viento (Wind Soul)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Inmunidad total a daño de relámpago y trueno y velocidad de vuelo permanente de 60 pies (puedes conceder vuelo de 30 pies a aliados).',
        });
      }
    }

    // 6. Mente Aberrante (Aberrant Mind)
    if (subLower.includes('aberrante') || subLower.includes('aberrant')) {
      result.push({
        id: 'res-habla-telepatica',
        name: 'Habla Telepática (Telepathic Speech)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: `Acción adicional: estableces un vínculo telepático con una criatura a 30 pies durante ${level} minutos.`,
      });
      if (level >= 6) {
        result.push({
          id: 'res-hechiceria-psionica',
          name: 'Hechicería Psiónica & Defensas',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Lanzas conjuros psiónicos gastando Puntos de Hechicería sin componentes verbales, somáticos ni materiales. Resistencia permanente a daño psíquico y ventaja contra ser encantado/asustado.',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-revelacion-carne',
          name: 'Revelación en Carne (Revelation in Flesh)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional (1+ puntos de hechicería, 10 min): mutas tu cuerpo para ver lo invisible (1 pt), volar (1 pt), nadar (1 pt) o deslizarte como gelatina (1 pt).',
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-remolino-debil',
          name: 'Remolino Débil (Warping Implosion)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Acción: te teletransportas hasta 120 pies creando un vórtice gravitatorio de 30 pies (3d10 daño de fuerza y succión a fallar salvación de Fuerza).',
        });
      }
    }

    // 7. Alma Mecánica (Clockwork Soul)
    if (subLower.includes('mecanic') || subLower.includes('mecánica') || subLower.includes('clockwork')) {
      result.push({
        id: 'res-restablecer-equilibrio',
        name: 'Restablecer el Equilibrio (Restore Balance)',
        current: findExistingCurrent('res-restablecer-equilibrio', profBonus),
        max: profBonus,
        resetOn: 'long',
        description: `Como reacción cuando una criatura a 60 pies tire con ventaja o desventaja, cancelas la ventaja o desventaja (${profBonus} usos por descanso largo).`,
      });
      if (level >= 6) {
        result.push({
          id: 'res-bastion-ley',
          name: 'Bastión de la Ley (Bastion of Law)',
          current: 5,
          max: 5,
          resetOn: 'long',
          description: 'Gastas de 1 a 5 puntos de hechicería para rodearte a ti o a un aliado de un escudo con dados d8 que reducen el daño recibido.',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-trance-orden',
          name: 'Trance del Orden (Trance of Order)',
          current: findExistingCurrent('res-trance-orden', 1),
          max: 1,
          resetOn: 'long',
          description: 'Como acción adicional entras en trance de 1 minuto: ataques contra ti no pueden tener ventaja y tus d20 de 1-9 cuentan como 10 (1 uso por descanso largo o 5 puntos de hechicería).',
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-cabalgata-mecanica',
          name: 'Cabalgata Mecánica (Clockwork Cavalcade)',
          current: 1,
          max: 1,
          resetOn: 'long',
          description: 'Acción (1/descanso largo): invocas espíritus en un cubo de 30 pies que curan hasta 100 PG repartidos, reparan objetos y disipan conjuros de nivel 6 o menor.',
        });
      }
    }

    // 8. Hechicería Lunar (Lunar Sorcery)
    if (subLower.includes('lunar') || subLower.includes('moon')) {
      result.push({
        id: 'res-conjuro-lunar-gratis',
        name: 'Conjuro Lunar Gratuito (Lunar Embodiment)',
        current: findExistingCurrent('res-conjuro-lunar-gratis', 1),
        max: 1,
        resetOn: 'long',
        description: 'Lanzas el conjuro de 1.er nivel de tu fase lunar activa 1 vez por descanso largo sin gastar ranura de conjuro. Fuego Lunar: Llama Sagrada puede afectar a dos criaturas a 5 pies.',
      });
      if (level >= 6) {
        result.push({
          id: 'res-dones-lunares',
          name: 'Dones Lunares (Lunar Boons)',
          current: findExistingCurrent('res-dones-lunares', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Descuento de 1 punto de hechicería en Metamagia usada con conjuros de la escuela de tu fase lunar activa (${profBonus} usos por descanso largo); cambiar fase cuesta 1 punto.`,
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-empoderamiento-lunar',
          name: 'Empoderamiento Lunar (Lunar Empowerment)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Beneficios según fase lunar activa: ventaja en Percepción e Investigación (Llena), ventaja en Sigilo (Nueva), o resistencia a daño radiante y necrótico (Creciente).',
        });
      }
      if (level >= 18) {
        result.push({
          id: 'res-fenomeno-lunar',
          name: 'Fenómeno Lunar (Lunar Phenomenon)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional para desatar el poder culminante de tu luna activa (aura de ceguera/curación en Llena, teletransporte e invisibilidad en Nueva, resistencia universal en Creciente).',
        });
      }
    }
  }

  // DRUIDA
  else if (cLower.includes('druida') || cLower.includes('druid')) {
    const wisMod = getAbilityModifier(stats.wis || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();
    const isMoon = subLower.includes('luna') || subLower.includes('moon');

    // 1. Forma Salvaje (Nivel 2+)
    if (level >= 2) {
      const maxWildShape = getDruidWildShapeMaxUses(level);
      const durationHours = getDruidWildShapeDurationHours(level);
      const limits = getDruidWildShapeLimits(level, isMoon);
      const swimStr = limits.canSwim ? 'nado permitido' : 'sin nado';
      const flyStr = limits.canFly ? 'vuelo permitido' : 'sin vuelo';
      const elemStr = limits.canElemental ? ' • Forma Elemental de VD 5 disponible (2 usos)' : '';

      result.push({
        id: 'res-forma-salvaje',
        name: level >= 20 ? 'Forma Salvaje (Archidruida Ilimitada)' : 'Forma Salvaje (Wild Shape)',
        current: findExistingCurrent('res-forma-salvaje', maxWildShape),
        max: maxWildShape,
        resetOn: 'short',
        description: `Transfórmate durante ${durationHours}h en bestias de hasta ${limits.maxCr} (${swimStr}, ${flyStr})${elemStr}. Puedes gastar 1 uso para invocar un Compañero Salvaje (Tasha).`,
      });
    }

    // 2. Círculo de la Tierra: Recuperación Natural (Nivel 2+)
    if (subLower.includes('tierra') || subLower.includes('land')) {
      if (level >= 2) {
        const maxSlotsRecov = Math.ceil(level / 2);
        result.push({
          id: 'res-recuperacion-natural',
          name: 'Recuperación Natural (Natural Recovery)',
          current: findExistingCurrent('res-recuperacion-natural', 1),
          max: 1,
          resetOn: 'long',
          description: `(1/descanso largo durante descanso corto): Recupera ranuras de conjuro gastadas cuya suma total de niveles sea de hasta ${maxSlotsRecov} (ninguna de nivel 6+).`,
        });
      }
    }

    // 3. Círculo de las Esporas: Entidad Simbiótica (Nv 2) e Infestación Fúngica (Nv 6)
    if (subLower.includes('esporas') || subLower.includes('spores')) {
      if (level >= 2) {
        const tempHp = level * 4;
        const haloDice = level >= 14 ? '1d10' : level >= 10 ? '1d8' : level >= 6 ? '1d6' : '1d4';
        result.push({
          id: 'res-entidad-simbiotica',
          name: 'Entidad Simbiótica (Symbiotic Entity)',
          current: findExistingCurrent('res-entidad-simbiotica', 1),
          max: 1,
          resetOn: 'short',
          description: `Acción (gasta 1 uso de Forma Salvaje): Obtienes ${tempHp} PG temporales, duplicas el daño de Halo de Esporas (${haloDice}) y tus armas cuerpo a cuerpo causan +1d6 daño necrótico.`,
        });
      }
      if (level >= 6) {
        const maxFungal = Math.max(1, wisMod);
        result.push({
          id: 'res-infestacion-fungica',
          name: 'Infestación Fúngica (Fungal Infestation)',
          current: findExistingCurrent('res-infestacion-fungica', maxFungal),
          max: maxFungal,
          resetOn: 'long',
          description: `Reacción (${maxFungal}/descanso largo): Cuando una bestia o humanoide muera a 20 pies, anímalo como un Zombi con 1 PG que actúa en tu iniciativa durante 1 hora.`,
        });
      }
    }

    // 4. Círculo de las Estrellas: Mapa Estelar (Nv 2) y Presagio Cósmico (Nv 6)
    if (subLower.includes('estrellas') || subLower.includes('stars')) {
      if (level >= 2) {
        result.push({
          id: 'res-mapa-estelar',
          name: 'Mapa Estelar - Rayo Guía (Star Map)',
          current: findExistingCurrent('res-mapa-estelar', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Lanza Rayo Guía (Guiding Bolt) sin gastar ranuras (${profBonus}/descanso largo).`,
        });
      }
      if (level >= 6) {
        result.push({
          id: 'res-presagio-cosmico',
          name: 'Presagio Cósmico (Cosmic Omen)',
          current: findExistingCurrent('res-presagio-cosmico', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Reacción (${profBonus}/descanso largo tras descanso largo): Fortuna (+1d6 a tirada aliada) o Desdicha (-1d6 a tirada enemiga a 30 pies).`,
        });
      }
    }

    // 5. Círculo del Pastor: Tótem Espiritual (Nivel 2+)
    if (subLower.includes('pastor') || subLower.includes('shepherd')) {
      if (level >= 2) {
        result.push({
          id: 'res-totem-espiritual',
          name: 'Tótem Espiritual (Spirit Totem)',
          current: findExistingCurrent('res-totem-espiritual', 1),
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional (1/descanso corto o largo): Invoca espíritu incorpóreo a 60 pies con aura de 30 pies durante 1 min (Oso: 5+Nv PG temp; Halcón: reacción ventaja; Unicornio: cura Nv PG a aliados al curar).',
        });
      }
    }

    // 6. Círculo de los Sueños: Bálsamo del Bosque de Verano y Senderos Ocultos
    if (subLower.includes('suenos') || subLower.includes('sueños') || subLower.includes('dreams')) {
      if (level >= 2) {
        result.push({
          id: 'res-balsamo-verano',
          name: 'Bálsamo del Bosque de Verano (Balm of the Summer Court)',
          current: findExistingCurrent('res-balsamo-verano', level),
          max: level,
          diceType: 'd6',
          resetOn: 'long',
          description: `Acción adicional: Gasta hasta ${Math.max(1, Math.floor(level / 2))}d6 para curar a una criatura a 120 pies (otorga 1 PG temporal por dado gastado).`,
        });
      }
      if (level >= 10) {
        const maxPaths = Math.max(1, wisMod);
        result.push({
          id: 'res-senderos-ocultos',
          name: 'Senderos Ocultos (Hidden Paths)',
          current: findExistingCurrent('res-senderos-ocultos', maxPaths),
          max: maxPaths,
          resetOn: 'long',
          description: `Acción adicional (${maxPaths}/descanso largo): Te teletransportas hasta 60 pies o teletransportas a un aliado voluntario tocado hasta 30 pies.`,
        });
      }
    }

    // 7. Círculo del Fuego Salvaje: Fuego Cauterizador (Nivel 10+)
    if (subLower.includes('fuego') || subLower.includes('wildfire')) {
      if (level >= 10) {
        const maxCauter = Math.max(1, wisMod);
        result.push({
          id: 'res-fuego-cauterizador',
          name: 'Fuego Cauterizador (Cauterizing Flames)',
          current: findExistingCurrent('res-fuego-cauterizador', maxCauter),
          max: maxCauter,
          resetOn: 'long',
          description: `Reacción (${maxCauter}/descanso largo): Extingue llama espectral a 30 pies para curar o causar 2d10 + Sabiduría de daño de fuego a criatura adyacente.`,
        });
      }
    }
  }

  // CLÉRIGO
  else if (cLower.includes('clérigo') || cLower.includes('clerigo') || cLower.includes('cleric')) {
    const wisMod = getAbilityModifier(stats.wis || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Canalizar Divinidad (Nivel 2+)
    if (level >= 2) {
      const maxDivinity = getClericChannelDivinityUses(level);
      const destroyCr = getClericDestroyUndeadCr(level);
      const destroyDesc = destroyCr ? ` Destruir Muertos Vivientes: destruye automáticamente a criaturas no muertas de ${destroyCr}.` : '';
      result.push({
        id: 'res-canalizar-divinidad',
        name: 'Canalizar Divinidad',
        current: findExistingCurrent('res-canalizar-divinidad', maxDivinity),
        max: maxDivinity,
        resetOn: 'short',
        description: `Expulsar muertos vivientes (CD 8 + PB + Sab).${destroyDesc} Opciones de Dominio y Arnés de Poder Divino (Tasha: recuperar ranura gastada).`,
      });
    }

    // 2. Intervención Divina (Nivel 10+)
    if (level >= 10) {
      result.push({
        id: 'res-intervencion-divina',
        name: 'Intervención Divina',
        current: findExistingCurrent('res-intervencion-divina', 1),
        max: 1,
        resetOn: 'long',
        description: level >= 20
          ? 'Acción (1/7 días): Tu deidad interviene automáticamente con el efecto de cualquier conjuro de clérigo o milagro divino sin necesidad de tirada de dados.'
          : `Acción (1/7 días si éxito, 1/descanso largo si falla): Tira 1d100. Si obtienes ${level} o menos, tu deidad interviene en tu auxilio con el efecto de cualquier conjuro divino.`,
      });
    }

    // 3. Recursos de Dominio Divino
    // Guerra: Sacerdote de Guerra (Ataque con arma como acción adicional)
    if (subLower.includes('guerra') || subLower.includes('war')) {
      const maxWar = Math.max(1, wisMod);
      result.push({
        id: 'res-sacerdote-guerra',
        name: 'Sacerdote de Guerra (War Priest)',
        current: findExistingCurrent('res-sacerdote-guerra', maxWar),
        max: maxWar,
        resetOn: 'long',
        description: `Acción adicional (${maxWar}/descanso largo): Al usar la acción de Atacar, puedes realizar un ataque adicional con arma como acción adicional.`,
      });
    }

    // Luz: Llamarada Protectora
    if (subLower.includes('luz') || subLower.includes('light')) {
      const maxFlare = Math.max(1, wisMod);
      result.push({
        id: 'res-llamarada-protectora',
        name: 'Llamarada Protectora (Warding Flare)',
        current: findExistingCurrent('res-llamarada-protectora', maxFlare),
        max: maxFlare,
        resetOn: 'long',
        description: `Reacción (${maxFlare}/descanso largo): Impones desventaja en la tirada de ataque a una criatura atacante a 30 pies que puedas ver.`,
      });
    }

    // Tempestad: Ira de la Tormenta
    if (subLower.includes('tempestad') || subLower.includes('tempest')) {
      const maxStorm = Math.max(1, wisMod);
      result.push({
        id: 'res-ira-tormenta',
        name: 'Ira de la Tormenta (Wrath of the Storm)',
        current: findExistingCurrent('res-ira-tormenta', maxStorm),
        max: maxStorm,
        resetOn: 'long',
        description: `Reacción (${maxStorm}/descanso largo): Cuando una criatura a 5 pies te impacte, causa 2d8 de daño de trueno o relámpago (salvación de Destreza para mitad).`,
      });
    }

    // Forja: Bendición de la Forja
    if (subLower.includes('forja') || subLower.includes('forge')) {
      result.push({
        id: 'res-bendicion-forja',
        name: 'Bendición de la Forja (Blessing of the Forge)',
        current: findExistingCurrent('res-bendicion-forja', 1),
        max: 1,
        resetOn: 'long',
        description: 'Al finalizar un descanso largo, imbuye magia en un arma o armadura no mágica (+1 a tiradas de ataque/daño o +1 a CA) hasta tu siguiente descanso largo.',
      });
    }

    // Tumba: Ojos de la Tumba (Nv 1) y Centinela en la Puerta de la Muerte (Nv 6)
    if (subLower.includes('tumba') || subLower.includes('grave')) {
      const maxGrave = Math.max(1, wisMod);
      result.push({
        id: 'res-ojos-tumba',
        name: 'Ojos de la Tumba (Eyes of the Grave)',
        current: findExistingCurrent('res-ojos-tumba', maxGrave),
        max: maxGrave,
        resetOn: 'long',
        description: `Acción (${maxGrave}/descanso largo): Percibes la ubicación de cualquier no muerto a 60 pies que no esté tras cobertura total o protegido contra adivinación.`,
      });
      if (level >= 6) {
        result.push({
          id: 'res-centinela-muerte',
          name: 'Centinela de la Muerte (Sentinel at Death\'s Door)',
          current: findExistingCurrent('res-centinela-muerte', maxGrave),
          max: maxGrave,
          resetOn: 'long',
          description: `Reacción (${maxGrave}/descanso largo): Cuando tú o un aliado a 30 pies sufran un impacto crítico, conviertes el crítico en un golpe normal cancelando el daño extra.`,
        });
      }
    }

    // Paz: Vínculo Emancipador
    if (subLower.includes('paz') || subLower.includes('peace')) {
      result.push({
        id: 'res-vinculo-emancipador',
        name: 'Vínculo Emancipador (Emboldening Bond)',
        current: findExistingCurrent('res-vinculo-emancipador', profBonus),
        max: profBonus,
        resetOn: 'long',
        description: `Acción (${profBonus}/descanso largo): Durante 10 minutos vinculas criaturas a 30 pies; una vez por turno, pueden sumar 1d4 a un ataque, prueba o salvación si están a 30 pies entre sí.`,
      });
    }

    // Crepúsculo: Ojos de la Noche (Nv 1) y Pasos del Crepúsculo (Nv 6)
    if (subLower.includes('crepusculo') || subLower.includes('crepúsculo') || subLower.includes('twilight')) {
      result.push({
        id: 'res-ojos-noche',
        name: 'Ojos de la Noche (Eyes of Night)',
        current: findExistingCurrent('res-ojos-noche', 1),
        max: 1,
        resetOn: 'long',
        description: 'Acción (1/descanso largo o ranura): Otorga tu visión en la oscuridad de 300 pies a hasta Sabiduría criaturas voluntarias durante 1 hora.',
      });
      if (level >= 6) {
        result.push({
          id: 'res-pasos-crepusculo',
          name: 'Pasos del Crepúsculo (Steps of Night)',
          current: findExistingCurrent('res-pasos-crepusculo', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Acción adicional (${profBonus}/descanso largo): En penumbra u oscuridad, obtienes velocidad de vuelo igual a tu velocidad a pie durante 1 minuto.`,
        });
      }
    }

    // Orden: Embeleso de la Ley (Nv 6)
    if (subLower.includes('orden') || subLower.includes('order')) {
      if (level >= 6) {
        const maxOrder = Math.max(1, wisMod);
        result.push({
          id: 'res-embeleso-ley',
          name: 'Embeleso de la Ley (Embodiment of the Law)',
          current: findExistingCurrent('res-embeleso-ley', maxOrder),
          max: maxOrder,
          resetOn: 'long',
          description: `(${maxOrder}/descanso largo): Lanza cualquier conjuro de Encantamiento de nivel 1+ cuya duración sea 1 acción como acción adicional en su lugar.`,
        });
      }
    }

    // Conocimiento: Visiones del Pasado (Nv 17)
    if (subLower.includes('conocimiento') || subLower.includes('knowledge')) {
      if (level >= 17) {
        result.push({
          id: 'res-visiones-pasado',
          name: 'Visiones del Pasado (Visions of the Past)',
          current: findExistingCurrent('res-visiones-pasado', 1),
          max: 1,
          resetOn: 'short',
          description: 'Medita durante 1 minuto (1/descanso corto o largo): Lee la historia reciente de un objeto sostenido o área a 60 pies en los últimos días.',
        });
      }
    }
  }

  // PÍCARO
  else if (cLower.includes('pícaro') || cLower.includes('picaro') || cLower.includes('rogue')) {
    const sneakCount = Math.ceil(level / 2);
    const sneakDice = `${sneakCount}d6`;
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Ataque Furtivo
    const currentSneak = existingResources?.find((r) => r.id === 'res-furtivo' || r.id === 'res-ataque-furtivo')?.current ?? 1;
    result.push({
      id: 'res-furtivo',
      name: `Ataque Furtivo (${sneakDice})`,
      current: currentSneak,
      max: 1,
      resetOn: 'short',
      diceType: sneakDice,
      description: `Una vez por turno infliges +${sneakDice} de daño adicional a criaturas con arma sutil o a distancia si tienes ventaja o un aliado a 5 pies.`,
    });

    // 2. Golpe de Suerte (Stroke of Luck - Nivel 20)
    if (level >= 20) {
      result.push({
        id: 'res-golpe-suerte',
        name: 'Golpe de Suerte (Stroke of Luck)',
        current: findExistingCurrent('res-golpe-suerte', 1),
        max: 1,
        resetOn: 'short',
        description: 'Si fallas un ataque a tu alcance, puedes convertir el fallo en impacto; o en una prueba de habilidad, tratar el d20 como un 20 (1 uso por descanso corto o largo).',
      });
    }

    // 3. Subclases de Pícaro
    // 3.1 Fantasma (Phantom)
    if (subLower.includes('fantasma') || subLower.includes('phantom')) {
      if (level >= 3) {
        result.push({
          id: 'res-lamentos-tumba',
          name: 'Lamentos de la Tumba (Wails from the Grave)',
          current: findExistingCurrent('res-lamentos-tumba', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Inmediatamente tras un Ataque Furtivo, una segunda criatura a 30 pies sufre ${Math.ceil(sneakCount / 2)}d6 de daño necrótico (${profBonus} usos por descanso largo).`,
        });
      }
      if (level >= 9) {
        result.push({
          id: 'res-fichas-alma',
          name: 'Fichas de Alma (Tokens of the Departed)',
          current: findExistingCurrent('res-fichas-alma', 0),
          max: profBonus,
          resetOn: 'long',
          description: `Almas capturadas como baratijas tras morir una criatura a 30 pies (máx ${profBonus}). Te otorgan ventaja en salvaciones de Constitución y salvaciones de muerte. Puedes destruir una ficha para activar Lamentos de la Tumba sin gastar usos.`,
        });
      }
    }

    // 3.2 Cuchillo del Alma (Soulknife)
    if (subLower.includes('cuchillo') || subLower.includes('soulknife')) {
      if (level >= 3) {
        const psiDie = level >= 13 ? 'd12' : level >= 9 ? 'd10' : level >= 5 ? 'd8' : 'd6';
        const psiCount = profBonus * 2;
        result.push({
          id: 'res-dados-psionicos',
          name: `Dados de Energía Psiónica (${psiDie})`,
          current: findExistingCurrent('res-dados-psionicos', psiCount),
          max: psiCount,
          resetOn: 'long',
          diceType: psiDie,
          description: `Tienes ${psiCount} dados de energía psiónica (${psiDie}). Úsalos para Truco Psiónico, Vínculo Telepático, Hojas del Alma y Velo Psíquico. Recuperas todos en descanso largo.`,
        });
        result.push({
          id: 'res-recuperacion-psionica',
          name: 'Recuperación Psiónica (Acción Adicional)',
          current: findExistingCurrent('res-recuperacion-psionica', 1),
          max: 1,
          resetOn: 'short',
          description: 'Como acción adicional recuperas 1 dado de energía psiónica gastado (1 uso por descanso corto o largo).',
        });
      }
      if (level >= 13) {
        result.push({
          id: 'res-velo-psiquico',
          name: 'Velo Psíquico (Invisibilidad)',
          current: findExistingCurrent('res-velo-psiquico', 1),
          max: 1,
          resetOn: 'long',
          description: 'Te vuelves invisible mágicamente hasta 1 hora (1 uso gratuito por descanso largo o gastando 1 dado psiónico).',
        });
      }
    }

    // 3.3 Espadachín (Swashbuckler)
    if (subLower.includes('espadachin') || subLower.includes('espadachín') || subLower.includes('swashbuckler')) {
      if (level >= 17) {
        result.push({
          id: 'res-maestro-duelista',
          name: 'Maestro Duelista (Master Duelist)',
          current: findExistingCurrent('res-maestro-duelista', 1),
          max: 1,
          resetOn: 'short',
          description: 'Si fallas una tirada de ataque en tu turno, puedes volver a tirar la tirada con ventaja (1 uso por descanso corto o largo).',
        });
      }
    }

    // 3.4 Inquisitivo (Inquisitive)
    if (subLower.includes('inquisitivo') || subLower.includes('inquisitive')) {
      if (level >= 13) {
        const wisMod = Math.max(1, getAbilityModifier(stats.wis || 10));
        result.push({
          id: 'res-ojo-infalible',
          name: 'Ojo Infalible (Unerring Eye)',
          current: findExistingCurrent('res-ojo-infalible', wisMod),
          max: wisMod,
          resetOn: 'long',
          description: `Como acción percibes la presencia de ilusiones mágicas o metamorfos a 30 pies (${wisMod} usos por descanso largo).`,
        });
      }
    }
  }

  // BRUJO (WARLOCK)
  else if (cLower.includes('brujo') || cLower.includes('warlock')) {
    const slotsCount = level >= 17 ? 4 : level >= 11 ? 3 : level >= 2 ? 2 : 1;
    const slotLevel = level >= 9 ? 5 : level >= 7 ? 4 : level >= 5 ? 3 : level >= 3 ? 2 : 1;
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Ranuras de Magia del Pacto
    const currentSlots = existingResources?.find((r) => r.id === 'res-slots-pacto' || r.id === 'res-pact-slots')?.current ?? slotsCount;
    result.push({
      id: 'res-slots-pacto',
      name: `Ranuras de Pacto (Nivel ${slotLevel})`,
      current: currentSlots,
      max: slotsCount,
      resetOn: 'short',
      description: `Tienes ${slotsCount} ranura(s) de pacto de nivel ${slotLevel}. Todas tus ranuras se recargan por completo en cada descanso corto o largo.`,
    });

    // 2. Arcano Místico (Mystic Arcanum)
    if (level >= 11) {
      result.push({
        id: 'res-arcano-mistico-6',
        name: 'Arcano Místico (Nivel 6)',
        current: findExistingCurrent('res-arcano-mistico-6', 1),
        max: 1,
        resetOn: 'long',
        description: 'Lanzas tu conjuro de 6.º nivel elegido una vez por descanso largo sin gastar ranura de pacto.',
      });
    }
    if (level >= 13) {
      result.push({
        id: 'res-arcano-mistico-7',
        name: 'Arcano Místico (Nivel 7)',
        current: findExistingCurrent('res-arcano-mistico-7', 1),
        max: 1,
        resetOn: 'long',
        description: 'Lanzas tu conjuro de 7.º nivel elegido una vez por descanso largo sin gastar ranura de pacto.',
      });
    }
    if (level >= 15) {
      result.push({
        id: 'res-arcano-mistico-8',
        name: 'Arcano Místico (Nivel 8)',
        current: findExistingCurrent('res-arcano-mistico-8', 1),
        max: 1,
        resetOn: 'long',
        description: 'Lanzas tu conjuro de 8.º nivel elegido una vez por descanso largo sin gastar ranura de pacto.',
      });
    }
    if (level >= 17) {
      result.push({
        id: 'res-arcano-mistico-9',
        name: 'Arcano Místico (Nivel 9)',
        current: findExistingCurrent('res-arcano-mistico-9', 1),
        max: 1,
        resetOn: 'long',
        description: 'Lanzas tu conjuro supremo de 9.º nivel elegido una vez por descanso largo sin gastar ranura de pacto.',
      });
    }

    // 3. Cúspide: Aptitud Sobrenatural (Eldritch Master - Nivel 20)
    if (level >= 20) {
      result.push({
        id: 'res-aptitud-sobrenatural',
        name: 'Aptitud Sobrenatural (Eldritch Master)',
        current: findExistingCurrent('res-aptitud-sobrenatural', 1),
        max: 1,
        resetOn: 'long',
        description: 'Canalizas a tu patrón durante 1 minuto para recuperar de inmediato todas tus ranuras de pacto gastadas (1 uso por descanso largo).',
      });
    }

    // 4. Subclases de Brujo
    // 4.1 El Infernal (The Fiend)
    if (subLower.includes('infernal') || subLower.includes('fiend')) {
      if (level >= 6) {
        result.push({
          id: 'res-suerte-oscuro',
          name: "Suerte del Propio Oscuro (Dark One's Own Luck)",
          current: findExistingCurrent('res-suerte-oscuro', 1),
          max: 1,
          resetOn: 'short',
          description: 'Sumas 1d10 a una prueba de característica o tirada de salvación tuya (1 uso por descanso corto o largo).',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-lanzar-infierno',
          name: 'Lanzar por el Infierno (Hurl Through Hell)',
          current: findExistingCurrent('res-lanzar-infierno', 1),
          max: 1,
          resetOn: 'long',
          description: 'Al golpear a una criatura, la transportas por los planos inferiores causándole 10d10 de daño psíquico (1 uso por descanso largo).',
        });
      }
    }

    // 4.2 Filo Celestial / Maldito (Hexblade)
    if (subLower.includes('hexblade') || subLower.includes('filo')) {
      result.push({
        id: 'res-maldicion-hexblade',
        name: "Maldición del Hexblade (Hexblade's Curse)",
        current: findExistingCurrent('res-maldicion-hexblade', 1),
        max: 1,
        resetOn: 'short',
        description: `Acción adicional: maldices a un objetivo a 30 pies por 1 minuto. Crítico con 19-20, daño adicional +${profBonus} y te curas ${level + chaMod} PG al morir (1 uso por descanso corto o largo).`,
      });
      if (level >= 6) {
        result.push({
          id: 'res-espectro-maldito',
          name: 'Espectro Maldito (Accursed Specter)',
          current: findExistingCurrent('res-espectro-maldito', 1),
          max: 1,
          resetOn: 'long',
          description: 'Al matar a un humanoide alzas su alma como un espectro leal que combate a tu lado hasta tu próximo descanso largo (1 uso por descanso largo).',
        });
      }
    }

    // 4.3 El Archifata (The Archfey)
    if (subLower.includes('archifata') || subLower.includes('fey')) {
      result.push({
        id: 'res-presencia-feerica',
        name: 'Presencia Feérica (Fey Presence)',
        current: findExistingCurrent('res-presencia-feerica', 1),
        max: 1,
        resetOn: 'short',
        description: 'Acción: cubo de 10 pies, salvación Sabiduría o quedan encantados/asustados hasta el final de tu siguiente turno (1 uso por descanso corto o largo).',
      });
      if (level >= 6) {
        result.push({
          id: 'res-escape-brumoso',
          name: 'Escape Brumoso (Misty Escape)',
          current: findExistingCurrent('res-escape-brumoso', 1),
          max: 1,
          resetOn: 'short',
          description: 'Reacción al recibir daño: te teletransportas hasta 60 pies y te vuelves invisible hasta tu próximo turno (1 uso por descanso corto o largo).',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-delirio-sombrio',
          name: 'Delirio Sombrío (Dark Delirium)',
          current: findExistingCurrent('res-delirio-sombrio', 1),
          max: 1,
          resetOn: 'short',
          description: 'Acción: sumes a una criatura a 60 pies en un reino de pesadilla por 1 minuto (1 uso por descanso corto o largo).',
        });
      }
    }

    // 4.4 El Gran Antiguo (The Great Old One)
    if (subLower.includes('gran antiguo') || subLower.includes('gran-antiguo') || subLower.includes('great old one')) {
      if (level >= 6) {
        result.push({
          id: 'res-escudo-entropico',
          name: 'Escudo Entrópico (Entropic Ward)',
          current: findExistingCurrent('res-escudo-entropico', 1),
          max: 1,
          resetOn: 'short',
          description: 'Reacción: impones desventaja en un ataque contra ti. Si falla, tu próximo ataque contra el objetivo tiene ventaja (1 uso por descanso corto o largo).',
        });
      }
    }

    // 4.5 El Celestial (The Celestial)
    if (subLower.includes('celestial')) {
      const maxDice = level + 1;
      result.push({
        id: 'res-luz-sanadora',
        name: 'Luz Sanadora (Healing Light)',
        current: findExistingCurrent('res-luz-sanadora', maxDice),
        max: maxDice,
        resetOn: 'long',
        diceType: 'd6',
        description: `Reserva de ${maxDice} dados d6 para curar a criaturas a 60 pies como acción adicional (máx ${Math.max(1, chaMod)} dados por tirada).`,
      });
      if (level >= 14) {
        result.push({
          id: 'res-venganza-abrasadora',
          name: 'Venganza Abrasadora (Searing Vengeance)',
          current: findExistingCurrent('res-venganza-abrasadora', 1),
          max: 1,
          resetOn: 'long',
          description: 'Al hacer salvación de muerte te levantas con la mitad de tus PG máximos causando 2d8 + Car daño radiante y cegando a enemigos a 30 pies (1 uso por descanso largo).',
        });
      }
    }

    // 4.6 El Genio (The Genie)
    if (subLower.includes('genio') || subLower.includes('genie')) {
      result.push({
        id: 'res-vasija-genio',
        name: "Vasija del Genio (Genie's Vessel)",
        current: findExistingCurrent('res-vasija-genio', 1),
        max: 1,
        resetOn: 'long',
        description: 'Entras en tu vasija mágica como refugio extradimensional (1 uso por descanso largo). Daño extra igual a tu competencia (+PB) al golpear una vez por turno.',
      });
      if (level >= 6) {
        result.push({
          id: 'res-vuelo-genio',
          name: 'Regalo Elemental (Vuelo de Genio)',
          current: findExistingCurrent('res-vuelo-genio', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Acción adicional: ganas velocidad de vuelo de 30 pies durante 10 minutos (${profBonus} usos por descanso largo).`,
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-deseo-limitado',
          name: 'Deseo Limitado (Limited Wish)',
          current: findExistingCurrent('res-deseo-limitado', 1),
          max: 1,
          resetOn: 'long',
          description: 'Pides un deseo a tu patrón duplicando cualquier conjuro de nivel 6 o menor de cualquier clase (1 uso por descanso largo).',
        });
      }
    }

    // 4.7 El No Muerto (The Undead)
    if (subLower.includes('no-muerto') || subLower.includes('no muerto') || subLower.includes('undead')) {
      result.push({
        id: 'res-forma-pavor',
        name: 'Forma de Pavor (Form of Dread)',
        current: findExistingCurrent('res-forma-pavor', profBonus),
        max: profBonus,
        resetOn: 'long',
        description: `Acción adicional: presencia cadavérica por 1 minuto. Ganas 1d10 + ${level} PG temporales, inmunidad a asustado y puedes asustar al golpear (${profBonus} usos por descanso largo).`,
      });
    }

    // 4.8 El Insondable (The Fathomless)
    if (subLower.includes('insondable') || subLower.includes('fathomless')) {
      result.push({
        id: 'res-tentaculo-profundidades',
        name: 'Tentáculo de las Profundidades (Tentacle of the Deeps)',
        current: findExistingCurrent('res-tentaculo-profundidades', profBonus),
        max: profBonus,
        resetOn: 'long',
        description: `Acción adicional: invocas un tentáculo de agua a 60 pies por 1 minuto. Ataca por 1d8 frío y reduce velocidad en 10 pies (${profBonus} usos por descanso largo).`,
      });
    }

    // 4.9 El Imperecedero (The Undying)
    if (subLower.includes('imperecedero') || subLower.includes('undying')) {
      if (level >= 6) {
        result.push({
          id: 'res-desafiar-muerte',
          name: 'Desafiar a la Muerte (Defy Death)',
          current: findExistingCurrent('res-desafiar-muerte', 1),
          max: 1,
          resetOn: 'long',
          description: 'Recuperas 1d8 + Con PG al tener éxito en salvación de muerte o estabilizar con Piedad con los Moribundos (1 uso por descanso largo).',
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-vida-indestructible',
          name: 'Vida Indestructible (Indestructible Life)',
          current: findExistingCurrent('res-vida-indestructible', 1),
          max: 1,
          resetOn: 'short',
          description: `Acción adicional: recuperas 1d8 + ${level} PG y unes extremidades cercenadas (1 uso por descanso corto o largo).`,
        });
      }
    }
  }

  // MAGO (WIZARD)
  else if (cLower.includes('mago') || cLower.includes('wizard')) {
    const intMod = getAbilityModifier(stats.int || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Recuperación Arcana (Nivel 1+)
    const maxRecovery = Math.ceil(level / 2);
    result.push({
      id: 'res-recuperacion-arcana',
      name: 'Recuperación Arcana',
      current: findExistingCurrent('res-recuperacion-arcana', 1),
      max: 1,
      resetOn: 'long',
      description: `Una vez al día tras descanso corto, recuperas ranuras de conjuro gastadas con un nivel combinado de hasta ${maxRecovery} (ninguna de Nivel 6+).`,
    });

    // 2. Dominio de Conjuros (Spell Mastery - Nivel 18+)
    if (level >= 18) {
      result.push({
        id: 'res-dominio-conjuros',
        name: 'Dominio de Conjuros (Spell Mastery)',
        current: findExistingCurrent('res-dominio-conjuros', 2),
        max: 2,
        resetOn: 'long',
        description: 'Lanzas a voluntad sin gastar ranura 1 conjuro de 1.er nivel y 1 de 2.º nivel elegidos de tu libro de conjuros.',
      });
    }

    // 3. Conjuros Insignia (Signature Spells - Nivel 20)
    if (level >= 20) {
      result.push({
        id: 'res-conjuros-insignia',
        name: 'Conjuros Insignia (Signature Spells)',
        current: findExistingCurrent('res-conjuros-insignia', 2),
        max: 2,
        resetOn: 'short',
        description: 'Dos conjuros de 3.er nivel siempre preparados. Puedes lanzar cada uno una vez a 3.er nivel sin gastar ranura por descanso corto o largo.',
      });
    }

    // --- RECURSOS POR TRADICIÓN ARCANA (SUBCLASES) ---

    // 4.1 Abjuración (Arcane Ward)
    const isAbjuration = subLower.includes('abjurac') || subLower.includes('abjur');
    if (isAbjuration && level >= 2) {
      const wardHp = (2 * level) + Math.max(0, intMod);
      result.push({
        id: 'res-guarda-arcana',
        name: 'Guarda Arcana (Arcane Ward)',
        current: findExistingCurrent('res-guarda-arcana', wardHp),
        max: wardHp,
        resetOn: 'long',
        description: `Barrera de ${wardHp} PG que absorbe daño entrante antes de tus PG. Al lanzar un conjuro de abjuración de nivel 1+, la guarda recupera el doble del nivel de la ranura gastada en PG.`,
      });
    }

    // 4.2 Canto de la Hoja / Bladesinging (Bladesong)
    const isBladesinging = subLower.includes('canto') || subLower.includes('hoja') || subLower.includes('bladesing');
    if (isBladesinging && level >= 2) {
      const bladesongUses = profBonus; // Tasha's rule: PB uses per long rest
      result.push({
        id: 'res-canto-hoja',
        name: 'Canto de la Hoja (Bladesong)',
        current: findExistingCurrent('res-canto-hoja', bladesongUses),
        max: bladesongUses,
        resetOn: 'long',
        description: `Acción adicional (dura 1 min): +${intMod} a CA, velocidad +10 pies, ventaja en Acrobacias y +${intMod} a salvaciones de Constitución para concentración.`,
      });
    }

    // 4.3 Adivinación (Portent / Presagio + El Tercer Ojo)
    const isDivination = subLower.includes('adivin') || subLower.includes('divin');
    if (isDivination && level >= 2) {
      const portentDice = level >= 14 ? 3 : 2;
      result.push({
        id: 'res-presagio',
        name: level >= 14 ? 'Presagio Mayor (3d20 Portent)' : 'Presagio (2d20 Portent)',
        current: findExistingCurrent('res-presagio', portentDice),
        max: portentDice,
        resetOn: 'long',
        description: `Tiras ${portentDice} dados d20 tras un descanso largo. Puedes sustituir cualquier tirada de ataque, salvación o prueba de característica tuya o de una criatura visible por uno de esos valores anotados.`,
      });
      if (level >= 10) {
        result.push({
          id: 'res-tercer-ojo',
          name: 'El Tercer Ojo (The Third Eye)',
          current: findExistingCurrent('res-tercer-ojo', 1),
          max: 1,
          resetOn: 'short',
          description: 'Acción: Visión en la Oscuridad (60 pies), Visión Etérea (60 pies), Leer Cualquier Idioma, o Ver Invisibilidad (10 pies) hasta descansar.',
        });
      }
    }

    // 4.4 Magia de Guerra (War Magic - Power Surge)
    const isWarMagic = subLower.includes('guerra') || subLower.includes('war');
    if (isWarMagic && level >= 6) {
      const maxSurges = Math.max(1, intMod);
      const forceDmg = Math.floor(level / 2);
      result.push({
        id: 'res-oleada-poder',
        name: 'Oleada de Poder (Power Surge)',
        current: findExistingCurrent('res-oleada-poder', 1),
        max: maxSurges,
        resetOn: 'long',
        description: `Almacenas hasta ${maxSurges} oleadas. Al impactar con un conjuro, gasta 1 oleada para infligir +${forceDmg} de daño de fuerza. Obtienes +1 oleada cada vez que disipes o contrahechices con éxito.`,
      });
    }

    // 4.5 Cronurgia (Chronurgy Magic - Chronal Shift, Momentary Stasis, Arcane Abeyance)
    const isChronurgy = subLower.includes('cron') || subLower.includes('chron');
    if (isChronurgy && level >= 2) {
      result.push({
        id: 'res-cambio-cronal',
        name: 'Cambio Cronal (Chronal Shift)',
        current: findExistingCurrent('res-cambio-cronal', 2),
        max: 2,
        resetOn: 'long',
        description: 'Reacción: tras ver el resultado de una tirada de ataque, salvación o prueba a 30 pies, obligas a repetir el d20.',
      });
      if (level >= 6) {
        const stasisUses = Math.max(1, intMod);
        result.push({
          id: 'res-extasis-fugaz',
          name: 'Éxtasis Fugaz (Momentary Stasis)',
          current: findExistingCurrent('res-extasis-fugaz', stasisUses),
          max: stasisUses,
          resetOn: 'long',
          description: `Acción (${stasisUses} usos/descanso largo): Criatura Grande o menor a 60 pies salva Con o queda Incapacitada con velocidad 0 hasta el final de tu siguiente turno.`,
        });
      }
      if (level >= 10) {
        result.push({
          id: 'res-granulo-arcano',
          name: 'Gránulo Arcano (Arcane Abeyance)',
          current: findExistingCurrent('res-granulo-arcano', 1),
          max: 1,
          resetOn: 'short',
          description: 'Al lanzar un conjuro de nivel 4 o menor, puedes condensarlo en una cuenta por 1 hora para que cualquier criatura lo active como acción.',
        });
      }
    }

    // 4.6 Graviturgia (Graviturgy Magic - Violent Attraction, Event Horizon)
    const isGraviturgy = subLower.includes('gravit');
    if (isGraviturgy) {
      if (level >= 10) {
        const attractUses = Math.max(1, intMod);
        result.push({
          id: 'res-pozo-violento',
          name: 'Pozo Violento (Violent Attraction)',
          current: findExistingCurrent('res-pozo-violento', attractUses),
          max: attractUses,
          resetOn: 'long',
          description: `Reacción (${attractUses} usos/descanso largo): a 60 pies sumas +1d10 al daño de un impacto con arma o +2d10 al daño por caída de una criatura.`,
        });
      }
      if (level >= 14) {
        result.push({
          id: 'res-horizonte-sucesos',
          name: 'Horizonte de Sucesos (Event Horizon)',
          current: findExistingCurrent('res-horizonte-sucesos', 1),
          max: 1,
          resetOn: 'long',
          description: 'Acción (1 min): emites campo gravitatorio de 30 pies. Enemigos reciben 2d10 de fuerza y su velocidad es 0 si fallan salvación de Str.',
        });
      }
    }

    // 4.7 Conjuración (Benign Transposition)
    const isConjuration = subLower.includes('conjur');
    if (isConjuration && level >= 6) {
      result.push({
        id: 'res-traslacion-benigna',
        name: 'Traslación Benigna (Benign Transposition)',
        current: findExistingCurrent('res-traslacion-benigna', 1),
        max: 1,
        resetOn: 'long',
        description: 'Acción: te teletransportas hasta 30 pies o intercambias posición con un aliado voluntario. Se recarga en descanso largo o al lanzar un conjuro de conjuración de nivel 1+.',
      });
    }

    // 4.8 Evocación (Overchannel)
    const isEvocation = subLower.includes('evoc');
    if (isEvocation && level >= 14) {
      result.push({
        id: 'res-sobrecarga',
        name: 'Sobrecarga (Overchannel)',
        current: findExistingCurrent('res-sobrecarga', 1),
        max: 1,
        resetOn: 'long',
        description: 'Maximizas el daño de un conjuro de mago de nivel 1 a 5. El 1.er uso es gratuito; usos subsiguientes causan 2d12 de daño necrótico por nivel del conjuro.',
      });
    }

    // 4.9 Ilusión (Illusory Self)
    const isIllusion = subLower.includes('ilus') || subLower.includes('illus');
    if (isIllusion && level >= 10) {
      result.push({
        id: 'res-ser-ilusorio',
        name: 'Ser Ilusorio (Illusory Self)',
        current: findExistingCurrent('res-ser-ilusorio', 1),
        max: 1,
        resetOn: 'short',
        description: 'Reacción: creas un duplicado ilusorio instantáneo que hace fallar automáticamente un ataque que impactaría contra ti.',
      });
    }

    // 4.10 Transmutación (Transmuter\'s Stone & Shapechanger)
    const isTransmutation = subLower.includes('transmut');
    if (isTransmutation) {
      if (level >= 6) {
        result.push({
          id: 'res-piedra-transmutador',
          name: 'Piedra del Transmutador (Transmuter\'s Stone)',
          current: findExistingCurrent('res-piedra-transmutador', 1),
          max: 1,
          resetOn: 'long',
          description: 'Piedra mágica activa que otorga al portador: Visión en la Oscuridad (60 pies), +10 pies de movimiento, competencia en salvaciones de Con, o resistencia elemental.',
        });
      }
      if (level >= 10) {
        result.push({
          id: 'res-cambiaformas',
          name: 'Cambiaformas (Shapechanger)',
          current: findExistingCurrent('res-cambiaformas', 1),
          max: 1,
          resetOn: 'short',
          description: 'Lanzas Polimorfar sobre ti mismo sin gastar ranura de conjuro (bestia CR 1 o menor).',
        });
      }
    }

    // 4.11 Orden de los Escribas (Manifest Mind & Master Scrivener)
    const isScribes = subLower.includes('escrib') || subLower.includes('scrib');
    if (isScribes) {
      if (level >= 6) {
        result.push({
          id: 'res-manifiesto-mental',
          name: 'Manifiesto Mental (Manifest Mind)',
          current: findExistingCurrent('res-manifiesto-mental', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Proyectas el avatar sensorial flotante de tu libro de conjuros a 60 pies (${profBonus} usos/descanso largo). Puedes ver, oír y lanzar conjuros desde su espacio.`,
        });
      }
      if (level >= 10) {
        result.push({
          id: 'res-maestro-escriba',
          name: 'Maestro Escriba (Master Scrivener)',
          current: findExistingCurrent('res-maestro-escriba', 1),
          max: 1,
          resetOn: 'long',
          description: 'Al terminar descanso largo fabricas 1 pergamino mágico de nivel 1 o 2 que se activa a 1 nivel superior.',
        });
      }
    }

    // 4.12 Nigromancia (Comandar No Muertos)
    const isNecromancy = subLower.includes('nigro') || subLower.includes('necro');
    if (isNecromancy && level >= 14) {
      result.push({
        id: 'res-comandar-no-muertos',
        name: 'Comandar No Muertos (Command Undead)',
        current: findExistingCurrent('res-comandar-no-muertos', 1),
        max: 1,
        resetOn: 'long',
        description: 'Acción: fuerzas a un no muerto a 60 pies a superar salvación de Carisma contra tu CD de conjuros o caer bajo tu control permanente.',
      });
    }
  }

  // ARTÍFICE (ARTIFICER)
  else if (cLower.includes('artífice') || cLower.includes('artifice') || cLower.includes('artificer')) {
    const intMod = getAbilityModifier(stats.int || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Infusiones Activas (Nivel 2+)
    if (level >= 2) {
      const baseInfusions = level >= 18 ? 6 : level >= 14 ? 5 : level >= 10 ? 4 : level >= 6 ? 3 : 2;
      const isArmorerMod = (subLower.includes('armero') || subLower.includes('armorer')) && level >= 9;
      const maxInfusions = isArmorerMod ? baseInfusions + 2 : baseInfusions;
      result.push({
        id: 'res-infusiones',
        name: isArmorerMod ? 'Infusiones Activas (Armero +2)' : 'Infusiones Activas',
        current: findExistingCurrent('res-infusiones', maxInfusions),
        max: maxInfusions,
        resetOn: 'long',
        description: isArmorerMod
          ? `Mantienes hasta ${maxInfusions} objetos infundidos activos (${baseInfusions} estándar + 2 exclusivos en piezas de tu Armadura Arcana).`
          : `Cantidad de objetos mágicos infundidos que puedes mantener activos simultáneamente (${maxInfusions}).`,
      });
    }

    // 2. Destello de Genio (Nivel 7+)
    if (level >= 7) {
      const maxFlash = Math.max(1, intMod);
      result.push({
        id: 'res-destello-genio',
        name: 'Destello de Genio (Flash of Genius)',
        current: findExistingCurrent('res-destello-genio', maxFlash),
        max: maxFlash,
        resetOn: 'long',
        description: `Como reacción sumas tu modificador de Inteligencia (+${intMod}) a una tirada de salvación o prueba de habilidad tuya o de un aliado a 30 pies.`,
      });
    }

    // 3. Objeto Almacenador de Conjuros (Nivel 11+)
    if (level >= 11) {
      const maxStorage = Math.max(2, intMod * 2);
      result.push({
        id: 'res-almacen-conjuros',
        name: 'Objeto Almacenador de Conjuros',
        current: findExistingCurrent('res-almacen-conjuros', maxStorage),
        max: maxStorage,
        resetOn: 'long',
        description: `Activar el conjuro de 1.er o 2.º nivel imbuido en un arma o foco (${maxStorage} usos totales = 2 × mod INT).`,
      });
    }

    // --- RECURSOS DE SUBCLASES DE ARTÍFICE ---
    // Armero: Campo Defensivo (Nivel 3+)
    if (subLower.includes('armero') || subLower.includes('armorer')) {
      if (level >= 3) {
        result.push({
          id: 'res-campo-defensivo',
          name: 'Campo Defensivo (Modelo Guardián)',
          current: findExistingCurrent('res-campo-defensivo', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Acción adicional: obtienes ${level} PG temporales en tu turno mientras portes el Modelo Guardián (usos = bono de competencia).`,
        });
      }
    }

    // Artillero: Cañón Sobrenatural (Nivel 3+)
    else if (subLower.includes('artillero') || subLower.includes('artillerist')) {
      if (level >= 3) {
        result.push({
          id: 'res-canon-eldritch',
          name: 'Cañón Eldritch Gratuito',
          current: findExistingCurrent('res-canon-eldritch', 1),
          max: 1,
          resetOn: 'long',
          description: `Creación gratuita de tu Cañón Eldritch (CA 18, PG ${level * 5}) por descanso largo. Crear adicionales gasta ranuras de conjuro de nivel 1+.`,
        });
      }
    }

    // Herrero de Batalla: Reparar Defensor (Nv 3+) y Sacudida Arcana (Nv 9+)
    else if (subLower.includes('herrero') || subLower.includes('battle smith') || subLower.includes('battlesmith')) {
      if (level >= 3) {
        result.push({
          id: 'res-reparar-defensor',
          name: 'Reparación del Defensor de Acero',
          current: findExistingCurrent('res-reparar-defensor', 3),
          max: 3,
          resetOn: 'long',
          description: `Acción del Defensor de Acero: restaura 2d8 + ${profBonus} puntos de golpe a sí mismo o a un constructo u objeto tocado.`,
        });
      }
      if (level >= 9) {
        const maxJolts = Math.max(1, intMod);
        const joltDice = level >= 15 ? '4d6' : '2d6';
        result.push({
          id: 'res-sacudida-arcana',
          name: `Sacudida Arcana (${joltDice})`,
          current: findExistingCurrent('res-sacudida-arcana', maxJolts),
          max: maxJolts,
          resetOn: 'long',
          description: `Al impactar con un arma mágica o Golpe de Fuerza: infliges ${joltDice} de daño de fuerza adicional o curas ${joltDice} PG a un objetivo a 30 pies.`,
        });
      }
    }

    // Alquimista: Elixir Experimental (Nv 3+) y Restauración Menor (Nv 9+)
    else if (subLower.includes('alquimista') || subLower.includes('alchemist')) {
      if (level >= 3) {
        const freeElixirs = level >= 15 ? 3 : level >= 6 ? 2 : 1;
        result.push({
          id: 'res-elixir-experimental',
          name: 'Elixires Experimentales Gratuitos',
          current: findExistingCurrent('res-elixir-experimental', freeElixirs),
          max: freeElixirs,
          resetOn: 'long',
          description: `Elixires mágicos creados al terminar un descanso largo sin coste de ranura (${freeElixirs} elixires).`,
        });
      }
      if (level >= 9) {
        const freeRestores = Math.max(1, intMod);
        result.push({
          id: 'res-restauracion-alquimista',
          name: 'Restauración Menor Gratuita',
          current: findExistingCurrent('res-restauracion-alquimista', freeRestores),
          max: freeRestores,
          resetOn: 'long',
          description: `Lanzamientos gratuitos de Restauración Menor por descanso largo sin gastar ranura de conjuro.`,
        });
      }
    }
  }

  // EXPLORADOR (RANGER)
  else if (cLower.includes('explorador') || cLower.includes('ranger')) {
    const wisMod = getAbilityModifier(stats.wis || 10);
    const profBonus = Math.floor((level - 1) / 4) + 2;
    const subLower = (subclassName || '').toLowerCase();

    // 1. Rasgos Base / Tasha de Clase
    // Fervor del Cazador (Favored Foe - Tasha)
    const favoredFoeDie = level >= 14 ? '1d8' : level >= 6 ? '1d6' : '1d4';
    result.push({
      id: 'res-fervor-cazador',
      name: `Fervor del Cazador (${favoredFoeDie})`,
      current: findExistingCurrent('res-fervor-cazador', profBonus),
      max: profBonus,
      resetOn: 'long',
      diceType: favoredFoeDie,
      description: `Al impactar a una criatura (${profBonus}/descanso largo, concentración hasta 1 min): infliges +${favoredFoeDie} de daño la primera vez que la impactes en cada turno.`,
    });

    // Incansable (Tireless - Deft Explorer Nivel 10+)
    if (level >= 10) {
      result.push({
        id: 'res-incansable',
        name: 'Incansable (PG Temporales)',
        current: findExistingCurrent('res-incansable', profBonus),
        max: profBonus,
        resetOn: 'long',
        description: `Acción adicional (${profBonus}/descanso largo): obtienes 1d8 + ${wisMod} puntos de golpe temporales. Además, descansar reduce el agotamiento en 1 nivel extra.`,
      });
    }

    // Velo de la Naturaleza (Nature's Veil Nivel 10+)
    if (level >= 10) {
      result.push({
        id: 'res-camuflaje-naturaleza',
        name: 'Velo de la Naturaleza (Invisibilidad)',
        current: findExistingCurrent('res-camuflaje-naturaleza', profBonus),
        max: profBonus,
        resetOn: 'long',
        description: `Acción adicional (${profBonus}/descanso largo): te vuelves mágicamente invisible hasta el inicio de tu siguiente turno.`,
      });
    }

    // 2. Recursos de las 8 Subclases de Explorador
    // 1) Acechador Sombrío (Gloom Stalker)
    if (subLower.includes('acechador') || subLower.includes('sombrio') || subLower.includes('sombrío') || subLower.includes('gloom')) {
      if (level >= 3) {
        result.push({
          id: 'res-emboscador-temible',
          name: 'Emboscador Temible (Turno 1)',
          current: 1,
          max: 1,
          resetOn: 'short',
          description: `Al inicio de cada combate: +${wisMod} a iniciativa, +10 pies de velocidad en turno 1 y +1 ataque con arma adicional al Atacar que causa +1d8 de daño si impacta.`,
        });
      }
    }

    // 2) Cazador (Hunter)
    if (subLower.includes('cazador') || subLower.includes('hunter')) {
      if (level >= 3) {
        result.push({
          id: 'res-asesino-colosos',
          name: 'Asesino de Colosos (+1d8)',
          current: 1,
          max: 1,
          resetOn: 'short',
          diceType: '1d8',
          description: 'Una vez en cada uno de tus turnos al impactar con un arma a una criatura con menos de sus PG máximos: infliges +1d8 de daño adicional.',
        });
      }
    }

    // 3) Señor de las Bestias (Beast Master)
    if (subLower.includes('senor-bestias') || subLower.includes('señor-bestias') || subLower.includes('bestias') || subLower.includes('beast master')) {
      if (level >= 3) {
        const beastHp = 5 + 5 * level;
        const beastAc = 13 + profBonus;
        result.push({
          id: 'res-companero-bestial',
          name: 'Compañero Primordial (Bestia)',
          current: 1,
          max: 1,
          resetOn: 'long',
          description: `Bestia de la Tierra, Mar o Cielo (CA ${beastAc}, PG ${beastHp}). Ataque con bono de conjuro de explorador. Revivir gasta 1 ranura de conjuro nivel 1+.`,
        });
      }
    }

    // 4) Caminante del Horizonte (Horizon Walker)
    if (subLower.includes('horizonte') || subLower.includes('horizon')) {
      if (level >= 3) {
        const warriorDie = level >= 11 ? '2d8' : '1d8';
        result.push({
          id: 'res-golpe-planar',
          name: `Guerrero Planar (+${warriorDie} Fuerza)`,
          current: 1,
          max: 1,
          resetOn: 'short',
          diceType: warriorDie,
          description: `Acción adicional: elige criatura a 30 pies. Tu siguiente impacto con arma en este turno convierte todo el daño en FUERZA y suma +${warriorDie} de daño de fuerza.`,
        });
        result.push({
          id: 'res-detectar-portales',
          name: 'Detectar Portales',
          current: findExistingCurrent('res-detectar-portales', 1),
          max: 1,
          resetOn: 'short',
          description: 'Acción (1/descanso corto o largo): Sientes la dirección y distancia al portal planar más cercano a menos de 1 milla de ti.',
        });
      }
      if (level >= 7) {
        result.push({
          id: 'res-paso-etereo',
          name: 'Paso Etéreo (Paseo Etéreo)',
          current: findExistingCurrent('res-paso-etereo', 1),
          max: 1,
          resetOn: 'short',
          description: 'Acción adicional (1/descanso corto o largo): Lanzas el conjuro Paseo Etéreo (Etherealness) sin gastar ranura, durando hasta el final de tu turno actual.',
        });
      }
    }

    // 5) Asesino de Monstruos (Monster Slayer)
    if (subLower.includes('monstruos') || subLower.includes('slayer')) {
      if (level >= 3) {
        const maxSense = Math.max(1, wisMod);
        result.push({
          id: 'res-sentido-cazador',
          name: 'Sentido del Cazador (Hunter\'s Sense)',
          current: findExistingCurrent('res-sentido-cazador', maxSense),
          max: maxSense,
          resetOn: 'long',
          description: `Acción (${maxSense}/descanso largo): Percibes instantáneamente las inmunidades, resistencias y vulnerabilidades al daño de una criatura visible a 60 pies.`,
        });
        result.push({
          id: 'res-presa-exterminador',
          name: 'Presa del Exterminador (+1d6)',
          current: 1,
          max: 1,
          resetOn: 'short',
          diceType: '1d6',
          description: 'Acción adicional: Marcas a una criatura a 60 pies. La primera vez en cada turno que la impactes con un arma, infliges +1d6 de daño adicional.',
        });
      }
      if (level >= 11) {
        result.push({
          id: 'res-nemesis-conjuradores',
          name: 'Némesis de Conjuradores',
          current: findExistingCurrent('res-nemesis-conjuradores', 1),
          max: 1,
          resetOn: 'short',
          description: 'Reacción (1/descanso corto o largo): Cuando tu presa a 60 pies intente lanzar un conjuro o teletransportarse, la fuerzas a salvación de Sabiduría contra tu CD o la acción falla por completo.',
        });
      }
    }

    // 6) Guardián del Enjambre (Swarmkeeper)
    if (subLower.includes('enjambre') || subLower.includes('swarm')) {
      if (level >= 7) {
        result.push({
          id: 'res-marea-voraz',
          name: 'Marea Voraz (Vuelo de Enjambre)',
          current: findExistingCurrent('res-marea-voraz', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Acción adicional (${profBonus}/descanso largo): Tu enjambre te eleva otorgándote velocidad de vuelo de 10 pies con levitación durante 1 minuto.`,
        });
      }
      if (level >= 15) {
        result.push({
          id: 'res-dispersion-enjambre',
          name: 'Dispersión del Enjambre',
          current: findExistingCurrent('res-dispersion-enjambre', profBonus),
          max: profBonus,
          resetOn: 'long',
          description: `Reacción (${profBonus}/descanso largo) al recibir daño: Ganas resistencia al ataque y te teletransportas hasta 30 pies en una ráfaga de enjambre.`,
        });
      }
    }

    // 7) Guardián Dracónico (Drakewarden)
    if (subLower.includes('draconico') || subLower.includes('dracónico') || subLower.includes('drake')) {
      if (level >= 3) {
        const drakeHp = 5 + 5 * level;
        const drakeAc = 14 + profBonus;
        result.push({
          id: 'res-invocar-drake',
          name: 'Invocación del Compañero Drake',
          current: findExistingCurrent('res-invocar-drake', 1),
          max: 1,
          resetOn: 'long',
          description: `Acción (1/descanso largo o ranura Nv 1+): Invocas al Drake (CA ${drakeAc}, PG ${drakeHp}, mordisco 1d6+PB perforante + 1d6 esencia dracónica).`,
        });
      }
      if (level >= 11) {
        const breathDmg = level >= 15 ? '10d6' : '8d6';
        result.push({
          id: 'res-aliento-draco',
          name: `Aliento del Draco (${breathDmg})`,
          current: findExistingCurrent('res-aliento-draco', 1),
          max: 1,
          resetOn: 'long',
          diceType: breathDmg,
          description: `Acción (1/descanso largo o ranura Nv 3+): Tú o tu drake exhalan en cono de 30 pies o línea de 60 pies infligiendo ${breathDmg} daño de esencia (salvación Destreza para mitad).`,
        });
      }
    }

    // 8) Erudito Fey (Fey Wanderer)
    if (subLower.includes('fey') || subLower.includes('feerico') || subLower.includes('feérico') || subLower.includes('erudito')) {
      if (level >= 3) {
        const strikeDie = level >= 11 ? '1d6' : '1d4';
        result.push({
          id: 'res-don-temible',
          name: `Don Temible (+${strikeDie} Psíquico)`,
          current: 1,
          max: 1,
          resetOn: 'short',
          diceType: strikeDie,
          description: `La primera vez que impactes a una criatura en tu turno con un arma: infliges +${strikeDie} de daño psíquico (puedes aplicar a criaturas distintas en el mismo turno).`,
        });
      }
      if (level >= 11) {
        result.push({
          id: 'res-refuerzos-fey',
          name: 'Refuerzos Fey (Convocar Feérico)',
          current: findExistingCurrent('res-refuerzos-fey', 1),
          max: 1,
          resetOn: 'long',
          description: 'Lanzas el conjuro Convocar Feérico (Summon Fey) sin componentes materiales. 1 vez por descanso largo puedes lanzarlo gratis sin requerir concentración (dura 1 min).',
        });
      }
      if (level >= 15) {
        const maxMisty = Math.max(1, wisMod);
        result.push({
          id: 'res-paso-brumoso-fey',
          name: 'Paso Brumoso de Fey',
          current: findExistingCurrent('res-paso-brumoso-fey', maxMisty),
          max: maxMisty,
          resetOn: 'long',
          description: `Acción adicional (${maxMisty}/descanso largo): Lanzas Paso Brumoso (Misty Step) sin gastar ranura y puedes teletransportar contigo a un aliado a 5 pies.`,
        });
      }
    }
  }

  // Si no pertenece a las anteriores pero ya tenía recursos personalizados, conservarlos
  if (result.length === 0 && existingResources && existingResources.length > 0) {
    return existingResources;
  }

  return result;
}

// 8. Actualización de Ataques y Armas con Nuevo Bono de Competencia
export function updateCharacterAttacks(
  attacks: CharacterAttack[] = [],
  stats: AbilityScores,
  newProfBonus: number,
  characterClass?: string,
  level?: number
): CharacterAttack[] {
  const strMod = getAbilityModifier(stats.str || 10);
  const dexMod = getAbilityModifier(stats.dex || 10);
  const cLower = (characterClass || '').toLowerCase();
  const isMonk = cLower.includes('monje') || cLower.includes('monk');

  return attacks.map((att) => {
    // Buscar arma oficial en compendio
    const weapon = findWeaponByName(att.name);
    if (weapon) {
      return generateAttackFromWeapon(weapon, stats, newProfBonus, true);
    }

    if (att.name.toLowerCase().includes('desarmado') || att.id === 'unarmed-strike') {
      const attackMod = isMonk ? Math.max(strMod, dexMod) : strMod;
      const monkDie = isMonk && level ? getMonkMartialArtsDie(level) : '1';
      const bonus = attackMod + newProfBonus;
      return {
        ...att,
        bonus: bonus >= 0 ? `+${bonus}` : `${bonus}`,
        damage: `${monkDie} + ${attackMod}`,
        type: 'Contundente',
      };
    }

    // Para ataques personalizados, intentar ajustar el bono numérico proporcionalmente si es necesario
    return att;
  });
}

// 9. Recalcular Estadísticas Derivadas Completas de un Personaje
export function recalculateAllCharacterDerivedStats(
  character: Character,
  overrideLevel?: number,
  overrideStats?: AbilityScores,
  overrideEquippedItems?: string[]
): {
  speed: string;
  speedResult: SpeedCalculationResult;
  ac: number;
  initiativeBonus: number;
  passivePerception: number;
  attacks: CharacterAttack[];
  classResources: ClassResource[];
  profBonus: number;
  extraAttack: ExtraAttackInfo;
} {
  const level = overrideLevel !== undefined ? overrideLevel : character.level || 1;
  const rawStats = (overrideStats || character.stats || (character as any).abilityScores) as any;
  const stats: AbilityScores = {
    str: rawStats?.str ?? rawStats?.strength ?? 10,
    dex: rawStats?.dex ?? rawStats?.dexterity ?? 10,
    con: rawStats?.con ?? rawStats?.constitution ?? 10,
    int: rawStats?.int ?? rawStats?.intelligence ?? 10,
    wis: rawStats?.wis ?? rawStats?.wisdom ?? 10,
    cha: rawStats?.cha ?? rawStats?.charisma ?? 10,
  };
  const charClass = character.class || (character as any).characterClass || '';
  const rawItems = overrideEquippedItems || (character as any).equippedItems || (character as any).equipment || character.inventory || [];
  const equippedItems: string[] = Array.isArray(rawItems)
    ? rawItems.map((item: any) => typeof item === 'string' ? item : (item?.equipped ? item.name : (item?.name || ''))).filter(Boolean)
    : [];
  const profBonus = getProficiencyBonus(level);

  // A. Velocidad Dinámica
  const speedResult = calculateCharacterSpeed({
    baseSpeed: character.speed,
    characterClass: charClass,
    subclass: character.subclass,
    level,
    equippedItems,
    notes: character.notes,
    raceName: character.race,
    strength: stats.str,
  });

  // Helper para verificar dotes en creatorState.asiChoices o notas
  const asiChoicesObj = (character.creatorState?.asiChoices || {}) as Record<string | number, any>;
  const hasCharacterFeat = (featId: string) => {
    return (
      Object.values(asiChoicesObj).some((c: any) => c?.type === 'feat' && (c?.featId === featId || c?.id === featId)) ||
      (character.notes?.toLowerCase().includes(featId) ?? false)
    );
  };

  // Estilo de combate dinámico (soporte tanto para classDecisions como para notas)
  const fightingStyleFromDecisions =
    (character.classDecisions?.['fighterFightingStyle_1'] as string[])?.[0] ||
    (character.classDecisions?.['paladinFightingStyle_2'] as string[])?.[0] ||
    (character.classDecisions?.['rangerFightingStyle_2'] as string[])?.[0] ||
    (character.classDecisions?.['championSecondFightingStyle'] as string[])?.[0] ||
    (character.classDecisions?.['swordsFightingStyle'] as string[])?.[0] ||
    (Array.isArray(character.classDecisions?.['fightingStyle'])
      ? (character.classDecisions?.['fightingStyle'] as string[])[0]
      : (character.classDecisions?.['fightingStyle'] as string)) ||
    '';

  const fightingStyle =
    character.notes?.match(/Estilo de Combate:\s*([^\n]+)/i)?.[1] ||
    fightingStyleFromDecisions ||
    '';

  const hasDualWielderFeat =
    hasCharacterFeat('combatiente-dos-armas') ||
    character.notes?.toLowerCase().includes('combatiente con dos armas') ||
    false;

  // B. Armadura Dinámica
  const ac = calculateEquippedAc({
    equippedItems,
    stats,
    characterClass: charClass,
    subclass: character.subclass,
    raceId: character.race,
    fightingStyle,
    hasDualWielderFeat,
  });

  // C. Iniciativa (Dex mod + Jack of All Trades si es Bardo Nv 2+ + Gloom Stalker Sabiduría Nv 3+ + Swashbuckler Carisma Nv 3+ + Watchers + Alerta)
  const dexMod = getAbilityModifier(stats.dex || 10);
  const charClassLower = charClass.toLowerCase();
  const subClassLower = (character.subclass || '').toLowerCase();
  const isBard = charClassLower.includes('bardo') || charClassLower.includes('bard');
  const jackBonus = isBard && level >= 2 ? Math.floor(profBonus / 2) : 0;
  const isGloomStalker =
    (charClassLower.includes('explorador') || charClassLower.includes('ranger')) &&
    (subClassLower.includes('acechador') || subClassLower.includes('sombrio') || subClassLower.includes('sombrío') || subClassLower.includes('gloom'));
  const gloomWisBonus = isGloomStalker && level >= 3 ? Math.max(0, getAbilityModifier(stats.wis || 10)) : 0;
  const isWatchersPaladin =
    (charClassLower.includes('paladín') || charClassLower.includes('paladin')) &&
    (subClassLower.includes('vigilantes') || subClassLower.includes('watchers')) &&
    level >= 7;
  const watchersInitiativeBonus = isWatchersPaladin ? profBonus : 0;
  const isSwashbuckler =
    (charClassLower.includes('pícaro') || charClassLower.includes('picaro') || charClassLower.includes('rogue')) &&
    (subClassLower.includes('espadachin') || subClassLower.includes('espadachín') || subClassLower.includes('swashbuckler')) &&
    level >= 3;
  const swashbucklerChaBonus = isSwashbuckler ? Math.max(0, getAbilityModifier(stats.cha || 10)) : 0;
  const isWarWizard =
    (charClassLower.includes('mago') || charClassLower.includes('wizard')) &&
    (subClassLower.includes('guerra') || subClassLower.includes('war')) &&
    level >= 2;
  const warWizardIntBonus = isWarWizard ? Math.max(0, getAbilityModifier(stats.int || 10)) : 0;
  const isChronurgyWizard =
    (charClassLower.includes('mago') || charClassLower.includes('wizard')) &&
    (subClassLower.includes('cron') || subClassLower.includes('chron')) &&
    level >= 2;
  const chronurgyIntBonus = isChronurgyWizard ? Math.max(0, getAbilityModifier(stats.int || 10)) : 0;
  const hasAlert = hasCharacterFeat('alerta') || character.notes?.toLowerCase().includes('alerta') || false;
  const initiativeBonus = dexMod + jackBonus + gloomWisBonus + watchersInitiativeBonus + swashbucklerChaBonus + warWizardIntBonus + chronurgyIntBonus + (hasAlert ? 5 : 0);

  // D. Percepción Pasiva (10 + Wis mod + profBonus si competente / Jack of All Trades si no competente + Observador)
  const wisMod = getAbilityModifier(stats.wis || 10);
  const skills = character.skills || [];
  const hasPerception = skills.some((s: any) => {
    const sName = typeof s === 'string' ? s : (s?.name || '');
    const isProf = typeof s === 'string' ? true : (s?.proficient !== false);
    const lower = sName.toLowerCase();
    return isProf && (lower === 'percepción' || lower === 'percepcion');
  });
  const hasExpertise =
    character.notes?.toLowerCase().includes('pericia en percepción') ||
    character.notes?.toLowerCase().includes('pericia en percepcion') ||
    character.notes?.toLowerCase().includes('pericia: percepción') ||
    character.notes?.toLowerCase().includes('pericia: percepcion') ||
    (character.classDecisions?.['expertise'] || []).some((s: string) => s.toLowerCase().includes('percep')) ||
    (character.classDecisions?.['bardExpertise_3'] || []).some((s: string) => s.toLowerCase().includes('percep')) ||
    (character.classDecisions?.['bardExpertise_10'] || []).some((s: string) => s.toLowerCase().includes('percep')) ||
    (character.classDecisions?.['rogueExpertise_1'] || []).some((s: string) => s.toLowerCase().includes('percep')) ||
    (character.classDecisions?.['rogueExpertise_6'] || []).some((s: string) => s.toLowerCase().includes('percep'));
  const hasObservant = hasCharacterFeat('observador') || character.notes?.toLowerCase().includes('observador') || false;
  const perceptionBonus = hasPerception
    ? (hasExpertise ? 2 * profBonus : profBonus)
    : jackBonus;
  const passivePerception = 10 + wisMod + perceptionBonus + (hasObservant ? 5 : 0);

  // E. Ataques Actualizados
  const attacks = updateCharacterAttacks(character.attacks, stats, profBonus, charClass, level);

  // F. Recursos de Clase (Soporte Monoclase y Multiclase)
  let classResources: ClassResource[] = [];
  let extraAttack = getExtraAttackInfo(charClass, level, character.subclass);

  if (character.multiclass && character.multiclass.length > 1) {
    const combinedRes: ClassResource[] = [];
    for (const mc of character.multiclass) {
      const mcRes = generateClassResourcesForCharacter(
        mc.className,
        mc.level,
        stats,
        character.classResources,
        mc.subclass
      );
      for (const r of mcRes) {
        if (!combinedRes.some((x) => x.name.toLowerCase() === r.name.toLowerCase())) {
          combinedRes.push(r);
        }
      }
      const mcExtra = getExtraAttackInfo(mc.className, mc.level, mc.subclass);
      if (mcExtra.hasExtraAttack) {
        if (mcExtra.attacksCount > (extraAttack.attacksCount || 1)) {
          extraAttack = mcExtra;
        }
      }
    }
    classResources = combinedRes;
  } else {
    classResources = generateClassResourcesForCharacter(charClass, level, stats, character.classResources, character.subclass);
  }

  return {
    speed: speedResult.speedStr,
    speedResult,
    ac,
    initiativeBonus,
    passivePerception,
    attacks,
    classResources,
    profBonus,
    extraAttack,
  };
}

export function getRogueSneakAttackDice(level: number): { count: number; diceStr: string } {
  const count = Math.max(1, Math.ceil(level / 2));
  return { count, diceStr: `${count}d6` };
}

export function getSoulknifePsionicDie(level: number): string {
  if (level >= 13) return 'd12';
  if (level >= 9) return 'd10';
  if (level >= 5) return 'd8';
  return 'd6';
}

export function getWarlockPactSlots(level: number): { slotsCount: number; slotLevel: number } {
  const slotsCount = level >= 17 ? 4 : level >= 11 ? 3 : level >= 2 ? 2 : 1;
  const slotLevel = level >= 9 ? 5 : level >= 7 ? 4 : level >= 5 ? 3 : level >= 3 ? 2 : 1;
  return { slotsCount, slotLevel };
}

// 10. Motor Multiclase Oficial D&D 5e / Baldur's Gate 3
export function calculateMulticlassSpellSlots(classes: MulticlassEntry[]): {
  slots: Partial<CharacterSpellSlots>;
  pactSlots?: { count: number; slotLevel: number };
  effectiveCasterLevel: number;
} {
  let casterLevels = 0;
  let warlockLevel = 0;

  for (const c of classes) {
    const name = c.className.toLowerCase();
    const lvl = c.level;
    const sub = (c.subclass || '').toLowerCase();

    // Full Casters (1:1)
    if (
      name.includes('mago') || name.includes('wizard') ||
      name.includes('hechicero') || name.includes('sorcerer') ||
      name.includes('clérigo') || name.includes('clerigo') || name.includes('cleric') ||
      name.includes('druida') || name.includes('druid') ||
      name.includes('bardo') || name.includes('bard')
    ) {
      casterLevels += lvl;
    }
    // Half Casters (floor(level / 2))
    else if (
      name.includes('paladín') || name.includes('paladin') ||
      name.includes('explorador') || name.includes('ranger')
    ) {
      casterLevels += Math.floor(lvl / 2);
    }
    // Artificer (ceil(level / 2))
    else if (name.includes('artífice') || name.includes('artifice') || name.includes('artificer')) {
      casterLevels += Math.ceil(lvl / 2);
    }
    // Third Casters (floor(level / 3))
    else if (
      (name.includes('guerrero') || name.includes('fighter')) &&
      (sub.includes('caballero arcano') || sub.includes('eldritch'))
    ) {
      casterLevels += Math.floor(lvl / 3);
    } else if (
      (name.includes('pícaro') || name.includes('picaro') || name.includes('rogue')) &&
      (sub.includes('embaucador') || sub.includes('arcane trickster'))
    ) {
      casterLevels += Math.floor(lvl / 3);
    }
    // Warlock (Brujo)
    else if (name.includes('brujo') || name.includes('warlock')) {
      warlockLevel += lvl;
    }
  }

  const effectiveCasterLevel = Math.min(20, casterLevels);
  const slotsRecord = effectiveCasterLevel > 0 ? (FULL_CASTER_SLOTS_TABLE[effectiveCasterLevel] || {}) : {};

  const slots: Partial<CharacterSpellSlots> = {};
  for (let i = 1; i <= 9; i++) {
    const key = `lvl${i}` as keyof CharacterSpellSlots;
    const count = (slotsRecord as any)[key] || 0;
    if (count > 0) {
      slots[key] = { max: count, used: 0 };
    }
  }

  let pactSlots: { count: number; slotLevel: number } | undefined;
  if (warlockLevel > 0) {
    pactSlots = WARLOCK_PACT_SLOTS_TABLE[Math.min(20, warlockLevel)];
  }

  return { slots, pactSlots, effectiveCasterLevel };
}

export function formatCharacterClass(character: { class: string; multiclass?: MulticlassEntry[] }): string {
  if (character.multiclass && character.multiclass.length > 1) {
    return character.multiclass.map((m) => `${m.className} ${m.level}`).join(' / ');
  }
  return character.class;
}

export interface MulticlassPrereqResult {
  className: string;
  requiredAbility: string;
  meetsRequirement: boolean;
  score: number;
}

export function checkMulticlassPrerequisites(
  className: string,
  stats: AbilityScores
): MulticlassPrereqResult {
  const cLower = className.toLowerCase();
  let requiredAbility = 'Fuerza 13';
  let meets = true;
  let score = stats.str;

  if (cLower.includes('bárbaro') || cLower.includes('barbaro')) {
    requiredAbility = 'FUE 13';
    score = stats.str;
    meets = stats.str >= 13;
  } else if (cLower.includes('bardo') || cLower.includes('hechicero') || cLower.includes('brujo')) {
    requiredAbility = 'CAR 13';
    score = stats.cha;
    meets = stats.cha >= 13;
  } else if (cLower.includes('clérigo') || cLower.includes('clerigo') || cLower.includes('druida')) {
    requiredAbility = 'SAB 13';
    score = stats.wis;
    meets = stats.wis >= 13;
  } else if (cLower.includes('guerrero')) {
    requiredAbility = 'FUE 13 o DES 13';
    score = Math.max(stats.str, stats.dex);
    meets = stats.str >= 13 || stats.dex >= 13;
  } else if (cLower.includes('monje')) {
    requiredAbility = 'DES 13 y SAB 13';
    score = Math.min(stats.dex, stats.wis);
    meets = stats.dex >= 13 && stats.wis >= 13;
  } else if (cLower.includes('paladín') || cLower.includes('paladin')) {
    requiredAbility = 'FUE 13 y CAR 13';
    score = Math.min(stats.str, stats.cha);
    meets = stats.str >= 13 && stats.cha >= 13;
  } else if (cLower.includes('explorador') || cLower.includes('ranger')) {
    requiredAbility = 'DES 13 y SAB 13';
    score = Math.min(stats.dex, stats.wis);
    meets = stats.dex >= 13 && stats.wis >= 13;
  } else if (cLower.includes('pícaro') || cLower.includes('picaro')) {
    requiredAbility = 'DES 13';
    score = stats.dex;
    meets = stats.dex >= 13;
  } else if (cLower.includes('mago')) {
    requiredAbility = 'INT 13';
    score = stats.int;
    meets = stats.int >= 13;
  } else if (cLower.includes('artífice') || cLower.includes('artifice') || cLower.includes('artificer')) {
    requiredAbility = 'INT 13';
    score = stats.int;
    meets = stats.int >= 13;
  }

  return { className, requiredAbility, meetsRequirement: meets, score };
}

