// Compendio Oficial de Condiciones, Estados y Reglas Tácticas de D&D 5e
// Basado en el Manual del Jugador (Player's Handbook) y la Guía del Dungeon Master

export interface OfficialCondition {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  summary: string;
  effects: string[];
}

export interface TacticalRule {
  id: string;
  title: string;
  category: 'Combate' | 'Magia' | 'Descanso' | 'Supervivencia';
  summary: string;
  details: string[];
}

export const OFFICIAL_5E_CONDITIONS: OfficialCondition[] = [
  {
    id: 'cegado',
    name: 'Cegado (Blinded)',
    nameEn: 'Blinded',
    icon: 'EyeOff',
    summary: 'La criatura no puede ver y falla automáticamente las pruebas que requieran la vista.',
    effects: [
      'Una criatura cegada no puede ver y falla automáticamente cualquier prueba de característica que requiera la vista.',
      'Las tiradas de ataque contra la criatura tienen Ventaja.',
      'Las tiradas de ataque de la criatura tienen Desventaja.',
    ],
  },
  {
    id: 'hechizado',
    name: 'Hechizado (Charmed)',
    nameEn: 'Charmed',
    icon: 'Heart',
    summary: 'La criatura no puede dañar al encantador y este tiene ventaja en interacciones sociales.',
    effects: [
      'Una criatura hechizada no puede atacar al encantador ni elegirlo como objetivo de habilidades o efectos mágicos dañinos.',
      'El encantador tiene Ventaja en cualquier prueba de característica realizada para interactuar socialmente con la criatura.',
    ],
  },
  {
    id: 'ensordecido',
    name: 'Ensordecido (Deafened)',
    nameEn: 'Deafened',
    icon: 'VolumeX',
    summary: 'La criatura no puede oír y falla automáticamente las pruebas que requieran el oído.',
    effects: [
      'Una criatura ensordecida no puede oír y falla automáticamente cualquier prueba de característica que requiera el oído.',
      'No sufre penalización para lanzar conjuros con componentes verbales a menos que la regla del conjuro lo especifique.',
    ],
  },
  {
    id: 'asustado',
    name: 'Asustado (Frightened)',
    nameEn: 'Frightened',
    icon: 'Flame',
    summary: 'Desventaja en pruebas y ataques mientras vea la fuente de su miedo; no puede acercarse.',
    effects: [
      'Una criatura asustada tiene Desventaja en las pruebas de característica y tiradas de ataque mientras la fuente de su miedo esté en su línea de visión.',
      'La criatura no puede acercarse voluntariamente a la fuente de su miedo.',
    ],
  },
  {
    id: 'agarrado',
    name: 'Agarrado (Grappled)',
    nameEn: 'Grappled',
    icon: 'Hand',
    summary: 'La velocidad de la criatura se convierte en 0 y no puede beneficiarse de bonificadores a la velocidad.',
    effects: [
      'La velocidad de una criatura agarrada pasa a ser 0 y no puede beneficiarse de ningún bonificador a su velocidad.',
      'La condición termina si el apresador queda incapacitado.',
      'La condición también termina si un efecto mueve a la criatura agarrada fuera del alcance del apresador o del efecto que la agarra (como la onda de un conjuro Ola Atronadora).',
    ],
  },
  {
    id: 'incapacitado',
    name: 'Incapacitado (Incapacitated)',
    nameEn: 'Incapacitated',
    icon: 'Slash',
    summary: 'La criatura no puede realizar acciones ni reacciones.',
    effects: [
      'Una criatura incapacitada no puede realizar ninguna acción ni reacción.',
      'Pierde la Concentración en cualquier conjuro que estuviera manteniendo.',
    ],
  },
  {
    id: 'invisible',
    name: 'Invisible (Invisible)',
    nameEn: 'Invisible',
    icon: 'Ghost',
    summary: 'Imposible de ver sin magia o sentidos especiales; ventaja en ataques propios y desventaja en ataques enemigos.',
    effects: [
      'Una criatura invisible es imposible de ver sin la ayuda de magia o un sentido especial. A efectos de esconderse, se considera que tiene cobertura total. La ubicación de la criatura se puede detectar por el ruido que hace o las huellas que deja.',
      'Las tiradas de ataque contra la criatura tienen Desventaja.',
      'Las tiradas de ataque de la criatura tienen Ventaja.',
    ],
  },
  {
    id: 'paralizado',
    name: 'Paralizado (Paralyzed)',
    nameEn: 'Paralyzed',
    icon: 'Lock',
    summary: 'Incapacitada, inmóvil, falla salvaciones de FUE/DES; ataques a 5 pies son críticos automáticos.',
    effects: [
      'Una criatura paralizada queda Incapacitada (no puede realizar acciones ni reacciones) y no puede moverse ni hablar.',
      'La criatura falla automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra la criatura tienen Ventaja.',
      'Cualquier tirada de ataque que impacte a la criatura es un Golpe Crítico automático si el atacante está a 5 pies de ella.',
    ],
  },
  {
    id: 'petrificado',
    name: 'Petrificado (Petrified)',
    nameEn: 'Petrified',
    icon: 'Shield',
    summary: 'Transformada en sustancia sólida inanimada; peso x10, inmune a veneno y enfermedades.',
    effects: [
      'La criatura queda transformada, junto con todos los objetos no mágicos que viste o porta, en una sustancia sólida inanimada (generalmente piedra). Su peso se multiplica por 10 y cesa de envejecer.',
      'La criatura queda Incapacitada, no puede moverse ni hablar y no es consciente de sus alrededores.',
      'Las tiradas de ataque contra la criatura tienen Ventaja.',
      'Falla automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Tiene resistencia a todo tipo de daño.',
      'Es inmune al veneno y a las enfermedades, aunque el veneno o enfermedad que ya estuviera en su sistema solo queda suspendido, no neutralizado.',
    ],
  },
  {
    id: 'envenenado',
    name: 'Envenenado (Poisoned)',
    nameEn: 'Poisoned',
    icon: 'Skull',
    summary: 'La criatura tiene desventaja en tiradas de ataque y pruebas de característica.',
    effects: [
      'Una criatura envenenada tiene Desventaja en todas las tiradas de ataque y en todas las pruebas de característica.',
    ],
  },
  {
    id: 'derribado',
    name: 'Derribado (Prone)',
    nameEn: 'Prone',
    icon: 'ArrowDown',
    summary: 'Cuerpo a tierra; arrastrarse cuesta el doble de movimiento; ventaja a ataques cuerpo a cuerpo adyacentes.',
    effects: [
      'La única opción de movimiento de la criatura es arrastrarse, a menos que se ponga en pie y termine la condición.',
      'Ponerse en pie cuesta una cantidad de movimiento igual a la mitad de la velocidad de la criatura.',
      'La criatura tiene Desventaja en sus tiradas de ataque.',
      'Una tirada de ataque contra la criatura tiene Ventaja si el atacante está a 5 pies de ella. De lo contrario, la tirada de ataque tiene Desventaja.',
    ],
  },
  {
    id: 'apresado',
    name: 'Apresado (Restrained)',
    nameEn: 'Restrained',
    icon: 'Anchor',
    summary: 'Velocidad 0; desventaja en ataques propios y salvaciones de DES; ventaja en ataques recibidos.',
    effects: [
      'La velocidad de una criatura apresada pasa a ser 0 y no puede beneficiarse de ningún bonificador a su velocidad.',
      'Las tiradas de ataque contra la criatura tienen Ventaja.',
      'Las tiradas de ataque de la criatura tienen Desventaja.',
      'La criatura tiene Desventaja en las tiradas de salvación de Destreza.',
    ],
  },
  {
    id: 'aturdido',
    name: 'Aturdido (Stunned)',
    nameEn: 'Stunned',
    icon: 'Zap',
    summary: 'Incapacitada, habla vacilante, falla salvaciones de FUE/DES; atacantes tienen ventaja.',
    effects: [
      'Una criatura aturdida queda Incapacitada, no puede moverse y solo puede hablar de forma vacilante.',
      'Falla automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra la criatura tienen Ventaja.',
    ],
  },
  {
    id: 'inconsciente',
    name: 'Inconsciente (Unconscious)',
    nameEn: 'Unconscious',
    icon: 'Moon',
    summary: 'Incapacitada, cae derribada, suelta objetos; ataques adyacentes son críticos automáticos.',
    effects: [
      'Una criatura inconsciente queda Incapacitada, no puede moverse ni hablar y no es consciente de lo que ocurre a su alrededor.',
      'La criatura suelta todo lo que esté sosteniendo y cae derribada.',
      'Falla automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra la criatura tienen Ventaja.',
      'Cualquier tirada de ataque que impacte a la criatura es un Golpe Crítico automático si el atacante está a 5 pies de ella.',
    ],
  },
  {
    id: 'agotamiento',
    name: 'Agotamiento (Exhaustion)',
    nameEn: 'Exhaustion',
    icon: 'Activity',
    summary: 'Efectos medidos en 6 niveles acumulativos. Un descanso largo con comida reduce 1 nivel.',
    effects: [
      'Nivel 1: Desventaja en pruebas de característica.',
      'Nivel 2: Velocidad reducida a la mitad.',
      'Nivel 3: Desventaja en tiradas de ataque y tiradas de salvación.',
      'Nivel 4: Puntos de Golpe máximos reducidos a la mitad.',
      'Nivel 5: Velocidad reducida a 0 pies.',
      'Nivel 6: Muerte instantánea.',
      '* Un descanso largo completo acompañado de suficiente comida y bebida reduce el nivel de agotamiento en 1.',
    ],
  },
];

export const OFFICIAL_5E_TACTICAL_RULES: TacticalRule[] = [
  {
    id: 'concentracion',
    title: 'Concentración en Conjuros (Concentration)',
    category: 'Magia',
    summary: 'Mantener un conjuro activo requiere concentración continua. Solo se puede mantener 1 conjuro a la vez.',
    details: [
      'Lanzar otro conjuro que requiera concentración rompe inmediatamente la concentración del conjuro anterior.',
      'Recibir daño: Debes superar una Tirada de Salvación de Constitución. La CD es 10 o la mitad del daño recibido (lo que sea mayor). Si recibes daño de varias fuentes distintas en un mismo turno, haces una salvación por cada fuente.',
      'Quedar Incapacitado o Muerto: La concentración termina de forma inmediata si quedas incapacitado, paralizado, aturdido o inconsciente.',
      'Factores ambientales severos: El DM puede pedir una salvación de Constitución CD 10 ante olas gigantescas o tormentas violentas.',
    ],
  },
  {
    id: 'cobertura',
    title: 'Reglas de Cobertura (Cover)',
    category: 'Combate',
    summary: 'Obstáculos entre el atacante y el objetivo otorgan bonos defensivos a la CA y salvaciones de Destreza.',
    details: [
      'Cobertura Media (Half Cover): Otorga +2 a la CA y +2 a las tiradas de salvación de Destreza (ej. un muro bajo, un mueble grande o el cuerpo de otra criatura).',
      'Cobertura Tres Cuartos (Three-Quarters Cover): Otorga +5 a la CA y +5 a las tiradas de salvación de Destreza (ej. una aspillera de castillo o un tronco grueso).',
      'Cobertura Total (Total Cover): El objetivo no puede ser elegido directamente por ataques o conjuros que requieran línea de visión.',
    ],
  },
  {
    id: 'descansos',
    title: 'Descansos: Corto y Largo (Short & Long Rests)',
    category: 'Descanso',
    summary: 'Procedimiento oficial para recuperar PG, dados de golpe, ranuras de conjuro y recursos de clase.',
    details: [
      'Descanso Corto (Short Rest): Al menos 1 hora de calma. Puedes gastar uno o más Dados de Golpe sumando tu modificador de Constitución a cada dado para curarte.',
      'Descanso Largo (Long Rest): Al menos 8 horas (con un máximo de 2 horas de guardia ligera). Recuperas todos tus Puntos de Golpe máximos.',
      'Recuperación de Dados de Golpe: Tras un descanso largo recuperas hasta la mitad de tu número total de dados de golpe (mínimo 1).',
      'Restricción de 24 horas: Un personaje no puede beneficiarse de más de un descanso largo en un período de 24 horas.',
    ],
  },
  {
    id: 'muerte-salvaciones',
    title: 'Tiradas de Salvación de Muerte (Death Saves)',
    category: 'Combate',
    summary: 'Al caer a 0 PG, el personaje queda inconsciente y debe realizar salvaciones contra la muerte al inicio de su turno.',
    details: [
      'Al inicio de cada turno a 0 PG, tiras 1d20 sin sumar ningún modificador: 10 o más es Éxito; 9 o menos es Fallo.',
      '3 Éxitos = Te estabilizas a 0 PG (inconsciente pero fuera de peligro de muerte).',
      '3 Fallos = Tu personaje muere.',
      'Tirada de 1 Natural = Cuenta como DOS fallos.',
      'Tirada de 20 Natural = Recuperas 1 Punto de Golpe inmediatamente y recuperas la consciencia.',
      'Recibir daño a 0 PG = Sufres un fallo automático. Si el daño proviene de un golpe crítico, sufres dos fallos.',
      'Muerte Masiva Instantánea: Si el daño restante tras caer a 0 PG iguala o supera tus PG máximos, mueres al instante sin tiradas.',
    ],
  },
  {
    id: 'acciones-combate',
    title: 'Acciones en Combate (Combat Actions)',
    category: 'Combate',
    summary: 'Acciones estándar que cualquier personaje o criatura puede realizar en su turno.',
    details: [
      'Atacar (Attack): Realizar un ataque con arma cuerpo a cuerpo o a distancia (o múltiples si tienes Ataque Extra).',
      'Lanzar un Conjuro (Cast a Spell): Ejecutar un conjuro cuyo tiempo de lanzamiento sea 1 acción.',
      'Correr (Dash): Ganas movimiento adicional igual a tu velocidad para el turno actual.',
      'Destrabarse (Disengage): Tu movimiento no provoca ataques de oportunidad durante el resto de tu turno.',
      'Esquivar (Dodge): Hasta el inicio de tu próximo turno, los ataques contra ti tienen Desventaja y tienes Ventaja en salvaciones de Destreza.',
      'Ayudar (Help): Otorgas Ventaja en la siguiente prueba de característica o en el siguiente ataque de un aliado contra un objetivo a 5 pies.',
      'Esconderse (Hide): Realizas una prueba de Destreza (Sigilo) para intentar volverte no detectado.',
      'Preparar (Ready): Decides una acción y un desencadenante perceptible para ejecutarla como Reacción más adelante.',
      'Buscar (Search): Dedicas tu acción a percibir o encontrar algo con Sabiduría (Percepción) o Inteligencia (Investigación).',
      'Usar un Objeto (Use an Object): Interactuar con un objeto complejo que requiera tu acción completa.',
    ],
  },
];
