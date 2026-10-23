import React from 'react';
import {
  BookOpen,
  Scroll,
  Feather,
  Backpack,
  Shirt,
  FlaskConical,
  Flame,
  Cable,
  Music,
  Wrench,
  Apple,
  Sparkles,
  Package,
} from 'lucide-react';
import { getWeaponBadgeAsset, getArmorBadgeAsset } from '../utils/equipmentAssets';
import { findWeaponByName, findArmorByName } from '../data/weaponsAndArmorData';

interface EquipmentBadgeProps {
  name: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function EquipmentBadge({
  name,
  category,
  size = 'md',
  className = '',
}: EquipmentBadgeProps) {
  if (!name) return null;
  const q = name.toLowerCase().trim();

  // Size definitions
  const sizeClasses =
    size === 'sm'
      ? 'w-6 h-6 min-w-[24px]'
      : size === 'lg'
      ? 'w-9 h-9 min-w-[36px]'
      : 'w-7.5 h-7.5 min-w-[30px]';

  const iconSizes =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  // 1. Weapon check
  const weaponDef = findWeaponByName(name);
  const isWeapon =
    !!weaponDef ||
    /espada|daga|cuchillo|hacha|arco|ballesta|maza|martillo|lanza|bastón|baston|quarterstaff|jabalina|tridente|alabarda|flail|rapier|scimitar|dagger|sword|axe|bow|crossbow|mace|hammer|spear|staff/i.test(
      q
    );

  if (isWeapon) {
    const badgeSrc = getWeaponBadgeAsset(name, category || weaponDef?.category);
    return (
      <img
        src={badgeSrc}
        alt={name}
        draggable={false}
        className={`${sizeClasses} object-contain shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none ${className}`}
      />
    );
  }

  // 2. Armor & Shield check
  const armorDef = findArmorByName(name);
  const isShield =
    /escudo|shield|broquel|pavés/i.test(q) && !/hechizo|conjuro|fe/i.test(q);
  const isArmor = !!armorDef || isShield;

  if (isArmor) {
    const badgeSrc = getArmorBadgeAsset(name, category || armorDef?.category);
    return (
      <img
        src={badgeSrc}
        alt={name}
        draggable={false}
        className={`${sizeClasses} object-contain shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none ${className}`}
      />
    );
  }

  // 3. Thematic Non-Combat Gear & Adventuring Items
  let IconComponent = Package;

  if (/libro|grimorio|tomo|book|grimoire|diario|notas|manual/i.test(q)) {
    IconComponent = BookOpen;
  } else if (/pergamino|papel|scroll|mapa|carta|documento|contrato/i.test(q)) {
    IconComponent = Scroll;
  } else if (/pluma|tinta|quill|ink|escritura|caligraf/i.test(q)) {
    IconComponent = Feather;
  } else if (
    /túnica|tunica|robe|ropas|ropa|vestidura|vestimenta|capa|cloak|botas|boots|sombrero|disfraz|hábito/i.test(
      q
    )
  ) {
    IconComponent = Shirt;
  } else if (
    /poción|pocion|potion|frasco|flask|vial|botella|bottle|aceite|oil|agua bendita|ungüento|veneno|antídoto/i.test(
      q
    )
  ) {
    IconComponent = FlaskConical;
  } else if (
    /antorcha|torch|linterna|lantern|vela|candle|yesquero|tinderbox|lámpara|lampara|fuego/i.test(
      q
    )
  ) {
    IconComponent = Flame;
  } else if (/cuerda|rope|cadena|chain|gancho|grappling/i.test(q)) {
    IconComponent = Cable;
  } else if (
    /instrumento|laúd|laud|lute|flauta|flute|lira|lyre|tambor|drum|viola|cuerno|horn|gaita|arpa|harp|campanilla/i.test(
      q
    )
  ) {
    IconComponent = Music;
  } else if (
    /herramientas|tools|útiles|utiles|kit|artesano|ladrón|ladron|ganzúa|ganzua|palanca|pala|martillo|clavos/i.test(
      q
    )
  ) {
    IconComponent = Wrench;
  } else if (
    /raciones|racion|rations|comida|food|odre|waterskin|pan|carne|provisión|provision/i.test(
      q
    )
  ) {
    IconComponent = Apple;
  } else if (
    /moneda|oro|gold|plata|silver|gema|gem|joya|reliquia|símbolo sagrado|simbolo|foco|componente|amuleto|anillo|ring|medalla/i.test(
      q
    )
  ) {
    IconComponent = Sparkles;
  } else if (
    /mochila|backpack|bolsa|bolsita|pouch|saco|sack|aljaba|quiver|estuche|case|zurrón|zurron|funda|petate/i.test(
      q
    )
  ) {
    IconComponent = Backpack;
  }

  return (
    <div
      className={`${sizeClasses} rounded-lg bg-gradient-to-br from-[#3d2716] via-[#24150b] to-[#180e07] border border-[#a88243]/80 flex items-center justify-center text-[#ffd56b] shadow-[0_2px_5px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,225,140,0.3)] shrink-0 select-none ${className}`}
      title={name}
    >
      <IconComponent className={`${iconSizes} drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]`} />
    </div>
  );
}
