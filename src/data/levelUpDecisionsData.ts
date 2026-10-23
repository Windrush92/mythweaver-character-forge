import { Character, AbilityScores, Spell } from '../types';
import { FIGHTING_STYLE_OPTIONS } from './characterCreatorData';
import { OFFICIAL_SPELLS_COMPENDIUM } from './spellsData';

export interface DecisionOption {
  id: string;
  name: string;
  desc: string;
  badge?: string;
  prerequisite?: string;
}

export interface LevelUpSpellRules {
  newSpellsToLearn: number;
  newCantripsToLearn: number;
  canSwapSpell: boolean;
  canUseCantripFormulas: boolean;
  canUseCantripVersatility: boolean;
  explanation: string;
}

// --------------------------------------------------------------------------
// 1. METAMAGIC OPTIONS (HECHICERO / SORCERER)
// --------------------------------------------------------------------------
export const METAMAGIC_OPTIONS: DecisionOption[] = [
  {
    id: 'cuidadoso',
    name: 'Conjuro Cuidadoso (Careful Spell)',
    desc: 'Cuando lanzas un conjuro que requiera tirada de salvación, puedes proteger a un número de criaturas de tu elección hasta tu modificador de Carisma. Dichas criaturas tienen éxito automático en la tirada de salvación.',
    badge: '1 Punto de Hechicería',
  },
  {
    id: 'distante',
    name: 'Conjuro Distante (Distant Spell)',
    desc: 'Cuando lanzas un conjuro con alcance de 5 pies o más, puedes duplicar su alcance. Cuando lanzas un conjuro con alcance de toque, puedes hacer que tenga un alcance de 30 pies.',
    badge: '1 Punto de Hechicería',
  },
  {
    id: 'potenciado',
    name: 'Conjuro Potenciado (Empowered Spell)',
    desc: 'Cuando tires el daño de un conjuro, puedes relanzar un número de dados de daño hasta tu modificador de Carisma (mínimo 1). Debes usar las nuevas tiradas. Se puede usar incluso si ya aplicaste otra opción de metamagia.',
    badge: '1 Punto de Hechicería',
  },
  {
    id: 'extendido',
    name: 'Conjuro Extendido (Extended Spell)',
    desc: 'Cuando lanzas un conjuro con duración de 1 minuto o superior, puedes duplicar su duración hasta un máximo de 24 horas.',
    badge: '1 Punto de Hechicería',
  },
  {
    id: 'elevado',
    name: 'Conjuro Elevado (Heightened Spell)',
    desc: 'Cuando lanzas un conjuro que requiere tirada de salvación, puedes hacer que un objetivo sufra desventaja en su primera tirada de salvación contra el conjuro.',
    badge: '3 Puntos de Hechicería',
  },
  {
    id: 'rapido',
    name: 'Conjuro Rápido (Quickened Spell)',
    desc: 'Cuando lanzas un conjuro cuyo tiempo de lanzamiento sea 1 acción, puedes cambiarlo a 1 acción adicional para ese lanzamiento.',
    badge: '2 Puntos de Hechicería',
  },
  {
    id: 'sutil',
    name: 'Conjuro Sutil (Subtle Spell)',
    desc: 'Puedes lanzar un conjuro sin componentes verbales ni somáticos, evitando que sea detectado o interrumpido por Contramagia.',
    badge: '1 Punto de Hechicería',
  },
  {
    id: 'gemelo',
    name: 'Conjuro Gemelo (Twinned Spell)',
    desc: 'Cuando lanzas un conjuro que solo tiene como objetivo a una criatura y no tiene alcance personal, puedes hacer que tenga como objetivo a una segunda criatura dentro de su alcance gastando tantos puntos como el nivel del conjuro (1 punto si es un truco).',
    badge: '1-9 Puntos de Hechicería',
  },
  {
    id: 'transmutado',
    name: 'Conjuro Transmutado (Transmuted Spell)',
    desc: 'Cuando lanzas un conjuro que inflige daño de ácido, frío, fuego, relámpago, veneno o trueno, puedes cambiar el tipo de daño a cualquiera de los otros elementos mencionados.',
    badge: '1 Punto de Hechicería',
  },
  {
    id: 'buscador',
    name: 'Conjuro Buscador (Seeking Spell)',
    desc: 'Si fallas una tirada de ataque con un conjuro, puedes relanzar el d20. Debes usar el nuevo resultado.',
    badge: '2 Puntos de Hechicería',
  },
];

// --------------------------------------------------------------------------
// 2. ELDRITCH INVOCATIONS (BRUJO / WARLOCK)
// --------------------------------------------------------------------------
export const ELDRITCH_INVOCATIONS: DecisionOption[] = [
  {
    id: 'explosion-agonica',
    name: 'Explosión Agónica (Agonizing Blast)',
    desc: 'Cuando lanzas Descarga Sobrenatural (Eldritch Blast), sumas tu modificador de Carisma al daño que inflige cada rayo que impacte.',
    badge: 'Truco Descarga Sobrenatural',
    prerequisite: 'Descarga Sobrenatural',
  },
  {
    id: 'explosion-repulsiva',
    name: 'Explosión Repulsiva (Repelling Blast)',
    desc: 'Cuando impactas a una criatura con Descarga Sobrenatural, puedes empujarla hasta 10 pies de distancia en línea recta lejos de ti.',
    badge: 'Truco Descarga Sobrenatural',
    prerequisite: 'Descarga Sobrenatural',
  },
  {
    id: 'vision-diabolica',
    name: 'Visión Diabólica (Devil\'s Sight)',
    desc: 'Puedes ver con total claridad tanto en la oscuridad normal como en la oscuridad mágica hasta una distancia de 120 pies.',
    badge: 'Pasiva Permanente',
  },
  {
    id: 'armadura-sombras',
    name: 'Armadura de Sombras (Armor of Shadows)',
    desc: 'Puedes lanzar Armadura de Mago sobre ti mismo a voluntad, sin gastar ranuras de conjuro ni componentes materiales.',
    badge: 'A voluntad',
  },
  {
    id: 'vigor-demoniaco',
    name: 'Vigor Demoníaco (Fiendish Vigor)',
    desc: 'Puedes lanzar Falsa Vida sobre ti mismo a voluntad como conjuro de 1.er nivel (obteniendo 1d4+4 puntos de golpe temporales).',
    badge: 'A voluntad',
  },
  {
    id: 'mascara-muchas-caras',
    name: 'Máscara de Muchas Caras (Mask of Many Faces)',
    desc: 'Puedes lanzar Disfrazarse sobre ti mismo a voluntad, sin gastar ranuras de conjuro.',
    badge: 'A voluntad',
  },
  {
    id: 'vision-esoterica',
    name: 'Visión de lo Esotérico (Eldritch Sight)',
    desc: 'Puedes lanzar Detectar Magia a voluntad, sin gastar ranuras de conjuro.',
    badge: 'A voluntad',
  },
  {
    id: 'ojos-guardian-runico',
    name: 'Ojos del Guardián Rúnico (Eyes of the Rune Keeper)',
    desc: 'Puedes leer y comprender cualquier sistema de escritura y texto en el multiverso.',
    badge: 'Pasiva Permanente',
  },
  {
    id: 'bestia-parlante',
    name: 'Bestia Parlante (Beast Speech)',
    desc: 'Puedes lanzar Hablar con los Animales a voluntad, sin gastar ranuras de conjuro.',
    badge: 'A voluntad',
  },
  {
    id: 'influencia-seductora',
    name: 'Influencia Seductora (Beguiling Influence)',
    desc: 'Ganas competencia en las habilidades de Engaño y Persuasión.',
    badge: 'Competencias',
  },
  {
    id: 'arma-pacto-mejorada',
    name: 'Arma del Pacto Mejorada (Improved Pact Weapon)',
    desc: 'Tu arma de pacto puede ser un arco o ballesta, gana un bonificador de +1 al ataque y daño, y sirve como foco de lanzamiento para tus conjuros.',
    badge: 'Pacto de la Hoja',
    prerequisite: 'Pacto de la Hoja',
  },
  {
    id: 'libro-secretos-antiguos',
    name: 'Libro de Secretos Antiguos (Book of Ancient Secrets)',
    desc: 'Puedes inscribir y lanzar cualquier conjuro con la etiqueta ritual de cualquier lista de clase en tu Libro de las Sombras.',
    badge: 'Pacto del Tomo',
    prerequisite: 'Pacto del Tomo',
  },
  {
    id: 'voz-amo-cadenas',
    name: 'Voz del Amo de las Cadenas (Voice of the Chain Master)',
    desc: 'Puedes comunicarte telepáticamente con tu familiar a cualquier distancia y percibir a través de sus sentidos.',
    badge: 'Pacto de la Cadena',
    prerequisite: 'Pacto de la Cadena',
  },
  {
    id: 'sed-hojas',
    name: 'Sed de Hojas (Thirsting Blade)',
    desc: 'Puedes atacar con tu arma de pacto dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.',
    badge: 'Nivel 5+, Pacto de la Hoja',
    prerequisite: 'Nivel 5, Pacto de la Hoja',
  },
  {
    id: 'escultor-carne',
    name: 'Escultor de la Carne (Sculptor of Flesh)',
    desc: 'Puedes lanzar Polimorfia una vez usando una ranura de conjuro de brujo. Recuperas este uso tras un descanso largo.',
    badge: 'Nivel 7+',
    prerequisite: 'Nivel 7',
  },
  {
    id: 'lanza-letal',
    name: 'Lanza Letal (Eldritch Spear)',
    desc: 'Cuando lanzas Descarga Sobrenatural, su alcance aumenta a 300 pies.',
    badge: 'Truco Descarga Sobrenatural',
    prerequisite: 'Descarga Sobrenatural',
  },
  {
    id: 'castigo-sobrenatural',
    name: 'Castigo Sobrenatural (Eldritch Smite)',
    desc: 'Una vez por turno al impactar a una criatura con tu arma de pacto, puedes gastar una ranura de conjuro de brujo para infligir 1d8 de daño de fuerza adicional más 1d8 por nivel de ranura, y puedes derribar a la criatura si es de tamaño Enorme o menor.',
    badge: 'Nivel 5+, Pacto del Filo',
    prerequisite: 'Nivel 5, Pacto del Filo',
  },
  {
    id: 'paso-ascendente',
    name: 'Paso Ascendente (Ascendant Step)',
    desc: 'Puedes lanzar Levitar sobre ti mismo a voluntad, sin gastar ranuras de conjuro ni componentes materiales.',
    badge: 'A voluntad, Nivel 9+',
    prerequisite: 'Nivel 9',
  },
  {
    id: 'tumba-levistus',
    name: 'Tumba de Levistus (Tomb of Levistus)',
    desc: 'Como reacción al recibir daño, te encierras en hielo ganando 10 puntos de golpe temporales por nivel de brujo que absorben el daño desencadenante. Se recarga en descanso corto.',
    badge: 'Nivel 5+, Reacción',
    prerequisite: 'Nivel 5',
  },
  {
    id: 'sudario-sombras',
    name: 'Sudario de Sombras (Shroud of Shadow)',
    desc: 'Puedes lanzar Invisibilidad sobre ti mismo a voluntad, sin gastar ranuras de conjuro.',
    badge: 'A voluntad, Nivel 15+',
    prerequisite: 'Nivel 15',
  },
  {
    id: 'vision-bruja',
    name: 'Visión de Bruja (Witch Sight)',
    desc: 'Puedes ver la forma real de cualquier metamorfo o criatura oculta por magia de ilusión o transmutación a 30 pies de ti.',
    badge: 'Pasiva, Nivel 15+',
    prerequisite: 'Nivel 15',
  },
  {
    id: 'cadenas-carceri',
    name: 'Cadenas de Carceri (Chains of Carceri)',
    desc: 'Puedes lanzar Retener Monstruo a voluntad sin gastar ranuras de conjuro contra un celestial, infernal o elemental. Una criatura específica solo puede ser afectada una vez por descanso largo.',
    badge: 'A voluntad, Nivel 15+, Cadena',
    prerequisite: 'Nivel 15, Pacto de la Cadena',
  },
  {
    id: 'proteccion-talisman',
    name: 'Protección del Talismán (Protection of the Talisman)',
    desc: 'Quien porte tu talismán añade 1d4 a cualquier tirada de salvación que falle.',
    badge: 'Nivel 7+, Pacto del Talismán',
    prerequisite: 'Nivel 7, Pacto del Talismán',
  },
];

// --------------------------------------------------------------------------
// 3. PACT BOONS (DON DEL PACTO - BRUJO NIVEL 3)
// --------------------------------------------------------------------------
export const PACT_BOON_OPTIONS: DecisionOption[] = [
  {
    id: 'pacto-hoja',
    name: 'Pacto del Filo (Pact of the Blade)',
    desc: 'Puedes crear un arma cuerpo a cuerpo mágica en tu mano vacía como acción. Eres competente con ella mientras la empuñes y cuenta como mágica.',
    badge: 'Arma Mágica Conjurada',
  },
  {
    id: 'pacto-tomo',
    name: 'Pacto del Tomo (Pact of the Tome)',
    desc: 'Tu patrón te entrega el Libro de las Sombras. Elige 3 trucos de cualquier lista de conjuros de clase: cuentan como trucos de brujo para ti y no cuentan contra tu límite.',
    badge: '+3 Trucos Multiclase',
  },
  {
    id: 'pacto-cadena',
    name: 'Pacto de la Cadena (Pact of the Chain)',
    desc: 'Aprendes el conjuro Encontrar Familiar como ritual. Puedes elegir formas sobrenaturales especiales para tu familiar: Diablillo, Quasit, Pseudodragón o Duendecillo.',
    badge: 'Familiar Sobrenatural',
  },
  {
    id: 'pacto-talisman',
    name: 'Pacto del Talismán (Pact of the Talisman)',
    desc: 'Tu patrón te entrega un amuleto especial. Quien lo porte puede sumar 1d4 a una prueba de característica fallida tantas veces al día como tu bonificador de competencia.',
    badge: 'Amuleto Protector 1d4',
  },
];

// --------------------------------------------------------------------------
// 4. BATTLE MASTER MANEUVERS (GUERRERO MAESTRO DE BATALLA)
// --------------------------------------------------------------------------
export const BATTLE_MASTER_MANEUVERS: DecisionOption[] = [
  { id: 'ataque-derribo', name: 'Ataque de Derribo (Trip Attack)', desc: 'Suma el dado de superioridad al daño; si el objetivo falla salvación de Fuerza, cae derribado al suelo.' },
  { id: 'contraataque', name: 'Contraataque (Riposte)', desc: 'Reacción cuando fallen un ataque cuerpo a cuerpo contra ti para contratacar sumando el dado de superioridad al daño.' },
  { id: 'parada', name: 'Parada (Parry)', desc: 'Reacción cuando recibas daño cuerpo a cuerpo para reducir el daño en 1 dado de superioridad + modificador de Destreza.' },
  { id: 'ataque-precision', name: 'Ataque de Precisión (Precision Attack)', desc: 'Suma el dado de superioridad a tu tirada de ataque para asegurar el impacto.' },
  { id: 'ataque-amenazante', name: 'Ataque Amenazante (Menacing Attack)', desc: 'Suma el dado al daño y asusta al objetivo hasta el final de tu próximo turno si falla salvación de Sabiduría.' },
  { id: 'ataque-desarme', name: 'Ataque de Desarme (Disarming Attack)', desc: 'Suma el dado al daño y obliga a soltar un objeto sostenido si falla salvación de Fuerza.' },
  { id: 'ataque-empujon', name: 'Ataque de Empujón (Pushing Attack)', desc: 'Suma el dado al daño y empuja al objetivo hasta 15 pies lejos de ti si falla salvación de Fuerza.' },
  { id: 'ataque-maniobra', name: 'Ataque de Maniobra (Maneuvering Attack)', desc: 'Suma el dado al daño y permite a un aliado moverse la mitad de su velocidad sin provocar ataques de oportunidad.' },
  { id: 'finta', name: 'Ataque con Finta (Feinting Attack)', desc: 'Acción adicional para ganar ventaja en tu siguiente tirada de ataque y sumar el dado de superioridad al daño.' },
  { id: 'evasion', name: 'Paso de Evasión (Evasive Footwork)', desc: 'Gasta el dado de superioridad mientras te mueves para sumar el resultado a tu CA hasta detenerte.' },
  { id: 'distraccion', name: 'Ataque de Distracción (Distracting Strike)', desc: 'Suma el dado al daño y da ventaja al siguiente ataque de un aliado contra ese enemigo.' },
  { id: 'arrollador', name: 'Ataque Arrollador (Sweeping Attack)', desc: 'Si impactas, inflige el resultado del dado de superioridad a una criatura adyacente adicional.' },
];

// --------------------------------------------------------------------------
// 5. ELEMENTAL DISCIPLINES (MONJE - CAMINO DE LOS CUATRO ELEMENTOS)
// --------------------------------------------------------------------------
export interface ElementalDisciplineOption extends DecisionOption {
  minLevel: number;
  kiCost: number;
}

export const ELEMENTAL_DISCIPLINES: ElementalDisciplineOption[] = [
  {
    id: 'sintonia-elemental',
    name: 'Sintonía Elemental (Elemental Attunement)',
    desc: 'Puedes usar tu acción para controlar brevemente las fuerzas elementales cercanas, creando efectos inofensivos: encender/apagar una pequeña llama, enfriar/calentar 1 libra de material, esculpir 1 pie cúbico de tierra/humo o crear una suave brisa.',
    badge: 'Nv 3 • 0 Ki (Básico)',
    minLevel: 3,
    kiCost: 0,
  },
  {
    id: 'colmillos-serpiente-fuego',
    name: 'Colmillos de la Serpiente de Fuego (Fangs of the Fire Snake)',
    desc: 'Cuando realizas la acción de Atacar en tu turno, puedes gastar 1 punto de Ki para hacer que zarcillos de llamas broten de tus puños y pies. Tu alcance desarmado aumenta en 10 pies para ese turno y tus impactos infligen daño de fuego en lugar de contundente. Además, si impactas, puedes gastar 1 Ki extra para infligir 1d10 de daño de fuego adicional.',
    badge: 'Nv 3 • 1 Ki',
    minLevel: 3,
    kiCost: 1,
  },
  {
    id: 'latigo-de-agua',
    name: 'Látigo de Agua (Water Whip)',
    desc: 'Como acción, gastas 2 puntos de Ki para crear un látigo de agua que azota a una criatura a 30 pies o menos que puedas ver. La criatura debe hacer una salvación de Destreza. Si falla, sufre 3d10 de daño contundente (más 1d10 por cada Ki adicional gastado) y puedes derribarla o arrastrarla hasta 25 pies hacia ti. Si tiene éxito, sufre la mitad de daño y no es movida.',
    badge: 'Nv 3 • 2 Ki',
    minLevel: 3,
    kiCost: 2,
  },
  {
    id: 'puno-aire-ininterrumpido',
    name: 'Puño del Aire Ininterrumpido (Fist of Unbroken Air)',
    desc: 'Como acción, gastas 2 puntos de Ki y convocas una potente ráfaga de aire comprimido contra una criatura a 30 pies. Debe hacer una salvación de Fuerza; si falla sufre 3d10 de daño contundente (más 1d10 por cada Ki adicional) y es empujada hasta 20 pies lejos de ti y derribada. Si tiene éxito, sufre la mitad y no es empujada.',
    badge: 'Nv 3 • 2 Ki',
    minLevel: 3,
    kiCost: 2,
  },
  {
    id: 'puno-cuatro-truenos',
    name: 'Puño de Cuatro Truenos (Fist of Four Thunders)',
    desc: 'Puedes gastar 2 puntos de Ki para lanzar el conjuro Onda Atronadora (Thunderwave) como acción.',
    badge: 'Nv 3 • 2 Ki (Onda Atronadora)',
    minLevel: 3,
    kiCost: 2,
  },
  {
    id: 'barrido-de-cenizas',
    name: 'Barrer con Cenizas (Sweeping Cinder Strike)',
    desc: 'Puedes gastar 2 puntos de Ki para lanzar el conjuro Manos Ardientes (Burning Hands) como acción.',
    badge: 'Nv 3 • 2 Ki (Manos Ardientes)',
    minLevel: 3,
    kiCost: 2,
  },
  {
    id: 'espiritus-del-vendaval',
    name: 'Ráfaga de Espíritus del Vendaval (Rush of the Gale Spirits)',
    desc: 'Puedes gastar 2 puntos de Ki para lanzar el conjuro Ráfaga de Viento (Gust of Wind) como acción.',
    badge: 'Nv 3 • 2 Ki (Ráfaga de Viento)',
    minLevel: 3,
    kiCost: 2,
  },
  {
    id: 'moldear-rio-fluyente',
    name: 'Moldear el Río Fluyente (Shape the Flowing River)',
    desc: 'Como acción, gastas 1 punto de Ki para elegir un área de hielo o agua de no más de 30 pies de lado a 120 pies de ti. Puedes congelar el agua en hielo sólido o derretir el hielo en agua, alterando el terreno de combate a tu antojo.',
    badge: 'Nv 3 • 1 Ki',
    minLevel: 3,
    kiCost: 1,
  },
  {
    id: 'apreton-viento-norte',
    name: 'Apretón del Viento del Norte (Clench of the North Wind)',
    desc: 'Puedes gastar 3 puntos de Ki para lanzar el conjuro Retener Persona (Hold Person) como acción, paralizando a un humanoide en el aire gélido.',
    badge: 'Nv 6 • 3 Ki (Retener Persona)',
    minLevel: 6,
    kiCost: 3,
  },
  {
    id: 'gong-de-la-cumbre',
    name: 'Gong de la Cumbre (Gong of the Summit)',
    desc: 'Puedes gastar 3 puntos de Ki para lanzar el conjuro Hacer Añicos (Shatter) como acción, resonando con fuerza telúrica destructiva.',
    badge: 'Nv 6 • 3 Ki (Hacer Añicos)',
    minLevel: 6,
    kiCost: 3,
  },
  {
    id: 'postura-de-niebla',
    name: 'Postura de Niebla (Mist Stance)',
    desc: 'Puedes gastar 4 puntos de Ki para lanzar el conjuro Forma Gaseosa (Gaseous Form) sobre ti mismo como acción, transformándote en vapor espectral.',
    badge: 'Nv 11 • 4 Ki (Forma Gaseosa)',
    minLevel: 11,
    kiCost: 4,
  },
  {
    id: 'cabalgar-el-viento',
    name: 'Cabalgar el Viento (Ride the Wind)',
    desc: 'Puedes gastar 4 puntos de Ki para lanzar el conjuro Volar (Fly) sobre ti mismo como acción, sustentándote en corrientes ascendentes de aire.',
    badge: 'Nv 11 • 4 Ki (Volar)',
    minLevel: 11,
    kiCost: 4,
  },
  {
    id: 'llamas-del-fenix',
    name: 'Llamas del Fénix (Flames of the Phoenix)',
    desc: 'Puedes gastar 4 puntos de Ki para lanzar el conjuro Bola de Fuego (Fireball) como acción, desatando una llamarada ígnea masiva de 20 pies de radio.',
    badge: 'Nv 11 • 4 Ki (Bola de Fuego)',
    minLevel: 11,
    kiCost: 4,
  },
  {
    id: 'defensa-montana-eterna',
    name: 'Defensa de la Montaña Eterna (Eternal Mountain Defense)',
    desc: 'Puedes gastar 5 puntos de Ki para lanzar el conjuro Piel Pétrea (Stoneskin) sobre ti mismo como acción, endureciendo tu piel como granito impenetrable.',
    badge: 'Nv 11 • 5 Ki (Piel Pétrea)',
    minLevel: 11,
    kiCost: 5,
  },
  {
    id: 'aliento-de-invierno',
    name: 'Aliento de Invierno (Breath of Winter)',
    desc: 'Puedes gastar 6 puntos de Ki para lanzar el conjuro Cono de Frío (Cone of Cold) como acción, exhalando un torrente polar de 60 pies.',
    badge: 'Nv 17 • 6 Ki (Cono de Frío)',
    minLevel: 17,
    kiCost: 6,
  },
  {
    id: 'rio-de-fuego-hambriento',
    name: 'Río de Fuego Hambriento (River of Hungry Flame)',
    desc: 'Puedes gastar 5 puntos de Ki para lanzar el conjuro Muro de Fuego (Wall of Fire) como acción, alzando una barrera abrasadora de llamas primordiales.',
    badge: 'Nv 17 • 5 Ki (Muro de Fuego)',
    minLevel: 17,
    kiCost: 5,
  },
  {
    id: 'ola-tierra-rodante',
    name: 'Ola de Tierra Rodante (Wave of Rolling Earth)',
    desc: 'Puedes gastar 6 puntos de Ki para lanzar el conjuro Muro de Piedra (Wall of Stone) como acción, moldeando la roca del suelo en un baluarte permanente.',
    badge: 'Nv 17 • 6 Ki (Muro de Piedra)',
    minLevel: 17,
    kiCost: 6,
  },
];

// --------------------------------------------------------------------------
// 6. KENSEI WEAPON OPTIONS (MONJE - SENDA DEL KENSEI)
// --------------------------------------------------------------------------
export const KENSEI_WEAPON_OPTIONS: DecisionOption[] = [
  { id: 'espada-larga', name: 'Espada Larga (Longsword)', desc: 'Arma cuerpo a cuerpo versátil marcial (1d8/1d10). Se convierte en arma de monje y escala con Artes Marciales.', badge: 'Cuerpo a cuerpo' },
  { id: 'estoque', name: 'Estoque (Rapier)', desc: 'Arma cuerpo a cuerpo sutil marcial (1d8 perforante). Excelente precisión con Destreza.', badge: 'Cuerpo a cuerpo' },
  { id: 'cimitarra', name: 'Cimitarra (Scimitar)', desc: 'Arma ligera sutil marcial (1d6 cortante). Gran fluidez en combate rápido.', badge: 'Cuerpo a cuerpo' },
  { id: 'hacha-guerra', name: 'Hacha de Batalla (Battleaxe)', desc: 'Arma versátil marcial (1d8/1d10 cortante). Golpes contundentes y brutales.', badge: 'Cuerpo a cuerpo' },
  { id: 'martillo-guerra', name: 'Martillo de Guerra (Warhammer)', desc: 'Arma versátil marcial (1d8/1d10 contundente). Aplasta armaduras enemigas.', badge: 'Cuerpo a cuerpo' },
  { id: 'arco-largo', name: 'Arco Largo (Longbow)', desc: 'Arma marcial a distancia (1d8 perforante, alcance 150/600 pies). Letalidad a distancia extrema.', badge: 'A distancia' },
  { id: 'arco-corto', name: 'Arco Corto (Shortbow)', desc: 'Arma simple a distancia (1d6 perforante, alcance 80/320 pies). Ligero y versátil.', badge: 'A distancia' },
  { id: 'ballesta-ligera', name: 'Ballesta Ligera (Light Crossbow)', desc: 'Arma simple a distancia (1d8 perforante, alcance 80/320 pies).', badge: 'A distancia' },
  { id: 'mayal', name: 'Mayal (Flail)', desc: 'Arma marcial cuerpo a cuerpo (1d8 contundente). Desvía guardias enemigas.', badge: 'Cuerpo a cuerpo' },
  { id: 'tridente', name: 'Tridente (Trident)', desc: 'Arma marcial versátil arrojadiza (1d6/1d8 perforante).', badge: 'Cuerpo a cuerpo / Arrojadiza' },
];

export const KENSEI_TOOL_OPTIONS: DecisionOption[] = [
  { id: 'utiles-pintor', name: 'Útiles de Pintor (Painter\'s Supplies)', desc: 'Herramientas artísticas para meditar pintando paisajes y símbolos espirituales.', badge: 'Herramienta de Artesano' },
  { id: 'herramientas-caligrafia', name: 'Herramientas de Caligrafía (Calligrapher\'s Supplies)', desc: 'Pinceles, tinta y pergamino para transcribir poemas sagrados y pergaminos marciales.', badge: 'Herramienta de Artesano' },
];

export const ASCENDANT_DRAGON_LANGUAGES: DecisionOption[] = [
  { id: 'idioma-draconico', name: 'Dracónico (Draconic)', desc: 'La lengua sagrada y ancestral de los dragones cromáticos y metálicos.', badge: 'Idioma Primigenio' },
  { id: 'idioma-celestial', name: 'Celestial', desc: 'El lenguaje de los planos superiores y los seres angélicos.', badge: 'Idioma Plano Superior' },
  { id: 'idioma-infernal', name: 'Infernal', desc: 'El lenguaje preciso y estricto de los Nueve Infiernos de Baator.', badge: 'Idioma Infernal' },
  { id: 'idioma-abisal', name: 'Abisal', desc: 'El dialecto caótico y resonante de las infinitas capas del Abismo.', badge: 'Idioma Abisal' },
  { id: 'idioma-silvano', name: 'Silvano', desc: 'El melodioso lenguaje del Feywild y las criaturas feéricas.', badge: 'Idioma Feérico' },
  { id: 'idioma-primordial', name: 'Primordial', desc: 'El lenguaje elemental de los cuatro planos interiores.', badge: 'Idioma Elemental' },
  { id: 'idioma-elfico', name: 'Élfico (Elvish)', desc: 'La lengua fluida y poética de los elfos.', badge: 'Idioma Estándar' },
  { id: 'idioma-enano', name: 'Enano (Dwarvish)', desc: 'El idioma robusto y antiguo de las fortalezas enanas.', badge: 'Idioma Estándar' },
];

// --------------------------------------------------------------------------
// 7. TOTEM WARRIOR (BÁRBARO - GUERRERO TOTÉMICO)
// --------------------------------------------------------------------------
export const TOTEM_WARRIOR_LEVEL_3_SPIRITS: DecisionOption[] = [
  { id: 'totem-oso-3', name: 'Tótem del Oso (Bear Spirit)', desc: 'En furia tienes resistencia a todos los tipos de daño excepto daño psíquico. Conviértete en un baluarte invencible.', badge: 'Defensa Absoluta' },
  { id: 'totem-aguila-3', name: 'Tótem del Águila (Eagle Spirit)', desc: 'En furia puedes usar Correr como acción adicional en cada turno, y las criaturas enemigas sufren desventaja en ataques de oportunidad contra ti.', badge: 'Movilidad Aérea' },
  { id: 'totem-lobo-3', name: 'Tótem del Lobo (Wolf Spirit)', desc: 'En furia tus compañeros tienen ventaja en tiradas de ataque cuerpo a cuerpo contra cualquier criatura enemiga a 5 pies de ti.', badge: 'Líder de Manada' },
  { id: 'totem-alce-3', name: 'Tótem del Alce (Elk Spirit)', desc: 'En furia tu velocidad de movimiento a pie aumenta en 15 pies adicionales. Te desplazas como una estampida implacable.', badge: '+15 pies Velocidad' },
  { id: 'totem-tigre-3', name: 'Tótem del Tigre (Tiger Spirit)', desc: 'En furia la distancia de tu salto de longitud aumenta en 10 pies y tu salto de altura aumenta en 3 pies.', badge: 'Salto Depredador' },
];

export const TOTEM_WARRIOR_LEVEL_6_ASPECTS: DecisionOption[] = [
  { id: 'aspecto-oso-6', name: 'Aspecto del Oso (Aspect of the Bear)', desc: 'Tu capacidad de carga (incluyendo peso máximo levantado y arrastrado) se duplica, y tienes ventaja en pruebas de Fuerza realizadas para empujar, tirar, levantar o romper objetos.', badge: 'Fuerza Colosal' },
  { id: 'aspecto-aguila-6', name: 'Aspecto del Águila (Aspect of the Eagle)', desc: 'Puedes ver con total claridad hasta a 1 milla de distancia sin dificultad, y la luz tenue no impone desventaja en tus pruebas de Sabiduría (Percepción).', badge: 'Vista de Halcón' },
  { id: 'aspecto-lobo-6', name: 'Aspecto del Lobo (Aspect of the Wolf)', desc: 'Ganas los sentidos de caza de un lobo. Puedes rastrear a otras criaturas mientras viajas a paso rápido, y puedes moverte sigilosamente a un ritmo normal.', badge: 'Rastreo Perfecto' },
  { id: 'aspecto-alce-6', name: 'Aspecto del Alce (Aspect of the Elk)', desc: 'Tanto si viajas a pie como montado, puedes duplicar la velocidad de viaje de hasta diez compañeros contigo si no estás en combate.', badge: 'Marcha de Estampida' },
  { id: 'aspecto-tigre-6', name: 'Aspecto del Tigre (Aspect of the Tiger)', desc: 'Ganas competencia en dos habilidades a tu elección entre Atletismo, Acrobacia, Sigilo o Supervivencia.', badge: '2 Habilidades Extra' },
];

export const TOTEM_WARRIOR_LEVEL_14_ATTUNEMENTS: DecisionOption[] = [
  { id: 'sintonia-oso-14', name: 'Sintonía del Oso (Totemic Attunement: Bear)', desc: 'En furia, cualquier enemigo a 5 pies de ti tiene desventaja en tiradas de ataque contra cualquier objetivo que no seas tú.', badge: 'Provocación Protectora' },
  { id: 'sintonia-aguila-14', name: 'Sintonía del Águila (Totemic Attunement: Eagle)', desc: 'En furia tienes una velocidad de vuelo igual a tu velocidad a pie actual. Caes si terminas tu turno en el aire sin nada que te sostenga.', badge: 'Vuelo en Furia' },
  { id: 'sintonia-lobo-14', name: 'Sintonía del Lobo (Totemic Attunement: Wolf)', desc: 'En furia, al golpear a una criatura Grande o menor con un ataque de arma cuerpo a cuerpo, puedes usar tu acción adicional para derribarla.', badge: 'Derribo Automático' },
  { id: 'sintonia-alce-14', name: 'Sintonía del Alce (Totemic Attunement: Elk)', desc: 'En furia, puedes usar una acción adicional en tu turno para moverte a través del espacio de una criatura Grande o menor, infligiendo 1d12 + Fuerza de daño contundente y derribándola si falla salvación de Fuerza (CD 8 + prof + Fuerza).', badge: 'Embestida Arrolladora' },
  { id: 'sintonia-tigre-14', name: 'Sintonía del Tigre (Totemic Attunement: Tiger)', desc: 'Si te mueves al menos 20 pies en línea recta hacia un objetivo antes de hacer un ataque con arma cuerpo a cuerpo, puedes usar tu acción adicional para hacer un ataque cuerpo a cuerpo adicional contra él.', badge: 'Zarpazo en Carrera' },
];

// --------------------------------------------------------------------------
// 7.1 BARBARIAN PRIMAL KNOWLEDGE (CONOCIMIENTO PRIMITIVO - TASHA)
// --------------------------------------------------------------------------
export const BARBARIAN_PRIMAL_KNOWLEDGE_OPTIONS: DecisionOption[] = [
  { id: 'pk-trato-animales', name: 'Trato con Animales (Animal Handling)', desc: 'Calmar animales asustados o agresivos y dirigir monturas bajo tensión.' },
  { id: 'pk-atletismo', name: 'Atletismo (Athletics)', desc: 'Escalar superficies difíciles, saltar grietas anchas y maniobras de empujar o derribar.' },
  { id: 'pk-intimidacion', name: 'Intimidación (Intimidation)', desc: 'Infundir terror en adversarios mediante tu presencia física imponente.' },
  { id: 'pk-naturaleza', name: 'Naturaleza (Nature)', desc: 'Conocimiento de flora, fauna, clima y ciclos de la naturaleza salvaje.' },
  { id: 'pk-percepcion', name: 'Percepción (Perception)', desc: 'Agudeza sensorial para detectar emboscadas, peligros ocultos y sonidos sutiles.' },
  { id: 'pk-supervivencia', name: 'Supervivencia (Survival)', desc: 'Rastrear presas, encontrar comida/agua, orientarse en la espesura y predecir el clima.' },
];

// --------------------------------------------------------------------------
// 7.2 TOTEM WARRIOR - TIGER SKILLS (NIVEL 6)
// --------------------------------------------------------------------------
export const TOTEM_TIGER_LEVEL_6_SKILLS: DecisionOption[] = [
  { id: 'tiger-atletismo', name: 'Atletismo (Athletics)', desc: 'Ganas competencia en pruebas de Atletismo por la agilidad felina del tigre.' },
  { id: 'tiger-acrobacia', name: 'Acrobacia (Acrobatics)', desc: 'Ganas competencia en pruebas de Acrobacia, manteniendo el equilibrio y destreza física.' },
  { id: 'tiger-sigilo', name: 'Sigilo (Stealth)', desc: 'Ganas competencia en Sigilo, acechando en silencio como un depredador natural.' },
  { id: 'tiger-supervivencia', name: 'Supervivencia (Survival)', desc: 'Ganas competencia en Supervivencia, reconociendo huellas y rastros en la intemperie.' },
];

// --------------------------------------------------------------------------
// 7.3 ZEALOT - DIVINE FURY DAMAGE TYPE (FANÁTICO NIVEL 3)
// --------------------------------------------------------------------------
export const ZEALOT_DIVINE_FURY_OPTIONS: DecisionOption[] = [
  {
    id: 'furia-divina-radiante',
    name: 'Furia Radiante (Radiant Damage)',
    desc: 'Tu furia arde con la luz purificadora de deidades sagradas de la justicia, el sol o la creación. Tu primer impacto en cada turno en furia inflige 1d6 + la mitad de tu nivel de bárbaro de daño radiante.',
    badge: '1d6 + 1/2 Nv Daño Radiante',
  },
  {
    id: 'furia-divina-necrotica',
    name: 'Furia Necrótica (Necrotic Damage)',
    desc: 'Tu furia canaliza la energía funesta y destructiva de dioses de la muerte, el inframundo o la guerra implacable. Tu primer impacto en cada turno en furia inflige 1d6 + la mitad de tu nivel de bárbaro de daño necrótico.',
    badge: '1d6 + 1/2 Nv Daño Necrótico',
  },
];

// --------------------------------------------------------------------------
// 7.4 PATH OF THE BEAST - NATURAL WEAPONS & BESTIAL SOUL (BESTIA NIVEL 3 & 6)
// --------------------------------------------------------------------------
export const BEAST_NATURAL_WEAPON_OPTIONS: DecisionOption[] = [
  {
    id: 'bestia-mordisco',
    name: 'Mordisco Vampírico (Bite)',
    desc: 'Tu mandíbula muta en colmillos bestiales. Inflige 1d8 de daño perforante + Fuerza. Una vez por turno, si tienes menos de la mitad de tus puntos de golpe máximos, recuperas puntos de golpe iguales a tu bonificador de competencia al impactar.',
    badge: '1d8 Perforante • Curación = Bonificador de Competencia',
  },
  {
    id: 'bestia-garras',
    name: 'Garras Desgarradoras (Claws)',
    desc: 'Tus manos se transforman en garras temibles. Inflige 1d6 de daño cortante + Fuerza. Una vez en cada uno de tus turnos, cuando atacas con una garra usando la acción de Atacar, puedes realizar un ataque adicional con tus garras como parte de la misma acción.',
    badge: '1d6 Cortante • +1 Ataque Extra Gratis',
  },
  {
    id: 'bestia-cola',
    name: 'Cola Puntiaguda Defensiva (Tail)',
    desc: 'Te brota una cola musculosa y espinosa con alcance de 10 pies. Inflige 1d8 de daño perforante + Fuerza. Como reacción cuando una criatura a 10 pies o menos te impacte con un ataque, puedes tirar 1d8 y sumarlo a tu CA para ese ataque, pudiendo hacer que falle.',
    badge: '1d8 Perforante • Alcance 10 pies • Reacción +1d8 CA',
  },
];

export const BEAST_SOUL_ADAPTATION_OPTIONS: DecisionOption[] = [
  {
    id: 'adaptacion-nado',
    name: 'Adaptación Acuática (Swimming & Water Breathing)',
    desc: 'Desarrollas branquias y membranas: obtienes una velocidad de nado igual a tu velocidad a pie y puedes respirar bajo el agua indefinidamente.',
    badge: 'Velocidad de Nado • Respiración Acuática',
  },
  {
    id: 'adaptacion-escalada',
    name: 'Adaptación Arácnida / Felina (Climbing & Ceilings)',
    desc: 'Tus extremidades se adhieren a cualquier superficie: obtienes una velocidad de escalada igual a tu velocidad a pie y puedes escalar superficies difíciles, incluyendo moverte boca abajo por techos, sin necesidad de realizar pruebas de característica.',
    badge: 'Velocidad de Escalada • Desplazamiento por Techos',
  },
  {
    id: 'adaptacion-salto',
    name: 'Salto Propulsado (Athletic Jump)',
    desc: 'Tus piernas concentran una fuerza colosal: cuando realizas un salto, puedes hacer una prueba de Fuerza (Atletismo) y extender la distancia del salto en un número de pies igual al total de tu tirada.',
    badge: 'Salto Extendido +Prueba de Atletismo en Pies',
  },
];

// --------------------------------------------------------------------------
// 7.5 STORM HERALD - ENVIRONMENTS (HERALDO DE LA TORMENTA NIVEL 3)
// --------------------------------------------------------------------------
export const STORM_HERALD_ENVIRONMENTS: DecisionOption[] = [
  {
    id: 'tormenta-desierto',
    name: 'Desierto Abrasador (Desert)',
    desc: 'Canalizas el fuego implacable de las dunas. Aura (10 pies): acción adicional inflige daño de fuego (2 a Nv 3, 3 a Nv 5, 4 a Nv 10, 5 a Nv 15, 6 a Nv 20) a las criaturas a 10 pies. Nv 6: resistencia al fuego y confort en calor extremo. Nv 10: otorgas resistencia al fuego a aliados en tu aura. Nv 14: reacción al recibir daño para infligir la mitad de tu nivel de bárbaro en fuego al atacante.',
    badge: 'Aura Ígnea • Daño de Fuego • Resistencia Ígnea',
  },
  {
    id: 'tormenta-mar',
    name: 'Mar Tormentoso (Sea)',
    desc: 'Canalizas el rugido del océano y el rayo. Aura (10 pies): acción adicional obliga a una criatura a 10 pies a superar salvación de Destreza o sufrir 1d6 daño de relámpago (2d6 a Nv 10, 3d6 a Nv 15, 4d6 a Nv 20). Nv 6: resistencia a relámpago, respiras agua y 30 pies de nado. Nv 10: otorgas resistencia eléctrica a aliados. Nv 14: derribas al objetivo al impactarlo en tu aura (salva FUE).',
    badge: 'Aura de Rayos • 1d6-4d6 Relámpago • Nado & Respiración',
  },
  {
    id: 'tormenta-tundra',
    name: 'Tundra Gélida (Tundra)',
    desc: 'Canalizas el frío glacial y la resistencia del hielo eterno. Aura (10 pies): acción adicional concede 2 PG temporales a aliados a 10 pies (3 a Nv 5, 4 a Nv 10, 5 a Nv 15, 6 a Nv 20). Nv 6: resistencia al frío y confort en frío extremo. Nv 10: otorgas resistencia a frío a aliados. Nv 14: congelas a un rival en tu aura reduciendo su velocidad a 0 pies si falla salvación de Fuerza.',
    badge: 'Aura Glacial • PG Temporales en Masa • Resistencia Frío',
  },
];

// --------------------------------------------------------------------------
// 7.6 PATH OF THE GIANT - ELEMENTAL CLEAVER (GIGANTE NIVEL 6)
// --------------------------------------------------------------------------
export const GIANT_ELEMENTAL_CLEAVER_OPTIONS: DecisionOption[] = [
  {
    id: 'cleaver-fuego',
    name: 'Fuego de Gigante del Fuego (Fire Cleaver)',
    desc: 'Tu arma emana llamas abrasadoras. Inflige +1d6 de daño de fuego adicional (+2d6 a Nivel 14). Gana la propiedad arrojadiza (alcance 20/60 pies) y regresa mágicamente a tu mano inmediatamente tras el ataque.',
    badge: '+1d6/+2d6 Fuego • Arrojadiza Retornante',
  },
  {
    id: 'cleaver-frio',
    name: 'Escarcha de Gigante de la Escarcha (Cold Cleaver)',
    desc: 'Tu arma se cubre de carámbanos glaciales. Inflige +1d6 de daño de frío adicional (+2d6 a Nivel 14). Gana la propiedad arrojadiza (alcance 20/60 pies) y regresa instantáneamente a tu mano.',
    badge: '+1d6/+2d6 Frío • Arrojadiza Retornante',
  },
  {
    id: 'cleaver-relampago',
    name: 'Relámpago de Gigante de la Tormenta (Lightning Cleaver)',
    desc: 'Tu arma chisporrotea con arcos eléctricos. Inflige +1d6 de daño de relámpago adicional (+2d6 a Nivel 14). Gana la propiedad arrojadiza (alcance 20/60 pies) y retorna mágicamente al instante.',
    badge: '+1d6/+2d6 Relámpago • Arrojadiza Retornante',
  },
  {
    id: 'cleaver-trueno',
    name: 'Trueno de las Cumbres (Thunder Cleaver)',
    desc: 'Tu arma retumba con ondas de choque sísmicas. Inflige +1d6 de daño de trueno adicional (+2d6 a Nivel 14). Gana la propiedad arrojadiza (alcance 20/60 pies) y regresa a tu mano al instante.',
    badge: '+1d6/+2d6 Trueno • Arrojadiza Retornante',
  },
  {
    id: 'cleaver-acido',
    name: 'Ácido Corrosivo de las Profundidades (Acid Cleaver)',
    desc: 'Tu arma rezuma jugos corrosivos primordiales. Inflige +1d6 de daño de ácido adicional (+2d6 a Nivel 14). Gana la propiedad arrojadiza (alcance 20/60 pies) y regresa a tu mano al instante.',
    badge: '+1d6/+2d6 Ácido • Arrojadiza Retornante',
  },
];

// --------------------------------------------------------------------------
// 8. RUNE KNIGHT RUNES (GUERRERO - CABALLERO RÚNICO)
// --------------------------------------------------------------------------
export const RUNE_KNIGHT_RUNES: DecisionOption[] = [
  { id: 'runa-nube', name: 'Runa de la Nube (Cloud Rune)', desc: 'Pasiva: Ventaja en pruebas de Juego de Manos y Engaño. Activa: Como reacción al impactarte a ti o a un aliado a 30 pies, rediriges el ataque a otra criatura a 30 pies (1/descanso corto o largo).', badge: 'Nv 3 • Reacción Deflectora' },
  { id: 'runa-fuego', name: 'Runa del Fuego (Fire Rune)', desc: 'Pasiva: Doblas tu competencia en pruebas con herramientas. Activa: Al impactar con un arma, convocas grilletes ígneos que infligen 2d6 fuego y apresan al rival (salvación Fuerza cada turno) (1/descanso corto o largo).', badge: 'Nv 3 • Grilletes Ígneos' },
  { id: 'runa-escarcha', name: 'Runa de la Escarcha (Frost Rune)', desc: 'Pasiva: Ventaja en pruebas de Trato con Animales e Intimidación. Activa: Acción adicional para sumar +2 a todas tus pruebas y salvaciones de Fuerza y Constitución durante 10 minutos (1/descanso corto o largo).', badge: 'Nv 3 • Baluarte Ártico' },
  { id: 'runa-piedra', name: 'Runa de la Piedra (Stone Rune)', desc: 'Pasiva: Ventaja en Perspicacia y visión en la oscuridad de 120 pies. Activa: Reacción cuando un enemigo termine su turno a 30 pies para sumirlo en un letargo hipnótico (incapacitado) si falla salvación de Sabiduría (1/descanso corto o largo).', badge: 'Nv 3 • Letargo Hipnótico' },
  { id: 'runa-colina', name: 'Runa de la Colina (Hill Rune)', desc: 'Pasiva: Ventaja en salvaciones contra veneno y resistencia al daño de veneno. Activa: Acción adicional para ganar resistencia al daño contundente, perforante y cortante durante 1 minuto (1/descanso corto o largo).', badge: 'Nv 7 • Resistencia Física' },
  { id: 'runa-tormenta', name: 'Runa de la Tormenta (Storm Rune)', desc: 'Pasiva: Ventaja en pruebas de Arcanos y no puedes ser sorprendido. Activa: Durante 1 minuto puedes usar tu reacción cada turno para otorgar ventaja o desventaja en cualquier d20 a 60 pies (1/descanso corto o largo).', badge: 'Nv 7 • Augurio de Tormenta' },
];

// --------------------------------------------------------------------------
// 9. ARCANE ARCHER SHOTS (GUERRERO - ARQUERO ARCANO)
// --------------------------------------------------------------------------
export const ARCANE_ARCHER_SHOTS: DecisionOption[] = [
  { id: 'disparo-desterrador', name: 'Disparo Desterrador (Banishing Arrow)', desc: 'Al impactar, obligas al objetivo a hacer salvación de Carisma o ser desterrado temporalmente al plano Feywild hasta el final de su siguiente turno.', badge: 'Destierro Temporal' },
  { id: 'disparo-bramido', name: 'Disparo de Bramido (Bursting Arrow)', desc: 'Al impactar con la flecha, detona en una onda expansiva de fuerza que inflige 2d6 de daño de fuerza adicional al objetivo y a todas las criaturas a 10 pies.', badge: 'Área 2d6 Fuerza' },
  { id: 'disparo-enredador', name: 'Disparo Enredador (Grasping Arrow)', desc: 'Zarcillos espinosos aprisionan a la víctima: sufre 2d6 de daño de veneno, su velocidad se reduce en 10 pies y sufre 2d6 de daño cortante cada vez que se mueva.', badge: 'Zarcillos Espinosos' },
  { id: 'disparo-perforante', name: 'Disparo Perforante (Piercing Arrow)', desc: 'La flecha se transforma en una línea etérea de 30 pies de largo y 1 pie de ancho que atraviesa objetos y criaturas, forzando salvación de Destreza.', badge: 'Línea Penetrante' },
  { id: 'disparo-buscador', name: 'Disparo Buscador (Seeking Arrow)', desc: 'La flecha busca a su presa guiada por magia: ignora cobertura y no requiere línea de visión directa si sabes dónde está el objetivo.', badge: 'Proyectil Guiado' },
  { id: 'disparo-sombrio', name: 'Disparo Sombrío (Shadow Arrow)', desc: 'Magia de sombras teje ceguera sobre la víctima: sufre 2d6 de daño psíquico y no puede ver más allá de 5 pies hasta el final de tu siguiente turno si falla salvación de Sabiduría.', badge: 'Ceguera Sombría' },
  { id: 'disparo-debilitador', name: 'Disparo Debilitador (Enfeebling Arrow)', desc: 'Magia nigromántica drena la vitalidad: 2d6 de daño necrótico y el daño de los ataques con arma del rival se reduce a la mitad si falla salvación de Constitución.', badge: 'Debilidad Nigromántica' },
  { id: 'disparo-fascinante', name: 'Disparo Fascinante (Beguiling Arrow)', desc: 'Hechiza al objetivo: sufre 2d6 de daño psíquico y no puede atacar a uno de tus aliados a tu elección hasta el final de su siguiente turno.', badge: 'Encanto Psíquico' },
];

// --------------------------------------------------------------------------
// 10. DRACONIC ANCESTRY (HECHICERO LINAJE DRACÓNICO)
// --------------------------------------------------------------------------
export const DRACONIC_ANCESTRY_OPTIONS: DecisionOption[] = [
  { id: 'dragon-rojo', name: 'Dragón Rojo (Red Dragon)', desc: 'Afinidad con el Fuego abrasador. A nivel 6 sumas tu Carisma al daño de conjuros de fuego y ganas resistencia al fuego gastando 1 punto de hechicería.', badge: 'Elemento: Fuego' },
  { id: 'dragon-oro', name: 'Dragón de Oro (Gold Dragon)', desc: 'Afinidad con el Fuego purificador y la justicia dorada. Resistencia y potencia ígnea.', badge: 'Elemento: Fuego' },
  { id: 'dragon-laton', name: 'Dragón de Latón (Brass Dragon)', desc: 'Afinidad con el Fuego ardiente del desierto. Resistencia y potencia ígnea.', badge: 'Elemento: Fuego' },
  { id: 'dragon-azul', name: 'Dragón Azul (Blue Dragon)', desc: 'Afinidad con el Relámpago y las tormentas de arena. Bonificador al daño de relámpago.', badge: 'Elemento: Relámpago' },
  { id: 'dragon-bronce', name: 'Dragón de Bronce (Bronze Dragon)', desc: 'Afinidad con el Relámpago costero y marítimo. Resistencia y daño eléctrico.', badge: 'Elemento: Relámpago' },
  { id: 'dragon-blanco', name: 'Dragón Blanco (White Dragon)', desc: 'Afinidad con el Frío polar implacable. Bonificador al daño de frío y resistencia ártica.', badge: 'Elemento: Frío' },
  { id: 'dragon-plata', name: 'Dragón de Plata (Silver Dragon)', desc: 'Afinidad con el Frío noble y la escarcha celestial. Resistencia y daño de frío.', badge: 'Elemento: Frío' },
  { id: 'dragon-negro', name: 'Dragón Negro (Black Dragon)', desc: 'Afinidad con el Ácido corrosivo de ciénagas oscuras. Bonificador al daño de ácido.', badge: 'Elemento: Ácido' },
  { id: 'dragon-cobre', name: 'Dragón de Cobre (Copper Dragon)', desc: 'Afinidad con el Ácido y el ingenio terrenal. Resistencia y daño de ácido.', badge: 'Elemento: Ácido' },
  { id: 'dragon-verde', name: 'Dragón Verde (Green Dragon)', desc: 'Afinidad con el Veneno engañoso de bosques primigenios. Daño y resistencia a veneno.', badge: 'Elemento: Veneno' },
];

export const DIVINE_SOUL_AFFINITIES: DecisionOption[] = [
  { id: 'bueno', name: 'Bueno (Good) - Curar Heridas', desc: 'Afinidad con la benevolencia y la curación. Aprendes el conjuro Curar Heridas (Cure Wounds) de forma gratuita.', badge: 'Curar Heridas' },
  { id: 'maligno', name: 'Maligno (Evil) - Infligir Heridas', desc: 'Afinidad con la perdición y la necrosis. Aprendes el conjuro Infligir Heridas (Inflict Wounds) de forma gratuita.', badge: 'Infligir Heridas' },
  { id: 'ley', name: 'Ley (Law) - Bendición', desc: 'Afinidad con el orden cósmico y la justicia. Aprendes el conjuro Bendición (Bless) de forma gratuita.', badge: 'Bendición' },
  { id: 'caos', name: 'Caos (Chaos) - Saeta Guía', desc: 'Afinidad con la entropía primordial y el destino cambiante. Aprendes el conjuro Saeta Guía (Guiding Bolt) de forma gratuita.', badge: 'Saeta Guía' },
  { id: 'neutralidad', name: 'Neutralidad (Neutrality) - Protección contra el Mal y el Bien', desc: 'Afinidad con el equilibrio cósmico. Aprendes el conjuro Protección contra el Mal y el Bien de forma gratuita.', badge: 'Protección' },
];

export const LUNAR_SORCERY_PHASES: DecisionOption[] = [
  { id: 'luna-llena', name: 'Luna Llena (Full Moon)', desc: 'Escuelas de Abjuración y Adivinación. Conjuro gratuito: Escudo de Fe. Ventaja en Investigación y Percepción.', badge: 'Luz Radiante & Protección' },
  { id: 'luna-nueva', name: 'Luna Nueva (New Moon)', desc: 'Escuelas de Ilusión y Nigromancia. Conjuro gratuito: Falsa Vida. Ventaja en Sigilo.', badge: 'Sombras & Engaño' },
  { id: 'luna-creciente', name: 'Luna Creciente (Crescent Moon)', desc: 'Escuelas de Transmutación y Conjuración. Conjuro gratuito: Rayo de Enfermedad. Resistencia a daño radiante y necrótico.', badge: 'Mutación & Arcano' },
];

// --------------------------------------------------------------------------
// 11. LAND CIRCLE BIOMES (DRUIDA CÍRCULO DE LA TIERRA)
// --------------------------------------------------------------------------
export const LAND_CIRCLE_BIOMES: DecisionOption[] = [
  { id: 'artico', name: 'Ártico (Arctic)', desc: 'Conjuros siempre preparados: Nv 3 (Caminar sobre el Agua, Retener Persona), Nv 5 (Tormenta de Granizo, Ralentizar), Nv 7 (Libertad de Movimiento, Tormenta de Hielo), Nv 9 (Comunión con la Naturaleza, Cono de Frío).', badge: 'Frío & Hielo' },
  { id: 'costa', name: 'Costa (Coast)', desc: 'Conjuros siempre preparados: Nv 3 (Imagen Espejada, Paso Brumoso), Nv 5 (Caminar sobre el Agua, Respiración Acuática), Nv 7 (Controlar el Agua, Libertad de Movimiento), Nv 9 (Conjurar Elemental, Escudriñar).', badge: 'Agua & Bruma' },
  { id: 'desierto', name: 'Desierto (Desert)', desc: 'Conjuros siempre preparados: Nv 3 (Borrón, Silencio), Nv 5 (Crear Comida y Agua, Protección contra la Energía), Nv 7 (Marchitar, Plaga de Insectos), Nv 9 (Muro de Piedra, Nube Mortal).', badge: 'Fuego & Resistencia' },
  { id: 'bosque', name: 'Bosque (Forest)', desc: 'Conjuros siempre preparados: Nv 3 (Piel Robusta, Trepar cual Arácnido), Nv 5 (Llamar al Relámpago, Crecimiento Vegetal), Nv 7 (Adivinación, Libertad de Movimiento), Nv 9 (Comunión con la Naturaleza, Reencarnar).', badge: 'Vida & Vegetación' },
  { id: 'pradera', name: 'Pradera (Grassland)', desc: 'Conjuros siempre preparados: Nv 3 (Invisibilidad, Pasar sin Huella), Nv 5 (Luz Diurna, Aceleración), Nv 7 (Adivinación, Libertad de Movimiento), Nv 9 (Pasacalles, Sueño Telúrico).', badge: 'Velocidad & Evasión' },
  { id: 'montana', name: 'Montaña (Mountain)', desc: 'Conjuros siempre preparados: Nv 3 (Trepar cual Arácnido, Salto), Nv 5 (Relámpago, Fundirse con la Piedra), Nv 7 (Piel Pétrea, Muro de Piedra), Nv 9 (Pasar Muro, Tormenta Glacial).', badge: 'Roca & Trueno' },
  { id: 'pantano', name: 'Pantano (Swamp)', desc: 'Conjuros siempre preparados: Nv 3 (Oscuridad, Flecha Ácida de Melf), Nv 5 (Caminar sobre el Agua, Nube Hedionda), Nv 7 (Marchitar, Localizar Criatura), Nv 9 (Plaga de Insectos, Escudriñar).', badge: 'Ácido & Podredumbre' },
  { id: 'inframundo', name: 'Inframundo (Underdark)', desc: 'Conjuros siempre preparados: Nv 3 (Trepar cual Arácnido, Telaraña), Nv 5 (Forma Gaseosa, Luz Diurna), Nv 7 (Invisibilidad Mayor, Modelar Piedra), Nv 9 (Nube Mortal, Apariencia).', badge: 'Oscuridad & Criptas' },
];

// --------------------------------------------------------------------------
// 12. RANGER DECISIONS (ENEMIGO PREDILECTO & EXPLORADOR NATURAL)
// --------------------------------------------------------------------------
export const RANGER_FAVORED_ENEMIES: DecisionOption[] = [
  { id: 'bestias', name: 'Bestias (Beasts)', desc: 'Ventaja en pruebas de Supervivencia para rastrear y en Saber para recordar información sobre bestias.', badge: 'Fauna Silvestre' },
  { id: 'feéricos', name: 'Feéricos (Fey)', desc: 'Ventaja al rastrear y conocer duendes, ninfas, sátiros y seres del Feywild.', badge: 'Seres Feéricos' },
  { id: 'humanoides', name: 'Humanoides (2 razas)', desc: 'Eliges dos etnias o razas humanoides (ej. Orcos y Trasgos, o Elfos y Humanos).', badge: 'Humanoides' },
  { id: 'monstruosidades', name: 'Monstruosidades (Monstrosities)', desc: 'Ventaja contra quimeras, grifos, mantícoras y aberraciones híbridas.', badge: 'Monstruos' },
  { id: 'no-muertos', name: 'No-Muertos (Undead)', desc: 'Ventaja contra esqueletos, zombis, vampiros, necrófagos y espectros.', badge: 'Nigromancia' },
  { id: 'dragones', name: 'Dragones (Dragons)', desc: 'Ventaja contra dragones cromáticos, metálicos y sierpes legendarias.', badge: 'Dracónico' },
  { id: 'aberraciones', name: 'Aberraciones (Aberrations)', desc: 'Ventaja contra azotamentes, contempladores y entidades del Reino Lejano.', badge: 'Reino Lejano' },
  { id: 'infernales', name: 'Infernales (Fiends)', desc: 'Ventaja contra demonios del Abismo y diablos de los Nueve Infiernos.', badge: 'Planos Infernales' },
  { id: 'elementales', name: 'Elementales (Elementals)', desc: 'Ventaja contra criaturas de Fuego, Agua, Tierra y Aire.', badge: 'Planos Elementales' },
  { id: 'gigantes', name: 'Gigantes (Giants)', desc: 'Ventaja contra ogros, trolls, gigantes de las colinas, escarcha, fuego y tormenta.', badge: 'Gigantes' },
];

export const RANGER_NATURAL_EXPLORER: DecisionOption[] = [
  { id: 'artico', name: 'Ártico (Arctic)', desc: 'El terreno difícil no ralentiza el viaje de tu grupo en la tundra y nieve. No puedes perderte salvo por medios mágicos.', badge: 'Nieve & Hielo' },
  { id: 'costa', name: 'Costa (Coast)', desc: 'Ventaja y navegación perfecta en litorales marítimos y archipiélagos.', badge: 'Playas & Marismas' },
  { id: 'desierto', name: 'Desierto (Desert)', desc: 'Sobrevives sin penalizadores en dunas áridas, calor extremo y tormentas de arena.', badge: 'Arenas & Cañones' },
  { id: 'bosque', name: 'Bosque (Forest)', desc: 'Movimiento sigiloso y comida abundante en arboledas densas y selvas.', badge: 'Arboledas & Selvas' },
  { id: 'pradera', name: 'Pradera (Grassland)', desc: 'Visión y rastreo ilimitados en llanuras abiertas y sabanas.', badge: 'Llanuras & Sabanas' },
  { id: 'montana', name: 'Montaña (Mountain)', desc: 'Escalada sin fatiga y paso seguro por riscos y cordilleras escarpadas.', badge: 'Picos & Cordilleras' },
  { id: 'pantano', name: 'Pantano (Swamp)', desc: 'Inmune al terreno enfangado y cenagoso de marismas y ciénagas.', badge: 'Ciénagas & Lodazales' },
  { id: 'inframundo', name: 'Inframundo (Underdark)', desc: 'Orientación infalible en la profunda red de cavernas subterráneas.', badge: 'Cavernas & Criptas' },
];

export const RANGER_FIGHTING_STYLES: DecisionOption[] = [
  { id: 'tiro-arco', name: 'Tiro con Arco (Archery)', desc: '+2 a las tiradas de ataque con armas a distancia.', badge: '+2 Ataque a Distancia' },
  { id: 'defensa', name: 'Defensa (Defense)', desc: '+1 a tu Clase de Armadura mientras vistas armadura.', badge: '+1 CA' },
  { id: 'duelo', name: 'Duelo (Dueling)', desc: '+2 al daño cuando empuñas un arma a una mano y ninguna otra.', badge: '+2 Daño a Una Mano' },
  { id: 'dos-armas', name: 'Combate con Dos Armas (Two-Weapon Fighting)', desc: 'Suma tu bonificador de característica al daño del ataque de acción adicional con la segunda arma.', badge: 'Dos Armas Completo' },
  { id: 'lucha-ciegas', name: 'Lucha a Ciegas (Blind Fighting - Tasha)', desc: 'Posees vista a ciegas con un radio de 10 pies. Puedes ver criaturas invisibles y en oscuridad total.', badge: 'Vista a Ciegas 10 pies' },
  { id: 'tecnica-druida', name: 'Técnica del Druida (Druidic Warrior - Tasha)', desc: 'Aprendes dos trucos a tu elección de la lista de conjuros de Druida. Cuentan como conjuros de explorador y usan tu Sabiduría.', badge: '2 Trucos de Druida' },
];

export const HUNTER_PREY_OPTIONS: DecisionOption[] = [
  { id: 'asesino-colosos', name: 'Asesino de Colosos (Colossus Slayer)', desc: 'Una vez por turno al impactar a una criatura con un arma, infliges +1d8 de daño adicional si la criatura está por debajo de sus puntos de golpe máximos.', badge: '+1d8 Daño Arma' },
  { id: 'cortador-hordas', name: 'Cortador de Hordas (Horde Breaker)', desc: 'Una vez en cada uno de tus turnos al hacer un ataque de arma, puedes realizar otro ataque con la misma arma contra una criatura diferente a 5 pies de la original.', badge: 'Ataque Extra Adyacente' },
  { id: 'asesino-gigantes', name: 'Asesino de Gigantes (Giant Killer)', desc: 'Cuando una criatura Grande o mayor a 5 pies te ataque y falle, puedes usar tu reacción para atacarla de inmediato con un arma.', badge: 'Reacción Contraataque' },
];

export const HUNTER_DEFENSIVE_TACTICS: DecisionOption[] = [
  { id: 'escapar-horda', name: 'Escapar de la Horda (Escape the Horde)', desc: 'Las criaturas enemigas sufren desventaja en todas las tiradas de ataques de oportunidad contra ti.', badge: 'Desventaja Oportunidad' },
  { id: 'defensa-ataque-multiple', name: 'Defensa contra Ataques Múltiples (Multiattack Defense)', desc: 'Cuando una criatura te impacta con un ataque, ganas +4 a tu CA contra todos los ataques subsiguientes de esa criatura en el turno.', badge: '+4 CA vs Mismo Rival' },
  { id: 'voluntad-acero', name: 'Voluntad de Acero (Steel Will)', desc: 'Tienes ventaja en todas las tiradas de salvación contra el efecto de ser asustado.', badge: 'Ventaja vs Miedo' },
];

export const HUNTER_MULTIATTACK_OPTIONS: DecisionOption[] = [
  { id: 'andanada', name: 'Andanada (Volley)', desc: 'Como acción, realizas un ataque a distancia contra cualquier cantidad de criaturas en un radio de 10 pies de un punto visible dentro del alcance de tu arma.', badge: 'Lluvia de Flechas (Área)' },
  { id: 'ataque-torbellino', name: 'Ataque en Torbellino (Whirlwind Attack)', desc: 'Como acción, realizas un ataque cuerpo a cuerpo contra cualquier número de criaturas a 5 pies de ti.', badge: 'Barrido Circular CaC' },
];

export const HUNTER_SUPERIOR_DEFENSE: DecisionOption[] = [
  { id: 'evasion', name: 'Evasión (Evasion)', desc: 'Cuando sufres un efecto que requiere salvación de Destreza para mitigar el daño (ej. Bola de Fuego), no recibes daño si superas la tirada y solo la mitad si fallas.', badge: 'Evasión Destreza' },
  { id: 'esquiva-asombrosa', name: 'Esquiva Asombrosa (Uncanny Dodge)', desc: 'Cuando un atacante visible te impacta con un ataque, puedes usar tu reacción para reducir a la mitad el daño que recibes.', badge: 'Reacción Mitad Daño' },
  { id: 'oponerse-marea', name: 'Oponerse a la Marea (Stand Against the Tide)', desc: 'Cuando una criatura hostil falla un ataque cuerpo a cuerpo contra ti, puedes usar tu reacción para obligarla a repetir ese mismo ataque contra otro enemigo a 5 pies de ella.', badge: 'Reacción Redirigir Ataque' },
];

export const DRAKEWARDEN_DRACONIC_ESSENCE: DecisionOption[] = [
  { id: 'fuego', name: 'Fuego (Fire)', desc: 'El drake emana llamas ardientes. Sus mordiscos infligen +1d6 daño de fuego y tiene inmunidad al fuego.', badge: 'Esencia Ígnea' },
  { id: 'frio', name: 'Frío (Cold)', desc: 'El drake irradia escarcha polar. Sus mordiscos infligen +1d6 daño de frío y tiene inmunidad al frío.', badge: 'Esencia Glacial' },
  { id: 'relampago', name: 'Relámpago (Lightning)', desc: 'El drake chisporrotea con arcos eléctricos. Sus mordiscos infligen +1d6 daño de relámpago y tiene inmunidad al relámpago.', badge: 'Esencia Eléctrica' },
  { id: 'acido', name: 'Ácido (Acid)', desc: 'El drake supura jugos corrosivos. Sus mordiscos infligen +1d6 daño de ácido y tiene inmunidad al ácido.', badge: 'Esencia Corrosiva' },
  { id: 'veneno', name: 'Veneno (Poison)', desc: 'El drake exuda toxinas letales. Sus mordiscos infligen +1d6 daño de veneno y tiene inmunidad al veneno.', badge: 'Esencia Venenosa' },
];

export const SAMURAI_BONUS_SKILLS: DecisionOption[] = [
  { id: 'historia', name: 'Historia (History)', desc: 'Conocimiento sobre linajes nobles, guerras legendarias y dinastías antiguas.', badge: 'Inteligencia' },
  { id: 'perspicacia', name: 'Perspicacia (Insight)', desc: 'Intuir las verdaderas intenciones y honor de tus interlocutores.', badge: 'Sabiduría' },
  { id: 'actuacion', name: 'Actuación (Performance)', desc: 'Demostrar el porte marcial y ceremonias cortesanas ante la corte.', badge: 'Carisma' },
  { id: 'persuasion', name: 'Persuasión (Persuasion)', desc: 'Influir con cortesía implacable y diplomacia regia.', badge: 'Carisma' },
];

// --------------------------------------------------------------------------
// 12.5. ARTIFICER INFUSIONS (INFUSIONES DE ARTÍFICE - TASHA / EBERRON)
// --------------------------------------------------------------------------
export interface ArtificerInfusionOption extends DecisionOption {
  minLevel: number;
  itemType: string;
}

export const ARTIFICER_INFUSIONS: ArtificerInfusionOption[] = [
  // --- INFUSIONES ARCANAS BÁSICAS (NIVEL 2+) ---
  {
    id: 'defensa-mejorada',
    name: 'Defensa Mejorada (Enhanced Defense)',
    desc: 'Armadura o escudo: Otorga un bonificador de +1 a la Clase de Armadura mientras se lleve puesta o empuñe. A nivel 10 de artífice, el bonificador aumenta a +2.',
    badge: 'Nv 2 • +1/+2 CA',
    minLevel: 2,
    itemType: 'Armadura o Escudo',
  },
  {
    id: 'arma-mejorada',
    name: 'Arma Mejorada (Enhanced Weapon)',
    desc: 'Arma simple o marcial: Otorga un bonificador de +1 a las tiradas de ataque y daño con ella. A nivel 10 de artífice, el bonificador aumenta a +2.',
    badge: 'Nv 2 • +1/+2 Ataque y Daño',
    minLevel: 2,
    itemType: 'Arma simple o marcial',
  },
  {
    id: 'foco-arcano-mejorado',
    name: 'Foco Arcano Mejorado (Enhanced Arcane Focus)',
    desc: 'Vara, báculo o varita: Otorga un bonificador de +1 a las tiradas de ataque de conjuro del portador e ignora la cobertura media. A nivel 10 de artífice, el bonificador aumenta a +2.',
    badge: 'Nv 2 • +1/+2 Ataque de Conjuro',
    minLevel: 2,
    itemType: 'Vara, báculo o varita',
  },
  {
    id: 'disparo-repetidor',
    name: 'Disparo Repetidor (Repeating Shot)',
    desc: 'Arma a distancia con propiedad de munición: Otorga +1 a las tiradas de ataque y daño, ignora la propiedad de recarga y produce mágicamente su propia munición infinita si no se carga proyectil.',
    badge: 'Nv 2 • +1 Munición Mágica Infinita',
    minLevel: 2,
    itemType: 'Arma a distancia con munición',
  },
  {
    id: 'arma-retornante',
    name: 'Arma Retornante (Returning Weapon)',
    desc: 'Arma simple o marcial arrojadiza: Otorga +1 a las tiradas de ataque y daño cuando se arroja, y vuela inmediatamente de regreso a la mano del portador tras el impacto o fallo.',
    badge: 'Nv 2 • +1 Arrojadiza Retornante',
    minLevel: 2,
    itemType: 'Arma arrojadiza',
  },
  {
    id: 'armadura-fuerza-magica',
    name: 'Armadura de Fuerza Mágica (Armor of Magical Strength)',
    desc: 'Traje de armadura (requiere sintonización): Posee 6 cargas. Permite gastar 1 carga para sumar la Inteligencia a cualquier prueba o salvación de Fuerza, y usar una reacción para evitar caer derribado al suelo.',
    badge: 'Nv 2 • 6 Cargas (Int a Fuerza)',
    minLevel: 2,
    itemType: 'Traje de armadura',
  },
  {
    id: 'baluarte-mental',
    name: 'Baluarte Mental (Mind Sharpener)',
    desc: 'Traje de armadura o túnica: Posee 4 cargas. Cuando el portador falla una salvación de Constitución para mantener la concentración en un conjuro, puede usar su reacción para gastar 1 carga y superarla automáticamente.',
    badge: 'Nv 2 • 4 Cargas (Éxito Concentración)',
    minLevel: 2,
    itemType: 'Armadura o túnica',
  },
  {
    id: 'sirviente-homunculo',
    name: 'Sirviente Homúnculo (Homunculus Servant)',
    desc: 'Gema o cristal de 100 po: Creas un autómata volador leal (CA 13, vuela 30 pies) que actúa en tu turno con tu acción adicional para realizar un ataque de Golpe de Fuerza o canalizar un conjuro tuyo de toque.',
    badge: 'Nv 2 • Autómata Aliado Volador',
    minLevel: 2,
    itemType: 'Gema o cristal tallado',
  },

  // --- RÉPLICAS OFICIALES DE OBJETOS MÁGICOS (NIVEL 2+) ---
  {
    id: 'replica-bolsa-contencion',
    name: 'Réplica: Bolsa de Contención (Bag of Holding)',
    desc: 'Bolsa no mágica: Contenedor extradimensional que almacena hasta 500 lb y 64 pies cúbicos, pesando siempre 15 lb.',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Bolsa no mágica',
  },
  {
    id: 'replica-gafas-noche',
    name: 'Réplica: Gafas de Noche (Goggles of Night)',
    desc: 'Lentes: Otorga visión en la oscuridad en un radio de 60 pies (o suma +60 pies al alcance existente).',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Lentes o anteojos',
  },
  {
    id: 'replica-jarra-alquimia',
    name: 'Réplica: Jarra de Alquimia (Alchemy Jug)',
    desc: 'Jarra cerámica: Produce líquidos a diario (ácido, cerveza, agua dulce, vino, aceite, veneno básico).',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Jarra cerámica',
  },
  {
    id: 'replica-aljaba-ehlonna',
    name: 'Réplica: Aljaba de Ehlonna (Quiver of Ehlonna)',
    desc: 'Carcaj: Tres compartimentos extradimensionales para 60 flechas, 18 jabalinas y 6 arcos o bastones.',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Carcaj o aljaba',
  },
  {
    id: 'replica-cuerda-escalar',
    name: 'Réplica: Cuerda de Escalar (Rope of Climbing)',
    desc: 'Cuerda de 60 pies: Se anuda, escala y desenreda siguiendo órdenes verbales a 30 pies.',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Cuerda de 60 pies',
  },
  {
    id: 'replica-capa-respiracion',
    name: 'Réplica: Capa de Respiración Acuática (Cap of Water Breathing)',
    desc: 'Gorro: Permite respirar bajo el agua indefinidamente creando una burbuja de aire constante.',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Gorro o capucha',
  },
  {
    id: 'replica-varita-deteccion',
    name: 'Réplica: Varita de Detección de Magia (Wand of Magic Detection)',
    desc: 'Varita: 3 cargas. Permite lanzar Detectar Magia a voluntad sin gastar ranuras ni componentes.',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Varita',
  },
  {
    id: 'replica-varita-secretos',
    name: 'Réplica: Varita de Secretos (Wand of Secrets)',
    desc: 'Varita: 3 cargas. Revela puertas secretas y trampas en un radio de 30 pies.',
    badge: 'Nv 2 • Réplica Poco Común',
    minLevel: 2,
    itemType: 'Varita',
  },
  {
    id: 'replica-amuleto-relojero',
    name: 'Réplica: Amuleto de Relojero (Clockwork Amulet)',
    desc: 'Amuleto: 1 vez al día, al atacar puedes elegir un 10 natural en el d20 en vez de tirar el dado.',
    badge: 'Nv 2 • Réplica Común',
    minLevel: 2,
    itemType: 'Amuleto',
  },

  // --- INFUSIONES ARCANAS AVANZADAS (NIVEL 6+) ---
  {
    id: 'botas-sendero-serpenteante',
    name: 'Botas del Sendero Serpenteante (Boots of the Winding Path)',
    desc: 'Par de botas (requiere sintonización): Permite usar una acción adicional para teletransportarse mágicamente hasta 30 pies a un espacio desocupado donde hayas estado en algún momento durante el turno actual.',
    badge: 'Nv 6 • Teletransporte 30 pies',
    minLevel: 6,
    itemType: 'Par de botas',
  },
  {
    id: 'arma-radiante',
    name: 'Arma Radiante (Radiant Weapon)',
    desc: 'Arma simple o marcial (requiere sintonización): +1 ataque y daño. Emite luz brillante a 30 pies y, como reacción al recibir un impacto, puede cegar al atacante hasta el final del próximo turno de este (salvación Constitución CD artífice).',
    badge: 'Nv 6 • +1 Ceguera Reactiva',
    minLevel: 6,
    itemType: 'Arma simple o marcial',
  },
  {
    id: 'anillo-recarga-conjuros',
    name: 'Anillo Recargador de Conjuros (Spell-Refueling Ring)',
    desc: 'Anillo (requiere sintonización): Como acción, permite a quien lo porte recuperar una ranura de conjuro gastada de nivel 3 o inferior (1 vez al día, recarga al amanecer).',
    badge: 'Nv 6 • Recupera Ranura Nv 1-3',
    minLevel: 6,
    itemType: 'Anillo',
  },
  {
    id: 'armadura-resistente',
    name: 'Armadura Resistente (Resistant Armor)',
    desc: 'Traje de armadura (requiere sintonización): Otorga resistencia a un tipo de daño elemental elegido al infundirla: ácido, frío, fuego, fuerza, relámpago, necrótico, veneno, psíquico, radiante o trueno.',
    badge: 'Nv 6 • Resistencia Elemental',
    minLevel: 6,
    itemType: 'Traje de armadura',
  },

  // --- RÉPLICAS OFICIALES DE OBJETOS MÁGICOS (NIVEL 6+) ---
  {
    id: 'replica-botas-elfo',
    name: 'Réplica: Botas de Elfo (Boots of Elvenkind)',
    desc: 'Par de botas: Tus pasos no emiten sonido. Ventaja en pruebas de Destreza (Sigilo) para moverte en silencio.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Par de botas',
  },
  {
    id: 'replica-capa-elfo',
    name: 'Réplica: Capa de Elfo (Cloak of Elvenkind)',
    desc: 'Capa: Camuflaje óptico. Ventaja en Sigilo para esconderte y desventaja en Percepción ajena para verte.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Capa de tela',
  },
  {
    id: 'replica-ojos-aguila',
    name: 'Réplica: Ojos de Águila (Eyes of the Eagle)',
    desc: 'Lentes: Ventaja en Sabiduría (Percepción) visual y visión nítida a grandes distancias.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Lentes o anteojos',
  },
  {
    id: 'replica-guantes-ladron',
    name: 'Réplica: Guantes del Ladrón (Gloves of Thievery)',
    desc: 'Guantes: +5 a Destreza (Juego de Manos) y pruebas para forzar cerraduras con herramientas de ladrón.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Par de guantes',
  },
  {
    id: 'replica-broche-escudo',
    name: 'Réplica: Broche Protector (Brooch of Shielding)',
    desc: 'Broche: Resistencia al daño de fuerza e inmunidad total al conjuro Proyectil Mágico.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Broche o fíbula',
  },
  {
    id: 'replica-sombrero-disfraz',
    name: 'Réplica: Sombrero de Disfraz (Hat of Disguise)',
    desc: 'Sombrero: Permite lanzar el conjuro Disfrazarse a voluntad sin gastar ranuras.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Sombrero',
  },
  {
    id: 'replica-flauta-monstruos',
    name: 'Réplica: Flauta de los Monstruos (Pipes of Haunting)',
    desc: 'Flauta: 3 cargas. Tocarla asusta a criaturas a 30 pies si fallan salvación Sabiduría CD 15 durante 1 min.',
    badge: 'Nv 6 • Réplica Poco Común',
    minLevel: 6,
    itemType: 'Flauta',
  },

  // --- INFUSIONES ARCANAS DE EXPERTO (NIVEL 10+) ---
  {
    id: 'casco-conciencia',
    name: 'Casco de Conciencia (Helm of Awareness)',
    desc: 'Casco (requiere sintonización): Otorga ventaja en todas las tiradas de iniciativa e inmunidad a ser sorprendido mientras permanezcas consciente.',
    badge: 'Nv 10 • Ventaja Iniciativa',
    minLevel: 10,
    itemType: 'Casco',
  },

  // --- RÉPLICAS OFICIALES DE OBJETOS MÁGICOS (NIVEL 10+) ---
  {
    id: 'replica-botas-aladas',
    name: 'Réplica: Botas Aladas (Winged Boots)',
    desc: 'Par de botas (requiere sintonización): Otorga velocidad de vuelo igual a tu velocidad hasta 4 horas al día.',
    badge: 'Nv 10 • Réplica Poco Común',
    minLevel: 10,
    itemType: 'Par de botas',
  },
  {
    id: 'replica-capa-proteccion',
    name: 'Réplica: Capa de Protección (Cloak of Protection)',
    desc: 'Capa (requiere sintonización): Otorga +1 a la Clase de Armadura y +1 a todas las tiradas de salvación.',
    badge: 'Nv 10 • Réplica Poco Común',
    minLevel: 10,
    itemType: 'Capa',
  },
  {
    id: 'replica-guantes-ogro',
    name: 'Réplica: Guantes de Fuerza de Ogro (Gauntlets of Ogre Power)',
    desc: 'Guanteletes (requiere sintonización): Fijan tu Fuerza en 19 mientras los lleves puestos.',
    badge: 'Nv 10 • Réplica Poco Común (FUE 19)',
    minLevel: 10,
    itemType: 'Par de guanteletes',
  },
  {
    id: 'replica-tiara-intelecto',
    name: 'Réplica: Tiara de Intelecto (Headband of Intellect)',
    desc: 'Diadema (requiere sintonización): Fija tu Inteligencia en 19 mientras la lleves puesta.',
    badge: 'Nv 10 • Réplica Poco Común (INT 19)',
    minLevel: 10,
    itemType: 'Diadema o tiara',
  },
  {
    id: 'replica-anillo-escudo-mental',
    name: 'Réplica: Anillo de Escudo Mental (Ring of Mind Shielding)',
    desc: 'Anillo (requiere sintonización): Inmune a telepatía, lectura mental y detección de mentiras.',
    badge: 'Nv 10 • Réplica Poco Común',
    minLevel: 10,
    itemType: 'Anillo',
  },
  {
    id: 'replica-botas-zancadas',
    name: 'Réplica: Botas de Zancadas y Brincos (Boots of Striding and Springing)',
    desc: 'Botas (requiere sintonización): Velocidad mínima de 30 pies y triplica tu distancia de salto.',
    badge: 'Nv 10 • Réplica Poco Común',
    minLevel: 10,
    itemType: 'Par de botas',
  },
  {
    id: 'replica-zapatillas-trepar',
    name: 'Réplica: Zapatillas de Trepar Araña (Slippers of Spider Climbing)',
    desc: 'Zapatillas (requiere sintonización): Caminas por paredes y techos sin manos a velocidad normal.',
    badge: 'Nv 10 • Réplica Poco Común',
    minLevel: 10,
    itemType: 'Par de zapatillas',
  },
  {
    id: 'replica-medallon-pensamientos',
    name: 'Réplica: Medallón de Pensamientos (Medallion of Thoughts)',
    desc: 'Medallón (requiere sintonización): 3 cargas. Permite lanzar Detectar Pensamientos (CD 13).',
    badge: 'Nv 10 • Réplica Poco Común',
    minLevel: 10,
    itemType: 'Medallón',
  },

  // --- RÉPLICAS OFICIALES DE OBJETOS MÁGICOS (NIVEL 14+) ---
  {
    id: 'replica-amuleto-salud',
    name: 'Réplica: Amuleto de Salud (Amulet of Health)',
    desc: 'Amuleto (requiere sintonización): Fija tu Constitución en 19 mientras lo lleves puesto.',
    badge: 'Nv 14 • Réplica Rara (CON 19)',
    minLevel: 14,
    itemType: 'Amuleto',
  },
  {
    id: 'replica-cinturon-gigante',
    name: 'Réplica: Cinturón de Fuerza de Gigante de las Colinas (Belt of Hill Giant Strength)',
    desc: 'Cinturón (requiere sintonización): Fija tu Fuerza en 21 (+5 mod) mientras lo lleves puesto.',
    badge: 'Nv 14 • Réplica Rara (FUE 21)',
    minLevel: 14,
    itemType: 'Cinturón de cuero',
  },
  {
    id: 'replica-botas-velocidad',
    name: 'Réplica: Botas de Velocidad (Boots of Speed)',
    desc: 'Botas (requiere sintonización): Acción adicional: duplica tu velocidad y desventaja a ataques de oportunidad contra ti durante 10 min.',
    badge: 'Nv 14 • Réplica Rara (Doble Velocidad)',
    minLevel: 14,
    itemType: 'Par de botas',
  },
  {
    id: 'replica-capa-murcielago',
    name: 'Réplica: Capa del Murciélago (Cloak of the Bat)',
    desc: 'Capa (requiere sintonización): Ventaja en Sigilo, vuelo 40 pies en penumbra o polimorfia en murciélago.',
    badge: 'Nv 14 • Réplica Rara (Vuelo & Sigilo)',
    minLevel: 14,
    itemType: 'Capa de cuero',
  },
  {
    id: 'replica-gema-vision',
    name: 'Réplica: Gema de Visión (Gem of Seeing)',
    desc: 'Gema (requiere sintonización): 3 cargas. Concede Visión Verdadera 120 pies durante 10 minutos.',
    badge: 'Nv 14 • Réplica Rara (Visión Verdadera)',
    minLevel: 14,
    itemType: 'Gema tallada',
  },
  {
    id: 'replica-anillo-proteccion',
    name: 'Réplica: Anillo de Protección (Ring of Protection)',
    desc: 'Anillo (requiere sintonización): Otorga +1 a la Clase de Armadura y +1 a todas tus tiradas de salvación.',
    badge: 'Nv 14 • Réplica Rara (+1 CA & Salvaciones)',
    minLevel: 14,
    itemType: 'Anillo',
  },
  {
    id: 'replica-anillo-accion-libre',
    name: 'Réplica: Anillo de Acción Libre (Ring of Free Action)',
    desc: 'Anillo (requiere sintonización): Ignoras terreno difícil y eres inmune a ser Paralizado o retenido.',
    badge: 'Nv 14 • Réplica Rara (Acción Libre)',
    minLevel: 14,
    itemType: 'Anillo',
  },
  {
    id: 'replica-brazales-arqueria',
    name: 'Réplica: Brazales de Arquería (Bracers of Archery)',
    desc: 'Brazales (requiere sintonización): Competencia con arcos cortos y largos, y +2 al daño de ataques a distancia con ellos.',
    badge: 'Nv 14 • Réplica Poco Común (+2 Daño Arcos)',
    minLevel: 14,
    itemType: 'Par de brazales',
  },
];

// --------------------------------------------------------------------------
// 12.5.1 HERRAMIENTAS DE ARTESANO DE ARTÍFICE (NIVEL 1)
// --------------------------------------------------------------------------
export const ARTIFICER_ARTISAN_TOOLS: DecisionOption[] = [
  { id: 'smith-tools', name: 'Herramientas de Herrero', desc: 'Permite forjar y modificar armas de metal, armaduras pesadas y escudos.', badge: 'Metalurgia' },
  { id: 'alchemist-supplies', name: 'Suministros de Alquimista', desc: 'Permite elaborar pociones, elixires, ácidos, solventes y reactivos arcanos.', badge: 'Alquimia' },
  { id: 'tinker-tools', name: 'Herramientas de Manitas', desc: 'Permite reparar mecanismos arcanos, autómatas, relojes y dispositivos pequeños.', badge: 'Mecanismos' },
  { id: 'woodcarver-tools', name: 'Herramientas de Tallador de Madera', desc: 'Permite esculpir arcos, flechas, varitas, cetros y bastones arcanos.', badge: 'Tallado' },
  { id: 'jeweler-tools', name: 'Herramientas de Joyero', desc: 'Permite engarzar gemas mágicas, tallar anillos y canalizadores arcanos.', badge: 'Orfebrería' },
  { id: 'leatherworker-tools', name: 'Herramientas de Curtidor', desc: 'Permite confeccionar armaduras de cuero, vainas y correajes reforzados.', badge: 'Cuero' },
  { id: 'carpenter-tools', name: 'Herramientas de Carpintero', desc: 'Permite construir estructuras de madera, carretas, balistas y fortificaciones.', badge: 'Madera' },
  { id: 'glassblower-tools', name: 'Herramientas de Soplador de Vidrio', desc: 'Permite moldear viales alquímicos, lentes arcanas, frascos y espejos.', badge: 'Vidrio' },
  { id: 'mason-tools', name: 'Herramientas de Albañil', desc: 'Permite esculpir piedra, detectar debilidades en murallas y abrir pasadizos.', badge: 'Piedra' },
  { id: 'potter-tools', name: 'Herramientas de Alfarero', desc: 'Permite moldear recipientes cerámicos estancos, jarras herméticas y crisoles.', badge: 'Cerámica' },
  { id: 'weaver-tools', name: 'Herramientas de Tejedor', desc: 'Permite confeccionar túnicas arcanas, capas protectoras y vestimentas mágicas.', badge: 'Textil' },
  { id: 'calligrapher-supplies', name: 'Suministros de Calígrafo', desc: 'Permite transcribir pergaminos de conjuro, runas arcanas y glifos.', badge: 'Escritura' },
  { id: 'cartographer-tools', name: 'Herramientas de Cartógrafo', desc: 'Permite trazar mapas topográficos exactos y registrar rutas subterráneas.', badge: 'Cartografía' },
  { id: 'brewer-supplies', name: 'Suministros de Cervecero', desc: 'Permite fermentar brebajes reconstituyentes, tónicos y estimulantes herbales.', badge: 'Destilación' },
  { id: 'cook-utensils', name: 'Utensilios de Cocinero', desc: 'Permite cocinar raciones nutritivas que mejoran los puntos de golpe en descansos.', badge: 'Cocina' },
  { id: 'cobbler-tools', name: 'Herramientas de Zapatero', desc: 'Permite reforzar el calzado del grupo para evitar agotamiento en marchas forzadas.', badge: 'Calzado' },
];

// --------------------------------------------------------------------------
// 12.5.2 MODELOS DE ARMADURA DE ARMERO (NIVEL 3)
// --------------------------------------------------------------------------
export const ARMORER_MODEL_OPTIONS: DecisionOption[] = [
  {
    id: 'modelo-guardian',
    name: 'Modelo Guardián (Guardian Model)',
    desc: 'Optimizado para primera línea y protección. Guanteletes Atronadores (Thunder Gauntlets): arma simple cuerpo a cuerpo (1d8 de daño trueno usando mod Int); al golpear a un enemigo, este tiene desventaja en tiradas de ataque contra cualquiera que no seas tú hasta tu próximo turno. Campo Defensivo (Defensive Field): como acción adicional obtienes PG temporales iguales a tu nivel de artífice (usos = bonificador de competencia por descanso largo).',
    badge: '1d8 Trueno • Desventaja a Enemigos • PG Temporales',
  },
  {
    id: 'modelo-infiltrador',
    name: 'Modelo Infiltrador (Infiltrator Model)',
    desc: 'Optimizado para sigilo y combate táctico a distancia. Lanza-Relámpagos (Lightning Launcher): arma simple a distancia (alcance 90/300 pies) que inflige 1d6 de daño de relámpago con mod Int; una vez en cada uno de tus turnos, al golpear con ella puedes añadir 1d6 de daño relámpago extra. Pasos Potenciados (Powered Steps): +5 pies a tu velocidad de movimiento caminando. Campo Amortiguador (Dampening Field): ventaja en pruebas de Destreza (Sigilo).',
    badge: '90/300 pies • 1d6+1d6 Relámpago • +5 pies • Ventaja Sigilo',
  },
];

// --------------------------------------------------------------------------
// 12.5.3 CAÑÓN SOBRENATURAL DE ARTILLERO (NIVEL 3)
// --------------------------------------------------------------------------
export const ARTILLERIST_CANNON_OPTIONS: DecisionOption[] = [
  {
    id: 'canon-balista',
    name: 'Balista de Fuerza (Force Ballista)',
    desc: 'Como acción adicional realizas un ataque de conjuro a distancia contra un objetivo a 120 pies o menos: inflige 2d8 de daño de fuerza (3d8 a Nv 9) y empuja al objetivo 5 pies lejos del cañón. Puede ser Diminuto (en tu mano) o Pequeño (con patas mecánicas y 15 pies de movimiento).',
    badge: '120 pies • 2d8/3d8 Daño Fuerza • Empuje 5 pies',
  },
  {
    id: 'canon-lanzallamas',
    name: 'Lanzallamas (Flamethrower)',
    desc: 'Como acción adicional emite una llamarada en cono de 15 pies: cada criatura en el área debe superar una salvación de Destreza contra tu CD de conjuros o sufrir 2d8 de daño de fuego (3d8 a Nv 9; mitad si supera). Prende fuego a objetos inflamables no portados.',
    badge: 'Cono 15 pies • 2d8/3d8 Fuego • Salva Destreza',
  },
  {
    id: 'canon-protector',
    name: 'Protector (Protector Field)',
    desc: 'Como acción adicional emite una onda protectora que concede a ti y a cada aliado a 10 pies o menos del cañón una cantidad de puntos de golpe temporales igual a 1d8 + tu modificador de Inteligencia cada turno.',
    badge: 'Radio 10 pies • 1d8 + Int PG Temporales por turno',
  },
];

// --------------------------------------------------------------------------
// 12.5.4 DEFENSOR DE ACERO DE HERRERO DE BATALLA (NIVEL 3)
// --------------------------------------------------------------------------
export const BATTLE_SMITH_COMPANION_OPTIONS: DecisionOption[] = [
  {
    id: 'defensor-cuadrupedo',
    name: 'Defensor de Acero Cuadrúpedo (Canino / Felino Mecánico)',
    desc: 'Leal constructo mecánico de 4 patas. CA 15 (17 a Nv 15), PG = 2 + Int mod + (5 × nivel de artífice), dados de golpe d8 iguales a tu nivel. Acciones con tu acción adicional: Golpe Contundente (1d8 + PB daño de fuerza), Reparar (restaura 2d8 + PB PG, 3/descanso largo). Reacción: Desviar Ataque (desventaja al atacante contra aliados adyacentes; inflige 1d4 + Int daño fuerza a Nv 15). Listo para la Batalla: atacas con armas mágicas usando Inteligencia para ataque y daño.',
    badge: 'Constructo Cuadrúpedo • CA 15/17 • PG Escalables • Desvío',
  },
  {
    id: 'defensor-bipedo',
    name: 'Defensor de Acero Bípedo (Soldado Mecánico / Autómata)',
    desc: 'Leal constructo humanoide de 2 piernas con chasis reforzado. CA 15 (17 a Nv 15), PG = 2 + Int mod + (5 × nivel de artífice), dados de golpe d8 iguales a tu nivel. Acciones con tu acción adicional: Golpe Contundente (1d8 + PB daño de fuerza), Reparar (restaura 2d8 + PB PG, 3/descanso largo). Reacción: Desviar Ataque. Listo para la Batalla: atacas con armas mágicas usando Inteligencia para ataque y daño.',
    badge: 'Constructo Bípedo • CA 15/17 • PG Escalables • Desvío',
  },
];

// --------------------------------------------------------------------------
// 12.5.5 FÓRMULAS DE ELIXIR EXPERIMENTAL DE ALQUIMISTA (NIVEL 3)
// --------------------------------------------------------------------------
export const ALCHEMIST_ELIXIR_FORMULAS: DecisionOption[] = [
  { id: 'elixir-curacion', name: '1. Curación (Healing)', desc: 'La criatura que lo bebe recupera una cantidad de puntos de golpe igual a 2d4 + tu modificador de Inteligencia.', badge: 'Recupera 2d4 + Int PG' },
  { id: 'elixir-velocidad', name: '2. Velocidad (Swiftness)', desc: 'La criatura que lo bebe obtiene un bonificador de +10 pies a su velocidad de movimiento caminando durante 1 hora.', badge: '+10 pies Velocidad (1 hora)' },
  { id: 'elixir-resiliencia', name: '3. Resiliencia (Resilience)', desc: 'La criatura que lo bebe obtiene un bonificador de +1 a su Clase de Armadura durante 10 minutos.', badge: '+1 CA (10 minutos)' },
  { id: 'elixir-valentia', name: '4. Valentía (Boldness)', desc: 'La criatura que lo bebe gana 10 puntos de golpe temporales. A nivel 9 se suman 2d6 + Int adicionales.', badge: '10 PG Temporales' },
  { id: 'elixir-vuelo', name: '5. Vuelo (Flight)', desc: 'La criatura que lo bebe obtiene una velocidad de vuelo de 10 pies durante 10 minutos.', badge: 'Vuelo 10 pies (10 minutos)' },
  { id: 'elixir-transformacion', name: '6. Transformación (Transformation)', desc: 'La criatura que lo bebe queda bajo los efectos del conjuro Alterar el Propio Ser (adaptación acuática, apariencia o armas naturales) durante 10 minutos.', badge: 'Alterar Propio Ser (10 min)' },
];

// --------------------------------------------------------------------------
// 12.5.6 CONJUROS DE ESPECIALISTA DE ARTÍFICE (TASHA / EBERRON 1:1)
// --------------------------------------------------------------------------
export const ARTIFICER_SPECIALIST_SPELLS: Record<string, { level: number; spells: string[] }[]> = {
  alquimista: [
    { level: 3, spells: ['Palabra de curación', 'Rayo de enfermedad'] },
    { level: 5, spells: ['Flecha ácida de Melf', 'Esfera flamígera'] },
    { level: 9, spells: ['Forma gaseosa', 'Palabra de curación en masa'] },
    { level: 13, spells: ['Marchitar', 'Ojo arcano'] },
    { level: 17, spells: ['Nube aniquiladora', 'Revivir a los muertos'] },
  ],
  armero: [
    { level: 3, spells: ['Proyectil mágico', 'Onda atronadora'] },
    { level: 5, spells: ['Imagen múltiple', 'Hacer añicos'] },
    { level: 9, spells: ['Patrón hipnótico', 'Relámpago'] },
    { level: 13, spells: ['Escudo de fuego', 'Invisibilidad mayor'] },
    { level: 17, spells: ['Atravesar paredes', 'Muro de fuerza'] },
  ],
  artillero: [
    { level: 3, spells: ['Escudo', 'Onda atronadora'] },
    { level: 5, spells: ['Rayo abrasador', 'Hacer añicos'] },
    { level: 9, spells: ['Bola de fuego', 'Muro de viento'] },
    { level: 13, spells: ['Tormenta de hielo', 'Muro de fuego'] },
    { level: 17, spells: ['Cono de frío', 'Muro de fuerza'] },
  ],
  'herrero-batalla': [
    { level: 3, spells: ['Heroísmo', 'Escudo'] },
    { level: 5, spells: ['Castigo marcado', 'Vínculo de protección'] },
    { level: 9, spells: ['Aura de vitalidad', 'Conjurar descarga'] },
    { level: 13, spells: ['Aura de pureza', 'Castigo fulgurante'] },
    { level: 17, spells: ['Castigo desterrador', 'Curar heridas en masa'] },
  ],
};

export function getArtificerSpecialistSpells(subclassIdOrName: string | undefined, level: number): string[] {
  if (!subclassIdOrName) return [];
  const norm = subclassIdOrName.toLowerCase();
  let key = '';
  if (norm.includes('alquimista') || norm.includes('alchemist')) key = 'alquimista';
  else if (norm.includes('armero') || norm.includes('armorer')) key = 'armero';
  else if (norm.includes('artillero') || norm.includes('artillerist')) key = 'artillero';
  else if (norm.includes('herrero') || norm.includes('battle smith') || norm.includes('battlesmith')) key = 'herrero-batalla';

  if (!key || !ARTIFICER_SPECIALIST_SPELLS[key]) return [];
  const entries = ARTIFICER_SPECIALIST_SPELLS[key];
  const spells: string[] = [];
  entries.forEach((tier) => {
    if (tier.level <= level) {
      spells.push(...tier.spells);
    }
  });
  return spells;
}

// --------------------------------------------------------------------------
// 12.6. PACT OF THE CHAIN FAMILIARS (FAMILIARES ESPECIALES DE BRUJO)
// --------------------------------------------------------------------------
export const PACT_CHAIN_FAMILIARS: DecisionOption[] = [
  {
    id: 'familiar-diablillo',
    name: 'Diablillo (Imp)',
    desc: 'Fiend (Diablo Menor), CA 13, PG 10, Vuelo 40 pies. Forma cambiante (rata, cuervo, araña). Invisibilidad mágica a voluntad. Aguijón venenoso (1d4+3 perforante + 3d6 veneno si falla salvación de Constitución). Resistencia mágica a conjuros. Visión en la oscuridad diabólica (120 pies, penetra oscuridad mágica).',
    badge: 'Invisibilidad & Veneno 3d6',
  },
  {
    id: 'familiar-quasit',
    name: 'Quasit',
    desc: 'Fiend (Demonio del Caos), CA 13, PG 7, Velocidad 40 pies. Forma cambiante (murciélago, ciempiés, sapo). Garra venenosa (1d4+3 cortante + envenenado por 1 minuto si falla salvación de Constitución CD 10). Miedo (1 vez al día asusta a criatura a 20 pies). Invisibilidad a voluntad y Resistencia mágica.',
    badge: 'Miedo & Envenenamiento',
  },
  {
    id: 'familiar-pseudodragon',
    name: 'Pseudodragón (Pseudodragon)',
    desc: 'Dragón Diminuto, CA 13, PG 7, Vuelo 60 pies. Sentidos agudos (ventaja en Percepción), Percepción ciega 10 pies. Aguijón somnífero (1d4+2 perforante + veneno que duerme a la víctima). Telepatía de 100 pies y Resistencia mágica compartida.',
    badge: 'Aguijón Somnífero & Telepatía',
  },
  {
    id: 'familiar-duendecillo',
    name: 'Duendecillo (Sprite)',
    desc: 'Fey Diminuto, CA 15, PG 2, Vuelo 40 pies. Sentido del corazón (conoce el alineamiento y estado emocional de criaturas al tocarlas). Flechas del sueño a distancia. Invisibilidad a voluntad.',
    badge: 'Sentido del Corazón & Vuelo CA 15',
  },
];

// --------------------------------------------------------------------------
// 12.7. IDIOMAS OFICIALES DE D&D 5E EN ESPAÑOL
// --------------------------------------------------------------------------
export const ALL_5E_LANGUAGES_OPTIONS: DecisionOption[] = [
  { id: 'comun', name: 'Común (Common)', desc: 'El idioma universal hablado por casi todas las civilizaciones humanoides.' },
  { id: 'elfico', name: 'Élfico (Elvish)', desc: 'Lengua fluida y melodiosa con intrincadas inflexiones poéticas.' },
  { id: 'enano', name: 'Enano (Dwarvish)', desc: 'Idioma gutural y resonante tallado en runas angulares.' },
  { id: 'gigante', name: 'Gigante (Giant)', desc: 'Dialecto ancestral derivado del enano, hablado por gigantes y ogros.' },
  { id: 'gnomo', name: 'Gnomo (Gnomish)', desc: 'Lenguaje técnico, curioso y vivaz con amplio vocabulario académico.' },
  { id: 'trasgo', name: 'Trasgo (Goblin)', desc: 'Habla áspera y rápida compartida por goblins, hobgoblins y osgos.' },
  { id: 'mediano', name: 'Mediano (Halfling)', desc: 'Lengua cálida y hospitalaria, rara vez escrita en libros formales.' },
  { id: 'orco', name: 'Orco (Orc)', desc: 'Lenguaje contundente y marcial de fonética dura.' },
  { id: 'abisal', name: 'Abisal (Abyssal)', desc: 'La lengua caótica y resonante de los demonios del Abismo.' },
  { id: 'celestial', name: 'Celestial', desc: 'Idioma sacro y majestuoso de los ángeles y planos superiores.' },
  { id: 'draconico', name: 'Dracónico (Draconic)', desc: 'Uno de los idiomas más antiguos del multiverso, hablado por dragones y hechiceros.' },
  { id: 'habla-profunda', name: 'Habla Profunda (Deep Speech)', desc: 'Lengua alienígena y perturbadora de los azotamentes y el Reino Lejano.' },
  { id: 'infernal', name: 'Infernal', desc: 'La lengua legal y calculadora de los diablos de los Nueve Infiernos.' },
  { id: 'primordial', name: 'Primordial', desc: 'El idioma de los elementales: incluye dialectos Áurico, Acuano, Ígneo y Terrano.' },
  { id: 'silvano', name: 'Silvano (Sylvan)', desc: 'La lengua mística y caprichosa de las hadas y seres del Feywild.' },
  { id: 'infracomun', name: 'Infracomún (Undercommon)', desc: 'El idioma de intercambio del Inframundo (Underdark).' },
];

// --------------------------------------------------------------------------
// 12.8. HELPERS: CONJUROS Y TRUCOS PARA DECISIONES ESPECIALES
// --------------------------------------------------------------------------
export function getMulticlassCantripOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level === 0)
    .map((s) => ({
      id: `cantrip-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime}. ${s.description}`,
      badge: `Truco • ${s.school}`,
    }));
}

export function getDruidCantripOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level === 0 && (s.classes || []).some((c) => c.toLowerCase().includes('druid') || c.toLowerCase().includes('druida')))
    .map((s) => ({
      id: `druid-cantrip-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime}. ${s.description}`,
      badge: `Truco de Druida`,
    }));
}

export function getWizardCantripOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level === 0 && (s.classes || []).some((c) => c.toLowerCase().includes('wizard') || c.toLowerCase().includes('mago')))
    .map((s) => ({
      id: `wizard-cantrip-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime}. ${s.description}`,
      badge: `Truco de Mago`,
    }));
}

export function getNecromancyCantripOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level === 0 && (s.school.toLowerCase().includes('nigro') || s.school.toLowerCase().includes('necro')))
    .map((s) => ({
      id: `necro-cantrip-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[Truco • ${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime}. ${s.description}`,
      badge: 'Truco de Nigromancia',
    }));
}

export function getWizardHighLevelSpellOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level >= 6 && s.level <= 9 && (s.classes || []).some((c) => c.toLowerCase().includes('wizard') || c.toLowerCase().includes('mago')))
    .map((s) => ({
      id: `arcana-mastery-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[Nivel ${s.level} • ${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime}. ${s.description}`,
      badge: `Nv ${s.level} Mago`,
    }));
}

export const BLADESINGING_WEAPONS_OPTIONS: DecisionOption[] = [
  { id: 'rapier', name: 'Estoque / Espada Ropera (Rapier)', desc: '1d8 perforante, sutil (Finesse). Ideal para daño ágil con Destreza.', badge: '1d8 Sutil' },
  { id: 'scimitar', name: 'Cimitarra (Scimitar)', desc: '1d6 cortante, sutil, ligera. Permite combate con dos armas.', badge: '1d6 Sutil/Ligera' },
  { id: 'shortsword', name: 'Espada Corta (Shortsword)', desc: '1d6 perforante, sutil, ligera. Versátil y clásica.', badge: '1d6 Sutil/Ligera' },
  { id: 'longsword', name: 'Espada Larga (Longsword)', desc: '1d8 cortante (1d10 versátil). Estilo clásico de espadachín élfico a una mano.', badge: '1d8 Versátil' },
  { id: 'whip', name: 'Látigo (Whip)', desc: '1d4 cortante, sutil, alcance 10 pies. Permite atacar fuera del alcance cuerpo a cuerpo del rival.', badge: '1d4 Alcance 10 pies' },
  { id: 'dagger', name: 'Daga (Dagger)', desc: '1d4 perforante, sutil, ligera, arrojadiza (20/60 pies).', badge: '1d4 Arrojadiza' },
];

export function getWizardMasterySpellOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => (s.level === 1 || s.level === 2) && (s.classes || []).some((c) => c.toLowerCase().includes('wizard') || c.toLowerCase().includes('mago')))
    .map((s) => ({
      id: `mastery-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[Nivel ${s.level} • ${s.school}] Alcance: ${s.range} • ${s.description}`,
      badge: `Nv ${s.level} Mago (A voluntad)`,
    }));
}

export function getWizardSignatureSpellOptions(): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level === 3 && (s.classes || []).some((c) => c.toLowerCase().includes('wizard') || c.toLowerCase().includes('mago')))
    .map((s) => ({
      id: `signature-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[Nivel ${s.level} • ${s.school}] Alcance: ${s.range} • ${s.description}`,
      badge: `Nv 3 Mago (1/descanso gratis)`,
    }));
}

export function getMagicalSecretsSpellOptions(maxLevel: number): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level > 0 && s.level <= maxLevel)
    .map((s) => ({
      id: `secret-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[Nivel ${s.level} • ${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime} • ${(s.classes || []).join(', ')}. ${s.description}`,
      badge: `Nv ${s.level} • ${s.school}`,
    }));
}

// --------------------------------------------------------------------------
// 12.9. BARD SPECIALIZED DECISION OPTIONS (ESPADA & SABER & ESPÍRITUS)
// --------------------------------------------------------------------------
export const BARD_SWORDS_FIGHTING_STYLES: DecisionOption[] = [
  {
    id: 'estilo-duelo',
    name: 'Duelo (Dueling)',
    desc: 'Cuando empuñas un arma cuerpo a cuerpo en una mano y ninguna otra arma, ganas un bonificador de +2 a las tiradas de daño con esa arma.',
    badge: '+2 Daño con Arma de 1 Mano',
  },
  {
    id: 'estilo-dos-armas',
    name: 'Combate con Dos Armas (Two-Weapon Fighting)',
    desc: 'Cuando luchas con dos armas, puedes sumar tu modificador de característica al daño del segundo ataque realizado con tu acción adicional.',
    badge: 'Suma Modificador a Mano Torpe',
  },
];

export const ALL_5E_SKILLS_OPTIONS: DecisionOption[] = [
  { id: 'acrobacias', name: 'Acrobacias (Acrobatics)', desc: 'Mantener el equilibrio en superficies estrechas o resbaladizas y realizar maniobras gimnásticas.' },
  { id: 'arcanos', name: 'Arcanos (Arcana)', desc: 'Conocimiento sobre magia, conjuros, objetos mágicos, planos de existencia y tradiciones arcanas.' },
  { id: 'atletismo', name: 'Atletismo (Athletics)', desc: 'Escalar, saltar, nadar y realizar pruebas de fuerza física sostenida o agarres.' },
  { id: 'engano', name: 'Engaño (Deception)', desc: 'Ocultar la verdad mediante mentiras convincentes, disfraces, medias verdades o intenciones veladas.' },
  { id: 'historia', name: 'Historia (History)', desc: 'Recordar hechos históricos, reinos legendarios, dinastías, guerras antiguas y civilizaciones caídas.' },
  { id: 'interpretacion', name: 'Interpretación (Performance)', desc: 'Cautivar a un público mediante la música, el canto, la poesía, la danza o la oratoria teatral.' },
  { id: 'intimidacion', name: 'Intimidación (Intimidation)', desc: 'Influir en otros mediante amenazas veladas, hostilidad física o demostraciones de poderío.' },
  { id: 'investigacion', name: 'Investigación (Investigation)', desc: 'Deducir pistas, buscar mecanismos ocultos, resolver enigmas o inspeccionar documentos antiguos.' },
  { id: 'juego-de-manos', name: 'Juego de Manos (Sleight of Hand)', desc: 'Hurtar bolsillos, ocultar pequeños objetos en la manga o realizar trucos de prestidigitación.' },
  { id: 'medicina', name: 'Medicina (Medicine)', desc: 'Diagnosticar enfermedades, estabilizar a aliados moribundos o identificar causas de muerte.' },
  { id: 'naturaleza', name: 'Naturaleza (Nature)', desc: 'Conocimiento sobre flora, fauna, ciclos biológicos, terrenos naturales y clima.' },
  { id: 'percepcion', name: 'Percepción (Perception)', desc: 'Detectar ruidos sutiles, emboscadas ocultas, olores y peligros sensoriales en el entorno.' },
  { id: 'perspicacia', name: 'Perspicacia (Insight)', desc: 'Leer el lenguaje corporal ajeno, intuir verdaderas intenciones y detectar mentiras.' },
  { id: 'persuasion', name: 'Persuasión (Persuasion)', desc: 'Negociar con tacto, conseguir favores y apelar a la razón con simpatía y elocuencia.' },
  { id: 'religion', name: 'Religión (Religion)', desc: 'Conocimiento sobre dioses, cultos, símbolos sagrados, plegarias y jerarquías eclesiásticas.' },
  { id: 'sigilo', name: 'Sigilo (Stealth)', desc: 'Moverse sin hacer ruido y esconderse entre las sombras o coberturas sin ser detectado.' },
  { id: 'supervivencia', name: 'Supervivencia (Survival)', desc: 'Rastrear presas, hallar comida y agua en la espesura y predecir el clima silvestre.' },
  { id: 'trato-con-animales', name: 'Trato con Animales (Animal Handling)', desc: 'Calmar bestias salvajes, controlar monturas y percibir intenciones de animales.' },
];

export const ROGUE_EXPERTISE_OPTIONS: DecisionOption[] = [
  ...ALL_5E_SKILLS_OPTIONS,
  {
    id: 'herramientas-ladron',
    name: 'Herramientas de Ladrón (Thieves\' Tools)',
    desc: 'Desarmar trampas complejas y forzar cerraduras. Tu bonificador de competencia se duplica para cualquier prueba con estas herramientas.',
  },
];

export function getSpiritSessionSpellOptions(maxLevel: number): DecisionOption[] {
  return OFFICIAL_SPELLS_COMPENDIUM
    .filter((s) => s.level > 0 && s.level <= maxLevel && (s.school.toLowerCase().includes('adivin') || s.school.toLowerCase().includes('divinat') || s.school.toLowerCase().includes('nigro') || s.school.toLowerCase().includes('necro')))
    .map((s) => ({
      id: `spirit-${s.id || s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${s.name} (${s.nameEn || s.name})`,
      desc: `[Nivel ${s.level} • ${s.school}] Alcance: ${s.range} • Lanzamiento: ${s.castingTime}. ${s.description}`,
      badge: `Nv ${s.level} • ${s.school}`,
    }));
}

// --------------------------------------------------------------------------
// 13. INTERFACE & HELPER: GET CLASS DECISIONS FOR LEVEL
// --------------------------------------------------------------------------

export interface PendingClassDecision {
  id: string;
  title: string;
  description: string;
  countNeeded: number;
  options: DecisionOption[];
  canSwap?: boolean;
  swapLabel?: string;
  alreadyChosen?: string[];
}

export function getClassDecisionsForLevel(
  className: string,
  subclass: string | undefined,
  currentLevel: number,
  newLevel: number,
  existingDecisions: Record<string, any> = {}
): PendingClassDecision[] {
  const norm = (className || '').toLowerCase();
  const subNorm = (subclass || '').toLowerCase();
  const results: PendingClassDecision[] = [];

  // Recolectar todos los estilos de combate aprendidos previamente (regla oficial de multiclase de 5e)
  const allKnownFightingStyles = Array.from(
    new Set([
      ...((existingDecisions['fighterFightingStyle_1'] as string[]) || []),
      ...((existingDecisions['paladinFightingStyle_2'] as string[]) || []),
      ...((existingDecisions['rangerFightingStyle_2'] as string[]) || []),
      ...((existingDecisions['swordsFightingStyle'] as string[]) || []),
      ...((existingDecisions['championSecondFightingStyle'] as string[]) || []),
      ...(existingDecisions['fightingStyle']
        ? Array.isArray(existingDecisions['fightingStyle'])
          ? existingDecisions['fightingStyle']
          : [existingDecisions['fightingStyle']]
        : []),
    ])
  );

  // 1. Monje - Cuatro Elementos (nv 3, 6, 11, 17)
  const isFourElements = subNorm.includes('cuatro elementos') || subNorm.includes('cuatro-elementos') || subNorm.includes('four elements') || subNorm.includes('four-elements');
  if ((norm.includes('monje') || norm.includes('monk')) && isFourElements) {
    if (newLevel === 3 || newLevel === 6 || newLevel === 11 || newLevel === 17) {
      const allowed = ELEMENTAL_DISCIPLINES.filter((d) => d.minLevel <= newLevel);
      const chosen = (existingDecisions['elementalDisciplines'] as string[]) || [];
      results.push({
        id: 'elementalDisciplines',
        title: 'Disciplinas de los Cuatro Elementos (Monje)',
        description:
          newLevel === 3
            ? 'A nivel 3 aprendes "Sintonía Elemental" (automática) más 1 disciplina elemental adicional a tu elección.'
            : `A nivel ${newLevel} aprendes 1 nueva disciplina elemental permitida para tu nivel. Además, puedes intercambiar una que ya conozcas.`,
        countNeeded: 1,
        options: allowed,
        canSwap: newLevel > 3 && chosen.length > 0,
        swapLabel: 'Reemplazar 1 disciplina elemental conocida por otra',
        alreadyChosen: chosen,
      });
    }
  }

  // 2. Monje - Kensei (nv 3, 6, 11, 17)
  const isKensei = subNorm.includes('kensei');
  if ((norm.includes('monje') || norm.includes('monk')) && isKensei) {
    if (newLevel === 3 || newLevel === 6 || newLevel === 11 || newLevel === 17) {
      const chosen = (existingDecisions['kenseiWeapons'] as string[]) || [];
      results.push({
        id: 'kenseiWeapons',
        title: 'Armas de Kensei (Monje)',
        description:
          newLevel === 3
            ? 'Elige 2 armas (1 cuerpo a cuerpo y 1 a distancia) que se convertirán en tus armas de monje Kensei.'
            : `A nivel ${newLevel} dominas 1 nueva arma de Kensei adicional.`,
        countNeeded: newLevel === 3 ? 2 : 1,
        options: KENSEI_WEAPON_OPTIONS,
        alreadyChosen: chosen,
      });
    }
    if (newLevel === 3) {
      results.push({
        id: 'kenseiTool_3',
        title: 'Herramienta Artística de Kensei (Nivel 3)',
        description: 'Elige competencia con útiles de pintor o herramientas de caligrafía para cultivar tu mente y espíritu.',
        countNeeded: 1,
        options: KENSEI_TOOL_OPTIONS,
        alreadyChosen: (existingDecisions['kenseiTool_3'] as string[]) || [],
      });
    }
  }

  // 2.1 Monje - Senda del Dragón Ascendente (nv 3)
  const isAscendantDragon = subNorm.includes('dragon') || subNorm.includes('dragón') || subNorm.includes('ascendant');
  if ((norm.includes('monje') || norm.includes('monk')) && isAscendantDragon && newLevel === 3) {
    results.push({
      id: 'ascendantDragonLanguage_3',
      title: 'Discípulo Dracónico: Idioma Adicional (Nivel 3)',
      description: 'Aprendes a hablar, leer y escribir Dracónico (o cualquier otro idioma a tu elección si ya lo conoces).',
      countNeeded: 1,
      options: ASCENDANT_DRAGON_LANGUAGES,
      alreadyChosen: (existingDecisions['ascendantDragonLanguage_3'] as string[]) || [],
    });
  }

  // 3. Bárbaro - Senda Primitiva y Reglas Opcionales
  const isBarbarian = norm.includes('barbaro') || norm.includes('bárbaro') || norm.includes('barbarian');
  if (isBarbarian) {
    // 3.0 Regla Opcional Tasha: Conocimiento Primitivo (Nivel 3 y 10)
    if (newLevel === 3 || newLevel === 10) {
      const decisionKey = `primalKnowledge_${newLevel}`;
      const chosen = (existingDecisions[decisionKey] as string[]) || [];
      results.push({
        id: decisionKey,
        title: `Conocimiento Primitivo (Bárbaro Nivel ${newLevel})`,
        description: 'Regla Opcional de Tasha: Ganas competencia en una habilidad adicional de la lista de bárbaro a tu elección.',
        countNeeded: 1,
        options: BARBARIAN_PRIMAL_KNOWLEDGE_OPTIONS,
        alreadyChosen: chosen,
      });
    }

    // 3.1 Guerrero Totémico (Nivel 3, 6, 14)
    if (subNorm.includes('totem') || subNorm.includes('totémico') || subNorm.includes('totemico')) {
      if (newLevel === 3) {
        results.push({
          id: 'totemSpirit3',
          title: 'Espíritu Totémico (Guerrero Totémico Nivel 3)',
          description: 'Elige el espíritu animal guía para tu Furia: Oso, Águila, Lobo, Alce o Tigre.',
          countNeeded: 1,
          options: TOTEM_WARRIOR_LEVEL_3_SPIRITS,
          alreadyChosen: (existingDecisions['totemSpirit3'] as string[]) || [],
        });
      } else if (newLevel === 6) {
        results.push({
          id: 'totemAspect6',
          title: 'Aspecto de la Bestia (Guerrero Totémico Nivel 6)',
          description: 'Elige una bendición animal permanente otorgada por los espíritus de la naturaleza: Oso, Águila, Lobo, Alce o Tigre.',
          countNeeded: 1,
          options: TOTEM_WARRIOR_LEVEL_6_ASPECTS,
          alreadyChosen: (existingDecisions['totemAspect6'] as string[]) || [],
        });
      } else if (newLevel === 14) {
        results.push({
          id: 'totemAttunement14',
          title: 'Sintonía Totémica Suprema (Guerrero Totémico Nivel 14)',
          description: 'Alcanzas el poder marcial cumbre de tu guía totémico: Oso, Águila, Lobo, Alce o Tigre.',
          countNeeded: 1,
          options: TOTEM_WARRIOR_LEVEL_14_ATTUNEMENTS,
          alreadyChosen: (existingDecisions['totemAttunement14'] as string[]) || [],
        });
      }

      // Sub-elección de habilidades de tigre a Nivel 6 si se eligió aspecto-tigre-6
      const aspectVal = String(existingDecisions['totemAspect6'] || '').toLowerCase();
      if ((newLevel >= 6 || currentLevel >= 6) && (aspectVal.includes('tigre') || aspectVal.includes('tiger'))) {
        results.push({
          id: 'totemTigerSkills6',
          title: 'Habilidades del Aspecto del Tigre (Guerrero Totémico)',
          description: 'El aspecto del tigre te otorga competencia en 2 habilidades adicionales a tu elección entre Atletismo, Acrobacia, Sigilo o Supervivencia.',
          countNeeded: 2,
          options: TOTEM_TIGER_LEVEL_6_SKILLS,
          alreadyChosen: (existingDecisions['totemTigerSkills6'] as string[]) || [],
        });
      }
    }

    // 3.2 Fanático / Zealot (Nivel 3)
    if (subNorm.includes('fanatico') || subNorm.includes('fanático') || subNorm.includes('zealot')) {
      if (newLevel === 3) {
        results.push({
          id: 'zealotDivineFury',
          title: 'Furia Divina (Fanático Nivel 3)',
          description: 'Elige la energía celestial que imbuye tus golpes en furia: Daño Radiante o Daño Necrótico (1d6 + mitad nivel bárbaro en tu primer impacto cada turno).',
          countNeeded: 1,
          options: ZEALOT_DIVINE_FURY_OPTIONS,
          alreadyChosen: (existingDecisions['zealotDivineFury'] as string[]) || [],
        });
      }
    }

    // 3.3 Camino de la Bestia / Beast (Nivel 3 y 6)
    if (subNorm.includes('bestia') || subNorm.includes('beast')) {
      if (newLevel === 3) {
        results.push({
          id: 'beastNaturalWeapons',
          title: 'Forma de la Bestia - Arma Natural Predilecta (Nivel 3)',
          description: 'Elige tu manifestación preferida de arma natural (puedes manifestar otra al entrar en furia): Mordisco (curación), Garras (+1 ataque extra) o Cola (alcance 10 pies y +1d8 CA reactiva).',
          countNeeded: 1,
          options: BEAST_NATURAL_WEAPON_OPTIONS,
          alreadyChosen: (existingDecisions['beastNaturalWeapons'] as string[]) || [],
        });
      } else if (newLevel === 6) {
        results.push({
          id: 'beastSoulAdaptation',
          title: 'Alma Bestial - Adaptación Física (Nivel 6)',
          description: 'Tus armas naturales cuentan como mágicas. Además, elige tu adaptación corporal tras descansos: Nado con respiración acuática, Escalada con marcha por techos, o Salto con bonificador de Atletismo.',
          countNeeded: 1,
          options: BEAST_SOUL_ADAPTATION_OPTIONS,
          alreadyChosen: (existingDecisions['beastSoulAdaptation'] as string[]) || [],
        });
      }
    }

    // 3.4 Heraldo de la Tormenta / Storm Herald (Nivel 3)
    if (subNorm.includes('heraldo') || subNorm.includes('storm herald') || subNorm.includes('tormenta')) {
      if (newLevel === 3) {
        results.push({
          id: 'stormHeraldEnvironment',
          title: 'Entorno del Aura de Tormenta (Heraldo Nivel 3)',
          description: 'Elige el bioma primordial de tu aura: Desierto (daño de fuego en área), Mar (relámpagos dirigidos a un objetivo) o Tundra (PG temporales a aliados).',
          countNeeded: 1,
          options: STORM_HERALD_ENVIRONMENTS,
          alreadyChosen: (existingDecisions['stormHeraldEnvironment'] as string[]) || [],
        });
      }
    }

    // 3.5 Camino del Gigante / Giant (Nivel 3 y 6)
    if (subNorm.includes('gigante') || subNorm.includes('giant')) {
      if (newLevel === 3) {
        results.push({
          id: 'giantLanguage',
          title: 'Idioma de los Gigantes (Camino del Gigante Nivel 3)',
          description: 'Aprendes a hablar, leer y escribir Gigante (o un idioma alternativo si ya lo conoces). Además, en furia creces a tamaño Grande, tienes +5 pies de alcance y sumas daño de furia a ataques con armas arrojadizas.',
          countNeeded: 1,
          options: ALL_5E_LANGUAGES_OPTIONS,
          alreadyChosen: (existingDecisions['giantLanguage'] as string[]) || [],
        });
      } else if (newLevel === 6) {
        results.push({
          id: 'giantElementalCleaver',
          title: 'Cuchilla Elemental (Camino del Gigante Nivel 6)',
          description: 'Elige la energía de gigantes con la que imbuyes tu arma en furia: Fuego, Frío, Relámpago, Trueno o Ácido (+1d6 daño, arrojadiza a 20/60 pies y retorna a tu mano de inmediato).',
          countNeeded: 1,
          options: GIANT_ELEMENTAL_CLEAVER_OPTIONS,
          alreadyChosen: (existingDecisions['giantElementalCleaver'] as string[]) || [],
        });
      }
    }
  }

  // 4.0 Guerrero - Estilo de Combate a Nivel 1
  if ((norm.includes('guerrero') || norm.includes('fighter')) && (newLevel === 1 || currentLevel === 0)) {
    results.push({
      id: 'fighterFightingStyle_1',
      title: 'Estilo de Combate (Guerrero Nivel 1)',
      description: 'Elige tu especialización marcial primaria.',
      countNeeded: 1,
      options: FIGHTING_STYLE_OPTIONS.filter((f) => f.allowedClasses.includes('guerrero')).map((f) => ({
        id: f.id,
        name: f.name,
        desc: f.shortDesc,
        details: f.detailedDesc,
      })),
      alreadyChosen: allKnownFightingStyles,
    });
  }

  // 4.0 Paladín - Estilo de Combate a Nivel 2
  if ((norm.includes('paladín') || norm.includes('paladin')) && newLevel === 2) {
    results.push({
      id: 'paladinFightingStyle_2',
      title: 'Estilo de Combate (Paladín Nivel 2)',
      description: 'Elige tu especialización marcial sagrada.',
      countNeeded: 1,
      options: FIGHTING_STYLE_OPTIONS.filter((f) => f.allowedClasses.includes('paladin') || f.allowedClasses.includes('paladín')).map((f) => ({
        id: f.id,
        name: f.name,
        desc: f.shortDesc,
        details: f.detailedDesc,
      })),
      alreadyChosen: allKnownFightingStyles,
    });
  }

  // 4. Guerrero - Maestro de Batalla (nv 3, 7, 10, 15)
  const isBattleMaster = subNorm.includes('maestro de batalla') || subNorm.includes('battle master') || subNorm.includes('battlemaster');
  if ((norm.includes('guerrero') || norm.includes('fighter')) && isBattleMaster) {
    if (newLevel === 3 || newLevel === 7 || newLevel === 10 || newLevel === 15) {
      const chosen = (existingDecisions['battleMasterManeuvers'] as string[]) || [];
      results.push({
        id: 'battleMasterManeuvers',
        title: 'Maniobras de Combate (Maestro de Batalla)',
        description:
          newLevel === 3
            ? 'Elige 3 maniobras de superioridad tácticomecánica para someter a tus enemigos en combate.'
            : `A nivel ${newLevel} aprendes 2 maniobras adicionales. Además, puedes reemplazar 1 ya conocida.`,
        countNeeded: newLevel === 3 ? 3 : 2,
        options: BATTLE_MASTER_MANEUVERS,
        canSwap: newLevel > 3 && chosen.length > 0,
        swapLabel: 'Reemplazar 1 maniobra conocida por otra',
        alreadyChosen: chosen,
      });
      if (newLevel === 3) {
        results.push({
          id: 'battleMasterArtisanTool_3',
          title: 'Estudiante de la Guerra (Maestro de Batalla Nivel 3)',
          description: 'Ganas competencia con un tipo de herramientas de artesano a tu elección.',
          countNeeded: 1,
          options: ARTIFICER_ARTISAN_TOOLS,
          alreadyChosen: (existingDecisions['battleMasterArtisanTool_3'] as string[]) || [],
        });
      }
    }
  }

  // 5. Guerrero - Caballero Rúnico (nv 3, 7, 10, 15)
  const isRuneKnight = subNorm.includes('runico') || subNorm.includes('rúnico') || subNorm.includes('rune knight');
  if ((norm.includes('guerrero') || norm.includes('fighter')) && isRuneKnight) {
    if (newLevel === 3 || newLevel === 7 || newLevel === 10 || newLevel === 15) {
      const allowed = RUNE_KNIGHT_RUNES.filter((r) => (newLevel >= 7 ? true : !['runa-colina', 'runa-tormenta'].includes(r.id)));
      const chosen = (existingDecisions['runeKnightRunes'] as string[]) || [];
      results.push({
        id: 'runeKnightRunes',
        title: 'Tallado de Runas (Caballero Rúnico)',
        description:
          newLevel === 3
            ? 'Aprende a grabar 2 runas en tu equipo (Nube, Fuego, Escarcha o Piedra).'
            : `A nivel ${newLevel} aprendes 1 runa adicional (a nivel 7 desbloqueas Colina y Tormenta).`,
        countNeeded: newLevel === 3 ? 2 : 1,
        options: allowed,
        canSwap: newLevel > 3 && chosen.length > 0,
        swapLabel: 'Reemplazar 1 runa grabada por otra',
        alreadyChosen: chosen,
      });
    }
  }

  // 6. Guerrero - Arquero Arcano (nv 3, 7, 10, 15, 18)
  const isArcaneArcher = subNorm.includes('arquero arcano') || subNorm.includes('arcane archer');
  if ((norm.includes('guerrero') || norm.includes('fighter')) && isArcaneArcher) {
    if (newLevel === 3 || newLevel === 7 || newLevel === 10 || newLevel === 15 || newLevel === 18) {
      const chosen = (existingDecisions['arcaneArcherShots'] as string[]) || [];
      results.push({
        id: 'arcaneArcherShots',
        title: 'Opciones de Disparo Arcano (Arquero Arcano)',
        description:
          newLevel === 3
            ? 'Elige 2 disparos mágicos para imbuir tus flechas.'
            : `A nivel ${newLevel} aprendes 1 nuevo disparo arcano.`,
        countNeeded: newLevel === 3 ? 2 : 1,
        options: ARCANE_ARCHER_SHOTS,
        canSwap: newLevel > 3 && chosen.length > 0,
        swapLabel: 'Reemplazar 1 disparo arcano por otro',
        alreadyChosen: chosen,
      });
    }
  }

  // 7. Guerrero - Campeón (Segundo Estilo de Combate a nv 10)
  const isChampion = subNorm.includes('campeon') || subNorm.includes('campeón') || subNorm.includes('champion');
  if ((norm.includes('guerrero') || norm.includes('fighter')) && isChampion && newLevel === 10) {
    results.push({
      id: 'championSecondFightingStyle',
      title: 'Segundo Estilo de Combate (Campeón Nivel 10)',
      description: 'Elige un segundo estilo de combate de la lista de guerrero para enriquecer tu repertorio marcial.',
      countNeeded: 1,
      options: FIGHTING_STYLE_OPTIONS.filter((f) => f.allowedClasses.includes('guerrero')).map((f) => ({
        id: f.id,
        name: f.name,
        desc: f.shortDesc,
        details: f.detailedDesc,
      })),
      alreadyChosen: allKnownFightingStyles,
    });
  }

  // 7.1 Guerrero - Samurái (Cortesano Elegante Nivel 3)
  const isSamurai = subNorm.includes('samurai') || subNorm.includes('samurái');
  if ((norm.includes('guerrero') || norm.includes('fighter')) && isSamurai && newLevel === 3) {
    results.push({
      id: 'samuraiBonusSkill_3',
      title: 'Cortesano Elegante - Habilidad (Samurái Nivel 3)',
      description: 'Ganas competencia en Historia, Perspicacia, Actuación o Persuasión a tu elección.',
      countNeeded: 1,
      options: SAMURAI_BONUS_SKILLS,
      alreadyChosen: (existingDecisions['samuraiBonusSkill_3'] as string[]) || [],
    });
  }

  // 8. Hechicero - Metamagia (nv 3, 10, 17)
  if ((norm.includes('hechicero') || norm.includes('sorcerer')) && (newLevel === 3 || newLevel === 10 || newLevel === 17)) {
    const chosen = (existingDecisions['metamagic'] as string[]) || [];
    results.push({
      id: 'metamagic',
      title: 'Opciones de Metamagia (Hechicero)',
      description:
        newLevel === 3
          ? 'Elige 2 opciones de metamagia para alterar conjuros con Puntos de Hechicería.'
          : `A nivel ${newLevel} aprendes 1 opción de metamagia adicional.`,
      countNeeded: newLevel === 3 ? 2 : 1,
      options: METAMAGIC_OPTIONS,
      canSwap: newLevel > 3 && chosen.length > 0,
      swapLabel: 'Reemplazar 1 opción de metamagia por otra',
      alreadyChosen: chosen,
    });
  }

  // 8.1 Hechicero - Versatilidad de Metamagia (Regla Opcional Tasha Nivel 4, 8, 12, 16, 19)
  const isSorcererAsi = newLevel === 4 || newLevel === 8 || newLevel === 12 || newLevel === 16 || newLevel === 19;
  if ((norm.includes('hechicero') || norm.includes('sorcerer')) && isSorcererAsi) {
    const chosen = (existingDecisions['metamagic'] as string[]) || [];
    if (chosen.length > 0) {
      results.push({
        id: 'metamagicVersatility',
        title: 'Versatilidad de Metamagia (Regla Opcional Tasha)',
        description:
          'Al alcanzar un nivel que otorga Mejora de Característica, puedes reemplazar una opción de metamagia que ya conozcas por otra diferente de la lista oficial.',
        countNeeded: 0,
        options: METAMAGIC_OPTIONS,
        canSwap: true,
        swapLabel: 'Reemplazar 1 opción de metamagia conocida',
        alreadyChosen: chosen,
      });
    }
  }

  // 9. Hechicero - Dragón Ancestral (nv 1)
  const isDraconic = subNorm.includes('draconico') || subNorm.includes('dracónico') || subNorm.includes('draconic');
  if ((norm.includes('hechicero') || norm.includes('sorcerer')) && isDraconic && newLevel === 1) {
    results.push({
      id: 'draconicAncestry',
      title: 'Ancestro Dracónico (Hechicero Nivel 1)',
      description: 'Elige el color o metal del dragón del que desciende tu magia elemental.',
      countNeeded: 1,
      options: DRACONIC_ANCESTRY_OPTIONS,
    });
  }

  // 9.1 Hechicero - Alma Divina: Afinidad Divina (nv 1)
  const isDivineSoul = subNorm.includes('divin') || subNorm.includes('divine');
  if ((norm.includes('hechicero') || norm.includes('sorcerer')) && isDivineSoul && newLevel === 1) {
    results.push({
      id: 'divineSoulAffinity_1',
      title: 'Afinidad Divina (Alma Divina Nivel 1)',
      description: 'Elige tu afinidad moral o cósmica con los dioses: aprendes un conjuro sagrado gratuito según tu elección.',
      countNeeded: 1,
      options: DIVINE_SOUL_AFFINITIES,
      alreadyChosen: (existingDecisions['divineSoulAffinity_1'] as string[]) || [],
    });
  }

  // 9.2 Hechicero - Hechicería Lunar: Fase Lunar Inicial (nv 1)
  const isLunarSorcery = subNorm.includes('lunar') || subNorm.includes('moon');
  if ((norm.includes('hechicero') || norm.includes('sorcerer')) && isLunarSorcery && newLevel === 1) {
    results.push({
      id: 'lunarSorceryPhase_1',
      title: 'Fase Lunar Inicial (Hechicería Lunar Nivel 1)',
      description: 'Elige qué fase lunar encarnas inicialmente al despertar tu poder arcano.',
      countNeeded: 1,
      options: LUNAR_SORCERY_PHASES,
      alreadyChosen: (existingDecisions['lunarSorceryPhase_1'] as string[]) || [],
    });
  }

  // 10. Brujo - Invocaciones Sobrenaturales (nv 2, 5, 7, 9, 12, 15, 18)
  if ((norm.includes('brujo') || norm.includes('warlock')) && [2, 5, 7, 9, 12, 15, 18].includes(newLevel)) {
    const chosen = (existingDecisions['invocations'] as string[]) || [];
    results.push({
      id: 'invocations',
      title: 'Invocaciones Sobrenaturales (Brujo)',
      description:
        newLevel === 2
          ? 'Elige tus primeras 2 Invocaciones Sobrenaturales concedidas por tu Patrón.'
          : `A nivel ${newLevel} aprendes 1 invocación adicional. Además puedes cambiar una conocida.`,
      countNeeded: newLevel === 2 ? 2 : 1,
      options: ELDRITCH_INVOCATIONS,
      canSwap: newLevel > 2 && chosen.length > 0,
      swapLabel: 'Reemplazar 1 invocación conocida por otra',
      alreadyChosen: chosen,
    });
  }

  // 11. Brujo - Don del Pacto (nv 3)
  if ((norm.includes('brujo') || norm.includes('warlock')) && newLevel === 3) {
    results.push({
      id: 'pactBoon',
      title: 'Don del Pacto (Brujo Nivel 3)',
      description: 'Tu patrón te hace entrega de un regalo sobrenatural: Filo, Tomo, Cadena o Talismán.',
      countNeeded: 1,
      options: PACT_BOON_OPTIONS,
    });
  }

  // 11.1 Brujo - Sub-decisiones de Don del Pacto (Pacto del Tomo & Cadena)
  const isWarlock = norm.includes('brujo') || norm.includes('warlock');
  if (isWarlock && (newLevel >= 3 || currentLevel >= 3)) {
    const pactBoonVal = String(existingDecisions['pactBoon'] || '').toLowerCase();
    const isTome = pactBoonVal.includes('tomo') || pactBoonVal.includes('tome');
    const isChain = pactBoonVal.includes('cadena') || pactBoonVal.includes('chain');

    if (isTome) {
      results.push({
        id: 'pactTomeCantrips',
        title: 'Trucos del Pacto del Tomo (Brujo)',
        description: 'Tu Libro de las Sombras te concede 3 trucos de cualquier lista de conjuros de clase del multiverso. Cuentan como trucos de brujo para ti.',
        countNeeded: 3,
        options: getMulticlassCantripOptions(),
        alreadyChosen: (existingDecisions['pactTomeCantrips'] as string[]) || [],
      });
    }
    if (isChain) {
      results.push({
        id: 'pactChainFamiliar',
        title: 'Familiar Sobrenatural (Pacto de la Cadena)',
        description: 'Elige la forma de tu familiar sobrenatural especial: Diablillo, Quasit, Pseudodragón o Duendecillo.',
        countNeeded: 1,
        options: PACT_CHAIN_FAMILIARS,
        alreadyChosen: (existingDecisions['pactChainFamiliar'] as string[]) || [],
      });
    }
  }

  // 12. Druida - Decisiones de Círculo Druídico
  const isDruid = norm.includes('druida') || norm.includes('druid');
  if (isDruid) {
    // 12.1 Círculo de la Tierra
    const isLandDruid = subNorm.includes('tierra') || subNorm.includes('land');
    if (isLandDruid) {
      if (newLevel === 2) {
        results.push({
          id: 'druidLandCantrip',
          title: 'Truco Adicional (Círculo de la Tierra Nivel 2)',
          description: 'Aprendes 1 truco de druida adicional a tu elección.',
          countNeeded: 1,
          options: getDruidCantripOptions(),
          alreadyChosen: (existingDecisions['druidLandCantrip'] as string[]) || [],
        });
      }
      if (newLevel === 2 || newLevel === 3) {
        results.push({
          id: 'landBiome',
          title: 'Bioma del Círculo de la Tierra (Druida)',
          description: 'Elige tu bioma de comunión con la naturaleza (Ártico, Costa, Desierto, Bosque, Pradera, Montaña, Pantano o Inframundo).',
          countNeeded: 1,
          options: LAND_CIRCLE_BIOMES,
          alreadyChosen: (existingDecisions['landBiome'] as string[]) || [],
        });
      }
    }

    // 12.2 Círculo del Pastor
    const isShepherdDruid = subNorm.includes('pastor') || subNorm.includes('shepherd');
    if (isShepherdDruid && newLevel === 2) {
      results.push({
        id: 'druidShepherdLanguage',
        title: 'Discurso de los Bosques (Círculo del Pastor Nivel 2)',
        description: 'Aprendes a hablar, leer y escribir Silvano, el idioma de las criaturas feéricas.',
        countNeeded: 1,
        options: [
          { id: 'silvano', name: 'Silvano (Sylvan)', desc: 'Idioma feérico de criaturas del bosque, espíritus y hadas.', badge: 'Feérico' },
        ],
        alreadyChosen: (existingDecisions['druidShepherdLanguage'] as string[]) || [],
      });
    }
  }

  // 13. Explorador - Enemigo Predilecto, Terreno Predilecto, Estilo de Combate & Subclases
  if (norm.includes('explorador') || norm.includes('ranger')) {
    if (newLevel === 1 || newLevel === 6 || newLevel === 14) {
      results.push({
        id: `favoredEnemy_${newLevel}`,
        title: `Enemigo Predilecto (Explorador Nivel ${newLevel})`,
        description: 'Elige un tipo de presa enemiga en la que te especializas.',
        countNeeded: 1,
        options: RANGER_FAVORED_ENEMIES,
      });
    }
    if (newLevel === 1 || newLevel === 6 || newLevel === 10) {
      results.push({
        id: `naturalExplorer_${newLevel}`,
        title: `Terreno Predilecto (Explorador Nivel ${newLevel})`,
        description: 'Elige un bioma en el que te desenvuelves como navegante y rastreador supremo.',
        countNeeded: 1,
        options: RANGER_NATURAL_EXPLORER,
      });
    }
    // Estilo de Combate a Nivel 2
    if (newLevel === 2) {
      results.push({
        id: 'rangerFightingStyle_2',
        title: 'Estilo de Combate (Explorador Nivel 2)',
        description: 'Elige tu especialización marcial: Tiro con Arco, Defensa, Duelo, Dos Armas o estilos de Tasha.',
        countNeeded: 1,
        options: RANGER_FIGHTING_STYLES,
        alreadyChosen: allKnownFightingStyles,
      });
    }

    // Subclase: Cazador (Hunter)
    const isHunter = subNorm.includes('cazador') || subNorm.includes('hunter');
    if (isHunter) {
      if (newLevel === 3) {
        results.push({
          id: 'hunterPrey_3',
          title: 'Presa del Cazador (Cazador Nivel 3)',
          description: 'Elige tu técnica de caza contra adversarios: Asesino de Colosos, Cortador de Hordas o Asesino de Gigantes.',
          countNeeded: 1,
          options: HUNTER_PREY_OPTIONS,
          alreadyChosen: (existingDecisions['hunterPrey_3'] as string[]) || [],
        });
      }
      if (newLevel === 7) {
        results.push({
          id: 'hunterDefense_7',
          title: 'Tácticas Defensivas (Cazador Nivel 7)',
          description: 'Elige tu defensa especializada ante amenazas: Escapar de la Horda, Defensa de Ataque Múltiple o Voluntad de Acero.',
          countNeeded: 1,
          options: HUNTER_DEFENSIVE_TACTICS,
          alreadyChosen: (existingDecisions['hunterDefense_7'] as string[]) || [],
        });
      }
      if (newLevel === 11) {
        results.push({
          id: 'hunterMultiattack_11',
          title: 'Ataque Múltiple (Cazador Nivel 11)',
          description: 'Elige tu forma de barrer grupos de enemigos: Andanada (a distancia) o Ataque en Torbellino (cuerpo a cuerpo).',
          countNeeded: 1,
          options: HUNTER_MULTIATTACK_OPTIONS,
          alreadyChosen: (existingDecisions['hunterMultiattack_11'] as string[]) || [],
        });
      }
      if (newLevel === 15) {
        results.push({
          id: 'hunterSuperiorDefense_15',
          title: 'Defensa Superior del Cazador (Cazador Nivel 15)',
          description: 'Elige tu defensa legendaria: Evasión, Esquiva Asombrosa u Oponerse a la Marea.',
          countNeeded: 1,
          options: HUNTER_SUPERIOR_DEFENSE,
          alreadyChosen: (existingDecisions['hunterSuperiorDefense_15'] as string[]) || [],
        });
      }
    }

    // Subclase: Guardián Dracónico (Drakewarden)
    const isDrakewarden = subNorm.includes('draconico') || subNorm.includes('dracónico') || subNorm.includes('drake');
    if (isDrakewarden && newLevel === 3) {
      results.push({
        id: 'drakewardenDraconicEssence_3',
        title: 'Esencia Dracónica del Drake (Guardián Dracónico Nivel 3)',
        description: 'Elige la afinidad elemental de tu Compañero Drake (Fuego, Frío, Relámpago, Ácido o Veneno).',
        countNeeded: 1,
        options: DRAKEWARDEN_DRACONIC_ESSENCE,
        alreadyChosen: (existingDecisions['drakewardenDraconicEssence_3'] as string[]) || [],
      });
    }
  }

  // 14. Clérigo - Especialización de Dominio Divino (nv 1)
  const isCleric = norm.includes('cler') || norm.includes('clérigo');
  if (isCleric && (newLevel === 1 || currentLevel === 0)) {
    // Dominio del Conocimiento
    if (subNorm.includes('conocimiento') || subNorm.includes('knowledge')) {
      results.push({
        id: 'clericKnowledgeSkills',
        title: 'Bendiciones del Conocimiento - Habilidades (Clérigo Nivel 1)',
        description: 'Elige 2 habilidades de erudición entre Arcanos, Historia, Naturaleza o Religión. Ganas competencia y tu bonificador se duplica para cualquier prueba de característica con ellas (Pericia x2).',
        countNeeded: 2,
        options: [
          { id: 'arcanos', name: 'Arcanos (Arcana)', desc: 'Conocimiento de magia, conjuros, objetos mágicos y los planos de existencia. Ganas Pericia (doble competencia).' },
          { id: 'historia', name: 'Historia (History)', desc: 'Conocimiento de eventos históricos, reinos legendarios y dinastías antiguas. Ganas Pericia (doble competencia).' },
          { id: 'naturaleza', name: 'Naturaleza (Nature)', desc: 'Conocimiento del terreno, plantas, animales y fenómenos meteorológicos. Ganas Pericia (doble competencia).' },
          { id: 'religion', name: 'Religión (Religion)', desc: 'Conocimiento de deidades, ritos, cultos, símbolos sagrados y prácticas religiosas. Ganas Pericia (doble competencia).' },
        ],
        alreadyChosen: (existingDecisions['clericKnowledgeSkills'] as string[]) || [],
      });
      results.push({
        id: 'clericKnowledgeLanguages',
        title: 'Bendiciones del Conocimiento - Idiomas (Clérigo Nivel 1)',
        description: 'Aprendes 2 idiomas adicionales a tu elección para leer textos antiguos y comunicarte con entidades de otros planos.',
        countNeeded: 2,
        options: ALL_5E_LANGUAGES_OPTIONS,
        alreadyChosen: (existingDecisions['clericKnowledgeLanguages'] as string[]) || [],
      });
    }

    // Dominio de la Naturaleza
    if (subNorm.includes('naturaleza') || subNorm.includes('nature')) {
      results.push({
        id: 'clericNatureCantrip',
        title: 'Acólito de la Naturaleza - Truco de Druida (Clérigo Nivel 1)',
        description: 'Aprendes 1 truco a tu elección de la lista de conjuros de Druida. Cuenta como truco de clérigo para ti.',
        countNeeded: 1,
        options: getDruidCantripOptions(),
        alreadyChosen: (existingDecisions['clericNatureCantrip'] as string[]) || [],
      });
      results.push({
        id: 'clericNatureSkill',
        title: 'Acólito de la Naturaleza - Habilidad (Clérigo Nivel 1)',
        description: 'Ganas competencia en una de las siguientes habilidades de la naturaleza a tu elección.',
        countNeeded: 1,
        options: [
          { id: 'trato-animales', name: 'Trato con Animales (Animal Handling)', desc: 'Calmar bestias salvajes, dirigir monturas y percibir intenciones de animales.' },
          { id: 'naturaleza', name: 'Naturaleza (Nature)', desc: 'Conocimiento de flora, fauna, clima y ecosistemas.' },
          { id: 'supervivencia', name: 'Supervivencia (Survival)', desc: 'Rastrear presas, buscar provisiones, orientarse y esquivar peligros naturales.' },
        ],
        alreadyChosen: (existingDecisions['clericNatureSkill'] as string[]) || [],
      });
    }

    // Dominio Arcano
    if (subNorm.includes('arcano') || subNorm.includes('arcana')) {
      results.push({
        id: 'clericArcanaCantrips',
        title: 'Iniciado Arcano - Trucos de Mago (Clérigo Nivel 1)',
        description: 'Aprendes 2 trucos a tu elección de la lista de conjuros de Mago. Para ti, cuentan como trucos de clérigo y utilizan tu Sabiduría.',
        countNeeded: 2,
        options: getWizardCantripOptions(),
        alreadyChosen: (existingDecisions['clericArcanaCantrips'] as string[]) || [],
      });
    }

    // Dominio del Orden
    if (subNorm.includes('orden') || subNorm.includes('order')) {
      results.push({
        id: 'clericOrderSkill',
        title: 'Competencias del Orden (Clérigo Nivel 1)',
        description: 'Ganas competencia en Intimidación o Persuasión a tu elección (además de armaduras pesadas).',
        countNeeded: 1,
        options: [
          { id: 'intimidacion', name: 'Intimidación (Intimidation)', desc: 'Imponer autoridad, amedrentar sospechosos y ejercer la presencia de la ley.' },
          { id: 'persuasion', name: 'Persuasión (Persuasion)', desc: 'Negociar acuerdos, hacer cumplir edictos y convencer pacíficamente.' },
        ],
        alreadyChosen: (existingDecisions['clericOrderSkill'] as string[]) || [],
      });
    }

    // Dominio de la Paz
    if (subNorm.includes('paz') || subNorm.includes('peace')) {
      results.push({
        id: 'clericPeaceSkill',
        title: 'Competencias de la Paz (Clérigo Nivel 1)',
        description: 'Ganas competencia en Perspicacia, Interpretación o Persuasión a tu elección.',
        countNeeded: 1,
        options: [
          { id: 'perspicacia', name: 'Perspicacia (Insight)', desc: 'Detectar intenciones hostiles, mentiras y estado emocional de las personas.' },
          { id: 'interpretacion', name: 'Interpretación (Performance)', desc: 'Inspirar armonía y calmar multitudes mediante el canto, la oratoria o la música.' },
          { id: 'persuasion', name: 'Persuasión (Persuasion)', desc: 'Mediar disputas, forjar treguas y pacificar conflictos diplomáticamente.' },
        ],
        alreadyChosen: (existingDecisions['clericPeaceSkill'] as string[]) || [],
      });
    }

    // Dominio de la Muerte
    if (subNorm.includes('muerte') || subNorm.includes('death')) {
      results.push({
        id: 'clericDeathCantrip',
        title: 'Segador - Truco de Nigromancia (Clérigo Nivel 1)',
        description: 'Aprendes 1 truco de Nigromancia a tu elección de cualquier lista de conjuros. Cuenta como truco de clérigo para ti.',
        countNeeded: 1,
        options: getNecromancyCantripOptions(),
        alreadyChosen: (existingDecisions['clericDeathCantrip'] as string[]) || [],
      });
    }
  }

  // Clérigo Nivel 17 - Maestría Arcana (Dominio Arcano)
  if (isCleric && (subNorm.includes('arcano') || subNorm.includes('arcana')) && newLevel === 17) {
    results.push({
      id: 'clericArcanaMastery_17',
      title: 'Maestría Arcana (Dominio Arcano Nivel 17)',
      description: 'Elige 4 conjuros de la lista de Mago (uno de nivel 6, uno de 7, uno de 8 y uno de 9). Pasan a ser conjuros de dominio siempre preparados para ti.',
      countNeeded: 4,
      options: getWizardHighLevelSpellOptions(),
      alreadyChosen: (existingDecisions['clericArcanaMastery_17'] as string[]) || [],
    });
  }

  // 15. Artífice - Decisiones de Clase y Subclase (Tasha / Eberron 1:1)
  const isArtificer = norm.includes('artifice') || norm.includes('artífice');
  if (isArtificer) {
    // 15.1 Herramientas de Artesano (Nivel 1)
    if (newLevel === 1) {
      results.push({
        id: 'artificerArtisanTools',
        title: 'Herramientas de Artesano (Artífice Nivel 1)',
        description: 'Además de herramientas de ladrón y de manitas, ganas competencia con 1 juego de herramientas de artesano a tu elección.',
        countNeeded: 1,
        options: ARTIFICER_ARTISAN_TOOLS,
        alreadyChosen: (existingDecisions['artificerArtisanTools'] as string[]) || [],
      });
    }

    // 15.2 Infusiones Conocidas (Nivel 2, 6, 10, 14, 18)
    if (newLevel === 2 || newLevel === 6 || newLevel === 10 || newLevel === 14 || newLevel === 18) {
      const allowed = ARTIFICER_INFUSIONS.filter((inf) => inf.minLevel <= newLevel);
      const chosen = (existingDecisions['artificerInfusions'] as string[]) || [];
      results.push({
        id: 'artificerInfusions',
        title: `Infusiones de Artífice (Nivel ${newLevel})`,
        description:
          newLevel === 2
            ? 'A nivel 2 aprendes tus primeras 4 infusiones de artífice y puedes mantener hasta 2 objetos infundidos activos simultáneamente.'
            : `A nivel ${newLevel} aprendes 2 infusiones de artífice adicionales permitidas para tu nivel. Además, puedes reemplazar una infusión que ya conozcas.`,
        countNeeded: newLevel === 2 ? 4 : 2,
        options: allowed,
        canSwap: newLevel > 2 && chosen.length > 0,
        swapLabel: 'Reemplazar 1 infusión conocida por otra',
        alreadyChosen: chosen,
      });
    }

    // 15.3 Armero (Armorer)
    const isArmorer = subNorm.includes('armero') || subNorm.includes('armorer');
    if (isArmorer) {
      if (newLevel === 3) {
        results.push({
          id: 'armorerModel',
          title: 'Modelo de Armadura Arcana (Armero Nivel 3)',
          description: 'Elige la configuración principal de tu armadura arcana (puedes alterarla tras cada descanso corto o largo): Guardián (tanque con 1d8 trueno y PG temp) o Infiltrador (sigilo con rayo relámpago a 90/300 pies y +5 pies velocidad).',
          countNeeded: 1,
          options: ARMORER_MODEL_OPTIONS,
          alreadyChosen: (existingDecisions['armorerModel'] as string[]) || [],
        });
      }
      if (newLevel === 9) {
        results.push({
          id: 'armorerModifications',
          title: 'Modificaciones de Armadura (Armero Nivel 9)',
          description: 'Tu armadura arcana cuenta como 4 objetos separados (peto, botas, casco y arma). El número máximo de infusiones que puedes mantener activas aumenta en 2 adicionales (ambas deben aplicarse a piezas de tu armadura).',
          countNeeded: 1,
          options: [
            {
              id: 'armorer-mod-active',
              name: 'Chasis Arcano Segmentado (+2 Infusiones Activas)',
              desc: 'Desbloqueas 2 ranuras de infusión adicionales dedicadas exclusivamente a las piezas de tu armadura arcana (Peto, Botas, Casco y Arma integrada).',
              badge: '+2 Infusiones en Armadura',
            },
          ],
          alreadyChosen: (existingDecisions['armorerModifications'] as string[]) || [],
        });
      }
    }

    // 15.4 Artillero (Artillerist)
    const isArtillerist = subNorm.includes('artillero') || subNorm.includes('artillerist');
    if (isArtillerist && newLevel === 3) {
      results.push({
        id: 'artilleristCannon',
        title: 'Cañón Sobrenatural Preferido (Artillero Nivel 3)',
        description: 'Elige la manifestación habitual de tu Cañón Eldritch (puedes crear una distinta cada vez que uses la acción de manifestarlo): Balista de Fuerza (120 pies, empuje 5 pies), Lanzallamas (cono 15 pies fuego) o Protector (1d8+Int PG temp cada turno a aliados a 10 pies).',
        countNeeded: 1,
        options: ARTILLERIST_CANNON_OPTIONS,
        alreadyChosen: (existingDecisions['artilleristCannon'] as string[]) || [],
      });
    }

    // 15.5 Herrero de Batalla (Battle Smith)
    const isBattleSmith = subNorm.includes('herrero') || subNorm.includes('battle smith') || subNorm.includes('battlesmith');
    if (isBattleSmith && newLevel === 3) {
      results.push({
        id: 'battleSmithSteelDefender',
        title: 'Chasis del Defensor de Acero (Herrero de Batalla Nivel 3)',
        description: 'Define la morfología mecánica de tu fiel Defensor de Acero (CA 15, PG escalables = 2 + Int + 5×Nv, acción Golpe Contundente 1d8+PB, Reparar 3/día y Desviar Ataque). También ganas "Listo para la Batalla": usas Inteligencia para atacar y hacer daño con armas mágicas.',
        countNeeded: 1,
        options: BATTLE_SMITH_COMPANION_OPTIONS,
        alreadyChosen: (existingDecisions['battleSmithSteelDefender'] as string[]) || [],
      });
    }

    // 15.6 Alquimista (Alchemist)
    const isAlchemist = subNorm.includes('alquimista') || subNorm.includes('alchemist');
    if (isAlchemist && newLevel === 3) {
      results.push({
        id: 'alchemistExperimentalElixir',
        title: 'Especialidad de Elixir Experimental (Alquimista Nivel 3)',
        description: 'Revisa las fórmulas alquímicas de tus elixires diarios (Curación, Velocidad, Resiliencia, Valentía, Vuelo, Transformación). Al terminar descansos largos creas elixires gratuitos y puedes crear más gastando ranuras de nivel 1+.',
        countNeeded: 1,
        options: ALCHEMIST_ELIXIR_FORMULAS,
        alreadyChosen: (existingDecisions['alchemistExperimentalElixir'] as string[]) || [],
      });
    }
  }

  // 16. Bardo - Decisiones de Clase, Subclase y Secretos Mágicos
  const isBard = norm.includes('bardo') || norm.includes('bard');
  if (isBard) {
    // 16.0 Pericia de Bardo (Expertise Nivel 3 y 10)
    if (newLevel === 3) {
      results.push({
        id: 'bardExpertise_3',
        title: 'Pericia (Bardo Nivel 3)',
        description: 'Elige 2 competencias en habilidades. Tu bonificador por competencia se duplica para cualquier prueba de característica que utilice cualquiera de las habilidades elegidas.',
        countNeeded: 2,
        options: ALL_5E_SKILLS_OPTIONS,
        alreadyChosen: (existingDecisions['bardExpertise_3'] as string[]) || [],
      });
    }
    if (newLevel === 10) {
      results.push({
        id: 'bardExpertise_10',
        title: 'Pericia Adicional (Bardo Nivel 10)',
        description: 'Elige 2 competencias en habilidades adicionales para duplicar tu bonificador por competencia.',
        countNeeded: 2,
        options: ALL_5E_SKILLS_OPTIONS,
        alreadyChosen: (existingDecisions['bardExpertise_10'] as string[]) || [],
      });
    }

    // 16.1 Colegio de las Espadas (College of Swords Nivel 3)
    const isSwords = subNorm.includes('espada') || subNorm.includes('sword');
    if (isSwords && newLevel === 3) {
      results.push({
        id: 'swordsFightingStyle',
        title: 'Estilo de Combate (Colegio de las Espadas Nivel 3)',
        description: 'Elige tu especialización marcial con la hoja: Duelo (+2 daño en combate a una mano) o Combate con Dos Armas (sumar modificador al daño con mano torpe).',
        countNeeded: 1,
        options: BARD_SWORDS_FIGHTING_STYLES,
        alreadyChosen: allKnownFightingStyles,
      });
    }

    // 16.2 Colegio del Conocimiento / Saber (College of Lore Nivel 3)
    const isLoreBard = subNorm.includes('lore') || subNorm.includes('saber') || subNorm.includes('conocimiento');
    if (isLoreBard && newLevel === 3) {
      results.push({
        id: 'loreBonusSkills',
        title: 'Competencias Adicionales (Colegio del Conocimiento Nivel 3)',
        description: 'Elige 3 habilidades adicionales a tu elección en las que ganas competencia inmediata.',
        countNeeded: 3,
        options: ALL_5E_SKILLS_OPTIONS,
        alreadyChosen: (existingDecisions['loreBonusSkills'] as string[]) || [],
      });
    }

    // 16.3 Colegio de los Espíritus (College of Spirits Nivel 6)
    const isSpiritsBard = subNorm.includes('espiritus') || subNorm.includes('espíritus') || subNorm.includes('spirits');
    if (isSpiritsBard && newLevel === 6) {
      results.push({
        id: 'spiritsSpiritSession',
        title: 'Sesión Espiritual (Colegio de los Espíritus Nivel 6)',
        description: 'Elige 1 conjuro de Adivinación o Nigromancia de hasta 3.er nivel de cualquier clase que aprenderás temporalmente a través del espiritismo.',
        countNeeded: 1,
        options: getSpiritSessionSpellOptions(3),
        alreadyChosen: (existingDecisions['spiritsSpiritSession'] as string[]) || [],
      });
    }

    // 16.4 Secretos Mágicos (Magical Secrets)
    if (isLoreBard && newLevel === 6) {
      results.push({
        id: 'bardMagicalSecrets_6',
        title: 'Secretos Mágicos Adicionales (Colegio del Conocimiento Nivel 6)',
        description: 'Elige 2 conjuros de cualquier clase de hasta 3.er nivel. Cuentan como conjuros de bardo para ti y se consideran preparados.',
        countNeeded: 2,
        options: getMagicalSecretsSpellOptions(3),
        alreadyChosen: (existingDecisions['bardMagicalSecrets_6'] as string[]) || [],
      });
    }
    if (newLevel === 10) {
      results.push({
        id: 'bardMagicalSecrets_10',
        title: 'Secretos Mágicos (Bardo Nivel 10)',
        description: 'Elige 2 conjuros de cualquier clase de hasta 5.º nivel. Cuentan como conjuros de bardo para ti y se consideran preparados.',
        countNeeded: 2,
        options: getMagicalSecretsSpellOptions(5),
        alreadyChosen: (existingDecisions['bardMagicalSecrets_10'] as string[]) || [],
      });
    }
    if (newLevel === 14) {
      results.push({
        id: 'bardMagicalSecrets_14',
        title: 'Secretos Mágicos (Bardo Nivel 14)',
        description: 'Elige 2 conjuros de cualquier clase de hasta 7.º nivel. Cuentan como conjuros de bardo para ti y se consideran preparados.',
        countNeeded: 2,
        options: getMagicalSecretsSpellOptions(7),
        alreadyChosen: (existingDecisions['bardMagicalSecrets_14'] as string[]) || [],
      });
    }
    if (newLevel === 18) {
      results.push({
        id: 'bardMagicalSecrets_18',
        title: 'Secretos Mágicos Supremos (Bardo Nivel 18)',
        description: 'Elige 2 conjuros de cualquier clase de hasta 9.º nivel. Conviértete en el maestro absoluto de la urdimbre mágica.',
        countNeeded: 2,
        options: getMagicalSecretsSpellOptions(9),
        alreadyChosen: (existingDecisions['bardMagicalSecrets_18'] as string[]) || [],
      });
    }
  }

  // 17. Pícaro (Rogue) - Pericia y Rasgos de Subclase
  const isRogue = norm.includes('pícaro') || norm.includes('picaro') || norm.includes('rogue');
  if (isRogue) {
    // 17.1 Pericia de Pícaro (Expertise Nivel 1 y 6)
    if (newLevel === 1) {
      results.push({
        id: 'rogueExpertise_1',
        title: 'Pericia (Pícaro Nivel 1)',
        description: 'Elige 2 de tus competencias en habilidades (o 1 habilidad y tus herramientas de ladrón). Tu bonificador por competencia se duplica para cualquier prueba de característica con ellas.',
        countNeeded: 2,
        options: ROGUE_EXPERTISE_OPTIONS,
        alreadyChosen: (existingDecisions['rogueExpertise_1'] as string[]) || [],
      });
    }
    if (newLevel === 6) {
      results.push({
        id: 'rogueExpertise_6',
        title: 'Pericia Adicional (Pícaro Nivel 6)',
        description: 'Elige otras 2 de tus competencias en habilidades (o tus herramientas de ladrón) para duplicar tu bonificador por competencia.',
        countNeeded: 2,
        options: ROGUE_EXPERTISE_OPTIONS,
        alreadyChosen: (existingDecisions['rogueExpertise_6'] as string[]) || [],
      });
    }

    // 17.2 Mente Maestra (Master of Intrigue Nivel 3)
    const isMastermind = subNorm.includes('mente-maestra') || subNorm.includes('mente maestra') || subNorm.includes('mastermind');
    if (isMastermind && newLevel === 3) {
      results.push({
        id: 'mastermindLanguages_3',
        title: 'Maestro de la Intriga: Idiomas (Mente Maestra Nivel 3)',
        description: 'Ganas competencia en 2 idiomas adicionales de tu elección para infiltrarte e interactuar en círculos secretos.',
        countNeeded: 2,
        options: ALL_5E_LANGUAGES_OPTIONS,
        alreadyChosen: (existingDecisions['mastermindLanguages_3'] as string[]) || [],
      });
    }

    // 17.3 Fantasma (Whispers of the Dead Nivel 3)
    const isPhantom = subNorm.includes('fantasma') || subNorm.includes('phantom');
    if (isPhantom && newLevel === 3) {
      results.push({
        id: 'phantomWhispersSkill_3',
        title: 'Susurros de los Muertos (Fantasma Nivel 3)',
        description: 'Elige 1 habilidad o herramienta en la que obtienes competencia guiada por los espíritus de ultratumba tras descansar.',
        countNeeded: 1,
        options: ROGUE_EXPERTISE_OPTIONS,
        alreadyChosen: (existingDecisions['phantomWhispersSkill_3'] as string[]) || [],
      });
    }
  }

  // 18. Mago (Wizard)
  const isWizard = norm.includes('mago') || norm.includes('wizard');
  if (isWizard) {
    // 18.1 Canto de la Hoja (Nivel 2)
    const isBladesinging = subNorm.includes('canto') || subNorm.includes('hoja') || subNorm.includes('bladesing');
    if (isBladesinging && newLevel === 2) {
      results.push({
        id: 'bladesingingWeapon_2',
        title: 'Arma del Canto de la Hoja (Nivel 2)',
        description: 'Ganas competencia con un tipo de arma cuerpo a cuerpo de una mano a tu elección.',
        countNeeded: 1,
        options: BLADESINGING_WEAPONS_OPTIONS,
        alreadyChosen: (existingDecisions['bladesingingWeapon_2'] as string[]) || [],
      });
    }

    // 18.2 Dominio de Conjuros (Spell Mastery - Nivel 18)
    if (newLevel === 18) {
      results.push({
        id: 'wizardSpellMastery_18',
        title: 'Dominio de Conjuros (Mago Nivel 18)',
        description: 'Elige un conjuro de 1.er nivel y un conjuro de 2.º nivel de mago en tu libro de conjuros. Puedes lanzar ambos conjuros a su nivel más bajo a voluntad sin gastar ninguna ranura de conjuro cuando los tengas preparados.',
        countNeeded: 2,
        options: getWizardMasterySpellOptions(),
        alreadyChosen: (existingDecisions['wizardSpellMastery_18'] as string[]) || [],
      });
    }

    // 18.3 Conjuros Insignia (Signature Spells - Nivel 20)
    if (newLevel === 20) {
      results.push({
        id: 'wizardSignatureSpells_20',
        title: 'Conjuros Insignia (Mago Nivel 20)',
        description: 'Elige dos conjuros de 3.er nivel de tu libro de conjuros. Siempre están preparados sin contar contra tu límite y puedes lanzar cada uno una vez a 3.er nivel sin gastar ranura de conjuro por descanso corto o largo.',
        countNeeded: 2,
        options: getWizardSignatureSpellOptions(),
        alreadyChosen: (existingDecisions['wizardSignatureSpells_20'] as string[]) || [],
      });
    }
  }

  return results;
}

// --------------------------------------------------------------------------
// 13.5 HELPER FUNCTION: GET ALL CLASS DECISIONS FOR CREATION
// --------------------------------------------------------------------------
export function getAllClassDecisionsForCreation(
  className: string,
  subclass: string | undefined,
  level: number,
  existingDecisions: Record<string, any> = {}
): PendingClassDecision[] {
  const all: PendingClassDecision[] = [];
  for (let lvl = 1; lvl <= level; lvl++) {
    const decs = getClassDecisionsForLevel(className, subclass, lvl - 1, lvl, existingDecisions);
    for (const d of decs) {
      const existing = all.find((x) => x.id === d.id);
      if (existing) {
        existing.countNeeded += d.countNeeded;
        if (d.options) {
          existing.options = d.options;
        }
      } else {
        all.push({ ...d, canSwap: false });
      }
    }
  }
  return all;
}

// --------------------------------------------------------------------------
// 14. HELPER FUNCTION: GET SPELLCASTING LEVEL UP RULES & TARGETS
// --------------------------------------------------------------------------
export function getSpellcastingLevelUpRules(
  className: string,
  currentLevel: number,
  newLevel: number,
  subclass?: string
): LevelUpSpellRules {
  const norm = (className || '').toLowerCase();
  const subNorm = (subclass || '').toLowerCase();

  // Wizard (Mago)
  if (norm.includes('mago') || norm.includes('wizard')) {
    const newCantrips = (newLevel === 4 || newLevel === 10) ? 1 : 0;
    return {
      newSpellsToLearn: 2, // Always 2 spells for spellbook in 5e!
      newCantripsToLearn: newCantrips,
      canSwapSpell: false, // Wizards don't swap, they add 2 permanent spells to book
      canUseCantripFormulas: newLevel >= 3, // Tasha's optional rule unlocked at level 3+!
      canUseCantripVersatility: false,
      explanation: `Regla Oficial 5e (Mago): En cada subida de nivel aprendes exactamente 2 nuevos conjuros para tu Libro de Conjuros (Grimorio) de forma gratuita. Además, a nivel 3+ cuentas con Fórmulas de Trucos para intercambiar trucos tras un descanso largo.`,
    };
  }

  // Sorcerer (Hechicero)
  if (norm.includes('hechicero') || norm.includes('sorcerer')) {
    const sorcSpellsKnown = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15];
    const diff = Math.max(0, (sorcSpellsKnown[newLevel] || 0) - (sorcSpellsKnown[currentLevel] || 0));
    const newCantrips = (newLevel === 4 || newLevel === 10) ? 1 : 0;
    return {
      newSpellsToLearn: diff,
      newCantripsToLearn: newCantrips,
      canSwapSpell: true,
      canUseCantripFormulas: false,
      canUseCantripVersatility: [4, 8, 12, 16, 19].includes(newLevel),
      explanation: `Regla Oficial 5e (Hechicero): Aprendes ${diff} nuevo(s) conjuro(s) conocido(s) según tu tabla de progresión. Puedes también reemplazar 1 conjuro conocido por otro de la lista de hechicero.`,
    };
  }

  // Bard (Bardo)
  if (norm.includes('bardo') || norm.includes('bard')) {
    const bardSpellsKnown = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22];
    let diff = Math.max(0, (bardSpellsKnown[newLevel] || 0) - (bardSpellsKnown[currentLevel] || 0));
    // At level 10, 14, 18, the 2 spells gained are the 2 Magical Secrets (handled through dedicated decision with all-class spells)
    if (newLevel === 10 || newLevel === 14 || newLevel === 18) {
      diff = 0;
    }
    const newCantrips = (newLevel === 4 || newLevel === 10) ? 1 : 0;
    return {
      newSpellsToLearn: diff,
      newCantripsToLearn: newCantrips,
      canSwapSpell: true,
      canUseCantripFormulas: false,
      canUseCantripVersatility: [4, 8, 12, 16, 19].includes(newLevel),
      explanation: `Regla Oficial 5e (Bardo): ${
        newLevel === 10 || newLevel === 14 || newLevel === 18
          ? 'A este nivel obtienes 2 Secretos Mágicos (Magical Secrets) de cualquier clase elegidos en la sección de decisiones tácticas.'
          : `Aprendes ${diff} nuevo(s) conjuro(s) de bardo.`
      } Puedes también reemplazar 1 conjuro conocido por otro.`,
    };
  }

  // Warlock (Brujo)
  if (norm.includes('brujo') || norm.includes('warlock')) {
    const warlockSpellsKnown = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
    const diff = Math.max(0, (warlockSpellsKnown[newLevel] || 0) - (warlockSpellsKnown[currentLevel] || 0));
    const newCantrips = (newLevel === 4 || newLevel === 10) ? 1 : 0;
    return {
      newSpellsToLearn: diff,
      newCantripsToLearn: newCantrips,
      canSwapSpell: true,
      canUseCantripFormulas: false,
      canUseCantripVersatility: [4, 8, 12, 16, 19].includes(newLevel),
      explanation: `Regla Oficial 5e (Brujo): Aprendes ${diff} nuevo(s) conjuro(s) conocido(s) de Magia del Pacto. Puedes reemplazar 1 conjuro conocido por otro.`,
    };
  }

  // Artificer (Artífice)
  if (norm.includes('artifice') || norm.includes('artífice')) {
    const newCantrips = (newLevel === 10 || newLevel === 14) ? 1 : 0;
    return {
      newSpellsToLearn: 0, // Prepared caster from entire list
      newCantripsToLearn: newCantrips,
      canSwapSpell: false,
      canUseCantripFormulas: false,
      canUseCantripVersatility: [4, 8, 12, 16, 19].includes(newLevel),
      explanation: `Regla Oficial 5e (Artífice): Preparas conjuros diariamente de toda la lista de artífice (Inteligencia + mitad de tu nivel). En la subida de nivel aprendes nuevas infusiones en la sección de decisiones tácticas.`,
    };
  }

  // Ranger (Explorador)
  if (norm.includes('explorador') || norm.includes('ranger')) {
    const rangerSpellsKnown = [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
    const diff = Math.max(0, (rangerSpellsKnown[newLevel] || 0) - (rangerSpellsKnown[currentLevel] || 0));
    return {
      newSpellsToLearn: diff,
      newCantripsToLearn: 0,
      canSwapSpell: true,
      canUseCantripFormulas: false,
      canUseCantripVersatility: false,
      explanation: `Regla Oficial 5e (Explorador): ${diff > 0 ? `Aprendes ${diff} nuevo(s) conjuro(s) de explorador.` : 'Mantienes tus conjuros conocidos.'} Puedes reemplazar 1 conjuro conocido por otro.`,
    };
  }

  // Cleric (Clérigo) & Druid (Druida)
  if (norm.includes('cler') || norm.includes('clérigo') || norm.includes('druid') || norm.includes('druida')) {
    const newCantrips = (newLevel === 4 || newLevel === 10) ? 1 : 0;
    return {
      newSpellsToLearn: 0, // Prepared casters with access to full list
      newCantripsToLearn: newCantrips,
      canSwapSpell: false,
      canUseCantripFormulas: false,
      canUseCantripVersatility: [4, 8, 12, 16, 19].includes(newLevel),
      explanation: `Regla Oficial 5e: Tienes acceso a toda la lista de conjuros divinos de tu clase de los niveles de ranura desbloqueados. Tu límite de preparación diaria aumenta automáticamente en +1 por este nivel.`,
    };
  }

  // Paladin (Paladín)
  if (norm.includes('palad')) {
    return {
      newSpellsToLearn: 0,
      newCantripsToLearn: 0,
      canSwapSpell: false,
      canUseCantripFormulas: false,
      canUseCantripVersatility: false,
      explanation: `Regla Oficial 5e: Tienes acceso a toda la lista de conjuros sagrados de paladín. Tu límite de preparación diaria aumenta con tu progresión.`,
    };
  }

  // Fighter (Eldritch Knight) or Rogue (Arcane Trickster)
  if (subNorm.includes('caballero arcano') || subNorm.includes('eldritch knight') || subNorm.includes('embaucador arcano') || subNorm.includes('arcane trickster')) {
    let diff = 0;
    let cantrips = 0;
    if (newLevel === 3) { diff = 3; cantrips = 2; }
    else if ([4, 7, 8, 10, 11, 13, 14, 16, 19, 20].includes(newLevel)) { diff = 1; }
    if (newLevel === 10) { cantrips = 1; }
    return {
      newSpellsToLearn: diff,
      newCantripsToLearn: cantrips,
      canSwapSpell: true,
      canUseCantripFormulas: false,
      canUseCantripVersatility: false,
      explanation: `Regla Oficial 5e (${subclass}): Aprendes ${diff} nuevo(s) conjuro(s) de mago de las escuelas permitidas.`,
    };
  }

  // Default fallback for non-casters or general casters
  return {
    newSpellsToLearn: 1,
    newCantripsToLearn: 0,
    canSwapSpell: false,
    canUseCantripFormulas: false,
    canUseCantripVersatility: false,
    explanation: 'Selecciona conjuros para agregar a tu repertorio.',
  };
}

