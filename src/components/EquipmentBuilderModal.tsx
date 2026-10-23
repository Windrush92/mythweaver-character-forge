import React, { useState } from 'react';
import {
  X,
  Shield,
  Sparkles,
  Swords,
  Coins,
  Weight,
  Crosshair,
  Flame,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { WeaponDef, ArmorDef, WeaponCategory, ArmorCategory } from '../data/weaponsAndArmorData';

interface EquipmentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWeapon?: WeaponDef | null;
  initialArmor?: ArmorDef | null;
  onSaveWeapon: (weapon: WeaponDef) => void;
  onSaveArmor: (armor: ArmorDef) => void;
}

const WEAPON_CATEGORIES: { id: WeaponCategory; label: string }[] = [
  { id: 'simple-melee', label: 'Simple Cuerpo a Cuerpo' },
  { id: 'simple-ranged', label: 'Simple a Distancia' },
  { id: 'martial-melee', label: 'Marcial Cuerpo a Cuerpo' },
  { id: 'martial-ranged', label: 'Marcial a Distancia' },
];

const ARMOR_CATEGORIES: { id: ArmorCategory; label: string }[] = [
  { id: 'light', label: 'Armadura Ligera' },
  { id: 'medium', label: 'Armadura Media' },
  { id: 'heavy', label: 'Armadura Pesada' },
  { id: 'shield', label: 'Escudo (+2 CA)' },
];

const DAMAGE_TYPES = [
  'Cortante',
  'Perforante',
  'Contundente',
  'Fuego',
  'Frío',
  'Relámpago',
  'Trueno',
  'Radiante',
  'Necrótico',
  'Fuerza',
  'Veneno',
  'Ácido',
  'Psíquico',
];

const DAMAGE_DICE_OPTIONS = ['1d4', '1d6', '1d8', '1d10', '1d12', '2d6', '2d8', '3d6', '1d20', 'Personalizado'];

const COMMON_PROPERTIES = [
  { id: 'Sutil (Finesse)', label: 'Sutil (Finesse)', desc: 'Permite elegir FUE o DES para ataque y daño.' },
  { id: 'Ligera (Light)', label: 'Ligera (Light)', desc: 'Ideal para blandir dos armas a la vez.' },
  { id: 'Versátil', label: 'Versátil (Versatile)', desc: 'Puede usarse con 1 o 2 manos para más daño.' },
  { id: 'Pesada (Heavy)', label: 'Pesada (Heavy)', desc: 'Criaturas pequeñas tienen desventaja al usarla.' },
  { id: 'Dos Manos (Two-Handed)', label: 'Dos Manos (Two-Handed)', desc: 'Requiere ambas manos para atacar.' },
  { id: 'Alcance (Reach)', label: 'Alcance (Reach)', desc: 'Agrega +5 pies al rango de ataque.' },
  { id: 'Arrojadiza (Thrown)', label: 'Arrojadiza (Thrown)', desc: 'Puede lanzarse para ataque a distancia.' },
  { id: 'Munición (Ammunition)', label: 'Munición (Ammunition)', desc: 'Requiere proyectiles para disparar.' },
  { id: 'Recarga (Loading)', label: 'Recarga (Loading)', desc: 'Solo un ataque por acción sin dotes especiales.' },
  { id: 'Mágica +1', label: 'Mágica (+1)', desc: 'Otorga +1 a tiradas de ataque y daño.' },
  { id: 'Mágica +2', label: 'Mágica (+2)', desc: 'Otorga +2 a tiradas de ataque y daño.' },
  { id: 'Mágica +3', label: 'Mágica (+3)', desc: 'Otorga +3 a tiradas de ataque y daño.' },
];

export const EquipmentBuilderModal: React.FC<EquipmentBuilderModalProps> = ({
  isOpen,
  onClose,
  initialWeapon,
  initialArmor,
  onSaveWeapon,
  onSaveArmor,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'weapon' | 'armor'>(initialArmor ? 'armor' : 'weapon');

  // Weapon form state
  const [wName, setWName] = useState(initialWeapon?.name || '');
  const [wNameEn, setWNameEn] = useState(initialWeapon?.nameEn || '');
  const [wCategory, setWCategory] = useState<WeaponCategory>(initialWeapon?.category || 'martial-melee');
  const [wDamageDice, setWDamageDice] = useState(initialWeapon?.damageDice || '1d8');
  const [wCustomDice, setWCustomDice] = useState('');
  const [wDamageType, setWDamageType] = useState<any>(initialWeapon?.damageType || 'Cortante');
  const [wRange, setWRange] = useState(initialWeapon?.range || 'Alcance 5 pies');
  const [wWeight, setWWeight] = useState(initialWeapon?.weight || '3 lb.');
  const [wCost, setWCost] = useState(initialWeapon?.cost || '15 po');
  const [wProperties, setWProperties] = useState<string[]>(initialWeapon?.properties || ['Versátil (1d10)']);
  const [wVersatileDice, setWVersatileDice] = useState('1d10');
  const [wDescription, setWDescription] = useState(initialWeapon?.description || '');

  // Armor form state
  const [aName, setAName] = useState(initialArmor?.name || '');
  const [aNameEn, setANameEn] = useState(initialArmor?.nameEn || '');
  const [aCategory, setACategory] = useState<ArmorCategory>(initialArmor?.category || 'medium');
  const [aBaseAc, setABaseAc] = useState<number>(initialArmor?.baseAc ?? 14);
  const [aDexBonus, setADexBonus] = useState<'full' | 'max2' | 'none'>(initialArmor?.dexBonus || 'max2');
  const [aStrengthReq, setAStrengthReq] = useState<number>(initialArmor?.strengthReq ?? 0);
  const [aStealthDisadvantage, setAStealthDisadvantage] = useState<boolean>(initialArmor?.stealthDisadvantage ?? false);
  const [aWeight, setAWeight] = useState(initialArmor?.weight || '20 lb.');
  const [aCost, setACost] = useState(initialArmor?.cost || '50 po');
  const [aDescription, setADescription] = useState(initialArmor?.description || '');

  const [errorMsg, setErrorMsg] = useState('');

  const toggleProperty = (propId: string) => {
    if (propId.startsWith('Mágica')) {
      if (wProperties.includes(propId)) {
        setWProperties((prev) => prev.filter((p) => p !== propId));
      } else {
        setWProperties((prev) => [...prev.filter((p) => !p.startsWith('Mágica')), propId]);
      }
      return;
    }

    if (propId.startsWith('Versátil')) {
      if (wProperties.some((p) => p.startsWith('Versátil'))) {
        setWProperties((prev) => prev.filter((p) => !p.startsWith('Versátil')));
      } else {
        setWProperties((prev) => [...prev, `Versátil (${wVersatileDice})`]);
      }
      return;
    }

    if (wProperties.includes(propId)) {
      setWProperties((prev) => prev.filter((p) => p !== propId));
    } else {
      setWProperties((prev) => [...prev, propId]);
    }
  };

  const isPropSelected = (propId: string) => {
    if (propId.startsWith('Versátil')) {
      return wProperties.some((p) => p.startsWith('Versátil'));
    }
    return wProperties.includes(propId);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'weapon') {
      if (!wName.trim()) {
        setErrorMsg('El nombre del arma es obligatorio.');
        return;
      }
      const dice = wDamageDice === 'Personalizado' ? (wCustomDice.trim() || '1d8') : wDamageDice;
      
      const newWeapon: WeaponDef = {
        id: initialWeapon?.id || `custom-w-${Date.now()}`,
        name: wName.trim(),
        nameEn: wNameEn.trim() || wName.trim(),
        category: wCategory,
        damageDice: dice,
        damageType: wDamageType,
        range: wRange.trim() || 'Alcance 5 pies',
        weight: wWeight.trim() || '3 lb.',
        cost: wCost.trim() || '10 po',
        properties: wProperties,
        description: wDescription.trim() || 'Arma forjada artesanalmente.',
      };

      onSaveWeapon(newWeapon);
      onClose();
    } else {
      if (!aName.trim()) {
        setErrorMsg('El nombre de la armadura o escudo es obligatorio.');
        return;
      }

      const newArmor: ArmorDef = {
        id: initialArmor?.id || `custom-a-${Date.now()}`,
        name: aName.trim(),
        nameEn: aNameEn.trim() || aName.trim(),
        category: aCategory,
        baseAc: Number(aBaseAc) || 10,
        dexBonus: aCategory === 'shield' ? 'none' : aDexBonus,
        strengthReq: Number(aStrengthReq) || 0,
        stealthDisadvantage: aStealthDisadvantage,
        weight: aWeight.trim() || '10 lb.',
        cost: aCost.trim() || '20 po',
        description: aDescription.trim() || 'Armadura forjada artesanalmente.',
      };

      onSaveArmor(newArmor);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)] border-2 border-[#5a4228] bg-[#160f0a] text-[#ebdcc7]"
        style={{
          backgroundImage: "radial-gradient(ellipse at top, #26170d 0%, #160f0a 80%)",
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#4a3622] bg-gradient-to-r from-[#21140b] via-[#2f1d10] to-[#21140b] shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2e1908] border border-[#a87c2b] flex items-center justify-center shadow-inner">
              {mode === 'weapon' ? (
                <Swords className="w-5 h-5 text-[#ffd56b]" />
              ) : (
                <Shield className="w-5 h-5 text-[#ffd56b]" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold font-fantasy text-[#ffd56b] tracking-wide flex items-center gap-2">
                {mode === 'weapon' ? 'Forja de Armas Personalizadas' : 'Taller de Armaduras & Escudos'}
                <span className="text-xs px-2 py-0.5 rounded bg-[#4a1f10] text-[#ffbe76] border border-[#7a391f] font-mono uppercase">
                  Homebrew 5e
                </span>
              </h2>
              <p className="text-xs text-[#a89279]">
                Crea equipo con estadísticas oficiales, dados de daño, propiedades tácticas y efectos mágicos.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[#26150b] hover:bg-[#3d2011] border border-[#523924] hover:border-[#dfbe7e] flex items-center justify-center text-[#dfbe7e] transition"
            title="Cerrar forja"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (Arma vs Armadura) */}
        <div className="flex border-b border-[#382414] bg-[#1a110a] px-6 shrink-0">
          <button
            type="button"
            onClick={() => setMode('weapon')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase transition border-b-2 ${
              mode === 'weapon'
                ? 'border-[#ffd56b] text-[#ffd56b] bg-[#291a0e]/60 shadow-[inset_0_-2px_6px_rgba(255,213,107,0.2)]'
                : 'border-transparent text-[#a89279] hover:text-[#e4cfb2]'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Crear Arma</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('armor')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase transition border-b-2 ${
              mode === 'armor'
                ? 'border-[#ffd56b] text-[#ffd56b] bg-[#291a0e]/60 shadow-[inset_0_-2px_6px_rgba(255,213,107,0.2)]'
                : 'border-transparent text-[#a89279] hover:text-[#e4cfb2]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Crear Armadura o Escudo</span>
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/80 border border-red-700/60 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ============================================================== */}
          {/* WEAPON BUILDER FORM */}
          {/* ============================================================== */}
          {mode === 'weapon' ? (
            <div className="space-y-6">
              {/* Row 1: Names & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Nombre del Arma *
                  </label>
                  <input
                    type="text"
                    value={wName}
                    onChange={(e) => setWName(e.target.value)}
                    placeholder="Ej. Espada Larga de Fuegosangre, Lanza Dracónica..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Categoría de 5e *
                  </label>
                  <select
                    value={wCategory}
                    onChange={(e) => setWCategory(e.target.value as WeaponCategory)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none"
                  >
                    {WEAPON_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#1c1209]">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Damage, Damage Type, Range, Weight, Cost */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Dado Daño *
                  </label>
                  <select
                    value={wDamageDice}
                    onChange={(e) => setWDamageDice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono font-bold text-sm focus:outline-none"
                  >
                    {DAMAGE_DICE_OPTIONS.map((d) => (
                      <option key={d} value={d} className="bg-[#1c1209]">
                        {d}
                      </option>
                    ))}
                  </select>
                  {wDamageDice === 'Personalizado' && (
                    <input
                      type="text"
                      placeholder="Ej. 2d10"
                      value={wCustomDice}
                      onChange={(e) => setWCustomDice(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1 text-xs rounded bg-[#110b07] border border-[#ffd56b] text-[#ffd56b] font-mono"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Tipo de Daño *
                  </label>
                  <select
                    value={wDamageType}
                    onChange={(e) => setWDamageType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  >
                    {DAMAGE_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#1c1209]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Alcance
                  </label>
                  <input
                    type="text"
                    value={wRange}
                    onChange={(e) => setWRange(e.target.value)}
                    placeholder="Ej. 5 pies, 20/60"
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Peso
                  </label>
                  <input
                    type="text"
                    value={wWeight}
                    onChange={(e) => setWWeight(e.target.value)}
                    placeholder="Ej. 3 lb."
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Precio / Costo
                  </label>
                  <input
                    type="text"
                    value={wCost}
                    onChange={(e) => setWCost(e.target.value)}
                    placeholder="Ej. 25 po"
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Properties Checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e] flex items-center justify-between">
                  <span>Propiedades Oficiales de 5e & Etiquetas</span>
                  <span className="text-[11px] text-[#a89279] font-normal lowercase">
                    {wProperties.length} seleccionadas
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {COMMON_PROPERTIES.map((prop) => {
                    const selected = isPropSelected(prop.id);
                    return (
                      <button
                        key={prop.id}
                        type="button"
                        onClick={() => toggleProperty(prop.id)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition flex flex-col justify-between ${
                          selected
                            ? 'bg-[#3b2311] border-[#ffd56b] text-[#fff4d1] shadow-[0_2px_8px_rgba(255,213,107,0.15)]'
                            : 'bg-[#18100a] border-[#382414] text-[#b39e87] hover:border-[#6b4728]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-bold">{prop.label}</span>
                          {selected && <Check className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />}
                        </div>
                        <span className="text-[10px] text-[#8c745d] line-clamp-2 leading-tight">
                          {prop.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Versatile Damage Selector if Versatile is selected */}
                {isPropSelected('Versátil') && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#24170d] border border-[#6b4825] mt-2">
                    <span className="text-xs text-[#ffd56b] font-bold">Daño Versátil a Dos Manos:</span>
                    <select
                      value={wVersatileDice}
                      onChange={(e) => {
                        const newDice = e.target.value;
                        setWVersatileDice(newDice);
                        setWProperties((prev) =>
                          prev.map((p) => (p.startsWith('Versátil') ? `Versátil (${newDice})` : p))
                        );
                      }}
                      className="px-2.5 py-1 text-xs rounded bg-[#110b07] border border-[#8a5d2e] text-[#ffd56b] font-mono font-bold"
                    >
                      <option value="1d8">1d8</option>
                      <option value="1d10">1d10</option>
                      <option value="1d12">1d12</option>
                      <option value="2d6">2d6</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Row 4: Description & Magical Effects */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                  Descripción, Leyenda & Propiedades Mágicas Especiales
                </label>
                <textarea
                  rows={4}
                  value={wDescription}
                  onChange={(e) => setWDescription(e.target.value)}
                  placeholder="Describe la forja, el material (acero enano, mitral, obsidiana), o cualquier habilidad mágica (ej. 'Al impactar inflige 1d6 extra de fuego. Una vez por día permite conjurar Luz')..."
                  className="w-full p-3 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* ARMOR & SHIELD BUILDER FORM */
            /* ============================================================== */
            <div className="space-y-6">
              {/* Row 1: Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Nombre de la Armadura o Escudo *
                  </label>
                  <input
                    type="text"
                    value={aName}
                    onChange={(e) => setAName(e.target.value)}
                    placeholder="Ej. Cota de Mallas Reforzada, Escudo del Roble Guardián..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Tipo de Protección *
                  </label>
                  <select
                    value={aCategory}
                    onChange={(e) => {
                      const cat = e.target.value as ArmorCategory;
                      setACategory(cat);
                      if (cat === 'shield') {
                        setABaseAc(2);
                        setADexBonus('none');
                      } else if (cat === 'light') {
                        setABaseAc(11);
                        setADexBonus('full');
                      } else if (cat === 'medium') {
                        setABaseAc(14);
                        setADexBonus('max2');
                      } else if (cat === 'heavy') {
                        setABaseAc(16);
                        setADexBonus('none');
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none"
                  >
                    {ARMOR_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#1c1209]">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: AC, Dex Bonus rule, Str requirement */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {aCategory === 'shield' ? 'Bonificador CA' : 'CA Base *'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={aBaseAc}
                    onChange={(e) => setABaseAc(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono font-bold text-base focus:outline-none"
                    required
                  />
                  <p className="text-[10px] text-[#8c745d]">
                    {aCategory === 'shield' ? '+2 CA estándar' : 'Valor base de CA'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Bono de Destreza
                  </label>
                  <select
                    value={aDexBonus}
                    disabled={aCategory === 'shield'}
                    onChange={(e) => setADexBonus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none disabled:opacity-50"
                  >
                    <option value="full" className="bg-[#1c1209]">Completo (+ Mod DES)</option>
                    <option value="max2" className="bg-[#1c1209]">Limitado (+ DES máx 2)</option>
                    <option value="none" className="bg-[#1c1209]">Ninguno (Sin bono)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Fuerza Mínima (FUE)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={aStrengthReq}
                    onChange={(e) => setAStrengthReq(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  />
                  <p className="text-[10px] text-[#8c745d]">0 = Sin requisito</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Desventaja Sigilo
                  </label>
                  <button
                    type="button"
                    onClick={() => setAStealthDisadvantage(!aStealthDisadvantage)}
                    className={`w-full py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-2 ${
                      aStealthDisadvantage
                        ? 'bg-red-950/70 border-red-700 text-red-200'
                        : 'bg-[#18100a] border-[#382414] text-[#a89279]'
                    }`}
                  >
                    {aStealthDisadvantage ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span>Sí (Desventaja)</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>No (Silenciosa)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Row 3: Weight and Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Peso
                  </label>
                  <input
                    type="text"
                    value={aWeight}
                    onChange={(e) => setAWeight(e.target.value)}
                    placeholder="Ej. 45 lb."
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    Precio / Costo
                  </label>
                  <input
                    type="text"
                    value={aCost}
                    onChange={(e) => setACost(e.target.value)}
                    placeholder="Ej. 75 po"
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                  Descripción, Material & Efectos Especiales
                </label>
                <textarea
                  rows={4}
                  value={aDescription}
                  onChange={(e) => setADescription(e.target.value)}
                  placeholder="Detalla si es de escamas de dragón, mitral (sin desventaja en sigilo), adamandina (inmune a críticos) o si otorga resistencias a daños..."
                  className="w-full p-3 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl border border-[#523924] bg-[#110b07] shadow-inner space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#a89279] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd56b]" />
              Vista Previa en el Compendio
            </span>

            {mode === 'weapon' ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#1a110a] border border-[#3d2614]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#ffd56b] text-base">{wName || 'Arma sin nombre'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#452712] text-[#ffcf70] border border-[#6b421f] font-mono">
                      {wCategory}
                    </span>
                  </div>
                  <div className="text-xs text-[#d8c5ad] mt-0.5 flex flex-wrap gap-2">
                    <span className="text-red-400 font-mono font-bold">
                      {wDamageDice === 'Personalizado' ? (wCustomDice || '1d8') : wDamageDice} {wDamageType}
                    </span>
                    <span>•</span>
                    <span>{wRange || '5 pies'}</span>
                    <span>•</span>
                    <span>{wWeight || '3 lb.'}</span>
                    <span>•</span>
                    <span className="text-amber-300">{wCost || '10 po'}</span>
                  </div>
                  {wProperties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {wProperties.map((p) => (
                        <span key={p} className="text-[10px] px-1.5 py-0.2 rounded bg-[#2a1a0e] text-[#dfbe7e] border border-[#4d321d]">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#1a110a] border border-[#3d2614]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#ffd56b] text-base">{aName || 'Armadura sin nombre'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2b1f47] text-[#cbb6f7] border border-[#483770] font-mono uppercase">
                      {aCategory}
                    </span>
                  </div>
                  <div className="text-xs text-[#d8c5ad] mt-0.5 flex flex-wrap gap-2">
                    <span className="text-emerald-400 font-mono font-bold">
                      {aCategory === 'shield' ? `+${aBaseAc} CA` : `${aBaseAc} CA Base`}
                    </span>
                    <span>•</span>
                    <span>Bono DES: {aCategory === 'shield' ? 'N/A' : aDexBonus}</span>
                    <span>•</span>
                    <span>FUE: {aStrengthReq ? `Mín ${aStrengthReq}` : 'Sin requisito'}</span>
                    <span>•</span>
                    <span className="text-amber-300">{aCost || '20 po'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#382414]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#523924] hover:bg-[#26170d] text-[#c9b49b] text-sm font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#b88c32] via-[#dfbe7e] to-[#b88c32] hover:brightness-110 text-[#1a1006] text-sm font-bold tracking-wide uppercase shadow-[0_4px_15px_rgba(223,190,126,0.35)] transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#1a1006]" />
              <span>Guardar en el Compendio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
