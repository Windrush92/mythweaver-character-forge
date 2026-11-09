import React from 'react';
import { Check, Eye, Lock, Info, Sparkles } from 'lucide-react';
import {
  OfficialFeat,
  FightingStyleOption,
  ABILITY_SCORE_EXPLANATIONS,
} from '../data/characterCreatorData';
import {
  WikidotRace,
  WikidotSubrace,
  WikidotClass,
  WikidotBackground,
} from '../data/wikidotData';
import { formatBackgroundWealth } from '../data/wikidotBackgroundsData';
import { ALL_WIKIDOT_FEATS } from '../data/wikidotFeatsData';
import { CompendiumInspectData } from './CompendiumInspectModal';
import { useLanguageStore } from '../hooks/useLanguageStore';
import { translateBackgroundDescription } from '../utils/dndEnglishRoleplayAndBackgrounds';
import {
  translateDndTitle,
  translateDndText,
  translateAbilityText,
  translateSkillName,
  translateSpellSchool,
  translateSpellMeta,
  FEAT_CATEGORY_EN,
} from '../utils/dndEnglishTranslator';
import { Spell, AbilityScores } from '../types';

// =========================================================================
// 1. FEAT CARD (DOTE)
// =========================================================================
interface FeatCardProps {
  feat: OfficialFeat;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
  currentChoice: { featId?: string; featAbilityChoice?: keyof AbilityScores; featSubChoices?: string[] };
  setSlotChoice: (update: { featId?: string; featAbilityChoice?: keyof AbilityScores; featSubChoices?: string[] }) => void;
}

export const FeatCard: React.FC<FeatCardProps> = ({
  feat,
  isSelected,
  onSelect,
  onInspect,
  currentChoice,
  setSlotChoice,
}) => {
  const { isSpanish, t } = useLanguageStore();

  const wikiFeat = React.useMemo(() => {
    if (isSpanish) return null;
    const nameToMatch = (feat.nameEn || feat.name || '').toLowerCase();
    const idToMatch = (feat.id || '').toLowerCase();
    return ALL_WIKIDOT_FEATS.find(
      (wf) =>
        (wf.id && wf.id.toLowerCase() === idToMatch) ||
        (wf.nameEn && wf.nameEn.toLowerCase() === nameToMatch) ||
        (wf.name && wf.name.toLowerCase().includes(nameToMatch))
    );
  }, [feat, isSpanish]);

  const catLabel = isSpanish ? feat.category : (FEAT_CATEGORY_EN[feat.category] || feat.category);
  const featTitle = isSpanish ? feat.name : (feat.nameEn || wikiFeat?.nameEn || translateDndTitle(feat.name));
  const featDescription = isSpanish ? feat.description : (wikiFeat?.description || translateDndText(feat.description));
  const featBenefits = isSpanish ? feat.benefits : (wikiFeat?.benefits && wikiFeat.benefits.length > 0 ? wikiFeat.benefits : feat.benefits.map(translateDndText));
  const featPrereq = feat.prerequisite
    ? (isSpanish ? feat.prerequisite : (wikiFeat?.prerequisite || translateDndText(feat.prerequisite)))
    : undefined;

  const inspectData: CompendiumInspectData = {
    id: feat.id,
    title: featTitle,
    englishTitle: isSpanish ? feat.nameEn : undefined,
    category: isSpanish ? `Dote Oficial • ${feat.category}` : `Official Feat • ${catLabel}`,
    iconType: 'feat',
    prerequisite: featPrereq,
    description: featDescription,
    benefits: featBenefits,
    traits: feat.subChoice
      ? feat.subChoice.options.map((opt) => ({
          name: isSpanish ? opt.name : translateDndTitle(opt.name),
          desc: isSpanish ? opt.desc : translateDndText(opt.desc),
        }))
      : undefined,
    badges: feat.abilityBonus
      ? [
          {
            label: isSpanish ? 'Aumento de Atributo' : 'Ability Score Increase',
            value: `+${feat.abilityBonus.amount} (${(feat.abilityBonus.stats || [])
              .map((s) => (isSpanish ? ABILITY_SCORE_EXPLANATIONS[s]?.abbreviation || s : s.toUpperCase()))
              .join(' / ')})`,
          },
        ]
      : undefined,
    actionButton: {
      label: isSelected
        ? t('Dote Seleccionada', 'Feat Selected')
        : t('Seleccionar esta Dote', 'Select this Feat'),
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none relative group ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] shadow-xs'
      }`}
      title={t('Haz click para seleccionar. Pulsa el ojo para ver la ficha completa.', 'Click to select. Click the eye icon to view the full dossier.')}
    >
      <div>
        {/* Header with Title, Category, Info Button & Checkmark */}
        <div className="flex items-start justify-between gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-fantasy font-bold text-xs text-[#4a361c]">
              {featTitle}
            </span>
            <span className="text-[9px] bg-[#ede1ce] text-[#5e4b37] px-1.5 py-0.2 rounded font-mono font-bold uppercase border border-[#d6c4aa]">
              {catLabel}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-1 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos', 'View full details')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-4 h-4 text-[#8c672b]" />}
          </div>
        </div>

        {/* Prerequisite if any */}
        {featPrereq && (
          <span className="text-[10px] text-amber-800 italic block mt-0.5 font-serif font-medium">
            {t('Requisito:', 'Prerequisite:')} {featPrereq}
          </span>
        )}

        {/* Full unclipped description */}
        <p className="text-[11px] text-[#6e5c4a] mt-1 leading-relaxed">
          {featDescription}
        </p>

        {/* ALL BENEFITS (No slicing, no line-clamp clipping) */}
        <ul className="mt-2 space-y-1.5 border-t border-[#ede1ce] pt-1.5">
          {featBenefits.map((ben, bIdx) => (
            <li key={bIdx} className="text-[10px] sm:text-[11px] text-[#5c4a35] flex items-start gap-1.5">
              <span className="text-[#8c672b] font-bold text-xs leading-none mt-0.5">•</span>
              <span className="leading-relaxed flex-1">{ben}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Half-feat flexible ability score picker if selected */}
      {isSelected && feat.abilityBonus && feat.abilityBonus.stats && feat.abilityBonus.stats.length > 1 && (
        <div
          data-prevent-card-action="true"
          className="mt-3 pt-2 border-t border-[#c5af95] bg-[#f5ede0] p-2.5 rounded-lg select-text"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <label className="block text-[10px] font-bold text-[#4a361c] uppercase mb-1 font-fantasy">
            {t(`Elige qué característica recibe el +${feat.abilityBonus.amount}:`, `Choose which ability score receives +${feat.abilityBonus.amount}:`)}
          </label>
          <div className="flex flex-wrap gap-1">
            {feat.abilityBonus.stats.map((st) => {
              const bonusAmount = feat.abilityBonus?.amount || 1;
              const isStatChosen = currentChoice.featAbilityChoice === st;
              const statNameEn: Record<string, string> = {
                str: 'Strength',
                dex: 'Dexterity',
                con: 'Constitution',
                int: 'Intelligence',
                wis: 'Wisdom',
                cha: 'Charisma',
              };
              return (
                <button
                  key={st}
                  type="button"
                  data-prevent-card-action="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlotChoice({ featAbilityChoice: st });
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  className={`px-2 py-0.5 rounded text-[10px] font-fantasy font-bold transition cursor-pointer ${
                    isStatChosen
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white border border-[#d6c4aa] text-[#4a361c] hover:border-[#8c672b]'
                  }`}
                >
                  {isSpanish ? (ABILITY_SCORE_EXPLANATIONS[st]?.name || st) : (statNameEn[st] || st)} (+{bonusAmount})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tactical Sub-choice picker if selected and feat has subChoice */}
      {isSelected && feat.subChoice && (
        <div
          data-prevent-card-action="true"
          className="mt-3 pt-2.5 border-t border-[#c5af95] bg-[#f5ede0] p-3 rounded-lg space-y-2 select-text"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-[#4a361c] uppercase font-fantasy flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" />
              {isSpanish ? feat.subChoice.title : translateDndTitle(feat.subChoice.title)}
            </label>
            <span className="text-[10px] font-mono font-bold text-[#8c672b] bg-[#ebdcc4] px-1.5 py-0.5 rounded border border-[#d6c4aa]">
              {(currentChoice.featSubChoices || []).length} / {feat.subChoice.maxSelections} {t('seleccionados', 'selected')}
            </span>
          </div>

          {feat.subChoice.description && (
            <p className="text-[10px] text-[#7a6448] leading-tight">
              {isSpanish ? feat.subChoice.description : translateDndText(feat.subChoice.description)}
            </p>
          )}

          <div className="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto pr-1">
            {feat.subChoice.options.map((opt) => {
              const currentSelected = currentChoice.featSubChoices || [];
              const isOptSelected = currentSelected.includes(opt.id);

              const handleToggle = (e: React.MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();
                let updated: string[];
                if (isOptSelected) {
                  updated = currentSelected.filter((id) => id !== opt.id);
                } else {
                  if (feat.subChoice!.maxSelections === 1) {
                    updated = [opt.id];
                  } else if (currentSelected.length < feat.subChoice!.maxSelections) {
                    updated = [...currentSelected, opt.id];
                  } else {
                    updated = [...currentSelected.slice(1), opt.id];
                  }
                }
                setSlotChoice({ featSubChoices: updated });
              };

              return (
                <div
                  key={opt.id}
                  data-prevent-card-action="true"
                  onClick={handleToggle}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  className={`p-2 rounded-md border text-left cursor-pointer transition flex items-start gap-2 ${
                    isOptSelected
                      ? 'bg-[#e4d4ba] border-[#8c672b] text-[#2c241b] shadow-xs ring-1 ring-[#8c672b]'
                      : 'bg-white border-[#d6c4aa] hover:border-[#8c672b] text-[#5c4a35]'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isOptSelected ? 'bg-[#8c672b] border-[#8c672b] text-white' : 'border-[#b8a48b] bg-[#fbf7ee]'
                  }`}>
                    {isOptSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-fantasy font-bold text-[11px] block leading-snug text-[#4a361c]">
                      {isSpanish ? opt.name : translateDndTitle(opt.name)}
                    </span>
                    <span className="text-[10px] text-[#6b5842] block leading-relaxed mt-0.5">
                      {isSpanish ? opt.desc : translateDndText(opt.desc)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 2. SUBRACE CARD (SUBRAZA / LINAJE)
// =========================================================================
interface SubraceCardProps {
  sub: WikidotSubrace;
  parentRace: WikidotRace;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
}

export const SubraceCard: React.FC<SubraceCardProps> = ({
  sub,
  parentRace,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const parentName = isSpanish ? parentRace.name : (parentRace.nameEn || translateDndTitle(parentRace.name));
  const subName = isSpanish ? sub.name : (sub.nameEn || translateDndTitle(sub.name));

  const inspectData: CompendiumInspectData = {
    id: sub.id,
    title: subName,
    subtitle: isSpanish ? `Subraza / Linaje de ${parentName}` : `${parentName} Subrace / Lineage`,
    category: isSpanish ? `Linaje de ${parentName}` : `${parentName} Lineage`,
    iconType: 'subrace',
    description: isSpanish ? sub.description : (sub.descriptionEn || translateDndText(sub.description)),
    traits: sub.traits?.map((tr) => ({
      name: isSpanish ? tr.name : translateDndTitle(tr.name),
      desc: isSpanish ? tr.desc : translateDndText(tr.desc),
    })),
    badges: sub.abilityScoreBonuses
      ? Object.entries(sub.abilityScoreBonuses)
          .filter(([_, v]) => Boolean(v))
          .map(([k, v]) => ({
            label: k === 'any' ? t('A Elección', 'Of Choice') : (isSpanish ? ABILITY_SCORE_EXPLANATIONS[k]?.name || k : k.toUpperCase()),
            value: `+${v}`,
          }))
      : undefined,
    actionButton: {
      label: isSelected ? t('Linaje Seleccionado', 'Lineage Selected') : t('Elegir este Linaje', 'Choose this Lineage'),
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-lg border cursor-pointer transition select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-sm'
          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
      }`}
      title={t('Haz click para seleccionar. Pulsa el ojo para ver todos los rasgos.', 'Click to select. Click the eye icon to view all traits.')}
    >
      <div>
        <div className="flex items-center justify-between font-fantasy font-bold text-xs">
          <span className="text-[#4a361c]">{subName}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos', 'View full details')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        {/* Ability Score Bonus Badges */}
        <div className="flex flex-wrap gap-1 mt-1 mb-1">
          {sub.abilityScoreBonuses &&
            Object.entries(sub.abilityScoreBonuses).map(([k, v]) => {
              if (!v) return null;
              const label =
                k === 'any'
                  ? (isSpanish ? `+${v} a elección` : `+${v} of choice`)
                  : `+${v} ${isSpanish ? (ABILITY_SCORE_EXPLANATIONS[k]?.abbreviation || k) : k.toUpperCase()}`;
              return (
                <span
                  key={k}
                  className="text-[9px] bg-[#8c672b]/20 text-[#8c672b] px-1.5 py-0.2 rounded font-mono font-bold"
                >
                  {label}
                </span>
              );
            })}
        </div>

        <p className="text-[10px] sm:text-[11px] text-[#6e5c4a] mt-0.5 leading-relaxed">
          {isSpanish ? sub.description : (sub.descriptionEn || translateDndText(sub.description))}
        </p>
      </div>
    </div>
  );
};

// =========================================================================
// 3. RACE CARD (RAZA)
// =========================================================================
interface RaceCardProps {
  race: WikidotRace;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
}

export const RaceCard: React.FC<RaceCardProps> = ({
  race,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  // Racial Hit Points / Health calculation & analysis
  const baseCon = race.abilityScoreBonuses?.con || 0;
  const anyBonus = race.abilityScoreBonuses?.any || 0;
  const hasDwarvenToughness =
    race.traits?.some((tr) => tr.name.toLowerCase().includes('dureza enana') || tr.desc.toLowerCase().includes('puntos de golpe') || tr.desc.toLowerCase().includes('puntos de vida')) ||
    race.subraces?.some((sr) => sr.traits?.some((tr) => tr.name.toLowerCase().includes('dureza enana') || tr.desc.toLowerCase().includes('puntos de golpe') || tr.desc.toLowerCase().includes('puntos de vida')));

  const hpImpact = hasDwarvenToughness
    ? (isSpanish ? '+2 PG máx / nivel (+1 CON, +1 Dureza Enana)' : '+2 Max HP / level (+1 CON, +1 Dwarven Toughness)')
    : baseCon >= 2
    ? (isSpanish ? '+1 PG máx / nivel (+2 Constitución)' : '+1 Max HP / level (+2 Constitution)')
    : baseCon === 1
    ? (isSpanish ? '+0.5 PG prom. / nivel (+1 CON)' : '+0.5 Avg HP / level (+1 CON)')
    : anyBonus > 0
    ? (isSpanish ? 'Flexible (+1 PG si asignas a CON)' : 'Flexible (+1 HP if assigned to CON)')
    : (isSpanish ? 'Estándar (+0 PG racial adicional)' : 'Standard (+0 extra racial HP)');

  const hpRange = hasDwarvenToughness
    ? t('11 - 16 PG a Nivel 1 (según clase y CON)', '11 - 16 HP at Level 1 (by class & CON)')
    : baseCon >= 2
    ? t('11 - 15 PG a Nivel 1 (según clase y CON)', '11 - 15 HP at Level 1 (by class & CON)')
    : t('10 - 14 PG a Nivel 1 (según clase y CON)', '10 - 14 HP at Level 1 (by class & CON)');

  // Build complete 1:1 traits list without omitting any detail
  const fullTraits = [
    ...race.traits.map((tr) => ({
      name: isSpanish ? tr.name : translateDndTitle(tr.name),
      desc: isSpanish ? tr.desc : translateDndText(tr.desc),
    })),
    ...(race.subraces && race.subraces.length > 0
      ? race.subraces.map((sr) => {
          const bonuses = Object.entries(sr.abilityScoreBonuses || {})
            .filter(([_, v]) => Boolean(v))
            .map(([k, v]) => `+${v} ${k === 'any' ? t('a elección', 'of choice') : k.toUpperCase()}`)
            .join(', ');
          const srTraits = (sr.traits || [])
            .map((tr) => `${isSpanish ? tr.name : translateDndTitle(tr.name)}: ${isSpanish ? tr.desc : translateDndText(tr.desc)}`)
            .join(' | ');
          const srName = isSpanish ? sr.name : (sr.nameEn || translateDndTitle(sr.name));
          const srDesc = isSpanish ? sr.description : (sr.descriptionEn || translateDndText(sr.description));
          return {
            name: `${t('Linaje Oficial:', 'Official Lineage:')} ${srName}`,
            desc: `${srDesc}${bonuses ? ` • ${t('Bonificadores:', 'Bonuses:')} ${bonuses}.` : ''}${srTraits ? ` • ${t('Rasgos de Linaje:', 'Lineage Traits:')} ${srTraits}` : ''}`,
          };
        })
      : []),
  ];

  const inspectData: CompendiumInspectData = {
    id: race.id,
    title: isSpanish ? race.name : (race.nameEn || translateDndTitle(race.name)),
    category: isSpanish
      ? `Raza Oficial • ${race.category || 'General'}`
      : `Official Race • ${race.categoryEn || 'Standard'}`,
    iconType: 'race',
    description: isSpanish ? race.description : (race.descriptionEn || translateDndText(race.description)),
    traits: fullTraits,
    badges: [
      { label: t('Categoría', 'Category'), value: isSpanish ? (race.category || 'Estándar') : (race.categoryEn || 'Standard') },
      { label: t('Impacto en Vida (PG)', 'HP Impact'), value: hpImpact, variant: 'green' },
      { label: t('Vida Aprox. Nivel 1', 'Approx. Level 1 HP'), value: hpRange, variant: 'amber' },
      { label: t('Velocidad', 'Speed'), value: isSpanish ? race.speed : race.speed.replace(/pies/gi, 'ft.') },
      { label: t('Tamaño', 'Size'), value: isSpanish ? race.size : (race.size === 'Pequeño' ? 'Small' : 'Medium') },
      {
        label: t('Visión en Oscuridad', 'Darkvision'),
        value: race.darkvision > 0 ? `${race.darkvision} ${t('pies', 'ft.')}` : t('No tiene', 'None'),
      },
      { label: t('Idiomas', 'Languages'), value: race.languages.join(', ') },
    ],
    actionButton: {
      label: isSelected ? t('Raza Seleccionada', 'Race Selected') : t('Elegir esta Raza', 'Choose this Race'),
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] opacity-90 hover:opacity-100 shadow-xs'
      }`}
      title={t('Haz click para seleccionar. Pulsa el ojo para ver los rasgos.', 'Click to select. Click the eye icon to view traits.')}
    >
      <div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] truncate">
              {isSpanish ? race.name : (race.nameEn || translateDndTitle(race.name))}
            </h5>
            {race.category && (
              <span className="text-[9px] bg-[#ebdcc4] text-[#78350f] px-1 py-0.2 rounded font-mono font-bold uppercase border border-[#d6c4aa]">
                {isSpanish ? race.category : (race.categoryEn || race.category)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos', 'View full details')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        {/* Racial Ability Score Badges */}
        <div className="flex flex-wrap gap-1 mt-1 mb-1">
          {race.abilityScoreBonuses && Object.keys(race.abilityScoreBonuses).length > 0 ? (
            Object.entries(race.abilityScoreBonuses).map(([k, v]) => {
              if (!v) return null;
              const label =
                k === 'any'
                  ? (isSpanish ? `+${v} a elección` : `+${v} of choice`)
                  : `+${v} ${isSpanish ? (ABILITY_SCORE_EXPLANATIONS[k]?.abbreviation || k) : k.toUpperCase()}`;
              return (
                <span
                  key={k}
                  className="text-[9px] bg-[#8c672b]/20 text-[#8c672b] px-1.5 py-0.2 rounded font-mono font-bold"
                >
                  {label}
                </span>
              );
            })
          ) : (
            <span className="text-[9px] bg-[#8c672b]/15 text-[#8c672b] px-1.5 py-0.2 rounded font-mono font-bold">
              {isSpanish ? 'Según linaje / subraza' : 'By lineage / subrace'}
            </span>
          )}
        </div>

        {/* Racial Hit Points Indicator */}
        <div className="text-[9px] text-[#2d6e32] font-mono font-bold flex items-center gap-1 mb-1">
          <span>🛡️ {isSpanish ? 'Vida:' : 'HP:'}</span>
          <span>{hpImpact}</span>
        </div>

        <p className="text-[10px] text-[#6e5c4a] mt-0.5 leading-relaxed">
          {isSpanish ? race.description : (race.descriptionEn || translateDndText(race.description))}
        </p>
      </div>

      <div className="mt-2 pt-1.5 border-t border-[#ede1ce] flex items-center justify-between text-[9px] text-[#8c672b] font-mono">
        <span>{isSpanish ? race.speed : race.speed.replace('pies', 'feet')}</span>
        {race.subraces && race.subraces.length > 0 && (
          <span className="bg-[#ede1ce] px-1.5 py-0.2 rounded font-bold">
            {race.subraces.length} {isSpanish ? 'linajes' : 'lineages'}
          </span>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 4. CLASS CARD (CLASE)
// =========================================================================
interface ClassCardProps {
  cls: WikidotClass;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  cls,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const clsNameDisplay = isSpanish ? cls.name : (cls.nameEn || translateDndTitle(cls.name));
  // Full 1:1 class traits - NO SLICING, all 20 levels of features included
  const classTraits = [
    ...(cls.featuresByLevel || []).map((f) => ({
      name: `${t('Nivel', 'Level')} ${f.level}: ${isSpanish ? f.name : translateDndTitle(f.name)}`,
      desc: isSpanish ? f.desc : translateDndText(f.desc),
    })),
    ...(cls.subclasses && cls.subclasses.length > 0
      ? [
          {
            name: isSpanish
              ? `Subclases Oficiales (${cls.subclasses.length} Sendas de ${clsNameDisplay})`
              : `Official Subclasses (${cls.subclasses.length} ${clsNameDisplay} Subclasses)`,
            desc: cls.subclasses
              .map((s) => `• ${isSpanish ? s.name : translateDndTitle(s.name)}: ${isSpanish ? s.description : translateDndText(s.description)}`)
              .join('\n\n'),
          },
        ]
      : []),
  ];

  const inspectData: CompendiumInspectData = {
    id: cls.id,
    title: clsNameDisplay,
    category: t('Clase Oficial D&D 5e', 'Official D&D 5e Class'),
    iconType: 'class',
    description: isSpanish ? cls.description : (cls.descriptionEn || translateDndText(cls.description)),
    traits: classTraits,
    badges: [
      { label: t('Dado de Golpe', 'Hit Die'), value: `d${cls.hitDie}` },
      { label: t('Vida a Nivel 1', 'Level 1 HP'), value: `${cls.hitDie} + CON Mod`, variant: 'green' },
      { label: t('Vida por Nivel Posterior', 'HP at Higher Levels'), value: `${Math.floor(cls.hitDie / 2) + 1} (or 1d${cls.hitDie}) + CON Mod`, variant: 'amber' },
      { label: t('Característica Principal', 'Primary Ability'), value: isSpanish ? cls.primaryAbility : translateAbilityText(cls.primaryAbility) },
      { label: t('Salvaciones', 'Saving Throws'), value: cls.savingThrows.map((st) => (isSpanish ? st : translateAbilityText(st))).join(', ') },
      { label: t('Armaduras', 'Armor'), value: cls.armorProficiencies.join(', ') },
      { label: t('Armas', 'Weapons'), value: cls.weaponProficiencies.join(', ') },
      { label: t('Tipo de Magia', 'Magic Type'), value: cls.isSpellcaster ? t('Conjurador', 'Spellcaster') : t('No Mágico', 'Non-Spellcaster') },
    ],
    actionButton: {
      label: isSelected ? t('Clase Seleccionada', 'Class Selected') : t('Elegir esta Clase', 'Choose this Class'),
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] opacity-90 hover:opacity-100 shadow-xs'
      }`}
      title={t('Haz click para seleccionar. Pulsa el ojo para ver la progresión completa.', 'Click to select. Click the eye icon to view full progression.')}
    >
      <div>
        <div className="flex items-center justify-between">
          <h5 className="font-fantasy font-bold text-xs text-[#4a361c]">
            {clsNameDisplay}
          </h5>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos de la clase (Nivel 1 a 20)', 'View full class details (Levels 1 to 20)')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        <span className="text-[10px] text-[#8c672b] font-mono block mt-0.5 font-bold">
          {isSpanish ? `Dado d${cls.hitDie}` : `Hit Die d${cls.hitDie}`} • {isSpanish ? cls.primaryAbility : translateAbilityText(cls.primaryAbility)}
        </span>

        {/* Health Display on Class Card */}
        <span className="text-[9px] text-[#2d6e32] font-mono block font-bold">
          ❤️ {isSpanish ? `Vida Nv 1: ${cls.hitDie} + CON | Media: +${Math.floor(cls.hitDie / 2) + 1}/nv` : `Lv 1 HP: ${cls.hitDie} + CON | Avg: +${Math.floor(cls.hitDie / 2) + 1}/lv`}
        </span>

        <p className="text-[10px] text-[#6e5c4a] mt-1 leading-relaxed">
          {isSpanish ? cls.description : (cls.descriptionEn || translateDndText(cls.description))}
        </p>
      </div>
    </div>
  );
};

// =========================================================================
// 5. SUBCLASS CARD (SUBCLASE)
// =========================================================================
interface SubclassCardProps {
  sub: { id: string; name: string; description: string; features?: { level: number; name: string; desc: string }[] };
  classNameStr: string;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
  isLocked?: boolean;
  requiredLevel?: number;
}

export const SubclassCard: React.FC<SubclassCardProps> = ({
  sub,
  classNameStr,
  isSelected,
  onSelect,
  onInspect,
  isLocked = false,
  requiredLevel = 3,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const subNameDisplay = isSpanish ? sub.name : translateDndTitle(sub.name);
  const subDescDisplay = isSpanish ? sub.description : translateDndText(sub.description);

  const inspectData: CompendiumInspectData = {
    id: sub.id,
    title: subNameDisplay,
    subtitle: isSpanish ? `Arquetipo de ${classNameStr}` : `${classNameStr} Archetype`,
    category: isSpanish ? `Subclase de ${classNameStr}` : `${classNameStr} Subclass`,
    iconType: 'subclass',
    description: subDescDisplay,
    traits: sub.features?.map((f) => ({
      name: `${t('Nivel', 'Level')} ${f.level}: ${isSpanish ? f.name : translateDndTitle(f.name)}`,
      desc: isSpanish ? f.desc : translateDndText(f.desc),
    })),
    badges: isLocked
      ? [{ label: t('Requisito', 'Requirement'), value: t(`Desbloquea a Nivel ${requiredLevel}`, `Unlocks at Level ${requiredLevel}`), variant: 'amber' }]
      : undefined,
    actionButton: isLocked
      ? {
          label: t(`🔒 Se desbloquea a Nivel ${requiredLevel}`, `🔒 Unlocks at Level ${requiredLevel}`),
          onClick: () => {},
          disabled: true,
        }
      : {
          label: isSelected ? t('Subclase Elegida', 'Subclass Chosen') : t('Elegir esta Subclase', 'Choose this Subclass'),
          onClick: onSelect,
          isSelected,
        },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-lg border transition select-none flex flex-col justify-between ${
        isLocked
          ? 'bg-[#f4ecdf] border-dashed border-[#cbb79d] opacity-85 hover:opacity-100 cursor-pointer'
          : isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-sm cursor-pointer'
          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b] cursor-pointer'
      }`}
      title={
        isLocked
          ? t(`Bloqueado: se consagra a Nivel ${requiredLevel}. Haz click para inspeccionar sus rasgos.`, `Locked: unlocks at Level ${requiredLevel}. Click to inspect features.`)
          : t('Haz click para seleccionar. Pulsa el ojo para ver los rasgos del arquetipo.', 'Click to select. Click the eye icon to view archetype features.')
      }
    >
      <div>
        <div className="flex items-center justify-between font-fantasy font-bold text-xs">
          <span className={`flex items-center gap-1.5 ${isLocked ? 'text-[#7a6448]' : 'text-[#4a361c]'}`}>
            {isLocked && <Lock className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />}
            <span>{subNameDisplay}</span>
          </span>
          <div className="flex items-center gap-1">
            {isLocked ? (
              <span className="text-[9px] bg-[#d9cbb8] text-[#5c4a35] px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
                {t('Nv', 'Lv')} {requiredLevel}
              </span>
            ) : isSelected ? (
              <Check className="w-3.5 h-3.5 text-[#8c672b]" />
            ) : null}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos', 'View full details')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-[10px] sm:text-[11px] text-[#6e5c4a] mt-1 leading-relaxed">
          {subDescDisplay}
        </p>
      </div>
    </div>
  );
};

// =========================================================================
// 6. CLASS PROGRESSION FEATURE CARD (RASGO DE CLASE POR NIVEL)
// =========================================================================
interface ClassProgressionCardProps {
  feat: { level: number; name: string; desc: string };
  characterLevel: number;
  classNameStr: string;
  onInspect: (data: CompendiumInspectData) => void;
}

export const ClassProgressionCard: React.FC<ClassProgressionCardProps> = ({
  feat,
  characterLevel,
  classNameStr,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const isUnlocked = feat.level <= characterLevel;
  const featNameDisplay = isSpanish ? feat.name : translateDndTitle(feat.name);
  const featDescDisplay = isSpanish ? feat.desc : translateDndText(feat.desc);

  const inspectData: CompendiumInspectData = {
    title: featNameDisplay,
    subtitle: isSpanish ? `Rasgo de Nivel ${feat.level} de ${classNameStr}` : `Level ${feat.level} ${classNameStr} Feature`,
    category: isSpanish ? `Rasgo de ${classNameStr}` : `${classNameStr} Feature`,
    iconType: 'feature',
    description: featDescDisplay,
    badges: [
      { label: isSpanish ? 'Clase' : 'Class', value: classNameStr },
      { label: isSpanish ? 'Nivel Requerido' : 'Required Level', value: `${isSpanish ? 'Nivel' : 'Level'} ${feat.level}` },
      { label: isSpanish ? 'Estado' : 'Status', value: isUnlocked ? (isSpanish ? 'Activo en tu PJ' : 'Active on your PC') : (isSpanish ? 'Bloqueado (Nivel superior)' : 'Locked (Higher level)') },
    ],
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={handleInspect}
      className={`p-2.5 rounded-lg border text-xs transition cursor-pointer select-none ${
        isUnlocked
          ? 'bg-[#fcf9f2] border-[#c5af95] shadow-xs hover:border-[#8c672b]'
          : 'bg-[#ede3d4] border-[#d8cbb8] opacity-70 hover:opacity-90'
      }`}
      title={t('Haz click para ver la explicación completa.', 'Click to view full explanation.')}
    >
      <div className="flex items-center justify-between">
        <span className="font-fantasy font-bold text-[#4a361c] flex items-center gap-2">
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
              isUnlocked ? 'bg-[#8c672b] text-white' : 'bg-[#d0c0ac] text-[#6b5842]'
            }`}
          >
            {isSpanish ? 'Nv' : 'Lv'} {feat.level}
          </span>
          {featNameDisplay}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleInspect();
            }}
            className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
            title={t('Ver detalles completos', 'View full details')}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {isUnlocked ? (
            <span className="text-[10px] text-[#2e7d32] font-mono font-bold">{isSpanish ? 'Activo' : 'Active'}</span>
          ) : (
            <span className="text-[10px] text-[#7a6448] font-mono flex items-center gap-1">
              <Lock className="w-3 h-3" /> {isSpanish ? 'Bloqueado' : 'Locked'}
            </span>
          )}
        </div>
      </div>

      <p className="text-[#5c4a35] text-[11px] mt-1 leading-relaxed">
        {featDescDisplay}
      </p>
    </div>
  );
};

// =========================================================================
// 7. FIGHTING STYLE / TACTICAL CARD (ESTILO DE COMBATE)
// =========================================================================
interface FightingStyleCardProps {
  style: FightingStyleOption;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
}

export const FightingStyleCard: React.FC<FightingStyleCardProps> = ({
  style,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const styleNameDisplay = isSpanish ? style.name : translateDndTitle(style.name);
  const styleShortDisplay = isSpanish ? style.shortDesc : translateDndText(style.shortDesc);
  const styleDetailedDisplay = isSpanish ? style.detailedDesc : translateDndText(style.detailedDesc);

  const inspectData: CompendiumInspectData = {
    id: style.id,
    title: styleNameDisplay,
    category: isSpanish ? 'Estilo de Combate Oficial' : 'Official Fighting Style',
    iconType: 'style',
    description: styleDetailedDisplay,
    quote: styleShortDisplay,
    badges: [
      { label: isSpanish ? 'Clases que lo Aprenden' : 'Classes', value: style.allowedClasses.join(', ') },
    ],
    actionButton: {
      label: isSelected ? (isSpanish ? 'Estilo Elegido' : 'Style Chosen') : (isSpanish ? 'Elegir este Estilo' : 'Choose this Style'),
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-lg border cursor-pointer transition select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-sm'
          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
      }`}
      title={t('Haz click para seleccionar. Pulsa el ojo para ver detalles tácticos.', 'Click to select. Click the eye icon to view tactical details.')}
    >
      <div>
        <div className="flex items-center justify-between font-fantasy font-bold text-xs text-[#4a361c]">
          <div className="flex items-center gap-1.5">
            <span>{style.icon}</span>
            <span>{styleNameDisplay}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos', 'View full details')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        <p className="text-[11px] text-[#8c672b] mt-1 font-bold">
          {styleShortDisplay}
        </p>
        <p className="text-[10px] text-[#6e5c4a] mt-0.5 leading-relaxed">
          {styleDetailedDisplay}
        </p>
      </div>
    </div>
  );
};

// =========================================================================
// 8. BACKGROUND CARD (TRASFONDO)
// =========================================================================
interface BackgroundCardProps {
  bg: WikidotBackground;
  isSelected: boolean;
  onSelect: () => void;
  onInspect: (data: CompendiumInspectData) => void;
}

export const BackgroundCard: React.FC<BackgroundCardProps> = ({
  bg,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const bgNameDisplay = isSpanish ? bg.name : (bg.nameEn || translateDndTitle(bg.name));
  const bgDescDisplay = isSpanish ? bg.description : (translateBackgroundDescription(bg.id, bg.nameEn) || translateDndText(bg.description));

  const inspectData: CompendiumInspectData = {
    id: bg.id,
    title: bgNameDisplay,
    englishTitle: isSpanish ? bg.nameEn : undefined,
    category: isSpanish ? `Trasfondo Oficial • ${bg.category}` : `Official Background • ${bg.category}`,
    iconType: 'background',
    description: bgDescDisplay,
    detailedDescription: isSpanish
      ? (bg.detailedDescription || bg.description)
      : (translateBackgroundDescription(bg.id, bg.nameEn) || translateDndText(bg.detailedDescription || bg.description)),
    quote: isSpanish
      ? `Reglas Oficiales de Trasfondo 5e • ${bg.category}`
      : `Official 5e Background Rules • ${bg.category}`,
    traits: [
      {
        name: `${t('Rasgo Especial:', 'Background Feature:')} ${isSpanish ? bg.featureName : translateDndTitle(bg.featureName)}`,
        desc: isSpanish ? bg.featureDescription : translateDndText(bg.featureDescription),
      },
      ...(bg.skillProficiencies && bg.skillProficiencies.length > 0
        ? [
            {
              name: t('Competencias en Habilidades (Fijas)', 'Skill Proficiencies (Fixed)'),
              desc: isSpanish
                ? `Este trasfondo te otorga competencia permanente en: ${bg.skillProficiencies.join(', ')}. Sumas tu bonificador de competencia a todas las tiradas de estas habilidades.`
                : `This background grants permanent proficiency in: ${bg.skillProficiencies.map(translateSkillName).join(', ')}. You add your proficiency bonus to all checks using these skills.`,
            },
          ]
        : bg.skillChoices
        ? [
            {
              name: `${t('Elección de Habilidades', 'Skill Choices')} (${bg.skillChoices.count})`,
              desc: isSpanish
                ? `Elige ${bg.skillChoices.count} habilidades entre: ${bg.skillChoices.options.join(', ')}.`
                : `Choose ${bg.skillChoices.count} skills from: ${bg.skillChoices.options.map(translateSkillName).join(', ')}.`,
            },
          ]
        : []),
      ...(bg.toolProficiencies && bg.toolProficiencies.length > 0
        ? [
            {
              name: t('Competencias en Herramientas (Fijas)', 'Tool Proficiencies (Fixed)'),
              desc: isSpanish
                ? `Ganas competencia oficial para utilizar: ${bg.toolProficiencies.join(', ')}.`
                : `You gain proficiency with: ${bg.toolProficiencies.map(translateDndText).join(', ')}.`,
            },
          ]
        : []),
      ...(bg.toolChoices
        ? [
            {
              name: `${t('Elección de Competencia en Herramientas / Instrumentos', 'Tool / Instrument Choice')} (${bg.toolChoices.count})`,
              desc: isSpanish
                ? `Puedes elegir ${bg.toolChoices.count} tipo de herramienta o instrumento musical entre: ${bg.toolChoices.options.join(', ')}.`
                : `Choose ${bg.toolChoices.count} tool or musical instrument from: ${bg.toolChoices.options.map(translateDndText).join(', ')}.`,
            },
          ]
        : []),
      ...(bg.languagesCount
        ? [
            {
              name: t('Idiomas Adicionales Otorgados', 'Additional Languages Granted'),
              desc: isSpanish
                ? `Aprendes ${bg.languagesCount} idioma(s) extra a tu elección.`
                : `You learn ${bg.languagesCount} additional language(s) of your choice.`,
            },
          ]
        : []),
      ...(bg.equipmentChoices && bg.equipmentChoices.length > 0
        ? bg.equipmentChoices.map((c) => ({
            name: `${t('Elección de Equipo:', 'Equipment Choice:')} ${isSpanish ? c.label : translateDndTitle(c.label)}`,
            desc: `${isSpanish ? c.description : translateDndText(c.description)} ${t('Opciones disponibles:', 'Available options:')} ${c.options ? c.options.map((o) => (isSpanish ? o : translateDndText(o))).join(' • ') : t('Personalizable', 'Customizable')}.`,
          }))
        : []),
    ],
    badges: [
      { label: t('Categoría', 'Category'), value: bg.category },
      { label: t('Orientación', 'Orientation'), value: bg.orientation || 'General' },
      {
        label: t('Habilidades', 'Skills'),
        value:
          bg.skillProficiencies.length > 0
            ? bg.skillProficiencies.map((s) => (isSpanish ? s : translateSkillName(s))).join(', ')
            : `${bg.skillChoices?.count || 0} ${t('a elegir', 'to choose')}`,
      },
      {
        label: t('Herramientas', 'Tools'),
        value:
          bg.toolProficiencies && bg.toolProficiencies.length > 0
            ? bg.toolProficiencies.map((tp) => (isSpanish ? tp : translateDndText(tp))).join(', ')
            : bg.toolChoices
            ? `${bg.toolChoices.count} ${t('a elegir', 'to choose')}`
            : t('Ninguna', 'None'),
      },
      ...(bg.languagesCount ? [{ label: t('Idiomas', 'Languages'), value: `+${bg.languagesCount}` }] : []),
      { label: t('Riqueza Inicial', 'Starting Wealth'), value: formatBackgroundWealth(bg) },
    ],
    equipment: isSpanish ? bg.suggestedEquipment : translateDndText(bg.suggestedEquipment),
    extraNotes: isSpanish
      ? `Riqueza Inicial oficial: ${formatBackgroundWealth(bg)} guardadas en tu monedero de aventurero.`
      : `Official Starting Wealth: ${formatBackgroundWealth(bg).replace('po', 'gp')} stored in your adventurer's pouch.`,
    actionButton: {
      label: isSelected ? t('Trasfondo Elegido', 'Background Chosen') : t('Elegir este Trasfondo', 'Choose this Background'),
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const getOrientationBadge = (ori?: string) => {
    switch (ori) {
      case 'Magia':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Combate':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Sigilo':
        return 'bg-slate-200 text-slate-800 border-slate-300';
      case 'Social':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Exploración':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-[#ede1ce] text-[#5e4b37] border-[#d6c4aa]';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] opacity-90 hover:opacity-100 shadow-xs'
      }`}
      title={t('Haz click para seleccionar. Pulsa el ojo para ver el rasgo especial y equipo.', 'Click to select. Click the eye icon to view the special feature and equipment.')}
    >
      <div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] truncate">
              {bgNameDisplay}
            </h5>
            {bg.orientation && (
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border ${getOrientationBadge(bg.orientation)}`}>
                {isSpanish ? bg.orientation : ({ Magia: 'Magic', Combate: 'Combat', Sigilo: 'Stealth', Social: 'Social', Exploración: 'Exploration' }[bg.orientation] || bg.orientation)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title={t('Ver detalles completos', 'View full details')}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        <p className="text-[10px] text-[#6e5c4a] mt-1 leading-relaxed">
          {bgDescDisplay}
        </p>
      </div>

      <div className="mt-2 pt-1 border-t border-[#ede1ce] text-[9px] text-[#8c672b] font-mono font-bold flex items-center justify-between">
        <span className="leading-snug">
          {bg.skillProficiencies.map((s) => (isSpanish ? s : translateSkillName(s))).join(' • ')}
        </span>
        <span className="text-[8px] text-[#8c672b]/80 ml-1 shrink-0">{bg.category.replace('Setting: ', '').replace('AL: ', '')}</span>
      </div>
    </div>
  );
};

// =========================================================================
// 9. SPELL CARD (HECHIZO EN SELECTOR)
// =========================================================================
interface SpellCardComponentProps {
  spell: Spell;
  isSelected: boolean;
  onToggle: () => void;
  onInspect: (spell: Spell) => void;
  isHigherLevel?: boolean;
  requiredCasterLevel?: number;
}

export const SpellCardComponent: React.FC<SpellCardComponentProps> = ({
  spell,
  isSelected,
  onToggle,
  onInspect,
  isHigherLevel,
  requiredCasterLevel,
}) => {
  const { isSpanish, t } = useLanguageStore();

  return (
    <div
      onClick={onToggle}
      className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 select-none cursor-pointer ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] shadow-xs'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b]'
      }`}
      title={t('Haz click para aprender/desaprender. Pulsa Ver detalles para la ficha completa.', 'Click to learn/unlearn. Click View details for the full spell card.')}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h6 className="font-fantasy font-bold text-xs text-[#4a361c]">
              {isSpanish ? spell.name : (spell.nameEn || translateDndTitle(spell.name))}
            </h6>
            {isSpanish && spell.nameEn && spell.nameEn.toLowerCase() !== spell.name.toLowerCase() && (
              <span className="text-[10px] text-[#8c672b] italic font-serif">
                ({spell.nameEn})
              </span>
            )}
            <span className="text-[9px] bg-[#ede1ce] text-[#5e4b37] px-1 rounded font-mono font-bold">
              {spell.level === 0 ? (isSpanish ? 'Truco' : 'Cantrip') : `${isSpanish ? 'Nv' : 'Lv'} ${spell.level}`}
            </span>
            {isHigherLevel && (
              <span className="text-[8px] bg-amber-100 text-amber-900 border border-amber-300 px-1 rounded font-mono font-bold" title={t(`Desbloquea en ranuras a nivel ${requiredCasterLevel || (spell.level * 2 - 1)}`, `Unlocks in spell slots at level ${requiredCasterLevel || (spell.level * 2 - 1)}`)}>
                {isSpanish ? 'Desbloquea a Nv' : 'Unlocks at Lv'} {requiredCasterLevel || (spell.level * 2 - 1)}
              </span>
            )}
            {spell.concentration && (
              <span className="text-[8px] bg-amber-100 text-amber-900 border border-amber-300 px-1 rounded font-mono font-bold">
                C
              </span>
            )}
            {spell.ritual && (
              <span className="text-[8px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-1 rounded font-mono font-bold">
                R
              </span>
            )}
            {spell.isRacial && (
              <span
                className="text-[8px] bg-purple-100 text-purple-900 border border-purple-300 px-1 rounded font-mono font-bold flex items-center gap-0.5"
                title={t(`Magia innata concedida por tu linaje (${spell.racialOrigin || 'Raza'}). No consume ranuras ni cuenta para el límite de clase.`, `Innate magic granted by your lineage (${spell.racialOrigin || 'Race'}). Does not consume spell slots or count against class limits.`)}
              >
                ✨ {isSpanish ? 'Magia Racial' : 'Racial Magic'}
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#6e5c4a] mt-1 leading-relaxed">
            {isSpanish ? spell.description : (spell.descriptionEn || translateDndText(spell.description))}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!spell.isRacial && !isHigherLevel) {
              onToggle();
            }
          }}
          disabled={spell.isRacial || isHigherLevel}
          className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
            spell.isRacial
              ? 'bg-purple-800 text-purple-100 border-purple-700 cursor-default'
              : isHigherLevel
              ? 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed opacity-60'
              : isSelected
              ? 'bg-[#8c672b] text-white border-[#8c672b] cursor-pointer'
              : 'border-[#b0a086] bg-white cursor-pointer'
          }`}
        >
          {(isSelected || spell.isRacial) && <Check className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-[#ede1ce] text-[10px] text-[#8c672b]">
        <span className="italic">
          {isSpanish ? spell.school : translateSpellSchool(spell.school)} • {isSpanish ? spell.castingTime : (spell.castingTimeEn || translateSpellMeta(spell.castingTime))}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInspect(spell);
          }}
          className="font-bold hover:underline flex items-center gap-1 cursor-pointer text-[#6b4c1b]"
        >
          <Eye className="w-3 h-3" /> {isSpanish ? 'Ver detalles →' : 'View details →'}
        </button>
      </div>
    </div>
  );
};
