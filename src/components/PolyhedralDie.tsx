import React, { useEffect, useState } from 'react';

export type DieType = 'd20' | 'd12' | 'd10' | 'd8' | 'd6' | 'd4' | 'd100';

export interface PolyhedralDieProps {
  type?: DieType;
  value: number;
  isRolling?: boolean;
  isCrit?: boolean;
  isFumble?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'amber' | 'ruby' | 'obsidian' | 'emerald' | 'sapphire';
}

const SIZE_MAP = {
  sm: 'w-10 h-10 text-xs',
  md: 'w-14 h-14 text-sm',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-28 h-28 text-3xl',
};

export const PolyhedralDie: React.FC<PolyhedralDieProps> = ({
  type = 'd20',
  value,
  isRolling = false,
  isCrit = false,
  isFumble = false,
  size = 'lg',
  className = '',
  theme = 'amber',
}) => {
  // Rolling flicker animation for number
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    if (!isRolling) {
      setDisplayValue(value);
      return;
    }

    const maxVal =
      type === 'd20'
        ? 20
        : type === 'd12'
        ? 12
        : type === 'd10'
        ? 10
        : type === 'd8'
        ? 8
        : type === 'd6'
        ? 6
        : type === 'd4'
        ? 4
        : 100;

    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * maxVal) + 1);
    }, 60);

    return () => clearInterval(interval);
  }, [isRolling, value, type]);

  // Color schemes for facets
  const getColors = () => {
    if (isCrit) {
      return {
        main: '#eab308',
        light: '#fde047',
        mid: '#ca8a04',
        dark: '#854d0e',
        stroke: '#fef08a',
        text: '#422006',
        glow: 'drop-shadow(0 0 16px rgba(250, 204, 21, 0.8))',
      };
    }
    if (isFumble) {
      return {
        main: '#dc2626',
        light: '#f87171',
        mid: '#b91c1c',
        dark: '#7f1d1d',
        stroke: '#fca5a5',
        text: '#ffffff',
        glow: 'drop-shadow(0 0 16px rgba(220, 38, 38, 0.75))',
      };
    }
    if (theme === 'ruby') {
      return {
        main: '#be123c',
        light: '#e11d48',
        mid: '#9f1239',
        dark: '#4c0519',
        stroke: '#fecdd3',
        text: '#ffffff',
        glow: 'drop-shadow(0 0 10px rgba(190, 18, 60, 0.5))',
      };
    }
    if (theme === 'emerald') {
      return {
        main: '#047857',
        light: '#059669',
        mid: '#065f46',
        dark: '#064e3b',
        stroke: '#a7f3d0',
        text: '#ffffff',
        glow: 'drop-shadow(0 0 10px rgba(4, 120, 87, 0.5))',
      };
    }
    if (theme === 'sapphire') {
      return {
        main: '#1d4ed8',
        light: '#2563eb',
        mid: '#1e40af',
        dark: '#1e3a8a',
        stroke: '#bfdbfe',
        text: '#ffffff',
        glow: 'drop-shadow(0 0 10px rgba(29, 78, 216, 0.5))',
      };
    }
    if (theme === 'obsidian') {
      return {
        main: '#27272a',
        light: '#3f3f46',
        mid: '#18181b',
        dark: '#09090b',
        stroke: '#a1a1aa',
        text: '#f4f4f5',
        glow: 'drop-shadow(0 0 10px rgba(82, 82, 91, 0.5))',
      };
    }
    // Default: Amber / Antique Leather Gold 5e
    return {
      main: '#a16207',
      light: '#ca8a04',
      mid: '#854d0e',
      dark: '#451a03',
      stroke: '#fde047',
      text: '#fefce8',
      glow: 'drop-shadow(0 0 12px rgba(161, 98, 7, 0.5))',
    };
  };

  const c = getColors();

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${SIZE_MAP[size]} ${className}`}
      style={{ filter: c.glow }}
    >
      <div
        className={`w-full h-full relative flex items-center justify-center ${
          isRolling
            ? 'animate-spin duration-700'
            : isCrit
            ? 'animate-bounce'
            : ''
        }`}
        style={{
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* ========================================================= */}
        {/* D20: THE ICONIC 20-SIDED ICOSAHEDRON (FRONTAL PROJECTION) */}
        {/* ========================================================= */}
        {type === 'd20' && (
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <defs>
              <linearGradient id={`grad-d20-center-${theme}-${isCrit}-${isFumble}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={c.light} />
                <stop offset="60%" stopColor={c.main} />
                <stop offset="100%" stopColor={c.mid} />
              </linearGradient>
              <linearGradient id={`grad-d20-top-${theme}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={c.light} />
                <stop offset="100%" stopColor={c.main} />
              </linearGradient>
              <linearGradient id={`grad-d20-shadow-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={c.mid} />
                <stop offset="100%" stopColor={c.dark} />
              </linearGradient>
            </defs>

            {/* Facet 2: Top */}
            <polygon
              points="60,10 60,35 103.3,35"
              fill={c.light}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity="0.9"
            />
            {/* Facet 3: Top-Left */}
            <polygon
              points="60,10 16.7,35 60,35"
              fill={c.light}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity="0.95"
            />
            {/* Facet 4: Left Upper */}
            <polygon
              points="16.7,35 38,73 60,35"
              fill={c.main}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Facet 5: Left Lower */}
            <polygon
              points="16.7,35 16.7,85 38,73"
              fill={c.mid}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Facet 6: Bottom Left */}
            <polygon
              points="16.7,85 60,110 38,73"
              fill={c.dark}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Facet 7: Bottom Center */}
            <polygon
              points="38,73 60,110 82,73"
              fill={c.dark}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity="0.95"
            />
            {/* Facet 8: Bottom Right */}
            <polygon
              points="82,73 60,110 103.3,85"
              fill={c.dark}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Facet 9: Right Lower */}
            <polygon
              points="82,73 103.3,85 103.3,35"
              fill={c.mid}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Facet 10: Right Upper */}
            <polygon
              points="60,35 82,73 103.3,35"
              fill={c.main}
              stroke={c.stroke}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Facet 1: Central Face (Equilateral Triangle for the number) */}
            <polygon
              points="60,35 38,73 82,73"
              fill={`url(#grad-d20-center-${theme}-${isCrit}-${isFumble})`}
              stroke={c.stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Outer Hexagon Rim */}
            <polygon
              points="60,10 103.3,35 103.3,85 60,110 16.7,85 16.7,35"
              fill="none"
              stroke={c.stroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Number Text centered in the main triangle */}
            <text
              x="60"
              y="63"
              fill={c.text}
              fontSize={size === 'xl' ? '24' : size === 'lg' ? '20' : '17'}
              fontWeight="900"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
              className="drop-shadow-sm select-none"
            >
              {displayValue}
            </text>
          </svg>
        )}

        {/* ========================================================= */}
        {/* D6: BEVELED CUBE WITH ENGRAVED NUMBERS / PIPS */}
        {/* ========================================================= */}
        {type === 'd6' && (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <rect
              x="12"
              y="12"
              width="76"
              height="76"
              rx="16"
              fill={c.main}
              stroke={c.stroke}
              strokeWidth="3"
            />
            <rect
              x="18"
              y="18"
              width="64"
              height="64"
              rx="12"
              fill={c.light}
              opacity="0.25"
            />
            <text
              x="50"
              y="56"
              fill={c.text}
              fontSize="34"
              fontWeight="900"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {displayValue}
            </text>
          </svg>
        )}

        {/* ========================================================= */}
        {/* D8: OCTAHEDRON (DIAMOND SHAPE) */}
        {/* ========================================================= */}
        {type === 'd8' && (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            {/* Top triangle */}
            <polygon points="50,10 90,50 50,50" fill={c.light} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="50,10 10,50 50,50" fill={c.main} stroke={c.stroke} strokeWidth="1.5" />
            {/* Bottom triangle */}
            <polygon points="50,90 90,50 50,50" fill={c.mid} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="50,90 10,50 50,50" fill={c.dark} stroke={c.stroke} strokeWidth="1.5" />
            {/* Diamond outline */}
            <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke={c.stroke} strokeWidth="2.5" />
            <text
              x="50"
              y="53"
              fill={c.text}
              fontSize="24"
              fontWeight="900"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {displayValue}
            </text>
          </svg>
        )}

        {/* ========================================================= */}
        {/* D10 / D100: KITE PENTAGONAL TRAPEZOHEDRON */}
        {/* ========================================================= */}
        {(type === 'd10' || type === 'd100') && (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <polygon points="50,10 88,40 50,88 12,40" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
            <polygon points="50,10 88,40 50,52" fill={c.light} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="50,10 12,40 50,52" fill={c.main} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="12,40 50,88 50,52" fill={c.dark} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="88,40 50,88 50,52" fill={c.mid} stroke={c.stroke} strokeWidth="1.5" />
            <text
              x="50"
              y="52"
              fill={c.text}
              fontSize={type === 'd100' ? '18' : '24'}
              fontWeight="900"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {displayValue}
            </text>
          </svg>
        )}

        {/* ========================================================= */}
        {/* D12: DODECAHEDRON (PENTAGONAL FACETS) */}
        {/* ========================================================= */}
        {type === 'd12' && (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            {/* Outer decagon */}
            <circle cx="50" cy="50" r="42" fill={c.mid} stroke={c.stroke} strokeWidth="2.5" />
            {/* Inner pentagon */}
            <polygon
              points="50,22 76,41 66,72 34,72 24,41"
              fill={c.main}
              stroke={c.stroke}
              strokeWidth="2"
            />
            <text
              x="50"
              y="52"
              fill={c.text}
              fontSize="22"
              fontWeight="900"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {displayValue}
            </text>
          </svg>
        )}

        {/* ========================================================= */}
        {/* D4: TETRAHEDRON */}
        {/* ========================================================= */}
        {type === 'd4' && (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <polygon points="50,12 88,78 12,78" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
            <polygon points="50,12 50,56 12,78" fill={c.main} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="50,12 50,56 88,78" fill={c.light} stroke={c.stroke} strokeWidth="1.5" />
            <polygon points="12,78 50,56 88,78" fill={c.dark} stroke={c.stroke} strokeWidth="1.5" />
            <text
              x="50"
              y="58"
              fill={c.text}
              fontSize="22"
              fontWeight="900"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {displayValue}
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};
