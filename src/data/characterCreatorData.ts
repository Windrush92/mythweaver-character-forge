import { CharacterAttack } from '../types';

export interface SkillDefinition {
  name: string;
  ability: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  abilityLabel: string;
  description: string;
}

export const ALL_5E_SKILLS: SkillDefinition[] = [
  {
    name: 'Acrobacias',
    ability: 'dex',
    abilityLabel: 'Destreza',
    description: 'Mantener el equilibrio sobre superficies estrechas, acrobacias aéreas, escapar de presas y aterrizar sobre tus pies tras una caída.',
  },
  {
    name: 'Atletismo',
    ability: 'str',
    abilityLabel: 'Fuerza',
    description: 'Escalar acantilados escarpados, nadar contra corrientes impetuosas, saltar largas distancias y forcejear para derribar o agarrar rivales.',
  },
  {
    name: 'Conocimiento Arcano',
    ability: 'int',
    abilityLabel: 'Inteligencia',
    description: 'Recordar saberes sobre conjuros, símbolos mágicos, tradiciones arcanas, los planos de existencia y las criaturas que los habitan.',
  },
  {
    name: 'Engaño',
    ability: 'cha',
    abilityLabel: 'Carisma',
    description: 'Ocultar la verdad mediante mentiras convincentes, juegos de palabras engañosos, disfraces, fintas verbales y estafas.',
  },
  {
    name: 'Historia',
    ability: 'int',
    abilityLabel: 'Inteligencia',
    description: 'Recordar sucesos históricos, guerras pasadas, dinastías legendarias, descubrimientos antiguos y la caída de grandes imperios.',
  },
  {
    name: 'Interpretación',
    ability: 'cha',
    abilityLabel: 'Carisma',
    description: 'Deleitar al público con música, canto, danza, declamación poética o dramaturgia teatral que cautiva a los espectadores.',
  },
  {
    name: 'Intimidación',
    ability: 'cha',
    abilityLabel: 'Carisma',
    description: 'Influir en los demás mediante amenazas implícitas o explícitas, presencia física imponente, coacción y miradas aterradoras.',
  },
  {
    name: 'Investigación',
    ability: 'int',
    abilityLabel: 'Inteligencia',
    description: 'Deducir la ubicación de pasajes secretos, analizar pistas sutiles en una escena, descifrar enigmas o encontrar libros clave en archivos.',
  },
  {
    name: 'Juego de Manos',
    ability: 'dex',
    abilityLabel: 'Destreza',
    description: 'Robar bolsas de monedas al paso, deslizar objetos en bolsillos ajenos, ocultar armas pequeñas y manipular mecanismos con sigilo manual.',
  },
  {
    name: 'Medicina',
    ability: 'wis',
    abilityLabel: 'Sabiduría',
    description: 'Estabilizar a compañeros moribundos, diagnosticar enfermedades exóticas, tratar heridas de combate e identificar causas de muerte.',
  },
  {
    name: 'Naturaleza',
    ability: 'int',
    abilityLabel: 'Inteligencia',
    description: 'Conocimiento sobre flora, fauna, ciclos climáticos, terreno salvaje, venenos naturales y el comportamiento de criaturas silvestres.',
  },
  {
    name: 'Percepción',
    ability: 'wis',
    abilityLabel: 'Sabiduría',
    description: 'Agudeza de tus sentidos para avistar emboscadas ocultas, escuchar susurros tras una puerta cerrada o sentir el aroma de humo lejano.',
  },
  {
    name: 'Perspicacia',
    ability: 'wis',
    abilityLabel: 'Sabiduría',
    description: 'Leer el lenguaje corporal y tono de voz ajeno para intuir intenciones reales, detectar mentiras y anticipar movimientos.',
  },
  {
    name: 'Persuasión',
    ability: 'cha',
    abilityLabel: 'Carisma',
    description: 'Convencer a otros con cortesía, diplomacia, argumentos sólidos, labia encantadora y tacto social en audiencias o tabernas.',
  },
  {
    name: 'Religión',
    ability: 'int',
    abilityLabel: 'Inteligencia',
    description: 'Recordar dogmas sagrados, deidades benévolas u oscuras, ritos litúrgicos, jerarquías eclesiásticas y símbolos de poder divino.',
  },
  {
    name: 'Sigilo',
    ability: 'dex',
    abilityLabel: 'Destreza',
    description: 'Moverse en silencio absoluto, camuflarse en las sombras y pasar desapercibido ante guardias, centinelas y monstruos al acecho.',
  },
  {
    name: 'Supervivencia',
    ability: 'wis',
    abilityLabel: 'Sabiduría',
    description: 'Rastrear huellas en terreno agreste, orientarse en la espesura, cazar presas, evitar peligros naturales y predecir el clima.',
  },
  {
    name: 'Trato con Animales',
    ability: 'wis',
    abilityLabel: 'Sabiduría',
    description: 'Calmar bestias salvajes, controlar monturas asustadas, adiestrar sabuesos e intuir el estado de ánimo de los animales.',
  },
];

export interface ClassSkillConfig {
  count: number;
  availableSkills: string[];
  defaultAttacks: CharacterAttack[];
  recommendedPrimaryStats: ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha')[];
  roleSummary: string;
}

export const CLASS_SKILL_CONFIGS: Record<string, ClassSkillConfig> = {
  barbaro: {
    count: 2,
    availableSkills: ['Atletismo', 'Intimidación', 'Naturaleza', 'Percepción', 'Supervivencia', 'Trato con Animales'],
    recommendedPrimaryStats: ['str', 'con', 'dex'],
    roleSummary: 'Coloso imparable de combate cuerpo a cuerpo. Su furia absorbe castigo mientras devasta enemigos con armas pesadas.',
    defaultAttacks: [
      { id: 'att-b1', name: 'Gran Hacha', bonus: '+5', damage: '1d12+3', type: 'Cortante' },
      { id: 'att-b2', name: 'Jabalina', bonus: '+5', damage: '1d6+3', type: 'Perforante' },
    ],
  },
  bardo: {
    count: 3,
    availableSkills: ALL_5E_SKILLS.map((s) => s.name),
    recommendedPrimaryStats: ['cha', 'dex', 'con'],
    roleSummary: 'Virtuoso carismático que manipula el combate con magia de apoyo, inspiración para aliados y versatilidad total.',
    defaultAttacks: [
      { id: 'att-bd1', name: 'Estoques (Ropera)', bonus: '+5', damage: '1d8+3', type: 'Perforante' },
      { id: 'att-bd2', name: 'Daga Oculta', bonus: '+5', damage: '1d4+3', type: 'Perforante' },
    ],
  },
  clerigo: {
    count: 2,
    availableSkills: ['Historia', 'Medicina', 'Perspicacia', 'Persuasión', 'Religión'],
    recommendedPrimaryStats: ['wis', 'con', 'str'],
    roleSummary: 'Portador de la bendición sagrada. Conjura milagros de sanación y castigo radiante mientras viste armaduras protectoras.',
    defaultAttacks: [
      { id: 'att-c1', name: 'Maza Sagrada', bonus: '+4', damage: '1d6+2', type: 'Contundente' },
      { id: 'att-c2', name: 'Llama Sagrada (Cantrip)', bonus: 'CD 13', damage: '1d8', type: 'Radiante' },
    ],
  },
  druida: {
    count: 2,
    availableSkills: ['Conocimiento Arcano', 'Medicina', 'Naturaleza', 'Percepción', 'Perspicacia', 'Religión', 'Supervivencia', 'Trato con Animales'],
    recommendedPrimaryStats: ['wis', 'con', 'dex'],
    roleSummary: 'Guardián del equilibrio primigenio. Domina las tempestades de la naturaleza y adopta formas de bestias feroces.',
    defaultAttacks: [
      { id: 'att-d1', name: 'Garrote de Madera (Shillelagh)', bonus: '+5', damage: '1d8+3', type: 'Contundente Mágico' },
      { id: 'att-d2', name: 'Látigo de Espinas', bonus: '+5', damage: '1d6', type: 'Perforante' },
    ],
  },
  guerrero: {
    count: 2,
    availableSkills: ['Acrobacias', 'Atletismo', 'Historia', 'Intimidación', 'Percepción', 'Perspicacia', 'Supervivencia'],
    recommendedPrimaryStats: ['str', 'con', 'dex'],
    roleSummary: 'Maestro indiscutido de las armas y la táctica bélica. Se adapta a cualquier armadura y domina la línea del frente.',
    defaultAttacks: [
      { id: 'att-g1', name: 'Espada Larga', bonus: '+5', damage: '1d8+3', type: 'Cortante' },
      { id: 'att-g2', name: 'Arco Largo', bonus: '+5', damage: '1d8+3', type: 'Perforante' },
    ],
  },
  monje: {
    count: 2,
    availableSkills: ['Acrobacias', 'Atletismo', 'Historia', 'Perspicacia', 'Religión', 'Sigilo'],
    recommendedPrimaryStats: ['dex', 'wis', 'con'],
    roleSummary: 'Artista marcial veloz como el rayo. Canaliza la energía Ki en ráfagas de puñetazos letales y fintas acrobáticas.',
    defaultAttacks: [
      { id: 'att-m1', name: 'Ataque Desarmado (Artes Marciales)', bonus: '+5', damage: '1d4+3', type: 'Contundente' },
      { id: 'att-m2', name: 'Bastón Monacal', bonus: '+5', damage: '1d8+3', type: 'Contundente' },
    ],
  },
  paladin: {
    count: 2,
    availableSkills: ['Atletismo', 'Intimidación', 'Medicina', 'Perspicacia', 'Persuasión', 'Religión'],
    recommendedPrimaryStats: ['str', 'cha', 'con'],
    roleSummary: 'Guerrero juramentado a una causa inquebrantable. Descarga Castigos Divinos demoledores y proyecta auras de protección.',
    defaultAttacks: [
      { id: 'att-p1', name: 'Espadón (Dos Manos)', bonus: '+5', damage: '2d6+3', type: 'Cortante' },
      { id: 'att-p2', name: 'Lanza de Jinete', bonus: '+5', damage: '1d12+3', type: 'Perforante' },
    ],
  },
  explorador: {
    count: 3,
    availableSkills: ['Atletismo', 'Investigación', 'Naturaleza', 'Percepción', 'Perspicacia', 'Sigilo', 'Supervivencia', 'Trato con Animales'],
    recommendedPrimaryStats: ['dex', 'wis', 'con'],
    roleSummary: 'Cazador letal en tierras salvajes. Experto en rastreo, arquería de precisión y magia sigilosa del bosque.',
    defaultAttacks: [
      { id: 'att-e1', name: 'Arco Largo', bonus: '+6', damage: '1d8+3', type: 'Perforante' },
      { id: 'att-e2', name: 'Espadas Cortas Gemelas', bonus: '+5', damage: '1d6+3', type: 'Perforante' },
    ],
  },
  picaro: {
    count: 4,
    availableSkills: ['Acrobacias', 'Atletismo', 'Engaño', 'Intimidación', 'Investigación', 'Juego de Manos', 'Percepción', 'Perspicacia', 'Persuasión', 'Sigilo'],
    recommendedPrimaryStats: ['dex', 'con', 'cha'],
    roleSummary: 'Especialista en emboscadas, trampas y subterfugio. Inflige un catastrófico Ataque Furtivo cuando el enemigo baja la guardia.',
    defaultAttacks: [
      { id: 'att-pi1', name: 'Estoque Furtivo', bonus: '+5', damage: '1d8+3 + 1d6', type: 'Perforante' },
      { id: 'att-pi2', name: 'Ballesta de Mano', bonus: '+5', damage: '1d6+3', type: 'Perforante' },
    ],
  },
  hechicero: {
    count: 2,
    availableSkills: ['Conocimiento Arcano', 'Engaño', 'Intimidación', 'Perspicacia', 'Persuasión', 'Religión'],
    recommendedPrimaryStats: ['cha', 'con', 'dex'],
    roleSummary: 'Conjurador innato con magia pura en las venas. Moldea la esencia de los conjuros con el poder de su Metamagia.',
    defaultAttacks: [
      { id: 'att-h1', name: 'Descarga de Fuego (Fire Bolt)', bonus: '+5', damage: '1d10', type: 'Fuego' },
      { id: 'att-h2', name: 'Daga Ritual', bonus: '+4', damage: '1d4+2', type: 'Perforante' },
    ],
  },
  brujo: {
    count: 2,
    availableSkills: ['Conocimiento Arcano', 'Engaño', 'Historia', 'Intimidación', 'Investigación', 'Naturaleza', 'Religión'],
    recommendedPrimaryStats: ['cha', 'con', 'dex'],
    roleSummary: 'Pactante con entidades del más allá. Dispara devastadoras Descargas Místicas y recarga su magia en descansos breves.',
    defaultAttacks: [
      { id: 'att-w1', name: 'Descarga Mística (Eldritch Blast)', bonus: '+5', damage: '1d10', type: 'Fuerza' },
      { id: 'att-w2', name: 'Espada de Pacto', bonus: '+5', damage: '1d8+3', type: 'Cortante Mágico' },
    ],
  },
  mago: {
    count: 2,
    availableSkills: ['Conocimiento Arcano', 'Historia', 'Investigación', 'Medicina', 'Perspicacia', 'Religión'],
    recommendedPrimaryStats: ['int', 'con', 'dex'],
    roleSummary: 'Erudito de las artes arcanas universales. Posee el repertorio de conjuros más vasto y adaptable de todos los mundos.',
    defaultAttacks: [
      { id: 'att-mg1', name: 'Rayo de Escarcha (Ray of Frost)', bonus: '+5', damage: '1d8', type: 'Frío' },
      { id: 'att-mg2', name: 'Dardo / Honda', bonus: '+4', damage: '1d4+2', type: 'Perforante' },
    ],
  },
  artifice: {
    count: 2,
    availableSkills: ['Conocimiento Arcano', 'Historia', 'Investigación', 'Medicina', 'Naturaleza', 'Percepción', 'Juego de Manos'],
    recommendedPrimaryStats: ['int', 'con', 'dex'],
    roleSummary: 'Inventor e infundidor de ingenios mágicos. Transforma herramientas cotidianas en artefactos prodigiosos.',
    defaultAttacks: [
      { id: 'att-art1', name: 'Ballesta Ligera Infundida', bonus: '+5', damage: '1d8+3', type: 'Perforante Mágico' },
      { id: 'att-art2', name: 'Fogonazo Mágico', bonus: '+5', damage: '1d8', type: 'Fuego' },
    ],
  },
  pugilista: {
    count: 2,
    availableSkills: ['Acrobacias', 'Atletismo', 'Engaño', 'Intimidación', 'Percepción', 'Sigilo'],
    recommendedPrimaryStats: ['str', 'con', 'dex'],
    roleSummary: 'Luchador callejero forjado a golpes. Genera Puntos de Flujo en el fragor de la pelea para desatar ganchos demoledores.',
    defaultAttacks: [
      { id: 'att-pug1', name: 'Jab & Gancho Desarmado', bonus: '+5', damage: '1d6+3', type: 'Contundente' },
      { id: 'att-pug2', name: 'Improvisada / Porra de Pelea', bonus: '+5', damage: '1d6+3', type: 'Contundente' },
    ],
  },
};

export interface FightingStyleOption {
  id: string;
  name: string;
  shortDesc: string;
  detailedDesc: string;
  icon: string;
  allowedClasses: string[];
}

export const FIGHTING_STYLE_OPTIONS: FightingStyleOption[] = [
  {
    id: 'defensa',
    name: 'Defensa (Defense)',
    icon: '🛡️',
    shortDesc: '+1 a tu Clase de Armadura mientras vistas armadura.',
    detailedDesc: 'Excelente para cualquier personaje que quiera sobrevivir más turnos en primera línea de combate.',
    allowedClasses: ['guerrero', 'paladin', 'explorador'],
  },
  {
    id: 'duelo',
    name: 'Duelo (Dueling)',
    icon: '⚔️',
    shortDesc: '+2 al daño cuando empuñas un arma a una mano y ninguna otra.',
    detailedDesc: 'Ideal si usas espada y escudo o florete, garantizando daño constante en cada estocada.',
    allowedClasses: ['guerrero', 'paladin', 'explorador'],
  },
  {
    id: 'gran-arma',
    name: 'Gran Arma (Great Weapon Fighting)',
    icon: '🪓',
    shortDesc: 'Repite tiradas de 1 y 2 en el dado de daño con armas a dos manos.',
    detailedDesc: 'Brutal para espadones, hachas de batalla y alabardas, maximizando tu daño por golpe.',
    allowedClasses: ['guerrero', 'paladin'],
  },
  {
    id: 'tiro-arco',
    name: 'Tiro con Arco (Archery)',
    icon: '🏹',
    shortDesc: '+2 a las tiradas de ataque con armas a distancia.',
    detailedDesc: 'El mejor estilo para arqueros y tiradores de ballesta, asegurando que casi nunca falles un disparo.',
    allowedClasses: ['guerrero', 'explorador'],
  },
  {
    id: 'dos-armas',
    name: 'Combate con Dos Armas (Two-Weapon Fighting)',
    icon: '🗡️🗡️',
    shortDesc: 'Suma tu bonificador de característica al daño del ataque de acción adicional.',
    detailedDesc: 'Vital si peleas con dos espadas cortas, cimitarras o hachas de mano al mismo tiempo.',
    allowedClasses: ['guerrero', 'explorador'],
  },
  {
    id: 'proteccion',
    name: 'Protección (Protection)',
    icon: '🔰',
    shortDesc: 'Reacción con escudo para imponer desventaja a ataques contra aliados a 5 pies.',
    detailedDesc: 'El estilo altruista por excelencia: cuida a tus magos y pícaros de golpes críticos.',
    allowedClasses: ['guerrero', 'paladin'],
  },
  {
    id: 'desarmado',
    name: 'Combate Desarmado (Unarmed Fighting)',
    icon: '🥊',
    shortDesc: 'Tus ataques desarmados infligen 1d6+Fue (o 1d8 sin armas ni escudo).',
    detailedDesc: 'Permite noquear contrincantes a mano limpia y causar 1d4 de daño gratis al inicio de tu turno a criaturas que estés apresando.',
    allowedClasses: ['guerrero', 'paladin'],
  },
];

export interface AlignmentOption {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

export const ALIGNMENT_OPTIONS: AlignmentOption[] = [
  {
    id: 'LB',
    name: 'Legal Bueno (Lawful Good)',
    tagline: 'El Cruzado',
    description: 'Actúa según la ley, la compasión, el orden y el honor. Cree que una sociedad ordenada es la mejor forma de proteger a los inocentes.',
  },
  {
    id: 'NB',
    name: 'Neutral Bueno (Neutral Good)',
    tagline: 'El Bienhechor',
    description: 'Hace lo correcto por simple bondad sin sentirse atado a las órdenes de los gobernantes ni en rebelión abierta contra ellos.',
  },
  {
    id: 'CB',
    name: 'Caótico Bueno (Chaotic Good)',
    tagline: 'El Rebelde Libertario',
    description: 'Sigue su propia brújula moral con un corazón noble. Detesta la tiranía, las reglas opresivas y las burocracias injustas.',
  },
  {
    id: 'LN',
    name: 'Legal Neutral (Lawful Neutral)',
    tagline: 'El Juez',
    description: 'La ley, la tradición y los juramentos personales están por encima de la compasión o el capricho. Cumple la palabra dada sin vacilar.',
  },
  {
    id: 'N',
    name: 'Neutral Auténtico (True Neutral)',
    tagline: 'El Indiferente o Filósofo',
    description: 'Prefiere mantenerse al margen de los dilemas morales o busca preservar el equilibrio cósmico de las fuerzas de la naturaleza.',
  },
  {
    id: 'CN',
    name: 'Caótico Neutral (Chaotic Neutral)',
    tagline: 'El Espíritu Libre',
    description: 'Valora su propia libertad personal ante todo. Es impredecible y no se compromete fácilmente con causas ajenas.',
  },
  {
    id: 'LM',
    name: 'Legal Malvado (Lawful Evil)',
    tagline: 'El Tirano',
    description: 'Utiliza el código legal, los contratos y la jerarquía para subyugar a los demás y acumular poder calculadoramente.',
  },
  {
    id: 'NM',
    name: 'Neutral Malvado (Neutral Evil)',
    tagline: 'El Egoísta Despiadado',
    description: 'Hace lo que sea necesario para conseguir lo que desea sin remordimientos, traicionando a quien haga falta por beneficio propio.',
  },
  {
    id: 'CM',
    name: 'Caótico Malvado (Chaotic Evil)',
    tagline: 'El Destructor',
    description: 'Guiado por la codicia, el odio y la violencia despiadada. Disfruta sembrando caos y sufrimiento en el mundo.',
  },
];

export interface AbilityScoreExplanation {
  code: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  name: string;
  abbreviation: string;
  icon: string;
  description: string;
  combatRole: string;
  vitalForClasses: string[];
}

export const ABILITY_SCORE_EXPLANATIONS: Record<string, AbilityScoreExplanation> = {
  str: {
    code: 'str',
    name: 'Fuerza',
    abbreviation: 'FUE',
    icon: '💪',
    description: 'Potencia muscular natural, atletismo, capacidad de levantar objetos pesados y romper puertas a patadas.',
    combatRole: 'Determina tu bonificador de ataque y daño con armas cuerpo a cuerpo y la tirada de la habilidad Atletismo.',
    vitalForClasses: ['Bárbaro', 'Guerrero', 'Paladín', 'Pugilista'],
  },
  dex: {
    code: 'dex',
    name: 'Destreza',
    abbreviation: 'DES',
    icon: '🏹',
    description: 'Agilidad física, reflejos felinos, rapidez de pies, puntería fina y sentido del equilibrio.',
    combatRole: 'Aumenta tu Clase de Armadura (CA), tu Iniciativa en combate y tu ataque/daño con armas sutiles (Finesse) y a distancia.',
    vitalForClasses: ['Pícaro', 'Monje', 'Explorador', 'Bardo'],
  },
  con: {
    code: 'con',
    name: 'Constitución',
    abbreviation: 'CON',
    icon: '🛡️',
    description: 'Salud vital, aguante inmunológico, resistencia a venenos y dolor, y capacidad pulmonar.',
    combatRole: 'Suma puntos de golpe (PG/HP) adicionales en cada nivel y protege tu concentración al recibir daño mientras mantienes conjuros.',
    vitalForClasses: ['¡Todas las clases!', 'Especialmente lanzadores que usan concentración y combatientes en primera línea'],
  },
  int: {
    code: 'int',
    name: 'Inteligencia',
    abbreviation: 'INT',
    icon: '🧠',
    description: 'Agudeza mental, razonamiento deductivo, memoria enciclopédica y comprensión teórica de la magia.',
    combatRole: 'Atributo de conjuración del Mago y Artífice (CD de salvación y ataque de conjuro), e influye en Arcanos, Historia e Investigación.',
    vitalForClasses: ['Mago', 'Artífice', 'Caballero Arcano', 'Embaucador Arcano'],
  },
  wis: {
    code: 'wis',
    name: 'Sabiduría',
    abbreviation: 'SAB',
    icon: '👁️',
    description: 'Conciencia perceptiva del entorno, intuición visceral, conexión espiritual y fuerza de voluntad mental.',
    combatRole: 'Atributo de conjuración del Clérigo, Druida y Monje (CD de salvaciones y poderes de Ki), y gobierna la crucial Percepción Pasiva.',
    vitalForClasses: ['Clérigo', 'Druida', 'Monje', 'Explorador'],
  },
  cha: {
    code: 'cha',
    name: 'Carisma',
    abbreviation: 'CAR',
    icon: '✨',
    description: 'Magnitud de tu presencia, fuerza de personalidad, elocuencia persuasiva, belleza impactante y liderazgo.',
    combatRole: 'Atributo de conjuración del Bardo, Brujo, Hechicero y Paladín. Gobierna todas las interacciones sociales e intimidación.',
    vitalForClasses: ['Bardo', 'Brujo', 'Hechicero', 'Paladín'],
  },
};

// ==========================================
// COMPENDIO OFICIAL DE DOTES (FEATS) DE D&D 5E
// ==========================================
export interface FeatSubChoiceOption {
  id: string;
  name: string;
  desc: string;
}

export interface FeatSubChoiceConfig {
  title: string;
  description?: string;
  maxSelections: number;
  options: FeatSubChoiceOption[];
}

export interface OfficialFeat {
  id: string;
  name: string;
  nameEn: string;
  source?: string;
  category: 'Combate' | 'Magia' | 'Utilidad' | 'General';
  prerequisite?: string;
  description: string;
  abilityBonus?: {
    stats?: ('str' | 'dex' | 'con' | 'int' | 'wis' | 'cha')[];
    amount: number;
    flexible?: boolean;
  };
  benefits: string[];
  subChoice?: FeatSubChoiceConfig;
}

export const OFFICIAL_5E_FEATS: OfficialFeat[] = [
  {
    id: 'alerta',
    name: 'Alerta (Alert)',
    nameEn: 'Alert',
    category: 'Utilidad',
    description: 'Siempre alerta ante cualquier peligro inminente.',
    benefits: [
      '+5 de bonificador a tus tiradas de Iniciativa.',
      'No puedes ser sorprendido mientras permanezcas consciente.',
      'Otras criaturas no ganan ventaja en tiradas de ataque contra ti por el mero hecho de que no puedas verlas.',
    ],
  },
  {
    id: 'francotirador',
    name: 'Francotirador (Sharpshooter)',
    nameEn: 'Sharpshooter',
    category: 'Combate',
    description: 'Maestría legendaria en el uso de armas a distancia.',
    benefits: [
      'Atacar al alcance largo de un arma a distancia no te impone desventaja.',
      'Tus ataques con armas a distancia ignoran la cobertura media y tres cuartos.',
      'Antes de hacer un ataque con un arma a distancia con la que seas competente, puedes elegir sufrir un penalizador de -5 a la tirada de ataque; si impactas, sumas +10 al daño.',
    ],
  },
  {
    id: 'gran-arma-master',
    name: 'Maestro en Armas Pesadas (Great Weapon Master)',
    nameEn: 'Great Weapon Master',
    category: 'Combate',
    description: 'Aprovechas la inercia devastadora de tus armas a dos manos.',
    benefits: [
      'En tu turno, cuando consigas un impacto crítico con un arma cuerpo a cuerpo o reduzcas a una criatura a 0 PG con ella, puedes realizar un ataque cuerpo a cuerpo como acción adicional.',
      'Antes de hacer un ataque cuerpo a cuerpo con un arma pesada competente, puedes elegir sufrir -5 a la tirada de ataque; si impactas, sumas +10 al daño.',
    ],
  },
  {
    id: 'conjurador-belico',
    name: 'Conjurador Bélico (War Caster)',
    nameEn: 'War Caster',
    category: 'Magia',
    prerequisite: 'Capacidad para lanzar al menos un conjuro',
    description: 'Entrenado para lanzar conjuros en medio de la tormenta del combate cuerpo a cuerpo.',
    benefits: [
      'Tienes ventaja en tiradas de salvación de Constitución para mantener la concentración en un conjuro al recibir daño.',
      'Puedes realizar los componentes somáticos de los conjuros incluso si empuñas armas o un escudo en una o ambas manos.',
      'Cuando el movimiento de una criatura hostil provoca un ataque de oportunidad por tu parte, puedes usar tu reacción para lanzarle un conjuro en lugar de atacar (el conjuro debe tener tiempo de lanzamiento de 1 acción y apuntar únicamente a esa criatura).',
    ],
  },
  {
    id: 'afortunado',
    name: 'Afortunado (Lucky)',
    nameEn: 'Lucky',
    category: 'General',
    description: 'Tienes una suerte casi inexplicable que desafía las probabilidades.',
    benefits: [
      'Tienes 3 puntos de suerte. Cada vez que hagas una tirada de ataque, prueba de característica o salvación, puedes gastar 1 punto de suerte para tirar 1d20 adicional y elegir cuál dado usar.',
      'Cuando se haga una tirada de ataque contra ti, puedes gastar 1 punto para tirar 1d20 y elegir si el atacante usa su tirada o la tuya.',
      'Recuperas todos los puntos de suerte gastados tras completar un descanso largo.',
    ],
  },
  {
    id: 'centinela',
    name: 'Centinela (Sentinel)',
    nameEn: 'Sentinel',
    category: 'Combate',
    description: 'Dominas técnicas para inmovilizar a tus enemigos e impedir su retirada.',
    benefits: [
      'Cuando impactas a una criatura con un ataque de oportunidad, su velocidad se reduce a 0 durante el resto del turno.',
      'Las criaturas dentro de tu alcance provocan ataques de oportunidad por tu parte incluso si usan la acción de Destrabarse (Disengage).',
      'Cuando una criatura a 5 pies de ti ataca a un objetivo que no seas tú, puedes usar tu reacción para realizar un ataque cuerpo a cuerpo contra el atacante.',
    ],
  },
  {
    id: 'movil',
    name: 'Móvil (Mobile)',
    nameEn: 'Mobile',
    category: 'Combate',
    description: 'Extraordinariamente rápido y ágil para entrar y salir de la refriega.',
    benefits: [
      'Tu velocidad base aumenta en 10 pies.',
      'Cuando usas la acción de Correr (Dash), el terreno difícil no te cuesta movimiento adicional en ese turno.',
      'Cuando realizas un ataque cuerpo a cuerpo contra una criatura, no provocas ataques de oportunidad de esa criatura por el resto de tu turno, sin importar si el ataque acertó o falló.',
    ],
  },
  {
    id: 'robusto',
    name: 'Robusto (Tough)',
    nameEn: 'Tough',
    category: 'General',
    description: 'Aguante físico y vitalidad que superan con creces los límites ordinarios.',
    benefits: [
      'Tu máximo de puntos de golpe aumenta en una cantidad igual al doble de tu nivel cuando obtienes esta dote.',
      'Cada vez que subes de nivel después de obtener esta dote, tu máximo de puntos de golpe aumenta en 2 adicionales.',
    ],
  },
  {
    id: 'resiliente',
    name: 'Resiliente (Resilient)',
    nameEn: 'Resilient',
    category: 'General',
    description: 'Desarrollas una resistencia inquebrantable en una característica.',
    abilityBonus: {
      stats: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    benefits: [
      'Aumentas la puntuación de la característica elegida en +1 (hasta un máximo de 20).',
      'Ganas competencia en las tiradas de salvación de la característica elegida.',
    ],
  },
  {
    id: 'armas-de-asta',
    name: 'Maestro de las Armas de Asta (Polearm Master)',
    nameEn: 'Polearm Master',
    category: 'Combate',
    description: 'Mantienes a raya a tus rivales con armas de gran alcance.',
    benefits: [
      'Cuando realizas la acción de Atacar únicamente con una alabarda, pica, bastón o lanza, puedes usar una acción adicional para golpear con el extremo opuesto (inflige 1d4 de daño contundente).',
      'Mientras empuñas una alabarda, pica, bastón o lanza, otras criaturas provocan un ataque de oportunidad por tu parte cuando entran dentro de tu alcance.',
    ],
  },
  {
    id: 'combatiente-dos-armas',
    name: 'Combatiente con Dos Armas (Dual Wielder)',
    nameEn: 'Dual Wielder',
    category: 'Combate',
    description: 'Maestría en blandir dos armas cuerpo a cuerpo al unísono.',
    benefits: [
      'Ganas un bonificador de +1 a tu Clase de Armadura mientras sostengas un arma cuerpo a cuerpo distinta en cada mano.',
      'Puedes usar el combate con dos armas incluso cuando las armas de una mano que empuñas no tienen la propiedad ligera.',
      'Puedes desenvainar o enfundar dos armas a la vez cuando normalmente solo podrías hacerlo con una.',
    ],
  },
  {
    id: 'iniciado-magia',
    name: 'Iniciado en la Magia (Magic Initiate)',
    nameEn: 'Magic Initiate',
    category: 'Magia',
    description: 'Aprendes los secretos básicos de una tradición mágica ajena.',
    benefits: [
      'Eliges una clase: Bardo, Clérigo, Druida, Hechicero, Brujo o Mago.',
      'Aprendes dos trucos (cantrips) de la lista de conjuros de esa clase.',
      'Aprendes un conjuro de nivel 1 de esa misma lista, el cual puedes lanzar una vez por descanso largo sin gastar ranura de conjuro.',
    ],
    subChoice: {
      title: 'Elige la Clase Patrocinadora',
      description: 'Determina de qué lista de conjuros provienen tus 2 trucos y conjuro de 1.er nivel, y cuál es tu característica para lanzarlos.',
      maxSelections: 1,
      options: [
        { id: 'mago', name: 'Mago (Wizard - Inteligencia)', desc: '2 trucos y 1 conjuro de 1.er nivel de la lista de Mago (usa Inteligencia).' },
        { id: 'clerigo', name: 'Clérigo (Cleric - Sabiduría)', desc: '2 trucos y 1 conjuro de 1.er nivel de la lista de Clérigo (usa Sabiduría).' },
        { id: 'druida', name: 'Druida (Druid - Sabiduría)', desc: '2 trucos y 1 conjuro de 1.er nivel de la lista de Druida (usa Sabiduría).' },
        { id: 'bardo', name: 'Bardo (Bard - Carisma)', desc: '2 trucos y 1 conjuro de 1.er nivel de la lista de Bardo (usa Carisma).' },
        { id: 'hechicero', name: 'Hechicero (Sorcerer - Carisma)', desc: '2 trucos y 1 conjuro de 1.er nivel de la lista de Hechicero (usa Carisma).' },
        { id: 'brujo', name: 'Brujo (Warlock - Carisma)', desc: '2 trucos y 1 conjuro de 1.er nivel de la lista de Brujo (usa Carisma).' },
      ],
    },
  },
  {
    id: 'observador',
    name: 'Observador (Observant)',
    nameEn: 'Observant',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['int', 'wis'],
      amount: 1,
      flexible: true,
    },
    description: 'Rápido para notar los detalles más sutiles a tu alrededor.',
    benefits: [
      'Aumentas tu Inteligencia o Sabiduría en +1 (máximo 20).',
      'Si puedes ver la boca de una criatura mientras habla un idioma que conoces, puedes leer sus labios.',
      'Ganas un bonificador de +5 a tus puntuaciones pasivas de Sabiduría (Percepción) y de Inteligencia (Investigación).',
    ],
  },
  {
    id: 'experto-ballestas',
    name: 'Experto en Ballestas (Crossbow Expert)',
    nameEn: 'Crossbow Expert',
    category: 'Combate',
    description: 'Disparas ballestas con una rapidez y precisión asombrosas.',
    benefits: [
      'Ignoras la propiedad de recarga de las ballestas con las que tengas competencia.',
      'Estar a 5 pies o menos de una criatura hostil no impone desventaja a tus tiradas de ataque a distancia.',
      'Cuando usas la acción de Atacar y atacas con un arma a una mano, puedes usar una acción adicional para atacar con una ballesta de mano cargada que sostengas.',
    ],
  },
  {
    id: 'atleta',
    name: 'Atleta (Athlete)',
    nameEn: 'Athlete',
    category: 'General',
    abilityBonus: {
      stats: ['str', 'dex'],
      amount: 1,
      flexible: true,
    },
    description: 'Acondicionamiento físico intensivo para superar pruebas atléticas.',
    benefits: [
      'Aumentas tu Fuerza o Destreza en +1 (máximo 20).',
      'Cuando estás derribado, ponerte de pie solo te cuesta 5 pies de movimiento en lugar de la mitad de tu velocidad.',
      'Trepar no te cuesta movimiento adicional.',
      'Solo necesitas moverte 5 pies a pie para realizar un salto de longitud o de altura con carrerilla.',
    ],
  },
  {
    id: 'actor',
    name: 'Actor',
    nameEn: 'Actor',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['cha'],
      amount: 1,
    },
    description: 'Habilidoso en la mímica, el engaño teatral y la impostura.',
    benefits: [
      'Aumentas tu Carisma en +1 (máximo 20).',
      'Tienes ventaja en pruebas de Carisma (Engaño) y Carisma (Interpretación) cuando intentas hacerte pasar por otra persona.',
      'Puedes imitar el habla de otra persona o los sonidos de otras criaturas tras escucharlas hablar durante al menos 1 minuto.',
    ],
  },
  {
    id: 'cocinero',
    name: 'Cocinero (Chef)',
    nameEn: 'Chef',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['con', 'wis'],
      amount: 1,
      flexible: true,
    },
    description: 'El tiempo y la dedicación culinaria nutren el cuerpo y el espíritu.',
    benefits: [
      'Aumentas tu Constitución o Sabiduría en +1 (máximo 20).',
      'Ganas competencia con las herramientas de cocinero.',
      'Durante un descanso corto, puedes preparar comida especial: cualquier aliado que gaste dados de golpe para curarse recupera 1d8 PG adicionales.',
      'Con 1 hora de trabajo o en un descanso largo puedes cocinar tantas golosinas como tu bono de competencia; comer una otorga PG temporales iguales a tu bono de competencia.',
    ],
  },
  {
    id: 'aplastador',
    name: 'Aplastador (Crusher)',
    nameEn: 'Crusher',
    category: 'Combate',
    abilityBonus: {
      stats: ['str', 'con'],
      amount: 1,
      flexible: true,
    },
    description: 'Dominas la fuerza de los impactos contundentes para desplazar enemigos.',
    benefits: [
      'Aumentas tu Fuerza o Constitución en +1 (máximo 20).',
      'Una vez por turno, cuando impactes a una criatura infligiéndole daño contundente, puedes empujarla 5 pies a un espacio desocupado si no es más de un tamaño mayor que tú.',
      'Cuando asestas un impacto crítico que inflige daño contundente, todas las tiradas de ataque contra esa criatura se hacen con ventaja hasta el inicio de tu próximo turno.',
    ],
  },
  {
    id: 'perforador',
    name: 'Perforador (Piercer)',
    nameEn: 'Piercer',
    category: 'Combate',
    abilityBonus: {
      stats: ['str', 'dex'],
      amount: 1,
      flexible: true,
    },
    description: 'Precisión mortal al clavar armas perforantes en puntos vulnerables.',
    benefits: [
      'Aumentas tu Fuerza o Destreza en +1 (máximo 20).',
      'Una vez por turno, cuando golpees a una criatura e inflijas daño perforante, puedes volver a tirar uno de los dados de daño del ataque y usar el nuevo resultado.',
      'Cuando asestas un impacto crítico que inflige daño perforante, tiras un dado de daño adicional del arma al calcular el daño del crítico.',
    ],
  },
  {
    id: 'rebanador',
    name: 'Rebanador (Slasher)',
    nameEn: 'Slasher',
    category: 'Combate',
    abilityBonus: {
      stats: ['str', 'dex'],
      amount: 1,
      flexible: true,
    },
    description: 'Cortas tendones y arterias para entorpecer los movimientos del rival.',
    benefits: [
      'Aumentas tu Fuerza o Destreza en +1 (máximo 20).',
      'Una vez por turno, cuando golpees e inflijas daño cortante, reduces la velocidad del objetivo en 10 pies hasta el inicio de tu siguiente turno.',
      'Cuando asestas un impacto crítico que inflige daño cortante, la criatura sufre una herida grave: tiene desventaja en todas sus tiradas de ataque hasta el inicio de tu próximo turno.',
    ],
  },
  {
    id: 'tirador-conjuros',
    name: 'Tirador de Conjuros (Spell Sniper)',
    nameEn: 'Spell Sniper',
    category: 'Magia',
    prerequisite: 'Capacidad para lanzar al menos un conjuro',
    description: 'Dominas el arte de disparar proyectiles mágicos a distancias extremas.',
    benefits: [
      'Cuando lanzas un conjuro que requiere hacer una tirada de ataque, el alcance del conjuro se duplica.',
      'Tus ataques de conjuro a distancia ignoran la cobertura media y tres cuartos.',
      'Aprendes un truco que requiera una tirada de ataque de la lista de Bardo, Clérigo, Druida, Hechicero, Brujo o Mago.',
    ],
  },
  {
    id: 'iniciado-combate',
    name: 'Iniciado en Combate (Fighting Initiate)',
    nameEn: 'Fighting Initiate',
    category: 'Combate',
    prerequisite: 'Competencia con un arma marcial',
    description: 'Adoptas una doctrina marcial refinada de la orden de los guerreros.',
    benefits: [
      'Aprendes una opción de Estilo de Combate a tu elección de la lista de la clase Guerrero.',
      'Cada vez que subes de nivel, puedes reemplazar este estilo por otro estilo de combate de la lista de Guerrero.',
    ],
    subChoice: {
      title: 'Elige 1 Estilo de Combate',
      description: 'Selecciona una especialización marcial oficial del Guerrero.',
      maxSelections: 1,
      options: [
        { id: 'arqueria', name: 'Arquería (Archery)', desc: '+2 a las tiradas de ataque con armas a distancia.' },
        { id: 'defensa', name: 'Defensa (Defense)', desc: '+1 a la Clase de Armadura mientras vistas armadura.' },
        { id: 'duelo', name: 'Duelo (Dueling)', desc: '+2 al daño cuando empuñas un arma cuerpo a cuerpo a una mano y ninguna otra.' },
        { id: 'armas-grandes', name: 'Armas Grandes (Great Weapon Fighting)', desc: 'Relanza 1s y 2s en dados de daño de armas a dos manos o versátiles a dos manos.' },
        { id: 'proteccion', name: 'Protección (Protection)', desc: 'Usa tu reacción con escudo para imponer desventaja al ataque contra un aliado a 5 pies.' },
        { id: 'dos-armas', name: 'Combate con Dos Armas (Two-Weapon Fighting)', desc: 'Suma tu mod de característica al daño del ataque con la mano torpe.' },
        { id: 'ciegas', name: 'Lucha a Ciegas (Blind Fighting)', desc: 'Ganas Vista a Ciegas 10 pies (detectas invisibles y combates en oscuridad total).' },
        { id: 'intercepcion', name: 'Intercepción (Interception)', desc: 'Reacción con escudo o arma para reducir el daño a un aliado adyacente en 1d10 + competencia.' },
        { id: 'arrojadizas', name: 'Armas Arrojadizas (Thrown Weapon Fighting)', desc: 'Desenvaina como parte del ataque y suma +2 al daño con armas arrojadizas.' },
        { id: 'desarmado', name: 'Lucha Desarmada (Unarmed Fighting)', desc: 'Tus ataques desarmados infligen 1d6 + Fue (o 1d8 + Fue sin armas ni escudo) y 1d4 automático al apresar.' },
      ],
    },
  },
  {
    id: 'adepto-marcial',
    name: 'Adepto Marcial (Martial Adept)',
    nameEn: 'Martial Adept',
    category: 'Combate',
    description: 'Entrenamiento táctico en maniobras avanzadas de esgrima.',
    benefits: [
      'Aprendes dos Maniobras a tu elección de la lista del arquetipo Maestro de Batalla del Guerrero.',
      'Ganas 1 Dado de Superioridad (un d6) para alimentar estas maniobras, el cual recuperas tras un descanso corto o largo.',
    ],
    subChoice: {
      title: 'Elige 2 Maniobras de Maestro de Batalla',
      description: 'Selecciona 2 maniobras marciales que puedes ejecutar consumiendo tu dado de superioridad d6.',
      maxSelections: 2,
      options: [
        { id: 'ataque-derribo', name: 'Ataque de Derribo (Trip Attack)', desc: 'Suma el d6 al daño; si el objetivo falla salvación de Fuerza, cae derribado al suelo.' },
        { id: 'contraataque', name: 'Contraataque (Riposte)', desc: 'Reacción cuando fallen un ataque cuerpo a cuerpo contra ti para contratacar sumando el d6 al daño.' },
        { id: 'parada', name: 'Parada (Parry)', desc: 'Reacción cuando recibas daño cuerpo a cuerpo para reducir el daño en d6 + modificador de Destreza.' },
        { id: 'ataque-precision', name: 'Ataque de Precisión (Precision Attack)', desc: 'Suma el d6 a tu tirada de ataque para asegurar el impacto.' },
        { id: 'ataque-amenazante', name: 'Ataque Amenazante (Menacing Attack)', desc: 'Suma el d6 al daño y asusta al objetivo hasta el final de tu próximo turno si falla salvación de Sabiduría.' },
        { id: 'ataque-desarme', name: 'Ataque de Desarme (Disarming Attack)', desc: 'Suma el d6 al daño y obliga a soltar un objeto sostenido si falla salvación de Fuerza.' },
        { id: 'ataque-empujon', name: 'Ataque de Empujón (Pushing Attack)', desc: 'Suma el d6 al daño y empuja al objetivo hasta 15 pies lejos de ti si falla salvación de Fuerza.' },
        { id: 'ataque-maniobra', name: 'Ataque de Maniobra (Maneuvering Attack)', desc: 'Suma el d6 al daño y permite a un aliado moverse la mitad de su velocidad sin provocar ataques de oportunidad.' },
        { id: 'finta', name: 'Ataque con Finta (Feinting Attack)', desc: 'Acción adicional para ganar ventaja en tu siguiente tirada de ataque y sumar el d6 al daño.' },
        { id: 'evasion', name: 'Paso de Evasión (Evasive Footwork)', desc: 'Gasta el d6 mientras te mueves para sumar el resultado a tu CA hasta detenerte.' },
        { id: 'distraccion', name: 'Ataque de Distracción (Distracting Strike)', desc: 'Suma el d6 al daño y da ventaja al siguiente ataque de un aliado contra ese enemigo.' },
        { id: 'arrollador', name: 'Ataque Arrollador (Sweeping Attack)', desc: 'Si impactas, inflige el resultado del d6 a una criatura adyacente adicional.' },
      ],
    },
  },
  {
    id: 'adepto-metamagico',
    name: 'Adepto Metamágico (Metamagic Adept)',
    nameEn: 'Metamagic Adept',
    category: 'Magia',
    prerequisite: 'Rasgo de Conjuración o Magia del Pacto',
    description: 'Aprendes a doblar y transformar las leyes del tejido mágico.',
    benefits: [
      'Aprendes dos opciones de Metamagia a tu elección de la lista de la clase Hechicero.',
      'Ganas 2 Puntos de Hechicería para alimentar tu metamagia, los cuales recuperas tras un descanso largo.',
    ],
    subChoice: {
      title: 'Elige 2 Opciones de Metamagia (Hechicero)',
      description: 'Selecciona las 2 opciones de metamagia que puedes moldear usando tus 2 Puntos de Hechicería.',
      maxSelections: 2,
      options: [
        { id: 'cuidadoso', name: 'Conjuro Cuidadoso (Careful Spell)', desc: 'Protege a criaturas elegidas (hasta tu Carisma) para que superen automáticamente la tirada de salvación del conjuro.' },
        { id: 'distante', name: 'Conjuro Distante (Distant Spell)', desc: 'Duplica el alcance de un conjuro de 5 pies o más (o convierte un conjuro de toque en 30 pies de alcance).' },
        { id: 'potenciado', name: 'Conjuro Potenciado (Empowered Spell)', desc: 'Relanza hasta tu modificador de Carisma dados de daño del conjuro gastando 1 punto.' },
        { id: 'extendido', name: 'Conjuro Extendido (Extended Spell)', desc: 'Duplica la duración de un conjuro de 1 minuto o más (hasta un máximo de 24 horas).' },
        { id: 'elevado', name: 'Conjuro Elevado (Heightened Spell)', desc: 'Impone desventaja en la primera salvación que una criatura realice contra tu conjuro.' },
        { id: 'rapido', name: 'Conjuro Rápido (Quickened Spell)', desc: 'Cambia el tiempo de lanzamiento de 1 acción a 1 acción adicional (coste 2 puntos).' },
        { id: 'sutil', name: 'Conjuro Sutil (Subtle Spell)', desc: 'Lanza el conjuro sin componentes verbales ni somáticos, evitando detección o contramagia.' },
        { id: 'gemelo', name: 'Conjuro Gemelo (Twinned Spell)', desc: 'Duplica un conjuro de objetivo único hacia un segundo objetivo en alcance.' },
        { id: 'transmutado', name: 'Conjuro Transmutado (Transmuted Spell)', desc: 'Cambia el tipo de daño del conjuro a ácido, frío, fuego, relámpago, veneno o trueno.' },
        { id: 'buscador', name: 'Conjuro Buscador (Seeking Spell)', desc: 'Si fallas una tirada de ataque con un conjuro, puedes relanzar el d20.' },
      ],
    },
  },
  {
    id: 'adepto-eldritch',
    name: 'Adepto Eldritch (Eldritch Adept)',
    nameEn: 'Eldritch Adept',
    category: 'Magia',
    prerequisite: 'Rasgo de Conjuración o Magia del Pacto',
    description: 'Desbloqueas un fragmento de conocimiento oculto de las profundidades del cosmos.',
    benefits: [
      'Aprendes una Invocación Mística a tu elección de la lista de la clase Brujo.',
      'Si la invocación tiene un prerrequisito, solo puedes elegirla si eres un Brujo que cumpla dicho requisito.',
      'Puedes cambiar la invocación cada vez que subes de nivel de personaje.',
    ],
    subChoice: {
      title: 'Elige 1 Invocación Mística (Brujo)',
      description: 'Selecciona una invocación sobrenatural oficial disponible sin requisitos de pacto.',
      maxSelections: 1,
      options: [
        { id: 'armadura-sombras', name: 'Armadura de Sombras (Armor of Shadows)', desc: 'Lanzas Armadura de Mago sobre ti mismo a voluntad, sin gastar ranuras de conjuro ni componentes.' },
        { id: 'bestia-parlante', name: 'Bestia Parlante (Beast Speech)', desc: 'Lanzas Hablar con los Animales a voluntad, sin gastar ranuras de conjuro.' },
        { id: 'influencia-seductora', name: 'Influencia Seductora (Beguiling Influence)', desc: 'Ganas competencia en las habilidades de Engaño y Persuasión.' },
        { id: 'ojos-guardian-runico', name: 'Ojos del Guardián Rúnico (Eyes of the Rune Keeper)', desc: 'Puedes leer y comprender cualquier sistema de escritura del multiverso.' },
        { id: 'vision-diabolica', name: 'Visión Diabólica (Devil\'s Sight)', desc: 'Ves con total claridad en oscuridad natural y mágica hasta 120 pies de distancia.' },
        { id: 'vigor-demoniaco', name: 'Vigor Demoníaco (Fiendish Vigor)', desc: 'Lanzas Falsa Vida a voluntad sobre ti mismo como conjuro de 1.er nivel (1d4+4 PG temporales).' },
        { id: 'mascara-muchas-caras', name: 'Máscara de Muchas Caras (Mask of Many Faces)', desc: 'Lanzas Disfrazarse sobre ti mismo a voluntad, sin gastar ranuras de conjuro.' },
        { id: 'vision-esoterica', name: 'Visión de lo Esotérico (Eldritch Sight)', desc: 'Lanzas Detectar Magia a voluntad, sin gastar ranuras de conjuro.' },
        { id: 'susurros-tumba', name: 'Susurros de la Tumba (Whispers of the Grave)', desc: 'Lanzas Hablar con los Muertos a voluntad, sin gastar ranuras de conjuro.' },
      ],
    },
  },
  {
    id: 'adepto-elemental',
    name: 'Adepto Elemental (Elemental Adept)',
    nameEn: 'Elemental Adept',
    category: 'Magia',
    prerequisite: 'Capacidad para lanzar al menos un conjuro',
    description: 'Tu dominio sobre una fuerza elemental pura penetra las resistencias enemigas.',
    benefits: [
      'Los conjuros que lanzas ignoran la resistencia al tipo de daño elegido.',
      'Cuando tires el daño de un conjuro del tipo elegido, cualquier resultado de 1 en el dado cuenta como un 2.',
    ],
    subChoice: {
      title: 'Elige 1 Tipo de Daño Elemental',
      description: 'Tus conjuros ignorarán la resistencia a este elemento y los 1s se convertirán en 2s.',
      maxSelections: 1,
      options: [
        { id: 'fuego', name: 'Fuego (Fire)', desc: 'Ignora resistencia al fuego. Tus bolas de fuego y rayos abrasadores calcinan sin freno.' },
        { id: 'frio', name: 'Frío (Cold)', desc: 'Ignora resistencia al frío. El hielo de tus conjuros congela hasta a las criaturas más gélidas.' },
        { id: 'relampago', name: 'Relámpago (Lightning)', desc: 'Ignora resistencia al relámpago. Tus descargas eléctricas atraviesan toda defensa.' },
        { id: 'acido', name: 'Ácido (Acid)', desc: 'Ignora resistencia al ácido. Tus vitriolos y flechas ácidas corroen cualquier coraza.' },
        { id: 'trueno', name: 'Trueno (Thunder)', desc: 'Ignora resistencia al trueno. La onda expansiva de tus estruendos rompe toda barrera.' },
      ],
    },
  },
  {
    id: 'habilidoso',
    name: 'Habilidoso (Skilled)',
    nameEn: 'Skilled',
    category: 'Utilidad',
    description: 'Has dedicado tiempo a aprender una amplia variedad de artes prácticas y conocimientos.',
    benefits: [
      'Ganas competencia en 3 habilidades o herramientas a tu elección.',
    ],
    subChoice: {
      title: 'Elige 3 Habilidades Competentes',
      description: 'Selecciona 3 habilidades del compendio en las que ganarás competencia completa.',
      maxSelections: 3,
      options: ALL_5E_SKILLS.map((sk) => ({
        id: sk.name.toLowerCase().replace(/\s+/g, '-'),
        name: `${sk.name} (${sk.ability.toUpperCase()})`,
        desc: sk.description,
      })),
    },
  },
  {
    id: 'experto-habilidades',
    name: 'Experto en Habilidades (Skill Expert)',
    nameEn: 'Skill Expert',
    category: 'General',
    description: 'Perfeccionas tus talentos hasta alcanzar un grado extraordinario de maestría.',
    abilityBonus: {
      stats: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    benefits: [
      'Aumentas una puntuación de característica a tu elección en +1 (hasta un máximo de 20).',
      'Ganas competencia en una habilidad a tu elección.',
      'Ganas pericia (doble competencia) en una habilidad en la que ya tengas competencia.',
    ],
    subChoice: {
      title: 'Elige 1 Habilidad para Pericia (Doble Competencia)',
      description: 'Duplica tu bonificador de competencia para todas las pruebas con esta habilidad.',
      maxSelections: 1,
      options: ALL_5E_SKILLS.map((sk) => ({
        id: sk.name.toLowerCase().replace(/\s+/g, '-'),
        name: `${sk.name} (${sk.ability.toUpperCase()})`,
        desc: sk.description,
      })),
    },
  },
  {
    id: 'lider-inspirador',
    name: 'Líder Inspirador (Inspiring Leader)',
    nameEn: 'Inspiring Leader',
    category: 'Utilidad',
    prerequisite: 'Carisma 13 o superior',
    description: 'Infundes coraje y determinación en tus compañeros con discursos memorables.',
    benefits: [
      'Puedes pasar 10 minutos inspirando a tus compañeros. Eliges hasta 6 criaturas amistosas (que pueden incluirte a ti) a 30 pies.',
      'Cada criatura gana puntos de golpe temporales iguales a tu nivel de personaje + tu modificador de Carisma.',
      'Una criatura no puede volver a ganar PG temporales de esta dote hasta completar un descanso corto o largo.',
    ],
  },
  {
    id: 'sanador',
    name: 'Sanador (Healer)',
    nameEn: 'Healer',
    category: 'Utilidad',
    description: 'Médico de campo capaz de salvar vidas y vendar heridas en plena batalla.',
    benefits: [
      'Cuando usas un estuche de curaciones para estabilizar a una criatura moribunda, esta recupera 1 punto de golpe en lugar de permanecer inconsciente a 0 PG.',
      'Como acción puedes gastar un uso de un estuche de curaciones para atender a una criatura: recupera 1d6 + 4 PG, más tantos PG adicionales como el número de dados de golpe máximos de la criatura (1 vez por criatura por descanso corto o largo).',
    ],
  },
  {
    id: 'maton-taberna',
    name: 'Matón de Taberna (Tavern Brawler)',
    nameEn: 'Tavern Brawler',
    category: 'Combate',
    abilityBonus: {
      stats: ['str', 'con'],
      amount: 1,
      flexible: true,
    },
    description: 'Acostumbrado a peleas cuerpo a cuerpo con botellas rotas, sillas y puños limpios.',
    benefits: [
      'Aumentas tu Fuerza o Constitución en +1 (máximo 20).',
      'Tienes competencia con armas improvisadas.',
      'Tus ataques desarmados usan un d4 para el daño en lugar del 1 estándar.',
      'Cuando golpeas a una criatura con un ataque desarmado o arma improvisada en tu turno, puedes usar una acción adicional para intentar apresarla (Grapple).',
    ],
  },
  {
    id: 'armadura-pesada-master',
    name: 'Maestro de las Armaduras Pesadas (Heavy Armor Master)',
    nameEn: 'Heavy Armor Master',
    category: 'Combate',
    prerequisite: 'Competencia con armadura pesada',
    abilityBonus: {
      stats: ['str'],
      amount: 1,
    },
    description: 'Usas el grosor de las placas de acero para disipar la violencia de los golpes.',
    benefits: [
      'Aumentas tu Fuerza en +1 (máximo 20).',
      'Mientras lleves puesta una armadura pesada, el daño contundente, perforante y cortante que recibas proveniente de ataques no mágicos se reduce en 3 puntos.',
    ],
  },
  {
    id: 'armadura-media-master',
    name: 'Maestro de las Armaduras Medias (Medium Armor Master)',
    nameEn: 'Medium Armor Master',
    category: 'Combate',
    prerequisite: 'Competencia con armadura media',
    description: 'Mueves armaduras de mallas y escamas con silenciosa presteza.',
    benefits: [
      'Llevar armadura media no te impone desventaja en las pruebas de Destreza (Sigilo).',
      'Cuando lleves armadura media, puedes sumar hasta +3 de tu modificador de Destreza a tu Clase de Armadura en lugar del tope estándar de +2.',
    ],
  },
  {
    id: 'telequinetico',
    name: 'Dotado Telequinético (Telekinetic)',
    nameEn: 'Telekinetic',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    description: 'Despiertas la habilidad de mover materia con el mero poder de tu mente.',
    benefits: [
      'Aumentas tu Inteligencia, Sabiduría o Carisma en +1 (máximo 20).',
      'Aprendes el truco Mano de Mago (invisible y con alcance ampliado en 30 pies si ya lo conoces).',
      'Como acción adicional puedes empujar o atraer telequinéticamente a una criatura a 30 pies hasta 5 pies hacia ti o lejos de ti (salvación de Fue contra CD 8 + bono de competencia + modificador de la característica elegida).',
    ],
  },
  {
    id: 'telepatico',
    name: 'Dotado Telepático (Telepathic)',
    nameEn: 'Telepathic',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    description: 'Proyectas tus pensamientos en las mentes ajenas y lees sus susurros.',
    benefits: [
      'Aumentas tu Inteligencia, Sabiduría o Carisma en +1 (máximo 20).',
      'Puedes hablar telepáticamente con cualquier criatura que veas a 60 pies o menos (entiende si comparte un idioma contigo).',
      'Puedes lanzar el conjuro Detectar Pensamientos sin gastar ranura de conjuro una vez por descanso largo.',
    ],
  },
  {
    id: 'tocado-por-hadas',
    name: 'Tocado por las Hadas (Fey Touched)',
    nameEn: 'Fey Touched',
    category: 'Magia',
    abilityBonus: {
      stats: ['int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    description: 'Tu exposición a las Tierras de las Hadas te imbuye de magia feérica sutil.',
    benefits: [
      'Aumentas tu Inteligencia, Sabiduría o Carisma en +1 (máximo 20).',
      'Aprendes el conjuro Paso Brumoso (Misty Step) y un conjuro de nivel 1 de Adivinación o Encantamiento.',
      'Puedes lanzar cada uno de estos conjuros una vez sin gastar ranura de conjuro por descanso largo.',
    ],
  },
  {
    id: 'tocado-por-sombras',
    name: 'Tocado por las Sombras (Shadow Touched)',
    nameEn: 'Shadow Touched',
    category: 'Magia',
    abilityBonus: {
      stats: ['int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    description: 'Tu contacto con el Páramo Sombrío te concede el poder de desvanecerte.',
    benefits: [
      'Aumentas tu Inteligencia, Sabiduría o Carisma en +1 (máximo 20).',
      'Aprendes el conjuro Invisibilidad y un conjuro de nivel 1 de Ilusión o Nigromancia.',
      'Puedes lanzar cada uno de estos conjuros una vez sin gastar ranura de conjuro por descanso largo.',
    ],
  },
  {
    id: 'dungeon-delver',
    name: 'Explorador de Mazmorras (Dungeon Delver)',
    nameEn: 'Dungeon Delver',
    category: 'Utilidad',
    description: 'Ojo clínico para detectar trampas mortales y puertas secretas en catacumbas.',
    benefits: [
      'Tienes ventaja en pruebas de Sabiduría (Percepción) e Inteligencia (Investigación) para detectar puertas secretas.',
      'Tienes ventaja en tiradas de salvación para evitar o resistir trampas.',
      'Tienes resistencia al daño infligido por trampas.',
      'Puedes viajar a un ritmo de viaje rápido y seguir buscando trampas activamente.',
    ],
  },
  {
    id: 'maestro-escudos',
    name: 'Maestro de los Escudos (Shield Master)',
    nameEn: 'Shield Master',
    category: 'Combate',
    description: 'Empleas tu escudo tanto para defensa impenetrable como para desestabilizar rivales.',
    benefits: [
      'Si realizas la acción de Atacar en tu turno, puedes usar una acción adicional para intentar empujar a una criatura a 5 pies de ti con tu escudo (derribarla o empujarla 5 pies).',
      'Si no estás incapacitado, puedes sumar el bonificador de CA de tu escudo a cualquier tirada de salvación de Destreza que realices contra un conjuro u otro efecto dañino dirigido únicamente a ti.',
      'Si estás sometido a un efecto que te permita hacer una tirada de salvación de Destreza para sufrir solo la mitad del daño, puedes usar tu reacción para interponer tu escudo; si superas la salvación, no sufres daño alguno.',
    ],
  },
  {
    id: 'duelista-defensivo',
    name: 'Duelista Defensivo (Defensive Duelist)',
    nameEn: 'Defensive Duelist',
    category: 'Combate',
    prerequisite: 'Destreza 13 o superior',
    description: 'Desvías estocadas y cortes en el último instante con la punta de tu hoja.',
    benefits: [
      'Cuando empuñas un arma sutil con la que eres competente y otra criatura te impacta con un ataque cuerpo a cuerpo, puedes usar tu reacción para sumar tu bonificador de competencia a tu CA para ese ataque, lo que potencialmente puede hacer que el ataque falle.',
    ],
  },
  {
    id: 'asesino-de-magos',
    name: 'Asesino de Magos (Mage Slayer)',
    nameEn: 'Mage Slayer',
    category: 'Combate',
    description: 'Entrenado rigurosamente en técnicas especializadas para abatir hechiceros y arcanistas.',
    benefits: [
      'Cuando una criatura a 5 pies o menos de ti lance un conjuro, puedes usar tu reacción para realizar un ataque con arma cuerpo a cuerpo contra esa criatura.',
      'Cuando inflijas daño a una criatura que se esté concentrando en un conjuro, esa criatura tiene desventaja en la tirada de salvación de Constitución que realice para mantener la concentración.',
      'Tienes ventaja en todas las tiradas de salvación contra conjuros lanzados por criaturas que se encuentren a 5 pies o menos de ti.',
    ],
  },
  {
    id: 'acechador',
    name: 'Acechador (Skulker)',
    nameEn: 'Skulker',
    category: 'Utilidad',
    prerequisite: 'Destreza 13 o superior',
    description: 'Experto en fundirse con las sombras y cazar desde la más absoluta penumbra.',
    benefits: [
      'Puedes intentar esconderte cuando estés solo ligeramente oscurecido desde el punto de vista de la criatura de la que te ocultas.',
      'Cuando estés oculto de una criatura y falles una tirada de ataque con arma a distancia, hacer el ataque no revela tu posición oculta.',
      'La luz tenue no te impone desventaja en las pruebas de Sabiduría (Percepción) basadas en la vista.',
    ],
  },
  {
    id: 'lanzador-rituales',
    name: 'Lanzador de Rituales (Ritual Caster)',
    nameEn: 'Ritual Caster',
    category: 'Magia',
    prerequisite: 'Inteligencia o Sabiduría 13 o superior',
    description: 'Has adquirido un grimorio ritual que te permite desatar magia ceremonial sin gastar ranuras.',
    benefits: [
      'Adquieres un libro de rituales con dos conjuros de nivel 1 con la etiqueta de ritual de la clase que elijas (Bardo, Clérigo, Druida, Hechicero, Brujo o Mago).',
      'Puedes lanzar conjuros de tu libro como rituales si tienen la etiqueta de ritual y su nivel no supera la mitad de tu nivel de personaje (redondeado hacia arriba).',
      'Si encuentras nuevos conjuros rituales en pergaminos o libros, puedes transcribirlos a tu libro (requiere 2 horas y 50 po por nivel de conjuro).',
    ],
    subChoice: {
      title: 'Elige la Tradición de Conjuración Ritual',
      description: 'Determina de qué lista provienen tus rituales y cuál característica usarás.',
      maxSelections: 1,
      options: [
        { id: 'mago', name: 'Mago (Inteligencia)', desc: 'Acceso al repertorio de rituales arcanos más extenso de 5e (Usa Inteligencia).' },
        { id: 'clerigo', name: 'Clérigo (Sabiduría)', desc: 'Rituales divinos y plegarias sagradas (Usa Sabiduría).' },
        { id: 'druida', name: 'Druida (Sabiduría)', desc: 'Ritos naturales y comunión primigenia (Usa Sabiduría).' },
        { id: 'bardo', name: 'Bardo (Carisma)', desc: 'Baladas y ritos poéticos de inspiración (Usa Carisma).' },
        { id: 'brujo', name: 'Brujo (Carisma)', desc: 'Secretos ceremoniales del pacto sobrenatural (Usa Carisma).' },
      ],
    },
  },
  {
    id: 'luchador-agarrador',
    name: 'Luchador (Grappler)',
    nameEn: 'Grappler',
    category: 'Combate',
    prerequisite: 'Fuerza 13 o superior',
    description: 'Técnicas avanzadas de lucha cuerpo a cuerpo para inmovilizar a cualquier oponente.',
    benefits: [
      'Tienes ventaja en las tiradas de ataque contra cualquier criatura a la que tengas apresada (grappled).',
      'Puedes usar tu acción para intentar inmovilizar a una criatura apresada por ti. Realiza otra prueba de presa; si tienes éxito, tanto tú como la criatura adquieren la condición de Inmovilizado (Restrained) hasta que finalice la presa.',
    ],
  },
  {
    id: 'mente-aguda',
    name: 'Mente Aguda (Keen Mind)',
    nameEn: 'Keen Mind',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['int'],
      amount: 1,
    },
    description: 'Posees una memoria fotográfica prodigiosa y una orientación espacial infalible.',
    benefits: [
      'Aumentas tu Inteligencia en +1 (hasta un máximo de 20).',
      'Siempre sabes en qué dirección está el norte.',
      'Siempre sabes con exactitud el número de horas que faltan para el próximo amanecer o atardecer.',
      'Puedes recordar con absoluta precisión cualquier cosa que hayas visto u oído en el último mes.',
    ],
  },
  {
    id: 'linguista',
    name: 'Lingüista (Linguist)',
    nameEn: 'Linguist',
    category: 'Utilidad',
    abilityBonus: {
      stats: ['int'],
      amount: 1,
    },
    description: 'Maestro de la filología, lenguas antiguas y criptografía hermética.',
    benefits: [
      'Aumentas tu Inteligencia en +1 (hasta un máximo de 20).',
      'Aprendes tres idiomas adicionales a tu elección.',
      'Puedes crear códigos y cifras escritos prácticamente indescifrables. Otros no pueden descifrarlo a menos que superen una prueba de Inteligencia (Investigación) con CD 8 + tu bono de competencia + tu modificador de Inteligencia.',
    ],
  },
  {
    id: 'maestro-armas',
    name: 'Maestro de Armas (Weapon Master)',
    nameEn: 'Weapon Master',
    category: 'Combate',
    abilityBonus: {
      stats: ['str', 'dex'],
      amount: 1,
      flexible: true,
    },
    description: 'Entrenamiento intensivo en el manejo marcial de diversas armas de guerra.',
    benefits: [
      'Aumentas tu Fuerza o Destreza en +1 (hasta un máximo de 20).',
      'Ganas competencia con cuatro armas simples o marciales a tu elección.',
    ],
  },
  {
    id: 'acorazado-ligero',
    name: 'Acorazado Ligero (Lightly Armored)',
    nameEn: 'Lightly Armored',
    category: 'General',
    abilityBonus: {
      stats: ['str', 'dex'],
      amount: 1,
      flexible: true,
    },
    description: 'Te entrenas en vestir protecciones de cuero y tachones sin entorpecer tu agilidad.',
    benefits: [
      'Aumentas tu Fuerza o Destreza en +1 (hasta un máximo de 20).',
      'Ganas competencia con armaduras ligeras.',
    ],
  },
  {
    id: 'acorazado-moderado',
    name: 'Acorazado Moderado (Moderately Armored)',
    nameEn: 'Moderately Armored',
    category: 'General',
    prerequisite: 'Competencia con armadura ligera',
    abilityBonus: {
      stats: ['str', 'dex'],
      amount: 1,
      flexible: true,
    },
    description: 'Dominas la colocación y el porte de cotas de malla, corazas y escudos de acero.',
    benefits: [
      'Aumentas tu Fuerza o Destreza en +1 (hasta un máximo de 20).',
      'Ganas competencia con armaduras medias y con escudos.',
    ],
  },
  {
    id: 'acorazado-pesado',
    name: 'Acorazado Pesado (Heavily Armored)',
    nameEn: 'Heavily Armored',
    category: 'General',
    prerequisite: 'Competencia con armadura media',
    abilityBonus: {
      stats: ['str'],
      amount: 1,
    },
    description: 'Soportas el tremendo peso de armaduras de placas completas sin perder solidez.',
    benefits: [
      'Aumentas tu Fuerza en +1 (hasta un máximo de 20).',
      'Ganas competencia con armaduras pesadas.',
    ],
  },
  {
    id: 'especialista-venenos',
    name: 'Especialista en Venenos (Poisoner)',
    nameEn: 'Poisoner',
    category: 'Utilidad',
    description: 'Elaboras toxinas fulminantes e ignoras las resistencias convencionales al veneno.',
    benefits: [
      'Cuando realizas una tirada de daño, ignoras la resistencia al daño de veneno.',
      'Puedes aplicar veneno a un arma o pieza de munición como acción adicional en lugar de una acción estándar.',
      'Ganas competencia con el kit de envenenador.',
      'Con 1 hora de trabajo y 50 po en materiales, puedes crear tantas dosis de un veneno potente como tu bonificador de competencia (CD 14 Con; 2d8 daño veneno y envenenado por 1 turno).',
    ],
  },
  {
    id: 'prodigio',
    name: 'Prodigio (Prodigy)',
    nameEn: 'Prodigy',
    category: 'General',
    prerequisite: 'Humano, Semielfo o Semiorco',
    description: 'Posees un talento sobrenatural para absorber artes, oficios y ciencias con suma facilidad.',
    benefits: [
      'Ganas competencia en 1 habilidad a tu elección.',
      'Ganas competencia en 1 tipo de herramienta a tu elección.',
      'Aprendes 1 idioma adicional a tu elección.',
      'Ganas pericia (doble competencia) en una habilidad en la que ya seas competente.',
    ],
  },
  {
    id: 'precision-elfica',
    name: 'Precisión Élfica (Elven Accuracy)',
    nameEn: 'Elven Accuracy',
    category: 'Combate',
    prerequisite: 'Elfo o Semielfo',
    abilityBonus: {
      stats: ['dex', 'int', 'wis', 'cha'],
      amount: 1,
      flexible: true,
    },
    description: 'La gracia mística de los elfos guía tus ataques hacia puntos críticos imposibles.',
    benefits: [
      'Aumentas tu Destreza, Inteligencia, Sabiduría o Carisma en +1 (hasta un máximo de 20).',
      'Siempre que tengas ventaja en una tirada de ataque que use Destreza, Inteligencia, Sabiduría o Carisma, puedes relanzar uno de los dados una vez.',
    ],
  },
  {
    id: 'robustez-enana',
    name: 'Robustez Enana (Dwarven Fortitude)',
    nameEn: 'Dwarven Fortitude',
    category: 'Combate',
    prerequisite: 'Enano',
    abilityBonus: {
      stats: ['con'],
      amount: 1,
    },
    description: 'La sangre de la montaña revitaliza tus heridas en pleno intercambio de golpes.',
    benefits: [
      'Aumentas tu Constitución en +1 (hasta un máximo de 20).',
      'Siempre que uses la acción de Esquivar (Dodge) en combate, puedes gastar uno de tus Dados de Golpe para curarte: tiras el dado, sumas tu modificador de Constitución y recuperas esa cantidad de puntos de golpe.',
    ],
  },
  {
    id: 'constitucion-infernal',
    name: 'Constitución Infernal (Infernal Constitution)',
    nameEn: 'Infernal Constitution',
    category: 'General',
    prerequisite: 'Tiefling',
    abilityBonus: {
      stats: ['con'],
      amount: 1,
    },
    description: 'Tu sangre demoníaca repele los fríos más extremos y los venenos más letales.',
    benefits: [
      'Aumentas tu Constitución en +1 (hasta un máximo de 20).',
      'Ganas resistencia al daño de frío y al daño de veneno.',
      'Tienes ventaja en las tiradas de salvación contra ser envenenado.',
    ],
  },
  {
    id: 'suerte-desmedida',
    name: 'Suerte Desmedida (Bountiful Luck)',
    nameEn: 'Bountiful Luck',
    category: 'Utilidad',
    prerequisite: 'Mediano',
    description: 'Tu aura de buena fortuna protege a tus aliados de desastres catastróficos.',
    benefits: [
      'Cuando un aliado que puedas ver a 30 pies o menos obtenga un 1 natural en una tirada de ataque, prueba de característica o tirada de salvación, puedes usar tu reacción para permitirle relanzar el dado (debe usar el nuevo resultado).',
    ],
  },
  {
    id: 'strike-of-the-giants',
    name: 'Golpe de los Gigantes (Strike of the Giants)',
    nameEn: 'Strike of the Giants',
    category: 'Combate',
    prerequisite: 'Competencia con armas marciales o trasfondo Expósito de los Gigantes (Giant Foundling)',
    description:
      'Has absorbido magia primordial que te otorga un eco del poder colosal de los gigantes. Al elegir esta dote, seleccionas uno de los seis beneficios listados a continuación. Una vez por turno, cuando golpeas a un objetivo con un ataque de arma cuerpo a cuerpo o un ataque de arma a distancia usando un arma arrojadiza, puedes imbuir el ataque con un efecto adicional dependiendo del beneficio elegido.\n\nLa CD de las tiradas de salvación para estos efectos es igual a 8 + tu bonificador de competencia + tu modificador de Fuerza o Constitución. Puedes usar esta dote un número de veces igual a tu bonificador de competencia, y recuperas todos los usos gastados al completar un descanso largo.',
    benefits: [
      'Una vez por turno, al impactar con un arma cuerpo a cuerpo o arrojadiza, puedes imbuir el impacto con el poder colosal del tipo de gigante elegido.',
      'CD de salvación: 8 + Bonificador de Competencia + Modificador de Fuerza o Constitución.',
      'Número de usos: Igual a tu bonificador de competencia por cada descanso largo.',
    ],
    subChoice: {
      title: 'Elige tu Beneficio de Golpe de Gigante',
      description: 'Selecciona 1 beneficio elemental de gigante para potenciar tus impactos de arma:',
      maxSelections: 1,
      options: [
        {
          id: 'cloud-strike',
          name: 'Golpe de las Nubes (Cloud Strike)',
          desc: 'El objetivo sufre 1d4 puntos de daño de trueno adicional. Si es una criatura, debe superar una tirada de salvación de Sabiduría (CD 8 + PB + Fue/Con) o te vuelves invisible para ella hasta el comienzo de tu siguiente turno o hasta inmediatamente después de hacer una tirada de ataque o lanzar un conjuro.',
        },
        {
          id: 'fire-strike',
          name: 'Golpe de Fuego (Fire Strike)',
          desc: 'El objetivo sufre 1d10 puntos de daño de fuego adicional.',
        },
        {
          id: 'frost-strike',
          name: 'Golpe de Escarcha (Frost Strike)',
          desc: 'El objetivo sufre 1d6 puntos de daño de frío adicional. Si es una criatura, debe superar una tirada de salvación de Constitución o su velocidad se reduce a 0 hasta el comienzo de tu siguiente turno.',
        },
        {
          id: 'hill-strike',
          name: 'Golpe de la Colina (Hill Strike)',
          desc: 'El objetivo sufre 1d6 puntos de daño adicional del mismo tipo que el arma. Si es una criatura, debe superar una tirada de salvación de Fuerza o cae derribada al suelo (condición Tumbado/Prone).',
        },
        {
          id: 'stone-strike',
          name: 'Golpe de Piedra (Stone Strike)',
          desc: 'El objetivo sufre 1d6 puntos de daño de fuerza adicional. Si es una criatura, debe superar una tirada de salvación de Fuerza o es empujada 10 pies (3 metros) en línea recta lejos de ti.',
        },
        {
          id: 'storm-strike',
          name: 'Golpe de la Tormenta (Storm Strike)',
          desc: 'El objetivo sufre 1d6 puntos de daño de relámpago adicional. Si es una criatura, debe superar una tirada de salvación de Constitución o tiene desventaja en las tiradas de ataque hasta el comienzo de tu siguiente turno.',
        },
      ],
    },
  },
  {
    id: 'rune-shaper',
    name: 'Modelador de Runas (Rune Shaper)',
    nameEn: 'Rune Shaper',
    category: 'Magia',
    prerequisite: 'Rasgo de Conjurador o trasfondo Grabador de Runas (Rune Carver)',
    description:
      'Has estudiado la antigua magia rúnica de los gigantes. Aprendes el conjuro Comprender Idiomas (Comprehend Languages) y puedes lanzarlo como ritual sin gastar espacio de conjuro. Además, grabas runas mágicas en tu equipo tras cada descanso largo, permitiéndote lanzar los conjuros vinculados a cada runa una vez por descanso largo sin gastar espacios de conjuro.',
    benefits: [
      'Aprendes el conjuro Comprender Idiomas y puedes lanzarlo como un ritual sin gastar espacios de conjuro.',
      'Tras cada descanso largo, inscribes runas de gigantes en tu equipo. Puedes lanzar el conjuro asociado a cada runa inscrita una vez por descanso largo sin gastar espacio de conjuro.',
      'Tu aptitud mágica para estos conjuros es Inteligencia, Sabiduría o Carisma (a tu elección al adquirir la dote).',
    ],
    subChoice: {
      title: 'Elige tu Runa de Gigante Inscrita',
      description: 'Selecciona la runa ancestral que inscribirás en tu equipo:',
      maxSelections: 1,
      options: [
        { id: 'cloud-rune', name: 'Runa de las Nubes (Cloud Rune)', desc: 'Te permite lanzar el conjuro Niebla Nubosa (Fog Cloud).' },
        { id: 'dragon-rune', name: 'Runa del Dragón (Dragon Rune)', desc: 'Te permite lanzar el conjuro Onda Atronadora (Thunderwave).' },
        { id: 'fire-rune', name: 'Runa de Fuego (Fire Rune)', desc: 'Te permite lanzar el conjuro Manos Ardientes (Burning Hands).' },
        { id: 'frost-rune', name: 'Runa de Escarcha (Frost Rune)', desc: 'Te permite lanzar el conjuro Armadura de Agathys (Armor of Agathys).' },
        { id: 'hill-rune', name: 'Runa de la Colina (Hill Rune)', desc: 'Te permite lanzar el conjuro Buenas Bayas (Goodberry).' },
        { id: 'stone-rune', name: 'Runa de Piedra (Stone Rune)', desc: 'Te permite lanzar el conjuro Santuario (Sanctuary).' },
        { id: 'storm-rune', name: 'Runa de la Tormenta (Storm Rune)', desc: 'Te permite lanzar el conjuro Rayo de Hechicería (Witch Bolt).' },
      ],
    },
  },
  {
    id: 'squire-of-solamnia',
    name: 'Escudero de Solamnia (Squire of Solamnia)',
    nameEn: 'Squire of Solamnia',
    category: 'Combate',
    prerequisite: 'Trasfondo Caballero de Solamnia o competencia con armadura intermedia y armas marciales',
    description:
      'Te has entrenado al servicio de los venerables Caballeros de Solamnia. Has aprendido a montar con destreza inigualable y a canalizar el entrenamiento militar para asestar golpes devastadores.',
    benefits: [
      'Montar o desmontar de una montura te cuesta solo 5 pies de movimiento en lugar de la mitad de tu velocidad.',
      'Ataque Preciso: Un número de veces igual a tu bonificador de competencia por descanso largo, cuando haces una tirada de ataque con arma y tienes ventaja, puedes añadir 1d8 al daño de impacto. Si el ataque falla, no gastas el uso.',
    ],
  },
  {
    id: 'initiate-of-high-sorcery',
    name: 'Iniciado en la Alta Hechicería (Initiate of High Sorcery)',
    nameEn: 'Initiate of High Sorcery',
    category: 'Magia',
    prerequisite: 'Trasfondo Mago de la Alta Hechicería o rasgo de lanzamiento de conjuros',
    description:
      'Has sido iniciado en los secretos arcanos de las tres lunas de Krynn (Solinari la Blanca, Lunitari la Roja o Nuitari la Negra), vinculando tu magia a su órbita divina.',
    benefits: [
      'Eliges una de las tres lunas de Krynn: Solinari (Blanca), Lunitari (Roja) o Nuitari (Negra).',
      'Aprendes un truco de la orden elegida y dos conjuros de 1er nivel correspondientes.',
      'Puedes lanzar uno de los conjuros de 1er nivel elegidos una vez por descanso largo sin gastar ranura de conjuro. Puedes usar Inteligencia, Sabiduría o Carisma como característica de conjuro.',
    ],
    subChoice: {
      title: 'Elige tu Luna de Alta Hechicería',
      description: 'Selecciona la luna de Krynn que guía tus estudios mágicos:',
      maxSelections: 1,
      options: [
        { id: 'solinari', name: 'Solinari (Túnicas Blancas)', desc: 'Magia de protección y adivinación: Aprendes Luz o Taumaturgia, y conjuros como Comprensión Idiomática, Armadura de Mago o Escudo.' },
        { id: 'lunitari', name: 'Lunitari (Túnicas Rojas)', desc: 'Magia de ilusión y transmutación: Aprendes Ilusión Menor o Remendar, y conjuros como Disfrazarse, Caída de Pluma o Salto.' },
        { id: 'nuitari', name: 'Nuitari (Túnicas Negras)', desc: 'Magia de nigromancia y encantamiento: Aprendes Toque Helado o Luces Danzantes, y conjuros como Falsa Vida, Hechizar Persona o Rayo de Enfermedad.' },
      ],
    },
  },
  {
    id: 'scion-of-the-outer-planes',
    name: 'Vástago de los Planos Exteriores (Scion of the Outer Planes)',
    nameEn: 'Scion of the Outer Planes',
    category: 'Magia',
    prerequisite: 'Trasfondo Guardián del Portal o Filósofo Planar',
    description:
      'Estás sintonizado con las energías cósmicas de los Planos Exteriores del multiverso, absorbiendo su magia y adquiriendo resistencia a sus energías primordiales.',
    benefits: [
      'Ganas resistencia a un tipo de daño y aprendes un truco según el plano exterior elegido.',
      'Tu aptitud mágica para el truco es Inteligencia, Sabiduría o Carisma.',
    ],
    subChoice: {
      title: 'Elige tu Plano Exterior Vinculado',
      description: 'Selecciona la región cósmica que imbuye tu alma:',
      maxSelections: 1,
      options: [
        { id: 'outer-chaos', name: 'Planos del Caos (Abismo / Limbo)', desc: 'Resistencia a daño de Veneno. Aprendes el truco Salpicadura Ácida o Ráfaga de Veneno.' },
        { id: 'outer-law', name: 'Planos de la Ley (Mechanus / Aqueronte)', desc: 'Resistencia a daño de Fuerza. Aprendes el truco Impacto Certero o Ráfaga de Espadas.' },
        { id: 'outer-good', name: 'Planos Superiores (Monte Celestia / Elíseo)', desc: 'Resistencia a daño Radiante. Aprendes el truco Llama Sagrada o Luz.' },
        { id: 'outer-evil', name: 'Planos Inferiores (Nueve Infiernos / Hades)', desc: 'Resistencia a daño Necrótico. Aprendes el truco Rayo de Fuego o Descarga Fría.' },
        { id: 'outer-astral', name: 'Mar Astral / Neutralidad Cósmica)', desc: 'Resistencia a daño Psíquico. Aprendes el truco Mensaje o Ilusión Menor.' },
      ],
    },
  },
  {
    id: 'strixhaven-initiate',
    name: 'Iniciado de Strixhaven (Strixhaven Initiate)',
    nameEn: 'Strixhaven Initiate',
    category: 'Magia',
    prerequisite: 'Trasfondo de Estudiante de Strixhaven',
    description:
      'Has completado tu primer año de estudios en la célebre universidad arcana de Strixhaven, aprendiendo las disciplinas fundamentales de uno de sus cinco colegios.',
    benefits: [
      'Aprendes dos trucos y un conjuro de 1er nivel de la lista de conjuros de tu colegio elegido.',
      'Puedes lanzar el conjuro de 1er nivel una vez por descanso largo sin gastar ranura de conjuro. Puedes lanzarlo también usando tus ranuras normales.',
      'Tu aptitud mágica para estos conjuros es Inteligencia, Sabiduría o Carisma (a tu elección).',
    ],
    subChoice: {
      title: 'Elige tu Colegio de Strixhaven',
      description: 'Selecciona el colegio donde cursas tus estudios arcanos:',
      maxSelections: 1,
      options: [
        { id: 'lorehold', name: 'Lorehold (Historia & Magia)', desc: 'Lista de Clérigo o Mago. Especializado en revivir el pasado y manipular la luz y las ruinas.' },
        { id: 'prismari', name: 'Prismari (Arte & Elementos)', desc: 'Lista de Bardo o Hechicero. Especializado en expresión elemental de fuego, agua y trueno.' },
        { id: 'quandrix', name: 'Quandrix (Matemáticas & Naturaleza)', desc: 'Lista de Druida o Mago. Especializado en geometría fractal, espacio y biología cósmica.' },
        { id: 'silverquill', name: 'Silverquill (Elocuencia & Sombras)', desc: 'Lista de Bardo o Clérigo. Especializado en poesía de luz, tinta y verbo hiriente.' },
        { id: 'witherbloom', name: 'Witherbloom (Vida & Descomposición)', desc: 'Lista de Druida o Brujo. Especializado en pociones, vitalidad y muerte orgánica.' },
      ],
    },
  },
  {
    id: 'guile-of-the-cloud-giant',
    name: 'Astucia del Gigante de las Nubes (Guile of the Cloud Giant)',
    nameEn: 'Guile of the Cloud Giant',
    category: 'Combate',
    prerequisite: 'Nivel 4, Dote Golpe de los Gigantes (Golpe de las Nubes)',
    description:
      'Manifestando la magia ilusoria y la niebla de los gigantes de las nubes, puedes desvanecerte en el aire cuando eres atacado y escapar sin dejar rastro.',
    benefits: [
      'Aumenta tu puntuación de Fuerza, Constitución o Carisma en +1 (hasta un máximo de 20).',
      'Escape Nuboso (Misty Flee): Cuando recibes daño de un ataque, puedes usar tu reacción para volverte invisible mágicamente y teletransportarte hasta 30 pies a un espacio desocupado que puedas ver. La invisibilidad dura hasta el inicio de tu siguiente turno o hasta que hagas un ataque o lances un conjuro. Puedes usar este rasgo un número de veces igual a tu PB por descanso largo.',
    ],
    abilityBonus: { stats: ['str', 'con', 'cha'], amount: 1 },
  },
  {
    id: 'fury-of-the-frost-giant',
    name: 'Furia del Gigante de Escarcha (Fury of the Frost Giant)',
    nameEn: 'Fury of the Frost Giant',
    category: 'Combate',
    prerequisite: 'Nivel 4, Dote Golpe de los Gigantes (Golpe de Escarcha)',
    description:
      'Has adoptado la resistencia glacial del invierno eterno de los gigantes de escarcha, castigando a quienes se atreven a golpearte congelando sus articulaciones.',
    benefits: [
      'Aumenta tu puntuación de Fuerza, Constitución o Sabiduría en +1 (hasta un máximo de 20).',
      'Hijo del Frío: Ganas resistencia al daño de frío.',
      'Represalia Frígida: Cuando una criatura a 30 pies o menos te inflige daño, puedes usar tu reacción para obligarla a hacer una salvación de Constitución (CD 8 + PB + mod elegido). Si falla, recibe 1d8 + tu PB de daño de frío y su velocidad se reduce a 0 hasta el inicio de su siguiente turno. Puedes usarlo PB veces por descanso largo.',
    ],
    abilityBonus: { stats: ['str', 'con', 'wis'], amount: 1 },
  },
  {
    id: 'vigor-of-the-hill-giant',
    name: 'Vigor del Gigante de la Colina (Vigor of the Hill Giant)',
    nameEn: 'Vigor of the Hill Giant',
    category: 'Combate',
    prerequisite: 'Nivel 4, Dote Golpe de los Gigantes (Golpe de la Colina)',
    description:
      'Imbuido de la fuerza descomunal y la voracidad inquebrantable de los gigantes de las colinas, tu cuerpo se vuelve una masa inconmovible de resistencia física.',
    benefits: [
      'Aumenta tu puntuación de Fuerza, Constitución o Sabiduría en +1 (hasta un máximo de 20).',
      'Inamovible como la Colina: Si un efecto te derribaría o te movería contra tu voluntad a lo largo del suelo, puedes usar tu reacción para no ser movido ni derribado.',
      'Vitalidad Colosal: Siempre que recuperes puntos de golpe usando uno o más dados de golpe (por ejemplo en un descanso corto), añades tu bonificador de competencia a la cantidad de PG recuperados por cada dado de golpe gastado.',
    ],
    abilityBonus: { stats: ['str', 'con', 'wis'], amount: 1 },
  },
  {
    id: 'ember-of-the-fire-giant',
    name: 'Ascua del Gigante de Fuego (Ember of the Fire Giant)',
    nameEn: 'Ember of the Fire Giant',
    category: 'Combate',
    prerequisite: 'Nivel 4, Dote Golpe de los Gigantes (Golpe de Fuego)',
    description:
      'El calor del magma y las forjas volcánicas arden en tus venas, permitiéndote resistir las llamas más intensas y cegar a tus enemigos con estallidos de brasas incandescentes.',
    benefits: [
      'Aumenta tu puntuación de Fuerza, Constitución o Carisma en +1 (hasta un máximo de 20).',
      'Nacido del Fuego: Ganas resistencia al daño de fuego.',
      'Ignición Abrasadora: Como acción adicional, desatas una lluvia de brasas en un radio de 15 pies centrado en ti. Cada criatura a tu elección en esa área debe hacer una salvación de Destreza (CD 8 + PB + mod elegido): si falla, sufre 1d8 + PB de daño de fuego y queda cegada hasta el inicio de tu siguiente turno; si tiene éxito, sufre la mitad del daño y no queda cegada (PB veces por descanso largo).',
    ],
    abilityBonus: { stats: ['str', 'con', 'cha'], amount: 1 },
  },
  {
    id: 'keenness-of-the-stone-giant',
    name: 'Agudeza del Gigante de Piedra (Keenness of the Stone Giant)',
    nameEn: 'Keenness of the Stone Giant',
    category: 'Combate',
    prerequisite: 'Nivel 4, Dote Golpe de los Gigantes (Golpe de Piedra)',
    description:
      'Heredas la visión pétrea y la puntería infalible de los gigantes de piedra, convirtiendo cualquier roca en un proyectil devastador de fuerza elemental.',
    benefits: [
      'Aumenta tu puntuación de Fuerza, Constitución o Sabiduría en +1 (hasta un máximo de 20).',
      'Visión en la Oscuridad a 60 pies (o añade 60 pies adicionales si ya la tenías).',
      'Lanzamiento de Roca: Como acción adicional, tomas una piedra o escombro pequeño e imbuyes de magia tu lanzamiento. Haces un ataque de arma a distancia (alcance 60 pies) que inflige 1d10 + mod Fuerza de daño de fuerza. Si el objetivo es de tamaño Grande o menor, debe superar una salvación de Fuerza o caerá derribado (PB veces por descanso largo).',
    ],
    abilityBonus: { stats: ['str', 'con', 'wis'], amount: 1 },
  },
  {
    id: 'soul-of-the-storm-giant',
    name: 'Alma del Gigante de la Tormenta (Soul of the Storm Giant)',
    nameEn: 'Soul of the Storm Giant',
    category: 'Combate',
    prerequisite: 'Nivel 4, Dote Golpe de los Gigantes (Golpe de la Tormenta)',
    description:
      'Canalizas los vientos huracanados y los truenos de los gigantes de la tormenta, creando un vórtice a tu alrededor que desvía proyectiles y frena el avance enemigo.',
    benefits: [
      'Aumenta tu puntuación de Fuerza, Constitución o Carisma en +1 (hasta un máximo de 20).',
      'Nacido de la Tormenta: Ganas resistencia al daño de relámpago y trueno.',
      'Aura de Tempestad: Como acción adicional, te envuelves en un torbellino de 10 pies durante 1 minuto. Los ataques a distancia contra ti tienen desventaja, y cualquier criatura hostil que empiece su turno en el aura debe superar una salvación de Fuerza o su velocidad se reducirá a la mitad hasta el inicio de su siguiente turno (1/descanso largo o usando un espacio de conjuro de nivel 2 o superior).',
    ],
    abilityBonus: { stats: ['str', 'con', 'cha'], amount: 1 },
  },
  {
    id: 'artillero',
    name: 'Artillero (Gunner)',
    nameEn: 'Gunner',
    category: 'Combate',
    prerequisite: 'Ninguno',
    description:
      'Posees una mano firme y una puntería prodigiosa con armas de fuego, permitiéndote disparar y recargar a quemarropa con velocidad sobrehumana.',
    benefits: [
      'Aumenta tu puntuación de Destreza en +1 (hasta un máximo de 20).',
      'Ganas competencia con armas de fuego.',
      'Ignoras la propiedad de recarga (loading) de las armas de fuego.',
      'Estar a 5 pies de una criatura hostil no impone desventaja en tus tiradas de ataque a distancia.',
    ],
    abilityBonus: { stats: ['dex'], amount: 1 },
  },
  {
    id: 'don-dragon-cromatico',
    name: 'Don del Dragón Cromático (Gift of the Chromatic Dragon)',
    nameEn: 'Gift of the Chromatic Dragon',
    category: 'Combate',
    prerequisite: 'Ninguno',
    description:
      'Has manifestado la esencia elemental despiadada de los dragones cromáticos (rojo, azul, verde, negro, blanco) para imbuir tus armas y resistir sus alientos.',
    benefits: [
      'Infusión Cromática: Como acción adicional tocas un arma sencilla o marcial. Durante 1 minuto, esa arma inflige 1d4 de daño adicional del tipo elegido (ácido, frío, fuego, relámpago o veneno) en cada impacto (1/descanso largo).',
      'Resistencia Reactiva: Cuando recibes daño de ácido, frío, fuego, relámpago o veneno, puedes usar tu reacción para ganar resistencia contra esa instancia de daño (PB veces por descanso largo).',
    ],
  },
  {
    id: 'don-dragon-metalico',
    name: 'Don del Dragón Metálico (Gift of the Metallic Dragon)',
    nameEn: 'Gift of the Metallic Dragon',
    category: 'Combate',
    prerequisite: 'Ninguno',
    description:
      'Bendecido con la nobleza y compasión de los dragones metálicos (oro, plata, bronce, cobre, latón), puedes proteger a tus aliados con alas espectrales y curar heridas.',
    benefits: [
      'Sanación Dracónica: Aprendes el conjuro Curar Heridas (Cure Wounds) y puedes lanzarlo una vez por descanso largo sin gastar ranura de conjuro (o usando tus ranuras normales). Característica de conjuro: Int, Sab o Car.',
      'Alas Protectoras: Como reacción cuando tú o una criatura a 5 pies sois impactados por un ataque, manifiestas un par de alas espectrales que suman tu bonificador de competencia a la CA contra ese ataque (PB veces por descanso largo).',
    ],
  },
  {
    id: 'don-dragon-gema',
    name: 'Don del Dragón Gema (Gift of the Gem Dragon)',
    nameEn: 'Gift of the Gem Dragon',
    category: 'Combate',
    prerequisite: 'Ninguno',
    description:
      'Imbuido de la mente psiónica de los dragones gema (amatista, esmeralda, zafiro, topacio, cristal), puedes repeler violentamente a quienes se atrevan a golpearte.',
    benefits: [
      'Aumenta tu puntuación de Inteligencia, Sabiduría o Carisma en +1 (hasta un máximo de 20).',
      'Repulsión Telequinética: Cuando recibes daño de una criatura a 10 pies de ti, puedes usar tu reacción para liberar una onda psiónica. El atacante debe superar una tirada de salvación de Fuerza (CD 8 + PB + mod elegido) o sufrirá 2d8 de daño de fuerza y será empujado 10 pies en línea recta lejos de ti (PB veces por descanso largo).',
    ],
    abilityBonus: { stats: ['int', 'wis', 'cha'], amount: 1 },
  },
  {
    id: 'combatiente-montado',
    name: 'Combatiente Montado (Mounted Combatant)',
    nameEn: 'Mounted Combatant',
    category: 'Combate',
    prerequisite: 'Ninguno',
    description:
      'Eres un jinete consumado que domina el campo de batalla a lomos de tu montura, usando tu altura y velocidad para superar a cualquier rival a pie.',
    benefits: [
      'Tienes ventaja en tiradas de ataque cuerpo a cuerpo contra cualquier criatura no montada que sea de tamaño inferior a tu montura.',
      'Puedes obligar a que cualquier ataque dirigido a tu montura te tome a ti como objetivo en su lugar.',
      'Si tu montura sufre un efecto que permite una tirada de salvación de Destreza para recibir la mitad del daño, no recibe daño si supera la salvación y solo la mitad si falla.',
    ],
  },
  {
    id: 'cargador',
    name: 'Cargador (Charger)',
    nameEn: 'Charger',
    category: 'Combate',
    prerequisite: 'Ninguno',
    description:
      'Te arrojas contra el enemigo a una velocidad aterradora, transformando el impulso de tu carrera en una fuerza demoledora que aplasta o derriba.',
    benefits: [
      'Cuando realizas la acción de Carrera (Dash), puedes usar una acción adicional para hacer un ataque con arma cuerpo a cuerpo o empujar a una criatura.',
      'Si te mueves al menos 10 pies en línea recta inmediatamente antes de realizar la acción adicional, puedes elegir infligir +5 puntos de daño adicional al impactar con el arma o empujar a la criatura hasta 10 pies de distancia (en lugar de 5 pies).',
    ],
  },
];

// ==========================================
// CALCULADOR DE MEJORAS DE CARACTERÍSTICA (ASI) / DOTES
// ==========================================
export const getAvailableAsiCount = (classId: string, level: number, isVariantHuman: boolean): number => {
  let count = 0;
  if (isVariantHuman) count += 1; // Humano variante otorga 1 dote a nivel 1

  const standardLevels = [4, 8, 12, 16, 19];
  standardLevels.forEach((lvl) => {
    if (level >= lvl) count += 1;
  });

  if (classId === 'guerrero') {
    if (level >= 6) count += 1;
    if (level >= 14) count += 1;
  } else if (classId === 'picaro') {
    if (level >= 10) count += 1;
  }

  return count;
};

// ==========================================
// CONFIGURACIÓN DE PERICIA (EXPERTISE / DOBLE PROFICIENCY)
// ==========================================
export const getExpertiseConfig = (
  classId: string,
  level: number
): { allowedCount: number; title: string; desc: string } => {
  if (classId === 'picaro') {
    const allowed = level >= 6 ? 4 : 2;
    return {
      allowedCount: allowed,
      title: 'Pericia de Pícaro (Expertise x2)',
      desc:
        level >= 6
          ? 'Como Pícaro de nivel 6+, eliges 4 habilidades con competencia para duplicar tu bonificador de competencia.'
          : 'Como Pícaro de nivel 1+, eliges 2 habilidades con competencia para duplicar tu bonificador de competencia.',
    };
  }
  if (classId === 'bardo') {
    if (level >= 3) {
      const allowed = level >= 10 ? 4 : 2;
      return {
        allowedCount: allowed,
        title: 'Pericia de Bardo (Expertise x2)',
        desc:
          level >= 10
            ? 'Como Bardo de nivel 10+, eliges 4 habilidades con competencia para duplicar tu bonificador de competencia.'
            : 'Como Bardo de nivel 3+, eliges 2 habilidades con competencia para duplicar tu bonificador de competencia.',
      };
    }
  }
  if (classId === 'explorador' && level >= 1) {
    return {
      allowedCount: 1,
      title: 'Explorador Sagaz (Canny x2)',
      desc: 'Elige 1 habilidad en la que tengas competencia para duplicar tu bonificador de competencia.',
    };
  }
  return { allowedCount: 0, title: '', desc: '' };
};
