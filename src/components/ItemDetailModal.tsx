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
import { useLanguageStore } from '../hooks/useLanguageStore';
import { localizeReactNode, localizeString } from '../utils/dndEnglishTranslator';
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
  const { isSpanish } = useLanguageStore();

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
    badgeSrc = './assets/ui/coin_stat_medallion.png';
  }

  // Category labels
  let categoryLabel = isSpanish ? 'Objeto de Equipo / Misceláneo' : 'Equipment / Adventuring Gear';
  if (weapon) {
    const isMartial = weapon.category.startsWith('martial');
    const isRanged = weapon.category.includes('ranged');
    categoryLabel = isSpanish
      ? `${isMartial ? 'Arma Marcial' : 'Arma Simple'} ${isRanged ? 'a Distancia' : 'Cuerpo a Cuerpo'}`
      : `${isMartial ? 'Martial' : 'Simple'} ${isRanged ? 'Ranged' : 'Melee'} Weapon`;
  } else if (isShield) {
    categoryLabel = isSpanish ? 'Escudo de Protección' : 'Protective Shield';
  } else if (armor) {
    const mapEs: Record<string, string> = {
      light: 'Armadura Ligera',
      medium: 'Armadura Media',
      heavy: 'Armadura Pesada',
      shield: 'Escudo',
    };
    const mapEn: Record<string, string> = {
      light: 'Light Armor',
      medium: 'Medium Armor',
      heavy: 'Heavy Armor',
      shield: 'Shield',
    };
    categoryLabel = isSpanish ? (mapEs[armor.category] || 'Armadura') : (mapEn[armor.category] || 'Armor');
  }

  return localizeReactNode(
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
                {isSpanish ? itemName : (weapon?.nameEn || armor?.nameEn || localizeString(itemName, false))}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[10.5px] font-mono text-[#e8c37d] font-bold">
                  {categoryLabel}
                </span>
                {isSpanish && weapon?.nameEn && (
                  <span className="text-[10px] text-[#b39b7d] italic">
                    ({weapon.nameEn})
                  </span>
                )}
                {isSpanish && armor?.nameEn && (
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
            title={isSpanish ? 'Cerrar detalles' : 'Close details'}
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
                  {isSpanish ? 'Daño Base' : 'Base Damage'}
                </span>
                <span className="font-mono font-bold text-sm text-[#2b1f15] block mt-0.5">
                  {weapon.damageDice === '0' ? (isSpanish ? 'Especial' : 'Special') : weapon.damageDice}
                </span>
                <span className="text-[9px] text-[#8c672b] font-medium block">
                  {isSpanish ? weapon.damageType : localizeString(weapon.damageType, false)}
                </span>
              </div>
            )}

            {armor && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  {isSpanish ? 'Defensa (CA)' : 'Defense (AC)'}
                </span>
                <span className="font-mono font-bold text-sm text-[#2e5924] block mt-0.5">
                  {isShield ? `+${armor.baseAc || 2} ${isSpanish ? 'CA' : 'AC'}` : `Base ${armor.baseAc}`}
                </span>
                <span className="text-[9px] text-[#5c4a35] block">
                  {armor.category === 'heavy'
                    ? (isSpanish ? 'Sin bono DES' : 'No DEX bonus')
                    : armor.category === 'medium'
                    ? (isSpanish ? '+ DES (máx. 2)' : '+ DEX (max 2)')
                    : armor.category === 'light'
                    ? (isSpanish ? '+ DES completo' : '+ Full DEX')
                    : (isSpanish ? 'Bono a escudo' : 'Shield bonus')}
                </span>
              </div>
            )}

            {/* 2. Weight */}
            <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
              <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                {isSpanish ? 'Peso' : 'Weight'}
              </span>
              <span className="font-mono font-bold text-xs text-[#2b1f15] block mt-0.5">
                {weapon?.weight || armor?.weight || (isSpanish ? 'Desconocido' : 'Unknown')}
              </span>
              <span className="text-[9px] text-[#786450] block">{isSpanish ? 'en inventario' : 'in inventory'}</span>
            </div>

            {/* 3. Cost */}
            <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
              <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                {isSpanish ? 'Valor de Mercado' : 'Market Value'}
              </span>
              <span className="font-mono font-bold text-xs text-[#8c672b] block mt-0.5">
                {isSpanish ? (weapon?.cost || armor?.cost || 'Variable') : (weapon?.cost || armor?.cost || 'Variable').replace(/po/g, 'gp').replace(/pp/g, 'sp').replace(/pc/g, 'cp')}
              </span>
              <span className="text-[9px] text-[#786450] block">{isSpanish ? 'precio estándar' : 'standard price'}</span>
            </div>

            {/* 4. Tactical Specialty (Range or Strength/Stealth) */}
            {weapon && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  {isSpanish ? 'Alcance' : 'Range'}
                </span>
                <span className="font-mono font-bold text-[11px] text-[#2b1f15] block mt-0.5 leading-tight">
                  {isSpanish ? weapon.range.replace('Cuerpo a cuerpo', 'C/C') : localizeString(weapon.range, false)}
                </span>
              </div>
            )}

            {armor && (
              <div className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#d8c8af] text-center shadow-2xs">
                <span className="text-[9.5px] font-fantasy font-bold uppercase text-[#73521e] block">
                  {isSpanish ? 'Sigilo & Fuerza' : 'Stealth & STR'}
                </span>
                <span className="font-mono font-bold text-[10.5px] text-[#2b1f15] block mt-0.5">
                  {armor.stealthDisadvantage ? (isSpanish ? 'Desventaja' : 'Disadvantage') : (isSpanish ? 'Sigilo normal' : 'Normal Stealth')}
                </span>
                <span className="text-[9px] text-[#786450] block">
                  {armor.strengthReq > 0 ? `${isSpanish ? 'Fuerza' : 'STR'} ${armor.strengthReq}+` : (isSpanish ? 'Sin req. Fue' : 'No STR req.')}
                </span>
              </div>
            )}
          </div>

          {/* Weapon Properties Chips */}
          {weapon && weapon.properties && weapon.properties.length > 0 && (
            <div className="p-3 bg-[#f5ede0]/90 rounded-xl border border-[#d8c8af] space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-fantasy font-bold uppercase text-[#4a361c] block">
                {isSpanish ? 'Propiedades Tácticas del Arma:' : 'Tactical Weapon Properties:'}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {weapon.properties.map((prop, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] bg-[#ebdcc4] text-[#4a361c] border border-[#b89b6a] px-2 py-0.5 rounded-md font-mono font-bold"
                  >
                    ✦ {isSpanish ? prop : localizeString(prop, false)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Item Description / Lore */}
          <div className="p-3.5 bg-[#fcf6ea] rounded-xl border border-[#cbb28c] space-y-1 shadow-2xs">
            <span className="text-[10px] font-fantasy font-bold uppercase text-[#73521e] block">
              {isSpanish ? 'Descripción Oficial & Uso:' : 'Official Description & Use:'}
            </span>
            <p className="text-xs text-[#4a361c] leading-relaxed italic">
              {weapon?.description
                ? (isSpanish ? weapon.description : localizeString(weapon.description, false))
                : armor?.description
                ? (isSpanish ? armor.description : localizeString(armor.description, false))
                : (isSpanish
                  ? 'Objeto de equipo o provisión de aventurero. Puede ser empuñado o guardado en la mochila de viaje.'
                  : 'Adventuring gear or equipment item. Can be wielded or stored in your travel pack.')}
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
                {isSpanish ? 'Estado de porte:' : 'Carry status:'} {isEquipped ? (isSpanish ? 'Empuñado / En Uso' : 'Equipped / In Use') : (isSpanish ? 'Guardado en Mochila' : 'Stored in Backpack')}
              </span>
            </div>
            {isEquipped && (
              <span className="text-[10px] bg-[#2d6139] text-white font-mono font-bold px-2 py-0.5 rounded">
                {isSpanish ? 'Activo' : 'Active'}
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
                <>{isSpanish ? 'Desequipar de Ranura Activa' : 'Unequip from Active Slot'}</>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" /> {isSpanish ? 'Equipar y Activar Estadísticas' : 'Equip & Activate Stats'}
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
            {isSpanish ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>,
    isSpanish
  ) as React.ReactElement;
};
