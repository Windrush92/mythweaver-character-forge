import React from 'react';
import { X, Check, Palette, Sparkles, Shield, Compass, BookOpen } from 'lucide-react';
import { UiSkin, SKIN_OPTIONS } from '../hooks/useUiSkin';

interface SkinSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkin: UiSkin;
  onSelectSkin: (skin: UiSkin) => void;
}

export const SkinSelectorModal: React.FC<SkinSelectorModalProps> = ({
  isOpen,
  onClose,
  currentSkin,
  onSelectSkin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1e1510] text-[#f7eee1] rounded-2xl border-2 border-[#b88c32] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#4d3625] bg-gradient-to-r from-[#2a1c14] via-[#352319] to-[#2a1c14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#422d1f] text-[#dfbe7e] rounded-xl border border-[#785434] shadow-inner">
              <Palette className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold font-fantasy text-[#fdfaf3] flex items-center gap-2">
                <span>Selector de Aspectos Visuales (Temas)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8c672b] text-white font-mono font-bold uppercase">
                  EN DESARROLLO (WIP)
                </span>
              </h3>
              <p className="text-xs text-[#c0ad97] mt-0.5">
                Personaliza la atmósfera y el estilo visual de la mesa de MythWeaver. Próximamente se añadirán más aspectos.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#baa792] hover:text-white hover:bg-[#4a3222] rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skins Grid */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKIN_OPTIONS.map((opt) => {
              const isSelected = currentSkin === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (opt.isAvailable) {
                      onSelectSkin(opt.id);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition relative flex flex-col justify-between ${
                    opt.isAvailable
                      ? isSelected
                        ? 'bg-[#3d2719] border-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.35)] cursor-pointer ring-2 ring-[#eab308]/40'
                        : 'bg-[#281b13] border-[#5a3f2b] hover:border-[#967040] hover:bg-[#302117] cursor-pointer'
                      : 'bg-[#18110c] border-[#382619] opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{opt.icon}</span>
                        <h4 className="font-fantasy font-bold text-sm text-[#f5eee2] leading-tight">
                          {opt.name}
                        </h4>
                      </div>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                          isSelected
                            ? 'bg-[#eab308] text-[#1c120c]'
                            : opt.isAvailable
                            ? 'bg-[#4d3625] text-[#dfbe7e]'
                            : 'bg-[#2c1d14] text-[#8c7664]'
                        }`}
                      >
                        {isSelected ? '✓ Seleccionado' : opt.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#baa792] leading-relaxed">
                      {opt.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#442e1f] flex items-center justify-between text-xs">
                    {opt.isAvailable ? (
                      <span className={`text-[11px] font-bold font-fantasy flex items-center gap-1.5 ${isSelected ? 'text-[#eab308]' : 'text-[#cfa344]'}`}>
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Aspecto Activo
                          </>
                        ) : (
                          'Hacer clic para activar →'
                        )}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#8c7664] italic">
                        En desarrollo para futuros parches
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick info note */}
          <div className="p-3.5 bg-[#2a1c14] rounded-xl border border-[#5c3e28] text-xs text-[#baa792] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#eab308] shrink-0 mt-0.5" />
            <p>
              <strong>Aspecto Oficial:</strong> El estilo activo es <span className="text-[#f5eee2] font-semibold">Forja Mítica (Mesa Oscura)</span> con mesa de caoba noble, sellos de cera, pergamino envejecido y medallones de bronce forjado. Estamos desarrollando nuevos estilos temáticos para próximas actualizaciones.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#4d3625] bg-[#22160f] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8c672b] hover:bg-[#a67a33] text-white font-fantasy font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            Aceptar & Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
