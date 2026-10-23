import React, { useState, useEffect, useMemo } from 'react';
import {
  Character,
  CharacterAttack,
  Spell,
  CharacterSpellSlots,
  SpellSlotLevel,
  AbilityScores,
  ClassResource,
  AvatarFrameStyle,
} from '../types';
import { FantasyAvatarFrame } from './FantasyAvatarFrame';
import { AvatarLightboxModal } from './AvatarLightboxModal';
import {
  WIKIDOT_CLASSES,
  WIKIDOT_RACES,
  FULL_CASTER_SLOTS_TABLE,
  HALF_CASTER_SLOTS_TABLE,
  WARLOCK_PACT_SLOTS_TABLE,
  getMaxSpellLevelForClass,
  WIKIDOT_BACKGROUNDS,
} from '../data/wikidotData';
import {
  OFFICIAL_SPELLS_COMPENDIUM,
  isSpellcasterClass,
} from '../data/spellsData';
import { OFFICIAL_5E_FEATS } from '../data/characterCreatorData';
import { exportCharacterToOfficialPdf } from '../utils/pdfCharacterExporter';
import { SpellDetailModal } from './SpellDetailModal';
import { LevelUpModal } from './LevelUpModal';
import { WeaponPickerModal } from './WeaponPickerModal';
import { ArmorPickerModal } from './ArmorPickerModal';
import { ItemDetailModal } from './ItemDetailModal';
import { SpellPickerModal } from './SpellPickerModal';
import { RestModal, RestResult } from './RestModal';
import { ThemedNotificationModal, ThemedModalType } from './ThemedNotificationModal';
import { RulesInspectorModal, RuleCategory } from './RulesInspectorModal';
import { ALL_5E_SKILLS } from '../data/characterCreatorData';
import {
  calculateCharacterSpeed,
  getExtraAttackInfo,
  generateClassResourcesForCharacter,
  getBarbarianMaxRages,
  getBarbarianRageDamageBonus,
} from '../data/characterRulesEngine';
import {
  calculateEquippedAc,
  findWeaponByName,
  findArmorByName,
  generateAttackFromWeapon,
  parseAttackTypeAndProps,
  WeaponDef,
  ALL_5E_ARMORS,
  isItemEquipable,
} from '../data/weaponsAndArmorData';
import { getWeaponBadgeAsset, getArmorBadgeAsset } from '../utils/equipmentAssets';
import { EquipmentBadge } from './EquipmentBadge';
import {
  WILD_MAGIC_SURGE_TABLE,
  getWildMagicSurgeByRoll,
  rollWildMagicSurge,
  WildMagicSurgeEntry,
} from '../data/wildMagicSurgeData';
import { PolyhedralDie, DieType } from './PolyhedralDie';
import {
  Heart,
  Shield,
  Zap,
  Eye,
  Sword,
  Swords,
  Sparkles,
  BookOpen,
  Award,
  Package,
  User,
  Feather,
  FileText,
  Sliders,
  Settings,
  X,
  Plus,
  Minus,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layout,
  Moon,
  Coffee,
  Search,
  Dices,
  Trash2,
  Lock,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Edit2,
  Save,
  FileDown,
  Flame,
  Info,
} from 'lucide-react';

export type SheetModuleId =
  | 'heroPortrait'
  | 'vitalCombat'
  | 'attributes'
  | 'savingThrows'
  | 'skills'
  | 'attacks'
  | 'spells'
  | 'classFeatures'
  | 'equipment'
  | 'roleplay'
  | 'backstory'
  | 'senses'
  | 'notes';

export interface SheetModuleConfig {
  id: SheetModuleId;
  title: string;
  iconName: string;
  enabled: boolean;
  colSpan: 1 | 2;
  columnZone: 'left' | 'center' | 'right';
}

export type SheetLayoutMode = 'tactical' | 'grid' | 'tabs' | 'single';
export type SheetDensity = 'comfortable' | 'compact';

export interface CustomizableCharacterSheetModalProps {
  character: Character;
  onUpdateCharacter: (updated: Character) => void;
  onEditInCreator?: (char: Character) => void;
  onClose: () => void;
}

const DEFAULT_MODULE_CONFIGS: SheetModuleConfig[] = [
  { id: 'heroPortrait', title: 'Retrato del Héroe', iconName: 'User', enabled: true, colSpan: 1, columnZone: 'left' },
  { id: 'vitalCombat', title: 'Vitalidad & Combate', iconName: 'Heart', enabled: true, colSpan: 2, columnZone: 'center' },
  { id: 'attributes', title: 'Puntuaciones & Salvaciones', iconName: 'Activity', enabled: true, colSpan: 1, columnZone: 'left' },
  { id: 'skills', title: 'Habilidades & Pericias', iconName: 'Target', enabled: true, colSpan: 1, columnZone: 'left' },
  { id: 'attacks', title: 'Ataques & Acciones', iconName: 'Sword', enabled: true, colSpan: 2, columnZone: 'center' },
  { id: 'spells', title: 'Grimorio & Conjuración', iconName: 'Sparkles', enabled: true, colSpan: 2, columnZone: 'center' },
  { id: 'classFeatures', title: 'Rasgos de Clase & Dotes', iconName: 'Award', enabled: true, colSpan: 1, columnZone: 'right' },
  { id: 'equipment', title: 'Inventario & Riqueza', iconName: 'Package', enabled: true, colSpan: 1, columnZone: 'right' },
  { id: 'roleplay', title: 'Identidad, Virtudes & Rol', iconName: 'User', enabled: true, colSpan: 2, columnZone: 'right' },
  { id: 'backstory', title: 'Historia & Pasado del Héroe', iconName: 'Feather', enabled: true, colSpan: 2, columnZone: 'right' },
  { id: 'senses', title: 'Sentidos & Competencias', iconName: 'Eye', enabled: true, colSpan: 1, columnZone: 'left' },
  { id: 'notes', title: 'Diario & Notas Libres', iconName: 'FileText', enabled: true, colSpan: 2, columnZone: 'right' },
];

export const SKILL_DEFINITIONS: { name: string; stat: keyof AbilityScores }[] = [
  { name: 'Acrobacias', stat: 'dex' },
  { name: 'Atletismo', stat: 'str' },
  { name: 'Conocimiento Arcano', stat: 'int' },
  { name: 'Engaño', stat: 'cha' },
  { name: 'Historia', stat: 'int' },
  { name: 'Interpretación', stat: 'cha' },
  { name: 'Intimidación', stat: 'cha' },
  { name: 'Investigación', stat: 'int' },
  { name: 'Juego de Manos', stat: 'dex' },
  { name: 'Medicina', stat: 'wis' },
  { name: 'Naturaleza', stat: 'int' },
  { name: 'Percepción', stat: 'wis' },
  { name: 'Perspicacia', stat: 'wis' },
  { name: 'Persuasión', stat: 'cha' },
  { name: 'Religión', stat: 'int' },
  { name: 'Sigilo', stat: 'dex' },
  { name: 'Supervivencia', stat: 'wis' },
  { name: 'Trato con Animales', stat: 'wis' },
];

export const ABILITY_LABELS: Record<keyof AbilityScores, { name: string; short: string }> = {
  str: { name: 'Fuerza', short: 'FUE' },
  dex: { name: 'Destreza', short: 'DES' },
  con: { name: 'Constitución', short: 'CON' },
  int: { name: 'Inteligencia', short: 'INT' },
  wis: { name: 'Sabiduría', short: 'SAB' },
  cha: { name: 'Carisma', short: 'CAR' },
};

function getMod(val: number): number {
  return Math.floor(((val ?? 10) - 10) / 2);
}

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function formatScoreToMod(score: number): string {
  const m = getMod(score);
  return m >= 0 ? `+${m}` : `${m}`;
}

function getProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

interface DiceRollState {
  isOpen: boolean;
  title: string;
  dieType: DieType;
  bonus: number;
  rollMode: 'normal' | 'advantage' | 'disadvantage';
  dice1: number;
  dice2: number;
  finalDie: number;
  total: number;
  isCrit: boolean;
  isFumble: boolean;
  extraFormula?: string;
  damageTotal?: number;
}

export const CustomizableCharacterSheetModal: React.FC<CustomizableCharacterSheetModalProps> = ({
  character,
  onUpdateCharacter,
  onEditInCreator,
  onClose,
}) => {
  // Local mutable character state for live interaction
  const [charData, setCharData] = useState<Character>(character);

  // Sync state if character prop changes
  useEffect(() => {
    setCharData(character);
  }, [character]);

  const profBonus = useMemo(() => getProficiencyBonus(charData.level), [charData.level]);
  const isCaster = useMemo(() => isSpellcasterClass(charData.class), [charData.class]);

  // Storage key for layout customization per character
  const storageKey = `dnd_sheet_layout_v2_${character.id}`;

  // Customization states
  const [modules, setModules] = useState<SheetModuleConfig[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.modules)) {
          // Merge with any missing modules (prepend so new modules like heroPortrait appear at top)
          const existingIds = new Set(parsed.modules.map((m: SheetModuleConfig) => m.id));
          const missing = DEFAULT_MODULE_CONFIGS.filter((d) => !existingIds.has(d.id));
          return [...missing, ...parsed.modules];
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_MODULE_CONFIGS;
  });

  const [layoutMode, setLayoutMode] = useState<SheetLayoutMode>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.layoutMode) return parsed.layoutMode;
      }
    } catch {
      // fallback
    }
    return 'tactical';
  });

  const [density, setDensity] = useState<SheetDensity>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.density) return parsed.density;
      }
    } catch {
      // fallback
    }
    return 'comfortable';
  });

  const [activeTab, setActiveTab] = useState<SheetModuleId>('vitalCombat');
  const [isCustomizeDrawerOpen, setIsCustomizeDrawerOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);

  // Rest Modal state
  const [isRestModalOpen, setIsRestModalOpen] = useState(false);
  const [activeRestType, setActiveRestType] = useState<'short' | 'long'>('short');

  // Themed Alert & Confirmation Modal state
  const [themedAlert, setThemedAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    subtitle?: string;
    type?: ThemedModalType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  // Magia Salvaje (Wild Magic Surge) states
  const [isWildMagicModalOpen, setIsWildMagicModalOpen] = useState(false);
  const [wildMagicSearch, setWildMagicSearch] = useState('');
  const [wildMagicCategoryFilter, setWildMagicCategoryFilter] = useState<'all' | 'beneficial' | 'detrimental' | 'neutral' | 'chaotic'>('all');
  const [lastRolledSurge, setLastRolledSurge] = useState<{
    roll1: number;
    entry1: WildMagicSurgeEntry;
    roll2?: number;
    entry2?: WildMagicSurgeEntry;
    chosenEntry?: WildMagicSurgeEntry;
  } | null>(null);
  const [manualSurgeInput, setManualSurgeInput] = useState<string>('');

  const announceWildMagicSurge = (entry: WildMagicSurgeEntry, rollNum?: number) => {
    const categoryBadge = {
      beneficial: '✨ Efecto Beneficioso',
      detrimental: '⚠️ Efecto Perjudicial',
      chaotic: '🌀 Efecto Caótico',
      neutral: '🔮 Efecto Mágico Neutro',
    }[entry.category];

    setThemedAlert({
      isOpen: true,
      title: `🌀 ¡Oleada de Magia Salvaje: ${entry.title}! (${entry.rangeStr}${rollNum ? ` • d100 = ${rollNum}` : ''})`,
      subtitle: `${categoryBadge} • Reglas Oficiales de Hechicero`,
      type: entry.category === 'detrimental' ? 'danger' : entry.category === 'beneficial' ? 'success' : 'dice',
      message: (
        <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-fantasy font-bold text-sm text-[#7a328c]">
              Manifestación del Caos Arcano ({entry.rangeStr}):
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#7a328c]/10 text-[#7a328c]">
              {categoryBadge}
            </span>
          </div>
          <p className="leading-relaxed text-[#362514] font-medium">{entry.effect}</p>
        </div>
      ),
    });
  };

  // Export to official PDF handler
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      await exportCharacterToOfficialPdf(charData);
    } catch (err) {
      console.error('Error exportando PDF oficial:', err);
      setThemedAlert({
        isOpen: true,
        title: 'Error de Exportación',
        message: 'Hubo un problema al generar la hoja oficial en PDF. Por favor revisa la consola.',
        type: 'danger',
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Save layout preferences
  const saveLayoutPreferences = (
    newModules: SheetModuleConfig[],
    newLayout: SheetLayoutMode,
    newDensity: SheetDensity
  ) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          modules: newModules,
          layoutMode: newLayout,
          density: newDensity,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleToggleModule = (id: SheetModuleId) => {
    setModules((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m));
      saveLayoutPreferences(updated, layoutMode, density);
      return updated;
    });
  };

  const handleMoveModule = (id: SheetModuleId, direction: 'up' | 'down') => {
    setModules((prev) => {
      const index = prev.findIndex((m) => m.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      saveLayoutPreferences(copy, layoutMode, density);
      return copy;
    });
  };

  const handleToggleColSpan = (id: SheetModuleId) => {
    setModules((prev) => {
      const updated = prev.map((m) =>
        m.id === id ? { ...m, colSpan: m.colSpan === 1 ? (2 as const) : (1 as const) } : m
      );
      saveLayoutPreferences(updated, layoutMode, density);
      return updated;
    });
  };

  const handleResetLayout = () => {
    setModules(DEFAULT_MODULE_CONFIGS);
    setLayoutMode('tactical');
    setDensity('comfortable');
    saveLayoutPreferences(DEFAULT_MODULE_CONFIGS, 'tactical', 'comfortable');
  };

  // Live HP modifiers
  const [quickHpAmount, setQuickHpAmount] = useState<string>('');
  const [tempHpInput, setTempHpInput] = useState<string>('');
  const [isEditingTempHp, setIsEditingTempHp] = useState(false);

  const applyHpChange = (amount: number) => {
    const newHp = Math.max(0, Math.min(charData.maxHp, charData.currentHp + amount));
    const updated = { ...charData, currentHp: newHp };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  const applyCustomHpDelta = (isDamage: boolean) => {
    const val = parseInt(quickHpAmount) || 0;
    if (val <= 0) return;
    if (isDamage) {
      // Deduct from temp HP first if any
      let currentTemp = charData.tempHp || 0;
      let remainingDamage = val;
      if (currentTemp > 0) {
        if (remainingDamage <= currentTemp) {
          currentTemp -= remainingDamage;
          remainingDamage = 0;
        } else {
          remainingDamage -= currentTemp;
          currentTemp = 0;
        }
      }
      const newHp = Math.max(0, charData.currentHp - remainingDamage);
      const updated = { ...charData, currentHp: newHp, tempHp: currentTemp };
      setCharData(updated);
      onUpdateCharacter(updated);
    } else {
      applyHpChange(val);
    }
    setQuickHpAmount('');
  };

  const handleSaveTempHp = () => {
    const val = Math.max(0, parseInt(tempHpInput) || 0);
    const updated = { ...charData, tempHp: val };
    setCharData(updated);
    onUpdateCharacter(updated);
    setIsEditingTempHp(false);
  };

  // Inspiration Toggle
  const [inspiration, setInspiration] = useState<boolean>(false);

  // Death Saves (3 successes, 3 failures)
  const [deathSaves, setDeathSaves] = useState<{ successes: number; failures: number }>({
    successes: 0,
    failures: 0,
  });

  const toggleDeathSave = (type: 'successes' | 'failures', index: number) => {
    setDeathSaves((prev) => {
      const current = prev[type];
      const next = current === index + 1 ? index : index + 1;
      return { ...prev, [type]: next };
    });
  };

  // Spell Slots State
  const initialSpellSlots = useMemo(() => {
    if (charData.spellSlots && Object.keys(charData.spellSlots).length > 0) {
      return charData.spellSlots;
    }
    const className = charData.class.toLowerCase();
    let calculated: Partial<CharacterSpellSlots> = {};
    if (
      className.includes('mago') ||
      className.includes('hechicero') ||
      className.includes('cler') ||
      className.includes('dru') ||
      className.includes('bard')
    ) {
      const row = FULL_CASTER_SLOTS_TABLE[charData.level] || {};
      calculated = Object.fromEntries(
        Object.entries(row).map(([k, max]) => [k, { max, used: 0 }])
      );
    } else if (
      className.includes('palad') ||
      className.includes('explorador') ||
      className.includes('ranger')
    ) {
      const row = HALF_CASTER_SLOTS_TABLE[charData.level] || {};
      calculated = Object.fromEntries(
        Object.entries(row).map(([k, max]) => [k, { max, used: 0 }])
      );
    } else if (className.includes('brujo') || className.includes('warlock')) {
      const pact = WARLOCK_PACT_SLOTS_TABLE[charData.level] || { count: 1, slotLevel: 1 };
      calculated = {
        [`lvl${pact.slotLevel}`]: { max: pact.count, used: 0 },
      };
    }
    return calculated;
  }, [charData.spellSlots, charData.class, charData.level]);

  const [spellSlots, setSpellSlots] = useState<Partial<CharacterSpellSlots>>(initialSpellSlots);

  const toggleSpellSlotUse = (levelKey: keyof CharacterSpellSlots, slotIndex: number) => {
    setSpellSlots((prev) => {
      const current = prev[levelKey] || { max: 0, used: 0 };
      const newUsed = slotIndex < current.used ? current.used - 1 : current.used + 1;
      const updatedSlots = {
        ...prev,
        [levelKey]: { ...current, used: Math.max(0, Math.min(current.max, newUsed)) },
      };
      const updatedChar = { ...charData, spellSlots: updatedSlots };
      setCharData(updatedChar);
      onUpdateCharacter(updatedChar);
      return updatedSlots;
    });
  };

  const handleResetSpellSlots = () => {
    setSpellSlots((prev) => {
      const reset: Partial<CharacterSpellSlots> = {};
      Object.entries(prev).forEach(([key, val]) => {
        if (val) {
          reset[key as keyof CharacterSpellSlots] = { max: val.max, used: 0 };
        }
      });
      const updatedChar = { ...charData, spellSlots: reset };
      setCharData(updatedChar);
      onUpdateCharacter(updatedChar);
      return reset;
    });
  };

  // Short & Long Rest (Interactive with Hit Dice & Virtual/Manual rolls)
  const handleLongRest = () => {
    setActiveRestType('long');
    setIsRestModalOpen(true);
  };

  const handleShortRest = () => {
    setActiveRestType('short');
    setIsRestModalOpen(true);
  };

  const handleConfirmRest = (result: RestResult) => {
    setIsRestModalOpen(false);

    // Spell slots handling
    let nextSpellSlots = charData.spellSlots;
    const isWarlock =
      charData.class.toLowerCase().includes('brujo') ||
      charData.class.toLowerCase().includes('warlock');

    if (result.restType === 'long' || isWarlock) {
      const resetSlots: Partial<CharacterSpellSlots> = {};
      Object.entries(spellSlots).forEach(([key, val]) => {
        if (val) {
          resetSlots[key as keyof CharacterSpellSlots] = { max: val.max, used: 0 };
        }
      });
      setSpellSlots(resetSlots);
      nextSpellSlots = resetSlots;
    }

    if (result.restType === 'long') {
      setDeathSaves({ successes: 0, failures: 0 });
    }

    // Class resources handling (long restores all, short restores short-reset items)
    const updatedRes = effectiveClassResources.map((r) => {
      if (result.restType === 'long' || r.resetOn === 'short') {
        return { ...r, current: r.max };
      }
      return r;
    });

    const updatedChar: Character = {
      ...charData,
      currentHp: result.newHp,
      tempHp: result.restType === 'long' ? 0 : charData.tempHp,
      usedHitDice: result.newUsedHitDice,
      spellSlots: nextSpellSlots,
      classResources: updatedRes,
    };
    setCharData(updatedChar);
    onUpdateCharacter(updatedChar);

    // Themed notification modal
    const restTitle = result.restType === 'long' ? 'Descanso Largo (8h)' : 'Descanso Corto (1h)';
    const totalHd = charData.level || 1;
    const remainingHd = Math.max(0, totalHd - result.newUsedHitDice);

    setThemedAlert({
      isOpen: true,
      title: `¡${restTitle} Completado!`,
      subtitle:
        result.restType === 'long'
          ? 'Tu aventurero despierta completamente renovado.'
          : 'Has tomado un momento de calma para recuperar el aliento y vendarte.',
      type: 'rest',
      message: (
        <div className="space-y-3 text-xs text-[#4a3928]">
          <div className="p-3 bg-[#eadecc]/70 rounded-xl border border-[#cbb396] grid grid-cols-2 gap-3 text-center">
            <div>
              <span className="text-[10px] text-[#7a644e] uppercase font-bold block">Puntos de Golpe</span>
              <span className="text-base font-fantasy font-bold text-[#8c2525]">
                {result.newHp} / {charData.maxHp}
              </span>
              {result.hpRegained > 0 && (
                <span className="text-[10px] text-green-700 block font-semibold">
                  (+{result.hpRegained} PG recuperados)
                </span>
              )}
            </div>
            <div>
              <span className="text-[10px] text-[#7a644e] uppercase font-bold block">Dados de Golpe</span>
              <span className="text-base font-fantasy font-bold text-[#204a6e]">
                {remainingHd} / {totalHd} disp.
              </span>
              {result.hitDiceSpent > 0 && (
                <span className="text-[10px] text-[#8c672b] block font-semibold">
                  ({result.hitDiceSpent} gastados)
                </span>
              )}
            </div>
          </div>

          {result.restType === 'long' ? (
            <p className="text-[11px] text-[#5c4936] leading-relaxed">
              ✨ Se han restaurado por completo todas tus ranuras de conjuro y facultades especiales de clase. Las salvaciones de muerte han sido reiniciadas.
            </p>
          ) : (
            <p className="text-[11px] text-[#5c4936] leading-relaxed">
              ☕ Se han recargado tus recursos de clase que se renuevan en descanso corto (Ki, Puntos de Flujo, Segundo Aire, ranuras de Brujo, etc.).
            </p>
          )}
        </div>
      ),
    });

    if (result.openCantripFormulas) {
      setTimeout(() => {
        setIsCantripFormulasOpen(true);
      }, 350);
    }
  };

  // Dice Roller Modal
  const [diceRoll, setDiceRoll] = useState<DiceRollState>({
    isOpen: false,
    title: '',
    dieType: 'd20',
    bonus: 0,
    rollMode: 'normal',
    dice1: 10,
    dice2: 10,
    finalDie: 10,
    total: 10,
    isCrit: false,
    isFumble: false,
  });

  const [isRollingAnim, setIsRollingAnim] = useState(false);

  const rollDie = (
    title: string,
    bonus: number,
    dieType: DieType = 'd20',
    mode: 'normal' | 'advantage' | 'disadvantage' = 'normal',
    extraFormula?: string
  ) => {
    setIsRollingAnim(true);
    const maxSides =
      dieType === 'd20' ? 20 :
      dieType === 'd12' ? 12 :
      dieType === 'd10' ? 10 :
      dieType === 'd8' ? 8 :
      dieType === 'd6' ? 6 :
      dieType === 'd4' ? 4 : 100;

    const d1 = Math.floor(Math.random() * maxSides) + 1;
    const d2 = Math.floor(Math.random() * maxSides) + 1;
    let chosen = d1;
    if (mode === 'advantage') chosen = Math.max(d1, d2);
    if (mode === 'disadvantage') chosen = Math.min(d1, d2);

    let dmgTotal: number | undefined = undefined;
    if (extraFormula) {
      const cleanFormula = extraFormula.replace(/\s+/g, '');
      const match = cleanFormula.match(/(\d+)d(\d+)(?:([+-]\d+))?/i);
      if (match) {
        const count = parseInt(match[1]) || 1;
        const sides = parseInt(match[2]) || 6;
        const add = match[3] ? parseInt(match[3]) : 0;
        let sum = add;
        for (let i = 0; i < count; i++) {
          sum += Math.floor(Math.random() * sides) + 1;
        }
        dmgTotal = Math.max(1, sum);
      }
    }

    setDiceRoll({
      isOpen: true,
      title,
      dieType,
      bonus,
      rollMode: mode,
      dice1: d1,
      dice2: d2,
      finalDie: chosen,
      total: chosen + bonus,
      isCrit: dieType === 'd20' && chosen === 20,
      isFumble: dieType === 'd20' && chosen === 1,
      extraFormula,
      damageTotal: dmgTotal,
    });

    setTimeout(() => {
      setIsRollingAnim(false);
    }, 550);
  };

  const rollD20 = (
    title: string,
    bonus: number,
    mode: 'normal' | 'advantage' | 'disadvantage' = 'normal',
    extraFormula?: string
  ) => rollDie(title, bonus, 'd20', mode, extraFormula);

  // Rules Inspector Modal & Category
  const [rulesInspectorOpen, setRulesInspectorOpen] = useState(false);
  const [rulesInspectorCategory, setRulesInspectorCategory] = useState<RuleCategory>('ac');

  const openRulesInspector = (category: RuleCategory = 'ac') => {
    setRulesInspectorCategory(category);
    setRulesInspectorOpen(true);
  };

  // Ability & Feature Inspector Modal
  const [inspectFeatureModal, setInspectFeatureModal] = useState<{
    isOpen: boolean;
    title: string;
    badge?: string;
    classTag?: string;
    summary: string;
    rules: string[];
    mechanics?: { label: string; value: string }[];
    tips?: string[];
  } | null>(null);

  const openFeatureInspector = (data: {
    title: string;
    badge?: string;
    classTag?: string;
    summary: string;
    rules: string[];
    mechanics?: { label: string; value: string }[];
    tips?: string[];
  }) => {
    setInspectFeatureModal({
      isOpen: true,
      ...data,
    });
  };

  // Skill Sorting & Filtering
  const [skillSortMode, setSkillSortMode] = useState<'stat' | 'alpha' | 'bonus'>('stat');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [selectedSkillForDetail, setSelectedSkillForDetail] = useState<string | null>(null);

  // Spell Detail Modal
  const [selectedSpellDetail, setSelectedSpellDetail] = useState<Spell | null>(null);
  const [spellSearchTerm, setSpellSearchTerm] = useState('');
  const [spellSchoolFilter, setSpellSchoolFilter] = useState('all');

  // Inventory & Wealth Management
  const initialCoins = useMemo(() => {
    // Check direct character coin fields first
    if (charData.gold !== undefined || charData.silver !== undefined || charData.copper !== undefined || charData.platinum !== undefined) {
      return {
        cp: charData.copper ?? 0,
        sp: charData.silver ?? 0,
        ep: 0,
        gp: charData.gold ?? 0,
        pp: charData.platinum ?? 0,
      };
    }
    // Check if notes contains starting coins
    const goldMatch = charData.notes?.match(/Monedas:\s*(\d+)\s*po/i);
    const silverMatch = charData.notes?.match(/(\d+)\s*(?:sp|piezas?\s+de\s+plata|pp\s*\(pieza\s+de\s+plata\))/i);
    const initialGold = goldMatch ? parseInt(goldMatch[1], 10) : 15;
    const initialSilver = silverMatch ? parseInt(silverMatch[1], 10) : 0;
    return {
      cp: 0,
      sp: initialSilver,
      ep: 0,
      gp: initialGold,
      pp: 0,
    };
  }, [charData.gold, charData.silver, charData.copper, charData.platinum, charData.notes]);

  const [coins, setCoins] = useState(initialCoins);
  const [newItemName, setNewItemName] = useState('');
  const [customItems, setCustomItems] = useState<string[]>(() => {
    if (charData.inventory && charData.inventory.length > 0) {
      return charData.inventory;
    }
    const items: string[] = [];
    if (charData.notes) {
      const match = charData.notes.match(/Inventario & Riqueza Inicial:\n([\s\S]*?)(?:\n\n|$)/);
      if (match && match[1]) {
        match[1]
          .split('\n')
          .filter((l: string) => (l.trim().startsWith('•') || l.trim().startsWith('-')) && !l.toLowerCase().includes('monedas:'))
          .forEach((l: string) => items.push(l.replace(/^[•\-]\s*/, '').trim()));
      }
    }
    return items.length > 0
      ? items
      : ['Mochila de aventurero', 'Raciones de viaje (5 días)', 'Odre con agua', 'Yesquero y pedernal'];
  });

  const [equippedItems, setEquippedItems] = useState<string[]>(() => {
    if (charData.equippedItems && charData.equippedItems.length > 0) {
      return charData.equippedItems.filter(isItemEquipable);
    }
    const detected: string[] = [];
    let detectedArmor = false;
    const itemsToScan = charData.inventory && charData.inventory.length > 0 ? charData.inventory : [];
    itemsToScan.forEach((it) => {
      if (!isItemEquipable(it)) return;
      const armor = findArmorByName(it);
      if (armor) {
        if (armor.category === 'shield') {
          detected.push(it);
        } else if (!detectedArmor) {
          detected.push(it);
          detectedArmor = true;
        }
        return;
      }
      const weapon = findWeaponByName(it);
      if (weapon && detected.filter((d) => findWeaponByName(d)).length < 2) {
        detected.push(it);
      }
    });
    return detected;
  });

  const [isWeaponPickerOpen, setIsWeaponPickerOpen] = useState(false);
  const [isArmorPickerOpen, setIsArmorPickerOpen] = useState(false);
  const [isSpellPickerOpen, setIsSpellPickerOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<string | null>(null);

  // Avatar Lightbox & Fantasy Frame Customizer Modal
  const [isAvatarLightboxOpen, setIsAvatarLightboxOpen] = useState(false);

  const handleUpdateAvatarFrame = (newFrame: AvatarFrameStyle) => {
    const updated = {
      ...charData,
      avatarFrame: newFrame,
    };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  const handleUpdateAvatarUrl = (newAvatarUrl: string) => {
    const updated = {
      ...charData,
      avatarUrl: newAvatarUrl,
    };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  const handleUpdateAvatarAdjustments = (scale: number, offsetY: number) => {
    const updated = {
      ...charData,
      avatarScale: scale,
      avatarOffsetY: offsetY,
    };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  // Cantrip Formulas (Wizard Level 3+ / Tasha's optional rule)
  const [isCantripFormulasOpen, setIsCantripFormulasOpen] = useState(false);
  const [cantripToSwapSheet, setCantripToSwapSheet] = useState<string>('');
  const [newCantripSelectedSheet, setNewCantripSelectedSheet] = useState<Spell | null>(null);

  const wizardCantripsForSheet = useMemo(() => {
    return OFFICIAL_SPELLS_COMPENDIUM.filter((sp) => {
      if (sp.level !== 0) return false;
      return (sp.classes || []).some((c) => {
        const cLower = c.toLowerCase();
        return cLower.includes('mago') || cLower.includes('wizard');
      });
    });
  }, []);

  const handleConfirmCantripSwap = () => {
    if (!cantripToSwapSheet || !newCantripSelectedSheet) {
      setThemedAlert({
        isOpen: true,
        title: 'Selección Incompleta',
        subtitle: 'Fórmulas de Trucos del Mago',
        type: 'warning',
        message: 'Por favor selecciona el truco que deseas reemplazar y el nuevo truco que aprenderás.',
      });
      return;
    }
    const updatedSpells = (charData.spells || []).filter((s) => s.name !== cantripToSwapSheet);
    updatedSpells.push(newCantripSelectedSheet);
    const updatedNotes =
      (charData.notes || '') +
      `\n[Descanso Largo] Fórmulas de Trucos: Se reemplazó el truco "${cantripToSwapSheet}" por "${newCantripSelectedSheet.name}".`;
    const updated = {
      ...charData,
      spells: updatedSpells,
      notes: updatedNotes.trim(),
    };
    setCharData(updated);
    onUpdateCharacter(updated);
    setIsCantripFormulasOpen(false);
    setCantripToSwapSheet('');
    setNewCantripSelectedSheet(null);
    setThemedAlert({
      isOpen: true,
      title: '¡Fórmulas Arcanas Reconfiguradas!',
      subtitle: 'Grimorio de Mago (Tasha)',
      type: 'success',
      message: `Has consultado con éxito las fórmulas de tu libro de conjuros. Ahora tienes preparado "${newCantripSelectedSheet.name}" en lugar de "${cantripToSwapSheet}".`,
    });
  };

  // Handle ESC key to dismiss topmost open modals/panels or close character sheet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      // Close topmost dialogs/modals in priority order
      if (themedAlert.isOpen) {
        setThemedAlert((prev) => ({ ...prev, isOpen: false }));
        return;
      }
      if (inspectFeatureModal) {
        setInspectFeatureModal(null);
        return;
      }
      if (rulesInspectorOpen) {
        setRulesInspectorOpen(false);
        return;
      }
      if (diceRoll.isOpen) {
        setDiceRoll((prev) => ({ ...prev, isOpen: false }));
        return;
      }
      if (selectedSpellDetail) {
        setSelectedSpellDetail(null);
        return;
      }
      if (isCantripFormulasOpen) {
        setIsCantripFormulasOpen(false);
        return;
      }
      if (isSpellPickerOpen) {
        setIsSpellPickerOpen(false);
        return;
      }
      if (isArmorPickerOpen) {
        setIsArmorPickerOpen(false);
        return;
      }
      if (isWeaponPickerOpen) {
        setIsWeaponPickerOpen(false);
        return;
      }
      if (isWildMagicModalOpen) {
        setIsWildMagicModalOpen(false);
        return;
      }
      if (isRestModalOpen) {
        setIsRestModalOpen(false);
        return;
      }
      if (isLevelUpOpen) {
        setIsLevelUpOpen(false);
        return;
      }
      if (isAvatarLightboxOpen) {
        setIsAvatarLightboxOpen(false);
        return;
      }
      if (isCustomizeDrawerOpen) {
        setIsCustomizeDrawerOpen(false);
        return;
      }

      // If no submodal or drawer is open, close main character sheet
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    themedAlert.isOpen,
    inspectFeatureModal,
    rulesInspectorOpen,
    diceRoll.isOpen,
    selectedSpellDetail,
    isCantripFormulasOpen,
    isSpellPickerOpen,
    isArmorPickerOpen,
    isWeaponPickerOpen,
    isWildMagicModalOpen,
    isRestModalOpen,
    isLevelUpOpen,
    isCustomizeDrawerOpen,
    isAvatarLightboxOpen,
    onClose,
  ]);

  // Dynamic AC calculation based on equipped items
  const currentAc = useMemo(() => {
    return calculateEquippedAc({
      equippedItems,
      stats: charData.stats,
      characterClass: charData.class,
      raceId: charData.race,
      fightingStyle: charData.notes?.match(/Estilo de Combate:\s*([^\n]+)/i)?.[1] || '',
      hasDualWielderFeat: charData.notes?.toLowerCase().includes('combatiente con dos armas') || false,
    });
  }, [equippedItems, charData.stats, charData.class, charData.race, charData.notes]);

  const equippedArmor = useMemo(() => {
    for (const it of equippedItems) {
      const a = findArmorByName(it);
      if (a && a.category !== 'shield') return a;
    }
    return null;
  }, [equippedItems]);

  const hasEquippedShield = useMemo(() => {
    return equippedItems.some((it) => {
      const a = findArmorByName(it);
      return a && a.category === 'shield';
    });
  }, [equippedItems]);

  // Dynamic Speed calculation based on equipped items and class features (Fast movement, Unarmored movement, etc.)
  const effectiveSpeed = useMemo(() => {
    return calculateCharacterSpeed({
      baseSpeed: charData.speed,
      characterClass: charData.class,
      level: charData.level,
      equippedItems,
      notes: charData.notes,
      raceName: charData.race,
      strength: charData.stats.str,
    });
  }, [charData.speed, charData.class, charData.level, equippedItems, charData.notes, charData.race, charData.stats.str]);

  // Extra Attack Detection
  const extraAttackInfo = useMemo(() => {
    if (charData.multiclass && charData.multiclass.length > 1) {
      let best = { hasExtraAttack: false, attacksCount: 1, label: '' };
      for (const mc of charData.multiclass) {
        const info = getExtraAttackInfo(mc.className, mc.level, mc.subclass);
        if (info.hasExtraAttack && info.attacksCount > (best.attacksCount || 1)) {
          best = info;
        }
      }
      return best;
    }
    return getExtraAttackInfo(charData.class, charData.level, charData.subclass);
  }, [charData.multiclass, charData.class, charData.level, charData.subclass]);

  // Class Resources (Furia, Ki, Segundo Aliento, etc.)
  const effectiveClassResources = useMemo(() => {
    if (charData.multiclass && charData.multiclass.length > 1) {
      const combinedRes: ClassResource[] = [];
      for (const mc of charData.multiclass) {
        const mcRes = generateClassResourcesForCharacter(
          mc.className,
          mc.level,
          charData.stats,
          charData.classResources,
          mc.subclass
        );
        for (const r of mcRes) {
          if (!combinedRes.some((x) => x.name.toLowerCase() === r.name.toLowerCase())) {
            combinedRes.push(r);
          }
        }
      }
      return combinedRes;
    }
    return generateClassResourcesForCharacter(
      charData.class,
      charData.level,
      charData.stats,
      charData.classResources,
      charData.subclass
    );
  }, [charData.multiclass, charData.class, charData.level, charData.stats, charData.classResources, charData.subclass]);

  const handleUpdateResourceCurrent = (resId: string, delta: number) => {
    const updatedRes = effectiveClassResources.map((r) => {
      if (r.id === resId) {
        return {
          ...r,
          current: Math.max(0, Math.min(r.max, r.current + delta)),
        };
      }
      return r;
    });
    const updated = { ...charData, classResources: updatedRes };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  const handleRestResources = (restType: 'short' | 'long') => {
    const updatedRes = effectiveClassResources.map((r) => {
      if (restType === 'long' || r.resetOn === 'short') {
        return { ...r, current: r.max };
      }
      return r;
    });
    const updated = {
      ...charData,
      isRaging: restType === 'long' ? false : charData.isRaging,
      classResources: updatedRes,
    };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  // Barbarian Rage quick toggle inside the sheet modal
  const handleToggleRage = () => {
    const isBarbarian = (charData.class || '').toLowerCase().includes('barb') || 
                        (charData.class || '').toLowerCase().includes('bárbaro');
    if (!isBarbarian) return;

    const barbarianLevel = charData.level || 1;
    const maxRages = getBarbarianMaxRages(barbarianLevel);
    const rageDmg = getBarbarianRageDamageBonus(barbarianLevel);
    const nextRaging = !charData.isRaging;

    let currentResources = [...(charData.classResources || [])];
    let rageResIndex = currentResources.findIndex((r) => r.id === 'res-furia');

    if (rageResIndex === -1) {
      currentResources.push({
        id: 'res-furia',
        name: 'Usos de Furia (Rage)',
        current: maxRages,
        max: maxRages,
        resetOn: 'long',
        description: `+${rageDmg} al daño cuerpo a cuerpo con FUE, ventaja en pruebas de Fuerza y resistencia a daño contundente, cortante y perforante.${barbarianLevel >= 20 ? ' (Furia ilimitada a Nivel 20)' : ''}`,
      });
      rageResIndex = currentResources.length - 1;
    }

    const currentAvailable = currentResources[rageResIndex].current;

    if (nextRaging) {
      if (currentAvailable <= 0 && maxRages !== 999) {
        setThemedAlert({
          isOpen: true,
          title: 'Sin Usos de Furia',
          subtitle: 'Furia Primitiva Agotada',
          type: 'warning',
          message: '¡No te quedan usos de Furia disponibles! Realiza un descanso largo para recuperarlos.',
        });
        return;
      }
      const newCurrent = maxRages === 999 ? 999 : Math.max(0, currentAvailable - 1);
      currentResources[rageResIndex] = {
        ...currentResources[rageResIndex],
        current: newCurrent,
      };
      const updated = {
        ...charData,
        isRaging: true,
        classResources: currentResources,
      };
      setCharData(updated);
      onUpdateCharacter(updated);
    } else {
      const updated = {
        ...charData,
        isRaging: false,
        classResources: currentResources,
      };
      setCharData(updated);
      onUpdateCharacter(updated);
    }
  };

  const handleToggleEquipItem = (itemName: string) => {
    const isEquipped = equippedItems.includes(itemName);
    if (!isEquipped && !isItemEquipable(itemName)) return;
    let nextEquipped: string[];

    if (isEquipped) {
      nextEquipped = equippedItems.filter((i) => i !== itemName);
    } else {
      const armor = findArmorByName(itemName);
      if (armor && armor.category !== 'shield') {
        const nonArmors = equippedItems.filter((i) => {
          const a = findArmorByName(i);
          return !a || a.category === 'shield';
        });
        nextEquipped = [...nonArmors, itemName];
      } else {
        nextEquipped = [...equippedItems, itemName];
      }

      // If it's a weapon, add attack if missing
      const weapon = findWeaponByName(itemName);
      if (weapon) {
        const profBonus = Math.floor((charData.level - 1) / 4) + 2;
        const newAttack = generateAttackFromWeapon(weapon, charData.stats, profBonus, true);
        const currentAttacks = charData.attacks || [];
        if (!currentAttacks.some((a) => a.name.toLowerCase() === newAttack.name.toLowerCase())) {
          const updatedAttacks = [...currentAttacks, newAttack];
          setCharData((prev) => ({ ...prev, attacks: updatedAttacks }));
          onUpdateCharacter({ ...charData, attacks: updatedAttacks });
        }
      }
    }

    setEquippedItems(nextEquipped);

    const nextAc = calculateEquippedAc({
      equippedItems: nextEquipped,
      stats: charData.stats,
      characterClass: charData.class,
      raceId: charData.race,
      fightingStyle: charData.notes?.match(/Estilo de Combate:\s*([^\n]+)/i)?.[1] || '',
      hasDualWielderFeat: charData.notes?.toLowerCase().includes('combatiente con dos armas') || false,
    });

    const nextSpeed = calculateCharacterSpeed({
      baseSpeed: charData.speed,
      characterClass: charData.class,
      level: charData.level,
      equippedItems: nextEquipped,
      notes: charData.notes,
      raceName: charData.race,
      strength: charData.stats.str,
    });

    const updatedChar: Character = {
      ...charData,
      ac: nextAc,
      speed: nextSpeed.speedStr,
      equippedItems: nextEquipped,
      inventory: customItems,
    };
    setCharData(updatedChar);
    onUpdateCharacter(updatedChar);
  };

  const handleAddCustomItem = (nameToAdd?: string) => {
    const name = (nameToAdd || newItemName).trim();
    if (!name) return;
    const updated = [...customItems, name];
    setCustomItems(updated);
    setNewItemName('');
    const updatedChar = { ...charData, inventory: updated };
    setCharData(updatedChar);
    onUpdateCharacter(updatedChar);
  };

  const handleRemoveCustomItem = (index: number) => {
    const itemToRemove = customItems[index];
    const updated = customItems.filter((_, i) => i !== index);
    const updatedEquipped = equippedItems.filter((it) => it !== itemToRemove);
    setCustomItems(updated);
    setEquippedItems(updatedEquipped);

    const nextAc = calculateEquippedAc({
      equippedItems: updatedEquipped,
      stats: charData.stats,
      characterClass: charData.class,
      raceId: charData.race,
      fightingStyle: charData.notes?.match(/Estilo de Combate:\s*([^\n]+)/i)?.[1] || '',
      hasDualWielderFeat: charData.notes?.toLowerCase().includes('combatiente con dos armas') || false,
    });

    const nextSpeed = calculateCharacterSpeed({
      baseSpeed: charData.speed,
      characterClass: charData.class,
      level: charData.level,
      equippedItems: updatedEquipped,
      notes: charData.notes,
      raceName: charData.race,
      strength: charData.stats.str,
    });

    const updatedChar: Character = {
      ...charData,
      ac: nextAc,
      speed: nextSpeed.speedStr,
      inventory: updated,
      equippedItems: updatedEquipped,
    };
    setCharData(updatedChar);
    onUpdateCharacter(updatedChar);
  };

  const handleAddSpell = (spell: Spell) => {
    const current = charData.spells || [];
    if (current.some((s) => s.name.toLowerCase() === spell.name.toLowerCase())) return;
    const updatedSpells = [...current, spell];
    const updated = { ...charData, spells: updatedSpells };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  const handleRemoveSpell = (spellName: string) => {
    const current = charData.spells || [];
    const updatedSpells = current.filter((s) => s.name.toLowerCase() !== spellName.toLowerCase());
    const updated = { ...charData, spells: updatedSpells };
    setCharData(updated);
    onUpdateCharacter(updated);
  };

  // Editable Roleplay & Notes in-place
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [playerNotes, setPlayerNotes] = useState(charData.notes || '');

  const handleSaveNotes = () => {
    const updated = { ...charData, notes: playerNotes };
    setCharData(updated);
    onUpdateCharacter(updated);
    setIsEditingNotes(false);
  };

  // Class & Subclass lookup for rich features
  const classObj = useMemo(() => {
    return (
      WIKIDOT_CLASSES.find(
        (c) =>
          c.name.toLowerCase() === charData.class.toLowerCase() ||
          c.id === charData.class.toLowerCase()
      ) || WIKIDOT_CLASSES[3]
    );
  }, [charData.class]);

  const raceObj = useMemo(() => {
    return (
      WIKIDOT_RACES.find(
        (r) =>
          r.name.toLowerCase() === charData.race.toLowerCase() ||
          r.id === charData.race.toLowerCase()
      ) || WIKIDOT_RACES[0]
    );
  }, [charData.race]);

  const backgroundObj = useMemo(() => {
    return WIKIDOT_BACKGROUNDS.find(
      (b) =>
        b.name.toLowerCase().includes(charData.background?.toLowerCase() || '') ||
        b.id === charData.background?.toLowerCase()
    );
  }, [charData.background]);

  // Class features unlocked at current level
  const unlockedClassFeatures = useMemo(() => {
    return (classObj.featuresByLevel || []).filter((f) => f.level <= charData.level);
  }, [classObj, charData.level]);

  // Subclass features unlocked
  const unlockedSubclassFeatures = useMemo(() => {
    if (!charData.subclass) return [];
    const sub = classObj.subclasses.find(
      (s) =>
        s.name.toLowerCase().includes(charData.subclass?.toLowerCase() || '') ||
        charData.subclass?.toLowerCase().includes(s.name.toLowerCase())
    );
    return (sub?.features || []).filter((f) => f.level <= charData.level);
  }, [classObj, charData.subclass, charData.level]);

  // Identified feats from notes or official list
  const identifiedFeats = useMemo(() => {
    const feats: any[] = [];
    OFFICIAL_5E_FEATS.forEach((feat) => {
      if (charData.notes && charData.notes.includes(feat.name)) {
        feats.push(feat);
      }
    });
    return feats;
  }, [charData.notes]);

  // Spellcasting stats
  const spellAbility = useMemo<keyof AbilityScores>(() => {
    if (charData.spellcastingAbility) return charData.spellcastingAbility;
    if (classObj.spellcastingAbility) return classObj.spellcastingAbility;
    // For non-casters with racial/feat/item spells, pick their best mental stat
    const { int, wis, cha } = charData.stats;
    if (cha >= wis && cha >= int) return 'cha';
    if (wis >= int) return 'wis';
    return 'int';
  }, [charData.spellcastingAbility, classObj, charData.stats]);

  const calculatedSpellDc = useMemo(() => {
    return charData.spellSaveDc || 8 + profBonus + getMod(charData.stats[spellAbility]);
  }, [charData.spellSaveDc, profBonus, charData.stats, spellAbility]);

  const calculatedSpellAttack = useMemo(() => {
    return charData.spellAttackBonus || profBonus + getMod(charData.stats[spellAbility]);
  }, [charData.spellAttackBonus, profBonus, charData.stats, spellAbility]);

  // Filtered spells
  const filteredSpellsList = useMemo(() => {
    const list = charData.spells || [];
    return list.filter((sp) => {
      const matchName =
        !spellSearchTerm.trim() ||
        sp.name.toLowerCase().includes(spellSearchTerm.toLowerCase());
      const matchSchool =
        spellSchoolFilter === 'all' ||
        sp.school.toLowerCase().includes(spellSchoolFilter.toLowerCase());
      return matchName && matchSchool;
    });
  }, [charData.spells, spellSearchTerm, spellSchoolFilter]);

  // Exact HP Bar Percentage (0 to 100%)
  const hpPercent = Math.max(0, Math.min(100, Math.round((charData.currentHp / (charData.maxHp || 1)) * 100)));

  // --------------------------------------------------------------------------
  // CUSTOM FORGED SMALL BUTTON HELPER FOR SECTION HEADERS
  // --------------------------------------------------------------------------
  const renderHeaderSmallButton = (opts: {
    onClick: () => void;
    label: React.ReactNode;
    icon?: React.ReactNode;
    title?: string;
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={opts.onClick}
      title={opts.title}
      className="relative px-3 sm:px-3.5 py-1.5 min-h-[28px] flex items-center justify-center gap-1.5 bg-no-repeat transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer select-none shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
      style={{
        backgroundImage: `url(${
          opts.active ? '/assets/ui/sheet_small_btn_active.png' : '/assets/ui/sheet_small_btn.png'
        })`,
        backgroundSize: '100% 100%',
      }}
    >
      {opts.icon}
      <span
        className={`font-fantasy font-bold text-[9px] sm:text-[9.5px] uppercase tracking-wider leading-none whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] ${
          opts.active ? 'text-[#fff8e7]' : 'text-[#f3dfb1]'
        }`}
      >
        {opts.label}
      </span>
    </button>
  );

  // --------------------------------------------------------------------------
  // CUSTOM 3-SLICE SCROLL SECTION HEADER PLAQUE (No Icons, No Text Truncation, Seamless 3-Slice)
  // --------------------------------------------------------------------------
  const renderScrollSectionHeader = (
    _icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightContent?: React.ReactNode
  ) => (
    <div className="space-y-1 mb-1.5">
      <div className="relative w-full min-h-[36px] sm:min-h-[38px] flex items-stretch select-none drop-shadow-[0_3px_8px_rgba(24,14,6,0.4)]">
        {/* Seamless Non-Stretching 3-Slice Background Layer */}
        <div className="absolute inset-0 flex items-stretch pointer-events-none z-0 overflow-hidden rounded-md">
          <img
            src="/assets/ui/sheet_header_left.png"
            alt=""
            draggable={false}
            style={{ aspectRatio: '142 / 228' }}
            className="h-full w-auto object-fill shrink-0 select-none"
          />
          <div
            className="flex-1 h-full bg-no-repeat -mx-[1px]"
            style={{
              backgroundImage: 'url(/assets/ui/sheet_header_center.png)',
              backgroundSize: '100% 100%',
            }}
          />
          <img
            src="/assets/ui/sheet_header_right.png"
            alt=""
            draggable={false}
            style={{ aspectRatio: '142 / 228' }}
            className="h-full w-auto object-fill shrink-0 select-none"
          />
        </div>

        {/* Foreground Content Layer: Full Visible Text on Left, Forged Small Buttons on Right */}
        <div className="relative z-10 w-full px-3.5 sm:px-4 py-1 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-fantasy font-bold text-[11px] sm:text-xs text-[#f3dfb1] uppercase tracking-wider leading-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[9px] text-[#cbb695] leading-none mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate">
                {subtitle}
              </p>
            )}
          </div>
          {rightContent && (
            <div className="ml-auto flex items-center justify-end gap-1.5 shrink-0">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // RENDER WIDGET DISPATCHER
  // --------------------------------------------------------------------------
  const renderWidget = (modId: SheetModuleId) => {
    switch (modId) {
      // ----------------------------------------------------------------------
      // 0. HERO PORTRAIT MODULE (Clean Portrait Card Without Redundant Top Header)
      // ----------------------------------------------------------------------
      case 'heroPortrait': {
        const cleanSubrace =
          charData.subrace && charData.subrace.toLowerCase() !== charData.race.toLowerCase()
            ? charData.subrace.toLowerCase().includes(charData.race.toLowerCase())
              ? charData.subrace
              : `${charData.race} (${charData.subrace})`
            : charData.race;
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-2 sm:p-2.5 shadow-sm">
            <div className="flex items-center gap-2.5 py-1.5 px-2 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] shadow-inner">
              <div className="relative shrink-0">
                <FantasyAvatarFrame
                  avatarUrl={charData.avatarUrl}
                  name={charData.name}
                  level={charData.level}
                  frameStyle={charData.avatarFrame || 'frame-royal-gold'}
                  size="sm"
                  onClick={() => setIsAvatarLightboxOpen(true)}
                  showLevelBadge={true}
                  showExpandHint={true}
                  avatarScale={charData.avatarScale}
                  avatarOffsetY={charData.avatarOffsetY}
                />
              </div>

              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="font-fantasy font-bold text-xs sm:text-sm text-[#362514] uppercase tracking-wider leading-tight truncate">
                  {charData.name}
                </div>
                <div className="text-[10px] font-serif italic text-[#5e4e3e] leading-tight truncate">
                  {cleanSubrace} • {charData.class}
                  {charData.subclass ? ` (${charData.subclass})` : ''}
                </div>
                <div className="flex items-center gap-1 pt-0.5 flex-wrap">
                  <span className="text-[9px] font-fantasy font-bold bg-[#ede1ce] text-[#5c4217] px-1.5 py-0.2 rounded-full border border-[#b89b6a]">
                    Nv {charData.level}
                  </span>
                  <span className="text-[9px] font-serif bg-[#ede1ce] text-[#5c4217] px-1.5 py-0.2 rounded-full border border-[#b89b6a] truncate max-w-[70px]">
                    {charData.alignment || 'Neutral'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAvatarLightboxOpen(true)}
                    className="ml-auto text-[9.5px] font-fantasy font-bold text-[#8c672b] hover:text-[#5c4217] flex items-center gap-0.5 cursor-pointer"
                    title="Personalizar retrato o marco"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#ffd56b]" /> Marco
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'vitalCombat':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-2.5 sm:p-3 shadow-sm space-y-2.5">
            {renderScrollSectionHeader(
              null,
              'Vitalidad & Combate',
              undefined,
              <>
                {renderHeaderSmallButton({
                  onClick: () => openRulesInspector('ac'),
                  label: 'Reglas',
                  icon: <Search className="w-3 h-3 text-[#d4ab59]" />,
                  title: 'Auditor de Reglas: Consulta el desglose matemático oficial y reglas aplicadas',
                })}
                {renderHeaderSmallButton({
                  onClick: () => setInspiration((prev) => !prev),
                  label: inspiration ? '¡Inspiración!' : 'Inspiración',
                  active: inspiration,
                  icon: (
                    <img
                      src="/assets/ui/wax_seal_red.png"
                      alt=""
                      className={`w-3.5 h-3.5 object-contain ${
                        inspiration ? 'scale-110' : 'opacity-75 grayscale'
                      }`}
                    />
                  ),
                  title: 'Sello de Inspiración otorgado por el DM para ganar ventaja en una tirada',
                })}
              </>
            )}

            {/* Core Stats Row with Forged Heraldic AC Shield & Octagonal Runic Stat Crests */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* AC Card with Forged Knight Shield Asset */}
              <div
                onClick={() => openRulesInspector('ac')}
                className="bg-[#f5ede0]/85 rounded-xl p-2.5 border border-[#b89b6a] flex flex-col items-center justify-between text-center shadow-xs group hover:border-[#8c672b] hover:bg-[#ede1ce] transition cursor-pointer min-w-0"
                title="Armadura (CA): Clic para consultar desglose y reglas oficiales de CA"
              >
                <div className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider truncate w-full">
                  Armadura (CA)
                </div>
                <div className="relative w-12 h-13 my-0.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/ui/badge_shield_ac.png"
                    alt="CA"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-lg font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] leading-none -mt-0.5">
                    {currentAc}
                  </span>
                </div>
                <div className="text-[9.5px] text-[#5e4e3e] font-semibold leading-tight line-clamp-1 px-0.5">
                  {equippedArmor ? equippedArmor.name.split('(')[0].trim() : 'Sin armadura'}
                  {hasEquippedShield ? ' + Escudo' : ''}
                </div>
              </div>

              {/* Initiative Card with Forged Octagonal Crest Asset */}
              <div
                onClick={() =>
                  rollD20(
                    `Iniciativa de ${charData.name}`,
                    charData.initiativeBonus
                  )
                }
                className="bg-[#f5ede0]/85 rounded-xl p-2.5 border border-[#b89b6a] flex flex-col items-center justify-between text-center shadow-xs hover:border-[#8c672b] hover:bg-[#ede1ce] transition cursor-pointer group min-w-0"
                title="Iniciativa: Haz clic para tirar 1d20 de iniciativa"
              >
                <div className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider truncate w-full">
                  Iniciativa 🎲
                </div>
                <div className="relative w-12 h-12 my-0.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt="Iniciativa"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] leading-none">
                    {charData.initiativeBonus >= 0 ? `+${charData.initiativeBonus}` : charData.initiativeBonus}
                  </span>
                </div>
                <div className="text-[9.5px] font-fantasy text-[#6b5233] font-semibold truncate">
                  Tirar d20
                </div>
              </div>

              {/* Speed Card with Forged Octagonal Crest Asset */}
              <div
                onClick={() => openRulesInspector('speed')}
                className="bg-[#f5ede0]/85 rounded-xl p-2.5 border border-[#b89b6a] flex flex-col items-center justify-between text-center shadow-xs group hover:border-[#8c672b] hover:bg-[#ede1ce] transition cursor-pointer min-w-0"
                title="Velocidad: Clic para ver desglose, reglas de saltos y terreno"
              >
                <div className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider truncate w-full">
                  Velocidad
                </div>
                <div className="relative w-12 h-12 my-0.5 flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt="Velocidad"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-sm font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] leading-none">
                    {effectiveSpeed.speedFeet}
                  </span>
                  <span className="relative z-10 text-[7.5px] font-fantasy font-bold uppercase text-[#e8d096] tracking-wider leading-none mt-0.5">
                    pies
                  </span>
                </div>
                <div className="text-[9.5px] text-[#5e4e3e] leading-tight line-clamp-1 px-0.5">
                  {effectiveSpeed.speedFeet} pies
                </div>
              </div>

              {/* Proficiency Bonus Card with Forged Octagonal Crest Asset */}
              <div
                onClick={() => openRulesInspector('prof')}
                className="bg-[#f5ede0]/85 rounded-xl p-2.5 border border-[#b89b6a] flex flex-col items-center justify-between text-center shadow-xs group hover:border-[#8c672b] hover:bg-[#ede1ce] transition cursor-pointer min-w-0 overflow-hidden"
                title="Competencia: Clic para ver escala oficial por nivel"
              >
                <div className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider truncate w-full">
                  Competencia
                </div>
                <div className="relative w-12 h-12 my-0.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt="Competencia"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] leading-none">
                    +{profBonus}
                  </span>
                </div>
                <div className="text-[9.5px] text-[#5e4e3e] font-semibold truncate px-0.5">
                  Nivel {charData.level}
                </div>
              </div>
            </div>

            {/* Barbarian Active Rage Banner in Vital Combat */}
            {charData.isRaging && (
              <div className="p-3 bg-gradient-to-r from-[#faeae6] via-[#f7ded7] to-[#faeae6] rounded-xl border-2 border-[#c53d27] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-pulse">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 bg-[#c53d27] text-white rounded-lg shadow-xs shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-fantasy font-bold text-xs text-[#5c1d12] uppercase tracking-wide">
                        ¡Modo Furia Activo!
                      </span>
                      <span className="text-[10px] bg-[#c53d27] text-white px-2 py-0.5 rounded font-mono font-bold">
                        +{charData.level >= 16 ? 4 : charData.level >= 9 ? 3 : 2} Daño CaC (FUE)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#733529] font-medium mt-0.5">
                      🛡️ <strong>Resistencias Activas:</strong> {
                        (charData.subclass || '').toLowerCase().includes('totem') && (charData.classDecisions?.['totemSpirit3']?.includes('totem-oso-3') || charData.notes?.toLowerCase().includes('oso'))
                          ? 'Resistencia a TODO tipo de daño excepto psíquico (Tótem Oso).'
                          : 'Resistencia a daño Contundente, Cortante y Perforante (daño recibido ÷ 2).'
                      }
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleRage}
                  className="px-3 py-1.5 bg-[#5c1d12] hover:bg-[#3d130c] text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto shrink-0 active:scale-95"
                  title="Calmar furia"
                >
                  <Flame className="w-3.5 h-3.5" /> ❄️ Calmar Furia
                </button>
              </div>
            )}

            {/* HP Bar with Sleek Elongated Transparent Glass Vial & Exact Coded Fill Bar */}
            <div className="bg-[#f5ede0]/90 rounded-xl p-2.5 border border-[#b89b6a] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">
                    Puntos de Golpe (PG)
                  </span>
                  {charData.tempHp > 0 && (
                    <span className="text-xs font-mono font-bold bg-[#ebdcc4] text-[#5c4217] px-2 py-0.5 rounded-full border border-[#b88c32]">
                      +{charData.tempHp} temp
                    </span>
                  )}
                </div>

                <div className="font-mono font-bold text-base text-[#2c221a]">
                  <span className="text-lg text-[#8c2e28]">{charData.currentHp}</span> / {charData.maxHp}
                </div>
              </div>

              {/* Sleek Elongated 3-Part Transparent Glass Vial with Exact Coded Liquid Fill Behind Glass */}
              <div className="relative w-full flex items-center select-none py-1 drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]">
                {/* Left Forged Bronze Vial Cap */}
                <img
                  src="/assets/ui/hp_vial_cap_left.png"
                  alt=""
                  draggable={false}
                  className="h-7 sm:h-8 w-auto object-contain shrink-0 z-20 pointer-events-none select-none -mr-2.5"
                />

                {/* Center Elongated Crystal Glass Tube with Exact Coded Progress Bar Inside */}
                <div className="relative flex-1 h-[18px] sm:h-[20px] bg-[#140a09] rounded-xs overflow-hidden border-y border-[#5c4028]/90 shadow-[inset_0_3px_6px_rgba(0,0,0,0.95)]">
                  {/* Exact Coded Crimson Potion Fill Bar */}
                  <div
                    className="h-full transition-all duration-500 ease-out relative"
                    style={{
                      width: `${hpPercent}%`,
                      background:
                        hpPercent <= 25
                          ? 'linear-gradient(180deg, #ff6b5b 0%, #c9241b 45%, #6e0d08 100%)'
                          : hpPercent <= 50
                          ? 'linear-gradient(180deg, #f97352 0%, #b91c1c 45%, #631010 100%)'
                          : 'linear-gradient(180deg, #ff5a60 0%, #b81422 45%, #5e0810 100%)',
                      boxShadow: '0 0 12px rgba(220,38,38,0.65), inset 0 1px 2px rgba(255,220,220,0.65)',
                    }}
                  >
                    {/* Glowing Liquid Meniscus Edge */}
                    {hpPercent > 0 && hpPercent < 100 && (
                      <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ffd5d5] via-[#ff7a7a] to-[#991b1b] shadow-[0_0_6px_#ff8080]" />
                    )}
                  </div>

                  {/* Transparent Alchemical Crystal Glass Cylinder Overlay (Specular Glare & Rim Shadows) */}
                  <img
                    src="/assets/ui/hp_vial_glass_center.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 opacity-90 mix-blend-screen"
                  />
                  <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_2px_3px_rgba(255,255,255,0.35),inset_0_-3px_5px_rgba(0,0,0,0.75)]" />
                </div>

                {/* Right Forged Bronze Vial Cap */}
                <img
                  src="/assets/ui/hp_vial_cap_right.png"
                  alt=""
                  draggable={false}
                  className="h-7 sm:h-8 w-auto object-contain shrink-0 z-20 pointer-events-none select-none -ml-2.5"
                />
              </div>

              {/* Quick Adjustment buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                {/* Quick damage buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyHpChange(-5)}
                    className="px-2.5 py-1 min-w-[34px] bg-[#22150e] hover:bg-[#331c12] text-[#ff9e94] border border-[#8c2e28] rounded-md font-mono text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                    title="Restar 5 PG"
                  >
                    -5
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHpChange(-1)}
                    className="px-2.5 py-1 min-w-[34px] bg-[#22150e] hover:bg-[#331c12] text-[#ff9e94] border border-[#8c2e28] rounded-md font-mono text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                    title="Restar 1 PG"
                  >
                    -1
                  </button>
                </div>

                {/* Custom input with custom buttons */}
                <div className="flex items-center gap-1 bg-[#1a120c] px-1.5 py-0.5 rounded-lg border border-[#8c672b]/80 shadow-xs">
                  <input
                    type="number"
                    placeholder="cant."
                    value={quickHpAmount}
                    onChange={(e) => setQuickHpAmount(e.target.value)}
                    className="w-14 bg-transparent border-none text-center font-mono text-xs text-[#fff6e0] focus:outline-none placeholder-[#7a6448]"
                  />
                  <button
                    type="button"
                    onClick={() => applyCustomHpDelta(true)}
                    className="w-6 h-6 bg-[#8c2e28] hover:bg-[#a8362e] text-white rounded flex items-center justify-center text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                    title="Aplicar Daño"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomHpDelta(false)}
                    className="w-6 h-6 bg-[#2d6139] hover:bg-[#387a47] text-white rounded flex items-center justify-center text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                    title="Aplicar Curación"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick heal buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyHpChange(1)}
                    className="px-2.5 py-1 min-w-[34px] bg-[#142417] hover:bg-[#1a3320] text-[#86efac] border border-[#2d6139] rounded-md font-mono text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                    title="Curar 1 PG"
                  >
                    +1
                  </button>
                  <button
                    type="button"
                    onClick={() => applyHpChange(5)}
                    className="px-2.5 py-1 min-w-[34px] bg-[#142417] hover:bg-[#1a3320] text-[#86efac] border border-[#2d6139] rounded-md font-mono text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                    title="Curar 5 PG"
                  >
                    +5
                  </button>
                </div>
              </div>

              {/* Temp HP & Hit Dice Subrow with Forged Mini-Badges */}
              <div className="pt-2.5 border-t border-[#d8c3a5] flex flex-wrap items-center justify-between gap-2.5 text-xs">
                {/* Temp HP */}
                <div className="flex items-center gap-2">
                  <span className="text-[#6b5844] font-medium text-[11px] font-fantasy uppercase tracking-wider">
                    Vida Temporal:
                  </span>
                  {isEditingTempHp ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={tempHpInput}
                        onChange={(e) => setTempHpInput(e.target.value)}
                        placeholder="0"
                        className="w-14 bg-[#1a120c] border border-[#8c672b] rounded px-1.5 py-0.5 text-xs text-center font-mono text-[#fff6e0]"
                      />
                      <button
                        onClick={handleSaveTempHp}
                        className="p-1 bg-[#8c672b] text-white rounded text-xs cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setTempHpInput(String(charData.tempHp || 0));
                        setIsEditingTempHp(true);
                      }}
                      className="relative px-3.5 py-1 min-w-[70px] min-h-[26px] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer group"
                      title="Clic para editar Vida Temporal"
                    >
                      <img
                        src="/assets/ui/badge_frame_mini.png"
                        alt=""
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                      />
                      <span className="relative z-10 font-mono text-xs font-bold text-[#ffd56b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {charData.tempHp || 0} PG
                      </span>
                    </button>
                  )}
                </div>

                {/* Hit Dice */}
                <div className="flex items-center gap-2">
                  <span className="text-[#6b5844] font-medium text-[11px] font-fantasy uppercase tracking-wider">
                    Dados de Golpe:
                  </span>
                  <div className="relative px-3.5 py-1 min-w-[70px] min-h-[26px] flex items-center justify-center">
                    <img
                      src="/assets/ui/badge_frame_mini.png"
                      alt=""
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-xs"
                    />
                    <span className="relative z-10 font-mono text-xs font-bold text-[#ffd56b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {charData.level}d{classObj.hitDie}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Death Saves (Salvaciones de Muerte con Tokens Distintivos para Éxitos y Fallos) */}
            <div className="bg-[#f5ede0]/90 rounded-xl p-3 border border-[#b89b6a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="font-fantasy font-bold text-[#4a361c] uppercase">
                Salvaciones de Muerte
              </span>

              <div className="flex items-center gap-5">
                {/* Successes */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] font-fantasy text-[#3e6b48] font-bold uppercase tracking-wider mr-1">
                    Éxitos:
                  </span>
                  {[0, 1, 2].map((idx) => {
                    const isActive = idx < deathSaves.successes;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleDeathSave('successes', idx)}
                        className="p-0.5 rounded-full transition-transform hover:scale-115 active:scale-90 cursor-pointer"
                        title={`Éxito ${idx + 1}: ${isActive ? 'Activo (clic para alternar)' : 'Vacío'}`}
                      >
                        <img
                          src={isActive ? '/assets/ui/death_save_success.png' : '/assets/ui/death_save_socket.png'}
                          alt=""
                          className={`w-5 h-5 object-contain ${
                            isActive ? 'drop-shadow-[0_2px_5px_rgba(255,213,107,0.55)]' : 'opacity-65'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Failures */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] font-fantasy text-[#8c2e28] font-bold uppercase tracking-wider mr-1">
                    Fallos:
                  </span>
                  {[0, 1, 2].map((idx) => {
                    const isActive = idx < deathSaves.failures;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleDeathSave('failures', idx)}
                        className="p-0.5 rounded-full transition-transform hover:scale-115 active:scale-90 cursor-pointer"
                        title={`Fallo ${idx + 1}: ${isActive ? 'Activo (clic para alternar)' : 'Vacío'}`}
                      >
                        <img
                          src={isActive ? '/assets/ui/death_save_failure.png' : '/assets/ui/death_save_socket.png'}
                          alt=""
                          className={`w-5 h-5 object-contain ${
                            isActive ? 'drop-shadow-[0_2px_5px_rgba(197,61,39,0.6)]' : 'opacity-65'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Interactive Class Resources (Recursos de Clase: Furia, Presagio, Recuperación Arcana, Ki, etc.) */}
            {effectiveClassResources.length > 0 && (
              <div className="bg-[#f5ede0]/90 rounded-xl p-3.5 border border-[#b89b6a] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                    Recursos & Habilidades de {charData.class}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {effectiveClassResources.map((res) => {
                    const isMax = res.current >= res.max;
                    const isZero = res.current <= 0;
                    return (
                      <div
                        key={res.id}
                        className={`p-2.5 rounded-lg border flex flex-col justify-between gap-2 shadow-2xs transition-all ${
                          res.id === 'res-furia' && charData.isRaging
                            ? 'bg-[#faeae6] border-[#e08375] ring-1 ring-[#c53d27]/40'
                            : 'bg-[#fcf6ea] border-[#cbb28c]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                                {res.name}
                              </span>
                              {res.id === 'res-furia' && (
                                charData.isRaging ? (
                                  <span className="text-[9px] bg-[#c53d27] text-white px-2 py-0.2 rounded-full font-bold animate-pulse shadow-xs">
                                    🔥 ¡EN FURIA! (1 en uso)
                                  </span>
                                ) : (
                                  <span className="text-[9px] bg-[#ebd5c8] text-[#73291d] px-2 py-0.2 rounded-full font-mono font-bold">
                                    0 en uso
                                  </span>
                                )
                              )}
                            </div>
                            <span className="text-[10px] text-[#786450] line-clamp-1 mt-0.5">
                              {res.description || `Recarga en descanso ${res.resetOn === 'short' ? 'corto' : 'largo'}`}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono font-bold text-sm text-[#8c672b]">
                              {res.current} / {res.max === 999 ? '∞' : res.max}
                            </span>
                            <span className="text-[9px] text-[#786450] block">
                              {res.resetOn === 'short' ? 'Desc. Corto' : 'Desc. Largo'}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Universal Resource Tokens (Medallones Rúnicos de Uso) */}
                        {res.max !== 999 && (
                          <div className="flex items-center justify-between pt-1.5 border-t border-[#ebdcc7] gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {Array.from({ length: Math.min(res.max, 10) }).map((_, idx) => {
                                const isAvailable = idx < res.current;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateResourceCurrent(
                                        res.id,
                                        idx < res.current ? -(res.current - idx) : (idx + 1 - res.current)
                                      )
                                    }
                                    className="p-0.5 transition-transform hover:scale-115 active:scale-90 cursor-pointer"
                                    title={`${res.name} - Uso ${idx + 1}: ${
                                      isAvailable ? 'Disponible (clic para gastar)' : 'Gastado (clic para recuperar)'
                                    }`}
                                  >
                                    <img
                                      src={
                                        isAvailable
                                          ? '/assets/ui/token_resource_active.png'
                                          : '/assets/ui/token_resource_spent.png'
                                      }
                                      alt=""
                                      className={`w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain ${
                                        isAvailable
                                          ? 'drop-shadow-[0_2px_4px_rgba(240,200,105,0.45)]'
                                          : 'opacity-70'
                                      }`}
                                    />
                                  </button>
                                );
                              })}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                              {res.id === 'res-furia' && (
                                <button
                                  type="button"
                                  onClick={handleToggleRage}
                                  className={`px-2.5 py-0.5 rounded text-[10px] font-fantasy font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95 ${
                                    charData.isRaging
                                      ? 'bg-[#5c1d12] hover:bg-[#3d130c] text-white border border-[#3d130c]'
                                      : 'bg-[#c53d27] hover:bg-[#a9301c] text-white border border-[#9c2e1c]'
                                  }`}
                                  title={charData.isRaging ? 'Calmar Furia' : 'Entrar en Furia'}
                                >
                                  <Flame className="w-2.5 h-2.5" />
                                  {charData.isRaging ? 'Calmar' : 'Activar Furia'}
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleUpdateResourceCurrent(res.id, -1)}
                                disabled={isZero}
                                className="w-5 h-5 bg-[#22150e] hover:bg-[#331c12] disabled:opacity-40 text-[#ff9e94] border border-[#8c2e28] rounded flex items-center justify-center font-bold text-xs cursor-pointer shadow-xs active:scale-95 transition-transform"
                                title="Gastar 1 uso"
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => handleUpdateResourceCurrent(res.id, 1)}
                                disabled={isMax}
                                className="w-5 h-5 bg-[#1a120c] hover:bg-[#271a10] disabled:opacity-40 text-[#ffd56b] border border-[#8c672b] rounded flex items-center justify-center font-bold text-xs cursor-pointer shadow-xs active:scale-95 transition-transform"
                                title="Recuperar 1 uso"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      // ----------------------------------------------------------------------
      // 2. ATTRIBUTES & SAVING THROWS (WITH MINTED 3D BRONZE MEDALLIONS)
      // ----------------------------------------------------------------------
      case 'attributes':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-2.5 sm:p-3 shadow-sm space-y-2">
            {renderScrollSectionHeader(
              null,
              'Puntuaciones & Salvaciones',
              undefined,
              renderHeaderSmallButton({
                onClick: () => openRulesInspector('saves'),
                label: 'Reglas',
                icon: <Search className="w-3 h-3 text-[#d4ab59]" />,
                title: 'Auditor de Reglas: Consulta el desglose de salvaciones y modificadores',
              })
            )}

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => {
                const score = charData.stats[st];
                const mod = getMod(score);
                const info = ABILITY_LABELS[st];
                const isProficientSave = (charData.savingThrows || []).some(
                  (s) =>
                    s.toLowerCase().includes(info.name.toLowerCase()) ||
                    s.toLowerCase().includes(info.short.toLowerCase())
                );
                const saveBonus = mod + (isProficientSave ? profBonus : 0);

                return (
                  <div
                    key={st}
                    className="bg-[#f5ede0]/85 rounded-xl p-1.5 sm:p-2 border border-[#b89b6a] flex flex-col items-center justify-between shadow-2xs hover:border-[#8c672b] transition min-w-0"
                  >
                    {/* Header Centrado */}
                    <div className="text-center pb-1 border-b border-[#d8c3a5] w-full px-0.5">
                      <div className="text-xs font-fantasy font-bold text-[#3d2a13] uppercase tracking-wider leading-tight">
                        {info.short}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-[#6b553b] font-medium leading-tight whitespace-nowrap truncate">
                        {info.name}
                      </div>
                    </div>

                    {/* Forged Octagonal Crest for Ability Roll */}
                    <div
                      onClick={() => rollD20(`Prueba de ${info.name}`, mod)}
                      className="cursor-pointer py-1 my-0.5 group/stat flex flex-col items-center justify-center select-none"
                      title={`Tirar prueba de ${info.name} (d20 ${formatMod(mod)}). Clic para tirar.`}
                    >
                      <div className="relative w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center group-hover/stat:scale-105 transition-transform">
                        <img
                          src="/assets/ui/coin_stat_medallion.png"
                          alt={info.short}
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]"
                        />
                        <span className="relative z-10 text-lg sm:text-xl font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] leading-none">
                          {formatMod(mod)}
                        </span>
                      </div>
                      <div
                        className="-mt-1.5 z-20 px-1.5 py-0.2 rounded-md bg-[#261a10] border border-[#b88c32] text-[9.5px] font-mono font-bold text-[#f3dfb1] shadow-xs inline-flex items-center gap-1"
                        title={`Puntuación base de ${info.name}: ${score}`}
                      >
                        <span className="text-[7.5px] font-fantasy uppercase text-[#cbb695] tracking-wider">Base</span>
                        <span>{score}</span>
                      </div>
                    </div>

                    {/* Botón de Salvación Inferior */}
                    <button
                      type="button"
                      onClick={() =>
                        rollD20(`Salvación de ${info.name}`, saveBonus)
                      }
                      className={`w-full mt-1 py-1 px-1 rounded-lg border flex flex-col items-center justify-center transition cursor-pointer select-none gap-0.5 ${
                        isProficientSave
                          ? 'bg-gradient-to-r from-[#3a2816] to-[#261a0e] text-[#f3dfb1] font-bold border-[#b88c32] shadow-xs hover:border-[#ffd56b]'
                          : 'bg-[#ede1ce]/80 text-[#5c472d] border-[#c4ab85] hover:bg-[#e4d3b8]'
                      }`}
                      title={`Tirar Salvación de ${info.name} (d20 ${formatMod(saveBonus)})${
                        isProficientSave ? ` - Competente (Bono +${profBonus})` : ''
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 leading-none">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isProficientSave
                              ? 'bg-[#ffd56b] ring-1 ring-[#b88c32]'
                              : 'border border-[#8c745c] bg-transparent'
                          }`}
                        />
                        <span className={`text-[8.5px] font-fantasy uppercase tracking-wider ${isProficientSave ? 'text-[#e8d096]' : 'text-[#695542]'}`}>
                          Salvación
                        </span>
                      </div>
                      <span className={`font-mono font-bold text-xs leading-none ${isProficientSave ? 'text-[#fff6e0]' : 'text-[#2c221a]'}`}>
                        {formatMod(saveBonus)}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 3. SKILLS (18 SKILLS WITH EXPERTISE AND ROLLS)
      // ----------------------------------------------------------------------
      case 'skills':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-3">
            {renderScrollSectionHeader(
              null,
              'Habilidades',
              '● Competente • ★ Pericia • Clic para tirar dado',
              renderHeaderSmallButton({
                onClick: () => openRulesInspector('skills'),
                label: 'Reglas',
                icon: <Search className="w-3 h-3 text-[#d4ab59]" />,
                title: 'Auditor de Reglas: Consulta el compendio oficial de habilidades y percepción pasiva',
              })
            )}

            {/* Controls: Equal 3-Button Tabs + Search Filter below */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-1 bg-[#ede1ce] p-1 rounded-xl border border-[#dac7ab]">
                <button
                  type="button"
                  onClick={() => setSkillSortMode('stat')}
                  className={`py-1 rounded-lg text-[11px] font-fantasy font-bold transition cursor-pointer text-center ${
                    skillSortMode === 'stat'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'text-[#6b5844] hover:text-[#2c221a]'
                  }`}
                  title="Agrupar habilidades por tipo de atributo (Fuerza, Destreza, Inteligencia, etc.)"
                >
                  Por Atributo
                </button>
                <button
                  type="button"
                  onClick={() => setSkillSortMode('alpha')}
                  className={`py-1 rounded-lg text-[11px] font-fantasy font-bold transition cursor-pointer text-center ${
                    skillSortMode === 'alpha'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'text-[#6b5844] hover:text-[#2c221a]'
                  }`}
                  title="Ordenar habilidades alfabéticamente de la A a la Z"
                >
                  A – Z
                </button>
                <button
                  type="button"
                  onClick={() => setSkillSortMode('bonus')}
                  className={`py-1 rounded-lg text-[11px] font-fantasy font-bold transition cursor-pointer text-center ${
                    skillSortMode === 'bonus'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'text-[#6b5844] hover:text-[#2c221a]'
                  }`}
                  title="Ordenar por mayor bonificador de tirada"
                >
                  Por Bono
                </button>
              </div>

              {/* Full-width Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8c745c]" />
                <input
                  type="text"
                  placeholder="Buscar habilidad..."
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 bg-[#fcf6ea] border border-[#b89b6a] rounded-lg text-xs placeholder-[#9c8975] focus:outline-hidden focus:ring-1 focus:ring-[#8c672b] text-[#2c221a]"
                />
                {skillSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setSkillSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c745c] hover:text-[#2c221a] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Skills List Rendering */}
            {(() => {
              // Precompute enriched skill items
              const enrichedSkills = SKILL_DEFINITIONS.map((sk) => {
                const statMod = getMod(charData.stats[sk.stat]);
                const isProficient = (charData.skills || []).some(
                  (s) => s.toLowerCase() === sk.name.toLowerCase()
                );
                const hasExpertise =
                  isProficient &&
                  charData.notes &&
                  charData.notes.includes(`Pericia: ${sk.name}`);
                const totalBonus =
                  statMod + (hasExpertise ? 2 * profBonus : isProficient ? profBonus : 0);

                const officialDef = ALL_5E_SKILLS.find(
                  (s) => s.name.toLowerCase() === sk.name.toLowerCase()
                );

                return {
                  ...sk,
                  statMod,
                  isProficient,
                  hasExpertise,
                  totalBonus,
                  description: officialDef?.description || 'Habilidad oficial.',
                  abilityName: ABILITY_LABELS[sk.stat].name,
                  abilityShort: ABILITY_LABELS[sk.stat].short,
                };
              });

              // Filter by search query
              const filtered = enrichedSkills.filter((sk) => {
                if (!skillSearchQuery.trim()) return true;
                const q = skillSearchQuery.toLowerCase();
                return (
                  sk.name.toLowerCase().includes(q) ||
                  sk.abilityName.toLowerCase().includes(q) ||
                  sk.abilityShort.toLowerCase().includes(q)
                );
              });

              if (filtered.length === 0) {
                return (
                  <div className="p-6 text-center text-xs text-[#786450] bg-[#faf6ee] rounded-xl border border-[#e8dccb]">
                    No se encontraron habilidades que coincidan con &ldquo;{skillSearchQuery}&rdquo;.
                  </div>
                );
              }

              // Render single skill item component: clean, spacious, legible, non-truncated
              const renderSkillRow = (sk: typeof enrichedSkills[0]) => {
                return (
                  <div
                    key={sk.name}
                    onClick={() =>
                      rollD20(
                        `Prueba de ${sk.name} (${sk.abilityShort})`,
                        sk.totalBonus
                      )
                    }
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition select-none group/skill ${
                      sk.hasExpertise
                        ? 'bg-[#faecd4] border-[#c59b27] hover:border-[#967012] shadow-2xs'
                        : sk.isProficient
                        ? 'bg-[#f5ede0] border-[#d8c8af] hover:border-[#8c672b]'
                        : 'bg-[#faf6ee] border-transparent text-[#6b5844] hover:bg-[#f5ede0] hover:border-[#ebdcc7]'
                    }`}
                    title={`${sk.name} (${sk.abilityName}): Modificador ${formatMod(sk.statMod)} ${
                      sk.hasExpertise
                        ? '+ Pericia (+' + 2 * profBonus + ')'
                        : sk.isProficient
                        ? '+ Competencia (+' + profBonus + ')'
                        : ''
                    } = Total ${formatMod(sk.totalBonus)}. Clic para tirar d20.`}
                  >
                    {/* Left: Indicator + Full Name + Stat Tag */}
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span
                        className={`w-2 h-2 rounded-full flex items-center justify-center text-[7px] shrink-0 ${
                          sk.hasExpertise
                            ? 'bg-[#c59b27] text-white'
                            : sk.isProficient
                            ? 'bg-[#8c672b] text-white'
                            : 'border border-[#ad9c88] bg-transparent'
                        }`}
                      >
                        {sk.hasExpertise ? '★' : sk.isProficient ? '●' : ''}
                      </span>

                      <span className="font-fantasy text-xs text-[#2c221a] truncate">
                        {sk.name}
                      </span>

                      <span className="text-[10px] text-[#9c8975] font-mono shrink-0">
                        ({sk.abilityShort})
                      </span>
                    </div>

                    {/* Right: Clean Total Bonus Pill */}
                    <div className="font-mono font-bold text-xs bg-[#ebdcc4] text-[#3d2a13] px-2 py-0.5 rounded-md border border-[#cbb99f] shrink-0 min-w-[32px] text-center shadow-2xs group-hover/skill:border-[#8c672b] group-hover/skill:bg-[#e4d3b8] transition">
                      {sk.totalBonus >= 0 ? `+${sk.totalBonus}` : sk.totalBonus}
                    </div>
                  </div>
                );
              };

              // Mode 1: By Attribute (Grouped by Stat)
              if (skillSortMode === 'stat') {
                const statGroups: { stat: keyof AbilityScores; emoji: string }[] = [
                  { stat: 'str', emoji: '💪' },
                  { stat: 'dex', emoji: '🏃' },
                  { stat: 'int', emoji: '🧠' },
                  { stat: 'wis', emoji: '👁️' },
                  { stat: 'cha', emoji: '💬' },
                ];

                return (
                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {statGroups.map((grp) => {
                      const groupSkills = filtered.filter((s) => s.stat === grp.stat);
                      if (groupSkills.length === 0) return null;
                      const statScore = charData.stats[grp.stat];
                      const statMod = getMod(statScore);

                      return (
                        <div
                          key={grp.stat}
                          className="bg-[#f7f1e6]/60 rounded-xl p-2 border border-[#e4d6c1] space-y-1"
                        >
                          {/* Group Header */}
                          <div className="flex items-center justify-between text-xs font-fantasy font-bold text-[#5c472d] border-b border-[#e8dac6] pb-1 px-1">
                            <span className="flex items-center gap-1.5">
                              <span>{grp.emoji}</span>
                              <span className="uppercase">{ABILITY_LABELS[grp.stat].name}</span>
                            </span>
                            <span className="font-mono text-[10px] bg-[#ede1ce] text-[#6b5844] px-1.5 py-0.2 rounded border border-[#dac7ab]">
                              {ABILITY_LABELS[grp.stat].short} {formatMod(statMod)} (Base {statScore})
                            </span>
                          </div>

                          {/* Group Skills */}
                          <div className="space-y-1">
                            {groupSkills.map(renderSkillRow)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              // Mode 2: Alphabetical (A - Z)
              if (skillSortMode === 'alpha') {
                const alphaSkills = [...filtered].sort((a, b) =>
                  a.name.localeCompare(b.name, 'es')
                );
                return (
                  <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                    {alphaSkills.map(renderSkillRow)}
                  </div>
                );
              }

              // Mode 3: By Bonus (Descending)
              const bonusSkills = [...filtered].sort((a, b) => b.totalBonus - a.totalBonus);
              return (
                <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                  {bonusSkills.map(renderSkillRow)}
                </div>
              );
            })()}
          </div>
        );

      // ----------------------------------------------------------------------
      // 4. ATTACKS & ACTIONS (EQUIPPED WEAPONS, ROLLS, DAMAGE)
      // ----------------------------------------------------------------------
      case 'attacks':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-4">
            {renderScrollSectionHeader(
              null,
              'Ataques & Armas Principales',
              'Tira al impacto o al daño con un clic.'
            )}

            {/* Extra Attack Badge */}
            {extraAttackInfo.hasExtraAttack && (
              <div className="bg-[#f0e6d2] px-3.5 py-2 rounded-xl border border-[#c59b27] flex items-center justify-between text-xs shadow-2xs">
                <span className="font-fantasy font-bold text-[#8c672b] flex items-center gap-1.5">
                  <Sword className="w-4 h-4 text-[#8c672b]" /> {extraAttackInfo.label}
                </span>
                <span className="font-mono text-[10px] text-[#6b5844] bg-[#ebdcc4] px-2 py-0.5 rounded font-bold border border-[#d6c4aa]">
                  {extraAttackInfo.attacksCount} ataques por acción de atacar
                </span>
              </div>
            )}

            <div className="space-y-2.5">
              {(charData.attacks || []).map((att) => {
                const numericBonus = parseInt(att.bonus.replace('+', '')) || 0;
                const { damageType: cleanDamageType, properties: cleanProps } = parseAttackTypeAndProps(att.type);

                // Barbarian Rage damage bonus: applies to melee weapon attacks using Strength
                const isBarbarian = (charData.class || '').toLowerCase().includes('barb') || (charData.class || '').toLowerCase().includes('bárbaro');
                const isRaging = !!charData.isRaging;
                const rageDmg = charData.level >= 16 ? 4 : charData.level >= 9 ? 3 : 2;
                const isRangedWeapon = /arco|ballesta|crossbow|bow|cerbatana|honda|sling/i.test(att.name);
                const appliesRage = isBarbarian && isRaging && !isRangedWeapon;

                let effectiveDamageFormula = att.damage;
                if (appliesRage) {
                  const cleanDmg = att.damage.replace(/\s+/g, '');
                  const match = cleanDmg.match(/^(\d+d\d+)(?:([+-])(\d+))?$/i);
                  if (match) {
                    const dicePart = match[1];
                    const sign = match[2] || '+';
                    const modNum = match[3] ? parseInt(match[3]) : 0;
                    const signedMod = sign === '-' ? -modNum : modNum;
                    const finalMod = signedMod + rageDmg;
                    effectiveDamageFormula = finalMod >= 0 ? `${dicePart} + ${finalMod}` : `${dicePart} - ${Math.abs(finalMod)}`;
                  } else {
                    effectiveDamageFormula = `${att.damage} + ${rageDmg}`;
                  }
                }

                return (
                  <div
                    key={att.id}
                    className={`p-3.5 rounded-xl border transition shadow-xs space-y-2.5 ${
                      appliesRage
                        ? 'bg-gradient-to-r from-[#fdf6f3] via-[#faede8] to-[#f8e5de] border-[#e08375] hover:border-[#c53d27]'
                        : 'bg-gradient-to-r from-[#fcf9f2] to-[#f5ede0] border-[#d8c8af] hover:border-[#8c672b]'
                    }`}
                  >
                    {/* Top Row: Weapon Name + Property Chips + Roll Button */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div
                        onClick={() => setSelectedDetailItem(att.name)}
                        className="flex items-center gap-2.5 min-w-0 cursor-pointer group/att"
                        title="Clic para ver detalles completos del arma y propiedades"
                      >
                        <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                          <img
                            src={getWeaponBadgeAsset(att.name)}
                            alt=""
                            draggable={false}
                            className="w-9 h-9 object-contain pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover/att:scale-110 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-fantasy font-bold text-sm text-[#2c221a] tracking-wide truncate group-hover/att:text-[#8c672b] transition flex items-center gap-1.5">
                            <span>{att.name}</span>
                            <span className="text-[10px] text-[#8c672b] opacity-0 group-hover/att:opacity-100 transition-opacity">🔍</span>
                          </h4>
                          {cleanProps.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                              {cleanProps.map((prop, pIdx) => (
                                <span
                                  key={pIdx}
                                  className="text-[10px] bg-[#ede1ce]/90 text-[#5e4827] px-1.5 py-0.2 rounded border border-[#dac7ab] font-medium whitespace-nowrap"
                                >
                                  {prop}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-auto">
                        <button
                          type="button"
                          onClick={() =>
                            rollD20(
                              `Ataque con ${att.name}${appliesRage ? ' (En Furia)' : ''}`,
                              numericBonus,
                              'normal',
                              effectiveDamageFormula
                            )
                          }
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap active:scale-95 ${
                            appliesRage
                              ? 'bg-gradient-to-r from-[#c53d27] to-[#d64a34] hover:from-[#b0341f] hover:to-[#c53d27] text-white border border-[#9c2e1c]'
                              : 'bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f]'
                          }`}
                          title="Tirar impacto y daño en un solo clic"
                        >
                          <Dices className="w-3.5 h-3.5" /> Tirar Ataque
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Impact Bonus + Single-Line Damage Formula + Damage Type + Rage Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#ebdcc7]/80 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Impact / Attack Bonus: guaranteed single line */}
                        <div className="inline-flex items-center gap-1.5 bg-[#ede1ce] px-2.5 py-1 rounded-md border border-[#dac7ab] whitespace-nowrap shadow-2xs">
                          <span className="text-[10px] text-[#735f49] font-bold uppercase tracking-wider">
                            Impacto
                          </span>
                          <span className="font-mono font-bold text-xs text-[#8c672b]">
                            {att.bonus}
                          </span>
                        </div>

                        {/* Damage: guaranteed single line */}
                        <div className="inline-flex items-center gap-1.5 bg-[#ede1ce] px-2.5 py-1 rounded-md border border-[#dac7ab] whitespace-nowrap shadow-2xs">
                          <span className="text-[10px] text-[#735f49] font-bold uppercase tracking-wider">
                            Daño
                          </span>
                          <span className="font-mono font-bold text-xs text-[#2c221a] tracking-tight">
                            {effectiveDamageFormula}
                          </span>
                          <span className="text-[11px] font-semibold text-[#6b5844]">
                            {cleanDamageType}
                          </span>
                        </div>

                        {/* Rage bonus badge if applied */}
                        {appliesRage && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-[#c53d27] text-white px-2 py-0.5 rounded-full font-mono font-bold shadow-xs whitespace-nowrap animate-pulse">
                            🔥 +{rageDmg} Furia
                          </span>
                        )}
                      </div>

                      {/* Quick solo damage roll */}
                      <button
                        type="button"
                        onClick={() =>
                          rollDie(
                            `Daño con ${att.name}${appliesRage ? ' (Furia)' : ''}`,
                            0,
                            'd20',
                            'normal',
                            effectiveDamageFormula
                          )
                        }
                        className="text-[11px] text-[#7a5a2b] hover:text-[#523916] underline font-fantasy whitespace-nowrap cursor-pointer transition shrink-0 ml-auto"
                        title="Tirar únicamente el dado de daño sin tirada de impacto"
                      >
                        Solo daño 🎲
                      </button>
                    </div>
                  </div>
                );
              })}

              {(!charData.attacks || charData.attacks.length === 0) && (
                <div className="p-4 text-center bg-[#faf6ee] rounded-xl border border-dashed border-[#d8c8af] text-xs text-[#786450]">
                  No hay armas registradas. Se utiliza el ataque desarmado por defecto (+{profBonus + getMod(charData.stats.str)}, 1 de daño contundente).
                </div>
              )}

              {/* --- ACCIONES TÁCTICAS DE ESPECIALIZACIÓN DE ARTÍFICE --- */}
              {(() => {
                const isArtificer = (charData.class || '').toLowerCase().includes('artifice') || (charData.class || '').toLowerCase().includes('artífice');
                if (!isArtificer || (charData.level || 1) < 3) return null;
                const subLower = (charData.subclass || '').toLowerCase();
                const isArmorer = subLower.includes('armero') || subLower.includes('armorer');
                const isBattleSmith = subLower.includes('herrero') || subLower.includes('battle smith') || subLower.includes('battlesmith');
                const isArtillerist = subLower.includes('artillero') || subLower.includes('artillerist');
                const isAlchemist = subLower.includes('alquimista') || subLower.includes('alchemist');
                const intMod = getMod(charData.stats.int);
                const artAttBonus = intMod + profBonus;

                return (
                  <div className="pt-3 border-t border-[#ebdcc7] space-y-3">
                    {/* Armero: Armadura Arcana */}
                    {isArmorer && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#b88c32] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Shield className="w-4 h-4 text-[#8c672b]" />
                            <span>Armadura Arcana: Armas Integradas</span>
                          </div>
                          <span className="text-[10px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold">
                            Armero Nv {charData.level}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Guanteletes Atronadores */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b] flex items-center justify-between">
                                <span>Guanteletes Atronadores</span>
                                <span className="font-mono text-[10px] text-[#4a361c] bg-[#ebdcc4] px-1.5 py-0.5 rounded">Guardián</span>
                              </div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                1d8 + {intMod} Trueno • El enemigo tiene desventaja en ataques contra otros hasta tu próximo turno.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollD20('Guanteletes Atronadores (Guardián)', artAttBonus, 'normal', `1d8 + ${intMod}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> Atacar (+{artAttBonus})
                            </button>
                          </div>

                          {/* Lanza-Relámpagos */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#2d5d7c] flex items-center justify-between">
                                <span>Lanza-Relámpagos (90/300)</span>
                                <span className="font-mono text-[10px] text-[#2d5d7c] bg-[#dbe8f2] px-1.5 py-0.5 rounded">Infiltrador</span>
                              </div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                1d6 + {intMod} Relámpago (+1d6 extra 1 vez/turno). Ventaja permanente en Sigilo y +5 pies vel.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollD20('Lanza-Relámpagos (Infiltrador)', artAttBonus, 'normal', `1d6 + ${intMod}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> Disparar (+{artAttBonus})
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Herrero de Batalla: Defensor de Acero */}
                    {isBattleSmith && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#b88c32] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Award className="w-4 h-4 text-[#8c672b]" />
                            <span>Compañero Mecánico: Defensor de Acero</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono">
                            <span className="bg-[#ede1ce] px-2 py-0.5 rounded border border-[#d8c8af] text-[#4a361c] font-bold">
                              CA {charData.level >= 15 ? 17 : 15}
                            </span>
                            <span className="bg-[#a8423d] text-white px-2 py-0.5 rounded font-bold">
                              {2 + intMod + (5 * charData.level)} PG
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Golpe Contundente */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">
                                Golpe Contundente (Acción Adicional)
                              </div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Ataque cuerpo a cuerpo a 5 pies: 1d8 + {profBonus} de daño de fuerza.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollD20('Golpe Contundente (Defensor de Acero)', artAttBonus, 'normal', `1d8 + ${profBonus}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> Impacto (+{artAttBonus})
                            </button>
                          </div>

                          {/* Reparar & Desviar Ataque */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#2d7c52]">
                                Reparar (3/descanso) & Desviar Ataque
                              </div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Restaura 2d8 + {profBonus} PG a sí mismo o constructo/objeto. Reacción: desventaja a atacante adyacente{charData.level >= 15 ? ` (+1d4+${intMod} fuerza)` : ''}.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Reparación (Defensor de Acero)', profBonus, 'd8', 'normal', `2d8 + ${profBonus}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Heart className="w-3.5 h-3.5 text-[#a8423d]" /> Reparar (2d8+{profBonus})
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Artillero: Cañón Sobrenatural */}
                    {isArtillerist && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#b88c32] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Flame className="w-4 h-4 text-[#c55a27]" />
                            <span>Cañón Sobrenatural (CA 18 • {charData.level * 5} PG)</span>
                          </div>
                          <span className="text-[10px] bg-[#c55a27] text-white px-2 py-0.5 rounded font-mono font-bold">
                            Artillero Nv {charData.level}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {/* Balista de Fuerza */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#382b20]">Balista de Fuerza</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                120 pies • {charData.level >= 9 ? '3d8' : '2d8'} Fuerza y empuja 5 pies.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollD20('Balista de Fuerza (Cañón Eldritch)', artAttBonus, 'normal', `${charData.level >= 9 ? '3d8' : '2d8'}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> Disparar (+{artAttBonus})
                            </button>
                          </div>

                          {/* Lanzallamas */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#c55a27]">Lanzallamas</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Cono 15 pies • Salva DES CD {8 + profBonus + intMod} • {charData.level >= 9 ? '3d8' : '2d8'} Fuego.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Lanzallamas (Cañón Eldritch)', 0, 'd8', 'normal', `${charData.level >= 9 ? '3d8' : '2d8'}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Flame className="w-3.5 h-3.5 text-[#c55a27]" /> Daño Fuego
                            </button>
                          </div>

                          {/* Protector */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#2d7c52]">Protector</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Radio 10 pies • 1d8 + {intMod} PG temporales por turno a aliados.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Campo Protector (Cañón Eldritch)', intMod, 'd8', 'normal', `1d8 + ${intMod}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Shield className="w-3.5 h-3.5 text-[#2d7c52]" /> PG Temp (1d8+{intMod})
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Alquimista: Elixir Experimental */}
                    {isAlchemist && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#b88c32] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Sparkles className="w-4 h-4 text-[#8c672b]" />
                            <span>Laboratorio Alquímico: Elixir Experimental</span>
                          </div>
                          <span className="text-[10px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold">
                            Alquimista Nv {charData.level}
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                          <p className="text-[11px] text-[#5e4e3e]">
                            Tira 1d6 para determinar el elixir generado mágicamente tras tu descanso largo o prepara frascos extra con ranuras de conjuro.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const d6 = Math.floor(Math.random() * 6) + 1;
                              const elixirEffects: Record<number, { title: string; effect: string }> = {
                                1: { title: 'Curación', effect: `La criatura que lo bebe recupera 2d4 + ${intMod} puntos de golpe.` },
                                2: { title: 'Velocidad', effect: '+10 pies de velocidad de movimiento caminando durante 1 hora.' },
                                3: { title: 'Resiliencia', effect: '+1 a la Clase de Armadura durante 10 minutos.' },
                                4: { title: 'Valentía', effect: `Otorga 10 puntos de golpe temporales${charData.level >= 9 ? ` (+2d6+${intMod} extra)` : ''}.` },
                                5: { title: 'Vuelo', effect: 'Velocidad de vuelo de 10 pies durante 10 minutos.' },
                                6: { title: 'Transformación', effect: 'Efecto del conjuro Alterar el Propio Ser durante 10 minutos.' },
                              };
                              const rolled = elixirEffects[d6];
                              setThemedAlert({
                                isOpen: true,
                                title: `🧪 ¡Elixir Experimental de ${rolled.title}! (d6 = ${d6})`,
                                subtitle: 'Fórmula obtenida según las reglas oficiales.',
                                type: 'dice',
                                message: (
                                  <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-1">
                                    <div className="font-fantasy font-bold text-sm text-[#8c672b]">
                                      Efecto de la Poción:
                                    </div>
                                    <p className="leading-relaxed">{rolled.effect}</p>
                                  </div>
                                ),
                              });
                            }}
                            className="px-3.5 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                          >
                            <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Tirar 1d6 Elixir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y RASGOS DE COMBATE DEL BÁRBARO --- */}
              {(() => {
                const isBarbarian = (charData.class || '').toLowerCase().includes('barbaro') || (charData.class || '').toLowerCase().includes('bárbaro') || (charData.class || '').toLowerCase().includes('barbarian');
                if (!isBarbarian) return null;
                const subLower = (charData.subclass || '').toLowerCase();
                const strMod = getMod(charData.stats.str);
                const barAttBonus = strMod + profBonus;
                const barbarianLevel = charData.level || 1;
                const maxRages = getBarbarianMaxRages(barbarianLevel);
                const rageDmg = getBarbarianRageDamageBonus(barbarianLevel);
                const rageRes = effectiveClassResources.find((r) => r.id === 'res-furia');
                const availableRages = rageRes !== undefined ? rageRes.current : maxRages;
                const isRaging = !!charData.isRaging;
                const inUseRages = isRaging ? 1 : 0;

                const isBeast = subLower.includes('bestia') || subLower.includes('beast');
                const isWildMagic = subLower.includes('magia salvaje') || subLower.includes('wild magic');
                const isBattlerager = subLower.includes('battlerager') || subLower.includes('furioso');
                const isTotem = subLower.includes('totem') || subLower.includes('totémico') || subLower.includes('totemico');
                const hasBearTotem = isTotem && (charData.classDecisions?.['totemSpirit3']?.includes('totem-oso-3') || charData.notes?.toLowerCase().includes('oso'));

                return (
                  <div className="pt-3 border-t border-[#ebdcc7] space-y-3">
                    {/* Tarjeta de Furia Primitiva */}
                    <div
                      className={`p-4 rounded-xl border-2 transition-all space-y-3 shadow-xs ${
                        isRaging
                          ? 'bg-gradient-to-br from-[#fbeee6] via-[#f8dfd6] to-[#f4c8be] border-[#c53d27] ring-2 ring-[#c53d27]/40 shadow-md'
                          : 'bg-gradient-to-br from-[#fdf6f0] to-[#f7e8dc] border-[#b84832]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${
                              isRaging
                                ? 'bg-[#c53d27] text-white border-[#9c2e1c] animate-pulse'
                                : 'bg-[#f7e4d8] text-[#c53d27] border-[#e8cebe]'
                            }`}
                          >
                            <Flame className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-fantasy font-bold text-sm text-[#5c1d12]">
                                Furia de Batalla (Rage) • Nivel {barbarianLevel}
                              </span>
                              {isRaging ? (
                                <span className="text-[10px] bg-[#c53d27] text-white px-2 py-0.5 rounded-full font-mono font-bold animate-pulse shadow-xs">
                                  🔥 ¡EN FURIA! (1 en uso)
                                </span>
                              ) : (
                                <span className="text-[10px] bg-[#ebd5c8] text-[#78281d] px-2 py-0.5 rounded-full font-mono font-bold">
                                  Inactiva (0 en uso)
                                </span>
                              )}
                              <span className="text-[10px] bg-[#c53d27] text-white px-2 py-0.5 rounded font-mono font-bold">
                                +{rageDmg} Daño CaC (FUE)
                              </span>
                            </div>
                            <p className="text-[11px] text-[#733529] mt-0.5">
                              Furias disponibles: <strong className="font-mono text-[#5c1d12]">{availableRages} / {maxRages === 999 ? '∞' : maxRages}</strong> • En uso: <strong className="font-mono text-[#5c1d12]">{inUseRages}</strong>
                            </p>
                          </div>
                        </div>

                        {/* Interactive toggle button */}
                        <button
                          type="button"
                          onClick={handleToggleRage}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-fantasy font-bold border transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 shrink-0 ${
                            isRaging
                              ? 'bg-[#5c1d12] hover:bg-[#3d130c] text-white border-[#3d130c] shadow-md'
                              : 'bg-gradient-to-r from-[#c53d27] to-[#e04f36] hover:from-[#b0341f] hover:to-[#c53d27] text-white border-[#9c2e1c]'
                          }`}
                          title={isRaging ? 'Calmar Furia de batalla' : 'Entrar en Furia (gasta 1 uso)'}
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>{isRaging ? '❄️ Calmar Furia' : '🔥 Entrar en Furia'}</span>
                        </button>
                      </div>

                      {/* Active Benefits Breakdown */}
                      <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#e8cebe] text-xs text-[#5a3a2d] space-y-2">
                        <div className="flex flex-wrap gap-2 text-[10px]">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            isRaging ? 'bg-[#c53d27] text-white shadow-xs' : 'bg-[#edd6c8] text-[#5c1d12]'
                          }`}>
                            {hasBearTotem
                              ? (isRaging ? '🛡️ RESISTENCIA ACTIVA: A TODO el daño excepto psíquico (Tótem Oso)' : 'Resistencia: Todo el daño excepto psíquico (Tótem Oso)')
                              : (isRaging ? '🛡️ RESISTENCIA ACTIVA: Contundente, Cortante y Perforante' : 'Resistencia: Contundente, Cortante y Perforante')}
                          </span>
                          <span className="bg-[#edd6c8] text-[#5c1d12] px-2 py-0.5 rounded font-bold">
                            +{rageDmg} al daño cuerpo a cuerpo con Fuerza {isRaging ? '• (¡Activo en tus armas!)' : ''}
                          </span>
                          <span className="bg-[#edd6c8] text-[#5c1d12] px-2 py-0.5 rounded font-bold">
                            Ventaja en Pruebas y Salvaciones de Fuerza
                          </span>
                        </div>

                        {isRaging && (
                          <div className="text-[11px] font-medium text-[#7a2215] bg-[#fbede8] p-2 rounded border border-[#f5c7bc]">
                            💥 <strong>Efecto en Combate:</strong> Tus ataques cuerpo a cuerpo con armas basadas en Fuerza ya tienen sumados automáticamente los <strong>+{rageDmg} puntos de daño</strong>. Además, divide a la mitad cualquier daño recibido según tus resistencias activas.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ataque Temerario (Reckless Attack) - Nivel 2+ (Habilidad Aparte) */}
                    {barbarianLevel >= 2 && (
                      <div className="p-3.5 bg-gradient-to-br from-[#fbf8f2] to-[#f4ebe0] rounded-xl border-2 border-[#b87a32] space-y-2.5 shadow-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="p-1.5 rounded-lg border bg-[#faebd7] text-[#94551a] border-[#dfc3a1] shrink-0">
                              <Swords className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-fantasy font-bold text-xs text-[#4a2e12]">
                                  Ataque Temerario (Reckless Attack) • Nivel 2+
                                </span>
                                <span className="text-[10px] bg-[#ebdcc4] text-[#6b421a] px-2 py-0.5 rounded font-mono font-bold">
                                  Habilidad Independiente
                                </span>
                              </div>
                              <p className="text-[10px] text-[#78593a] mt-0.5">
                                No depende de la Furia. Al realizar tu primer ataque del turno, puedes atacar temerariamente.
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setThemedAlert({
                                isOpen: true,
                                title: 'Ataque Temerario Declarado',
                                subtitle: 'Ventaja en Ataques de Fuerza',
                                type: 'info',
                                message: 'Has declarado Ataque Temerario: Tienes VENTAJA en todos tus ataques cuerpo a cuerpo con Fuerza durante este turno. ¡CUIDADO! Todos los ataques enemigos contra ti tendrán VENTAJA hasta el inicio de tu próximo turno.',
                              });
                            }}
                            className="px-3 py-1.5 bg-[#d69038] hover:bg-[#bd7b2a] text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap active:scale-95 shrink-0"
                            title="Declarar Ataque Temerario para este turno"
                          >
                            <Sparkles className="w-3.5 h-3.5" /> Declarar Ataque Temerario
                          </button>
                        </div>

                        <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#e8dccb] text-xs text-[#52371d] space-y-1">
                          <div className="flex flex-wrap gap-2 text-[10px]">
                            <span className="bg-[#eddcc8] text-[#5c3712] px-2 py-0.5 rounded font-bold">
                              ✓ Ventaja en tiradas de ataque cuerpo a cuerpo (FUE) este turno
                            </span>
                            <span className="bg-[#f2dbd6] text-[#80251c] px-2 py-0.5 rounded font-bold">
                              ⚠ Los ataques enemigos contra ti tienen VENTAJA hasta tu siguiente turno
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Senda de la Bestia: Armas Naturales */}
                    {isBeast && (charData.level || 1) >= 3 && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#7a5a2b] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Sparkles className="w-4 h-4 text-[#7a5a2b]" />
                            <span>Armas Naturales Bestiales (Forma de la Bestia)</span>
                          </div>
                          <span className="text-[10px] bg-[#7a5a2b] text-white px-2 py-0.5 rounded font-mono font-bold">
                            Bestia Nv {charData.level}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {/* Mordisco */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">Mordisco (1d8 Perf)</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                1d8 + {strMod} daño. Si estás por debajo de la mitad de PG, recuperas {profBonus} PG (1 vez/turno).
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollD20('Mordisco Bestial', barAttBonus, 'normal', `1d8 + ${strMod}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> Morder (+{barAttBonus})
                            </button>
                          </div>

                          {/* Garras */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">Garras (1d6 Cort)</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                1d6 + {strMod} daño. Al atacar con garras, ganas 1 ataque de garra adicional gratuito en tu turno.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollD20('Garra Bestial', barAttBonus, 'normal', `1d6 + ${strMod}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> Desgarrar (+{barAttBonus})
                            </button>
                          </div>

                          {/* Cola */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">Cola (Alcance 10 pies)</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                1d8 + {strMod} daño. Reacción al ser impactado a 10 pies: tira 1d8 y súmalo a tu CA contra el ataque.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Defensa de Cola (+CA)', 0, 'd8', 'normal', '1d8')}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Shield className="w-3.5 h-3.5 text-[#2d7c52]" /> Reacción (+1d8 CA)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Senda de la Magia Salvaje: Oleada */}
                    {isWildMagic && (charData.level || 1) >= 3 && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#7a328c] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Sparkles className="w-4 h-4 text-[#7a328c]" />
                            <span>Oleada de Magia Salvaje (Wild Magic Surge)</span>
                          </div>
                          <span className="text-[10px] bg-[#7a328c] text-white px-2 py-0.5 rounded font-mono font-bold">
                            Magia Salvaje Nv {charData.level}
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                          <p className="text-[11px] text-[#5e4e3e]">
                            Al enfurecerte, tira 1d8 en la tabla oficial de Magia Salvaje para canalizar energías caóticas del multiverso.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const d8 = Math.floor(Math.random() * 8) + 1;
                              const surgeTable: Record<number, { title: string; effect: string }> = {
                                1: { title: 'Absorción Umbría', effect: 'Tentáculos sombríos emergen de ti: cada criatura que elijas a 30 pies sufre 1d12 de daño necrótico si falla salvación de Constitución (CD 8 + prof + Con), y tú ganas 1d12 puntos de golpe temporales.' },
                                2: { title: 'Teletransporte de Furia', effect: 'Hasta que termine tu furia, puedes teletransportarte hasta 30 pies a un espacio desocupado que puedas ver como acción adicional en cada uno de tus turnos.' },
                                3: { title: 'Espíritu Flotante', effect: 'Un espíritu fey intangible vuela a un punto a 30 pies. Al final de tu turno explota infligiendo 1d6 de daño de fuerza a criaturas a 5 pies (salvación Destreza para evitar).' },
                                4: { title: 'Luz Sagrada de Represalia', effect: 'Magia brillante imbuye tu arma: inflige 1d6 de daño radiante adicional y gana la propiedad arrojadiza (alcance 20/60 pies), retornando de inmediato a tu mano.' },
                                5: { title: 'Proyectiles de Represalia', effect: 'Zarcillos etéreos te rodean: cada vez que una criatura a 30 pies te impacte con un ataque, sufre 1d6 de daño de fuerza reactivo.' },
                                6: { title: 'Baluarte Protector', effect: 'Una armadura de luz mágica te envuelve: tú y cada criatura aliada a 10 pies o menos de ti ganan un bonificador de +1 a la Clase de Armadura.' },
                                7: { title: 'Enredadera Espinosa', effect: 'Zarcillos y flores brotan del suelo a 15 pies a tu alrededor: el área cuenta como terreno difícil para tus enemigos mientras dure la furia.' },
                                8: { title: 'Rayo Cegador', effect: 'Un rayo de luz fulgurante dispara desde tu pecho: puedes usar una acción adicional en cada turno para disparar a una criatura a 30 pies (1d6 de daño radiante y queda cegada hasta tu próximo turno si falla salvación de Constitución).' },
                              };
                              const rolled = surgeTable[d8];
                              setThemedAlert({
                                isOpen: true,
                                title: `✨ ¡Oleada de Magia Salvaje: ${rolled.title}! (d8 = ${d8})`,
                                subtitle: 'Efecto de Senda de la Magia Salvaje',
                                type: 'dice',
                                message: (
                                  <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-1.5">
                                    <div className="font-fantasy font-bold text-sm text-[#7a328c]">
                                      Manifestación del Caos:
                                    </div>
                                    <p className="leading-relaxed">{rolled.effect}</p>
                                  </div>
                                ),
                              });
                            }}
                            className="px-3.5 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                          >
                            <Dices className="w-3.5 h-3.5 text-[#7a328c]" /> Tirar 1d8 Magia Salvaje
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Senda del Furioso de Batalla: Púas */}
                    {isBattlerager && (charData.level || 1) >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#b84832] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#b84832]">Ataque con Armadura de Púas (Acción Adicional)</div>
                          <p className="text-[10px] text-[#5e4e3e]">
                            En furia con armadura de púas: 1d4 + {strMod} de daño perforante. Además, inflige 3 puntos de daño perforante al apresar.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => rollD20('Ataque de Armadura de Púas', barAttBonus, 'normal', `1d4 + ${strMod}`)}
                          className="px-3 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5" /> Púas (+{barAttBonus})
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y RASGOS DE COMBATE DEL BARDO --- */}
              {(() => {
                const isBard = (charData.class || '').toLowerCase().includes('bardo') || (charData.class || '').toLowerCase().includes('bard');
                if (!isBard) return null;
                const subLower = (charData.subclass || '').toLowerCase();
                const inspDie = charData.level >= 15 ? 'd12' : charData.level >= 10 ? 'd10' : charData.level >= 5 ? 'd8' : 'd6';

                const isSwords = subLower.includes('espada') || subLower.includes('sword');
                const isLore = subLower.includes('saber') || subLower.includes('lore') || subLower.includes('conocimiento');
                const isWhispers = subLower.includes('susurro') || subLower.includes('whisper');
                const isSpirits = subLower.includes('espiritus') || subLower.includes('espíritus') || subLower.includes('spirits');

                return (
                  <div className="pt-3 border-t border-[#ebdcc7] space-y-3">
                    {/* Tarjeta de Inspiración Bárdica */}
                    <div className="p-3.5 bg-gradient-to-br from-[#f8f0fc] to-[#ebdcf2] rounded-xl border-2 border-[#8032a8] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#431459]">
                          <Sparkles className="w-4 h-4 text-[#8032a8]" />
                          <span>Inspiración Bárdica (1{inspDie}) • Nivel {charData.level}</span>
                        </div>
                        <span className="text-[10px] bg-[#8032a8] text-white px-2 py-0.5 rounded font-mono font-bold">
                          1{inspDie} • {charData.level >= 5 ? 'Descanso Corto/Largo' : 'Descanso Largo'}
                        </span>
                      </div>

                      <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                        <p className="text-[11px] text-[#5e4e3e]">
                          Acción adicional: concede 1{inspDie} a un aliado a 60 pies para sumar a un ataque, prueba de característica o salvación en los próximos 10 minutos.
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie('Inspiración Bárdica', 0, inspDie as any, 'normal', `1${inspDie}`)}
                          className="px-3.5 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#8032a8]" /> Tirar 1{inspDie}
                        </button>
                      </div>
                    </div>

                    {/* Colegio de las Espadas: Florituras de la Hoja */}
                    {isSwords && (charData.level || 1) >= 3 && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#b88c32] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Shield className="w-4 h-4 text-[#8c672b]" />
                            <span>Florituras de Cuchilla (Blade Flourish • +10 pies vel al Atacar)</span>
                          </div>
                          <span className="text-[10px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold">
                            {charData.level >= 14 ? 'Floritura del Maestro (1d6 gratis)' : `Gasta 1${inspDie}`}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {/* Floritura Defensiva */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">Floritura Defensiva</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Suma 1{inspDie} al daño del ataque y a tu Clase de Armadura hasta el inicio de tu siguiente turno.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Floritura Defensiva (+Daño y +CA)', 0, inspDie as any, 'normal', `1${inspDie}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Shield className="w-3.5 h-3.5 text-[#2d7c52]" /> +1{inspDie} CA & Daño
                            </button>
                          </div>

                          {/* Floritura Cortante */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">Floritura Cortante</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Suma 1{inspDie} al daño del blanco y causas esa misma cantidad de daño a otro enemigo a 5 pies de ti.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Floritura Cortante (Daño Múltiple)', 0, inspDie as any, 'normal', `1${inspDie}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> +1{inspDie} Daño 2 Blancos
                            </button>
                          </div>

                          {/* Floritura Móvil */}
                          <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col justify-between gap-2">
                            <div>
                              <div className="font-fantasy font-bold text-[#8c672b]">Floritura Móvil</div>
                              <p className="text-[10px] text-[#5e4e3e] mt-1 leading-snug">
                                Suma 1{inspDie} al daño, empujas al blanco 5 + resultado pies lejos de ti y puedes moverte adyacente a él de inmediato.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => rollDie('Floritura Móvil (Empuje & Persecución)', 0, inspDie as any, 'normal', `1${inspDie}`)}
                              className="w-full py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Dices className="w-3.5 h-3.5" /> +1{inspDie} Daño & Empuje
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Colegio del Saber: Palabras Cortantes */}
                    {isLore && (charData.level || 1) >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#2b6cb0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#2b6cb0]">Palabras Mordaces (Cutting Words - Reacción)</div>
                          <p className="text-[10px] text-[#5e4e3e]">
                            Gasta 1{inspDie} para restar el número al ataque, prueba de característica o daño de una criatura visible a 60 pies.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => rollDie('Palabras Mordaces (Resta al d20/Daño rival)', 0, inspDie as any, 'normal', `1${inspDie}`)}
                          className="px-3 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#2b6cb0]" /> Restar 1{inspDie}
                        </button>
                      </div>
                    )}

                    {/* Colegio de los Susurros: Hojas Psíquicas */}
                    {isWhispers && (charData.level || 1) >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#431459] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#431459]">Hojas Psíquicas (Psychic Blades)</div>
                          <p className="text-[10px] text-[#5e4e3e]">
                            Al impactar con arma: gasta 1 Inspiración Bárdica para infligir {charData.level >= 15 ? '10d6' : charData.level >= 10 ? '8d6' : charData.level >= 5 ? '5d6' : '3d6'} de daño psíquico extra.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const diceCount = charData.level >= 15 ? 10 : charData.level >= 10 ? 8 : charData.level >= 5 ? 5 : 3;
                            rollDie('Hojas Psíquicas (Daño Psíquico)', 0, 'd6', 'normal', `${diceCount}d6`);
                          }}
                          className="px-3 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#431459]" /> Daño Psíquico
                        </button>
                      </div>
                    )}

                    {/* Colegio de los Espíritus: Cuentos del Más Allá */}
                    {isSpirits && (charData.level || 1) >= 3 && (
                      <div className="p-3.5 bg-gradient-to-br from-[#f5ede0] to-[#ecdcc4] rounded-xl border-2 border-[#4a5568] space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-fantasy font-bold text-xs text-[#2c221a]">
                            <Sparkles className="w-4 h-4 text-[#4a5568]" />
                            <span>Cuentos del Más Allá (Tales from Beyond)</span>
                          </div>
                          <span className="text-[10px] bg-[#4a5568] text-white px-2 py-0.5 rounded font-mono font-bold">
                            Tirar 1{inspDie} Espíritus
                          </span>
                        </div>

                        <div className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                          <p className="text-[11px] text-[#5e4e3e]">
                            Acción adicional: gasta 1 Inspiración Bárdica y tira 1{inspDie} en la tabla oficial de espíritus ancestrales.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const maxDie = charData.level >= 14 ? 12 : charData.level >= 10 ? 10 : charData.level >= 6 ? 8 : 6;
                              const rolled = Math.floor(Math.random() * maxDie) + 1;
                              const spiritTales: Record<number, { title: string; effect: string }> = {
                                1: { title: 'Cuento de la Bestia', effect: 'El objetivo a 30 pies sufre daño necrótico igual a 1 dado de inspiración + Carisma y debe superar salvación de Fuerza o caer derribado.' },
                                2: { title: 'Cuento del Guerrero', effect: 'Al golpear con un arma en los próximos 10 minutos, sumas daño de fuerza igual a 2 dados de inspiración.' },
                                3: { title: 'Cuento de los Amigos', effect: 'Tú y un aliado a 30 pies ganan ventaja en pruebas de Sabiduría (Perspicacia) y salvaciones de Sabiduría, Carisma e Inteligencia durante 10 minutos.' },
                                4: { title: 'Cuento del Fugitivo', effect: 'Tú y hasta Carisma aliados a 30 pies pueden teletransportarse de inmediato hasta 30 pies como reacción.' },
                                5: { title: 'Cuento del Vengador', effect: 'Durante 1 minuto, la primera vez que una criatura impacte al objetivo con un ataque cuerpo a cuerpo, sufre daño de fuerza igual a 2 dados de inspiración.' },
                                6: { title: 'Cuento del Viajero', effect: 'Tú y un aliado ganan puntos de golpe temporales iguales a 1 dado de inspiración + Carisma y +10 pies a su velocidad durante 1 hora.' },
                                7: { title: 'Cuento del Seductor', effect: 'Una criatura a 30 pies debe superar salvación de Carisma o quedar incapacitada y su velocidad reducida a 0 hasta el final de tu siguiente turno.' },
                                8: { title: 'Cuento del Fantasma', effect: 'El objetivo se vuelve invisible hasta el final de su siguiente turno y puede atravesar criaturas y objetos como terreno difícil.' },
                                9: { title: 'Cuento del Bruto', effect: 'Cada criatura a 30 pies sufre daño atronador igual a 3 dados de inspiración si falla salvación de Constitución (mitad si supera).' },
                                10: { title: 'Cuento del Dragón', effect: 'Exhalas fuego en un cono de 30 pies: cada criatura en el área sufre daño de fuego igual a 4 dados de inspiración si falla salvación de Destreza (mitad si supera).' },
                                11: { title: 'Cuento del Ángel', effect: 'El objetivo recupera puntos de golpe iguales a 3 dados de inspiración + Carisma y se limpia de cualquier condición de ceguera, sordera, parálisis o envenenamiento.' },
                                12: { title: 'Cuento de la Mente-Mente', effect: 'Una criatura a 30 pies sufre daño psíquico igual a 4 dados de inspiración y queda aturdida hasta el inicio de tu siguiente turno si falla salvación de Inteligencia.' },
                              };
                              const tale = spiritTales[rolled];
                              setThemedAlert({
                                isOpen: true,
                                title: `🔮 ¡Espíritu Invocado: ${tale.title}! (d${maxDie} = ${rolled})`,
                                subtitle: 'Efecto de Cuentos del Más Allá (Colegio de los Espíritus)',
                                type: 'dice',
                                message: (
                                  <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-1.5">
                                    <div className="font-fantasy font-bold text-sm text-[#4a5568]">
                                      Milagro Espiritual:
                                    </div>
                                    <p className="leading-relaxed">{tale.effect}</p>
                                  </div>
                                ),
                              });
                            }}
                            className="px-3.5 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                          >
                            <Dices className="w-3.5 h-3.5 text-[#4a5568]" /> Invocar Cuento
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y RASGOS DE COMBATE DEL CLÉRIGO --- */}
              {(() => {
                const isCleric = charData.class.toLowerCase().includes('clérigo') || charData.class.toLowerCase().includes('clerigo') || charData.class.toLowerCase().includes('cleric');
                if (!isCleric) return null;

                const clericLevel = charData.level || 1;
                const wisMod = Math.floor(((charData.stats.wis || 10) - 10) / 2);
                const profBonus = Math.floor((clericLevel - 1) / 4) + 2;
                const spellSaveDc = 8 + profBonus + wisMod;
                const subLower = (charData.subclass || '').toLowerCase();

                // Channel Divinity info
                const divinityUses = clericLevel >= 18 ? 3 : clericLevel >= 6 ? 2 : clericLevel >= 2 ? 1 : 0;
                let destroyCr = '';
                if (clericLevel >= 17) destroyCr = 'VD 4 o menor';
                else if (clericLevel >= 14) destroyCr = 'VD 3 o menor';
                else if (clericLevel >= 11) destroyCr = 'VD 2 o menor';
                else if (clericLevel >= 8) destroyCr = 'VD 1 o menor';
                else if (clericLevel >= 5) destroyCr = 'VD 1/2 o menor';

                // Level 8 feature
                const isPotent = subLower.includes('luz') || subLower.includes('light') ||
                  subLower.includes('conocimiento') || subLower.includes('knowledge') ||
                  subLower.includes('tumba') || subLower.includes('grave') ||
                  subLower.includes('paz') || subLower.includes('peace') ||
                  subLower.includes('arcano') || subLower.includes('arcana');
                const divineStrikeDice = clericLevel >= 14 ? '2d8' : '1d8';

                return (
                  <div className="p-3.5 bg-[#f5ede0] rounded-2xl border border-[#d8c8af] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#e2d2ba] pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#8c672b]" />
                        <span className="font-fantasy font-bold text-xs uppercase text-[#4a361c] tracking-wide">
                          Poderes Divinos del Clérigo (Canalizar Divinidad & Milagros)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#786450] font-serif italic">
                        CD Salvación Divina: <span className="font-bold text-[#8c672b]">{spellSaveDc}</span>
                      </span>
                    </div>

                    {/* Canalizar Divinidad Panel (Nivel 2+) */}
                    {clericLevel >= 2 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                            Canalizar Divinidad ({divinityUses} {divinityUses === 1 ? 'uso' : 'usos'}/descanso corto)
                          </div>
                          {destroyCr && (
                            <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold">
                              Destruir Muertos Vivientes: {destroyCr}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Expulsar Muertos Vivientes */}
                          <div className="p-2 bg-[#f8f5ee] rounded border border-[#dfcfb4] flex flex-col justify-between gap-1.5">
                            <div>
                              <div className="font-bold text-[#5c4424] text-[11px]">Expulsar Muertos Vivientes</div>
                              <p className="text-[10px] text-[#6b5845]">
                                Cada no muerto a 30 pies debe superar salvación de Sabiduría (CD {spellSaveDc}) o huir durante 1 minuto.
                                {destroyCr ? ` Si falla y su VD es ${destroyCr}, es destruido al instante.` : ''}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setThemedAlert({
                                  isOpen: true,
                                  title: '✝️ ¡Expulsar Muertos Vivientes Activado!',
                                  subtitle: `Canalizar Divinidad (CD Salvación Sabiduría: ${spellSaveDc})`,
                                  type: 'info',
                                  message: (
                                    <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-1.5">
                                      <p>Cada muerto viviente a 30 pies o menos que pueda verte u oírte debe realizar una tirada de salvación de Sabiduría contra tu <strong>CD {spellSaveDc}</strong>.</p>
                                      {destroyCr && (
                                        <p className="text-[#8c672b] font-bold">
                                          ⚡ ¡Destruir Muertos Vivientes Activo! Si la criatura tiene {destroyCr}, es pulverizada al instante sin tirada de daño.
                                        </p>
                                      )}
                                      <p className="text-[11px] text-[#6b5845]">Si no es destruida, debe pasar sus turnos alejándose lo más lejos posible de ti y no puede realizar reacciones.</p>
                                    </div>
                                  ),
                                });
                              }}
                              className="w-full py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition cursor-pointer"
                            >
                              Canalizar Expulsión (CD {spellSaveDc})
                            </button>
                          </div>

                          {/* Arnés de Poder Divino (Tasha) */}
                          <div className="p-2 bg-[#f8f5ee] rounded border border-[#dfcfb4] flex flex-col justify-between gap-1.5">
                            <div>
                              <div className="font-bold text-[#5c4424] text-[11px]">Arnés de Poder Divino (Tasha)</div>
                              <p className="text-[10px] text-[#6b5845]">
                                Como acción adicional, gasta 1 uso de Canalizar Divinidad para recuperar 1 ranura de conjuro gastada de hasta nivel {Math.ceil(profBonus / 2)}.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setThemedAlert({
                                  isOpen: true,
                                  title: '✨ ¡Arnés de Poder Divino!',
                                  subtitle: `Recupera 1 ranura de nivel 1 a ${Math.ceil(profBonus / 2)}`,
                                  type: 'info',
                                  message: 'Has orado sosteniendo tu símbolo sagrado para convertir la energía divina en una ranura de conjuro gastada. Puedes marcar la ranura en la pestaña "Grimorio".',
                                });
                              }}
                              className="w-full py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition cursor-pointer"
                            >
                              Recuperar Ranura (Hasta Nv {Math.ceil(profBonus / 2)})
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Intervención Divina (Nivel 10+) */}
                    {clericLevel >= 10 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#8c672b] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#8c672b]">
                            Intervención Divina {clericLevel >= 20 ? '(Éxito Automático Nv 20)' : `(Éxito con d100 ≤ ${clericLevel})`}
                          </div>
                          <p className="text-[10px] text-[#5e4e3e]">
                            {clericLevel >= 20
                              ? 'Tu deidad responde directamente a tu súplica sin necesidad de tirar dados (recarga en 7 días).'
                              : `Pide auxilio a tu deidad. Si tiras ${clericLevel} o menos en 1d100, la deidad interviene con el efecto de cualquier conjuro o milagro.`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (clericLevel >= 20) {
                              setThemedAlert({
                                isOpen: true,
                                title: '⚡ ¡INTERVENCIÓN DIVINA ABSOLUTA! (Nivel 20)',
                                subtitle: 'Éxito Garantizado al 100%',
                                type: 'dice',
                                message: 'Como Clérigo de Nivel 20, tu deidad responde directamente a tu llamado sin necesidad de tirar dados. Cualquier conjuro de clérigo o milagro a discreción del DM surte efecto inmediato (recarga en 7 días).',
                              });
                            } else {
                              const d100 = Math.floor(Math.random() * 100) + 1;
                              const isSuccess = d100 <= clericLevel;
                              setThemedAlert({
                                isOpen: true,
                                title: isSuccess ? `🌟 ¡INTERVENCIÓN DIVINA EXITOSA! (d100 = ${d100})` : `☁️ La Deidad Guarda Silencio (d100 = ${d100})`,
                                subtitle: `Objetivo: sacar ${clericLevel} o menos`,
                                type: 'dice',
                                message: (
                                  <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-1.5">
                                    {isSuccess ? (
                                      <p className="font-bold text-[#2e6930]">
                                        ¡Tu plegaria fue escuchada! Con un resultado de {d100} (menor o igual a tu nivel {clericLevel}), tu deidad interviene de inmediato. No puedes volver a usar este rasgo durante 7 días.
                                      </p>
                                    ) : (
                                      <p className="text-[#8c322b]">
                                        Tu tirada fue de {d100} (se necesitaba {clericLevel} o menos). Tu deidad no intervino en esta ocasión. Podrás volver a intentarlo tras un descanso largo.
                                      </p>
                                    )}
                                  </div>
                                ),
                              });
                            }
                          }}
                          className="px-3.5 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Invocar Intervención (1d100)
                        </button>
                      </div>
                    )}

                    {/* Golpe Divino o Lanzamiento Potente (Nivel 8+) */}
                    {clericLevel >= 8 && (
                      <div className="p-2.5 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#5c4424]">
                            {isPotent ? 'Lanzamiento Potente de Conjuros' : `Golpe Divino (+${divineStrikeDice})`}
                          </div>
                          <p className="text-[10px] text-[#6b5845]">
                            {isPotent
                              ? `Suma tu modificador de Sabiduría (+${wisMod}) al daño de cualquiera de tus trucos de clérigo.`
                              : `Una vez por turno al golpear con un ataque con arma, sumas ${divineStrikeDice} de daño adicional según tu dominio.`}
                          </p>
                        </div>
                        {!isPotent && (
                          <button
                            type="button"
                            onClick={() => rollDie(`Golpe Divino (+${divineStrikeDice})`, 0, 'd8', 'normal', divineStrikeDice)}
                            className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                          >
                            <Dices className="w-3.5 h-3.5" /> Tirar {divineStrikeDice}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y FORMA SALVAJE DEL DRUIDA --- */}
              {(() => {
                const isDruid = charData.class.toLowerCase().includes('druida') || charData.class.toLowerCase().includes('druid');
                if (!isDruid) return null;

                const druidLevel = charData.level || 1;
                const wisMod = Math.floor(((charData.stats.wis || 10) - 10) / 2);
                const profBonus = Math.floor((druidLevel - 1) / 4) + 2;
                const subLower = (charData.subclass || '').toLowerCase();
                const isMoon = subLower.includes('luna') || subLower.includes('moon');

                // Wild shape info
                const wildShapeUses = druidLevel >= 20 ? 'Ilimitado' : druidLevel >= 2 ? '2 usos' : '0';
                const durationHours = Math.floor(druidLevel / 2);

                // CR and movement limitations
                let maxCrStr = 'VD 1/4';
                let canSwim = druidLevel >= 4;
                let canFly = druidLevel >= 8;
                let canElemental = false;

                if (isMoon) {
                  canElemental = druidLevel >= 10;
                  if (druidLevel >= 6) {
                    maxCrStr = `VD ${Math.floor(druidLevel / 3)}`;
                  } else {
                    maxCrStr = 'VD 1';
                  }
                } else {
                  if (druidLevel >= 8) maxCrStr = 'VD 1';
                  else if (druidLevel >= 4) maxCrStr = 'VD 1/2';
                  else maxCrStr = 'VD 1/4';
                }

                return (
                  <div className="p-3.5 bg-[#f5ede0] rounded-2xl border border-[#d8c8af] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#e2d2ba] pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
                        <span className="font-fantasy font-bold text-xs uppercase text-[#2d6a4f] tracking-wide">
                          Poderes Primigenios del Druida (Forma Salvaje & Círculo)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#786450] font-serif italic">
                        {druidLevel >= 20 ? 'Archidruida Ilimitado' : `Recarga: Descanso Corto`}
                      </span>
                    </div>

                    {/* Forma Salvaje Card (Nivel 2+) */}
                    {druidLevel >= 2 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#b7d5c4] space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="font-fantasy font-bold text-xs text-[#2d6a4f]">
                            Forma Salvaje ({wildShapeUses} • Duración: {durationHours}h)
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <span className="px-2 py-0.5 bg-[#d8f3dc] text-[#1b4332] rounded font-bold">
                              Límite: {maxCrStr}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${canSwim ? 'bg-[#caf0f8] text-[#03045e]' : 'bg-[#e9ecef] text-[#6c757d]'}`}>
                              {canSwim ? 'Nado ✓' : 'Sin Nado'}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${canFly ? 'bg-[#e0aaff] text-[#3c096c]' : 'bg-[#e9ecef] text-[#6c757d]'}`}>
                              {canFly ? 'Vuelo ✓' : 'Sin Vuelo'}
                            </span>
                            {canElemental && (
                              <span className="px-1.5 py-0.5 bg-[#ffd166] text-[#7f4f00] rounded font-bold">
                                Elemental (VD 5)
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-[10px] text-[#5e4e3e] leading-snug">
                          {isMoon
                            ? 'Acción adicional para transformarte. Adoptas los puntos de golpe, sentidos y ataques de la bestia. Puedes gastar una ranura de conjuro para curarte 1d8 PG por nivel de ranura.'
                            : 'Acción para transformarte en bestias observadas. Adoptas los PG, sentidos y movilidad de la criatura. También puedes gastar 1 uso para invocar un Familiar Feérico (Tasha).'}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {/* Botón de Bestias Populares */}
                          <button
                            type="button"
                            onClick={() => {
                              setThemedAlert({
                                isOpen: true,
                                title: `🐾 Bestias Canónicas de Forma Salvaje (${maxCrStr})`,
                                subtitle: isMoon ? 'Círculo de la Luna (VD Mejorado & Acción Adicional)' : 'Formas Salvajes de Druida Estándar',
                                type: 'info',
                                message: (
                                  <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#4a361c] space-y-2">
                                    <p className="font-bold text-[#2d6a4f]">Recomendaciones según tu nivel y límite ({maxCrStr}):</p>
                                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#4a361c]">
                                      {druidLevel >= 2 && !isMoon && (
                                        <>
                                          <li><strong>VD 1/4:</strong> Lobo (11 PG, CA 13, Ventaja por Manada y Derribo), Jabalí (11 PG, Carga 2d6), Tejón Gigante (13 PG, excavar 10 pies).</li>
                                          {canSwim && <li><strong>VD 1/2 (Nv 4+):</strong> Simio (19 PG, Multiataque), Cocodrilo (19 PG, nado 30 pies y presa mordisco), Oso Negro (19 PG, 2 ataques).</li>}
                                          {canFly && <li><strong>VD 1 (Nv 8+):</strong> Águila Gigante (26 PG, vuelo 80 pies), Buitre Gigante (22 PG, vuelo 60 pies), Búho Gigante (19 PG).</li>}
                                        </>
                                      )}
                                      {isMoon && (
                                        <>
                                          <li><strong>VD 1 (Nv 2+):</strong> Oso Pardo (34 PG, Multiataque 1d8+4 y 2d6+4), Lobo Terrible (37 PG, mordisco 2d6+3 y Derribo), Hiena Gigante (45 PG).</li>
                                          {druidLevel >= 6 && <li><strong>VD 2 (Nv 6+):</strong> Oso Polar / Cavernario (42 PG, Multiataque), Tigre Dientes de Sable (52 PG, 2d10+5), Rinoceronte (45 PG, cornada y carga).</li>}
                                          {druidLevel >= 9 && <li><strong>VD 3 (Nv 9+):</strong> Anquilosaurio (68 PG, cola 4d6+4 y derribo), Escorpión Gigante (52 PG, 3 ataques con pinzas y aguijón venenoso 4d10).</li>}
                                          {druidLevel >= 10 && <li><strong>VD 5 (Nv 10+ Elementales - 2 Usos):</strong> Elemental de Fuego (102 PG, Ignición), Elemental de Agua (114 PG, Envolver), Elemental de Tierra (126 PG, Deslizamiento pétreo), Elemental de Aire (90 PG, Torbellino).</li>}
                                          {druidLevel >= 12 && <li><strong>VD 4 (Nv 12+):</strong> Elefante (76 PG, pisotón 3d10+6), Estegosaurio (64 PG).</li>}
                                          {druidLevel >= 15 && <li><strong>VD 5 (Nv 15+):</strong> Triceratops (95 PG, 4d8+6), Mamut (126 PG).</li>}
                                        </>
                                      )}
                                    </ul>
                                  </div>
                                ),
                              });
                            }}
                            className="px-3 py-1 bg-[#d8f3dc] hover:bg-[#b7e4c7] text-[#1b4332] border border-[#95d5b2] rounded text-xs font-fantasy font-bold transition cursor-pointer"
                          >
                            Ver Catálogo de Bestias ({maxCrStr})
                          </button>

                          {/* Curación de Combate (Luna) */}
                          {isMoon && (
                            <button
                              type="button"
                              onClick={() => rollDie('Curación de Combate en Forma Salvaje (Ranura Nv 1)', 0, 'd8', 'normal', '1d8')}
                              className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Dices className="w-3.5 h-3.5 text-[#2d6a4f]" /> Curación (1d8/ranura)
                            </button>
                          )}

                          {/* Compañero Salvaje (Tasha) */}
                          <button
                            type="button"
                            onClick={() => {
                              setThemedAlert({
                                isOpen: true,
                                title: '🦊 Compañero Salvaje Invocado (Tasha Nivel 2)',
                                subtitle: `Dura ${durationHours} horas • Gasta 1 uso de Forma Salvaje`,
                                type: 'info',
                                message: 'Como acción, gastas 1 uso de Forma Salvaje para lanzar Encontrar Familiar sin componentes de oro. Tu familiar es una fata en lugar de una bestia y desaparece al terminar la duración.',
                              });
                            }}
                            className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-xs font-fantasy font-bold transition cursor-pointer"
                          >
                            Invocar Familiar Feérico
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Círculo de las Esporas: Halo & Entidad */}
                    {subLower.includes('esporas') && druidLevel >= 2 && (
                      <div className="p-2.5 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#495057]">Halo de Esporas & Entidad Simbiótica</div>
                          <p className="text-[10px] text-[#6b5845]">
                            Reacción al acercarse enemigo: {druidLevel >= 14 ? '1d10' : druidLevel >= 10 ? '1d8' : druidLevel >= 6 ? '1d6' : '1d4'} de daño necrótico (o el doble con Entidad Simbiótica).
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const dice = druidLevel >= 14 ? 'd10' : druidLevel >= 10 ? 'd8' : druidLevel >= 6 ? 'd6' : 'd4';
                            rollDie(`Halo de Esporas (Daño Necrótico)`, 0, dice as any, 'normal', `1${dice}`);
                          }}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5" /> Tirar Esporas
                        </button>
                      </div>
                    )}

                    {/* Círculo de las Estrellas: Flecha del Arquero */}
                    {subLower.includes('estrellas') && druidLevel >= 2 && (
                      <div className="p-2.5 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-fantasy font-bold text-[#4361ee]">Forma Estelar: Proyectil del Arquero</div>
                          <p className="text-[10px] text-[#6b5845]">
                            Acción adicional en Forma de Arquero: ataque de conjuro a distancia a 60 pies por {druidLevel >= 10 ? '2d8' : '1d8'} + {wisMod} de daño radiante.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const dice = druidLevel >= 10 ? '2d8' : '1d8';
                            rollDie(`Flecha Luminosa del Arquero`, wisMod, 'd8', 'normal', `${dice} + ${wisMod}`);
                          }}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#4361ee]" /> Disparo ({druidLevel >= 10 ? '2d8' : '1d8'}+{wisMod})
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y RASGOS DE COMBATE DEL EXPLORADOR --- */}
              {(() => {
                const isRanger = charData.class.toLowerCase().includes('explorador') || charData.class.toLowerCase().includes('ranger');
                if (!isRanger) return null;

                const rangerLevel = charData.level || 1;
                const wisMod = Math.floor(((charData.stats.wis || 10) - 10) / 2);
                const profBonus = Math.floor((rangerLevel - 1) / 4) + 2;
                const spellSaveDc = 8 + profBonus + wisMod;
                const subLower = (charData.subclass || '').toLowerCase();

                // Subclases
                const isHunter = subLower.includes('cazador') || subLower.includes('hunter');
                const isGloomStalker = subLower.includes('acechador') || subLower.includes('sombrio') || subLower.includes('sombrío') || subLower.includes('gloom');
                const isHorizonWalker = subLower.includes('horizonte') || subLower.includes('horizon');
                const isMonsterSlayer = subLower.includes('monstruos') || subLower.includes('slayer');
                const isSwarmkeeper = subLower.includes('enjambre') || subLower.includes('swarm');
                const isDrakewarden = subLower.includes('draconico') || subLower.includes('dracónico') || subLower.includes('drake');
                const isFeyWanderer = subLower.includes('fey') || subLower.includes('feerico') || subLower.includes('feérico') || subLower.includes('erudito');

                // Fervor del cazador / Favored Foe die
                const favoredFoeDie = rangerLevel >= 14 ? 'd8' : rangerLevel >= 6 ? 'd6' : 'd4';

                return (
                  <div className="p-3.5 bg-[#f5ede0] rounded-2xl border border-[#d8c8af] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#e2d2ba] pb-2">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#2d6a4f]" />
                        <span className="font-fantasy font-bold text-xs uppercase text-[#1b4332] tracking-wide">
                          Rasgos Tácticos del Explorador (Caza & Supervivencia)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#786450] font-serif italic">
                        CD Conjuros / Habilidades: <span className="font-bold text-[#2d6a4f]">{spellSaveDc}</span>
                      </span>
                    </div>

                    {/* Fervor del Cazador / Favored Foe (Tasha) */}
                    <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#b7d5c4] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-fantasy font-bold text-xs text-[#2d6a4f]">
                          Fervor del Cazador (Favored Foe • 1{favoredFoeDie})
                        </div>
                        <span className="px-2 py-0.5 bg-[#d8f3dc] text-[#1b4332] rounded text-[10px] font-bold">
                          {profBonus} usos/descanso largo
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5e4e3e]">
                        Al impactar a una criatura, puedes marcarla (concentración, 1 min). La primera vez que la impactes en cada uno de tus turnos infliges +1{favoredFoeDie} de daño adicional.
                      </p>
                      <button
                        type="button"
                        onClick={() => rollDie(`Fervor del Cazador (Daño Adicional)`, 0, favoredFoeDie as any, 'normal', `1${favoredFoeDie}`)}
                        className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Dices className="w-3.5 h-3.5 text-[#2d6a4f]" /> Tirar 1{favoredFoeDie} Fervor
                      </button>
                    </div>

                    {/* Acechador Sombrío (Gloom Stalker) */}
                    {isGloomStalker && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#f8f0fc] rounded-xl border border-[#8032a8] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#431459]">
                            Emboscador Temible & Visión Umbría
                          </div>
                          <span className="px-2 py-0.5 bg-[#e8d5f5] text-[#431459] rounded text-[10px] font-bold">
                            +{Math.max(0, wisMod)} Iniciativa • Turno 1
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          En el 1.er turno de combate tu velocidad aumenta 10 pies y tienes 1 ataque adicional con arma que inflige +1d8 de daño adicional. Eres invisible ante criaturas que usan visión en la oscuridad para verte en penumbra/oscuridad.
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Ataque de Emboscador Temible (Daño Extra Turno 1)`, 0, 'd8', 'normal', '1d8')}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#8032a8]" /> Tirar +1d8 Daño Turno 1
                        </button>
                      </div>
                    )}

                    {/* Cazador (Hunter) */}
                    {isHunter && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-2">
                        <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                          Presa del Cazador (Hunter's Prey)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Asesino de Colosos: Si el rival tiene menos de sus PG máximos, infliges +1d8 de daño adicional una vez por turno.
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Asesino de Colosos (Daño Extra)`, 0, 'd8', 'normal', '1d8')}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Tirar +1d8 Asesino de Colosos
                        </button>
                      </div>
                    )}

                    {/* Caminante del Horizonte (Horizon Walker) */}
                    {isHorizonWalker && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#f0f8ff] rounded-xl border border-[#4682b4] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#1e4e79]">
                            Guerrero Planar (Planar Warrior)
                          </div>
                          <span className="px-2 py-0.5 bg-[#dbeafe] text-[#1e4e79] rounded text-[10px] font-bold">
                            {rangerLevel >= 11 ? '2d8' : '1d8'} Daño Fuerza
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: convierte todo el daño de tu próximo impacto con arma en este turno a daño de FUERZA y suma {rangerLevel >= 11 ? '+2d8' : '+1d8'} de daño de fuerza.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const dice = rangerLevel >= 11 ? '2d8' : '1d8';
                            rollDie(`Guerrero Planar (Daño de Fuerza)`, 0, 'd8', 'normal', dice);
                          }}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#1e4e79]" /> Tirar {rangerLevel >= 11 ? '2d8' : '1d8'} Fuerza
                        </button>
                      </div>
                    )}

                    {/* Asesino de Monstruos (Monster Slayer) */}
                    {isMonsterSlayer && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#b84832] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#b84832]">
                            Presa del Exterminador & Sentido del Cazador
                          </div>
                          <span className="px-2 py-0.5 bg-[#fee2e2] text-[#991b1b] rounded text-[10px] font-bold">
                            +1d6 Daño de Arma
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional para marcar a tu presa: la primera vez que la impactes en cada turno con un arma recibe +1d6 daño. Con Sentido del Cazador descubres sus resistencias y vulnerabilidades.
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Presa del Exterminador (Daño Extra)`, 0, 'd6', 'normal', '1d6')}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#b84832]" /> Tirar +1d6 Presa
                        </button>
                      </div>
                    )}

                    {/* Guardián del Enjambre (Swarmkeeper) */}
                    {isSwarmkeeper && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#fcfaf2] rounded-xl border border-[#786450] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#4a361c]">
                            Enjambre Reagrupado (Gathered Swarm)
                          </div>
                          <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold">
                            {rangerLevel >= 11 ? '1d8' : '1d6'} Perforante / Empujón 15 pies
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al impactar con un ataque una vez por turno: inflige {rangerLevel >= 11 ? '1d8' : '1d6'} de daño perforante, o empuja a la criatura hasta 15 pies (salvación Fuerza CD {spellSaveDc}), o te mueves 5 pies sin provocar oportunidad.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const dice = rangerLevel >= 11 ? 'd8' : 'd6';
                            rollDie(`Enjambre Reagrupado (Daño Perforante)`, 0, dice as any, 'normal', `1${dice}`);
                          }}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#4a361c]" /> Tirar {rangerLevel >= 11 ? '1d8' : '1d6'} Enjambre
                        </button>
                      </div>
                    )}

                    {/* Guardián Dracónico (Drakewarden) */}
                    {isDrakewarden && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#ea580c] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#9a3412]">
                            Compañero Drake & Mordisco Elemental
                          </div>
                          <span className="px-2 py-0.5 bg-[#ffedd5] text-[#9a3412] rounded text-[10px] font-bold">
                            Drake CA {14 + profBonus} • PG {5 + 5 * rangerLevel}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          El Drake muerde por 1d6 + {profBonus} perforante + {rangerLevel >= 15 ? '2d6' : '1d6'} de daño elemental. A Nivel 11+ exhala aliento ({rangerLevel >= 15 ? '10d6' : '8d6'}, CD {spellSaveDc}).
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => rollDie(`Mordisco del Drake (Esencia Elemental)`, 0, 'd6', 'normal', rangerLevel >= 15 ? '2d6' : '1d6')}
                            className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Dices className="w-3.5 h-3.5 text-[#ea580c]" /> Mordisco (+{rangerLevel >= 15 ? '2d6' : '1d6'} Elemental)
                          </button>
                          {rangerLevel >= 11 && (
                            <button
                              type="button"
                              onClick={() => rollDie(`Aliento del Drake (${rangerLevel >= 15 ? '10d6' : '8d6'})`, 0, 'd6', 'normal', rangerLevel >= 15 ? '10d6' : '8d6')}
                              className="px-3 py-1 bg-[#ffedd5] hover:bg-[#fed7aa] text-[#9a3412] border border-[#f97316] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Flame className="w-3.5 h-3.5 text-[#ea580c]" /> Aliento ({rangerLevel >= 15 ? '10d6' : '8d6'})
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Erudito Fey (Fey Wanderer) */}
                    {isFeyWanderer && rangerLevel >= 3 && (
                      <div className="p-3 bg-[#fdf2f8] rounded-xl border border-[#db2777] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#9d174d]">
                            Don Temible (Dreadful Strikes)
                          </div>
                          <span className="px-2 py-0.5 bg-[#fce7f3] text-[#9d174d] rounded text-[10px] font-bold">
                            +{rangerLevel >= 11 ? '1d6' : '1d4'} Psíquico
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          La primera vez que impactes a una criatura en tu turno con un arma, infliges +{rangerLevel >= 11 ? '1d6' : '1d4'} de daño psíquico. Además sumas +{Math.max(0, wisMod)} a tus pruebas de Carisma por Presencia de Otro Mundo.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const dice = rangerLevel >= 11 ? 'd6' : 'd4';
                            rollDie(`Don Temible (Daño Psíquico)`, 0, dice as any, 'normal', `1${dice}`);
                          }}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#db2777]" /> Tirar +{rangerLevel >= 11 ? '1d6' : '1d4'} Psíquico
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y RASGOS DE COMBATE DEL GUERRERO --- */}
              {(() => {
                const isFighter = charData.class.toLowerCase().includes('guerrero') || charData.class.toLowerCase().includes('fighter');
                if (!isFighter) return null;

                const fighterLevel = charData.level || 1;
                const strMod = Math.floor(((charData.stats.str || 10) - 10) / 2);
                const dexMod = Math.floor(((charData.stats.dex || 10) - 10) / 2);
                const conMod = Math.floor(((charData.stats.con || 10) - 10) / 2);
                const intMod = Math.floor(((charData.stats.int || 10) - 10) / 2);
                const profBonus = Math.floor((fighterLevel - 1) / 4) + 2;
                const subLower = (charData.subclass || '').toLowerCase();

                // Subclases
                const isChampion = subLower.includes('campeon') || subLower.includes('campeón') || subLower.includes('champion');
                const isBattleMaster = subLower.includes('maestro') || subLower.includes('batalla') || subLower.includes('battle master') || subLower.includes('battlemaster');
                const isEchoKnight = subLower.includes('eco') || subLower.includes('echo');
                const isRuneKnight = subLower.includes('runico') || subLower.includes('rúnico') || subLower.includes('rune');
                const isPsiWarrior = subLower.includes('psionico') || subLower.includes('psiónico') || subLower.includes('psi');
                const isSamurai = subLower.includes('samurai') || subLower.includes('samurái');
                const isArcaneArcher = subLower.includes('arquero') || subLower.includes('arcane archer');
                const isCavalier = subLower.includes('cavalier') || subLower.includes('jinete');
                const isEldritchKnight = subLower.includes('caballero-arcano') || subLower.includes('eldritch knight');
                const isPurpleDragon = subLower.includes('purpura') || subLower.includes('púrpura') || subLower.includes('banneret') || subLower.includes('purple dragon');

                // Battle Master Maneuver DC & Die
                const maneuverDc = 8 + profBonus + Math.max(strMod, dexMod);
                const superiorityDie = fighterLevel >= 18 ? 'd12' : fighterLevel >= 10 ? 'd10' : 'd8';
                const psiDie = fighterLevel >= 17 ? 'd12' : fighterLevel >= 11 ? 'd10' : fighterLevel >= 5 ? 'd8' : 'd6';

                return (
                  <div className="p-3.5 bg-[#f5ede0] rounded-2xl border border-[#d8c8af] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#e2d2ba] pb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#8c672b]" />
                        <span className="font-fantasy font-bold text-xs uppercase text-[#4a361c] tracking-wide">
                          Poderío Marcial del Guerrero (Acciones & Tácticas)
                        </span>
                      </div>
                      <span className="text-[10px] text-[#786450] font-serif italic">
                        {fighterLevel >= 20 ? '4 Ataques por Acción' : fighterLevel >= 11 ? '3 Ataques por Acción' : fighterLevel >= 5 ? '2 Ataques por Acción' : '1 Ataque por Acción'}
                      </span>
                    </div>

                    {/* Segundo Aliento (Second Wind) */}
                    <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                          Segundo Aliento (Second Wind • 1d10 + {fighterLevel})
                        </div>
                        <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold">
                          1 uso / descanso corto
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5e4e3e]">
                        Como acción adicional en tu turno, recuperas 1d10 + {fighterLevel} puntos de golpe.
                      </p>
                      <button
                        type="button"
                        onClick={() => rollDie(`Segundo Aliento (Curación de Combate)`, fighterLevel, 'd10', 'normal', `1d10 + ${fighterLevel}`)}
                        className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Tirar 1d10 + {fighterLevel} Curación
                      </button>
                    </div>

                    {/* Maestro de Batalla (Battle Master) */}
                    {isBattleMaster && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#b88c32] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                            Superioridad en Combate (1{superiorityDie})
                          </div>
                          <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold">
                            CD Salvación de Maniobras: {maneuverDc}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Gasta 1 dado de superioridad (1{superiorityDie}) para ejecutar tus maniobras tácticas aprendidas (Ataque con Finta, Barrido, Desarmar, Empujar, Parada, etc.).
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Dado de Superioridad (${superiorityDie})`, 0, superiorityDie as any, 'normal', `1${superiorityDie}`)}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Tirar 1{superiorityDie} Maniobra
                        </button>
                      </div>
                    )}

                    {/* Campeón (Champion) */}
                    {isChampion && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#2c221a]">
                            Crítico {fighterLevel >= 15 ? 'Superior (18-20)' : 'Mejorado (19-20)'}
                          </div>
                          <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold font-mono">
                            Crítico en {fighterLevel >= 15 ? '18, 19, 20' : '19, 20'}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Tus ataques con arma logran un impacto crítico con un resultado de {fighterLevel >= 15 ? '18-20' : '19-20'} en el d20.
                          {fighterLevel >= 18 ? ` Superviviente: recuperas ${5 + conMod} PG al inicio de cada turno si estás bajo el 50% de PG.` : ''}
                        </p>
                      </div>
                    )}

                    {/* Caballero del Eco (Echo Knight) */}
                    {isEchoKnight && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#f0f4f8] rounded-xl border border-[#4a5568] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#2d3748]">
                            Manifestar Eco & Encarnación Desatada
                          </div>
                          <span className="px-2 py-0.5 bg-[#e2e8f0] text-[#2d3748] rounded text-[10px] font-bold">
                            Eco CA {14 + profBonus} • 1 PG
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: invoca eco a 15 pies. Puedes atacar y hacer oportunidad a través de él. Encarnación Desatada otorga 1 ataque CaC adicional al Atacar ({Math.max(1, conMod)} usos/descanso largo).
                        </p>
                      </div>
                    )}

                    {/* Caballero Rúnico (Rune Knight) */}
                    {isRuneKnight && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#fdf6ec] rounded-xl border border-[#d97706] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#b45309]">
                            Fuerza de Gigante & Baluarte Rúnico
                          </div>
                          <span className="px-2 py-0.5 bg-[#fef3c7] text-[#92400e] rounded text-[10px] font-bold">
                            +{fighterLevel >= 18 ? '1d10' : fighterLevel >= 10 ? '1d8' : '1d6'} Daño
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: te vuelves {fighterLevel >= 18 ? 'Enorme' : 'Grande'}, ganas ventaja en pruebas/salvaciones de Fuerza y causas +{fighterLevel >= 18 ? '1d10' : fighterLevel >= 10 ? '1d8' : '1d6'} daño de arma una vez por turno.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const die = fighterLevel >= 18 ? 'd10' : fighterLevel >= 10 ? 'd8' : 'd6';
                            rollDie(`Fuerza de Gigante (Daño Extra)`, 0, die as any, 'normal', `1${die}`);
                          }}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#d97706]" /> Tirar +{fighterLevel >= 18 ? '1d10' : fighterLevel >= 10 ? '1d8' : '1d6'} Daño Gigante
                        </button>
                      </div>
                    )}

                    {/* Guerrero Psiónico (Psi Warrior) */}
                    {isPsiWarrior && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#7c3aed] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#5b21b6]">
                            Poder Psiónico (1{psiDie}) • {profBonus * 2} Dados
                          </div>
                          <span className="px-2 py-0.5 bg-[#ede9fe] text-[#5b21b6] rounded text-[10px] font-bold">
                            CD Inteligencia: {8 + profBonus + intMod}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Gasta 1 dado psiónico para Campo Protector (reacción reduce daño en 1{psiDie}+{intMod}) o Golpe Psiónico (+1{psiDie}+{intMod} daño de fuerza).
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => rollDie(`Campo Protector Psiónico (Reducción)`, intMod, psiDie as any, 'normal', `1${psiDie} + ${intMod}`)}
                            className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Shield className="w-3.5 h-3.5 text-[#7c3aed]" /> Campo Protector (1{psiDie}+{intMod})
                          </button>
                          <button
                            type="button"
                            onClick={() => rollDie(`Golpe Psiónico (Daño Fuerza)`, intMod, psiDie as any, 'normal', `1${psiDie} + ${intMod}`)}
                            className="px-3 py-1 bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#5b21b6] border border-[#a78bfa] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Dices className="w-3.5 h-3.5 text-[#7c3aed]" /> Golpe Psiónico (1{psiDie}+{intMod})
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Samurái (Samurai) */}
                    {isSamurai && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#fef2f2] rounded-xl border border-[#dc2626] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#991b1b]">
                            Espíritu Combatiente (Fighting Spirit)
                          </div>
                          <span className="px-2 py-0.5 bg-[#fee2e2] text-[#991b1b] rounded text-[10px] font-bold">
                            3 usos / descanso largo
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: obtienes ventaja en todos los ataques con armas en este turno y ganas {fighterLevel >= 15 ? 15 : fighterLevel >= 10 ? 10 : 5} puntos de golpe temporales.
                        </p>
                      </div>
                    )}

                    {/* Arquero Arcano (Arcane Archer) */}
                    {isArcaneArcher && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#16a34a] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#166534]">
                            Disparo Arcano ({fighterLevel >= 18 ? '4d6' : '2d6'} Daño)
                          </div>
                          <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] rounded text-[10px] font-bold">
                            CD Salvación: {8 + profBonus + intMod}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          2 usos por descanso corto o largo: imbúe flechas con efectos mágicos (Bramido, Desterradora, Enredadera, etc.) que causan {fighterLevel >= 18 ? '4d6' : '2d6'} de daño adicional.
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Disparo Arcano (Daño Mágico)`, 0, 'd6', 'normal', fighterLevel >= 18 ? '4d6' : '2d6')}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#16a34a]" /> Tirar {fighterLevel >= 18 ? '4d6' : '2d6'} Disparo
                        </button>
                      </div>
                    )}

                    {/* Caballero Jinete (Cavalier) */}
                    {isCavalier && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#fffbeb] rounded-xl border border-[#d97706] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#92400e]">
                            Marca del Incondicional & Maniobra Protectora
                          </div>
                          <span className="px-2 py-0.5 bg-[#fef3c7] text-[#92400e] rounded text-[10px] font-bold">
                            +{Math.floor(fighterLevel / 2)} Daño Especial
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Marca rivales al impactar. Acción adicional: ataque con ventaja que causa +{Math.floor(fighterLevel / 2)} de daño.
                          {fighterLevel >= 7 ? ' Reacción (Maniobra Protectora): suma 1d8 a la CA de un aliado a 5 pies.' : ''}
                        </p>
                        {fighterLevel >= 7 && (
                          <button
                            type="button"
                            onClick={() => rollDie(`Maniobra Protectora (+CA Reacción)`, 0, 'd8', 'normal', '1d8')}
                            className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Shield className="w-3.5 h-3.5 text-[#d97706]" /> Reacción (+1d8 CA)
                          </button>
                        )}
                      </div>
                    )}

                    {/* Caballero Arcano (Eldritch Knight) */}
                    {isEldritchKnight && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#f0f9ff] rounded-xl border border-[#0284c7] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#0369a1]">
                            Vínculo con el Arma & Magia de Guerra
                          </div>
                          <span className="px-2 py-0.5 bg-[#e0f2fe] text-[#0369a1] rounded text-[10px] font-bold">
                            Inteligencia Mágica
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Hasta 2 armas vinculadas (no pueden ser desarmadas y se convocan como acción adicional). A Nivel 7+: al lanzar un truco como acción, puedes realizar 1 ataque de arma como acción adicional.
                        </p>
                      </div>
                    )}

                    {/* Caballero del Dragón Púrpura (Purple Dragon Knight / Banneret) */}
                    {isPurpleDragon && fighterLevel >= 3 && (
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#9333ea] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#7e22ce]">
                            Grito de Concentración & Oleada de Inspiración
                          </div>
                          <span className="px-2 py-0.5 bg-[#f3e8ff] text-[#7e22ce] rounded text-[10px] font-bold">
                            Líder Marcial
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al usar Segundo Aliento: hasta 3 aliados a 60 pies recuperan {fighterLevel} PG. A Nivel 10+: al usar Oleada de Acción, 1 aliado a 60 pies puede realizar 1 ataque como reacción.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES MARCIALES Y TÉCNICAS DE KI DEL MONJE --- */}
              {(() => {
                const isMonk = charData.class.toLowerCase().includes('monje') || charData.class.toLowerCase().includes('monk');
                if (!isMonk) return null;

                const monkLevel = charData.level || 1;
                const dexMod = Math.floor(((charData.stats.dex || 10) - 10) / 2);
                const wisMod = Math.floor(((charData.stats.wis || 10) - 10) / 2);
                const profBonus = Math.floor((monkLevel - 1) / 4) + 2;
                const kiDc = 8 + profBonus + wisMod;
                const martialArtsDie = monkLevel >= 17 ? '1d10' : monkLevel >= 11 ? '1d8' : monkLevel >= 5 ? '1d6' : '1d4';
                const unarmoredSpeed = monkLevel >= 18 ? '+30 pies' : monkLevel >= 14 ? '+25 pies' : monkLevel >= 10 ? '+20 pies' : monkLevel >= 6 ? '+15 pies' : monkLevel >= 2 ? '+10 pies' : '+0 pies';
                const subLower = (charData.subclass || '').toLowerCase();

                const isPalmaAbierta = subLower.includes('palma') || subLower.includes('abierta') || subLower.includes('open hand');
                const isSombra = subLower.includes('sombra') || subLower.includes('shadow');
                const isCuatroElementos = subLower.includes('cuatro') || subLower.includes('element') || subLower.includes('four elements');
                const isMaestroBorracho = subLower.includes('borracho') || subLower.includes('drunken');
                const isKensei = subLower.includes('kensei');
                const isMisericordia = subLower.includes('misericordia') || subLower.includes('mercy');
                const isYoAstral = subLower.includes('astral') || subLower.includes('yo-astral');
                const isAlmaSolar = subLower.includes('solar') || subLower.includes('sun soul');
                const isDragonAscendente = subLower.includes('dragon') || subLower.includes('dragón') || subLower.includes('ascendant');
                const isLongDeath = subLower.includes('muerte') || subLower.includes('long death');

                return (
                  <div className="p-3.5 bg-[#f5ede0] rounded-2xl border border-[#d8c8af] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#e2d2ba] pb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#8c672b]" />
                        <span className="font-fantasy font-bold text-xs uppercase text-[#4a361c] tracking-wide">
                          Disciplina Marcial del Monje (Ki & Técnicas)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#786450] font-serif italic">
                          CD Ki: <strong className="text-[#8c672b]">{kiDc}</strong>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded font-bold">
                          Artes: {martialArtsDie}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#e2d2ba] text-[#4a361c] rounded font-bold">
                          {unarmoredSpeed}
                        </span>
                      </div>
                    </div>

                    {/* Acciones Básicas de Monje: Artes Marciales & Ráfaga de Golpes */}
                    <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                          Artes Marciales & Ráfaga de Golpes (Flurry of Blows)
                        </div>
                        <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold">
                          Ataque: +{profBonus + dexMod} | Daño: {martialArtsDie} + {dexMod}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5e4e3e]">
                        Ataque con Destreza. Acción adicional: 1 ataque desarmado adicional gratuito tras atacar, o 1 Ki para Ráfaga de Golpes (2 ataques desarmados adicionales).
                      </p>
                      <button
                        type="button"
                        onClick={() => rollDie(`Golpe Desarmado de Monje`, dexMod, martialArtsDie.replace('1', '') as any, 'normal', `${martialArtsDie} + ${dexMod}`)}
                        className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Tirar Daño Desarmado ({martialArtsDie} + {dexMod})
                      </button>
                    </div>

                    {/* Desviar Proyectiles (Nivel 3+) */}
                    {monkLevel >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                            Desviar Proyectiles (Deflect Missiles)
                          </div>
                          <span className="px-2 py-0.5 bg-[#ebdcc4] text-[#4a361c] rounded text-[10px] font-bold">
                            Reacción: 1d10 + {dexMod + monkLevel}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Reacción al ser alcanzado por ataque a distancia: reduces el daño en 1d10 + {dexMod + monkLevel}. Si lo reduces a 0, puedes gastar 1 Ki para atraparlo y dispararlo inmediatamente (alcance 20/60 pies).
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Desviar Proyectiles (Reducción de Daño)`, dexMod + monkLevel, 'd10', 'normal', `1d10 + ${dexMod + monkLevel}`)}
                          className="px-3 py-1 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Dices className="w-3.5 h-3.5 text-[#8c672b]" /> Tirar Reducción (1d10 + {dexMod + monkLevel})
                        </button>
                      </div>
                    )}

                    {/* Golpe Aturdidor (Nivel 5+) */}
                    {monkLevel >= 5 && (
                      <div className="p-3 bg-[#fefce8] rounded-xl border border-[#ca8a04] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#854d0e]">
                            Golpe Aturdidor (Stunning Strike)
                          </div>
                          <span className="px-2 py-0.5 bg-[#fef08a] text-[#854d0e] rounded text-[10px] font-bold">
                            1 Ki • CD Salvación Con: {kiDc}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al impactar con arma cuerpo a cuerpo o golpe desarmado: gasta 1 Ki. La criatura debe superar una salvación de Constitución (CD {kiDc}) o quedará Aturdida (Stunned) hasta el final de tu siguiente turno.
                        </p>
                      </div>
                    )}

                    {/* Palma Abierta: Plenitud del Cuerpo (Nivel 6+) */}
                    {isPalmaAbierta && monkLevel >= 6 && (
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#16a34a] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#166534]">
                            Plenitud del Cuerpo (Wholeness of Body)
                          </div>
                          <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] rounded text-[10px] font-bold">
                            Cura {3 * monkLevel} PG (1/descanso largo)
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Como acción recuperas instantáneamente {3 * monkLevel} puntos de golpe canalizando la armonía perfecta de tu espíritu.
                        </p>
                      </div>
                    )}

                    {/* Senda de la Misericordia (Way of Mercy) */}
                    {isMisericordia && monkLevel >= 3 && (
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#9333ea] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#7e22ce]">
                            Manos de Sanación & Manos del Daño (Misericordia)
                          </div>
                          <span className="px-2 py-0.5 bg-[#f3e8ff] text-[#7e22ce] rounded text-[10px] font-bold">
                            1 Ki (o en Ráfaga)
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Sanación: cura {martialArtsDie} + {wisMod} PG{monkLevel >= 6 ? ' y elimina enfermedades o ceguera/parálisis/aturdimiento' : ''}. Daño: {martialArtsDie} + {wisMod} daño necrótico{monkLevel >= 6 ? ' y envenena al rival' : ''}.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => rollDie(`Manos de Sanación (Curación)`, wisMod, martialArtsDie.replace('1', '') as any, 'normal', `${martialArtsDie} + ${wisMod}`)}
                            className="px-3 py-1 bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] border border-[#86efac] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Heart className="w-3.5 h-3.5 text-[#16a34a]" /> Curar ({martialArtsDie} + {wisMod})
                          </button>
                          <button
                            type="button"
                            onClick={() => rollDie(`Manos del Daño (Daño Necrótico)`, wisMod, martialArtsDie.replace('1', '') as any, 'normal', `${martialArtsDie} + ${wisMod}`)}
                            className="px-3 py-1 bg-[#f3e8ff] hover:bg-[#e9d5ff] text-[#7e22ce] border border-[#d8b4fe] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#9333ea]" /> Necrótico ({martialArtsDie} + {wisMod})
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Senda del Dragón Ascendente */}
                    {isDragonAscendente && monkLevel >= 3 && (
                      <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#ea580c] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#c2410c]">
                            Aliento del Dragón (Breath of the Dragon)
                          </div>
                          <span className="px-2 py-0.5 bg-[#ffedd5] text-[#c2410c] rounded text-[10px] font-bold">
                            Cono 20 pies / Línea 30 pies • CD {kiDc}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          {profBonus} usos/descanso largo (o 2 Ki): sustituye 1 ataque por cono o línea infligiendo 2 dados de artes marciales (2{martialArtsDie.replace('1', '')}) de daño ácido, frío, fuego, relámpago o veneno (salvación Des mitad).
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Aliento del Dragón (Daño Dracónico)`, 0, martialArtsDie.replace('1', '') as any, 'normal', `2${martialArtsDie.replace('1', '')}`)}
                          className="px-3 py-1 bg-[#ffedd5] hover:bg-[#fed7aa] text-[#c2410c] border border-[#fdba74] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Flame className="w-3.5 h-3.5 text-[#ea580c]" /> Tirar 2{martialArtsDie.replace('1', '')} Aliento
                        </button>
                      </div>
                    )}

                    {/* Senda del Alma Solar */}
                    {isAlmaSolar && monkLevel >= 3 && (
                      <div className="p-3 bg-[#fffbeb] rounded-xl border border-[#d97706] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#b45309]">
                            Proyectil Radiante del Sol (Radiant Sun Bolt)
                          </div>
                          <span className="px-2 py-0.5 bg-[#fef3c7] text-[#b45309] rounded text-[10px] font-bold">
                            Alcance 30 pies • Radiante
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Ataque de conjuro a distancia (Ataque: +{profBonus + dexMod}) que inflige {martialArtsDie} + {dexMod} daño radiante. 1 Ki: lanza 2 proyectiles más con tu acción adicional.
                        </p>
                        <button
                          type="button"
                          onClick={() => rollDie(`Proyectil Radiante del Sol`, dexMod, martialArtsDie.replace('1', '') as any, 'normal', `${martialArtsDie} + ${dexMod}`)}
                          className="px-3 py-1 bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] border border-[#fcd34d] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#d97706]" /> Tirar Radiante ({martialArtsDie} + {dexMod})
                        </button>
                      </div>
                    )}

                    {/* Senda del Kensei */}
                    {isKensei && monkLevel >= 3 && (
                      <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#64748b] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#334155]">
                            Bloqueo Ágil de Kensei & Tiro Kensei
                          </div>
                          <span className="px-2 py-0.5 bg-[#e2e8f0] text-[#334155] rounded text-[10px] font-bold">
                            +2 CA en guardia
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Bloqueo Ágil: si haces un ataque desarmado sosteniendo un arma kensei cuerpo a cuerpo, ganas +2 a la CA. Tiro Kensei: acción adicional otorga +1d4 de daño a tus ataques a distancia con armas kensei.
                        </p>
                      </div>
                    )}

                    {/* Camino de la Muerte Larga */}
                    {isLongDeath && monkLevel >= 3 && (
                      <div className="p-3 bg-[#fdf2f8] rounded-xl border border-[#db2777] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#9d174d]">
                            Toque de la Muerte (Touch of Death)
                          </div>
                          <span className="px-2 py-0.5 bg-[#fce7f3] text-[#9d174d] rounded text-[10px] font-bold">
                            +{Math.max(1, wisMod + monkLevel)} PG Temporales
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al reducir a una criatura a 0 PG a 5 pies de ti o menos: ganas {Math.max(1, wisMod + monkLevel)} puntos de golpe temporales. {monkLevel >= 11 ? 'A Nivel 11+: puedes gastar 1 Ki para quedar a 1 PG al caer a 0 PG.' : ''}
                        </p>
                      </div>
                    )}

                    {/* Senda del Yo Astral */}
                    {isYoAstral && monkLevel >= 3 && (
                      <div className="p-3 bg-[#f0fdfa] rounded-xl border border-[#0d9488] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#0f766e]">
                            Brazos del Yo Astral (Arms of the Astral Self)
                          </div>
                          <span className="px-2 py-0.5 bg-[#ccfbf1] text-[#0f766e] rounded text-[10px] font-bold">
                            1 Ki • 10 minutos
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional (1 Ki): invocas brazos astrales (10 pies de alcance). Usas Sabiduría para ataques desarmados e infliges daño de fuerza. {monkLevel >= 11 ? 'A Nivel 11+: reduces daño elemental en 1d10 + Sabiduría como reacción.' : ''}
                        </p>
                      </div>
                    )}

                    {/* Senda del Maestro Borracho */}
                    {isMaestroBorracho && monkLevel >= 3 && (
                      <div className="p-3 bg-[#fefce8] rounded-xl border border-[#eab308] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#a16207]">
                            Técnica del Borracho & Balanceo Tambaleante
                          </div>
                          <span className="px-2 py-0.5 bg-[#fef9c3] text-[#a16207] rounded text-[10px] font-bold">
                            Retirada Libre + 10 pies
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al usar Ráfaga de Golpes: ganas Retirada gratuita y +10 pies de velocidad. {monkLevel >= 6 ? 'A Nivel 6+: levantarse cuesta solo 5 pies; y como reacción por 1 Ki rediriges un ataque cuerpo a cuerpo fallado a otro enemigo.' : ''}
                        </p>
                      </div>
                    )}

                    {/* Camino de la Sombra */}
                    {isSombra && monkLevel >= 3 && (
                      <div className="p-3 bg-[#f1f5f9] rounded-xl border border-[#475569] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#1e293b]">
                            Artes de las Sombras & Paso de la Sombra
                          </div>
                          <span className="px-2 py-0.5 bg-[#e2e8f0] text-[#1e293b] rounded text-[10px] font-bold">
                            Sigilo Sobrenatural
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Gastas 2 Ki para lanzar Oscuridad, Pasar sin Huella, Silencio o Visión en la Oscuridad. {monkLevel >= 6 ? 'A Nivel 6+: como acción adicional te teletransportas hasta 60 pies entre sombras con ventaja en tu siguiente ataque.' : ''}
                        </p>
                      </div>
                    )}

                    {/* Senda de los Cuatro Elementos */}
                    {isCuatroElementos && monkLevel >= 3 && (
                      <div className="p-3 bg-[#f0f9ff] rounded-xl border border-[#0284c7] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#0369a1]">
                            Disciplinas de los Cuatro Elementos
                          </div>
                          <span className="px-2 py-0.5 bg-[#e0f2fe] text-[#0369a1] rounded text-[10px] font-bold">
                            Límite: {monkLevel >= 17 ? 6 : monkLevel >= 13 ? 5 : monkLevel >= 9 ? 4 : monkLevel >= 5 ? 3 : 2} Ki • CD {kiDc}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizas la energía de los 4 elementos en conjuros y ataques elementales usando tu Ki. Gasto máximo por disciplina: {monkLevel >= 17 ? 6 : monkLevel >= 13 ? 5 : monkLevel >= 9 ? 4 : monkLevel >= 5 ? 3 : 2} Ki. CD de salvación elemental: {kiDc}.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ACCIONES TÁCTICAS Y JURAMENTO SAGRADO DEL PALADÍN --- */}
              {(() => {
                const isPaladin = charData.class.toLowerCase().includes('paladín') || charData.class.toLowerCase().includes('paladin');
                if (!isPaladin) return null;

                const paladinLevel = charData.level || 1;
                const chaMod = Math.floor(((charData.stats.cha || 10) - 10) / 2);
                const strMod = Math.floor(((charData.stats.str || 10) - 10) / 2);
                const profBonus = Math.floor((paladinLevel - 1) / 4) + 2;
                const auraRange = paladinLevel >= 18 ? '30 pies' : '10 pies';
                const subLower = (charData.subclass || '').toLowerCase();

                const isDevocion = subLower.includes('devocion') || subLower.includes('devoción') || subLower.includes('devotion');
                const isVenganza = subLower.includes('venganza') || subLower.includes('vengeance');
                const isAntiguos = subLower.includes('antiguos') || subLower.includes('ancients');
                const isConquista = subLower.includes('conquista') || subLower.includes('conquest');
                const isRedencion = subLower.includes('redencion') || subLower.includes('redención') || subLower.includes('redemption');
                const isGloria = subLower.includes('gloria') || subLower.includes('glory');
                const isVigilantes = subLower.includes('vigilantes') || subLower.includes('watchers');
                const isCorona = subLower.includes('corona') || subLower.includes('crown');
                const isOathbreaker = subLower.includes('rompejuramentos') || subLower.includes('oathbreaker');

                return (
                  <div className="p-3.5 bg-[#fefce8] rounded-2xl border border-[#ca8a04] space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#fef08a] pb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#a16207]" />
                        <span className="font-fantasy font-bold text-xs uppercase text-[#713f12] tracking-wide">
                          Poderío Sagrado del Paladín (Castigos & Auras)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#854d0e] font-serif italic">
                          Aura ({auraRange}): <strong className="text-[#a16207]">+{Math.max(1, chaMod)} Salvaciones</strong>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#fef08a] text-[#713f12] rounded font-bold">
                          {paladinLevel >= 5 ? '2 Ataques' : '1 Ataque'}
                        </span>
                      </div>
                    </div>

                    {/* Castigo Divino (Divine Smite - Nivel 2+) */}
                    {paladinLevel >= 2 && (
                      <div className="p-3 bg-[#fffbeb] rounded-xl border border-[#f59e0b] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#b45309]">
                            Castigo Divino (Divine Smite)
                          </div>
                          <span className="px-2 py-0.5 bg-[#fef3c7] text-[#b45309] rounded text-[10px] font-bold">
                            Daño Radiante (+1d8 vs Infernal/No Muerto)
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al impactar cuerpo a cuerpo con arma: gasta 1 ranura para causar 2d8 (Nv 1), 3d8 (Nv 2), 4d8 (Nv 3), 5d8 (Nv 4/5). Suma +1d8 extra si el enemigo es infernal o no muerto.
                          {paladinLevel >= 11 ? ' Castigo Mejorado: ¡todos tus ataques con armas suman permanentemente +1d8 radiante!' : ''}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => rollDie(`Castigo Divino (Ranura Nv 1)`, 0, 'd8', 'normal', '2d8')}
                            className="px-2.5 py-1 bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] border border-[#fcd34d] rounded text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Sparkles className="w-3 h-3 text-[#f59e0b]" /> 2d8 (Nv 1)
                          </button>
                          <button
                            type="button"
                            onClick={() => rollDie(`Castigo Divino (Ranura Nv 2)`, 0, 'd8', 'normal', '3d8')}
                            className="px-2.5 py-1 bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] border border-[#fcd34d] rounded text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Sparkles className="w-3 h-3 text-[#f59e0b]" /> 3d8 (Nv 2)
                          </button>
                          <button
                            type="button"
                            onClick={() => rollDie(`Castigo Divino (Ranura Nv 3)`, 0, 'd8', 'normal', '4d8')}
                            className="px-2.5 py-1 bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] border border-[#fcd34d] rounded text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Sparkles className="w-3 h-3 text-[#f59e0b]" /> 4d8 (Nv 3)
                          </button>
                          <button
                            type="button"
                            onClick={() => rollDie(`Castigo Divino (+1d8 Extra Infernal/No Muerto)`, 0, 'd8', 'normal', '1d8')}
                            className="px-2.5 py-1 bg-[#fee2e2] hover:bg-[#fecaca] text-[#991b1b] border border-[#fca5a5] rounded text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Zap className="w-3 h-3 text-[#ef4444]" /> +1d8 Extra vs No Muerto
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Auras de Paladín (Nivel 6 y 10) */}
                    {paladinLevel >= 6 && (
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#16a34a] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#166534]">
                            Aura de Protección & Aura de Valor ({auraRange})
                          </div>
                          <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] rounded text-[10px] font-bold">
                            +{Math.max(1, chaMod)} a Salvaciones
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Tú y los aliados a {auraRange} sumáis +{Math.max(1, chaMod)} a TODAS las tiradas de salvación.{paladinLevel >= 10 ? ' Además, sois completamente inmunes a ser Asustados (Aura de Valor).' : ''}
                        </p>
                      </div>
                    )}

                    {/* Rasgos y Auras de Subclases */}
                    {/* 1. Devoción */}
                    {isDevocion && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d8c8af] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                          Arma Sagrada & Aura de Devoción
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: imbuye tu arma sumando +{Math.max(1, chaMod)} a las tiradas de ataque durante 1 minuto. {paladinLevel >= 7 ? `Aura de Devoción (${auraRange}): inmunes a ser Hechizados.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 2. Venganza */}
                    {isVenganza && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#fef2f2] rounded-xl border border-[#ef4444] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#991b1b]">
                          Voto de Enemistad (Vow of Enmity) & Vengador Implacable
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: como acción adicional obtienes ventaja en tiradas de ataque contra un enemigo a 30 pies durante 1 minuto. {paladinLevel >= 7 ? 'Vengador Implacable: muévete la mitad de tu velocidad tras un ataque de oportunidad sin provocar ataques.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 3. Antiguos */}
                    {isAntiguos && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#22c55e] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#15803d]">
                          Ira de la Naturaleza & Aura contra Conjuros
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: enredaderas apresan a un enemigo a 10 pies. {paladinLevel >= 7 ? `Aura de Protección contra Conjuros (${auraRange}): tú y tus aliados tenéis resistencia al daño infligido por conjuros.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 4. Conquista */}
                    {isConquista && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#a855f7] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#7e22ce]">
                          Golpe Guiado (+10 Ataque) & Aura de Conquista
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: suma +10 a una tirada de ataque. {paladinLevel >= 7 ? `Aura de Conquista (${auraRange}): criaturas asustadas tienen velocidad 0 y sufren ${Math.floor(paladinLevel / 2)} daño psíquico al iniciar su turno.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 5. Redención */}
                    {isRedencion && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#f0fdfa] rounded-xl border border-[#14b8a6] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#0f766e]">
                          Emisario de la Paz (+5 Persuasión) & Aura del Guardián
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: +5 a pruebas de Persuasión durante 10 minutos. {paladinLevel >= 7 ? `Aura del Guardián (${auraRange}): reacción para absorber el daño recibido por un aliado cercano.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 6. Gloria */}
                    {isGloria && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#f97316] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#c2410c]">
                          Golpe Inspirador & Aura de Alacridad (+10 pies Vel)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: tras Castigo Divino reparte 2d8 + {paladinLevel} PG temporales entre aliados. {paladinLevel >= 7 ? 'Aura de Alacridad: +10 pies de velocidad para ti y aliados adyacentes.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 7. Vigilantes */}
                    {isVigilantes && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#f0f9ff] rounded-xl border border-[#0ea5e9] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#0369a1]">
                          Voluntad del Vigilante & Aura del Centinela (+{profBonus} Iniciativa)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: ventaja en salvaciones mentales a ti y aliados. {paladinLevel >= 7 ? `Aura del Centinela (${auraRange}): tú y tus aliados sumáis vuestro bono de competencia (+${profBonus}) a la Iniciativa.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 8. Corona */}
                    {isCorona && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#fefce8] rounded-xl border border-[#eab308] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#a16207]">
                          Desafío del Campeón & Fidelidad Inquebrantable
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: desafía a rivales a 30 pies impidiéndoles alejarse. {paladinLevel >= 7 ? 'Fidelidad Inquebrantable: reacción para absorber el daño recibido por una criatura a 5 pies.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 9. Rompejuramentos */}
                    {isOathbreaker && paladinLevel >= 3 && (
                      <div className="p-3 bg-[#fdf2f8] rounded-xl border border-[#ec4899] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#be185d]">
                          Controlar No Muertos & Aura de Odio (+{Math.max(1, chaMod)} Daño)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Canalizar Divinidad: somete a no muertos a 30 pies. {paladinLevel >= 7 ? `Aura de Odio (${auraRange}): tú, los infernales y no muertos cercanos sumáis +${Math.max(1, chaMod)} al daño de ataques cuerpo a cuerpo.` : ''}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- ARDID, SIGILO Y ATAQUE FURTIVO DEL PÍCARO --- */}
              {(() => {
                const isRogue = charData.class.toLowerCase().includes('pícaro') || charData.class.toLowerCase().includes('picaro') || charData.class.toLowerCase().includes('rogue');
                if (!isRogue) return null;

                const rogueLevel = charData.level || 1;
                const dexMod = Math.floor(((charData.stats?.dex ?? 10) - 10) / 2);
                const chaMod = Math.floor(((charData.stats?.cha ?? 10) - 10) / 2);
                const profBonus = Math.floor((rogueLevel - 1) / 4) + 2;
                const sneakDiceCount = Math.ceil(rogueLevel / 2);
                const subLower = (charData.subclass || '').toLowerCase();

                const isAsesino = subLower.includes('asesino') || subLower.includes('assassin');
                const isLadron = subLower.includes('ladron') || subLower.includes('ladrón') || subLower.includes('thief');
                const isEmbaucador = subLower.includes('embaucador') || subLower.includes('arcane trickster');
                const isEspadachin = subLower.includes('espadachin') || subLower.includes('espadachín') || subLower.includes('swashbuckler');
                const isInquisitivo = subLower.includes('inquisitivo') || subLower.includes('inquisitive');
                const isMenteMaestra = subLower.includes('mente-maestra') || subLower.includes('mente maestra') || subLower.includes('mastermind');
                const isFantasma = subLower.includes('fantasma') || subLower.includes('phantom');
                const isCuchillo = subLower.includes('cuchillo') || subLower.includes('soulknife');
                const isScout = subLower.includes('scout') || subLower.includes('explorador');

                const psiDieType = rogueLevel >= 13 ? 'd12' : rogueLevel >= 9 ? 'd10' : rogueLevel >= 5 ? 'd8' : 'd6';

                return (
                  <div className="p-4 bg-gradient-to-r from-[#1c1917]/5 via-[#292524]/10 to-[#1c1917]/5 rounded-2xl border-2 border-[#78716c] space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#a8a29e]/50 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#44403c] text-white rounded-lg shadow-sm">
                          <Target className="w-4 h-4 text-[#fbbf24]" />
                        </div>
                        <div>
                          <h4 className="font-fantasy font-bold text-sm text-[#292524]">
                            Ardid y Letalidad del Pícaro (Furtivo & Astucia)
                          </h4>
                          <p className="text-[10px] text-[#78716c]">
                            Nivel {rogueLevel} • Ataque Furtivo: {sneakDiceCount}d6 • Bonificador de Competencia: +{profBonus}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => rollDie(`Ataque Furtivo (${sneakDiceCount}d6)`, 0, 'd6', 'normal', `${sneakDiceCount}d6`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#b91c1c] to-[#991b1b] text-white rounded-xl text-xs font-fantasy font-bold hover:brightness-110 shadow-sm transition-all"
                          title="Lanzar daño de Ataque Furtivo (una vez por turno si cumples los requisitos de ventaja o flanqueo con arma sutil/a distancia)"
                        >
                          <Sword className="w-3.5 h-3.5 text-white" />
                          <span>Tirar Furtivo ({sneakDiceCount}d6)</span>
                        </button>
                      </div>
                    </div>

                    {/* Reglas de Ataque Furtivo y Acción Astuta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-[#f5f5f4] rounded-xl border border-[#d6d3d1] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-xs text-[#292524] flex items-center gap-1">
                            <Sword className="w-3.5 h-3.5 text-[#dc2626]" />
                            Ataque Furtivo ({sneakDiceCount}d6 daño)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#fee2e2] text-[#991b1b] rounded font-bold">1 vez / turno</span>
                        </div>
                        <p className="text-[11px] text-[#57534e] leading-snug">
                          Infliges <strong>{sneakDiceCount}d6</strong> de daño extra con armas sutiles o a distancia si tienes ventaja en el ataque, o si un enemigo de tu objetivo está a 5 pies de él y no tienes desventaja.
                        </p>
                      </div>

                      {/* Acción Astuta (Nivel 2+) */}
                      {rogueLevel >= 2 ? (
                        <div className="p-3 bg-[#f5f5f4] rounded-xl border border-[#d6d3d1] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-fantasy font-bold text-xs text-[#292524] flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-[#d97706]" />
                              Acción Astuta (Cunning Action)
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-[#fef3c7] text-[#92400e] rounded font-bold">Acción Adicional</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            <span className="text-[10px] px-2 py-0.5 bg-[#e7e5e4] text-[#292524] rounded-md font-medium" title="Duplica tu velocidad este turno">
                              🏃 Correr (Dash)
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-[#e7e5e4] text-[#292524] rounded-md font-medium" title="Tu movimiento no provoca ataques de oportunidad">
                              🛡️ Destrabarse (Disengage)
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-[#e7e5e4] text-[#292524] rounded-md font-medium" title="Realiza una prueba de Destreza (Sigilo)">
                              👥 Esconderse (Hide)
                            </span>
                            {isLadron && (
                              <span className="text-[10px] px-2 py-0.5 bg-[#dbeafe] text-[#1e40af] rounded-md font-medium" title="Juego de manos, abrir cerraduras o usar objeto">
                                ✋ Manos Rápidas
                              </span>
                            )}
                            {isMenteMaestra && (
                              <span className="text-[10px] px-2 py-0.5 bg-[#ede9fe] text-[#6b21a8] rounded-md font-medium" title="Ayudar a un aliado a atacar a hasta 30 pies">
                                🤝 Maestro de Tácticas
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-[#fafaf9] rounded-xl border border-[#e7e5e4] text-[11px] text-[#a8a29e] italic flex items-center">
                          Acción Astuta se desbloquea a Nivel 2.
                        </div>
                      )}
                    </div>

                    {/* Reacciones y Rasgos Defensivos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                      {rogueLevel >= 5 && (
                        <div className="p-2 bg-[#f5f5f4] rounded-lg border border-[#d6d3d1]">
                          <div className="font-bold text-[#292524]">Esquiva Asombrosa (Nv 5)</div>
                          <div className="text-[10px] text-[#57534e]">Reacción: reduces a la mitad el daño de un atacante que ves.</div>
                        </div>
                      )}
                      {rogueLevel >= 7 && (
                        <div className="p-2 bg-[#f5f5f4] rounded-lg border border-[#d6d3d1]">
                          <div className="font-bold text-[#292524]">Evasión (Nv 7)</div>
                          <div className="text-[10px] text-[#57534e]">Salvación Destreza de área: éxito = 0 daño; fallo = mitad.</div>
                        </div>
                      )}
                      {rogueLevel >= 11 && (
                        <div className="p-2 bg-[#f5f5f4] rounded-lg border border-[#d6d3d1]">
                          <div className="font-bold text-[#292524]">Talento Confiable (Nv 11)</div>
                          <div className="text-[10px] text-[#57534e]">En pruebas con competencia, d20 de 1-9 cuenta como 10.</div>
                        </div>
                      )}
                      {rogueLevel >= 14 && (
                        <div className="p-2 bg-[#f5f5f4] rounded-lg border border-[#d6d3d1]">
                          <div className="font-bold text-[#292524]">Sentido Ciego (Nv 14)</div>
                          <div className="text-[10px] text-[#57534e]">Percibes criaturas ocultas o invisibles a 10 pies si puedes oír.</div>
                        </div>
                      )}
                      {rogueLevel >= 15 && (
                        <div className="p-2 bg-[#f5f5f4] rounded-lg border border-[#d6d3d1]">
                          <div className="font-bold text-[#292524]">Mente Resbaladiza (Nv 15)</div>
                          <div className="text-[10px] text-[#57534e]">Competencia en tiradas de salvación de Sabiduría.</div>
                        </div>
                      )}
                      {rogueLevel >= 18 && (
                        <div className="p-2 bg-[#f5f5f4] rounded-lg border border-[#d6d3d1]">
                          <div className="font-bold text-[#292524]">Escurridizo (Nv 18)</div>
                          <div className="text-[10px] text-[#57534e]">Ningún atacante puede tener ventaja contra ti.</div>
                        </div>
                      )}
                      {rogueLevel >= 20 && (
                        <div className="p-2 bg-[#fef2f2] rounded-lg border border-[#f87171]">
                          <div className="font-bold text-[#991b1b]">Golpe de Suerte (Nv 20)</div>
                          <div className="text-[10px] text-[#7f1d1d]">1/descanso: convierte ataque fallido en impacto o d20 = 20.</div>
                        </div>
                      )}
                    </div>

                    {/* Subclases de Pícaro */}
                    {/* 1. Asesino */}
                    {isAsesino && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#fef2f2] rounded-xl border border-[#ef4444] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#991b1b]">
                          Asesinar & Emboscadas Mortales
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Ventaja en tiradas de ataque contra cualquier enemigo que no haya actuado aún en el combate. Si el objetivo está sorprendido, cualquier impacto es un impacto crítico automático. {rogueLevel >= 17 ? `Golpe Mortal (CD ${8 + profBonus + dexMod} salvación Con): duplica todo el daño del ataque si sorprendes al objetivo.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 2. Ladrón */}
                    {isLadron && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#22c55e] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#15803d]">
                          Manos Rápidas & Segundo Piso (+{dexMod} pies salto)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Usar objeto, Juego de Manos o herramientas de ladrón como acción adicional. Trepar sin coste de movimiento adicional. {rogueLevel >= 9 ? 'Sigilo Supremo: ventaja en Sigilo al moverte a no más de la mitad de tu velocidad.' : ''} {rogueLevel >= 17 ? 'Reflejos de Ladrón: tomas dos turnos en el primer asalto de combate.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 3. Embaucador Arcano */}
                    {isEmbaucador && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#eff6ff] rounded-xl border border-[#3b82f6] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#1d4ed8]">
                          Mano de Mago Bribona (Invisible & Acción Adicional)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Puedes controlar tu Mano de Mago de forma invisible como acción adicional para robar objetos de bolsillos o forzar cerraduras a 30 pies. {rogueLevel >= 9 ? 'Emboscada Mágica: enemigos tienen desventaja en salvaciones contra tus conjuros si estás oculto.' : ''} {rogueLevel >= 13 ? 'Distracción Versátil: tu Mano de Mago te otorga ventaja en ataques contra un objetivo.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 4. Espadachín */}
                    {isEspadachin && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#f97316] space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#c2410c]">
                            Juego de Piernas Elegante & Audacia Temeraria (+{chaMod} Iniciativa)
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#ffedd5] text-[#9a3412] rounded font-bold">Duelo 1v1</span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Atacar cuerpo a cuerpo impide ataques de oportunidad del enemigo en tu turno. Puedes usar Ataque Furtivo 1v1 si estás a 5 pies del objetivo y ningún otro enemigo está adyacente a ti. {rogueLevel >= 9 ? 'Panache: prueba de Persuasión vs Perspicacia para provocar o encantar.' : ''} {rogueLevel >= 17 ? 'Maestro Duelista: 1/descanso repites un ataque fallido con ventaja.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 5. Inquisitivo */}
                    {isInquisitivo && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#fafaf9] rounded-xl border border-[#a8a29e] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#292524]">
                            Lucha Perspicaz & Ojo para el Detalle
                          </div>
                          {rogueLevel >= 17 && (
                            <button
                              onClick={() => rollDie(`Ataque Furtivo Expuesto (${sneakDiceCount + 3}d6)`, 0, 'd6', 'normal', `${sneakDiceCount + 3}d6`)}
                              className="px-2 py-0.5 bg-[#44403c] text-white text-[10px] rounded font-bold hover:bg-[#292524]"
                              title="Tirar ataque furtivo con el bono de +3d6 de Debilidades Expuestas"
                            >
                              Tirar Furtivo Expuesto ({sneakDiceCount + 3}d6)
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: prueba de Perspicacia vs Engaño del objetivo. Si vences, puedes usar Ataque Furtivo contra él durante 1 minuto sin necesidad de ventaja. Pruebas de Perspicacia contra mentiras tratan d20 de 1-7 como 8. {rogueLevel >= 17 ? 'Debilidades Expuestas: infliges +3d6 de daño adicional con tu Ataque Furtivo al objetivo analizado.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 6. Mente Maestra */}
                    {isMenteMaestra && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#8b5cf6] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#6d28d9]">
                          Maestro de Tácticas (Ayuda a 30 pies) & Manipulador Perspicaz
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Puedes realizar la acción de Ayudar como acción adicional con un alcance ampliado de 30 pies para respaldar el ataque de un aliado. {rogueLevel >= 13 ? 'Redireccionar Ataque: reacción al recibir un ataque con cobertura adyacente para hacer que golpee al cobertor en tu lugar.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 7. Fantasma */}
                    {isFantasma && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#f3f4f6] rounded-xl border border-[#6b7280] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#374151]">
                            Lamentos de la Tumba & Susurros de los Muertos
                          </div>
                          <button
                            onClick={() => rollDie(`Lamentos de la Tumba (${Math.ceil(sneakDiceCount / 2)}d6 Necrótico)`, 0, 'd6', 'normal', `${Math.ceil(sneakDiceCount / 2)}d6`)}
                            className="px-2 py-0.5 bg-[#374151] text-white text-[10px] rounded font-bold hover:bg-[#1f2937]"
                            title="Lanzar daño necrótico a un segundo objetivo a 30 pies tras impactar con Ataque Furtivo"
                          >
                            Tirar Lamentos ({Math.ceil(sneakDiceCount / 2)}d6)
                          </button>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Tras golpear con Ataque Furtivo, una segunda criatura a 30 pies sufre <strong>{Math.ceil(sneakDiceCount / 2)}d6</strong> de daño necrótico ({profBonus} usos/descanso largo). {rogueLevel >= 9 ? `Fichas de Alma (hasta ${profBonus}): ventaja en salvaciones de Con y de muerte; gasta una ficha para Lamentos gratis.` : ''} {rogueLevel >= 13 ? 'Forma Fantasmal: vuelo 10 pies, ataques contra ti con desventaja y atravesar paredes.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 8. Cuchillo del Alma */}
                    {isCuchillo && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#eef2ff] rounded-xl border border-[#6366f1] space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <div className="font-fantasy font-bold text-xs text-[#4338ca]">
                            Hojas Psíquicas ({psiDieType}) & Poder Psiónico ({profBonus * 2} dados)
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => rollDie(`Hoja Psíquica Principal (1d6 + ${dexMod})`, dexMod, 'd6', 'normal', `1d6 + ${dexMod}`)}
                              className="px-2 py-0.5 bg-[#4338ca] text-white text-[10px] rounded font-bold hover:bg-[#3730a3]"
                              title="Ataque con Hoja Psíquica (alcance 60 pies o cuerpo a cuerpo, 1d6 + Des psíquico)"
                            >
                              🗡️ Hoja 1d6+{dexMod}
                            </button>
                            <button
                              onClick={() => rollDie(`Hoja Psíquica Adicional (1d4)`, 0, 'd4', 'normal', '1d4')}
                              className="px-2 py-0.5 bg-[#6366f1] text-white text-[10px] rounded font-bold hover:bg-[#4f46e5]"
                              title="Ataque con Hoja Psíquica secundaria con Acción Adicional (1d4 psíquico)"
                            >
                              ⚡ Hoja Rápida 1d4
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Materializas dagas de pura energía psiónica (1d6 + Des psíquico, arrojadiza 60 pies) y un segundo ataque con acción adicional por 1d4 psíquico. {rogueLevel >= 9 ? 'Hojas del Alma: teletransporte psiónico y ataques guiados.' : ''} {rogueLevel >= 13 ? 'Velo Psíquico: invisibilidad mágica durante 1 hora.' : ''} {rogueLevel >= 17 ? `Cuchilla Aturdidora: salvación Sabiduría CD ${8 + profBonus + dexMod} o aturdido 1 minuto.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 9. Explorador Silvano (Scout) */}
                    {isScout && rogueLevel >= 3 && (
                      <div className="p-3 bg-[#ecfdf5] rounded-xl border border-[#10b981] space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#065f46]">
                            Escaramuzador & Movilidad Superior {rogueLevel >= 9 ? '(+10 pies Vel)' : ''}
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#d1fae5] text-[#065f46] rounded font-bold">Reacción de Huida</span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Reacción cuando un enemigo termine su turno a 5 pies de ti: te mueves la mitad de tu velocidad sin provocar ataques de oportunidad. Pericia automática en Naturaleza y Supervivencia. {rogueLevel >= 9 ? 'Movimiento Superior: +10 pies a tu velocidad terrestre, escalada y nado.' : ''} {rogueLevel >= 13 ? 'Maestro de Emboscadas: ventaja en tiradas de Iniciativa.' : ''} {rogueLevel >= 17 ? 'Ataque Súbito: ataque adicional con acción adicional que permite un segundo Ataque Furtivo a una criatura diferente.' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- FUENTE DE MAGIA, METAMAGIA Y ORIGEN DE HECHICERÍA --- */}
              {(() => {
                const isSorcerer = charData.class.toLowerCase().includes('hechicero') || charData.class.toLowerCase().includes('sorcerer');
                if (!isSorcerer) return null;

                const sorcererLevel = charData.level || 1;
                const chaMod = Math.floor(((charData.stats?.cha ?? 10) - 10) / 2);
                const dexMod = Math.floor(((charData.stats?.dex ?? 10) - 10) / 2);
                const conMod = Math.floor(((charData.stats?.con ?? 10) - 10) / 2);
                const profBonus = Math.floor((sorcererLevel - 1) / 4) + 2;
                const spellDc = 8 + profBonus + chaMod;
                const spellAttack = profBonus + chaMod;
                const subLower = (charData.subclass || '').toLowerCase();

                const isWild = subLower.includes('salvaje') || subLower.includes('wild');
                const isDraconic = subLower.includes('drac') || subLower.includes('dragón') || subLower.includes('dragon');
                const isDivine = subLower.includes('divin') || subLower.includes('divine');
                const isShadow = subLower.includes('sombra') || subLower.includes('shadow');
                const isStorm = subLower.includes('tormenta') || subLower.includes('storm');
                const isAberrant = subLower.includes('aberrante') || subLower.includes('aberrant');
                const isClockwork = subLower.includes('mecanic') || subLower.includes('mecánica') || subLower.includes('clockwork');
                const isLunar = subLower.includes('lunar') || subLower.includes('moon');

                const chosenMetamagics = (charData.classDecisions?.['metamagic'] as string[]) || [];

                return (
                  <div className="p-4 bg-gradient-to-r from-[#581c87]/5 via-[#6b21a8]/10 to-[#581c87]/5 rounded-2xl border-2 border-[#9333ea] space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c084fc]/50 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#6b21a8] text-white rounded-lg shadow-sm">
                          <Sparkles className="w-4 h-4 text-[#f0abfc]" />
                        </div>
                        <div>
                          <h4 className="font-fantasy font-bold text-sm text-[#3b0764]">
                            Fuente de Magia y Metamagia del Hechicero
                          </h4>
                          <p className="text-[10px] text-[#7e22ce]">
                            Nivel {sorcererLevel} • CD Conjuros: {spellDc} • Ataque con Conjuro: +{spellAttack} • Carisma: +{chaMod}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {sorcererLevel >= 2 && (
                          <div className="px-3 py-1 bg-[#f3e8ff] text-[#6b21a8] border border-[#d8b4fe] rounded-xl text-xs font-fantasy font-bold shadow-sm">
                            ✨ {sorcererLevel} Puntos de Hechicería
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Resumen de Fuente de Magia & Conversión de Ranuras */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#e9d5ff] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-xs text-[#581c87] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#9333ea]" />
                            Crear Ranuras con Puntos (Acción Adicional)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#ede9fe] text-[#6b21a8] rounded font-bold">Nv 2+</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1 text-center text-[10px] pt-1">
                          <div className="p-1 bg-white rounded border border-[#e9d5ff] font-medium">Nv 1: 2 pts</div>
                          <div className="p-1 bg-white rounded border border-[#e9d5ff] font-medium">Nv 2: 3 pts</div>
                          <div className="p-1 bg-white rounded border border-[#e9d5ff] font-medium">Nv 3: 5 pts</div>
                          <div className="p-1 bg-white rounded border border-[#e9d5ff] font-medium">Nv 4: 6 pts</div>
                          <div className="p-1 bg-white rounded border border-[#e9d5ff] font-medium">Nv 5: 7 pts</div>
                        </div>
                        <p className="text-[10px] text-[#6b21a8] italic pt-0.5">
                          Puedes también convertir una ranura existente en puntos de hechicería iguales a su nivel.
                        </p>
                      </div>

                      {/* Metamagia Activa / Disponible */}
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#e9d5ff] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-xs text-[#581c87] flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-[#7e22ce]" />
                            Metamagia ({sorcererLevel >= 17 ? '4' : sorcererLevel >= 10 ? '3' : sorcererLevel >= 3 ? '2' : '0'} opciones)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#ede9fe] text-[#6b21a8] rounded font-bold">Nv 3+</span>
                        </div>
                        {sorcererLevel >= 3 ? (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {chosenMetamagics.length > 0 ? (
                              chosenMetamagics.map((m, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 bg-white text-[#581c87] rounded-md font-bold border border-[#d8b4fe]">
                                  ⚡ {m}
                                </span>
                              ))
                            ) : (
                              <>
                                <span className="text-[10px] px-2 py-0.5 bg-white text-[#581c87] rounded-md border border-[#d8b4fe]">
                                  ⚡ Rápido (2 pts)
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-white text-[#581c87] rounded-md border border-[#d8b4fe]">
                                  ⚡ Gemelo (1-9 pts)
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-white text-[#581c87] rounded-md border border-[#d8b4fe]">
                                  ⚡ Sutil (1 pt)
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-white text-[#581c87] rounded-md border border-[#d8b4fe]">
                                  ⚡ Potenciado (1 pt)
                                </span>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="text-[10px] text-[#7e22ce] italic">
                            Metamagia se desbloquea a Nivel 3.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rasgos de Cúspide y Restauración */}
                    {sorcererLevel >= 20 && (
                      <div className="p-2.5 bg-[#fdf4ff] rounded-xl border border-[#d946ef] text-[11px] flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#86198f]">Restauración Hechicera (Nivel 20):</span>
                          <span className="text-[#701a75] ml-1">Recuperas 4 puntos de hechicería al terminar cualquier descanso corto.</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 bg-[#fae8ff] text-[#86198f] rounded font-bold">Cúspide Arcana</span>
                      </div>
                    )}

                    {/* Subclases de Hechicero */}
                    {/* 1. Magia Salvaje */}
                    {isWild && (
                      <div className="p-3 bg-[#fdf2f8] rounded-xl border-2 border-[#ec4899] space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#db2777]" />
                            <div className="font-fantasy font-bold text-xs text-[#be185d]">
                              Mareas de Caos & Sobretensión de Magia Salvaje (d100)
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {sorcererLevel >= 6 && (
                              <button
                                type="button"
                                onClick={() => rollDie('Doblegar la Suerte (1d4)', 0, 'd4', 'normal', '1d4')}
                                className="px-2 py-0.5 bg-[#be185d] text-white text-[10px] rounded font-bold hover:bg-[#9d174d] cursor-pointer"
                                title="Reacción (2 pts): tira 1d4 para sumar o restar a la tirada de d20 de otra criatura"
                              >
                                🎲 Doblegar la Suerte (1d4)
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setIsWildMagicModalOpen(true)}
                              className="px-2 py-0.5 bg-[#fce7f3] hover:bg-[#fbcfe8] text-[#be185d] border border-[#f472b6] text-[10px] rounded font-bold transition cursor-pointer flex items-center gap-1"
                              title="Explorar o buscar en la tabla oficial de 50 entradas d100"
                            >
                              📜 Ver Tabla Oficial d100
                            </button>
                          </div>
                        </div>

                        {/* Botones de Tirada Virtual y Tirada Manual */}
                        <div className="p-2.5 bg-white/80 rounded-lg border border-[#fbcfe8] space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (sorcererLevel >= 14) {
                                  const res = rollWildMagicSurge(true);
                                  setLastRolledSurge(res);
                                } else {
                                  const res = rollWildMagicSurge(false);
                                  setLastRolledSurge({ ...res, chosenEntry: res.entry1 });
                                  announceWildMagicSurge(res.entry1, res.roll1);
                                }
                              }}
                              className="px-3 py-1.5 bg-gradient-to-r from-[#db2777] to-[#be185d] hover:from-[#be185d] hover:to-[#9d174d] text-white text-xs font-fantasy font-bold rounded-lg shadow-xs transition cursor-pointer flex items-center gap-1.5"
                            >
                              <Dices className="w-3.5 h-3.5" />
                              {sorcererLevel >= 14 ? '🎲 Tirar 2d100 (Caos Controlado Nv 14)' : '🎲 Tirar 1d100 Magia Salvaje'}
                            </button>

                            {/* Selector de Entrada Manual o Dado Físico */}
                            <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={manualSurgeInput}
                                onChange={(e) => setManualSurgeInput(e.target.value)}
                                placeholder="d100 físico (1-100)"
                                className="w-24 px-2 py-1 bg-[#fff5f9] border border-[#f472b6] rounded-md text-xs text-[#831843] font-bold focus:outline-hidden"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const val = parseInt(manualSurgeInput, 10);
                                  if (!isNaN(val) && val >= 1 && val <= 100) {
                                    const entry = getWildMagicSurgeByRoll(val);
                                    setLastRolledSurge({ roll1: val, entry1: entry, chosenEntry: entry });
                                    announceWildMagicSurge(entry, val);
                                  }
                                }}
                                disabled={!manualSurgeInput}
                                className="px-2.5 py-1 bg-[#be185d] hover:bg-[#9d174d] text-white text-[11px] rounded font-bold transition disabled:opacity-50 cursor-pointer"
                              >
                                Aplicar Dado
                              </button>
                            </div>
                          </div>

                          {/* Selector desplegable de toda la lista */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#9d174d] font-bold shrink-0">Elegir de la lista:</span>
                            <select
                              value={lastRolledSurge?.chosenEntry?.min || ''}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) {
                                  const entry = getWildMagicSurgeByRoll(val);
                                  setLastRolledSurge({ roll1: val, entry1: entry, chosenEntry: entry });
                                  announceWildMagicSurge(entry, val);
                                }
                              }}
                              className="w-full px-2 py-1 bg-[#fff5f9] border border-[#f472b6] rounded-md text-[11px] text-[#831843] font-medium focus:outline-hidden"
                            >
                              <option value="">-- Seleccionar efecto específico de la tabla oficial (50 opciones) --</option>
                              {WILD_MAGIC_SURGE_TABLE.map((item) => (
                                <option key={item.rangeStr} value={item.min}>
                                  [{item.rangeStr}] {item.title} — {item.category === 'beneficial' ? '✨ Beneficioso' : item.category === 'detrimental' ? '⚠️ Perjudicial' : item.category === 'chaotic' ? '🌀 Caótico' : '🔮 Neutro'}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Selección interactiva de Caos Controlado (Nivel 14+) si hay 2 opciones tiradas */}
                        {lastRolledSurge?.roll2 && (
                          <div className="p-3 bg-[#fdf4ff] rounded-lg border-2 border-[#c084fc] space-y-2">
                            <div className="text-xs font-fantasy font-bold text-[#6b21a8] flex items-center justify-between">
                              <span>🌀 Caos Controlado (Nivel 14): ¡Elige cuál de las 2 tiradas manifestar!</span>
                              <span className="text-[10px] px-2 py-0.5 bg-[#fae8ff] text-[#7e22ce] rounded-full font-bold">2 Dados Obtenidos</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {/* Opción 1 */}
                              <div className="p-2.5 bg-white rounded-md border border-[#e9d5ff] space-y-1.5 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-xs text-[#7e22ce]">
                                      Dado 1 = {lastRolledSurge.roll1} ({lastRolledSurge.entry1.rangeStr})
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#f3e8ff] text-[#6b21a8]">
                                      {lastRolledSurge.entry1.title}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-[#4a361c] leading-relaxed mt-1">
                                    {lastRolledSurge.entry1.effect}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLastRolledSurge((prev) => prev ? { ...prev, chosenEntry: prev.entry1, roll2: undefined } : null);
                                    announceWildMagicSurge(lastRolledSurge.entry1, lastRolledSurge.roll1);
                                  }}
                                  className="w-full mt-2 px-2 py-1 bg-[#7e22ce] hover:bg-[#6b21a8] text-white text-[11px] font-bold rounded cursor-pointer transition"
                                >
                                  ✨ Activar Opción 1 ({lastRolledSurge.entry1.title})
                                </button>
                              </div>

                              {/* Opción 2 */}
                              {lastRolledSurge.entry2 && (
                                <div className="p-2.5 bg-white rounded-md border border-[#e9d5ff] space-y-1.5 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-xs text-[#7e22ce]">
                                        Dado 2 = {lastRolledSurge.roll2} ({lastRolledSurge.entry2.rangeStr})
                                      </span>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#f3e8ff] text-[#6b21a8]">
                                        {lastRolledSurge.entry2.title}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-[#4a361c] leading-relaxed mt-1">
                                      {lastRolledSurge.entry2.effect}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const chosen = lastRolledSurge.entry2!;
                                      const rollVal = lastRolledSurge.roll2!;
                                      setLastRolledSurge((prev) => prev ? { ...prev, chosenEntry: chosen, roll2: undefined } : null);
                                      announceWildMagicSurge(chosen, rollVal);
                                    }}
                                    className="w-full mt-2 px-2 py-1 bg-[#7e22ce] hover:bg-[#6b21a8] text-white text-[11px] font-bold rounded cursor-pointer transition"
                                  >
                                    ✨ Activar Opción 2 ({lastRolledSurge.entry2.title})
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Efecto Activo o Último Manifestado */}
                        {lastRolledSurge?.chosenEntry && !lastRolledSurge.roll2 && (
                          <div className="p-2.5 bg-[#fdf2f8] rounded-lg border border-[#f472b6] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-fantasy font-bold text-[#be185d]">
                                Manifestación Activa: [{lastRolledSurge.chosenEntry.rangeStr}] {lastRolledSurge.chosenEntry.title}
                              </span>
                              <button
                                type="button"
                                onClick={() => announceWildMagicSurge(lastRolledSurge.chosenEntry!, lastRolledSurge.roll1)}
                                className="text-[10px] text-[#9d174d] underline hover:text-[#831843] cursor-pointer"
                              >
                                Ver en Alerta / Re-anunciar
                              </button>
                            </div>
                            <p className="text-[10px] text-[#4a361c] leading-relaxed">
                              {lastRolledSurge.chosenEntry.effect}
                            </p>
                          </div>
                        )}

                        <p className="text-[10px] text-[#5e4e3e]">
                          Mareas de Caos: 1/descanso largo obtienes ventaja en un ataque, prueba o salvación (se recarga cuando el DM activa una Ola Salvaje). {sorcererLevel >= 6 ? 'Doblegar la Suerte: gasta 2 pts para sumar o restar 1d4 a la tirada de otra criatura.' : ''} {sorcererLevel >= 14 ? 'Caos Controlado: tiras dos dados d100 en la tabla salvaje y eliges el efecto.' : ''} {sorcererLevel >= 18 ? 'Bombardeo de Hechizos: añade un dado de daño extra al sacar el valor máximo en un dado.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 2. Linaje Dracónico */}
                    {isDraconic && (
                      <div className="p-3 bg-[#fff1f2] rounded-xl border border-[#f43f5e] space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#be123c]">
                            Resiliencia Dracónica (CA {13 + dexMod} sin armadura & +{sorcererLevel} PG Máx)
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#ffe4e6] text-[#9f1239] rounded font-bold">Escamas de Dragón</span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Sin armadura tu CA es 13 + Destreza ({13 + dexMod}). Ganas +1 PG por cada nivel ({sorcererLevel} PG extra totales). {sorcererLevel >= 6 ? `Afinidad Elemental: sumas tu Carisma (+${chaMod}) al daño de conjuros del elemento dracónico y gastas 1 pt para resistencia 1 hora.` : ''} {sorcererLevel >= 14 ? 'Alas de Dragón: acción adicional para brotar alas dracónicas y volar a tu velocidad terrestre.' : ''} {sorcererLevel >= 18 ? 'Presencia Dracónica: 5 pts para aura de 60 pies que hechiza o asusta a enemigos.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 3. Alma Divina */}
                    {isDivine && (
                      <div className="p-3 bg-[#fffbeb] rounded-xl border border-[#f59e0b] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#b45309]">
                            Bendición de los Dioses & Magia Celestial
                          </div>
                          <button
                            onClick={() => rollDie('Bendición de los Dioses (2d4)', 0, 'd4', 'normal', '2d4')}
                            className="px-2 py-0.5 bg-[#b45309] text-white text-[10px] rounded font-bold hover:bg-[#92400e]"
                            title="Tirar 2d4 para sumar a una tirada de ataque o salvación fallada (1 uso por descanso corto o largo)"
                          >
                            ✨ Tirar Bendición (2d4)
                          </button>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Bendición de los Dioses: suma 2d4 a un ataque o salvación fallida (1/descanso corto o largo). Acceso completo a conjuros de Clérigo además de Hechicero. {sorcererLevel >= 6 ? 'Curación Fortalecida: 1 pt para relanzar cualquier cantidad de dados de curación.' : ''} {sorcererLevel >= 14 ? 'Alas Angelicales: velocidad de vuelo de 30 pies.' : ''} {sorcererLevel >= 18 ? 'Recuperación Sobrenatural: 1/descanso largo te curas la mitad de tus PG máximos cuando estés a menos de la mitad.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 4. Hechicería de las Sombras */}
                    {isShadow && (
                      <div className="p-3 bg-[#f5f5f4] rounded-xl border border-[#78716c] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#292524]">
                          Ojos de la Oscuridad (120 pies) & Fuerza del Sepulcro
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Visión en la oscuridad a 120 pies. Puedes lanzar Oscuridad por 2 pts viendo a través de ella. Fuerza del Sepulcro: salvación de Carisma (CD 5 + daño) para quedar a 1 PG en vez de 0. {sorcererLevel >= 6 ? 'Sabueso del Infortunio: invocas un can tenebroso por 3 pts que otorga desventaja a la víctima contra tus conjuros.' : ''} {sorcererLevel >= 14 ? 'Paseo de las Sombras: acción adicional para teletransportarte 120 pies entre penumbra u oscuridad.' : ''} {sorcererLevel >= 18 ? 'Forma Sombría: 6 pts para resistencia a casi todo el daño y atravesar paredes.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 5. Hechicería de la Tormenta */}
                    {isStorm && (
                      <div className="p-3 bg-[#f0f9ff] rounded-xl border border-[#0284c7] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#0369a1]">
                          Magia de Viento (10 pies vuelo libre) & Corazón de la Tormenta
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Vuelas 10 pies sin ataques de oportunidad como acción adicional al lanzar un conjuro de nivel 1+. {sorcererLevel >= 6 ? `Corazón de la Tormenta: resistencia a relámpago y trueno; dañas a enemigos a 10 pies por ${Math.max(1, Math.floor(sorcererLevel / 2))} daño.` : ''} {sorcererLevel >= 14 ? `Furia de la Tormenta: reacción al recibir ataque cuerpo a cuerpo para infligir ${sorcererLevel} daño de relámpago y empujar 20 pies.` : ''} {sorcererLevel >= 18 ? 'Alma del Viento: inmunidad total a relámpago y trueno y vuelo permanente de 60 pies.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 6. Mente Aberrante */}
                    {isAberrant && (
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#a855f7] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#7e22ce]">
                            Habla Telepática & Hechicería Psiónica
                          </div>
                          {sorcererLevel >= 18 && (
                            <button
                              onClick={() => rollDie('Remolino Débil (3d10 Fuerza)', 0, 'd10', 'normal', '3d10')}
                              className="px-2 py-0.5 bg-[#7e22ce] text-white text-[10px] rounded font-bold hover:bg-[#6b21a8]"
                              title="Tirar daño del vórtice gravitatorio de Remolino Débil (3d10 fuerza)"
                            >
                              🌀 Remolino Débil (3d10)
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Enlace telepático a 30 pies por {sorcererLevel} minutos. {sorcererLevel >= 6 ? 'Hechicería Psiónica: lanza tus conjuros psiónicos usando puntos de hechicería sin componentes verbales, somáticos ni materiales; resistencia a daño psíquico.' : ''} {sorcererLevel >= 14 ? 'Revelación en Carne: mutaciones por 1 pt cada una (ver invisibilidad, vuelo, nado, deslizamiento).' : ''} {sorcererLevel >= 18 ? 'Remolino Débil: teletransporte de 120 pies y 3d10 daño de fuerza con succión.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 7. Alma Mecánica */}
                    {isClockwork && (
                      <div className="p-3 bg-[#ecfeff] rounded-xl border border-[#06b6d4] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#0e7490]">
                          Restablecer el Equilibrio ({profBonus} usos) & Bastión de la Ley
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Reacción a 60 pies: cancela ventaja o desventaja en cualquier tirada de d20 ({profBonus} usos/descanso largo). {sorcererLevel >= 6 ? 'Bastión de la Ley: escudo de 1 a 5 dados d8 para absorber daño.' : ''} {sorcererLevel >= 14 ? 'Trance del Orden: 1 min sin ventaja contra ti y tus d20 < 10 cuentan como 10.' : ''} {sorcererLevel >= 18 ? 'Cabalgata Mecánica: curar 100 PG repartidos, reparar objetos y disipar conjuros de nivel 6 o menor.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 8. Hechicería Lunar */}
                    {isLunar && (
                      <div className="p-3 bg-[#e0e7ff] rounded-xl border border-[#6366f1] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#4338ca]">
                          Encarnación Lunar & Fuego Lunar (Llama Sagrada Doble)
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Encarnas una fase lunar (Llena, Nueva o Creciente) y lanzas su conjuro de 1.er nivel 1/descanso largo sin gastar ranura. Fuego Lunar: Llama Sagrada puede afectar a dos criaturas a 5 pies. {sorcererLevel >= 6 ? `Dones Lunares: descuento de 1 pt en Metamagia en la escuela de tu fase (${profBonus} usos/descanso largo); cambia de fase por 1 pt.` : ''} {sorcererLevel >= 14 ? 'Empoderamiento Lunar: ventajas pasivas según fase activa.' : ''} {sorcererLevel >= 18 ? 'Fenómeno Lunar: desatas la cúspide lunar de tu fase activa.' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- PODER DEL PACTO, INVOCACIONES Y PATRÓN DEL BRUJO --- */}
              {(() => {
                const isWarlock = charData.class.toLowerCase().includes('brujo') || charData.class.toLowerCase().includes('warlock');
                if (!isWarlock) return null;

                const warlockLevel = charData.level || 1;
                const chaMod = Math.floor(((charData.stats?.cha ?? 10) - 10) / 2);
                const dexMod = Math.floor(((charData.stats?.dex ?? 10) - 10) / 2);
                const conMod = Math.floor(((charData.stats?.con ?? 10) - 10) / 2);
                const profBonus = Math.floor((warlockLevel - 1) / 4) + 2;
                const spellDc = 8 + profBonus + chaMod;
                const spellAttack = profBonus + chaMod;
                const subLower = (charData.subclass || '').toLowerCase();

                const pactSlotsCount = warlockLevel >= 17 ? 4 : warlockLevel >= 11 ? 3 : warlockLevel >= 2 ? 2 : 1;
                const pactSlotLevel = warlockLevel >= 9 ? 5 : warlockLevel >= 7 ? 4 : warlockLevel >= 5 ? 3 : warlockLevel >= 3 ? 2 : 1;

                const isFiend = subLower.includes('infernal') || subLower.includes('fiend');
                const isHexblade = subLower.includes('hexblade') || subLower.includes('filo');
                const isArchfey = subLower.includes('archifata') || subLower.includes('fey');
                const isGreatOldOne = subLower.includes('gran antiguo') || subLower.includes('gran-antiguo') || subLower.includes('great old one');
                const isCelestial = subLower.includes('celestial');
                const isGenie = subLower.includes('genio') || subLower.includes('genie');
                const isUndead = subLower.includes('no-muerto') || subLower.includes('no muerto') || subLower.includes('undead');
                const isFathomless = subLower.includes('insondable') || subLower.includes('fathomless');
                const isUndying = subLower.includes('imperecedero') || subLower.includes('undying');

                return (
                  <div className="p-4 bg-gradient-to-r from-[#022c22]/5 via-[#064e3b]/10 to-[#022c22]/5 rounded-2xl border-2 border-[#059669] space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#34d399]/50 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#064e3b] text-white rounded-lg shadow-sm">
                          <Eye className="w-4 h-4 text-[#6ee7b7]" />
                        </div>
                        <div>
                          <h4 className="font-fantasy font-bold text-sm text-[#064e3b]">
                            Poder del Pacto e Invocaciones del Brujo
                          </h4>
                          <p className="text-[10px] text-[#047857]">
                            Nivel {warlockLevel} • Ranuras de Pacto: {pactSlotsCount} de Nivel {pactSlotLevel} (Descanso Corto) • CD: {spellDc} • Ataque: +{spellAttack}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] rounded-xl text-xs font-fantasy font-bold shadow-sm">
                          🔮 {pactSlotsCount} Ranuras (Nv {pactSlotLevel})
                        </div>
                      </div>
                    </div>

                    {/* Magia del Pacto & Arcano Místico */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-xs text-[#065f46] flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-[#059669]" />
                            Magia del Pacto (Pact Magic)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#dcfce7] text-[#15803d] rounded font-bold">Descanso Corto</span>
                        </div>
                        <p className="text-[11px] text-[#374151] leading-snug">
                          Todas tus ranuras de pacto ({pactSlotsCount}) se lanzan automáticamente a su máxima potencia disponible (<strong>Nivel {pactSlotLevel}</strong>) y se recargan por completo al finalizar un descanso corto o largo.
                        </p>
                      </div>

                      {/* Arcano Místico (Niveles 11, 13, 15, 17) */}
                      <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-xs text-[#065f46] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                            Arcano Místico (Mystic Arcanum)
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#dcfce7] text-[#15803d] rounded font-bold">1 / Descanso Largo</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-0.5 text-[10px]">
                          {warlockLevel >= 11 ? (
                            <>
                              <span className="px-2 py-0.5 bg-white text-[#065f46] rounded-md border border-[#86efac] font-bold">
                                🌌 6.º Nivel {warlockLevel >= 11 ? '✓' : ''}
                              </span>
                              {warlockLevel >= 13 && (
                                <span className="px-2 py-0.5 bg-white text-[#065f46] rounded-md border border-[#86efac] font-bold">
                                  🌌 7.º Nivel ✓
                                </span>
                              )}
                              {warlockLevel >= 15 && (
                                <span className="px-2 py-0.5 bg-white text-[#065f46] rounded-md border border-[#86efac] font-bold">
                                  🌌 8.º Nivel ✓
                                </span>
                              )}
                              {warlockLevel >= 17 && (
                                <span className="px-2 py-0.5 bg-white text-[#065f46] rounded-md border border-[#86efac] font-bold">
                                  🌌 9.º Nivel ✓
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-[#047857] italic">
                              Se desbloquea a Nivel 11 (6.º nivel), 13 (7.º nivel), 15 (8.º nivel) y 17 (9.º nivel).
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cúspide Nivel 20 */}
                    {warlockLevel >= 20 && (
                      <div className="p-2.5 bg-[#ecfdf5] rounded-xl border border-[#10b981] text-[11px] flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#065f46]">Aptitud Sobrenatural (Eldritch Master - Nivel 20):</span>
                          <span className="text-[#047857] ml-1">Medita 1 minuto (1/descanso largo) para recuperar todas tus ranuras de pacto gastadas de inmediato.</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 bg-[#d1fae5] text-[#065f46] rounded font-bold">Cúspide</span>
                      </div>
                    )}

                    {/* Subclases de Brujo */}
                    {/* 1. El Infernal */}
                    {isFiend && (
                      <div className="p-3 bg-[#fef2f2] rounded-xl border border-[#ef4444] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#991b1b]">
                            Bendición del Oscuro (+{warlockLevel + chaMod} PG Temp al matar)
                          </div>
                          <div className="flex items-center gap-1.5">
                            {warlockLevel >= 6 && (
                              <button
                                onClick={() => rollDie("Suerte del Propio Oscuro (1d10)", 0, 'd10', 'normal', '1d10')}
                                className="px-2 py-0.5 bg-[#991b1b] text-white text-[10px] rounded font-bold hover:bg-[#7f1d1d]"
                                title="Suma 1d10 a una prueba de característica o tirada de salvación tuya (1/descanso corto o largo)"
                              >
                                🎲 Suerte Oscura (1d10)
                              </button>
                            )}
                            {warlockLevel >= 14 && (
                              <button
                                onClick={() => rollDie("Lanzar por el Infierno (10d10 Psíquico)", 0, 'd10', 'normal', '10d10')}
                                className="px-2 py-0.5 bg-[#b91c1c] text-white text-[10px] rounded font-bold hover:bg-[#991b1b]"
                                title="Arroja a una criatura por los planos inferiores causando 10d10 de daño psíquico (1/descanso largo)"
                              >
                                🔥 Lanzar al Infierno (10d10)
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Al reducir a un enemigo a 0 PG, ganas {warlockLevel + chaMod} PG temporales. {warlockLevel >= 6 ? 'Suerte del Oscuro: suma 1d10 a una salvación o prueba (1/descanso corto).' : ''} {warlockLevel >= 10 ? 'Resiliencia Infernal: eliges 1 resistencia a daño al descansar.' : ''} {warlockLevel >= 14 ? 'Lanzar por el Infierno: al golpear causas 10d10 de daño psíquico (1/descanso largo).' : ''}
                        </p>
                      </div>
                    )}

                    {/* 2. Filo Celestial / Maldito (Hexblade) */}
                    {isHexblade && (
                      <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#8b5cf6] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#6d28d9]">
                            Maldición del Hexblade (Crítico 19-20, +{profBonus} Daño) & Guerrero del Hex
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#ede9fe] text-[#6d28d9] rounded font-bold">1/Descanso Corto</span>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: maldices a un objetivo a 30 pies por 1 minuto (crítico 19-20, daño extra +{profBonus}, te curas {warlockLevel + chaMod} PG al morir). Guerrero del Hex: competencia con armaduras medias, escudos y armas marciales; atacas usando Carisma (+{chaMod}). {warlockLevel >= 6 ? 'Espectro Maldito: alzas el alma de un humanoide como espectro combatiente.' : ''} {warlockLevel >= 10 ? 'Armadura de Sombras: d6 >= 4 hace fallar ataque de tu objetivo maldito.' : ''} {warlockLevel >= 14 ? 'Maestro del Hex: transfieres la maldición tras la muerte.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 3. El Archifata */}
                    {isArchfey && (
                      <div className="p-3 bg-[#fdf2f8] rounded-xl border border-[#ec4899] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#be185d]">
                          Presencia Feérica (Cubo 10 pies) & Escape Brumoso
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción (1/descanso corto): criaturas en cubo de 10 pies superan salvación Sabiduría o quedan encantadas/asustadas. {warlockLevel >= 6 ? 'Escape Brumoso: reacción al recibir daño para teletransportarte 60 pies e invisibilidad hasta tu turno (1/descanso corto).' : ''} {warlockLevel >= 10 ? 'Defensa Seductora: inmune a encanto y reflejas el efecto al agresor.' : ''} {warlockLevel >= 14 ? 'Delirio Sombrío: ilusión de pesadilla que ciega y aterroriza 1 minuto.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 4. El Gran Antiguo */}
                    {isGreatOldOne && (
                      <div className="p-3 bg-[#f3f4f6] rounded-xl border border-[#6b7280] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#374151]">
                          Mente Despierta (Telepatía 30 pies) & Escudo Entrópico
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Te comunicas telepáticamente a 30 pies sin importar el idioma. {warlockLevel >= 6 ? 'Escudo Entrópico: reacción para imponer desventaja en ataque contra ti; si falla, ventaja en tu siguiente ataque (1/descanso corto).' : ''} {warlockLevel >= 10 ? 'Escudo de Pensamientos: mente inmune a lectura, resistencia a daño psíquico y reflejo del daño.' : ''} {warlockLevel >= 14 ? 'Crear Esclavo: encantar a humanoide incapacitado permanentemente.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 5. El Celestial */}
                    {isCelestial && (
                      <div className="p-3 bg-[#fffbeb] rounded-xl border border-[#f59e0b] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#b45309]">
                            Luz Sanadora ({warlockLevel + 1} dados d6) & Alma Radiante
                          </div>
                          <button
                            onClick={() => rollDie('Luz Sanadora (Curación d6)', 0, 'd6', 'normal', '1d6')}
                            className="px-2 py-0.5 bg-[#b45309] text-white text-[10px] rounded font-bold hover:bg-[#92400e]"
                            title="Gasta 1 dado de tu reserva para curar a una criatura a 60 pies como acción adicional"
                          >
                            ✨ Curar (1d6)
                          </button>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: gastas dados de tu reserva de {warlockLevel + 1}d6 para curar a 60 pies (máx {Math.max(1, chaMod)} dados). {warlockLevel >= 6 ? `Alma Radiante: resistencia a radiante y sumas Carisma (+${chaMod}) al daño de fuego/radiante.` : ''} {warlockLevel >= 10 ? `Resplandor Celestial: ${warlockLevel + chaMod} PG temporales al descansar.` : ''} {warlockLevel >= 14 ? `Venganza Abrasadora: levantarte al caer con mitad de PG causando 2d8+${chaMod} radiante y ceguera a 30 pies.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 6. El Genio */}
                    {isGenie && (
                      <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#f97316] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#c2410c]">
                          Vasija del Genio (+{profBonus} Daño Elemental) & Regalo Elemental
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Santuario portátil extradimensional. Daño adicional +{profBonus} según tu patrón (Tierra, Aire, Fuego o Agua) al golpear una vez por turno. {warlockLevel >= 6 ? `Regalo Elemental: resistencia elemental y vuelo de 30 pies por 10 min (${profBonus} usos/descanso largo).` : ''} {warlockLevel >= 10 ? 'Santuario Protector: descanso corto en 10 minutos para ti y 5 aliados.' : ''} {warlockLevel >= 14 ? 'Deseo Limitado: duplicar conjuro de nivel 6 o menor sin componentes.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 7. El No Muerto */}
                    {isUndead && (
                      <div className="p-3 bg-[#f5f5f4] rounded-xl border border-[#78716c] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#292524]">
                            Forma de Pavor ({profBonus} usos) & Toque de la Tumba
                          </div>
                          <button
                            onClick={() => rollDie(`Forma de Pavor (PG Temp: 1d10 + ${warlockLevel})`, warlockLevel, 'd10', 'normal', `1d10 + ${warlockLevel}`)}
                            className="px-2 py-0.5 bg-[#44403c] text-white text-[10px] rounded font-bold hover:bg-[#292524]"
                            title="Tirar PG temporales ganados al adoptar la Forma de Pavor (1d10 + nivel)"
                          >
                            💀 PG Forma de Pavor
                          </button>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional: presencia cadavérica por 1 minuto (1d10+{warlockLevel} PG temporales, inmune a asustado y forzar salvación para asustar al golpear). {warlockLevel >= 6 ? 'Toque de la Tumba: cambiar daño a necrótico y dado de daño extra en Forma de Pavor.' : ''} {warlockLevel >= 10 ? `Vínculo Necrótico: resistencia a necrótico (inmunidad en Forma); explosión 2d10+${warlockLevel} al caer a 0 PG.` : ''} {warlockLevel >= 14 ? 'Proyección Espiritual: espíritu libre que vuela y absorbe vida.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 8. El Insondable */}
                    {isFathomless && (
                      <div className="p-3 bg-[#eff6ff] rounded-xl border border-[#3b82f6] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="font-fantasy font-bold text-xs text-[#1d4ed8]">
                            Tentáculo de las Profundidades & Don del Océano (40 pies nado)
                          </div>
                          <button
                            onClick={() => rollDie('Tentáculo de las Profundidades (1d8 Frío)', 0, 'd8', 'normal', '1d8')}
                            className="px-2 py-0.5 bg-[#1d4ed8] text-white text-[10px] rounded font-bold hover:bg-[#1e40af]"
                            title="Atacar con el tentáculo espectral de agua como acción adicional (1d8 daño de frío y -10 pies velocidad)"
                          >
                            🌊 Tentáculo (1d8)
                          </button>
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Acción adicional ({profBonus} usos/descanso largo): invocas un tentáculo de agua a 60 pies que ataca por 1d8 frío y reduce velocidad 10 pies. Don del Océano: velocidad de nado 40 pies y respiración acuática. {warlockLevel >= 6 ? 'Tentáculo Guardián: reduce 1d8 (2d8 a nivel 10) de daño recibido por ti o aliados cercanos.' : ''} {warlockLevel >= 10 ? 'Abrazo del Abismo: Tentáculos Negros de Evard gratis.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 9. El Imperecedero */}
                    {isUndying && (
                      <div className="p-3 bg-[#fafaf9] rounded-xl border border-[#a8a29e] space-y-1">
                        <div className="font-fantasy font-bold text-xs text-[#292524]">
                          Entre los Muertos & Desafiar a la Muerte
                        </div>
                        <p className="text-[10px] text-[#5e4e3e]">
                          Piedad con los Moribundos, ventaja contra enfermedades y los no muertos deben superar salvación para poder atacarte. {warlockLevel >= 6 ? `Desafiar a la Muerte: recuperas 1d8 + ${conMod} PG al tener éxito en salvación de muerte o estabilizar (1/descanso largo).` : ''} {warlockLevel >= 10 ? 'Naturaleza Imperecedera: no necesitas comer, beber ni dormir; envejeces 10 veces más lento.' : ''} {warlockLevel >= 14 ? `Vida Indestructible: acción adicional recuperas 1d8 + ${warlockLevel} PG y vuelves a unir miembros cercenados (1/descanso corto o largo).` : ''}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- MAESTRÍA ARCANA, LIBRO DE CONJUROS Y TRADICIONES DEL MAGO --- */}
              {(() => {
                const isWizard = charData.class.toLowerCase().includes('mago') || charData.class.toLowerCase().includes('wizard');
                if (!isWizard) return null;

                const wizardLevel = charData.level || 1;
                const intMod = Math.floor(((charData.stats?.int || 10) - 10) / 2);
                const subLower = (charData.subclass || '').toLowerCase();
                const maxRecovery = Math.ceil(wizardLevel / 2);
                const preparedSpellsMax = Math.max(1, wizardLevel + intMod);

                const isAbjuration = subLower.includes('abjurac') || subLower.includes('abjur');
                const isBladesinging = subLower.includes('canto') || subLower.includes('hoja') || subLower.includes('bladesing');
                const isDivination = subLower.includes('adivin') || subLower.includes('divin');
                const isWarMagic = subLower.includes('guerra') || subLower.includes('war');
                const isChronurgy = subLower.includes('cron') || subLower.includes('chron');
                const isGraviturgy = subLower.includes('gravit');
                const isEvocation = subLower.includes('evoc');
                const isConjuration = subLower.includes('conjur');
                const isIllusion = subLower.includes('ilus') || subLower.includes('illus');
                const isNecromancy = subLower.includes('nigro') || subLower.includes('necro');
                const isTransmutation = subLower.includes('transmut');
                const isScribes = subLower.includes('escrib') || subLower.includes('scrib');
                const isEnchantment = subLower.includes('encant') || subLower.includes('enchant');

                return (
                  <div className="mt-4 p-3.5 bg-gradient-to-br from-[#eff6ff] to-[#f5f3ff] rounded-2xl border-2 border-[#93c5fd] shadow-sm space-y-3">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#bfdbfe] pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-[#dbeafe] rounded text-[#1d4ed8] border border-[#93c5fd]">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-fantasy font-bold text-xs text-[#1e3a8a] uppercase tracking-wide flex items-center gap-1.5 flex-wrap">
                            <span>Maestría Arcana & Tradición de la Escuela (Mago)</span>
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: `Clase Mago • Nivel ${wizardLevel} (${charData.subclass || 'Sin Escuela'})`,
                                badge: 'Compendio de Magia Arcana',
                                classTag: 'Mago',
                                summary: `Lanzador arcano principal basado en Inteligencia (+${intMod}). CD de Salvación: ${8 + profBonus + intMod} • Bonificador de Ataque: +${profBonus + intMod}.`,
                                mechanics: [
                                  { label: 'Atributo Conjuración', value: `Inteligencia (+${intMod})` },
                                  { label: 'CD de Salvación', value: `${8 + profBonus + intMod}` },
                                  { label: 'Bono Ataque Conjuros', value: `+${profBonus + intMod}` },
                                  { label: 'Dado de Golpe', value: '1d6 por nivel' },
                                ],
                                rules: [
                                  'Conjuración por Grimorio: Los magos estudian y registran sus conjuros en un grimorio. Cada mañana tras un descanso largo, preparan su lista de conjuros activos.',
                                  'Rituales sin Preparar: Puedes lanzar cualquier conjuro de tu grimorio que tenga la etiqueta (Ritual) sin gastar ranuras ni tenerlo preparado, añadiendo 10 minutos al tiempo de lanzamiento.',
                                  'Tradición Arcana: A nivel 2 eliges tu escuela de magia (Adivinación, Evocación, etc.), lo que reduce al 50% el coste en oro y tiempo de copiar conjuros de esa escuela y te otorga rasgos únicos.',
                                  'Aprendizaje al Subir de Nivel: Cada nivel de Mago aprendes 2 conjuros nuevos de tu elección para tu grimorio gratis.',
                                ],
                                tips: [
                                  'Nunca dejes tu grimorio desatendido: protégelo contra agua y fuego o anota una copia de seguridad en tus notas de campaña.',
                                  'Aprovecha los rituales de utilidad (Detectar Magia, Comprensión Idiomática, Alarma, Identificar) para no gastar ranuras de combate.',
                                ],
                              })}
                              className="p-1 hover:bg-[#dbeafe] text-[#1d4ed8] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#bfdbfe]/80 bg-white/80"
                              title="Ver información y reglas generales del Mago"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver clase</span>
                            </button>
                          </div>
                          <div className="text-[10px] text-[#3b82f6]">
                            Grimorio • Recuperación Arcana ({maxRecovery} niveles) • Conjuros Preparados: {preparedSpellsMax}
                          </div>
                        </div>
                      </div>

                      {/* Botones tácticos del Mago */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => rollDie(`Recuperación Arcana (≤ ${maxRecovery} Niveles)`, 0, 'd20', 'normal')}
                          className="px-2 py-0.5 bg-[#2563eb] text-white text-[10px] rounded font-bold hover:bg-[#1d4ed8] cursor-pointer"
                          title={`Recuperar ranuras gastadas de nivel combinado hasta ${maxRecovery} tras descanso corto (1/día)`}
                        >
                          📖 Recuperación Arcana (≤{maxRecovery})
                        </button>
                        {isDivination && wizardLevel >= 2 && (
                          <button
                            onClick={() => rollDie(`Presagio (Dado de Portent d20)`, 0, 'd20', 'normal', '1d20')}
                            className="px-2 py-0.5 bg-[#7c3aed] text-white text-[10px] rounded font-bold hover:bg-[#6d28d9] cursor-pointer"
                            title="Tirar dado de Presagio para el día (sustituye tiradas de d20)"
                          >
                            🔮 Tirar Presagio ({wizardLevel >= 14 ? '3d20' : '2d20'})
                          </button>
                        )}
                        {isBladesinging && wizardLevel >= 2 && (
                          <button
                            onClick={() => rollDie(`Canto de la Hoja Activado (+${intMod} CA/Concentración)`, intMod, 'd20', 'normal')}
                            className="px-2 py-0.5 bg-[#059669] text-white text-[10px] rounded font-bold hover:bg-[#047857] cursor-pointer"
                            title="Activar Canto de la Hoja (+Int CA, +10 pies mov, +Int concentración)"
                          >
                            ⚔️ Activar Bladesong (+{intMod} CA)
                          </button>
                        )}
                        {isEvocation && wizardLevel >= 14 && (
                          <button
                            onClick={() => rollDie("Sobrecarga de Evocación (Overchannel)", 0, 'd12', 'normal')}
                            className="px-2 py-0.5 bg-[#dc2626] text-white text-[10px] rounded font-bold hover:bg-[#b91c1c] cursor-pointer"
                            title="Maximizar daño de conjuro de nivel 1-5"
                          >
                            💥 Sobrecarga (Max Daño)
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Resumen de Grimorio y Rasgos con Lupita */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      {/* Tarjeta 1: Libro de Conjuros */}
                      <div className="p-2.5 bg-white/80 rounded-lg border border-[#bfdbfe] flex flex-col justify-between gap-1 shadow-2xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#1e40af] flex items-center gap-1.5">
                            <span>📖</span> Libro de Conjuros (Grimorio)
                          </span>
                          <button
                            type="button"
                            onClick={() => openFeatureInspector({
                              title: 'Libro de Conjuros (Grimorio del Mago)',
                              badge: 'Rasgo Central • Mago Nivel 1+',
                              classTag: 'Mago',
                              summary: `Tu grimorio contiene todos los conjuros arcanos que has descubierto y anotado. Preparas ${preparedSpellsMax} conjuros diarios y puedes lanzar rituales sin prepararlos.`,
                              mechanics: [
                                { label: 'Conjuros Preparados', value: `${preparedSpellsMax} (Nivel ${wizardLevel} + Mod. Int ${intMod >= 0 ? `+${intMod}` : intMod})` },
                                { label: 'Lanzamiento Ritual', value: 'Directo desde grimorio (+10 min, 0 ranuras)' },
                                { label: 'Copiar Pergaminos', value: '2 horas y 50 po por nivel (mitad en tu escuela)' },
                                { label: 'Fórmulas de Trucos', value: wizardLevel >= 3 ? 'Activo (cambio tras descanso largo)' : 'Desbloquea a Nivel 3' },
                              ],
                              rules: [
                                'Preparar Conjuros: Tras cada descanso largo, eliges de tu libro un número de conjuros igual a tu nivel de Mago + tu modificador de Inteligencia (mínimo 1). Estos son los conjuros que tienes listos para lanzar gastando ranuras.',
                                'Lanzamiento de Rituales: Puedes lanzar cualquier conjuro de tu grimorio como ritual si posee la etiqueta (Ritual), sin necesidad de tenerlo preparado y sin gastar ranuras de conjuro.',
                                'Copiar Nuevos Conjuros: Si encuentras un pergamino o libro ajeno, puedes copiarlo a tu grimorio en 2 horas y 50 piezas de oro por cada nivel del conjuro. Si pertenece a tu propia Escuela elegida, el tiempo y el coste se reducen al 50%.',
                                'Reemplazo de Trucos: Al terminar un descanso largo, puedes cambiar un truco conocido por otro truco de la lista de mago.',
                              ],
                              tips: [
                                'Los conjuros rituales no ocupan espacio en tus conjuros preparados diarios: ¡puedes lanzarlos siempre directamente desde tu libro!',
                                'Compra tinta y pergamino cuando estés en ciudades grandes para no quedarte sin recursos al encontrar pergaminos mágicos.',
                              ],
                            })}
                            className="p-1 hover:bg-[#dbeafe] text-[#1d4ed8] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold shrink-0 border border-[#bfdbfe]/80 bg-[#eff6ff]"
                            title="Ver explicación y reglas oficiales del Libro de Conjuros"
                          >
                            <Search className="w-3.5 h-3.5" />
                            <span>Ver regla</span>
                          </button>
                        </div>
                        <p className="text-[#334155] text-[11px] leading-snug">
                          {wizardLevel >= 3 ? 'Fórmulas de Trucos activas. ' : ''}
                          Preparas {preparedSpellsMax} conjuros diarios (Nivel + Mod. Int). Lanzamiento de rituales sin necesidad de prepararlos.
                        </p>
                      </div>

                      {/* Tarjeta 2: Recuperación Arcana & Maestría */}
                      <div className="p-2.5 bg-white/80 rounded-lg border border-[#bfdbfe] flex flex-col justify-between gap-1 shadow-2xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#1e40af] flex items-center gap-1.5">
                            <span>✨</span> Recuperación & Maestría
                          </span>
                          <button
                            type="button"
                            onClick={() => openFeatureInspector({
                              title: 'Recuperación Arcana (Arcane Recovery)',
                              badge: 'Recurso 1/Día • Descanso Corto',
                              classTag: 'Mago',
                              summary: `Recuperas parte de tu energía mágica estudiando tu libro durante un descanso corto. Puedes restaurar hasta ${maxRecovery} niveles combinados de ranuras de conjuro.`,
                              mechanics: [
                                { label: 'Niveles Máximos', value: `Hasta ${maxRecovery} niveles (Nivel ÷ 2 redondeado arriba)` },
                                { label: 'Frecuencia', value: '1 uso por día tras Descanso Corto' },
                                { label: 'Límite de Nivel', value: 'Solo ranuras de nivel 1 a 5 (no nivel 6+)' },
                                { label: 'Dominio de Conjuros', value: wizardLevel >= 18 ? 'Activo (Nv 1 y 2 a voluntad)' : 'Nivel 18+' },
                              ],
                              rules: [
                                'Uso del Rasgo: Una vez al día, tras completar un descanso corto (1 hora), puedes elegir ranuras de conjuro gastadas para recuperarlas.',
                                `Límite por Nivel: La suma de los niveles de las ranuras que recuperes no puede superar la mitad de tu nivel de Mago redondeando hacia arriba (${maxRecovery} niveles a nivel ${wizardLevel}).`,
                                'Ejemplo: A nivel 2 puedes recuperar 1 ranura de nivel 1. A nivel 4 puedes recuperar dos de nivel 1 o una de nivel 2. A nivel 6 hasta 3 niveles combinados.',
                                'Restricción Máxima: Ninguna de las ranuras recuperadas puede ser de nivel 6 o superior.',
                              ],
                              tips: [
                                'Usa Recuperación Arcana en cuanto gastes tus primeras ranuras en la primera mitad del día.',
                                'Recuperar varias ranuras de nivel 1 suele ser más versátil (Escudo, Proyectil Mágico, Absorber Elementos) que una sola ranura alta.',
                              ],
                            })}
                            className="p-1 hover:bg-[#dbeafe] text-[#1d4ed8] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold shrink-0 border border-[#bfdbfe]/80 bg-[#eff6ff]"
                            title="Ver explicación y reglas de Recuperación Arcana"
                          >
                            <Search className="w-3.5 h-3.5" />
                            <span>Ver regla</span>
                          </button>
                        </div>
                        <p className="text-[#334155] text-[11px] leading-snug">
                          Recuperación Arcana ({maxRecovery} niveles).
                          {wizardLevel >= 18 ? ' Dominio de Conjuros: 1 conjuro de Nv 1 y 1 de Nv 2 a voluntad.' : ''}
                          {wizardLevel >= 20 ? ' Conjuros Insignia: 2 conjuros de Nv 3 preparados gratis.' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Detalle por Subclase con Lupita */}
                    {/* 1. Abjuración */}
                    {isAbjuration && (
                      <div className="p-3 bg-[#eff6ff] rounded-xl border border-[#3b82f6] text-[11px] text-[#1e3a8a] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold gap-2">
                          <span className="flex items-center gap-1.5">
                            <span>🛡️</span> Guarda Arcana ({2 * wizardLevel + Math.max(0, intMod)} PG Máx)
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: 'Guarda Arcana (Escuela de Abjuración)',
                                badge: 'Escudo Mágico • Absorbe Daño',
                                classTag: 'Mago Abjurador',
                                summary: 'Tejes una barrera mágica personal que absorbe daño antes de que toque tus puntos de golpe reales.',
                                mechanics: [
                                  { label: 'PG de la Guarda', value: `${2 * wizardLevel + Math.max(0, intMod)} PG (2 × Nivel + Int)` },
                                  { label: 'Recarga al Conjurador', value: '2 × nivel de ranura de abjuración gastada' },
                                  { label: 'Concentración', value: 'No requiere salvación mientras la guarda absorba daño' },
                                ],
                                rules: [
                                  'Activación: Al lanzar un conjuro de abjuración de nivel 1 o superior, creas una Guarda Arcana que dura hasta que completes un descanso largo.',
                                  'Absorción de Daño: Cuando recibes daño, la guarda lo absorbe en tu lugar. Si la guarda cae a 0 PG, tú recibes el daño sobrante.',
                                  'Sin Pruebas de Concentración: Mientras la guarda reciba todo el impacto del daño, no has sufrido daño en tus PG, por lo que no realizas tiradas de salvación de concentración.',
                                  'Recarga: Al lanzar cualquier conjuro de abjuración de nivel 1+, la guarda recupera PG iguales al doble del nivel de la ranura.',
                                ],
                              })}
                              className="p-1 hover:bg-[#dbeafe] text-[#1d4ed8] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#93c5fd] bg-white"
                              title="Ver detalles de Guarda Arcana"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver regla</span>
                            </button>
                            <span className="text-[10px] text-[#2563eb] bg-[#dbeafe] px-2 py-0.5 rounded font-bold">
                              Absorbe daño antes de PG
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          Al lanzar un conjuro de abjuración de nivel 1+, la Guarda recupera el doble del nivel de la ranura gastada. {wizardLevel >= 6 ? 'Guarda Proyectada: reacción para absorber daño a un aliado a 30 pies.' : ''} {wizardLevel >= 10 ? `Abjuración Mejorada: +${profBonus} a pruebas de Contrahechizo y Disipar Magia.` : ''} {wizardLevel >= 14 ? 'Resistencia a Conjuros: ventaja en salvaciones contra conjuros y resistencia a daño de conjuros.' : ''}
                        </p>
                      </div>
                    )}

                    {/* 2. Canto de la Hoja */}
                    {isBladesinging && (
                      <div className="p-3 bg-[#ecfdf5] rounded-xl border border-[#10b981] text-[11px] text-[#065f46] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold gap-2">
                          <span className="flex items-center gap-1.5">
                            <span>⚔️</span> Canto de la Hoja ({profBonus} usos/descanso largo)
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: 'Canto de la Hoja (Tradición Bladesinging)',
                                badge: 'Acción Adicional • Danza Élfica de Guerra',
                                classTag: 'Mago Bladesinger',
                                summary: 'Invocas la tradición mágica y marcial de los elfos para moverte con gracia sobrehumana y defensa impenetrable.',
                                mechanics: [
                                  { label: 'Usos Diarios', value: `${profBonus} por Descanso Largo` },
                                  { label: 'Duración', value: '1 minuto (o hasta usar escudo/armadura pesada)' },
                                  { label: 'Bono a CA', value: `+${intMod} (Modificador de Inteligencia)` },
                                  { label: 'Movilidad', value: '+10 pies de velocidad a pie' },
                                  { label: 'Concentración', value: `+${intMod} a salvaciones de Concentración` },
                                ],
                                rules: [
                                  'Activación: Puedes activar el Bladesong como acción adicional si no estás usando armadura media o pesada ni un escudo.',
                                  'Bonificaciones Activas: Sumas tu modificador de Inteligencia a tu CA (mínimo +1); tu velocidad aumenta en 10 pies; ganas ventaja en pruebas de Destreza (Acrobacias); y sumas tu Inteligencia a las tiradas de salvación de Constitución para mantener la concentración.',
                                  'Ataque Adicional Mejorado (Nv 6): Puedes atacar dos veces cuando uses la acción Atacar, y uno de esos ataques puede ser sustituido por un truco.',
                                  'Canción de Defensa (Nv 10): Como reacción al recibir daño, puedes gastar una ranura de conjuro para reducir el daño en 5 veces el nivel de la ranura.',
                                ],
                              })}
                              className="p-1 hover:bg-[#d1fae5] text-[#065f46] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#a7f3d0] bg-white"
                              title="Ver detalles de Canto de la Hoja"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver regla</span>
                            </button>
                            <span className="text-[10px] text-[#059669] bg-[#d1fae5] px-2 py-0.5 rounded font-bold">
                              +10 pies • +{intMod} CA
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          Acción adicional (1 min): suma Mod. Int (+{intMod}) a CA y a concentración, +10 pies movimiento y ventaja en Acrobacias. {wizardLevel >= 6 ? 'Ataque Adicional Mejorado: puedes sustituir uno de los ataques por un truco.' : ''} {wizardLevel >= 10 ? 'Canción de Defensa: reacción al recibir daño, gasta ranura para absorber 5x nivel de ranura.' : ''} {wizardLevel >= 14 ? `Canción de Victoria: suma +${intMod} (Int) al daño de ataques con arma cuerpo a cuerpo en Bladesong.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 3. Adivinación */}
                    {isDivination && (
                      <div className="p-3 bg-[#faf5ff] rounded-xl border border-[#a855f7] text-[11px] text-[#581c87] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold gap-2">
                          <span className="flex items-center gap-1.5">
                            <span>🔮</span> Presagio ({wizardLevel >= 14 ? '3d20' : '2d20'} Dados de Portento)
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: 'Presagio (Portento de la Escuela de Adivinación)',
                                badge: `Rasgo de Subclase • ${wizardLevel >= 14 ? '3 Dados' : '2 Dados'} por Descanso Largo`,
                                classTag: 'Mago Adivino',
                                summary: 'Vislumbras destellos del destino que puedes imponer en la realidad para cambiar tiradas cruciales tuyas o de cualquier criatura.',
                                mechanics: [
                                  { label: 'Dados Disponibles', value: `${wizardLevel >= 14 ? '3' : '2'} dados d20 por día` },
                                  { label: 'Momento de Declaración', value: 'Antes de que se tire el d20' },
                                  { label: 'Alcance', value: 'Cualquier criatura visible a cualquier distancia' },
                                  { label: 'Tiradas Aplicables', value: 'Ataques, Salvaciones o Pruebas de Característica' },
                                ],
                                rules: [
                                  'Tirada Diaria: Al terminar un descanso largo, tira 2 dados de 20 (3 dados a partir del nivel 14) y anota los resultados obtenidos. Estos números son tus visiones guardadas.',
                                  'Sustituir Tiradas: Puedes sustituir cualquier tirada de ataque, tirada de salvación o prueba de característica que hagas tú o una criatura que puedas ver por uno de tus dados de presagio guardados.',
                                  'Regla Esencial: Debes elegir hacer esto ANTES de que se tire el dado en la mesa, no después de ver el resultado del d20.',
                                  'Consumo de Dados: Cada dado de presagio solo puede emplearse una vez. Al final de tu siguiente descanso largo, pierdes cualquier dado de presagio sobrante no utilizado.',
                                ],
                                tips: [
                                  'Guarda los números muy bajos (1-4) para imponer fallos automáticos en salvaciones contra tus mejores hechizos de control.',
                                  'Guarda los números muy altos (18-20) para asegurar impactos críticos o salvar a aliados de efectos mortales.',
                                ],
                              })}
                              className="p-1 hover:bg-[#ede9fe] text-[#7c3aed] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#d8b4fe]/80 bg-[#f5f3ff]"
                              title="Ver detalles completos y reglas oficiales de Presagio"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver regla</span>
                            </button>
                            <span className="text-[10px] text-[#7c3aed] bg-[#ede9fe] px-2 py-0.5 rounded-full font-bold">
                              Sustituye d20 visible
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          Sustituye cualquier tirada de ataque, salvación o prueba de característica tuya o de otra criatura visible por uno de tus dados anotados. {wizardLevel >= 6 ? 'Adivinador Experto: lanzar conjuro de adivinación de nivel 2+ te devuelve una ranura de menor nivel.' : ''} {wizardLevel >= 10 ? 'El Tercer Ojo: visión en oscuridad, visión etérea, leer cualquier idioma o ver invisibilidad (1/descanso).' : ''}
                        </p>
                      </div>
                    )}

                    {/* 4. Magia de Guerra */}
                    {isWarMagic && (
                      <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#f97316] text-[11px] text-[#9a3412] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold gap-2">
                          <span className="flex items-center gap-1.5">
                            <span>⚡</span> Deflexión Arcana & Ingenio Táctico (+{intMod} a Iniciativa)
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: 'Deflexión Arcana & Ingenio Táctico (Magia de Guerra)',
                                badge: 'Reacción Táctica • Escuela de Magia de Guerra',
                                classTag: 'Mago de Guerra',
                                summary: 'Reflejos mágicos marciales para desviar ataques y asegurar tiradas de salvación vitales.',
                                mechanics: [
                                  { label: 'Defensa contra Ataque', value: '+2 a CA contra ese ataque (Reacción)' },
                                  { label: 'Defensa contra Salvación', value: '+4 a la tirada de salvación (Reacción)' },
                                  { label: 'Restricción de Conjuración', value: 'Solo trucos hasta el final de tu siguiente turno' },
                                  { label: 'Bono de Iniciativa', value: `+${intMod} (Modificador de Inteligencia)` },
                                ],
                                rules: [
                                  'Deflexión Arcana: Como reacción cuando seas impactado por un ataque, puedes ganar un bonificador de +2 a tu CA contra ese impacto.',
                                  'O como reacción cuando falles una tirada de salvación, puedes ganar un bonificador de +4 a esa tirada de salvación.',
                                  'Restricción Táctica: Al usar esta reacción, hasta el final de tu siguiente turno no puedes lanzar ningún conjuro excepto trucos.',
                                  'Ingenio Táctico: A nivel 2, sumas tu modificador de Inteligencia a tus tiradas de Iniciativa.',
                                ],
                              })}
                              className="p-1 hover:bg-[#ffedd5] text-[#9a3412] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#fed7aa] bg-white"
                              title="Ver detalles de Deflexión Arcana"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver regla</span>
                            </button>
                            <span className="text-[10px] text-[#ea580c] bg-[#ffedd5] px-2 py-0.5 rounded font-bold">
                              +2 CA / +4 Salv. Reacción
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          Deflexión Arcana: reacción al ser atacado o fallar salvación para ganar +2 CA o +4 a la salvación. {wizardLevel >= 6 ? `Oleada de Poder: almacena hasta ${Math.max(1, intMod)} oleadas (+${Math.floor(wizardLevel / 2)} daño de fuerza a conjuro).` : ''} {wizardLevel >= 10 ? 'Magia Duradera: +2 CA y +2 a todas las salvaciones mientras estés concentrado.' : ''} {wizardLevel >= 14 ? `Sudario Deflector: Deflexión Arcana causa ${Math.floor(wizardLevel / 2)} daño de fuerza a 3 criaturas.` : ''}
                        </p>
                      </div>
                    )}

                    {/* 5. Cronurgia */}
                    {isChronurgy && (
                      <div className="p-3 bg-[#f0fdfa] rounded-xl border border-[#14b8a6] text-[11px] text-[#134e4a] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold gap-2">
                          <span className="flex items-center gap-1.5">
                            <span>⏳</span> Cambio Cronal (2 usos) & Consciencia Temporal (+{intMod} Iniciativa)
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: 'Cambio Cronal & Consciencia Temporal (Cronurgia)',
                                badge: 'Reacción Temporal • Escuela de Cronurgia',
                                classTag: 'Mago Cronurgo',
                                summary: 'Manipulas el flujo del tiempo para obligar a repetir tiradas decisivas a corta distancia.',
                                mechanics: [
                                  { label: 'Cambio Cronal', value: '2 usos por Descanso Largo' },
                                  { label: 'Alcance', value: '30 pies de una criatura visible' },
                                  { label: 'Bono de Iniciativa', value: `+${intMod} (Modificador de Inteligencia)` },
                                ],
                                rules: [
                                  'Cambio Cronal: Como reacción tras ver a una criatura a 30 pies hacer una tirada de ataque, salvación o prueba de característica, puedes obligarla a repetir el d20 y debe usar la segunda tirada.',
                                  'Consciencia Temporal: Sumas tu modificador de Inteligencia a tus tiradas de Iniciativa.',
                                ],
                              })}
                              className="p-1 hover:bg-[#ccfbf1] text-[#134e4a] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#99f6e4] bg-white"
                              title="Ver detalles de Cronurgia"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver regla</span>
                            </button>
                            <span className="text-[10px] text-[#0d9488] bg-[#ccfbf1] px-2 py-0.5 rounded font-bold">
                              Reacción 30 pies
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          Cambio Cronal: reacción para obligar a repetir un d20 a 30 pies. {wizardLevel >= 6 ? `Éxtasis Fugaz: incapacita criatura a 60 pies con salvación Con (${Math.max(1, intMod)} usos).` : ''} {wizardLevel >= 10 ? 'Gránulo Arcano: encapsula un conjuro de nivel ≤4 en una cuenta durante 1 hora.' : ''} {wizardLevel >= 14 ? 'Convergencia de Destinos: asegura éxito o fallo automático a 60 pies (sufres 1 nivel de agotamiento).' : ''}
                        </p>
                      </div>
                    )}

                    {/* 6. Evocación */}
                    {isEvocation && (
                      <div className="p-3 bg-[#fef2f2] rounded-xl border border-[#ef4444] text-[11px] text-[#991b1b] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold gap-2">
                          <span className="flex items-center gap-1.5">
                            <span>💥</span> Moldear Conjuros (Esculpir) & Truco Potente
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => openFeatureInspector({
                                title: 'Moldear Conjuros (Escuela de Evocación)',
                                badge: 'Protección de Aliados • Magia Destructiva Segura',
                                classTag: 'Mago Evocador',
                                summary: 'Creas bolsas de seguridad dentro de tus conjuros de área para no dañar a tus compañeros de equipo.',
                                mechanics: [
                                  { label: 'Aliados Protegidos', value: '1 + Nivel del conjuro lanzado' },
                                  { label: 'Salvación de Aliados', value: 'Éxito automático' },
                                  { label: 'Daño Recibido', value: '0 daño (en lugar de la mitad)' },
                                ],
                                rules: [
                                  'Moldear Conjuros: Al lanzar un conjuro de evocación que afecte a otras criaturas que puedas ver, puedes elegir a un número de ellas igual a 1 + el nivel del conjuro.',
                                  'Las criaturas elegidas superan automáticamente la tirada de salvación y no reciben daño si normalmente recibirían la mitad.',
                                  'Truco Potente (Nv 6): Cuando una criatura supera la salvación contra uno de tus trucos, sufre la mitad del daño en lugar de nada.',
                                  'Evocación Potenciada (Nv 10): Sumas tu modificador de Inteligencia al daño de tus conjuros de evocación.',
                                ],
                              })}
                              className="p-1 hover:bg-[#fee2e2] text-[#991b1b] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#fca5a5] bg-white"
                              title="Ver detalles de Moldear Conjuros"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Ver regla</span>
                            </button>
                            <span className="text-[10px] text-[#dc2626] bg-[#fee2e2] px-2 py-0.5 rounded font-bold">
                              Protege aliados en áreas
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          Moldear Conjuros: hasta {1 + wizardLevel} aliados superan automáticamente la salvación de tus conjuros de área y no reciben daño. {wizardLevel >= 6 ? 'Truco Potente: enemigos que superan la salvación de tus trucos reciben la mitad de daño.' : ''} {wizardLevel >= 10 ? `Evocación Potenciada: sumas +${intMod} (Int) a una tirada de daño de tus conjuros de evocación.` : ''} {wizardLevel >= 14 ? 'Sobrecarga: maximizas el daño de un conjuro de mago de nivel 1-5 (1/descanso largo sin daño necrótico).' : ''}
                        </p>
                      </div>
                    )}

                    {/* 7. Otras Subclases (Graviturgia, Conjuración, Encantamiento, Ilusión, Nigromancia, Escribas, Transmutación) */}
                    {(isGraviturgy || isConjuration || isEnchantment || isIllusion || isNecromancy || isTransmutation || isScribes) && (
                      <div className="p-3 bg-white/80 rounded-xl border border-[#bfdbfe] text-[11px] text-[#334155] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between font-bold text-[#1e40af]">
                          <span>Rasgos de {charData.subclass || 'Escuela Arcana'}</span>
                          <button
                            type="button"
                            onClick={() => openFeatureInspector({
                              title: `Tradición Arcana: ${charData.subclass}`,
                              badge: 'Especialización de Escuela',
                              classTag: 'Mago',
                              summary: `Rasgos y secretos de la escuela ${charData.subclass}. Copiar conjuros de esta escuela cuesta solo 1 hora y 25 po por nivel.`,
                              rules: [
                                isGraviturgy ? 'Graviturgia: Ajustar Densidad altera el peso de objetos y criaturas a la mitad o al doble; Pozo Violento suma daño por caída e impacto de arma; Horizonte de Sucesos inmoviliza y causa daño de fuerza.' : '',
                                isConjuration ? 'Conjuración: Conjuración Menor crea objetos no mágicos visibles; Traslación Benigna te teletransporta 30 pies o intercambia posición con un aliado; Concentración Inquebrantable impide perder concentración por daño.' : '',
                                isEnchantment ? 'Encantamiento: Mirada Hipnótica incapacita a 5 pies; Encantamiento Instintivo desvía ataques recibidos hacia otra criatura; Encantamiento Dividido duplica conjuros de un solo objetivo.' : '',
                                isIllusion ? 'Ilusión: Ilusión Menor Mejorada emite imagen y sonido simultáneos; Ilusiones Maleables cambian ilusiones activas; Ser Ilusorio anula impactos con duplicados; Realidad Ilusoria hace tangibles tus ilusiones.' : '',
                                isNecromancy ? 'Nigromancia: Cosecha Sombría cura al eliminar enemigos; Siervos No Muertos alza esqueletos/zombis más poderosos con más vida y daño; Comandar No Muertos controla criaturas no muertas hostiles.' : '',
                                isTransmutation ? 'Transmutación: Alquimia Menor transmuta materiales; Piedra del Transmutador otorga velocidad, visión oscura o salvación de Constitución; Cambiaformas te permite polimorfarte gratis.' : '',
                                isScribes ? 'Orden de los Escribas: Pluma Mágica anota conjuros en minutos; Grimorio Despertado altera el tipo de daño de conjuros; Manifiesto Mental proyecta tu mente espectral a 60 pies.' : '',
                              ].filter(Boolean),
                            })}
                            className="p-1 hover:bg-[#dbeafe] text-[#1d4ed8] rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold border border-[#bfdbfe]/80 bg-[#eff6ff]"
                            title="Ver detalles de la escuela"
                          >
                            <Search className="w-3.5 h-3.5" />
                            <span>Ver regla</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-[#475569] leading-relaxed">
                          {isGraviturgy && 'Escuela de Graviturgia: Ajustar Densidad (peso x2 o 1/2) • Pozo Violento (+1d10 daño arma/+2d10 caída) • Horizonte de Sucesos (2d10 fuerza, velocidad 0).'}
                          {isConjuration && 'Escuela de Conjuración: Conjuración Menor (crear objeto no mágico) • Traslación Benigna (teletransporte 30 pies o intercambio) • Concentración Inquebrantable.'}
                          {isEnchantment && 'Escuela de Encantamiento: Mirada Hipnótica (incapacitar a 5 pies) • Encantamiento Instintivo (desviar ataque recibido) • Encantamiento Dividido (duplicar objetivo).'}
                          {isIllusion && 'Escuela de Ilusión: Ilusión Menor Mejorada (imagen y sonido simultáneos) • Ilusiones Maleables • Ser Ilusorio (anular impacto con copia) • Realidad Ilusoria.'}
                          {isNecromancy && 'Escuela de Nigromancia: Cosecha Sombría (cura al matar) • Siervos No Muertos (+1 zombi/esqueleto, +PG nivel, +daño PB) • Comandar No Muertos.'}
                          {isTransmutation && 'Escuela de Transmutación: Alquimia Menor • Piedra del Transmutador (+10 pies vel / resistencia elemental / salvación Con) • Cambiaformas.'}
                          {isScribes && 'Orden de los Escribas: Pluma Mágica • Grimorio Despertado (cambiar tipo de daño, foco arcano) • Manifiesto Mental (avatar espectral 60 pies) • Maestro Escriba.'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 5. SPELLS & GRIMOIRE (SLOTS, CANTRIPS, PREPARED, DC, ATTACK)
      // ----------------------------------------------------------------------
      case 'spells':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-4">
            {renderScrollSectionHeader(
              null,
              'Grimorio & Conjuración Mística',
              'Ranuras activas, trucos y hechizos preparados.',
              <>
                {((charData.class.toLowerCase().includes('mago') ||
                  charData.class.toLowerCase().includes('wizard')) &&
                  (charData.level || 1) >= 3) &&
                  renderHeaderSmallButton({
                    onClick: () => setIsCantripFormulasOpen(true),
                    label: 'Fórmulas',
                    icon: <Sparkles className="w-3 h-3 text-[#f0c869]" />,
                    title: 'Fórmulas de Trucos (Tasha): Reemplazar un truco tras descanso largo',
                  })}
                {renderHeaderSmallButton({
                  onClick: () => setIsSpellPickerOpen(true),
                  label: 'Añadir',
                  active: true,
                  icon: <Plus className="w-3 h-3 text-[#ffd56b]" />,
                  title: 'Buscar y añadir conjuros de linaje, dotes o compendio oficial',
                })}
                {isCaster &&
                  renderHeaderSmallButton({
                    onClick: handleResetSpellSlots,
                    label: 'Restaurar',
                    icon: <RotateCcw className="w-3 h-3 text-[#d4ab59]" />,
                    title: 'Restaurar todas las ranuras de conjuro gastadas',
                  })}
              </>
            )}

            {/* Spellcasting DC & Attack Bar with Forged Octagonal Crests */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f5ede0]/85 rounded-xl p-2 border border-[#b89b6a] flex flex-col items-center justify-between">
                <div className="text-[9.5px] font-fantasy font-bold text-[#4a361c] uppercase">
                  Aptitud Mágica
                </div>
                <div className="relative w-13 h-13 my-0.5 flex items-center justify-center">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-xs font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)] leading-none">
                    {ABILITY_LABELS[spellAbility].short}
                  </span>
                </div>
                <div className="text-[9px] text-[#6b553b] font-semibold">
                  {formatScoreToMod(charData.stats[spellAbility])} mod
                </div>
              </div>

              <div className="bg-[#f5ede0]/85 rounded-xl p-2 border border-[#b89b6a] flex flex-col items-center justify-between">
                <div className="text-[9.5px] font-fantasy font-bold text-[#4a361c] uppercase">
                  CD Salvación
                </div>
                <div className="relative w-13 h-13 my-0.5 flex items-center justify-center">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)] leading-none">
                    {calculatedSpellDc}
                  </span>
                </div>
                <div className="text-[9px] text-[#6b553b] font-semibold">Dificultad enemigo</div>
              </div>

              <div
                onClick={() =>
                  rollD20(
                    `Ataque de Conjuro (${ABILITY_LABELS[spellAbility].short})`,
                    calculatedSpellAttack
                  )
                }
                className="bg-[#f5ede0]/85 rounded-xl p-2 border border-[#b89b6a] cursor-pointer hover:border-[#8c672b] hover:bg-[#ede1ce] transition group flex flex-col items-center justify-between"
                title="Tirar ataque de conjuro mágico"
              >
                <div className="text-[9.5px] font-fantasy font-bold text-[#4a361c] uppercase group-hover:text-[#8c672b]">
                  Ataque Mágico 🎲
                </div>
                <div className="relative w-13 h-13 my-0.5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)] leading-none">
                    {calculatedSpellAttack >= 0 ? `+${calculatedSpellAttack}` : calculatedSpellAttack}
                  </span>
                </div>
                <div className="text-[9px] text-[#6b553b] font-semibold">Clic para tirar</div>
              </div>
            </div>

            {/* Spell Slots tracker checkboxes */}
            {Object.keys(spellSlots).length > 0 && (
              <div className="bg-[#f5ede0]/90 rounded-xl p-3.5 border border-[#b89b6a] space-y-2">
                <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase block">
                  Ranuras de Conjuro Disponibles (Spell Slots)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(spellSlots).map(([key, slot]) => {
                    if (!slot || slot.max === 0) return null;
                    const lvlNum = key.replace('lvl', '');
                    const available = slot.max - slot.used;

                    return (
                      <div
                        key={key}
                        className="bg-[#fcf6ea] rounded-lg p-2 border border-[#cbb28c] flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-[11px] font-fantasy font-bold text-[#4a361c]">
                          <span>Nivel {lvlNum}</span>
                          <span className="font-mono text-[10px] text-[#8c672b]">
                            {available}/{slot.max}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {Array.from({ length: slot.max }).map((_, idx) => {
                            const isUsed = idx < slot.used;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  toggleSpellSlotUse(
                                    key as keyof CharacterSpellSlots,
                                    idx
                                  )
                                }
                                className={`w-4 h-4 rounded border transition cursor-pointer flex items-center justify-center ${
                                  isUsed
                                    ? 'bg-[#d6c4aa] border-[#ad9c88] text-[#5e4e3e]'
                                    : 'bg-[#8c672b] border-[#705220] text-white shadow-2xs'
                                }`}
                                title={isUsed ? 'Ranura gastada (clic para recuperar)' : 'Ranura libre (clic para gastar)'}
                              >
                                {!isUsed && <Sparkles className="w-2.5 h-2.5" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spells list search and filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9c8975]" />
                  <input
                    type="text"
                    value={spellSearchTerm}
                    onChange={(e) => setSpellSearchTerm(e.target.value)}
                    placeholder="Buscar en grimorio..."
                    className="w-full bg-[#fcf6ea] border border-[#b89b6a] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b]"
                  />
                </div>
                <select
                  value={spellSchoolFilter}
                  onChange={(e) => setSpellSchoolFilter(e.target.value)}
                  className="bg-[#fcf6ea] border border-[#b89b6a] rounded-lg px-2.5 py-1.5 text-xs text-[#2c221a] focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas las escuelas</option>
                  <option value="abjuración">Abjuración</option>
                  <option value="conjuración">Conjuración</option>
                  <option value="adivinación">Adivinación</option>
                  <option value="encantamiento">Encantamiento</option>
                  <option value="evocación">Evocación</option>
                  <option value="ilusión">Ilusión</option>
                  <option value="nigromancia">Nigromancia</option>
                  <option value="transmutación">Transmutación</option>
                </select>
              </div>

              {/* Spells Grid grouped by Level */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {/* Cantrips */}
                {filteredSpellsList.some((s) => s.level === 0) && (
                  <div>
                    <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wider block mb-1">
                      Trucos (Nivel 0 - Ilimitados)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {filteredSpellsList
                        .filter((s) => s.level === 0)
                        .map((sp) => (
                          <div
                            key={sp.id || sp.name}
                            onClick={() => setSelectedSpellDetail(sp)}
                            className="p-2 bg-[#f5ede0] rounded-lg border border-[#d8c8af] hover:border-[#8c672b] cursor-pointer transition flex items-center justify-between text-xs group"
                          >
                            <span className="font-fantasy font-bold text-[#2c221a] truncate">
                              {sp.name}
                            </span>
                            <div className="flex items-center gap-1 shrink-0 ml-1">
                              <span className="text-[10px] text-[#786450] font-mono">
                                {sp.castingTime}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveSpell(sp.name);
                                }}
                                className="p-0.5 text-[#9c8975] hover:text-[#a8423d] rounded transition cursor-pointer"
                                title="Quitar truco del grimorio"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Level 1+ */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
                  const spellsAtLvl = filteredSpellsList.filter((s) => s.level === lvl);
                  if (spellsAtLvl.length === 0) return null;

                  return (
                    <div key={lvl}>
                      <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wider block mb-1">
                        Conjuros de Nivel {lvl}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {spellsAtLvl.map((sp) => (
                          <div
                            key={sp.id || sp.name}
                            onClick={() => setSelectedSpellDetail(sp)}
                            className="p-2 bg-[#f5ede0] rounded-lg border border-[#d8c8af] hover:border-[#8c672b] cursor-pointer transition flex items-center justify-between text-xs group"
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-fantasy font-bold text-[#2c221a] truncate">
                                {sp.name}
                              </span>
                              {sp.concentration && (
                                <span className="text-[9px] bg-[#f8dcd9] text-[#8c2e28] px-1 rounded font-mono">
                                  C
                                </span>
                              )}
                              {sp.ritual && (
                                <span className="text-[9px] bg-[#ede1ce] text-[#7a5a2b] px-1 rounded font-mono">
                                  R
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0 ml-1">
                              <span className="text-[10px] text-[#786450] font-mono">
                                {sp.school}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveSpell(sp.name);
                                }}
                                className="p-0.5 text-[#9c8975] hover:text-[#a8423d] rounded transition cursor-pointer"
                                title="Quitar conjuro del grimorio"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {filteredSpellsList.length === 0 && (
                  <div className="p-5 text-center bg-[#faf6ee] rounded-xl border border-dashed border-[#d8c8af] text-xs text-[#786450] space-y-2">
                    <div>No hay conjuros registrados en el grimorio.</div>
                    <button
                      type="button"
                      onClick={() => setIsSpellPickerOpen(true)}
                      className="px-3 py-1 bg-[#8c672b] hover:bg-[#73521e] text-white rounded-lg text-xs font-fantasy font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Añadir Conjuro del Compendio...
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 6. CLASS FEATURES & FEATS
      // ----------------------------------------------------------------------
      case 'classFeatures':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-2.5 sm:p-3 shadow-sm space-y-2">
            {renderScrollSectionHeader(
              null,
              'Rasgos de Clase, Subclase & Dotes',
              `Habilidades otorgadas por tu progreso hasta Nivel ${charData.level}.`
            )}

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {/* Feats if any */}
              {identifiedFeats.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wide block">
                    ⭐ Dotes Consagradas (Feats)
                  </span>
                  {identifiedFeats.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-1 shadow-2xs"
                    >
                      <div className="font-fantasy font-bold text-xs text-[#2c221a]">
                        {feat.name}
                      </div>
                      <p className="text-[11px] text-[#5e4e3e] leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Class & Subclass Tactical Decisions (Disciplinas Elementales, Runas, Tótem, Maniobras, etc.) */}
              {charData.classDecisions && Object.keys(charData.classDecisions).length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wide block">
                    ⚡ Decisiones Tácticas de Especialización
                  </span>
                  {Object.entries(charData.classDecisions).map(([key, val]) => {
                    const label =
                      key === 'elementalDisciplines'
                        ? 'Disciplinas de los Cuatro Elementos'
                        : key === 'kenseiWeapons'
                        ? 'Armas de Kensei'
                        : key.startsWith('totem')
                        ? 'Espíritu / Aspecto Totémico'
                        : key === 'runeKnightRunes'
                        ? 'Runas Grabadas'
                        : key === 'arcaneArcherShots'
                        ? 'Disparos Arcanos'
                        : key === 'battleMasterManeuvers'
                        ? 'Maniobras de Combate'
                        : key === 'metamagic'
                        ? 'Opciones de Metamagia'
                        : key === 'invocations'
                        ? 'Invocaciones Sobrenaturales'
                        : key === 'pactBoon'
                        ? 'Don del Pacto'
                        : key === 'pactTomeCantrips'
                        ? 'Trucos del Pacto del Tomo'
                        : key === 'pactChainFamiliar'
                        ? 'Familiar Sobrenatural (Pacto de la Cadena)'
                        : key === 'artificerArtisanTools'
                        ? 'Herramientas de Artesano (Artífice)'
                        : key === 'artificerInfusions'
                        ? 'Infusiones de Artífice'
                        : key === 'armorerModel'
                        ? 'Modelo de Armadura Arcana (Armero)'
                        : key === 'armorerModifications'
                        ? 'Modificaciones de Armadura (Armero Nv 9)'
                        : key === 'artilleristCannon'
                        ? 'Cañón Sobrenatural Preferido (Artillero)'
                        : key === 'battleSmithSteelDefender'
                        ? 'Defensor de Acero (Herrero de Batalla)'
                        : key === 'alchemistExperimentalElixir'
                        ? 'Elixir Experimental (Alquimista)'
                        : key === 'clericKnowledgeSkills'
                        ? 'Habilidades de Erudición (Dominio del Conocimiento)'
                        : key === 'clericKnowledgeLanguages'
                        ? 'Idiomas de Erudición (Dominio del Conocimiento)'
                        : key === 'clericNatureCantrip'
                        ? 'Truco de Druida (Dominio de la Naturaleza)'
                        : key === 'clericNatureSkill'
                        ? 'Habilidad de la Naturaleza (Dominio de la Naturaleza)'
                        : key === 'clericArcanaCantrips'
                        ? 'Trucos de Mago (Dominio Arcano)'
                        : key === 'clericOrderSkill'
                        ? 'Competencia del Orden (Dominio del Orden)'
                        : key === 'clericPeaceSkill'
                        ? 'Competencia de la Paz (Dominio de la Paz)'
                        : key === 'clericDeathCantrip'
                        ? 'Truco de Nigromancia (Dominio de la Muerte)'
                        : key === 'clericArcanaMastery_17'
                        ? 'Maestría Arcana (Dominio Arcano Nivel 17)'
                        : key.startsWith('bardMagicalSecrets')
                        ? 'Secretos Mágicos (Bardo)'
                        : key.startsWith('featChoice_')
                        ? `Dote Especial: ${key.replace('featChoice_', '').toUpperCase()}`
                        : key === 'zealotDivineFury'
                        ? 'Furia Divina (Fanático Nivel 3)'
                        : key === 'beastNaturalWeapons'
                        ? 'Arma Natural Bestial (Camino de la Bestia)'
                        : key === 'beastSoulAdaptation'
                        ? 'Alma Bestial - Adaptación Física (Nivel 6)'
                        : key === 'stormHeraldEnvironment'
                        ? 'Entorno del Aura de Tormenta (Heraldo)'
                        : key === 'giantLanguage'
                        ? 'Idioma de los Gigantes'
                        : key === 'giantElementalCleaver'
                        ? 'Cuchilla Elemental (Gigante Nivel 6)'
                        : key.startsWith('primalKnowledge')
                        ? 'Conocimiento Primitivo (Tasha)'
                        : key === 'totemTigerSkills6'
                        ? 'Habilidades del Aspecto del Tigre'
                        : key === 'swordsFightingStyle'
                        ? 'Estilo de Combate (Colegio de las Espadas)'
                        : key === 'loreBonusSkills'
                        ? 'Competencias Adicionales (Colegio del Conocimiento)'
                        : key === 'spiritsSpiritSession'
                        ? 'Sesión Espiritual (Colegio de los Espíritus)'
                        : key.startsWith('bardExpertise_')
                        ? 'Pericia (Bardo)'
                        : key === 'fightingStyle'
                        ? 'Estilo de Combate'
                        : key === 'expertise'
                        ? 'Pericia (Doble Competencia)'
                        : key === 'draconicAncestry'
                        ? 'Ancestro Dracónico'
                        : key === 'druidLandCantrip'
                        ? 'Truco Adicional (Círculo de la Tierra)'
                        : key === 'druidShepherdLanguage'
                        ? 'Discurso de los Bosques (Silvano)'
                        : key === 'landBiome'
                        ? 'Bioma del Círculo de la Tierra'
                        : key.startsWith('favoredEnemy')
                        ? 'Enemigo Predilecto'
                        : key.startsWith('naturalExplorer')
                        ? 'Terreno Predilecto'
                        : key === 'rangerFightingStyle_2'
                        ? 'Estilo de Combate (Explorador)'
                        : key === 'hunterPrey_3'
                        ? 'Presa del Cazador'
                        : key === 'hunterDefense_7'
                        ? 'Tácticas Defensivas del Cazador'
                        : key === 'hunterMultiattack_11'
                        ? 'Ataque Múltiple del Cazador'
                        : key === 'hunterSuperiorDefense_15'
                        ? 'Defensa Superior del Cazador'
                        : key === 'drakewardenDraconicEssence_3'
                        ? 'Esencia Dracónica del Drake'
                        : key === 'fighterFightingStyle_1'
                        ? 'Estilo de Combate (Guerrero)'
                        : key === 'championSecondFightingStyle'
                        ? 'Segundo Estilo de Combate (Campeón)'
                        : key === 'battleMasterArtisanTool_3'
                        ? 'Estudiante de la Guerra (Maestro de Batalla)'
                        : key === 'samuraiBonusSkill_3'
                        ? 'Cortesano Elegante - Habilidad (Samurái)'
                        : key === 'elementalDisciplines'
                        ? 'Disciplinas de los Cuatro Elementos'
                        : key === 'kenseiWeapons'
                        ? 'Armas de Kensei'
                        : key === 'kenseiTool_3'
                        ? 'Herramienta Artística de Kensei'
                        : key === 'ascendantDragonLanguage_3'
                        ? 'Idioma Dracónico (Dragón Ascendente)'
                        : key === 'paladinFightingStyle_2'
                        ? 'Estilo de Combate (Paladín)'
                        : key;

                    const displayVal = Array.isArray(val) ? val.join(', ') : String(val);

                    return (
                      <div
                        key={key}
                        className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-1 shadow-2xs"
                      >
                        <div className="font-fantasy font-bold text-xs text-[#2c221a]">
                          {label}
                        </div>
                        <p className="text-[11px] text-[#5e4e3e] leading-relaxed font-semibold">
                          {displayVal}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Subclass Features */}
              {unlockedSubclassFeatures.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wide block">
                    ⚜️ Rasgos de Subclase ({charData.subclass})
                  </span>
                  {unlockedSubclassFeatures.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-1 shadow-2xs"
                    >
                      <div className="font-fantasy font-bold text-xs text-[#2c221a] flex items-center justify-between">
                        <span>{f.name}</span>
                        <span className="text-[9px] text-[#8c672b] font-mono">
                          Nv. {f.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5e4e3e] leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Class Features */}
              <div className="space-y-2">
                <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wide block">
                  🛡️ Rasgos Básicos de Clase ({charData.class})
                </span>
                {unlockedClassFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-1 shadow-2xs"
                  >
                    <div className="font-fantasy font-bold text-xs text-[#2c221a] flex items-center justify-between">
                      <span>{f.name}</span>
                      <span className="text-[9px] text-[#8c672b] font-mono">
                        Nv. {f.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5e4e3e] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Background Feature */}
              {backgroundObj && (
                <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-1 shadow-2xs">
                  <div className="font-fantasy font-bold text-xs text-[#8c672b]">
                    📜 Rasgo de Trasfondo ({backgroundObj.name}): {backgroundObj.featureName}
                  </div>
                  <p className="text-[11px] text-[#5e4e3e] leading-relaxed">
                    {backgroundObj.featureDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 7. EQUIPMENT, INVENTORY & WEALTH
      // ----------------------------------------------------------------------
      case 'equipment':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-4">
            {renderScrollSectionHeader(
              null,
              'Inventario & Monedero',
              `Capacidad de carga: ${charData.stats.str * 15} libras.`
            )}

            {/* Coin Pouch */}
            <div className="bg-[#f5ede0]/90 rounded-xl p-3 border border-[#b89b6a] space-y-1.5">
              <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase block">
                💰 Monedero del Aventurero
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {(['cp', 'sp', 'ep', 'gp', 'pp'] as const).map((coin) => {
                  const label =
                    coin === 'cp'
                      ? 'PC (Cobre)'
                      : coin === 'sp'
                      ? 'PP (Plata)'
                      : coin === 'ep'
                      ? 'PE (Electro)'
                      : coin === 'gp'
                      ? 'PO (Oro)'
                      : 'PT (Platino)';
                  return (
                    <div
                      key={coin}
                      className="bg-[#fcf6ea] rounded-lg p-1.5 border border-[#cbb28c]"
                    >
                      <div className="text-[9px] text-[#786450] font-bold">{label.split(' ')[0]}</div>
                      <div className="text-sm font-bold font-mono text-[#8c672b] mt-0.5">
                        {coins[coin]}
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setCoins((prev) => ({
                              ...prev,
                              [coin]: Math.max(0, prev[coin] - 1),
                            }))
                          }
                          className="w-4 h-4 rounded bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#4a361c] flex items-center justify-center text-[10px] font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCoins((prev) => ({ ...prev, [coin]: prev[coin] + 1 }))
                          }
                          className="w-4 h-4 rounded bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#4a361c] flex items-center justify-center text-[10px] font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Tactical Equipment & Defense Summary */}
            <div className="bg-[#f5ede0]/90 rounded-xl p-3 border border-[#b89b6a] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8c672b]" /> Equipamiento Activo & Defensa Táctica
                </span>
                <span className="bg-[#3a2816] text-[#f3dfb1] border border-[#b88c32] font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg shadow-xs">
                  🛡️ CA Total: {currentAc}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div
                  onClick={() => equippedArmor && setSelectedDetailItem(equippedArmor.name)}
                  className={`p-2.5 bg-[#fcf6ea] rounded-xl border border-[#cbb28c] flex items-center gap-2.5 min-w-0 transition cursor-pointer hover:border-[#8c672b] hover:bg-[#ede1ce] ${
                    equippedArmor ? 'shadow-2xs' : 'opacity-80'
                  }`}
                  title={equippedArmor ? 'Clic para ver detalles de la armadura' : 'Sin armadura equipada'}
                >
                  <img
                    src={getArmorBadgeAsset(equippedArmor?.name || '', equippedArmor?.category || 'medium')}
                    alt=""
                    className="w-8 h-8 object-contain shrink-0 drop-shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[#5c4a35] font-medium text-[9.5px] uppercase font-fantasy tracking-wider block leading-none">
                      Armadura:
                    </span>
                    <span className="font-fantasy font-bold text-xs text-[#382b20] leading-snug break-words block mt-0.5">
                      {equippedArmor ? `${equippedArmor.name.split('(')[0].trim()} (Base ${equippedArmor.baseAc})` : 'Sin armadura (10 + Des)'}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => hasEquippedShield && setSelectedDetailItem('Escudo')}
                  className={`p-2.5 bg-[#fcf6ea] rounded-xl border border-[#cbb28c] flex items-center gap-2.5 min-w-0 transition ${
                    hasEquippedShield ? 'cursor-pointer hover:border-[#8c672b] hover:bg-[#ede1ce] shadow-2xs' : 'opacity-70'
                  }`}
                  title={hasEquippedShield ? 'Clic para ver detalles del escudo' : 'Ningún escudo empuñado'}
                >
                  <img
                    src={getArmorBadgeAsset('escudo', 'shield')}
                    alt=""
                    className={`w-8 h-8 object-contain shrink-0 drop-shadow-xs ${hasEquippedShield ? '' : 'opacity-40 grayscale'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[#5c4a35] font-medium text-[9.5px] uppercase font-fantasy tracking-wider block leading-none">
                      Escudo:
                    </span>
                    <span className={`font-fantasy font-bold text-xs leading-snug break-words block mt-0.5 ${hasEquippedShield ? 'text-[#8c672b]' : 'text-[#7a6448]'}`}>
                      {hasEquippedShield ? '🛡️ Sí (Equipado +2 CA)' : 'Ninguno empuñado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compendium Weapon/Armor Picker & Add Custom Item Row */}
            <div className="space-y-2">
              {/* Row 1: Quick Compendium Catalog Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsWeaponPickerOpen(true)}
                  className="w-full px-3 py-2 bg-[#3a2816] hover:bg-[#2a1c0e] text-[#f3dfb1] border border-[#b88c32] rounded-lg text-xs font-fantasy font-bold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Abrir el catálogo oficial y suplementario de armas"
                >
                  <Sword className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />
                  <span>⚔️ Añadir Arma...</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsArmorPickerOpen(true)}
                  className="w-full px-3 py-2 bg-[#2b2015] hover:bg-[#1e150d] text-[#e8d096] border border-[#8c672b] rounded-lg text-xs font-fantasy font-bold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Abrir el catálogo oficial y suplementario de armaduras y escudos"
                >
                  <Shield className="w-3.5 h-3.5 text-[#d4ab59] shrink-0" />
                  <span>🛡️ Añadir Armadura...</span>
                </button>
              </div>

              {/* Row 2: Add Custom Item Input (Full Width, never overflows) */}
              <div className="flex items-center gap-2 w-full min-w-0">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomItem()}
                  placeholder="Escribir nombre de objeto o equipo personalizado..."
                  className="w-full min-w-0 flex-1 bg-[#fcf6ea] border border-[#b89b6a] rounded-lg px-3 py-2 text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b] shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddCustomItem()}
                  className="px-3.5 py-2 bg-[#8c672b] hover:bg-[#73521e] text-white rounded-lg text-xs font-fantasy font-bold shadow-xs transition cursor-pointer shrink-0 flex items-center justify-center gap-1"
                  title="Añadir a inventario"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Añadir</span>
                </button>
              </div>

              {/* Items List with Equip / Unequip Buttons */}
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {customItems.length === 0 ? (
                  <div className="p-4 bg-[#fcf6ea]/70 rounded-lg border border-dashed border-[#b89b6a] text-center text-xs text-[#786450]">
                    El inventario está vacío. Añade objetos o armas del compendio arriba.
                  </div>
                ) : (
                  customItems.map((item, idx) => {
                    const isEquipped = equippedItems.includes(item);
                    const armor = findArmorByName(item);
                    const isShield = armor?.category === 'shield' || item.toLowerCase().includes('escudo');
                    const weapon = findWeaponByName(item);
                    const equipable = isItemEquipable(item);

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDetailItem(item)}
                        className={`p-2.5 sm:p-3 rounded-xl border transition flex flex-col gap-2 cursor-pointer group hover:border-[#8c672b] hover:shadow-xs ${
                          isEquipped
                            ? 'bg-gradient-to-r from-[#faecd4] to-[#fbf1e3] border-[#b88c32] shadow-2xs'
                            : 'bg-[#f5ede0]/85 border-[#cbb28c]'
                        }`}
                        title="Clic para ver detalles completos del objeto"
                      >
                        {/* Top Subrow: Badge + Full Item Name (Never truncated) + Actions */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {/* Forged Equipment Badge */}
                            <EquipmentBadge name={item} size="md" />

                            <div className="min-w-0 flex-1">
                              <span className={`text-xs font-fantasy font-bold block leading-snug break-words ${isEquipped ? 'text-[#2c1d0d]' : 'text-[#382b20]'}`}>
                                {item}
                              </span>
                              {weapon?.nameEn && weapon.nameEn.toLowerCase() !== item.toLowerCase() && (
                                <span className="text-[10px] text-[#8c735d] italic block leading-none mt-0.5">
                                  {weapon.nameEn}
                                </span>
                              )}
                              {armor?.nameEn && armor.nameEn.toLowerCase() !== item.toLowerCase() && (
                                <span className="text-[10px] text-[#8c735d] italic block leading-none mt-0.5">
                                  {armor.nameEn}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right action buttons: Equip pill + Trash */}
                          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {equipable ? (
                              <button
                                type="button"
                                onClick={() => handleToggleEquipItem(item)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer border ${
                                  isEquipped
                                    ? 'bg-gradient-to-r from-[#5c3d1e] to-[#8c672b] text-[#fff6e0] border-[#d4ab59] hover:from-[#4a3016] hover:to-[#73521e] shadow-xs'
                                    : 'bg-[#fcf6ea] text-[#4a361c] border-[#b89b6a] hover:bg-[#ebdcc4]'
                                }`}
                                title={isEquipped ? 'Desequipar objeto' : 'Equipar objeto'}
                              >
                                {isEquipped ? <Check className="w-3 h-3 text-[#ffd56b]" /> : <Shield className="w-3 h-3 text-[#8c672b]" />}
                                <span>{isEquipped ? 'Equipado' : 'Equipar'}</span>
                              </button>
                            ) : isEquipped ? (
                              <button
                                type="button"
                                onClick={() => handleToggleEquipItem(item)}
                                className="px-2.5 py-1 rounded-md text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer border bg-[#8c2e28] text-white border-[#70231e]"
                                title="Desequipar objeto"
                              >
                                <span>Desequipar</span>
                              </button>
                            ) : null}

                            <button
                              type="button"
                              onClick={() => handleRemoveCustomItem(idx)}
                              className="text-[#9c8975] hover:text-[#a8423d] p-1 rounded transition cursor-pointer hover:bg-[#faeae6]"
                              title="Eliminar del inventario"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Subrow: Specs tags (Damage/AC chip, weight, properties) + Click hint */}
                        <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-[#e2d5c3] text-[10.5px]">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {armor && !isShield && (
                              <span className="bg-[#3a2816] text-[#f3dfb1] border border-[#8c672b] px-2 py-0.2 rounded font-mono font-bold">
                                🛡️ CA {armor.baseAc}
                              </span>
                            )}
                            {isShield && (
                              <span className="bg-[#3a2816] text-[#f3dfb1] border border-[#8c672b] px-2 py-0.2 rounded font-mono font-bold">
                                🛡️ +{armor?.category === 'shield' ? armor.baseAc : 2} CA
                              </span>
                            )}
                            {weapon && (
                              <span className="bg-[#ebdcc4] text-[#4a361c] border border-[#b89b6a] px-2 py-0.2 rounded font-mono font-bold">
                                ⚔️ {weapon.damageDice} {weapon.damageType}
                              </span>
                            )}
                            {weapon?.weight && (
                              <span className="text-[#786450] font-mono">
                                ⚖️ {weapon.weight}
                              </span>
                            )}
                            {armor?.weight && (
                              <span className="text-[#786450] font-mono">
                                ⚖️ {armor.weight}
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] text-[#8c672b] font-medium group-hover:underline flex items-center gap-0.5 shrink-0">
                            Ver detalles →
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 8. ROLEPLAY, VIRTUES, IDEALS, BONDS, FLAWS
      // ----------------------------------------------------------------------
      case 'roleplay':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-4">
            {renderScrollSectionHeader(
              null,
              'Identidad, Rol & Convicciones',
              `Alineamiento: ${charData.alignment || 'Neutral'}`
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Personality Traits / Virtues */}
              <div className="p-3 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] space-y-1 shadow-2xs">
                <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                  <span>🎭</span> Rasgos de Personalidad & Virtudes
                </span>
                <p className="text-xs text-[#5e4e3e] italic whitespace-pre-line leading-relaxed">
                  {charData.personalityTraits || 'Sin rasgos definidos.'}
                </p>
              </div>

              {/* Ideals */}
              <div className="p-3 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] space-y-1 shadow-2xs">
                <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                  <span>⚖️</span> Ideales & Convicciones Morales
                </span>
                <p className="text-xs text-[#5e4e3e] italic whitespace-pre-line leading-relaxed">
                  {charData.ideals || 'Sin ideales definidos.'}
                </p>
              </div>

              {/* Bonds */}
              <div className="p-3 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] space-y-1 shadow-2xs">
                <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                  <span>🔗</span> Vínculos & Lazos de Vida
                </span>
                <p className="text-xs text-[#5e4e3e] italic whitespace-pre-line leading-relaxed">
                  {charData.bonds || 'Sin vínculos definidos.'}
                </p>
              </div>

              {/* Flaws */}
              <div className="p-3 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] space-y-1 shadow-2xs">
                <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                  <span>⚠️</span> Defectos, Debilidades & Tentaciones
                </span>
                <p className="text-xs text-[#5e4e3e] italic whitespace-pre-line leading-relaxed">
                  {charData.flaws || 'Sin defectos definidos.'}
                </p>
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 9. BACKSTORY (ORIGIN, MENTORS, MOTIVATIONS)
      // ----------------------------------------------------------------------
      case 'backstory':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-3">
            {renderScrollSectionHeader(
              null,
              'Historia & Pasado del Héroe',
              'Orígenes, mentores y motivaciones para la aventura.'
            )}

            <div className="p-3.5 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] text-xs text-[#4a361c] leading-relaxed whitespace-pre-line italic shadow-2xs">
              {charData.backstory || 'No se ha redactado todavía la historia del personaje.'}
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 10. PASSIVE SENSES & PROFICIENCIES (WITH MINTED 3D BRONZE MEDALLIONS)
      // ----------------------------------------------------------------------
      case 'senses':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-3">
            {renderScrollSectionHeader(
              null,
              'Sentidos & Competencias',
              'Percepción pasiva, idiomas y entrenamiento táctico.'
            )}

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f5ede0]/85 rounded-xl p-2 border border-[#b89b6a] flex flex-col items-center justify-between min-w-0 shadow-2xs" title="Percepción Pasiva (10 + Sabiduría + Competencia si aplica)">
                <div className="w-full text-center">
                  <span className="text-[9px] sm:text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-tight block truncate">
                    Percepción
                  </span>
                  <span className="text-[8px] font-sans font-semibold text-[#785e3c] uppercase tracking-wider block">
                    Pasiva
                  </span>
                </div>
                <div className="relative w-13 h-13 mt-1 flex items-center justify-center">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)] leading-none">
                    {charData.passivePerception}
                  </span>
                </div>
              </div>

              <div className="bg-[#f5ede0]/85 rounded-xl p-2 border border-[#b89b6a] flex flex-col items-center justify-between min-w-0 shadow-2xs" title="Investigación Pasiva (10 + Inteligencia + Competencia si aplica)">
                <div className="w-full text-center">
                  <span className="text-[9px] sm:text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-tight block truncate">
                    Investigación
                  </span>
                  <span className="text-[8px] font-sans font-semibold text-[#785e3c] uppercase tracking-wider block">
                    Pasiva
                  </span>
                </div>
                <div className="relative w-13 h-13 mt-1 flex items-center justify-center">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)] leading-none">
                    {10 +
                      getMod(charData.stats.int) +
                      ((charData.skills || []).includes('Investigación') ? profBonus : 0)}
                  </span>
                </div>
              </div>

              <div className="bg-[#f5ede0]/85 rounded-xl p-2 border border-[#b89b6a] flex flex-col items-center justify-between min-w-0 shadow-2xs" title="Perspicacia Pasiva (10 + Sabiduría + Competencia si aplica)">
                <div className="w-full text-center">
                  <span className="text-[9px] sm:text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-tight block truncate">
                    Perspicacia
                  </span>
                  <span className="text-[8px] font-sans font-semibold text-[#785e3c] uppercase tracking-wider block">
                    Pasiva
                  </span>
                </div>
                <div className="relative w-13 h-13 mt-1 flex items-center justify-center">
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.55)]"
                  />
                  <span className="relative z-10 text-base font-bold font-mono text-[#fff6e0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)] leading-none">
                    {10 +
                      getMod(charData.stats.wis) +
                      ((charData.skills || []).includes('Perspicacia') ? profBonus : 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#f5ede0]/85 rounded-xl p-3 border border-[#b89b6a] space-y-1.5 text-xs">
              <div>
                <strong className="text-[#8c672b] font-fantasy">Armaduras:</strong>{' '}
                <span className="text-[#4a361c]">
                  {(classObj.armorProficiencies || []).join(', ') || 'Ninguna'}
                </span>
              </div>
              <div>
                <strong className="text-[#8c672b] font-fantasy">Armas:</strong>{' '}
                <span className="text-[#4a361c]">
                  {(classObj.weaponProficiencies || []).join(', ') || 'Simples'}
                </span>
              </div>
              <div>
                <strong className="text-[#8c672b] font-fantasy">Idiomas:</strong>{' '}
                <span className="text-[#4a361c]">
                  {(raceObj.languages || ['Común']).join(', ')}
                </span>
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------------------------
      // 11. NOTES & CAMPAIGN DIARY
      // ----------------------------------------------------------------------
      case 'notes':
        return (
          <div className="bg-[#fcf9f2] rounded-2xl border-2 border-[#d8c8af] p-4 sm:p-5 shadow-sm space-y-3">
            {renderScrollSectionHeader(
              null,
              'Diario & Notas Libres',
              'Anotaciones tácticas, secretos de sesión y pistas.',
              renderHeaderSmallButton({
                onClick: () => {
                  if (isEditingNotes) {
                    handleSaveNotes();
                  } else {
                    setIsEditingNotes(true);
                  }
                },
                label: isEditingNotes ? 'Guardar' : 'Editar',
                active: isEditingNotes,
                icon: isEditingNotes ? (
                  <Save className="w-3 h-3 text-[#ffd56b]" />
                ) : (
                  <Edit2 className="w-3 h-3 text-[#d4ab59]" />
                ),
                title: isEditingNotes ? 'Guardar notas en la hoja' : 'Editar apuntes de sesión',
              })
            )}

            {isEditingNotes ? (
              <textarea
                rows={6}
                value={playerNotes}
                onChange={(e) => setPlayerNotes(e.target.value)}
                placeholder="Escribe notas de la campaña aquí..."
                className="w-full bg-[#fcf6ea] border border-[#b89b6a] rounded-xl p-3 text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b] shadow-inner font-serif leading-relaxed"
              />
            ) : (
              <div className="p-3.5 bg-[#f5ede0]/85 rounded-xl border border-[#b89b6a] text-xs text-[#4a361c] leading-relaxed whitespace-pre-line shadow-2xs min-h-[80px]">
                {charData.notes || 'No hay notas registradas. Haz clic en "Editar" para añadir apuntes.'}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // --------------------------------------------------------------------------
  // LAYOUT ENGINE: RENDERING MODULES ACCORDING TO USER'S CONFIGURATION
  // --------------------------------------------------------------------------
  const enabledModules = useMemo(() => {
    return modules.filter((m) => m.enabled);
  }, [modules]);

  const renderContentByLayout = () => {
    // ------------------------------------------------------------------------
    // MODE 1: TACTICAL 3-COLUMN LAYOUT (BALDUR'S GATE / OFFICIAL 5E DESKTOP)
    // ------------------------------------------------------------------------
    if (layoutMode === 'tactical') {
      const leftModules = enabledModules.filter((m) => m.columnZone === 'left');
      const centerModules = enabledModules.filter((m) => m.columnZone === 'center');
      const rightModules = enabledModules.filter((m) => m.columnZone === 'right');

      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3">
          {/* Left Column (Stats, Saves, Skills, Senses) */}
          <div className="md:col-span-3 space-y-2.5">
            {leftModules.map((m) => (
              <div key={m.id} className="relative group/mod">
                {renderWidget(m.id)}
              </div>
            ))}
          </div>

          {/* Center Column (Vital Combat, Attacks, Spells) */}
          <div className="md:col-span-5 space-y-2.5">
            {centerModules.map((m) => (
              <div key={m.id} className="relative group/mod">
                {renderWidget(m.id)}
              </div>
            ))}
          </div>

          {/* Right Column (Features, Equipment, Roleplay, Backstory, Notes) */}
          <div className="md:col-span-4 space-y-2.5">
            {rightModules.map((m) => (
              <div key={m.id} className="relative group/mod">
                {renderWidget(m.id)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // MODE 2: CUSTOM MODULAR GRID (2 COLUMNS FLUID REORDERABLE)
    // ------------------------------------------------------------------------
    if (layoutMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {enabledModules.map((m) => {
            const isFull = m.colSpan === 2;
            return (
              <div
                key={m.id}
                className={isFull ? 'md:col-span-2' : 'md:col-span-1'}
              >
                {renderWidget(m.id)}
              </div>
            );
          })}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // MODE 3: THEMED TABS (SUPER CLEAN, FOCUSED)
    // ------------------------------------------------------------------------
    if (layoutMode === 'tabs') {
      return (
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#d8c8af]">
            {enabledModules.map((m) => {
              const isCurrent = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#8c672b] text-white shadow-sm'
                      : 'bg-[#f5ede0] text-[#6b5844] hover:bg-[#ede1ce]'
                  }`}
                >
                  <span>{m.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab View */}
          <div className="max-w-4xl mx-auto">{renderWidget(activeTab)}</div>
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // MODE 4: SINGLE VERTICAL FLOW (MOBILE / NARROW)
    // ------------------------------------------------------------------------
    return (
      <div className="max-w-3xl mx-auto space-y-5">
        {enabledModules.map((m) => (
          <div key={m.id}>{renderWidget(m.id)}</div>
        ))}
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // MYSTIC SCROLL PHYSICS: LIVE ROLLING & UNROLLING ON SCROLL
  // --------------------------------------------------------------------------
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUnrolled, setIsUnrolled] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsUnrolled(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleScrollPapyrus = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const currentTop = el.scrollTop;
    const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight);
    setScrollTop(currentTop);
    setScrollProgress(Math.min(1, Math.max(0, currentTop / maxScroll)));
  };

  // Dynamic cylinder thickness as papyrus winds onto the top roller and unspools from the bottom roller
  const topRollerScaleY = 0.90 + scrollProgress * 0.22;
  const bottomRollerScaleY = 1.12 - scrollProgress * 0.22;

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 flex items-center justify-center p-0 sm:p-0.5 bg-black/90 backdrop-blur-md animate-fadeIn font-serif text-[#2c241b]">
      {/* OUTER MYSTIC SCROLL ASSEMBLY (Top Roller + Papyrus Sheet + Bottom Roller) */}
      <div
        className={`relative w-full max-w-[1550px] flex flex-col items-center transition-all duration-500 ease-out py-0.5 ${
          isUnrolled ? 'h-[99vh] opacity-100' : 'h-[20vh] opacity-0'
        }`}
      >
        {/* ====================================================================
            TOP MYSTIC METAL-CAPPED SCROLL ROLLER
            ==================================================================== */}
        <div className="relative w-full flex items-center justify-center z-30 pointer-events-none select-none shrink-0 -mb-3 sm:-mb-4">
          {/* Left Forged Metal & Amber Gem Finial */}
          <img
            src="/assets/ui/scroll_roller_left.png"
            alt=""
            draggable={false}
            className="h-9 sm:h-11 md:h-13 w-auto object-contain shrink-0 drop-shadow-[0_12px_18px_rgba(0,0,0,0.9)]"
          />

          {/* Center Coiled Papyrus Cylinder (Thickens as you scroll down) */}
          <div
            className="h-9 sm:h-11 md:h-13 flex-1 -mx-1.5 bg-no-repeat transition-transform duration-75 ease-out origin-center"
            style={{
              backgroundImage: 'url(/assets/ui/scroll_roller_center.png)',
              backgroundSize: '100% 100%',
              transform: `scaleY(${topRollerScaleY.toFixed(3)})`,
              filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.85))',
            }}
          />

          {/* Right Forged Metal & Amber Gem Finial */}
          <img
            src="/assets/ui/scroll_roller_right.png"
            alt=""
            draggable={false}
            className="h-9 sm:h-11 md:h-13 w-auto object-contain shrink-0 drop-shadow-[0_12px_18px_rgba(0,0,0,0.9)]"
          />

          {/* Interactive Close Button Mounted on Top-Right Collar */}
          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto absolute right-6 sm:right-14 md:right-20 top-1/2 -translate-y-1/2 z-50 p-1.5 sm:p-2 bg-[#1c130b]/95 hover:bg-[#8c2e28] text-[#e8d096] hover:text-white rounded-full border-2 border-[#d4ab59] shadow-[0_0_16px_rgba(0,0,0,0.9)] transition cursor-pointer active:scale-95 group"
            title="Cerrar Pergamino de Personaje"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c869] group-hover:text-white transition" />
          </button>
        </div>

        {/* ====================================================================
            UNROLLED PAPYRUS SHEET BODY (Fits between the forged bronze collars)
            ==================================================================== */}
        <div
          className="relative w-[calc(100%-1.2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4.5rem)] flex-1 flex flex-col overflow-hidden z-20 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
          style={{
            backgroundImage: 'url(/assets/ui/scroll_papyrus_tile.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            // Synchronize papyrus texture and notched side edges with vertical scroll so it physically winds into the rollers!
            backgroundPosition: `center -${Math.round(scrollTop * 0.92)}px`,
          }}
        >
          {/* 3D Cylindrical Roll Shadow Mouth (Top Lip under the upper roller) */}
          <div
            className="pointer-events-none absolute top-0 inset-x-0 h-6 z-30"
            style={{
              background:
                'linear-gradient(180deg, rgba(16,10,5,0.88) 0%, rgba(44,28,12,0.42) 45%, rgba(44,28,12,0) 100%)',
            }}
          />

          {/* COMPACT 3-SLICE CHARACTER HEADER PLAQUE (Zero Stretched Pixels + No Avatar in Top Bar) */}
          <div className="relative z-30 mx-2 sm:mx-4 md:mx-6 mt-1.5 min-h-[44px] flex items-stretch shrink-0 text-[#f7f2ea] drop-shadow-[0_6px_16px_rgba(24,14,6,0.55)]">
            {/* Seamless Non-Stretching 3-Slice Forged Bronze Background Layer */}
            <div className="absolute inset-0 flex items-stretch pointer-events-none z-0 overflow-hidden rounded-lg">
              <img
                src="/assets/ui/sheet_header_left.png"
                alt=""
                draggable={false}
                style={{ aspectRatio: '142 / 228' }}
                className="h-full w-auto object-fill shrink-0 select-none"
              />
              <div
                className="flex-1 h-full bg-no-repeat -mx-[1px]"
                style={{
                  backgroundImage: 'url(/assets/ui/sheet_header_center.png)',
                  backgroundSize: '100% 100%',
                }}
              />
              <img
                src="/assets/ui/sheet_header_right.png"
                alt=""
                draggable={false}
                style={{ aspectRatio: '142 / 228' }}
                className="h-full w-auto object-fill shrink-0 select-none"
              />
            </div>

            {/* Foreground Content Layer */}
            <div className="relative z-10 w-full py-1.5 px-5 sm:px-7 flex flex-wrap items-center justify-between gap-2.5">
              {/* Left: Compact Character Identity (Without Avatar, With Forged Level Crest) */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="relative w-10 h-10 shrink-0 flex flex-col items-center justify-center select-none"
                  title={`Nivel ${charData.level}`}
                >
                  <img
                    src="/assets/ui/coin_stat_medallion.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  />
                  <span className="relative z-10 text-[7px] font-fantasy font-bold uppercase text-[#e0b861] leading-none">
                    NIV
                  </span>
                  <span className="relative z-10 text-xs font-mono font-bold text-[#fff6e0] leading-none">
                    {charData.level}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-bold font-fantasy text-[#f5e3b8] tracking-wider uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] truncate">
                      {charData.name}
                    </h2>
                    <span className="text-[9.5px] bg-[#160f09]/90 text-[#e0b861] px-1.5 py-0.2 rounded border border-[#8c672b] font-mono shrink-0">
                      {charData.alignment || 'Neutral'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#cbb695] italic truncate max-w-md lg:max-w-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {charData.race} {charData.subrace ? `(${charData.subrace})` : ''} •{' '}
                    {charData.class} {charData.subclass ? `(${charData.subclass})` : ''} •{' '}
                    {charData.background || 'Aventurero'}
                    {charData.playerName ? ` • Jugador: ${charData.playerName}` : ''}
                  </p>
                </div>
              </div>

              {/* Right: Compact Forged-Bronze Icon Buttons with Instant Hover Tooltips */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {[
                  {
                    id: 'dice',
                    onClick: () => rollD20('Tirada Libre de d20', 0, 'normal'),
                    icon: <Dices className="w-4 h-4 text-[#ffd56b]" />,
                    label: 'Tirar Dado d20 Libre',
                    desc: 'Lanza 1d20 rápido en cualquier momento',
                  },
                  {
                    id: 'short-rest',
                    onClick: handleShortRest,
                    icon: <Coffee className="w-4 h-4 text-[#e8c37d]" />,
                    label: 'Descanso Corto',
                    desc: 'Recupera PG usando Dados de Golpe y recursos cortos',
                  },
                  {
                    id: 'long-rest',
                    onClick: handleLongRest,
                    icon: <Moon className="w-4 h-4 text-[#9cd69c]" />,
                    label: 'Descanso Largo',
                    desc: 'Restaura toda la salud, dados de golpe y ranuras mágicas',
                  },
                  {
                    id: 'level-up',
                    onClick: () => setIsLevelUpOpen(true),
                    icon: <ArrowUp className="w-4 h-4 text-[#6ee7b7]" />,
                    label: 'Subir de Nivel',
                    desc: `Ascender a Nivel ${(charData.level || 1) + 1} y elegir mejoras`,
                  },
                  {
                    id: 'export-pdf',
                    onClick: handleExportPdf,
                    disabled: isExportingPdf,
                    icon: <FileDown className="w-4 h-4 text-[#93c5fd]" />,
                    label: isExportingPdf ? 'Exportando PDF...' : 'Exportar a Hoja Oficial (PDF)',
                    desc: 'Descarga el PDF oficial de 3 páginas rellenado',
                  },
                  {
                    id: 'customize',
                    onClick: () => setIsCustomizeDrawerOpen(true),
                    icon: <Sliders className="w-4 h-4 text-[#f5d076]" />,
                    label: 'Personalizar Hoja',
                    desc: 'Activa/desactiva módulos (incluido el Retrato) y cambia la vista',
                  },
                  ...(onEditInCreator
                    ? [
                        {
                          id: 'edit-creator',
                          onClick: () => onEditInCreator(charData),
                          icon: <Sparkles className="w-4 h-4 text-[#fbbf24]" />,
                          label: 'Editar Construcción en Creador',
                          desc: 'Modificar raza, clase, dotes, atributos o conjuros paso a paso',
                        },
                      ]
                    : []),
                ].map((btn) => (
                  <div key={btn.id} className="relative group/ibtn">
                    <button
                      type="button"
                      onClick={btn.onClick}
                      disabled={btn.disabled}
                      title={`${btn.label}: ${btn.desc}`}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-no-repeat transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-50 drop-shadow-[0_3px_6px_rgba(0,0,0,0.85)]"
                      style={{
                        backgroundImage: 'url(/assets/ui/sheet_icon_btn.png)',
                        backgroundSize: '100% 100%',
                      }}
                    >
                      {btn.icon}
                    </button>

                    {/* Fantasy Hover Tooltip */}
                    <div className="pointer-events-none absolute right-0 top-full mt-1.5 z-50 opacity-0 translate-y-1 group-hover/ibtn:opacity-100 group-hover/ibtn:translate-y-0 transition-all duration-150 bg-[#160f09]/98 text-[#f5e3b8] border border-[#c59b27] rounded-lg px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.95)] whitespace-nowrap text-right">
                      <div className="font-fantasy font-bold text-[11px] text-[#ffd56b] tracking-wide">
                        {btn.label}
                      </div>
                      <div className="font-serif text-[9.5px] text-[#cbb695]">
                        {btn.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN SCROLLABLE PAPYRUS CONTENT AREA (With Medieval Parchment Theme Overrides for all Subcards) */}
          <div
            onScroll={handleScrollPapyrus}
            className="flex-1 overflow-y-auto px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 bg-transparent [&_.bg-\[\#fcf9f2\]]:bg-[#f3e6cc]/78 [&_.bg-\[\#fcf9f2\]]:backdrop-blur-[1px] [&_.bg-\[\#fcf9f2\]]:border-[#b59461] [&_.bg-\[\#fcf9f2\]]:shadow-[inset_0_1px_0_rgba(255,250,238,0.6),0_4px_14px_rgba(38,24,10,0.14)] [&_.bg-white]:!bg-[#fbf4e4]/90 [&_[class*='bg-blue-50']]:!bg-[#efe2c6]/90 [&_[class*='border-blue-']]:!border-[#b88c32] [&_[class*='text-blue-']]:!text-[#4a3219] [&_[class*='bg-blue-600']]:!bg-[#3a2816] [&_[class*='bg-blue-600']]:!text-[#f3dfb1] [&_[class*='bg-purple-600']]:!bg-[#5c3d1e] [&_[class*='bg-purple-600']]:!text-[#fff6e0] [&_[class*='bg-purple-50']]:!bg-[#f3e6cc]/90 [&_[class*='border-purple-']]:!border-[#b88c32] [&_[class*='text-purple-']]:!text-[#4a3219] [&_[class*='bg-indigo-50']]:!bg-[#efe2c6]/90 [&_[class*='border-indigo-']]:!border-[#b88c32] [&_[class*='text-indigo-']]:!text-[#4a3219] [&_[class*='bg-emerald-50']]:!bg-[#efe2c6]/90 [&_[class*='border-emerald-']]:!border-[#8c672b]"
          >
            {renderContentByLayout()}
          </div>

          {/* 3D Cylindrical Roll Shadow Mouth (Bottom Lip curving into the lower roller) */}
          <div
            className="pointer-events-none absolute bottom-0 inset-x-0 h-7 z-30"
            style={{
              background:
                'linear-gradient(0deg, rgba(16,10,5,0.92) 0%, rgba(44,28,12,0.45) 45%, rgba(44,28,12,0) 100%)',
            }}
          />
        </div>

        {/* ====================================================================
            BOTTOM MYSTIC METAL-CAPPED SCROLL ROLLER (Aligned on origin-center)
            ==================================================================== */}
        <div className="relative w-full flex items-center justify-center z-30 pointer-events-none select-none shrink-0 -mt-3 sm:-mt-4">
          {/* Left Forged Metal & Amber Gem Finial */}
          <img
            src="/assets/ui/scroll_roller_left.png"
            alt=""
            draggable={false}
            className="h-9 sm:h-11 md:h-13 w-auto object-contain shrink-0 scale-y-[-1] drop-shadow-[0_-10px_18px_rgba(0,0,0,0.9)]"
          />

          {/* Center Coiled Papyrus Cylinder (Aligned with left & right finials using origin-center) */}
          <div
            className="h-9 sm:h-11 md:h-13 flex-1 -mx-1.5 bg-no-repeat transition-transform duration-75 ease-out origin-center"
            style={{
              backgroundImage: 'url(/assets/ui/scroll_roller_center.png)',
              backgroundSize: '100% 100%',
              transform: `scaleY(-${bottomRollerScaleY.toFixed(3)})`,
              filter: 'drop-shadow(0 -10px 16px rgba(0,0,0,0.85))',
            }}
          />

          {/* Right Forged Metal & Amber Gem Finial */}
          <img
            src="/assets/ui/scroll_roller_right.png"
            alt=""
            draggable={false}
            className="h-9 sm:h-11 md:h-13 w-auto object-contain shrink-0 scale-y-[-1] drop-shadow-[0_-10px_18px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* CUSTOMIZE DRAWER / MODAL */}
        {isCustomizeDrawerOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3] text-[#2c221a]">
              {/* Drawer Header */}
              <div className="p-4 px-6 bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea]">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-[#c59b27]" />
                  <div>
                    <h3 className="font-fantasy font-bold text-base text-[#f7f2ea] uppercase tracking-wide">
                      Acomodar & Personalizar Mi Hoja
                    </h3>
                    <p className="text-[11px] text-[#baa892]">
                      Elige qué información ver, el orden de los bloques y el estilo de pantalla.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCustomizeDrawerOpen(false)}
                  className="p-1.5 bg-[#1c150e] hover:bg-[#8c2e28] text-[#baa892] hover:text-white rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* 1. Layout Mode Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase">
                    1. Estilo de Distribución de Pantalla
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      {
                        id: 'tactical',
                        label: 'Mesa Táctica',
                        desc: '3 Columnas (Clásico)',
                      },
                      {
                        id: 'grid',
                        label: 'Cuadrícula Libre',
                        desc: '2 Columnas reordenables',
                      },
                      {
                        id: 'tabs',
                        label: 'Pestañas',
                        desc: 'Navegación enfocada',
                      },
                      {
                        id: 'single',
                        label: 'Flujo 1 Columna',
                        desc: 'Vertical para móviles',
                      },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          setLayoutMode(mode.id as SheetLayoutMode);
                          saveLayoutPreferences(modules, mode.id as SheetLayoutMode, density);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                          layoutMode === mode.id
                            ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c221a] shadow-xs'
                            : 'bg-[#f5ede0] border-[#d8c8af] text-[#6b5844] hover:border-[#8c672b]'
                        }`}
                      >
                        <div className="font-fantasy font-bold text-xs">
                          {mode.label}
                        </div>
                        <div className="text-[10px] text-[#786450] mt-0.5">
                          {mode.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Modules list with toggles and reordering */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase">
                      2. Módulos & Orden de los Bloques
                    </label>
                    <button
                      type="button"
                      onClick={handleResetLayout}
                      className="text-[11px] text-[#8c672b] hover:text-[#5e4114] underline font-fantasy flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Restablecer Predeterminado
                    </button>
                  </div>
                  <p className="text-[11px] text-[#786450]">
                    Usa las flechas ▲ y ▼ para mover los bloques de lugar según cómo prefieras ver tu ficha de juego.
                  </p>

                  <div className="space-y-2 pt-1">
                    {modules.map((m, index) => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                          m.enabled
                            ? 'bg-[#f5ede0] border-[#d8c8af]'
                            : 'bg-[#faf6ee] border-[#e8ded0] opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Toggle visibility */}
                          <input
                            type="checkbox"
                            checked={m.enabled}
                            onChange={() => handleToggleModule(m.id)}
                            className="w-4 h-4 accent-[#8c672b] cursor-pointer"
                          />
                          <div>
                            <span className="font-fantasy font-bold text-xs text-[#2c221a] block">
                              {m.title}
                            </span>
                            <span className="text-[10px] text-[#786450]">
                              {m.enabled ? 'Visible en la hoja' : 'Oculto'} • Zona: {m.columnZone}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {/* ColSpan toggle for grid mode */}
                          {layoutMode === 'grid' && m.enabled && (
                            <button
                              type="button"
                              onClick={() => handleToggleColSpan(m.id)}
                              className="px-2 py-1 bg-white border border-[#d6c4aa] rounded text-[10px] font-mono text-[#5e4e3e] hover:border-[#8c672b]"
                              title="Alternar entre ancho simple y ancho completo"
                            >
                              {m.colSpan === 2 ? 'Ancho Completo' : 'Medio Ancho'}
                            </button>
                          )}

                          {/* Move Up */}
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveModule(m.id, 'up')}
                            className="p-1.5 bg-white hover:bg-[#ebdcc4] disabled:opacity-30 border border-[#d6c4aa] rounded text-[#4a361c] cursor-pointer"
                            title="Subir bloque"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Move Down */}
                          <button
                            type="button"
                            disabled={index === modules.length - 1}
                            onClick={() => handleMoveModule(m.id, 'down')}
                            className="p-1.5 bg-white hover:bg-[#ebdcc4] disabled:opacity-30 border border-[#d6c4aa] rounded text-[#4a361c] cursor-pointer"
                            title="Bajar bloque"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 px-6 bg-[#f5ede0] border-t border-[#d8c8af] flex items-center justify-between">
                <span className="text-xs text-[#786450] italic">
                  Las preferencias quedan guardadas automáticamente para este personaje.
                </span>
                <button
                  type="button"
                  onClick={() => setIsCustomizeDrawerOpen(false)}
                  className="px-4 py-2 bg-[#8c672b] hover:bg-[#73521e] text-white rounded-lg text-xs font-fantasy font-bold shadow-sm transition cursor-pointer"
                >
                  Listo, Cerrar Panel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE DICE ROLLER POPUP */}
        {diceRoll.isOpen && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3] text-[#2c221a] p-5 text-center space-y-4">
              <button
                type="button"
                onClick={() => setDiceRoll((prev) => ({ ...prev, isOpen: false }))}
                className="absolute top-3 right-3 p-1 text-[#9c8975] hover:text-[#a8423d] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[10px] font-fantasy font-bold text-[#8c672b] uppercase tracking-wider block">
                  Resultado de la Tirada 🎲
                </span>
                <h4 className="font-fantasy font-bold text-base text-[#2c221a] mt-0.5">
                  {diceRoll.title}
                </h4>
              </div>

              {/* Mode switch: Normal, Advantage, Disadvantage */}
              <div className="flex items-center justify-center gap-1 bg-[#f5ede0] p-1 rounded-xl border border-[#d8c8af] text-[11px] font-fantasy font-bold">
                {(['normal', 'advantage', 'disadvantage'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      rollDie(
                        diceRoll.title,
                        diceRoll.bonus,
                        diceRoll.dieType,
                        m,
                        diceRoll.extraFormula
                      )
                    }
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      diceRoll.rollMode === m
                        ? 'bg-[#8c672b] text-white shadow-xs'
                        : 'text-[#6b5844] hover:text-[#2c221a]'
                    }`}
                  >
                    {m === 'normal' ? 'Normal' : m === 'advantage' ? 'Ventaja' : 'Desventaja'}
                  </button>
                ))}
              </div>

              {/* Die Type Switcher */}
              <div className="flex items-center justify-center gap-1 overflow-x-auto pb-0.5">
                {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'] as DieType[]).map((dt) => (
                  <button
                    key={dt}
                    type="button"
                    onClick={() =>
                      rollDie(
                        `Tirada de ${dt.toUpperCase()}`,
                        diceRoll.bonus,
                        dt,
                        diceRoll.rollMode,
                        diceRoll.extraFormula
                      )
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      diceRoll.dieType === dt
                        ? 'bg-[#8c672b] text-white shadow-xs ring-1 ring-[#c59b27]'
                        : 'bg-[#ede1ce] text-[#6b5844] hover:bg-[#dfcfb9]'
                    }`}
                  >
                    {dt.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Big Polyhedral Dice Display */}
              <div className="py-2 space-y-3">
                <div className="flex items-center justify-center gap-4">
                  {diceRoll.rollMode === 'normal' ? (
                    <PolyhedralDie
                      type={diceRoll.dieType}
                      value={diceRoll.finalDie}
                      isRolling={isRollingAnim}
                      isCrit={diceRoll.isCrit}
                      isFumble={diceRoll.isFumble}
                      size="xl"
                    />
                  ) : (
                    <div className="flex items-center gap-4">
                      {/* Die 1 */}
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-[#7a6448] font-mono mb-1">Dado 1</span>
                        <PolyhedralDie
                          type={diceRoll.dieType}
                          value={diceRoll.dice1}
                          isRolling={isRollingAnim}
                          isCrit={diceRoll.dieType === 'd20' && diceRoll.dice1 === 20}
                          isFumble={diceRoll.dieType === 'd20' && diceRoll.dice1 === 1}
                          size="lg"
                          className={diceRoll.dice1 !== diceRoll.finalDie ? 'opacity-40 grayscale' : 'ring-2 ring-[#c59b27] rounded-full'}
                        />
                      </div>

                      {/* Die 2 */}
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-[#7a6448] font-mono mb-1">Dado 2</span>
                        <PolyhedralDie
                          type={diceRoll.dieType}
                          value={diceRoll.dice2}
                          isRolling={isRollingAnim}
                          isCrit={diceRoll.dieType === 'd20' && diceRoll.dice2 === 20}
                          isFumble={diceRoll.dieType === 'd20' && diceRoll.dice2 === 1}
                          size="lg"
                          className={diceRoll.dice2 !== diceRoll.finalDie ? 'opacity-40 grayscale' : 'ring-2 ring-[#c59b27] rounded-full'}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {diceRoll.isCrit && (
                  <div className="text-xs font-fantasy font-bold text-[#b8860b] uppercase tracking-wide flex items-center justify-center gap-1.5 animate-pulse">
                    <span>✨</span> ¡Éxito Crítico Natural (20)! <span>✨</span>
                  </div>
                )}
                {diceRoll.isFumble && (
                  <div className="text-xs font-fantasy font-bold text-[#b91c1c] uppercase tracking-wide flex items-center justify-center gap-1.5 animate-pulse">
                    <span>💀</span> ¡Pifia Crítica Natural (1)! <span>💀</span>
                  </div>
                )}

                {/* Total breakdown */}
                <div className="text-sm font-mono text-[#5e4e3e]">
                  {diceRoll.dieType.toUpperCase()} [{diceRoll.finalDie}] {diceRoll.bonus >= 0 ? `+ ${diceRoll.bonus}` : `- ${Math.abs(diceRoll.bonus)}`} ={' '}
                  <strong className="text-2xl text-[#8c672b] font-bold">
                    {diceRoll.total}
                  </strong>
                </div>

                {/* Extra damage roll if weapon */}
                {diceRoll.damageTotal !== undefined && (
                  <div className="pt-2 border-t border-[#ebdcc7] text-xs font-mono text-[#2c221a]">
                    <span>Daño Estimado ({diceRoll.extraFormula}): </span>
                    <strong className="text-base text-[#a8423d] font-bold">
                      {diceRoll.damageTotal}
                    </strong>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    rollDie(
                      diceRoll.title,
                      diceRoll.bonus,
                      diceRoll.dieType,
                      diceRoll.rollMode,
                      diceRoll.extraFormula
                    )
                  }
                  className="flex-1 py-2 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-xl text-xs font-fantasy font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Volver a Tirar
                </button>
                <button
                  type="button"
                  onClick={() => setDiceRoll((prev) => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2 bg-[#8c672b] hover:bg-[#73521e] text-white rounded-xl text-xs font-fantasy font-bold transition cursor-pointer shadow-xs"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SPELL DETAIL MODAL */}
        {selectedSpellDetail && (
          <SpellDetailModal
            spell={selectedSpellDetail}
            onClose={() => setSelectedSpellDetail(null)}
            isKnown={true}
            onRemoveSpell={() => {
              handleRemoveSpell(selectedSpellDetail.name);
              setSelectedSpellDetail(null);
            }}
          />
        )}

        {/* SPELL PICKER COMPENDIUM MODAL */}
        <SpellPickerModal
          isOpen={isSpellPickerOpen}
          onClose={() => setIsSpellPickerOpen(false)}
          onSelectSpell={(sp: any) => {
            handleAddSpell(sp);
            setIsSpellPickerOpen(false);
          }}
          selectedSpellNames={(charData.spells || []).map((s) => s.name)}
          title="Grimorio: Añadir Conjuro Oficial"
          subtitle="Añade conjuros de linaje racial, dotes, magia innata o entrenamiento especial a tu grimorio."
        />

        {/* LEVEL UP MODAL */}
        {isLevelUpOpen && (
          <LevelUpModal
            character={charData}
            onSave={(updated) => {
              setCharData(updated);
              onUpdateCharacter(updated);
              setIsLevelUpOpen(false);
            }}
            onClose={() => setIsLevelUpOpen(false)}
          />
        )}

        {/* WEAPON PICKER COMPENDIUM MODAL */}
        <WeaponPickerModal
          isOpen={isWeaponPickerOpen}
          onClose={() => setIsWeaponPickerOpen(false)}
          onSelectWeapon={(w) => {
            handleAddCustomItem(w.name);
            handleToggleEquipItem(w.name);
            setIsWeaponPickerOpen(false);
          }}
          filterCategory="all"
          title="Armería: Compendio de Armas"
          subtitle="Selecciona un arma oficial para añadirla directamente a tu inventario y equiparla."
        />

        {/* ARMOR PICKER COMPENDIUM MODAL */}
        <ArmorPickerModal
          isOpen={isArmorPickerOpen}
          onClose={() => setIsArmorPickerOpen(false)}
          onSelectArmor={(armor) => {
            handleAddCustomItem(armor.name);
            handleToggleEquipItem(armor.name);
            setIsArmorPickerOpen(false);
          }}
          filterCategory="all"
          title="Armería: Catálogo de Armaduras y Escudos"
          subtitle="Selecciona una armadura o escudo oficial para añadirlo a tu inventario y equiparlo."
        />

        {/* ITEM DETAIL INSPECTOR MODAL */}
        <ItemDetailModal
          itemName={selectedDetailItem}
          isOpen={!!selectedDetailItem}
          onClose={() => setSelectedDetailItem(null)}
          isEquipped={selectedDetailItem ? equippedItems.includes(selectedDetailItem) : false}
          onToggleEquip={handleToggleEquipItem}
        />

        {/* CANTRIP FORMULAS (TASHA'S CAULDRON - WIZARD LEVEL 3+) MODAL */}
        {isCantripFormulasOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn font-serif text-[#2c241b]">
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#3b6699] bg-[#fbf7ee]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#162e4a] via-[#21436b] to-[#162e4a] border-b-2 border-[#548ec2] p-4 px-6 flex items-center justify-between text-[#f7f2ea] shrink-0 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a89c2] to-[#21436b] flex items-center justify-center shadow-lg border border-[#89bfe8]/50">
                    <Sparkles className="w-6 h-6 text-[#d8efff]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold font-fantasy text-[#f7f2ea] tracking-wider uppercase">
                        Fórmulas de Trucos (Cantrip Formulas)
                      </h2>
                      <span className="text-[10px] bg-[#4a89c2] text-white font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Mago Nv 3+
                      </span>
                    </div>
                    <p className="text-xs text-[#b8daff] italic">
                      Regla oficial opcional de Tasha's Cauldron of Everything
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCantripFormulasOpen(false);
                    setCantripToSwapSheet('');
                    setNewCantripSelectedSheet(null);
                  }}
                  className="p-1.5 text-[#b8daff] hover:text-[#f7f2ea] hover:bg-[#2b5585] rounded-lg transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-5 space-y-4 flex-1">
                <div className="p-3 bg-[#eef6fc] rounded-xl border border-[#b6d6ee] text-xs text-[#1c456b] flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#2b6cb0] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Regla Oficial:</strong> Al finalizar un descanso largo, has consultado las fórmulas arcanas inscritas en tu grimorio. Puedes sustituir 1 truco de mago que conozcas por otro truco de la lista de conjuros de mago.
                  </p>
                </div>

                {/* Step 1: Pick cantrip to replace */}
                <div className="space-y-2">
                  <label className="text-xs font-fantasy font-bold text-[#1a365d] uppercase tracking-wide block">
                    1. Elige el truco actual que deseas olvidar:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(charData.spells || [])
                      .filter((s) => s.level === 0)
                      .map((cantrip) => {
                        const isSelected = cantripToSwapSheet === cantrip.name;
                        return (
                          <div
                            key={cantrip.name}
                            onClick={() => {
                              setCantripToSwapSheet(cantrip.name);
                              if (newCantripSelectedSheet?.name === cantrip.name) {
                                setNewCantripSelectedSheet(null);
                              }
                            }}
                            className={`p-2.5 rounded-xl border-2 transition cursor-pointer text-left ${
                              isSelected
                                ? 'border-[#2b6cb0] bg-[#eef6fc] shadow-xs ring-1 ring-[#2b6cb0]'
                                : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-fantasy font-bold text-[#2c221a]">
                                {cantrip.name}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#2b6cb0]" />}
                            </div>
                            <span className="text-[10px] text-[#786450] block mt-0.5">
                              {cantrip.school} • {cantrip.castingTime}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Step 2: Pick replacement wizard cantrip */}
                <div className="space-y-2">
                  <label className="text-xs font-fantasy font-bold text-[#1a365d] uppercase tracking-wide block">
                    2. Elige el nuevo truco de mago que prepararás en su lugar:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                    {wizardCantripsForSheet
                      .filter((wc) => !(charData.spells || []).some((s) => s.name === wc.name))
                      .map((wc) => {
                        const isSelected = newCantripSelectedSheet?.name === wc.name;
                        return (
                          <div
                            key={wc.name}
                            onClick={() => setNewCantripSelectedSheet(wc)}
                            className={`p-2.5 rounded-xl border-2 transition cursor-pointer text-left ${
                              isSelected
                                ? 'border-[#3e6b48] bg-[#f0f8f2] shadow-xs ring-1 ring-[#3e6b48]'
                                : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-fantasy font-bold text-[#2c221a]">
                                {wc.name}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#3e6b48]" />}
                            </div>
                            <span className="text-[10px] text-[#786450] block mt-0.5">
                              {wc.school} • {wc.castingTime}
                            </span>
                            <p className="text-[10px] text-[#6e5c4a] line-clamp-1 mt-0.5">
                              {wc.description}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 px-6 border-t-2 border-[#d8c8af] bg-[#f5ede0] flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsCantripFormulasOpen(false);
                    setCantripToSwapSheet('');
                    setNewCantripSelectedSheet(null);
                  }}
                  className="px-4 py-2 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#362719] border border-[#cfbe9f] rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleConfirmCantripSwap}
                  disabled={!cantripToSwapSheet || !newCantripSelectedSheet}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#1c456b] via-[#285d8e] to-[#3b7ab5] hover:from-[#214f7b] hover:to-[#4388c7] text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer font-fantasy ring-2 ring-[#548ec2]/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  ¡Confirmar Intercambio de Truco! 🪄
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Exploración y Selección de la Tabla de Magia Salvaje (d100) */}
        {isWildMagicModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-[#fcf8f2] border-2 border-[#ec4899] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 px-6 border-b-2 border-[#fbcfe8] bg-gradient-to-r from-[#831843] via-[#be185d] to-[#db2777] text-white flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-[#fbcfe8]" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-base tracking-wide flex items-center gap-2">
                      Tabla de Sobretensión de Magia Salvaje (Wild Magic Surge)
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-sans font-semibold">
                        d100 Oficial
                      </span>
                    </h3>
                    <p className="text-xs text-[#fce7f3]">
                      50 efectos arcanos oficiales. Puedes realizar una tirada aleatoria o elegir directamente el efecto deseado.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWildMagicModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Toolbar con buscador, filtros y tirada rápida */}
              <div className="p-3 px-6 bg-[#fdf2f8] border-b border-[#fbcfe8] flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                  {/* Buscador */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 text-[#db2777] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={wildMagicSearch}
                      onChange={(e) => setWildMagicSearch(e.target.value)}
                      placeholder="Buscar por efecto, conjuro, rango (ej: bola de fuego, 42, volar)..."
                      className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#f472b6] rounded-xl text-xs text-[#831843] focus:outline-hidden focus:ring-1 focus:ring-[#db2777]"
                    />
                    {wildMagicSearch && (
                      <button
                        type="button"
                        onClick={() => setWildMagicSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9d174d] hover:text-[#831843]"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Filtro por Categoría */}
                  <div className="flex items-center gap-1">
                    {(
                      [
                        { id: 'all', label: 'Todos' },
                        { id: 'beneficial', label: '✨ Beneficiosos' },
                        { id: 'detrimental', label: '⚠️ Perjudiciales' },
                        { id: 'chaotic', label: '🌀 Caóticos' },
                        { id: 'neutral', label: '🔮 Neutros' },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setWildMagicCategoryFilter(f.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          wildMagicCategoryFilter === f.id
                            ? 'bg-[#be185d] text-white shadow-xs'
                            : 'bg-white text-[#9d174d] hover:bg-[#fce7f3] border border-[#fbcfe8]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botón Tirada Rápida desde el Modal */}
                <button
                  type="button"
                  onClick={() => {
                    const sorcLevel = charData.level || 1;
                    if (sorcLevel >= 14) {
                      const res = rollWildMagicSurge(true);
                      setLastRolledSurge(res);
                      setIsWildMagicModalOpen(false);
                    } else {
                      const res = rollWildMagicSurge(false);
                      setLastRolledSurge({ ...res, chosenEntry: res.entry1 });
                      setIsWildMagicModalOpen(false);
                      announceWildMagicSurge(res.entry1, res.roll1);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#be185d] to-[#9d174d] hover:from-[#9d174d] hover:to-[#831843] text-white font-fantasy font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Dices className="w-4 h-4" />
                  {(charData.level || 1) >= 14 ? 'Tirar 2d100 (Caos Controlado)' : 'Tirar 1d100 en la Tabla'}
                </button>
              </div>

              {/* Lista scrolleable de efectos */}
              <div className="p-4 px-6 overflow-y-auto space-y-2.5 flex-1">
                {(() => {
                  const filtered = WILD_MAGIC_SURGE_TABLE.filter((entry) => {
                    const matchCategory =
                      wildMagicCategoryFilter === 'all' || entry.category === wildMagicCategoryFilter;
                    const searchLower = wildMagicSearch.toLowerCase().trim();
                    const matchSearch =
                      !searchLower ||
                      entry.title.toLowerCase().includes(searchLower) ||
                      entry.effect.toLowerCase().includes(searchLower) ||
                      entry.rangeStr.includes(searchLower) ||
                      entry.min.toString() === searchLower ||
                      entry.max.toString() === searchLower;
                    return matchCategory && matchSearch;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="p-8 text-center text-xs text-[#9d174d] italic">
                        No se encontraron efectos de Magia Salvaje que coincidan con la búsqueda "{wildMagicSearch}".
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {filtered.map((entry) => {
                        const isCurrentActive = lastRolledSurge?.chosenEntry?.min === entry.min;
                        const badgeColor = {
                          beneficial: 'bg-[#dcfce7] text-[#166534] border-[#86efac]',
                          detrimental: 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]',
                          chaotic: 'bg-[#f3e8ff] text-[#6b21a8] border-[#d8b4fe]',
                          neutral: 'bg-[#e0f2fe] text-[#075985] border-[#7dd3fc]',
                        }[entry.category];

                        const badgeLabel = {
                          beneficial: 'Beneficioso',
                          detrimental: 'Perjudicial',
                          chaotic: 'Caótico',
                          neutral: 'Neutro',
                        }[entry.category];

                        return (
                          <div
                            key={entry.rangeStr}
                            className={`p-3 rounded-xl border-2 transition flex flex-col justify-between text-left ${
                              isCurrentActive
                                ? 'bg-[#fdf2f8] border-[#db2777] shadow-sm ring-1 ring-[#db2777]'
                                : 'bg-white border-[#fbcfe8] hover:border-[#f472b6]'
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="px-2 py-0.5 bg-[#831843] text-white font-mono font-bold text-xs rounded-md shadow-xs">
                                    {entry.rangeStr}
                                  </span>
                                  <span className="font-fantasy font-bold text-xs text-[#831843]">
                                    {entry.title}
                                  </span>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badgeColor}`}>
                                  {badgeLabel}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#4a361c] leading-relaxed">
                                {entry.effect}
                              </p>
                            </div>

                            <div className="pt-2 mt-2 border-t border-[#fce7f3] flex items-center justify-between">
                              <span className="text-[10px] text-[#9d174d]">
                                Resultado d100: {entry.min} a {entry.max}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setLastRolledSurge({ roll1: entry.min, entry1: entry, chosenEntry: entry });
                                  setIsWildMagicModalOpen(false);
                                  announceWildMagicSurge(entry, entry.min);
                                }}
                                className="px-2.5 py-1 bg-[#be185d] hover:bg-[#9d174d] text-white text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1 shadow-xs"
                              >
                                <Sparkles className="w-3 h-3 text-[#fbcfe8]" />
                                Manifestar este Efecto
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Footer */}
              <div className="p-3 px-6 border-t-2 border-[#fbcfe8] bg-[#fdf2f8] flex items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-[#9d174d]">
                  Mostrando entradas de la tabla oficial de Sobretensión de Magia Salvaje (Manual del Jugador pág. 104)
                </span>
                <button
                  type="button"
                  onClick={() => setIsWildMagicModalOpen(false)}
                  className="px-4 py-1.5 bg-[#ebdcc4] hover:bg-[#dfcfb4] text-[#4a361c] border border-[#cbb99f] rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rest Modal (Hit Dice spending & Virtual/Manual rolls) */}
        <RestModal
          isOpen={isRestModalOpen}
          onClose={() => setIsRestModalOpen(false)}
          character={charData}
          initialRestType={activeRestType}
          onConfirmRest={handleConfirmRest}
        />

        {/* Themed Notification Modal */}
        <ThemedNotificationModal
          isOpen={themedAlert.isOpen}
          onClose={() => setThemedAlert((prev) => ({ ...prev, isOpen: false }))}
          title={themedAlert.title}
          subtitle={themedAlert.subtitle}
          message={themedAlert.message}
          type={themedAlert.type}
          confirmText={themedAlert.confirmText}
          cancelText={themedAlert.cancelText}
          onConfirm={themedAlert.onConfirm}
        />

        {/* Ability & Feature Detail Inspector Modal */}
        {inspectFeatureModal && inspectFeatureModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn font-serif text-[#2c241b]">
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] p-4 px-6 flex items-center justify-between text-[#f7f2ea] shrink-0 shadow-md">
                <div className="flex items-center gap-3 min-w-0 pr-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c672b] to-[#c59b27] flex items-center justify-center shadow-lg border border-[#ffd56b]/40 shrink-0">
                    <BookOpen className="w-5 h-5 text-[#fdfaf3]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-fantasy font-bold text-base text-[#f7f2ea] tracking-wide break-words">
                      {inspectFeatureModal.title}
                    </h3>
                    {inspectFeatureModal.badge && (
                      <span className="text-[10px] bg-[#1c150e] text-[#d4ab59] px-2 py-0.5 rounded border border-[#7a5a2b] font-mono font-bold inline-block mt-0.5">
                        {inspectFeatureModal.badge}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectFeatureModal(null)}
                  className="absolute top-3.5 right-4 p-2 bg-[#1c150e]/90 hover:bg-[#8c2e28] text-[#c0ad97] hover:text-white rounded-xl border border-[#c59b27]/60 shadow-md transition cursor-pointer active:scale-95"
                  title="Cerrar detalles de la habilidad"
                >
                  <X className="w-4 h-4 text-[#d4ab59]" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
                {/* Summary Box */}
                <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-1 shadow-2xs">
                  <div className="font-fantasy font-bold text-xs text-[#5c401b] uppercase tracking-wide flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#8c672b]" />
                    <span>Descripción General</span>
                  </div>
                  <p className="text-[#3d2f21] leading-relaxed text-xs">
                    {inspectFeatureModal.summary}
                  </p>
                </div>

                {/* Mechanics Grid */}
                {inspectFeatureModal.mechanics && inspectFeatureModal.mechanics.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-fantasy font-bold text-xs text-[#4a361c] uppercase tracking-wide block">
                      ⚙️ Parámetros & Mecánicas Clave
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {inspectFeatureModal.mechanics.map((mech, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-[#dfcfb4] flex flex-col gap-1 shadow-2xs"
                        >
                          <span className="text-[#6b5844] font-fantasy font-bold text-[11px] uppercase tracking-wider">
                            {mech.label}
                          </span>
                          <span className="font-mono font-bold text-[#2c221a] text-xs leading-relaxed break-words">
                            {mech.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Rules List */}
                {inspectFeatureModal.rules && inspectFeatureModal.rules.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-fantasy font-bold text-xs text-[#4a361c] uppercase tracking-wide block">
                      📜 Reglas Oficiales & Funcionamiento Detallado
                    </span>
                    <div className="space-y-2">
                      {inspectFeatureModal.rules.map((rule, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#faf6ee] rounded-xl border border-[#e4d4bd] text-[#362719] flex items-start gap-2.5 shadow-2xs leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#ede1ce] text-[#7a5a2b] font-bold font-mono text-[10px] flex items-center justify-center shrink-0 border border-[#cbb99f] mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] text-[#3d2f21]">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tactical Tips */}
                {inspectFeatureModal.tips && inspectFeatureModal.tips.length > 0 && (
                  <div className="p-3.5 bg-gradient-to-r from-[#eff6ff] to-[#f0fdf4] rounded-xl border border-[#93c5fd] space-y-1.5 text-xs text-[#1e3a8a] shadow-2xs">
                    <div className="font-fantasy font-bold text-xs text-[#1d4ed8] uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>Consejos Tácticos & Buenas Prácticas</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-[#334155]">
                      {inspectFeatureModal.tips.map((tip, idx) => (
                        <li key={idx} className="leading-relaxed">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 px-6 bg-[#ebdcc4] border-t border-[#d8c8af] flex items-center justify-between text-xs shrink-0">
                <span className="text-[#6b5844] italic">
                  Compendio y Reglas de Aventurero
                </span>
                <button
                  type="button"
                  onClick={() => setInspectFeatureModal(null)}
                  className="px-4 py-1.5 bg-[#8c672b] hover:bg-[#73521e] text-white font-fantasy font-bold rounded-lg transition cursor-pointer shadow-xs active:scale-95"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rules Inspector Modal (Auditor y Desglose de Reglas Oficiales) */}
        <RulesInspectorModal
          isOpen={rulesInspectorOpen}
          onClose={() => setRulesInspectorOpen(false)}
          character={charData}
          currentAc={currentAc}
          equippedArmor={equippedArmor}
          hasEquippedShield={hasEquippedShield}
          effectiveSpeed={effectiveSpeed}
          profBonus={profBonus}
          initialCategory={rulesInspectorCategory}
        />

        {/* Avatar Lightbox & Fantasy Frame Customizer Modal */}
        <AvatarLightboxModal
          isOpen={isAvatarLightboxOpen}
          onClose={() => setIsAvatarLightboxOpen(false)}
          character={charData}
          onUpdateFrame={handleUpdateAvatarFrame}
          onUpdateAvatar={handleUpdateAvatarUrl}
          onUpdateAvatarAdjustments={handleUpdateAvatarAdjustments}
        />
      </div>
    </div>
  );
};
