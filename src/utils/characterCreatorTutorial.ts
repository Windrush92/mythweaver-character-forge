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
  timeoutMs: number = 2200
): Promise<string> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(selector);
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
    }, 40);
  });
}

/**
 * Generates the complete, context-aware sequence of tutorial steps.
 * When mode === 'step', generates only the steps relevant to ctx.currentStep and its active subdecisions.
 * When mode === 'full', generates the comprehensive journey across all 9 creation steps.
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
        '<div style="margin: 6px 0 8px 0; font-size: 11.5px; opacity: 0.95; line-height: 1.5; background: rgba(0,0,0,0.22); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(214,196,170,0.25);">' +
        '🔍 <strong>¡Maximiza el Catálogo para ver todas las razas!</strong><br/>' +
        'Pulsa el botón <strong>Maximizar Catálogo</strong> para explorar el compendio a <strong>pantalla completa</strong> con más de 30 razas y subrazas oficiales ilustradas.' +
        '</div>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Selecciona una raza. Al hacerlo se desplegarán inmediatamente sus subdecisiones (subrazas, puntos flexibles y magia innata).</div>',
      side: 'top',
      align: 'center',
    });

    if (ctx.activeRace?.subraces && ctx.activeRace.subraces.length > 0) {
      steps.push({
        element: '#creator-race-subraces',
        fallbackElement: '#creator-race-traits',
        tabId: 'race',
        badge: 'Subdecisión',
        title: `Subraza / Linaje Específico (${ctx.activeRace.name})`,
        descriptionHtml:
          `<p>El linaje de <strong>${ctx.activeRace.name}</strong> se ramifica en diversas culturas y ramas biológicas con poderes únicos.</p>` +
          '<p style="font-size: 11.5px; opacity: 0.9;">Por ejemplo, un <em>Alto Elfo</em> conoce trucos arcanos adicionales, mientras que un <em>Elfo de los Bosques</em> se mueve con mayor rapidez y sigilo.</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige tu subraza favorita para desbloquear sus rasgos hereditarios.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.raceAnyCount > 0) {
      steps.push({
        element: '#creator-race-flexible',
        fallbackElement: '#creator-race-traits',
        tabId: 'race',
        badge: 'Subdecisión',
        title: `Puntos Flexibles de Característica (+${ctx.raceAnyCount})`,
        descriptionHtml:
          `<p>Tu linaje te concede <strong>+${ctx.raceAnyCount} punto${ctx.raceAnyCount > 1 ? 's' : ''} libre${ctx.raceAnyCount > 1 ? 's' : ''}</strong> para potenciar las características que prefieras.</p>` +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa sobre las características que quieras aumentar en +1 para asignarlos.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasBonusRacialSkills) {
      steps.push({
        element: '#creator-race-bonus-skills',
        fallbackElement: '#creator-race-traits',
        tabId: 'race',
        badge: 'Subdecisión',
        title: `Competencias de Habilidad Gratuitas (${ctx.activeRace?.name || 'Raza'})`,
        descriptionHtml:
          '<p>Tu linaje te permite dominar habilidades adicionales a tu libre elección.</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca las habilidades que deseas dominar como talento racial.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasRacialMagic) {
      steps.push({
        element: '#creator-racial-spells-panel',
        fallbackElement: '#creator-race-traits',
        tabId: 'race',
        badge: 'Magia Innata',
        title: 'Magia Innata Ancestral & Dones Arcanos',
        descriptionHtml:
          '<p>Tu linaje despierta poderes sobrenaturales de nacimiento que <strong>no gastan ranuras de conjuro</strong> ni cuentan contra el límite de tu clase.</p>' +
          '<p style="font-size: 11.5px; opacity: 0.9;">Aquí podrás seleccionar tu truco racial extra (si aplica) y definir tu característica de aptitud de lanzamiento mental (**Inteligencia, Sabiduría o Carisma**).</p>' +
          '<div class="driver-callout">👉 <strong>Revisa:</strong> Los conjuros innatos figuran en tu grimorio y calculan su CD de salvación oficial en vivo.</div>',
        side: 'top',
        align: 'center',
      });
    }

    steps.push({
      element: '#creator-race-traits',
      fallbackElement: '#step-tab-race-content',
      tabId: 'race',
      badge: 'Rasgos',
      title: 'Dones y Rasgos Raciales Heredados',
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
      title: '6. Catálogo de Trasfondos (99 Oficiales)',
      descriptionHtml:
        '<p>Tu ocupación previa a la vida de aventurero (Acólito, Soldado, Criminal, Erudito, Forastero, etc.).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Otorga <strong>2 competencias de habilidad</strong>, idiomas, herramientas de oficio, oro inicial y un rasgo narrativo único para interactuar con el mundo.</p>' +
        '<div style="margin: 6px 0 8px 0; font-size: 11.5px; opacity: 0.95; line-height: 1.5; background: rgba(0,0,0,0.22); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(214,196,170,0.25);">' +
        '📜 <strong>¡Maximiza el Catálogo para explorar los 99 trasfondos!</strong><br/>' +
        'Usa el botón <strong>Maximizar Catálogo</strong> para filtrarlos por ambientación (Aventureros de la Costa de la Espada, Ravenloft, Dragonlance, Reinos Olvidados).' +
        '</div>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige tu trasfondo para desplegar sus opciones de idiomas y herramientas.</div>',
      side: 'top',
      align: 'center',
    });

    if (ctx.hasBackgroundSkillChoices) {
      steps.push({
        element: '#creator-background-skill-choices',
        fallbackElement: '#step-tab-background-content',
        tabId: 'background',
        badge: 'Subdecisión',
        title: 'Elección de Habilidades de Trasfondo',
        descriptionHtml:
          '<p>Este trasfondo te permite elegir competencias entre varias opciones canónicas de las reglas oficiales de 5e.</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca las habilidades requeridas hasta completar el cupo.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasBackgroundTools) {
      steps.push({
        element: '#creator-background-tools',
        fallbackElement: '#step-tab-background-content',
        tabId: 'background',
        badge: 'Subdecisión',
        title: 'Competencia en Herramientas o Instrumentos',
        descriptionHtml:
          '<p>Tu trasfondo te otorga maestría en útiles de trabajo (herramientas de ladrón, kits de disfraz, alquimia) o instrumentos musicales.</p>' +
          '<p style="font-size: 11.5px; opacity: 0.9;">Puedes elegir entre las opciones canónicas o escribir un instrumento o herramienta personalizada en el casillero inferior.</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca tus herramientas o añade una personalizada.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasBackgroundTrinkets) {
      steps.push({
        element: '#creator-background-trinkets',
        fallbackElement: '#step-tab-background-content',
        tabId: 'background',
        badge: 'Subdecisión 🎲',
        title: 'Baratijas, Evidencias y Objetos Especiales',
        descriptionHtml:
          '<p>Objetos con misterio narrativo ligados a tu pasado (una carta ensangrentada, una moneda que no para de rodar, etc.).</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa el botón <strong>🎲 Tirar 1d100</strong> para sortear un objeto en la tabla oficial (Horror, Feérica o Común), o escribe tu propia reliquia.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasBackgroundLanguages) {
      steps.push({
        element: '#creator-background-languages',
        fallbackElement: '#step-tab-background-content',
        tabId: 'background',
        badge: 'Subdecisión',
        title: 'Idiomas Adicionales de Trasfondo',
        descriptionHtml:
          '<p>Las lenguas aprendidas durante tus andanzas. El sistema respeta las reglas oficiales de D&D 5e:</p>' +
          '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Idiomas Fijos:</strong> Lenguas obligatorias del trasfondo.<br/>• <strong>Lenguas Restringidas:</strong> Selección entre opciones históricas (ej: Silvano/Élfico).<br/>• <strong>Ranuras Exóticas:</strong> Lenguas arcanas u oscuras (Abisal, Celestial, Habla Profunda, Dracónico).<br/>• <strong>Innatos por Raza:</strong> Tus idiomas nativos figuran protegidos y no consumen ranuras.</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige las lenguas que domina tu aventurero.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasBackgroundBonusFeat) {
      steps.push({
        element: '#creator-background-bonus-feat',
        fallbackElement: '#step-tab-background-content',
        tabId: 'background',
        badge: 'Dote Gratuita',
        title: 'Dote Oficial Otorgada por Trasfondo',
        descriptionHtml:
          '<p>Algunos trasfondos de fuentes oficiales avanzadas otorgan una <strong>Dote Gratuita a Nivel 1</strong> (como Golpe de los Gigantes o Modelador de Runas).</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Selecciona aquí tu subelección táctica (ej: tipo de golpe elemental o runa consagrada).</div>',
        side: 'top',
        align: 'center',
      });
    }

    steps.push({
      element: '#creator-identity-roleplay-box',
      fallbackElement: '#step-tab-background-content',
      tabId: 'background',
      badge: 'Pilares de Rol',
      title: '7. Personalidad, Ideales, Vínculos y Defectos',
      descriptionHtml:
        '<p>Los 4 pilares psicológicos que dan vida a tu personaje en la mesa de juego:</p>' +
        '<p style="margin: 4px 0 8px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Rasgos:</strong> Manías, gestos y hábitos cotidianos.<br/>• <strong>Ideales:</strong> Los principios éticos por los que daría la vida.<br/>• <strong>Vínculos:</strong> Su gente, juramentos o lugares sagrados.<br/>• <strong>Defectos:</strong> Sus tentaciones, miedos o debilidades morales.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa el botón <strong>🎲🎲 Tirar Todo con Dados</strong> para sortearlos automáticamente de las tablas oficiales de 5e, o escribe los tuyos.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-identity-backstory',
      fallbackElement: '#step-tab-background-content',
      tabId: 'background',
      badge: 'Historia',
      title: '8. Historia y Pasado del Aventurero (Backstory)',
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
      title: '9. Clase de Aventurero & Vocación Heroica',
      descriptionHtml:
        '<p>Tu profesión marcial o mística (Guerrero, Pícaro, Mago, Clérigo, Bárbaro, Paladín, Brujo, etc.).</p>' +
        '<p style="font-size: 11.5px; opacity: 0.9;">Determina tu <strong>Dado de Golpe</strong> (salud por nivel), tus competencias en armas y armaduras, tiradas de salvación y poderes tácticos.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic en la clase deseada para desplegar sus habilidades, arquetipos y rasgos de combate.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-class-skills',
      fallbackElement: '#step-tab-class-content',
      tabId: 'class',
      badge: 'Competencias',
      title: '10. Habilidades Entrenadas de Clase',
      descriptionHtml:
        '<p>Las áreas de pericia táctica de tu clase. <strong>Pasa el cursor sobre cualquier habilidad</strong> para leer su tooltip oficial de aplicación en el juego.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca las habilidades hasta completar el cupo requerido por tu clase.</div>',
      side: 'top',
      align: 'center',
    });

    if (ctx.activeClass?.subclasses && ctx.activeClass.subclasses.length > 0) {
      const isUnlocked = ctx.isSubclassUnlocked;
      const unlockLevel = ctx.subclassUnlockLevel;
      steps.push({
        element: '#creator-class-subclass',
        fallbackElement: '#creator-class-skills',
        tabId: 'class',
        badge: isUnlocked ? 'Subclase Disponible' : `Desbloquea a Nv ${unlockLevel}`,
        title: `11. Subclase / Especialización (${ctx.activeClass.subclassesName})`,
        descriptionHtml: isUnlocked
          ? `<p>A nivel ${ctx.characterLevel}, tu <strong>${ctx.activeClass.name}</strong> consagra su senda definitiva (ej: <em>Campeón, Maestro de Batalla, Dominio Divino, Círculo de la Luna</em>).</p>` +
            `<p style="font-size: 11.5px; opacity: 0.9;">Hay <strong>${ctx.activeClass.subclasses.length} sendas oficiales</strong> disponibles en el compendio con descripciones completas.</p>` +
            '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa el botón <strong>"Elegir Subclase"</strong> para abrir el selector y elegir tu arquetipo.</div>'
          : `<p>En las reglas de D&D 5e, la especialización de <strong>${ctx.activeClass.name}</strong> se elige al alcanzar el <strong>Nivel ${unlockLevel}</strong>.</p>` +
            `<p style="font-size: 11.5px; opacity: 0.9;">Actualmente tu personaje es Nivel ${ctx.characterLevel}. Puedes pulsar el botón <em>"Explorar Subclases"</em> para curiosear previamente todas las sendas y planificar su futuro.</p>` +
            '<div class="driver-callout">👉 <strong>Consejo:</strong> Si quieres elegirla ahora, sube tu nivel a ' + unlockLevel + ' en el Paso 1.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasExpertise) {
      steps.push({
        element: '#creator-class-expertise',
        fallbackElement: '#creator-class-skills',
        tabId: 'class',
        badge: 'Subdecisión ⭐',
        title: 'Pericia / Expertise (Doble Competencia x2)',
        descriptionHtml:
          '<p>El rasgo distintivo de los Pícaros (a Nivel 1) y Bardos (a Nivel 3):</p>' +
          `<p style="font-size: 11.5px; opacity: 0.9;">Tu bonificador de competencia se <strong>duplica (+${(Math.floor((ctx.characterLevel - 1) / 4) + 2) * 2} en lugar de +${Math.floor((ctx.characterLevel - 1) / 4) + 2})</strong> en las pruebas de las habilidades elegidas.</p>` +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Selecciona las habilidades en las que tu aventurero será un maestro legendario.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.hasFightingStyle) {
      steps.push({
        element: '#creator-class-fighting-style',
        fallbackElement: '#creator-class-skills',
        tabId: 'class',
        badge: 'Subdecisión ⚔️',
        title: 'Estilo de Combate (Fighting Style)',
        descriptionHtml:
          '<p>Tu postura marcial en el campo de batalla (Guerrero, Paladín, Explorador):</p>' +
          '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Defensa:</strong> +1 a la Clase de Armadura (CA) con armadura puesta.<br/>• <strong>Duelo:</strong> +2 al daño al empuñar una sola arma cuerpo a cuerpo.<br/>• <strong>Arquería:</strong> +2 a todas las tiradas de ataque a distancia.<br/>• <strong>Armas a Dos Manos:</strong> Repite 1s y 2s en los dados de daño.</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic sobre la carta de estilo de combate que mejor complemente tus armas.</div>',
        side: 'top',
        align: 'center',
      });
    }

    if (ctx.pendingDecisionsCount > 0) {
      steps.push({
        element: '#creator-class-decisions',
        fallbackElement: '#creator-class-skills',
        tabId: 'class',
        badge: 'Subdecisión',
        title: 'Decisiones Tácticas de Clase',
        descriptionHtml:
          '<p>Poderes modulares específicos de tu clase y arquetipo (ej: <em>Invocaciones Sobrenaturales del Brujo, Maniobras de Maniobrista, Disciplinas de Ki del Monje, Metamagia del Hechicero</em>).</p>' +
          '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca las opciones requeridas. Usa el botón del <strong>Ojito 👁️</strong> para leer la descripción completa de cada maniobra o poder.</div>',
        side: 'top',
        align: 'center',
      });
    }

    steps.push({
      element: '#creator-class-progression',
      fallbackElement: '#step-tab-class-content',
      tabId: 'class',
      badge: 'Niveles 1-20',
      title: 'Progresión Nivel a Nivel (1 a 20)',
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
      title: '12. Método de Puntuaciones (Los 6 Atributos)',
      descriptionHtml:
        '<p>Tus 6 atributos fundamentales (<strong>FUE, DES, CON, INT, SAB, CAR</strong>). Tienes 3 métodos oficiales:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Lanzador Virtual:</strong> Tira 4d6 descartando el menor seis veces con animaciones.<br/>• <strong>Dados Físicos:</strong> Escribe los resultados de tu mesa de juego real.<br/>• <strong>Matriz Estándar:</strong> Los valores canónicos oficiales (15, 14, 13, 12, 10, 8).</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige tu método favorito. Si usas el lanzador virtual, pulsa <strong>"Lanzar Dados 4d6"</strong>.</div>',
      side: 'bottom',
      align: 'start',
    });

    steps.push({
      element: '#creator-abilities-assignment-grid',
      fallbackElement: '#step-tab-abilities-content',
      tabId: 'abilities',
      badge: 'Bandeja',
      title: '13. Bandeja de Dados y Valores Disponibles',
      descriptionHtml:
        '<p>Aquí descansan los 6 valores numéricos listos para ser asignados a tus estadísticas del héroe.</p>' +
        '<div class="driver-callout">👉 Puedes <strong>arrastrarlos con el ratón (Drag & Drop)</strong> o hacer clic sobre un número y luego en la característica receptora abajo.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-abilities-targets',
      fallbackElement: '#creator-abilities-assignment-grid',
      tabId: 'abilities',
      badge: 'Asignación Drag & Drop',
      title: '14. Asignación a las 6 Características',
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
      title: '15. Resumen de Atributos y Modificadores',
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
      title: '16. Regla Opcional: Dote Inicial Gratuita a Nivel 1',
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
      title: '17. Catálogo Oficial de Dotes Heroicas',
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
        title: '18. Capacidad de Conjuración de tu Clase',
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
        title: '19. Trucos de Magia (Cantrips)',
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
        title: '20. Hechizos con Espacio de Conjuro',
        descriptionHtml:
          '<p>Conjuros organizados por niveles y escuelas de magia (ej: <em>Proyectil Mágico, Curar Heridas, Escudo, Armadura de Agathys</em>).</p>' +
          '<div class="driver-callout">👉 Haz clic para preparar tus hechizos. Puedes usar el botón <strong>"Maximizar"</strong> para ver todo el grimorio en pantalla completa.</div>',
        side: 'top',
        align: 'center',
      });

      steps.push({
        element: '#creator-spell-maximize-btn',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Pantalla Completa',
        title: '21. Selector de Conjuros Maximizado',
        descriptionHtml:
          '<p>Abre el códice completo de conjuros con filtros avanzados por escuela de magia, rituales y concentración.</p>' +
          '<div class="driver-callout">👉 Pulsa <strong>Maximizar</strong> siempre que necesites leer detenidamente las descripciones completas.</div>',
        side: 'top',
        align: 'center',
      });
    } else if (ctx.hasRacialMagic) {
      steps.push({
        element: '#creator-spells-innate-panel',
        fallbackElement: '#step-tab-spells-content',
        tabId: 'spells',
        badge: 'Magia Innata',
        title: '18. Magia Innata de Linaje Racial',
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
        title: '18. Vía Marcial: El Acero y la Táctica',
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
      title: '22. Paquetes de Equipamiento Inicial (A vs B)',
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
      title: '23. Riqueza Inicial y Equipo Fijo',
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
      title: '24. Armas, Armaduras y Escudos en Tiempo Real',
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
      title: '25. Ficha Definitiva y Estadísticas del Héroe',
      descriptionHtml:
        '<p>¡Tu aventurero ha cobrado vida! Revisa su ficha consolidada con todas las métricas de D&D 5e calculadas:</p>' +
        '<p style="margin: 4px 0 6px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Puntos de Golpe (PG)</strong> y Clase de Armadura (CA).<br/>• <strong>Bono de Iniciativa</strong> y Percepción Pasiva.<br/>• <strong>Las 18 habilidades de 5e</strong> con sus bonificadores finales (incluyendo pericias y trasfondo).<br/>• Lista de ataques, dotes y rasgos activos.</p>' +
        '<div class="driver-callout">👉 Revisa todo antes de realizar el guardado final.</div>',
      side: 'top',
      align: 'center',
    });

    steps.push({
      element: '#creator-review-export-banner',
      fallbackElement: '#step-tab-review-content',
      tabId: 'review',
      badge: 'PDF Oficial',
      title: '26. Exportar a Hoja Oficial de D&D 5e (PDF)',
      descriptionHtml:
        '<p>Pulsa el botón <strong>"Exportar Hoja Oficial (PDF)"</strong> para descargar la planilla rellenable oficial de 3 páginas de Wizards of the Coast con todos los datos de tu personaje ya completados.</p>' +
        '<div class="driver-callout">👉 Ideal para imprimir en papel o compartir con tu Dungeon Master antes de la sesión.</div>',
      side: 'bottom',
      align: 'start',
    });

    steps.push({
      element: '#creator-final-save-btn',
      fallbackElement: '#step-tab-review-content',
      tabId: 'review',
      badge: '¡Listo! 🎲',
      title: '27. ¡Forjar y Guardar Aventurero!',
      descriptionHtml:
        '<p>Guarda a tu personaje en el compendio de la campaña para comenzar a jugar de inmediato.</p>' +
        '<div class="driver-callout-success">🎲 <strong>¡Pulsa en ¡Forjar Personaje! y que los dados favorezcan tus hazañas!</strong></div>',
      side: 'top',
      align: 'end',
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
  mode: 'full' | 'step' = 'full'
) {
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
    element: def.element,
    popover: {
      title: `${def.badge ? `<span style="font-size:10px;text-transform:uppercase;background:#8c672b;color:#fff;padding:2px 6px;border-radius:4px;margin-right:6px;font-family:monospace;font-weight:bold;">${def.badge}</span>` : ''}${def.title}`,
      description: def.descriptionHtml,
      side: def.side || 'top',
      align: def.align || 'center',
      onNextClick: async (_el, _step, { driver: d }) => {
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
