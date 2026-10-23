import { driver, DriveStep } from 'driver.js';

export type CreatorStepName =
  | 'identity'
  | 'race'
  | 'background'
  | 'class'
  | 'abilities'
  | 'asi_feats'
  | 'spells'
  | 'equipment'
  | 'review';

export interface TutorialContext {
  currentStep: CreatorStepName;
  characterLevel: number;
  activeRace: any | null;
  activeSubrace: any | null;
  selectedRaceId: string;
  selectedSubraceId: string;
  raceAnyCount: number;
  hasBonusRacialSkills: boolean;
  hasRacialMagic: boolean;
  activeBackground: any | null;
  activeClass: any | null;
  activeSubclass: any | null;
  subclassUnlockLevel: number;
  isSubclassUnlocked: boolean;
  isCaster: boolean;
  hasTacticalFeatures: boolean;
  hasExpertise: boolean;
  hasFightingStyle: boolean;
  pendingDecisionsCount: number;
  hasBackgroundBonusFeat: boolean;
  hasBackgroundTools: boolean;
  hasBackgroundLanguages: boolean;
  hasBackgroundTrinkets: boolean;
  hasBackgroundSkillChoices: boolean;
}

export interface TutorialStepDef {
  element: string;
  fallbackElement?: string;
  tabId: CreatorStepName;
  title: string;
  badge?: string;
  descriptionHtml: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

/**
 * Resolves an element in the DOM asynchronously, waiting for React to mount it
 * after a tab transition or state change. Gracefully falls back if not found.
 */
function waitForElementReady(
  selector: string,
  fallbackSelector?: string,
  timeoutMs: number = 2000
): Promise<string> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(selector);
    }
    if (fallbackSelector && document.querySelector(fallbackSelector)) {
      return resolve(fallbackSelector);
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        return resolve(selector);
      }
      if (fallbackSelector && document.querySelector(fallbackSelector)) {
        clearInterval(interval);
        return resolve(fallbackSelector);
      }
      if (Date.now() - startTime >= timeoutMs) {
        clearInterval(interval);
        if (fallbackSelector && document.querySelector(fallbackSelector)) {
          return resolve(fallbackSelector);
        }
        return resolve(selector);
      }
    }, 30);
  });
}

/**
 * Generates the complete, context-aware sequence of tutorial steps.
 * Covers every main decision and every sub-decision (skills, tools, languages,
 * trinkets d100, subraces, flex points, subclasses, fighting styles, etc.).
 */
export function generateDynamicTutorialSteps(
  ctx: TutorialContext,
  mode: 'full' | 'step' = 'full'
): TutorialStepDef[] {
  const steps: TutorialStepDef[] = [];

  const shouldIncludeTab = (tab: CreatorStepName) => {
    return mode === 'full' || ctx.currentStep === tab;
  };

  // -------------------------------------------------------------
  // TAB 1: IDENTIDAD, ROL E HISTORIA
  // -------------------------------------------------------------
  if (shouldIncludeTab('identity')) {
    if (mode === 'full') {
      steps.push({
        element: '#creator-tour-header',
        fallbackElement: '#step-tab-identity-content',
        tabId: 'identity',
        badge: 'Inicio',
        title: '🏰 Bienvenido a la Forja de Aventureros 5e',
        descriptionHtml:
          '<p>Esta guía interactiva te acompañará <strong>paso a paso</strong> a través de la creación completa de tu personaje oficial de D&D 5e.</p>' +
          '<p>El creador integra <strong>todas las reglas oficiales y subdecisiones</strong>: linajes raciales, trasfondos con dados d100, arquetipos de clase, tirador 4d6, dones arcanos y equipo en vivo.</p>' +
          '<div class="driver-callout">👉 Pulsa <strong>Siguiente Paso</strong> para comenzar por la identidad y nivel de tu héroe.</div>',
        side: 'bottom',
        align: 'start',
      });
    }

    steps.push({
      element: '#creator-identity-names',
      fallbackElement: '#step-tab-identity-content',
      tabId: 'identity',
      badge: 'Identidad',
      title: '1. Nombre del Héroe y del Jugador',
      descriptionHtml:
        '<p>Todo gran personaje necesita un nombre para ser recordado en las tabernas y crónicas de la campaña.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Escribe aquí el <strong>Nombre de tu Personaje</strong> y tu nombre como <strong>Jugador</strong>.</div>',
      side: 'bottom',
      align: 'start',
    });

    steps.push({
      element: '#creator-identity-level',
      fallbackElement: '#creator-identity-names',
      tabId: 'identity',
      badge: 'Nivel 1-20',
      title: '2. Nivel Inicial & Bonificador de Competencia (PB)',
      descriptionHtml:
        `<p>Ajusta el nivel con los botones <strong>-</strong> y <strong>+</strong>. A nivel 1 comienzas con <strong>PB +2</strong>.</p>` +
        '<p style="font-size: 11.5px; opacity: 0.9;">El nivel calcula automáticamente tus <strong>Puntos de Golpe (PG)</strong>, tus <strong>espacios de conjuro</strong> y desbloquea tu <strong>Subclase</strong> según tu vocación.</p>' +
        '<div class="driver-callout">👉 Si inicias una campaña desde nivel superior, súbelo aquí y todo se recalculará.</div>',
      side: 'bottom',
      align: 'start',
    });

    steps.push({
      element: '#creator-identity-avatar',
      fallbackElement: '#step-tab-identity-content',
      tabId: 'identity',
      badge: 'Retrato',
      title: '3. Retrato del Personaje (Avatar & Marco)',
      descriptionHtml:
        '<p>Elige el aspecto visual de tu aventurero. Puedes <strong>subir una imagen desde tu dispositivo</strong> o <strong>pegar una URL web</strong> directa.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Tu avatar se engarzará automáticamente dentro de un marco de fantasía en la ficha lateral y en el dossier de revisión.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa <em>"Subir desde mi Dispositivo"</em> o pega una URL para darle rostro a tu héroe.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-identity-alignment',
      fallbackElement: '#step-tab-identity-content',
      tabId: 'identity',
      badge: 'Ética',
      title: '4. Alineamiento Moral y Filosófico',
      descriptionHtml:
        '<p>Define la brújula ética de tu héroe en la matriz de 9 posiciones oficiales de 5e combinando <strong>Ley vs Caos</strong> con <strong>Bien vs Mal</strong>:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Legal Bueno:</strong> Honor, justicia y deber social.<br/>• <strong>Caótico Bueno:</strong> Nobleza y libertad sin ataduras.<br/>• <strong>Neutral Auténtico:</strong> Pragmatismo y equilibrio natural.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic sobre la casilla de alineamiento que mejor represente las convicciones de tu aventurero.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 2: RAZA Y LINAJES ANCESTRALES
  // -------------------------------------------------------------
  if (shouldIncludeTab('race')) {
    steps.push({
      element: '#creator-race-catalog',
      fallbackElement: '#step-tab-race-content',
      tabId: 'race',
      badge: 'Raza Base',
      title: '5. Elige tu Raza & Linaje Ancestral',
      descriptionHtml:
        '<p>Tu raza define tu especie fantástica, tamaño, velocidad de movimiento, sentidos como <em>Visión en la Oscuridad</em> y bonificaciones directas a tus atributos (+2 / +1).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Puedes filtrar por categorías (<strong>Comunes, Exóticas, Monstruosas, Planares</strong>) o usar el buscador superior.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic en una raza. Al seleccionarla, se desplegarán inmediatamente en esta misma hoja sus subrazas, puntos libres y rasgos ancestrales.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-race-subraces',
      fallbackElement: '#creator-race-traits',
      tabId: 'race',
      badge: 'Subdecisión: Subraza',
      title: `6. Subraza / Linaje Específico ${ctx.activeRace ? `(${ctx.activeRace.name})` : ''}`,
      descriptionHtml:
        '<p>Muchos linajes (Elfos, Enanos, Gnomos, Medianos, etc.) se ramifican en culturas y subespecies con dotes únicas.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Por ejemplo, un <em>Alto Elfo</em> conoce trucos arcanos adicionales, mientras que un <em>Elfo de los Bosques</em> gana velocidad y camuflaje natural.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Si tu raza posee subrazas disponibles, selecciona tu linaje favorito para sumar sus rasgos.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-race-flexible',
      fallbackElement: '#creator-race-traits',
      tabId: 'race',
      badge: 'Subdecisión: Atributos',
      title: `7. Puntos Flexibles de Característica ${ctx.raceAnyCount > 0 ? `(+${ctx.raceAnyCount})` : ''}`,
      descriptionHtml:
        '<p>Linajes adaptables (como el Medio Elfo o el Humano Variante) conceden <strong>puntos libres</strong> para sumar a las características que prefieras potenciar.</p>' +
        '<div class="driver-callout">👉 Si tu linaje otorga puntos libres, pulsa sobre las características que desees aumentar.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-race-bonus-skills',
      fallbackElement: '#creator-race-traits',
      tabId: 'race',
      badge: 'Subdecisión: Habilidades',
      title: '8. Competencias de Habilidad Raciales Gratuitas',
      descriptionHtml:
        '<p>Ciertas culturas ancestrales (Semielfos, Kenku, Cambiaformas) permiten elegir talentos de habilidad adicionales a tu libre elección.</p>' +
        '<div class="driver-callout">👉 Marca las habilidades que deseas dominar como talento innato.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-racial-spells-panel',
      fallbackElement: '#creator-race-traits',
      tabId: 'race',
      badge: 'Magia Innata',
      title: '9. Magia Innata Ancestral & Dones Arcanos',
      descriptionHtml:
        '<p>Poderes sobrenaturales hereditarios (como la Taumaturgia de los Tiflin o las Fulerías de los Drow). <strong>No consumen ranuras de conjuro</strong> ni cuentan contra el límite de tu clase.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Aquí podrás seleccionar tu truco racial extra (si aplica) y definir tu característica de aptitud de lanzamiento mental (<strong>Inteligencia, Sabiduría o Carisma</strong>).</p>' +
        '<div class="driver-callout">👉 Revisa tus hechizos innatos calculados con su CD oficial en vivo.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-race-traits',
      fallbackElement: '#step-tab-race-content',
      tabId: 'race',
      badge: 'Rasgos Heredados',
      title: '10. Dones y Rasgos Raciales Heredados',
      descriptionHtml:
        '<p>Aquí se resumen todas las resistencias elementales, sentidos místicos e inmunidades biológicas de tu linaje.</p>' +
        '<div class="driver-callout">👉 Una vez elegida tu raza y subdecisiones, avanza a tu Trasfondo.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 3: TRASFONDO, IDIOMAS Y PILARES DE ROL
  // -------------------------------------------------------------
  if (shouldIncludeTab('background')) {
    steps.push({
      element: '#creator-background-catalog',
      fallbackElement: '#step-tab-background-content',
      tabId: 'background',
      badge: 'Trasfondo Base',
      title: '11. Catálogo de Trasfondos (99 Oficiales)',
      descriptionHtml:
        '<p>Tu ocupación previa a la vida de aventurero (Acólito, Soldado, Criminal, Erudito, Forastero, Huérfano, etc.).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Otorga <strong>2 competencias de habilidad</strong>, idiomas, herramientas de trabajo, oro inicial y un rasgo narrativo único para interactuar con el mundo.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic en una tarjeta de trasfondo. Al elegirlo, se desplegarán inmediatamente aquí abajo en la hoja todas sus opciones de configuración (habilidades, herramientas, idiomas y baratijas d100).</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-background-skill-choices',
      fallbackElement: '#creator-background-subdecisions',
      tabId: 'background',
      badge: 'Subdecisión: Habilidades',
      title: '12. Elección de Habilidades de Trasfondo',
      descriptionHtml:
        '<p>Cada trasfondo otorga <strong>2 competencias de habilidad</strong> clave. Si el trasfondo concede habilidades fijas, figurarán ya asignadas a tu hoja.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Si el trasfondo ofrece una lista para elegir (como en <em>Feylost</em> o <em>Investigador</em>), márcalas en este panel para asignarlas.</p>' +
        '<div class="driver-callout">👉 Marca tus habilidades de trasfondo requeridas.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-background-tools',
      fallbackElement: '#creator-background-subdecisions',
      tabId: 'background',
      badge: 'Subdecisión: Herramientas',
      title: '13. Competencia en Herramientas o Instrumentos',
      descriptionHtml:
        '<p>Tu trasfondo te otorga maestría en útiles de trabajo (herramientas de ladrón, kits de disfraz, venenos, alquimia, cartas de navegación) o instrumentos musicales.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Puedes marcar las opciones canónicas que ofrece el manual o escribir una <strong>herramienta personalizada</strong> en el casillero inferior.</p>' +
        '<div class="driver-callout">👉 Selecciona tus herramientas o introduce una adaptada a tu historia.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-background-languages',
      fallbackElement: '#creator-background-subdecisions',
      tabId: 'background',
      badge: 'Subdecisión: Idiomas',
      title: '14. Idiomas Adicionales de Trasfondo',
      descriptionHtml:
        '<p>Las lenguas aprendidas durante tus andanzas. El sistema respeta las reglas oficiales de D&D 5e:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Idiomas Fijos:</strong> Lenguas obligatorias del trasfondo.<br/>• <strong>Lenguas Restringidas:</strong> Elección histórica (ej: Silvano o Élfico).<br/>• <strong>Ranuras Exóticas:</strong> Lenguas arcanas (Abisal, Celestial, Habla Profunda, Dracónico).<br/>• <strong>Innatos por Raza:</strong> Tus lenguas nativas están protegidas y no consumen ranuras.</p>' +
        '<div class="driver-callout">👉 Marca los idiomas que habla tu aventurero o escribe un dialecto propio.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-background-trinkets',
      fallbackElement: '#creator-background-subdecisions',
      tabId: 'background',
      badge: 'Subdecisión: 🎲 d100',
      title: '15. Baratijas y Evidencias con Tirador de Dados (🎲 1d100)',
      descriptionHtml:
        '<p>Objetos con misterio narrativo ligados a tu pasado (una carta sellada con cera negra, una moneda que no para de rodar, una reliquia feérica...).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">El creador cuenta con las <strong>tablas oficiales d100 completas</strong> (Horror Gótico, Feérica y Común).</p>' +
        '<div class="driver-callout">👉 <strong>¡Tira el dado!</strong> Pulsa el botón <strong>🎲 Tirar 1d100</strong> para sortear tu baratija al azar, o elige una de la lista desplegable.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-background-bonus-feat',
      fallbackElement: '#creator-background-subdecisions',
      tabId: 'background',
      badge: 'Dote Gratuita',
      title: '16. Dote Oficial Otorgada por Trasfondo',
      descriptionHtml:
        '<p>Ciertos trasfondos de fuentes oficiales avanzadas (Dragonlance, Planescape, Gigantes) otorgan una <strong>Dote Gratuita a Nivel 1</strong>.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Si tu trasfondo incluye este beneficio, verás aquí su panel táctico para elegir sus opciones (ej: tipo de golpe o runa consagrada).</p>' +
        '<div class="driver-callout">👉 Configura la dote si está disponible en tu trasfondo.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-identity-roleplay-box',
      fallbackElement: '#step-tab-background-content',
      tabId: 'background',
      badge: 'Pilares de Rol',
      title: '17. Personalidad, Ideales, Vínculos y Defectos',
      descriptionHtml:
        '<p>Los 4 pilares psicológicos que dan vida a tu personaje en la mesa de juego:</p>' +
        '<p style="margin: 4px 0 8px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Rasgos:</strong> Manías, gestos y hábitos cotidianos.<br/>• <strong>Ideales:</strong> Principios éticos por los que daría la vida.<br/>• <strong>Vínculos:</strong> Su gente, juramentos o lugares sagrados.<br/>• <strong>Defectos:</strong> Sus tentaciones, vicios o debilidades morales.</p>' +
        '<div class="driver-callout">👉 <strong>¡Tira con dados!</strong> Pulsa el botón <strong>🎲🎲 Tirar Todo con Dados</strong> para sortearlos automáticamente de las tablas oficiales de tu trasfondo, o redacta tus propios matices interpretativos.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-identity-backstory',
      fallbackElement: '#step-tab-background-content',
      tabId: 'background',
      badge: 'Historia',
      title: '18. Historia y Pasado del Aventurero (Backstory)',
      descriptionHtml:
        '<p>¿Quién era tu héroe antes de tomar la espada o el grimorio? ¿Quiénes fueron sus mentores? ¿Qué tragedia o ambición lo impulsó a emprender aventuras?</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Redacta los puntos clave de su historia para que tu Dungeon Master pueda incorporarlos a la campaña.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 4: CLASE, SUBCLASE, HABILIDADES Y ESTILOS
  // -------------------------------------------------------------
  if (shouldIncludeTab('class')) {
    steps.push({
      element: '#creator-class-catalog',
      fallbackElement: '#step-tab-class-content',
      tabId: 'class',
      badge: 'Clase Base',
      title: '19. Clase de Aventurero & Vocación Heroica',
      descriptionHtml:
        '<p>Tu profesión marcial o mística (Guerrero, Pícaro, Mago, Clérigo, Bárbaro, Paladín, Brujo, etc.).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Determina tu <strong>Dado de Golpe</strong> (salud por nivel), competencias en armas y armaduras, tiradas de salvación y poderes tácticos.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic en la clase deseada para desplegar sus habilidades, arquetipos y rasgos de combate.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-skills',
      fallbackElement: '#step-tab-class-content',
      tabId: 'class',
      badge: 'Competencias',
      title: '20. Habilidades Entrenadas de Clase',
      descriptionHtml:
        '<p>Las áreas de pericia táctica de tu clase. <strong>Pasa el cursor sobre cualquier habilidad</strong> para leer su tooltip oficial de aplicación en el juego.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca las habilidades hasta completar el cupo requerido por tu clase.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-subclass',
      fallbackElement: '#creator-class-skills',
      tabId: 'class',
      badge: ctx.isSubclassUnlocked ? 'Subclase Disponible' : `Desbloquea a Nv ${ctx.subclassUnlockLevel || 3}`,
      title: `21. Subclase / Especialización Heroica ${ctx.activeClass ? `(${ctx.activeClass.subclassesName})` : ''}`,
      descriptionHtml:
        `<p>La especialización definitiva de tu vocación (ej: <em>Campeón, Maestro de Batalla, Dominio de la Vida, Escuela de Evocación</em>).</p>` +
        `<p style="font-size: 11.5px; opacity: 0.9;">En las reglas oficiales de 5e, la subclase se desbloquea a Nivel 1 (Clérigo, Brujo, Hechicero), Nivel 2 (Mago, Druida) o Nivel 3 (Guerrero, Pícaro, Paladín, Explorador, Bárbaro, Bardo, Monje).</p>` +
        '<div class="driver-callout">👉 Pulsa <strong>"Elegir Subclase"</strong> o <strong>"Explorar Subclases"</strong> para abrir el selector con descripciones completas.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-expertise',
      fallbackElement: '#creator-class-skills',
      tabId: 'class',
      badge: 'Subdecisión: Pericia',
      title: '22. Pericia / Expertise (Doble Competencia x2)',
      descriptionHtml:
        '<p>El rasgo distintivo de los Pícaros (Nivel 1) y Bardos (Nivel 3):</p>' +
        `<p style="font-size: 11.5px; opacity: 0.9;">Tu bonificador de competencia se <strong>duplica (+${(Math.floor((ctx.characterLevel - 1) / 4) + 2) * 2} en lugar de +${Math.floor((ctx.characterLevel - 1) / 4) + 2})</strong> en las pruebas de las habilidades elegidas.</p>` +
        '<div class="driver-callout">👉 Si tu clase posee Pericia, selecciona las habilidades en las que tu aventurero será legendario.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-fighting-style',
      fallbackElement: '#creator-class-skills',
      tabId: 'class',
      badge: 'Subdecisión: Combate',
      title: '23. Estilo de Combate (Fighting Style)',
      descriptionHtml:
        '<p>Tu postura marcial en el campo de batalla (Guerrero, Paladín, Explorador):</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Defensa:</strong> +1 a la Clase de Armadura (CA) con armadura puesta.<br/>• <strong>Duelo:</strong> +2 al daño al empuñar una sola arma cuerpo a cuerpo.<br/>• <strong>Arquería:</strong> +2 a todas las tiradas de ataque a distancia.<br/>• <strong>Armas a Dos Manos:</strong> Repite 1s y 2s en los dados de daño.</p>' +
        '<div class="driver-callout">👉 Haz clic sobre la carta de estilo de combate que mejor complemente tus armas.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-decisions',
      fallbackElement: '#creator-class-skills',
      tabId: 'class',
      badge: 'Decisiones Tácticas',
      title: '24. Decisiones Tácticas Modulares de Clase',
      descriptionHtml:
        '<p>Poderes modulares específicos de tu clase y arquetipo (ej: <em>Invocaciones Sobrenaturales del Brujo, Maniobras de Combate del Maestro de Batalla, Disciplinas de Ki del Monje, Metamagia del Hechicero</em>).</p>' +
        '<div class="driver-callout">👉 Marca tus opciones tácticas. Usa el botón del <strong>Ojito 👁️</strong> para leer la descripción completa de cada maniobra o poder.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-progression',
      fallbackElement: '#creator-class-skills',
      tabId: 'class',
      badge: 'Niveles 1-20',
      title: '25. Progresión y Rasgos Activos de Nivel',
      descriptionHtml:
        '<p>Consulta la cronología completa de rasgos que desbloqueará tu héroe en cada nivel de su carrera aventurera.</p>' +
        '<div class="driver-callout">👉 Puedes alternar entre <em>"Hasta Nivel Actual"</em> o <em>"Ver Todos (1-20)"</em> para leer las reglas de cada rasgo.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 5: PUNTUACIONES DE CARACTERÍSTICA (ATRIBUTOS)
  // -------------------------------------------------------------
  if (shouldIncludeTab('abilities')) {
    steps.push({
      element: '#creator-abilities-methods',
      fallbackElement: '#step-tab-abilities-content',
      tabId: 'abilities',
      badge: 'Métodos 5e',
      title: '26. Método de Puntuaciones (Los 6 Atributos)',
      descriptionHtml:
        '<p>Tus 6 atributos fundamentales (<strong>FUE, DES, CON, INT, SAB, CAR</strong>). Tienes 3 métodos oficiales:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Lanzador Virtual:</strong> Tira 4d6 descartando el menor seis veces con animaciones.<br/>• <strong>Dados Físicos:</strong> Escribe los resultados de tu mesa de juego real.<br/>• <strong>Matriz Estándar:</strong> Los valores canónicos oficiales (15, 14, 13, 12, 10, 8).</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige tu método favorito. Si usas el lanzador virtual, pulsa <strong>"Lanzar Dados 4d6"</strong>.</div>',
      side: 'bottom',
      align: 'start',
    });

    steps.push({
      element: '#creator-abilities-targets',
      fallbackElement: '#step-tab-abilities-content',
      tabId: 'abilities',
      badge: 'Asignación 6 Atributos',
      title: '27. Asignación a las 6 Características & Modificadores',
      descriptionHtml:
        '<p>Distribuye tus números con sabiduría:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• Asigna tu valor más alto a la <strong>característica recomendada</strong> para tu clase (destacada en dorado).<br/>• Una buena <strong>Constitución</strong> aumentará tus Puntos de Golpe iniciales y por nivel.<br/>• Los bonificadores raciales (+2 / +1) se sumarán de inmediato al resultado final.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Suelta o asigna cada dado en su casilla correspondiente.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 6: DOTES Y RESUMEN DE MODIFICADORES
  // -------------------------------------------------------------
  if (shouldIncludeTab('asi_feats')) {
    steps.push({
      element: '#creator-asi-summary-table',
      fallbackElement: '#step-tab-asi_feats-content',
      tabId: 'asi_feats',
      badge: 'Modificadores',
      title: '28. Resumen de Atributos y Modificadores',
      descriptionHtml:
        '<p>Revisa la suma final de tus características: <em>Base + Raza + Dotes</em>.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">El número grande en negrita (+1, +2, +3...) es tu <strong>Modificador de Característica</strong>, la cifra decisiva que sumarás a tus tiradas de d20 durante todas tus partidas.</p>' +
        '<div class="driver-callout">👉 <strong>Revisa:</strong> Comprueba que tus atributos principales gocen de buenos bonificadores positivos.</div>',
      side: 'bottom',
      align: 'start',
    });

    steps.push({
      element: '#creator-asi-level1-toggle',
      fallbackElement: '#creator-asi-feat-section',
      tabId: 'asi_feats',
      badge: 'Regla de Mesa',
      title: '29. Regla Opcional: Dote Inicial Gratuita a Nivel 1',
      descriptionHtml:
        '<p>En las reglas oficiales de 5e estándar, las Dotes se adquieren a partir de Nivel 4 en lugar del Aumento de Características (ASI).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Sin embargo, muchas mesas de juego y campañas modernas aplican la regla casera de otorgar <strong>1 dote heroica inicial a nivel 1</strong> para personalizar al personaje desde el comienzo.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Activa o desactiva la casilla según las directivas de tu Dungeon Master.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-asi-feat-section',
      fallbackElement: '#step-tab-asi_feats-content',
      tabId: 'asi_feats',
      badge: 'Dotes Heroicas',
      title: '30. Catálogo Oficial de Dotes Heroicas',
      descriptionHtml:
        '<p>Las Dotes otorgan ventajas marciales, reflejos o facultades místicas (ej: <em>Tirador Preciso, Alerta, Maestro en Armas Pesadas, Robusto</em>).</p>' +
        '<div class="driver-callout">👉 Explora el compendio y selecciona las dotes que coincidan con la evolución heroica de tu aventurero.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 7: CONJURACIÓN, GRIMORIO Y MAGIA INNATA
  // -------------------------------------------------------------
  if (shouldIncludeTab('spells')) {
    if (ctx.isCaster) {
      steps.push({
        element: '#creator-spells-limits-banner',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Grimorio',
        title: '31. Capacidad de Conjuración de tu Clase',
        descriptionHtml:
          '<p>Tu clase y nivel calculan de manera automática tus límites oficiales de D&D 5e:</p>' +
          '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Trucos (Nivel 0):</strong> Magia a voluntad que puedes lanzar sin gastar ranuras.<br/>• <strong>Conjuros Preparados / Grimorio:</strong> Hechizos potentes que consumen tus espacios diarios.</p>' +
          '<div class="driver-callout">👉 Revisa los contadores en vivo para mantenerte dentro del cupo del manual.</div>',
        side: 'bottom',
        align: 'start',
      });

      steps.push({
        element: '#creator-spells-cantrips',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Nivel 0',
        title: '32. Trucos de Magia (Cantrips)',
        descriptionHtml:
          '<p>Tus encantamientos básicos más fiables en combate y exploración (ej: <em>Rayo de Fuego, Ilusión Menor, Guía, Descarga de Ébano</em>).</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic sobre las cartas de truco para agregarlos a tu repertorio.</div>',
        side: 'top',
        align: 'center',
      });

      steps.push({
        element: '#creator-spells-leveled',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Nivel 1+',
        title: '33. Hechizos con Espacio de Conjuro',
        descriptionHtml:
          '<p>Conjuros organizados por niveles y escuelas de magia (ej: <em>Proyectil Mágico, Curar Heridas, Escudo, Armadura de Agathys</em>).</p>' +
          '<div class="driver-callout">👉 Haz clic para preparar tus hechizos. Puedes usar el buscador o filtrar por nivel en este panel.</div>',
        side: 'top',
        align: 'center',
      });
    } else if (ctx.hasRacialMagic) {
      steps.push({
        element: '#creator-spells-innate-panel',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Magia Innata',
        title: '31. Magia Innata de Linaje Racial',
        descriptionHtml:
          '<p>Aunque tu clase sea marcial pura, tu linaje racial te otorga facultades mágicas innatas.</p>' +
          '<p style="font-size: 11.5px; opacity: 0.9;">Tu <strong>CD de salvación de conjuros</strong> y tu <strong>bono de ataque mágico</strong> se calculan de forma automática usando tu aptitud de linaje.</p>' +
          '<div class="driver-callout">👉 Revisa tus hechizos innatos antes de pasar al equipamiento.</div>',
        side: 'top',
        align: 'center',
      });
    } else {
      steps.push({
        element: '#creator-spells-pure-martial',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Vía Marcial',
        title: '31. Vía Marcial: El Acero y la Táctica',
        descriptionHtml:
          `<p>Tu personaje (<strong>${ctx.activeRace?.name || 'Aventurero'} ${ctx.activeClass?.name || 'Guerrero'}</strong>) no canaliza la urdimbre mágica.</p>` +
          '<p style="font-size: 11.5px; opacity: 0.9;">Tu verdadera fuerza radica en tus armas, tu armadura pesada, tus reflejos atléticos y tu disciplina táctica.</p>' +
          '<div class="driver-callout-success">🛡️ ¡No necesitas conjuros! Puedes avanzar directamente al equipamiento.</div>',
        side: 'top',
        align: 'center',
      });
    }
  }

  // -------------------------------------------------------------
  // TAB 8: EQUIPAMIENTO, DEFENSAS Y ARMAS EN VIVO
  // -------------------------------------------------------------
  if (shouldIncludeTab('equipment')) {
    steps.push({
      element: '#creator-equipment-choices',
      fallbackElement: '#step-tab-equipment-content',
      tabId: 'equipment',
      badge: 'Paquetes Tácticos',
      title: '34. Paquetes de Equipamiento Inicial (A vs B)',
      descriptionHtml:
        '<p>Selecciona tus armas iniciales, armaduras y equipo de campaña según las opciones oficiales del Manual del Jugador para tu clase.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige entre las opciones A o B de cada grupo. Si una opción permite un arma a tu elección, pulsa <strong>"Cambiar Arma..."</strong> para elegir del compendio.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-equipment-wealth',
      fallbackElement: '#step-tab-equipment-content',
      tabId: 'equipment',
      badge: 'Oro & Riqueza',
      title: '35. Riqueza Inicial y Equipo Fijo',
      descriptionHtml:
        '<p>Tu monedero de monedas de oro (po) iniciales calculadas según tu trasfondo y las pertenencias básicas concedidas por tu oficio.</p>' +
        '<div class="driver-callout">👉 Tus monedas se incorporarán a tu inventario activo al guardar al aventurero.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-equipment-defense',
      fallbackElement: '#step-tab-equipment-content',
      tabId: 'equipment',
      badge: 'Equipar en Vivo 🛡️',
      title: '36. Armas, Armaduras y Escudos en Tiempo Real',
      descriptionHtml:
        '<p>El arsenal de tu aventurero forjado con sus insignias metálicas de equipo.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Haz clic en cualquier objeto para <strong>Equiparlo o Desequiparlo</strong>. Por ejemplo, al equipar un escudo, tu <strong>Clase de Armadura (CA) aumentará en +2</strong> de forma inmediata en la ficha lateral.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Equipa tu armadura, escudo y armas principales para entrar al combate con tu mejor defensa.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // TAB 9: REVISIÓN, PDF OFICIAL Y FORJAR HÉROE
  // -------------------------------------------------------------
  if (shouldIncludeTab('review')) {
    steps.push({
      element: '#creator-review-dossier',
      fallbackElement: '#step-tab-review-content',
      tabId: 'review',
      badge: 'Dossier',
      title: '37. Ficha Definitiva y Estadísticas del Héroe',
      descriptionHtml:
        '<p>¡Tu aventurero ha cobrado vida! Revisa su ficha consolidada con todas las métricas de D&D 5e calculadas:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Puntos de Golpe (PG)</strong> y Clase de Armadura (CA).<br/>• <strong>Bono de Iniciativa</strong> y Percepción Pasiva.<br/>• <strong>Las 18 habilidades de 5e</strong> con sus bonificadores finales (incluyendo pericias y trasfondo).<br/>• Lista de ataques, dotes y rasgos activos.</p>' +
        '<div class="driver-callout">👉 Revisa todo antes de realizar el guardado final.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-review-export-banner',
      fallbackElement: '#creator-review-dossier',
      tabId: 'review',
      badge: 'PDF Oficial 5e',
      title: '38. Exportar a Hoja Oficial de D&D 5e',
      descriptionHtml:
        '<p>Descarga la <strong>Hoja de Personaje Oficial de D&D 5e</strong> en formato PDF vectorial de tres páginas con campos rellenables y tipografía canónica, o imprime tu ficha directamente para tu mesa física.</p>' +
        '<div class="driver-callout">👉 Pulsa <strong>"Exportar Hoja Oficial (PDF)"</strong> para descargarla lista para imprimir o compartir con tu DM.</div>',
      side: 'bottom',
      align: 'center',
    });

    steps.push({
      element: '#creator-final-save-btn',
      fallbackElement: '#creator-review-dossier',
      tabId: 'review',
      badge: 'Guardar Héroe',
      title: '39. Guardar Personaje en "Mis Aventureros"',
      descriptionHtml:
        '<p>Al pulsar este botón, tu aventurero se guardará de forma permanente en tu base de datos local y en la nube.</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Podrás gestionarlo, subirlo de nivel (+1), equiparle nuevos objetos mágicos y usarlo en tus sesiones de juego.</p>' +
        '<div class="driver-callout-success">🎲 ¡Felicidades! Tu personaje está listo para iniciar la aventura. Pulsa <strong>Guardar Personaje</strong> para finalizar.</div>',
      side: 'top',
      align: 'center',
    });
  }

  // -------------------------------------------------------------
  // SIDEBAR EN VIVO (Persistente)
  // -------------------------------------------------------------
  if (mode === 'full') {
    steps.push({
      element: '#creator-sidebar',
      fallbackElement: '#creator-tour-header',
      tabId: ctx.currentStep,
      badge: 'Ficha en Vivo',
      title: '40. Hoja de Personaje en Vivo (Tiempo Real)',
      descriptionHtml:
        '<p>Este panel pergamino flotante actualiza tus estadísticas de forma instantánea ante cada decisión que tomas:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>CA, PG, Iniciativa y Percepción Pasiva</strong> en medallas de forja metálica.<br/>• Frasco de Puntos de Golpe en vidrio alquímico con tapón de bronce.<br/>• Modificadores de Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma.<br/>• Armas activas con sus bonos de ataque y daño en vivo.</p>' +
        '<div class="driver-callout">👉 Puedes desplegarlo u ocultarlo en cualquier momento con el botón <strong>"Ver Hoja / Ocultar Hoja"</strong> del encabezado superior.</div>',
      side: 'left',
      align: 'center',
    });
  }

  return steps;
}

/**
 * Main launcher function with intelligent async navigation between tabs
 * and automatic DOM element resolution.
 */
export function startCharacterCreatorTutorial(
  context: TutorialContext,
  onNavigateStep?: (stepId: CreatorStepName) => void,
  mode: 'full' | 'step' = 'full',
  onCloseModals?: () => void
) {
  // Always close any open popup modals before launching tutorial so Driver is never mislocated
  onCloseModals?.();

  const stepDefs = generateDynamicTutorialSteps(context, mode);

  if (stepDefs.length === 0) {
    console.warn('[CharacterCreatorTutorial] No steps generated for context:', context);
    return;
  }

  // If in 'full' mode and not starting on identity, make sure we go to identity
  if (mode === 'full' && context.currentStep !== 'identity') {
    onNavigateStep?.('identity');
  }

  const driverSteps: DriveStep[] = stepDefs.map((def, idx) => ({
    element: () => {
      // Dynamic element resolution: checks target, fallback, or tab container
      const primary = document.querySelector(def.element);
      if (primary && primary instanceof HTMLElement && primary.offsetParent !== null) {
        return primary;
      }
      if (primary) return primary;

      if (def.fallbackElement) {
        const fallback = document.querySelector(def.fallbackElement);
        if (fallback) return fallback;
      }

      const tabContainer = document.querySelector(`#step-tab-${def.tabId}-content`);
      if (tabContainer) return tabContainer;

      return document.querySelector('#creator-tour-header') || document.body;
    },
    popover: {
      title: `${def.badge ? `<span style="font-size:10px;text-transform:uppercase;background:#8c672b;color:#fff;padding:2px 6px;border-radius:4px;margin-right:6px;font-family:monospace;font-weight:bold;">${def.badge}</span>` : ''}${def.title}`,
      description: def.descriptionHtml,
      side: def.side || 'top',
      align: def.align || 'center',
      onNextClick: async (_el, _step, { driver: d }) => {
        onCloseModals?.();
        const nextIdx = idx + 1;
        if (nextIdx >= stepDefs.length) {
          d.destroy();
          return;
        }

        const nextDef = stepDefs[nextIdx];
        if (nextDef.tabId !== def.tabId) {
          onNavigateStep?.(nextDef.tabId);
          await waitForElementReady(nextDef.element, nextDef.fallbackElement, 2200);
          d.moveTo(nextIdx);
        } else {
          // If within same tab, ensure target element is ready
          await waitForElementReady(nextDef.element, nextDef.fallbackElement, 500);
          d.moveNext();
        }
      },
      onPrevClick: async (_el, _step, { driver: d }) => {
        onCloseModals?.();
        const prevIdx = idx - 1;
        if (prevIdx < 0) return;

        const prevDef = stepDefs[prevIdx];
        if (prevDef.tabId !== def.tabId) {
          onNavigateStep?.(prevDef.tabId);
          await waitForElementReady(prevDef.element, prevDef.fallbackElement, 2200);
          d.moveTo(prevIdx);
        } else {
          d.movePrevious();
        }
      },
    },
    onHighlightStarted: (element) => {
      onCloseModals?.();
      if (element && element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    },
  }));

  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    disableActiveInteraction: false,
    overlayClickBehavior: 'none',
    waitForElement: 2500,
    overlayColor: 'rgba(0, 0, 0, 0.75)',
    nextBtnText: 'Siguiente Paso →',
    prevBtnText: '← Anterior',
    doneBtnText: '¡Listo para Jugar! 🎲',
    steps: driverSteps,
  });

  // Start tutorial when first element is ready
  const firstDef = stepDefs[0];
  waitForElementReady(firstDef.element, firstDef.fallbackElement, 2000).then(() => {
    driverObj.drive();
  });
}
