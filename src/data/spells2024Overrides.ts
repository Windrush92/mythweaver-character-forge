import { Spell } from '../types';

export type Spell2024RuleOverride = NonNullable<Spell['rules2024']>;

/**
 * Overrides mecánicos y de listas de clase para conjuros revisados en D&D 5.5e (PHB 2024).
 * Las claves corresponden al `id` en OFFICIAL_SPELLS_COMPENDIUM.
 */
export const SPELLS_2024_OVERRIDES: Record<string, Spell2024RuleOverride> = {
  'spl-witch-bolt': {
    name: 'Rayo de Hechicería',
    nameEn: 'Witch Bolt',
    range: '60 pies',
    rangeEn: '60 feet',
    castingTime: '1 acción',
    castingTimeEn: '1 action',
    duration: 'Concentración, hasta 1 minuto',
    durationEn: 'Concentration, up to 1 minute',
    concentration: true,
    description:
      'Un rayo de energía azul crepitante se lanza hacia una criatura dentro del alcance, formando un arco eléctrico sostenido entre tú y el objetivo. Realiza un ataque de conjuro a distancia contra esa criatura. Si impactas, el objetivo sufre 2d12 de daño de relámpago.\n\nTanto si el ataque impacta como si falla, mantienes el vínculo mientras dure el conjuro, y en cada uno de tus turnos posteriores puedes usar una Acción Adicional para infligir automáticamente 1d12 de daño de relámpago al objetivo. El conjuro termina si usas tu acción adicional para cualquier otra cosa, si el objetivo sale del alcance (60 pies) o si consigue cobertura total respecto a ti.',
    descriptionEn:
      'A beam of crackling energy lances toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against it. On a hit, the target takes 2d12 Lightning damage.\n\nOn each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically, even if the initial attack missed. The spell ends if the target is ever outside the spell’s 60-foot range or has Total Cover from you.',
    higherLevels:
      'Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño inicial aumenta en 1d12 por cada nivel de espacio por encima de 1.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. The initial damage increases by 1d12 for each spell slot level above 1.',
  },
  'spl-true-strike': {
    name: 'Impacto Verdadero',
    nameEn: 'True Strike',
    castingTime: '1 acción',
    castingTimeEn: '1 action',
    range: 'Personal',
    rangeEn: 'Self',
    components: 'S, M (un arma con la que seas competente y que valga al menos 1 pc)',
    componentsEn: 'S, M (a weapon with which you have proficiency and that is worth 1+ CP)',
    duration: 'Instantáneo',
    durationEn: 'Instantaneous',
    concentration: false,
    classes: ['Artífice', 'Bardo', 'Hechicero', 'Brujo', 'Mago'],
    description:
      'Guiado por un destello de intuición mágica, realizas un ataque con el arma utilizada al lanzar el conjuro. El ataque usa tu aptitud mágica para las tiradas de ataque y de daño en lugar de Fuerza o Destreza. Si el ataque inflige daño, puedes elegir que sea daño radiante o el tipo de daño normal del arma.',
    descriptionEn:
      'Guided by a flash of magical insight, you make one attack with the weapon used in the spell’s casting. The attack uses your spellcasting ability for the attack and damage rolls instead of Strength or Dexterity, and can deal Radiant damage or the weapon’s normal damage type.',
    higherLevels:
      'Mejora de truco: el ataque inflige daño radiante adicional cuando alcanzas nivel 5 (+1d6), nivel 11 (+2d6) y nivel 17 (+3d6).',
    higherLevelsEn:
      'Cantrip Upgrade. The attack deals extra Radiant damage when you reach levels 5 (1d6), 11 (2d6), and 17 (3d6).',
  },
  'spl-blade-ward': {
    castingTime: '1 acción',
    castingTimeEn: '1 action',
    range: 'Personal',
    rangeEn: 'Self',
    duration: 'Concentración, hasta 1 minuto',
    durationEn: 'Concentration, up to 1 minute',
    concentration: true,
    description:
      'Siempre que una criatura haga una tirada de ataque contra ti antes de que el conjuro termine, el atacante resta 1d4 de la tirada de ataque.',
    descriptionEn:
      'Whenever a creature makes an attack roll against you before the spell ends, the attacker subtracts 1d4 from the attack roll.',
  },
  'spl-chill-touch': {
    range: 'Toque',
    rangeEn: 'Touch',
    description:
      'Canalizando el frío de la tumba, realizas un ataque de conjuro cuerpo a cuerpo contra un objetivo dentro de tu alcance. Si impactas, el objetivo recibe 1d10 de daño necrótico y no puede recuperar Puntos de Golpe hasta el final de tu siguiente turno.',
    descriptionEn:
      'Channeling the chill of the grave, make a melee spell attack against a target within reach. On a hit, the target takes 1d10 Necrotic damage and cannot regain Hit Points until the end of your next turn.',
    higherLevels:
      'El daño aumenta en 1d10 cuando alcanzas el nivel 5 (2d10), nivel 11 (3d10) y nivel 17 (4d10).',
    higherLevelsEn:
      'Cantrip Upgrade. The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10).',
  },
  'spl-poison-spray': {
    name: 'Rociada Venenosa',
    nameEn: 'Poison Spray',
    range: '30 pies',
    rangeEn: '30 feet',
    description:
      'Rocías una bruma tóxica hacia una criatura dentro del alcance. Realiza un ataque de conjuro a distancia contra el objetivo. Si impactas, sufre 1d12 de daño de veneno.',
    descriptionEn:
      'You spray toxic mist at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d12 Poison damage.',
    higherLevels:
      'El daño aumenta en 1d12 a nivel 5 (2d12), nivel 11 (3d12) y nivel 17 (4d12).',
    higherLevelsEn:
      'Cantrip Upgrade. The damage increases by 1d12 at levels 5 (2d12), 11 (3d12), and 17 (4d12).',
  },
  'spl-produce-flame': {
    castingTime: '1 acción adicional',
    castingTimeEn: 'Bonus Action',
    range: 'Personal',
    rangeEn: 'Self',
    duration: '10 minutos',
    durationEn: '10 minutes',
    description:
      'Una llama parpadeante aparece en tu mano y permanece allí durante el conjuro, iluminando luz brillante en un radio de 20 pies y luz tenue 20 pies adicionales. Hasta que el conjuro termine, puedes tomar una acción de Magia para arrojar el fuego contra una criatura u objeto a 60 pies o menos realizando un ataque de conjuro a distancia (1d8 de daño de fuego al impactar).',
    descriptionEn:
      'A flickering flame appears in your hand for 10 minutes, shedding Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. You can take a Magic action to hurl fire up to 60 feet with a ranged spell attack, dealing 1d8 Fire damage on a hit.',
    higherLevels:
      'El daño aumenta en 1d8 a nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).',
    higherLevelsEn:
      'Cantrip Upgrade. Damage increases by 1d8 at levels 5 (2d8), 11 (3d8), and 17 (4d8).',
  },
  'spl-resistance': {
    description:
      'Tocas a una criatura voluntaria y eliges un tipo de daño: Ácido, Contundente, Frío, Fuego, Relámpago, Necrótico, Perforante, Veneno, Radiante, Cortante o Trueno. Cuando la criatura sufra daño del tipo elegido antes de que el conjuro termine, reduce el daño total recibido en 1d4 (una vez por turno).',
    descriptionEn:
      'Touch a willing creature and choose Acid, Bludgeoning, Cold, Fire, Lightning, Necrotic, Piercing, Poison, Radiant, Slashing, or Thunder. Once per turn when it takes damage of that type, it reduces the damage by 1d4.',
  },
  'spl-guidance': {
    description:
      'Tocas a una criatura voluntaria y eliges una habilidad. Hasta que el conjuro termine, la criatura suma 1d4 a cualquier prueba de característica que realice usando esa habilidad.',
    descriptionEn:
      'Touch a willing creature and choose a skill. Until the spell ends, the creature adds 1d4 to any ability check using the chosen skill.',
  },
  'spl-spare-the-dying': {
    range: '15 pies',
    rangeEn: '15 feet',
    classes: ['Artífice', 'Clérigo', 'Druida'],
    description:
      'Elige una criatura dentro del alcance que tenga 0 Puntos de Golpe y no esté muerta. La criatura pasa a estar Estable.',
    descriptionEn:
      'Choose a creature within range that has 0 Hit Points and isn’t dead. The creature becomes Stable.',
    higherLevels:
      'El alcance se duplica al nivel 5 (30 pies), nivel 11 (60 pies) y nivel 17 (120 pies).',
    higherLevelsEn:
      'Cantrip Upgrade. Range doubles at levels 5 (30 ft), 11 (60 ft), and 17 (120 ft).',
  },
  'spl-acid-splash': {
    description:
      'Creas una burbuja ácida en un punto dentro del alcance, donde explota en una Esfera de 5 pies de radio. Cada criatura en esa Esfera debe superar una salvación de Destreza o sufrir 1d6 de daño de ácido.',
    descriptionEn:
      'Create an acidic bubble at a point within 60 feet, exploding in a 5-foot-radius Sphere. Each creature in the Sphere makes a Dexterity save or takes 1d6 Acid damage.',
    higherLevels:
      'El daño aumenta en 1d6 a nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6).',
    higherLevelsEn:
      'Cantrip Upgrade. Damage increases by 1d6 at levels 5 (2d6), 11 (3d6), and 17 (4d6).',
  },
  'spl-friends': {
    range: '10 pies',
    rangeEn: '10 feet',
    description:
      'Emanas un aura de amistad hacia una criatura que puedas ver a 10 pies. El objetivo debe superar una salvación de Sabiduría o quedar Hechizado durante 1 minuto (tiene éxito automático si no es Humanoide, si estás combatiendo contra ella o si ya lanzaste este conjuro sobre ella en las últimas 24 horas).',
    descriptionEn:
      'Target one creature within 10 feet. Wisdom save or Charmed for 1 minute (auto-succeeds if not Humanoid, in combat with you, or targeted within 24 hours).',
  },
  'spl-shillelagh': {
    description:
      'Una clava o bastón que sostengas queda imbuido del poder natural. Puedes usar tu aptitud mágica en lugar de Fuerza para ataque y daño cuerpo a cuerpo con esa arma, y su dado de daño pasa a ser 1d8, pudiendo elegir daño de Fuerza o el normal del arma.',
    descriptionEn:
      'Imbue a Club or Quarterstaff. Use your spellcasting ability for attack and damage rolls; weapon die becomes d8 and damage can be Force or normal type.',
    higherLevels:
      'El dado de daño cambia cuando alcanzas nivel 5 (1d10), nivel 11 (1d12) y nivel 17 (2d6).',
    higherLevelsEn:
      'Cantrip Upgrade. Damage die upgrades at levels 5 (d10), 11 (d12), and 17 (2d6).',
  },
  'spl-shocking-grasp': {
    description:
      'Relámpagos brotan hacia una criatura dentro de tu alcance. Realiza un ataque de conjuro cuerpo a cuerpo (sin ventaja por armadura metálica en 5.5e). Si impactas, sufre 1d8 de daño de relámpago y no puede hacer Ataques de Oportunidad hasta el comienzo de su siguiente turno.',
    descriptionEn:
      'Make a melee spell attack. On a hit, the target takes 1d8 Lightning damage and cannot make Opportunity Attacks until the start of its next turn.',
  },
  'spl-cure-wounds': {
    school: 'Abjuración',
    description:
      'Una criatura que toques recupera una cantidad de Puntos de Golpe igual a 2d8 + tu modificador por lanzamiento de conjuros.',
    descriptionEn:
      'A creature you touch regains Hit Points equal to 2d8 plus your spellcasting ability modifier.',
    higherLevels:
      'La curación aumenta en 2d8 por cada nivel de espacio de conjuro por encima de 1.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Healing increases by 2d8 for each spell slot level above 1.',
  },
  'spl-healing-word': {
    school: 'Abjuración',
    description:
      'Una criatura de tu elección que puedas ver dentro del alcance recupera Puntos de Golpe igual a 2d4 + tu modificador por lanzamiento de conjuros.',
    descriptionEn:
      'A creature of your choice within 60 feet regains Hit Points equal to 2d4 plus your spellcasting ability modifier.',
    higherLevels:
      'La curación aumenta en 2d4 por cada nivel de espacio por encima de 1.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Healing increases by 2d4 for each spell slot level above 1.',
  },
  'spl-aid': {
    classes: ['Artífice', 'Bardo', 'Clérigo', 'Druida', 'Paladín', 'Explorador'],
    notes: 'En 5.5e se añade también a las listas de Bardo y Druida.',
  },
  'spl-armor-of-agathys': {
    castingTime: '1 acción adicional',
    castingTimeEn: 'Bonus Action',
    description:
      'Una escarcha mágica protectora te envuelve. Obtienes 5 Puntos de Golpe Temporales durante 1 hora. Si una criatura te impacta con un ataque cuerpo a cuerpo mientras tengas cualquier Punto de Golpe Temporal, recibe 5 de daño de frío. El conjuro solo termina antes si te quedas sin Puntos de Golpe Temporales.',
    descriptionEn:
      'Gain 5 Temporary Hit Points for 1 hour. Whenever a creature hits you with a melee attack while you have any Temporary Hit Points, it takes 5 Cold damage. Ends early only if you have no Temporary Hit Points.',
  },
  'spl-chromatic-orb': {
    description:
      'Arrojas un orbe de energía de 3d8 de daño (Ácido, Frío, Fuego, Relámpago, Veneno o Trueno) con un ataque de conjuro a distancia a 90 pies. Si dos o más dados d8 sacan el mismo número, el orbe rebota hacia otro objetivo a 30 pies o menos (nueva tirada de ataque y daño). Con espacio de nivel 1 solo puede rebotar una vez.',
    descriptionEn:
      'Hurl a 3d8 elemental orb (Acid, Cold, Fire, Lightning, Poison, or Thunder) with a ranged spell attack. If two or more d8s roll the same number, the orb leaps to a different target within 30 feet (max 1 leap at 1st level; max leaps equals slot level when upcast).',
    higherLevels:
      'El daño aumenta en 1d8 por cada nivel de espacio por encima de 1, y el máximo de rebotes es igual al nivel del espacio usado.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Damage increases by 1d8 per slot above 1, and it can leap up to a number of times equal to the slot level.',
  },
  'spl-cloud-of-daggers': {
    description:
      'Llenas un Cubo de 5 pies con dagas giratorias que infligen 4d4 de daño cortante al aparecer o cuando una criatura entra o termina su turno allí (una vez por turno). En tus turnos posteriores puedes tomar una acción de Magia para teletransportar el Cubo hasta 30 pies.',
    descriptionEn:
      'Fill a 5-foot Cube with spinning daggers dealing 4d4 Slashing damage (once per turn when appearing, entering, or ending turn). On later turns, you can take a Magic action to teleport the Cube up to 30 feet.',
    higherLevels:
      'El daño aumenta en 2d4 por cada nivel de espacio por encima de 2.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Damage increases by 2d4 for each slot level above 2.',
  },
  'spl-color-spray': {
    description:
      'Lanzas un cono de 15 pies de luces deslumbrantes. Cada criatura en el cono debe superar una tirada de salvación de Constitución o sufrir la condición Cegado hasta el final de tu siguiente turno.',
    descriptionEn:
      'Each creature in a 15-foot Cone must succeed on a Constitution saving throw or have the Blinded condition until the end of your next turn.',
    higherLevels: '',
    higherLevelsEn: '',
  },
  'spl-false-life': {
    duration: 'Instantáneo',
    durationEn: 'Instantaneous',
    description:
      'Obtienes 2d4 + 4 Puntos de Golpe Temporales al canalizar una apariencia nigromántica de vigor.',
    descriptionEn:
      'You gain 2d4 + 4 Temporary Hit Points.',
    higherLevels:
      'Obtienes 5 Puntos de Golpe Temporales adicionales por cada nivel de espacio por encima de 1.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Gain 5 extra Temporary HP for each slot level above 1.',
  },
  'spl-heroism': {
    notes: 'En 5.5e se aclara que los Puntos de Golpe Temporales restantes se conservan al terminar el conjuro.',
  },
  'spl-inflict-wounds': {
    description:
      'Una criatura que intentes tocar debe superar una tirada de salvación de Constitución. Sufre 2d10 de daño necrótico si falla, o la mitad si tiene éxito.',
    descriptionEn:
      'A creature you touch makes a Constitution saving throw, taking 2d10 Necrotic damage on a failed save or half as much on a success.',
    higherLevels:
      'El daño aumenta en 1d10 por cada nivel de espacio por encima de 1.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Damage increases by 1d10 per slot level above 1.',
  },
  'spl-jump': {
    castingTime: '1 acción adicional',
    castingTimeEn: 'Bonus Action',
    description:
      'Tocas a una criatura voluntaria. Una vez en cada uno de sus turnos hasta que el conjuro termine, esa criatura puede saltar hasta 30 pies gastando solo 10 pies de movimiento.',
    descriptionEn:
      'Touch a willing creature. Once on each of its turns for 1 minute, it can jump up to 30 feet by spending 10 feet of movement.',
    higherLevels:
      'Puedes elegir una criatura adicional por cada nivel de espacio por encima de 1.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Target one additional creature per slot level above 1.',
  },
  'spl-lesser-restoration': {
    castingTime: '1 acción adicional',
    castingTimeEn: 'Bonus Action',
    description:
      'Tocas a una criatura y pones fin a una de estas condiciones que la afecte: Cegado, Envenenado, Ensordecido o Paralizado.',
    descriptionEn:
      'Bonus Action touch to end one condition on a creature: Blinded, Deafened, Paralyzed, or Poisoned.',
  },
  'spl-prayer-of-healing': {
    description:
      'Hasta cinco criaturas voluntarias que puedas ver dentro de 30 pies que permanezcan en alcance durante los 10 minutos obtienen los beneficios de un Descanso Corto y además recuperan 2d8 Puntos de Golpe (sin volver a beneficiarse de este conjuro hasta completar un Descanso Largo).',
    descriptionEn:
      'Up to five willing creatures gain the benefits of a Short Rest and regain 2d8 Hit Points (cannot benefit again until a Long Rest).',
    higherLevels:
      'La curación aumenta en 1d8 por cada nivel de espacio por encima de 2.',
    higherLevelsEn:
      'Using a Higher-Level Spell Slot. Healing increases by 1d8 per slot level above 2.',
  },
  'spl-ray-of-sickness': {
    description:
      'Realizas un ataque de conjuro a distancia contra una criatura dentro de 60 pies. Si impactas, sufre 2d8 de daño de veneno y queda Envenenada automáticamente hasta el final de tu siguiente turno.',
    descriptionEn:
      'Make a ranged spell attack against a creature within 60 feet. On a hit, it takes 2d8 Poison damage and automatically has the Poisoned condition until the end of your next turn.',
  },
  'spl-searing-smite': {
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: '1 minuto',
    durationEn: '1 minute',
    concentration: false,
    description:
      'Sin requerir Concentración: el objetivo recibe 1d6 de daño de fuego adicional por el impacto. Al principio de cada uno de sus turnos recibe otros 1d6 de daño de fuego y luego realiza una salvación de Constitución (en un éxito el conjuro termina).',
    descriptionEn:
      'No Concentration required. Target takes an extra 1d6 Fire damage, plus 1d6 Fire damage at the start of each of its turns until it succeeds on a Constitution save.',
    higherLevels:
      'Todo el daño aumenta en 1d6 por cada nivel de espacio por encima de 1.',
  },
  'spl-thunderous-smite': {
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: 'Instantáneo',
    durationEn: 'Instantaneous',
    concentration: false,
    description:
      'Sin Concentración: el impacto resuena hasta 300 pies e inflige 2d6 de daño de trueno adicionales. Si el objetivo es una criatura, debe superar una salvación de Fuerza o ser empujada 10 pies y quedar Derribada.',
    descriptionEn:
      'No Concentration. Extra 2d6 Thunder damage, plus Strength save or pushed 10 feet and knocked Prone.',
    higherLevels:
      'El daño aumenta en 1d6 por cada nivel de espacio por encima de 1.',
  },
  'spl-wrathful-smite': {
    school: 'Nigromancia',
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: '1 minuto',
    durationEn: '1 minute',
    concentration: false,
    description:
      'Sin Concentración: el objetivo sufre 1d6 de daño necrótico adicional y debe superar una salvación de Sabiduría o quedar Asustado hasta que el conjuro termine (repite salvación al final de cada turno).',
    descriptionEn:
      'No Concentration. Extra 1d6 Necrotic damage and Wisdom save or Frightened for 1 minute (save ends at turn end).',
    higherLevels:
      'El daño aumenta en 1d6 por cada nivel de espacio por encima de 1.',
  },
  'spl-blinding-smite': {
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: '1 minuto',
    durationEn: '1 minute',
    concentration: false,
    description:
      'Sin Concentración: el objetivo sufre 3d8 de daño radiante adicional y queda Cegado (puede realizar una salvación de Constitución al final de cada uno de sus turnos para terminar el efecto).',
    descriptionEn:
      'No Concentration. Extra 3d8 Radiant damage and Blinded (Constitution save at end of each turn ends effect).',
  },
  'spl-staggering-smite': {
    school: 'Encantamiento',
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: 'Instantáneo',
    durationEn: 'Instantaneous',
    concentration: false,
    description:
      'Sin Concentración: el objetivo sufre 4d6 de daño psíquico adicional y debe superar una salvación de Sabiduría o quedar Aturdido hasta el final de tu siguiente turno.',
    descriptionEn:
      'No Concentration. Extra 4d6 Psychic damage and Wisdom save or Stunned until end of your next turn.',
    higherLevels:
      'El daño aumenta en 1d6 por cada nivel de espacio por encima de 4.',
  },
  'spl-banishing-smite': {
    school: 'Conjuración',
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: 'Concentración, hasta 1 minuto',
    durationEn: 'Concentration, up to 1 minute',
    concentration: true,
    description:
      'El objetivo recibe 5d10 de daño de fuerza adicional. Si el impacto lo deja con 50 Puntos de Golpe o menos, debe superar una salvación de Carisma o ser desterrado a un semiplano inofensivo (Incapacitado) mientras dure la concentración.',
    descriptionEn:
      'Extra 5d10 Force damage. If reduced to 50 HP or fewer, Charisma save or banished to a harmless demiplane (Incapacitated) for the duration.',
  },
  'spl-branding-smite': {
    name: 'Castigo Brillante',
    nameEn: 'Shining Smite',
    school: 'Transmutación',
    castingTime: '1 acción adicional (justo tras impactar cuerpo a cuerpo o ataque desarmado)',
    castingTimeEn: 'Bonus Action (immediately after hitting)',
    duration: 'Concentración, hasta 1 minuto',
    durationEn: 'Concentration, up to 1 minute',
    concentration: true,
    description:
      'Reemplaza a Castigo Marcador en 5.5e. El objetivo sufre 2d6 de daño radiante adicional al impactar. Mientras dure el conjuro, emite luz brillante en un radio de 5 pies, las tiradas de ataque contra él tienen Ventaja y no puede beneficiarse de la condición Invisible.',
    descriptionEn:
      'Replaces Branding Smite in 2024. Target takes 2d6 extra Radiant damage, sheds Bright Light in a 5-foot radius, attack rolls against it have Advantage, and it cannot benefit from Invisible.',
    higherLevels:
      'El daño aumenta en 1d6 por cada nivel de espacio por encima de 2.',
  },
  'spl-sleep': {
    duration: 'Concentración, hasta 1 minuto',
    durationEn: 'Concentration, up to 1 minute',
    concentration: true,
    description:
      'Sin tirada de puntos de golpe: cada criatura que elijas en una Esfera de 5 pies de radio dentro de 60 pies debe superar una salvación de Sabiduría o quedar Incapacitada hasta el final de su siguiente turno, momento en el que repite la salvación; si falla de nuevo, cae Inconsciente mientras dure el conjuro (despierta si recibe daño o alguien la sacude con una acción). Criaturas que no duermen o inmunes al Agotamiento tienen éxito automático.',
    descriptionEn:
      'Creatures in a 5-ft-radius Sphere (60 ft) make a Wisdom save or become Incapacitated until the end of their next turn, repeating the save to avoid falling Unconscious for up to 1 minute (Concentration).',
  },
  'spl-barkskin': {
    castingTime: '1 acción adicional',
    castingTimeEn: 'Bonus Action',
    duration: '1 hora',
    durationEn: '1 hour',
    concentration: false,
    description:
      'Sin Concentración: tocas a una criatura voluntaria y su Clase de Armadura pasa a ser 17 si era inferior durante 1 hora.',
    descriptionEn:
      'No Concentration. Touch a willing creature; its AC becomes 17 if lower for 1 hour.',
  },
  'spl-magic-weapon': {
    castingTime: '1 acción adicional',
    castingTimeEn: 'Bonus Action',
    duration: '1 hora',
    durationEn: '1 hour',
    concentration: false,
    description:
      'Sin Concentración: tocas un arma no mágica y se vuelve un arma mágica +1 a las tiradas de ataque y daño durante 1 hora (+2 con espacio de nivel 3-5, +3 con nivel 6+).',
    descriptionEn:
      'No Concentration. Touch a nonmagical weapon to give it +1 attack and damage for 1 hour (+2 at slot 3-5, +3 at slot 6+).',
  },
  'spl-moonbeam': {
    description:
      'Cilindro de 5 pies de radio y 40 pies de alto. La salvación de Constitución (2d10 radiante, mitad si supera) ocurre cuando el cilindro aparece, cuando mueves el rayo al espacio de una criatura o cuando entra/termina su turno allí (máx. una vez por turno).',
    descriptionEn:
      '5-ft-radius Cylinder dealing 2d10 Radiant damage (CON save half) once per turn when appearing, moving into a space, entering, or ending turn.',
  },
  'spl-find-familiar': {
    description:
      'Invocas un espíritu que adopta forma de Bestia VD 0 (búho, cuervo, gato, halcón, rana, etc.). Actúa en su propia iniciativa (no puede atacar, sí usar Ayudar u otras acciones). Con Acción Adicional ves y oyes a través de él hasta tu siguiente turno, y puede transmitir conjuros de toque a 100 pies usando su Reacción.',
    descriptionEn:
      'Summon any CR 0 Beast spirit. Takes its own initiative/turns (no Attack), shares senses via Bonus Action, delivers Touch spells within 100 feet using Reaction.',
  },
  'spl-cloudkill': {
    description:
      'Esfera de 20 pies fuertemente oscurecida. Salvación de Constitución (5d8 veneno, mitad si supera) al aparecer o cuando una criatura entra o termina su turno dentro (una vez por turno). La nube se aleja 10 pies de ti al inicio de cada uno de tus turnos.',
    descriptionEn:
      '20-ft heavily obscured Sphere dealing 5d8 Poison damage (CON save half) once per turn on appear, enter, or turn end; moves 10 feet away at start of each turn.',
  },
  'spl-greater-restoration': {
    classes: ['Artífice', 'Bardo', 'Clérigo', 'Druida', 'Paladín', 'Explorador'],
    notes: 'En 5.5e se añade también a la lista nativa de Paladín.',
  },
  'spl-aura-of-vitality': {
    classes: ['Clérigo', 'Druida', 'Paladín'],
    description:
      'Emanas energía curativa en 30 pies. Cuando lanzas el conjuro y al comienzo de cada uno de tus turnos posteriores (sin gastar tu Acción Adicional), una criatura en la emanación recupera 2d6 Puntos de Golpe.',
    descriptionEn:
      '30-foot Emanation. Immediately upon casting and at the start of each of your subsequent turns (no Bonus Action needed), one creature in it regains 2d6 Hit Points.',
  },
  'spl-telekinesis': {
    description:
      'En lugar de prueba enfrentada, una criatura Enorme o menor debe superar una salvación de Fuerza contra tu CD de conjuros para no ser apresada y movida hasta 30 pies.',
    descriptionEn:
      'Target creature (Huge or smaller) must succeed on a Strength saving throw against your Spell Save DC or be Restrained and moved up to 30 feet.',
  },
  'spl-forcecage': {
    components: 'V, S, M (polvo de rubí por valor de 1.500+ po, que el conjuro consume)',
    componentsEn: 'V, S, M (ruby dust worth 1,500+ gp, which the spell consumes)',
    duration: 'Concentración, hasta 1 hora',
    durationEn: 'Concentration, up to 1 hour',
    concentration: true,
    notes: 'En 5.5e requiere Concentración y consume el polvo de rubí de 1.500 po.',
  },
  'spl-daylight': {
    description:
      'Creas una esfera de luz brillante de 60 pies de radio (y luz tenue 60 pies más). Esta iluminación cuenta explícitamente como luz solar verdadera.',
    descriptionEn:
      'Sheds 60 feet of Bright Light and 60 feet of Dim Light. This light explicitly counts as sunlight.',
  },
  'spl-banishment': {
    school: 'Conjuración',
    description:
      'El objetivo realiza una salvación de Carisma o es transportado a un semiplano inofensivo (Incapacitado) mientras dure el conjuro. Si mantienes la Concentración el minuto completo sobre una criatura extraplanar, es devuelta a su plano natal o a uno asociado a su tipo.',
    descriptionEn:
      'Conjuration (previously Abjuration). Target makes a Charisma save or is sent to a harmless demiplane (Incapacitated) for 1 minute.',
  },
  'spl-polymorph': {
    description:
      'La criatura transformada adopta estadísticas de Bestia y recibe Puntos de Golpe Temporales iguales a los PG de la Bestia. El conjuro termina si esos PG Temporales se reducen a 0 (el daño sobrante pasa a sus PG normales).',
    descriptionEn:
      'The target gains Temporary Hit Points equal to the Beast’s Hit Points; the spell ends if those Temporary HP drop to 0, with excess damage carrying over.',
  },
  'spl-giant-insect': {
    description:
      'Invocas un insecto gigante usando el bloque de estadísticas oficial de Insecto Gigante (CA 11 + nivel de conjuro, PG 30 + 10 por nivel sobre 4, ataques Veneno/Telaraña que escalan con el espacio).',
    descriptionEn:
      'Summons a Giant Insect using its standardized scaling stat block (AC 11 + spell level, HP 30 + 10 per slot above 4).',
  },
  'spl-tashas-hideous-laughter': {
    description:
      'Se elimina la restricción de Inteligencia <= 4. Una criatura que puedas ver a 30 pies realiza una salvación de Sabiduría o cae Derribada e Incapacitada entre ataques de risa.',
    descriptionEn:
      'No Intelligence restriction. One creature within 30 feet makes a Wisdom save or falls Prone and becomes Incapacitated with laughter.',
  },
  'spl-counterspell': {
    description:
      'Intentas interrumpir a una criatura que está lanzando un conjuro a 60 pies. El lanzador objetivo debe realizar una tirada de salvación de Constitución contra tu CD de salvación de conjuros. Si falla, el conjuro se disipa sin efecto y, si fue lanzado con un espacio de conjuro, ese espacio NO se gasta.',
    descriptionEn:
      'The caster makes a Constitution saving throw against your Spell Save DC. On a failure, the spell dissipates with no effect, and if cast using a spell slot, that slot is not expended.',
    higherLevels: '',
    higherLevelsEn: '',
  },
  'spl-conjure-animals': {
    description:
      'Convocas espíritus naturales en forma de manada espectral en un espacio desocupado a 60 pies (radio de 10 pies). En vez de invocar criaturas individuales, fuerza una salvación de Destreza (3d10 de daño cortante si falla) a enemigos en el área, y puedes mover la manada 30 pies cada turno.',
    descriptionEn:
      'Spectral pack in a 10-ft-radius Emanation (moved up to 30 ft/turn); forces a Dexterity save for 3d10 Slashing damage (no summoned stat blocks).',
    higherLevels:
      'El daño aumenta en 1d10 por cada nivel de espacio por encima de 3.',
  },
  'spl-conjure-minor-elementals': {
    description:
      'Espíritus elementales orbitan en una Emanación de 15 pies a tu alrededor. Tus ataques que impacten a criaturas dentro de esa área infligen 2d8 de daño adicional (Ácido, Frío, Fuego o Relámpago).',
    descriptionEn:
      '15-foot Emanation adding 2d8 Acid, Cold, Fire, or Lightning damage to attacks that hit creatures within it.',
    higherLevels:
      'El daño adicional aumenta en 1d8 por cada nivel de espacio por encima de 4 (incluyendo errata oficial PHB 2024).',
  },
  'spl-conjure-woodland-beings': {
    description:
      'Espíritus feéricos crean una Emanación de 10 pies a tu alrededor. Fuerzan salvación de Sabiduría para infligir 5d8 de daño de fuerza (mitad si supera) y puedes usar Retirada como Acción Adicional mientras dure.',
    descriptionEn:
      '10-foot Emanation forcing a Wisdom save for 5d8 Force damage (half on success), plus Bonus Action Disengage.',
    higherLevels:
      'El daño aumenta en 1d8 por cada nivel de espacio por encima de 4.',
  },
  'spl-conjure-celestial': {
    description:
      'Cilindro de luz celestial de 10 pies de radio a 90 pies. Puedes hacer que sane 4d12 + modificador PG a aliados o que obligue a una salvación de Destreza por 6d12 de daño radiante (mitad si supera).',
    descriptionEn:
      '10-ft-radius Cylinder (90 ft). Either heals 4d12 + spell mod HP or forces a Dexterity save for 6d12 Radiant damage.',
    higherLevels:
      'Tanto la curación como el daño aumentan en 1d12 por cada nivel por encima de 7.',
  },
  'spl-conjure-fey': {
    description:
      'Invocas un espíritu feérico en un espacio desocupado a 60 pies. Realizas un ataque de conjuro cuerpo a cuerpo contra un enemigo cercano que inflige 3d12 + tu modificador por lanzamiento de conjuros de daño psíquico y lo deja Asustado.',
    descriptionEn:
      'Summon a spectral fey in a space within 60 ft. Make a melee spell attack for 3d12 + spell mod Psychic damage and apply Frightened.',
    higherLevels:
      'El daño aumenta en 1d12 por cada nivel de espacio por encima de 6.',
  },
  'spl-blade-barrier': {
    description:
      'Muro de cuchillas mágicas giratorias de hasta 100 pies (o anillo de 60 pies) que inflige 6d10 de daño de fuerza (en vez de cortante) con salvación de Destreza para mitad, además de terreno difícil y cobertura tres cuartos.',
    descriptionEn:
      'Whirling wall of magical blades dealing 6d10 Force damage (Dexterity save half) once per turn, plus Difficult Terrain and Three-Quarters Cover.',
  },
  'spl-phantasmal-killer': {
    description:
      'Ya no aplica la condición Asustado (afecta incluso a criaturas inmunes al miedo). Salvación de Sabiduría: 4d10 de daño psíquico y Desventaja en pruebas y ataques mientras dure si falla, o la mitad de daño (2d10) si tiene éxito y termina el conjuro.',
    descriptionEn:
      'No longer inflicts Frightened (works even on fear-immune foes). Wisdom save: 4d10 Psychic damage and Disadvantage on checks and attacks on fail, or half damage on success.',
  },
  'spl-find-steed': {
    castingTime: '1 acción',
    castingTimeEn: '1 action',
    description:
      'Lanzamiento en 1 acción. Invocas un corcel sobrenatural (Celestial, Feérico o Infernal) usando su bloque de estadísticas escalable con tu nivel de espacio de conjuro y Bonificador de Competencia.',
    descriptionEn:
      'Casting time 1 Action. Summons an Otherworldly Steed (Celestial, Fey, or Fiend) with scaling HP and abilities.',
  },
  'spl-mirror-image': {
    description:
      'Creas 3 duplicados ilusorios. Cada vez que una criatura te impacte con una tirada de ataque, tira 1d6 por cada duplicado restante; si sacas 3 o más en cualquiera, un duplicado recibe el golpe, desaparece y no sufres daño.',
    descriptionEn:
      'Creates 3 illusory duplicates. Whenever you are hit by an attack roll, roll a d6 per duplicate; on a 3+, one duplicate absorbs the hit and vanishes.',
  },
  'spl-ray-of-enfeeblement': {
    description:
      'El objetivo realiza una salvación de Constitución (ya no tirada de ataque). Si falla, tiene Desventaja en pruebas D20 basadas en Fuerza y resta 1d8 de todas sus tiradas de daño mientras dure el conjuro. Si tiene éxito, solo sufre Desventaja en su próxima tirada de ataque antes del inicio de tu siguiente turno.',
    descriptionEn:
      'Target makes a Constitution saving throw. On failure, Disadvantage on Strength D20 tests and subtracts 1d8 from all damage rolls; on success, Disadvantage on next attack roll.',
  },
  'spl-hunters-mark': {
    description:
      'Marcas mágicamente a una criatura que puedas ver a 90 pies como tu presa. Infliges 1d6 de daño de fuerza adicional cada vez que la impactes con un ataque de arma y tienes Ventaja en pruebas de Sabiduría (Percepción o Supervivencia) para encontrarla.',
    descriptionEn:
      'Deal an extra 1d6 Force damage whenever you hit the marked target with a weapon attack, and gain Advantage on Perception/Survival to find it.',
  },
  'spl-summon-draconic-spirit': {
    name: 'Invocar Dragón',
    nameEn: 'Summon Dragon',
    classes: ['Hechicero', 'Mago'],
    description:
      'En 5.5e renombra y estandariza Invocar Espíritu Dracónico. Convocas un Espíritu Dracónico Grande (CA 14 + nivel de conjuro, PG 50 + 10 por nivel sobre 5, multiataque igual a la mitad del nivel del conjuro + Aliento 2d6 en cono de 30 pies). Te otorga resistencia al tipo de daño elegido.',
    descriptionEn:
      '2024 update of Summon Draconic Spirit. Summons a Draconic Spirit (AC 14 + slot level, HP 50 + 10 per slot above 5, Multiattack half slot level Rend + Breath Weapon).',
  },
  'spl-feeblemind': {
    name: 'Ofuscación',
    nameEn: 'Befuddlement',
    classes: ['Bardo', 'Druida', 'Brujo', 'Mago'],
    description:
      'Reemplaza a Degeneración Mental en 5.5e. Destrozas la mente de una criatura a 150 pies: debe superar una salvación de Inteligencia o sufrir 10d12 de daño psíquico y quedar incapaz de lanzar conjuros o realizar la acción de Magia. Repite la salvación cada 30 días (o se elimina con Restablecimiento Mayor, Sanar o Deseo).',
    descriptionEn:
      'Replaces Feeblemind in 2024. Target within 150 feet makes an Intelligence save or takes 10d12 Psychic damage and cannot cast spells or take the Magic action (save every 30 days).',
  },
};

const BY_NAME_EN_LOWER = new Map<string, Spell2024RuleOverride>();
for (const override of Object.values(SPELLS_2024_OVERRIDES)) {
  if (override.nameEn) {
    BY_NAME_EN_LOWER.set(override.nameEn.toLowerCase(), override);
  }
}

/**
 * Devuelve el conjuro adaptado a la edición indicada ('5e' o '5.5e').
 * Para '5.5e' fusiona tanto `spell.rules2024` como `SPELLS_2024_OVERRIDES`.
 */
export function getSpellForEdition(spell: Spell, edition: '5e' | '5.5e' = '5e'): Spell {
  if (edition !== '5.5e') return spell;
  const override =
    SPELLS_2024_OVERRIDES[spell.id] ||
    (spell.nameEn ? BY_NAME_EN_LOWER.get(spell.nameEn.toLowerCase()) : undefined);
  const inline = spell.rules2024;
  if (!override && !inline) return spell;
  const merged = { ...(override || {}), ...(inline || {}) };
  return {
    ...spell,
    ...merged,
    classes: merged.classes ?? spell.classes,
    concentration: merged.concentration ?? spell.concentration,
    ritual: merged.ritual ?? spell.ritual,
  };
}

/**
 * Filtra y adapta una lista de conjuros según la edición activa ('5e' o '5.5e').
 */
export function getAllSpellsForEdition(
  spells: Spell[],
  edition: '5e' | '5.5e' = '5e'
): Spell[] {
  return spells
    .filter((s) => {
      if (!s.edition || s.edition === 'both') return true;
      return s.edition === edition;
    })
    .map((s) => getSpellForEdition(s, edition));
}
