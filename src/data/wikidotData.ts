// Base de datos completa inspirada en dnd5e.wikidot.com
// Razas, Subrazas, Clases, Subclases y Trasfondos oficiales de D&D 5e en Español

export interface WikidotSubrace {
  id: string;
  name: string;
  description: string;
  replacesBaseBonuses?: boolean;
  abilityScoreBonuses: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
    any?: number;
  };
  traits: { name: string; desc: string }[];
  innateSpells?: { spellName: string; requiredLevel: number }[];
}

export type WikidotRaceCategory = 'Común' | 'Exótica' | 'Monstruosa' | 'Planar';

export interface WikidotRace {
  id: string;
  name: string;
  category?: WikidotRaceCategory;
  description: string;
  speed: string;
  size: 'Pequeño' | 'Mediano';
  darkvision: number; // en pies
  abilityScoreBonuses: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
    any?: number;
  };
  traits: { name: string; desc: string }[];
  languages: string[];
  innateSpells?: { spellName: string; requiredLevel: number }[];
  subraces?: WikidotSubrace[];
}

export interface WikidotClass {
  id: string;
  name: string;
  description: string;
  hitDie: 6 | 8 | 10 | 12;
  primaryAbility: string;
  savingThrows: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  isSpellcaster: boolean;
  casterType?: 'full' | 'half' | 'pact' | 'third' | 'none';
  spellcastingAbility?: 'int' | 'wis' | 'cha';
  subclassesName: string;
  subclassUnlockLevel?: number;
  subclasses: {
    id: string;
    name: string;
    description: string;
    features: { level: number; name: string; desc: string }[];
    isCasterSubclass?: boolean;
    spellcastingAbility?: 'int' | 'wis' | 'cha';
  }[];
  featuresByLevel: { level: number; name: string; desc: string }[];
  defaultResources?: {
    id: string;
    name: string;
    calculateMax: (level: number) => number;
    resetOn: 'short' | 'long';
    diceType?: string;
    description: string;
  }[];
}

export { formatBackgroundWealth } from './wikidotBackgroundsData';
export type {
  BackgroundCategory,
  BackgroundOrientation,
  WikidotBackground,
  BackgroundEquipmentChoice,
} from './wikidotBackgroundsData';
import { EXPANDED_SUBCLASSES_BY_CLASS, ARTIFICER_CLASS } from './wikidotSubclassesExpanded';

// ==========================================
// 1. RAZAS (RACES DE WIKIDOT 5E)
// ==========================================
export { WIKIDOT_RACES } from './wikidotRacesData';

// ==========================================
// 2. CLASES (CLASSES DE WIKIDOT 5E)
// ==========================================
const BASE_WIKIDOT_CLASSES: WikidotClass[] = [
  {
    id: 'barbaro',
    name: 'Bárbaro',
    description: 'Un guerrero feroz de extracción primitiva capaz de entrar en una furia de batalla devastadora.',
    hitDie: 12,
    primaryAbility: 'Fuerza',
    savingThrows: ['Fuerza', 'Constitución'],
    armorProficiencies: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciales'],
    isSpellcaster: false,
    casterType: 'none',
    subclassesName: 'Senda Primitiva',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-furia',
        name: 'Usos de Furia',
        calculateMax: (lvl) => (lvl >= 17 ? 6 : lvl >= 12 ? 5 : lvl >= 6 ? 4 : lvl >= 3 ? 3 : 2),
        resetOn: 'long',
        description: 'En furia ganas ventaja en pruebas/salvaciones de Fuerza, bonificador de daño (+2 a +4) y resistencia a daño contundente, perforante y cortante.',
      },
    ],
    subclasses: [
      {
        id: 'berserker',
        name: 'Camino del Berserker',
        description: 'Canalizan la violencia desatada en un frenesí sanguinario imparable.',
        features: [
          { level: 3, name: 'Frenesí (Frenzy)', desc: 'Al entrar en furia, puedes hacer un ataque cuerpo a cuerpo adicional con tu acción adicional en cada turno. Sufres 1 nivel de agotamiento al terminar la furia.' },
          { level: 6, name: 'Furia Sin Mente', desc: 'No puedes ser hechizado ni asustado mientras estés en furia.' },
          { level: 10, name: 'Presencia Intimidante', desc: 'Como acción, atemorizas a una criatura a 30 pies si falla una salvación de Sabiduría (CD 8 + prof + Car).' },
          { level: 14, name: 'Represalia', desc: 'Reacción: cuando una criatura a 5 pies te inflija daño, realizas un ataque cuerpo a cuerpo con arma contra ella.' },
        ],
      },
      {
        id: 'guerrero-totemico',
        name: 'Camino del Guerrero Totémico',
        description: 'Adquieren espíritus guía de animales que otorgan resistencia y poder sobrenatural.',
        features: [
          { level: 3, name: 'Buscador de Espíritus', desc: 'Puedes lanzar Sentido Bestial y Hablar con Animales como rituales.' },
          { level: 3, name: 'Espíritu Totémico (Oso / Águila / Lobo)', desc: 'Oso: resistencia a todo el daño excepto psíquico. Águila: correr como acción adicional. Lobo: aliados tienen ventaja contra enemigos adyacentes a ti.' },
          { level: 6, name: 'Aspecto de la Bestia', desc: 'Oso: capacidad de carga duplicada. Águila: ves a 1 milla sin problemas y sin desventaja con luz tenue. Lobo: rastreas a paso rápido.' },
          { level: 10, name: 'Caminante Espiritual', desc: 'Puedes lanzar Comunión con la Naturaleza como un ritual.' },
          { level: 14, name: 'Sintonía Totémica', desc: 'Oso: enemigos a 5 pies tienen desventaja al atacar a otros. Águila: vuelas en breves ráfagas. Lobo: derribas enemigos con acción adicional.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Furia (Rage)', desc: 'Bonificador de daño +2 cuerpo a cuerpo, ventaja en pruebas de Fuerza y resistencia a daño físico (contundente, perforante, cortante).' },
      { level: 1, name: 'Defensa sin Armadura', desc: 'Cuando no llevas armadura, tu CA es igual a 10 + Modificador de Destreza + Modificador de Constitución (+ escudo si lo usas).' },
      { level: 2, name: 'Ataque Temerario (Reckless Attack)', desc: 'Puedes ganar ventaja en tus ataques cuerpo a cuerpo en tu turno; a cambio, los ataques contra ti tienen ventaja hasta tu siguiente turno.' },
      { level: 2, name: 'Sentido del Peligro (Danger Sense)', desc: 'Ventaja en salvaciones de Destreza contra efectos que puedas ver (trampas, conjuros).' },
      { level: 3, name: 'Senda Primitiva (Subclase)', desc: 'Eliges una senda que moldea la naturaleza de tu furia (Berserker, Guerrero Totémico, etc.), obteniendo rasgos a niveles 3, 6, 10 y 14.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
      { level: 5, name: 'Movimiento Rápido', desc: 'Tu velocidad terrestre aumenta en 10 pies mientras no lleves armadura pesada.' },
      { level: 6, name: 'Rasgo de Senda Primitiva', desc: 'Obtienes un nuevo rasgo otorgado por la senda primitiva elegida a nivel 3.' },
      { level: 7, name: 'Instinto Salvaje', desc: 'Ganas ventaja en tiradas de Iniciativa. Si estás sorprendido al inicio del combate, puedes actuar normalmente si entras en furia de inmediato.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Crítico Brutal (1 dado)', desc: 'Tiras un dado de daño de arma adicional al determinar el daño adicional por un impacto crítico cuerpo a cuerpo.' },
      { level: 10, name: 'Rasgo de Senda Primitiva', desc: 'Obtienes un nuevo rasgo otorgado por la senda primitiva elegida a nivel 3.' },
      { level: 11, name: 'Furia Implacable', desc: 'Si caes a 0 puntos de golpe mientras estás en furia y no mueres, puedes hacer una salvación de Constitución CD 10 para quedar a 1 PG. La CD aumenta en 5 por uso sucesivo.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Crítico Brutal (2 dados)', desc: 'Tiras dos dados de daño de arma adicionales al determinar el daño adicional por un impacto crítico cuerpo a cuerpo.' },
      { level: 14, name: 'Rasgo de Senda Primitiva', desc: 'Obtienes un nuevo rasgo legendario otorgado por la senda primitiva elegida a nivel 3.' },
      { level: 15, name: 'Furia Persistente', desc: 'Tu furia es tan intensa que solo termina antes de su tiempo si caes inconsciente o decides terminarla tú mismo.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Crítico Brutal (3 dados)', desc: 'Tiras tres dados de daño de arma adicionales al determinar el daño adicional por un impacto crítico cuerpo a cuerpo.' },
      { level: 18, name: 'Poderío Indómito', desc: 'Si el resultado total de una prueba de Fuerza es menor que tu puntuación de característica de Fuerza, puedes usar tu puntuación en lugar del resultado.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Campeón Primitivo', desc: 'Encarnas la ferocidad pura de la naturaleza. Tus puntuaciones de Fuerza y Constitución aumentan en 4 (máximo 24), y tus usos de furia pasan a ser ilimitados.' },
    ],
  },
  {
    id: 'mago',
    name: 'Mago (Wizard)',
    description: 'Un estudiante erudito de la magia arcana que conjura hechizos mediante el estudio riguroso y su libro de conjuros.',
    hitDie: 6,
    primaryAbility: 'Inteligencia',
    savingThrows: ['Inteligencia', 'Sabiduría'],
    armorProficiencies: ['Ninguna'],
    weaponProficiencies: ['Dagas', 'Dardos', 'Hondas', 'Bastones', 'Ballestas ligeras'],
    isSpellcaster: true,
    casterType: 'full',
    spellcastingAbility: 'int',
    subclassesName: 'Tradición Arcana',
    subclassUnlockLevel: 2,
    defaultResources: [
      {
        id: 'res-recuperacion-arcana',
        name: 'Recuperación Arcana',
        calculateMax: () => 1,
        resetOn: 'long',
        description: 'Una vez al día tras un descanso corto, puedes recuperar ranuras de conjuro cuya suma de niveles sea menor o igual a la mitad de tu nivel de mago.',
      },
    ],
    subclasses: [
      {
        id: 'escuela-abjuracion',
        name: 'Escuela de Abjuración (School of Abjuration)',
        description: 'Maestros de barreras protectoras, sellos de confinamiento, destierro y disipación mágica.',
        features: [
          { level: 2, name: 'Erudito de la Abjuración', desc: 'El oro y tiempo necesarios para copiar un conjuro de abjuración en tu libro de conjuros se reducen a la mitad.' },
          { level: 2, name: 'Guarda Arcana (Arcane Ward)', desc: 'Al lanzar un conjuro de abjuración de nivel 1 o mayor, tejes una barrera mágica con puntos de golpe iguales a (2 x nivel de mago) + Mod. Inteligencia. La guarda absorbe daño entrante antes de tocar tus puntos de golpe.' },
          { level: 6, name: 'Guarda Proyectada', desc: 'Cuando una criatura a 30 pies reciba daño, puedes usar tu reacción para que tu Guarda Arcana intercepte ese daño en su lugar.' },
          { level: 10, name: 'Abjuración Mejorada', desc: 'Añades tu bonificador por competencia a las pruebas de característica al lanzar Contconjuro o Disipar Magia.' },
          { level: 14, name: 'Resistencia a Conjuros', desc: 'Tienes ventaja en tiradas de salvación contra conjuros y resistencia al daño causado por conjuros.' },
        ],
      },
      {
        id: 'escuela-canto-hoja',
        name: 'Escuela del Canto de la Hoja (School of Bladesinging)',
        description: 'Tradición élfica milenaria que combina la esgrima rápida con la maestría de la magia arcana.',
        features: [
          { level: 2, name: 'Entrenamiento en Guerra y Canción', desc: 'Ganas competencia con armaduras ligeras, un tipo de arma cuerpo a cuerpo de una mano y la habilidad Actuación.' },
          { level: 2, name: 'Canto de la Hoja (Bladesong)', desc: 'Como acción adicional invocas el Canto de la Hoja por 1 minuto: sumas tu Mod. Inteligencia a tu CA, tu velocidad aumenta 10 pies, tienes ventaja en Acrobacias y sumas tu Mod. Inteligencia a las tiradas de salvación de Constitución para mantener la concentración.' },
          { level: 6, name: 'Ataque Adicional Mejorado', desc: 'Puedes atacar dos veces al tomar la acción de Atacar, y puedes lanzar uno de tus trucos en lugar de uno de esos ataques.' },
          { level: 10, name: 'Canción de Defensa', desc: 'Mientras el Canto de la Hoja esté activo, puedes usar tu reacción y gastar una ranura de conjuro para absorber daño igual a 5 x el nivel de la ranura gastada.' },
          { level: 14, name: 'Canción de Victoria', desc: 'Añades tu modificador de Inteligencia al daño de tus ataques con arma cuerpo a cuerpo mientras tu Canto de la Hoja está activo.' },
        ],
      },
      {
        id: 'escuela-cronurgia',
        name: 'Escuela de Cronurgia (School of Chronurgy)',
        description: 'Especialistas en la dunamancia temporal: manipulan el fluir del tiempo, la aceleración y los destinos alternos.',
        features: [
          { level: 2, name: 'Consciencia Temporal', desc: 'Añades tu modificador de Inteligencia a tus tiradas de iniciativa.' },
          { level: 2, name: 'Cambio Cronal (Chronal Shift)', desc: 'Reacción: después de que tú o una criatura a 30 pies tire un d20, puedes forzarle a volver a tirar y elegir el nuevo resultado (2 usos por descanso largo).' },
          { level: 6, name: 'Éxtasis Fugaz (Momentary Stasis)', desc: 'Acción: una criatura Grande o menor a 60 pies debe superar salvación de Con contra tu CD de conjuro o quedar Incapacitada hasta el final de tu siguiente turno.' },
          { level: 10, name: 'Gránulo Arcano (Arcane Abeyance)', desc: 'Al lanzar un conjuro de nivel 4 o menor, puedes condensarlo en una pequeña cuenta durante 1 hora. Cualquier criatura que la sostenga puede usar su acción para liberar el conjuro usando tus estadísticas.' },
          { level: 14, name: 'Convergencia de Destinos', desc: 'Reacción: cuando una criatura a 60 pies haga una tirada de ataque, salvación o prueba, decides si tiene éxito o falla automáticamente. Sufres un nivel de agotamiento al usarlo.' },
        ],
      },
      {
        id: 'escuela-conjuracion',
        name: 'Escuela de Conjuración (School of Conjuration)',
        description: 'Expertos en invocar criaturas de otros planos, teletransportación instantánea y crear objetos de la nada.',
        features: [
          { level: 2, name: 'Erudito de la Conjuración', desc: 'El oro y tiempo necesarios para copiar un conjuro de conjuración se reducen a la mitad.' },
          { level: 2, name: 'Conjuración Menor', desc: 'Acción: creas un objeto inanimado no mágico en tu mano o en el suelo a 10 pies (máximo 10 libras y 3 pies). Desaparece tras 1 hora o al recibir daño.' },
          { level: 6, name: 'Traslación Benigna', desc: 'Acción: te teletransportas hasta 30 pies a un espacio desocupado o intercambias posición con un aliado dispuesto. Se recarga con un descanso largo o al lanzar un conjuro de conjuración de nivel 1+.' },
          { level: 10, name: 'Conjuración Enfocada', desc: 'Tu concentración en un conjuro de conjuración no puede romperse como resultado de recibir daño.' },
          { level: 14, name: 'Invocaciones Duraderas', desc: 'Cualquier criatura que invoques o crees con un conjuro de conjuración gana 30 puntos de golpe temporales.' },
        ],
      },
      {
        id: 'escuela-adivinacion',
        name: 'Escuela de Adivinación (School of Divination)',
        description: 'Videntes que desvelan secretos del pasado, presente y futuro para guiar el destino.',
        features: [
          { level: 2, name: 'Erudito de la Adivinación', desc: 'Copiar conjuros de adivinación cuesta la mitad de oro y tiempo.' },
          { level: 2, name: 'Presagio (Portent)', desc: 'Al terminar un descanso largo tiras dos d20 y anotas los resultados. Puedes reemplazar cualquier tirada de ataque, salvación o prueba tuya o de una criatura visible por uno de esos números.' },
          { level: 6, name: 'Adivinador Experto', desc: 'Lanzar un conjuro de adivinación de nivel 2 o superior te devuelve una ranura de conjuro gastada de menor nivel (máximo nivel 5).' },
          { level: 10, name: 'El Tercer Ojo', desc: 'Acción: obtienes uno de los siguientes beneficios hasta descansar: Visión en la Oscuridad (60 pies), Visión Etérea (60 pies), Leer Cualquier Idioma, o Ver Invisibilidad (10 pies).' },
          { level: 14, name: 'Presagio Mayor', desc: 'Tiras tres dados d20 para tu rasgo de Presagio en lugar de dos.' },
        ],
      },
      {
        id: 'escuela-encantamiento',
        name: 'Escuela de Encantamiento (School of Enchantment)',
        description: 'Manipuladores de voluntades, emociones y mentes capaces de apaciguar o doblegar a sus adversarios.',
        features: [
          { level: 2, name: 'Erudito del Encantamiento', desc: 'Copiar conjuros de encantamiento cuesta la mitad de oro y tiempo.' },
          { level: 2, name: 'Mirada Hipnótica', desc: 'Acción: hipnotizas a una criatura a 5 pies que falle salvación de Sabiduría, dejándola Incapacitada y con velocidad 0 mientras mantengas la mirada cada turno.' },
          { level: 6, name: 'Encantamiento Instintivo', desc: 'Reacción: cuando una criatura te ataque, debe superar salvación de Sabiduría o redirigir su ataque a la criatura más cercana.' },
          { level: 10, name: 'Encantamiento Dividido', desc: 'Cuando lances un conjuro de encantamiento de nivel 1 o mayor que afecte a una sola criatura, puedes apuntar a una segunda criatura sin gastar más ranuras.' },
          { level: 14, name: 'Alterar Recuerdos', desc: 'Las criaturas encantadas por ti no se dan cuenta de que fueron encantadas, y puedes borrarles hasta (1 + Mod. Carisma) horas de memoria.' },
        ],
      },
      {
        id: 'escuela-evocacion',
        name: 'Escuela de Evocación (School of Evocation)',
        description: 'Especialistas supremos en magia destructiva elemental (fuego, rayo, hielo) y protección milimétrica de aliados.',
        features: [
          { level: 2, name: 'Erudito de la Evocación', desc: 'Copiar conjuros de evocación cuesta la mitad de oro y tiempo.' },
          { level: 2, name: 'Moldear Conjuros (Sculpt Spells)', desc: 'Creas bolsas de seguridad en tus conjuros de área: los aliados elegidos (1 + nivel del conjuro) superan automáticamente su salvación y no reciben daño si normalmente recibirían la mitad.' },
          { level: 6, name: 'Truco Potente', desc: 'Tus trucos dañan incluso si el objetivo supera la salvación (sufre la mitad del daño normal).' },
          { level: 10, name: 'Evocación Potenciada', desc: 'Añades tu modificador de Inteligencia a una tirada de daño de cualquier conjuro de evocación de mago que lances.' },
          { level: 14, name: 'Sobrecarga (Overchannel)', desc: 'Maximizas el daño de un conjuro de mago de niveles 1 a 5. El primer uso no tiene coste; usos adicionales antes de un descanso largo te infligen 2d12 de daño necrótico por nivel del conjuro.' },
        ],
      },
      {
        id: 'escuela-graviturgia',
        name: 'Escuela de Graviturgia (School of Graviturgy)',
        description: 'Dunamantes que doblegan los campos gravitatorios, aumentando el peso de los enemigos o haciéndolos ingrávidos.',
        features: [
          { level: 2, name: 'Ajustar Densidad', desc: 'Acción: concentras gravedad en una criatura u objeto para duplicar o reducir a la mitad su peso durante 1 minuto, alterando su velocidad, salto y ventajas en Fuerza.' },
          { level: 6, name: 'Atracción Gravitacional', desc: 'Cuando golpees a una criatura con un ataque o conjuro, puedes moverla 5 pies en cualquier dirección hacia un espacio desocupado.' },
          { level: 10, name: 'Pozo Violento (Violent Attraction)', desc: 'Reacción: aumentas el daño de impacto de una criatura que cae cerca de ti en 2d10, o aumentas el daño de un ataque con arma en 1d10.' },
          { level: 14, name: 'Horizonte de Sucesos (Event Horizon)', desc: 'Acción: emites un campo gravitatorio de 30 pies durante 1 minuto. Los enemigos en el área sufren 2d10 de daño de fuerza y su velocidad se reduce a 0 si fallan salvación de Fuerza.' },
        ],
      },
      {
        id: 'escuela-ilusion',
        name: 'Escuela de Ilusión (School of Illusion)',
        description: 'Artífices del engaño visual, espejismos y sombras que confunden los sentidos y desafían la realidad.',
        features: [
          { level: 2, name: 'Erudito de la Ilusión', desc: 'Copiar conjuros de ilusión cuesta la mitad de oro y tiempo.' },
          { level: 2, name: 'Ilusión Menor Mejorada', desc: 'Aprendes el truco Ilusión Menor. Al lanzarlo, puedes crear tanto un sonido como una imagen visual en el mismo conjuro.' },
          { level: 6, name: 'Ilusiones Maleables', desc: 'Acción: mientras una ilusión tuya con duración de 1 minuto o más esté activa, puedes alterar completamente su apariencia y naturaleza.' },
          { level: 10, name: 'Ser Ilusorio (Illusory Self)', desc: 'Reacción: cuando una criatura te ataque, creas un duplicado ilusorio que hace que ese ataque falle automáticamente (1 uso por descanso corto/largo).' },
          { level: 14, name: 'Realidad Ilusoria', desc: 'Acción adicional: puedes hacer que un objeto inanimado no mágico que forme parte de una de tus ilusiones se vuelva real durante 1 minuto.' },
        ],
      },
      {
        id: 'escuela-nigromancia',
        name: 'Escuela de Nigromancia (School of Necromancy)',
        description: 'Dominan las energías oscuras de la vida y la muerte, drenando la vitalidad de enemigos y alzando ejércitos no muertos.',
        features: [
          { level: 2, name: 'Erudito de la Nigromancia', desc: 'Copiar conjuros de nigromancia cuesta la mitad de oro y tiempo.' },
          { level: 2, name: 'Cosecha Sombría (Grim Harvest)', desc: 'Una vez por turno al matar una criatura con un conjuro de nivel 1+, recuperas puntos de golpe iguales al doble del nivel del conjuro (o el triple si es de nigromancia).' },
          { level: 6, name: 'Siervos No Muertos', desc: 'Aprendes Animar a los Muertos. Al lanzarlo, creas un no muerto adicional, y todos tus no muertos tienen sus puntos de golpe máximos aumentados por tu nivel de mago y añaden tu competencia a su daño.' },
          { level: 10, name: 'Inured to Undeath', desc: 'Ganas resistencia al daño necrótico y tu total de puntos de golpe máximos no puede ser reducido.' },
          { level: 14, name: 'Comandar No Muertos', desc: 'Acción: intentas poner bajo tu control permanente a un no muerto a 60 pies si falla una salvación de Carisma contra tu CD de conjuros.' },
        ],
      },
      {
        id: 'orden-escribas',
        name: 'Orden de los Escribas (Order of Scribes)',
        description: 'Eruditos venerables que despiertan el alma viva de su libro de conjuros, transformándolo en un artefacto consciente.',
        features: [
          { level: 2, name: 'Pluma del Mago', desc: 'Creas una pluma mágica que no gasta tinta y te permite copiar conjuros en tu libro en tan solo 2 minutos por nivel de conjuro.' },
          { level: 2, name: 'Grimorio Despertado', desc: 'Tu libro de conjuros despierta: puedes usarlo como foco arcano, puedes cambiar el tipo de daño de cualquier conjuro por el tipo de daño de otro conjuro en tu libro, y puedes lanzar un conjuro ritual con su tiempo normal de acción 1 vez por descanso largo.' },
          { level: 6, name: 'Manifiesto Mental', desc: 'Proyectas la mente de tu libro de conjuros como un avatar espectral flotante a 60 pies. Puedes ver y oír a través de él y lanzar conjuros como si estuvieras en su posición.' },
          { level: 10, name: 'Maestro Escriba', desc: 'Al terminar un descanso largo, fabricas un pergamino mágico de nivel 1 o 2 que cualquiera puede leer sin gastar componentes materiales.' },
          { level: 14, name: 'Una con el Tomo', desc: 'Si vas a recibir daño letal, tu libro se sacrifica para absorber todo el daño, borrando temporalmente páginas de conjuros que recuperas tras varios descansos.' },
        ],
      },
      {
        id: 'escuela-transmutacion',
        name: 'Escuela de Transmutación (School of Transmutation)',
        description: 'Alquimistas y moldeadores de la materia capaces de alterar las propiedades físicas y biológicas del mundo.',
        features: [
          { level: 2, name: 'Erudito de la Transmutación', desc: 'Copiar conjuros de transmutación cuesta la mitad de oro y tiempo.' },
          { level: 2, name: 'Alquimia Menor', desc: 'Transmutas temporalmente madera, piedra, hierro, cobre o plata en otro de estos materiales durante 1 hora.' },
          { level: 6, name: 'Piedra del Transmutador', desc: 'Creas una piedra mágica que otorga a quien la porte: Visión en la Oscuridad (60 pies), Velocidad +10 pies, Competencia en tiradas de salvación de Constitución, o Resistencia a un daño elemental.' },
          { level: 10, name: 'Cambiaformas', desc: 'Añades Polimorfar a tu libro de conjuros y puedes lanzarlo sobre ti mismo sin gastar ranura de conjuro una vez por descanso corto.' },
          { level: 14, name: 'Maestro Transmutador', desc: 'Consumes tu piedra para ejecutar una proeza legendaria: Transformar un objeto en otro de igual tamaño, Restaurar vida y curar todas las maldiciones y enfermedades, o Resucitar a una criatura muerta recientemente.' },
        ],
      },
      {
        id: 'escuela-magia-guerra',
        name: 'Escuela de Magia de Guerra (School of War Magic)',
        description: 'Combinan principios tácticos de evocación y abjuración para dominar los campos de batalla y anular hechiceros enemigos.',
        features: [
          { level: 2, name: 'Deflexión Arcana', desc: 'Reacción al ser atacado o fallar una salvación: obtienes +2 a la CA contra ese ataque o +4 a esa tirada de salvación.' },
          { level: 2, name: 'Ingenio Táctico', desc: 'Añades tu modificador de Inteligencia a tus tiradas de iniciativa.' },
          { level: 6, name: 'Oleada de Poder (Power Surge)', desc: 'Cada vez que termines un descanso o neutralices un conjuro con Contconjuro o Disipar Magia, almacenas energía para infligir daño de fuerza adicional igual a la mitad de tu nivel de mago.' },
          { level: 10, name: 'Magia Duradera', desc: 'Mientras mantengas la concentración en un conjuro, ganas un bonificador de +2 a tu CA y +2 a todas tus tiradas de salvación.' },
          { level: 14, name: 'Sudario Deflector', desc: 'Cuando uses tu Deflexión Arcana, desatas chispas mágicas que infligen daño de fuerza a hasta tres criaturas a 60 pies igual a la mitad de tu nivel de mago.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Lanzamiento de Conjuros Arcanos', desc: 'Preparas Inteligencia + nivel de mago conjuros cada día a partir de las fórmulas estudiadas en tu libro de conjuros.' },
      { level: 1, name: 'Libro de Conjuros (Grimorio)', desc: 'Contiene tus conjuros conocidos. Empiezas con 6 conjuros de nivel 1 y añades 2 conjuros nuevos gratis en cada nivel de mago, además de los que copies.' },
      { level: 1, name: 'Recuperación Arcana', desc: 'Una vez al día tras un descanso corto, recuperas ranuras de conjuro gastadas cuya suma de niveles sea menor o igual a la mitad de tu nivel de mago (redondeando hacia arriba, máx nivel 5).' },
      { level: 1, name: 'Lanzamiento Ritual', desc: 'Puedes lanzar cualquier conjuro de mago de tu libro como ritual si tiene la etiqueta ritual, sin necesidad de tenerlo preparado ni gastar ranura.' },
      { level: 2, name: 'Tradición Arcana (Subclase)', desc: 'Consagras tu estudio a una Escuela de Magia (Abjuración, Evocación, Canto de la Hoja, Adivinación, etc.), obteniendo rasgos arcanos a niveles 2, 6, 10 y 14.' },
      { level: 3, name: 'Conjuros de 2.º Nivel', desc: 'Desbloqueas el acceso a ranuras y conjuros arcanos de 2.º nivel (Imagen Espejada, Paso Brumoso, Telaraña, etc.).' },
      { level: 3, name: 'Fórmulas de Trucos (Cantrip Formulas - Opcional)', desc: 'Has inscrito fórmulas arcanas en tu libro de conjuros. Tras finalizar un descanso largo, puedes consultar esas fórmulas para reemplazar un truco de mago que conozcas por otro truco de la lista de mago.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Conjuros de 3.er Nivel', desc: 'Desbloqueas ranuras y conjuros arcanos de 3.er nivel (Bola de Fuego, Contrahechizo, Relámpago, Volar, etc.).' },
      { level: 6, name: 'Rasgo de Tradición Arcana', desc: 'Obtienes un nuevo rasgo otorgado por tu Escuela de Magia (por ejemplo, Ataque Adicional Mejorado en Canto de la Hoja, Guarda Proyectada en Abjuración o Truco Potente en Evocación).' },
      { level: 7, name: 'Conjuros de 4.º Nivel', desc: 'Desbloqueas el acceso a ranuras y conjuros arcanos de 4.º nivel (Polimorfar, Puerta Dimensional, Ojo Arcano, Muro de Fuego).' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Conjuros de 5.º Nivel', desc: 'Desbloqueas el acceso a ranuras y conjuros arcanos de 5.º nivel (Telequinesis, Muro de Fuerza, Cono de Frío, Dominar Persona).' },
      { level: 10, name: 'Rasgo de Tradición Arcana', desc: 'Obtienes un rasgo avanzado de tu Tradición Arcana elegida a nivel 2.' },
      { level: 11, name: 'Conjuros de 6.º Nivel', desc: 'Desbloqueas poderosos conjuros arcanos de 6.º nivel (Desintegrar, Cadena de Relámpagos, Globo de Invulnerabilidad).' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Conjuros de 7.º Nivel', desc: 'Desbloqueas conjuros de 7.º nivel capaces de alterar la realidad física (Teletransporte, Jaula de Fuerza, Forma de Simulacro).' },
      { level: 14, name: 'Rasgo de Tradición Arcana Magistral', desc: 'Alcanzas la cúspide de maestría en tu Escuela de Magia elegida a nivel 2.' },
      { level: 15, name: 'Conjuros de 8.º Nivel', desc: 'Desbloqueas conjuros arcanos legendarios de 8.º nivel (Antimagia, Laberinto, Dominar Monstruo, Semiplano).' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Conjuros de 9.º Nivel (Cúspide Arcana)', desc: 'Desbloqueas la magia definitiva de 9.º nivel: Deseo (Wish), Parar el Tiempo (Time Stop), Polimorfia Verdadera, Tromba de Meteoros.' },
      { level: 18, name: 'Dominio de Conjuros (Spell Mastery)', desc: 'Eliges un conjuro de mago de 1.er nivel y uno de 2.º nivel que estén en tu libro de conjuros. Puedes lanzar esos dos conjuros a su nivel más bajo a voluntad, sin gastar ninguna ranura de conjuro.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Conjuros Insignia (Signature Spells)', desc: 'Eliges dos conjuros de mago de 3.er nivel en tu libro de conjuros como tus conjuros insignia. Siempre los tienes preparados sin contar contra tu límite y puedes lanzar cada uno una vez a 3.er nivel sin gastar ranura de conjuro por descanso corto o largo.' },
    ],
  },
  {
    id: 'clerigo',
    name: 'Clérigo',
    description: 'Un campeón sacerdotal que ejerce magia divina otorgada por una deidad o causa sagrada.',
    hitDie: 8,
    primaryAbility: 'Sabiduría',
    savingThrows: ['Sabiduría', 'Carisma'],
    armorProficiencies: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
    weaponProficiencies: ['Armas simples'],
    isSpellcaster: true,
    casterType: 'full',
    spellcastingAbility: 'wis',
    subclassesName: 'Dominio Divino',
    subclassUnlockLevel: 1,
    defaultResources: [
      {
        id: 'res-canalizar-divinidad',
        name: 'Canalizar Divinidad',
        calculateMax: (lvl) => (lvl >= 18 ? 3 : lvl >= 6 ? 2 : 1),
        resetOn: 'short',
        description: 'Canalizas la energía de tu deidad para expulsar muertos vivientes o activar el poder único de tu Dominio.',
      },
    ],
    subclasses: [
      {
        id: 'dominio-vida',
        name: 'Dominio de la Vida',
        description: 'Especialistas supremos en sanación, preservación de almas y armaduras pesadas.',
        features: [
          { level: 1, name: 'Competencia Adicional', desc: 'Competencia con armadura pesada.' },
          { level: 1, name: 'Discípulo de la Vida', desc: 'Tus conjuros de curación sanan 2 + nivel del conjuro puntos de golpe adicionales.' },
          { level: 2, name: 'Canalizar Divinidad: Preservar la Vida', desc: 'Sanas un pool de 5 x nivel de clérigo repartido entre aliados heridos a 30 pies.' },
          { level: 6, name: 'Sanador Bendito', desc: 'Cuando lanzas un conjuro de curación sobre otra criatura, tú también recuperas 2 + nivel del conjuro PG.' },
          { level: 8, name: 'Golpe Divino (Vida)', desc: 'Una vez por turno al impactar con arma sumas +1d8 de daño radiante (+2d8 a nivel 14).' },
          { level: 17, name: 'Sanación Suprema', desc: 'En lugar de tirar dados para curar, usas el resultado máximo posible de cada dado.' },
        ],
      },
      {
        id: 'dominio-guerra',
        name: 'Dominio de la Guerra',
        description: 'Clérigos marciales bendecidos con ferocidad e impactos certeros.',
        features: [
          { level: 1, name: 'Competencia Marcial', desc: 'Competencia con armas marciales y armaduras pesadas.' },
          { level: 1, name: 'Sacerdote de Guerra', desc: 'Puedes realizar un ataque con arma como acción adicional (usos = Mod Sabiduría por descanso largo).' },
          { level: 2, name: 'Canalizar Divinidad: Golpe Guiado', desc: 'Ganas un bonificador de +10 a una tirada de ataque que acabas de realizar.' },
          { level: 6, name: 'Bendición del Dios de la Guerra', desc: 'Reacción: otorgas un bonificador de +10 a una tirada de ataque de un aliado a 30 pies.' },
          { level: 8, name: 'Golpe Divino (Guerra)', desc: 'Una vez por turno al impactar con arma sumas +1d8 de daño del tipo del arma (+2d8 a nivel 14).' },
          { level: 17, name: 'Avatar de la Batalla', desc: 'Ganas resistencia permanente al daño contundente, perforante y cortante de armas no mágicas.' },
        ],
      },
      {
        id: 'dominio-luz',
        name: 'Dominio de la Luz',
        description: 'Canalizan el resplandor radiante del sol para cegar enemigos e incinerar tinieblas.',
        features: [
          { level: 1, name: 'Destello Protector', desc: 'Impones desventaja al ataque de un enemigo cercano usando tu reacción (usos = Mod. Sabiduría).' },
          { level: 2, name: 'Canalizar Divinidad: Radiancia del Alba', desc: 'Disipas oscuridad mágica a 30 pies e infliges 2d10 + nivel de daño radiante a enemigos en el área.' },
          { level: 6, name: 'Destello Mejorado', desc: 'Puedes usar tu Destello Protector cuando un enemigo ataque a un aliado visible a 30 pies de ti.' },
          { level: 8, name: 'Lanzamiento Potente de Conjuros', desc: 'Añades tu modificador de Sabiduría al daño de cualquier truco de clérigo.' },
          { level: 17, name: 'Corona de Luz', desc: 'Emites un aura de luz solar de 60 pies que impone desventaja en salvaciones contra tus conjuros de fuego y radiantes.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Lanzamiento de Conjuros Divinos', desc: 'Preparas Sabiduría + nivel de clérigo conjuros cada día a partir de toda la lista divina.' },
      { level: 1, name: 'Dominio Divino (Subclase)', desc: 'Eliges el Dominio concedido por tu deidad (Vida, Guerra, Luz, etc.), obteniendo conjuros de dominio siempre preparados y rasgos divinos a niveles 1, 2, 6, 8 y 17.' },
      { level: 2, name: 'Canalizar Divinidad (1 uso)', desc: 'Canalizas energía de tu deidad para Expulsar Muertos Vivientes o activar el poder especial de tu Dominio Divino. Recarga en descanso corto.' },
      { level: 2, name: 'Canalizar Divinidad: Expulsar Muertos Vivientes', desc: 'Cada muerto viviente a 30 pies debe superar salvación de Sabiduría o huir aterrorizado durante 1 minuto.' },
      { level: 3, name: 'Conjuros Divinos de 2.º Nivel', desc: 'Desbloqueas ranuras y conjuros divinos de 2.º nivel (Restauración Menor, Plegaria de Curación, Ayuda, Arma Espiritual).' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Destruir Muertos Vivientes (VD 1/2)', desc: 'Cuando un muerto viviente falle su salvación contra tu Expulsar Muertos Vivientes, es destruido al instante si su Valor de Desafío es 1/2 o menor.' },
      { level: 5, name: 'Conjuros Divinos de 3.er Nivel', desc: 'Desbloqueas conjuros divinos de 3.er nivel (Revivir, Guardianes Espirituales, Disipar Magia, Faro de Esperanza).' },
      { level: 6, name: 'Canalizar Divinidad (2 usos)', desc: 'Puedes usar Canalizar Divinidad 2 veces entre descansos cortos o largos, y obtienes un rasgo adicional de tu Dominio Divino.' },
      { level: 7, name: 'Conjuros Divinos de 4.º Nivel', desc: 'Desbloqueas conjuros divinos de 4.º nivel (Guardián de la Fe, Destierro, Protección contra la Muerte).' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 8, name: 'Destruir Muertos Vivientes (VD 1)', desc: 'Destruye instantáneamente muertos vivientes de VD 1 o menor al expulsarlos.' },
      { level: 8, name: 'Rasgo de Dominio Divino', desc: 'Obtienes Golpe Divino (+1d8 de daño en armas) o Lanzamiento Potente (+Sabiduría a trucos) según tu dominio.' },
      { level: 9, name: 'Conjuros Divinos de 5.º Nivel', desc: 'Desbloqueas conjuros de 5.º nivel (Golpe Flamígero, Restauración Mayor, Curar Heridas en Masa, Revivir a los Muertos).' },
      { level: 10, name: 'Intervención Divina', desc: 'Pides ayuda a tu deidad en una situación desesperada. Tiras un d100: si el resultado es menor o igual a tu nivel de clérigo, la deidad interviene con el efecto de cualquier conjuro de clérigo o milagro a discreción del DM (1/7 días si tiene éxito).' },
      { level: 11, name: 'Destruir Muertos Vivientes (VD 2)', desc: 'Destruye instantáneamente muertos vivientes de VD 2 o menor al expulsarlos.' },
      { level: 11, name: 'Conjuros Divinos de 6.º Nivel', desc: 'Desbloqueas conjuros de 6.º nivel (Sanar, Festín de los Héroes, Dañar, Prohibición).' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Conjuros Divinos de 7.º Nivel', desc: 'Desbloqueas conjuros de 7.º nivel (Resurrección, Palabra Sagrada, Templo de los Dioses).' },
      { level: 14, name: 'Destruir Muertos Vivientes (VD 3)', desc: 'Destruye instantáneamente muertos vivientes de VD 3 o menor al expulsarlos.' },
      { level: 15, name: 'Conjuros Divinos de 8.º Nivel', desc: 'Desbloqueas conjuros de 8.º nivel (Aura Sagrada, Terremoto, Controlar el Clima).' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Destruir Muertos Vivientes (VD 4)', desc: 'Destruye instantáneamente muertos vivientes de VD 4 o menor al expulsarlos.' },
      { level: 17, name: 'Rasgo Maestro de Dominio Divino', desc: 'Alcanzas el pináculo de poder y devoción de tu Dominio Divino.' },
      { level: 17, name: 'Conjuros Divinos de 9.º Nivel', desc: 'Desbloqueas conjuros legendarios de 9.º nivel (Sanar en Masa, Resurrección Verdadera, Portal Divino).' },
      { level: 18, name: 'Canalizar Divinidad (3 usos)', desc: 'Puedes usar Canalizar Divinidad 3 veces entre descansos cortos o largos.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Intervención Divina Garantizada', desc: 'Tu devoción es absoluta. Cuando uses Intervención Divina, tu llamada a la deidad tiene éxito automáticamente sin necesidad de tirar dados.' },
    ],
  },
  {
    id: 'guerrero',
    name: 'Guerrero (Fighter)',
    description: 'Un maestro del combate marcial, perito en el uso de una gran variedad de armas y armaduras.',
    hitDie: 10,
    primaryAbility: 'Fuerza o Destreza',
    savingThrows: ['Fuerza', 'Constitución'],
    armorProficiencies: ['Todas las armaduras', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciales'],
    isSpellcaster: false,
    casterType: 'none',
    subclassesName: 'Arquetipo Marcial',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-segundo-aire',
        name: 'Segundo Aire (Second Wind)',
        calculateMax: () => 1,
        resetOn: 'short',
        diceType: '1d10',
        description: 'Como acción adicional recuperas 1d10 + nivel de guerrero puntos de golpe. Recarga en descanso corto.',
      },
      {
        id: 'res-oleada-accion',
        name: 'Oleada de Acción (Action Surge)',
        calculateMax: (lvl) => (lvl >= 17 ? 2 : 1),
        resetOn: 'short',
        description: 'Puedes tomar una acción adicional completa en tu turno. Recarga en descanso corto.',
      },
    ],
    subclasses: [
      {
        id: 'campeon',
        name: 'Campeón (Champion)',
        description: 'Perfecciona la potencia física pura logrando impactos críticos demoledores con mayor frecuencia.',
        features: [
          { level: 3, name: 'Crítico Mejorado', desc: 'Tus ataques con arma consiguen un impacto crítico con un resultado de 19 o 20 en el d20.' },
          { level: 7, name: 'Atleta Notable', desc: 'Añades la mitad de tu bonificador de competencia a cualquier prueba de Fuerza, Destreza o Constitución que no la tenga ya, y tu distancia de salto en carrera aumenta.' },
          { level: 10, name: 'Estilo de Combate Adicional', desc: 'Eliges un segundo Estilo de Combate de la lista de guerrero.' },
          { level: 15, name: 'Crítico Superior', desc: 'Tus ataques con arma consiguen un impacto crítico con un resultado de 18, 19 o 20 en el d20.' },
          { level: 18, name: 'Superviviente', desc: 'Al inicio de cada uno de tus turnos recuperas 5 + Modificador de Constitución puntos de golpe si tienes menos de la mitad de tus PG máximos y no tienes 0 PG.' },
        ],
      },
      {
        id: 'maestro-batalla',
        name: 'Maestro de Batalla (Battle Master)',
        description: 'Guerreros tácticos que controlan el campo de batalla mediante maniobras y dados de superioridad.',
        features: [
          { level: 3, name: 'Superioridad en Combate', desc: 'Ganas 4 dados de superioridad (d8) para ejecutar maniobras tácticas (Ataque con Finta, Barrido, Desarmar, Empujar, Maniobra Táctica, Parada, Provocación, Precisión).' },
          { level: 3, name: 'Estudiante de la Guerra', desc: 'Ganas competencia con un tipo de herramientas de artesano de tu elección.' },
          { level: 7, name: 'Conoce a tu Enemigo', desc: 'Si observas o interactúas con una criatura fuera de combate durante al menos 1 minuto, el DM te revela si es igual, superior o inferior a ti en ciertas características (CA, PG, Fuerza, etc.).' },
          { level: 10, name: 'Superioridad Mejorada (d10)', desc: 'Tus dados de superioridad se convierten en d10.' },
          { level: 15, name: 'Implacable', desc: 'Cuando tiras iniciativa y no te quedan dados de superioridad, recuperas 1 dado de superioridad.' },
          { level: 18, name: 'Superioridad Suprema (d12)', desc: 'Tus dados de superioridad se convierten en d12.' },
        ],
      },
      {
        id: 'caballero-arcano',
        name: 'Caballero Arcano (Eldritch Knight)',
        description: 'Combina el dominio del acero con conjuros arcanos de abjuración y evocación.',
        isCasterSubclass: true,
        spellcastingAbility: 'int',
        features: [
          { level: 3, name: 'Lanzamiento de Conjuros Arcanos', desc: 'Aprendes trucos y conjuros de mago centrados en abjuración y evocación usando Inteligencia.' },
          { level: 3, name: 'Vínculo con el Arma', desc: 'Creas un vínculo mágico con hasta 2 armas: no puedes ser desarmado de ellas y puedes invocarlas a tu mano como acción adicional desde cualquier distancia en el mismo plano.' },
          { level: 7, name: 'Magia de Guerra', desc: 'Cuando usas tu acción para lanzar un truco, puedes realizar un ataque con arma como acción adicional.' },
          { level: 10, name: 'Golpe Sobrenatural', desc: 'Cuando impactas a una criatura con un ataque con arma, esa criatura tiene desventaja en la próxima tirada de salvación que haga contra uno de tus conjuros antes del final de tu siguiente turno.' },
          { level: 15, name: 'Carga Arcana', desc: 'Cuando usas tu Oleada de Acción, puedes teletransportarte hasta 30 pies a un espacio desocupado que puedas ver antes o después de la acción adicional.' },
          { level: 18, name: 'Magia de Guerra Mejorada', desc: 'Cuando usas tu acción para lanzar un conjuro, puedes realizar un ataque con arma como acción adicional.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Estilo de Combate', desc: 'Especialización marcial: Duelo (+2 daño a una mano), Gran Arma (repetir 1 y 2 en dados de daño a 2 manos), Defensa (+1 CA), Tiro con Arco (+2 a ataques a distancia), Protección o Combate con Dos Armas.' },
      { level: 1, name: 'Segundo Aire (Second Wind)', desc: 'Como acción adicional recuperas 1d10 + nivel de guerrero puntos de golpe. Recarga tras descanso corto o largo.' },
      { level: 2, name: 'Oleada de Acción (Action Surge - 1 uso)', desc: 'Puedes tomar una acción adicional completa en tu turno, además de tu acción regular y cualquier acción adicional. Recarga tras un descanso corto o largo.' },
      { level: 3, name: 'Arquetipo Marcial (Subclase)', desc: 'Eliges el arquetipo que modela tu estilo de combate (Campeón, Maestro de Batalla, Caballero Arcano), obteniendo rasgos a niveles 3, 7, 10, 15 y 18.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Ataque Adicional (2 ataques)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
      { level: 6, name: 'Mejora de Característica Adicional de Guerrero', desc: 'Los guerreros entrenan más que nadie: ganas un aumento de característica en 2, dos en 1, o una Dote oficial.' },
      { level: 7, name: 'Rasgo de Arquetipo Marcial', desc: 'Obtienes un rasgo táctico otorgado por tu Arquetipo Marcial elegido a nivel 3.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Indómito (Indomitable - 1 uso)', desc: 'Puedes volver a tirar una tirada de salvación que hayas fallado. Debes usar el nuevo resultado. Recarga en descanso largo.' },
      { level: 10, name: 'Rasgo de Arquetipo Marcial', desc: 'Obtienes un rasgo avanzado de tu Arquetipo Marcial.' },
      { level: 11, name: 'Ataque Adicional x2 (3 ataques)', desc: 'Puedes atacar tres veces en lugar de dos cuando realizas la acción de Atacar en tu turno.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Indómito (2 usos)', desc: 'Puedes usar tu rasgo Indómito dos veces entre descansos largos.' },
      { level: 14, name: 'Mejora de Característica Adicional de Guerrero', desc: 'Ganas un nuevo aumento de característica en 2, dos en 1, o una Dote oficial.' },
      { level: 15, name: 'Rasgo de Arquetipo Marcial', desc: 'Obtienes un rasgo de alta veteranía de tu Arquetipo Marcial.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Oleada de Acción (2 usos)', desc: 'Puedes usar Oleada de Acción dos veces antes de descansar, pero solo una vez en el mismo turno.' },
      { level: 17, name: 'Indómito (3 usos)', desc: 'Puedes usar tu rasgo Indómito tres veces entre descansos largos.' },
      { level: 18, name: 'Rasgo Maestro de Arquetipo Marcial', desc: 'Alcanzas la cumbre técnica de tu Arquetipo Marcial.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Ataque Adicional x3 (4 ataques - Cúspide Marcial)', desc: 'Eres la cúspide indiscutible del arte de la guerra. Puedes atacar cuatro veces en lugar de tres cuando realizas la acción de Atacar en tu turno.' },
    ],
  },
  {
    id: 'picaro',
    name: 'Pícaro (Rogue)',
    description: 'Un bribón sigiloso y letal que utiliza el engaño, la agilidad y la precisión para superar obstáculos.',
    hitDie: 8,
    primaryAbility: 'Destreza',
    savingThrows: ['Destreza', 'Inteligencia'],
    armorProficiencies: ['Armaduras ligeras'],
    weaponProficiencies: ['Armas simples', 'Ballestas de mano', 'Espadas largas', 'Estoques', 'Espadas cortas'],
    isSpellcaster: false,
    casterType: 'none',
    subclassesName: 'Arquetipo de Pícaro',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-ataque-furtivo',
        name: 'Ataque Furtivo (Sneak Attack)',
        calculateMax: (lvl) => Math.ceil(lvl / 2),
        resetOn: 'short',
        diceType: 'd6',
        description: 'Infliges dados de d6 adicionales una vez por turno si tienes ventaja o un aliado está adyacente a tu objetivo.',
      },
    ],
    subclasses: [
      {
        id: 'asesino',
        name: 'Asesino (Assassin)',
        description: 'Especialistas en emboscadas mortales, venenos y ataques fulminantes contra objetivos desprevenidos.',
        features: [
          { level: 3, name: 'Asesinar (Assassinate)', desc: 'Tienes ventaja en tiradas de ataque contra cualquier criatura que aún no haya actuado en el combate. Además, cualquier impacto que asestes contra una criatura sorprendida es un impacto crítico automático.' },
          { level: 3, name: 'Competencias Adicionales', desc: 'Ganas competencia con el kit de disfraz y el kit de envenenador.' },
          { level: 9, name: 'Infiltración Experta', desc: 'Puedes crear identidades falsas impenetrables con documentación, historia personal e indumentaria.' },
          { level: 13, name: 'Impostor', desc: 'Puedes imitar a la perfección el habla, escritura y comportamiento de otra persona tras estudiarla 3 horas.' },
          { level: 17, name: 'Golpe Mortal', desc: 'Cuando sorprendes y golpeas a una criatura, debe superar salvación de Constitución CD (8 + Des + prof) o el daño de tu ataque se duplica.' },
        ],
      },
      {
        id: 'ladron',
        name: 'Ladrón (Thief)',
        description: 'Ágiles maestros de la infiltración, el hurto rápido y el uso de objetos mágicos.',
        features: [
          { level: 3, name: 'Manos Rápidas', desc: 'Puedes usar la acción adicional de tu Acción Astuta para realizar una prueba de Juego de Manos, usar tus herramientas de ladrón para desarmar trampas o abrir cerraduras, o tomar la acción de Usar un Objeto.' },
          { level: 3, name: 'Segundo Piso', desc: 'Trepar ya no te cuesta movimiento adicional y tu distancia al saltar en carrera aumenta en pies iguales a tu modificador de Destreza.' },
          { level: 9, name: 'Sigilo Supremo', desc: 'Tienes ventaja en pruebas de Sigilo si no te mueves más de la mitad de tu velocidad en ese turno.' },
          { level: 13, name: 'Usar Objeto Mágico', desc: 'Ignoras todos los requisitos de clase, raza y nivel para la sintonización y uso de cualquier objeto mágico.' },
          { level: 17, name: 'Reflejos de Ladrón', desc: 'Puedes tomar dos turnos completos durante el primer asalto de cualquier combate (el primero en tu iniciativa y el segundo en iniciativa - 10).' },
        ],
      },
      {
        id: 'embaucador-arcano',
        name: 'Embaucador Arcano (Arcane Trickster)',
        description: 'Mezcla hurtos con magia de ilusión y encantamiento.',
        isCasterSubclass: true,
        spellcastingAbility: 'int',
        features: [
          { level: 3, name: 'Lanzamiento de Conjuros', desc: 'Aprendes trucos y conjuros de mago de las escuelas de ilusión y encantamiento usando Inteligencia.' },
          { level: 3, name: 'Mano de Mago Bribona', desc: 'Al lanzar Mano de Mago puedes hacerla invisible y usarla como acción adicional para guardar o sustraer objetos de bolsillos o abrir cerraduras a distancia.' },
          { level: 9, name: 'Emboscada Mágica', desc: 'Si estás oculto cuando lanzas un conjuro a una criatura, esa criatura tiene desventaja en la salvación contra ese conjuro este turno.' },
          { level: 13, name: 'Distracción Versátil', desc: 'Como acción adicional puedes usar tu Mano de Mago para distraer a un objetivo a 5 pies de ella, ganando ventaja en tus ataques contra él hasta el final del turno.' },
          { level: 17, name: 'Ladrón de Conjuros', desc: 'Reacción cuando una criatura lance un conjuro contra ti: niegas el conjuro si falla salvación de Int y puedes lanzarlo tú durante 8 horas.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Pericia (Expertise)', desc: 'Eliges dos de tus competencias de habilidad (o una habilidad y tus herramientas de ladrón): tu bonificador de competencia se duplica para ellas.' },
      { level: 1, name: 'Ataque Furtivo (Sneak Attack - 1d6)', desc: 'Una vez por turno infliges 1d6 daño adicional a una criatura que alcances con un arma sutil o a distancia si tienes ventaja o si un aliado consciente está a 5 pies del objetivo y no tienes desventaja.' },
      { level: 1, name: 'Jerga de Ladrones', desc: 'Un dialecto secreto de signos y palabras clave de los bajos fondos que te permite ocultar mensajes en conversaciones aparentemente inocuas.' },
      { level: 2, name: 'Acción Astuta (Cunning Action)', desc: 'Tu rapidez mental y agilidad te permiten realizar una acción adicional en cada uno de tus turnos para Correr (Dash), Destrabarte (Disengage) o Esconderte (Hide).' },
      { level: 3, name: 'Arquetipo de Pícaro (Subclase)', desc: 'Eliges un arquetipo (Asesino, Ladrón, Embaucador Arcano), obteniendo rasgos especiales a niveles 3, 9, 13 y 17.' },
      { level: 3, name: 'Ataque Furtivo (2d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 2d6.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Esquiva Asombrosa (Uncanny Dodge)', desc: 'Reacción: cuando un atacante que puedas ver te impacta con un ataque, reduces el daño recibido a la mitad.' },
      { level: 5, name: 'Ataque Furtivo (3d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 3d6.' },
      { level: 6, name: 'Pericia Adicional', desc: 'Eliges otras dos de tus competencias de habilidad (o tus herramientas de ladrón) para duplicar tu bonificador de competencia.' },
      { level: 7, name: 'Evasión (Evasion)', desc: 'Tu agilidad instintiva te permite esquivar efectos de área (como una Bola de Fuego). Si una salvación de Destreza te permite recibir la mitad del daño al tener éxito, no recibes daño si tienes éxito, y solo la mitad si fallas.' },
      { level: 7, name: 'Ataque Furtivo (4d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 4d6.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Rasgo de Arquetipo de Pícaro', desc: 'Obtienes un nuevo rasgo otorgado por el arquetipo elegido a nivel 3.' },
      { level: 9, name: 'Ataque Furtivo (5d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 5d6.' },
      { level: 10, name: 'Mejora de Característica Adicional de Pícaro', desc: 'Los pícaros obtienen una mejora de característica o Dote adicional a nivel 10.' },
      { level: 11, name: 'Talento Confiable (Reliable Talent)', desc: 'Has perfeccionado tus habilidades hasta la perfección: siempre que hagas una prueba de característica que use tu bonificador de competencia, cualquier resultado de 9 o menos en el d20 cuenta como un 10.' },
      { level: 11, name: 'Ataque Furtivo (6d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 6d6.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Rasgo de Arquetipo de Pícaro', desc: 'Obtienes un rasgo avanzado de tu arquetipo de pícaro.' },
      { level: 13, name: 'Ataque Furtivo (7d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 7d6.' },
      { level: 14, name: 'Sentido Ciego (Blindsense)', desc: 'Si puedes oír, eres consciente de la ubicación exacta de cualquier criatura oculta o invisible a 10 pies de ti.' },
      { level: 15, name: 'Mente Resbaladiza (Slippery Mind)', desc: 'Has adquirido una gran fuerza mental: ganas competencia en tiradas de salvación de Sabiduría.' },
      { level: 15, name: 'Ataque Furtivo (8d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 8d6.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Rasgo Maestro de Arquetipo de Pícaro', desc: 'Obtienes el rasgo supremo de tu arquetipo de pícaro.' },
      { level: 17, name: 'Ataque Furtivo (9d6)', desc: 'El daño de tu Ataque Furtivo aumenta a 9d6.' },
      { level: 18, name: 'Escurridizo (Elusive)', desc: 'Eres tan escurridizo que los atacantes rara vez ganan ventaja contra ti: ninguna tirada de ataque contra ti puede tener ventaja mientras no estés incapacitado.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Golpe de Suerte (Stroke of Luck)', desc: 'Tienes un don infalible para triunfar cuando lo necesitas: si tu ataque falla contra un objetivo a tu alcance, puedes convertir el fallo en un impacto; o si fallas una prueba de característica, puedes tratar la tirada de d20 como un 20 (1 uso por descanso corto o largo).' },
      { level: 20, name: 'Ataque Furtivo (10d6 - Cúspide Letal)', desc: 'El daño de tu Ataque Furtivo alcanza su poder máximo de 10d6.' },
    ],
  },
  {
    id: 'paladin',
    name: 'Paladín',
    description: 'Un guerrero sagrado vinculado a un juramento solemne que canaliza el poder de la justicia y la luz radiante.',
    hitDie: 10,
    primaryAbility: 'Fuerza y Carisma',
    savingThrows: ['Sabiduría', 'Carisma'],
    armorProficiencies: ['Todas las armaduras', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciales'],
    isSpellcaster: true,
    casterType: 'half',
    spellcastingAbility: 'cha',
    subclassesName: 'Juramento Sagrado',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-imposicion-manos',
        name: 'Imposición de Manos (Pool HP)',
        calculateMax: (lvl) => lvl * 5,
        resetOn: 'long',
        description: 'Pool de puntos de golpe que puedes transferir con un toque para sanar o gastar 5 para curar una enfermedad o veneno.',
      },
      {
        id: 'res-sentido-divino',
        name: 'Sentido Divino',
        calculateMax: (lvl) => 1 + Math.max(1, Math.floor(lvl / 3)),
        resetOn: 'long',
        description: 'Detectas la presencia de celestiales, infernales y muertos vivientes a 60 pies.',
      },
    ],
    subclasses: [
      {
        id: 'juramento-devocion',
        name: 'Juramento de Devoción',
        description: 'El clásico caballero de brillante armadura dedicado al honor, la verdad y la piedad.',
        features: [
          { level: 3, name: 'Arma Sagrada', desc: 'Canalizar Divinidad: Imbuyes tu arma con luz (+Carisma a tiradas de ataque durante 1 minuto e iluminación mágica).' },
          { level: 3, name: 'Expulsar a los Impíos', desc: 'Canalizar Divinidad: Fuerzas a infernales y muertos vivientes a 30 pies a huir si fallan salvación de Sabiduría.' },
          { level: 7, name: 'Aura de Devoción', desc: 'Tú y tus aliados a 10 pies no podéis ser hechizados mientras estés consciente (aumenta a 30 pies a nivel 18).' },
          { level: 15, name: 'Pureza de Espíritu', desc: 'Estás permanentemente bajo los efectos de Protección contra el Mal y el Bien.' },
          { level: 20, name: 'Halo Sagrado', desc: 'Como acción emites un halo de luz solar durante 1 minuto: 10 de daño radiante por turno a infernales/muertos vivientes y ventaja en salvaciones contra conjuros.' },
        ],
      },
      {
        id: 'juramento-venganza',
        name: 'Juramento de Venganza',
        description: 'Castigadores inflexibles que persiguen a los culpables sin descanso.',
        features: [
          { level: 3, name: 'Voto de Enemistad', desc: 'Canalizar Divinidad: Como acción adicional ganas ventaja en todas las tiradas de ataque contra un enemigo a 30 pies durante 1 minuto.' },
          { level: 3, name: 'Poderío Implacable', desc: 'Canalizar Divinidad: Aterrorizas a una criatura a 60 pies reduciendo su velocidad a 0.' },
          { level: 7, name: 'Vengador Implacable', desc: 'Cuando golpeas a una criatura con un ataque de oportunidad, puedes moverte hasta la mitad de tu velocidad como parte de la misma reacción sin provocar ataques de oportunidad.' },
          { level: 15, name: 'Alma de Venganza', desc: 'Cuando una criatura bajo tu Voto de Enemistad realice un ataque, puedes usar tu reacción para hacer un ataque cuerpo a cuerpo contra ella si está a tu alcance.' },
          { level: 20, name: 'Ángel Vengador', desc: 'Como acción asumes la forma de un ángel vengador durante 1 hora: alas que te dan velocidad de vuelo de 60 pies y un aura de terror de 30 pies.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Sentido Divino (Divine Sense)', desc: 'Detectas la presencia y ubicación exacta de celestiales, infernales y muertos vivientes a 60 pies de ti (usos = 1 + Mod. Carisma por descanso largo).' },
      { level: 1, name: 'Imposición de Manos (Lay on Hands)', desc: 'Tienes una reserva curativa bendecida igual a 5 x nivel de paladín. Con un toque sanas puntos de golpe o gastas 5 para curar una enfermedad o neutralizar un veneno.' },
      { level: 2, name: 'Estilo de Combate', desc: 'Especialización en combate: Defensa (+1 CA), Duelo (+2 daño con una mano), Gran Arma (repetir 1 y 2 en dados de daño) o Protección.' },
      { level: 2, name: 'Lanzamiento de Conjuros Divinos', desc: 'Preparas la mitad de tu nivel de paladín + Carisma conjuros de paladín cada día usando tu Carisma como aptitud mágica.' },
      { level: 2, name: 'Castigo Divino (Divine Smite)', desc: 'Cuando impactas a una criatura con un ataque cuerpo a cuerpo con arma, puedes gastar una ranura de conjuro para infligir 2d8 de daño radiante adicional (+1d8 por cada nivel por encima de 1.º, hasta 5d8; +1d8 extra contra infernales o muertos vivientes).' },
      { level: 3, name: 'Juramento Sagrado (Subclase)', desc: 'Pronuncias los votos de tu Juramento (Devoción, Venganza, etc.), obteniendo conjuros de juramento siempre preparados y Canalizar Divinidad a niveles 3, 7, 15 y 20.' },
      { level: 3, name: 'Salud Divina', desc: 'La magia divina fluye por tus venas haciéndote completamente inmune a todas las enfermedades.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
      { level: 5, name: 'Conjuros de Paladín de 2.º Nivel', desc: 'Desbloqueas ranuras y conjuros de 2.º nivel (Ayuda, Encontrar Corcel, Castigo Abrasador, Zona de Verdad).' },
      { level: 6, name: 'Aura de Protección', desc: 'Tú y las criaturas aliadas a 10 pies de ti sumáis tu modificador de Carisma (mínimo +1) a todas las tiradas de salvación mientras estés consciente.' },
      { level: 7, name: 'Rasgo de Juramento Sagrado', desc: 'Obtienes un aura sagrada o rasgo protector concedido por tu juramento a nivel 7.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Conjuros de Paladín de 3.er Nivel', desc: 'Desbloqueas conjuros de 3.er nivel (Revivir, Luz del Día, Castigo Cegador, Disipar Magia).' },
      { level: 10, name: 'Aura de Coraje', desc: 'Tú y los aliados a 10 pies de ti no podéis quedar Asustados mientras estés consciente.' },
      { level: 11, name: 'Castigo Divino Mejorado', desc: 'Tus ataques marciales están permanentemente imbuidos de energía radiante: cada impacto cuerpo a cuerpo con arma inflige +1d8 de daño radiante pasivo automático.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Conjuros de Paladín de 4.º Nivel', desc: 'Desbloqueas conjuros de 4.º nivel (Destierro, Protección contra la Muerte, Castigo Estupefaciente).' },
      { level: 14, name: 'Toque Purificador', desc: 'Como acción tocas a una criatura voluntaria para terminar un conjuro activo sobre ella (usos = Mod. Carisma por descanso largo).' },
      { level: 15, name: 'Rasgo de Juramento Sagrado', desc: 'Obtienes un rasgo avanzado de tu juramento de paladín.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Conjuros de Paladín de 5.º Nivel', desc: 'Desbloqueas conjuros supremos de 5.º nivel (Castigo Desterrador, Disipar el Mal y el Bien, Ola Destructiva).' },
      { level: 18, name: 'Auras Mejoradas (30 pies)', desc: 'El alcance de tu Aura de Protección, Aura de Coraje y aura de tu Juramento aumenta de 10 pies a 30 pies.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Campeón del Juramento (Avatar Sagrado)', desc: 'Te transformas en el avatar definitivo de tu causa durante 1 hora, desatando el poder legendario de tu Juramento Sagrado.' },
    ],
  },
  {
    id: 'monje',
    name: 'Monje',
    description: 'Un maestro de las artes marciales que canaliza la energía espiritual mística del Ki que fluye por su cuerpo.',
    hitDie: 8,
    primaryAbility: 'Destreza y Sabiduría',
    savingThrows: ['Fuerza', 'Destreza'],
    armorProficiencies: ['Ninguna'],
    weaponProficiencies: ['Armas simples', 'Espadas cortas'],
    isSpellcaster: false,
    casterType: 'none',
    subclassesName: 'Tradición Monástica',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-puntos-ki',
        name: 'Puntos de Ki',
        calculateMax: (lvl) => lvl,
        resetOn: 'short',
        description: 'Puntos de energía mística para activar Ráfaga de Golpes, Defensa Paciente, Paso del Viento y Golpe Aturdidor. Recarga en descanso corto.',
      },
    ],
    subclasses: [
      {
        id: 'palma-abierta',
        name: 'Camino de la Palma Abierta',
        description: 'Controlan el cuerpo del enemigo derribándolo, empujándolo o negando sus reacciones con su Ki.',
        features: [
          { level: 3, name: 'Técnica de la Palma Abierta', desc: 'Al golpear con Ráfaga de Golpes puedes: derribar al objetivo (salvación FUE), empujarlo 15 pies o anular sus reacciones hasta el final de tu siguiente turno.' },
          { level: 6, name: 'Plenitud del Cuerpo', desc: 'Como acción recuperas puntos de golpe iguales al triple de tu nivel de monje una vez por descanso largo.' },
          { level: 11, name: 'Tranquilidad', desc: 'Al final de un descanso largo quedas bajo el efecto del conjuro Santuario hasta tu próximo descanso largo o hasta que ataques.' },
          { level: 17, name: 'Palma Trémula (Quivering Palm)', desc: 'Gastas 3 Ki al golpear para establecer vibraciones letales: como acción posterior liberas la vibración forzando salvación de Con o la criatura cae a 0 PG (o sufre 10d10 daño necrótico si tiene éxito).' },
        ],
      },
      {
        id: 'sombra',
        name: 'Camino de la Sombra',
        description: 'Ninjas sigilosos que se teletransportan entre las sombras y usan oscuridad mágica.',
        features: [
          { level: 3, name: 'Artes de las Sombras', desc: 'Gastas 2 Ki para lanzar Oscuridad, Pasar sin Huella, Silencio o Visión en la Oscuridad, y aprendes el truco Ilusión Menor.' },
          { level: 6, name: 'Paso de la Sombra', desc: 'Como acción adicional puedes teletransportarte hasta 60 pies de una sombra o luz tenue a otra, ganando ventaja en tu siguiente ataque cuerpo a cuerpo.' },
          { level: 11, name: 'Manto de Sombras', desc: 'Como acción puedes volverte invisible mientras estés en luz tenue u oscuridad hasta que ataques, lances un conjuro o estés en luz brillante.' },
          { level: 17, name: 'Oportunista', desc: 'Reacción: cuando una criatura a 5 pies de ti sea golpeada por un ataque de otra criatura, puedes hacer un ataque cuerpo a cuerpo contra ella.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Defensa sin Armadura', desc: 'Mientras no lleves armadura ni escudo, tu CA es igual a 10 + Modificador de Destreza + Modificador de Sabiduría.' },
      { level: 1, name: 'Artes Marciales (d4)', desc: 'Puedes usar Destreza en lugar de Fuerza para armas de monje y ataques desarmados; tiras un d4 en lugar del daño normal desarmado; y puedes realizar un ataque desarmado adicional como acción adicional tras atacar.' },
      { level: 2, name: 'Ki (Energía Mística)', desc: 'Obtienes tantos puntos de Ki como tu nivel de monje. Puedes gastar Ki para activar: Ráfaga de Golpes (2 ataques desarmados adicionales), Defensa Paciente (Esquivar como acción adicional) o Paso del Viento (Destrabarse o Correr con salto doble). Recarga en descanso corto.' },
      { level: 2, name: 'Movimiento sin Armadura (+10 pies)', desc: 'Tu velocidad aumenta en 10 pies mientras no lleves armadura ni escudo (aumenta según tu nivel).' },
      { level: 3, name: 'Tradición Monástica (Subclase)', desc: 'Te consagras a una orden monástica (Palma Abierta, Sombra, etc.), obteniendo rasgos a niveles 3, 6, 11 y 17.' },
      { level: 3, name: 'Desviar Proyectiles', desc: 'Reacción al ser alcanzado por un proyectil a distancia: reduces el daño en 1d10 + Des + nivel de monje. Si reduces el daño a 0, puedes atraparlo y gastar 1 Ki para devolverlo inmediatamente como ataque.' },
      { level: 4, name: 'Caída Lenta (Slow Fall)', desc: 'Reacción al caer: reduces cualquier daño que sufras por una caída en una cantidad igual a 5 veces tu nivel de monje.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
      { level: 5, name: 'Golpe Aturdidor (Stunning Strike)', desc: 'Cuando impactas a una criatura con un ataque cuerpo a cuerpo con arma, puedes gastar 1 punto de Ki para forzarle a superar una salvación de Constitución (CD 8 + prof + Sab) o quedar Aturdida hasta el final de tu siguiente turno.' },
      { level: 5, name: 'Artes Marciales (d6)', desc: 'El dado de tus ataques desarmados y armas de monje aumenta a d6.' },
      { level: 6, name: 'Golpes Potenciados con Ki', desc: 'Tus ataques desarmados cuentan como mágicos a efectos de superar la resistencia e inmunidad a los ataques no mágicos.' },
      { level: 6, name: 'Movimiento sin Armadura (+15 pies)', desc: 'Tu velocidad sin armadura aumenta a +15 pies.' },
      { level: 6, name: 'Rasgo de Tradición Monástica', desc: 'Obtienes un nuevo rasgo otorgado por la tradición elegida a nivel 3.' },
      { level: 7, name: 'Evasión (Evasion)', desc: 'Tu agilidad instintiva te permite esquivar efectos de área (como un Aliento de Dragón). Si tienes éxito en una salvación de Destreza no sufres daño, y si fallas solo sufres la mitad.' },
      { level: 7, name: 'Mente Serena (Stillness of Mind)', desc: 'Puedes usar tu acción para poner fin a un efecto sobre ti mismo que te esté causando estar Hechizado o Asustado.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Movimiento sin Armadura Mejorado', desc: 'Obtienes la capacidad de moverte a lo largo de superficies verticales y a través de líquidos en tu turno sin caer.' },
      { level: 10, name: 'Pureza Corporal', desc: 'Tu dominio del Ki te hace completamente inmune al veneno y a las enfermedades.' },
      { level: 10, name: 'Movimiento sin Armadura (+20 pies)', desc: 'Tu velocidad sin armadura aumenta a +20 pies.' },
      { level: 11, name: 'Artes Marciales (d8)', desc: 'El dado de tus ataques desarmados y armas de monje aumenta a d8.' },
      { level: 11, name: 'Rasgo de Tradición Monástica', desc: 'Obtienes un rasgo avanzado de tu Tradición Monástica.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Lengua del Sol y la Luna', desc: 'Aprendes a tocar el Ki de otras mentes: entiendes todos los idiomas hablados, y cualquier criatura que entienda un idioma comprende lo que dices.' },
      { level: 14, name: 'Alma de Diamante (Diamond Soul)', desc: 'Tu dominio del Ki te otorga competencia en todas las tiradas de salvación. Además, cuando fallas una salvación, puedes gastar 1 Ki para volver a tirarla y quedarte con el nuevo resultado.' },
      { level: 14, name: 'Movimiento sin Armadura (+25 pies)', desc: 'Tu velocidad sin armadura aumenta a +25 pies.' },
      { level: 15, name: 'Cuerpo Eterno (Timeless Body)', desc: 'Tu Ki sostiene tu organismo: no sufres la fragilidad de la vejez y no puedes envejecer mágicamente (sigues pudiendo morir de viejo), y ya no necesitas comida ni agua.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Artes Marciales (d10)', desc: 'El dado de tus ataques desarmados y armas de monje aumenta a d10.' },
      { level: 17, name: 'Rasgo Maestro de Tradición Monástica', desc: 'Alcanzas el poder supremo de tu orden monástica.' },
      { level: 18, name: 'Cuerpo Vacío (Empty Body)', desc: 'Puedes gastar 4 puntos de Ki como acción para volverte invisible durante 1 minuto, obteniendo además resistencia a todo daño excepto fuerza. Por 8 Ki puedes lanzar Proyección Astral sobre ti mismo.' },
      { level: 18, name: 'Movimiento sin Armadura (+30 pies)', desc: 'Tu velocidad sin armadura alcanza su máximo de +30 pies.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Ser Perfecto (Perfect Self)', desc: 'Al tirar iniciativa al comienzo de un combate, si no te queda ningún punto de Ki, recuperas inmediatamente 4 puntos de Ki.' },
    ],
  },
  {
    id: 'bardo',
    name: 'Bardo',
    description: 'Un maestro de la canción, el discurso y la magia que teje melodías para inspirar aliados y manipular el tejido de la realidad.',
    hitDie: 8,
    primaryAbility: 'Carisma',
    savingThrows: ['Destreza', 'Carisma'],
    armorProficiencies: ['Armaduras ligeras'],
    weaponProficiencies: ['Armas simples', 'Ballestas de mano', 'Espadas largas', 'Estoques', 'Espadas cortas'],
    isSpellcaster: true,
    casterType: 'full',
    spellcastingAbility: 'cha',
    subclassesName: 'Colegio Bárdico',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-inspiracion-bardica',
        name: 'Inspiración Bárdica',
        calculateMax: (lvl) => Math.max(1, Math.floor(lvl / 4) + 2), // Mod Carisma estimado
        resetOn: 'long',
        diceType: 'd6',
        description: 'Otorgas un dado de inspiración (d6 a nv 1-4, d8 a nv 5) a un aliado a 60 pies. Puede sumarlo a un ataque, prueba o salvación.',
      },
    ],
    subclasses: [
      {
        id: 'colegio-saber',
        name: 'Colegio del Saber (College of Lore)',
        description: 'Buscadores insaciables de secretos que insultan enemigos y aprenden magia de cualquier clase.',
        features: [
          { level: 3, name: 'Competencias Adicionales', desc: 'Ganas competencia en tres habilidades de tu elección.' },
          { level: 3, name: 'Palabras Mordaces (Cutting Words)', desc: 'Reacción: cuando una criatura a 60 pies haga una tirada de ataque, prueba de característica o tirada de daño, restas tu dado de Inspiración Bárdica al resultado.' },
          { level: 6, name: 'Secretos Mágicos Adicionales', desc: 'Aprendes dos conjuros de cualquier clase de tu elección (de un nivel que puedas lanzar). Cuentan como conjuros de bardo para ti.' },
          { level: 14, name: 'Habilidad Inigualable', desc: 'Cuando haces una prueba de característica, puedes tirar un dado de Inspiración Bárdica y sumarlo a tu prueba.' },
        ],
      },
      {
        id: 'colegio-valor',
        name: 'Colegio del Valor (College of Valor)',
        description: 'Poetas guerreros que visten armaduras medias, portan armas marciales y potencian el combate de sus camaradas.',
        features: [
          { level: 3, name: 'Competencias Adicionales', desc: 'Ganas competencia con armaduras medias, escudos y armas marciales.' },
          { level: 3, name: 'Inspiración de Combate', desc: 'Una criatura que tenga tu dado de inspiración puede sumarlo a una tirada de daño con arma, o usar su reacción para sumarlo a su CA contra un ataque.' },
          { level: 6, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
          { level: 14, name: 'Magia de Batalla', desc: 'Cuando usas tu acción para lanzar un conjuro de bardo, puedes realizar un ataque con arma como acción adicional.' },
        ],
      },
      {
        id: 'colegio-espadas',
        name: 'Colegio de las Espadas (College of Swords)',
        description: 'Danzarines del filo y duelistas acrobáticos que convierten el combate cuerpo a cuerpo en un espectáculo letal.',
        features: [
          { level: 3, name: 'Competencias de Espadachín', desc: 'Ganas competencia con armaduras medias y la cimitarra. Puedes usar un arma cuerpo a cuerpo simple o marcial con la que seas competente como foco para tus conjuros de bardo.' },
          { level: 3, name: 'Estilo de Combate de Duelista', desc: 'Eliges el Estilo de Combate Duelo (+2 al daño con una mano) o Combate con Dos Armas (+modificador al daño del ataque adicional).' },
          { level: 3, name: 'Florituras de Cuchilla (Blade Flourish)', desc: 'Al hacer la acción de Atacar, tu velocidad aumenta en 10 pies. Al impactar puedes gastar un dado de Inspiración Bárdica para realizar una floritura: Floritura Defensiva (+CA igual al dado), Deslizante (empujas al blanco 5 pies + dado y te mueves) o Cortante (dañas a un segundo blanco adyacente).' },
          { level: 6, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
          { level: 14, name: 'Floritura del Maestro', desc: 'Siempre que uses una opción de Floritura de Cuchilla, puedes tirar un d6 en lugar de gastar un dado de Inspiración Bárdica de tu reserva.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Lanzamiento de Conjuros de Bardo', desc: 'Lanzas conjuros arcanos basados en Carisma y no necesitas preparar conjuros: conoces un repertorio fijo de la lista de bardo.' },
      { level: 1, name: 'Inspiración Bárdica (d6)', desc: 'Como acción adicional otorgas un dado de inspiración (d6) a un aliado a 60 pies. Puede sumarlo a un ataque, prueba de característica o salvación en los próximos 10 minutos (usos = Mod. Carisma por descanso largo).' },
      { level: 2, name: 'Todoterreno (Jack of All Trades)', desc: 'Añades la mitad de tu bonificador de competencia (redondeando hacia abajo) a cualquier prueba de característica que no incluya ya tu bonificador de competencia (¡incluye tiradas de iniciativa!).' },
      { level: 2, name: 'Canción de Descanso (1d6)', desc: 'Tú y los aliados que escuchen tu música durante un descanso corto recuperáis 1d6 puntos de golpe adicionales al gastar dados de golpe.' },
      { level: 3, name: 'Colegio Bárdico (Subclase)', desc: 'Te unes a un Colegio Bárdico (Saber, Valor, Espadas, etc.), obteniendo rasgos artísticos y marciales a niveles 3, 6 y 14.' },
      { level: 3, name: 'Pericia (Expertise)', desc: 'Eliges dos de tus competencias de habilidad: tu bonificador de competencia se duplica para ellas.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Inspiración Bárdica Mejorada (d8)', desc: 'El dado de tu Inspiración Bárdica aumenta a d8.' },
      { level: 5, name: 'Fuente de Inspiración (Font of Inspiration)', desc: 'Recuperas todos tus usos gastados de Inspiración Bárdica tras completar un descanso corto o largo.' },
      { level: 6, name: 'Contraencanto (Countercharm)', desc: 'Como acción comienzas una melodía que otorga a ti y a los aliados a 30 pies ventaja en tiradas de salvación contra quedar Asustado o Hechizado.' },
      { level: 6, name: 'Rasgo de Colegio Bárdico', desc: 'Obtienes un nuevo rasgo otorgado por tu colegio (Ataque Adicional en Colegio del Valor o Colegio de las Espadas; Secretos Mágicos Adicionales en Colegio del Saber).' },
      { level: 7, name: 'Conjuros de Bardo de 4.º Nivel', desc: 'Desbloqueas ranuras y conjuros de 4.º nivel (Polimorfar, Puerta Dimensional, Compulsión).' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Canción de Descanso (1d8)', desc: 'La curación adicional de tu Canción de Descanso aumenta a 1d8.' },
      { level: 10, name: 'Secretos Mágicos (Magical Secrets - 2 conjuros)', desc: 'Aprendes dos conjuros de cualquier clase de tu elección (incluso conjuros que un mago o clérigo no podría tener todavía). Cuentan como conjuros de bardo para ti.' },
      { level: 10, name: 'Pericia Adicional', desc: 'Eliges otras dos de tus competencias de habilidad para duplicar tu bonificador de competencia.' },
      { level: 10, name: 'Inspiración Bárdica (d10)', desc: 'El dado de tu Inspiración Bárdica aumenta a d10.' },
      { level: 11, name: 'Conjuros de Bardo de 6.º Nivel', desc: 'Desbloqueas conjuros de 6.º nivel (Danza Irresistible de Otto, Sugestión en Masa, Visión Verdadera).' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Canción de Descanso (1d10)', desc: 'La curación adicional de tu Canción de Descanso aumenta a 1d10.' },
      { level: 14, name: 'Secretos Mágicos (2 conjuros adicionales)', desc: 'Aprendes otros dos conjuros de cualquier clase de tu elección.' },
      { level: 14, name: 'Rasgo Maestro de Colegio Bárdico', desc: 'Alcanzas el clímax dramático de tu colegio bárdico.' },
      { level: 15, name: 'Inspiración Bárdica (d12)', desc: 'El dado de tu Inspiración Bárdica alcanza su valor máximo de d12.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Canción de Descanso (1d12)', desc: 'La curación adicional de tu Canción de Descanso alcanza 1d12.' },
      { level: 18, name: 'Secretos Mágicos Supremos (2 conjuros adicionales)', desc: 'Aprendes otros dos conjuros de cualquier clase de tu elección (¡incluyendo Deseo de 9.º nivel!).' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Inspiración Superior (Superior Inspiration)', desc: 'Cuando tiras iniciativa y no te queda ningún uso de Inspiración Bárdica, recuperas inmediatamente un uso.' },
    ],
  },
  {
    id: 'druida',
    name: 'Druida',
    description: 'Un sacerdote de la naturaleza ancestral que adopta formas de bestias y canaliza las fuerzas elementales.',
    hitDie: 8,
    primaryAbility: 'Sabiduría',
    savingThrows: ['Inteligencia', 'Sabiduría'],
    armorProficiencies: ['Armaduras ligeras', 'Armaduras medias (no metálicas)', 'Escudos (no metálicos)'],
    weaponProficiencies: ['Garrotes', 'Dagas', 'Dardos', 'Jabalinas', 'Mazas', 'Bastones', 'Cimitarras', 'Hondas', 'Lanzas'],
    isSpellcaster: true,
    casterType: 'full',
    spellcastingAbility: 'wis',
    subclassesName: 'Círculo Druídico',
    subclassUnlockLevel: 2,
    defaultResources: [
      {
        id: 'res-forma-salvaje',
        name: 'Forma Salvaje (Wild Shape)',
        calculateMax: () => 2,
        resetOn: 'short',
        description: 'Te transformas mágicamente en una bestia que hayas visto (VD 1/4 a nv 2, VD 1/2 a nv 4, VD 1 a nv 8 con vuelo). Asumes sus HP y atributos físicos.',
      },
    ],
    subclasses: [
      {
        id: 'circulo-tierra',
        name: 'Círculo de la Tierra (Circle of the Land)',
        description: 'Místicos vinculados a un bioma que recuperan magia en descansos cortos y dominan hechizos del entorno.',
        features: [
          { level: 2, name: 'Truco Adicional', desc: 'Aprendes un truco de druida adicional de tu elección.' },
          { level: 2, name: 'Recuperación Natural', desc: 'Una vez al día tras un descanso corto, puedes recuperar ranuras de conjuro cuya suma de niveles sea menor o igual a la mitad de tu nivel de druida.' },
          { level: 3, name: 'Conjuros de Círculo', desc: 'Ganas acceso a conjuros asociados a tu bioma (Ártico, Costa, Desierto, Bosque, Montaña, Pantano, etc.) siempre preparados.' },
          { level: 6, name: 'Paso de la Tierra', desc: 'Moverte a través de terreno difícil no mágico no te cuesta movimiento extra ni sufres daño de plantas espinosas.' },
          { level: 10, name: 'Protección de la Naturaleza', desc: 'No puedes ser envenenado ni asustado por elementales o fatas, y eres inmune a venenos y enfermedades.' },
          { level: 14, name: 'Santuario de la Naturaleza', desc: 'Las bestias y criaturas vegetales deben superar salvación de Sabiduría contra tu CD para atacarte.' },
        ],
      },
      {
        id: 'circulo-luna',
        name: 'Círculo de la Luna (Circle of the Moon)',
        description: 'Guerreros salvajes que se transforman en bestias poderosas (Oso pardo, Lobo terrible, Elementales) como acción adicional.',
        features: [
          { level: 2, name: 'Forma Salvaje de Combate', desc: 'Puedes usar Forma Salvaje como acción adicional en lugar de una acción normal, y puedes gastar una ranura de conjuro como acción adicional para recuperar 1d8 PG por nivel de ranura mientras estás transformado.' },
          { level: 2, name: 'Formas de Círculo (VD 1)', desc: 'Puedes transformarte en bestias con un Valor de Desafío de hasta 1 (como un Oso Pardo o Lobo Terrible).' },
          { level: 6, name: 'Golpe Primigenio', desc: 'Tus ataques en forma de bestia cuentan como mágicos para superar resistencias.' },
          { level: 10, name: 'Forma Salvaje Elemental', desc: 'Puedes gastar dos usos de Forma Salvaje a la vez para transformarte en un Elemental de Aire, Tierra, Fuego o Agua.' },
          { level: 14, name: 'Mil Formas', desc: 'Puedes lanzar el conjuro Alterar el Propio Aspecto a voluntad sin gastar ranura.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Druídico (Druidic)', desc: 'Conoces el Druídico, el idioma secreto de los druidas. Puedes hablarlo y dejar mensajes ocultos que solo otros druidas pueden descifrar.' },
      { level: 1, name: 'Lanzamiento de Conjuros Divinos', desc: 'Preparas Sabiduría + nivel de druida conjuros cada día de toda la lista de druida usando Sabiduría como aptitud mágica.' },
      { level: 1, name: 'Lanzamiento Ritual', desc: 'Puedes lanzar cualquier conjuro de druida preparado como ritual si tiene la etiqueta ritual.' },
      { level: 2, name: 'Forma Salvaje (Wild Shape - 2 usos)', desc: 'Como acción puedes transformarte mágicamente en una bestia que hayas visto (2 usos por descanso corto). Asumes los PG y atributos físicos de la criatura (VD 1/4 máx, sin nadar ni volar).' },
      { level: 2, name: 'Círculo Druídico (Subclase)', desc: 'Eliges pertenecer a un Círculo Druídico (Tierra, Luna, etc.), obteniendo rasgos mágicos o transformaciones ferales a niveles 2, 6, 10 y 14.' },
      { level: 3, name: 'Conjuros Druídicos de 2.º Nivel', desc: 'Desbloqueas ranuras y conjuros de 2.º nivel (Crecimiento Espinoso, Rayo de Luna, Pasar sin Huella, Piel de Roble).' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 4, name: 'Forma Salvaje Mejorada (VD 1/2 y Nadar)', desc: 'Puedes transformarte en bestias de hasta VD 1/2 con velocidad de nado (como Cocodrilo).' },
      { level: 5, name: 'Conjuros Druídicos de 3.er Nivel', desc: 'Desbloqueas conjuros de 3.er nivel (Conjurar Animales, Llamar al Relámpago, Disipar Magia, Crecimiento Vegetal).' },
      { level: 6, name: 'Rasgo de Círculo Druídico', desc: 'Obtienes un nuevo rasgo otorgado por el círculo elegido a nivel 2.' },
      { level: 7, name: 'Conjuros Druídicos de 4.º Nivel', desc: 'Desbloqueas conjuros de 4.º nivel (Polimorfar, Confusión, Muro de Fuego, Terreno Alucinatorio).' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 8, name: 'Forma Salvaje Suprema (VD 1 y Vuelo)', desc: 'Puedes transformarte en bestias de hasta VD 1 con velocidad de vuelo (como Águila Gigante).' },
      { level: 9, name: 'Conjuros Druídicos de 5.º Nivel', desc: 'Desbloqueas conjuros de 5.º nivel (Comunión con la Naturaleza, Reencarnar, Descarga de Furia Elemental).' },
      { level: 10, name: 'Rasgo de Círculo Druídico', desc: 'Obtienes un rasgo avanzado de tu Círculo Druídico.' },
      { level: 11, name: 'Conjuros Druídicos de 6.º Nivel', desc: 'Desbloqueas conjuros de 6.º nivel (Muro de Espinas, Curar Heridas en Masa, Rayo Solar).' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Conjuros Druídicos de 7.º Nivel', desc: 'Desbloqueas conjuros de 7.º nivel (Tormenta de Fuego, Cambiar de Forma).' },
      { level: 14, name: 'Rasgo Maestro de Círculo Druídico', desc: 'Alcanzas la comunión suprema de tu Círculo Druídico.' },
      { level: 15, name: 'Conjuros Druídicos de 8.º Nivel', desc: 'Desbloqueas conjuros de 8.º nivel (Terremoto, Explosión Solar, Controlar el Clima).' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Conjuros Druídicos de 9.º Nivel', desc: 'Desbloqueas conjuros legendarios de 9.º nivel (Forma de Bestia Primigenia, Resurrección Verdadera, Tormenta de la Venganza).' },
      { level: 18, name: 'Cuerpo Atemporal (Timeless Body)', desc: 'La magia primigenia ralentiza tu envejecimiento: por cada 10 años que pasen, tu cuerpo envejece físicamente solo 1 año.' },
      { level: 18, name: 'Conjuros Bestiales (Beast Spells)', desc: 'Puedes lanzar muchos de tus conjuros de druida mientras estés en Forma Salvaje, realizando los componentes verbales y somáticos en tu forma bestial.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Archidruida (Archdruid)', desc: 'Puedes usar tu rasgo de Forma Salvaje un número ilimitado de veces. Además, puedes ignorar los componentes verbales, somáticos y materiales que carezcan de coste y no se consuman al lanzar cualquier conjuro de druida.' },
    ],
  },
  {
    id: 'hechicero',
    name: 'Hechicero (Sorcerer)',
    description: 'Un lanzador de conjuros que posee magia innata debida a una herencia exótica, anomalía planar o toque del destino.',
    hitDie: 6,
    primaryAbility: 'Carisma',
    savingThrows: ['Constitución', 'Carisma'],
    armorProficiencies: ['Ninguna'],
    weaponProficiencies: ['Dagas', 'Dardos', 'Hondas', 'Bastones', 'Ballestas ligeras'],
    isSpellcaster: true,
    casterType: 'full',
    spellcastingAbility: 'cha',
    subclassesName: 'Origen de Hechicería',
    subclassUnlockLevel: 1,
    defaultResources: [
      {
        id: 'res-puntos-hechiceria',
        name: 'Puntos de Hechicería (Sorcery Points)',
        calculateMax: (lvl) => (lvl >= 2 ? lvl : 0),
        resetOn: 'long',
        description: 'Puntos arcanos para moldear conjuros con Metamagia o crear ranuras de conjuro adicionales.',
      },
    ],
    subclasses: [
      {
        id: 'magia-salvaje',
        name: 'Magia Salvaje (Wild Magic)',
        description: 'La magia fluye de forma caótica e impredecible a su alrededor.',
        features: [
          { level: 1, name: 'Ola de Magia Salvaje', desc: 'Tras lanzar un conjuro de nivel 1+, el DM puede pedir una tirada de d20: con un 1 ocurre un efecto de la tabla salvaje.' },
          { level: 1, name: 'Mareas de Caos', desc: 'Ganas ventaja en un ataque, prueba o salvación una vez por descanso largo.' },
          { level: 6, name: 'Doblegar la Suerte', desc: 'Reacción: gastas 2 puntos de hechicería para sumar o restar 1d4 a la tirada de d20 de otra criatura.' },
          { level: 14, name: 'Caos Controlado', desc: 'Al tirar en la tabla de magia salvaje tiras dos veces y eliges el resultado que prefieras.' },
          { level: 18, name: 'Bombardeo de Hechizos', desc: 'Cuando saques el daño máximo en un dado de conjuro, tiras un dado extra de ese tipo.' },
        ],
      },
      {
        id: 'linaje-draconico',
        name: 'Linaje Dracónico (Draconic Bloodline)',
        description: 'La sangre de los dragones corre por sus venas, otorgándoles escamas y magia elemental.',
        features: [
          { level: 1, name: 'Ancestro Dracónico', desc: 'Eliges el tipo de dragón (Rojo, Azul, Dorado, Blanco, etc.) asociado a un tipo de daño elemental y aprendes el idioma Dracónico.' },
          { level: 1, name: 'Resiliencia Dracónica', desc: 'Tus PG máximos aumentan en 1 por cada nivel de hechicero, y sin armadura tu CA es 13 + Destreza.' },
          { level: 6, name: 'Afinidad Elemental', desc: 'Sumas tu modificador de Carisma al daño de conjuros del elemento de tu ancestro, y gastas 1 punto de hechicería para ganar resistencia a ese elemento durante 1 hora.' },
          { level: 14, name: 'Alas de Dragón', desc: 'Como acción adicional brotan alas dracónicas de tu espalda otorgándote una velocidad de vuelo igual a tu velocidad actual.' },
          { level: 18, name: 'Presencia Dracónica', desc: 'Como acción gastas 5 puntos de hechicería para emitir un aura de 60 pies que deja a los enemigos Hechizados o Asustados durante 1 minuto.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Lanzamiento de Conjuros Arcanos', desc: 'Lanzas conjuros arcanos innatos mediante tu Carisma. Conoces un número fijo de conjuros y no requieres prepararlos.' },
      { level: 1, name: 'Origen de Hechicería (Subclase)', desc: 'Eliges la fuente de tu magia innata (Magia Salvaje, Linaje Dracónico, etc.), obteniendo rasgos mágicos a niveles 1, 6, 14 y 18.' },
      { level: 2, name: 'Fuente de Magia (Font of Magic)', desc: 'Obtienes Puntos de Hechicería iguales a tu nivel de hechicero. Puedes gastar puntos para crear ranuras de conjuro adicionales, o convertir ranuras de conjuro en puntos de hechicería como acción adicional.' },
      { level: 3, name: 'Metamagia (Metamagic - 2 opciones)', desc: 'Aprendes a doblar y alterar las reglas de tus conjuros: eliges dos opciones entre Conjuro Acelerado (lanzar con acción adicional), Conjuro Gemelo (afectar a 2 blancos), Conjuro Sutil (sin componentes verbales ni somáticos), Conjuro Potenciado (repetir dados de daño), Conjuro Extendido o Conjuro Cuidadoso.' },
      { level: 3, name: 'Conjuros de Hechicero de 2.º Nivel', desc: 'Desbloqueas ranuras y conjuros arcanos de 2.º nivel (Imagen Espejada, Rayo Abrasador, Paso Brumoso).' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Conjuros de Hechicero de 3.er Nivel', desc: 'Desbloqueas conjuros de 3.er nivel (Bola de Fuego, Contrahechizo, Relámpago, Acelerar, Volar).' },
      { level: 6, name: 'Rasgo de Origen de Hechicería', desc: 'Obtienes un nuevo rasgo elemental o caótico otorgado por tu origen a nivel 1.' },
      { level: 7, name: 'Conjuros de Hechicero de 4.º Nivel', desc: 'Desbloqueas conjuros arcanos de 4.º nivel (Polimorfar, Puerta Dimensional, Muro de Fuego).' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Conjuros de Hechicero de 5.º Nivel', desc: 'Desbloqueas conjuros de 5.º nivel (Telequinesis, Cono de Frío, Dominar Persona).' },
      { level: 10, name: 'Metamagia Adicional (3.ª opción)', desc: 'Aprendes una tercera opción de Metamagia de la lista de hechicero.' },
      { level: 11, name: 'Conjuros de Hechicero de 6.º Nivel', desc: 'Desbloqueas conjuros arcanos de 6.º nivel (Desintegrar, Cadena de Relámpagos, Rayo Solar).' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Conjuros de Hechicero de 7.º Nivel', desc: 'Desbloqueas conjuros de 7.º nivel (Teletransporte, Bola de Fuego de Explosión Retardada, Dedo de la Muerte).' },
      { level: 14, name: 'Rasgo de Origen de Hechicería', desc: 'Obtienes un rasgo de movilidad o alteración arcana concedido por tu origen.' },
      { level: 15, name: 'Conjuros de Hechicero de 8.º Nivel', desc: 'Desbloqueas conjuros de 8.º nivel (Dominar Monstruo, Terremoto, Palabra de Poder: Aturdir).' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Metamagia Adicional (4.ª opción)', desc: 'Aprendes una cuarta opción de Metamagia.' },
      { level: 17, name: 'Conjuros de Hechicero de 9.º Nivel', desc: 'Desbloqueas conjuros legendarios de 9.º nivel (Deseo, Tromba de Meteoros, Parar el Tiempo).' },
      { level: 18, name: 'Rasgo Maestro de Origen de Hechicería', desc: 'Desatas el poder supremo del origen de tu magia.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Restauración Hechicera (Sorcerous Restoration)', desc: 'Recuperas 4 puntos de hechicería gastados siempre que termines un descanso corto.' },
    ],
  },
  {
    id: 'brujo',
    name: 'Brujo (Warlock)',
    description: 'Un practicante de la magia ligada a un pacto con un ser de poder sobrenatural de planos lejanos.',
    hitDie: 8,
    primaryAbility: 'Carisma',
    savingThrows: ['Sabiduría', 'Carisma'],
    armorProficiencies: ['Armaduras ligeras'],
    weaponProficiencies: ['Armas simples'],
    isSpellcaster: true,
    casterType: 'pact',
    spellcastingAbility: 'cha',
    subclassesName: 'Patrón de Otro Mundo',
    subclassUnlockLevel: 1,
    defaultResources: [
      {
        id: 'res-slots-pacto',
        name: 'Ranuras de Pacto (Pact Slots)',
        calculateMax: (lvl) => (lvl >= 17 ? 4 : lvl >= 11 ? 3 : 2),
        resetOn: 'short',
        description: 'Todas tus ranuras son del nivel más alto disponible y se recargan por completo en cada descanso corto.',
      },
    ],
    subclasses: [
      {
        id: 'infernal',
        name: 'El Infernal (The Fiend)',
        description: 'Un pacto forjado con un señor de los Nueve Infiernos o el Abismo.',
        features: [
          { level: 1, name: 'Bendición del Oscuro', desc: 'Cuando reduces a un enemigo a 0 HP, ganas puntos de golpe temporales iguales a Carisma + nivel de brujo.' },
          { level: 6, name: 'Suerte del Propio Oscuro', desc: 'Puedes sumar 1d10 a una prueba de característica o tirada de salvación tuya una vez por descanso corto o largo.' },
          { level: 10, name: 'Resiliencia Infernal', desc: 'Eliges un tipo de daño al terminar un descanso para ganar resistencia a él hasta el próximo descanso.' },
          { level: 14, name: 'Lanzar por el Infierno', desc: 'Al impactar a una criatura con un ataque, la transportas instantáneamente a través de los planos inferiores infligiéndole 10d10 de daño psíquico (1 vez por descanso largo).' },
        ],
      },
      {
        id: 'filo-celestial',
        name: 'Filo Celestial / Maldito (Hexblade)',
        description: 'Vinculado a un arma consciente forjada con sombras del Páramo Sombrío.',
        features: [
          { level: 1, name: 'Maldición del Hexblade', desc: 'Eliges un objetivo como acción adicional: crítico con 19-20, daño extra igual a tu bonificador de competencia y te curas si muere.' },
          { level: 1, name: 'Guerrero del Hex', desc: 'Ganas competencia con armaduras medias, escudos y armas marciales. Puedes usar Carisma para ataques y daño con tu arma elegida.' },
          { level: 6, name: 'Espectro Maldito', desc: 'Al matar a un humanoide puedes alzar su alma como un espectro sirviente que combate a tu lado hasta tu próximo descanso largo.' },
          { level: 10, name: 'Armadura de Sombras Embrujada', desc: 'Cuando tu objetivo maldito te impacte con un ataque, tiras un d6: con un 4 o más, el ataque falla independientemente de la tirada.' },
          { level: 14, name: 'Maestro del Hex', desc: 'Cuando tu objetivo bajo la Maldición del Hexblade muera, puedes transferir inmediatamente la maldición a otra criatura a 30 pies.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Magia del Pacto (Pact Magic)', desc: 'Lanzas conjuros arcanos mediante tu Carisma. Todas tus ranuras de conjuro son siempre del nivel más alto disponible y se recargan por completo en cada descanso corto o largo.' },
      { level: 1, name: 'Patrón de Otro Mundo (Subclase)', desc: 'Pactas con un ser primordial de otro plano (El Infernal, El Hexblade, etc.), obteniendo una lista de conjuros expandida y rasgos sobrenaturales a niveles 1, 6, 10 y 14.' },
      { level: 2, name: 'Invocaciones Sobrenaturales (2 invocaciones)', desc: 'Fragmentos de conocimiento prohibido que te otorgan poderes permanentes (p. ej. Explosión Agónica para sumar Carisma al daño de Eldritch Blast, o Visión del Diablo para ver en oscuridad mágica a 120 pies).' },
      { level: 3, name: 'Don del Pacto (Pact Boon)', desc: 'Tu patrón te otorga un regalo de lealtad: Pacto del Filo (arma mágica invocada), Pacto del Tomo (Grimorio de sombras con 3 trucos de cualquier clase) o Pacto de la Cadena (familiar sobrenatural mejorado).' },
      { level: 3, name: 'Ranuras de Pacto de 2.º Nivel', desc: 'Todas tus ranuras de pacto ascienden a 2.º nivel.' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Invocaciones Sobrenaturales (3 invocaciones)', desc: 'Desbloqueas una 3.ª invocación sobrenatural (como Sed de Hojas para realizar dos ataques por turno con tu arma de pacto).' },
      { level: 5, name: 'Ranuras de Pacto de 3.er Nivel', desc: 'Todas tus ranuras de pacto ascienden a 3.er nivel.' },
      { level: 6, name: 'Rasgo de Patrón de Otro Mundo', desc: 'Obtienes un rasgo protector o evasivo otorgado por tu patrón a nivel 6.' },
      { level: 7, name: 'Invocaciones Sobrenaturales (4 invocaciones)', desc: 'Desbloqueas una 4.ª invocación sobrenatural.' },
      { level: 7, name: 'Ranuras de Pacto de 4.º Nivel', desc: 'Todas tus ranuras de pacto ascienden a 4.º nivel.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 9, name: 'Invocaciones Sobrenaturales (5 invocaciones)', desc: 'Desbloqueas una 5.ª invocación sobrenatural.' },
      { level: 9, name: 'Ranuras de Pacto de 5.º Nivel (Máxima Potencia)', desc: 'Todas tus ranuras de pacto alcanzan el 5.º nivel, el límite de potencia para la magia del pacto.' },
      { level: 10, name: 'Rasgo de Patrón de Otro Mundo', desc: 'Obtienes un rasgo de resistencia o defensa planar otorgado por tu patrón.' },
      { level: 11, name: 'Arcano Místico de 6.º Nivel', desc: 'Tu patrón te confiere un secreto mágico: eliges un conjuro de brujo de 6.º nivel. Puedes lanzarlo una vez sin gastar ranura de conjuro por descanso largo.' },
      { level: 11, name: 'Tercera Ranura de Pacto', desc: 'Tu número de ranuras de pacto recargables en descansos cortos aumenta de 2 a 3.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 12, name: 'Invocaciones Sobrenaturales (6 invocaciones)', desc: 'Desbloqueas una 6.ª invocación sobrenatural.' },
      { level: 13, name: 'Arcano Místico de 7.º Nivel', desc: 'Eliges un conjuro de brujo de 7.º nivel que puedes lanzar una vez por descanso largo sin gastar ranura.' },
      { level: 14, name: 'Rasgo Maestro de Patrón de Otro Mundo', desc: 'Desatas el don más temible de tu patrón de otro mundo.' },
      { level: 15, name: 'Arcano Místico de 8.º Nivel', desc: 'Eliges un conjuro de brujo de 8.º nivel que puedes lanzar una vez por descanso largo sin gastar ranura.' },
      { level: 15, name: 'Invocaciones Sobrenaturales (7 invocaciones)', desc: 'Desbloqueas una 7.ª invocación sobrenatural.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Arcano Místico de 9.º Nivel', desc: 'Eliges un conjuro definitivo de 9.º nivel (Visión Verdadera, Proyección Astral, Palabra de Poder: Matar) que puedes lanzar una vez por descanso largo.' },
      { level: 17, name: 'Cuarta Ranura de Pacto', desc: 'Tu número de ranuras de pacto de 5.º nivel recargables en descanso corto aumenta a 4.' },
      { level: 18, name: 'Invocaciones Sobrenaturales (8 invocaciones)', desc: 'Desbloqueas tu 8.ª y última invocación sobrenatural.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Maestro Sobrenatural (Eldritch Master)', desc: 'Puedes rogar a tu patrón durante 1 minuto para recuperar de golpe todas tus ranuras de pacto gastadas de 5.º nivel una vez por descanso largo.' },
    ],
  },
  {
    id: 'explorador',
    name: 'Explorador (Ranger)',
    description: 'Un cazador y rastreador avezado que protege la frontera civilizada de las amenazas de las tierras salvajes.',
    hitDie: 10,
    primaryAbility: 'Destreza y Sabiduría',
    savingThrows: ['Fuerza', 'Destreza'],
    armorProficiencies: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciales'],
    isSpellcaster: true,
    casterType: 'half',
    spellcastingAbility: 'wis',
    subclassesName: 'Arquetipo de Explorador',
    subclassUnlockLevel: 3,
    subclasses: [
      {
        id: 'cazador',
        name: 'Cazador (Hunter)',
        description: 'Desarrolla técnicas letales para exterminar hordas o monstruos colosales.',
        features: [
          { level: 3, name: 'Presa del Cazador', desc: 'Eliges Asesino de Colosos (1d8 de daño extra a criaturas heridas), Cortador de Hordas (ataque extra contra enemigo adyacente) o Asesino de Gigantes (reacción para contraatacar a criaturas Grandes).' },
          { level: 7, name: 'Tácticas Defensivas', desc: 'Eliges Escapar de la Horda (desventaja en ataques de oportunidad contra ti), Defensa contra Ataques Múltiples (+4 CA tras el primer impacto) o Voluntad de Hierro (ventaja en salvaciones contra Asustado).' },
          { level: 11, name: 'Ataque Múltiple', desc: 'Eliges Ataque Volátil (ataque a distancia contra cualquier número de criaturas en un cono de 10 pies) o Torbellino (ataque cuerpo a cuerpo contra cualquier número de enemigos a 5 pies).' },
          { level: 15, name: 'Defensa de Cazador Superior', desc: 'Eliges Evasión, Mantenerse en Pie (reducir daño a la mitad como reacción) o Desviar el Golpe.' },
        ],
      },
      {
        id: 'acechador-sombrio',
        name: 'Acechador Sombrío (Gloom Stalker)',
        description: 'Especialista en emboscadas en cuevas oscuras y el Inframundo.',
        features: [
          { level: 3, name: 'Emboscador Temible', desc: 'Sumas tu Sabiduría a las tiradas de Iniciativa. En tu primer turno en combate tu velocidad aumenta 10 pies y puedes hacer un ataque adicional que inflige 1d8 de daño extra.' },
          { level: 3, name: 'Visión Umbría', desc: 'Ganas Visión en la Oscuridad (60 pies) o aumenta en 30 pies si ya la tienes. Eres invisible para cualquier criatura que confíe en la visión en la oscuridad para verte en tinieblas.' },
          { level: 7, name: 'Mente de Hierro', desc: 'Ganas competencia en tiradas de salvación de Sabiduría (o Inteligencia/Carisma si ya la tienes).' },
          { level: 11, name: 'Ráfaga del Acechador', desc: 'Una vez en cada uno de tus turnos cuando falles un ataque con arma, puedes hacer otro ataque con arma como parte de la misma acción.' },
          { level: 15, name: 'Esquiva Sombría', desc: 'Reacción: cuando una criatura te ataque sin tener ventaja, puedes imponer desventaja a esa tirada de ataque.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Enemigo Predilecto (Favored Enemy)', desc: 'Eliges un tipo de enemigo predilecto (aberraciones, dragones, no muertos, etc.). Tienes ventaja en pruebas de Sabiduría (Supervivencia) para rastrearlos y pruebas de Inteligencia para recordar información sobre ellos, y aprendes uno de sus idiomas.' },
      { level: 1, name: 'Explorador Natural (Natural Explorer)', desc: 'Eliges un terreno predilecto (Ártico, Costa, Desierto, Bosque, Montaña, Pantano, etc.). Tu grupo no puede perderse por medios no mágicos, el terreno difícil no os ralentiza y tu competencia se duplica en pruebas de Inteligencia y Sabiduría en dicho terreno.' },
      { level: 2, name: 'Estilo de Combate', desc: 'Especialización marcial: Tiro con Arco (+2 a tiradas de ataque con armas a distancia), Defensa (+1 CA), Duelo (+2 daño a una mano) o Combate con Dos Armas (+modificador al daño en ataque adicional).' },
      { level: 2, name: 'Lanzamiento de Conjuros de Explorador', desc: 'Lanzas conjuros de la naturaleza basados en Sabiduría. Conoces un número fijo de conjuros y tienes ranuras para lanzarlos.' },
      { level: 3, name: 'Arquetipo de Explorador (Subclase)', desc: 'Eliges tu arquetipo de cazador o explorador (Cazador, Acechador Sombrío, etc.), obteniendo rasgos a niveles 3, 7, 11 y 15.' },
      { level: 3, name: 'Consciencia Primigenia', desc: 'Puedes gastar una ranura de conjuro de explorador como acción para percibir si hay aberraciones, celestiales, dragones, elementales, fatas, infernales o no muertos a 1 milla (o 6 millas en tu terreno predilecto).' },
      { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 5, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces en lugar de una cuando realizas la acción de Atacar en tu turno.' },
      { level: 5, name: 'Conjuros de Explorador de 2.º Nivel', desc: 'Desbloqueas ranuras y conjuros de 2.º nivel (Pasar sin Huella, Rayo de Luna, Cordón de Flechas, Silencio).' },
      { level: 6, name: 'Mejoras de Enemigo Predilecto y Explorador Natural', desc: 'Eliges un enemigo predilecto adicional y un segundo tipo de terreno predilecto.' },
      { level: 7, name: 'Rasgo de Arquetipo de Explorador', desc: 'Obtienes un nuevo rasgo táctico o defensivo otorgado por tu arquetipo a nivel 3.' },
      { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 8, name: 'Paso de la Tierra (Land Stride)', desc: 'Moverte a través de terreno difícil no mágico no te cuesta movimiento adicional, y pasas a través de plantas no mágicas sin sufrir daño ni quedar impedido.' },
      { level: 9, name: 'Conjuros de Explorador de 3.er Nivel', desc: 'Desbloqueas conjuros de 3.er nivel (Conjurar Animales, Flecha Relampagueante, Respiración Acuática).' },
      { level: 10, name: 'Explorador Natural Adicional', desc: 'Eliges un tercer tipo de terreno predilecto.' },
      { level: 10, name: 'Ocultamiento a Simple Vista (Hide in Plain Sight)', desc: 'Puedes pasar 1 minuto creando camuflaje con barro, hojas y elementos naturales: obtienes un bonificador de +10 a pruebas de Sigilo mientras permanezcas inmóvil y apoyado contra una superficie natural.' },
      { level: 11, name: 'Rasgo de Arquetipo de Explorador', desc: 'Obtienes un rasgo ofensivo o de ataque múltiple otorgado por tu arquetipo.' },
      { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 13, name: 'Conjuros de Explorador de 4.º Nivel', desc: 'Desbloqueas conjuros de 4.º nivel (Libertad de Movimiento, Localizar Criatura, Acechador Invisible).' },
      { level: 14, name: 'Enemigo Predilecto Adicional', desc: 'Eliges un tercer tipo de enemigo predilecto.' },
      { level: 14, name: 'Desvanecerse (Vanish)', desc: 'Puedes usar la acción de Esconderte como acción adicional en tu turno. Además, no puedes ser rastreado por medios no mágicos a menos que decidas dejar un rastro.' },
      { level: 15, name: 'Rasgo Maestro de Arquetipo de Explorador', desc: 'Alcanzas la cúspide táctica de tu arquetipo de explorador.' },
      { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 17, name: 'Conjuros de Explorador de 5.º Nivel', desc: 'Desbloqueas conjuros supremos de 5.º nivel (Comunión con la Naturaleza, Aljaba Rápida, Piel Pétrea).' },
      { level: 18, name: 'Sentidos Salvajes (Feral Senses)', desc: 'Ganas sentidos sobrenaturales: cuando atacas a una criatura que no puedes ver, tu falta de visión no impone desventaja en tus tiradas de ataque, y eres consciente de la ubicación de cualquier criatura invisible a 30 pies de ti si no está oculta.' },
      { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una puntuación de característica en 2, dos en 1 (máx 20), o eliges una Dote oficial de D&D 5e.' },
      { level: 20, name: 'Exterminador de Enemigos (Foe Slayer)', desc: 'Te conviertes en un cazador sin rival: una vez en cada uno de tus turnos puedes añadir tu modificador de Sabiduría a la tirada de ataque o a la tirada de daño de un ataque que hagas contra uno de tus enemigos predilectos.' },
    ],
  },
  {
    id: 'pugilista',
    name: 'Pugilista (Homebrew 5e)',
    description: 'Un combatiente callejero y maestro del cuadrilátero que no teme recibir castigo para devolverlo duplicado. Acumula Puntos de Flujo (Flow Points) para desatar combinaciones brutales, trucos sucios y contraataques noqueadores.',
    hitDie: 10,
    primaryAbility: 'Fuerza o Destreza',
    savingThrows: ['Fuerza', 'Destreza'],
    armorProficiencies: ['Armaduras ligeras', 'Armaduras medias'],
    weaponProficiencies: ['Armas simples', 'Ataques desarmados'],
    isSpellcaster: false,
    casterType: 'none',
    subclassesName: 'Estilo de Boxeo (Boxing Style)',
    subclassUnlockLevel: 3,
    defaultResources: [
      {
        id: 'res-flujo',
        name: 'Puntos de Flujo (Flow Points)',
        calculateMax: (lvl) => 2 + Math.floor((lvl - 1) / 4),
        resetOn: 'short',
        description: 'Se ganan al conectar golpes o esquivar ataques (máx igual a tu bono de competencia). Se gastan para Golpes de Poder (+1d6 de daño por punto gastado) o para sumar a salvaciones fallidas.',
      },
      {
        id: 'res-cross',
        name: 'Contraataque Cruzado (Cross Counter)',
        calculateMax: () => 1,
        resetOn: 'short',
        description: 'Reacción al recibir un golpe cuerpo a cuerpo: absorbe 1d10 + Con + Nivel de daño. Si reduces el daño a 0, devuelves un golpe de inmediato.',
      },
    ],
    subclasses: [
      {
        id: 'out-boxer',
        name: 'Out-boxer (Boxeador Evasivo)',
        description: 'Especialista en juego de piernas veloz, fintas y mantener las distancias con reflejos relámpago.',
        features: [
          { level: 3, name: 'Pies de Pluma', desc: 'Ventaja en tiradas de Iniciativa. Levantarse de derribado como reacción gastando solo 5 pies de movimiento.' },
          { level: 3, name: 'Juego de Piernas Defensivo', desc: 'Cuando una criatura termina su turno a 5 pies de ti, puedes moverte hasta la mitad de tu velocidad como reacción sin provocar ataques de oportunidad.' },
          { level: 9, name: 'Recuperación del Campeón', desc: 'Eliminas 1 nivel de agotamiento y ganas PG temporales iguales a tu nivel + Con tras un descanso corto.' },
          { level: 13, name: 'Retirada Inexpugnable', desc: 'Tras ser alcanzado por un ataque, ganas +4 a la CA contra ataques subsiguientes de ese enemigo en el mismo turno.' },
          { level: 17, name: 'Reflejos Relámpago', desc: 'Puedes gastar 1 Punto de Flujo para ganar una reacción adicional en tu asalto.' },
        ],
      },
      {
        id: 'slugger',
        name: 'Slugger (Fajador / Golpeador Pesado)',
        description: 'Fuerza bruta descomunal. Aguanta cualquier embestida y conecta ganchos demoledores que noquean gigantes.',
        features: [
          { level: 3, name: 'Pies de Plomo', desc: 'Ventaja en tiradas de salvación para evitar ser empujado, arrastrado o derribado.' },
          { level: 9, name: 'Golpe Aturdidor Pesado', desc: 'Al golpear con Golpe de Poder, gastas 1 Punto de Flujo adicional para forzar salvación de Constitución o dejar al enemigo con desventaja en ataques y salvaciones de Destreza.' },
          { level: 13, name: 'Peso Pesado', desc: 'Cuentas como un tamaño Grande para capacidad de carga, agarre, empujar y arrollar.' },
          { level: 17, name: 'Golpe Titánico', desc: 'Al usar Golpe de Poder, tiras tu Dado de Pugilismo en lugar de d6s y puedes repetir las tiradas de 1 y 2 en los dados de daño.' },
        ],
      },
      {
        id: 'swarmer',
        name: 'Swarmer (Acosador / Enjambre de Puños)',
        description: 'Lanza ráfagas incesantes a quemarropa que abruman las defensas enemigas con una lluvia de combinaciones.',
        features: [
          { level: 3, name: 'Primer Golpe Letal', desc: 'Sumas tu bonificador de competencia a la Iniciativa. Tienes ventaja en el primer ataque del combate contra una criatura que aún no haya actuado (si impacta, es crítico automático).' },
          { level: 9, name: 'Fervor Desesperado', desc: 'Cuando estás por debajo de la mitad de tus PG máximos, gastas 1 Punto de Flujo para tener ventaja en todos tus ataques cuerpo a cuerpo hasta el final del turno (1/descanso corto).' },
          { level: 13, name: 'Segundo Aliento de Combate', desc: 'Te otorgas puntos de golpe temporales iguales al triple de tu nivel de Pugilista (1/descanso largo).' },
          { level: 17, name: 'Dos Turnos de Asalto', desc: 'En el primer asalto de cualquier combate (si no estás sorprendido), tomas dos turnos completos: el primero en tu iniciativa normal y el segundo a iniciativa - 10.' },
        ],
      },
    ],
    featuresByLevel: [
      { level: 1, name: 'Pugilismo (Pugilism)', desc: 'Tus ataques desarmados infligen 1d6 de daño (1d8 a nv 5, 1d10 a nv 11, 1d12 a nv 17). Puedes usar Fuerza o Destreza. Puedes dar un golpe desarmado como acción adicional. Velocidad +5 pies x mitad de bonificador de competencia sin armadura pesada ni escudo.' },
      { level: 1, name: 'Piel Dura (Thick Skin)', desc: 'Sin armadura ni escudo, tu Clase de Armadura (CA) es igual a 13 + Modificador de Constitución.' },
      { level: 1, name: 'Flujo de Combate (Flow Points)', desc: 'Ganas Puntos de Flujo al impactar o esquivar ataques (máximo igual a tu bono de competencia). Gastas flujo para Golpes de Poder (+1d6 daño por punto) o sumar a salvaciones fallidas como reacción.' },
      { level: 2, name: 'Trucos de Pugilista (Tricks)', desc: 'Como acción adicional usas: Finta (ventaja en ataque), Guardia (+CA igual a mitad de competencia), Arremetida (+5 pies alcance desarmado) o Apresurarse (Correr/Dash). Ganas 1 Punto de Flujo al usar un truco.' },
      { level: 3, name: 'Contraataque Cruzado (Cross Counter)', desc: 'Reacción al recibir un golpe cuerpo a cuerpo: reduces el daño en 1d10 + Con + nivel de Pugilista. Si reduces el daño a 0, devuelves un ataque cuerpo a cuerpo inmediatamente.' },
      { level: 5, name: 'Ataque Adicional (Extra Attack)', desc: 'Puedes atacar dos veces al usar la acción de Atacar en tu turno.' },
      { level: 5, name: 'Apretar los Dientes (Brace)', desc: 'Reacción al recibir un golpe crítico: lo conviertes en un golpe normal y ganas 1 Punto de Flujo.' },
      { level: 6, name: 'Puños Mágicos & Determinación', desc: 'Tus ataques desarmados cuentan como mágicos. Ganas 1 Punto de Flujo cada vez que superes con éxito una tirada de salvación.' },
      { level: 6, name: 'Cuerpo de Hierro (Iron Body)', desc: 'Ganas un bonificador de +1 a la CA mientras no vistas armadura pesada.' },
      { level: 7, name: 'Instintos de Cuadrilátero', desc: 'Gastas 1 Punto de Flujo para averiguar la CA exacta de un rival, su bonificador de salvación o si está por debajo de la mitad de su vida.' },
      { level: 10, name: 'Entrar Golpeando (Comin Out Swinging)', desc: 'Al tirar iniciativa al inicio del combate, comienzas de inmediato con 2 Puntos de Flujo generados.' },
      { level: 14, name: 'Curtido (Tough Stuff)', desc: 'Competencia en tiradas de salvación de Constitución, ventaja contra veneno y resistencia al daño de veneno.' },
      { level: 15, name: 'No Me Quedo en el Suelo (Wont Stay Down)', desc: 'Añades tu bonificador de competencia a las tiradas de salvación contra muerte. Si sacas 20 o más recuperas PG iguales al doble de tu nivel + Constitución.' },
      { level: 18, name: 'Sangrante pero Invicto (Bloodied But Unbroken)', desc: 'Obtienes resistencia pasiva permanente al daño contundente, perforante y cortante.' },
      { level: 20, name: 'Físico Máximo (Peak Physique)', desc: 'Tus puntuaciones de Fuerza, Destreza y Constitución aumentan en 2, hasta un máximo de 22.' },
    ],
  },
];

const RAW_WIKIDOT_CLASSES: WikidotClass[] = [
  ...BASE_WIKIDOT_CLASSES,
  ARTIFICER_CLASS,
];

export const WIKIDOT_CLASSES: WikidotClass[] = RAW_WIKIDOT_CLASSES.map((cls) => {
  const extraSubclasses = EXPANDED_SUBCLASSES_BY_CLASS[cls.id];
  if (!extraSubclasses || extraSubclasses.length === 0) {
    return cls;
  }
  const existingIds = new Set(cls.subclasses.map((s) => s.id));
  const newSubs = extraSubclasses.filter((s) => !existingIds.has(s.id));
  return {
    ...cls,
    subclasses: [...cls.subclasses, ...newSubs],
  };
});

// ==========================================
// 3. TRASFONDOS (BACKGROUNDS DE WIKIDOT 5E)
// ==========================================
export {
  WIKIDOT_BACKGROUNDS,
  WIKIDOT_BACKGROUND_CATEGORIES,
} from './wikidotBackgroundsData';

// ==========================================
// 4. TABLA OFICIAL DE SLOTS 5E POR NIVEL
// ==========================================
export const FULL_CASTER_SLOTS_TABLE: Record<number, Record<string, number>> = {
  1: { lvl1: 2 },
  2: { lvl1: 3 },
  3: { lvl1: 4, lvl2: 2 },
  4: { lvl1: 4, lvl2: 3 },
  5: { lvl1: 4, lvl2: 3, lvl3: 2 },
  6: { lvl1: 4, lvl2: 3, lvl3: 3 },
  7: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 1 },
  8: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 2 },
  9: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 1 },
  10: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2 },
  11: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1 },
  12: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1 },
  13: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1, lvl7: 1 },
  14: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1, lvl7: 1 },
  15: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1, lvl7: 1, lvl8: 1 },
  16: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1, lvl7: 1, lvl8: 1 },
  17: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2, lvl6: 1, lvl7: 1, lvl8: 1, lvl9: 1 },
  18: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 3, lvl6: 1, lvl7: 1, lvl8: 1, lvl9: 1 },
  19: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 3, lvl6: 2, lvl7: 1, lvl8: 1, lvl9: 1 },
  20: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 3, lvl6: 2, lvl7: 2, lvl8: 1, lvl9: 1 },
};

export const HALF_CASTER_SLOTS_TABLE: Record<number, Record<string, number>> = {
  1: {},
  2: { lvl1: 2 },
  3: { lvl1: 3 },
  4: { lvl1: 3 },
  5: { lvl1: 4, lvl2: 2 },
  6: { lvl1: 4, lvl2: 2 },
  7: { lvl1: 4, lvl2: 3 },
  8: { lvl1: 4, lvl2: 3 },
  9: { lvl1: 4, lvl2: 3, lvl3: 2 },
  10: { lvl1: 4, lvl2: 3, lvl3: 2 },
  11: { lvl1: 4, lvl2: 3, lvl3: 3 },
  12: { lvl1: 4, lvl2: 3, lvl3: 3 },
  13: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 1 },
  14: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 1 },
  15: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 2 },
  16: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 2 },
  17: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 1 },
  18: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 1 },
  19: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2 },
  20: { lvl1: 4, lvl2: 3, lvl3: 3, lvl4: 3, lvl5: 2 },
};

export const WARLOCK_PACT_SLOTS_TABLE: Record<number, { count: number; slotLevel: number }> = {
  1: { count: 1, slotLevel: 1 },
  2: { count: 2, slotLevel: 1 },
  3: { count: 2, slotLevel: 2 },
  4: { count: 2, slotLevel: 2 },
  5: { count: 2, slotLevel: 3 },
  6: { count: 2, slotLevel: 3 },
  7: { count: 2, slotLevel: 4 },
  8: { count: 2, slotLevel: 4 },
  9: { count: 2, slotLevel: 5 },
  10: { count: 2, slotLevel: 5 },
  11: { count: 3, slotLevel: 5 },
  12: { count: 3, slotLevel: 5 },
  13: { count: 3, slotLevel: 5 },
  14: { count: 3, slotLevel: 5 },
  15: { count: 3, slotLevel: 5 },
  16: { count: 3, slotLevel: 5 },
  17: { count: 4, slotLevel: 5 },
  18: { count: 4, slotLevel: 5 },
  19: { count: 4, slotLevel: 5 },
  20: { count: 4, slotLevel: 5 },
};

/**
 * Calcula el nivel máximo de conjuro disponible para una clase y nivel dado
 */
export function getMaxSpellLevelForClass(className: string, level: number): number {
  const norm = className.toLowerCase();
  if (norm.includes('mago') || norm.includes('wizard') ||
      norm.includes('hechicero') || norm.includes('sorcerer') ||
      norm.includes('cler') || norm.includes('dru') || norm.includes('bard')) {
    return Math.min(9, Math.ceil(level / 2));
  }
  if (norm.includes('artifice') || norm.includes('artífice')) {
    return Math.min(5, Math.max(1, Math.ceil(level / 4)));
  }
  if (norm.includes('palad') || norm.includes('explorador') || norm.includes('ranger')) {
    if (level < 2) return 0;
    return Math.min(5, Math.ceil(level / 4));
  }
  if (norm.includes('brujo') || norm.includes('warlock')) {
    return Math.min(5, Math.ceil(level / 2));
  }
  if (norm.includes('caballero arcano') || norm.includes('embaucador')) {
    if (level < 3) return 0;
    if (level < 7) return 1;
    if (level < 13) return 2;
    if (level < 19) return 3;
    return 4;
  }
  return 0;
}

/**
 * Retorna el nivel oficial de D&D 5e en el que la clase desbloquea y consagra su subclase / arquetipo:
 * - Nivel 1: Clérigo, Brujo, Hechicero
 * - Nivel 2: Mago, Druida
 * - Nivel 3: Bárbaro, Bardo, Guerrero, Monje, Paladín, Explorador, Pícaro, Pugilista, Artífice
 */
export function getClassSubclassLevel(cls?: WikidotClass | string): number {
  if (!cls) return 3;
  if (typeof cls === 'object' && typeof cls.subclassUnlockLevel === 'number') {
    return cls.subclassUnlockLevel;
  }
  const id = typeof cls === 'string' ? cls.toLowerCase() : cls.id?.toLowerCase() || '';
  if (
    id.includes('cler') ||
    id.includes('brujo') ||
    id.includes('warlock') ||
    id.includes('hechic') ||
    id.includes('sorcer')
  ) {
    return 1;
  }
  if (id.includes('mago') || id.includes('wizard') || id.includes('druid') || id.includes('druida')) {
    return 2;
  }
  return 3;
}
