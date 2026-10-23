import { CharacterAttack, AbilityScores } from '../types';

export type WeaponCategory = 'simple-melee' | 'simple-ranged' | 'martial-melee' | 'martial-ranged';
export type ArmorCategory = 'light' | 'medium' | 'heavy' | 'shield';

export interface WeaponDef {
  id: string;
  name: string;
  nameEn: string;
  category: WeaponCategory;
  damageDice: string;
  damageType: 'Cortante' | 'Perforante' | 'Contundente';
  properties: string[];
  range: string;
  weight: string;
  cost: string;
  description: string;
}

export interface ArmorDef {
  id: string;
  name: string;
  nameEn: string;
  category: ArmorCategory;
  baseAc: number;
  dexBonus: 'full' | 'max2' | 'none';
  strengthReq: number;
  stealthDisadvantage: boolean;
  weight: string;
  cost: string;
  description: string;
}

export const ALL_5E_WEAPONS: WeaponDef[] = [
  // ==========================================
  // ARMAS SIMPLES CUERPO A CUERPO
  // ==========================================
  {
    id: 'baston',
    name: 'Bastón (Quarterstaff)',
    nameEn: 'Quarterstaff',
    category: 'simple-melee',
    damageDice: '1d6',
    damageType: 'Contundente',
    properties: ['Versátil (1d8)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '4 lb',
    cost: '2 pc',
    description: 'Vara de madera endurecida pulida, ideal para monjes, magos y aventureros prácticos.',
  },
  {
    id: 'daga',
    name: 'Daga (Dagger)',
    nameEn: 'Dagger',
    category: 'simple-melee',
    damageDice: '1d4',
    damageType: 'Perforante',
    properties: ['Sutil', 'Ligera', 'Arrojadiza (20/60 pies)'],
    range: 'Cuerpo a cuerpo o 20/60 pies',
    weight: '1 lb',
    cost: '2 po',
    description: 'Hoja corta y afilada fácil de ocultar en una bota o cinto. Permite usar Destreza o Fuerza.',
  },
  {
    id: 'garrote',
    name: 'Garrote (Club)',
    nameEn: 'Club',
    category: 'simple-melee',
    damageDice: '1d4',
    damageType: 'Contundente',
    properties: ['Ligera'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '1 pp',
    description: 'Maza de madera tosca y maciza, económica y accesible para cualquier plebeyo.',
  },
  {
    id: 'gran-garrote',
    name: 'Gran Garrote (Greatclub)',
    nameEn: 'Greatclub',
    category: 'simple-melee',
    damageDice: '1d8',
    damageType: 'Contundente',
    properties: ['A dos manos'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '10 lb',
    cost: '2 pp',
    description: 'Tronco pesado o bate reforzado que requiere empuñarse con ambas manos para asestar golpes contundentes.',
  },
  {
    id: 'hacha-de-mano',
    name: 'Hacha de Mano (Handaxe)',
    nameEn: 'Handaxe',
    category: 'simple-melee',
    damageDice: '1d6',
    damageType: 'Cortante',
    properties: ['Ligera', 'Arrojadiza (20/60 pies)'],
    range: 'Cuerpo a cuerpo o 20/60 pies',
    weight: '2 lb',
    cost: '5 po',
    description: 'Hacha compacta y equilibrada que puede lanzarse con gran potencia o blandirse en parejas.',
  },
  {
    id: 'hoz',
    name: 'Hoz (Sickle)',
    nameEn: 'Sickle',
    category: 'simple-melee',
    damageDice: '1d4',
    damageType: 'Cortante',
    properties: ['Ligera'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '1 po',
    description: 'Herramienta agrícola curvada adoptada a menudo por druidas para recolectar muérdago o defenderse.',
  },
  {
    id: 'jabalina',
    name: 'Jabalina (Javelin)',
    nameEn: 'Javelin',
    category: 'simple-melee',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Arrojadiza (30/120 pies)'],
    range: 'Cuerpo a cuerpo o 30/120 pies',
    weight: '2 lb',
    cost: '5 pp',
    description: 'Lanza delgada y aerodinámica diseñada para alcanzar objetivos a distancia antes del combate cuerpo a cuerpo.',
  },
  {
    id: 'lanza',
    name: 'Lanza (Spear)',
    nameEn: 'Spear',
    category: 'simple-melee',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Arrojadiza (20/60 pies)', 'Versátil (1d8)'],
    range: 'Cuerpo a cuerpo o 20/60 pies',
    weight: '3 lb',
    cost: '1 po',
    description: 'Una de las armas más antiguas del mundo: letal con una mano junto a un escudo o a dos manos.',
  },
  {
    id: 'martillo-ligero',
    name: 'Martillo Ligero (Light Hammer)',
    nameEn: 'Light Hammer',
    category: 'simple-melee',
    damageDice: '1d4',
    damageType: 'Contundente',
    properties: ['Ligera', 'Arrojadiza (20/60 pies)'],
    range: 'Cuerpo a cuerpo o 20/60 pies',
    weight: '2 lb',
    cost: '2 po',
    description: 'Herramienta de herrería forjada con precisión para golpear cráneos o arrojarse a la cabeza del enemigo.',
  },
  {
    id: 'maza',
    name: 'Maza (Mace)',
    nameEn: 'Mace',
    category: 'simple-melee',
    damageDice: '1d6',
    damageType: 'Contundente',
    properties: [],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '4 lb',
    cost: '5 po',
    description: 'Cabeza de hierro o bronce estriada montada sobre un asta reforzada, el arma predilecta de clérigos.',
  },

  // ==========================================
  // ARMAS SIMPLES A DISTANCIA
  // ==========================================
  {
    id: 'arco-corto',
    name: 'Arco Corto (Shortbow)',
    nameEn: 'Shortbow',
    category: 'simple-ranged',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Munición (80/320 pies)', 'A dos manos'],
    range: '80/320 pies',
    weight: '2 lb',
    cost: '25 po',
    description: 'Arco compacto y manejable para cacería o escaramuzas en bosques y pasillos estrechos.',
  },
  {
    id: 'ballesta-ligera',
    name: 'Ballesta Ligera (Light Crossbow)',
    nameEn: 'Light Crossbow',
    category: 'simple-ranged',
    damageDice: '1d8',
    damageType: 'Perforante',
    properties: ['Munición (80/320 pies)', 'Carga', 'A dos manos'],
    range: '80/320 pies',
    weight: '5 lb',
    cost: '25 po',
    description: 'Dispositivo mecánico de disparo certero impulsado por un resorte de acero con virotes punzantes.',
  },
  {
    id: 'dardo',
    name: 'Dardo (Dart)',
    nameEn: 'Dart',
    category: 'simple-ranged',
    damageDice: '1d4',
    damageType: 'Perforante',
    properties: ['Sutil', 'Arrojadiza (20/60 pies)'],
    range: '20/60 pies',
    weight: '1/4 lb',
    cost: '5 pc',
    description: 'Proyectil arrojadizo con aletas plumadas que aprovecha la agilidad del lanzador.',
  },
  {
    id: 'honda',
    name: 'Honda (Sling)',
    nameEn: 'Sling',
    category: 'simple-ranged',
    damageDice: '1d4',
    damageType: 'Contundente',
    properties: ['Munición (30/120 pies)'],
    range: '30/120 pies',
    weight: '0 lb',
    cost: '1 pp',
    description: 'Tira de cuero sencilla que lanza balines de plomo o guijarros a gran velocidad.',
  },

  // ==========================================
  // ARMAS MARCIALES CUERPO A CUERPO
  // ==========================================
  {
    id: 'alabarda',
    name: 'Alabarda (Halberd)',
    nameEn: 'Halberd',
    category: 'martial-melee',
    damageDice: '1d10',
    damageType: 'Cortante',
    properties: ['Pesada', 'Alcance (10 pies)', 'A dos manos'],
    range: 'Cuerpo a cuerpo (Alcance 10 pies)',
    weight: '6 lb',
    cost: '20 po',
    description: 'Asta larga rematada por una cabeza de hacha con púa superior y gancho. Mantiene a los enemigos a raya.',
  },
  {
    id: 'cimitarra',
    name: 'Cimitarra (Scimitar)',
    nameEn: 'Scimitar',
    category: 'martial-melee',
    damageDice: '1d6',
    damageType: 'Cortante',
    properties: ['Sutil', 'Ligera'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '3 lb',
    cost: '25 po',
    description: 'Espada curva oriental de un solo filo, rápida y letal para combate con dos armas y cortes fluidos.',
  },
  {
    id: 'espada-corta',
    name: 'Espada Corta (Shortsword)',
    nameEn: 'Shortsword',
    category: 'martial-melee',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Sutil', 'Ligera'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '10 po',
    description: 'Arma noble y ligera de estocada precisa, favorita de pícaros y duelistas acrobáticos.',
  },
  {
    id: 'espada-larga',
    name: 'Espada Larga (Longsword)',
    nameEn: 'Longsword',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Cortante',
    properties: ['Versátil (1d10)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '3 lb',
    cost: '15 po',
    description: 'El icono por excelencia de los caballeros: hoja recta de doble filo, utilizable a una mano (1d8) o dos manos (1d10).',
  },
  {
    id: 'espadon',
    name: 'Gran Espadón (Greatsword)',
    nameEn: 'Greatsword',
    category: 'martial-melee',
    damageDice: '2d6',
    damageType: 'Cortante',
    properties: ['Pesada', 'A dos manos'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '6 lb',
    cost: '50 po',
    description: 'Una colosal espada de mando y guerra de dos manos; inflige 2d6 de daño cortante masivo y constante.',
  },
  {
    id: 'estoque',
    name: 'Estoque (Rapier)',
    nameEn: 'Rapier',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Perforante',
    properties: ['Sutil'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '25 po',
    description: 'Espada esbelta y flexible con guarnición de cazoleta. El arma sutil más potente (1d8) para luchadores de Destreza.',
  },
  {
    id: 'gran-hacha',
    name: 'Gran Hacha (Greataxe)',
    nameEn: 'Greataxe',
    category: 'martial-melee',
    damageDice: '1d12',
    damageType: 'Cortante',
    properties: ['Pesada', 'A dos manos'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '7 lb',
    cost: '30 po',
    description: 'Una tremenda hacha bárbara de doble filo capaz de hendir escudos y decapitar bestias de un solo tajo (1d12).',
  },
  {
    id: 'gran-maza',
    name: 'Gran Maza (Maul)',
    nameEn: 'Maul',
    category: 'martial-melee',
    damageDice: '2d6',
    damageType: 'Contundente',
    properties: ['Pesada', 'A dos manos'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '10 lb',
    cost: '10 po',
    description: 'Pesado martillo de guerra a dos manos diseñado para machacar armaduras completas de placas como latas.',
  },
  {
    id: 'guja',
    name: 'Guja (Glaive)',
    nameEn: 'Glaive',
    category: 'martial-melee',
    damageDice: '1d10',
    damageType: 'Cortante',
    properties: ['Pesada', 'Alcance (10 pies)', 'A dos manos'],
    range: 'Cuerpo a cuerpo (Alcance 10 pies)',
    weight: '6 lb',
    cost: '20 po',
    description: 'Hoja curvada similar a una espada montada sobre un asta larga de fresno para golpear a 10 pies de distancia.',
  },
  {
    id: 'hacha-de-batalla',
    name: 'Hacha de Batalla (Battleaxe)',
    nameEn: 'Battleaxe',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Cortante',
    properties: ['Versátil (1d10)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '4 lb',
    cost: '10 po',
    description: 'Arma tradicional de la infantería enana; versátil, sólida y destructiva con una o dos manos.',
  },
  {
    id: 'lanza-caballeria',
    name: 'Lanza de Caballería (Lance)',
    nameEn: 'Lance',
    category: 'martial-melee',
    damageDice: '1d12',
    damageType: 'Perforante',
    properties: ['Alcance (10 pies)', 'Especial (Desventaja a 5 pies; a dos manos salvo a caballo)'],
    range: 'Cuerpo a cuerpo (Alcance 10 pies)',
    weight: '6 lb',
    cost: '10 po',
    description: 'Pesada lanza cónica de justa diseñada para cargas montadas arrolladoras.',
  },
  {
    id: 'latigo',
    name: 'Látigo (Whip)',
    nameEn: 'Whip',
    category: 'martial-melee',
    damageDice: '1d4',
    damageType: 'Cortante',
    properties: ['Sutil', 'Alcance (10 pies)'],
    range: 'Cuerpo a cuerpo (Alcance 10 pies)',
    weight: '3 lb',
    cost: '2 po',
    description: 'Tira de cuero trenzado que permite atacar a 10 pies de distancia empleando Destreza.',
  },
  {
    id: 'lucero-del-alba',
    name: 'Lucero del Alba (Morningstar)',
    nameEn: 'Morningstar',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Perforante',
    properties: [],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '4 lb',
    cost: '15 po',
    description: 'Bola de hierro erizada de púas cónicas que desgarra cotas de malla y carne con fuerza bruta.',
  },
  {
    id: 'martillo-de-guerra',
    name: 'Martillo de Guerra (Warhammer)',
    nameEn: 'Warhammer',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Contundente',
    properties: ['Versátil (1d10)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '15 po',
    description: 'Martillo marcial con cabeza de impacto y púa perforante posterior, eficaz contra cualquier armadura.',
  },
  {
    id: 'mayal',
    name: 'Mayal (Flail)',
    nameEn: 'Flail',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Contundente',
    properties: [],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '10 po',
    description: 'Bola con púas unida por una cadena de eslabones al mango para envolver escudos enemigos.',
  },
  {
    id: 'pica',
    name: 'Pica (Pike)',
    nameEn: 'Pike',
    category: 'martial-melee',
    damageDice: '1d10',
    damageType: 'Perforante',
    properties: ['Pesada', 'Alcance (10 pies)', 'A dos manos'],
    range: 'Cuerpo a cuerpo (Alcance 10 pies)',
    weight: '18 lb',
    cost: '5 po',
    description: 'Lanza muy larga de infantería pesada para frenar en seco cargas de caballería o monstruos.',
  },
  {
    id: 'pico-de-guerra',
    name: 'Pico de Guerra (War Pick)',
    nameEn: 'War Pick',
    category: 'martial-melee',
    damageDice: '1d8',
    damageType: 'Perforante',
    properties: [],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '5 po',
    description: 'Pico militar puntiagudo templado para penetrar y abrir corazas de hierro y acero.',
  },
  {
    id: 'tridente',
    name: 'Tridente (Trident)',
    nameEn: 'Trident',
    category: 'martial-melee',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Arrojadiza (20/60 pies)', 'Versátil (1d8)'],
    range: 'Cuerpo a cuerpo o 20/60 pies',
    weight: '4 lb',
    cost: '5 po',
    description: 'Lanza de tres puntas de gladiadores o pueblos marinos con púas diseñadas para trabar y ensartar.',
  },

  // ==========================================
  // ARMAS MARCIALES A DISTANCIA
  // ==========================================
  {
    id: 'arco-largo',
    name: 'Arco Largo (Longbow)',
    nameEn: 'Longbow',
    category: 'martial-ranged',
    damageDice: '1d8',
    damageType: 'Perforante',
    properties: ['Munición (150/600 pies)', 'Pesada', 'A dos manos'],
    range: '150/600 pies',
    weight: '2 lb',
    cost: '50 po',
    description: 'Arco de tejo de gran envergadura capaz de abatir objetivos a más de 180 metros con flechas pesadas.',
  },
  {
    id: 'ballesta-pesada',
    name: 'Ballesta Pesada (Heavy Crossbow)',
    nameEn: 'Heavy Crossbow',
    category: 'martial-ranged',
    damageDice: '1d10',
    damageType: 'Perforante',
    properties: ['Munición (100/400 pies)', 'Pesada', 'Carga', 'A dos manos'],
    range: '100/400 pies',
    weight: '18 lb',
    cost: '50 po',
    description: 'Imponente mecanismo de asedio personal con arco de acero templado de impacto brutal (1d10).',
  },
  {
    id: 'ballesta-de-mano',
    name: 'Ballesta de Mano (Hand Crossbow)',
    nameEn: 'Hand Crossbow',
    category: 'martial-ranged',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Munición (30/120 pies)', 'Ligera', 'Carga'],
    range: '30/120 pies',
    weight: '3 lb',
    cost: '75 po',
    description: 'Ballesta compacta de una sola mano, favorita de espías drow y tiradores de escaramuza.',
  },
  {
    id: 'cerbatana',
    name: 'Cerbatana (Blowgun)',
    nameEn: 'Blowgun',
    category: 'martial-ranged',
    damageDice: '1',
    damageType: 'Perforante',
    properties: ['Munición (25/100 pies)', 'Carga'],
    range: '25/100 pies',
    weight: '1 lb',
    cost: '10 po',
    description: 'Tubo de caña hueco para disparar dardos diminutos impregnados de veneno con total silencio.',
  },
  {
    id: 'red',
    name: 'Red de Combate (Net)',
    nameEn: 'Net',
    category: 'martial-ranged',
    damageDice: '0',
    damageType: 'Contundente',
    properties: ['Especial (Inmoviliza a criaturas Grandes o menores)', 'Arrojadiza (5/15 pies)'],
    range: '5/15 pies',
    weight: '3 lb',
    cost: '1 po',
    description: 'Red con plomos en los bordes para inmovilizar a un adversario en la arena o campo de batalla.',
  },

  // ==========================================
  // ARMAS SUPLEMENTARIAS Y EXÓTICAS (Eberron, Dragonlance, Reinos Olvidados & Manual del Armero)
  // ==========================================
  {
    id: 'cimitarra-doble-hoja',
    name: 'Cimitarra de Doble Hoja (Double-Bladed Scimitar)',
    nameEn: 'Double-Bladed Scimitar',
    category: 'martial-melee',
    damageDice: '2d4',
    damageType: 'Cortante',
    properties: ['A dos manos', 'Especial (Permite realizar un ataque cuerpo a cuerpo extra como acción adicional con la hoja opuesta que inflige 1d4 de daño cortante)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '6 lb',
    cost: '100 po',
    description: 'Arma tradicional de los elfos Valenar de Eberron. Ambas puntas del mango poseen hojas curvas afiladas.',
  },
  {
    id: 'hoopak',
    name: 'Hoopak Kender (Hoopak)',
    nameEn: 'Hoopak',
    category: 'martial-melee',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Sutil', 'A dos manos', 'Especial (Puede emplearse como honda a distancia arrojadiza 40/160 pies que inflige 1d4 de daño contundente)'],
    range: 'Cuerpo a cuerpo (5 pies) o 40/160 pies',
    weight: '2 lb',
    cost: '1 po',
    description: 'Asta clásica de los kenders de Dragonlance con una horquilla de honda en un extremo y una punta metálica en el otro.',
  },
  {
    id: 'yklwa',
    name: 'Yklwa Chultiana (Yklwa)',
    nameEn: 'Yklwa',
    category: 'simple-melee',
    damageDice: '1d8',
    damageType: 'Perforante',
    properties: ['Arrojadiza (10/30 pies)'],
    range: 'Cuerpo a cuerpo o 10/30 pies',
    weight: '2 lb',
    cost: '1 po',
    description: 'Lanza corta tradicional de los guerreros de Chult con una hoja ancha de acero de 18 pulgadas montada en un mango de madera dura.',
  },
  {
    id: 'bumaran',
    name: 'Búmeran Silvano (Boomerang)',
    nameEn: 'Boomerang',
    category: 'simple-ranged',
    damageDice: '1d4',
    damageType: 'Contundente',
    properties: ['Arrojadiza (60/120 pies)', 'Especial (Regresa a la mano del lanzador si el ataque falla)'],
    range: '60/120 pies',
    weight: '1 lb',
    cost: '1 po',
    description: 'Arma curvada de madera aerodinámica. En manos entrenadas regresa trazando un arco perfecto si no impacta al objetivo.',
  },
  {
    id: 'espada-bastarda',
    name: 'Espada Bastarda (Bastard Sword)',
    nameEn: 'Bastard Sword',
    category: 'martial-melee',
    damageDice: '1d10',
    damageType: 'Cortante',
    properties: ['Versátil (1d12)', 'Pesada (Requiere Fza 13)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '5 lb',
    cost: '35 po',
    description: 'Espada de mano y media del Manual del Armero. Ofrece la contundencia de un espadón pudiendo empuñarse a una mano con suficiente fuerza.',
  },
  {
    id: 'bracamarte',
    name: 'Bracamarte de Guerra (Falchion)',
    nameEn: 'Falchion',
    category: 'martial-melee',
    damageDice: '2d4',
    damageType: 'Cortante',
    properties: ['Sutil', 'A dos manos'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '4 lb',
    cost: '25 po',
    description: 'Espada curva pesada de un solo filo del Manual del Armero. Su centro de gravedad adelantado descarga tajos devastadores con fluidez marcial.',
  },
  {
    id: 'daga-parada',
    name: 'Daga de Parada / Main-Gauche (Parrying Dagger)',
    nameEn: 'Parrying Dagger',
    category: 'martial-melee',
    damageDice: '1d4',
    damageType: 'Perforante',
    properties: ['Sutil', 'Ligera', 'Defensiva (+1 a la CA mientras se empuñe junto a otra arma cuerpo a cuerpo)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '1 lb',
    cost: '15 po',
    description: 'Daga con cruceta reforzada y gavilanes curvados diseñada para desviar estocadas enemigas en duelos a dos manos.',
  },
  {
    id: 'guadana-guerra',
    name: 'Guadaña de Guerra (War Scythe)',
    nameEn: 'War Scythe',
    category: 'martial-melee',
    damageDice: '2d4',
    damageType: 'Cortante',
    properties: ['Pesada', 'A dos manos', 'Especial (Ventaja en pruebas para derribar adversarios)'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '5 lb',
    cost: '15 po',
    description: 'Hoja curvada cóncava sobre asta reforzada. Su diseño en gancho permite enganchar extremidades y derribar enemigos al suelo.',
  },
  {
    id: 'gran-lanza',
    name: 'Gran Lanza de Asedio (Greatspear)',
    nameEn: 'Greatspear',
    category: 'martial-melee',
    damageDice: '1d10',
    damageType: 'Perforante',
    properties: ['Pesada', 'Alcance (10 pies)', 'A dos manos'],
    range: 'Cuerpo a cuerpo (Alcance 10 pies)',
    weight: '7 lb',
    cost: '20 po',
    description: 'Lanza militar pesada de infantería de línea del Manual del Armero con punta acorazada para frenar cargas enemigas.',
  },
  {
    id: 'katar',
    name: 'Katar de Puño (Katar)',
    nameEn: 'Katar',
    category: 'martial-melee',
    damageDice: '1d6',
    damageType: 'Perforante',
    properties: ['Sutil', 'Ligera'],
    range: 'Cuerpo a cuerpo (5 pies)',
    weight: '2 lb',
    cost: '10 po',
    description: 'Daga de empuje con empuñadura en forma de H transversal. Transmite todo el peso del puñetazo en una perforación brutal.',
  },
  {
    id: 'pistola-renacentista',
    name: 'Pistola Renacentista (Pistol)',
    nameEn: 'Pistol',
    category: 'martial-ranged',
    damageDice: '1d10',
    damageType: 'Perforante',
    properties: ['Munición (30/90 pies)', 'Carga'],
    range: '30/90 pies',
    weight: '3 lb',
    cost: '250 po',
    description: 'Arma de fuego renacentista del Manual del Dungeon Master. Dispara balas de plomo con pólvora negra a corta distancia con tremenda potencia.',
  },
  {
    id: 'mosquete-renacentista',
    name: 'Mosquete Renacentista (Musket)',
    nameEn: 'Musket',
    category: 'martial-ranged',
    damageDice: '1d12',
    damageType: 'Perforante',
    properties: ['Munición (40/120 pies)', 'Carga', 'A dos manos'],
    range: '40/120 pies',
    weight: '10 lb',
    cost: '500 po',
    description: 'Cañón largo estriado del Manual del Dungeon Master que dispara proyectiles de plomo con alcance y perforación demoledores.',
  },
];

export const ALL_5E_ARMORS: ArmorDef[] = [
  // Ligeras
  {
    id: 'acolchada',
    name: 'Armadura Acolchada (Padded Armor)',
    nameEn: 'Padded',
    category: 'light',
    baseAc: 11,
    dexBonus: 'full',
    strengthReq: 0,
    stealthDisadvantage: true,
    weight: '8 lb',
    cost: '5 po',
    description: 'Capas de tela y lino acolchado; económica pero ruidosa al moverse.',
  },
  {
    id: 'cuero',
    name: 'Armadura de Cuero (Leather Armor)',
    nameEn: 'Leather',
    category: 'light',
    baseAc: 11,
    dexBonus: 'full',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '10 lb',
    cost: '10 po',
    description: 'Cuero curtido que protege sin entorpecer el sigilo. CA: 11 + Des.',
  },
  {
    id: 'cuero-tachonado',
    name: 'Cuero Tachonado (Studded Leather)',
    nameEn: 'Studded Leather',
    category: 'light',
    baseAc: 12,
    dexBonus: 'full',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '13 lb',
    cost: '45 po',
    description: 'La mejor armadura ligera: cuero flexible reforzado con remaches de acero. CA: 12 + Des.',
  },
  // Medias
  {
    id: 'pieles',
    name: 'Armadura de Pieles (Hide)',
    nameEn: 'Hide',
    category: 'medium',
    baseAc: 12,
    dexBonus: 'max2',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '12 lb',
    cost: '10 po',
    description: 'Capas gruesas de piel y pelaje de oso o lobo. CA: 12 + Des (máx 2).',
  },
  {
    id: 'camisote-malla',
    name: 'Camisote de Malla (Chain Shirt)',
    nameEn: 'Chain Shirt',
    category: 'medium',
    baseAc: 13,
    dexBonus: 'max2',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '20 lb',
    cost: '50 po',
    description: 'Cota de anillas entretejida que se viste discretamente bajo ropas. CA: 13 + Des (máx 2).',
  },
  {
    id: 'cota-escamas',
    name: 'Cota de Escamas (Scale Mail)',
    nameEn: 'Scale Mail',
    category: 'medium',
    baseAc: 14,
    dexBonus: 'max2',
    strengthReq: 0,
    stealthDisadvantage: true,
    weight: '45 lb',
    cost: '50 po',
    description: 'Escamas de metal superpuestas como las de un dragón o pez. CA: 14 + Des (máx 2).',
  },
  {
    id: 'coraza',
    name: 'Coraza de Acero (Breastplate)',
    nameEn: 'Breastplate',
    category: 'medium',
    baseAc: 14,
    dexBonus: 'max2',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '20 lb',
    cost: '400 po',
    description: 'Placa de acero sobre el pecho y espalda que ofrece sólida protección sin ruido. CA: 14 + Des (máx 2).',
  },
  {
    id: 'media-armadura',
    name: 'Media Armadura (Half Plate)',
    nameEn: 'Half Plate',
    category: 'medium',
    baseAc: 15,
    dexBonus: 'max2',
    strengthReq: 0,
    stealthDisadvantage: true,
    weight: '40 lb',
    cost: '750 po',
    description: 'La armadura media más protectora del juego. Placas de metal en casi todo el cuerpo. CA: 15 + Des (máx 2).',
  },
  // Pesadas
  {
    id: 'cota-anillas',
    name: 'Cota de Anillas (Ring Mail)',
    nameEn: 'Ring Mail',
    category: 'heavy',
    baseAc: 14,
    dexBonus: 'none',
    strengthReq: 0,
    stealthDisadvantage: true,
    weight: '40 lb',
    cost: '30 po',
    description: 'Anillas cosidas sobre cuero resistente. CA fija: 14.',
  },
  {
    id: 'cota-malla',
    name: 'Cota de Malla (Chain Mail)',
    nameEn: 'Chain Mail',
    category: 'heavy',
    baseAc: 16,
    dexBonus: 'none',
    strengthReq: 13,
    stealthDisadvantage: true,
    weight: '55 lb',
    cost: '75 po',
    description: 'Armadura pesada tradicional de anillas de acero entrelazadas. Requiere Fza 13. CA fija: 16.',
  },
  {
    id: 'bandas',
    name: 'Armadura de Bandas (Splint)',
    nameEn: 'Splint',
    category: 'heavy',
    baseAc: 17,
    dexBonus: 'none',
    strengthReq: 15,
    stealthDisadvantage: true,
    weight: '60 lb',
    cost: '200 po',
    description: 'Tiras verticales de acero remachadas sobre cuero con cota interior. Requiere Fza 15. CA fija: 17.',
  },
  {
    id: 'placas-completas',
    name: 'Armadura de Placas Completa (Plate)',
    nameEn: 'Plate',
    category: 'heavy',
    baseAc: 18,
    dexBonus: 'none',
    strengthReq: 15,
    stealthDisadvantage: true,
    weight: '65 lb',
    cost: '1500 po',
    description: 'La cúspide de la protección medieval: placas de acero anatómicas articuladas. Requiere Fza 15. CA fija: 18.',
  },
  // Escudo
  {
    id: 'escudo',
    name: 'Escudo (Shield)',
    nameEn: 'Shield',
    category: 'shield',
    baseAc: 2,
    dexBonus: 'none',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '6 lb',
    cost: '10 po',
    description: 'Escudo de madera o acero empuñado en una mano. Otorga un bono de +2 a la CA mientras esté equipado.',
  },

  // Armaduras y Escudos Suplementarios (SCAG & Manual del Armero)
  {
    id: 'armadura-puas',
    name: 'Armadura de Púas (Spiked Armor)',
    nameEn: 'Spiked Armor',
    category: 'medium',
    baseAc: 14,
    dexBonus: 'max2',
    strengthReq: 0,
    stealthDisadvantage: true,
    weight: '45 lb',
    cost: '75 po',
    description: 'Armadura media enana de cuero y placas erizadas de púas de acero (Costa de la Espada). Permite realizar ataques cuerpo a cuerpo con púas que infligen 1d4 de daño perforante.',
  },
  {
    id: 'paves-escudo-torre',
    name: 'Pavés / Escudo Torre (Tower Shield)',
    nameEn: 'Tower Shield',
    category: 'shield',
    baseAc: 3,
    dexBonus: 'none',
    strengthReq: 15,
    stealthDisadvantage: true,
    weight: '15 lb',
    cost: '30 po',
    description: 'Gran escudo rectangular de infantería pesada del Manual del Armero. Otorga +3 a la CA pero requiere Fuerza 15 e impone desventaja en pruebas de Sigilo.',
  },
  {
    id: 'broquel',
    name: 'Broquel Ligero (Buckler)',
    nameEn: 'Buckler',
    category: 'shield',
    baseAc: 1,
    dexBonus: 'none',
    strengthReq: 0,
    stealthDisadvantage: false,
    weight: '2 lb',
    cost: '8 po',
    description: 'Escudo pequeño y ágil de puño o antebrazo del Manual del Armero. Otorga +1 a la CA dejando la mano libre para sostener objetos pequeños o realizar componentes somáticos de conjuros.',
  },
];

// Helper: Find Weapon by name or partial string
export function findWeaponByName(query: string): WeaponDef | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();
  return (
    ALL_5E_WEAPONS.find(
      (w) =>
        w.name.toLowerCase() === q ||
        w.nameEn.toLowerCase() === q ||
        w.id === q ||
        q.includes(w.name.toLowerCase()) ||
        q.includes(w.nameEn.toLowerCase())
    ) ||
    ALL_5E_WEAPONS.find((w) => {
      const baseName = w.name.split('(')[0].trim().toLowerCase();
      return q.includes(baseName) || baseName.includes(q);
    })
  );
}

// Helper: Find Armor by name or partial string
export function findArmorByName(query: string): ArmorDef | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();

  // 1. Direct match on id, full name or English name
  const exact = ALL_5E_ARMORS.find(
    (a) =>
      a.id === q ||
      a.name.toLowerCase() === q ||
      a.nameEn.toLowerCase() === q ||
      q.includes(a.name.toLowerCase()) ||
      q.includes(a.nameEn.toLowerCase())
  );
  if (exact) return exact;

  // 2. Base name match (ignoring parenthetical English names)
  const baseMatch = ALL_5E_ARMORS.find((a) => {
    const baseName = a.name.split('(')[0].trim().toLowerCase();
    return q.includes(baseName) || baseName.includes(q);
  });
  if (baseMatch) return baseMatch;

  // 3. Synonym and keyword heuristic match for natural language Spanish/English gear
  if (q.includes('escama') || q.includes('scale')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'cota-escamas');
  }
  if (q.includes('cuero tachonado') || q.includes('studded')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'cuero-tachonado');
  }
  if (q.includes('cuero') || q.includes('leather')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'cuero');
  }
  if (q.includes('media armadura') || q.includes('half plate')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'media-armadura');
  }
  if (q.includes('coraza') || q.includes('breastplate')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'coraza');
  }
  if (q.includes('camisote') || q.includes('chain shirt')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'camisote-malla');
  }
  if (q.includes('cota de malla') || q.includes('chain mail') || q.includes('armadura de malla')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'cota-malla');
  }
  if (q.includes('anilla') || q.includes('ring mail')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'cota-anillas');
  }
  if (q.includes('banda') || q.includes('splint')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'bandas');
  }
  if (q.includes('placa') || q.includes('plate') || q.includes('arnés') || q.includes('arnes')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'placas-completas');
  }
  if (q.includes('piel') || q.includes('hide')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'pieles');
  }
  if (q.includes('acolchad') || q.includes('padded')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'acolchada');
  }
  if (q.includes('escudo') || q.includes('shield')) {
    return ALL_5E_ARMORS.find((a) => a.id === 'escudo');
  }

  return undefined;
}

// Helper: Generate attack from weapon
export function generateAttackFromWeapon(
  weapon: WeaponDef,
  stats: AbilityScores,
  profBonus: number,
  isProficient = true
): CharacterAttack {
  const strMod = Math.floor((stats.str - 10) / 2);
  const dexMod = Math.floor((stats.dex - 10) / 2);

  const isFinesse = weapon.properties.some((p) => p.toLowerCase().includes('sutil'));
  const isRanged = weapon.category.includes('ranged');

  let chosenMod = strMod;
  if (isRanged) {
    chosenMod = dexMod;
  } else if (isFinesse) {
    chosenMod = Math.max(strMod, dexMod);
  }

  const attackBonus = (isProficient ? profBonus : 0) + chosenMod;
  const bonusStr = attackBonus >= 0 ? `+${attackBonus}` : `${attackBonus}`;

  let damageStr = weapon.damageDice;
  if (chosenMod !== 0 && weapon.damageDice !== '0') {
    damageStr += chosenMod > 0 ? ` + ${chosenMod}` : ` - ${Math.abs(chosenMod)}`;
  }

  const propSummary = weapon.properties.length > 0 ? ` • ${weapon.properties.join(', ')}` : '';

  return {
    id: `attack-${weapon.id}-${Date.now().toString(36)}`,
    name: weapon.name.split('(')[0].trim(),
    bonus: bonusStr,
    damage: damageStr,
    type: `${weapon.damageType}${propSummary}`,
  };
}

// Helper: Cleanly parse damage type and properties from attack.type string
export function parseAttackTypeAndProps(rawType: string): { damageType: string; properties: string[] } {
  if (!rawType) return { damageType: 'Daño', properties: [] };
  let str = rawType.trim();
  while (str.startsWith('(') && str.endsWith(')')) {
    str = str.substring(1, str.length - 1).trim();
  }

  const parenIdx = str.indexOf('(');
  const bulletIdx = str.indexOf('•');

  let damageType = str;
  let propsPart = '';

  if (bulletIdx !== -1) {
    damageType = str.substring(0, bulletIdx).trim();
    propsPart = str.substring(bulletIdx + 1).trim();
  } else if (parenIdx !== -1) {
    damageType = str.substring(0, parenIdx).trim();
    propsPart = str.substring(parenIdx).trim();
  }

  const properties: string[] = [];
  if (propsPart) {
    let p = propsPart;
    if (p.startsWith('(') && p.endsWith(')')) {
      p = p.substring(1, p.length - 1);
    }
    p.split(/,(?![^(]*\))/).forEach((chunk) => {
      let cleanChunk = chunk.trim();
      while (cleanChunk.startsWith('(') && cleanChunk.endsWith(')')) {
        cleanChunk = cleanChunk.substring(1, cleanChunk.length - 1).trim();
      }
      if (cleanChunk) properties.push(cleanChunk);
    });
  }

  return {
    damageType: damageType || 'Daño',
    properties,
  };
}

// Helper: Calculate Armor Class based on equipped items list
export function calculateEquippedAc(params: {
  equippedItems: string[];
  stats: AbilityScores;
  characterClass?: string;
  subclass?: string;
  raceId?: string;
  fightingStyle?: string;
  hasDualWielderFeat?: boolean;
}): number {
  const { equippedItems, stats, characterClass = '', subclass = '', raceId = '', fightingStyle = '', hasDualWielderFeat = false } = params;
  const dexMod = Math.floor((stats.dex - 10) / 2);
  const conMod = Math.floor((stats.con - 10) / 2);
  const wisMod = Math.floor((stats.wis - 10) / 2);

  const dualWielderBonus = hasDualWielderFeat ? 1 : 0;
  const defenseBonus = fightingStyle.toLowerCase() === 'defensa' ? 1 : 0;

  // Natural armor races
  if (raceId.toLowerCase() === 'tortle') return 17 + dualWielderBonus + defenseBonus;
  if (raceId.toLowerCase() === 'loxodon') return 12 + conMod + dualWielderBonus + defenseBonus;

  // Look for equipped armor and shield
  let equippedArmor: ArmorDef | null = null;
  let hasShield = false;
  let equippedShieldAc = 0;
  let bonusAcFromMagic = 0;

  equippedItems.forEach((itemName) => {
    const itemLower = itemName.toLowerCase();

    // Check for magic rings/cloaks of protection (+1 AC)
    if (itemLower.includes('anillo de protección') || itemLower.includes('capa de protección')) {
      bonusAcFromMagic += 1;
    }
    if (itemLower.includes('+1 ca') || itemLower.includes('+1 a la ca')) {
      bonusAcFromMagic += 1;
    } else if (itemLower.includes('+2 ca') || itemLower.includes('+2 a la ca')) {
      bonusAcFromMagic += 2;
    }

    // Check for shield
    if (
      (itemLower.includes('escudo') ||
        itemLower.includes('shield') ||
        itemLower.includes('pavés') ||
        itemLower.includes('paves') ||
        itemLower.includes('broquel') ||
        itemLower.includes('buckler')) &&
      !itemLower.includes('hechizo') &&
      !itemLower.includes('conjuro') &&
      !itemLower.includes('maestro de escudos')
    ) {
      const shieldDef = findArmorByName(itemName);
      const shieldVal = shieldDef && shieldDef.category === 'shield' ? shieldDef.baseAc : 2;
      equippedShieldAc = Math.max(equippedShieldAc, shieldVal);
      hasShield = true;
      return;
    }

    // Check for armor
    const armor = findArmorByName(itemName);
    if (armor && armor.category !== 'shield') {
      if (!equippedArmor || armor.baseAc > equippedArmor.baseAc) {
        equippedArmor = armor;
      }
    }
  });

  const shieldAc = hasShield ? (equippedShieldAc > 0 ? equippedShieldAc : 2) : 0;

  // If armor is equipped:
  if (equippedArmor) {
    const armor = equippedArmor as ArmorDef;
    if (armor.category === 'heavy') {
      return armor.baseAc + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
    }
    if (armor.category === 'medium') {
      return armor.baseAc + Math.min(2, Math.max(0, dexMod)) + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
    }
    if (armor.category === 'light') {
      return armor.baseAc + Math.max(0, dexMod) + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
    }
  }

  // Unarmored Defense by class
  const cName = characterClass.toLowerCase();
  if (cName.includes('barb') || cName.includes('bárbaro')) {
    return 10 + dexMod + conMod + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
  }
  if (cName.includes('monk') || cName.includes('monje')) {
    // Monks only get unarmored defense if NOT wearing shield (PHB p.78)
    if (hasShield) {
      return 10 + dexMod + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
    }
    return 10 + dexMod + wisMod + dualWielderBonus + bonusAcFromMagic;
  }
  if (cName.includes('pugilist') || cName.includes('boxer')) {
    return 13 + conMod + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
  }

  // Linaje Dracónico (Draconic Bloodline - Resiliencia Dracónica: CA 13 + Des sin armadura)
  const isSorcerer = cName.includes('hechicero') || cName.includes('sorcerer');
  const subName = (subclass || '').toLowerCase();
  const isDraconic = subName.includes('drac') || subName.includes('dragón') || subName.includes('dragon');
  if (isSorcerer && isDraconic) {
    return 13 + dexMod + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
  }

  // Standard unarmored
  return 10 + dexMod + shieldAc + dualWielderBonus + defenseBonus + bonusAcFromMagic;
}

// Helper: Determine if an item is an equipable piece of gear (weapon, armor, shield, wearable magic item)
export function isItemEquipable(itemName: string): boolean {
  if (!itemName) return false;
  const q = itemName.trim().toLowerCase();

  // Known non-equipable items (bedrolls, rations, kits, common adventurer goods, tools, instruments)
  const nonEquipablePatterns = [
    'saco de dormir', 'bolsa de dormir', 'bedroll', 'raciones', 'rations', 'antorcha', 'torch',
    'cuerda', 'rope', 'odre', 'waterskin', 'yesca', 'tinderbox', 'mochila', 'backpack',
    'manta', 'blanket', 'poción', 'pocion', 'potion', 'pergamino', 'scroll', 'kit de',
    'herramientas de', 'herramienta de', 'tools', 'linterna', 'lantern', 'aceite', 'oil',
    'pluma', 'tinta', 'tintero', 'candado', 'cerradura', 'manillas', 'espejo', 'mirror',
    'reloj de arena', 'reloj', 'cadena', 'chain', 'abrojos', 'caltrops', 'rodamientos',
    'gancho', 'grappling hook', 'palanca', 'crowbar', 'pala', 'shovel', 'piqueta', 'pick',
    'tienda de campaña', 'tienda', 'tent', 'caja de', 'cofre', 'chest', 'frasco', 'vial',
    'botella', 'bottle', 'jarra', 'jug', 'tiza', 'chalk', 'vela', 'candle', 'jabón', 'jabon',
    'soap', 'saco', 'sack', 'bolsa', 'pouch', 'monedero', 'carta', 'letter', 'mechón', 'lock of hair',
    'baraja', 'cartas de juego', 'dados', 'dice', 'favor de un admirador', 'trinket', 'baratija',
    'disfraz', 'vestimenta', 'muda de ropa', 'ropa común', 'ropa fina', 'ropa de viajero',
    'vestimentas litúrgicas', 'símbolo sagrado', 'incienso', 'libro de oraciones',
    'instrumento', 'laúd', 'flauta', 'tambor', 'lira', 'gaita', 'dulcimer', 'cuerno', 'viola',
    'zampoña', 'chalumeau', 'campanillas'
  ];

  // If matches a non-equipable pattern and is NOT explicitly an official weapon/armor
  if (nonEquipablePatterns.some((pattern) => q.includes(pattern))) {
    const isW = !!findWeaponByName(itemName);
    const isA = !!findArmorByName(itemName);
    if (!isW && !isA) {
      return false;
    }
  }

  // 1. Check official weapons
  if (findWeaponByName(itemName)) {
    return true;
  }

  // 2. Check official armors or shields
  if (findArmorByName(itemName)) {
    return true;
  }

  // 3. Check general weapon or armor keywords
  const equipableKeywords = [
    'espada', 'daga', 'hacha', 'lanza', 'arco', 'ballesta', 'maza', 'martillo de guerra',
    'mandoble', 'espadón', 'alabarda', 'guja', 'tridente', 'cimitarra', 'estoque', 'maza de armas',
    'mayal', 'pica', 'gran clava', 'garrote', 'hondera', 'honda', 'dardo', 'red de combate',
    'armadura', 'cota de malla', 'cota de escamas', 'placas', 'cuero', 'pieles', 'cuero tachonado',
    'camisote de malla', 'coraza', 'media armadura', 'acolchada', 'bandada', 'escudo', 'shield',
    'anillo', 'amuleto', 'capa', 'brazales', 'botas', 'guanteletes', 'yelmo', 'collar',
    'cinto', 'cinturón', 'diadema', 'tiara'
  ];

  return equipableKeywords.some((kw) => q.includes(kw));
}

