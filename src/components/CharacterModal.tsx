import React, { useState, useEffect } from 'react';
import { Character, CharacterAttack, Spell } from '../types';
import {
  WIKIDOT_RACES,
  WIKIDOT_CLASSES,
  WIKIDOT_BACKGROUNDS,
  FULL_CASTER_SLOTS_TABLE,
  HALF_CASTER_SLOTS_TABLE,
  WARLOCK_PACT_SLOTS_TABLE,
  getMaxSpellLevelForClass,
} from '../data/wikidotData';
import {
  filterSpellsForCharacter,
  isSpellcasterClass,
  OFFICIAL_SPELLS_COMPENDIUM,
  getSpellcastingLimits,
} from '../data/spellsData';
import { SpellDetailModal } from './SpellDetailModal';
import {
  X,
  Plus,
  Trash2,
  Shield,
  Heart,
  Zap,
  User,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Lock,
  ChevronDown,
  Check,
  Eye,
  Info,
} from 'lucide-react';

interface CharacterModalProps {
  initialCharacter?: Character | null;
  campaignId: string;
  onSave: (char: Character) => void;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  initialCharacter,
  campaignId,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Character>(() => {
    if (initialCharacter) return { ...initialCharacter };
    return {
      id: 'char-' + Date.now(),
      campaignId,
      name: '',
      playerName: '',
      race: 'Humano',
      subrace: '',
      class: 'Guerrero',
      subclass: 'Campeón (Champion)',
      background: 'Soldado (Soldier)',
      level: 1,
      maxHp: 12,
      currentHp: 12,
      tempHp: 0,
      ac: 14,
      initiativeBonus: 1,
      speed: '30 pies',
      passivePerception: 11,
      stats: { str: 14, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      savingThrows: ['Fuerza', 'Constitución'],
      skills: ['Atletismo', 'Intimidación'],
      attacks: [
        {
          id: 'att-1',
          name: 'Espada Larga',
          bonus: '+4',
          damage: '1d8+2',
          type: 'Cortante',
        },
      ],
      spellSlots: {},
      spells: [],
      notes: '',
      avatarUrl: '',
    };
  });

  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'basics' | 'stats' | 'spells' | 'notes'>('basics');
  const [showHigherSpells, setShowHigherSpells] = useState(false);
  const [selectedDetailSpell, setSelectedDetailSpell] = useState<Spell | null>(null);

  // Current selected Wikidot entries
  const currentRace = WIKIDOT_RACES.find(
    (r) => r.name.toLowerCase() === formData.race.toLowerCase() || r.id === formData.race.toLowerCase()
  ) || WIKIDOT_RACES[0];

  const currentClass = WIKIDOT_CLASSES.find(
    (c) => c.name.toLowerCase().includes(formData.class.toLowerCase()) || c.id === formData.class.toLowerCase()
  ) || WIKIDOT_CLASSES[3]; // default Guerrero

  const currentBackground = WIKIDOT_BACKGROUNDS.find(
    (b) => b.name.toLowerCase().includes(formData.background?.toLowerCase() || '') || b.id === formData.background?.toLowerCase()
  );

  const isCaster = isSpellcasterClass(formData.class);

  // Auto-calculate spell slots when class or level changes
  const updateSpellSlotsForClassAndLevel = (className: string, lvl: number) => {
    const norm = className.toLowerCase();
    let newSlots = {};
    if (norm.includes('mago') || norm.includes('hechicero') || norm.includes('cler') || norm.includes('dru') || norm.includes('bard')) {
      const row = FULL_CASTER_SLOTS_TABLE[lvl] || {};
      newSlots = Object.fromEntries(Object.entries(row).map(([k, max]) => [k, { max, used: 0 }]));
    } else if (norm.includes('palad') || norm.includes('explorador') || norm.includes('ranger')) {
      const row = HALF_CASTER_SLOTS_TABLE[lvl] || {};
      newSlots = Object.fromEntries(Object.entries(row).map(([k, max]) => [k, { max, used: 0 }]));
    } else if (norm.includes('brujo') || norm.includes('warlock')) {
      const pact = WARLOCK_PACT_SLOTS_TABLE[lvl] || { count: 1, slotLevel: 1 };
      newSlots = {
        [`lvl${pact.slotLevel}`]: { max: pact.count, used: 0 },
      };
    }
    return newSlots;
  };

  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateStat = (statName: keyof typeof formData.stats, val: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: Number(val) || 10,
      },
    }));
  };

  // When race changes
  const handleRaceChange = (raceId: string) => {
    const selected = WIKIDOT_RACES.find((r) => r.id === raceId || r.name === raceId);
    if (!selected) return;

    let updatedSpeed = selected.speed;
    let initialSubrace = selected.subraces?.[0]?.name || '';

    // Inherit racial innate spells if any
    let updatedSpells = [...(formData.spells || [])];
    if (selected.innateSpells) {
      selected.innateSpells.forEach((is) => {
        const found = OFFICIAL_SPELLS_COMPENDIUM.find((s) => s.name.toLowerCase().includes(is.spellName.toLowerCase()));
        if (found && !updatedSpells.some((us) => us.name.toLowerCase() === found.name.toLowerCase())) {
          updatedSpells.push({ ...found, prepared: true });
        }
      });
    }

    setFormData((prev) => ({
      ...prev,
      race: selected.name,
      subrace: initialSubrace,
      speed: updatedSpeed,
      passivePerception: selected.traits.some((t) => t.name.includes('Percepción')) ? 13 : prev.passivePerception,
      spells: updatedSpells,
    }));
  };

  // When class changes
  const handleClassChange = (classId: string) => {
    const selected = WIKIDOT_CLASSES.find((c) => c.id === classId || c.name === classId);
    if (!selected) return;

    const initialSubclass = selected.subclasses[0]?.name || '';
    const slots = updateSpellSlotsForClassAndLevel(selected.name, formData.level);

    // Calculate Hit Points estimate base (max at level 1 + con mod)
    const conMod = Math.floor((formData.stats.con - 10) / 2);
    const calculatedHp = selected.hitDie + conMod + Math.max(0, (formData.level - 1) * (Math.floor(selected.hitDie / 2) + 1 + conMod));

    setFormData((prev) => ({
      ...prev,
      class: selected.name,
      subclass: initialSubclass,
      savingThrows: selected.savingThrows,
      spellSlots: slots,
      spellcastingAbility: selected.spellcastingAbility,
      maxHp: calculatedHp,
      currentHp: calculatedHp,
    }));
  };

  // When background changes
  const handleBackgroundChange = (bgId: string) => {
    const selected = WIKIDOT_BACKGROUNDS.find((b) => b.id === bgId || b.name === bgId);
    if (!selected) return;

    setFormData((prev) => ({
      ...prev,
      background: selected.name,
      skills: Array.from(new Set([...(prev.skills || []), ...selected.skillProficiencies])),
    }));
  };

  // Filtered Spells based on race, class, and level
  const filteredSpells = React.useMemo(() => {
    return filterSpellsForCharacter(formData.class, formData.level, formData.race);
  }, [formData.class, formData.level, formData.race]);

  // Spellcasting official 5e limits (cantrips + prepared/known spells)
  const spellLimits = React.useMemo(() => {
    return getSpellcastingLimits(formData.class, formData.level, formData.stats, formData.race);
  }, [formData.class, formData.level, formData.stats, formData.race]);

  const selectedCantripsCount = (formData.spells || []).filter((s) => s.level === 0).length;
  const selectedSpellsCount = (formData.spells || []).filter((s) => s.level > 0).length;
  const isCantripsOver = spellLimits.maxCantrips > 0 && selectedCantripsCount > spellLimits.maxCantrips;
  const isSpellsOver = spellLimits.maxPreparedOrKnown > 0 && selectedSpellsCount > spellLimits.maxPreparedOrKnown;

  // Toggle spell in character's learned spells
  const toggleSpellSelection = (spell: Spell) => {
    const currentSpells = formData.spells || [];
    const exists = currentSpells.some((s) => s.name.toLowerCase() === spell.name.toLowerCase());

    if (exists) {
      setFormData((prev) => ({
        ...prev,
        spells: (prev.spells || []).filter((s) => s.name.toLowerCase() !== spell.name.toLowerCase()),
      }));
    } else {
      const newSpell: Spell = {
        ...spell,
        id: 'char-spl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        prepared: spell.level === 0,
      };
      setFormData((prev) => ({
        ...prev,
        spells: [...(prev.spells || []), newSpell],
      }));
    }
  };

  const addAttack = () => {
    const newAtt: CharacterAttack = {
      id: 'att-' + Date.now(),
      name: 'Nueva Arma / Conjuro',
      bonus: '+4',
      damage: '1d6+2',
      type: 'Cortante',
    };
    setFormData((prev) => ({
      ...prev,
      attacks: [...(prev.attacks || []), newAtt],
    }));
  };

  const updateAttack = (index: number, field: keyof CharacterAttack, val: string) => {
    setFormData((prev) => {
      const list = [...(prev.attacks || [])];
      list[index] = { ...list[index], [field]: val };
      return { ...prev, attacks: list };
    });
  };

  const removeAttack = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attacks: (prev.attacks || []).filter((_, i) => i !== index),
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField('avatarUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Ancient Folio Window in Soft Parchment & Warm Leather */}
      <div className="bg-[#fbf7ee] border-4 border-[#8c672b] rounded-2xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl text-[#2c241b] overflow-hidden font-serif">
        {/* Leather-bound Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2c221a] via-[#3a2d21] to-[#2c221a] border-b-2 border-[#b88c32] text-[#f7f2ea]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#1c150e] text-[#c59b27] rounded-lg border border-[#c59b27]/60 shadow-inner">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold font-fantasy text-[#f7f2ea] tracking-wide uppercase">
                {initialCharacter ? 'Editar Hoja de PJ (Wikidot 5e)' : 'Creador de Personaje (Wikidot 5e)'}
              </h2>
              <p className="text-xs text-[#baa995] italic">
                Reglas oficiales de razas, clases, trasfondos y conjuros de dnd5e.wikidot.com.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#baa995] hover:text-white hover:bg-[#4a3927] rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#241c15] px-6 py-2 border-b border-[#4d3a24] flex space-x-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'basics' ? 'bg-[#c59b27] text-[#1c150e] font-fantasy shadow' : 'text-[#baa995] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Raza, Clase & Trasfondo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stats' ? 'bg-[#c59b27] text-[#1c150e] font-fantasy shadow' : 'text-[#baa995] hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Combate & Estadísticas
          </button>
          {isCaster && (
            <button
              type="button"
              onClick={() => setActiveTab('spells')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'spells' ? 'bg-[#c59b27] text-[#1c150e] font-fantasy shadow' : 'text-[#baa995] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Conjuros ({formData.spells?.length || 0})
              {(isCantripsOver || isSpellsOver) && (
                <span className="text-[10px] bg-amber-400 text-amber-950 px-1 py-0.2 rounded-full font-bold">
                  ⚠️
                </span>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'notes' ? 'bg-[#c59b27] text-[#1c150e] font-fantasy shadow' : 'text-[#baa995] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Notas & Rasgos
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#fbf6e9]">
          {/* TAB 1: BASICS & WIKIDOT 5E INTEGRATION */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              {/* Avatar Selector */}
              <div className="bg-[#f5ede0] p-4 rounded-xl border border-[#d6c4aa] flex flex-col sm:flex-row items-center gap-4 shadow-sm">
                <div className="w-16 h-16 rounded-full border-2 border-[#8c672b] shadow overflow-hidden bg-[#2d251f] flex items-center justify-center shrink-0">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-[#7a6a57]" />
                  )}
                </div>

                <div className="flex-1 space-y-2 text-xs w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c672b] font-fantasy flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" /> Avatar del Héroe
                    </span>
                    {formData.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          updateField('avatarUrl', '');
                          setCustomAvatarUrl('');
                        }}
                        className="text-[10px] text-[#8c2e28] hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        Quitar Avatar
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <label className="px-2.5 py-1 bg-[#4a3927] hover:bg-[#5c4731] text-[#fbf6e9] rounded border border-[#6b5239] text-[10px] font-medium cursor-pointer transition shrink-0">
                      Subir Imagen
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      placeholder="o pegar URL de imagen..."
                      value={customAvatarUrl || (formData.avatarUrl && !formData.avatarUrl.startsWith('data:') ? formData.avatarUrl : '')}
                      onChange={(e) => {
                        setCustomAvatarUrl(e.target.value);
                        updateField('avatarUrl', e.target.value);
                      }}
                      className="flex-1 bg-[#ede2d1] border border-[#d6c4aa] rounded px-2 py-1 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                    />
                  </div>
                </div>
              </div>

              {/* Character & Player Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                <div>
                  <label className="block text-[11px] font-bold font-fantasy text-[#4a361c] mb-1 uppercase">
                    Nombre del Personaje
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-3 py-1.5 text-sm text-[#2c241b] font-bold focus:outline-none focus:border-[#8c672b]"
                    placeholder="Ej. Elías Ravenshade"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold font-fantasy text-[#4a361c] mb-1 uppercase">
                    Nombre del Jugador
                  </label>
                  <input
                    type="text"
                    value={formData.playerName}
                    onChange={(e) => updateField('playerName', e.target.value)}
                    className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                    placeholder="Ej. Nico"
                  />
                </div>
              </div>

              {/* Wikidot Selectors: Raza, Clase & Trasfondo */}
              <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-4">
                <h3 className="text-xs font-bold font-fantasy text-[#8c672b] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Selección de Wikidot 5e
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Race Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a361c] mb-1">Raza (Wikidot)</label>
                    <select
                      value={formData.race}
                      onChange={(e) => handleRaceChange(e.target.value)}
                      className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-2.5 py-1.5 text-xs font-bold text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                    >
                      {WIKIDOT_RACES.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    {currentRace.subraces && currentRace.subraces.length > 0 && (
                      <div className="mt-2">
                        <label className="block text-[10px] text-[#705c43] mb-0.5">Subraza</label>
                        <select
                          value={formData.subrace || currentRace.subraces[0].name}
                          onChange={(e) => updateField('subrace', e.target.value)}
                          className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-2 py-1 text-[11px] text-[#2c241b]"
                        >
                          {currentRace.subraces.map((sr) => (
                            <option key={sr.id} value={sr.name}>
                              {sr.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Class Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a361c] mb-1">Clase (Wikidot)</label>
                    <select
                      value={formData.class}
                      onChange={(e) => handleClassChange(e.target.value)}
                      className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-2.5 py-1.5 text-xs font-bold text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                    >
                      {WIKIDOT_CLASSES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} (d{c.hitDie})
                        </option>
                      ))}
                    </select>

                    {currentClass.subclasses && currentClass.subclasses.length > 0 && (
                      <div className="mt-2">
                        <label className="block text-[10px] text-[#705c43] mb-0.5">{currentClass.subclassesName}</label>
                        <select
                          value={formData.subclass || currentClass.subclasses[0].name}
                          onChange={(e) => updateField('subclass', e.target.value)}
                          className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-2 py-1 text-[11px] text-[#2c241b]"
                        >
                          {currentClass.subclasses.map((sc) => (
                            <option key={sc.id} value={sc.name}>
                              {sc.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Background Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a361c] mb-1">Trasfondo (Wikidot)</label>
                    <select
                      value={formData.background || WIKIDOT_BACKGROUNDS[0].name}
                      onChange={(e) => handleBackgroundChange(e.target.value)}
                      className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md px-2.5 py-1.5 text-xs font-bold text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                    >
                      {WIKIDOT_BACKGROUNDS.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>

                    {currentBackground && (
                      <div className="mt-2 p-1.5 bg-[#ede1ce] rounded text-[10px] text-[#63503b]">
                        <span className="font-bold">{currentBackground.featureName}:</span> {currentBackground.featureDescription.slice(0, 75)}...
                      </div>
                    )}
                  </div>
                </div>

                {/* Race & Class Traits Summary Card */}
                <div className="p-3 bg-[#ede1ce] rounded-lg border border-[#cfbe9f] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#4a361c]">
                    <span>Rasgos de {formData.race} & {formData.class}:</span>
                    <span>Velocidad: {formData.speed} • Dado: d{currentClass.hitDie}</span>
                  </div>
                  <p className="text-[11px] text-[#5e4b37] leading-relaxed">
                    {currentRace.traits.map((t) => t.name).join(', ')}. Salvaciones de clase: <strong>{currentClass.savingThrows.join(', ')}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMBAT STATS & ATTACKS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              {/* Combat Core Row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] text-center">
                <div className="bg-[#fcf9f2] p-2 rounded-lg border border-[#d6c4aa]">
                  <label className="block text-[11px] font-bold font-fantasy text-[#8c672b] mb-1 flex items-center justify-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Nivel
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.level}
                    onChange={(e) => {
                      const lvl = parseInt(e.target.value) || 1;
                      updateField('level', lvl);
                      const slots = updateSpellSlotsForClassAndLevel(formData.class, lvl);
                      updateField('spellSlots', slots);
                    }}
                    className="w-full text-center bg-white border border-[#d6c4aa] rounded py-1 text-sm font-bold text-[#2c241b]"
                  />
                </div>

                <div className="bg-[#fcf9f2] p-2 rounded-lg border border-[#d6c4aa]">
                  <label className="block text-[11px] font-bold font-fantasy text-[#a84944] mb-1 flex items-center justify-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> HP Máx
                  </label>
                  <input
                    type="number"
                    value={formData.maxHp}
                    onChange={(e) => {
                      const max = parseInt(e.target.value) || 1;
                      updateField('maxHp', max);
                      if (formData.currentHp > max) updateField('currentHp', max);
                    }}
                    className="w-full text-center bg-white border border-[#d6c4aa] rounded py-1 text-sm font-bold text-[#2c241b]"
                  />
                </div>

                <div className="bg-[#fcf9f2] p-2 rounded-lg border border-[#d6c4aa]">
                  <label className="block text-[11px] font-bold font-fantasy text-[#4a7856] mb-1 flex items-center justify-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> HP Actual
                  </label>
                  <input
                    type="number"
                    value={formData.currentHp}
                    onChange={(e) => updateField('currentHp', parseInt(e.target.value) || 0)}
                    className="w-full text-center bg-white border border-[#d6c4aa] rounded py-1 text-sm font-bold text-[#2c241b]"
                  />
                </div>

                <div className="bg-[#fcf9f2] p-2 rounded-lg border border-[#d6c4aa]">
                  <label className="block text-[11px] font-bold font-fantasy text-[#294c63] mb-1 flex items-center justify-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> CA
                  </label>
                  <input
                    type="number"
                    value={formData.ac}
                    onChange={(e) => updateField('ac', parseInt(e.target.value) || 10)}
                    className="w-full text-center bg-white border border-[#d6c4aa] rounded py-1 text-sm font-bold text-[#2c241b]"
                  />
                </div>

                <div className="bg-[#fcf9f2] p-2 rounded-lg border border-[#d6c4aa] col-span-2 md:col-span-1">
                  <label className="block text-[11px] font-bold font-fantasy text-[#8c672b] mb-1">Iniciativa</label>
                  <input
                    type="number"
                    value={formData.initiativeBonus}
                    onChange={(e) => updateField('initiativeBonus', parseInt(e.target.value) || 0)}
                    className="w-full text-center bg-white border border-[#d6c4aa] rounded py-1 text-sm font-bold text-[#2c241b]"
                  />
                </div>
              </div>

              {/* Ability Scores */}
              <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                <h3 className="text-xs font-bold font-fantasy uppercase tracking-wider text-[#8c672b] mb-2.5">
                  Puntuaciones de Característica
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((stat) => {
                    const label =
                      stat === 'str' ? 'FUE' : stat === 'dex' ? 'DES' : stat === 'con' ? 'CON' : stat === 'int' ? 'INT' : stat === 'wis' ? 'SAB' : 'CAR';
                    const mod = Math.floor((formData.stats[stat] - 10) / 2);
                    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

                    return (
                      <div key={stat} className="bg-[#fcf9f2] p-2 rounded-lg border border-[#d6c4aa] text-center">
                        <label className="block text-[10px] font-bold font-fantasy text-[#705c43] mb-0.5">{label}</label>
                        <input
                          type="number"
                          value={formData.stats[stat]}
                          onChange={(e) => updateStat(stat, parseInt(e.target.value) || 10)}
                          className="w-full text-center bg-white border border-[#d6c4aa] rounded py-1 text-xs font-bold text-[#2c241b]"
                        />
                        <span className="block mt-0.5 text-[11px] text-[#8c672b] font-mono font-bold">{modStr}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attacks */}
              <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold font-fantasy uppercase tracking-wider text-[#8c672b]">
                    Ataques Principales
                  </h3>
                  <button
                    type="button"
                    onClick={addAttack}
                    className="flex items-center gap-1 text-[11px] bg-[#c59b27] hover:bg-[#b0871e] text-[#1c150e] font-bold px-2.5 py-0.5 rounded border border-[#8c672b] shadow transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Ataque
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(formData.attacks || []).map((att, i) => (
                    <div key={att.id || i} className="grid grid-cols-12 gap-1.5 bg-[#fcf9f2] p-1.5 rounded border border-[#d6c4aa] items-center">
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={att.name}
                          onChange={(e) => updateAttack(i, 'name', e.target.value)}
                          placeholder="Arma"
                          className="w-full bg-white border border-[#d6c4aa] rounded px-2 py-1 text-xs text-[#2c241b]"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={att.bonus}
                          onChange={(e) => updateAttack(i, 'bonus', e.target.value)}
                          placeholder="+5"
                          className="w-full bg-white border border-[#d6c4aa] rounded px-2 py-1 text-xs text-[#2c241b] text-center"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={att.damage}
                          onChange={(e) => updateAttack(i, 'damage', e.target.value)}
                          placeholder="1d8+3"
                          className="w-full bg-white border border-[#d6c4aa] rounded px-2 py-1 text-xs text-[#2c241b] text-center"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={att.type}
                          onChange={(e) => updateAttack(i, 'type', e.target.value)}
                          placeholder="Tipo"
                          className="w-full bg-white border border-[#d6c4aa] rounded px-2 py-1 text-xs text-[#2c241b]"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => removeAttack(i)}
                          className="text-[#8c672b] hover:text-[#b5403a] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPELLS TAILORED BY RACE AND CLASS WITH BROWSE-HIGHER MODE */}
          {activeTab === 'spells' && isCaster && (
            <div className="space-y-4">
              {/* Spell Limit Warning / Capacity Status Banner */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col gap-2 shadow-sm ${
                  isCantripsOver || isSpellsOver
                    ? 'bg-[#fff5e5] border-[#d49733] text-[#704204]'
                    : 'bg-[#f5ede0] border-[#d6c4aa] text-[#4a361c]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8c672b]" />
                    <span className="font-fantasy font-bold text-xs uppercase tracking-wide">
                      Capacidad Mágica Oficial (Wikidot / D&D 5e)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    <span
                      className={`px-2 py-0.5 rounded border ${
                        isCantripsOver
                          ? 'bg-[#fed7d7] text-[#9b1c1c] border-[#f8b4b4]'
                          : 'bg-[#e7dfd1] text-[#423424] border-[#d6c4aa]'
                      }`}
                    >
                      Trucos: {selectedCantripsCount} / {spellLimits.maxCantrips}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded border ${
                        isSpellsOver
                          ? 'bg-[#fed7d7] text-[#9b1c1c] border-[#f8b4b4]'
                          : 'bg-[#e7dfd1] text-[#423424] border-[#d6c4aa]'
                      }`}
                    >
                      {spellLimits.casterType === 'prepared' ? 'Preparables' : 'Conocidos'}: {selectedSpellsCount} /{' '}
                      {spellLimits.maxPreparedOrKnown}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed">
                  <span className="font-semibold text-[#8c672b]">Regla & Fórmula:</span> {spellLimits.explanation}
                </p>
                {(isCantripsOver || isSpellsOver) && (
                  <div className="text-[11px] bg-amber-100/90 border border-amber-300 rounded px-2.5 py-1 text-amber-900 font-medium flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>
                      Has alcanzado o superado el cupo oficial ({isCantripsOver ? 'Trucos' : ''}
                      {isCantripsOver && isSpellsOver ? ' y ' : ''}
                      {isSpellsOver ? 'Conjuros' : ''}). El sistema te permite seleccionarlos y conservarlos si tu DM lo aprueba o por objetos mágicos de campaña.
                    </span>
                  </div>
                )}
              </div>

              {/* Subheader and Browse Higher button */}
              <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold font-fantasy text-xs uppercase text-[#4a361c]">
                    Conjuros Disponibles para {formData.class} (Nivel {formData.level})
                  </h4>
                  <p className="text-[11px] text-[#705c43]">
                    Habilitados según tu clase y raza hasta Nivel {filteredSpells.maxSpellLevel === 0 ? 'Trucos' : filteredSpells.maxSpellLevel}. Haz clic en la tarjeta para seleccionarlo o en el enlace para leer su descripción completa.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHigherSpells(!showHigherSpells)}
                  className="px-2.5 py-1 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#5e4b37] border border-[#cbb99f] rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {showHigherSpells ? 'Ocultar Niveles Superiores' : 'Chusmear Niveles Superiores 👁️'}
                </button>
              </div>

              {/* Spells available to learn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {filteredSpells.availableToChoose.map((spell) => {
                  const isSelected = (formData.spells || []).some((s) => s.name.toLowerCase() === spell.name.toLowerCase());
                  return (
                    <div
                      key={spell.id}
                      className={`p-3 rounded-xl border shadow-sm transition flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#c59b27]/20 border-[#8c672b]'
                          : 'bg-[#fcf9f2] border-[#d6c4aa] hover:border-[#8c672b]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => toggleSpellSelection(spell)}
                        >
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h5 className="font-bold font-fantasy text-xs text-[#4a361c]">
                              {spell.name}
                            </h5>
                            <span className="text-[10px] bg-[#ede1ce] text-[#5e4b37] px-1 rounded font-mono font-bold">
                              {spell.level === 0 ? 'Truco' : `Nv ${spell.level}`}
                            </span>
                            {spell.concentration && (
                              <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-mono font-bold" title="Requiere Concentración">
                                C
                              </span>
                            )}
                            {spell.ritual && (
                              <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1 rounded font-mono font-bold" title="Ritual">
                                R
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#705c43] mt-1 line-clamp-2">
                            {spell.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleSpellSelection(spell)}
                          className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 cursor-pointer ${
                            isSelected ? 'bg-[#8c672b] text-white border-[#8c672b]' : 'border-[#b0a086] bg-white'
                          }`}
                          title={isSelected ? 'Quitar conjuro' : 'Seleccionar conjuro'}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-[#ede1ce] text-[10px] text-[#8c672b]">
                        <span className="italic">{spell.school || 'Magia'} • {spell.castingTime || '1 acción'}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetailSpell(spell);
                          }}
                          className="font-bold hover:underline flex items-center gap-1 text-[#6b4c1b] cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> Ver detalles & componentes →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Higher level spells to browse */}
              {showHigherSpells && (
                <div className="pt-3 border-t border-[#d6c4aa] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-fantasy text-[#8c672b] uppercase">
                    <Lock className="w-3.5 h-3.5" /> Conjuros de Niveles Superiores (Solo Consulta)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {filteredSpells.higherLevelToBrowse.map((spell) => (
                      <div key={spell.id} className="p-2.5 bg-[#f5ede0] rounded-lg border border-[#dbcbb2] opacity-85 flex flex-col justify-between gap-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold font-fantasy text-xs text-[#4a361c]">{spell.name}</span>
                              <span className="text-[9px] bg-[#a84944] text-white px-1 rounded font-mono font-bold">
                                Nv {spell.level}
                              </span>
                              {spell.concentration && (
                                <span className="text-[8px] bg-amber-200 text-amber-900 px-1 rounded font-mono font-bold">
                                  C
                                </span>
                              )}
                              {spell.ritual && (
                                <span className="text-[8px] bg-emerald-200 text-emerald-900 px-1 rounded font-mono font-bold">
                                  R
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[#705c43] line-clamp-2 mt-0.5">{spell.description}</p>
                          </div>
                          <span className="text-[9px] bg-[#ded0ba] text-[#5e4b37] px-1.5 py-0.5 rounded font-mono shrink-0">
                            Bloqueado
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-[#ded0ba] text-[10px] text-[#8c672b]">
                          <span className="italic">{spell.school || 'Magia'}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedDetailSpell(spell)}
                            className="font-bold hover:underline flex items-center gap-1 text-[#6b4c1b] cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> Ver info completa →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: NOTES & BACKGROUND TRAITS */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] space-y-3">
                <label className="block text-xs font-bold font-fantasy uppercase text-[#4a361c]">
                  Notas, Habilidades Pasivas y Equipo
                </label>
                <textarea
                  rows={6}
                  value={formData.notes || ''}
                  onChange={(e) => updateField('notes', e.target.value)}
                  className="w-full bg-[#fcf9f2] border border-[#d6c4aa] rounded-md p-3 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] leading-relaxed"
                  placeholder="Detalles sobre trasfondo, objetos mágicos, peculiaridades del personaje..."
                />
              </div>
            </div>
          )}

          {/* Footer Save Button */}
          <div className="flex justify-end gap-2 pt-2 border-t border-[#d6c4aa]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#705c43] hover:text-[#2c241b] transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-bold font-fantasy bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg shadow-md transition cursor-pointer"
            >
              Guardar Personaje
            </button>
          </div>
        </form>
      </div>

      {/* Spell Detail & Inspection Modal */}
      {selectedDetailSpell && (
        <SpellDetailModal
          spell={selectedDetailSpell}
          onClose={() => setSelectedDetailSpell(null)}
          isKnown={(formData.spells || []).some(
            (s) => s.name.toLowerCase() === selectedDetailSpell.name.toLowerCase()
          )}
          onAddSpell={
            !(formData.spells || []).some(
              (s) => s.name.toLowerCase() === selectedDetailSpell.name.toLowerCase()
            ) && selectedDetailSpell.level <= filteredSpells.maxSpellLevel
              ? () => toggleSpellSelection(selectedDetailSpell)
              : undefined
          }
          onRemoveSpell={
            (formData.spells || []).some(
              (s) => s.name.toLowerCase() === selectedDetailSpell.name.toLowerCase()
            )
              ? () => toggleSpellSelection(selectedDetailSpell)
              : undefined
          }
        />
      )}
    </div>
  );
};
