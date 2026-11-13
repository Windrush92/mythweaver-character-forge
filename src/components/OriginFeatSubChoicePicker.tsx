import React, { useMemo, useState } from 'react';
import { Sparkles, Check, Search, Wrench, Music, BookOpen } from 'lucide-react';
import { OFFICIAL_SPELLS_COMPENDIUM } from '../data/spellsData';
import { getAllSpellsForEdition } from '../data/spells2024Overrides';
import { ALL_5E_SKILLS } from '../data/characterCreatorData';
import { ARTISAN_TOOLS_2024, MUSICAL_INSTRUMENTS_2024 } from '../data/dnd2024/backgroundsData2024';
import { Spell } from '../types';

export type OriginFeatSpellList = 'cleric' | 'druid' | 'wizard';
export type OriginFeatSpellListInput = OriginFeatSpellList | 'Clérigo' | 'Druida' | 'Mago';

export function normalizeOriginFeatSpellList(list?: string): OriginFeatSpellList {
  const low = (list || '').toLowerCase();
  if (low.includes('cleric') || low.includes('clérigo') || low.includes('clerigo')) return 'cleric';
  if (low.includes('druid') || low.includes('druida')) return 'druid';
  return 'wizard';
}

export function isOriginFeatWithSubChoice(featId: string): boolean {
  const normId = (featId || '').toLowerCase();
  return (
    normId.includes('magic-initiate') ||
    normId.includes('iniciado') ||
    normId === 'feat-2024-skilled' ||
    normId === 'habil' ||
    normId.endsWith('skilled') ||
    normId.includes('crafter') ||
    normId.includes('artesano') ||
    normId.includes('musician') ||
    normId.includes('musico') ||
    normId.includes('músico')
  );
}

export interface OriginFeatChoiceData {
  featId?: string;
  spellList?: OriginFeatSpellListInput;
  spellAbility?: 'int' | 'wis' | 'cha';
  cantrips?: string[];
  level1Spell?: string;
  skillsOrTools?: string[];
  tools?: string[];
  instruments?: string[];
}

interface OriginFeatSubChoicePickerProps {
  featId: string;
  featName?: string;
  value: OriginFeatChoiceData;
  onChange: (next: OriginFeatChoiceData) => void;
  lockedSpellList?: OriginFeatSpellListInput;
  edition?: '5e' | '5.5e';
  onInspectSpell?: (spell: Spell) => void;
}

const SPELL_LIST_LABELS: Record<'cleric' | 'druid' | 'wizard', { es: string; match: string[] }> = {
  cleric: { es: 'Clérigo', match: ['cleric', 'clérigo', 'clerigo'] },
  druid: { es: 'Druida', match: ['druid', 'druida'] },
  wizard: { es: 'Mago', match: ['wizard', 'mago'] },
};

const SKILLED_EXTRA_TOOLS = [
  'Herramientas de Ladrón',
  'Útiles de Herborista',
  'Kit de Disfraz',
  'Kit de Falsificación',
  'Kit de Envenenador',
  'Navegador',
  ...ARTISAN_TOOLS_2024.slice(0, 8),
];

export const OriginFeatSubChoicePicker: React.FC<OriginFeatSubChoicePickerProps> = ({
  featId,
  featName,
  value,
  onChange,
  lockedSpellList,
  edition = '5.5e',
  onInspectSpell,
}) => {
  const [spellQuery, setSpellQuery] = useState('');
  const normId = (featId || '').toLowerCase();

  const isMagicInitiate = normId.includes('magic-initiate') || normId.includes('iniciado');
  const isSkilled = normId === 'feat-2024-skilled' || normId === 'habil' || normId.endsWith('skilled');
  const isCrafter = normId.includes('crafter') || normId.includes('artesano');
  const isMusician = normId.includes('musician') || normId.includes('musico') || normId.includes('músico');

  const activeList: OriginFeatSpellList = normalizeOriginFeatSpellList(lockedSpellList || value.spellList || 'wizard');
  const activeAbility: 'int' | 'wis' | 'cha' =
    value.spellAbility || (activeList === 'cleric' || activeList === 'druid' ? 'wis' : 'int');

  const editionSpells = useMemo(
    () => getAllSpellsForEdition(OFFICIAL_SPELLS_COMPENDIUM, edition),
    [edition]
  );

  const listSpells = useMemo(() => {
    if (!isMagicInitiate) return { cantrips: [], level1: [] };
    const tokens = SPELL_LIST_LABELS[activeList].match;
    const matchesClass = (sp: Spell) =>
      (sp.classes || []).some((c) => tokens.some((tk) => c.toLowerCase().includes(tk)));
    const q = spellQuery.trim().toLowerCase();
    const matchesQuery = (sp: Spell) =>
      !q || sp.name.toLowerCase().includes(q) || (sp.nameEn || '').toLowerCase().includes(q) || sp.school.toLowerCase().includes(q);

    const cantrips = editionSpells
      .filter((s) => s.level === 0 && matchesClass(s) && matchesQuery(s))
      .sort((a, b) => a.name.localeCompare(b.name));
    const level1 = editionSpells
      .filter((s) => s.level === 1 && matchesClass(s) && matchesQuery(s))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { cantrips, level1 };
  }, [isMagicInitiate, activeList, editionSpells, spellQuery]);

  if (!isMagicInitiate && !isSkilled && !isCrafter && !isMusician) {
    return null;
  }

  // 1. INICIADO EN LA MAGIA (Magic Initiate 2024)
  if (isMagicInitiate) {
    const selectedCantrips = value.cantrips || [];
    const selectedL1 = value.level1Spell || '';

    const toggleCantrip = (spellName: string) => {
      const exists = selectedCantrips.includes(spellName);
      const next = exists
        ? selectedCantrips.filter((c) => c !== spellName)
        : selectedCantrips.length < 2
        ? [...selectedCantrips, spellName]
        : [selectedCantrips[1], spellName];
      onChange({ ...value, featId, spellList: activeList, spellAbility: activeAbility, cantrips: next });
    };

    const pickLevel1 = (spellName: string) => {
      const next = selectedL1 === spellName ? '' : spellName;
      onChange({ ...value, featId, spellList: activeList, spellAbility: activeAbility, level1Spell: next });
    };

    return (
      <div className="mt-2.5 p-3.5 rounded-xl border-2 border-[#6a3ca3]/40 bg-[#f7f2fc] space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9c7ed] pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#6a3ca3]" />
            <span className="font-fantasy font-bold text-[#41216b] uppercase">
              {featName || 'Iniciado en la Magia (Magic Initiate)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <span className={`px-2 py-0.5 rounded font-bold border ${selectedCantrips.length === 2 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
              Trucos: {selectedCantrips.length}/2
            </span>
            <span className={`px-2 py-0.5 rounded font-bold border ${selectedL1 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
              Conjuro Nv 1: {selectedL1 ? '1/1' : '0/1'}
            </span>
          </div>
        </div>

        {/* Lista de clase & Característica de conjuro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] font-bold uppercase text-[#5c3d82] block mb-1">
              Lista de Conjuros {lockedSpellList ? '(Fijada por trasfondo)' : '(Elige una)'}
            </label>
            <div className="flex gap-1.5">
              {(['cleric', 'druid', 'wizard'] as const).map((lst) => {
                const isAct = activeList === lst;
                const disabled = Boolean(lockedSpellList && lockedSpellList !== lst);
                return (
                  <button
                    key={lst}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      onChange({
                        ...value,
                        featId,
                        spellList: lst,
                        cantrips: [],
                        level1Spell: '',
                      })
                    }
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold border text-[11px] transition cursor-pointer ${
                      isAct
                        ? 'bg-[#6a3ca3] text-white border-[#6a3ca3] shadow-xs'
                        : disabled
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                        : 'bg-white text-[#41216b] border-[#d2bee8] hover:border-[#6a3ca3]'
                    }`}
                  >
                    {SPELL_LIST_LABELS[lst].es}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-[#5c3d82] block mb-1">
              Característica de Aptitud Mágica (2024)
            </label>
            <div className="flex gap-1.5">
              {(
                [
                  { id: 'int', label: 'INT' },
                  { id: 'wis', label: 'SAB' },
                  { id: 'cha', label: 'CAR' },
                ] as const
              ).map((ab) => {
                const isAct = activeAbility === ab.id;
                return (
                  <button
                    key={ab.id}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...value,
                        featId,
                        spellList: activeList,
                        spellAbility: ab.id,
                      })
                    }
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold border text-[11px] transition cursor-pointer ${
                      isAct
                        ? 'bg-[#6a3ca3] text-white border-[#6a3ca3] shadow-xs'
                        : 'bg-white text-[#41216b] border-[#d2bee8] hover:border-[#6a3ca3]'
                    }`}
                  >
                    {ab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Buscador rápido */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#6a3ca3] absolute left-2.5 top-2" />
          <input
            type="text"
            value={spellQuery}
            onChange={(e) => setSpellQuery(e.target.value)}
            placeholder={`Buscar trucos o conjuros Nv 1 de ${SPELL_LIST_LABELS[activeList].es}...`}
            className="w-full bg-white border border-[#d2bee8] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c221a] focus:outline-none focus:border-[#6a3ca3]"
          />
        </div>

        {/* Selección de 2 Trucos */}
        <div>
          <span className="text-[10px] font-bold uppercase text-[#5c3d82] block mb-1">
            Elige 2 Trucos de {SPELL_LIST_LABELS[activeList].es} ({selectedCantrips.length}/2):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
            {listSpells.cantrips.map((sp) => {
              const chosen = selectedCantrips.includes(sp.name);
              return (
                <div
                  key={sp.id}
                  onClick={() => toggleCantrip(sp.name)}
                  className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between gap-1.5 ${
                    chosen
                      ? 'bg-[#6a3ca3] text-white border-[#6a3ca3] shadow-xs'
                      : 'bg-white text-[#2c221a] border-[#dfd1ee] hover:border-[#6a3ca3]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[11px] truncate">{sp.name}</div>
                    <div className={`text-[9px] truncate ${chosen ? 'text-purple-100' : 'text-[#6e5c4a]'}`}>
                      {sp.school} • {sp.castingTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {onInspectSpell && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectSpell(sp);
                        }}
                        className={`p-1 rounded ${chosen ? 'hover:bg-white/20 text-white' : 'hover:bg-purple-100 text-[#6a3ca3]'}`}
                        title="Ver detalles del conjuro"
                      >
                        <BookOpen className="w-3 h-3" />
                      </button>
                    )}
                    {chosen && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selección de 1 Conjuro de Nivel 1 */}
        <div>
          <span className="text-[10px] font-bold uppercase text-[#5c3d82] block mb-1">
            Elige 1 Conjuro de Nivel 1 de {SPELL_LIST_LABELS[activeList].es} (1 lanzamiento gratis por descanso largo + con espacios):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
            {listSpells.level1.map((sp) => {
              const chosen = selectedL1 === sp.name;
              return (
                <div
                  key={sp.id}
                  onClick={() => pickLevel1(sp.name)}
                  className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between gap-1.5 ${
                    chosen
                      ? 'bg-[#6a3ca3] text-white border-[#6a3ca3] shadow-xs'
                      : 'bg-white text-[#2c221a] border-[#dfd1ee] hover:border-[#6a3ca3]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[11px] truncate">{sp.name}</div>
                    <div className={`text-[9px] truncate ${chosen ? 'text-purple-100' : 'text-[#6e5c4a]'}`}>
                      {sp.school} • {sp.castingTime}
                      {sp.ritual ? ' • Ritual' : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {onInspectSpell && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectSpell(sp);
                        }}
                        className={`p-1 rounded ${chosen ? 'hover:bg-white/20 text-white' : 'hover:bg-purple-100 text-[#6a3ca3]'}`}
                        title="Ver detalles del conjuro"
                      >
                        <BookOpen className="w-3 h-3" />
                      </button>
                    )}
                    {chosen && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 2. HÁBIL (Skilled: 3 habilidades o herramientas)
  if (isSkilled) {
    const chosen = value.skillsOrTools || [];
    const options = [...ALL_5E_SKILLS.map((s) => s.name), ...SKILLED_EXTRA_TOOLS];
    const toggleItem = (item: string) => {
      const next = chosen.includes(item)
        ? chosen.filter((x) => x !== item)
        : chosen.length < 3
        ? [...chosen, item]
        : [...chosen.slice(1), item];
      onChange({ ...value, featId, skillsOrTools: next });
    };
    return (
      <div className="mt-2.5 p-3 rounded-xl border border-[#8c672b]/40 bg-[#f9f4ea] space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-fantasy font-bold text-[#4a361c] uppercase">
            Hábil — Elige 3 Habilidades o Herramientas
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ebdcc4] text-[#4a361c]">
            {chosen.length} / 3
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
          {options.map((item) => {
            const isSel = chosen.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleItem(item)}
                className={`px-2 py-1 rounded border text-[11px] font-medium transition cursor-pointer ${
                  isSel
                    ? 'bg-[#8c672b] text-white border-[#8c672b]'
                    : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:border-[#8c672b]'
                }`}
              >
                {isSel ? '✓ ' : ''}{item}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. ARTESANO / MÚSICO (Crafter / Musician: 3 herramientas o instrumentos)
  const isInstrument = isMusician;
  const toolOptions = isInstrument ? MUSICAL_INSTRUMENTS_2024 : ARTISAN_TOOLS_2024;
  const chosenTools = value.tools || [];
  const toggleTool = (tool: string) => {
    const next = chosenTools.includes(tool)
      ? chosenTools.filter((x) => x !== tool)
      : chosenTools.length < 3
      ? [...chosenTools, tool]
      : [...chosenTools.slice(1), tool];
    onChange({ ...value, featId, tools: next });
  };

  return (
    <div className="mt-2.5 p-3 rounded-xl border border-[#8c672b]/40 bg-[#f9f4ea] space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1.5">
          {isInstrument ? <Music className="w-3.5 h-3.5 text-[#8c672b]" /> : <Wrench className="w-3.5 h-3.5 text-[#8c672b]" />}
          {isInstrument ? 'Músico — Elige 3 Instrumentos Musicales' : 'Artesano — Elige 3 Herramientas de Artesano'}
        </span>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ebdcc4] text-[#4a361c]">
          {chosenTools.length} / 3
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
        {toolOptions.map((tool) => {
          const isSel = chosenTools.includes(tool);
          return (
            <button
              key={tool}
              type="button"
              onClick={() => toggleTool(tool)}
              className={`px-2 py-1 rounded border text-[11px] font-medium transition cursor-pointer ${
                isSel
                  ? 'bg-[#8c672b] text-white border-[#8c672b]'
                  : 'bg-white text-[#4a361c] border-[#d6c4aa] hover:border-[#8c672b]'
              }`}
            >
              {isSel ? '✓ ' : ''}{tool}
            </button>
          );
        })}
      </div>
    </div>
  );
};
