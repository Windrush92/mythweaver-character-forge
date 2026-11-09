import React from 'react';
import { DND_2024_WEAPON_MASTERIES, DND_2024_WEAPONS, WeaponMasteryDefinition } from '../data/dnd2024';
import { useLanguageStore } from '../hooks/useLanguageStore';
import { Sword, Star, Check, Info } from 'lucide-react';

interface Creator2024WeaponMasteryPickerProps {
  classNameString: string;
  characterLevel: number;
  selectedMasteries: string[];
  onToggleMastery: (masteryName: string) => void;
}

export const Creator2024WeaponMasteryPicker: React.FC<Creator2024WeaponMasteryPickerProps> = ({
  classNameString,
  characterLevel,
  selectedMasteries,
  onToggleMastery,
}) => {
  const { isSpanish, t } = useLanguageStore();

  const norm = classNameString.toLowerCase();
  const isFighter = norm.includes('guerrero') || norm.includes('fighter');
  const isBarbarian = norm.includes('bárbaro') || norm.includes('barbarian');
  const isPaladin = norm.includes('paladín') || norm.includes('paladin');
  const isRanger = norm.includes('explorador') || norm.includes('ranger');
  const isRogue = norm.includes('pícaro') || norm.includes('rogue');

  const isMartial = isFighter || isBarbarian || isPaladin || isRanger || isRogue;

  // Mastery limit calculation per PHB 2024 rules
  let maxMasteries = 0;
  if (isFighter) {
    if (characterLevel >= 16) maxMasteries = 6;
    else if (characterLevel >= 10) maxMasteries = 5;
    else if (characterLevel >= 4) maxMasteries = 4;
    else maxMasteries = 3;
  } else if (isBarbarian || isPaladin || isRanger || isRogue) {
    maxMasteries = 2;
  }

  if (!isMartial) {
    return (
      <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d6c4aa] flex items-center gap-3 text-xs text-[#5c4a35]">
        <Info className="w-4 h-4 text-[#8c672b] shrink-0" />
        <span>
          {t(
            'La característica táctica Maestría en Armas (Weapon Mastery) es exclusiva de las clases marciales en D&D 2024 (Guerrero, Bárbaro, Paladín, Explorador, Pícaro).',
            'The Weapon Mastery tactical feature is exclusive to martial classes in D&D 2024 (Barbarian, Fighter, Paladin, Ranger, Rogue).'
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#fcf9f2] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc7] pb-2">
        <div className="flex items-center gap-2">
          <Sword className="w-4 h-4 text-[#8c672b]" />
          <div>
            <h5 className="font-fantasy font-bold text-xs uppercase text-[#4a361c]">
              {t('Maestría en Armas 2024 (Weapon Mastery)', '2024 Weapon Mastery')}
            </h5>
            <p className="text-[11px] text-[#6e5c4a]">
              {t(
                `Como ${classNameString}, puedes dominar las propiedades especiales de tus armas predilectas.`,
                `As a ${classNameString}, you master special weapon properties on your favored armaments.`
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#8c672b] text-white">
            {selectedMasteries.length} / {maxMasteries} {t('seleccionadas', 'selected')}
          </span>
        </div>
      </div>

      {/* Grid of the 8 Masteries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {DND_2024_WEAPON_MASTERIES.map((m) => {
          const isSelected = selectedMasteries.includes(m.name) || selectedMasteries.includes(m.nameEn);
          const displayName = isSpanish ? m.name : m.nameEn;
          const displayDesc = isSpanish ? m.desc : (m.descEn || m.desc);
          const weaponsWithMastery = DND_2024_WEAPONS.filter((w) =>
            w.mastery.toLowerCase().includes(m.name.split('(')[0].trim().toLowerCase()) ||
            (w.masteryEn && w.masteryEn.toLowerCase().includes(m.nameEn.toLowerCase()))
          );

          return (
            <div
              key={m.name}
              onClick={() => onToggleMastery(m.name)}
              className={`p-3 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between text-xs ${
                isSelected
                  ? 'border-[#b45309] bg-[#fffbeb] shadow-sm ring-1 ring-amber-400'
                  : 'border-[#d6c4aa] bg-white hover:border-[#b88c32] hover:bg-[#faf5ed]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <strong className="text-[#8c672b] font-fantasy text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {displayName}
                  </strong>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-[#b45309] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-[10.5px] text-[#4a3b32] leading-relaxed mb-2">
                  {displayDesc}
                </p>
              </div>

              <div className="pt-1.5 border-t border-[#ebdcc7] text-[9.5px] text-[#786450]">
                <span className="font-mono font-bold text-[#8c672b]">{t('Armas: ', 'Weapons: ')}</span>
                <span className="italic block leading-snug">
                  {weaponsWithMastery.map((w) => (isSpanish ? w.name : w.nameEn)).join(', ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
