import React from 'react';
import { User, ZoomIn } from 'lucide-react';
import { AvatarFrameStyle } from '../types';
import { getAvatarFrame } from '../data/avatarFramesData';

interface FantasyAvatarFrameProps {
  avatarUrl?: string;
  name?: string;
  level?: number;
  frameStyle?: AvatarFrameStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  onClick?: () => void;
  showLevelBadge?: boolean;
  showExpandHint?: boolean;
  interactive?: boolean;
  className?: string;
  avatarScale?: number;
  avatarOffsetY?: number;
}

export const FantasyAvatarFrame: React.FC<FantasyAvatarFrameProps> = ({
  avatarUrl,
  name = 'Aventurero',
  level,
  frameStyle = 'laurel-wreath',
  size = 'md',
  onClick,
  showLevelBadge = true,
  showExpandHint = false,
  interactive = true,
  className = '',
  avatarScale,
  avatarOffsetY,
}) => {
  const frame = getAvatarFrame(frameStyle);

  // Dimensions configuration per size
  const sizeConfig = {
    sm: {
      box: 'w-10 h-10',
      badgeText: 'text-[8px] px-1 -bottom-1 -right-1',
      iconSize: 'w-5 h-5',
    },
    md: {
      box: 'w-14 h-14 sm:w-16 sm:h-16',
      badgeText: 'text-[9.5px] px-1.5 py-0.2 -bottom-1 -right-1',
      iconSize: 'w-7 h-7',
    },
    lg: {
      box: 'w-20 h-20',
      badgeText: 'text-xs px-2 py-0.5 -bottom-2 -right-2',
      iconSize: 'w-10 h-10',
    },
    xl: {
      box: 'w-36 h-36',
      badgeText: 'text-xs px-2.5 py-0.5 -bottom-2 -right-2',
      iconSize: 'w-16 h-16',
    },
    '2xl': {
      box: 'w-64 h-64 sm:w-72 sm:h-72',
      badgeText: 'text-sm px-3 py-1 -bottom-3 -right-2',
      iconSize: 'w-28 h-28',
    },
  }[size];

  // Specific clipping geometry for inner avatar based on frame shapeType
  const getInnerContainerStyle = () => {
    switch (frame.shapeType) {
      case 'shield':
        return {
          className: 'absolute inset-[9%] overflow-hidden',
          style: { clipPath: 'polygon(50% 97%, 89% 79%, 89% 14%, 50% 7%, 11% 14%, 11% 79%)' },
        };
      case 'octagon':
        return {
          className: 'absolute inset-[9%] overflow-hidden',
          style: { clipPath: 'polygon(30% 3%, 70% 3%, 97% 30%, 97% 70%, 70% 97%, 30% 97%, 3% 70%, 3% 30%)' },
        };
      case 'arch':
        return {
          className: 'absolute inset-[9%] rounded-t-full rounded-b-xl overflow-hidden',
          style: {},
        };
      case 'squircle':
        return {
          className: 'absolute inset-[11.5%] rounded-xl overflow-hidden',
          style: {},
        };
      case 'circle':
      default:
        return {
          className: 'absolute inset-[11.5%] rounded-full overflow-hidden',
          style: {},
        };
    }
  };

  const innerStyle = getInnerContainerStyle();

  // Distinct Shape SVG Vector or Asset PNG Overlay
  const renderFrameSvg = () => {
    if (frame.assetUrl) {
      return (
        <img
          src={frame.assetUrl}
          alt={frame.name}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] select-none"
        />
      );
    }

    switch (frame.id) {
      // 1. CORONA DE LAURELES HEROICA
      case 'laurel-wreath':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            <defs>
              <linearGradient id="laurelGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>
            </defs>
            {/* Guide circle ring */}
            <circle cx="50" cy="50" r="39" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
            {/* Left branch stem */}
            <path d="M 49,90 C 24,89 10,72 10,50 C 10,28 24,11 47,8" fill="none" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" />
            {/* Right branch stem */}
            <path d="M 51,90 C 76,89 90,72 90,50 C 90,28 76,11 53,8" fill="none" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" />

            {/* Left laurel leaves pairs */}
            <path d="M 44,87 C 40,84 37,86 42,90 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 36,83 C 31,80 30,83 35,87 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 28,76 C 22,72 21,76 26,80 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 20,67 C 14,63 13,67 18,71 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 13,56 C 8,52 8,57 13,60 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 10,44 C 5,42 6,47 11,48 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 12,32 C 8,30 10,25 15,30 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 18,22 C 14,20 18,15 22,21 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 27,14 C 24,11 29,8 32,14 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 38,9 C 35,6 40,4 42,9 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 46,7 C 45,3 48,3 48,7 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />

            {/* Right laurel leaves pairs */}
            <path d="M 56,87 C 60,84 63,86 58,90 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 64,83 C 69,80 70,83 65,87 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 72,76 C 78,72 79,76 74,80 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 80,67 C 86,63 87,67 82,71 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 87,56 C 92,52 92,57 87,60 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 90,44 C 95,42 94,47 89,48 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 88,32 C 92,30 90,25 85,30 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 82,22 C 86,20 82,15 78,21 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 73,14 C 76,11 71,8 68,14 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 62,9 C 65,6 60,4 58,9 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />
            <path d="M 54,7 C 55,3 52,3 52,7 Z" fill="url(#laurelGold)" stroke="#854d0e" strokeWidth="0.5" />

            {/* Laurel Golden Berries */}
            <circle cx="28" cy="74" r="1.3" fill="#fef08a" stroke="#a16207" strokeWidth="0.4" />
            <circle cx="16" cy="53" r="1.3" fill="#fef08a" stroke="#a16207" strokeWidth="0.4" />
            <circle cx="21" cy="27" r="1.3" fill="#fef08a" stroke="#a16207" strokeWidth="0.4" />
            <circle cx="72" cy="74" r="1.3" fill="#fef08a" stroke="#a16207" strokeWidth="0.4" />
            <circle cx="84" cy="53" r="1.3" fill="#fef08a" stroke="#a16207" strokeWidth="0.4" />
            <circle cx="79" cy="27" r="1.3" fill="#fef08a" stroke="#a16207" strokeWidth="0.4" />

            {/* Bottom ceremonial ribbon bow */}
            <path d="M 50,91 C 42,86 40,94 48,94 C 50,94 50,91 50,91" fill="#fde047" stroke="#854d0e" strokeWidth="0.8" />
            <path d="M 50,91 C 58,86 60,94 52,94 C 50,94 50,91 50,91" fill="#fde047" stroke="#854d0e" strokeWidth="0.8" />
            <circle cx="50" cy="91" r="2.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.7" />
            <path d="M 47,93 L 42,99 L 45,99 L 49,94 Z" fill="#d97706" />
            <path d="M 53,93 L 58,99 L 55,99 L 51,94 Z" fill="#d97706" />
          </svg>
        );

      // 2. ENRAMADA DE FLORES & ROSAS
      case 'blooming-rose':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {/* Curving green branch */}
            <circle cx="50" cy="50" r="39" fill="none" stroke="#15803d" strokeWidth="3" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="5 3" />

            {/* Leaves around */}
            <path d="M 12,38 Q 6,36 8,30 Q 12,28 14,34 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 12,62 Q 6,64 8,70 Q 12,72 14,66 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 88,38 Q 94,36 92,30 Q 88,28 86,34 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 88,62 Q 94,64 92,70 Q 88,72 86,66 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 38,12 Q 36,6 30,8 Q 28,12 34,14 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 62,12 Q 64,6 70,8 Q 72,12 66,14 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 38,88 Q 36,94 30,92 Q 28,88 34,86 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />
            <path d="M 62,88 Q 64,94 70,92 Q 72,88 66,86 Z" fill="#16a34a" stroke="#14532d" strokeWidth="0.5" />

            {/* Top-Left Blooming Rose */}
            <g transform="translate(16, 16)">
              <circle cx="0" cy="0" r="8" fill="#e11d48" stroke="#881337" strokeWidth="0.7" />
              <path d="M -4,-2 C -2,-6 2,-6 4,-2 C 4,3 0,5 -4,3 Z" fill="#f43f5e" />
              <path d="M -2,1 C -1,-3 2,-3 3,0 C 2,2 -1,3 -2,1 Z" fill="#fda4af" />
              <circle cx="0" cy="0" r="1.8" fill="#ffe4e6" />
              <path d="M -6,-4 L -10,-8 L -4,-8 Z" fill="#15803d" />
            </g>

            {/* Bottom-Right Blooming Rose */}
            <g transform="translate(84, 84)">
              <circle cx="0" cy="0" r="8" fill="#e11d48" stroke="#881337" strokeWidth="0.7" />
              <path d="M -4,-2 C -2,-6 2,-6 4,-2 C 4,3 0,5 -4,3 Z" fill="#f43f5e" />
              <path d="M -2,1 C -1,-3 2,-3 3,0 C 2,2 -1,3 -2,1 Z" fill="#fda4af" />
              <circle cx="0" cy="0" r="1.8" fill="#ffe4e6" />
              <path d="M 6,4 L 10,8 L 4,8 Z" fill="#15803d" />
            </g>

            {/* Top-Right Wild Blossom */}
            <g transform="translate(84, 16)">
              <circle cx="-3" cy="-3" r="3" fill="#fb7185" />
              <circle cx="3" cy="-3" r="3" fill="#fb7185" />
              <circle cx="-3" cy="3" r="3" fill="#fb7185" />
              <circle cx="3" cy="3" r="3" fill="#fb7185" />
              <circle cx="0" cy="0" r="2.5" fill="#fde047" stroke="#d97706" strokeWidth="0.5" />
            </g>

            {/* Bottom-Left Rosebud */}
            <g transform="translate(16, 84)">
              <circle cx="-3" cy="-3" r="3" fill="#fb7185" />
              <circle cx="3" cy="-3" r="3" fill="#fb7185" />
              <circle cx="-3" cy="3" r="3" fill="#fb7185" />
              <circle cx="3" cy="3" r="3" fill="#fb7185" />
              <circle cx="0" cy="0" r="2.5" fill="#fde047" stroke="#d97706" strokeWidth="0.5" />
            </g>
          </svg>
        );

      // 3. CORONA DE ESPINAS & ZARZAS
      case 'thorn-briar':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
            {/* Primary gnarled briar vine */}
            <circle cx="50" cy="50" r="39" fill="none" stroke="#3b1d11" strokeWidth="3.5" />
            {/* Intertwined twisted secondary vine */}
            <path d="M 48,93 C 24,89 7,72 10,48 C 12,23 27,6 52,8 C 77,9 94,27 91,52 C 87,76 73,94 48,93" fill="none" stroke="#5c2c16" strokeWidth="1.8" strokeDasharray="8 4" />

            {/* Sharp jutting thorns all around with crimson blood tips */}
            {/* Left flank thorns */}
            <polygon points="10,42 2,39 9,46" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="2,39 5,40 4,43" fill="#dc2626" />
            <polygon points="12,58 4,62 11,64" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="4,62 7,62 6,65" fill="#dc2626" />

            {/* Right flank thorns */}
            <polygon points="90,42 98,39 91,46" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="98,39 95,40 96,43" fill="#dc2626" />
            <polygon points="88,58 96,62 89,64" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="96,62 93,62 94,65" fill="#dc2626" />

            {/* Top thorns */}
            <polygon points="42,10 39,2 46,9" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="39,2 40,5 43,4" fill="#dc2626" />
            <polygon points="58,10 62,2 64,9" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="62,2 62,5 65,4" fill="#dc2626" />

            {/* Bottom thorns */}
            <polygon points="42,90 39,98 46,91" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="39,98 40,95 43,96" fill="#dc2626" />
            <polygon points="58,90 62,98 64,91" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="62,98 62,95 65,96" fill="#dc2626" />

            {/* Diagonal thorns */}
            <polygon points="20,20 13,14 22,17" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="13,14 17,16 16,18" fill="#dc2626" />
            <polygon points="80,20 87,14 78,17" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="87,14 83,16 84,18" fill="#dc2626" />
            <polygon points="20,80 13,86 22,83" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="13,86 17,84 16,82" fill="#dc2626" />
            <polygon points="80,80 87,86 78,83" fill="#29140a" stroke="#000" strokeWidth="0.4" />
            <polygon points="87,86 83,84 84,82" fill="#dc2626" />
          </svg>
        );

      // 4. ESCUDO HERÁLDICO DE CAMPEÓN
      case 'knight-shield':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
            {/* Outer heavy bevel rim */}
            <path d="M 50,98 C 76,85 93,65 93,22 C 93,12 72,7 50,5 C 28,7 7,12 7,22 C 7,65 24,85 50,98 Z" fill="none" stroke="#78350f" strokeWidth="5" />
            <path d="M 50,96 C 74,83 90,64 90,23 C 90,13 70,8 50,6 C 30,8 10,13 10,23 C 10,64 26,83 50,96 Z" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
            <path d="M 50,93 C 72,80 87,62 87,24 C 87,14 68,9 50,8 C 32,9 13,14 13,24 C 13,62 28,80 50,93 Z" fill="none" stroke="#fef08a" strokeWidth="1" />

            {/* Rivets along the shield perimeter */}
            <circle cx="12" cy="22" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="16" cy="42" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="26" cy="64" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="37" cy="80" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="63" cy="80" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="74" cy="64" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="84" cy="42" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="88" cy="22" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="30" cy="8" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />
            <circle cx="70" cy="8" r="1.8" fill="#ffd56b" stroke="#78350f" strokeWidth="0.6" />

            {/* Top knight crest crown */}
            <path d="M 45,7 L 50,1 L 55,7 L 52,9 L 50,8 L 48,9 Z" fill="#fde047" stroke="#78350f" strokeWidth="0.8" />
            {/* Bottom chape shield reinforcement tip */}
            <path d="M 44,92 L 50,99 L 56,92 L 50,95 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
          </svg>
        );

      // 5. OUROBOROS DEL DRAGÓN ANCESTRAL
      case 'dragon-ouroboros':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
            {/* Dragon scaled serpentine body */}
            <circle cx="50" cy="50" r="39" fill="none" stroke="#065f46" strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="39" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="2 3" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.6" />

            {/* Dorsal spines radiating out along the dragon's back */}
            <polygon points="11,35 4,32 10,40" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="8,50 1,50 8,55" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="11,65 4,68 10,60" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="22,78 17,84 27,82" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="35,89 32,96 40,90" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="50,92 50,99 55,92" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="65,89 68,96 60,90" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="78,78 83,84 73,82" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="89,65 96,68 90,60" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="92,50 99,50 92,55" fill="#047857" stroke="#022c22" strokeWidth="0.4" />
            <polygon points="89,35 96,32 90,40" fill="#047857" stroke="#022c22" strokeWidth="0.4" />

            {/* Horned Dragon Head at Top */}
            <g transform="translate(50, 9)">
              {/* Left Horn */}
              <path d="M -4,0 Q -10,-8 -14,-6 Q -8,-2 -4,2 Z" fill="#d97706" stroke="#78350f" strokeWidth="0.5" />
              {/* Right Horn */}
              <path d="M 4,0 Q 10,-8 14,-6 Q 8,-2 4,2 Z" fill="#d97706" stroke="#78350f" strokeWidth="0.5" />
              {/* Dragon Snout & Head */}
              <path d="M -5,0 Q 0,-4 5,0 Q 4,6 0,5 Q -4,6 -5,0 Z" fill="#059669" stroke="#022c22" strokeWidth="0.7" />
              {/* Glowing Amber Eyes */}
              <circle cx="-2.5" cy="-0.5" r="1.1" fill="#fde047" />
              <circle cx="2.5" cy="-0.5" r="1.1" fill="#fde047" />
            </g>
          </svg>
        );

      // 6. OSARIO & CALAVERA MALDITA
      case 'bone-gravelord':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
            {/* Rib bones & vertebrae arches along flanks */}
            <path d="M 20,24 C 9,32 9,42 16,50 C 9,58 9,68 20,76" fill="none" stroke="#d6d3d1" strokeWidth="3" strokeLinecap="round" />
            <path d="M 80,24 C 91,32 91,42 84,50 C 91,58 91,68 80,76" fill="none" stroke="#d6d3d1" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="39" fill="none" stroke="#78716c" strokeWidth="1" strokeDasharray="3 3" />

            {/* Horned Demon Skull at top center */}
            <g transform="translate(50, 9)">
              {/* Bone horns */}
              <path d="M -5,-1 Q -11,-7 -14,-3 Q -8,1 -4,3 Z" fill="#e7e5e4" stroke="#78716c" strokeWidth="0.6" />
              <path d="M 5,-1 Q 11,-7 14,-3 Q 8,1 4,3 Z" fill="#e7e5e4" stroke="#78716c" strokeWidth="0.6" />
              {/* Cranium */}
              <path d="M -6,0 C -6,-5 6,-5 6,0 C 7,4 5,8 3,9 L -3,9 C -5,8 -7,4 -6,0 Z" fill="#f5f5f4" stroke="#57534e" strokeWidth="0.8" />
              {/* Eye sockets glowing spectral purple */}
              <circle cx="-2.5" cy="1" r="1.2" fill="#c084fc" />
              <circle cx="2.5" cy="1" r="1.2" fill="#c084fc" />
            </g>

            {/* Crossed femur bones at bottom */}
            <line x1="42" y1="89" x2="58" y2="95" stroke="#e7e5e4" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="42" y1="95" x2="58" y2="89" stroke="#e7e5e4" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );

      // 7. PORTAL RÚNICO OCTOGONAL
      case 'runic-arcane':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_6px_rgba(168,85,247,0.6)]">
            {/* Outer Octagon */}
            <polygon points="29,3 71,3 97,29 97,71 71,97 29,97 3,71 3,29" fill="none" stroke="#9333ea" strokeWidth="2.5" />
            {/* Star of Solomon rotated inner square */}
            <polygon points="50,4 96,50 50,96 4,50" fill="none" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="15" y="15" width="70" height="70" fill="none" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="39" fill="none" stroke="#e9d5ff" strokeWidth="1.2" />

            {/* Runes at 8 vertices */}
            <circle cx="29" cy="3" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="71" cy="3" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="97" cy="29" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="97" cy="71" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="71" cy="97" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="29" cy="97" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="3" cy="71" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="3" cy="29" r="2.2" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
          </svg>
        );

      // 8. CORONA REAL & FILIGRANA
      case 'gold-filigree':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
            {/* Outer Gothic Arch */}
            <path d="M 11,93 L 11,50 C 11,26 27,10 50,10 C 73,10 89,26 89,50 L 89,93 Z" fill="none" stroke="#c59b27" strokeWidth="3.5" />
            <path d="M 14,91 L 14,50 C 14,29 29,13 50,13 C 71,13 86,29 86,50 L 86,91 Z" fill="none" stroke="#ffd56b" strokeWidth="1.2" />

            {/* 5-Peak Crown atop the arch */}
            <path d="M 39,11 L 39,7 L 44,9 L 50,3 L 56,9 L 61,7 L 61,11 Z" fill="#fde047" stroke="#854d0e" strokeWidth="0.8" />
            <circle cx="50" cy="8" r="1.5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="0.5" />

            {/* Baroque side filigree scrolls */}
            <path d="M 9,45 Q 5,50 9,55 Q 13,50 9,45 Z" fill="#ffd56b" stroke="#ca8a04" strokeWidth="0.5" />
            <path d="M 91,45 Q 95,50 91,55 Q 87,50 91,45 Z" fill="#ffd56b" stroke="#ca8a04" strokeWidth="0.5" />

            {/* Pedestal bar at bottom */}
            <rect x="8" y="92" width="84" height="4.5" rx="1.5" fill="#854d0e" stroke="#ffd56b" strokeWidth="0.8" />
          </svg>
        );

      // 9. FORTALEZA DE HIERRO FORJADO
      case 'iron-warrior':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            <rect x="7" y="7" width="86" height="86" rx="14" fill="none" stroke="#3f3f46" strokeWidth="4" />
            <rect x="10" y="10" width="80" height="80" rx="11" fill="none" stroke="#71717a" strokeWidth="1.5" />

            {/* Heavy bolted corner angle brackets */}
            <polygon points="7,22 7,7 22,7" fill="#27272a" stroke="#71717a" strokeWidth="0.8" />
            <polygon points="78,7 93,7 93,22" fill="#27272a" stroke="#71717a" strokeWidth="0.8" />
            <polygon points="7,78 7,93 22,93" fill="#27272a" stroke="#71717a" strokeWidth="0.8" />
            <polygon points="93,78 93,93 78,93" fill="#27272a" stroke="#71717a" strokeWidth="0.8" />

            {/* Industrial steel rivets */}
            <circle cx="11" cy="11" r="1.8" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.6" />
            <circle cx="89" cy="11" r="1.8" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.6" />
            <circle cx="11" cy="89" r="1.8" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.6" />
            <circle cx="89" cy="89" r="1.8" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.6" />
            <circle cx="50" cy="8" r="1.5" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.5" />
            <circle cx="50" cy="92" r="1.5" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.5" />
            <circle cx="8" cy="50" r="1.5" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.5" />
            <circle cx="92" cy="50" r="1.5" fill="#d4d4d8" stroke="#18181b" strokeWidth="0.5" />
          </svg>
        );

      // 10. AUREOLA SOLAR SAGRADA
      case 'celestial-holy':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_6px_rgba(56,189,248,0.5)]">
            <circle cx="50" cy="50" r="39" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#fde047" strokeWidth="1" />

            {/* 16 Solar Burst Rays radiating out */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, idx) => {
              const isLong = idx % 2 === 0;
              const r1 = 40;
              const r2 = isLong ? 49 : 44;
              const rad = (angle * Math.PI) / 180;
              const x1 = 50 + r1 * Math.cos(rad);
              const y1 = 50 + r1 * Math.sin(rad);
              const x2 = 50 + r2 * Math.cos(rad);
              const y2 = 50 + r2 * Math.sin(rad);
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isLong ? '#fde047' : '#38bdf8'}
                  strokeWidth={isLong ? '2' : '1.3'}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Holy diamond stars at cardinal points */}
            <path d="M 50,1 L 52,5 L 56,5 L 53,8 L 54,12 L 50,9 L 46,12 L 47,8 L 44,5 L 48,5 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          </svg>
        );

      // 11. ENRAMADA ÉLFICA & JADE
      case 'elven-nature':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_4px_rgba(34,197,94,0.4)]">
            <circle cx="50" cy="50" r="39" fill="none" stroke="#166534" strokeWidth="3" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="6 3" />
            <path d="M 12,30 Q 6,24 10,18 Q 16,22 14,28 Z" fill="#22c55e" />
            <path d="M 88,30 Q 94,24 90,18 Q 84,22 86,28 Z" fill="#22c55e" />
            <path d="M 12,70 Q 6,76 10,82 Q 16,78 14,72 Z" fill="#22c55e" />
            <path d="M 88,70 Q 94,76 90,82 Q 84,78 86,72 Z" fill="#22c55e" />
            <circle cx="50" cy="8" r="2.5" fill="#34d399" stroke="#065f46" strokeWidth="0.6" />
          </svg>
        );

      // 12. PICOS DE OBSIDIANA & MAGMA
      case 'shadow-necro':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_6px_rgba(220,38,38,0.5)]">
            <rect x="8" y="8" width="84" height="84" rx="14" fill="none" stroke="#7f1d1d" strokeWidth="3.5" />
            <rect x="11" y="11" width="78" height="78" rx="11" fill="none" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 2" />
            {/* Jagged obsidian spikes */}
            <polygon points="8,35 1,30 9,42" fill="#18181b" stroke="#dc2626" strokeWidth="0.6" />
            <polygon points="92,35 99,30 91,42" fill="#18181b" stroke="#dc2626" strokeWidth="0.6" />
            <polygon points="35,8 30,1 42,9" fill="#18181b" stroke="#dc2626" strokeWidth="0.6" />
            <polygon points="65,8 70,1 58,9" fill="#18181b" stroke="#dc2626" strokeWidth="0.6" />
          </svg>
        );

      // 13. CINCHAS DE CUERO & LATÓN
      case 'ancient-parchment':
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            <rect x="8" y="8" width="84" height="84" rx="12" fill="none" stroke="#78350f" strokeWidth="3.5" />
            <rect x="11" y="11" width="78" height="78" rx="9" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
            {/* Brass buckles on corners */}
            <rect x="6" y="6" width="9" height="9" fill="#ca8a04" stroke="#451a03" strokeWidth="0.8" rx="1.5" />
            <rect x="85" y="6" width="9" height="9" fill="#ca8a04" stroke="#451a03" strokeWidth="0.8" rx="1.5" />
            <rect x="6" y="85" width="9" height="9" fill="#ca8a04" stroke="#451a03" strokeWidth="0.8" rx="1.5" />
            <rect x="85" y="85" width="9" height="9" fill="#ca8a04" stroke="#451a03" strokeWidth="0.8" rx="1.5" />
          </svg>
        );

      // 14. TIARA IMPERIAL DE RUBÍ
      case 'royal-ruby':
      default:
        return (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 filter drop-shadow-[0_2px_5px_rgba(185,28,28,0.5)]">
            <path d="M 11,93 L 11,50 C 11,26 27,10 50,10 C 73,10 89,26 89,50 L 89,93 Z" fill="none" stroke="#881337" strokeWidth="3.5" />
            <path d="M 14,91 L 14,50 C 14,29 29,13 50,13 C 71,13 86,29 86,50 L 86,91 Z" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            {/* Ruby diamonds at top and corners */}
            <polygon points="50,4 54,8 50,12 46,8" fill="#e11d48" stroke="#ffe4e6" strokeWidth="0.6" />
            <polygon points="12,48 15,51 12,54 9,51" fill="#e11d48" stroke="#ffe4e6" strokeWidth="0.6" />
            <polygon points="88,48 91,51 88,54 85,51" fill="#e11d48" stroke="#ffe4e6" strokeWidth="0.6" />
            <rect x="8" y="92" width="84" height="4.5" rx="1.5" fill="#4c0519" stroke="#e11d48" strokeWidth="0.8" />
          </svg>
        );
    }
  };

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`relative inline-block select-none group ${sizeConfig.box} ${className} ${
        interactive ? 'cursor-pointer active:scale-95 transition-transform duration-150' : ''
      }`}
      title={interactive ? `Ampliar retrato de ${name} y personalizar marco` : name}
    >
      {/* Outer Ambient Glow */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${frame.glowColor} ${
          interactive ? 'group-hover:opacity-100 group-hover:scale-105' : ''
        }`}
      />

      {/* Clipped Inner Portrait Container */}
      <div
        className={`${innerStyle.className} bg-[#18120c] shadow-inner transition-all duration-200`}
        style={innerStyle.style}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-200"
            style={{
              transform: `scale(${avatarScale ?? 1}) translateY(${avatarOffsetY ?? 0}%)`,
              transformOrigin: 'center center',
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#241a12] via-[#1c140d] to-[#120c07] text-[#c59b27]">
            <User className={`${sizeConfig.iconSize} opacity-70`} />
          </div>
        )}

        {/* Subtle Vignette on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Expand / Zoom Icon Overlay on Hover (if interactive) */}
        {interactive && (showExpandHint || size !== 'sm') && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="p-1.5 rounded-full bg-black/70 border border-[#c59b27] text-[#ffd56b] shadow-md transform scale-90 group-hover:scale-100 transition-transform">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {/* The Thematic SVG Frame Overlay */}
      {renderFrameSvg()}

      {/* Level Badge */}
      {showLevelBadge && typeof level === 'number' && (
        <span
          className={`absolute ${sizeConfig.badgeText} ${frame.badgeBg} ${frame.badgeText} border border-[#c59b27] font-bold font-mono rounded-full shadow-md z-20 flex items-center gap-0.5 whitespace-nowrap`}
        >
          <span>Nv</span>
          <span>{level}</span>
        </span>
      )}
    </div>
  );
};
