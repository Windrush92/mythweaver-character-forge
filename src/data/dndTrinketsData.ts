// Base de datos de Baratijas de D&D 5e (Trinkets)
// Incluye:
// 1. Tabla de Baratijas del Horror (Gothic Horror Trinkets de Van Richten's Guide to Ravenloft & Curse of Strahd - d100)
// 2. Tabla de Baratijas Comunes (Standard Trinkets del Manual del Jugador - d100)
// 3. Tabla de Baratijas Feéricas (Feywild Trinkets de The Wild Beyond the Witchlight - d100)

export interface TrinketItem {
  roll: number;
  name: string;
  description: string;
  category: 'horror' | 'standard' | 'feywild';
}

export const GOTHIC_HORROR_TRINKETS: TrinketItem[] = [
  { roll: 1, name: "Dibujo de un amigo imaginario", description: "Un dibujo infantil hecho por ti de tu 'amigo imaginario' que nadie más podía ver.", category: 'horror' },
  { roll: 2, name: "Cerradura sedienta de sangre", description: "Una cerradura pesada que solo se abre cuando cae una gota de sangre humana en su interior.", category: 'horror' },
  { roll: 3, name: "Cubo de cornalina con ojos", description: "Un cubo de 1 pulgada de cornalina pulida con un ojo humano grabado en cada una de sus seis caras.", category: 'horror' },
  { roll: 4, name: "Poema escrito con sangre", description: "Un tosco poema escrito con sangre en un jirón de tela de lino que describe tu propia muerte.", category: 'horror' },
  { roll: 5, name: "Dedo conservado en vinagre", description: "Un frasco de vidrio sellado con cera que contiene un dedo humano encogido conservado en vinagre.", category: 'horror' },
  { roll: 6, name: "Moneda del rey decapitado", description: "Una moneda de plata antigua de un reino olvidado con el rostro en relieve de un monarca decapitado.", category: 'horror' },
  { roll: 7, name: "Camafeo con retrato parpadeante", description: "Un camafeo de cobre con el retrato de una persona desconocida que parece parpadear cuando la miras de reojo.", category: 'horror' },
  { roll: 8, name: "Carta sellada manchada de ceniza", description: "Una carta sin remitente manchada de lágrimas y ceniza advirtiendo sobre una noche fatídica.", category: 'horror' },
  { roll: 9, name: "Diente con runas talladas", description: "Un colmillo humano envuelto en seda negra con minúsculas runas arcanas grabadas a punta de cuchillo.", category: 'horror' },
  { roll: 10, name: "Llave gélida susurrante", description: "Una pesada llave de hierro forjado que siempre está helada al tacto y vibra débilmente en la oscuridad.", category: 'horror' },
  { roll: 11, name: "Espejo del envejecimiento", description: "Un espejo de bolsillo de plata cuya superficie refleja tu rostro envejecido diez años en el futuro.", category: 'horror' },
  { roll: 12, name: "Relicario con cabello albino", description: "Un relicario de latón que guarda un mechón de cabello blanco como la nieve que huele a rosas marchitas.", category: 'horror' },
  { roll: 13, name: "Campanilla espectral", description: "Una campanilla de bronce sin badajo que suena tenuemente cuando un espíritu o no muerto está cerca.", category: 'horror' },
  { roll: 14, name: "Clavo de ataúd de asesino", description: "Un clavo oxidado extraído del ataúd de un asesino ajusticiado en la horca.", category: 'horror' },
  { roll: 15, name: "Dado de hueso con calaveras", description: "Un dado de seis caras tallado en hueso donde todos los números han sido reemplazados por calaveras.", category: 'horror' },
  { roll: 16, name: "Muñeca de trapo con alfileres", description: "Una pequeña muñeca de trapo cosida toscamente que lleva tres alfileres de plata clavados en el pecho.", category: 'horror' },
  { roll: 17, name: "Brújula orientada a tumbas", description: "Una brújula de latón cuya aguja no apunta al norte, sino hacia la fosa o cementerio más cercano.", category: 'horror' },
  { roll: 18, name: "Frasco con último aliento", description: "Una botella de cristal ahumado sellada que supuestamente contiene el último suspiro de un inocente condenado.", category: 'horror' },
  { roll: 19, name: "Partitura enloquecedora", description: "Una partitura musical en pergamino amarillento que provoca escalofríos y mareos con solo leer sus notas.", category: 'horror' },
  { roll: 20, name: "Medallón tentacular abisal", description: "Un medallón de peltre que representa a una criatura monstruosa con tentáculos surgiendo de un ojo abierto.", category: 'horror' },
  { roll: 21, name: "Corazón de madera petrificada", description: "Un trozo de madera petrificada con la forma exacta y el tamaño de un corazón humano marchito.", category: 'horror' },
  { roll: 22, name: "Daga rota que huele a azufre", description: "La empuñadura rota de una daga de hierro que emana un constante e inquietante olor a azufre y humo.", category: 'horror' },
  { roll: 23, name: "Libro encuadernado en piel", description: "Un pequeño tomo encuadernado en cuero pálido cuyas páginas interiores parecen estar completamente en blanco.", category: 'horror' },
  { roll: 24, name: "Máscara mortuoria de arcilla", description: "Un fragmento de máscara mortuoria de arcilla agrietada que plasma una mueca de terror indecible.", category: 'horror' },
  { roll: 25, name: "Anillo de hierro palpitante", description: "Un anillo de hierro tosco con una gema opaca que parece pulsar como un latido lento en las sombras.", category: 'horror' },
  { roll: 26, name: "Mechón de pelaje de hombre lobo", description: "Un mechón de pelaje grueso y plateado que huele a bosque húmedo y cobre.", category: 'horror' },
  { roll: 27, name: "Garra de cuervo en plata", description: "Una garra disecada de cuervo engarzada en un colgante de plata oscura.", category: 'horror' },
  { roll: 28, name: "Caja de música desafinada", description: "Una diminuta caja de música que toca una melodía fúnebre y a veces arranca a sonar por sí sola.", category: 'horror' },
  { roll: 29, name: "Ojo de vidrio vigilante", description: "Un ojo de cristal muy realista cuya pupila parece dilatarse cuando alguien miente en la habitación.", category: 'horror' },
  { roll: 30, name: "Pluma de cuervo que nunca se seca", description: "Una pluma de escribir negra como la pez que escribe con tinta carmesí sin necesidad de tintero.", category: 'horror' },
  { roll: 31, name: "Fragmento de lápida con tu apellido", description: "Un pedazo de granito roto perteneciente a una lápida antigua donde se lee con claridad tu propio apellido.", category: 'horror' },
  { roll: 32, name: "Pañuelo manchado de lágrimas negras", description: "Un pañuelo de seda fina que tiene grabada una mancha imborrable de lágrimas oscuras como la tinta.", category: 'horror' },
  { roll: 33, name: "Grumo de cera de vela de nigromante", description: "Un trozo de cera negra de una vela que supuestamente ardió durante un ritual en una cripta maldita.", category: 'horror' },
  { roll: 34, name: "Moneda de plomo con un vampiro", description: "Una moneda pesada de plomo con un escudo nobiliario borrado que muestra a un murciélago sobre una torre.", category: 'horror' },
  { roll: 35, name: "Aguja de plata de embalsamador", description: "Una larga aguja de plata usada por antiguos embalsamadores en rituales de momificación.", category: 'horror' },
  { roll: 36, name: "Grillete roto con marcas de garras", description: "Un eslabón de hierro macizo perteneciente a un grillete que fue desgarrado por garras no humanas.", category: 'horror' },
  { roll: 37, name: "Fósil de polilla con rostro humano", description: "Una polilla preservada en ámbar cuyas marcas en las alas se asemejan perturbadoramente a un rostro en agonía.", category: 'horror' },
  { roll: 38, name: "Vial con agua de un pantano maldito", description: "Un tubo de ensayo con agua estancada que nunca se evapora y brilla con una tenue fosforescencia verdosa.", category: 'horror' },
  { roll: 39, name: "Cráneo de roedor con dos cabezas", description: "El diminuto cráneo preservado de un ratón deforme que nació con dos hocicos.", category: 'horror' },
  { roll: 40, name: "Boleto para un carrusel fantasmal", description: "Un billete de papel descolorido para una atracción de feria itinerante que desapareció sin dejar rastro.", category: 'horror' },
  { roll: 41, name: "Mancha de sangre que cambia de forma", description: "Un trozo de pergamino donde una mancha seca de sangre parece adoptar diferentes siluetas cada medianoche.", category: 'horror' },
  { roll: 42, name: "Diente de leche en una caja de zinc", description: "Una caja metálica del tamaño de un dedal que contiene un diente de leche infantil con una raíz afilada.", category: 'horror' },
  { roll: 43, name: "Cuerda de ahorcado de tres hebras", description: "Un trozo de soga de cáñamo áspero de unos 30 centímetros con un nudo corredizo deshecho.", category: 'horror' },
  { roll: 44, name: "Carta de tarot: La Torre rota", description: "Una carta de adivinación de madera pintada que siempre se desliza hacia la parte superior de cualquier mazo.", category: 'horror' },
  { roll: 45, name: "Fragmento de espejo de casa embrujada", description: "Un triángulo afilado de espejo recuperado de un salón donde ocurrió una masacre familiar.", category: 'horror' },
  { roll: 46, name: "Sello de cera con blasón calcinado", description: "Un sello de correspondencia de una casa noble de Barovia cuyos miembros perecieron en un incendio.", category: 'horror' },
  { roll: 47, name: "Silbato de hueso inaudible", description: "Un silbato tallado en falange humana que no produce sonido para los oídos vivos, pero altera a los animales.", category: 'horror' },
  { roll: 48, name: "Taza de porcelana agrietada", description: "Una taza de té que perteneció a una anciana que envenenó a todos sus huéspedes una noche de invierno.", category: 'horror' },
  { roll: 49, name: "Ojo de muñeca que parpadea", description: "Un ojo esférico de porcelana esmaltada que gira mecánicamente sin engranaje visible.", category: 'horror' },
  { roll: 50, name: "Gota de niebla encerrada en cristal", description: "Una canica de vidrio transparente en cuyo interior se arremolina perpetuamente una mota de niebla lechosa.", category: 'horror' },
  { roll: 51, name: "Anillo con compartimento de cianuro", description: "Un anillo de latón envejecido con un compartimento secreto que aún conserva polvo blanco sospechoso.", category: 'horror' },
  { roll: 52, name: "Página arrancada de un diario de manicomio", description: "Un papel arrugado con garabatos frenéticos y dibujos de sombras que se arrastran por las esquinas.", category: 'horror' },
  { roll: 53, name: "Colgante con un escarabajo disecado", description: "Un insecto oscuro de caparazón brillante conservado bajo una lente de aumento.", category: 'horror' },
  { roll: 54, name: "Paquete de cartas con la misma figura", description: "Una baraja donde todas las cartas del palo de picas muestran el rostro de una persona que conociste.", category: 'horror' },
  { roll: 55, name: "Campana de plata de sepulturero", description: "Una campanita que se colocaba atada al dedo de los cadáveres en caso de entierro prematuro.", category: 'horror' },
  { roll: 56, name: "Boceto a carboncillo de un monstruo", description: "Un retrato detallado de una criatura que viste en una pesadilla recurrente durante tu niñez.", category: 'horror' },
  { roll: 57, name: "Mechón de pelo canoso atado con tripa", description: "Cabello recogido con una cuerda orgánica que produce un ligero hormigueo al sostenerlo.", category: 'horror' },
  { roll: 58, name: "Herramienta de tortura miniaturizada", description: "Un potro de tortura de apenas 5 centímetros hecho de madera y alfileres con asombroso detalle.", category: 'horror' },
  { roll: 59, name: "Cuchillo de deshuesar oxidado", description: "Un pequeño cuchillo curvo con manchas oscuras imposibles de limpiar a lo largo del filo.", category: 'horror' },
  { roll: 60, name: "Cruz de madera invertida de ceniza", description: "Un crucifijo rústico tallado en madera quemada que deja tizne en los dedos.", category: 'horror' },
  { roll: 61, name: "Moneda de la barca del Caronte", description: "Una moneda de cobre colocada tradicionalmente sobre el ojo de un difunto para pagar su paso al otro mundo.", category: 'horror' },
  { roll: 62, name: "Botón arrancado del uniforme de un desaparecido", description: "Un botón militar de latón con un hilo ensangrentado todavía colgando de los ojales.", category: 'horror' },
  { roll: 63, name: "Trozo de cuerda de marioneta", description: "Un trozo de hilo rojo fuerte que solía conectar los miembros de una marioneta que parecía moverse sola.", category: 'horror' },
  { roll: 64, name: "Tapiz en miniatura de una quema de brujas", description: "Un cuadrado de tela bordada que retrata una pira funeraria con figuras encapuchadas alrededor.", category: 'horror' },
  { roll: 65, name: "Llave maestra con dientes afilados como sierra", description: "Una ganzúa de acero negro diseñada para cerraduras de cámaras secretas subterráneas.", category: 'horror' },
  { roll: 66, name: "Frasco con arena negra de un cementerio profanado", description: "Tierra oscura y fría recogida a medianoche de una tumba abierta.", category: 'horror' },
  { roll: 67, name: "Dedal de costurera de cadáveres", description: "Un dedal de plomo marcado con muescas profundas hecho para coser mortajas y sacos de cuero.", category: 'horror' },
  { roll: 68, name: "Fragmento de vidriera con un demonio", description: "Un trozo de vidrio teñido de rojo que formaba parte del ojo de un diablo en una abadía en ruinas.", category: 'horror' },
  { roll: 69, name: "Diente de tiburón grabado con un nombre", description: "Un fósil marino afilado que tiene grabado en letras diminutas el nombre de un barco que naufragó.", category: 'horror' },
  { roll: 70, name: "Capa de polvo de momia en un vial", description: "Polvo grisáceo aromático que huele a mirra, cinamomo y tiempo milenario.", category: 'horror' },
  { roll: 71, name: "Nota de chantaje nunca enviada", description: "Una carta arrugada que revela un secreto inconfesable sobre una persona de alta alcurnia.", category: 'horror' },
  { roll: 72, name: "Fósil de dedo con anillo fundido", description: "Un hueso petrificado que aún tiene soldado un anillo de hierro por el fuego.", category: 'horror' },
  { roll: 73, name: "Copa de peltre con fondo grabado", description: "Un cáliz en cuyo fondo hay grabada una frase en lengua infernal: 'Bebe y olvida'.", category: 'horror' },
  { roll: 74, name: "Pedazo de madera de la horca", description: "Una astilla de roble arrancada del cadalso de una plaza de ejecución notoria.", category: 'horror' },
  { roll: 75, name: "Escarabajo de oro falso relleno de ceniza", description: "Una figura hueca de latón dorado que contiene las cenizas de una carta de amor prohibida.", category: 'horror' },
  { roll: 76, name: "Rosa negra disecada que nunca se marchita", description: "Una flor seca como el carbón que mantiene sus pétalos rígidos y gotea una sustancia amarga si se quiebra.", category: 'horror' },
  { roll: 77, name: "Anillo de cobre que mancha la piel de verde", description: "Una sortija barata que deja una marca circular que parece un ojo cerrado en tu dedo.", category: 'horror' },
  { roll: 78, name: "Gargantilla de terciopelo con mancha en el cuello", description: "Una cinta oscura que usaba una persona para ocultar una cicatriz de corte en la garganta.", category: 'horror' },
  { roll: 79, name: "Pelota de lana con agujas de tejer de hueso", description: "Un ovillo de hilo negro atravesado por dos punzones afilados hechos de costillas animales.", category: 'horror' },
  { roll: 80, name: "Frasco con lágrimas de sauce llorón", description: "Resina pegajosa y translúcida recogida de un árbol que creció sobre la tumba de unos amantes.", category: 'horror' },
  { roll: 81, name: "Dado de metal pesado que siempre saca 1", description: "Un dado desequilibrado que parece atraer la mala fortuna a quien intenta apostar con él.", category: 'horror' },
  { roll: 82, name: "Llave de una celda de aislamiento", description: "Una llave oxidada con un número grabado: 'Celda 13 - Ala de los Incurables'.", category: 'horror' },
  { roll: 83, name: "Tira de pergamino con nombres tachados", description: "Una lista de siete personas, de las cuales seis han muerto en circunstancias violentas.", category: 'horror' },
  { roll: 84, name: "Cuchara de plata retorcida por calor extremo", description: "Un cubierto deformado como si hubiera sobrevivido al aliento ardiente de un dragón o a un infierno.", category: 'horror' },
  { roll: 85, name: "Herramienta de grabado para marcas de ganado", description: "Un hierro de marcar en miniatura que dibuja un símbolo de pertenencia a una secta secreta.", category: 'horror' },
  { roll: 86, name: "Caja de cerillas de azufre eterno", description: "Un estuche con fósforos que despiden una llama azulada y humo con olor a carne chamuscada.", category: 'horror' },
  { roll: 87, name: "Retrato en miniatura con los ojos raspados", description: "Una pequeña pintura al óleo donde alguien usó una cuchilla para eliminar los ojos del retratado.", category: 'horror' },
  { roll: 88, name: "Trozo de pizarra con ecuaciones blasfemas", description: "Una tabla con fórmulas matemáticas imposibles que intentan medir las dimensiones del Más Allá.", category: 'horror' },
  { roll: 89, name: "Monóculo con cristal teñido de carmesí", description: "Una lente a través de la cual todas las personas parecen cadavéricas y pálidas.", category: 'horror' },
  { roll: 90, name: "Diente canino de una bestia devoradora de hombres", description: "Un colmillo amarillento con marcas de hendidura en la raíz.", category: 'horror' },
  { roll: 91, name: "Frasco de tinta hecha con hollín de crematorio", description: "Tinta negra espesa que al secarse sobre el papel forma un relieve crujiente.", category: 'horror' },
  { roll: 92, name: "Broche de plata con forma de polilla de la muerte", description: "Un prendedor que representa a una mariposa con el diseño de una calavera en el torso.", category: 'horror' },
  { roll: 93, name: "Campanilla que repica cuando alguien miente", description: "Un colgante minúsculo que vibra contra tu pecho cuando detecta un engaño cercano.", category: 'horror' },
  { roll: 94, name: "Placa identificativa de metal de un galeote", description: "Una chapa de zinc con el número de un remero forzado en las galeras de una prisión flotante.", category: 'horror' },
  { roll: 95, name: "Vial con agua de bendición corrompida", description: "Un frasco de agua bendita que se volvió turbia y ácida al entrar en contacto con una reliquia oscura.", category: 'horror' },
  { roll: 96, name: "Cadena de hierro forjada en el fuego de un sacrificio", description: "Cinco eslabones pesados que emiten un tenue calor residual que nunca se disipa.", category: 'horror' },
  { roll: 97, name: "Trozo de mapa que conduce a una cripta sellada", description: "Un fragmento de piel de oveja que marca un pasadizo bajo los cimientos de una catedral.", category: 'horror' },
  { roll: 98, name: "Cuchillo ceremonial de obsidiana mellado", description: "Una hoja de vidrio volcánico negro con una muesca en la punta provocada al chocar contra un hueso.", category: 'horror' },
  { roll: 99, name: "Caja sellada con plomo que emite un zumbido", description: "Un cofre de 3 pulgadas sellado herméticamente del cual se oye el zumbido constante de insectos atrapados.", category: 'horror' },
  { roll: 100, name: "Cráneo diminuto de un homúnculo", description: "Un cráneo perfectamente formado del tamaño de una nuez que parece mirarte fijamente a través de las cuencas vacías.", category: 'horror' },
];

export const STANDARD_TRINKETS: TrinketItem[] = [
  { roll: 1, name: "Mano de duende momificada", description: "Una diminuta mano disecada de duende conservada con sal y resina.", category: 'standard' },
  { roll: 2, name: "Trozo de cristal que brilla tenuemente", description: "Un fragmento de cuarzo que retiene la luz de la luna durante unos minutos tras oscurecer.", category: 'standard' },
  { roll: 3, name: "Moneda de oro de una tierra desconocida", description: "Una moneda de oro puro acuñada con el perfil de una reina elfa olvidada.", category: 'standard' },
  { roll: 4, name: "Diario escrito en un idioma indescifrable", description: "Un cuaderno encuadernado en cuero cuyas páginas están llenas de jeroglíficos y diagramas celestes.", category: 'standard' },
  { roll: 5, name: "Caja de latón que no se puede abrir", description: "Una cajita cúbica sin cerradura visible ni junturas que vibra cuando la sacudes.", category: 'standard' },
  { roll: 6, name: "Silbato tallado en madera de fresno", description: "Un silbato rústico que produce un tono melodioso parecido al canto de un mirlo.", category: 'standard' },
  { roll: 7, name: "Diente de dragón pequeño", description: "Un colmillo afilado y blanco como el marfil con estrías en su base.", category: 'standard' },
  { roll: 8, name: "Piedra pómez con olor a lavanda", description: "Una piedra volcánica pulida que conserva un persistente y relajante aroma a flores silvestres.", category: 'standard' },
  { roll: 9, name: "Retrato en miniatura de un elfo", description: "Una pintura al óleo del tamaño de una moneda que muestra a un noble elfo con una corona de hojas.", category: 'standard' },
  { roll: 10, name: "Aguja de tejer de plata", description: "Una aguja fina y brillante que nunca se desafila ni se ensucia.", category: 'standard' },
  { roll: 11, name: "Trozo de cuerda que no se puede cortar", description: "Un metro de soga sedosa de cáñamo que desafía las hojas de tijeras y cuchillos comunes.", category: 'standard' },
  { roll: 12, name: "Taza de cerámica que mantiene el té caliente", description: "Un pocillo de arcilla que conserva cualquier infusión a temperatura agradable durante una hora.", category: 'standard' },
  { roll: 13, name: "Botón de latón de uniforme náutico", description: "Un botón con un ancla en relieve perteneciente a un capitán de barco mercantil.", category: 'standard' },
  { roll: 14, name: "Pluma de fénix sintética", description: "Una pluma de ave teñida de naranja y rojo que desprende un tenue fulgor en la noche.", category: 'standard' },
  { roll: 15, name: "Dado de doce caras hecho de amatista", description: "Un dado traslúcido de color violeta con números dorados grabados a mano.", category: 'standard' },
  { roll: 16, name: "Llave de bronce que abre una puerta olvidada", description: "Una llave ornamental con filigranas de enredadera.", category: 'standard' },
  { roll: 17, name: "Caracola marina que susurra el viento", description: "Una concha marina en cuyo interior se escucha el rugido de una tormenta lejana al acercarla al oído.", category: 'standard' },
  { roll: 18, name: "Frasco con arena dorada del desierto", description: "Arena finísima recogida de las dunas del Imperio de Calimshan.", category: 'standard' },
  { roll: 19, name: "Trozo de meteorito ferroso", description: "Un fragmento de metal negruzco y denso con propiedades magnéticas leves.", category: 'standard' },
  { roll: 20, name: "Amuleto de la suerte de hueso de pescado", description: "Una espina bendecida por un sacerdote del mar para evitar mareos.", category: 'standard' },
];

export const FEYWILD_TRINKETS: TrinketItem[] = [
  { roll: 1, name: "Brizna de hierba que canta con la brisa", description: "Una hierba mágica que emite una nota dulce cuando el viento pasa entre sus hojas.", category: 'feywild' },
  { roll: 2, name: "Bellota de cristal de hadas", description: "Una bellota tallada en cristal que refleja los colores del arcoíris cuando recibe luz.", category: 'feywild' },
  { roll: 3, name: "Frasco con risas embotelladas", description: "Un tubo de perfume que al destaparse deja escapar un eco alegre y travieso.", category: 'feywild' },
  { roll: 4, name: "Pluma de colibrí que cambia de color", description: "Una pluma iridiscente que varía de verde esmeralda a azul zafiro según tu estado de ánimo.", category: 'feywild' },
  { roll: 5, name: "Trébol de cuatro hojas de plata", description: "Un talismán feérico que perteneció a un duende juguetón.", category: 'feywild' },
  { roll: 6, name: "Boleto dorado para el Carnaval de la Luz Bruja", description: "Un pase de entrada de papel brillante sellado por los señores Mister Witch y Mister Light.", category: 'feywild' },
  { roll: 7, name: "Frasco de polvo de estrellas feérico", description: "Polvo dorado y brillante que flota en el aire antes de desvanecerse.", category: 'feywild' },
  { roll: 8, name: "Sombrero de hongo disecado", description: "Una seta pequeña preservada que conserva un aroma a bosque mágico tras la lluvia.", category: 'feywild' },
  { roll: 9, name: "Burbuja de jabón que nunca explota", description: "Una esfera flotante que se puede guardar en el bolsillo sin romperse.", category: 'feywild' },
  { roll: 10, name: "Moneda de madera bendecida por un dríade", description: "Un disco de roble antiguo con un árbol de la vida grabado en su corteza.", category: 'feywild' },
];

/**
 * Tira 1d100 en la Tabla de Baratijas del Horror (Gothic Horror Trinkets)
 */
export function rollGothicHorrorTrinket(): TrinketItem {
  const roll = Math.floor(Math.random() * GOTHIC_HORROR_TRINKETS.length) + 1;
  return GOTHIC_HORROR_TRINKETS[roll - 1] || GOTHIC_HORROR_TRINKETS[0];
}

/**
 * Tira en la Tabla de Baratijas Comunes
 */
export function rollStandardTrinket(): TrinketItem {
  const roll = Math.floor(Math.random() * STANDARD_TRINKETS.length) + 1;
  return STANDARD_TRINKETS[roll - 1] || STANDARD_TRINKETS[0];
}

/**
 * Tira en la Tabla de Baratijas Feéricas
 */
export function rollFeywildTrinket(): TrinketItem {
  const roll = Math.floor(Math.random() * FEYWILD_TRINKETS.length) + 1;
  return FEYWILD_TRINKETS[roll - 1] || FEYWILD_TRINKETS[0];
}
