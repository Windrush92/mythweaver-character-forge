import React, { useState, useMemo } from 'react';
import { OFFICIAL_SPELLS_COMPENDIUM } from '../data/spellsData';
import { Spell } from '../types';
import {
  Sparkles,
  Search,
  X,
  Check,
  Filter,
  Plus,
  BookOpen,
  Clock,
  Target,
  Shield,
} from 'lucide-react';

interface SpellPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpell: (spell: Spell) => void;
  selectedSpellNames?: string[];
  title?: string;
  subtitle?: string;
}

export const SpellPickerModal: React.FC<SpellPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectSpell,
  selectedSpellNames = [],
  title,
  subtitle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');

  const filteredSpells = useMemo(() => {
    return OFFICIAL_SPELLS_COMPENDIUM.filter((spell) => {
      // Level filter
      if (selectedLevel !== 'all' && spell.level !== selectedLevel) {
        return false;
      }

      // School filter
      if (
        selectedSchool !== 'all' &&
        !spell.school.toLowerCase().includes(selectedSchool.toLowerCase())
      ) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = spell.name.toLowerCase().includes(q);
        const matchesNameEn = spell.nameEn ? spell.nameEn.toLowerCase().includes(q) : false;
        const matchesDesc = spell.description.toLowerCase().includes(q);
        const matchesSchool = spell.school.toLowerCase().includes(q);
        return matchesName || matchesNameEn || matchesDesc || matchesSchool;
      }

      return true;
    }).sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return a.name.localeCompare(b.name);
    });
  }, [selectedLevel, selectedSchool, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#fcf9f2] border-2 border-[#8c672b] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#21152a] via-[#331e3d] to-[#21152a] border-b-2 border-[#8c672b] flex items-center justify-between text-[#e8c37d] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#8c672b]/20 border border-[#8c672b] rounded-xl text-[#d4af37] shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-lg sm:text-xl text-[#e8c37d] tracking-wide flex items-center gap-2">
                {title || 'Compendio Místico: Catálogo Oficial de Conjuros 5e'}
              </h3>
              <p className="text-xs text-[#c4a47c] mt-0.5">
                {subtitle ||
                  'Explora todos los trucos y conjuros oficiales de 5e para añadirlos a tu repertorio de linaje, dotes, magia innata o grimorio.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#c4a47c] hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            title="Cerrar catálogo de conjuros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3 sm:p-4 bg-[#f4ebd9] border-b border-[#d6c4aa] flex flex-col gap-3 shrink-0">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8c672b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar conjuro por nombre o efecto..."
                className="w-full bg-white border border-[#d6c4aa] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#3d2a1b] placeholder-[#8c672b]/60 focus:outline-none focus:border-[#8c672b]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8c672b] hover:text-[#5c4a35]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* School Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] font-fantasy font-bold text-[#5c4a35] whitespace-nowrap">
                Escuela:
              </span>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="bg-white border border-[#d6c4aa] rounded-xl px-3 py-1.5 text-xs text-[#3d2a1b] focus:outline-none focus:border-[#8c672b] cursor-pointer"
              >
                <option value="all">Todas las Escuelas</option>
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
          </div>

          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Todos los Niveles
            </button>
            <button
              type="button"
              onClick={() => setSelectedLevel(0)}
              className={`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                selectedLevel === 0
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Trucos (Nv 0)
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-[#8c672b] text-white shadow-xs'
                    : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                }`}
              >
                Nv {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Spells Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-[#fcf9f2] space-y-3">
          {filteredSpells.length === 0 ? (
            <div className="p-8 text-center bg-[#f5ede0] rounded-2xl border border-dashed border-[#d8c8af] space-y-2">
              <Sparkles className="w-8 h-8 text-[#8c672b]/50 mx-auto" />
              <p className="text-sm font-fantasy font-bold text-[#4a361c]">
                No se encontraron conjuros con ese criterio.
              </p>
              <p className="text-xs text-[#7a6448]">
                Intenta buscar por otro nombre o ajustar el nivel y escuela.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSpells.map((spell) => {
                const isSelected = selectedSpellNames.some(
                  (name) => name.toLowerCase() === spell.name.toLowerCase()
                );

                return (
                  <div
                    key={spell.id || spell.name}
                    className={`rounded-xl border-2 p-3.5 flex flex-col justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#eef5e9] border-[#4b823b] shadow-xs'
                        : 'bg-[#faf6ee] border-[#d8c8af] hover:border-[#8c672b] hover:shadow-md hover:bg-white'
                    }`}
                  >
                    <div>
                      {/* Spell Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-fantasy font-bold text-sm text-[#2c221a] truncate">
                            {spell.name}
                            {spell.nameEn && spell.nameEn.toLowerCase() !== spell.name.toLowerCase() && (
                              <span className="text-[11px] font-serif font-normal italic text-[#8c672b] ml-1.5">
                                ({spell.nameEn})
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] text-[#7a6448] font-mono block">
                            {spell.school}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                            spell.level === 0
                              ? 'bg-[#ede1ce] text-[#7a5a2b]'
                              : 'bg-[#8c672b] text-white shadow-xs'
                          }`}
                        >
                          {spell.level === 0 ? 'Truco' : `Nivel ${spell.level}`}
                        </span>
                      </div>

                      {/* Spell Specs */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[10px] text-[#5e4e3e]">
                        <span className="bg-[#f0e6d6] px-1.5 py-0.5 rounded border border-[#dbcbb2] font-mono">
                          ⏱️ {spell.castingTime}
                        </span>
                        <span className="bg-[#f0e6d6] px-1.5 py-0.5 rounded border border-[#dbcbb2] font-mono">
                          🎯 {spell.range}
                        </span>
                        {spell.concentration && (
                          <span className="bg-[#f8dcd9] text-[#8c2e28] px-1.5 py-0.5 rounded font-mono font-bold">
                            Concentración
                          </span>
                        )}
                        {spell.ritual && (
                          <span className="bg-[#ede1ce] text-[#7a5a2b] px-1.5 py-0.5 rounded font-mono font-bold">
                            Ritual
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5c4a35] mt-2.5 leading-relaxed line-clamp-3">
                        {spell.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-3.5 pt-2.5 border-t border-[#e8dcc9] flex items-center justify-between">
                      <span className="text-[10px] text-[#7a6448] font-mono">
                        {spell.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectSpell(spell)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                          isSelected
                            ? 'bg-[#2e5924] text-white hover:bg-[#23451b]'
                            : 'bg-[#8c672b] text-white hover:bg-[#73521e]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> En Grimorio
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Añadir
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#f4ebd9] border-t border-[#d6c4aa] flex items-center justify-between text-xs text-[#5c4a35] shrink-0">
          <span>
            Mostrando <strong>{filteredSpells.length}</strong> de {OFFICIAL_SPELLS_COMPENDIUM.length} conjuros
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#dfcfb9] hover:bg-[#cfbe9e] text-[#382b20] rounded-lg font-fantasy font-bold transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
