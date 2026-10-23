import React, { useState, useMemo, useEffect } from 'react';
import { Character, ClassResource } from '../types';
import {
  Moon,
  Coffee,
  Heart,
  Dices,
  RefreshCw,
  Sparkles,
  Zap,
  Check,
  X,
  AlertTriangle,
  Flame,
  Shield,
  HelpCircle,
} from 'lucide-react';

export interface RestResult {
  restType: 'short' | 'long';
  hitDiceSpent: number;
  hpRegained: number;
  newHp: number;
  newUsedHitDice: number;
  rollMethod: 'virtual' | 'manual';
  diceRolls?: number[];
  isFullHeal: boolean;
  openCantripFormulas?: boolean;
}

export interface RestModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  initialRestType?: 'short' | 'long';
  onConfirmRest: (result: RestResult) => void;
}

export function getClassHitDie(className: string): 6 | 8 | 10 | 12 {
  const c = (className || '').toLowerCase();
  if (c.includes('bárbaro') || c.includes('barbarian')) return 12;
  if (
    c.includes('guerrero') ||
    c.includes('fighter') ||
    c.includes('paladín') ||
    c.includes('paladin') ||
    c.includes('explorador') ||
    c.includes('ranger')
  ) {
    return 10;
  }
  if (
    c.includes('mago') ||
    c.includes('wizard') ||
    c.includes('hechicero') ||
    c.includes('sorcerer')
  ) {
    return 6;
  }
  // Bardo, Clérigo, Druida, Monje, Pícaro, Brujo, Artífice
  return 8;
}

export const RestModal: React.FC<RestModalProps> = ({
  isOpen,
  onClose,
  character,
  initialRestType = 'short',
  onConfirmRest,
}) => {
  const [restType, setRestType] = useState<'short' | 'long'>(initialRestType);
  const [rollMethod, setRollMethod] = useState<'virtual' | 'manual'>('virtual');
  const [hitDiceToSpend, setHitDiceToSpend] = useState<number>(1);
  const [virtualRolls, setVirtualRolls] = useState<number[]>([]);
  const [manualRolls, setManualRolls] = useState<number[]>([]);
  const [longRestMode, setLongRestMode] = useState<'full' | 'hit_dice'>('full');
  const [wantsCantripFormulas, setWantsCantripFormulas] = useState<boolean>(false);

  // Sync initial type when opening
  useEffect(() => {
    if (isOpen) {
      setRestType(initialRestType);
      setVirtualRolls([]);
      setManualRolls([]);
      setWantsCantripFormulas(false);
      setLongRestMode('full');
    }
  }, [isOpen, initialRestType]);

  const hitDieSize = useMemo(() => getClassHitDie(character.class), [character.class]);
  const totalHitDice = character.level || 1;
  const usedHitDice = character.usedHitDice || 0;
  const availableHitDice = Math.max(0, totalHitDice - usedHitDice);

  const conMod = useMemo(() => {
    return Math.floor(((character.stats?.con ?? 10) - 10) / 2);
  }, [character.stats?.con]);

  // Adjust hitDiceToSpend if availableHitDice changes
  useEffect(() => {
    if (hitDiceToSpend > availableHitDice) {
      setHitDiceToSpend(Math.max(0, availableHitDice));
    } else if (hitDiceToSpend === 0 && availableHitDice > 0 && restType === 'short') {
      setHitDiceToSpend(1);
    }
  }, [availableHitDice, hitDiceToSpend, restType]);

  // Initialize/adjust manual rolls array length
  useEffect(() => {
    setManualRolls((prev) => {
      const next = [...prev];
      if (next.length < hitDiceToSpend) {
        while (next.length < hitDiceToSpend) next.push(Math.ceil(hitDieSize / 2));
      } else if (next.length > hitDiceToSpend) {
        next.splice(hitDiceToSpend);
      }
      return next;
    });
  }, [hitDiceToSpend, hitDieSize]);

  // Virtual roll execution
  const executeVirtualRoll = () => {
    if (hitDiceToSpend <= 0) return;
    const rolls: number[] = [];
    for (let i = 0; i < hitDiceToSpend; i++) {
      rolls.push(Math.floor(Math.random() * hitDieSize) + 1);
    }
    setVirtualRolls(rolls);
  };

  // Perform virtual rolls on initial select or count change if in virtual mode
  useEffect(() => {
    if (rollMethod === 'virtual' && hitDiceToSpend > 0) {
      executeVirtualRoll();
    } else {
      setVirtualRolls([]);
    }
  }, [hitDiceToSpend, rollMethod, hitDieSize]);

  // Calculate healed HP from hit dice
  const calculatedHitDiceHeal = useMemo(() => {
    if (hitDiceToSpend <= 0) return 0;

    let total = 0;
    if (rollMethod === 'virtual') {
      if (virtualRolls.length === 0) return 0;
      virtualRolls.forEach((die) => {
        total += Math.max(0, die + conMod);
      });
    } else {
      manualRolls.forEach((die) => {
        const val = Number(die) || 0;
        total += Math.max(0, val + conMod);
      });
    }
    return total;
  }, [hitDiceToSpend, rollMethod, virtualRolls, manualRolls, conMod]);

  // Determine effective HP regain based on rest type and settings
  const { hpRegained, finalHp, isFullHeal } = useMemo(() => {
    if (restType === 'long' && longRestMode === 'full') {
      const needed = Math.max(0, character.maxHp - character.currentHp);
      return {
        hpRegained: needed,
        finalHp: character.maxHp,
        isFullHeal: true,
      };
    }

    const healed = calculatedHitDiceHeal;
    const finalCalculated = Math.min(character.maxHp, character.currentHp + healed);
    return {
      hpRegained: healed,
      finalHp: finalCalculated,
      isFullHeal: finalCalculated >= character.maxHp,
    };
  }, [restType, longRestMode, calculatedHitDiceHeal, character.maxHp, character.currentHp]);

  // Hit dice recovery on long rest (half of total, minimum 1)
  const longRestRegainedDice = useMemo(() => {
    return Math.max(1, Math.floor(totalHitDice / 2));
  }, [totalHitDice]);

  const newUsedHitDice = useMemo(() => {
    if (restType === 'short') {
      return Math.min(totalHitDice, usedHitDice + hitDiceToSpend);
    } else {
      // Long rest regains dice, but might spend some if hit_dice mode is active
      const afterRegain = Math.max(0, usedHitDice - longRestRegainedDice);
      if (longRestMode === 'hit_dice') {
        return Math.min(totalHitDice, afterRegain + hitDiceToSpend);
      }
      return afterRegain;
    }
  }, [restType, longRestMode, usedHitDice, totalHitDice, longRestRegainedDice, hitDiceToSpend]);

  // Check Wizard Level 3+ for Cantrip Formulas (Tasha)
  const isWizardLv3 = useMemo(() => {
    const isWiz =
      character.class.toLowerCase().includes('mago') ||
      character.class.toLowerCase().includes('wizard');
    return isWiz && (character.level || 1) >= 3;
  }, [character.class, character.level]);

  // Resources that recharge
  const rechargeableResources = useMemo(() => {
    const list = character.classResources || [];
    if (restType === 'short') {
      return list.filter((r) => r.resetOn === 'short');
    }
    return list;
  }, [character.classResources, restType]);

  const handleConfirm = () => {
    const result: RestResult = {
      restType,
      hitDiceSpent: restType === 'short' || longRestMode === 'hit_dice' ? hitDiceToSpend : 0,
      hpRegained,
      newHp: finalHp,
      newUsedHitDice,
      rollMethod,
      diceRolls: rollMethod === 'virtual' ? virtualRolls : manualRolls,
      isFullHeal,
      openCantripFormulas: restType === 'long' && wantsCantripFormulas,
    };
    onConfirmRest(result);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fade-in font-serif text-[#2c241b]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fbf7ee] border-2 border-[#8c672b] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#140e08] text-[#e8c37d] px-5 py-3.5 border-b-2 border-[#8c672b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#241a12] border border-[#5a4325] shadow-xs">
              {restType === 'long' ? (
                <Moon className="w-5 h-5 text-[#85bbf0]" />
              ) : (
                <Coffee className="w-5 h-5 text-[#e8c37d]" />
              )}
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-base text-[#f5ede0] uppercase tracking-wider">
                {restType === 'long' ? 'Descanso Largo (8 Horas)' : 'Descanso Corto (1 Hora)'}
              </h3>
              <p className="text-[11px] text-[#bda994] font-mono">
                {character.name} • {character.class} Nivel {character.level || 1}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Rest Type Quick Switch */}
            <div className="bg-[#241a12] p-1 rounded-xl border border-[#5a4325] flex items-center gap-1">
              <button
                type="button"
                onClick={() => setRestType('short')}
                className={`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  restType === 'short'
                    ? 'bg-[#8c672b] text-white shadow-xs'
                    : 'text-[#baa892] hover:text-white'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Corto</span>
              </button>
              <button
                type="button"
                onClick={() => setRestType('long')}
                className={`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  restType === 'long'
                    ? 'bg-[#3b5971] text-white shadow-xs'
                    : 'text-[#baa892] hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Largo</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#baa892] hover:text-white hover:bg-[#8c2e28] rounded-lg transition cursor-pointer"
              title="Cerrar ventana de descanso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-[#fbf7ee]">
          {/* Health Status Preview Bar */}
          <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-fantasy">
              <span className="font-bold text-[#4a361c] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                Puntos de Golpe (PG):
              </span>
              <span className="font-mono text-sm font-bold text-[#2c241b]">
                {character.currentHp} →{' '}
                <span className="text-emerald-700 font-extrabold">{finalHp}</span> / {character.maxHp} PG
                {hpRegained > 0 && (
                  <span className="text-xs text-emerald-600 ml-1 font-bold">
                    (+{hpRegained})
                  </span>
                )}
              </span>
            </div>

            {/* Health Bar Graphic */}
            <div className="w-full h-3 bg-[#ebdcc7] rounded-full overflow-hidden border border-[#d6c4aa] relative">
              {/* Previous HP */}
              <div
                className="h-full bg-red-600 absolute left-0 top-0 transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.max(0, (character.currentHp / character.maxHp) * 100))}%`,
                }}
              />
              {/* Healed HP preview */}
              <div
                className="h-full bg-emerald-500 opacity-70 absolute left-0 top-0 transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.max(0, (finalHp / character.maxHp) * 100))}%`,
                }}
              />
            </div>
          </div>

          {/* Special Toggle for Long Rest: Full Recovery vs Hit Dice Mode */}
          {restType === 'long' && (
            <div className="p-3.5 bg-[#eef4f8] rounded-xl border border-[#b8d0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
              <div>
                <span className="font-fantasy font-bold text-[#254761] flex items-center gap-1.5 uppercase tracking-wide">
                  <Moon className="w-4 h-4 text-[#355d7d]" /> Modo de Recuperación de Descanso Largo:
                </span>
                <p className="text-[11px] text-[#486b85] mt-0.5">
                  {longRestMode === 'full'
                    ? 'Regla Oficial D&D 5e: Restaura el 100% de PG, todas las ranuras y la mitad de los dados de golpe.'
                    : 'Regla de Mesa / Opcional: Eliges cuántos dados de golpe tirar para curarte en este descanso largo.'}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setLongRestMode('full')}
                  className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer border ${
                    longRestMode === 'full'
                      ? 'bg-[#355d7d] text-white border-[#254761] shadow-xs'
                      : 'bg-white/80 text-[#355d7d] border-[#b8d0e0] hover:bg-white'
                  }`}
                >
                  Restaura 100% PG
                </button>
                <button
                  type="button"
                  onClick={() => setLongRestMode('hit_dice')}
                  className={`px-3 py-1.5 rounded-lg font-fantasy font-bold text-xs transition cursor-pointer border ${
                    longRestMode === 'hit_dice'
                      ? 'bg-[#8c672b] text-white border-[#6a4f21] shadow-xs'
                      : 'bg-white/80 text-[#7a5a2b] border-[#d8c8af] hover:bg-white'
                  }`}
                >
                  Usar Dados de Golpe
                </button>
              </div>
            </div>
          )}

          {/* Hit Dice Spending Section (Active on Short Rest OR when Long Rest hit_dice mode is picked) */}
          {(restType === 'short' || longRestMode === 'hit_dice') && (
            <div className="p-4 sm:p-5 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-4">
              {/* Header: Available Hit Dice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-3">
                <div>
                  <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide flex items-center gap-2">
                    <Dices className="w-4 h-4 text-[#8c672b]" />
                    Dados de Golpe (d{hitDieSize})
                  </h4>
                  <p className="text-[11px] text-[#7a6448]">
                    Cada dado cura <strong>1d{hitDieSize} + {conMod}</strong> (modificador de CON).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#f4ecd8] border border-[#d8be8a] text-[#7a5a2b] font-mono font-bold px-3 py-1 rounded-lg">
                    {availableHitDice} de {totalHitDice} disponibles
                  </span>
                </div>
              </div>

              {/* Selector: How many dice to spend */}
              <div className="space-y-2">
                <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase">
                  ¿Cuántos Dados de Golpe deseas gastar en este descanso?
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Stepper Controls */}
                  <div className="flex items-center bg-white border border-[#d6c4aa] rounded-xl shadow-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setHitDiceToSpend((prev) => Math.max(0, prev - 1))}
                      disabled={hitDiceToSpend <= 0}
                      className="px-3 py-1.5 bg-[#f7eedf] hover:bg-[#ebdcc4] text-[#4a361c] font-bold text-sm transition cursor-pointer disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="px-4 py-1.5 font-mono font-extrabold text-sm text-[#4a361c] min-w-[2.5rem] text-center">
                      {hitDiceToSpend}
                    </span>
                    <button
                      type="button"
                      onClick={() => setHitDiceToSpend((prev) => Math.min(availableHitDice, prev + 1))}
                      disabled={hitDiceToSpend >= availableHitDice}
                      className="px-3 py-1.5 bg-[#f7eedf] hover:bg-[#ebdcc4] text-[#4a361c] font-bold text-sm transition cursor-pointer disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setHitDiceToSpend(0)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                        hitDiceToSpend === 0
                          ? 'bg-[#8c672b] text-white border-[#6a4f21]'
                          : 'bg-[#faf6ee] text-[#5c4a35] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                      }`}
                    >
                      0 dados (Solo reposar)
                    </button>

                    {availableHitDice >= 1 && (
                      <button
                        type="button"
                        onClick={() => setHitDiceToSpend(1)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                          hitDiceToSpend === 1
                            ? 'bg-[#8c672b] text-white border-[#6a4f21]'
                            : 'bg-[#faf6ee] text-[#5c4a35] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                        }`}
                      >
                        1 dado
                      </button>
                    )}

                    {availableHitDice >= 2 && (
                      <button
                        type="button"
                        onClick={() => setHitDiceToSpend(2)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                          hitDiceToSpend === 2
                            ? 'bg-[#8c672b] text-white border-[#6a4f21]'
                            : 'bg-[#faf6ee] text-[#5c4a35] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                        }`}
                      >
                        2 dados
                      </button>
                    )}

                    {availableHitDice > 2 && (
                      <button
                        type="button"
                        onClick={() => setHitDiceToSpend(availableHitDice)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer border ${
                          hitDiceToSpend === availableHitDice
                            ? 'bg-[#8c672b] text-white border-[#6a4f21]'
                            : 'bg-[#faf6ee] text-[#5c4a35] border-[#d6c4aa] hover:bg-[#ebdcc4]'
                        }`}
                      >
                        Todos ({availableHitDice})
                      </button>
                    )}
                  </div>
                </div>

                {availableHitDice === 0 && (
                  <p className="text-[11px] text-[#9e2d26] font-semibold italic flex items-center gap-1 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> No te quedan dados de golpe disponibles. Toma un descanso largo para recuperar hasta la mitad de tus dados.
                  </p>
                )}
              </div>

              {/* Roll Method Chooser: Virtual vs Manual */}
              {hitDiceToSpend > 0 && (
                <div className="pt-3 border-t border-[#ebdcc7] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-fantasy font-bold text-[#4a361c] uppercase">
                      Método de Tirada de Dados:
                    </label>

                    <div className="flex items-center bg-[#f4ecd8] p-1 rounded-xl border border-[#d8be8a]">
                      <button
                        type="button"
                        onClick={() => setRollMethod('virtual')}
                        className={`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          rollMethod === 'virtual'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'text-[#7a5a2b] hover:text-[#4a361c]'
                        }`}
                      >
                        <Dices className="w-3.5 h-3.5" />
                        <span>🎲 Tirada Virtual</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRollMethod('manual')}
                        className={`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          rollMethod === 'manual'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'text-[#7a5a2b] hover:text-[#4a361c]'
                        }`}
                      >
                        <span>✍️ Tirada Manual en Mesa</span>
                      </button>
                    </div>
                  </div>

                  {/* VIRTUAL ROLL DISPLAY */}
                  {rollMethod === 'virtual' && (
                    <div className="p-3.5 bg-[#faf6ee] rounded-xl border border-[#d6c4aa] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#5c4a35] font-semibold">
                          Tirada de {hitDiceToSpend}d{hitDieSize} + {hitDiceToSpend * conMod} (CON):
                        </span>

                        <button
                          type="button"
                          onClick={executeVirtualRoll}
                          className="px-3 py-1 bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#7a5a2b] hover:text-[#4a361c] border border-[#cbb99f] rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          title="Lanzar los dados virtuales nuevamente"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Volver a Tirar</span>
                        </button>
                      </div>

                      {/* Dice Cards Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {virtualRolls.map((val, idx) => {
                          const dieTotal = Math.max(0, val + conMod);
                          return (
                            <div
                              key={idx}
                              className="p-2.5 bg-white rounded-lg border border-[#d6c4aa] text-center shadow-2xs space-y-1"
                            >
                              <span className="text-[10px] text-[#7a6448] uppercase font-mono block">
                                Dado #{idx + 1}
                              </span>
                              <div className="font-fantasy font-bold text-lg text-[#8c672b]">
                                {val}
                              </div>
                              <div className="text-[10px] text-[#5c4a35] font-mono">
                                + {conMod} CON = <strong className="text-emerald-700">{dieTotal} PG</strong>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-2.5 bg-[#f4ecd8] rounded-lg border border-[#d0b47e] text-center text-xs font-fantasy text-[#5e4315]">
                        ✨ <strong>Total Curado con Dados Virtuales:</strong>{' '}
                        <span className="text-emerald-800 text-sm font-extrabold font-mono">
                          +{calculatedHitDiceHeal} Puntos de Golpe
                        </span>
                      </div>
                    </div>
                  )}

                  {/* MANUAL ROLL DISPLAY */}
                  {rollMethod === 'manual' && (
                    <div className="p-3.5 bg-[#faf6ee] rounded-xl border border-[#d6c4aa] space-y-3">
                      <div className="text-xs text-[#5c4a35] leading-relaxed">
                        Tira tus dados físicos en la mesa e introduce los resultados de cada dado (1 a {hitDieSize}). El sistema sumará automáticamente tu bonificador de Constitución:
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {manualRolls.map((val, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-white rounded-lg border border-[#d6c4aa] text-center shadow-2xs space-y-1"
                          >
                            <label className="text-[10px] text-[#7a6448] uppercase font-mono block">
                              Dado #{idx + 1} (d{hitDieSize})
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={hitDieSize}
                              value={val}
                              onChange={(e) => {
                                const newV = Math.max(1, Math.min(hitDieSize, Number(e.target.value) || 1));
                                setManualRolls((prev) => {
                                  const updated = [...prev];
                                  updated[idx] = newV;
                                  return updated;
                                });
                              }}
                              className="w-full text-center font-mono font-bold text-base bg-[#fcf9f2] border border-[#d6c4aa] rounded-md py-1 text-[#2c241b] focus:outline-none focus:border-[#8c672b]"
                            />
                            <div className="text-[10px] text-[#5c4a35] font-mono">
                              + {conMod} CON = <strong className="text-emerald-700">{Math.max(0, val + conMod)} PG</strong>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 bg-[#f4ecd8] rounded-lg border border-[#d0b47e] text-center text-xs font-fantasy text-[#5e4315]">
                        ✍️ <strong>Total Curado con Dados Físicos:</strong>{' '}
                        <span className="text-emerald-800 text-sm font-extrabold font-mono">
                          +{calculatedHitDiceHeal} Puntos de Golpe
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Resources and Spell Slots Recovery Preview */}
          <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-xs space-y-3">
            <h4 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase tracking-wide flex items-center gap-1.5 border-b border-[#ebdcc7] pb-2">
              <Zap className="w-4 h-4 text-[#8c672b]" />
              Beneficios & Recursos que se Restaurarán:
            </h4>

            <div className="space-y-2 text-xs text-[#5c4a35]">
              {/* Hit Dice Recovery in Long Rest */}
              {restType === 'long' && (
                <div className="flex items-center gap-2 p-2 bg-[#faf6ee] rounded-lg border border-[#ebdcc7]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Recuperación de Dados de Golpe:</strong> Recuperas{' '}
                    <strong className="text-[#8c672b]">+{longRestRegainedDice} dados</strong> gastados (hasta la mitad de tu total).
                  </span>
                </div>
              )}

              {/* Spell slots */}
              {restType === 'long' && character.spellSlots && (
                <div className="flex items-center gap-2 p-2 bg-[#faf6ee] rounded-lg border border-[#ebdcc7]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Ranuras de Conjuro:</strong> Se restauran al 100% todos los espacios de nivel 1 al 9.
                  </span>
                </div>
              )}

              {/* Death Saves */}
              {restType === 'long' && (
                <div className="flex items-center gap-2 p-2 bg-[#faf6ee] rounded-lg border border-[#ebdcc7]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Salvaciones de Muerte:</strong> Se limpian todos los éxitos y fallos acumulados.
                  </span>
                </div>
              )}

              {/* Class resources list */}
              {rechargeableResources.length > 0 ? (
                <div className="p-2.5 bg-[#faf6ee] rounded-lg border border-[#ebdcc7] space-y-1.5">
                  <span className="font-bold text-[#4a361c] block">
                    Recursos de Clase que se recargarán ({rechargeableResources.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rechargeableResources.map((res) => (
                      <span
                        key={res.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-md border border-[#d6c4aa] text-[11px] font-bold text-[#7a5a2b]"
                      >
                        <Flame className="w-3 h-3 text-[#b88c32]" />
                        {res.name} (se restaura a {res.max})
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-[#7a6448] italic">
                  {restType === 'short'
                    ? 'No tienes recursos que se recarguen específicamente en descanso corto.'
                    : 'No tienes recursos de clase adicionales para recargar.'}
                </p>
              )}
            </div>
          </div>

          {/* Wizard Lv3+ Optional Tasha Feature: Cantrip Formulas */}
          {restType === 'long' && isWizardLv3 && (
            <div className="p-3.5 bg-gradient-to-r from-[#f5ede0] to-[#fcf6e9] rounded-xl border-2 border-[#b88c32] shadow-xs space-y-2">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#b88c32] shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                      Fórmulas de Trucos (Cantrip Formulas - Regla Opcional de Tasha)
                    </h5>
                    <span className="text-[9px] bg-[#8c672b] text-white px-2 py-0.5 rounded font-mono font-bold">
                      Mago Nv3+
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5c4a35] leading-relaxed">
                    Al terminar un descanso largo y consultar las fórmulas arcanas de tu grimorio, puedes sustituir un truco de mago que conozcas por otro truco de la lista de mago.
                  </p>

                  <label className="flex items-center gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantsCantripFormulas}
                      onChange={(e) => setWantsCantripFormulas(e.target.checked)}
                      className="rounded text-[#8c672b] focus:ring-[#8c672b] cursor-pointer"
                    />
                    <span className="text-xs font-fantasy font-bold text-[#7a5a2b]">
                      Abrir selector para cambiar un truco al finalizar el descanso
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#f4ecd8] border-t border-[#d8be8a] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#6e5c4a] hover:text-[#2c221a] text-xs font-fantasy font-bold rounded-xl border border-[#cfbe9f] transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white text-xs font-fantasy font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer ring-2 ring-[#ffd56b]/40"
          >
            {restType === 'long' ? (
              <>
                <Moon className="w-4 h-4 text-amber-200" />
                <span>Completar Descanso Largo (8h)</span>
              </>
            ) : (
              <>
                <Coffee className="w-4 h-4 text-amber-200" />
                <span>Completar Descanso Corto (1h)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
