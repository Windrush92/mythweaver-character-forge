/**
 * Utility for mapping weapons, armors, and shields to their dedicated
 * dark fantasy blacksmith forged icon badges.
 */

export type WeaponBadgeType = 'sword' | 'axe' | 'mace' | 'spear' | 'bow' | 'unarmed';
export type ArmorBadgeType = 'light' | 'medium' | 'heavy' | 'shield';

export const WEAPON_BADGE_ASSETS: Record<WeaponBadgeType, string> = {
  sword: './assets/ui/badge_weapon_sword.png',
  axe: './assets/ui/badge_weapon_axe.png',
  mace: './assets/ui/badge_weapon_mace.png',
  spear: './assets/ui/badge_weapon_spear.png',
  bow: './assets/ui/badge_weapon_bow.png',
  unarmed: './assets/ui/badge_weapon_unarmed.png',
};

export const ARMOR_BADGE_ASSETS: Record<ArmorBadgeType, string> = {
  light: './assets/ui/badge_armor_light.png',
  medium: './assets/ui/badge_armor_medium.png',
  heavy: './assets/ui/badge_armor_heavy.png',
  shield: './assets/ui/badge_armor_shield.png',
};

/**
 * Returns the corresponding forged weapon badge path based on weapon name and optional category
 */
export function getWeaponBadgeAsset(name: string = '', category: string = ''): string {
  const q = `${name} ${category}`.toLowerCase();

  // 1. Axes & Halberds
  if (/hacha|axe|greataxe|battleaxe|handaxe|alabarda|halberd/i.test(q)) {
    return WEAPON_BADGE_ASSETS.axe;
  }

  // 2. Hammers, Maces, Flails, Clubs
  if (/maza|martillo|mace|hammer|warhammer|maul|morningstar|mangual|flail|club|garrote|clava/i.test(q)) {
    return WEAPON_BADGE_ASSETS.mace;
  }

  // 3. Spears, Pikes, Glaives, Tridents, Javelins
  if (/lanza|spear|pica|pike|glaive|guja|tridente|trident|jabalina|javelin/i.test(q)) {
    return WEAPON_BADGE_ASSETS.spear;
  }

  // 4. Bows, Crossbows, Slings, Darts
  if (/arco|bow|ballesta|crossbow|honda|sling|cerbatana|blowgun|dardo|dart/i.test(q) || category.includes('ranged')) {
    return WEAPON_BADGE_ASSETS.bow;
  }

  // 5. Quarterstaff, Unarmed, Fists, Claws
  if (/bastón|baston|quarterstaff|staff|vara|desarmado|unarmed|puño|fist|garra|claw|mordisco|bite/i.test(q)) {
    return WEAPON_BADGE_ASSETS.unarmed;
  }

  // 6. Swords, Daggers, Rapiers, Scimitars (and default fallback)
  return WEAPON_BADGE_ASSETS.sword;
}

/**
 * Returns the corresponding forged armor or shield badge path based on armor name and optional category
 */
export function getArmorBadgeAsset(name: string = '', category: string = ''): string {
  const q = `${name} ${category}`.toLowerCase();

  // 1. Shields
  if (/escudo|shield|broquel|buckler|pavés|paves/i.test(q) || category === 'shield') {
    return ARMOR_BADGE_ASSETS.shield;
  }

  // 2. Heavy Armor (Placas completas, bandas, cota de anillas)
  if (/placas|plate|anillas|ring mail|bandas|splint/i.test(q) || category === 'heavy') {
    return ARMOR_BADGE_ASSETS.heavy;
  }

  // 3. Medium Armor (Cota de malla, escamas, coraza, semiplacas, pieles)
  if (/malla|chain|escamas|scale|coraza|breastplate|semiplaca|half plate|pieles|hide/i.test(q) || category === 'medium') {
    return ARMOR_BADGE_ASSETS.medium;
  }

  // 4. Light Armor (Cuero, cuero tachonado, acolchada)
  if (/cuero|leather|acolchada|padded/i.test(q) || category === 'light') {
    return ARMOR_BADGE_ASSETS.light;
  }

  // Fallback to medium armor
  return ARMOR_BADGE_ASSETS.medium;
}
