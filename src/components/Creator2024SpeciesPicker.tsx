import React, { useState, useMemo } from 'react';
import { DND_2024_SPECIES, Species2024 } from '../data/dnd2024';
import { CompendiumInspectData } from './CompendiumInspectModal';
import { useLanguageStore } from '../hooks/useLanguageStore';
import { Award, Search, Sparkles, Star, Eye, Shield, Check } from 'lucide-react';

interface Creator2024SpeciesPickerProps {
  selectedSpeciesId: string;
  onSelectSpecies: (speciesId: string) => void;
  onInspect?: (data: CompendiumInspectData) => void;
}

export const Creator2024SpeciesPicker: React.FC<Creator2024SpeciesPickerProps> = ({
  selectedSpeciesId,
  onSelectSpecies,
  onInspect,
}) => {
  const { isSpanish, t } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecies = useMemo(() => {
    if (!searchQuery.trim()) return DND_2024_SPECIES;
    const q = searchQuery.toLowerCase();
    return DND_2024_SPECIES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.descriptionEn && s.descriptionEn.toLowerCase().includes(q)) ||
        s.traits.some(
          (trait) =>
            trait.name.toLowerCase().includes(q) ||
            (trait.nameEn && trait.nameEn.toLowerCase().includes(q)) ||
            trait.desc.toLowerCase().includes(q) ||
            (trait.descEn && trait.descEn.toLowerCase().includes(q))
        )
    );
  }, [searchQuery]);

  const activeSpecies = useMemo<Species2024 | null>(() => {
    if (!selectedSpeciesId) return null;
    return DND_2024_SPECIES.find((s) => s.id === selectedSpeciesId) || null;
  }, [selectedSpeciesId]);

  const buildSpeciesInspectData = (sp: Species2024): CompendiumInspectData => ({
    id: sp.id,
    title: isSpanish ? sp.name : sp.nameEn,
    englishTitle: sp.nameEn,
    category: isSpanish ? 'Especie Canónica D&D 5.5e (2024)' : 'Canonical D&D 5.5e Species (2024)',
    iconType: 'race',
    description: isSpanish ? sp.description : (sp.descriptionEn || sp.description),
    traits: sp.traits.map((trait) => ({
      name: isSpanish ? trait.name : (trait.nameEn || trait.name),
      desc: isSpanish ? trait.desc : (trait.descEn || trait.desc),
    })),
    badges: [
      { label: isSpanish ? 'Tamaño' : 'Size', value: isSpanish ? sp.size : (sp.sizeEn || sp.size) },
      { label: isSpanish ? 'Velocidad' : 'Speed', value: isSpanish ? sp.speed : sp.speed.replace('pies', 'feet') },
      {
        label: isSpanish ? 'Visión en la Oscuridad' : 'Darkvision',
        value: sp.darkvision > 0 ? `${sp.darkvision} ${isSpanish ? 'pies' : 'ft'}` : (isSpanish ? 'No tiene' : 'None'),
      },
      {
        label: isSpanish ? 'Regla 2024' : '2024 Rule',
        value: isSpanish ? 'Aumento +2/+1 según Trasfondo' : '+2/+1 ASI determined by Background',
      },
    ],
    actionButton: {
      label: sp.id === selectedSpeciesId
        ? (isSpanish ? 'Especie Seleccionada' : 'Species Selected')
        : (isSpanish ? 'Elegir esta Especie' : 'Select this Species'),
      onClick: () => onSelectSpecies(sp.id),
      isSelected: sp.id === selectedSpeciesId,
    },
  });

  return (
    <div className="space-y-4">
      {/* 2024 Rules Notice Banner */}
      <div className="p-3.5 bg-gradient-to-r from-[#fef3c7] via-[#fffbeb] to-[#fef3c7] rounded-xl border-2 border-[#d97706]/70 flex items-start gap-3 shadow-xs">
        <Sparkles className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div className="text-xs text-[#78350f] leading-relaxed">
          <strong className="font-fantasy uppercase tracking-wide text-[#92400e]">
            {t("✨ Reglas 2024 (Player's Handbook 2024):", "✨ 2024 Rules (Player's Handbook 2024):")}
          </strong>
          <p className="mt-0.5">
            {t(
              'Las especies en 2024 definen tu biología, tamaño, velocidad y rasgos fantásticos innatos.',
              'Species in 2024 define your biology, size, speed, and innate fantasy traits.'
            )}{' '}
            <strong>
              {t(
                'Las mejoras a tus puntuaciones de característica (+2/+1 o +1/+1/+1) se eligen en tu Trasfondo (Paso 3).',
                'Ability score increases (+2/+1 or +1/+1/+1) are chosen with your Background (Step 3).'
              )}
            </strong>
          </p>
        </div>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#8c672b]" />
          <h4 className="font-fantasy font-bold text-xs uppercase text-[#4a361c] tracking-wide">
            {t('Especies Oficiales 2024', 'Official 2024 Species')} ({filteredSpecies.length} {t('Disponibles', 'Available')})
          </h4>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8c672b] absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Buscar especie o rasgo 2024...', 'Search 2024 species or trait...')}
            className="w-full bg-white border border-[#d6c4aa] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c241b] focus:outline-none focus:border-[#8c672b] shadow-inner font-serif"
          />
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[48vh] overflow-y-auto pr-1">
        {filteredSpecies.map((sp) => {
          const isSelected = sp.id === selectedSpeciesId;
          const displayName = isSpanish ? sp.name : sp.nameEn;
          const displaySize = isSpanish ? sp.size : (sp.sizeEn || sp.size);
          const displayDesc = isSpanish ? sp.description : (sp.descriptionEn || sp.description);

          return (
            <div
              key={sp.id}
              onClick={() => onSelectSpecies(sp.id)}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-[#b45309] bg-[#fffbeb] shadow-md ring-2 ring-amber-400'
                  : 'border-[#d6c4aa] bg-[#fcf9f2] hover:border-[#b88c32] hover:bg-[#faf3e8]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-fantasy font-bold text-xs sm:text-sm text-[#2c221a]">
                    {displayName}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {onInspect && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspect(buildSpeciesInspectData(sp));
                        }}
                        className="p-1 text-[#8c672b] hover:text-[#4a361c] hover:bg-[#ebdcc4] rounded transition cursor-pointer"
                        title={t("Ver ficha y detalles completos", "View full species details")}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#b45309] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#786450] font-mono mb-1.5 flex-wrap">
                  <span className="bg-white/80 px-1 py-0.2 rounded border border-[#d8c8af]">
                    {displaySize}
                  </span>
                  <span className="bg-white/80 px-1 py-0.2 rounded border border-[#d8c8af]">
                    {isSpanish ? sp.speed : sp.speed.replace('pies', 'feet')}
                  </span>
                </div>
                <p className="text-[10.5px] text-[#5c4a35] leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#ebdcc7] flex items-center justify-between text-[9px] text-[#8c672b] font-fantasy">
                <span>{sp.traits.length} {t('Rasgos', 'Traits')}</span>
                <span className="text-amber-700 font-bold">PHB 2024</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Species Detail Dossier */}
      {activeSpecies ? (
        <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fantasy font-bold text-sm text-[#2c221a]">
                  {isSpanish ? activeSpecies.name : activeSpecies.nameEn}
                </span>
                <span className="text-[10px] bg-amber-500 text-stone-900 px-1.5 py-0.2 rounded font-mono font-black uppercase">
                  {t('Especie 2024', '2024 Species')}
                </span>
              </div>
              <p className="text-[11px] text-[#5c4a35] mt-0.5">
                {isSpanish ? activeSpecies.description : (activeSpecies.descriptionEn || activeSpecies.description)}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-xs font-mono">
              {onInspect && (
                <button
                  type="button"
                  onClick={() => onInspect(buildSpeciesInspectData(activeSpecies))}
                  className="flex items-center gap-1 bg-white hover:bg-[#faf3e8] px-2.5 py-1 rounded border border-[#b88c32] text-[#8c672b] font-fantasy font-bold text-xs shadow-xs transition cursor-pointer"
                  title={t("Abrir ficha completa de la especie", "Open full species dossier")}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('Ficha Completa', 'Full Dossier')}</span>
                </button>
              )}
              <span className="bg-white px-2 py-0.5 rounded border border-[#d6c4aa] text-[#4a361c]">
                📏 {t('Tamaño: ', 'Size: ')}
                <strong>{isSpanish ? activeSpecies.size : (activeSpecies.sizeEn || activeSpecies.size)}</strong>
              </span>
              <span className="bg-white px-2 py-0.5 rounded border border-[#d6c4aa] text-[#4a361c]">
                🏃 {t('Velocidad: ', 'Speed: ')}
                <strong>{isSpanish ? activeSpecies.speed : activeSpecies.speed.replace('pies', 'feet')}</strong>
              </span>
            </div>
          </div>

          {/* Traits list - Full Display Without Cut-Off */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-fantasy font-bold uppercase tracking-wider text-[#786450] block">
                {t('Rasgos de Especie Canónicos', 'Canonical Species Traits')} ({activeSpecies.traits.length}):
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeSpecies.traits.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white/90 rounded-lg border border-[#d6c4aa] space-y-1 text-xs"
                >
                  <strong className="text-[#8c672b] font-fantasy flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {isSpanish ? trait.name : (trait.nameEn || trait.name)}
                  </strong>
                  <p className="text-[#4a3b32] text-[11px] leading-relaxed">
                    {isSpanish ? trait.desc : (trait.descEn || trait.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
          {t('Selecciona una especie de la lista para ver sus rasgos y características.', 'Select a species from the list above to view its traits and characteristics.')}
        </div>
      )}
    </div>
  );
};
