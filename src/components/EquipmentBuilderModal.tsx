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
import { useLanguageStore } from '../hooks/useLanguageStore';
import { localizeReactNode } from '../utils/dndEnglishTranslator';

interface EquipmentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWeapon?: WeaponDef | null;
  initialArmor?: ArmorDef | null;
  onSaveWeapon: (weapon: WeaponDef) => void;
  onSaveArmor: (armor: ArmorDef) => void;
}

const WEAPON_CATEGORIES: { id: WeaponCategory; labelEs: string; labelEn: string }[] = [
  { id: 'simple-melee', labelEs: 'Simple Cuerpo a Cuerpo', labelEn: 'Simple Melee' },
  { id: 'simple-ranged', labelEs: 'Simple a Distancia', labelEn: 'Simple Ranged' },
  { id: 'martial-melee', labelEs: 'Marcial Cuerpo a Cuerpo', labelEn: 'Martial Melee' },
  { id: 'martial-ranged', labelEs: 'Marcial a Distancia', labelEn: 'Martial Ranged' },
];

const ARMOR_CATEGORIES: { id: ArmorCategory; labelEs: string; labelEn: string }[] = [
  { id: 'light', labelEs: 'Armadura Ligera', labelEn: 'Light Armor' },
  { id: 'medium', labelEs: 'Armadura Media', labelEn: 'Medium Armor' },
  { id: 'heavy', labelEs: 'Armadura Pesada', labelEn: 'Heavy Armor' },
  { id: 'shield', labelEs: 'Escudo (+2 CA)', labelEn: 'Shield (+2 AC)' },
];

const DAMAGE_TYPES = [
  { es: 'Cortante', en: 'Slashing' },
  { es: 'Perforante', en: 'Piercing' },
  { es: 'Contundente', en: 'Bludgeoning' },
  { es: 'Fuego', en: 'Fire' },
  { es: 'Frío', en: 'Cold' },
  { es: 'Relámpago', en: 'Lightning' },
  { es: 'Trueno', en: 'Thunder' },
  { es: 'Radiante', en: 'Radiant' },
  { es: 'Necrótico', en: 'Necrotic' },
  { es: 'Fuerza', en: 'Force' },
  { es: 'Veneno', en: 'Poison' },
  { es: 'Ácido', en: 'Acid' },
  { es: 'Psíquico', en: 'Psychic' },
];

const DAMAGE_DICE_OPTIONS = ['1d4', '1d6', '1d8', '1d10', '1d12', '2d6', '2d8', '3d6', '1d20', 'Personalizado'];

const COMMON_PROPERTIES = [
  { id: 'Sutil (Finesse)', labelEs: 'Sutil (Finesse)', labelEn: 'Finesse', descEs: 'Permite elegir FUE o DES para ataque y daño.', descEn: 'Allows choosing STR or DEX for attack and damage rolls.' },
  { id: 'Ligera (Light)', labelEs: 'Ligera (Light)', labelEn: 'Light', descEs: 'Ideal para blandir dos armas a la vez.', descEn: 'Ideal for two-weapon fighting.' },
  { id: 'Versátil', labelEs: 'Versátil (Versatile)', labelEn: 'Versatile', descEs: 'Puede usarse con 1 o 2 manos para más daño.', descEn: 'Can be used with 1 or 2 hands for higher damage.' },
  { id: 'Pesada (Heavy)', labelEs: 'Pesada (Heavy)', labelEn: 'Heavy', descEs: 'Criaturas pequeñas tienen desventaja al usarla.', descEn: 'Small creatures have disadvantage on attack rolls.' },
  { id: 'Dos Manos (Two-Handed)', labelEs: 'Dos Manos (Two-Handed)', labelEn: 'Two-Handed', descEs: 'Requiere ambas manos para atacar.', descEn: 'Requires two hands to make an attack.' },
  { id: 'Alcance (Reach)', labelEs: 'Alcance (Reach)', labelEn: 'Reach', descEs: 'Agrega +5 pies al rango de ataque.', descEn: 'Adds 5 feet to your attack reach.' },
  { id: 'Arrojadiza (Thrown)', labelEs: 'Arrojadiza (Thrown)', labelEn: 'Thrown', descEs: 'Puede lanzarse para ataque a distancia.', descEn: 'Can be thrown to make a ranged attack.' },
  { id: 'Munición (Ammunition)', labelEs: 'Munición (Ammunition)', labelEn: 'Ammunition', descEs: 'Requiere proyectiles para disparar.', descEn: 'Requires ammunition to make a ranged attack.' },
  { id: 'Recarga (Loading)', labelEs: 'Recarga (Loading)', labelEn: 'Loading', descEs: 'Solo un ataque por acción sin dotes especiales.', descEn: 'Only one piece of ammunition can be fired per action/bonus/reaction.' },
  { id: 'Mágica +1', labelEs: 'Mágica (+1)', labelEn: 'Magic (+1)', descEs: 'Otorga +1 a tiradas de ataque y daño.', descEn: 'Grants +1 bonus to attack and damage rolls.' },
  { id: 'Mágica +2', labelEs: 'Mágica (+2)', labelEn: 'Magic (+2)', descEs: 'Otorga +2 a tiradas de ataque y daño.', descEn: 'Grants +2 bonus to attack and damage rolls.' },
  { id: 'Mágica +3', labelEs: 'Mágica (+3)', labelEn: 'Magic (+3)', descEs: 'Otorga +3 a tiradas de ataque y daño.', descEn: 'Grants +3 bonus to attack and damage rolls.' },
];

export const EquipmentBuilderModal: React.FC<EquipmentBuilderModalProps> = ({
  isOpen,
  onClose,
  initialWeapon,
  initialArmor,
  onSaveWeapon,
  onSaveArmor,
}) => {
  const { isSpanish, t } = useLanguageStore();
  if (!isOpen) return null;

  const [mode, setMode] = useState<'weapon' | 'armor'>(initialArmor ? 'armor' : 'weapon');

  // Weapon form state
  const [wName, setWName] = useState(initialWeapon?.name || '');
  const [wNameEn, setWNameEn] = useState(initialWeapon?.nameEn || '');
  const [wCategory, setWCategory] = useState<WeaponCategory>(initialWeapon?.category || 'martial-melee');
  const [wDamageDice, setWDamageDice] = useState(initialWeapon?.damageDice || '1d8');
  const [wCustomDice, setWCustomDice] = useState('');
  const [wDamageType, setWDamageType] = useState<any>(initialWeapon?.damageType || 'Cortante');
  const [wRange, setWRange] = useState(initialWeapon?.range || (isSpanish ? 'Alcance 5 pies' : 'Range 5 ft.'));
  const [wWeight, setWWeight] = useState(initialWeapon?.weight || '3 lb.');
  const [wCost, setWCost] = useState(initialWeapon?.cost || (isSpanish ? '15 po' : '15 gp'));
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
  const [aCost, setACost] = useState(initialArmor?.cost || (isSpanish ? '50 po' : '50 gp'));
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
        setErrorMsg(isSpanish ? 'El nombre del arma es obligatorio.' : 'Weapon name is required.');
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
        range: wRange.trim() || (isSpanish ? 'Alcance 5 pies' : 'Range 5 ft.'),
        weight: wWeight.trim() || '3 lb.',
        cost: wCost.trim() || (isSpanish ? '10 po' : '10 gp'),
        properties: wProperties,
        description: wDescription.trim() || (isSpanish ? 'Arma forjada artesanalmente.' : 'Handcrafted weapon.'),
      };

      onSaveWeapon(newWeapon);
      onClose();
    } else {
      if (!aName.trim()) {
        setErrorMsg(isSpanish ? 'El nombre de la armadura o escudo es obligatorio.' : 'Armor or shield name is required.');
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
        cost: aCost.trim() || (isSpanish ? '20 po' : '20 gp'),
        description: aDescription.trim() || (isSpanish ? 'Armadura forjada artesanalmente.' : 'Handcrafted armor.'),
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
                {mode === 'weapon'
                  ? (isSpanish ? 'Forja de Armas Personalizadas' : 'Custom Weapon Forge')
                  : (isSpanish ? 'Taller de Armaduras & Escudos' : 'Armor & Shield Workshop')}
                <span className="text-xs px-2 py-0.5 rounded bg-[#4a1f10] text-[#ffbe76] border border-[#7a391f] font-mono uppercase">
                  Homebrew 5e
                </span>
              </h2>
              <p className="text-xs text-[#a89279]">
                {isSpanish
                  ? 'Crea equipo con estadísticas oficiales, dados de daño, propiedades tácticas y efectos mágicos.'
                  : 'Create custom equipment with official stats, damage dice, tactical properties, and magical effects.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[#26150b] hover:bg-[#3d2011] border border-[#523924] hover:border-[#dfbe7e] flex items-center justify-center text-[#dfbe7e] transition cursor-pointer"
            title={isSpanish ? "Cerrar forja" : "Close forge"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (Arma vs Armadura) */}
        <div className="flex border-b border-[#382414] bg-[#1a110a] px-6 shrink-0">
          <button
            type="button"
            onClick={() => setMode('weapon')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase transition border-b-2 cursor-pointer ${
              mode === 'weapon'
                ? 'border-[#ffd56b] text-[#ffd56b] bg-[#291a0e]/60 shadow-[inset_0_-2px_6px_rgba(255,213,107,0.2)]'
                : 'border-transparent text-[#a89279] hover:text-[#e4cfb2]'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>{isSpanish ? 'Crear Arma' : 'Create Weapon'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('armor')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase transition border-b-2 cursor-pointer ${
              mode === 'armor'
                ? 'border-[#ffd56b] text-[#ffd56b] bg-[#291a0e]/60 shadow-[inset_0_-2px_6px_rgba(255,213,107,0.2)]'
                : 'border-transparent text-[#a89279] hover:text-[#e4cfb2]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{isSpanish ? 'Crear Armadura o Escudo' : 'Create Armor or Shield'}</span>
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
                    {isSpanish ? 'Nombre del Arma *' : 'Weapon Name *'}
                  </label>
                  <input
                    type="text"
                    value={wName}
                    onChange={(e) => setWName(e.target.value)}
                    placeholder={isSpanish ? "Ej. Espada Larga de Fuegosangre, Lanza Dracónica..." : "E.g. Bloodfire Longsword, Draconic Spear..."}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Categoría de 5e *' : '5e Category *'}
                  </label>
                  <select
                    value={wCategory}
                    onChange={(e) => setWCategory(e.target.value as WeaponCategory)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none cursor-pointer"
                  >
                    {WEAPON_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#1c1209]">
                        {isSpanish ? c.labelEs : c.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Damage, Damage Type, Range, Weight, Cost */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Dado Daño *' : 'Damage Die *'}
                  </label>
                  <select
                    value={wDamageDice}
                    onChange={(e) => setWDamageDice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono font-bold text-sm focus:outline-none cursor-pointer"
                  >
                    {DAMAGE_DICE_OPTIONS.map((d) => (
                      <option key={d} value={d} className="bg-[#1c1209]">
                        {d === 'Personalizado' ? (isSpanish ? 'Personalizado' : 'Custom') : d}
                      </option>
                    ))}
                  </select>
                  {wDamageDice === 'Personalizado' && (
                    <input
                      type="text"
                      placeholder={isSpanish ? "Ej. 2d10" : "E.g. 2d10"}
                      value={wCustomDice}
                      onChange={(e) => setWCustomDice(e.target.value)}
                      className="w-full mt-1 px-2.5 py-1 text-xs rounded bg-[#110b07] border border-[#ffd56b] text-[#ffd56b] font-mono"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Tipo de Daño *' : 'Damage Type *'}
                  </label>
                  <select
                    value={wDamageType}
                    onChange={(e) => setWDamageType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none cursor-pointer"
                  >
                    {DAMAGE_TYPES.map((t) => (
                      <option key={t.es} value={t.es} className="bg-[#1c1209]">
                        {isSpanish ? t.es : t.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Alcance' : 'Range'}
                  </label>
                  <input
                    type="text"
                    value={wRange}
                    onChange={(e) => setWRange(e.target.value)}
                    placeholder={isSpanish ? "Ej. 5 pies, 20/60" : "E.g. 5 ft., 20/60"}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Peso' : 'Weight'}
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
                    {isSpanish ? 'Precio / Costo' : 'Price / Cost'}
                  </label>
                  <input
                    type="text"
                    value={wCost}
                    onChange={(e) => setWCost(e.target.value)}
                    placeholder={isSpanish ? "Ej. 25 po" : "E.g. 25 gp"}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Properties Checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e] flex items-center justify-between">
                  <span>{isSpanish ? 'Propiedades Oficiales de 5e & Etiquetas' : 'Official 5e Properties & Tags'}</span>
                  <span className="text-[11px] text-[#a89279] font-normal lowercase">
                    {wProperties.length} {isSpanish ? 'seleccionadas' : 'selected'}
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
                        className={`text-left p-2.5 rounded-lg border text-xs transition flex flex-col justify-between cursor-pointer ${
                          selected
                            ? 'bg-[#3b2311] border-[#ffd56b] text-[#fff4d1] shadow-[0_2px_8px_rgba(255,213,107,0.15)]'
                            : 'bg-[#18100a] border-[#382414] text-[#b39e87] hover:border-[#6b4728]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-bold">{isSpanish ? prop.labelEs : prop.labelEn}</span>
                          {selected && <Check className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />}
                        </div>
                        <span className="text-[10px] text-[#8c745d] line-clamp-2 leading-tight">
                          {isSpanish ? prop.descEs : prop.descEn}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Versatile Damage Selector if Versatile is selected */}
                {isPropSelected('Versátil') && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#24170d] border border-[#6b4825] mt-2">
                    <span className="text-xs text-[#ffd56b] font-bold">
                      {isSpanish ? 'Daño Versátil a Dos Manos:' : 'Two-Handed Versatile Damage:'}
                    </span>
                    <select
                      value={wVersatileDice}
                      onChange={(e) => {
                        const newDice = e.target.value;
                        setWVersatileDice(newDice);
                        setWProperties((prev) =>
                          prev.map((p) => (p.startsWith('Versátil') ? `Versátil (${newDice})` : p))
                        );
                      }}
                      className="px-2.5 py-1 text-xs rounded bg-[#110b07] border border-[#8a5d2e] text-[#ffd56b] font-mono font-bold cursor-pointer"
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
                  {isSpanish ? 'Descripción, Leyenda & Propiedades Mágicas Especiales' : 'Description, Lore & Special Magical Properties'}
                </label>
                <textarea
                  rows={4}
                  value={wDescription}
                  onChange={(e) => setWDescription(e.target.value)}
                  placeholder={
                    isSpanish
                      ? "Describe la forja, el material (acero enano, mitral, obsidiana), o cualquier habilidad mágica (ej. 'Al impactar inflige 1d6 extra de fuego. Una vez por día permite conjurar Luz')..."
                      : "Describe the forge, materials (dwarven steel, mithral, obsidian), or any magical traits (e.g. 'On a hit deals an extra 1d6 fire damage. Once per day allows casting Light')..."
                  }
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
                    {isSpanish ? 'Nombre de la Armadura o Escudo *' : 'Armor or Shield Name *'}
                  </label>
                  <input
                    type="text"
                    value={aName}
                    onChange={(e) => setAName(e.target.value)}
                    placeholder={isSpanish ? "Ej. Cota de Mallas Reforzada, Escudo del Roble Guardián..." : "E.g. Reinforced Chain Mail, Guardian Oak Shield..."}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Tipo de Protección *' : 'Protection Type *'}
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
                    className="w-full px-3 py-2.5 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none cursor-pointer"
                  >
                    {ARMOR_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#1c1209]">
                        {isSpanish ? c.labelEs : c.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: AC, Dex Bonus rule, Str requirement */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {aCategory === 'shield' ? (isSpanish ? 'Bonificador CA' : 'AC Bonus') : (isSpanish ? 'CA Base *' : 'Base AC *')}
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
                    {aCategory === 'shield'
                      ? (isSpanish ? '+2 CA estándar' : '+2 standard AC')
                      : (isSpanish ? 'Valor base de CA' : 'Base AC value')}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Bono de Destreza' : 'Dexterity Bonus'}
                  </label>
                  <select
                    value={aDexBonus}
                    disabled={aCategory === 'shield'}
                    onChange={(e) => setADexBonus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none disabled:opacity-50 cursor-pointer"
                  >
                    <option value="full" className="bg-[#1c1209]">
                      {isSpanish ? 'Completo (+ Mod DES)' : 'Full (+ DEX Mod)'}
                    </option>
                    <option value="max2" className="bg-[#1c1209]">
                      {isSpanish ? 'Limitado (+ DES máx 2)' : 'Capped (+ DEX max 2)'}
                    </option>
                    <option value="none" className="bg-[#1c1209]">
                      {isSpanish ? 'Ninguno (Sin bono)' : 'None (No bonus)'}
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Fuerza Mínima (FUE)' : 'Minimum Strength (STR)'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={aStrengthReq}
                    onChange={(e) => setAStrengthReq(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#f7ecd8] text-sm focus:outline-none"
                  />
                  <p className="text-[10px] text-[#8c745d]">
                    {isSpanish ? '0 = Sin requisito' : '0 = No requirement'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Desventaja Sigilo' : 'Stealth Disadvantage'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setAStealthDisadvantage(!aStealthDisadvantage)}
                    className={`w-full py-2 px-3 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      aStealthDisadvantage
                        ? 'bg-red-950/70 border-red-700 text-red-200'
                        : 'bg-[#18100a] border-[#382414] text-[#a89279]'
                    }`}
                  >
                    {aStealthDisadvantage ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span>{isSpanish ? 'Sí (Desventaja)' : 'Yes (Disadvantage)'}</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isSpanish ? 'No (Silenciosa)' : 'No (Quiet)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Row 3: Weight and Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                    {isSpanish ? 'Peso' : 'Weight'}
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
                    {isSpanish ? 'Precio / Costo' : 'Price / Cost'}
                  </label>
                  <input
                    type="text"
                    value={aCost}
                    onChange={(e) => setACost(e.target.value)}
                    placeholder={isSpanish ? "Ej. 75 po" : "E.g. 75 gp"}
                    className="w-full px-3 py-2 rounded-lg bg-[#110b07] border border-[#523924] text-[#ffd56b] font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
                  {isSpanish ? 'Descripción, Material & Efectos Especiales' : 'Description, Material & Special Effects'}
                </label>
                <textarea
                  rows={4}
                  value={aDescription}
                  onChange={(e) => setADescription(e.target.value)}
                  placeholder={
                    isSpanish
                      ? "Detalla si es de escamas de dragón, mitral (sin desventaja en sigilo), adamandina (inmune a críticos) o si otorga resistencias a daños..."
                      : "Details on materials (dragon scales, mithral, adamantine) or special properties (damage resistance, critical immunity)..."
                  }
                  className="w-full p-3 rounded-lg bg-[#110b07] border border-[#523924] focus:border-[#ffd56b] text-[#f7ecd8] text-sm focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl border border-[#523924] bg-[#110b07] shadow-inner space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#a89279] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd56b]" />
              {isSpanish ? 'Vista Previa en el Compendio' : 'Compendium Live Preview'}
            </span>

            {mode === 'weapon' ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#1a110a] border border-[#3d2614]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#ffd56b] text-base">{wName || (isSpanish ? 'Arma sin nombre' : 'Unnamed Weapon')}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#452712] text-[#ffcf70] border border-[#6b421f] font-mono">
                      {isSpanish ? WEAPON_CATEGORIES.find((c) => c.id === wCategory)?.labelEs : WEAPON_CATEGORIES.find((c) => c.id === wCategory)?.labelEn}
                    </span>
                  </div>
                  <div className="text-xs text-[#d8c5ad] mt-0.5 flex flex-wrap gap-2">
                    <span className="text-red-400 font-mono font-bold">
                      {wDamageDice === 'Personalizado' ? (wCustomDice || '1d8') : wDamageDice} {isSpanish ? wDamageType : (DAMAGE_TYPES.find((t) => t.es === wDamageType)?.en || wDamageType)}
                    </span>
                    <span>•</span>
                    <span>{wRange || (isSpanish ? '5 pies' : '5 ft.')}</span>
                    <span>•</span>
                    <span>{wWeight || '3 lb.'}</span>
                    <span>•</span>
                    <span className="text-amber-300">{wCost || (isSpanish ? '10 po' : '10 gp')}</span>
                  </div>
                  {wProperties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {wProperties.map((p) => {
                        const matchedProp = COMMON_PROPERTIES.find((cp) => cp.id === p || p.startsWith(cp.labelEs));
                        const displayProp = isSpanish ? p : (matchedProp?.labelEn || p.replace('Versátil', 'Versatile'));
                        return (
                          <span key={p} className="text-[10px] px-1.5 py-0.2 rounded bg-[#2a1a0e] text-[#dfbe7e] border border-[#4d321d]">
                            {displayProp}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#1a110a] border border-[#3d2614]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#ffd56b] text-base">{aName || (isSpanish ? 'Armadura sin nombre' : 'Unnamed Armor')}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2b1f47] text-[#cbb6f7] border border-[#483770] font-mono uppercase">
                      {isSpanish ? ARMOR_CATEGORIES.find((c) => c.id === aCategory)?.labelEs : ARMOR_CATEGORIES.find((c) => c.id === aCategory)?.labelEn}
                    </span>
                  </div>
                  <div className="text-xs text-[#d8c5ad] mt-0.5 flex flex-wrap gap-2">
                    <span className="text-emerald-400 font-mono font-bold">
                      {aCategory === 'shield'
                        ? (isSpanish ? `+${aBaseAc} CA` : `+${aBaseAc} AC`)
                        : (isSpanish ? `${aBaseAc} CA Base` : `${aBaseAc} Base AC`)}
                    </span>
                    <span>•</span>
                    <span>{isSpanish ? `Bono DES: ${aCategory === 'shield' ? 'N/A' : aDexBonus}` : `DEX Bonus: ${aCategory === 'shield' ? 'N/A' : aDexBonus}`}</span>
                    <span>•</span>
                    <span>{isSpanish ? `FUE: ${aStrengthReq ? `Mín ${aStrengthReq}` : 'Sin requisito'}` : `STR: ${aStrengthReq ? `Min ${aStrengthReq}` : 'No req'}`}</span>
                    <span>•</span>
                    <span className="text-amber-300">{aCost || (isSpanish ? '20 po' : '20 gp')}</span>
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
              className="px-5 py-2.5 rounded-lg border border-[#523924] hover:bg-[#26170d] text-[#c9b49b] text-sm font-semibold transition cursor-pointer"
            >
              {isSpanish ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#b88c32] via-[#dfbe7e] to-[#b88c32] hover:brightness-110 text-[#1a1006] text-sm font-bold tracking-wide uppercase shadow-[0_4px_15px_rgba(223,190,126,0.35)] transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#1a1006]" />
              <span>{isSpanish ? 'Guardar en el Compendio' : 'Save to Compendium'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
