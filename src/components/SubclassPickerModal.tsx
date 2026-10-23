import React, { useState, useMemo } from 'react';
import {
  Sword,
  Shield,
  Search,
  X,
  Lock,
  Check,
  Eye,
  Sparkles,
  Info,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { WikidotClass } from '../data/wikidotData';
import { CompendiumInspectData } from './CompendiumInspectModal';

export interface SubclassPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeClass: WikidotClass;
  selectedSubclassId: string;
  onSelectSubclass: (subclassId: string) => void;
  characterLevel: number;
  subclassUnlockLevel: number;
  isSubclassUnlocked: boolean;
  onInspectCompendium: (data: CompendiumInspectData) => void;
}

export const SubclassPickerModal: React.FC<SubclassPickerModalProps> = ({
  isOpen,
  onClose,
  activeClass,
  selectedSubclassId,
  onSelectSubclass,
  characterLevel,
  subclassUnlockLevel,
  isSubclassUnlocked,
  onInspectCompendium,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'caster' | 'martial'>('all');

  const subclasses = activeClass?.subclasses || [];
  const totalCount = subclasses.length;
  // If 4 or fewer options, adapt to compact modal; if more, widescreen maximized modal
  const isCompact = totalCount <= 4;

  const filteredSubclasses = useMemo(() => {
    return subclasses.filter((sub) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = sub.name.toLowerCase().includes(query);
        const matchesDesc = sub.description.toLowerCase().includes(query);
        const matchesFeature = sub.features?.some(
          (f) => f.name.toLowerCase().includes(query) || f.desc.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesFeature) return false;
      }
      if (filterType === 'caster' && !sub.isCasterSubclass) return false;
      if (filterType === 'martial' && sub.isCasterSubclass) return false;
      return true;
    });
  }, [subclasses, searchQuery, filterType]);

  const selectedSubclass = useMemo(() => {
    return subclasses.find((s) => s.id === selectedSubclassId) || null;
  }, [subclasses, selectedSubclassId]);

  if (!isOpen || !activeClass) return null;

  return (
    <div
      className="fixed inset-0 z-65 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`bg-[#fcf9f2] border-4 border-[#8c672b] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#2c241b] transition-all duration-200 ${
          isCompact
            ? 'max-w-3xl w-full max-h-[85vh]'
            : 'max-w-6xl 2xl:max-w-7xl w-full max-h-[90vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#2c221a] via-[#3a2e23] to-[#2c221a] text-[#eedcb8] px-5 py-4 border-b-2 border-[#8c672b] flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#8c672b]/30 rounded-xl border border-[#b88c32]/50 text-[#ffd56b]">
              <Sword className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-fantasy font-bold text-lg sm:text-xl text-[#f4e2bb] tracking-wide">
                  {activeClass.subclassesName} — {activeClass.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#b88c32]/25 text-[#ffd56b] border border-[#b88c32]/40">
                  {totalCount} {totalCount === 1 ? 'Opción' : 'Opciones Disponibles'}
                </span>
                {isCompact && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-[#d8c29d] border border-white/15">
                    Modo Compacto
                  </span>
                )}
              </div>
              <p className="text-xs text-[#c2ad8a] mt-0.5">
                {isSubclassUnlocked
                  ? `Selecciona la especialización para tu ${activeClass.name} de Nivel ${characterLevel}.`
                  : `Tu personaje es Nivel ${characterLevel}. Esta clase consagra su especialización a Nivel ${subclassUnlockLevel}. Puedes explorar e inspeccionar cada senda.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/50 text-[#d8c29d] hover:text-white border border-[#8c672b]/40 transition cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOCKED BANNER IF NOT UNLOCKED */}
        {!isSubclassUnlocked && (
          <div className="bg-[#ede0cc] border-b border-[#d1be9e] px-5 py-2.5 flex items-center gap-3 text-xs text-[#5c4323] shrink-0">
            <Lock className="w-4 h-4 text-[#8c672b] shrink-0" />
            <div className="leading-tight">
              <span className="font-bold text-[#4a361c]">
                Especialización bloqueada por nivel (Nivel actual: {characterLevel} / Requerido: {subclassUnlockLevel}).
              </span>
              <span className="text-[11px] text-[#7a6448] ml-1">
                Puedes hacer clic en <em>Inspeccionar</em> para leer todos los rasgos detallados de cada opción.
              </span>
            </div>
          </div>
        )}

        {/* SEARCH & FILTERS BAR (Rendered always when options > 4, or optionally) */}
        {!isCompact && (
          <div className="bg-[#f5ede0] border-b border-[#dfcfb5] px-5 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="w-4 h-4 text-[#8c672b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar en las ${totalCount} sendas de ${activeClass.name}...`}
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#fcf9f2] border border-[#cfbe9f] rounded-xl text-[#2c241b] placeholder-[#8c7860] focus:outline-none focus:ring-2 focus:ring-[#8c672b]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c7860] hover:text-[#2c241b] text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6d573c] font-medium text-[11px]">
                Mostrando {filteredSubclasses.length} de {totalCount}
              </span>
            </div>
          </div>
        )}

        {/* SUBCLASSES GRID BODY */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-[#faf6ee]">
          {filteredSubclasses.length === 0 ? (
            <div className="py-12 text-center text-[#786450] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#b89f80] opacity-60" />
              <p className="font-fantasy text-sm font-bold">No se encontraron especializaciones con "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8c672b] underline hover:text-[#4a361c] cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-3.5 ${
                isCompact
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredSubclasses.map((sub) => {
                const isSelected = sub.id === selectedSubclassId;
                const inspectData: CompendiumInspectData = {
                  id: sub.id,
                  title: sub.name,
                  subtitle: `Arquetipo de ${activeClass.name}`,
                  category: `Subclase de ${activeClass.name}`,
                  iconType: 'subclass',
                  description: sub.description,
                  traits: sub.features,
                  badges: !isSubclassUnlocked
                    ? [{ label: 'Requisito', value: `Desbloquea a Nivel ${subclassUnlockLevel}`, variant: 'amber' }]
                    : undefined,
                  actionButton: !isSubclassUnlocked
                    ? {
                        label: `Se desbloquea a Nivel ${subclassUnlockLevel}`,
                        onClick: () => {},
                        disabled: true,
                      }
                    : {
                        label: isSelected ? 'Subclase Elegida' : 'Elegir esta Subclase',
                        onClick: () => {
                          onSelectSubclass(sub.id);
                          onClose();
                        },
                        isSelected,
                      },
                };

                return (
                  <div
                    key={sub.id}
                    className={`flex flex-col justify-between rounded-xl border-2 p-4 transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#f4ebd9] border-[#b88c32] shadow-md ring-2 ring-[#b88c32]/30'
                        : 'bg-[#fcf9f2] border-[#dfcfb5] hover:border-[#b88c32] hover:bg-[#f7f0e4] hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2.5">
                      {/* CARD HEADER */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded-lg border ${
                              isSelected
                                ? 'bg-[#b88c32] text-white border-[#8c672b]'
                                : 'bg-[#ede0cc] text-[#8c672b] border-[#d6c4aa]'
                            }`}
                          >
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-fantasy font-bold text-sm text-[#382b20] leading-snug">
                              {sub.name}
                            </h4>
                            <span className="text-[10px] text-[#7a6448] block">
                              Arquetipo de {activeClass.name}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#b88c32] text-white flex items-center gap-1 shrink-0">
                            <Check className="w-3 h-3" /> Elegida
                          </span>
                        )}
                      </div>

                      {/* CARD DESCRIPTION */}
                      <p className="text-xs text-[#5c4a35] leading-relaxed line-clamp-3">
                        {sub.description}
                      </p>

                      {/* FEATURES PREVIEW (FIRST 2 OR 3 KEY FEATURES) */}
                      {sub.features && sub.features.length > 0 && (
                        <div className="pt-1.5 border-t border-[#e8dbca] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a6448] flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-[#8c672b]" /> Rasgos Principales:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {sub.features.slice(0, 3).map((feat, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-[#ede0cc] text-[#4a361c] border border-[#d6c4aa] truncate max-w-[190px]"
                                title={feat.desc}
                              >
                                Nv.{feat.level}: {feat.name}
                              </span>
                            ))}
                            {sub.features.length > 3 && (
                              <span className="text-[10px] text-[#8c672b] font-bold self-center">
                                +{sub.features.length - 3} más
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CARD ACTIONS */}
                    <div className="pt-3 mt-3 border-t border-[#dfcfb5] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onInspectCompendium(inspectData)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#5c4a35] border border-[#cfbe9f] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        title="Inspeccionar todos los rasgos y detalles en el Compendio"
                      >
                        <Eye className="w-3.5 h-3.5" /> Rasgos
                      </button>

                      {isSubclassUnlocked ? (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSubclass(sub.id);
                            onClose();
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#b88c32] to-[#8c672b] text-white hover:brightness-105'
                              : 'bg-[#e5d4bb] hover:bg-[#d8c29d] text-[#3d2d1e] border border-[#bfa982]'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Seleccionada
                            </>
                          ) : (
                            'Elegir esta Subclase'
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="flex-1 py-1.5 px-3 rounded-lg text-[11px] font-bold bg-[#ede0cc] text-[#8c7860] border border-[#d6c4aa] flex items-center justify-center gap-1 cursor-not-allowed opacity-80"
                        >
                          <Lock className="w-3 h-3" /> Nivel {subclassUnlockLevel}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="bg-[#f0e4d0] border-t-2 border-[#d6c4aa] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#5c4a35] flex items-center gap-2">
            <span className="font-bold text-[#382b20]">Selección actual:</span>
            {selectedSubclass ? (
              <span className="px-2.5 py-0.5 rounded-md bg-[#b88c32] text-white font-bold text-xs shadow-xs">
                {selectedSubclass.name}
              </span>
            ) : (
              <span className="italic text-[#8c7860]">Ninguna especialización seleccionada</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSubclassUnlocked && selectedSubclassId && (
              <button
                type="button"
                onClick={() => {
                  onSelectSubclass('');
                }}
                className="px-3 py-1.5 rounded-xl bg-[#ede0cc] hover:bg-[#dfceb5] text-[#8c2e28] text-xs font-bold border border-[#cfbe9f] transition cursor-pointer"
              >
                Quitar Selección
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 bg-gradient-to-r from-[#8c672b] to-[#6d4f1f] hover:from-[#9c7533] hover:to-[#7d5c25] text-white font-fantasy font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              Cerrar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
