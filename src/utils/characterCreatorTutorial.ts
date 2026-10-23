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

export interface TutorialStepDef {
  element: string;
  tabId: CreatorStepName;
  title: string;
  descriptionHtml: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function startCharacterCreatorTutorial(
  onNavigateStep?: (stepId: CreatorStepName) => void,
  isCaster: boolean = false
) {
  // Always ensure we start on the first tab
  onNavigateStep?.('identity');

  const stepDefs: TutorialStepDef[] = [
    // 0. Intro Welcome Header
    {
      element: '#creator-tour-header',
      tabId: 'identity',
      title: '🏰 Guía de Creación Paso a Paso',
      descriptionHtml:
        '<p>¡Bienvenido a la creación guiada de tu aventurero de D&D 5e! Esta guía interactiva te acompañará <strong>campo por campo</strong> a lo largo de toda tu ficha.</p>' +
        '<p>Iremos elemento por elemento: podrás <strong>escribir, elegir opciones y tirar dados en vivo</strong> mientras avanzamos juntos.</p>' +
        '<div class="driver-callout">👉 Pulsa <strong>Siguiente Paso</strong> para comenzar a definir el nombre y rostro de tu aventurero.</div>',
      side: 'bottom',
      align: 'start',
    },

    // 1. Character & Player Name
    {
      element: '#creator-identity-names',
      tabId: 'identity',
      title: '1. Nombre del Héroe y del Jugador',
      descriptionHtml:
        '<p>Todo gran héroe necesita un nombre memorable para ser recordado en las tabernas y cantares de gesta.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Escribe aquí el <strong>Nombre de tu Personaje</strong> y tu propio nombre como jugador.</div>',
      side: 'bottom',
      align: 'start',
    },

    // 2. Avatar & Portrait
    {
      element: '#creator-identity-avatar',
      tabId: 'identity',
      title: '2. Retrato del Personaje (Avatar)',
      descriptionHtml:
        '<p>El aspecto visual de tu aventurero. Puedes <strong>subir tu propia imagen desde tu dispositivo</strong> o <strong>pegar el enlace URL</strong> de cualquier imagen web.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa <em>"Subir desde mi Dispositivo"</em> o pega una URL para darle rostro a tu héroe.</div>',
      side: 'top',
      align: 'center',
    },

    // 3. Moral & Philosophical Alignment
    {
      element: '#creator-identity-alignment',
      tabId: 'identity',
      title: '3. Alineamiento Moral y Ético',
      descriptionHtml:
        '<p>Define la brújula ética de tu personaje combinando <strong>Ley vs Caos</strong> con <strong>Bien vs Mal</strong> (ej: <em>Legal Bueno</em> sigue el honor, <em>Caótico Bueno</em> es rebelde y justiciero, <em>Neutral</em> busca el equilibrio).</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic sobre la casilla de alineamiento que mejor represente las convicciones de tu héroe.</div>',
      side: 'top',
      align: 'center',
    },

    // 4. Race Catalog
    {
      element: '#creator-race-catalog',
      tabId: 'race',
      title: '4. Elige tu Raza & Linaje Ancestral',
      descriptionHtml:
        '<p>Tu especie define tu biología fantástica, tamaño, velocidad de movimiento y sentidos especiales como <em>Visión en la Oscuridad</em>. Además, otorga bonificaciones directas a tus atributos (+2/+1).</p>' +
        '<div style="margin: 6px 0 8px 0; font-size: 11.5px; opacity: 0.95; line-height: 1.5; background: rgba(0,0,0,0.18); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(214,196,170,0.2);">' +
        '🔍 <strong>¡Maximiza el Catálogo para ver todas las razas!</strong><br/>' +
        'Pulsa el botón <strong>Maximizar Catálogo</strong> (junto al buscador) para desplegar el compendio a <strong>pantalla completa</strong> y explorar cómodamente las más de 30 razas y subrazas oficiales con sus ilustraciones y rasgos.' +
        '</div>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa <em>Maximizar Catálogo</em> o usa el buscador para elegir la raza de tu aventurero.</div>',
      side: 'top',
      align: 'center',
    },

    // 5. Race Traits & Subraces
    {
      element: '#creator-race-traits',
      tabId: 'race',
      title: '5. Rasgos Raciales y Subraza',
      descriptionHtml:
        '<p>Aquí puedes consultar todos los dones heredados de tu linaje (resistencias, sentidos y talentos innatos). Si tu raza dispone de <strong>subrazas</strong> (ej: Elfo de los Bosques o Alto Elfo) o <strong>puntos flexibles</strong> (+1 a elección), márcalos aquí.</p>' +
        '<div class="driver-callout">👉 <strong>Revisa:</strong> Elige tu subraza y asigna puntos flexibles si tu linaje lo solicita.</div>',
      side: 'top',
      align: 'center',
    },

    // 6. Background Catalog
    {
      element: '#creator-background-catalog',
      tabId: 'background',
      title: '6. Trasfondo del Héroe (99 Disponibles)',
      descriptionHtml:
        '<p>Tu profesión o estilo de vida previo a salir de aventuras (Soldado, Acólito, Criminal, Forastero, Erudito...).</p>' +
        '<p>El trasfondo te otorga <strong>2 competencias de habilidad gratuitas</strong>, idiomas o herramientas y un rasgo narrativo único para interactuar con la sociedad.</p>' +
        '<div style="margin: 6px 0 8px 0; font-size: 11.5px; opacity: 0.95; line-height: 1.5; background: rgba(0,0,0,0.18); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(214,196,170,0.2);">' +
        '📜 <strong>¡Maximiza el Catálogo para ver los 99 trasfondos!</strong><br/>' +
        'Pulsa el botón <strong>Maximizar Catálogo</strong> (arriba a la derecha) para abrir el compendio completo en pantalla completa con filtros por ambientación (Aventureros, Ravenloft, Dragonlance, etc.).' +
        '</div>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Maximiza el catálogo o explora las categorías para elegir tu trasfondo.</div>',
      side: 'top',
      align: 'center',
    },

    // 7. Roleplay Pillars (Personality, Ideals, Bonds, Flaws)
    {
      element: '#creator-identity-roleplay-box',
      tabId: 'background',
      title: '7. Rasgos de Rol (Personalidad, Ideales, Vínculos y Defectos)',
      descriptionHtml:
        '<p>Los 4 pilares narrativos moldeados por tu trasfondo e historia:</p>' +
        '<p style="margin: 4px 0 8px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Rasgos:</strong> Modales y hábitos cotidianos.<br/>• <strong>Ideales:</strong> Principios morales que defiende.<br/>• <strong>Vínculos:</strong> Lugares o personas que atesora.<br/>• <strong>Defectos:</strong> Debilidades humanas y tentaciones.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Pulsa el botón <strong>🎲🎲 Tirar Todo con Dados</strong> para inspirarte con las tablas oficiales del Manual del Jugador y Reglas Oficiales 5e, o selecciona y redacta tus propios textos.</div>',
      side: 'top',
      align: 'center',
    },

    // 8. Backstory & Motivations
    {
      element: '#creator-identity-backstory',
      tabId: 'background',
      title: '8. Historia y Pasado (Backstory)',
      descriptionHtml:
        '<p>¿De dónde viene tu héroe? ¿Quiénes fueron sus mentores? ¿Por qué dejó su hogar para enfrentar peligros en los Reinos Olvidados?</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Escribe unas líneas sobre sus orígenes o notas clave para tu Dungeon Master.</div>',
      side: 'top',
      align: 'center',
    },

    // 9. Class Catalog & Level
    {
      element: '#creator-class-catalog',
      tabId: 'class',
      title: '9. Clase de Aventurero & Nivel Inicial',
      descriptionHtml:
        '<p>La vocación y estilo heroico de tu héroe (Guerrero, Mago, Pícaro, Clérigo, Bárbaro, etc.). Determina tu Dado de Golpe (salud por nivel), competencias en armas/armaduras y poderes tácticos.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Haz clic en la clase deseada. Puedes ajustar el nivel con los botones +/- si tu campaña inicia más allá de nivel 1.</div>',
      side: 'top',
      align: 'center',
    },

    // 10. Class Skills
    {
      element: '#creator-class-skills',
      tabId: 'class',
      title: '10. Habilidades Entrenadas de Clase',
      descriptionHtml:
        '<p>Las especialidades en las que tu personaje tiene ventaja táctica. <strong>Deja el cursor sobre cualquier habilidad</strong> para leer exactamente qué significa y cómo se usa en el juego.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Marca las habilidades hasta completar el cupo requerido por tu clase.</div>',
      side: 'top',
      align: 'center',
    },

    // 11. Ability Score Methods
    {
      element: '#creator-abilities-methods',
      tabId: 'abilities',
      title: '11. Método de Puntuaciones (Los 6 Atributos)',
      descriptionHtml:
        '<p>Tus 6 características fundamentales (FUE, DES, CON, INT, SAB, CAR). Tienes tres métodos oficiales de D&D 5e:</p>' +
        '<p style="margin: 4px 0 8px 0; font-size: 11.5px; opacity: 0.9;">• <strong>Lanzador Virtual:</strong> Tira 4d6 descartando el menor 6 veces.<br/>• <strong>Dados Físicos:</strong> Escribe los resultados de tu mesa.<br/>• <strong>Matriz Estándar:</strong> Los valores oficiales (15, 14, 13, 12, 10, 8).</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Elige tu método. Si usas el lanzador virtual, pulsa <em>"Lanzar Dados 4d6"</em>.</div>',
      side: 'bottom',
      align: 'start',
    },

    // 12. Ability Scores Assignment (Drag & Drop)
    {
      element: '#creator-abilities-assignment-grid',
      tabId: 'abilities',
      title: '12. Asignación de Puntuaciones (Drag & Drop)',
      descriptionHtml:
        '<p>Distribuye tus números. Coloca tu puntuación más alta en la <strong>característica recomendada</strong> para tu clase y una buena Constitución para tener más puntos de vida.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> <strong>Arrastra con el ratón (Drag & Drop)</strong> cada resultado a la característica que quieras, o haz clic en un dado y luego en el atributo.</div>',
      side: 'top',
      align: 'center',
    },

    // 13. ASI & Modifiers Summary Table
    {
      element: '#creator-asi-summary-table',
      tabId: 'asi_feats',
      title: '13. Resumen de Atributos y Modificadores',
      descriptionHtml:
        '<p>Revisa la suma final de tus características: <em>Base + Raza + Dotes</em>.</p>' +
        '<p>El valor destacado (+1, +2, +3...) es tu <strong>Modificador de Característica</strong>, la cifra que sumas a tus tiradas de d20 en tus partidas.</p>' +
        '<div class="driver-callout">👉 <strong>Revisa:</strong> Comprueba que tus atributos primarios tengan buenos modificadores positivos.</div>',
      side: 'bottom',
      align: 'start',
    },

    // 14. Feats & Level 1 Option
    {
      element: '#creator-asi-feat-section',
      tabId: 'asi_feats',
      title: '14. Dotes Heroicas y Regla de Campaña Nivel 1',
      descriptionHtml:
        '<p>Las Dotes otorgan poderes y ventajas especiales. En D&D estándar se desbloquean a partir del nivel 4, pero si tu DM utiliza la regla de mesa opcional de otorgar una dote inicial gratuita a nivel 1, puedes activarla aquí.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Activa o desactiva la casilla de <em>"Dote Nivel 1"</em> según las reglas de tu grupo.</div>',
      side: 'top',
      align: 'center',
    },

    // 15. Spells & Cantrips (if Caster)
    ...(isCaster
      ? [
          {
            element: '#step-tab-spells-content',
            tabId: 'spells' as CreatorStepName,
            title: '15. Grimorio de Magia: Trucos y Conjuros',
            descriptionHtml:
              '<p>• <strong>Trucos (Nivel 0):</strong> Magia a voluntad ilimitada que no consume ranuras.<br/>• <strong>Conjuros de Nivel 1:</strong> Magia potente que consume tus ranuras diarias.</p>' +
              '<p>La app calcula automáticamente tu límite oficial de conjuros según tu clase y nivel.</p>' +
              '<div style="margin: 6px 0 8px 0; font-size: 11.5px; opacity: 0.95; line-height: 1.5; background: rgba(0,0,0,0.18); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(214,196,170,0.2);">' +
              '✨ <strong>¡Maximiza el Selector para ver el grimorio completo!</strong><br/>' +
              'Pulsa el botón <strong>Maximizar Selector</strong> (junto al buscador) para abrir el códice en pantalla completa con filtros por nivel, escuela mágica y descripciones completas.' +
              '</div>' +
              '<div class="driver-callout">👉 <strong>Tu turno:</strong> Maximiza el selector o explora la lista para elegir tus trucos y conjuros.</div>',
            side: 'top' as const,
            align: 'center' as const,
          },
        ]
      : []),

    // 16. Starting Equipment
    {
      element: '#creator-equipment-choices',
      tabId: 'equipment',
      title: isCaster ? '16. Equipamiento Inicial y Monedas' : '15. Equipamiento Inicial y Monedas',
      descriptionHtml:
        '<p>Tus armas primarias, armadura y paquetes de aventurero según tu clase, junto con los objetos de tu trasfondo y tus monedas de oro iniciales.</p>' +
        '<div class="driver-callout">👉 <strong>Tu turno:</strong> Selecciona tus opciones de equipo preferidas para empezar preparado para el combate.</div>',
      side: 'top',
      align: 'center',
    },

    // 17. Final Review Dossier
    {
      element: '#creator-review-dossier',
      tabId: 'review',
      title: isCaster ? '17. Ficha Definitiva del Héroe' : '16. Ficha Definitiva del Héroe',
      descriptionHtml:
        '<p>¡Tu aventurero ha tomado forma! Revisa todas sus métricas calculadas automáticamente: Puntos de Golpe (PG), Clase de Armadura (CA), Bono de Iniciativa, Ataques y Salvaciones.</p>' +
        '<div class="driver-callout">👉 <strong>Revisa:</strong> Comprueba el dossier y las 18 habilidades oficiales de 5e con sus bonificadores finales.</div>',
      side: 'top',
      align: 'center',
    },

    // 18. Final Actions & PDF Export
    {
      element: '#creator-review-actions',
      tabId: 'review',
      title: isCaster ? '18. ¡Exportar a PDF y Forjar Aventurero!' : '17. ¡Exportar a PDF y Forjar Aventurero!',
      descriptionHtml:
        '<p>• <strong>Exportar Hoja Oficial (PDF):</strong> Genera y descarga la hoja editable oficial de 3 páginas de D&D 5e rellenada con todos tus datos.<br/>• <strong>¡Forjar y Guardar Personaje!:</strong> Guarda a tu héroe en el compendio de la campaña para comenzar a jugar de inmediato.</p>' +
        '<div class="driver-callout-success">🎲 <strong>¡Pulsa en Guardar y que los dados te favorezcan!</strong></div>',
      side: 'top',
      align: 'center',
    },
  ];

  const driverSteps: DriveStep[] = stepDefs.map((def, idx) => ({
    element: def.element,
    popover: {
      title: def.title,
      description: def.descriptionHtml,
      side: def.side || 'top',
      align: def.align || 'center',
      onNextClick: (_el, _step, { driver }) => {
        const nextIdx = idx + 1;
        if (nextIdx >= stepDefs.length) {
          driver.destroy();
          return;
        }
        const nextDef = stepDefs[nextIdx];
        if (nextDef.tabId !== def.tabId) {
          onNavigateStep?.(nextDef.tabId);
          setTimeout(() => {
            driver.moveTo(nextIdx);
          }, 200);
        } else {
          driver.moveNext();
        }
      },
      onPrevClick: (_el, _step, { driver }) => {
        const prevIdx = idx - 1;
        if (prevIdx < 0) return;
        const prevDef = stepDefs[prevIdx];
        if (prevDef.tabId !== def.tabId) {
          onNavigateStep?.(prevDef.tabId);
          setTimeout(() => {
            driver.moveTo(prevIdx);
          }, 200);
        } else {
          driver.movePrevious();
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
    waitForElement: 4000,
    overlayColor: 'rgba(0, 0, 0, 0.75)',
    nextBtnText: 'Siguiente Paso →',
    prevBtnText: '← Anterior',
    doneBtnText: '¡Listo para Jugar! 🎲',
    steps: driverSteps,
  });

  // Start with a small timeout to let the identity tab be ready if it wasn't already
  setTimeout(() => {
    driverObj.drive();
  }, 100);
}
