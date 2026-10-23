import { AvatarFrameStyle } from '../types';

export interface AvatarFrameDefinition {
  id: AvatarFrameStyle;
  name: string;
  tagline: string;
  shapeType: 'circle' | 'shield' | 'octagon' | 'arch' | 'squircle';
  shapeDescription: string;
  category: 'nature' | 'martial' | 'arcane' | 'dark' | 'noble' | 'divine' | 'elemental';
  emoji: string;
  borderColor: string;
  glowColor: string;
  innerBorder: string;
  badgeBg: string;
  badgeText: string;
  accentGradient: string;
  cornerIcon: string;
  description: string;
  assetUrl?: string;
}

export const AVATAR_FRAME_DEFINITIONS: AvatarFrameDefinition[] = [
  // =========================================================================
  // 1. ELEMENTOS DE LA NATURALEZA (FUEGO, AGUA, TIERRA, AIRE, TRUENO, HIELO)
  // =========================================================================

  // FUEGO (REDONDO)
  {
    id: 'frame-fire',
    name: 'Fuego Primordial & Ascuas',
    tagline: 'Llamas vivas, lava dorada y carbón volcánico ardiente',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino con lenguas de fuego carmesí y ascuas incandescentes',
    category: 'elemental',
    emoji: '🔥',
    borderColor: 'border-[#dc2626]',
    glowColor: 'shadow-[0_0_22px_rgba(239,68,68,0.7)]',
    innerBorder: 'ring-2 ring-[#f97316]/70',
    badgeBg: 'bg-gradient-to-r from-[#3b0d0c] to-[#591612]',
    badgeText: 'text-[#fca5a5]',
    accentGradient: 'from-[#7f1d1d] via-[#ea580c] to-[#7f1d1d]',
    cornerIcon: '🔥',
    description: 'Recuadro circular fino forjado en obsidiana volcánica con lenguas de fuego vivo carmesí y ascuas doradas que rodean el retrato.',
    assetUrl: '/assets/frames/frame_element_fire.png',
  },

  // FUEGO (CUADRADO)
  {
    id: 'frame-magma',
    name: 'Magma Volcánico & Basalto',
    tagline: 'Roca basáltica agrietada, calor infernal y grietas de lava fundida',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de basalto negro con grietas de lava naranja incandescente',
    category: 'elemental',
    emoji: '🌋',
    borderColor: 'border-[#ea580c]',
    glowColor: 'shadow-[0_0_22px_rgba(234,88,12,0.7)]',
    innerBorder: 'ring-2 ring-[#f59e0b]/70',
    badgeBg: 'bg-gradient-to-r from-[#2a0e05] to-[#451809]',
    badgeText: 'text-[#fed7aa]',
    accentGradient: 'from-[#9a3412] via-[#f59e0b] to-[#9a3412]',
    cornerIcon: '🌋',
    description: 'Recuadro cuadrado fino de bloques de basalto volcánico con fisuras ardientes de magma líquido que brillan con calor puro.',
    assetUrl: '/assets/frames/frame_element_magma.png',
  },

  // AGUA (REDONDO)
  {
    id: 'frame-water',
    name: 'Agua & Mareas Glaciales',
    tagline: 'Mareas cristalinas, olas oceánicas y escarcha ártica',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino esculpido en plata acuática con olas y cristales de hielo',
    category: 'elemental',
    emoji: '🌊',
    borderColor: 'border-[#0284c7]',
    glowColor: 'shadow-[0_0_22px_rgba(14,165,233,0.7)]',
    innerBorder: 'ring-2 ring-[#38bdf8]/70',
    badgeBg: 'bg-gradient-to-r from-[#082f49] to-[#0c4a6e]',
    badgeText: 'text-[#bae6fd]',
    accentGradient: 'from-[#0369a1] via-[#38bdf8] to-[#0369a1]',
    cornerIcon: '❄️',
    description: 'Borde circular fino con finos remolinos marinos de agua pura y agujas de hielo zafiro que destellan con la luz.',
    assetUrl: '/assets/frames/frame_element_water.png',
  },

  // AGUA (CUADRADO)
  {
    id: 'frame-ocean-abyss',
    name: 'Abismo Oceánico & Profundidades',
    tagline: 'Aguas abisales, olas de kraken y bioluminiscencia marina',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino azul medianoche con olas profundas y destellos cian',
    category: 'elemental',
    emoji: '🐋',
    borderColor: 'border-[#0ea5e9]',
    glowColor: 'shadow-[0_0_22px_rgba(14,165,233,0.65)]',
    innerBorder: 'ring-2 ring-[#7dd3fc]/70',
    badgeBg: 'bg-gradient-to-r from-[#031926] to-[#0b2545]',
    badgeText: 'text-[#bae6fd]',
    accentGradient: 'from-[#075985] via-[#0284c7] to-[#075985]',
    cornerIcon: '🌊',
    description: 'Recuadro cuadrado fino con arabescos de olas de alta mar en tonos zafiro y cian bioluminiscente de las fosas abisales.',
    assetUrl: '/assets/frames/frame_element_ocean_abyss.png',
  },

  // HIELO (CUADRADO)
  {
    id: 'frame-frost-blizzard',
    name: 'Escarcha Glacial & Ventisca',
    tagline: 'Hielo eterno de montaña, estalactitas afiladas y copos de ventisca',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de hielo translúcido con agujas de escarcha en esquinas',
    category: 'elemental',
    emoji: '🧊',
    borderColor: 'border-[#38bdf8]',
    glowColor: 'shadow-[0_0_22px_rgba(56,189,248,0.7)]',
    innerBorder: 'ring-2 ring-[#e0f2fe]/80',
    badgeBg: 'bg-gradient-to-r from-[#082f49] to-[#0f4c75]',
    badgeText: 'text-[#e0f2fe]',
    accentGradient: 'from-[#0284c7] via-[#7dd3fc] to-[#0284c7]',
    cornerIcon: '❄️',
    description: 'Recuadro cuadrado fino forjado en hielo azulado perpetuo con pequeñas estalactitas que descienden en las esquinas.',
    assetUrl: '/assets/frames/frame_element_frost_blizzard.png',
  },

  // TIERRA (CUADRADO)
  {
    id: 'frame-earth',
    name: 'Piedra Rúnica & Megalito',
    tagline: 'Granito ancestral, runas de tierra y musgo de druida',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de bloques de granito cincelado con runas y musgo',
    category: 'elemental',
    emoji: '🗿',
    borderColor: 'border-[#65a30d]',
    glowColor: 'shadow-[0_0_18px_rgba(101,163,13,0.55)]',
    innerBorder: 'ring-2 ring-[#a3e635]/60',
    badgeBg: 'bg-gradient-to-r from-[#1a2e05] to-[#274209]',
    badgeText: 'text-[#d9f99d]',
    accentGradient: 'from-[#3f6212] via-[#84cc16] to-[#3f6212]',
    cornerIcon: '🌿',
    description: 'Recuadro cuadrado fino de bloques de granito rúnico pulido con esquinas biseladas y pequeños toques de musgo vivo de bosque antiguo.',
    assetUrl: '/assets/frames/frame_element_earth.png',
  },

  // TIERRA (REDONDO)
  {
    id: 'frame-geode-crystal',
    name: 'Geoda & Cuarzo de Tierra',
    tagline: 'Roca cavernosa incrustada de gemas, esmeraldas y cuarzo brillante',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino de piedra tallada con racimos de cristales y gemas',
    category: 'elemental',
    emoji: '💎',
    borderColor: 'border-[#10b981]',
    glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.65)]',
    innerBorder: 'ring-2 ring-[#6ee7b7]/70',
    badgeBg: 'bg-gradient-to-r from-[#064e3b] to-[#065f46]',
    badgeText: 'text-[#a7f3d0]',
    accentGradient: 'from-[#047857] via-[#10b981] to-[#047857]',
    cornerIcon: '✨',
    description: 'Recuadro circular fino con incrustaciones de cristales de cuarzo y vetas de esmeralda natural extraídas del corazón de la tierra.',
    assetUrl: '/assets/frames/frame_element_geode_crystal.png',
  },

  // AIRE (REDONDO)
  {
    id: 'frame-air',
    name: 'Aire & Céfiro Celeste',
    tagline: 'Vórtices de viento etéreo, plumas celestes y brisa de tormenta',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino con espirales aerománticas de plata brillante',
    category: 'elemental',
    emoji: '🌪️',
    borderColor: 'border-[#94a3b8]',
    glowColor: 'shadow-[0_0_20px_rgba(226,232,240,0.65)]',
    innerBorder: 'ring-2 ring-[#f1f5f9]/70',
    badgeBg: 'bg-gradient-to-r from-[#1e293b] to-[#334155]',
    badgeText: 'text-[#f8fafc]',
    accentGradient: 'from-[#475569] via-[#cbd5e1] to-[#475569]',
    cornerIcon: '🪶',
    description: 'Recuadro circular fino envuelto en sutiles filamentos de viento transparente y brisa celestial aeromántica.',
    assetUrl: '/assets/frames/frame_element_air.png',
  },

  // AIRE (CUADRADO)
  {
    id: 'frame-cyclone',
    name: 'Ciclón & Huracán de Vendaval',
    tagline: 'Espirales de vendaval plateado, corrientes huracanadas y niebla veloz',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino con remolinos de viento cruzado en las esquinas',
    category: 'elemental',
    emoji: '💨',
    borderColor: 'border-[#cbd5e1]',
    glowColor: 'shadow-[0_0_20px_rgba(203,213,225,0.65)]',
    innerBorder: 'ring-2 ring-[#f8fafc]/80',
    badgeBg: 'bg-gradient-to-r from-[#334155] to-[#475569]',
    badgeText: 'text-[#f1f5f9]',
    accentGradient: 'from-[#475569] via-[#94a3b8] to-[#475569]',
    cornerIcon: '🌪️',
    description: 'Recuadro cuadrado fino tejido con cintas de vendaval huracanado en plata pálida que bailan en las esquinas.',
    assetUrl: '/assets/frames/frame_element_cyclone.png',
  },

  // TRUENO (CUADRADO)
  {
    id: 'frame-thunder',
    name: 'Trueno & Tormenta Voltáica',
    tagline: 'Metal cobalto, arcos eléctricos azules y runas de tempestad',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de acero tempestuoso con relámpagos crepitantes',
    category: 'elemental',
    emoji: '⚡',
    borderColor: 'border-[#3b82f6]',
    glowColor: 'shadow-[0_0_22px_rgba(59,130,246,0.7)]',
    innerBorder: 'ring-2 ring-[#60a5fa]/70',
    badgeBg: 'bg-gradient-to-r from-[#0f172a] to-[#1e3a8a]',
    badgeText: 'text-[#93c5fd]',
    accentGradient: 'from-[#1d4ed8] via-[#60a5fa] to-[#1d4ed8]',
    cornerIcon: '⚡',
    description: 'Recuadro cuadrado fino de acero cobalto forjado en la tormenta, recorrido por arcos de relámpago azul y remaches galvanizados.',
    assetUrl: '/assets/frames/frame_element_thunder.png',
  },

  // TRUENO (REDONDO)
  {
    id: 'frame-sunstorm',
    name: 'Rayo Solar & Tormenta Sagrada',
    tagline: 'Relámpagos dorados, fulgor solar y arcos de tormenta celestial',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino de oro brillante chispeando con relámpagos dorados',
    category: 'elemental',
    emoji: '☀️',
    borderColor: 'border-[#f59e0b]',
    glowColor: 'shadow-[0_0_24px_rgba(245,158,11,0.75)]',
    innerBorder: 'ring-2 ring-[#fde047]/80',
    badgeBg: 'bg-gradient-to-r from-[#451a03] to-[#78350f]',
    badgeText: 'text-[#fef08a]',
    accentGradient: 'from-[#b45309] via-[#facc15] to-[#b45309]',
    cornerIcon: '⚡',
    description: 'Recuadro circular fino bañado en energía solar y rayos voltaicos dorados que destellan con el poder de una tempestad divina.',
    assetUrl: '/assets/frames/frame_element_sunstorm.png',
  },

  // =========================================================================
  // 2. FORJA, HIERRO & ACERO
  // =========================================================================

  // FORJA (CUADRADO)
  {
    id: 'frame-forge-iron',
    name: 'Hierro & Forja Cincelada',
    tagline: 'Hierro forjado en yunque, esquinas biseladas y remaches de armero',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de placas de acero templado y remaches de bronce',
    category: 'martial',
    emoji: '🔨',
    borderColor: 'border-[#78716c]',
    glowColor: 'shadow-[0_0_18px_rgba(168,162,158,0.55)]',
    innerBorder: 'ring-2 ring-[#d6d3d1]/60',
    badgeBg: 'bg-gradient-to-r from-[#1c1917] to-[#292524]',
    badgeText: 'text-[#e7e5e4]',
    accentGradient: 'from-[#44403c] via-[#a8a29e] to-[#44403c]',
    cornerIcon: '🛡️',
    description: 'Recuadro cuadrado fino de acero bruñido martillado a mano con refuerzo de remaches en las esquinas, limpio y marcial.',
    assetUrl: '/assets/frames/frame_forge_iron.png',
  },

  // FORJA ENANA (REDONDO)
  {
    id: 'frame-forge-dwarven',
    name: 'Forja Enana Rúnica',
    tagline: 'Acero enano profundo con grabados geométricos de oro bruñido',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino de aleación enana resistente con inscripciones rúnicas',
    category: 'martial',
    emoji: '⚒️',
    borderColor: 'border-[#ca8a04]',
    glowColor: 'shadow-[0_0_20px_rgba(202,138,4,0.6)]',
    innerBorder: 'ring-2 ring-[#fde047]/70',
    badgeBg: 'bg-gradient-to-r from-[#2c1d06] to-[#452e09]',
    badgeText: 'text-[#fef08a]',
    accentGradient: 'from-[#854d0e] via-[#eab308] to-[#854d0e]',
    cornerIcon: '⛏️',
    description: 'Recuadro circular fino con biseles de metal templado y finas runas enanas de poder cinceladas en oro alrededor del retrato.',
    assetUrl: '/assets/frames/frame_forge_dwarven.png',
  },

  // FORJA DE MITRIL (REDONDO)
  {
    id: 'frame-mithril-forge',
    name: 'Forja de Mitril & Plata Élfica',
    tagline: 'Plata lunar pulida, aleación élfica imperecedera y filigrana de hojas',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino de mitril resplandeciente con motivos de orfebrería élfica',
    category: 'martial',
    emoji: '⚔️',
    borderColor: 'border-[#94a3b8]',
    glowColor: 'shadow-[0_0_22px_rgba(226,232,240,0.7)]',
    innerBorder: 'ring-2 ring-[#f8fafc]/80',
    badgeBg: 'bg-gradient-to-r from-[#1e293b] to-[#334155]',
    badgeText: 'text-[#e2e8f0]',
    accentGradient: 'from-[#475569] via-[#cbd5e1] to-[#475569]',
    cornerIcon: '🗡️',
    description: 'Recuadro circular fino de auténtico mitril élfico de acabado celestial, ligero pero irrompible, con finos grabados florales.',
    assetUrl: '/assets/frames/frame_forge_mithril.png',
  },

  // ARMAZÓN DE PLACAS (CUADRADO)
  {
    id: 'frame-plate-armor',
    name: 'Armazón de Placas de Caballero',
    tagline: 'Peto de acero de torneo, biselado de coraza y esquinas abulonadas',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de armadura pesada con refuerzos y tornillos dorados',
    category: 'martial',
    emoji: '🛡️',
    borderColor: 'border-[#a8a29e]',
    glowColor: 'shadow-[0_0_18px_rgba(168,162,158,0.55)]',
    innerBorder: 'ring-2 ring-[#e7e5e4]/70',
    badgeBg: 'bg-gradient-to-r from-[#292524] to-[#44403c]',
    badgeText: 'text-[#f5f5f4]',
    accentGradient: 'from-[#57534e] via-[#d6d3d1] to-[#57534e]',
    cornerIcon: '🛡️',
    description: 'Recuadro cuadrado fino con el aspecto de una coraza de placas de caballero paladín, pulida como un espejo y remachada.',
    assetUrl: '/assets/frames/frame_forge_plate_armor.png',
  },

  // =========================================================================
  // 3. OSCURIDAD, DEMONÍACO & GÓTICO
  // =========================================================================

  // DEMONÍACO (REDONDO)
  {
    id: 'frame-demonic',
    name: 'Oscuro Abisal & Demoníaco',
    tagline: 'Cuernos abisales, obsidiana infernal y fuego carmesí corrupto',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino de roca del averno con sutiles cuernos y gemas de rubí',
    category: 'dark',
    emoji: '😈',
    borderColor: 'border-[#991b1b]',
    glowColor: 'shadow-[0_0_22px_rgba(185,28,28,0.7)]',
    innerBorder: 'ring-2 ring-[#ef4444]/70',
    badgeBg: 'bg-gradient-to-r from-[#2a0808] to-[#450a0a]',
    badgeText: 'text-[#fca5a5]',
    accentGradient: 'from-[#7f1d1d] via-[#dc2626] to-[#7f1d1d]',
    cornerIcon: '🩸',
    description: 'Recuadro circular fino de piedra abisal oscura con cuernos demoníacos estilizados y destellos de fuego carmesí en el borde.',
    assetUrl: '/assets/frames/frame_dark_demonic.png',
  },

  // CRÁNEO GÓTICO (CUADRADO)
  {
    id: 'frame-gothic-skull',
    name: 'Cráneo Gótico & Ceniza',
    tagline: 'Hierro negro de osario, filigrana mortuoria y ceniza espectral',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino de hierro pavonado oscuro con calaveras en las esquinas',
    category: 'dark',
    emoji: '💀',
    borderColor: 'border-[#52525b]',
    glowColor: 'shadow-[0_0_18px_rgba(113,113,122,0.6)]',
    innerBorder: 'ring-2 ring-[#a1a1aa]/60',
    badgeBg: 'bg-gradient-to-r from-[#18181b] to-[#27272a]',
    badgeText: 'text-[#e4e4e7]',
    accentGradient: 'from-[#27272a] via-[#71717a] to-[#27272a]',
    cornerIcon: '💀',
    description: 'Recuadro cuadrado fino con esquineros de calaveras esculpidas en hierro oscuro y calados arquitectónicos góticos.',
    assetUrl: '/assets/frames/frame_gothic_skull.png',
  },

  // PACTO DE SANGRE (CUADRADO)
  {
    id: 'frame-blood-runes',
    name: 'Pacto de Sangre & Runas Carmesí',
    tagline: 'Hierro ennegrecido, sacrificios prohibidos y runas de sangre brillante',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino con runas angulares carmesíes talladas a cuchillo',
    category: 'dark',
    emoji: '🩸',
    borderColor: 'border-[#b91c1c]',
    glowColor: 'shadow-[0_0_22px_rgba(185,28,28,0.7)]',
    innerBorder: 'ring-2 ring-[#f87171]/70',
    badgeBg: 'bg-gradient-to-r from-[#300a0e] to-[#450a0a]',
    badgeText: 'text-[#fca5a5]',
    accentGradient: 'from-[#7f1d1d] via-[#ef4444] to-[#7f1d1d]',
    cornerIcon: '🗡️',
    description: 'Recuadro cuadrado fino forjado para brujos y caballeros de sangre, con glifos rojos brillantes que laten como un corazón oscuro.',
    assetUrl: '/assets/frames/frame_dark_blood_runes.png',
  },

  // VACÍO ELDRITCH (REDONDO)
  {
    id: 'frame-eldritch-void',
    name: 'Vacío Eldritch & Sombras del Caos',
    tagline: 'Obsidiana estelar, tentáculos sombríos y fulgor púrpura del más allá',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino con espirales etéreas de vacío cósmico violeta',
    category: 'dark',
    emoji: '👁️',
    borderColor: 'border-[#7c3aed]',
    glowColor: 'shadow-[0_0_22px_rgba(124,58,237,0.7)]',
    innerBorder: 'ring-2 ring-[#c084fc]/70',
    badgeBg: 'bg-gradient-to-r from-[#1e0a38] to-[#2e1065]',
    badgeText: 'text-[#e9d5ff]',
    accentGradient: 'from-[#581c87] via-[#9333ea] to-[#581c87]',
    cornerIcon: '🌌',
    description: 'Recuadro circular fino rodeado de sombras cósmicas y zarcillos de energía abisal púrpura venidos de más allá de las estrellas.',
    assetUrl: '/assets/frames/frame_dark_eldritch_void.png',
  },

  // =========================================================================
  // 4. MÍSTICA, MAGIA & FEÉRICO
  // =========================================================================

  // ARCANO ASTRAL (REDONDO)
  {
    id: 'frame-arcane',
    name: 'Místico Arcano Astral',
    tagline: 'Runas cósmicas violetas, anillos estelares y fulgor etéreo',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino con círculos concéntricos astrales en amatista y oro',
    category: 'arcane',
    emoji: '✨',
    borderColor: 'border-[#8b5cf6]',
    glowColor: 'shadow-[0_0_22px_rgba(139,92,246,0.7)]',
    innerBorder: 'ring-2 ring-[#c084fc]/70',
    badgeBg: 'bg-gradient-to-r from-[#2e1065] to-[#4c1d95]',
    badgeText: 'text-[#e9d5ff]',
    accentGradient: 'from-[#6d28d9] via-[#c084fc] to-[#6d28d9]',
    cornerIcon: '🔮',
    description: 'Recuadro circular fino con anillos concéntricos trazados en filigrana astral de amatista y oro con glifos estelares flotantes.',
    assetUrl: '/assets/frames/frame_arcane_astral.png',
  },

  // BOSQUE FEÉRICO (CUADRADO)
  {
    id: 'frame-nature-fae',
    name: 'Bosque Feérico & Flora Élfica',
    tagline: 'Ramas vivas de oro feérico, hojas de plata y polen luminiscente',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino entrelazado por enredaderas feéricas luminosas',
    category: 'nature',
    emoji: '🧚',
    borderColor: 'border-[#10b981]',
    glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.65)]',
    innerBorder: 'ring-2 ring-[#34d399]/70',
    badgeBg: 'bg-gradient-to-r from-[#064e3b] to-[#065f46]',
    badgeText: 'text-[#a7f3d0]',
    accentGradient: 'from-[#047857] via-[#34d399] to-[#047857]',
    cornerIcon: '🍃',
    description: 'Recuadro cuadrado fino tejido con ramas vivas de oro suave, pequeñas hojas de esmeralda y destellos de polen feérico.',
    assetUrl: '/assets/frames/frame_nature_fae.png',
  },

  // TOMO DE CONJURADOR (CUADRADO)
  {
    id: 'frame-spellbook-tome',
    name: 'Tomo de Conjurador Arcano',
    tagline: 'Cuero encuadernado de grimorio, herrajes de oro y esquinas de tomo',
    shapeType: 'squircle',
    shapeDescription: 'Recuadro cuadrado fino que evoca la portada de un libro de conjuros legendario',
    category: 'arcane',
    emoji: '📖',
    borderColor: 'border-[#b45309]',
    glowColor: 'shadow-[0_0_20px_rgba(180,83,9,0.6)]',
    innerBorder: 'ring-2 ring-[#fbbf24]/70',
    badgeBg: 'bg-gradient-to-r from-[#291705] to-[#452709]',
    badgeText: 'text-[#fde68a]',
    accentGradient: 'from-[#78350f] via-[#d97706] to-[#78350f]',
    cornerIcon: '📜',
    description: 'Recuadro cuadrado fino con esquineros protectores de latón dorado labrado, idéntico a las cantoneras de un grimorio de archimago.',
    assetUrl: '/assets/frames/frame_arcane_spellbook.png',
  },

  // =========================================================================
  // 5. NOBLEZA, IMPERIO & ORO
  // =========================================================================

  // CORONA REAL (REDONDO)
  {
    id: 'frame-royal-gold',
    name: 'Corona Real de Oro Imperial',
    tagline: 'Filigrana imperial de oro pulido y engaste de zafiros finos',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino de oro brillante con gemas en los puntos cardinales',
    category: 'noble',
    emoji: '👑',
    borderColor: 'border-[#eab308]',
    glowColor: 'shadow-[0_0_22px_rgba(234,179,8,0.7)]',
    innerBorder: 'ring-2 ring-[#fef08a]/80',
    badgeBg: 'bg-gradient-to-r from-[#3f2e07] to-[#5c4309]',
    badgeText: 'text-[#fef9c3]',
    accentGradient: 'from-[#a16207] via-[#facc15] to-[#a16207]',
    cornerIcon: '👑',
    description: 'Recuadro circular fino con delicada filigrana áurea, biselado de orfebrería imperial y pequeñas gemas ceremoniales.',
    assetUrl: '/assets/frames/frame_royal_gold.png',
  },

  // EMPERADOR DRAGÓN (REDONDO)
  {
    id: 'frame-dragon-emperor',
    name: 'Emperador Dragón de Oro',
    tagline: 'Alas doradas estilizadas, escamas de sierpe imperial y majestad',
    shapeType: 'circle',
    shapeDescription: 'Recuadro circular fino coronado por alas de dragón doradas y escamas cinceladas',
    category: 'noble',
    emoji: '🐉',
    borderColor: 'border-[#d97706]',
    glowColor: 'shadow-[0_0_24px_rgba(217,119,6,0.75)]',
    innerBorder: 'ring-2 ring-[#fde68a]/80',
    badgeBg: 'bg-gradient-to-r from-[#381e05] to-[#542d07]',
    badgeText: 'text-[#fef3c7]',
    accentGradient: 'from-[#92400e] via-[#f59e0b] to-[#92400e]',
    cornerIcon: '🐲',
    description: 'Recuadro circular fino coronado con motivos de dragón imperial y escamas de oro fundido que abrazan el avatar con orgullo.',
    assetUrl: '/assets/frames/frame_noble_dragon_emperor.png',
  },

  // =========================================================================
  // ESTILOS HERÁLDICOS CLÁSICOS (CONSERVADOS)
  // =========================================================================
  {
    id: 'laurel-wreath',
    name: 'Corona de Laureles Heroica',
    tagline: 'Triunfo, gloria marcial, emperadores y héroes condecorados',
    shapeType: 'circle',
    shapeDescription: 'Corona circular de ramas de laurel doradas y lazo triunfal inferior',
    category: 'noble',
    emoji: '🌿',
    borderColor: 'border-[#ca8a04]',
    glowColor: 'shadow-[0_0_18px_rgba(234,179,8,0.5)]',
    innerBorder: 'ring-2 ring-[#fde047]/70',
    badgeBg: 'bg-gradient-to-r from-[#3a2707] to-[#593d0c]',
    badgeText: 'text-[#fef08a]',
    accentGradient: 'from-[#a16207] via-[#fde047] to-[#a16207]',
    cornerIcon: '🌿',
    description: 'Hojas de laurel esculpidas en oro y bronce que abrazan el retrato en un círculo de triunfo imperecedero, unidas por un lazo ceremonial.',
  },
  {
    id: 'blooming-rose',
    name: 'Enramada de Flores & Rosas',
    tagline: 'Naturaleza fértil, botánicos élficos, druidas y pactos de primavera',
    shapeType: 'circle',
    shapeDescription: 'Guirnalda viva con rosas florecidas, capullos tiernos y hojas de hiedra',
    category: 'nature',
    emoji: '🌹',
    borderColor: 'border-[#16a34a]',
    glowColor: 'shadow-[0_0_18px_rgba(244,63,94,0.45)]',
    innerBorder: 'ring-2 ring-[#f43f5e]/60',
    badgeBg: 'bg-gradient-to-r from-[#200913] to-[#4c112b]',
    badgeText: 'text-[#fecdd3]',
    accentGradient: 'from-[#15803d] via-[#f43f5e] to-[#15803d]',
    cornerIcon: '🌸',
    description: 'Ramas vivas que brotan rosas silvestres en flor en las esquinas, con pétalos aterciopelados carmesí y hojas frescas de rocío.',
  },
  {
    id: 'thorn-briar',
    name: 'Corona de Espinas & Zarzas',
    tagline: 'Druidas de esporas, caballeros malditos, juramentos de sangre y penitencia',
    shapeType: 'circle',
    shapeDescription: 'Zarzal espinoso gótico con filosas púas y espinas que forman el marco',
    category: 'dark',
    emoji: '🌵',
    borderColor: 'border-[#78350f]',
    glowColor: 'shadow-[0_0_16px_rgba(185,28,28,0.5)]',
    innerBorder: 'ring-2 ring-[#ef4444]/50',
    badgeBg: 'bg-gradient-to-r from-[#2a0e05] to-[#45100a]',
    badgeText: 'text-[#fca5a5]',
    accentGradient: 'from-[#451a03] via-[#b91c1c] to-[#451a03]',
    cornerIcon: '🩸',
    description: 'Tallo leñoso oscuro entrelazado con amenazantes espinas triangulares puntiagudas y gotas de rocío carmesí que advierten a cualquier enemigo.',
  },
  {
    id: 'knight-shield',
    name: 'Escudo Heráldico de Campeón',
    shapeType: 'shield',
    shapeDescription: 'Auténtica silueta de escudo medieval (heater shield) con remaches y blasón',
    tagline: 'Paladines de vanguardia, hidalgos de torneo y caballeros juramentados',
    category: 'martial',
    emoji: '🛡️',
    borderColor: 'border-[#c59b27]',
    glowColor: 'shadow-[0_0_16px_rgba(197,155,39,0.5)]',
    innerBorder: 'ring-2 ring-[#ffd56b]/60',
    badgeBg: 'bg-gradient-to-r from-[#32230e] to-[#4c3719]',
    badgeText: 'text-[#ffd56b]',
    accentGradient: 'from-[#8c672b] via-[#ffd56b] to-[#8c672b]',
    cornerIcon: '⚔️',
    description: 'Silueta completa de escudo heráldico medieval con chapa de acero bruñido, remaches forjados y blasón de orden militar.',
  },
  {
    id: 'dragon-ouroboros',
    name: 'Ouroboros del Dragón Ancestral',
    shapeType: 'circle',
    shapeDescription: 'Sierpe alada que muerde su cola con escamas esculpidas y cuernos',
    tagline: 'Linajes dracónicos, hechiceros arcanos y pactos de inmortalidad',
    category: 'arcane',
    emoji: '🐉',
    borderColor: 'border-[#059669]',
    glowColor: 'shadow-[0_0_18px_rgba(16,185,129,0.5)]',
    innerBorder: 'ring-2 ring-[#34d399]/60',
    badgeBg: 'bg-gradient-to-r from-[#064e3b] to-[#047857]',
    badgeText: 'text-[#a7f3d0]',
    accentGradient: 'from-[#065f46] via-[#10b981] to-[#065f46]',
    cornerIcon: '🐲',
    description: 'La sierpe alada ancestral forma un anillo circular con escamas cinceladas en bronce esmeralda y ojos de rubí encendido que devoran su propia cola.',
  },
  {
    id: 'bone-gravelord',
    name: 'Osario del Señor de las Tumbas',
    shapeType: 'squircle',
    shapeDescription: 'Calaveras talladas en las 4 esquinas y huesos enlazados en los bordes',
    tagline: 'Nigromantes, clérigos de la tumba y caballeros de la muerte',
    category: 'dark',
    emoji: '💀',
    borderColor: 'border-[#71717a]',
    glowColor: 'shadow-[0_0_16px_rgba(161,161,170,0.4)]',
    innerBorder: 'ring-2 ring-[#e4e4e7]/50',
    badgeBg: 'bg-gradient-to-r from-[#18181b] to-[#27272a]',
    badgeText: 'text-[#e4e4e7]',
    accentGradient: 'from-[#27272a] via-[#a1a1aa] to-[#27272a]',
    cornerIcon: '🦴',
    description: 'Marco forjado con huesos blanqueados y cráneos esculpidos en las cuatro esquinas, emitiendo una tenue neblina espectral de cripta.',
  },
  {
    id: 'gold-filigree',
    name: 'Filigrana de Oro & Marfil',
    shapeType: 'squircle',
    shapeDescription: 'Esquinas de filigrana dorada con arabescos barrocos y remaches de latón',
    tagline: 'Príncipes, bardos cortesanos, aristócratas y señores de la alta sociedad',
    category: 'noble',
    emoji: '✨',
    borderColor: 'border-[#ca8a04]',
    glowColor: 'shadow-[0_0_16px_rgba(234,179,8,0.45)]',
    innerBorder: 'ring-2 ring-[#fde047]/60',
    badgeBg: 'bg-gradient-to-r from-[#3a2707] to-[#593d0c]',
    badgeText: 'text-[#fef08a]',
    accentGradient: 'from-[#a16207] via-[#fde047] to-[#a16207]',
    cornerIcon: '⚜️',
    description: 'Elegante recuadro de ébano con esquinas barrocas repujadas en oro de 24 quilates, digno de los salones del trono más espléndidos.',
  },
  {
    id: 'runic-arcane',
    name: 'Círculo de Transmutación Rúnica',
    shapeType: 'octagon',
    shapeDescription: 'Octágono arcano con runas místicas flotantes en los 8 vértices',
    tagline: 'Magos de la academia, escribas arcanos y artífices de autómatas',
    category: 'arcane',
    emoji: '🔮',
    borderColor: 'border-[#7c3aed]',
    glowColor: 'shadow-[0_0_18px_rgba(124,58,237,0.5)]',
    innerBorder: 'ring-2 ring-[#c084fc]/60',
    badgeBg: 'bg-gradient-to-r from-[#2e1065] to-[#4c1d95]',
    badgeText: 'text-[#e9d5ff]',
    accentGradient: 'from-[#5b21b6] via-[#a855f7] to-[#5b21b6]',
    cornerIcon: '✨',
    description: 'Octágono místico grabado con runas de poder en sus ocho vértices que giran en armonía mágica para enfocar las energías del lanzador.',
  },
  {
    id: 'ancient-parchment',
    name: 'Cinchas de Cuero & Latón',
    shapeType: 'squircle',
    shapeDescription: 'Cinchas de cuero curtido cruzadas con hebillas y costuras rústicas',
    tagline: 'Eruditos, bardos de taberna, corsarios y cazadores de tesoros',
    category: 'noble',
    emoji: '📜',
    borderColor: 'border-[#a16207]',
    glowColor: 'shadow-[0_0_12px_rgba(161,98,7,0.35)]',
    innerBorder: 'ring-2 ring-[#fde047]/40',
    badgeBg: 'bg-gradient-to-r from-[#291e13] to-[#422c1b]',
    badgeText: 'text-[#fef08a]',
    accentGradient: 'from-[#713f12] via-[#ca8a04] to-[#713f12]',
    cornerIcon: '🗝️',
    description: 'Marco artesanal de cuero curtido al sol, costuras rústicas reforzadas y esquineras de latón pirata con relieve de brújula.',
  },
];

export function getAvatarFrame(frameId?: AvatarFrameStyle): AvatarFrameDefinition {
  if (frameId === 'celtic-bronze') {
    return AVATAR_FRAME_DEFINITIONS.find((f) => f.id === 'frame-forge-dwarven') || AVATAR_FRAME_DEFINITIONS[0];
  }
  return (
    AVATAR_FRAME_DEFINITIONS.find((f) => f.id === frameId) ||
    AVATAR_FRAME_DEFINITIONS[0]
  );
}
