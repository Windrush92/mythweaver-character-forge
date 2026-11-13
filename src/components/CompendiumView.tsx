import React, { useState, useMemo, useEffect } from 'react';
import { useUserStore } from '../hooks/useUserStore';
import { useLanguageStore } from '../hooks/useLanguageStore';
import {
  translateAbilityText,
  translateProficiencyText,
  translateSubclassGroup,
  translateSkillName,
  translateTableColumnLabel,
  translateTableSpecificValue,
  translateProgressionFeature,
  TASHA_OPTIONAL_FEATURES_EN,
  CONDITIONS_EN,
  TACTICAL_RULES_EN,
  translateDndTitle,
  translateDndText,
  translateLanguageList,
  translateSpellSchool,
  translateSpellMeta,
  translateSpellClass,
  MAGIC_ITEM_RARITY_EN,
  MAGIC_ITEM_CATEGORY_EN,
  FEAT_CATEGORY_EN,
  MONSTER_TYPE_EN,
  MONSTER_SIZE_EN,
} from '../utils/dndEnglishTranslator';
import { translateBackgroundDescription } from '../utils/dndEnglishRoleplayAndBackgrounds';
import {
  WIKIDOT_CLASSES,
  WikidotClass,
} from '../data/wikidotData';
import {
  CLASS_PROGRESSION_DATA,
  ClassProgressionMeta,
  TashaOptionalFeature,
} from '../data/wikidotClassTables';
import { WIKIDOT_RACES, WikidotRace } from '../data/wikidotRacesData';
import { WIKIDOT_BACKGROUNDS, WikidotBackground, formatBackgroundWealth } from '../data/wikidotBackgroundsData';
import { OFFICIAL_SPELLS_COMPENDIUM, getCompendiumForEdition, getSpellForEdition } from '../data/spellsData';
import { OFFICIAL_5E_FEATS, OfficialFeat } from '../data/characterCreatorData';
import { ALL_WIKIDOT_FEATS } from '../data/wikidotFeatsData';
import { ALL_5E_WEAPONS, ALL_5E_ARMORS, WeaponDef, ArmorDef } from '../data/weaponsAndArmorData';
import {
  DND_2024_SPECIES,
  DND_2024_BACKGROUNDS,
  DND_2024_FEATS,
  DND_2024_CLASSES,
  DND_2024_WEAPONS,
  DND_2024_WEAPON_MASTERIES,
} from '../data/dnd2024';
import { Spell } from '../types';
import { SpellDetailModal } from './SpellDetailModal';
import { CompendiumInspectModal, CompendiumInspectData } from './CompendiumInspectModal';
import { Compendium2024View } from './Compendium2024View';
import { EquipmentBadge } from './EquipmentBadge';
import {
  OFFICIAL_5E_CONDITIONS,
  OFFICIAL_5E_TACTICAL_RULES,
  OfficialCondition,
  TacticalRule,
} from '../data/conditionsRulesData';
import {
  OFFICIAL_5E_MAGIC_ITEMS,
  MagicItemDef,
  MagicItemRarity,
  MagicItemCategory,
} from '../data/magicItemsData';
import { SRD_MONSTERS_COMPENDIUM } from '../data/srdMonstersData';
import { MonsterStatblock } from '../types';
import {
  BookOpen,
  Shield,
  Sparkles,
  Sword,
  Award,
  Users,
  Search,
  ChevronRight,
  Check,
  Info,
  Heart,
  Zap,
  Flame,
  FileText,
  Filter,
  Eye,
  Activity,
  Layers,
  Crown,
  Dices,
  Star,
  Skull,
  Wand2,
  ShieldAlert,
  HeartPulse,
  Crosshair,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Upload,
} from 'lucide-react';

export type CompendiumSection =
  | 'classes'
  | 'subclasses'
  | 'races'
  | 'backgrounds'
  | 'spells'
  | 'feats'
  | 'equipment'
  | 'conditions'
  | 'magic-items'
  | 'bestiary';

export interface CompendiumViewProps {
  initialSection?: CompendiumSection;
  monsters?: MonsterStatblock[];
  onOpenMonsterBuilder?: (monster?: MonsterStatblock | null) => void;
  onOpenImporter?: () => void;
  onDeleteMonster?: (id: string) => void;
  customWeapons?: WeaponDef[];
  customArmors?: ArmorDef[];
  onOpenEquipmentBuilder?: (weapon?: WeaponDef | null, armor?: ArmorDef | null) => void;
  onDeleteCustomWeapon?: (id: string) => void;
  onDeleteCustomArmor?: (id: string) => void;
}

export const CompendiumView: React.FC<CompendiumViewProps> = ({
  initialSection = 'classes',
  monsters,
  onOpenMonsterBuilder,
  onOpenImporter,
  onDeleteMonster,
  customWeapons = [],
  customArmors = [],
  onOpenEquipmentBuilder,
  onDeleteCustomWeapon,
  onDeleteCustomArmor,
}) => {
  const { isDm } = useUserStore();
  const { language, isSpanish, t } = useLanguageStore();
  const [section, setSection] = useState<CompendiumSection>(initialSection);
  const [searchTerm, setSearchTerm] = useState('');

  // Anti-metagaming: si el usuario no es DM y entra al bestiario, redirigir a clases
  useEffect(() => {
    if (!isDm && section === 'bestiary') {
      setSection('classes');
    }
  }, [isDm, section]);

  // ---------------------------------------------------------------------------
  // EDITION SWITCHER STATE (5e 2014 vs 5.5e 2024)
  // ---------------------------------------------------------------------------
  const [edition, setEdition] = useState<'5e' | '5.5e'>('5e');
  const [selectedSpecies2024Id, setSelectedSpecies2024Id] = useState<string>(DND_2024_SPECIES[0]?.id || '');
  const [selectedBackground2024Id, setSelectedBackground2024Id] = useState<string>(DND_2024_BACKGROUNDS[0]?.id || '');
  const [selectedClass2024Id, setSelectedClass2024Id] = useState<string>(DND_2024_CLASSES[0]?.id || '');
  const [selectedFeat2024Id, setSelectedFeat2024Id] = useState<string>(DND_2024_FEATS[0]?.id || '');
  const [selectedWeapon2024Id, setSelectedWeapon2024Id] = useState<string>(DND_2024_WEAPONS[0]?.id || '');
  const [selectedMasteryName, setSelectedMasteryName] = useState<string>('Vex (Acosar)');

  const filteredSpecies2024 = useMemo(() => {
    return DND_2024_SPECIES.filter(sp => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return sp.name.toLowerCase().includes(term) || sp.description.toLowerCase().includes(term) || sp.traits.some(t => t.name.toLowerCase().includes(term) || t.desc.toLowerCase().includes(term));
    });
  }, [searchTerm]);

  const selectedSpecies2024 = useMemo(() => {
    return DND_2024_SPECIES.find(s => s.id === selectedSpecies2024Id) || DND_2024_SPECIES[0];
  }, [selectedSpecies2024Id]);

  const filteredBackgrounds2024 = useMemo(() => {
    return DND_2024_BACKGROUNDS.filter(bg => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return bg.name.toLowerCase().includes(term) || bg.feat.toLowerCase().includes(term) || bg.description.toLowerCase().includes(term) || bg.skillProficiencies.toLowerCase().includes(term);
    });
  }, [searchTerm]);

  const selectedBackground2024 = useMemo(() => {
    return DND_2024_BACKGROUNDS.find(b => b.id === selectedBackground2024Id) || DND_2024_BACKGROUNDS[0];
  }, [selectedBackground2024Id]);

  const filteredClasses2024 = useMemo(() => {
    return DND_2024_CLASSES.filter(c => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term) || c.subclasses.some(s => s.name.toLowerCase().includes(term));
    });
  }, [searchTerm]);

  const selectedClass2024 = useMemo(() => {
    return DND_2024_CLASSES.find(c => c.id === selectedClass2024Id) || DND_2024_CLASSES[0];
  }, [selectedClass2024Id]);

  const filteredFeats2024 = useMemo(() => {
    return DND_2024_FEATS.filter(f => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return f.name.toLowerCase().includes(term) || f.category.toLowerCase().includes(term) || f.description.toLowerCase().includes(term) || f.benefits.some(b => b.name.toLowerCase().includes(term) || b.desc.toLowerCase().includes(term));
    });
  }, [searchTerm]);

  const selectedFeat2024 = useMemo(() => {
    return DND_2024_FEATS.find(f => f.id === selectedFeat2024Id) || DND_2024_FEATS[0];
  }, [selectedFeat2024Id]);

  const filteredWeapons2024 = useMemo(() => {
    return DND_2024_WEAPONS.filter(w => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return w.name.toLowerCase().includes(term) || w.mastery.toLowerCase().includes(term) || w.properties.some(p => p.toLowerCase().includes(term));
    });
  }, [searchTerm]);

  // ---------------------------------------------------------------------------
  // 1. CLASSES STATE
  // ---------------------------------------------------------------------------
  const [selectedClassId, setSelectedClassId] = useState<string>('mago');
  const [classDetailTab, setClassDetailTab] = useState<'table' | 'features' | 'tasha' | 'subclasses'>('table');
  const [inspectData, setInspectData] = useState<CompendiumInspectData | null>(null);
  const [expandedSubclassFeatures, setExpandedSubclassFeatures] = useState<Record<string, boolean>>({});
  const [showAllSubclassFeaturesExpanded, setShowAllSubclassFeaturesExpanded] = useState<boolean>(true);

  const selectedClass = useMemo(() => {
    return (
      WIKIDOT_CLASSES.find((c) => c.id === selectedClassId) ||
      WIKIDOT_CLASSES[0]
    );
  }, [selectedClassId]);

  const selectedClassProgression = useMemo<ClassProgressionMeta | undefined>(() => {
    return CLASS_PROGRESSION_DATA[selectedClassId];
  }, [selectedClassId]);

  // ---------------------------------------------------------------------------
  // 2. SUBCLASSES STATE
  // ---------------------------------------------------------------------------
  const [subclassParentFilter, setSubclassParentFilter] = useState<string>('all');
  const allSubclasses = useMemo(() => {
    const list: { parentClass: WikidotClass; subclass: WikidotClass['subclasses'][0] }[] = [];
    WIKIDOT_CLASSES.forEach((cls) => {
      (cls.subclasses || []).forEach((sub) => {
        list.push({ parentClass: cls, subclass: sub });
      });
    });
    return list;
  }, []);

  const filteredSubclasses = useMemo(() => {
    return allSubclasses.filter(({ parentClass, subclass }) => {
      if (subclassParentFilter !== 'all' && parentClass.id !== subclassParentFilter) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          subclass.name.toLowerCase().includes(term) ||
          translateDndTitle(subclass.name).toLowerCase().includes(term) ||
          subclass.description.toLowerCase().includes(term) ||
          parentClass.name.toLowerCase().includes(term) ||
          (parentClass.nameEn && parentClass.nameEn.toLowerCase().includes(term))
        );
      }
      return true;
    });
  }, [allSubclasses, subclassParentFilter, searchTerm]);

  // ---------------------------------------------------------------------------
  // 3. RACES STATE
  // ---------------------------------------------------------------------------
  const [selectedRaceId, setSelectedRaceId] = useState<string>('humano');
  const selectedRace = useMemo(() => {
    return WIKIDOT_RACES.find((r) => r.id === selectedRaceId) || WIKIDOT_RACES[0];
  }, [selectedRaceId]);

  const filteredRaces = useMemo(() => {
    return WIKIDOT_RACES.filter((r) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        r.name.toLowerCase().includes(term) ||
        (r.nameEn && r.nameEn.toLowerCase().includes(term)) ||
        r.description.toLowerCase().includes(term) ||
        (r.descriptionEn && r.descriptionEn.toLowerCase().includes(term))
      );
    });
  }, [searchTerm]);

  // ---------------------------------------------------------------------------
  // 4. BACKGROUNDS STATE
  // ---------------------------------------------------------------------------
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>(
    WIKIDOT_BACKGROUNDS[0]?.id || ''
  );
  const selectedBackground = useMemo(() => {
    return (
      WIKIDOT_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) ||
      WIKIDOT_BACKGROUNDS[0]
    );
  }, [selectedBackgroundId]);

  const filteredBackgrounds = useMemo(() => {
    return WIKIDOT_BACKGROUNDS.filter((b) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        b.name.toLowerCase().includes(term) ||
        (b.nameEn && b.nameEn.toLowerCase().includes(term)) ||
        b.description.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  // ---------------------------------------------------------------------------
  // 5. SPELLS STATE
  // ---------------------------------------------------------------------------
  const [spellLevelFilter, setSpellLevelFilter] = useState<'all' | number>('all');
  const [spellSchoolFilter, setSpellSchoolFilter] = useState<string>('all');
  const [spellClassFilter, setSpellClassFilter] = useState<string>('all');
  const activeSpellCompendium = useMemo(() => getCompendiumForEdition(edition), [edition]);

  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(
    OFFICIAL_SPELLS_COMPENDIUM[0] || null
  );
  const [modalSpell, setModalSpell] = useState<Spell | null>(null);

  const filteredSpells = useMemo(() => {
    return activeSpellCompendium.filter((sp) => {
      if (spellLevelFilter !== 'all' && sp.level !== spellLevelFilter) return false;
      if (spellSchoolFilter !== 'all' && !sp.school.toLowerCase().includes(spellSchoolFilter.toLowerCase()))
        return false;
      if (spellClassFilter !== 'all') {
        const classes = sp.classes || [];
        if (!classes.some((c) => c.toLowerCase().includes(spellClassFilter.toLowerCase()))) return false;
      }
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          sp.name.toLowerCase().includes(term) ||
          (sp.nameEn && sp.nameEn.toLowerCase().includes(term)) ||
          sp.description.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [activeSpellCompendium, spellLevelFilter, spellSchoolFilter, spellClassFilter, searchTerm]);

  // ---------------------------------------------------------------------------
  // 6. FEATS STATE
  // ---------------------------------------------------------------------------
  const [selectedFeat, setSelectedFeat] = useState<OfficialFeat | null>(
    OFFICIAL_5E_FEATS[0] || null
  );
  const [featCategoryFilter, setFeatCategoryFilter] = useState<string>('all');
  const [featPrereqFilter, setFeatPrereqFilter] = useState<'all' | 'with' | 'without'>('all');

  const filteredFeats = useMemo(() => {
    return OFFICIAL_5E_FEATS.filter((f) => {
      if (featCategoryFilter !== 'all' && f.category !== featCategoryFilter) return false;
      if (featPrereqFilter === 'with' && !f.prerequisite) return false;
      if (featPrereqFilter === 'without' && f.prerequisite) return false;
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        f.name.toLowerCase().includes(term) ||
        f.nameEn.toLowerCase().includes(term) ||
        f.description.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        (f.prerequisite && f.prerequisite.toLowerCase().includes(term)) ||
        f.benefits.some((b) => b.toLowerCase().includes(term))
      );
    });
  }, [featCategoryFilter, featPrereqFilter, searchTerm]);

  // ---------------------------------------------------------------------------
  // 7. EQUIPMENT STATE
  // ---------------------------------------------------------------------------
  const [equipmentType, setEquipmentType] = useState<'weapons' | 'armors'>('weapons');
  const allWeapons = useMemo(() => {
    return [...customWeapons, ...ALL_5E_WEAPONS];
  }, [customWeapons]);

  const allArmors = useMemo(() => {
    return [...customArmors, ...ALL_5E_ARMORS];
  }, [customArmors]);

  const [selectedWeapon, setSelectedWeapon] = useState<WeaponDef | null>(
    ALL_5E_WEAPONS[0] || null
  );
  const [selectedArmor, setSelectedArmor] = useState<ArmorDef | null>(
    ALL_5E_ARMORS[0] || null
  );

  const filteredWeapons = useMemo(() => {
    return allWeapons.filter((w) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        w.name.toLowerCase().includes(term) ||
        w.description.toLowerCase().includes(term) ||
        w.damageType.toLowerCase().includes(term)
      );
    });
  }, [allWeapons, searchTerm]);

  const filteredArmors = useMemo(() => {
    return allArmors.filter((a) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        a.name.toLowerCase().includes(term) ||
        (a.nameEn && a.nameEn.toLowerCase().includes(term)) ||
        a.description.toLowerCase().includes(term) ||
        a.category.toLowerCase().includes(term)
      );
    });
  }, [allArmors, searchTerm]);

  // ---------------------------------------------------------------------------
  // 8. CONDITIONS & TACTICAL RULES STATE
  // ---------------------------------------------------------------------------
  const [conditionsTab, setConditionsTab] = useState<'conditions' | 'tactical'>('conditions');
  const [tacticalCategoryFilter, setTacticalCategoryFilter] = useState<string>('all');

  const filteredConditions = useMemo(() => {
    return OFFICIAL_5E_CONDITIONS.filter((c) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        c.name.toLowerCase().includes(term) ||
        c.nameEn.toLowerCase().includes(term) ||
        c.summary.toLowerCase().includes(term) ||
        c.effects.some((e) => e.toLowerCase().includes(term))
      );
    });
  }, [allWeapons, searchTerm]);

  const filteredTacticalRules = useMemo(() => {
    return OFFICIAL_5E_TACTICAL_RULES.filter((r) => {
      if (tacticalCategoryFilter !== 'all' && r.category !== tacticalCategoryFilter) return false;
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        r.title.toLowerCase().includes(term) ||
        r.summary.toLowerCase().includes(term) ||
        r.details.some((d) => d.toLowerCase().includes(term))
      );
    });
  }, [tacticalCategoryFilter, searchTerm]);

  // ---------------------------------------------------------------------------
  // 9. MAGIC ITEMS STATE
  // ---------------------------------------------------------------------------
  const [magicItemRarityFilter, setMagicItemRarityFilter] = useState<string>('all');
  const [magicItemCategoryFilter, setMagicItemCategoryFilter] = useState<string>('all');
  const [magicItemAttunementFilter, setMagicItemAttunementFilter] = useState<'all' | 'yes' | 'no'>('all');

  const filteredMagicItems = useMemo(() => {
    return OFFICIAL_5E_MAGIC_ITEMS.filter((item) => {
      if (magicItemRarityFilter !== 'all' && item.rarity !== magicItemRarityFilter) return false;
      if (magicItemCategoryFilter !== 'all' && item.category !== magicItemCategoryFilter) return false;
      if (magicItemAttunementFilter === 'yes' && !item.attunement) return false;
      if (magicItemAttunementFilter === 'no' && item.attunement) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(term) ||
        item.nameEn.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.effects.some((eff) => eff.toLowerCase().includes(term))
      );
    });
  }, [magicItemRarityFilter, magicItemCategoryFilter, magicItemAttunementFilter, searchTerm]);

  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // 10. BESTIARY (SRD + CAMPAIGN MONSTERS) STATE
  // ---------------------------------------------------------------------------
  const effectiveMonsters = useMemo(() => {
    return monsters && monsters.length > 0 ? monsters : SRD_MONSTERS_COMPENDIUM;
  }, [monsters]);

  const [monsterCrFilter, setMonsterCrFilter] = useState<string>('all');
  const [monsterTypeFilter, setMonsterTypeFilter] = useState<string>('all');
  const [selectedMonster, setSelectedMonster] = useState<MonsterStatblock | null>(
    effectiveMonsters[0] || null
  );

  useEffect(() => {
    if (effectiveMonsters.length > 0 && (!selectedMonster || !effectiveMonsters.some((m) => m.id === selectedMonster.id))) {
      setSelectedMonster(effectiveMonsters[0]);
    }
  }, [effectiveMonsters]);

  const filteredMonsters = useMemo(() => {
    return effectiveMonsters.filter((m) => {
      if (monsterCrFilter !== 'all' && m.cr !== monsterCrFilter) return false;
      if (monsterTypeFilter !== 'all' && !m.type.toLowerCase().includes(monsterTypeFilter.toLowerCase())) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(term) ||
        m.type.toLowerCase().includes(term) ||
        (m.actions && m.actions.some((a) => a.name.toLowerCase().includes(term) || a.desc.toLowerCase().includes(term))) ||
        (m.traits && m.traits.some((t) => t.name.toLowerCase().includes(term) || t.desc.toLowerCase().includes(term)))
      );
    });
  }, [effectiveMonsters, monsterCrFilter, monsterTypeFilter, searchTerm]);

  return (
    <div className="space-y-6 font-serif text-[#2c221a] animate-fadeIn pb-12">
      {/* Top Banner / Compendium Header */}
      <div className="bg-gradient-to-r from-[#282019] via-[#3a2c20] to-[#282019] rounded-2xl p-6 sm:p-8 text-[#f7f2ea] border-2 border-[#b88c32]/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c59b27] to-[#8c672b] flex items-center justify-center shadow-lg border border-[#ffd56b]/50">
                <BookOpen className="w-7 h-7 text-[#1c150e]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-fantasy text-[#f7f2ea] tracking-wider uppercase">
                  {t('Compendio Oficial de Reglas', 'Official Rules Compendium')}
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#baa892] max-w-2xl leading-relaxed">
              {t(
                `Consulta clases, subclases, razas y especies, trasfondos, dotes, grimorio, armamento, condiciones y objetos mágicos${isDm ? ' y bestiario SRD' : ''} sin salir de tu mesa de juego.`,
                `Browse classes, subclasses, species & races, backgrounds, feats, spellbook, equipment, conditions, and magic items${isDm ? ' and SRD bestiary' : ''} without leaving your table.`
              )}
            </p>
          </div>

          {/* Quick Search in Compendium */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#c0ad97]" />
            <input
              type="text"
              placeholder={
                edition === '5.5e'
                  ? t("Buscar en compendio 2024...", "Search 2024 compendium...")
                  : t("Buscar en el compendio...", "Search the compendium...")
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#1b1510]/80 border border-[#b88c32]/50 rounded-xl text-xs sm:text-sm text-[#f7f2ea] placeholder-[#8c7b69] focus:outline-none focus:border-[#ffd56b]"
            />
          </div>
        </div>
      </div>

      {/* Edition Switcher Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#ede2cf] p-2 sm:p-2.5 rounded-2xl border-2 border-[#c59b27]/40 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#5a4838] px-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#8c672b]" />
            {t('Edición de Reglas:', 'Rules Edition:')}
          </span>
          <div className="flex items-center gap-2 p-1 bg-[#1c140e]/90 rounded-xl border border-[#b88c32]/50 shadow-inner">
            <button
              type="button"
              onClick={() => { setEdition('5e'); setSearchTerm(''); }}
              style={{
                backgroundImage: `url(${edition === '5e' ? './assets/ui/sheet_small_btn_active.png' : './assets/ui/sheet_small_btn.png'})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
              className={`px-4 py-2 text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-[125px] ${
                edition === '5e'
                  ? 'text-[#ffe8a3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                  : 'text-[#d8c8af] opacity-85 hover:opacity-100 hover:text-white'
              }`}
            >
              <span>⚔️ 5e (2014)</span>
            </button>
            <button
              type="button"
              onClick={() => { setEdition('5.5e'); setSearchTerm(''); }}
              style={{
                backgroundImage: `url(${edition === '5.5e' ? './assets/ui/sheet_small_btn_active.png' : './assets/ui/sheet_small_btn.png'})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
              className={`px-4 py-2 text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-w-[145px] ${
                edition === '5.5e'
                  ? 'text-[#ffe8a3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                  : 'text-[#d8c8af] opacity-85 hover:opacity-100 hover:text-white'
              }`}
            >
              <span>✨ 5.5e (2024)</span>
              <span className="text-[9px] bg-amber-400 text-stone-900 px-1 rounded font-mono font-black uppercase">PHB</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-[#6e5c4a] italic px-2 hidden sm:block">
          {edition === '5.5e' 
            ? t('✨ Mostrando compendio oficial 2024: Especies, Trasfondos con Dotes de Origen, Subclases Nvl 3 y Maestría en Armas.', '✨ Showing official 2024 compendium: Flexible Species, Backgrounds with Origin Feats, Level 3 Subclasses, and Weapon Masteries.')
            : t('📜 Mostrando compendio oficial 2014: PHB + Tasha + Xanathar canónico.', '📜 Showing canonical 2014 compendium: PHB + Tasha + Xanathar.')}
        </div>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b-2 border-[#d8c8af]">
        <button
          onClick={() => { setSection('classes'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'classes'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Shield className="w-4 h-4" />
          {edition === '5.5e' ? `${t('Clases 2024', '2024 Classes')} (${DND_2024_CLASSES.length})` : t('Clases & Progresión 1-20', 'Classes & Progression 1-20')}
        </button>

        <button
          onClick={() => { setSection('subclasses'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'subclasses'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Crown className="w-4 h-4" />
          {edition === '5.5e' ? t('Subclases Nvl 3 (48)', 'Level 3 Subclasses (48)') : `${t('Subclases', 'Subclasses')} (${allSubclasses.length})`}
        </button>

        <button
          onClick={() => { setSection('races'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'races'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Users className="w-4 h-4" />
          {edition === '5.5e' ? t('Especies (10 Oficiales)', 'Species (10 Official)') : `${t('Razas & Linajes', 'Races & Lineages')} (${WIKIDOT_RACES.length})`}
        </button>

        <button
          onClick={() => { setSection('backgrounds'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'backgrounds'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <FileText className="w-4 h-4" />
          {edition === '5.5e' ? t('Trasfondos 2024 (16)', '2024 Backgrounds (16)') : `${t('Trasfondos', 'Backgrounds')} (${WIKIDOT_BACKGROUNDS.length})`}
        </button>

        <button
          onClick={() => { setSection('feats'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'feats'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Award className="w-4 h-4" />
          {edition === '5.5e' ? `${t('Dotes 2024', '2024 Feats')} (${DND_2024_FEATS.length})` : `${t('Dotes', 'Feats')} (${OFFICIAL_5E_FEATS.length})`}
        </button>

        <button
          onClick={() => { setSection('equipment'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'equipment'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Sword className="w-4 h-4" />
          {edition === '5.5e' ? t('Armas & Maestría (8)', 'Weapons & Masteries (8)') : `${t('Armería & Equipo', 'Armory & Equipment')} (${allWeapons.length + allArmors.length})`}
        </button>

        <button
          onClick={() => { setSection('spells'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'spells'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {t('Grimorio Oficial', 'Official Spellbook')} ({activeSpellCompendium.length})
        </button>

        <button
          onClick={() => { setSection('conditions'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'conditions'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          {t('Condiciones & Táctica', 'Conditions & Tactics')} ({OFFICIAL_5E_CONDITIONS.length + OFFICIAL_5E_TACTICAL_RULES.length})
        </button>

        <button
          onClick={() => { setSection('magic-items'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
            section === 'magic-items'
              ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
              : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          {t('Objetos Mágicos', 'Magic Items')} ({OFFICIAL_5E_MAGIC_ITEMS.length})
        </button>

        {isDm && (
          <button
            onClick={() => { setSection('bestiary'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-fantasy font-bold transition flex items-center gap-2 cursor-pointer shrink-0 ${
              section === 'bestiary'
                ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#c59b27]/40'
                : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce] hover:text-[#2c221a]'
            }`}
          >
            <Skull className="w-4 h-4" />
            {t('Bestiario Manual de Monstruos (Solo DM)', 'Monster Manual Bestiary (DM Only)')} ({effectiveMonsters.length})
          </button>
        )}
      </div>

      {/* 2024 REVISED RULES COMPENDIUM VIEW */}
      {edition === '5.5e' && ['classes', 'subclasses', 'races', 'backgrounds', 'feats', 'equipment'].includes(section) ? (
        <Compendium2024View
          section={section}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : (
        <>
          {edition === '5.5e' && (
            <div className="bg-[#fef9ee] border-2 border-[#b88c32] p-4 rounded-2xl flex items-center gap-3 shadow-xs">
              <Sparkles className="w-5 h-5 text-[#b88c32] shrink-0" />
              <div className="text-xs text-[#5c4a35] leading-relaxed">
                <strong className="text-[#8c672b] font-fantasy">{t('Compatibilidad Canónica D&D 5.5e (2024):', 'Canonical D&D 5.5e (2024) Compatibility:')}</strong>{' '}
                {t('Esta sección mantiene 100% de compatibilidad canónica y retroactiva entre la 5ª Edición (2014) y la revisión PHB 2024.', 'This section maintains 100% canonical and backward compatibility between the 2014 5th Edition and the 2024 PHB rules.')}
              </div>
            </div>
          )}

      {/* ==================================================================== */}
      {/* SECTION 1: CLASES & PROGRESIÓN 1-20 (FASE 1)                         */}
      {/* ==================================================================== */}
      {section === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Class Selector List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
              {t('Clases Oficiales 5e', 'Official 5e Classes')} ({WIKIDOT_CLASSES.length})
            </h3>
            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {WIKIDOT_CLASSES.map((cls) => {
                const isSelected = cls.id === selectedClassId;
                const displayClassName = isSpanish ? cls.name : (cls.nameEn || translateDndTitle(cls.name));
                const displayPrimary = isSpanish ? cls.primaryAbility : translateAbilityText(cls.primaryAbility);
                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm ring-1 ring-[#c59b27]'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32] hover:bg-[#faf3e8]'
                    }`}
                  >
                    <div>
                      <span className="font-fantasy font-bold text-sm text-[#2c221a] block">
                        {displayClassName}
                      </span>
                      <span className="text-[10px] text-[#786450]">
                        d{cls.hitDie} • {displayPrimary} • {cls.subclasses.length} {t('subclases', 'subclasses')}
                      </span>
                    </div>
                    {isSelected ? (
                      <ChevronRight className="w-5 h-5 text-[#8c672b]" />
                    ) : (
                      <span className="text-[10px] font-mono text-[#9c8975] bg-white/60 px-1.5 py-0.5 rounded border border-[#d8c8af]">
                        d{cls.hitDie}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Class Detail View */}
          <div className="lg:col-span-3 space-y-5">
            {/* Class Identity Card */}
            <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ebdcc7] pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-fantasy font-bold text-[#2c221a]">
                    {isSpanish ? selectedClass.name : (selectedClass.nameEn || translateDndTitle(selectedClass.name))}
                  </h3>
                  <p className="text-xs text-[#6e5c4a] mt-1 max-w-2xl leading-relaxed">
                    {isSpanish ? selectedClass.description : (selectedClass.descriptionEn || translateDndText(selectedClass.description))}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#8c672b] text-white px-3 py-1 rounded-lg shadow-xs">
                    {t('Dado de Golpe:', 'Hit Die:')} 1d{selectedClass.hitDie}
                  </span>
                </div>
              </div>

              {/* Class Badges & Proficiencies */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af]">
                  <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                    {t('Característica Primaria', 'Primary Ability')}
                  </span>
                  <span className="text-xs font-bold text-[#2c221a]">
                    {isSpanish ? selectedClass.primaryAbility : translateAbilityText(selectedClass.primaryAbility)}
                  </span>
                </div>

                <div className="p-2.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af]">
                  <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                    {t('Tiradas de Salvación', 'Saving Throws')}
                  </span>
                  <span className="text-xs font-bold text-[#2c221a]">
                    {selectedClass.savingThrows
                      .map((st) => (isSpanish ? st : translateAbilityText(st)))
                      .join(', ')}
                  </span>
                </div>

                <div className="p-2.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af]">
                  <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                    {t('Competencia Armaduras', 'Armor Proficiencies')}
                  </span>
                  <span className="text-[11px] font-bold text-[#2c221a] line-clamp-1">
                    {selectedClass.armorProficiencies.length > 0
                      ? selectedClass.armorProficiencies
                          .map((ap) => (isSpanish ? ap : translateProficiencyText(ap)))
                          .join(', ')
                      : t('Ninguna', 'None')}
                  </span>
                </div>

                <div className="p-2.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af]">
                  <span className="text-[10px] text-[#786450] font-fantasy uppercase block">
                    {t('Conjuración', 'Spellcasting')}
                  </span>
                  <span className="text-xs font-bold text-[#2c221a]">
                    {selectedClass.isSpellcaster
                      ? `${t('Conjurador', 'Spellcaster')} (${(selectedClass.spellcastingAbility || '').toUpperCase()})`
                      : t('No Conjurador', 'Non-Spellcaster')}
                  </span>
                </div>
              </div>

              {/* Sub-Tabs for the Selected Class */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#ebdcc7] overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setClassDetailTab('table')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    classDetailTab === 'table'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-[#ede1ce] text-[#6e5c4a] hover:bg-[#dfd0ba]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" /> {t('Tabla de Progresión 1-20', 'Progression Table 1-20')}
                </button>

                <button
                  type="button"
                  onClick={() => setClassDetailTab('features')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    classDetailTab === 'features'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-[#ede1ce] text-[#6e5c4a] hover:bg-[#dfd0ba]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> {t('Rasgos de Clase', 'Class Features')} ({selectedClass.featuresByLevel.length})
                </button>

                {selectedClassProgression && selectedClassProgression.optionalFeatures.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setClassDetailTab('tasha')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      classDetailTab === 'tasha'
                        ? 'bg-[#1e4e79] text-white shadow-xs'
                        : 'bg-[#e2edf7] text-[#1e4e79] hover:bg-[#d0e2f2]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> {t('Reglas Opcionales de Tasha', "Tasha's Optional Rules")} ({selectedClassProgression.optionalFeatures.length})
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setClassDetailTab('subclasses')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    classDetailTab === 'subclasses'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-[#ede1ce] text-[#6e5c4a] hover:bg-[#dfd0ba]'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" /> {isSpanish ? selectedClass.subclassesName : translateSubclassGroup(selectedClass.subclassesName)} ({selectedClass.subclasses.length})
                </button>
              </div>
            </div>

            {/* TAB CONTENT: 1. Tabla de Progresión 1-20 */}
            {classDetailTab === 'table' && selectedClassProgression && (
              <div className="bg-[#fcf9f2] p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    {isSpanish
                      ? `Tabla Oficial de Progresión de ${selectedClass.name} (Niveles 1 al 20)`
                      : `Official ${selectedClass.nameEn || translateDndTitle(selectedClass.name)} Progression Table (Levels 1–20)`}
                  </h4>
                  <span className="text-[11px] text-[#786450] italic">
                    {t('Reglas Oficiales 5e', 'Official 5e Rules')}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#d8c8af]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#2c221a] text-[#f7f2ea] font-fantasy uppercase text-[10px] tracking-wider">
                        <th className="p-2.5 text-center w-12 border-r border-[#4a3a2d]">{t('Nivel', 'Level')}</th>
                        <th className="p-2.5 text-center w-14 border-r border-[#4a3a2d]">{t('Bono Comp.', 'Prof. Bonus')}</th>
                        <th className="p-2.5 border-r border-[#4a3a2d]">{t('Rasgos de Clase', 'Class Features')}</th>
                        {selectedClassProgression.specificColumns.map((col) => (
                          <th key={col.key} className="p-2.5 text-center border-r border-[#4a3a2d] whitespace-nowrap">
                            {isSpanish ? col.label : translateTableColumnLabel(col.label)}
                          </th>
                        ))}
                        {selectedClassProgression.rows[0]?.slots && (
                          <>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('1º', '1st')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('2º', '2nd')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('3º', '3rd')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('4º', '4th')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('5º', '5th')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('6º', '6th')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('7º', '7th')}</th>
                            <th className="p-2 text-center w-8 border-r border-[#4a3a2d]">{t('8º', '8th')}</th>
                            <th className="p-2 text-center w-8">{t('9º', '9th')}</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClassProgression.rows.map((row, idx) => {
                        const isEven = idx % 2 === 0;
                        const levelOrdinalEn =
                          row.level === 1 ? '1st' : row.level === 2 ? '2nd' : row.level === 3 ? '3rd' : `${row.level}th`;
                        return (
                          <tr
                            key={row.level}
                            className={`border-b border-[#ebdcc7] transition hover:bg-[#ede1ce] ${
                              isEven ? 'bg-[#faf3e8]' : 'bg-[#fcf9f2]'
                            }`}
                          >
                            <td className="p-2 text-center font-mono font-bold text-[#8c672b] border-r border-[#ebdcc7]">
                              {isSpanish ? `${row.level}º` : levelOrdinalEn}
                            </td>
                            <td className="p-2 text-center font-mono text-[#2c221a] border-r border-[#ebdcc7]">
                              +{row.profBonus}
                            </td>
                            <td className="p-2 border-r border-[#ebdcc7]">
                              <span className="font-semibold text-[#2c221a]">
                                {row.features
                                  .map((featStr) => (isSpanish ? featStr : translateProgressionFeature(featStr)))
                                  .join(', ')}
                              </span>
                            </td>
                            {selectedClassProgression.specificColumns.map((col) => {
                              const rawVal = row.specifics[col.key] || '-';
                              return (
                                <td
                                  key={col.key}
                                  className="p-2 text-center font-mono font-bold text-[#5c3a70] border-r border-[#ebdcc7]"
                                >
                                  {isSpanish ? rawVal : translateTableSpecificValue(rawVal)}
                                </td>
                              );
                            })}
                            {row.slots && (
                              <>
                                {row.slots.map((s, slotIdx) => (
                                  <td
                                    key={slotIdx}
                                    className={`p-1.5 text-center font-mono text-[11px] ${
                                      s > 0 ? 'font-bold text-[#1e4e79]' : 'text-[#baa892]'
                                    } ${slotIdx < 8 ? 'border-r border-[#ebdcc7]' : ''}`}
                                  >
                                    {s > 0 ? s : '—'}
                                  </td>
                                ))}
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. Rasgos Oficiales por Nivel */}
            {classDetailTab === 'features' && (
              <div className="bg-[#fcf9f2] p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3">
                <h4 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                  {isSpanish
                    ? `Rasgos Canónicos de ${selectedClass.name}`
                    : `Canonical ${selectedClass.nameEn || translateDndTitle(selectedClass.name)} Features`}
                </h4>
                <div className="space-y-3">
                  {selectedClass.featuresByLevel.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#faf3e8] p-3.5 rounded-xl border border-[#d8c8af] hover:border-[#b88c32] transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-fantasy font-bold text-sm text-[#2c221a] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" />
                          {isSpanish ? feat.name : translateDndTitle(feat.name)}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#8c672b] bg-[#f5ede0] px-2 py-0.5 rounded-full border border-[#d8c8af]">
                          {t('Nivel', 'Level')} {feat.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#6e5c4a] mt-1.5 leading-relaxed">
                        {isSpanish ? feat.desc : translateDndText(feat.desc)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. Reglas Opcionales de Tasha */}
            {classDetailTab === 'tasha' && selectedClassProgression && (
              <div className="bg-[#f0f7fc] p-5 rounded-2xl border-2 border-[#89b4d4] shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-[#cde0ee] pb-2">
                  <div className="p-1.5 bg-[#dbebf7] rounded-lg text-[#1e4e79] border border-[#a8cde5]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-fantasy font-bold text-sm text-[#143654] uppercase tracking-wide">
                      {t('Reglas y Rasgos Opcionales de Tasha (Oficial 5e)', "Tasha's Optional Class Features (Official 5e)")}
                    </h4>
                    <p className="text-xs text-[#2b597e]">
                      {isSpanish ? (
                        <>Mejoras y opciones oficiales del libro <em>Tasha's Cauldron of Everything</em> para {selectedClass.name}.</>
                      ) : (
                        <>Official enhancements and options from <em>Tasha's Cauldron of Everything</em> for {selectedClass.nameEn || translateDndTitle(selectedClass.name)}.</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedClassProgression.optionalFeatures.map((opt) => {
                    const tashaEn = TASHA_OPTIONAL_FEATURES_EN[opt.id];
                    const optName = isSpanish ? opt.name : (tashaEn?.name || translateDndTitle(opt.name));
                    const optType = isSpanish ? opt.type : (tashaEn?.type || 'Tasha Optional Rule');
                    const optReplaces = isSpanish ? opt.replacesOrEnhances : (tashaEn?.replacesOrEnhances || (opt.replacesOrEnhances ? translateDndText(opt.replacesOrEnhances) : undefined));
                    const optDesc = isSpanish ? opt.desc : (tashaEn?.desc || translateDndText(opt.desc));
                    return (
                      <div
                        key={opt.id}
                        className="bg-white/90 p-4 rounded-xl border border-[#b6d4e8] shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-sm text-[#143654] flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-[#1e4e79]" />
                            {optName}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#1e4e79] bg-[#dbebf7] px-2 py-0.5 rounded-full border border-[#a8cde5]">
                            {t('Nivel', 'Level')} {opt.level} • {optType}
                          </span>
                        </div>
                        {optReplaces && (
                          <span className="text-[10px] text-[#7b5120] font-semibold italic block">
                            {optReplaces}
                          </span>
                        )}
                        <p className="text-xs text-[#355776] leading-relaxed">
                          {optDesc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. Subclases de la Clase */}
            {classDetailTab === 'subclasses' && (
              <div className="bg-[#fcf9f2] p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <h4 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide">
                    {isSpanish ? selectedClass.subclassesName : translateSubclassGroup(selectedClass.subclassesName)} ({selectedClass.subclasses.length} {t('Subclases Oficiales', 'Official Subclasses')})
                  </h4>
                  <span className="text-xs text-[#786450]">
                    {t('Desbloqueo a Nivel', 'Unlocks at Level')} {selectedClass.subclassUnlockLevel || 3}
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedClass.subclasses.map((sub) => {
                    const subNameDisplay = isSpanish ? sub.name : translateDndTitle(sub.name);
                    const subDescDisplay = isSpanish ? sub.description : translateDndText(sub.description);
                    const parentNameDisplay = isSpanish ? selectedClass.name : (selectedClass.nameEn || translateDndTitle(selectedClass.name));
                    const groupNameDisplay = isSpanish ? selectedClass.subclassesName : translateSubclassGroup(selectedClass.subclassesName);
                    return (
                      <div
                        key={sub.id}
                        className="bg-[#faf3e8] p-4 rounded-xl border border-[#d8c8af] space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-sm text-[#2c221a]">
                            {subNameDisplay}
                          </span>
                          {sub.isCasterSubclass && (
                            <span className="text-[10px] font-mono text-[#7d519e] bg-[#f3eafa] px-2 py-0.5 rounded border border-[#e2d0f0]">
                              {t('Subclase Conjuradora', 'Spellcasting Subclass')} ({(sub.spellcastingAbility || '').toUpperCase()})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6e5c4a] italic leading-relaxed">
                          {subDescDisplay}
                        </p>

                        {sub.features && sub.features.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-[#ebdcc7]">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-fantasy font-bold text-[#8c672b] uppercase block">
                                {t('Progresión de Rasgos de la Subclase:', 'Subclass Feature Progression:')}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setShowAllSubclassFeaturesExpanded((prev) => !prev)}
                                  className="text-[10px] text-[#8c672b] hover:text-[#5a4837] bg-[#f5ede0] hover:bg-[#ebdcc7] px-2 py-0.5 rounded border border-[#d8c8af] font-semibold transition cursor-pointer"
                                >
                                  {showAllSubclassFeaturesExpanded
                                    ? t('Vista compacta (con Leer más)', 'Compact view (with Read more)')
                                    : t('Mostrar toda la info de una vez', 'Expand all info at once')}
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setInspectData({
                                      id: sub.id,
                                      title: subNameDisplay,
                                      subtitle: isSpanish
                                        ? `Subclase oficial de ${parentNameDisplay}`
                                        : `Official ${parentNameDisplay} Subclass`,
                                      category: groupNameDisplay,
                                      description: subDescDisplay,
                                      traits: sub.features.map((feat) => ({
                                        name: `${t('Nivel', 'Level')} ${feat.level}: ${isSpanish ? feat.name : translateDndTitle(feat.name)}`,
                                        desc: isSpanish ? feat.desc : translateDndText(feat.desc),
                                      })),
                                    })
                                  }
                                  className="text-[10px] bg-[#f5ede0] hover:bg-[#ebdcc7] text-[#8c672b] font-bold px-2 py-0.5 rounded border border-[#d8c8af] flex items-center gap-1 cursor-pointer"
                                  title={t('Inspeccionar subclase completa en pergamino', 'Inspect full subclass on scroll')}
                                >
                                  <Eye className="w-3 h-3" /> {t('Ver pergamino 1:1', 'View 1:1 Scroll')}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {sub.features.map((f, fIdx) => {
                                const featureKey = `${sub.id}-${f.name}-${f.level}`;
                                const isIndividuallyExpanded = expandedSubclassFeatures[featureKey];
                                const isExpanded = showAllSubclassFeaturesExpanded || isIndividuallyExpanded;
                                const fNameDisplay = isSpanish ? f.name : translateDndTitle(f.name);
                                const fDescDisplay = isSpanish ? f.desc : translateDndText(f.desc);
                                const isLong = fDescDisplay.length > 110;

                                return (
                                  <div
                                    key={fIdx}
                                    className="bg-white/90 p-3 rounded-xl border border-[#e2d6c3] text-xs flex flex-col justify-between shadow-2xs hover:border-[#b88c32] transition"
                                  >
                                    <div>
                                      <div className="flex items-start justify-between gap-1 border-b border-[#f0e4d2] pb-1 mb-1">
                                        <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                                          {fNameDisplay}
                                        </span>
                                        <div className="flex items-center gap-1 shrink-0">
                                          <span className="text-[10px] font-mono font-bold text-[#8c672b] bg-[#faf3e8] px-1.5 py-0.5 rounded border border-[#ebdcc7]">
                                            {t('Nv', 'Lv')} {f.level}
                                          </span>
                                          <button
                                            type="button"
                                            title={t('Inspeccionar rasgo 1:1', 'Inspect feature 1:1')}
                                            onClick={() =>
                                              setInspectData({
                                                id: `${sub.id}-${f.name}`,
                                                title: fNameDisplay,
                                                subtitle: `${subNameDisplay} (${t('Nivel', 'Level')} ${f.level})`,
                                                category: t('Rasgo de Subclase', 'Subclass Feature'),
                                                description: fDescDisplay,
                                                badges: [
                                                  { label: t('Nivel Requerido', 'Required Level'), value: `${t('Nivel', 'Level')} ${f.level}`, variant: 'gold' },
                                                  { label: t('Clase', 'Class'), value: parentNameDisplay, variant: 'neutral' },
                                                  { label: t('Subclase', 'Subclass'), value: subNameDisplay, variant: 'amber' },
                                                ],
                                              })
                                            }
                                            className="p-0.5 text-[#8c672b] hover:text-[#5a4837] hover:bg-[#ede1ce] rounded transition cursor-pointer"
                                          >
                                            <Eye className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>

                                      <p
                                        className={`text-[11px] text-[#5e4a36] mt-0.5 leading-relaxed whitespace-pre-line ${
                                          !isExpanded ? 'line-clamp-2' : ''
                                        }`}
                                      >
                                        {fDescDisplay}
                                      </p>
                                    </div>

                                    {isLong && !showAllSubclassFeaturesExpanded && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExpandedSubclassFeatures((prev) => ({
                                            ...prev,
                                            [featureKey]: !prev[featureKey],
                                          }))
                                        }
                                        className="mt-1.5 text-[10px] font-bold text-[#8c672b] hover:text-[#5a4837] self-start cursor-pointer flex items-center gap-0.5 bg-[#faf3e8] px-1.5 py-0.5 rounded border border-[#ebdcc7]"
                                      >
                                        {isIndividuallyExpanded ? t('Leer menos ▴', 'Read less ▴') : t('Leer más ▾', 'Read more ▾')}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
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
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 2: SUBCLASES (CATÁLOGO EXPANDIDO)                            */}
      {/* ==================================================================== */}
      {section === 'subclasses' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fcf9f2] p-4 rounded-xl border border-[#d8c8af]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8c672b]" />
              <span className="text-xs font-bold text-[#6e5c4a]">{t('Filtrar por Clase:', 'Filter by Class:')}</span>
              <select
                value={subclassParentFilter}
                onChange={(e) => setSubclassParentFilter(e.target.value)}
                className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1 text-xs text-[#2c221a] font-bold"
              >
                <option value="all">
                  {t(`Todas las clases (${allSubclasses.length} subclases)`, `All classes (${allSubclasses.length} subclasses)`)}
                </option>
                {WIKIDOT_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isSpanish ? c.name : (c.nameEn || translateDndTitle(c.name))} ({c.subclasses.length})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-xs font-mono font-bold text-[#8c672b]">
              {t(`Mostrando ${filteredSubclasses.length} subclases`, `Showing ${filteredSubclasses.length} subclasses`)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubclasses.map(({ parentClass, subclass }) => {
              const subNameDisplay = isSpanish ? subclass.name : translateDndTitle(subclass.name);
              const subDescDisplay = isSpanish ? subclass.description : translateDndText(subclass.description);
              const parentNameDisplay = isSpanish ? parentClass.name : (parentClass.nameEn || translateDndTitle(parentClass.name));
              const groupNameDisplay = isSpanish ? parentClass.subclassesName : translateSubclassGroup(parentClass.subclassesName);

              return (
                <div
                  key={`${parentClass.id}-${subclass.id}`}
                  className="bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                    <div>
                      <span className="text-base font-fantasy font-bold text-[#2c221a]">
                        {subNameDisplay}
                      </span>
                      <span className="text-xs text-[#8c672b] font-bold block">
                        {parentNameDisplay} • {groupNameDisplay}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#2c221a] bg-[#f5ede0] px-2 py-0.5 rounded-full border border-[#d8c8af]">
                      {t('Nv', 'Lv')} {parentClass.subclassUnlockLevel || 3}+
                    </span>
                  </div>

                  <p className="text-xs text-[#6e5c4a] leading-relaxed">
                    {subDescDisplay}
                  </p>

                  {subclass.features && subclass.features.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#ebdcc7]">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-fantasy font-bold text-[#786450] uppercase block">
                          {t('Rasgos:', 'Features:')}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setInspectData({
                              id: subclass.id,
                              title: subNameDisplay,
                              subtitle: `${parentNameDisplay} • ${groupNameDisplay}`,
                              category: groupNameDisplay,
                              description: subDescDisplay,
                              traits: subclass.features.map((feat) => ({
                                name: `${t('Nivel', 'Level')} ${feat.level}: ${isSpanish ? feat.name : translateDndTitle(feat.name)}`,
                                desc: isSpanish ? feat.desc : translateDndText(feat.desc),
                              })),
                            })
                          }
                          className="text-[10px] text-[#8c672b] hover:text-[#5a4837] font-bold flex items-center gap-1 cursor-pointer bg-[#faf3e8] px-2 py-0.5 rounded border border-[#ebdcc7]"
                        >
                          <Eye className="w-3 h-3" /> {t('Ver pergamino 1:1', 'View 1:1 Scroll')}
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {subclass.features.map((f, idx) => {
                          const fNameDisplay = isSpanish ? f.name : translateDndTitle(f.name);
                          const fDescDisplay = isSpanish ? f.desc : translateDndText(f.desc);
                          return (
                            <div key={idx} className="bg-[#faf3e8] p-2.5 rounded-lg text-xs border border-[#ebdcc7]/60">
                              <div className="flex items-center justify-between">
                                <strong className="text-[#2c221a] font-fantasy">{fNameDisplay}</strong>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] font-mono text-[#8c672b] bg-white px-1.5 py-0.5 rounded border border-[#ebdcc7]">
                                    {t('Nv', 'Lv')} {f.level}
                                  </span>
                                  <button
                                    type="button"
                                    title={t('Inspeccionar rasgo 1:1', 'Inspect feature 1:1')}
                                    onClick={() =>
                                      setInspectData({
                                        id: `${subclass.id}-${f.name}`,
                                        title: fNameDisplay,
                                        subtitle: `${subNameDisplay} (${t('Nivel', 'Level')} ${f.level})`,
                                        category: t('Rasgo de Subclase', 'Subclass Feature'),
                                        description: fDescDisplay,
                                        badges: [
                                          { label: t('Nivel Requerido', 'Required Level'), value: `${t('Nivel', 'Level')} ${f.level}`, variant: 'gold' },
                                          { label: t('Clase', 'Class'), value: parentNameDisplay, variant: 'neutral' },
                                          { label: t('Subclase', 'Subclass'), value: subNameDisplay, variant: 'amber' },
                                        ],
                                      })
                                    }
                                    className="p-0.5 text-[#8c672b] hover:text-[#5a4837] rounded cursor-pointer"
                                  >
                                    <Eye className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-[11px] text-[#5e4a36] mt-1 leading-relaxed whitespace-pre-line">{fDescDisplay}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 3: RAZAS & LINAJES                                           */}
      {/* ==================================================================== */}
      {section === 'races' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
              {t('Compendio de Razas', 'Races Compendium')} ({filteredRaces.length})
            </h3>
            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredRaces.map((r) => {
                const isSelected = r.id === selectedRaceId;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRaceId(r.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm font-bold'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                    }`}
                  >
                    <span className="text-xs font-fantasy text-[#2c221a]">
                      {isSpanish ? r.name : (r.nameEn || translateDndTitle(r.name))}
                    </span>
                    <span className="text-[10px] text-[#786450]">
                      {isSpanish ? r.speed : r.speed.replace(/pies/gi, 'ft.')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-3">
                <div>
                  <h3 className="text-xl font-fantasy font-bold text-[#2c221a]">
                    {isSpanish ? selectedRace.name : (selectedRace.nameEn || translateDndTitle(selectedRace.name))}
                  </h3>
                  <span className="text-xs text-[#8c672b] font-bold">
                    {isSpanish
                      ? `${selectedRace.category || 'Raza Oficial 5e'} • Tamaño ${selectedRace.size}`
                      : `${selectedRace.categoryEn || 'Official 5e Race'} • Size ${selectedRace.size === 'Pequeño' ? 'Small' : selectedRace.size === 'Mediano' ? 'Medium' : selectedRace.size}`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold bg-[#f5ede0] px-2.5 py-1 rounded-lg border border-[#d8c8af]">
                    {t('Velocidad:', 'Speed:')} {isSpanish ? selectedRace.speed : selectedRace.speed.replace(/pies/gi, 'ft.')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#6e5c4a] leading-relaxed">
                {isSpanish ? selectedRace.description : (selectedRace.descriptionEn || translateDndText(selectedRace.description))}
              </p>

              {/* Racial Ability Score Bonuses */}
              <div className="p-3 bg-[#faf3e8] rounded-xl border border-[#d8c8af] flex flex-wrap items-center gap-2">
                <span className="text-xs font-fantasy font-bold text-[#8c672b]">
                  {t('Aumentos de Característica:', 'Ability Score Increases:')}
                </span>
                {selectedRace.abilityScoreBonuses && Object.entries(selectedRace.abilityScoreBonuses).filter(([_, v]) => Boolean(v)).length > 0 ? (
                  Object.entries(selectedRace.abilityScoreBonuses)
                    .filter(([_, v]) => Boolean(v))
                    .map(([stat, val]) => {
                      const statLabelsEs: Record<string, string> = {
                        str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR', any: 'Elección'
                      };
                      const statLabelsEn: Record<string, string> = {
                        str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA', any: 'Choice'
                      };
                      const labels = isSpanish ? statLabelsEs : statLabelsEn;
                      return (
                        <span
                          key={stat}
                          className="bg-[#ede1ce] text-[#4a361c] px-2 py-0.5 rounded-lg border border-[#cfbe9f] text-xs font-mono font-bold"
                        >
                          +{val} {labels[stat] || stat.toUpperCase()}
                        </span>
                      );
                    })
                ) : (
                  <span className="text-xs text-[#786450] italic">
                    {t('+2 a una y +1 a otra a tu elección (Regla de Linaje Flexible de Tasha)', '+2 to one ability and +1 to another of your choice (Tasha Flexible Lineage Rule)')}
                  </span>
                )}
              </div>

              {/* Darkvision & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-[#faf3e8] p-2.5 rounded-xl border border-[#d8c8af]">
                  <strong className="text-xs text-[#2c221a] block font-fantasy">{t('Visión en la Oscuridad:', 'Darkvision:')}</strong>
                  <span className="text-[#6e5c4a]">
                    {selectedRace.darkvision && selectedRace.darkvision > 0
                      ? `${selectedRace.darkvision} ${t('pies', 'ft.')}`
                      : t('No tiene (Visión normal)', 'None (Normal vision)')}
                  </span>
                </div>
                <div className="bg-[#faf3e8] p-2.5 rounded-xl border border-[#d8c8af]">
                  <strong className="text-xs text-[#2c221a] block font-fantasy">{t('Idiomas Conocidos:', 'Languages Known:')}</strong>
                  <span className="text-[#6e5c4a]">
                    {selectedRace.languages && selectedRace.languages.length > 0
                      ? (isSpanish ? selectedRace.languages.join(', ') : translateLanguageList(selectedRace.languages))
                      : t('Común y 1 adicional', 'Common and 1 extra')}
                  </span>
                </div>
              </div>

              {/* Innate Spells */}
              {selectedRace.innateSpells && selectedRace.innateSpells.length > 0 && (
                <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#cfbeaa] space-y-1.5">
                  <span className="font-fantasy font-bold text-xs text-[#7d519e] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {t('Magia Innata Racial:', 'Innate Racial Magic:')}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedRace.innateSpells.map((sp, idx) => (
                      <span
                        key={idx}
                        className="bg-white/80 border border-[#e2d0f0] text-[#5b2d7d] px-2 py-0.5 rounded-md text-xs font-mono"
                      >
                        {isSpanish ? sp.spellName : translateDndTitle(sp.spellName)} ({t('Nv', 'Lv')} {sp.requiredLevel})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Traits */}
              <div className="space-y-2 pt-2 border-t border-[#ebdcc7]">
                <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                  {t('Rasgos Raciales:', 'Racial Traits:')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRace.traits.map((tr, idx) => (
                    <div key={idx} className="bg-[#faf3e8] p-2.5 rounded-xl border border-[#d8c8af]">
                      <strong className="text-xs text-[#2c221a] block">{isSpanish ? tr.name : translateDndTitle(tr.name)}</strong>
                      <p className="text-[11px] text-[#6e5c4a] mt-0.5">{isSpanish ? tr.desc : translateDndText(tr.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subraces if any */}
              {selectedRace.subraces && selectedRace.subraces.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-[#ebdcc7]">
                  <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                    {t('Subrazas y Variantes Disponibles', 'Available Subraces & Variants')} ({selectedRace.subraces.length}):
                  </h4>
                  <div className="space-y-2.5">
                    {selectedRace.subraces.map((sub) => (
                      <div key={sub.id} className="bg-[#faf3e8] p-3.5 rounded-xl border border-[#d8c8af] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                            {isSpanish ? sub.name : (sub.nameEn || translateDndTitle(sub.name))}
                          </span>
                          {sub.abilityScoreBonuses && Object.entries(sub.abilityScoreBonuses).filter(([_, v]) => Boolean(v)).length > 0 && (
                            <div className="flex gap-1">
                              {Object.entries(sub.abilityScoreBonuses)
                                .filter(([_, v]) => Boolean(v))
                                .map(([stat, val]) => (
                                  <span
                                    key={stat}
                                    className="bg-[#e4d4be] text-[#3d2c16] px-1.5 py-0.2 rounded text-[10px] font-mono font-bold"
                                  >
                                    +{val} {stat.toUpperCase()}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-[#6e5c4a] leading-relaxed">
                          {isSpanish ? sub.description : (sub.descriptionEn || translateDndText(sub.description))}
                        </p>
                        {sub.traits && sub.traits.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                            {sub.traits.map((st, sidx) => (
                              <div key={sidx} className="bg-white/60 p-2 rounded-lg border border-[#ebdcc7]">
                                <strong className="text-[11px] text-[#2c221a] block">
                                  {isSpanish ? st.name : translateDndTitle(st.name)}
                                </strong>
                                <p className="text-[10px] text-[#6e5c4a] mt-0.5">
                                  {isSpanish ? st.desc : translateDndText(st.desc)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 4: TRASFONDOS                                                */}
      {/* ==================================================================== */}
      {section === 'backgrounds' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
              {t('Trasfondos 5e', '5e Backgrounds')} ({filteredBackgrounds.length})
            </h3>
            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredBackgrounds.map((b) => {
                const isSelected = b.id === selectedBackgroundId;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBackgroundId(b.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm font-bold'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                    }`}
                  >
                    <span className="text-xs font-fantasy text-[#2c221a]">
                      {isSpanish ? b.name : (b.nameEn || translateDndTitle(b.name))}
                    </span>
                    <span className="text-[10px] text-[#786450]">
                      {isSpanish ? b.category : translateDndText(b.category)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-3">
                <div>
                  <h3 className="text-xl font-fantasy font-bold text-[#2c221a]">
                    {isSpanish ? selectedBackground.name : (selectedBackground.nameEn || translateDndTitle(selectedBackground.name))}
                  </h3>
                  <span className="text-xs text-[#8c672b] font-bold">
                    {t('Categoría:', 'Category:')} {isSpanish ? selectedBackground.category : translateDndText(selectedBackground.category)}
                  </span>
                </div>
                {selectedBackground.orientation && (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#ede1ce] text-[#5e4b37] border border-[#cfbeaa] font-bold">
                    {t('Orientación:', 'Orientation:')} {isSpanish ? selectedBackground.orientation : translateDndText(selectedBackground.orientation)}
                  </span>
                )}
              </div>

              <div className="text-xs text-[#6e5c4a] leading-relaxed whitespace-pre-line space-y-2">
                {(() => {
                  if (!isSpanish) {
                    const enBgDesc = translateBackgroundDescription(selectedBackground.id, selectedBackground.nameEn);
                    if (enBgDesc) return <p>{enBgDesc}</p>;
                  }
                  return (selectedBackground.detailedDescription || selectedBackground.description)
                    .split('\n\n')
                    .map((paragraph, pidx) => (
                      <p key={pidx}>{isSpanish ? paragraph : translateDndText(paragraph)}</p>
                    ));
                })()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#ebdcc7]">
                <div className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af]">
                  <strong className="text-xs text-[#2c221a] block mb-1 font-fantasy">{t('Competencias en Habilidades:', 'Skill Proficiencies:')}</strong>
                  <span className="text-xs text-[#6e5c4a]">
                    {selectedBackground.skillProficiencies
                      .map((sk) => (isSpanish ? sk : translateSkillName(sk)))
                      .join(', ')}
                  </span>
                </div>

                <div className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af]">
                  <strong className="text-xs text-[#2c221a] block mb-1 font-fantasy">{t('Herramientas & Idiomas:', 'Tools & Languages:')}</strong>
                  <span className="text-xs text-[#6e5c4a]">
                    {selectedBackground.toolProficiencies?.length
                      ? selectedBackground.toolProficiencies.map((tp) => (isSpanish ? tp : translateDndText(tp))).join(', ')
                      : t('Sin herramientas', 'No tools')}{' '}
                    •{' '}
                    {selectedBackground.fixedLanguages && selectedBackground.fixedLanguages.length > 0
                      ? `${isSpanish ? selectedBackground.fixedLanguages.join(', ') : translateLanguageList(selectedBackground.fixedLanguages)} (${t('Fijo', 'Fixed')})${
                          selectedBackground.languagesCount && selectedBackground.languagesCount > selectedBackground.fixedLanguages.length
                            ? ` + ${selectedBackground.languagesCount - selectedBackground.fixedLanguages.length} ${t('a tu elección', 'of your choice')}`
                            : ''
                        }`
                      : selectedBackground.languageOptions && selectedBackground.languageOptions.length > 0
                      ? `${selectedBackground.languagesCount || 1} ${t('a elegir entre:', 'choose from:')} ${isSpanish ? selectedBackground.languageOptions.join(', ') : translateLanguageList(selectedBackground.languageOptions)}`
                      : selectedBackground.languageNote
                      ? (selectedBackground.languagesCount ? `${selectedBackground.languagesCount} ${t('idiomas', 'languages')} (${isSpanish ? selectedBackground.languageNote : translateDndText(selectedBackground.languageNote)})` : (isSpanish ? selectedBackground.languageNote : translateDndText(selectedBackground.languageNote)))
                      : selectedBackground.languagesCount
                      ? `${selectedBackground.languagesCount} ${t('idiomas a tu elección', 'languages of your choice')}`
                      : t('Sin idiomas extra', 'No extra languages')}
                  </span>
                </div>
              </div>

              {/* Bonus Feat Granted by Background */}
              {(selectedBackground.bonusFeatName || selectedBackground.bonusFeatId) && (
                <div className="bg-[#fef8ea] p-4 rounded-xl border-2 border-[#b88c32] space-y-1 shadow-xs">
                  <span className="font-fantasy font-bold text-xs text-[#9c6a1e] flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#b88c32] fill-[#b88c32]" />
                    {t('Dote Oficial Otorgada:', 'Granted Official Feat:')} {isSpanish ? (selectedBackground.bonusFeatName || selectedBackground.bonusFeatId) : translateDndTitle(selectedBackground.bonusFeatName || selectedBackground.bonusFeatId || '')}
                  </span>
                  <p className="text-xs text-[#6e5c4a] leading-relaxed">
                    {t(
                      'Este trasfondo concede automáticamente una dote oficial de 5e según su manual de ambientación canónico (ej: Bigby Presents: Glory of the Giants).',
                      'This background automatically grants an official 5e feat according to its canonical setting sourcebook (e.g., Bigby Presents: Glory of the Giants).'
                    )}
                  </p>
                </div>
              )}

              {/* Suggested Equipment & Gold */}
              {(selectedBackground.suggestedEquipment || selectedBackground.gold) && (
                <div className="bg-[#f5ede0] p-3.5 rounded-xl border border-[#d8c8af] space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-[#2c221a] block font-fantasy">
                      {t('Equipo Inicial del Trasfondo:', 'Background Starting Equipment:')}
                    </strong>
                    {selectedBackground.gold > 0 && (
                      <span className="text-xs font-mono font-bold text-[#8c672b] bg-[#eddcc4] px-2 py-0.5 rounded-md border border-[#dfcbb3]">
                        {selectedBackground.gold} {t('piezas de oro (po)', 'gold pieces (gp)')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6e5c4a] leading-relaxed">
                    {selectedBackground.suggestedEquipment
                      ? (isSpanish ? selectedBackground.suggestedEquipment : translateDndText(selectedBackground.suggestedEquipment))
                      : t('Equipo básico de viajero.', 'Basic traveler equipment.')}
                  </p>
                </div>
              )}

              {selectedBackground.featureName && (
                <div className="bg-[#faf3e8] p-4 rounded-xl border border-[#c59b27] space-y-1">
                  <span className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {t('Rasgo Especial:', 'Background Feature:')} {isSpanish ? selectedBackground.featureName : translateDndTitle(selectedBackground.featureName)}
                  </span>
                  <p className="text-xs text-[#6e5c4a] leading-relaxed">
                    {selectedBackground.featureDescription
                      ? (isSpanish ? selectedBackground.featureDescription : translateDndText(selectedBackground.featureDescription))
                      : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 5: CONJUROS                                                  */}
      {/* ==================================================================== */}
      {section === 'spells' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-[#fcf9f2] p-4 rounded-xl border border-[#d8c8af]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#6e5c4a]">{t('Nivel:', 'Level:')}</span>
              <select
                value={spellLevelFilter}
                onChange={(e) =>
                  setSpellLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1 text-xs text-[#2c221a]"
              >
                <option value="all">{t('Todos los niveles', 'All levels')}</option>
                <option value={0}>{t('Trucos (Nivel 0)', 'Cantrips (Level 0)')}</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => (
                  <option key={lvl} value={lvl}>{t('Nivel', 'Level')} {lvl}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#6e5c4a]">{t('Escuela:', 'School:')}</span>
              <select
                value={spellSchoolFilter}
                onChange={(e) => setSpellSchoolFilter(e.target.value)}
                className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1 text-xs text-[#2c221a]"
              >
                <option value="all">{t('Todas las escuelas', 'All schools')}</option>
                <option value="abjuración">{t('Abjuración', 'Abjuration')}</option>
                <option value="conjuración">{t('Conjuración', 'Conjuration')}</option>
                <option value="adivinación">{t('Adivinación', 'Divination')}</option>
                <option value="encantamiento">{t('Encantamiento', 'Enchantment')}</option>
                <option value="evocación">{t('Evocación', 'Evocation')}</option>
                <option value="ilusión">{t('Ilusión', 'Illusion')}</option>
                <option value="nigromancia">{t('Nigromancia', 'Necromancy')}</option>
                <option value="transmutación">{t('Transmutación', 'Transmutation')}</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#6e5c4a]">{t('Clase:', 'Class:')}</span>
              <select
                value={spellClassFilter}
                onChange={(e) => setSpellClassFilter(e.target.value)}
                className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1 text-xs text-[#2c221a]"
              >
                <option value="all">{t('Todas las clases', 'All classes')}</option>
                <option value="mago">{t('Mago', 'Wizard')}</option>
                <option value="hechicero">{t('Hechicero', 'Sorcerer')}</option>
                <option value="brujo">{t('Brujo', 'Warlock')}</option>
                <option value="bardo">{t('Bardo', 'Bard')}</option>
                <option value="clérigo">{t('Clérigo', 'Cleric')}</option>
                <option value="druida">{t('Druida', 'Druid')}</option>
                <option value="paladín">{t('Paladín', 'Paladin')}</option>
                <option value="explorador">{t('Explorador', 'Ranger')}</option>
                <option value="artífice">{t('Artífice', 'Artificer')}</option>
              </select>
            </div>

            <span className="text-xs font-mono font-bold text-[#8c672b] ml-auto">
              {t(`Mostrando ${filteredSpells.length} conjuros`, `Showing ${filteredSpells.length} spells`)}
            </span>
          </div>

          {/* Spells Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredSpells.map((sp) => (
              <div
                key={sp.id}
                onClick={() => {
                  setSelectedSpell(sp);
                  setModalSpell(sp);
                }}
                className={`group p-3.5 rounded-xl border-2 transition cursor-pointer text-left flex flex-col justify-between ${
                  selectedSpell?.id === sp.id
                    ? 'border-[#8c672b] bg-[#faf4ea] shadow-md ring-1 ring-[#8c672b]'
                    : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#8c672b] hover:bg-[#faf4ea] hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-fantasy font-bold text-xs text-[#2c221a] group-hover:text-[#8c672b] transition-colors flex items-baseline gap-1 flex-wrap">
                      <span>{isSpanish ? sp.name : (sp.nameEn || translateDndTitle(sp.name))}</span>
                      {isSpanish && sp.nameEn && sp.nameEn.toLowerCase() !== sp.name.toLowerCase() && (
                        <span className="text-[10px] font-serif font-normal italic text-[#8c672b]">
                          ({sp.nameEn})
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-[#7d519e] bg-white/80 px-1.5 py-0.5 rounded border border-[#e2d0f0] shrink-0 font-bold">
                      {sp.level === 0 ? t('Truco', 'Cantrip') : `${t('Nv', 'Lv')} ${sp.level}`}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#786450] mt-1 flex flex-wrap items-center gap-1.5">
                    <span>{isSpanish ? sp.school : translateSpellSchool(sp.school)}</span>
                    <span>•</span>
                    <span>{isSpanish ? sp.castingTime : (sp.castingTimeEn || translateSpellMeta(sp.castingTime))}</span>
                    <span>•</span>
                    <span>{isSpanish ? sp.range : (sp.rangeEn || translateSpellMeta(sp.range))}</span>
                    {sp.concentration && (
                      <span className="bg-[#fcedeb] text-[#a13b34] text-[9px] px-1 rounded border border-[#f0c2bd] font-semibold" title={t('Concentración', 'Concentration')}>
                        C
                      </span>
                    )}
                    {sp.ritual && (
                      <span className="bg-[#edf4fc] text-[#2c588a] text-[9px] px-1 rounded border border-[#c1d9f4] font-semibold" title="Ritual">
                        R
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6e5c4a] line-clamp-2 mt-1.5 leading-snug">
                    {isSpanish ? sp.description : (sp.descriptionEn || translateDndText(sp.description))}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#ebdcc7]/70 flex items-center justify-between text-[10px] text-[#8c672b] font-medium group-hover:text-[#5e4113]">
                  <span className="flex items-center gap-1 font-fantasy">
                    <Eye className="w-3.5 h-3.5 text-[#b88c32]" /> {t('Ver info completa', 'View full details')}
                  </span>
                  <span className="text-[11px] font-mono opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 6: DOTES                                                     */}
      {/* ==================================================================== */}
      {section === 'feats' && (
        <div className="space-y-4">
          {/* Filters Bar for Feats */}
          <div className="flex flex-wrap items-center gap-3 bg-[#fcf9f2] p-4 rounded-xl border border-[#d8c8af]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#6e5c4a]">{t('Categoría:', 'Category:')}</span>
              <select
                value={featCategoryFilter}
                onChange={(e) => setFeatCategoryFilter(e.target.value)}
                className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1 text-xs text-[#2c221a]"
              >
                <option value="all">{t('Todas las categorías', 'All categories')}</option>
                <option value="Combate">{t('Combate', 'Combat')}</option>
                <option value="Magia">{t('Magia', 'Magic')}</option>
                <option value="Utilidad">{t('Utilidad', 'Utility')}</option>
                <option value="General">{t('General', 'General')}</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#6e5c4a]">{t('Prerrequisito:', 'Prerequisite:')}</span>
              <select
                value={featPrereqFilter}
                onChange={(e) => setFeatPrereqFilter(e.target.value as any)}
                className="bg-white border border-[#cfbeaa] rounded-lg px-2.5 py-1 text-xs text-[#2c221a]"
              >
                <option value="all">{t('Todos los dotes', 'All feats')}</option>
                <option value="without">{t('Sin prerrequisito (Universales)', 'No prerequisite (Universal)')}</option>
                <option value="with">{t('Con prerrequisito', 'With prerequisite')}</option>
              </select>
            </div>

            <span className="text-xs font-mono font-bold text-[#8c672b] ml-auto">
              {t(`Mostrando ${filteredFeats.length} dotes oficiales`, `Showing ${filteredFeats.length} official feats`)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Feats Sidebar List */}
            <div className="lg:col-span-1 space-y-2">
              <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
                {t('Lista de Dotes', 'Feats List')} ({filteredFeats.length})
              </h3>
              <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
                {filteredFeats.map((f) => {
                  const isSelected = selectedFeat?.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFeat(f)}
                      className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'border-[#8c672b] bg-[#f5ede0] shadow-sm font-bold ring-1 ring-[#8c672b]'
                          : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-fantasy text-[#2c221a] leading-tight">
                          {isSpanish ? f.name : (f.nameEn || translateDndTitle(f.name))}
                        </span>
                        {f.prerequisite && (
                          <span className="text-[9px] text-[#8c672b] bg-[#eddcc4] px-1 rounded font-mono shrink-0">
                            Req
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#786450]">
                        <span className="italic">{isSpanish ? f.category : (FEAT_CATEGORY_EN[f.category] || f.category)}</span>
                        {f.abilityBonus && (
                          <span className="text-[#3b663b] font-mono font-bold">+1 Stat</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feat Detailed Card */}
            <div className="lg:col-span-3 space-y-4">
              {selectedFeat ? (() => {
                const wikiFeat = !isSpanish
                  ? ALL_WIKIDOT_FEATS.find(
                      (wf) =>
                        (wf.id && wf.id.toLowerCase() === selectedFeat.id.toLowerCase()) ||
                        (wf.nameEn && wf.nameEn.toLowerCase() === (selectedFeat.nameEn || selectedFeat.name).toLowerCase()) ||
                        (wf.name && wf.name.toLowerCase().includes((selectedFeat.nameEn || selectedFeat.name).toLowerCase()))
                    )
                  : null;
                const featDesc = isSpanish ? selectedFeat.description : (wikiFeat?.description || translateDndText(selectedFeat.description));
                const featBenefits = isSpanish
                  ? selectedFeat.benefits
                  : (wikiFeat?.benefits && wikiFeat.benefits.length > 0 ? wikiFeat.benefits : selectedFeat.benefits.map(translateDndText));
                const featPrereq = selectedFeat.prerequisite
                  ? (isSpanish ? selectedFeat.prerequisite : (wikiFeat?.prerequisite || translateDndText(selectedFeat.prerequisite)))
                  : undefined;

                return (
                <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-5">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebdcc7] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-fantasy font-bold text-[#2c221a]">
                          {isSpanish ? selectedFeat.name : (selectedFeat.nameEn || translateDndTitle(selectedFeat.name))}
                        </h3>
                      </div>
                      {isSpanish && (
                        <span className="text-xs text-[#786450] italic block mt-0.5">
                          Nombre Original en Inglés: {selectedFeat.nameEn}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-fantasy font-bold bg-[#efe5d5] text-[#5c4625] border border-[#d8c8af]">
                        {selectedFeat.category === 'Combate' && '⚔️ '}
                        {selectedFeat.category === 'Magia' && '✨ '}
                        {selectedFeat.category === 'Utilidad' && '🛠️ '}
                        {selectedFeat.category === 'General' && '🌟 '}
                        {isSpanish
                          ? `Dote de ${selectedFeat.category}`
                          : `${FEAT_CATEGORY_EN[selectedFeat.category] || selectedFeat.category} Feat`}
                      </span>

                      {featPrereq ? (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#faecd6] text-[#8c591a] border border-[#e0bf79]">
                          ⚠️ {t('Requiere:', 'Requires:')} {featPrereq}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7]">
                          ✓ {t('Sin Prerrequisitos', 'No Prerequisites')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lore / Description */}
                  <div className="p-3.5 bg-[#fbf5eb] border-l-4 border-[#8c672b] rounded-r-xl italic text-xs text-[#5e4b37] leading-relaxed">
                    "{featDesc}"
                  </div>

                  {/* Ability Score Bonus Banner if any */}
                  {selectedFeat.abilityBonus && (
                    <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#8c672b] text-white flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-xs text-[#2c221a] block font-fantasy">
                          {t('Mejora de Característica (Half-Feat)', 'Ability Score Increase (Half-Feat)')}
                        </strong>
                        <p className="text-xs text-[#6e5c4a]">
                          {t('Aumentas tu ', 'Increase your ')}
                          <span className="font-bold text-[#8c672b]">
                            {selectedFeat.abilityBonus.stats
                              ? selectedFeat.abilityBonus.stats
                                  .map((st) => {
                                    const mapEs: Record<string, string> = {
                                      str: 'Fuerza',
                                      dex: 'Destreza',
                                      con: 'Constitución',
                                      int: 'Inteligencia',
                                      wis: 'Sabiduría',
                                      cha: 'Carisma',
                                    };
                                    const mapEn: Record<string, string> = {
                                      str: 'Strength',
                                      dex: 'Dexterity',
                                      con: 'Constitution',
                                      int: 'Intelligence',
                                      wis: 'Wisdom',
                                      cha: 'Charisma',
                                    };
                                    return (isSpanish ? mapEs[st] : mapEn[st]) || st;
                                  })
                                  .join(selectedFeat.abilityBonus.flexible ? t(' o ', ' or ') : t(' y ', ' and '))
                              : t('Característica', 'Ability Score')}
                          </span>{' '}
                          {t('en ', 'by ')}
                          <span className="font-bold font-mono">+{selectedFeat.abilityBonus.amount}</span>{' '}
                          {t('(hasta un máximo de 20).', '(to a maximum of 20).')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Mechanical Benefits */}
                  <div className="space-y-3">
                    <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b] tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#8c672b]" /> {t('Beneficios y Reglas Oficiales 5e:', 'Official 5e Benefits & Rules:')}
                    </h4>
                    <div className="space-y-2">
                      {featBenefits.map((b, idx) => (
                        <div
                          key={idx}
                          className="bg-[#faf3e8] p-3.5 rounded-xl border border-[#d8c8af] flex items-start gap-3 shadow-2xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#8c672b]/15 text-[#8c672b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-[#3b2b1b] leading-relaxed font-sans font-medium">
                            {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subchoices / Customizations if any */}
                  {selectedFeat.subChoice && (
                    <div className="space-y-3 pt-3 border-t border-[#ebdcc7]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                            {isSpanish ? selectedFeat.subChoice.title : translateDndTitle(selectedFeat.subChoice.title)}
                          </h4>
                          <p className="text-xs text-[#6e5c4a] mt-0.5">
                            {isSpanish ? selectedFeat.subChoice.description : translateDndText(selectedFeat.subChoice.description || '')}
                          </p>
                        </div>
                        <span className="text-xs font-mono font-bold bg-[#ede1ce] text-[#5e4b37] px-2.5 py-1 rounded-lg border border-[#cfbeaa]">
                          {t(`Elige hasta ${selectedFeat.subChoice.maxSelections}`, `Choose up to ${selectedFeat.subChoice.maxSelections}`)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[450px] overflow-y-auto pr-1">
                        {selectedFeat.subChoice.options.map((opt) => (
                          <div
                            key={opt.id}
                            className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af] space-y-1"
                          >
                            <strong className="text-xs text-[#2c221a] block font-fantasy">
                              {isSpanish ? opt.name : translateDndTitle(opt.name)}
                            </strong>
                            <p className="text-[11px] text-[#6e5c4a] leading-snug">
                              {isSpanish ? opt.desc : translateDndText(opt.desc)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })() : (
                <div className="p-8 text-center text-xs text-[#8c7b69] bg-[#fcf9f2] rounded-2xl border-2 border-dashed border-[#d8c8af]">
                  {t('Selecciona una dote de la lista para consultar todos sus detalles y mecánicas oficiales.', 'Select a feat from the list to view all its official details and mechanics.')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 7: ARMAS & ARMADURAS                                         */}
      {/* ==================================================================== */}
      {section === 'equipment' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEquipmentType('weapons')}
                className={`px-4 py-1.5 rounded-xl text-xs font-fantasy font-bold transition cursor-pointer ${
                  equipmentType === 'weapons'
                    ? 'bg-[#8c672b] text-white shadow-xs'
                    : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce]'
                }`}
              >
                {t('Armas', 'Weapons')} ({allWeapons.length})
              </button>
              <button
                onClick={() => setEquipmentType('armors')}
                className={`px-4 py-1.5 rounded-xl text-xs font-fantasy font-bold transition cursor-pointer ${
                  equipmentType === 'armors'
                    ? 'bg-[#8c672b] text-white shadow-xs'
                    : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce]'
                }`}
              >
                {t('Armaduras & Escudos', 'Armor & Shields')} ({allArmors.length})
              </button>
              {onOpenEquipmentBuilder && (
                <button
                  type="button"
                  onClick={() => onOpenEquipmentBuilder(null, null)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#b88c32] via-[#dfbe7e] to-[#b88c32] hover:brightness-110 text-[#1a1006] text-xs font-bold font-fantasy shadow-sm transition cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-[#1a1006]" />
                  <span>{t('Forjar Arma o Armadura', 'Forge Weapon or Armor')}</span>
                </button>
              )}
            </div>

            <div className="text-[11px] text-[#786450] italic font-mono">
              {equipmentType === 'weapons'
                ? t('Propiedades: Sutil (Fue o Des) • Versátil (1 o 2 manos) • Pesada • Alcance (+5 pies)', 'Properties: Finesse (STR or DEX) • Versatile (1 or 2 hands) • Heavy • Reach (+5 ft.)')
                : t('Reglas CA: Ligera (CA + Des) • Media (CA + Des máx +2) • Pesada (CA fija)', 'AC Rules: Light (AC + DEX) • Medium (AC + DEX max +2) • Heavy (Fixed AC)')}
            </div>
          </div>

          {equipmentType === 'weapons' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[700px] overflow-y-auto pr-1">
              {filteredWeapons.map((w) => (
                <div
                  key={w.id}
                  className="bg-[#fcf9f2] p-3.5 rounded-xl border border-[#d8c8af] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <EquipmentBadge name={w.name} category={w.category} size="md" />
                      <span className="font-fantasy font-bold text-xs text-[#2c221a] truncate">
                        {isSpanish ? w.name : (w.nameEn || translateDndTitle(w.name))}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8c672b] shrink-0">
                      {w.damageDice} {isSpanish ? w.damageType : translateDndText(w.damageType)}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#786450]">
                    {isSpanish ? w.range : translateDndText(w.range)} • {w.weight} • {isSpanish ? w.cost : w.cost.replace(/po/g, 'gp').replace(/pp/g, 'sp').replace(/pc/g, 'cp')}
                  </div>
                  <div className="text-[10px] text-[#5c3a70] font-semibold">
                    {t('Propiedades:', 'Properties:')} {w.properties.map((p) => (isSpanish ? p : translateDndText(p))).join(', ')}
                  </div>
                  <p className="text-[11px] text-[#6e5c4a] leading-snug">
                    {isSpanish ? w.description : translateDndText(w.description)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[700px] overflow-y-auto pr-1">
              {filteredArmors.map((a) => (
                <div
                  key={a.id}
                  className="bg-[#fcf9f2] p-3.5 rounded-xl border border-[#d8c8af] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <EquipmentBadge name={a.name} category={a.category} size="md" />
                      <span className="font-fantasy font-bold text-xs text-[#2c221a] truncate">
                        {isSpanish ? a.name : (a.nameEn || translateDndTitle(a.name))}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8c672b] shrink-0">
                      {t('CA', 'AC')} {a.baseAc}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#786450]">
                    {t('Tipo:', 'Type:')} {isSpanish ? a.category : translateDndText(a.category)} • {t('Peso:', 'Weight:')} {a.weight} • {t('Coste:', 'Cost:')} {isSpanish ? a.cost : a.cost.replace(/po/g, 'gp').replace(/pp/g, 'sp').replace(/pc/g, 'cp')}
                  </div>
                  {a.stealthDisadvantage && (
                    <span className="text-[10px] text-[#a8423d] font-bold block">
                      ⚠️ {t('Desventaja en Sigilo', 'Stealth Disadvantage')}
                    </span>
                  )}
                  <p className="text-[11px] text-[#6e5c4a] leading-snug">
                    {isSpanish ? a.description : translateDndText(a.description)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 8: CONDICIONES & REGLAS TÁCTICAS                             */}
      {/* ==================================================================== */}
      {section === 'conditions' && (
        <div className="space-y-6">
          {/* Sub Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#fcf9f2] p-4 rounded-2xl border border-[#d8c8af]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConditionsTab('conditions')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer ${
                  conditionsTab === 'conditions'
                    ? 'bg-[#8c672b] text-white shadow-sm'
                    : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce]'
                }`}
              >
                {t('Condiciones Oficiales', 'Official Conditions')} ({filteredConditions.length})
              </button>
              <button
                onClick={() => setConditionsTab('tactical')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer ${
                  conditionsTab === 'tactical'
                    ? 'bg-[#8c672b] text-white shadow-sm'
                    : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce]'
                }`}
              >
                {t('Reglas Tácticas Esenciales', 'Essential Tactical Rules')} ({filteredTacticalRules.length})
              </button>
            </div>

            {conditionsTab === 'tactical' && (
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {(['all', 'Combate', 'Magia', 'Descanso'] as const).map((cat) => {
                  const catLabelEn: Record<string, string> = {
                    all: 'All Rules',
                    Combate: 'Combat',
                    Magia: 'Magic',
                    Descanso: 'Rest',
                  };
                  return (
                    <button
                      key={cat}
                      onClick={() => setTacticalCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-sans transition cursor-pointer ${
                        tacticalCategoryFilter === cat
                          ? 'bg-[#5c3a70] text-white font-bold'
                          : 'bg-[#ede1ce] text-[#786450] hover:bg-[#dfbe7e]/30'
                      }`}
                    >
                      {isSpanish ? (cat === 'all' ? 'Todas las Reglas' : cat) : catLabelEn[cat]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tab 1: Condiciones */}
          {conditionsTab === 'conditions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConditions.map((cond) => {
                const condEn = CONDITIONS_EN[cond.id];
                const condTitle = isSpanish ? cond.name : cond.nameEn;
                const condSummary = isSpanish ? cond.summary : (condEn?.summary || translateDndText(cond.summary));
                const condEffects = isSpanish ? cond.effects : (condEn?.effects || cond.effects.map(translateDndText));

                return (
                  <div
                    key={cond.id}
                    className="bg-[#faf3e8] rounded-2xl border-2 border-[#d8c8af] p-5 shadow-sm hover:border-[#b88c32] hover:shadow-md transition space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2 border-b border-[#d8c8af]/60 pb-2">
                        <div>
                          <h4 className="font-fantasy font-bold text-sm text-[#2c221a]">
                            {condTitle}
                          </h4>
                          <span className="text-[10px] text-[#8c7b69] font-mono uppercase tracking-wider">
                            {isSpanish ? `Estado Oficial 5e • ${cond.nameEn}` : 'Official 5e Condition'}
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-lg bg-[#a8423d]/10 text-[#a8423d] flex items-center justify-center shrink-0 border border-[#a8423d]/20">
                          <ShieldAlert className="w-4 h-4" />
                        </span>
                      </div>

                      <p className="text-xs text-[#5c3a70] font-medium bg-[#5c3a70]/5 p-2 rounded-lg border border-[#5c3a70]/10">
                        {condSummary}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-fantasy font-bold uppercase tracking-wider text-[#786450]">
                          {t('Efectos Mecánicos:', 'Mechanical Effects:')}
                        </span>
                        <ul className="space-y-1 text-xs text-[#4a3b32]">
                          {condEffects.map((eff, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                              <span className="text-[#a8423d] font-bold shrink-0">•</span>
                              <span>{eff}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setInspectData({
                          title: condTitle,
                          englishTitle: isSpanish ? cond.nameEn : undefined,
                          category: t('Condición Oficial 5e', 'Official 5e Condition'),
                          iconType: 'feature',
                          description: condSummary,
                          benefits: condEffects,
                          badges: [{ label: t('Tipo', 'Type'), value: t('Condición de Combate', 'Combat Condition'), variant: 'amber' }],
                        })
                      }
                      className="w-full mt-2 py-1.5 text-center text-xs font-fantasy font-bold bg-[#fcf9f2] text-[#8c672b] hover:bg-[#8c672b] hover:text-white rounded-lg border border-[#d8c8af] transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {t('Inspeccionar en Pergamino', 'Inspect on Scroll')}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Reglas Tácticas */}
          {conditionsTab === 'tactical' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTacticalRules.map((rule) => {
                const ruleEn = TACTICAL_RULES_EN[rule.id];
                const ruleTitle = isSpanish ? rule.title : (ruleEn?.title || translateDndTitle(rule.title));
                const ruleCategory = isSpanish ? rule.category : (ruleEn?.category || rule.category);
                const ruleSummary = isSpanish ? rule.summary : (ruleEn?.summary || translateDndText(rule.summary));
                const ruleDetails = isSpanish ? rule.details : (ruleEn?.details || rule.details.map(translateDndText));

                return (
                  <div
                    key={rule.id}
                    className="bg-[#faf3e8] rounded-2xl border-2 border-[#d8c8af] p-5 shadow-sm hover:border-[#b88c32] hover:shadow-md transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#d8c8af]/60 pb-2">
                      <div>
                        <h4 className="font-fantasy font-bold text-sm text-[#2c221a]">
                          {ruleTitle}
                        </h4>
                        <span className="text-[10px] text-[#8c7b69] font-mono uppercase tracking-wider">
                          {t('Regla Táctica Oficial', 'Official Tactical Rule')}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8c672b]/15 text-[#8c672b] border border-[#8c672b]/30">
                        {ruleCategory}
                      </span>
                    </div>

                    <p className="text-xs text-[#2c221a] font-medium bg-[#8c672b]/5 p-2 rounded-lg border border-[#8c672b]/10">
                      {ruleSummary}
                    </p>

                    <ul className="space-y-1.5 text-xs text-[#4a3b32] pt-1">
                      {ruleDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-[#8c672b] font-bold shrink-0">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 9: OBJETOS MÁGICOS                                           */}
      {/* ==================================================================== */}
      {section === 'magic-items' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-[#fcf9f2] p-4 rounded-2xl border border-[#d8c8af] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#786450]">
                {t(`Filtros de Objetos Mágicos (${filteredMagicItems.length} encontrados)`, `Magic Item Filters (${filteredMagicItems.length} found)`)}
              </span>

              {/* Attunement Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] text-[#8c7b69]">{t('Sintonización:', 'Attunement:')}</span>
                <button
                  onClick={() => setMagicItemAttunementFilter('all')}
                  className={`px-2 py-1 rounded text-[11px] transition cursor-pointer ${
                    magicItemAttunementFilter === 'all'
                      ? 'bg-[#8c672b] text-white font-bold'
                      : 'bg-[#faf3e8] text-[#6e5c4a]'
                  }`}
                >
                  {t('Todos', 'All')}
                </button>
                <button
                  onClick={() => setMagicItemAttunementFilter('yes')}
                  className={`px-2 py-1 rounded text-[11px] transition cursor-pointer ${
                    magicItemAttunementFilter === 'yes'
                      ? 'bg-[#5c3a70] text-white font-bold'
                      : 'bg-[#faf3e8] text-[#6e5c4a]'
                  }`}
                >
                  {t('Requiere Sintonización', 'Requires Attunement')}
                </button>
                <button
                  onClick={() => setMagicItemAttunementFilter('no')}
                  className={`px-2 py-1 rounded text-[11px] transition cursor-pointer ${
                    magicItemAttunementFilter === 'no'
                      ? 'bg-[#2b6748] text-white font-bold'
                      : 'bg-[#faf3e8] text-[#6e5c4a]'
                  }`}
                >
                  {t('Sin Sintonización', 'No Attunement')}
                </button>
              </div>
            </div>

            {/* Rarity Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-[#8c7b69] shrink-0">{t('Rareza:', 'Rarity:')}</span>
              {(['all', 'Común', 'Poco Común', 'Raro', 'Muy Raro', 'Legendario', 'Artefacto'] as const).map(
                (rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setMagicItemRarityFilter(rarity)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-sans transition cursor-pointer shrink-0 ${
                      magicItemRarityFilter === rarity
                        ? 'bg-[#8c672b] text-white font-bold shadow-sm'
                        : 'bg-[#ede1ce] text-[#786450] hover:bg-[#dfbe7e]/30'
                    }`}
                  >
                    {rarity === 'all'
                      ? t('Todas', 'All')
                      : isSpanish
                      ? rarity
                      : MAGIC_ITEM_RARITY_EN[rarity] || rarity}
                  </button>
                )
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-[#8c7b69] shrink-0">{t('Categoría:', 'Category:')}</span>
              {(
                [
                  'all',
                  'Arma',
                  'Armadura',
                  'Poción',
                  'Anillo',
                  'Vara o Varita',
                  'Bastón',
                  'Objeto Maravilloso',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMagicItemCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-sans transition cursor-pointer shrink-0 ${
                    magicItemCategoryFilter === cat
                      ? 'bg-[#5c3a70] text-white font-bold shadow-sm'
                      : 'bg-[#ede1ce] text-[#786450] hover:bg-[#dfbe7e]/30'
                  }`}
                >
                  {cat === 'all'
                    ? t('Todas', 'All')
                    : isSpanish
                    ? cat
                    : MAGIC_ITEM_CATEGORY_EN[cat] || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Magic Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMagicItems.map((item) => {
              const rarityColors: Record<MagicItemRarity, { bg: string; text: string; border: string }> = {
                Común: { bg: 'bg-[#6b7280]/15', text: 'text-[#4b5563]', border: 'border-[#9ca3af]/40' },
                'Poco Común': { bg: 'bg-[#10b981]/15', text: 'text-[#047857]', border: 'border-[#10b981]/40' },
                Raro: { bg: 'bg-[#3b82f6]/15', text: 'text-[#1d4ed8]', border: 'border-[#3b82f6]/40' },
                'Muy Raro': { bg: 'bg-[#8b5cf6]/15', text: 'text-[#6d28d9]', border: 'border-[#8b5cf6]/40' },
                Legendario: { bg: 'bg-[#f59e0b]/15', text: 'text-[#b45309]', border: 'border-[#f59e0b]/40' },
                Artefacto: { bg: 'bg-[#ef4444]/15', text: 'text-[#b91c1c]', border: 'border-[#ef4444]/40' },
              };
              const rStyle = rarityColors[item.rarity] || rarityColors['Común'];
              const itemTitle = isSpanish ? item.name : (item.nameEn || translateDndTitle(item.name));
              const itemRarityDisplay = isSpanish ? item.rarity : (MAGIC_ITEM_RARITY_EN[item.rarity] || item.rarity);
              const itemCatDisplay = isSpanish ? item.category : (MAGIC_ITEM_CATEGORY_EN[item.category] || item.category);
              const itemSummaryDisplay = isSpanish ? item.summary : translateDndText(item.summary);
              const itemDescDisplay = isSpanish ? item.description : translateDndText(item.description);
              const itemEffectsDisplay = item.effects.map((eff) => (isSpanish ? eff : translateDndText(eff)));

              return (
                <div
                  key={item.id}
                  className="bg-[#faf3e8] rounded-2xl border-2 border-[#d8c8af] p-5 shadow-sm hover:border-[#b88c32] hover:shadow-md transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 border-b border-[#d8c8af]/60 pb-2">
                      <div>
                        <h4 className="font-fantasy font-bold text-sm text-[#2c221a]">
                          {itemTitle}
                        </h4>
                        {isSpanish && (
                          <span className="text-[10px] text-[#8c7b69] font-mono tracking-wider">
                            {item.nameEn}
                          </span>
                        )}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${rStyle.bg} ${rStyle.text} ${rStyle.border} shrink-0`}
                      >
                        {itemRarityDisplay}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 bg-[#d8c8af]/40 text-[#4a3b32] rounded font-semibold">
                        {itemCatDisplay}
                      </span>
                      {item.attunement ? (
                        <span className="px-2 py-0.5 bg-[#5c3a70]/15 text-[#5c3a70] rounded font-semibold border border-[#5c3a70]/30">
                          ✨ {t('Sintonización', 'Requires Attunement')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#2b6748]/15 text-[#2b6748] rounded font-semibold border border-[#2b6748]/30">
                          ✓ {t('No requiere sintonización', 'No Attunement Required')}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#5c3a70] font-medium bg-[#5c3a70]/5 p-2 rounded-lg border border-[#5c3a70]/10">
                      {itemSummaryDisplay}
                    </p>

                    <p className="text-[11px] text-[#6e5c4a] italic leading-snug">
                      "{itemDescDisplay}"
                    </p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-fantasy font-bold uppercase tracking-wider text-[#786450]">
                        {t('Efectos y Propiedades:', 'Effects & Properties:')}
                      </span>
                      <ul className="space-y-1 text-xs text-[#4a3b32]">
                        {itemEffectsDisplay.map((eff, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-[#8c672b] font-bold shrink-0">•</span>
                            <span>{eff}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setInspectData({
                        title: itemTitle,
                        englishTitle: isSpanish ? item.nameEn : undefined,
                        category: `${t('Objeto Mágico', 'Magic Item')} • ${itemCatDisplay}`,
                        iconType: 'generic',
                        description: itemSummaryDisplay,
                        quote: itemDescDisplay,
                        benefits: itemEffectsDisplay,
                        badges: [
                          { label: t('Rareza', 'Rarity'), value: itemRarityDisplay, variant: 'gold' },
                          { label: t('Categoría', 'Category'), value: itemCatDisplay, variant: 'neutral' },
                          {
                            label: t('Sintonización', 'Attunement'),
                            value: item.attunement ? t('Sí', 'Yes') : 'No',
                            variant: item.attunement ? 'amber' : 'green',
                          },
                        ],
                      })
                    }
                    className="w-full mt-2 py-1.5 text-center text-xs font-fantasy font-bold bg-[#fcf9f2] text-[#8c672b] hover:bg-[#8c672b] hover:text-white rounded-lg border border-[#d8c8af] transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {t('Inspeccionar en Pergamino', 'Inspect on Scroll')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 10: BESTIARIO SRD (SOLO DUNGEON MASTER)                      */}
      {/* ==================================================================== */}
      {isDm && section === 'bestiary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Monster Selector & Filters */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-[#fcf9f2] p-3.5 rounded-2xl border border-[#d8c8af] space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#ebdcc7]">
                <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#786450]">
                  {t('Criaturas', 'Creatures')} ({filteredMonsters.length})
                </span>
                <div className="flex items-center gap-1.5">
                  {onOpenMonsterBuilder && (
                    <button
                      type="button"
                      onClick={() => onOpenMonsterBuilder(null)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#8c672b] to-[#b88c32] hover:brightness-110 text-white text-[11px] font-bold font-fantasy shadow-xs transition cursor-pointer"
                      title={t('Crear un nuevo monstruo o statblock personalizado', 'Create a new custom monster or statblock')}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{t('Crear Statblock', 'Create Statblock')}</span>
                    </button>
                  )}
                  {onOpenImporter && (
                    <button
                      type="button"
                      onClick={onOpenImporter}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#2e1908] hover:bg-[#42250d] border border-[#a87c2b]/60 text-[#dfbe7e] text-[11px] font-bold font-fantasy shadow-xs transition cursor-pointer"
                      title={t('Importar Monstruos desde Obsidian Vault o Markdown', 'Import Monsters from Obsidian Vault or Markdown')}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Vault</span>
                    </button>
                  )}
                </div>
              </div>

              {/* CR Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] text-[#8c7b69] shrink-0 font-bold">{t('VD (CR):', 'CR:')}</span>
                {(['all', '0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '15', '16', '17', '18', '19', '20', '21', '23', '30'] as const).map(
                  (crVal) => (
                    <button
                      key={crVal}
                      onClick={() => setMonsterCrFilter(crVal)}
                      className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer shrink-0 ${
                        monsterCrFilter === crVal
                          ? 'bg-[#8c672b] text-white font-bold'
                          : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce]'
                      }`}
                    >
                      {crVal === 'all' ? t('Todos', 'All') : crVal}
                    </button>
                  )
                )}
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] text-[#8c7b69] shrink-0 font-bold">{t('Tipo:', 'Type:')}</span>
                {(
                  [
                    'all',
                    'Aberración',
                    'Bestia',
                    'Celestial',
                    'Constructo',
                    'Dragón',
                    'Elemental',
                    'Feérico',
                    'Infernal',
                    'Gigante',
                    'Humanoide',
                    'Monstruosidad',
                    'Cieno',
                    'Planta',
                    'No-muerto',
                  ] as const
                ).map((mType) => (
                  <button
                    key={mType}
                    onClick={() => setMonsterTypeFilter(mType)}
                    className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer shrink-0 ${
                      monsterTypeFilter === mType
                        ? 'bg-[#5c3a70] text-white font-bold shadow-xs'
                        : 'bg-[#faf3e8] text-[#6e5c4a] hover:bg-[#ede1ce]'
                    }`}
                  >
                    {mType === 'all'
                      ? t('Todos', 'All')
                      : isSpanish
                      ? mType
                      : MONSTER_TYPE_EN[mType] || mType}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Monsters */}
            <div className="space-y-1.5 max-h-[650px] overflow-y-auto pr-1">
              {filteredMonsters.map((monster) => {
                const isSelected = selectedMonster?.id === monster.id;
                const mSizeDisplay = isSpanish ? monster.size : (MONSTER_SIZE_EN[monster.size] || monster.size);
                const mTypeDisplay = isSpanish ? monster.type : (MONSTER_TYPE_EN[monster.type] || translateDndText(monster.type));
                return (
                  <button
                    key={monster.id}
                    onClick={() => setSelectedMonster(monster)}
                    className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#8c672b] text-white border-[#5a421b] shadow-md ring-2 ring-[#c59b27]/40'
                        : 'bg-[#faf3e8] text-[#2c221a] border-[#d8c8af] hover:bg-[#ede1ce]'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-fantasy font-bold text-xs truncate">
                        {isSpanish ? monster.name : translateDndTitle(monster.name)}
                      </h4>
                      <p
                        className={`text-[10px] truncate ${
                          isSelected ? 'text-[#f5ebdc]' : 'text-[#786450]'
                        }`}
                      >
                        {mSizeDisplay} {mTypeDisplay}
                      </p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 text-right">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-[#5a421b] text-[#ffd56b]'
                            : 'bg-[#8c672b]/15 text-[#8c672b]'
                        }`}
                      >
                        CR {monster.cr}
                      </span>
                      <span
                        className={`text-[9px] ${
                          isSelected ? 'text-[#f5ebdc]' : 'text-[#8c7b69]'
                        }`}
                      >
                        {t('CA', 'AC')} {monster.ac} • {monster.hp} {t('PG', 'HP')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full D&D 5e Statblock Display */}
          <div className="lg:col-span-2">
            {selectedMonster ? (
              <div className="bg-[#faf3e8] rounded-2xl border-2 border-[#b88c32] p-6 shadow-md space-y-4 font-serif text-[#2c221a]">
                {/* Header */}
                <div className="border-b-2 border-[#8c672b]/30 pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-fantasy text-[#7a201c] tracking-wide">
                        {isSpanish ? selectedMonster.name : translateDndTitle(selectedMonster.name)}
                      </h3>
                      <p className="text-xs italic text-[#6e5c4a]">
                        {isSpanish ? selectedMonster.size : (MONSTER_SIZE_EN[selectedMonster.size] || selectedMonster.size)}{' '}
                        {isSpanish ? selectedMonster.type : (MONSTER_TYPE_EN[selectedMonster.type] || translateDndText(selectedMonster.type))},{' '}
                        {isSpanish ? selectedMonster.alignment : translateDndText(selectedMonster.alignment)}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#7a201c] text-white shadow-sm inline-block">
                        {t('VD / CR', 'CR')} {selectedMonster.cr} ({selectedMonster.xp?.toLocaleString()} {t('PX', 'XP')})
                      </span>
                      {onOpenMonsterBuilder && (
                        <button
                          type="button"
                          onClick={() => onOpenMonsterBuilder(selectedMonster)}
                          className="px-2.5 py-1 rounded-lg bg-[#2e1908] hover:bg-[#452712] border border-[#a87c2b] text-[#ffd56b] text-xs font-bold font-fantasy flex items-center gap-1 shadow-xs transition cursor-pointer"
                          title={t('Editar este statblock', 'Edit this statblock')}
                        >
                          <Edit2 className="w-3 h-3 text-[#ffd56b]" />
                          <span>{t('Editar', 'Edit')}</span>
                        </button>
                      )}
                      {onDeleteMonster && ((selectedMonster as any).isCustom || !SRD_MONSTERS_COMPENDIUM.some((s) => s.id === selectedMonster.id)) && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(t(`¿Eliminar el monstruo "${selectedMonster.name}"?`, `Delete monster "${selectedMonster.name}"?`))) {
                              onDeleteMonster(selectedMonster.id);
                            }
                          }}
                          className="p-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-bold shadow-xs transition cursor-pointer"
                          title={t('Eliminar este monstruo', 'Delete this monster')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Combat Stats: AC, HP, Speed */}
                <div className="space-y-1 text-xs border-b border-[#d8c8af] pb-3">
                  <div className="flex items-center gap-1.5">
                    <strong className="text-[#7a201c] font-fantasy">{t('Clase de Armadura:', 'Armor Class:')}</strong>
                    <span>
                      {selectedMonster.ac} {selectedMonster.acDescription ? `(${isSpanish ? selectedMonster.acDescription : translateDndText(selectedMonster.acDescription)})` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-[#7a201c] font-fantasy">{t('Puntos de Golpe:', 'Hit Points:')}</strong>
                    <span>
                      {selectedMonster.hp} {selectedMonster.hitDice ? `(${selectedMonster.hitDice})` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-[#7a201c] font-fantasy">{t('Velocidad:', 'Speed:')}</strong>
                    <span>{isSpanish ? selectedMonster.speed : translateDndText(selectedMonster.speed)}</span>
                  </div>
                </div>

                {/* Abilities Table */}
                <div className="grid grid-cols-6 gap-2 text-center py-2 px-3 bg-[#ede1ce]/50 rounded-xl border border-[#d8c8af]">
                  {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((statKey) => {
                    const val = selectedMonster.stats[statKey];
                    const mod = Math.floor((val - 10) / 2);
                    const modSign = mod >= 0 ? `+${mod}` : `${mod}`;
                    const labelsEs: Record<string, string> = {
                      str: 'FUE',
                      dex: 'DES',
                      con: 'CON',
                      int: 'INT',
                      wis: 'SAB',
                      cha: 'CAR',
                    };
                    const labelsEn: Record<string, string> = {
                      str: 'STR',
                      dex: 'DEX',
                      con: 'CON',
                      int: 'INT',
                      wis: 'WIS',
                      cha: 'CHA',
                    };
                    const labels = isSpanish ? labelsEs : labelsEn;
                    return (
                      <div key={statKey} className="space-y-0.5">
                        <span className="text-[10px] font-fantasy font-bold text-[#7a201c] block">
                          {labels[statKey]}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#2c221a]">
                          {val} <span className="text-[10px] text-[#6e5c4a]">({modSign})</span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Senses, Immunities, Languages */}
                <div className="space-y-1 text-xs border-b border-[#d8c8af] pb-3 leading-relaxed">
                  {selectedMonster.saves && (
                    <div>
                      <strong className="text-[#7a201c]">{t('Tiradas de Salvación:', 'Saving Throws:')}</strong>{' '}
                      {isSpanish ? selectedMonster.saves : translateDndText(selectedMonster.saves)}
                    </div>
                  )}
                  {selectedMonster.skills && (
                    <div>
                      <strong className="text-[#7a201c]">{t('Habilidades:', 'Skills:')}</strong>{' '}
                      {isSpanish ? selectedMonster.skills : translateDndText(selectedMonster.skills)}
                    </div>
                  )}
                  {selectedMonster.damageVulnerabilities && (
                    <div>
                      <strong className="text-[#7a201c]">{t('Vulnerabilidades:', 'Damage Vulnerabilities:')}</strong>{' '}
                      {isSpanish ? selectedMonster.damageVulnerabilities : translateDndText(selectedMonster.damageVulnerabilities)}
                    </div>
                  )}
                  {selectedMonster.damageResistances && (
                    <div>
                      <strong className="text-[#7a201c]">{t('Resistencias al Daño:', 'Damage Resistances:')}</strong>{' '}
                      {isSpanish ? selectedMonster.damageResistances : translateDndText(selectedMonster.damageResistances)}
                    </div>
                  )}
                  {selectedMonster.damageImmunities && (
                    <div>
                      <strong className="text-[#7a201c]">{t('Inmunidades al Daño:', 'Damage Immunities:')}</strong>{' '}
                      {isSpanish ? selectedMonster.damageImmunities : translateDndText(selectedMonster.damageImmunities)}
                    </div>
                  )}
                  {selectedMonster.conditionImmunities && (
                    <div>
                      <strong className="text-[#7a201c]">{t('Inmunidades a Estados:', 'Condition Immunities:')}</strong>{' '}
                      {isSpanish ? selectedMonster.conditionImmunities : translateDndText(selectedMonster.conditionImmunities)}
                    </div>
                  )}
                  <div>
                    <strong className="text-[#7a201c]">{t('Sentidos:', 'Senses:')}</strong>{' '}
                    {isSpanish ? selectedMonster.senses : translateDndText(selectedMonster.senses)}
                  </div>
                  <div>
                    <strong className="text-[#7a201c]">{t('Idiomas:', 'Languages:')}</strong>{' '}
                    {isSpanish ? selectedMonster.languages : translateDndText(selectedMonster.languages)}
                  </div>
                </div>

                {/* Traits */}
                {selectedMonster.traits && selectedMonster.traits.length > 0 && (
                  <div className="space-y-2 border-b border-[#d8c8af] pb-3">
                    <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#7a201c] block">
                      {t('Rasgos Especiales', 'Special Traits')}
                    </span>
                    <div className="space-y-2 text-xs">
                      {selectedMonster.traits.map((trait, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-[#2c221a] font-serif italic">
                            {isSpanish ? trait.name : translateDndTitle(trait.name)}.{' '}
                          </strong>
                          <span className="text-[#4a3b32]">
                            {isSpanish ? trait.desc : translateDndText(trait.desc)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 border-b border-[#d8c8af] pb-3">
                  <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#7a201c] block">
                    {t('Acciones', 'Actions')}
                  </span>
                  <div className="space-y-2 text-xs">
                    {selectedMonster.actions.map((act, idx) => (
                      <div key={idx} className="leading-relaxed">
                        <strong className="text-[#2c221a] font-serif italic">
                          {isSpanish ? act.name : translateDndTitle(act.name)}.{' '}
                        </strong>
                        <span className="text-[#4a3b32]">
                          {isSpanish ? act.desc : translateDndText(act.desc)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reactions if any */}
                {selectedMonster.reactions && selectedMonster.reactions.length > 0 && (
                  <div className="space-y-2 border-b border-[#d8c8af] pb-3">
                    <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#7a201c] block">
                      {t('Reacciones', 'Reactions')}
                    </span>
                    <div className="space-y-2 text-xs">
                      {selectedMonster.reactions.map((react, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-[#2c221a] font-serif italic">
                            {isSpanish ? react.name : translateDndTitle(react.name)}.{' '}
                          </strong>
                          <span className="text-[#4a3b32]">
                            {isSpanish ? react.desc : translateDndText(react.desc)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legendary Actions if any */}
                {selectedMonster.legendaryActions && selectedMonster.legendaryActions.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-fantasy font-bold uppercase tracking-wider text-[#7a201c] block">
                      {t('Acciones Legendarias', 'Legendary Actions')}
                    </span>
                    <p className="text-[11px] text-[#6e5c4a] italic">
                      {t(
                        'La criatura puede realizar hasta 3 acciones legendarias al final del turno de otra criatura. Recupera las acciones gastadas al inicio de su turno.',
                        'The creature can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature’s turn. The creature regains spent legendary actions at the start of its turn.'
                      )}
                    </p>
                    <div className="space-y-2 text-xs">
                      {selectedMonster.legendaryActions.map((leg, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <strong className="text-[#2c221a] font-serif italic">
                            {isSpanish ? leg.name : translateDndTitle(leg.name)}.{' '}
                          </strong>
                          <span className="text-[#4a3b32]">
                            {isSpanish ? leg.desc : translateDndText(leg.desc)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#8c7b69] bg-[#fcf9f2] rounded-2xl border-2 border-dashed border-[#d8c8af]">
                {t('Selecciona una criatura del bestiario para visualizar su ficha completa con estadísticas oficiales 5e.', 'Select a creature from the bestiary to view its full official 5e statblock.')}
              </div>
            )}
          </div>
        </div>
      )}
        </>
      )}

      {/* Modal Pergamino Completo del Conjuro */}
      {modalSpell && (
        <SpellDetailModal
          spell={getSpellForEdition(modalSpell, edition)}
          edition={edition}
          onClose={() => setModalSpell(null)}
        />
      )}

      {/* Modal Pergamino de Inspección de Compendio 1:1 */}
      {inspectData && (
        <CompendiumInspectModal
          data={inspectData}
          onClose={() => setInspectData(null)}
        />
      )}
    </div>
  );
};

