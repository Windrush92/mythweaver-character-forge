import React, { useState, useMemo } from 'react';
import {
  ALL_5E_WEAPONS,
  WeaponDef,
  WeaponCategory,
} from '../data/weaponsAndArmorData';
import { getWeaponBadgeAsset } from '../utils/equipmentAssets';
import {
  Sword,
  Search,
  X,
  Check,
  Shield,
  Zap,
  Crosshair,
  Filter,
  Sparkles,
} from 'lucide-react';

interface WeaponPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWeapon: (weapon: WeaponDef) => void;
  filterCategory?: 'martial' | 'simple' | 'all';
  category?: 'martial' | 'simple' | 'all';
  title?: string;
  subtitle?: string;
  selectedWeaponId?: string;
  selectedWeaponName?: string;
}

export const WeaponPickerModal: React.FC<WeaponPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectWeapon,
  filterCategory,
  category = 'all',
  title,
  subtitle,
  selectedWeaponId,
  selectedWeaponName,
}) => {
  const effectiveCategory = filterCategory || category;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'martial' | 'simple' | 'melee' | 'ranged'>('all');

  const martialWeaponsCount = useMemo(() => ALL_5E_WEAPONS.filter((w) => w.category.startsWith('martial')).length, []);
  const simpleWeaponsCount = useMemo(() => ALL_5E_WEAPONS.filter((w) => w.category.startsWith('simple')).length, []);

  const filteredWeapons = useMemo(() => {
    return ALL_5E_WEAPONS.filter((w) => {
      // Strict category constraint
      if (effectiveCategory === 'martial' && !w.category.startsWith('martial')) return false;
      if (effectiveCategory === 'simple' && !w.category.startsWith('simple')) return false;

      // Sub-tab filter
      if (effectiveCategory === 'all') {
        if (activeTab === 'martial' && !w.category.startsWith('martial')) return false;
        if (activeTab === 'simple' && !w.category.startsWith('simple')) return false;
      }
      if (activeTab === 'melee' && !w.category.includes('melee')) return false;
      if (activeTab === 'ranged' && !w.category.includes('ranged')) return false;

      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = w.name.toLowerCase().includes(q) || w.nameEn.toLowerCase().includes(q);
        const matchesType = w.damageType.toLowerCase().includes(q) || w.damageDice.toLowerCase().includes(q);
        const matchesProps = w.properties.some((p) => p.toLowerCase().includes(q));
        const matchesDesc = w.description.toLowerCase().includes(q);
        return matchesName || matchesType || matchesProps || matchesDesc;
      }
      return true;
    });
  }, [effectiveCategory, activeTab, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#fcf9f2] border-2 border-[#8c672b] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2c1d11] via-[#3d2a1b] to-[#2c1d11] border-b-2 border-[#8c672b] flex items-center justify-between text-[#e8c37d] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#8c672b]/20 border border-[#8c672b] rounded-xl text-[#d4af37] shadow-inner">
              <Sword className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-lg sm:text-xl text-[#e8c37d] tracking-wide flex items-center gap-2">
                {title || (effectiveCategory === 'martial' ? 'Armería: Armas Marciales Oficiales 5e' : effectiveCategory === 'simple' ? 'Armería: Armas Simples Oficiales 5e' : 'Armería Oficial de D&D 5e')}
              </h3>
              <p className="text-xs text-[#c4a47c] mt-0.5">
                {subtitle || (effectiveCategory === 'martial' ? 'Esta elección requiere estrictamente un arma marcial oficial de 5e.' : effectiveCategory === 'simple' ? 'Esta elección requiere estrictamente un arma simple oficial de 5e.' : 'Selecciona un arma para asignarla a tu personaje con sus dados de daño, propiedades tácticas y alcance.')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#c4a47c] hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            title="Cerrar armería"
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
              placeholder="Buscar arma, dado (ej: 2d6, 1d10), propiedad..."
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

          {/* Sub-tabs strictly adapted to allowed category */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {effectiveCategory === 'martial' ? (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Todas las Marciales ({martialWeaponsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('melee')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'melee'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Cuerpo a cuerpo marcial
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ranged')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'ranged'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  A distancia marcial
                </button>
              </>
            ) : effectiveCategory === 'simple' ? (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Todas las Simples ({simpleWeaponsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('melee')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'melee'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Cuerpo a cuerpo simple
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ranged')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'ranged'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  A distancia simple
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Todas ({ALL_5E_WEAPONS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('martial')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'martial'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Marciales ({martialWeaponsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('simple')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'simple'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Simples ({simpleWeaponsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('melee')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'melee'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  Cuerpo a Cuerpo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ranged')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-fantasy font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'ranged'
                      ? 'bg-[#8c672b] text-white shadow-xs'
                      : 'bg-white/80 text-[#5c4a35] hover:bg-white border border-[#d6c4aa]'
                  }`}
                >
                  A Distancia
                </button>
              </>
            )}
          </div>
        </div>

        {/* Weapons Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#faf5ec]">
          {filteredWeapons.length === 0 ? (
            <div className="p-8 text-center text-[#786450] space-y-2">
              <Sword className="w-8 h-8 mx-auto text-[#b09e86] opacity-50" />
              <p className="font-fantasy font-bold text-sm">No se encontraron armas con ese criterio de búsqueda.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab(filterCategory === 'martial' ? 'martial' : filterCategory === 'simple' ? 'simple' : 'all');
                }}
                className="text-xs text-[#8c672b] underline font-semibold"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredWeapons.map((weapon) => {
                const isSelected =
                  selectedWeaponId === weapon.id ||
                  (!!selectedWeaponName &&
                    (weapon.name.toLowerCase().includes(selectedWeaponName.toLowerCase()) ||
                      selectedWeaponName.toLowerCase().includes(weapon.name.toLowerCase())));
                const isMartial = weapon.category.startsWith('martial');
                const isRanged = weapon.category.includes('ranged');

                return (
                  <div
                    key={weapon.id}
                    onClick={() => onSelectWeapon(weapon)}
                    className={`p-4 rounded-xl border-2 transition flex flex-col justify-between cursor-pointer group ${
                      isSelected
                        ? 'bg-[#eddcc4] border-[#8c672b] shadow-md ring-2 ring-[#8c672b]/30'
                        : 'bg-white border-[#d8c8af] hover:border-[#8c672b] hover:shadow-sm hover:bg-[#fcfaf5]'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-[#ebdcc7]">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            isMartial ? 'bg-[#3b2818] text-[#e8c37d]' : 'bg-[#e2d5c3] text-[#5c4a35]'
                          }`}
                        >
                          {isMartial ? '⚔️ Marcial' : '🗡️ Simple'} • {isRanged ? 'Distancia' : 'C/C'}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#7a6448]">
                          {weapon.cost} • {weapon.weight}
                        </span>
                      </div>

                      {/* Name & Title */}
                      <div className="mt-2.5 flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <img
                            src={getWeaponBadgeAsset(weapon.name, weapon.category)}
                            alt=""
                            className="w-10 h-10 object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform mt-0.5"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-fantasy font-bold text-sm text-[#382b20] group-hover:text-[#8c672b] transition leading-snug break-words">
                              {weapon.name}
                            </h4>
                            <span className="text-[10px] text-[#8c735d] italic block mt-0.5">{weapon.nameEn}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="p-1 bg-[#8c672b] text-white rounded-full shrink-0 shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Damage Highlight Ribbon */}
                      <div className="mt-2.5 p-2 bg-[#f5ede0] rounded-lg border border-[#e2d5c3] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#8c672b]" />
                          <span className="font-mono font-extrabold text-sm text-[#2b1f15]">
                            {weapon.damageDice === '0' ? 'Especial' : weapon.damageDice}
                          </span>
                          <span className="text-xs text-[#5c4a35] font-semibold">{weapon.damageType}</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#7a6448]">{weapon.range}</span>
                      </div>

                      {/* Properties Badges */}
                      {weapon.properties.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {weapon.properties.map((prop, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#e8dece] text-[#4a361c] px-2 py-0.5 rounded-md font-medium border border-[#d6c4aa]"
                            >
                              {prop}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-[11px] text-[#6b5845] mt-2 line-clamp-2 leading-relaxed">
                        {weapon.description}
                      </p>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="mt-3 pt-2.5 border-t border-[#ebdcc7]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectWeapon(weapon);
                        }}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-fantasy font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-[#faf6ee] hover:bg-[#8c672b] hover:text-white text-[#4a361c] border border-[#d6c4aa]'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : <Sword className="w-3.5 h-3.5" />}
                        <span>{isSelected ? 'Arma Seleccionada' : 'Elegir esta Arma'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f5ede0] border-t border-[#d6c4aa] flex items-center justify-between text-xs text-[#6b5845] shrink-0">
          <span>
            Mostrando <strong>{filteredWeapons.length}</strong> armas oficiales de D&D 5e
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#4a361c] hover:bg-[#362713] text-[#e8c37d] rounded-lg font-fantasy font-bold transition cursor-pointer shadow-xs"
          >
            Aceptar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
