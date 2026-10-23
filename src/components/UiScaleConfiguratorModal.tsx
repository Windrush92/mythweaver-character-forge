import React, { useEffect } from 'react';
import { X, Sliders, Check, RotateCcw, ZoomIn, ZoomOut, Monitor, Sparkles, Keyboard } from 'lucide-react';

interface UiScaleConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  scale: number;
  onSetScale: (scale: number) => void;
  onResetScale: () => void;
}

export const UiScaleConfiguratorModal: React.FC<UiScaleConfiguratorModalProps> = ({
  isOpen,
  onClose,
  scale,
  onSetScale,
  onResetScale,
}) => {
  // ESC key support
  useEffect(() => {
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

  const currentPercent = Math.round(scale * 100);

  const presets = [
    {
      value: 0.7,
      label: '70%',
      title: 'Ultra Compacto',
      desc: 'Máximo aprovechamiento de pantalla para monitores pequeños o paneles múltiples',
      emoji: '🔍',
    },
    {
      value: 0.75,
      label: '75%',
      title: 'Muy Compacto',
      desc: 'Ideal para ver todas las columnas de combate y fichas sin scroll horizontal',
      emoji: '📏',
    },
    {
      value: 0.8,
      label: '80%',
      title: 'Recomendado',
      desc: 'Distribución orgánica óptima: amplitud visual, texto nítido y balance perfecto',
      emoji: '🌟',
      isRecommended: true,
    },
    {
      value: 0.85,
      label: '85%',
      title: 'Equilibrado',
      desc: 'Un punto intermedio entre espacio extra y tipografía generosa',
      emoji: '⚖️',
    },
    {
      value: 0.9,
      label: '90%',
      title: 'Estándar Cómodo',
      desc: 'Lectura ágil con excelente proporción visual',
      emoji: '📖',
    },
    {
      value: 1.0,
      label: '100%',
      title: 'Tamaño Completo',
      desc: 'Escala 1:1 original sin reducción',
      emoji: '🖥️',
    },
    {
      value: 1.15,
      label: '115%',
      title: 'Letra Grande',
      desc: 'Accesibilidad visual y lectura descansada a mayor distancia',
      emoji: '👁️',
    },
    {
      value: 1.25,
      label: '125%',
      title: 'Modo TV / Salón',
      desc: 'Ideal para proyectar la mesa de juego en pantallas grandes o televisores',
      emoji: '📺',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl flex flex-col rounded-3xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee] text-[#2c221a] cursor-default"
      >
        {/* Ancient Leather Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#241a12] via-[#352518] to-[#241a12] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c672b] to-[#c59b27] flex items-center justify-center shadow-lg border border-[#ffd56b]/40 text-white">
              <Sliders className="w-5 h-5 text-[#fdfaf3]" />
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-base sm:text-lg text-[#f7f2ea] tracking-wider uppercase flex items-center gap-2">
                <span>Configurador de Escala de UI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#8c672b] text-white font-mono">
                  {currentPercent}%
                </span>
              </h3>
              <p className="text-xs text-[#c5ab8d] italic">
                Ajusta el tamaño de la interfaz para una distribución orgánica en tu pantalla
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-[#1c150e]/90 hover:bg-[#8c2e28] text-[#c0ad97] hover:text-white rounded-xl border border-[#c59b27]/60 shadow-md transition cursor-pointer active:scale-95"
            title="Cerrar (Escape)"
          >
            <X className="w-5 h-5 text-[#d4ab59] hover:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Quick Slider Adjustment Card */}
          <div className="p-4 bg-[#f3ebd9] rounded-2xl border-2 border-[#d8c8af] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#8c672b]" />
                <span>Control Deslizante en Tiempo Real</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-fantasy font-extrabold text-[#8c672b] bg-[#fbf7ee] px-3 py-0.5 rounded-lg border border-[#c59b27] shadow-xs font-mono">
                  {currentPercent}%
                </span>
                <button
                  onClick={onResetScale}
                  className="px-2.5 py-1 text-xs bg-[#e5d5be] hover:bg-[#d4ab59] text-[#4a3a2a] hover:text-[#1c150e] font-bold rounded-lg border border-[#c59b27]/60 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                  title="Restablecer al 80% recomendado"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>80%</span>
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onSetScale(scale - 0.05)}
                className="p-2 rounded-xl bg-[#e5d5be] hover:bg-[#d8c8af] text-[#4a3a2a] border border-[#b88c32]/50 shadow-xs transition cursor-pointer active:scale-95 shrink-0"
                title="Reducir zoom (-5%)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <div className="flex-1 relative flex items-center">
                <input
                  type="range"
                  min="0.5"
                  max="1.4"
                  step="0.05"
                  value={scale}
                  onChange={(e) => onSetScale(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-[#dfcfb4] rounded-lg appearance-none cursor-pointer accent-[#8c672b]"
                />
              </div>

              <button
                onClick={() => onSetScale(scale + 0.05)}
                className="p-2 rounded-xl bg-[#e5d5be] hover:bg-[#d8c8af] text-[#4a3a2a] border border-[#b88c32]/50 shadow-xs transition cursor-pointer active:scale-95 shrink-0"
                title="Aumentar zoom (+5%)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-between text-[10px] text-[#786450] font-mono px-1">
              <span>50% (Mínimo)</span>
              <span className="text-[#8c672b] font-bold">80% (Recomendado)</span>
              <span>100%</span>
              <span>140% (Máximo)</span>
            </div>
          </div>

          {/* Preset Buttons Grid */}
          <div className="space-y-3">
            <h4 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8c672b]" />
              <span>Niveles Predefinidos de Vista</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {presets.map((preset) => {
                const isSelected = Math.abs(scale - preset.value) < 0.02;
                return (
                  <div
                    key={preset.value}
                    onClick={() => onSetScale(preset.value)}
                    className={`p-3 rounded-xl border-2 transition cursor-pointer text-left flex items-start gap-3 group relative ${
                      isSelected
                        ? 'border-[#8c672b] bg-[#f5ede0] shadow-md ring-2 ring-[#c59b27]/80'
                        : 'border-[#d8c8af] bg-[#faf5ec] hover:border-[#b88c32] hover:bg-[#f5ede0]'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{preset.emoji}</span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-fantasy font-bold text-xs text-[#2c221a]">
                            {preset.title}
                          </span>
                          <span className="font-mono text-xs font-extrabold text-[#8c672b] bg-[#e8dac7] px-1.5 py-0.2 rounded">
                            {preset.label}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#8c672b] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <p className="text-[10.5px] text-[#6b5844] mt-1 leading-tight">
                        {preset.desc}
                      </p>
                    </div>

                    {preset.isRecommended && (
                      <span className="absolute -top-2 right-3 text-[9px] font-bold bg-[#8c672b] text-[#ffd56b] px-2 py-0.2 rounded-full border border-[#ffd56b]/60 shadow-xs">
                        RECOMENDADO
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#5c472d] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-[#8c672b] shrink-0" />
              <span className="text-[11px] font-medium">Atajos de teclado en el ejecutable:</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#423120]">
              <span className="bg-[#e8dac7] px-2 py-0.5 rounded border border-[#c59b27]/40 shadow-2xs">
                Ctrl + [+] Zoom In
              </span>
              <span className="bg-[#e8dac7] px-2 py-0.5 rounded border border-[#c59b27]/40 shadow-2xs">
                Ctrl + [-] Zoom Out
              </span>
              <span className="bg-[#e8dac7] px-2 py-0.5 rounded border border-[#c59b27]/40 shadow-2xs font-bold text-[#8c672b]">
                Ctrl + [0] 80%
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-[#ebdcc4] border-t border-[#d8c8af] flex items-center justify-between text-xs shrink-0">
          <span className="text-[#6b5844] italic">
            El ajuste se guarda automáticamente para tus próximas sesiones
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#8c672b] to-[#a67a33] hover:from-[#7a5a25] hover:to-[#8c672b] text-white font-fantasy font-bold rounded-xl transition cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Aplicar & Cerrar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
