// Compendio Oficial de Objetos Mágicos de D&D 5e (SRD & Reglas Básicas)
// Incluye pociones, armas, armaduras, anillos, varas, varitas, bastones y objetos maravillosos

export type MagicItemRarity =
  | 'Común'
  | 'Poco Común'
  | 'Raro'
  | 'Muy Raro'
  | 'Legendario'
  | 'Artefacto';

export type MagicItemCategory =
  | 'Arma'
  | 'Armadura'
  | 'Poción'
  | 'Pergamino'
  | 'Anillo'
  | 'Vara o Varita'
  | 'Bastón'
  | 'Objeto Maravilloso';

export interface MagicItemDef {
  id: string;
  name: string;
  nameEn: string;
  category: MagicItemCategory;
  rarity: MagicItemRarity;
  attunement: boolean;
  attunementRequirement?: string;
  summary: string;
  description: string;
  effects: string[];
  source?: string;
}

export const OFFICIAL_5E_MAGIC_ITEMS: MagicItemDef[] = [
  // ---------------------------------------------------------------------------
  // POCIONES Y ELIXIRES
  // ---------------------------------------------------------------------------
  {
    id: 'pocion-curacion',
    name: 'Poción de Curación',
    nameEn: 'Potion of Healing',
    category: 'Poción',
    rarity: 'Común',
    attunement: false,
    summary: 'Restaura 2d4 + 2 Puntos de Golpe al beberla.',
    description: 'Un líquido rojo brillante que centellea levemente al agitar el frasco. Beberla o administrársela a otra criatura requiere una acción.',
    effects: [
      'Recuperas 2d4 + 2 Puntos de Golpe de forma instantánea.',
      'Puede ser suministrada a una criatura inconsciente adyacente como una acción.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-curacion-mayor',
    name: 'Poción de Curación Mayor',
    nameEn: 'Potion of Greater Healing',
    category: 'Poción',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Restaura 4d4 + 4 Puntos de Golpe al beberla.',
    description: 'El líquido rojo de esta poción pulsa con una luz cálida suave y cura heridas profundas al contacto con el organismo.',
    effects: [
      'Recuperas 4d4 + 4 Puntos de Golpe de forma instantánea.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-curacion-superior',
    name: 'Poción de Curación Superior',
    nameEn: 'Potion of Superior Healing',
    category: 'Poción',
    rarity: 'Raro',
    attunement: false,
    summary: 'Restaura 8d4 + 8 Puntos de Golpe al beberla.',
    description: 'Fluido rubí espeso y resplandeciente. Capaz de estabilizar héroes al borde de la aniquilación en pleno fragor de batalla.',
    effects: [
      'Recuperas 8d4 + 8 Puntos de Golpe de forma instantánea.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-curacion-suprema',
    name: 'Poción de Curación Suprema',
    nameEn: 'Potion of Supreme Healing',
    category: 'Poción',
    rarity: 'Muy Raro',
    attunement: false,
    summary: 'Restaura 10d4 + 20 Puntos de Golpe al beberla.',
    description: 'La cima de la alquimia de restauración médica. Un trago de esta esencia vivificante sella huesos rotos y órganos dañados al instante.',
    effects: [
      'Recuperas 10d4 + 20 Puntos de Golpe de forma instantánea.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-fuerza-gigante-colinas',
    name: 'Poción de Fuerza de Gigante de las Colinas',
    nameEn: 'Potion of Hill Giant Strength',
    category: 'Poción',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Tu puntuación de Fuerza pasa a ser 21 durante 1 hora.',
    description: 'Esta infusión transparente contiene una astilla de uña de gigante. Otorga una musculatura descomunal durante 1 hora.',
    effects: [
      'Tu Fuerza se fija en 21 (+5 de modificador) durante 1 hora.',
      'No tiene efecto si tu puntuación de Fuerza ya es igual o superior a 21.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-fuerza-gigante-fuego',
    name: 'Poción de Fuerza de Gigante de Fuego',
    nameEn: 'Potion of Fire Giant Strength',
    category: 'Poción',
    rarity: 'Raro',
    attunement: false,
    summary: 'Tu puntuación de Fuerza pasa a ser 25 durante 1 hora.',
    description: 'El líquido humea y huele a azufre y metal fundido. Confiere la potencia destructiva de los herreros titánicos.',
    effects: [
      'Tu Fuerza se fija en 25 (+7 de modificador) durante 1 hora.',
      'No tiene efecto si tu puntuación de Fuerza ya es igual o superior a 25.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-velocidad',
    name: 'Poción de Velocidad',
    nameEn: 'Potion of Speed',
    category: 'Poción',
    rarity: 'Muy Raro',
    attunement: false,
    summary: 'Otorga el efecto del conjuro Acelerar (Haste) durante 1 minuto sin requerir concentración.',
    description: 'Un brebaje amarillo efervescente que parece vibrar y dar vueltas dentro de su frasco de cristal.',
    effects: [
      'Ganas los beneficios del conjuro Acelerar durante 1 minuto: duplicas tu velocidad, +2 a la CA, ventaja en salvaciones de Destreza y 1 acción adicional por turno.',
      'No requiere mantener concentración mágica.',
      'Al terminar el minuto sufres la ola de letargo típica de Acelerar (no puedes moverte ni actuar durante 1 turno).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-invisibilidad',
    name: 'Poción de Invisibilidad',
    nameEn: 'Potion of Invisibility',
    category: 'Poción',
    rarity: 'Muy Raro',
    attunement: false,
    summary: 'Te vuelve invisible durante 1 hora; termina si atacas o lanzas un conjuro.',
    description: 'El frasco parece completamente vacío a la vista, pero al inclinarlo se siente el peso inconfundible del líquido.',
    effects: [
      'Te vuelves invisible junto con todo el equipo que lleves puesto o cargues durante 1 hora.',
      'El efecto termina prematuramente si realizas un ataque o lanzas un conjuro.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-vuelo',
    name: 'Poción de Vuelo',
    nameEn: 'Potion of Flying',
    category: 'Poción',
    rarity: 'Muy Raro',
    attunement: false,
    summary: 'Otorga velocidad de vuelo igual a tu velocidad de caminata durante 1 hora.',
    description: 'Líquido celeste transparente con pequeñas volutas de vapor blanco que imitan nubes en miniatura.',
    effects: [
      'Obtienes una velocidad de vuelo igual a tu velocidad caminando durante 1 hora.',
      'Puedes flotar en el aire. Si la duración expira mientras estás en el aire, caes a menos que tengas otro método para flotar.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-respiracion-acuatica',
    name: 'Poción de Respiración Acuática',
    nameEn: 'Potion of Water Breathing',
    category: 'Poción',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Permite respirar bajo el agua durante 24 horas.',
    description: 'Huele a brisa marina y tiene un color verdoso cristalino. Al beberla tus pulmones se adaptan al agua salada o dulce.',
    effects: [
      'Puedes respirar bajo el agua con total normalidad durante 24 horas.',
      'No afecta tu capacidad para respirar aire en la superficie.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-vitalidad',
    name: 'Poción de Vitalidad',
    nameEn: 'Potion of Vitality',
    category: 'Poción',
    rarity: 'Muy Raro',
    attunement: false,
    summary: 'Cura agotamiento, venenos y maximiza las tiradas de curación de dados de golpe por 24 horas.',
    description: 'Líquido carmesí denso con destellos dorados que restaura la fibra biológica más íntima.',
    effects: [
      'Elimina cualquier nivel de Agotamiento que poseas.',
      'Cura cualquier enfermedad o condición de Envenenado.',
      'Durante las siguientes 24 horas, cada vez que gastes un Dado de Golpe para curarte, recuperas el número máximo posible sin tirar el dado.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'pocion-invulnerabilidad',
    name: 'Poción de Invulnerabilidad',
    nameEn: 'Potion of Invulnerability',
    category: 'Poción',
    rarity: 'Raro',
    attunement: false,
    summary: 'Otorga resistencia a todos los tipos de daño durante 1 minuto.',
    description: 'Líquido plateado denso similar al mercurio derretido. Otorga una protección colosal en los momentos más críticos.',
    effects: [
      'Obtienes Resistencia a TODO tipo de daño durante 1 minuto (el daño recibido se reduce a la mitad).'
    ],
    source: 'SRD 5e / DMG'
  },

  // ---------------------------------------------------------------------------
  // ARMAS MÁGICAS
  // ---------------------------------------------------------------------------
  {
    id: 'arma-mas-uno',
    name: 'Arma +1',
    nameEn: 'Weapon +1',
    category: 'Arma',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Bonificador +1 a las tiradas de ataque y daño.',
    description: 'Forjada con técnicas maestras o imbuida con magia arcana permanente. Supera resistencias al daño no mágico.',
    effects: [
      'Obtienes un bonificador de +1 a las tiradas de ataque y a las tiradas de daño realizadas con esta arma mágica.',
      'Los ataques con esta arma cuentan como mágicos para superar resistencias e inmunidades.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'arma-mas-dos',
    name: 'Arma +2',
    nameEn: 'Weapon +2',
    category: 'Arma',
    rarity: 'Raro',
    attunement: false,
    summary: 'Bonificador +2 a las tiradas de ataque y daño.',
    description: 'Una pieza de artesanía bélica de leyenda, con grabados rúnicos resplandecientes que canalizan poder.',
    effects: [
      'Obtienes un bonificador de +2 a las tiradas de ataque y a las tiradas de daño realizadas con esta arma mágica.',
      'Cuenta como arma mágica para superar resistencias e inmunidades.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'arma-mas-tres',
    name: 'Arma +3',
    nameEn: 'Weapon +3',
    category: 'Arma',
    rarity: 'Muy Raro',
    attunement: false,
    summary: 'Bonificador +3 a las tiradas de ataque y daño.',
    description: 'Arma forjada por los más ilustres artesanos o dioses de la guerra; su balance y filo desafían los límites mortales.',
    effects: [
      'Obtienes un bonificador de +3 a las tiradas de ataque y a las tiradas de daño realizadas con esta arma mágica.',
      'Cuenta como arma mágica para superar resistencias e inmunidades.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'lengua-de-fuego',
    name: 'Lengua de Fuego',
    nameEn: 'Flame Tongue',
    category: 'Arma',
    rarity: 'Raro',
    attunement: true,
    summary: 'Estalla en llamas como acción adicional, infligiendo 2d6 de daño de fuego adicional en cada impacto.',
    description: 'Puedes usar una acción adicional para pronunciar la palabra de mando del arma. La hoja estalla en llamas ardientes proyectando luz brillante en un radio de 40 pies y luz tenue 40 pies más.',
    effects: [
      'Inflige 2d6 de daño por Fuego adicional con cada impacto mientras esté encendida.',
      'Las llamas duran hasta que uses otra acción adicional para apagarlas o envaines/sueltes el arma.',
      'Ilumina 40 pies de luz brillante y 40 pies adicionales de luz tenue.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'espada-solar',
    name: 'Espada Solar',
    nameEn: 'Sun Blade',
    category: 'Arma',
    rarity: 'Raro',
    attunement: true,
    summary: 'Espada larga con hoja de luz radiante (+2), propiedad sutil (finesse) y +1d8 de daño radiante contra no-muertos.',
    description: 'Este pomo de espada carece de hoja metálica. Al empuñarlo y usar una acción adicional, brota una hoja resplandeciente de pura energía radiante solar.',
    effects: [
      'Posee bonificador +2 al ataque y al daño. El daño es de tipo Radiante en lugar de cortante.',
      'Posee la propiedad Sutil (Finesse), permitiendo usar Destreza para atacar y calcular el daño.',
      'Inflige 1d8 de daño radiante adicional a cualquier objetivo no-muerto.',
      'Emite luz solar brillante en un radio de 15 pies (expandible a voluntad hasta 30 pies).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'espada-matadragones',
    name: 'Espada Matadragones',
    nameEn: 'Dragon Slayer',
    category: 'Arma',
    rarity: 'Raro',
    attunement: false,
    summary: 'Espada mágica +1 que inflige 3d6 de daño adicional contra dragones.',
    description: 'Forjada con grabados de escamas rotas. Vibra levemente ante la presencia de dragones o descendientes draconianos.',
    effects: [
      'Ganas un bonificador de +1 a las tiradas de ataque y daño.',
      'Cuando golpeas a un dragón (tipo Dragon), el arma inflige 3d6 de daño adicional del tipo de daño del arma.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'arco-del-juramento',
    name: 'Arco del Juramento',
    nameEn: 'Oathbow',
    category: 'Arma',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Jura a un enemigo predilecto: ventaja en ataques, +3d6 daño de fuerza e ignora coberturas.',
    description: 'Al tensar este arco largo élfico contra un objetivo, susurras en élfico: "Rápida derrota a mis enemigos". El arco sella el juramento contra esa criatura.',
    effects: [
      'Tienes Ventaja en todas las tiradas de ataque contra tu enemigo jurado.',
      'Tus ataques contra el enemigo jurado infligen 3d6 de daño de Fuerza adicional.',
      'Tus disparos ignoran la cobertura media y tres cuartos contra tu enemigo jurado.',
      'No sufres desventaja por disparar a largo alcance contra tu enemigo jurado.',
      'Desventaja con cualquier otra arma mientras el enemigo jurado siga con vida.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'espada-del-invierno',
    name: 'Espada del Invierno',
    nameEn: 'Frost Brand',
    category: 'Arma',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Inflige 1d6 de daño de frío extra, otorga resistencia al fuego y extingue llamas cercanas.',
    description: 'La hoja de esta espada está cubierta de escarcha eterna. Su empuñadura permanece fresca al tacto incluso en las calderas de los planos inferiores.',
    effects: [
      'Inflige 1d6 de daño de Frío adicional con cada impacto con éxito.',
      'Mientras la lleves empuñada, tienes Resistencia al daño de Fuego.',
      'En temperaturas bajo cero emite una luz tenue fría en 10 pies.',
      'Como acción puedes extinguir todas las llamas no mágicas en un radio de 30 pies una vez por hora.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'vengadora-sagrada',
    name: 'Vengadora Sagrada',
    nameEn: 'Holy Avenger',
    category: 'Arma',
    rarity: 'Legendario',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un Paladín',
    summary: 'Espada +3 suprema para paladines; +2d10 radiante contra infernales y no-muertos; aura de ventaja en salvaciones.',
    description: 'La reliquia más sagrada del multiverso militar divino. Bañada en luz celestial radiante, es el azote definitivo del mal.',
    effects: [
      'Ganas un bonificador de +3 a las tiradas de ataque y daño.',
      'Inflige 2d10 de daño Radiante adicional cuando impacta a un infernal (fiend) o no-muerto (undead).',
      'Aura Sagrada: Estando desenvainada, emite un aura de 10 pies (ampliada a 30 pies si eres Paladín nivel 17+) que otorga a ti y a todos los aliados Ventaja en tiradas de salvación contra conjuros y efectos mágicos.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'filo-vorpal',
    name: 'Filo Vorpal',
    nameEn: 'Vorpal Sword',
    category: 'Arma',
    rarity: 'Legendario',
    attunement: true,
    summary: 'Espada +3 que decapita instantáneamente al sacar un 20 natural en la tirada de ataque.',
    description: 'Un arma legendaria cuyo filo corta la misma trama de la realidad. Con un zumbido metálico sobrenatural, rebanará cuellos con precisión letal.',
    effects: [
      'Ganas un bonificador de +3 a las tiradas de ataque y daño.',
      'Ignora la resistencia al daño cortante de los enemigos.',
      'Decapitación: Cuando sacas un 20 natural en una tirada de ataque contra una criatura con al menos una cabeza, le cortas una cabeza. Si la criatura no puede sobrevivir sin esa cabeza, muere instantáneamente.',
      'Si el objetivo no tiene cabeza, es demasiado grande o el DM dictamina que no muere sin cabeza, recibe 6d8 de daño cortante adicional en lugar de ser decapitado.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'daga-del-veneno',
    name: 'Daga del Veneno',
    nameEn: 'Dagger of Venom',
    category: 'Arma',
    rarity: 'Raro',
    attunement: false,
    summary: 'Daga +1 que puede recubrirse con veneno letal (+2d10 daño y condición Envenenado, CD 15 Con).',
    description: 'La hoja de obsidiana negra rezuma una sustancia oleosa verdosa al presionar la cruceta.',
    effects: [
      'Ganas un bonificador de +1 a las tiradas de ataque y daño.',
      'Como acción puedes ordenar a la daga que segregue veneno. En tu siguiente impacto con éxito durante 1 minuto, el objetivo debe superar una salvación de Constitución CD 15 o recibir 2d10 de daño de veneno y quedar Envenenado durante 1 minuto. Se recarga tras un descanso largo.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'jabalina-del-relampago',
    name: 'Jabalina del Relámpago',
    nameEn: 'Javelin of Lightning',
    category: 'Arma',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Al lanzarla se transforma en un rayo de 120 pies infligiendo 4d6 de daño eléctrico.',
    description: 'Grabada con símbolos de tormenta. Al ser arrojada emite un trueno ensordecedor y se disuelve en pura electricidad pura.',
    effects: [
      'Cuando arrojas esta jabalina mágica y pronuncias su palabra de mando, se convierte en un rayo de 5 pies de ancho y hasta 120 pies de largo.',
      'Cada criatura en la línea debe superar una salvación de Destreza CD 13 o sufrir 4d6 de daño Eléctrico (mitad si tiene éxito).',
      'La jabalina vuelve a su forma física al alcanzar al objetivo seleccionado al final de la línea e inflige su daño normal de impacto + 4d6 de daño eléctrico si impacta.',
      'Esta propiedad se recarga al amanecer.'
    ],
    source: 'SRD 5e / DMG'
  },

  // ---------------------------------------------------------------------------
  // ARMADURAS Y ESCUDOS
  // ---------------------------------------------------------------------------
  {
    id: 'armadura-adamantina',
    name: 'Armadura de Adamantina',
    nameEn: 'Adamantine Armor',
    category: 'Armadura',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Cualquier impacto crítico recibido se convierte en un impacto normal.',
    description: 'Forjada con uno de los metales más duros del multiverso. Esta armadura media o pesada disipa la fuerza de los golpes más devastadores.',
    effects: [
      'Inmunidad a Críticos: Mientras lleves esta armadura, cualquier impacto crítico contra ti se convierte en un impacto de ataque normal.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'armadura-mitral',
    name: 'Armadura de Mitral',
    nameEn: 'Mithral Armor',
    category: 'Armadura',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Elimina la desventaja en Sigilo y el requisito de Fuerza de las armaduras pesadas o medias.',
    description: 'El mitral es un metal ligero y plateado y flexible. Permite una agilidad sin restricciones.',
    effects: [
      'Si el tipo de armadura impone normalmente Desventaja en pruebas de Destreza (Sigilo), la versión de mitral NO impone dicha desventaja.',
      'Elimina cualquier requisito mínimo de Fuerza necesario para vestir la armadura sin penalización de movimiento.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'escudo-mas-uno',
    name: 'Escudo +1',
    nameEn: 'Shield +1',
    category: 'Armadura',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Otorga un total de +3 a la CA (+2 base del escudo más +1 mágico).',
    description: 'Un escudo robusto con refuerzos mágicos que desvían proyectiles y estocadas con facilidad.',
    effects: [
      'Mientras empuñes este escudo ganas un bonificador de +1 a la CA además de los +2 normales otorgados por un escudo (+3 de CA total).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'escudo-mas-dos',
    name: 'Escudo +2',
    nameEn: 'Shield +2',
    category: 'Armadura',
    rarity: 'Raro',
    attunement: false,
    summary: 'Otorga un total de +4 a la CA (+2 base del escudo más +2 mágico).',
    description: 'Escudo bellamente labrado con filigrana dorada que forma una barrera cinética invisible.',
    effects: [
      'Otorga +2 a la CA adicional mientras se empuña (+4 de CA total).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'escudo-animado',
    name: 'Escudo Animado',
    nameEn: 'Animated Shield',
    category: 'Armadura',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Flota alrededor tuyo como acción adicional, otorgando +2 CA y dejando tus dos manos libres durante 1 minuto.',
    description: 'Pronunciando su palabra de mando, el escudo se desprende de tu brazo y vuela a protegerte protegiendo tus flancos.',
    effects: [
      'Como acción adicional puedes hacer que el escudo flote en el aire para protegerte durante 1 minuto.',
      'Obtienes el bonificador normal de +2 a la CA del escudo sin ocupar ninguna de tus manos.',
      'Te permite empuñar un arma a dos manos o dos armas y aun así disfrutar del beneficio defensivo del escudo.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'armadura-resistencia',
    name: 'Armadura de Resistencia',
    nameEn: 'Armor of Resistance',
    category: 'Armadura',
    rarity: 'Raro',
    attunement: true,
    summary: 'Otorga resistencia permanente a un tipo de daño elemental específico.',
    description: 'Esta armadura está imbuida con esencias de planos elementales protectores.',
    effects: [
      'Posees Resistencia a uno de los siguientes tipos de daño (determinado al crearse): Ácido, Frío, Fuego, Fuerza, Relámpago, Necrótico, Veneno, Psíquico, Radiante o Trueno.'
    ],
    source: 'SRD 5e / DMG'
  },

  // ---------------------------------------------------------------------------
  // ANILLOS MÁGICOS
  // ---------------------------------------------------------------------------
  {
    id: 'anillo-proteccion',
    name: 'Anillo de Protección',
    nameEn: 'Ring of Protection',
    category: 'Anillo',
    rarity: 'Raro',
    attunement: true,
    summary: 'Otorga +1 a la Clase de Armadura y +1 a todas las tiradas de salvación.',
    description: 'Un aro pulido de platino engastado con un pequeño zafiro. Emite una barrera protectora pasiva.',
    effects: [
      'Ganas un bonificador de +1 a tu Clase de Armadura (CA).',
      'Ganas un bonificador de +1 a todas tus tiradas de salvación (FUE, DES, CON, INT, SAB, CAR).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'anillo-accion-libre',
    name: 'Anillo de Acción Libre',
    nameEn: 'Ring of Free Action',
    category: 'Anillo',
    rarity: 'Raro',
    attunement: true,
    summary: 'Ignoras terreno difícil mágico y no puedes ser paralizado ni retenido por magia.',
    description: 'Grabado con olas y viento en perpetuo movimiento sobre una aleación de oro y plata.',
    effects: [
      'El terreno difícil no te cuesta movimiento adicional.',
      'La magia no puede reducir tu velocidad ni hacer que quedes Paralizado o Apresado (Restrained).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'anillo-almacenamiento-conjuros',
    name: 'Anillo de Almacenamiento de Conjuros',
    nameEn: 'Ring of Spell Storing',
    category: 'Anillo',
    rarity: 'Raro',
    attunement: true,
    summary: 'Almacena hasta 5 niveles de conjuros para ser lanzados posteriormente por el portador.',
    description: 'Cualquier lanzador de conjuros puede lanzar un conjuro de nivel 1 a 5 dentro del anillo tocándolo. El conjuro queda almacenado sin gastar ranura al ser activado después.',
    effects: [
      'Puede contener hasta 5 niveles combinados de conjuros a la vez (por ejemplo: un conjuro de nivel 3 y uno de nivel 2).',
      'El portador puede lanzar cualquier conjuro almacenado usando el tiempo de lanzamiento original, pero utilizando la CD de salvación, el bonificador de ataque y la habilidad del lanzador original que introdujo el conjuro.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'anillo-evasion',
    name: 'Anillo de Evasión',
    nameEn: 'Ring of Evasion',
    category: 'Anillo',
    rarity: 'Raro',
    attunement: true,
    summary: 'Tiene 3 cargas para convertir una tirada de salvación de Destreza fallida en un éxito automático como reacción.',
    description: 'Ligero como una pluma y hecho de cobre entrelazado. Guía tus reflejos de manera instintiva.',
    effects: [
      'Posee 3 cargas. Recupera 1d3 cargas gastadas cada día al amanecer.',
      'Cuando fallas una tirada de salvación de Destreza, puedes gastar 1 carga como Reacción para tener éxito en su lugar.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'anillo-regeneracion',
    name: 'Anillo de Regeneración',
    nameEn: 'Ring of Regeneration',
    category: 'Anillo',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Recuperas 1d6 PG cada 10 minutos y hace crecer extremidades amputadas.',
    description: 'Un aro de oro blanco entrelazado con una enredadera viva de marfil que nunca se marchita.',
    effects: [
      'Recuperas 1d6 Puntos de Golpe cada 10 minutos mientras tengas al menos 1 Punto de Golpe.',
      'Si pierdes una extremidad (brazo, pierna, dedo), el anillo la regenera por completo en un plazo de 1d6 + 1 días si permaneces sintonizado.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'anillo-invisibilidad',
    name: 'Anillo de Invisibilidad',
    nameEn: 'Ring of Invisibility',
    category: 'Anillo',
    rarity: 'Legendario',
    attunement: true,
    summary: 'Te vuelve invisible a voluntad como acción tantas veces como desees.',
    description: 'Un simple aro dorado pulido sin ninguna marca que parece desvanecerse cuando la luz incide en determinado ángulo.',
    effects: [
      'Mientras lleves puesto este anillo, puedes usar una acción para volverte invisible.',
      'Permaneces invisible hasta que te quites el anillo, uses una acción adicional para cancelar el efecto, o ataques o lances un conjuro.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'anillo-tres-deseos',
    name: 'Anillo de los Tres Deseos',
    nameEn: 'Ring of Three Wishes',
    category: 'Anillo',
    rarity: 'Legendario',
    attunement: false,
    summary: 'Contiene 3 cargas para lanzar el conjuro Deseo (Wish). Al agotarse pierde su magia.',
    description: 'Un anillo mítico engastado con tres diamantes fulgurantes. Cada vez que se formula un deseo, uno de los diamantes se desintegra en polvo estelar.',
    effects: [
      'El anillo tiene 3 cargas. Mientras lo lleves puesto, puedes usar una acción para gastar 1 carga y lanzar el conjuro Deseo.',
      'Una vez gastadas las 3 cargas, el anillo pierde toda su magia y se convierte en un aro de platino no mágico.'
    ],
    source: 'SRD 5e / DMG'
  },

  // ---------------------------------------------------------------------------
  // VARAS, VARITAS Y BASTONES
  // ---------------------------------------------------------------------------
  {
    id: 'varita-proyectiles-magicos',
    name: 'Varita de Proyectiles Mágicos',
    nameEn: 'Wand of Magic Missiles',
    category: 'Vara o Varita',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Tiene 7 cargas para lanzar Proyectil Mágico sin gastar ranuras de conjuro.',
    description: 'Una varilla delgada tallada en cuarzo y madera de fresno. No requiere ser lanzador de conjuros para utilizarse.',
    effects: [
      'Tiene 7 cargas. Recupera 1d6 + 1 cargas gastadas al amanecer.',
      'Como acción puedes gastar de 1 a 7 cargas para lanzar Proyectil Mágico (Magic Missile). Cada carga por encima de la primera aumenta el nivel del conjuro en 1.',
      'Si gastas la última carga, tira 1d20: con un 1 la varita se deshace en cenizas.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'varita-bolas-fuego',
    name: 'Varita de Bolas de Fuego',
    nameEn: 'Wand of Fireballs',
    category: 'Vara o Varita',
    rarity: 'Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un lanzador de conjuros',
    summary: 'Tiene 7 cargas para lanzar Bola de Fuego (CD 15).',
    description: 'Tallada en madera carbonizada pero incorruptible, coronada por un rubí incandescente que emite calor suave.',
    effects: [
      'Tiene 7 cargas. Recupera 1d6 + 1 cargas gastadas cada día al amanecer.',
      'Puedes usar una acción para gastar 1 o más cargas y lanzar Bola de Fuego (CD 15 para la salvación de Destreza). 1 carga lanza el conjuro a nivel 3; cada carga adicional eleva el nivel en 1.',
      'Si gastas la última carga, tira 1d20: con un 1 la varita estalla en humo y queda destruida.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'varita-mago-guerra-1',
    name: 'Varita del Mago de Guerra +1',
    nameEn: 'Wand of the War Mage +1',
    category: 'Vara o Varita',
    rarity: 'Poco Común',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un lanzador de conjuros',
    summary: '+1 a tiradas de ataque con conjuros e ignora cobertura media con conjuros.',
    description: 'Forjada en hierro frío y reforzada con runas arcanas tácticas.',
    effects: [
      'Ganas un bonificador de +1 a las tiradas de ataque con conjuros mientras la empuñes.',
      'Tus ataques con conjuro ignoran la cobertura media (Half Cover) de los objetivos.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'baston-curacion',
    name: 'Bastón de Curación',
    nameEn: 'Staff of Healing',
    category: 'Bastón',
    rarity: 'Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por Bardo, Clérigo o Druida',
    summary: 'Tiene 10 cargas para lanzar Curar Heridas, Restablecimiento Menor y Curación Masiva.',
    description: 'Un báculo de fresno blanco coronado por un capullo de loto de marfil que nunca se cierra.',
    effects: [
      'Tiene 10 cargas. Recupera 1d6 + 4 cargas al amanecer.',
      'Como acción puedes gastar cargas para lanzar: Curar Heridas (1 carga por nivel de conjuro, hasta nivel 4), Restablecimiento Menor (2 cargas), o Curación Masiva (5 cargas).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'baston-del-poder',
    name: 'Bastón del Poder',
    nameEn: 'Staff of Power',
    category: 'Bastón',
    rarity: 'Muy Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por Hechicero, Brujo o Mago',
    summary: 'Arma mágica +2, +2 a CA y salvaciones; 20 cargas de conjuros destructivos y Golpe Retributivo cataclísmico.',
    description: 'Uno de los bastones arcanos más reverenciados y temibles. Canaliza una reserva inmensa de energía mágica primordial.',
    effects: [
      'Funciona como un bastón mágico +2 a tiradas de ataque y daño.',
      'Otorga un bonificador de +2 a tu Clase de Armadura y +2 a todas las tiradas de salvación mientras lo sostengas.',
      'Tiene 20 cargas. Recupera 2d8 + 4 cargas al amanecer. Permite lanzar: Proyectil Mágico (1), Rayo Relampagueante (5), Bola de Fuego (5), Muro de Fuerza (5), Cono de Frío (5), Globo de Invulnerabilidad (6), Parálisis (2), Levitar (2).',
      'Golpe Retributivo: Puedes romper el bastón en tus rodillas provocando una explosión colosal de hasta 16d20 de daño de fuerza en 30 pies.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'baston-de-los-magos',
    name: 'Bastón de los Magos',
    nameEn: 'Staff of the Magi',
    category: 'Bastón',
    rarity: 'Legendario',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por Hechicero, Brujo o Mago',
    summary: 'La cumbre de la magia arcana: +2 a ataques/salvaciones de conjuro, absorción mágica de conjuros enemigos, ventaja en salvaciones contra magia y 50 cargas.',
    description: 'Una obra maestra arcana de eras olvidadas. El bastón resuena con la canción del propio tejido de la magia universal.',
    effects: [
      'Ganas un bonificador de +2 a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros.',
      'Tienes Ventaja en todas las tiradas de salvación contra conjuros y otros efectos mágicos.',
      'Absorción de Conjuros: Cuando un conjuro te toma como objetivo único, puedes usar tu Reacción para anularlo y absorber sus niveles como cargas en el bastón.',
      'Posee 50 cargas con un repertorio gigantesco de conjuros (Invisibilidad, Disipar Magia, Pasamuros, Teletransporte, Tormenta de Hielo, etc.).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'vara-guardian-pacto-1',
    name: 'Vara del Guardián del Pacto +1',
    nameEn: 'Rod of the Pact Keeper +1',
    category: 'Vara o Varita',
    rarity: 'Poco Común',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un Brujo',
    summary: '+1 a tiradas de ataque y CD de conjuros de Brujo; permite recuperar 1 ranura de pacto por descanso largo.',
    description: 'Un cetro de metal oscuro con incrustaciones de obsidiana vinculado a las entidades de los planos exteriores.',
    effects: [
      'Ganas un bonificador de +1 a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de Brujo.',
      'Como acción puedes recuperar 1 ranura de conjuro de Brujo gastada una vez por día tras completar un descanso largo.'
    ],
    source: 'SRD 5e / DMG'
  },

  // ---------------------------------------------------------------------------
  // OBJETOS MARAVILLOSOS
  // ---------------------------------------------------------------------------
  {
    id: 'bolsa-de-contencion',
    name: 'Bolsa de Contención',
    nameEn: 'Bag of Holding',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Almacena hasta 500 libras y 64 pies cúbicos de volumen con un peso fijo constante de 15 libras.',
    description: 'Esta bolsa de tela rústica parece un saco ordinario de 2 pies por 4 pies. Su interior conduce a un espacio extradimensional.',
    effects: [
      'Capacidad máxima de carga: 500 libras (aproximadamente 226 kg) o un volumen de 64 pies cúbicos.',
      'El peso de la bolsa siempre es de 15 libras, sin importar lo que contenga.',
      'Recuperar un objeto de la bolsa requiere una acción.',
      'Si se perfora, se rasga o se sobrecarga, se rompe y su contenido se dispersa en el Plano Astral.',
      'Introducir la bolsa dentro de un Espacio Portátil u otro contenedor extradimensional abre un portal instantáneo al Plano Astral que destruye ambos objetos y succiona todo en 10 pies.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'manto-de-proteccion',
    name: 'Manto de Protección',
    nameEn: 'Cloak of Protection',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    summary: 'Otorga +1 a la Clase de Armadura y +1 a todas las tiradas de salvación.',
    description: 'Una elegante capa de lana fina reforzada con hilos de seda feérica protectora.',
    effects: [
      'Ganas un bonificador de +1 a la CA mientras la lleves puesta.',
      'Ganas un bonificador de +1 a todas las tiradas de salvación.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'manto-del-desplazamiento',
    name: 'Manto del Desplazamiento',
    nameEn: 'Cloak of Displacement',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    summary: 'Proyecta una ilusión óptica que otorga desventaja a los atacantes hasta que sufras daño.',
    description: 'Confeccionado a partir de la piel de una bestia trémula (Displacer Beast). La capa proyecta una imagen tuya ligeramente desplazada de tu posición real.',
    effects: [
      'Todas las tiradas de ataque contra ti tienen Desventaja permanente.',
      'Si recibes daño, esta propiedad deja de funcionar temporalmente hasta el inicio de tu próximo turno.',
      'La propiedad se interrumpe si quedas Incapacitado o Inconsciente.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'botas-aladas',
    name: 'Botas Aladas',
    nameEn: 'Winged Boots',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    summary: 'Otorga velocidad de vuelo igual a tu velocidad de caminata por hasta 4 horas acumulables al día.',
    description: 'Unas botas de cuero suave adornadas con pequeñas alas de paloma bordadas a los costados.',
    effects: [
      'Te otorgan una velocidad de vuelo igual a tu velocidad de caminata.',
      'Puedes volar hasta un total de 4 horas por día (usables en bloques continuos o en incrementos de 1 minuto).',
      'Las botas recuperan 2 horas de vuelo por cada 12 horas seguidas que no se utilicen.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'botas-de-velocidad',
    name: 'Botas de Velocidad',
    nameEn: 'Boots of Speed',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    summary: 'Dobla tu velocidad de caminata y los ataques de oportunidad contra ti tienen desventaja durante 10 minutos.',
    description: 'Al chocar los talones como acción adicional, las botas brillan y aumentan drásticamente tu aceleración motora.',
    effects: [
      'Duplica tu velocidad de caminar durante un máximo de 10 minutos al día.',
      'Cualquier ataque de oportunidad realizado contra ti durante este tiempo tiene Desventaja.',
      'Recupera su uso completo tras completar un descanso largo.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'botas-rapidez-elfa',
    name: 'Botas de Rapidez Elfa',
    nameEn: 'Boots of Elvenkind',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Tus pasos no hacen ruido y tienes ventaja en pruebas de Destreza (Sigilo) para moverte en silencio.',
    description: 'Confeccionadas con cuero de ciervo y tratadas con ungüentos silvanos que amortiguan cualquier vibración acústica.',
    effects: [
      'Tus pasos son completamente inaudibles, sin importar la superficie por la que camines.',
      'Tienes Ventaja en todas las pruebas de Destreza (Sigilo) que dependan de moverte sigilosamente.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'guanteletes-fuerza-ogro',
    name: 'Guanteletes de Fuerza de Ogro',
    nameEn: 'Gauntlets of Ogre Power',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    summary: 'Tu puntuación de Fuerza se convierte en 19 (+4).',
    description: 'Guantes de cuero grueso recubiertos de placas de hierro nudoso con remaches de bronce.',
    effects: [
      'Tu puntuación de Fuerza pasa a ser 19 (+4 de modificador).',
      'No tiene efecto si tu Fuerza ya es de 19 o superior.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'diadema-intelecto',
    name: 'Diadema de Intelecto',
    nameEn: 'Headband of Intellect',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    summary: 'Tu puntuación de Inteligencia se convierte en 19 (+4).',
    description: 'Una diadema de plata pulida engastada con una gema azulina que aclara y expande la agilidad de los pensamientos.',
    effects: [
      'Tu puntuación de Inteligencia pasa a ser 19 (+4 de modificador).',
      'No tiene efecto si tu Inteligencia ya es de 19 o superior.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'amuleto-de-salud',
    name: 'Amuleto de Salud',
    nameEn: 'Amulet of Health',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    summary: 'Tu puntuación de Constitución se convierte en 19 (+4).',
    description: 'Un talismán en forma de corazón forjado en cobre y oro. Fortalece las células y la resistencia del cuerpo.',
    effects: [
      'Tu puntuación de Constitución pasa a ser 19 (+4 de modificador).',
      'Aumenta tus Puntos de Golpe máximos en función de tu nuevo modificador de Constitución.',
      'No tiene efecto si tu Constitución ya es de 19 o superior.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'cinturon-fuerza-gigante-colinas',
    name: 'Cinturón de Fuerza de Gigante de las Colinas',
    nameEn: 'Belt of Hill Giant Strength',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    summary: 'Tu puntuación de Fuerza se convierte en 21 (+5).',
    description: 'Un cinturón de cuero de mamut con una hebilla colosal de hierro forjado.',
    effects: [
      'Tu puntuación de Fuerza pasa a ser 21 (+5 de modificador).',
      'No tiene efecto si tu puntuación de Fuerza ya es de 21 o mayor.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'broche-de-proteccion',
    name: 'Broche de Protección',
    nameEn: 'Brooch of Shielding',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    summary: 'Otorga resistencia al daño de Fuerza e inmunidad total a Proyectil Mágico.',
    description: 'Un broche circular de plata con la efigie de un escudo protector.',
    effects: [
      'Tienes Resistencia al daño de Fuerza.',
      'Inmunidad absoluta al conjuro Proyectil Mágico (Magic Missile).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'gafas-vision-nocturna',
    name: 'Gafas de Visión Nocturna',
    nameEn: 'Goggles of Night',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Otorga visión en la oscuridad de 60 pies (o suma 60 pies a la que ya tengas).',
    description: 'Lentes oscuros montados en un armazón de latón flexible.',
    effects: [
      'Ganas Visión en la Oscuridad (Darkvision) con un alcance de 60 pies.',
      'Si tu personaje ya posee visión en la oscuridad, su alcance se incrementa en 60 pies adicionales.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'barra-inamovible',
    name: 'Barra Inamovible',
    nameEn: 'Immovable Rod',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: false,
    summary: 'Al pulsar un botón queda fijada mágicamente en el espacio soportando hasta 8.000 lb de peso.',
    description: 'Una barra de hierro plano con un botón en un extremo. Desafía las leyes de la gravedad y la física terrenal.',
    effects: [
      'Al pulsar el botón como acción, la barra queda congelada en su posición exacta en el espacio, levitando en el aire.',
      'Soporta hasta 8.000 libras de peso antes de desactivarse y caer.',
      'Una criatura puede intentar moverla con una prueba de Fuerza CD 30 (moviéndola un máximo de 10 pies).'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'perla-de-poder',
    name: 'Perla de Poder',
    nameEn: 'Pearl of Power',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un lanzador de conjuros',
    summary: 'Recupera 1 ranura de conjuro gastada de nivel 3 o menor una vez al día.',
    description: 'Una perla iridiscente del tamaño de un ojo humano que vibra con energía mística contenida.',
    effects: [
      'Como acción puedes pronunciar la palabra de mando de la perla para recuperar 1 ranura de conjuro gastada de nivel 3 o inferior.',
      'Una vez usada no puede volver a emplearse hasta el siguiente amanecer.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'baraja-de-muchas-cosas',
    name: 'Baraja de Muchas Cosas',
    nameEn: 'Deck of Many Things',
    category: 'Objeto Maravilloso',
    rarity: 'Legendario',
    attunement: false,
    summary: 'La baraja de pergaminos más impredecible y destructiva de D&D; robar cartas altera el destino para siempre.',
    description: 'Guardada en una caja de madera o cuero. Antes de robar una carta, debes declarar cuántas cartas pretendes robar. Cada carta desencadena efectos inmediatos irreversibles.',
    effects: [
      'El Caballero (Knight): Ganas el servicio leal de un guerrero nivel 4.',
      'La Calavera (Skull): Invoca un avatar de la muerte que debes derrotar a solas.',
      'La Luna (Moon): Te concede 1d3 usos del conjuro Deseo.',
      'El Sol (Sun): Obtienes 50.000 PX y un objeto maravilloso prodigioso.',
      'El Vacío (The Void): Tu alma es arrancada de tu cuerpo y aprisionada en un objeto custodiado en otro plano existencial.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'esfera-de-aniquilacion',
    name: 'Esfera de Aniquilación',
    nameEn: 'Sphere of Annihilation',
    category: 'Objeto Maravilloso',
    rarity: 'Legendario',
    attunement: false,
    summary: 'Globo de vacío absoluto de 2 pies de diámetro que desintegra cualquier materia que toque.',
    description: 'Un agujero negro en miniatura en el tejido del multiverso. No tiene peso ni calor, solo una nada insondable.',
    effects: [
      'Cualquier materia que entre en contacto con la esfera queda desintegrada al instante sin dejar rastro.',
      'Solo artefactos divinos y deidades pueden resistir el contacto con la esfera.',
      'Una criatura a 60 pies puede intentar controlar su movimiento con una prueba de Inteligencia (Arcanos) CD 25 como acción.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'fortaleza-instantanea-daern',
    name: 'Fortaleza Instantánea de Daern',
    nameEn: "Daern's Instant Fortress",
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: false,
    summary: 'Un cubo de adamantina de 1 pulgada que crece hasta convertirse en una torre fortificada de 30 pies de altura.',
    description: 'Al colocar el cubo en el suelo y pronunciar la palabra de mando, se expande instantáneamente en una torre de adamantina de dos pisos.',
    effects: [
      'Mide 20 pies de lado y 30 pies de alto, con aspilleras en todos los flancos y una puerta que solo se abre con la palabra de mando.',
      'Cualquier criatura en el área al expandirse debe superar una salvación de Destreza CD 15 o recibir 10d10 de daño contundente.',
      'Las paredes de adamantina tienen 100 Puntos de Golpe e inmunidad a daño no mágico que no provenga de armas de asedio.'
    ],
    source: 'SRD 5e / DMG'
  },
  {
    id: 'ojo-de-vecna',
    name: 'Ojo de Vecna',
    nameEn: 'Eye of Vecna',
    category: 'Objeto Maravilloso',
    rarity: 'Artefacto',
    attunement: true,
    summary: 'El ojo conservado del dios liche Vecna. Debe ser insertado en la propia cuenca ocular para otorgar poderes inmensos a costa de la corrupción del alma.',
    description: 'Un ojo arrugado e inyectado en sangre. Para sintonizarse con él, el usuario debe arrancarse un ojo propio y presionar el artefacto en la cuenca vacía.',
    effects: [
      'Obtienes Visión Verdadera (Truesight) continua y visión en la oscuridad mágica.',
      'Otorga 8 cargas diarias para lanzar conjuros: Clarividencia (1), Desintegrar (4), Dominar Monstruo (5), Rayo Perforador (2).',
      'Maldición del Ojo: Cada vez que lanzas un conjuro desde el ojo, existe un 5% de probabilidad de que el alma de Vecna intente poseer tu cuerpo permanentemente.'
    ],
    source: 'SRD 5e / DMG'
  },

  // ---------------------------------------------------------------------------
  // OBJETOS MÁGICOS DE LA LIBRERÍA: TASHA, XANATHAR, FIZBAN & GRIFFON'S SADDLEBAG
  // ---------------------------------------------------------------------------
  {
    id: 'tatuaje-barrera',
    name: 'Tatuaje de Barrera',
    nameEn: 'Barrier Tattoo',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    summary: 'Tatuaje mágico de Tasha que otorga una Clase de Armadura base de 18 mientras no vistas armadura.',
    description: 'Producido al aplicar una aguja especial sobre la piel. El diseño de escamas y runas metálicas se endurece para desviar golpes mortales.',
    effects: [
      'Mientras no lleves puesta armadura, tu Clase de Armadura es 18.',
      'Puedes usar un escudo y seguir beneficiándote de este tatuaje (+2 a la CA adicional).'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'tatuaje-garras-penumbra',
    name: 'Tatuaje de Garras de la Penumbra',
    nameEn: 'Eldritch Claw Tattoo',
    category: 'Objeto Maravilloso',
    rarity: 'Poco Común',
    attunement: true,
    summary: 'Ataques desarmados mágicos (+1 ataque y daño) y zarpazos de tinta espectral con alcance de 30 pies.',
    description: 'Tatuaje mágico de Tasha que imbuye garras o puños con tinta que fluye como tentáculos de sombra.',
    effects: [
      'Tus ataques desarmados cuentan como mágicos para superar resistencias y tienen un bono de +1 a tiradas de ataque y daño.',
      'Zarpazo de Penumbra: Como acción adicional puedes empoderar el tatuaje durante 1 minuto. Tus ataques cuerpo a cuerpo con armas y desarmados alcanzan hasta 30 pies y causan 1d6 de daño de Fuerza extra. Se recarga al amanecer.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'tatuaje-furia-sangre',
    name: 'Tatuaje de Furia de Sangre',
    nameEn: 'Blood Fury Tattoo',
    category: 'Objeto Maravilloso',
    rarity: 'Legendario',
    attunement: true,
    summary: 'Críticos con 19-20, +4d6 de daño necrótico y absorción de vida en tus impactos.',
    description: 'Un tatuaje colosal de furia carmesí creado por agujas legendarias. Canaliza la sed de batalla de los titanes.',
    effects: [
      'Tiene 10 cargas diarias. Recupera 4d4 + 4 cargas gastadas al amanecer.',
      'Furia Sanguínea: Cuando golpeas con éxito a una criatura, puedes gastar 1 carga para infligir 4d6 de daño Necrótico adicional y recuperar Puntos de Golpe iguales al daño necrótico infligido.',
      'Contraataque de Sangre: Cuando una criatura te golpea, puedes gastar 1 carga como reacción para realizar un ataque cuerpo a cuerpo contra ella con Ventaja.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'arma-furia-dragon',
    name: 'Arma de la Furia del Dragón',
    nameEn: "Dragon's Wrath Weapon",
    category: 'Arma',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Arma dracónica de Fizban con +2 al ataque/daño, +2d6 daño elemental y exhalación de aliento de 8d6.',
    description: 'Forjada en los nidos de los grandes dragones antiguos de Fizban. La hoja vibra con la energía primordial del aliento dracónico.',
    effects: [
      'Bonificador de +2 a las tiradas de ataque y daño con esta arma.',
      'Cada impacto inflige 2d6 de daño elemental adicional (Ácido, Frío, Fuego, Relámpago o Veneno, según el dragón vinculado).',
      'En un 20 natural emite una explosión elemental que inflige 10 de daño a los enemigos adyacentes a 5 pies.',
      'Aliento Destructor: Como acción puedes desatar un cono de 30 pies que inflige 8d6 de daño elemental (salvación de Destreza CD 16 para mitad). Se recarga al amanecer.'
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    id: 'cinturon-piel-dragon',
    name: 'Cinturón de Piel de Dragón +2',
    nameEn: 'Dragonhide Belt +2',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un Monje',
    summary: '+2 a la CD de salvación de tus técnicas de Ki y recupera Ki como acción una vez al día.',
    description: 'Cinturón elaborado con escamas y cuero de dragón de Fizban. Canaliza los meridianos de energía espiritual del monje.',
    effects: [
      'Ganas un bonificador de +2 a la Clase de Dificultad (CD) de tus tiradas de salvación de Ki.',
      'Como acción puedes tirar tu Dado de Artes Marciales y recuperar esa cantidad de Puntos de Ki gastados. Recuperas esta propiedad tras un descanso largo.'
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    id: 'vasija-draconica',
    name: 'Vasija Dracónica',
    nameEn: 'Dragon Vessel',
    category: 'Poción',
    rarity: 'Raro',
    attunement: true,
    summary: 'Cáliz mágico de Fizban que genera pociones de curación superior, elixires de resistencia o aliento dracónico diario.',
    description: 'Un cáliz de bronce ornamentado con efigies de dragones entrelazados que condensa el rocío elemental cada mañana.',
    effects: [
      'Al amanecer puedes ordenar a la vasija que se llene con un líquido a tu elección: Poción de Curación Superior, Poción de Aliento de Fuego, Poción de Resistencia o Hidromiel vivificante que cura 2d10 PG y elimina condiciones de envenenamiento.',
      'El líquido pierde su magia si no se consume antes del siguiente amanecer.'
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    id: 'amuleto-del-devoto-2',
    name: 'Amuleto del Devoto +2',
    nameEn: 'Amulet of the Devout +2',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un Clérigo o Paladín',
    summary: '+2 al ataque de conjuros divinos y CD de salvación; permite usar Canalizar Divinidad 1 vez adicional al día.',
    description: 'Un símbolo sagrado bendecido por la jerarquía eclesiástica superior de Tasha.',
    effects: [
      'Ganas un bonificador de +2 a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de Clérigo o Paladín.',
      'Puedes usar tu rasgo de Canalizar Divinidad una vez adicional sin gastar tu uso habitual una vez al día.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'grimorio-arcano-2',
    name: 'Grimorio Arcano +2',
    nameEn: 'Arcane Grimoire +2',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un Mago',
    summary: '+2 a tiradas de ataque de conjuro y CD de Mago; suma +1 al nivel recuperado con Recuperación Arcana.',
    description: 'Libro encuadernado en cuero grabado con runas plateadas de Tasha. Sirve como libro de conjuros y foco arcano.',
    effects: [
      'Ganas un bonificador de +2 a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de Mago mientras lo sostengas.',
      'Cuando uses tu rasgo de Recuperación Arcana en un descanso corto, puedes recuperar ranuras de conjuro cuyo nivel combinado sume 1 más de lo habitual.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'herramienta-universal-2',
    name: 'Herramienta Universal +2',
    nameEn: 'All-Purpose Tool +2',
    category: 'Objeto Maravilloso',
    rarity: 'Raro',
    attunement: true,
    attunementRequirement: 'Requiere sintonización por un Artífice',
    summary: 'Se transforma en cualquier herramienta artesanal; +2 a conjuros de Artífice y concede un truco de cualquier clase.',
    description: 'Un destornillador y llave mecánica plegable de Tasha construida con engranajes imposibles.',
    effects: [
      'Ganas un bonificador de +2 a las tiradas de ataque de conjuro y CD de salvación de tus conjuros de Artífice.',
      'Como acción puedes transformarla en cualquier juego de herramientas de artesano, contando con competencia automática en su uso.',
      'Una vez al día puedes elegir un truco de CUALQUIER lista de conjuros y aprenderlo como truco de artífice durante 8 horas.'
    ],
    source: "Tasha's Cauldron of Everything"
  },
  {
    id: 'espada-brillo-lunar',
    name: 'Espada de Brillo Lunar',
    nameEn: 'Moon-Touched Sword',
    category: 'Arma',
    rarity: 'Común',
    attunement: false,
    summary: 'Arma de Xanathar que ilumina 15 pies en la oscuridad y sus impactos cuentan como mágicos.',
    description: 'La hoja pulida refleja la luz nocturna de Xanathar. Al desenvainarla en penumbra emite un brillo plateado suave.',
    effects: [
      'En la oscuridad desenvainada, la hoja emite luz brillante en un radio de 15 pies y luz tenue en 15 pies adicionales.',
      'Supera la resistencia al daño de armas no mágicas.'
    ],
    source: "Xanathar's Guide to Everything"
  },
  {
    id: 'amuleto-de-mecanismo',
    name: 'Amuleto de Mecanismo',
    nameEn: 'Clockwork Amulet',
    category: 'Objeto Maravilloso',
    rarity: 'Común',
    attunement: false,
    summary: 'Engranaje de Mechanus de Xanathar que te permite reemplazar una tirada de d20 por un 10 garantizado.',
    description: 'Un pequeño reloj de cobre con engranajes en constante movimiento rítmico que impone la precisión matemática del plano de la Ley.',
    effects: [
      'Una vez al día, al realizar una tirada de ataque, puedes renunciar a tirar el d20 y tratar la tirada como si hubieras obtenido un 10 en el dado.'
    ],
    source: "Xanathar's Guide to Everything"
  },
  {
    id: 'armadura-muda-rapida',
    name: 'Armadura de Muda Rápida',
    nameEn: 'Cast-off Armor',
    category: 'Armadura',
    rarity: 'Común',
    attunement: false,
    summary: 'Armadura de Xanathar que puede quitarse por completo con una sola acción.',
    description: 'Posee cierres y pasadores especiales que se desprenden al tirar de una anilla oculta.',
    effects: [
      'Puedes despojarte de toda la armadura como una única acción en lugar del tiempo habitual de varios minutos.'
    ],
    source: "Xanathar's Guide to Everything"
  },
  {
    id: 'manto-fenix-naciente',
    name: 'Manto del Fénix Naciente',
    nameEn: 'Cloak of the Phoenix',
    category: 'Objeto Maravilloso',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Manto de plumas ígneas de La Alforja de Griffon; alas de fuego de 60 pies y resucitación milagrosa al caer a 0 PG.',
    description: 'Tejido con las plumas caídas de un fénix de la Alforja de Griffon Vol. 1. Irradia calidez y esperanza inextinguible.',
    effects: [
      'Tienes Resistencia al daño de Fuego.',
      'Como acción adicional puedes desplegar alas de fuego llameantes obteniendo una velocidad de vuelo de 60 pies durante 1 hora al día.',
      'Renacimiento Ígneo: Si caes a 0 Puntos de Golpe, estallas en una llamarada de fuego que inflige 4d10 de fuego a los enemigos a 10 pies (CD 16 Des), y caes de pie inmediatamente con 1 Punto de Golpe. Se recarga tras 1d6 días.'
    ],
    source: "The Griffon's Saddlebag"
  },
  {
    id: 'espada-aurora-boreal',
    name: 'Espada de la Aurora Boreal',
    nameEn: 'Aurora Blade',
    category: 'Arma',
    rarity: 'Raro',
    attunement: true,
    summary: 'Espada +1 de La Alforja de Griffon con hoja de luces astrales que inflige 1d6 de frío o radiante a elección y disipa oscuridad.',
    description: 'La hoja de cristal translúcido contiene las luces de una aurora polar boreal que danza en su interior.',
    effects: [
      'Bonificador de +1 a las tiradas de ataque y daño.',
      'Al golpear puedes elegir si el arma inflige 1d6 de daño de Frío o 1d6 de daño Radiante adicional.',
      'Corta la oscuridad mágica: emite luz brillante en 20 pies que disipa cualquier oscuridad mágica de nivel 2 o menor.'
    ],
    source: "The Griffon's Saddlebag"
  },
  {
    id: 'daga-tejedora-sombras',
    name: 'Daga Tejedora de Sombras',
    nameEn: 'Shadowstitch Dagger',
    category: 'Arma',
    rarity: 'Raro',
    attunement: true,
    summary: 'Daga +1 de La Alforja de Griffon que clava la sombra del adversario al suelo reteniéndolo (Restrained).',
    description: 'Forjada en hierro umbrío con el filo grabado con hebras de telaraña oscura que atrapan la silueta de los objetivos.',
    effects: [
      'Bonificador de +1 a tiradas de ataque y daño (Sutil, Ligera, Arrojadiza 20/60).',
      'Costura de Sombra: Cuando impactas a una criatura mientras tú estés en luz tenue u oscuridad, puedes forzarla a una salvación de Fuerza CD 15. Si falla, su sombra queda cosida al suelo y la criatura queda Apresada (Restrained) durante 1 minuto (puede repetir la salvación al final de su turno).'
    ],
    source: "The Griffon's Saddlebag"
  },
  {
    id: 'escudo-guardian-roble',
    name: 'Escudo del Guardián del Roble',
    nameEn: "Oak Warden's Shield",
    category: 'Armadura',
    rarity: 'Raro',
    attunement: true,
    summary: 'Escudo +1 de La Alforja de Griffon tallado en roble vivo; brota ramas para otorgar +2 a la CA a un aliado adyacente.',
    description: 'Un escudo de madera de dríade con hojas verdes que nunca se desprenden.',
    effects: [
      'Otorga +1 a la CA adicional mientras se empuña (+3 a la CA total).',
      'Amparo del Bosque: Cuando una criatura aliada a 5 pies de ti es el objetivo de un ataque, puedes usar tu Reacción para extender ramas de madera viviente que le otorgan +2 a su CA contra ese ataque.'
    ],
    source: "The Griffon's Saddlebag"
  },
  {
    id: 'caldero-cuatro-vientos',
    name: 'Caldero de los Cuatro Vientos',
    nameEn: 'Cauldron of the Four Winds',
    category: 'Objeto Maravilloso',
    rarity: 'Muy Raro',
    attunement: true,
    summary: 'Caldero del Tomo de Mordenkainen que controla vendavales, vientos purificadores y niebla de nieves.',
    description: 'Un caldero de estaño grabado con rostros sonrientes de los cuatro dioses del viento elemental.',
    effects: [
      'Al pronunciar la palabra de mando puedes desatar una ráfaga que apaga proyectiles a distancia, purifica gases tóxicos en 60 pies o crea un Muro de Viento como acción.',
      'Permite a un grupo de hasta 6 criaturas flotar y viajar a una velocidad de 60 pies empujados por brisas astrales durante 1 hora diaria.'
    ],
    source: 'Tomo de Mordenkainen sobre Magia Maravillosa'
  }
];
