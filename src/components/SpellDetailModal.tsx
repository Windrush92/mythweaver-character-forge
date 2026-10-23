import React, { useEffect } from 'react';
import { Spell } from '../types';
import { Sparkles, X, Plus, Trash2, Check, Clock, Eye, AlertCircle } from 'lucide-react';

interface SpellDetailModalProps {
  spell: Spell | null;
  onClose: () => void;
  isKnown?: boolean;
  isPrepared?: boolean;
  canCast?: boolean;
  onTogglePrepared?: () => void;
  onCastSpell?: () => void;
  onAddSpell?: () => void;
  onRemoveSpell?: () => void;
}

export const SpellDetailModal: React.FC<SpellDetailModalProps> = ({
  spell,
  onClose,
  isKnown,
  isPrepared,
  canCast,
  onTogglePrepared,
  onCastSpell,
  onAddSpell,
  onRemoveSpell,
}) => {
  useEffect(() => {
    if (!spell) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spell, onClose]);

  if (!spell) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3] text-[#2c221a] cursor-default"
      >
        {/* Ancient Leather-Bound Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#2e2319] via-[#3a2c1f] to-[#2e2319] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1611] border border-[#c59b27]/70 flex items-center justify-center text-[#d4ab59] shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-fantasy text-[#f7f2ea] tracking-wide flex items-baseline gap-2 flex-wrap">
                <span>{spell.name}</span>
                {spell.nameEn && spell.nameEn.toLowerCase() !== spell.name.toLowerCase() && (
                  <span className="text-xs font-serif font-normal italic text-[#d4ab59]">
                    ({spell.nameEn})
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#c7b9a5] mt-0.5">
                <span className="font-mono uppercase font-bold text-[#d4ab59]">
                  {spell.level === 0 ? 'Truco (Cantrip)' : `Nivel ${spell.level}`}
                </span>
                <span>•</span>
                <span className="font-fantasy font-medium">{spell.school}</span>
                {spell.ritual && (
                  <span className="bg-[#41311b] text-[#ecd89f] px-1.5 py-0.2 rounded text-[10px] border border-[#75592e] font-mono">
                    Ritual
                  </span>
                )}
                {spell.concentration && (
                  <span className="bg-[#59231f] text-[#f7d6d4] px-1.5 py-0.2 rounded text-[10px] border border-[#8a3934] font-mono">
                    Concentración
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#c7b9a5] hover:text-white hover:bg-[#4a3a2a] rounded-lg transition cursor-pointer"
            title="Cerrar detalles"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parchment Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-serif bg-[#fbf6e9]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                Tiempo de Lanzamiento
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">{spell.castingTime}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                Alcance / Área
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">{spell.range}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                Componentes
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">{spell.components}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                Duración
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">{spell.duration}</span>
            </div>
          </div>

          {/* Classes allowed */}
          {spell.classes && spell.classes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-[#6e5842] font-fantasy">Clases autorizadas:</span>
              {spell.classes.map((cls) => (
                <span
                  key={cls}
                  className="bg-[#ede1ce] text-[#543b18] px-2 py-0.5 rounded-full border border-[#cfbe9f] text-[11px] font-semibold font-mono"
                >
                  {cls}
                </span>
              ))}
            </div>
          )}

          {/* Full Description */}
          <div className="p-4 bg-[#f8f2e4] rounded-xl border border-[#d6c4aa] shadow-inner">
            <h4 className="text-xs font-bold font-fantasy text-[#63451d] uppercase mb-2">
              Efecto Completo del Conjuro
            </h4>
            <p className="text-sm text-[#3a2c1f] leading-relaxed whitespace-pre-line">
              {spell.description}
            </p>
          </div>

          {/* Higher Levels Scaling */}
          {spell.higherLevels && (
            <div className="p-3.5 bg-[#faecd6] rounded-xl border border-[#deb87a]">
              <h4 className="text-xs font-bold font-fantasy text-[#7d561a] uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#b88c32]" /> A Niveles Superiores
              </h4>
              <p className="text-xs text-[#5e3f10] leading-relaxed">
                {spell.higherLevels}
              </p>
            </div>
          )}

          {/* Quick Actions Footer inside Modal */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#d8c8af]">
            <span className="text-xs text-[#8c7457] italic">
              Compendio Oficial 5e
            </span>

            <div className="flex items-center gap-2">
              {onTogglePrepared && isKnown && spell.level > 0 && (
                <button
                  type="button"
                  onClick={onTogglePrepared}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1 ${
                    isPrepared
                      ? 'bg-[#c59b27] text-[#1c150e]'
                      : 'bg-[#dfd2be] text-[#5e4b37] hover:bg-[#d4c5ae]'
                  }`}
                >
                  {isPrepared ? <Check className="w-3.5 h-3.5" /> : null}
                  {isPrepared ? 'Preparado' : '+ Preparar'}
                </button>
              )}

              {onCastSpell && canCast && (
                <button
                  type="button"
                  onClick={() => {
                    onCastSpell();
                    onClose();
                  }}
                  className="px-4 py-1.5 bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Lanzar Conjuro
                </button>
              )}

              {onAddSpell && !isKnown && (
                <button
                  type="button"
                  onClick={() => {
                    onAddSpell();
                    onClose();
                  }}
                  className="px-4 py-1.5 bg-[#b88c32] hover:bg-[#8c672b] text-white rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Añadir al Libro
                </button>
              )}

              {onRemoveSpell && isKnown && (
                <button
                  type="button"
                  onClick={() => {
                    onRemoveSpell();
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#963833] hover:bg-[#b0403a] text-white rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1"
                  title="Eliminar de mi libro de conjuros"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Quitar
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#4a361c] rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
