import React, { useState } from 'react';
import { ALL_5E_SKILLS, SkillDefinition } from '../data/characterCreatorData';
import { Info } from 'lucide-react';

interface SkillTooltipProps {
  skillName: string;
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom';
}

export const SkillTooltip: React.FC<SkillTooltipProps> = ({
  skillName,
  children,
  className = '',
  side = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Normalize match
  const cleanName = skillName.trim().toLowerCase();
  const definition: SkillDefinition | undefined = ALL_5E_SKILLS.find(
    (s) => s.name.toLowerCase() === cleanName || cleanName.includes(s.name.toLowerCase())
  );

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}

      {isOpen && definition && (
        <div
          role="tooltip"
          className={`absolute left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-[#1e150f] text-[#f7f2ea] rounded-xl border border-[#c59b27] shadow-2xl pointer-events-none transition-all duration-200 animate-fadeIn text-left font-serif ${
            side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {/* Arrow */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1e150f] border-r border-b border-[#c59b27] rotate-45 ${
              side === 'top' ? '-bottom-1.5' : '-top-1.5 rotate-[225deg]'
            }`}
          />

          <div className="flex items-center justify-between gap-2 border-b border-[#5a4325] pb-1.5 mb-1.5">
            <span className="font-fantasy font-bold text-xs text-[#d4ab59] flex items-center gap-1">
              <Info className="w-3 h-3 text-[#c59b27]" />
              {definition.name}
            </span>
            <span className="text-[10px] bg-[#3a2c1f] text-[#c0ad97] font-mono px-1.5 py-0.5 rounded border border-[#5a4325]">
              {definition.abilityLabel} ({definition.ability.toUpperCase()})
            </span>
          </div>

          <p className="text-[11px] text-[#e0cfbe] leading-relaxed">
            {definition.description}
          </p>
        </div>
      )}
    </div>
  );
};
