import { Spell, AbilityScores } from '../types';

export interface SpellcastingLimits {
  isCaster: boolean;
  casterType: 'prepared' | 'known' | 'none';
  maxCantrips: number;
  maxPreparedOrKnown: number;
  spellbookTotal?: number;
  abilityUsed: 'int' | 'wis' | 'cha';
  abilityMod: number;
  explanation: string;
}

// Compendio Oficial de 515 Conjuros de D&D 5e
// Sincronizado automáticamente 1:1
export const OFFICIAL_SPELLS_COMPENDIUM: Spell[] = [
  {
    "id": "spl-acid-splash",
    "name": "Salpicadura Ácida",
    "nameEn": "Acid Splash",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Lanzas una burbuja de ácido. Elige una criatura que puedas ver dentro del alcance, o dos criaturas que puedas ver dentro del alcance que se encuentren a 5 pies o menos entre sí. El objetivo debe superar una tirada de salvación de Destreza o recibir 1d6 de daño de ácido.",
    "higherLevels": "El daño de este truco aumenta en 1d6 cuando alcanzas el nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blade-ward",
    "name": "Protección contra las Armas",
    "nameEn": "Blade Ward",
    "level": 0,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "Trazas un signo protector en el aire. Hasta el final de tu siguiente turno, tienes resistencia contra el daño contundente, perforante y cortante infligido por ataques con armas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-booming-blade",
    "name": "Hoja Resonante",
    "nameEn": "Booming Blade",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 5 pies)",
    "components": "S, M (un arma cuerpo a cuerpo que valga al menos 1 pp)",
    "duration": "1 asalto",
    "description": "Blandes el arma utilizada en el lanzamiento del conjuro y realizas un ataque cuerpo a cuerpo con ella contra una criatura a 5 pies de ti. Si impactas, el objetivo sufre los efectos normales del ataque del arma y queda envuelto en energía resonante hasta el inicio de tu siguiente turno. Si el objetivo se mueve voluntariamente 5 pies o más antes de ese momento, recibe 1d8 de daño de trueno y el conjuro termina.",
    "higherLevels": "A nivel 5, el ataque cuerpo a cuerpo inflige 1d8 de daño de trueno adicional al objetivo al impactar, y el daño que recibe el objetivo por moverse aumenta a 2d8. Ambas tiradas de daño aumentan en 1d8 a nivel 11 (2d8 y 3d8) y nuevamente a nivel 17 (3d8 y 4d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-chill-touch",
    "name": "Toque Helado",
    "nameEn": "Chill Touch",
    "level": 0,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "Creas una mano fantasmal y esquelética en el espacio de una criatura dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra la criatura para asaltarla con el frío de la tumba. Si impactas, el objetivo recibe 1d8 de daño necrótico y no puede recuperar puntos de golpe hasta el inicio de tu siguiente turno. Hasta entonces, la mano se aferra al objetivo. Si impactas a un muerto viviente, también tiene desventaja en las tiradas de ataque contra ti hasta el final de tu siguiente turno.",
    "higherLevels": "El daño de este truco aumenta en 1d8 cuando alcanzas el nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-control-flames",
    "name": "Controlar Llamas",
    "nameEn": "Control Flames",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S",
    "duration": "Instantáneo o 1 hora",
    "description": "Eliges una llama no mágica que quepa en un cubo de 5 pies. Puedes expandirla 5 pies, extinguirla, duplicar o reducir a la mitad el área de luz que emite, o hacer que aparezcan formas animadas sencillas dentro de ella.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-create-bonfire",
    "name": "Crear Hoguera",
    "nameEn": "Create Bonfire",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas una hoguera en el suelo que puedas ver dentro del alcance. Hasta que el conjuro termine, la hoguera llena un cubo de 5 pies. Cualquier criatura en el espacio de la hoguera cuando lanzas el conjuro debe superar una tirada de salvación de Destreza o recibir 1d8 de daño de fuego. Una criatura también debe realizar la tirada de salvación cuando entra en el espacio de la hoguera por primera vez en un turno o termina su turno allí.\n\nLa hoguera inflama los objetos inflamables del área que no se lleven puestos ni se transporten.",
    "higherLevels": "El daño del conjuro aumenta en 1d8 cuando alcanzas el nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-dancing-lights",
    "name": "Luces Danzantes",
    "nameEn": "Dancing Lights",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un poco de fósforo o madera fosforescente, o una luciérnaga)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas hasta cuatro luces del tamaño de una antorcha dentro del alcance, haciéndolas parecer antorchas, linternas u orbes brillantes que flotan en el aire. También puedes combinar las cuatro luces en una forma humanoide brillante de tamaño Mediano. Cada luz emite luz tenue en un radio de 10 pies.\n\nComo acción adicional en tu turno, puedes mover las luces hasta 60 pies a un nuevo punto dentro del alcance. Una luz debe estar a 20 pies o menos de otra luz creada por este conjuro, y una luz desaparece si supera el alcance del conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-druidcraft",
    "name": "Artesanía Druídica",
    "nameEn": "Druidcraft",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Susurrando a los espíritus de la naturaleza, creas uno de los siguientes efectos dentro del alcance:\n- Creas un efecto sensorial diminuto e inofensivo que predice el clima en tu ubicación durante las próximas 24 horas.\n- Haces florecer instantáneamente una flor, abrirse una semilla o brotar un capullo de hoja.\n- Creas un efecto sensorial instantáneo e inofensivo, como hojas que caen, una ráfaga de viento, el sonido de un animal pequeño o un suave olor a zorrillo.\n- Enciendes o apagas instantáneamente una vela, una antorcha o una pequeña fogata.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-eldritch-blast",
    "name": "Descarga Sobrenatural",
    "nameEn": "Eldritch Blast",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Un haz de energía crepitante sale disparado hacia una criatura dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra el objetivo. Si impactas, el objetivo recibe 1d10 de daño de fuerza.",
    "higherLevels": "El conjuro crea más de un haz cuando alcanzas niveles superiores: dos haces a nivel 5, tres haces a nivel 11 y cuatro haces a nivel 17. Puedes dirigir los haces hacia el mismo objetivo o hacia objetivos diferentes. Haz una tirada de ataque separada para cada haz.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-encode-thoughts",
    "name": "Codificar Pensamientos",
    "nameEn": "Encode Thoughts",
    "level": 0,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "S",
    "duration": "8 horas",
    "description": "Te llevas un dedo a la cabeza y extraes un pensamiento, un recuerdo o un mensaje de tu mente y lo transformas en una hebra tangible y luminosa de sustancia mística llamada filamento de pensamiento, que flota en un espacio desocupado a 5 pies de ti. El filamento es un objeto diminuto con CA 10, 1 punto de golpe e inmunidad a todo daño excepto el daño psíquico.\n\nMientras sostienes el filamento, otra criatura puede tocarlo para recibir el pensamiento directamente en su mente. Si lanzas detectar pensamientos mientras sostienes el filamento, puedes leer instantáneamente el contenido codificado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Guildmaster's Guide to Ravnica"
  },
  {
    "id": "spl-fire-bolt",
    "name": "Saeta de Fuego",
    "nameEn": "Fire Bolt",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Lanzas una mota de fuego a una criatura u objeto dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra el objetivo. Si impactas, el objetivo recibe 1d10 de daño de fuego. Un objeto inflamable alcanzado por este conjuro se prende fuego si no se lleva puesto ni se transporta.",
    "higherLevels": "El daño de este truco aumenta en 1d10 cuando alcanzas el nivel 5 (2d10), nivel 11 (3d10) y nivel 17 (4d10).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-friends",
    "name": "Amigos",
    "nameEn": "Friends",
    "level": 0,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "S, M (un poco de maquillaje)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tienes ventaja en todas las pruebas de Carisma dirigidas a una criatura que no sea hostil hacia ti. Cuando el conjuro termina, la criatura se da cuenta de que usaste magia para influir en su estado de ánimo y se vuelve hostil.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-frostbite",
    "name": "Congelación",
    "nameEn": "Frostbite",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Provocas que una escarcha entumecedora cubra a una criatura visible dentro del alcance. Debe superar una tirada de salvación de Constitución o sufrir 1d6 de daño por frío y tener desventaja en su siguiente tirada de ataque con arma antes del final de su siguiente turno.",
    "higherLevels": "El daño aumenta a 2d6 (nv 5), 3d6 (nv 11) y 4d6 (nv 17).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-green-flame-blade",
    "name": "Hoja de Llama Verde",
    "nameEn": "Green-Flame Blade",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 5 pies)",
    "components": "S, M (un arma cuerpo a cuerpo que valga al menos 1 pp)",
    "duration": "Instantáneo",
    "description": "Blandes el arma utilizada en el lanzamiento del conjuro y realizas un ataque cuerpo a cuerpo con ella contra una criatura a 5 pies de ti. Si impactas, el objetivo sufre los efectos normales del ataque del arma, y llamas verdes saltan desde el objetivo hacia una segunda criatura diferente de tu elección que puedas ver a 5 pies o menos de él. La segunda criatura recibe daño de fuego igual a tu modificador de característica para el lanzamiento de conjuros.",
    "higherLevels": "A nivel 5, el ataque cuerpo a cuerpo inflige 1d8 de daño de fuego adicional al objetivo al impactar, y el daño de fuego a la segunda criatura aumenta a 1d8 + tu modificador de aptitud mágica. Ambas tiradas de daño aumentan en 1d8 a nivel 11 (2d8 y 2d8) y a nivel 17 (3d8 y 3d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything/Sword Coast Adventurer's Guide"
  },
  {
    "id": "spl-guidance",
    "name": "Guía",
    "nameEn": "Guidance",
    "level": 0,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tocas a una criatura voluntaria. Una vez antes de que el conjuro termine, el objetivo puede tirar un d4 y sumar el número obtenido a una prueba de característica de su elección. Puede tirar el dado antes o después de hacer la prueba de característica. Luego, el conjuro termina.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-gust",
    "name": "Ráfaga de Aire",
    "nameEn": "Gust",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Aprovechas el aire para crear una ráfaga. Puedes empujar a una criatura Mediana o menor 5 pies lejos de ti si falla una salvación de Fuerza, mover un objeto de hasta 5 libras hasta 10 pies, o generar efectos sensoriales inofensivos de viento.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-infestation",
    "name": "Infestación",
    "nameEn": "Infestation",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una pulga viva)",
    "duration": "Instantáneo",
    "description": "Haces que una plaga de ácaros, pulgas y parásitos brote sobre una criatura visible. Debe superar una tirada de salvación de Constitución o sufrir 1d6 de daño de veneno y moverse 5 pies en una dirección aleatoria (1d4: Norte, Sur, Este u Oeste).",
    "higherLevels": "El daño aumenta a 2d6 (nv 5), 3d6 (nv 11) y 4d6 (nv 17).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-light",
    "name": "Luz",
    "nameEn": "Light",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, M (una luciérnaga o musgo fosforescente)",
    "duration": "1 hora",
    "description": "Tocas un objeto que no mida más de 10 pies en ninguna dimensión. Hasta que el conjuro termine, el objeto emite luz brillante en un radio de 20 pies y luz tenue durante 20 pies adicionales. La luz puede ser del color que elijas. Cubrir el objeto por completo con algo opaco bloquea la luz. El conjuro termina si lo lanzas de nuevo o lo cancelas como una acción.\n\nSi eliges como objetivo un objeto que lleva puesto o transporta una criatura hostil, esa criatura debe superar una tirada de salvación de Destreza para evitar el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-lightning-lure",
    "name": "Señuelo Relampagueante",
    "nameEn": "Lightning Lure",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "15 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Creas un látigo de energía de relámpago que azota a una criatura de tu elección visible dentro del alcance. El objetivo debe superar una tirada de salvación de Fuerza o ser arrastrado hasta 10 pies en línea recta hacia ti y recibir 1d8 de daño de relámpago si termina a 5 pies de ti.",
    "higherLevels": "El daño aumenta a 2d8 a nivel 5, 3d8 a nivel 11 y 4d8 a nivel 17.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-mage-hand",
    "name": "Mano de Mago",
    "nameEn": "Mage Hand",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "1 minuto",
    "description": "Una mano espectral flotante aparece en un punto que elijas dentro del alcance. La mano permanece durante la duración o hasta que la canceles como una acción. La mano desaparece si se encuentra a más de 30 pies de ti o si lanzas este conjuro de nuevo.\n\nPuedes usar tu acción para controlar la mano. Puedes usar la mano para manipular un objeto, abrir una puerta o contenedor desbloqueado, guardar o recuperar un objeto de un contenedor abierto, o verter el contenido de un vial. Puedes mover la mano hasta 30 pies cada vez que la uses.\n\nLa mano no puede atacar, activar objetos mágicos ni transportar más de 10 libras.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-magic-stone",
    "name": "Piedra Mágica",
    "nameEn": "Magic Stone",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Toque",
    "components": "V, S",
    "duration": "1 minuto",
    "description": "Tocas hasta tres guijarros e infundes magia en ellos. Tú o un aliado podéis lanzarlos con una honda o a mano. El ataque usa tu modificador de característica para el ataque e inflige 1d6 + tu modificador de aptitud mágica de daño contundente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Brujo"
    ],
    "source": "Xanathar's Guide to Everything/Elemental Evil Player's Companion"
  },
  {
    "id": "spl-mending",
    "name": "Remendar",
    "nameEn": "Mending",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S, M (dos piedras imán)",
    "duration": "Instantáneo",
    "description": "Este conjuro repara una sola rotura o desgarro en un objeto que toques, como un eslabón roto de una cadena, dos mitades de una llave rota, una capa rasgada o un odre perforado, siempre que la fisura no supere 1 pie en cualquier dimensión.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-message",
    "name": "Mensaje",
    "nameEn": "Message",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un trozo corto de alambre de cobre)",
    "duration": "1 asalto",
    "description": "Apuntas con el dedo hacia una criatura dentro del alcance y susurras un mensaje. El objetivo (y solo el objetivo) escucha el mensaje y puede responder con un susurro que solo tú puedes escuchar.\n\nPuedes lanzar este conjuro a través de obstáculos sólidos si conoces bien al objetivo y sabes que está más allá de la barrera. El silencio mágico, 1 pie de piedra, 1 pulgada de metal común, una lámina delgada de plomo o 3 pies de madera bloquean el conjuro. El conjuro no tiene que seguir una línea recta y puede viajar libremente doblando esquinas o a través de aberturas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mind-sliver",
    "name": "Astilla Mental",
    "nameEn": "Mind Sliver",
    "level": 0,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "1 asalto",
    "description": "Clavas una púa de energía psíquica desorientadora en la mente de una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Inteligencia o recibir 1d6 de daño psíquico y restar 1d4 de la próxima tirada de salvación que realice antes del final de tu siguiente turno.",
    "higherLevels": "El daño de este truco aumenta en 1d6 cuando alcanzas el nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-minor-illusion",
    "name": "Ilusión Menor",
    "nameEn": "Minor Illusion",
    "level": 0,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "S, M (un poco de vellón)",
    "duration": "1 minuto",
    "description": "Creas un sonido o una imagen de un objeto dentro del alcance que dura durante la duración. La ilusión también termina si la cancelas como una acción o lanzas este conjuro de nuevo.\n\nSi creas un sonido, su volumen puede variar desde un susurro hasta un grito. Puede ser tu voz, la voz de otra persona, el rugido de un león, el toque de tambores o cualquier otro sonido que elijas. El sonido continúa sin cesar durante la duración, o puedes hacer sonidos discretos en diferentes momentos antes de que termine el conjuro.\n\nSi creas una imagen de un objeto (como una silla, huellas enfangadas o un cofre pequeño), no puede ser mayor que un cubo de 5 pies. La imagen no puede producir sonido, luz, olor ni ningún otro efecto sensorial. La interacción física con la imagen revela que es una ilusión, ya que los objetos pueden atravesarla.\n\nSi una criatura usa su acción para examinar el sonido o la imagen, puede determinar que es una ilusión con una prueba exitosa de Inteligencia (Investigación) contra la CD de salvación de tus conjuros. Si una criatura discierne la ilusión como tal, la ilusión se desvanece para la criatura.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mold-earth",
    "name": "Moldear la Tierra",
    "nameEn": "Mold Earth",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "S",
    "duration": "Instantáneo o 1 hora",
    "description": "Eliges una porción de tierra sucia o piedra de hasta 5 pies cúbicos. Puedes excavarla instantáneamente depositándola a 5 pies de distancia, hacer aparecer formas o colores en ella, o convertir tierra normal en terreno difícil (o viceversa) durante 1 hora.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-poison-spray",
    "name": "Rociada de Veneno",
    "nameEn": "Poison Spray",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Extiendes tu mano hacia una criatura que puedas ver dentro del alcance y proyectas una bocanada de gas tóxico desde tu palma. La criatura debe superar una tirada de salvación de Constitución o recibir 1d12 de daño de veneno.",
    "higherLevels": "El daño de este truco aumenta en 1d12 cuando alcanzas el nivel 5 (2d12), nivel 11 (3d12) y nivel 17 (4d12).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-prestidigitation",
    "name": "Prestidigitación",
    "nameEn": "Prestidigitation",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V, S",
    "duration": "Hasta 1 hora",
    "description": "Este conjuro es un truco mágico menor que los lanzadores novatos usan para practicar. Creas uno de los siguientes efectos mágicos dentro del alcance:\n- Creas un efecto sensorial instantáneo e inofensivo, como una lluvia de chispas, una ráfaga de viento, notas musicales tenues o un olor extraño.\n- Enciendes o apagas instantáneamente una vela, una antorcha o una pequeña fogata.\n- Limpias o ensucias instantáneamente un objeto de hasta 1 pie cúbico.\n- Enfrías, calientas o das sabor a hasta 1 pie cúbico de material no vivo durante 1 hora.\n- Haces aparecer un color, una pequeña marca o un símbolo en un objeto o superficie durante 1 hora.\n- Creas una baratija no mágica o una imagen ilusoria que quepa en tu mano y que dure hasta el final de tu siguiente turno.\n\nSi lanzas este conjuro múltiples veces, puedes tener hasta tres de sus efectos no instantáneos activos a la vez, y puedes cancelar dicho efecto como una acción.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-primal-savagery",
    "name": "Salvajismo Primitivo",
    "nameEn": "Primal Savagery",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "S",
    "duration": "Instantáneo",
    "description": "Tus dientes o uñas se afilan y gotean ácido corrosivo. Haz un ataque de conjuro cuerpo a cuerpo contra una criatura dentro de tu alcance. Si impactas, el objetivo sufre 1d10 de daño por ácido.",
    "higherLevels": "El daño aumenta a 2d10 (nv 5), 3d10 (nv 11) y 4d10 (nv 17).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-produce-flame",
    "name": "Producir Llama",
    "nameEn": "Produce Flame",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "10 minutos",
    "description": "Una llama parpadeante aparece en tu mano. La llama permanece allí durante la duración y no te hace daño a ti ni a tu equipo. La llama emite luz brillante en un radio de 10 pies y luz tenue durante 10 pies adicionales. El conjuro termina si lo cancelas como una acción o si lo lanzas de nuevo.\n\nTambién puedes atacar con la llama, aunque hacerlo termina el conjuro. Cuando lanzas este conjuro, o como una acción en un turno posterior, puedes arrojar la llama a una criatura a 30 pies o menos de ti. Haz una tirada de ataque de conjuro a distancia. Si impactas, el objetivo recibe 1d8 de daño de fuego.",
    "higherLevels": "El daño de este truco aumenta en 1d8 cuando alcanzas el nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-ray-of-frost",
    "name": "Rayo de Escarcha",
    "nameEn": "Ray of Frost",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Un rayo glacial de luz blanca azulada sale disparado hacia una criatura dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra el objetivo. Si impactas, recibe 1d8 de daño de frío y su velocidad se reduce en 10 pies hasta el inicio de tu siguiente turno.",
    "higherLevels": "El daño de este truco aumenta en 1d8 cuando alcanzas el nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-resistance",
    "name": "Resistencia",
    "nameEn": "Resistance",
    "level": 0,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (una capa en miniatura)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tocas a una criatura voluntaria. Una vez antes de que el conjuro termine, el objetivo puede tirar un d4 y sumar el número obtenido a una tirada de salvación de su elección. Puede tirar el dado antes o después de hacer la tirada de salvación. Luego, el conjuro termina.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-sacred-flame",
    "name": "Llama Sagrada",
    "nameEn": "Sacred Flame",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Un resplandor similar a una llama desciende sobre una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Destreza o recibir 1d8 de daño radiante. El objetivo no obtiene ningún beneficio de la cobertura para esta tirada de salvación.",
    "higherLevels": "El daño de este truco aumenta en 1d8 cuando alcanzas el nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-sapping-sting",
    "name": "Picadura Debilitante",
    "nameEn": "Sapping Sting",
    "level": 0,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Mueves el dedo hacia una criatura que puedas ver dentro del alcance, succionando momentáneamente su fuerza vital. El objetivo debe superar una tirada de salvación de Constitución o recibir 1d4 de daño necrótico y caer derribado.",
    "higherLevels": "El daño de este truco aumenta en 1d4 cuando alcanzas el nivel 5 (2d4), nivel 11 (3d4) y nivel 17 (4d4).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-shape-water",
    "name": "Moldear el Agua",
    "nameEn": "Shape Water",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "S",
    "duration": "Instantáneo o 1 hora",
    "description": "Eliges un área de agua que quepa en un cubo de 5 pies. Puedes moverla hasta 5 pies en cualquier dirección, congelarla durante 1 hora (siempre que no contenga criaturas), o alterar su flujo y color.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-shillelagh",
    "name": "Bordón (Shillelagh)",
    "nameEn": "Shillelagh",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Toque",
    "components": "V, S, M (muérdago, una hoja de trébol y una porra o bastón)",
    "duration": "1 minuto",
    "description": "La madera de una porra o bastón que sostengas se imbuye con el poder de la naturaleza. Durante la duración, puedes usar tu característica de lanzamiento de conjuros en lugar de Fuerza para las tiradas de ataque y daño de los ataques cuerpo a cuerpo con esa arma, y el dado de daño del arma se convierte en un d8. El arma también se vuelve mágica si aún no lo es. El conjuro termina si lo lanzas de nuevo o si sueltas el arma.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-shocking-grasp",
    "name": "Agarre Electrizante",
    "nameEn": "Shocking Grasp",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Un relámpago brota de tu mano para propinar una descarga a una criatura que intentes tocar. Haz una tirada de ataque de conjuro cuerpo a cuerpo contra el objetivo. Tienes ventaja en la tirada de ataque si el objetivo lleva puesta una armadura hecha de metal. Si impactas, el objetivo recibe 1d8 de daño de relámpago y no puede realizar reacciones hasta el inicio de su siguiente turno.",
    "higherLevels": "El daño de este truco aumenta en 1d8 cuando alcanzas el nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-spare-the-dying",
    "name": "Piedad con los Moribundos",
    "nameEn": "Spare the Dying",
    "level": 0,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Tocas a una criatura viva que tenga 0 puntos de golpe. La criatura se estabiliza. Este conjuro no tiene efecto en muertos vivientes ni en autómatas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-sword-burst",
    "name": "Ráfaga de Espadas",
    "nameEn": "Sword Burst",
    "level": 0,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 5 pies)",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Creas un círculo momentáneo de espadas espectrales que barren a tu alrededor. Todas las demás criaturas a 5 pies o menos de ti deben superar una tirada de salvación de Destreza o recibir 1d6 de daño de fuerza.",
    "higherLevels": "El daño de este truco aumenta en 1d6 cuando alcanzas el nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-thaumaturgy",
    "name": "Taumaturgia",
    "nameEn": "Thaumaturgy",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V",
    "duration": "Hasta 1 minuto",
    "description": "Manifiestas una pequeña maravilla sobrenatural: tu voz resuena con el triple de volumen, provocas llamas que titilan o cambian de color, causas temblores inofensivos en el suelo o abres/cierras una puerta o ventana sin pestillo de golpe.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-thorn-whip",
    "name": "Látigo de Espinas",
    "nameEn": "Thorn Whip",
    "level": 0,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (el tallo de una planta con espinas)",
    "duration": "Instantáneo",
    "description": "Creas un látigo largo similar a una enredadera cubierto de espinas que azota según tu orden hacia una criatura dentro del alcance. Haz una tirada de ataque de conjuro cuerpo a cuerpo contra el objetivo. Si el ataque impacta, la criatura recibe 1d6 de daño perforante, y si la criatura es Grande o menor, la arrastras hasta 10 pies más cerca de ti.",
    "higherLevels": "El daño de este truco aumenta en 1d6 cuando alcanzas el nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-thunderclap",
    "name": "Tronada",
    "nameEn": "Thunderclap",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "5 pies",
    "components": "S",
    "duration": "Instantáneo",
    "description": "Creas un estallido de sonido atronador audible hasta a 100 pies. Cada criatura a 5 pies de ti debe superar una salvación de Constitución o recibir 1d6 de daño de trueno.",
    "higherLevels": "El daño aumenta a 2d6 (nv 5), 3d6 (nv 11) y 4d6 (nv 17).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-toll-the-dead",
    "name": "Tañido por los Muertos",
    "nameEn": "Toll the Dead",
    "level": 0,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Señalas a una criatura que puedas ver dentro del alcance, y el sonido de una campana doliente resuena en el aire a su alrededor durante un momento. El objetivo debe superar una tirada de salvación de Sabiduría o recibir 1d8 de daño necrótico. Si al objetivo le falta alguno de sus puntos de golpe, en su lugar recibe 1d12 de daño necrótico.",
    "higherLevels": "El daño de este truco aumenta en un dado cuando alcanzas el nivel 5 (2d8 o 2d12), nivel 11 (3d8 o 3d12) y nivel 17 (4d8 o 4d12).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-true-strike",
    "name": "Impacto Verdadero",
    "nameEn": "True Strike",
    "level": 0,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "S",
    "duration": "Concentración, hasta 1 asalto",
    "description": "Apuntas con el dedo a un objetivo. Tu magia te concede una breve visión de sus defensas. En tu siguiente turno, obtienes ventaja en tu primera tirada de ataque contra ese objetivo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-vicious-mockery",
    "name": "Burla Cruel",
    "nameEn": "Vicious Mockery",
    "level": 0,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Desatas una serie de insultos mezclados con sutiles encantamientos a una criatura que puedas ver dentro del alcance. Si el objetivo puede escucharte (aunque no necesita entenderte), debe superar una tirada de salvación de Sabiduría o recibir 1d4 de daño psíquico y tener desventaja en la próxima tirada de ataque que realice antes del final de su siguiente turno.",
    "higherLevels": "El daño de este truco aumenta en 1d4 cuando alcanzas el nivel 5 (2d4), nivel 11 (3d4) y nivel 17 (4d4).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-word-of-radiance",
    "name": "Palabra de Radiancia",
    "nameEn": "Word of Radiance",
    "level": 0,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "5 pies",
    "components": "V, M (un símbolo sagrado)",
    "duration": "Instantáneo",
    "description": "Pronuncias una palabra divina y un resplandor ardiente estalla desde ti. Cada criatura de tu elección que puedas ver a 5 pies o menos de ti debe superar una tirada de salvación de Constitución o recibir 1d6 de daño radiante.",
    "higherLevels": "El daño de este truco aumenta en 1d6 cuando alcanzas el nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6).",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-absorb-elements",
    "name": "Absorber Elementos",
    "nameEn": "Absorb Elements",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 reacción, cuando recibes daño de ácido, frío, fuego, relámpago o trueno",
    "range": "Lanzador",
    "components": "S",
    "duration": "1 asalto",
    "description": "El conjuro absorbe parte de la energía entrante, mitigando su efecto sobre ti y almacenándola para tu próximo ataque cuerpo a cuerpo. Tienes resistencia al tipo de daño desencadenante hasta el inicio de tu siguiente turno. Además, la primera vez que impactes con un ataque cuerpo a cuerpo en tu siguiente turno, el objetivo recibe 1d6 de daño adicional del tipo desencadenante, y el conjuro termina.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño adicional aumenta en 1d6 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-alarm",
    "name": "Alarma",
    "nameEn": "Alarm",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 minuto",
    "range": "30 pies",
    "components": "V, S, M (una diminuta campana y un trozo de alambre de plata fino)",
    "duration": "8 horas",
    "description": "Estableces una alarma contra intrusiones no deseadas. Elige una puerta, una ventana o un área dentro del alcance que no sea mayor que un cubo de 20 pies. Hasta que el conjuro termine, una alarma te alerta cada vez que una criatura Diminuta o mayor toque o entre en el área protegida. Al lanzar el conjuro, puedes designar criaturas que no activarán la alarma. También eliges si la alarma es mental o audible.\n\nUna alarma mental te alerta con un zumbido en tu mente si estás a 1 milla o menos del área protegida. Este zumbido te despierta si estás durmiendo. Una alarma audible produce el sonido de una campanilla de mano durante 10 segundos en un radio de 60 pies.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Artífice",
      "Explorador",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-animal-friendship",
    "name": "Amistad con los Animales",
    "nameEn": "Animal Friendship",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (un bocado de comida)",
    "duration": "24 horas",
    "description": "Este conjuro te permite convencer a una bestia de que no tienes intenciones dañinas. La bestia debe superar una salvación de Sabiduría o quedará hechizada por ti durante 24 horas si su Inteligencia es menor que 4.",
    "higherLevels": "Puedes afectar a una bestia adicional por cada nivel de ranura por encima de 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-armor-of-agathys",
    "name": "Armadura de Agathys",
    "nameEn": "Armor of Agathys",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (una taza de agua)",
    "duration": "1 hora",
    "description": "Una fuerza mágica protectora te rodea, manifestándose como una escarcha espectral que te cubre a ti y a tu equipo. Obtienes 5 puntos de golpe temporales durante la duración. Si una criatura te impacta con un ataque cuerpo a cuerpo mientras tienes estos puntos de golpe temporales, la criatura recibe 5 de daño de frío.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, tanto los puntos de golpe temporales como el daño de frío aumentan en 5 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-arms-of-hadar",
    "name": "Brazos de Hadar",
    "nameEn": "Arms of Hadar",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 10 pies)",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Invocas el poder de Hadar, el Hambre Oscura. Zarcillos de energía oscura brotan de ti y azotan a todas las criaturas a 10 pies o menos de ti. Cada criatura en esa área debe realizar una tirada de salvación de Fuerza. Si falla la salvación, el objetivo recibe 2d6 de daño necrótico y no puede realizar reacciones hasta su siguiente turno. Si tiene éxito en la salvación, la criatura recibe la mitad de daño, pero no sufre ningún otro efecto.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-bane",
    "name": "Perdición",
    "nameEn": "Bane",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una gota de sangre)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Hasta tres criaturas de tu elección que puedas ver dentro del alcance deben realizar tiradas de salvación de Carisma. Siempre que un objetivo que falle esta tirada de salvación realice una tirada de ataque o una tirada de salvación antes de que el conjuro termine, el objetivo debe tirar un d4 y restar el número obtenido de la tirada de ataque o salvación.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-beast-bond",
    "name": "Vínculo Bestial",
    "nameEn": "Beast Bond",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un poco de pelo envuelto en tela)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Estableces un vínculo telepático con una bestia dentro del alcance que no sea hostil hacia ti y que tenga una puntuación de Inteligencia de 3 o menos. El conjuro falla si la Inteligencia de la bestia es 4 o mayor. Mientras la bestia esté en tu línea de visión, el vínculo se mantiene.\n\nA través del vínculo, la bestia puede entender tus mensajes telepáticos hacia ella, y puede comunicarse telepáticamente con conceptos simples e imágenes. Mientras el conjuro esté activo, la bestia tiene ventaja en las tiradas de ataque contra cualquier criatura a 5 pies o menos de ti que puedas ver.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-bless",
    "name": "Bendición",
    "nameEn": "Bless",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una pizca de agua bendita)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Bendices hasta a tres criaturas de tu elección dentro del alcance. Siempre que un objetivo realice una tirada de ataque o una tirada de salvación antes de que el conjuro termine, el objetivo puede tirar un d4 y sumar el número obtenido al total de la tirada.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-burning-hands",
    "name": "Manos Ardientes",
    "nameEn": "Burning Hands",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 15 pies)",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Al mantener tus manos con los pulgares tocándose y los dedos extendidos, una fina lámina de llamas brota de las puntas de tus dedos extendidos. Cada criatura en un cono de 15 pies debe realizar una tirada de salvación de Destreza. Una criatura recibe 3d6 de daño de fuego si falla la salvación, o la mitad de daño si tiene éxito.\n\nEl fuego prende los objetos inflamables del área que no se lleven puestos ni se transporten.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-catapult",
    "name": "Catapulta",
    "nameEn": "Catapult",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S",
    "duration": "Instantáneo",
    "description": "Eliges un objeto de entre 1 y 5 libras que no esté siendo llevado ni transportado. El objeto vuela hasta 90 pies en línea recta. Si impacta contra una criatura o superficie sólida, se detiene y tanto el objeto como la criatura impactada sufren 3d8 de daño contundente si fallan una salvación de Destreza.",
    "higherLevels": "Por cada espacio por encima de nivel 1, el peso máximo aumenta en 5 libras y el daño en 1d8.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-cause-fear",
    "name": "Causar Miedo",
    "nameEn": "Cause Fear",
    "level": 1,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Despiertas una visión aterradora en la mente de una criatura visible dentro del alcance. Debe superar una tirada de salvación de Sabiduría o quedar asustada (frightened) durante la duración. Puede repetir la salvación al final de cada uno de sus turnos.",
    "higherLevels": "Puedes elegir una criatura adicional por cada espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-ceremony",
    "name": "Ceremonia",
    "nameEn": "Ceremony",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 hora (Ritual)",
    "range": "Toque",
    "components": "V, S, M (25 po de polvo de plata, consumido por el conjuro)",
    "duration": "Instantáneo o varios días",
    "description": "Realizas uno de varios ritos sagrados especiales: Bautismo, Expiación, Matrimonio (concede +2 CA durante 7 días), Dedicación, Mayoría de Edad o Investidura Funeraria.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-chaos-bolt",
    "name": "Saeta Caótica",
    "nameEn": "Chaos Bolt",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Lanzas una masa ondulante de energía caótica. Haz un ataque de conjuro a distancia. Si impactas, el objetivo sufre 2d8 + 1d6 de daño. Los números en los d8 determinan el tipo de daño (ácido, frío, fuego, fuerza, relámpago, veneno, psíquico o trueno). Si ambos d8 muestran el mismo número, el rayo salta a otro objetivo a 30 pies.",
    "higherLevels": "Por cada espacio de conjuro por encima de nivel 1, el daño aumenta en 1d6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-charm-person",
    "name": "Hechizar Persona",
    "nameEn": "Charm Person",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Intentas encantar a un humanoide que puedas ver dentro del alcance. Debe realizar una tirada de salvación de Sabiduría, y lo hace con ventaja si tú o tus compañeros están luchando contra él. Si falla la salvación, queda hechizado por ti hasta que el conjuro termine o hasta que tú o tus compañeros le hagan daño. La criatura hechizada te considera un conocido amistoso. Cuando el conjuro termina, la criatura sabe que fue hechizada por ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 1. Las criaturas deben estar a 30 pies o menos entre sí cuando las eliges como objetivo.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-chromatic-orb",
    "name": "Orbe Cromático",
    "nameEn": "Chromatic Orb",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (un diamante que valga al menos 50 po)",
    "duration": "Instantáneo",
    "description": "Lanzas un orbe de energía de 4 pulgadas de diámetro a una criatura que puedas ver dentro del alcance. Eliges ácido, frío, fuego, relámpago, veneno o trueno para el tipo de orbe que creas, y luego realizas una tirada de ataque de conjuro a distancia contra el objetivo. Si el ataque impacta, la criatura recibe 3d8 de daño del tipo que elegiste.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-color-spray",
    "name": "Rociada de Color",
    "nameEn": "Color Spray",
    "level": 1,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Personal (cono de 15 pies)",
    "components": "V, S, M (polvo de colores)",
    "duration": "1 asalto",
    "description": "Un deslumbrante despliegue de luces de colores surge de tu mano. Tira 6d10; el total es la cantidad de puntos de golpe de criaturas a las que ciega este conjuro hasta el final de tu siguiente turno.",
    "higherLevels": "Tiras 2d10 adicionales por cada nivel de ranura por encima de 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-command",
    "name": "Orden",
    "nameEn": "Command",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "1 asalto",
    "description": "Dices una palabra de orden a una criatura que puedas ver. Debe superar una salvación de Sabiduría o seguir la orden en su siguiente turno (Acércate, Suelta, Huye, Tírate al suelo o Detente).",
    "higherLevels": "Afectas a una criatura adicional por cada nivel de ranura por encima de 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-compelled-duel",
    "name": "Duelo Forzado",
    "nameEn": "Compelled Duel",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción adicional",
    "range": "30 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Obligas a una criatura a batirse en combate singular contigo. Debe superar una salvación de Sabiduría o tener desventaja en tiradas de ataque contra cualquier criatura que no seas tú, y no puede alejarse a más de 30 pies de ti.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-create-or-destroy-water",
    "name": "Crear o Destruir Agua",
    "nameEn": "Create or Destroy Water",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una gota de agua si creas agua, o unos granos de arena si la destruyes)",
    "duration": "Instantáneo",
    "description": "O bien creas o destruyes agua.\n- Crear Agua: Creas hasta 10 galones de agua limpia dentro del alcance en un recipiente abierto. Alternativamente, el agua cae como lluvia en un cubo de 30 pies dentro del alcance, extinguiendo llamas expuestas en el área.\n- Destruir Agua: Destruyes hasta 10 galones de agua en un recipiente abierto dentro del alcance. Alternativamente, destruyes la niebla en un cubo de 30 pies dentro del alcance.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, creas o destruyes 10 galones adicionales de agua, o el tamaño del cubo aumenta en 5 pies, por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-cure-wounds",
    "name": "Curar Heridas",
    "nameEn": "Cure Wounds",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Una criatura que toques recupera una cantidad de puntos de golpe igual a 1d8 + tu modificador de característica para el lanzamiento de conjuros. Este conjuro no tiene efecto en muertos vivientes ni en autómatas.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, la curación aumenta en 1d8 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-detect-evil-and-good",
    "name": "Detectar el Bien y el Mal",
    "nameEn": "Detect Evil and Good",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Durante la duración, sabes si hay una aberración, celestial, elemental, hada, infernal o muerto viviente a 30 pies o menos de ti, así como la ubicación exacta de la criatura. Del mismo modo, sabes si hay un lugar u objeto a 30 pies o menos de ti que haya sido mágicamente consagrado o profanado.\n\nEl conjuro puede penetrar la mayoría de las barreras, pero es bloqueado por 1 pie de piedra, 1 pulgada de metal común, una lámina delgada de plomo o 3 pies de madera o tierra.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-detect-magic",
    "name": "Detectar Magia",
    "nameEn": "Detect Magic",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Durante la duración, sientes la presencia de magia a 30 pies o menos de ti. Si sientes magia de esta manera, puedes usar tu acción para ver un aura tenue alrededor de cualquier criatura u objeto visible en el área que contenga magia, y aprendes su escuela de magia, si la tiene.\n\nEl conjuro puede penetrar la mayoría de las barreras, pero es bloqueado por 1 pie de piedra, 1 pulgada de metal común, una lámina delgada de plomo o 3 pies de madera o tierra.",
    "higherLevels": "",
    "ritual": true,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-detect-poison-and-disease",
    "name": "Detectar Venenos y Enfermedades",
    "nameEn": "Detect Poison and Disease",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 acción (Ritual)",
    "range": "Personal",
    "components": "V, S, M (hoja de tejo)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Durante la duración puedes percibir la presencia y ubicación de venenos, criaturas venenosas y enfermedades en un radio de 30 pies de ti, e identificar la naturaleza específica de cada uno.",
    "higherLevels": "",
    "ritual": true,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-disguise-self",
    "name": "Disfrazarse",
    "nameEn": "Disguise Self",
    "level": 1,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Haces que tú mismo (incluyendo tu ropa, armadura, armas y otras pertenencias que lleves puestas) parezcas diferente hasta que el conjuro termine o hasta que uses tu acción para cancelarlo. Puedes parecer 1 pie más alto o más bajo y puedes parecer delgado, gordo o intermedio. No puedes cambiar la estructura básica de tu cuerpo, por lo que debes adoptar una forma que tenga la misma disposición básica de extremidades. De lo contrario, el alcance de la ilusión depende de ti.\n\nLos cambios provocados por este conjuro no resisten una inspección física. Por ejemplo, si usas este conjuro para añadir un sombrero a tu atuendo, los objetos atravesarán el sombrero y cualquiera que lo toque no sentirá nada o sentirá tu cabeza y cabello. Si usas este conjuro para parecer más delgado de lo que eres, la mano de alguien que intente tocarte tropezará contigo mientras aparentemente todavía está en el aire.\n\nPara discernir que estás disfrazado, una criatura puede usar su acción para inspeccionar tu apariencia y debe superar una prueba de Inteligencia (Investigación) contra la CD de salvación de tus conjuros.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dissonant-whispers",
    "name": "Susurros Disonantes",
    "nameEn": "Dissonant Whispers",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Susurras una melodía discordante que solo una criatura a tu elección puede oír. Debe superar una salvación de Sabiduría o sufrir 3d6 de daño psíquico y verse obligada a usar de inmediato su reacción para huir tan lejos de ti como le sea posible.",
    "higherLevels": "El daño aumenta en 1d6 por cada espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-distort-value",
    "name": "Distorsionar Valor",
    "nameEn": "Distort Value",
    "level": 1,
    "school": "Ilusión",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V",
    "duration": "8 horas",
    "description": "Lanzas este conjuro sobre un objeto no mágico que no mida más de 1 pie en ninguna dimensión, duplicando o reduciendo a la mitad su valor percibido. Una criatura que examine el objeto puede notar la ilusión con una prueba exitosa de Inteligencia (Investigación) contra la CD de salvación de tus conjuros.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el tamaño máximo del objeto aumenta en 1 pie por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-divine-favor",
    "name": "Favor Divino",
    "nameEn": "Divine Favor",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tus oraciones infunden poder divino en tus golpes con armas. Tus ataques con armas infligen 1d4 de daño radiante adicional al impactar.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-earth-tremor",
    "name": "Temblor de Tierra",
    "nameEn": "Earth Tremor",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Provocas una onda de choque en el suelo. Cada criatura que esté en el suelo a 10 pies de ti debe superar una tirada de salvación de Destreza o sufrir 1d6 de daño contundente y caer derribada (prona). La tierra o piedra del área se convierte en terreno difícil.",
    "higherLevels": "El daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything/Elemental Evil Player's Companion"
  },
  {
    "id": "spl-ensnaring-strike",
    "name": "Golpe Atrapador",
    "nameEn": "Ensnaring Strike",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque de arma antes de que el conjuro termine, una masa retorcida de enredaderas espinosas brota en el punto de impacto. El objetivo debe superar una tirada de salvación de Fuerza o quedar apresado por las enredaderas hasta que el conjuro termine. Una criatura Grande o mayor tiene ventaja en esta tirada de salvación. Si el objetivo tiene éxito en la salvación, las enredaderas se marchitan.\n\nMientras esté apresado por el conjuro, el objetivo recibe 1d6 de daño perforante al inicio de cada uno de sus turnos. Una criatura apresada por las enredaderas o una criatura que pueda tocarla puede usar su acción para realizar una prueba de Fuerza contra la CD de salvación de tus conjuros. Con un éxito, el objetivo queda liberado.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-entangle",
    "name": "Enmarañar",
    "nameEn": "Entangle",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Hierbas y enredaderas que se aferran brotan del suelo en un cuadrado de 20 pies a partir de un punto dentro del alcance. Durante la duración, estas plantas convierten el suelo del área en terreno difícil.\n\nUna criatura en el área cuando lanzas el conjuro debe superar una tirada de salvación de Fuerza o quedar apresada por las plantas enmarañadas hasta que el conjuro termine. Una criatura apresada por las plantas puede usar su acción para hacer una prueba de Fuerza contra la CD de salvación de tus conjuros. Si tiene éxito, se libera.\n\nCuando el conjuro termina, las plantas conjuradas se marchitan.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-expeditious-retreat",
    "name": "Retirada Expeditiva",
    "nameEn": "Expeditious Retreat",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Este conjuro te permite moverte a una velocidad increíble. Cuando lo lanzas y como acción adicional en cada uno de tus turnos hasta que el conjuro termine, puedes realizar la acción de Correr (Dash).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-faerie-fire",
    "name": "Fuego Feérico",
    "nameEn": "Faerie Fire",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Cada objeto en un cubo de 20 pies queda delineado por una luz de color verde, violeta o azul. Cualquier criatura en el área debe superar una salvación de Destreza o quedará delineada por la luz, perdiendo los beneficios de la invisibilidad y otorgando ventaja en tiradas de ataque contra ella.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-false-life",
    "name": "Falsa Vida",
    "nameEn": "False Life",
    "level": 1,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S, M (un poco de alcohol)",
    "duration": "1 hora",
    "description": "Afrontas la muerte con una parodia necromántica de la vida, ganando 1d4 + 4 puntos de golpe temporales durante la duración.",
    "higherLevels": "Ganas 5 puntos de golpe temporales adicionales por cada nivel de ranura por encima de 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-feather-fall",
    "name": "Caída de Pluma",
    "nameEn": "Feather Fall",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 reacción, cuando tú o una criatura a 60 pies de ti cae",
    "range": "60 pies",
    "components": "V, M (una pluma pequeña o un trozo de plumón)",
    "duration": "1 minuto",
    "description": "Eliges hasta cinco criaturas que estén cayendo dentro del alcance. La velocidad de descenso de una criatura que cae se ralentiza a 60 pies por asalto hasta que el conjuro termine. Si la criatura aterriza antes de que el conjuro termine, no recibe daño por caída y puede aterrizar de pie, y el conjuro termina para esa criatura.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-find-familiar",
    "name": "Buscar Familiar",
    "nameEn": "Find Familiar",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 hora (Ritual)",
    "range": "10 pies",
    "components": "V, S, M (10 po de carbón, incienso y hierbas)",
    "duration": "Instantáneo",
    "description": "Obtienes los servicios de un familiar, un espíritu que adopta la forma de un animal a tu elección (lechuza, gato, murciélago, cuervo, serpiente, etc.). Actúa independientemente, puedes comunicarte telepáticamente con él, ver por sus ojos y canalizar conjuros con alcance de toque a través de él.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-fog-cloud",
    "name": "Nube de Oscurecimiento",
    "nameEn": "Fog Cloud",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Creas una esfera de niebla densa de 20 pies de radio centrada en un punto dentro del alcance. El área está densamente oscurecida y bloquea la visión por completo.",
    "higherLevels": "El radio de la niebla aumenta en 20 pies por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-frost-fingers",
    "name": "Dedos de Escarcha",
    "nameEn": "Frost Fingers",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 15 pies)",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Un cono de escarcha helada brota de tus dedos extendidos. Cada criatura en un cono de 15 pies debe realizar una tirada de salvación de Constitución. Una criatura recibe 2d8 de daño de frío si falla la salvación, o la mitad de daño si tiene éxito.\n\nEl frío congela los líquidos no mágicos del área que no se lleven puestos ni se transporten.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Icewind Dale - Rime of the Frostmaiden"
  },
  {
    "id": "spl-gift-of-alacrity",
    "name": "Don de Alacridad",
    "nameEn": "Gift of Alacrity",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S",
    "duration": "8 horas",
    "description": "Tocas a una criatura voluntaria. Durante la duración, dondequiera que la criatura realice una tirada de iniciativa, puede tirar un d8 y sumar el número obtenido a la tirada de iniciativa.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-goodberry",
    "name": "Bayas Nutritivas",
    "nameEn": "Goodberry",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (una ramita de muérdago)",
    "duration": "24 horas",
    "description": "Hasta 10 bayas infundidas con magia aparecen en tu mano. Una criatura puede usar su acción para comer una baya, recuperando 1 punto de golpe y obteniendo sustento nutritivo suficiente para un día entero.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-grease",
    "name": "Grasa",
    "nameEn": "Grease",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un poco de corteza de cerdo o mantequilla)",
    "duration": "1 minuto",
    "description": "Grasa resbaladiza cubre el suelo en un cuadrado de 10 pies centrado en un punto dentro del alcance y lo convierte en terreno difícil durante la duración.\n\nCuando la grasa aparece, cada criatura de pie en su área debe superar una tirada de salvación de Destreza o caer derribada. Una criatura que entra en el área o termina su turno allí también debe superar una tirada de salvación de Destreza o caer derribada.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-guiding-bolt",
    "name": "Saeta Guía",
    "nameEn": "Guiding Bolt",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "Un destello de luz se dispara hacia una criatura de tu elección dentro del alcance. Haz una tirada de ataque de conjuro a distancia contra el objetivo. Si impactas, el objetivo recibe 4d6 de daño radiante, y la próxima tirada de ataque realizada contra este objetivo antes del final de tu siguiente turno tiene ventaja, gracias a la luz mística tenue que brilla sobre el objetivo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hail-of-thorns",
    "name": "Lluvia de Espinas",
    "nameEn": "Hail of Thorns",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque de arma a distancia, una lluvia de espinas brota del proyectil. El objetivo y cada criatura a 5 pies sufren 1d10 de daño perforante si fallan una salvación de Destreza (la mitad si tienen éxito).",
    "higherLevels": "El daño aumenta en 1d10 por cada espacio por encima de nivel 1 (máx 6d10).",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-healing-word",
    "name": "Palabra de Curación",
    "nameEn": "Healing Word",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Una criatura de tu elección que puedas ver dentro del alcance recupera una cantidad de puntos de golpe igual a 1d4 + tu modificador de característica para el lanzamiento de conjuros. Este conjuro no tiene efecto en muertos vivientes ni en autómatas.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, la curación aumenta en 1d4 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hellish-rebuke",
    "name": "Reprensión Infernal",
    "nameEn": "Hellish Rebuke",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 reacción, cuando sufres daño de una criatura que puedas ver a 60 pies de ti",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Señalas con el dedo y la criatura que te dañó queda envuelta momentáneamente por llamas infernales. La criatura debe realizar una tirada de salvación de Destreza. Recibe 2d10 de daño de fuego si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d10 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-heroism",
    "name": "Heroísmo",
    "nameEn": "Heroism",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una criatura voluntaria queda imbuida de valentía heroica. Hasta que el conjuro termine, la criatura es inmune al estado asustado y gana puntos de golpe temporales iguales a tu modificador de característica de lanzamiento al comienzo de cada uno de sus turnos.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, puedes tener como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hex",
    "name": "Maleficio",
    "nameEn": "Hex",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción adicional",
    "range": "90 pies",
    "components": "V, S, M (el ojo petrificado de un tritón)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Maldices a una criatura dentro del alcance. Hasta que el conjuro termine, infliges 1d6 de daño necrótico adicional cada vez que la impactes con un ataque, y tiene desventaja en las pruebas de característica de la puntuación que elijas al lanzarlo.",
    "higherLevels": "A nivel 3 o 4 dura 8 horas; a nivel 5 dura 24 horas.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hunters-mark",
    "name": "Marca del Cazador",
    "nameEn": "Hunter's Mark",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 acción adicional",
    "range": "90 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 hora",
    "description": "Designas a una criatura como tu presa. Hasta que el conjuro termine, infliges 1d6 de daño con arma adicional al objetivo cada vez que lo golpees, y tienes ventaja en cualquier prueba de Sabiduría (Percepción o Supervivencia) para rastrearlo.",
    "higherLevels": "A nivel 3 o 4 dura 8 horas; a nivel 5 dura 24 horas.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-ice-knife",
    "name": "Cuchillo de Hielo",
    "nameEn": "Ice Knife",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S, M (una gota de agua o un trozo de hielo)",
    "duration": "Instantáneo",
    "description": "Creas y arrojas un proyectil afilado de hielo. Haz un ataque de conjuro a distancia. Si impactas, inflige 1d10 de daño perforante. Impacte o falle, el cuchillo explota: el objetivo y cada criatura a 5 pies deben superar una tirada de salvación de Destreza o sufrir 2d6 de daño por frío.",
    "higherLevels": "El daño de la explosión de frío aumenta en 1d6 por cada espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-identify",
    "name": "Identificar",
    "nameEn": "Identify",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S, M (una perla que valga al menos 100 po y una pluma de búho)",
    "duration": "Instantáneo",
    "description": "Eliges un objeto que debes tocar a lo largo del lanzamiento del conjuro. Si es un objeto mágico o algún otro objeto imbuido de magia, aprendes sus propiedades y cómo usarlo, si requiere sintonización para usarse y cuántas cargas tiene, si corresponde. Aprendes si algún conjuro está afectando al objeto y cuáles son. Si el objeto fue creado por un conjuro, aprendes qué conjuro lo creó.\n\nSi en su lugar tocas a una criatura a lo largo del lanzamiento, aprendes qué conjuros, si los hay, la están afectando actualmente.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-illusory-script",
    "name": "Escritura Ilusoria",
    "nameEn": "Illusory Script",
    "level": 1,
    "school": "Ilusión",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "S, M (tinta a base de plomo que valga al menos 10 po, consumida por el conjuro)",
    "duration": "10 días",
    "description": "Escribes en pergamino, papel o algún otro material adecuado y le infundes una potente ilusión que dura durante la duración.\n\nPara ti y cualquier criatura que designes cuando lanzas el conjuro, la escritura parece normal, escrita de tu puño y letra, y transmite el significado que pretendías cuando escribiste el texto. Para todos los demás, la escritura parece como si estuviera escrita en una escritura desconocida o ininteligible mágica, o una ilusión que parece un mensaje completamente diferente, escrito de otra letra y en otro idioma que conozcas.\n\nSi el conjuro es disipado, la escritura original y la ilusión desaparecen.\n\nUna criatura con visión verdadera puede leer el mensaje oculto.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-inflict-wounds",
    "name": "Infligir Heridas",
    "nameEn": "Inflict Wounds",
    "level": 1,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Haces una tirada de ataque de conjuro cuerpo a cuerpo contra una criatura dentro de tu alcance. Si impactas, el objetivo recibe 3d10 de daño necrótico.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d10 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-jims-magic-missile",
    "name": "Proyectil Mágico de Jim",
    "nameEn": "Jim's Magic Missile",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (1 moneda de oro, consumida como tributo por usar el conjuro)",
    "duration": "Instantáneo",
    "description": "Creas tres proyectiles retorcidos de energía mágica. Cada dardo se dirige a una criatura de tu elección dentro del alcance. Haz una tirada de ataque de conjuro a distancia para cada proyectil. Si impactas, el objetivo recibe 2d4 de daño de fuerza. Si sacas un 1 en el d20 para una de las tiradas de ataque, el proyectil te estalla en la cara y recibes 1 de daño de fuerza.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, creas un proyectil adicional por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-jump",
    "name": "Salto",
    "nameEn": "Jump",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (la pata trasera de un saltamontes)",
    "duration": "1 minuto",
    "description": "Tocas a una criatura. La distancia a la que puede saltar se multiplica por tres hasta que termine el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-longstrider",
    "name": "Zancada Prodigiosa",
    "nameEn": "Longstrider",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (una pizca de tierra)",
    "duration": "1 hora",
    "description": "Tocas a una criatura. Su velocidad aumenta en 10 pies hasta que termine el conjuro sin requerir concentración.",
    "higherLevels": "Puedes afectar a una criatura adicional por cada espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Druida",
      "Explorador",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mage-armor",
    "name": "Armadura de Mago",
    "nameEn": "Mage Armor",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un trozo de cuero curtido)",
    "duration": "8 horas",
    "description": "Tocas a una criatura voluntaria que no lleve armadura puesta, y una fuerza mágica protectora la rodea hasta que el conjuro termine. La CA base del objetivo se convierte en 13 + su modificador de Destreza. El conjuro termina si el objetivo se pone una armadura o si cancelas el conjuro como una acción.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-magic-missile",
    "name": "Proyectil Mágico",
    "nameEn": "Magic Missile",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Creas tres dardos brillantes de fuerza mágica. Cada dardo impacta a una criatura de tu elección que puedas ver dentro del alcance. Un dardo inflige 1d4 + 1 de daño de fuerza a su objetivo. Los dardos impactan simultáneamente y puedes dirigirlos a golpear a una sola criatura o a varias.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el conjuro crea un dardo adicional por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-magnify-gravity",
    "name": "Magnificar la Gravedad",
    "nameEn": "Magnify Gravity",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "La gravedad se incrementa momentáneamente en un punto que elijas dentro del alcance. Cada criatura en una esfera de 10 pies de radio centrada en ese punto debe realizar una tirada de salvación de Constitución. Una criatura recibe 2d8 de daño de fuerza si falla la salvación y su velocidad se reduce a la mitad hasta el final de su siguiente turno. Si tiene éxito en la salvación, una criatura recibe la mitad de daño y no sufre ninguna penalización a su velocidad.\n\nAdemás, los objetos no asegurados en esa área se arrastran hacia su centro.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-protection-from-evil-and-good",
    "name": "Protección contra el Bien y el Mal",
    "nameEn": "Protection from Evil and Good",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (agua bendita o plata en polvo)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una criatura voluntaria que toques queda protegida contra aberraciones, celestiales, elementales, fatas, infernales y muertos vivientes. Esas criaturas tienen desventaja en las tiradas de ataque contra el objetivo y no pueden poseerlo ni asustarlo ni hechizarlo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Paladín",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-purify-food-and-drink",
    "name": "Purificar Comida y Bebida",
    "nameEn": "Purify Food and Drink",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción (Ritual)",
    "range": "10 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Toda la comida y bebida no mágica dentro de una esfera de 5 pies de radio queda purificada y libre de todo veneno y enfermedad.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-ray-of-sickness",
    "name": "Rayo de Enfermedad",
    "nameEn": "Ray of Sickness",
    "level": 1,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Un rayo de energía verdosa sale disparado hacia una criatura. Haz un ataque de conjuro a distancia. Si impactas, sufre 2d8 de daño por veneno y debe superar una salvación de Constitución o quedará envenenada hasta el final de tu siguiente turno.",
    "higherLevels": "El daño aumenta en 1d8 por cada nivel de ranura por encima de 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-searing-smite",
    "name": "Castigo Abrasador",
    "nameEn": "Searing Smite",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tu arma estalla en llamas al rojo vivo. La próxima vez que impactes a una criatura con un ataque con arma, inflige 1d6 de daño por fuego adicional y prende al objetivo en llamas, sufriendo 1d6 de daño de fuego al inicio de cada turno.",
    "higherLevels": "El daño inicial aumenta en 1d6 por cada espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-shield",
    "name": "Escudo",
    "nameEn": "Shield",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 reacción, cuando eres alcanzado por un ataque o eres objetivo del conjuro proyectil mágico",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "Una barrera invisible de fuerza mágica aparece y te protege. Hasta el inicio de tu siguiente turno, tienes un bonificador de +5 a la CA, incluyendo contra el ataque desencadenante, y no recibes daño del conjuro proyectil mágico.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-shield-of-faith",
    "name": "Escudo de la Fe",
    "nameEn": "Shield of Faith",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 acción adicional",
    "range": "60 pies",
    "components": "V, S, M (un pequeño pergamino con un fragmento de texto sagrado escrito)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Un campo brillante rodea a una criatura de tu elección dentro del alcance, otorgándole un bonificador de +2 a la CA durante la duración.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-silent-image",
    "name": "Imagen Silenciosa",
    "nameEn": "Silent Image",
    "level": 1,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un vellón de lana)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas la imagen visual de un objeto, criatura o fenómeno visible que no supere un cubo de 15 pies. La imagen es puramente visual, no produce sonido ni olor, y puedes moverla por el área como acción.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-silvery-barbs",
    "name": "Púas Plateadas",
    "nameEn": "Silvery Barbs",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 reacción",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Mágicamente distraes al objetivo cuando tiene éxito en una tirada de ataque, prueba de característica o tirada de salvación. Debe relanzar el d20 y usar el resultado menor. Además, puedes conceder ventaja en su siguiente tirada a otra criatura a 60 pies.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Strixhaven: A Curriculum of Chaos"
  },
  {
    "id": "spl-sleep",
    "name": "Dormir",
    "nameEn": "Sleep",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (una pizca de arena fina, pétalos de rosa o un grillo)",
    "duration": "1 minuto",
    "description": "Este conjuro sumerge a las criaturas en un sueño mágico. Tira 5d8; el total es cuántos puntos de golpe de criaturas puede afectar este conjuro. Las criaturas a 20 pies o menos de un punto que elijas dentro del alcance se ven afectadas en orden ascendente de sus puntos de golpe actuales (ignorando criaturas inconscientes).\n\nComenzando con la criatura que tenga los puntos de golpe actuales más bajos, cada criatura afectada por este conjuro cae inconsciente hasta que el conjuro termine, la durmiente reciba daño o alguien use una acción para sacudirla o abofetearla para despertarla. Resta los puntos de golpe de cada criatura del total antes de pasar a la siguiente criatura con los puntos de golpe más bajos. Los puntos de golpe actuales de una criatura deben ser iguales o menores que el total restante para que esa criatura sea afectada.\n\nLos muertos vivientes y las criaturas inmunes a ser hechizadas no se ven afectados por este conjuro.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, tira 2d8 adicionales por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-snare",
    "name": "Cepo",
    "nameEn": "Snare",
    "level": 1,
    "school": "Abjuración",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "S, M (25 pies de cuerda)",
    "duration": "8 horas",
    "description": "Creas una trampa mágica en un círculo de 5 pies de radio en el suelo. Cuando una criatura Pequeña o mayor entra en el área, queda apresada boca abajo suspendida en el aire hasta que escape.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-speak-with-animals",
    "name": "Hablar con los Animales",
    "nameEn": "Speak with Animals",
    "level": 1,
    "school": "Adivinación",
    "castingTime": "1 acción (Ritual)",
    "range": "Personal",
    "components": "V, S",
    "duration": "10 minutos",
    "description": "Obtienes la capacidad de comprender y comunicarte verbalmente con bestias durante la duración. Puedes obtener información sobre ubicaciones cercanas, monstruos y eventos recientes.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-tashas-caustic-brew",
    "name": "Brebaje Cáustico de Tasha",
    "nameEn": "Tasha's Caustic Brew",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Línea de 30 pies (5 pies de ancho)",
    "components": "V, S, M (un trozo de comida podrida)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Emanas una corriente de ácido en una línea de 30 pies de largo y 5 pies de ancho. Cada criatura en la línea debe superar una tirada de salvación de Destreza o quedar cubierta de ácido, recibiendo 2d4 de daño por ácido al comienzo de cada uno de sus turnos hasta que ella u otra criatura use una acción para limpiarlo.",
    "higherLevels": "El daño aumenta en 2d4 por cada espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-tashas-hideous-laughter",
    "name": "Risa Incontrolable de Tasha",
    "nameEn": "Tasha's Hideous Laughter",
    "level": 1,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (pequeñas tartas y una pluma)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una criatura de tu elección que puedas ver percibe todo a su alrededor como hilarantemente cómico. Debe superar una salvación de Sabiduría o caer derribada al suelo y quedar incapacitada por una risa incontrolable.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-tensers-floating-disk",
    "name": "Disco Flotante de Tenser",
    "nameEn": "Tenser's Floating Disk",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una gota de mercurio)",
    "duration": "1 hora",
    "description": "Este conjuro crea un plano circular y horizontal de fuerza, de 3 pies de diámetro y 1 pulgada de grosor, que flota en un espacio desocupado de tu elección a 5 pies o menos de ti. El disco permanece durante la duración y puede soportar hasta 500 libras.\n\nEl disco es inmóvil mientras estés a 20 pies o menos de él. Si te alejas a más de 20 pies, el disco te sigue para permanecer a 20 pies de ti. Puede moverse a través de terreno difícil o subir escaleras, pero no puede cruzar una elevación de 10 pies o más.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-thunderous-smite",
    "name": "Castigo Atronador",
    "nameEn": "Thunderous Smite",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tu arma reverbera con fuerza de trueno. La próxima vez que impactes a una criatura con un ataque con arma, inflige 2d6 de daño de trueno adicional y debe superar una salvación de Fuerza o ser empujada 10 pies y derribada.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-thunderwave",
    "name": "Onda Atronadora",
    "nameEn": "Thunderwave",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (cubo de 15 pies)",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Una ola de fuerza atronadora surge de ti. Cada criatura en un cubo de 15 pies originado en ti debe realizar una tirada de salvación de Constitución. Si falla la salvación, una criatura recibe 2d8 de daño de trueno y es empujada 10 pies lejos de ti. Si tiene éxito en la salvación, la criatura recibe la mitad de daño y no es empujada.\n\nAdemás, los objetos no asegurados que estén completamente dentro del área de efecto son empujados automáticamente 10 pies lejos de ti por el efecto del conjuro, y el conjuro emite un estruendo atronador audible a 300 pies.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 2 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 1.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-unseen-servant",
    "name": "Sirviente Invisible",
    "nameEn": "Unseen Servant",
    "level": 1,
    "school": "Conjuración",
    "castingTime": "1 acción (Ritual)",
    "range": "60 pies",
    "components": "V, S, M (un trozo de cuerda y un poco de madera)",
    "duration": "1 hora",
    "description": "Creas una fuerza invisible, sin mente y sin forma que obedece tus órdenes verbales sencillas. Puede realizar tareas simples como limpiar, encender fuegos, servir vino, recoger objetos o reparar ropa.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-witch-bolt",
    "name": "Saeta de Bruja",
    "nameEn": "Witch Bolt",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una rama rota por un rayo)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un haz de energía azul crepitante une tu mano con una criatura. Haz un ataque de conjuro a distancia. Si impactas, sufre 1d12 de daño de relámpago, y en cada uno de tus turnos puedes usar tu acción para causarle 1d12 de daño de relámpago automáticamente mientras permanezca a tu alcance.",
    "higherLevels": "El daño inicial aumenta en 1d12 por cada nivel de ranura por encima de 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wrathful-smite",
    "name": "Castigo Furioso",
    "nameEn": "Wrathful Smite",
    "level": 1,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque con arma, tu ataque inflige 1d6 de daño psíquico adicional. Además, el objetivo debe superar una tirada de salvación de Sabiduría o quedar asustado de ti.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-zephyr-strike",
    "name": "Golpe de Céfiro",
    "nameEn": "Zephyr Strike",
    "level": 1,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Te mueves con la ligereza del viento. Tu movimiento no provoca ataques de oportunidad. Además, una vez antes de que termine el conjuro, obtienes ventaja en un ataque con arma, infliges 1d8 de daño de fuerza adicional si impactas, y tu velocidad aumenta en 30 pies hasta el final de ese turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Explorador"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-aganazzars-scorcher",
    "name": "Abrasador de Aganazzar",
    "nameEn": "Aganazzar's Scorcher",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una escama de dragón rojo)",
    "duration": "Instantáneo",
    "description": "Una línea de fuego rugiente de 30 pies de largo y 5 pies de ancho emana de ti en la dirección que elijas. Cada criatura en la línea debe realizar una tirada de salvación de Destreza. Una criatura recibe 3d8 de daño de fuego si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-aid",
    "name": "Auxilio Divino",
    "nameEn": "Aid",
    "level": 2,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una tira diminuta de tela blanca)",
    "duration": "8 horas",
    "description": "Tu conjuro infunde vigor y resolución en tus aliados. Elige hasta tres criaturas dentro del alcance. Los puntos de golpe máximos y los puntos de golpe actuales de cada objetivo aumentan en 5 durante la duración.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, los puntos de golpe de cada objetivo aumentan en 5 adicionales por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-air-bubble",
    "name": "Burbuja de Aire",
    "nameEn": "Air Bubble",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S",
    "duration": "24 horas",
    "description": "Creas una esfera brillante de aire fresco respirable alrededor de la cabeza de hasta doce criaturas voluntarias dentro del alcance. Mientras la burbuja rodee la cabeza de una criatura, esta puede respirar normalmente incluso bajo el agua o en el vacío.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Spelljammer: Adventures in Space - Astral Adventurer's Guide"
  },
  {
    "id": "spl-alter-self",
    "name": "Alterar el Propio Aspecto",
    "nameEn": "Alter Self",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Asumes una forma diferente. Puedes elegir Adaptación Acuática (branquias y velocidad de nado), Cambiar Apariencia (cambiar tu rostro, altura, peso y raza aparente) o Armas Naturales (tus garras, colmillos o cuernos se vuelven armas mágicas que causan 1d6 + modificador de Fuerza).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-animal-messenger",
    "name": "Mensajero Animal",
    "nameEn": "Animal Messenger",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (un bocado de comida)",
    "duration": "24 horas",
    "description": "Por medio de este conjuro, usas un animal para enviar un mensaje. Elige una bestia Diminuta que puedas ver dentro del alcance, como una ardilla, un arrendajo o un murciélago. Especificas una ubicación que hayas visitado y una descripción general del destinatario. La bestia viaja hacia la ubicación a una velocidad de unas 50 millas por día (o 25 millas si es un mensajero volador) y entrega tu mensaje de hasta 25 palabras con tu propia voz.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, la duración del conjuro aumenta en 48 horas por cada nivel de espacio por encima de nivel 2.",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-arcane-lock",
    "name": "Cierre Arcano",
    "nameEn": "Arcane Lock",
    "level": 2,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (polvo de oro por valor de 25 po)",
    "duration": "Hasta que sea disipado",
    "description": "Tocas una puerta cerrada, ventana, cofre u otra entrada. Queda cerrada mágicamente. Tú y los que designes pueden abrirla con normalidad. La CD para forzarla o derribarla aumenta en 10.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-augury",
    "name": "Augurio",
    "nameEn": "Augury",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Lanzador",
    "components": "V, S, M (specially marked sticks, bones, or similar tokens que valga al menos 25 po)",
    "duration": "Instantáneo",
    "description": "Lanzando palos con gemas incrustadas, huesos grabados o cartas de tarot, recibes un presagio de una entidad de otro mundo sobre los resultados de un curso específico de acción que planeas tomar dentro de los próximos 30 minutos. El DM elige entre cuatro posibles presagios: Beneplácito (para buenos resultados), Desgracia (para malos resultados), Ambos (para resultados tanto buenos como malos) o Nada (para resultados que no son especialmente buenos ni malos).",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-barkskin",
    "name": "Piel Robliza",
    "nameEn": "Barkskin",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un trozo de corteza de roble)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas a una criatura voluntaria. Su piel adquiere la resistencia de la corteza. La CA del objetivo no puede ser menor que 16, independientemente del tipo de armadura que lleve puesta.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-beast-sense",
    "name": "Sentido Bestial",
    "nameEn": "Beast Sense",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas a una bestia voluntaria. Durante la duración del conjuro, puedes usar tu acción para ver a través de los ojos de la bestia y escuchar a través de sus oídos, beneficiándote de cualquier sentido especial que tenga la criatura.",
    "higherLevels": "",
    "ritual": true,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blindness-deafness",
    "name": "Ceguera/Sordera",
    "nameEn": "Blindness/Deafness",
    "level": 2,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V",
    "duration": "1 minuto",
    "description": "Infringes una plaga sensorial sobre una criatura visible. Debe superar una salvación de Constitución o quedar ciega o sorda (a tu elección) durante la duración sin requerir concentración.",
    "higherLevels": "Puedes afectar a un objetivo adicional por cada espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blur",
    "name": "Desdibujar",
    "nameEn": "Blur",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tu cuerpo se vuelve borroso y ondulante. Cualquier criatura tiene desventaja en las tiradas de ataque contra ti a menos que use vista ciega o vista verdadera.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-borrowed-knowledge",
    "name": "Conocimiento Prestado",
    "nameEn": "Borrowed Knowledge",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (a book que valga al menos 25 po)",
    "duration": "1 hora",
    "description": "Extraes conocimiento de los anales de la historia. Eliges una habilidad en la que carezcas de competencia. Durante la duración del conjuro, tienes competencia en la habilidad elegida.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Brujo",
      "Mago"
    ],
    "source": "Strixhaven: A Curriculum of Chaos"
  },
  {
    "id": "spl-branding-smite",
    "name": "Castigo Marcador",
    "nameEn": "Branding Smite",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque de arma antes de que termine el conjuro, el arma resplandece con un brillo astral. El ataque inflige 2d6 de daño radiante adicional al objetivo, el cual se vuelve visible si es invisible y emite luz tenue en un radio de 5 pies, impidiéndole volverse invisible hasta que el conjuro termine.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, el daño adicional aumenta en 1d6 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-calm-emotions",
    "name": "Calmar Emociones",
    "nameEn": "Calm Emotions",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Intentas suprimir emociones intensas en un radio de 20 pies. Los humanoides que fallen una salvación de Sabiduría pueden ver suprimido su estado de asustado o hechizado, o volverse indiferentes hacia criaturas que antes veían como hostiles.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-cloud-of-daggers",
    "name": "Nube de Dagas",
    "nameEn": "Cloud of Daggers",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una astilla de vidrio)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Llenas el aire con dagas mágicas giratorias en un cubo de 5 pies. Cualquier criatura que entre en el área o comience su turno en ella sufre automáticamente 4d4 de daño cortante sin tirada de salvación.",
    "higherLevels": "El daño aumenta en 2d4 por cada espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-cordon-of-arrows",
    "name": "Cordón de Flechas",
    "nameEn": "Cordon of Arrows",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "5 pies",
    "components": "V, S, M (four or more arrows or bolts)",
    "duration": "8 horas",
    "description": "Clavas cuatro virotes o flechas no mágicas en el suelo dentro del alcance. Mientras el conjuro esté activo, cuando una criatura que no sea tú se acerque a 30 pies o menos de una de las flechas por primera vez en un turno, una flecha se dispara hacia ella. La criatura debe superar una tirada de salvación de Destreza o recibir 1d6 de daño perforante.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, la cantidad de flechas que puedes clavar aumenta en dos por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-crown-of-madness",
    "name": "Corona de Locura",
    "nameEn": "Crown of Madness",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un humanoide a tu alcance debe superar una tirada de salvación de Sabiduría o quedará hechizado por ti. Una corona retorcida de hierro y llamas espectrales aparece sobre su cabeza. En cada uno de tus turnos puedes obligarlo a realizar un ataque cuerpo a cuerpo contra una criatura cercana a tu elección.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-darkness",
    "name": "Oscuridad",
    "nameEn": "Darkness",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, M (pelo de murciélago y brea)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una esfera de 15 pies de radio de oscuridad mágica se extiende desde un punto. La visión en la oscuridad no puede ver a través de ella, y ninguna luz no mágica puede iluminarla. Si la oscuridad se solapa con una luz de nivel 2 o menor, el conjuro de luz queda disipado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-darkvision",
    "name": "Visión en la Oscuridad",
    "nameEn": "Darkvision",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (una pizca de zanahoria seca o un ágata)",
    "duration": "8 horas",
    "description": "Tocas a una criatura voluntaria para concederle la capacidad de ver en la oscuridad. Durante la duración, la criatura tiene visión en la oscuridad con un alcance de 60 pies.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-detect-thoughts",
    "name": "Detectar Pensamientos",
    "nameEn": "Detect Thoughts",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S, M (una moneda de cobre)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Durante la duración puedes leer los pensamientos superficiales de ciertas criaturas en un radio de 30 pies de ti, o sondear más profundamente en su mente si fallan una salvación de Sabiduría para descubrir sus secretos, motivaciones o recuerdos ocultos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dragons-breath",
    "name": "Aliento de Dragón",
    "nameEn": "Dragon's Breath",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Toque",
    "components": "V, S, M (un pimiento picante)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tocas a una criatura voluntaria imbuyéndola de poder dracónico. Eliges ácido, frío, fuego, relámpago o veneno. La criatura puede usar una acción para exhalar energía en un cono de 15 pies. Cada criatura en el área debe superar una salvación de Destreza o sufrir 3d6 del daño elegido.",
    "higherLevels": "El daño aumenta en 1d6 por cada espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-dust-devil",
    "name": "Remolino de Polvo",
    "nameEn": "Dust Devil",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una pizca de polvo)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges un cubo de 5 pies de aire dentro del alcance. Un torbellino elemental de polvo de 5 pies de lado aparece en ese punto. Cualquier criatura que termine su turno a 5 pies o menos del remolino debe superar una tirada de salvación de Fuerza o recibir 1d8 de daño contundente y ser empujada 10 pies lejos de él.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-earthbind",
    "name": "Atadura Terrenal",
    "nameEn": "Earthbind",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges una criatura que puedas ver dentro del alcance. Bandas amarillas de energía mágica se enrollan alrededor de ella. El objetivo debe superar una tirada de salvación de Fuerza o su velocidad de vuelo (si tiene alguna) se reduce a 0 pies durante la duración.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-enhance-ability",
    "name": "Mejorar Característica",
    "nameEn": "Enhance Ability",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (pelo o pluma de una bestia)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas a una criatura y le otorgas una bendición mágica eligiendo un aspecto: Resistencia del Oso (ventaja en Con y 2d6 PG temporales), Fuerza del Toro (ventaja en Fue y doble carga), Gracia Felina (ventaja en Des y sin daño por caídas de 20 pies), Esplendor del Águila (ventaja en Car), Astucia del Zorro (ventaja en Int) o Sabiduría del Búho (ventaja en Sab).",
    "higherLevels": "Puedes seleccionar a una criatura adicional por cada nivel de ranura por encima de 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-enlarge-reduce",
    "name": "Agrandar/Reducir",
    "nameEn": "Enlarge/Reduce",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una pizca de polvo de hierro)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Haces que una criatura u objeto crezca o encoja. Agrandar duplica su tamaño, multiplica por ocho su peso, otorga ventaja en pruebas de Fuerza y añade 1d4 a sus ataques con armas. Reducir divide su tamaño a la mitad, divide su peso por ocho, impone desventaja en Fuerza y resta 1d4 al daño.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-enthrall",
    "name": "Cautivar",
    "nameEn": "Enthrall",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "1 minuto",
    "description": "Tejes una sarta de palabras distractoras cautivando a las criaturas a tu alcance que fallen una salvación de Sabiduría. Tienen desventaja en las pruebas de Sabiduría (Percepción) para percibir a cualquier criatura que no seas tú.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-find-steed",
    "name": "Buscar Corcel",
    "nameEn": "Find Steed",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "10 minutos",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Invocas un espíritu que asume la forma de un corcel inusualmente inteligente, fuerte y leal, creando un vínculo duradero con él. Aparece en un espacio desocupado dentro del alcance bajo la forma de un caballo de guerra, un poni, un camello, un alce o un mastín.\n\nEl corcel tiene las estadísticas de la forma elegida, pero es un celestial, hada o infernal en lugar de una bestia. Tu corcel sirve como una montura tanto en combate como fuera de él.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-find-traps",
    "name": "Buscar Trampas",
    "nameEn": "Find Traps",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Sientes la presencia de cualquier trampa dentro del alcance que esté en tu línea de visión. Una trampa, para este conjuro, incluye cualquier cosa que pueda infligir daño físico repentino o un efecto perjudicial no deseado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-flame-blade",
    "name": "Hoja Llameante",
    "nameEn": "Flame Blade",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V, S, M (a leaf of sumac)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Evocas una hoja de fuego ardiente en tu mano libre. La hoja es similar en tamaño y forma a una cimitarra y dura durante la duración. Puedes usar tu acción para realizar un ataque de conjuro cuerpo a cuerpo con la hoja. Si impactas, el objetivo recibe 3d6 de daño de fuego.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d6 por cada dos niveles de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-flaming-sphere",
    "name": "Esfera Flamígera",
    "nameEn": "Flaming Sphere",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un poco de sebo y polvo de azufre)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas una esfera de fuego de 5 pies de diámetro. Cualquier criatura que termine su turno a 5 pies de ella debe superar una tirada de salvación de Destreza o sufrir 2d6 de daño por fuego. Puedes moverla hasta 30 pies como acción adicional.",
    "higherLevels": "El daño aumenta en 1d6 por cada nivel por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-flock-of-familiars",
    "name": "Bandada de Familiares",
    "nameEn": "Flock of Familiars",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas temporalmente hasta tres familiares que duran durante la duración. Cada uno aparece en un espacio desocupado a 10 pies o menos de ti y adopta una forma de bestia diminuta como murciélago, gato, cuervo, búho, serpiente venenosa o rata.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes invocar un familiar adicional por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Lost Laboratory of Kwalish"
  },
  {
    "id": "spl-fortunes-favor",
    "name": "Favor de la Fortuna",
    "nameEn": "Fortune's Favor",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "60 pies",
    "components": "V, S, M (a white pearl que valga al menos 100 po, que el conjuro consume)",
    "duration": "1 hora",
    "description": "Transfieres una pizca de suerte del tejido temporal a ti mismo o a otra criatura. El objetivo recibe una perla gris de suerte. Durante la próxima hora, cuando el objetivo realice una tirada de ataque, prueba de característica o tirada de salvación, puede gastar la perla para tirar un d20 adicional y elegir cuál usar.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-gentle-repose",
    "name": "Reposo Apacible",
    "nameEn": "Gentle Repose",
    "level": 2,
    "school": "Nigromancia",
    "castingTime": "1 acción (Ritual)",
    "range": "Toque",
    "components": "V, S, M (una pizca de sal y una moneda de cobre en cada ojo)",
    "duration": "10 días",
    "description": "Tocas un cadáver u otros restos. Queda protegido contra la descomposición y no puede convertirse en un muerto viviente. Además, este tiempo no cuenta para el límite de tiempo de conjuros que resucitan a los muertos como Revivir.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-gift-of-gab",
    "name": "Don de la Elocuencia",
    "nameEn": "Gift of Gab",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 reacción, cuando le hablas a otra criatura",
    "range": "Lanzador",
    "components": "V, S, M (2 gold coins, which is consumido as tax for using the spell)",
    "duration": "Instantáneo",
    "description": "Cuando hablas con una criatura y dices algo que desearías no haber dicho, lanzas este conjuro como una reacción. Las palabras que acabas de pronunciar en los últimos 6 segundos se borran de la memoria de las criaturas que te escucharon y las reemplazas por nuevas palabras elegidas por ti.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-gust-of-wind",
    "name": "Ráfaga de Viento",
    "nameEn": "Gust of Wind",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Personal (línea de 60 pies)",
    "components": "V, S, M (una semilla de legumbre)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una línea de viento huracanado de 60 pies de largo y 10 pies de ancho surge de ti. Cada criatura que comience su turno allí debe superar una salvación de Fuerza o ser empujada 15 pies en dirección opuesta. Apaga velas, dispersa nieblas y cuesta el doble de movimiento avanzar contra él.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-healing-spirit",
    "name": "Espíritu Curativo",
    "nameEn": "Healing Spirit",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Invocas un espíritu de la naturaleza para sanar a los heridos. El espíritu intangible aparece en un espacio que elijas dentro del alcance en un cubo de 5 pies. Hasta que el conjuro termine, cuando tú o una criatura que puedas ver entren en el espacio del espíritu por primera vez en un turno o comiencen su turno allí, puedes hacer que el espíritu recupere 1d6 puntos de golpe a esa criatura.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, la curación aumenta en 1d6 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-heat-metal",
    "name": "Calentar Metal",
    "nameEn": "Heat Metal",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un trozo de hierro y una llama)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges un objeto metálico manufacturado visible dentro del alcance. El objeto brilla al rojo vivo. Cualquier criatura en contacto con él sufre 2d8 de daño por fuego al lanzarlo y puedes usar una acción adicional en turnos posteriores para infligir ese daño nuevamente.",
    "higherLevels": "El daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hold-person",
    "name": "Retener Persona",
    "nameEn": "Hold Person",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (a small, straight piece of iron)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges un humanoide que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Sabiduría o quedar paralizado durante la duración. Al final de cada uno de sus turnos, el objetivo puede realizar otra tirada de salvación de Sabiduría. Con un éxito, el conjuro termina para ese objetivo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes elegir como objetivo a un humanoide adicional por cada nivel de espacio por encima de nivel 2. Los humanoides deben estar a 30 pies o menos entre sí cuando los eliges como objetivo.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-immovable-object",
    "name": "Objeto Inamovible",
    "nameEn": "Immovable Object",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (gold dust que valga al menos 25 po, que el conjuro consume)",
    "duration": "1 hora",
    "description": "Tocas un objeto que no pese más de 10 libras. El objeto queda fijado en el espacio, desafiando la gravedad e impidiendo que nada lo mueva a menos que supere una prueba de Fuerza contra la CD de salvación de tus conjuros.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 4 o 5, la prueba de Fuerza tiene desventaja y el objeto puede soportar hasta 4.000 libras. Si usas un espacio de nivel 6 o superior, dura hasta ser disipado y soporta hasta 20.000 libras.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-invisibility",
    "name": "Invisibilidad",
    "nameEn": "Invisibility",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (an eyelash encased in gum arabic)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Una criatura que toques se vuelve invisible hasta que el conjuro termine. Todo lo que el objetivo lleve puesto o transporte es invisible mientras esté sobre su persona. El conjuro termina para un objetivo que ataque o lance un conjuro.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-jims-glowing-coin",
    "name": "Moneda Brillante de Jim",
    "nameEn": "Jim's Glowing Coin",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S, M (a coin, 2 gold coins, which is consumido as tax for using the spell)",
    "duration": "1 minuto",
    "description": "Lanzas una moneda brillante a un punto dentro del alcance. La moneda emite luz tenue en un radio de 10 pies. Cualquier criatura a 30 pies o menos que pueda ver la moneda debe superar una tirada de salvación de Sabiduría o quedar fascinada y distraída por ella, sufriendo desventaja en las pruebas de Sabiduría (Percepción) hasta el final de tu siguiente turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-kinetic-jaunt",
    "name": "Paseo Cinético",
    "nameEn": "Kinetic Jaunt",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tu movimiento se vuelve fluido como el viento. Tu velocidad aumenta en 10 pies, tu movimiento no provoca ataques de oportunidad y puedes atravesar el espacio de otras criaturas sin penalización.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Strixhaven: A Curriculum of Chaos"
  },
  {
    "id": "spl-knock",
    "name": "Abrir",
    "nameEn": "Knock",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Eliges un objeto que puedas ver a tu alcance (puerta, cofre, grilletes o candado). Una cerradura se desbloquea mágicamente. Si el objeto estaba protegido por Cerradura Arcana, ese conjuro queda suspendido durante 10 minutos. Al lanzarse, emite un fuerte golpe sónico audible a 300 pies.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-lesser-restoration",
    "name": "Restablecimiento Menor",
    "nameEn": "Lesser Restoration",
    "level": 2,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Tocas a una criatura y puedes poner fin a una enfermedad o a una condición que la aflija. La condición puede ser cegado, ensordecido, paralizado o envenenado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-levitate",
    "name": "Levitar",
    "nameEn": "Levitate",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un pequeño lazo de cuero)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una criatura u objeto de hasta 500 libras se eleva verticalmente en el aire hasta 20 pies y permanece flotando suspendido allí. Puedes cambiar su altitud hasta 20 pies en turnos posteriores.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-locate-animals-or-plants",
    "name": "Localizar Animales o Plantas",
    "nameEn": "Locate Animals or Plants",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (a bit of fur from a bloodhound)",
    "duration": "Instantáneo",
    "description": "Describe o nombra un tipo específico de bestia o planta. Sintiendo la dirección hacia ella, aprendes la dirección y distancia a la criatura o planta más cercana de ese tipo en un radio de 5 millas de ti.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-locate-object",
    "name": "Localizar Objeto",
    "nameEn": "Locate Object",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (a forked twig)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Describe o nombra un objeto que te sea familiar. Sientes la dirección hacia la ubicación del objeto, siempre que ese objeto esté a 1.000 pies o menos de ti. Si el objeto está en movimiento, sabes la dirección de su movimiento.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-magic-mouth",
    "name": "Boca Mágica",
    "nameEn": "Magic Mouth",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 minuto",
    "range": "30 pies",
    "components": "V, S, M (a small bit of honeycomb and jade dust que valga al menos 10 po, que el conjuro consume)",
    "duration": "Hasta disiparse",
    "description": "Implantas un mensaje en un objeto dentro del alcance, el cual es pronunciado cuando se cumple una condición desencadenante que especificas. Eliges el objeto que debe estar dentro del alcance y un mensaje de hasta 25 palabras pronunciado con tu propia voz.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-magic-weapon",
    "name": "Arma Mágica",
    "nameEn": "Magic Weapon",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas un arma no mágica. Hasta que el conjuro termine, esa arma se convierte en un arma mágica con un bonificador de +1 a las tiradas de ataque y a las tiradas de daño.",
    "higherLevels": "El bonificador aumenta a +2 con ranura de nivel 4 y a +3 con ranura de nivel 6.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Paladín",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-maximillians-earthen-grasp",
    "name": "Agarre Terrenal de Maximiliano",
    "nameEn": "Maximillian's Earthen Grasp",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a miniature hand sculpted from clay)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges un cuadrado de 5 pies de tierra o piedra sin trabajar dentro del alcance. Una mano de tierra compactada brota y alcanza a una criatura a 5 pies de ella. El objetivo debe superar una tirada de salvación de Fuerza o quedar apresado y recibir 2d6 de daño contundente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-melfs-acid-arrow",
    "name": "Flecha Ácida de Melf",
    "nameEn": "Melf's Acid Arrow",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (polvo de ruibarbo y estómago de víbora)",
    "duration": "Instantáneo",
    "description": "Una flecha brillante de color verde sale disparada hacia un objetivo. Haz un ataque de conjuro a distancia. Si impactas, causa 4d4 de daño de ácido inmediatamente y 2d4 de daño de ácido al final de su siguiente turno. Si fallas, causa la mitad del daño inicial y nada después.",
    "higherLevels": "El daño inicial y posterior aumentan en 1d4 cada uno por cada nivel de ranura por encima de 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mind-spike",
    "name": "Púa Mental",
    "nameEn": "Mind Spike",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Clavas una púa de energía psíquica en la mente de un objetivo visible. Debe superar una tirada de salvación de Sabiduría o sufrir 3d8 de daño psíquico (la mitad si supera). Si falla, conoces su ubicación exacta en todo momento mientras dure el conjuro.",
    "higherLevels": "El daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-mirror-image",
    "name": "Reflejo Espectral",
    "nameEn": "Mirror Image",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "1 minuto",
    "description": "Tres duplicados ilusorios de ti mismo aparecen en tu espacio. Hasta que el conjuro termine, los duplicados se mueven contigo y mimetizan tus acciones, haciendo imposible discernir cuál es el verdadero. Cada vez que una criatura te elija como objetivo de un ataque, tira un d20 para determinar si el ataque en su lugar apunta a uno de tus duplicados.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-misty-step",
    "name": "Paso Brumoso",
    "nameEn": "Misty Step",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Brevemente rodeado por una niebla plateada, te teletransportas instantáneamente hasta 30 pies a un espacio desocupado que puedas ver.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-moonbeam",
    "name": "Haz de Luna",
    "nameEn": "Moonbeam",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (varias semillas de luna)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un cilindro plateado de luz lunar de 5 pies de radio desciende del cielo. Toda criatura que entre o empiece su turno en él debe superar una salvación de Constitución o sufrir 2d10 de daño radiante. Los cambiaformas tienen desventaja y son revertidos a su forma original.",
    "higherLevels": "El daño aumenta en 1d10 por cada espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-nathairs-mischief",
    "name": "Travesura de Nathair",
    "nameEn": "Nathair's Mischief",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S, M (a piece of crust from an apple pie)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Llenas un cubo de 20 pies dentro del alcance con magia feérica caótica y bromista. Tira en la tabla de travesuras para determinar el efecto en el área al inicio de tu turno: flores que ciegan, humo de tarta de manzana que encanta, risitas que incapacitan o gotas de melaza que ralentizan.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-nystuls-magic-aura",
    "name": "Aura Mágica de Nystul",
    "nameEn": "Nystul's Magic Aura",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (a small square of silk)",
    "duration": "24 horas",
    "description": "Colocas una ilusión sobre una criatura u objeto que toques para que los conjuros de adivinación revelen información falsa sobre su aura mágica, tipo de criatura o propiedades.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-pass-without-trace",
    "name": "Pasar sin Rastro",
    "nameEn": "Pass Without Trace",
    "level": 2,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S, M (cenizas de una hoja de acebo quemada)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Un velo de sombras y silencio emana de ti. Cada criatura que elijas a 30 pies de ti (incluyéndote) obtiene un bonificador de +10 a las pruebas de Destreza (Sigilo) y no puede ser rastreada salvo por medios mágicos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-phantasmal-force",
    "name": "Fuerza Fantasmagórica",
    "nameEn": "Phantasmal Force",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un trozo de vellón)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges una criatura; si falla una salvación de Inteligencia, implantas una ilusión que solo ella percibe tan real que racionaliza cualquier incoherencia. La ilusión puede infligirle 1d6 de daño psíquico por asalto si parece peligrosa (ej. fuego, ácido o un monstruo que la ataca).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-prayer-of-healing",
    "name": "Plegaria de Curación",
    "nameEn": "Prayer of Healing",
    "level": 2,
    "school": "Evocación",
    "castingTime": "10 minutos",
    "range": "30 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Entonas una plegaria curativa. Hasta 6 criaturas a tu elección dentro del alcance recuperan 2d8 + tu modificador de característica de lanzamiento puntos de golpe.",
    "higherLevels": "La curación aumenta en 1d8 por cada nivel por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-protection-from-poison",
    "name": "Protección contra el Veneno",
    "nameEn": "Protection from Poison",
    "level": 2,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Tocas a una criatura. Neutralizas un veneno que la esté afectando. Durante la duración, tiene ventaja en las salvaciones contra ser envenenada y resistencia contra el daño por veneno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-pyrotechnics",
    "name": "Pirotecnia",
    "nameEn": "Pyrotechnics",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Eliges un fuego no mágico que quepa en un cubo de 5 pies dentro del alcance. Puedes extinguir la llama y crear o bien fuegos artificiales deslumbrantes que ciegan a las criaturas a 10 pies o menos de él si fallan una salvación de Constitución, o bien una espesa nube de humo en un radio de 20 pies que bloquea la visión durante 1 minuto.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-ray-of-enfeeblement",
    "name": "Rayo de Debilitamiento",
    "nameEn": "Ray of Enfeeblement",
    "level": 2,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un rayo negro de energía debilitadora drena el vigor de una criatura. Haz un ataque de conjuro a distancia. Si impactas, el objetivo inflige solo la mitad de daño con ataques con armas que usen Fuerza hasta que termine el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-rimes-binding-ice",
    "name": "Hielo Atador de Rime",
    "nameEn": "Rime's Binding Ice",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Personal (cono de 30 pies)",
    "components": "S, M (un trozo de hielo)",
    "duration": "Instantáneo",
    "description": "Un estallido de frío glacial emana de ti en un cono de 30 pies. Cada criatura debe superar una salvación de Constitución o sufrir 3d8 de daño por frío y quedar atrapada en hielo cristalino reduciendo su velocidad a 0 hasta que gaste una acción para romper el hielo.",
    "higherLevels": "El daño aumenta en 1d8 por cada nivel de ranura por encima de 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-rope-trick",
    "name": "Truco de la Cuerda",
    "nameEn": "Rope Trick",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un trozo de pergamino y extracto de maíz)",
    "duration": "1 hora",
    "description": "Tocas una cuerda de hasta 60 pies. Un extremo se eleva en el aire hasta quedar suspendido perpendicularmente. En el extremo superior se abre una entrada a un espacio extradimensional invisible donde pueden esconderse hasta 8 criaturas de tamaño Mediano.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-scorching-ray",
    "name": "Rayo Abrasador",
    "nameEn": "Scorching Ray",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Creas tres rayos de fuego y los lanzas hacia objetivos dentro del alcance. Puedes arrojarlos hacia un solo objetivo o hacia varios. Haz una tirada de ataque de conjuro a distancia para cada rayo. Si impactas, el objetivo recibe 2d6 de daño de fuego.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, creas un rayo adicional por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-see-invisibility",
    "name": "Ver Invisibilidad",
    "nameEn": "See Invisibility",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S, M (una pizca de talco y polvo de plata)",
    "duration": "1 hora",
    "description": "Durante 1 hora, ves criaturas y objetos invisibles como si fueran visibles, y puedes ver en el Plano Etéreo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-shadow-blade",
    "name": "Hoja Sombría",
    "nameEn": "Shadow Blade",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción adicional",
    "range": "Personal",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tejes hebras de sombras para forjar una espada en tu mano. Es un arma cuerpo a cuerpo simple que inflige 2d8 de daño psíquico y tiene las propiedades sutil, ligera y arrojadiza (alcance 20/60). Tienes ventaja en los ataques con ella en luz tenue o penumbra.",
    "higherLevels": "A nivel 3 o 4 inflige 3d8; a nivel 5 o 6 inflige 4d8; a nivel 7+ inflige 5d8.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-shatter",
    "name": "Añicos",
    "nameEn": "Shatter",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (a chip of mica)",
    "duration": "Instantáneo",
    "description": "Un ruido dolorosamente fuerte y resonante estalla en un punto de tu elección dentro del alcance. Cada criatura en una esfera de 10 pies de radio centrada en ese punto debe realizar una tirada de salvación de Constitución. Una criatura recibe 3d8 de daño de trueno si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-silence",
    "name": "Silencio",
    "nameEn": "Silence",
    "level": 2,
    "school": "Ilusión",
    "castingTime": "1 acción (Ritual)",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas una esfera inmóvil de silencio de 20 pies de radio. Ningún sonido puede crearse ni atravesar el área, impidiendo el lanzamiento de conjuros con componentes verbales.",
    "higherLevels": "",
    "ritual": true,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-skywrite",
    "name": "Escritura Celeste",
    "nameEn": "Skywrite",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "A la vista",
    "components": "V, S",
    "duration": "Concentración, hasta 1 día",
    "description": "Haces que hasta diez palabras aparezcan en el cielo, escritas con nubes blancas que flotan en el aire durante la duración o hasta que un viento fuerte las disperse.",
    "higherLevels": "",
    "ritual": true,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Druida",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-snillocs-snowball-swarm",
    "name": "Enjambre de Bolas de Nieve de Snilloc",
    "nameEn": "Snilloc's Snowball Swarm",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (a piece of ice or a small white rock chip)",
    "duration": "Instantáneo",
    "description": "Una ráfaga de bolas de nieve mágicas estalla en un punto que elijas dentro del alcance. Cada criatura en una esfera de 5 pies de radio centrada en ese punto debe realizar una tirada de salvación de Destreza. Una criatura recibe 3d6 de daño de frío si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-spider-climb",
    "name": "Trepar cual Araña",
    "nameEn": "Spider Climb",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (una gota de betún y una araña)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Hasta que el conjuro termine, una criatura voluntaria que toques obtiene la capacidad de moverse hacia arriba, hacia abajo y a través de superficies verticales o boca abajo a lo largo de techos, dejando sus manos libres y con una velocidad de trepar igual a su velocidad.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-spike-growth",
    "name": "Crecimiento de Espinas",
    "nameEn": "Spike Growth",
    "level": 2,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (siete espinas afiladas)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "El suelo en un radio de 20 pies se cubre de espinas y zarzas duras. El área se convierte en terreno difícil y camuflado. Cualquier criatura que se mueva en el área sufre 2d4 de daño perforante por cada 5 pies que recorra.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-spray-of-cards",
    "name": "Ráfaga de Cartas",
    "nameEn": "Spray Of Cards",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 15 pies)",
    "components": "V, S, M (a deck of cards)",
    "duration": "Instantáneo",
    "description": "Ciegas o cortas a tus enemigos desatando una lluvia de cartas ilusorias en un cono de 15 pies. Cada criatura en el cono debe superar una tirada de salvación de Destreza o recibir 2d10 de daño cortante o quedar cegada hasta el final de su siguiente turno.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, el daño aumenta en 1d10 por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "The Book of Many Things"
  },
  {
    "id": "spl-suggestion",
    "name": "Sugestión",
    "nameEn": "Suggestion",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, M (a snake’s tongue and either a bit of honeycomb or a drop of sweet oil)",
    "duration": "Concentración, hasta 8 horas",
    "description": "Sugieres un curso de actividad (limitado a una frase o dos) e influyes mágicamente en una criatura dentro del alcance que pueda escucharte y entenderte. Debe superar una tirada de salvación de Sabiduría o seguir el curso de acción que describiste según sus mejores capacidades durante la duración.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-summon-beast",
    "name": "Invocar Bestia",
    "nameEn": "Summon Beast",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (una pluma, tuft of fur, and fish tail inside a gilded acorn que valga al menos 200 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas un espíritu bestial que asume una forma corpórea en un espacio desocupado que puedas ver dentro del alcance. Elige entre tierra, aire o agua para su tipo de movimiento y estadísticas. La bestia es amigable contigo y tus compañeros y actúa en su propio turno inmediatamente después del tuyo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, usa el nivel superior para el perfil de estadísticas de la bestia invocada.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-tashas-mind-whip",
    "name": "Látigo Mental de Tasha",
    "nameEn": "Tasha's Mind Whip",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V",
    "duration": "1 asalto",
    "description": "Lanzas un látigo de energía psíquica a la mente de una criatura que puedas ver dentro del alcance. El objetivo debe realizar una tirada de salvación de Inteligencia. Si falla la salvación, recibe 3d6 de daño psíquico y en su siguiente turno solo puede realizar una acción, una acción adicional o moverse (debe elegir una de las tres) y no puede realizar reacciones.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 3 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-vortex-warp",
    "name": "Deformación del Vórtice",
    "nameEn": "Vortex Warp",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Deformas el espacio alrededor de una criatura que puedas ver. Debe superar una salvación de Constitución (puede fallar voluntariamente) o será teletransportada mágicamente a un espacio desocupado que puedas ver a hasta 90 pies de ti sobre una superficie que pueda sostenerla.",
    "higherLevels": "El alcance aumenta en 30 pies por cada nivel de ranura por encima de 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Strixhaven: A Curriculum of Chaos"
  },
  {
    "id": "spl-warding-bond",
    "name": "Vínculo Protector",
    "nameEn": "Warding Bond",
    "level": 2,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un par de anillos de platino por valor de 50 po cada uno)",
    "duration": "1 hora",
    "description": "Tocas a otra criatura voluntaria creando un vínculo místico. Mientras permanezca a 60 pies de ti, gana un bonificador de +1 a la CA y a las tiradas de salvación, y tiene resistencia a todo el daño. Cada vez que reciba daño, tú sufres la misma cantidad de daño.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-warding-wind",
    "name": "Viento Custodio",
    "nameEn": "Warding Wind",
    "level": 2,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Un viento fuerte azota a tu alrededor en un radio de 10 pies y se mueve contigo, centrado en ti. El viento ensordece a otras criaturas en el área, extingue llamas no protegidas, crea terreno difícil para otras criaturas y causa desventaja en las tiradas de ataque de armas a distancia que pasen a través de él.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-warp-sense",
    "name": "Sentido de Distorsión",
    "nameEn": "Warp Sense",
    "level": 2,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (a razorvine leaf)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Sientes las perturbaciones en el espacio y la magia en un radio de 30 pies de ti. Durante la duración, puedes detectar instantáneamente la presencia y ubicación de cualquier teletransportación, portal planar o rasgadura dimensional que ocurra dentro del área.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Planescape - Adventures in the Multiverse"
  },
  {
    "id": "spl-web",
    "name": "Telaraña",
    "nameEn": "Web",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (a bit of spiderweb)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas una masa de telarañas gruesas y pegajosas en un punto de tu elección dentro del alcance. Las telarañas llenan un cubo de 20 pies a partir de ese punto durante la duración. Las telarañas son terreno difícil y oscurecen ligeramente su área. Cualquier criatura que comience su turno en las telarañas o que entre en ellas durante su turno debe superar una tirada de salvación de Destreza o quedar apresada.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wither-and-bloom",
    "name": "Marchitar y Florecer",
    "nameEn": "Wither and Bloom",
    "level": 2,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un pétalo marchito)",
    "duration": "Instantáneo",
    "description": "Invocas la energía de la vida y la muerte en una esfera de 10 pies de radio. Cada criatura a tu elección en el área debe superar una salvación de Constitución o sufrir 2d6 de daño necrótico. Además, una criatura de tu elección en el área puede gastar 1 dado de golpe para recuperar puntos de golpe iguales a la tirada + tu modificador de aptitud mágica.",
    "higherLevels": "El daño aumenta en 1d6 y los dados de golpe que se pueden gastar aumentan en 1 por cada nivel por encima de 2.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Strixhaven: A Curriculum of Chaos"
  },
  {
    "id": "spl-wristpocket",
    "name": "Bolsillo en la Muñeca",
    "nameEn": "Wristpocket",
    "level": 2,
    "school": "Conjuración",
    "castingTime": "1 acción (Ritual)",
    "range": "Personal",
    "components": "S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Dunamancia: Haces que un objeto de no más de 5 libras que sostengas desaparezca en una dimensión de bolsillo en tu muñeca. Puedes invocarlo o guardarlo como acción adicional.",
    "higherLevels": "",
    "ritual": true,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-zone-of-truth",
    "name": "Zona de la Verdad",
    "nameEn": "Zone of Truth",
    "level": 2,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "10 minutos",
    "description": "Creas una zona mágica de 15 pies de radio que protege contra el engaño. Las criaturas que fallen una salvación de Carisma no pueden decir una mentira deliberada mientras estén dentro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-animate-dead",
    "name": "Animar a los Muertos",
    "nameEn": "Animate Dead",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 minuto",
    "range": "10 pies",
    "components": "V, S, M (una gota de sangre, a piece of flesh, and a pinch of bone dust)",
    "duration": "Instantáneo",
    "description": "Este conjuro crea un servidor no muerto. Elige una pila de huesos o el cadáver de un humanoide Mediano o Pequeño dentro del alcance. Tu conjuro infunde al objetivo con una imitación profana de vida, alzándolo como una criatura no muerta: un esqueleto si elegiste huesos o un zombi si elegiste un cadáver.\n\nEn cada uno de tus turnos, puedes usar una acción adicional para ordenar mentalmente a cualquier criatura que hayas creado con este conjuro si está a 60 pies o menos de ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, animas o reafirmas el control sobre dos criaturas no muertas adicionales por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-antagonize",
    "name": "Antagonizar",
    "nameEn": "Antagonize",
    "level": 3,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a playing card depicting a rogue)",
    "duration": "Instantáneo",
    "description": "Susurras palabras mágicas que provocan una ira incontrolable en una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Sabiduría o recibir 4d4 de daño psíquico y verse obligado a usar su reacción para realizar un ataque cuerpo a cuerpo contra una criatura cercana elegida por ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d4 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "The Book of Many Things"
  },
  {
    "id": "spl-ashardalons-stride",
    "name": "Zancada de Ashardalon",
    "nameEn": "Ashardalon's Stride",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V,S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La energía de fuego de Ashardalon acelera tus pasos. Tu velocidad aumenta en 20 pies durante la duración, y moverte no provoca ataques de oportunidad. Cuando te mueves a 5 pies o menos de una criatura u objeto inflamable, recibe 1d6 de daño de fuego.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, tu velocidad aumenta en 5 pies adicionales y el daño de fuego aumenta en 1d6 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-aura-of-vitality",
    "name": "Aura de Vitalidad",
    "nameEn": "Aura of Vitality",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 30 pies)",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La energía sanadora emana de ti en un aura de 30 pies de radio. Hasta que el conjuro termine, el aura se mueve contigo, centrada en ti. Puedes usar una acción adicional para hacer que una criatura en el aura (incluyéndote a ti) recupere 2d6 puntos de golpe.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-beacon-of-hope",
    "name": "Faro de Esperanza",
    "nameEn": "Beacon of Hope",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Este conjuro otorga esperanza y vitalidad. Cada criatura a tu elección en el alcance tiene ventaja en salvaciones de Sabiduría y de muerte, y cualquier curación que reciba restaura la cantidad máxima de puntos de golpe posible.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-bestow-curse",
    "name": "Maldecir",
    "nameEn": "Bestow Curse",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tocas a una criatura y debe superar una tirada de salvación de Sabiduría o quedar maldita durante la duración del conjuro. Al lanzar el conjuro, eliges la naturaleza de la maldición: desventaja en pruebas y salvaciones de una característica, desventaja en ataques contra ti, desperdiciar turnos con una salvación de Sabiduría fallida, o recibir 1d8 de daño necrótico adicional cada vez que le inflijas daño.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, la duración aumenta: nivel 4 (10 minutos), nivel 5 (8 horas), nivel 7 (24 horas), nivel 9 (hasta ser disipado sin concentración).",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blinding-smite",
    "name": "Castigo Cegador",
    "nameEn": "Blinding Smite",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque de arma cuerpo a cuerpo durante la duración del conjuro, tu arma resplandece con un brillo cegador. El ataque inflige 3d8 de daño radiante adicional al objetivo y este debe superar una tirada de salvación de Constitución o quedar cegado hasta que el conjuro termine.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blink",
    "name": "Parpadeo",
    "nameEn": "Blink",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S",
    "duration": "1 minuto",
    "description": "Tiras un d20 al final de cada uno de tus turnos. Con un resultado de 11 o superior, te desvaneces en el Plano Etéreo hasta el comienzo de tu siguiente turno, siendo inmune a todo daño e interacción física.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-call-lightning",
    "name": "Convocar Relámpagos",
    "nameEn": "Call Lightning",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una nube de tormenta aparece sobre ti. Como acción al lanzarlo y en cada uno de tus turnos, puedes hacer que caiga un rayo sobre un punto visible. Cada criatura a 5 pies debe superar una salvación de Destreza o sufrir 3d10 de daño de relámpago.",
    "higherLevels": "El daño aumenta en 1d10 por cada espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-catnap",
    "name": "Siesta Reparadora",
    "nameEn": "Catnap",
    "level": 3,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "S, M (una pizca de arena)",
    "duration": "10 minutos",
    "description": "Haces un gesto apaciguador y hasta tres criaturas voluntarias que puedas ver dentro del alcance caen inconscientes en un sueño reparador durante 10 minutos. Si una criatura permanece dormida durante toda la duración, obtiene todos los beneficios de un descanso corto.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, puedes elegir como objetivo a una criatura voluntaria adicional por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-clairvoyance",
    "name": "Clarividencia",
    "nameEn": "Clairvoyance",
    "level": 3,
    "school": "Adivinación",
    "castingTime": "10 minutos",
    "range": "1 milla",
    "components": "V, S, M (a focus que valga al menos 100 po, either a jeweled horn for hearing or a glass eye for seeing)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas un sensor invisible dentro del alcance en una ubicación que te sea familiar o en una ubicación obvia desconocida. El sensor puede ser visual o auditivo. Durante la duración del conjuro, puedes usar los sentidos del sensor como si estuvieras en ese espacio.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-animals",
    "name": "Conjurar Animales",
    "nameEn": "Conjure Animals",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas espíritus feéricos que toman la forma de bestias que obedecen tus órdenes. Puedes conjurar una bestia de VD 2, dos de VD 1, cuatro de VD 1/2 o hasta ocho bestias de VD 1/4.",
    "higherLevels": "Cuando lanzas este conjuro usando ciertos espacios de conjuro de nivel superior, eliges una de las opciones de invocación y aparecen más criaturas: el doble con un espacio de nivel 5, el triple con un espacio de nivel 7 y cuatro veces más con un espacio de nivel 9.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-barrage",
    "name": "Conjurar Salva",
    "nameEn": "Conjure Barrage",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 60 pies)",
    "components": "V, S, M (one piece of ammunition or a thrown weapon)",
    "duration": "Instantáneo",
    "description": "Lanzas un arma arrojadiza o disparas una pieza de munición al aire para crear un cono de réplicas idénticas que llueven sobre tus enemigos. Cada criatura en un cono de 60 pies debe realizar una tirada de salvación de Destreza. Una criatura recibe 3d8 de daño si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-counterspell",
    "name": "Contrahechizo",
    "nameEn": "Counterspell",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 reacción, cuando ves a una criatura a 60 pies de ti lanzando un conjuro",
    "range": "60 pies",
    "components": "S",
    "duration": "Instantáneo",
    "description": "Intentas interrumpir a una criatura en el proceso de lanzar un conjuro. Si la criatura está lanzando un conjuro de nivel 3 o inferior, su conjuro falla y no tiene efecto. Si está lanzando un conjuro de nivel 4 o superior, haz una prueba de característica usando tu característica para el lanzamiento de conjuros. La CD es igual a 10 + el nivel del conjuro. Si tienes éxito, el conjuro de la criatura falla y no tiene efecto.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el conjuro interrumpido falla sin prueba si su nivel es menor o igual al nivel del espacio de conjuro que usaste.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-create-food-and-water",
    "name": "Crear Comida y Agua",
    "nameEn": "Create Food and Water",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Creas 45 libras de comida nutritiva y 30 galones de agua en el suelo o en recipientes dentro del alcance, suficiente para sustentar a hasta quince humanoides o cinco cabalgaduras durante 24 horas. La comida es blanda pero nutritiva y se echa a perder después de 24 horas si no se consume.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-crusaders-mantle",
    "name": "Manto del Cruzado",
    "nameEn": "Crusader's Mantle",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Poder divino irradia de ti en un aura de 30 pies de radio. Hasta que el conjuro termine, el aura se mueve contigo, centrada en ti. Cada criatura no hostil en el aura (incluyéndote a ti) inflige 1d4 de daño radiante adicional cuando impacta con un ataque de arma.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-daylight",
    "name": "Luz del Día",
    "nameEn": "Daylight",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Una esfera de luz brillante de 60 pies de radio se propaga desde un punto que elijas dentro del alcance. La esfera emite luz brillante durante 60 pies y luz tenue durante 60 pies adicionales. Si el punto elegido es un objeto que sostienes o que no esté siendo llevado puesto ni transportado por otra criatura, la luz emana del objeto y se mueve con él.\n\nSi alguna parte del área de este conjuro se superpone con un área de oscuridad creada por un conjuro de nivel 3 o inferior, el conjuro de oscuridad queda disipado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador",
      "Hechicero"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dispel-magic",
    "name": "Disipar Magia",
    "nameEn": "Dispel Magic",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Eliges una criatura, objeto o efecto mágico dentro del alcance. Cualquier conjuro de nivel 3 o inferior sobre el objetivo termina. Para cada conjuro de nivel 4 o superior sobre el objetivo, haz una prueba de característica usando tu característica para el lanzamiento de conjuros. La CD es igual a 10 + el nivel del conjuro. Con una prueba exitosa, el conjuro termina.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, terminas automáticamente los efectos de un conjuro sobre el objetivo si el nivel del conjuro es menor o igual al nivel del espacio de conjuro que usaste.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-elemental-weapon",
    "name": "Arma Elemental",
    "nameEn": "Elemental Weapon",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas un arma no mágica. Hasta que el conjuro termine, esa arma se convierte en un arma mágica con un bonificador de +1 a las tiradas de ataque y causa 1d4 de daño adicional del tipo elegido (ácido, frío, fuego, relámpago o trueno) al impactar.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o 6, el bonificador a las tiradas de ataque aumenta a +2 y el daño elemental a 2d4. Cuando usas un espacio de nivel 7 o superior, el bonificador aumenta a +3 y el daño a 3d4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Druida",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-enemies-abound",
    "name": "Enemigos por Doquier",
    "nameEn": "Enemies Abound",
    "level": 3,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Alcanzas la mente de una criatura que puedas ver dentro del alcance y la obligas a realizar una tirada de salvación de Inteligencia. Si falla la salvación, el objetivo pierde la capacidad de distinguir a amigos de enemigos, considerando a todas las criaturas que pueda ver como enemigos potenciales. Siempre que el objetivo elija a una criatura para un ataque, conjuro u otra acción hostil, debe elegir al objetivo al azar entre todas las criaturas que pueda ver a su alcance.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-erupting-earth",
    "name": "Tierra Erupcionante",
    "nameEn": "Erupting Earth",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (a piece of obsidian)",
    "duration": "Instantáneo",
    "description": "Eliges un punto que puedas ver en el suelo dentro del alcance. Una fuente de tierra batida y piedra estalla en un cubo de 20 pies centrado en ese punto. Cada criatura en esa área debe realizar una tirada de salvación de Destreza. Una criatura recibe 3d12 de daño contundente si falla la salvación, o la mitad de daño si tiene éxito. Además, el suelo en esa área se convierte en terreno difícil hasta que sea despejado.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d12 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything/Elemental Evil Player's Companion"
  },
  {
    "id": "spl-fast-friends",
    "name": "Amigos Rápidos",
    "nameEn": "Fast Friends",
    "level": 3,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 hora",
    "description": "Al elegir a un humanoide dentro del alcance e intentar encandilarlo con tus palabras, debe superar una tirada de salvación de Sabiduría o considerarte un amigo cercano durante la duración. La criatura está encantada y dispuesta a realizar tareas sencillas para ti mientras no le causen daño obvio.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-fear",
    "name": "Miedo",
    "nameEn": "Fear",
    "level": 3,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Cono de 30 pies",
    "components": "V, S, M (el corazón de una gallina)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Proyectas una imagen fantasmal de los peores terrores de tus enemigos. Toda criatura en el cono debe superar una salvación de Sabiduría o soltar todo lo que sostenga y quedar asustada, huyendo de ti en cada uno de sus turnos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-feign-death",
    "name": "Fingir Muerte",
    "nameEn": "Feign Death",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (a pinch of graveyard dirt)",
    "duration": "1 hora",
    "description": "Tocas a una criatura voluntaria y la pones en un estado cataléptico indistinguible de la muerte real. Durante la duración del conjuro, o hasta que uses tu acción para tocar al objetivo y terminarlo, la criatura parece muerta para todas las inspecciones y conjuros de adivinación. La criatura está cegada e incapacitada, y su velocidad se reduce a 0 pies. Además, obtiene resistencia a todo daño excepto el psíquico.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-fireball",
    "name": "Bola de Fuego",
    "nameEn": "Fireball",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (una pequeña bola de guano de murciélago y azufre)",
    "duration": "Instantáneo",
    "description": "Un brillante haz de luz surge de tu dedo índice hacia un punto que elijas dentro del alcance, y luego estalla con un leve estruendo en una explosión de llamas. Cada criatura en una esfera de 20 pies de radio centrada en ese punto debe realizar una tirada de salvación de Destreza. Un objetivo recibe 8d6 de daño de fuego si falla la salvación, o la mitad de daño si tiene éxito.\n\nEl fuego se propaga doblando esquinas e inflama los objetos inflamables del área que no se lleven puestos ni se transporten.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-flame-arrows",
    "name": "Flechas Llameantes",
    "nameEn": "Flame Arrows",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas un carcaj que contenga flechas o virotes. Cuando un objetivo es alcanzado por un ataque a distancia con una munición de ese carcaj, la munición inflige 1d6 de daño de fuego adicional. La magia del conjuro termina en una pieza de munición después de que sea disparada, y el conjuro termina una vez que se hayan disparado doce piezas de munición o cuando termine la duración.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, la cantidad de piezas de munición afectadas aumenta en dos por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-fly",
    "name": "Volar",
    "nameEn": "Fly",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (pluma de ala de un pájaro)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Tocas a una criatura voluntaria. Obtiene una velocidad de vuelo de 60 pies durante la duración del conjuro. Cuando el conjuro termina, el objetivo cae si todavía está en el aire, a menos que pueda detener la caída.",
    "higherLevels": "Puedes afectar a una criatura adicional por cada nivel de ranura por encima de 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-galders-tower",
    "name": "Torre de Galder",
    "nameEn": "Galder's Tower",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "10 minutos",
    "range": "30 pies",
    "components": "V, S, M (a fragment of stone, wood, or other building material)",
    "duration": "24 horas",
    "description": "Convocas mágicamente una torre de piedra de dos pisos en un espacio desocupado en el suelo dentro del alcance. La torre tiene 10 pies de lado y 20 pies de alto, con una puerta de piedra en la planta baja. Cada piso está amueblado a tu elección: un dormitorio acogedor, un comedor, un estudio o una pequeña armería.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, la torre puede tener un piso adicional por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Lost Laboratory of Kwalish"
  },
  {
    "id": "spl-gaseous-form",
    "name": "Forma Gaseosa",
    "nameEn": "Gaseous Form",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (a bit of gauze and a wisp of smoke)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Transformas a una criatura voluntaria que toques, junto con todo lo que lleve puesto y transporte, en una nube de niebla brumosa durante la duración. Mientras esté en esta forma, la criatura tiene una velocidad de vuelo de 10 pies, resistencia al daño no mágico de armas y ventaja en tiradas de salvación de Fuerza, Destreza y Constitución. Puede pasar a través de pequeños agujeros y grietas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-glyph-of-warding",
    "name": "Glifo Custodio",
    "nameEn": "Glyph of Warding",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (incense and powdered diamond que valga al menos 200 po, que el conjuro consume)",
    "duration": "Hasta disiparse o activarse",
    "description": "Inscribes un glifo que daña a otras criaturas, sobre una superficie o dentro de un objeto que pueda cerrarse. Cuando inscribes el glifo, eliges glifo explosivo o glifo de conjuro. Si eliges glifo explosivo, cuando se activa, estalla en una esfera de 20 pies de radio de daño elemental (5d8 de daño). Si eliges glifo de conjuro, almacenas un conjuro preparado de nivel 3 o menor para que se lance sobre la criatura que lo active.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño de un glifo explosivo aumenta en 1d8 por cada nivel de espacio por encima de nivel 3, o el nivel del conjuro almacenado puede ser igual al nivel del espacio usado.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-haste",
    "name": "Aceleración",
    "nameEn": "Haste",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a shaving of licorice root)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges una criatura voluntaria que puedas ver dentro del alcance. Hasta que el conjuro termine, la velocidad del objetivo se duplica, obtiene un bonificador de +2 a la CA, tiene ventaja en tiradas de salvación de Destreza y obtiene una acción adicional en cada uno de sus turnos (que puede usarse solo para Atacar [un solo ataque], Correr, Retirarse, Esquivar o Usar un Objeto).\n\nCuando el conjuro termina, el objetivo queda aletargado y no puede moverse ni realizar acciones hasta después de su siguiente turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hunger-of-hadar",
    "name": "Hambre de Hadar",
    "nameEn": "Hunger Of Hadar",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (un tentáculo de pulpo)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Abres una puerta al vacío del espacio exterior en una esfera de 20 pies de radio. El área es de oscuridad mágica e inflige 2d6 de daño de frío a toda criatura que comience su turno allí, más 2d6 de daño de ácido si falla una salvación de Destreza al terminar su turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hypnotic-pattern",
    "name": "Patrón Hipnótico",
    "nameEn": "Hypnotic Pattern",
    "level": 3,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "S, M (a glowing stick of incense or a crystal vial filled with phosphorescent material)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas un patrón retorcido de colores brillantes que teje a través del aire dentro de un cubo de 30 pies dentro del alcance. Cada criatura en el área que vea el patrón debe realizar una tirada de salvación de Sabiduría. Si falla la salvación, la criatura queda hechizada durante la duración. Mientras esté hechizada por este conjuro, la criatura está incapacitada y su velocidad se reduce a 0 pies. El conjuro termina para una criatura afectada si recibe cualquier daño o si alguien usa una acción para sacudirla y despertarla de su estupor.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-incite-greed",
    "name": "Incitar a la Codicia",
    "nameEn": "Incite Greed",
    "level": 3,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a gem que valga al menos 50 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Sostienes una gema reluciente y exiges la codicia de tus enemigos. Cada criatura de tu elección a 30 pies o menos de ti que pueda ver la gema debe superar una tirada de salvación de Sabiduría o quedar hechizada por ti. Mientras esté hechizada, debe usar su movimiento en cada turno para acercarse a la gema por la ruta más corta y no puede realizar acciones excepto mirar la gema.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-intellect-fortress",
    "name": "Fortaleza Intelectual",
    "nameEn": "Intellect Fortress",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 hora",
    "description": "Forjas una barrera de energía psíquica para blindar la mente de una criatura voluntaria. Tiene resistencia al daño psíquico y ventaja en tiradas de salvación de Inteligencia, Sabiduría y Carisma.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, puedes tener como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 3. Las criaturas deben estar a 30 pies o menos entre sí cuando las eliges como objetivo.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-leomunds-tiny-hut",
    "name": "Choza Diminuta de Leomund",
    "nameEn": "Leomund's Tiny Hut",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 minuto",
    "range": "Lanzador (hemisferio de 10 pies de radio)",
    "components": "V, S, M (a small crystal bead)",
    "duration": "8 horas",
    "description": "Una cúpula inmóvil y opaca de fuerza de 10 pies de radio brota a tu alrededor y sobre ti, y permanece inmóvil durante la duración. El conjuro termina si sales del área.\n\nHasta nueve criaturas de tamaño Mediano o menor pueden caber dentro de la cúpula contigo. La atmósfera dentro del espacio es cómoda y seca, independientemente del clima exterior. La cúpula es opaca desde el exterior pero transparente desde el interior.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-life-transference",
    "name": "Transferencia de Vida",
    "nameEn": "Life Transference",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Sacrificas parte de tu propia salud para reparar las heridas de otra criatura. Recibes 4d8 de daño necrótico, el cual no puede reducirse ni evitarse de ninguna manera. Una criatura de tu elección que puedas ver a 30 pies o menos de ti recupera una cantidad de puntos de golpe igual al doble del daño necrótico que recibiste.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-lightning-arrow",
    "name": "Flecha Relampagueante",
    "nameEn": "Lightning Arrow",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que realices un ataque con un arma a distancia durante la duración del conjuro, la munición del arma se transforma en un rayo de relámpago. Haz la tirada de ataque normalmente. El objetivo recibe 4d8 de daño de relámpago si impactas, o la mitad de daño si fallas. Ya sea que impactes o falles, cada criatura a 10 pies o menos del objetivo debe realizar una tirada de salvación de Destreza, recibiendo 2d8 de daño de relámpago si falla, o la mitad si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño de ambos efectos aumenta en 1d8 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-lightning-bolt",
    "name": "Relámpago",
    "nameEn": "Lightning Bolt",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (línea de 100 pies)",
    "components": "V, S, M (a bit of fur and a rod of amber, crystal, or glass)",
    "duration": "Instantáneo",
    "description": "Un relámpago fulgurante formando una línea de 100 pies de largo y 5 pies de ancho emana de ti en la dirección que elijas. Cada criatura en la línea debe realizar una tirada de salvación de Destreza. Una criatura recibe 8d6 de daño de relámpago si falla la salvación, o la mitad de daño si tiene éxito.\n\nEl relámpago prende fuego a los objetos inflamables del área que no se lleven puestos ni se transporten.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d6 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-magic-circle",
    "name": "Círculo Mágico",
    "nameEn": "Magic Circle",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 minuto",
    "range": "10 pies",
    "components": "V, S, M (agua bendita or powdered silver and iron que valga al menos 100 po, que el conjuro consume)",
    "duration": "1 hora",
    "description": "Creas un cilindro de energía mágica de 10 pies de radio y 20 pies de alto centrado en un punto en el suelo dentro del alcance. Al lanzar el conjuro, eliges uno o más tipos de criaturas: celestiales, elementales, hadas, infernales o muertos vivientes. Las criaturas del tipo elegido no pueden entrar voluntariamente al cilindro por medios no mágicos y tienen desventaja en las tiradas de ataque contra objetivos dentro del cilindro.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, la duración aumenta en 1 hora por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-major-image",
    "name": "Imagen Mayor",
    "nameEn": "Major Image",
    "level": 3,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un poco de vellón)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas la imagen de un objeto, una criatura o algún otro fenómeno visible que no sea mayor que un cubo de 20 pies. La imagen parece completamente real, incluyendo sonidos, olores y temperatura apropiados para la cosa representada.\n\nComo una acción, puedes mover la imagen a cualquier punto dentro del alcance. La interacción física revela que es una ilusión, ya que las cosas pueden atravesarla. Una criatura que use su acción para examinar la imagen puede determinar que es una ilusión con una prueba exitosa de Inteligencia (Investigación) contra tu CD de conjuros.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el conjuro dura hasta ser disipado, sin requerir concentración.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mass-healing-word",
    "name": "Palabra de Curación en Masa",
    "nameEn": "Mass Healing Word",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Pronuncias palabras de consuelo sagrado. Hasta 6 criaturas a tu elección dentro del alcance recuperan 1d4 + tu modificador de lanzamiento puntos de golpe.",
    "higherLevels": "La curación aumenta en 1d4 por cada espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-meld-into-stone",
    "name": "Fundirse con la Piedra",
    "nameEn": "Meld into Stone",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "8 horas",
    "description": "Entras en un objeto de piedra o superficie lo suficientemente grande como para contener completamente tu cuerpo, fundiéndote a ti y a todo tu equipo en la piedra durante la duración. Mientras estés fundido con la piedra, no puedes ver lo que ocurre fuera de ella, pero puedes escuchar sonidos normales. El conjuro termina si sales de la piedra o si la superficie es destruida.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-melfs-minute-meteors",
    "name": "Meteoros Diminutos de Melf",
    "nameEn": "Melf's Minute Meteors",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (niter, sulfur, and pine tar formed into a bead)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas hasta seis meteoros diminutos que flotan en tu espacio hasta que el conjuro termine. Cuando lanzas el conjuro, y como una acción adicional en cada uno de tus turnos posteriores, puedes gastar uno o dos meteoros arrojándolos a un punto dentro de 120 pies. Cada criatura a 5 pies o menos del punto de impacto debe superar una tirada de salvación de Destreza o recibir 2d6 de daño de fuego.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, la cantidad de meteoros creados aumenta en dos por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-motivational-speech",
    "name": "Discurso Motivador",
    "nameEn": "Motivational Speech",
    "level": 3,
    "school": "Encantamiento",
    "castingTime": "1 minuto",
    "range": "60 pies",
    "components": "V",
    "duration": "1 hora",
    "description": "Pronuncias un discurso inspirador durante 1 minuto a hasta cinco criaturas voluntarias dentro del alcance. Cada criatura que te escuche obtiene 5 puntos de golpe temporales y ventaja en tiradas de salvación de Sabiduría durante 1 hora.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, los puntos de golpe temporales aumentan en 5 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Acquisitions Inc."
  },
  {
    "id": "spl-nondetection",
    "name": "Indetectabilidad",
    "nameEn": "Nondetection",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (a pinch of diamond dust por valor de 25 po sprinkled over the target, que el conjuro consume)",
    "duration": "8 horas",
    "description": "Durante la duración, ocultas a un objetivo que toques de la magia de adivinación. El objetivo puede ser una criatura voluntaria, un lugar o un objeto que no mida más de 10 pies en ninguna dimensión. El objetivo no puede ser percibido a través de sensores mágicos de adivinación ni ser localizado por conjuros de adivinación.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Explorador",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-phantom-steed",
    "name": "Corcel Fantasma",
    "nameEn": "Phantom Steed",
    "level": 3,
    "school": "Ilusión",
    "castingTime": "1 minuto",
    "range": "30 pies",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Una criatura grande y cuasi real que se asemeja a un caballo aparece en el suelo en un espacio desocupado dentro del alcance. La criatura tiene una velocidad de 100 pies y puede viajar 10 millas en una hora, o 13 millas a galope rápido. Cuando el conjuro termina, el corcel se desvanece gradualmente.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-plant-growth",
    "name": "Crecimiento Vegetal",
    "nameEn": "Plant Growth",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción u 8 horas",
    "range": "150 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Este conjuro canaliza vitalidad hacia las plantas dentro de un área específica. Si lo lanzas durante 1 acción, todas las plantas normales en un radio de 100 pies centrado en un punto dentro del alcance se vuelven gruesas y frondosas; una criatura que se mueva a través del área debe gastar 4 pies de movimiento por cada 1 pie que avance.\n\nSi lanzas este conjuro durante 8 horas, enriqueces la tierra, duplicando el rendimiento de todas las cosechas en un radio de media milla durante el próximo año.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-protection-from-energy",
    "name": "Protección contra la Energía",
    "nameEn": "Protection from Energy",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Durante la duración, la criatura voluntaria que toques tiene resistencia a un tipo de daño de tu elección: ácido, frío, fuego, relámpago o trueno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-pulse-wave",
    "name": "Ola de Pulso",
    "nameEn": "Pulse Wave",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 30 pies)",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Creas una intensa presión y la desatas en un cono de 30 pies, decidiendo si la presión empuja o jala a las criaturas y objetos. Cada criatura en ese cono debe realizar una tirada de salvación de Constitución. Una criatura recibe 6d6 de daño de fuerza si falla la salvación, o la mitad de daño si tiene éxito, y toda criatura que falle es jalada 15 pies hacia ti o empujada 15 pies lejos de ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d6 y la distancia de empuje o tirón aumenta en 5 pies por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-remove-curse",
    "name": "Quitar Maldición",
    "nameEn": "Remove Curse",
    "level": 3,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "A tu toque, todas las maldiciones que afectan a una criatura u objeto terminan. Si el objeto es un objeto mágico maldito, su maldición permanece, pero el conjuro rompe la sintonización del portador con él para que pueda quitárselo o descartarlo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-revivify",
    "name": "Revivir al Caído",
    "nameEn": "Revivify",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (diamantes por valor de 300 po)",
    "duration": "Instantáneo",
    "description": "Tocas a una criatura que haya muerto dentro del último minuto. Esa criatura vuelve a la vida con 1 punto de golpe. Este conjuro no puede devolver a la vida a criaturas que hayan muerto de vejez ni restaurar partes del cuerpo perdidas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-sending",
    "name": "Enviar Mensaje",
    "nameEn": "Sending",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Ilimitado",
    "components": "V, S, M (a short piece of fine copper wire)",
    "duration": "1 asalto",
    "description": "Envías un mensaje corto de 25 palabras o menos a una criatura con la que estés familiarizado. La criatura escucha el mensaje en su mente, reconoce que proviene de ti si te conoce, y puede responder de inmediato con un mensaje similar de hasta 25 palabras. El conjuro permite a las criaturas entender el significado de tu mensaje sin importar el idioma.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-sleet-storm",
    "name": "Tormenta de Aguanieve",
    "nameEn": "Sleet Storm",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (una pizca de polvo y unas gotas de agua)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Lluvia gélida y aguanieve caen en un cilindro de 40 pies de radio y 20 pies de alto centrado en un punto dentro del alcance. El área está fuertemente oscurecida, las llamas expuestas se extinguen y el suelo se convierte en hielo resbaladizo (terreno difícil). Una criatura que entra en el área o comienza su turno allí debe superar una tirada de salvación de Destreza o caer derribada.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-slow",
    "name": "Ralentizar",
    "nameEn": "Slow",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (una gota de melaza)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Alteras el tiempo alrededor de hasta seis criaturas de tu elección en un cubo de 40 pies dentro del alcance. Cada objetivo debe superar una tirada de salvación de Sabiduría o ser afectado por este conjuro durante la duración. La velocidad de un objetivo afectado se reduce a la mitad, sufre una penalización de -2 a la CA y a las tiradas de salvación de Destreza, y no puede usar reacciones.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-speak-with-dead",
    "name": "Hablar con los Muertos",
    "nameEn": "Speak with Dead",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V, S, M (burning incense)",
    "duration": "10 minutos",
    "description": "Concedes una apariencia de vida e intelecto a un cadáver de tu elección dentro del alcance, permitiéndole responder a preguntas que le formules. El cadáver debe tener aún una boca y no puede ser un muerto viviente. El conjuro falla si el cadáver ya ha sido objeto de este conjuro en los últimos 10 días.\n\nPuedes hacerle al cadáver hasta cinco preguntas. El cadáver sabe solo lo que sabía en vida, incluyendo los idiomas que hablaba.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-speak-with-plants",
    "name": "Hablar con las Plantas",
    "nameEn": "Speak with Plants",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 30 pies)",
    "components": "V, S",
    "duration": "10 minutos",
    "description": "Infundes a las plantas dentro de un radio de 30 pies de ti con consciencia limitada y animación, permitiéndoles comunicarse contigo y responder a tus peticiones simples. Puedes preguntar a las plantas sobre eventos en el área durante el último día, obteniendo información sobre criaturas que pasaron, clima y otros acontecimientos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-spirit-shroud",
    "name": "Sudario Espiritual",
    "nameEn": "Spirit Shroud",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Invocas espíritus de los muertos para que vuelen a tu alrededor durante la duración del conjuro. Mientras el conjuro esté activo, cualquier ataque que realices inflige 1d8 de daño adicional cuando impactas a una criatura a 10 pies o menos de ti (radiante, necrótico o frío a tu elección). Cualquier criatura que reciba este daño no puede recuperar puntos de golpe hasta el inicio de tu siguiente turno.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d8 por cada dos niveles de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-stinking-cloud",
    "name": "Nube Apestosa",
    "nameEn": "Stinking Cloud",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (a rotten egg or several skunk cabbage leaves)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas una esfera de 20 pies de radio de gas amarillo y nauseabundo centrado en un punto dentro del alcance. La nube se expande doblando esquinas y su área está fuertemente oscurecida. Cada criatura completamente dentro de la nube al inicio de su turno debe realizar una tirada de salvación de Constitución contra veneno. Si falla la salvación, la criatura gasta su acción ese turno tosiendo y tambaleándose.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-summon-fey",
    "name": "Invocar Ser Feérico",
    "nameEn": "Summon Fey",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (a gilded flower que valga al menos 300 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas un espíritu feérico que se manifiesta en un espacio desocupado que puedas ver dentro del alcance. Elige un estado de ánimo: Furioso, Jubiloso o Trágico. El espíritu es un aliado para ti y tus compañeros y obedece tus órdenes verbales en combate, actuando en su propio turno inmediatamente después del tuyo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, usa el nivel superior para las estadísticas del espíritu feérico en su bloque de estadísticas.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-summon-lesser-demons",
    "name": "Invocar Demonios Menores",
    "nameEn": "Summon Lesser Demons",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (a vial of blood from a humanoid killed within the past 24 hours)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Pronuncias palabras oscuras para convocar demonios del Abismo. Tiras en la tabla para determinar qué demonios aparecen: dos demonios de VD 1, cuatro demonios de VD 1/2 u ocho demonios de VD 1/4. Los demonios son hostiles a todas las criaturas, incluyéndote a ti, y atacan a los objetivos más cercanos.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 6 o 7, convocas el doble de demonios. Con un espacio de nivel 8 o 9, convocas el triple de demonios.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-summon-shadowspawn",
    "name": "Invocar Engendro Sombrío",
    "nameEn": "Summon Shadowspawn",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (tears inside a crystal vial que valga al menos 300 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas un espíritu de las sombras que se manifiesta en un espacio desocupado que puedas ver dentro del alcance. Elige una emoción que encarne: Furia, Desesperación o Miedo. El espíritu sombrío es un aliado para ti y tus compañeros y actúa en su propio turno inmediatamente después del tuyo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, usa el nivel superior para el perfil del engendro sombrío.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-summon-undead",
    "name": "Invocar Muerto Viviente",
    "nameEn": "Summon Undead",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (a gilded skull que valga al menos 300 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas un espíritu no muerto que se manifiesta en un espacio desocupado que puedas ver dentro del alcance. Elige una forma corpórea para él: Fantasmal, Putrefacto o Esquelético. El muerto viviente es un aliado para ti y tus compañeros y actúa en su turno inmediatamente después del tuyo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, usa el nivel superior para el perfil del muerto viviente.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-thunder-step",
    "name": "Paso Atronador",
    "nameEn": "Thunder Step",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Te teletransportas hasta 90 pies a un espacio desocupado que puedas ver. Inmediatamente después de desaparecer, un trueno ensordecedor resuena en tu espacio original. Cada criatura a 10 pies o menos del espacio que dejaste debe realizar una tirada de salvación de Constitución. Una criatura recibe 3d10 de daño de trueno si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, el daño aumenta en 1d10 por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-tidal-wave",
    "name": "Ola Gigante",
    "nameEn": "Tidal Wave",
    "level": 3,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (una gota de agua)",
    "duration": "Instantáneo",
    "description": "Convocas una ola gigante de agua que se estrella sobre un área con una longitud de hasta 30 pies, un ancho de hasta 10 pies y una altura de hasta 10 pies. Cada criatura en el área debe realizar una tirada de salvación de Destreza. Una criatura recibe 4d8 de daño contundente y cae derribada si falla la salvación, o recibe la mitad de daño y no cae si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-tiny-servant",
    "name": "Diminuto Sirviente",
    "nameEn": "Tiny Servant",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S",
    "duration": "8 horas",
    "description": "Tocas un objeto diminuto y no mágico, como una taza, una herramienta o un libro, y le otorgas vida temporal como un servidor obediente. El servidor obedece tus órdenes verbales y realiza tareas simples durante la duración.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 4 o superior, puedes animar a dos objetos adicionales por cada nivel de espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-tongues",
    "name": "Lenguas",
    "nameEn": "Tongues",
    "level": 3,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, M (un modelo en miniatura de un zigurat)",
    "duration": "1 hora",
    "description": "Este conjuro otorga a la criatura tocada la capacidad de comprender y hablar cualquier idioma hablado, independientemente de quién lo esté escuchando.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-vampiric-touch",
    "name": "Toque Vampírico",
    "nameEn": "Vampiric Touch",
    "level": 3,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La caricia de tu mano sombría drena la fuerza vital. Haz un ataque de conjuro cuerpo a cuerpo contra una criatura. Si impactas, inflige 3d6 de daño necrótico y recuperas puntos de golpe iguales a la mitad del daño infligido.",
    "higherLevels": "El daño aumenta en 1d6 por cada espacio por encima de nivel 3.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wall-of-sand",
    "name": "Muro de Arena",
    "nameEn": "Wall of Sand",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (a handful of sand)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Conjuras un muro de arena arremolinada en el suelo en un punto que puedas ver dentro del alcance. Puedes hacer que el muro tenga hasta 30 pies de largo, 10 pies de alto y 10 pies de grosor. Bloquea la línea de visión pero no el movimiento; una criatura queda cegada mientras esté en el espacio del muro y debe gastar 3 pies de movimiento por cada 1 pie que avance allí.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-wall-of-water",
    "name": "Muro de Agua",
    "nameEn": "Wall of Water",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una gota de agua)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Conjuras un muro de agua en el suelo en un punto que puedas ver dentro del alcance. Puedes hacer que el muro tenga hasta 30 pies de largo, 10 pies de alto y 1 pie de grosor, o hacer un muro circular de hasta 20 pies de diámetro y 20 pies de alto. Los ataques con armas a distancia que pasan por el muro tienen desventaja, y el daño de fuego se reduce a la mitad.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-water-breathing",
    "name": "Respirar bajo el Agua",
    "nameEn": "Water Breathing",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a short reed or piece of straw)",
    "duration": "24 horas",
    "description": "Este conjuro concede la capacidad de respirar bajo el agua a hasta diez criaturas voluntarias que puedas ver dentro del alcance hasta que el conjuro termine. Las criaturas afectadas retienen también su modo normal de respiración.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-water-walk",
    "name": "Caminar sobre las Aguas",
    "nameEn": "Water Walk",
    "level": 3,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a piece of cork)",
    "duration": "1 hora",
    "description": "Este conjuro concede la capacidad de moverse a través de cualquier superficie líquida (como agua, ácido, barro, nieve o lava) como si fuera tierra firme a hasta diez criaturas voluntarias que puedas ver dentro del alcance hasta que el conjuro termine.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida",
      "Explorador",
      "Hechicero"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wind-wall",
    "name": "Muro de Viento",
    "nameEn": "Wind Wall",
    "level": 3,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un pequeño abanico)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas un muro de viento impetuoso de hasta 50 pies de largo, 15 pies de alto y 1 pie de ancho. Desvía flechas, virotes y gases, e inflige 3d8 de daño contundente a criaturas en el área que fallen una salvación de Fuerza.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-arcane-eye",
    "name": "Ojo Arcano",
    "nameEn": "Arcane Eye",
    "level": 4,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (a bit of bat fur)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Creas un ojo mágico flotante e invisible que envía información visual a tu mente. El ojo tiene visión normal y visión en la oscuridad en un radio de 30 pies. Como una acción, puedes mover el ojo hasta 30 pies en cualquier dirección.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-aura-of-life",
    "name": "Aura de Vida",
    "nameEn": "Aura of Life",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 30 pies)",
    "components": "V",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Energía vitalizadora irradia de ti en un aura de 30 pies de radio. Hasta que el conjuro termine, el aura se mueve contigo, centrada en ti. Cada criatura no hostil en el aura (incluyéndote a ti) tiene resistencia al daño necrótico, y sus puntos de golpe máximos no pueden reducirse. Además, una criatura no hostil con 0 puntos de golpe en el aura recupera 1 punto de golpe al inicio de su turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-aura-of-purity",
    "name": "Aura de Pureza",
    "nameEn": "Aura of Purity",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 30 pies)",
    "components": "V",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Energía purificadora irradia de ti en un aura de 30 pies de radio. Hasta que el conjuro termine, el aura se mueve contigo, centrada en ti. Cada criatura no hostil en el aura tiene resistencia al daño de veneno y ventaja en tiradas de salvación contra ser cegado, hechizado, ensordecido, asustado, paralizado, envenenado y aturdido.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-banishment",
    "name": "Destierro",
    "nameEn": "Banishment",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (an item distasteful to the target)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Intentas enviar a una criatura que puedas ver dentro del alcance a otro plano de existencia. El objetivo debe superar una tirada de salvación de Carisma o ser desterrado. Si el objetivo es nativo del plano en el que te encuentras, es desterrado a un semiplano inofensivo donde queda incapacitado durante la duración. Si es nativo de un plano diferente, es devuelto a su plano de origen.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blight",
    "name": "Marchitar",
    "nameEn": "Blight",
    "level": 4,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "La energía nigromántica inunda a una criatura de tu elección que puedas ver dentro del alcance, marchitando su cuerpo y humedad. El objetivo debe realizar una tirada de salvación de Constitución. Recibe 8d8 de daño necrótico si falla la salvación, o la mitad de daño si tiene éxito. Este conjuro no tiene efecto en muertos vivientes ni en autómatas. Si el objetivo es una criatura vegetal, tiene desventaja en la salvación y recibe el daño máximo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-charm-monster",
    "name": "Hechizar Monstruo",
    "nameEn": "Charm Monster",
    "level": 4,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Intentas encantar a una criatura que puedas ver dentro del alcance. Debe realizar una tirada de salvación de Sabiduría, haciéndola con ventaja si tú o tus compañeros están luchando contra ella. Si falla la salvación, queda hechizada por ti hasta que el conjuro termine o hasta que tú o tus compañeros le hagan daño. La criatura hechizada es amistosa hacia ti y tus compañeros.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 4. Las criaturas deben estar a 30 pies o menos entre sí.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-compulsion",
    "name": "Compulsión",
    "nameEn": "Compulsion",
    "level": 4,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Las criaturas de tu elección que puedas ver dentro del alcance no deben ser inmunes a ser hechizadas y deben realizar una tirada de salvación de Sabiduría. Si fallan la salvación, quedan afectadas por el conjuro. En cada uno de tus turnos, puedes usar una acción adicional para designar una dirección; cada objetivo afectado debe usar todo su movimiento para avanzar en esa dirección en su turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-confusion",
    "name": "Confusión",
    "nameEn": "Confusion",
    "level": 4,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (three nut shells)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Este conjuro asalta y distorsiona las mentes de las criaturas, generando delirios y provocando acciones incontroladas. Cada criatura en una esfera de 10 pies de radio centrada en un punto que elijas dentro del alcance debe superar una tirada de salvación de Sabiduría cuando lanzas este conjuro o quedar afectada por él. Una criatura afectada tira un d10 al inicio de cada turno para determinar su comportamiento errático.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el radio de la esfera aumenta en 5 pies por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-minor-elementals",
    "name": "Conjurar Elementales Menores",
    "nameEn": "Conjure Minor Elementals",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas espíritus elementales que se manifiestan en espacios desocupados dentro del alcance. Eliges una de las siguientes opciones: un elemental de VD 2 o menor, dos de VD 1 o menor, cuatro de VD 1/2 o menor, u ocho de VD 1/4 o menor. Los elementales invocados son amigables contigo y tus compañeros y obedecen tus órdenes.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 6 o 7, convocas el doble de criaturas. Con un espacio de nivel 8 o 9, convocas el triple.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-woodland-beings",
    "name": "Conjurar Seres de los Bosques",
    "nameEn": "Conjure Woodland Beings",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (one holly berry per creature summoned)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas espíritus feéricos que asumen la forma de criaturas del bosque en espacios desocupados dentro del alcance. Eliges: una de VD 2 o menor, dos de VD 1 o menor, cuatro de VD 1/2 o menor, u ocho de VD 1/4 o menor. Las criaturas son amigables contigo y tus compañeros y obedecen tus órdenes verbales.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 6 o 7, convocas el doble de criaturas. Con un espacio de nivel 8 o 9, convocas el triple.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-control-water",
    "name": "Controlar las Aguas",
    "nameEn": "Control Water",
    "level": 4,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V, S, M (una gota de agua and a pinch of dust)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Hasta que el conjuro termine, controlas cualquier agua estancada dentro de un área que elijas que sea un cubo de hasta 100 pies de lado. Puedes elegir entre cuatro efectos en tu turno: Inundación (hacer que el nivel del agua suba hasta 20 pies), Separar las Aguas (crear una trinchera seca a través del agua), Redirigir el Flujo (hacer que el agua fluya en una dirección específica) o Remolino (crear un poderoso vórtice que atrape a las criaturas en el agua).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-death-ward",
    "name": "Custodia contra la Muerte",
    "nameEn": "Death Ward",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "8 horas",
    "description": "Tocas a una criatura y le otorgas una medida de protección contra la muerte. La primera vez que el objetivo fuera a caer a 0 puntos de golpe como resultado de sufrir daño, en su lugar se queda a 1 punto de golpe y el conjuro termina.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dimension-door",
    "name": "Puerta Dimensional",
    "nameEn": "Dimension Door",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "500 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Te teletransportas desde tu ubicación actual a cualquier otro punto dentro del alcance. Llegas exactamente al punto deseado. Puede ser un lugar que puedas ver, uno que puedas visualizar o uno que puedas describir indicando la distancia y dirección (como '200 pies en línea recta hacia arriba').\n\nPuedes llevar contigo objetos siempre que su peso no exceda tu capacidad de carga. También puedes llevar a una criatura voluntaria de tu tamaño o menor que transporte equipo hasta su capacidad de carga; la criatura debe estar a 5 pies o menos de ti cuando lanzas el conjuro.\n\nSi llegas a un lugar ya ocupado por un objeto o criatura, tú y cualquier criatura que viaje contigo reciben 4d6 de daño de fuerza y el conjuro no logra teletransportarlos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-divination",
    "name": "Adivinación",
    "nameEn": "Divination",
    "level": 4,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (incense and a sacrificial offering appropriate to your religion, together que valga al menos 25 po, que el conjuro consume)",
    "duration": "Instantáneo",
    "description": "Tu conjuro y ofrenda te ponen en contacto con una deidad o un siervo divino. Haces una sola pregunta sobre un objetivo, evento o actividad específicos que ocurrirán dentro de los próximos 7 días. El DM ofrece una respuesta veraz, que puede ser una frase corta, una rima críptica o un presagio.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dominate-beast",
    "name": "Dominar Bestia",
    "nameEn": "Dominate Beast",
    "level": 4,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Intentas controlar a una bestia que puedas ver dentro del alcance. Debe superar una tirada de salvación de Sabiduría o quedar hechizada por ti durante la duración. Mientras la bestia esté hechizada, tienes un vínculo telepático con ella y puedes darle órdenes precisas que obedece en su turno.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5, la duración es de concentración, hasta 10 minutos. Con un espacio de nivel 6, hasta 1 hora. Con un espacio de nivel 7 o superior, hasta 8 horas.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador",
      "Hechicero"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-elemental-bane",
    "name": "Ruina Elemental",
    "nameEn": "Elemental Bane",
    "level": 4,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges una criatura que puedas ver dentro del alcance y un tipo de daño: ácido, frío, fuego, relámpago o trueno. El objetivo debe superar una tirada de salvación de Constitución o perder cualquier resistencia al tipo de daño elegido durante la duración. Además, la primera vez en cada turno que reciba daño de ese tipo, recibe 2d6 de daño adicional del mismo tipo.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, puedes elegir como objetivo a una criatura adicional por cada nivel de espacio por encima de nivel 4. Las criaturas deben estar a 30 pies o menos entre sí.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Druida",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-evards-black-tentacles",
    "name": "Tentáculos Negros de Evard",
    "nameEn": "Evard's Black Tentacles",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (un trozo de tentáculo de calamar gigante)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tentáculos gomosos y negros brotan del suelo en un área de 20 pies cuadrados convirtiéndola en terreno difícil. Cualquier criatura que entre o comience su turno allí debe superar una salvación de Destreza o sufrir 3d6 de daño contundente y quedar apresada.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-fabricate",
    "name": "Fabricar",
    "nameEn": "Fabricate",
    "level": 4,
    "school": "Transmutación",
    "castingTime": "10 minutos",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Conviertes materias primas en productos elaborados del mismo material dentro del alcance. Por ejemplo, puedes fabricar un puente de madera a partir de un grupo de árboles, cuerdas de cáñamo a partir de una gavilla de lino, o armaduras y armas a partir de mineral de hierro refinado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-find-greater-steed",
    "name": "Buscar Corcel Mayor",
    "nameEn": "Find Greater Steed",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "10 minutos",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Invocas un espíritu que asume la forma de una montura leal y poderosa. Aparece en un espacio desocupado dentro del alcance en la forma de un grifo, un pegaso, un periplo, un rinoceronte, un tigre dientes de sable o un huargo. La montura tiene el perfil de estadísticas de la forma elegida, pero es un celestial, hada o infernal.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Paladín"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-fire-shield",
    "name": "Escudo de Fuego",
    "nameEn": "Fire Shield",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (a bit of phosphorus or a firefly)",
    "duration": "10 minutos",
    "description": "Llamas tenues envuelven tu cuerpo durante la duración, despidiendo luz brillante en un radio de 10 pies y luz tenue durante 10 pies adicionales. Puedes terminar el conjuro antes cancelándolo como una acción.\n\nLas llamas te proporcionan un escudo cálido o un escudo frío a tu elección. El escudo cálido te otorga resistencia al daño de frío, y el escudo frío te otorga resistencia al daño de fuego.\n\nAdemás, cuando una criatura a 5 pies o menos de ti te impacte con un ataque cuerpo a cuerpo, el escudo estalla en represalia. El atacante recibe 2d8 de daño de fuego de un escudo cálido, o 2d8 de daño de frío de un escudo frío.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-freedom-of-movement",
    "name": "Libertad de Movimiento",
    "nameEn": "Freedom of Movement",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (a leather strap, bound around the arm or a similar appendage)",
    "duration": "1 hora",
    "description": "Tocas a una criatura voluntaria. Durante la duración, el movimiento del objetivo no se ve afectado por terreno difícil, y los conjuros y otros efectos mágicos no pueden reducir su velocidad ni hacer que quede paralizado o apresado.\n\nEl objetivo también puede gastar 5 pies de movimiento para escapar automáticamente de ataduras no mágicas, como grilletes o el agarre de una criatura. Por último, estar bajo el agua no impone penalizadores al movimiento ni a los ataques del objetivo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-galders-speedy-courier",
    "name": "Mensajero Veloz de Galder",
    "nameEn": "Galder's Speedy Courier",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V, S, M (25 gold pieces, or mineral goods of equivalent value, que el conjuro consume)",
    "duration": "10 minutos",
    "description": "Creas un pequeño cofre de 2 pies por 1 pie por 1 pie y un diminuto elemental de aire para que actúe como mensajero. Colocas objetos dentro del cofre (con un límite de 25 libras) y especificas una criatura objetivo que conozcas en el mismo plano de existencia. El mensajero vuela a través del plano astral hasta el objetivo a una velocidad tremenda, entregando el cofre en 10 minutos. Una vez entregado el contenido o transcurrida la duración, el cofre y el mensajero desaparecen.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el peso máximo que el cofre puede transportar aumenta en 10 libras por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Lost Laboratory of Kwalish"
  },
  {
    "id": "spl-gate-seal",
    "name": "Sello de Portal",
    "nameEn": "Gate Seal",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 minuto",
    "range": "60 pies",
    "components": "V, S",
    "duration": "24 horas",
    "description": "Tocas un portal planar y lo sellas de inmediato. Durante la duración, el portal no puede abrirse por ningún medio, a menos que el sello sea disipado exitosamente con Disipar Magia.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago",
      "Hechicero"
    ],
    "source": "Planescape - Adventures in the Multiverse"
  },
  {
    "id": "spl-giant-insect",
    "name": "Insecto Gigante",
    "nameEn": "Giant Insect",
    "level": 4,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Transformas hasta diez ciempiés, tres arañas, cinco avispas o un escorpión dentro del alcance en versiones gigantescas de sí mismos durante la duración. Cada criatura obedece tus órdenes telepáticas en tu turno (no requiere acción). Una criatura permanece en su forma gigante durante la duración, hasta que caiga a 0 puntos de golpe o hasta que disipes el conjuro con una acción.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-grasping-vine",
    "name": "Enredadera Aprisionadora",
    "nameEn": "Grasping Vine",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas una enredadera que brota del suelo o de una superficie dentro del alcance. Como acción adicional en cada uno de tus turnos mientras dure el conjuro, puedes ordenar a la enredadera que azote a una criatura a 30 pies o menos de ella. La criatura debe superar una tirada de salvación de Destreza o ser arrastrada hasta 20 pies directamente hacia la enredadera.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-gravity-sinkhole",
    "name": "Sumidero Gravitacional",
    "nameEn": "Gravity Sinkhole",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (una canica negra)",
    "duration": "Instantáneo",
    "description": "Creas un punto gravitacional aplastante en un punto dentro del alcance. Todas las criaturas a 20 pies o menos de ese punto son atraídas hacia el centro y deben hacer una tirada de salvación de Constitución. Si fallan, reciben 5d10 de daño por fuerza y son atraídas al centro. Con éxito, sufren la mitad del daño y no son atraídas.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el daño aumenta en 1d10 por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-greater-invisibility",
    "name": "Invisibilidad Mayor",
    "nameEn": "Greater Invisibility",
    "level": 4,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Tocas a una criatura voluntaria. El objetivo se vuelve invisible hasta que el conjuro termine. Nada de lo que el objetivo lleve o vista se vuelve visible a menos que lo suelte. A diferencia de Invisibilidad normal, atacar o lanzar conjuros no termina este conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hallucinatory-terrain",
    "name": "Terreno Alucinatorio",
    "nameEn": "Hallucinatory Terrain",
    "level": 4,
    "school": "Ilusión",
    "castingTime": "10 minutos",
    "range": "300 pies",
    "components": "V, S, M (una piedra, una ramita y un trozo de planta verde)",
    "duration": "24 horas",
    "description": "Haces que un terreno natural de un cubo de 150 pies parezca, suene y huela como otro tipo de terreno natural. Puedes hacer que un pantano parezca un prado, o un precipicio parezca una suave colina. Los elementos táctiles no cambian los peligros reales (un precipicio ilusorio aún hace caer a quien lo pise). Las criaturas que sospechen pueden examinar la ilusión con una prueba de Inteligencia (Investigación) contra la CD de salvación de tu conjuro para ver a través de ella.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-ice-storm",
    "name": "Tormenta de Hielo",
    "nameEn": "Ice Storm",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V, S, M (una pizca de polvo y unas gotas de agua)",
    "duration": "Instantáneo",
    "description": "Una lluvia de cilindros de hielo cae con fuerza en un área cilíndrica de 20 pies de radio y 40 pies de altura centrada en un punto dentro del alcance. Cada criatura en el cilindro debe hacer una tirada de salvación de Destreza. Una criatura recibe 2d8 de daño contundente y 4d6 de daño de frío si falla la salvación, o la mitad de daño si tiene éxito. El granizo convierte el área en terreno difícil hasta el final de tu siguiente turno.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el daño contundente aumenta en 1d8 por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-leomunds-secret-chest",
    "name": "Cofre Secreto de Leomund",
    "nameEn": "Leomund's Secret Chest",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un cofre exquisito de 3 por 2 por 2 pies de materiales raros por valor de al menos 5.000 po, y una réplica Diminuta hecha de los mismos materiales por valor de al menos 50 po)",
    "duration": "Instantáneo",
    "description": "Ocultas un cofre en el Plano Etéreo por hasta 60 días. Mientras el cofre esté allí, puedes usar una acción y tocar la réplica diminuta para devolver el cofre a tu espacio a 5 pies de ti. Puedes enviar el cofre de regreso al Plano Etéreo tocando ambos cofres con una acción.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-locate-creature",
    "name": "Localizar Criatura",
    "nameEn": "Locate Creature",
    "level": 4,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (a bit of fur from a bloodhound)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Describe o nombra a una criatura que te resulte familiar. Sientes la dirección hacia su ubicación siempre que la criatura se encuentre a 1.000 pies o menos de ti. Si la criatura está en movimiento, conoces la dirección de su movimiento. El conjuro no puede localizar a una criatura si hay al menos 10 pies de agua corriente bloqueando el camino.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Explorador",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mordenkainens-faithful-hound",
    "name": "Sabueso Fiel de Mordenkainen",
    "nameEn": "Mordenkainen's Faithful Hound",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (un diminuto silbato de plata, un trozo de hueso y un hilo)",
    "duration": "8 horas",
    "description": "Conjuras a un sabueso guardián invisible y fantasmal en un espacio desocupado dentro del alcance, donde permanece durante la duración, hasta que te alejes a más de 100 pies de él o hasta que uses una acción para disiparlo. El sabueso ladra con fuerza si una criatura Pequeña o más grande se acerca a 30 pies de él sin decir la contraseña. Ve criaturas invisibles y en el Plano Etéreo. Al inicio de cada uno de tus turnos, el sabueso intenta morder a un enemigo a 5 pies de él con un bonificador de ataque de conjuro igual a tu bonificador de ataque, infligiendo 4d8 de daño perforante.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mordenkainens-private-sanctum",
    "name": "Santuario Privado de Mordenkainen",
    "nameEn": "Mordenkainen's Private Sanctum",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "10 minutos",
    "range": "120 pies",
    "components": "V, S, M (una lámina fina de plomo, un trozo de vidrio opaco, un taco de algodón o tela y crisolito pulverizado)",
    "duration": "24 horas",
    "description": "Creas una zona mágica protegida en un área cúbica de entre 5 pies y 100 pies de arista dentro del alcance. Mientras dure, el sonido no puede cruzar la barrera, la zona está oculta a los sensores de adivinación, las criaturas en el área no pueden ser espiadas y los conjuros de teletransporte o viaje planar hacia el área fallan automáticamente.",
    "higherLevels": "Lanzar este conjuro con un espacio de nivel 5 o superior te permite aumentar el tamaño del cubo en 100 pies de arista por cada nivel por encima de nivel 4. Si se lanza en el mismo lugar todos los días durante un año, el efecto se vuelve permanente.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-otilukes-resilient-sphere",
    "name": "Esfera Resistente de Otiluke",
    "nameEn": "Otiluke's Resilient Sphere",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una pieza hemisférica de cristal transparente y otra de goma arábiga a juego)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una esfera de fuerza centelleante encierra a una criatura u objeto de tamaño Grande o menor dentro del alcance. Una criatura no voluntaria debe superar una tirada de salvación de Destreza o queda encerrada durante la duración. Nada —ni objetos físicos ni conjuros u otros efectos mágicos— puede penetrar la esfera ni salir de ella, aunque la criatura encerrada puede respirar dentro de ella.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-phantasmal-killer",
    "name": "Asesino Fantasmagórico",
    "nameEn": "Phantasmal Killer",
    "level": 4,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Aprovechas las pesadillas más oscuras de una criatura que puedas ver dentro del alcance y creas una manifestación ilusoria de sus miedos más profundos, visible solo para ella. El objetivo debe superar una tirada de salvación de Sabiduría o queda asustado durante la duración. Al final de cada uno de sus turnos antes de que termine el conjuro, el objetivo debe tener éxito en una tirada de salvación de Sabiduría o recibe 4d10 de daño psíquico. Con una salvación exitosa, el conjuro termina.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el daño aumenta en 1d10 por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-polymorph",
    "name": "Polimorfar",
    "nameEn": "Polymorph",
    "level": 4,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una oruga)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Transformas a una criatura en una nueva forma de bestia cuyo VD sea menor o igual al nivel del objetivo (o su VD). La criatura asume los puntos de golpe, estadísticas y ataques de la bestia elegida hasta que caiga a 0 PG o termine el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-raulothims-psychic-lance",
    "name": "Lanza Psíquica de Raulothim",
    "nameEn": "Raulothim's Psychic Lance",
    "level": 4,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Desatas una lanza de energía psíquica contra una criatura que puedas ver o cuyo nombre pronuncies. El objetivo debe superar una salvación de Inteligencia o sufrir 7d6 de daño psíquico e incapacitarse hasta el comienzo de tu siguiente turno.",
    "higherLevels": "El daño aumenta en 1d6 por cada nivel por encima de nivel 4.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-shadow-of-moil",
    "name": "Sombra de Moil",
    "nameEn": "Shadow Of Moil",
    "level": 4,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (un ojo de no-muerto incrustado en una gema por valor de al menos 150 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Sombras gélidas de la no-muerte envuelven tu cuerpo, ocultándote a la vista de los demás. Hasta que termine el conjuro, quedas fuertemente oscurecido para las demás criaturas. Además, el área dentro de 10 pies de ti se cubre de penumbra. Siempre que una criatura a 10 pies o menos de ti te golpee con un ataque, las sombras la azotan, causándole 2d8 de daño necrótico, y tú tienes resistencia al daño radiante.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-sickening-radiance",
    "name": "Radiancia Enfermiza",
    "nameEn": "Sickening Radiance",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una luz verdosa y sofocante llena una esfera de 30 pies de radio. Las criaturas en el área sufren 4d10 de daño radiante si fallan una salvación de Constitución, emiten una luz tenue y ganan un nivel de agotamiento. El agotamiento desaparece al terminar el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-spirit-of-death",
    "name": "Espíritu de la Muerte",
    "nameEn": "Spirit Of Death",
    "level": 4,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una carta de baraja dorada por valor de al menos 400 po que representa un avatar de la muerte)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas al espíritu de la muerte de las sombras. Se manifiesta en un espacio desocupado que puedas ver a 60 pies o menos de ti. El espíritu es una criatura que usa el perfil de Espíritu de la Muerte. Desaparece cuando cae a 0 puntos de golpe o cuando termina el conjuro. Es un aliado para ti y tus compañeros, actúa en tu iniciativa inmediatamente después de ti y obedece tus órdenes verbales.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, ciertas estadísticas en su perfil aumentan según el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "The Book of Many Things"
  },
  {
    "id": "spl-staggering-smite",
    "name": "Castigo Tambaleante",
    "nameEn": "Staggering Smite",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque de arma cuerpo a cuerpo durante la duración del conjuro, tu arma perfora tanto el cuerpo como la mente, infligiendo 4d6 de daño psíquico adicional al objetivo. Además, el objetivo debe superar una tirada de salvación de Sabiduría o sufre desventaja en tiradas de ataque y pruebas de característica, y no puede realizar reacciones hasta el final de su siguiente turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-stone-shape",
    "name": "Moldear la Piedra",
    "nameEn": "Stone Shape",
    "level": 4,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (arcilla blanda, que debe moldearse toscamente con la forma deseada del objeto de piedra)",
    "duration": "Instantáneo",
    "description": "Tocas un objeto de piedra de tamaño Mediano o menor o una sección de piedra de no más de 5 pies en cualquier dimensión y le das la forma que desees. Por ejemplo, puedes moldear una roca grande en forma de cofre, hacer un pasadizo a través de una pared de piedra o crear una puerta en un muro de piedra.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-stoneskin",
    "name": "Piel de Piedra",
    "nameEn": "Stoneskin",
    "level": 4,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (polvo de diamante por valor de al menos 100 po, consumido por el conjuro)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas a una criatura voluntaria. Hasta que el conjuro termine, la carne del objetivo se vuelve tan dura como la piedra. El objetivo obtiene resistencia al daño contundente, perforante y cortante no mágico.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Druida",
      "Explorador",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-storm-sphere",
    "name": "Esfera de Tormenta",
    "nameEn": "Storm Sphere",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una esfera de aire arremolinado de 20 pies de radio se forma en un punto que elijas dentro del alcance. El área es terreno difícil y cada criatura en ella cuando aparece o que termine su turno allí debe superar una tirada de salvación de Fuerza o recibir 2d6 de daño contundente. Hasta que termine el conjuro, puedes usar una acción adicional en cada uno de tus turnos para disparar un rayo desde el centro de la esfera a una criatura a 60 pies o menos de ella, haciendo un ataque de conjuro a distancia que causa 4d6 de daño de relámpago con un impacto.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el daño de los rayos y del viento aumenta en 1d6 por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-summon-aberration",
    "name": "Invocar Aberración",
    "nameEn": "Summon Aberration",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (un tentáculo en salmuera y un ojo en un vial con incrustaciones de platino por valor de al menos 400 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu aberrante que aparece en un espacio desocupado que puedas ver dentro del alcance. Este ser adopta una forma espectral que usa el perfil de Espíritu Aberrante. Obedece tus órdenes verbales y comparte tu iniciativa, actuando inmediatamente después de ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, ciertas características de la criatura aumentan según el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-summon-construct",
    "name": "Invocar Autómata",
    "nameEn": "Summon Construct",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (una caja fuerte ornamentada de piedra y metal por valor de al menos 400 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu autómata que se materializa en un espacio desocupado que puedas ver dentro del alcance. Utiliza el perfil de Espíritu Autómata. Es un aliado obediente que combate a tu lado y actúa inmediatamente después de tu turno en la misma iniciativa.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, ciertas estadísticas en su perfil aumentan según el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-summon-elemental",
    "name": "Invocar Elemental",
    "nameEn": "Summon Elemental",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (aire, un guijarro, ceniza y agua dentro de un vial con incrustaciones de oro por valor de al menos 400 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu de la naturaleza elemental en un espacio desocupado a 90 pies o menos de ti. Utiliza el perfil de Espíritu Elemental (Aire, Tierra, Fuego o Agua). Obedece tus órdenes y lucha como tu aliado, actuando inmediatamente después de tu turno.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, las estadísticas de la criatura mejoran de acuerdo con el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-summon-greater-demon",
    "name": "Invocar Demonio Mayor",
    "nameEn": "Summon Greater Demon",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (a vial of blood from a humanoid killed within the past 24 hours)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Pronuncias palabras oscuras convocando a un demonio de las profundidades del Abismo. Eliges el tipo de demonio, que debe ser de valor de desafío 5 o inferior (como un demonio de sombras, barlgura, chasme o vrock). Aparece en un espacio desocupado a 60 pies o menos de ti. Al final de cada uno de sus turnos, el demonio hace una tirada de salvación de Carisma. Si falla, obedece tus órdenes verbales; si tiene éxito, deja de obedecerte y ataca a la criatura no demoníaca más cercana.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el valor de desafío máximo aumenta en 1 por cada nivel por encima de nivel 4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-vitriolic-sphere",
    "name": "Esfera Vitriólica",
    "nameEn": "Vitriolic Sphere",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (una gota de bilis de babosa gigante)",
    "duration": "Instantáneo",
    "description": "Lanzas una brillante bola de ácido esmeralda hacia un punto dentro del alcance, donde explota en una esfera de 20 pies de radio. Cada criatura en esa área debe hacer una tirada de salvación de Destreza. Si falla, recibe 10d4 de daño de ácido de inmediato y 5d4 de daño de ácido al final de su siguiente turno. Si tiene éxito, recibe la mitad del daño inicial y ningún daño posterior.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 5 o superior, el daño inicial aumenta en 2d4 por cada nivel de espacio por encima de nivel 4.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-wall-of-fire",
    "name": "Muro de Fuego",
    "nameEn": "Wall of Fire",
    "level": 4,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un trozo de fósforo)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas un muro de fuego sólido de hasta 60 pies de largo, 20 pies de alto y 1 pie de grosor, o un muro anular de hasta 20 pies de diámetro. Las criaturas que estén en su área sufren 5d8 de daño por fuego si fallan salvación de Destreza, y causa 5d8 de daño a cualquiera que se acerque a 10 pies de su lado abrasador.",
    "higherLevels": "El daño aumenta en 1d8 por cada nivel de ranura por encima de 4.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-watery-sphere",
    "name": "Esfera Acuática",
    "nameEn": "Watery Sphere",
    "level": 4,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (una gotita de agua)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Conjuras una esfera de agua de 10 pies de radio en un punto que puedas ver dentro del alcance. La esfera puede flotar en el aire, pero no más de 10 pies por encima del suelo. Cualquier criatura en el espacio de la esfera debe hacer una tirada de salvación de Fuerza. Si falla, queda apresada dentro de la esfera y se ahoga a menos que pueda respirar bajo el agua. Como acción, puedes mover la esfera hasta 30 pies en cualquier dirección.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-animate-objects",
    "name": "Animar Objetos",
    "nameEn": "Animate Objects",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Objetos inanimados cobran vida bajo tus órdenes. Puedes animar hasta diez objetos Diminutos o Pequeños, o menos de tamaños mayores (un objeto Mediano cuenta como dos, Grande como cuatro, Enorme como ocho). Tienen estadísticas de combate propias y atacan a tus órdenes.",
    "higherLevels": "Si lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, puedes animar dos objetos adicionales por cada nivel de espacio por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-antilife-shell",
    "name": "Caparazón Antivida",
    "nameEn": "Antilife Shell",
    "level": 5,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 10 pies)",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Una barrera brillante y centelleante se extiende hacia fuera desde ti en un radio de 10 pies y se mueve contigo, permaneciendo centrada en ti durante la duración. La barrera impide el paso a criaturas vivas (que no sean no-muertos ni autómatas). Una criatura afectada no puede atravesar la barrera voluntariamente ni tocar a nadie en su interior.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-awaken",
    "name": "Despertar",
    "nameEn": "Awaken",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "8 horas",
    "range": "Toque",
    "components": "V, S, M (un ágata por valor de al menos 1.000 po, consumida por el conjuro)",
    "duration": "Instantáneo",
    "description": "Pasas el tiempo de lanzamiento trazando senderos mágicos en una bestia o planta de tamaño Enorme o menor. El objetivo debe tener un valor de Inteligencia de 3 o menos. El objetivo obtiene una Inteligencia de 10 y la capacidad de hablar un idioma que conozcas. Si el objetivo es una planta, obtiene la capacidad de mover sus ramas, raíces y enredaderas, y obtiene sentidos similares a los de un humano. El objetivo queda hechizado por ti durante 30 días o hasta que tú o tus compañeros le hagan daño.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-banishing-smite",
    "name": "Castigo Desterrador",
    "nameEn": "Banishing Smite",
    "level": 5,
    "school": "Abjuración",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "La próxima vez que impactes a una criatura con un ataque de arma durante la duración de este conjuro, tu arma crepita con fuerza divina y el ataque inflige 5d10 de daño por fuerza adicional. Además, si este ataque reduce al objetivo a 50 puntos de golpe o menos, lo destierras a un semiplano inofensivo. Si el objetivo es nativo de un plano de existencia diferente, es enviado de vuelta a su plano natal.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-bigbys-hand",
    "name": "Mano de Bigby",
    "nameEn": "Bigby's Hand",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (una cáscara de huevo y un guante de piel de serpiente)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas una mano flotante de fuerza translúcida y tamaño Grande en un espacio desocupado que puedas ver a 120 pies o menos de ti. La mano dura mientras mantengas la concentración, hasta 1 minuto. La mano se mueve hasta 60 pies cuando la conjuras y como acción adicional en tus turnos posteriores. Puedes ordenarle que realice una Mano Interpuesta, Mano Empujadora, Mano Aprisionadora o Puño Cerrado (infligiendo 4d8 de daño por fuerza).",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el daño de Puño Cerrado y el daño de Mano Aprisionadora aumentan en 2d8 por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-circle-of-power",
    "name": "Círculo de Poder",
    "nameEn": "Circle of Power",
    "level": 5,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 30 pies)",
    "components": "V",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una energía divina emana de ti en un radio de 30 pies. Hasta que termine el conjuro, la esfera se mueve contigo. Cada criatura amiga en el área (incluyéndote a ti) tiene ventaja en tiradas de salvación contra conjuros y otros efectos mágicos. Además, cuando una criatura afectada tenga éxito en una salvación contra un conjuro o efecto mágico que le permita sufrir la mitad del daño en caso de éxito, en su lugar no sufre daño.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-cloudkill",
    "name": "Nube Aniquiladora",
    "nameEn": "Cloudkill",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas una esfera de 20 pies de radio de vapor amarillento y venenoso. Se desplaza 10 pies lejos de ti cada turno. Cualquier criatura que entre o empiece su turno en la nube sufre 5d8 de daño por veneno (mitad si supera una salvación de Constitución).",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-commune",
    "name": "Comulgar",
    "nameEn": "Commune",
    "level": 5,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Lanzador",
    "components": "V, S, M (incienso y un vial de agua bendita o profana)",
    "duration": "1 minuto",
    "description": "Te pones en contacto con tu deidad o un emisario divino y le formulas hasta tres preguntas que puedan responderse con un sí o un no. Debes formular tus preguntas antes de que termine el conjuro. Recibes una respuesta correcta para cada pregunta. Seres divinos no son necesariamente omniscientes en todos los temas secretos de otras deidades.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-commune-with-nature",
    "name": "Comulgar con la Naturaleza",
    "nameEn": "Commune with Nature",
    "level": 5,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Te vuelves uno con la naturaleza y obtienes conocimiento instantáneo del territorio circundante. En áreas al aire libre, el conjuro te da conocimiento del área dentro de 3 millas de ti; en cavernas o bajo tierra, el alcance es de 300 pies. Aprendes hasta tres datos de tu elección sobre la presencia de cuerpos de agua, asentamientos, tipos de criaturas predominantes, minerales o influencias de otros planos.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-cone-of-cold",
    "name": "Cono de Frío",
    "nameEn": "Cone of Cold",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 60 pies)",
    "components": "V, S, M (un pequeño cono de cristal o vidrio)",
    "duration": "Instantáneo",
    "description": "Una ráfaga de aire gélido surge de tus manos en un cono de 60 pies. Cada criatura en el cono debe hacer una tirada de salvación de Constitución. Una criatura recibe 8d8 de daño de frío si falla la salvación, o la mitad de daño si tiene éxito. Una criatura muerta por este conjuro se convierte en una estatua congelada.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 5.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-elemental",
    "name": "Conjurar Elemental",
    "nameEn": "Conjure Elemental",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "90 pies",
    "components": "V, S, M (incienso encendido para aire, arcilla blanda para tierra, azufre y fósforo para fuego, o agua y arena para agua)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un servidor elemental. Eliges un área de aire, tierra, fuego o agua que llene un cubo de 10 pies dentro del alcance. Un elemental de valor de desafío 5 o inferior apropiado para esa área aparece en un espacio desocupado a 10 pies o menos de ella. El elemental es amistoso contigo y tus compañeros durante la duración, pero si pierdes la concentración se vuelve hostil y te atacará si es posible.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el valor de desafío máximo aumenta en 1 por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-volley",
    "name": "Conjurar Salva de Flechas",
    "nameEn": "Conjure Volley",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (una pieza de munición o un arma arrojadiza)",
    "duration": "Instantáneo",
    "description": "Lanzas un arma a distancia no mágica o una pieza de munición no mágica al aire y eliges un punto dentro del alcance. Cientos de copias idénticas caen en un cono invertido o cilindro de 40 pies de radio y 20 pies de altura centrado en ese punto. Cada criatura en el área debe superar una tirada de salvación de Destreza o recibir 8d8 de daño con el mismo tipo de daño que el arma original arrojada, o la mitad si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-contact-other-plane",
    "name": "Contactar con Otro Plano",
    "nameEn": "Contact Other Plane",
    "level": 5,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Lanzador",
    "components": "V",
    "duration": "1 minuto",
    "description": "Contactas telepáticamente con una entidad semidivina o del Plano Exterior. Poner tu mente en contacto con semejante poder puede romper tu cordura: debes superar una tirada de salvación de Inteligencia CD 15 o sufres 6d6 de daño psíquico y quedas incapacitado e impedido de actuar hasta que termines un descanso largo. Si tienes éxito en la salvación, puedes formular a la entidad hasta cinco preguntas que se responden con sí, no, incierto o irrelevante.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-contagion",
    "name": "Contagio",
    "nameEn": "Contagion",
    "level": 5,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "7 días",
    "description": "Tu toque inflige una plaga virulenta. Realizas un ataque de conjuro cuerpo a cuerpo contra una criatura dentro de tu alcance. Si impactas, el objetivo queda envenenado durante la duración. Al final de cada uno de sus turnos, el objetivo debe hacer una tirada de salvación de Constitución. Si acumula tres éxitos, el conjuro termina. Si acumula tres fallos, el objetivo contrae una enfermedad contagiosa a tu elección durante 7 días (como Ceguera Fulminante, Fiebre Mental, etc.).",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-control-winds",
    "name": "Controlar los Vientos",
    "nameEn": "Control Winds",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tomas el control del aire en un cubo de 100 pies que puedas ver dentro del alcance. Eliges uno de los siguientes efectos: Ráfagas constantes en una dirección que impiden avanzar en contra del viento y desvían flechas, Corriente Descendente que empuja hacia abajo a las criaturas que vuelan haciéndolas caer, o Corriente Ascendente que amortigua caídas y multiplica la altura de los saltos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-create-spelljamming-helm",
    "name": "Crear Timón de Nave Espacial",
    "nameEn": "Create Spelljamming Helm",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (una vara de cristal por valor de al menos 5.000 po, consumida por el conjuro)",
    "duration": "Instantáneo",
    "description": "Mantienes una vara de gemas contra una silla grande o asiento durante todo el lanzamiento. Al finalizar, la silla se transforma en un timón de nave espacial (Spelljamming Helm), un dispositivo mágico que permite a un lanzador de conjuros pilotar una nave astral a través del espacio salvaje y el flujo astral.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Mago"
    ],
    "source": "Spelljammer: Adventures in Space - Astral Adventurer's Guide"
  },
  {
    "id": "spl-creation",
    "name": "Creación",
    "nameEn": "Creation",
    "level": 5,
    "school": "Ilusión",
    "castingTime": "1 minuto",
    "range": "30 pies",
    "components": "V, S, M (un trozo diminuto de materia del mismo tipo del objeto que planeas crear)",
    "duration": "Especial",
    "description": "Extraes volutas de materia sombría del Plano de las Sombras para crear un objeto no mágico de materia vegetal, mineral o metálica dentro del alcance que quepa en un cubo de hasta 5 pies. La duración del objeto depende de su composición: materia vegetal (1 día), piedra o cristal (12 horas), metales comunes (8 horas), plata u oro (1 hora), o platino y gemas preciosas (10 minutos).",
    "higherLevels": "Lanzar este conjuro con un espacio de nivel 6 o superior aumenta el cubo de tamaño en 5 pies por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-danse-macabre",
    "name": "Danza Macabra",
    "nameEn": "Danse Macabre",
    "level": 5,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Hilos de magia oscura fluyen de tus dedos hacia hasta cinco cadáveres de criaturas Pequeñas o Medianas a 60 pies o menos de ti. Cada uno se anima y se convierte en un esqueleto o un zombi bajo tu control durante la duración. Como acción adicional, puedes ordenar mentalmente a todas las criaturas animadas por este conjuro, y añaden tu modificador de característica de lanzamiento a sus tiradas de ataque y daño.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, puedes animar hasta dos cadáveres adicionales por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-dawn",
    "name": "Amanecer",
    "nameEn": "Dawn",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un colgante de resplandor solar por valor de al menos 100 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un cilindro luminoso de 30 pies de radio y 40 pies de altura desciende desde el cielo centrado en un punto dentro del alcance. El área se inunda de luz solar brillante. Cuando el cilindro aparece y al inicio del turno de cada criatura dentro de él, debe hacer una tirada de salvación de Constitución o recibir 4d10 de daño radiante, o la mitad si tiene éxito. Como acción adicional, puedes mover el cilindro hasta 60 pies.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-destructive-wave",
    "name": "Onda Destructiva",
    "nameEn": "Destructive Wave",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Personal (radio de 30 pies)",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Golpeas el suelo desatando una onda sísmica de energía radiante o necrótica. Cada criatura a tu elección dentro de 30 pies debe superar una salvación de Constitución o sufrir 5d6 de daño de trueno más 5d6 de daño radiante o necrótico y caer derribada.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dispel-evil-and-good",
    "name": "Disipar el Bien y el Mal",
    "nameEn": "Dispel Evil and Good",
    "level": 5,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (agua bendita o polvo de plata y hierro)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una energía brillante te envuelve y te protege contra seres de otros planos. Celestiales, elementales, fatas, infernales y no-muertos tienen desventaja en tiradas de ataque contra ti. Además, puedes terminar el conjuro prematuramente para Romper Encantamiento (liberar a una criatura de posesión o encanto) o Expulsión (forzar a una de esas criaturas a superar una tirada de salvación de Carisma o ser devuelta a su plano natal).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dominate-person",
    "name": "Dominar Persona",
    "nameEn": "Dominate Person",
    "level": 5,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Intentas controlar a un humanoide que puedas ver dentro del alcance. Debe superar una tirada de salvación de Sabiduría o queda hechizado por ti durante la duración. Si está combatiendo contra ti o tus aliados, tiene ventaja en la tirada. Mientras esté hechizado, tienes un vínculo telepático con él y puedes darle órdenes precisas que debe obedecer en su turno.",
    "higherLevels": "Cuando lanzas este conjuro con un espacio de nivel 6, la duración es de hasta 10 minutos; con nivel 7, hasta 1 hora; con nivel 8 o superior, hasta 8 horas.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dream",
    "name": "Sueño",
    "nameEn": "Dream",
    "level": 5,
    "school": "Ilusión",
    "castingTime": "1 minuto",
    "range": "Especial",
    "components": "V, S, M (un puñado de arena, una gota de tinta y una pluma arrancada de un pájaro dormido)",
    "duration": "8 horas",
    "description": "Este conjuro moldea los sueños de otra criatura. Eliges como objetivo a una criatura que conozcas en el mismo plano de existencia. Puedes actuar tú mismo como mensajero en su sueño o designar a otra criatura voluntaria. Puedes conversar con el durmiente durante el sueño. De manera alternativa, puedes hacer que el mensajero parezca una pesadilla monstruosa, impidiendo que el objetivo descanse e infligiéndole 3d6 de daño psíquico al despertar tras fallar una salvación de Sabiduría.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-enervation",
    "name": "Enervación",
    "nameEn": "Enervation",
    "level": 5,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un zarcillo de energía oscura surge de ti hacia una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Destreza. Si falla, recibe 4d8 de daño necrótico y tú recuperas puntos de golpe iguales a la mitad del daño necrótico infligido. En cada uno de tus turnos posteriores mientras dure el conjuro, puedes usar una acción para infligir automáticamente 4d8 de daño necrótico y volver a curarte.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el daño aumenta en 1d8 por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-far-step",
    "name": "Paso Lejano",
    "nameEn": "Far Step",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Te teleportas instantáneamente hasta 60 pies a un espacio desocupado que puedas ver. En cada uno de tus turnos posteriores antes de que termine el conjuro, puedes usar una acción adicional para volver a teleportarte hasta 60 pies del mismo modo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-flame-strike",
    "name": "Golpe Flamígero",
    "nameEn": "Flame Strike",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (pizca de azufre)",
    "duration": "Instantáneo",
    "description": "Una columna vertical de fuego divino ruge hacia abajo desde los cielos. Cada criatura en un cilindro de 10 pies de radio y 40 pies de alto debe superar una tirada de salvación de Destreza o sufrir 4d6 de daño por fuego y 4d6 de daño radiante.",
    "higherLevels": "El daño por fuego o radiante aumenta en 1d6 por cada espacio por encima de nivel 5.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-geas",
    "name": "Imposición (Geas)",
    "nameEn": "Geas",
    "level": 5,
    "school": "Encantamiento",
    "castingTime": "1 minuto",
    "range": "60 pies",
    "components": "V",
    "duration": "30 días",
    "description": "Impones una orden mágica a una criatura que puedas ver dentro del alcance, forzándola a realizar algún servicio o a abstenerse de alguna acción o curso de actividad según decidas. Si la criatura puede entenderte, debe superar una tirada de salvación de Sabiduría o queda hechizada por ti durante 30 días. Si la criatura actúa directamente contra tus órdenes, recibe 5d10 de daño psíquico (no más de una vez por día).",
    "higherLevels": "Cuando lanzas este conjuro con un espacio de nivel 7 u 8, la duración es de 1 año; con un espacio de nivel 9, dura indefinidamente hasta ser disipado.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladín",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-greater-restoration",
    "name": "Restablecimiento Mayor",
    "nameEn": "Greater Restoration",
    "level": 5,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (polvo de diamante por valor de al menos 100 po, consumido por el conjuro)",
    "duration": "Instantáneo",
    "description": "Infundes a una criatura de energía mágica curativa para anular un nivel de agotamiento, finalizar un efecto de encanto o petrificación, restaurar reducciones a puntuaciones de habilidad o restablecer reducciones al máximo de puntos de golpe.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Bardo",
      "Clérigo",
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hallow",
    "name": "Consagrar",
    "nameEn": "Hallow",
    "level": 5,
    "school": "Evocación",
    "castingTime": "24 horas",
    "range": "Toque",
    "components": "V, S, M (hierbas, aceites e incienso por valor de al menos 1.000 po, consumidos por el conjuro)",
    "duration": "Hasta disiparse",
    "description": "Imbuyes un área de hasta 60 pies de radio con poder sagrado (o profano). Celestiales, elementales, fatas, infernales y no-muertos no pueden entrar en el área ni poseer o hechizar a criaturas en ella. Además, puedes vincular un efecto adicional al área, como Luz Diurna, Oscuridad, Protección contra Energía, Vulnerabilidad a Energía, Lenguas, Silencio o Miedo hacia un tipo específico de criatura.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-hold-monster",
    "name": "Retener Monstruo",
    "nameEn": "Hold Monster",
    "level": 5,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (a small, straight piece of iron)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges a una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Sabiduría o queda paralizado durante la duración. Este conjuro no afecta a los no-muertos. Al final de cada uno de sus turnos, el objetivo puede hacer otra salvación de Sabiduría; si tiene éxito, el conjuro termina para él.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, puedes tener como objetivo a una criatura adicional por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-holy-weapon",
    "name": "Arma Sagrada",
    "nameEn": "Holy Weapon",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Imbuyes un arma que sostengas o toques con poder sagrado. Hasta que termine el conjuro, el arma emite luz brillante en un radio de 30 pies y luz tenue 30 pies adicionales. Además, los ataques de arma infligen 2d8 de daño radiante adicional al impactar. Como acción adicional, puedes descartar el conjuro para hacer estallar una llamarada de luz cegadora que inflige 4d8 de daño radiante y ciega a los enemigos cercanos que fallen una salvación de Constitución.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-immolation",
    "name": "Inmolación",
    "nameEn": "Immolation",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Llamas abrasadoras envuelven a una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Destreza. Recibe 8d6 de daño de fuego si falla la salvación, o la mitad de daño si tiene éxito. Si falla la salvación, continúa ardiendo durante la duración, recibiendo 4d6 de daño de fuego al final de cada uno de sus turnos a menos que supere una tirada de salvación de Destreza.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-infernal-calling",
    "name": "Llamada Infernal",
    "nameEn": "Infernal Calling",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "90 pies",
    "components": "V, S, M (un rubí por valor de al menos 1.000 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Pronuncias oscuras palabras abismales para invocar a un diablo de los Nueve Infiernos. Aparece en un espacio desocupado a 90 pies o menos de ti. El diablo es de valor de desafío 6 o inferior. Puedes intentar ordenarle o pactar con él realizando pruebas opuestas de Carisma (Persuasión o Intimidación) contra su Carisma (Perspicacia). Si no logras mantener el control o mantenerlo a raya, el diablo puede ignorar tus órdenes o atacarte.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el valor de desafío máximo del diablo aumenta en 1 por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-insect-plague",
    "name": "Plaga de Insectos",
    "nameEn": "Insect Plague",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V, S, M (unos granos de azúcar, unos granos de cereal y una pizca de grasa)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Un enjambre pululante de insectos mordedores e hirvientes llena una esfera de 20 pies de radio centrada en un punto que elijas dentro del alcance. El área está ligeramente oscurecida y se convierte en terreno difícil. Cuando el enjambre aparece y cuando una criatura entra en el área o termina su turno en ella, debe hacer una tirada de salvación de Constitución, sufriendo 4d10 de daño perforante si falla, o la mitad si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el daño aumenta en 1d10 por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Hechicero"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-legend-lore",
    "name": "Saber Popular",
    "nameEn": "Legend Lore",
    "level": 5,
    "school": "Adivinación",
    "castingTime": "10 minutos",
    "range": "Lanzador",
    "components": "V, S, M (incienso por valor de al menos 250 po (consumido) y cuatro tiras de marfil por valor de al menos 50 po cada una)",
    "duration": "Instantáneo",
    "description": "Nombra o describe a una persona, lugar u objeto histórico. El conjuro trae a tu mente un resumen de las historias y leyendas que rodean a esa entidad importante. La información puede consistir en historias olvidadas, versos crípticos o incluso conocimientos nunca revelados sobre el objeto o ser legendario.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-maelstrom",
    "name": "Vórtice",
    "nameEn": "Maelstrom",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (papel o una hoja en forma de embudo)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una masa arremolinada de agua de 30 pies de radio y 5 pies de profundidad aparece centrada en un punto en el suelo o en una masa de agua dentro del alcance. El área es terreno difícil. Cuando una criatura entra en el área o empieza su turno en ella, debe hacer una tirada de salvación de Fuerza. Si falla, recibe 6d6 de daño contundente y es arrastrada 10 pies hacia el centro del vórtice.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-mass-cure-wounds",
    "name": "Curar Heridas en Masa",
    "nameEn": "Mass Cure Wounds",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Una ola de energía sanadora emana de un punto a tu elección dentro del alcance. Eliges hasta seis criaturas en una esfera de 30 pies de radio centrada en ese punto. Cada criatura recupera una cantidad de puntos de golpe igual a 3d8 + tu modificador de característica de lanzamiento de conjuros. Este conjuro no tiene efecto sobre no-muertos ni autómatas.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, la curación aumenta en 1d8 por cada nivel de espacio por encima de nivel 5.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mislead",
    "name": "Despistar",
    "nameEn": "Mislead",
    "level": 5,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Te vuelves invisible al mismo tiempo que un duplicado ilusorio de ti aparece en tu espacio actual. Eres invisible durante la duración, o hasta que ataques o lances un conjuro. Puedes usar una acción en cada uno de tus turnos para mover a tu duplicado ilusorio hasta el doble de tu velocidad y hacer que gesticule, hable y actúe de manera convincente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-modify-memory",
    "name": "Modificar Memoria",
    "nameEn": "Modify Memory",
    "level": 5,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Intentas remodelar los recuerdos de otra criatura. Una criatura que puedas ver dentro del alcance debe superar una tirada de salvación de Sabiduría o queda incapacitada y hechizada por ti durante la duración. Puedes alterar sus recuerdos sobre un evento de no más de 10 minutos de duración que haya ocurrido en las últimas 24 horas, eliminándolo por completo, cambiándolo o implantando un recuerdo falso.",
    "higherLevels": "Lanzar este conjuro con un espacio de nivel 6 te permite modificar un recuerdo de hasta hace 7 días; con nivel 7, hasta hace 30 días; con nivel 8, hasta hace 1 año; y con nivel 9, cualquier recuerdo en el pasado de la criatura.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-negative-energy-flood",
    "name": "Torrente de Energía Negativa",
    "nameEn": "Negative Energy Flood",
    "level": 5,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, M (un hueso roto y un cuadrado de seda negra)",
    "duration": "Instantáneo",
    "description": "Canalizas las energías oscuras del Plano de Energía Negativa hacia una criatura que puedas ver dentro del alcance. Si el objetivo es un ser vivo, debe superar una tirada de salvación de Constitución o sufrir 5d12 de daño necrótico (o la mitad si tiene éxito). Si este daño mata a la criatura, se alza inmediatamente como un zombi bajo tu control permanente. Si el objetivo es un no-muerto, en su lugar gana la mitad del daño resultante en puntos de golpe temporales.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-passwall",
    "name": "Traspasar Muros",
    "nameEn": "Passwall",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una pizca de semillas de sésamo)",
    "duration": "1 hora",
    "description": "Se abre un pasaje a través de una superficie de madera, yeso o piedra (como una pared, techo o suelo) dentro del alcance que puedas ver. El pasaje tiene hasta 5 pies de ancho, 8 pies de alto y 20 pies de profundidad. El pasaje no crea inestabilidad estructural y dura hasta que termine el conjuro, momento en el cual la abertura se cierra expulsando de forma segura a cualquier criatura en su interior.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-planar-binding",
    "name": "Ligadura de los Planos",
    "nameEn": "Planar Binding",
    "level": 5,
    "school": "Abjuración",
    "castingTime": "1 hora",
    "range": "60 pies",
    "components": "V, S, M (una joya por valor de al menos 1.000 po, consumida por el conjuro)",
    "duration": "24 horas",
    "description": "Con este conjuro intentas vincular a tu servicio a un celestial, un elemental, una fata o un infernal. La criatura debe estar dentro del alcance durante todo el tiempo de lanzamiento. Al terminar el lanzamiento, el objetivo debe hacer una tirada de salvación de Carisma. Si falla, queda obligado a servirte durante la duración. Si la criatura fue invocada por otro conjuro, la duración de ese conjuro se extiende hasta coincidir con la de este.",
    "higherLevels": "Lanzar este conjuro con un espacio de nivel 6 aumenta la duración a 10 días; con nivel 7, a 30 días; con nivel 8, a 180 días; y con nivel 9, a 1 año y 1 día.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-raise-dead",
    "name": "Revivir",
    "nameEn": "Raise Dead",
    "level": 5,
    "school": "Nigromancia",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (un diamante que valga al menos 500 po, que el conjuro consume)",
    "duration": "Instantáneo",
    "description": "Devuelves la vida a una criatura muerta que toques, siempre que no lleve muerta más de 10 días. Si el alma de la criatura está libre y dispuesta a regresar, la criatura vuelve a la vida con 1 punto de golpe. Este conjuro neutraliza venenos y cura enfermedades no mágicas normales presentes al momento de la muerte, pero no recupera partes corporales perdidas ni quita maldiciones. Regresar de entre los muertos es agotador: el objetivo sufre un penalizador de -4 a todas las tiradas de ataque, tiradas de salvación y pruebas de característica, reduciéndose en 1 por cada descanso largo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladín"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-rarys-telepathic-bond",
    "name": "Vínculo Telepático de Rary",
    "nameEn": "Rary's Telepathic Bond",
    "level": 5,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (trozos de cáscara de huevo de dos tipos diferentes de criaturas)",
    "duration": "1 hora",
    "description": "Creas un vínculo telepático entre hasta ocho criaturas voluntarias a tu elección a 30 pies o menos de ti durante la duración. Las criaturas con un valor de Inteligencia de 2 o menos no se ven afectadas. Hasta que termine el conjuro, los objetivos pueden comunicarse telepáticamente de forma instantánea a través del vínculo sin importar la distancia, siempre que permanezcan en el mismo plano de existencia.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-reincarnate",
    "name": "Reencarnar",
    "nameEn": "Reincarnate",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (aceites raros y ungüentos por valor de al menos 1.000 po, consumidos por el conjuro)",
    "duration": "Instantáneo",
    "description": "Tocas a un humanoide muerto o un trozo de su cuerpo que no lleve muerto más de 10 días. Si su alma está libre y dispuesta, el conjuro forma un nuevo cuerpo adulto y devuelve el alma a la vida en él. Determinas la nueva raza del objetivo al azar (humano, elfo, enano, mediano, orco, tiefling, etc.). La criatura retiene sus recuerdos y capacidades de clase, pero sus rasgos raciales cambian a los del nuevo cuerpo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-scrying",
    "name": "Adivinación (Scrying)",
    "nameEn": "Scrying",
    "level": 5,
    "school": "Adivinación",
    "castingTime": "10 minutos",
    "range": "Personal",
    "components": "V, S, M (un foco por valor de al menos 1.000 po como un espejo o una bola de cristal)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas un sensor invisible que te permite ver y escuchar a una criatura específica en cualquier lugar del mismo plano de existencia. El objetivo debe superar una salvación de Sabiduría modificada por tu familiaridad y conexiones físicas con él.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-seeming",
    "name": "Apariencia",
    "nameEn": "Seeming",
    "level": 5,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "8 horas",
    "description": "Este conjuro te permite cambiar la apariencia visual de cualquier cantidad de criaturas que puedas ver dentro del alcance. Das a cada objetivo una apariencia ilusoria nueva a tu elección durante la duración. Una criatura no voluntaria puede hacer una tirada de salvación de Carisma para anular el efecto. La magia altera la apariencia de la ropa, armadura, armas y rasgos físicos sin cambiar las estadísticas reales.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-skill-empowerment",
    "name": "Empoderamiento de Habilidad",
    "nameEn": "Skill Empowerment",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Tocas a una criatura voluntaria y profundizas mágicamente su destreza en una habilidad. Eliges una habilidad en la que la criatura ya sea competente. Hasta que termine el conjuro, el bonificador por competencia de la criatura se duplica para cualquier prueba de característica que realice usando la habilidad elegida.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-steel-wind-strike",
    "name": "Golpe de Viento de Acero",
    "nameEn": "Steel Wind Strike",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "S, M (un arma cuerpo a cuerpo por valor de al menos 1 pp)",
    "duration": "Instantáneo",
    "description": "Te transformas en un destello de acero y cortas el aire velozmente. Eliges hasta 5 criaturas en el alcance y haces un ataque de conjuro cuerpo a cuerpo contra cada una. Al impactar, el objetivo sufre 6d10 de daño de fuerza, y puedes teletransportarte a 5 pies de uno de ellos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Explorador",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-summon-celestial",
    "name": "Invocar Celestial",
    "nameEn": "Summon Celestial",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (un relicario de oro por valor de al menos 500 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu celestial en un espacio desocupado que puedas ver a 90 pies o menos de ti. Utiliza el perfil de Espíritu Celestial (Vengador o Defensor). El celestial es un aliado para ti y tus compañeros, comparte tu iniciativa actuando inmediatamente después de ti y obedece tus órdenes verbales.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, ciertas estadísticas de la criatura aumentan según el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Paladín"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-summon-draconic-spirit",
    "name": "Invocar Espíritu Dracónico",
    "nameEn": "Summon Draconic Spirit",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un objeto con la imagen grabada de un dragón por valor de al menos 500 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu dracónico en un espacio desocupado a 60 pies o menos de ti. Utiliza el perfil de Espíritu Dracónico (Cromático, Metálico o Gema). Obedece tus órdenes verbales en combate y comparte tu iniciativa de batalla inmediatamente después de ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, ciertas estadísticas en su perfil aumentan según el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-swift-quiver",
    "name": "Carcaj Veloz",
    "nameEn": "Swift Quiver",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Toque",
    "components": "V, S, M (un carcaj que contenga al menos una pieza de munición)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Transmutas tu carcaj para que produzca una cantidad interminable de flechas o virotes no mágicos. Mientras dure el conjuro, puedes realizar dos ataques con un arma a distancia que use munición del carcaj como acción adicional en cada uno de tus turnos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-synaptic-static",
    "name": "Estática Sináptica",
    "nameEn": "Synaptic Static",
    "level": 5,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Proyectas una explosión de energía psíquica en una esfera de 20 pies de radio. Cada criatura debe superar una salvación de Inteligencia o sufrir 8d6 de daño psíquico y restar un d6 de todas sus tiradas de ataque, pruebas de habilidad y salvaciones de concentración durante 1 minuto.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-telekinesis",
    "name": "Telequinesis",
    "nameEn": "Telekinesis",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Obtienes la capacidad de mover o manipular criaturas u objetos con el poder del pensamiento. Al lanzar el conjuro y como tu acción en cada turno mientras dure la concentración, puedes ejercer tu poder telepático sobre una criatura u objeto que puedas ver a 60 pies o menos de ti. Puedes mover a una criatura que falle una salvación de Fuerza hasta 30 pies en cualquier dirección, o mover y manipular un objeto de hasta 1.000 libras.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-teleportation-circle",
    "name": "Círculo de Teletransporte",
    "nameEn": "Teleportation Circle",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "10 pies",
    "components": "V, M (tizas e tintas raras infundidas con gemas preciosas por valor de 50 po, consumidas por el conjuro)",
    "duration": "1 asalto",
    "description": "Trazas un círculo de 10 pies de diámetro en el suelo con tintas mágicas que abre un portal instantáneo a un círculo de teletransporte permanente cuyos sellos conozcas en el mismo plano de existencia. Cualquier criatura que entre en el círculo aparece instantáneamente a 5 pies del círculo de destino. Si lanzas este conjuro en el mismo lugar todos los días durante un año, creas un círculo permanente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-temporal-shunt",
    "name": "Desvío Temporal",
    "nameEn": "Temporal Shunt",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 reacción, cuando una criatura que ves realiza una tirada de ataque o comienza a lanzar un conjuro",
    "range": "120 pies",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "Siempre que una criatura que puedas ver a 120 pies o menos de ti realice una tirada de ataque o comience a lanzar un conjuro, puedes usar tu reacción para lanzarla temporalmente hacia adelante en el tiempo. El objetivo debe superar una tirada de salvación de Sabiduría o desaparecer hasta el inicio de su siguiente turno, momento en el cual reaparece en el mismo espacio o en el espacio desocupado más cercano.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, puedes tener como objetivo a una criatura adicional por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-transmute-rock",
    "name": "Transmutar Roca",
    "nameEn": "Transmute Rock",
    "level": 5,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (arcilla y agua)",
    "duration": "Hasta disiparse",
    "description": "Eliges un área de piedra o barro de hasta un cubo de 40 pies dentro del alcance. Puedes transformar roca no mágica en barro espeso y pegajoso (reduciendo la velocidad de movimiento a una cuarta parte y forzando salvaciones de Fuerza para evitar quedar atrapado), o transformar barro blando en roca sólida (atrapando y dañando a criaturas atrapadas que fallen una salvación de Destreza).",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Artífice",
      "Druida",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-tree-stride",
    "name": "Zancada Arbórea",
    "nameEn": "Tree Stride",
    "level": 5,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Obtienes la capacidad de entrar en un árbol y emerger de otro árbol de la misma especie a 500 pies o menos usando 5 pies de tu movimiento. Puedes usar esta capacidad de paso entre árboles una vez por turno durante la duración del conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wall-of-force",
    "name": "Muro de Fuerza",
    "nameEn": "Wall of Force",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (una pizca de polvo de cristal)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Un muro invisible de fuerza surge en un punto que elijas. Nada puede atravesar físicamente el muro; es inmune a todo daño y no puede ser disipado por Disipar Magia. Solo Desintegrar lo destruye de inmediato.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wall-of-light",
    "name": "Muro de Luz",
    "nameEn": "Wall of Light",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un espejo de mano)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Un muro resplandeciente de luz radiante aparece en un punto dentro del alcance. El muro tiene hasta 60 pies de largo, 10 pies de alto y 5 pies de grosor. Bloquea la línea de visión y emite luz brillante a 120 pies. Las criaturas en su espacio deben superar una tirada de salvación de Constitución o sufrir 4d8 de daño radiante y quedar cegadas por 1 minuto. Como acción, puedes disparar un rayo de luz desde el muro a una criatura a 60 pies, infligiendo 4d8 de daño radiante al impactar.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 6 o superior, el daño del muro y de los rayos aumenta en 1d8 por cada nivel por encima de nivel 5.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-wall-of-stone",
    "name": "Muro de Piedra",
    "nameEn": "Wall of Stone",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un pequeño bloque de granito)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Una pared no mágica de roca sólida surge de una superficie de piedra dentro del alcance. La pared está compuesta por hasta diez paneles contiguos de 10 pies por 10 pies y 6 pulgadas de grosor (o paneles de 10 por 20 pies y 3 pulgadas de grosor). La pared tiene CA 15 y 30 puntos de golpe por cada panel de 10 pies de sección. Si mantienes la concentración durante toda la duración (10 minutos), la pared se vuelve permanente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Artífice",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wrath-of-nature",
    "name": "Ira de la Naturaleza",
    "nameEn": "Wrath Of Nature",
    "level": 5,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Llamas a los espíritus de la naturaleza para que despierten a los árboles, la maleza y las rocas en un cubo de 60 pies dentro del alcance. El suelo se convierte en terreno difícil para tus enemigos. Al inicio de cada uno de sus turnos, la maleza intenta apresar a tus enemigos; las rocas arrojadas por las raíces azotan a criaturas infligiendo daño contundente; y como acción adicional puedes hacer que un árbol golpee a una criatura a 10 pies de él infligiendo 4d6 de daño contundente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Explorador"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-arcane-gate",
    "name": "Portal Arcano",
    "nameEn": "Arcane Gate",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "500 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas dos portales de teletransporte bidireccionales en dos puntos del suelo que puedas ver dentro del alcance, a una distancia de hasta 500 pies el uno del otro. Cada portal es un anillo circular de 10 pies de diámetro que flota perpendicular al suelo. Cualquier criatura u objeto que entre por un portal emerge instantáneamente por el otro como si fueran adyacentes.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blade-barrier",
    "name": "Barrera de Cuchillas",
    "nameEn": "Blade Barrier",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas un muro vertical de cuchillas afiladas y giratorias de energía pura dentro del alcance. El muro puede tener hasta 100 pies de largo, 20 pies de alto y 5 pies de grosor, o ser un muro circular de hasta 60 pies de diámetro, 20 pies de alto y 5 pies de grosor. Proporciona tres cuartos de cobertura y el área es terreno difícil. Cualquier criatura que entre o empiece su turno en el muro debe hacer una tirada de salvación de Destreza, sufriendo 6d10 de daño cortante si falla, o la mitad si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-bones-of-the-earth",
    "name": "Huesos de la Tierra",
    "nameEn": "Bones of the Earth",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Haces brotar hasta seis pilares de roca del suelo en puntos que puedas ver a 120 pies o menos de ti. Cada pilar es un cilindro de 5 pies de diámetro y hasta 30 pies de altura. Si un pilar surge debajo de una criatura, la criatura debe superar una tirada de salvación de Destreza o es impulsada hacia arriba por el pilar; si golpea el techo o un obstáculo, sufre 6d6 de daño contundente y queda aprisionada.",
    "higherLevels": "Lanzar este conjuro con un espacio de nivel 7 o superior permite crear dos pilares adicionales por cada nivel por encima de nivel 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-chain-lightning",
    "name": "Cadena de Relámpagos",
    "nameEn": "Chain Lightning",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (un poco de piel; un trozo de ámbar, vidrio o una varilla de cristal; y tres alfileres de plata)",
    "duration": "Instantáneo",
    "description": "Disparas un relámpago devastador hacia un objetivo que puedas ver dentro del alcance. Tres rayos secundarios surgen del objetivo hacia hasta otros tres objetivos a 30 pies o menos del primero. Cada objetivo debe hacer una tirada de salvación de Destreza. Una criatura recibe 10d8 de daño de relámpago si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, un rayo adicional surge hacia otro objetivo por cada nivel por encima de nivel 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-circle-of-death",
    "name": "Círculo de Muerte",
    "nameEn": "Circle of Death",
    "level": 6,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (polvo de una perla negra machacada por valor de al menos 500 po)",
    "duration": "Instantáneo",
    "description": "Una esfera de energía negativa de 60 pies de radio surge de un punto dentro del alcance. Cada criatura en esa área debe hacer una tirada de salvación de Constitución. Una criatura recibe 8d6 de daño necrótico si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, el daño aumenta en 2d6 por cada nivel de espacio por encima de nivel 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-fey",
    "name": "Conjurar Ser Feérico",
    "nameEn": "Conjure Fey",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu feérico o una bestia en un espacio desocupado a 90 pies o menos de ti. La criatura tiene un valor de desafío de 6 o inferior. Es amistosa contigo y tus compañeros durante la duración, actuando en su propio turno. Si pierdes la concentración, el ser feérico no desaparece; en su lugar se vuelve hostil hacia ti y puede atacarte.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, el valor de desafío máximo aumenta en 1 por cada nivel por encima de nivel 6.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-contingency",
    "name": "Contingencia",
    "nameEn": "Contingency",
    "level": 6,
    "school": "Evocación",
    "castingTime": "10 minutos",
    "range": "Lanzador",
    "components": "V, S, M (una estatuilla de ti mismo tallada en marfil y decorada con gemas por valor de al menos 1.500 po)",
    "duration": "10 días",
    "description": "Eliges un conjuro de nivel 5 o menor que puedas lanzar, que tenga un tiempo de lanzamiento de 1 acción y que pueda tenerte a ti como objetivo. Lanzas ese conjuro contingente como parte del lanzamiento de Contingencia, gastando los espacios de ambos conjuros. Describes una circunstancia desencadenante específica. Cuando esa condición se cumple por primera vez durante los siguientes 10 días, el conjuro contingente surte efecto de inmediato sobre ti.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-create-homunculus",
    "name": "Crear Homúnculo",
    "nameEn": "Create Homunculus",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (arcilla, ceniza y raíz de mandrágora (consumidas por el conjuro), y una daga con incrustaciones de joyas por valor de al menos 1.000 po)",
    "duration": "Instantáneo",
    "description": "Realizas un ritual alquímico infundiendo un molde de arcilla, cenizas y tu propia sangre (sacrificando 1d4 de tus puntos de golpe máximos) para crear un homúnculo fiel. El homúnculo es una criatura diminuta leal a ti en todo momento. Comparten un vínculo telepático sin límite de distancia mientras estén en el mismo plano, y puedes percibir a través de sus sentidos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-create-undead",
    "name": "Crear Muertos Vivientes",
    "nameEn": "Create Undead",
    "level": 6,
    "school": "Nigromancia",
    "castingTime": "1 minuto",
    "range": "10 pies",
    "components": "V, S, M (una vasija de arcilla con tierra de tumba, una vasija con agua salobre y una piedra de ónice negro de 150 po por cada cadáver)",
    "duration": "Instantáneo",
    "description": "Puedes lanzar este conjuro solo de noche. Eliges hasta tres cadáveres de humanoides Medianos o Pequeños a 10 pies o menos de ti. Cada cadáver se alza como un gul bajo tu control durante 24 horas. Puedes renovar el control sobre hasta tres guls lanzando este conjuro de nuevo antes de que transcurran las 24 horas.",
    "higherLevels": "Lanzar con un espacio de nivel 7 te permite animar o controlar 4 guls; con nivel 8 te permite controlar 5 guls, 2 espectros o 2 necrófagos; con nivel 9 te permite controlar 6 guls, 3 espectros, 3 necrófagos o 2 momias.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-disintegrate",
    "name": "Desintegrar",
    "nameEn": "Disintegrate",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un imán y polvo de cuarzo)",
    "duration": "Instantáneo",
    "description": "Un fino rayo verde surge de tu dedo. El objetivo debe superar una salvación de Destreza o sufrir 10d6 + 40 de daño de fuerza. Si este daño reduce a la criatura a 0 puntos de golpe, queda desintegrada en un montón de cenizas finas.",
    "higherLevels": "El daño aumenta en 3d6 por cada nivel de ranura por encima de 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-drawmijs-instant-summons",
    "name": "Invocación Instantánea de Drawmij",
    "nameEn": "Drawmij's Instant Summons",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S, M (un zafiro por valor de al menos 1.000 po)",
    "duration": "Hasta disiparse",
    "description": "Tocas un objeto que pese 10 libras o menos y cuya mayor dimensión sea de no más de 6 pies, marcándolo místicamente con un zafiro de 1.000 po. En cualquier momento posterior, puedes usar una acción para romper el zafiro y nombrar el objeto: el objeto aparece instantáneamente en tu mano sin importar la distancia, incluso a través de planos. Si otra criatura sostiene el objeto, el conjuro te revela quién lo sostiene y su ubicación exacta.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-druid-grove",
    "name": "Arboleda Druídica",
    "nameEn": "Druid Grove",
    "level": 6,
    "school": "Abjuración",
    "castingTime": "10 minutos",
    "range": "Toque",
    "components": "V, S, M (muérdago cosechado con una hoz de oro bajo la luna llena, consumido por el conjuro)",
    "duration": "24 horas",
    "description": "Proteges un área natural al aire libre de hasta 90 pies de lado y 30 pies de altura. El área se envuelve en densa niebla mágica que desorienta a intrusos, las plantas crecen para bloquear el paso como terreno difícil impenetrable y puedes animar hasta cuatro árboles como guardianes treant. Si lanzas este conjuro en el mismo lugar todos los días durante un año, el efecto se vuelve permanente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-eyebite",
    "name": "Mal de Ojo",
    "nameEn": "Eyebite",
    "level": 6,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Por la duración del conjuro, tus ojos se transforman en orbes oscuros de pavor. En el turno en que lanzas el conjuro y como una acción en cada uno de tus turnos posteriores hasta que termine, puedes elegir como objetivo a una criatura a 60 pies o menos de ti que puedas ver. Si el objetivo falla una tirada de salvación de Sabiduría, sufre uno de los siguientes efectos a tu elección: Dormir, Preso del Pánico (asustado y obligado a huir), o Enfermar (envenenado con desventaja en ataques y salvaciones).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-find-the-path",
    "name": "Encontrar el Camino",
    "nameEn": "Find the Path",
    "level": 6,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Lanzador",
    "components": "V, S, M (un juego de herramientas de adivinación (huesos, varillas de marfil, cartas o runas) por valor de 100 po y un objeto del lugar)",
    "duration": "Concentración, hasta 1 día",
    "description": "Este conjuro te permite encontrar la ruta física más corta y directa hacia un destino específico con el que estés familiarizado en el mismo plano de existencia. Mientras mantengas la concentración durante la duración, sabes con exactitud la dirección hacia el destino y la mejor ruta a seguir, reconociendo además peligros en el camino directo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-fizbans-platinum-shield",
    "name": "Escudo de Platino de Fizban",
    "nameEn": "Fizban's Platinum Shield",
    "level": 6,
    "school": "Abjuración",
    "castingTime": "1 acción adicional",
    "range": "60 pies",
    "components": "V, S, M (una escama de dragón bañada en platino por valor de al menos 500 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas un campo centelleante de energía dracónica plateada que rodea a una criatura a 60 pies o menos de ti (o a ti mismo). Mientras esté protegida por el escudo, la criatura tiene media cobertura, resistencia al daño de ácido, frío, fuego, relámpago y veneno, y obtiene el rasgo Evasión de los pícaros contra efectos que permitan una salvación de Destreza. Como acción adicional en turnos posteriores, puedes mover el escudo a otra criatura.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-flesh-to-stone",
    "name": "Carne a Piedra",
    "nameEn": "Flesh to Stone",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una pizca de cal, agua y tierra)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Intentas transformar a una criatura que puedas ver dentro del alcance en piedra. Si el cuerpo del objetivo está hecho de carne, debe hacer una tirada de salvación de Constitución. Si falla, queda impedido mientras su carne empieza a endurecerse. Al final de cada uno de sus turnos debe repetir la salvación. Si acumula tres éxitos, el efecto termina. Si acumula tres fallos, queda petrificado permanentemente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-forbiddance",
    "name": "Prohibición",
    "nameEn": "Forbiddance",
    "level": 6,
    "school": "Abjuración",
    "castingTime": "10 minutos",
    "range": "Toque",
    "components": "V, S, M (una pizca de agua bendita, incienso raro y rubí en polvo por valor de al menos 1.000 po)",
    "duration": "1 día",
    "description": "Proteges un área de hasta 40.000 pies cuadrados de superficie y 30 pies de altura contra viajes planares y tipos de criaturas seleccionadas. Las criaturas no pueden entrar en el área mediante teletransporte ni portales planares. Además, daña a celestiales, elementales, fatas, infernales o no-muertos seleccionados con 5d10 de daño radiante o necrótico cada turno que comiencen dentro del área.",
    "higherLevels": "",
    "ritual": true,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-globe-of-invulnerability",
    "name": "Globo de Invulnerabilidad",
    "nameEn": "Globe of Invulnerability",
    "level": 6,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (radio de 10 pies)",
    "components": "V, S, M (una cuenta de vidrio o cristal que se rompe cuando termina el conjuro)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una barrera brillante de 10 pies de radio aparece a tu alrededor y permanece fija en tu posición durante la duración. Cualquier conjuro de nivel 5 o inferior lanzado desde fuera de la barrera no puede afectar a nada ni a nadie dentro de ella, ni siquiera si se lanza usando un espacio de nivel superior. Los conjuros de nivel 6 o superior no se ven afectados.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, la barrera bloquea conjuros de un nivel igual o inferior al nivel del espacio utilizado menos 1.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-gravity-fissure",
    "name": "Fisura Gravitacional",
    "nameEn": "Gravity Fissure",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (línea de 100 pies)",
    "components": "V, S, M (un puñado de limaduras de hierro)",
    "duration": "Instantáneo",
    "description": "Manifestas una línea de fuerza gravitacional aplastante de 100 pies de largo y 5 pies de ancho en una dirección que elijas. Cada criatura en la línea debe superar una tirada de salvación de Constitución o recibir 8d8 de daño por fuerza (la mitad si tiene éxito). Además, cualquier criatura a 10 pies o menos de la línea que no esté en ella es arrastrada hacia la línea y sufre daño si falla la salvación.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, el daño aumenta en 1d8 por cada nivel de espacio por encima de nivel 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-harm",
    "name": "Dañar",
    "nameEn": "Harm",
    "level": 6,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Desatas una enfermedad virulenta y destructiva sobre una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Constitución. Sufre 14d6 de daño necrótico si falla la salvación, o la mitad si tiene éxito. Este daño no puede reducir los puntos de golpe del objetivo a menos de 1. Si falla la salvación, sus puntos de golpe máximos se reducen en una cantidad igual al daño necrótico recibido durante 1 hora.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-heal",
    "name": "Sanar",
    "nameEn": "Heal",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Una oleada de energía positiva inunda a una criatura visible dentro del alcance. Recupera 70 puntos de golpe inmediatamente y pone fin a cualquier efecto de ceguera, sordera y enfermedad que la afecte.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, la cantidad de curación aumenta en 10 por cada nivel de espacio por encima de nivel 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-heroes-feast",
    "name": "Festín de los Héroes",
    "nameEn": "Heroes' Feast",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "10 minutos",
    "range": "30 pies",
    "components": "V, S, M (un cuenco con incrustaciones de gemas por valor de al menos 1.000 po, consumido por el conjuro)",
    "duration": "Instantáneo",
    "description": "Creas un banquete suntuoso para hasta 12 criaturas. Los comensales son curados de todas las enfermedades y venenos, se vuelven inmunes al veneno y al estado asustado, tienen ventaja en salvaciones de Sabiduría y su máximo de puntos de golpe aumenta en 2d10 durante 24 horas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-investiture-of-flame",
    "name": "Investidura de la Llama",
    "nameEn": "Investiture of Flame",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Llamas ardientes envuelven tu cuerpo. Obtienes inmunidad al daño de fuego y resistencia al daño de frío. Cualquier criatura que se mueva a 5 pies o menos de ti por primera vez en un turno o termine su turno allí recibe 1d10 de daño de fuego. Puedes arrojar una línea de fuego de 15 pies de largo y 5 pies de ancho como acción, causando 4d8 de daño de fuego a quienes fallen una salvación de Destreza.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-investiture-of-ice",
    "name": "Investidura del Hielo",
    "nameEn": "Investiture of Ice",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "El hielo cubre tu cuerpo. Obtienes inmunidad al daño de frío y resistencia al daño de fuego. Puedes moverte a través de terreno difícil de hielo o nieve sin gastar movimiento adicional. El suelo en un radio de 10 pies a tu alrededor se vuelve resbaladizo como hielo. Como acción, puedes exhalar un cono de 15 pies de viento gélido que causa 4d6 de daño de frío y reduce la velocidad a la mitad a quienes fallen una salvación de Constitución.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-investiture-of-stone",
    "name": "Investidura de la Piedra",
    "nameEn": "Investiture of Stone",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Tu cuerpo se cubre de roca sólida. Obtienes resistencia al daño contundente, perforante y cortante de ataques no mágicos. Puedes moverte a través de tierra o piedra sólida como si fuera terreno difícil sin desestabilizar el material. Como acción, puedes golpear el suelo para derribar a criaturas a 15 pies de ti que fallen una salvación de Destreza.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-investiture-of-wind",
    "name": "Investidura del Viento",
    "nameEn": "Investiture of Wind",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Vientos impetuosos se arremolinan a tu alrededor. Obtienes una velocidad de vuelo de 60 pies. Los ataques con armas a distancia contra ti se realizan con desventaja. Como acción, puedes desatar una ráfaga de viento en un cubo de 15 pies que causa 2d10 de daño contundente y empuja 20 pies hacia atrás a criaturas que fallen una salvación de Constitución.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-magic-jar",
    "name": "Recipiente Mágico",
    "nameEn": "Magic Jar",
    "level": 6,
    "school": "Nigromancia",
    "castingTime": "1 minuto",
    "range": "Lanzador",
    "components": "V, S, M (una gema, cristal, relicario u otro recipiente ornamental por valor de al menos 500 po)",
    "duration": "Hasta disiparse",
    "description": "Tu cuerpo cae en un estado catatónico mientras tu alma entra en una gema o recipiente de cristal (la jarra mágica). Mientras tu alma esté en el recipiente, puedes proyectar tu alma hasta 100 pies para intentar poseer el cuerpo de cualquier criatura humanoide que puedas percibir. Si el objetivo falla una tirada de salvación de Carisma, tomas el control total de su cuerpo físico, manteniendo tus estadísticas mentales y de clase.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mass-suggestion",
    "name": "Sugestión en Masa",
    "nameEn": "Mass Suggestion",
    "level": 6,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, M (a snake’s tongue and either a bit of honeycomb or a drop of sweet oil)",
    "duration": "24 horas",
    "description": "Sugieres un curso de actividad mediante palabras a hasta doce criaturas que puedas ver dentro del alcance y que puedan oírte y entenderte. Cada criatura debe superar una tirada de salvación de Sabiduría o queda hechizada por ti durante la duración y sigue el curso de acción ordenado si suena razonable.",
    "higherLevels": "Lanzar este conjuro con un espacio de nivel 7 amplía la duración a 10 días; con nivel 8, a 30 días; y con nivel 9, a 1 año y 1 día.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mental-prison",
    "name": "Prisión Mental",
    "nameEn": "Mental Prison",
    "level": 6,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Atrapas la mente de una criatura que puedas ver dentro del alcance en un espacio ilusorio aterrador. El objetivo debe hacer una tirada de salvación de Inteligencia. Si falla, sufre 5d10 de daño psíquico y queda constreñido dentro de la prisión ilusoria, percibiendo que está rodeado de peligros mortales. Si la criatura intenta moverse o atacar a través de la ilusión, sufre 10d10 de daño psíquico adicional y el conjuro termina.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-move-earth",
    "name": "Mover la Tierra",
    "nameEn": "Move Earth",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (una hoja de hierro y una bolsa pequeña con una mezcla de tierras (arcilla, limo y arena))",
    "duration": "Concentración, hasta 2 horas",
    "description": "Eliges un área de terreno de tierra, arena o arcilla de hasta 40 pies de lado dentro del alcance. Puedes remodelar el terreno para excavar zanjas, alzar terraplenes o nivelar colinas a razón de un área de 40 pies cada 10 minutos. Este conjuro es demasiado lento para atrapar o enterrar a criaturas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-otilukes-freezing-sphere",
    "name": "Esfera Congelante de Otiluke",
    "nameEn": "Otiluke's Freezing Sphere",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V, S, M (una pequeña esfera de cristal)",
    "duration": "Instantáneo",
    "description": "Creas un orbe gélido de energía congelante y lo disparas a un punto dentro del alcance, donde explota en una esfera de 60 pies de radio. Cada criatura en el área debe hacer una salvación de Constitución, recibiendo 10d6 de daño de frío si falla, o la mitad si tiene éxito. Si el orbe impacta en una masa de agua, congela la superficie hasta una profundidad de 6 pulgadas en un área cuadrada de 100 pies de lado durante 1 minuto.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, el daño aumenta en 1d6 por cada nivel por encima de nivel 6.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-ottos-irresistible-dance",
    "name": "Danza Irresistible de Otto",
    "nameEn": "Otto's Irresistible Dance",
    "level": 6,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Eliges a una criatura que puedas ver dentro del alcance. La criatura comienza a bailar cómicamente de forma incontrolable, dando saltos y zapateando. La criatura debe gastar todo su movimiento bailando en el mismo lugar y sufre desventaja en tiradas de salvación de Destreza y de ataque, y los ataques contra ella tienen ventaja. Como acción en su turno, puede hacer una salvación de Sabiduría para intentar recuperar el control.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-planar-ally",
    "name": "Aliado del Plano",
    "nameEn": "Planar Ally",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "10 minutos",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Suplicas a una entidad de otro plano (una deidad, un señor elemental o un príncipe infernal) que te envíe ayuda. La entidad envía a un celestial, elemental o infernal fiel a su servicio a un espacio desocupado dentro del alcance. El ser no está obligado a obedecerte a ciegas; debes negociar un pago o tributo a cambio de sus servicios en función de la duración y peligro de la tarea.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-primordial-ward",
    "name": "Custodia Primordial",
    "nameEn": "Primordial Ward",
    "level": 6,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Te envuelves en un manto de energías elementales primordiales. Obtienes resistencia al daño de ácido, frío, fuego, relámpago y trueno. Cuando recibas daño de uno de esos tipos, puedes usar tu reacción para volverte inmune a ese tipo de daño específico hasta el final de tu siguiente turno, tras lo cual el conjuro termina de inmediato.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-programmed-illusion",
    "name": "Ilusión Programada",
    "nameEn": "Programmed Illusion",
    "level": 6,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un poco de vellón y polvo de jade por valor de al menos 25 po)",
    "duration": "Hasta disiparse",
    "description": "Creas una ilusión de un objeto, una criatura o un fenómeno visible en un punto dentro del alcance que parece completamente real. La ilusión permanece inactiva hasta que una condición desencadenante que especificas ocurra. Cuando se activa, la ilusión realiza un espectáculo programado de hasta 5 minutos de duración (con sonido, movimiento y luz) y luego vuelve al estado de reposo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-scatter",
    "name": "Dispersión",
    "nameEn": "Scatter",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "El aire tiembla mientras teleportas a hasta cinco criaturas que puedas ver a 30 pies o menos de ti a espacios desocupados en el suelo que puedas ver a 120 pies o menos de ti. Una criatura no voluntaria puede superar una tirada de salvación de Sabiduría para resistir la teletransportación.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-soul-cage",
    "name": "Jaula de Almas",
    "nameEn": "Soul Cage",
    "level": 6,
    "school": "Nigromancia",
    "castingTime": "1 reacción, cuando un humanoide que puedas ver a 60 pies de ti muere",
    "range": "60 pies",
    "components": "V, S, M (una jaula diminuta de plata por valor de al menos 100 po)",
    "duration": "8 horas",
    "description": "Este conjuro atrapa el alma de un humanoide a 60 pies o menos de ti en el momento exacto de su muerte en una jaula de plata diminuta. Mientras el alma permanezca en la jaula, puedes explotar su energía hasta seis veces para: Robar Vida (curarte 2d8 PG), Preguntar al Alma (hacerle una pregunta que debe responder con la verdad), Tomar Ojos (ver a través de un sensor invisible a 10 pies), o Influir en el Destino (ganar ventaja en una tirada).",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-summon-fiend",
    "name": "Invocar Inmunda",
    "nameEn": "Summon Fiend",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (sangre de humanoide dentro de un vial de rubí por valor de al menos 600 po)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un espíritu inmundo que aparece en un espacio desocupado que puedas ver a 90 pies o menos de ti. Utiliza el perfil de Espíritu Inmundo (Demonio, Diablo o Yugoloth). Es un aliado para ti y tus compañeros, comparte tu iniciativa actuando inmediatamente después de ti y obedece tus órdenes verbales en combate.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, ciertas estadísticas en su perfil aumentan según el nivel del espacio.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-sunbeam",
    "name": "Rayo Solar",
    "nameEn": "Sunbeam",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Personal (línea de 60 pies)",
    "components": "V, S, M (una lupa)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un rayo cegador de luz solar pura emana de tu mano en una línea de 60 pies de largo y 5 pies de ancho. Cada criatura debe superar una salvación de Constitución o sufrir 6d8 de daño radiante y quedar cegada. Puedes lanzar la línea de nuevo como acción en cada turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-tashas-otherworldly-guise",
    "name": "Aspecto Ultraterreno de Tasha",
    "nameEn": "Tasha's Otherworldly Guise",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V, S, M (un objeto grabado con un símbolo de los Planos Exteriores por valor de al menos 500 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Canalizas la magia de los Planos Exteriores para transformarte. Eliges el Plano Superior (Celestial) o el Plano Inferior (Infernal). Te envuelve una armadura etérea: obtienes inmunidad al daño de fuego y veneno (infernal) o radiante y necrótico (celestial), inmunidad al estado envenenado o hechizado, velocidad de vuelo de 40 pies, bonificador de +2 a tu CA y puedes usar tu modificador de lanzamiento para tus ataques de arma con un ataque adicional en tu turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-tensers-transformation",
    "name": "Transformación de Tenser",
    "nameEn": "Tenser's Transformation",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (unos pelos de toro)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Te infundes con resistencia marcial y destreza en combate cuerpo a cuerpo. Hasta que termine el conjuro, obtienes 50 puntos de golpe temporales, ventaja en tiradas de ataque con armas simples y marciales, 2d12 de daño de fuerza adicional en ataques de arma y competencia con todas las armas, armaduras y escudos, así como salvaciones de Fuerza y Constitución. No puedes lanzar conjuros mientras dure la transformación.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-transport-via-plants",
    "name": "Transporte por Plantas",
    "nameEn": "Transport via Plants",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V, S",
    "duration": "1 asalto",
    "description": "Este conjuro crea un enlace mágico entre una planta Grande o mayor dentro de tu alcance y otra planta Grande en cualquier lugar del mismo plano de existencia. Puedes entrar en la primera planta y emerger de la segunda planta usando 5 pies de movimiento durante tu turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-true-seeing",
    "name": "Visión Verdadera",
    "nameEn": "True Seeing",
    "level": 6,
    "school": "Adivinación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un ungüento para los ojos por valor de 25 po elaborado con polvo de hongos, azafrán y grasa, consumido por el conjuro)",
    "duration": "1 hora",
    "description": "Tocas a una criatura voluntaria otorgándole visión verdadera. Durante la duración, el objetivo ve a través de la oscuridad normal y mágica, percibe criaturas y objetos invisibles, detecta automáticamente ilusiones visuales y tiene éxito en salvaciones contra ellas, percibe la forma original de metamorfos y ve hacia el Plano Etéreo, todo ello hasta un alcance de 120 pies.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wall-of-ice",
    "name": "Muro de Hielo",
    "nameEn": "Wall of Ice",
    "level": 6,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un pequeño trozo de cuarzo)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas un muro de hielo sólido sobre una superficie dentro del alcance. Puede ser un muro recto de hasta 100 pies de largo, 10 pies de alto y 1 pie de grosor, o un hemisferio de hasta 20 pies de diámetro. Las criaturas en su espacio cuando aparece deben superar una tirada de salvación de Destreza o sufrir 10d6 de daño de frío. Si se rompe una sección del muro, deja una ráfaga de aire glacial que inflige 5d6 de daño de frío a quien la cruce.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, el daño inicial aumenta en 2d6 y el daño del aire glacial aumenta en 1d6 por cada nivel por encima de nivel 6.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wall-of-thorns",
    "name": "Muro de Espinas",
    "nameEn": "Wall of Thorns",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (un puñado de espinas)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Creas un muro de matorrales y enredaderas espinosas y resistentes en un área dentro del alcance. El muro tiene hasta 60 pies de largo, 10 pies de alto y 5 pies de grosor. El área es terreno difícil impenetrable y entrar o terminar el turno en el muro requiere una tirada de salvación de Destreza, sufriendo 7d8 de daño perforante si falla (o la mitad si tiene éxito), más 7d8 de daño cortante adicional al intentar moverse a través de él.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 7 o superior, ambos tipos de daño aumentan en 1d8 por cada nivel por encima de nivel 6.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wind-walk",
    "name": "Viento Fugaz",
    "nameEn": "Wind Walk",
    "level": 6,
    "school": "Transmutación",
    "castingTime": "1 minuto",
    "range": "30 pies",
    "components": "V, S, M (fuego y agua bendita)",
    "duration": "8 horas",
    "description": "Tú y hasta diez criaturas voluntarias que puedas ver dentro del alcance se transforman en nubes vaporosas de niebla y viento durante la duración. Mientras estén en esta forma vaporosa, tienen una velocidad de vuelo de 300 pies y resistencia al daño de ataques no mágicos. Las criaturas pueden tardar 1 minuto en transformarse de nuevo a su forma física o viceversa.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-word-of-recall",
    "name": "Palabra de Retorno",
    "nameEn": "Word of Recall",
    "level": 6,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "5 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Tú y hasta cinco criaturas voluntarias a 5 pies o menos de ti sois transportados instantáneamente a un santuario previamente consagrado que hayas designado con este conjuro. Si lanzas este conjuro sin haber consagrado previamente un santuario en un templo de tu deidad, el conjuro no tiene efecto.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-conjure-celestial",
    "name": "Conjurar Celestial",
    "nameEn": "Conjure Celestial",
    "level": 7,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "90 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Invocas a un celestial de valor de desafío 4 o inferior (como un pegaso o un couatl) en un espacio desocupado que puedas ver a 90 pies o menos de ti. El celestial es amistoso contigo y tus compañeros durante la duración y obedece tus órdenes verbales en combate. Si pierdes la concentración, el celestial no desaparece; en su lugar se vuelve hostil hacia ti.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 9, puedes invocar a un celestial de valor de desafío 5 o inferior.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-create-magen",
    "name": "Crear Magen",
    "nameEn": "Create Magen",
    "level": 7,
    "school": "Transmutación",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (un vial de azogue de 500 po y un muñeco humano a tamaño real (ambos consumidos), y una vara intrincada de cristal de 1.500 po (no consumida))",
    "duration": "Instantáneo",
    "description": "Realizas un ritual oscuro y misterioso usando un muñeco de tamaño humano y cristal para crear un magen: un sirviente humanoide artificial creado mediante magia antigua que te servirá de por vida con obediencia absoluta hasta ser destruido. Lanzar este conjuro reduce tus puntos de golpe máximos en una cantidad igual al valor de desafío del magen creado (1, 2 o 3), una reducción que solo puede revertirse con un conjuro de Deseo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Icewind Dale - Rime of the Frostmaiden"
  },
  {
    "id": "spl-crown-of-stars",
    "name": "Corona de Estrellas",
    "nameEn": "Crown of Stars",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "1 hora",
    "description": "Siete motas luminosas con forma de estrellas enanas comienzan a orbitar alrededor de tu cabeza en un radio de 5 pies. Emiten luz brillante a 30 pies y tenue otros 30 pies. Como acción adicional en tu turno, puedes enviar una de las estrellas a impactar a una criatura u objeto a 120 pies o menos de ti. Haces un ataque de conjuro a distancia; con un impacto, el objetivo recibe 4d12 de daño radiante.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 8 o superior, el número de estrellas creadas aumenta en dos por cada nivel por encima de nivel 7.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-delayed-blast-fireball",
    "name": "Bola de Fuego de Explosión Retardada",
    "nameEn": "Delayed Blast Fireball",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (una pequeña bola de guano de murciélago y azufre)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un haz de luz brillante surge de tu dedo índice hacia un punto dentro del alcance, condensándose en una cuenta brillante y ardiente durante la duración. Cuando el conjuro termina (bien porque tu concentración se interrumpe o porque decides detonarla con una acción), la cuenta estalla en un rugido de llamas en una esfera de 20 pies de radio. Cada criatura en el área debe hacer una salvación de Destreza, sufriendo un daño de fuego de 12d6 + 1d6 por cada asalto completo que la cuenta haya permanecido sin estallar (hasta un máximo de 10d6 adicionales), o la mitad si tiene éxito.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 8 o superior, el daño base aumenta en 1d6 por cada nivel por encima de nivel 7.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-divine-word",
    "name": "Palabra Divina",
    "nameEn": "Divine Word",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción adicional",
    "range": "30 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Pronuncias una palabra divina repleta del poder de la creación. Cada criatura a tu elección que puedas ver a 30 pies o menos de ti debe hacer una tirada de salvación de Carisma. Si falla la salvación, sufre un efecto basado en sus puntos de golpe actuales:\n• 50 PG o menos: ensordecida durante 1 minuto.\n• 40 PG o menos: ensordecida y cegada durante 10 minutos.\n• 30 PG o menos: cegada, ensordecida y aturdida durante 1 hora.\n• 20 PG o menos: muere instantáneamente.\nAdemás, cualquier celestial, elemental, fata o infernal que falle la salvación es expulsado inmediatamente a su plano de origen.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-draconic-transformation",
    "name": "Transformación Dracónica",
    "nameEn": "Draconic Transformation",
    "level": 7,
    "school": "Transmutación",
    "castingTime": "1 acción adicional",
    "range": "Lanzador",
    "components": "V, S, M (una estatuilla de un dragón por valor de al menos 500 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Te imbuyes del poder majestuoso de los dragones. Hasta que termine el conjuro, obtienes los siguientes beneficios:\n• Visión ciega con un alcance de 30 pies.\n• Velocidad de vuelo de 60 pies con alas espectrales.\n• Como acción adicional en este turno y en turnos posteriores, puedes exhalar energía en un cono de 60 pies; cada criatura en el área debe hacer una tirada de salvación de Destreza, sufriendo 6d8 de daño por fuerza si falla, o la mitad si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Fizban's Treasury of Dragons"
  },
  {
    "id": "spl-dream-of-the-blue-veil",
    "name": "Sueño del Velo Azul",
    "nameEn": "Dream of the Blue Veil",
    "level": 7,
    "school": "Conjuración",
    "castingTime": "10 minutos",
    "range": "20 pies",
    "components": "V, S, M (un objeto mágico o una criatura voluntaria del mundo de destino)",
    "duration": "6 horas",
    "description": "Tú y hasta ocho criaturas voluntarias a tu elección dentro del alcance caen en un trance de 6 horas durante el cual vuestras conciencias viajan a través del Velo Azul a otro mundo en el Plano Material (como Toril, Krynn, Oerth o Eberron). Para lanzar este conjuro debes poseer una muestra mágica o un objeto originario de ese mundo objetivo. Al despertar al finalizar las 6 horas, aparecéis en un espacio seguro en ese mundo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-etherealness",
    "name": "Etéreo",
    "nameEn": "Etherealness",
    "level": 7,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S",
    "duration": "Hasta 8 horas",
    "description": "Entras en las regiones limítrofes del Plano Etéreo, en la zona en que se solapa con tu plano actual. Permaneces en el Plano Etéreo Fronterizo durante la duración o hasta que uses una acción para descartar el conjuro. Mientras estés allí, puedes moverte en cualquier dirección (incluyendo arriba y abajo), atravesar objetos sólidos y criaturas del Plano Material, y percibir el plano natal en blanco y negro hasta 60 pies.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 8 o superior, puedes tener como objetivo a un máximo de tres criaturas voluntarias adicionales por cada nivel por encima de nivel 7.",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-finger-of-death",
    "name": "Dedo de la Muerte",
    "nameEn": "Finger of Death",
    "level": 7,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Envías energía negativa hacia una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Constitución. Recibe 7d8 + 30 de daño necrótico si falla la salvación, o la mitad de daño si tiene éxito. Si este daño mata a un humanoide, este se alza al comienzo de tu siguiente turno como un zombi bajo tu control permanente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-fire-storm",
    "name": "Tormenta de Fuego",
    "nameEn": "Fire Storm",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Una tormenta de rugientes llamas azota el área. La tormenta está compuesta por hasta diez cubos de fuego de 10 pies que puedes organizar como desees dentro del alcance, debiendo estar cada cubo contiguo a al menos otro cubo. Cada criatura en el área debe hacer una tirada de salvación de Destreza. Recibe 7d10 de daño de fuego si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Hechicero"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-forcecage",
    "name": "Jaula de Fuerza",
    "nameEn": "Forcecage",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "100 pies",
    "components": "V, S, M (polvo de rubí por valor de al menos 1.500 po, consumido por el conjuro)",
    "duration": "1 hora",
    "description": "Una prisión inmóvil e invisible de fuerza mágica surge alrededor de un área que elijas dentro del alcance. La prisión puede ser una jaula con barrotes de hasta 20 pies de lado con espacios de 1/2 pulgada entre barrotes, o una caja sólida sin aberturas de hasta 10 pies de lado. La prisión atrapa a cualquier criatura que esté totalmente dentro de su área. La prisión no puede ser disipada por Disipar Magia. Para escapar mediante teletransporte, la criatura debe superar una tirada de salvación de Carisma.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mirage-arcane",
    "name": "Espejismo Arcano",
    "nameEn": "Mirage Arcane",
    "level": 7,
    "school": "Ilusión",
    "castingTime": "10 minutos",
    "range": "A la vista",
    "components": "V, S",
    "duration": "10 días",
    "description": "Haces que un terreno de hasta 1 milla cuadrada parezca, suene, huela e incluso se sienta físicamente como otro tipo de terreno. La ilusión incluye elementos táctiles interactivos: un estanque ilusorio puede ahogar a una criatura, y un muro ilusorio puede ser escalado. Incluso las criaturas con visión verdadera interactúan físicamente con los peligros del terreno mientras dure el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mordenkainens-magnificent-mansion",
    "name": "Mansión Magnífica de Mordenkainen",
    "nameEn": "Mordenkainen's Magnificent Mansion",
    "level": 7,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "300 pies",
    "components": "V, S, M (un portal en miniatura tallado en marfil, un trozo de mármol pulido y una cucharilla de plata, cada uno por valor de al menos 5 po)",
    "duration": "24 horas",
    "description": "Conjuras una puerta extradimensional que conduce a una magnífica mansión de lujo en un semiplano. La mansión puede albergar cómodamente hasta 100 personas y contiene un gran banquete capaz de alimentar a todos sus ocupantes durante 24 horas, atendidos por un centenar de sirvientes casi transparentes. La atmósfera es limpia, cálida y confortable. Tras 24 horas, la mansión expulsa a todos sus ocupantes de vuelta al plano natal.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mordenkainens-sword",
    "name": "Espada de Mordenkainen",
    "nameEn": "Mordenkainen's Sword",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (una espada en miniatura de platino con empuñadura de cobre y zinc por valor de al menos 250 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas un plano de fuerza brillante en forma de espada que flota dentro del alcance. Cuando la espada aparece, realizas un ataque de conjuro cuerpo a cuerpo contra un objetivo a 5 pies o menos de ella. Si impactas, el objetivo recibe 3d10 de daño por fuerza. En turnos posteriores mientras dure el conjuro, puedes usar una acción adicional para mover la espada hasta 20 pies y repetir el ataque.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-plane-shift",
    "name": "Cambio de Plano",
    "nameEn": "Plane Shift",
    "level": 7,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (un diapasón afinado al plano por valor de al menos 250 po)",
    "duration": "Instantáneo",
    "description": "Tú y hasta ocho criaturas voluntarias que se tomen de las manos son transportados a un plano de existencia diferente. Alternativamente, puedes usar el conjuro ofensivamente tocando a un enemigo para desterrarlo a otro plano si falla una salvación de Carisma.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-power-word-pain",
    "name": "Palabra de Poder: Dolor",
    "nameEn": "Power Word: Pain",
    "level": 7,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Pronuncias una palabra de poder que causa una agonía insoportable a una criatura que puedas ver dentro del alcance. Si el objetivo tiene 100 puntos de golpe o menos, queda sometido a un dolor abrumador: su velocidad se reduce a 10 pies, tiene desventaja en tiradas de ataque, pruebas de característica y tiradas de salvación que no sean de Constitución, y debe superar una tirada de salvación de Constitución al final de cada uno de sus turnos para terminar el efecto.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-prismatic-spray",
    "name": "Rociada Prismática",
    "nameEn": "Prismatic Spray",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Lanzador (cono de 60 pies)",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Ocho rayos multicolores de luz surgen de tu mano en un cono de 60 pies. Cada criatura en el cono debe hacer una tirada de salvación de Destreza. Por cada criatura, tira 1d8 para determinar qué color de rayo la golpea (Rojo: 10d6 de fuego; Naranja: 10d6 de ácido; Amarillo: 10d6 de relámpago; Verde: 10d6 de veneno; Azul: 10d6 de frío; Añil: petrificación; Violeta: ceguera y destierro a otro plano; 8: impactada por dos rayos).",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-project-image",
    "name": "Proyectar Imagen",
    "nameEn": "Project Image",
    "level": 7,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "500 millas",
    "components": "V, S, M (una pequeña réplica de ti hecha con materiales por valor de al menos 5 po)",
    "duration": "Concentración, hasta 1 día",
    "description": "Creas una copia ilusoria de ti mismo en un punto dentro del alcance. La copia parece y suena exactamente como tú, pero es intangible. Puedes ver y escuchar a través de los sentidos del duplicado como si estuvieras en su espacio, y puedes proyectar tu voz a través de él. Como acción adicional, puedes mover la imagen ilusoria hasta 60 pies.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-regenerate",
    "name": "Regenerar",
    "nameEn": "Regenerate",
    "level": 7,
    "school": "Transmutación",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S, M (una rueda de oración y agua bendita)",
    "duration": "1 hora",
    "description": "Tocas a una criatura e infundes en ella una poderosa energía regenerativa. El objetivo recupera 4d8 + 15 puntos de golpe de inmediato. Durante la duración del conjuro (1 hora), el objetivo recupera 1 punto de golpe al inicio de cada uno de sus turnos. Además, cualquier extremidad, miembro o parte corporal perdida se regenera por completo transcurridos 2 minutos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-resurrection",
    "name": "Resurrección",
    "nameEn": "Resurrection",
    "level": 7,
    "school": "Nigromancia",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (un diamante por valor de al menos 1.000 po, consumido por el conjuro)",
    "duration": "Instantáneo",
    "description": "Tocas a una criatura muerta hace no más de un siglo. Devuelves la vida al objetivo restaurando todos los puntos de golpe perdidos y regenerando cualquier parte del cuerpo cortada o perdida.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-reverse-gravity",
    "name": "Invertir la Gravedad",
    "nameEn": "Reverse Gravity",
    "level": 7,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "100 pies",
    "components": "V, S, M (una piedra imán y limaduras de hierro)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Este conjuro invierte la gravedad en un cilindro de 50 pies de radio y hasta 100 pies de altura centrado en un punto dentro del alcance. Todas las criaturas y objetos no sujetos caen hacia arriba hasta la cima del cilindro. Si un objeto sólido (como un techo) detiene la caída hacia arriba, las criaturas que impactan reciben el daño de caída normal. Al terminar el conjuro, todos los afectados caen de nuevo hacia abajo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-sequester",
    "name": "Secuestrar",
    "nameEn": "Sequester",
    "level": 7,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S, M (polvo compuesto de diamante, esmeralda, rubí y zafiro por valor de al menos 5.000 po, consumido por el conjuro)",
    "duration": "Hasta disiparse",
    "description": "Al tocar a una criatura u objeto voluntario, lo ocultas por completo del mundo y del tiempo. El objetivo entra en un estado de animación suspendida (el tiempo no transcurre para él y no envejece). Queda invisible, no puede ser percibido por ningún sensor de adivinación ni localizado por ningún conjuro de búsqueda, y permanece en este estado hasta que se cumpla una condición específica que determines al lanzarlo o hasta que sea disipado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-simulacrum",
    "name": "Simulacro",
    "nameEn": "Simulacrum",
    "level": 7,
    "school": "Ilusión",
    "castingTime": "12 horas",
    "range": "Toque",
    "components": "V, S, M (nieve o hielo suficiente para una copia a tamaño natural, pelo o uñas de la criatura y polvo de rubí por valor de 1.500 po esparcido sobre el duplicado y consumido)",
    "duration": "Hasta disiparse",
    "description": "Moldeas un duplicado ilusorio de una bestia o humanoide a partir de nieve o hielo durante 12 horas. El simulacro es una criatura con la mitad de los puntos de golpe máximos del original, sin equipo, y obedece todas tus órdenes verbales. Tiene todas las estadísticas, capacidades y conjuros del original, pero no puede aprender ni recuperar espacios de conjuro gastados.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-symbol",
    "name": "Símbolo",
    "nameEn": "Symbol",
    "level": 7,
    "school": "Abjuración",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S, M (mercurio, fósforo y polvo de diamante y ópalo por valor de al menos 1.000 po, consumidos por el conjuro)",
    "duration": "Hasta disiparse o activarse",
    "description": "Inscribes un glifo dañino en una superficie plana o dentro de un objeto que se pueda cerrar. Cuando se activa por las condiciones que elijas (alguien pasa cerca, abre el objeto o lo toca), el símbolo brilla y llena una esfera de 60 pies de radio con uno de los siguientes efectos a tu elección: Muerte (10d10 necrótico), Discordia, Miedo, Desesperanza, Locura, Dolor, Sueño o Aturdimiento.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-teleport",
    "name": "Teletransporte",
    "nameEn": "Teleport",
    "level": 7,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "10 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Este conjuro te transporta a ti y a hasta ocho criaturas voluntarias a tu elección a cualquier destino que selecciones en el mismo plano de existencia. La precisión del viaje depende de qué tan familiarizado estés con el destino (muy familiar, visto una vez, descrito o falso). Tiras en la tabla de teletransporte para determinar si llegáis al Objetivo, a una zona Similar, Fuera de Objetivo o si sufrís un Percance (sufriendo 3d10 de daño por fuerza).",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-temple-of-the-gods",
    "name": "Templo de los Dioses",
    "nameEn": "Temple of the Gods",
    "level": 7,
    "school": "Conjuración",
    "castingTime": "1 hora",
    "range": "120 pies",
    "components": "V, S, M (un símbolo sagrado por valor de al menos 5 po)",
    "duration": "24 horas",
    "description": "Haces surgir un templo sagrado monumental en un espacio no ocupado que quepa en un cubo de 120 pies dentro del alcance. El templo es indestructible frente a ataques no mágicos. Tipos de criaturas hostiles seleccionadas (celestiales, elementales, fatas, infernales o no-muertos) no pueden entrar en el santuario, y quienes lo intenten sufren desventaja en tiradas de salvación y ataques. Si se lanza todos los días durante un año en el mismo lugar, se vuelve permanente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-tether-essence",
    "name": "Atar Esencia",
    "nameEn": "Tether Essence",
    "level": 7,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un carrete de cordón de platino por valor de al menos 250 po, consumido por el conjuro)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Creas un vínculo espiritual entre dos criaturas que puedas ver a 30 pies o menos una de la otra. Cada criatura debe superar una tirada de salvación de Constitución o quedar vinculada a la otra durante la duración. Mientras estén vinculadas, siempre que una de las criaturas reciba daño o recupere puntos de golpe, la otra criatura recibe exactamente la misma cantidad de daño o recupera la misma cantidad de puntos de golpe.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-whirlwind",
    "name": "Torbellino",
    "nameEn": "Whirlwind",
    "level": 7,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "300 pies",
    "components": "V, M (una pajita)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Un torbellino impetuoso se materializa en un punto dentro del alcance. El torbellino es un cilindro de 10 pies de radio y 30 pies de altura. Cualquier criatura en el espacio del torbellino debe superar una tirada de salvación de Destreza o recibir 10d6 de daño contundente y quedar atrapada y suspendida en el aire dentro de él. Como acción en cada uno de tus turnos, puedes mover el torbellino hasta 30 pies en cualquier dirección.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-abi-dalzims-horrid-wilting",
    "name": "Marchitamiento Horrendo de Abi-Dalzim",
    "nameEn": "Abi-Dalzim's Horrid Wilting",
    "level": 8,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (un trozo de esponja)",
    "duration": "Instantáneo",
    "description": "Extraes la humedad de los cuerpos de todas las criaturas vivas en un cubo de 30 pies centrado en un punto dentro del alcance. Cada criatura en el área debe hacer una tirada de salvación de Constitución (con desventaja para plantas y elementales de agua). Una criatura recibe 12d8 de daño necrótico si falla la salvación, o la mitad de daño si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-animal-shapes",
    "name": "Formas Animales",
    "nameEn": "Animal Shapes",
    "level": 8,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 24 horas",
    "description": "Tu magia transforma a cualquier cantidad de criaturas voluntarias que puedas ver dentro del alcance en bestias Grandes o menores a tu elección (como elefantes, osos polares, tigres dientes de sable o águilas gigantes). Cada objetivo asume las estadísticas de la nueva forma pero conserva su Inteligencia, Sabiduría y Carisma. La transformación dura 24 horas o hasta que la criatura caiga a 0 puntos de golpe.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-antimagic-field",
    "name": "Campo Antimagia",
    "nameEn": "Antimagic Field",
    "level": 8,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador (esfera de 10 pies de radio)",
    "components": "V, S, M (una pizca de hierro pulverizado o limaduras de hierro)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Una esfera invisible de antimagia de 10 pies de radio te rodea y se mueve contigo durante la duración. En su interior, los conjuros no pueden ser lanzados, los objetos mágicos se vuelven mundanos, los conjuros activos son suprimidos y las criaturas invocadas o creadas mágicamente desaparecen temporalmente mientras permanezcan dentro de la esfera.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-antipathy-sympathy",
    "name": "Antipatía/Simpatía",
    "nameEn": "Antipathy/Sympathy",
    "level": 8,
    "school": "Encantamiento",
    "castingTime": "1 hora",
    "range": "60 pies",
    "components": "V, S, M (un trozo de alumbre empapado en vinagre para antipatía, o una gota de miel para simpatía)",
    "duration": "10 días",
    "description": "Atraes o repeles a un tipo específico de criaturas hacia un objetivo (criatura u objeto) dentro del alcance. Si eliges Antipatía, el tipo de criatura siente un impulso irresistible de huir y mantenerse a más de 60 pies del objetivo (asustada si falla una salvación de Sabiduría). Si eliges Simpatía, las criaturas sienten un deseo irresistible de acercarse y permanecer a 60 pies del objetivo mientras dure el conjuro.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-clone",
    "name": "Clon",
    "nameEn": "Clone",
    "level": 8,
    "school": "Nigromancia",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (un diamante de al menos 1.000 po y 1 pulgada cúbica de carne (consumidos), y un recipiente sellable de al menos 2.000 po con salmuera)",
    "duration": "Instantáneo",
    "description": "Cultivas un clon inerte de una criatura viva en un recipiente grande lleno de salmuera a lo largo de 120 días. Si la criatura original muere en cualquier momento tras completarse el crecimiento del clon, su alma se transfiere de inmediato al cuerpo del clon en el recipiente, despertando sana, viva y con todos sus recuerdos y capacidades intactas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-control-weather",
    "name": "Controlar el Clima",
    "nameEn": "Control Weather",
    "level": 8,
    "school": "Transmutación",
    "castingTime": "10 minutos",
    "range": "Lanzador (radio de 5 millas)",
    "components": "V, S, M (incienso encendido y trozos de tierra y madera mezclados en agua)",
    "duration": "Concentración, hasta 8 horas",
    "description": "Tomas el control de las condiciones atmosféricas en un radio de 5 millas a tu alrededor al aire libre. A lo largo de los siguientes minutos u horas, puedes alterar gradualmente la precipitación (de cielo despejado a tormenta torrencial), la temperatura (de calor abrasador a frío polar) y la fuerza del viento (de calma a huracán). El clima alterado se mantiene mientras mantengas la concentración durante hasta 8 horas.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dark-star",
    "name": "Estrella Oscura",
    "nameEn": "Dark Star",
    "level": 8,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (un fragmento de ónice y una gota de sangre del lanzador, ambos consumidos por el conjuro)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas una esfera devastadora de vacío y silencio de 40 pies de radio en un punto dentro del alcance. El área se convierte en oscuridad impenetrable que ni siquiera la visión en la oscuridad puede penetrar, y ningún sonido puede crearse ni escucharse dentro de ella. El área es terreno difícil, y cualquier criatura que empiece su turno allí sufre 8d10 de daño por fuerza tras una salvación de Constitución.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-demiplane",
    "name": "Semiplano",
    "nameEn": "Demiplane",
    "level": 8,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "S",
    "duration": "1 hora",
    "description": "Creas una puerta sombría en una superficie plana dentro del alcance que se abre hacia un semiplano propio: una habitación vacía hecha de madera o piedra de 30 pies en cada dimensión. Cuando termina el conjuro (1 hora), la puerta se cierra y cualquier criatura u objeto dentro del semiplano permanece atrapada en él hasta que se abra otra puerta hacia ese mismo semiplano.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-dominate-monster",
    "name": "Dominar Monstruo",
    "nameEn": "Dominate Monster",
    "level": 8,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 hora",
    "description": "Intentas controlar a cualquier criatura que puedas ver dentro del alcance. Debe superar una tirada de salvación de Sabiduría o queda hechizada por ti durante la duración. Mientras esté hechizada, tienes un vínculo telepático con ella a cualquier distancia en el mismo plano y puedes obligarla a seguir tus órdenes precisas como si fuera tu marioneta.",
    "higherLevels": "Cuando lanzas este conjuro usando un espacio de conjuro de nivel 9, la duración es de hasta 8 horas.",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-feeblemind",
    "name": "Degeneración Mental",
    "nameEn": "Feeblemind",
    "level": 8,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (un puñado de esferas de arcilla, cristal, vidrio o minerales)",
    "duration": "Instantáneo",
    "description": "Destrozas la mente de una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Inteligencia. Si falla, sufre 4d6 de daño psíquico y sus puntuaciones de Inteligencia y Carisma se reducen inmediatamente a 1. La criatura no puede lanzar conjuros, activar objetos mágicos ni comunicarse verbalmente, aunque reconoce a sus amigos y puede protegerlos. Puede repetir la salvación cada 30 días.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-glibness",
    "name": "Labia",
    "nameEn": "Glibness",
    "level": 8,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V",
    "duration": "1 hora",
    "description": "Hasta que termine el conjuro, siempre que realices una prueba de Carisma, puedes sustituir el resultado de la tirada del d20 por un 15. Además, sin importar lo que digas, la magia que determine si estás diciendo la verdad siempre indica que estás diciendo la verdad.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Brujo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-holy-aura",
    "name": "Aura Sagrada",
    "nameEn": "Holy Aura",
    "level": 8,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Personal (radio de 30 pies)",
    "components": "V, S, M (un relicario diminuto por valor de al menos 1.000 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una luz divina emana de ti en un radio de 30 pies. Las criaturas a tu elección tienen ventaja en todas las tiradas de salvación y los ataques contra ellas tienen desventaja. Los no-muertos y demonios que las ataquen en combate cuerpo a cuerpo pueden quedar cegados.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-illusory-dragon",
    "name": "Dragón Ilusorio",
    "nameEn": "Illusory Dragon",
    "level": 8,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Creas la sombra ilusoria y colosal de un dragón temible en un espacio dentro del alcance. Cuando aparece y como acción adicional en tus turnos posteriores, puedes mover al dragón hasta 60 pies y hacer que exhale un cono de 60 pies de aliento elemental (frío, fuego, ácido, relámpago, veneno o necrótico), causando 7d6 de daño del tipo elegido a quienes fallen una salvación de Inteligencia.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-incendiary-cloud",
    "name": "Nube Incendiaria",
    "nameEn": "Incendiary Cloud",
    "level": 8,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una nube arremolinada de brasas ardientes y humo asfixiante de 20 pies de radio aparece en un punto dentro del alcance. El área está fuertemente oscurecida. Cuando la nube aparece y al inicio del turno de una criatura dentro de ella, debe superar una tirada de salvación de Destreza o recibir 10d8 de daño de fuego (la mitad si tiene éxito). La nube se mueve 10 pies en una dirección elegida al inicio de cada uno de tus turnos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-maddening-darkness",
    "name": "Oscuridad Enloquecedora",
    "nameEn": "Maddening Darkness",
    "level": 8,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, M (una gota de brea mezclada con una gota de mercurio)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "La energía mágica de la locura y la oscuridad llena una esfera de 60 pies de radio en un punto dentro del alcance. La oscuridad mágica es impenetrable incluso para la visión en la oscuridad. Gritos guturales y susurros cacofónicos llenan el área: cualquier criatura que empiece su turno en ella debe hacer una tirada de salvación de Sabiduría, sufriendo 8d8 de daño psíquico si falla, o la mitad si tiene éxito.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-maze",
    "name": "Laberinto",
    "nameEn": "Maze",
    "level": 8,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Destierras a una criatura que puedas ver dentro del alcance a un laberinto extradimensional. El objetivo permanece atrapado en él mientras dure el conjuro o hasta que escape. La criatura puede usar una acción en su turno para intentar superar una prueba de Inteligencia CD 20 y escapar del laberinto, reapareciendo en el espacio que ocupaba originalmente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mighty-fortress",
    "name": "Fortaleza Poderosa",
    "nameEn": "Mighty Fortress",
    "level": 8,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "1 milla",
    "components": "V, S, M (un diamante que valga al menos 500 po, que el conjuro consume)",
    "duration": "Instantáneo",
    "description": "Haces brotar del suelo una fortaleza de piedra de 120 pies de lado con cuatro torretas, muros almenados y un patio central fortificado. La fortaleza contiene habitaciones lujosas para hasta 100 personas y siete días de sustento para todos sus ocupantes, servidos por un séquito de sirvientes invisibles. Si se lanza cada siete días durante un año en el mismo lugar, la fortaleza se vuelve permanente.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-mind-blank",
    "name": "Mente en Blanco",
    "nameEn": "Mind Blank",
    "level": 8,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "24 horas",
    "description": "Tocas a una criatura voluntaria. Hasta que el conjuro termine, el objetivo es completamente inmune al daño psíquico, a cualquier efecto que detecte emociones o lea pensamientos, a conjuros de adivinación y al estado de hechizado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-power-word-stun",
    "name": "Palabra de Poder: Aturdir",
    "nameEn": "Power Word: Stun",
    "level": 8,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Pronuncias una palabra de poder que abruma la mente de una criatura que puedas ver dentro del alcance. Si el objetivo tiene 150 puntos de golpe o menos, queda aturdido durante la duración. Al final de cada uno de sus turnos, el objetivo puede hacer una tirada de salvación de Constitución; si tiene éxito, el aturdimiento termina.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-reality-break",
    "name": "Ruptura de la Realidad",
    "nameEn": "Reality Break",
    "level": 8,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un prisma de cristal)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Rompes el tejido mismo del espacio-tiempo alrededor de una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Sabiduría o sufrir visiones de realidades alternas al inicio de cada uno de sus turnos (tirando 1d10: 1-2 visión del pasado [incapacitado y 6d10 psíquico], 3-4 visión del futuro [aturdido], 5-6 visión de la muerte [8d10 necrótico], 7-10 desgarro temporal [10d10 de fuerza]). Puede repetir la salvación al final de su turno.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-sunburst",
    "name": "Explosión Solar",
    "nameEn": "Sunburst",
    "level": 8,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "150 pies",
    "components": "V, S, M (fuego y un trozo de piedra solar)",
    "duration": "Instantáneo",
    "description": "Una brillante y cegadora luz solar brota en un radio de 60 pies centrado en un punto dentro del alcance. Cada criatura en el área debe hacer una salvación de Constitución. Si falla, sufre 12d6 de daño radiante y queda cegada durante 1 minuto. Este conjuro disipa cualquier oscuridad creada por un conjuro en su área y causa desventaja en la salvación a no-muertos y limos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida",
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-telepathy",
    "name": "Telepatía",
    "nameEn": "Telepathy",
    "level": 8,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Ilimitado",
    "components": "V, S, M (un par de anillos de plata entrelazados)",
    "duration": "24 horas",
    "description": "Creas un vínculo telepático con una criatura voluntaria que te resulte familiar en cualquier lugar del mismo plano de existencia. Puedes compartir pensamientos, imágenes y sensaciones sensoriales de manera instantánea y continua durante la duración de 24 horas, sin importar la distancia física que os separe.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-tsunami",
    "name": "Tsunami",
    "nameEn": "Tsunami",
    "level": 8,
    "school": "Conjuración",
    "castingTime": "1 minuto",
    "range": "A la vista",
    "components": "V, S",
    "duration": "Concentración, hasta 6 asaltos",
    "description": "Conjuras una gigantesca muralla de agua de hasta 300 pies de largo, 300 pies de alto y 50 pies de grosor en un punto dentro del alcance. La ola se estrella avanzando 50 pies en una dirección elegida. Cualquier criatura en su camino debe hacer una tirada de salvación de Fuerza, sufriendo 6d10 de daño contundente y siendo arrastrada con la corriente si falla.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-astral-projection",
    "name": "Proyección Astral",
    "nameEn": "Astral Projection",
    "level": 9,
    "school": "Nigromancia",
    "castingTime": "1 hora",
    "range": "10 pies",
    "components": "V, S, M (por cada criatura afectada, un jacinto de al menos 1.000 po y una barra labrada de plata de al menos 100 po, todos consumidos por el conjuro)",
    "duration": "Especial",
    "description": "Tú y hasta ocho criaturas voluntarias proyectáis vuestros cuerpos astrales hacia el Plano Astral, dejando vuestros cuerpos físicos en un estado de animación suspendida. Tu cuerpo astral viaja libremente por el Plano Astral conectado a tu cuerpo material por un cordón de plata brillante. Si tu cuerpo astral cae a 0 puntos de golpe, tu alma regresa a salvo a tu cuerpo físico.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-blade-of-disaster",
    "name": "Hoja del Desastre",
    "nameEn": "Blade of Disaster",
    "level": 9,
    "school": "Conjuración",
    "castingTime": "1 acción adicional",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Abres una grieta plana en el espacio con la forma de una espada dentada de oscuridad absoluta de 3 pies de largo. Como acción adicional al lanzarla y en cada uno de tus turnos posteriores, puedes mover la espada hasta 30 pies y realizar dos ataques de conjuro cuerpo a cuerpo con ella contra objetivos a 5 pies de la espada. Cada impacto inflige 4d12 de daño por fuerza, y si sacas un 18 o más en el d20, el ataque es un impacto crítico que inflige 12d12 de daño por fuerza.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Tasha's Cauldron of Everything"
  },
  {
    "id": "spl-foresight",
    "name": "Previsión",
    "nameEn": "Foresight",
    "level": 9,
    "school": "Adivinación",
    "castingTime": "1 minuto",
    "range": "Toque",
    "components": "V, S, M (una pluma de colibrí)",
    "duration": "8 horas",
    "description": "Tocas a una criatura voluntaria confiriéndole la capacidad de prever el futuro inmediato. No puede ser sorprendida y tiene ventaja en todas las tiradas de ataque, pruebas de característica y tiradas de salvación. Además, todas las tiradas de ataque contra ella tienen desventaja.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Druida",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-gate",
    "name": "Portal",
    "nameEn": "Gate",
    "level": 9,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S, M (un diamante que valga al menos 5,000 po)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Abres un portal circular de hasta 20 pies de diámetro que conecta un espacio dentro del alcance con una ubicación precisa en otro plano de existencia. Cualquier criatura u objeto que cruce el portal es transportado de inmediato al otro plano. También puedes pronunciar el nombre de una criatura específica al lanzarlo: el portal se abre inmediatamente junto a esa criatura y la atrae a través del portal hasta tu presencia.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Clérigo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-imprisonment",
    "name": "Encarcelamiento",
    "nameEn": "Imprisonment",
    "level": 9,
    "school": "Abjuración",
    "castingTime": "1 minuto",
    "range": "30 pies",
    "components": "V, S, M (un pergamino o estatuilla tallada a semejanza del objetivo y un componente especial según la versión por valor de 500 po por Dado de Golpe del objetivo)",
    "duration": "Hasta disiparse",
    "description": "Creas una prisión mágica inexpugnable para retener a una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Sabiduría o queda encarcelado permanentemente con uno de los siguientes métodos a tu elección: Entierro, Cadenas, Prisión Acolladorada, Confinamiento Dimensional o Suspensión Mínima.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-invulnerability",
    "name": "Invulnerabilidad",
    "nameEn": "Invulnerability",
    "level": 9,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (un pequeño trozo de adamantina por valor de al menos 500 po, consumido por el conjuro)",
    "duration": "Concentración, hasta 10 minutos",
    "description": "Te vuelves inmune a todo tipo de daño durante la duración del conjuro (hasta 10 minutos mientras mantengas la concentración).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-mass-heal",
    "name": "Sanar en Masa",
    "nameEn": "Mass Heal",
    "level": 9,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Una inundación de energía curativa brota de ti hacia las criaturas heridas a tu alrededor. Tienes un fondo de hasta 700 puntos de golpe para distribuir como desees entre cualquier número de criaturas en el alcance, además de curar todas sus enfermedades y cegueras.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-mass-polymorph",
    "name": "Polimorfar en Masa",
    "nameEn": "Mass Polymorph",
    "level": 9,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S, M (el capullo de una oruga)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Transformas a hasta diez criaturas que puedas ver dentro del alcance en bestias. Las criaturas no voluntarias deben superar una tirada de salvación de Sabiduría para evitar el efecto. Cada objetivo asume los puntos de golpe y estadísticas de la bestia elegida durante la duración, revirtiendo a su forma normal si sus puntos de golpe caen a 0.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Hechicero",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-meteor-swarm",
    "name": "Enjambre de Meteoros",
    "nameEn": "Meteor Swarm",
    "level": 9,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "1 milla",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Cuatro meteoros llameantes descienden del cielo impactando en cuatro puntos diferentes que elijas a una milla o menos de ti. Cada impacto desata una explosión esférica de 40 pies de radio. Cada criatura en el área debe hacer una tirada de salvación de Destreza, sufriendo 20d6 de daño de fuego y 20d6 de daño contundente si falla, o la mitad si tiene éxito. Una criatura afectada por múltiples explosiones solo sufre el daño una vez.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-power-word-heal",
    "name": "Palabra de Poder: Sanar",
    "nameEn": "Power Word: Heal",
    "level": 9,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "Toque",
    "components": "V, S",
    "duration": "Instantáneo",
    "description": "Pronuncias una palabra de bendición suprema al tocar a una criatura. El objetivo recupera todos sus puntos de golpe de inmediato. Además, si el objetivo está encantado, asustado, paralizado o aturdido, esas condiciones terminan al instante, y puede usar su reacción para ponerse en pie si estaba derribado.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-power-word-kill",
    "name": "Palabra de Poder: Matar",
    "nameEn": "Power Word: Kill",
    "level": 9,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Pronuncias una palabra de poder imperiosa que hace que una criatura que puedas ver a tu alcance muera instantáneamente si tiene 100 puntos de golpe o menos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-prismatic-wall",
    "name": "Muro Prismático",
    "nameEn": "Prismatic Wall",
    "level": 9,
    "school": "Abjuración",
    "castingTime": "1 acción",
    "range": "60 pies",
    "components": "V, S",
    "duration": "10 minutos",
    "description": "Creas un muro resplandeciente opaco de siete capas de colores brillantes de hasta 90 pies de largo y 30 pies de alto, o una esfera de 30 pies de diámetro. Cualquier criatura a 20 pies que mire el muro queda cegada. Cruzar el muro requiere atravesar sucesivamente las siete capas (Rojo: 10d6 fuego; Naranja: 10d6 ácido; Amarillo: 10d6 relámpago; Verde: 10d6 veneno; Azul: 10d6 frío; Añil: petrificación; Violeta: ceguera y destierro planar).",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-psychic-scream",
    "name": "Grito Psíquico",
    "nameEn": "Psychic Scream",
    "level": 9,
    "school": "Encantamiento",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "S",
    "duration": "Instantáneo",
    "description": "Desatas el poder de tu mente para asaltar el intelecto de hasta diez criaturas que puedas ver a 90 pies o menos de ti. Cada objetivo debe hacer una tirada de salvación de Inteligencia. Si falla, recibe 14d6 de daño psíquico y queda aturdido durante la duración. Si este daño mata a un objetivo con cabeza, su cabeza explota de forma espectacular.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Bardo",
      "Hechicero",
      "Brujo",
      "Mago"
    ],
    "source": "Xanathar's Guide to Everything"
  },
  {
    "id": "spl-ravenous-void",
    "name": "Vacío Voraz",
    "nameEn": "Ravenous Void",
    "level": 9,
    "school": "Evocación",
    "castingTime": "1 acción",
    "range": "1.000 pies",
    "components": "V, S, M (una pequeña estrella de hierro de nueve puntas)",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Manifestas un agujero negro de gravedad destructiva en un punto dentro del alcance. El vacío es una esfera de 20 pies de radio. Cualquier criatura u objeto que entre o empiece su turno en el área debe hacer una tirada de salvación de Constitución, sufriendo 5d10 de daño por fuerza si falla (la mitad si tiene éxito). Además, las criaturas a 100 pies o menos son atraídas gravitacionalmente hacia el centro del vacío al inicio de sus turnos.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-shapechange",
    "name": "Cambio de Forma",
    "nameEn": "Shapechange",
    "level": 9,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V, S, M (una diadema de jade por valor de al menos 1.500 po, que debes colocarte en la cabeza antes de lanzar el conjuro)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Adoptas la forma de cualquier criatura que elijas cuyo valor de desafío sea igual o menor a tu nivel durante la duración (hasta 1 hora). Asumes las estadísticas y puntos de golpe de la nueva criatura, pero conservas tu alineamiento, personalidad, valores de Inteligencia, Sabiduría y Carisma, y puedes continuar usando tus propios rasgos de clase si la nueva forma física es capaz de hacerlo. Puedes cambiar a otra forma diferente como una acción en tus turnos posteriores.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-storm-of-vengeance",
    "name": "Tormenta de Venganza",
    "nameEn": "Storm of Vengeance",
    "level": 9,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "A la vista",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Una nube de tormenta masiva de 360 pies de radio aparece en lo alto dentro del alcance. A lo largo de diez asaltos, desata una furia climática apocalíptica: asalto 1 (relámpagos atronadores), asalto 2 (lluvia ácida abrasadora), asalto 3 (rayos que causan 10d6 de daño de relámpago a seis objetivos), asalto 4 (granizo aplastante), asaltos 5 al 10 (ráfagas heladas y ventisca).",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-time-ravage",
    "name": "Estrago Temporal",
    "nameEn": "Time Ravage",
    "level": 9,
    "school": "Nigromancia",
    "castingTime": "1 acción",
    "range": "90 pies",
    "components": "V, S, M (un reloj de arena lleno de polvo de diamante por valor de al menos 5.000 po, consumido por el conjuro)",
    "duration": "Instantáneo",
    "description": "Desatas una espiral de energía temporal contra una criatura que puedas ver dentro del alcance. El objetivo debe hacer una tirada de salvación de Constitución. Recibe 10d12 de daño de fuerza si falla la salvación, o la mitad de daño si tiene éxito. Además, si falla la salvación, el objetivo envejece instantáneamente hasta que le queden solo 30 días de vida biológica por vejez natural. Solo un conjuro de Deseo puede revertir este envejecimiento.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Mago"
    ],
    "source": "Explorer's Guide to Wildemount"
  },
  {
    "id": "spl-time-stop",
    "name": "Parar el Tiempo",
    "nameEn": "Time Stop",
    "level": 9,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "Lanzador",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Detienes brevemente el flujo del tiempo para todos excepto para ti. Ganas inmediatamente 1d4 + 1 turnos consecutivos durante los cuales puedes moverte y actuar con normalidad. Durante estos turnos, las demás criaturas están congeladas en el tiempo y no pueden reaccionar. Si realizas una acción que afecte directamente a otra criatura o a un objeto que lleve otra criatura, el conjuro termina de inmediato.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-true-polymorph",
    "name": "Polimorfar Verdadero",
    "nameEn": "True Polymorph",
    "level": 9,
    "school": "Transmutación",
    "castingTime": "1 acción",
    "range": "30 pies",
    "components": "V, S, M (una gota de mercurio, una masa de goma de mascar)",
    "duration": "Concentración, hasta 1 hora",
    "description": "Transformas a una criatura en otra criatura, una criatura en un objeto, o un objeto en una criatura de forma total y permanente si mantienes la concentración durante la hora completa.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Bardo",
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-true-resurrection",
    "name": "Resurrección Verdadera",
    "nameEn": "True Resurrection",
    "level": 9,
    "school": "Nigromancia",
    "castingTime": "1 hora",
    "range": "Toque",
    "components": "V, S, M (una pizca de agua bendita y diamantes por valor de al menos 25.000 po, consumidos por el conjuro)",
    "duration": "Instantáneo",
    "description": "Tocas a una criatura que lleve muerta no más de 200 años y que no haya muerto de vejez. Si su alma está libre y dispuesta, la criatura vuelve a la vida con todos sus puntos de golpe al máximo. Este conjuro cura todas las enfermedades, neutraliza venenos, restaura extremidades u órganos perdidos e incluso puede crear un cuerpo nuevo si el cuerpo original fue destruido por completo.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-weird",
    "name": "Terror",
    "nameEn": "Weird",
    "level": 9,
    "school": "Ilusión",
    "castingTime": "1 acción",
    "range": "120 pies",
    "components": "V, S",
    "duration": "Concentración, hasta 1 minuto",
    "description": "Aprovechas los temores más profundos de las criaturas en un área de 30 pies de radio dentro del alcance para crear visiones ilusorias terroríficas. Cada criatura en el área debe hacer una tirada de salvación de Sabiduría. Si falla la salvación, queda asustada durante la duración y sufre 4d10 de daño psíquico al final de cada uno de sus turnos a menos que supere una nueva salvación de Sabiduría.",
    "higherLevels": "",
    "ritual": false,
    "concentration": true,
    "classes": [
      "Brujo",
      "Mago"
    ],
    "source": "Player's Handbook"
  },
  {
    "id": "spl-wish",
    "name": "Deseo",
    "nameEn": "Wish",
    "level": 9,
    "school": "Conjuración",
    "castingTime": "1 acción",
    "range": "Personal",
    "components": "V",
    "duration": "Instantáneo",
    "description": "Deseo es el conjuro más poderoso que una criatura mortal puede lanzar. Su uso básico es duplicar los efectos de cualquier otro conjuro de nivel 8 o menor sin cumplir requisitos ni componentes. Alternativamente, puedes pedir alterar la realidad según tus deseos exactos con riesgo de estrés de conjuración.",
    "higherLevels": "",
    "ritual": false,
    "concentration": false,
    "classes": [
      "Hechicero",
      "Mago"
    ],
    "source": "Player's Handbook"
  }
];

export function isSpellcasterClass(className: string): boolean {
  if (!className) return false;
  const c = className.toLowerCase();
  return (
    c.includes('mago') || c.includes('wizard') ||
    c.includes('hechicero') || c.includes('sorcerer') ||
    c.includes('brujo') || c.includes('warlock') ||
    c.includes('clérigo') || c.includes('clerigo') || c.includes('cleric') ||
    c.includes('druida') || c.includes('druid') ||
    c.includes('bardo') || c.includes('bard') ||
    c.includes('paladín') || c.includes('paladin') ||
    c.includes('explorador') || c.includes('ranger') ||
    c.includes('artífice') || c.includes('artifice') || c.includes('artificer') ||
    c.includes('arcano') || c.includes('arcane')
  );
}

export function getMaxSpellLevel(className: string, level: number): number {
  if (!isSpellcasterClass(className)) return 0;
  const c = className.toLowerCase();
  if (
    c.includes('mago') || c.includes('wizard') ||
    c.includes('hechicero') || c.includes('sorcerer') ||
    c.includes('clérigo') || c.includes('cleric') ||
    c.includes('druida') || c.includes('druid') ||
    c.includes('bardo') || c.includes('bard')
  ) {
    return Math.min(9, Math.ceil(level / 2));
  }
  if (c.includes('brujo') || c.includes('warlock')) {
    if (level < 3) return 1;
    if (level < 5) return 2;
    if (level < 7) return 3;
    if (level < 9) return 4;
    return 5;
  }
  if (c.includes('paladín') || c.includes('paladin') || c.includes('explorador') || c.includes('ranger')) {
    if (level < 2) return 0;
    return Math.min(5, Math.ceil(level / 4));
  }
  if (c.includes('artífice') || c.includes('artificer')) {
    return Math.min(5, Math.ceil(level / 4));
  }
  if (level < 3) return 0;
  if (level < 7) return 1;
  if (level < 13) return 2;
  if (level < 19) return 3;
  return 4;
}

export function getSpellcastingLimits(
  className: string,
  level: number,
  abilityScores: AbilityScores,
  raceName: string = ''
): SpellcastingLimits {
  const isCaster = isSpellcasterClass(className);
  if (!isCaster) {
    return {
      isCaster: false,
      casterType: 'none',
      maxCantrips: 0,
      maxPreparedOrKnown: 0,
      abilityUsed: 'int',
      abilityMod: 0,
      explanation: 'Tu clase no cuenta con lanzamiento de conjuros estándar.',
    };
  }

  const c = className.toLowerCase();
  let abilityUsed: 'int' | 'wis' | 'cha' = 'int';
  let casterType: 'prepared' | 'known' = 'known';
  let maxCantrips = 2;
  let maxPreparedOrKnown = 2;
  let spellbookTotal: number | undefined = undefined;

  const getMod = (score: number = 10) => Math.floor((score - 10) / 2);

  if (c.includes('mago') || c.includes('wizard')) {
    abilityUsed = 'int';
    casterType = 'prepared';
    maxCantrips = level >= 10 ? 5 : level >= 4 ? 4 : 3;
    const mod = getMod(abilityScores?.int);
    maxPreparedOrKnown = Math.max(1, mod + level);
    spellbookTotal = 6 + (level - 1) * 2;
  } else if (c.includes('clérigo') || c.includes('clerigo') || c.includes('cleric')) {
    abilityUsed = 'wis';
    casterType = 'prepared';
    maxCantrips = level >= 10 ? 5 : level >= 4 ? 4 : 3;
    const mod = getMod(abilityScores?.wis);
    maxPreparedOrKnown = Math.max(1, mod + level);
  } else if (c.includes('druida') || c.includes('druid')) {
    abilityUsed = 'wis';
    casterType = 'prepared';
    maxCantrips = level >= 10 ? 4 : level >= 4 ? 3 : 2;
    const mod = getMod(abilityScores?.wis);
    maxPreparedOrKnown = Math.max(1, mod + level);
  } else if (c.includes('hechicero') || c.includes('sorcerer')) {
    abilityUsed = 'cha';
    casterType = 'known';
    maxCantrips = level >= 10 ? 6 : level >= 4 ? 5 : 4;
    const knownTable = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15];
    maxPreparedOrKnown = knownTable[Math.min(20, Math.max(1, level)) - 1] || 2;
  } else if (c.includes('bardo') || c.includes('bard')) {
    abilityUsed = 'cha';
    casterType = 'known';
    maxCantrips = level >= 10 ? 4 : level >= 4 ? 3 : 2;
    const knownTable = [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22];
    maxPreparedOrKnown = knownTable[Math.min(20, Math.max(1, level)) - 1] || 4;
  } else if (c.includes('brujo') || c.includes('warlock')) {
    abilityUsed = 'cha';
    casterType = 'known';
    maxCantrips = level >= 10 ? 4 : level >= 4 ? 3 : 2;
    const knownTable = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15];
    maxPreparedOrKnown = knownTable[Math.min(20, Math.max(1, level)) - 1] || 2;
  } else if (c.includes('paladín') || c.includes('paladin')) {
    abilityUsed = 'cha';
    casterType = 'prepared';
    maxCantrips = 0;
    const mod = getMod(abilityScores?.cha);
    maxPreparedOrKnown = level < 2 ? 0 : Math.max(1, mod + Math.floor(level / 2));
  } else if (c.includes('explorador') || c.includes('ranger')) {
    abilityUsed = 'wis';
    casterType = 'known';
    maxCantrips = 0;
    const knownTable = [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11];
    maxPreparedOrKnown = knownTable[Math.min(20, Math.max(1, level)) - 1] || 0;
  } else if (c.includes('artífice') || c.includes('artificer')) {
    abilityUsed = 'int';
    casterType = 'prepared';
    maxCantrips = level >= 14 ? 4 : level >= 10 ? 3 : 2;
    const mod = getMod(abilityScores?.int);
    maxPreparedOrKnown = Math.max(1, mod + Math.floor(level / 2));
  }

  const abilityMod = getMod(abilityScores?.[abilityUsed]);

  let explanation = '';
  if (casterType === 'prepared') {
    explanation = `${className} prepara conjuros diariamente: modificador de ${abilityUsed.toUpperCase()} (${abilityMod >= 0 ? '+' : ''}${abilityMod}) + nivel de clase. Total: ${maxPreparedOrKnown} conjuros preparados.`;
    if (spellbookTotal) {
      explanation += ` Grimorio inicial: ${spellbookTotal} conjuros registrados.`;
    }
  } else {
    explanation = `${className} conoce una cantidad fija de ${maxPreparedOrKnown} conjuros basados en la tabla oficial de la clase.`;
  }

  return {
    isCaster,
    casterType,
    maxCantrips,
    maxPreparedOrKnown,
    spellbookTotal,
    abilityUsed,
    abilityMod,
    explanation,
  };
}

export function filterSpellsForCharacter(
  className: string,
  level: number,
  raceName: string = ''
): {
  availableToChoose: Spell[];
  higherLevelToBrowse: Spell[];
  allForClass: Spell[];
  maxSpellLevel: number;
  cantrips: Spell[];
  spells: Spell[];
} {
  const maxSpellLevel = getMaxSpellLevel(className, level);
  const c = (className || '').toLowerCase();

  let targetClass = '';
  if (c.includes('mago') || c.includes('wizard')) targetClass = 'Mago';
  else if (c.includes('hechicero') || c.includes('sorcerer')) targetClass = 'Hechicero';
  else if (c.includes('clérigo') || c.includes('clerigo') || c.includes('cleric')) targetClass = 'Clérigo';
  else if (c.includes('druida') || c.includes('druid')) targetClass = 'Druida';
  else if (c.includes('bardo') || c.includes('bard')) targetClass = 'Bardo';
  else if (c.includes('brujo') || c.includes('warlock')) targetClass = 'Brujo';
  else if (c.includes('paladín') || c.includes('paladin')) targetClass = 'Paladín';
  else if (c.includes('explorador') || c.includes('ranger')) targetClass = 'Explorador';
  else if (c.includes('artífice') || c.includes('artificer')) targetClass = 'Artífice';

  const allForClass = OFFICIAL_SPELLS_COMPENDIUM.filter((s) => {
    if (!targetClass) return true;
    return (s.classes || []).some((cls) => cls.toLowerCase() === targetClass.toLowerCase());
  });

  const availableToChoose = allForClass.filter((s) => s.level <= maxSpellLevel);
  const higherLevelToBrowse = allForClass.filter((s) => s.level > maxSpellLevel);
  const cantrips = availableToChoose.filter((s) => s.level === 0);
  const spells = availableToChoose.filter((s) => s.level > 0);

  return {
    availableToChoose,
    higherLevelToBrowse,
    allForClass,
    maxSpellLevel,
    cantrips,
    spells,
  };
}

/**
 * Busca un conjuro en el compendio oficial por nombre en inglés, ID o nombre tradicional en español.
 * Permite emparejar nombres canónicos oficiales como "Blade Ward", "Pass Without Trace", etc.
 */
export function findSpellByNameOrAlias(query: string): Spell | undefined {
  if (!query) return undefined;
  const clean = query.trim().toLowerCase();

  // 1. Coincidencia directa por nombre exacto, nombre en inglés o ID
  let found = OFFICIAL_SPELLS_COMPENDIUM.find(
    (s) =>
      s.name.toLowerCase() === clean ||
      (s.nameEn && s.nameEn.toLowerCase() === clean) ||
      s.id.toLowerCase() === clean
  );
  if (found) return found;

  // 2. Extraer paréntesis: ej. "Protección contra las Armas (Blade Ward)" o "Blade Ward (Protección contra las Armas)"
  const inParenMatch = clean.match(/\(([^)]+)\)/);
  if (inParenMatch && inParenMatch[1]) {
    const inside = inParenMatch[1].trim();
    found = OFFICIAL_SPELLS_COMPENDIUM.find(
      (s) =>
        s.name.toLowerCase() === inside ||
        (s.nameEn && s.nameEn.toLowerCase() === inside) ||
        s.id.toLowerCase() === inside
    );
    if (found) return found;
  }
  const beforeParen = clean.split('(')[0].trim();
  if (beforeParen && beforeParen !== clean) {
    found = OFFICIAL_SPELLS_COMPENDIUM.find(
      (s) =>
        s.name.toLowerCase() === beforeParen ||
        (s.nameEn && s.nameEn.toLowerCase() === beforeParen) ||
        s.id.toLowerCase() === beforeParen
    );
    if (found) return found;
  }

  // 3. Diccionario canónico de traducciones y variantes oficiales ES <-> EN
  const canonicalAliases: Record<string, string> = {
    'misil mágico': 'Magic Missile',
    'misil magico': 'Magic Missile',
    'proyectil mágico': 'Magic Missile',
    'proyectil magico': 'Magic Missile',
    'magic missile': 'Magic Missile',
    'blade ward': 'Blade Ward',
    'protección contra las armas': 'Blade Ward',
    'proteccion contra las armas': 'Blade Ward',
    'pass without trace': 'Pass Without Trace',
    'pasar sin rastro': 'Pass Without Trace',
    'produce flame': 'Produce Flame',
    'producir llama': 'Produce Flame',
    'llama sagrada': 'Sacred Flame',
    'burning hands': 'Burning Hands',
    'manos ardientes': 'Burning Hands',
    'flame blade': 'Flame Blade',
    'hoja de fuego': 'Flame Blade',
    'hoja llameante': 'Flame Blade',
    'acid splash': 'Acid Splash',
    'salpicadura ácida': 'Acid Splash',
    'salpicadura acida': 'Acid Splash',
    'create or destroy water': 'Create or Destroy Water',
    'crear o destruir agua': 'Create or Destroy Water',
    'water walk': 'Water Walk',
    'caminar sobre las aguas': 'Water Walk',
    'shocking grasp': 'Shocking Grasp',
    'agarre electrizante': 'Shocking Grasp',
    'toque electrizante': 'Shocking Grasp',
    'feather fall': 'Feather Fall',
    'caída de pluma': 'Feather Fall',
    'caida de pluma': 'Feather Fall',
    'levitate': 'Levitate',
    'levitar': 'Levitate',
    'dancing lights': 'Dancing Lights',
    'luces danzantes': 'Dancing Lights',
    'faerie fire': 'Faerie Fire',
    'fuego feérico': 'Faerie Fire',
    'fuego feerico': 'Faerie Fire',
    'darkness': 'Darkness',
    'oscuridad': 'Darkness',
    'thaumaturgy': 'Thaumaturgy',
    'taumaturgia': 'Thaumaturgy',
    'hellish rebuke': 'Hellish Rebuke',
    'reprensión infernal': 'Hellish Rebuke',
    'reprension infernal': 'Hellish Rebuke',
    'minor illusion': 'Minor Illusion',
    'ilusión menor': 'Minor Illusion',
    'ilusion menor': 'Minor Illusion',
    'druidcraft': 'Druidcraft',
    'artesanía druídica': 'Druidcraft',
    'artesania druidica': 'Druidcraft',
    'light': 'Light',
    'luz': 'Light',
    'mage hand': 'Mage Hand',
    'mano de mago': 'Mage Hand',
    'misty step': 'Misty Step',
    'paso brumoso': 'Misty Step',
    'jump': 'Jump',
    'salto': 'Jump',
    'shield': 'Shield',
    'escudo': 'Shield',
    'detect thoughts': 'Detect Thoughts',
    'detectar pensamientos': 'Detect Thoughts',
    'fog cloud': 'Fog Cloud',
    'nube de niebla': 'Fog Cloud',
    'nube de oscurecimiento': 'Fog Cloud',
    'gust of wind': 'Gust of Wind',
    'ráfaga de viento': 'Gust of Wind',
    'rafaga de viento': 'Gust of Wind',
    'poison spray': 'Poison Spray',
    'rociada de veneno': 'Poison Spray',
    'animal friendship': 'Animal Friendship',
    'amistad con animales': 'Animal Friendship',
    'suggestion': 'Suggestion',
    'sugestión': 'Suggestion',
    'sugestion': 'Suggestion',
    'detect magic': 'Detect Magic',
    'detectar magia': 'Detect Magic',
    'disguise self': 'Disguise Self',
    'disfrazarse': 'Disguise Self',
    'enlarge/reduce': 'Enlarge/Reduce',
    'agrandar / reducir': 'Enlarge/Reduce',
    'agrandar/reducir': 'Enlarge/Reduce',
    'agrandar o reducir': 'Enlarge/Reduce',
    'sleep': 'Sleep',
    'dormir': 'Sleep',
    'invisibility': 'Invisibility',
    'invisibilidad': 'Invisibility',
    'sacred flame': 'Sacred Flame',
    'fire bolt': 'Fire Bolt',
    'saeta de fuego': 'Fire Bolt',
    'mending': 'Mending',
    'remendar': 'Mending',
    'friends': 'Friends',
    'amigos': 'Friends',
    'charm person': 'Charm Person',
    'hechizar persona': 'Charm Person',
    'ray of frost': 'Ray of Frost',
    'rayo de escarcha': 'Ray of Frost',
    'armor of agathys': 'Armor of Agathys',
    'armadura de agathys': 'Armor of Agathys',
    'tensers floating disk': "Tenser's Floating Disk",
    "tenser's floating disk": "Tenser's Floating Disk",
    'disco flotante de tenser': "Tenser's Floating Disk",
    'arcane lock': 'Arcane Lock',
    'cierre arcano': 'Arcane Lock',
    'cerradura arcana': 'Arcane Lock',
    'searing smite': 'Searing Smite',
    'castigo abrasador': 'Searing Smite',
    'branding smite': 'Branding Smite',
    'castigo marcador': 'Branding Smite',
    'ray of sickness': 'Ray of Sickness',
    'rayo de enfermedad': 'Ray of Sickness',
    'crown of madness': 'Crown of Madness',
    'corona de locura': 'Crown of Madness',
    'prestidigitation': 'Prestidigitation',
    'prestidigitación': 'Prestidigitation',
    'prestidigitacion': 'Prestidigitation',
    'chill touch': 'Chill Touch',
    'toque helado': 'Chill Touch',
    'ray of enfeeblement': 'Ray of Enfeeblement',
    'rayo de debilitamiento': 'Ray of Enfeeblement',
  };

  const aliasTarget = canonicalAliases[clean] || canonicalAliases[beforeParen];
  if (aliasTarget) {
    found = OFFICIAL_SPELLS_COMPENDIUM.find(
      (s) =>
        s.name.toLowerCase() === aliasTarget.toLowerCase() ||
        (s.nameEn && s.nameEn.toLowerCase() === aliasTarget.toLowerCase())
    );
    if (found) return found;
  }

  // 4. Búsqueda por subcadena parcial
  found = OFFICIAL_SPELLS_COMPENDIUM.find(
    (s) =>
      s.name.toLowerCase().includes(clean) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(clean))
  );
  return found;
}

