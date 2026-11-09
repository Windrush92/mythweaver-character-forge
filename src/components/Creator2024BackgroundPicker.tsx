import React, { useState, useMemo } from 'react';
import { DND_2024_BACKGROUNDS, DND_2024_FEATS, Background2024, Feat2024 } from '../data/dnd2024';
import { AbilityScores } from '../types';
import { ABILITY_SCORE_EXPLANATIONS } from '../data/characterCreatorData';
import { CompendiumInspectData } from './CompendiumInspectModal';
import { useLanguageStore } from '../hooks/useLanguageStore';
import { BookOpen, Search, Sparkles, Star, Award, Check, Wrench, Coins, Eye } from 'lucide-react';

interface Creator2024BackgroundPickerProps {
  selectedBackgroundId: string;
  onSelectBackground: (backgroundId: string) => void;
  bgAsiMode: '+2+1' | '+1+1+1';
  setBgAsiMode: (mode: '+2+1' | '+1+1+1') => void;
  bgAsiStatPlusTwo: keyof AbilityScores | '';
  setBgAsiStatPlusTwo: (stat: keyof AbilityScores) => void;
  bgAsiStatPlusOne: keyof AbilityScores | '';
  setBgAsiStatPlusOne: (stat: keyof AbilityScores) => void;
  onInspect?: (data: CompendiumInspectData) => void;
}

const STAT_LABELS: Record<string, { es: string; en: string; icon: string }> = {
  str: { es: 'Fuerza', en: 'Strength', icon: '💪' },
  dex: { es: 'Destreza', en: 'Dexterity', icon: '🏹' },
  con: { es: 'Constitución', en: 'Constitution', icon: '🛡️' },
  int: { es: 'Inteligencia', en: 'Intelligence', icon: '🧠' },
  wis: { es: 'Sabiduría', en: 'Wisdom', icon: '🦉' },
  cha: { es: 'Carisma', en: 'Charisma', icon: '✨' },
};

export const Creator2024BackgroundPicker: React.FC<Creator2024BackgroundPickerProps> = ({
  selectedBackgroundId,
  onSelectBackground,
  bgAsiMode,
  setBgAsiMode,
  bgAsiStatPlusTwo,
  setBgAsiStatPlusTwo,
  bgAsiStatPlusOne,
  setBgAsiStatPlusOne,
  onInspect,
}) => {
  const { language, isSpanish, t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBackgrounds = useMemo(() => {
    if (!searchQuery.trim()) return DND_2024_BACKGROUNDS;
    const q = searchQuery.toLowerCase();
    return DND_2024_BACKGROUNDS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.nameEn.toLowerCase().includes(q) ||
        b.feat.toLowerCase().includes(q) ||
        (b.featEn && b.featEn.toLowerCase().includes(q)) ||
        b.description.toLowerCase().includes(q) ||
        (b.descriptionEn && b.descriptionEn.toLowerCase().includes(q)) ||
        b.skillProficiencies.toLowerCase().includes(q) ||
        (b.skillProficienciesEn && b.skillProficienciesEn.toLowerCase().includes(q)) ||
        b.toolProficiency.toLowerCase().includes(q) ||
        (b.toolProficiencyEn && b.toolProficiencyEn.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeBackground = useMemo<Background2024 | null>(() => {
    if (!selectedBackgroundId) return null;
    return DND_2024_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || null;
  }, [selectedBackgroundId]);

  // Origin Feat definition
  const originFeat = useMemo<Feat2024 | undefined>(() => {
    if (!activeBackground) return undefined;
    const featNameClean = activeBackground.feat.split('(')[0].trim().toLowerCase();
    const featNameEnClean = (activeBackground.featEn || '').split('(')[0].trim().toLowerCase();
    return DND_2024_FEATS.find(
      (f) =>
        f.name.toLowerCase().includes(featNameClean) ||
        (featNameEnClean && f.nameEn.toLowerCase().includes(featNameEnClean))
    );
  }, [activeBackground]);

  // Ensure default stats selected for +2/+1 mode
  const allowedStats = activeBackground?.abilityScores || [];
  const effectiveStat2 = (bgAsiStatPlusTwo && allowedStats.includes(bgAsiStatPlusTwo) ? bgAsiStatPlusTwo : allowedStats[0]) as keyof AbilityScores | undefined;
  const validForStat1 = allowedStats.filter((s) => s !== effectiveStat2);
  const effectiveStat1 = (bgAsiStatPlusOne && bgAsiStatPlusOne !== effectiveStat2 && allowedStats.includes(bgAsiStatPlusOne)
    ? bgAsiStatPlusOne
    : validForStat1[0] || allowedStats[1]) as keyof AbilityScores | undefined;

  const getStatName = (stat: string) => STAT_LABELS[stat]?.[language] || ABILITY_SCORE_EXPLANATIONS[stat]?.name || stat.toUpperCase();
  const getStatIcon = (stat: string) => STAT_LABELS[stat]?.icon || ABILITY_SCORE_EXPLANATIONS[stat]?.icon || '✨';

  const buildBackgroundInspectData = (bg: Background2024): CompendiumInspectData => {
    const featObj = DND_2024_FEATS.find(
      (f) =>
        f.name.toLowerCase().includes(bg.feat.split('(')[0].trim().toLowerCase()) ||
        (bg.featEn && f.nameEn.toLowerCase().includes(bg.featEn.split('(')[0].trim().toLowerCase()))
    );

    return {
      id: bg.id,
      title: isSpanish ? bg.name : bg.nameEn,
      englishTitle: bg.nameEn,
      category: isSpanish ? 'Trasfondo Oficial D&D 5.5e (2024)' : 'Official D&D 5.5e Background (2024)',
      iconType: 'background',
      description: isSpanish ? bg.description : (bg.descriptionEn || bg.description),
      badges: [
        {
          label: isSpanish ? 'Dote de Origen' : 'Origin Feat',
          value: isSpanish ? bg.feat : (bg.featEn || bg.feat),
          variant: 'amber',
        },
        {
          label: isSpanish ? 'Atributos Permitidos' : 'Allowed Attributes',
          value: bg.abilityScores.map((st) => getStatName(st)).join(', '),
          variant: 'gold',
        },
        {
          label: isSpanish ? 'Habilidades' : 'Skills',
          value: isSpanish ? bg.skillProficiencies : (bg.skillProficienciesEn || bg.skillProficiencies),
        },
        {
          label: isSpanish ? 'Herramienta' : 'Tool',
          value: isSpanish ? bg.toolProficiency : (bg.toolProficiencyEn || bg.toolProficiency),
        },
      ],
      equipment: isSpanish ? bg.equipment : (bg.equipmentEn || bg.equipment),
      benefits: featObj
        ? featObj.benefits.map((b) => `${isSpanish ? b.name : (b.nameEn || b.name)}: ${isSpanish ? b.desc : (b.descEn || b.desc)}`)
        : undefined,
      actionButton: {
        label: bg.id === selectedBackgroundId
          ? (isSpanish ? 'Trasfondo Seleccionado' : 'Background Selected')
          : (isSpanish ? 'Elegir este Trasfondo' : 'Select this Background'),
        onClick: () => onSelectBackground(bg.id),
        isSelected: bg.id === selectedBackgroundId,
      },
    };
  };

  return (
    <div className="space-y-4">
      {/* 2024 Notice Banner */}
      <div className="p-3.5 bg-gradient-to-r from-[#fef3c7] via-[#fffbeb] to-[#fef3c7] rounded-xl border-2 border-[#d97706]/70 flex items-start gap-3 shadow-xs">
        <Sparkles className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div className="text-xs text-[#78350f] leading-relaxed">
          <strong className="font-fantasy uppercase tracking-wide text-[#92400e]">
            {t('✨ Mecánica Oficial de Trasfondos D&D 2024:', '✨ Official D&D 2024 Background Mechanics:')}
          </strong>
          <p className="mt-0.5">
            {t(
              'Cada trasfondo 2024 especifica exactamente 3 atributos permitidos (otorgando +2/+1 o +1/+1/+1), una Dote de Origen (Nivel 1) sin coste adicional, 2 habilidades, herramientas y equipo.',
              'Each 2024 background specifies exactly 3 allowed ability scores (+2/+1 or +1/+1/+1), a free Level 1 Origin Feat, 2 skills, tool proficiency, and starting equipment.'
            )}
          </p>
        </div>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#8c672b]" />
          <h4 className="font-fantasy font-bold text-xs uppercase text-[#4a361c] tracking-wide">
            {t('Trasfondos Oficiales 2024', 'Official 2024 Backgrounds')} ({filteredBackgrounds.length} {t('Disponibles', 'Available')})
          </h4>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Buscar trasfondo, dote o atributo...', 'Search background, feat or attribute...')}
            className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner font-serif"
          />
        </div>
      </div>

      {/* Backgrounds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[48vh] overflow-y-auto pr-1">
        {filteredBackgrounds.map((bg) => {
          const isSelected = bg.id === selectedBackgroundId;
          const displayName = isSpanish ? bg.name : bg.nameEn;
          const displayFeat = isSpanish ? bg.feat : (bg.featEn || bg.feat);
          const displayDesc = isSpanish ? bg.description : (bg.descriptionEn || bg.description);
          const displaySkills = isSpanish ? bg.skillProficiencies : (bg.skillProficienciesEn || bg.skillProficiencies);

          return (
            <div
              key={bg.id}
              onClick={() => {
                onSelectBackground(bg.id);
                setBgAsiStatPlusTwo(bg.abilityScores[0]);
                setBgAsiStatPlusOne(bg.abilityScores[1]);
              }}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-[#b45309] bg-[#fffbeb] shadow-md ring-2 ring-amber-400'
                  : 'border-[#d6c4aa] bg-[#fcf9f2] hover:border-[#b88c32] hover:bg-[#faf3e8]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-fantasy font-bold text-xs sm:text-sm text-[#2c221a]">
                    {displayName}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {onInspect && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspect(buildBackgroundInspectData(bg));
                        }}
                        className="p-1 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
                        title={t("Ver detalles completos del trasfondo", "View full background details")}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#b45309] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Origin Feat Badge */}
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1 text-[9.5px] bg-[#fef3c7] text-[#92400e] border border-[#f59e0b] px-1.5 py-0.5 rounded font-bold font-fantasy">
                    <Star className="w-2.5 h-2.5 fill-[#d97706] text-[#d97706]" />
                    {displayFeat}
                  </span>
                </div>

                <p className="text-[10.5px] text-[#5c4a35] leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#ebdcc7] space-y-1">
                <div className="flex items-center gap-1 text-[9px] text-[#786450] font-mono">
                  <span>Stats:</span>
                  <strong className="text-[#8c672b] uppercase">
                    {bg.abilityScores.join(', ')}
                  </strong>
                </div>
                <div className="text-[9.5px] text-[#6e5c4a] leading-snug">
                  {displaySkills}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Background Customization Dossier */}
      {activeBackground ? (
        <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-4 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fantasy font-bold text-sm text-[#2c221a]">
                  {isSpanish ? activeBackground.name : activeBackground.nameEn}
                </span>
                <span className="text-[10px] bg-amber-500 text-stone-900 px-1.5 py-0.2 rounded font-mono font-black uppercase">
                  {t('Trasfondo PHB 2024', 'PHB 2024 Background')}
                </span>
              </div>
              <p className="text-[11px] text-[#5c4a35] mt-0.5">
                {isSpanish ? activeBackground.description : (activeBackground.descriptionEn || activeBackground.description)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-right text-xs">
              {onInspect && (
                <button
                  type="button"
                  onClick={() => onInspect(buildBackgroundInspectData(activeBackground))}
                  className="flex items-center gap-1 bg-white hover:bg-[#faf3e8] px-2.5 py-1 rounded border border-[#b88c32] text-[#8c672b] font-fantasy font-bold text-xs shadow-xs transition cursor-pointer"
                  title={t("Abrir ficha completa del trasfondo", "Open full background dossier")}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('Ficha Completa', 'Full Dossier')}</span>
                </button>
              )}
              <div className="text-right">
                <span className="text-[10px] text-[#786450] block">
                  {t('Dote de Origen Incluida:', 'Included Origin Feat:')}
                </span>
                <strong className="text-amber-800 font-fantasy">
                  {isSpanish ? activeBackground.feat : (activeBackground.featEn || activeBackground.feat)}
                </strong>
              </div>
            </div>
          </div>

          {/* Interactive Ability Score Distribution (ASI) */}
          <div className="p-3.5 bg-white/95 rounded-xl border border-[#b88c32] space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="font-fantasy font-bold text-xs uppercase text-[#4a361c] flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {t('Mejoras de Característica 2024 (ASI de Trasfondo)', '2024 Ability Score Increases (Background ASI)')}
                </h5>
                <p className="text-[11px] text-[#6e5c4a]">
                  {t('Atributos permitidos para ', 'Allowed attributes for ')}
                  {isSpanish ? activeBackground.name : activeBackground.nameEn}:{' '}
                  <strong className="text-[#8c672b] uppercase">
                    {activeBackground.abilityScores.map((st) => getStatName(st)).join(', ')}
                  </strong>
                </p>
              </div>

              {/* ASI Mode Toggle */}
              <div className="flex items-center p-0.5 bg-[#ede1ce] rounded-lg border border-[#d6c4aa]">
                <button
                  type="button"
                  onClick={() => setBgAsiMode('+2+1')}
                  className={`px-2.5 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                    bgAsiMode === '+2+1'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'text-[#5c4a35] hover:text-black'
                  }`}
                >
                  {t('Opción A: +2 y +1', 'Option A: +2 and +1')}
                </button>
                <button
                  type="button"
                  onClick={() => setBgAsiMode('+1+1+1')}
                  className={`px-2.5 py-1 rounded text-xs font-fantasy font-bold transition cursor-pointer ${
                    bgAsiMode === '+1+1+1'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'text-[#5c4a35] hover:text-black'
                  }`}
                >
                  {t('Opción B: +1, +1, +1', 'Option B: +1, +1, +1')}
                </button>
              </div>
            </div>

            {/* If Mode is +2 and +1 */}
            {bgAsiMode === '+2+1' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 bg-[#faf5ed] rounded-lg border border-[#d6c4aa] space-y-1">
                  <label className="block text-[11px] font-bold font-fantasy text-[#4a361c]">
                    {t('Elige el atributo que recibe +2:', 'Choose attribute that receives +2:')}
                  </label>
                  <div className="flex gap-2">
                    {allowedStats.map((st) => {
                      const isChosen = effectiveStat2 === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            setBgAsiStatPlusTwo(st);
                            if (effectiveStat1 === st) {
                              const remaining = allowedStats.filter((s) => s !== st);
                              setBgAsiStatPlusOne(remaining[0]);
                            }
                          }}
                          className={`flex-1 py-1.5 px-2 rounded border text-xs font-fantasy font-bold transition cursor-pointer ${
                            isChosen
                              ? 'bg-[#8c672b] text-white border-[#8c672b] shadow-xs'
                              : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:border-[#8c672b]'
                          }`}
                        >
                          <span className="block text-sm">{getStatIcon(st)}</span>
                          <span className="text-[10px]">{getStatName(st)}</span>
                          <span className="block text-[9px] font-mono">+2</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-2.5 bg-[#faf5ed] rounded-lg border border-[#d6c4aa] space-y-1">
                  <label className="block text-[11px] font-bold font-fantasy text-[#4a361c]">
                    {t('Elige el atributo que recibe +1:', 'Choose attribute that receives +1:')}
                  </label>
                  <div className="flex gap-2">
                    {allowedStats
                      .filter((st) => st !== effectiveStat2)
                      .map((st) => {
                        const isChosen = effectiveStat1 === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setBgAsiStatPlusOne(st)}
                            className={`flex-1 py-1.5 px-2 rounded border text-xs font-fantasy font-bold transition cursor-pointer ${
                              isChosen
                                ? 'bg-[#b45309] text-white border-[#b45309] shadow-xs'
                                : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:border-[#b45309]'
                            }`}
                          >
                            <span className="block text-sm">{getStatIcon(st)}</span>
                            <span className="text-[10px]">{getStatName(st)}</span>
                            <span className="block text-[9px] font-mono">+1</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              /* If Mode is +1, +1, +1 */
              <div className="p-2.5 bg-[#faf5ed] rounded-lg border border-[#d6c4aa] flex items-center justify-between">
                <span className="text-xs text-[#4a361c]">
                  {t('Los 3 atributos de tu trasfondo reciben ', 'All 3 attributes of your background receive ')}
                  <strong>{t('+1 cada uno', '+1 each')}</strong>:
                </span>
                <div className="flex items-center gap-2 font-fantasy text-xs font-bold text-[#8c672b]">
                  {allowedStats.map((st) => (
                    <span
                      key={st}
                      className="bg-white px-2 py-1 rounded border border-[#d6c4aa] shadow-2xs"
                    >
                      {getStatName(st)}: <strong>+1</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Origin Feat Full Benefit Card */}
          <div className="p-3 bg-[#faf3e8] rounded-xl border border-[#d6c4aa] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-fantasy font-bold text-xs text-[#78350f] uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#d97706]" />{' '}
                {t('Dote de Origen: ', 'Origin Feat: ')}
                {isSpanish ? activeBackground.feat : (activeBackground.featEn || activeBackground.feat)}
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono font-bold border border-amber-300">
                {originFeat
                  ? (isSpanish ? originFeat.category : (originFeat.categoryEn || originFeat.category))
                  : t('Dote de Origen (Nvl 1)', 'Origin Feat (Lv 1)')}
              </span>
            </div>

            {originFeat ? (
              <div className="text-xs space-y-1.5">
                <p className="text-[#4a3b32] text-[11px] leading-relaxed">
                  {isSpanish ? originFeat.description : (originFeat.descriptionEn || originFeat.description)}
                </p>
                <div className="space-y-1 pt-1 border-t border-[#ebdcc7]">
                  {originFeat.benefits.map((b, i) => (
                    <div key={i} className="text-[11px] leading-relaxed">
                      <strong className="text-[#8c672b] font-fantasy">
                        {isSpanish ? b.name : (b.nameEn || b.name)}:{' '}
                      </strong>
                      <span className="text-[#4a3b32]">
                        {isSpanish ? b.desc : (b.descEn || b.desc)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#5c4a35] italic">
                {t(
                  'Dote canónica de nivel 1 concedida automáticamente por tu trasfondo 2024.',
                  'Canonical level 1 feat granted automatically by your 2024 background.'
                )}
              </p>
            )}
          </div>

          {/* Proficiencies & Starting Wealth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-white/90 rounded-lg border border-[#d6c4aa] space-y-1">
              <strong className="text-[#8c672b] font-fantasy block">
                {t('Competencias en Habilidades:', 'Skill Proficiencies:')}
              </strong>
              <span className="text-[#4a3b32]">
                {isSpanish ? activeBackground.skillProficiencies : (activeBackground.skillProficienciesEn || activeBackground.skillProficiencies)}
              </span>
            </div>

            <div className="p-2.5 bg-white/90 rounded-lg border border-[#d6c4aa] space-y-1">
              <strong className="text-[#8c672b] font-fantasy flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-[#8c672b]" /> {t('Herramienta:', 'Tool:')}
              </strong>
              <span className="text-[#4a3b32]">
                {isSpanish ? activeBackground.toolProficiency : (activeBackground.toolProficiencyEn || activeBackground.toolProficiency)}
              </span>
            </div>

            <div className="p-2.5 bg-white/90 rounded-lg border border-[#d6c4aa] space-y-1 sm:col-span-2">
              <strong className="text-[#8c672b] font-fantasy flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-600" /> {t('Equipo Inicial de Trasfondo:', 'Starting Equipment:')}
              </strong>
              <span className="text-[#4a3b32] text-[11px] leading-relaxed">
                {isSpanish ? activeBackground.equipment : (activeBackground.equipmentEn || activeBackground.equipment)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
          {t('Selecciona un trasfondo de la lista para ver su dote de origen y configurar tus mejoras de característica.', 'Select a background from the list above to view its origin feat and configure your ability score increases.')}
        </div>
      )}
    </div>
  );
};
