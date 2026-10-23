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
import { CompendiumInspectData } from './CompendiumInspectModal';
import { useLongPress } from '../hooks/useLongPress';
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
  const inspectData: CompendiumInspectData = {
    id: feat.id,
    title: feat.name,
    englishTitle: feat.nameEn,
    category: `Dote Oficial • ${feat.category}`,
    iconType: 'feat',
    prerequisite: feat.prerequisite,
    description: feat.description,
    benefits: feat.benefits,
    traits: feat.subChoice
      ? feat.subChoice.options.map((opt) => ({
          name: opt.name,
          desc: opt.desc,
        }))
      : undefined,
    badges: feat.abilityBonus
      ? [
          {
            label: 'Aumento de Atributo',
            value: `+${feat.abilityBonus.amount} (${(feat.abilityBonus.stats || [])
              .map((s) => ABILITY_SCORE_EXPLANATIONS[s]?.abbreviation || s)
              .join(' / ')})`,
          },
        ]
      : undefined,
    actionButton: {
      label: isSelected ? 'Dote Seleccionada' : 'Seleccionar esta Dote',
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: onSelect,
  });

  return (
    <div
      {...bind}
      className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none relative group ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] shadow-xs'
      }`}
      title="Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver la ficha completa."
    >
      <div>
        {/* Header with Title, Category, Info Button & Checkmark */}
        <div className="flex items-start justify-between gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-fantasy font-bold text-xs text-[#4a361c]">
              {feat.name}
            </span>
            <span className="text-[9px] bg-[#ede1ce] text-[#5e4b37] px-1.5 py-0.2 rounded font-mono font-bold uppercase border border-[#d6c4aa]">
              {feat.category}
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
              title="Ver detalles completos (o mantén presionado)"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-4 h-4 text-[#8c672b]" />}
          </div>
        </div>

        {/* Prerequisite if any */}
        {feat.prerequisite && (
          <span className="text-[10px] text-amber-800 italic block mt-0.5 font-serif font-medium">
            Requisito: {feat.prerequisite}
          </span>
        )}

        {/* Full unclipped description */}
        <p className="text-[11px] text-[#6e5c4a] mt-1 leading-relaxed">
          {feat.description}
        </p>

        {/* ALL BENEFITS (No slicing, no line-clamp clipping) */}
        <ul className="mt-2 space-y-1.5 border-t border-[#ede1ce] pt-1.5">
          {feat.benefits.map((ben, bIdx) => (
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
            Elige qué característica recibe el +{feat.abilityBonus.amount}:
          </label>
          <div className="flex flex-wrap gap-1">
            {feat.abilityBonus.stats.map((st) => {
              const bonusAmount = feat.abilityBonus?.amount || 1;
              const isStatChosen = currentChoice.featAbilityChoice === st;
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
                  {ABILITY_SCORE_EXPLANATIONS[st]?.name || st} (+{bonusAmount})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tactical Sub-choice picker if selected and feat has subChoice (e.g. Metamagic, Invocations, Fighting Style, Maneuvers, Elements, Skills) */}
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
              {feat.subChoice.title}
            </label>
            <span className="text-[10px] font-mono font-bold text-[#8c672b] bg-[#ebdcc4] px-1.5 py-0.5 rounded border border-[#d6c4aa]">
              {(currentChoice.featSubChoices || []).length} / {feat.subChoice.maxSelections} seleccionados
            </span>
          </div>

          {feat.subChoice.description && (
            <p className="text-[10px] text-[#7a6448] leading-tight">
              {feat.subChoice.description}
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
                    // Replace the earliest selection when max is reached
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
                      {opt.name}
                    </span>
                    <span className="text-[10px] text-[#6b5842] block leading-relaxed mt-0.5">
                      {opt.desc}
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
  const inspectData: CompendiumInspectData = {
    id: sub.id,
    title: sub.name,
    subtitle: `Subraza / Linaje de ${parentRace.name}`,
    category: `Linaje de ${parentRace.name}`,
    iconType: 'subrace',
    description: sub.description,
    traits: sub.traits,
    badges: sub.abilityScoreBonuses
      ? Object.entries(sub.abilityScoreBonuses)
          .filter(([_, v]) => Boolean(v))
          .map(([k, v]) => ({
            label: k === 'any' ? 'A Elección' : ABILITY_SCORE_EXPLANATIONS[k]?.name || k,
            value: `+${v}`,
          }))
      : undefined,
    actionButton: {
      label: isSelected ? 'Linaje Seleccionado' : 'Elegir este Linaje',
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: onSelect,
  });

  return (
    <div
      {...bind}
      className={`p-3 rounded-lg border cursor-pointer transition select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-sm'
          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
      }`}
      title="Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver todos los rasgos."
    >
      <div>
        <div className="flex items-center justify-between font-fantasy font-bold text-xs">
          <span className="text-[#4a361c]">{sub.name}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title="Ver detalles completos"
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
                  ? `+${v} a elección`
                  : `+${v} ${ABILITY_SCORE_EXPLANATIONS[k]?.abbreviation || k}`;
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
          {sub.description}
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
  // Racial Hit Points / Health calculation & analysis
  const baseCon = race.abilityScoreBonuses?.con || 0;
  const anyBonus = race.abilityScoreBonuses?.any || 0;
  const hasDwarvenToughness =
    race.traits?.some((t) => t.name.toLowerCase().includes('dureza enana') || t.desc.toLowerCase().includes('puntos de golpe') || t.desc.toLowerCase().includes('puntos de vida')) ||
    race.subraces?.some((sr) => sr.traits?.some((t) => t.name.toLowerCase().includes('dureza enana') || t.desc.toLowerCase().includes('puntos de golpe') || t.desc.toLowerCase().includes('puntos de vida')));

  const hpImpact = hasDwarvenToughness
    ? '+2 PG máx / nivel (+1 CON, +1 Dureza Enana)'
    : baseCon >= 2
    ? '+1 PG máx / nivel (+2 Constitución)'
    : baseCon === 1
    ? '+0.5 PG prom. / nivel (+1 CON)'
    : anyBonus > 0
    ? 'Flexible (+1 PG si asignas a CON)'
    : 'Estándar (+0 PG racial adicional)';

  const hpRange = hasDwarvenToughness
    ? '11 - 16 PG a Nivel 1 (según clase y CON)'
    : baseCon >= 2
    ? '11 - 15 PG a Nivel 1 (según clase y CON)'
    : '10 - 14 PG a Nivel 1 (según clase y CON)';

  // Build complete 1:1 traits list without omitting any detail
  const fullTraits = [
    ...race.traits,
    ...(race.subraces && race.subraces.length > 0
      ? race.subraces.map((sr) => {
          const bonuses = Object.entries(sr.abilityScoreBonuses || {})
            .filter(([_, v]) => Boolean(v))
            .map(([k, v]) => `+${v} ${k === 'any' ? 'a elección' : k.toUpperCase()}`)
            .join(', ');
          const srTraits = (sr.traits || []).map((t) => `${t.name}: ${t.desc}`).join(' | ');
          return {
            name: `Linaje Oficial: ${sr.name}`,
            desc: `${sr.description}${bonuses ? ` • Bonificadores: ${bonuses}.` : ''}${srTraits ? ` • Rasgos de Linaje: ${srTraits}` : ''}`,
          };
        })
      : []),
  ];

  const inspectData: CompendiumInspectData = {
    id: race.id,
    title: race.name,
    category: `Raza Oficial • ${race.category || 'General'}`,
    iconType: 'race',
    description: race.description,
    traits: fullTraits,
    badges: [
      { label: 'Categoría', value: race.category || 'Estándar' },
      { label: 'Impacto en Vida (PG)', value: hpImpact, variant: 'green' },
      { label: 'Vida Aprox. Nivel 1', value: hpRange, variant: 'amber' },
      { label: 'Velocidad', value: race.speed },
      { label: 'Tamaño', value: race.size },
      {
        label: 'Visión en Oscuridad',
        value: race.darkvision > 0 ? `${race.darkvision} pies` : 'No tiene',
      },
      { label: 'Idiomas', value: race.languages.join(', ') },
    ],
    actionButton: {
      label: isSelected ? 'Raza Seleccionada' : 'Elegir esta Raza',
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: onSelect,
  });

  return (
    <div
      {...bind}
      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] opacity-90 hover:opacity-100 shadow-xs'
      }`}
      title="Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver los rasgos."
    >
      <div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] truncate">
              {race.name}
            </h5>
            {race.category && (
              <span className="text-[9px] bg-[#ebdcc4] text-[#78350f] px-1 py-0.2 rounded font-mono font-bold uppercase border border-[#d6c4aa]">
                {race.category}
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
              title="Ver detalles completos"
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
                  ? `+${v} a elección`
                  : `+${v} ${ABILITY_SCORE_EXPLANATIONS[k]?.abbreviation || k}`;
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
              Según linaje / subraza
            </span>
          )}
        </div>

        {/* Racial Hit Points Indicator */}
        <div className="text-[9px] text-[#2d6e32] font-mono font-bold flex items-center gap-1 mb-1">
          <span>🛡️ Vida:</span>
          <span>{hpImpact}</span>
        </div>

        <p className="text-[10px] text-[#6e5c4a] mt-0.5 leading-relaxed">
          {race.description}
        </p>
      </div>

      <div className="mt-2 pt-1.5 border-t border-[#ede1ce] flex items-center justify-between text-[9px] text-[#8c672b] font-mono">
        <span>{race.speed}</span>
        {race.subraces && race.subraces.length > 0 && (
          <span className="bg-[#ede1ce] px-1.5 py-0.2 rounded font-bold">
            {race.subraces.length} linajes
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
  // Full 1:1 class traits - NO SLICING, all 20 levels of features included
  const classTraits = [
    ...(cls.featuresByLevel || []).map((f) => ({
      name: `Nivel ${f.level}: ${f.name}`,
      desc: f.desc,
    })),
    ...(cls.subclasses && cls.subclasses.length > 0
      ? [
          {
            name: `Subclases Oficiales (${cls.subclasses.length} Sendas de ${cls.name})`,
            desc: cls.subclasses.map((s) => `• ${s.name}: ${s.description}`).join('\n\n'),
          },
        ]
      : []),
  ];

  const inspectData: CompendiumInspectData = {
    id: cls.id,
    title: cls.name,
    category: 'Clase Oficial D&D 5e',
    iconType: 'class',
    description: cls.description,
    traits: classTraits,
    badges: [
      { label: 'Dado de Golpe', value: `d${cls.hitDie}` },
      { label: 'Vida a Nivel 1', value: `${cls.hitDie} + Mod. CON (ej. ${cls.hitDie + 2} PG con CON +2)`, variant: 'green' },
      { label: 'Vida por Nivel Posterior', value: `${Math.floor(cls.hitDie / 2) + 1} (o 1d${cls.hitDie}) + Mod. CON`, variant: 'amber' },
      { label: 'Característica Principal', value: cls.primaryAbility },
      { label: 'Salvaciones', value: cls.savingThrows.join(', ') },
      { label: 'Armaduras', value: cls.armorProficiencies.join(', ') },
      { label: 'Armas', value: cls.weaponProficiencies.join(', ') },
      { label: 'Tipo de Magia', value: cls.isSpellcaster ? cls.casterType || 'Lanzador' : 'No Mágico' },
    ],
    actionButton: {
      label: isSelected ? 'Clase Seleccionada' : 'Elegir esta Clase',
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: onSelect,
  });

  return (
    <div
      {...bind}
      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] opacity-90 hover:opacity-100 shadow-xs'
      }`}
      title="Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver la progresión completa."
    >
      <div>
        <div className="flex items-center justify-between">
          <h5 className="font-fantasy font-bold text-xs text-[#4a361c]">
            {cls.name}
          </h5>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title="Ver detalles completos de la clase (Nivel 1 a 20)"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        <span className="text-[10px] text-[#8c672b] font-mono block mt-0.5 font-bold">
          Dado d{cls.hitDie} • {cls.primaryAbility}
        </span>

        {/* Health Display on Class Card */}
        <span className="text-[9px] text-[#2d6e32] font-mono block font-bold">
          ❤️ Vida Nv 1: {cls.hitDie} + CON | Media: +{Math.floor(cls.hitDie / 2) + 1}/nv
        </span>

        <p className="text-[10px] text-[#6e5c4a] mt-1 leading-relaxed">
          {cls.description}
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
  const inspectData: CompendiumInspectData = {
    id: sub.id,
    title: sub.name,
    subtitle: `Arquetipo de ${classNameStr}`,
    category: `Subclase de ${classNameStr}`,
    iconType: 'subclass',
    description: sub.description,
    traits: sub.features?.map((f) => ({
      name: `Nivel ${f.level}: ${f.name}`,
      desc: f.desc,
    })),
    badges: isLocked
      ? [{ label: 'Requisito', value: `Desbloquea a Nivel ${requiredLevel}`, variant: 'amber' }]
      : undefined,
    actionButton: isLocked
      ? {
          label: `🔒 Se desbloquea a Nivel ${requiredLevel}`,
          onClick: () => {},
          disabled: true,
        }
      : {
          label: isSelected ? 'Subclase Elegida' : 'Elegir esta Subclase',
          onClick: onSelect,
          isSelected,
        },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: isLocked ? handleInspect : onSelect,
  });

  return (
    <div
      {...bind}
      className={`p-3 rounded-lg border transition select-none flex flex-col justify-between ${
        isLocked
          ? 'bg-[#f4ecdf] border-dashed border-[#cbb79d] opacity-85 hover:opacity-100 cursor-pointer'
          : isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-sm cursor-pointer'
          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b] cursor-pointer'
      }`}
      title={
        isLocked
          ? `Bloqueado: se consagra a Nivel ${requiredLevel}. Haz click para inspeccionar sus rasgos.`
          : 'Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver los rasgos del arquetipo.'
      }
    >
      <div>
        <div className="flex items-center justify-between font-fantasy font-bold text-xs">
          <span className={`flex items-center gap-1.5 ${isLocked ? 'text-[#7a6448]' : 'text-[#4a361c]'}`}>
            {isLocked && <Lock className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />}
            <span>{sub.name}</span>
          </span>
          <div className="flex items-center gap-1">
            {isLocked ? (
              <span className="text-[9px] bg-[#d9cbb8] text-[#5c4a35] px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
                Nv {requiredLevel}
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
              title="Ver detalles completos"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-[10px] sm:text-[11px] text-[#6e5c4a] mt-1 leading-relaxed">
          {sub.description}
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
  const isUnlocked = feat.level <= characterLevel;

  const inspectData: CompendiumInspectData = {
    title: feat.name,
    subtitle: `Rasgo de Nivel ${feat.level} de ${classNameStr}`,
    category: `Rasgo de ${classNameStr}`,
    iconType: 'feature',
    description: feat.desc,
    badges: [
      { label: 'Clase', value: classNameStr },
      { label: 'Nivel Requerido', value: `Nivel ${feat.level}` },
      { label: 'Estado', value: isUnlocked ? 'Activo en tu PJ' : 'Bloqueado (Nivel superior)' },
    ],
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: handleInspect,
  });

  return (
    <div
      {...bind}
      className={`p-2.5 rounded-lg border text-xs transition cursor-pointer select-none ${
        isUnlocked
          ? 'bg-[#fcf9f2] border-[#c5af95] shadow-xs hover:border-[#8c672b]'
          : 'bg-[#ede3d4] border-[#d8cbb8] opacity-70 hover:opacity-90'
      }`}
      title="Haz click o mantén presionado para ver la explicación completa."
    >
      <div className="flex items-center justify-between">
        <span className="font-fantasy font-bold text-[#4a361c] flex items-center gap-2">
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
              isUnlocked ? 'bg-[#8c672b] text-white' : 'bg-[#d0c0ac] text-[#6b5842]'
            }`}
          >
            Nv {feat.level}
          </span>
          {feat.name}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleInspect();
            }}
            className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
            title="Ver detalles completos"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {isUnlocked ? (
            <span className="text-[10px] text-[#2e7d32] font-mono font-bold">Activo</span>
          ) : (
            <span className="text-[10px] text-[#7a6448] font-mono flex items-center gap-1">
              <Lock className="w-3 h-3" /> Bloqueado
            </span>
          )}
        </div>
      </div>

      <p className="text-[#5c4a35] text-[11px] mt-1 leading-relaxed">
        {feat.desc}
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
  const inspectData: CompendiumInspectData = {
    id: style.id,
    title: style.name,
    category: 'Estilo de Combate Oficial',
    iconType: 'style',
    description: style.detailedDesc,
    quote: style.shortDesc,
    badges: [
      { label: 'Clases que lo Aprenden', value: style.allowedClasses.join(', ') },
    ],
    actionButton: {
      label: isSelected ? 'Estilo Elegido' : 'Elegir este Estilo',
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: onSelect,
  });

  return (
    <div
      {...bind}
      className={`p-3 rounded-lg border cursor-pointer transition select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-sm'
          : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
      }`}
      title="Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver detalles tácticos."
    >
      <div>
        <div className="flex items-center justify-between font-fantasy font-bold text-xs text-[#4a361c]">
          <div className="flex items-center gap-1.5">
            <span>{style.icon}</span>
            <span>{style.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="p-0.5 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
              title="Ver detalles completos"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        <p className="text-[11px] text-[#8c672b] mt-1 font-bold">
          {style.shortDesc}
        </p>
        <p className="text-[10px] text-[#6e5c4a] mt-0.5 leading-relaxed">
          {style.detailedDesc}
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
  const inspectData: CompendiumInspectData = {
    id: bg.id,
    title: bg.name,
    englishTitle: bg.nameEn,
    category: `Trasfondo Oficial • ${bg.category}`,
    iconType: 'background',
    description: bg.description,
    detailedDescription: bg.detailedDescription || bg.description,
    quote: `Reglas Oficiales de Trasfondo 5e • ${bg.category}`,
    traits: [
      {
        name: `Rasgo Especial: ${bg.featureName}`,
        desc: bg.featureDescription,
      },
      ...(bg.skillProficiencies && bg.skillProficiencies.length > 0
        ? [
            {
              name: 'Competencias en Habilidades (Fijas)',
              desc: `Este trasfondo te otorga competencia permanente en: ${bg.skillProficiencies.join(', ')}. Sumas tu bonificador de competencia a todas las tiradas de estas habilidades.`,
            },
          ]
        : bg.skillChoices
        ? [
            {
              name: `Elección de Habilidades (${bg.skillChoices.count})`,
              desc: `Elige ${bg.skillChoices.count} habilidades entre: ${bg.skillChoices.options.join(', ')}.`,
            },
          ]
        : []),
      ...(bg.toolProficiencies && bg.toolProficiencies.length > 0
        ? [
            {
              name: 'Competencias en Herramientas (Fijas)',
              desc: `Ganas competencia oficial para utilizar: ${bg.toolProficiencies.join(', ')}. Esto te permite sumar tu bonificador de competencia a cualquier prueba que requiera el uso de estas herramientas.`,
            },
          ]
        : []),
      ...(bg.toolChoices
        ? [
            {
              name: `Elección de Competencia en Herramientas / Instrumentos (${bg.toolChoices.count})`,
              desc: `Puedes elegir ${bg.toolChoices.count} tipo de herramienta o instrumento musical entre: ${bg.toolChoices.options.join(', ')} (o introducir uno personalizado de tu elección).`,
            },
          ]
        : []),
      ...(bg.languagesCount
        ? [
            {
              name: 'Idiomas Adicionales Otorgados',
              desc: `Aprendes ${bg.languagesCount} idioma(s) extra a tu elección de los dialectos y lenguas conocidos en el mundo.`,
            },
          ]
        : []),
      ...(bg.equipmentChoices && bg.equipmentChoices.length > 0
        ? bg.equipmentChoices.map((c) => ({
            name: `Elección de Equipo: ${c.label}`,
            desc: `${c.description} Opciones disponibles: ${c.options ? c.options.join(' • ') : 'Personalizable'}.`,
          }))
        : []),
    ],
    badges: [
      { label: 'Categoría', value: bg.category },
      { label: 'Orientación', value: bg.orientation || 'General' },
      {
        label: 'Habilidades',
        value: bg.skillProficiencies.length > 0 ? bg.skillProficiencies.join(', ') : `${bg.skillChoices?.count || 0} a elegir`,
      },
      {
        label: 'Herramientas',
        value:
          bg.toolProficiencies && bg.toolProficiencies.length > 0
            ? bg.toolProficiencies.join(', ')
            : bg.toolChoices
            ? `${bg.toolChoices.count} a elegir`
            : 'Ninguna',
      },
      ...(bg.languagesCount ? [{ label: 'Idiomas', value: `+${bg.languagesCount}` }] : []),
      { label: 'Riqueza Inicial', value: formatBackgroundWealth(bg) },
    ],
    equipment: bg.suggestedEquipment,
    extraNotes: `Riqueza Inicial oficial: ${formatBackgroundWealth(bg)} guardadas en tu monedero de aventurero.`,
    actionButton: {
      label: isSelected ? 'Trasfondo Elegido' : 'Elegir este Trasfondo',
      onClick: onSelect,
      isSelected,
    },
  };

  const handleInspect = () => {
    onInspect(inspectData);
  };

  const bind = useLongPress({
    onLongPress: handleInspect,
    onClick: onSelect,
  });

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
      {...bind}
      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-md ring-1 ring-[#8c672b]'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b] text-[#2c241b] opacity-90 hover:opacity-100 shadow-xs'
      }`}
      title="Haz click para seleccionar. Mantén presionado o pulsa el ojo para ver el rasgo especial y equipo."
    >
      <div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <h5 className="font-fantasy font-bold text-xs text-[#4a361c] truncate">
              {bg.name}
            </h5>
            {bg.orientation && (
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border ${getOrientationBadge(bg.orientation)}`}>
                {bg.orientation}
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
              title="Ver detalles completos"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            {isSelected && <Check className="w-3.5 h-3.5 text-[#8c672b]" />}
          </div>
        </div>

        <p className="text-[10px] text-[#6e5c4a] mt-1 leading-relaxed">
          {bg.description}
        </p>
      </div>

      <div className="mt-2 pt-1 border-t border-[#ede1ce] text-[9px] text-[#8c672b] font-mono font-bold flex items-center justify-between">
        <span className="truncate">{bg.skillProficiencies.join(' • ')}</span>
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
  const bind = useLongPress({
    onLongPress: () => onInspect(spell),
    onClick: () => {
      if (isHigherLevel) {
        onInspect(spell);
      } else {
        onToggle();
      }
    },
  });

  return (
    <div
      {...bind}
      className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 select-none cursor-pointer ${
        isSelected
          ? 'bg-[#ebdcc4] border-2 border-[#8c672b] shadow-xs'
          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b]'
      }`}
      title="Haz click para aprender/desaprender. Mantén presionado o pulsa Ver detalles para la ficha completa."
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h6 className="font-fantasy font-bold text-xs text-[#4a361c]">
              {spell.name}
            </h6>
            {spell.nameEn && spell.nameEn.toLowerCase() !== spell.name.toLowerCase() && (
              <span className="text-[10px] text-[#8c672b] italic font-serif">
                ({spell.nameEn})
              </span>
            )}
            <span className="text-[9px] bg-[#ede1ce] text-[#5e4b37] px-1 rounded font-mono font-bold">
              {spell.level === 0 ? 'Truco' : `Nv ${spell.level}`}
            </span>
            {isHigherLevel && (
              <span className="text-[8px] bg-amber-100 text-amber-900 border border-amber-300 px-1 rounded font-mono font-bold" title={`Desbloquea en ranuras a nivel ${requiredCasterLevel || (spell.level * 2 - 1)}`}>
                Desbloquea a Nv {requiredCasterLevel || (spell.level * 2 - 1)}
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
                title={`Magia innata concedida por tu linaje (${spell.racialOrigin || 'Raza'}). No consume ranuras ni cuenta para el límite de clase.`}
              >
                ✨ Magia Racial
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#6e5c4a] mt-1 leading-relaxed">
            {spell.description}
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
          title={
            spell.isRacial
              ? `Concedido de forma permanente por tu linaje (${spell.racialOrigin || 'Raza'})`
              : isHigherLevel
              ? `Desbloquea en ranuras a nivel ${requiredCasterLevel || (spell.level * 2 - 1)} de tu clase. Solo en modo consulta.`
              : undefined
          }
        >
          {(isSelected || spell.isRacial) && <Check className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-[#ede1ce] text-[10px] text-[#8c672b]">
        <span className="italic">{spell.school} • {spell.castingTime}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInspect(spell);
          }}
          className="font-bold hover:underline flex items-center gap-1 cursor-pointer text-[#6b4c1b]"
        >
          <Eye className="w-3 h-3" /> Ver detalles →
        </button>
      </div>
    </div>
  );
};
