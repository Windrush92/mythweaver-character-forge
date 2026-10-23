import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Check, Palette, Sparkles, Upload, Trash2, Link2, Camera, Image as ImageIcon, Filter, Sliders, RotateCcw } from 'lucide-react';
import { AvatarFrameStyle, Character } from '../types';
import { AVATAR_FRAME_DEFINITIONS, getAvatarFrame } from '../data/avatarFramesData';
import { FantasyAvatarFrame } from './FantasyAvatarFrame';

export interface AvatarLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: Character;
  avatarUrl?: string;
  initialFrame?: AvatarFrameStyle | string;
  initialScale?: number;
  initialOffsetY?: number;
  onUpdateFrame?: (newFrame: AvatarFrameStyle) => void;
  onUpdateAvatar?: (newAvatarUrl: string) => void;
  onUpdateAvatarAdjustments?: (scale: number, offsetY: number) => void;
  onSaveFrameSettings?: (frameId: AvatarFrameStyle, scale: number, offsetY: number) => void;
}

export const AvatarLightboxModal: React.FC<AvatarLightboxModalProps> = ({
  isOpen,
  onClose,
  character,
  avatarUrl: propAvatarUrl,
  initialFrame,
  initialScale,
  initialOffsetY,
  onUpdateFrame,
  onUpdateAvatar,
  onUpdateAvatarAdjustments,
  onSaveFrameSettings,
}) => {
  const [selectedFrame, setSelectedFrame] = useState<AvatarFrameStyle>(() => {
    const raw = (initialFrame || character?.avatarFrame) as AvatarFrameStyle | undefined;
    if (raw === 'celtic-bronze' || !raw) {
      return 'frame-royal-gold';
    }
    return raw;
  });

  const [avatarUrl, setAvatarUrl] = useState<string>(propAvatarUrl ?? character?.avatarUrl ?? '');
  const [avatarScale, setAvatarScale] = useState<number>(initialScale ?? character?.avatarScale ?? 1);
  const [avatarOffsetY, setAvatarOffsetY] = useState<number>(initialOffsetY ?? character?.avatarOffsetY ?? 0);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isUrlExpanded, setIsUrlExpanded] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'elemental' | 'martial' | 'dark' | 'arcane' | 'noble'>('all');
  const [shapeFilter, setShapeFilter] = useState<'all' | 'circle' | 'squircle'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const heroName = character?.name || 'Héroe';
  const heroLevel = character?.level ?? 1;
  const heroRace = character?.race || 'Aventurero';
  const heroClass = character?.class || 'D&D 5e';

  // Sync state if character prop changes & migrate away from thick bronze medallion
  useEffect(() => {
    const currentFrame = (initialFrame || character?.avatarFrame) as AvatarFrameStyle | undefined;
    if (currentFrame) {
      if (currentFrame === 'celtic-bronze') {
        setSelectedFrame('frame-royal-gold');
        onUpdateFrame?.('frame-royal-gold');
        onSaveFrameSettings?.('frame-royal-gold', avatarScale, avatarOffsetY);
      } else {
        setSelectedFrame(currentFrame);
      }
    }
    const currentUrl = propAvatarUrl ?? character?.avatarUrl ?? '';
    setAvatarUrl(currentUrl);

    const currentScale = initialScale ?? character?.avatarScale;
    if (currentScale !== undefined) setAvatarScale(currentScale);

    const currentOffsetY = initialOffsetY ?? character?.avatarOffsetY;
    if (currentOffsetY !== undefined) setAvatarOffsetY(currentOffsetY);
  }, [character?.avatarFrame, character?.avatarUrl, character?.avatarScale, character?.avatarOffsetY, initialFrame, propAvatarUrl, initialScale, initialOffsetY, isOpen]);

  // Handle ESC key to dismiss modal
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

  const filteredFrames = useMemo(() => {
    return AVATAR_FRAME_DEFINITIONS.filter((f) => {
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'elemental' && f.category !== 'elemental') return false;
        if (categoryFilter === 'martial' && f.category !== 'martial') return false;
        if (categoryFilter === 'dark' && f.category !== 'dark') return false;
        if (categoryFilter === 'arcane' && f.category !== 'arcane' && f.id !== 'frame-nature-fae') return false;
        if (categoryFilter === 'noble' && f.category !== 'noble') return false;
      }
      if (shapeFilter !== 'all') {
        if (shapeFilter === 'circle' && f.shapeType !== 'circle') return false;
        if (shapeFilter === 'squircle' && f.shapeType !== 'squircle' && f.shapeType !== 'octagon') return false;
      }
      return true;
    });
  }, [categoryFilter, shapeFilter]);

  if (!isOpen) return null;

  const currentFrameDef = getAvatarFrame(selectedFrame);

  const handleApplyFrame = (frameId: AvatarFrameStyle) => {
    setSelectedFrame(frameId);
    onUpdateFrame?.(frameId);
    onSaveFrameSettings?.(frameId, avatarScale, avatarOffsetY);
  };

  const handleScaleChange = (newScale: number) => {
    const clamped = Math.round(Math.min(2.0, Math.max(0.6, newScale)) * 100) / 100;
    setAvatarScale(clamped);
    onUpdateAvatarAdjustments?.(clamped, avatarOffsetY);
    onSaveFrameSettings?.(selectedFrame, clamped, avatarOffsetY);
  };

  const handleOffsetYChange = (newOffset: number) => {
    const clamped = Math.round(Math.min(35, Math.max(-35, newOffset)));
    setAvatarOffsetY(clamped);
    onUpdateAvatarAdjustments?.(avatarScale, clamped);
    onSaveFrameSettings?.(selectedFrame, avatarScale, clamped);
  };

  const handleResetAdjustments = () => {
    setAvatarScale(1);
    setAvatarOffsetY(0);
    onUpdateAvatarAdjustments?.(1, 0);
    onSaveFrameSettings?.(selectedFrame, 1, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      // Downscale high-res images if needed so localStorage doesn't overflow
      const img = new Image();
      img.onload = () => {
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimized = canvas.toDataURL('image/jpeg', 0.88);
            setAvatarUrl(optimized);
            onUpdateAvatar?.(optimized);
            return;
          }
        }
        setAvatarUrl(dataUrl);
        onUpdateAvatar?.(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setAvatarUrl(trimmed);
    onUpdateAvatar?.(trimmed);
    setUrlInput('');
    setIsUrlExpanded(false);
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl('');
    onUpdateAvatar?.('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fbf7ee] text-[#2c221a] cursor-default"
      >
        {/* Ancient Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#241a12] via-[#352518] to-[#241a12] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c672b] to-[#c59b27] flex items-center justify-center shadow-lg border border-[#ffd56b]/40 text-white">
              <Palette className="w-5 h-5 text-[#fdfaf3]" />
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-base sm:text-lg text-[#f7f2ea] tracking-wider uppercase">
                Retrato de Aventurero & Recuadros de Fantasía
              </h3>
              <p className="text-xs text-[#c5ab8d] italic">
                Sube tu ilustración, calibra su tamaño y elige entre 24 recuadros finos elementales, arcanos, forja, demoníacos y reales
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-[#1c150e]/90 hover:bg-[#8c2e28] text-[#c0ad97] hover:text-white rounded-xl border border-[#c59b27]/60 shadow-md transition cursor-pointer active:scale-95"
            title="Cerrar visor (Escape)"
          >
            <X className="w-5 h-5 text-[#d4ab59] hover:text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Big Portrait Showcase, Upload & Framing Calibration */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-gradient-to-b from-[#1f1710] to-[#120d09] rounded-2xl border-2 border-[#8c672b]/60 shadow-inner relative overflow-hidden">
              {/* Subtle background glow */}
              <div
                className={`absolute w-52 h-52 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-500 ${currentFrameDef.glowColor}`}
              />

              {/* Hidden file input for uploading avatar from disk */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Big High-Res Frame with quick click-to-upload action */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative my-2 group cursor-pointer"
                title="Haz clic para subir o cambiar la imagen de avatar"
              >
                <FantasyAvatarFrame
                  avatarUrl={avatarUrl}
                  name={heroName}
                  level={heroLevel}
                  frameStyle={selectedFrame}
                  size="2xl"
                  interactive={false}
                  showLevelBadge={true}
                  avatarScale={avatarScale}
                  avatarOffsetY={avatarOffsetY}
                />
                <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white pointer-events-none">
                  <Camera className="w-7 h-7 text-[#ffd56b] drop-shadow-md" />
                  <span className="font-fantasy font-bold text-xs tracking-wider text-[#fff3d4] drop-shadow-md">
                    Cambiar Imagen
                  </span>
                </div>
              </div>

              {/* Character Identity Banner below portrait */}
              <div className="mt-3 text-center space-y-1 w-full">
                <h4 className="font-fantasy font-bold text-lg text-[#ffd56b] tracking-wider uppercase">
                  {heroName}
                </h4>
                <p className="text-xs text-[#baa892] italic">
                  {heroRace} • {heroClass} (Nivel {heroLevel})
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#8c672b]/60 text-[11px] font-mono text-[#d4ab59] mt-1.5">
                  <span>{currentFrameDef.emoji}</span>
                  <span className="font-bold">{currentFrameDef.name}</span>
                  <span className="text-[10px] text-[#baa892]">
                    ({currentFrameDef.shapeType === 'circle' ? 'Redondo' : 'Cuadrado'})
                  </span>
                </div>
              </div>

              {/* Calibration Controls: Zoom & Vertical Alignment */}
              {avatarUrl && (
                <div className="w-full mt-3.5 p-3 bg-[#120d09]/95 rounded-xl border border-[#8c672b]/50 space-y-2.5 text-[#e2d5c3] shadow-inner">
                  <div className="flex items-center justify-between text-[11px] font-fantasy font-bold text-[#e6c99c]">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#ffd56b]" />
                      <span>Ajustar Escala en el Recuadro</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleResetAdjustments}
                      className="text-[10px] text-[#a8957e] hover:text-[#ffd56b] transition cursor-pointer flex items-center gap-1"
                      title="Restablecer tamaño y posición original"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Centrar</span>
                    </button>
                  </div>

                  {/* Zoom / Scale Control Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#baa892]">
                      <span>🔍 Tamaño / Zoom:</span>
                      <span className="font-bold text-[#ffd56b]">{Math.round(avatarScale * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleScaleChange(avatarScale - 0.05)}
                        className="w-5 h-5 rounded bg-[#2c1e13] hover:bg-[#8c672b] text-white flex items-center justify-center text-xs font-bold transition cursor-pointer border border-[#8c672b]/40 shrink-0"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0.7"
                        max="1.8"
                        step="0.02"
                        value={avatarScale}
                        onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-[#2c1e13] rounded-lg appearance-none cursor-pointer accent-[#ffd56b]"
                      />
                      <button
                        type="button"
                        onClick={() => handleScaleChange(avatarScale + 0.05)}
                        className="w-5 h-5 rounded bg-[#2c1e13] hover:bg-[#8c672b] text-white flex items-center justify-center text-xs font-bold transition cursor-pointer border border-[#8c672b]/40 shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Vertical Position Offset Control */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#baa892]">
                      <span>↕️ Enfoque Vertical:</span>
                      <span className="font-bold text-[#ffd56b]">{avatarOffsetY > 0 ? `+${avatarOffsetY}%` : `${avatarOffsetY}%`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOffsetYChange(avatarOffsetY - 2)}
                        className="w-5 h-5 rounded bg-[#2c1e13] hover:bg-[#8c672b] text-white flex items-center justify-center text-[10px] font-bold transition cursor-pointer border border-[#8c672b]/40 shrink-0"
                        title="Subir imagen"
                      >
                        ▲
                      </button>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        step="1"
                        value={avatarOffsetY}
                        onChange={(e) => handleOffsetYChange(parseInt(e.target.value, 10))}
                        className="flex-1 h-1.5 bg-[#2c1e13] rounded-lg appearance-none cursor-pointer accent-[#ffd56b]"
                      />
                      <button
                        type="button"
                        onClick={() => handleOffsetYChange(avatarOffsetY + 2)}
                        className="w-5 h-5 rounded bg-[#2c1e13] hover:bg-[#8c672b] text-white flex items-center justify-center text-[10px] font-bold transition cursor-pointer border border-[#8c672b]/40 shrink-0"
                        title="Bajar imagen"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Avatar Upload Actions Box */}
              <div className="w-full mt-3.5 pt-3 border-t border-[#8c672b]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-fantasy font-bold text-[#e6c99c] uppercase tracking-wide flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#d4ab59]" />
                    <span>Ilustración del Héroe</span>
                  </span>
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="text-[10px] text-[#fca5a5] hover:text-white flex items-center gap-1 transition cursor-pointer px-2 py-0.5 rounded bg-[#4a1c17] hover:bg-[#6b221d] border border-[#a83228]"
                      title="Quitar imagen actual y restaurar silueta por defecto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Quitar</span>
                    </button>
                  )}
                </div>

                {/* Primary Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-[#8c672b] via-[#a67a33] to-[#8c672b] hover:from-[#73521e] hover:to-[#7a5a25] text-white font-fantasy font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-[#ffd56b]/40 active:scale-98"
                >
                  <Upload className="w-4 h-4 text-[#ffd56b]" />
                  <span>Subir Imagen desde Dispositivo</span>
                </button>

                {/* URL Input Accordion / Input */}
                {!isUrlExpanded ? (
                  <button
                    type="button"
                    onClick={() => setIsUrlExpanded(true)}
                    className="w-full py-1 text-[11px] font-mono text-[#c5ab8d] hover:text-[#ffd56b] transition text-center cursor-pointer flex items-center justify-center gap-1.5 hover:underline"
                  >
                    <Link2 className="w-3 h-3 text-[#d4ab59]" />
                    <span>¿Prefieres pegar una URL web?</span>
                  </button>
                ) : (
                  <div className="space-y-1.5 pt-1 animate-fadeIn">
                    <div className="flex items-center gap-1.5 w-full bg-[#120d09] p-1.5 rounded-xl border border-[#8c672b]/60">
                      <Link2 className="w-3.5 h-3.5 text-[#d4ab59] ml-1 shrink-0" />
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyUrl();
                          }
                        }}
                        placeholder="https://ejemplo.com/heroe.jpg"
                        className="flex-1 bg-transparent text-xs text-[#f5ede0] placeholder-[#7d6750] px-1.5 py-0.5 focus:outline-none font-mono min-w-0"
                      />
                      <button
                        type="button"
                        onClick={handleApplyUrl}
                        disabled={!urlInput.trim()}
                        className="px-2.5 py-1 bg-[#8c672b] hover:bg-[#a67a33] disabled:opacity-40 disabled:hover:bg-[#8c672b] text-white text-[11px] font-fantasy font-bold rounded-lg transition cursor-pointer shadow-xs shrink-0"
                      >
                        Aplicar
                      </button>
                    </div>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setIsUrlExpanded(false)}
                        className="text-[10px] text-[#a8957e] hover:text-[#d4ab59] cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Frame Selector Catalog with Filters */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="space-y-2 pb-2 border-b border-[#dfcfb4]">
                <div className="flex items-center justify-between">
                  <h4 className="font-fantasy font-bold text-sm text-[#382b20] uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8c672b]" />
                    <span>Catálogo de Recuadros de Fantasía ({filteredFrames.length})</span>
                  </h4>
                  <span className="text-[11px] text-[#8c672b] font-mono font-bold">
                    Bordes Finos • Redondos & Cuadrados
                  </span>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'elemental', label: '🔥 Elementales' },
                    { id: 'martial', label: '🔨 Forja & Hierro' },
                    { id: 'dark', label: '😈 Oscuro & Demoníaco' },
                    { id: 'arcane', label: '✨ Magia & Feérico' },
                    { id: 'noble', label: '👑 Noble & Oro' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCategoryFilter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-fantasy transition cursor-pointer ${
                        categoryFilter === tab.id
                          ? 'bg-[#8c672b] text-white font-bold shadow-xs'
                          : 'bg-[#ede1ce] hover:bg-[#dfcfb9] text-[#4a361c]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Shape Filter Toggle */}
                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#786450]">
                  <span className="flex items-center gap-1 text-[#8c672b]">
                    <Filter className="w-3 h-3" /> Formato:
                  </span>
                  <button
                    type="button"
                    onClick={() => setShapeFilter('all')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition ${
                      shapeFilter === 'all' ? 'bg-[#3b2818] text-[#ffd56b] font-bold' : 'hover:bg-[#e2d5c3]'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    type="button"
                    onClick={() => setShapeFilter('circle')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition flex items-center gap-1 ${
                      shapeFilter === 'circle' ? 'bg-[#3b2818] text-[#ffd56b] font-bold' : 'hover:bg-[#e2d5c3]'
                    }`}
                  >
                    <span>⚪ Redondos</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShapeFilter('squircle')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition flex items-center gap-1 ${
                      shapeFilter === 'squircle' ? 'bg-[#3b2818] text-[#ffd56b] font-bold' : 'hover:bg-[#e2d5c3]'
                    }`}
                  >
                    <span>⬛ Cuadrados</span>
                  </button>
                </div>
              </div>

              {/* Frame Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[410px] overflow-y-auto pr-1">
                {filteredFrames.map((f) => {
                  const isSelected = selectedFrame === f.id;
                  const isCircle = f.shapeType === 'circle';

                  return (
                    <div
                      key={f.id}
                      onClick={() => handleApplyFrame(f.id)}
                      className={`p-3 rounded-xl border-2 transition cursor-pointer text-left flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#8c672b] bg-[#f5ede0] shadow-md ring-2 ring-[#c59b27]/80'
                          : 'border-[#d8c8af] bg-[#faf5ec] hover:border-[#b88c32] hover:bg-[#f5ede0]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="shrink-0 mt-0.5">
                          <FantasyAvatarFrame
                            avatarUrl={avatarUrl}
                            name={heroName}
                            frameStyle={f.id}
                            size="sm"
                            interactive={false}
                            showLevelBadge={false}
                            avatarScale={avatarScale}
                            avatarOffsetY={avatarOffsetY}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-fantasy font-bold text-xs text-[#2c221a] flex items-start gap-1.5 leading-snug break-words">
                              <span className="text-sm shrink-0">{f.emoji}</span>
                              <span className="break-words">{f.name}</span>
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#8c672b] text-white flex items-center justify-center shrink-0 shadow-xs ml-1 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#ebe1ce] text-[#6b512c] border border-[#d6c4aa]">
                              {isCircle ? '⚪ Redondo' : '⬛ Cuadrado'}
                            </span>
                            {f.assetUrl && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#2e5924] text-white">
                                Asset Fino
                              </span>
                            )}
                          </div>

                          <p className="text-[10px] text-[#6b5844] mt-1.5 leading-tight line-clamp-2">
                            {f.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#e2d3be] flex items-center justify-between text-[10px]">
                        <span className="font-mono text-[#786450]">
                          {isSelected ? 'Activo actualmente' : 'Haz clic para aplicar'}
                        </span>
                        <div className={`w-3 h-3 rounded-full border ${f.borderColor} ${f.badgeBg}`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative Note Box */}
              <div className="p-3 bg-[#f5ede0] rounded-xl border border-[#d8c8af] text-xs text-[#5c472d] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#8c672b] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Ajuste Milimétrico:</strong> Usa los controles de <strong>Tamaño / Zoom</strong> y <strong>Enfoque Vertical</strong> para calibrar tu ilustración y que encaje perfectamente dentro de cualquier marco redondo o cuadrado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-[#ebdcc4] border-t border-[#d8c8af] flex items-center justify-between text-xs shrink-0">
          <span className="text-[#6b5844] italic">
            Presiona <strong>ESC</strong> o haz clic afuera para cerrar
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#8c672b] to-[#a67a33] hover:from-[#7a5a25] hover:to-[#8c672b] text-white font-fantasy font-bold rounded-xl transition cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Listo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
