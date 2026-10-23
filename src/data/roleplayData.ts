// Tablas de Rol, Personalidad, Ideales, Vínculos y Defectos de D&D 5e
// Inspiradas en el Player's Handbook y compendios oficiales de D&D 5e

export interface RoleplayOption {
  id: string;
  text: string;
  tag?: string; // ej: "Legal", "Caótico", "Bueno", "Malvado", "Neutral"
}

export interface BackgroundRoleplayData {
  personalityTraits: RoleplayOption[];
  ideals: RoleplayOption[];
  bonds: RoleplayOption[];
  flaws: RoleplayOption[];
}

// -------------------------------------------------------------
// 1. TABLAS GENERALES UNIVERSALES (Para cualquier personaje)
// -------------------------------------------------------------
export const GENERAL_PERSONALITY_TRAITS: RoleplayOption[] = [
  { id: 'pt-1', text: 'Siempre tengo una cita poética, refrán o proverbio antiguo para cada situación.' },
  { id: 'pt-2', text: 'No confío fácilmente en nadie que no haya sangrado o luchado a mi lado.' },
  { id: 'pt-3', text: 'Mantengo una calma absoluta y voz serena incluso en medio del peligro mortal.' },
  { id: 'pt-4', text: 'Colecciono pequeñas baratijas, piedras pulidas o recuerdos curiosos de cada viaje.' },
  { id: 'pt-5', text: 'Mi curiosidad es insaciable: no puedo resistirme a investigar un secreto o misterio.' },
  { id: 'pt-6', text: 'Juzgo a las personas por cómo tratan a los animales, mendigos y sirvientes.' },
  { id: 'pt-7', text: 'Siempre encuentro algo divertido o sarcástico que decir, incluso en los peores momentos.' },
  { id: 'pt-8', text: 'Soy directo y franco como un golpe de maza; desprecio las sutilezas y la hipocresía.' },
  { id: 'pt-9', text: 'Planifico metódicamente cada paso antes de actuar y me desespero si otros improvisan.' },
  { id: 'pt-10', text: 'Me apasiona contar historias y exagerar mis hazañas frente al fuego de campamento.' },
];

export const GENERAL_IDEALS: RoleplayOption[] = [
  { id: 'id-1', text: 'Justicia: Nadie está por encima de la ley moral, ni siquiera los reyes o los dioses.', tag: 'Legal' },
  { id: 'id-2', text: 'Libertad: Las cadenas son para las bestias; nadie tiene derecho a esclavizar a otros.', tag: 'Caótico' },
  { id: 'id-3', text: 'Compasión: La verdadera fuerza se demuestra protegiendo a quienes no pueden defenderse.', tag: 'Bueno' },
  { id: 'id-4', text: 'Poder: Solo los fuertes y decididos tienen el derecho de dictar el destino del mundo.', tag: 'Malvado' },
  { id: 'id-5', text: 'Conocimiento: El saber y la comprensión del cosmos son el mayor tesoro existente.', tag: 'Neutral' },
  { id: 'id-6', text: 'Honor: Mi palabra es más sólida que el acero enano; moriría antes de romper una promesa.', tag: 'Legal' },
  { id: 'id-7', text: 'Independencia: Confío en mis propios puños y en nadie más para forjar mi camino.', tag: 'Caótico' },
  { id: 'id-8', text: 'Equilibrio: Toda acción tiene una consecuencia cósmica; no se debe alterar el orden natural.', tag: 'Neutral' },
];

export const GENERAL_BONDS: RoleplayOption[] = [
  { id: 'bd-1', text: 'Todo lo que hago es para devolverle el honor y la gloria perdida a mi familia o linaje.' },
  { id: 'bd-2', text: 'Poseo una extraña reliquia que me entregó mi mentor antes de desaparecer sin dejar rastro.' },
  { id: 'bd-3', text: 'Tengo una deuda de vida impagable con un camarada al que juré proteger a cualquier coste.' },
  { id: 'bd-4', text: 'Mi lealtad pertenece a mi pueblo natal; viajo para enviarles riquezas y protegerlos de las sombras.' },
  { id: 'bd-5', text: 'Busco venganza implacable contra la criatura o tirano que destruyó todo lo que amaba.' },
  { id: 'bd-6', text: 'Dediqué mi alma a una orden sagrada o gremio; sus preceptos son mi única guía de vida.' },
  { id: 'bd-7', text: 'Persigo un amor distante o prohibido que solo podré alcanzar alcanzando renombre de leyenda.' },
  { id: 'bd-8', text: 'Un libro o mapa enigmático que encontré es la clave del enigma más importante de mi existencia.' },
];

export const GENERAL_FLAWS: RoleplayOption[] = [
  { id: 'fl-1', text: 'No puedo resistirme a una apuesta arriesgada, una partida de dados o un desafío temerario.' },
  { id: 'fl-2', text: 'Mi orgullo es desmedido: me cuesta horrores admitir un error, incluso ante la evidencia.' },
  { id: 'fl-3', text: 'Tengo un miedo secreto y visceral a la oscuridad absoluta o a quedar atrapado bajo tierra.' },
  { id: 'fl-4', text: 'El brillo del oro y las gemas preciosas nubla mi juicio y me tienta a cometer imprudencias.' },
  { id: 'fl-5', text: 'Guardo rencores eternos; nunca olvido ni perdono una ofensa, por insignificante que haya sido.' },
  { id: 'fl-6', text: 'Subestimo a mis enemigos creyendo ciegamente que mi habilidad marcial o mágica es superior.' },
  { id: 'fl-7', text: 'Hablo sin pensar antes y suelo decir verdades hirientes en los peores momentos diplomáticos.' },
  { id: 'fl-8', text: 'Cuando el peligro se vuelve abrumador, mi primer instinto egoísta es salvar mi propio pellejo.' },
];

// -------------------------------------------------------------
// 2. TABLAS ESPECÍFICAS SEGÚN TRASFONDOS EMBLEMÁTICOS
// -------------------------------------------------------------
export const BACKGROUND_ROLEPLAY_TABLES: Record<string, BackgroundRoleplayData> = {
  soldado: {
    personalityTraits: [
      { id: 'sol-pt-1', text: 'Mantengo una disciplina militar rigurosa en mi higiene, armas y campamento.' },
      { id: 'sol-pt-2', text: 'He visto los horrores de la guerra de cerca; duermo con un ojo abierto y alerta.' },
      { id: 'sol-pt-3', text: 'Utilizo jerga militar y trato a mis compañeros como si fueran mi escuadrón.' },
      { id: 'sol-pt-4', text: 'Puedo quedarme dormido en cualquier lugar y soportar las peores inclemencias sin quejarme.' },
    ],
    ideals: [
      { id: 'sol-id-1', text: 'Deber: Cumplo las órdenes de mis superiores con precisión milimétrica.', tag: 'Legal' },
      { id: 'sol-id-2', text: 'Hermandad: Quienes combaten hombro con hombro conmigo son mi verdadera familia.', tag: 'Bueno' },
      { id: 'sol-id-3', text: 'Fuerza: En la batalla, solo la espada más afilada y el brazo más firme dictan la verdad.', tag: 'Neutral' },
    ],
    bonds: [
      { id: 'sol-bd-1', text: 'Daré mi vida con honor para proteger a los soldados bajo mi mando o a mis camaradas.' },
      { id: 'sol-bd-2', text: 'Conservo el estandarte desgarrado de mi antiguo regimiento caído en batalla.' },
      { id: 'sol-bd-3', text: 'Busco al general traidor que vendió a mis compañeros en una emboscada fatal.' },
    ],
    flaws: [
      { id: 'sol-fl-1', text: 'Los recuerdos del campo de batalla me atormentan en pesadillas constantes.' },
      { id: 'sol-fl-2', text: 'Trato a los civiles con condescendencia creyendo que son débiles e ingenuos.' },
      { id: 'sol-fl-3', text: 'Me cuesta obedecer a líderes que nunca han empuñado un arma en un combate real.' },
    ],
  },
  criminal: {
    personalityTraits: [
      { id: 'crm-pt-1', text: 'Siempre tengo un plan de escape y ubico todas las salidas en cada taberna o sala.' },
      { id: 'crm-pt-2', text: 'Hablo en susurros y desconfío automáticamente de cualquier guardia o autoridad.' },
      { id: 'crm-pt-3', text: 'Toco y tanteo constantemente los bolsillos de las personas sin darme cuenta.' },
      { id: 'crm-pt-4', text: 'Valoro el silencio por encima de todo; las palabras vacías solo atraen problemas.' },
    ],
    ideals: [
      { id: 'crm-id-1', text: 'Libertad: Las leyes son cadenas impuestas por los ricos para controlar a los audaces.', tag: 'Caótico' },
      { id: 'crm-id-2', text: 'Lealtad: Entre ladrones y proscritos, la traición se paga con la vida; soy fiel a los míos.', tag: 'Legal' },
      { id: 'crm-id-3', text: 'Codicia: Haré lo que sea necesario si el botín contiene suficientes monedas de oro.', tag: 'Malvado' },
    ],
    bonds: [
      { id: 'crm-bd-1', text: 'Debo una suma exorbitante a un peligroso jefe del bajo mundo que me busca.' },
      { id: 'crm-bd-2', text: 'Envío la mayor parte de mi dinero mal habido para mantener a mi familia en el anonimato.' },
      { id: 'crm-bd-3', text: 'Un antiguo socio me traicionó y me dejó pudriéndome en una celda; pagaré esa deuda.' },
    ],
    flaws: [
      { id: 'crm-fl-1', text: 'Si veo algo brillante y desprotegido, mi impulso inicial siempre es robarlo.' },
      { id: 'crm-fl-2', text: 'Huyo a la primera señal de que las cosas se complican en vez de luchar hasta el final.' },
      { id: 'crm-fl-3', text: 'Nunca creo en las intenciones altruistas; creo que todo el mundo tiene un motivo oculto.' },
    ],
  },
  acolito: {
    personalityTraits: [
      { id: 'aco-pt-1', text: 'Interpreto casi cada suceso fortuito como una señal directa o presagio de mi deidad.' },
      { id: 'aco-pt-2', text: 'He pasado tanto tiempo en los templos que me cuesta entender las normas callejeras mundanas.' },
      { id: 'aco-pt-3', text: 'Cito oraciones sagradas y escrituras canónicas en medio de conversaciones cotidianas.' },
      { id: 'aco-pt-4', text: 'Veo la bondad potencial en las almas más corrompidas y siempre ofrezco redención.' },
    ],
    ideals: [
      { id: 'aco-id-1', text: 'Fe: Confío ciegamente en que los dioses guían mis pasos y nunca me abandonarán.', tag: 'Bueno' },
      { id: 'aco-id-2', text: 'Tradición: Los ritos y liturgias ancestrales deben preservarse con devoción estricta.', tag: 'Legal' },
      { id: 'aco-id-3', text: 'Poder Sagrado: La magia divina es el único poder legítimo en el multiverso.', tag: 'Neutral' },
    ],
    bonds: [
      { id: 'aco-bd-1', text: 'Haría cualquier cosa por defender el templo sagrado donde fui consagrado sacerdote.' },
      { id: 'aco-bd-2', text: 'Busco recuperar una reliquia santa robada que fue profanada por herejes oscuros.' },
      { id: 'aco-bd-3', text: 'Mi meta es difundir las bendiciones y doctrinas de mi dios por tierras paganas.' },
    ],
    flaws: [
      { id: 'aco-fl-1', text: 'Juzgo severamente a cualquiera que no comparta mi fe o exprese dudas teológicas.' },
      { id: 'aco-fl-2', text: 'Obedezco ciegamente a la jerarquía de mi iglesia, incluso ante órdenes cuestionables.' },
      { id: 'aco-fl-3', text: 'Confío en que mi dios me salvará de peligros absurdos en lugar de ser precavido.' },
    ],
  },
  sabio: {
    personalityTraits: [
      { id: 'sab-pt-1', text: 'Hablo con palabras refinadas y vocabulario complejo que a menudo confunde a otros.' },
      { id: 'sab-pt-2', text: 'Me pierdo tan profundamente en mis pensamientos y libros que olvido mi entorno.' },
      { id: 'sab-pt-3', text: 'Creo firmemente que no hay problema que no pueda resolverse con estudio riguroso.' },
      { id: 'sab-pt-4', text: 'Estoy convencido de que la mayoría de las personas son desesperadamente ignorantes.' },
    ],
    ideals: [
      { id: 'sab-id-1', text: 'Conocimiento: El camino hacia el progreso radica en desentrañar los secretos arcanos.', tag: 'Neutral' },
      { id: 'sab-id-2', text: 'Lógica: Las emociones nublan la mente; solo el pensamiento racional lleva a la verdad.', tag: 'Legal' },
      { id: 'sab-id-3', text: 'Innovación: Las viejas doctrinas deben desafiarse con descubrimientos revolucionarios.', tag: 'Caótico' },
    ],
    bonds: [
      { id: 'sab-bd-1', text: 'Llevo conmigo el manuscrito inacabado de la investigación que definirá mi legado.' },
      { id: 'sab-bd-2', text: 'Deseo proteger la gran biblioteca o archivo de sabiduría donde me formé como erudito.' },
      { id: 'sab-bd-3', text: 'Busco la respuesta al enigma cosmológico que causó la locura de mi antiguo maestro.' },
    ],
    flaws: [
      { id: 'sab-fl-1', text: 'Me distraigo fácilmente si encuentro un texto o inscripción antigua en medio de un peligro.' },
      { id: 'sab-fl-2', text: 'Prefiero tener la razón en un debate teórico antes que salvar la vida de alguien.' },
      { id: 'sab-fl-3', text: 'Asumo que cualquiera que carezca de educación formal no tiene nada inteligente que aportar.' },
    ],
  },
  noble: {
    personalityTraits: [
      { id: 'nob-pt-1', text: 'Mis modales son aristocráticos e impecables, y espero el mismo respeto de los demás.' },
      { id: 'nob-pt-2', text: 'Me resulta difícil soportar la comida barata, camas duras y tabernas sucias de los plebeyos.' },
      { id: 'nob-pt-3', text: 'Estoy convencido de que mi estirpe me otorga un deber ineludible de guiar a los demás.' },
      { id: 'nob-pt-4', text: 'Nunca muestro debilidad ni sorpresa; la compostura noble es mi armadura social.' },
    ],
    ideals: [
      { id: 'nob-id-1', text: 'Responsabilidad: La nobleza obliga a cuidar del bienestar de quienes están bajo mi mando.', tag: 'Bueno' },
      { id: 'nob-id-2', text: 'Linaje: La sangre y el estatus son lo que distingue a los líderes legítimos del caos.', tag: 'Legal' },
      { id: 'nob-id-3', text: 'Prestigio: La fama y la posición social valen más que todas las montañas de oro.', tag: 'Neutral' },
    ],
    bonds: [
      { id: 'nob-bd-1', text: 'Mi lealtad pertenece por entero a la casa noble y tierras que un día gobernaré.' },
      { id: 'nob-bd-2', text: 'Limpio el honor de mi familia manchado por las acusaciones de una casa rival.' },
      { id: 'nob-bd-3', text: 'Llevo un anillo o sello familiar que no puedo perder bajo ninguna circunstancia.' },
    ],
    flaws: [
      { id: 'nob-fl-1', text: 'Me ofende profundamente que alguien me tutee o no reconozca mi rango de inmediato.' },
      { id: 'nob-fl-2', text: 'Gasto oro con descaro y sin control creyendo que mi fortuna familiar es inagotable.' },
      { id: 'nob-fl-3', text: 'Oculto un secreto vergonzoso que, de salir a la luz, arruinaría a mi estirpe para siempre.' },
    ],
  },
  'exposito-gigantes': {
    personalityTraits: [
      { id: 'eg-pt-1', text: 'Lo que me falta de estatura lo compenso con puro rencor y agallas.' },
      { id: 'eg-pt-2', text: 'Insisto en que se me tome en serio como un adulto completo. ¡Nadie me mira por encima del hombro!' },
      { id: 'eg-pt-3', text: 'Los espacios abarrotados me incomodan. Prefiero con creces un campo abierto a una taberna bulliciosa.' },
      { id: 'eg-pt-4', text: 'Acepto mi menor estatura: me ayuda a pasar desapercibido y a que me subestimen.' },
      { id: 'eg-pt-5', text: 'Toda avalancha comienza como un único guijarro.' },
      { id: 'eg-pt-6', text: 'El mundo siempre me parece demasiado grande, y temo no encontrar nunca mi lugar en él.' },
    ],
    ideals: [
      { id: 'eg-id-1', text: 'Poder: Los gigantes me enseñaron que solo los fuertes prevalecen ante la intemperie cósmica.', tag: 'Malvado' },
      { id: 'eg-id-2', text: 'Comunidad: En una familia gigante aprendí que protegernos unos a otros es la base de toda existencia.', tag: 'Bueno' },
      { id: 'eg-id-3', text: 'Destino: El Ordenamiento de los gigantes dicta que cada ser tiene un lugar sagrado en el tapiz del mundo.', tag: 'Legal' },
      { id: 'eg-id-4', text: 'Libertad: Ninguna criatura, sin importar su tamaño colosal, tiene derecho a pisotear mi independencia.', tag: 'Caótico' },
      { id: 'eg-id-5', text: 'Equilibrio: El mundo alberga tanto a lo diminuto como a lo titánico; todo tiene su propósito armónico.', tag: 'Neutral' },
    ],
    bonds: [
      { id: 'eg-bd-1', text: 'El clan o familia gigante que me crió es lo más sagrado que tengo; defendería su honor con mi vida.' },
      { id: 'eg-bd-2', text: 'Llevo conmigo una pequeña piedra o reliquia que me entregó mi padre adoptivo gigante antes de partir.' },
      { id: 'eg-bd-3', text: 'Busco demostrar ante el Ordenamiento de los gigantes que una persona de mi estatura puede alcanzar la gloria legendaria.' },
      { id: 'eg-bd-4', text: 'Juré proteger a las criaturas pequeñas y desvalidas frente a los abusos de seres colosales y tiranos.' },
    ],
    flaws: [
      { id: 'eg-fl-1', text: 'Subestimo los peligros de mi propio tamaño y suelo actuar como si fuera invulnerable a los golpes.' },
      { id: 'eg-fl-2', text: 'Me enfurezco ciegamente si alguien se burla de mi estatura o me trata como si fuera una criatura indefensa.' },
      { id: 'eg-fl-3', text: 'Mis modales son toscos y colosales; no entiendo las delicadezas ni la etiqueta social de las ciudades.' },
      { id: 'eg-fl-4', text: 'A veces me paraliza el pánico de que mis compañeros descubran lo vulnerable que me siento en realidad.' },
    ],
  },
  entertainer: {
    personalityTraits: [
      { id: 'ent-pt-1', text: 'Conozco una historia o anécdota relevante para casi cualquier situación.' },
      { id: 'ent-pt-2', text: 'Siempre que llego a un lugar nuevo, recopilo los rumores locales y difundo cotilleos.' },
      { id: 'ent-pt-3', text: 'Soy un romántico empedernido, siempre en busca de esa persona especial.' },
      { id: 'ent-pt-4', text: 'Nadie puede permanecer enfadado conmigo por mucho tiempo; sé cómo disipar cualquier tensión.' },
      { id: 'ent-pt-5', text: 'Me encantan los insultos ingeniosos, incluso si van dirigidos hacia mí.' },
      { id: 'ent-pt-6', text: 'Me pongo de mal humor y me amargo si no soy el centro de atención.' },
      { id: 'ent-pt-7', text: 'Me esfuerzo al máximo por ser el mejor en mi arte, sin importar el coste.' },
      { id: 'ent-pt-8', text: 'Cambio de humor tan rápido como el compás de una canción alegre.' },
    ],
    ideals: [
      { id: 'ent-id-1', text: 'Belleza: Cuando actúo, hago que el mundo sea un lugar más hermoso y brillante.', tag: 'Bueno' },
      { id: 'ent-id-2', text: 'Tradición: Las historias y canciones del pasado nos enseñan quiénes somos y no deben olvidarse.', tag: 'Legal' },
      { id: 'ent-id-3', text: 'Creatividad: El mundo necesita nuevas ideas, osadía y emociones audaces.', tag: 'Caótico' },
      { id: 'ent-id-4', text: 'Codicia: Solo estoy en esto por el oro y la adulación del público.', tag: 'Malvado' },
      { id: 'ent-id-5', text: 'Gente: Me apasiona ver sonreír a las multitudes; es lo único que me importa.', tag: 'Neutral' },
      { id: 'ent-id-6', text: 'Honestidad: El arte debe reflejar las verdades más crudas y profundas del alma humana.', tag: 'Cualquiera' },
    ],
    bonds: [
      { id: 'ent-bd-1', text: 'Mi instrumento musical es mi posesión más preciada y me recuerda a alguien que amé.' },
      { id: 'ent-bd-2', text: 'Alguien robó mi preciado instrumento y algún día lo recuperaré cueste lo que cueste.' },
      { id: 'ent-bd-3', text: 'Quiero ser famoso en todas las tabernas y cortes del continente, cueste lo que cueste.' },
      { id: 'ent-bd-4', text: 'Idolatro a un héroe o artista legendario de antaño y mido cada uno de mis logros comparándome con él.' },
      { id: 'ent-bd-5', text: 'Haría cualquier cosa para proteger el teatro, circo o compañía de cómicos donde aprendí mi oficio.' },
      { id: 'ent-bd-6', text: 'Haría cualquier sacrificio por los demás miembros de mi antigua compañía itinerante.' },
    ],
    flaws: [
      { id: 'ent-fl-1', text: 'Haré cualquier cosa por ganar la aprobación, ovación y aplausos de una multitud.' },
      { id: 'ent-fl-2', text: 'Tengo una debilidad incorregible por los rostros hermosos y la coquetería.' },
      { id: 'ent-fl-3', text: 'Un escándalo me impide regresar a mi hogar natal; los problemas parecen seguirme a donde voy.' },
      { id: 'ent-fl-4', text: 'Una vez me burlé de un noble poderoso que aún quiere mi cabeza; y temo volver a hacerlo.' },
      { id: 'ent-fl-5', text: 'Tengo problemas para ocultar mis verdaderas opiniones; mi lengua afilada siempre me mete en líos.' },
      { id: 'ent-fl-6', text: 'A pesar de mis mejores intenciones, a menudo resulto poco de fiar para mis amigos cuando surge una fiesta.' },
    ],
  },
  entertainer_toc1: {
    personalityTraits: [
      { id: 'gla-pt-1', text: 'Conozco una historia o anécdota marcial relevante para casi cualquier situación.' },
      { id: 'gla-pt-2', text: 'Siempre que llego a un nuevo poblado, investigo los rumores sobre fosos de lucha y campeones locales.' },
      { id: 'gla-pt-3', text: 'Soy un romántico empedernido, buscando siempre a esa persona especial entre la multitud que me aclama.' },
      { id: 'gla-pt-4', text: 'Nadie puede permanecer enfadado conmigo por mucho tiempo; sé cómo disipar la tensión con bravuconería.' },
      { id: 'gla-pt-5', text: 'Me encantan las provocaciones e insultos ingeniosos antes de un combate, incluso si van dirigidos hacia mí.' },
      { id: 'gla-pt-6', text: 'Me vuelvo hosco y amargado si no soy el centro de atención en la taberna o en la arena.' },
      { id: 'gla-pt-7', text: 'No me conformo con menos que la perfección absoluta en mis acrobacias y técnicas de combate.' },
      { id: 'gla-pt-8', text: 'Cambio de humor tan rápido como el compás de un duelo o una tonada festiva.' },
    ],
    ideals: [
      { id: 'gla-id-1', text: 'Belleza: En el fragor del combate, convierto el acero y el movimiento en una auténtica obra de arte.', tag: 'Bueno' },
      { id: 'gla-id-2', text: 'Tradición: Los rituales y códigos de honor de la arena deben respetarse rigurosamente.', tag: 'Legal' },
      { id: 'gla-id-3', text: 'Libertad: La arena enseña que ninguna cadena es eterna; lucho por romper mis propias ataduras.', tag: 'Caótico' },
      { id: 'gla-id-4', text: 'Poder: Solo la fuerza, los aplausos de las masas y el botín en oro determinan el valor de un campeón.', tag: 'Malvado' },
      { id: 'gla-id-5', text: 'Espectáculo: Mientras el público sonría y viva emociones intensas, mi sangre habrá valido la pena.', tag: 'Neutral' },
      { id: 'gla-id-6', text: 'Honradez: Un verdadero luchador jamás amaña una pelea ni traiciona su juramento marcial.', tag: 'Legal' },
    ],
    bonds: [
      { id: 'gla-bd-1', text: 'Mi tridente, red o instrumento es mi posesión más preciada y me recuerda a mi maestro de armas.' },
      { id: 'gla-bd-2', text: 'Un antiguo rival me humilló en la arena pública; algún día le devolveré el golpe y restauraré mi gloria.' },
      { id: 'gla-bd-3', text: 'Deseo alcanzar renombre legendario en todas las arenas del continente, cueste lo que cueste.' },
      { id: 'gla-bd-4', text: 'Idolatro a un gladiador legendario de la antigüedad y comparo cada una de mis victorias con las suyas.' },
      { id: 'gla-bd-5', text: 'Daría mi vida por proteger el foso o coliseo donde me forjé y a los hermanos de armas que lucharon conmigo.' },
      { id: 'gla-bd-6', text: 'Lucho para pagar una exorbitante deuda que me devolverá a mí o a mis seres queridos la libertad total.' },
    ],
    flaws: [
      { id: 'gla-fl-1', text: 'Haría cualquier locura temeraria por conseguir el rugido atronador y los aplausos de la multitud.' },
      { id: 'gla-fl-2', text: 'Tengo una debilidad incorregible por los rostros atractivos y los halagos de mis admiradores.' },
      { id: 'gla-fl-3', text: 'Un escándalo en una arena clandestina me persigue; temo que la guardia o mis acreedores me encuentren.' },
      { id: 'gla-fl-4', text: 'Una vez que comienzo a beber y celebrar tras una victoria, pierdo por completo la moderación.' },
      { id: 'gla-fl-5', text: 'No tolero que otro luchador o artista reciba más atención o vítores que yo.' },
      { id: 'gla-fl-6', text: 'Subestimo a mis contrincantes confiando en exceso en mis florituras y movimientos llamativos.' },
    ],
  },
};

BACKGROUND_ROLEPLAY_TABLES.animador = BACKGROUND_ROLEPLAY_TABLES.entertainer;
BACKGROUND_ROLEPLAY_TABLES.gladiador = BACKGROUND_ROLEPLAY_TABLES.entertainer_toc1;

// -------------------------------------------------------------
// 3. UTILIDADES DE GENERACIÓN ALEATORIA CON DADOS
// -------------------------------------------------------------

import { WIKIDOT_BACKGROUNDS } from './wikidotBackgroundsData';

export function getRoleplayOptionsForBackground(backgroundId?: string): BackgroundRoleplayData {
  if (backgroundId) {
    const bgPreset = BACKGROUND_ROLEPLAY_TABLES[backgroundId];
    const parsedBg = WIKIDOT_BACKGROUNDS.find(b => b.id === backgroundId);
    
    const parsedTraits: RoleplayOption[] = (parsedBg?.personalityTraits || []).map((text, i) => ({
      id: `${backgroundId}-pt-${i + 1}`,
      text,
    }));
    const parsedIdeals: RoleplayOption[] = (parsedBg?.ideals || []).map((text, i) => ({
      id: `${backgroundId}-id-${i + 1}`,
      text,
    }));
    const parsedBonds: RoleplayOption[] = (parsedBg?.bonds || []).map((text, i) => ({
      id: `${backgroundId}-bd-${i + 1}`,
      text,
    }));
    const parsedFlaws: RoleplayOption[] = (parsedBg?.flaws || []).map((text, i) => ({
      id: `${backgroundId}-fl-${i + 1}`,
      text,
    }));

    const specificTraits = bgPreset?.personalityTraits.length ? bgPreset.personalityTraits : parsedTraits;
    const specificIdeals = bgPreset?.ideals.length ? bgPreset.ideals : parsedIdeals;
    const specificBonds = bgPreset?.bonds.length ? bgPreset.bonds : parsedBonds;
    const specificFlaws = bgPreset?.flaws.length ? bgPreset.flaws : parsedFlaws;

    return {
      personalityTraits: specificTraits.length > 0 ? [...specificTraits, ...GENERAL_PERSONALITY_TRAITS] : GENERAL_PERSONALITY_TRAITS,
      ideals: specificIdeals.length > 0 ? [...specificIdeals, ...GENERAL_IDEALS] : GENERAL_IDEALS,
      bonds: specificBonds.length > 0 ? [...specificBonds, ...GENERAL_BONDS] : GENERAL_BONDS,
      flaws: specificFlaws.length > 0 ? [...specificFlaws, ...GENERAL_FLAWS] : GENERAL_FLAWS,
    };
  }
  return {
    personalityTraits: GENERAL_PERSONALITY_TRAITS,
    ideals: GENERAL_IDEALS,
    bonds: GENERAL_BONDS,
    flaws: GENERAL_FLAWS,
  };
}

export function rollRandomOption(options: RoleplayOption[]): RoleplayOption {
  const index = Math.floor(Math.random() * options.length);
  return options[index] || options[0];
}
