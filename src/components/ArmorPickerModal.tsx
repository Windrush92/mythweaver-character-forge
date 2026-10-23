import React, { useState, useMemo } from 'react';
import { ALL_5E_ARMORS, ArmorDef, ArmorCategory } from '../data/weaponsAndArmorData';
import { getArmorBadgeAsset } from '../utils/equipmentAssets';
import { Shield, Search, X, Check, Filter, AlertCircle } from 'lucide-react';

interface ArmorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArmor: (armor: ArmorDef) => void;
  filterCategory?: ArmorCategory | 'all';
  title?: string;
  subtitle?: string;
  selectedArmorId?: string;
  selectedArmorName?: string;
}

export const ArmorPickerModal: React.FC<ArmorPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectArmor,
  filterCategory = 'all',
  title,
  subtitle,
  selectedArmorId,
  selectedArmorName,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ArmorCategory | 'all'>(filterCategory);

  const countsByCategory = useMemo(() => {
    return {
      all: ALL_5E_ARMORS.length,
      light: ALL_5E_ARMORS.filter((a) => a.category === 'light').length,
      medium: ALL_5E_ARMORS.filter((a) => a.category === 'medium').length,
      heavy: ALL_5E_ARMORS.filter((a) => a.category === 'heavy').length,
      shield: ALL_5E_ARMORS.filter((a) => a.category === 'shield').length,
    };
  }, []);

  const filteredArmors = useMemo(() => {
    return ALL_5E_ARMORS.filter((armor) => {
      // Category tab filter
      if (activeTab !== 'all' && armor.category !== activeTab) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName =
          armor.name.toLowerCase().includes(q) || armor.nameEn.toLowerCase().includes(q);
        const matchesAc = `ca ${armor.baseAc}`.includes(q) || `${armor.baseAc}` === q;
        const matchesDesc = armor.description.toLowerCase().includes(q);
        const matchesCat =
          (armor.category === 'light' && 'ligera'.includes(q)) ||
          (armor.category === 'medium' && 'media'.includes(q)) ||
          (armor.category === 'heavy' && 'pesada'.includes(q)) ||
          (armor.category === 'shield' && 'escudo'.includes(q));
        return matchesName || matchesAc || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [activeTab, searchTerm]);

  if (!isOpen) return null;

  const getCategoryLabel = (cat: ArmorCategory) => {
    switch (cat) {
      case 'light':
        return 'Armadura Ligera';
      case 'medium':
        return 'Armadura Media';
      case 'heavy':
        return 'Armadura Pesada';
      case 'shield':
        return 'Escudo';
    }
  };

  const getAcFormula = (armor: ArmorDef) => {
    if (armor.category === 'shield') return '+2 CA';
    if (armor.dexBonus === 'full') return `${armor.baseAc} + Des`;
    if (armor.dexBonus === 'max2') return `${armor.baseAc} + Des (máx 2)`;
    return `${armor.baseAc} (Fija)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#fcf9f2] border-2 border-[#8c672b] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2c1d11] via-[#3d2a1b] to-[#2c1d11] border-b-2 border-[#8c672b] flex items-center justify-between text-[#e8c37d] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#8c672b]/20 border border-[#8c672b] rounded-xl text-[#d4af37] shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-lg sm:text-xl text-[#e8c37d] tracking-wide flex items-center gap-2">
                {title || 'Armería: Catálogo Oficial de Armaduras y Escudos 5e'}
              </h3>
              <p className="text-xs text-[#c4a47c] mt-0.5">
                {subtitle ||
                  'Selecciona una armadura o escudo del compendio oficial de D&D 5e para añadirlo a tu inventario y calcular tu Clase de Armadura (CA).'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#c4a47c] hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            title="Cerrar catálogo de armaduras"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs Toolbar */}
        <div className="p-3 sm:p-4 bg-[#f4ebd9] border-b border-[#d6c4aa] flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8c672b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar armadura, CA, sigilo, peso..."
              className="w-full bg-white border border-[#d6c4aa] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#3d2a1b] placeholder-[#8c672b]/60 focus:outline-none focus:border-[#8c672b] focus:ring-1 focus:ring-[#8c672b]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8c672b] hover:text-[#5c4a35]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Todas ({countsByCategory.all})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('light')}
              className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'light'
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Ligeras ({countsByCategory.light})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('medium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'medium'
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Medias ({countsByCategory.medium})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('heavy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'heavy'
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Pesadas ({countsByCategory.heavy})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shield')}
              className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'shield'
                  ? 'bg-[#8c672b] text-white shadow-xs'
                  : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
              }`}
            >
              Escudos ({countsByCategory.shield})
            </button>
          </div>
        </div>

        {/* Armors Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-[#fcf9f2] space-y-3">
          {filteredArmors.length === 0 ? (
            <div className="p-8 text-center bg-[#f5ede0] rounded-2xl border border-dashed border-[#d8c8af] space-y-2">
              <Shield className="w-8 h-8 text-[#8c672b]/50 mx-auto" />
              <p className="text-sm font-fantasy font-bold text-[#4a361c]">
                No se encontraron armaduras con ese criterio de búsqueda.
              </p>
              <p className="text-xs text-[#7a6448]">
                Prueba con otro término como "cuero", "placas", "malla" o "escudo".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredArmors.map((armor) => {
                const isSelected =
                  (selectedArmorId && armor.id === selectedArmorId) ||
                  (selectedArmorName &&
                    (armor.name.toLowerCase().includes(selectedArmorName.toLowerCase()) ||
                      selectedArmorName.toLowerCase().includes(armor.name.toLowerCase())));

                return (
                  <div
                    key={armor.id}
                    onClick={() => onSelectArmor(armor)}
                    className={`group relative rounded-xl border-2 p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#eef5e9] border-[#4b823b] shadow-md ring-2 ring-[#4b823b]/30'
                        : 'bg-[#faf6ee] border-[#d8c8af] hover:border-[#8c672b] hover:shadow-md hover:bg-white'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Medallion + Full Name & Category */}
                      <div className="flex items-start gap-2.5">
                        <img
                          src={getArmorBadgeAsset(armor.name, armor.category)}
                          alt=""
                          className="w-10 h-10 object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform mt-0.5"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-fantasy font-bold text-sm text-[#2c221a] group-hover:text-[#8c672b] transition leading-snug break-words">
                            {armor.name}
                          </h4>
                          <span className="text-[10px] text-[#7a6448] font-mono block mt-0.5">
                            {getCategoryLabel(armor.category)} • {armor.cost}
                          </span>
                        </div>
                      </div>

                      {/* Tactical Specs Badges (including AC highlight) */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                        {/* AC Badge */}
                        <div className="px-2.5 py-0.5 rounded bg-[#2e5924] text-white font-mono font-bold text-xs shrink-0 shadow-xs flex items-center gap-1">
                          <Shield className="w-3.5 h-3.5" />
                          <span>{getAcFormula(armor)}</span>
                        </div>

                        <span className="text-[10px] bg-[#f0e6d6] text-[#5e4e3e] px-2 py-0.5 rounded font-mono border border-[#dbcbb2]">
                          ⚖️ Peso: {armor.weight}
                        </span>

                        {armor.strengthReq > 0 ? (
                          <span className="text-[10px] bg-[#f8dcd9] text-[#8c2e28] px-2 py-0.5 rounded font-mono font-bold border border-[#e8b5b0]">
                            Fuerza mín: {armor.strengthReq}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#e3eedb] text-[#244b1c] px-2 py-0.5 rounded font-mono border border-[#c2dab4]">
                            Sin req. Fza
                          </span>
                        )}

                        {armor.stealthDisadvantage ? (
                          <span className="text-[10px] bg-[#fbe7ce] text-[#8c5017] px-2 py-0.5 rounded font-mono font-bold border border-[#f0cfa6] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Sigilo: Desventaja
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#e3eedb] text-[#244b1c] px-2 py-0.5 rounded font-mono border border-[#c2dab4]">
                            Sigilo normal
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5c4a35] mt-2.5 leading-relaxed line-clamp-3">
                        {armor.description}
                      </p>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="mt-3.5 pt-2.5 border-t border-[#e8dcc9] flex items-center justify-between">
                      <span className="text-[11px] text-[#7a6448] font-mono">
                        {armor.nameEn}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectArmor(armor);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                          isSelected
                            ? 'bg-[#2e5924] text-white hover:bg-[#23451b]'
                            : 'bg-[#8c672b] text-white hover:bg-[#73521e]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Equipado
                          </>
                        ) : (
                          <>
                            <Shield className="w-3.5 h-3.5" /> Elegir Armadura
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#f4ebd9] border-t border-[#d6c4aa] flex items-center justify-between text-xs text-[#5c4a35] shrink-0">
          <span>
            Mostrando <strong>{filteredArmors.length}</strong> de {ALL_5E_ARMORS.length} armaduras y escudos
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#dfcfb9] hover:bg-[#cfbe9e] text-[#382b20] rounded-lg font-fantasy font-bold transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
