// Base de datos exhaustiva de Trasfondos (Backgrounds de Wikidot 5e)
// Incluye Common Backgrounds, AL (Curse of Strahd, Mulmaster, Hillsfar),
// Setting Specific (Ravnica, Strixhaven, Spelljammer, Dragonlance, Planescape, etc.)

import { BACKGROUNDS_BLOCK_1 } from './backgrounds/block_1_a';
import { BACKGROUNDS_BLOCK_2 } from './backgrounds/block_2_b_c';
import { BACKGROUNDS_BLOCK_3 } from './backgrounds/block_3_d_e';
import { BACKGROUNDS_BLOCK_4 } from './backgrounds/block_4_f_g';
import { BACKGROUNDS_BLOCK_5 } from './backgrounds/block_5_h_i_l';
import { BACKGROUNDS_BLOCK_6 } from './backgrounds/block_6_m_n';
import { BACKGROUNDS_BLOCK_7 } from './backgrounds/block_7_o_p_r';
import { BACKGROUNDS_BLOCK_8 } from './backgrounds/block_8_s_v';

export type BackgroundCategory =
  | 'Common Backgrounds'
  | 'AL: Curse of Strahd'
  | 'AL: Mulmaster'
  | 'AL: Hillsfar'
  | 'Setting: Acquisitions inc.'
  | 'Setting: Amonkhet'
  | 'Setting: Dragonlance'
  | 'Setting: Innistrad'
  | 'Setting: Planescape'
  | 'Setting: Ravnica'
  | 'Setting: Strixhaven'
  | 'Setting: Wildemount'
  | 'Setting: Spelljammer'
  | 'Homebrew';

export const WIKIDOT_BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  'Common Backgrounds',
  'AL: Curse of Strahd',
  'AL: Mulmaster',
  'AL: Hillsfar',
  'Setting: Acquisitions inc.',
  'Setting: Amonkhet',
  'Setting: Dragonlance',
  'Setting: Innistrad',
  'Setting: Planescape',
  'Setting: Ravnica',
  'Setting: Strixhaven',
  'Setting: Wildemount',
  'Setting: Spelljammer',
  'Homebrew',
];

export type BackgroundOrientation = 'Magia' | 'Combate' | 'Sigilo' | 'Social' | 'Exploración';

export interface BackgroundEquipmentChoice {
  id: string;
  label: string;
  description: string;
  type: 'horror_trinket' | 'feywild_trinket' | 'standard_trinket' | 'custom_choice';
  options?: string[];
  defaultItem?: string;
}

export interface WikidotBackground {
  id: string;
  name: string;
  nameEn?: string;
  category: BackgroundCategory;
  orientation?: BackgroundOrientation;
  description: string;
  detailedDescription?: string;
  skillProficiencies: string[];
  skillChoices?: {
    count: number;
    options: string[];
  };
  toolProficiencies?: string[];
  toolChoices?: {
    count: number;
    options: string[];
  };
  languagesCount?: number;
  fixedLanguages?: string[];
  languageOptions?: string[];
  languageSlots?: ('any' | 'standard' | 'exotic')[];
  languageNote?: string;
  bonusFeatId?: string;
  bonusFeatName?: string;
  featureName: string;
  featureDescription: string;
  suggestedEquipment: string;
  gold: number;
  silver?: number;
  copper?: number;
  platinum?: number;
  wealthText?: string;
  equipmentChoices?: BackgroundEquipmentChoice[];
  source?: string;
  personalityTraits?: string[];
  ideals?: string[];
  bonds?: string[];
  flaws?: string[];
}

export function formatBackgroundWealth(bg: WikidotBackground): string {
  if (bg.wealthText) return bg.wealthText;
  const parts: string[] = [];
  if (bg.platinum && bg.platinum > 0) parts.push(`${bg.platinum} ppt`);
  if (bg.gold && bg.gold > 0) parts.push(`${bg.gold} po`);
  if (bg.silver && bg.silver > 0) parts.push(`${bg.silver} pp`);
  if (bg.copper && bg.copper > 0) parts.push(`${bg.copper} pc`);
  return parts.length > 0 ? parts.join(' + ') : `${bg.gold || 0} po`;
}

export interface LanguageOption {
  id: string;
  name: string;
  nameEn: string;
  type: 'Estándar' | 'Exótico';
  script: string;
}

export const OFFICIAL_5E_LANGUAGES: LanguageOption[] = [
  { id: 'comun', name: 'Común', nameEn: 'Common', type: 'Estándar', script: 'Común' },
  { id: 'enano', name: 'Enano', nameEn: 'Dwarvish', type: 'Estándar', script: 'Enano' },
  { id: 'elfico', name: 'Élfico', nameEn: 'Elvish', type: 'Estándar', script: 'Élfico' },
  { id: 'gigante', name: 'Gigante', nameEn: 'Giant', type: 'Estándar', script: 'Enano' },
  { id: 'gnomo', name: 'Gnomo', nameEn: 'Gnomish', type: 'Estándar', script: 'Enano' },
  { id: 'trasgo', name: 'Trasgo (Goblin)', nameEn: 'Goblin', type: 'Estándar', script: 'Enano' },
  { id: 'mediano', name: 'Mediano (Halfling)', nameEn: 'Halfling', type: 'Estándar', script: 'Común' },
  { id: 'orco', name: 'Orco', nameEn: 'Orc', type: 'Estándar', script: 'Enano' },
  { id: 'abisal', name: 'Abisal', nameEn: 'Abyssal', type: 'Exótico', script: 'Infernal' },
  { id: 'celestial', name: 'Celestial', nameEn: 'Celestial', type: 'Exótico', script: 'Celestial' },
  { id: 'draconico', name: 'Dracónico', nameEn: 'Draconic', type: 'Exótico', script: 'Dracónico' },
  { id: 'habla-profunda', name: 'Habla Profunda (Deep Speech)', nameEn: 'Deep Speech', type: 'Exótico', script: 'Ninguno' },
  { id: 'infernal', name: 'Infernal', nameEn: 'Infernal', type: 'Exótico', script: 'Infernal' },
  { id: 'primordial', name: 'Primordial (Acuano, Áurano, Ígneo, Terreno)', nameEn: 'Primordial', type: 'Exótico', script: 'Enano' },
  { id: 'silvano', name: 'Silvano (Sylvan)', nameEn: 'Sylvan', type: 'Exótico', script: 'Élfico' },
  { id: 'infracomun', name: 'Infracomún (Undercommon)', nameEn: 'Undercommon', type: 'Exótico', script: 'Élfico' },
  { id: 'kraul', name: 'Kraul', nameEn: 'Kraul', type: 'Exótico', script: 'Kraul' },
  { id: 'loxodon', name: 'Loxodonte (Loxodon)', nameEn: 'Loxodon', type: 'Exótico', script: 'Élfico' },
  { id: 'minotaur', name: 'Minotauro (Minotaur)', nameEn: 'Minotaur', type: 'Exótico', script: 'Común' },
  { id: 'vedalken', name: 'Vedalken', nameEn: 'Vedalken', type: 'Exótico', script: 'Vedalken' },
];

export const WIKIDOT_BACKGROUNDS: WikidotBackground[] = [
  ...BACKGROUNDS_BLOCK_1,
  ...BACKGROUNDS_BLOCK_2,
  ...BACKGROUNDS_BLOCK_3,
  ...BACKGROUNDS_BLOCK_4,
  ...BACKGROUNDS_BLOCK_5,
  ...BACKGROUNDS_BLOCK_6,
  ...BACKGROUNDS_BLOCK_7,
  ...BACKGROUNDS_BLOCK_8,
];
