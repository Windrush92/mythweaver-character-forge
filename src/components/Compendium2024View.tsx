import React, { useState, useMemo } from 'react';
import {
  DND_2024_SPECIES,
  DND_2024_BACKGROUNDS,
  DND_2024_FEATS,
  DND_2024_CLASSES,
  DND_2024_WEAPONS,
  DND_2024_WEAPON_MASTERIES,
  Species2024,
  Background2024,
  Class2024,
  Feat2024,
  Weapon2024,
  WeaponMasteryDefinition
} from '../data/dnd2024';
import { useLanguageStore } from '../hooks/useLanguageStore';
import {
  Shield,
  Sparkles,
  Sword,
  Award,
  Users,
  Search,
  Check,
  Info,
  Crown,
  FileText,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { CompendiumSection } from './CompendiumView';

interface Compendium2024ViewProps {
  section: CompendiumSection;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ABILITY_LABELS: Record<string, { es: string; en: string }> = {
  str: { es: 'Fuerza (STR)', en: 'Strength (STR)' },
  dex: { es: 'Destreza (DEX)', en: 'Dexterity (DEX)' },
  con: { es: 'Constitución (CON)', en: 'Constitution (CON)' },
  int: { es: 'Inteligencia (INT)', en: 'Intelligence (INT)' },
  wis: { es: 'Sabiduría (WIS)', en: 'Wisdom (WIS)' },
  cha: { es: 'Carisma (CHA)', en: 'Charisma (CHA)' }
};

export const Compendium2024View: React.FC<Compendium2024ViewProps> = ({
  section,
  searchTerm,
  setSearchTerm
}) => {
  const { language, isSpanish, t } = useLanguageStore();

  // Selected items state
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(DND_2024_SPECIES[0]?.id || '');
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>(DND_2024_BACKGROUNDS[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState<string>(DND_2024_CLASSES[0]?.id || '');
  const [selectedFeatId, setSelectedFeatId] = useState<string>(DND_2024_FEATS[0]?.id || '');
  const [selectedMasteryName, setSelectedMasteryName] = useState<string>(DND_2024_WEAPON_MASTERIES[0]?.name || '');
  const [featCategoryFilter, setFeatCategoryFilter] = useState<'all' | 'origin' | 'fighting' | 'general' | 'epic'>('all');

  // Filtered Species
  const filteredSpecies = useMemo(() => {
    return DND_2024_SPECIES.filter(sp => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const desc = isSpanish ? sp.description : (sp.descriptionEn || sp.description);
      return (
        sp.name.toLowerCase().includes(term) ||
        sp.nameEn.toLowerCase().includes(term) ||
        desc.toLowerCase().includes(term) ||
        sp.traits.some(trait =>
          trait.name.toLowerCase().includes(term) ||
          (trait.nameEn && trait.nameEn.toLowerCase().includes(term)) ||
          trait.desc.toLowerCase().includes(term) ||
          (trait.descEn && trait.descEn.toLowerCase().includes(term))
        )
      );
    });
  }, [searchTerm, isSpanish]);

  const selectedSpecies: Species2024 = useMemo(() => {
    return DND_2024_SPECIES.find(s => s.id === selectedSpeciesId) || DND_2024_SPECIES[0];
  }, [selectedSpeciesId]);

  // Filtered Backgrounds
  const filteredBackgrounds = useMemo(() => {
    return DND_2024_BACKGROUNDS.filter(bg => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const desc = isSpanish ? bg.description : (bg.descriptionEn || bg.description);
      const skills = isSpanish ? bg.skillProficiencies : (bg.skillProficienciesEn || bg.skillProficiencies);
      return (
        bg.name.toLowerCase().includes(term) ||
        bg.nameEn.toLowerCase().includes(term) ||
        bg.feat.toLowerCase().includes(term) ||
        (bg.featEn && bg.featEn.toLowerCase().includes(term)) ||
        desc.toLowerCase().includes(term) ||
        skills.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, isSpanish]);

  const selectedBackground: Background2024 = useMemo(() => {
    return DND_2024_BACKGROUNDS.find(b => b.id === selectedBackgroundId) || DND_2024_BACKGROUNDS[0];
  }, [selectedBackgroundId]);

  // Filtered Classes
  const filteredClasses = useMemo(() => {
    return DND_2024_CLASSES.filter(c => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const desc = isSpanish ? c.description : (c.descriptionEn || c.description);
      return (
        c.name.toLowerCase().includes(term) ||
        c.nameEn.toLowerCase().includes(term) ||
        desc.toLowerCase().includes(term) ||
        c.subclasses.some(s =>
          s.name.toLowerCase().includes(term) ||
          s.nameEn.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term) ||
          (s.descriptionEn && s.descriptionEn.toLowerCase().includes(term))
        )
      );
    });
  }, [searchTerm, isSpanish]);

  const selectedClass: Class2024 = useMemo(() => {
    return DND_2024_CLASSES.find(c => c.id === selectedClassId) || DND_2024_CLASSES[0];
  }, [selectedClassId]);

  // Filtered Feats
  const filteredFeats = useMemo(() => {
    return DND_2024_FEATS.filter(f => {
      const catLow = f.category.toLowerCase();
      const isOrigin = catLow.includes('origen') || Boolean(f.categoryEn && f.categoryEn.toLowerCase().includes('origin'));
      const isFighting = catLow.includes('combate') || Boolean(f.categoryEn && f.categoryEn.toLowerCase().includes('fighting'));
      const isEpic = catLow.includes('épica') || catLow.includes('epica') || Boolean(f.categoryEn && f.categoryEn.toLowerCase().includes('epic'));
      if (featCategoryFilter === 'origin' && !isOrigin) return false;
      if (featCategoryFilter === 'fighting' && !isFighting) return false;
      if (featCategoryFilter === 'epic' && !isEpic) return false;
      if (featCategoryFilter === 'general' && (isOrigin || isFighting || isEpic)) return false;
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const desc = isSpanish ? f.description : (f.descriptionEn || f.description);
      return (
        f.name.toLowerCase().includes(term) ||
        f.nameEn.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        (f.categoryEn && f.categoryEn.toLowerCase().includes(term)) ||
        desc.toLowerCase().includes(term) ||
        f.benefits.some(b =>
          b.name.toLowerCase().includes(term) ||
          (b.nameEn && b.nameEn.toLowerCase().includes(term)) ||
          b.desc.toLowerCase().includes(term) ||
          (b.descEn && b.descEn.toLowerCase().includes(term))
        )
      );
    });
  }, [featCategoryFilter, searchTerm, isSpanish]);

  const selectedFeat: Feat2024 = useMemo(() => {
    return DND_2024_FEATS.find(f => f.id === selectedFeatId) || DND_2024_FEATS[0];
  }, [selectedFeatId]);

  // Filtered Weapons
  const filteredWeapons = useMemo(() => {
    return DND_2024_WEAPONS.filter(w => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        w.name.toLowerCase().includes(term) ||
        w.nameEn.toLowerCase().includes(term) ||
        w.mastery.toLowerCase().includes(term) ||
        (w.masteryEn && w.masteryEn.toLowerCase().includes(term)) ||
        w.properties.some(p => p.toLowerCase().includes(term)) ||
        (w.propertiesEn && w.propertiesEn.some(p => p.toLowerCase().includes(term)))
      );
    });
  }, [searchTerm]);

  const selectedMastery: WeaponMasteryDefinition = useMemo(() => {
    return (
      DND_2024_WEAPON_MASTERIES.find(m =>
        m.name.toLowerCase().includes(selectedMasteryName.toLowerCase()) ||
        m.nameEn.toLowerCase().includes(selectedMasteryName.toLowerCase())
      ) ||
      DND_2024_WEAPON_MASTERIES[0]
    );
  }, [selectedMasteryName]);

  return (
    <div className="space-y-6">
      {/* 2024 BANNER NOTICE */}
      <div className="bg-gradient-to-r from-[#2a1d0d] via-[#3d2714] to-[#24170a] p-4 sm:p-5 rounded-2xl border-2 border-[#b88c32] text-[#f7f2ea] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd56b] to-[#b88c32] flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-[#1f140a]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-fantasy font-black text-[#ffd56b] tracking-wider uppercase">
              {t('Explorando D&D 5.5e (2024)', 'Exploring D&D 5.5e (2024)')}
            </h3>
            <p className="text-xs text-[#c4aa82] mt-0.5">
              {t(
                "Información fiel de Player's Handbook 2024: Especies sin aumento fijo, Trasfondos con Dote de Origen y +2/+1, Subclases en Nivel 3 y Maestrías de Armas.",
                "Canonical Player's Handbook 2024 content: Flexible Species, Backgrounds with Origin Feats & +2/+1 ASI, Level 3 Subclasses, and Weapon Masteries."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. ESPECIES 2024                                              */}
      {/* ------------------------------------------------------------- */}
      {section === 'races' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Species List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
              {t('Especies 2024', '2024 Species')} ({filteredSpecies.length})
            </h3>
            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredSpecies.map((sp) => {
                const isSelected = sp.id === selectedSpeciesId;
                const displayName = isSpanish ? sp.name : sp.nameEn;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setSelectedSpeciesId(sp.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#b88c32] bg-[#f5ede0] shadow-sm font-bold'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                    }`}
                  >
                    <span className="text-xs font-fantasy text-[#2c221a]">{displayName}</span>
                    <span className="text-[10px] text-[#786450] font-mono">{sp.speed}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Species Details */}
          <div className="lg:col-span-3 space-y-4">
            {selectedSpecies && (
              <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-fantasy font-bold text-[#2c221a]">
                      {isSpanish ? selectedSpecies.name : selectedSpecies.nameEn}
                    </h3>
                    <span className="text-xs text-[#8c672b] font-bold">
                      {t('Especie Canónica 2024 • Tamaño ', 'Canonical 2024 Species • Size ')}
                      {isSpanish ? selectedSpecies.size : (selectedSpecies.sizeEn || selectedSpecies.size)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#f5ede0] px-2.5 py-1 rounded-lg border border-[#d8c8af]">
                      {t('Velocidad: ', 'Speed: ')}{selectedSpecies.speed}
                    </span>
                    {selectedSpecies.darkvision > 0 && (
                      <span className="text-xs font-mono font-bold bg-[#ede1ce] text-[#5c4a35] px-2.5 py-1 rounded-lg border border-[#d6c4aa]">
                        {t('Visión Oscuridad: ', 'Darkvision: ')}{selectedSpecies.darkvision} {t('pies', 'ft')}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2024 Rules Note */}
                <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#cfbeaa] flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5c4a35] leading-relaxed">
                    <strong>{t('Regla 2024: ', '2024 Rule: ')}</strong>
                    {t(
                      'Las especies ya no imponen aumentos de características fijos. Ahora puedes asignar +2/+1 (o +1/+1/+1) a cualquier característica que determine tu Trasfondo.',
                      'Species no longer enforce fixed ability score increases. You now assign +2/+1 (or +1/+1/+1) to the attributes designated by your Background.'
                    )}
                  </p>
                </div>

                <p className="text-xs text-[#6e5c4a] leading-relaxed">
                  {isSpanish ? selectedSpecies.description : (selectedSpecies.descriptionEn || selectedSpecies.description)}
                </p>

                {/* Traits */}
                <div className="space-y-2 pt-2 border-t border-[#ebdcc7]">
                  <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                    {t('Rasgos Especiales de la Especie:', 'Species Traits & Special Abilities:')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedSpecies.traits.map((trait, idx) => (
                      <div key={idx} className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af] space-y-1">
                        <strong className="text-xs text-[#2c221a] font-fantasy block flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#8c672b]" />{' '}
                          {isSpanish ? trait.name : (trait.nameEn || trait.name)}
                        </strong>
                        <p className="text-[11px] text-[#6e5c4a] leading-relaxed">
                          {isSpanish ? trait.desc : (trait.descEn || trait.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. TRASFONDOS 2024                                            */}
      {/* ------------------------------------------------------------- */}
      {section === 'backgrounds' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Backgrounds List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
              {t('Trasfondos 2024', '2024 Backgrounds')} ({filteredBackgrounds.length})
            </h3>
            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredBackgrounds.map((bg) => {
                const isSelected = bg.id === selectedBackgroundId;
                const displayName = isSpanish ? bg.name : bg.nameEn;
                const displayFeat = isSpanish ? bg.feat : (bg.featEn || bg.feat);
                return (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBackgroundId(bg.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#b88c32] bg-[#f5ede0] shadow-sm font-bold'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                    }`}
                  >
                    <span className="text-xs font-fantasy text-[#2c221a]">{displayName}</span>
                    <span className="text-[10px] text-[#8c672b] font-mono font-bold bg-[#faf3e8] px-1.5 py-0.5 rounded border border-[#d8c8af]">
                      {displayFeat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Background Details */}
          <div className="lg:col-span-3 space-y-4">
            {selectedBackground && (
              <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-fantasy font-bold text-[#2c221a]">
                      {isSpanish ? selectedBackground.name : selectedBackground.nameEn}
                    </h3>
                    <span className="text-xs text-[#8c672b] font-bold">
                      {t("Trasfondo Oficial 2024 • Player's Handbook", "Official 2024 Background • Player's Handbook")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#fef8ea] px-3 py-1 rounded-xl border border-[#b88c32] text-xs font-fantasy font-bold text-[#9c6a1e]">
                    <Star className="w-3.5 h-3.5 text-[#b88c32] fill-[#b88c32]" />
                    {t('Dote de Origen: ', 'Origin Feat: ')}
                    {isSpanish ? selectedBackground.feat : (selectedBackground.featEn || selectedBackground.feat)}
                  </div>
                </div>

                <p className="text-xs text-[#6e5c4a] leading-relaxed">
                  {isSpanish ? selectedBackground.description : (selectedBackground.descriptionEn || selectedBackground.description)}
                </p>

                {/* Ability Scores Boost in 2024 */}
                <div className="bg-[#fef8ea] p-4 rounded-xl border-2 border-[#b88c32] space-y-2">
                  <span className="font-fantasy font-bold text-xs text-[#9c6a1e] flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#b88c32]" />
                    {t('Aumento de Atributos (ASI 2024):', 'Ability Score Increases (2024 ASI):')}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedBackground.abilityScores.map((ab) => (
                      <span
                        key={ab}
                        className="px-2.5 py-1 rounded-lg bg-[#2c1d0f] text-[#ffd56b] font-fantasy font-bold text-xs uppercase border border-[#b88c32]"
                      >
                        +{ABILITY_LABELS[ab]?.[language] || ab.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#6e5c4a]">
                    {t(
                      'Puedes elegir: +2 a una y +1 a otra de estas 3 características, o +1 a las tres.',
                      'You can choose: +2 to one and +1 to another of these 3 ability scores, or +1 to all three.'
                    )}
                  </p>
                </div>

                {/* Skills & Tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af]">
                    <strong className="text-xs text-[#2c221a] font-fantasy block mb-1">
                      {t('Competencias en Habilidades:', 'Skill Proficiencies:')}
                    </strong>
                    <span className="text-xs text-[#6e5c4a]">
                      {isSpanish ? selectedBackground.skillProficiencies : (selectedBackground.skillProficienciesEn || selectedBackground.skillProficiencies)}
                    </span>
                  </div>
                  <div className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af]">
                    <strong className="text-xs text-[#2c221a] font-fantasy block mb-1">
                      {t('Herramienta Otorgada:', 'Tool Proficiency:')}
                    </strong>
                    <span className="text-xs text-[#6e5c4a]">
                      {isSpanish ? selectedBackground.toolProficiency : (selectedBackground.toolProficiencyEn || selectedBackground.toolProficiency)}
                    </span>
                  </div>
                </div>

                {/* Equipment Package */}
                <div className="bg-[#f5ede0] p-3.5 rounded-xl border border-[#d8c8af] space-y-1">
                  <strong className="text-xs text-[#2c221a] font-fantasy block">
                    {t('Equipo Inicial:', 'Starting Equipment:')}
                  </strong>
                  <p className="text-xs text-[#6e5c4a]">
                    {isSpanish ? selectedBackground.equipment : (selectedBackground.equipmentEn || selectedBackground.equipment)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. CLASES 2024                                                */}
      {/* ------------------------------------------------------------- */}
      {(section === 'classes' || section === 'subclasses') && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Class List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider px-1">
              {t('Clases 2024', '2024 Classes')} ({filteredClasses.length})
            </h3>
            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredClasses.map((c) => {
                const isSelected = c.id === selectedClassId;
                const displayName = isSpanish ? c.name : c.nameEn;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClassId(c.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#b88c32] bg-[#f5ede0] shadow-sm font-bold'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                    }`}
                  >
                    <span className="text-xs font-fantasy text-[#2c221a]">{displayName}</span>
                    <span className="text-[10px] text-[#786450] font-mono">d{c.hitDie}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Class Details */}
          <div className="lg:col-span-3 space-y-4">
            {selectedClass && (
              <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-fantasy font-bold text-[#2c221a]">
                      {isSpanish ? selectedClass.name : selectedClass.nameEn}
                    </h3>
                    <span className="text-xs text-[#8c672b] font-bold">
                      {t('Dado de Golpe: ', 'Hit Die: ')}d{selectedClass.hitDie} • {t('Característica Primaria: ', 'Primary Ability: ')}
                      {isSpanish ? selectedClass.primaryAbility : (selectedClass.primaryAbilityEn || selectedClass.primaryAbility)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#f5ede0] px-2.5 py-1 rounded-lg border border-[#d8c8af]">
                      {t('Salvaciones: ', 'Saving Throws: ')}{selectedClass.savingThrows}
                    </span>
                    {selectedClass.weaponMasteryCount > 0 && (
                      <span className="text-xs font-mono font-bold bg-[#fef8ea] text-[#9c6a1e] px-2.5 py-1 rounded-lg border border-[#b88c32]">
                        ⚔️ {selectedClass.weaponMasteryCount} {t('Maestrías de Armas', 'Weapon Masteries')}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#6e5c4a] leading-relaxed">
                  {isSpanish ? selectedClass.description : (selectedClass.descriptionEn || selectedClass.description)}
                </p>

                {/* Subclass Rule in 2024 */}
                <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#cfbeaa] flex items-start gap-2.5">
                  <Crown className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5c4a35] leading-relaxed">
                    <strong>{t('Regla Universal 2024: ', 'Universal 2024 Rule: ')}</strong>
                    {t(
                      'Todas las clases obtienen su Subclase en el Nivel 3 (en lugar de Nivel 1 o 2 como en 2014), unificando el ritmo de progresión de todos los personajes.',
                      'All classes gain their Subclass at Level 3 (unifying progression tempo across all character classes).'
                    )}
                  </p>
                </div>

                {/* Subclasses */}
                <div className="space-y-2 pt-2 border-t border-[#ebdcc7]">
                  <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                    {t(
                      `Subclases Oficiales de ${isSpanish ? selectedClass.name : selectedClass.nameEn} (Nivel 3+):`,
                      `Official Subclasses for ${selectedClass.nameEn} (Level 3+):`
                    )}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedClass.subclasses.map((sub) => (
                      <div key={sub.id} className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af] space-y-1">
                        <strong className="text-xs text-[#2c221a] font-fantasy block flex items-center gap-1.5">
                          <Crown className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? sub.name : sub.nameEn}
                        </strong>
                        <p className="text-[11px] text-[#6e5c4a] leading-relaxed">
                          {isSpanish ? sub.description : (sub.descriptionEn || sub.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. DOTES 2024                                                 */}
      {/* ------------------------------------------------------------- */}
      {section === 'feats' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Feats List */}
          <div className="lg:col-span-1 space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider">
                {t('Dotes 2024', '2024 Feats')} ({filteredFeats.length})
              </h3>
            </div>
            {/* Filter Pill */}
            <div className="flex flex-wrap items-center gap-1 bg-[#ede1ce] p-1 rounded-lg text-[10px] font-fantasy font-bold">
              <button
                type="button"
                onClick={() => setFeatCategoryFilter('all')}
                className={`flex-1 py-1 px-1.5 rounded transition text-center cursor-pointer ${
                  featCategoryFilter === 'all' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#6e5c4a]'
                }`}
              >
                {t('Todas', 'All')}
              </button>
              <button
                type="button"
                onClick={() => setFeatCategoryFilter('origin')}
                className={`flex-1 py-1 px-1.5 rounded transition text-center cursor-pointer ${
                  featCategoryFilter === 'origin' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#6e5c4a]'
                }`}
              >
                {t('Origen', 'Origin')}
              </button>
              <button
                type="button"
                onClick={() => setFeatCategoryFilter('fighting')}
                className={`flex-1 py-1 px-1.5 rounded transition text-center cursor-pointer ${
                  featCategoryFilter === 'fighting' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#6e5c4a]'
                }`}
              >
                {t('Combate', 'Fighting')}
              </button>
              <button
                type="button"
                onClick={() => setFeatCategoryFilter('general')}
                className={`flex-1 py-1 px-1.5 rounded transition text-center cursor-pointer ${
                  featCategoryFilter === 'general' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#6e5c4a]'
                }`}
              >
                {t('Generales', 'General')}
              </button>
              <button
                type="button"
                onClick={() => setFeatCategoryFilter('epic')}
                className={`flex-1 py-1 px-1.5 rounded transition text-center cursor-pointer ${
                  featCategoryFilter === 'epic' ? 'bg-[#8c672b] text-white shadow-xs' : 'text-[#6e5c4a]'
                }`}
              >
                {t('Épicas', 'Epic')}
              </button>
            </div>

            <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredFeats.map((f) => {
                const isSelected = f.id === selectedFeatId;
                const displayName = isSpanish ? f.name : f.nameEn;
                const catLow = f.category.toLowerCase();
                const badgeText = catLow.includes('origen')
                  ? t('Nv 1', 'Lv 1')
                  : catLow.includes('combate')
                  ? t('Combate', 'Fighting')
                  : catLow.includes('épica') || catLow.includes('epica')
                  ? t('Épica 19+', 'Epic 19+')
                  : t('Nv 4+', 'Lv 4+');
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFeatId(f.id)}
                    className={`w-full p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-[#b88c32] bg-[#f5ede0] shadow-sm font-bold'
                        : 'border-[#d8c8af] bg-[#fcf9f2] hover:border-[#b88c32]'
                    }`}
                  >
                    <span className="text-xs font-fantasy text-[#2c221a]">{displayName}</span>
                    <span className="text-[10px] text-[#8c672b] font-mono font-bold bg-[#faf3e8] px-1.5 py-0.5 rounded border border-[#d8c8af] shrink-0">
                      {badgeText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Feat Details */}
          <div className="lg:col-span-3 space-y-4">
            {selectedFeat && (
              <div className="bg-[#fcf9f2] p-5 sm:p-6 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-fantasy font-bold text-[#2c221a]">
                      {isSpanish ? selectedFeat.name : selectedFeat.nameEn}
                    </h3>
                    <span className="text-xs text-[#8c672b] font-bold">
                      {t('Categoría: ', 'Category: ')}
                      {isSpanish ? selectedFeat.category : (selectedFeat.categoryEn || selectedFeat.category)}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#f5ede0] px-3 py-1 rounded-xl border border-[#d8c8af]">
                    {t('Dote Oficial 2024', 'Official 2024 Feat')}
                  </span>
                </div>

                <p className="text-xs text-[#6e5c4a] leading-relaxed">
                  {isSpanish ? selectedFeat.description : (selectedFeat.descriptionEn || selectedFeat.description)}
                </p>

                {/* Benefits List */}
                <div className="space-y-2 pt-2 border-t border-[#ebdcc7]">
                  <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                    {t('Beneficios Otorgados:', 'Feat Benefits:')}
                  </h4>
                  <div className="space-y-2">
                    {selectedFeat.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af] space-y-1">
                        <strong className="text-xs text-[#2c221a] font-fantasy block flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#8c672b]" />{' '}
                          {isSpanish ? benefit.name : (benefit.nameEn || benefit.name)}
                        </strong>
                        <p className="text-xs text-[#6e5c4a] leading-relaxed">
                          {isSpanish ? benefit.desc : (benefit.descEn || benefit.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. ARMAS & MAESTRÍAS DE ARMAS 2024 (WEAPON MASTERY)           */}
      {/* ------------------------------------------------------------- */}
      {section === 'equipment' && (
        <div className="space-y-6">
          {/* Weapon Masteries Overview Interactive Bar */}
          <div className="bg-[#fcf9f2] p-5 rounded-2xl border-2 border-[#b88c32] shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-fantasy font-bold text-[#2c221a] uppercase">
              <Target className="w-4 h-4 text-[#b88c32]" />
              <span>{t('Propiedades de Maestría de Armas 2024 (Weapon Mastery)', '2024 Weapon Mastery Properties')}</span>
            </div>
            <p className="text-xs text-[#6e5c4a] leading-relaxed">
              {t(
                'En las reglas 2024, las clases marciales (Guerrero, Bárbaro, Paladín, Explorador, Pícaro) desbloquean efectos tácticos únicos con armas con las que dominan su maestría. Haz clic en una maestría para ver su regla:',
                'Under 2024 rules, martial classes (Barbarian, Fighter, Paladin, Ranger, Rogue) unlock tactical masteries with weapons they have trained in. Click a mastery to inspect its mechanics:'
              )}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap">
              {DND_2024_WEAPON_MASTERIES.map((m) => {
                const isSelected = m.name === selectedMastery.name || m.nameEn === selectedMastery.nameEn;
                const displayName = isSpanish ? m.name : m.nameEn;
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setSelectedMasteryName(m.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-fantasy font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8c672b] text-white shadow-md ring-2 ring-[#ffd56b]/50'
                        : 'bg-[#faf3e8] text-[#5c4a35] hover:bg-[#ede1ce] border border-[#d8c8af]'
                    }`}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>

            {/* Active Mastery Detail Box */}
            <div className="bg-[#fef8ea] p-4 rounded-xl border border-[#b88c32] space-y-1">
              <strong className="text-xs font-fantasy text-[#9c6a1e] flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#b88c32] fill-[#b88c32]" />
                {isSpanish ? selectedMastery.name : selectedMastery.nameEn}:
              </strong>
              <p className="text-xs text-[#5c4a35] leading-relaxed">
                {isSpanish ? selectedMastery.desc : (selectedMastery.descEn || selectedMastery.desc)}
              </p>
            </div>
          </div>

          {/* 2024 Weapons Table */}
          <div className="bg-[#fcf9f2] p-5 rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3">
            <h3 className="font-fantasy font-bold text-xs uppercase text-[#786450] tracking-wider">
              {t('Tabla Oficial de Armas 2024', 'Official 2024 Weapons Table')} ({filteredWeapons.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-[#b88c32] bg-[#f5ede0] text-[#4a361c] font-fantasy">
                    <th className="p-2.5">{t('Arma', 'Weapon')}</th>
                    <th className="p-2.5">{t('Daño', 'Damage')}</th>
                    <th className="p-2.5">{t('Propiedades', 'Properties')}</th>
                    <th className="p-2.5 text-[#9c6a1e]">{t('Maestría 2024', '2024 Mastery')}</th>
                    <th className="p-2.5">{t('Peso', 'Weight')}</th>
                    <th className="p-2.5">{t('Precio', 'Cost')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebdcc7]">
                  {filteredWeapons.map((w) => {
                    const displayName = isSpanish ? w.name : w.nameEn;
                    const displayDamage = isSpanish ? w.damage : (w.damageEn || w.damage);
                    const displayProps = isSpanish ? w.properties.join(', ') : (w.propertiesEn ? w.propertiesEn.join(', ') : w.properties.join(', '));
                    const displayMastery = isSpanish ? w.mastery : (w.masteryEn || w.mastery);

                    return (
                      <tr key={w.id} className="hover:bg-[#faf3e8] transition">
                        <td className="p-2.5 font-bold font-fantasy text-[#2c221a]">{displayName}</td>
                        <td className="p-2.5 font-mono text-[#8c672b] font-bold">{displayDamage}</td>
                        <td className="p-2.5 text-[#6e5c4a]">{displayProps}</td>
                        <td className="p-2.5 font-bold text-[#b45309]">
                          <span className="bg-[#fef3c7] border border-[#f59e0b] px-2 py-0.5 rounded-md font-fantasy">
                            {displayMastery}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-[#786450]">{w.weight}</td>
                        <td className="p-2.5 font-mono text-[#786450]">{w.cost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
