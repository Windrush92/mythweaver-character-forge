// Compendio Completo de Razas y Subrazas de D&D 5e (Wikidot & Fuentes Oficiales)
// Incluye Razas Comunes, Poco Comunes, Monstruosas, Exóticas, Dragonmarks de Eberron,
// Linajes de Wildemount, Spelljammer, Dragonlance, Strixhaven, Ravnica, Theros y Plane Shift.

export interface InnateSpellEntry {
  spellName: string;
  requiredLevel: number;
  traitName?: string;
  castingTime?: string;
  notes?: string;
}

export interface RacialSpellcastingConfig {
  abilityChoices?: ('int' | 'wis' | 'cha')[];
  defaultAbility?: 'int' | 'wis' | 'cha' | 'con' | 'dex' | 'str';
  hasCantripChoice?: boolean;
  cantripChoiceClass?: string;
  cantripChoiceCount?: number;
}

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
  innateSpells?: InnateSpellEntry[];
  spellcastingConfig?: RacialSpellcastingConfig;
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
  innateSpells?: InnateSpellEntry[];
  spellcastingConfig?: RacialSpellcastingConfig;
  subraces?: WikidotSubrace[];
}

export const WIKIDOT_RACES: WikidotRace[] = [
  {
    "id": "humano",
    "name": "Humano",
    "category": "Común",
    "description": "Los humanos son la más adaptable, diversa y ambiciosa de las razas comunes. Sus aspiraciones van desde la forja de imperios hasta la maestría de artes arcanas universales.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {},
    "traits": [
      {
        "name": "Versatilidad Humana",
        "desc": "Los humanos poseen una prodigiosa adaptabilidad e ingenio en cualquier disciplina o profesión."
      },
      {
        "name": "Idiomas",
        "desc": "Puedes hablar, leer y escribir Común y un idioma adicional a tu elección."
      }
    ],
    "languages": [
      "Común",
      "Uno adicional"
    ],
    "subraces": [
      {
        "id": "humano-estandar",
        "name": "Humano Estándar (PHB)",
        "description": "La estirpe clásica y generalista de la humanidad: equilibrada en todas sus facultades físicas y mentales.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "str": 1,
          "dex": 1,
          "con": 1,
          "int": 1,
          "wis": 1,
          "cha": 1
        },
        "traits": [
          {
            "name": "Puntuaciones Universales",
            "desc": "Tus seis puntuaciones de característica aumentan en +1 cada una (+1 FUE, +1 DES, +1 CON, +1 INT, +1 SAB, +1 CAR)."
          },
          {
            "name": "Idioma Extra",
            "desc": "Aprendes un idioma adicional a tu elección."
          }
        ]
      },
      {
        "id": "humano-variante",
        "name": "Humano (Variante - PHB)",
        "description": "Especializado y curtido en un área particular desde sus inicios gracias a su talento y enfoque extraordinario.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "any": 2
        },
        "traits": [
          {
            "name": "Características a Elección",
            "desc": "Dos puntuaciones de característica diferentes a tu elección aumentan en +1."
          },
          {
            "name": "Dote Adicional a Nivel 1",
            "desc": "Ganas una Dote oficial de D&D 5e a tu elección desde el inicio de la campaña."
          },
          {
            "name": "Habilidad Adicional",
            "desc": "Ganas competencia en una habilidad a tu elección."
          }
        ]
      },
      {
        "id": "humano-marca-hallazgo",
        "name": "Marca del Hallazgo (Mark of Finding - Eberron)",
        "description": "Humanos tocados por el dragón con un don instintivo insuperable para rastrear presas, personas y objetos perdidos.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "wis": 2,
          "con": 1
        },
        "traits": [
          {
            "name": "Visión en la Oscuridad",
            "desc": "Puedes ver en la penumbra a 60 pies como si hubiera luz brillante, y en la oscuridad como en penumbra."
          },
          {
            "name": "Sentido del Cazador",
            "desc": "Añades un dado 1d4 a tus pruebas de Sabiduría (Percepción) y Sabiduría (Supervivencia)."
          },
          {
            "name": "Magia de Rastreo",
            "desc": "Puedes lanzar Fuego Feérico una vez por descanso largo. A nivel 3 lanzas Localizar Animales o Plantas como ritual (Sabiduría)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Fuego Feérico",
            "requiredLevel": 1
          },
          {
            "spellName": "Localizar Animales o Plantas",
            "requiredLevel": 3
          }
        ]
      },
      {
        "id": "humano-marca-manejo",
        "name": "Marca del Manejo (Mark of Handling - Eberron)",
        "description": "Vástagos de la Casa Vadalis con afinidad psíquica y empática con bestias, monturas y la vida salvaje.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "wis": 2,
          "any": 1
        },
        "traits": [
          {
            "name": "Afinidad Salvaje",
            "desc": "Añades 1d4 a tus pruebas de Sabiduría (Trato con Animales) e Inteligencia (Naturaleza)."
          },
          {
            "name": "Conexión Primigenia",
            "desc": "Puedes lanzar Amistad con Animales y Hablar con Animales una vez por descanso largo cada uno."
          },
          {
            "name": "El Poder Mayor",
            "desc": "Puedes elegir como objetivo de Amistad con Animales y Hablar con Animales a una Monstruosidad si su INT es 3 o menor."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Amistad con Animales",
            "requiredLevel": 1
          },
          {
            "spellName": "Hablar con los Animales",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "humano-marca-creacion",
        "name": "Marca de la Creación (Mark of Making - Eberron)",
        "description": "Miembros de la Casa Cannith nacidos con el don innato de la forja, el artificio y la reparación mágica.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "int": 2,
          "any": 1
        },
        "traits": [
          {
            "name": "Intuición del Artesano",
            "desc": "Añades 1d4 a tus pruebas de Inteligencia (Conocimiento Arcano) y pruebas con herramientas de artesano."
          },
          {
            "name": "Don del Creador",
            "desc": "Ganas competencia con un tipo de herramientas de artesano a tu elección."
          },
          {
            "name": "Truco del Forjador",
            "desc": "Conoces el truco Remendar (Mending)."
          },
          {
            "name": "Infusión Temporal",
            "desc": "Como acción, tocas un objeto no mágico: un arma gana +1 al ataque y daño, o una armadura gana +1 a la CA durante 1 hora (1/descanso largo)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Remendar (Mending)",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "humano-marca-pasaje",
        "name": "Marca del Pasaje (Mark of Passage - Eberron)",
        "description": "Herederos de la Casa Orien bendecidos con velocidad sobrenatural, teletransporte y agilidad en las rutas.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "dex": 2,
          "any": 1
        },
        "traits": [
          {
            "name": "Paso Veloz",
            "desc": "Tu velocidad base al caminar aumenta a 35 pies."
          },
          {
            "name": "Huida Ágil",
            "desc": "Añades 1d4 a tus pruebas de Destreza (Acrobacias) y pruebas para operar o montar vehículos terrestres."
          },
          {
            "name": "Salto Mágico",
            "desc": "Puedes lanzar el conjuro Paso Brumoso (Misty Step) una vez por descanso largo (Destreza)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Paso Brumoso (Misty Step)",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "humano-marca-centinela",
        "name": "Marca del Centinela (Mark of Sentinel - Eberron)",
        "description": "Guardiães jurados de la Casa Deneith con el deber y la magia de interponerse entre el peligro y sus protegidos.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "con": 2,
          "wis": 1
        },
        "traits": [
          {
            "name": "Ojo Vigilante",
            "desc": "Añades 1d4 a tus pruebas de Sabiduría (Perspicacia) y Sabiduría (Percepción)."
          },
          {
            "name": "Escudo del Centinela",
            "desc": "Puedes lanzar el conjuro Escudo (Shield) una vez por descanso largo."
          },
          {
            "name": "Guardia Vigilante",
            "desc": "Cuando una criatura a 5 pies de ti recibe un ataque, puedes usar tu reacción para intercambiar lugares con ella y recibir el impacto en su lugar."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Escudo (Shield)",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "humano-kessig",
        "name": "Humano de Kessig (Innistrad)",
        "description": "Campesinos, leñadores y cazadores de las espesuras de Kessig, veloces y alertas contra bestias nocturnas.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "dex": 1,
          "wis": 1
        },
        "traits": [
          {
            "name": "Pies de Bosque",
            "desc": "Tu velocidad base al caminar es de 35 pies."
          },
          {
            "name": "Supervivencia Inquebrantable",
            "desc": "Ganas competencia en la habilidad Supervivencia."
          }
        ]
      },
      {
        "id": "humano-gavony",
        "name": "Humano de Gavony (Innistrad)",
        "description": "La cuna de la guardia parroquial y los templos de Innistrad; robustos, disciplinados y guiados por la fe.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "str": 1,
          "cha": 1
        },
        "traits": [
          {
            "name": "Temple Cívico",
            "desc": "Tienes ventaja en tiradas de salvación contra estar Asustado."
          },
          {
            "name": "Liderazgo Parroquial",
            "desc": "Ganas competencia en la habilidad Atletismo o Persuasión."
          }
        ]
      },
      {
        "id": "humano-nephalia",
        "name": "Humano de Nephalia (Innistrad)",
        "description": "Navegantes, comerciantes y contrabandistas de ciudades portuarias cubiertas de bruma marina.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "int": 1,
          "cha": 1
        },
        "traits": [
          {
            "name": "Ojo para los Negocios",
            "desc": "Ganas competencia en Engaño, Persuasión o Juego de Manos."
          },
          {
            "name": "Conocimiento Náutico",
            "desc": "Ganas competencia con herramientas de navegante o vehículos acuáticos."
          }
        ]
      },
      {
        "id": "humano-stensia",
        "name": "Humano de Stensia (Innistrad)",
        "description": "Habitantes de cumbres rocosas y valles sombríos acechados por vampiros; duros como el granito.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "str": 1,
          "con": 1
        },
        "traits": [
          {
            "name": "Espíritu Indómito",
            "desc": "Tus puntos de golpe máximos aumentan en +1, y aumentan en +1 cada vez que subes de nivel."
          },
          {
            "name": "Voluntad de Hierro",
            "desc": "Ganas competencia en la habilidad Intimidación o Atletismo."
          }
        ]
      }
    ]
  },
  {
    "id": "elfo",
    "name": "Elfo",
    "category": "Común",
    "description": "Criaturas mágicas de gracia sobrenatural que viven en el mundo terrenal con sentidos afilados y profunda afinidad con la magia ancestral.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "dex": 2
    },
    "traits": [
      {
        "name": "Sentidos Agudos",
        "desc": "Tienes competencia en la habilidad Percepción."
      },
      {
        "name": "Linaje Feérico",
        "desc": "Tienes ventaja en tiradas de salvación contra ser hechizado y la magia no puede dormirte."
      },
      {
        "name": "Trance",
        "desc": "No necesitas dormir; meditas profundamente durante 4 horas al día para obtener los beneficios de un descanso largo."
      }
    ],
    "languages": [
      "Común",
      "Élfico"
    ],
    "subraces": [
      {
        "id": "alto-elfo",
        "name": "Alto Elfo (High Elf)",
        "description": "Poseen mentes agudas y dominio de los principios mágicos arcanos.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Entrenamiento con Armas Élficas",
            "desc": "Competencia con espada larga, espada corta, arco corto y arco largo."
          },
          {
            "name": "Truco Arcano (Cantrip)",
            "desc": "Conoces un truco de tu elección de la lista de conjuros de Mago. La Inteligencia es tu aptitud mágica para este truco."
          }
        ],
        "spellcastingConfig": {
          "hasCantripChoice": true,
          "cantripChoiceClass": "Mago",
          "cantripChoiceCount": 1,
          "defaultAbility": "int"
        }
      },
      {
        "id": "elfo-bosques",
        "name": "Elfo de los Bosques (Wood Elf)",
        "description": "Rápidos y sigilosos habitantes de las selvas y arboledas antiguas.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Pies Ligeros",
            "desc": "Tu velocidad base al caminar aumenta a 35 pies."
          },
          {
            "name": "Máscara de la Naturaleza",
            "desc": "Puedes intentar esconderte incluso cuando solo estás ligeramente oscurecido por follaje, lluvia o nieve."
          }
        ]
      },
      {
        "id": "drow",
        "name": "Elfo Oscuro (Drow)",
        "description": "Habitantes del Inframundo (Underdark) adaptados a las sombras más densas.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Visión en la Oscuridad Superior",
            "desc": "Tu visión en la oscuridad tiene un radio de 120 pies."
          },
          {
            "name": "Sensibilidad a la Luz Solar",
            "desc": "Tienes desventaja en ataques y percepción cuando estás bajo luz solar directa."
          },
          {
            "name": "Magia Drow",
            "desc": "Conoces el truco Luces Danzantes (Dancing Lights). A partir del nivel 3 lanzas Fuego Feérico (Faerie Fire). A partir del nivel 5 lanzas Oscuridad (Darkness). Carisma es tu aptitud mágica."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Dancing Lights",
            "requiredLevel": 1
          },
          {
            "spellName": "Faerie Fire",
            "requiredLevel": 3,
            "notes": "1/descanso largo"
          },
          {
            "spellName": "Darkness",
            "requiredLevel": 5,
            "notes": "1/descanso largo"
          }
        ],
        "spellcastingConfig": {
          "abilityChoices": ["cha", "int", "wis"],
          "defaultAbility": "cha"
        }
      },
      {
        "id": "eladrin",
        "name": "Eladrin (Feywild)",
        "description": "Criaturas de pura magia feérica ligadas a los estados de ánimo de las cuatro estaciones de las Tierras Salvajes de las Hadas.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Paso Feérico Estacional",
            "desc": "Como acción adicional te teletransportas mágicamente hasta 30 pies a un espacio desocupado (usos = bono de competencia por descanso largo)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Paso Brumoso (Misty Step)",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "elfo-marino",
        "name": "Elfo Marino (Sea Elf)",
        "description": "Nacidos para habitar los arrecifes y las profundidades oceánicas en comunión con la fauna marina.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Hijo del Mar",
            "desc": "Tienes una velocidad de nado de 30 pies y puedes respirar tanto aire como agua."
          },
          {
            "name": "Amigo del Mar",
            "desc": "Puedes comunicar ideas sencillas a cualquier bestia con velocidad de nado."
          },
          {
            "name": "Resistencia al Frío",
            "desc": "Tienes resistencia al daño por frío."
          }
        ]
      },
      {
        "id": "shadar-kai",
        "name": "Shadar-kai (Shadowfell)",
        "description": "Elfos vinculados a los dominios sombríos de la Reina Cuervo en el Páramo Sombrío, curtidos en la muerte y el estoicismo.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Bendición de la Reina Cuervo",
            "desc": "Como acción adicional te teletransportas hasta 30 pies a un espacio desocupado. A partir de nivel 3 ganas resistencia a todo daño hasta el inicio de tu siguiente turno."
          },
          {
            "name": "Resistencia Necrótica",
            "desc": "Tienes resistencia al daño necrótico."
          }
        ]
      },
      {
        "id": "elfo-palido",
        "name": "Elfo Pálido (Pallid Elf)",
        "description": "Místicos de tez de luna y ojos penetrantes bendecidos por la luz de la Sehanine en Exandria.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Sentidos Incisivos",
            "desc": "Tienes ventaja en todas las pruebas de Perspicacia y de Investigación."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Luz (Light)",
            "requiredLevel": 1
          },
          {
            "spellName": "Dormir (Sleep)",
            "requiredLevel": 3
          },
          {
            "spellName": "Invisibilidad",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "elfo-astral",
        "name": "Elfo Astral (Astral Elf)",
        "description": "Viajeros eternos del Mar Astral imbuidos de la chispa cósmica de los cielos y luz estelar.",
        "abilityScoreBonuses": {
          "any": 1
        },
        "traits": [
          {
            "name": "Paso de Luz Estelar",
            "desc": "Como acción adicional te teletransportas hasta 30 pies a un espacio desocupado que veas (usos = bono de competencia)."
          },
          {
            "name": "Fuego Astral",
            "desc": "Conoces un truco entre Luz Sagrada, Saeta de Fuego o Luces Danzantes a tu elección."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Luz Sagrada (Sacred Flame)",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "elfo-marca-sombra",
        "name": "Marca de la Sombra (Mark of Shadow - Eberron)",
        "description": "Elfos de la Casa Phiarlan y Thuranni con dominio innato del engaño visual, el sigilo y la magia de ilusión.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Astucia de las Sombras",
            "desc": "Añades 1d4 a tus pruebas de Destreza (Sigilo) y Carisma (Interpretación)."
          },
          {
            "name": "Forma Ilusoria",
            "desc": "Conoces el truco Ilusión Menor. A nivel 3 puedes lanzar Invisibilidad una vez por descanso largo (Carisma)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Ilusión Menor (Minor Illusion)",
            "requiredLevel": 1
          },
          {
            "spellName": "Invisibilidad",
            "requiredLevel": 3
          }
        ]
      },
      {
        "id": "elfo-avariel",
        "name": "Avariel (Elfo Alado - UA)",
        "description": "Raros elfos alados de las altas cumbres con grandes alas emplumadas y espíritu libre.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Vuelo de Avariel",
            "desc": "Posees una velocidad de vuelo de 30 pies. No puedes volar si vistes armadura media o pesada."
          }
        ]
      },
      {
        "id": "elfo-grugach",
        "name": "Grugach (Elfo Salvaje - UA)",
        "description": "Aislacionistas nómadas de las junglas primarias que desprecian a extraños y dominan la magia druídica.",
        "abilityScoreBonuses": {
          "str": 1
        },
        "traits": [
          {
            "name": "Magia Primitiva",
            "desc": "Conoces un truco de la lista de conjuros de Druida a tu elección (Sabiduría)."
          },
          {
            "name": "Armas de la Jungla",
            "desc": "Competencia con lanza, jabalina, arco corto y red."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Shillelagh (Bordón)",
            "requiredLevel": 1
          }
        ]
      }
    ]
  },
  {
    "id": "enano",
    "name": "Enano (Dwarf)",
    "category": "Común",
    "description": "Fuertes, resistentes y tenaces, los enanos son maestros de la minería, la forja y la guerra subterránea.",
    "speed": "25 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "con": 2
    },
    "traits": [
      {
        "name": "Resistencia Enana",
        "desc": "Ventaja en salvaciones contra veneno y resistencia al daño por veneno."
      },
      {
        "name": "Entrenamiento de Combate Enano",
        "desc": "Competencia con hacha de guerra, hacha de mano, martillo ligero y martillo de guerra."
      },
      {
        "name": "Afinidad con la Piedra",
        "desc": "Añades el doble de tu bonificador de competencia a pruebas de Historia relacionadas con albañilería o piedra."
      }
    ],
    "languages": [
      "Común",
      "Enano"
    ],
    "subraces": [
      {
        "id": "enano-colinas",
        "name": "Enano de las Colinas (Hill Dwarf)",
        "description": "Tienen sentidos agudos, intuición profunda y vitalidad prodigiosa.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Dureza Enana",
            "desc": "Tu máximo de puntos de golpe aumenta en 1, y aumenta en 1 cada vez que subes de nivel."
          }
        ]
      },
      {
        "id": "enano-montanas",
        "name": "Enano de las Montañas (Mountain Dwarf)",
        "description": "Fuertes y robustos guerreros criados en ciudadelas escarpadas.",
        "abilityScoreBonuses": {
          "str": 2
        },
        "traits": [
          {
            "name": "Entrenamiento con Armadura Enana",
            "desc": "Tienes competencia con armaduras ligeras y medias."
          }
        ]
      },
      {
        "id": "duergar",
        "name": "Duergar / Enano Gris (Underdark)",
        "description": "Moradores de las profundidades subterráneas imbuidos de magia psiónica y sigilo de piedra.",
        "abilityScoreBonuses": {
          "str": 1
        },
        "traits": [
          {
            "name": "Visión en la Oscuridad Superior",
            "desc": "Tu visión en la oscuridad tiene un alcance de 120 pies."
          },
          {
            "name": "Resiliencia Duergar",
            "desc": "Tienes ventaja en tiradas de salvación contra ilusiones, parálisis y ser hechizado."
          },
          {
            "name": "Sensibilidad a la Luz Solar",
            "desc": "Desventaja en ataques y percepción en luz solar directa."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Agrandar / Reducir (Enlarge)",
            "requiredLevel": 3
          },
          {
            "spellName": "Invisibilidad",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "enano-marca-custodia",
        "name": "Marca de la Custodia (Mark of Warding - Eberron)",
        "description": "Miembros de la Casa Kundarak con magia protectora para sellar bóvedas, puertas y repeler intrusos.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Custodio Experto",
            "desc": "Añades 1d4 a tus pruebas de Inteligencia (Investigación) y pruebas con herramientas de ladrón."
          },
          {
            "name": "Magia de Guardia",
            "desc": "Puedes lanzar Alarma como ritual. A nivel 3 puedes lanzar Armadura de Agathys una vez por descanso largo (Inteligencia)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Alarma",
            "requiredLevel": 1
          },
          {
            "spellName": "Armadura de Agathys",
            "requiredLevel": 3
          }
        ]
      },
      {
        "id": "enano-kaladesh",
        "name": "Enano de Kaladesh (Plane Shift)",
        "description": "Arquitectos e ingenieros infatigables que construyen ingenios prodigiosos impulsados por éter.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Artesanía de Filigrana",
            "desc": "Ganas competencia con dos herramientas de artesano a tu elección."
          },
          {
            "name": "Entusiasmo Laborioso",
            "desc": "Ventaja en pruebas de característica para diseñar o reparar mecanismos."
          }
        ]
      }
    ]
  },
  {
    "id": "mediano",
    "name": "Mediano (Halfling)",
    "category": "Común",
    "description": "Un pueblo pequeño, alegre y hogareño cuya suerte legendaria los salva de los peligros más insospechados.",
    "speed": "25 pies",
    "size": "Pequeño",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2
    },
    "traits": [
      {
        "name": "Afortunado (Lucky)",
        "desc": "Cuando saques un 1 natural en un d20 para tirada de ataque, prueba o salvación, puedes volver a tirar el dado y usar el nuevo resultado."
      },
      {
        "name": "Valiente (Brave)",
        "desc": "Tienes ventaja en tiradas de salvación contra estar asustado."
      },
      {
        "name": "Agilidad de Mediano",
        "desc": "Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño mayor que el tuyo."
      }
    ],
    "languages": [
      "Común",
      "Mediano"
    ],
    "subraces": [
      {
        "id": "mediano-piesligeros",
        "name": "Piesligeros (Lightfoot)",
        "description": "Expertos en esconderse y pasar inadvertidos tras criaturas más grandes.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Sigiloso por Naturaleza",
            "desc": "Puedes intentar esconderte incluso cuando solo estás tapado por una criatura al menos un tamaño mayor que tú."
          }
        ]
      },
      {
        "id": "mediano-fornido",
        "name": "Fornido (Stout)",
        "description": "Más robustos y con sangre enana en sus antepasados, resistentes al veneno.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Resistencia de Fornido",
            "desc": "Ventaja en salvaciones contra veneno y resistencia al daño de veneno."
          }
        ]
      },
      {
        "id": "mediano-fantasmal",
        "name": "Mediano Fantasmal (Ghostwise)",
        "description": "Clanes esquivos y nómadas con una profunda conexión telepática ancestral.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Telepatía Silenciosa",
            "desc": "Puedes hablar telepáticamente con cualquier criatura a 30 pies de ti que comparta al menos un idioma contigo."
          }
        ]
      },
      {
        "id": "mediano-lotusden",
        "name": "Mediano Lotusden (Wildemount)",
        "description": "Habitantes de bosques indómitos que canalizan los secretos botánicos del bosque.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Caminante de la Selva",
            "desc": "No dejas rastros al viajar por terreno natural boscoso y el terreno difícil natural no te ralentiza."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Druidcraft",
            "requiredLevel": 1
          },
          {
            "spellName": "Enredadera (Entangle)",
            "requiredLevel": 3
          },
          {
            "spellName": "Crecimiento Espinoso (Spike Growth)",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "mediano-marca-curacion",
        "name": "Marca de la Curación (Mark of Healing - Eberron)",
        "description": "Sanadores natos de la Casa Jorasco con dones restaurativos legendarios en tiempos de guerra.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Toque Sanador",
            "desc": "Añades 1d4 a tus pruebas de Sabiduría (Medicina) y Destreza (Juego de Manos)."
          },
          {
            "name": "Magia de Sanación",
            "desc": "Puedes lanzar Curar Heridas una vez por descanso largo. A nivel 3 lanzas Restablecimiento Menor (Sabiduría)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Curar Heridas",
            "requiredLevel": 1
          },
          {
            "spellName": "Restablecimiento Menor",
            "requiredLevel": 3
          }
        ]
      },
      {
        "id": "mediano-marca-hospitalidad",
        "name": "Marca de la Hospitalidad (Mark of Hospitality - Eberron)",
        "description": "Anfitriones insuperables de la Casa Ghallanda que infunden confort, refugio y bienestar.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Amigo de Todos",
            "desc": "Añades 1d4 a tus pruebas de Carisma (Persuasión) y pruebas con útiles de cocinero o cervecería."
          },
          {
            "name": "Hogar Acogedor",
            "desc": "Conoces el truco Prestidigitación. Puedes lanzar Purificar Comida y Bebida o Buenas Bayas una vez por descanso largo (Carisma)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Prestidigitación",
            "requiredLevel": 1
          },
          {
            "spellName": "Buenas Bayas (Goodberry)",
            "requiredLevel": 1
          }
        ]
      }
    ]
  },
  {
    "id": "tiflin",
    "name": "Tiflin (Tiefling)",
    "category": "Común",
    "description": "Marcados por un linaje infernal derivado del pacto de sus antepasados, los tiflin portan cuernos, colas y un dominio innato de la magia arcana de los Nueve Infiernos.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "cha": 2
    },
    "traits": [
      {
        "name": "Resistencia Infernal",
        "desc": "Tienes resistencia al daño por fuego."
      }
    ],
    "languages": [
      "Común",
      "Infernal"
    ],
    "spellcastingConfig": {
      "abilityChoices": ["cha", "int", "wis"],
      "defaultAbility": "cha"
    },
    "subraces": [
      {
        "id": "tiflin-asmodeus",
        "name": "Linaje de Asmodeus (Estándar)",
        "description": "El linaje señorial de Nessus que comanda el fuego del orgullo y el engaño.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Legado de Nessus",
            "desc": "Conoces Taumaturgia. A nivel 3 lanzas Reprensión Infernal y a nivel 5 Oscuridad."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Taumaturgia",
            "requiredLevel": 1
          },
          {
            "spellName": "Reprensión Infernal",
            "requiredLevel": 3
          },
          {
            "spellName": "Oscuridad",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-baalzebul",
        "name": "Linaje de Baalzebul (Maladomini)",
        "description": "Gobernantes de la decadencia y la corrupción que doblegan voluntades.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Legado de Maladomini",
            "desc": "Conoces Taumaturgia. A nivel 3 lanzas Rayo de Enfermedad y a nivel 5 Corona de Locura."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Taumaturgia",
            "requiredLevel": 1
          },
          {
            "spellName": "Rayo de Enfermedad (Ray of Sickness)",
            "requiredLevel": 3
          },
          {
            "spellName": "Corona de Locura",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-dispater",
        "name": "Linaje de Dispater (Dis)",
        "description": "Espías magistrales y carceleros de la ciudad de hierro de Dis.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Legado de Dis",
            "desc": "Conoces Taumaturgia. A nivel 3 lanzas Disfrazarse y a nivel 5 Detectar Pensamientos."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Taumaturgia",
            "requiredLevel": 1
          },
          {
            "spellName": "Disfrazarse",
            "requiredLevel": 3
          },
          {
            "spellName": "Detectar Pensamientos",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-fierna",
        "name": "Linaje de Fierna (Phlegethos)",
        "description": "Maestros de la oratoria ardiente y la seducción apasionada.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Legado de Phlegethos",
            "desc": "Conoces Amigos. A nivel 3 lanzas Hechizar Persona y a nivel 5 Sugestión."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Amigos (Friends)",
            "requiredLevel": 1
          },
          {
            "spellName": "Hechizar Persona",
            "requiredLevel": 3
          },
          {
            "spellName": "Sugestión",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-glasya",
        "name": "Linaje de Glasya (Malbolge)",
        "description": "Rebeldes, ladrones y artistas del engaño de la prisión de Malbolge.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Legado de Malbolge",
            "desc": "Conoces Ilusión Menor. A nivel 3 lanzas Disfrazarse y a nivel 5 Invisibilidad."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Ilusión Menor",
            "requiredLevel": 1
          },
          {
            "spellName": "Disfrazarse",
            "requiredLevel": 3
          },
          {
            "spellName": "Invisibilidad",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-levistus",
        "name": "Linaje de Levistus (Stygia)",
        "description": "Supervivientes indomables del iceberg eterno de Stygia.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Legado de Stygia",
            "desc": "Conoces Rayo de Escarcha. A nivel 3 lanzas Armadura de Agathys y a nivel 5 Oscuridad."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Rayo de Escarcha",
            "requiredLevel": 1
          },
          {
            "spellName": "Armadura de Agathys",
            "requiredLevel": 3
          },
          {
            "spellName": "Oscuridad",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-mammon",
        "name": "Linaje de Mammon (Minauros)",
        "description": "Acarreadores de oro, codicia y artefactos valiosos de los pantanos de Minauros.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Legado de Minauros",
            "desc": "Conoces Mano de Mago. A nivel 3 lanzas Disco Flotante de Tenser y a nivel 5 Cierre Arcano."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Mano de Mago",
            "requiredLevel": 1
          },
          {
            "spellName": "Disco Flotante de Tenser",
            "requiredLevel": 3
          },
          {
            "spellName": "Cierre Arcano",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-mefistofeles",
        "name": "Linaje de Mefistófeles (Cania)",
        "description": "Eruditos del fuego infernal y la magia pura del glaciar de Cania.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Legado de Cania",
            "desc": "Conoces Mano de Mago. A nivel 3 lanzas Manos Ardientes y a nivel 5 Hoja Llameante."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Mano de Mago",
            "requiredLevel": 1
          },
          {
            "spellName": "Manos Ardientes",
            "requiredLevel": 3
          },
          {
            "spellName": "Hoja Llameante (Flame Blade)",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-zariel",
        "name": "Linaje de Zariel (Avernus)",
        "description": "Guerreros implacables de la primera línea de la Guerra de la Sangre en Avernus.",
        "abilityScoreBonuses": {
          "str": 1
        },
        "traits": [
          {
            "name": "Legado de Avernus",
            "desc": "Conoces Taumaturgia. A nivel 3 lanzas Castigo Abrasador y a nivel 5 Castigo Marcador."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Taumaturgia",
            "requiredLevel": 1
          },
          {
            "spellName": "Castigo Abrasador",
            "requiredLevel": 3
          },
          {
            "spellName": "Castigo Marcador",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "tiflin-alado",
        "name": "Tiflin Alado (Feral / Winged)",
        "description": "Poseen grandes alas de murciélago curtidas en lugar de la magia innata infernal.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Alas Infernales",
            "desc": "Tienes una velocidad de vuelo de 30 pies mientras no lleves armadura pesada (reemplaza el legado de conjuros)."
          }
        ]
      },
      {
        "id": "tiflin-abisal",
        "name": "Tiflin Abisal (Abyssal - UA)",
        "description": "Tocados por el caos del Abismo en lugar de los Nueve Infiernos; mutables y resistentes.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "cha": 2,
          "con": 1
        },
        "traits": [
          {
            "name": "Vitalidad Abisal",
            "desc": "Tus puntos de golpe máximos aumentan en la mitad de tu nivel de personaje (mínimo 1)."
          },
          {
            "name": "Magia de los Pozos",
            "desc": "En cada descanso largo tiras 1d6 para determinar qué truco y conjuro puedes lanzar durante ese día."
          }
        ]
      }
    ]
  },
  {
    "id": "draconido",
    "name": "Dracónido (Dragonborn)",
    "category": "Común",
    "description": "Nacidos de los dragones, los dracónidos caminan con orgullo por el mundo con escamas brillantes, honor marcial y un arma de aliento elemental demoledora.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2
    },
    "traits": [
      {
        "name": "Arma de Aliento",
        "desc": "Puedes usar tu acción para exhalar energía destructiva elemental (2d6 daño a nivel 1, 3d6 a nivel 6, 4d6 a nivel 11, 5d6 a nivel 16). CD 8 + prof + Con. 1/descanso corto."
      },
      {
        "name": "Resistencia al Daño",
        "desc": "Tienes resistencia al tipo de daño asociado a tu ancestro dracónico."
      }
    ],
    "languages": [
      "Común",
      "Dracónico"
    ],
    "subraces": [
      {
        "id": "draco-rojo",
        "name": "Dracónido Rojo (Fuego)",
        "description": "Aliento de Fuego (Cono de 15 pies, Salvación de Destreza). Resistencia al daño de Fuego.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Rojo",
            "desc": "Fuego - Cono 15 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-azul",
        "name": "Dracónido Azul (Relámpago)",
        "description": "Aliento de Relámpago (Línea de 30x5 pies, Salvación de Destreza). Resistencia al daño de Relámpago.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Azul",
            "desc": "Relámpago - Línea 30x5 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-verde",
        "name": "Dracónido Verde (Veneno)",
        "description": "Aliento de Veneno (Cono de 15 pies, Salvación de Constitución). Resistencia al daño de Veneno.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Verde",
            "desc": "Veneno - Cono 15 pies (Salvación CON)."
          }
        ]
      },
      {
        "id": "draco-negro",
        "name": "Dracónido Negro (Ácido)",
        "description": "Aliento de Ácido (Línea de 30x5 pies, Salvación de Destreza). Resistencia al daño de Ácido.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Negro",
            "desc": "Ácido - Línea 30x5 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-blanco",
        "name": "Dracónido Blanco (Frío)",
        "description": "Aliento de Frío (Cono de 15 pies, Salvación de Constitución). Resistencia al daño de Frío.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Blanco",
            "desc": "Frío - Cono 15 pies (Salvación CON)."
          }
        ]
      },
      {
        "id": "draco-oro",
        "name": "Dracónido de Oro (Fuego Metálico)",
        "description": "Aliento de Fuego (Cono de 15 pies, Salvación de Destreza). Resistencia al daño de Fuego.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Oro",
            "desc": "Fuego - Cono 15 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-plata",
        "name": "Dracónido de Plata (Frío Metálico)",
        "description": "Aliento de Frío (Cono de 15 pies, Salvación de Constitución). Resistencia al daño de Frío.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Plata",
            "desc": "Frío - Cono 15 pies (Salvación CON)."
          }
        ]
      },
      {
        "id": "draco-bronce",
        "name": "Dracónido de Bronce (Relámpago Metálico)",
        "description": "Aliento de Relámpago (Línea de 30x5 pies, Salvación de Destreza). Resistencia al Relámpago.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Bronce",
            "desc": "Relámpago - Línea 30x5 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-cobre",
        "name": "Dracónido de Cobre (Ácido Metálico)",
        "description": "Aliento de Ácido (Línea de 30x5 pies, Salvación de Destreza). Resistencia al Ácido.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Cobre",
            "desc": "Ácido - Línea 30x5 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-oropel",
        "name": "Dracónido de Oropel / Latón (Fuego)",
        "description": "Aliento de Fuego (Línea de 30x5 pies, Salvación de Destreza). Resistencia al Fuego.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Ancestro Oropel",
            "desc": "Fuego - Línea 30x5 pies (Salvación DES)."
          }
        ]
      },
      {
        "id": "draco-amatista",
        "name": "Dracónido de Amatista (Gema - Fuerza)",
        "description": "Aliento de Energía de Fuerza (Fizban). A nivel 5 puedes manifestar vuelo espectral por 1 minuto.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Aliento de Fuerza",
            "desc": "Fuerza - Ráfaga telequinética y resistencia al daño de Fuerza."
          }
        ]
      },
      {
        "id": "draco-cristal",
        "name": "Dracónido de Cristal (Gema - Radiante)",
        "description": "Aliento de Luz Radiante cegadora (Fizban) y telepatía gema a 30 pies.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Aliento Radiante",
            "desc": "Radiante - Cono de 15 pies y resistencia al daño radiante."
          }
        ]
      },
      {
        "id": "draco-esmeralda",
        "name": "Dracónido de Esmeralda (Gema - Psíquico)",
        "description": "Aliento de Choque Psíquico (Fizban) y resistencia mental ante manipulaciones arcanas.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Aliento Psíquico",
            "desc": "Psíquico - Cono de 15 pies y resistencia al daño psíquico."
          }
        ]
      },
      {
        "id": "draco-zafiro",
        "name": "Dracónido de Zafiro (Gema - Trueno)",
        "description": "Aliento de Onda de Trueno acústica ensordecedora (Fizban) y sentidos de estrategia militar.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Aliento de Trueno",
            "desc": "Trueno - Cono de 15 pies y resistencia al daño de trueno."
          }
        ]
      },
      {
        "id": "draco-topacio",
        "name": "Dracónido de Topacio (Gema - Necrótico)",
        "description": "Aliento de Descomposición Necrótica (Fizban) y comprensión del ciclo de vida y muerte.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Aliento Necrótico",
            "desc": "Necrótico - Cono de 15 pies y resistencia al daño necrótico."
          }
        ]
      },
      {
        "id": "draco-ravenite",
        "name": "Dracónido Ravenite (Wildemount)",
        "description": "Linaje sin cola ni aliento de Exandria que forjó reflejos combativos salvajes ante el dolor.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Visión en la Oscuridad",
            "desc": "Posees visión en la oscuridad de 60 pies."
          },
          {
            "name": "Venganza Inmediata",
            "desc": "Cuando una criatura a tu alcance te daña, puedes usar tu reacción para atacarla con un arma cuerpo a cuerpo (1/descanso corto)."
          }
        ]
      },
      {
        "id": "draco-draconiano",
        "name": "Dracónido Draconiano (Dragonlance)",
        "description": "Descendientes de la magia de Krynn con alas membranosas para planear.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Planeo de Dragón",
            "desc": "Puedes usar tus alas para no sufrir daño de caída y planear 2 pies horizontalmente por cada pie descendido."
          }
        ]
      }
    ]
  },
  {
    "id": "semiorco",
    "name": "Semiorco (Half-Orc)",
    "category": "Común",
    "description": "Combinan la resistencia física indómita y la furia orca con el ingenio y adaptabilidad humana.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "str": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Menazante",
        "desc": "Ganas competencia en la habilidad Intimidación."
      },
      {
        "name": "Aguante Incansable",
        "desc": "Cuando te reduzcan a 0 puntos de golpe pero no mueras instantáneamente, puedes reducirte a 1 punto de golpe en su lugar (1 vez por descanso largo)."
      },
      {
        "name": "Ataques Salvajes",
        "desc": "Cuando consigas un impacto crítico con un arma cuerpo a cuerpo, tiras uno de los dados de daño del arma adicionalmente y lo sumas."
      }
    ],
    "languages": [
      "Común",
      "Orco"
    ],
    "subraces": [
      {
        "id": "semiorco-clasico",
        "name": "Semiorco Clásico (PHB)",
        "description": "La estirpe tradicional curtida en la frontera, forjada por el honor tribal y la supervivencia.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Furia Tribal",
            "desc": "Mantienes todas las facultades de aguante salvaje e intimidación innata del manual del jugador."
          }
        ]
      },
      {
        "id": "semiorco-marca-hallazgo",
        "name": "Marca del Hallazgo (Mark of Finding - Eberron)",
        "description": "Semiorcos de la Casa Tharashk con ojos místicos para rastrear tesoros, recompensas y criminales.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "wis": 2,
          "con": 1
        },
        "traits": [
          {
            "name": "Sentido del Cazador",
            "desc": "Añades 1d4 a tus pruebas de Sabiduría (Percepción) y Sabiduría (Supervivencia)."
          },
          {
            "name": "Magia de Rastreo",
            "desc": "Puedes lanzar Fuego Feérico una vez por descanso largo. A nivel 3 lanzas Localizar Animales o Plantas como ritual."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Fuego Feérico",
            "requiredLevel": 1
          },
          {
            "spellName": "Localizar Animales o Plantas",
            "requiredLevel": 3
          }
        ]
      }
    ]
  },
  {
    "id": "semielfo",
    "name": "Semielfo (Half-Elf)",
    "category": "Común",
    "description": "Caminan en dos mundos pero no pertenecen enteramente a ninguno. Curiosos, carismáticos y extraordinariamente adaptables.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "cha": 2,
      "any": 2
    },
    "traits": [
      {
        "name": "Linaje Feérico",
        "desc": "Ventaja en salvaciones contra ser hechizado y la magia no puede dormirte."
      },
      {
        "name": "Versatilidad de Características",
        "desc": "+2 a Carisma y +1 a otras dos puntuaciones de característica a tu elección."
      }
    ],
    "languages": [
      "Común",
      "Élfico",
      "Uno adicional"
    ],
    "subraces": [
      {
        "id": "semielfo-estandar",
        "name": "Semielfo Común (Versátil)",
        "description": "La variante clásica dotada de una amplia adaptabilidad mundana.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Versatilidad de Habilidades",
            "desc": "Ganas competencia en 2 habilidades adicionales a tu elección."
          }
        ]
      },
      {
        "id": "semielfo-bosques",
        "name": "Linaje Elfo de los Bosques",
        "description": "Descendientes de los elfos silvanos con agilidad y sigilo en la maleza.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Pies Ligeros o Máscara Natural",
            "desc": "Tu velocidad al caminar aumenta a 35 pies, o puedes intentar esconderte cuando estás ligeramente oscurecido por follaje o clima."
          }
        ]
      },
      {
        "id": "semielfo-alto",
        "name": "Linaje Alto Elfo",
        "description": "Herederos de la disciplina arcana de los altos elfos.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Truco Arcano",
            "desc": "Conoces un truco de la lista de conjuros de Mago a tu elección (usa Inteligencia)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Prestidigitación (o Saeta de Fuego)",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "semielfo-drow",
        "name": "Linaje Drow (Oscuro)",
        "description": "Herederos de la magia crepuscular del Inframundo.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Magia Drow Innata",
            "desc": "Conoces el truco Luces Danzantes. A nivel 3 lanzas Fuego Feérico y a nivel 5 Oscuridad."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Luces Danzantes",
            "requiredLevel": 1
          },
          {
            "spellName": "Fuego Feérico",
            "requiredLevel": 3
          },
          {
            "spellName": "Oscuridad",
            "requiredLevel": 5
          }
        ]
      },
      {
        "id": "semielfo-acuatico",
        "name": "Linaje Elfo Acuático",
        "description": "Herederos de los elfos marinos capaces de nadar a gran velocidad.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Velocidad de Nado",
            "desc": "Posees una velocidad de nado de 30 pies."
          }
        ]
      },
      {
        "id": "semielfo-marca-deteccion",
        "name": "Marca de la Detección (Mark of Detection - Eberron)",
        "description": "Miembros de la Casa Medani con un sexto sentido infalible para discernir la verdad, engaños y peligros ocultos.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "wis": 2,
          "any": 1
        },
        "traits": [
          {
            "name": "Ojo Perspicaz",
            "desc": "Añades 1d4 a tus pruebas de Inteligencia (Investigación) y Sabiduría (Perspicacia)."
          },
          {
            "name": "Sentido Mágico",
            "desc": "Puedes lanzar Detectar Magia y Detectar Venenos como rituales. A nivel 3 lanzas Ver lo Invisible (Sabiduría)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Detectar Magia",
            "requiredLevel": 1
          },
          {
            "spellName": "Ver lo Invisible",
            "requiredLevel": 3
          }
        ]
      },
      {
        "id": "semielfo-marca-tormenta",
        "name": "Marca de la Tormenta (Mark of Storm - Eberron)",
        "description": "Herederos de la Casa Lyrandar que dominan los cielos, las corrientes de aire y el clima marino.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "cha": 2,
          "dex": 1
        },
        "traits": [
          {
            "name": "Brisa de Navegante",
            "desc": "Añades 1d4 a tus pruebas de Destreza (Acrobacias) y pruebas con herramientas de navegante."
          },
          {
            "name": "Resistencia a la Tormenta",
            "desc": "Tienes resistencia al daño por relámpago."
          },
          {
            "name": "Magia del Viento",
            "desc": "Conoces el truco Ráfaga (Gust). Puedes lanzar Ráfaga de Viento (Gust of Wind) a nivel 3 (Carisma)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Ráfaga (Gust)",
            "requiredLevel": 1
          },
          {
            "spellName": "Ráfaga de Viento (Gust of Wind)",
            "requiredLevel": 3
          }
        ]
      }
    ]
  },
  {
    "id": "gnomo",
    "name": "Gnomo (Gnome)",
    "category": "Común",
    "description": "Criaturas diminutas llenas de entusiasmo, inventiva y curiosidad implacable por el funcionamiento del cosmos.",
    "speed": "25 pies",
    "size": "Pequeño",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "int": 2
    },
    "traits": [
      {
        "name": "Astucia Gnoma",
        "desc": "Tienes ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma contra magia."
      }
    ],
    "languages": [
      "Común",
      "Gnomo"
    ],
    "subraces": [
      {
        "id": "gnomo-rocas",
        "name": "Gnomo de las Rocas (Rock Gnome)",
        "description": "Inventores natos y mecánicos arcanos apasionados.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Conocimiento de Artífice",
            "desc": "Doble competencia en Historia sobre objetos mágicos u orfebrería mecánica."
          },
          {
            "name": "Artilugio",
            "desc": "Puedes crear juguetes mecánicos, encendedores y cajas de música funcionales."
          }
        ]
      },
      {
        "id": "gnomo-bosque",
        "name": "Gnomo del Bosque (Forest Gnome)",
        "description": "Tienen afinidad mágica con bestias pequeñas y dominan ilusiones sencillas.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Ilusionista Nato",
            "desc": "Conoces el truco Ilusión Menor (Inteligencia)."
          },
          {
            "name": "Hablar con Bestias Diminutas",
            "desc": "Puedes comunicar ideas sencillas a bestias de tamaño Pequeño o menor."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Minor Illusion",
            "requiredLevel": 1
          }
        ],
        "spellcastingConfig": {
          "defaultAbility": "int"
        }
      },
      {
        "id": "svirfneblin",
        "name": "Gnomo de las Profundidades (Svirfneblin)",
        "description": "Habitantes del Inframundo curtidos en la supervivencia subterránea y el sigilo entre piedras.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Visión en la Oscuridad Superior",
            "desc": "Tu visión en la oscuridad tiene un alcance de 120 pies."
          },
          {
            "name": "Camuflaje Pétreo",
            "desc": "Tienes ventaja en todas las pruebas de Destreza (Sigilo) para esconderte en terreno rocoso o subterráneo."
          }
        ]
      },
      {
        "id": "gnomo-marca-escritura",
        "name": "Marca de la Escritura (Mark of Scribing - Eberron)",
        "description": "Miembros de la Casa Sivis que comandan la comunicación a distancia, los pergaminos y los contratos arcanos.",
        "abilityScoreBonuses": {
          "cha": 1
        },
        "traits": [
          {
            "name": "Don del Escriba",
            "desc": "Añades 1d4 a tus pruebas de Inteligencia (Historia) y pruebas con herramientas de calígrafo."
          },
          {
            "name": "Mensajero Místico",
            "desc": "Conoces el truco Mensaje (Message). Puedes lanzar Comprender Idiomas como ritual. A nivel 3 lanzas Mensaje Arcano (Carisma)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Mensaje (Message)",
            "requiredLevel": 1
          },
          {
            "spellName": "Comprender Idiomas",
            "requiredLevel": 1
          }
        ]
      },
      {
        "id": "autognomo",
        "name": "Autognomo (Autognome - Spelljammer)",
        "description": "Autómatas mecánicos de latón y engranajes creados por gnomos de las rocas para explorar el espacio salvaje.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Construido para Triunfar",
            "desc": "Puedes sumar un dado 1d4 a cualquier tirada de ataque, prueba de característica o salvación (usos = bono de competencia)."
          },
          {
            "name": "Armadura Mecánica",
            "desc": "CA base de 13 + Destreza."
          },
          {
            "name": "Curación por Remendar",
            "desc": "El truco Remendar (Mending) te permite gastar un dado de golpe para recuperar puntos de golpe."
          }
        ]
      }
    ]
  },
  {
    "id": "goblin",
    "name": "Goblin (Trasgo)",
    "category": "Monstruosa",
    "description": "Pequeños, astutos y supervivientes natos que dominan la emboscada rápida y el escape escurridizo.",
    "speed": "30 pies",
    "size": "Pequeño",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "dex": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Escape Escurridizo (Nimble Escape)",
        "desc": "Puedes realizar la acción de Destrabarse o Esconderse como una acción adicional en cada uno de tus turnos."
      },
      {
        "name": "Furia del Pequeño (Fury of the Small)",
        "desc": "Cuando infliges daño a una criatura de un tamaño mayor que el tuyo, puedes causarle daño adicional igual a tu nivel de personaje (1 vez por descanso corto)."
      }
    ],
    "languages": [
      "Común",
      "Trasgo"
    ],
    "subraces": [
      {
        "id": "goblin-clasico",
        "name": "Goblin Clásico (Volo / MPMM)",
        "description": "La estirpe montaraz y audaz curtida en cavernas y campamentos nómadas.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Astucia de Emboscada",
            "desc": "Conserva el dominio de escape ágil y furia sorpresiva clásica."
          }
        ]
      },
      {
        "id": "goblin-dankwood",
        "name": "Goblin Dankwood (Wildemount)",
        "description": "Goblins que habitan en los pantanos y arboledas profundas de Exandria en armonía con pequeñas alimañas.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "dex": 2,
          "wis": 1
        },
        "traits": [
          {
            "name": "Hablar con Pequeñas Bestias",
            "desc": "Puedes comunicar ideas sencillas a bestias de tamaño Pequeño o menor a través de sonidos y gestos."
          }
        ]
      }
    ]
  },
  {
    "id": "hobgoblin",
    "name": "Hobgoblin",
    "category": "Monstruosa",
    "description": "Disciplinados soldados y estrategas de linaje trasgoide imbuidos de una rigurosa cultura marcial.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "con": 2,
      "int": 1
    },
    "traits": [
      {
        "name": "Entrenamiento Marcial",
        "desc": "Tienes competencia con dos armas marciales a tu elección y con armadura ligera."
      }
    ],
    "languages": [
      "Común",
      "Trasgo"
    ],
    "subraces": [
      {
        "id": "hobgoblin-marcial",
        "name": "Hobgoblin Marcial (Volo)",
        "description": "La legión tradicional forjada en la disciplina de hierro de la legión.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Salvar las Apariencias (Saving Face)",
            "desc": "Si fallas una tirada, puedes sumar un bono igual al número de aliados que veas a 30 pies (máximo +5). 1/descanso corto."
          }
        ]
      },
      {
        "id": "hobgoblin-feerico",
        "name": "Hobgoblin de la Corte Feérica (MPMM)",
        "description": "Herederos de la magia cortesana del Feywild con dones de camaradería y auxilio táctico.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "con": 2,
          "cha": 1
        },
        "traits": [
          {
            "name": "Don Feérico",
            "desc": "Puedes usar la acción de Ayuda como acción adicional (usos = bono de competencia). Otorga ventajas secundarias como velocidad o PG temporales."
          },
          {
            "name": "Fortuna de los Muchos",
            "desc": "Bono a tiradas falladas según aliados a 30 pies (máximo +3)."
          }
        ]
      }
    ]
  },
  {
    "id": "bugbear",
    "name": "Bugbear (Osgo)",
    "category": "Monstruosa",
    "description": "Depredadores corpulentos y sigilosos con extremidades desproporcionadamente largas capaces de golpear desde ángulos inesperados.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "str": 2,
      "dex": 1
    },
    "traits": [
      {
        "name": "Brazos Largos (Long-Limbed)",
        "desc": "Cuando realizas un ataque cuerpo a cuerpo durante tu turno, tu alcance para ese ataque aumenta en 5 pies."
      },
      {
        "name": "Complexión Poderosa (Powerful Build)",
        "desc": "Cuentas como un tamaño Grande para determinar tu capacidad de carga y levantamiento."
      },
      {
        "name": "Emboscador Furtivo (Sneaky)",
        "desc": "Tienes competencia en Sigilo. Si golpeas a una criatura que aún no ha actuado en el combate, infliges 2d6 daño extra."
      }
    ],
    "languages": [
      "Común",
      "Trasgo"
    ],
    "subraces": [
      {
        "id": "bugbear-clasico",
        "name": "Bugbear Clásico (Volo)",
        "description": "El merodeador tradicional de emboscadas cavernosas.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Fuerza Salvaje",
            "desc": "Conserva todas las facultades clásicas de emboscada contundente y brazos extensibles."
          }
        ]
      },
      {
        "id": "bugbear-feerico",
        "name": "Bugbear del Multiverso (MPMM)",
        "description": "Imbuido de la elasticidad sobrenatural y la protección mágica del Feywild.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Ascendencia Feérica",
            "desc": "Tienes ventaja en tiradas de salvación contra ser Hechizado."
          }
        ]
      }
    ]
  },
  {
    "id": "kobold",
    "name": "Kobold",
    "category": "Monstruosa",
    "description": "Reptilianos pequeños y tramposos vinculados a los dragones que prosperan en túneles subterráneos mediante el trabajo en equipo.",
    "speed": "30 pies",
    "size": "Pequeño",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "dex": 2
    },
    "traits": [
      {
        "name": "Naturaleza Dracónica",
        "desc": "Pequeños reptiles con sangre de sierpes ancestrales."
      }
    ],
    "languages": [
      "Común",
      "Dracónico"
    ],
    "subraces": [
      {
        "id": "kobold-clasico",
        "name": "Kobold Clásico (Volo)",
        "description": "El cazador de túneles tradicional experto en pelear en jauría.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Tácticas de Manada (Pack Tactics)",
            "desc": "Tienes ventaja en tiradas de ataque si al menos un aliado está a 5 pies del objetivo."
          },
          {
            "name": "Gemir y Arrastrarse",
            "desc": "Como acción distraes a los enemigos a 10 pies para que tus aliados tengan ventaja al atacarlos (1/descanso corto)."
          },
          {
            "name": "Sensibilidad a la Luz Solar",
            "desc": "Desventaja en ataques y percepción en luz solar directa."
          }
        ]
      },
      {
        "id": "kobold-multiverso",
        "name": "Kobold del Multiverso (MPMM / Fizban)",
        "description": "Heredero del poder dracónico sin penalizaciones por luz solar.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Rugido Dracónico (Draconic Cry)",
            "desc": "Como acción adicional emites un rugido: tú y tus aliados tienen ventaja en ataques contra enemigos a 10 pies hasta el final de tu siguiente turno (usos = bono de competencia)."
          },
          {
            "name": "Legado Dracónico",
            "desc": "Conoces un truco de Hechicero (Carisma) o tienes ventaja en salvaciones contra estar Asustado."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Rociada de Veneno (o Saeta de Fuego)",
            "requiredLevel": 1
          }
        ]
      }
    ]
  },
  {
    "id": "orco",
    "name": "Orco (Orc)",
    "category": "Monstruosa",
    "description": "Fieros guerreros bendecidos con una fuerza colosal y una resistencia indomable para asaltar el frente de combate.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "str": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Agresivo (Aggressive)",
        "desc": "Como acción adicional puedes moverte hasta tu velocidad directamente hacia una criatura hostil que veas."
      },
      {
        "name": "Complexión Poderosa",
        "desc": "Cuentas como Grande para capacidad de carga y levantamiento."
      },
      {
        "name": "Menazante",
        "desc": "Competencia en la habilidad Intimidación."
      }
    ],
    "languages": [
      "Común",
      "Orco"
    ],
    "subraces": [
      {
        "id": "orco-clasico",
        "name": "Orco Clásico (Volo / MPMM)",
        "description": "Los orgullosos guerreros con la bendición de resistencia salvaje de Gruumsh.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Resistencia Incansable",
            "desc": "Al caer a 0 PG pero no morir, te quedas en 1 PG en su lugar (1/descanso largo)."
          }
        ]
      },
      {
        "id": "orco-eberron",
        "name": "Orco de Eberron (ERLW)",
        "description": "Protectores de los Bosques Sombríos y guardianes de los sellos druídicos contra aberraciones.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Sentidos del Cazador",
            "desc": "Añades 1d4 a tus pruebas de Sabiduría (Supervivencia) e Intuición."
          }
        ]
      },
      {
        "id": "orco-exandria",
        "name": "Orco de Exandria (Wildemount)",
        "description": "Vencedores de las estepas de Xhorhas que luchan por forjar su propio destino.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Furia de Batalla",
            "desc": "Al realizar un impacto crítico con un arma cuerpo a cuerpo, tiras un dado adicional de daño."
          }
        ]
      }
    ]
  },
  {
    "id": "yuan-ti",
    "name": "Yuan-ti Sangre Pura (Pureblood)",
    "category": "Monstruosa",
    "description": "Humanoides serpentinos con sangre ofidia fría, maestros del engaño y poseedores de una temible resistencia mágica.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "cha": 2,
      "int": 1
    },
    "traits": [
      {
        "name": "Resistencia Mágica (Magic Resistance)",
        "desc": "Tienes ventaja en todas las tiradas de salvación contra conjuros y otros efectos mágicos."
      },
      {
        "name": "Lanzamiento Innato",
        "desc": "Conoces el truco Rociada de Veneno (Poison Spray). Puedes lanzar Sugestión a nivel 3 (1/descanso largo)."
      }
    ],
    "languages": [
      "Común",
      "Abisal",
      "Dracónico"
    ],
    "innateSpells": [
      {
        "spellName": "Poison Spray",
        "requiredLevel": 1
      },
      {
        "spellName": "Animal Friendship",
        "requiredLevel": 1,
        "notes": "Ilimitado (solo serpientes)"
      },
      {
        "spellName": "Suggestion",
        "requiredLevel": 3,
        "notes": "1/descanso largo"
      }
    ],
    "spellcastingConfig": {
      "abilityChoices": ["cha", "int", "wis"],
      "defaultAbility": "cha"
    },
    "subraces": [
      {
        "id": "yuan-ti-clasico",
        "name": "Yuan-ti Sangre Pura Clásico (Volo)",
        "description": "La estirpe aristocrática tradicional totalmente inmune a cualquier toxina.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Inmunidad al Veneno",
            "desc": "Eres completamente inmune al daño por veneno y a la condición de Envenenado."
          },
          {
            "name": "Hablar con Serpientes",
            "desc": "Puedes comunicarte telepáticamente con serpientes no mágicas sin límite."
          }
        ]
      },
      {
        "id": "yuan-ti-multiverso",
        "name": "Yuan-ti del Multiverso (MPMM)",
        "description": "Linaje modernizado con resiliencia toxica y sentidos ofidios.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Resistencia al Veneno",
            "desc": "Tienes resistencia al daño por veneno y ventaja en salvaciones contra la condición de envenenado."
          }
        ]
      }
    ]
  },
  {
    "id": "hombre-lagarto",
    "name": "Hombre Lagarto (Lizardfolk)",
    "category": "Monstruosa",
    "description": "Reptilianos pragmáticos que ven el mundo a través de la lente de la supervivencia, armados con escamas duras y mandíbulas feroces.",
    "speed": "30 pies (Nado 30 pies)",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "con": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Mordisco Feroz",
        "desc": "Ataque desarmado natural que inflige 1d6 + Fuerza de daño perforante."
      },
      {
        "name": "Armadura Natural",
        "desc": "Sin armadura, tu CA es igual a 13 + Destreza."
      },
      {
        "name": "Aguantar la Respiración",
        "desc": "Puedes aguantar la respiración hasta por 15 minutos."
      }
    ],
    "languages": [
      "Común",
      "Dracónico"
    ],
    "subraces": [
      {
        "id": "hombre-lagarto-clasico",
        "name": "Hombre Lagarto Clásico (Volo)",
        "description": "El artesano y cazador tradicional del pantano.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Mandíbula Voraz",
            "desc": "Como acción adicional muerdes a un enemigo y ganas PG temporales iguales a tu Con (1/descanso corto)."
          },
          {
            "name": "Artesano Astuto",
            "desc": "Puedes fabricar escudos, garrotes, jabalinas y dardos con huesos y pieles de presas muertas."
          }
        ]
      },
      {
        "id": "hombre-lagarto-chamanico",
        "name": "Hombre Lagarto Chamánico",
        "description": "Comulgantes con los espíritus antiguos del lodo y las bestias acuáticas.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Conexión del Pantano",
            "desc": "Ganas competencia en la habilidad Naturaleza o Supervivencia y resistencia al daño por veneno."
          }
        ]
      }
    ]
  },
  {
    "id": "aasimar",
    "name": "Aasimar",
    "category": "Exótica",
    "description": "Portadores de la chispa de los planos celestiales superiores, guiados por sueños divinos y bendecidos con luz curativa.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "cha": 2
    },
    "traits": [
      {
        "name": "Manos Sanadoras",
        "desc": "Como acción tocas a una criatura y restauras tantos PG como tu nivel de personaje (1 vez por descanso largo)."
      },
      {
        "name": "Resistencia Celestial",
        "desc": "Tienes resistencia tanto al daño necrótico como al daño radiante."
      },
      {
        "name": "Portador de Luz",
        "desc": "Conoces el truco Luz (Light) utilizando Carisma."
      }
    ],
    "languages": [
      "Común",
      "Celestial"
    ],
    "innateSpells": [
      {
        "spellName": "Light",
        "requiredLevel": 1
      }
    ],
    "spellcastingConfig": {
      "abilityChoices": ["cha", "wis", "int"],
      "defaultAbility": "cha"
    },
    "subraces": [
      {
        "id": "aasimar-protector",
        "name": "Aasimar Protector",
        "description": "Imbuidos del deber celestial de amparar a los débiles, despliegan alas de luz divina.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Alma Radiante",
            "desc": "Como acción desatas alas luminosas durante 1 minuto: obtienes vuelo de 30 pies e infliges daño radiante extra igual a tu nivel en un ataque por turno (1/descanso largo)."
          }
        ]
      },
      {
        "id": "aasimar-azote",
        "name": "Aasimar Azote (Scourge)",
        "description": "Arden con un fuego divino interno que amenaza con consumir todo a su paso para purgar el mal.",
        "abilityScoreBonuses": {
          "con": 1
        },
        "traits": [
          {
            "name": "Consumo Radiante",
            "desc": "Como acción emites un aura abrasadora de 10 pies durante 1 minuto: al final de tu turno tú sufres daño radiante igual a la mitad de tu nivel y las demás criaturas sufren daño radiante igual a tu nivel."
          }
        ]
      },
      {
        "id": "aasimar-caido",
        "name": "Aasimar Caído (Fallen)",
        "description": "Aasimar cuya luz ha sido mancillada por la desesperación o un toque de sombras, alzando alas de hueso.",
        "abilityScoreBonuses": {
          "str": 1
        },
        "traits": [
          {
            "name": "Sudario Necrótico",
            "desc": "Como acción te rodeas de oscuridad espectral: las criaturas a 10 pies deben superar salvación de Carisma o quedan Asustadas. Infliges daño necrótico extra igual a tu nivel."
          }
        ]
      },
      {
        "id": "aasimar-guia-radiante",
        "name": "Aasimar Guía Radiante (MPMM)",
        "description": "Canalizadores celestiales con revelación radiante adaptable a voluntad.",
        "abilityScoreBonuses": {
          "any": 1
        },
        "traits": [
          {
            "name": "Revelación Celestial",
            "desc": "A partir de nivel 3 como acción adicional desatas tu forma divina por 1 minuto, causando daño celestial extra y vuelo feérico."
          }
        ]
      }
    ]
  },
  {
    "id": "goliat",
    "name": "Goliat (Goliath)",
    "category": "Exótica",
    "description": "Nacidos en las cumbres montañosas más gélidas, los goliat son gigantes entre los mortales con una resistencia hercúlea.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Complexión Poderosa (Powerful Build)",
        "desc": "Cuentas como un tamaño Grande para capacidad de carga, empujar, levantar y arrastrar."
      },
      {
        "name": "Atleta Nato",
        "desc": "Tienes competencia en la habilidad Atletismo."
      },
      {
        "name": "Nacido en las Alturas",
        "desc": "Tienes resistencia al daño por frío y estás aclimatado a altitudes extremas."
      }
    ],
    "languages": [
      "Común",
      "Gigante"
    ],
    "subraces": [
      {
        "id": "goliat-montana",
        "name": "Goliat de las Montañas (Clásico / Volo)",
        "description": "El linaje tradicional de las cumbres rocosas con piel de piedra impenetrable.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Resistencia de la Piedra (Stone's Endurance)",
            "desc": "Cuando recibes daño, usas tu reacción para tirar 1d12 + Con y reducir el daño en esa cantidad (1/descanso corto o usos = bono comp)."
          }
        ]
      },
      {
        "id": "goliat-gigante-nubes",
        "name": "Linaje Gigante de las Nubes (Cloud Giant)",
        "description": "Bendecidos con la magia aérea y las nieblas de los gigantes de las nubes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Salto Brumoso",
            "desc": "Como acción adicional te teletransportas mágicamente hasta 30 pies a un espacio desocupado que veas (usos = bono de competencia por descanso largo)."
          }
        ]
      },
      {
        "id": "goliat-gigante-fuego",
        "name": "Linaje Gigante de Fuego (Fire Giant)",
        "description": "Forjados con el calor ígneo de las entrañas volcánicas.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Fuego del Forjador",
            "desc": "Cuando golpeas a una criatura con un ataque, infliges 1d10 daño de fuego adicional (usos = bono de competencia)."
          }
        ]
      },
      {
        "id": "goliat-gigante-escarcha",
        "name": "Linaje Gigante de Escarcha (Frost Giant)",
        "description": "Descendientes de los glaciares eternos con un frío paralizante en sus golpes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Frío del Glaciar",
            "desc": "Cuando golpeas a una criatura, infliges 1d6 daño de frío adicional y reduces su velocidad en 10 pies hasta el inicio de tu siguiente turno."
          }
        ]
      },
      {
        "id": "goliat-gigante-colinas",
        "name": "Linaje Gigante de las Colinas (Hill Giant)",
        "description": "Goliat con un peso y masa corporal demoledora para derribar titanes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Caída Pesada",
            "desc": "Cuando golpeas a una criatura Grande o menor, puedes derribarla inmediatamente (usos = bono de competencia)."
          }
        ]
      },
      {
        "id": "goliat-gigante-tormenta",
        "name": "Linaje Gigante de la Tormenta (Storm Giant)",
        "description": "Conectados a los relámpagos y truenos de los picos celestes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Venganza del Trueno",
            "desc": "Como reacción cuando recibes daño, el atacante sufre 1d8 daño de trueno (usos = bono de competencia)."
          }
        ]
      }
    ]
  },
  {
    "id": "tabaxi",
    "name": "Tabaxi",
    "category": "Exótica",
    "description": "Humanoides felinos curiosos y ágiles que viajan por el mundo en busca de secretos, conocimiento y artefactos raros.",
    "speed": "30 pies (Trepar 20 pies)",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "dex": 2,
      "cha": 1
    },
    "traits": [
      {
        "name": "Agilidad Felina (Feline Agility)",
        "desc": "Cuando te mueves en tu turno de combate, puedes duplicar tu velocidad hasta el final del turno. Recuperas este rasgo al pasar 1 turno completo con velocidad 0."
      },
      {
        "name": "Garras de Gato",
        "desc": "Ataques desarmados causan 1d4 + Fue/Des de daño cortante y posees velocidad de trepar de 20 pies."
      },
      {
        "name": "Talentos Felinos",
        "desc": "Tienes competencia en las habilidades Percepción y Sigilo."
      }
    ],
    "languages": [
      "Común",
      "Uno adicional"
    ],
    "subraces": [
      {
        "id": "tabaxi-clasico",
        "name": "Tabaxi Clásico (Volo)",
        "description": "El viajero felino tradicional de reflejos deslumbrantes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Reflejos Felinos",
            "desc": "Conserva la velocidad y garras clásicas de Volo."
          }
        ]
      },
      {
        "id": "tabaxi-multiverso",
        "name": "Tabaxi del Multiverso (MPMM)",
        "description": "Garras mejoradas de 1d6 cortante y velocidad de trepar igual a la velocidad al caminar (30 pies).",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Garras Mejoradas",
            "desc": "Tus garras infligen 1d6 + Fue daño cortante y tu velocidad de trepar es de 30 pies."
          }
        ]
      }
    ]
  },
  {
    "id": "tortle",
    "name": "Tortle (Tortuga)",
    "category": "Exótica",
    "description": "Nómadas pacíficos con un caparazón acorazado que cargan su hogar a cuestas y son temibles defensores cuando son provocados.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Caparazón Natural (Natural Armor)",
        "desc": "Tu caparazón te otorga una CA base fija de 17 (tu Destreza no la afecta). Puedes usar un escudo para aumentarla a 19."
      },
      {
        "name": "Defensa del Caparazón",
        "desc": "Como acción te refugias dentro de tu caparazón: ganas +4 a la CA y ventaja en salvaciones de Fuerza y Constitución. Velocidad 0 hasta salir."
      },
      {
        "name": "Garras Cortantes",
        "desc": "Ataques desarmados con garras causan 1d4 + Fuerza daño cortante."
      },
      {
        "name": "Aguantar la Respiración",
        "desc": "Puedes aguantar la respiración hasta por 1 hora."
      }
    ],
    "languages": [
      "Común",
      "Aquan"
    ],
    "subraces": [
      {
        "id": "tortle-solitario",
        "name": "Tortle Solitario (Clásico)",
        "description": "Los filósofos ambulantes que recorren los caminos solos observando la vida.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Instinto de Viaje",
            "desc": "Competencia en la habilidad Supervivencia."
          }
        ]
      },
      {
        "id": "tortle-costero",
        "name": "Tortle Costero",
        "description": "Habitantes de arrecifes y calas con conocimiento profundo de las mareas.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Nado Costero",
            "desc": "Posees velocidad de nado de 30 pies y competencia en Naturaleza."
          }
        ]
      }
    ]
  },
  {
    "id": "kenku",
    "name": "Kenku",
    "category": "Exótica",
    "description": "Criaturas con aspecto de cuervo que perdieron sus alas y su voz original, ahora maestros del mimetismo y la falsificación.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Mimetismo Experto (Mimicry)",
        "desc": "Puedes imitar cualquier sonido o voz que hayas escuchado con total fidelidad (Perspicacia vs Engaño)."
      },
      {
        "name": "Falsificador Experto",
        "desc": "Ventaja en pruebas para duplicar documentos, caligrafía ajena y sellos."
      },
      {
        "name": "Talento de Kenku",
        "desc": "Competencia en dos habilidades entre Acrobacias, Engaño, Sigilo o Juego de Manos."
      }
    ],
    "languages": [
      "Entiende Común y Áurico (habla solo mediante Mimetismo)"
    ],
    "subraces": [
      {
        "id": "kenku-clasico",
        "name": "Kenku Clásico (Volo)",
        "description": "El astuto falsificador callejero tradicional.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Voz Prestada",
            "desc": "Conserva el mimetismo clásico de Volo."
          }
        ]
      },
      {
        "id": "kenku-multiverso",
        "name": "Kenku del Multiverso (MPMM)",
        "description": "Kenku dotados con el recuerdo del maestro que les permite hablar y tener destellos de genialidad.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Recuerdo del Maestro",
            "desc": "Cuando haces una prueba de característica en la que tengas competencia, sumas 1d4 al resultado (usos = bono de competencia)."
          }
        ]
      }
    ]
  },
  {
    "id": "firbolg",
    "name": "Firbolg",
    "category": "Exótica",
    "description": "Gigantes amables de los bosques primigenios profundamente conectados con la fauna y la armonía de la naturaleza.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "wis": 2,
      "str": 1
    },
    "traits": [
      {
        "name": "Paso Oculto (Hidden Step)",
        "desc": "Como acción adicional te vuelves mágicamente invisible hasta el inicio de tu siguiente turno o hasta que ataques o lances un conjuro (1/descanso corto o usos = bono comp)."
      },
      {
        "name": "Magia de Firbolg",
        "desc": "Puedes lanzar Detectar Magia y Disfrazarse (Sabiduría) 1/descanso corto o largo cada uno."
      },
      {
        "name": "Complexión Poderosa",
        "desc": "Cuentas como Grande para capacidad de carga y levantamiento."
      },
      {
        "name": "Habla de Bestia y Hoja",
        "desc": "Las bestias y plantas entienden tus palabras y tienes ventaja en pruebas de Carisma para interactuar con ellas."
      }
    ],
    "languages": [
      "Común",
      "Élfico",
      "Gigante"
    ],
    "innateSpells": [
      {
        "spellName": "Detect Magic",
        "requiredLevel": 1,
        "notes": "1/descanso corto o largo"
      },
      {
        "spellName": "Disguise Self",
        "requiredLevel": 1,
        "notes": "1/descanso corto o largo"
      }
    ],
    "spellcastingConfig": {
      "abilityChoices": ["wis", "int", "cha"],
      "defaultAbility": "wis"
    },
    "subraces": [
      {
        "id": "firbolg-bosque",
        "name": "Firbolg del Bosque Profundo (Clásico)",
        "description": "El guardián clásico de los bosques vírgenes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Guardián del Follaje",
            "desc": "Conserva la magia innata clásica de Volo."
          }
        ]
      },
      {
        "id": "firbolg-multiverso",
        "name": "Firbolg del Multiverso (MPMM)",
        "description": "Firbolgs con usos escalonados de Paso Oculto según el bonificador de competencia.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Paso Oculto Flexible",
            "desc": "Paso Oculto tiene usos iguales a tu bonificador de competencia por descanso largo."
          }
        ]
      }
    ]
  },
  {
    "id": "genasi",
    "name": "Genasi",
    "category": "Exótica",
    "description": "Humanoides tocados por el poder puro de los cuatro planos elementales primordiales (Fuego, Agua, Aire y Tierra).",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "con": 2
    },
    "traits": [
      {
        "name": "Herencia Elemental",
        "desc": "Portas la sangre de los genios elementales primordiales."
      }
    ],
    "languages": [
      "Común",
      "Primordial"
    ],
    "subraces": [
      {
        "id": "genasi-fuego",
        "name": "Genasi de Fuego",
        "description": "Vástagos del Plano del Fuego, de piel carmesí o cenicienta y cabellos de brasas llameantes.",
        "abilityScoreBonuses": {
          "int": 1
        },
        "traits": [
          {
            "name": "Resistencia al Fuego",
            "desc": "Tienes resistencia al daño por fuego."
          },
          {
            "name": "Visión en la Oscuridad Ígnea",
            "desc": "Ves en la oscuridad hasta 60 pies en tonos rojos."
          },
          {
            "name": "Alcanzar la Llama (Reach to the Blaze)",
            "desc": "Conoces el truco Producir Llama (Produce Flame). A partir del nivel 3, puedes lanzar Manos Ardientes (Burning Hands). A partir del nivel 5, puedes lanzar Hoja de Fuego (Flame Blade) sin componentes materiales. Una vez lanzas cualquiera de ellos con este rasgo, no puedes volver a hacerlo hasta terminar un descanso largo (o usando espacios de conjuro). Inteligencia, Sabiduría o Carisma es tu aptitud mágica para estos conjuros (a elegir al seleccionar esta raza)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Produce Flame",
            "requiredLevel": 1
          },
          {
            "spellName": "Burning Hands",
            "requiredLevel": 3,
            "notes": "1/descanso largo o con espacios"
          },
          {
            "spellName": "Flame Blade",
            "requiredLevel": 5,
            "notes": "1/descanso largo o con espacios"
          }
        ],
        "spellcastingConfig": {
          "abilityChoices": ["int", "wis", "cha"],
          "defaultAbility": "int"
        }
      },
      {
        "id": "genasi-agua",
        "name": "Genasi de Agua",
        "description": "Hijos de las olas y los torrentes, capaces de nadar como peces y respirar bajo el agua.",
        "abilityScoreBonuses": {
          "wis": 1
        },
        "traits": [
          {
            "name": "Anfibio",
            "desc": "Puedes respirar tanto aire como agua."
          },
          {
            "name": "Nado Ágil",
            "desc": "Tienes una velocidad de nado de 30 pies."
          },
          {
            "name": "Resistencia al Ácido",
            "desc": "Tienes resistencia al daño por ácido."
          },
          {
            "name": "Llamar a la Ola (Call to the Wave)",
            "desc": "Conoces el truco Salpicadura Ácida (Acid Splash). A partir del nivel 3, puedes lanzar Crear o Destruir Agua (Create or Destroy Water). A partir del nivel 5, puedes lanzar Caminar sobre las Aguas (Water Walk) sin componentes materiales. Una vez lanzas cualquiera de ellos con este rasgo, no puedes volver a hacerlo hasta terminar un descanso largo (o usando espacios de conjuro). Inteligencia, Sabiduría o Carisma es tu aptitud mágica para estos conjuros (a elegir al seleccionar esta raza)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Acid Splash",
            "requiredLevel": 1
          },
          {
            "spellName": "Create or Destroy Water",
            "requiredLevel": 3,
            "notes": "1/descanso largo o con espacios"
          },
          {
            "spellName": "Water Walk",
            "requiredLevel": 5,
            "notes": "1/descanso largo o con espacios"
          }
        ],
        "spellcastingConfig": {
          "abilityChoices": ["int", "wis", "cha"],
          "defaultAbility": "wis"
        }
      },
      {
        "id": "genasi-aire",
        "name": "Genasi de Aire",
        "description": "Ligeros como la brisa y veloces como la tempestad, con cabellos en constante movimiento.",
        "abilityScoreBonuses": {
          "dex": 1
        },
        "traits": [
          {
            "name": "Aguante sin Aire",
            "desc": "Puedes contener la respiración indefinidamente mientras no estés incapacitado."
          },
          {
            "name": "Resistencia al Rayo",
            "desc": "Tienes resistencia al daño por relámpago/rayo."
          },
          {
            "name": "Fundirse con el Viento (Mingle with the Wind)",
            "desc": "Conoces el truco Agarre Electrizante (Shocking Grasp). A partir del nivel 3, puedes lanzar Caída de Pluma (Feather Fall) sin componentes materiales. A partir del nivel 5, puedes lanzar Levitar (Levitate) sin componentes materiales. Una vez lanzas cualquiera de ellos con este rasgo, no puedes volver a hacerlo hasta terminar un descanso largo (o usando espacios de conjuro). Inteligencia, Sabiduría o Carisma es tu aptitud mágica para estos conjuros (a elegir al seleccionar esta raza)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Shocking Grasp",
            "requiredLevel": 1
          },
          {
            "spellName": "Feather Fall",
            "requiredLevel": 3,
            "notes": "1/descanso largo o con espacios"
          },
          {
            "spellName": "Levitate",
            "requiredLevel": 5,
            "notes": "1/descanso largo o con espacios"
          }
        ],
        "spellcastingConfig": {
          "abilityChoices": ["int", "wis", "cha"],
          "defaultAbility": "dex"
        }
      },
      {
        "id": "genasi-tierra",
        "name": "Genasi de Tierra",
        "description": "Sólidos y pacientes como los peñascos milenarios, con piel similar a la arenisca o al granito.",
        "abilityScoreBonuses": {
          "str": 1
        },
        "traits": [
          {
            "name": "Moverse por la Tierra (Earth Walk)",
            "desc": "Puedes moverte por terreno difícil de tierra o roca sin coste adicional de movimiento si estás usando tu velocidad caminando."
          },
          {
            "name": "Fundirse con la Piedra (Merge with Stone)",
            "desc": "Conoces el truco Protección contra las Armas (Blade Ward). Puedes lanzarlo como una acción normal, y también como acción adicional tantas veces como tu bonificador por competencia, recuperando todos los usos al finalizar un descanso largo. A partir del nivel 5, puedes lanzar el conjuro Pasar sin Rastro (Pass Without Trace) con este rasgo, sin requerir componentes materiales. Una vez lanzado con este rasgo, no puedes volver a hacerlo hasta terminar un descanso largo. También puedes lanzarlo usando cualquier espacio de conjuro que tengas de nivel 2 o superior. Inteligencia, Sabiduría o Carisma es tu aptitud mágica para estos conjuros (a elegir al seleccionar esta raza)."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Blade Ward",
            "requiredLevel": 1,
            "notes": "Acción o Acción adicional PB/descanso largo"
          },
          {
            "spellName": "Pass Without Trace",
            "requiredLevel": 5,
            "notes": "1/descanso largo sin componentes materiales, o con espacios nv 2+"
          }
        ],
        "spellcastingConfig": {
          "abilityChoices": ["int", "wis", "cha"],
          "defaultAbility": "wis"
        }
      }
    ]
  },
  {
    "id": "triton",
    "name": "Tritón (Triton)",
    "category": "Exótica",
    "description": "Nobles guardianes de las profundidades oceánicas que protegen las fosas marinas contra los terrores abisales.",
    "speed": "30 pies (Nado 30 pies)",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "str": 1,
      "con": 1,
      "cha": 1
    },
    "traits": [
      {
        "name": "Anfibio",
        "desc": "Puedes respirar tanto aire como agua."
      },
      {
        "name": "Emisario del Mar",
        "desc": "Puedes comunicar conceptos simples a cualquier bestia con velocidad de nado."
      },
      {
        "name": "Resistencia de las Profundidades",
        "desc": "Resistencia al frío e inmunidad a la presión abisal."
      }
    ],
    "languages": [
      "Común",
      "Primordial"
    ],
    "innateSpells": [
      {
        "spellName": "Fog Cloud",
        "requiredLevel": 1,
        "notes": "1/descanso largo"
      },
      {
        "spellName": "Gust of Wind",
        "requiredLevel": 3,
        "notes": "1/descanso largo"
      },
      {
        "spellName": "Water Walk",
        "requiredLevel": 5,
        "notes": "1/descanso largo"
      }
    ],
    "spellcastingConfig": {
      "abilityChoices": ["cha", "int", "wis"],
      "defaultAbility": "cha"
    },
    "subraces": [
      {
        "id": "triton-profundo",
        "name": "Tritón de las Fosas (Clásico)",
        "description": "Los defensores de las trincheras marinas armados con tridentes.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Guardia de las Fosas",
            "desc": "Conserva el lanzamiento innato clásico."
          }
        ]
      },
      {
        "id": "triton-multiverso",
        "name": "Tritón del Multiverso (MPMM)",
        "description": "Tritones con magia oceánica que puede lanzarse con ranuras de conjuro.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Magia de las Olas Flexible",
            "desc": "Puedes lanzar tus conjuros raciales con ranuras de conjuro de cualquier clase que poseas."
          }
        ]
      }
    ]
  },
  {
    "id": "cambiaformas",
    "name": "Cambiaformas (Changeling)",
    "category": "Exótica",
    "description": "Seres camaleónicos capaces de alterar su rostro, cuerpo y tono de voz a voluntad para mimetizarse entre cualquier pueblo.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "cha": 2,
      "dex": 1
    },
    "traits": [
      {
        "name": "Metamorfosis (Shapechanger)",
        "desc": "Como acción cambias tu apariencia física y voz. Puedes adoptar la forma de cualquier humanoide que hayas visto (tu equipo no cambia)."
      },
      {
        "name": "Instintos de Changeling",
        "desc": "Competencia en dos habilidades entre Engaño, Perspicacia, Intimidación o Persuasión."
      }
    ],
    "languages": [
      "Común",
      "Dos adicionales"
    ],
    "subraces": [
      {
        "id": "cambiaformas-eberron",
        "name": "Cambiaformas de Eberron (ERLW)",
        "description": "La estirpe tradicional de Khorvaire vinculada al Dios Viajero.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Doble Rostro",
            "desc": "Conserva la versatilidad de la farsa de identidades múltiples."
          }
        ]
      },
      {
        "id": "cambiaformas-multiverso",
        "name": "Cambiaformas del Multiverso (MPMM)",
        "description": "Seres que pueden alterar su tamaño entre Pequeño y Mediano al cambiar de forma.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Tamaño Fluido",
            "desc": "Al cambiar de forma puedes decidir si tu tamaño es Pequeño o Mediano."
          }
        ]
      }
    ]
  },
  {
    "id": "forjado",
    "name": "Forjado de la Guerra (Warforged)",
    "category": "Exótica",
    "description": "Constructos vivientes de madera viva, acero y magia arcana forjados para el combate con una voluntad propia.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "con": 2,
      "str": 1
    },
    "traits": [
      {
        "name": "Construcción Resistente",
        "desc": "Ventaja en salvaciones contra veneno, resistencia al veneno, inmunidad a enfermedades, no necesitas comer, beber ni respirar."
      },
      {
        "name": "Descanso Centinela",
        "desc": "No necesitas dormir; descansas inmóvil 6 horas manteniendo la consciencia activa."
      },
      {
        "name": "Protección Integrada",
        "desc": "Ganas un bonificador permanente de +1 a tu Clase de Armadura."
      }
    ],
    "languages": [
      "Común",
      "Uno adicional"
    ],
    "subraces": [
      {
        "id": "forjado-integrado",
        "name": "Forjado Integrado (Estándar ERLW)",
        "description": "El modelo balanceado y polivalente creado en los hornos de la Última Guerra.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Diseño Especializado",
            "desc": "Ganas competencia en una habilidad y un conjunto de herramientas a tu elección."
          }
        ]
      },
      {
        "id": "forjado-juggernaut",
        "name": "Forjado Juggernaut (Coloso - Eberron UA)",
        "description": "Construidos para asaltos de primera línea con placas blindadas densas y puños de hierro.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "str": 2,
          "con": 1
        },
        "traits": [
          {
            "name": "Puños de Hierro",
            "desc": "Tus ataques desarmados infligen 1d6 + Fuerza de daño contundente."
          },
          {
            "name": "Fuerza Imparable",
            "desc": "Ganas competencia en Atletismo y tu capacidad de carga se duplica."
          }
        ]
      },
      {
        "id": "forjado-skirmisher",
        "name": "Forjado Skirmisher (Hostigador - Eberron UA)",
        "description": "Modelos esbeltos y veloces creados para labores de exploración y emboscada en la espesura.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "dex": 2,
          "con": 1
        },
        "traits": [
          {
            "name": "Paso Ágil",
            "desc": "Tu velocidad base al caminar aumenta a 35 pies."
          },
          {
            "name": "Movimiento Ligero",
            "desc": "Ganas competencia en Sigilo."
          }
        ]
      },
      {
        "id": "forjado-envoy",
        "name": "Forjado Envoy (Emisario - Eberron UA)",
        "description": "Diseñados para funciones diplomáticas, médicas o de artificio especializado.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "con": 1,
          "any": 2
        },
        "traits": [
          {
            "name": "Herramienta Integrada",
            "desc": "Una herramienta a tu elección está instalada en tu cuerpo y duplicas tu bonificador de competencia al usarla."
          },
          {
            "name": "Versatilidad de Emisario",
            "desc": "Ganas competencia en una habilidad a tu elección."
          }
        ]
      }
    ]
  },
  {
    "id": "aarakocra",
    "name": "Aarakocra",
    "category": "Exótica",
    "description": "Gente ave originaria del Plano Elemental del Aire que surca los cielos con plumajes brillantes y garras afiladas.",
    "speed": "25 pies (Vuelo 50 pies)",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Garras",
        "desc": "Tus garras infligen 1d4 + Fuerza daño cortante en ataques desarmados."
      }
    ],
    "languages": [
      "Común",
      "Áurico",
      "Aarakocra"
    ],
    "subraces": [
      {
        "id": "aarakocra-clasico",
        "name": "Aarakocra Clásico (Elemental Evil)",
        "description": "Vuelo a velocidad máxima de 50 pies en cielos abiertos.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Vuelo Majestuoso (50 pies)",
            "desc": "Velocidad de vuelo de 50 pies sin vestir armadura media ni pesada."
          }
        ]
      },
      {
        "id": "aarakocra-multiverso",
        "name": "Aarakocra del Multiverso (MPMM)",
        "description": "Conectados a la magia eólica con lanzamiento innato de vientos.",
        "replacesBaseBonuses": true,
        "abilityScoreBonuses": {
          "dex": 2,
          "wis": 1
        },
        "traits": [
          {
            "name": "Vuelo Equilibrado (30 pies)",
            "desc": "Velocidad de vuelo igual a tu velocidad al caminar (30 pies) sin armadura pesada."
          },
          {
            "name": "Lanzador de Viento",
            "desc": "A nivel 3 puedes lanzar Ráfaga de Viento (Gust of Wind) usando Sabiduría."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Ráfaga de Viento (Gust of Wind)",
            "requiredLevel": 3
          }
        ]
      }
    ]
  },
  {
    "id": "hada",
    "name": "Hada (Fairy)",
    "category": "Exótica",
    "description": "Seres diminutos del Feywild con alas traslúcidas que infunden risas, travesuras y magia feérica.",
    "speed": "30 pies (Vuelo 30 pies)",
    "size": "Pequeño",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "cha": 1
    },
    "traits": [
      {
        "name": "Tipo Feérico",
        "desc": "Tu tipo de criatura es Feérico (Fey), inmune a conjuros que afecten solo a humanoides."
      },
      {
        "name": "Vuelo Feérico",
        "desc": "Velocidad de vuelo de 30 pies mientras no lleves armadura pesada."
      },
      {
        "name": "Magia de Hada",
        "desc": "Conoces Druidcraft. A nivel 3 lanzas Fuego Feérico y a nivel 5 Agrandar/Reducir."
      }
    ],
    "languages": [
      "Común",
      "Silvano"
    ],
    "innateSpells": [
      {
        "spellName": "Druidcraft",
        "requiredLevel": 1
      },
      {
        "spellName": "Faerie Fire",
        "requiredLevel": 3,
        "notes": "1/descanso largo"
      },
      {
        "spellName": "Enlarge/Reduce",
        "requiredLevel": 5,
        "notes": "1/descanso largo"
      }
    ],
    "spellcastingConfig": {
      "abilityChoices": ["int", "wis", "cha"],
      "defaultAbility": "cha"
    },
    "subraces": [
      {
        "id": "hada-corte",
        "name": "Hada de la Corte Feérica (Witchlight)",
        "description": "Nobles feéricos de las cortes de Seelie y Unseelie.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Apretujamiento Feérico",
            "desc": "Puedes deslizarte por aberturas de hasta 1 pulgada sin apretarte."
          }
        ]
      },
      {
        "id": "hada-silvestre",
        "name": "Hada Silvestre de los Claros",
        "description": "Hadas de arboledas y hongos que bailan con animales del bosque.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Afinidad con Alimañas",
            "desc": "Ventaja en pruebas de Trato con Animales con criaturas de tamaño Pequeño o menor."
          }
        ]
      }
    ]
  },
  {
    "id": "liebrelido",
    "name": "Liebrélido (Harengon)",
    "category": "Exótica",
    "description": "Conejos humanoides del Feywild dotados de reflejos prodigiosos y una suerte saltarina para esquivar el peligro.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Reflejos de Liebre",
        "desc": "Añades tu bonificador de competencia a todas tus tiradas de Iniciativa."
      },
      {
        "name": "Sentidos Alerta",
        "desc": "Tienes competencia en la habilidad Percepción."
      },
      {
        "name": "Salto de Conejo",
        "desc": "Como acción adicional saltas 5 pies x tu bono de competencia sin provocar ataques de oportunidad (usos = bono comp)."
      },
      {
        "name": "Suerte Saltarina",
        "desc": "Si fallas una salvación de Destreza, puedes usar tu reacción para sumar 1d4 al total."
      }
    ],
    "languages": [
      "Común",
      "Uno adicional"
    ],
    "subraces": [
      {
        "id": "liebrelido-feerico",
        "name": "Liebrélido del Feywild (MPMM)",
        "description": "Viajeros de bosques encantados con gracia feérica.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Brinco Feérico",
            "desc": "Conserva todas las facultades oficiales de salto y reflejos de liebre."
          }
        ]
      },
      {
        "id": "liebrelido-madriguera",
        "name": "Liebrélido de las Madrigueras",
        "description": "Excavadores precavidos acostumbrados a construir refugios subterráneos.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Pies Cavadores",
            "desc": "Velocidad de excavar de 10 pies a través de tierra suelta o arena."
          }
        ]
      }
    ]
  },
  {
    "id": "centauro",
    "name": "Centauro (Centaur)",
    "category": "Monstruosa",
    "description": "Nobles seres con torso humanoide y cuerpo inferior de caballo veloz que recorren las praderas con orgullo salvaje.",
    "speed": "40 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Tipo Feérico",
        "desc": "Tu tipo de criatura es Feérico en lugar de Humanoide."
      },
      {
        "name": "Pezuñas Atronadoras",
        "desc": "Ataques desarmados con pezuñas causan 1d4 + Fuerza daño contundente."
      },
      {
        "name": "Carga Arrolladora",
        "desc": "Si te mueves al menos 30 pies en línea recta hacia un objetivo e impactas, puedes atacar con tus pezuñas como acción adicional."
      },
      {
        "name": "Complexión Equina",
        "desc": "Cuentas como Grande para capacidad de carga; trepar cuesta 4 pies por pie recorrido."
      }
    ],
    "languages": [
      "Común",
      "Silvano"
    ],
    "subraces": [
      {
        "id": "centauro-ravnica",
        "name": "Centauro de Ravnica / Theros",
        "description": "Pertenecientes a los clanes Gruul, Selesnya o de los valles de Theros.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Superviviente",
            "desc": "Ganas competencia en Supervivencia, Medicina, Naturaleza o Trato con Animales."
          }
        ]
      },
      {
        "id": "centauro-multiverso",
        "name": "Centauro del Multiverso (MPMM)",
        "description": "Pezuñas mejoradas que infligen 1d6 + Fuerza de daño contundente.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Pezuñas Pesadas",
            "desc": "Tus pezuñas infligen 1d6 + Fuerza de daño contundente."
          }
        ]
      }
    ]
  },
  {
    "id": "minotauro",
    "name": "Minotauro (Minotaur)",
    "category": "Monstruosa",
    "description": "Colosos con cabeza taurina criados en laberintos y batallas que cargan con una furia implacable contra sus enemigos.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Cuernos Destructivos",
        "desc": "Ataques desarmados con cuernos causan 1d6 + Fuerza daño perforante."
      },
      {
        "name": "Embestida de Cuernos",
        "desc": "Tras correr al menos 20 pies con Dash, puedes atacar con tus cuernos como acción adicional."
      },
      {
        "name": "Cornada de Empuje",
        "desc": "Tras golpear con un ataque cuerpo a cuerpo, puedes usar tu acción adicional para empujar al objetivo hasta 10 pies."
      }
    ],
    "languages": [
      "Común",
      "Minotauro"
    ],
    "subraces": [
      {
        "id": "minotauro-ravnica",
        "name": "Minotauro de Ravnica / Theros",
        "description": "Guerreros marciales de los batallones Boros o campeones de Akros.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Presencia Imponente",
            "desc": "Competencia en Intimidación o Persuasión."
          }
        ]
      },
      {
        "id": "minotauro-krynn",
        "name": "Minotauro de Krynn (Dragonlance)",
        "description": "Navegantes orgullosos y marineros de la flota minotauro de Ansalon.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Recuerdo Laberíntico",
            "desc": "Siempre recuerdas la dirección en la que viajaste y tienes ventaja en pruebas de Supervivencia para no perderte."
          }
        ]
      }
    ]
  },
  {
    "id": "satiro",
    "name": "Sátiro (Satyr)",
    "category": "Exótica",
    "description": "Criaturas con patas de cabra y cuernos del Feywild que celebran la vida, la música y poseen una formidable resistencia arcana.",
    "speed": "35 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "cha": 2,
      "dex": 1
    },
    "traits": [
      {
        "name": "Tipo Feérico",
        "desc": "Tu tipo de criatura es Feérico."
      },
      {
        "name": "Resistencia Mágica",
        "desc": "Tienes ventaja en todas las tiradas de salvación contra conjuros y otros efectos mágicos."
      },
      {
        "name": "Cabezazo",
        "desc": "Tus cuernos infligen 1d4 + Fuerza daño contundente en ataques desarmados."
      },
      {
        "name": "Salto Alegre",
        "desc": "Al hacer un salto de longitud o altura, tiras 1d8 y sumas el resultado a la distancia."
      },
      {
        "name": "Festejero Nato",
        "desc": "Competencia en Interpretación, Persuasión y un instrumento musical a elección."
      }
    ],
    "languages": [
      "Común",
      "Silvano"
    ],
    "subraces": [
      {
        "id": "satiro-theros",
        "name": "Sátiro Dionisíaco (Theros)",
        "description": "Devotos del dios del festejo Xenagos y la libertad silvestre.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Brío Hedonista",
            "desc": "Ventaja en salvaciones contra ser encantado o asustado durante banquetes."
          }
        ]
      },
      {
        "id": "satiro-feerico",
        "name": "Sátiro del Feywild (MPMM)",
        "description": "Viajeros eternos entre las cortes de las hadas con cabezazo reforzado a 1d6.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Cabezazo Robusto",
            "desc": "Tus cuernos causan 1d6 + Fuerza daño contundente."
          }
        ]
      }
    ]
  },
  {
    "id": "gith",
    "name": "Gith",
    "category": "Planar",
    "description": "Un antiguo pueblo que se rebeló contra el imperio de los azotamentes (Mind Flayers) y desarrolló formidables poderes psiónicos.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "int": 1
    },
    "traits": [
      {
        "name": "Psiónica Innata",
        "desc": "Conoces el truco Mano de Mago (invisible) que manipulas psiónicamente."
      }
    ],
    "innateSpells": [
      {
        "spellName": "Mage Hand",
        "requiredLevel": 1,
        "notes": "Mano de Mago invisible"
      }
    ],
    "spellcastingConfig": {
      "abilityChoices": ["int", "wis", "cha"],
      "defaultAbility": "int"
    },
    "languages": [
      "Común",
      "Gith"
    ],
    "subraces": [
      {
        "id": "githyanki",
        "name": "Githyanki",
        "description": "Conquistadores marciales del Plano Astral leales a la Reina Liche Vlaakith.",
        "abilityScoreBonuses": {
          "str": 2
        },
        "traits": [
          {
            "name": "Prodigio Marcial",
            "desc": "Competencia con espada corta, espada larga, espadón y armaduras ligeras y medias."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Jump",
            "requiredLevel": 3,
            "notes": "1/descanso largo"
          },
          {
            "spellName": "Misty Step",
            "requiredLevel": 5,
            "notes": "1/descanso largo"
          }
        ]
      },
      {
        "id": "githzerai",
        "name": "Githzerai",
        "description": "Monjes ascéticos del Caos de Limbo que cultivan una férrea disciplina mental y calma imperturbable.",
        "abilityScoreBonuses": {
          "wis": 2
        },
        "traits": [
          {
            "name": "Disciplina Mental",
            "desc": "Tienes ventaja en tiradas de salvación contra ser Hechizado o Asustado."
          }
        ],
        "innateSpells": [
          {
            "spellName": "Shield",
            "requiredLevel": 3,
            "notes": "1/descanso largo"
          },
          {
            "spellName": "Detect Thoughts",
            "requiredLevel": 5,
            "notes": "1/descanso largo"
          }
        ]
      }
    ]
  },
  {
    "id": "shifter",
    "name": "Cambiante / Licántropo (Shifter)",
    "category": "Exótica",
    "description": "Descendientes de licántropos en Eberron que manifiestan la ferocidad y agilidad de su herencia bestial en el combate.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "dex": 1
    },
    "traits": [
      {
        "name": "Cambio de Forma (Shifting)",
        "desc": "Como acción adicional adoptas rasgos bestiales durante 1 minuto. Ganas PG temporales iguales a tu nivel + Con (1/descanso corto o usos = bono comp)."
      }
    ],
    "languages": [
      "Común"
    ],
    "subraces": [
      {
        "id": "shifter-beasthide",
        "name": "Piel de Bestia (Beasthide)",
        "description": "Duros y tenaces como jabalíes o tejones de guerra.",
        "abilityScoreBonuses": {
          "con": 2,
          "str": 1
        },
        "traits": [
          {
            "name": "Piel Acorazada",
            "desc": "Al transformarte ganas 1d6 PG temporales adicionales y +1 a tu CA."
          },
          {
            "name": "Atleta Nato",
            "desc": "Competencia en la habilidad Atletismo."
          }
        ]
      },
      {
        "id": "shifter-longtooth",
        "name": "Diente Largo (Longtooth)",
        "description": "Depredadores carnívoros con colmillos alargados y feroces.",
        "abilityScoreBonuses": {
          "str": 2
        },
        "traits": [
          {
            "name": "Mordisco Feroz",
            "desc": "Como acción adicional al transformarte y turnos posteriores atacas con tus colmillos (1d6 + Fuerza perforante)."
          },
          {
            "name": "Menazante",
            "desc": "Competencia en la habilidad Intimidación."
          }
        ]
      },
      {
        "id": "shifter-swiftstride",
        "name": "Paso Veloz (Swiftstride)",
        "description": "Rápidos y esquivos como felinos salvajes.",
        "abilityScoreBonuses": {
          "dex": 1,
          "cha": 1
        },
        "traits": [
          {
            "name": "Velocidad Felina",
            "desc": "Al transformarte tu velocidad al caminar aumenta en 10 pies."
          },
          {
            "name": "Paso Reactivo",
            "desc": "Como reacción cuando un enemigo termina su turno a 5 pies de ti, te mueves hasta 10 pies sin provocar ataques de oportunidad."
          },
          {
            "name": "Ágil",
            "desc": "Competencia en Acrobacias."
          }
        ]
      },
      {
        "id": "shifter-wildhunt",
        "name": "Caza Salvaje (Wildhunt)",
        "description": "Rastreadores natos e intuitivos guiados por los sentidos de una manada.",
        "abilityScoreBonuses": {
          "wis": 2
        },
        "traits": [
          {
            "name": "Sentidos de Caza",
            "desc": "Al transformarte tienes ventaja en pruebas de Sabiduría y ningún enemigo a 30 pies puede tener ventaja al atacarte."
          },
          {
            "name": "Superviviente",
            "desc": "Competencia en Supervivencia."
          }
        ]
      }
    ]
  },
  {
    "id": "kalashtar",
    "name": "Kalashtar",
    "category": "Exótica",
    "description": "Un pueblo pacífico nacido de la unión simbiótica entre humanos y espíritus quori del plano de los sueños.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "wis": 2,
      "cha": 1
    },
    "traits": [
      {
        "name": "Enlace Mental (Mind Link)",
        "desc": "Puedes hablar telepáticamente con cualquier criatura que veas hasta 10 pies x tu nivel."
      },
      {
        "name": "Disciplina Dual",
        "desc": "Tienes ventaja en todas las tiradas de salvación de Sabiduría."
      },
      {
        "name": "Resistencia Psíquica",
        "desc": "Tienes resistencia al daño psíquico."
      },
      {
        "name": "Separado de los Sueños",
        "desc": "Inmune a conjuros o efectos que manipulen sueños o requieran que sueñes."
      }
    ],
    "languages": [
      "Común",
      "Quori"
    ],
    "subraces": [
      {
        "id": "kalashtar-luz",
        "name": "Kalashtar Il-Yannah (Sendero de la Luz)",
        "description": "Devotos de la Luz de Dal Quor dedicados a la meditación y defensa contra la Oscuridad Soñadora.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Aura Serena",
            "desc": "Competencia en Perspicacia o Persuasión."
          }
        ]
      },
      {
        "id": "kalashtar-huerfano",
        "name": "Kalashtar Huérfano de Khorvaire",
        "description": "Crecidos lejos de los enclaves de Adar, curtidos en la supervivencia callejera.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Sentido Urbano",
            "desc": "Competencia en Percepción o Sigilo."
          }
        ]
      }
    ]
  },
  {
    "id": "leonin",
    "name": "Leonin",
    "category": "Exótica",
    "description": "Nobles felinos humanoides orgullosos y feroces de las llanuras que cazan en manadas y rugen con fuerza atronadora.",
    "speed": "35 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "con": 2,
      "str": 1
    },
    "traits": [
      {
        "name": "Garras Leoninas",
        "desc": "Ataques desarmados con garras infligen 1d4 + Fuerza daño cortante."
      },
      {
        "name": "Rugido Aterrorizante (Daunting Roar)",
        "desc": "Como acción adicional emites un rugido: enemigos a 10 pies superan salvación de Sabiduría (CD 8 + prof + Con) o quedan Asustados (1/descanso corto)."
      },
      {
        "name": "Sentidos de Cazador",
        "desc": "Competencia en Atletismo, Intimidación, Percepción o Supervivencia."
      }
    ],
    "languages": [
      "Común",
      "Leonin"
    ],
    "subraces": [
      {
        "id": "leonin-llanuras",
        "name": "Leonin de las Llanuras (Theros)",
        "description": "Orgullosos centinelas de Oreskos que protegen a su manada.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Honor de la Manada",
            "desc": "Conserva el rugido y sentidos tradicionales de Theros."
          }
        ]
      },
      {
        "id": "leonin-cazador",
        "name": "Leonin Cazador Solitario",
        "description": "Rastreadores solitarios que vagan por las estepas lejanas.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Acecho Silencioso",
            "desc": "Velocidad de 40 pies y competencia en Sigilo."
          }
        ]
      }
    ]
  },
  {
    "id": "loxodon",
    "name": "Loxodon (Elefante)",
    "category": "Exótica",
    "description": "Humanoides paquidermos pacientes, leales e imponentes cuya serenidad solo es igualada por su fuerza física hercúlea.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "con": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Trompa Prensil",
        "desc": "Puedes manipular herramientas, levantar hasta 5 veces tu Fuerza en peso, y hacer presas contra enemigos con tu trompa."
      },
      {
        "name": "Armadura Natural Paquidermo",
        "desc": "Tu piel gruesa te otorga una CA base de 12 + tu modificador de Constitución (puedes usar escudo)."
      },
      {
        "name": "Serenidad Loxodonte",
        "desc": "Tienes ventaja en tiradas de salvación contra ser Hechizado o Asustado."
      },
      {
        "name": "Olfato Agudo",
        "desc": "Tienes ventaja en pruebas de Sabiduría (Percepción) e Investigación basadas en el olfato."
      }
    ],
    "languages": [
      "Común",
      "Loxodon"
    ],
    "subraces": [
      {
        "id": "loxodon-constructor",
        "name": "Loxodon Maestro Constructor (Ravnica)",
        "description": "Arquitectos venerables de las ciudadelas y gremios de Ravnica.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Memoria de Piedra",
            "desc": "Competencia con herramientas de albañil o carpintero."
          }
        ]
      },
      {
        "id": "loxodon-erudito",
        "name": "Loxodon Erudito de la Memoria",
        "description": "Sabios que recuerdan generaciones enteras de canciones y relatos.",
        "abilityScoreBonuses": {},
        "traits": [
          {
            "name": "Memoria de Elefante",
            "desc": "Competencia en la habilidad Historia."
          }
        ]
      }
    ]
  },
  {
    "id": "kender",
    "name": "Kender (Dragonlance)",
    "category": "Exótica",
    "description": "Gente pequeña, vivaz y curiosa de Krynn bendecida con una inmunidad legendaria al miedo y una tendencia insaciable a husmear bolsillos y provocar a sus enemigos.",
    "speed": "30 pies",
    "size": "Pequeño",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "cha": 1
    },
    "traits": [
      {
        "name": "Sin Miedo (Fearless)",
        "desc": "Eres completamente inmune a la condición de Asustado. Tienes ventaja en salvaciones contra cualquier efecto de terror sobrenatural."
      },
      {
        "name": "Provocación (Taunt)",
        "desc": "Como acción adicional desatas una retahíla de burlas mordaces contra una criatura a 60 pies. Si falla salvación de Sabiduría, tiene desventaja en ataques contra cualquiera que no seas tú (usos = bono comp)."
      },
      {
        "name": "Bolsillos de Kender",
        "desc": "Gracias a tu afición por recoger curiosidades, puedes sacar de tus bolsillos cualquier objeto mundano de 2 po o menos que quepa en tu mano una vez por descanso corto."
      }
    ],
    "languages": [
      "Común",
      "Kender"
    ]
  },
  {
    "id": "owlin",
    "name": "Owlin (Gente Búho - Strixhaven)",
    "category": "Exótica",
    "description": "Humanoides con aspecto de búho descendientes del Feywild, caracterizados por su plumaje suave que amortigua el sonido y sus ojos telescópicos.",
    "speed": "30 pies (Vuelo 30 pies)",
    "size": "Mediano",
    "darkvision": 120,
    "abilityScoreBonuses": {
      "dex": 2,
      "int": 1
    },
    "traits": [
      {
        "name": "Vuelo Silencioso",
        "desc": "Tienes una velocidad de vuelo igual a tu velocidad al caminar (30 pies). Para volar no puedes vestir armadura media ni pesada."
      },
      {
        "name": "Visión en la Oscuridad Superior",
        "desc": "Tu visión en la oscuridad tiene un alcance de 120 pies."
      },
      {
        "name": "Plumas Furtivas",
        "desc": "Ganas competencia en la habilidad Sigilo."
      }
    ],
    "languages": [
      "Común",
      "Silvano"
    ]
  },
  {
    "id": "plasmoide",
    "name": "Plasmoide (Plasmoid - Spelljammer)",
    "category": "Planar",
    "description": "Criaturas ameboides de limo inteligente capaces de moldear su cuerpo viscoso para adoptar formas humanoides o deslizarse por aberturas diminutas.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "con": 2,
      "str": 1
    },
    "traits": [
      {
        "name": "Cuerpo Amorfo",
        "desc": "Puedes pasar a través de cualquier abertura tan pequeña como de 1 pulgada de ancho sin apretarte, siempre que no lleves equipo ni armadura."
      },
      {
        "name": "Resiliencia de Limo",
        "desc": "Tienes resistencia al daño por ácido y al daño por veneno, y tienes ventaja en salvaciones contra veneno."
      },
      {
        "name": "Pseudópodo Manipulador",
        "desc": "Como acción adicional extiendes un pseudópodo de hasta 10 pies para manipular objetos, abrir puertas no trabadas o guardar cosas."
      },
      {
        "name": "Aguantar la Respiración de Limo",
        "desc": "Puedes contener la respiración hasta por 1 hora."
      }
    ],
    "languages": [
      "Común",
      "Uno adicional"
    ]
  },
  {
    "id": "thri-kreen",
    "name": "Thri-kreen (Spelljammer)",
    "category": "Planar",
    "description": "Insectoides mantis cuadrímanos con exoesqueleto camaleónico, cuatro brazos funcionales y telepatía natural que nunca duermen.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "dex": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Brazos Secundarios",
        "desc": "Posees dos brazos adicionales más pequeños con los que puedes manipular objetos ligeros, desenvainar o guardar armas ligeras, y blandir armas con la propiedad Ligera."
      },
      {
        "name": "Exoesqueleto Camaleónico",
        "desc": "Tu caparazón te otorga una CA base de 13 + Destreza. Puedes cambiar el color de tu caparazón para ganar ventaja en pruebas de Sigilo para esconderte."
      },
      {
        "name": "Telepatía Thri-kreen",
        "desc": "Puedes hablar telepáticamente con cualquier criatura a 120 pies sin importar los idiomas que comparta contigo."
      },
      {
        "name": "Descanso sin Sueño",
        "desc": "No necesitas dormir y la magia no puede dormirte. Obtienes descanso largo meditando 4 horas."
      }
    ],
    "languages": [
      "Común",
      "Thri-kreen"
    ]
  },
  {
    "id": "grung",
    "name": "Grung (One Grung Above)",
    "category": "Monstruosa",
    "description": "Ranas humanoides arborícolas con piel de colores vivos que segregan toxinas paralizantes y saltan alturas increíbles entre las ramas.",
    "speed": "25 pies (Trepar 25 pies)",
    "size": "Pequeño",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Piel Venenosa",
        "desc": "Cualquier criatura que te sujete en una presa o toque tu piel debe superar salvación de Con (CD 12) o queda Envenenada por 1 minuto. Puedes aplicar tu toxina a armas perforantes como acción adicional."
      },
      {
        "name": "Salto Prodigioso",
        "desc": "Tu salto de longitud es de hasta 25 pies y tu salto de altura es de hasta 15 pies, con o sin carrerilla."
      },
      {
        "name": "Inmunidad al Veneno",
        "desc": "Inmune al daño por veneno y a la condición de Envenenado."
      },
      {
        "name": "Anfibio y Dependencia Acuática",
        "desc": "Puedes respirar aire y agua. Debes sumergirte en agua al menos 1 hora al día o sufres un nivel de agotamiento."
      }
    ],
    "languages": [
      "Grung"
    ]
  },
  {
    "id": "simic-hybrid",
    "name": "Híbrido Simic (Simic Hybrid - Ravnica)",
    "category": "Planar",
    "description": "Humanos, elfos o vedalken alterados genéticamente por el Biomante Simic que combinan tejidos de animales marinos y anfibios.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 60,
    "abilityScoreBonuses": {
      "con": 2,
      "any": 1
    },
    "traits": [
      {
        "name": "Mejora Animal (Nivel 1)",
        "desc": "Eliges una mutación: Planeo de Manta Raya (no sufres daño de caída y planeas 2 pies por cada pie que caigas), Caparazón Acorazado (+1 a la CA), o Nado y Branquias (velocidad de nado 30 pies y respiras agua)."
      },
      {
        "name": "Evolución Superior (Nivel 5)",
        "desc": "A nivel 5 eliges: Pinzas de Cangrejo (ataque desarmado 1d6 + Fuerza y presa como acción adicional), Escupitajo de Ácido (2d10 ácido a 30 pies), o Ojos Submarinos."
      }
    ],
    "languages": [
      "Común",
      "Élfico o Vedalken"
    ]
  },
  {
    "id": "giff",
    "name": "Giff (Spelljammer)",
    "category": "Planar",
    "description": "Humanoides con aspecto de hipopótamo orgullosos de su código militar y su dominio sin igual de las armas de fuego y la artillería cósmica.",
    "speed": "30 pies (Nado 30 pies)",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Dominio de Armas de Fuego",
        "desc": "Tienes competencia con todas las armas de fuego. Disparar un arma de fuego a 5 pies de un enemigo hostil no te impone desventaja y no sufres penalización por alcance largo."
      },
      {
        "name": "Fuerza Astral",
        "desc": "Tienes ventaja en tiradas de salvación de Fuerza y pruebas de característica de Fuerza. Una vez por turno, cuando golpeas con un arma cuerpo a cuerpo, sumas tu bono de competencia al daño."
      }
    ],
    "languages": [
      "Común"
    ]
  },
  {
    "id": "vedalken",
    "name": "Vedalken (Ravnica / Kaladesh)",
    "category": "Exótica",
    "description": "Seres de piel azulada fríos, metódicos y sumamente racionales que buscan la perfección teórica y práctica en todas las cosas.",
    "speed": "30 pies",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "int": 2,
      "wis": 1
    },
    "traits": [
      {
        "name": "Mente Racional Vedalken",
        "desc": "Tienes ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma."
      },
      {
        "name": "Precisión Incansable",
        "desc": "Ganas competencia en una habilidad de conocimiento (Arcano, Historia, Investigación, Medicina, Naturaleza o Religión) y una herramienta, y añades un dado 1d4 a las pruebas que hagas con ellas."
      },
      {
        "name": "Anfibio Parcial",
        "desc": "Puedes respirar bajo el agua hasta por 1 hora cada vez que te sumerges."
      }
    ],
    "languages": [
      "Común",
      "Vedalken"
    ]
  },
  {
    "id": "hadozee",
    "name": "Hadozee (Spelljammer)",
    "category": "Exótica",
    "description": "Simios alados nativos del Espacio Salvaje, conocidos por sus membranas de planeo que unen brazos y piernas, sus pies prensiles y su espíritu aventurero náutico.",
    "speed": "30 pies (Escalada 30 pies)",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "dex": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Pies Diestros (Dexterous Feet)",
        "desc": "Como acción adicional en tu turno, puedes realizar la acción de Usar un Objeto, manipular un objeto o usar herramientas simples utilizando tus pies prensiles."
      },
      {
        "name": "Planear (Glide)",
        "desc": "Cuando caes y no estás incapacitado, puedes usar tu reacción para desplegar tus membranas patagiales y planear. Restas hasta 100 pies de la caída al calcular el daño, y puedes moverte horizontalmente 5 pies por cada 1 pie que desciendas."
      },
      {
        "name": "Resiliencia Hadozee (Hadozee Resilience)",
        "desc": "La adaptación a la vida en los barcos espaciales te ha dotado de una resistencia innata. Cuando recibes daño, puedes usar tu reacción para tirar 1d6 + tu bonificador de competencia y reducir el daño recibido en esa cantidad. Puedes usar este rasgo un número de veces igual a tu bonificador de competencia por cada descanso largo."
      }
    ],
    "languages": [
      "Común",
      "Uno adicional"
    ]
  },
  {
    "id": "locathah",
    "name": "Locathah (Locathah Rising)",
    "category": "Exótica",
    "description": "Criaturas humanoides con rasgos de pez resistentes y observadoras que habitan en las cálidas aguas costeras y en lechos oceánicos protegidos.",
    "speed": "30 pies (Nadar 30 pies)",
    "size": "Mediano",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "str": 2,
      "dex": 1
    },
    "traits": [
      {
        "name": "Armadura Natural",
        "desc": "Posees escamas gruesas y resbaladizas. Tu Clase de Armadura base es 12 + tu modificador de Destreza cuando no llevas armadura."
      },
      {
        "name": "Observador y Atlético",
        "desc": "Tienes competencia en las habilidades de Atletismo y Percepción."
      },
      {
        "name": "Voluntad del Leviatán (Leviathan Will)",
        "desc": "Tienes ventaja en tiradas de salvación contra ser hechizado, asustado, paralizado, envenenado, aturdido o dormido mágicamente."
      },
      {
        "name": "Anfibiedad Limitada",
        "desc": "Puedes respirar tanto aire como agua, pero necesitas sumergirte en agua al menos una vez cada 4 horas para evitar asfixiarte."
      }
    ],
    "languages": [
      "Común",
      "Acuano"
    ]
  },
  {
    "id": "verdan",
    "name": "Verdan (Acquisitions Incorporated)",
    "category": "Exótica",
    "description": "Una raza en constante evolución mutagénica creada por el misterioso Caos de la Entidad que posee sangre negra, piel verdosa y un crecimiento físico espontáneo.",
    "speed": "30 pies",
    "size": "Pequeño",
    "darkvision": 0,
    "abilityScoreBonuses": {
      "cha": 2,
      "con": 1
    },
    "traits": [
      {
        "name": "Sanación de Sangre Negra (Black Blood Healing)",
        "desc": "La sangre oscura que corre por tus venas acelera tu regeneración. Cuando tiras un dado de golpe para recuperar puntos de golpe durante un descanso corto y obtienes un 1 o un 2, puedes relanzar el dado y debes usar el nuevo resultado."
      },
      {
        "name": "Telepatía Limitada",
        "desc": "Puedes comunicarte mentalmente con cualquier criatura que puedas ver a 30 pies de ti. No necesitas compartir un idioma común para transmitir ideas, emociones e imágenes sencillas."
      },
      {
        "name": "Perspicacia Telepática (Telepathic Insight)",
        "desc": "Tu conexión mental te alerta ante intrusiones y engaños. Tienes ventaja en todas las tiradas de salvación de Sabiduría y Carisma."
      },
      {
        "name": "Persuasivo",
        "desc": "Tienes competencia en la habilidad de Persuasión."
      },
      {
        "name": "Mutación de Crecimiento (Nivel 5)",
        "desc": "Al alcanzar el 5º nivel, tu cuerpo experimenta un repentino estirón de crecimiento mutagénico: tu categoría de tamaño cambia permanentemente de Pequeño a Mediano."
      }
    ],
    "languages": [
      "Común",
      "Goblin"
    ]
  }
];
