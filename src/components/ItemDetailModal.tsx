import React, { useEffect } from 'react';
import {
  findWeaponByName,
  findArmorByName,
  isItemEquipable,
  WeaponDef,
  ArmorDef,
} from '../data/weaponsAndArmorData';
import { getWeaponBadgeAsset, getArmorBadgeAsset } from '../utils/equipmentAssets';
import { EquipmentBadge } from './EquipmentBadge';
import { X, Check, Shield, Sword, AlertCircle, Package, Weight, Coins, Zap } from 'lucide-react';

interface ItemDetailModalProps {
  itemName: string | null;
  isOpen: boolean;
  onClose: () => void;
  isEquipped?: boolean;
  onToggleEquip?: (item: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  itemName,
  isOpen,
  onClose,
  isEquipped = false,
  onToggleEquip,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !itemName) return null;

  const weapon: WeaponDef | undefined = findWeaponByName(itemName);
  const armor: ArmorDef | undefined = findArmorByName(itemName);
  const isShield = armor?.category === 'shield' || itemName.toLowerCase().includes('escudo') || itemName.toLowerCase().includes('shield');
  const equipable = isItemEquipable(itemName);

  // Badge asset
  let badgeSrc = '';
  if (weapon) {
    badgeSrc = getWeaponBadgeAsset(itemName, weapon.category);
  } else if (armor || isShield) {
    badgeSrc = getArmorBadgeAsset(itemName, armor?.category || 'shield');
  } else {
    badgeSrc = '/assets/ui/coin_stat_medallion.png';
  }

  // Category labels
  let categoryLabel = 'Objeto de Equipo / Misceláneo';
  if (weapon) {
    const isMartial = weapon.category.startsWith('martial');
    const isRanged = weapon.category.includes('ranged');
    categoryLabel = `${isMartial ? 'Arma Marcial' : 'Arma Simple'} ${isRanged ? 'a Distancia' : 'Cuerpo a Cuerpo'}`;
  } else if (isShield) {
    categoryLabel = 'Escudo de Protección';
  } else if (armor) {
    const map: Record<string, string> = {
      light: 'Armadura Ligera',
      medium: 'Armadura Media',
      heavy: 'Armadura Pesada',
      shield: 'Escudo',
    };
    categoryLabel = map[armor.category] || 'Armadura';
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3] text-[#2c221a] cursor-default font-serif"
      >
        {/* Ancient Forged Leather Header */}
        <div className="p-4 px-5 bg-gradient-to-r from-[#24170e] via-[#352214] to-[#24170e] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <EquipmentBadge name={itemName} size="lg" className="w-12 h-12" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold font-fantasy text-[#f7f2ea] tracking-wide truncate">
                {itemName}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[10.5px] font-mono text-[#e8c37d] font-bold">
                  {categoryLabel}
                </span>
                {weapon?.nameEn && (
                  <span className="text-[10px] text-[#b39b7d] italic">
                    ({weapon.nameEn})
                  </span>
                )}
                {armor?.nameEn && (
                  <span className="text-[10px] text-[#b39b7d] italic">
                    ({armor.nameEn})
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1c120b] hover:bg-[#2c1d12] text-[#d4ab59] transition-transform hover:scale-110 active:scale-95 cursor-pointer border border-[#8c672b]/60 shrink-0 ml-2"
            title="Cerrar detalles"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
          {/* Tactical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* 1. Primary Stat (Damage or AC) */}
            {weapon && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  Daño Base
                </span>
                <span className="font-mono font-bold text-sm text-[#2b1f15] block mt-0.5">
                  {weapon.damageDice === '0' ? 'Especial' : weapon.damageDice}
                </span>
                <span className="text-[9px] text-[#8c672b] font-medium block">
                  {weapon.damageType}
                </span>
              </div>
            )}

            {armor && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  Defensa (CA)
                </span>
                <span className="font-mono font-bold text-sm text-[#2e5924] block mt-0.5">
                  {isShield ? `+${armor.baseAc || 2} CA` : `Base ${armor.baseAc}`}
                </span>
                <span className="text-[9px] text-[#5c4a35] block">
                  {armor.category === 'heavy'
                    ? 'Sin bono DES'
                    : armor.category === 'medium'
                    ? '+ DES (máx. 2)'
                    : armor.category === 'light'
                    ? '+ DES completo'
                    : 'Bono a escudo'}
                </span>
              </div>
            )}

            {/* 2. Weight */}
            <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
              <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                Peso
              </span>
              <span className="font-mono font-bold text-xs text-[#2b1f15] block mt-0.5">
                {weapon?.weight || armor?.weight || 'Desconocido'}
              </span>
              <span className="text-[9px] text-[#786450] block">en inventario</span>
            </div>

            {/* 3. Cost */}
            <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
              <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                Valor de Mercado
              </span>
              <span className="font-mono font-bold text-xs text-[#8c672b] block mt-0.5">
                {weapon?.cost || armor?.cost || 'Variable'}
              </span>
              <span className="text-[9px] text-[#786450] block">precio estándar</span>
            </div>

            {/* 4. Tactical Specialty (Range or Strength/Stealth) */}
            {weapon && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  Alcance
                </span>
                <span className="font-mono font-bold text-[11px] text-[#2b1f15] block mt-0.5 leading-tight">
                  {weapon.range.replace('Cuerpo a cuerpo', 'C/C')}
                </span>
              </div>
            )}

            {armor && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  Sigilo & Fuerza
                </span>
                <span className="font-mono font-bold text-[10.5px] text-[#2b1f15] block mt-0.5">
                  {armor.stealthDisadvantage ? 'Desventaja' : 'Sigilo normal'}
                </span>
                <span className="text-[9px] text-[#786450] block">
                  {armor.strengthReq > 0 ? `Fuerza ${armor.strengthReq}+` : 'Sin req. Fue'}
                </span>
              </div>
            )}
          </div>

          {/* Weapon Properties Chips */}
          {weapon && weapon.properties && weapon.properties.length > 0 && (
            <div className="p-3 bg-[#f5ede0]/90 rounded-xl border border-[#d8c8af] space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-fantasy font-bold uppercase text-[#4a361c] block">
                Propiedades Tácticas del Arma:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {weapon.properties.map((prop, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] bg-[#ebdcc4] text-[#4a361c] border border-[#b89b6a] px-2 py-0.5 rounded-md font-mono font-bold"
                  >
                    ✦ {prop}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Item Description / Lore */}
          <div className="p-3.5 bg-[#fcf6ea] rounded-xl border border-[#cbb28c] space-y-1 shadow-2xs">
            <span className="text-[10px] font-fantasy font-bold uppercase text-[#73521e] block">
              Descripción Oficial & Uso:
            </span>
            <p className="text-xs text-[#4a361c] leading-relaxed italic">
              {weapon?.description ||
                armor?.description ||
                'Objeto de equipo o provisión de aventurero. Puede ser empuñado o guardado en la mochila de viaje.'}
            </p>
          </div>

          {/* Current Equipped Status */}
          <div className="p-3 rounded-xl border flex items-center justify-between gap-2 shadow-2xs bg-[#f8f1e5] border-[#d8c8af]">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isEquipped ? 'bg-[#2d6139] ring-2 ring-[#2d6139]/40' : 'bg-[#7a6448]'
                }`}
              />
              <span className="text-xs font-fantasy font-bold text-[#2c221a]">
                Estado de porte: {isEquipped ? 'Empuñado / En Uso' : 'Guardado en Mochila'}
              </span>
            </div>
            {isEquipped && (
              <span className="text-[10px] bg-[#2d6139] text-white font-mono font-bold px-2 py-0.5 rounded">
                Activo
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 bg-[#f4ebd9] border-t border-[#d6c4aa] flex items-center justify-between gap-2 text-xs">
          {equipable && onToggleEquip ? (
            <button
              type="button"
              onClick={() => {
                onToggleEquip(itemName);
                onClose();
              }}
              className={`px-4 py-2 rounded-lg font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isEquipped
                  ? 'bg-[#5c241d] hover:bg-[#431914] text-white border border-[#8c2e28]'
                  : 'bg-[#2d6139] hover:bg-[#224b2c] text-white border border-[#1b3d23]'
              }`}
            >
              {isEquipped ? (
                <>Desequipar de Ranura Activa</>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" /> Equipar y Activar Estadísticas
                </>
              )}
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#dfcfb9] hover:bg-[#cfbe9e] text-[#382b20] rounded-lg font-fantasy font-bold transition cursor-pointer border border-[#c2b097]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
