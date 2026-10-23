// Base de datos expandida de Subclases y Clases canónicas de D&D 5e (Wikidot / Libros Oficiales)
// Cada subclase incluye progresión completa de rasgos por nivel, descripciones canónicas y metadatos.

export interface SubclassFeature {
  level: number;
  name: string;
  desc: string;
}

export interface SubclassDefinition {
  id: string;
  name: string;
  description: string;
  features: SubclassFeature[];
  isCasterSubclass?: boolean;
  spellcastingAbility?: 'int' | 'wis' | 'cha';
}

export const EXPANDED_SUBCLASSES_BY_CLASS: Record<string, SubclassDefinition[]> = {
  barbaro: [
    {
      id: 'fanatico',
      name: 'Senda del Fanático (Path of the Zealot)',
      description: 'Guerreros imbuidos de fervor divino por deidades de la batalla, que canalizan su ira como castigo sagrado imparable.',
      features: [
        {
          level: 3,
          name: 'Furia Divina (Divine Fury)',
          desc: 'El primer impacto de arma cuerpo a cuerpo que asestas en cada uno de tus turnos mientras estás en Furia inflige 1d6 + la mitad de tu nivel de bárbaro de daño radiante o necrótico adicional (a tu elección al elegir la senda).'
        },
        {
          level: 3,
          name: 'Guerrero de los Dioses (Warrior of the Gods)',
          desc: 'Si un conjuro tiene el único propósito de devolverte a la vida (como Revivir o Alzamiento de los Muertos), quien lo lance no necesita gastar ningún componente material de valor para traer tu alma de vuelta.'
        },
        {
          level: 6,
          name: 'Enfoque Fanático (Fanatical Focus)',
          desc: 'Si fallas una tirada de salvación mientras estás en Furia, puedes volver a tirarla con ventaja. Debes usar el nuevo resultado y puedes usar este rasgo una vez por furia.'
        },
        {
          level: 10,
          name: 'Presencia Fanática (Zealous Presence)',
          desc: 'Como acción adicional, desatas un grito de guerra sobrecogedor. Hasta 10 criaturas aliadas a tu elección a menos de 60 pies ganan ventaja en tiradas de ataque y tiradas de salvación hasta el comienzo de tu siguiente turno (1/descanso largo).'
        },
        {
          level: 14,
          name: 'Furia más allá de la Muerte (Rage beyond Death)',
          desc: 'Estar a 0 puntos de golpe no te deja inconsciente mientras estés en furia. Sigues haciendo salvaciones de muerte normalmente y sufres los efectos normales del daño. Solo mueres por fallos en salvaciones de muerte si tu furia termina y continúas a 0 PG.'
        }
      ]
    },
    {
      id: 'guardian-ancestral',
      name: 'Senda del Guardián Ancestral (Ancestral Guardian)',
      description: 'Llaman a los espíritus de sus ancestros guerreros para proteger a sus aliados y desviar los ataques del enemigo.',
      features: [
        {
          level: 3,
          name: 'Protectores Ancestrales (Ancestral Protectors)',
          desc: 'La primera criatura que golpeas con un ataque con arma en tu turno mientras estás en furia queda marcada por espíritus. Hasta tu siguiente turno, esa criatura tiene desventaja en tiradas de ataque contra cualquiera que no seas tú, y si impacta a otro, ese objetivo tiene resistencia al daño del ataque.'
        },
        {
          level: 6,
          name: 'Escudo Espiritual (Spirit Shield)',
          desc: 'Si otra criatura que puedes ver a 30 pies o menos sufre daño mientras estás en furia, puedes usar tu reacción para reducir ese daño en 2d6 (aumenta a 3d6 a nivel 10 y 4d6 a nivel 14).'
        },
        {
          level: 10,
          name: 'Consultar a los Espíritus (Consult the Spirits)',
          desc: 'Puedes invocar a tus ancestros para obtener sabiduría, lanzando el conjuro Augurio o Clarividencia sin gastar ranura de conjuro ni componentes de valor (1/descanso corto o largo).'
        },
        {
          level: 14,
          name: 'Venganza Ancestral (Vengeful Ancestors)',
          desc: 'Cuando usas tu Escudo Espiritual para reducir daño, el atacante sufre daño de fuerza igual a la cantidad de daño que redujiste.'
        }
      ]
    },
    {
      id: 'bestia',
      name: 'Senda de la Bestia (Path of the Beast)',
      description: 'Canalizan la esencia primigenia de depredadores totémicos, mutando su propia carne en garras, fauces o colas mortíferas.',
      features: [
        {
          level: 3,
          name: 'Forma de la Bestia (Form of the Beast)',
          desc: 'Al entrar en furia manifiestas un arma natural a elegir: Mordisco (1d8 perforante, recuperas PG iguales a tu bonificador de competencia si estás por debajo de la mitad), Garras (1d6 cortante, puedes hacer un ataque adicional gratis por turno si atacas con garras), o Cola (1d8 perforante con alcance 10 pies, como reacción añades 1d8 a tu CA si te van a impactar).'
        },
        {
          level: 6,
          name: 'Adaptación Bestial (Bestial Soul)',
          desc: 'Tus armas naturales cuentan como mágicas para superar resistencias. Además, tras cada descanso eliges una adaptación: velocidad de nado igual a tu velocidad terrestre y respirar bajo agua, velocidad de escalada igual a tu velocidad terrestre y caminar por techos, o saltar sumando una prueba de Atletismo a la distancia.'
        },
        {
          level: 10,
          name: 'Furia Infecciosa (Infectious Fury)',
          desc: 'Al impactar a una criatura con tus armas naturales en furia, puedes forzar una salvación de Sabiduría (CD 8 + prof + Con). Si falla, la criatura sufre 2d12 de daño psíquico o usa su reacción para golpear a uno de sus aliados.'
        },
        {
          level: 14,
          name: 'Llamada a la Manada (Call the Hunt)',
          desc: 'Al entrar en furia puedes elegir un número de criaturas aliadas a 30 pies igual a tu bonificador de Con. Cada una gana 5 PG temporales por aliado potenciado, y tú ganas 1d6 de daño adicional por cada aliado que te acompañe.'
        }
      ]
    },
    {
      id: 'magia-salvaje',
      name: 'Senda de la Magia Salvaje (Path of Wild Magic)',
      description: 'Imbuidos con las energías caóticas del Feywild o planos mágicos, cada estallido de furia desata fenómenos arcanos impredecibles.',
      features: [
        {
          level: 3,
          name: 'Conciencia Mágica (Magic Awareness)',
          desc: 'Como acción, puedes abrir tu mente para detectar la presencia de magia concentrada o conjuros a menos de 60 pies hasta el final de tu siguiente turno.'
        },
        {
          level: 3,
          name: 'Oleada de Magia Salvaje (Wild Magic Surge)',
          desc: 'Al entrar en furia tiras 1d8 en la tabla de magia salvaje: 1: teletransporte como acción adicional; 2: rayos necróticos que curan; 3: espíritus fey que explotan con daño de fuerza; 4: armas imbuidas de energía radiante y arrojadizas; 5: proyectiles de fuego al recibir daño; 6: armadura protectora que ciega; 7: terreno difícil de flores espinosas; 8: rayo de energía arcana que ciega.'
        },
        {
          level: 6,
          name: 'Magia Nutritiva (Bolstering Presence)',
          desc: 'Como acción tocas a un aliado para bendecirlo: gana 1d3 en tiradas de ataque y pruebas durante 10 minutos, o recupera una ranura de conjuro gastada de nivel hasta 1d3.'
        },
        {
          level: 10,
          name: 'Reacción Inestable (Unstable Backlash)',
          desc: 'Cuando sufres daño o fallas una salvación en furia, puedes usar tu reacción para volver a tirar en la tabla de magia salvaje, reemplazando el efecto actual de inmediato.'
        },
        {
          level: 14,
          name: 'Oleada Controlada (Controlled Surge)',
          desc: 'Cada vez que tiras en la tabla de Magia Salvaje, tiras dos dados y puedes elegir cuál de los dos resultados deseas manifestar.'
        }
      ]
    },
    {
      id: 'heraldo-tormenta',
      name: 'Senda del Heraldo de la Tormenta (Storm Herald)',
      description: 'Encarnan la furia climatológica de los elementos primordiales: el calor abrasador del desierto, el rayo marino o la escarcha invernal.',
      features: [
        {
          level: 3,
          name: 'Aura de Tormenta (Storm Aura)',
          desc: 'Generas un aura de 10 pies al enfurecerte. Puedes activarla como acción adicional en cada turno: Desierto (2 a 6 de daño de fuego a todas las criaturas adyacentes), Mar (1d6 a 4d6 de daño de relámpago con salvación de Des a un objetivo), o Tundra (2 a 6 PG temporales a cada aliado en tu aura).'
        },
        {
          level: 6,
          name: 'Alma de la Tormenta (Storm Soul)',
          desc: 'Ganas resistencia permanente según tu ambiente: Fuego (Desierto), Relámpago y respirar bajo agua (Mar), o Frío e inmunidad al frío extremo (Tundra).'
        },
        {
          level: 10,
          name: 'Protección de la Tempestad (Shielding Storm)',
          desc: 'Cada criatura a tu elección dentro de tu Aura de Tormenta gana la resistencia al daño concedida por tu rasgo Alma de la Tormenta.'
        },
        {
          level: 14,
          name: 'Furia Furibunda (Raging Storm)',
          desc: 'Efectos supremos para tu aura: Desierto (reacción cuando alguien te golpea para infligir la mitad de tu nivel en daño de fuego), Mar (reacción para derribar a quien te golpee si falla salvación de Fue), o Tundra (reacción para congelar y reducir la velocidad a 0 de un enemigo en tu aura).'
        }
      ]
    },
    {
      id: 'gigante',
      name: 'Senda del Gigante (Path of the Giant)',
      description: 'Extraen su fuerza titánica del Ordenamiento de los Gigantes, creciendo en tamaño descomunal y lanzando armas o enemigos por el campo.',
      features: [
        {
          level: 3,
          name: 'Poderío de los Gigantes (Giant\'s Might)',
          desc: 'Al entrar en furia creces a tamaño Grande si hay espacio, tu alcance aumenta en 5 pies, y añades tu bonificador de furia al daño de ataques arrojadizos con armas.'
        },
        {
          level: 6,
          name: 'Arma Elemental (Elemental Cleaver)',
          desc: 'Imbuyes tu arma con energía de Gigante (ácido, frío, fuego, relámpago o trueno) que añade 1d6 de daño elemental. El arma gana la propiedad arrojadiza (alcance 20/60) y regresa mágicamente a tu mano al instante.'
        },
        {
          level: 10,
          name: 'Estatura Imponente (Mighty Impel)',
          desc: 'Como acción adicional puedes levantar a una criatura Mediana o menor a 5 pies de ti y lanzarla hasta 30 pies. Si es un enemigo y falla una salvación de Fuerza, sufre 1d6 de daño por cada 10 pies de caída y queda derribado.'
        },
        {
          level: 14,
          name: 'Cataclismo Elemental (Demiurgic Colossus)',
          desc: 'Al entrar en furia puedes crecer a tamaño Enorme, tu alcance aumenta en 10 pies, el daño elemental de tu Arma Elemental aumenta a 2d6, y puedes lanzar criaturas Grandes con Estatura Imponente.'
        }
      ]
    },
    {
      id: 'battlerager',
      name: 'Senda del Furioso de Batalla (Path of the Battlerager)',
      description: 'Guerreros enanos que visten pesadas armaduras cubiertas de púas de hierro afiladas y se arrojan contra sus enemigos como torbellinos de púas.',
      features: [
        {
          level: 3,
          name: 'Armadura de Púas (Battlerager Armor)',
          desc: 'Ganas la capacidad de usar armadura de púas como arma. Mientras estás en Furia y llevas armadura de púas, puedes usar una acción adicional en cada uno de tus turnos para realizar un ataque cuerpo a cuerpo con las púas (1d4 perforante + mod Fuerza). Además, al agarrar a una criatura con éxito mientras llevas tu armadura, le infliges 3 puntos de daño perforante.'
        },
        {
          level: 6,
          name: 'Abandono Temerario (Reckless Abandon)',
          desc: 'Cuando utilizas Ataque Temerario mientras estás en Furia, ganas un número de puntos de golpe temporales igual a tu modificador de Constitución (mínimo 1). Estos PG temporales desaparecen al terminar tu furia.'
        },
        {
          level: 10,
          name: 'Carga del Furioso (Battlerager Charge)',
          desc: 'Puedes tomar la acción de Carrera (Dash) como acción adicional en tu turno mientras estés en Furia.'
        },
        {
          level: 14,
          name: 'Retribución con Púas (Spiked Retribution)',
          desc: 'Cuando una criatura a menos de 5 pies de ti te impacta con un ataque cuerpo a cuerpo mientras llevas tu armadura de púas y no estás incapacitado, recibe automáticamente 3 puntos de daño perforante.'
        }
      ]
    }
  ],

  bardo: [
    {
      id: 'colegio-glamour',
      name: 'Colegio del Glamour (College of Glamour)',
      description: 'Herederos de la gracia y el terror cautivador de la corte Feérica. Su arte doblega voluntades y deslumbra a ejércitos enteros.',
      features: [
        {
          level: 3,
          name: 'Manto de Inspiración (Mantle of Inspiration)',
          desc: 'Como acción adicional gastas un uso de Inspiración Bárdica: hasta un número de criaturas igual a tu mod de Carisma a 60 pies ganan 5 PG temporales (aumenta a 8 a lvl 5, 11 a lvl 10, 14 a lvl 15) y pueden usar su reacción de inmediato para moverse hasta su velocidad sin provocar ataques de oportunidad.'
        },
        {
          level: 3,
          name: 'Actuación Cautivadora (Enthralling Performance)',
          desc: 'Si actúas durante 1 minuto, puedes fascinar a hasta un número de humanoides igual a tu modificador de Carisma. Si fallan una salvación de Sabiduría contra tu CD de conjuros, quedan encantados durante 1 hora y te veneran como a un ídolo.'
        },
        {
          level: 6,
          name: 'Manto de Majestad (Mantle of Majesty)',
          desc: 'Como acción adicional adquieres una presencia sobrehumana durante 1 minuto. En cada uno de tus turnos puedes lanzar Mando como acción adicional sin gastar ninguna ranura de conjuro. Cualquier criatura encantada por ti falla automáticamente la salvación.'
        },
        {
          level: 14,
          name: 'Majestuosidad Inquebrantable (Unbreakable Majesty)',
          desc: 'Como acción adicional adquieres un aspecto sobrecogedor durante 1 minuto. La primera vez que una criatura intente atacarte en cada uno de sus turnos, debe superar una salvación de Carisma o no podrá atacarte y deberá elegir otro objetivo o perder el ataque.'
        }
      ]
    },
    {
      id: 'colegio-susurros',
      name: 'Colegio de los Susurros (College of Whispers)',
      description: 'Espías consumados e ilusionistas que usan secretos, venenos y terror psicológico como sus más afiladas melodías.',
      features: [
        {
          level: 3,
          name: 'Hojas Psíquicas (Psychic Blades)',
          desc: 'Cuando impactas a una criatura con un ataque de arma, puedes gastar un uso de Inspiración Bárdica para infligir 3d6 de daño psíquico adicional a ese objetivo. Este daño aumenta a 5d6 a nivel 5, 8d6 a nivel 10, y 10d6 a nivel 15.'
        },
        {
          level: 3,
          name: 'Palabras de Terror (Words of Terror)',
          desc: 'Si hablas a solas con una criatura durante al menos 1 minuto, puedes sembrar la paranoia en su mente. Debe superar una salvación de Sabiduría o quedará asustada de ti o de un objetivo a tu elección durante 1 hora.'
        },
        {
          level: 6,
          name: 'Manto de Susurros (Mantle of Whispers)',
          desc: 'Cuando un humanoide muere a 30 pies de ti, puedes usar tu reacción para capturar su sombra. Puedes usar esa sombra para disfrazarte mágicamente de esa persona, adquiriendo su apariencia, voz y recuerdos superficiales durante 1 hora.'
        },
        {
          level: 14,
          name: 'Captor de Sombras (Shadow Lore)',
          desc: 'Como acción susurras una frase que solo una criatura a 30 pies puede oír. Debe superar una salvación de Sabiduría o creerá que posees su secreto más oscuro y destructivo, obedeciendo cualquier petición tuya que no la lleve al suicidio directo durante 8 horas.'
        }
      ]
    },
    {
      id: 'colegio-elocuencia',
      name: 'Colegio de la Elocuencia (College of Eloquence)',
      description: 'Maestros del debate, la dialéctica y el peso de las palabras. Su retórica infunde coraje inquebrantable o quiebra la determinación enemiga.',
      features: [
        {
          level: 3,
          name: 'Lengua de Plata (Silver Tongue)',
          desc: 'Cada vez que hagas una prueba de Carisma (Persuasión) o Carisma (Engaño), puedes considerar cualquier resultado de 9 o menor en el d20 como un 10.'
        },
        {
          level: 3,
          name: 'Palabras Desconcertantes (Unsettling Words)',
          desc: 'Como acción adicional gastas un uso de Inspiración Bárdica y eliges una criatura a 60 pies. Tiras el dado de inspiración y restas el número obtenido a la siguiente tirada de salvación que la criatura realice antes del comienzo de tu próximo turno.'
        },
        {
          level: 6,
          name: 'Inspiración Inagotable (Unfailing Inspiration)',
          desc: 'Cuando una criatura suma uno de tus dados de Inspiración Bárdica a una prueba de característica, tirada de ataque o salvación y fracasa, la criatura conserva el dado de Inspiración Bárdica sin gastarlo.'
        },
        {
          level: 6,
          name: 'Discurso Universal (Universal Speech)',
          desc: 'Como acción puedes hacer que tus palabras sean comprendidas mágicamente por hasta un número de criaturas igual a tu modificador de Carisma durante 1 hora, sin importar qué idiomas conozcan.'
        },
        {
          level: 14,
          name: 'Infección Infecciosa (Infectious Inspiration)',
          desc: 'Cuando un aliado utiliza tu Inspiración Bárdica con éxito en una tirada, puedes usar tu reacción para otorgar otro dado de Inspiración Bárdica a otra criatura a 60 pies sin consumir tu reserva de usos de inspiración (hasta Car mod veces/descanso largo).'
        }
      ]
    },
    {
      id: 'colegio-creacion',
      name: 'Colegio de la Creación (College of Creation)',
      description: 'Canalizan la Canción de la Creación original que dio forma al cosmos, animando materia inerte y materializando objetos de la nada.',
      features: [
        {
          level: 3,
          name: 'Mota de Potencial (Note of Potential)',
          desc: 'Tus dados de Inspiración Bárdica flotan como motas de luz musical alrededor del aliado y otorgan beneficios adicionales: Si se usa en ataque, explota en daño de trueno en área; si se usa en salvación, otorga PG temporales; si se usa en prueba de característica, permite tirar dos dados y elegir el mayor.'
        },
        {
          level: 3,
          name: 'Actuación de la Creación (Performance of Creation)',
          desc: 'Como acción creas un objeto no mágico en un espacio libre a 10 pies de ti (de tamaño Mediano o menor y valor máximo igual a 20 veces tu nivel de bardo en po). El objeto dura un número de horas igual a tu bonificador de competencia.'
        },
        {
          level: 6,
          name: 'Compañero Danzante (Animating Performance)',
          desc: 'Como acción animas mágicamente un objeto Grande o menor a 30 pies. El objeto cobra vida como un Objeto Danzante amigable que vuela, ataca con daño de fuerza y otorga un aura de +10 pies de velocidad a tus aliados adyacentes.'
        },
        {
          level: 14,
          name: 'Sinfonía de la Creación (Creative Crescendo)',
          desc: 'Puedes crear múltiples objetos a la vez con tu Actuación de la Creación sin límite de coste en piezas de oro y hasta de tamaño Enorme.'
        }
      ]
    },
    {
      id: 'colegio-espiritus',
      name: 'Colegio de los Espíritus (College of Spirits)',
      description: 'Conjuradores y adivinos que entonan historias de almas difuntas usando cartas de tarokka, dados o calaveras para invocar milagros.',
      features: [
        {
          level: 3,
          name: 'Foco Guía (Guiding Focus)',
          desc: 'Puedes emplear herramientas de adivinación (mazo de tarokka, huesos o una calavera) como foco de lanzamiento para tus conjuros de bardo. A nivel 6, al lanzar un conjuro que inflija daño o cure mediante este foco, sumas 1d6 adicional.'
        },
        {
          level: 3,
          name: 'Susurros del Más Allá (Tales from Beyond)',
          desc: 'Como acción adicional gastas una Inspiración Bárdica y tiras en la tabla de espíritus (1d6/1d12): bestia (daño y derribo), guerrero (daño de fuerza masivo), sanador (curación múltiple), ilusionista (invisibilidad y teletransporte), dragón (aliento de fuego), o fantasma (atravesar paredes).'
        },
        {
          level: 6,
          name: 'Sesión Espiritual (Spirit Session)',
          desc: 'Realizas una sesión de espiritismo con tus aliados durante un descanso corto para aprender temporalmente un conjuro de Nigromancia o Adivinación de cualquier clase hasta un nivel igual a tu bonificador de competencia.'
        },
        {
          level: 14,
          name: 'Conexión Mística (Mystical Connection)',
          desc: 'Al tirar en la tabla de Susurros del Más Allá, tiras 2 dados en lugar de 1 y puedes elegir cuál de los dos relatos espirituales quieres manifestar.'
        }
      ]
    }
  ],

  clerigo: [
    {
      id: 'dominio-forja',
      name: 'Dominio de la Forja (Forge Domain)',
      description: 'Clérigos devotos de dioses de los herreros y artesanos como Moradin o Gond. Su piel y martillos resisten el calor más abrasador.',
      features: [
        {
          level: 1,
          name: 'Competencias de la Forja',
          desc: 'Ganas competencia con armaduras pesadas y herramientas de herrero.'
        },
        {
          level: 1,
          name: 'Bendición de la Forja (Blessing of the Forge)',
          desc: 'Al final de un descanso largo tocas un arma no mágica o armadura no mágica: gana un bonificador de +1 a las tiradas de ataque y daño, o un +1 a la CA si es una armadura, hasta tu siguiente descanso largo.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Bendición del Artesano',
          desc: 'Realizas un ritual de 1 hora transmutando metales para fabricar cualquier objeto no mágico (armas, armaduras, herramientas, cadenas o llaves) cuyo valor no exceda 100 po.'
        },
        {
          level: 6,
          name: 'Alma de la Forja (Soul of the Forge)',
          desc: 'Ganas resistencia al daño de fuego permanente. Además, mientras lleves una armadura pesada ganas un bonificador de +1 a tu Clase de Armadura.'
        },
        {
          level: 8,
          name: 'Golpe Divino: Fuego (Divine Strike)',
          desc: 'Una vez en cada uno de tus turnos cuando impactas a una criatura con un ataque de arma, infliges 1d8 de daño de fuego adicional (aumenta a 2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Santo de la Forja y el Fuego (Saint of Forge and Fire)',
          desc: 'Ganas inmunidad total al daño de fuego. Además, mientras lleves armadura pesada ganas resistencia al daño contundente, perforante y cortante de ataques no mágicos.'
        }
      ]
    },
    {
      id: 'dominio-tempestad',
      name: 'Dominio de la Tempestad (Tempest Domain)',
      description: 'Señores del trueno, el relámpago y las tormentas implacables como Talos o Thor, que castigan a quien ose acercarse.',
      features: [
        {
          level: 1,
          name: 'Competencias de Tempestad',
          desc: 'Ganas competencia con armas marciales y armaduras pesadas.'
        },
        {
          level: 1,
          name: 'Ira de la Tormenta (Wrath of the Storm)',
          desc: 'Cuando una criatura a 5 pies de ti te impacte con un ataque, puedes usar tu reacción para infligirle 2d8 de daño de relámpago o trueno (a tu elección) si falla una salvación de Destreza (Sab mod veces/descanso largo).'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Ira Destructiva (Destructive Wrath)',
          desc: 'Cuando tires daño de relámpago o trueno, puedes usar Canalizar Divinidad para infligir el daño máximo posible en lugar de tirar los dados.'
        },
        {
          level: 6,
          name: 'Golpe Eléctrico (Thunderbolt Strike)',
          desc: 'Cuando inflijas daño de relámpago a una criatura Grande o menor, puedes empujarla mágicamente hasta 10 pies lejos de ti.'
        },
        {
          level: 8,
          name: 'Golpe Divino: Trueno (Divine Strike)',
          desc: 'Una vez en cada uno de tus turnos al impactar con un arma, infliges 1d8 de daño de trueno adicional (aumenta a 2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Nacido de la Tormenta (Stormborn)',
          desc: 'Ganas una velocidad de vuelo igual a tu velocidad terrestre actual siempre que no estés bajo tierra ni en interiores sin cielo abierto.'
        }
      ]
    },
    {
      id: 'dominio-engano',
      name: 'Dominio del Engaño (Trickery Domain)',
      description: 'Emisarios de deidades de la astucia, el sigilo y la traición como Tymora o Loki, expertos en crear duplicados ilusorios.',
      features: [
        {
          level: 1,
          name: 'Bendición del Embaucador (Blessing of the Trickster)',
          desc: 'Como acción tocas a una criatura dispuesta que no seas tú para otorgarle ventaja en pruebas de Destreza (Sigilo) durante 1 hora o hasta que vuelvas a usar este rasgo.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Invocar Duplicidad (Invoke Duplicity)',
          desc: 'Como acción creas una ilusión perfecta de ti mismo a 30 pies durante 1 minuto. Puedes moverla hasta 30 pies como acción adicional, lanzar conjuros a través de su posición y ganar ventaja en ataques contra enemigos adyacentes a ambos.'
        },
        {
          level: 6,
          name: 'Canalizar Divinidad: Manto de Sombras (Cloak of Shadows)',
          desc: 'Como acción puedes volverte invisible hasta el final de tu siguiente turno o hasta que ataques o lances un conjuro.'
        },
        {
          level: 8,
          name: 'Golpe Divino: Veneno (Divine Strike)',
          desc: 'Una vez en cada uno de tus turnos al golpear con un arma, infliges 1d8 de daño de veneno adicional (aumenta a 2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Duplicidad Mejorada (Improved Duplicity)',
          desc: 'Puedes crear hasta cuatro duplicados ilusorios con Invocar Duplicidad a la vez y mover cualquiera de ellos libremente en tu turno.'
        }
      ]
    },
    {
      id: 'dominio-tumba',
      name: 'Dominio de la Tumba (Grave Domain)',
      description: 'Vigilantes de la delgada línea entre la vida y la muerte, como la Reina de los Cuervos o Kelemvor. Destruyen no muertos y rescatan a los moribundos.',
      features: [
        {
          level: 1,
          name: 'Círculo de Mortalidad (Circle of Mortality)',
          desc: 'Al lanzar un conjuro de curación sobre una criatura que tenga 0 puntos de golpe, cada dado de curación obtiene su resultado máximo posible. Además, aprendes el truco Piedad con los Moribundos y puedes lanzarlo como acción adicional con alcance de 30 pies.'
        },
        {
          level: 1,
          name: 'Ojos de la Tumba (Eyes of the Grave)',
          desc: 'Como acción puedes detectar la presencia de cualquier criatura no muerta a 60 pies que no esté bajo cobertura total (Sab mod veces/descanso largo).'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Camino a la Tumba (Path to the Grave)',
          desc: 'Como acción marcas a una criatura a 30 pies. El siguiente impacto que sufra de ti o de un aliado antes del final de tu siguiente turno vuelve a la criatura vulnerable a todo el daño infligido por ese ataque.'
        },
        {
          level: 6,
          name: 'Centinela en las Puertas de la Muerte (Sentinel at Death\'s Door)',
          desc: 'Como reacción cuando tú o un aliado a 30 pies sufra un impacto crítico, anulas el crítico y conviertes el impacto en un golpe normal (Sab mod veces/descanso largo).'
        },
        {
          level: 8,
          name: 'Potenciar Conjuros (Potent Spellcasting)',
          desc: 'Añades tu modificador de Sabiduría al daño que infliges con cualquier truco de clérigo.'
        },
        {
          level: 17,
          name: 'Guardián de las Almas (Keeper of Souls)',
          desc: 'Cuando un enemigo muere a 60 pies de ti, tú o un aliado a 60 pies recupera puntos de golpe iguales al número de Dados de Golpe de la criatura caída.'
        }
      ]
    },
    {
      id: 'dominio-conocimiento',
      name: 'Dominio del Conocimiento (Knowledge Domain)',
      description: 'Buscadores de secretos arcanos e historia cósmica como Oghma o Boccob, capaces de dominar habilidades al instante.',
      features: [
        {
          level: 1,
          name: 'Bendiciones del Conocimiento',
          desc: 'Aprendes dos idiomas adicionales y ganas competencia en dos habilidades entre Conocimiento Arcano, Historia, Naturaleza o Religión, duplicando tu bonificador de competencia en ellas.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Conocimiento de las Eras',
          desc: 'Como acción puedes canalizar sabiduría divina para obtener competencia con cualquier habilidad o herramienta a tu elección durante 10 minutos.'
        },
        {
          level: 6,
          name: 'Canalizar Divinidad: Leer Pensamientos',
          desc: 'Como acción lees los pensamientos superficiales de una criatura a 60 pies si falla una salvación de Sabiduría, o lanzas Sugestión sobre ella sin gastar ranura.'
        },
        {
          level: 8,
          name: 'Potenciar Conjuros (Potent Spellcasting)',
          desc: 'Añades tu modificador de Sabiduría al daño de tus trucos de clérigo.'
        },
        {
          level: 17,
          name: 'Visiones del Pasado (Visions of the Past)',
          desc: 'Puedes meditar para percibir acontecimientos ocurridos en un objeto o área en los últimos días, semanas o siglos.'
        }
      ]
    },
    {
      id: 'dominio-naturaleza',
      name: 'Dominio de la Naturaleza (Nature Domain)',
      description: 'Protectores de los bosques, bestias y elementos como Silvanus o Chauntea, uniendo la fe con la magia druídica.',
      features: [
        {
          level: 1,
          name: 'Acólito de la Naturaleza',
          desc: 'Aprendes un truco de druida a tu elección y ganas competencia con armaduras pesadas y una habilidad entre Trato con Animales, Naturaleza o Supervivencia.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Encantar Animales y Plantas',
          desc: 'Como acción puedes encantar a todas las bestias y plantas en un radio de 30 pies si fallan una salvación de Sabiduría durante 1 minuto.'
        },
        {
          level: 6,
          name: 'Atenuar Elementos (Dampen Elements)',
          desc: 'Como reacción cuando tú o una criatura a 30 pies reciba daño de ácido, frío, fuego, relámpago o trueno, concedes resistencia a ese tipo de daño contra ese ataque.'
        },
        {
          level: 8,
          name: 'Golpe Divino Elemental (Divine Strike)',
          desc: 'Una vez por turno al golpear con un arma infliges 1d8 de daño adicional de frío, fuego o relámpago (2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Maestro de la Naturaleza (Master of Nature)',
          desc: 'Puedes comandar con acción adicional a cualquier criatura que tengas encantada con Encantar Animales y Plantas para que ataque a tus enemigos.'
        }
      ]
    },
    {
      id: 'dominio-crepusculo',
      name: 'Dominio del Crepúsculo (Twilight Domain)',
      description: 'Guardianes de la penumbra y el paso entre el día y la noche como Selûne o Ilmater, que protegen a los caminantes de los horrores de la oscuridad.',
      features: [
        {
          level: 1,
          name: 'Ojos de la Noche (Eyes of Night)',
          desc: 'Ganas visión en la oscuridad con un alcance colosal de 300 pies. Además, puedes compartir esta visión con hasta un número de criaturas igual a tu modificador de Sabiduría durante 1 hora.'
        },
        {
          level: 1,
          name: 'Bendición Vigilante (Vigilant Blessing)',
          desc: 'Como acción tocas a una criatura (incluyéndote a ti mismo) para concederle ventaja en su siguiente tirada de Iniciativa.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Santuario del Crepúsculo (Twilight Sanctuary)',
          desc: 'Como acción manifiestas una esfera de penumbra protectora de 30 pies de radio centrada en ti durante 1 minuto. Cuando una criatura (tú o un aliado) termine su turno en la esfera, puedes otorgarle 1d6 + tu nivel de clérigo en PG temporales o terminar un efecto que la deje Encantada o Asustada.'
        },
        {
          level: 6,
          name: 'Pasos de la Noche (Steps of Night)',
          desc: 'Como acción adicional en luz tenue u oscuridad, puedes impulsarte místicamente para volar con una velocidad igual a tu velocidad terrestre durante 1 minuto (bono de competencia veces/descanso largo).'
        },
        {
          level: 8,
          name: 'Golpe Divino: Radiante (Divine Strike)',
          desc: 'Una vez por turno al impactar con un arma infliges 1d8 de daño radiante adicional (2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Sudario Crepuscular (Twilight Shroud)',
          desc: 'La penumbra de tu Santuario del Crepúsculo se vuelve tan densa que concede cobertura media (+2 a la CA y a salvaciones de Destreza) a ti y a todos tus aliados dentro de él.'
        }
      ]
    },
    {
      id: 'dominio-paz',
      name: 'Dominio de la Paz (Peace Domain)',
      description: 'Diplomáticos y pacificadores sagrados como Eldath o Rao, capaces de forjar lazos místicos que unen el destino y la salud de sus camaradas.',
      features: [
        {
          level: 1,
          name: 'Implemento de Paz',
          desc: 'Ganas competencia en la habilidad Persuasión, Perspicacia o Actuación.'
        },
        {
          level: 1,
          name: 'Vínculo Reconfortante (Emboldening Bond)',
          desc: 'Como acción vinculas a un número de aliados a 30 pies igual a tu bonificador de competencia durante 10 minutos. Una vez en cada uno de sus turnos mientras estén a 30 pies el uno del otro, pueden sumar 1d4 a una tirada de ataque, prueba de característica o tirada de salvación.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Bálsamo de Paz (Balm of Peace)',
          desc: 'Como acción te mueves hasta tu velocidad sin provocar ataques de oportunidad. Cada criatura a la que te acerques a 5 pies recupera 2d6 + tu modificador de Sabiduría en puntos de golpe.'
        },
        {
          level: 6,
          name: 'Vínculo Protector (Protective Bond)',
          desc: 'Cuando una criatura afectada por tu Vínculo Reconfortante esté a punto de recibir daño, otra criatura vinculada a 30 pies puede usar su reacción para teletransportarse a un espacio adyacente y absorber todo el daño en su lugar.'
        },
        {
          level: 8,
          name: 'Potenciar Conjuros (Potent Spellcasting)',
          desc: 'Añades tu modificador de Sabiduría al daño que infliges con tus trucos de clérigo.'
        },
        {
          level: 17,
          name: 'Vínculo Expansivo (Expansive Bond)',
          desc: 'El alcance de tu Vínculo Protector aumenta a 60 pies, y cuando una criatura absorbe daño mediante el vínculo, gana resistencia a ese daño específico.'
        }
      ]
    },
    {
      id: 'dominio-arcano',
      name: 'Dominio Arcano (Arcana Domain)',
      description: 'Sacerdotes dedicados a los misterios de la Urdimbre y la magia suprema como Mystra, entrelazando magia divina y arcana.',
      features: [
        {
          level: 1,
          name: 'Iniciado Arcano (Arcane Initiate)',
          desc: 'Ganas competencia en Conocimiento Arcano y aprendes dos trucos de la lista de conjuros del Mago, que cuentan como trucos de clérigo para ti.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Expulsar Seres Extraplanares',
          desc: 'Puedes usar tu Expulsar No Muertos para afectar también a celestiales, elementales, fatas o infernales.'
        },
        {
          level: 6,
          name: 'Sanación de Conjuros (Spell Breaker)',
          desc: 'Al curar a un aliado con un conjuro de nivel 1 o superior, también terminas un conjuro de nivel igual o inferior sobre él como si lanzaras Disipar Magia.'
        },
        {
          level: 8,
          name: 'Potenciar Conjuros (Potent Spellcasting)',
          desc: 'Añades tu modificador de Sabiduría al daño de tus trucos de clérigo.'
        },
        {
          level: 17,
          name: 'Maestría Arcana (Arcane Mastery)',
          desc: 'Eliges cuatro conjuros de la lista de mago (uno de nivel 6, uno de nivel 7, uno de nivel 8 y uno de nivel 9) y los añades como conjuros de dominio de clérigo siempre preparados.'
        }
      ]
    },
    {
      id: 'dominio-muerte',
      name: 'Dominio de la Muerte (Death Domain)',
      description: 'Clérigos oscuros de deidades de la nigromancia y el fin de los días como Myrkul o Velsharoon, maestros en desgarrar la fuerza vital.',
      features: [
        {
          level: 1,
          name: 'Competencias de la Muerte',
          desc: 'Ganas competencia con todas las armas marciales.'
        },
        {
          level: 1,
          name: 'Segador (Reaper)',
          desc: 'Cuando lanzas un truco de Nigromancia que normalmente afecte a un único objetivo (como Toque Helado o Piedad con los Moribundos), puedes elegir dos criaturas adyacentes a menos de 5 pies una de otra.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Toque de la Muerte (Touch of Death)',
          desc: 'Al golpear con un ataque cuerpo a cuerpo infliges 5 + (2 × tu nivel de clérigo) de daño necrótico adicional.'
        },
        {
          level: 6,
          name: 'Destrucción Inevitable (Inescapable Destruction)',
          desc: 'Tu daño necrótico de conjuros y Canalizar Divinidad ignora la resistencia al daño necrótico de los enemigos.'
        },
        {
          level: 8,
          name: 'Golpe Divino: Necrótico (Divine Strike)',
          desc: 'Una vez por turno al golpear con un arma infliges 1d8 de daño necrótico adicional (2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Segador Mejorado (Improved Reaper)',
          desc: 'Cuando lanzas un conjuro de Nigromancia de nivel 1 a 5 que apunte a una sola criatura, puedes hacer que afecte a una segunda criatura a 5 pies sin gastar ranuras adicionales.'
        }
      ]
    },
    {
      id: 'dominio-orden',
      name: 'Dominio del Orden (Order Domain)',
      description: 'Magistrados y tiranos de la ley cósmica como Tyr o Bane, cuya voz comanda ataques aliados inmediatos y somete la anarquía.',
      features: [
        {
          level: 1,
          name: 'Competencias del Orden',
          desc: 'Ganas competencia con armaduras pesadas e Intimidación o Persuasión.'
        },
        {
          level: 1,
          name: 'Voz de la Autoridad (Voice of Authority)',
          desc: 'Al lanzar un conjuro de nivel 1 o superior sobre un aliado, ese aliado puede usar su reacción inmediatamente para realizar un ataque con arma contra una criatura a su elección.'
        },
        {
          level: 2,
          name: 'Canalizar Divinidad: Demanda del Orden (Order\'s Demand)',
          desc: 'Como acción obligas a todas las criaturas a 30 pies a superar una salvación de Sabiduría o soltar lo que sostienen y quedar encantadas hasta tu siguiente turno.'
        },
        {
          level: 6,
          name: 'Encantamiento Corpóreo (Embodiment of the Law)',
          desc: 'Si lanzas un conjuro de la escuela de Encantamiento de nivel 1 o superior que requiera una acción, puedes lanzarlo como acción adicional (Sab mod veces/descanso largo).'
        },
        {
          level: 8,
          name: 'Golpe Divino: Psíquico (Divine Strike)',
          desc: 'Una vez por turno al golpear con un arma infliges 1d8 de daño psíquico adicional (2d8 a nivel 14).'
        },
        {
          level: 17,
          name: 'Ira del Orden (Order\'s Wrath)',
          desc: 'Cuando inflijas daño con tu Golpe Divino a una criatura, queda maldita hasta tu siguiente turno; la primera vez que un aliado la golpee, sufre 2d8 de daño psíquico adicional.'
        }
      ]
    }
  ],

  druida: [
    {
      id: 'circulo-esporas',
      name: 'Círculo de las Esporas (Circle of Spores)',
      description: 'Druidas que hallan belleza en la putrefacción y los hongos, tejiendo la muerte y el renacimiento en una armadura fúngica letal.',
      features: [
        {
          level: 2,
          name: 'Halo de Esporas (Halo of Spores)',
          desc: 'Rodeado de esporas fúngicas invisibles: cuando una criatura comience su turno o se mueva a 10 pies de ti, puedes usar tu reacción para infligirle 1d4 de daño necrótico si falla salvación de Constitución (1d6 a lvl 6, 1d8 a lvl 10, 1d10 a lvl 14).'
        },
        {
          level: 2,
          name: 'Entidad Simbiótica (Symbiotic Entity)',
          desc: 'Como acción consumes un uso de Forma Salvaje para despertar a tus esporas: ganas 4 puntos de golpe temporales por cada nivel de druida, el daño de tu Halo de Esporas se duplica, y tus ataques con arma cuerpo a cuerpo infligen 1d6 de daño necrótico adicional.'
        },
        {
          level: 6,
          name: 'Infestación Fúngica (Fungal Infestation)',
          desc: 'Cuando una bestia o humanoide Pequeño o Mediano muera a 20 pies de ti, puedes usar tu reacción para animarlo como un Zombi bajo tu control que actúa en tu iniciativa.'
        },
        {
          level: 10,
          name: 'Esporas Difundidas (Spreading Spores)',
          desc: 'Como acción adicional mientras tu Entidad Simbiótica esté activa, arrojas un cubo de 10 pies de esporas a 30 pies de ti que dura 1 minuto e inflige tu daño de halo a quien empiece su turno allí.'
        },
        {
          level: 14,
          name: 'Cuerpo Fúngico (Fungal Body)',
          desc: 'Las esporas alteran tu fisiología biológica: eres inmune a ser cegado, ensordecido, asustado y envenenado, y cualquier impacto crítico contra ti se convierte en impacto normal a menos que estés incapacitado.'
        }
      ]
    },
    {
      id: 'circulo-estrellas',
      name: 'Círculo de las Estrellas (Circle of Stars)',
      description: 'Astrónomos y navegantes que leen el telón de las constelaciones para canalizar la luz celestial y alterar la suerte cósmica.',
      features: [
        {
          level: 2,
          name: 'Mapa Estelar (Star Map)',
          desc: 'Creas una carta celeste minuciosa: conoces el truco Guía y puedes lanzar Rayo Guía sin gastar ranuras de conjuro un número de veces igual a tu bonificador de competencia.'
        },
        {
          level: 2,
          name: 'Forma Estelar (Starry Form)',
          desc: 'Como acción adicional gastas un uso de Forma Salvaje para volverte una silueta de constelaciones titilantes durante 10 minutos. Eliges una constelación: Arquero (acción adicional para disparar flecha de luz a 60 pies por 1d8+Sab radiante), Cáliz (al lanzar un conjuro de curación, curas a otra criatura a 30 pies por 1d8+Sab adicional), o Dragón (cualquier tirada de d20 para concentración de conjuros o pruebas de Int/Sab de 9 o menor cuenta como 10).'
        },
        {
          level: 6,
          name: 'Presagio Cósmico (Cosmic Omen)',
          desc: 'Tras cada descanso largo tiras un dado para consultar el cielo: Fortuna (reacción para sumar 1d6 a un ataque, salvación o prueba de un aliado) o Desdicha (reacción para restar 1d6 a la tirada de un enemigo).'
        },
        {
          level: 10,
          name: 'Constelaciones Entrelazadas (Twinkling Constellations)',
          desc: 'El dado del Arquero y el Cáliz aumenta a 2d8. Además, al inicio de cada uno de tus turnos en Forma Estelar puedes cambiar qué constelación tienes activa.'
        },
        {
          level: 14,
          name: 'Plenitud Estelar (Full of Stars)',
          desc: 'En tu Forma Estelar te vuelves parcialmente incorpóreo: ganas resistencia al daño contundente, perforante y cortante.'
        }
      ]
    },
    {
      id: 'circulo-pastor',
      name: 'Círculo del Pastor (Circle of the Shepherd)',
      description: 'Protectores de las criaturas salvajes y guardianes de las bestias, que invocan espíritus tótems para resguardar a su manada.',
      features: [
        {
          level: 2,
          name: 'Discurso de los Bosques (Speech of the Woods)',
          desc: 'Aprendes silvano y puedes comunicarte y entender a cualquier bestia de forma natural sin necesidad de conjuros.'
        },
        {
          level: 2,
          name: 'Tótem Espiritual (Spirit Totem)',
          desc: 'Como acción adicional invocas un espíritu incorpóreo a 60 pies con aura de 30 pies durante 1 minuto: Oso (otorga 5 + nivel de druida en PG temporales a todos los aliados en el aura), Halcón (reacción para dar ventaja en un ataque aliado), o Unicornio (cuando lanzas un conjuro de curación, todos los aliados en el aura recuperan puntos de golpe iguales a tu nivel de druida).'
        },
        {
          level: 6,
          name: 'Invocador Poderoso (Mighty Summoner)',
          desc: 'Cualquier bestia o fata que conjures aparece con 2 PG adicionales por cada Dado de Golpe que posea, y sus ataques con armas naturales cuentan como mágicos.'
        },
        {
          level: 10,
          name: 'Espíritu Guardián (Guardian Spirit)',
          desc: 'Cuando una bestia o fata invocada por ti termine su turno dentro de tu Tótem Espiritual, recupera puntos de golpe iguales a la mitad de tu nivel de druida.'
        },
        {
          level: 14,
          name: 'Fieles Fieles (Faithful Summons)',
          desc: 'Si caes a 0 puntos de golpe o quedas incapacitado contra tu voluntad, se lanzan automáticamente Conjurar Animales como si usaras una ranura de nivel 9, apareciendo cuatro bestias protectoras para defenderte durante 1 hora.'
        }
      ]
    },
    {
      id: 'circulo-suenos',
      name: 'Círculo de los Sueños (Circle of Dreams)',
      description: 'Vinculados a los enclaves idílicos del Feywild, curan heridas mediante rocío onírico y abren portales a través de sueños diáfanos.',
      features: [
        {
          level: 2,
          name: 'Bálsamo del Bosque de Verano (Balm of the Summer Court)',
          desc: 'Posees una reserva de dados d6 igual a tu nivel de druida. Como acción adicional puedes gastar hasta la mitad de tus dados para curar a una criatura a 120 pies, otorgándole 1 PG temporal por cada dado gastado.'
        },
        {
          level: 6,
          name: 'Hogar de Luz de Luna y Sombras (Hearth of Moonlight and Shadow)',
          desc: 'Durante un descanso corto o largo generas una esfera mágica de 30 pies que oculta la luz de fogatas y concede un bonificador de +5 a pruebas de Sigilo y Percepción a todos los ocupantes.'
        },
        {
          level: 10,
          name: 'Senderos Ocultos (Hidden Paths)',
          desc: 'Como acción adicional te teletransportas hasta 60 pies a un espacio libre que puedas ver, o tocas a un aliado dispuesto para teletransportarlo hasta 30 pies (Sab mod veces/descanso largo).'
        },
        {
          level: 14,
          name: 'Paso Onírico (Walker in Dreams)',
          desc: 'Al terminar un descanso corto puedes lanzar Sueño, Proyección Astral o Círculo de Teletransporte conectando con enclaves fey salvajes.'
        }
      ]
    },
    {
      id: 'circulo-fuego-salvaje',
      name: 'Círculo del Fuego Salvaje (Circle of Wildfire)',
      description: 'Comprenden que la destrucción ardiente es el primer paso necesario para el renacimiento exuberante de la naturaleza.',
      features: [
        {
          level: 2,
          name: 'Invocar Espíritu de Fuego Salvaje (Summon Wildfire Spirit)',
          desc: 'Como acción gastas un uso de Forma Salvaje para manifestar un Espíritu de Fuego Salvaje a 30 pies: al surgir inflige 2d6 de daño de fuego a enemigos adyacentes. El espíritu puede volar, dispara proyectiles ígneos y puede teletransportarse a sí mismo y a tus aliados a 15 pies como acción adicional.'
        },
        {
          level: 6,
          name: 'Vínculo Mejorado (Enhanced Bond)',
          desc: 'Mientras tu espíritu esté invocado, cualquier conjuro que lances que inflija daño de fuego o cure puntos de golpe suma 1d8 adicional a una de sus tiradas.'
        },
        {
          level: 10,
          name: 'Fuego Cauterizador (Cauterizing Flames)',
          desc: 'Cuando una criatura Pequeña o mayor muera a 30 pies de ti o de tu espíritu, deja una llama espectral durante 1 minuto. Puedes usar tu reacción para apagar la llama y curar a una criatura o infligir daño de fuego a un enemigo por 2d10 + Sab.'
        },
        {
          level: 14,
          name: 'Renacimiento Ígneo (Blazing Revival)',
          desc: 'Si caes a 0 puntos de golpe mientras tu espíritu esté a 120 pies de ti, puedes reducir a tu espíritu a 0 PG para levantarte inmediatamente con la mitad de tus puntos de golpe máximos.'
        }
      ]
    }
  ],

  guerrero: [
    {
      id: 'caballero-eco',
      name: 'Caballero del Eco (Echo Knight)',
      description: 'Guerreros que dominan la dunamancia para desgarrar las líneas temporales y manifestar ecos traslúcidos de sí mismos en combate.',
      features: [
        {
          level: 3,
          name: 'Manifestar Eco (Manifest Echo)',
          desc: 'Como acción adicional manifiestas un eco traslúcido a 15 pies (CA 14 + prof, 1 PG). Puedes teletransportarte intercambiando posiciones con él por 15 pies de movimiento, realizar tus ataques de arma a través de la posición del eco, y efectuar ataques de oportunidad a través de él.'
        },
        {
          level: 3,
          name: 'Encarnación Desatada (Unleash Incarnation)',
          desc: 'Cada vez que realizas la acción de Atacar, puedes hacer un ataque cuerpo a cuerpo adicional con arma a través de tu eco (Con mod veces/descanso largo).'
        },
        {
          level: 7,
          name: 'Eco Explorador (Echo Avatar)',
          desc: 'Puedes proyectar tus sentidos a través de tu eco, controlándolo hasta una distancia de 1.000 pies de ti durante hasta 10 minutos.'
        },
        {
          level: 10,
          name: 'Eco Sombrío (Shadow Martyr)',
          desc: 'Como reacción cuando una criatura a la que puedas ver a 5 pies de tu eco es atacada, puedes hacer que tu eco intercepte el proyectil o golpe, convirtiéndose en el objetivo del ataque.'
        },
        {
          level: 15,
          name: 'Potencial Reclamado (Reclaim Potential)',
          desc: 'Cuando tu eco es destruido por daño, ganas 2d6 + tu modificador de Constitución en puntos de golpe temporales.'
        },
        {
          level: 18,
          name: 'Legión de Ecos (Legion of One)',
          desc: 'Puedes manifestar dos ecos simultáneamente con tu rasgo Manifestar Eco. Además, si inicias un combate sin usos de Encarnación Desatada, recuperas un uso al instante.'
        }
      ]
    },
    {
      id: 'caballero-runico',
      name: 'Caballero Rúnico (Rune Knight)',
      description: 'Hábiles artesanos que aprendieron el lenguaje secreto de las runas de los gigantes, grabando magia ancestral en sus armaduras y creciendo a estaturas colosales.',
      features: [
        {
          level: 3,
          name: 'Grabador de Runas (Rune Carver)',
          desc: 'Puedes grabar runas de gigante en tus armas y armaduras: Runa de Nube (reacción para redirigir un ataque enemigo a otro objetivo), Runa de Fuego (ataques apresan al enemigo con cadenas ardientes de 2d6 fuego), Runa de Frío (+2 a pruebas de característica de Fuerza/Con), Runa de Piedra (visión en la oscuridad y sumir en estupor a un enemigo), etc.'
        },
        {
          level: 3,
          name: 'Poderío de los Gigantes (Giant\'s Might)',
          desc: 'Como acción adicional creces a tamaño Grande durante 1 minuto: ganas ventaja en pruebas de Fuerza y salvaciones de Fuerza, y una vez en cada uno de tus turnos uno de tus ataques inflige 1d6 de daño adicional (aumenta a 1d8 a lvl 10).'
        },
        {
          level: 7,
          name: 'Escudo Rúnico (Runic Shield)',
          desc: 'Como reacción cuando otra criatura a 60 pies sufra un impacto con tirada de ataque, puedes forzar al atacante a volver a tirar el d20 y usar el nuevo resultado (prof veces/descanso largo).'
        },
        {
          level: 10,
          name: 'Estatura Prodigiosa (Great Stature)',
          desc: 'Tu altura aumenta permanentemente en 3d4 pulgadas. El daño extra de tu Poderío de los Gigantes aumenta a 1d8.'
        },
        {
          level: 15,
          name: 'Maestro de las Runas (Master of Runes)',
          desc: 'Puedes invocar el poder activo de cada una de tus runas dos veces por cada descanso corto o largo en lugar de una.'
        },
        {
          level: 18,
          name: 'Coloso Rúnico (Runic Juggernaut)',
          desc: 'Con tu Poderío de los Gigantes puedes crecer hasta tamaño Enorme, tu alcance aumenta en 5 pies, y el daño adicional por turno aumenta a 1d10.'
        }
      ]
    },
    {
      id: 'guerrero-psionico',
      name: 'Guerrero Psiónico (Psi Warrior)',
      description: 'Guerreros que despiertan el poder psiónico latente de sus mentes para mover objetos, proteger aliados y propinar golpes de telequinesis.',
      features: [
        {
          level: 3,
          name: 'Poderío Psiónico (Psionic Power)',
          desc: 'Obtienes dados de energía psiónica (d6 a d12). Puedes gastar dados para: Campo Protector (reacción para reducir daño sufrido por ti o un aliado a 30 pies en 1 dado + Int), Golpe Psiónico (una vez por turno tras impactar con arma sumas 1 dado + Int de daño de fuerza), o Movimiento Telequinético (mover objetos o criaturas aliadas hasta 30 pies como acción).'
        },
        {
          level: 7,
          name: 'Salto Telequinético (Telekinetic Leap)',
          desc: 'Como acción adicional te impulsas psiónicamente para ganar una velocidad de vuelo igual al doble de tu velocidad terrestre hasta el final del turno actual.'
        },
        {
          level: 10,
          name: 'Baluarte Telequinético (Guarded Mind)',
          desc: 'Ganas resistencia al daño psíquico. Si comienzas tu turno encantado o asustado, puedes gastar 1 dado de energía psiónica para disipar el efecto de inmediato.'
        },
        {
          level: 15,
          name: 'Baluarte de Fuerza (Bulwark of Force)',
          desc: 'Como acción adicional puedes resguardar con telequinesis a un número de aliados a 30 pies igual a tu modificador de Inteligencia, concediéndoles cobertura media (+2 CA y salvaciones) durante 1 minuto.'
        },
        {
          level: 18,
          name: 'Maestría Telequinética (Telekinetic Master)',
          desc: 'Puedes lanzar el conjuro Telequinesis sin componentes mágicos ni gastar ranura de conjuro, y mientras mantienes la concentración puedes realizar un ataque de arma como acción adicional.'
        }
      ]
    },
    {
      id: 'samurai',
      name: 'Samurái (Samurai)',
      description: 'Luchadores de disciplina marcial inquebrantable, cortesía refinada y una fuerza de voluntad que desafía a la mismísima muerte.',
      features: [
        {
          level: 3,
          name: 'Espíritu de Lucha (Fighting Spirit)',
          desc: 'Como acción adicional obtienes ventaja en todas tus tiradas de ataque con armas hasta el final del turno actual, y ganas 5 puntos de golpe temporales (aumenta a 10 a lvl 10 y 15 a lvl 15) (3/descanso largo).'
        },
        {
          level: 3,
          name: 'Cortesano Elegante (Elegant Courtier)',
          desc: 'Ganas competencia en Historia, Perspicacia, Actuación o Persuasión, y añades tu modificador de Sabiduría a cualquier prueba de Carisma (Persuasión). A nivel 7 ganas competencia en salvaciones de Sabiduría.'
        },
        {
          level: 10,
          name: 'Espíritu Tenaz (Tireless Spirit)',
          desc: 'Si tiras Iniciativa y no te queda ningún uso de Espíritu de Lucha, recuperas un uso de inmediato.'
        },
        {
          level: 15,
          name: 'Fuerza Rápida (Rapid Strike)',
          desc: 'Si tienes ventaja en una tirada de ataque con arma en tu turno, puedes renunciar a la ventaja para realizar un ataque adicional con arma contra el mismo u otro objetivo.'
        },
        {
          level: 18,
          name: 'Fuerza más allá de la Muerte (Strength Before Death)',
          desc: 'Si sufres daño que te reduciría a 0 puntos de golpe y no te mata directamente, puedes usar tu reacción para interrumpir el turno actual y tomar un turno completo de inmediato antes de caer inconsciente.'
        }
      ]
    },
    {
      id: 'arquero-arcano',
      name: 'Arquero Arcano (Arcane Archer)',
      description: 'Maestros del tiro con arco élfico que entretejen magia en cada flecha arrojada para desterrar, enredar o perforar murallas.',
      features: [
        {
          level: 3,
          name: 'Conocimiento de Arquero Arcano',
          desc: 'Aprendes el truco Prestidigitación o Druidismo, y ganas competencia en Conocimiento Arcano o Naturaleza.'
        },
        {
          level: 3,
          name: 'Disparo Arcano (Arcane Shot)',
          desc: 'Una vez por turno al disparar una flecha con arco corto o arco largo puedes desatar una flecha mágica especial (2 usos/descanso corto o largo): Flecha de Destierro (destierra al objetivo a otro plano si falla Car), Flecha Enredadera (enreda con espinas que hacen 2d6 daño si se mueve), Flecha Explosiva (explosión de 2d6 daño de fuerza en área), Flecha Perforante (atraviesa una línea de 30 pies ignorando cobertura), o Flecha Debilitadora (reduce el daño a la mitad).'
        },
        {
          level: 7,
          name: 'Flecha Mágica y Disparo Curvo (Curving Shot)',
          desc: 'Tus flechas no mágicas disparadas con arco cuentan como mágicas. Además, cuando fallas un disparo con flecha, puedes usar tu acción adicional para redirigir la flecha contra otro objetivo a 60 pies.'
        },
        {
          level: 15,
          name: 'Disparo Siempre Listo (Ever-Ready Shot)',
          desc: 'Si tiras Iniciativa y no te quedan usos de Disparo Arcano, recuperas un uso de inmediato.'
        },
        {
          level: 18,
          name: 'Disparos Arcanos Mejorados',
          desc: 'Todos tus Disparos Arcanos aumentan sus dados de daño adicional a 4d6.'
        }
      ]
    },
    {
      id: 'caballero-cavalier',
      name: 'Caballero Jinete (Cavalier)',
      description: 'Expertos en combate montado y baluartes defensivos infalibles que marcan y bloquean a los enemigos para proteger a sus camaradas.',
      features: [
        {
          level: 3,
          name: 'Nacido para la Silla (Born to the Saddle)',
          desc: 'Montar o desmontar solo te cuesta 5 pies de movimiento en lugar de la mitad, tienes ventaja en salvaciones para no caer de tu montura y caes siempre de pie si eres derribado.'
        },
        {
          level: 3,
          name: 'Marca Implacable (Unwavering Mark)',
          desc: 'Al golpear a un enemigo cuerpo a cuerpo lo marcas hasta tu siguiente turno: mientras esté a 5 pies de ti tiene desventaja en ataques contra cualquiera que no seas tú. Si daña a otro, en tu turno siguiente puedes hacer un ataque cuerpo a cuerpo adicional con ventaja contra él que añade la mitad de tu nivel al daño.'
        },
        {
          level: 7,
          name: 'Maniobra Defensiva (Warding Maneuver)',
          desc: 'Como reacción cuando tú o una criatura a 5 pies sea impactada, añades 1d8 a la CA del objetivo; si el ataque impacta aun así, el objetivo gana resistencia al daño de ese ataque.'
        },
        {
          level: 10,
          name: 'Sujetar la Línea (Hold the Line)',
          desc: 'Las criaturas provocan ataques de oportunidad de tu parte cuando se mueven a 5 pies o más dentro de tu alcance. Si impactas con un ataque de oportunidad, la velocidad del enemigo se reduce a 0 durante el resto del turno.'
        },
        {
          level: 15,
          name: 'Carga Feroz (Ferocious Charger)',
          desc: 'Si te mueves al menos 10 pies en línea recta antes de golpear a una criatura, debe superar una salvación de Fuerza (CD 8 + prof + Fue) o caer derribada.'
        },
        {
          level: 18,
          name: 'Vigilante Implacable (Vigilant Defender)',
          desc: 'En combate ganas una reacción especial en el turno de cada criatura que solo puedes usar para realizar un ataque de oportunidad.'
        }
      ]
    },
    {
      id: 'purple-dragon-knight',
      name: 'Caballero del Dragón Púrpura / Banneret (Purple Dragon Knight)',
      description: 'Líderes inspiradores y campeones de la caballería de Cormyr que guían a sus aliados con valor inquebrantable, táctica y devoción al honor.',
      features: [
        {
          level: 3,
          name: 'Grito de Reagrupamiento (Rallying Cry)',
          desc: 'Cuando utilizas tu rasgo de Segundo Aire, puedes elegir hasta tres criaturas aliadas a menos de 60 pies de ti que puedan verte u oírte. Cada una de ellas recupera un número de puntos de golpe igual a tu nivel de guerrero, siempre que no estén incapacitadas.'
        },
        {
          level: 7,
          name: 'Enviado Real (Royal Envoy)',
          desc: 'Ganas competencia en la habilidad de Persuasión. Si ya tenías competencia en ella, puedes elegir Trato con Animales, Perspicacia, Intimidación o Historia. Además, tu bonificador de competencia se duplica para cualquier prueba de característica que hagas usando Persuasión.'
        },
        {
          level: 10,
          name: 'Acometida Inspiradora (Inspiring Surge)',
          desc: 'Cuando utilizas tu Oleada de Acción (Action Surge) en tu turno, puedes elegir a un aliado a menos de 60 pies de ti que pueda verte u oírte. Ese aliado puede usar inmediatamente su reacción para realizar un ataque de arma cuerpo a cuerpo o a distancia.'
        },
        {
          level: 15,
          name: 'Baluarte (Bulwark)',
          desc: 'Cuando utilizas tu rasgo Indomable para relanzar una tirada de salvación de Inteligencia, Sabiduría o Carisma que fallaste, puedes elegir a un aliado a menos de 60 pies de ti que haya fallado su salvación contra el mismo efecto. Si no está incapacitado, puede relanzar su tirada de salvación con ventaja.'
        }
      ]
    }
  ],

  monje: [
    {
      id: 'cuatro-elementos',
      name: 'Senda de los Cuatro Elementos (Way of the Four Elements)',
      description: 'Monjes que doblegan los cuatro elementos primordiales: aire cortante, tierra inamovible, fuego devorador y agua fluida usando su Ki.',
      features: [
        {
          level: 3,
          name: 'Discípulo de los Elementos (Disciple of the Elements)',
          desc: 'Aprendes la disciplina Sintonía Elemental y otras disciplinas elementales gastando Puntos de Ki: Colmillos de la Serpiente de Fuego (ataques desarmados a 10 pies con daño de fuego extra), Látigo de Agua (tirar y derribar al enemigo), Puño de Cuatro Truenos (lanzar Onda Atronadora), Barrido de Cenizas (Manos Ardientes), etc.'
        },
        {
          level: 6,
          name: 'Disciplinas Elementales de Nivel 6',
          desc: 'Puedes aprender disciplinas avanzadas como Aliento del Dragón (cono de fuego), Puño de Aire Inquebrantable, o Postura de Niebla (Forma Gaseosa).'
        },
        {
          level: 11,
          name: 'Disciplinas Elementales de Nivel 11',
          desc: 'Acceso a magias mayores: Cabalgar el Viento (Volar), Llamas del Fénix (Bola de Fuego), o Coraza de Piedra (Piel Pétrea).'
        },
        {
          level: 17,
          name: 'Disciplinas Elementales de Nivel 17',
          desc: 'Poder de cataclismo elemental: Ola del Río (Cono de Frío) y Forma de las Mil Tormentas.'
        }
      ]
    },
    {
      id: 'maestro-borracho',
      name: 'Senda del Maestro Borracho (Way of the Drunken Master)',
      description: 'Imitan los tambaleos y quiebros impredecibles de un ebrio para esquivar ataques mortales y golpear desde ángulos imposibles.',
      features: [
        {
          level: 3,
          name: 'Técnica del Borracho (Drunken Technique)',
          desc: 'Ganas competencia en Actuación e Instrumentos de Cervecero. Además, cada vez que uses Ráfaga de Golpes ganas los beneficios de la acción de Retirada y tu velocidad terrestre aumenta en 10 pies hasta el final de tu turno.'
        },
        {
          level: 6,
          name: 'Balanceo Tambaleante (Tipsy Sway)',
          desc: 'Levantarte de estar derribado solo te cuesta 5 pies de movimiento en lugar de la mitad. Además, cuando una criatura falle un ataque de arma cuerpo a cuerpo contra ti, puedes gastar 1 punto de Ki y tu reacción para hacer que ese ataque golpee a otra criatura a 5 pies de ti.'
        },
        {
          level: 11,
          name: 'Suerte del Borracho (Drunkard\'s Luck)',
          desc: 'Cuando hagas una tirada de salvación o prueba de característica con desventaja, puedes gastar 2 puntos de Ki para cancelar la desventaja en esa tirada.'
        },
        {
          level: 17,
          name: 'Frenesí Ebrio (Intoxicated Frenzy)',
          desc: 'Cuando uses tu Ráfaga de Golpes, puedes realizar hasta tres ataques desarmados adicionales (un total de 5 ataques adicionales) siempre que cada ataque impacte a un objetivo diferente.'
        }
      ]
    },
    {
      id: 'kensei',
      name: 'Senda del Kensei (Way of the Kensei)',
      description: 'Maestros absolutos de la espada y el arco que consideran sus armas como extensiones espirituales de su propio cuerpo y Ki.',
      features: [
        {
          level: 3,
          name: 'Armas de Kensei (Kensei Weapons)',
          desc: 'Eliges dos armas (una cuerpo a cuerpo y una a distancia sin las propiedades pesada ni especial) que se convierten en armas de monje para ti. Bloqueo Ágil (+2 CA si atacas desarmado sosteniendo tu arma kensei cuerpo a cuerpo) y Tiro Kensei (+1d4 de daño adicional con acción adicional en ataques a distancia).'
        },
        {
          level: 6,
          name: 'Uno con la Espada (One with the Blade)',
          desc: 'Tus armas kensei cuentan como mágicas para superar resistencias. Además, una vez por turno al impactar con un arma kensei puedes gastar 1 Ki para infligir daño adicional igual a tu dado de artes marciales.'
        },
        {
          level: 11,
          name: 'Afilar la Hoja (Sharpen the Blade)',
          desc: 'Como acción adicional gastas hasta 3 puntos de Ki para otorgar a un arma kensei no mágica un bonificador de hasta +3 a tiradas de ataque y daño durante 1 minuto.'
        },
        {
          level: 17,
          name: 'Precisión Infalible (Unerring Accuracy)',
          desc: 'Una vez en cada uno de tus turnos si fallas una tirada de ataque con un arma de monje o arma kensei, puedes volver a tirar la tirada de ataque.'
        }
      ]
    },
    {
      id: 'misericordia',
      name: 'Senda de la Misericordia (Way of Mercy)',
      description: 'Médicos encapuchados que manipulan la energía vital de otros: traen sanación milagrosa a los inocentes o muerte piadosa e indolora a los caídos.',
      features: [
        {
          level: 3,
          name: 'Implementos de la Piedad',
          desc: 'Ganas competencia en Perspicacia, Medicina y el kit de herboristería, y adquieres una máscara tradicional que oculta tu rostro.'
        },
        {
          level: 3,
          name: 'Manos de Sanación (Hands of Healing)',
          desc: 'Como acción puedes gastar 1 punto de Ki para tocar a una criatura y curarle puntos de golpe iguales a 1 dado de artes marciales + tu modificador de Sabiduría. Cuando usas Ráfaga de Golpes, puedes reemplazar uno de los golpes desarmados por este toque sin gastar Ki adicional.'
        },
        {
          level: 3,
          name: 'Manos del Daño (Hands of Harm)',
          desc: 'Cuando golpeas a una criatura con un golpe desarmado, puedes gastar 1 punto de Ki para infligir daño necrótico adicional igual a 1 dado de artes marciales + tu modificador de Sabiduría.'
        },
        {
          level: 6,
          name: 'Toque de Sanador (Physician\'s Touch)',
          desc: 'Tus Manos de Sanación ahora también curan una enfermedad o eliminan la condición Cegado, Ensordecido, Paralizado, Envenenado o Aturdido. Además, tus Manos del Daño envenenan al objetivo hasta el final de tu siguiente turno.'
        },
        {
          level: 11,
          name: 'Ráfaga de Curación (Flurry of Healing and Harm)',
          desc: 'Puedes reemplazar ambos ataques de tu Ráfaga de Golpes con Manos de Sanación sin coste de Ki extra. Y tus Manos del Daño no requieren gastar Ki si las usas durante Ráfaga de Golpes.'
        },
        {
          level: 17,
          name: 'Mano de la Gracia Final (Hand of Ultimate Mercy)',
          desc: 'Como acción tocas a una criatura que haya muerto en las últimas 24 horas y gastas 5 puntos de Ki para devolverla a la vida con puntos de golpe iguales a 4d10 + tu modificador de Sabiduría.'
        }
      ]
    },
    {
      id: 'yo-astral',
      name: 'Senda del Yo Astral (Way of the Astral Self)',
      description: 'Monjes que proyectan la forma auténtica de su espíritu, manifestando brazos espectrales, máscaras y armaduras de energía psíquica pura.',
      features: [
        {
          level: 3,
          name: 'Brazos del Yo Astral (Arms of the Astral Self)',
          desc: 'Como acción adicional gastas 1 Ki para manifestar brazos astrales durante 10 minutos: al aparecer infligen daño de fuerza a enemigos a 10 pies. Tienen alcance de 10 pies, puedes usar tu Sabiduría en lugar de Fuerza para pruebas y salvaciones, y tus ataques desarmados usan Sabiduría e infligen daño de fuerza.'
        },
        {
          level: 6,
          name: 'Rostro del Yo Astral (Visage of the Astral Self)',
          desc: 'Como acción adicional gastas 1 Ki para manifestar una máscara espectral: ves normalmente en oscuridad mágica hasta 120 pies, tienes ventaja en pruebas de Perspicacia e Intimidación, y puedes proyectar tu voz a grandes distancias.'
        },
        {
          level: 11,
          name: 'Cuerpo del Yo Astral (Body of the Astral Self)',
          desc: 'Manifiestas una armadura de torso astral: como reacción reduces daño de ácido, frío, fuego, relámpago o fuerza en 1d10 + Sab. Además, una vez por turno tu ataque con brazos astrales inflige daño adicional igual a tu dado de artes marciales.'
        },
        {
          level: 17,
          name: 'Despertar Astral (Awakened Astral Self)',
          desc: 'Gastas 5 Ki para manifestar la armadura astral completa: ganas +2 a la CA y puedes hacer hasta tres ataques con los Brazos del Yo Astral cada vez que uses la acción de Atacar en tu turno.'
        }
      ]
    },
    {
      id: 'alma-solar',
      name: 'Senda del Alma Solar (Way of the Sun Soul)',
      description: 'Canalizan la luz incandescente de su espíritu en ráfagas de energía radiante que deslumbran e incineran a la oscuridad.',
      features: [
        {
          level: 3,
          name: 'Proyectil Radiante del Sol (Radiant Sun Bolt)',
          desc: 'Puedes disparar proyectiles de energía radiante a distancia (alcance 30 pies) como ataques de conjuro usando tu bonificador de ataque de artes marciales y daño radiante igual a tu dado de artes marciales + Des. Tras disparar, puedes gastar 1 Ki para disparar dos proyectiles más con tu acción adicional.'
        },
        {
          level: 6,
          name: 'Golpe de Arco Ardiente (Searing Arc Strike)',
          desc: 'Inmediatamente después de tomar la acción de Atacar en tu turno, puedes gastar 2 puntos de Ki para lanzar Manos Ardientes como acción adicional.'
        },
        {
          level: 11,
          name: 'Estallido Solar Llameante (Searing Sunburst)',
          desc: 'Como acción creas una esfera de luz radiante a 150 pies: cada criatura en un radio de 20 pies sufre 2d6 de daño radiante (puedes gastar hasta 3 Ki para aumentar el daño en 2d6 por punto).'
        },
        {
          level: 17,
          name: 'Escudo del Sol (Sun Shield)',
          desc: 'Emanas luz brillante en 30 pies. Como reacción cuando una criatura a 5 pies te impacte con un ataque cuerpo a cuerpo, le infliges daño radiante igual a 5 + tu modificador de Sabiduría.'
        }
      ]
    },
    {
      id: 'dragon-ascendente',
      name: 'Senda del Dragón Ascendente (Way of the Ascendant Dragon)',
      description: 'Monjes que canalizan la majestuosidad y los elementos primigenios de los dragones cromáticos y metálicos.',
      features: [
        {
          level: 3,
          name: 'Discípulo Dracónico (Draconic Disciple)',
          desc: 'Puedes cambiar el daño de tus golpes desarmados a ácido, frío, fuego, relámpago o veneno. Además, aprendes dracónico y ganas Presencia Dracónica para relanzar una prueba fallada de Intimidación o Persuasión.'
        },
        {
          level: 3,
          name: 'Aliento del Dragón (Breath of the Dragon)',
          desc: 'Cuando tomas la acción de Atacar, puedes reemplazar uno de tus ataques por un cono de 20 pies o línea de 30 pies de energía dracónica que inflige dos dados de daño de artes marciales (prof veces/descanso largo o por 2 Ki).'
        },
        {
          level: 6,
          name: 'Alas Desplegadas (Wings Unfurled)',
          desc: 'Cuando usas Paso del Viento, manifiestas alas dracónicas temporales que te otorgan una velocidad de vuelo igual a tu velocidad terrestre hasta el final de tu turno.'
        },
        {
          level: 11,
          name: 'Aspecto del Dragón (Aspect of the Wyrm)',
          desc: 'Como acción adicional emanas un aura dracónica de 10 pies durante 1 minuto: tú y tus aliados en el aura ganan resistencia al tipo de daño dracónico elegido, y los enemigos que fallen salvación de Sabiduría quedan asustados.'
        },
        {
          level: 17,
          name: 'Poderío del Gran Dragón (Ascendant Aspect)',
          desc: 'Ganas visión ciega a 30 pies, tu Aliento del Dragón inflige daño masivo y cuando activas tu Aspecto del Dragón desatas una explosión que inflige 3d10 de daño a enemigos cercanos.'
        }
      ]
    },
    {
      id: 'long-death',
      name: 'Camino de la Muerte Larga (Way of the Long Death)',
      description: 'Monjes obsesionados con el significado y la mecánica del fin vital que manipulan la energía de la muerte para absorber vitalidad y esquivar la tumba.',
      features: [
        {
          level: 3,
          name: 'Toque de la Muerte (Touch of Death)',
          desc: 'Tu estudio de la mortalidad te permite extraer energía vital de quienes caen ante ti. Cuando reduces a una criatura a 0 puntos de golpe a 5 pies de ti o menos, ganas puntos de golpe temporales iguales a tu modificador de Sabiduría + tu nivel de monje (mínimo 1).'
        },
        {
          level: 6,
          name: 'Hora de la Cosecha (Hour of Reaping)',
          desc: 'Como acción en tu turno, muestras un atisbo de la muerte a quienes te rodean. Todas las criaturas a 30 pies de ti que puedan verte deben superar una tirada de salvación de Sabiduría contra tu CD de salvación de Ki o quedarán asustadas de ti hasta el final de tu siguiente turno.'
        },
        {
          level: 11,
          name: 'Maestría de la Muerte (Mastery of Death)',
          desc: 'Usas tu familiaridad con la parca para escapar de su abrazo. Cuando quedas reducido a 0 puntos de golpe, puedes gastar 1 punto de Ki (sin usar ninguna acción) para quedar a 1 punto de golpe en su lugar.'
        },
        {
          level: 17,
          name: 'Toque de la Muerte Larga (Touch of the Long Death)',
          desc: 'Puedes canalizar la energía letal destructiva directamente en el corazón de otra criatura. Como acción tocas a una criatura a 5 pies y gastas de 1 a 10 puntos de Ki. El objetivo debe hacer una tirada de salvación de Constitución: si falla, recibe 2d10 de daño necrótico por cada punto de Ki gastado; si tiene éxito, recibe la mitad del daño.'
        }
      ]
    }
  ],

  paladin: [
    {
      id: 'juramento-antiguos',
      name: 'Juramento de los Antiguos (Oath of the Ancients)',
      description: 'Caballeros verdes y campeones de la luz natural que juran preservar la alegría, la belleza y la vida contra el avance de las sombras.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Ira de la Naturaleza',
          desc: 'Como acción invocas enredaderas espectrales que brotan del suelo para apresar a un enemigo a 10 pies si falla una salvación de Fuerza o Destreza.'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Rechazar a los Infieles',
          desc: 'Como acción alzas tu símbolo sagrado: cada fata o infernal a 30 pies que te escuche debe superar una salvación de Sabiduría o quedará expulsado durante 1 minuto.'
        },
        {
          level: 7,
          name: 'Aura de Protección contra Conjuros (Aura of Warding)',
          desc: 'Tú y las criaturas aliadas a 10 pies o menos de ti tenéis resistencia al daño infligido por conjuros (el aura aumenta a 30 pies a nivel 18).'
        },
        {
          level: 15,
          name: 'Centinela Inmortal (Undying Sentinel)',
          desc: 'Cuando tus puntos de golpe se reduzcan a 0 y no mueras directamente, puedes elegir quedar a 1 punto de golpe en su lugar (1/descanso largo). Además, no sufres penalizaciones por envejecer y no puedes ser envejecido mágicamente.'
        },
        {
          level: 20,
          name: 'Campeón Anciano (Elder Champion)',
          desc: 'Como acción te transformas en una fuerza encarnada de la naturaleza durante 1 minuto: recuperas 10 puntos de golpe al inicio de cada uno de tus turnos, puedes lanzar conjuros de paladín con tiempo de 1 acción como acción adicional, y los enemigos a 10 pies tienen desventaja en salvaciones contra tus conjuros.'
        }
      ]
    },
    {
      id: 'juramento-conquista',
      name: 'Juramento de Conquista (Oath of Conquest)',
      description: 'Luchadores implacables que sirven a deidades tiránicas o a la ley marcial estricta, aplastando toda disidencia mediante el terror absoluto.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Presencia Conquistadora',
          desc: 'Como acción fuerzas a cada criatura a tu elección a 30 pies a superar una salvación de Sabiduría o quedar asustada de ti durante 1 minuto.'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Golpe Guiado (Guided Strike)',
          desc: 'Cuando realizas una tirada de ataque, puedes usar tu Canalizar Divinidad para ganar un bonificador de +10 a la tirada de ataque.'
        },
        {
          level: 7,
          name: 'Aura de Conquista (Aura of Conquest)',
          desc: 'Emanas un aura opresiva de 10 pies (30 pies a lvl 18). Cualquier criatura asustada de ti que empiece su turno en tu aura ve su velocidad reducida a 0 y sufre daño psíquico igual a la mitad de tu nivel de paladín.'
        },
        {
          level: 15,
          name: 'Reprimenda Despreciativa (Scornful Rebuke)',
          desc: 'Cada vez que una criatura te impacte con un ataque, sufre daño psíquico igual a tu modificador de Carisma siempre que no estés incapacitado.'
        },
        {
          level: 20,
          name: 'Señor de la Guerra Invencible (Invincible Conqueror)',
          desc: 'Como acción ganas una armadura titánica durante 1 minuto: ganas resistencia a todo el daño de armas, puedes realizar un ataque adicional cada vez que tomes la acción de Atacar, y tus ataques con arma consiguen impacto crítico con un resultado de 19 o 20.'
        }
      ]
    },
    {
      id: 'juramento-redencion',
      name: 'Juramento de Redención (Oath of Redemption)',
      description: 'Pacificadores que creen que cualquier alma extraviada puede salvarse mediante la compasión, pero descargan justicia cuando la maldad rehúsa la paz.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Emisario de la Paz',
          desc: 'Como acción adicional otorgas a tus palabras un peso celestial, ganando un bonificador de +5 a tus pruebas de Carisma (Persuasión) durante los próximos 10 minutos.'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Reprimir la Violencia (Rebuke the Violent)',
          desc: 'Como reacción cuando un atacante a 30 pies inflija daño a otra criatura, fuerzas al atacante a superar una salvación de Sabiduría o sufrir la misma cantidad de daño radiante que acaba de infligir.'
        },
        {
          level: 7,
          name: 'Aura del Guardián (Aura of the Guardian)',
          desc: 'Cuando una criatura a 10 pies de ti (30 pies a lvl 18) sufra daño, puedes usar tu reacción para absorber mágicamente todo ese daño tú mismo.'
        },
        {
          level: 15,
          name: 'Espíritu Protector (Protective Spirit)',
          desc: 'Recuperas puntos de golpe iguales a 1d6 + la mitad de tu nivel de paladín al final de cada uno de tus turnos en combate si tienes menos de la mitad de tus PG máximos.'
        },
        {
          level: 20,
          name: 'Emisario de la Redención (Emissary of Redemption)',
          desc: 'Ganas resistencia a todo el daño infligido por otras criaturas y reflejas la mitad del daño a los atacantes como daño radiante mientras no las ataques primero ni les lances conjuros dañinos.'
        }
      ]
    },
    {
      id: 'juramento-gloria',
      name: 'Juramento de la Gloria (Oath of Glory)',
      description: 'Héroes legendarios impulsados por el destino y la épica, que inspiran a sus camaradas a hazañas sobrehumanas.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Atleta Incomparable',
          desc: 'Como acción adicional ganas ventaja en pruebas de Atletismo y Acrobacias, tu distancia de salto se duplica y tu capacidad de carga se duplica durante 10 minutos.'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Golpe Inspirador',
          desc: 'Inmediatamente después de infligir daño con tu Castigo Divino, puedes otorgar puntos de golpe temporales iguales a 2d8 + tu nivel de paladín repartidos entre aliados a 30 pies.'
        },
        {
          level: 7,
          name: 'Aura de Alacridad (Aura of Alacrity)',
          desc: 'Tu velocidad terrestre aumenta en 10 pies. Cualquier aliado que comience su turno a 5 pies de ti (10 pies a lvl 18) gana +10 pies de velocidad durante ese turno.'
        },
        {
          level: 15,
          name: 'Defensa Gloriosa (Glorious Defense)',
          desc: 'Como reacción cuando tú o una criatura a 10 pies sea atacada, añades tu bonificador de Carisma a la CA de ese objetivo; si el ataque falla, puedes hacer un ataque con arma inmediato contra el atacante.'
        },
        {
          level: 20,
          name: 'Héroe Viviente (Living Legend)',
          desc: 'Durante 1 minuto emanas carisma divino: ganas ventaja en todas las pruebas de Carisma, puedes relanzar un ataque fallado cada turno, y las salvaciones falladas se pueden superar usando tu reacción.'
        }
      ]
    },
    {
      id: 'juramento-vigilantes',
      name: 'Juramento de los Vigilantes (Oath of the Watchers)',
      description: 'Centinelas juramentados para proteger el Plano Material contra invasiones extraplanares de aberraciones, demonios, fatas y seres cósmicos.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Voluntad del Vigilante',
          desc: 'Como acción otorgas ventaja en tiradas de salvación de Inteligencia, Sabiduría y Carisma a ti mismo y a un número de aliados a 30 pies igual a tu modificador de Carisma durante 1 minuto.'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Expulsar lo Extranjero',
          desc: 'Como acción fuerzas a cada aberración, celestial, elemental, fata o infernal a 30 pies a superar una salvación de Sabiduría o quedar expulsado durante 1 minuto.'
        },
        {
          level: 7,
          name: 'Aura del Centinela (Aura of the Sentinel)',
          desc: 'Emanas un aura de vigilancia a 10 pies (30 pies a lvl 18). Tú y cualquier aliado en el aura sumáis vuestro bonificador de competencia a las tiradas de Iniciativa.'
        },
        {
          level: 15,
          name: 'Venganza Mental (Vigilant Rebuke)',
          desc: 'Cuando tú o una criatura protegida por tu Voluntad del Vigilante supere una tirada de salvación contra un conjuro, el lanzador sufre 2d8 + tu modificador de Carisma en daño de fuerza.'
        },
        {
          level: 20,
          name: 'Baluarte Mortal (Mortal Bulwark)',
          desc: 'Durante 1 minuto ganas visión verdadera a 120 pies, ventaja en tiradas de ataque contra seres extraplanares y cuando los golpeas con un arma puedes desterrarlos inmediatamente de vuelta a su plano de origen.'
        }
      ]
    },
    {
      id: 'juramento-corona',
      name: 'Juramento de la Corona (Oath of the Crown)',
      description: 'Paladines dedicados a la soberanía, la ley y la lealtad inquebrantable a su reino o monarca por encima de todo código moral personal.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Desafío del Campeón',
          desc: 'Como acción desafías a todas las criaturas a tu elección a 30 pies: si fallan una salvación de Sabiduría, no pueden alejarse voluntariamente a más de 30 pies de ti.'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Marea de Esperanza',
          desc: 'Como acción adicional cada criatura a tu elección a 30 pies que tenga menos de la mitad de sus PG máximos recupera 1d6 + tu modificador de Carisma en puntos de golpe.'
        },
        {
          level: 7,
          name: 'Fidelidad Inquebrantable (Divine Allegiance)',
          desc: 'Como reacción cuando una criatura a 5 pies sufra daño, puedes absorber mágicamente todo ese daño tú mismo en su lugar.'
        },
        {
          level: 15,
          name: 'Espíritu Inquebrantable (Unyielding Saint)',
          desc: 'Tienes ventaja en tiradas de salvación contra efectos que te dejen paralizado o aturdido.'
        },
        {
          level: 20,
          name: 'Campeón Exaltado (Exalted Champion)',
          desc: 'Durante 1 hora ganas resistencia al daño contundente, cortante y perforante no mágico, tus aliados a 30 pies tienen ventaja en salvaciones de muerte y tú ganas ventaja en salvaciones de Sabiduría.'
        }
      ]
    },
    {
      id: 'rompejuramentos',
      name: 'Rompejuramentos (Oathbreaker)',
      description: 'Paladines caídos que han quebrado sus votos sagrados en pos de ambiciones oscuras, sirviendo a poderes siniestros o a la nigromancia pura.',
      features: [
        {
          level: 3,
          name: 'Canalizar Divinidad: Controlar No Muertos',
          desc: 'Como acción intentas someter a un no muerto a 30 pies cuyo VD sea menor que tu nivel de paladín (falla salvación de Sabiduría y obedece tus órdenes durante 24 horas).'
        },
        {
          level: 3,
          name: 'Canalizar Divinidad: Aspecto Pavoroso',
          desc: 'Como acción obligas a cada criatura a 30 pies a superar una salvación de Sabiduría o quedar asustada de ti durante 1 minuto.'
        },
        {
          level: 7,
          name: 'Aura de Odio (Aura of Hate)',
          desc: 'Tú, así como cualquier infernal o no muerto a 10 pies de ti (30 pies a lvl 18), sumáis vuestro modificador de Carisma a todas las tiradas de daño con armas cuerpo a cuerpo.'
        },
        {
          level: 15,
          name: 'Resistencia Sobrenatural (Supernatural Resistance)',
          desc: 'Ganas resistencia permanente al daño contundente, perforante y cortante infligido por armas no mágicas.'
        },
        {
          level: 20,
          name: 'Señor del Terror (Dread Lord)',
          desc: 'Durante 1 minuto emanas un manto de sombras fúnebres de 30 pies: el área es penumbra, los enemigos en el manto sufren 4d10 de daño psíquico al comenzar su turno y puedes atacar a través de las sombras con tu acción adicional.'
        }
      ]
    }
  ],

  picaro: [
    {
      id: 'espadachin',
      name: 'Espadachín (Swashbuckler)',
      description: 'Duelistas ágiles, elegantes y teatrales que sobresalen en el combate cuerpo a cuerpo uno contra uno y en la iniciativa veloz.',
      features: [
        {
          level: 3,
          name: 'Juego de Piernas Elegante (Fancy Footwork)',
          desc: 'Durante tu turno, si realizas un ataque de arma cuerpo a cuerpo contra una criatura, esa criatura no puede realizar ataques de oportunidad contra ti durante el resto de tu turno.'
        },
        {
          level: 3,
          name: 'Audacia Temeraria (Rakish Audacity)',
          desc: 'Añades tu modificador de Carisma a tus tiradas de Iniciativa. Además, ganas una nueva forma de usar tu Ataque Furtivo: puedes usarlo contra un objetivo si estás a 5 pies de él, ninguna otra criatura está a 5 pies de ti, y no tienes desventaja en la tirada.'
        },
        {
          level: 9,
          name: 'Panache',
          desc: 'Como acción haces una prueba de Carisma (Persuasión) enfrentada a la Sabiduría (Perspicacia) de un objetivo: fuera de combate queda encantado por 1 minuto; en combate queda provocado y tiene desventaja en ataques contra otros que no seas tú.'
        },
        {
          level: 13,
          name: 'Maniobra Elegante (Elegant Maneuver)',
          desc: 'Como acción adicional puedes ganar ventaja en la siguiente prueba de Destreza (Acrobacias) o Fuerza (Atletismo) que realices durante el mismo turno.'
        },
        {
          level: 17,
          name: 'Maestro Duelista (Master Duelist)',
          desc: 'Si fallas una tirada de ataque en tu turno, puedes volver a tirar la tirada con ventaja (1/descanso corto o largo).'
        }
      ]
    },
    {
      id: 'inquisitivo',
      name: 'Inquisitivo (Inquisitive)',
      description: 'Detectives y sabuesos expertos en descubrir mentiras, notar detalles imperceptibles y exponer los puntos débiles de sus enemigos.',
      features: [
        {
          level: 3,
          name: 'Oído para el Engaño (Ear for Deceit)',
          desc: 'Cada vez que realices una prueba de Sabiduría (Perspicacia) para determinar si una criatura miente, puedes tratar cualquier resultado de 7 o menor en el d20 como un 8.'
        },
        {
          level: 3,
          name: 'Ojo para el Detalle (Eye for Detail)',
          desc: 'Puedes usar tu acción adicional para hacer una prueba de Sabiduría (Percepción) para detectar una criatura oculta o una prueba de Inteligencia (Investigación) para descubrir pistas.'
        },
        {
          level: 3,
          name: 'Lucha Perspicaz (Insightful Fighting)',
          desc: 'Como acción adicional haces una prueba de Perspicacia enfrentada al Engaño de un enemigo. Si vences, puedes usar tu Ataque Furtivo contra ese objetivo durante 1 minuto incluso si no tienes ventaja en el ataque.'
        },
        {
          level: 9,
          name: 'Ojo Imperturbable (Steady Eye)',
          desc: 'Tienes ventaja en cualquier prueba de Sabiduría (Percepción) o Inteligencia (Investigación) si te mueves a no más de la mitad de tu velocidad durante el mismo turno.'
        },
        {
          level: 13,
          name: 'Ojo Infalible (Unerring Eye)',
          desc: 'Como acción percibes la presencia de ilusiones mágicas o metamorfos a 30 pies (Sab mod veces/descanso largo).'
        },
        {
          level: 17,
          name: 'Debilidades Expuestas (Eye for Weakness)',
          desc: 'Tu daño de Ataque Furtivo aumenta en 3d6 adicionales contra el objetivo señalado por tu Lucha Perspicaz.'
        }
      ]
    },
    {
      id: 'mente-maestra',
      name: 'Mente Maestra (Mastermind)',
      description: 'Estrategas fríos, espías e intrigantes que manipulan el campo de batalla dando órdenes a distancia y descifrando los secretos de sus rivales.',
      features: [
        {
          level: 3,
          name: 'Maestro de la Intriga (Master of Intrigue)',
          desc: 'Ganas competencia con kit de disfraz, kit de falsificación, un juego de azar y dos idiomas adicionales. Puedes imitar el habla y acentos de otras criaturas tras escucharlas durante 1 minuto.'
        },
        {
          level: 3,
          name: 'Maestro de Tácticas (Master of Tactics)',
          desc: 'Puedes usar la acción de Ayudar como acción adicional. Además, cuando usas Ayudar para respaldar el ataque de un aliado, el alcance aumenta de 5 a 30 pies.'
        },
        {
          level: 9,
          name: 'Manipulador Perspicaz (Insightful Manipulator)',
          desc: 'Si observas a una criatura durante al menos 1 minuto fuera de combate, descubres si su puntuación de Inteligencia, Sabiduría o Carisma es superior, igual o inferior a la tuya.'
        },
        {
          level: 13,
          name: 'Redireccionar Ataque (Misdirection)',
          desc: 'Como reacción cuando seas el objetivo de un ataque mientras una criatura a 5 pies de ti te proporcione cobertura, puedes hacer que el ataque se dirija a esa criatura en tu lugar.'
        },
        {
          level: 17,
          name: 'Alma Impenetrable (Soul of Deceit)',
          desc: 'Tus pensamientos no pueden ser leídos por telepatía u otra magia a menos que lo permitas, y los efectos mágicos para determinar si dices la verdad indican siempre que estás diciendo la verdad.'
        }
      ]
    },
    {
      id: 'fantasma',
      name: 'Fantasma (Phantom)',
      description: 'Asesinos vinculados íntimamente a la muerte que recolectan almas de los difuntos para consultar sus recuerdos y desgarrar la carne enemiga.',
      features: [
        {
          level: 3,
          name: 'Susurros de los Muertos (Whispers of the Dead)',
          desc: 'Al terminar un descanso corto o largo adquieres la presencia de un espíritu que te concede competencia en una habilidad o herramienta a tu elección hasta tu siguiente descanso.'
        },
        {
          level: 3,
          name: 'Lamentos de la Tumba (Wails from the Grave)',
          desc: 'Inmediatamente después de infligir daño con tu Ataque Furtivo a una criatura, una segunda criatura a 30 pies sufre daño necrótico igual a la mitad de tus dados de Ataque Furtivo (prof veces/descanso largo).'
        },
        {
          level: 9,
          name: 'Fichas de Alma (Tokens of the Departed)',
          desc: 'Cuando una criatura muere a 30 pies de ti, puedes usar tu reacción para capturar su esencia como una baratija de alma. Mientras lleves una ficha tienes ventaja en salvaciones de muerte y de Constitución, y puedes destruir una ficha para hacer una pregunta al espíritu o activar Lamentos de la Tumba sin gastar usos.'
        },
        {
          level: 13,
          name: 'Forma Fantasmal (Ghost Walk)',
          desc: 'Como acción adicional adquieres una forma espectral durante 10 minutos: ganas velocidad de vuelo de 10 pies, los ataques contra ti tienen desventaja y puedes atravesar paredes y criaturas sólidas.'
        },
        {
          level: 17,
          name: 'Amigo de la Muerte (Death\'s Friend)',
          desc: 'Al usar Lamentos de la Tumba, tanto el primer objetivo como el segundo sufren el daño necrótico completo. Además, si inicias un combate sin fichas de alma, aparece una ficha en tu mano de inmediato.'
        }
      ]
    },
    {
      id: 'cuchillo-del-alma',
      name: 'Cuchillo del Alma (Soulknife)',
      description: 'Asesinos psiónicos que materializan dagas de energía mental luminosa en sus manos para asesinar en silencio absoluto y comunicarse telepáticamente.',
      features: [
        {
          level: 3,
          name: 'Poder Psiónico (Psionic Power)',
          desc: 'Ganas dados de energía psiónica (d6 a d12). Puedes usarlos para: Truco Psiónico (sumar el dado a una prueba de habilidad fallada en la que tengas competencia sin gastar el dado si sigues fallando) o Vínculo Telepático (establecer enlace telepático mental a millas de distancia con hasta tu bonificador de competencia de aliados durante horas).'
        },
        {
          level: 3,
          name: 'Hojas Psíquicas (Psychic Blades)',
          desc: 'Puedes manifestar dagas de energía psiónica reluciente en tus manos vacías: causan 1d6 de daño psíquico (+ mod Des) y tienen alcance arrojadizo 60 pies. Si atacas con una hoja psíquica en tu turno, puedes hacer un segundo ataque con tu acción adicional con otra hoja que inflige 1d4 psíquico.'
        },
        {
          level: 9,
          name: 'Hojas del Alma Mejoradas (Soul Blades)',
          desc: 'Puedes impulsar tus hojas con dados psiónicos: Ataque Guiado (sumar el dado a un ataque de hoja fallado) o Teletransporte Psiónico (lanzar una hoja como acción adicional y teletransportarte a su ubicación).'
        },
        {
          level: 13,
          name: 'Velo Psíquico (Psychic Veil)',
          desc: 'Como acción puedes volverte invisible mágicamente durante 1 hora (o hasta que inflijas daño o fuerces una salvación) (1/descanso largo o gastando un dado psiónico).'
        },
        {
          level: 17,
          name: 'Cuchilla Aturdidora (Rend Mind)',
          desc: 'Cuando inflijas daño con tu Ataque Furtivo usando tus Hojas Psíquicas, fuerzas a la víctima a una salvación de Sabiduría (CD 8 + prof + Des) o quedará aturdida durante 1 minuto.'
        }
      ]
    },
    {
      id: 'explorador-scout',
      name: 'Explorador Silvano (Scout)',
      description: 'Pícaros de la espesura expertos en supervivencia y guerrilla que se retiran ágilmente de los enemigos para acribillarlos a distancia.',
      features: [
        {
          level: 3,
          name: 'Superviviente (Survivalist)',
          desc: 'Ganas competencia en Naturaleza y Supervivencia, y tu bonificador de competencia se duplica para cualquier prueba de característica que utilice cualquiera de esas dos habilidades.'
        },
        {
          level: 3,
          name: 'Escaramuzador (Skirmisher)',
          desc: 'Como reacción cuando un enemigo termine su turno a 5 pies de ti, puedes moverte hasta la mitad de tu velocidad terrestre sin provocar ningún ataque de oportunidad.'
        },
        {
          level: 9,
          name: 'Movimiento Superior (Superior Mobility)',
          desc: 'Tu velocidad terrestre aumenta en 10 pies. Si posees velocidad de escalada o de nado, esas velocidades también aumentan en 10 pies.'
        },
        {
          level: 13,
          name: 'Maestro de Emboscadas (Ambush Master)',
          desc: 'Tienes ventaja en tiradas de Iniciativa. Además, la primera criatura a la que golpees durante la primera ronda de un combate otorga ventaja en tiradas de ataque a todos tus aliados contra ella hasta tu siguiente turno.'
        },
        {
          level: 17,
          name: 'Ataque Súbito (Sudden Strike)',
          desc: 'Si tomas la acción de Atacar en tu turno, puedes realizar un ataque adicional con arma como acción adicional. Este ataque adicional puede beneficiarse de tu Ataque Furtivo incluso si ya lo usaste este turno, siempre que apunte a una criatura diferente.'
        }
      ]
    }
  ],

  hechicero: [
    {
      id: 'alma-divina',
      name: 'Alma Divina (Divine Soul)',
      description: 'Bendecidos con una chispa celestial de los dioses en su sangre, combinan la hechicería con los milagros sagrados de los clérigos.',
      features: [
        {
          level: 1,
          name: 'Magia Divina (Divine Magic)',
          desc: 'Al aprender conjuros de hechicero puedes elegir conjuros de la lista completa del Clérigo además de la del Hechicero. Cuentan como conjuros de hechicero para ti.'
        },
        {
          level: 1,
          name: 'Bendición de los Dioses (Favored by the Gods)',
          desc: 'Si fallas una tirada de ataque o una tirada de salvación, puedes tirar 2d4 y sumarlos al resultado final, pudiendo convertir el fallo en un éxito (1/descanso corto o largo).'
        },
        {
          level: 6,
          name: 'Curación Fortalecida (Empowered Healing)',
          desc: 'Cuando tú o un aliado a 5 pies tire dados para recuperar puntos de golpe mediante un conjuro, puedes gastar 1 punto de hechicería para relanzar cualquier cantidad de dados de curación.'
        },
        {
          level: 14,
          name: 'Alas Angelicales (Otherworldly Wings)',
          desc: 'Como acción adicional manifiestas un par de alas angelicales (o demoníacas si tu afinidad es impía) en tu espalda que te otorgan una velocidad de vuelo de 30 pies.'
        },
        {
          level: 18,
          name: 'Recuperación Sobrenatural (Unearthly Recovery)',
          desc: 'Como acción adicional cuando tengas menos de la mitad de tus puntos de golpe máximos, recuperas puntos de golpe iguales a la mitad de tus PG máximos (1/descanso largo).'
        }
      ]
    },
    {
      id: 'sombras',
      name: 'Hechicería de las Sombras (Shadow Magic)',
      description: 'Nacidos tocados por el Páramo Sombrío, controlan tinieblas impenetrables y sabuesos espectrales forjados con pura oscuridad.',
      features: [
        {
          level: 1,
          name: 'Ojos de la Oscuridad (Eyes of the Dark)',
          desc: 'Ganas visión en la oscuridad a 120 pies. A nivel 3 aprendes el conjuro Oscuridad y puedes lanzarlo gastando 2 puntos de hechicería, permitiéndote ver a través de tu propia oscuridad mágica.'
        },
        {
          level: 1,
          name: 'Fuerza del Sepulcro (Strength of the Grave)',
          desc: 'Cuando el daño te reduzca a 0 puntos de golpe y no sea daño radiante o un crítico, puedes hacer una salvación de Carisma (CD 5 + daño sufrido). Si tienes éxito, te quedas a 1 punto de golpe.'
        },
        {
          level: 6,
          name: 'Sabueso del Infortunio (Hound of Ill Omen)',
          desc: 'Como acción adicional gastas 3 puntos de hechicería para invocar a un can espectral tenebroso a 30 pies que persigue a un enemigo objetivo. Mientras el sabueso esté a 5 pies de la víctima, esta tiene desventaja en salvaciones contra cualquiera de tus conjuros.'
        },
        {
          level: 14,
          name: 'Paseo de las Sombras (Shadow Walk)',
          desc: 'Como acción adicional cuando estés en luz tenue u oscuridad, puedes teletransportarte mágicamente hasta 120 pies a otro espacio desocupado que también esté en luz tenue u oscuridad.'
        },
        {
          level: 18,
          name: 'Forma Sombría (Umbral Form)',
          desc: 'Como acción adicional gastas 6 puntos de hechicería para transformarte en una silueta de sombra durante 1 minuto: ganas resistencia a todo el daño excepto radiante y de fuerza, y puedes atravesar criaturas y objetos sólidos.'
        }
      ]
    },
    {
      id: 'tormenta',
      name: 'Hechicería de la Tormenta (Storm Sorcery)',
      description: 'Imbuidos del poder de los huracanes, vendavales y truenos marinos, vuelan con ráfagas de aire y azotan a sus agresores con rayos.',
      features: [
        {
          level: 1,
          name: 'Magia de Viento (Tempestuous Magic)',
          desc: 'Inmediatamente antes o después de lanzar un conjuro de nivel 1 o superior con tu acción, puedes usar una acción adicional para volar hasta 10 pies sin provocar ningún ataque de oportunidad.'
        },
        {
          level: 6,
          name: 'Corazón de la Tormenta (Heart of the Storm)',
          desc: 'Ganas resistencia al daño de relámpago y trueno. Cuando lanzas un conjuro de nivel 1 o superior que inflija daño de relámpago o trueno, una tormenta azota a los enemigos a 10 pies infligiéndoles la mitad de tu nivel de hechicero en daño.'
        },
        {
          level: 6,
          name: 'Guía de la Tormenta (Storm Guide)',
          desc: 'Puedes controlar el clima local en un radio de 20 pies: detener o iniciar lluvias leves y alterar la dirección del viento como acción adicional.'
        },
        {
          level: 14,
          name: 'Furia de la Tormenta (Storm\'s Fury)',
          desc: 'Como reacción cuando te impacten con un ataque cuerpo a cuerpo, infliges daño de relámpago igual a tu nivel de hechicero al atacante y debe superar salvación de Fuerza o ser empujado 20 pies.'
        },
        {
          level: 18,
          name: 'Alma del Viento (Wind Soul)',
          desc: 'Ganas inmunidad total al daño de relámpago y trueno y una velocidad de vuelo permanente de 60 pies. Puedes reducir tu vuelo para conceder vuelo de 30 pies a un grupo de aliados.'
        }
      ]
    },
    {
      id: 'mente-aberrante',
      name: 'Mente Aberrante (Aberrant Mind)',
      description: 'Mentes tocadas por los horrores del Reino Lejano o un renacuajo de azotamentes, capaces de desatar psicosis y lanzar conjuros psiónicos invisibles.',
      features: [
        {
          level: 1,
          name: 'Habla Telepática (Telepathic Speech)',
          desc: 'Como acción adicional estableces un vínculo telepático con una criatura que puedas ver a 30 pies durante un número de minutos igual a tu nivel de hechicero, comunicándoos mentalmente en ambos sentidos.'
        },
        {
          level: 1,
          name: 'Conjuros Psiónicos (Psionic Spells)',
          desc: 'Aprendes conjuros psiónicos adicionales temáticos (Brazos de Hadar, Susurros Disonantes, Detectar Pensamientos, Calamar Mental, etc.).'
        },
        {
          level: 6,
          name: 'Hechicería Psiónica (Psionic Sorcery)',
          desc: 'Al lanzar cualquiera de tus Conjuros Psiónicos, puedes gastar puntos de hechicería iguales al nivel del conjuro en lugar de una ranura de conjuro. Si lo haces, el conjuro no requiere componentes verbales, somáticos ni materiales.'
        },
        {
          level: 6,
          name: 'Defensas Psíquicas (Psychic Defenses)',
          desc: 'Ganas resistencia al daño psíquico permanente y tienes ventaja en tiradas de salvación contra ser encantado o asustado.'
        },
        {
          level: 14,
          name: 'Revelación en Carne (Revelation in Flesh)',
          desc: 'Como acción adicional gastas 1 o más puntos de hechicería para mutar tu cuerpo durante 10 minutos: ver invisibilidad (1 pt), velocidad de vuelo y levitar (1 pt), velocidad de nado y respirar agua (1 pt), o cuerpo viscoso para deslizarte por aberturas diminutas (1 pt).'
        },
        {
          level: 18,
          name: 'Remolino Débil (Warping Implosion)',
          desc: 'Como acción te teletransportas hasta 120 pies dejando un vórtice gravitatorio de vacío: cada criatura a 30 pies del punto de partida debe superar salvación de Fuerza o sufrir 3d10 de daño de fuerza y ser succionada hacia el centro.'
        }
      ]
    },
    {
      id: 'alma-mecanica',
      name: 'Alma Mecánica (Clockwork Soul)',
      description: 'Canalizan la armonía y simetría matemática inmutable de Mechanus y Primus, neutralizando el caos y restableciendo el orden en el tejido arcano.',
      features: [
        {
          level: 1,
          name: 'Magia de la Mecánica (Clockwork Magic)',
          desc: 'Aprendes conjuros de abjuración y transmutación de orden adicionales (Alarma, Protección contra el Mal, Restaurar, Contrajuro, Muro de Fuerza, etc.).'
        },
        {
          level: 1,
          name: 'Restablecer el Equilibrio (Restore Balance)',
          desc: 'Como reacción cuando una criatura a 60 pies esté a punto de tirar un d20 con ventaja o desventaja, puedes cancelar la ventaja o desventaja en esa tirada (prof veces/descanso largo).'
        },
        {
          level: 6,
          name: 'Bastión de la Ley (Bastion of Law)',
          desc: 'Gastas de 1 a 5 puntos de hechicería para rodearte a ti o a un aliado de un escudo de engranajes mágicos. El escudo tiene una reserva de dados d8 igual a los puntos gastados; cuando el objetivo sufre daño, gasta dados para reducir el daño en esa cantidad.'
        },
        {
          level: 14,
          name: 'Trance del Orden (Trance of Order)',
          desc: 'Como acción adicional entras en un trance de cálculo perfecto durante 1 minuto: los ataques contra ti no pueden tener ventaja, y cualquier tirada de d20 que hagas para ataques, salvaciones o pruebas de característica de 9 o menor cuenta como un 10.'
        },
        {
          level: 18,
          name: 'Cabalgata Mecánica (Clockwork Cavalcade)',
          desc: 'Como acción invocas a espíritus mecánicos de Mechanus en un cubo de 30 pies: reparan objetos al instante, curan hasta 100 puntos de golpe repartidos entre tus aliados y disipan automáticamente cualquier conjuro de nivel 6 o menor en el área.'
        }
      ]
    },
    {
      id: 'lunar-sorcery',
      name: 'Hechicería Lunar (Lunar Sorcery)',
      description: 'Canalizan la magia mística de las fases lunares (Luna Llena, Luna Nueva y Luna Menguante), adaptando sus conjuros y metamagia a los ciclos del cielo nocturno.',
      features: [
        {
          level: 1,
          name: 'Encarnación Lunar (Lunar Embodiment)',
          desc: 'Aprendes conjuros asociados a las tres fases lunares (Luna Llena: Escudo de Fe, Rayo de Luna; Luna Creciente: Rayo de Enfermedad, Oscuridad; Luna Nueva: Falsa Vida, Ceguera/Sordera). Cada vez que terminas un descanso largo, puedes elegir qué fase lunar encarnas. Puedes lanzar el conjuro de 1er nivel de tu fase activa una vez por descanso largo sin gastar ranura de conjuro.'
        },
        {
          level: 1,
          name: 'Fuego Lunar (Moon Fire)',
          desc: 'Aprendes el truco Llama Sagrada (Sacred Flame). Cuando lo lanzas, puedes elegir a dos criaturas que estén a 5 pies una de otra como objetivos en lugar de a una sola.'
        },
        {
          level: 6,
          name: 'Dones Lunares (Lunar Boons)',
          desc: 'Las fases lunares potencian tu Metamagia. Cuando usas una opción de Metamagia en un conjuro de la escuela asociada a tu fase lunar activa (Abjuración/Adivinación en Llena, Ilusión/Nigromancia en Nueva, Transmutación/Conjuración en Creciente), puedes reducir el coste en 1 punto de hechicería (mínimo 0). Puedes usar este descuento un número de veces igual a tu bonificador de competencia por descanso largo.'
        },
        {
          level: 6,
          name: 'Creciente y Menguante (Waxing and Waning)',
          desc: 'Como acción adicional puedes gastar 1 punto de hechicería para cambiar de inmediato tu fase lunar actual a otra de las tres fases disponibles.'
        },
        {
          level: 14,
          name: 'Empoderamiento Lunar (Lunar Empowerment)',
          desc: 'Ganas beneficios pasivos según tu fase activa: En Luna Llena tienes ventaja en pruebas de Investigación y Percepción; en Luna Nueva tienes ventaja en pruebas de Sigilo; en Luna Creciente ganas resistencia al daño radiante y necrótico.'
        },
        {
          level: 18,
          name: 'Fenómeno Lunar (Lunar Phenomenon)',
          desc: 'Como acción adicional desatas el poder culminante de tu luna activa: Luna Llena (aura radiante que ciega a enemigos a 30 pies y cura aliados), Luna Nueva (invisibilidad y teletransporte a 30 pies infligiendo daño necrótico), o Luna Creciente (resistencia universal y reacción para teletransportarse al ser atacado).'
        }
      ]
    }
  ],

  brujo: [
    {
      id: 'gran-antiguo',
      name: 'El Gran Antiguo (The Great Old One)',
      description: 'Pactantes con entidades insondables de más allá del tiempo y las estrellas como Cthulhu o Hadar, cuyas mentes rompen la cordura de los mortales.',
      features: [
        {
          level: 1,
          name: 'Mente Despierta (Awakened Mind)',
          desc: 'Puedes comunicarte telepáticamente con cualquier criatura que puedas ver a 30 pies de ti. No necesitas compartir un idioma, pero la criatura debe ser capaz de entender al menos un idioma.'
        },
        {
          level: 6,
          name: 'Escudo Entrópico (Entropic Ward)',
          desc: 'Como reacción cuando una criatura realice una tirada de ataque contra ti, puedes imponer desventaja en ese ataque. Si el ataque falla, tu siguiente tirada de ataque contra esa criatura tiene ventaja (1/descanso corto o largo).'
        },
        {
          level: 10,
          name: 'Escudo de Pensamientos (Thought Shield)',
          desc: 'Tus pensamientos no pueden ser leídos por ningún medio telepático. Ganas resistencia al daño psíquico, y cuando una criatura te inflija daño psíquico, sufre la misma cantidad de daño de vuelta.'
        },
        {
          level: 14,
          name: 'Crear Esclavo (Create Thrall)',
          desc: 'Como acción tocas a un humanoide incapacitado: queda encantado por ti indefinidamente mientras tú y él permanezcáis en el mismo plano, y puedes comunicarte telepáticamente con él a cualquier distancia.'
        }
      ]
    },
    {
      id: 'archifata',
      name: 'El Archifata (The Archfey)',
      description: 'Pactantes con señores y damas del Feywild como Titania o la Reina del Aire y la Oscuridad, expertos en ilusiones, encanto y evasiones etéreas.',
      features: [
        {
          level: 1,
          name: 'Presencia Feérica (Fey Presence)',
          desc: 'Como acción desatas una ola de gracia feérica aterradora: cada criatura en un cubo de 10 pies centrado en ti debe superar una salvación de Sabiduría o quedar encantada o asustada de ti hasta el final de tu siguiente turno (1/descanso corto o largo).'
        },
        {
          level: 6,
          name: 'Escape Brumoso (Misty Escape)',
          desc: 'Como reacción cuando recibas daño, te vuelves invisible y te teletransportas hasta 60 pies a un espacio desocupado que puedas ver, permaneciendo invisible hasta tu siguiente turno (1/descanso corto o largo).'
        },
        {
          level: 10,
          name: 'Defensa Seductora (Beguiling Defenses)',
          desc: 'Eres inmune a ser encantado. Cuando una criatura intente encantarte, puedes usar tu reacción para volver su propio efecto en su contra, forzándola a quedar encantada por ti durante 1 minuto.'
        },
        {
          level: 14,
          name: 'Delirio Sombrío (Dark Delirium)',
          desc: 'Como acción sumes a una criatura a 60 pies en un reino ilusorio de pesadilla: queda cegada, ensordecida y asustada o encantada por ti durante 1 minuto si falla una salvación de Sabiduría (1/descanso corto o largo).'
        }
      ]
    },
    {
      id: 'patron-celestial',
      name: 'El Celestial (The Celestial)',
      description: 'Vinculados a seres de los planos superiores como solares, ki-rins o unicornios, canalizan luz purificadora y fuegos sagrados sanadores.',
      features: [
        {
          level: 1,
          name: 'Guía Sagrada',
          desc: 'Aprendes los trucos Luz y Llama Sagrada sin contar contra tu límite de trucos conocidos.'
        },
        {
          level: 1,
          name: 'Luz Sanadora (Healing Light)',
          desc: 'Posees una reserva de dados d6 igual a 1 + tu nivel de brujo. Como acción adicional puedes gastar dados de tu reserva (hasta tu modificador de Carisma a la vez) para curar a una criatura a 60 pies.'
        },
        {
          level: 6,
          name: 'Alma Radiante (Radiant Soul)',
          desc: 'Ganas resistencia al daño radiante. Cuando lanzas un conjuro que inflija daño de fuego o radiante, sumas tu modificador de Carisma a una tirada de daño del conjuro.'
        },
        {
          level: 10,
          name: 'Resplandor Celestial (Celestial Resilience)',
          desc: 'Al terminar un descanso corto o largo, ganas puntos de golpe temporales iguales a tu nivel de brujo + modificador de Carisma, y cada uno de tus aliados gana puntos de golpe temporales iguales a la mitad de tu nivel de brujo + modificador de Carisma.'
        },
        {
          level: 14,
          name: 'Venganza Abrasadora (Searing Vengeance)',
          desc: 'Cuando debas hacer una salvación de muerte al comienzo de tu turno, puedes levantarte de inmediato con la mitad de tus PG máximos, infligiendo 2d8 + Car en daño radiante y cegando a los enemigos a 30 pies.'
        }
      ]
    },
    {
      id: 'genio',
      name: 'El Genio (The Genie)',
      description: 'Pactos con nobles señores de las ciudadelas elementales: Dao (tierra), Djinni (aire), Efreeti (fuego) o Marid (agua), que otorgan riquezas y santuarios portátiles.',
      features: [
        {
          level: 1,
          name: 'Vasija del Genio (Genie\'s Vessel)',
          desc: 'Recibes un objeto mágico diminuto (lámpara, anillo, frasco). Como acción puedes entrar en la vasija como un refugio extradimensional durante horas. Además, una vez por turno al impactar con un ataque infliges daño adicional según tu patrón (Tierra contundente, Aire trueno, Fuego fuego, o Agua frío) igual a tu bonificador de competencia.'
        },
        {
          level: 6,
          name: 'Regalo Elemental (Elemental Gift)',
          desc: 'Ganas resistencia al tipo de daño asociado a tu patrón elemental. Además, como acción adicional puedes ganar una velocidad de vuelo de 30 pies durante 10 minutos (prof veces/descanso largo).'
        },
        {
          level: 10,
          name: 'Santuario Protector (Sanctuary Vessel)',
          desc: 'Puedes llevar contigo a hasta 5 criaturas aliadas dentro de tu Vasija del Genio, y todos los ocupantes obtienen los beneficios de un descanso corto completo en solo 10 minutos.'
        },
        {
          level: 14,
          name: 'Deseo Limitado (Limited Wish)',
          desc: 'Pides un deseo a tu patrón: puedes duplicar el efecto de cualquier conjuro de nivel 6 o menor de cualquier lista de clases que requiera 1 acción, sin componentes costosos (1/1d4 descansos largos).'
        }
      ]
    },
    {
      id: 'no-muerto',
      name: 'El No Muerto (The Undead)',
      description: 'Sirvientes de archiliches, vampiros milenarios o momias supremas como Acererak o Strahd, transformando su fisonomía en un terror cadavérico inmortal.',
      features: [
        {
          level: 1,
          name: 'Forma de Pavor (Form of Dread)',
          desc: 'Como acción adicional adquieres una presencia cadavérica aterradora durante 1 minuto: ganas 1d10 + tu nivel de brujo en PG temporales, inmunidad a la condición Asustado, y una vez en cada uno de tus turnos al golpear a un enemigo puedes forzarlo a superar una salvación de Sabiduría o quedar asustado de ti.'
        },
        {
          level: 6,
          name: 'Toque de la Tumba (Grave Touched)',
          desc: 'No necesitas comer, beber ni respirar. Al infligir daño con una tirada de ataque, puedes cambiar el tipo de daño a necrótico, y en Forma de Pavor tiras un dado de daño adicional del ataque.'
        },
        {
          level: 10,
          name: 'Vínculo Necrótico (Necrotic Husk)',
          desc: 'Ganas resistencia al daño necrótico (inmunidad en Forma de Pavor). Si caes a 0 PG, puedes explotar en energía necrótica de 2d10 + nivel a enemigos a 30 pies y quedar a 1 PG con 1 nivel de agotamiento.'
        },
        {
          level: 14,
          name: 'Proyección Espiritual (Spirit Projection)',
          desc: 'Como acción proyectas tu espíritu fuera de tu cuerpo durante 1 hora: tu espíritu puede volar, atravesar muros, tus conjuros de nigromancia y trucos no requieren componentes verbales ni somáticos y recuperas PG iguales a la mitad del daño necrótico que inflijas.'
        }
      ]
    },
    {
      id: 'insondable',
      name: 'El Insondable (The Fathomless)',
      description: 'Pactantes con las profundidades abisales de los mares y kraken titánicos, manifestando tentáculos espectrales de agua helada.',
      features: [
        {
          level: 1,
          name: 'Tentáculo de las Profundidades (Tentacle of the Deeps)',
          desc: 'Como acción adicional invocas un tentáculo espectral de agua de 10 pies a 60 pies de ti durante 1 minuto. Puedes moverlo 30 pies y atacar con él como acción adicional para infligir 1d8 de daño de frío y reducir la velocidad del enemigo en 10 pies.'
        },
        {
          level: 1,
          name: 'Don del Océano (Gift of the Sea)',
          desc: 'Ganas una velocidad de nado de 40 pies y la capacidad de respirar bajo el agua.'
        },
        {
          level: 6,
          name: 'Tentáculo Guardián (Guardian Coil)',
          desc: 'Como reacción cuando tú o un aliado a 10 pies del tentáculo reciba daño, el tentáculo reduce el daño en 1d8 (2d8 a nivel 10).'
        },
        {
          level: 10,
          name: 'Abrazo del Abismo (Grasping Tentacles)',
          desc: 'Aprendes el conjuro Tentáculos Negros de Evard sin contar contra tus conjuros conocidos y puedes lanzarlo gratis una vez por descanso largo ganando puntos de golpe temporales iguales a tu nivel de brujo.'
        },
        {
          level: 14,
          name: 'Remolino de Transporte (Fathomless Plunge)',
          desc: 'Como acción puedes sumergirte en un estanque de agua y teletransportarte a ti mismo y hasta 5 criaturas dispuestas hasta 1 milla de distancia a cualquier masa de agua conocida.'
        }
      ]
    },
    {
      id: 'the-undying',
      name: 'El Imperecedero (The Undying)',
      description: 'Has forjado un pacto con un ser que ha conquistado la muerte misma, como Vecna, Larloch o Acererak, aprendiendo los secretos de la no-muerte y la longevidad eterna.',
      features: [
        {
          level: 1,
          name: 'Entre los Muertos (Among the Dead)',
          desc: 'Aprendes el truco Piedad con los Moribundos (Spare the Dying). Tienes ventaja en las tiradas de salvación contra cualquier enfermedad. Además, los no muertos deben superar una tirada de salvación de Sabiduría contra tu CD de conjuros para poder atacarte o seleccionarte con un efecto dañino directo.'
        },
        {
          level: 6,
          name: 'Desafiar a la Muerte (Defy Death)',
          desc: 'Puedes engañar a la parca. Recuperas 1d8 + tu modificador de Constitución puntos de golpe cuando tienes éxito en una tirada de salvación de muerte o cuando estabilizas a una criatura con Piedad con los Moribundos (1/descanso largo).'
        },
        {
          level: 10,
          name: 'Naturaleza Imperecedera (Undying Nature)',
          desc: 'Puedes contener la respiración indefinidamente y no necesitas comer, beber ni dormir (aunque sigues requiriendo reposo para descansar). Además, envejeces a un ritmo diez veces más lento de lo normal (1 año por cada 10 años que transcurren).'
        },
        {
          level: 14,
          name: 'Vida Indestructible (Indestructible Life)',
          desc: 'Como acción adicional en tu turno, puedes canalizar la energía de la vida eterna para recuperar 1d8 + tu nivel de brujo puntos de golpe. Además, si recolocas una extremidad cercenada en tu cuerpo mientras usas este rasgo, la extremidad se vuelve a unir instantáneamente (1/descanso corto o largo).'
        }
      ]
    }
  ],

  explorador: [
    {
      id: 'senor-bestias',
      name: 'Señor de las Bestias (Beast Master)',
      description: 'Forjan un lazo espiritual y empático supremo con una bestia compañera primigenia de la tierra, el cielo o el mar.',
      features: [
        {
          level: 3,
          name: 'Compañero Primigenio (Primal Companion)',
          desc: 'Manifiestas una Bestia de la Tierra, el Aire o el Agua que comparte tu iniciativa. Suma tu bonificador de competencia a su CA, tiradas de ataque, salvaciones y daño. Puedes ordenarle atacar o actuar como acción adicional en tu turno o reemplazando uno de tus ataques.'
        },
        {
          level: 7,
          name: 'Entrenamiento Excepcional (Exceptional Training)',
          desc: 'En cualquier turno en que no ordenes a tu bestia atacar, puede usar la acción de Correr, Destrabarse o Esquivar como acción adicional.'
        },
        {
          level: 11,
          name: 'Furia de la Bestia (Bestial Fury)',
          desc: 'Tu bestia compañera puede realizar dos ataques cada vez que le ordenes atacar en su turno.'
        },
        {
          level: 15,
          name: 'Compartir Conjuros (Share Spells)',
          desc: 'Cuando te lanzas un conjuro a ti mismo, el conjuro también afecta a tu bestia si se encuentra a 30 pies o menos de ti.'
        }
      ]
    },
    {
      id: 'caminante-horizonte',
      name: 'Caminante del Horizonte (Horizon Walker)',
      description: 'Guardianes de las fronteras planares que detectan portales extradimensionales y se teletransportan entre golpes para infligir daño de fuerza pura.',
      features: [
        {
          level: 3,
          name: 'Detectar Portales (Detect Portal)',
          desc: 'Como acción percibes la distancia y dirección al portal planar más cercano a 1 milla de ti (1/descanso corto o largo).'
        },
        {
          level: 3,
          name: 'Golpe Planar (Planar Warrior)',
          desc: 'Como acción adicional marcas a un objetivo a 30 pies: el siguiente impacto que le asestes con un arma en este turno convierte todo el daño del arma a daño de fuerza e inflige 1d8 de daño de fuerza adicional (2d8 a nivel 11).'
        },
        {
          level: 7,
          name: 'Paso Etéreo (Ethereal Step)',
          desc: 'Como acción adicional puedes lanzar el conjuro Forma Etérea sin gastar ranura de conjuro, durando hasta el final de tu turno actual (1/descanso corto o largo).'
        },
        {
          level: 11,
          name: 'Golpe Distante (Distant Strike)',
          desc: 'Al tomar la acción de Atacar, puedes teletransportarte hasta 10 pies antes de cada ataque a un espacio desocupado que puedas ver. Si atacas a al menos dos criaturas diferentes, ganas un tercer ataque gratis en ese turno.'
        },
        {
          level: 15,
          name: 'Defensa Espectral (Spectral Defense)',
          desc: 'Como reacción cuando recibas daño de un ataque, puedes volverte incorpóreo momentáneamente para reducir a la mitad todo el daño de ese ataque.'
        }
      ]
    },
    {
      id: 'asesino-monstruos',
      name: 'Asesino de Monstruos (Monster Slayer)',
      description: 'Cazadores entrenados en la anatomía y las debilidades de las criaturas de la noche, vampiros, demonios y magos oscuros.',
      features: [
        {
          level: 3,
          name: 'Sentido del Cazador (Hunter\'s Sense)',
          desc: 'Como acción observas a una criatura a 60 pies para discernir inmediatamente sus inmunidades, resistencias y vulnerabilidades al daño (Sab mod veces/descanso largo).'
        },
        {
          level: 3,
          name: 'Presa del Exterminador (Slayer\'s Prey)',
          desc: 'Como acción adicional marcas a una criatura a 60 pies: la primera vez en cada turno que le inflijas daño con un arma, sufre 1d6 de daño adicional.'
        },
        {
          level: 7,
          name: 'Defensa Sobrenatural (Supernatural Defense)',
          desc: 'Sumas 1d6 a cualquier tirada de salvación que realices contra un efecto o conjuro lanzado por el objetivo de tu Presa del Exterminador.'
        },
        {
          level: 11,
          name: 'Némesis del Conjurador (Magic-User\'s Nemesis)',
          desc: 'Como reacción cuando una criatura a 60 pies lance un conjuro o se teletransporte, fuerzas una salvación de Sabiduría contra tu CD: si falla, el conjuro o teletransporte se frustra y se pierde por completo (1/descanso corto o largo).'
        },
        {
          level: 15,
          name: 'Contraataque del Asesino (Slayer\'s Counter)',
          desc: 'Si la criatura marcada por tu Presa del Exterminador te fuerza a hacer una tirada de salvación, puedes usar tu reacción para atacarla de inmediato con un arma: si impactas, superas automáticamente la tirada de salvación.'
        }
      ]
    },
    {
      id: 'guardian-enjambre',
      name: 'Guardián del Enjambre (Swarmkeeper)',
      description: 'Viven rodeados de un enjambre continuo de espíritus diminutos de la naturaleza (abejas, ramitas, polillas o geckos) que atacan y los transportan.',
      features: [
        {
          level: 3,
          name: 'Enjambre Recolector (Gathered Swarm)',
          desc: 'Una vez en cada uno de tus turnos al impactar con un ataque, tu enjambre puede: infligir 1d6 de daño perforante adicional, mover al enemigo hasta 15 pies si falla salvación de Fuerza, o moverte a ti 10 pies sin provocar ataques de oportunidad.'
        },
        {
          level: 7,
          name: 'Marea Voraz (Writhing Tide)',
          desc: 'Como acción adicional tu enjambre te eleva otorgándote una velocidad de vuelo de 10 pies y la capacidad de levitar durante 1 minuto (prof veces/descanso largo).'
        },
        {
          level: 11,
          name: 'Dispersión del Enjambre (Mighty Swarm)',
          desc: 'El daño de tu Enjambre Recolector aumenta a 1d8 y puede derribar a los enemigos. Además, cuando te mueves con tu enjambre ganas media cobertura (+2 CA y salvaciones) hasta el inicio de tu siguiente turno.'
        },
        {
          level: 15,
          name: 'Dispersión del Enjambre (Swarming Dispersal)',
          desc: 'Como reacción cuando sufras daño, te desmaterializas en tu enjambre ganando resistencia a ese daño y teletransportándote hasta 30 pies (prof veces/descanso largo).'
        }
      ]
    },
    {
      id: 'guardian-draconico',
      name: 'Guardián Dracónico (Drakewarden)',
      description: 'Guerreros vinculados a la majestuosidad dracónica que crían y comandan a un fiel Draco que crece hasta convertirse en una montura alada colosal.',
      features: [
        {
          level: 3,
          name: 'Don Dracónico (Draconic Gift)',
          desc: 'Aprendes el truco Taumaturgia y el idioma dracónico.'
        },
        {
          level: 3,
          name: 'Compañero Draco (Drake Companion)',
          desc: 'Como acción invocas a tu compañero Draco (ácido, frío, fuego, relámpago o veneno). Comparte tu iniciativa, ataca con mordisco elemental y puede usar su reacción para imbuir los ataques de tus aliados con 1d6 de daño elemental adicional.'
        },
        {
          level: 7,
          name: 'Vínculo del Dragón (Bond of Resistance)',
          desc: 'Ganas resistencia al tipo de daño elemental de tu draco, tu draco gana alas y velocidad de nado o vuelo, y mientras lo montes puedes usarlo como montura de batalla.'
        },
        {
          level: 11,
          name: 'Aliento del Draco (Drake\'s Breath)',
          desc: 'Como acción tú o tu draco desatáis un cono de 30 pies o línea de 60 pies de daño elemental que inflige 8d6 de daño (1/descanso largo o gastando ranura de nivel 3 o superior).'
        },
        {
          level: 15,
          name: 'Draco Legendario (Perfected Drake)',
          desc: 'Tu draco crece a tamaño Grande, el daño de su mordisco aumenta en 1d6, y como reacción cuando tú o él sufra daño podéis otorgaros resistencia a ese daño.'
        }
      ]
    },
    {
      id: 'erudito-fey',
      name: 'Erudito Fey (Fey Wanderer)',
      description: 'Viajeros tocados por el encanto caprichoso y peligroso del Feywild, que infunden a sus ataques con pavor fey y engaños hipnóticos.',
      features: [
        {
          level: 3,
          name: 'Don Temible (Dreadful Strikes)',
          desc: 'Una vez por turno al golpear a una criatura con un arma infliges 1d4 de daño psíquico adicional (1d6 a nivel 11). Puedes aplicar este daño a múltiples criaturas si las golpeas en el mismo turno.'
        },
        {
          level: 3,
          name: 'Presencia de Otro Mundo (Otherworldly Glamour)',
          desc: 'Sumas tu modificador de Sabiduría a cualquier prueba de Carisma que realices, y ganas competencia en Engaño, Actuación o Persuasión.'
        },
        {
          level: 7,
          name: 'Giro Encantador (Beguiling Twist)',
          desc: 'Tienes ventaja en salvaciones contra ser encantado o asustado. Cuando cualquier criatura a 60 pies supere una salvación contra ser encantada o asustada, puedes usar tu reacción para redirigir el efecto a otro objetivo.'
        },
        {
          level: 11,
          name: 'Refuerzos Fey (Fey Reinforcements)',
          desc: 'Puedes lanzar el conjuro Invocar Ser Feérico sin requerir concentración y gratis una vez por descanso largo.'
        },
        {
          level: 15,
          name: 'Paso Nublado (Mist Wanderer)',
          desc: 'Puedes lanzar Paso Brumoso sin gastar ranura de conjuro un número de veces igual a tu modificador de Sabiduría por cada descanso largo, y puedes llevar contigo a un aliado a 5 pies.'
        }
      ]
    }
  ]
};

// Full Artificer Class Definition conforming to WikidotClass
export const ARTIFICER_CLASS = {
  id: 'artifice',
  name: 'Artífice (Artificer)',
  description: 'Maestros del ingenio y la magia aplicada, los artífices transforman objetos cotidianos y herramientas en maravillas arcanas.',
  hitDie: 8 as const,
  primaryAbility: 'int',
  savingThrows: ['con', 'int'],
  armorProficiencies: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
  weaponProficiencies: ['Armas simples', 'Herramientas de ladrón', 'Herramientas de manitas'],
  isSpellcaster: true,
  casterType: 'half' as const,
  spellcastingAbility: 'int' as const,
  subclassesName: 'Especializaciones de Artífice',
  subclassUnlockLevel: 3,
  defaultResources: [
    {
      id: 'res-infusiones',
      name: 'Infusiones Activas',
      calculateMax: (lvl: number) => (lvl >= 18 ? 6 : lvl >= 14 ? 5 : lvl >= 10 ? 4 : lvl >= 6 ? 3 : 2),
      resetOn: 'long' as const,
      description: 'Cantidad de objetos mágicos infundidos que puedes mantener activos simultáneamente.'
    },
    {
      id: 'res-destello-genio',
      name: 'Destello de Genio',
      calculateMax: () => 3, // Se adapta al mod Int en juego
      resetOn: 'long' as const,
      description: 'Como reacción sumas tu modificador de Inteligencia a una tirada de salvación o prueba de habilidad propia o de un aliado a 30 pies.'
    }
  ],
  subclasses: [
    {
      id: 'alquimista',
      name: 'Alquimista (Alchemist)',
      description: 'Especialistas en combinar reactivos químicos y magia para elaborar pociones sanadoras, elixires mutágenos y vapores cáusticos.',
      features: [
        {
          level: 3,
          name: 'Herramientas de Alquimista',
          desc: 'Ganas competencia con suministros de alquimista y puedes fabricar pociones el doble de rápido.'
        },
        {
          level: 3,
          name: 'Conjuros de Alquimista (Alchemist Spells)',
          desc: 'Tienes una lista de conjuros siempre preparados que no cuentan contra tu límite de preparación diaria: Nivel 3: Palabra de curación, Rayo de enfermedad. Nivel 5: Flecha ácida de Melf, Esfera flamígera. Nivel 9: Forma gaseosa, Palabra de curación en masa. Nivel 13: Marchitar, Ojo arcano. Nivel 17: Nube aniquiladora, Revivir a los muertos.'
        },
        {
          level: 3,
          name: 'Elixir Experimental (Experimental Elixir)',
          desc: 'Al terminar un descanso largo creas elixires mágicos al azar en frascos vacíos (1 a nivel 3, 2 a nivel 6, 3 a nivel 15). Tira 1d6: 1. Curación (2d4 + Int PG), 2. Velocidad (+10 pies de velocidad durante 1 hora), 3. Resiliencia (+1 CA durante 10 min), 4. Valentía (10 PG temporales), 5. Vuelo (10 pies de velocidad de vuelo durante 10 min), o 6. Transformación (efecto del conjuro Alterar el propio ser durante 10 min). Puedes gastar una ranura de conjuro de nivel 1+ para crear elixires adicionales eligiendo el efecto.'
        },
        {
          level: 5,
          name: 'Fórmulas Alquímicas (Alchemical Savant)',
          desc: 'Al lanzar un conjuro a través de tus suministros de alquimista que inflija daño de ácido, fuego, necrótico o veneno, o cure puntos de golpe, sumas tu modificador de Inteligencia al resultado.'
        },
        {
          level: 9,
          name: 'Infusiones Restauradoras (Restorative Reagents)',
          desc: 'Las criaturas que beben tus elixires ganan 2d6 + Int en puntos de golpe temporales. Además, puedes lanzar Restauración Menor gratis sin gastar ranuras (Int mod veces/descanso largo).'
        },
        {
          level: 15,
          name: 'Remedio Químico (Chemical Mastery)',
          desc: 'Ganas resistencia al daño de ácido y veneno e inmunidad a la condición Envenenado. Puedes lanzar Sanar y Restauración Mayor gratis una vez por descanso largo sin gastar ranuras ni componentes materiales.'
        }
      ]
    },
    {
      id: 'armero',
      name: 'Armero (Armorer)',
      description: 'Modifican sus armaduras pesadas convirtiéndolas en exotrajes arcanos potenciados con rayos de energía o guanteletes de trueno demoledores.',
      features: [
        {
          level: 3,
          name: 'Herramientas de Armero y Armadura Pesada',
          desc: 'Ganas competencia con armaduras pesadas y herramientas de herrero.'
        },
        {
          level: 3,
          name: 'Conjuros de Armero (Armorer Spells)',
          desc: 'Tienes una lista de conjuros siempre preparados que no cuentan contra tu límite de preparación diaria: Nivel 3: Proyectil mágico, Onda atronadora. Nivel 5: Imagen múltiple, Hacer añicos. Nivel 9: Patrón hipnótico, Relámpago. Nivel 13: Escudo de fuego, Invisibilidad mayor. Nivel 17: Atravesar paredes, Muro de fuerza.'
        },
        {
          level: 3,
          name: 'Armadura Arcana (Arcane Armor)',
          desc: 'Como acción transformas una armadura que lleves en tu Armadura Arcana: cubre todo tu cuerpo, no impone penalización por Fuerza, no da desventaja en sigilo y no te la pueden quitar contra tu voluntad. Puedes usarla como foco de lanzamiento de tus conjuros de artífice.'
        },
        {
          level: 3,
          name: 'Modelo de Armadura: Guardián o Infiltrador',
          desc: 'Eliges el modo de tu armadura tras cada descanso corto o largo: Guardián (Guanteletes de Trueno de 1d8 que fuerzan al enemigo a tener desventaja en ataques contra otros objetivos hasta tu próximo turno, y Campo Defensivo con acción adicional para ganar PG temporales iguales a tu nivel de artífice PB veces/descanso largo) o Infiltrador (Lanza-Relámpagos a distancia de 90/300 pies que inflige 1d6 daño eléctrico más 1d6 extra 1 vez por turno, +5 pies de velocidad de movimiento y ventaja en pruebas de Destreza [Sigilo]).'
        },
        {
          level: 5,
          name: 'Ataque Adicional (Extra Attack)',
          desc: 'Puedes atacar dos veces en lugar de una al tomar la acción de Atacar en tu turno.'
        },
        {
          level: 9,
          name: 'Modificaciones de Armadura (Armor Modifications)',
          desc: 'Tu armadura cuenta como 4 piezas separadas (peto, botas, casco y arma especial del modelo), permitiéndote infundir dos objetos adicionales siempre que pertenezcan a tu armadura.'
        },
        {
          level: 15,
          name: 'Armadura Perfeccionada (Perfected Armor)',
          desc: 'Modelo Guardián: como reacción cuando una criatura Grande o menor termina su turno a 30 pies o menos, la obligas a hacer una tirada de salvación de Fuerza; si falla, es arrastrada mágicamente hasta 5 pies de ti y la golpeas con un ataque cuerpo a cuerpo (PB veces/descanso largo). Modelo Infiltrador: cualquier objetivo dañado por tu Lanza-Relámpagos emite luz mágica: el siguiente ataque contra él tiene ventaja y sufre 1d6 de daño relámpago extra.'
        }
      ]
    },
    {
      id: 'artillero',
      name: 'Artillero (Artillerist)',
      description: 'Especialistas en artillería mágica a distancia, que construyen cañones arcanos móviles capaces de incinerar o escudar a sus aliados.',
      features: [
        {
          level: 3,
          name: 'Herramientas de Tallador de Madera',
          desc: 'Ganas competencia con herramientas de tallador de madera y armas de fuego si la campaña las incluye.'
        },
        {
          level: 3,
          name: 'Conjuros de Artillero (Artillerist Spells)',
          desc: 'Tienes una lista de conjuros siempre preparados que no cuentan contra tu límite de preparación diaria: Nivel 3: Escudo, Onda atronadora. Nivel 5: Rayo abrasador, Hacer añicos. Nivel 9: Bola de fuego, Muro de viento. Nivel 13: Tormenta de hielo, Muro de fuego. Nivel 17: Cono de frío, Muro de fuerza.'
        },
        {
          level: 3,
          name: 'Cañón Eldritch (Eldritch Cannon)',
          desc: 'Como acción creas un cañón mágico Diminuto (en tu mano) o Pequeño (con patas mecánicas) con CA 18 y PG iguales a 5 veces tu nivel de artífice: Balista de Fuerza (120 pies, 2d8 daño de fuerza y empuja 5 pies), Lanzallamas (cono de 15 pies, 2d8 daño de fuego, salvación Destreza mitad), o Protector (1d8 + mod Int en puntos de golpe temporales a todos los aliados a 10 pies cada turno). Puedes moverlo 15 pies y dispararlo con tu acción adicional. Creas 1 gratis/descanso largo o gastando una ranura de conjuro de nivel 1+.'
        },
        {
          level: 5,
          name: 'Arma Arcana Tallada (Arcane Firearm)',
          desc: 'Tallas runas en una varita, bastón o cetro para convertirlo en tu arma de fuego arcana. Al lanzar un conjuro de artífice a través de él sumas 1d8 adicional a una de las tiradas de daño.'
        },
        {
          level: 9,
          name: 'Posición Explosiva (Explosive Cannon)',
          desc: 'El daño de todos tus cañones eldritch aumenta en 1d8 (hasta 3d8). Además, puedes autodetonar tu cañón como acción a 60 pies para infligir 3d8 de daño de fuerza en un radio de 20 pies (salvación Destreza mitad).'
        },
        {
          level: 15,
          name: 'Cañón Fortificado (Fortified Position)',
          desc: 'Tu cañón concede cobertura media (+2 CA y salvaciones de Destreza) a todos los aliados a 10 pies. Además, puedes manifestar dos cañones eldritch simultáneamente y disparar ambos con una sola acción adicional.'
        }
      ]
    },
    {
      id: 'herrero-batalla',
      name: 'Herrero de Batalla (Battle Smith)',
      description: 'Protectores marciales que combinan armas imbuidas con su mente y la leal asistencia de un Defensor de Acero mecánico.',
      features: [
        {
          level: 3,
          name: 'Competencias de Batalla',
          desc: 'Ganas competencia con armas marciales y herramientas de herrero.'
        },
        {
          level: 3,
          name: 'Conjuros de Herrero de Batalla (Battle Smith Spells)',
          desc: 'Tienes una lista de conjuros siempre preparados que no cuentan contra tu límite de preparación diaria: Nivel 3: Heroísmo, Escudo. Nivel 5: Castigo marcado, Vínculo de protección. Nivel 9: Aura de vitalidad, Conjurar descarga. Nivel 13: Aura de pureza, Castigo fulgurante. Nivel 17: Castigo desterrador, Curar heridas en masa.'
        },
        {
          level: 3,
          name: 'Armas de Batalla (Battle Ready)',
          desc: 'Cuando atacas con un arma mágica, puedes usar tu modificador de Inteligencia en lugar de Fuerza o Destreza para las tiradas de ataque y daño.'
        },
        {
          level: 3,
          name: 'Defensor de Acero (Steel Defender)',
          desc: 'Creas un leal compañero mecánico cuadrúpedo o bípedo que lucha a tu lado: CA 15 (17 a Nv 15), PG = 2 + Int mod + (5 × tu nivel de artífice), dados de golpe d8 iguales a tu nivel. Comparte tu iniciativa y actúa inmediatamente después de ti. Con tu acción adicional puedes ordenarle usar Golpe Contundente (1d8 + PB daño de fuerza) o Reparar (restaura 2d8 + PB PG, 3/descanso largo). Como reacción usa Desviar Ataque para imponer desventaja a ataques contra criaturas adyacentes a él (infligiendo 1d4 + Int daño de fuerza al atacante a Nv 15).'
        },
        {
          level: 5,
          name: 'Ataque Adicional (Extra Attack)',
          desc: 'Puedes atacar dos veces en lugar de una al tomar la acción de Atacar en tu turno.'
        },
        {
          level: 9,
          name: 'Sacudida Arcana (Arcane Jolt)',
          desc: 'Cuando tú o tu Defensor de Acero impactéis con un ataque, puedes canalizar energía mágica para infligir 2d6 de daño de fuerza adicional o curar 2d6 puntos de golpe a una criatura a 30 pies (Int mod veces/descanso largo).'
        },
        {
          level: 15,
          name: 'Defensor Perfeccionado (Improved Defender)',
          desc: 'El daño y curación de tu Sacudida Arcana aumenta a 4d6. Además, tu Defensor de Acero gana +2 a su Clase de Armadura (CA 17) y cuando usa Desviar Ataque inflige 1d4 + Int de daño de fuerza al atacante.'
        }
      ]
    }
  ],
  featuresByLevel: [
    { level: 1, name: 'Conocimiento Mágico (Magical Tinkering)', desc: 'Imbuyes una chispa de magia en pequeños objetos mundanos para hacerlos emitir luz tenue de 5 pies, reproducir un mensaje grabado, emitir olor o mostrar imágenes estáticas.' },
    { level: 1, name: 'Lanzamiento de Conjuros (Spellcasting)', desc: 'Lanzas conjuros de artífice mediante herramientas artesanales como foco. Puedes preparar una cantidad de conjuros igual a tu mod de Int + la mitad de tu nivel de artífice.' },
    { level: 2, name: 'Infundir Objeto (Infuse Item)', desc: 'Aprendes a imbuir objetos mundanos con magia permanente: armas mágicas +1, armaduras defensivas +1, mente enfocada, o réplicas de objetos maravillosos como Bolsa de Contención o Botas Aladas.' },
    { level: 3, name: 'Especialización de Artífice', desc: 'Eliges tu especialización: Alquimista, Armero, Artillero o Herrero de Batalla, desbloqueando rasgos únicos a niveles 3, 5, 9 y 15.' },
    { level: 3, name: 'La Herramienta Adecuada para el Trabajo', desc: 'Puedes manifestar mágicamente cualquier juego de herramientas de artesano que necesites tras 1 hora de trabajo concentrado.' },
    { level: 4, name: 'Mejora de Característica o Dote', desc: 'Aumentas una característica en 2, dos en 1, o seleccionas una Dote oficial de D&D 5e.' },
    { level: 5, name: 'Rasgo de Especialización', desc: 'Obtienes un nuevo rasgo otorgado por tu especialización elegida (Ataque Adicional o bonificador a conjuros).' },
    { level: 6, name: 'Pericia con Herramientas (Tool Expertise)', desc: 'Tu bonificador de competencia se duplica para cualquier prueba de característica que emplee tu competencia con cualquier herramienta.' },
    { level: 7, name: 'Destello de Genio (Flash of Genius)', desc: 'Como reacción cuando tú o una criatura que puedas ver a 30 pies haga una prueba de característica o salvación, puedes sumar tu modificador de Inteligencia a la tirada (Int mod veces/descanso largo).' },
    { level: 8, name: 'Mejora de Característica o Dote', desc: 'Aumentas una característica en 2, dos en 1, o seleccionas una Dote oficial de D&D 5e.' },
    { level: 9, name: 'Rasgo de Especialización', desc: 'Obtienes una mejora de combate o potencia curativa de tu especialización.' },
    { level: 10, name: 'Adepto de Objetos Mágicos', desc: 'Puedes sintonizarte con hasta 4 objetos mágicos simultáneamente y fabricar objetos mágicos comunes y poco comunes en una cuarta parte del tiempo normal.' },
    { level: 11, name: 'Objeto de Almacenamiento de Conjuros', desc: 'Puedes imbuir un conjuro de nivel 1 o 2 en un arma o foco: cualquier criatura que lo sostenga puede usar una acción para lanzar ese conjuro hasta un número de veces igual al doble de tu modificador de Inteligencia.' },
    { level: 12, name: 'Mejora de Característica o Dote', desc: 'Aumentas una característica en 2, dos en 1, o seleccionas una Dote oficial de D&D 5e.' },
    { level: 14, name: 'Erudito de Objetos Mágicos', desc: 'Puedes sintonizarte con hasta 5 objetos mágicos a la vez e ignoras todos los requisitos de clase, raza, conjuro y nivel para sintonizarte con ellos.' },
    { level: 15, name: 'Rasgo de Especialización Supremo', desc: 'Desbloqueas el rasgo final legendario de tu especialización de artífice.' },
    { level: 16, name: 'Mejora de Característica o Dote', desc: 'Aumentas una característica en 2, dos en 1, o seleccionas una Dote oficial de D&D 5e.' },
    { level: 18, name: 'Maestro de Objetos Mágicos', desc: 'Puedes sintonizarte con hasta 6 objetos mágicos simultáneamente.' },
    { level: 19, name: 'Mejora de Característica o Dote', desc: 'Aumentas una característica en 2, dos en 1, o seleccionas una Dote oficial de D&D 5e.' },
    { level: 20, name: 'Alma de Artífice (Soul of Artifice)', desc: 'Ganas un bonificador de +1 a todas tus tiradas de salvación por cada objeto mágico con el que estés sintonizado (hasta +6). Además, si caes a 0 PG puedes usar tu reacción para destruir una infusión y quedar a 1 PG en su lugar.' }
  ]
};
