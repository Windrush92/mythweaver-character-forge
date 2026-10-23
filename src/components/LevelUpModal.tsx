import React, { useState, useMemo, useEffect } from 'react';
import { Character, AbilityScores, Spell, CharacterSpellSlots, MulticlassEntry, ClassResource } from '../types';
import {
  WIKIDOT_CLASSES,
  FULL_CASTER_SLOTS_TABLE,
  HALF_CASTER_SLOTS_TABLE,
  WARLOCK_PACT_SLOTS_TABLE,
  getMaxSpellLevelForClass,
} from '../data/wikidotData';
import { WIKIDOT_RACES } from '../data/wikidotRacesData';
import { OFFICIAL_SPELLS_COMPENDIUM, isSpellcasterClass, findSpellByNameOrAlias } from '../data/spellsData';
import {
  OFFICIAL_5E_FEATS,
  OfficialFeat,
  FIGHTING_STYLE_OPTIONS,
  ALL_5E_SKILLS,
} from '../data/characterCreatorData';
import {
  METAMAGIC_OPTIONS,
  ELDRITCH_INVOCATIONS,
  PACT_BOON_OPTIONS,
  BATTLE_MASTER_MANEUVERS,
  ELEMENTAL_DISCIPLINES,
  KENSEI_WEAPON_OPTIONS,
  TOTEM_WARRIOR_LEVEL_3_SPIRITS,
  TOTEM_WARRIOR_LEVEL_6_ASPECTS,
  TOTEM_WARRIOR_LEVEL_14_ATTUNEMENTS,
  RUNE_KNIGHT_RUNES,
  ARCANE_ARCHER_SHOTS,
  DRACONIC_ANCESTRY_OPTIONS,
  LAND_CIRCLE_BIOMES,
  RANGER_FAVORED_ENEMIES,
  RANGER_NATURAL_EXPLORER,
  getClassDecisionsForLevel,
  PendingClassDecision,
  getSpellcastingLevelUpRules,
  DecisionOption,
  getArtificerSpecialistSpells,
} from '../data/levelUpDecisionsData';
import { PolyhedralDie } from './PolyhedralDie';
import { FeatDetailModal } from './FeatDetailModal';
import { SpellDetailModal } from './SpellDetailModal';
import { CompendiumInspectModal, CompendiumInspectData } from './CompendiumInspectModal';
import { ThemedNotificationModal, ThemedModalType } from './ThemedNotificationModal';
import {
  calculateCharacterSpeed,
  getProficiencyBonus,
  getExtraAttackInfo,
  getBarbarianMaxRages,
  generateClassResourcesForCharacter,
  recalculateAllCharacterDerivedStats,
  calculateMulticlassSpellSlots,
  formatCharacterClass,
  checkMulticlassPrerequisites,
} from '../data/characterRulesEngine';
import {
  ArrowUp,
  Heart,
  Shield,
  Sparkles,
  Award,
  BookOpen,
  X,
  Check,
  Dices,
  Flame,
  ChevronRight,
  Info,
  Activity,
  Sword,
  Zap,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Layers,
  Plus,
} from 'lucide-react';

interface LevelUpModalProps {
  character: Character;
  onSave: (updated: Character) => void;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  character,
  onSave,
  onClose,
}) => {
  const currentLevel = character.level || 1;
  const newLevel = Math.min(20, currentLevel + 1);

  // Existing Multiclass entries extraction
  const existingMulticlass: MulticlassEntry[] = useMemo(() => {
    if (character.multiclass && character.multiclass.length > 0) {
      return character.multiclass;
    }
    const cleanPrimaryName = character.class.split('/')[0].replace(/\d+/g, '').trim();
    const primaryObj = WIKIDOT_CLASSES.find(
      (c) =>
        c.name.toLowerCase() === cleanPrimaryName.toLowerCase() ||
        c.id === cleanPrimaryName.toLowerCase()
    );
    return [
      {
        className: primaryObj?.name || character.class,
        level: currentLevel,
        subclass: character.subclass,
        hitDie: primaryObj?.hitDie || 8,
        isPrimary: true,
      },
    ];
  }, [character.multiclass, character.class, character.subclass, currentLevel]);

  // Multiclass selection states
  const [selectedClassToLevel, setSelectedClassToLevel] = useState<string>(
    existingMulticlass[0]?.className || character.class
  );
  const [isAddingNewMulticlass, setIsAddingNewMulticlass] = useState<boolean>(false);
  const [newMulticlassClassName, setNewMulticlassClassName] = useState<string>('');

  const activeClassName = isAddingNewMulticlass && newMulticlassClassName
    ? newMulticlassClassName
    : selectedClassToLevel;

  const handleSelectClass = (clsName: string, isNew: boolean = false) => {
    setSelectedClassToLevel(clsName);
    setIsAddingNewMulticlass(isNew);
    if (isNew) {
      setNewMulticlassClassName(clsName);
    } else {
      setNewMulticlassClassName('');
    }
  };

  // Active Class definition lookup
  const classObj = useMemo(() => {
    return (
      WIKIDOT_CLASSES.find(
        (c) =>
          c.name.toLowerCase() === activeClassName.toLowerCase() ||
          c.id === activeClassName.toLowerCase()
      ) || WIKIDOT_CLASSES[0]
    );
  }, [activeClassName]);

  const existingEntry = existingMulticlass.find(
    (m) => m.className.toLowerCase() === activeClassName.toLowerCase()
  );
  const currentClassLevel = existingEntry ? existingEntry.level : 0;
  const newClassLevel = currentClassLevel + 1;

  const classNorm = classObj.name.toLowerCase();
  const hitDieSides = classObj.hitDie || 8;
  const conModifier = Math.floor(((character.stats.con || 10) - 10) / 2);
  const fixedHpGain = Math.max(1, Math.floor(hitDieSides / 2) + 1 + conModifier);

  // HP state
  const [hpMethod, setHpMethod] = useState<'fixed' | 'roll'>('fixed');
  const [rolledDieValue, setRolledDieValue] = useState<number | null>(null);
  const [isRollingDie, setIsRollingDie] = useState(false);
  const [customHpBonus, setCustomHpBonus] = useState<number>(0);

  const hpGained = useMemo(() => {
    const base =
      hpMethod === 'fixed'
        ? fixedHpGain
        : rolledDieValue !== null
        ? Math.max(1, rolledDieValue + conModifier)
        : fixedHpGain;
    return Math.max(1, base + customHpBonus);
  }, [hpMethod, fixedHpGain, rolledDieValue, conModifier, customHpBonus]);

  const newMaxHp = (character.maxHp || 10) + hpGained;
  const newCurrentHp = (character.currentHp || 10) + hpGained;

  // New features for this level
  const newClassFeatures = useMemo(() => {
    return (classObj.featuresByLevel || []).filter((f) => f.level === newClassLevel);
  }, [classObj, newClassLevel]);

  // Subclass selection check
  const needsSubclass =
    !existingEntry?.subclass &&
    newClassLevel >= (classObj.subclassUnlockLevel || 3) &&
    classObj.subclasses.length > 0;
  const [selectedSubclass, setSelectedSubclass] = useState<string>(existingEntry?.subclass || '');
  const subNorm = (selectedSubclass || existingEntry?.subclass || '').toLowerCase();

  // Subclass features at new level if subclass is selected
  const newSubclassFeatures = useMemo(() => {
    const subName = selectedSubclass || existingEntry?.subclass;
    if (!subName) return [];
    const sub = classObj.subclasses.find(
      (s) =>
        s.name.toLowerCase().includes(subName.toLowerCase()) ||
        subName.toLowerCase().includes(s.name.toLowerCase())
    );
    return (sub?.features || []).filter((f) => f.level === newClassLevel);
  }, [classObj, selectedSubclass, existingEntry?.subclass, newClassLevel]);

  // ASI or Feat Check (based on class level)
  const isAsiLevel = useMemo(() => {
    const stdLevels = [4, 8, 12, 16, 19];
    if (stdLevels.includes(newClassLevel)) return true;
    if (classObj.id === 'guerrero' && (newClassLevel === 6 || newClassLevel === 14)) return true;
    if (classObj.id === 'picaro' && newClassLevel === 10) return true;
    return false;
  }, [classObj.id, newClassLevel]);

  const [asiType, setAsiType] = useState<'ability' | 'feat'>('ability');
  const [abilityChoiceMode, setAbilityChoiceMode] = useState<'+2' | '+1+1'>('+2');
  const [singleStatChoice, setSingleStatChoice] = useState<keyof AbilityScores>('str');
  const [dualStatChoice1, setDualStatChoice1] = useState<keyof AbilityScores>('str');
  const [dualStatChoice2, setDualStatChoice2] = useState<keyof AbilityScores>('dex');
  const [selectedFeat, setSelectedFeat] = useState<OfficialFeat | null>(null);
  const [inspectingFeat, setInspectingFeat] = useState<OfficialFeat | null>(null);
  const [featSearchTerm, setFeatSearchTerm] = useState<string>('');
  const [featCategoryFilter, setFeatCategoryFilter] = useState<string>('all');
  const [featHalfStatChoice, setFeatHalfStatChoice] = useState<keyof AbilityScores>('str');
  const [selectedFeatSubChoices, setSelectedFeatSubChoices] = useState<string[]>([]);

  // Filtered feats for level up selection
  const filteredLevelUpFeats = useMemo(() => {
    return OFFICIAL_5E_FEATS.filter((f) => {
      if (featCategoryFilter !== 'all' && f.category !== featCategoryFilter) return false;
      if (!featSearchTerm.trim()) return true;
      const term = featSearchTerm.toLowerCase();
      return (
        f.name.toLowerCase().includes(term) ||
        f.nameEn.toLowerCase().includes(term) ||
        f.description.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        (f.prerequisite && f.prerequisite.toLowerCase().includes(term)) ||
        f.benefits.some((b) => b.toLowerCase().includes(term))
      );
    });
  }, [featCategoryFilter, featSearchTerm]);

  // Inspecting spell state
  const [inspectingSpell, setInspectingSpell] = useState<Spell | null>(null);

  // --------------------------------------------------------------------------
  // SPELLCASTING & LEVEL-UP SPELL RULES
  // --------------------------------------------------------------------------
  const isCaster = useMemo(() => isSpellcasterClass(classObj.name), [classObj.name]);
  const isWizard = classNorm.includes('mago') || classNorm.includes('wizard');

  const spellRules = useMemo(() => {
    return getSpellcastingLevelUpRules(
      classObj.name,
      currentClassLevel,
      newClassLevel,
      selectedSubclass || existingEntry?.subclass
    );
  }, [classObj.name, currentClassLevel, newClassLevel, selectedSubclass, existingEntry?.subclass]);

  const [selectedNewSpells, setSelectedNewSpells] = useState<Spell[]>([]);
  const [selectedNewCantrips, setSelectedNewCantrips] = useState<Spell[]>([]);
  const [spellSearchTerm, setSpellSearchTerm] = useState('');
  const [spellLevelFilter, setSpellLevelFilter] = useState<'all' | number>('all');
  const [spellSchoolFilter, setSpellSchoolFilter] = useState<string>('all');

  // Spell swap for known casters
  const [spellToSwapOut, setSpellToSwapOut] = useState<string>('');
  const [spellToSwapIn, setSpellToSwapIn] = useState<Spell | null>(null);

  // Cantrip Formulas (Wizard Level 3+)
  const unlocksCantripFormulas = isWizard && newClassLevel >= 3;
  const [enableCantripFormulas, setEnableCantripFormulas] = useState<boolean>(true);
  const [cantripToReplace, setCantripToReplace] = useState<string>('');
  const [replacementCantrip, setReplacementCantrip] = useState<Spell | null>(null);

  // --------------------------------------------------------------------------
  // CLASS-SPECIFIC LEVEL-UP DECISIONS
  // --------------------------------------------------------------------------
  // 1. Metamagic (Hechicero lv 3, 10, 17)
  const needsMetamagic =
    (classNorm.includes('hechicero') || classNorm.includes('sorcerer')) &&
    (newClassLevel === 3 || newClassLevel === 10 || newClassLevel === 17);
  const metamagicCountNeeded = newClassLevel === 3 ? 2 : 1;
  const [selectedMetamagic, setSelectedMetamagic] = useState<string[]>([]);

  // 2. Eldritch Invocations (Brujo lv 2, 5, 7, 9, 12, 15, 18)
  const needsInvocations =
    (classNorm.includes('brujo') || classNorm.includes('warlock')) &&
    (newClassLevel === 2 ||
      newClassLevel === 5 ||
      newClassLevel === 7 ||
      newClassLevel === 9 ||
      newClassLevel === 12 ||
      newClassLevel === 15 ||
      newClassLevel === 18);
  const invocationsCountNeeded = newClassLevel === 2 ? 2 : 1;
  const [selectedInvocations, setSelectedInvocations] = useState<string[]>([]);

  // 3. Pact Boon (Brujo lv 3)
  const needsPactBoon =
    (classNorm.includes('brujo') || classNorm.includes('warlock')) && newClassLevel === 3;
  const [selectedPactBoon, setSelectedPactBoon] = useState<string>('');


  // 5. Expertise (Bardo lv 3 & 10, Pícaro lv 6)
  const needsExpertise =
    ((classNorm.includes('bardo') || classNorm.includes('bard')) &&
      (newClassLevel === 3 || newClassLevel === 10)) ||
    ((classNorm.includes('picaro') || classNorm.includes('pícaro') || classNorm.includes('rogue')) &&
      newClassLevel === 6);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  // 6. Battle Master Maneuvers (Guerrero Maestro de la Batalla lv 3, 7, 10, 15)
  const isBattleMaster =
    subNorm.includes('maestro de la batalla') ||
    subNorm.includes('battle master') ||
    subNorm.includes('battlemaster');
  const needsManeuvers =
    isBattleMaster &&
    (newClassLevel === 3 || newClassLevel === 7 || newClassLevel === 10 || newClassLevel === 15);
  const maneuversCountNeeded = newClassLevel === 3 ? 3 : 2;
  const [selectedManeuvers, setSelectedManeuvers] = useState<string[]>([]);

  const [activeClassDecisions, setActiveClassDecisions] = useState<Record<string, string[]>>({});
  const [swappedDecisions, setSwappedDecisions] = useState<Record<string, { out: string; in: string }>>({});
  const [decisionFilterTerms, setDecisionFilterTerms] = useState<Record<string, string>>({});
  const [inspectingCompendium, setInspectingCompendium] = useState<CompendiumInspectData | null>(null);
  
  // Sync state when active class changes (multiclass)
  useEffect(() => {
    const entry = existingMulticlass.find((m) => m.className.toLowerCase() === activeClassName.toLowerCase());
    setSelectedSubclass(entry?.subclass || '');
    setSelectedNewSpells([]);
    setSelectedNewCantrips([]);
    setSpellToSwapOut('');
    setSpellToSwapIn(null);
    setSelectedMetamagic([]);
    setSelectedInvocations([]);
    setSelectedPactBoon('');
    setSelectedExpertise([]);
    setSelectedManeuvers([]);
    setActiveClassDecisions({});
  }, [activeClassName]);

  // 7. Systematic Pending Class & Subclass Decisions (Four Elements, Totems, Runes, Kensei, Infusions, Magical Secrets, etc.)
  const pendingClassDecisions = useMemo(() => {
    const effectiveDecisions = {
      ...(character.classDecisions || {}),
      ...(selectedPactBoon ? { pactBoon: selectedPactBoon } : {}),
      ...activeClassDecisions,
    };
    return getClassDecisionsForLevel(
      classObj.name,
      selectedSubclass || existingEntry?.subclass,
      currentClassLevel,
      newClassLevel,
      effectiveDecisions
    );
  }, [
    classObj.name,
    selectedSubclass,
    existingEntry?.subclass,
    currentClassLevel,
    newClassLevel,
    character.classDecisions,
    selectedPactBoon,
    activeClassDecisions,
  ]);

  const toggleClassDecision = (decisionId: string, optionName: string, maxCount: number) => {
    setActiveClassDecisions((prev) => {
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
          message: `Solo puedes elegir ${maxCount} opción(es) para esta característica en esta subida de nivel.`,
          type: 'warning',
        });
        return prev;
      }
      return { ...prev, [decisionId]: [...current, optionName] };
    });
  };

  // Themed Alert & Warning Modal state
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

  // Projected Multiclass for level up
  const projectedMulticlass = useMemo<MulticlassEntry[]>(() => {
    let list = existingMulticlass.map((entry) => {
      if (entry.className.toLowerCase() === activeClassName.toLowerCase()) {
        return {
          ...entry,
          level: entry.level + 1,
          subclass: selectedSubclass || entry.subclass,
        };
      }
      return entry;
    });
    if (isAddingNewMulticlass && !list.some((m) => m.className.toLowerCase() === activeClassName.toLowerCase())) {
      list.push({
        className: classObj.name,
        level: 1,
        subclass: selectedSubclass || undefined,
        hitDie: classObj.hitDie || 8,
        isPrimary: false,
      });
    }
    return list;
  }, [existingMulticlass, activeClassName, selectedSubclass, isAddingNewMulticlass, classObj]);

  // Compute new spell slots for casters
  const calculatedNewSpellSlots = useMemo<Partial<CharacterSpellSlots>>(() => {
    if (projectedMulticlass.length > 1) {
      return calculateMulticlassSpellSlots(projectedMulticlass).slots;
    }
    if (!isCaster) return character.spellSlots || {};
    const className = activeClassName.toLowerCase();

    const existing = character.spellSlots || {};
    const keys: (keyof CharacterSpellSlots)[] = [
      'lvl1',
      'lvl2',
      'lvl3',
      'lvl4',
      'lvl5',
      'lvl6',
      'lvl7',
      'lvl8',
      'lvl9',
    ];
    const result: Partial<CharacterSpellSlots> = {};

    if (className.includes('brujo') || className.includes('warlock')) {
      const pact = WARLOCK_PACT_SLOTS_TABLE[newClassLevel] || WARLOCK_PACT_SLOTS_TABLE[1];
      keys.forEach((k, idx) => {
        const slotLevel = idx + 1;
        const maxSlots = slotLevel === pact.slotLevel ? pact.count : 0;
        result[k] = {
          max: maxSlots,
          used: Math.min(existing[k]?.used || 0, maxSlots),
        };
      });
      return result;
    }

    let slotDict: Record<string, number> = {};
    if (
      ['mago', 'hechicero', 'clerigo', 'clérigo', 'druida', 'bardo'].some((c) =>
        className.includes(c)
      )
    ) {
      slotDict = FULL_CASTER_SLOTS_TABLE[newClassLevel] || FULL_CASTER_SLOTS_TABLE[1] || {};
    } else if (
      ['paladin', 'paladín', 'explorador', 'ranger'].some((c) => className.includes(c))
    ) {
      slotDict = HALF_CASTER_SLOTS_TABLE[newClassLevel] || HALF_CASTER_SLOTS_TABLE[1] || {};
    }

    keys.forEach((k) => {
      const maxSlots = slotDict[k] || 0;
      const currentUsed = existing[k]?.used || 0;
      result[k] = {
        max: maxSlots,
        used: Math.min(currentUsed, maxSlots),
      };
    });

    return result;
  }, [projectedMulticlass, isCaster, activeClassName, newClassLevel, character.spellSlots]);

  // Max spell level accessible at new level
  const maxSpellLvl = useMemo(() => {
    return getMaxSpellLevelForClass(activeClassName, newClassLevel);
  }, [activeClassName, newClassLevel]);

  // Current cantrips and leveled spells of character
  const currentCharacterCantrips = useMemo(() => {
    return (character.spells || []).filter((s) => s.level === 0);
  }, [character.spells]);

  const currentCharacterLeveledSpells = useMemo(() => {
    return (character.spells || []).filter((s) => s.level > 0 && !s.isRacial);
  }, [character.spells]);

  // Wizard Cantrips for Cantrip Formulas
  const wizardCantrips = useMemo(() => {
    return OFFICIAL_SPELLS_COMPENDIUM.filter((sp) => {
      if (sp.level !== 0) return false;
      return (sp.classes || []).some((c) => {
        const cLower = c.toLowerCase();
        return cLower.includes('mago') || cLower.includes('wizard');
      });
    });
  }, []);

  // Available new spells to learn
  const availableCompendiumSpells = useMemo(() => {
    if (!isCaster) return [];
    const existingSpellNames = new Set(
      (character.spells || []).map((s) => s.name.toLowerCase())
    );

    return OFFICIAL_SPELLS_COMPENDIUM.filter((sp) => {
      if (existingSpellNames.has(sp.name.toLowerCase())) return false;
      if (sp.level === 0) return false;
      if (sp.level > maxSpellLvl) return false;
      if (!sp.classes || sp.classes.length === 0) return true;
      return sp.classes.some((c) => {
        const cLower = c.toLowerCase();
        return classNorm.includes(cLower) || cLower.includes(classNorm);
      });
    });
  }, [isCaster, character.spells, maxSpellLvl, classNorm]);

  // Available new cantrips to learn (e.g. at lv 4 or 10)
  const availableCompendiumCantrips = useMemo(() => {
    if (!isCaster) return [];
    const existingSpellNames = new Set(
      (character.spells || []).map((s) => s.name.toLowerCase())
    );

    return OFFICIAL_SPELLS_COMPENDIUM.filter((sp) => {
      if (existingSpellNames.has(sp.name.toLowerCase())) return false;
      if (sp.level !== 0) return false;
      if (!sp.classes || sp.classes.length === 0) return true;
      return sp.classes.some((c) => {
        const cLower = c.toLowerCase();
        return classNorm.includes(cLower) || cLower.includes(classNorm);
      });
    });
  }, [isCaster, character.spells, classNorm]);

  // Filtered available spells
  const filteredAvailableSpells = useMemo(() => {
    return availableCompendiumSpells.filter((sp) => {
      if (spellLevelFilter !== 'all' && sp.level !== spellLevelFilter) return false;
      if (
        spellSchoolFilter !== 'all' &&
        !sp.school.toLowerCase().includes(spellSchoolFilter.toLowerCase())
      )
        return false;
      if (spellSearchTerm.trim()) {
        const term = spellSearchTerm.toLowerCase();
        return (
          sp.name.toLowerCase().includes(term) ||
          (sp.nameEn && sp.nameEn.toLowerCase().includes(term)) ||
          sp.description.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [availableCompendiumSpells, spellLevelFilter, spellSchoolFilter, spellSearchTerm]);

  // Derived stats comparison preview for new level
  const currentProf = getProficiencyBonus(currentLevel);
  const newProf = getProficiencyBonus(newLevel);
  const profIncreased = newProf > currentProf;

  const currentSpeedRes = useMemo(() => {
    return calculateCharacterSpeed({
      baseSpeed: character.speed,
      characterClass: character.class,
      level: currentLevel,
      equippedItems: character.equippedItems || character.inventory || [],
      notes: character.notes,
      raceName: character.race,
      strength: character.stats.str,
    });
  }, [character, currentLevel]);

  const newSpeedRes = useMemo(() => {
    return calculateCharacterSpeed({
      baseSpeed: character.speed,
      characterClass: character.class,
      level: newLevel,
      equippedItems: character.equippedItems || character.inventory || [],
      notes: character.notes,
      raceName: character.race,
      strength: character.stats.str,
    });
  }, [character, newLevel]);

  const speedIncreased = newSpeedRes.speedFeet !== currentSpeedRes.speedFeet;

  const currentExtraAttack = useMemo(() => {
    return getExtraAttackInfo(character.class, currentLevel, character.subclass);
  }, [character.class, currentLevel, character.subclass]);

  const newExtraAttack = useMemo(() => {
    if (projectedMulticlass.length > 1) {
      let best = { hasExtraAttack: false, attacksCount: 1, label: '' };
      for (const mc of projectedMulticlass) {
        const info = getExtraAttackInfo(mc.className, mc.level, mc.subclass);
        if (info.hasExtraAttack && info.attacksCount > (best.attacksCount || 1)) {
          best = info;
        }
      }
      return best;
    }
    return getExtraAttackInfo(
      activeClassName,
      newClassLevel,
      selectedSubclass || character.subclass
    );
  }, [projectedMulticlass, activeClassName, newClassLevel, selectedSubclass, character.subclass]);
  const unlocksExtraAttack = !currentExtraAttack.hasExtraAttack && newExtraAttack.hasExtraAttack;

  const currentResources = useMemo(() => {
    return generateClassResourcesForCharacter(
      character.class,
      currentLevel,
      character.stats,
      character.classResources,
      character.subclass
    );
  }, [character, currentLevel]);

  const newResources = useMemo(() => {
    if (projectedMulticlass.length > 1) {
      const combinedRes: ClassResource[] = [];
      for (const mc of projectedMulticlass) {
        const mcRes = generateClassResourcesForCharacter(
          mc.className,
          mc.level,
          character.stats,
          character.classResources,
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
      activeClassName,
      newClassLevel,
      character.stats,
      character.classResources,
      selectedSubclass || character.subclass
    );
  }, [projectedMulticlass, activeClassName, newClassLevel, character.stats, character.classResources, selectedSubclass, character.subclass]);

  // Roll die action
  const handleRollHitDie = () => {
    setIsRollingDie(true);
    setTimeout(() => {
      const val = Math.floor(Math.random() * hitDieSides) + 1;
      setRolledDieValue(val);
      setIsRollingDie(false);
    }, 450);
  };

  // Toggle new spell
  const toggleSpellSelection = (spell: Spell) => {
    setSelectedNewSpells((prev) => {
      if (prev.some((s) => s.id === spell.id)) {
        return prev.filter((s) => s.id !== spell.id);
      }
      if (spellRules.newSpellsToLearn > 0 && prev.length >= spellRules.newSpellsToLearn) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Conjuros Alcanzado',
          subtitle: 'Reglas de Subida de Nivel (5e)',
          type: 'warning',
          message: `Las reglas oficiales de D&D 5e para tu clase a este nivel indican ${spellRules.newSpellsToLearn} conjuro(s) nuevo(s). Deselecciona uno si deseas cambiar tu elección.`,
        });
        return prev;
      }
      return [...prev, spell];
    });
  };

  // Toggle new cantrip
  const toggleCantripSelection = (spell: Spell) => {
    setSelectedNewCantrips((prev) => {
      if (prev.some((s) => s.id === spell.id)) {
        return prev.filter((s) => s.id !== spell.id);
      }
      if (spellRules.newCantripsToLearn > 0 && prev.length >= spellRules.newCantripsToLearn) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Trucos Alcanzado',
          subtitle: 'Reglas de Subida de Nivel (5e)',
          type: 'warning',
          message: `Puedes aprender hasta ${spellRules.newCantripsToLearn} truco(s) nuevo(s) a este nivel según tu progresión de clase.`,
        });
        return prev;
      }
      return [...prev, spell];
    });
  };

  // Toggle metamagic
  const toggleMetamagic = (metaName: string) => {
    setSelectedMetamagic((prev) => {
      if (prev.includes(metaName)) {
        return prev.filter((m) => m !== metaName);
      }
      if (prev.length >= metamagicCountNeeded) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Metamagia',
          subtitle: 'Facultad de Hechicero',
          type: 'warning',
          message: `Ya has seleccionado las ${metamagicCountNeeded} opciones de metamagia permitidas para este nivel.`,
        });
        return prev;
      }
      return [...prev, metaName];
    });
  };

  // Toggle invocations
  const toggleInvocation = (invName: string) => {
    setSelectedInvocations((prev) => {
      if (prev.includes(invName)) {
        return prev.filter((i) => i !== invName);
      }
      if (prev.length >= invocationsCountNeeded) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Invocaciones',
          subtitle: 'Invocaciones Sobrenaturales del Brujo',
          type: 'warning',
          message: `Ya has seleccionado las ${invocationsCountNeeded} invocaciones sobrenaturales permitidas para este nivel.`,
        });
        return prev;
      }
      return [...prev, invName];
    });
  };

  // Toggle expertise
  const toggleExpertise = (skillName: string) => {
    setSelectedExpertise((prev) => {
      if (prev.includes(skillName)) {
        return prev.filter((s) => s !== skillName);
      }
      if (prev.length >= 2) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Pericia Alcanzado',
          subtitle: 'Pericia (Expertise)',
          type: 'warning',
          message: 'Solo puedes seleccionar 2 habilidades para Pericia en este nivel.',
        });
        return prev;
      }
      return [...prev, skillName];
    });
  };

  // Toggle maneuvers
  const toggleManeuver = (maneuverName: string) => {
    setSelectedManeuvers((prev) => {
      if (prev.includes(maneuverName)) {
        return prev.filter((m) => m !== maneuverName);
      }
      if (prev.length >= maneuversCountNeeded) {
        setThemedAlert({
          isOpen: true,
          title: 'Límite de Maniobras Alcanzado',
          subtitle: 'Maestro de la Batalla',
          type: 'warning',
          message: `Ya has seleccionado las ${maneuversCountNeeded} maniobras permitidas para este nivel.`,
        });
        return prev;
      }
      return [...prev, maneuverName];
    });
  };

  // Confirm Level Up
  const handleConfirmLevelUp = () => {
    // 1. Updated stats & decisions base
    const updatedStats: AbilityScores = { ...character.stats };
    let addedNotes = character.notes || '';
    const updatedClassDecisions: Record<string, any> = {
      ...(character.classDecisions || {}),
    };

    if (isAsiLevel) {
      if (asiType === 'ability') {
        if (abilityChoiceMode === '+2') {
          updatedStats[singleStatChoice] = Math.min(
            20,
            (updatedStats[singleStatChoice] || 10) + 2
          );
          addedNotes += `\n[Nivel ${newLevel}] Mejora de Características: +2 a ${singleStatChoice.toUpperCase()}.`;
        } else {
          updatedStats[dualStatChoice1] = Math.min(
            20,
            (updatedStats[dualStatChoice1] || 10) + 1
          );
          updatedStats[dualStatChoice2] = Math.min(
            20,
            (updatedStats[dualStatChoice2] || 10) + 1
          );
          addedNotes += `\n[Nivel ${newLevel}] Mejora de Características: +1 a ${dualStatChoice1.toUpperCase()} y +1 a ${dualStatChoice2.toUpperCase()}.`;
        }
      } else if (selectedFeat) {
        let subChoiceStr = '';
        if (selectedFeatSubChoices.length > 0) {
          subChoiceStr = ` [Elección: ${selectedFeatSubChoices.join(', ')}]`;
        }
        if (selectedFeat.abilityBonus) {
          const chosenStat = (selectedFeat.abilityBonus.flexible && selectedFeat.abilityBonus.stats?.includes(featHalfStatChoice as any))
            ? featHalfStatChoice
            : (selectedFeat.abilityBonus.stats?.[0] || 'str');
          updatedStats[chosenStat] = Math.min(20, (updatedStats[chosenStat] || 10) + selectedFeat.abilityBonus.amount);
          addedNotes += `\n[Nivel ${newLevel}] Dote Adquirida: ${selectedFeat.name}${subChoiceStr} (+${selectedFeat.abilityBonus.amount} a ${chosenStat.toUpperCase()}) - ${selectedFeat.description}`;
        } else {
          addedNotes += `\n[Nivel ${newLevel}] Dote Adquirida: ${selectedFeat.name}${subChoiceStr} - ${selectedFeat.description}`;
        }
        if (selectedFeatSubChoices.length > 0) {
          updatedClassDecisions[`featChoice_${selectedFeat.id}`] = selectedFeatSubChoices;
        }
      }
    }

    // 2. Class Decisions to notes & character.classDecisions

    pendingClassDecisions.forEach((dec) => {
      const selected = activeClassDecisions[dec.id] || [];
      if (selected.length > 0) {
        const existing = (updatedClassDecisions[dec.id] as string[]) || [];
        const combined = Array.from(new Set([...existing, ...selected]));
        updatedClassDecisions[dec.id] = combined;
        addedNotes += `\n[Nivel ${newLevel}] ${dec.title}: ${selected.join(', ')}.`;
      }
      const swap = swappedDecisions[dec.id];
      if (swap && swap.out && swap.in) {
        const list = ((updatedClassDecisions[dec.id] as string[]) || []).filter((x) => x !== swap.out);
        list.push(swap.in);
        updatedClassDecisions[dec.id] = list;
        addedNotes += `\n[Nivel ${newLevel}] ${dec.title} (Reemplazo): Cambiado "${swap.out}" por "${swap.in}".`;
      }
    });

    if (needsMetamagic && selectedMetamagic.length > 0 && !activeClassDecisions['metamagic']) {
      addedNotes += `\n[Nivel ${newLevel}] Metamagia: ${selectedMetamagic.join(', ')}.`;
      updatedClassDecisions['metamagic'] = Array.from(new Set([...(updatedClassDecisions['metamagic'] || []), ...selectedMetamagic]));
    }
    if (needsInvocations && selectedInvocations.length > 0 && !activeClassDecisions['invocations']) {
      addedNotes += `\n[Nivel ${newLevel}] Invocaciones Sobrenaturales: ${selectedInvocations.join(', ')}.`;
      updatedClassDecisions['invocations'] = Array.from(new Set([...(updatedClassDecisions['invocations'] || []), ...selectedInvocations]));
    }
    if (needsPactBoon && selectedPactBoon && !activeClassDecisions['pactBoon']) {
      addedNotes += `\n[Nivel ${newLevel}] Don del Pacto: ${selectedPactBoon}.`;
      updatedClassDecisions['pactBoon'] = selectedPactBoon;
    }
    const anyChosenStyle =
      activeClassDecisions['fighterFightingStyle_1']?.[0] ||
      activeClassDecisions['paladinFightingStyle_2']?.[0] ||
      activeClassDecisions['rangerFightingStyle_2']?.[0] ||
      activeClassDecisions['swordsFightingStyle']?.[0] ||
      activeClassDecisions['championSecondFightingStyle']?.[0];
    if (anyChosenStyle) {
      updatedClassDecisions['fightingStyle'] = anyChosenStyle;
    }
    if (needsExpertise && selectedExpertise.length > 0) {
      selectedExpertise.forEach((sk) => {
        addedNotes += `\n[Nivel ${newLevel}] Pericia: ${sk}.`;
      });
      updatedClassDecisions['expertise'] = Array.from(new Set([...(updatedClassDecisions['expertise'] || []), ...selectedExpertise]));
    }
    if (needsManeuvers && selectedManeuvers.length > 0 && !activeClassDecisions['battleMasterManeuvers']) {
      addedNotes += `\n[Nivel ${newLevel}] Maniobras de Combate: ${selectedManeuvers.join(', ')}.`;
      updatedClassDecisions['battleMasterManeuvers'] = Array.from(new Set([...(updatedClassDecisions['battleMasterManeuvers'] || []), ...selectedManeuvers]));
    }

    // 3. Cantrip Formulas & Spell Swaps
    let currentSpells = [...(character.spells || [])];
    if (unlocksCantripFormulas && enableCantripFormulas) {
      if (!addedNotes.includes('Fórmulas de Trucos')) {
        addedNotes += `\n[Nivel 3] Fórmulas de Trucos (Cantrip Formulas - Opcional): Inscritas en el libro de conjuros. Permite reemplazar 1 truco tras cada descanso largo.`;
      }
      if (cantripToReplace && replacementCantrip) {
        currentSpells = currentSpells.filter((s) => s.name !== cantripToReplace);
        currentSpells.push(replacementCantrip);
        addedNotes += `\n[Nivel ${newLevel}] Fórmulas de Trucos: Reemplazado truco "${cantripToReplace}" por "${replacementCantrip.name}".`;
      }
    }

    if (spellToSwapOut && spellToSwapIn) {
      currentSpells = currentSpells.filter((s) => s.name !== spellToSwapOut);
      currentSpells.push(spellToSwapIn);
      addedNotes += `\n[Nivel ${newLevel}] Reemplazo de Conjuro: Cambiado "${spellToSwapOut}" por "${spellToSwapIn.name}".`;
    }

    // 4. Append new learned spells & cantrips (including decisions like Tome, Cleric, Magical Secrets)
    const decisionSpellKeys = [
      'pactTomeCantrips',
      'clericNatureCantrip',
      'clericArcanaCantrips',
      'clericDeathCantrip',
      'clericArcanaMastery_17',
      'druidLandCantrip',
      'bardMagicalSecrets_6',
      'bardMagicalSecrets_10',
      'bardMagicalSecrets_14',
      'bardMagicalSecrets_18',
      'spiritsSpiritSession',
    ];
    decisionSpellKeys.forEach((key) => {
      const chosen = (updatedClassDecisions[key] as string[]) || (activeClassDecisions[key] as string[]) || [];
      chosen.forEach((spellName) => {
        const cleanName = spellName.split('(')[0].trim();
        if (!currentSpells.some((s) => s.name.toLowerCase() === cleanName.toLowerCase())) {
          const found = findSpellByNameOrAlias(cleanName) || findSpellByNameOrAlias(spellName);
          if (found && !selectedNewSpells.some((s) => s.id === found.id) && !selectedNewCantrips.some((s) => s.id === found.id)) {
            currentSpells.push({
              ...found,
              id: `char-spl-decision-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}`,
              prepared: true,
              notes: `Concedido por decisión táctica: ${key}`,
            });
            addedNotes += `\n[Nivel ${newLevel}] Conjuro Aprendido por Especialización: "${found.name}".`;
          }
        }
      });
    });

    let updatedSpells = [
      ...currentSpells,
      ...selectedNewSpells,
      ...selectedNewCantrips,
    ];

    // Check if newLevel unlocks any racial innate spells (Reglas Oficiales 5e)
    const charRaceLower = (character.race || '').toLowerCase();
    const charSubraceLower = (character.subrace || '').toLowerCase();
    const raceObj = WIKIDOT_RACES.find((r) =>
      r.id === charRaceLower ||
      r.name.toLowerCase() === charRaceLower
    );
    const subraceObj = raceObj?.subraces?.find((sr) =>
      sr.id === charSubraceLower ||
      sr.name.toLowerCase() === charSubraceLower
    );
    const innateList = [
      ...(raceObj?.innateSpells || []),
      ...(subraceObj?.innateSpells || []),
    ];
    for (const innate of innateList) {
      if (newLevel >= innate.requiredLevel) {
        const alreadyHas = updatedSpells.some((s) => s.name.toLowerCase() === innate.spellName.toLowerCase());
        if (!alreadyHas) {
          const found = findSpellByNameOrAlias(innate.spellName);
          if (found) {
            updatedSpells.push({
              ...found,
              id: `char-spl-racial-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}-${character.race}`,
              prepared: true,
              isRacial: true,
              racialOrigin: subraceObj?.name || raceObj?.name || character.race,
              racialAbility: character.racialSpellcastingAbility || 'cha',
              notes: innate.notes || `Magia racial de linaje desbloqueada a nivel ${innate.requiredLevel}.`,
            });
            addedNotes += `\n[Nivel ${newLevel}] Magia Racial Desbloqueada: Concedes el conjuro innato "${found.name}" (${innate.traitName || 'Linaje Racial'}).`;
          }
        }
      }
    }

    // 5. Final Subclass & Multiclass Assembly
    const activeSubclassChoice = selectedSubclass || existingEntry?.subclass;

    let updatedMulticlass: MulticlassEntry[] = existingMulticlass.map((entry) => {
      if (entry.className.toLowerCase() === activeClassName.toLowerCase()) {
        return {
          ...entry,
          level: entry.level + 1,
          subclass: activeSubclassChoice || entry.subclass,
        };
      }
      return entry;
    });

    if (isAddingNewMulticlass && !updatedMulticlass.some((m) => m.className.toLowerCase() === activeClassName.toLowerCase())) {
      updatedMulticlass.push({
        className: classObj.name,
        level: 1,
        subclass: activeSubclassChoice || undefined,
        hitDie: classObj.hitDie || 8,
        isPrimary: false,
      });
    }

    const combinedClassName = formatCharacterClass({
      class: character.class,
      multiclass: updatedMulticlass,
    });

    const primaryEntry = updatedMulticlass.find((m) => m.isPrimary) || updatedMulticlass[0];
    const finalSubclass = primaryEntry?.subclass || character.subclass;

    let finalSpellSlots = character.spellSlots;
    if (updatedMulticlass.length > 1) {
      finalSpellSlots = calculateMulticlassSpellSlots(updatedMulticlass).slots;
    } else if (isCaster) {
      finalSpellSlots = calculatedNewSpellSlots;
    }

    // 5.1. Artificer Specialist Spells (Conjuros de Especialista de Artífice)
    const isArtificerChar = activeClassName.toLowerCase().includes('artifice') || activeClassName.toLowerCase().includes('artífice');
    if (isArtificerChar && activeSubclassChoice) {
      const specSpells = getArtificerSpecialistSpells(activeSubclassChoice, newClassLevel);
      specSpells.forEach((splName) => {
        const cleanName = splName.split('(')[0].trim();
        const alreadyHas = updatedSpells.some((s) => s.name.toLowerCase() === cleanName.toLowerCase());
        if (!alreadyHas) {
          const found = findSpellByNameOrAlias(cleanName) || findSpellByNameOrAlias(splName);
          if (found) {
            updatedSpells.push({
              ...found,
              id: `char-spl-artificer-spec-${found.id || found.name.toLowerCase().replace(/\s+/g, '-')}`,
              prepared: true,
              notes: `Conjuro de Especialista (${activeSubclassChoice}). Siempre preparado sin contar en tu límite diario.`,
            });
            addedNotes += `\n[Nivel ${newLevel}] Conjuro de Especialista de Artífice Preparado: "${found.name}".`;
          }
        }
      });
    }

    // 5.2. Capstone de Bárbaro Nivel 20: Campeón Primitivo (Primal Champion)
    const isBarbarianChar = activeClassName.toLowerCase().includes('barbaro') || activeClassName.toLowerCase().includes('bárbaro') || activeClassName.toLowerCase().includes('barbarian');
    let effectiveMaxHp = newMaxHp;
    let effectiveCurrentHp = newCurrentHp;
    if (isBarbarianChar && newClassLevel === 20) {
      const prevConMod = Math.floor(((updatedStats.con || 10) - 10) / 2);
      updatedStats.str = Math.min(24, (updatedStats.str || 10) + 4);
      updatedStats.con = Math.min(24, (updatedStats.con || 10) + 4);
      const newConMod = Math.floor(((updatedStats.con || 10) - 10) / 2);
      const conModDiff = newConMod - prevConMod;
      if (conModDiff > 0) {
        // En 5e los puntos de golpe aumentan retroactivamente por cada nivel (+20 por cada +1 al mod de CON)
        const retroactiveHp = 20 * conModDiff;
        effectiveMaxHp += retroactiveHp;
        effectiveCurrentHp += retroactiveHp;
      }
      addedNotes += `\n[Nivel 20] Campeón Primitivo (Primal Champion): +4 a Fuerza y +4 a Constitución (máximo aumentado a 24). Usos de Furia ilimitados.`;
    }

    // 5.3. Actualizar competencias de habilidad adquiridas por decisiones (Lore, Clérigo, Bárbaro, etc.)
    const updatedSkills = [...(character.skills || [])];
    const skillDecisionKeys = ['loreBonusSkills', 'totemTigerSkills6', 'clericKnowledgeSkills', 'clericNatureSkill', 'clericOrderSkill', 'clericPeaceSkill', 'primalKnowledge_3', 'primalKnowledge_10'];
    skillDecisionKeys.forEach((k) => {
      const chosen = (updatedClassDecisions[k] as string[]) || (activeClassDecisions[k] as string[]) || [];
      chosen.forEach((skName) => {
        const cleanSk = skName.split('(')[0].trim();
        if (!updatedSkills.some((s) => s.toLowerCase() === cleanSk.toLowerCase())) {
          updatedSkills.push(cleanSk);
        }
      });
    });

    // 6. Recalculate derived stats
    const effectiveEquipped = character.equippedItems || character.inventory || [];
    const recalculated = recalculateAllCharacterDerivedStats(
      {
        ...character,
        level: newLevel,
        class: combinedClassName,
        multiclass: updatedMulticlass,
        maxHp: effectiveMaxHp,
        currentHp: effectiveCurrentHp,
        stats: updatedStats,
        skills: updatedSkills,
        subclass: finalSubclass,
        notes: addedNotes.trim(),
        spells: updatedSpells,
      },
      newLevel,
      updatedStats,
      effectiveEquipped
    );

    // 7. Create final character
    const updated: Character = {
      ...character,
      level: newLevel,
      class: combinedClassName,
      multiclass: updatedMulticlass,
      maxHp: effectiveMaxHp,
      currentHp: effectiveCurrentHp,
      stats: updatedStats,
      skills: updatedSkills,
      subclass: finalSubclass,
      spellSlots: finalSpellSlots,
      spells: updatedSpells,
      notes: addedNotes.trim(),
      speed: recalculated.speed,
      ac: recalculated.ac,
      initiativeBonus: recalculated.initiativeBonus,
      passivePerception: recalculated.passivePerception,
      attacks: recalculated.attacks,
      classResources: recalculated.classResources,
      classDecisions: updatedClassDecisions,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fadeIn font-serif text-[#2c241b]">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2c221a] via-[#3d2e20] to-[#2c221a] border-b-2 border-[#b88c32] p-4 px-6 flex items-center justify-between text-[#f7f2ea] shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c59b27] to-[#8c672b] flex items-center justify-center shadow-lg border border-[#ffd56b]/50">
              <ArrowUp className="w-6 h-6 text-[#1c150e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-fantasy text-[#f7f2ea] tracking-wider uppercase">
                  Subir de Nivel Aventurero
                </h2>
                <span className="text-xs bg-[#c59b27] text-[#1c150e] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                  Nv {currentLevel} ➔ Nv {newLevel}
                </span>
              </div>
              <p className="text-xs text-[#baa892] italic">
                {character.name} • {character.race} • {formatCharacterClass({ class: character.class, multiclass: existingMulticlass })}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#baa892] hover:text-[#f7f2ea] hover:bg-[#4a3a2d] rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-[#2c241b]">
          {/* Section 0: Elección de Clase (Monoclase o Multiclase) */}
          <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#b88c32]/50 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#8c672b] border border-[#d6c4aa]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    Clase a Subir de Nivel (Monoclase / Multiclase)
                  </h3>
                  <p className="text-xs text-[#786450]">
                    Reglas Oficiales D&D 5e: continúa en tu clase o desbloquea una nueva clase multiclase.
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#ebdcc7] text-[#523d24] border border-[#d8c8af]">
                Clase Activa: <span className="text-[#8c672b]">{activeClassName}</span> Nv {newClassLevel}
              </span>
            </div>

            {/* List of existing classes */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#5c4a36] uppercase tracking-wider flex items-center justify-between">
                <span>Tus Clases Actuales:</span>
                <span className="text-[11px] text-[#8c672b] font-normal lowercase italic">
                  selecciona cuál sube +1 nivel
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {existingMulticlass.map((mc) => {
                  const isSelected =
                    !isAddingNewMulticlass &&
                    selectedClassToLevel.toLowerCase() === mc.className.toLowerCase();
                  return (
                    <button
                      key={mc.className}
                      type="button"
                      onClick={() => handleSelectClass(mc.className, false)}
                      className={`p-3 rounded-xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm ring-2 ring-[#c59b27]/30'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-fantasy font-bold text-sm text-[#2c221a]">
                            {mc.className}
                          </span>
                          {mc.isPrimary && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8c672b]/20 text-[#694c1a] font-bold">
                              Principal
                            </span>
                          )}
                          {isSelected && <Check className="w-4 h-4 text-[#8c672b]" />}
                        </div>
                        <p className="text-xs text-[#786450] mt-0.5">
                          Nivel actual: <strong>Nv {mc.level}</strong> ➔ Subir a:{' '}
                          <strong className="text-[#8c672b]">Nv {mc.level + 1}</strong>
                          {mc.subclass ? ` (${mc.subclass})` : ''}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#8c672b] font-bold bg-[#fbf7ee] px-2 py-1 rounded border border-[#ebdcc7]">
                        1d{mc.hitDie}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add new Multiclass button or class selector */}
            <div className="pt-2 border-t border-[#ebdcc7]">
              {!isAddingNewMulticlass ? (
                <button
                  type="button"
                  onClick={() => {
                    const firstAvailable = WIKIDOT_CLASSES.find(
                      (c) =>
                        !existingMulticlass.some(
                          (m) =>
                            m.className.toLowerCase() === c.name.toLowerCase() ||
                            m.className.toLowerCase() === c.id.toLowerCase()
                        )
                    );
                    if (firstAvailable) {
                      handleSelectClass(firstAvailable.name, true);
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-[#8c672b] bg-[#faf3e8] hover:bg-[#f5ede0] text-[#705220] hover:text-[#523d24] font-fantasy font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Tomar una Nueva Clase (Multiclase)
                </button>
              ) : (
                <div className="space-y-3 bg-[#f5ede0] p-3.5 rounded-xl border border-[#d8c8af]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-fantasy text-[#382b20] uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" />
                      Selecciona la nueva clase a desbloquear (Nivel 1):
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectClass(existingMulticlass[0]?.className || character.class, false)
                      }
                      className="text-xs text-[#8c672b] hover:underline font-mono cursor-pointer"
                    >
                      Cancelar multiclase
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {WIKIDOT_CLASSES.filter(
                      (c) =>
                        !existingMulticlass.some(
                          (m) =>
                            m.className.toLowerCase() === c.name.toLowerCase() ||
                            m.className.toLowerCase() === c.id.toLowerCase()
                        )
                    ).map((c) => {
                      const isSelected = activeClassName.toLowerCase() === c.name.toLowerCase();
                      const prereq = checkMulticlassPrerequisites(c.name, character.stats);
                      const primaryEntry = existingMulticlass[0];
                      const primaryPrereq = primaryEntry
                        ? checkMulticlassPrerequisites(primaryEntry.className, character.stats)
                        : { className: '', meetsRequirement: true, requiredAbility: '', score: 10 };
                      const allPrereqsMet = prereq.meetsRequirement && primaryPrereq.meetsRequirement;

                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectClass(c.name, true)}
                          className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[#8c672b] bg-[#fbf7ee] ring-2 ring-[#c59b27] shadow-xs'
                              : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                              {c.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#8c672b]">
                              d{c.hitDie}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            {allPrereqsMet ? (
                              <span className="text-[10px] text-[#3e6b48] font-semibold flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" /> {prereq.requiredAbility}
                              </span>
                            ) : (
                              <span
                                className="text-[10px] text-[#9e3b33] font-semibold flex items-center gap-0.5"
                                title={`Prerrequisito: ${prereq.requiredAbility}`}
                              >
                                <AlertCircle className="w-2.5 h-2.5" /> {prereq.requiredAbility}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Multiclass rule info & Prerequisite explanation */}
                  {(() => {
                    const currentPrereq = checkMulticlassPrerequisites(classObj.name, character.stats);
                    const primaryEntry = existingMulticlass[0];
                    const primaryPrereq = primaryEntry
                      ? checkMulticlassPrerequisites(primaryEntry.className, character.stats)
                      : { className: '', meetsRequirement: true, requiredAbility: '', score: 10 };

                    return (
                      <div className="text-xs bg-[#fbf7ee] p-2.5 rounded-lg border border-[#ebdcc7] space-y-1 text-[#5c4a36]">
                        <div className="font-bold text-[#382b20] flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-[#8c672b]" />
                          Requisitos oficiales de multiclase (PHB p. 163):
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                          <li>
                            Nueva clase ({classObj.name}): <strong>{currentPrereq.requiredAbility}</strong> —{' '}
                            {currentPrereq.meetsRequirement ? (
                              <span className="text-[#3e6b48] font-bold">¡Cumplido! ({currentPrereq.score})</span>
                            ) : (
                              <span className="text-[#9e3b33] font-bold">No cumplido ({currentPrereq.score})</span>
                            )}
                          </li>
                          {primaryEntry && (
                            <li>
                              Clase de origen ({primaryEntry.className}): <strong>{primaryPrereq.requiredAbility}</strong> —{' '}
                              {primaryPrereq.meetsRequirement ? (
                                <span className="text-[#3e6b48] font-bold">¡Cumplido! ({primaryPrereq.score})</span>
                              ) : (
                                <span className="text-[#9e3b33] font-bold">No cumplido ({primaryPrereq.score})</span>
                              )}
                            </li>
                          )}
                        </ul>
                        {(!currentPrereq.meetsRequirement || !primaryPrereq.meetsRequirement) && (
                          <p className="text-[11px] text-[#9e3b33] italic pt-1">
                            * Nota: Según las reglas oficiales necesitas 13+ en las características clave. Si tu DM lo permite excepcionalmente en su mesa, puedes continuar.
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Hit Points & Progression Summary */}
          <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#9e3b33] border border-[#d6c4aa]">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    1. Puntos de Golpe & Progresión de Salud
                  </h3>
                  <p className="text-xs text-[#786450]">
                    Dado de Golpe de clase: <strong className="text-[#8c672b]">1d{hitDieSides}</strong> | Modificador de CON: <strong className="text-[#8c672b]">{conModifier >= 0 ? `+${conModifier}` : conModifier}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#786450] block font-mono">PG Máximos</span>
                <span className="text-base font-bold font-fantasy text-[#9e3b33]">
                  {character.maxHp} ➔ {newMaxHp} <span className="text-xs text-[#3e6b48] font-bold font-mono">+{hpGained}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Fixed average */}
              <div
                onClick={() => setHpMethod('fixed')}
                className={`p-3 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${
                  hpMethod === 'fixed'
                    ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm'
                    : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                      Media Fija Oficial (Recomendado)
                    </span>
                    {hpMethod === 'fixed' && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
                  </div>
                  <p className="text-xs text-[#786450] mt-0.5">
                    {Math.floor(hitDieSides / 2) + 1} (media de d{hitDieSides}) + {conModifier} (CON) = <strong>+{fixedHpGain} PG</strong>
                  </p>
                </div>
                <span className="text-sm font-bold font-mono text-[#8c672b]">
                  +{fixedHpGain}
                </span>
              </div>

              {/* Roll die */}
              <div
                onClick={() => setHpMethod('roll')}
                className={`p-3 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${
                  hpMethod === 'roll'
                    ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm'
                    : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                      Tirar Dado de Golpe (1d{hitDieSides})
                    </span>
                    {hpMethod === 'roll' && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
                  </div>
                  <p className="text-xs text-[#786450] mt-0.5">
                    {rolledDieValue !== null
                      ? `Tirada: ${rolledDieValue} + ${conModifier} (CON) = +${Math.max(1, rolledDieValue + conModifier)} PG`
                      : '¡Prueba tu suerte tirando el dado!'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHpMethod('roll');
                      handleRollHitDie();
                    }}
                    disabled={isRollingDie}
                    className="p-1.5 bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg shadow-xs transition cursor-pointer flex items-center gap-1 text-xs font-fantasy"
                  >
                    <Dices className={`w-3.5 h-3.5 ${isRollingDie ? 'animate-spin' : ''}`} />
                    Tirar
                  </button>
                  {rolledDieValue !== null && (
                    <span className="text-sm font-bold font-mono text-[#8c672b]">
                      +{Math.max(1, rolledDieValue + conModifier)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Automatic 5e derived stats changes preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[#ebdcc7]">
              {/* Proficiency bonus */}
              <div className="p-2 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-center">
                <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                  Bono Competencia
                </span>
                <span className="font-mono font-bold text-xs text-[#2c221a]">
                  +{currentProf} {profIncreased && <span className="text-[#3e6b48]">➔ +{newProf}</span>}
                </span>
              </div>

              {/* Movement Speed */}
              <div className="p-2 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-center">
                <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                  Velocidad
                </span>
                <span className="font-mono font-bold text-xs text-[#2c221a]">
                  {currentSpeedRes.speedFeet} pies{' '}
                  {speedIncreased && (
                    <span className="text-[#3e6b48]">➔ {newSpeedRes.speedFeet} pies</span>
                  )}
                </span>
              </div>

              {/* Extra Attack */}
              <div className="p-2 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-center">
                <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                  Ataques por Turno
                </span>
                <span className="font-mono font-bold text-xs text-[#2c221a]">
                  {currentExtraAttack.attacksCount}{' '}
                  {unlocksExtraAttack && (
                    <span className="text-[#3e6b48]">➔ {newExtraAttack.attacksCount} (¡Ataque Extra!)</span>
                  )}
                </span>
              </div>

              {/* Spell slots unlocked */}
              <div className="p-2 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-center">
                <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                  Ranura Máxima
                </span>
                <span className="font-mono font-bold text-xs text-[#2c221a]">
                  {isCaster ? `Nivel ${maxSpellLvl}` : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Subclass Selection (if required) */}
          {needsSubclass && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#ebdcc7] pb-2">
                <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#8c672b] border border-[#d6c4aa]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    Elección de Subclase ({classObj.subclassesName})
                  </h3>
                  <p className="text-xs text-[#786450]">
                    ¡A nivel {newClassLevel} tu {activeClassName} desbloquea su senda heroica especializada!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {classObj.subclasses.map((sub) => {
                  const isSelected = selectedSubclass === sub.name;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubclass(sub.name)}
                      className={`p-3 rounded-xl border-2 transition cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm ring-1 ring-[#c59b27]'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                          {sub.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#8c672b]" />}
                      </div>
                      <p className="text-[11px] text-[#6e5c4a] mt-1 line-clamp-2">
                        {sub.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: ASI or Feat (Mejora de Característica o Dote) */}
          {isAsiLevel && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#5c3a70] border border-[#d6c4aa]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                      Mejora de Característica (ASI) o Dote de 5e
                    </h3>
                    <p className="text-xs text-[#786450]">
                      A nivel {newLevel} puedes aumentar tus puntuaciones o seleccionar una dote oficial.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#ede1ce] p-1 rounded-lg border border-[#cfbe9f]">
                  <button
                    type="button"
                    onClick={() => setAsiType('ability')}
                    className={`px-3 py-1 rounded-md text-xs font-fantasy font-bold transition cursor-pointer ${
                      asiType === 'ability'
                        ? 'bg-[#8c672b] text-white shadow-xs'
                        : 'text-[#6e5c4a] hover:text-[#2c221a]'
                    }`}
                  >
                    +2 / +1+1 Atributos
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsiType('feat')}
                    className={`px-3 py-1 rounded-md text-xs font-fantasy font-bold transition cursor-pointer ${
                      asiType === 'feat'
                        ? 'bg-[#8c672b] text-white shadow-xs'
                        : 'text-[#6e5c4a] hover:text-[#2c221a]'
                    }`}
                  >
                    Dote Oficial
                  </button>
                </div>
              </div>

              {asiType === 'ability' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-[#2c221a] cursor-pointer font-medium">
                      <input
                        type="radio"
                        checked={abilityChoiceMode === '+2'}
                        onChange={() => setAbilityChoiceMode('+2')}
                        className="accent-[#8c672b]"
                      />
                      +2 a una sola característica
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#2c221a] cursor-pointer font-medium">
                      <input
                        type="radio"
                        checked={abilityChoiceMode === '+1+1'}
                        onChange={() => setAbilityChoiceMode('+1+1')}
                        className="accent-[#8c672b]"
                      />
                      +1 a dos características distintas
                    </label>
                  </div>

                  {abilityChoiceMode === '+2' ? (
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((statKey) => {
                        const currentVal = character.stats[statKey] || 10;
                        const isSelected = singleStatChoice === statKey;
                        return (
                          <button
                            key={statKey}
                            type="button"
                            onClick={() => setSingleStatChoice(statKey)}
                            className={`p-2.5 rounded-xl border-2 text-center transition cursor-pointer ${
                              isSelected
                                ? 'border-[#8c672b] bg-[#f5ede0] ring-1 ring-[#c59b27]'
                                : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold text-[#735f49] block">
                              {statKey}
                            </span>
                            <span className="text-sm font-bold text-[#2c221a]">
                              {currentVal} ➔ {Math.min(20, currentVal + 2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#6e5c4a] block mb-1">
                          Primera Característica (+1):
                        </label>
                        <select
                          value={dualStatChoice1}
                          onChange={(e) => setDualStatChoice1(e.target.value as keyof AbilityScores)}
                          className="w-full bg-[#faf3e8] border border-[#cfbeaa] rounded-lg p-2 text-xs font-bold text-[#2c221a]"
                        >
                          {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((s) => (
                            <option key={s} value={s}>
                              {s.toUpperCase()} (Actual: {character.stats[s]})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#6e5c4a] block mb-1">
                          Segunda Característica (+1):
                        </label>
                        <select
                          value={dualStatChoice2}
                          onChange={(e) => setDualStatChoice2(e.target.value as keyof AbilityScores)}
                          className="w-full bg-[#faf3e8] border border-[#cfbeaa] rounded-lg p-2 text-xs font-bold text-[#2c221a]"
                        >
                          {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((s) => (
                            <option key={s} value={s} disabled={s === dualStatChoice1}>
                              {s.toUpperCase()} (Actual: {character.stats[s]})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-fantasy font-bold text-[#6e5c4a]">
                      Elige una dote oficial de D&D 5e:
                    </p>
                    <span className="text-xs font-mono font-bold text-[#8c672b]">
                      {filteredLevelUpFeats.length} dotes disponibles
                    </span>
                  </div>

                  {/* Feat Filters Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 min-w-[180px]">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8c7b69]" />
                      <input
                        type="text"
                        placeholder="Buscar dote por nombre o beneficio..."
                        value={featSearchTerm}
                        onChange={(e) => setFeatSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#faf3e8] border border-[#cfbeaa] rounded-lg text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b]"
                      />
                    </div>

                    <select
                      value={featCategoryFilter}
                      onChange={(e) => setFeatCategoryFilter(e.target.value)}
                      className="bg-[#faf3e8] border border-[#cfbeaa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b] cursor-pointer"
                    >
                      <option value="all">Todas las categorías</option>
                      <option value="Combate">Combate</option>
                      <option value="Magia">Magia</option>
                      <option value="Utilidad">Utilidad</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  {/* Feats List */}
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 border border-[#cfbeaa] rounded-xl p-2 bg-[#faf3e8]">
                    {filteredLevelUpFeats.map((feat) => {
                      const isSelected = selectedFeat?.name === feat.name;
                      return (
                        <div
                          key={feat.name}
                          onClick={() => {
                            setSelectedFeat(feat);
                            setSelectedFeatSubChoices([]);
                            if (feat.abilityBonus?.stats && feat.abilityBonus.stats.length > 0) {
                              setFeatHalfStatChoice(feat.abilityBonus.stats[0]);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-start justify-between gap-2 ${
                            isSelected
                              ? 'border-[#8c672b] bg-[#f5ede0] shadow-2xs font-bold ring-1 ring-[#8c672b]'
                              : 'border-transparent hover:bg-[#ede1ce]'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#2c221a] font-fantasy text-xs">{feat.name}</span>
                              <span className="text-[10px] text-[#786450] italic font-normal">({feat.category})</span>
                              {feat.abilityBonus && (
                                <span className="text-[9px] bg-[#244227] text-[#c9efcc] px-1 rounded font-mono font-bold">
                                  +1 Stat
                                </span>
                              )}
                              {feat.prerequisite && (
                                <span className="text-[9px] text-[#8c672b] bg-[#eddcc4] px-1 rounded font-mono italic">
                                  Req
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[#6e5c4a] line-clamp-1 mt-0.5 font-normal">
                              {feat.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectingFeat(feat);
                            }}
                            className="p-1 text-[#8c672b] hover:bg-[#dfd0ba] rounded-lg transition cursor-pointer shrink-0"
                            title="Ver pergamino completo de la dote"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Feat Complete Detail View */}
                  {selectedFeat && (
                    <div className="p-4 bg-[#fbf6eb] rounded-xl border-2 border-[#8c672b] shadow-xs space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-fantasy font-bold text-sm text-[#2c221a]">
                              {selectedFeat.name}
                            </h4>
                            <span className="text-xs text-[#8c672b] font-mono italic">
                              ({selectedFeat.nameEn})
                            </span>
                          </div>
                          {selectedFeat.prerequisite ? (
                            <span className="text-[11px] text-[#8c591a] font-mono block mt-0.5 font-bold">
                              ⚠️ Prerrequisito: {selectedFeat.prerequisite}
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#2e7d32] font-mono block mt-0.5 font-bold">
                              ✓ Sin Prerrequisitos (Dote Universal)
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setInspectingFeat(selectedFeat)}
                          className="px-2.5 py-1 bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg text-xs font-fantasy font-bold flex items-center gap-1 shadow transition cursor-pointer shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver Pergamino Completo
                        </button>
                      </div>

                      <p className="text-xs text-[#5e4b37] italic leading-relaxed">
                        "{selectedFeat.description}"
                      </p>

                      {/* Half-Feat Stat Selector if flexible */}
                      {selectedFeat.abilityBonus && (
                        <div className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#cfbeaa] flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-fantasy font-bold text-[#8c672b] flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Aumento de Característica (+{selectedFeat.abilityBonus.amount}):
                          </span>
                          {selectedFeat.abilityBonus.flexible && selectedFeat.abilityBonus.stats ? (
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-[#6e5c4a]">Elige atributo:</span>
                              <select
                                value={featHalfStatChoice}
                                onChange={(e) => setFeatHalfStatChoice(e.target.value as keyof AbilityScores)}
                                className="bg-white border border-[#cfbeaa] rounded-md px-2 py-1 text-xs font-bold text-[#2c221a]"
                              >
                                {selectedFeat.abilityBonus.stats.map((st) => (
                                  <option key={st} value={st}>
                                    {st.toUpperCase()} (Actual: {character.stats[st as keyof AbilityScores]})
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <span className="font-mono font-bold text-[#2c221a]">
                              +{selectedFeat.abilityBonus.amount} a {selectedFeat.abilityBonus.stats?.join(', ').toUpperCase()}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Sub-choice Picker for Feat if available (e.g. Iniciado en la Magia, Adepto Elemental, etc.) */}
                      {selectedFeat.subChoice && (
                        <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#cfbeaa] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-fantasy font-bold text-xs text-[#8c672b] uppercase">
                              {selectedFeat.subChoice.title}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-[#8c672b] bg-[#ebdcc4] px-1.5 py-0.5 rounded border border-[#d6c4aa]">
                              {selectedFeatSubChoices.length} / {selectedFeat.subChoice.maxSelections} seleccionados
                            </span>
                          </div>
                          {selectedFeat.subChoice.description && (
                            <p className="text-[11px] text-[#7a6448] leading-tight">
                              {selectedFeat.subChoice.description}
                            </p>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                            {selectedFeat.subChoice.options.map((opt) => {
                              const isOptSelected = selectedFeatSubChoices.includes(opt.name) || selectedFeatSubChoices.includes(opt.id);
                              const handleToggle = () => {
                                setSelectedFeatSubChoices((prev) => {
                                  if (isOptSelected) {
                                    return prev.filter((x) => x !== opt.name && x !== opt.id);
                                  }
                                  if (selectedFeat!.subChoice!.maxSelections === 1) {
                                    return [opt.name];
                                  }
                                  if (prev.length < selectedFeat!.subChoice!.maxSelections) {
                                    return [...prev, opt.name];
                                  }
                                  return [...prev.slice(1), opt.name];
                                });
                              };
                              return (
                                <div
                                  key={opt.id}
                                  onClick={handleToggle}
                                  className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                                    isOptSelected
                                      ? 'bg-[#ede0cc] border-[#8c672b] shadow-2xs ring-1 ring-[#c59b27]'
                                      : 'bg-white border-[#d8c8af] hover:border-[#b88c32]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between text-xs font-fantasy font-bold text-[#2c221a]">
                                    <span>{opt.name}</span>
                                    {isOptSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
                                  </div>
                                  <p className="text-[10px] text-[#6e5c4a] mt-0.5 leading-snug">
                                    {opt.desc}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Benefits list */}
                      <div className="space-y-1.5">
                        <strong className="text-xs font-fantasy uppercase text-[#8c672b] block">
                          Beneficios y Reglas Oficiales:
                        </strong>
                        <div className="space-y-1">
                          {selectedFeat.benefits.map((b, bidx) => (
                            <div key={bidx} className="flex items-start gap-2 text-xs text-[#3b2b1b] bg-white/70 p-2 rounded-lg border border-[#ebdcc7]">
                              <Check className="w-3.5 h-3.5 text-[#8c672b] shrink-0 mt-0.5" />
                              <span className="leading-snug">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Section 4: Metamagic (Hechicero lv 3, 10, 17) */}
          {needsMetamagic && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#b5734c] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#fceee6] rounded-lg text-[#b5734c] border border-[#e5c2b0]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                      Metamagia de Hechicero (Elige {metamagicCountNeeded})
                    </h3>
                    <p className="text-xs text-[#786450]">
                      Modifica tus conjuros gastando Puntos de Hechicería en combate.
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  selectedMetamagic.length === metamagicCountNeeded
                    ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                    : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                }`}>
                  {selectedMetamagic.length} / {metamagicCountNeeded} elegidas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {METAMAGIC_OPTIONS.map((meta) => {
                  const isChecked = selectedMetamagic.includes(meta.name);
                  return (
                    <div
                      key={meta.id}
                      onClick={() => toggleMetamagic(meta.name)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer text-left ${
                        isChecked
                          ? 'border-[#b5734c] bg-[#faeee8] shadow-xs ring-1 ring-[#b5734c]'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                          {meta.name}
                        </span>
                        {meta.badge && (
                          <span className="text-[10px] font-mono text-[#b5734c] bg-white/70 px-1.5 py-0.5 rounded border border-[#e5c2b0]">
                            {meta.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6e5c4a] mt-1 leading-snug">
                        {meta.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 5: Eldritch Invocations & Pact Boon (Brujo) */}
          {needsInvocations && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#542d72] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#f3eafa] rounded-lg text-[#542d72] border border-[#d2b8ea]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                      Invocaciones Sobrenaturales (Elige {invocationsCountNeeded})
                    </h3>
                    <p className="text-xs text-[#786450]">
                      Fragmentos de conocimiento arcano prohibido otorgados por tu Patrón del Pacto.
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  selectedInvocations.length === invocationsCountNeeded
                    ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                    : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                }`}>
                  {selectedInvocations.length} / {invocationsCountNeeded} elegidas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {ELDRITCH_INVOCATIONS.map((inv) => {
                  const isChecked = selectedInvocations.includes(inv.name);
                  return (
                    <div
                      key={inv.id}
                      onClick={() => toggleInvocation(inv.name)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer text-left ${
                        isChecked
                          ? 'border-[#542d72] bg-[#f8f2fd] shadow-xs ring-1 ring-[#542d72]'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                          {inv.name}
                        </span>
                        {inv.badge && (
                          <span className="text-[10px] font-mono text-[#542d72] bg-white/70 px-1.5 py-0.5 rounded border border-[#d2b8ea]">
                            {inv.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6e5c4a] mt-1 leading-snug">
                        {inv.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {needsPactBoon && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#542d72] shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#ebdcc7] pb-2">
                <div className="p-1.5 bg-[#f3eafa] rounded-lg text-[#542d72] border border-[#d2b8ea]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    Don del Pacto (Pact Boon - Nivel 3)
                  </h3>
                  <p className="text-xs text-[#786450]">
                    Tu patrón te concede un regalo extraordinario por tu lealtad.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PACT_BOON_OPTIONS.map((boon) => {
                  const isSelected = selectedPactBoon === boon.name;
                  return (
                    <div
                      key={boon.id}
                      onClick={() => setSelectedPactBoon(boon.name)}
                      className={`p-3 rounded-xl border-2 transition cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#542d72] bg-[#f8f2fd] shadow-sm ring-1 ring-[#542d72]'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                          {boon.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#542d72]" />}
                      </div>
                      <p className="text-[11px] text-[#6e5c4a] mt-1">
                        {boon.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 7: Expertise (Bardo & Pícaro) */}
          {needsExpertise && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#2b6cb0] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#ebf8ff] rounded-lg text-[#2b6cb0] border border-[#bee3f8]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                      Pericia (Expertise - Elige 2 Habilidades)
                    </h3>
                    <p className="text-xs text-[#786450]">
                      Duplica tu bonificador de competencia (+{newProf * 2}) en las 2 habilidades elegidas.
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  selectedExpertise.length === 2
                    ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                    : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                }`}>
                  {selectedExpertise.length} / 2 habilidades
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
                {ALL_5E_SKILLS.map((sk) => {
                  const isChecked = selectedExpertise.includes(sk.name);
                  const isProf = (character.skills || []).includes(sk.name);
                  return (
                    <button
                      key={sk.name}
                      type="button"
                      onClick={() => toggleExpertise(sk.name)}
                      className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                        isChecked
                          ? 'border-[#2b6cb0] bg-[#ebf8ff] font-bold text-[#1a365d]'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32] text-[#2c221a]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{sk.name}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-[#2b6cb0]" />}
                      </div>
                      <span className="text-[10px] text-[#786450] block mt-0.5">
                        {sk.abilityLabel} {isProf ? '★ Competente' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 8: Battle Master Maneuvers (Guerrero) */}
          {needsManeuvers && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#8c672b] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#8c672b] border border-[#d6c4aa]">
                    <Sword className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                      Maniobras de Maestro de la Batalla (Elige {maneuversCountNeeded})
                    </h3>
                    <p className="text-xs text-[#786450]">
                      Tácticas de combate que ejecutas consumiendo tus Dados de Superioridad.
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  selectedManeuvers.length === maneuversCountNeeded
                    ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                    : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                }`}>
                  {selectedManeuvers.length} / {maneuversCountNeeded} maniobras
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {BATTLE_MASTER_MANEUVERS.map((maneuver) => {
                  const isChecked = selectedManeuvers.includes(maneuver.name);
                  return (
                    <div
                      key={maneuver.id}
                      onClick={() => toggleManeuver(maneuver.name)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer text-left ${
                        isChecked
                          ? 'border-[#8c672b] bg-[#f5ede0] ring-1 ring-[#c59b27]'
                          : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                          {maneuver.name}
                        </span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
                      </div>
                      <p className="text-[11px] text-[#6e5c4a] mt-1 leading-snug">
                        {maneuver.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Systematic Class & Subclass Decisions (Four Elements, Totems, Runes, Arcane Shots, Draconic Ancestry, Land Circle, etc.) */}
          {pendingClassDecisions
            .filter((dec) => !['metamagic', 'invocations', 'pactBoon', 'battleMasterManeuvers'].includes(dec.id))
            .map((dec) => {
              const selectedList = activeClassDecisions[dec.id] || [];
              const swap = swappedDecisions[dec.id] || { out: '', in: '' };
              const isCompleted = selectedList.length === dec.countNeeded;
              const alreadyKnown = dec.alreadyChosen || [];

              return (
                <div
                  key={dec.id}
                  className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#8c672b] shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#8c672b] border border-[#d6c4aa]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                            {dec.title} (Elige {dec.countNeeded})
                          </h3>
                        </div>
                        <p className="text-xs text-[#786450] mt-0.5">
                          {dec.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border self-start sm:self-center ${
                        isCompleted
                          ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                          : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                      }`}
                    >
                      {selectedList.length} / {dec.countNeeded} elegidas
                    </span>
                  </div>

                  {/* Optional Swap Rule UI (e.g. Four Elements: Reemplazar una disciplina elemental aprendida previamente) */}
                  {dec.canSwap && alreadyKnown.length > 0 && (
                    <div className="bg-[#f4ebe1] p-3 rounded-xl border border-[#d8c8af] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4a3b2c]">
                          <RefreshCw className="w-3.5 h-3.5 text-[#8c672b]" />
                          <span>Reemplazo Opcional de Opción Previa</span>
                        </div>
                        <span className="text-[10px] text-[#786450] italic">
                          {dec.swapLabel || 'Puedes cambiar 1 opción conocida por otra nueva.'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[11px] font-semibold text-[#5a4837] block mb-0.5">
                            Opción a olvidar:
                          </label>
                          <select
                            value={swap.out}
                            onChange={(e) => {
                              const outVal = e.target.value;
                              setSwappedDecisions((prev) => ({
                                ...prev,
                                [dec.id]: { out: outVal, in: outVal ? prev[dec.id]?.in || '' : '' },
                              }));
                            }}
                            className="w-full text-xs p-1.5 rounded-lg border border-[#c8b79d] bg-white text-[#2c221a]"
                          >
                            <option value="">-- No reemplazar ninguna --</option>
                            {alreadyKnown.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-[#5a4837] block mb-0.5">
                            Reemplazar por nueva:
                          </label>
                          <select
                            value={swap.in}
                            disabled={!swap.out}
                            onChange={(e) => {
                              const inVal = e.target.value;
                              setSwappedDecisions((prev) => ({
                                ...prev,
                                [dec.id]: { out: prev[dec.id]?.out || '', in: inVal },
                              }));
                            }}
                            className="w-full text-xs p-1.5 rounded-lg border border-[#c8b79d] bg-white text-[#2c221a] disabled:opacity-50"
                          >
                            <option value="">-- Seleccionar nueva opción --</option>
                            {dec.options
                              .filter(
                                (opt) =>
                                  !alreadyKnown.includes(opt.name) &&
                                  !selectedList.includes(opt.name) &&
                                  opt.name !== swap.out
                              )
                              .map((opt) => (
                                <option key={opt.id} value={opt.name}>
                                  {opt.name} {(opt as any).kiCost !== undefined ? `(${(opt as any).kiCost} Ki)` : ''}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Search if options count > 6 */}
                  {dec.options.length > 6 && (
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder={`Buscar en ${dec.title}...`}
                        value={decisionFilterTerms[dec.id] || ''}
                        onChange={(e) => setDecisionFilterTerms((prev) => ({ ...prev, [dec.id]: e.target.value }))}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#faf3e8] border border-[#cfbeaa] rounded-lg text-xs text-[#2c221a] focus:outline-none focus:border-[#8c672b]"
                      />
                    </div>
                  )}

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                    {dec.options.filter((opt) => {
                      const term = (decisionFilterTerms[dec.id] || '').toLowerCase().trim();
                      if (!term) return true;
                      return opt.name.toLowerCase().includes(term) || opt.desc.toLowerCase().includes(term);
                    }).map((opt) => {
                      const isSelected = selectedList.includes(opt.name);
                      const isAlreadyKnown = alreadyKnown.includes(opt.name);
                      const isBeingSwappedOut = swap.out === opt.name;
                      const isBeingSwappedIn = swap.in === opt.name;
                      const optKi = (opt as any).kiCost;
                      const optLevel = (opt as any).minLevel;

                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-xl border transition flex flex-col justify-between text-left ${
                            isSelected || isBeingSwappedIn
                              ? 'border-[#8c672b] bg-[#f5ede0] shadow-xs ring-1 ring-[#c59b27]'
                              : isAlreadyKnown && !isBeingSwappedOut
                              ? 'border-[#c8b79d] bg-[#eee5d8] opacity-75'
                              : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  if (!isAlreadyKnown || isBeingSwappedOut) {
                                    toggleClassDecision(dec.id, opt.name, dec.countNeeded);
                                  }
                                }}
                                disabled={isAlreadyKnown && !isBeingSwappedOut}
                                className="text-left flex-1 cursor-pointer font-fantasy font-bold text-xs text-[#2c221a] hover:text-[#8c672b] transition flex items-center gap-1.5"
                              >
                                {(isSelected || isBeingSwappedIn) && (
                                  <Check className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />
                                )}
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
                                {/* Botón para Inspeccionar detalles */}
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

                            {isAlreadyKnown && !isBeingSwappedOut && (
                              <span className="text-[10px] text-[#2b6cb0] font-semibold mt-1 inline-block">
                                ✓ Ya conocida previamente
                              </span>
                            )}
                            {isBeingSwappedOut && (
                              <span className="text-[10px] text-[#c53030] font-semibold mt-1 inline-block">
                                ✕ Marcada para olvidar
                              </span>
                            )}
                            {isBeingSwappedIn && (
                              <span className="text-[10px] text-[#276749] font-semibold mt-1 inline-block">
                                ★ Nueva por reemplazo
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {/* Section 9: Cantrip Formulas (Wizard Level 3+) */}
          {unlocksCantripFormulas && (
            <div className="bg-[#f0f7fc] p-4 sm:p-5 rounded-2xl border-2 border-[#89b4d4] shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#cde0ee] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#dbebf7] rounded-lg text-[#1e4e79] border border-[#a8cde5]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-fantasy font-bold text-sm text-[#143654] uppercase tracking-wide">
                        Fórmulas de Trucos (Cantrip Formulas - Regla Opcional Tasha)
                      </h3>
                      <span className="text-[10px] bg-[#1e4e79] text-white px-2 py-0.5 rounded-full font-bold">
                        Nv 3+ Mago
                      </span>
                    </div>
                    <p className="text-xs text-[#2b597e]">
                      Has inscrito fórmulas arcanas en tu libro de conjuros para reconfigurar tus trucos en cada descanso largo.
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-[#143654] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCantripFormulas}
                    onChange={(e) => setEnableCantripFormulas(e.target.checked)}
                    className="accent-[#1e4e79] w-4 h-4"
                  />
                  Activar en Grimorio
                </label>
              </div>

              <p className="text-xs text-[#385c7c] leading-relaxed">
                <strong>Regla Oficial (Tasha):</strong> A partir del 3.er nivel, has inscrito un conjunto de fórmulas arcanas en tu libro de conjuros que puedes consultar cada vez que termines un descanso largo para reemplazar un truco de mago que conozcas por otro truco de la lista de conjuros de mago.
              </p>

              {/* Immediate optional cantrip swap during level up */}
              <div className="bg-white/90 p-3 rounded-xl border border-[#b6d4e8] space-y-2">
                <span className="text-xs font-fantasy font-bold text-[#143654] block">
                  ¿Deseas reemplazar un truco ahora mismo durante esta subida de nivel? (Opcional)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#355776] block mb-1">
                      Truco actual a olvidar:
                    </label>
                    <select
                      value={cantripToReplace}
                      onChange={(e) => setCantripToReplace(e.target.value)}
                      className="w-full bg-[#f8fbfe] border border-[#b6d4e8] rounded-lg p-2 text-xs font-bold text-[#143654]"
                    >
                      <option value="">-- No reemplazar ningún truco ahora --</option>
                      {currentCharacterCantrips.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#355776] block mb-1">
                      Nuevo truco de mago a aprender en su lugar:
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={replacementCantrip?.name || ''}
                        onChange={(e) => {
                          const chosen = wizardCantrips.find((w) => w.name === e.target.value) || null;
                          setReplacementCantrip(chosen);
                        }}
                        disabled={!cantripToReplace}
                        className="flex-1 bg-[#f8fbfe] border border-[#b6d4e8] rounded-lg p-2 text-xs font-bold text-[#143654] disabled:opacity-50"
                      >
                        <option value="">-- Seleccionar truco de reemplazo --</option>
                        {wizardCantrips
                          .filter((wc) => !currentCharacterCantrips.some((c) => c.name === wc.name))
                          .map((wc) => (
                            <option key={wc.name} value={wc.name}>
                              {wc.name} ({wc.school})
                            </option>
                          ))}
                      </select>
                      {replacementCantrip && (
                        <button
                          type="button"
                          onClick={() => setInspectingSpell(replacementCantrip)}
                          className="px-2.5 py-1.5 bg-[#dbebf7] hover:bg-[#c6def2] text-[#1e4e79] rounded-lg border border-[#a8cde5] text-xs font-bold flex items-center gap-1 shrink-0 transition cursor-pointer"
                          title="Ver pergamino completo del truco"
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 10: Spells to Learn / Prepare (Spellcasters) */}
          {isCaster && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#7d519e] shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdcc7] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#7d519e] border border-[#d6c4aa]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                      Aprender / Preparar Nuevos Conjuros
                    </h3>
                    <p className="text-xs text-[#786450]">
                      Ranuras máximas de conjuro a Nv {newLevel}: <strong className="text-[#8c672b]">Nivel {maxSpellLvl}</strong>
                    </p>
                  </div>
                </div>

                {spellRules.newSpellsToLearn > 0 ? (
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      selectedNewSpells.length === spellRules.newSpellsToLearn
                        ? 'bg-[#e6f4ea] text-[#137333] border-[#a8dab5]'
                        : 'bg-[#fef7e0] text-[#b06000] border-[#fce293]'
                    }`}
                  >
                    {selectedNewSpells.length} / {spellRules.newSpellsToLearn} conjuros seleccionados
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-[#3e6b48] bg-[#eef7f0] px-2.5 py-1 rounded-lg border border-[#c3e3c9]">
                    Conjurador Preparado de Lista Completa
                  </span>
                )}
              </div>

              {/* Explanatory Banner with exact 5e rules */}
              <div className="p-3 bg-[#f5effa] rounded-xl border border-[#dec9f0] text-xs text-[#43235b] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#7d519e] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-[#331749]">
                    {spellRules.explanation}
                  </p>
                  <p className="text-[11px] text-[#563670]">
                    {isWizard
                      ? `Como Mago a nivel ${newLevel}, puedes elegir exactamente 2 nuevos conjuros de hasta Nivel ${maxSpellLvl} para escribirlos en tu Libro de Conjuros sin coste de oro ni tiempo.`
                      : `Conjuros disponibles de tu clase hasta Nivel ${maxSpellLvl}.`}
                  </p>
                </div>
              </div>

              {/* Spell swap for known casters */}
              {spellRules.canSwapSpell && currentCharacterLeveledSpells.length > 0 && (
                <div className="bg-[#fdfaf5] p-3 rounded-xl border border-[#d8c8af] space-y-2">
                  <span className="text-xs font-fantasy font-bold text-[#684920] block">
                    🔄 Reemplazar un Conjuro Conocido (Regla Oficial de Subida de Nivel)
                  </span>
                  <p className="text-[11px] text-[#786450]">
                    Al subir de nivel puedes olvidar 1 de tus conjuros conocidos y aprender otro de la lista de {activeClassName}.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#684920] block mb-1">
                        Conjuro a olvidar:
                      </label>
                      <select
                        value={spellToSwapOut}
                        onChange={(e) => setSpellToSwapOut(e.target.value)}
                        className="w-full bg-white border border-[#cfbeaa] rounded-lg p-2 text-xs font-bold text-[#2c221a]"
                      >
                        <option value="">-- No reemplazar ningún conjuro --</option>
                        {currentCharacterLeveledSpells.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name} (Nv {s.level})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#684920] block mb-1">
                        Nuevo conjuro a aprender en su lugar:
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={spellToSwapIn?.name || ''}
                          onChange={(e) => {
                            const chosen = availableCompendiumSpells.find((s) => s.name === e.target.value) || null;
                            setSpellToSwapIn(chosen);
                          }}
                          disabled={!spellToSwapOut}
                          className="flex-1 bg-white border border-[#cfbeaa] rounded-lg p-2 text-xs font-bold text-[#2c221a] disabled:opacity-50"
                        >
                          <option value="">-- Seleccionar nuevo conjuro --</option>
                          {availableCompendiumSpells.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.name} {s.nameEn && s.nameEn.toLowerCase() !== s.name.toLowerCase() ? `(${s.nameEn}) ` : ''}(Nv {s.level} - {s.school})
                            </option>
                          ))}
                        </select>
                        {spellToSwapIn && (
                          <button
                            type="button"
                            onClick={() => setInspectingSpell(spellToSwapIn)}
                            className="px-2.5 py-1.5 bg-[#faf3e8] hover:bg-[#ede1ce] text-[#8c672b] rounded-lg border border-[#cfbeaa] text-xs font-bold flex items-center gap-1 shrink-0 transition cursor-pointer"
                            title="Ver pergamino del conjuro"
                          >
                            <Eye className="w-3.5 h-3.5" /> Ver
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* New Cantrips Unlock (e.g. at lv 4 or 10) */}
              {spellRules.newCantripsToLearn > 0 && (
                <div className="bg-[#fdfaf5] p-3 rounded-xl border border-[#d8c8af] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-fantasy font-bold text-[#684920]">
                      ✨ Aprender Nuevo Truco ({selectedNewCantrips.length} / {spellRules.newCantripsToLearn})
                    </span>
                    <span className="text-[10px] text-[#786450]">
                      ¡Tu personaje adquiere 1 truco adicional!
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                    {availableCompendiumCantrips.map((c) => {
                      const isChecked = selectedNewCantrips.some((sc) => sc.name === c.name);
                      return (
                        <div
                          key={c.id}
                          onClick={() => toggleCantripSelection(c)}
                          className={`p-2 rounded-lg border text-left transition cursor-pointer flex items-center justify-between ${
                            isChecked
                              ? 'border-[#7d519e] bg-[#f8f2fd] font-bold text-[#43235b]'
                              : 'border-[#d8c8af] bg-white hover:border-[#b88c32] text-[#2c221a]'
                          }`}
                        >
                          <span className="text-xs truncate">{c.name}</span>
                          <div className="flex items-center gap-1.5">
                            {isChecked && <Check className="w-3.5 h-3.5 text-[#7d519e]" />}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInspectingSpell(c);
                              }}
                              className="p-1 text-[#8c7b69] hover:text-[#7d519e] hover:bg-[#f0e4fa] rounded transition cursor-pointer"
                              title="Ver pergamino del truco"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Leveled Spells Search and Filters */}
              {spellRules.newSpellsToLearn > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 min-w-[180px]">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8c7b69]" />
                      <input
                        type="text"
                        placeholder="Buscar conjuro por nombre..."
                        value={spellSearchTerm}
                        onChange={(e) => setSpellSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#cfbeaa] rounded-lg text-xs text-[#2c221a] focus:outline-none focus:border-[#7d519e]"
                      />
                    </div>

                    <select
                      value={spellLevelFilter}
                      onChange={(e) =>
                        setSpellLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                      }
                      className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c221a] focus:outline-none focus:border-[#7d519e] cursor-pointer"
                    >
                      <option value="all">Todos los niveles (1 a {maxSpellLvl})</option>
                      {Array.from({ length: maxSpellLvl }, (_, i) => i + 1).map((lvl) => (
                        <option key={lvl} value={lvl}>
                          Nivel {lvl}
                        </option>
                      ))}
                    </select>

                    <select
                      value={spellSchoolFilter}
                      onChange={(e) => setSpellSchoolFilter(e.target.value)}
                      className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1.5 text-xs text-[#2c221a] focus:outline-none focus:border-[#7d519e] cursor-pointer"
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

                  {/* Spells Grid */}
                  <div className="max-h-56 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 pr-1">
                    {filteredAvailableSpells.map((spell) => {
                      const isChecked = selectedNewSpells.some((s) => s.id === spell.id);
                      return (
                        <div
                          key={spell.id}
                          onClick={() => toggleSpellSelection(spell)}
                          className={`p-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                            isChecked
                              ? 'border-[#7d519e] bg-[#f8f2fd] shadow-2xs ring-1 ring-[#7d519e]'
                              : 'border-[#d8c8af] bg-[#faf3e8] hover:border-[#b88c32]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-1 accent-[#7d519e]"
                          />
                          <div className="min-w-0 flex-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#2c221a] truncate">
                                {spell.name}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0 ml-1">
                                <span className="text-[10px] text-[#7d519e] font-mono bg-white/70 px-1 rounded border border-[#e2d0f0]">
                                  Nv {spell.level}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setInspectingSpell(spell);
                                  }}
                                  className="p-1 text-[#7d519e] hover:bg-white rounded transition cursor-pointer"
                                  title="Ver pergamino oficial completo"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-[10px] text-[#6e5c4a] line-clamp-1 mt-0.5">
                              {spell.school} • {spell.castingTime} • {spell.range} • {spell.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 11: Unlocked Features Preview */}
          {(newClassFeatures.length > 0 || newSubclassFeatures.length > 0) && (
            <div className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#ebdcc7] pb-2">
                <div className="p-1.5 bg-[#f5ede0] rounded-lg text-[#244769] border border-[#d6c4aa]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    Habilidades Desbloqueadas de Clase a Nivel {newLevel}
                  </h3>
                  <p className="text-xs text-[#786450]">
                    Rasgos que tu personaje adquiere al alcanzar este nuevo nivel.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {newClassFeatures.map((feat, idx) => (
                  <div key={idx} className="bg-[#faf3e8] p-2.5 rounded-xl border border-[#d8c8af]">
                    <span className="font-fantasy font-bold text-xs text-[#2c221a] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" /> {feat.name}
                    </span>
                    <p className="text-xs text-[#6e5c4a] mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
                {newSubclassFeatures.map((feat, idx) => (
                  <div key={`sub-${idx}`} className="bg-[#f5ede0] p-2.5 rounded-xl border border-[#c59b27]">
                    <span className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#8c672b]" /> {feat.name} (Subclase)
                    </span>
                    <p className="text-xs text-[#6e5c4a] mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t-2 border-[#d8c8af] bg-[#f5ede0] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#362719] border border-[#cfbe9f] rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmLevelUp}
            className="px-6 py-2.5 bg-gradient-to-r from-[#8c672b] via-[#a87a2d] to-[#c59b27] hover:from-[#a67a33] hover:to-[#dfaf35] text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer font-fantasy ring-2 ring-[#c59b27]/50 flex items-center gap-2"
          >
            <ArrowUp className="w-4 h-4" />
            ¡Confirmar Subida a Nivel {newLevel}! 🎲
          </button>
        </div>
      </div>

      {/* Modal Pergamino de Dote Completa */}
      {inspectingFeat && (
        <FeatDetailModal
          feat={inspectingFeat}
          onClose={() => setInspectingFeat(null)}
          onSelect={(f) => {
            setSelectedFeat(f);
            setSelectedFeatSubChoices([]);
            if (f.abilityBonus?.stats && f.abilityBonus.stats.length > 0) {
              setFeatHalfStatChoice(f.abilityBonus.stats[0]);
            }
          }}
          isSelected={selectedFeat?.name === inspectingFeat.name}
        />
      )}

      {/* Modal Pergamino de Conjuro Completo */}
      {inspectingSpell && (
        <SpellDetailModal
          spell={inspectingSpell}
          onClose={() => setInspectingSpell(null)}
        />
      )}

      {/* Modal Pergamino de Inspección de Compendio (Disciplinas, Maniobras, Rasgos, etc.) */}
      {inspectingCompendium && (
        <CompendiumInspectModal
          data={inspectingCompendium}
          onClose={() => setInspectingCompendium(null)}
        />
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
    </div>
  );
};
