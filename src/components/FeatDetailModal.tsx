import React, { useEffect } from 'react';
import { OfficialFeat } from '../data/characterCreatorData';
import { Award, X, Check, Zap, Sparkles, Sword, Shield, BookOpen } from 'lucide-react';

interface FeatDetailModalProps {
  feat: OfficialFeat | null;
  onClose: () => void;
  onSelect?: (feat: OfficialFeat) => void;
  isSelected?: boolean;
}

export const FeatDetailModal: React.FC<FeatDetailModalProps> = ({
  feat,
  onClose,
  onSelect,
  isSelected,
}) => {
  useEffect(() => {
    if (!feat) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feat, onClose]);

  if (!feat) return null;

  const statLabels: Record<string, string> = {
    str: 'Fuerza',
    dex: 'Destreza',
    con: 'Constitución',
    int: 'Inteligencia',
    wis: 'Sabiduría',
    cha: 'Carisma',
  };

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
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-fantasy text-[#f7f2ea] tracking-wide">
                {feat.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#c7b9a5] mt-0.5">
                <span className="font-mono text-[#d4ab59] italic">
                  {feat.nameEn}
                </span>
                <span>•</span>
                <span className="font-fantasy font-medium">Dote de {feat.category}</span>
                {feat.abilityBonus && (
                  <span className="bg-[#244227] text-[#c9efcc] px-1.5 py-0.2 rounded text-[10px] border border-[#3e6b43] font-mono">
                    +1 Stat (Half-Feat)
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
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-fantasy font-bold bg-[#efe5d5] text-[#5c4625] border border-[#d8c8af]">
                {feat.category === 'Combate' && '⚔️ '}
                {feat.category === 'Magia' && '✨ '}
                {feat.category === 'Utilidad' && '🛠️ '}
                {feat.category === 'General' && '🌟 '}
                {feat.category}
              </span>

              {feat.prerequisite ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#faecd6] text-[#8c591a] border border-[#e0bf79]">
                  ⚠️ Prerrequisito: {feat.prerequisite}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7]">
                  ✓ Sin Prerrequisitos
                </span>
              )}
            </div>

            <span className="text-[11px] font-mono text-[#8c7457] italic">
              Compendio Oficial 5e
            </span>
          </div>

          {/* Lore / Description */}
          <div className="p-3.5 bg-[#f8f2e4] border-l-4 border-[#8c672b] rounded-r-xl italic text-xs text-[#5e4b37] leading-relaxed shadow-inner">
            "{feat.description}"
          </div>

          {/* Ability Score Bonus (Half-Feat) */}
          {feat.abilityBonus && (
            <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8c672b] text-white flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-[#2c221a] block font-fantasy">
                  Mejora de Característica Integrada (+{feat.abilityBonus.amount})
                </strong>
                <p className="text-[#6e5c4a] mt-0.5">
                  Aumentas tu{' '}
                  <span className="font-bold text-[#8c672b]">
                    {feat.abilityBonus.stats
                      ? feat.abilityBonus.stats
                          .map((st) => statLabels[st] || st)
                          .join(feat.abilityBonus.flexible ? ' o ' : ' y ')
                      : 'Característica'}
                  </span>{' '}
                  en +{feat.abilityBonus.amount} (hasta un máximo de 20).
                </p>
              </div>
            </div>
          )}

          {/* Mechanical Benefits */}
          <div className="space-y-2.5">
            <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b] tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#8c672b]" /> Beneficios y Reglas Oficiales:
            </h4>
            <div className="space-y-2">
              {feat.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf3e8] p-3 rounded-xl border border-[#d8c8af] flex items-start gap-2.5 text-xs text-[#3b2b1b] leading-relaxed shadow-2xs font-sans font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-[#8c672b]/15 text-[#8c672b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <p className="flex-1">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subchoices / Custom Options */}
          {feat.subChoice && (
            <div className="space-y-2.5 pt-2 border-t border-[#ebdcc7]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-fantasy font-bold text-xs uppercase text-[#8c672b]">
                    {feat.subChoice.title}
                  </h4>
                  <p className="text-xs text-[#6e5c4a] mt-0.5">
                    {feat.subChoice.description}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#ede1ce] text-[#5e4b37] px-2.5 py-1 rounded-lg border border-[#cfbeaa] shrink-0">
                  Elige hasta {feat.subChoice.maxSelections}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {feat.subChoice.options.map((opt) => (
                  <div
                    key={opt.id}
                    className="bg-[#faf3e8] p-2.5 rounded-xl border border-[#d8c8af] space-y-0.5"
                  >
                    <strong className="text-xs text-[#2c221a] block font-fantasy">
                      {opt.name}
                    </strong>
                    <p className="text-[11px] text-[#6e5c4a] leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-between gap-2 border-t border-[#d8c8af]">
            <span className="text-xs text-[#8c7457] italic">
              Reglas Oficiales 5e • Manual del Jugador & Suplementos
            </span>

            <div className="flex items-center gap-2">
              {onSelect && (
                <button
                  type="button"
                  onClick={() => {
                    onSelect(feat);
                    onClose();
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-fantasy font-bold shadow transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#2e7d32] text-white hover:bg-[#256829]'
                      : 'bg-[#8c672b] hover:bg-[#a67a33] text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {isSelected ? 'Dote Ya Seleccionada' : 'Elegir esta Dote'}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#4a361c] rounded-lg text-xs font-semibold transition cursor-pointer"
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
