import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Character, AbilityScores, CharacterAttack, Spell, AvatarFrameStyle } from '../types';
import {
  WIKIDOT_RACES,
  WIKIDOT_CLASSES,
  WIKIDOT_BACKGROUNDS,
  WIKIDOT_BACKGROUND_CATEGORIES,
  BackgroundCategory,
  BackgroundOrientation,
  WikidotBackground,
  getMaxSpellLevelForClass,
  FULL_CASTER_SLOTS_TABLE,
  HALF_CASTER_SLOTS_TABLE,
  WARLOCK_PACT_SLOTS_TABLE,
  getClassSubclassLevel,
  BackgroundEquipmentChoice,
} from '../data/wikidotData';
import {
  GOTHIC_HORROR_TRINKETS,
  STANDARD_TRINKETS,
  FEYWILD_TRINKETS,
  rollGothicHorrorTrinket,
  rollStandardTrinket,
  rollFeywildTrinket,
} from '../data/dndTrinketsData';
import {
  ALL_5E_SKILLS,
  CLASS_SKILL_CONFIGS,
  FIGHTING_STYLE_OPTIONS,
  ALIGNMENT_OPTIONS,
  ABILITY_SCORE_EXPLANATIONS,
  OfficialFeat,
  OFFICIAL_5E_FEATS,
  getAvailableAsiCount,
  getExpertiseConfig,
} from '../data/characterCreatorData';
import {
  filterSpellsForCharacter,
  isSpellcasterClass,
  getSpellcastingLimits,
  OFFICIAL_SPELLS_COMPENDIUM,
  findSpellByNameOrAlias,
} from '../data/spellsData';
import {
  getClassStartingEquipment,
  ClassStartingEquipment,
  EquipmentOption,
} from '../data/equipmentData';
import {
  getRoleplayOptionsForBackground,
  rollRandomOption,
} from '../data/roleplayData';
import { SpellDetailModal } from './SpellDetailModal';
import { FeatDetailModal } from './FeatDetailModal';
import { ThemedNotificationModal, ThemedModalType } from './ThemedNotificationModal';
import { OFFICIAL_5E_LANGUAGES, formatBackgroundWealth } from '../data/wikidotBackgroundsData';
import { CompendiumInspectModal, CompendiumInspectData } from './CompendiumInspectModal';
import { SubclassPickerModal } from './SubclassPickerModal';
import { WeaponPickerModal } from './WeaponPickerModal';
import { ArmorPickerModal } from './ArmorPickerModal';
import { FantasyAvatarFrame } from './FantasyAvatarFrame';
import { AvatarLightboxModal } from './AvatarLightboxModal';
import { EquipmentBadge } from './EquipmentBadge';
import {
  findWeaponByName,
  findArmorByName,
  generateAttackFromWeapon,
  calculateEquippedAc,
  WeaponDef,
  ALL_5E_WEAPONS,
  isItemEquipable,
} from '../data/weaponsAndArmorData';
import {
  calculateCharacterSpeed,
  generateClassResourcesForCharacter,
} from '../data/characterRulesEngine';
import {
  getAllClassDecisionsForCreation,
  getArtificerSpecialistSpells,
} from '../data/levelUpDecisionsData';
import { PolyhedralDie } from './PolyhedralDie';
import { useUserStore } from '../hooks/useUserStore';
import {
  FeatCard,
  SubraceCard,
  RaceCard,
  ClassCard,
  SubclassCard,
  ClassProgressionCard,
  FightingStyleCard,
  BackgroundCard,
  SpellCardComponent,
} from './CreatorCards';
import {
  User,
  Dices,
  Shield,
  Sparkles,
  BookOpen,
  Sword,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Eye,
  Heart,
  Zap,
  Flame,
  Award,
  Info,
  X,
  Compass,
  Star,
  Languages,
  Plus,
  Trash2,
  Lock,
  Search,
  Filter,
  Package,
  Backpack,
  Coins,
  Maximize2,
  Minimize2,
  ArrowUpDown,
  SlidersHorizontal,
  FileDown,
  Upload,
  AlertTriangle,
  GripVertical,
  Save,
  Scroll,
} from 'lucide-react';
import { exportCharacterToOfficialPdf } from '../utils/pdfCharacterExporter';
import { SkillTooltip } from './SkillTooltip';
import { startCharacterCreatorTutorial, TutorialContext } from '../utils/characterCreatorTutorial';

interface DiceRollResult {
  dice: number[];
  dropped: number;
  total: number;
}

export interface AsiFeatChoice {
  type: 'asi' | 'feat';
  asiType?: '+2' | '+1+1';
  asiStat1?: keyof AbilityScores;
  asiStat2?: keyof AbilityScores;
  featId?: string;
  featAbilityChoice?: keyof AbilityScores;
  featSubChoices?: string[];
}

interface CharacterCreatorModalProps {
  campaignId: string;
  initialCharacter?: Character | null;
  onSave: (char: Character) => void;
  onSaveDraft?: (char: Character) => void;
  onClose: () => void;
}

type CreatorStep =
  | 'identity'
  | 'race'
  | 'background'
  | 'class'
  | 'abilities'
  | 'asi_feats'
  | 'spells'
  | 'equipment'
  | 'review'
  | 'class_features';

interface InitialCreatorState {
  currentStep: CreatorStep;
  characterName: string;
  playerName: string;
  avatarUrl: string;
  alignment: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstoryBrief: string;
  rollMethod: 'roll' | 'manual' | 'standard';
  diceRolls: DiceRollResult[];
  manualRolls: number[];
  assignedStats: Partial<Record<keyof AbilityScores, number>>;
  assignedSourceIndex: Partial<Record<keyof AbilityScores, number>>;
  selectedRaceId: string;
  selectedSubraceId: string;
  flexibleRacialChoices: (keyof AbilityScores)[];
  bonusRacialSkills: string[];
  asiChoices: Record<number, AsiFeatChoice>;
  bonusCampaignFeat: boolean;
  selectedClassId: string;
  selectedSubclassId: string;
  characterLevel: number;
  selectedClassSkills: string[];
  expertiseSkills: string[];
  selectedFightingStyle: string;
  selectedBackgroundId: string;
  selectedBackgroundSkills: string[];
  selectedBackgroundTools: string[];
  selectedBackgroundLanguages: string[];
  backgroundFeatSubChoice?: string;
  selectedBackgroundEquipmentChoices: Record<string, string>;
  selectedEquipmentChoices: Record<string, string>;
  customWeaponChoices?: Record<string, WeaponDef>;
  equippedItems?: string[];
  selectedSpells: Spell[];
  racialSpellcastingAbility?: 'int' | 'wis' | 'cha';
  selectedRacialCantrip?: string;
  classDecisions?: Record<string, string[]>;
}

function getInitialCreatorState(initialChar?: Character | null): InitialCreatorState | null {
  if (!initialChar) return null;
  const cs = initialChar.creatorState || {};

  // Find matching race if selectedRaceId not in creatorState
  let raceId = (cs.selectedRaceId as string) || '';
  let subraceId = (cs.selectedSubraceId as string) || '';
  if (!raceId && initialChar.race) {
    const charRaceLower = initialChar.race.toLowerCase();
    const foundRace = WIKIDOT_RACES.find((r) => {
      const rLower = r.name.toLowerCase();
      return rLower === charRaceLower || charRaceLower.startsWith(rLower) || charRaceLower.includes(rLower) || rLower.includes(charRaceLower);
    });
    if (foundRace) {
      raceId = foundRace.id;
      if (foundRace.subraces && foundRace.subraces.length > 0) {
        const subLower = (initialChar.subrace || '').toLowerCase();
        const foundSub = foundRace.subraces.find((s) => {
          const sLower = s.name.toLowerCase();
          return (
            (subLower && (sLower === subLower || subLower.includes(sLower) || sLower.includes(subLower))) ||
            charRaceLower.includes(sLower)
          );
        });
        if (foundSub) subraceId = foundSub.id;
      }
    }
  }

  // Find matching class if selectedClassId not in creatorState
  let classId = (cs.selectedClassId as string) || '';
  let subclassId = (cs.selectedSubclassId as string) || '';
  if (!classId && initialChar.class) {
    const charClassLower = initialChar.class.toLowerCase();
    const foundClass = WIKIDOT_CLASSES.find((c) => {
      const cLower = c.name.toLowerCase();
      const cNameOnly = cLower.split('(')[0].trim();
      return (
        cLower === charClassLower ||
        charClassLower.startsWith(cNameOnly) ||
        charClassLower.includes(cNameOnly) ||
        cNameOnly.includes(charClassLower)
      );
    });
    if (foundClass) {
      classId = foundClass.id;
      if (foundClass.subclasses && foundClass.subclasses.length > 0) {
        const scLower = (initialChar.subclass || '').toLowerCase();
        const foundSub = foundClass.subclasses.find((s) => {
          const sLower = s.name.toLowerCase();
          const sNameOnly = sLower.split('(')[0].trim();
          return (
            (scLower && (sLower === scLower || scLower.includes(sNameOnly) || sNameOnly.includes(scLower))) ||
            charClassLower.includes(sNameOnly)
          );
        });
        if (foundSub) subclassId = foundSub.id;
      }
    }
  }

  // Find matching background if selectedBackgroundId not in creatorState
  let backgroundId = (cs.selectedBackgroundId as string) || '';
  if (!backgroundId && initialChar.background && initialChar.background !== 'Sin elegir' && initialChar.background !== 'Aventurero') {
    const bgLower = initialChar.background.toLowerCase();
    const foundBg = WIKIDOT_BACKGROUNDS.find((b) => {
      const bLower = b.name.toLowerCase();
      const bEnLower = (b.nameEn || '').toLowerCase();
      const bNameOnly = bLower.split('(')[0].trim();
      return (
        bLower === bgLower ||
        (bEnLower && bEnLower === bgLower) ||
        bgLower.includes(bNameOnly) ||
        bNameOnly.includes(bgLower) ||
        (bEnLower && bgLower.includes(bEnLower)) ||
        b.id === bgLower
      );
    });
    if (foundBg) backgroundId = foundBg.id;
  }

  // Alignment match
  let alignVal = String(cs.alignment ?? initialChar.alignment ?? '');
  const alignOpt = ALIGNMENT_OPTIONS.find((a) => a.name.toLowerCase() === alignVal.toLowerCase() || a.id === alignVal);
  if (alignOpt) alignVal = alignOpt.id;

  // Stats
  const assignedStats = (cs.assignedStats || (initialChar.stats ? { ...initialChar.stats } : {})) as Partial<Record<keyof AbilityScores, number>>;
  const manualRolls = (cs.manualRolls || (initialChar.stats ? [initialChar.stats.str, initialChar.stats.dex, initialChar.stats.con, initialChar.stats.int, initialChar.stats.wis, initialChar.stats.cha] : [10, 10, 10, 10, 10, 10])) as number[];

  // Determine initial step
  let step: CreatorStep = 'identity';
  if (cs.currentStep) {
    step = cs.currentStep as CreatorStep;
  } else if (initialChar.isDraft && initialChar.draftStep) {
    step = initialChar.draftStep as CreatorStep;
  }

  return {
    currentStep: step,
    characterName: String(cs.characterName ?? initialChar.name ?? ''),
    playerName: String(cs.playerName ?? initialChar.playerName ?? ''),
    avatarUrl: String(cs.avatarUrl ?? initialChar.avatarUrl ?? ''),
    alignment: alignVal,
    personalityTraits: String(cs.personalityTraits ?? initialChar.personalityTraits ?? ''),
    ideals: String(cs.ideals ?? initialChar.ideals ?? ''),
    bonds: String(cs.bonds ?? initialChar.bonds ?? ''),
    flaws: String(cs.flaws ?? initialChar.flaws ?? ''),
    backstoryBrief: String(cs.backstoryBrief ?? initialChar.backstory ?? ''),
    rollMethod: (cs.rollMethod ?? (initialChar.stats ? 'manual' : 'roll')) as 'roll' | 'manual' | 'standard',
    diceRolls: (cs.diceRolls ?? []) as DiceRollResult[],
    manualRolls,
    assignedStats,
    assignedSourceIndex: (cs.assignedSourceIndex ?? {}) as Partial<Record<keyof AbilityScores, number>>,
    selectedRaceId: raceId,
    selectedSubraceId: subraceId,
    flexibleRacialChoices: (cs.flexibleRacialChoices ?? []) as (keyof AbilityScores)[],
    bonusRacialSkills: (cs.bonusRacialSkills ?? []) as string[],
    asiChoices: (cs.asiChoices ?? {}) as Record<number, AsiFeatChoice>,
    bonusCampaignFeat: Boolean(cs.bonusCampaignFeat),
    selectedClassId: classId,
    selectedSubclassId: subclassId,
    characterLevel: Number(cs.characterLevel ?? initialChar.level ?? 1),
    selectedClassSkills: (cs.selectedClassSkills ?? initialChar.skills ?? []) as string[],
    expertiseSkills: (cs.expertiseSkills ?? []) as string[],
    selectedFightingStyle: String(cs.selectedFightingStyle ?? ''),
    selectedBackgroundId: backgroundId,
    selectedBackgroundSkills: (cs.selectedBackgroundSkills ?? []) as string[],
    selectedBackgroundTools: (cs.selectedBackgroundTools ?? initialChar.tools ?? []) as string[],
    selectedBackgroundLanguages: (cs.selectedBackgroundLanguages ?? []) as string[],
    backgroundFeatSubChoice: String(cs.backgroundFeatSubChoice ?? ''),
    selectedBackgroundEquipmentChoices: (cs.selectedBackgroundEquipmentChoices ?? {}) as Record<string, string>,
    selectedEquipmentChoices: (cs.selectedEquipmentChoices ?? {}) as Record<string, string>,
    customWeaponChoices: (cs.customWeaponChoices ?? {}) as Record<string, WeaponDef>,
    equippedItems: (cs.equippedItems ?? initialChar.equippedItems ?? []) as string[],
    selectedSpells: (cs.selectedSpells ?? initialChar.spells ?? []) as Spell[],
    racialSpellcastingAbility: (cs.racialSpellcastingAbility ?? initialChar.spellcastingAbility ?? 'wis') as 'int' | 'wis' | 'cha',
    selectedRacialCantrip: String(cs.selectedRacialCantrip ?? ''),
    classDecisions: (cs.classDecisions ?? initialChar.classDecisions ?? {}) as Record<string, string[]>,
  };
}

export const CharacterCreatorModal: React.FC<CharacterCreatorModalProps> = ({
  campaignId,
  initialCharacter,
  onSave,
  onSaveDraft,
  onClose,
}) => {
  const userStore = useUserStore();
  const currentLoggedUserName = userStore.currentUser?.username || '';

  const initState = useMemo(() => getInitialCreatorState(initialCharacter), [initialCharacter]);

  const [currentStep, setCurrentStep] = useState<CreatorStep>(initState?.currentStep || 'identity');

  // STEP 1: IDENTITY & ROLEPLAY
  const [characterName, setCharacterName] = useState<string>(initState?.characterName || '');
  const [playerName, setPlayerName] = useState<string>(
    initState?.playerName || initialCharacter?.playerName || currentLoggedUserName || ''
  );

  // Sync logged in user if playerName was empty or pending userStore load
  useEffect(() => {
    if (!playerName && currentLoggedUserName && !initialCharacter?.playerName) {
      setPlayerName(currentLoggedUserName);
    }
  }, [currentLoggedUserName, initialCharacter?.playerName]);
  const [avatarUrl, setAvatarUrl] = useState<string>(initState?.avatarUrl || '');
  const [customAvatarInput, setCustomAvatarInput] = useState<string>('');
  const [customUploadedAvatar, setCustomUploadedAvatar] = useState<string | null>(null);
  const [avatarFrame, setAvatarFrame] = useState<AvatarFrameStyle>(initialCharacter?.avatarFrame || 'frame-royal-gold');
  const [avatarScale, setAvatarScale] = useState<number>(initialCharacter?.avatarScale ?? 1);
  const [avatarOffsetY, setAvatarOffsetY] = useState<number>(initialCharacter?.avatarOffsetY ?? 0);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const avatarFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const stepContentContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [alignment, setAlignment] = useState<string>(initState?.alignment || '');
  const [personalityTraits, setPersonalityTraits] = useState<string>(initState?.personalityTraits || '');
  const [ideals, setIdeals] = useState<string>(initState?.ideals || '');
  const [bonds, setBonds] = useState<string>(initState?.bonds || '');
  const [flaws, setFlaws] = useState<string>(initState?.flaws || '');
  const [backstoryBrief, setBackstoryBrief] = useState<string>(initState?.backstoryBrief || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);

  // Themed Alert & Notification modal state
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

  // STEP 2: ABILITY SCORES & ROLLING (No default forced scores; unassigned until chosen)
  const [rollMethod, setRollMethod] = useState<'roll' | 'manual' | 'standard'>(initState?.rollMethod || 'roll');
  const [diceRolls, setDiceRolls] = useState<DiceRollResult[]>(initState?.diceRolls || []);
  const [manualRolls, setManualRolls] = useState<number[]>(initState?.manualRolls || [10, 10, 10, 10, 10, 10]);
  const [isRollingAnimation, setIsRollingAnimation] = useState(false);
  const standardArrayValues = useMemo(() => [15, 14, 13, 12, 10, 8], []);

  // Assigned stats by the player (empty by default: no forced baseline values)
  const [assignedStats, setAssignedStats] = useState<Partial<Record<keyof AbilityScores, number>>>(initState?.assignedStats || {});
  // Mapping of statKey -> source index in diceRolls (or standardArray)
  const [assignedSourceIndex, setAssignedSourceIndex] = useState<Partial<Record<keyof AbilityScores, number>>>(initState?.assignedSourceIndex || {});
  // Selected roll index for click-to-assign on touch/mobile
  const [selectedRollIndex, setSelectedRollIndex] = useState<number | null>(null);
  // Hover drop target for drag & drop visual feedback
  const [dragOverStat, setDragOverStat] = useState<keyof AbilityScores | null>(null);

  // Computed base stats: uses assigned score or 10 as safe fallback for derived formulas
  const baseStats: AbilityScores = useMemo(() => ({
    str: assignedStats.str ?? 10,
    dex: assignedStats.dex ?? 10,
    con: assignedStats.con ?? 10,
    int: assignedStats.int ?? 10,
    wis: assignedStats.wis ?? 10,
    cha: assignedStats.cha ?? 10,
  }), [assignedStats]);

  // STEP 3: RACE & SUBRACE & FLEXIBLE RACIAL BONUSES (all unselected by default)
  const [selectedRaceId, setSelectedRaceId] = useState<string>(initState?.selectedRaceId || '');
  const [selectedSubraceId, setSelectedSubraceId] = useState<string>(initState?.selectedSubraceId || '');
  const [raceSearchQuery, setRaceSearchQuery] = useState<string>('');
  const [raceCategory, setRaceCategory] = useState<'Todos' | 'Común' | 'Exótica' | 'Monstruosa' | 'Planar'>('Todos');
  const [isRacePickerMaximized, setIsRacePickerMaximized] = useState<boolean>(false);
  const [flexibleRacialChoices, setFlexibleRacialChoices] = useState<(keyof AbilityScores)[]>(initState?.flexibleRacialChoices || []);
  const [bonusRacialSkills, setBonusRacialSkills] = useState<string[]>(initState?.bonusRacialSkills || []);
  const [racialSpellcastingAbility, setRacialSpellcastingAbility] = useState<'int' | 'wis' | 'cha'>(
    initState?.racialSpellcastingAbility || 'wis'
  );
  const [selectedRacialCantrip, setSelectedRacialCantrip] = useState<string>(
    initState?.selectedRacialCantrip || ''
  );

  // STEP 4: ASI / FEAT CHOICES & STATS
  const [asiChoices, setAsiChoices] = useState<Record<number, AsiFeatChoice>>(initState?.asiChoices || {});
  const [featSearch, setFeatSearch] = useState<string>('');
  const [featCategory, setFeatCategory] = useState<'Todos' | 'Combate' | 'Magia' | 'Utilidad' | 'General'>('Todos');
  const [bonusCampaignFeat, setBonusCampaignFeat] = useState<boolean>(initState?.bonusCampaignFeat || false);
  const [isFeatPickerMaximized, setIsFeatPickerMaximized] = useState<boolean>(false);
  const [maximizedFeatSlotIdx, setMaximizedFeatSlotIdx] = useState<number>(0);

  // STEP 5: CLASS & SUBCLASS & LEVEL & SKILLS
  const [selectedClassId, setSelectedClassId] = useState<string>(initState?.selectedClassId || '');
  const [selectedSubclassId, setSelectedSubclassId] = useState<string>(initState?.selectedSubclassId || '');
  const [isSubclassPickerModalOpen, setIsSubclassPickerModalOpen] = useState<boolean>(false);
  const [characterLevel, setCharacterLevel] = useState<number>(initState?.characterLevel || 1);
  const [activeProgressionTab, setActiveProgressionTab] = useState<'current' | 'all'>('current');
  const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>(initState?.selectedClassSkills || []);
  const [expertiseSkills, setExpertiseSkills] = useState<string[]>(initState?.expertiseSkills || []);

  // STEP 6: CLASS FEATURES & DECISIONS
  const [selectedFightingStyle, setSelectedFightingStyle] = useState<string>(initState?.selectedFightingStyle || '');
  const [creatorClassDecisions, setCreatorClassDecisions] = useState<Record<string, string[]>>(
    initState?.classDecisions || {}
  );
  const [creatorDecisionSearchTerms, setCreatorDecisionSearchTerms] = useState<Record<string, string>>({});

  // STEP 7: BACKGROUND
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>(initState?.selectedBackgroundId || '');
  const [backgroundSearch, setBackgroundSearch] = useState<string>('');
  const [backgroundOrientationFilter, setBackgroundOrientationFilter] = useState<'Todos' | BackgroundOrientation>('Todos');
  const [collapsedBackgroundCategories, setCollapsedBackgroundCategories] = useState<Record<string, boolean>>({});
  const [isBackgroundPickerMaximized, setIsBackgroundPickerMaximized] = useState<boolean>(false);
  const [selectedBackgroundSkills, setSelectedBackgroundSkills] = useState<string[]>(initState?.selectedBackgroundSkills || []);
  const [selectedBackgroundTools, setSelectedBackgroundTools] = useState<string[]>(initState?.selectedBackgroundTools || []);
  const [selectedBackgroundEquipmentChoices, setSelectedBackgroundEquipmentChoices] = useState<Record<string, string>>(initState?.selectedBackgroundEquipmentChoices || {});
  const [lastTrinketRollFeedback, setLastTrinketRollFeedback] = useState<{ choiceId: string; roll: number; text: string } | null>(null);
  const [customBackgroundToolInput, setCustomBackgroundToolInput] = useState<string>('');
  const [selectedBackgroundLanguages, setSelectedBackgroundLanguages] = useState<string[]>(
    initState?.selectedBackgroundLanguages || []
  );
  const [customBackgroundLanguageInput, setCustomBackgroundLanguageInput] = useState<string>('');
  const [backgroundFeatSubChoice, setBackgroundFeatSubChoice] = useState<string>(
    initState?.backgroundFeatSubChoice || ''
  );
  const [inspectingFeat, setInspectingFeat] = useState<OfficialFeat | null>(null);

  // Live Sheet Sidebar & Review Sub-Tabs
  const [liveSheetTab, setLiveSheetTab] = useState<'combat' | 'skills' | 'traits' | 'spells' | 'inventory'>('combat');
  const [liveSkillFilter, setLiveSkillFilter] = useState<'all' | 'proficient'>('all');
  const [reviewTab, setReviewTab] = useState<'combat' | 'skills' | 'traits' | 'spells' | 'inventory'>('combat');

  // STEP 8: EQUIPMENT & INVENTORY
  const [selectedEquipmentChoices, setSelectedEquipmentChoices] = useState<Record<string, string>>(initState?.selectedEquipmentChoices || {});
  const [customWeaponChoices, setCustomWeaponChoices] = useState<Record<string, WeaponDef>>(initState?.customWeaponChoices || {});
  const [isWeaponPickerOpen, setIsWeaponPickerOpen] = useState(false);
  const [isArmorPickerOpen, setIsArmorPickerOpen] = useState(false);
  const [extraCustomEquipment, setExtraCustomEquipment] = useState<string[]>([]);
  const [activeWeaponPickerGroup, setActiveWeaponPickerGroup] = useState<{
    groupId: string;
    category: 'martial' | 'simple' | 'all';
    title: string;
  } | null>(null);
  const [equippedItems, setEquippedItems] = useState<string[] | null>(initState?.equippedItems || null);

  // STEP 9: SPELLS
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>(initState?.selectedSpells || []);
  const [inspectingSpell, setInspectingSpell] = useState<Spell | null>(null);
  const [inspectingCompendium, setInspectingCompendium] = useState<CompendiumInspectData | null>(null);
  const [spellSearchQuery, setSpellSearchQuery] = useState('');
  const [spellSchoolFilter, setSpellSchoolFilter] = useState('all');
  const [spellSortMode, setSpellSortMode] = useState<'level' | 'name' | 'school'>('level');
  const [spellScopeMode, setSpellScopeMode] = useState<'available' | 'all_class' | 'all_compendium'>('available');
  const [spellActiveTab, setSpellActiveTab] = useState<'all' | 'cantrips' | 'leveled'>('all');
  const [isSpellPickerMaximized, setIsSpellPickerMaximized] = useState(false);

  // Modal Fullscreen & Maximization (for maximum visual comfort and widescreen view)
  const [isModalMaximized, setIsModalMaximized] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsModalMaximized(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleModalMaximize = () => {
    if (!isModalMaximized) {
      setIsModalMaximized(true);
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      setIsModalMaximized(false);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const [isTutorialMenuOpen, setIsTutorialMenuOpen] = useState(false);
  const tutorialMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tutorialMenuRef.current && !tutorialMenuRef.current.contains(e.target as Node)) {
        setIsTutorialMenuOpen(false);
      }
    };
    if (isTutorialMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTutorialMenuOpen]);

  // Active Wikidot entities (nullable when not selected)
  const raceCounts = useMemo(() => {
    return {
      Todos: WIKIDOT_RACES.length,
      Común: WIKIDOT_RACES.filter((r) => r.category === 'Común').length,
      Exótica: WIKIDOT_RACES.filter((r) => r.category === 'Exótica').length,
      Monstruosa: WIKIDOT_RACES.filter((r) => r.category === 'Monstruosa').length,
      Planar: WIKIDOT_RACES.filter((r) => r.category === 'Planar').length,
    };
  }, []);

  const activeRace = useMemo(() => {
    if (!selectedRaceId) return null;
    return WIKIDOT_RACES.find((r) => r.id === selectedRaceId) || null;
  }, [selectedRaceId]);

  const activeSubrace = useMemo(() => {
    if (!activeRace || !activeRace.subraces || activeRace.subraces.length === 0 || !selectedSubraceId) return null;
    return activeRace.subraces.find((s) => s.id === selectedSubraceId) || null;
  }, [activeRace, selectedSubraceId]);

  const activeClass = useMemo(() => {
    if (!selectedClassId) return null;
    return WIKIDOT_CLASSES.find((c) => c.id === selectedClassId) || null;
  }, [selectedClassId]);

  const subclassUnlockLevel = useMemo(() => {
    return activeClass ? getClassSubclassLevel(activeClass) : 3;
  }, [activeClass]);

  const isSubclassUnlocked = characterLevel >= subclassUnlockLevel;

  // Clear subclass if level is decreased below required level
  useEffect(() => {
    if (activeClass && !isSubclassUnlocked && selectedSubclassId) {
      setSelectedSubclassId('');
    }
  }, [activeClass, isSubclassUnlocked, selectedSubclassId]);

  const activeSubclass = useMemo(() => {
    if (!activeClass || !isSubclassUnlocked || !selectedSubclassId) return null;
    return activeClass.subclasses.find((sc) => sc.id === selectedSubclassId) || null;
  }, [activeClass, isSubclassUnlocked, selectedSubclassId]);

  // Combined progression: base class 1-20 plus active subclass features sorted by level
  const combinedProgression = useMemo(() => {
    if (!activeClass) return [];
    const base = activeClass.featuresByLevel || [];
    const subFeatures =
      activeSubclass?.features?.map((f) => ({
        level: f.level,
        name: `${f.name} [${activeSubclass.name.split('(')[0].trim()}]`,
        desc: f.desc,
      })) || [];
    return [...base, ...subFeatures].sort((a, b) => a.level - b.level);
  }, [activeClass, activeSubclass]);

  const pendingCreationDecisions = useMemo(() => {
    if (!activeClass) return [];
    return getAllClassDecisionsForCreation(
      activeClass.name,
      activeSubclass?.name,
      characterLevel,
      creatorClassDecisions
    );
  }, [activeClass, activeSubclass, characterLevel, creatorClassDecisions]);

  const toggleCreatorClassDecision = (decisionId: string, optionName: string, maxCount: number) => {
    setCreatorClassDecisions((prev) => {
      const current = prev[decisionId] || [];
      if (current.includes(optionName)) {
        return { ...prev, [decisionId]: current.filter((x) => x !== optionName) };
      }
      if (maxCount === 1) {
        return { ...prev, [decisionId]: [optionName] };
      }
      if (current.length >= maxCount) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Opciones Alcanzado',
          subtitle: 'Decisión de Clase',
          message: `Solo puedes elegir ${maxCount} opción(es) para esta característica.`,
          type: 'warning',
        });
        return prev;
      }
      return { ...prev, [decisionId]: [...current, optionName] };
    });
  };

  const activeBackground = useMemo(() => {
    if (!selectedBackgroundId) return null;
    return WIKIDOT_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || null;
  }, [selectedBackgroundId]);

  const knownRacialLanguages = useMemo(() => {
    return activeRace?.languages && activeRace.languages.length > 0
      ? activeRace.languages
      : ['Común'];
  }, [activeRace]);

  useEffect(() => {
    if (!activeBackground) return;
    if (activeBackground.fixedLanguages && activeBackground.fixedLanguages.length > 0) {
      setSelectedBackgroundLanguages((prev) => {
        const next = new Set(prev);
        activeBackground.fixedLanguages?.forEach((l) => next.add(l));
        return Array.from(next);
      });
    }
    if (activeBackground.bonusFeatId) {
      const bFeat = OFFICIAL_5E_FEATS.find((f) => f.id === activeBackground.bonusFeatId);
      if (bFeat?.subChoice?.options && bFeat.subChoice.options.length > 0) {
        const validIds = bFeat.subChoice.options.map((o) => o.id);
        setBackgroundFeatSubChoice((current) => {
          if (current && validIds.includes(current)) return current;
          return bFeat.subChoice!.options[0].id;
        });
      }
    }
  }, [activeBackground]);

  const backgroundOrientationCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todos: WIKIDOT_BACKGROUNDS.length,
      Magia: 0,
      Combate: 0,
      Sigilo: 0,
      Social: 0,
      Exploración: 0,
    };
    WIKIDOT_BACKGROUNDS.forEach((bg) => {
      if (bg.orientation && counts[bg.orientation] !== undefined) {
        counts[bg.orientation]++;
      }
    });
    return counts;
  }, []);

  const toggleBackgroundCategoryCollapse = (cat: string) => {
    setCollapsedBackgroundCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const expandAllBackgroundCategories = () => {
    setCollapsedBackgroundCategories({});
  };

  const collapseAllBackgroundCategories = () => {
    const allCollapsed: Record<string, boolean> = {};
    WIKIDOT_BACKGROUND_CATEGORIES.forEach((cat) => {
      allCollapsed[cat] = true;
    });
    setCollapsedBackgroundCategories(allCollapsed);
  };

  const groupedBackgrounds = useMemo(() => {
    const q = backgroundSearch.trim().toLowerCase();
    const filtered = WIKIDOT_BACKGROUNDS.filter((bg) => {
      if (backgroundOrientationFilter !== 'Todos' && bg.orientation !== backgroundOrientationFilter) {
        return false;
      }
      if (q) {
        const matchName = bg.name.toLowerCase().includes(q) || (bg.nameEn && bg.nameEn.toLowerCase().includes(q));
        const matchDesc = bg.description.toLowerCase().includes(q);
        const matchFeature = bg.featureName.toLowerCase().includes(q);
        const matchSkills = bg.skillProficiencies.some((sk) => sk.toLowerCase().includes(q));
        return matchName || matchDesc || matchFeature || matchSkills;
      }
      return true;
    });

    const groups: { category: BackgroundCategory; backgrounds: WikidotBackground[] }[] = [];
    WIKIDOT_BACKGROUND_CATEGORIES.forEach((cat) => {
      const list = filtered.filter((bg) => bg.category === cat);
      if (list.length > 0 || !q) {
        groups.push({ category: cat, backgrounds: list });
      }
    });
    return groups;
  }, [backgroundSearch, backgroundOrientationFilter]);

  const classConfig = useMemo(() => {
    if (!activeClass) return null;
    return CLASS_SKILL_CONFIGS[activeClass.id] || null;
  }, [activeClass]);

  const isCaster = useMemo(() => {
    if (!activeClass) return false;
    const isBaseCaster = isSpellcasterClass(activeClass.name);
    if (!isBaseCaster) {
      const sub = (selectedSubclassId || '').toLowerCase();
      if ((sub.includes('arcano') || sub.includes('eldritch') || sub.includes('trickster')) && characterLevel >= 3) {
        return true;
      }
      return false;
    }
    const c = activeClass.name.toLowerCase();
    // In D&D 5e, Paladin and Ranger only gain spellcasting at level 2+
    if ((c.includes('palad') || c.includes('explorador') || c.includes('ranger')) && characterLevel < 2) {
      return false;
    }
    return true;
  }, [activeClass, characterLevel, selectedSubclassId]);

  // Assign a roll or standard array value to a specific ability score
  const assignRollToStat = (sourceIdx: number, val: number, targetStat: keyof AbilityScores) => {
    setAssignedStats((prev) => {
      const next = { ...prev };
      // If this sourceIdx was assigned to another stat, remove it from that stat
      Object.keys(assignedSourceIndex).forEach((key) => {
        const k = key as keyof AbilityScores;
        if (assignedSourceIndex[k] === sourceIdx) {
          delete next[k];
        }
      });
      next[targetStat] = val;
      return next;
    });

    setAssignedSourceIndex((prev) => {
      const next = { ...prev };
      Object.keys(prev).forEach((key) => {
        const k = key as keyof AbilityScores;
        if (prev[k] === sourceIdx) {
          delete next[k];
        }
      });
      next[targetStat] = sourceIdx;
      return next;
    });

    setSelectedRollIndex(null);
  };

  const unassignStat = (targetStat: keyof AbilityScores) => {
    setAssignedStats((prev) => {
      const next = { ...prev };
      delete next[targetStat];
      return next;
    });
    setAssignedSourceIndex((prev) => {
      const next = { ...prev };
      delete next[targetStat];
      return next;
    });
  };

  // Roll 4d6 drop lowest 6 times (generates tray pool without forcing default values)
  const handleRollDiceVirtual = () => {
    setIsRollingAnimation(true);
    setTimeout(() => {
      const newRolls: DiceRollResult[] = [];
      for (let i = 0; i < 6; i++) {
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        const d3 = Math.floor(Math.random() * 6) + 1;
        const d4 = Math.floor(Math.random() * 6) + 1;
        const dice = [d1, d2, d3, d4];
        const minVal = Math.min(...dice);
        const sumOfThree = dice.reduce((acc, curr) => acc + curr, 0) - minVal;
        newRolls.push({
          dice,
          dropped: minVal,
          total: sumOfThree,
        });
      }
      newRolls.sort((a, b) => b.total - a.total);
      setDiceRolls(newRolls);
      // Clear previous assignments so player drags & drops results cleanly
      setAssignedStats({});
      setAssignedSourceIndex({});
      setSelectedRollIndex(null);
      setIsRollingAnimation(false);
    }, 400);
  };

  const handleApplyStandardArray = () => {
    setRollMethod('standard');
    setAssignedStats({});
    setAssignedSourceIndex({});
    setSelectedRollIndex(null);
  };

  // Custom image upload from user device files
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setCustomUploadedAvatar(base64);
        setAvatarUrl(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  // Check if character is a Variant Human
  const isVariantHuman = selectedRaceId === 'humano' && selectedSubraceId === 'humano-variante';

  // Available ASI / Feat count
  const availableAsiCount = useMemo(() => {
    let count = 0;
    if (isVariantHuman) count += 1;
    if (activeClass) {
      count += getAvailableAsiCount(activeClass.id, characterLevel, false);
    }
    if (bonusCampaignFeat) count += 1;
    return count;
  }, [activeClass, characterLevel, isVariantHuman, bonusCampaignFeat]);

  // Class Starting Equipment Configuration
  const startingEquipmentConfig = useMemo(() => {
    return getClassStartingEquipment(activeClass?.id);
  }, [activeClass]);

  // Update starting equipment defaults when class changes
  useEffect(() => {
    if (startingEquipmentConfig) {
      const initial: Record<string, string> = {};
      startingEquipmentConfig.choiceGroups.forEach((grp) => {
        initial[grp.id] = grp.defaultOptionId;
      });
      setSelectedEquipmentChoices(initial);
    } else {
      setSelectedEquipmentChoices({});
    }
  }, [startingEquipmentConfig]);

  // Synchronize background choices when background changes
  useEffect(() => {
    if (activeBackground) {
      if (activeBackground.skillChoices) {
        setSelectedBackgroundSkills(
          activeBackground.skillChoices.options.slice(0, activeBackground.skillChoices.count)
        );
      } else {
        setSelectedBackgroundSkills(activeBackground.skillProficiencies || []);
      }

      if (activeBackground.toolChoices) {
        setSelectedBackgroundTools(
          activeBackground.toolChoices.options.slice(0, activeBackground.toolChoices.count)
        );
      } else {
        setSelectedBackgroundTools(activeBackground.toolProficiencies || []);
      }

      if (activeBackground.equipmentChoices && activeBackground.equipmentChoices.length > 0) {
        const initialEquip: Record<string, string> = {};
        activeBackground.equipmentChoices.forEach((ch) => {
          if (ch.type === 'horror_trinket') {
            const rolled = rollGothicHorrorTrinket();
            initialEquip[ch.id] = `(d100 #${rolled.roll}) ${rolled.name}: ${rolled.description}`;
          } else if (ch.type === 'feywild_trinket') {
            const rolled = rollFeywildTrinket();
            initialEquip[ch.id] = `(d100 #${rolled.roll}) ${rolled.name}: ${rolled.description}`;
          } else if (ch.type === 'standard_trinket') {
            const rolled = rollStandardTrinket();
            initialEquip[ch.id] = `(d100 #${rolled.roll}) ${rolled.name}: ${rolled.description}`;
          } else if (ch.type === 'custom_choice') {
            initialEquip[ch.id] = ch.defaultItem || ch.options?.[0] || '';
          }
        });
        setSelectedBackgroundEquipmentChoices(initialEquip);
      } else {
        setSelectedBackgroundEquipmentChoices({});
      }
    } else {
      setSelectedBackgroundSkills([]);
      setSelectedBackgroundTools([]);
      setSelectedBackgroundEquipmentChoices({});
    }
  }, [activeBackground]);

  const handleAddCustomBackgroundTool = () => {
    const val = customBackgroundToolInput.trim();
    if (!val || !activeBackground?.toolChoices) return;
    if (selectedBackgroundTools.includes(val)) {
      setCustomBackgroundToolInput('');
      return;
    }
    const maxCount = activeBackground.toolChoices.count || 1;
    if (selectedBackgroundTools.length < maxCount) {
      setSelectedBackgroundTools((prev) => [...prev, val]);
    } else {
      setSelectedBackgroundTools((prev) => [...prev.slice(1), val]);
    }
    setCustomBackgroundToolInput('');
  };

  const handleAddCustomBackgroundLanguage = () => {
    const val = customBackgroundLanguageInput.trim();
    if (!val || !activeBackground) return;
    if (selectedBackgroundLanguages.includes(val)) {
      setCustomBackgroundLanguageInput('');
      return;
    }
    const maxLang = activeBackground.languagesCount || 1;
    if (selectedBackgroundLanguages.length < maxLang) {
      setSelectedBackgroundLanguages((prev) => [...prev, val]);
    } else {
      const nonFixed = selectedBackgroundLanguages.filter(
        (l) => !activeBackground.fixedLanguages?.includes(l)
      );
      if (nonFixed.length > 0) {
        const toReplace = nonFixed[0];
        setSelectedBackgroundLanguages((prev) => [
          ...prev.filter((l) => l !== toReplace),
          val,
        ]);
      } else {
        setSelectedBackgroundLanguages((prev) => [...prev, val]);
      }
    }
    setCustomBackgroundLanguageInput('');
  };

  // Has Tactical Features for step 6 (Fighting styles, etc.)
  const hasTacticalFeatures = useMemo(() => {
    if (!activeClass) return false;
    if (activeClass.id === 'guerrero' && characterLevel >= 1) return true;
    if (['paladin', 'explorador'].includes(activeClass.id) && characterLevel >= 2) return true;
    return false;
  }, [activeClass, characterLevel]);

  // Total flexible racial bonus points (any)
  const raceAnyCount = useMemo(() => {
    let count = 0;
    if (activeRace?.abilityScoreBonuses?.any) count += activeRace.abilityScoreBonuses.any;
    if (activeSubrace?.abilityScoreBonuses?.any) count += activeSubrace.abilityScoreBonuses.any;
    return count;
  }, [activeRace, activeSubrace]);

  // Calculate racial ability bonus totals including flexible selections
  const racialBonuses = useMemo(() => {
    const bonuses: Record<keyof AbilityScores, number> = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    };

    if (activeSubrace?.replacesBaseBonuses) {
      if (activeSubrace.abilityScoreBonuses) {
        Object.entries(activeSubrace.abilityScoreBonuses).forEach(([k, v]) => {
          if (k in bonuses && typeof v === 'number') {
            bonuses[k as keyof AbilityScores] = v;
          }
        });
      }
    } else {
      if (activeRace?.abilityScoreBonuses) {
        Object.entries(activeRace.abilityScoreBonuses).forEach(([k, v]) => {
          if (k in bonuses && typeof v === 'number') {
            bonuses[k as keyof AbilityScores] += v;
          }
        });
      }

      if (activeSubrace && activeSubrace.abilityScoreBonuses) {
        Object.entries(activeSubrace.abilityScoreBonuses).forEach(([k, v]) => {
          if (k in bonuses && typeof v === 'number') {
            bonuses[k as keyof AbilityScores] += v;
          }
        });
      }
    }

    if (raceAnyCount > 0) {
      flexibleRacialChoices.slice(0, raceAnyCount).forEach((stat) => {
        if (stat in bonuses) {
          bonuses[stat] += 1;
        }
      });
    }

    return bonuses;
  }, [activeRace, activeSubrace, raceAnyCount, flexibleRacialChoices]);

  // Calculate ASI & Feat stat bonuses
  const asiStatBonuses = useMemo(() => {
    const bonuses: Record<keyof AbilityScores, number> = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    };

    for (let i = 0; i < availableAsiCount; i++) {
      const choice = asiChoices[i];
      if (!choice) continue;
      if (choice.type === 'asi') {
        if (choice.asiType === '+2' && choice.asiStat1) {
          bonuses[choice.asiStat1] += 2;
        } else if (choice.asiType === '+1+1') {
          if (choice.asiStat1) bonuses[choice.asiStat1] += 1;
          if (choice.asiStat2) bonuses[choice.asiStat2] += 1;
        }
      } else if (choice.type === 'feat' && choice.featId) {
        const feat = OFFICIAL_5E_FEATS.find((f) => f.id === choice.featId);
        if (feat?.abilityBonus) {
          if (choice.featAbilityChoice) {
            bonuses[choice.featAbilityChoice] += feat.abilityBonus.amount;
          } else if (feat.abilityBonus.stats && feat.abilityBonus.stats.length === 1) {
            bonuses[feat.abilityBonus.stats[0]] += feat.abilityBonus.amount;
          }
        }
      }
    }

    return bonuses;
  }, [availableAsiCount, asiChoices]);

  // Final Total Stats (Base + Racial Bonus + ASI/Feat Bonus, max 20)
  const finalStats: AbilityScores = useMemo(() => {
    return {
      str: Math.min(20, baseStats.str + racialBonuses.str + asiStatBonuses.str),
      dex: Math.min(20, baseStats.dex + racialBonuses.dex + asiStatBonuses.dex),
      con: Math.min(20, baseStats.con + racialBonuses.con + asiStatBonuses.con),
      int: Math.min(20, baseStats.int + racialBonuses.int + asiStatBonuses.int),
      wis: Math.min(20, baseStats.wis + racialBonuses.wis + asiStatBonuses.wis),
      cha: Math.min(20, baseStats.cha + racialBonuses.cha + asiStatBonuses.cha),
    };
  }, [baseStats, racialBonuses, asiStatBonuses]);

  const getMod = (val: number) => Math.floor((val - 10) / 2);
  const getModStr = (val: number) => {
    const m = getMod(val);
    return m >= 0 ? `+${m}` : `${m}`;
  };

  const profBonus = Math.floor((characterLevel - 1) / 4) + 2;

  // Background granted skills
  const backgroundSkills = useMemo(() => {
    if (!activeBackground) return [];
    const baseSkills = activeBackground.skillProficiencies || [];
    if (activeBackground.skillChoices) {
      const chosen = selectedBackgroundSkills.length > 0
        ? selectedBackgroundSkills
        : activeBackground.skillChoices.options.slice(0, activeBackground.skillChoices.count);
      return Array.from(new Set([...baseSkills, ...chosen]));
    }
    return baseSkills;
  }, [activeBackground, selectedBackgroundSkills]);

  // Background granted tools
  const backgroundTools = useMemo(() => {
    if (!activeBackground) return [];
    const baseTools = activeBackground.toolProficiencies || [];
    if (activeBackground.toolChoices) {
      const chosen = selectedBackgroundTools.length > 0
        ? selectedBackgroundTools
        : activeBackground.toolChoices.options.slice(0, activeBackground.toolChoices.count);
      return Array.from(new Set([...baseTools, ...chosen]));
    }
    return baseTools;
  }, [activeBackground, selectedBackgroundTools]);

  // Racial granted skills
  const racialSkills = useMemo(() => {
    const list: string[] = [];
    if (activeRace?.traits) {
      activeRace.traits.forEach((t) => {
        if (t.name.toLowerCase().includes('percepción') || t.desc.toLowerCase().includes('competencia en la habilidad percepción')) {
          list.push('Percepción');
        }
        if (t.name.toLowerCase().includes('atletismo') || t.desc.toLowerCase().includes('competencia en la habilidad atletismo')) {
          list.push('Atletismo');
        }
        if (t.desc.toLowerCase().includes('sigilo')) {
          list.push('Sigilo');
        }
      });
    }
    return Array.from(new Set(list));
  }, [activeRace]);

  // All combined active proficiencies
  const totalSkills = useMemo(() => {
    const set = new Set<string>();
    backgroundSkills.forEach((s) => set.add(s));
    racialSkills.forEach((s) => set.add(s));
    selectedClassSkills.forEach((s) => set.add(s));
    bonusRacialSkills.forEach((s) => set.add(s));

    // Feat-granted skills (Skilled, Eldritch Adept Beguiling Influence, etc.)
    Object.values(asiChoices).forEach((c) => {
      if (c.type === 'feat') {
        if (c.featId === 'habilidoso' && c.featSubChoices) {
          c.featSubChoices.forEach((id) => {
            const skillObj = ALL_5E_SKILLS.find(
              (sk) => sk.name.toLowerCase().replace(/\s+/g, '-') === id
            );
            if (skillObj) set.add(skillObj.name);
          });
        } else if (c.featId === 'adepto-eldritch' && c.featSubChoices?.includes('influencia-seductora')) {
          set.add('Engaño');
          set.add('Persuasión');
        }
      }
    });

    return Array.from(set);
  }, [backgroundSkills, racialSkills, selectedClassSkills, bonusRacialSkills, asiChoices]);

  // Expertise (Pericia x2) configuration
  const expertiseConfig = useMemo(() => {
    if (!activeClass) return { allowedCount: 0, title: '', desc: '' };
    return getExpertiseConfig(activeClass.id, characterLevel);
  }, [activeClass, characterLevel]);

  // Valid expertise skills must be currently proficient skills
  const validExpertiseSkills = useMemo(() => {
    return expertiseSkills.filter((s) => totalSkills.includes(s)).slice(0, expertiseConfig.allowedCount);
  }, [expertiseSkills, totalSkills, expertiseConfig.allowedCount]);

  // Hit Points Calculation (including Hill Dwarf toughness and Tough feat)
  const calculatedMaxHp = useMemo(() => {
    const conMod = getMod(finalStats.con);
    const hitDie = activeClass?.hitDie || 10;
    const level1Hp = hitDie + conMod;
    const additionalLevels = Math.max(0, characterLevel - 1);
    const avgPerLevel = Math.floor(hitDie / 2) + 1 + conMod;
    
    // Hill dwarf bonus (+1 HP per level)
    const dwarfBonus = selectedSubraceId === 'enano-colinas' ? characterLevel : 0;
    
    // Tough feat (+2 HP per level)
    const hasTough = Object.values(asiChoices).some((c) => c.type === 'feat' && c.featId === 'robusto');
    const toughBonus = hasTough ? 2 * characterLevel : 0;

    return Math.max(1, level1Hp + additionalLevels * Math.max(1, avgPerLevel) + dwarfBonus + toughBonus);
  }, [activeClass, finalStats.con, characterLevel, selectedSubraceId, asiChoices]);

  // Chosen equipment items list (dynamically integrates custom weapons from compendium and user added items)
  const chosenEquipmentList: string[] = useMemo(() => {
    const list: string[] = [];
    if (startingEquipmentConfig) {
      startingEquipmentConfig.fixedEquipment.forEach((it) => list.push(it));
      Object.entries(selectedEquipmentChoices).forEach(([grpId, optId]) => {
        const grp = startingEquipmentConfig.choiceGroups.find((g) => g.id === grpId);
        const opt = grp?.options.find((o) => o.id === optId);
        if (opt) {
          opt.items.forEach((it) => {
            if (customWeaponChoices[grpId] && (it.toLowerCase().includes('arma') || it.toLowerCase().includes('elección') || it.toLowerCase().includes('eleccion'))) {
              list.push(customWeaponChoices[grpId].name);
            } else {
              list.push(it);
            }
          });
        }
      });
    }
    if (activeBackground?.suggestedEquipment) {
      list.push(`[Equipo de Trasfondo] ${activeBackground.suggestedEquipment}`);
    }
    if (activeBackground?.equipmentChoices) {
      activeBackground.equipmentChoices.forEach((ch) => {
        const val =
          selectedBackgroundEquipmentChoices[ch.id] ||
          ch.defaultItem ||
          (ch.options && ch.options.length > 0 ? ch.options[0] : '');
        if (val) {
          list.push(`[${ch.label}] ${val}`);
        }
      });
    }
    extraCustomEquipment.forEach((it) => list.push(it));
    return list;
  }, [startingEquipmentConfig, selectedEquipmentChoices, customWeaponChoices, activeBackground, selectedBackgroundEquipmentChoices, extraCustomEquipment]);

  // Active equipped items list: strictly equipable items only (no bedrolls, torches, rations)
  const activeEquippedList: string[] = useMemo(() => {
    if (equippedItems !== null) {
      return equippedItems.filter(isItemEquipable);
    }
    // Default equip: equip all equipable items from chosenEquipmentList, but only 1 body armor
    let hasBodyArmor = false;
    return chosenEquipmentList.filter(isItemEquipable).filter((it) => {
      const armorDef = findArmorByName(it);
      if (armorDef && armorDef.category !== 'shield') {
        if (hasBodyArmor) return false;
        hasBodyArmor = true;
        return true;
      }
      return true;
    });
  }, [equippedItems, chosenEquipmentList]);

  // Check if an item is equipped in the creator - only equipable items can be equipped
  const isItemEquipped = (itemName: string): boolean => {
    if (!isItemEquipable(itemName)) return false;
    return activeEquippedList.includes(itemName);
  };

  // Toggle equipping/unequipping an item with single body armor slot logic
  const toggleEquipItem = (itemName: string) => {
    if (!isItemEquipable(itemName)) return;
    const current = activeEquippedList;
    const isCurrentlyEquipped = current.includes(itemName);

    if (isCurrentlyEquipped) {
      setEquippedItems(current.filter((it) => it !== itemName));
    } else {
      const armorDef = findArmorByName(itemName);
      let next = [...current];
      if (armorDef && armorDef.category !== 'shield') {
        // Unequip any other body armor
        next = next.filter((it) => {
          const a = findArmorByName(it);
          return !(a && a.category !== 'shield');
        });
      }
      setEquippedItems([...next, itemName]);
    }
  };

  // Dynamic Armor Class Calculation based on equipped items, fighting styles, feats, and unarmored defense
  const calculatedAc = useMemo(() => {
    const hasDualWielder = Object.values(asiChoices).some((c) => c.type === 'feat' && c.featId === 'combatiente-dos-armas');

    return calculateEquippedAc({
      equippedItems: activeEquippedList,
      stats: finalStats,
      characterClass: activeClass?.name || '',
      raceId: activeRace?.id || '',
      fightingStyle: selectedFightingStyle,
      hasDualWielderFeat: hasDualWielder,
    });
  }, [activeClass, activeRace, finalStats, selectedFightingStyle, asiChoices, activeEquippedList]);

  // Dynamic Speed Calculation based on class features (Barbarian Fast Movement, Monk Unarmored Movement), feats, armor penalties, and race
  const calculatedSpeedResult = useMemo(() => {
    const hasMobileFeat = Object.values(asiChoices).some((c) => c.type === 'feat' && (c.featId === 'movil' || c.featId === 'móvil' || c.featId === 'mobile'));

    return calculateCharacterSpeed({
      baseSpeed: activeRace?.speed || '30 pies',
      characterClass: activeClass?.name || '',
      level: characterLevel,
      equippedItems: activeEquippedList,
      notes: hasMobileFeat ? 'Dote Móvil' : '',
      raceName: activeRace?.name || '',
      strength: finalStats.str,
    });
  }, [activeRace, activeClass, characterLevel, activeEquippedList, asiChoices, finalStats.str]);

  // Initiative Bonus (Dex mod + Alert feat (+5) + War Magic wizard)
  const calculatedInitiative = useMemo(() => {
    let bonus = getMod(finalStats.dex);
    if (selectedSubclassId.includes('guerra') && activeClass?.id === 'mago') {
      bonus += getMod(finalStats.int);
    }
    const hasAlert = Object.values(asiChoices).some((c) => c.type === 'feat' && c.featId === 'alerta');
    if (hasAlert) bonus += 5;
    return bonus;
  }, [finalStats.dex, finalStats.int, selectedSubclassId, activeClass, asiChoices]);

  // Passive Perception (incorporates double proficiency for Expertise and Observant feat)
  const calculatedPassivePerception = useMemo(() => {
    const wisMod = getMod(finalStats.wis);
    const hasPerception = totalSkills.includes('Percepción');
    const hasPerceptionExpertise = validExpertiseSkills.includes('Percepción');
    
    let skillBonus = 0;
    if (hasPerceptionExpertise) {
      skillBonus = 2 * profBonus;
    } else if (hasPerception) {
      skillBonus = profBonus;
    }

    // Observant feat (+5 passive perception)
    const hasObservant = Object.values(asiChoices).some((c) => c.type === 'feat' && c.featId === 'observador');
    const featBonus = hasObservant ? 5 : 0;

    return 10 + wisMod + skillBonus + featBonus;
  }, [finalStats.wis, totalSkills, validExpertiseSkills, profBonus, asiChoices]);

  const savingThrows = useMemo(() => {
    const list = [...(activeClass?.savingThrows || [])];
    Object.values(asiChoices).forEach((c) => {
      if (c.type === 'feat' && c.featId === 'resiliente' && c.featAbilityChoice) {
        const statName = ABILITY_SCORE_EXPLANATIONS[c.featAbilityChoice]?.name;
        if (statName && !list.includes(statName)) {
          list.push(statName);
        }
      }
    });
    return list;
  }, [activeClass, asiChoices]);

  // Wizard cantrips compendium list (for High Elf / Kobold / etc. cantrip choices)
  const wizardCantripsList = useMemo(() => {
    return OFFICIAL_SPELLS_COMPENDIUM.filter((s) => s.level === 0 && (s.classes || []).some((cls) => cls.toLowerCase() === 'mago')).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Racial innate spellcasting configuration & traits
  const racialSpellcastingInfo = useMemo(() => {
    const config = activeSubrace?.spellcastingConfig || activeRace?.spellcastingConfig;
    const innate = [
      ...(activeRace?.innateSpells || []),
      ...(activeSubrace?.innateSpells || []),
    ];
    const hasSpells = innate.length > 0 || Boolean(config?.hasCantripChoice);
    return {
      config,
      innateSpells: innate,
      hasRacialMagic: hasSpells,
    };
  }, [activeRace, activeSubrace]);

  // Effective racial spellcasting ability
  const effectiveRacialSpellAbility: 'int' | 'wis' | 'cha' = useMemo(() => {
    const config = racialSpellcastingInfo.config;
    if (config?.abilityChoices && config.abilityChoices.includes(racialSpellcastingAbility)) {
      return racialSpellcastingAbility;
    }
    if (config?.defaultAbility && ['int', 'wis', 'cha'].includes(config.defaultAbility)) {
      return config.defaultAbility as 'int' | 'wis' | 'cha';
    }
    return racialSpellcastingAbility || 'int';
  }, [racialSpellcastingInfo, racialSpellcastingAbility]);

  // Granted racial spells based on current character level and choices
  const grantedRacialSpells = useMemo<Spell[]>(() => {
    if (!racialSpellcastingInfo.hasRacialMagic) return [];
    const spells: Spell[] = [];
    const originName = activeSubrace?.name || activeRace?.name || 'Raza';

    // 1. Spells granted automatically by level (e.g. Earth Genasi: Blade Ward at lv1, Pass Without Trace at lv5)
    for (const entry of racialSpellcastingInfo.innateSpells) {
      if (characterLevel >= entry.requiredLevel) {
        const found = findSpellByNameOrAlias(entry.spellName);
        if (found) {
          spells.push({
            ...found,
            id: `char-spl-racial-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}-${activeRace?.id}`,
            prepared: true,
            isRacial: true,
            racialOrigin: originName,
            racialAbility: effectiveRacialSpellAbility,
            notes: entry.notes || `Magia racial innata (${originName})`,
          });
        }
      }
    }

    // 2. Chosen Cantrip (e.g. High Elf / Alto Elfo)
    if (racialSpellcastingInfo.config?.hasCantripChoice && selectedRacialCantrip) {
      const found = findSpellByNameOrAlias(selectedRacialCantrip);
      if (found) {
        spells.push({
          ...found,
          id: `char-spl-racial-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}-${activeRace?.id}`,
          prepared: true,
          isRacial: true,
          racialOrigin: originName,
          racialAbility: effectiveRacialSpellAbility,
          notes: `Truco racial elegido (${originName})`,
        });
      }
    }

    return spells;
  }, [racialSpellcastingInfo, characterLevel, activeRace, activeSubrace, effectiveRacialSpellAbility, selectedRacialCantrip]);

  // Synchronize granted racial spells into selectedSpells automatically
  useEffect(() => {
    setSelectedSpells((prev) => {
      const nonRacial = prev.filter((s) => !s.isRacial);
      const combined = [...nonRacial];
      for (const rSpell of grantedRacialSpells) {
        if (!combined.some((s) => s.name.toLowerCase() === rSpell.name.toLowerCase())) {
          combined.push(rSpell);
        }
      }
      return combined;
    });
  }, [grantedRacialSpells]);

  const spellLimits = useMemo(() => {
    if (!activeClass) {
      return {
        isCaster: false,
        casterType: 'none',
        maxCantrips: 0,
        maxPreparedOrKnown: 0,
        abilityUsed: 'int',
        abilityMod: 0,
        explanation: 'Sin clase seleccionada',
      } as import('../data/spellsData').SpellcastingLimits;
    }
    return getSpellcastingLimits(activeClass.name, characterLevel, finalStats, activeRace?.name || '');
  }, [activeClass, characterLevel, finalStats, activeRace]);

  const filteredSpells = useMemo(() => {
    if (!activeClass) {
      return {
        availableToChoose: [] as Spell[],
        higherLevelToBrowse: [] as Spell[],
        otherClassSpells: [] as Spell[],
        maxSpellLevel: 0,
        isCaster: false,
      };
    }
    return filterSpellsForCharacter(activeClass.name, characterLevel, activeRace?.name || '');
  }, [activeClass, characterLevel, activeRace]);

  const getRequiredCasterLevel = (spellLevel: number) => {
    if (spellLevel <= 0) return 1;
    const cName = (activeClass?.name || '').toLowerCase();
    if (cName.includes('paladín') || cName.includes('explorador')) {
      return Math.max(2, (spellLevel - 1) * 4 + 2);
    }
    return spellLevel * 2 - 1;
  };

  // Computed spells with level grouping, search, school filter, and sort mode
  const displayedSpellsData = useMemo(() => {
    let sourceList: Spell[] = [];
    if (!isCaster) {
      sourceList = spellScopeMode === 'all_compendium' ? OFFICIAL_SPELLS_COMPENDIUM : [];
    } else if (spellScopeMode === 'available') {
      sourceList = filteredSpells.availableToChoose;
    } else if (spellScopeMode === 'all_class') {
      sourceList = [...filteredSpells.availableToChoose, ...filteredSpells.higherLevelToBrowse];
    } else if (spellScopeMode === 'all_compendium') {
      sourceList = OFFICIAL_SPELLS_COMPENDIUM;
    } else {
      sourceList = filteredSpells.availableToChoose;
    }

    let filtered = sourceList;
    if (spellSearchQuery.trim()) {
      const q = spellSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.nameEn && s.nameEn.toLowerCase().includes(q)) ||
          s.school.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (spellSchoolFilter !== 'all') {
      filtered = filtered.filter((s) => s.school.toLowerCase().includes(spellSchoolFilter.toLowerCase()));
    }

    const sortSpells = (spells: Spell[]) => {
      return [...spells].sort((a, b) => {
        if (spellSortMode === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (spellSortMode === 'school') {
          const sc = a.school.localeCompare(b.school);
          return sc !== 0 ? sc : a.name.localeCompare(b.name);
        }
        if (a.level !== b.level) return a.level - b.level;
        return a.name.localeCompare(b.name);
      });
    };

    const cantrips = sortSpells(filtered.filter((s) => s.level === 0));
    const leveled = sortSpells(filtered.filter((s) => s.level > 0));

    // Group leveled spells strictly by level
    const leveledByLevel: { level: number; spells: Spell[] }[] = [];
    const levelMap = new Map<number, Spell[]>();
    for (const spl of leveled) {
      if (!levelMap.has(spl.level)) {
        levelMap.set(spl.level, []);
      }
      levelMap.get(spl.level)!.push(spl);
    }
    const sortedLevels = Array.from(levelMap.keys()).sort((a, b) => a - b);
    for (const lvl of sortedLevels) {
      leveledByLevel.push({ level: lvl, spells: levelMap.get(lvl)! });
    }

    return {
      cantrips,
      leveled,
      leveledByLevel,
      totalCount: filtered.length,
    };
  }, [
    filteredSpells,
    isCaster,
    spellScopeMode,
    spellSearchQuery,
    spellSchoolFilter,
    spellSortMode,
  ]);

  const selectedCantripsCount = selectedSpells.filter((s) => s.level === 0 && !s.isRacial).length;
  const selectedLeveledCount = selectedSpells.filter((s) => s.level > 0 && !s.isRacial).length;

  const toggleSpellChoice = (spell: Spell) => {
    const existingIndex = selectedSpells.findIndex((s) => s.name.toLowerCase() === spell.name.toLowerCase());
    if (existingIndex >= 0) {
      const existing = selectedSpells[existingIndex];
      // Los conjuros raciales innatos son permanentes por linaje y no se retiran manualmente
      if (existing.isRacial) return;
      setSelectedSpells((prev) => prev.filter((s) => s.name.toLowerCase() !== spell.name.toLowerCase()));
    } else {
      setSelectedSpells((prev) => [
        ...prev,
        {
          ...spell,
          id: 'char-spl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          prepared: true,
        },
      ]);
    }
  };

  const toggleClassSkill = (skillName: string) => {
    if (backgroundSkills.includes(skillName) || racialSkills.includes(skillName) || bonusRacialSkills.includes(skillName)) {
      return;
    }
    if (selectedClassSkills.includes(skillName)) {
      setSelectedClassSkills((prev) => prev.filter((s) => s !== skillName));
    } else {
      const allowedCount = classConfig?.count || 2;
      if (selectedClassSkills.length < allowedCount) {
        setSelectedClassSkills((prev) => [...prev, skillName]);
      }
    }
  };

  const toggleExpertiseSkill = (skillName: string) => {
    if (!totalSkills.includes(skillName)) return;
    if (expertiseSkills.includes(skillName)) {
      setExpertiseSkills((prev) => prev.filter((s) => s !== skillName));
    } else {
      if (expertiseSkills.length < expertiseConfig.allowedCount) {
        setExpertiseSkills((prev) => [...prev, skillName]);
      }
    }
  };

  // List of chosen feats with their choice details
  const chosenFeatsList = useMemo(() => {
    const list: { feat: OfficialFeat; choice: AsiFeatChoice }[] = [];
    Object.values(asiChoices).forEach((c) => {
      if (c.type === 'feat' && c.featId) {
        const feat = OFFICIAL_5E_FEATS.find((f) => f.id === c.featId);
        if (feat) {
          list.push({ feat, choice: c });
        }
      }
    });
    // Include bonus feat granted by active background (e.g. Strike of the Giants, Rune Shaper)
    if (activeBackground?.bonusFeatId) {
      const bFeat = OFFICIAL_5E_FEATS.find((f) => f.id === activeBackground.bonusFeatId);
      if (bFeat) {
        list.push({
          feat: bFeat,
          choice: {
            type: 'feat',
            featId: bFeat.id,
            featSubChoices: backgroundFeatSubChoice ? [backgroundFeatSubChoice] : undefined,
          },
        });
      }
    }
    return list;
  }, [asiChoices, activeBackground, backgroundFeatSubChoice]);

  // Equipped attacks from chosen equipment or defaults (dynamically responds to equipped items)
  const equippedAttacks: CharacterAttack[] = useMemo(() => {
    const attacks: CharacterAttack[] = [];

    // 1. Attacks from class starting equipment choices
    if (startingEquipmentConfig) {
      Object.entries(selectedEquipmentChoices).forEach(([grpId, optId]) => {
        const grp = startingEquipmentConfig.choiceGroups.find((g) => g.id === grpId);
        const opt = grp?.options.find((o) => o.id === optId);

        if (customWeaponChoices[grpId]) {
          attacks.push(
            generateAttackFromWeapon(customWeaponChoices[grpId], finalStats, profBonus, true)
          );
        } else if (opt?.attacks) {
          attacks.push(...opt.attacks);
        }
      });
    }

    // 2. Also detect attacks from fixed or background weapons in chosenEquipmentList
    chosenEquipmentList.forEach((item) => {
      const w = findWeaponByName(item);
      if (w) {
        const baseName = w.name.split('(')[0].trim().toLowerCase();
        const alreadyIn = attacks.some((a) => a.name.toLowerCase().includes(baseName) || baseName.includes(a.name.toLowerCase()));
        if (!alreadyIn) {
          attacks.push(generateAttackFromWeapon(w, finalStats, profBonus, true));
        }
      }
    });

    const baseAttacks = attacks.length > 0
      ? attacks
      : (classConfig?.defaultAttacks || [
          {
            id: 'unarmed-strike',
            name: 'Ataque Desarmado',
            bonus: `+${Math.max(0, getMod(finalStats.str) + profBonus)}`,
            damage: `1 + ${getMod(finalStats.str)}`,
            type: 'Contundente',
          },
        ]);

    // 3. Filter active attacks based on what is currently equipped
    if (activeEquippedList.length > 0) {
      const active = baseAttacks.filter((atk) =>
        atk.id === 'unarmed-strike' ||
        activeEquippedList.some((eq) => {
          const eqLower = eq.toLowerCase();
          const atkLower = atk.name.toLowerCase();
          return eqLower.includes(atkLower) || atkLower.includes(eqLower);
        })
      );
      if (active.length > 0) return active;
      return [
        {
          id: 'unarmed-strike',
          name: 'Ataque Desarmado',
          bonus: `+${Math.max(0, getMod(finalStats.str) + profBonus)}`,
          damage: `1 + ${getMod(finalStats.str)}`,
          type: 'Contundente',
        },
      ];
    }

    return baseAttacks;
  }, [startingEquipmentConfig, selectedEquipmentChoices, customWeaponChoices, chosenEquipmentList, activeEquippedList, classConfig, finalStats, profBonus]);

  // Starting gold calculation - Strictly adheres to the background's official gold
  const startingGoldTotal = useMemo(() => {
    if (activeBackground && typeof activeBackground.gold === 'number') {
      return activeBackground.gold;
    }
    if (activeBackground?.suggestedEquipment) {
      const m = activeBackground.suggestedEquipment.match(/(\d+)\s*po/);
      if (m) return parseInt(m[1], 10);
    }
    return startingEquipmentConfig?.startingGold || 10;
  }, [startingEquipmentConfig, activeBackground]);

  // Saving Throw details with numeric bonus
  const savingThrowDetails = useMemo(() => {
    return (['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((stat) => {
      const statName = ABILITY_SCORE_EXPLANATIONS[stat].name;
      const isProficient = savingThrows.includes(statName);
      const statMod = getMod(finalStats[stat]);
      const totalBonus = statMod + (isProficient ? profBonus : 0);
      const bonusStr = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`;
      return {
        stat,
        statName,
        abbreviation: ABILITY_SCORE_EXPLANATIONS[stat].abbreviation,
        isProficient,
        totalBonus,
        bonusStr,
      };
    });
  }, [finalStats, savingThrows, profBonus]);

  // 18 Skills list with calculated numeric bonus and origin
  const skillDetails = useMemo(() => {
    return ALL_5E_SKILLS.map((sk) => {
      const isProficient = totalSkills.includes(sk.name);
      const isExpertise = validExpertiseSkills.includes(sk.name);
      const abilityMod = getMod(finalStats[sk.ability]);
      const totalBonus = abilityMod + (isExpertise ? 2 * profBonus : isProficient ? profBonus : 0);
      const bonusStr = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`;
      const isBg = backgroundSkills.includes(sk.name);
      const isRace = racialSkills.includes(sk.name) || bonusRacialSkills.includes(sk.name);
      const isClass = selectedClassSkills.includes(sk.name);
      let origin = '';
      if (isBg) origin = 'Trasfondo';
      else if (isRace) origin = 'Raza';
      else if (isClass) origin = 'Clase';
      else if (isProficient) origin = 'Dote/Otro';

      return {
        ...sk,
        isProficient,
        isExpertise,
        totalBonus,
        bonusStr,
        origin,
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [totalSkills, validExpertiseSkills, finalStats, profBonus, backgroundSkills, racialSkills, bonusRacialSkills, selectedClassSkills]);

  // Spellcasting details (DC, attack bonus, slots)
  const spellcastingDetails = useMemo(() => {
    if (!activeClass || (!isCaster && selectedSpells.length === 0)) return null;
    let ability: keyof AbilityScores = 'int';
    if (isCaster && spellLimits.abilityUsed) {
      ability = spellLimits.abilityUsed as keyof AbilityScores;
    } else {
      if (finalStats.cha >= finalStats.wis && finalStats.cha >= finalStats.int) ability = 'cha';
      else if (finalStats.wis >= finalStats.int) ability = 'wis';
      else ability = 'int';
    }
    const abilityMod = getMod(finalStats[ability] || 10);
    const saveDc = 8 + profBonus + abilityMod;
    const attackBonus = profBonus + abilityMod;
    const attackStr = attackBonus >= 0 ? `+${attackBonus}` : `${attackBonus}`;
    const slots = isCaster ? (FULL_CASTER_SLOTS_TABLE[characterLevel] || {}) : {};

    return {
      ability,
      abilityName: ABILITY_SCORE_EXPLANATIONS[ability]?.name || ability,
      abilityMod,
      saveDc,
      attackBonus,
      attackStr,
      slots,
    };
  }, [activeClass, isCaster, selectedSpells.length, spellLimits, finalStats, profBonus, characterLevel]);

  const buildFinalCharacterObject = (): Character => {
    // Build descriptive notes
    const featNotes = chosenFeatsList.length > 0
      ? `\n\nDotes Oficiales Elegidas:\n${chosenFeatsList
          .map(({ feat, choice }) => {
            let line = `• ${feat.name}: ${feat.benefits.join(' ')}`;
            if (choice.featAbilityChoice) {
              const statName = ABILITY_SCORE_EXPLANATIONS[choice.featAbilityChoice]?.name || choice.featAbilityChoice;
              line += ` [Mejora: +${feat.abilityBonus?.amount || 1} ${statName}]`;
            }
            if (choice.featSubChoices && choice.featSubChoices.length > 0 && feat.subChoice) {
              const selectedNames = choice.featSubChoices.map(
                (id) => feat.subChoice?.options.find((o) => o.id === id)?.name || id
              );
              line += ` [Selección de ${feat.subChoice.title}: ${selectedNames.join(', ')}]`;
            }
            return line;
          })
          .join('\n')}`
      : '';
    const expertiseNotes = validExpertiseSkills.length > 0
      ? `\n\nPericia (Doble Competencia x2) en:\n${validExpertiseSkills.join(', ')}`
      : '';

    const wealthStr = activeBackground ? formatBackgroundWealth(activeBackground) : `${startingGoldTotal} po`;
    const equipmentNotes = chosenEquipmentList.length > 0
      ? `\n\nInventario & Riqueza Inicial:\n• ${chosenEquipmentList.join('\n• ')}\n• Monedas: ${wealthStr}`
      : '';

    const roleplayNotes = [
      `Alineamiento: ${ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name || alignment || 'Sin definir'}`,
      personalityTraits.trim() ? `Rasgos de Personalidad & Virtudes:\n${personalityTraits.trim()}` : '',
      ideals.trim() ? `Ideales & Convicciones Morales:\n${ideals.trim()}` : '',
      bonds.trim() ? `Vínculos & Lazos de Vida:\n${bonds.trim()}` : '',
      flaws.trim() ? `Defectos, Debilidades & Tentaciones:\n${flaws.trim()}` : '',
      backstoryBrief.trim() ? `Historia & Pasado del Héroe:\n${backstoryBrief.trim()}` : '',
      activeBackground ? `Rasgo de Trasfondo (${activeBackground.name}):\n${activeBackground.featureName}: ${activeBackground.featureDescription}` : '',
      featNotes,
      expertiseNotes,
      equipmentNotes,
    ].filter(Boolean).join('\n\n');

    let casterSlots: any = {};
    if (isCaster && activeClass) {
      const norm = activeClass.name.toLowerCase();
      if (norm.includes('mago') || norm.includes('hechicero') || norm.includes('cler') || norm.includes('dru') || norm.includes('bard')) {
        const row = FULL_CASTER_SLOTS_TABLE[characterLevel] || {};
        casterSlots = Object.fromEntries(Object.entries(row).map(([k, max]) => [k, { max, used: 0 }]));
      } else if (norm.includes('palad') || norm.includes('explorador') || norm.includes('ranger')) {
        const row = HALF_CASTER_SLOTS_TABLE[characterLevel] || {};
        casterSlots = Object.fromEntries(Object.entries(row).map(([k, max]) => [k, { max, used: 0 }]));
      } else if (norm.includes('brujo') || norm.includes('warlock')) {
        const pact = WARLOCK_PACT_SLOTS_TABLE[characterLevel] || { count: 1, slotLevel: 1 };
        casterSlots = { [`lvl${pact.slotLevel}`]: { max: pact.count, used: 0 } };
      }
    }

    const spellAbility = activeClass?.spellcastingAbility;
    const effectiveSpellAbility = spellAbility || (grantedRacialSpells.length > 0 ? effectiveRacialSpellAbility : (selectedSpells.length > 0 ? (
      finalStats.cha >= finalStats.wis && finalStats.cha >= finalStats.int ? 'cha' :
      finalStats.wis >= finalStats.int ? 'wis' : 'int'
    ) : undefined));
    const effectiveSpellMod = effectiveSpellAbility ? getMod(finalStats[effectiveSpellAbility]) : 0;

    // Combine selectedSpells with spells granted by class decisions (Pacto del Tomo, Clérigo Naturaleza/Arcano, Bardo Secretos Mágicos)
    let combinedSpells = [...selectedSpells];
    const decisionSpellKeys = [
      'pactTomeCantrips',
      'clericNatureCantrip',
      'clericArcanaCantrips',
      'bardMagicalSecrets_6',
      'bardMagicalSecrets_10',
      'bardMagicalSecrets_14',
      'bardMagicalSecrets_18',
    ];
    decisionSpellKeys.forEach((key) => {
      const chosen = creatorClassDecisions[key] || [];
      chosen.forEach((spellName) => {
        const cleanName = spellName.split('(')[0].trim();
        if (!combinedSpells.some((s) => s.name.toLowerCase() === cleanName.toLowerCase())) {
          const found = findSpellByNameOrAlias(cleanName) || findSpellByNameOrAlias(spellName);
          if (found) {
            combinedSpells.push({
              ...found,
              id: `char-spl-decision-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}`,
              prepared: true,
              notes: `Concedido por decisión de clase: ${key}`,
            });
          }
        }
      });
    });

    // Inyectar automáticamente conjuros de especialista de artífice si aplica
    const isArtificerClass = (activeClass?.name || '').toLowerCase().includes('artifice') || (activeClass?.name || '').toLowerCase().includes('artífice');
    if (isArtificerClass && activeSubclass) {
      const specSpells = getArtificerSpecialistSpells(activeSubclass.name || activeSubclass.id, characterLevel);
      specSpells.forEach((splName) => {
        const cleanName = splName.split('(')[0].trim();
        const alreadyHas = combinedSpells.some((s) => s.name.toLowerCase() === cleanName.toLowerCase());
        if (!alreadyHas) {
          const found = findSpellByNameOrAlias(cleanName) || findSpellByNameOrAlias(splName);
          if (found) {
            combinedSpells.push({
              ...found,
              id: `char-spl-artificer-spec-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}`,
              prepared: true,
              notes: `Conjuro de Especialista (${activeSubclass.name}). Siempre preparado sin contar en tu límite diario.`,
            });
          }
        }
      });
    }

    const finalSkillsList = [...totalSkills];
    const knowledgeSkills = creatorClassDecisions['clericKnowledgeSkills'] || [];
    knowledgeSkills.forEach((sk) => {
      const cleanSkill = sk.split('(')[0].trim();
      if (!finalSkillsList.includes(cleanSkill)) finalSkillsList.push(cleanSkill);
    });
    const natureSkills = creatorClassDecisions['clericNatureSkill'] || [];
    natureSkills.forEach((sk) => {
      const cleanSkill = sk.split('(')[0].trim();
      if (!finalSkillsList.includes(cleanSkill)) finalSkillsList.push(cleanSkill);
    });

    const knowledgeLangs = creatorClassDecisions['clericKnowledgeLanguages'] || [];
    const finalLanguagesList = Array.from(new Set([
      ...(activeRace?.languages || ['Común']),
      ...selectedBackgroundLanguages,
      ...knowledgeLangs.map((l) => l.split('(')[0].trim()),
    ]));

    const charId = initialCharacter?.id || ('char-' + Date.now());
    const finalCampaignId = initialCharacter?.campaignId || campaignId;
    const finalCampaignIds = initialCharacter?.campaignIds || (campaignId ? [campaignId] : []);

    return {
      id: charId,
      campaignId: finalCampaignId,
      campaignIds: finalCampaignIds,
      name: characterName.trim() || (initialCharacter?.name || 'Héroe sin Nombre'),
      playerName: playerName.trim() || (initialCharacter?.playerName || 'Jugador'),
      race: activeRace?.name || (initialCharacter?.race || 'Sin Raza'),
      subrace: activeSubrace?.name || (initialCharacter?.subrace || ''),
      class: activeClass?.name || (initialCharacter?.class || 'Aventurero'),
      subclass: activeSubclass?.name || (initialCharacter?.subclass || ''),
      multiclass: initialCharacter?.multiclass && initialCharacter.multiclass.length > 1
        ? initialCharacter.multiclass
        : [
            {
              className: activeClass?.name || (initialCharacter?.class || 'Aventurero'),
              level: characterLevel,
              subclass: activeSubclass?.name || (initialCharacter?.subclass || undefined),
              hitDie: activeClass?.hitDie || 8,
              isPrimary: true,
            },
          ],
      background: activeBackground?.name || (initialCharacter?.background || 'Aventurero'),
      level: characterLevel,
      maxHp: calculatedMaxHp,
      currentHp: initialCharacter ? Math.min(initialCharacter.currentHp, calculatedMaxHp) : calculatedMaxHp,
      tempHp: initialCharacter?.tempHp || 0,
      ac: calculatedAc,
      initiativeBonus: calculatedInitiative,
      speed: calculatedSpeedResult.speedStr,
      passivePerception: calculatedPassivePerception,
      stats: finalStats,
      savingThrows,
      skills: finalSkillsList,
      classResources: generateClassResourcesForCharacter(
        activeClass?.name || '',
        characterLevel,
        finalStats,
        undefined,
        activeSubclass?.name || activeSubclass?.id
      ),
      attacks: equippedAttacks.length > 0 ? equippedAttacks : (classConfig?.defaultAttacks || [
        {
          id: 'unarmed-strike',
          name: 'Ataque Desarmado',
          bonus: `+${Math.max(0, getMod(finalStats.str) + profBonus)}`,
          damage: `1 + ${getMod(finalStats.str)}`,
          type: 'Contundente',
        },
      ]),
      spellSlots: isCaster ? casterSlots : undefined,
      spells: combinedSpells,
      spellcastingAbility: effectiveSpellAbility,
      racialSpellcastingAbility: racialSpellcastingInfo.hasRacialMagic ? effectiveRacialSpellAbility : undefined,
      spellSaveDc: effectiveSpellAbility ? 8 + profBonus + effectiveSpellMod : undefined,
      spellAttackBonus: effectiveSpellAbility ? profBonus + effectiveSpellMod : undefined,
      alignment: alignment ? (ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name || alignment) : (initialCharacter?.alignment || 'Neutral'),
      personalityTraits: personalityTraits.trim() || undefined,
      ideals: ideals.trim() || undefined,
      bonds: bonds.trim() || undefined,
      flaws: flaws.trim() || undefined,
      backstory: backstoryBrief.trim() || undefined,
      notes: roleplayNotes,
      avatarUrl: avatarUrl || initialCharacter?.avatarUrl || '',
      avatarFrame: avatarFrame || initialCharacter?.avatarFrame || 'frame-royal-gold',
      avatarScale: avatarScale ?? initialCharacter?.avatarScale ?? 1,
      avatarOffsetY: avatarOffsetY ?? initialCharacter?.avatarOffsetY ?? 0,
      gold: initialCharacter?.gold !== undefined ? initialCharacter.gold : startingGoldTotal,
      silver: initialCharacter?.silver !== undefined ? initialCharacter.silver : (activeBackground?.silver ?? 0),
      copper: initialCharacter?.copper !== undefined ? initialCharacter.copper : (activeBackground?.copper ?? 0),
      platinum: initialCharacter?.platinum !== undefined ? initialCharacter.platinum : (activeBackground?.platinum ?? 0),
      inventory: chosenEquipmentList.length > 0 ? chosenEquipmentList : (initialCharacter?.inventory || []),
      equippedItems: activeEquippedList,
      tools: backgroundTools.length > 0 ? backgroundTools : (initialCharacter?.tools || []),
      languages: finalLanguagesList,
      classDecisions: creatorClassDecisions,
      isDraft: false,
      lastSavedAt: new Date().toISOString(),
      creatorState: {
        currentStep,
        characterName,
        playerName,
        avatarUrl,
        avatarFrame,
        avatarScale,
        avatarOffsetY,
        alignment,
        personalityTraits,
        ideals,
        bonds,
        flaws,
        backstoryBrief,
        rollMethod,
        diceRolls,
        manualRolls,
        assignedStats,
        assignedSourceIndex,
        selectedRaceId,
        selectedSubraceId,
        flexibleRacialChoices,
        bonusRacialSkills,
        racialSpellcastingAbility,
        selectedRacialCantrip,
        asiChoices,
        bonusCampaignFeat,
        selectedClassId,
        selectedSubclassId,
        characterLevel,
        selectedClassSkills,
        expertiseSkills,
        selectedFightingStyle,
        classDecisions: creatorClassDecisions,
        selectedBackgroundId,
        selectedBackgroundSkills,
        selectedBackgroundTools,
        selectedBackgroundLanguages,
        backgroundFeatSubChoice,
        selectedBackgroundEquipmentChoices,
        selectedEquipmentChoices,
        customWeaponChoices,
        equippedItems: activeEquippedList,
        selectedSpells,
      },
    };
  };

  const handleFinalSave = () => {
    const finalCharacter = buildFinalCharacterObject();
    onSave(finalCharacter);
    onClose();
  };

  const handleSaveDraft = () => {
    const finalCharacter = buildFinalCharacterObject();
    const draftChar: Character = {
      ...finalCharacter,
      name: characterName.trim() || (initialCharacter?.name || 'Borrador sin Nombre'),
      isDraft: true,
      draftStep: currentStep,
      draftProgress: completionMetrics.percentage,
      lastSavedAt: new Date().toISOString(),
    };
    if (onSaveDraft) {
      onSaveDraft(draftChar);
    } else {
      onSave(draftChar);
    }
    onClose();
  };

  const handleAttemptClose = () => {
    const hasData =
      characterName.trim() ||
      selectedRaceId ||
      selectedClassId ||
      selectedBackgroundId ||
      Object.keys(assignedStats).length > 0;
    if (hasData) {
      setShowExitConfirmModal(true);
    } else {
      onClose();
    }
  };

  const handleExportOfficialPdfFromCreator = async () => {
    setIsExportingPdf(true);
    try {
      const char = buildFinalCharacterObject();
      await exportCharacterToOfficialPdf(char);
    } catch (err) {
      console.error('Error exportando PDF oficial:', err);
      setThemedAlert({
        isOpen: true,
        title: 'Error de Exportación',
        subtitle: 'Hoja Oficial de Personaje D&D 5e',
        type: 'danger',
        message: 'Hubo un problema al exportar el PDF oficial. Por favor revisa la consola.',
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Dynamic real-time character completion calculation (Magical Violet Progress Bar)
  const completionMetrics = useMemo(() => {
    let score = 0;
    const pendingItems: string[] = [];

    // 1. Nombre (15%)
    if (characterName.trim()) {
      score += 15;
    } else {
      pendingItems.push('Nombre');
    }

    // 2. Raza & Subraza si aplica (15%)
    if (selectedRaceId) {
      if (activeRace?.subraces && activeRace.subraces.length > 0) {
        if (selectedSubraceId) {
          score += 15;
        } else {
          score += 8;
          pendingItems.push('Subraza');
        }
      } else {
        score += 15;
      }
    } else {
      pendingItems.push('Raza');
    }

    // 3. Clase & Habilidades (20%)
    if (selectedClassId) {
      score += 12;
      const skillsRequired = classConfig?.count || 2;
      if (selectedClassSkills.length >= skillsRequired) {
        score += 8;
      } else {
        pendingItems.push(`Habilidades (${selectedClassSkills.length}/${skillsRequired})`);
      }
    } else {
      pendingItems.push('Clase');
    }

    // 4. Características (6 stats) (25%)
    const assignedCount = (['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).filter(
      (st) => assignedStats[st] !== undefined
    ).length;
    score += Math.round((assignedCount / 6) * 25);
    if (assignedCount < 6) {
      pendingItems.push(`Características (${assignedCount}/6)`);
    }

    // 5. Trasfondo (15%)
    if (selectedBackgroundId) {
      score += 15;
    } else {
      pendingItems.push('Trasfondo');
    }

    // 6. Alineamiento & Avatar / Roleplay (10%)
    let roleplayScore = 0;
    if (alignment) roleplayScore += 4;
    else pendingItems.push('Alineamiento');
    if (avatarUrl) roleplayScore += 3;
    if (personalityTraits || ideals || bonds || flaws) roleplayScore += 3;
    score += roleplayScore;

    return {
      percentage: Math.min(100, Math.max(0, score)),
      pendingSummary: pendingItems.length > 0 ? `Falta: ${pendingItems.slice(0, 3).join(', ')}${pendingItems.length > 3 ? '...' : ''}` : '¡Héroe listo para la batalla!',
    };
  }, [
    characterName,
    selectedRaceId,
    activeRace,
    selectedSubraceId,
    selectedClassId,
    classConfig,
    selectedClassSkills,
    assignedStats,
    selectedBackgroundId,
    alignment,
    avatarUrl,
    personalityTraits,
    ideals,
    bonds,
    flaws,
  ]);

  // Roleplay options helper based on selected background
  const currentRoleplayOptions = useMemo(() => {
    return getRoleplayOptionsForBackground(selectedBackgroundId);
  }, [selectedBackgroundId]);

  const handleTogglePersonalityTrait = (traitText: string) => {
    const clean = traitText.trim();
    if (personalityTraits.includes(clean)) {
      const remaining = personalityTraits
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.includes(clean));
      setPersonalityTraits(remaining.join('\n\n'));
    } else {
      const currentLines = personalityTraits
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (currentLines.length >= 2) {
        setPersonalityTraits(`${currentLines[currentLines.length - 1]}\n\n• ${clean}`);
      } else if (currentLines.length === 1) {
        const first = currentLines[0].startsWith('• ') ? currentLines[0] : `• ${currentLines[0]}`;
        setPersonalityTraits(`${first}\n\n• ${clean}`);
      } else {
        setPersonalityTraits(`• ${clean}`);
      }
    }
  };

  const handleSelectIdeal = (idealText: string, tag?: string) => {
    const fullText = tag ? `${idealText} [${tag}]` : idealText;
    if (ideals.includes(idealText.trim())) {
      setIdeals('');
    } else {
      setIdeals(fullText);
    }
  };

  const handleSelectBond = (bondText: string) => {
    const clean = bondText.trim();
    if (bonds.includes(clean)) {
      setBonds('');
    } else {
      setBonds(clean);
    }
  };

  const handleSelectFlaw = (flawText: string) => {
    const clean = flawText.trim();
    if (flaws.includes(clean)) {
      setFlaws('');
    } else {
      setFlaws(clean);
    }
  };

  const handleRollPersonalityTrait = () => {
    const opt1 = rollRandomOption(currentRoleplayOptions.personalityTraits);
    const available = currentRoleplayOptions.personalityTraits.filter((o) => o.text !== opt1.text);
    const opt2 = available.length > 0 ? rollRandomOption(available) : opt1;
    setPersonalityTraits(`• ${opt1.text}\n\n• ${opt2.text}`);
  };

  const handleRollIdeal = () => {
    const opt = rollRandomOption(currentRoleplayOptions.ideals);
    const textWithTag = opt.tag ? `${opt.text} [${opt.tag}]` : opt.text;
    setIdeals(textWithTag);
  };

  const handleRollBond = () => {
    const opt = rollRandomOption(currentRoleplayOptions.bonds);
    setBonds(opt.text);
  };

  const handleRollFlaw = () => {
    const opt = rollRandomOption(currentRoleplayOptions.flaws);
    setFlaws(opt.text);
  };

  const handleRollAllRoleplay = () => {
    const pt1 = rollRandomOption(currentRoleplayOptions.personalityTraits);
    const ptAvailable = currentRoleplayOptions.personalityTraits.filter((o) => o.text !== pt1.text);
    const pt2 = ptAvailable.length > 0 ? rollRandomOption(ptAvailable) : pt1;
    const id = rollRandomOption(currentRoleplayOptions.ideals);
    const bd = rollRandomOption(currentRoleplayOptions.bonds);
    const fl = rollRandomOption(currentRoleplayOptions.flaws);

    setPersonalityTraits(`• ${pt1.text}\n\n• ${pt2.text}`);
    setIdeals(id.tag ? `${id.text} [${id.tag}]` : id.text);
    setBonds(bd.text);
    setFlaws(fl.text);
  };

  const STEPS: { id: CreatorStep; num: number; title: string; subtitle: string; icon: any }[] = useMemo(() => {
    return [
      { id: 'identity', num: 1, title: 'Identidad', subtitle: 'Nombre & Apariencia', icon: User },
      { id: 'race', num: 2, title: 'Raza & Linaje', subtitle: 'Atributos & Rasgos', icon: Award },
      { id: 'background', num: 3, title: 'Trasfondo & Rol', subtitle: 'Historia & Convicciones', icon: BookOpen },
      { id: 'class', num: 4, title: 'Clase & Nivel', subtitle: 'Clase, Rasgos & Hab.', icon: Sword },
      { id: 'abilities', num: 5, title: 'Puntuaciones', subtitle: 'Tirada 4d6 & Stats', icon: Dices },
      { id: 'asi_feats', num: 6, title: 'Dotes & Stats', subtitle: 'Puntuaciones & Dotes', icon: Star },
      { id: 'spells', num: 7, title: 'Conjuración', subtitle: isCaster ? 'Trucos & Grimorio' : 'Magia Innata / Opcional', icon: Sparkles },
      { id: 'equipment', num: 8, title: 'Inventario', subtitle: 'Equipo Inicial & Oro', icon: Backpack },
      { id: 'review', num: 9, title: 'Forjar Personaje', subtitle: 'Ficha Final & Dossier', icon: Check },
    ];
  }, [isCaster]);

  const isStepCompleted = (stepId: CreatorStep): boolean => {
    switch (stepId) {
      case 'identity':
        return Boolean(characterName.trim());
      case 'race':
        return Boolean(selectedRaceId);
      case 'background':
        return Boolean(selectedBackgroundId);
      case 'class':
        return Boolean(selectedClassId);
      case 'abilities':
        return (['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).every(
          (k) => assignedStats[k] !== undefined
        );
      case 'asi_feats':
        return Boolean(characterLevel >= 1);
      case 'spells':
        return !isCaster || selectedSpells.length > 0;
      case 'equipment':
        return chosenEquipmentList.length > 0 || (initialCharacter?.inventory?.length || 0) > 0;
      case 'review':
        return completionMetrics.percentage >= 95;
      default:
        return false;
    }
  };

  const currentStepIndex = useMemo(() => {
    const idx = STEPS.findIndex((s) => s.id === currentStep);
    return idx >= 0 ? idx : 0;
  }, [STEPS, currentStep]);

  useEffect(() => {
    if (!STEPS.some((s) => s.id === currentStep)) {
      setCurrentStep(STEPS[0]?.id || 'identity');
    }
  }, [STEPS, currentStep]);

  // Scroll to top whenever changing steps or review sub-tabs
  useEffect(() => {
    if (stepContentContainerRef.current) {
      stepContentContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentStep, reviewTab]);

  const goToNextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      if (nextIdx < STEPS.length) {
        setCurrentStep(STEPS[nextIdx].id);
        stepContentContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      if (prevIdx >= 0) {
        setCurrentStep(STEPS[prevIdx].id);
        stepContentContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  const tutorialContext = useMemo<TutorialContext>(() => ({
    currentStep: currentStep as TutorialContext['currentStep'],
    characterLevel,
    activeRace,
    activeSubrace,
    selectedRaceId,
    selectedSubraceId,
    raceAnyCount,
    hasBonusRacialSkills:
      (selectedRaceId === 'humano' && selectedSubraceId === 'humano-variante') ||
      selectedRaceId === 'semielfo' ||
      selectedRaceId === 'kenku' ||
      selectedRaceId === 'cambiaformas' ||
      selectedRaceId === 'leonin',
    hasRacialMagic: racialSpellcastingInfo.hasRacialMagic,
    activeBackground,
    activeClass,
    activeSubclass,
    subclassUnlockLevel,
    isSubclassUnlocked,
    isCaster,
    hasTacticalFeatures,
    hasExpertise: expertiseConfig.allowedCount > 0,
    hasFightingStyle:
      ['guerrero', 'paladin', 'explorador'].includes(activeClass?.id || '') && hasTacticalFeatures,
    pendingDecisionsCount: pendingCreationDecisions.length,
    hasBackgroundBonusFeat: !!activeBackground?.bonusFeatId,
    hasBackgroundTools: !!activeBackground?.toolChoices,
    hasBackgroundLanguages:
      ((activeBackground?.languagesCount && activeBackground.languagesCount > 0) ||
        (activeBackground?.fixedLanguages && activeBackground.fixedLanguages.length > 0)) ||
      false,
    hasBackgroundTrinkets: !!(
      activeBackground?.equipmentChoices && activeBackground.equipmentChoices.length > 0
    ),
    hasBackgroundSkillChoices: !!activeBackground?.skillChoices,
  }), [
    currentStep,
    characterLevel,
    activeRace,
    activeSubrace,
    selectedRaceId,
    selectedSubraceId,
    raceAnyCount,
    racialSpellcastingInfo.hasRacialMagic,
    activeBackground,
    activeClass,
    activeSubclass,
    subclassUnlockLevel,
    isSubclassUnlocked,
    isCaster,
    hasTacticalFeatures,
    expertiseConfig.allowedCount,
    pendingCreationDecisions.length,
  ]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen overflow-hidden bg-[#100905] animate-fadeIn font-serif text-[#2c241b]">
      {/* Outer Container Filling Full Screen */}
      <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#100905] text-[#2c241b]">
        
        {/* TOP LEATHER HEADER: Antique Mahogany & Forged Bronze Controls Bar */}
        <div
          id="creator-tour-header"
          className="border-b border-[#8c672b]/70 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 shadow-sm shrink-0 text-[#f7f2ea]"
          style={{
            backgroundImage: 'linear-gradient(rgba(24, 15, 9, 0.78), rgba(16, 10, 6, 0.88)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '550px auto',
            backgroundColor: '#1a1009',
          }}
        >
          {/* Left: Mythweaver Dragon Emblem + Title + Progress */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <img
              src="/assets/ui/logo_minimalist_mythweaver.png"
              alt="Mythweaver"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_8px_rgba(255,200,80,0.6)] shrink-0"
            />
            
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap">
              <span
                className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest uppercase select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] shrink-0"
                style={{
                  fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                  background: 'linear-gradient(180deg, #fff9e6 0%, #dfbe7e 40%, #b88c32 75%, #7a581e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Creador de Héroes 5e
              </span>

              {initialCharacter && !initialCharacter.isDraft && (
                <span className="text-[10px] bg-[#24170d] text-[#ffd56b] px-2 py-0.5 rounded-lg border border-[#8c672b]/80 font-mono font-bold flex items-center gap-1 shadow-xs truncate max-w-[130px] sm:max-w-xs">
                  <span>🛠️</span>
                  <span className="truncate text-white">{initialCharacter.name}</span>
                </span>
              )}
              {initialCharacter?.isDraft && (
                <span className="text-[10px] bg-[#24170d] text-[#fcd34d] px-2 py-0.5 rounded-lg border border-[#d97706]/80 font-mono font-bold flex items-center gap-1 shadow-xs">
                  <span>📝 Borrador</span>
                </span>
              )}

              {/* Compact Completion Pill */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#180e07] border border-[#8c672b]/60 text-[10.5px] font-mono cursor-help shrink-0 shadow-xs"
                title={`Progreso del Héroe: ${completionMetrics.percentage}%\n${completionMetrics.pendingSummary}`}
              >
                <Sparkles className="w-3 h-3 text-[#ffd56b] animate-pulse" />
                <span className="text-[#ffd56b] font-bold">{completionMetrics.percentage}%</span>
                <span className="text-[#dfbe7e]/75 text-[9.5px] truncate max-w-[130px] hidden md:inline">
                  • {completionMetrics.pendingSummary}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Controls: Forged Bronze Buttons */}
          {/* Center Live Quick Stats in Top Bar */}
          <div className="hidden md:flex items-center gap-2.5 font-mono font-bold text-[11px] px-3 py-1 rounded-full bg-[#180e07]/85 border border-[#8c672b]/60 text-[#dfbe7e] shadow-xs">
            <span className="text-[#ffd56b] font-fantasy font-semibold truncate max-w-[140px]">{characterName || 'Héroe'} (Nv {characterLevel})</span>
            <span className="text-[#8c672b]">•</span>
            <span className="text-[#5ce68b] flex items-center gap-0.5"><Heart className="w-3 h-3 fill-[#5ce68b]" /> {activeClass ? calculatedMaxHp : '-'}</span>
            <span className="text-[#ffd56b] flex items-center gap-0.5"><Shield className="w-3 h-3" /> {calculatedAc}</span>
            <span className="text-[#7ec5ff] flex items-center gap-0.5"><Zap className="w-3 h-3" /> {calculatedInitiative >= 0 ? `+${calculatedInitiative}` : calculatedInitiative}</span>
            <span className="text-[#e8b57b] flex items-center gap-0.5"><Eye className="w-3 h-3" /> {calculatedPassivePerception}</span>
          </div>

          <div id="creator-header-view-controls" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {currentStep === 'review' && (
              <button
                type="button"
                onClick={handleExportOfficialPdfFromCreator}
                disabled={isExportingPdf}
                className="px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] border border-[#8c672b]/70 shadow-sm active:scale-95 disabled:opacity-50"
                title="Descargar Hoja Oficial 5e (PDF editable de 3 páginas)"
              >
                <FileDown className="w-3.5 h-3.5 text-[#ffd56b]" />
                <span className="hidden md:inline">{isExportingPdf ? 'Exportando PDF...' : 'Exportar PDF'}</span>
              </button>
            )}
            <button
              id="creator-save-draft-btn"
              type="button"
              onClick={handleSaveDraft}
              className="px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] border border-[#8c672b]/70 shadow-sm active:scale-95"
              title="Guardar progreso actual como borrador y continuar en otro momento"
            >
              <Save className="w-3.5 h-3.5 text-[#dfbe7e]" />
              <span className="hidden sm:inline">Borrador</span>
            </button>

            {/* Live Sheet Preview Toggle Button */}
            <button
              id="creator-sidebar-toggle-btn"
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className={`px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${
                isSidebarOpen
                  ? 'bg-[#3b2313] text-[#ffd56b] border border-[#d4af37]'
                  : 'bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] border border-[#8c672b]/70'
              }`}
              title={isSidebarOpen ? "Colapsar previsualización de hoja (más espacio)" : "Ver previsualización de hoja"}
            >
              <Scroll className="w-3.5 h-3.5 text-[#dfbe7e]" />
              <span className="hidden sm:inline">{isSidebarOpen ? 'Ocultar Hoja' : 'Ver Hoja'}</span>
            </button>

            {/* Tutorial Dropdown Plaque */}
            <div className="relative" ref={tutorialMenuRef}>
              <button
                type="button"
                onClick={() => setIsTutorialMenuOpen((prev) => !prev)}
                className="px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm bg-gradient-to-r from-[#3b174a] to-[#261033] hover:from-[#4d1f61] hover:to-[#351647] text-[#e8c8fa] border border-[#8c4ba8]/60 hover:text-white active:scale-95"
                title="Menú de tutorial interactivo paso a paso"
              >
                <span>🎓</span>
                <span className="hidden md:inline">Tutorial</span>
                <ChevronDown className={`w-3 h-3 text-[#d2a3ea] transition-transform ${isTutorialMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTutorialMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-[#20150d] border-2 border-[#b88c32] rounded-xl shadow-2xl z-50 p-2 space-y-1.5 font-serif animate-fadeIn">
                  <div className="px-2 py-1 border-b border-[#5a4325] text-left">
                    <span className="text-[10px] font-fantasy uppercase tracking-wider text-[#d4af59] font-bold block">
                      Guía Interactiva 5e
                    </span>
                    <span className="text-[11px] text-[#e8dcd0]">
                      Elige el tipo de recorrido:
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTutorialMenuOpen(false);
                      startCharacterCreatorTutorial(tutorialContext, (stepId) => setCurrentStep(stepId as CreatorStep), 'full');
                    }}
                    className="w-full text-left p-2 rounded-lg bg-[#2e1d13] hover:bg-[#422919] text-[#f7f2ea] border border-[#5a4325] transition cursor-pointer flex flex-col gap-0.5 group"
                  >
                    <span className="font-fantasy font-bold text-xs text-[#f2cb6b] group-hover:text-white flex items-center gap-1.5">
                      🧭 Recorrido Completo (1 al 9)
                    </span>
                    <span className="text-[10.5px] text-[#d6c4aa] opacity-90 leading-tight">
                      Guía paso a paso desde la identidad hasta la exportación a PDF.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTutorialMenuOpen(false);
                      startCharacterCreatorTutorial(tutorialContext, (stepId) => setCurrentStep(stepId as CreatorStep), 'step');
                    }}
                    className="w-full text-left p-2 rounded-lg bg-[#2e1d13] hover:bg-[#422919] text-[#f7f2ea] border border-[#5a4325] transition cursor-pointer flex flex-col gap-0.5 group"
                  >
                    <span className="font-fantasy font-bold text-xs text-[#f2cb6b] group-hover:text-white flex items-center gap-1.5">
                      🎯 Guía de este Paso Actual
                    </span>
                    <span className="text-[10.5px] text-[#d6c4aa] opacity-90 leading-tight">
                      Explica sólo las opciones y subdecisiones de la pestaña activa.
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleAttemptClose}
              className="p-1.5 text-[#dfbe7e] hover:text-white hover:bg-[#8c2e28] rounded-lg border border-transparent hover:border-[#b84a44] transition cursor-pointer active:scale-95"
              title="Cerrar creador"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ULTRA-SLIM MAGICAL PROGRESS LINE (User: "ME encantó como quedó la barra de completitud") */}
        <div className="w-full h-1 bg-[#12081f] relative overflow-hidden shrink-0 border-b border-purple-900/40" title={`Progreso del héroe: ${completionMetrics.percentage}% (${completionMetrics.pendingSummary})`}>
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-400 to-amber-300 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.7)]"
            style={{ width: `${Math.max(3, completionMetrics.percentage)}%` }}
          />
        </div>

        {/* MAIN BODY: Tabletop with 9 Bookmark Tabs, Central Parchment Sheet and Right Preview Sidebar */}
        <div
          className="flex-1 w-full relative flex items-stretch justify-center p-1 sm:p-1.5 gap-2 lg:gap-3 overflow-hidden select-none"
          style={{
            backgroundImage: `url('/assets/creador_de_pj/mesa_quebracho_puro.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundColor: '#160d07',
          }}
        >
          {/* Floating Expand Tab When Sidebar is Collapsed */}
          {!isSidebarOpen && (
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-30 py-3.5 px-1.5 bg-[#24170d]/95 hover:bg-[#3d2714] text-[#dfbe7e] hover:text-[#ffd56b] border border-[#8c672b] rounded-l-xl shadow-[0_4px_16px_rgba(0,0,0,0.8)] transition-all flex flex-col items-center gap-1 cursor-pointer group hover:pr-2.5 active:scale-95"
              title="Desplegar previsualización de Hoja de Personaje"
            >
              <ChevronLeft className="w-4 h-4 text-[#ffd56b] group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[9px] font-fantasy font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
                Hoja en Vivo
              </span>
            </button>
          )}

          {/* ========================================================= */}
          {/* CENTRAL PARCHMENT FOLIO (Creation Steps 1 to 9) */}
          {/* Centered on the pure Quebracho table with all tabs and sheets safely inside */}
          {/* ========================================================= */}
          <div className={`${isSidebarOpen ? 'flex-1' : 'w-full max-w-[97%] xl:max-w-[95%] 2xl:max-w-[1600px]'} h-full relative flex flex-col min-w-0 z-10 pl-11 sm:pl-14 transition-all duration-300`}>
            
            {/* 9 LEATHER BOOKMARK TABS (SEÑALADORES ENGARZADOS AL BORDE IZQUIERDO) */}
            <nav
              id="creator-vertical-steps"
              className="absolute left-0 top-6 sm:top-8 flex flex-col gap-1.5 sm:gap-2 select-none pointer-events-auto"
              aria-label="Pasos de Creación de Personaje"
            >
              {STEPS.map((step) => {
                const isCurrent = step.id === currentStep;
                const isCompleted = isStepCompleted(step.id);
                const Icon = step.icon;

                const isFirstStep = step.num === 1;
                const isLastStep = step.num === STEPS.length;
                let flyoutPositionClass = 'top-1/2 -translate-y-1/2';
                let notchPositionClass = 'top-1/2 -translate-y-1/2';
                if (isFirstStep) {
                  flyoutPositionClass = 'top-0';
                  notchPositionClass = 'top-3';
                } else if (isLastStep) {
                  flyoutPositionClass = 'bottom-0';
                  notchPositionClass = 'bottom-3';
                }

                // Dynamic snippet preview for the hover card
                let dynamicPreview = '';
                if (step.id === 'identity') {
                  dynamicPreview = characterName.trim() ? characterName : 'Sin definir';
                } else if (step.id === 'race') {
                  dynamicPreview = activeRace ? activeRace.name + (activeSubrace ? ` (${activeSubrace.name})` : '') : 'Sin seleccionar';
                } else if (step.id === 'background') {
                  dynamicPreview = activeBackground ? activeBackground.name : 'Sin seleccionar';
                } else if (step.id === 'class') {
                  dynamicPreview = activeClass ? `${activeClass.name} Nv${characterLevel}` : 'Sin seleccionar';
                } else if (step.id === 'abilities') {
                  const assigned = Object.keys(assignedStats).length;
                  dynamicPreview = `${assigned}/6 Atributos listos`;
                } else if (step.id === 'asi_feats') {
                  dynamicPreview = chosenFeatsList.length > 0 ? `${chosenFeatsList.length} Dotes elegidas` : 'Dotes & Mejoras';
                } else if (step.id === 'spells') {
                  dynamicPreview = !isCaster ? 'Opcional (No lanzador)' : `${selectedSpells.length} Conjuros listos`;
                } else if (step.id === 'equipment') {
                  dynamicPreview = `${chosenEquipmentList.length} Objetos • ${startingGoldTotal} po`;
                } else if (step.id === 'review') {
                  dynamicPreview = `${completionMetrics.percentage}% Completado`;
                }

                return (
                  <div
                    key={step.id}
                    className={`relative group flex items-center transition-all duration-300 ${
                      isCurrent ? 'z-30' : 'z-0'
                    }`}
                  >
                    {/* Step Tab Button - Real Leather Bookmark with Clamping Physics */}
                    <button
                      id={`step-nav-${step.id}`}
                      type="button"
                      onClick={() => {
                        setCurrentStep(step.id);
                        stepContentContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      style={{
                        backgroundImage: `url(${isCurrent ? '/assets/creador_de_pj/senalador_activo.png' : '/assets/creador_de_pj/senalador_inactivo.png'})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                      }}
                      className={`relative w-[98px] sm:w-[115px] h-[40px] sm:h-[46px] flex items-center transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'translate-x-0 filter drop-shadow-[0_4px_12px_rgba(255,213,107,0.75)]'
                          : 'hover:-translate-x-1 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.65)] opacity-90 hover:opacity-100'
                      }`}
                      aria-label={`Paso ${step.num}: ${step.title}`}
                    >
                      {/* Left Tongue Area: Icon + Step Number */}
                      <div className="w-[44px] sm:w-[50px] h-full flex items-center justify-center relative shrink-0">
                        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                          isCurrent
                            ? 'text-[#fff4d1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                            : isCompleted
                            ? 'text-[#ffd56b]'
                            : 'text-[#d6c0a6] group-hover:text-[#fff4d1]'
                        }`} />

                        {/* Step Number Badge */}
                        <span className={`absolute top-0.5 left-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8.5px] font-mono font-bold leading-none border shadow-xs ${
                          isCurrent
                            ? 'bg-[#3b1708] text-[#ffd56b] border-[#ffd56b]'
                            : isCompleted
                            ? 'bg-[#1c150e] text-[#e0b04a] border-[#8c672b]'
                            : 'bg-[#241a12] text-[#8c7862] border-[#4a3622]'
                        }`}>
                          {step.num}
                        </span>

                        {/* Completion Checkmark Badge */}
                        {isCompleted && !isCurrent && (
                          <span className="absolute bottom-0.5 right-1 w-3 h-3 rounded-full bg-emerald-700 text-white flex items-center justify-center border border-emerald-400 shadow-xs">
                            <Check className="w-2 h-2 text-white" />
                          </span>
                        )}
                      </div>

                      {/* Right Collar & Rivet:
                          When isCurrent (z-30): Overlaps onto the parchment paper (z-10), clamping on top!
                          When !isCurrent (z-0): Tucked under the parchment paper (z-10), collar & rivet are physically hidden under the paper! */}
                    </button>

                    {/* SIMS-STYLE EXPANDING HOVER CARD (Slides smoothly to the right) */}
                    <div className={`absolute left-full ${flyoutPositionClass} ml-3 z-50 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-200 ease-out`}>
                      <div className="relative bg-gradient-to-r from-[#1c140d] via-[#241a12] to-[#1c140d] border-2 border-[#b88c32] rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] p-2.5 min-w-[210px] max-w-[270px] text-left text-[#f7f2ea] backdrop-blur-md">
                        {/* Left pointer notch connecting to the icon button */}
                        <div className={`absolute -left-2 ${notchPositionClass} w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#b88c32]`} />

                        {/* Header Row: Step number & Status Tag */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#4d3620] pb-1 mb-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffd56b] flex items-center gap-1">
                            <span>Paso {step.num}</span>
                            <span className="text-[#786450]">/ 9</span>
                          </span>
                          {isCurrent ? (
                            <span className="text-[9px] bg-amber-950/90 text-amber-300 border border-amber-500/50 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                              Actual
                            </span>
                          ) : isCompleted ? (
                            <span className="text-[9px] bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              Listo
                            </span>
                          ) : (
                            <span className="text-[9px] bg-[#291e15] text-[#9c8975] border border-[#4d3620] px-1.5 py-0.2 rounded-full font-mono">
                              Pendiente
                            </span>
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="font-fantasy font-bold text-xs text-[#f5ebd7] leading-snug tracking-wide">
                          {step.title}
                        </div>
                        <div className="text-[10px] text-[#baa892] leading-tight mt-0.5">
                          {step.subtitle}
                        </div>

                        {/* Dynamic Selection Preview */}
                        {dynamicPreview && (
                          <div className="mt-2 pt-1.5 border-t border-[#3a2818] flex items-center justify-between gap-1 text-[10px]">
                            <span className="text-[#8c7862] text-[9px] uppercase font-mono">Estado:</span>
                            <span className="text-[#e0b04a] font-semibold truncate max-w-[150px]">
                              {dynamicPreview}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Quick Up/Down navigation arrows */}
              <div className="flex flex-col items-center gap-1 pt-1.5 w-[44px] sm:w-[50px] shrink-0">
                <button
                  type="button"
                  onClick={goToPrevStep}
                  disabled={currentStepIndex === 0}
                  className="w-7 h-5 sm:w-8 sm:h-6 rounded bg-[#1e150d]/90 hover:bg-[#2e2014] text-[#baa892] hover:text-[#ffd56b] border border-[#3d2c1d] flex items-center justify-center text-xs transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed shadow-xs"
                  title="Paso Anterior"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={currentStepIndex === STEPS.length - 1}
                  className="w-7 h-5 sm:w-8 sm:h-6 rounded bg-[#1e150d]/90 hover:bg-[#2e2014] text-[#baa892] hover:text-[#ffd56b] border border-[#3d2c1d] flex items-center justify-center text-xs transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed shadow-xs"
                  title="Siguiente Paso"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>

            {/* THE PARCHMENT SHEET BODY (Creation Step Content & Forms) */}
            <div className="relative flex-1 h-full flex flex-col rounded-2xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.75),0_6px_16px_rgba(0,0,0,0.5)] border border-[#a67c3b]/50 bg-[#fbf7ee] bg-[url('/assets/ui/parchment_clean_texture.png')] bg-repeat z-10">
            {/* Mini-HUD moved to top bar to maximize parchment space */}

            {/* Step Body (Scrollable Parchment Folio) */}
            <div ref={stepContentContainerRef} className="flex-1 overflow-y-auto p-1.5 sm:p-2 pl-6 sm:pl-8 space-y-1.5 bg-[#fbf7ee] bg-[url('/assets/ui/parchment_clean_texture.png')] bg-repeat shadow-inner">

              {/* ----------------------------------------------------- */}
              {/* STEP 1: IDENTITY & ROLEPLAY */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'identity' && (
                <div id="step-tab-identity-content" className="space-y-2.5">
                  {/* Compact Header Breadcrumb */}
                  <div className="py-0.5 px-2.5 rounded-lg bg-[#f5ede0]/90 border border-[#d6c4aa] flex items-center justify-between gap-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs text-[#5c4a35] min-w-0">
                      <Info className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />
                      <span className="truncate"><strong>Paso 1: Identidad & Apariencia</strong> — Define nombre, nivel, retrato y alineamiento.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => startCharacterCreatorTutorial(tutorialContext, (stepId) => setCurrentStep(stepId as CreatorStep), 'full')}
                      className="text-[10.5px] text-[#8c672b] hover:text-[#5c4a35] font-fantasy font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3 h-3 text-[#c59b27]" /> Tutorial Guiado
                    </button>
                  </div>

                  {/* Character, Player Name & Character Level - High Density */}
                  <div id="creator-identity-names" className={`grid grid-cols-1 ${isSidebarOpen ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-3'} gap-2.5 min-w-0 mt-6 sm:mt-7`}>
                    <div className="py-1 px-2 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] space-y-0.5 shadow-2xs min-w-0">
                      <label className="block text-[10.5px] font-bold font-fantasy text-[#4a361c] uppercase leading-tight">
                        Nombre del Personaje *
                      </label>
                      <input
                        type="text"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        placeholder="Nombre del personaje..."
                        className="w-full bg-white border border-[#d6c4aa] rounded-lg px-2.5 py-1 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner font-serif"
                      />
                      <span className="text-[10px] text-[#7a6448] block truncate">
                        El nombre con el que te conocerán en la campaña.
                      </span>
                    </div>

                    <div className="py-1 px-2 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] space-y-0.5 shadow-2xs min-w-0">
                      <label className="block text-[10.5px] font-bold font-fantasy text-[#4a361c] uppercase leading-tight">
                        Nombre del Jugador (Tú)
                      </label>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Nombre del jugador..."
                        className="w-full bg-white border border-[#d6c4aa] rounded-lg px-2.5 py-1 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner font-serif"
                      />
                      <span className="text-[10px] text-[#7a6448] block truncate">
                        Para identificar qué jugador controla al héroe.
                      </span>
                    </div>

                    {/* Level Selector in Step 1 */}
                    <div id="creator-identity-level" className="py-1 px-2 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] space-y-0.5 shadow-2xs min-w-0">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10.5px] font-bold font-fantasy text-[#4a361c] uppercase leading-tight">
                          Nivel del Personaje *
                        </label>
                        <span className="text-[9.5px] bg-[#8c672b] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                          PB +{profBonus}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => setCharacterLevel((lvl) => Math.max(1, lvl - 1))}
                          className="w-6 h-6 bg-white border border-[#d6c4aa] rounded-md text-xs font-bold text-[#4a361c] hover:bg-[#ede1ce] cursor-pointer shadow-xs flex items-center justify-center shrink-0 transition"
                          title="Bajar nivel"
                        >
                          -
                        </button>
                        <select
                          value={characterLevel}
                          onChange={(e) => setCharacterLevel(Number(e.target.value))}
                          className="min-w-0 flex-1 bg-white border border-[#d6c4aa] rounded-md px-1.5 py-1 text-xs text-[#2c241b] font-mono font-bold text-center focus:outline-none focus:border-[#8c672b] shadow-inner cursor-pointer truncate"
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => {
                            const pb = Math.floor((lvl - 1) / 4) + 2;
                            return (
                              <option key={lvl} value={lvl}>
                                Nivel {lvl} (PB +{pb})
                              </option>
                            );
                          })}
                        </select>
                        <button
                          type="button"
                          onClick={() => setCharacterLevel((lvl) => Math.min(20, lvl + 1))}
                          className="w-6 h-6 bg-white border border-[#d6c4aa] rounded-md text-xs font-bold text-[#4a361c] hover:bg-[#ede1ce] cursor-pointer shadow-xs flex items-center justify-center shrink-0 transition"
                          title="Subir nivel"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[10px] text-[#7a6448] block truncate">
                        {characterLevel <= 4 ? 'Tier 1: Héroes Locales (1-4)' :
                         characterLevel <= 10 ? 'Tier 2: Héroes del Reino (5-10)' :
                         characterLevel <= 16 ? 'Tier 3: Maestros del Reino (11-16)' :
                         'Tier 4: Leyendas del Multiverso (17-20)'}
                      </span>
                    </div>
                  </div>

                  {/* Avatar Picker & Alignment: Side-by-Side Dual Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-start">
                    {/* Left Column: Avatar & Frame */}
                    <div className="md:col-span-5">
                      <div id="creator-identity-avatar" className="p-2 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold font-fantasy text-[#4a361c] uppercase">
                            Retrato del Héroe
                          </label>
                          <span className="text-[10px] text-[#7a6448]">Marco personalizable</span>
                        </div>

                        <input
                          type="file"
                          ref={avatarFileInputRef}
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />

                        <div className="flex items-center gap-3 bg-[#fcf9f2] p-2 rounded-xl border border-[#d6c4aa]">
                          {/* Avatar Preview with Fantasy Frame */}
                          <div className="shrink-0 drop-shadow-[0_4px_8px_rgba(40,20,10,0.35)]">
                            <FantasyAvatarFrame
                              avatarUrl={avatarUrl}
                              name={characterName || 'Héroe'}
                              level={characterLevel}
                              frameStyle={avatarFrame}
                              size="md"
                              avatarScale={avatarScale}
                              avatarOffsetY={avatarOffsetY}
                              onClick={() => setAvatarModalOpen(true)}
                              showLevelBadge={true}
                              showExpandHint={true}
                            />
                          </div>

                          {/* Controls: Upload Button, Frame Chooser & URL input */}
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => avatarFileInputRef.current?.click()}
                                className="px-2.5 py-1 bg-[#8c672b] hover:bg-[#a67a33] text-white font-fantasy font-bold text-[11px] rounded-lg shadow-xs transition flex items-center gap-1 cursor-pointer ring-1 ring-[#c59b27]/40 active:scale-95"
                              >
                                <Upload className="w-3 h-3 text-amber-200" />
                                <span>Subir</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setAvatarModalOpen(true)}
                                className="px-2.5 py-1 bg-[#2b1f14] hover:bg-[#3d2b1c] text-[#dfbe7e] hover:text-[#ffd56b] font-fantasy font-bold text-[11px] rounded-lg border border-[#8c672b]/70 shadow-xs transition flex items-center gap-1 cursor-pointer active:scale-95"
                                title="Cambiar marco de fantasía y ajustar escala/encuadre"
                              >
                                <Sparkles className="w-3 h-3 text-[#ffd56b]" />
                                <span>Marco</span>
                              </button>

                              {avatarUrl && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAvatarUrl('');
                                    setCustomUploadedAvatar(null);
                                    setCustomAvatarInput('');
                                    if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
                                  }}
                                  className="px-2 py-1 bg-[#ede1ce] hover:bg-[#ded0bc] text-[#8c2e28] font-bold text-[11px] rounded-lg border border-[#cbb99f] transition flex items-center gap-1 cursor-pointer active:scale-95"
                                  title="Borrar avatar actual"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>

                            <div className="space-y-0.5">
                              <input
                                type="url"
                                placeholder="O pega URL de imagen..."
                                value={customAvatarInput || (avatarUrl && !avatarUrl.startsWith('data:') ? avatarUrl : '')}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomAvatarInput(val);
                                  if (val.trim()) {
                                    setAvatarUrl(val.trim());
                                  }
                                }}
                                className="w-full bg-white border border-[#d6c4aa] rounded-md px-2 py-0.5 text-[11px] text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner font-mono truncate"
                              />
                            </div>
                            <span className="text-[9.5px] text-[#7a6448] block leading-tight truncate">JPG, PNG, WEBP, GIF auto-ajustable</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Alignment */}
                    <div className="md:col-span-7">
                      <div id="creator-identity-alignment" className="p-2 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold font-fantasy text-[#4a361c] uppercase">
                            Alineamiento Moral & Filosófico
                          </label>
                          <span className="text-[10px] text-[#8c672b] font-mono font-bold">
                            {alignment ? ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name : 'Sin seleccionar'}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5">
                          {ALIGNMENT_OPTIONS.map((al) => (
                            <div
                              key={al.id}
                              onClick={() => setAlignment(al.id)}
                              className={`py-0.5 px-1.5 rounded-md border text-left cursor-pointer transition ${
                                alignment === al.id
                                  ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-xs'
                                  : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
                              }`}
                            >
                              <div className="font-fantasy font-bold text-[11px] flex items-center justify-between">
                                <span className="truncate">{al.name.split(' ')[0]} {al.name.split(' ')[1]}</span>
                                <span className="text-[9px] text-[#8c672b] font-mono font-bold shrink-0">{al.id}</span>
                              </div>
                              <p className="text-[9px] text-[#7a6448] mt-0.5 leading-tight truncate">{al.tagline}</p>
                            </div>
                          ))}
                        </div>

                        {alignment ? (
                          <p className="text-[10.5px] text-[#4a361c] bg-[#fcf9f2] py-1.5 px-2.5 rounded border border-[#dbcbb2] italic leading-relaxed break-words whitespace-normal shadow-2xs">
                            "{ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.description}"
                          </p>
                        ) : (
                          <p className="text-[10.5px] text-[#7a6448] bg-[#fcf9f2] py-1.5 px-2.5 rounded border border-[#dbcbb2] italic leading-relaxed break-words whitespace-normal shadow-2xs">
                            Selecciona el compás ético y moral que mejor represente las convicciones de tu personaje.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ----------------------------------------------------- */}
              {/* STEP 2: ABILITY SCORES (ROLLING / STANDARD ARRAY) */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'abilities' && (
                <div id="step-tab-abilities-content" className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Dices className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 5: Puntuaciones de Característica (Los 6 Pilares del Héroe)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tus seis características definen tus capacidades físicas y mentales. Puedes tirar <strong>4d6 descartando el menor</strong> seis veces con el lanzador virtual, escribir los resultados de tus <strong>dados físicos</strong> de la mesa, o usar la <strong>Matriz Estándar</strong> oficial.
                      </p>
                    </div>
                  </div>

                  {/* Ability Scores Workspace (Assignment & Drag & Drop Parent) */}
                  <div id="creator-abilities-assignment-grid" className="space-y-4">
                    {/* Method Selector & Active Rolling Tray */}
                    <div id="creator-abilities-methods" className="space-y-3">
                      {/* Mode Selector */}
                      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                        <button
                          type="button"
                          onClick={() => setRollMethod('roll')}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            rollMethod === 'roll'
                              ? 'bg-[#8c672b] text-white shadow'
                              : 'text-[#5c4a35] hover:text-[#2c241b]'
                          }`}
                        >
                          <Dices className="w-4 h-4" /> Lanzador Virtual (4d6 x 6)
                        </button>
                        <button
                          type="button"
                          onClick={() => setRollMethod('manual')}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            rollMethod === 'manual'
                              ? 'bg-[#8c672b] text-white shadow'
                              : 'text-[#5c4a35] hover:text-[#2c241b]'
                          }`}
                        >
                          🎲 Dados Físicos (Entrada Manual)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRollMethod('standard');
                            handleApplyStandardArray();
                          }}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            rollMethod === 'standard'
                              ? 'bg-[#8c672b] text-white shadow'
                              : 'text-[#5c4a35] hover:text-[#2c241b]'
                          }`}
                        >
                          ⚖️ Matriz Estándar (15, 14, 13, 12, 10, 8)
                        </button>
                      </div>

                      {/* VIRTUAL ROLLER MODE */}
                      {rollMethod === 'roll' && (
                        <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-4 shadow-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                <Dices className="w-4 h-4 text-[#8c672b]" /> Bandeja de Tiradas (4d6 descartando el menor)
                              </h5>
                              <span className="text-[11px] text-[#7a6448]">
                                Arrastra cada resultado a una característica abajo, o haz clic en un dado y luego en el atributo.
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRollDiceVirtual}
                              disabled={isRollingAnimation}
                              className="px-4 py-2 bg-[#8c672b] hover:bg-[#a67a33] text-white font-fantasy font-bold rounded-lg text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isRollingAnimation ? 'animate-spin' : ''}`} />
                              {isRollingAnimation ? 'Lanzando Dados...' : 'Lanzar Dados 4d6'}
                            </button>
                          </div>

                          {diceRolls.length === 0 ? (
                            <div className="p-6 bg-[#fcf9f2] rounded-xl border border-dashed border-[#d6c4aa] text-center space-y-2">
                              <p className="text-xs text-[#5c4a35]">
                                Aún no has tirado los dados para este personaje. Haz clic en <strong>Lanzar Dados 4d6</strong> arriba o selecciona <strong>Matriz Estándar</strong> para comenzar.
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                              {diceRolls.map((roll, idx) => {
                                const assignedToStat = (Object.keys(assignedSourceIndex) as (keyof AbilityScores)[]).find(
                                  (k) => assignedSourceIndex[k] === idx
                                );
                                const isAssigned = assignedToStat !== undefined;
                                const isSelected = selectedRollIndex === idx;

                                if (isAssigned) {
                                  return (
                                    <div
                                      key={idx}
                                      className="p-3 bg-[#e8e0d1] rounded-xl border-2 border-dashed border-[#bda688] flex flex-col items-center justify-center opacity-45 relative select-none shadow-2xs"
                                    >
                                      <span className="text-[10px] text-[#7a6448] font-mono uppercase">
                                        Tirada #{idx + 1}
                                      </span>
                                      <div className="text-xl font-bold font-fantasy text-[#6a533b] line-through my-1">
                                        {roll.total}
                                      </div>
                                      <div className="flex items-center gap-1 bg-[#8c672b] text-white px-2 py-0.5 rounded-full text-[10px] font-fantasy font-bold mt-1 shadow-xs">
                                        <span>{ABILITY_SCORE_EXPLANATIONS[assignedToStat].abbreviation}</span>
                                        <button
                                          type="button"
                                          onClick={() => unassignStat(assignedToStat)}
                                          className="hover:text-red-300 font-bold ml-0.5 cursor-pointer"
                                          title="Liberar tirada"
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }

                                return (
                                  <div
                                    key={idx}
                                    draggable={true}
                                    onDragStart={(e) => {
                                      e.dataTransfer.setData('text/plain', JSON.stringify({ index: idx, value: roll.total }));
                                      setSelectedRollIndex(idx);
                                    }}
                                    onClick={() => setSelectedRollIndex(isSelected ? null : idx)}
                                    className={`p-3 bg-[#fcf9f2] rounded-xl border-2 transition flex flex-col items-center justify-center shadow-xs cursor-grab active:cursor-grabbing hover:border-[#8c672b] hover:shadow-md ${
                                      isSelected ? 'border-[#8c672b] ring-2 ring-[#c59b27] bg-[#fbf3e4]' : 'border-[#d6c4aa]'
                                    }`}
                                    title="Arrastra este valor hacia una característica o haz clic para seleccionarlo"
                                  >
                                    <div className="flex items-center gap-1 text-[10px] text-[#7a6448] font-mono uppercase">
                                      <GripVertical className="w-3 h-3 text-[#8c672b]" /> Tirada #{idx + 1}
                                    </div>
                                    <div className="text-2xl font-bold font-fantasy text-[#8c672b] my-1">
                                      {roll.total}
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 my-1">
                                      {roll.dice.map((d, dIdx) => {
                                        const isDropped = d === roll.dropped;
                                        return (
                                          <div
                                            key={dIdx}
                                            className={`flex flex-col items-center ${isDropped ? 'opacity-40 grayscale' : ''}`}
                                            title={isDropped ? 'Dado más bajo descartado' : `Dado: ${d}`}
                                          >
                                            <PolyhedralDie
                                              type="d6"
                                              value={d}
                                              size="sm"
                                              isRolling={isRollingAnimation}
                                            />
                                            {isDropped && (
                                              <span className="text-[9px] text-red-700 font-mono font-bold mt-0.5">
                                                desc.
                                              </span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <span className="text-[9px] text-[#8c672b] font-mono mt-0.5 font-bold">
                                      {isSelected ? '✓ Seleccionado' : 'Arrastra o toca'}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* STANDARD ARRAY MODE (Drag & Drop) */}
                      {rollMethod === 'standard' && (
                        <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-4 shadow-xs">
                          <div>
                            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                              ⚖️ Matriz Estándar Oficial (15, 14, 13, 12, 10, 8)
                            </h5>
                            <span className="text-[11px] text-[#7a6448]">
                              Arrastra los valores estándar a tus características o toca uno para asignarlo.
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                            {standardArrayValues.map((val, idx) => {
                              const assignedToStat = (Object.keys(assignedSourceIndex) as (keyof AbilityScores)[]).find(
                                (k) => assignedSourceIndex[k] === idx
                              );
                              const isAssigned = assignedToStat !== undefined;
                              const isSelected = selectedRollIndex === idx;

                              if (isAssigned) {
                                return (
                                  <div
                                    key={idx}
                                    className="p-3 bg-[#e8e0d1] rounded-xl border-2 border-dashed border-[#bda688] flex flex-col items-center justify-center opacity-45 relative select-none shadow-2xs"
                                  >
                                    <span className="text-[10px] text-[#7a6448] font-mono uppercase">
                                      Valor #{idx + 1}
                                    </span>
                                    <div className="text-xl font-bold font-fantasy text-[#6a533b] line-through my-1">
                                      {val}
                                    </div>
                                    <div className="flex items-center gap-1 bg-[#8c672b] text-white px-2 py-0.5 rounded-full text-[10px] font-fantasy font-bold mt-1 shadow-xs">
                                      <span>{ABILITY_SCORE_EXPLANATIONS[assignedToStat].abbreviation}</span>
                                      <button
                                        type="button"
                                        onClick={() => unassignStat(assignedToStat)}
                                        className="hover:text-red-300 font-bold ml-0.5 cursor-pointer"
                                        title="Liberar valor"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div
                                  key={idx}
                                  draggable={true}
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify({ index: idx, value: val }));
                                    setSelectedRollIndex(idx);
                                  }}
                                  onClick={() => setSelectedRollIndex(isSelected ? null : idx)}
                                  className={`p-3 bg-[#fcf9f2] rounded-xl border-2 transition flex flex-col items-center justify-center shadow-xs cursor-grab active:cursor-grabbing hover:border-[#8c672b] hover:shadow-md ${
                                    isSelected ? 'border-[#8c672b] ring-2 ring-[#c59b27] bg-[#fbf3e4]' : 'border-[#d6c4aa]'
                                  }`}
                                  title="Arrastra este valor hacia una característica o haz clic para seleccionarlo"
                                >
                                  <div className="flex items-center gap-1 text-[10px] text-[#7a6448] font-mono uppercase">
                                    <GripVertical className="w-3 h-3 text-[#8c672b]" /> Valor #{idx + 1}
                                  </div>
                                  <div className="text-2xl font-bold font-fantasy text-[#8c672b] my-1">
                                    {val}
                                  </div>
                                  <div className="my-1">
                                    <PolyhedralDie type="d20" value={val} size="sm" />
                                  </div>
                                  <span className="text-[9px] text-[#8c672b] font-mono mt-0.5 font-bold">
                                    {isSelected ? '✓ Seleccionado' : 'Arrastra o toca'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* MANUAL ENTRY MODE */}
                      {rollMethod === 'manual' && (
                        <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                          <div>
                            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                              Ingreso Manual de Dados Físicos
                            </h5>
                            <span className="text-[11px] text-[#7a6448]">
                              Escribe directamente los números que obtuviste en tu mesa de juego.
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                            {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => (
                              <div key={st} className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] text-center shadow-xs">
                                <span className="text-xs font-bold font-fantasy text-[#4a361c] uppercase block mb-1">
                                  {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}
                                </span>
                                <input
                                  type="number"
                                  min={3}
                                  max={18}
                                  placeholder="--"
                                  value={assignedStats[st] ?? ''}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (isNaN(val)) unassignStat(st);
                                    else setAssignedStats((prev) => ({ ...prev, [st]: val }));
                                  }}
                                  className="w-16 bg-white border border-[#d6c4aa] rounded-lg py-1 text-center font-fantasy font-bold text-base text-[#2c241b] shadow-inner"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ASSIGNMENT & EXPLANATION OF STATS */}
                    <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                        Distribución y Asignación de Características
                      </h5>
                      <span className="text-[11px] text-[#7a6448]">
                        {activeClass && classConfig ? (
                          <>
                            Recomendado para {activeClass.name}:{' '}
                            <strong className="text-[#8c672b]">
                              {classConfig.recommendedPrimaryStats
                                .map((s) => ABILITY_SCORE_EXPLANATIONS[s].name)
                                .join(', ')}
                            </strong>
                          </>
                        ) : (
                          <span className="italic">Elige una clase en el paso 4 para ver estadísticas primarias recomendadas</span>
                        )}
                      </span>
                    </div>

                    <div id="creator-abilities-targets" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((statKey) => {
                        const info = ABILITY_SCORE_EXPLANATIONS[statKey];
                        const isAssigned = assignedStats[statKey] !== undefined;
                        const baseVal = assignedStats[statKey];
                        const raceBonus = racialBonuses[statKey];
                        const totalVal = isAssigned ? baseVal! + raceBonus : null;
                        const modStr = totalVal !== null ? getModStr(totalVal) : '--';
                        const isPrimary = classConfig ? classConfig.recommendedPrimaryStats.includes(statKey) : false;
                        const isDragOver = dragOverStat === statKey;

                        return (
                          <div
                            key={statKey}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.dataTransfer.dropEffect = 'copy';
                            }}
                            onDragEnter={() => setDragOverStat(statKey)}
                            onDragLeave={() => setDragOverStat(null)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOverStat(null);
                              try {
                                const raw = e.dataTransfer.getData('text/plain');
                                if (raw) {
                                  const parsed = JSON.parse(raw);
                                  if (typeof parsed.index === 'number' && typeof parsed.value === 'number') {
                                    assignRollToStat(parsed.index, parsed.value, statKey);
                                  }
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            onClick={() => {
                              if (selectedRollIndex !== null) {
                                let val = 10;
                                if (rollMethod === 'roll' && diceRolls[selectedRollIndex]) {
                                  val = diceRolls[selectedRollIndex].total;
                                } else if (rollMethod === 'standard' && standardArrayValues[selectedRollIndex] !== undefined) {
                                  val = standardArrayValues[selectedRollIndex];
                                }
                                assignRollToStat(selectedRollIndex, val, statKey);
                              }
                            }}
                            className={`p-3.5 rounded-xl border-2 transition ${
                              isDragOver
                                ? 'bg-[#fbf2e3] border-[#8c672b] ring-4 ring-[#8c672b]/40 shadow-md'
                                : isPrimary
                                ? 'bg-[#f7efe1] border-[#b88c32] shadow-sm'
                                : 'bg-[#fcf9f2] border-[#d6c4aa]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl p-1 bg-white rounded-lg border border-[#dbcbb2] shadow-xs">
                                  {info.icon}
                                </span>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <h6 className="font-fantasy font-bold text-sm text-[#4a361c]">
                                      {info.name}
                                    </h6>
                                    {isPrimary && (
                                      <span className="text-[9px] bg-[#8c672b] text-white px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                                        Primario
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#6e5c4a] mt-0.5 leading-relaxed">
                                    {info.description}
                                  </p>
                                </div>
                              </div>

                              {/* Number Badge */}
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="text-right">
                                  <span className="text-[10px] text-[#7a6448] block leading-none">
                                    {isAssigned
                                      ? `Base ${baseVal}${raceBonus > 0 ? ` +${raceBonus}` : ''}`
                                      : raceBonus > 0
                                      ? `+${raceBonus} Raza`
                                      : 'Sin asignar'}
                                  </span>
                                  <span
                                    className={`font-fantasy font-bold text-lg ${
                                      isAssigned ? 'text-[#4a361c]' : 'text-[#a89078] tracking-widest'
                                    }`}
                                  >
                                    {isAssigned ? totalVal : '--'}
                                  </span>
                                </div>
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shadow-inner ${
                                    isAssigned
                                      ? 'bg-[#ede1ce] border border-[#c5af95] text-[#2e7d32]'
                                      : 'bg-[#ede1ce]/40 border border-dashed border-[#c5af95] text-[#8c7862]'
                                  }`}
                                >
                                  {modStr}
                                </div>
                              </div>
                            </div>

                            {/* Drop Zone / Assignment Status Bar */}
                            <div className="mt-2.5 pt-2 border-t border-[#ede1ce] flex items-center justify-between text-xs">
                              {isAssigned ? (
                                <>
                                  <span className="text-[11px] text-[#5c4a35]">
                                    Valor base asignado: <strong className="text-[#8c672b]">{baseVal}</strong>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      unassignStat(statKey);
                                    }}
                                    className="px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                    title="Quitar asignación y devolver tirada"
                                  >
                                    ✕ Desasignar
                                  </button>
                                </>
                              ) : (
                                <span className="text-[11px] text-[#8c672b] italic flex items-center gap-1">
                                  ⬇ {selectedRollIndex !== null ? 'Haz clic aquí para asignar el dado seleccionado' : 'Suelta aquí una tirada (Drag & Drop)'}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

              {/* ----------------------------------------------------- */}
              {/* STEP 3: RACE & SUBRACE */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'race' && (
                <div id="step-tab-race-content" className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Award className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 2: Raza y Linaje Ancestral
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tu linaje determina tus bonificadores a las características, tu velocidad básica, sentidos especiales (como visión en la oscuridad) y dones mágicos innatos.
                      </p>
                    </div>
                  </div>

                  {/* Entire Race Selection: Filters + Search + Race Cards Grid */}
                  <div id="creator-race-catalog" className="space-y-3">
                    {/* Race Category Tabs & Search Header */}
                    <div className="space-y-2.5">
                      <div className="flex flex-col md:flex-row gap-2.5 items-start md:items-center justify-between">
                        {/* Race Category Tabs */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(
                            [
                              { id: 'Todos', label: 'Todas las Razas', count: raceCounts.Todos },
                              { id: 'Común', label: 'Comunes (PHB)', count: raceCounts.Común },
                              { id: 'Exótica', label: 'Exóticas', count: raceCounts.Exótica },
                              { id: 'Monstruosa', label: 'Monstruosas', count: raceCounts.Monstruosa },
                              { id: 'Planar', label: 'Planares & Entornos', count: raceCounts.Planar },
                            ] as const
                          ).map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setRaceCategory(tab.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                raceCategory === tab.id
                                  ? 'bg-[#8c672b] text-white shadow-xs'
                                  : 'bg-white text-[#5c4a35] border border-[#d6c4aa] hover:border-[#8c672b]'
                              }`}
                            >
                              <span>{tab.label}</span>
                              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                                raceCategory === tab.id ? 'bg-white/20 text-white' : 'bg-[#ebdcc4] text-[#8c672b]'
                              }`}>
                                {tab.count}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Search & Maximized Button */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <div className="relative flex-1 md:w-56">
                            <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={raceSearchQuery}
                              onChange={(e) => setRaceSearchQuery(e.target.value)}
                              placeholder="Buscar raza o linaje..."
                              className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                            />
                          </div>
                          <button
                            id="creator-race-maximize-btn"
                            type="button"
                            onClick={() => setIsRacePickerMaximized(true)}
                            className="px-2.5 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#e4d4ba] text-xs font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs hover:border-[#6a4f21]"
                            title="Maximizar catálogo para ver todas las razas disponibles en pantalla completa"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#8c672b]" />
                            <span>Maximizar Catálogo</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Race Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[36vh] overflow-y-auto pr-1">
                      {WIKIDOT_RACES
                        .filter((race) => {
                          if (raceCategory !== 'Todos' && race.category !== raceCategory) return false;
                          if (!raceSearchQuery.trim()) return true;
                          const q = raceSearchQuery.toLowerCase();
                          return (
                            race.name.toLowerCase().includes(q) ||
                            race.description.toLowerCase().includes(q) ||
                            (race.subraces && race.subraces.some((s) => s.name.toLowerCase().includes(q)))
                          );
                        })
                        .map((race) => {
                          const isSelected = race.id === selectedRaceId;
                          return (
                            <RaceCard
                              key={race.id}
                              race={race}
                              isSelected={isSelected}
                              onSelect={() => {
                                setSelectedRaceId(race.id);
                                setSelectedSubraceId('');
                                setFlexibleRacialChoices([]);
                                setBonusRacialSkills([]);
                              }}
                              onInspect={(data) => setInspectingCompendium(data)}
                            />
                          );
                        })}
                    </div>
                  </div>

                  {/* Race Traits, Subraces & Customizations Container */}
                  <div id="creator-race-traits" className="space-y-4">
                    {/* Subrace Selector if applicable */}
                  {activeRace && activeRace.subraces && activeRace.subraces.length > 0 && (
                    <div id="creator-race-subraces" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase">
                          Subraza / Linaje de {activeRace.name}
                        </label>
                        <span className="text-[11px] text-[#8c672b] font-mono font-bold">
                          {activeSubrace ? activeSubrace.name : '(Opcional / Elige tu linaje)'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {activeRace.subraces.map((sub) => {
                          const isSubSelected = sub.id === selectedSubraceId;
                          return (
                            <SubraceCard
                              key={sub.id}
                              sub={sub}
                              parentRace={activeRace}
                              isSelected={isSubSelected}
                              onSelect={() => setSelectedSubraceId(sub.id)}
                              onInspect={(data) => setInspectingCompendium(data)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Flexible Racial Ability Points Picker */}
                  {raceAnyCount > 0 && activeRace && (
                    <div id="creator-race-flexible" className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-[#8c672b]" /> Puntos de Característica a tu Elección ({activeRace.name})
                          </h5>
                          <p className="text-[11px] text-[#5c4a35] mt-0.5">
                            Tu linaje otorga <strong>+{raceAnyCount} puntos adicionales</strong> a repartir entre diferentes características.
                          </p>
                        </div>
                        <span className="text-[11px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                          {Math.min(raceAnyCount, flexibleRacialChoices.length)} / {raceAnyCount} seleccionados
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                        {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => {
                          const isChosen = flexibleRacialChoices.slice(0, raceAnyCount).includes(st);
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => {
                                setFlexibleRacialChoices((prev) => {
                                  if (prev.includes(st)) {
                                    return prev.filter((s) => s !== st);
                                  } else {
                                    if (prev.length < raceAnyCount) {
                                      return [...prev, st];
                                    } else {
                                      return [...prev.slice(1, raceAnyCount), st];
                                    }
                                  }
                                });
                              }}
                              className={`p-2 rounded-lg border text-xs font-fantasy font-bold transition cursor-pointer flex flex-col items-center justify-center ${
                                isChosen
                                  ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                  : 'bg-white border-[#d6c4aa] text-[#4a361c] hover:border-[#8c672b]'
                              }`}
                            >
                              <span className="text-sm">{ABILITY_SCORE_EXPLANATIONS[st].icon}</span>
                              <span className="mt-0.5">{ABILITY_SCORE_EXPLANATIONS[st].name}</span>
                              <span className="text-[9px] font-mono opacity-80">{isChosen ? '+1 Activo' : '+1'}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Bonus Racial Skills Picker */}
                  {activeRace && (selectedRaceId === 'humano' && selectedSubraceId === 'humano-variante' ||
                    selectedRaceId === 'semielfo' ||
                    selectedRaceId === 'kenku' ||
                    selectedRaceId === 'cambiaformas' ||
                    selectedRaceId === 'leonin') && (
                    <div id="creator-race-bonus-skills" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#8c672b]" /> Competencias de Habilidad Adicionales ({activeRace.name})
                          </h5>
                          <p className="text-[11px] text-[#5c4a35] mt-0.5">
                            Tu raza te otorga competencia en habilidades a tu elección.
                          </p>
                        </div>
                        <span className="text-[11px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                          {bonusRacialSkills.length} seleccionadas
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {ALL_5E_SKILLS.map((sk) => {
                          const isFromBg = backgroundSkills.includes(sk.name);
                          const isFromRaceFixed = racialSkills.includes(sk.name);
                          const isSelectedBonus = bonusRacialSkills.includes(sk.name);
                          const isDisabled = isFromBg || isFromRaceFixed;

                          return (
                            <button
                              key={`race-sk-${sk.name}`}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => {
                                setBonusRacialSkills((prev) => {
                                  if (prev.includes(sk.name)) {
                                    return prev.filter((s) => s !== sk.name);
                                  } else {
                                    const maxAllowed = selectedRaceId === 'semielfo' || selectedRaceId === 'kenku' || selectedRaceId === 'cambiaformas' ? 2 : 1;
                                    if (prev.length < maxAllowed) {
                                      return [...prev, sk.name];
                                    } else {
                                      return [...prev.slice(1, maxAllowed), sk.name];
                                    }
                                  }
                                });
                              }}
                              className={`p-2 rounded-lg border text-left text-xs font-fantasy font-bold transition flex items-center justify-between cursor-pointer ${
                                isDisabled
                                  ? 'bg-[#ede1ce] border-[#d8cbb8] opacity-60 cursor-not-allowed'
                                  : isSelectedBonus
                                  ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                  : 'bg-white border-[#d6c4aa] text-[#4a361c] hover:border-[#8c672b]'
                              }`}
                            >
                              <span className="truncate">{sk.name}</span>
                              {isSelectedBonus && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Active Race Details & Traits */}
                  {activeRace ? (
                    <div id="creator-race-active-traits" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                      <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#8c672b]" /> Rasgos Raciales de {activeRace.name} {activeSubrace ? `(${activeSubrace.name})` : ''}
                      </h5>

                      <div className="space-y-2">
                        {activeRace.traits.map((t, i) => (
                          <div key={i} className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] text-xs shadow-xs">
                            <span className="font-fantasy font-bold text-[#4a361c] text-xs block">
                              {t.name}
                            </span>
                            <p className="text-[#5c4a35] text-[11px] mt-0.5 leading-relaxed">
                              {t.desc}
                            </p>
                          </div>
                        ))}

                        {activeSubrace?.traits?.map((st, i) => (
                          <div key={`sub-${i}`} className="p-2.5 bg-[#fcf9f2] rounded-lg border border-[#c5af95] text-xs shadow-xs">
                            <span className="font-fantasy font-bold text-[#8c672b] text-xs block">
                              {st.name} (Subraza)
                            </span>
                            <p className="text-[#5c4a35] text-[11px] mt-0.5 leading-relaxed">
                              {st.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* RACIAL INNATE MAGIC & ARCANE GIFTS PANEL (Wikidot / MotM 1:1) */}
                      {racialSpellcastingInfo.hasRacialMagic && (
                        <div id="creator-racial-spells-panel" className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#f8f1e5] to-[#f2e5d0] border-2 border-[#8c672b] shadow-sm space-y-3.5">
                          <div className="flex items-start justify-between gap-2 border-b border-[#d6c4aa] pb-2.5">
                            <div>
                              <h5 className="font-fantasy font-bold text-xs uppercase text-[#4a361c] flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-[#8c672b]" /> Magia Innata Ancestral & Dones Arcanos
                              </h5>
                              <p className="text-[11px] text-[#5c4a35] mt-0.5 leading-relaxed">
                                Tu linaje ({activeSubrace?.name || activeRace.name}) te otorga conjuros y trucos innatos (conforme a las reglas oficiales 5e). Estos conjuros no consumen ranuras de clase ni cuentan contra tu límite de conjuros preparados/conocidos.
                              </p>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-900 text-purple-100 border border-purple-700 shrink-0">
                              Reglas Oficiales 5e
                            </span>
                          </div>

                          {/* 1. Ability Score Choice for Racial Spells (e.g. Genasíes, Tiefling, Hada, etc.) */}
                          {racialSpellcastingInfo.config?.abilityChoices && racialSpellcastingInfo.config.abilityChoices.length > 1 && (
                            <div className="p-3 bg-[#fcf9f2] rounded-lg border border-[#c5af95] space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                                  <span>🧠</span> Característica de Conjuración Racial:
                                </label>
                                <span className="text-[10px] text-[#7a5a2b] font-mono">
                                  CD de Salvación: 8 + PB ({profBonus}) + Mod
                                </span>
                              </div>
                              <p className="text-[10px] text-[#7a6448]">
                                Elige qué aptitud mental gobierna tus conjuros de linaje ({racialSpellcastingInfo.config.abilityChoices.map((c) => c.toUpperCase()).join(' / ')}):
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                {(['int', 'wis', 'cha'] as ('int' | 'wis' | 'cha')[])
                                  .filter((ab) => racialSpellcastingInfo.config?.abilityChoices?.includes(ab))
                                  .map((ab) => {
                                    const isChosen = effectiveRacialSpellAbility === ab;
                                    const statVal = finalStats[ab] || 10;
                                    const modVal = getMod(statVal);
                                    const modStr = getModStr(statVal);
                                    const dc = 8 + profBonus + modVal;
                                    const names = { int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };

                                    return (
                                      <button
                                        key={ab}
                                        type="button"
                                        onClick={() => setRacialSpellcastingAbility(ab)}
                                        className={`p-2 rounded-lg border text-left transition flex flex-col justify-between cursor-pointer ${
                                          isChosen
                                            ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs ring-1 ring-[#6a4f21]'
                                            : 'bg-white hover:bg-[#fbf7ee] text-[#4a361c] border-[#d6c4aa]'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-fantasy font-bold text-xs uppercase">{names[ab]}</span>
                                          {isChosen && <Check className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <div className={`text-[10px] font-mono mt-1 ${isChosen ? 'text-amber-100' : 'text-[#7a6448]'}`}>
                                          Mod: {modStr} • CD {dc}
                                        </div>
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          )}

                          {/* 2. Cantrip Choice (e.g. Alto Elfo / High Elf: 1 Wizard cantrip) */}
                          {racialSpellcastingInfo.config?.hasCantripChoice && (
                            <div className="p-3 bg-[#fcf9f2] rounded-lg border border-[#c5af95] space-y-2">
                              <label className="text-xs font-fantasy font-bold text-[#4a361c] uppercase flex items-center justify-between">
                                <span>📖 Truco Racial a Elegir (Lista de {racialSpellcastingInfo.config.cantripChoiceClass || 'Mago'}):</span>
                                <span className="text-[10px] text-amber-800 font-mono font-bold">1 Truco adicional</span>
                              </label>
                              <p className="text-[10px] text-[#7a6448]">
                                Conoces un truco de tu elección de la lista de conjuros de Mago:
                              </p>
                              <select
                                value={selectedRacialCantrip}
                                onChange={(e) => setSelectedRacialCantrip(e.target.value)}
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                              >
                                <option value="">-- Selecciona un Truco de Mago --</option>
                                {wizardCantripsList.map((spl) => (
                                  <option key={spl.id} value={spl.name}>
                                    {spl.name} ({spl.school})
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* 3. Granted & Progressive Innate Spells List */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-fantasy font-bold text-[#4a361c] uppercase block">
                              Conjuros Innatos de tu Linaje ({characterLevel >= 1 ? `Nivel de personaje actual: ${characterLevel}` : 'Nivel 1'}):
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {racialSpellcastingInfo.innateSpells.map((entry, idx) => {
                                const isUnlocked = characterLevel >= entry.requiredLevel;
                                const spellObj = findSpellByNameOrAlias(entry.spellName);

                                return (
                                  <div
                                    key={idx}
                                    className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                                      isUnlocked
                                        ? 'bg-white border-[#8c672b]/50 shadow-2xs'
                                        : 'bg-[#ede5d6]/70 border-dashed border-[#c5af95] opacity-75'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="font-fantasy font-bold text-[#4a361c]">
                                          {spellObj?.name || entry.spellName}
                                        </span>
                                        <span
                                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                                            isUnlocked
                                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                                          }`}
                                        >
                                          {isUnlocked ? '✓ Desbloqueado' : `Bloqueado (Nv ${entry.requiredLevel})`}
                                        </span>
                                      </div>
                                      <span className="text-[10px] text-[#7a6448] block mt-0.5">
                                        {entry.traitName ? `Rasgo: ${entry.traitName}` : `Desbloquea a Nivel ${entry.requiredLevel}`}
                                      </span>
                                      {entry.notes && (
                                        <p className="text-[10px] text-[#5c4a35] mt-1 leading-snug italic">
                                          {entry.notes}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}

                              {racialSpellcastingInfo.config?.hasCantripChoice && selectedRacialCantrip && (
                                <div className="p-2.5 rounded-lg border text-xs flex flex-col justify-between bg-white border-[#8c672b]/50 shadow-2xs">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-fantasy font-bold text-[#4a361c]">
                                      {selectedRacialCantrip}
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                      ✓ Elegido
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-[#7a6448] block mt-0.5">
                                    Truco de Mago (Linaje Élfico)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona una raza de la lista para ver sus rasgos, bonificadores y linajes.
                    </div>
                  )}
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 4: ASI (MEJORA DE CARACTERÍSTICA) O DOTES (FEATS) */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'asi_feats' && (
                <div id="step-tab-asi_feats-content" className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Star className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 6: Dotes Oficiales & Mejoras de Puntuación (ASI)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Revisa el cálculo en vivo de tus puntuaciones (Puntuación Base + Bonificaciones Raciales + Dotes/ASI) y asigna tus Mejoras de Característica o Dotes Oficiales de D&D 5e si tienes opciones disponibles.
                      </p>
                    </div>
                  </div>

                  {/* Summary of Ability Scores Table */}
                  <div id="creator-asi-summary-table" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#8c672b]" /> Resumen de Atributos & Modificadores Actuales
                      </h5>
                      <span className="text-[11px] text-[#7a6448] font-mono">
                        Máximo natural: 20
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => {
                        const isAssigned = assignedStats[st] !== undefined;
                        const base = isAssigned ? assignedStats[st]! : '--';
                        const race = racialBonuses[st];
                        const asi = asiStatBonuses[st] || 0;
                        const total = isAssigned ? finalStats[st] : '--';
                        const mod = isAssigned ? getModStr(finalStats[st]) : '--';

                        return (
                          <div
                            key={st}
                            className="p-2.5 rounded-xl bg-[#fcf9f2] border border-[#d6c4aa] text-center shadow-xs"
                          >
                            <span className="text-sm block">{ABILITY_SCORE_EXPLANATIONS[st].icon}</span>
                            <span className="font-fantasy font-bold text-xs text-[#4a361c] uppercase block mt-0.5">
                              {ABILITY_SCORE_EXPLANATIONS[st].name}
                            </span>
                            <div className="text-lg font-mono font-bold text-[#8c672b] my-0.5">
                              {total}
                            </div>
                            <span className="inline-block text-[11px] font-mono font-bold bg-[#8c672b] text-white px-2 py-0.5 rounded-full">
                              {mod}
                            </span>
                            <div className="text-[9px] text-[#7a6448] font-mono mt-1 pt-1 border-t border-[#e2d5c2]">
                              Base {base}{race > 0 ? ` +${race} Rz` : ''}{asi > 0 ? ` +${asi} Dt` : ''}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feats & Campaign Level 1 Feats Section */}
                  <div id="creator-asi-feat-section" className="space-y-4">
                    {/* Optional House Rule / Level 1 Campaign Feat Checkbox (Always visible and toggleable on/off) */}
                    <div id="creator-asi-level1-toggle" className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                      <div>
                        <span className="font-fantasy font-bold text-xs text-[#4a361c] block">
                          Regla Opcional de Campaña: Dote Inicial a Nivel 1
                        </span>
                      <span className="text-[11px] text-[#7a6448] block mt-0.5">
                        Habilita o deshabilita esta opción si tu Dungeon Master permite a los personajes comenzar con 1 dote adicional a nivel 1.
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer font-fantasy font-bold text-xs text-[#8c672b] shrink-0 bg-white px-3 py-1.5 rounded-lg border border-[#d6c4aa] hover:border-[#8c672b]">
                      <input
                        type="checkbox"
                        checked={bonusCampaignFeat}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setBonusCampaignFeat(checked);
                          if (!checked) {
                            setAsiChoices((prev) => {
                              const next = { ...prev };
                              delete next[availableAsiCount - 1];
                              return next;
                            });
                          }
                        }}
                        className="w-4 h-4 accent-[#8c672b] cursor-pointer"
                      />
                      {bonusCampaignFeat ? '✓ Dote Nivel 1 Activado' : 'Activar Dote Nivel 1'}
                    </label>
                  </div>

                  {/* If NO ASI / FEATS available at current level */}
                  {availableAsiCount === 0 && (
                    <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-dashed border-[#cbb99f] space-y-2">
                      <div className="flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                            Sin Mejoras de Característica o Dotes a Nivel {characterLevel}
                          </h5>
                          <p className="text-xs text-[#5c4a35] mt-0.5 leading-relaxed">
                            Según las reglas de D&D 5e, las mejoras de característica y dotes se desbloquean en los niveles <strong>4, 8, 12, 16 y 19</strong> (o a nivel 1 si seleccionas la raza <strong>Humano Variante</strong> en el paso 2, o activas la casilla superior si tu DM lo aprueba).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Available ASI / FEAT Slots iteration if available */}
                  {availableAsiCount > 0 && (
                    <div className="space-y-4">
                      {Array.from({ length: availableAsiCount }).map((_, slotIdx) => {
                        const isVarHumanSlot = isVariantHuman && slotIdx === 0;
                        const slotTitle = isVarHumanSlot
                          ? 'Dote Inicial (Linaje Humano Variante - Nivel 1)'
                          : bonusCampaignFeat && slotIdx === availableAsiCount - 1
                          ? 'Dote Adicional de Campaña (Regla Opcional de Nivel 1)'
                          : `Mejora de Característica o Dote #${slotIdx + 1}`;

                        const currentChoice: AsiFeatChoice = asiChoices[slotIdx] || {
                          type: (isVarHumanSlot || (bonusCampaignFeat && slotIdx === availableAsiCount - 1)) ? 'feat' : 'asi',
                          asiType: '+2',
                          asiStat1: undefined,
                          asiStat2: undefined,
                          featId: undefined,
                          featAbilityChoice: undefined,
                          featSubChoices: [],
                        };

                        const setSlotChoice = (updated: Partial<AsiFeatChoice>) => {
                          setAsiChoices((prev) => {
                            const prevSlot = prev[slotIdx] || currentChoice;
                            return {
                              ...prev,
                              [slotIdx]: {
                                ...prevSlot,
                                ...updated,
                              },
                            };
                          });
                        };

                        return (
                          <div key={slotIdx} className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#d6c4aa] space-y-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#d6c4aa] pb-3">
                              <div>
                                <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <Star className="w-4 h-4 text-[#8c672b]" /> {slotTitle}
                                </h5>
                                <p className="text-[11px] text-[#5c4a35] mt-0.5">
                                  {isVarHumanSlot
                                    ? 'Elige la dote oficial adicional otorgada por tu linaje humano variante.'
                                    : 'Elige entre aumentar tus puntuaciones (+2 o +1/+1) O seleccionar una dote oficial con beneficios tácticos.'}
                                </p>
                              </div>

                              {!isVarHumanSlot && (
                                <div className="flex items-center gap-1 bg-[#ede0cc] p-1 rounded-lg border border-[#d1be9e] shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => setSlotChoice({ type: 'asi' })}
                                    className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                                      currentChoice.type === 'asi'
                                        ? 'bg-[#8c672b] text-white shadow'
                                        : 'text-[#4a361c] hover:bg-white/50'
                                    }`}
                                  >
                                    Mejora de Stats (+2 / +1+1)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setSlotChoice({ type: 'feat' })}
                                    className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                                      currentChoice.type === 'feat'
                                        ? 'bg-[#8c672b] text-white shadow'
                                        : 'text-[#4a361c] hover:bg-white/50'
                                    }`}
                                  >
                                    Elegir Dote (Feat)
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Option A: Ability Score Improvement (ASI) */}
                            {currentChoice.type === 'asi' && !isVarHumanSlot && (
                              <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-4">
                                <div className="flex items-center gap-3">
                                  <label className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">Modo de Distribución:</label>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setSlotChoice({ asiType: '+2' })}
                                      className={`px-2.5 py-1 rounded text-xs font-fantasy font-bold border transition cursor-pointer ${
                                        currentChoice.asiType === '+2'
                                          ? 'bg-[#8c672b] text-white border-[#8c672b]'
                                          : 'bg-white text-[#5c4a35] border-[#d6c4aa]'
                                      }`}
                                    >
                                      +2 a una Característica
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setSlotChoice({ asiType: '+1+1' })}
                                      className={`px-2.5 py-1 rounded text-xs font-fantasy font-bold border transition cursor-pointer ${
                                        currentChoice.asiType === '+1+1'
                                          ? 'bg-[#8c672b] text-white border-[#8c672b]'
                                          : 'bg-white text-[#5c4a35] border-[#d6c4aa]'
                                      }`}
                                    >
                                      +1 a dos Características distintas
                                    </button>
                                  </div>
                                </div>

                                {currentChoice.asiType === '+2' ? (
                                  <div>
                                    <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase mb-1.5">
                                      Selecciona la característica que recibirá +2:
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                                      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => (
                                        <button
                                          key={st}
                                          type="button"
                                          onClick={() => setSlotChoice({ asiStat1: st })}
                                          className={`p-2.5 rounded-lg border text-xs font-fantasy font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                                            currentChoice.asiStat1 === st
                                              ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                              : 'bg-white border-[#d6c4aa] text-[#4a361c] hover:border-[#8c672b]'
                                          }`}
                                        >
                                          <span>{ABILITY_SCORE_EXPLANATIONS[st].icon}</span>
                                          <span className="mt-1">{ABILITY_SCORE_EXPLANATIONS[st].name}</span>
                                          <span className="text-[10px] opacity-80 font-mono mt-0.5">+2</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase mb-1.5">
                                        Primera Característica (+1):
                                      </label>
                                      <select
                                        value={currentChoice.asiStat1 || ''}
                                        onChange={(e) => setSlotChoice({ asiStat1: (e.target.value || undefined) as keyof AbilityScores })}
                                        className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                                      >
                                        <option value="" disabled>-- Elige característica (+1) --</option>
                                        {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => (
                                          <option key={st} value={st} disabled={currentChoice.asiStat2 === st}>
                                            {ABILITY_SCORE_EXPLANATIONS[st].name} ({ABILITY_SCORE_EXPLANATIONS[st].abbreviation})
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase mb-1.5">
                                        Segunda Característica (+1):
                                      </label>
                                      <select
                                        value={currentChoice.asiStat2 || ''}
                                        onChange={(e) => setSlotChoice({ asiStat2: (e.target.value || undefined) as keyof AbilityScores })}
                                        className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                                      >
                                        <option value="" disabled>-- Elige característica (+1) --</option>
                                        {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => (
                                          <option key={st} value={st} disabled={currentChoice.asiStat1 === st}>
                                            {ABILITY_SCORE_EXPLANATIONS[st].name} ({ABILITY_SCORE_EXPLANATIONS[st].abbreviation})
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Option B: Choose a Feat */}
                            {(currentChoice.type === 'feat' || isVarHumanSlot) && (
                              <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {(['Todos', 'Combate', 'Magia', 'Utilidad', 'General'] as const).map((cat) => (
                                      <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setFeatCategory(cat)}
                                        className={`px-2.5 py-1 rounded text-[11px] font-fantasy font-bold transition cursor-pointer ${
                                          featCategory === cat
                                            ? 'bg-[#8c672b] text-white shadow-xs'
                                            : 'bg-white text-[#5c4a35] border border-[#d6c4aa]'
                                        }`}
                                      >
                                        {cat}
                                      </button>
                                    ))}
                                  </div>

                                  <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <div className="relative flex-1 sm:w-64">
                                      <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
                                      <input
                                        type="text"
                                        value={featSearch}
                                        onChange={(e) => setFeatSearch(e.target.value)}
                                        placeholder="Buscar dote (ej: Alerta, Tirador)..."
                                        className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setMaximizedFeatSlotIdx(slotIdx);
                                        setIsFeatPickerMaximized(true);
                                      }}
                                      className="px-2.5 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#e4d4ba] text-xs font-fantasy font-bold text-[#4a361c] flex items-center gap-1 transition cursor-pointer shrink-0"
                                      title="Ver compendio de dotes en ventana grande"
                                    >
                                      <Maximize2 className="w-3.5 h-3.5 text-[#8c672b]" />
                                      <span className="hidden sm:inline">Ampliar</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto pr-1">
                                  {OFFICIAL_5E_FEATS
                                    .filter((feat) => {
                                      if (featCategory !== 'Todos' && feat.category !== featCategory) return false;
                                      if (featSearch.trim()) {
                                        const q = featSearch.toLowerCase();
                                        return (
                                          feat.name.toLowerCase().includes(q) ||
                                          feat.description.toLowerCase().includes(q) ||
                                          feat.benefits.some((b) => b.toLowerCase().includes(q))
                                        );
                                      }
                                      return true;
                                    })
                                    .map((feat) => {
                                      const isFeatSelected = currentChoice.featId === feat.id;
                                      const handleSelectFeat = () => {
                                        if (isFeatSelected) {
                                          setSlotChoice({
                                            type: 'feat',
                                            featId: undefined,
                                            featAbilityChoice: undefined,
                                            featSubChoices: [],
                                          });
                                          return;
                                        }
                                        setSlotChoice({
                                          type: 'feat',
                                          featId: feat.id,
                                          featAbilityChoice: feat.abilityBonus?.stats?.length === 1 ? feat.abilityBonus.stats[0] : undefined,
                                          featSubChoices: [],
                                        });
                                      };

                                      return (
                                        <FeatCard
                                          key={feat.id}
                                          feat={feat}
                                          isSelected={isFeatSelected}
                                          onSelect={handleSelectFeat}
                                          onInspect={(data) => setInspectingCompendium(data)}
                                          currentChoice={currentChoice}
                                          setSlotChoice={setSlotChoice}
                                        />
                                      );
                                    })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 5: CLASS & LEVEL PROGRESSION */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'class' && (
                <div id="step-tab-class-content" className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Shield className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 4: Tu Clase, Nivel, Estilos & Competencias
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tu clase determina tu profesión heroica, tu dado de vida, tus competencias con armas y armaduras y la totalidad de tus poderes especiales. Puedes inspeccionar la tabla completa nivel a nivel para planificar tu personaje a futuro.
                      </p>
                    </div>
                  </div>

                  {/* Entire Class Selection: Level Chooser + Class Cards Grid */}
                  <div id="creator-class-catalog" className="space-y-3">
                    {/* Level Chooser */}
                    <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] flex items-center justify-between shadow-xs">
                      <div>
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                          Nivel Inicial del Personaje
                        </h5>
                        <span className="text-[11px] text-[#7a6448]">
                          La mayoría de las campañas inician en nivel 1, pero puedes empezar a niveles mayores.
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCharacterLevel((lvl) => Math.max(1, lvl - 1))}
                          className="w-7 h-7 bg-white border border-[#d6c4aa] rounded text-sm font-bold text-[#4a361c] hover:bg-[#ede1ce]"
                        >
                          -
                        </button>
                        <span className="font-fantasy font-bold text-base text-[#4a361c] px-2 font-mono">
                          Nivel {characterLevel}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCharacterLevel((lvl) => Math.min(20, lvl + 1))}
                          className="w-7 h-7 bg-white border border-[#d6c4aa] rounded text-sm font-bold text-[#4a361c] hover:bg-[#ede1ce]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Class Selection Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[30vh] overflow-y-auto pr-1">
                      {WIKIDOT_CLASSES.map((cls) => {
                        const isSelected = cls.id === selectedClassId;
                        return (
                          <ClassCard
                            key={cls.id}
                            cls={cls}
                            isSelected={isSelected}
                            onSelect={() => {
                              setSelectedClassId(cls.id);
                              setSelectedSubclassId('');
                              setSelectedFightingStyle('');
                              setSelectedClassSkills([]);
                              setExpertiseSkills([]);
                            }}
                            onInspect={(data) => setInspectingCompendium(data)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Subclass Selector & Progression if Class selected */}
                  {activeClass ? (
                    <>
                      {/* SUBCLASS SELECTOR & ADAPTIVE POPUP LAUNCHER */}
                      {activeClass.subclasses && activeClass.subclasses.length > 0 && (
                        <div id="creator-class-subclass" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                              <Sword className="w-4 h-4 text-[#8c672b]" /> Subclase / Especialización ({activeClass.subclassesName})
                            </label>
                            <span className="text-[11px] text-[#8c672b] font-mono font-bold">
                              {isSubclassUnlocked
                                ? activeSubclass
                                  ? activeSubclass.name
                                  : `(Opcional / ${activeClass.subclasses.length} sendas disponibles)`
                                : `Disponible a Nivel ${subclassUnlockLevel}`}
                            </span>
                          </div>

                          {activeSubclass ? (
                            <div className="p-4 bg-[#faf6ee] rounded-xl border-2 border-[#b88c32] shadow-sm space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 rounded-lg bg-[#b88c32] text-white shadow-xs">
                                    <Shield className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="font-fantasy font-bold text-sm text-[#382b20]">
                                      {activeSubclass.name}
                                    </h4>
                                    <span className="text-[11px] text-[#7a6448]">
                                      {activeClass.subclassesName} consagrada de {activeClass.name}
                                    </span>
                                  </div>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#b88c32] text-white flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Activa
                                </span>
                              </div>

                              <p className="text-xs text-[#5c4a35] leading-relaxed">
                                {activeSubclass.description}
                              </p>

                              {activeSubclass.features && activeSubclass.features.length > 0 && (
                                <div className="pt-2 border-t border-[#ebdcc7] space-y-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a6448]">
                                    Rasgos desbloqueados para Nivel {characterLevel}:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {activeSubclass.features
                                      .filter((f) => f.level <= characterLevel)
                                      .map((f, i) => (
                                        <span
                                          key={i}
                                          className="px-2 py-0.5 rounded text-[10px] bg-[#ede0cc] text-[#4a361c] border border-[#d6c4aa] font-medium"
                                          title={f.desc}
                                        >
                                          Nv.{f.level}: {f.name}
                                        </span>
                                      ))}
                                    {activeSubclass.features.filter((f) => f.level <= characterLevel).length === 0 && (
                                      <span className="text-[10px] text-[#8c7860] italic">
                                        Los rasgos de esta senda se activarán al subir a Nivel {subclassUnlockLevel}.
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="pt-2 border-t border-[#ebdcc7] flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setIsSubclassPickerModalOpen(true)}
                                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                                >
                                  <Sword className="w-3.5 h-3.5" /> Cambiar Subclase ({activeClass.subclasses.length} opciones)
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setInspectingCompendium({
                                      id: activeSubclass.id,
                                      title: activeSubclass.name,
                                      subtitle: `Arquetipo de ${activeClass.name}`,
                                      category: `Subclase de ${activeClass.name}`,
                                      iconType: 'subclass',
                                      description: activeSubclass.description,
                                      traits: activeSubclass.features,
                                    })
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#4a361c] text-xs font-bold border border-[#cfbe9f] transition flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#8c672b]" /> Inspeccionar Rasgos (1-20)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedSubclassId('')}
                                  className="px-2.5 py-1.5 rounded-lg bg-[#ede0cc] hover:bg-[#dfceb5] text-[#8c2e28] text-xs font-semibold border border-[#cfbe9f] transition cursor-pointer ml-auto"
                                >
                                  Quitar Selección
                                </button>
                              </div>
                            </div>
                          ) : isSubclassUnlocked ? (
                            <div className="p-4 bg-[#faf6ee] rounded-xl border border-[#d6c4aa] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-[#b88c32]" />
                                  <h4 className="font-fantasy font-bold text-xs sm:text-sm text-[#4a361c]">
                                    Especialización pendiente ({activeClass.subclassesName})
                                  </h4>
                                </div>
                                <p className="text-xs text-[#786450] max-w-lg leading-relaxed">
                                  Tu personaje ha alcanzado el Nivel {characterLevel}. Hay <strong>{activeClass.subclasses.length} sendas oficiales</strong> disponibles para {activeClass.name} en el compendio.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsSubclassPickerModalOpen(true)}
                                className="px-4 py-2 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white font-fantasy font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ring-2 ring-[#ffd56b]/40 shrink-0"
                              >
                                <Sword className="w-4 h-4" /> Elegir Subclase ({activeClass.subclasses.length} opciones)
                              </button>
                            </div>
                          ) : (
                            <div className="p-4 bg-[#ede0cc] rounded-xl border border-[#d1be9e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                              <div className="flex items-start gap-2.5">
                                <Lock className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                  <h4 className="font-fantasy font-bold text-xs text-[#4a361c]">
                                    Las especializaciones ({activeClass.subclassesName}) se eligen a Nivel {subclassUnlockLevel}
                                  </h4>
                                  <p className="text-[11px] text-[#7a6448]">
                                    Tu personaje actualmente es Nivel {characterLevel}. Puedes explorar previamente las {activeClass.subclasses.length} sendas disponibles para planificar su progresión.
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsSubclassPickerModalOpen(true)}
                                className="px-3.5 py-1.5 bg-[#dfceb5] hover:bg-[#d4c1a5] text-[#4a361c] font-fantasy font-bold text-xs rounded-xl border border-[#bfab8d] transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#8c672b]" /> Explorar ({activeClass.subclasses.length} Subclases)
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CLASS & SUBCLASS DECISIONS (Disciplinas elementales, Tótem, Kensei, Runas, Maniobras, Invocaciones, etc.) */}
                      {pendingCreationDecisions.length > 0 && (
                        <div id="creator-class-decisions" className="space-y-4">
                          {pendingCreationDecisions.map((dec) => {
                            const selectedList = creatorClassDecisions[dec.id] || [];
                            const isCompleted = selectedList.length === dec.countNeeded;

                            return (
                              <div
                                key={dec.id}
                                className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-[#ede0cc] rounded-lg text-[#8c672b] border border-[#d6c4aa]">
                                      <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h5 className="font-fantasy font-bold text-xs sm:text-sm text-[#4a361c] uppercase flex items-center gap-1.5">
                                        {dec.title} (Elige {dec.countNeeded})
                                      </h5>
                                      <p className="text-[11px] text-[#5c4a35] mt-0.5 leading-relaxed">
                                        {dec.description}
                                      </p>
                                    </div>
                                  </div>
                                  <span
                                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border self-start sm:self-center shrink-0 ${
                                      isCompleted
                                        ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                                        : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                                    }`}
                                  >
                                    {selectedList.length} / {dec.countNeeded} elegidas
                                  </span>
                                </div>

                                {/* Quick Search if options count > 6 */}
                                {dec.options.length > 6 && (
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-1/2 -translate-y-1/2" />
                                    <input
                                      type="text"
                                      placeholder={`Buscar en ${dec.title}...`}
                                      value={creatorDecisionSearchTerms[dec.id] || ''}
                                      onChange={(e) => setCreatorDecisionSearchTerms((prev) => ({ ...prev, [dec.id]: e.target.value }))}
                                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#d6c4aa] rounded-lg text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b]"
                                    />
                                  </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                                  {dec.options.filter((opt) => {
                                    const term = (creatorDecisionSearchTerms[dec.id] || '').toLowerCase().trim();
                                    if (!term) return true;
                                    return opt.name.toLowerCase().includes(term) || opt.desc.toLowerCase().includes(term);
                                  }).map((opt) => {
                                    const isSelected = selectedList.includes(opt.name);
                                    const optKi = (opt as any).kiCost;
                                    const optLevel = (opt as any).minLevel;

                                    return (
                                      <div
                                        key={opt.id}
                                        className={`p-2.5 rounded-xl border transition flex flex-col justify-between text-left ${
                                          isSelected
                                            ? 'border-[#8c672b] bg-[#ede0cc] shadow-xs ring-1 ring-[#c59b27]'
                                            : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                                        }`}
                                      >
                                        <div>
                                          <div className="flex items-start justify-between gap-1">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                toggleCreatorClassDecision(dec.id, opt.name, dec.countNeeded)
                                              }
                                              className="text-left flex-1 cursor-pointer font-fantasy font-bold text-xs text-[#2c221a] hover:text-[#8c672b] transition flex items-center gap-1.5"
                                            >
                                              {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />}
                                              <span>{opt.name}</span>
                                            </button>

                                            <div className="flex items-center gap-1 shrink-0">
                                              {optKi !== undefined && (
                                                <span className="text-[10px] font-mono text-[#8c672b] bg-white/80 px-1.5 py-0.5 rounded border border-[#d6c4aa]">
                                                  {optKi > 0 ? `${optKi} Ki` : '0 Ki'}
                                                </span>
                                              )}
                                              {optLevel !== undefined && (
                                                <span className="text-[10px] font-mono text-[#5a4837] bg-white/70 px-1.5 py-0.5 rounded border border-[#d8c8af]">
                                                  Nv {optLevel}
                                                </span>
                                              )}
                                              {opt.badge && (
                                                <span className="text-[10px] font-mono text-[#542d72] bg-white/70 px-1.5 py-0.5 rounded border border-[#d2b8ea]">
                                                  {opt.badge}
                                                </span>
                                              )}
                                              {/* Ojito 👁️ para Inspeccionar 1:1 con Wikidot */}
                                              <button
                                                type="button"
                                                title="Ver detalles completos de la opción"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setInspectingCompendium({
                                                    id: opt.id,
                                                    title: opt.name,
                                                    subtitle: dec.title,
                                                    category: 'Decisión de Clase',
                                                    description: opt.desc,
                                                    detailedDescription: (opt as any).details,
                                                    prerequisite: opt.prerequisite,
                                                    badges: [
                                                      ...(optKi !== undefined
                                                        ? [{ label: 'Coste Ki', value: optKi > 0 ? `${optKi} Ki` : '0 Ki (Básico)', variant: 'amber' as const }]
                                                        : []),
                                                      ...(optLevel !== undefined
                                                        ? [{ label: 'Nivel Mínimo', value: `Nivel ${optLevel}+`, variant: 'gold' as const }]
                                                        : []),
                                                      ...(opt.badge ? [{ label: 'Tipo', value: opt.badge, variant: 'neutral' as const }] : []),
                                                      ...(opt.prerequisite ? [{ label: 'Requisito', value: opt.prerequisite, variant: 'neutral' as const }] : []),
                                                    ],
                                                  });
                                                }}
                                                className="p-1 text-[#8c672b] hover:text-[#5a4837] hover:bg-[#ede1ce] rounded transition cursor-pointer"
                                              >
                                                <Eye className="w-3.5 h-3.5" />
                                              </button>
                                            </div>
                                          </div>

                                          <p className="text-[11px] text-[#6e5c4a] mt-1 leading-snug">
                                            {opt.desc}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* LEVEL-BY-LEVEL PROGRESSION ACCORDION (1 to 20) */}
                      <div id="creator-class-progression" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-[#8c672b]" /> Progresión Nivel a Nivel de {activeClass.name}
                          </h5>
                          <div className="flex items-center gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => setActiveProgressionTab('current')}
                              className={`px-2.5 py-1 rounded text-[11px] font-fantasy font-bold transition cursor-pointer ${
                                activeProgressionTab === 'current'
                                  ? 'bg-[#8c672b] text-white shadow'
                                  : 'bg-white text-[#5c4a35] border border-[#d6c4aa]'
                              }`}
                            >
                              Hasta Nivel {characterLevel}
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveProgressionTab('all')}
                              className={`px-2.5 py-1 rounded text-[11px] font-fantasy font-bold transition cursor-pointer ${
                                activeProgressionTab === 'all'
                                  ? 'bg-[#8c672b] text-white shadow'
                                  : 'bg-white text-[#5c4a35] border border-[#d6c4aa]'
                              }`}
                            >
                              Ver Todos (1-20)
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                          {combinedProgression
                            .filter((feat) => activeProgressionTab === 'all' || feat.level <= characterLevel)
                            .map((feat, i) => (
                              <ClassProgressionCard
                                key={i}
                                feat={feat}
                                characterLevel={characterLevel}
                                classNameStr={activeClass.name}
                                onInspect={(data) => setInspectingCompendium(data)}
                              />
                            ))}
                        </div>
                      </div>

                      {/* Class Skills Selection */}
                      <div id="creator-class-skills">
                        {classConfig ? (
                          <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                            <div className="flex items-center justify-between">
                              <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                                Habilidades de Clase: Elige {classConfig.count} ({selectedClassSkills.length}/{classConfig.count} seleccionadas)
                              </h5>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {classConfig.availableSkills.map((sk) => {
                                const isFromBg = backgroundSkills.includes(sk);
                                const isFromRace = racialSkills.includes(sk);
                                const isFromBonusRace = bonusRacialSkills.includes(sk);
                                const isSelectedByClass = selectedClassSkills.includes(sk);
                                const isTaken = isFromBg || isFromRace || isFromBonusRace || isSelectedByClass;

                                return (
                                  <SkillTooltip key={sk} skillName={sk}>
                                    <div
                                      onClick={() => toggleClassSkill(sk)}
                                      className={`p-2.5 rounded-lg border text-left transition flex items-center justify-between gap-2 h-full ${
                                        isFromBg
                                          ? 'bg-[#ede1ce] border-[#cbb99f] opacity-80 cursor-not-allowed'
                                          : isFromRace || isFromBonusRace
                                          ? 'bg-[#e2edd8] border-[#b2d4a5] opacity-80 cursor-not-allowed'
                                          : isSelectedByClass
                                          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-xs cursor-pointer'
                                          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b] cursor-pointer'
                                      }`}
                                    >
                                      <div>
                                        <span className="font-fantasy font-bold text-xs block text-[#4a361c]">{sk}</span>
                                        <span className="text-[9px] text-[#7a6448]">
                                          {isFromBg ? 'Otorgado por Trasfondo' : isFromRace || isFromBonusRace ? 'Otorgado por Raza' : 'Disponible'}
                                        </span>
                                      </div>

                                      <div
                                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                          isTaken ? 'bg-[#8c672b] text-white border-[#8c672b]' : 'border-[#b0a086] bg-white'
                                        }`}
                                      >
                                        {isTaken && <Check className="w-3 h-3" />}
                                      </div>
                                    </div>
                                  </SkillTooltip>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                            Selecciona una clase para habilitar la selección de habilidades de clase.
                          </div>
                        )}

                        {/* Expertise (Doble Competencia x2) Selector if eligible */}
                        {expertiseConfig.allowedCount > 0 && (
                          <div id="creator-class-expertise" className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <Star className="w-4 h-4 text-[#8c672b]" /> {expertiseConfig.title}
                                </h5>
                                <p className="text-[11px] text-[#5c4a35] mt-0.5 leading-relaxed">
                                  {expertiseConfig.desc} Tu bonificador de competencia se <strong>duplica (+{profBonus * 2} en lugar de +{profBonus})</strong> en las pruebas que hagas con estas habilidades.
                                </p>
                              </div>
                              <span className="text-[11px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                                {validExpertiseSkills.length} / {expertiseConfig.allowedCount} con Pericia
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {totalSkills.map((sk) => {
                                const isExpert = validExpertiseSkills.includes(sk);
                                return (
                                  <button
                                    key={`exp-btn-${sk}`}
                                    type="button"
                                    onClick={() => toggleExpertiseSkill(sk)}
                                    className={`p-2.5 rounded-lg border text-xs font-fantasy font-bold transition flex items-center justify-between gap-1 cursor-pointer ${
                                      isExpert
                                        ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                        : 'bg-white border-[#d6c4aa] text-[#4a361c] hover:border-[#8c672b]'
                                    }`}
                                  >
                                    <span className="truncate">{sk}</span>
                                    <span className="text-[10px] font-mono px-1 rounded bg-black/10">
                                      {isExpert ? `⭐ +${profBonus * 2}` : `+${profBonus}`}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Fighting Style Selector directly inside Class Step if applicable */}
                        {(['guerrero', 'paladin', 'explorador'].includes(activeClass.id)) && hasTacticalFeatures && (
                          <div id="creator-class-fighting-style" className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <Sword className="w-4 h-4 text-[#8c672b]" /> Estilo de Combate (Fighting Style)
                                </h5>
                                <p className="text-[11px] text-[#5c4a35] mt-0.5">
                                  Especialización marcial y táctica de tu {activeClass.name} a nivel {characterLevel}.
                                </p>
                              </div>
                              <span className="text-[11px] text-[#8c672b] font-mono font-bold">
                                {selectedFightingStyle
                                  ? FIGHTING_STYLE_OPTIONS.find((f) => f.id === selectedFightingStyle)?.name
                                  : 'Sin seleccionar'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {FIGHTING_STYLE_OPTIONS.filter((f) => f.allowedClasses.includes(activeClass.id)).map((style) => {
                                const isSelected = style.id === selectedFightingStyle;
                                return (
                                  <FightingStyleCard
                                    key={style.id}
                                    style={style}
                                    isSelected={isSelected}
                                    onSelect={() => setSelectedFightingStyle(style.id)}
                                    onInspect={(data) => setInspectingCompendium(data)}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona una clase de la lista para ver sus subclases, progresión y habilidades.
                    </div>
                  )}
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 6: CLASS FEATURES & TACTICAL CHOICES (ONLY IF AVAILABLE) */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'class_features' && hasTacticalFeatures && (
                <div className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Sword className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 6: Estilos de Combate & Rasgos Tácticos
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Muchas clases te exigen definir tu especialidad marcial o mágica desde nivel 1. Aquí eliges tu <strong>Estilo de Combate</strong> (para Guerreros, Paladines y Exploradores) y revisas tus recursos iniciales.
                      </p>
                    </div>
                  </div>

                  {activeClass ? (
                    <>
                      {/* Fighting Style Selector if applicable */}
                      {(['guerrero', 'paladin', 'explorador'].includes(activeClass.id)) && (
                        <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase">
                              Elige tu Estilo de Combate (Fighting Style)
                            </label>
                            <span className="text-[11px] text-[#8c672b] font-mono font-bold">
                              {selectedFightingStyle
                                ? FIGHTING_STYLE_OPTIONS.find((f) => f.id === selectedFightingStyle)?.name
                                : 'Sin seleccionar'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {FIGHTING_STYLE_OPTIONS.filter((f) => f.allowedClasses.includes(activeClass.id)).map((style) => {
                              const isSelected = style.id === selectedFightingStyle;
                              return (
                                <FightingStyleCard
                                  key={style.id}
                                  style={style}
                                  isSelected={isSelected}
                                  onSelect={() => setSelectedFightingStyle(style.id)}
                                  onInspect={(data) => setInspectingCompendium(data)}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Class Resources & Tactical Overview */}
                      <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-[#8c672b]" /> Recursos de Clase Iniciales para {activeClass.name}
                        </h5>

                        <div className="space-y-2">
                          {activeClass.defaultResources?.map((res) => (
                            <div key={res.id} className="p-3 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] flex items-start justify-between gap-3 text-xs shadow-xs">
                              <div>
                                <span className="font-fantasy font-bold text-[#4a361c] text-xs block">
                                  {res.name} (Máximo a Nivel {characterLevel}: {res.calculateMax(characterLevel)})
                                </span>
                                <p className="text-[#5c4a35] text-[11px] mt-0.5 leading-relaxed">
                                  {res.description}
                                </p>
                              </div>
                              <span className="text-[10px] bg-[#ede1ce] text-[#5e4b37] px-2 py-0.5 rounded font-mono font-bold shrink-0">
                                Recarga: {res.resetOn === 'short' ? 'Descanso Corto' : 'Descanso Largo'}
                              </span>
                            </div>
                          ))}

                          {(!activeClass.defaultResources || activeClass.defaultResources.length === 0) && (
                            <p className="text-xs text-[#7a6448] italic">
                              Esta clase no requiere contadores de recursos limitados a nivel 1 o se gestiona mediante ranuras de conjuro.
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Debes seleccionar primero una clase en el paso anterior para configurar sus rasgos tácticos y recursos iniciales.
                    </div>
                  )}
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 7: BACKGROUND & ROLES */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'background' && (
                <div id="step-tab-background-content" className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <BookOpen className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 3: Tu Trasfondo Oficial (99 Disponibles)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tu trasfondo representa de dónde vienes y qué hacías antes de convertirte en aventurero. Te otorga <strong>2 competencias fijas</strong>, idiomas o herramientas y un <strong>Rasgo Especial de Trasfondo</strong> para interactuar con el mundo.
                      </p>
                    </div>
                  </div>

                  {/* Entire Background Selection: Filters + Search + Catalog Accordion */}
                  <div id="creator-background-catalog" className="space-y-3">
                    {/* Orientation Filter Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap bg-[#f5ede0] p-2.5 rounded-xl border border-[#d6c4aa]">
                      <span className="text-[10px] text-[#7a6448] font-fantasy font-bold uppercase mr-1">
                        Filtrar por Enfoque / Rol:
                      </span>
                      {(['Todos', 'Magia', 'Combate', 'Sigilo', 'Social', 'Exploración'] as const).map((ori) => {
                        const isAct = backgroundOrientationFilter === ori;
                        const count = backgroundOrientationCounts[ori] || 0;
                        const icons: Record<string, string> = {
                          Todos: '🌟',
                          Magia: '🔮',
                          Combate: '⚔️',
                          Sigilo: '🗡️',
                          Social: '💬',
                          Exploración: '🧭',
                        };
                        return (
                          <button
                            key={ori}
                            type="button"
                            onClick={() => setBackgroundOrientationFilter(ori)}
                            className={`px-2.5 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer border flex items-center gap-1 ${
                              isAct
                                ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                            }`}
                          >
                            <span>{icons[ori]}</span>
                            <span>{ori}</span>
                            <span className="text-[10px] opacity-80 font-mono font-bold">({count})</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Background Search & Controls Header */}
                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1.5">
                          Compendio Oficial ({WIKIDOT_BACKGROUNDS.length} Trasfondos)
                        </span>
                        <button
                          type="button"
                          onClick={expandAllBackgroundCategories}
                          className="text-[11px] text-[#8c672b] hover:text-[#5e4318] hover:underline font-bold cursor-pointer"
                          title="Expandir todas las categorías"
                        >
                          Expandir Todo
                        </button>
                        <span className="text-[#c0ad97] text-xs">•</span>
                        <button
                          type="button"
                          onClick={collapseAllBackgroundCategories}
                          className="text-[11px] text-[#8c672b] hover:text-[#5e4318] hover:underline font-bold cursor-pointer"
                          title="Colapsar todas las categorías"
                        >
                          Colapsar Todo
                        </button>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                          <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            value={backgroundSearch}
                            onChange={(e) => setBackgroundSearch(e.target.value)}
                            placeholder="Buscar trasfondo (ej: Soldado, Pirata, Noble)..."
                            className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                          />
                        </div>
                        <button
                          id="creator-background-maximize-btn"
                          type="button"
                          onClick={() => setIsBackgroundPickerMaximized(true)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#e4d4ba] text-xs font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs hover:border-[#6a4f21]"
                          title="Maximizar catálogo para ver todos los trasfondos disponibles en pantalla completa"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-[#8c672b]" />
                          <span>Maximizar Catálogo</span>
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Category Sections Accordion */}
                    <div className="space-y-3 max-h-[44vh] overflow-y-auto pr-1">
                      {groupedBackgrounds.length === 0 ? (
                        <div className="p-6 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                          No se encontraron trasfondos que coincidan con los filtros aplicados.
                        </div>
                      ) : (
                        groupedBackgrounds.map((group) => {
                          const isCollapsed = !!collapsedBackgroundCategories[group.category];
                          const categoryIcons: Record<string, string> = {
                            'Common Backgrounds': '📜',
                            'AL: Curse of Strahd': '🦇',
                            'AL: Mulmaster': '⛏️',
                            'AL: Hillsfar': '🌲',
                            'Setting: Acquisitions inc.': '💼',
                            'Setting: Amonkhet': '☀️',
                            'Setting: Dragonlance': '🐉',
                            'Setting: Innistrad': '🌙',
                            'Setting: Planescape': '🌀',
                            'Setting: Ravnica': '🏛️',
                            'Setting: Strixhaven': '🎓',
                            'Setting: Wildemount': '❄️',
                            'Setting: Spelljammer': '🚀',
                            'Homebrew': '✨',
                          };
                          const catIcon = categoryIcons[group.category] || '📖';

                          return (
                            <div
                              key={group.category}
                              className="bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] overflow-hidden shadow-2xs"
                            >
                              {/* Collapsible Accordion Header */}
                              <button
                                type="button"
                                onClick={() => toggleBackgroundCategoryCollapse(group.category)}
                                className="w-full px-3 py-2 bg-gradient-to-r from-[#ebdcc4] to-[#f5ede0] hover:bg-[#e4d4ba] border-b border-[#d6c4aa] flex items-center justify-between transition cursor-pointer text-left"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{catIcon}</span>
                                  <span className="font-fantasy font-bold text-xs text-[#4a361c] uppercase tracking-wide">
                                    {group.category}
                                  </span>
                                  <span className="px-1.5 py-0.2 rounded-full bg-[#d6c4aa] text-[#4a361c] text-[10px] font-mono font-bold">
                                    {group.backgrounds.length}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-[#7a6448] font-bold">
                                  <span>{isCollapsed ? 'Desplegar' : 'Colapsar'}</span>
                                  {isCollapsed ? (
                                    <ChevronRight className="w-3.5 h-3.5 text-[#8c672b]" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-[#8c672b]" />
                                  )}
                                </div>
                              </button>

                              {/* Cards Grid when expanded */}
                              {!isCollapsed && (
                                <div className="p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {group.backgrounds.map((bg) => {
                                    const isSelected = bg.id === selectedBackgroundId;
                                    return (
                                      <BackgroundCard
                                        key={bg.id}
                                        bg={bg}
                                        isSelected={isSelected}
                                        onSelect={() => setSelectedBackgroundId(bg.id)}
                                        onInspect={(data) => setInspectingCompendium(data)}
                                      />
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Selected Background Feature Details & Interactive Choices */}
                  {activeBackground ? (
                    <div className="space-y-4">
                      {/* Background Header Summary Banner */}
                      <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-fantasy font-bold text-sm text-[#4a361c]">
                              {activeBackground.name}
                            </h4>
                            <span className="text-[10px] bg-[#ede1ce] text-[#7a6448] px-2 py-0.5 rounded font-mono font-bold">
                              {activeBackground.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                            {(() => {
                              const desc = activeBackground.description || '';
                              const detailed = activeBackground.detailedDescription || '';
                              if (detailed && (desc.endsWith('...') || detailed.length > desc.length)) {
                                return detailed;
                              }
                              return desc;
                            })()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 bg-[#ebdcc4] border border-[#c4b094] px-3 py-1.5 rounded-lg shadow-xs">
                          <Coins className="w-4 h-4 text-[#8c672b]" />
                          <div className="text-right">
                            <span className="text-[10px] text-[#7a6448] font-fantasy uppercase block leading-none">Oro Inicial</span>
                            <span className="font-fantasy font-bold text-xs text-[#4a361c]">{formatBackgroundWealth(activeBackground)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Skill Choices (if background grants choices) */}
                      {activeBackground.skillChoices ? (
                        <div id="creator-background-skill-choices" className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-[#8c672b]" /> Elección de Habilidades (Elige {activeBackground.skillChoices.count})
                            </h5>
                            <span className="text-[11px] font-bold text-[#8c672b] bg-[#f5ede0] px-2.5 py-0.5 rounded-full border border-[#d6c4aa]">
                              {selectedBackgroundSkills.length} de {activeBackground.skillChoices.count} elegidas
                            </span>
                          </div>
                          <p className="text-[11px] text-[#7a6448] leading-relaxed">
                            El manual oficial establece que con este trasfondo debes elegir <strong>{activeBackground.skillChoices.count}</strong> competencias entre las siguientes opciones:
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {activeBackground.skillChoices.options.map((skillName) => {
                              const isChecked = selectedBackgroundSkills.includes(skillName);
                              return (
                                <button
                                  key={skillName}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setSelectedBackgroundSkills((prev) => prev.filter((s) => s !== skillName));
                                    } else {
                                      if (selectedBackgroundSkills.length < activeBackground.skillChoices!.count) {
                                        setSelectedBackgroundSkills((prev) => [...prev, skillName]);
                                      } else {
                                        setSelectedBackgroundSkills((prev) => [...prev.slice(1), skillName]);
                                      }
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                                    isChecked
                                      ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs'
                                      : 'bg-[#faf6ee] text-[#4a361c] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                                  }`}
                                >
                                  {isChecked ? <Check className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-[#8c672b]" />}
                                  <span>{skillName}</span>
                                </button>
                              );
                            })}
                          </div>
                        {activeBackground.skillProficiencies && activeBackground.skillProficiencies.length > 0 && (
                          <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs flex items-center justify-between text-xs">
                            <span className="font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-[#8c672b]" /> Habilidad Fija de Trasfondo:
                            </span>
                            <span className="text-[#5c4a35] font-semibold">
                              {activeBackground.skillProficiencies.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs flex items-center justify-between text-xs">
                        <span className="font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#8c672b]" /> Habilidades de Trasfondo:
                        </span>
                        <span className="text-[#5c4a35] font-semibold">
                          {activeBackground.skillProficiencies?.join(', ') || 'Ninguna'}
                        </span>
                      </div>
                    )}

                    {/* Fixed Tool Proficiencies (e.g. Gladiator Disguise kit, Investigator Disguise & Thieves tools) */}
                    {activeBackground.toolProficiencies && activeBackground.toolProficiencies.length > 0 && (
                      <div className="p-3 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <span className="font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#8c672b]" /> Competencias en Herramientas (Fijas):
                          </span>
                          <span className="text-[10px] text-[#7a6448] font-mono italic block mt-0.5">
                            (Otorga bonificador de competencia al usar estas herramientas en pruebas y tiradas)
                          </span>
                        </div>
                        <span className="text-[#5c4a35] font-bold bg-[#ebdcc4] px-2.5 py-1 rounded-lg border border-[#c4b094] self-start sm:self-auto">
                          {activeBackground.toolProficiencies.join(', ')}
                        </span>
                      </div>
                    )}

                      {/* Interactive Tool Choices (if background grants tool choices) */}
                      {activeBackground.toolChoices && (
                        <div id="creator-background-tools" className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[#e2d2bc] pb-2">
                            <div>
                              <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                <Package className="w-4 h-4 text-[#8c672b]" /> Elección de Competencia en Herramientas / Instrumentos (Elige {activeBackground.toolChoices.count})
                              </h5>
                              <p className="text-[11px] text-[#7a6448] mt-0.5">
                                Selecciona entre las opciones canónicas disponibles o introduce un instrumento o herramienta personalizada.
                              </p>
                            </div>
                            <span className="text-[11px] font-bold text-[#8c672b] bg-[#f5ede0] px-2.5 py-0.5 rounded-full border border-[#d6c4aa] shrink-0 self-start sm:self-auto">
                              {selectedBackgroundTools.length} de {activeBackground.toolChoices.count} elegidas
                            </span>
                          </div>

                          {/* Predefined Canonical Options */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {activeBackground.toolChoices.options.map((toolName) => {
                              const isChecked = selectedBackgroundTools.includes(toolName);
                              return (
                                <button
                                  key={toolName}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setSelectedBackgroundTools((prev) => prev.filter((t) => t !== toolName));
                                    } else {
                                      if (selectedBackgroundTools.length < activeBackground.toolChoices!.count) {
                                        setSelectedBackgroundTools((prev) => [...prev, toolName]);
                                      } else {
                                        setSelectedBackgroundTools((prev) => [...prev.slice(1), toolName]);
                                      }
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                                    isChecked
                                      ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs'
                                      : 'bg-[#faf6ee] text-[#4a361c] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                                  }`}
                                >
                                  {isChecked ? <Check className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-[#8c672b]" />}
                                  <span>{toolName}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Custom Tool / Instrument Write-in Field */}
                          <div className="pt-2.5 border-t border-[#e2d2bc]/60 space-y-2">
                            <span className="text-[11px] text-[#7a6448] font-bold block">
                              ¿Prefieres otro instrumento musical o herramienta personalizada? Escríbela aquí:
                            </span>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Ej: Gaita enana, Viola de gamba, Chalumeau, Tamboril..."
                                value={customBackgroundToolInput}
                                onChange={(e) => setCustomBackgroundToolInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCustomBackgroundTool();
                                  }
                                }}
                                className="flex-1 bg-white border border-[#d6c4aa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                              />
                              <button
                                type="button"
                                onClick={handleAddCustomBackgroundTool}
                                disabled={!customBackgroundToolInput.trim()}
                                className="px-3 py-1.5 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1 shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
                              >
                                <Plus className="w-3.5 h-3.5" /> Añadir / Asignar
                              </button>
                            </div>

                            {/* Display selected custom tools */}
                            {selectedBackgroundTools.filter((t) => !activeBackground.toolChoices?.options.includes(t)).length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                <span className="text-[10px] text-[#7a6448] uppercase font-bold">Herramientas personalizadas asignadas:</span>
                                {selectedBackgroundTools
                                  .filter((t) => !activeBackground.toolChoices?.options.includes(t))
                                  .map((toolName) => (
                                    <span
                                      key={toolName}
                                      className="inline-flex items-center gap-1.5 bg-[#8c672b] text-white text-xs px-2.5 py-1 rounded-lg font-bold shadow-xs"
                                    >
                                      <span>{toolName}</span>
                                      <button
                                        type="button"
                                        onClick={() => setSelectedBackgroundTools((prev) => prev.filter((t) => t !== toolName))}
                                        className="hover:text-red-200 cursor-pointer"
                                        title="Eliminar esta selección"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </span>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Interactive Equipment Choices (Evidence, Trinkets, Specialized items) */}
                      {activeBackground.equipmentChoices && activeBackground.equipmentChoices.length > 0 && (
                        <div id="creator-background-trinkets" className="space-y-3">
                          {activeBackground.equipmentChoices.map((choice) => (
                            <div key={choice.id} className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <Sparkles className="w-4 h-4 text-[#8c672b]" /> {choice.label}
                                </h5>
                                {choice.type === 'horror_trinket' && (
                                  <span className="text-[10px] bg-[#3b2818] text-[#e8c37d] px-2 py-0.5 rounded font-mono font-bold">
                                    Tabla d100 de Horror
                                  </span>
                                )}
                                {choice.type === 'standard_trinket' && (
                                  <span className="text-[10px] bg-[#3b2818] text-[#e8c37d] px-2 py-0.5 rounded font-mono font-bold">
                                    Tabla Común d100
                                  </span>
                                )}
                                {choice.type === 'feywild_trinket' && (
                                  <span className="text-[10px] bg-[#3b2818] text-[#e8c37d] px-2 py-0.5 rounded font-mono font-bold">
                                    Tabla Feérica
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#5c4a35] leading-relaxed">
                                {choice.description}
                              </p>

                              {/* Action Buttons: Roll d100 & Pick from List */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                                {choice.type === 'horror_trinket' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rolled = rollGothicHorrorTrinket();
                                      const itemText = `(d100 #${rolled.roll}) ${rolled.name}: ${rolled.description}`;
                                      setSelectedBackgroundEquipmentChoices((prev) => ({
                                        ...prev,
                                        [choice.id]: itemText,
                                      }));
                                      setLastTrinketRollFeedback({ choiceId: choice.id, roll: rolled.roll, text: rolled.name });
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#dfcdb1] text-xs font-fantasy font-bold text-[#4a361c] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs shrink-0"
                                  >
                                    <Dices className="w-4 h-4 text-[#8c672b]" />
                                    <span>🎲 Tirar 1d100 en la Tabla del Horror</span>
                                  </button>
                                )}
                                {choice.type === 'standard_trinket' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rolled = rollStandardTrinket();
                                      const itemText = `(d100 #${rolled.roll}) ${rolled.name}: ${rolled.description}`;
                                      setSelectedBackgroundEquipmentChoices((prev) => ({
                                        ...prev,
                                        [choice.id]: itemText,
                                      }));
                                      setLastTrinketRollFeedback({ choiceId: choice.id, roll: rolled.roll, text: rolled.name });
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#dfcdb1] text-xs font-fantasy font-bold text-[#4a361c] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs shrink-0"
                                  >
                                    <Dices className="w-4 h-4 text-[#8c672b]" />
                                    <span>🎲 Tirar 1d100 en la Tabla Común</span>
                                  </button>
                                )}
                                {choice.type === 'feywild_trinket' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rolled = rollFeywildTrinket();
                                      const itemText = `(d100 #${rolled.roll}) ${rolled.name}: ${rolled.description}`;
                                      setSelectedBackgroundEquipmentChoices((prev) => ({
                                        ...prev,
                                        [choice.id]: itemText,
                                      }));
                                      setLastTrinketRollFeedback({ choiceId: choice.id, roll: rolled.roll, text: rolled.name });
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#dfcdb1] text-xs font-fantasy font-bold text-[#4a361c] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs shrink-0"
                                  >
                                    <Dices className="w-4 h-4 text-[#8c672b]" />
                                    <span>🎲 Tirar 1d100 en la Tabla Feérica</span>
                                  </button>
                                )}

                                {/* Dropdown Selector */}
                                {(choice.type === 'horror_trinket' || choice.type === 'standard_trinket' || choice.type === 'feywild_trinket') && (
                                  <div className="relative flex-1">
                                    <select
                                      aria-label={`Seleccionar ${choice.label}`}
                                      value=""
                                      onChange={(e) => {
                                        if (e.target.value) {
                                          setSelectedBackgroundEquipmentChoices((prev) => ({
                                            ...prev,
                                            [choice.id]: e.target.value,
                                          }));
                                        }
                                      }}
                                      className="w-full bg-white border border-[#d6c4aa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                                    >
                                      <option value="">-- O elige directamente de la lista --</option>
                                      {(choice.type === 'horror_trinket'
                                        ? GOTHIC_HORROR_TRINKETS
                                        : choice.type === 'feywild_trinket'
                                        ? FEYWILD_TRINKETS
                                        : STANDARD_TRINKETS
                                      ).map((trinket) => (
                                        <option
                                          key={trinket.roll}
                                          value={`(d100 #${trinket.roll}) ${trinket.name}: ${trinket.description}`}
                                        >
                                          #{trinket.roll}: {trinket.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}

                                {choice.type === 'custom_choice' && choice.options && (
                                  <div className="relative flex-1">
                                    <select
                                      aria-label={`Seleccionar ${choice.label}`}
                                      value={selectedBackgroundEquipmentChoices[choice.id] || choice.defaultItem || choice.options[0]}
                                      onChange={(e) => {
                                        setSelectedBackgroundEquipmentChoices((prev) => ({
                                          ...prev,
                                          [choice.id]: e.target.value,
                                        }));
                                      }}
                                      className="w-full bg-white border border-[#d6c4aa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer font-bold"
                                    >
                                      {choice.options.map((opt) => (
                                        <option key={opt} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </div>

                              {/* Roll Feedback Banner */}
                              {lastTrinketRollFeedback && lastTrinketRollFeedback.choiceId === choice.id && (
                                <div className="p-2 bg-[#f4ecd8] border border-[#d0b47e] rounded-lg flex items-center gap-2 text-xs text-[#5e4315] animate-fade-in">
                                  <Dices className="w-4 h-4 text-[#8c672b] shrink-0" />
                                  <span>
                                    ¡Tiraste un <strong>d100 = #{lastTrinketRollFeedback.roll}</strong>: <em>{lastTrinketRollFeedback.text}</em>!
                                  </span>
                                </div>
                              )}

                              {/* Text Input to customize item */}
                              <div className="space-y-1">
                                <span className="text-[10px] text-[#7a6448] font-bold block">
                                  Elemento asignado al inventario (editable):
                                </span>
                                <input
                                  type="text"
                                  value={selectedBackgroundEquipmentChoices[choice.id] || ''}
                                  onChange={(e) => {
                                    setSelectedBackgroundEquipmentChoices((prev) => ({
                                      ...prev,
                                      [choice.id]: e.target.value,
                                    }));
                                  }}
                                  placeholder="Escribe o selecciona tu objeto / evidencia..."
                                  className="w-full bg-white border border-[#d6c4aa] rounded-lg px-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Special Feature Details */}
                      <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-[#8c672b]" /> Rasgo Especial: {activeBackground.featureName}
                        </h5>
                        <p className="text-xs text-[#5c4a35] leading-relaxed">
                          {activeBackground.featureDescription}
                        </p>
                        {activeBackground.suggestedEquipment && (
                          <div className="pt-2 border-t border-[#e2d2bc] text-[11px] text-[#7a6448] italic flex items-center justify-between">
                            <div>
                              <strong>Equipo Oficial:</strong> {activeBackground.suggestedEquipment}
                            </div>
                            <span className="font-mono font-bold text-[#8c672b] not-italic shrink-0 ml-2">
                              💰 {formatBackgroundWealth(activeBackground)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Background Languages Selector (if granted) */}
                      {((activeBackground.languagesCount && activeBackground.languagesCount > 0) ||
                        (activeBackground.fixedLanguages && activeBackground.fixedLanguages.length > 0)) && (
                        <div id="creator-background-languages" className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-3.5">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[#e2d2bc] pb-2">
                            <div>
                              <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                <Languages className="w-4 h-4 text-[#8c672b]" /> Idiomas de Trasfondo ({activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 0} en total)
                              </h5>
                              <p className="text-[11px] text-[#7a6448] mt-0.5">
                                Tu historia y raíces te han enseñado a comunicarte en lenguas adicionales a las de tu linaje racial.
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-[#8c672b] bg-[#f5ede0] px-2.5 py-0.5 rounded-full border border-[#d6c4aa] shrink-0 self-start sm:self-auto">
                                {selectedBackgroundLanguages.length} de {activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 1} seleccionados
                              </span>
                            </div>
                          </div>

                          {/* Known Racial Languages Banner */}
                          <div className="flex items-start gap-2.5 p-2.5 bg-[#f5efe6] rounded-lg border border-[#dfd2be] text-[11px] text-[#5a442a]">
                            <Shield className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="font-bold font-fantasy text-[#4a361c]">
                                Idiomas conocidos por tu linaje racial ({activeRace?.name || 'Sin Raza'}):{' '}
                              </span>
                              <span className="font-semibold text-[#8c672b]">
                                {knownRacialLanguages.join(', ')}
                              </span>
                              <span className="text-[10px] text-[#7a6448] block mt-0.5 italic">
                                ✨ Ya dominados de nacimiento por tu raza. No consumen ninguna de las ranuras de tu trasfondo.
                              </span>
                            </div>
                          </div>

                          {/* Language Note (if any, e.g. Haunted One rule) */}
                          {activeBackground.languageNote && (
                            <div className="flex items-start gap-2 p-2.5 bg-[#fffaf0] rounded-lg border border-[#e8c882] text-[11px] text-[#7c5315]">
                              <Info className="w-4 h-4 text-[#b88c32] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold block">Regla Especial de este Trasfondo:</span>
                                <span>{activeBackground.languageNote}</span>
                              </div>
                            </div>
                          )}

                          {/* Fixed Languages (e.g. Gigante, Élfico) */}
                          {activeBackground.fixedLanguages && activeBackground.fixedLanguages.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-[#7a6448] uppercase font-bold tracking-wider flex items-center gap-1">
                                <Lock className="w-3 h-3 text-[#8c672b]" /> Idioma obligatorio de este trasfondo:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {activeBackground.fixedLanguages.map((fl) => (
                                  <span
                                    key={fl}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8c672b] text-white rounded-lg text-xs font-fantasy font-bold shadow-xs"
                                  >
                                    <Lock className="w-3 h-3 text-amber-200" />
                                    <span>{fl}</span>
                                    <span className="text-[10px] text-amber-200 opacity-90 font-mono font-normal">(Fijo)</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* RESTRICTED LANGUAGE OPTIONS (e.g. Feylost: Elvish, Gnomish, Goblin, or Sylvan) */}
                          {activeBackground.languageOptions && activeBackground.languageOptions.length > 0 ? (
                            <div className="p-3 bg-[#faf6ee] rounded-xl border border-[#dcd0bc] space-y-2">
                              <div className="flex items-center justify-between border-b border-[#e8ddcb] pb-1.5">
                                <div>
                                  <span className="text-xs font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5">
                                    <Languages className="w-4 h-4 text-[#8c672b]" /> Idiomas Específicos Permitidos (Elige {activeBackground.languagesCount || 1})
                                  </span>
                                  <span className="text-[10px] text-[#7a6448] block mt-0.5">
                                    Este trasfondo solo permite elegir entre las siguientes lenguas tradicionales:
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-[#8c672b] bg-[#f5ede0] px-2.5 py-0.5 rounded-full border border-[#d6c4aa]">
                                  {selectedBackgroundLanguages.filter((l) => activeBackground.languageOptions?.includes(l)).length} de {activeBackground.languagesCount || 1} seleccionados
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 pt-1">
                                {activeBackground.languageOptions.map((optName) => {
                                  const langObj = OFFICIAL_5E_LANGUAGES.find(
                                    (l) => l.name.toLowerCase() === optName.toLowerCase() || optName.toLowerCase().includes(l.name.toLowerCase())
                                  );
                                  const isRacial = knownRacialLanguages.some(
                                    (rl) => rl.toLowerCase() === optName.toLowerCase() || optName.toLowerCase().startsWith(rl.toLowerCase())
                                  );
                                  const isSelected = selectedBackgroundLanguages.includes(optName);
                                  const maxAllowed = activeBackground.languagesCount || 1;

                                  return (
                                    <button
                                      key={optName}
                                      type="button"
                                      disabled={isRacial}
                                      onClick={() => {
                                        if (isRacial) return;
                                        if (isSelected) {
                                          setSelectedBackgroundLanguages((prev) => prev.filter((l) => l !== optName));
                                        } else {
                                          if (selectedBackgroundLanguages.length < maxAllowed) {
                                            setSelectedBackgroundLanguages((prev) => [...prev, optName]);
                                          } else {
                                            const otherChoice = selectedBackgroundLanguages.find((l) =>
                                              activeBackground.languageOptions?.includes(l)
                                            );
                                            if (otherChoice) {
                                              setSelectedBackgroundLanguages((prev) => [
                                                ...prev.filter((l) => l !== otherChoice),
                                                optName,
                                              ]);
                                            } else {
                                              setSelectedBackgroundLanguages((prev) => [...prev, optName]);
                                            }
                                          }
                                        }
                                      }}
                                      className={`p-2.5 rounded-lg text-left text-xs font-fantasy transition flex flex-col justify-between border ${
                                        isRacial
                                          ? 'bg-[#ede5d6]/70 text-[#9c8974] border-[#d8ccbb] cursor-not-allowed opacity-80'
                                          : isSelected
                                          ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs cursor-pointer'
                                          : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#f3e7d3] cursor-pointer'
                                      }`}
                                      title={
                                        isRacial
                                          ? `Ya dominado por tu raza (${activeRace?.name || 'Raza'}). No consume selección.`
                                          : `${optName}`
                                      }
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold">{optName}</span>
                                        {isRacial ? (
                                          <span className="text-[9px] text-[#8c672b] bg-[#e4d7c3] px-1 py-0.2 rounded font-mono font-normal">
                                            Raza
                                          </span>
                                        ) : isSelected ? (
                                          <Check className="w-3.5 h-3.5 text-white" />
                                        ) : null}
                                      </div>
                                      <span
                                        className={`text-[9px] mt-0.5 ${
                                          isSelected ? 'text-amber-100' : isRacial ? 'text-[#9c8974]' : 'text-[#7a6448]'
                                        }`}
                                      >
                                        {isRacial ? '(Innato por raza)' : langObj ? `${langObj.type} • ${langObj.script}` : 'Especial'}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : activeBackground.languageSlots && activeBackground.languageSlots.length > 0 ? (
                            <div className="space-y-4 pt-1">
                              {activeBackground.languageSlots.map((slotType, slotIdx) => {
                                const isExoticSlot = slotType === 'exotic';
                                const slotTitle = isExoticSlot
                                  ? `Ranura ${slotIdx + 1}: Idioma Exótico Obligatorio (Elige 1)`
                                  : `Ranura ${slotIdx + 1}: Idioma Estándar / Común (Elige 1)`;
                                const slotSubtitle = isExoticSlot
                                  ? 'Debe pertenecer a lenguas arcanas, planares u oscuras (Abisal, Celestial, Habla Profunda, Dracónico, etc.)'
                                  : 'Lenguas comunes de los pueblos civilizados del multiverso';

                                const slotOptions = OFFICIAL_5E_LANGUAGES.filter((l) =>
                                  isExoticSlot ? l.type === 'Exótico' : l.type === 'Estándar'
                                );

                                return (
                                  <div key={slotIdx} className="p-3 bg-[#faf6ee] rounded-xl border border-[#dcd0bc] space-y-2">
                                    <div className="flex items-center justify-between border-b border-[#e8ddcb] pb-1.5">
                                      <div>
                                        <span className="text-xs font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5">
                                          <span className="w-5 h-5 rounded-full bg-[#8c672b] text-white flex items-center justify-center text-[10px] font-mono">
                                            {slotIdx + 1}
                                          </span>
                                          {slotTitle}
                                        </span>
                                        <span className="text-[10px] text-[#7a6448] block mt-0.5">
                                          {slotSubtitle}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 pt-1">
                                      {slotOptions.map((lang) => {
                                        const isRacial = knownRacialLanguages.some(
                                          (rl) => rl.toLowerCase() === lang.name.toLowerCase() || lang.name.toLowerCase().startsWith(rl.toLowerCase())
                                        );
                                        const isSelected = selectedBackgroundLanguages.includes(lang.name);

                                        return (
                                          <button
                                            key={lang.id}
                                            type="button"
                                            disabled={isRacial}
                                            onClick={() => {
                                              if (isRacial) return;
                                              if (isSelected) {
                                                setSelectedBackgroundLanguages((prev) => prev.filter((l) => l !== lang.name));
                                              } else {
                                                // Deselect any other language from this slot category
                                                const otherSlotLangNames = slotOptions.map((o) => o.name);
                                                setSelectedBackgroundLanguages((prev) => [
                                                  ...prev.filter((l) => !otherSlotLangNames.includes(l)),
                                                  lang.name,
                                                ]);
                                              }
                                            }}
                                            className={`p-2 rounded-lg text-left text-xs font-fantasy transition flex flex-col justify-between border ${
                                              isRacial
                                                ? 'bg-[#ede5d6]/70 text-[#9c8974] border-[#d8ccbb] cursor-not-allowed opacity-80'
                                                : isSelected
                                                ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs cursor-pointer'
                                                : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#f3e7d3] cursor-pointer'
                                            }`}
                                            title={
                                              isRacial
                                                ? `Ya dominado por tu raza (${activeRace?.name || 'Raza'}). No consume selección.`
                                                : `${lang.name} (${lang.nameEn}) - Alfabeto: ${lang.script}`
                                            }
                                          >
                                            <div className="flex items-center justify-between">
                                              <span className="font-bold">{lang.name}</span>
                                              {isRacial ? (
                                                <span className="text-[9px] text-[#8c672b] bg-[#e4d7c3] px-1 py-0.2 rounded font-mono font-normal">
                                                  Raza
                                                </span>
                                              ) : isSelected ? (
                                                <Check className="w-3.5 h-3.5 text-white" />
                                              ) : null}
                                            </div>
                                            <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-amber-100' : isRacial ? 'text-[#9c8974]' : 'text-[#7a6448]'}`}>
                                              {isRacial ? '(Innato por raza)' : `${lang.type} • ${lang.script}`}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            /* FREE CHOICE LANGUAGES (Standard backgrounds with languagesCount) */
                            Math.max(0, (activeBackground.languagesCount || 0) - (activeBackground.fixedLanguages?.length || 0)) > 0 && (
                              <div className="space-y-2 pt-1">
                                <span className="text-[10px] text-[#7a6448] uppercase font-bold tracking-wider block">
                                  Elige {Math.max(0, (activeBackground.languagesCount || 0) - (activeBackground.fixedLanguages?.length || 0))} idioma(s) adicional(es) a tu elección:
                                </span>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                                  {OFFICIAL_5E_LANGUAGES.filter(
                                    (l) => !activeBackground.fixedLanguages?.includes(l.name)
                                  ).map((lang) => {
                                    const isRacial = knownRacialLanguages.some(
                                      (rl) => rl.toLowerCase() === lang.name.toLowerCase() || lang.name.toLowerCase().startsWith(rl.toLowerCase())
                                    );
                                    const isSelected = selectedBackgroundLanguages.includes(lang.name);
                                    const maxAllowed = activeBackground.languagesCount || 1;

                                    return (
                                      <button
                                        key={lang.id}
                                        type="button"
                                        disabled={isRacial}
                                        onClick={() => {
                                          if (isRacial) return;
                                          if (isSelected) {
                                            setSelectedBackgroundLanguages((prev) => prev.filter((l) => l !== lang.name));
                                          } else {
                                            if (selectedBackgroundLanguages.length < maxAllowed) {
                                              setSelectedBackgroundLanguages((prev) => [...prev, lang.name]);
                                            } else {
                                              const nonFixed = selectedBackgroundLanguages.filter(
                                                (l) => !activeBackground.fixedLanguages?.includes(l)
                                              );
                                              if (nonFixed.length > 0) {
                                                const toReplace = nonFixed[0];
                                                setSelectedBackgroundLanguages((prev) => [
                                                  ...prev.filter((l) => l !== toReplace),
                                                  lang.name,
                                                ]);
                                              } else {
                                                setSelectedBackgroundLanguages((prev) => [...prev, lang.name]);
                                              }
                                            }
                                          }
                                        }}
                                        className={`p-2 rounded-lg text-left text-xs font-fantasy transition flex flex-col justify-between border ${
                                          isRacial
                                            ? 'bg-[#ede5d6]/70 text-[#9c8974] border-[#d8ccbb] cursor-not-allowed opacity-80'
                                            : isSelected
                                            ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs cursor-pointer'
                                            : 'bg-[#faf6ee] text-[#4a361c] border-[#d6c4aa] hover:bg-[#ebdcc4] cursor-pointer'
                                        }`}
                                        title={
                                          isRacial
                                            ? `Ya conocido por tu linaje racial (${activeRace?.name || 'Raza'}).`
                                            : `${lang.name} (${lang.nameEn}) - Alfabeto: ${lang.script}`
                                        }
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold">{lang.name}</span>
                                          {isRacial ? (
                                            <span className="text-[9px] text-[#8c672b] bg-[#e4d7c3] px-1 py-0.2 rounded font-mono font-normal">
                                              Raza
                                            </span>
                                          ) : isSelected ? (
                                            <Check className="w-3.5 h-3.5 text-white" />
                                          ) : null}
                                        </div>
                                        <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-amber-100' : isRacial ? 'text-[#9c8974]' : 'text-[#7a6448]'}`}>
                                          {isRacial ? '(Innato por raza)' : `${lang.type} • ${lang.script}`}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )
                          )}

                          {/* Custom language input */}
                          <div className="pt-2 border-t border-[#e2d2bc]/60 space-y-1.5">
                            <span className="text-[10px] text-[#7a6448] font-bold block">
                              ¿Tu ambientación o DM utiliza otro dialecto o idioma exótico? Escríbelo aquí:
                            </span>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Ej: Silvano, Habla Profunda, Infracomún, Druídico..."
                                value={customBackgroundLanguageInput}
                                onChange={(e) => setCustomBackgroundLanguageInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCustomBackgroundLanguage();
                                  }
                                }}
                                className="flex-1 bg-white border border-[#d6c4aa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                              />
                              <button
                                type="button"
                                onClick={handleAddCustomBackgroundLanguage}
                                disabled={!customBackgroundLanguageInput.trim()}
                                className="px-3 py-1.5 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1 shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
                              >
                                <Plus className="w-3.5 h-3.5" /> Añadir
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Background Bonus Feat Banner & Subchoice Selection */}
                      {activeBackground.bonusFeatId && (() => {
                        const bonusFeat = OFFICIAL_5E_FEATS.find((f) => f.id === activeBackground.bonusFeatId);
                        return (
                          <div id="creator-background-bonus-feat" className="p-4 bg-gradient-to-br from-[#fcf6e9] via-[#f7edd8] to-[#f4e6c8] rounded-xl border-2 border-[#b88c32] shadow-md space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d8be8a] pb-2.5">
                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9c6a1e] font-bold block">
                                  ★ Dote Oficial Otorgada por Trasfondo (Reglas Oficiales 5e)
                                </span>
                                <h4 className="font-fantasy font-bold text-sm text-[#4a361c] flex items-center gap-1.5">
                                  <Star className="w-4 h-4 text-[#b88c32] fill-[#b88c32]" />
                                  {bonusFeat?.name || activeBackground.bonusFeatName || 'Dote Especial'}
                                </h4>
                              </div>
                              {bonusFeat && (
                                <button
                                  type="button"
                                  onClick={() => setInspectingFeat(bonusFeat)}
                                  className="px-3 py-1.5 bg-white/80 hover:bg-white text-[#7a5a2b] hover:text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto shrink-0"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#8c672b]" /> Ver Detalles & Reglas
                                </button>
                              )}
                            </div>

                            {bonusFeat && (
                              <p className="text-xs text-[#5c4a35] leading-relaxed">
                                {bonusFeat.description}
                              </p>
                            )}

                            {/* SubChoice Picker (e.g. 6 Elemental Strikes for Strike of the Giants, or 7 Runes for Rune Shaper) */}
                            {bonusFeat?.subChoice && (
                              <div className="pt-2 border-t border-[#d8be8a]/70 space-y-2.5">
                                <div>
                                  <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-[#b88c32]" />
                                    {bonusFeat.subChoice.title}
                                  </h5>
                                  <p className="text-[11px] text-[#7a6448]">
                                    {bonusFeat.subChoice.description}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {bonusFeat.subChoice.options.map((opt) => {
                                    const isChosen = backgroundFeatSubChoice === opt.id;
                                    return (
                                      <div
                                        key={opt.id}
                                        onClick={() => setBackgroundFeatSubChoice(opt.id)}
                                        className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                                          isChosen
                                            ? 'bg-gradient-to-r from-[#8c672b] to-[#a3792c] text-white border-[#6a4f21] shadow-md ring-2 ring-[#e8c37d]'
                                            : 'bg-white/70 hover:bg-white text-[#4a361c] border-[#d6c4aa]'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between gap-2">
                                          <span className="font-fantasy font-bold text-xs flex items-center gap-1.5">
                                            <span className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${isChosen ? 'border-white bg-white' : 'border-[#8c672b]'}`}>
                                              {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-[#8c672b]" />}
                                            </span>
                                            {opt.name}
                                          </span>
                                          {isChosen && (
                                            <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                                              Seleccionado
                                            </span>
                                          )}
                                        </div>
                                        {opt.desc && (
                                          <p className={`text-[11px] mt-1.5 leading-relaxed ${isChosen ? 'text-amber-100' : 'text-[#6b553e]'}`}>
                                            {opt.desc}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* ROLEPLAY GENERATOR: VIRTUES, IDEALS, BONDS, FLAWS & BACKSTORY */}
                      <div id="creator-identity-roleplay-box" className="p-5 bg-[#f5ede0] rounded-xl border-2 border-[#8c672b] space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d6c4aa] pb-3">
                          <div>
                            <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#8c672b]" />
                              Personalidad, Convicciones & Rasgos de Rol
                            </h4>
                            <p className="text-[11px] text-[#7a6448]">
                              Tablas de rol canónicas basadas en tu trasfondo ({activeBackground.name}). Tira dados para inspirarte o selecciona directamente en las listas.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={handleRollAllRoleplay}
                            className="px-4 py-2 bg-gradient-to-r from-[#8c672b] to-[#b88c32] hover:from-[#9c7533] hover:to-[#c99a3b] text-white rounded-lg text-xs font-fantasy font-bold shadow-md transition flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
                            title="Tira dados para generar automáticamente Virtudes, Ideales, Vínculos y Defectos"
                          >
                            <Dices className="w-4 h-4" />
                            🎲🎲 Tirar Todo con Dados
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* CARD 1: PERSONALITY TRAITS / VIRTUES */}
                          <div className="p-3.5 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <span>🎭</span> Rasgos de Personalidad & Virtudes
                                </label>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] bg-[#ebdcc4] text-[#7a5a2b] px-2 py-0.5 rounded font-mono font-bold">
                                    {currentRoleplayOptions.personalityTraits.filter((opt) => personalityTraits.includes(opt.text)).length} / 2
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleRollPersonalityTrait}
                                    className="px-2 py-1 bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#7a5a2b] hover:text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                    title={`Tirar dado d${currentRoleplayOptions.personalityTraits.length || 8} en la tabla de rasgos (genera 2 rasgos)`}
                                  >
                                    <Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.personalityTraits.length || 8}
                                  </button>
                                </div>
                              </div>
                              <p className="text-[10px] text-[#7a6448] mt-0.5">
                                Elige 1 o 2 rasgos oficiales de la tabla o escribe abajo tus propias costumbres:
                              </p>

                              {/* Dropdown Selector */}
                              <div className="mt-2">
                                <select
                                  value=""
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      handleTogglePersonalityTrait(e.target.value);
                                    }
                                  }}
                                  className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                                >
                                  <option value="">-- Selecciona para alternar un rasgo ({currentRoleplayOptions.personalityTraits.length} disponibles) --</option>
                                  {currentRoleplayOptions.personalityTraits.map((opt, idx) => {
                                    const isChosen = personalityTraits.includes(opt.text);
                                    return (
                                      <option key={opt.id} value={opt.text}>
                                        {isChosen ? '✓ ' : ''}{idx + 1}. {opt.text}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>

                            <div className="mt-2">
                              <textarea
                                rows={3}
                                value={personalityTraits}
                                onChange={(e) => setPersonalityTraits(e.target.value)}
                                placeholder="Escribe o edita aquí los rasgos de personalidad..."
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner"
                              />
                            </div>
                          </div>

                          {/* CARD 2: IDEALS */}
                          <div className="p-3.5 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <span>⚖️</span> Ideales & Convicciones Morales
                                </label>
                                <button
                                  type="button"
                                  onClick={handleRollIdeal}
                                  className="px-2.5 py-1 bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#7a5a2b] hover:text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                  title={`Tirar dado d${currentRoleplayOptions.ideals.length || 6} en la tabla de ideales`}
                                >
                                  <Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.ideals.length || 6}
                                </button>
                              </div>
                              <p className="text-[10px] text-[#7a6448] mt-0.5">
                                ¿Qué principio o deber moral guía tus decisiones más difíciles?
                              </p>

                              {/* Dropdown Selector */}
                              <div className="mt-2">
                                <select
                                  value={currentRoleplayOptions.ideals.find((opt) => ideals.includes(opt.text))?.text || ''}
                                  onChange={(e) => {
                                    const chosen = currentRoleplayOptions.ideals.find((opt) => opt.text === e.target.value);
                                    if (chosen) {
                                      handleSelectIdeal(chosen.text, chosen.tag);
                                    } else {
                                      setIdeals('');
                                    }
                                  }}
                                  className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                                >
                                  <option value="">-- Elige un ideal de la tabla ({currentRoleplayOptions.ideals.length} opciones) --</option>
                                  {currentRoleplayOptions.ideals.map((opt, idx) => (
                                    <option key={opt.id} value={opt.text}>
                                      {idx + 1}. {opt.tag ? `[${opt.tag}] ` : ''}{opt.text}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="mt-2">
                              <textarea
                                rows={3}
                                value={ideals}
                                onChange={(e) => setIdeals(e.target.value)}
                                placeholder="Escribe o edita aquí el ideal..."
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner"
                              />
                            </div>
                          </div>

                          {/* CARD 3: BONDS */}
                          <div className="p-3.5 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <span>🔗</span> Vínculos & Lazos de Vida
                                </label>
                                <button
                                  type="button"
                                  onClick={handleRollBond}
                                  className="px-2.5 py-1 bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#7a5a2b] hover:text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                  title={`Tirar dado d${currentRoleplayOptions.bonds.length || 6} en la tabla de vínculos`}
                                >
                                  <Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.bonds.length || 6}
                                </button>
                              </div>
                              <p className="text-[10px] text-[#7a6448] mt-0.5">
                                ¿Por quién o qué darías la vida? ¿A quién le debes tu lealtad?
                              </p>

                              {/* Dropdown Selector */}
                              <div className="mt-2">
                                <select
                                  value={currentRoleplayOptions.bonds.find((opt) => bonds.includes(opt.text))?.text || ''}
                                  onChange={(e) => {
                                    const chosen = currentRoleplayOptions.bonds.find((opt) => opt.text === e.target.value);
                                    if (chosen) {
                                      handleSelectBond(chosen.text);
                                    } else {
                                      setBonds('');
                                    }
                                  }}
                                  className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                                >
                                  <option value="">-- Elige un vínculo de la tabla ({currentRoleplayOptions.bonds.length} opciones) --</option>
                                  {currentRoleplayOptions.bonds.map((opt, idx) => (
                                    <option key={opt.id} value={opt.text}>
                                      {idx + 1}. {opt.text}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="mt-2">
                              <textarea
                                rows={3}
                                value={bonds}
                                onChange={(e) => setBonds(e.target.value)}
                                placeholder="Escribe o edita aquí el vínculo afectivo..."
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner"
                              />
                            </div>
                          </div>

                          {/* CARD 4: FLAWS & WEAKNESSES */}
                          <div className="p-3.5 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                                  <span>⚠️</span> Defectos, Debilidades & Tentaciones
                                </label>
                                <button
                                  type="button"
                                  onClick={handleRollFlaw}
                                  className="px-2.5 py-1 bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#7a5a2b] hover:text-[#4a361c] border border-[#cbb99f] rounded text-[11px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                  title={`Tirar dado d${currentRoleplayOptions.flaws.length || 6} en la tabla de defectos`}
                                >
                                  <Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.flaws.length || 6}
                                </button>
                              </div>
                              <p className="text-[10px] text-[#7a6448] mt-0.5">
                                ¿Qué vicio, miedo o tentación te hace cometer errores imprudentes?
                              </p>

                              {/* Dropdown Selector */}
                              <div className="mt-2">
                                <select
                                  value={currentRoleplayOptions.flaws.find((opt) => flaws.includes(opt.text))?.text || ''}
                                  onChange={(e) => {
                                    const chosen = currentRoleplayOptions.flaws.find((opt) => opt.text === e.target.value);
                                    if (chosen) {
                                      handleSelectFlaw(chosen.text);
                                    } else {
                                      setFlaws('');
                                    }
                                  }}
                                  className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                                >
                                  <option value="">-- Elige un defecto de la tabla ({currentRoleplayOptions.flaws.length} opciones) --</option>
                                  {currentRoleplayOptions.flaws.map((opt, idx) => (
                                    <option key={opt.id} value={opt.text}>
                                      {idx + 1}. {opt.text}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="mt-2">
                              <textarea
                                rows={3}
                                value={flaws}
                                onChange={(e) => setFlaws(e.target.value)}
                                placeholder="Escribe o edita aquí el defecto o debilidad..."
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner"
                              />
                            </div>
                          </div>
                        </div>

                        {/* CARD 5: BACKSTORY & MOTIVATIONS */}
                        <div id="creator-identity-backstory" className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                          <label className="block text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                            <span>📜</span> Historia, Pasado & Motivaciones del Héroe (Backstory)
                          </label>
                          <p className="text-[10px] text-[#7a6448]">
                            ¿De dónde vienes? ¿Quién fue tu familia o mentor? ¿Por qué decidiste salir de tu hogar y recorrer los Reinos Olvidados?
                          </p>
                          <textarea
                            rows={4}
                            value={backstoryBrief}
                            onChange={(e) => setBackstoryBrief(e.target.value)}
                            placeholder="Escribe libremente el origen de tu personaje o notas clave para tu Dungeon Master..."
                            className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona un trasfondo arriba para ver su rasgo especial y equipo sugerido.
                    </div>
                  )}

                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 8: INVENTORY & STARTING EQUIPMENT */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'equipment' && (
                <div id="step-tab-equipment-content" className="space-y-6">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Package className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 8: Inventario, Equipo Inicial & Riqueza
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Basado en las opciones oficiales del Manual del Jugador y Reglas 5e para {activeClass?.name || 'tu clase'}, puedes elegir tus armas primarias, armadura y paquetes de aventurero. Además, se incluye el equipo de tu trasfondo y tus monedas iniciales.
                      </p>
                    </div>
                  </div>

                  {/* Class Equipment Choices (A vs B) */}
                  <div id="creator-equipment-choices">
                    {startingEquipmentConfig ? (
                      <div className="space-y-4">
                      {startingEquipmentConfig.choiceGroups.map((group) => {
                        const selectedOptionId = selectedEquipmentChoices[group.id] || group.defaultOptionId;
                        return (
                          <div key={group.id} className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                            <div className="flex items-center justify-between">
                              <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                                <Sword className="w-4 h-4 text-[#8c672b]" /> {group.title}
                              </h5>
                              <span className="text-[11px] text-[#8c672b] font-mono font-bold">
                                Elige una opción
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {group.options.map((option) => {
                                const isSelected = selectedOptionId === option.id;
                                return (
                                  <div
                                    key={option.id}
                                    onClick={() => setSelectedEquipmentChoices((prev) => ({ ...prev, [group.id]: option.id }))}
                                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                                      isSelected
                                        ? 'bg-[#eddcc4] border-2 border-[#8c672b] shadow-md text-[#2c241b]'
                                        : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="font-fantasy font-bold text-xs text-[#4a361c]">
                                          {option.name}
                                        </span>
                                        <div
                                          className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                                            isSelected ? 'bg-[#8c672b] text-white border-[#8c672b]' : 'border-[#b0a086] bg-white'
                                          }`}
                                        >
                                          {isSelected && <Check className="w-2.5 h-2.5" />}
                                        </div>
                                      </div>
                                      <p className="text-[11px] text-[#5c4a35] mt-1.5 leading-relaxed">
                                        {option.description}
                                      </p>
                                    </div>

                                    <div className="mt-2.5 pt-2 border-t border-[#d6c4aa]/50 flex flex-wrap items-center gap-1.5">
                                      {option.items.map((it, idx) => {
                                        const displayItemName = (customWeaponChoices[group.id] && (it.toLowerCase().includes('arma') || it.toLowerCase().includes('elección') || it.toLowerCase().includes('eleccion')))
                                          ? customWeaponChoices[group.id].name
                                          : it;
                                        return (
                                          <span
                                            key={idx}
                                            className="text-[10px] bg-[#ede1ce] text-[#5e4b37] px-2 py-0.5 rounded font-mono font-bold"
                                          >
                                            {displayItemName}
                                          </span>
                                        );
                                      })}
                                      {option.armorAcBase && (
                                        <span className="text-[10px] bg-[#dbe8d3] text-[#2e5924] px-2 py-0.5 rounded font-mono font-bold">
                                          🛡️ CA Base: {option.armorAcBase}
                                        </span>
                                      )}
                                      {option.shieldBonus && (
                                        <span className="text-[10px] bg-[#dbe8d3] text-[#2e5924] px-2 py-0.5 rounded font-mono font-bold">
                                          🛡️ Escudo: +{option.shieldBonus} CA
                                        </span>
                                      )}
                                    </div>

                                    {(option.isCustomizableWeapon || option.weaponCategory) && (
                                      <div className="mt-2.5 pt-2 border-t border-[#d6c4aa]/60">
                                        {customWeaponChoices[group.id] ? (
                                          <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#b88c32] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                            <div className="flex items-center gap-1.5 text-xs text-[#4a361c]">
                                              <Sword className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />
                                              <span>Arma elegida: <strong className="text-[#8c672b]">{customWeaponChoices[group.id].name}</strong></span>
                                              <span className="text-[10px] bg-[#dbe8d3] text-[#2e5924] px-1.5 py-0.2 rounded font-mono font-bold">
                                                {customWeaponChoices[group.id].damageDice} {customWeaponChoices[group.id].damageType}
                                              </span>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEquipmentChoices((prev) => ({ ...prev, [group.id]: option.id }));
                                                setActiveWeaponPickerGroup({
                                                  groupId: group.id,
                                                  category: option.weaponCategory || 'martial',
                                                  title: `Elegir Arma para: ${group.title}`,
                                                });
                                                setIsWeaponPickerOpen(true);
                                              }}
                                              className="px-2 py-1 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white rounded text-[11px] font-fantasy font-bold transition flex items-center justify-center gap-1 shadow-xs cursor-pointer shrink-0"
                                            >
                                              <Sword className="w-3 h-3" /> Cambiar Arma...
                                            </button>
                                          </div>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedEquipmentChoices((prev) => ({ ...prev, [group.id]: option.id }));
                                              setActiveWeaponPickerGroup({
                                                groupId: group.id,
                                                category: option.weaponCategory || 'martial',
                                                title: `Elegir Arma para: ${group.title}`,
                                              });
                                              setIsWeaponPickerOpen(true);
                                            }}
                                            className="w-full py-1.5 px-2.5 bg-[#e8dac1] hover:bg-[#decab0] text-[#4a361c] border border-[#b88c32] rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                                          >
                                            <Sword className="w-3.5 h-3.5 text-[#8c672b]" />
                                            ⚔️ Elegir Arma de Menú Compendio Oficial...
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {/* Fixed Class Equipment & Starting Wealth */}
                      <div id="creator-equipment-wealth" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <Coins className="w-4 h-4 text-[#8c672b]" /> Riqueza y Equipo Fijo de {startingEquipmentConfig.className}
                          </h5>
                          <span className="bg-[#fcecc2] border border-[#d8aa35] text-[#7a5813] font-fantasy font-bold text-xs px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                            💰 Oro Inicial: {startingGoldTotal} po
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {startingEquipmentConfig.fixedEquipment.map((item, idx) => (
                            <span key={idx} className="bg-white border border-[#d6c4aa] text-[#4a361c] px-2.5 py-1 rounded-lg">
                              📦 {item}
                            </span>
                          ))}
                          <span className="text-[11px] text-[#7a6448] italic ml-1">
                            (Monedero oficial según {activeBackground ? `Trasfondo: ${activeBackground.name}` : 'reglas estándar'})
                          </span>
                        </div>
                      </div>

                      {/* Background Granted Equipment & Selected Trinkets */}
                      {activeBackground && (
                        <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-2.5 shadow-xs">
                          <div className="flex items-center justify-between">
                            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                              <Backpack className="w-4 h-4 text-[#8c672b]" /> Equipo Otorgado por el Trasfondo ({activeBackground.name})
                            </h5>
                            <span className="text-xs font-fantasy font-bold text-[#8c672b] flex items-center gap-1 bg-[#ebdcc4] px-2.5 py-0.5 rounded-full border border-[#d6c4aa]">
                              <Coins className="w-3.5 h-3.5 text-[#8c672b]" /> {formatBackgroundWealth(activeBackground)}
                            </span>
                          </div>
                          <p className="text-xs text-[#5c4a35] leading-relaxed">
                            {activeBackground.suggestedEquipment}
                          </p>
                          {activeBackground.equipmentChoices && activeBackground.equipmentChoices.length > 0 && (
                            <div className="pt-2 border-t border-[#e2d2bc] space-y-1.5">
                              <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase block">
                                Evidencias, Baratijas y Objetos Especiales Asignados:
                              </span>
                              {activeBackground.equipmentChoices.map((ch) => {
                                const val = selectedBackgroundEquipmentChoices[ch.id];
                                return val ? (
                                  <div key={ch.id} className="text-xs text-[#4a361c] bg-white p-2.5 rounded-lg border border-[#e2d2bc] flex items-start gap-2 shadow-xs">
                                    <Sparkles className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                                    <div>
                                      <strong className="text-[#8c672b]">{ch.label}:</strong> {val}
                                    </div>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Live Equipment & Armor Class Tactical Management */}
                      <div id="creator-equipment-defense" className="p-4 bg-[#fcf9f2] rounded-xl border-2 border-[#8c672b] shadow-sm space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e2d2bc] pb-2.5">
                          <div>
                            <h5 className="font-fantasy font-bold text-xs sm:text-sm text-[#4a361c] uppercase flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#8c672b]" /> Armas, Armaduras y Equipo Activo (Equipar / Desequipar en Vivo)
                            </h5>
                            <p className="text-[11px] text-[#7a6448] mt-0.5">
                              Haz clic en cada objeto para equiparlo o desequiparlo. La CA y los ataques de la ficha se actualizan automáticamente en tiempo real.
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveWeaponPickerGroup({
                                  groupId: `custom-extra-weapon-${Date.now()}`,
                                  category: 'all',
                                  title: 'Añadir Arma al Inventario',
                                });
                                setIsWeaponPickerOpen(true);
                              }}
                              className="px-2.5 py-1.5 bg-[#8c672b] hover:bg-[#725322] text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <span>⚔️</span> Añadir Arma...
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsArmorPickerOpen(true)}
                              className="px-2.5 py-1.5 bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <span>🛡️</span> Añadir Armadura...
                            </button>
                            <div className="px-3 py-1 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] flex items-center gap-1.5 shadow-2xs">
                              <span className="text-[10px] text-[#7a6448] uppercase font-bold">Defensa Táctica:</span>
                              <span className="font-fantasy font-bold text-sm sm:text-base text-[#8c672b]">{calculatedAc} CA</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {chosenEquipmentList.map((item, idx) => {
                            const equipable = isItemEquipable(item);
                            const isEquipped = isItemEquipped(item);
                            const weaponDef = findWeaponByName(item);
                            const armorDef = findArmorByName(item);
                            const isShield = item.toLowerCase().includes('escudo') && !item.toLowerCase().includes('hechizo');
                            const isExtraCustom = extraCustomEquipment.includes(item);

                            return (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl border transition flex items-center justify-between gap-2 ${
                                  isEquipped
                                    ? 'bg-[#f4ebe1] border-[#8c672b] shadow-xs'
                                    : 'bg-[#faf7f0] border-[#e2d2bc] opacity-75'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <EquipmentBadge name={item} size="md" />
                                  <div className="min-w-0">
                                    <span className={`text-xs font-bold block truncate ${isEquipped ? 'text-[#382b20]' : 'text-[#7a6448]'}`}>
                                      {item}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                      {weaponDef && (
                                        <span className="text-[9px] bg-[#ede1ce] text-[#5e4b37] px-1.5 py-0.2 rounded font-mono font-bold">
                                          {weaponDef.damageDice} {weaponDef.damageType}
                                        </span>
                                      )}
                                      {armorDef && (
                                        <span className="text-[9px] bg-[#dbe8d3] text-[#2e5924] px-1.5 py-0.2 rounded font-mono font-bold">
                                          {armorDef.category === 'shield' ? '+2 CA' : `CA Base: ${armorDef.baseAc}`}
                                        </span>
                                      )}
                                      {isShield && !armorDef && (
                                        <span className="text-[9px] bg-[#dbe8d3] text-[#2e5924] px-1.5 py-0.2 rounded font-mono font-bold">
                                          +2 CA
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {equipable ? (
                                    <button
                                      type="button"
                                      onClick={() => toggleEquipItem(item)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                        isEquipped
                                          ? 'bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] text-white shadow-xs'
                                          : 'bg-[#e2d2bc] hover:bg-[#d6c4aa] text-[#4a361c]'
                                      }`}
                                    >
                                      {isEquipped ? (
                                        <>
                                          <Check className="w-3.5 h-3.5" /> Equipado
                                        </>
                                      ) : (
                                        <>
                                          <Shield className="w-3.5 h-3.5 text-[#8c672b]" /> Equipar
                                        </>
                                      )}
                                    </button>
                                  ) : (
                                    <span className="text-[10px] bg-[#ede1ce] text-[#7a6448] px-2 py-1 rounded font-mono border border-[#d6c4aa]/60">
                                      En inventario
                                    </span>
                                  )}
                                  {isExtraCustom && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setExtraCustomEquipment((prev) => prev.filter((it) => it !== item));
                                        setEquippedItems((prev) => (prev ? prev.filter((it) => it !== item) : []));
                                      }}
                                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition cursor-pointer"
                                      title="Eliminar del inventario"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                      <div className="p-6 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                        Selecciona una clase en el paso anterior para cargar su equipo inicial y opciones tácticas de armas y armaduras.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 7: SPELLS & CANTRIPS (FOR CASTERS & NON-CASTERS INNATE) */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'spells' && (
                <div id="step-tab-spells-content" className="space-y-5">
                  {/* Step Explanation Banner */}
                  <div className="p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex items-start gap-3 shadow-xs">
                    <Sparkles className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        {isCaster
                          ? `Paso 7: Conjuración & Grimorio (${activeClass?.name || 'Lanzador'})`
                          : `Paso 7: Conjuración & Magia Innata / Racial (${activeClass?.name || 'No lanzador'})`}
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        {isCaster
                          ? `${spellLimits.explanation} Selecciona los trucos y conjuros conocidos que componen tu Grimorio o repertorio arcano. Puedes organizarlos por nivel, escuela de magia o alfabéticamente.`
                          : `Tu clase (${activeClass?.name || 'guerrera'}) no posee ranuras de conjuro de clase, pero tu personaje puede conocer trucos o conjuros concedidos por tu Linaje Racial (como Tiefling, Alto Elfo, Drow, Gnomo de los Bosques), dotes (Iniciado en la Magia, Tocado por las Sombras) o trasfondo. Selecciona aquí los conjuros que posea tu personaje para que figuren en su ficha con su CD de salvación y modificador de ataque mágico, o continúa con "Siguiente" si no tiene magia.`}
                      </p>
                    </div>
                  </div>

                  {/* Limit Capacity Banner (for Casters) */}
                  {isCaster && (
                    <div id="creator-spells-limits-banner" className="p-3 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono shadow-xs">
                      <span className="text-[#5c4a35]">
                        Capacidad 5e: <strong>{spellLimits.explanation}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded border font-bold ${
                          selectedCantripsCount > spellLimits.maxCantrips
                            ? 'bg-amber-100 text-amber-900 border-amber-400'
                            : 'bg-white text-[#4a361c] border-[#d6c4aa]'
                        }`}>
                          Trucos: {selectedCantripsCount} / {spellLimits.maxCantrips}
                        </span>
                        <span className={`px-2.5 py-1 rounded border font-bold ${
                          selectedLeveledCount > spellLimits.maxPreparedOrKnown
                            ? 'bg-amber-100 text-amber-900 border-amber-400'
                            : 'bg-white text-[#4a361c] border-[#d6c4aa]'
                        }`}>
                          Grimorio / Repertorio: {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* RAMA 1: PERSONAJE NO LANZADOR (!isCaster) */}
                  {/* (Solo Magia Innata Racial / Dotes / Trasfondo o Héroe Marcial Puro) */}
                  {/* ========================================================================= */}
                  {!isCaster ? (
                    <div className="space-y-4">
                      {/* Non-Caster Status & Ability Summary */}
                      <div id="creator-spells-noncaster-summary" className="p-3 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono shadow-xs">
                        <span className="text-[#5c4a35]">
                          Magia Innata / Racial: <strong>{selectedSpells.length > 0 ? `${selectedSpells.length} conjuro${selectedSpells.length > 1 ? 's' : ''} registrado${selectedSpells.length > 1 ? 's' : ''}` : 'Sin conjuros de clase'}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded border bg-white text-[#4a361c] border-[#d6c4aa] font-bold">
                            Trucos: {selectedCantripsCount}
                          </span>
                          <span className="px-2.5 py-1 rounded border bg-white text-[#4a361c] border-[#d6c4aa] font-bold">
                            Nivel 1+: {selectedLeveledCount}
                          </span>
                        </div>
                      </div>

                      {/* 1. SECCIÓN DE MAGIA RACIAL INNATA CONCEDIDA */}
                      {racialSpellcastingInfo.hasRacialMagic ? (
                        <div id="creator-spells-innate-panel" className="p-4 rounded-xl bg-gradient-to-br from-purple-50/80 via-[#fcf9f2] to-[#f5ede0] border-2 border-purple-300 text-[#2c241b] shadow-sm space-y-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-200 pb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shrink-0">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="font-fantasy font-bold text-sm text-purple-950 uppercase tracking-wide">
                                  Magia Innata de Linaje Racial ({activeSubrace?.name || activeRace?.name})
                                </h5>
                                <p className="text-[11px] text-[#6b5840]">
                                  Concedida por tu linaje de D&D 5e. No consume ranuras de conjuro de clase.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-auto">
                              <span className="px-2.5 py-1 bg-purple-100 border border-purple-300 text-purple-900 rounded-lg text-xs font-mono font-bold">
                                CD {8 + profBonus + getMod(finalStats[effectiveRacialSpellAbility])} • Ataque +{profBonus + getMod(finalStats[effectiveRacialSpellAbility])} ({effectiveRacialSpellAbility.toUpperCase()})
                              </span>
                            </div>
                          </div>

                          {/* Selector de característica racial (si la raza ofrece varias: INT / WIS / CHA) */}
                          {racialSpellcastingInfo.config?.abilityChoices && racialSpellcastingInfo.config.abilityChoices.length > 1 && (
                            <div className="p-3 bg-white/80 rounded-lg border border-purple-200 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5">
                                  <span>🧠</span> Característica de Conjuración Racial:
                                </span>
                                <span className="text-[10px] text-purple-700 font-mono font-bold">
                                  Actual: {effectiveRacialSpellAbility.toUpperCase()} (Mod {getMod(finalStats[effectiveRacialSpellAbility]) >= 0 ? `+${getMod(finalStats[effectiveRacialSpellAbility])}` : getMod(finalStats[effectiveRacialSpellAbility])})
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                {(['int', 'wis', 'cha'] as const)
                                  .filter((ab) => racialSpellcastingInfo.config?.abilityChoices?.includes(ab))
                                  .map((ab) => {
                                    const isChosen = effectiveRacialSpellAbility === ab;
                                    const modVal = getMod(finalStats[ab]);
                                    const cdVal = 8 + profBonus + modVal;
                                    const label = ab === 'int' ? 'Inteligencia' : ab === 'wis' ? 'Sabiduría' : 'Carisma';
                                    return (
                                      <button
                                        key={ab}
                                        type="button"
                                        onClick={() => setRacialSpellcastingAbility(ab)}
                                        className={`p-2 rounded-lg border text-xs font-fantasy font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                                          isChosen
                                            ? 'bg-purple-900 text-purple-100 border-purple-950 shadow-xs ring-1 ring-purple-400'
                                            : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-purple-50'
                                        }`}
                                      >
                                        <span>{label}</span>
                                        <span className="text-[10px] font-mono opacity-80">CD {cdVal} (Mod {modVal >= 0 ? `+${modVal}` : modVal})</span>
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          )}

                          {/* Selector de truco racial si la raza lo pide (ej. Alto Elfo / Kobold) */}
                          {racialSpellcastingInfo.config?.hasCantripChoice && (
                            <div className="p-3 bg-white/80 rounded-lg border border-purple-200 space-y-2">
                              <label className="text-xs font-fantasy font-bold text-[#4a361c] uppercase flex items-center justify-between">
                                <span>📖 Truco Racial a Elegir (Lista de {racialSpellcastingInfo.config.cantripChoiceClass || 'Mago'}):</span>
                                <span className="text-[10px] text-purple-700 font-mono font-bold">1 Truco adicional</span>
                              </label>
                              <select
                                value={selectedRacialCantrip}
                                onChange={(e) => setSelectedRacialCantrip(e.target.value)}
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg p-2 text-xs text-[#2c241b] focus:outline-none focus:border-purple-600 cursor-pointer"
                              >
                                <option value="">-- Selecciona un Truco de Linaje --</option>
                                {wizardCantripsList.map((spl) => (
                                  <option key={spl.id} value={spl.name}>
                                    {spl.name} ({spl.school})
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Tarjetas de Conjuros Concedidos Activos */}
                          <div className="space-y-2">
                            <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase tracking-wide block">
                              Hechizos Otorgados Activos a tu Nivel ({characterLevel}):
                            </span>
                            {grantedRacialSpells.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {grantedRacialSpells.map((spell) => (
                                  <SpellCardComponent
                                    key={spell.id}
                                    spell={spell}
                                    isSelected={true}
                                    onToggle={() => {}}
                                    onInspect={(spl) => setInspectingSpell(spl)}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="p-3 bg-white/70 rounded-lg border border-dashed border-purple-300 text-xs text-[#7a6448] text-center">
                                {racialSpellcastingInfo.config?.hasCantripChoice && !selectedRacialCantrip
                                  ? 'Por favor selecciona tu truco racial en el desplegable superior.'
                                  : 'Tus hechizos innatos se activarán al alcanzar los niveles correspondientes.'}
                              </div>
                            )}
                          </div>

                          {/* Hechizos innatos a desbloquear en niveles superiores */}
                          {racialSpellcastingInfo.innateSpells.some((entry) => characterLevel < entry.requiredLevel) && (
                            <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200 text-xs space-y-1.5">
                              <span className="font-fantasy font-bold text-purple-950 flex items-center gap-1.5 text-[11px] uppercase">
                                <span>🔮</span> Progresión de Linaje (Hechizos que desbloquearás al subir de nivel):
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                {racialSpellcastingInfo.innateSpells
                                  .filter((entry) => characterLevel < entry.requiredLevel)
                                  .map((entry, idx) => (
                                    <div key={idx} className="p-2 bg-white rounded border border-purple-200 flex items-center justify-between">
                                      <span className="font-semibold text-purple-900">{entry.spellName}</span>
                                      <span className="font-mono text-[10px] text-[#7a6448] bg-purple-100 px-1.5 py-0.5 rounded">
                                        Nivel {entry.requiredLevel}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null}

                      {/* 2. CONJUROS ADICIONALES POR TRASFONDO O DOTES */}
                      {selectedSpells.filter((s) => !s.isRacial).length > 0 && (
                        <div className="p-4 rounded-xl bg-[#f5ede0] border border-[#d6c4aa] space-y-3">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase tracking-wide flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#8c672b]" />
                            Conjuros Adicionales Registrados (Dotes / Trasfondo / Excepción)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedSpells
                              .filter((s) => !s.isRacial)
                              .map((spell) => (
                                <SpellCardComponent
                                  key={spell.id}
                                  spell={spell}
                                  isSelected={true}
                                  onToggle={() => toggleSpellChoice(spell)}
                                  onInspect={(spl) => setInspectingSpell(spl)}
                                />
                              ))}
                          </div>
                        </div>
                      )}

                      {/* 3. HEROE MARCIAL PURO (SI NO TIENE MAGIA RACIAL NI CONJUROS) */}
                      {!racialSpellcastingInfo.hasRacialMagic && grantedRacialSpells.length === 0 && selectedSpells.length === 0 && (
                        <div id="creator-spells-pure-martial" className="p-8 bg-gradient-to-br from-[#f8f1e5] to-[#ebdcc4] rounded-2xl border-2 border-[#8c672b] text-center space-y-4 shadow-sm">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4a361c] text-[#f5ebd7] flex items-center justify-center shadow-md">
                            <Sword className="w-8 h-8 text-[#d4ab59]" />
                          </div>
                          <div className="max-w-xl mx-auto space-y-2">
                            <h3 className="font-fantasy font-bold text-xl text-[#4a361c] tracking-wide uppercase">
                              Vía Marcial: El Acero y la Táctica son tu Poder
                            </h3>
                            <p className="text-xs text-[#5c4a35] leading-relaxed">
                              Tu personaje (<strong className="text-[#3b2a14]">{activeRace?.name || 'Aventurero'} {activeClass?.name || 'Guerrero'}</strong>) no canaliza la urdimbre mágica ni posee ranuras de conjuros. Tu verdadera fuerza reside en tus armas, tu armadura, tus reflejos atléticos y tu disciplina táctica.
                            </p>
                            <p className="text-[11px] text-[#7a6448]">
                              No necesitas seleccionar conjuros de clase para avanzar. Tu ficha está lista para equiparse.
                            </p>
                          </div>
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => setCurrentStep('equipment')}
                              className="px-6 py-2.5 rounded-xl border-2 border-[#8c672b] bg-[#8c672b] hover:bg-[#6e5020] text-white font-fantasy font-bold text-xs shadow-md transition cursor-pointer inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>Continuar a Inventario y Equipo (Paso 8)</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 4. ACORDEÓN PARA EXCEPCIÓN DEL DM (HOMEBREW) */}
                      <details className="group p-3 bg-[#ede1ce]/60 rounded-xl border border-[#d6c4aa] text-xs text-[#5c4a35]">
                        <summary className="font-fantasy font-bold text-xs text-[#4a361c] cursor-pointer select-none hover:text-[#8c672b] flex items-center justify-between">
                          <span>¿Tu Dungeon Master te otorgó un conjuro especial o regla casera (Homebrew)? (Opcional)</span>
                          <span className="text-[10px] text-[#8c672b] group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="mt-3 pt-3 border-t border-[#d6c4aa] space-y-3">
                          <p className="text-[11px] text-[#7a6448]">
                            Si tu director de juego te concedió un conjuro por trasfondo casero, un pacto o una bendición divina, puedes buscarlo en el compendio oficial y agregarlo a tu ficha:
                          </p>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
                              <input
                                type="text"
                                value={spellSearchQuery}
                                onChange={(e) => {
                                  setSpellSearchQuery(e.target.value);
                                  if (spellScopeMode !== 'all_compendium') setSpellScopeMode('all_compendium');
                                }}
                                placeholder="Buscar en el compendio general de 515 conjuros..."
                                className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSpellScopeMode('all_compendium');
                                setIsSpellPickerMaximized(true);
                              }}
                              className="px-3 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#dfcdb1] text-xs font-fantasy font-bold text-[#4a361c] flex items-center gap-1.5 shrink-0 cursor-pointer"
                            >
                              <Maximize2 className="w-3.5 h-3.5 text-[#8c672b]" />
                              <span>Compendio ({OFFICIAL_SPELLS_COMPENDIUM.length})</span>
                            </button>
                          </div>
                          {spellSearchQuery.trim() && displayedSpellsData.totalCount > 0 && (
                            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[...displayedSpellsData.cantrips, ...displayedSpellsData.leveled].slice(0, 10).map((spell) => {
                                  const matchedSelected = selectedSpells.find((s) => s.name.toLowerCase() === spell.name.toLowerCase());
                                  const isSelected = !!matchedSelected;
                                  const effectiveSpell = matchedSelected || spell;
                                  return (
                                    <SpellCardComponent
                                      key={spell.id}
                                      spell={effectiveSpell}
                                      isSelected={isSelected}
                                      onToggle={() => toggleSpellChoice(effectiveSpell)}
                                      onInspect={(spl) => setInspectingSpell(spl)}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </details>
                    </div>
                  ) : (
                    /* ========================================================================= */
                    /* RAMA 2: PERSONAJE LANZADOR DE CONJUROS (isCaster === true) */
                    /* ========================================================================= */
                    <div className="space-y-4">
                      {/* Racial Innate Magic Banner (for Casters with Innate Magic, e.g. Tiefling Wizard) */}
                      {grantedRacialSpells.length > 0 && (
                        <div className="p-3.5 bg-gradient-to-r from-purple-50 via-[#fbf7ee] to-[#f5ede0] rounded-xl border border-purple-300 text-purple-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs text-xs">
                          <div className="flex items-center gap-2.5">
                            <Sparkles className="w-4 h-4 text-purple-700 shrink-0" />
                            <div>
                              <span className="font-fantasy font-bold text-purple-950 block">
                                Magia Innata Racial Concedida ({activeSubrace?.name || activeRace?.name})
                              </span>
                              <span className="text-[11px] text-[#5c4a35]">
                                {grantedRacialSpells.map((s) => s.name).join(', ')} • Aptitud de Linaje: {effectiveRacialSpellAbility.toUpperCase()} (CD {8 + profBonus + getMod(finalStats[effectiveRacialSpellAbility])})
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5 rounded font-mono font-bold shrink-0">
                            {grantedRacialSpells.length} conjuro{grantedRacialSpells.length > 1 ? 's' : ''} (Sin gasto de ranuras de clase)
                          </span>
                        </div>
                      )}

                      {/* Warning banner when exceeding limits */}
                      {(selectedCantripsCount > spellLimits.maxCantrips || selectedLeveledCount > spellLimits.maxPreparedOrKnown) && (
                        <div className="p-3.5 bg-amber-50 rounded-xl border-2 border-amber-400 text-amber-950 flex items-start gap-3 shadow-xs text-xs animate-fadeIn">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-fantasy font-bold uppercase tracking-wide block text-amber-900">
                              Has superado el límite recomendado por las reglas de D&D 5e
                            </span>
                            <p className="mt-0.5 leading-relaxed text-amber-800">
                              Tienes seleccionados más {selectedCantripsCount > spellLimits.maxCantrips ? 'trucos' : ''}
                              {selectedCantripsCount > spellLimits.maxCantrips && selectedLeveledCount > spellLimits.maxPreparedOrKnown ? ' y ' : ''}
                              {selectedLeveledCount > spellLimits.maxPreparedOrKnown ? 'conjuros conocidos/preparados' : ''} de los contemplados en el manual oficial para tu nivel. <strong>Avanza solo si el Dungeon Master así lo autoriza</strong> (dotes extras, pergaminos o reglas de mesa).
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Filters, Search & Mode Bar */}
                      <div className="bg-[#f5ede0] p-3 rounded-xl border border-[#d6c4aa] space-y-2.5 shadow-xs">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                          {/* Search Bar */}
                          <div className="relative flex-1">
                            <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={spellSearchQuery}
                              onChange={(e) => setSpellSearchQuery(e.target.value)}
                              placeholder="Buscar conjuro por nombre, escuela o efecto..."
                              className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                            />
                          </div>

                          {/* Maximize Button */}
                          <button
                            id="creator-spell-maximize-btn"
                            type="button"
                            onClick={() => setIsSpellPickerMaximized(true)}
                            className="px-3 py-1.5 rounded-lg border border-[#8c672b] bg-[#ebdcc4] hover:bg-[#dfcdb1] text-xs font-fantasy font-bold text-[#4a361c] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs shrink-0 hover:border-[#6a4f21]"
                            title="Maximizar catálogo para ver todos los conjuros disponibles en pantalla completa"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#8c672b]" />
                            <span>Maximizar ({displayedSpellsData.totalCount} Conjuros)</span>
                          </button>
                        </div>

                        {/* Filter Controls Row */}
                        <div className="space-y-2.5 pt-1 border-t border-[#e2d2bc] text-xs">
                          {/* Scope selector: Disponibles vs Toda la clase vs Compendio */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-[#7a6448] font-fantasy font-bold uppercase mr-1">Repertorio:</span>
                            <button
                              type="button"
                              onClick={() => setSpellScopeMode('available')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                                spellScopeMode === 'available'
                                  ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                  : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                              }`}
                              title="Muestra únicamente los conjuros que puedes lanzar con tus ranuras de nivel actual"
                            >
                              ⚡ Disponibles para Elegir ({filteredSpells.availableToChoose.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setSpellScopeMode('all_class')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                                spellScopeMode === 'all_class'
                                  ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                  : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                              }`}
                              title="Explorar niveles superiores de tu clase (Solo consulta/lectura)"
                            >
                              👁️ Consultar Niveles Superiores ({filteredSpells.higherLevelToBrowse.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setSpellScopeMode('all_compendium')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                                spellScopeMode === 'all_compendium'
                                  ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                                  : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                              }`}
                              title="Compendio Completo Oficial con conjuros de todas las clases"
                            >
                              📖 Compendio Completo ({OFFICIAL_SPELLS_COMPENDIUM.length})
                            </button>
                          </div>

                          {/* Sub-row: Tabs, Sort & School */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#ede1ce]">
                            {/* Tabs: Todos / Trucos / Nivel 1+ */}
                            <div className="flex items-center gap-1 bg-[#ede0cc] p-1 rounded-lg border border-[#d1be9e]">
                              <button
                                type="button"
                                onClick={() => setSpellActiveTab('all')}
                                className={`px-2.5 py-1 rounded text-[11px] font-fantasy font-bold transition cursor-pointer ${
                                  spellActiveTab === 'all' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#4a361c] hover:bg-white/50'
                                }`}
                              >
                                Todos ({displayedSpellsData.totalCount})
                              </button>
                              <button
                                type="button"
                                onClick={() => setSpellActiveTab('cantrips')}
                                className={`px-2.5 py-1 rounded text-[11px] font-fantasy font-bold transition cursor-pointer ${
                                  spellActiveTab === 'cantrips' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#4a361c] hover:bg-white/50'
                                }`}
                              >
                                Trucos ({displayedSpellsData.cantrips.length})
                              </button>
                              <button
                                type="button"
                                onClick={() => setSpellActiveTab('leveled')}
                                className={`px-2.5 py-1 rounded text-[11px] font-fantasy font-bold transition cursor-pointer ${
                                  spellActiveTab === 'leveled' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#4a361c] hover:bg-white/50'
                                }`}
                              >
                                Nivel 1+ ({displayedSpellsData.leveled.length})
                              </button>
                            </div>

                            {/* Dropdowns */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {/* Sort dropdown */}
                              <div className="flex items-center gap-1 bg-white border border-[#d6c4aa] rounded-lg px-2 py-1">
                                <ArrowUpDown className="w-3 h-3 text-[#8c672b]" />
                                <span className="text-[10px] text-[#7a6448] font-fantasy font-bold">Orden:</span>
                                <select
                                  value={spellSortMode}
                                  onChange={(e) => setSpellSortMode(e.target.value as any)}
                                  className="bg-transparent text-[11px] text-[#2c241b] focus:outline-none cursor-pointer"
                                >
                                  <option value="level">Por Nivel (1 → 9)</option>
                                  <option value="name">Alfabético (A → Z)</option>
                                  <option value="school">Por Escuela de Magia</option>
                                </select>
                              </div>

                              {/* School filter dropdown */}
                              <div className="flex items-center gap-1 bg-white border border-[#d6c4aa] rounded-lg px-2 py-1">
                                <SlidersHorizontal className="w-3 h-3 text-[#8c672b]" />
                                <span className="text-[10px] text-[#7a6448] font-fantasy font-bold">Escuela:</span>
                                <select
                                  value={spellSchoolFilter}
                                  onChange={(e) => setSpellSchoolFilter(e.target.value)}
                                  className="bg-transparent text-[11px] text-[#2c241b] focus:outline-none cursor-pointer"
                                >
                                  <option value="all">Todas las Escuelas</option>
                                  <option value="Abjuración">Abjuración</option>
                                  <option value="Adivinación">Adivinación</option>
                                  <option value="Conjuración">Conjuración</option>
                                  <option value="Encantamiento">Encantamiento</option>
                                  <option value="Evocación">Evocación</option>
                                  <option value="Ilusión">Ilusión</option>
                                  <option value="Nigromancia">Nigromancia</option>
                                  <option value="Transmutación">Transmutación</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SPELLS LIST: SEPARATED INTO CANTRIPS & LEVELED SPELLS BY LEVEL */}
                      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-1">
                        {/* SECTION A: CANTRIPS */}
                        {(spellActiveTab === 'all' || spellActiveTab === 'cantrips') && (
                          <div id="creator-spells-cantrips" className="space-y-3">
                            <div className="flex items-center justify-between border-b-2 border-[#8c672b] pb-1.5">
                              <h5 className="font-fantasy font-bold text-sm text-[#4a361c] flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#8c672b]" />
                                Trucos de Magia (Nivel 0 / Cantrips)
                              </h5>
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#ebdcc4] text-[#8c672b] border border-[#d6c4aa]">
                                {selectedCantripsCount} / {spellLimits.maxCantrips} Trucos Elegidos • {displayedSpellsData.cantrips.length} disponibles
                              </span>
                            </div>

                            {displayedSpellsData.cantrips.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {displayedSpellsData.cantrips.map((spell) => {
                                  const matchedSelected = selectedSpells.find((s) => s.name.toLowerCase() === spell.name.toLowerCase());
                                  const isSelected = !!matchedSelected;
                                  const effectiveSpell = matchedSelected || spell;
                                  return (
                                    <SpellCardComponent
                                      key={spell.id}
                                      spell={effectiveSpell}
                                      isSelected={isSelected}
                                      onToggle={() => toggleSpellChoice(effectiveSpell)}
                                      onInspect={(spl) => setInspectingSpell(spl)}
                                    />
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="p-4 bg-[#f5ede0] rounded-lg border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                                No se encontraron trucos con los filtros actuales.
                              </div>
                            )}
                          </div>
                        )}

                        {/* SECTION B: LEVELED SPELLS (Grouped strictly by level) */}
                        {(spellActiveTab === 'all' || spellActiveTab === 'leveled') && (
                          <div id="creator-spells-leveled" className="space-y-5 pt-2">
                            <div className="flex items-center justify-between border-b-2 border-[#8c672b] pb-1.5">
                              <h5 className="font-fantasy font-bold text-sm text-[#4a361c] flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#8c672b]" />
                                Hechizos con Espacio de Conjuro (Nivel 1 o Superior)
                              </h5>
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#ebdcc4] text-[#8c672b] border border-[#d6c4aa]">
                                {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown} en Grimorio / Repertorio
                              </span>
                            </div>

                            {displayedSpellsData.leveledByLevel.length > 0 ? (
                              displayedSpellsData.leveledByLevel.map(({ level, spells }) => {
                                const isHigherThanAllowed = level > filteredSpells.maxSpellLevel;
                                return (
                                  <div key={`lvl-grp-${level}`} className="space-y-2.5">
                                    <div className={`px-3 py-1.5 rounded-lg border flex items-center justify-between shadow-xs ${
                                      isHigherThanAllowed
                                        ? 'bg-[#e2d5c3] border-[#bda98c] opacity-90'
                                        : 'bg-[#ede1ce] border-[#d6c4aa]'
                                    }`}>
                                      <span className="font-fantasy font-bold text-xs text-[#4a361c] uppercase tracking-wide flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5 text-[#8c672b]" />
                                        Hechizos de Nivel {level} ({spells.length} disponibles)
                                        {isHigherThanAllowed && (
                                          <span className="text-[9px] bg-amber-200 text-amber-900 border border-amber-400 px-1.5 py-0.2 rounded font-mono font-bold">
                                            Solo Consulta (Nivel Superior)
                                          </span>
                                        )}
                                      </span>
                                      <span className="text-[10px] font-mono text-[#7a6448]">
                                        {spells.filter((sp) => selectedSpells.some((s) => s.name.toLowerCase() === sp.name.toLowerCase())).length} elegidos de nivel {level}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {spells.map((spell) => {
                                        const matchedSelected = selectedSpells.find((s) => s.name.toLowerCase() === spell.name.toLowerCase());
                                        const isSelected = !!matchedSelected;
                                        const effectiveSpell = matchedSelected || spell;
                                        return (
                                          <SpellCardComponent
                                            key={spell.id}
                                            spell={effectiveSpell}
                                            isSelected={isSelected}
                                            onToggle={() => toggleSpellChoice(effectiveSpell)}
                                            onInspect={(spl) => setInspectingSpell(spl)}
                                            isHigherLevel={spell.level > filteredSpells.maxSpellLevel}
                                            requiredCasterLevel={getRequiredCasterLevel(spell.level)}
                                          />
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="p-4 bg-[#f5ede0] rounded-lg border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                                No se encontraron hechizos de nivel con los filtros actuales.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 8: FINAL REVIEW & FORGE */}
              {/* ----------------------------------------------------- */}
              {currentStep === 'review' && (
                <div id="step-tab-review-content" className="space-y-4">
                  {/* Step Explanation Banner */}
                  <div id="creator-review-export-banner" className="p-3.5 sm:p-4 rounded-xl bg-[#f5ede0] border-2 border-[#d6c4aa] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-[#8c672b] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                          ¡Todo listo para comenzar la aventura!
                        </h4>
                        <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                          Revisa la ficha definitiva de tu aventurero antes de forjarla. Al presionar <strong>"¡Forjar Personaje!"</strong>, tu héroe se integrará de inmediato a la campaña activa con todas sus estadísticas, rasgos, conjuros y equipo.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportOfficialPdfFromCreator}
                      disabled={isExportingPdf}
                      className="px-3.5 py-1.5 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#8c672b]/70 shadow-xs shrink-0 active:scale-95 disabled:opacity-50 self-start sm:self-auto"
                      title="Descargar la Hoja de Personaje Oficial 5e (PDF editable de 3 páginas)"
                    >
                      <FileDown className="w-4 h-4 text-[#ffd56b]" />
                      <span>{isExportingPdf ? 'Generando PDF...' : 'Exportar Hoja Oficial (PDF)'}</span>
                    </button>
                  </div>

                  {/* Character Dossier Hero Card */}
                  <div id="creator-review-dossier" className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Avatar"
                          className="w-18 h-18 rounded-xl object-cover border-2 border-[#8c672b] shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-18 h-18 rounded-xl border-2 border-[#8c672b] shadow-sm bg-[#e8ded0] flex items-center justify-center text-[#8c672b] shrink-0">
                          <User className="w-9 h-9" />
                        </div>
                      )}
                      <div className="text-center sm:text-left flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-xl font-fantasy font-bold text-[#4a361c] truncate">
                            {characterName || 'Héroe sin Nombre'}
                          </h3>
                          <span className="text-xs bg-[#2c221a] text-[#d4ab59] font-mono font-bold px-2 py-0.5 rounded shrink-0 self-center sm:self-auto">
                            Nivel {characterLevel}
                          </span>
                        </div>
                        <p className="text-xs text-[#8c672b] font-mono font-bold truncate">
                          {activeRace ? `${activeRace.name} ${activeSubrace ? `(${activeSubrace.name})` : ''}` : 'Raza sin elegir'} •{' '}
                          {activeClass
                            ? isSubclassUnlocked && activeSubclass
                              ? `${activeClass.name} (${activeSubclass.name})`
                              : !isSubclassUnlocked
                              ? `${activeClass.name} (Subclase a Nv ${subclassUnlockLevel})`
                              : activeClass.name
                            : 'Clase sin elegir'}
                        </p>
                        <p className="text-[11px] text-[#7a6448] truncate">
                          Trasfondo: <strong>{activeBackground ? activeBackground.name : 'Sin elegir'}</strong> • Alineamiento: {alignment ? (ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name || alignment) : 'Neutral'} • Jugador: {playerName || 'Tú'}
                        </p>
                      </div>
                    </div>

                    {/* Vital Metrics Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center pt-1">
                      <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] shadow-2xs">
                        <span className="text-[9px] text-[#7a6448] uppercase block">Salud (PG)</span>
                        <span className="font-fantasy font-bold text-base text-[#2e7d32]">
                          {activeClass ? `${calculatedMaxHp} PG` : '-'}
                        </span>
                      </div>
                      <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] shadow-2xs">
                        <span className="text-[9px] text-[#7a6448] uppercase block">Armadura (CA)</span>
                        <span className="font-fantasy font-bold text-base text-[#8c672b]">
                          {calculatedAc} CA
                        </span>
                      </div>
                      <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] shadow-2xs">
                        <span className="text-[9px] text-[#7a6448] uppercase block">Iniciativa</span>
                        <span className="font-fantasy font-bold text-base text-[#1d4ed8]">
                          {calculatedInitiative >= 0 ? `+${calculatedInitiative}` : calculatedInitiative}
                        </span>
                      </div>
                      <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] shadow-2xs" title={calculatedSpeedResult.breakdown.join(' | ')}>
                        <span className="text-[9px] text-[#7a6448] uppercase block">Velocidad</span>
                        <span className="font-fantasy font-bold text-base text-[#4a361c]">
                          {calculatedSpeedResult.speedStr}
                        </span>
                      </div>
                      <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] shadow-2xs" title="Bono de Competencia">
                        <span className="text-[9px] text-[#7a6448] uppercase block">Bono Comp.</span>
                        <span className="font-fantasy font-bold text-base text-[#92400e]">
                          +{profBonus}
                        </span>
                      </div>
                      <div className="p-2 bg-[#fcf9f2] rounded-lg border border-[#d6c4aa] shadow-2xs" title="Percepción Pasiva">
                        <span className="text-[9px] text-[#7a6448] uppercase block">Percep. Pasiva</span>
                        <span className="font-fantasy font-bold text-base text-[#b45309]">
                          {calculatedPassivePerception}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Sub-Tabs Bar */}
                  <div className="flex items-center gap-1.5 bg-[#ede1ce] p-1.5 rounded-xl border border-[#d6c4aa] overflow-x-auto text-xs">
                    <button
                      type="button"
                      onClick={() => setReviewTab('combat')}
                      className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0 ${
                        reviewTab === 'combat'
                          ? 'bg-[#8c672b] text-white shadow-xs'
                          : 'text-[#4a361c] hover:bg-white/60'
                      }`}
                    >
                      <span>⚔️</span> Combate & Salvaciones
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewTab('skills')}
                      className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0 ${
                        reviewTab === 'skills'
                          ? 'bg-[#8c672b] text-white shadow-xs'
                          : 'text-[#4a361c] hover:bg-white/60'
                      }`}
                    >
                      <span>🎯</span> Habilidades 5e ({totalSkills.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewTab('traits')}
                      className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0 ${
                        reviewTab === 'traits'
                          ? 'bg-[#8c672b] text-white shadow-xs'
                          : 'text-[#4a361c] hover:bg-white/60'
                      }`}
                    >
                      <span>📜</span> Rasgos & Dotes
                    </button>
                    {(isCaster || selectedSpells.length > 0) && (
                      <button
                        type="button"
                        onClick={() => setReviewTab('spells')}
                        className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0 ${
                          reviewTab === 'spells'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'text-[#4a361c] hover:bg-white/60'
                        }`}
                      >
                        <span>🔮</span> Magia & Grimorio ({selectedSpells.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setReviewTab('inventory')}
                      className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0 ${
                        reviewTab === 'inventory'
                          ? 'bg-[#8c672b] text-white shadow-xs'
                          : 'text-[#4a361c] hover:bg-white/60'
                      }`}
                    >
                      <span>🎒</span> Inventario & Oro ({startingGoldTotal} po)
                    </button>
                  </div>

                  {/* Review Tab 1: Combate & Salvaciones */}
                  {reviewTab === 'combat' && (
                    <div className="space-y-4">
                      {/* Ability Scores Grid */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Dices className="w-4 h-4 text-[#8c672b]" /> Puntuaciones de Característica & Modificadores
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                          {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => {
                            const isAssigned = assignedStats[st] !== undefined;
                            const base = isAssigned ? assignedStats[st]! : '--';
                            const race = racialBonuses[st];
                            const asi = asiStatBonuses[st] || 0;
                            const total = isAssigned ? finalStats[st] : '--';
                            const mod = isAssigned ? getModStr(finalStats[st]) : '--';

                            return (
                              <div key={st} className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] text-center shadow-2xs">
                                <span className="font-fantasy font-bold text-xs text-[#4a361c] block">
                                  {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}
                                </span>
                                <span className="text-[10px] text-[#7a6448] font-mono block">
                                  {base}
                                  {race > 0 && <span className="text-[#8c672b]">+{race}</span>}
                                  {asi > 0 && <span className="text-[#b45309]">+{asi}</span>}
                                </span>
                                <span className="font-mono font-bold text-base text-[#4a361c] block mt-0.5">
                                  {total}
                                </span>
                                <span className="text-xs font-bold text-[#2e7d32] bg-white/70 px-1.5 py-0.2 rounded font-mono">
                                  {mod}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Saving Throws Grid with Numeric Bonuses */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-[#8c672b]" /> Tiradas de Salvación Calculadas (D20 + Mod)
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {savingThrowDetails.map((save) => (
                            <div
                              key={save.stat}
                              className={`p-2 rounded-lg border flex items-center justify-between text-xs ${
                                save.isProficient
                                  ? 'bg-[#fef3c7] border-[#f59e0b] shadow-2xs font-bold'
                                  : 'bg-[#f5ede0] border-[#d6c4aa]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-fantasy text-sm text-[#8c672b]">
                                  {save.isProficient ? '★' : '○'}
                                </span>
                                <div>
                                  <span className="text-[#4a361c] font-bold block">{save.statName}</span>
                                  <span className="text-[9px] text-[#7a6448]">
                                    {save.isProficient ? `Competente (+${profBonus})` : 'Modificador base'}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`font-mono text-sm px-2 py-0.5 rounded font-bold ${
                                  save.isProficient
                                    ? 'bg-[#8c672b] text-white'
                                    : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                                }`}
                              >
                                {save.bonusStr}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Attacks & Weapons Ready */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Sword className="w-4 h-4 text-[#8c672b]" /> Armas & Acciones de Ataque Iniciales
                        </h5>
                        <div className="space-y-2">
                          {equippedAttacks.map((att, i) => (
                            <div
                              key={i}
                              className="p-3 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] flex items-center justify-between text-xs shadow-2xs"
                            >
                              <div>
                                <span className="font-fantasy font-bold text-[#4a361c] text-sm block">
                                  ⚔️ {att.name}
                                </span>
                                <span className="text-[11px] text-[#7a6448]">
                                  Ataque con arma vinculada a tu clase y equipo inicial
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="font-mono text-[#8c672b] font-bold text-sm block">
                                  Impacto: {att.bonus}
                                </span>
                                <span className="font-mono text-[#2e7d32] text-xs font-bold block">
                                  Daño: {att.damage} ({att.type})
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Tab 2: Habilidades 5e */}
                  {reviewTab === 'skills' && (
                    <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#8c672b]" /> Las 18 Habilidades Oficiales 5e (Bonificador Calculado)
                        </h5>
                        <span className="text-xs text-[#7a6448] font-mono font-bold">
                          {totalSkills.length} con competencia activa
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[46vh] overflow-y-auto pr-1">
                        {skillDetails.map((sk) => (
                          <SkillTooltip key={sk.name} skillName={sk.name}>
                            <div
                              className={`p-2 rounded-lg border flex items-center justify-between text-xs transition h-full ${
                                sk.isExpertise
                                  ? 'bg-[#fef3c7] border-[#f59e0b] shadow-2xs font-bold'
                                  : sk.isProficient
                                  ? 'bg-[#ede1ce] border-[#cbb99f]'
                                  : 'bg-[#f5ede0] border-[#d6c4aa] opacity-80'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[#8c672b] font-bold shrink-0">
                                  {sk.isExpertise ? '⭐' : sk.isProficient ? '✓' : '○'}
                                </span>
                                <div className="min-w-0">
                                  <span className="font-bold text-[#4a361c] truncate block">
                                    {sk.name}{' '}
                                    <span className="text-[10px] text-[#7a6448] font-mono font-normal">
                                      ({ABILITY_SCORE_EXPLANATIONS[sk.ability].abbreviation})
                                    </span>
                                  </span>
                                  <span className="text-[9px] text-[#7a6448] truncate block">
                                    {sk.isExpertise
                                      ? `Pericia x2 (+${2 * profBonus})`
                                      : sk.isProficient
                                      ? `Competente [${sk.origin}] (+${profBonus})`
                                      : 'Sin competencia'}
                                  </span>
                                </div>
                              </div>

                              <span
                                className={`font-mono text-sm px-2 py-0.5 rounded font-bold shrink-0 ${
                                  sk.isExpertise
                                    ? 'bg-[#92400e] text-white'
                                    : sk.isProficient
                                    ? 'bg-[#8c672b] text-white'
                                    : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                                }`}
                              >
                                {sk.bonusStr}
                              </span>
                            </div>
                          </SkillTooltip>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Review Tab 3: Rasgos, Dotes & Trasfondo */}
                  {reviewTab === 'traits' && (
                    <div className="space-y-4">
                      {/* Roleplay, Philosophy & Backstory Dossier */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border-2 border-[#8c672b] space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#e2d5c2] pb-2">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <User className="w-4 h-4 text-[#8c672b]" /> Identidad, Filosofía & Rol del Héroe
                          </h5>
                          <span className="text-[10px] bg-[#2c221a] text-[#d4ab59] px-2 py-0.5 rounded font-mono font-bold">
                            {alignment ? (ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name || alignment) : 'Neutral'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <strong className="text-[#8c672b] block font-fantasy text-xs uppercase mb-1">
                              🎭 Rasgos de Personalidad & Virtudes:
                            </strong>
                            <p className="text-[#4a361c] whitespace-pre-line italic">
                              {personalityTraits.trim() || 'Sin definir todavía.'}
                            </p>
                          </div>

                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <strong className="text-[#8c672b] block font-fantasy text-xs uppercase mb-1">
                              ⚖️ Ideales & Convicciones Morales:
                            </strong>
                            <p className="text-[#4a361c] whitespace-pre-line italic">
                              {ideals.trim() || 'Sin definir todavía.'}
                            </p>
                          </div>

                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <strong className="text-[#8c672b] block font-fantasy text-xs uppercase mb-1">
                              🔗 Vínculos & Lealtades:
                            </strong>
                            <p className="text-[#4a361c] whitespace-pre-line italic">
                              {bonds.trim() || 'Sin definir todavía.'}
                            </p>
                          </div>

                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <strong className="text-[#8c672b] block font-fantasy text-xs uppercase mb-1">
                              ⚠️ Defectos, Debilidades & Tentaciones:
                            </strong>
                            <p className="text-[#4a361c] whitespace-pre-line italic">
                              {flaws.trim() || 'Sin definir todavía.'}
                            </p>
                          </div>
                        </div>

                        {backstoryBrief.trim() && (
                          <div className="p-3 bg-[#fdfbf6] rounded-lg border border-[#d6c4aa] text-xs">
                            <strong className="text-[#4a361c] block font-fantasy text-xs uppercase mb-1">
                              📜 Historia y Pasado del Héroe:
                            </strong>
                            <p className="text-[#5c4a35] whitespace-pre-line leading-relaxed">
                              {backstoryBrief}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Background Feature */}
                      {activeBackground && (
                        <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-1.5 shadow-xs">
                          <div className="flex items-center justify-between">
                            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-[#8c672b]" /> Rasgo de Trasfondo: {activeBackground.featureName}
                            </h5>
                            <span className="text-[10px] bg-[#ede1ce] text-[#5e4b37] px-2 py-0.5 rounded font-mono font-bold">
                              {activeBackground.name}
                            </span>
                          </div>
                          <p className="text-xs text-[#5c4a35] leading-relaxed">
                            {activeBackground.featureDescription}
                          </p>
                          {activeBackground.suggestedEquipment && (
                            <p className="text-[11px] text-[#7a6448] italic pt-1">
                              <strong>Equipo Sugerido:</strong> {activeBackground.suggestedEquipment}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Chosen Feats with detailed choices */}
                      {chosenFeatsList.length > 0 && (
                        <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                          <h5 className="font-fantasy font-bold text-xs text-[#b45309] uppercase flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-[#8c672b]" /> Dotes Oficiales Seleccionadas ({chosenFeatsList.length})
                          </h5>
                          <div className="space-y-2">
                            {chosenFeatsList.map(({ feat, choice }, fIdx) => {
                              const subChoiceNames = (choice.featSubChoices || [])
                                .map((id) => feat.subChoice?.options.find((o) => o.id === id)?.name || id)
                                .join(', ');
                              return (
                                <div key={fIdx} className="p-3 bg-[#fdf2e9] rounded-lg border border-[#fbd38d] space-y-1 shadow-2xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-fantasy font-bold text-sm text-[#78350f]">
                                      ★ {feat.name}
                                    </span>
                                    {choice.featAbilityChoice && (
                                      <span className="text-xs bg-[#c05621] text-white px-2 py-0.5 rounded font-mono font-bold">
                                        +{feat.abilityBonus?.amount || 1} {ABILITY_SCORE_EXPLANATIONS[choice.featAbilityChoice]?.name}
                                      </span>
                                    )}
                                  </div>
                                  {subChoiceNames && (
                                    <div className="text-xs font-bold text-[#b45309]">
                                      Elección ({feat.subChoice?.title}): <span className="underline">{subChoiceNames}</span>
                                    </div>
                                  )}
                                  <div className="text-xs text-[#78350f] leading-relaxed">
                                    {feat.benefits.map((b, bIdx) => (
                                      <p key={bIdx}>• {b}</p>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Racial Traits */}
                      {activeRace && (
                        <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-[#8c672b]" /> Rasgos Raciales ({activeRace.name})
                          </h5>
                          <div className="space-y-1.5">
                            {activeRace.darkvision > 0 && (
                              <div className="p-2 bg-[#f5ede0] rounded border border-[#d6c4aa] text-xs">
                                <strong>Visión en la Oscuridad:</strong> Puedes ver en la oscuridad hasta {activeRace.darkvision} pies en tonos de gris.
                              </div>
                            )}
                            {activeRace.traits?.map((t, idx) => (
                              <div key={idx} className="p-2 bg-[#f5ede0] rounded border border-[#d6c4aa] text-xs">
                                <strong>{t.name}:</strong> {t.desc}
                              </div>
                            ))}
                            {activeSubrace?.traits?.map((t, idx) => (
                              <div key={`sub-${idx}`} className="p-2 bg-[#f5ede0] rounded border border-[#d6c4aa] text-xs">
                                <strong>{t.name} [{activeSubrace.name}]:</strong> {t.desc}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Class Features Up to Current Level */}
                      {activeClass && (
                        <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <Shield className="w-4 h-4 text-[#8c672b]" /> Rasgos de Clase ({activeClass.name} Nv{characterLevel})
                          </h5>
                          <div className="space-y-1.5">
                            {combinedProgression
                              .filter((f) => f.level <= characterLevel)
                              .map((f, idx) => (
                                <div key={idx} className="p-2 bg-[#f5ede0] rounded border border-[#d6c4aa] text-xs">
                                  <strong>{f.name} (Nv {f.level}):</strong> {f.desc}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Review Tab 4: Magia & Grimorio */}
                  {reviewTab === 'spells' && (isCaster || selectedSpells.length > 0) && (
                    <div className="space-y-4">
                      {/* Spellcasting Metrics & Slots */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-3 shadow-xs">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <span className="text-[10px] text-[#7a6448] uppercase block">Característica</span>
                            <span className="font-fantasy font-bold text-sm text-[#4a361c]">
                              {spellcastingDetails?.abilityName} ({(spellcastingDetails?.abilityMod ?? 0) >= 0 ? `+${spellcastingDetails?.abilityMod ?? 0}` : (spellcastingDetails?.abilityMod ?? 0)})
                            </span>
                          </div>
                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <span className="text-[10px] text-[#7a6448] uppercase block">CD Salvación</span>
                            <span className="font-fantasy font-bold text-base text-[#8c672b]">
                              CD {spellcastingDetails?.saveDc}
                            </span>
                          </div>
                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <span className="text-[10px] text-[#7a6448] uppercase block">Ataque de Conjuro</span>
                            <span className="font-fantasy font-bold text-base text-[#1d4ed8]">
                              {spellcastingDetails?.attackStr}
                            </span>
                          </div>
                          <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa]">
                            <span className="text-[10px] text-[#7a6448] uppercase block">Preparados/Conocidos</span>
                            <span className="font-fantasy font-bold text-sm text-[#2e7d32]">
                              {isCaster ? `${selectedLeveledCount} / ${spellLimits.maxPreparedOrKnown}` : `${selectedLeveledCount}`}
                            </span>
                          </div>
                        </div>

                        {/* Spell Slots by Level */}
                        {spellcastingDetails?.slots && Object.keys(spellcastingDetails.slots).length > 0 && (
                          <div className="p-3 bg-[#ede1ce] rounded-lg border border-[#d6c4aa] flex items-center justify-between flex-wrap gap-2 text-xs">
                            <span className="font-fantasy font-bold text-[#4a361c] uppercase text-xs">
                              Ranuras de Conjuro Disponibles:
                            </span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {Object.entries(spellcastingDetails.slots).map(([lvlKey, count]) => (
                                <span
                                  key={lvlKey}
                                  className="px-2.5 py-1 rounded-md bg-[#2c221a] text-[#d4ab59] font-mono text-xs font-bold border border-[#c59b27]"
                                >
                                  {lvlKey.toUpperCase().replace('LVL', 'Nivel ')}: {count} {count === 1 ? 'ranura' : 'ranuras'}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Cantrips List */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#8c672b]" /> Trucos Conocidos (Nivel 0)
                          </h5>
                          <span className="text-xs text-[#7a6448] font-mono font-bold">
                            {selectedCantripsCount} de {spellLimits.maxCantrips}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedSpells
                            .filter((s) => s.level === 0)
                            .map((spl) => (
                              <div
                                key={spl.id || spl.name}
                                className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] space-y-1 shadow-2xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fantasy font-bold text-[#4a361c] text-xs">
                                    {spl.name}
                                  </span>
                                  <span className="text-[10px] text-[#8c672b] font-mono font-bold">
                                    {spl.school}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#5c4a35] line-clamp-2">
                                  {spl.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Leveled Spells List */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-[#8c672b]" /> Conjuros Nivelados Conocidos / Preparados
                          </h5>
                          <span className="text-xs text-[#7a6448] font-mono font-bold">
                            {selectedLeveledCount} de {spellLimits.maxPreparedOrKnown}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedSpells
                            .filter((s) => s.level > 0)
                            .map((spl) => (
                              <div
                                key={spl.id || spl.name}
                                className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] space-y-1 shadow-2xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-fantasy font-bold text-[#4a361c] text-xs">
                                    {spl.name}
                                  </span>
                                  <span className="text-[10px] bg-[#8c672b] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                                    Nv {spl.level} • {spl.school}
                                  </span>
                                </div>
                                <div className="text-[10px] text-[#7a6448] font-mono">
                                  Casteo: {spl.castingTime || '1 acción'} • Alcance: {spl.range || 'Cerca'}
                                </div>
                                <p className="text-[11px] text-[#5c4a35] line-clamp-2">
                                  {spl.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review Tab 5: Inventario & Oro */}
                  {reviewTab === 'inventory' && (
                    <div className="space-y-4">
                      {/* Wealth Header */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#2c221a] border border-[#c59b27] flex items-center justify-center text-[#d4ab59]">
                            <Coins className="w-5 h-5 text-[#c59b27]" />
                          </div>
                          <div>
                            <span className="font-fantasy font-bold text-sm text-[#4a361c] uppercase block">
                              Bolsa de Monedas Inicial
                            </span>
                            <span className="text-xs text-[#7a6448]">
                              Fondos acumulados de clase y trasfondo
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xl font-bold text-[#b45309]">
                          {activeBackground ? formatBackgroundWealth(activeBackground) : `${startingGoldTotal} po`}
                        </span>
                      </div>

                      {/* Equipment List */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Backpack className="w-4 h-4 text-[#8c672b]" /> Equipamiento de Aventurero & Posesiones
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {chosenEquipmentList.map((item, idx) => {
                            const isEquipped = isItemEquipped(item);
                            const weaponDef = findWeaponByName(item);
                            const armorDef = findArmorByName(item);
                            const isShield = item.toLowerCase().includes('escudo') && !item.toLowerCase().includes('hechizo');

                            return (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-lg border text-xs font-medium shadow-2xs flex items-center justify-between gap-2 ${
                                  isEquipped
                                    ? 'bg-[#f5ede0] border-[#8c672b] text-[#4a361c]'
                                    : 'bg-[#faf7f0] border-[#d6c4aa] text-[#7a6448] opacity-80'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <EquipmentBadge name={item} size="sm" />
                                  <div className="min-w-0">
                                    <span className="block truncate font-bold">{item}</span>
                                    <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                      {weaponDef && (
                                        <span className="text-[9px] bg-[#ede1ce] text-[#5e4b37] px-1 py-0.2 rounded font-mono font-bold">
                                          {weaponDef.damageDice} {weaponDef.damageType}
                                        </span>
                                      )}
                                      {armorDef && (
                                        <span className="text-[9px] bg-[#dbe8d3] text-[#2e5924] px-1 py-0.2 rounded font-mono font-bold">
                                          {armorDef.category === 'shield' ? '+2 CA' : `CA ${armorDef.baseAc}`}
                                        </span>
                                      )}
                                      {isShield && !armorDef && (
                                        <span className="text-[9px] bg-[#dbe8d3] text-[#2e5924] px-1 py-0.2 rounded font-mono font-bold">
                                          +2 CA
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleEquipItem(item)}
                                  className={`px-2 py-1 rounded text-[10px] font-fantasy font-bold transition flex items-center gap-1 shrink-0 cursor-pointer ${
                                    isEquipped
                                      ? 'bg-[#2e7d32] text-white shadow-2xs'
                                      : 'bg-[#e2d2bc] hover:bg-[#d6c4aa] text-[#4a361c]'
                                  }`}
                                >
                                  {isEquipped ? '🛡️ Equipado' : 'Equipar'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tools & Languages */}
                      <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] space-y-2 shadow-xs">
                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#8c672b]" /> Herramientas & Idiomas de Trasfondo
                        </h5>
                        <div className="text-xs text-[#5c4a35] space-y-1">
                          <p>
                            <strong>Herramientas:</strong>{' '}
                            {backgroundTools && backgroundTools.length > 0
                              ? backgroundTools.join(', ')
                              : 'Ninguna herramienta otorgada por este trasfondo'}
                          </p>
                          <p>
                            <strong>Idiomas adicionales:</strong>{' '}
                            {activeBackground?.languageOptions && activeBackground.languageOptions.length > 0
                              ? `${activeBackground.languagesCount || 1} a elegir entre: ${activeBackground.languageOptions.join(', ')}`
                              : activeBackground?.languageNote
                              ? activeBackground.languageNote
                              : activeBackground?.languagesCount
                              ? `${activeBackground.languagesCount} idiomas adicionales a elección`
                              : 'Idiomas estándar según raza'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BOTTOM NAV BUTTONS: Sculpted Antique Mahogany & Bronze Bar */}
            <div
              className="py-1.5 sm:py-2 px-3 sm:px-5 border-t border-[#8c672b]/80 flex items-center justify-between shrink-0 text-[#f7f2ea] shadow-md gap-2 flex-nowrap"
              style={{
                backgroundImage: 'linear-gradient(rgba(24, 15, 9, 0.88), rgba(16, 10, 6, 0.95)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
                backgroundColor: '#1a1009',
              }}
            >
              <button
                type="button"
                onClick={goToPrevStep}
                disabled={currentStepIndex === 0}
                className="px-3.5 py-1 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed border border-[#8c672b]/70 shadow-xs active:scale-95 shrink-0"
              >
                <ChevronLeft className="w-4 h-4" /> Paso Anterior
              </button>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold text-[#dfbe7e] hidden sm:inline px-3 py-1 rounded-full bg-[#180e07] border border-[#8c672b]/60 shadow-xs">
                  Paso {currentStepIndex + 1} de {STEPS.length}
                </span>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-2.5 py-1 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#8c672b]/70 shadow-xs active:scale-95 shrink-0"
                  title="Guardar borrador y salir para continuar luego"
                >
                  <Save className="w-3.5 h-3.5 text-[#dfbe7e]" />
                  <span className="hidden md:inline">Guardar Borrador</span>
                </button>
              </div>

              {currentStepIndex < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-4 py-1 rounded-lg text-xs font-fantasy font-extrabold text-[#1c130b] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:brightness-110 active:scale-95 border border-[#ffe28a] shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, #f5d47a 0%, #d4a73b 50%, #9e731e 100%)',
                    boxShadow: '0 2px 10px rgba(212, 167, 59, 0.45)',
                  }}
                >
                  <span>Siguiente Paso</span> <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="creator-final-save-btn"
                  type="button"
                  onClick={handleFinalSave}
                  className="px-4 py-1 rounded-lg text-xs font-fantasy font-extrabold text-[#1c130b] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:brightness-110 active:scale-95 border border-[#ffe28a] shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, #f5d47a 0%, #d4a73b 50%, #9e731e 100%)',
                    boxShadow: '0 2px 10px rgba(212, 167, 59, 0.45)',
                  }}
                  title="Finalizar y guardar el personaje"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#1c130b]" />
                  <span>
                    {initialCharacter && !initialCharacter.isDraft
                      ? 'Guardar Cambios'
                      : '¡Forjar Personaje!'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            </div>
          </div>

        {/* ========================================================= */}
        {/* RIGHT PERSISTENT SIDEBAR: LIVE D&D CHARACTER SHEET PREVIEW */}
        {/* ========================================================= */}
        {isSidebarOpen && (
          <div
            id="creator-sidebar"
            className="w-72 sm:w-80 md:w-84 lg:w-92 xl:w-[390px] shrink-0 h-full flex flex-col relative z-10 animate-fadeIn"
          >
            {/* Pristine Parchment Folio Card (No scroll rollers, matching the table theme) */}
            <div className="relative flex-1 h-full flex flex-col rounded-2xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.5)] border border-[#a67c3b]/60 bg-[#fbf7ee] bg-[url('/assets/ui/parchment_clean_texture.png')] bg-repeat">
              
              {/* Sleek Top Leather & Bronze Header with Collapse Button */}
              <div
                className="h-8 sm:h-9 w-full shrink-0 flex items-center justify-between px-3 shadow-xs border-b border-[#8c672b]/70 text-[#f7f2ea]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(24, 15, 9, 0.85), rgba(16, 10, 6, 0.92)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
                  backgroundRepeat: 'repeat',
                  backgroundColor: '#1a1009',
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Scroll className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />
                  <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-[#ffd56b] truncate">
                    Hoja en Vivo
                  </span>
                  <span className="text-[9.5px] bg-[#24170d] text-[#dfbe7e] font-mono font-bold px-1.5 py-0.2 rounded border border-[#8c672b]/60 shadow-xs">
                    Nv{characterLevel} • +{profBonus}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-[#dfbe7e] hover:text-[#ffd56b] hover:bg-[#3d2714] rounded-md transition cursor-pointer flex items-center gap-0.5 text-[10px] font-fantasy active:scale-95"
                  title="Colapsar previsualización para tener más espacio"
                >
                  <span className="hidden sm:inline">Colapsar</span>
                  <ChevronRight className="w-4 h-4 text-[#ffd56b]" />
                </button>
              </div>

              {/* Scrollable Live Sheet Content */}
              <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2.5 font-serif text-[#2c241b] shadow-inner">

              {/* Hero Identity: Fantasy Avatar Frame + Info */}
              <div className="bg-[#fbf6ed]/95 rounded-xl p-2.5 border border-[#c4a982] flex items-center gap-3 shadow-xs">
                <div
                  className="shrink-0 drop-shadow-[0_4px_8px_rgba(40,20,10,0.35)] cursor-pointer group/avatar"
                  onClick={() => setAvatarModalOpen(true)}
                  title="Ajustar Avatar y Marco"
                >
                  <FantasyAvatarFrame
                    avatarUrl={avatarUrl}
                    name={characterName || 'Héroe'}
                    level={characterLevel}
                    frameStyle={avatarFrame || 'frame-royal-gold'}
                    size="sm"
                    avatarScale={avatarScale}
                    avatarOffsetY={avatarOffsetY}
                    interactive
                  />
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-fantasy font-bold text-sm text-[#241308] truncate tracking-wide">
                      {characterName || 'Sin Nombre'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setAvatarModalOpen(true)}
                      className="text-[9px] font-fantasy font-bold text-[#8c672b] hover:text-[#5c3e1e] underline cursor-pointer shrink-0"
                    >
                      Marco 🎨
                    </button>
                  </div>
                  <p className="text-[11px] text-[#8c521f] font-mono font-bold truncate mt-0.5">
                    {activeRace ? activeRace.name : 'Raza sin elegir'} •{' '}
                    {activeClass
                      ? isSubclassUnlocked && activeSubclass
                        ? `${activeClass.name} (${activeSubclass.name.split('(')[0].trim()})`
                        : activeClass.name
                      : 'Clase sin elegir'}
                  </p>
                  <p className="text-[10px] text-[#6b472e] truncate">
                    {activeBackground ? activeBackground.name : 'Trasfondo sin elegir'} •{' '}
                    {alignment
                      ? ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name.split(' ')[0] || alignment
                      : 'Alineamiento'}
                  </p>
                </div>
              </div>

              {/* Tab Navigation Toolbar (Forged Bronze Pill Buttons) */}
              <div className="flex items-center gap-1 bg-[#23170e] p-1 rounded-xl border border-[#8c672b]/60 shadow-inner text-xs">
                <button
                  type="button"
                  onClick={() => setLiveSheetTab('combat')}
                  className={`flex-1 py-1 px-1 rounded-lg font-fantasy font-bold text-[10.5px] transition cursor-pointer text-center ${
                    liveSheetTab === 'combat'
                      ? 'bg-gradient-to-b from-[#8c672b] to-[#5e4218] text-[#fff6e0] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#dfbe7e]/80'
                      : 'text-[#d4b483] hover:text-white hover:bg-white/10'
                  }`}
                  title="Combate, Atributos, Salvaciones y Ataques"
                >
                  ⚔️ Combate
                </button>
                <button
                  type="button"
                  onClick={() => setLiveSheetTab('skills')}
                  className={`flex-1 py-1 px-1 rounded-lg font-fantasy font-bold text-[10.5px] transition cursor-pointer text-center ${
                    liveSheetTab === 'skills'
                      ? 'bg-gradient-to-b from-[#8c672b] to-[#5e4218] text-[#fff6e0] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#dfbe7e]/80'
                      : 'text-[#d4b483] hover:text-white hover:bg-white/10'
                  }`}
                  title="Habilidades y Bonificadores Calculados"
                >
                  🎯 Hab ({totalSkills.length})
                </button>
                <button
                  type="button"
                  onClick={() => setLiveSheetTab('traits')}
                  className={`flex-1 py-1 px-1 rounded-lg font-fantasy font-bold text-[10.5px] transition cursor-pointer text-center ${
                    liveSheetTab === 'traits'
                      ? 'bg-gradient-to-b from-[#8c672b] to-[#5e4218] text-[#fff6e0] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#dfbe7e]/80'
                      : 'text-[#d4b483] hover:text-white hover:bg-white/10'
                  }`}
                  title="Rasgos de Trasfondo, Raza, Clase y Dotes"
                >
                  📜 Rasgos
                </button>
                {(isCaster || selectedSpells.length > 0) && (
                  <button
                    type="button"
                    onClick={() => setLiveSheetTab('spells')}
                    className={`flex-1 py-1 px-1 rounded-lg font-fantasy font-bold text-[10.5px] transition cursor-pointer text-center ${
                      liveSheetTab === 'spells'
                        ? 'bg-gradient-to-b from-[#8c672b] to-[#5e4218] text-[#fff6e0] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#dfbe7e]/80'
                        : 'text-[#d4b483] hover:text-white hover:bg-white/10'
                    }`}
                    title="Grimorio, CD y Ranuras"
                  >
                    🔮 Magia ({selectedSpells.length})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setLiveSheetTab('inventory')}
                  className={`flex-1 py-1 px-1 rounded-lg font-fantasy font-bold text-[10.5px] transition cursor-pointer text-center ${
                    liveSheetTab === 'inventory'
                      ? 'bg-gradient-to-b from-[#8c672b] to-[#5e4218] text-[#fff6e0] shadow-[0_2px_4px_rgba(0,0,0,0.5)] border border-[#dfbe7e]/80'
                      : 'text-[#d4b483] hover:text-white hover:bg-white/10'
                  }`}
                  title="Inventario, Armas y Oro"
                >
                  🎒 Equipo
                </button>
              </div>

              {/* TAB CONTENT 1: COMBAT & STATS & NUMERIC SAVING THROWS & ATTACKS */}
              {liveSheetTab === 'combat' && (
                <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                  {/* Vital Combat Metrics Grid: CA Shield, Init Crest, Perception Crest, Prof Bonus */}
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    {/* CA Forged Shield */}
                    <div className="flex flex-col items-center justify-center p-1.5 bg-[#fbf6ed]/90 rounded-xl border border-[#c4a982] shadow-xs">
                      <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Armadura</span>
                      <div className="relative w-9 h-10 shrink-0 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                        <img
                          src="/assets/ui/badge_shield_ac.png"
                          alt="CA"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                        <span className="relative z-10 font-mono font-bold text-xs text-[#fff6e0] -mt-0.5 leading-none drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]">
                          {calculatedAc}
                        </span>
                      </div>
                      <span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">CA {calculatedAc}</span>
                    </div>

                    {/* Init Crest */}
                    <div className="flex flex-col items-center justify-center p-1.5 bg-[#fbf6ed]/90 rounded-xl border border-[#c4a982] shadow-xs">
                      <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Iniciativa</span>
                      <div className="relative w-9 h-9 shrink-0 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                        <img
                          src="/assets/ui/coin_stat_medallion.png"
                          alt="Iniciativa"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                        <span className="relative z-10 font-mono font-bold text-xs text-[#fff6e0] leading-none drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]">
                          {calculatedInitiative >= 0 ? `+${calculatedInitiative}` : calculatedInitiative}
                        </span>
                      </div>
                      <span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">
                        {calculatedInitiative >= 0 ? `+${calculatedInitiative}` : calculatedInitiative}
                      </span>
                    </div>

                    {/* Passive Perception Crest */}
                    <div className="flex flex-col items-center justify-center p-1.5 bg-[#fbf6ed]/90 rounded-xl border border-[#c4a982] shadow-xs" title="Percepción Pasiva">
                      <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Percep.</span>
                      <div className="relative w-9 h-9 shrink-0 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                        <img
                          src="/assets/ui/coin_stat_medallion.png"
                          alt="Percepción Pasiva"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                        <Eye className="relative z-10 w-3.5 h-3.5 text-[#f0c869] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]" />
                      </div>
                      <span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">
                        {calculatedPassivePerception}
                      </span>
                    </div>

                    {/* Proficiency Bonus Crest */}
                    <div className="flex flex-col items-center justify-center p-1.5 bg-[#fbf6ed]/90 rounded-xl border border-[#c4a982] shadow-xs">
                      <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Comp.</span>
                      <div className="relative w-9 h-9 shrink-0 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                        <img
                          src="/assets/ui/coin_stat_medallion.png"
                          alt="Competencia"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                        <span className="relative z-10 font-mono font-bold text-xs text-[#fff6e0] leading-none drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]">
                          +{profBonus}
                        </span>
                      </div>
                      <span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">+{profBonus} Bono</span>
                    </div>
                  </div>

                  {/* Alchemical Glass HP Vial */}
                  <div className="bg-[#fbf6ed]/95 rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-fantasy font-bold text-[#4a361c]">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-600 fill-red-500" />
                        <span>PUNTOS DE GOLPE (PG MÁX)</span>
                      </span>
                      <span className="font-mono text-sm text-[#2e7d32] font-bold">
                        {activeClass ? `${calculatedMaxHp} / ${calculatedMaxHp} PG` : '0 PG'}
                      </span>
                    </div>

                    <div className="relative w-full flex items-center select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                      <img
                        src="/assets/ui/hp_vial_cap_left.png"
                        alt=""
                        draggable={false}
                        className="h-6 w-auto object-contain shrink-0 z-20 pointer-events-none select-none -mr-2"
                      />
                      <div className="relative flex-1 h-[15px] bg-[#140a09] rounded-xs overflow-hidden border-y border-[#5c4028]/90 shadow-[inset_0_2px_5px_rgba(0,0,0,0.95)]">
                        <div
                          className="h-full transition-all duration-500 ease-out relative w-full"
                          style={{
                            background: 'linear-gradient(180deg, #ff5a60 0%, #b81422 45%, #5e0810 100%)',
                            boxShadow: '0 0 10px rgba(220,38,38,0.6), inset 0 1px 2px rgba(255,220,220,0.6)',
                          }}
                        />
                        <img
                          src="/assets/ui/hp_vial_glass_center.png"
                          alt=""
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 opacity-90 mix-blend-screen"
                        />
                        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.35),inset_0_-2.5px_4px_rgba(0,0,0,0.75)]" />
                      </div>
                      <img
                        src="/assets/ui/hp_vial_cap_right.png"
                        alt=""
                        draggable={false}
                        className="h-6 w-auto object-contain shrink-0 z-20 pointer-events-none select-none -ml-2"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#7a5538] font-mono">
                      <span>Dado de Golpe: 1d{activeClass ? activeClass.hitDie : 8}</span>
                      <span>Mod CON: {getModStr(finalStats.con)}</span>
                    </div>
                  </div>

                  {/* 6 Ability Scores with Medallions in 3x2 Grid */}
                  <div className="bg-[#fbf6ed]/95 rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#7a6448] uppercase font-mono border-b border-[#e2d5c2] pb-1 font-bold">
                      <span className="font-fantasy tracking-wider">Atributos & Modificadores</span>
                      <span className="text-[9px]">Base + Bonos</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => {
                        const isAssigned = assignedStats[st] !== undefined;
                        const base = isAssigned ? assignedStats[st]! : '--';
                        const race = racialBonuses[st];
                        const asi = asiStatBonuses[st] || 0;
                        const total = isAssigned ? finalStats[st] : '--';
                        const mod = isAssigned ? getModStr(finalStats[st]) : '--';

                        return (
                          <div
                            key={st}
                            className="bg-[#f5ede0]/90 rounded-lg p-1.5 border border-[#cbb99f] flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#8c672b] transition"
                            title={`${ABILITY_SCORE_EXPLANATIONS[st].name}: Base ${base}${race > 0 ? ` +${race} Raza` : ''}${asi > 0 ? ` +${asi} Dote` : ''} = Total ${total} (${mod})`}
                          >
                            <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider">
                              {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}
                            </span>
                            <div className="relative w-11 h-11 my-0.5 flex items-center justify-center">
                              <img
                                src="/assets/ui/coin_stat_medallion.png"
                                alt=""
                                draggable={false}
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                              />
                              <span className="relative z-10 font-mono font-bold text-sm text-[#fff6e0] leading-none drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)]">
                                {mod}
                              </span>
                            </div>
                            <div className="px-1.5 py-0.2 rounded bg-[#261a10] border border-[#b88c32] text-[8.5px] font-mono font-bold text-[#f3dfb1] shadow-2xs">
                              <span>{total}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calculated Saving Throws with Numeric Bonuses */}
                  <div className="bg-[#fbf6ed]/95 rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-[#8c672b]" /> Tiradas de Salvación
                      </span>
                      <span className="text-[9px] text-[#7a6448] font-mono">★ = Competente</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {savingThrowDetails.map((save) => (
                        <div
                          key={`side-save-${save.stat}`}
                          className={`p-1 rounded-lg border flex items-center justify-between text-[11px] ${
                            save.isProficient
                              ? 'bg-[#fef3c7] border-[#f59e0b] font-bold text-[#92400e]'
                              : 'bg-[#f5ede0] border-[#d6c4aa] text-[#4a361c]'
                          }`}
                          title={`${save.statName}: ${save.isProficient ? 'Competente (+prof)' : 'Normal'}`}
                        >
                          <span className="font-fantasy flex items-center gap-0.5">
                            {save.isProficient && <span className="text-[10px] text-amber-600">★</span>}
                            {save.abbreviation}
                          </span>
                          <span className="font-mono font-bold">{save.bonusStr}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weapons & Attacks Ready with Badges */}
                  <div className="bg-[#fbf6ed]/95 rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      <span className="flex items-center gap-1">
                        <Sword className="w-3.5 h-3.5 text-[#8c672b]" /> Armas & Ataques
                      </span>
                      <span className="text-[9px] text-[#7a6448] font-mono">{equippedAttacks.length}</span>
                    </div>
                    <div className="space-y-1">
                      {equippedAttacks.length === 0 ? (
                        <p className="text-[10px] text-[#7a6448] italic py-1 text-center">Sin armas equipadas</p>
                      ) : (
                        equippedAttacks.map((att, i) => {
                          const lower = att.name.toLowerCase();
                          const badge = lower.includes('hacha') || lower.includes('axe')
                            ? '/assets/ui/badge_weapon_axe.png'
                            : lower.includes('arco') || lower.includes('ballesta') || lower.includes('bow') || lower.includes('crossbow') || lower.includes('honda')
                            ? '/assets/ui/badge_weapon_bow.png'
                            : lower.includes('lanza') || lower.includes('spear') || lower.includes('pica') || lower.includes('alabarda') || lower.includes('tridente')
                            ? '/assets/ui/badge_weapon_spear.png'
                            : lower.includes('maza') || lower.includes('martillo') || lower.includes('mace') || lower.includes('hammer') || lower.includes('porra')
                            ? '/assets/ui/badge_weapon_mace.png'
                            : lower.includes('desarmado') || lower.includes('puño')
                            ? '/assets/ui/badge_weapon_unarmed.png'
                            : '/assets/ui/badge_weapon_sword.png';

                          return (
                            <div
                              key={`side-att-${i}`}
                              className="p-1.5 bg-[#f5ede0] rounded-lg border border-[#d6c4aa] flex items-center justify-between text-xs shadow-2xs gap-1.5"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <img
                                  src={badge}
                                  alt=""
                                  draggable={false}
                                  className="w-5 h-5 object-contain shrink-0 drop-shadow-xs"
                                />
                                <span className="font-bold text-[#4a361c] truncate">{att.name}</span>
                              </div>
                              <span className="font-mono text-[#8c672b] font-bold text-[11px] shrink-0">
                                {att.bonus} • {att.damage} ({att.type})
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: SKILLS LIST WITH CALCULATED BONUSES */}
              {liveSheetTab === 'skills' && (
                <div className="space-y-2 flex-1 overflow-y-auto pr-0.5">
                  <div className="flex items-center justify-between bg-[#fbf6ed] p-2 rounded-lg border border-[#c4a982]">
                    <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      Habilidades 5e
                    </span>
                    <div className="flex items-center gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setLiveSkillFilter('all')}
                        className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                          liveSkillFilter === 'all'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                        }`}
                      >
                        Todas (18)
                      </button>
                      <button
                        type="button"
                        onClick={() => setLiveSkillFilter('proficient')}
                        className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                          liveSkillFilter === 'proficient'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                        }`}
                      >
                        Competentes ({totalSkills.length})
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {skillDetails
                      .filter((sk) => (liveSkillFilter === 'proficient' ? sk.isProficient : true))
                      .map((sk) => (
                        <SkillTooltip key={`side-sk-${sk.name}`} skillName={sk.name}>
                          <div
                            className={`p-1.5 rounded-lg border flex items-center justify-between text-xs w-full ${
                              sk.isExpertise
                                ? 'bg-[#fef3c7] border-[#f59e0b] font-bold'
                                : sk.isProficient
                                ? 'bg-[#ede1ce] border-[#cbb99f]'
                                : 'bg-[#fcf9f2] border-[#d6c4aa] opacity-80'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-[#8c672b] font-bold shrink-0">
                                {sk.isExpertise ? '⭐' : sk.isProficient ? '✓' : '○'}
                              </span>
                              <div className="min-w-0">
                                <span className="text-[#4a361c] font-bold truncate block">
                                  {sk.name}{' '}
                                  <span className="text-[9px] text-[#7a6448] font-mono font-normal">
                                    ({ABILITY_SCORE_EXPLANATIONS[sk.ability].abbreviation})
                                  </span>
                                </span>
                                <span className="text-[8px] text-[#7a6448] block">
                                  {sk.isExpertise
                                    ? '[Pericia x2]'
                                    : sk.isProficient
                                    ? `[${sk.origin}]`
                                    : 'Base'}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`font-mono text-xs px-1.5 py-0.2 rounded font-bold shrink-0 ${
                                sk.isExpertise
                                  ? 'bg-[#92400e] text-white'
                                  : sk.isProficient
                                  ? 'bg-[#8c672b] text-white'
                                  : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                              }`}
                            >
                              {sk.bonusStr}
                            </span>
                          </div>
                        </SkillTooltip>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB CONTENT 3: TRAITS & FEATS & BACKGROUND FEATURE */}
              {liveSheetTab === 'traits' && (
                <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
                  {/* Roleplay & Personality Summary */}
                  {(personalityTraits.trim() || ideals.trim() || bonds.trim() || flaws.trim()) && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-2xs">
                      <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#8c672b]" /> Rol & Personalidad
                      </span>
                      {personalityTraits.trim() && (
                        <div className="text-[10px] text-[#5c4a35]">
                          <strong className="text-[#8c672b]">Virtudes/Rasgos:</strong> {personalityTraits}
                        </div>
                      )}
                      {ideals.trim() && (
                        <div className="text-[10px] text-[#5c4a35]">
                          <strong className="text-[#8c672b]">Ideales:</strong> {ideals}
                        </div>
                      )}
                      {bonds.trim() && (
                        <div className="text-[10px] text-[#5c4a35]">
                          <strong className="text-[#8c672b]">Vínculos:</strong> {bonds}
                        </div>
                      )}
                      {flaws.trim() && (
                        <div className="text-[10px] text-[#5c4a35]">
                          <strong className="text-[#8c672b]">Defectos:</strong> {flaws}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Background Feature */}
                  {activeBackground && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1 shadow-2xs">
                      <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> Rasgo de Trasfondo: {activeBackground.featureName}
                      </span>
                      <p className="text-[11px] text-[#5c4a35] leading-relaxed">
                        {activeBackground.featureDescription}
                      </p>
                    </div>
                  )}

                  {/* Chosen Feats */}
                  {chosenFeatsList.length > 0 && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-2xs">
                      <span className="text-[10px] font-fantasy font-bold text-[#b45309] uppercase flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#8c672b]" /> Dotes Oficiales ({chosenFeatsList.length})
                      </span>
                      <div className="space-y-1">
                        {chosenFeatsList.map(({ feat, choice }, fIdx) => {
                          const subChoiceNames = (choice.featSubChoices || [])
                            .map((id) => feat.subChoice?.options.find((o) => o.id === id)?.name || id)
                            .join(', ');
                          return (
                            <div key={fIdx} className="p-1.5 bg-[#fdf2e9] rounded-lg border border-[#fbd38d] text-xs">
                              <span className="font-fantasy font-bold text-[#78350f] block">
                                ★ {feat.name}
                              </span>
                              {subChoiceNames && (
                                <span className="text-[10px] text-[#b45309] font-bold block">
                                  Elección: {subChoiceNames}
                                </span>
                              )}
                              <p className="text-[10px] text-[#78350f] line-clamp-2">
                                {feat.benefits.join(' ')}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Racial Traits */}
                  {activeRace && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1 shadow-2xs">
                      <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#8c672b]" /> Rasgos Raciales ({activeRace.name})
                      </span>
                      <div className="space-y-1">
                        {activeRace.darkvision > 0 && (
                          <div className="text-[10px] text-[#5c4a35]">
                            <strong>Visión en la Oscuridad:</strong> {activeRace.darkvision} pies
                          </div>
                        )}
                        {activeRace.traits?.slice(0, 3).map((t, idx) => (
                          <div key={idx} className="text-[10px] text-[#5c4a35]">
                            <strong>{t.name}:</strong> {t.desc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Class Features */}
                  {activeClass && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1 shadow-2xs">
                      <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-[#8c672b]" /> Rasgos de {activeClass.name}
                      </span>
                      <div className="space-y-1">
                        {combinedProgression
                          .filter((f) => f.level <= characterLevel)
                          .map((f, idx) => (
                            <div key={idx} className="text-[10px] text-[#5c4a35]">
                              <strong>{f.name} (Nv{f.level}):</strong> {f.desc}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT 4: SPELLS & SPELL SLOTS */}
              {liveSheetTab === 'spells' && (isCaster || selectedSpells.length > 0) && (
                <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
                  {/* Spell Stats Ribbon */}
                  <div className="grid grid-cols-3 gap-1 text-center bg-[#fbf6ed] p-2 rounded-xl border border-[#c4a982]">
                    <div className="p-1 bg-[#ede1ce] rounded">
                      <span className="text-[8px] text-[#7a6448] uppercase block">Caract.</span>
                      <span className="font-fantasy font-bold text-xs text-[#4a361c]">
                        {spellcastingDetails?.abilityName ? spellcastingDetails.abilityName.slice(0, 3).toUpperCase() : 'INT'} ({(spellcastingDetails?.abilityMod ?? 0) >= 0 ? `+${spellcastingDetails?.abilityMod ?? 0}` : (spellcastingDetails?.abilityMod ?? 0)})
                      </span>
                    </div>
                    <div className="p-1 bg-[#ede1ce] rounded">
                      <span className="text-[8px] text-[#7a6448] uppercase block">CD Salvación</span>
                      <span className="font-fantasy font-bold text-xs text-[#8c672b]">
                        CD {spellcastingDetails?.saveDc}
                      </span>
                    </div>
                    <div className="p-1 bg-[#ede1ce] rounded">
                      <span className="text-[8px] text-[#7a6448] uppercase block">Ataque Conj.</span>
                      <span className="font-fantasy font-bold text-xs text-[#1d4ed8]">
                        {spellcastingDetails?.attackStr}
                      </span>
                    </div>
                  </div>

                  {/* Spell Slots */}
                  {spellcastingDetails?.slots && Object.keys(spellcastingDetails.slots).length > 0 && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2 border border-[#c4a982] space-y-1">
                      <span className="text-[9px] font-fantasy font-bold text-[#4a361c] uppercase block">
                        Ranuras Disponibles
                      </span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {Object.entries(spellcastingDetails.slots).map(([lvlKey, count]) => (
                          <span
                            key={lvlKey}
                            className="px-1.5 py-0.5 rounded bg-[#2c221a] text-[#d4ab59] font-mono text-[10px] font-bold border border-[#8c672b]/50"
                          >
                            {lvlKey.replace('lvl', 'Nv')}: {count}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chosen Spells List */}
                  <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      <span>Grimorio Seleccionado</span>
                      <span className="font-mono text-[#8c672b] font-bold">{selectedSpells.length}</span>
                    </div>
                    <div className="space-y-1">
                      {selectedSpells.length === 0 ? (
                        <p className="text-[10px] text-[#7a6448] italic">Ningún conjuro seleccionado aún.</p>
                      ) : (
                        selectedSpells.map((spl) => (
                          <div
                            key={`side-spl-${spl.name}`}
                            className="p-1.5 bg-[#ede1ce] rounded border border-[#d6c4aa] flex items-center justify-between text-xs"
                          >
                            <span className="font-bold text-[#4a361c] truncate">{spl.name}</span>
                            <span className="font-mono text-[9px] text-[#8c672b] shrink-0 font-bold">
                              {spl.level === 0 ? 'Truco' : `Nv ${spl.level}`}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 5: INVENTORY & WEALTH */}
              {liveSheetTab === 'inventory' && (
                <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5">
                  {/* Wealth Ribbon */}
                  <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-[#8c672b]" />
                      <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">Oro Inicial</span>
                    </div>
                    <span className="font-mono text-base font-bold text-[#b45309]">
                      {startingGoldTotal} po
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                      <Backpack className="w-3.5 h-3.5 text-[#8c672b]" /> Equipo Inicial & Posesiones
                    </span>
                    <div className="space-y-1">
                      {chosenEquipmentList.length === 0 ? (
                        <p className="text-[10px] text-[#7a6448] italic">Sin equipo seleccionado aún.</p>
                      ) : (
                        chosenEquipmentList.map((item, idx) => {
                          const isEquipped = isItemEquipped(item);
                          return (
                            <div
                              key={`side-eq-${idx}`}
                              className={`p-1.5 rounded border text-[11px] font-medium flex items-center justify-between gap-1.5 ${
                                isEquipped
                                  ? 'bg-[#ede1ce] border-[#8c672b] text-[#4a361c]'
                                  : 'bg-[#faf7f0] border-[#d6c4aa] text-[#7a6448] opacity-75'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <EquipmentBadge name={item} size="sm" className="w-4.5 h-4.5 min-w-[18px]" />
                                <span className="truncate">{item}</span>
                              </div>
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ${
                                  isEquipped
                                    ? 'bg-[#2e7d32] text-white shadow-2xs'
                                    : 'bg-[#e2d2bc] text-[#5e4b37]'
                                }`}
                              >
                                {isEquipped ? 'Equipado' : 'Mochila'}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Tools & Languages */}
                  {activeBackground && (
                    <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1 text-xs">
                      <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase block">
                        Herramientas & Idiomas
                      </span>
                      <p className="text-[11px] text-[#5c4a35]">
                        <strong>Herramientas:</strong>{' '}
                        {backgroundTools && backgroundTools.length > 0 ? backgroundTools.join(', ') : 'Ninguna'}
                      </p>
                      <p className="text-[11px] text-[#5c4a35]">
                        <strong>Idiomas extras:</strong> {activeBackground.languageNote ? `${activeBackground.languagesCount || 0} (${activeBackground.languageNote})` : (activeBackground.languagesCount || 0)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sleek Bottom Bar with Live Sync Indicator */}
            <div className="h-6 w-full shrink-0 flex items-center justify-between px-3 bg-[#f5ede0]/95 border-t border-[#d6c4aa] text-[9px] text-[#7a6448] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sincronizado en Vivo</span>
              </span>
              <span className="truncate max-w-[150px]">{characterName || 'Héroe'} (Nv {characterLevel})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

      
      {/* ----------------------------------------------------------------- */}
      {/* 1. MAXIMIZED SPELL PICKER MODAL (VENTANA POPUP GRANDE PARA CONJUROS) */}
      {/* ----------------------------------------------------------------- */}
      {isSpellPickerMaximized && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif text-[#2c241b]">
          <div className="relative w-full max-w-7xl h-[94vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee] text-[#2c241b]">
            {/* Leather Top Header */}
            <div className="bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] p-3 px-6 flex items-center justify-between gap-3 shadow-md shrink-0 text-[#f7f2ea]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1c150e] border border-[#c59b27]/80 flex items-center justify-center shadow-inner text-[#d4ab59]">
                  <Sparkles className="w-5 h-5 text-[#c59b27]" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-base text-[#f5ebd7] tracking-wider uppercase">
                    Compendio de Conjuración Ampliado • {activeClass?.name || 'Lanzador'}
                  </h3>
                  <p className="text-[11px] text-[#c5af95]">
                    {spellLimits.explanation} • Organiza y selecciona tus conjuros en pantalla completa
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
                  <span className={`px-2.5 py-1 rounded border font-bold ${
                    selectedCantripsCount > spellLimits.maxCantrips
                      ? 'bg-amber-500 text-black border-amber-300'
                      : 'bg-[#1c150e] text-[#f5ebd7] border-[#8c672b]'
                  }`}>
                    Trucos: {selectedCantripsCount} / {spellLimits.maxCantrips}
                  </span>
                  <span className={`px-2.5 py-1 rounded border font-bold ${
                    selectedLeveledCount > spellLimits.maxPreparedOrKnown
                      ? 'bg-amber-500 text-black border-amber-300'
                      : 'bg-[#1c150e] text-[#f5ebd7] border-[#8c672b]'
                  }`}>
                    Grimorio: {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSpellPickerMaximized(false)}
                  className="px-4 py-2 rounded-xl border border-[#c59b27] bg-[#8c672b] hover:bg-[#6e5020] text-xs font-fantasy font-bold text-white flex items-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  Listo / Minimizar
                </button>
              </div>
            </div>

            {/* Warning strip in maximized modal if limits exceeded */}
            {(selectedCantripsCount > spellLimits.maxCantrips || selectedLeveledCount > spellLimits.maxPreparedOrKnown) && (
              <div className="bg-amber-100 border-b border-amber-300 px-6 py-2 text-xs text-amber-950 flex items-center gap-2 shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Límite de Conjuración 5e superado:</strong> Tienes más trucos o conjuros de los estipulados para tu nivel. Avanza solo si el DM así lo autoriza o lo permite.
                </span>
              </div>
            )}

            {/* Filter Controls Bar */}
            <div className="bg-[#ede1ce] border-b border-[#d6c4aa] p-3 px-6 space-y-2.5 shrink-0">
              {/* Row 1: Search input + Scope pills */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-[#8c672b] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={spellSearchQuery}
                    onChange={(e) => setSpellSearchQuery(e.target.value)}
                    placeholder="Buscar conjuro por nombre, escuela o efecto..."
                    className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                  />
                </div>

                  {/* Scope selector pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#7a6448] font-fantasy font-bold uppercase mr-1">Repertorio:</span>
                    <button
                      type="button"
                      onClick={() => setSpellScopeMode('available')}
                      className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer border ${
                        spellScopeMode === 'available'
                          ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                          : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                      }`}
                      title="Muestra únicamente los conjuros que puedes lanzar con tus ranuras de nivel actual"
                    >
                      ⚡ Disponibles para Elegir ({filteredSpells.availableToChoose.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpellScopeMode('all_class')}
                      className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer border ${
                        spellScopeMode === 'all_class'
                          ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                          : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                      }`}
                      title="Explorar niveles superiores de tu clase (Solo consulta/lectura)"
                    >
                      👁️ Consultar Niveles Superiores ({filteredSpells.higherLevelToBrowse.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpellScopeMode('all_compendium')}
                      className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer border ${
                        spellScopeMode === 'all_compendium'
                          ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                          : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ede1ce]'
                      }`}
                      title="Compendio Completo Oficial con conjuros de todas las clases"
                    >
                      📖 Compendio Completo ({OFFICIAL_SPELLS_COMPENDIUM.length})
                    </button>
                  </div>
              </div>

              {/* Row 2: Tabs + Sort & School */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#dfcfb9]">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-[#dfcfb9] p-1 rounded-lg border border-[#c5b199]">
                  <button
                    type="button"
                    onClick={() => setSpellActiveTab('all')}
                    className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                      spellActiveTab === 'all' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#4a361c] hover:bg-white/50'
                    }`}
                  >
                    Todos ({displayedSpellsData.totalCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpellActiveTab('cantrips')}
                    className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                      spellActiveTab === 'cantrips' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#4a361c] hover:bg-white/50'
                    }`}
                  >
                    Trucos ({displayedSpellsData.cantrips.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpellActiveTab('leveled')}
                    className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                      spellActiveTab === 'leveled' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#4a361c] hover:bg-white/50'
                    }`}
                  >
                    Nivel 1+ ({displayedSpellsData.leveled.length})
                  </button>
                </div>

                {/* Dropdowns */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-white border border-[#d6c4aa] rounded-lg px-2 py-1">
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#8c672b]" />
                    <span className="text-[10px] text-[#7a6448] font-fantasy font-bold">Orden:</span>
                    <select
                      value={spellSortMode}
                      onChange={(e) => setSpellSortMode(e.target.value as any)}
                      className="bg-transparent text-xs text-[#2c241b] focus:outline-none cursor-pointer"
                    >
                      <option value="level">Por Nivel (1 → 9)</option>
                      <option value="name">Alfabético (A → Z)</option>
                      <option value="school">Por Escuela de Magia</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-white border border-[#d6c4aa] rounded-lg px-2 py-1">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c672b]" />
                    <span className="text-[10px] text-[#7a6448] font-fantasy font-bold">Escuela:</span>
                    <select
                      value={spellSchoolFilter}
                      onChange={(e) => setSpellSchoolFilter(e.target.value)}
                      className="bg-transparent text-xs text-[#2c241b] focus:outline-none cursor-pointer"
                    >
                      <option value="all">Todas las Escuelas</option>
                      <option value="Abjuración">Abjuración</option>
                      <option value="Adivinación">Adivinación</option>
                      <option value="Conjuración">Conjuración</option>
                      <option value="Encantamiento">Encantamiento</option>
                      <option value="Evocación">Evocación</option>
                      <option value="Ilusión">Ilusión</option>
                      <option value="Nigromancia">Nigromancia</option>
                      <option value="Transmutación">Transmutación</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Grid Content (Spacious 3 to 4 columns) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fbf7ee]">
              {/* SECTION A: CANTRIPS */}
              {(spellActiveTab === 'all' || spellActiveTab === 'cantrips') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-[#8c672b] pb-2">
                    <h4 className="font-fantasy font-bold text-base text-[#4a361c] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#8c672b]" />
                      TRUCOS DE MAGIA (Nivel 0 / Cantrips) — {displayedSpellsData.cantrips.length} disponibles
                    </h4>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#ebdcc4] text-[#8c672b] border border-[#d6c4aa]">
                      {selectedCantripsCount} / {spellLimits.maxCantrips} Trucos Elegidos
                    </span>
                  </div>

                  {displayedSpellsData.cantrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {displayedSpellsData.cantrips.map((spell) => {
                        const matchedSelected = selectedSpells.find((s) => s.name.toLowerCase() === spell.name.toLowerCase());
                        const isSelected = !!matchedSelected;
                        const effectiveSpell = matchedSelected || spell;
                        return (
                          <SpellCardComponent
                            key={`max-${spell.id}`}
                            spell={effectiveSpell}
                            isSelected={isSelected}
                            onToggle={() => toggleSpellChoice(effectiveSpell)}
                            onInspect={(spl) => setInspectingSpell(spl)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 bg-[#f5ede0] rounded-lg border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      No se encontraron trucos con los filtros actuales.
                    </div>
                  )}
                </div>
              )}

              {/* SECTION B: LEVELED SPELLS (Grouped by level) */}
              {(spellActiveTab === 'all' || spellActiveTab === 'leveled') && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-[#8c672b] pb-2">
                    <h4 className="font-fantasy font-bold text-base text-[#4a361c] flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#8c672b]" />
                      HECHIZOS CON ESPACIO DE CONJURO (Nivel 1 o Superior) — {displayedSpellsData.leveled.length} disponibles
                    </h4>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#ebdcc4] text-[#8c672b] border border-[#d6c4aa]">
                      {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown} en Grimorio / Repertorio
                    </span>
                  </div>

                  {displayedSpellsData.leveledByLevel.map(({ level, spells }) => (
                    <div key={`max-lvl-${level}`} className="space-y-3">
                      <div className="bg-[#ede1ce] px-4 py-2 rounded-xl border border-[#d6c4aa] flex items-center justify-between shadow-xs">
                        <span className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide flex items-center gap-2">
                          <Star className="w-4 h-4 text-[#8c672b]" />
                          Hechizos de Nivel {level} ({spells.length} disponibles)
                        </span>
                        <span className="text-xs font-mono text-[#7a6448]">
                          {spells.filter((sp) => selectedSpells.some((s) => s.name.toLowerCase() === sp.name.toLowerCase())).length} elegidos de este nivel
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {spells.map((spell) => {
                          const matchedSelected = selectedSpells.find((s) => s.name.toLowerCase() === spell.name.toLowerCase());
                          const isSelected = !!matchedSelected;
                          const effectiveSpell = matchedSelected || spell;
                          return (
                            <SpellCardComponent
                              key={`max-${spell.id}`}
                              spell={effectiveSpell}
                              isSelected={isSelected}
                              onToggle={() => toggleSpellChoice(effectiveSpell)}
                              onInspect={(spl) => setInspectingSpell(spl)}
                              isHigherLevel={spell.level > filteredSpells.maxSpellLevel}
                              requiredCasterLevel={getRequiredCasterLevel(spell.level)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 2. MAXIMIZED RACE PICKER MODAL (VENTANA POPUP GRANDE PARA RAZAS) */}
      {/* ----------------------------------------------------------------- */}
      {isRacePickerMaximized && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif text-[#2c241b]">
          <div className="relative w-full max-w-7xl h-[94vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee] text-[#2c241b]">
            <div className="bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] p-3 px-6 flex items-center justify-between gap-3 shadow-md shrink-0 text-[#f7f2ea]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1c150e] border border-[#c59b27]/80 flex items-center justify-center shadow-inner text-[#d4ab59]">
                  <Award className="w-5 h-5 text-[#c59b27]" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-base text-[#f5ebd7] tracking-wider uppercase">
                    Compendio de Razas y Linajes Ancestrales (30+ Razas Oficiales)
                  </h3>
                  <p className="text-[11px] text-[#c5af95]">
                    {activeRace ? `Raza seleccionada: ${activeRace.name}` : 'Selecciona la raza para tu héroe'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsRacePickerMaximized(false)}
                  className="px-4 py-2 rounded-xl border border-[#c59b27] bg-[#8c672b] hover:bg-[#6e5020] text-xs font-fantasy font-bold text-white flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
                >
                  <Check className="w-4 h-4" />
                  Listo / Minimizar
                </button>
              </div>
            </div>

            {/* Category tabs & Search filter bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 px-6 bg-[#f4ecd8] border-b border-[#d6c4aa] shrink-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {(
                  [
                    { id: 'Todos', label: 'Todas las Razas', count: raceCounts.Todos },
                    { id: 'Común', label: 'Comunes (PHB)', count: raceCounts.Común },
                    { id: 'Exótica', label: 'Exóticas', count: raceCounts.Exótica },
                    { id: 'Monstruosa', label: 'Monstruosas', count: raceCounts.Monstruosa },
                    { id: 'Planar', label: 'Planares & Entornos', count: raceCounts.Planar },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRaceCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      raceCategory === tab.id
                        ? 'bg-[#8c672b] text-white shadow-xs'
                        : 'bg-white text-[#5c4a35] border border-[#d6c4aa] hover:border-[#8c672b]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      raceCategory === tab.id ? 'bg-white/20 text-white' : 'bg-[#ebdcc4] text-[#8c672b]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={raceSearchQuery}
                  onChange={(e) => setRaceSearchQuery(e.target.value)}
                  placeholder="Buscar raza o linaje..."
                  className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-[#fbf7ee]">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {WIKIDOT_RACES
                  .filter((race) => {
                    if (raceCategory !== 'Todos' && race.category !== raceCategory) return false;
                    if (!raceSearchQuery.trim()) return true;
                    const q = raceSearchQuery.toLowerCase();
                    return (
                      race.name.toLowerCase().includes(q) ||
                      race.description.toLowerCase().includes(q) ||
                      (race.subraces && race.subraces.some((s) => s.name.toLowerCase().includes(q)))
                    );
                  })
                  .map((race) => {
                    const isSelected = race.id === selectedRaceId;
                    return (
                      <RaceCard
                        key={`max-race-${race.id}`}
                        race={race}
                        isSelected={isSelected}
                        onSelect={() => {
                          setSelectedRaceId(race.id);
                          setSelectedSubraceId('');
                          setFlexibleRacialChoices([]);
                          setBonusRacialSkills([]);
                        }}
                        onInspect={(data) => setInspectingCompendium(data)}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 3. MAXIMIZED FEAT PICKER MODAL (VENTANA POPUP GRANDE PARA DOTES) */}
      {/* ----------------------------------------------------------------- */}
      {isFeatPickerMaximized && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif text-[#2c241b]">
          <div className="relative w-full max-w-7xl h-[94vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee] text-[#2c241b]">
            <div className="bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] p-3 px-6 flex items-center justify-between gap-3 shadow-md shrink-0 text-[#f7f2ea]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1c150e] border border-[#c59b27]/80 flex items-center justify-center shadow-inner text-[#d4ab59]">
                  <Star className="w-5 h-5 text-[#c59b27]" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-base text-[#f5ebd7] tracking-wider uppercase">
                    Compendio de Dotes Oficiales (Feats Oficiales de 5e)
                  </h3>
                  <p className="text-[11px] text-[#c5af95]">
                    Asignando a Slot #{maximizedFeatSlotIdx + 1} • Elige tu dote táctica
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsFeatPickerMaximized(false)}
                  className="px-4 py-2 rounded-xl border border-[#c59b27] bg-[#8c672b] hover:bg-[#6e5020] text-xs font-fantasy font-bold text-white flex items-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  Listo / Minimizar
                </button>
              </div>
            </div>

            {/* Filter bar */}
            <div className="bg-[#ede1ce] border-b border-[#d6c4aa] p-3 px-6 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['Todos', 'Combate', 'Magia', 'Utilidad', 'General'] as const).map((cat) => (
                  <button
                    key={`max-cat-${cat}`}
                    type="button"
                    onClick={() => setFeatCategory(cat)}
                    className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                      featCategory === cat
                        ? 'bg-[#8c672b] text-white shadow-xs'
                        : 'bg-white text-[#5c4a35] border border-[#d6c4aa]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#8c672b] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={featSearch}
                  onChange={(e) => setFeatSearch(e.target.value)}
                  placeholder="Buscar dote por nombre, beneficio o requisito..."
                  className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-[#fbf7ee]">
              {(() => {
                const currentChoice: AsiFeatChoice = asiChoices[maximizedFeatSlotIdx] || {
                  type: 'feat',
                  featId: undefined,
                  featAbilityChoice: undefined,
                  featSubChoices: [],
                };
                const setSlotChoice = (updated: Partial<AsiFeatChoice>) => {
                  setAsiChoices((prev) => {
                    const prevSlot = prev[maximizedFeatSlotIdx] || currentChoice;
                    return {
                      ...prev,
                      [maximizedFeatSlotIdx]: {
                        ...prevSlot,
                        ...updated,
                      },
                    };
                  });
                };

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {OFFICIAL_5E_FEATS
                      .filter((feat) => {
                        if (featCategory !== 'Todos' && feat.category !== featCategory) return false;
                        if (featSearch.trim()) {
                          const q = featSearch.toLowerCase();
                          return (
                            feat.name.toLowerCase().includes(q) ||
                            feat.description.toLowerCase().includes(q) ||
                            feat.benefits.some((b) => b.toLowerCase().includes(q))
                          );
                        }
                        return true;
                      })
                      .map((feat) => {
                        const isFeatSelected = currentChoice.featId === feat.id;
                        const handleSelectFeat = () => {
                          if (isFeatSelected) {
                            setSlotChoice({
                              type: 'feat',
                              featId: undefined,
                              featAbilityChoice: undefined,
                              featSubChoices: [],
                            });
                            return;
                          }
                          setSlotChoice({
                            type: 'feat',
                            featId: feat.id,
                            featAbilityChoice: feat.abilityBonus?.stats?.length === 1 ? feat.abilityBonus.stats[0] : undefined,
                            featSubChoices: [],
                          });
                        };

                        return (
                          <FeatCard
                            key={`max-feat-${feat.id}`}
                            feat={feat}
                            isSelected={isFeatSelected}
                            onSelect={handleSelectFeat}
                            onInspect={(data) => setInspectingCompendium(data)}
                            currentChoice={currentChoice}
                            setSlotChoice={setSlotChoice}
                          />
                        );
                      })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 4. MAXIMIZED BACKGROUND PICKER MODAL (VENTANA POPUP GRANDE PARA TRASFONDOS) */}
      {/* ----------------------------------------------------------------- */}
      {isBackgroundPickerMaximized && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif text-[#2c241b]">
          <div className="relative w-full max-w-7xl h-[94vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee] text-[#2c241b]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] p-3 px-6 flex items-center justify-between gap-3 shadow-md shrink-0 text-[#f7f2ea]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1c150e] border border-[#c59b27]/80 flex items-center justify-center shadow-inner text-[#d4ab59]">
                  <BookOpen className="w-5 h-5 text-[#c59b27]" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-base text-[#f5ebd7] tracking-wider uppercase">
                    Compendio Oficial de Trasfondos ({WIKIDOT_BACKGROUNDS.length} Trasfondos Canónicos)
                  </h3>
                  <p className="text-[11px] text-[#c5af95]">
                    {activeBackground ? `Trasfondo seleccionado: ${activeBackground.name}` : 'Selecciona el trasfondo de tu personaje'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={backgroundSearch}
                    onChange={(e) => setBackgroundSearch(e.target.value)}
                    placeholder="Buscar trasfondo..."
                    className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsBackgroundPickerMaximized(false)}
                  className="px-4 py-2 rounded-xl border border-[#c59b27] bg-[#8c672b] hover:bg-[#6e5020] text-xs font-fantasy font-bold text-white flex items-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  Listo / Minimizar
                </button>
              </div>
            </div>

            {/* Sub-header Filter Toolbar */}
            <div className="bg-[#ede1ce] border-b border-[#d6c4aa] p-3 px-6 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
              {/* Orientation Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[#7a6448] font-fantasy font-bold uppercase mr-1">
                  Enfoque / Rol:
                </span>
                {(['Todos', 'Magia', 'Combate', 'Sigilo', 'Social', 'Exploración'] as const).map((ori) => {
                  const isAct = backgroundOrientationFilter === ori;
                  const count = backgroundOrientationCounts[ori] || 0;
                  const icons: Record<string, string> = {
                    Todos: '🌟',
                    Magia: '🔮',
                    Combate: '⚔️',
                    Sigilo: '🗡️',
                    Social: '💬',
                    Exploración: '🧭',
                  };
                  return (
                    <button
                      key={`max-${ori}`}
                      type="button"
                      onClick={() => setBackgroundOrientationFilter(ori)}
                      className={`px-3 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer border flex items-center gap-1 ${
                        isAct
                          ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                          : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                      }`}
                    >
                      <span>{icons[ori]}</span>
                      <span>{ori}</span>
                      <span className="text-[10px] opacity-80 font-mono font-bold">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Expand / Collapse Actions */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={expandAllBackgroundCategories}
                  className="px-2.5 py-1 rounded bg-white hover:bg-[#fbf7ee] text-[#8c672b] border border-[#d6c4aa] font-bold cursor-pointer transition shadow-2xs"
                >
                  Expandir Todo
                </button>
                <button
                  type="button"
                  onClick={collapseAllBackgroundCategories}
                  className="px-2.5 py-1 rounded bg-white hover:bg-[#fbf7ee] text-[#8c672b] border border-[#d6c4aa] font-bold cursor-pointer transition shadow-2xs"
                >
                  Colapsar Todo
                </button>
              </div>
            </div>

            {/* Scrollable Categories Accordion */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#fbf7ee] space-y-4">
              {groupedBackgrounds.length === 0 ? (
                <div className="p-12 text-center text-sm text-[#7a6448] italic bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                  No se encontraron trasfondos con los filtros actuales.
                </div>
              ) : (
                groupedBackgrounds.map((group) => {
                  const isCollapsed = !!collapsedBackgroundCategories[group.category];
                  const categoryIcons: Record<string, string> = {
                    'Common Backgrounds': '📜',
                    'AL: Curse of Strahd': '🦇',
                    'AL: Mulmaster': '⛏️',
                    'AL: Hillsfar': '🌲',
                    'Setting: Acquisitions inc.': '💼',
                    'Setting: Amonkhet': '☀️',
                    'Setting: Dragonlance': '🐉',
                    'Setting: Innistrad': '🌙',
                    'Setting: Planescape': '🌀',
                    'Setting: Ravnica': '🏛️',
                    'Setting: Strixhaven': '🎓',
                    'Setting: Wildemount': '❄️',
                    'Setting: Spelljammer': '🚀',
                    'Homebrew': '✨',
                  };
                  const catIcon = categoryIcons[group.category] || '📖';

                  return (
                    <div
                      key={`max-group-${group.category}`}
                      className="bg-[#fcf9f2] rounded-xl border-2 border-[#d6c4aa] overflow-hidden shadow-xs"
                    >
                      {/* Collapsible Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleBackgroundCategoryCollapse(group.category)}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-[#ebdcc4] to-[#f5ede0] hover:bg-[#e4d4ba] border-b border-[#d6c4aa] flex items-center justify-between transition cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{catIcon}</span>
                          <span className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                            {group.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#d6c4aa] text-[#4a361c] text-xs font-mono font-bold">
                            {group.backgrounds.length} disponibles
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#7a6448] font-bold">
                          <span>{isCollapsed ? 'Desplegar Sección' : 'Colapsar Sección'}</span>
                          {isCollapsed ? (
                            <ChevronRight className="w-4 h-4 text-[#8c672b]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#8c672b]" />
                          )}
                        </div>
                      </button>

                      {/* Cards Grid */}
                      {!isCollapsed && (
                        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-[#fdfbf6]">
                          {group.backgrounds.map((bg) => {
                            const isSelected = bg.id === selectedBackgroundId;
                            return (
                              <BackgroundCard
                                key={`max-bg-${bg.id}`}
                                bg={bg}
                                isSelected={isSelected}
                                onSelect={() => setSelectedBackgroundId(bg.id)}
                                onInspect={(data) => setInspectingCompendium(data)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inspect Spell Details Modal if opened */}
      {inspectingSpell && (
        <SpellDetailModal
          spell={inspectingSpell}
          onClose={() => setInspectingSpell(null)}
          isKnown={selectedSpells.some((s) => s.name.toLowerCase() === inspectingSpell.name.toLowerCase())}
          onAddSpell={() => {
            toggleSpellChoice(inspectingSpell);
            setInspectingSpell(null);
          }}
          onRemoveSpell={() => {
            toggleSpellChoice(inspectingSpell);
            setInspectingSpell(null);
          }}
        />
      )}

      {/* Inspect Feat Details Modal if opened */}
      {inspectingFeat && (
        <FeatDetailModal
          feat={inspectingFeat}
          onClose={() => setInspectingFeat(null)}
        />
      )}

      {/* Inspect Compendium Element Modal (Feat, Trait, Race, Subrace, Class, etc.) */}
      {inspectingCompendium && (
        <CompendiumInspectModal
          data={inspectingCompendium}
          onClose={() => setInspectingCompendium(null)}
        />
      )}

      {/* Subclass Picker Adaptive Modal Popup */}
      {isSubclassPickerModalOpen && activeClass && (
        <SubclassPickerModal
          isOpen={isSubclassPickerModalOpen}
          onClose={() => setIsSubclassPickerModalOpen(false)}
          activeClass={activeClass}
          selectedSubclassId={selectedSubclassId}
          onSelectSubclass={(scId) => setSelectedSubclassId(scId)}
          characterLevel={characterLevel}
          subclassUnlockLevel={subclassUnlockLevel}
          isSubclassUnlocked={isSubclassUnlocked}
          onInspectCompendium={(data) => setInspectingCompendium(data)}
        />
      )}

      {/* Weapon Picker Modal Popup */}
      {isWeaponPickerOpen && (
        <WeaponPickerModal
          isOpen={isWeaponPickerOpen}
          onClose={() => {
            setIsWeaponPickerOpen(false);
            setActiveWeaponPickerGroup(null);
          }}
          title={activeWeaponPickerGroup?.title || 'Seleccionar Arma de D&D 5e'}
          category={activeWeaponPickerGroup?.category || 'all'}
          selectedWeaponName={
            activeWeaponPickerGroup?.groupId
              ? customWeaponChoices[activeWeaponPickerGroup.groupId]?.name
              : undefined
          }
          onSelectWeapon={(weapon) => {
            if (activeWeaponPickerGroup) {
              if (activeWeaponPickerGroup.groupId.startsWith('custom-extra')) {
                setExtraCustomEquipment((prev) => [...prev, weapon.name]);
                toggleEquipItem(weapon.name);
              } else {
                setCustomWeaponChoices((prev) => ({
                  ...prev,
                  [activeWeaponPickerGroup.groupId]: weapon,
                }));
              }
            }
            setIsWeaponPickerOpen(false);
            setActiveWeaponPickerGroup(null);
          }}
        />
      )}

      {/* Armor Picker Modal Popup */}
      {isArmorPickerOpen && (
        <ArmorPickerModal
          isOpen={isArmorPickerOpen}
          onClose={() => setIsArmorPickerOpen(false)}
          title="Seleccionar Armadura o Escudo de D&D 5e"
          subtitle="Añade una armadura o escudo oficial a tu inventario y equípalo con cálculo de CA en tiempo real."
          onSelectArmor={(armor) => {
            setExtraCustomEquipment((prev) => [...prev, armor.name]);
            toggleEquipItem(armor.name);
            setIsArmorPickerOpen(false);
          }}
        />
      )}

      {/* Confirm Exit Modal Dialog: Save Draft vs Discard vs Cancel */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#fcf9f2] border-4 border-[#8c672b] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-[#2c241b]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#f5ede0] rounded-xl text-[#8c672b] border border-[#d6c4aa]">
                <Save className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-fantasy font-bold text-lg text-[#382b20]">
                  ¿Deseas guardar antes de salir?
                </h3>
                <p className="text-xs text-[#786450]">
                  Tienes selecciones y cambios en este personaje.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5c4a35] leading-relaxed bg-[#f5ede0] p-3 rounded-xl border border-[#ebdcc7]">
              Puedes <strong>guardar tu progreso como borrador</strong> para reanudarlo más tarde exactamente desde este paso (<em>{STEPS.find((s) => s.id === currentStep)?.title}</em>), o salir sin guardar los cambios.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleSaveDraft();
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white font-fantasy font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ring-2 ring-[#ffd56b]/40"
              >
                <Save className="w-4 h-4" /> 💾 Guardar Borrador y Salir
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowExitConfirmModal(false);
                  onClose();
                }}
                className="w-full py-2 px-4 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#8c2e28] font-bold text-xs rounded-xl transition cursor-pointer border border-[#cfbe9f]"
              >
                ❌ Salir sin Guardar Cambios
              </button>

              <button
                type="button"
                onClick={() => setShowExitConfirmModal(false)}
                className="w-full py-1.5 px-4 text-[#6e5c4a] hover:text-[#2c221a] text-xs font-semibold transition cursor-pointer text-center"
              >
                Continuar Editando
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Lightbox / Modal de Ajuste de Avatar y Marco */}
      <AvatarLightboxModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        avatarUrl={avatarUrl}
        initialFrame={avatarFrame}
        initialScale={avatarScale}
        initialOffsetY={avatarOffsetY}
        onSaveFrameSettings={(frameId: AvatarFrameStyle, scale: number, offsetY: number) => {
          setAvatarFrame(frameId);
          setAvatarScale(scale);
          setAvatarOffsetY(offsetY);
        }}
      />
    </div>
  );
};
