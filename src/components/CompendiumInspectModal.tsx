import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Shield,
  Award,
  Check,
  AlertCircle,
  Zap,
  Star,
  Info,
} from 'lucide-react';

export interface CompendiumInspectBadge {
  label: string;
  value: string;
  variant?: 'gold' | 'amber' | 'green' | 'blue' | 'neutral';
}

export interface CompendiumInspectData {
  id?: string;
  title: string;
  subtitle?: string;
  englishTitle?: string;
  category?: string;
  iconType?: 'feat' | 'race' | 'subrace' | 'class' | 'subclass' | 'feature' | 'background' | 'style' | 'generic';
  prerequisite?: string;
  description?: string;
  detailedDescription?: string;
  quote?: string;
  benefits?: string[];
  traits?: { name: string; desc: string }[];
  badges?: CompendiumInspectBadge[];
  equipment?: string;
  extraNotes?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    isSelected?: boolean;
    disabled?: boolean;
  };
}

interface CompendiumInspectModalProps {
  data: CompendiumInspectData | null;
  onClose: () => void;
}

export const CompendiumInspectModal: React.FC<CompendiumInspectModalProps> = ({
  data,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!data) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, onClose]);

  if (!data) return null;

  const renderIcon = () => {
    switch (data.iconType) {
      case 'feat':
        return <Award className="w-5 h-5 text-[#d4ab59]" />;
      case 'race':
      case 'subrace':
        return <Shield className="w-5 h-5 text-[#d4ab59]" />;
      case 'class':
      case 'subclass':
        return <BookOpen className="w-5 h-5 text-[#d4ab59]" />;
      case 'feature':
        return <Zap className="w-5 h-5 text-[#d4ab59]" />;
      case 'background':
        return <Star className="w-5 h-5 text-[#d4ab59]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#d4ab59]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3] text-[#2c221a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ancient Leather-Bound Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#2e2319] via-[#3a2c1f] to-[#2e2319] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1611] border border-[#c59b27]/70 flex items-center justify-center shadow-inner shrink-0">
              {renderIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold font-fantasy text-[#f7f2ea] tracking-wide">
                  {data.title}
                </h3>
                {data.englishTitle && (
                  <span className="text-xs text-[#b8a691] font-serif italic">
                    ({data.englishTitle})
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#c7b9a5] mt-0.5">
                {data.category && (
                  <span className="bg-[#41311b] text-[#ecd89f] px-2 py-0.5 rounded text-[10px] border border-[#75592e] font-mono font-bold uppercase">
                    {data.category}
                  </span>
                )}
                <span className="text-[11px] text-[#b8a691] font-fantasy">
                  Compendio Oficial D&D 5e
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#c7b9a5] hover:text-white hover:bg-[#4a3a2a] rounded-lg transition cursor-pointer shrink-0"
            title="Cerrar detalles (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parchment Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-serif bg-[#fbf6e9] flex-1">
          {/* Prerequisite Callout */}
          {data.prerequisite && (
            <div className="p-3 bg-[#f5e9d5] rounded-xl border border-[#cba86e] flex items-start gap-2.5 text-xs text-[#523a1a]">
              <AlertCircle className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
              <div>
                <strong className="font-fantasy uppercase text-[11px] text-[#63451d] block">
                  Requisito Previo
                </strong>
                <p className="mt-0.5 font-semibold text-[#4a361c]">{data.prerequisite}</p>
              </div>
            </div>
          )}

          {/* Badges Grid (Attributes, Dice, Speed, etc.) */}
          {data.badges && data.badges.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] text-xs">
              {data.badges.map((b, i) => (
                <div key={i} className="text-center sm:text-left">
                  <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                    {b.label}
                  </span>
                  <span className="font-semibold text-[#3b2b1b] mt-0.5 block font-mono text-xs">
                    {b.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Lore / Quote */}
          {data.quote && (
            <blockquote className="p-3 border-l-4 border-[#8c672b] bg-[#f5ede0]/60 italic text-xs text-[#6e5842] rounded-r-lg">
              "{data.quote}"
            </blockquote>
          )}

          {/* Main Description & Detailed Lore */}
          {(() => {
            const desc = data.description?.trim() || '';
            const detailed = data.detailedDescription?.trim() || '';

            // Check if one is just a truncated or identical version of the other
            const isRedundant =
              !detailed ||
              desc === detailed ||
              detailed.toLowerCase().startsWith(desc.replace(/\.\.\.$/, '').trim().toLowerCase()) ||
              desc.toLowerCase().startsWith(detailed.replace(/\.\.\.$/, '').trim().toLowerCase());

            const mainText = isRedundant
              ? (detailed.length > desc.length ? detailed : desc)
              : desc;

            return (
              <>
                {mainText && (
                  <div className="p-4 bg-[#f8f2e4] rounded-xl border border-[#d6c4aa] shadow-inner">
                    <h4 className="text-xs font-bold font-fantasy text-[#63451d] uppercase mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> Descripción
                    </h4>
                    <p className="text-xs sm:text-sm text-[#423120] leading-relaxed whitespace-pre-line">
                      {mainText}
                    </p>
                  </div>
                )}

                {!isRedundant && detailed && (
                  <div className="p-4 bg-[#fcf9f2] rounded-xl border border-[#d6c4aa] shadow-inner space-y-2">
                    <h4 className="text-xs font-bold font-fantasy text-[#63451d] uppercase flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> Lore y Reglas Detalladas (Wikidot)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4a361c] leading-relaxed whitespace-pre-line">
                      {detailed}
                    </p>
                  </div>
                )}
              </>
            );
          })()}

          {/* Benefits List (e.g. Feats) */}
          {data.benefits && data.benefits.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-fantasy text-[#63451d] uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#8c672b]" /> Beneficios y Reglas Completas ({data.benefits.length})
              </h4>
              <div className="space-y-2">
                {data.benefits.map((ben, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#fcf9f2] rounded-xl border border-[#dbcbb2] text-xs sm:text-sm text-[#3b2b1b] flex items-start gap-2.5 shadow-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#ebdcc4] text-[#8c672b] border border-[#b88c32] font-fantasy font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed flex-1">{ben}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traits List (e.g. Racial Traits, Class Features) */}
          {data.traits && data.traits.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold font-fantasy text-[#63451d] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" /> Rasgos y Habilidades Especiales ({data.traits.length})
              </h4>
              <div className="space-y-2">
                {data.traits.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#fcf9f2] rounded-xl border border-[#dbcbb2] text-xs shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c672b]" />
                      <h5 className="font-fantasy font-bold text-xs text-[#4a361c]">
                        {t.name}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-[#523e2b] leading-relaxed pl-3.5">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Starting Equipment (e.g. Backgrounds) */}
          {data.equipment && (
            <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] text-xs">
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy mb-1">
                Equipo Sugerido Inicial
              </span>
              <p className="text-xs text-[#523e2b] italic leading-relaxed">
                {data.equipment}
              </p>
            </div>
          )}

          {/* Extra Notes */}
          {data.extraNotes && (
            <div className="p-3 bg-[#ede1ce] rounded-xl border border-[#cbb391] text-xs text-[#5c4428]">
              <p className="leading-relaxed">{data.extraNotes}</p>
            </div>
          )}

          {/* Quick Tip on Long-Press */}
          <div className="p-2.5 bg-[#f3eae0] rounded-lg border border-dashed border-[#cbb391] text-[11px] text-[#7a6448] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#8c672b] shrink-0" />
            <span>
              <strong>Consejo:</strong> Puedes mantener presionado cualquier elemento o hacer click en el icono de información para ver su ficha completa en cualquier momento.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-[#f3eae0] border-t-2 border-[#dbcbb2] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#bfa88c] bg-white text-[#4a361c] font-fantasy font-bold text-xs hover:bg-[#ede1ce] transition cursor-pointer"
          >
            Cerrar
          </button>

          {data.actionButton && (
            <button
              disabled={data.actionButton.disabled}
              onClick={() => {
                if (data.actionButton?.disabled) return;
                data.actionButton?.onClick();
                onClose();
              }}
              className={`px-5 py-2 rounded-xl font-fantasy font-bold text-xs flex items-center gap-2 transition shadow-md ${
                data.actionButton.disabled
                  ? 'bg-[#d8cbb8] text-[#7a6448] cursor-not-allowed border border-[#c5af95] opacity-75'
                  : data.actionButton.isSelected
                  ? 'bg-[#2e7d32] text-white hover:bg-[#256629] cursor-pointer'
                  : 'bg-gradient-to-r from-[#8c672b] to-[#b88c32] text-white hover:from-[#755523] hover:to-[#9e7728] cursor-pointer'
              }`}
            >
              {data.actionButton.isSelected && <Check className="w-4 h-4" />}
              <span>{data.actionButton.label}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
