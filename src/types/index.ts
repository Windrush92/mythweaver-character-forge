export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface CharacterAttack {
  id: string;
  name: string;
  bonus: string;
  damage: string;
  type: string;
}

export interface Spell {
  id: string;
  name: string;
  nameEn?: string;
  level: number; // 0 = Truco (Cantrip), 1 a 9
  school: 'Abjuración' | 'Conjuración' | 'Adivinación' | 'Encantamiento' | 'Evocación' | 'Ilusión' | 'Nigromancia' | 'Transmutación' | string;
  castingTime: string; // e.g. "1 acción", "1 acción adicional", "1 reacción"
  range: string; // e.g. "60 pies", "Toque", "Personal"
  components: string; // e.g. "V, S", "V, S, M (una perla)"
  duration: string; // e.g. "Instantáneo", "Concentración, hasta 1 hora"
  description: string;
  higherLevels?: string;
  ritual?: boolean;
  concentration?: boolean;
  classes?: string[];
  prepared?: boolean; // Si el PJ lo tiene preparado hoy
  source?: string;
  isRacial?: boolean;
  racialOrigin?: string;
  racialAbility?: 'int' | 'wis' | 'cha';
  notes?: string;
}

export interface SpellSlotLevel {
  max: number;
  used: number;
}

export interface CharacterSpellSlots {
  lvl1: SpellSlotLevel;
  lvl2: SpellSlotLevel;
  lvl3: SpellSlotLevel;
  lvl4: SpellSlotLevel;
  lvl5: SpellSlotLevel;
  lvl6: SpellSlotLevel;
  lvl7: SpellSlotLevel;
  lvl8: SpellSlotLevel;
  lvl9: SpellSlotLevel;
}

export interface ClassResource {
  id: string;
  name: string;
  current: number;
  max: number;
  diceType?: string;
  resetOn: 'short' | 'long';
  description?: string;
}

export interface MulticlassEntry {
  className: string;
  level: number;
  subclass?: string;
  hitDie?: number;
  isPrimary?: boolean;
}

export type AvatarFrameStyle =
  // 24 Recuadros Finos Fantasía (Assets Redondos & Cuadrados):
  | 'frame-fire'
  | 'frame-water'
  | 'frame-earth'
  | 'frame-air'
  | 'frame-thunder'
  | 'frame-arcane'
  | 'frame-demonic'
  | 'frame-gothic-skull'
  | 'frame-forge-iron'
  | 'frame-forge-dwarven'
  | 'frame-nature-fae'
  | 'frame-royal-gold'
  | 'frame-magma'
  | 'frame-ocean-abyss'
  | 'frame-cyclone'
  | 'frame-sunstorm'
  | 'frame-geode-crystal'
  | 'frame-frost-blizzard'
  | 'frame-blood-runes'
  | 'frame-eldritch-void'
  | 'frame-mithril-forge'
  | 'frame-plate-armor'
  | 'frame-spellbook-tome'
  | 'frame-dragon-emperor'
  // Estilos clásicos:
  | 'celtic-bronze'
  | 'laurel-wreath'
  | 'blooming-rose'
  | 'thorn-briar'
  | 'knight-shield'
  | 'dragon-ouroboros'
  | 'bone-gravelord'
  | 'gold-filigree'
  | 'runic-arcane'
  | 'iron-warrior'
  | 'elven-nature'
  | 'shadow-necro'
  | 'celestial-holy'
  | 'ancient-parchment'
  | 'royal-ruby';

export interface Character {
  id: string;
  campaignId: string;
  campaignIds?: string[]; // Multiple campaign association / cross-campaign support
  userId?: string; // ID del usuario propietario (Anti-Metagaming)
  ownerUsername?: string; // Nombre del usuario propietario
  name: string;
  playerName: string;
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  multiclass?: MulticlassEntry[];
  background?: string;
  level: number;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  ac: number;
  initiativeBonus: number;
  speed: string;
  passivePerception: number;
  stats: AbilityScores;
  savingThrows?: string[];
  skills?: string[];
  attacks?: CharacterAttack[];
  spellSlots?: Partial<CharacterSpellSlots>;
  spells?: Spell[];
  spellcastingAbility?: 'int' | 'wis' | 'cha';
  racialSpellcastingAbility?: 'int' | 'wis' | 'cha';
  spellSaveDc?: number;
  spellAttackBonus?: number;
  classResources?: ClassResource[];
  alignment?: string;
  personalityTraits?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  backstory?: string;
  notes?: string;
  avatarUrl?: string;
  avatarFrame?: AvatarFrameStyle;
  avatarScale?: number;
  avatarOffsetY?: number;
  gold?: number;
  silver?: number;
  copper?: number;
  platinum?: number;
  inventory?: string[];
  equippedItems?: string[];
  tools?: string[];
  languages?: string[];
  usedHitDice?: number;
  isDraft?: boolean;
  draftStep?: string;
  draftProgress?: number;
  lastSavedAt?: string;
  isRaging?: boolean;
  creatorState?: Record<string, any>;
  classDecisions?: Record<string, any>;
}

export interface StatblockAction {
  name: string;
  desc: string;
}

export interface MonsterStatblock {
  id: string;
  campaignId?: string; // empty or 'global' means shared SRD
  name: string;
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan' | string;
  type: string;
  subtype?: string;
  alignment: string;
  ac: number;
  acDescription?: string; // e.g. "natural armor", "shield"
  hp: number;
  hitDice?: string; // e.g. "2d6"
  speed: string;
  stats: AbilityScores;
  saves?: string;
  skills?: string;
  damageVulnerabilities?: string;
  damageResistances?: string;
  damageImmunities?: string;
  conditionImmunities?: string;
  senses: string;
  languages: string;
  cr: string; // e.g. "1/4", "1/2", "1", "10"
  xp?: number;
  traits?: StatblockAction[];
  actions: StatblockAction[];
  bonusActions?: StatblockAction[];
  reactions?: StatblockAction[];
  legendaryActions?: StatblockAction[];
  spells?: string;
  source?: string;
}

export interface EncounterEnemy {
  monsterId: string;
  customName?: string;
  count: number;
}

export interface Encounter {
  id: string;
  campaignId: string;
  name: string;
  description: string;
  enemies: EncounterEnemy[];
  characterIds?: string[]; // IDs de los PJs participantes en este encuentro específico
  difficulty: 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Deadly';
  totalXp: number;
  adjustedXp: number;
  status: 'planned' | 'active' | 'completed';
}

export interface Combatant {
  id: string;
  name: string;
  type: 'player' | 'monster' | 'npc';
  characterId?: string;
  monsterId?: string;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  ac: number;
  initiative: number;
  conditions: string[];
  notes?: string;
  color?: string;
  avatarUrl?: string;
}

export interface CombatLogEntry {
  id: string;
  timestamp: string;
  round: number;
  actor: string;
  action: string;
  type: 'damage' | 'heal' | 'condition' | 'turn' | 'roll' | 'note' | 'death' | 'spell' | 'attack' | 'system';
  value?: number | string;
}

export interface CombatSession {
  id: string;
  campaignId: string;
  name: string;
  isActive: boolean;
  round: number;
  currentTurnIndex: number;
  combatants: Combatant[];
  logs: CombatLogEntry[];
  createdAt?: string;
}

export interface WorldMapPin {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  description: string;
  type: 'party' | 'city' | 'dungeon' | 'camp' | 'hazard' | 'quest';
  color?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  dmName: string;
  worldMapUrl?: string;
  worldMapPins: WorldMapPin[];
  notes: string; // Retrocompatibilidad (notas privadas del DM)
  dmNotes?: string; // Notas privadas y secretas exclusivas del Dungeon Master
  sharedNotes?: string; // Notas públicas y compartidas entre todos los jugadores de la campaña
  invitedUserIds?: string[]; // IDs de jugadores invitados con acceso a esta campaña
  inviteCode?: string; // Código único para invitar jugadores (ej. SAVIA-ELORIA)
}

export interface AppState {
  campaigns: Campaign[];
  activeCampaignId: string;
  characters: Character[];
  monsters: MonsterStatblock[];
  encounters: Encounter[];
  combatSessions: CombatSession[];
  activeCombatSessionId: string;
}

export interface AppUser {
  id: string;
  username: string;
  password: string;
  role: 'dm' | 'player';
  assignedCharacterIds?: string[];
  invitedCampaignIds?: string[];
  createdAt: string;
}

declare global {
  interface Window {
    electronAPI?: {
      isDesktop: boolean;
      platform: string;
      setZoomFactor: (factor: number) => void;
      getZoomFactor: () => number;
    };
  }
}

