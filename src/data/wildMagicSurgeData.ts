// Tabla Oficial de Oleadas de Magia Salvaje (Wild Magic Surge Table) - D&D 5e / Player's Handbook pág. 104
// Adaptado con español neutro 1:1, medidas en pies y categorización táctica.

export interface WildMagicSurgeEntry {
  min: number;
  max: number;
  rangeStr: string;
  title: string;
  effect: string;
  category: 'beneficial' | 'detrimental' | 'neutral' | 'chaotic';
}

export const WILD_MAGIC_SURGE_TABLE: WildMagicSurgeEntry[] = [
  {
    min: 1,
    max: 2,
    rangeStr: '01–02',
    title: 'Oleada Continua',
    effect: 'Tira en esta tabla al comienzo de cada uno de tus turnos durante el próximo minuto, ignorando este resultado en tiradas posteriores.',
    category: 'chaotic',
  },
  {
    min: 3,
    max: 4,
    rangeStr: '03–04',
    title: 'Visión de lo Invisible',
    effect: 'Durante el próximo minuto, puedes ver cualquier criatura invisible si tienes una línea de visión sin obstrucciones hacia ella.',
    category: 'beneficial',
  },
  {
    min: 5,
    max: 6,
    rangeStr: '05–06',
    title: 'Aparición de Modron',
    effect: 'Un modron elegido y controlado por el DM aparece en un espacio desocupado a 5 pies o menos de ti, y desaparece 1 minuto después.',
    category: 'neutral',
  },
  {
    min: 7,
    max: 8,
    rangeStr: '07–08',
    title: 'Bola de Fuego Involuntaria',
    effect: 'Lanzas Bola de Fuego (Fireball) como un conjuro de 3.er nivel centrado en ti mismo (8d6 de daño de fuego, salvación de Destreza CD 8 + mod CAR + bono competencia para mitad).',
    category: 'detrimental',
  },
  {
    min: 9,
    max: 10,
    rangeStr: '09–10',
    title: 'Proyectil Mágico de 5.° Nivel',
    effect: 'Lanzas Proyectil Mágico (Magic Missile) como un conjuro de 5.° nivel (disparas 7 proyectiles que infligen 1d4 + 1 de daño de fuerza cada uno).',
    category: 'beneficial',
  },
  {
    min: 11,
    max: 12,
    rangeStr: '11–12',
    title: 'Alteración de Estatura',
    effect: 'Tira 1d10. Tu altura cambia en un número de pulgadas igual al resultado. Si la tirada es impar, encoges; si es par, creces.',
    category: 'neutral',
  },
  {
    min: 13,
    max: 14,
    rangeStr: '13–14',
    title: 'Confusión Espontánea',
    effect: 'Lanzas Confusión (Confusion) centrado en ti mismo afectando a todas las criaturas en un radio de 10 pies.',
    category: 'detrimental',
  },
  {
    min: 15,
    max: 16,
    rangeStr: '15–16',
    title: 'Regeneración Rápida',
    effect: 'Durante el próximo minuto, recuperas 5 puntos de golpe al comienzo de cada uno de tus turnos.',
    category: 'beneficial',
  },
  {
    min: 17,
    max: 18,
    rangeStr: '17–18',
    title: 'Barba de Plumas',
    effect: 'Te crece una larga barba hecha de plumas que permanece hasta que estornudas, momento en el cual las plumas explotan cómicamente de tu cara.',
    category: 'neutral',
  },
  {
    min: 19,
    max: 20,
    rangeStr: '19–20',
    title: 'Charco Grasiento',
    effect: 'Lanzas Grasa (Grease) centrado en ti mismo (área de 10 pies de lado se vuelve resbaladiza).',
    category: 'chaotic',
  },
  {
    min: 21,
    max: 22,
    rangeStr: '21–22',
    title: 'Vulnerabilidad Mágica Enemiga',
    effect: 'Las criaturas tienen desventaja en la tirada de salvación contra el próximo conjuro que lances en el próximo minuto que requiera una salvación.',
    category: 'beneficial',
  },
  {
    min: 23,
    max: 24,
    rangeStr: '23–24',
    title: 'Pigmentación Azul',
    effect: 'Tu piel adquiere un vibrante tono azulado. Un conjuro de Restablecimiento Menor (Lesser Restoration) puede devolverte tu color de piel normal.',
    category: 'neutral',
  },
  {
    min: 25,
    max: 26,
    rangeStr: '25–26',
    title: 'Tercer Ojo Frontal',
    effect: 'Un ojo aparece en tu frente durante el próximo minuto. Tienes ventaja en pruebas de Sabiduría (Percepción) basadas en la vista.',
    category: 'beneficial',
  },
  {
    min: 27,
    max: 28,
    rangeStr: '27–28',
    title: 'Aceleración Mágica',
    effect: 'Durante el próximo minuto, todos tus conjuros con un tiempo de lanzamiento de 1 acción pueden lanzarse como una acción adicional.',
    category: 'beneficial',
  },
  {
    min: 29,
    max: 30,
    rangeStr: '29–30',
    title: 'Salto Teletransportador',
    effect: 'Te teletransportas de inmediato hasta 60 pies a un espacio desocupado que puedas ver.',
    category: 'beneficial',
  },
  {
    min: 31,
    max: 32,
    rangeStr: '31–32',
    title: 'Viaje Fugaz al Plano Astral',
    effect: 'Eres transportado al Plano Astral hasta el final de tu próximo turno, momento en el que regresas al espacio que ocupabas o al más cercano desocupado.',
    category: 'neutral',
  },
  {
    min: 33,
    max: 34,
    rangeStr: '33–34',
    title: 'Potencia Dañina Máxima',
    effect: 'Maximiza el daño del próximo conjuro de daño que lances en el próximo minuto (inflige el daño más alto posible sin tirar dados).',
    category: 'beneficial',
  },
  {
    min: 35,
    max: 36,
    rangeStr: '35–36',
    title: 'Fluctuación Temporal de Edad',
    effect: 'Tira 1d10. Tu edad cambia en ese número de años. Si la tirada es impar, te vuelves más joven (mínimo 1 año). Si es par, envejeces.',
    category: 'neutral',
  },
  {
    min: 37,
    max: 38,
    rangeStr: '37–38',
    title: 'Mariposas y Palomas Ilusorias',
    effect: '1d6 palomas o mariposas ilusorias aparecen y revolotean en el área a 10 pies de ti durante 1 minuto.',
    category: 'neutral',
  },
  {
    min: 39,
    max: 40,
    rangeStr: '39–40',
    title: 'Surgimiento Curativo',
    effect: 'Recuperas 2d10 puntos de golpe de forma instantánea.',
    category: 'beneficial',
  },
  {
    min: 41,
    max: 42,
    rangeStr: '41–42',
    title: 'Planta en Maceta',
    effect: 'Te conviertes en una planta en maceta hasta el inicio de tu próximo turno. Mientras eres planta, estás incapacitado y tienes vulnerabilidad a todo el daño. Si caes a 0 PG, la maceta se rompe y recuperas tu forma original.',
    category: 'chaotic',
  },
  {
    min: 43,
    max: 44,
    rangeStr: '43–44',
    title: 'Paso Etéreo Constante',
    effect: 'Durante el próximo minuto, puedes teletransportarte hasta 20 pies como una acción adicional en cada uno de tus turnos.',
    category: 'beneficial',
  },
  {
    min: 45,
    max: 46,
    rangeStr: '45–46',
    title: 'Levitación Forzada',
    effect: 'Lanzas Levitar (Levitate) sobre ti mismo.',
    category: 'neutral',
  },
  {
    min: 47,
    max: 48,
    rangeStr: '47–48',
    title: 'Aparición de Unicornio',
    effect: 'Un unicornio controlado por el DM aparece en un espacio a 5 pies de ti y desaparece 1 minuto después.',
    category: 'beneficial',
  },
  {
    min: 49,
    max: 50,
    rangeStr: '49–50',
    title: 'Burbujas sin Voz',
    effect: 'No puedes hablar durante el próximo minuto. Cuando intentas hablar, brotan burbujas rosadas de tu boca.',
    category: 'detrimental',
  },
  {
    min: 51,
    max: 52,
    rangeStr: '51–52',
    title: 'Escudo Espectral Defensivo',
    effect: 'Un escudo espectral flota a tu alrededor durante 1 minuto, otorgándote un bonificador de +2 a la CA e inmunidad a Proyectil Mágico.',
    category: 'beneficial',
  },
  {
    min: 53,
    max: 54,
    rangeStr: '53–54',
    title: 'Sobriedad Mágica Inmune',
    effect: 'Eres inmune a quedar intoxicado por el alcohol durante los próximos 5d6 días.',
    category: 'neutral',
  },
  {
    min: 55,
    max: 56,
    rangeStr: '55–56',
    title: 'Caída de Cabello',
    effect: 'Tu cabello se cae por completo, pero vuelve a crecer con normalidad dentro de las próximas 24 horas.',
    category: 'neutral',
  },
  {
    min: 57,
    max: 58,
    rangeStr: '57–58',
    title: 'Toque Ígneo Incontrolable',
    effect: 'Durante el próximo minuto, cualquier objeto inflamable que toques que no esté siendo llevado o empuñado por otra criatura estalla en llamas.',
    category: 'chaotic',
  },
  {
    min: 59,
    max: 60,
    rangeStr: '59–60',
    title: 'Recuperación de Ranura de Conjuro',
    effect: 'Recuperas tu ranura de conjuro gastada de menor nivel.',
    category: 'beneficial',
  },
  {
    min: 61,
    max: 62,
    rangeStr: '61–62',
    title: 'Voz Retumbante a Gritos',
    effect: 'Durante el próximo minuto, debes gritar con toda tu fuerza cada vez que hables.',
    category: 'neutral',
  },
  {
    min: 63,
    max: 64,
    rangeStr: '63–64',
    title: 'Niebla Nubosa Envolvente',
    effect: 'Lanzas Niebla Nubosa (Fog Cloud) centrado en ti mismo (esfera de 20 pies de radio de visibilidad nula).',
    category: 'neutral',
  },
  {
    min: 65,
    max: 66,
    rangeStr: '65–66',
    title: 'Descarga Eléctrica Triple',
    effect: 'Hasta 3 criaturas de tu elección a 30 pies o menos de ti sufren 4d10 de daño de relámpago cada una.',
    category: 'beneficial',
  },
  {
    min: 67,
    max: 68,
    rangeStr: '67–68',
    title: 'Terror Súbito',
    effect: 'Quedas asustado (condición Asustado) respecto a la criatura más cercana a ti hasta el final de tu próximo turno.',
    category: 'detrimental',
  },
  {
    min: 69,
    max: 70,
    rangeStr: '69–70',
    title: 'Invisibilidad Colectiva',
    effect: 'Cada criatura a 30 pies o menos de ti se vuelve invisible durante 1 minuto. La invisibilidad termina en una criatura si ataca o lanza un conjuro.',
    category: 'chaotic',
  },
  {
    min: 71,
    max: 72,
    rangeStr: '71–72',
    title: 'Resistencia Absoluta',
    effect: 'Obtienes resistencia a todo el daño durante el próximo minuto.',
    category: 'beneficial',
  },
  {
    min: 73,
    max: 74,
    rangeStr: '73–74',
    title: 'Toxina Aleatoria',
    effect: 'Una criatura aleatoria a 60 pies o menos de ti queda envenenada durante 1d4 horas.',
    category: 'chaotic',
  },
  {
    min: 75,
    max: 76,
    rangeStr: '75–76',
    title: 'Resplandor Cegador',
    effect: 'Emanas luz tenue en un radio de 30 pies durante el próximo minuto. Cualquier criatura que termine su turno a 5 pies de ti queda cegada hasta el final de su próximo turno.',
    category: 'chaotic',
  },
  {
    min: 77,
    max: 78,
    rangeStr: '77–78',
    title: 'Polimorfia Ovina',
    effect: 'Lanzas Polimorfar (Polymorph) sobre ti mismo. Si fallas la salvación de Sabiduría, te conviertes en una oveja durante la duración del conjuro (1 hora).',
    category: 'chaotic',
  },
  {
    min: 79,
    max: 80,
    rangeStr: '79–80',
    title: 'Aura de Pétalos Ilusorios',
    effect: 'Mariposas ilusorias y pétalos de flores revolotean a tu alrededor a 10 pies durante el próximo minuto.',
    category: 'neutral',
  },
  {
    min: 81,
    max: 82,
    rangeStr: '81–82',
    title: 'Impulso de Acción Adicional',
    effect: 'Puedes realizar una acción adicional inmediatamente en este turno.',
    category: 'beneficial',
  },
  {
    min: 83,
    max: 84,
    rangeStr: '83–84',
    title: 'Drenaje Necrótico Vital',
    effect: 'Cada criatura a 30 pies o menos de ti sufre 1d10 de daño necrótico. Recuperas puntos de golpe iguales a la suma de todo el daño infligido.',
    category: 'chaotic',
  },
  {
    min: 85,
    max: 86,
    rangeStr: '85–86',
    title: 'Reflejos Espectrales',
    effect: 'Lanzas Reflejo Espectral (Mirror Image) sobre ti mismo, creando tres duplicados ilusorios que absorben ataques.',
    category: 'beneficial',
  },
  {
    min: 87,
    max: 88,
    rangeStr: '87–88',
    title: 'Vuelo Aleatorio',
    effect: 'Lanzas Volar (Fly) sobre una criatura elegida al azar a 60 pies o menos de ti.',
    category: 'chaotic',
  },
  {
    min: 89,
    max: 90,
    rangeStr: '89–90',
    title: 'Invisibilidad Silenciosa',
    effect: 'Te vuelves invisible durante el próximo minuto y las criaturas no pueden oírte. La invisibilidad termina prematuramente si atacas o lanzas un conjuro.',
    category: 'beneficial',
  },
  {
    min: 91,
    max: 92,
    rangeStr: '91–92',
    title: 'Seguro de Reencarnación',
    effect: 'Si mueres durante el próximo minuto, regresas inmediatamente a la vida como si hubieras recibido el conjuro Reencarnación (Reincarnate).',
    category: 'beneficial',
  },
  {
    min: 93,
    max: 94,
    rangeStr: '93–94',
    title: 'Agrandamiento Físico',
    effect: 'Tu tamaño aumenta en una categoría de tamaño durante el próximo minuto (como por el conjuro Agrandar/Reducir, ganas ventaja en pruebas/salvaciones de Fuerza y +1d4 de daño con armas).',
    category: 'beneficial',
  },
  {
    min: 95,
    max: 96,
    rangeStr: '95–96',
    title: 'Fragilidad Perforante',
    effect: 'Tú y todas las criaturas a 30 pies o menos de ti adquieren vulnerabilidad al daño perforante durante el próximo minuto.',
    category: 'detrimental',
  },
  {
    min: 97,
    max: 98,
    rangeStr: '97–98',
    title: 'Música Celestial y Etérea',
    effect: 'Estás rodeado de una tenue y hermosa música celestial que sólo tú y quienes estén a 10 pies pueden escuchar durante el próximo minuto.',
    category: 'neutral',
  },
  {
    min: 99,
    max: 100,
    rangeStr: '99–00',
    title: 'Plenitud Arcana (Todos los PH)',
    effect: '¡El flujo cósmico te inunda! Recuperas de inmediato todos tus Puntos de Hechicería gastados.',
    category: 'beneficial',
  },
];

/**
 * Obtiene la entrada de la tabla de Magia Salvaje correspondiente a un resultado d100 (1 a 100).
 */
export function getWildMagicSurgeByRoll(roll: number): WildMagicSurgeEntry {
  const clamped = Math.max(1, Math.min(100, Math.floor(roll)));
  const found = WILD_MAGIC_SURGE_TABLE.find((entry) => clamped >= entry.min && clamped <= entry.max);
  return found || WILD_MAGIC_SURGE_TABLE[0];
}

/**
 * Genera una tirada virtual de d100 en la tabla de Magia Salvaje.
 * Si controlledChaos es true (Nivel 14+ de hechicero), genera 2 tiradas independientes para que el jugador elija.
 */
export function rollWildMagicSurge(controlledChaos: boolean = false): {
  roll1: number;
  entry1: WildMagicSurgeEntry;
  roll2?: number;
  entry2?: WildMagicSurgeEntry;
} {
  const roll1 = Math.floor(Math.random() * 100) + 1;
  const entry1 = getWildMagicSurgeByRoll(roll1);

  if (controlledChaos) {
    const roll2 = Math.floor(Math.random() * 100) + 1;
    const entry2 = getWildMagicSurgeByRoll(roll2);
    return { roll1, entry1, roll2, entry2 };
  }

  return { roll1, entry1 };
}
