import React, { useState } from 'react';
import { Character, Spell, CharacterSpellSlots, SpellSlotLevel } from '../types';
import { OFFICIAL_SPELLS_COMPENDIUM } from '../data/spellsData';
import {
  BookOpen,
  Sparkles,
  Search,
  Check,
  X,
  Zap,
  Plus,
  RefreshCw,
  Moon,
  Shield,
  Clock,
  Eye,
  Trash2,
} from 'lucide-react';

interface GrimoireModalProps {
  character: Character;
  onUpdateCharacter: (updated: Character) => void;
  onClose: () => void;
  onLogSpellCast?: (spellName: string, level: number) => void;
}

const DEFAULT_SLOTS: CharacterSpellSlots = {
  lvl1: { max: 4, used: 0 },
  lvl2: { max: 3, used: 0 },
  lvl3: { max: 3, used: 0 },
  lvl4: { max: 2, used: 0 },
  lvl5: { max: 1, used: 0 },
  lvl6: { max: 0, used: 0 },
  lvl7: { max: 0, used: 0 },
  lvl8: { max: 0, used: 0 },
  lvl9: { max: 0, used: 0 },
};

export const GrimoireModal: React.FC<GrimoireModalProps> = ({
  character,
  onUpdateCharacter,
  onClose,
  onLogSpellCast,
}) => {
  // Ensure spellSlots and spells exist on character
  const slots: CharacterSpellSlots = {
    ...DEFAULT_SLOTS,
    ...(character.spellSlots || {}),
  };

  const characterSpells: Spell[] = character.spells || [];

  const [activeTab, setActiveTab] = useState<'prepared' | 'known' | 'compendium'>('prepared');
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterSchool, setFilterSchool] = useState<string>('all');
  const [compendiumSearch, setCompendiumSearch] = useState('');

  // Calculate Spellcasting stats
  const ability = character.spellcastingAbility || (character.class.toLowerCase().includes('cler') || character.class.toLowerCase().includes('dru') ? 'wis' : character.class.toLowerCase().includes('bard') || character.class.toLowerCase().includes('hech') || character.class.toLowerCase().includes('bru') ? 'cha' : 'int');
  const abilityScore = character.stats[ability] || 10;
  const abilityMod = Math.floor((abilityScore - 10) / 2);
  const profBonus = Math.floor((character.level - 1) / 4) + 2;
  const spellSaveDc = character.spellSaveDc || (8 + profBonus + abilityMod);
  const spellAttackBonus = character.spellAttackBonus !== undefined ? character.spellAttackBonus : (profBonus + abilityMod);

  // Toggle prepared status for a spell (racial spells are always innately prepared)
  const togglePrepared = (spellId: string) => {
    const updatedSpells = characterSpells.map((s) => {
      if (s.isRacial) return s;
      return s.id === spellId ? { ...s, prepared: !s.prepared } : s;
    });
    onUpdateCharacter({ ...character, spells: updatedSpells });
  };

  // Adjust spell slots
  const toggleSlotUsed = (lvlKey: keyof CharacterSpellSlots, slotIndex: number) => {
    const currentLevelSlot: SpellSlotLevel = slots[lvlKey] || { max: 0, used: 0 };
    let newUsed = currentLevelSlot.used;

    if (slotIndex < currentLevelSlot.used) {
      newUsed = slotIndex; // recover slot
    } else {
      newUsed = slotIndex + 1; // expend slot
    }

    const updatedSlots: CharacterSpellSlots = {
      ...slots,
      [lvlKey]: { ...currentLevelSlot, used: Math.min(currentLevelSlot.max, Math.max(0, newUsed)) },
    };

    onUpdateCharacter({ ...character, spellSlots: updatedSlots });
  };

  // Recover all spell slots (Long rest)
  const handleLongRest = () => {
    const recovered: CharacterSpellSlots = { ...slots };
    (Object.keys(recovered) as Array<keyof CharacterSpellSlots>).forEach((k) => {
      recovered[k] = { ...recovered[k], used: 0 };
    });
    onUpdateCharacter({ ...character, spellSlots: recovered });
  };

  // Cast a spell (expends a slot if level > 0)
  const handleCastSpell = (spell: Spell) => {
    if (spell.level > 0) {
      const slotKey = `lvl${spell.level}` as keyof CharacterSpellSlots;
      const currentLevelSlot = slots[slotKey];
      if (currentLevelSlot && currentLevelSlot.used < currentLevelSlot.max) {
        const updatedSlots: CharacterSpellSlots = {
          ...slots,
          [slotKey]: { ...currentLevelSlot, used: currentLevelSlot.used + 1 },
        };
        onUpdateCharacter({ ...character, spellSlots: updatedSlots });
      }
    }
    if (onLogSpellCast) {
      onLogSpellCast(spell.name, spell.level);
    }
  };

  // Add spell from compendium into character's grimoire
  const handleAddSpellFromCompendium = (spell: Spell) => {
    const alreadyExists = characterSpells.some((s) => s.name.toLowerCase() === spell.name.toLowerCase());
    if (alreadyExists) return;

    const newSpell: Spell = {
      ...spell,
      id: 'char-spl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      prepared: spell.level === 0 ? true : false,
    };
    onUpdateCharacter({ ...character, spells: [...characterSpells, newSpell] });
  };

  // Remove spell from character
  const handleRemoveSpell = (spellId: string) => {
    onUpdateCharacter({
      ...character,
      spells: characterSpells.filter((s) => s.id !== spellId),
    });
    if (selectedSpell?.id === spellId) setSelectedSpell(null);
  };

  // Prepared spells list (cantrips are always prepared)
  const preparedSpells = characterSpells.filter((s) => s.level === 0 || s.prepared);

  // Filtered known spells
  const filteredKnownSpells = characterSpells.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || (filterLevel === '0' ? s.level === 0 : s.level === parseInt(filterLevel));
    const matchesSchool = filterSchool === 'all' || s.school.toLowerCase() === filterSchool.toLowerCase();
    return matchesSearch && matchesLevel && matchesSchool;
  });

  // Filtered compendium spells
  const filteredCompendium = OFFICIAL_SPELLS_COMPENDIUM.filter((s) => {
    return s.name.toLowerCase().includes(compendiumSearch.toLowerCase()) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(compendiumSearch.toLowerCase())) ||
      s.school.toLowerCase().includes(compendiumSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(compendiumSearch.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      {/* Outer Grimoire Book Container */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[850px] bg-[#1a120c] rounded-2xl shadow-2xl border-4 border-[#3d2719] flex flex-col overflow-hidden text-[#e2ded6]">
        {/* Ornate Leather Spine & Header */}
        <div className="relative px-6 py-3.5 bg-gradient-to-r from-[#2a1b12] via-[#3a261a] to-[#2a1b12] border-b-2 border-[#543825] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#805e3b] to-[#452e1d] flex items-center justify-center border border-[#d4ab59]/60 shadow-inner">
              <BookOpen className="w-5 h-5 text-[#f5ebd7]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-fantasy text-[#f5ebd7] tracking-wider drop-shadow">
                  Grimorio Mágico: {character.name}
                </h2>
                <span className="text-[11px] font-mono uppercase bg-[#18110b] text-[#d4ab59] px-2 py-0.5 rounded border border-[#543825]">
                  {character.class} Nivel {character.level}
                </span>
              </div>
              <p className="text-xs text-[#a69986] hidden sm:block">
                Libro de conjuros arcanos, fórmulas de preparación y espacios de magia disponibles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Spell Save DC & Attack Bonus Badge */}
            <div className="hidden md:flex items-center gap-2 bg-[#19120c] px-3 py-1.5 rounded-lg border border-[#543825] text-xs">
              <span className="text-[#a69986]">CD Salvación:</span>
              <strong className="text-[#d4ab59] font-mono text-sm">{spellSaveDc}</strong>
              <span className="text-[#543825]">|</span>
              <span className="text-[#a69986]">Ataque:</span>
              <strong className="text-[#86b5e0] font-mono text-sm">+{spellAttackBonus}</strong>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#a69986] hover:text-[#f5ebd7] hover:bg-[#3d2719] rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Switcher (Prepared / Known Spellbook / Compendium) */}
        <div className="flex items-center justify-between px-6 py-2 bg-[#22160f] border-b border-[#3d2719] text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('prepared')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-fantasy font-semibold transition ${
                activeTab === 'prepared'
                  ? 'bg-[#d4ab59] text-[#18110b] shadow-md font-bold'
                  : 'text-[#a69986] hover:text-[#f5ebd7] hover:bg-[#342217]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Hechizos Preparados & Slots ({preparedSpells.length})
            </button>
            <button
              onClick={() => setActiveTab('known')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-fantasy font-semibold transition ${
                activeTab === 'known'
                  ? 'bg-[#d4ab59] text-[#18110b] shadow-md font-bold'
                  : 'text-[#a69986] hover:text-[#f5ebd7] hover:bg-[#342217]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Libro de Conjuros ({characterSpells.length})
            </button>
            <button
              onClick={() => setActiveTab('compendium')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-fantasy font-semibold transition ${
                activeTab === 'compendium'
                  ? 'bg-[#d4ab59] text-[#18110b] shadow-md font-bold'
                  : 'text-[#a69986] hover:text-[#f5ebd7] hover:bg-[#342217]'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-[#86b5e0]" /> Añadir del Compendio Oficial
            </button>
          </div>

          <button
            onClick={handleLongRest}
            className="flex items-center gap-1 px-3 py-1 bg-[#19120c] hover:bg-[#2c1d14] text-[#d4ab59] hover:text-white rounded border border-[#543825] transition"
            title="Recuperar todos los espacios de conjuro gastados"
          >
            <Moon className="w-3.5 h-3.5 text-[#86b5e0]" /> Descanso Largo
          </button>
        </div>

        {/* Main Book Pages Content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#f4ecd8] text-[#2c1d12]">
          {/* TAB 1: PREPARED SPELLS & SPELL SLOTS */}
          {activeTab === 'prepared' && (
            <>
              {/* Left Column: Interactive Spell Slot Trackers (4 cols) */}
              <div className="lg:col-span-4 bg-[#ede2c8] border-r-2 border-[#d9c7a2] p-5 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between border-b border-[#c8b389] pb-2">
                  <h3 className="font-fantasy font-bold text-base text-[#4a2e1b] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#8a5b28]" /> Espacios de Magia (Slots)
                  </h3>
                  <span className="text-[10px] text-[#705036] italic">Haz clic para gastar/recuperar</span>
                </div>

                {/* Spell Slots 1 to 9 */}
                <div className="space-y-2.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
                    const slotKey = `lvl${lvl}` as keyof CharacterSpellSlots;
                    const levelData = slots[slotKey] || { max: 0, used: 0 };
                    if (levelData.max === 0) return null;

                    return (
                      <div
                        key={lvl}
                        className="p-2.5 bg-[#fbf6ea] rounded-lg border border-[#d9c7a2] shadow-sm flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-fantasy font-bold text-[#3a2012]">
                            Nivel {lvl}
                          </div>
                          <span className="text-[10px] text-[#705036]">
                            Disponibles: {levelData.max - levelData.used} / {levelData.max}
                          </span>
                        </div>

                        {/* Interactive Gems */}
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: levelData.max }).map((_, idx) => {
                            const isUsed = idx < levelData.used;
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleSlotUsed(slotKey, idx)}
                                title={isUsed ? 'Recuperar este espacio' : 'Gastar este espacio de conjuro'}
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition transform hover:scale-115 ${
                                  isUsed
                                    ? 'bg-[#8c7e6c] border-[#5e5345] opacity-50 shadow-inner'
                                    : 'bg-gradient-to-tr from-[#305988] to-[#6da5db] border-[#22446d] shadow-md ring-1 ring-[#86b5e0]/60'
                                }`}
                              >
                                {!isUsed && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {Object.values(slots).every((s) => s.max === 0) && (
                    <div className="p-4 bg-[#fbf6ea] rounded-lg border border-[#d9c7a2] text-center text-xs text-[#705036]">
                      Este personaje aún no tiene espacios de magia configurados.
                    </div>
                  )}
                </div>

                {/* Spellcasting Rules helper note */}
                <div className="p-3 bg-[#f5ecda] rounded-lg border border-[#d9c7a2] text-[11px] text-[#5e4129] leading-relaxed">
                  <strong>Regla de Preparación:</strong> Un mago prepara una cantidad de conjuros igual a su modificador de Inteligencia + su nivel de mago (mínimo 1). Los trucos no requieren preparación.
                </div>
              </div>

              {/* Right Column: Prepared Spells Roster & Detail (8 cols) */}
              <div className="lg:col-span-8 p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#d9c7a2] pb-3">
                  <div>
                    <h3 className="font-fantasy font-bold text-lg text-[#3a2012]">
                      Conjuros Listos para el Combate
                    </h3>
                    <p className="text-xs text-[#705036]">
                      {preparedSpells.length} conjuros preparados actualmente.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('known')}
                    className="px-3 py-1.5 bg-[#452b1b] hover:bg-[#5e3c27] text-[#f5ebd7] text-xs font-fantasy rounded-lg shadow transition flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Gestionar Preparados
                  </button>
                </div>

                {/* Prepared Spells Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {preparedSpells.map((spell) => {
                    const isSelected = selectedSpell?.id === spell.id;
                    const slotKey = `lvl${spell.level}` as keyof CharacterSpellSlots;
                    const canCast = spell.level === 0 || (slots[slotKey] && slots[slotKey].used < slots[slotKey].max);

                    return (
                      <div
                        key={spell.id}
                        onClick={() => setSelectedSpell(spell)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#fffbf0] border-[#8a5b28] shadow-md ring-2 ring-[#8a5b28]/40'
                            : 'bg-[#faf3e3] border-[#d9c7a2] hover:border-[#b89d6b]'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-fantasy font-bold text-base text-[#2e170c]">
                                {spell.name}
                                {spell.nameEn && spell.nameEn.toLowerCase() !== spell.name.toLowerCase() && (
                                  <span className="text-xs font-serif font-normal italic text-[#8a5b28] ml-1.5">
                                    ({spell.nameEn})
                                  </span>
                                )}
                              </h4>
                              <span className="text-[11px] text-[#705036] italic">
                                {spell.level === 0 ? 'Truco' : `Nivel ${spell.level}`} • {spell.school}
                              </span>
                            </div>

                            <span
                              className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                                spell.level === 0
                                  ? 'bg-[#e2f0d9] text-[#2b591b] border-[#9fce84]'
                                  : 'bg-[#e0edf7] text-[#1e4e79] border-[#8cbbe0]'
                              }`}
                            >
                              {spell.level === 0 ? 'Truco' : `Nv ${spell.level}`}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-[#4d331e] space-y-0.5">
                            <div><strong className="text-[#301b0f]">Tiempo:</strong> {spell.castingTime}</div>
                            <div><strong className="text-[#301b0f]">Alcance:</strong> {spell.range}</div>
                            <div><strong className="text-[#301b0f]">Duración:</strong> {spell.duration}</div>
                          </div>
                        </div>

                        {/* Cast button & details */}
                        <div className="mt-3 pt-2 border-t border-[#ebdcb2] flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCastSpell(spell);
                            }}
                            disabled={!canCast}
                            className="px-3 py-1 bg-[#8a5b28] hover:bg-[#70461c] disabled:opacity-40 text-white rounded text-xs font-fantasy font-bold shadow-sm transition flex items-center gap-1"
                          >
                            <Zap className="w-3.5 h-3.5" /> Lanzar Hechizo
                          </button>

                          {spell.isRacial ? (
                            <span className="text-[11px] text-purple-700 font-bold italic" title={`Concedido por tu linaje (${spell.racialOrigin || 'Raza'})`}>
                              ✨ Innato ({spell.racialOrigin || 'Raza'})
                            </span>
                          ) : spell.level > 0 ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePrepared(spell.id);
                              }}
                              className="text-[11px] text-[#8c281a] hover:underline"
                            >
                              Despreparar
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}

                  {preparedSpells.length === 0 && (
                    <div className="col-span-2 p-12 text-center bg-[#faf3e3] rounded-xl border border-dashed border-[#d9c7a2] text-[#705036]">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#b0966b]" />
                      <p className="font-fantasy font-semibold">No tienes hechizos preparados.</p>
                      <p className="text-xs mt-1">Ve a la pestaña de "Libro de Conjuros" para preparar los hechizos que usarás hoy.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: KNOWN SPELLBOOK (LIBRERÍA DE HECHIZOS DEL MAGO) */}
          {activeTab === 'known' && (
            <div className="col-span-12 p-6 overflow-y-auto space-y-4">
              {/* Filter and search bar */}
              <div className="bg-[#ede2c8] p-4 rounded-xl border border-[#d9c7a2] flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-[#8a5b28] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar hechizo por nombre o efecto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#fbf6ea] border border-[#c8b389] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#2c1d12] placeholder-[#8c7457] focus:outline-none focus:border-[#8a5b28]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="bg-[#fbf6ea] border border-[#c8b389] rounded-md px-2.5 py-1 text-xs text-[#2c1d12]"
                  >
                    <option value="all">Todos los Niveles</option>
                    <option value="0">Trucos (Cantrips)</option>
                    <option value="1">Nivel 1</option>
                    <option value="2">Nivel 2</option>
                    <option value="3">Nivel 3</option>
                    <option value="4">Nivel 4</option>
                    <option value="5">Nivel 5</option>
                    <option value="6">Nivel 6+</option>
                  </select>

                  <select
                    value={filterSchool}
                    onChange={(e) => setFilterSchool(e.target.value)}
                    className="bg-[#fbf6ea] border border-[#c8b389] rounded-md px-2.5 py-1 text-xs text-[#2c1d12]"
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

              {/* Spells Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredKnownSpells.map((spell) => {
                  const isPrepared = spell.level === 0 || spell.prepared;

                  return (
                    <div
                      key={spell.id}
                      onClick={() => setSelectedSpell(spell)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        isPrepared
                          ? 'bg-[#fffcf4] border-[#8a5b28] shadow-sm'
                          : 'bg-[#f7efe0] border-[#d9c7a2] hover:border-[#b89d6b]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-fantasy font-bold text-sm text-[#2e170c] truncate">
                            {spell.name}
                            {spell.nameEn && spell.nameEn.toLowerCase() !== spell.name.toLowerCase() && (
                              <span className="text-[11px] font-serif font-normal italic text-[#8a5b28] ml-1">
                                ({spell.nameEn})
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] font-mono uppercase bg-[#ede2c8] text-[#5e4129] px-1.5 py-0.5 rounded border border-[#d9c7a2]">
                            {spell.level === 0 ? 'Truco' : `Nv ${spell.level}`}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#705036] mt-0.5">
                          {spell.school} • {spell.castingTime}
                        </div>
                        <p className="text-xs text-[#4d331e] mt-2 line-clamp-2 leading-relaxed">
                          {spell.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#e2d0a8] flex items-center justify-between">
                        {spell.isRacial ? (
                          <span className="text-[10px] bg-purple-100 text-purple-900 border border-purple-300 px-1.5 py-0.5 rounded font-mono font-bold" title={`Concedido por tu linaje (${spell.racialOrigin || 'Raza'})`}>
                            ✨ Innato ({spell.racialOrigin || 'Raza'})
                          </span>
                        ) : spell.level === 0 ? (
                          <span className="text-[10px] text-[#2b591b] font-bold">Siempre Preparado ✓</span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePrepared(spell.id);
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-fantasy font-bold transition flex items-center gap-1 ${
                              isPrepared
                                ? 'bg-[#3b5e28] text-white hover:bg-[#2e4a1f]'
                                : 'bg-[#e2d2b1] text-[#4d331e] hover:bg-[#d4ab59]'
                            }`}
                          >
                            {isPrepared ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            {isPrepared ? 'Preparado' : 'Preparar'}
                          </button>
                        )}

                        {!spell.isRacial && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSpell(spell.id);
                            }}
                            className="p-1 text-[#8c281a] hover:bg-[#ebdcb2] rounded cursor-pointer"
                            title="Eliminar de mi libro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredKnownSpells.length === 0 && (
                  <div className="col-span-3 p-12 text-center bg-[#fbf6ea] rounded-xl border border-dashed border-[#d9c7a2] text-[#705036]">
                    No se encontraron hechizos con los filtros actuales.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: OFFICIAL COMPENDIUM BROWSER */}
          {activeTab === 'compendium' && (
            <div className="col-span-12 p-6 overflow-y-auto space-y-4">
              <div className="bg-[#ede2c8] p-4 rounded-xl border border-[#d9c7a2] flex items-center justify-between gap-3 shadow-sm">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8a5b28] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar en el compendio oficial de D&D 5e (ej. Bola de Fuego, Escudo, Trucos)..."
                    value={compendiumSearch}
                    onChange={(e) => setCompendiumSearch(e.target.value)}
                    className="w-full bg-[#fbf6ea] border border-[#c8b389] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#2c1d12] placeholder-[#8c7457] focus:outline-none focus:border-[#8a5b28]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredCompendium.map((spell) => {
                  const alreadyInBook = characterSpells.some((s) => s.name.toLowerCase() === spell.name.toLowerCase());

                  return (
                    <div
                      key={spell.id}
                      onClick={() => setSelectedSpell(spell)}
                      className="p-3.5 bg-[#fbf6ea] rounded-xl border border-[#d9c7a2] hover:border-[#8a5b28] transition cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-fantasy font-bold text-sm text-[#2e170c]">
                            {spell.name}
                          </h4>
                          <span className="text-[10px] font-mono bg-[#ede2c8] text-[#5e4129] px-1.5 py-0.5 rounded border border-[#d9c7a2]">
                            {spell.level === 0 ? 'Truco' : `Nv ${spell.level}`}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#705036] mt-0.5">
                          {spell.school} • {spell.castingTime}
                        </div>
                        <p className="text-xs text-[#4d331e] mt-2 line-clamp-3 leading-relaxed">
                          {spell.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#e2d0a8] flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddSpellFromCompendium(spell);
                          }}
                          disabled={alreadyInBook}
                          className="px-2.5 py-1 bg-[#8a5b28] hover:bg-[#70461c] disabled:opacity-50 text-white rounded text-xs font-fantasy font-bold shadow-sm transition flex items-center gap-1"
                        >
                          {alreadyInBook ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          {alreadyInBook ? 'En el libro' : 'Copiar al Libro'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selected Spell Scroll Detail Overlay */}
        {selectedSpell && (
          <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-[#fbf6ea] border-4 border-[#8a5b28] rounded-xl p-6 shadow-2xl text-[#2c1d12] space-y-4 max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setSelectedSpell(null)}
                className="absolute top-4 right-4 p-1 text-[#705036] hover:text-[#2c1d12] rounded-full hover:bg-[#ede2c8]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b-2 border-[#8a5b28] pb-2">
                <h3 className="font-fantasy font-bold text-2xl text-[#2e170c]">
                  {selectedSpell.name}
                </h3>
                <p className="text-xs italic text-[#705036]">
                  {selectedSpell.level === 0 ? 'Truco' : `Conjuro de Nivel ${selectedSpell.level}`} ({selectedSpell.school})
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#ede2c8] p-3 rounded-lg border border-[#d9c7a2]">
                <div><strong className="text-[#301b0f]">Tiempo de lanzamiento:</strong> {selectedSpell.castingTime}</div>
                <div><strong className="text-[#301b0f]">Alcance:</strong> {selectedSpell.range}</div>
                <div><strong className="text-[#301b0f]">Componentes:</strong> {selectedSpell.components}</div>
                <div><strong className="text-[#301b0f]">Duración:</strong> {selectedSpell.duration}</div>
              </div>

              <div className="text-xs text-[#3a2012] leading-relaxed space-y-2">
                <p className="whitespace-pre-line">{selectedSpell.description}</p>
                {selectedSpell.higherLevels && (
                  <div className="pt-2 border-t border-[#d9c7a2] text-[11px] text-[#5e4129]">
                    <strong>A Niveles Superiores:</strong> {selectedSpell.higherLevels}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#d9c7a2] flex justify-end gap-2">
                <button
                  onClick={() => {
                    handleCastSpell(selectedSpell);
                    setSelectedSpell(null);
                  }}
                  className="px-4 py-2 bg-[#8a5b28] hover:bg-[#70461c] text-white font-fantasy font-bold rounded-lg text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" /> Lanzar Hechizo Ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
