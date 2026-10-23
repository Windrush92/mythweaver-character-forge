import React, { useState } from 'react';
import { Character, AbilityScores } from '../types';
import { ArmorDef } from '../data/weaponsAndArmorData';
import { getBarbarianRageDamageBonus, getBarbarianMaxRages, SpeedCalculationResult } from '../data/characterRulesEngine';
import {
  Shield,
  Zap,
  Activity,
  Award,
  BookOpen,
  X,
  Flame,
  Info,
  Check,
  AlertCircle,
  HelpCircle,
  Target,
  Search,
} from 'lucide-react';
import { ALL_5E_SKILLS } from '../data/characterCreatorData';

export type RuleCategory = 'ac' | 'init' | 'speed' | 'prof' | 'saves' | 'skills' | 'rage';

interface RulesInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  currentAc: number;
  equippedArmor: ArmorDef | null;
  hasEquippedShield: boolean;
  effectiveSpeed: SpeedCalculationResult;
  profBonus: number;
  initialCategory?: RuleCategory;
}

export const RulesInspectorModal: React.FC<RulesInspectorModalProps> = ({
  isOpen,
  onClose,
  character,
  currentAc,
  equippedArmor,
  hasEquippedShield,
  effectiveSpeed,
  profBonus,
  initialCategory = 'ac',
}) => {
  const [activeCategory, setActiveCategory] = useState<RuleCategory>(initialCategory);

  // Sync initial category when modal opens
  React.useEffect(() => {
    if (isOpen && initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  // Handle ESC key to dismiss rules inspector
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const strMod = Math.floor(((character.stats.str || 10) - 10) / 2);
  const dexMod = Math.floor(((character.stats.dex || 10) - 10) / 2);
  const conMod = Math.floor(((character.stats.con || 10) - 10) / 2);
  const intMod = Math.floor(((character.stats.int || 10) - 10) / 2);
  const wisMod = Math.floor(((character.stats.wis || 10) - 10) / 2);
  const chaMod = Math.floor(((character.stats.cha || 10) - 10) / 2);

  const formatMod = (m: number) => (m >= 0 ? `+${m}` : `${m}`);

  const classLower = (character.class || '').toLowerCase();
  const isBarbarian = classLower.includes('barb') || classLower.includes('bárbaro');
  const isMonk = classLower.includes('monk') || classLower.includes('monje');

  const barbarianLevel = character.level || 1;
  const rageDmg = getBarbarianRageDamageBonus(barbarianLevel);
  const maxRages = getBarbarianMaxRages(barbarianLevel);

  // AC Breakdown calculation
  let acFormulaTitle = 'Sin Armadura Estándar';
  let acBaseVal = 10;
  let acDexApplied = dexMod;
  let acOtherText = '';

  if (equippedArmor) {
    acFormulaTitle = equippedArmor.name.split('(')[0].trim();
    acBaseVal = equippedArmor.baseAc;
    if (equippedArmor.category === 'heavy') {
      acDexApplied = 0;
      acOtherText = 'Armadura Pesada: No suma modificador de Destreza.';
    } else if (equippedArmor.category === 'medium') {
      acDexApplied = Math.min(2, Math.max(0, dexMod));
      acOtherText = 'Armadura Media: Suma Destreza hasta un máximo de +2.';
    } else {
      acDexApplied = dexMod;
      acOtherText = 'Armadura Ligera: Suma el modificador completo de Destreza.';
    }
  } else if (isBarbarian) {
    acFormulaTitle = 'Defensa Sin Armadura (Bárbaro)';
    acBaseVal = 10;
    acDexApplied = dexMod;
    acOtherText = `Suma Constitución (+${conMod}) además de Destreza (+${dexMod}). Puedes llevar escudo.`;
  } else if (isMonk) {
    acFormulaTitle = 'Defensa Sin Armadura (Monje)';
    acBaseVal = 10;
    acDexApplied = dexMod;
    acOtherText = `Suma Sabiduría (+${wisMod}) además de Destreza (+${dexMod}). No permite escudo.`;
  }

  // Jump calculations
  const longJumpWithRun = character.stats.str || 10;
  const longJumpStanding = Math.floor(longJumpWithRun / 2);
  const highJumpWithRun = Math.max(0, 3 + strMod);
  const highJumpStanding = Math.max(0, Math.floor(highJumpWithRun / 2));

  // Saving throw proficiencies
  const savingProficiencies = character.savingThrows || [];

  const categories: { id: RuleCategory; label: string; icon: any; badge?: string }[] = [
    { id: 'ac', label: 'Armadura (CA)', icon: Shield, badge: `${currentAc} CA` },
    { id: 'init', label: 'Iniciativa', icon: Zap, badge: formatMod(character.initiativeBonus) },
    { id: 'speed', label: 'Velocidad & Saltos', icon: Activity, badge: effectiveSpeed.speedStr },
    { id: 'prof', label: 'Competencia', icon: Award, badge: `+${profBonus}` },
    { id: 'saves', label: 'Salvaciones', icon: BookOpen },
    { id: 'skills', label: 'Habilidades', icon: Target, badge: `${(character.skills || []).length} Comp.` },
    ...(isBarbarian ? [{ id: 'rage' as RuleCategory, label: 'Furia & Combate', icon: Flame, badge: `+${rageDmg}` }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fcf9f2] border-2 border-[#8c672b] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        {/* Header */}
        <div className="bg-[#ebdcc4] border-b border-[#d8c8af] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#8c672b] text-white rounded-lg shadow-xs">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-fantasy font-bold text-base text-[#382b20] uppercase tracking-wide">
                Auditoría y Desglose de Reglas Oficiales
              </h2>
              <p className="text-[11px] text-[#6b5844]">
                Fórmulas exactas, reglas aplicadas y mecánicas de combate de {character.name} (Nivel {character.level} {character.class})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6b5844] hover:text-[#2c221a] hover:bg-[#dfcfb4] rounded-lg transition cursor-pointer"
            title="Cerrar inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout: Categories Navbar + Body */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden min-h-0">
          {/* Categories Sidebar */}
          <div className="sm:w-56 bg-[#f5ede0] border-b sm:border-b-0 sm:border-r border-[#d8c8af] p-2 sm:p-3 overflow-x-auto sm:overflow-y-auto flex sm:flex-col gap-1.5 shrink-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-fantasy font-bold transition cursor-pointer whitespace-nowrap sm:whitespace-normal text-left ${
                    isActive
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-[#ede1ce]/60 text-[#4a361c] hover:bg-[#ebdcc4]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{cat.label}</span>
                  </div>
                  {cat.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ml-1.5 ${
                        isActive ? 'bg-[#5c401b] text-white' : 'bg-[#dfcfb9] text-[#4a361c]'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Details Panel */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#382b20]">
            {/* 1. ARMADURA (CA) */}
            {activeCategory === 'ac' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#244769]" />
                    <h3 className="font-fantasy font-bold text-base text-[#1e3a57]">
                      Clase de Armadura (CA): {currentAc}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#e3ecf5] text-[#1e3a57] px-2.5 py-0.5 rounded-full border border-[#b8cde3] font-mono font-bold">
                    CA Total: {currentAc}
                  </span>
                </div>

                {/* Calculation breakdown */}
                <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-2">
                  <h4 className="font-fantasy font-bold text-xs text-[#5c401b] uppercase tracking-wide">
                    Fórmula de Cálculo Activa: {acFormulaTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex justify-between">
                      <span className="text-[#6b5844]">Armadura Base:</span>
                      <strong className="font-mono">{acBaseVal} CA</strong>
                    </div>
                    <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex justify-between">
                      <span className="text-[#6b5844]">Bono de Destreza:</span>
                      <strong className="font-mono">+{acDexApplied}</strong>
                    </div>
                    <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex justify-between">
                      <span className="text-[#6b5844]">Escudo Equipado:</span>
                      <strong className="font-mono">{hasEquippedShield ? '+2 CA (Activo)' : 'No (+0)'}</strong>
                    </div>
                    {isBarbarian && !equippedArmor && (
                      <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex justify-between">
                        <span className="text-[#6b5844]">Defensa Sin Armadura (CON):</span>
                        <strong className="font-mono">+{conMod} (Constitución)</strong>
                      </div>
                    )}
                  </div>

                  {acOtherText && (
                    <p className="text-[11px] text-[#786450] italic bg-[#ede1ce] p-2 rounded-lg">
                      💡 {acOtherText}
                    </p>
                  )}
                </div>

                {/* Official Rules Reference */}
                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-3.5 h-3.5" /> Reglas Oficiales de Armadura y CA (PHB pág. 144)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-[#5e4e3e]">
                    <li><strong>Armaduras Ligeras:</strong> Permiten sumar tu modificador completo de Destreza sin límite.</li>
                    <li><strong>Armaduras Medias:</strong> Ofrecen mejor protección base pero limitan la bonificación de Destreza a un máximo de +2.</li>
                    <li><strong>Armaduras Pesadas:</strong> Otorgan una CA fija muy alta y no suman Destreza. Si tu Fuerza es menor a la requerida, tu velocidad se reduce en 10 pies.</li>
                    <li><strong>Escudos:</strong> Otorgan un bono de +2 a la CA mientras se empuñe con una mano libre. Solo puedes beneficiarte de un escudo a la vez.</li>
                    <li><strong>Defensas Sin Armadura:</strong> Las características de clase que otorgan una fórmula especial de CA (como Bárbaro o Monje) no se acumulan entre sí. Debes elegir una única forma de calcular tu CA.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. INICIATIVA */}
            {activeCategory === 'init' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#5c3a70]" />
                    <h3 className="font-fantasy font-bold text-base text-[#492e59]">
                      Iniciativa: {formatMod(character.initiativeBonus)}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#f2e6f7] text-[#492e59] px-2.5 py-0.5 rounded-full border border-[#dcbee6] font-mono font-bold">
                    1d20 {formatMod(character.initiativeBonus)}
                  </span>
                </div>

                <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-2">
                  <h4 className="font-fantasy font-bold text-xs text-[#5c401b] uppercase tracking-wide">
                    Desglose del Bonificador de Iniciativa
                  </h4>
                  <div className="p-2.5 bg-white/80 rounded-lg border border-[#e0d3bf] flex items-center justify-between text-xs">
                    <span className="text-[#6b5844]">Modificador de Destreza ({character.stats.dex} DES):</span>
                    <strong className="font-mono text-sm text-[#492e59]">{formatMod(dexMod)}</strong>
                  </div>
                  {character.initiativeBonus !== dexMod && (
                    <div className="p-2.5 bg-white/80 rounded-lg border border-[#e0d3bf] flex items-center justify-between text-xs">
                      <span className="text-[#6b5844]">Bonificador adicional (Dotes / Rasgos):</span>
                      <strong className="font-mono text-sm text-[#492e59]">{formatMod(character.initiativeBonus - dexMod)}</strong>
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-3.5 h-3.5" /> Reglas Oficiales de Iniciativa (PHB pág. 189)
                  </h4>
                  <p className="text-[11px] leading-relaxed text-[#5e4e3e]">
                    La iniciativa determina el orden de turnos en combate. Al comienzo del encuentro, cada combatiente realiza una prueba de Destreza (tirando un d20 y sumando su bonificador de Iniciativa). Los combatientes actúan por orden descendente de resultado. En caso de empate, el DM decide el orden entre monstruos y jugadores, o los jugadores empatados eligen su orden entre ellos.
                  </p>
                </div>
              </div>
            )}

            {/* 3. VELOCIDAD & SALTOS */}
            {activeCategory === 'speed' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#2f5e38]" />
                    <h3 className="font-fantasy font-bold text-base text-[#244d2d]">
                      Velocidad Táctica: {effectiveSpeed.speedStr}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#e6f4ea] text-[#1e562c] px-2.5 py-0.5 rounded-full border border-[#bfe3c9] font-mono font-bold">
                    {effectiveSpeed.speedFeet} pies por asalto
                  </span>
                </div>

                {/* Speed breakdown */}
                <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-2">
                  <h4 className="font-fantasy font-bold text-xs text-[#5c401b] uppercase tracking-wide">
                    Desglose de Movimiento Terrestre
                  </h4>
                  <ul className="space-y-1.5">
                    {effectiveSpeed.breakdown.map((item, idx) => (
                      <li key={idx} className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex items-center gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-[#2f5e38] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Jump & Movement Rules */}
                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2.5 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-3.5 h-3.5" /> Reglas Oficiales de Saltos y Terreno (PHB pág. 182)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white/90 rounded-lg border border-[#ded0bc]">
                      <div className="font-fantasy font-bold text-[#6b4c1b]">Salto de Longitud (Fuerza {character.stats.str})</div>
                      <div className="text-[11px] text-[#5e4e3e] mt-1 space-y-0.5">
                        <div>• Con carrera de 10 pies: <strong>{longJumpWithRun} pies</strong></div>
                        <div>• En estático (sin carrera): <strong>{longJumpStanding} pies</strong></div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white/90 rounded-lg border border-[#ded0bc]">
                      <div className="font-fantasy font-bold text-[#6b4c1b]">Salto de Altura (FUE mod {formatMod(strMod)})</div>
                      <div className="text-[11px] text-[#5e4e3e] mt-1 space-y-0.5">
                        <div>• Con carrera de 10 pies: <strong>{highJumpWithRun} pies</strong> (3 + mod FUE)</div>
                        <div>• En estático (sin carrera): <strong>{highJumpStanding} pies</strong></div>
                      </div>
                    </div>
                  </div>

                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#5e4e3e] pt-1">
                    <li><strong>Terreno Difícil:</strong> Moverse a través de escombros, pantanos o nieve cuesta 1 pie adicional por cada pie recorrido (cuesta el doble).</li>
                    <li><strong>Nadar y Escalar:</strong> Cuesta 1 pie adicional por cada pie recorrido a menos que la criatura posea una velocidad de nado o escalada innata.</li>
                    <li><strong>Levantarse de Tumbado:</strong> Cuesta la mitad de tu velocidad de movimiento ({Math.floor(effectiveSpeed.speedFeet / 2)} pies).</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 4. COMPETENCIA */}
            {activeCategory === 'prof' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8c672b]" />
                    <h3 className="font-fantasy font-bold text-base text-[#73521e]">
                      Bonificador de Competencia: +{profBonus}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#fbf2dd] text-[#73521e] px-2.5 py-0.5 rounded-full border border-[#eed7a5] font-mono font-bold">
                    Nivel {character.level}
                  </span>
                </div>

                {/* Table of levels */}
                <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-2.5">
                  <h4 className="font-fantasy font-bold text-xs text-[#5c401b] uppercase tracking-wide">
                    Escala Oficial por Nivel de Personaje (PHB pág. 15)
                  </h4>
                  <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                    <div className={`p-2 rounded-lg border ${character.level <= 4 ? 'bg-[#8c672b] text-white font-bold' : 'bg-white/80 border-[#dfceb9]'}`}>
                      <div className="text-[10px] opacity-80">Nv 1 - 4</div>
                      <div className="font-mono font-bold text-sm">+2</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${character.level >= 5 && character.level <= 8 ? 'bg-[#8c672b] text-white font-bold ring-2 ring-[#8c672b]/50' : 'bg-white/80 border-[#dfceb9]'}`}>
                      <div className="text-[10px] opacity-80">Nv 5 - 8</div>
                      <div className="font-mono font-bold text-sm">+3 ★</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${character.level >= 9 && character.level <= 12 ? 'bg-[#8c672b] text-white font-bold' : 'bg-white/80 border-[#dfceb9]'}`}>
                      <div className="text-[10px] opacity-80">Nv 9 - 12</div>
                      <div className="font-mono font-bold text-sm">+4</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${character.level >= 13 && character.level <= 16 ? 'bg-[#8c672b] text-white font-bold' : 'bg-white/80 border-[#dfceb9]'}`}>
                      <div className="text-[10px] opacity-80">Nv 13 - 16</div>
                      <div className="font-mono font-bold text-sm">+5</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${character.level >= 17 ? 'bg-[#8c672b] text-white font-bold' : 'bg-white/80 border-[#dfceb9]'}`}>
                      <div className="text-[10px] opacity-80">Nv 17 - 20</div>
                      <div className="font-mono font-bold text-sm">+6</div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-3.5 h-3.5" /> ¿Dónde se Aplica el Bono de Competencia?
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-[#5e4e3e]">
                    <li><strong>Tiradas de Ataque:</strong> Se suma a tus tiradas de impacto con armas y conjuros con los que seas competente.</li>
                    <li><strong>Pruebas de Habilidad:</strong> Se suma al modificador de atributo en las 18 habilidades en las que tengas entrenamiento (y se multiplica por 2 con Pericia/Expertise).</li>
                    <li><strong>Tiradas de Salvación:</strong> Se suma a las 2 salvaciones otorgadas por tu clase inicial.</li>
                    <li><strong>Clase de Dificultad (CD) de Conjuros y Rasgos:</strong> Fórmula estándar: <code>8 + Bono de Competencia + Modificador de Característica</code>.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 5. SALVACIONES */}
            {activeCategory === 'saves' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#8c672b]" />
                    <h3 className="font-fantasy font-bold text-base text-[#382b20]">
                      Tiradas de Salvación de {character.name}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#f5ede0] text-[#6b5844] px-2.5 py-0.5 rounded-full border border-[#d8c8af] font-mono">
                    Competencias de {character.class}
                  </span>
                </div>

                {/* Grid of 6 saves */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((st) => {
                    const names: Record<string, string> = { str: 'Fuerza', dex: 'Destreza', con: 'Constitución', int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };
                    const isProf = savingProficiencies.some((s) => s.toLowerCase().includes(st) || s.toLowerCase().includes(names[st].toLowerCase()));
                    const mod = Math.floor(((character.stats[st] || 10) - 10) / 2);
                    const total = mod + (isProf ? profBonus : 0);

                    return (
                      <div key={st} className={`p-2.5 rounded-xl border text-xs ${isProf ? 'bg-[#faecd4] border-[#c59b27] font-bold shadow-2xs' : 'bg-white/80 border-[#d8c8af]'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-fantasy">{names[st]}</span>
                          <span className={`w-2 h-2 rounded-full ${isProf ? 'bg-[#8c672b]' : 'border border-[#9c8975]'}`} />
                        </div>
                        <div className="font-mono text-base font-bold text-[#2c221a] mt-0.5">
                          {formatMod(total)}
                        </div>
                        <div className="text-[10px] text-[#786450] font-mono mt-0.5">
                          Mod {formatMod(mod)} {isProf ? `+ Prof (+${profBonus})` : '+ 0'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-3.5 h-3.5" /> Usos Tácticos de las Salvaciones
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-[#5e4e3e]">
                    <li><strong>Fuerza:</strong> Resistir ser empujado hacia atrás, derribado al suelo o aprisionado por tentáculos.</li>
                    <li><strong>Destreza:</strong> Esquivar ataques de área masivos como Bolas de Fuego o Alientos de Dragón (generalmente reduce el daño a la mitad).</li>
                    <li><strong>Constitución:</strong> Resistir venenos, petrificación, frío intenso o mantener la Concentración de conjuros al recibir daño.</li>
                    <li><strong>Inteligencia:</strong> Descubrir ilusiones o resistir ataques mentales de devoradores de mentes.</li>
                    <li><strong>Sabiduría:</strong> Resistir encantamientos, parálisis, miedo o dominación mental.</li>
                    <li><strong>Carisma:</strong> Resistir ser desterrado a otro plano o posesiones demoníacas.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 6. HABILIDADES (SKILLS) */}
            {activeCategory === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#8c672b]" />
                    <h3 className="font-fantasy font-bold text-base text-[#382b20]">
                      Habilidades Oficiales de {character.name}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#f5ede0] text-[#6b5844] px-2.5 py-0.5 rounded-full border border-[#d8c8af] font-mono">
                    18 Habilidades (PHB Cap. 7)
                  </span>
                </div>

                {/* Passive Perception & Core Rule Banner */}
                {(() => {
                  const isPercProf = (character.skills || []).some((s) => s.toLowerCase() === 'percepción');
                  const hasPercExp = isPercProf && character.notes && character.notes.includes('Pericia: Percepción');
                  const percBonus = wisMod + (hasPercExp ? 2 * profBonus : isPercProf ? profBonus : 0);
                  const passivePerception = 10 + percBonus;

                  return (
                    <div className="p-3 bg-gradient-to-r from-[#faecd4] via-[#f7e6c4] to-[#faecd4] rounded-xl border border-[#c59b27] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👁️</span>
                        <div>
                          <div className="font-fantasy font-bold text-xs text-[#5c401b] uppercase">
                            Percepción Pasiva: <span className="font-mono text-sm text-[#2c1d07]">{passivePerception}</span>
                          </div>
                          <div className="text-[11px] text-[#6b502c]">
                            Fórmula: 10 + Sabiduría ({formatMod(wisMod)}) {isPercProf ? `+ Prof (+${profBonus})` : ''} = {passivePerception}. El DM la usa para detectar emboscadas o trampas sin avisar al jugador.
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] bg-white/70 px-2 py-1 rounded border border-[#dfcfb4] text-[#5c401b] font-medium shrink-0">
                        {isPercProf ? '● Con Competencia' : '○ Sin Competencia'}
                      </div>
                    </div>
                  );
                })()}

                {/* Rules of Skill Checks */}
                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] flex items-center gap-1.5 uppercase">
                    <BookOpen className="w-3.5 h-3.5" /> ¿Cómo Funcionan las Pruebas de Habilidad?
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-[#5e4e3e]">
                    <li><strong>Fórmula Estándar:</strong> <code>1d20 + Modificador de Característica + (Bono de Competencia si estás entrenado)</code>.</li>
                    <li><strong>Pericia (Expertise):</strong> Ciertas clases (Pícaro, Bardo, etc.) duplican el bono de competencia en habilidades elegidas (<code>2 × Bono</code>).</li>
                    <li><strong>Ventaja y Desventaja:</strong> Tira 2 dados d20. Con <em>Ventaja</em> te quedas con el número mayor; con <em>Desventaja</em> con el menor.</li>
                    <li><strong>Pruebas Enfrentadas (Contests):</strong> Cuando dos criaturas compiten directamente (ej. forcejeo: Atletismo atacante vs Atletismo/Acrobacias defensor), gana quien saque el total más alto.</li>
                  </ul>
                </div>

                {/* Skills list with official descriptions */}
                <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                  {ALL_5E_SKILLS.map((sk) => {
                    const statMap: Record<string, number> = {
                      str: strMod,
                      dex: dexMod,
                      con: conMod,
                      int: intMod,
                      wis: wisMod,
                      cha: chaMod,
                    };
                    const statMod = statMap[sk.ability] ?? 0;
                    const isProf = (character.skills || []).some(
                      (s) => s.toLowerCase() === sk.name.toLowerCase()
                    );
                    const hasExp =
                      isProf &&
                      character.notes &&
                      character.notes.includes(`Pericia: ${sk.name}`);
                    const totalBonus = statMod + (hasExp ? 2 * profBonus : isProf ? profBonus : 0);

                    return (
                      <div
                        key={sk.name}
                        className={`p-2.5 rounded-xl border text-xs transition ${
                          hasExp
                            ? 'bg-[#faecd4] border-[#c59b27]'
                            : isProf
                            ? 'bg-[#f5ede0] border-[#d8c8af]'
                            : 'bg-white/80 border-[#e8dccb]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2.5 h-2.5 rounded-full flex items-center justify-center text-[8px] ${
                                hasExp
                                  ? 'bg-[#c59b27] text-white'
                                  : isProf
                                  ? 'bg-[#8c672b] text-white'
                                  : 'border border-[#ad9c88]'
                              }`}
                            >
                              {hasExp ? '★' : isProf ? '●' : ''}
                            </span>
                            <span className="font-fantasy font-bold text-[#2c221a]">
                              {sk.name}
                            </span>
                            <span className="text-[10px] text-[#8c672b] font-mono">
                              ({sk.abilityLabel})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#786450] font-mono">
                              {formatMod(statMod)} {hasExp ? `+ Exp (+${2 * profBonus})` : isProf ? `+ Prof (+${profBonus})` : ''}
                            </span>
                            <span className="font-mono font-bold text-xs bg-[#ebdcc4] text-[#3d2a13] px-1.5 py-0.5 rounded border border-[#cbb99f]">
                              {formatMod(totalBonus)}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#6b5844] mt-1 leading-snug">
                          {sk.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. FURIA & COMBATE */}
            {activeCategory === 'rage' && isBarbarian && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc7] pb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#c53d27]" />
                    <h3 className="font-fantasy font-bold text-base text-[#5c1d12]">
                      Furia Primitiva • Nivel {barbarianLevel}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#f8dcd9] text-[#96302b] px-2.5 py-0.5 rounded-full border border-[#e5b3af] font-mono font-bold">
                    +{rageDmg} Daño CaC (FUE)
                  </span>
                </div>

                <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d8c8af] space-y-2.5 text-xs text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#5c401b] uppercase tracking-wide">
                    Beneficios Activos al Entrar en Furia (Acción Adicional)
                  </h4>
                  <div className="space-y-1.5">
                    <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex items-center gap-2">
                      <span className="text-[#c53d27] font-bold">✓ Daño Extra:</span>
                      <span>Suma <strong>+{rageDmg} puntos de daño</strong> a todos tus ataques cuerpo a cuerpo que usen Fuerza.</span>
                    </div>
                    <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex items-center gap-2">
                      <span className="text-[#c53d27] font-bold">✓ Ventaja:</span>
                      <span>Obtienes <strong>Ventaja</strong> en todas las pruebas de Fuerza y tiradas de salvación de Fuerza.</span>
                    </div>
                    <div className="p-2 bg-white/80 rounded-lg border border-[#e0d3bf] flex items-center gap-2">
                      <span className="text-[#c53d27] font-bold">✓ Resistencias:</span>
                      <span>Tienes resistencia a daño <strong>Contundente, Cortante y Perforante</strong> (recibes solo la mitad del daño).</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#faf3e8] rounded-xl border border-[#e2d5c3] space-y-2 text-[#4a361c]">
                  <h4 className="font-fantasy font-bold text-xs text-[#8c672b] uppercase">
                    Ataque Temerario (Reckless Attack - Nivel 2+)
                  </h4>
                  <p className="text-[11px] leading-relaxed text-[#5e4e3e]">
                    Habilidad independiente de la Furia. Al realizar tu primer ataque en tu turno, puedes declarar Ataque Temerario: obtienes <strong>Ventaja en todas tus tiradas de ataque cuerpo a cuerpo con Fuerza</strong> durante ese turno. A cambio, todos los ataques de enemigos contra ti tienen <strong>Ventaja</strong> hasta el inicio de tu próximo turno.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#ebdcc4] border-t border-[#d8c8af] flex items-center justify-between text-xs text-[#6b5844] shrink-0">
          <span>Sistema basado en el compendio oficial de reglas.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#8c672b] hover:bg-[#73521e] text-white font-fantasy font-bold rounded-lg transition cursor-pointer shadow-xs active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
