import fs from 'fs';

function patchFile(filePath, pairs) {
  let content = fs.readFileSync(filePath, 'utf8');
  const isCrlf = content.includes('\r\n');
  let norm = content.replace(/\r\n/g, '\n');
  let count = 0;
  for (const [target, replacement] of pairs) {
    const tNorm = target.replace(/\r\n/g, '\n');
    const rNorm = replacement.replace(/\r\n/g, '\n');
    if (norm.includes(tNorm)) {
      norm = norm.split(tNorm).join(rNorm);
      count++;
    } else {
      console.warn(`[${filePath}] NOT FOUND: ${tNorm.slice(0, 70)}`);
    }
  }
  const out = isCrlf ? norm.replace(/\n/g, '\r\n') : norm;
  fs.writeFileSync(filePath, out, 'utf8');
  console.log(`[${filePath}] Applied ${count}/${pairs.length} replacements.`);
}

// 1. CharacterCreatorModal.tsx
patchFile('src/components/CharacterCreatorModal.tsx', [
  // Step 5: Dice & Standard Array & Manual
  [
    `<GripVertical className="w-3 h-3 text-[#8c672b]" /> Tirada #{idx + 1}`,
    `<GripVertical className="w-3 h-3 text-[#8c672b]" /> {isSpanish ? 'Tirada' : 'Roll'} #{idx + 1}`
  ],
  [
    `{isSelected ? '✓ Seleccionado' : 'Arrastra o toca'}`,
    `{isSelected ? (isSpanish ? '✓ Seleccionado' : '✓ Selected') : (isSpanish ? 'Arrastra o toca' : 'Drag or tap')}`
  ],
  [
    `⚖️ Matriz Estándar Oficial (15, 14, 13, 12, 10, 8)`,
    `⚖️ {isSpanish ? 'Matriz Estándar Oficial (15, 14, 13, 12, 10, 8)' : 'Official Standard Array (15, 14, 13, 12, 10, 8)'}`
  ],
  [
    `Arrastra los valores estándar a tus características o toca uno para asignarlo.`,
    `{isSpanish ? 'Arrastra los valores estándar a tus características o toca uno para asignarlo.' : 'Drag the standard values to your ability scores or tap one to assign it.'}`
  ],
  [
    `Valor #{idx + 1}`,
    `{isSpanish ? 'Valor' : 'Score'} #{idx + 1}`
  ],
  [
    `<GripVertical className="w-3 h-3 text-[#8c672b]" /> Valor #{idx + 1}`,
    `<GripVertical className="w-3 h-3 text-[#8c672b]" /> {isSpanish ? 'Valor' : 'Score'} #{idx + 1}`
  ],
  [
    `Ingreso Manual de Dados Físicos`,
    `{isSpanish ? 'Ingreso Manual de Dados Físicos' : 'Manual Physical Dice Entry'}`
  ],
  [
    `Escribe directamente los números que obtuviste en tu mesa de juego.`,
    `{isSpanish ? 'Escribe directamente los números que obtuviste en tu mesa de juego.' : 'Enter the numbers you rolled at your gaming table directly.'}`
  ],
  // Step 4: Subclass optional / unlock level
  [
    `: \`(Opcional / \${activeClass.subclasses.length} sendas disponibles)\`
                                : \`Disponible a Nivel \${subclassUnlockLevel}\``,
    `: (isSpanish ? \`(Opcional / \${activeClass.subclasses.length} sendas disponibles)\` : \`(Optional / \${activeClass.subclasses.length} subclasses available)\`)
                                : (isSpanish ? \`Disponible a Nivel \${subclassUnlockLevel}\` : \`Unlocks at Level \${subclassUnlockLevel}\`)`
  ],
  [
    `? FIGHTING_STYLE_OPTIONS.find((f) => f.id === selectedFightingStyle)?.name
                                  : 'Sin seleccionar'`,
    `? FIGHTING_STYLE_OPTIONS.find((f) => f.id === selectedFightingStyle)?.name
                                  : (isSpanish ? 'Sin seleccionar' : 'Unselected')`
  ],
  // Step 6: Tactical features
  [
    `Paso 6: Estilos de Combate & Rasgos Tácticos`,
    `{isSpanish ? 'Paso 6: Estilos de Combate & Rasgos Tácticos' : 'Step 6: Fighting Styles & Tactical Features'}`
  ],
  [
    `Muchas clases te exigen definir tu especialidad marcial o mágica desde nivel 1. Aquí eliges tu <strong>Estilo de Combate</strong> (para Guerreros, Paladines y Exploradores) y revisas tus recursos iniciales.`,
    `{isSpanish ? <>Muchas clases te exigen definir tu especialidad marcial o mágica desde nivel 1. Aquí eliges tu <strong>Estilo de Combate</strong> (para Guerreros, Paladines y Exploradores) y revisas tus recursos iniciales.</> : <>Many classes define their martial or magical specialty early on. Choose your <strong>Fighting Style</strong> (for Fighters, Paladins, and Rangers) and review your starting class resources.</>}`
  ],
  [
    `Elige tu Estilo de Combate (Fighting Style)`,
    `{isSpanish ? 'Elige tu Estilo de Combate (Fighting Style)' : 'Choose Your Fighting Style'}`
  ],
  [
    `? FIGHTING_STYLE_OPTIONS.find((f) => f.id === selectedFightingStyle)?.name
                                : 'Sin seleccionar'`,
    `? FIGHTING_STYLE_OPTIONS.find((f) => f.id === selectedFightingStyle)?.name
                                : (isSpanish ? 'Sin seleccionar' : 'Unselected')`
  ],
  [
    `<Zap className="w-4 h-4 text-[#8c672b]" /> Recursos de Clase Iniciales para {activeClass.name}`,
    `<Zap className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Recursos de Clase Iniciales para \${activeClass.name}\` : \`Starting Class Resources for \${getClassDisplayName(activeClass)}\`}`
  ],
  [
    `{res.name} (Máximo a Nivel {characterLevel}: {res.calculateMax(characterLevel)})`,
    `{res.name} ({isSpanish ? \`Máximo a Nivel \${characterLevel}\` : \`Max at Level \${characterLevel}\`}: {res.calculateMax(characterLevel)})`
  ],
  [
    `Recarga: {res.resetOn === 'short' ? 'Descanso Corto' : 'Descanso Largo'}`,
    `{isSpanish ? 'Recarga:' : 'Recharges:'} {res.resetOn === 'short' ? (isSpanish ? 'Descanso Corto' : 'Short Rest') : (isSpanish ? 'Descanso Largo' : 'Long Rest')}`
  ],
  [
    `Esta clase no requiere contadores de recursos limitados a nivel 1 o se gestiona mediante ranuras de conjuro.`,
    `{isSpanish ? 'Esta clase no requiere contadores de recursos limitados a nivel 1 o se gestiona mediante ranuras de conjuro.' : 'This class does not require limited resource counters at Level 1 or uses spell slots.'}`
  ],
  [
    `Debes seleccionar primero una clase en el paso anterior para configurar sus rasgos tácticos y recursos iniciales.`,
    `{isSpanish ? 'Debes seleccionar primero una clase en el paso anterior para configurar sus rasgos tácticos y recursos iniciales.' : 'Please select a class in the previous step first to configure its tactical features and starting resources.'}`
  ],
  // Step 3: Backgrounds
  [
    `<span>{ori}</span>`,
    `<span>{isSpanish ? ori : ({ Todos: 'All', Magia: 'Magic', Combate: 'Combat', Sigilo: 'Stealth', Social: 'Social', Exploración: 'Exploration' }[ori] || ori)}</span>`
  ],
  [
    `El manual oficial establece que con este trasfondo debes elegir <strong>{activeBackground.skillChoices.count}</strong> competencias entre las siguientes opciones:`,
    `{isSpanish ? <>El manual oficial establece que con este trasfondo debes elegir <strong>{activeBackground.skillChoices.count}</strong> competencias entre las siguientes opciones:</> : <>Official rules state that with this background you choose <strong>{activeBackground.skillChoices.count}</strong> skill proficiencies from the following options:</>}`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Habilidad Fija de Trasfondo:`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Habilidad Fija de Trasfondo:' : 'Fixed Background Skill:'}`
  ],
  [
    `<Package className="w-4 h-4 text-[#8c672b]" /> Elección de Competencia en Herramientas / Instrumentos (Elige {activeBackground.toolChoices.count})`,
    `<Package className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Elección de Competencia en Herramientas / Instrumentos (Elige \${activeBackground.toolChoices.count})\` : \`Tool / Instrument Proficiency Choice (Choose \${activeBackground.toolChoices.count})\`}`
  ],
  [
    `Selecciona entre las opciones canónicas disponibles o introduce un instrumento o herramienta personalizada.`,
    `{isSpanish ? 'Selecciona entre las opciones canónicas disponibles o introduce un instrumento o herramienta personalizada.' : 'Select from the canonical options available or enter a custom musical instrument or tool.'}`
  ],
  [
    `{selectedBackgroundTools.length} de {activeBackground.toolChoices.count} elegidas`,
    `{selectedBackgroundTools.length} {isSpanish ? 'de' : 'of'} {activeBackground.toolChoices.count} {isSpanish ? 'elegidas' : 'selected'}`
  ],
  [
    `¿Prefieres otro instrumento musical o herramienta personalizada? Escríbela aquí:`,
    `{isSpanish ? '¿Prefieres otro instrumento musical o herramienta personalizada? Escríbela aquí:' : 'Prefer another musical instrument or custom tool? Enter it here:'}`
  ],
  [
    `<Plus className="w-3.5 h-3.5" /> Añadir / Asignar`,
    `<Plus className="w-3.5 h-3.5" /> {isSpanish ? 'Añadir / Asignar' : 'Add / Assign'}`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] uppercase font-bold">Herramientas personalizadas asignadas:</span>`,
    `<span className="text-[10px] text-[#7a6448] uppercase font-bold">{isSpanish ? 'Herramientas personalizadas asignadas:' : 'Custom assigned tools:'}</span>`
  ],
  [
    `<span className="font-bold block">Regla Especial de este Trasfondo:</span>`,
    `<span className="font-bold block">{isSpanish ? 'Regla Especial de este Trasfondo:' : 'Special Background Rule:'}</span>`
  ],
  [
    `<Lock className="w-3 h-3 text-[#8c672b]" /> Idioma obligatorio de este trasfondo:`,
    `<Lock className="w-3 h-3 text-[#8c672b]" /> {isSpanish ? 'Idioma obligatorio de este trasfondo:' : 'Mandatory language from this background:'}`
  ],
  [
    `<Languages className="w-4 h-4 text-[#8c672b]" /> Idiomas Específicos Permitidos (Elige {activeBackground.languagesCount || 1})`,
    `<Languages className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Idiomas Específicos Permitidos (Elige \${activeBackground.languagesCount || 1})\` : \`Allowed Specific Languages (Choose \${activeBackground.languagesCount || 1})\`}`
  ],
  [
    `Este trasfondo solo permite elegir entre las siguientes lenguas tradicionales:`,
    `{isSpanish ? 'Este trasfondo solo permite elegir entre las siguientes lenguas tradicionales:' : 'This background allows choosing from the following traditional languages:'}`
  ],
  [
    `{selectedBackgroundLanguages.filter((l) => activeBackground.languageOptions?.includes(l)).length} de {activeBackground.languagesCount || 1} seleccionados`,
    `{selectedBackgroundLanguages.filter((l) => activeBackground.languageOptions?.includes(l)).length} {isSpanish ? 'de' : 'of'} {activeBackground.languagesCount || 1} {isSpanish ? 'seleccionados' : 'selected'}`
  ],
  [
    `{isRacial ? '(Innato por raza)' : langObj ? \`\${langObj.type} • \${langObj.script}\` : 'Especial'}`,
    `{isRacial ? (isSpanish ? '(Innato por raza)' : '(Innate racial)') : langObj ? \`\${isSpanish ? langObj.type : (langObj.type === 'Exótico' ? 'Exotic' : 'Standard')} • \${langObj.script}\` : (isSpanish ? 'Especial' : 'Special')}`
  ],
  [
    `{isRacial ? '(Innato por raza)' : \`\${lang.type} • \${lang.script}\`}`,
    `{isRacial ? (isSpanish ? '(Innato por raza)' : '(Innate racial)') : \`\${isSpanish ? lang.type : (lang.type === 'Exótico' ? 'Exotic' : 'Standard')} • \${lang.script}\`}`
  ],
  [
    `placeholder="Ej: Silvano, Habla Profunda, Infracomún, Druídico..."`,
    `placeholder={isSpanish ? "Ej: Silvano, Habla Profunda, Infracomún, Druídico..." : "E.g., Sylvan, Deep Speech, Undercommon, Druidic..."}`
  ],
  [
    `★ Dote Oficial Otorgada por Trasfondo ({isSpanish ? 'Reglas Oficiales 5e' : 'Official 5e Rules'})`,
    `★ {isSpanish ? 'Dote Oficial Otorgada por Trasfondo (Reglas Oficiales 5e)' : 'Official Bonus Feat Granted by Background (Official 5e Rules)'}`
  ],
  [
    `<Eye className="w-3.5 h-3.5 text-[#8c672b]" /> Ver Detalles & Reglas`,
    `<Eye className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Ver Detalles & Reglas' : 'View Details & Rules'}`
  ],
  [
    `<Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.personalityTraits.length || 8}`,
    `<Dices className="w-3.5 h-3.5" /> {isSpanish ? 'Tirar' : 'Roll'} d{currentRoleplayOptions.personalityTraits.length || 8}`
  ],
  [
    `<option value="">-- Selecciona para alternar un rasgo ({currentRoleplayOptions.personalityTraits.length} disponibles) --</option>`,
    `<option value="">{isSpanish ? \`-- Selecciona para alternar un rasgo (\${currentRoleplayOptions.personalityTraits.length} disponibles) --\` : \`-- Select to toggle a trait (\${currentRoleplayOptions.personalityTraits.length} available) --\`}</option>`
  ],
  [
    `<Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.ideals.length || 6}`,
    `<Dices className="w-3.5 h-3.5" /> {isSpanish ? 'Tirar' : 'Roll'} d{currentRoleplayOptions.ideals.length || 6}`
  ],
  [
    `<option value="">-- Elige un ideal de la tabla ({currentRoleplayOptions.ideals.length} opciones) --</option>`,
    `<option value="">{isSpanish ? \`-- Elige un ideal de la tabla (\${currentRoleplayOptions.ideals.length} opciones) --\` : \`-- Choose an ideal from the table (\${currentRoleplayOptions.ideals.length} options) --\`}</option>`
  ],
  [
    `<Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.bonds.length || 6}`,
    `<Dices className="w-3.5 h-3.5" /> {isSpanish ? 'Tirar' : 'Roll'} d{currentRoleplayOptions.bonds.length || 6}`
  ],
  [
    `<option value="">-- Elige un vínculo de la tabla ({currentRoleplayOptions.bonds.length} opciones) --</option>`,
    `<option value="">{isSpanish ? \`-- Elige un vínculo de la tabla (\${currentRoleplayOptions.bonds.length} opciones) --\` : \`-- Choose a bond from the table (\${currentRoleplayOptions.bonds.length} options) --\`}</option>`
  ],
  [
    `<Dices className="w-3.5 h-3.5" /> Tirar d{currentRoleplayOptions.flaws.length || 6}`,
    `<Dices className="w-3.5 h-3.5" /> {isSpanish ? 'Tirar' : 'Roll'} d{currentRoleplayOptions.flaws.length || 6}`
  ],
  [
    `<option value="">-- Elige un defecto de la tabla ({currentRoleplayOptions.flaws.length} opciones) --</option>`,
    `<option value="">{isSpanish ? \`-- Elige un defecto de la tabla (\${currentRoleplayOptions.flaws.length} opciones) --\` : \`-- Choose a flaw from the table (\${currentRoleplayOptions.flaws.length} options) --\`}</option>`
  ],
  // Step 7: Spells & Racial Magic
  [
    `? \`\${spellLimits.explanation} Selecciona los trucos y conjuros conocidos que componen tu Grimorio o repertorio arcano. Puedes organizarlos por nivel, escuela de magia o alfabéticamente.\`
                          : \`Tu clase (\${activeClass?.name || 'guerrera'}) no posee ranuras de conjuro de clase, pero tu personaje puede conocer trucos o conjuros concedidos por tu Linaje Racial (como Tiefling, Alto Elfo, Drow, Gnomo de los Bosques), dotes (Iniciado en la Magia, Tocado por las Sombras) o trasfondo. Selecciona aquí los conjuros que posea tu personaje para que figuren en su ficha con su CD de salvación y modificador de ataque mágico, o continúa con "Siguiente" si no tiene magia.\``,
    `? (isSpanish ? \`\${spellLimits.explanation} Selecciona los trucos y conjuros conocidos que componen tu Grimorio o repertorio arcano. Puedes organizarlos por nivel, escuela de magia o alfabéticamente.\` : \`\${spellLimits.explanation} Select the cantrips and spells that make up your Spellbook or arcane repertoire. Sort them by level, school of magic, or alphabetically.\`)
                          : (isSpanish ? \`Tu clase (\${activeClass?.name || 'guerrera'}) no posee ranuras de conjuro de clase, pero tu personaje puede conocer trucos o conjuros concedidos por tu Linaje Racial (como Tiefling, Alto Elfo, Drow, Gnomo de los Bosques), dotes (Iniciado en la Magia, Tocado por las Sombras) o trasfondo. Selecciona aquí los conjuros que posea tu personaje para que figuren en su ficha con su CD de salvación y modificador de ataque mágico, o continúa con "Siguiente" si no tiene magia.\` : \`Your class (\${getClassDisplayName(activeClass) || 'martial'}) does not use class spell slots, but your character may know cantrips or spells granted by your Racial Lineage (such as Tiefling, High Elf, Drow, Forest Gnome), feats (Magic Initiate, Shadow Touched), or background. Configure any innate spells here or click "Next Step" if your hero is purely martial.\`)`
  ],
  [
    `Magia Innata de Linaje Racial ({activeSubrace?.name || activeRace?.name})`,
    `{isSpanish ? \`Magia Innata de Linaje Racial (\${activeSubrace?.name || activeRace?.name})\` : \`Innate Racial Lineage Magic (\${activeSubrace?.name || getRaceDisplayName(activeRace)})\`}`
  ],
  [
    `Concedida por tu linaje de D&D 5e. No consume ranuras de conjuro de clase.`,
    `{isSpanish ? 'Concedida por tu linaje de D&D 5e. No consume ranuras de conjuro de clase.' : 'Granted by your racial lineage. Does not consume class spell slots.'}`
  ],
  [
    `<span>📖 Truco Racial a Elegir (Lista de {racialSpellcastingInfo.config.cantripChoiceClass || 'Mago'}):</span>`,
    `<span>📖 {isSpanish ? \`Truco Racial a Elegir (Lista de \${racialSpellcastingInfo.config.cantripChoiceClass || 'Mago'}):\` : \`Racial Cantrip Choice (\${racialSpellcastingInfo.config.cantripChoiceClass || 'Wizard'} List):\`}</span>`
  ],
  [
    `<span className="text-[10px] text-purple-700 font-mono font-bold">1 Truco adicional</span>`,
    `<span className="text-[10px] text-purple-700 font-mono font-bold">{isSpanish ? '1 Truco adicional' : '1 Bonus Cantrip'}</span>`
  ],
  [
    `<option value="">-- Selecciona un Truco de Linaje --</option>`,
    `<option value="">{isSpanish ? '-- Selecciona un Truco de Linaje --' : '-- Select a Lineage Cantrip --'}</option>`
  ],
  [
    `Hechizos Otorgados Activos a tu Nivel ({characterLevel}):`,
    `{isSpanish ? \`Hechizos Otorgados Activos a tu Nivel (\${characterLevel}):\` : \`Granted Spells Active at Your Level (\${characterLevel}):\`}`
  ],
  [
    `? 'Por favor selecciona tu truco racial en el desplegable superior.'
                                  : 'Tus hechizos innatos se activarán al alcanzar los niveles correspondientes.'`,
    `? (isSpanish ? 'Por favor selecciona tu truco racial en el desplegable superior.' : 'Please select your racial cantrip in the dropdown above.')
                                  : (isSpanish ? 'Tus hechizos innatos se activarán al alcanzar los niveles correspondientes.' : 'Your innate spells will unlock upon reaching the required levels.')`
  ],
  [
    `<span>🔮</span> Progresión de Linaje (Hechizos que desbloquearás al subir de nivel):`,
    `<span>🔮</span> {isSpanish ? 'Progresión de Linaje (Hechizos que desbloquearás al subir de nivel):' : 'Lineage Progression (Spells unlocked at higher levels):'}`
  ],
  [
    `Conjuros Adicionales Registrados (Dotes / Trasfondo / Excepción)`,
    `{isSpanish ? 'Conjuros Adicionales Registrados (Dotes / Trasfondo / Excepción)' : 'Additional Recorded Spells (Feats / Background / DM Exception)'}`
  ],
  [
    `Si tu director de juego te concedió un conjuro por trasfondo casero, un pacto o una bendición divina, puedes buscarlo en el compendio oficial y agregarlo a tu ficha:`,
    `{isSpanish ? 'Si tu director de juego te concedió un conjuro por trasfondo casero, un pacto o una bendición divina, puedes buscarlo en el compendio oficial y agregarlo a tu ficha:' : 'If your Dungeon Master granted you a spell via a homebrew background, pact, or divine blessing, you can search the official compendium and add it to your sheet:'}`
  ],
  [
    `placeholder="Buscar en el compendio general de 515 conjuros..."`,
    `placeholder={isSpanish ? "Buscar en el compendio general de 515 conjuros..." : "Search the full compendium of 515 spells..."}`
  ],
  [
    `<span>Compendio ({OFFICIAL_SPELLS_COMPENDIUM.length})</span>`,
    `<span>{isSpanish ? 'Compendio' : 'Compendium'} ({OFFICIAL_SPELLS_COMPENDIUM.length})</span>`
  ],
  [
    `Magia Innata Racial Concedida ({activeSubrace?.name || activeRace?.name})`,
    `{isSpanish ? \`Magia Innata Racial Concedida (\${activeSubrace?.name || activeRace?.name})\` : \`Granted Innate Racial Magic (\${activeSubrace?.name || getRaceDisplayName(activeRace)})\`}`
  ],
  [
    `{grantedRacialSpells.length} conjuro{grantedRacialSpells.length > 1 ? 's' : ''} (Sin gasto de ranuras de clase)`,
    `{isSpanish ? \`\${grantedRacialSpells.length} conjuro\${grantedRacialSpells.length > 1 ? 's' : ''} (Sin gasto de ranuras de clase)\` : \`\${grantedRacialSpells.length} spell\${grantedRacialSpells.length > 1 ? 's' : ''} (No class slots used)\`}`
  ],
  [
    `Has superado el límite recomendado por las reglas de D&D 5e`,
    `{isSpanish ? 'Has superado el límite recomendado por las reglas de D&D 5e' : 'You have exceeded the recommended D&D spell limit'}`
  ],
  [
    `No se encontraron trucos con los filtros actuales.`,
    `{isSpanish ? 'No se encontraron trucos con los filtros actuales.' : 'No cantrips found with the current filters.'}`
  ],
  [
    `No se encontraron hechizos de nivel con los filtros actuales.`,
    `{isSpanish ? 'No se encontraron hechizos de nivel con los filtros actuales.' : 'No leveled spells found with the current filters.'}`
  ],
  // Step 9: Review tabs
  [
    `{personalityTraits.trim() || 'Sin definir todavía.'}`,
    `{personalityTraits.trim() || (isSpanish ? 'Sin definir todavía.' : 'Not defined yet.')}`
  ],
  [
    `{ideals.trim() || 'Sin definir todavía.'}`,
    `{ideals.trim() || (isSpanish ? 'Sin definir todavía.' : 'Not defined yet.')}`
  ],
  [
    `{bonds.trim() || 'Sin definir todavía.'}`,
    `{bonds.trim() || (isSpanish ? 'Sin definir todavía.' : 'Not defined yet.')}`
  ],
  [
    `{flaws.trim() || 'Sin definir todavía.'}`,
    `{flaws.trim() || (isSpanish ? 'Sin definir todavía.' : 'Not defined yet.')}`
  ],
  [
    `Elección ({feat.subChoice?.title}): <span className="underline">{subChoiceNames}</span>`,
    `{isSpanish ? 'Elección' : 'Choice'} ({feat.subChoice?.title}): <span className="underline">{subChoiceNames}</span>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] uppercase block">Característica</span>`,
    `<span className="text-[10px] text-[#7a6448] uppercase block">{isSpanish ? 'Característica' : 'Ability'}</span>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] uppercase block">CD Salvación</span>`,
    `<span className="text-[10px] text-[#7a6448] uppercase block">{isSpanish ? 'CD Salvación' : 'Save DC'}</span>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] uppercase block">Ataque de Conjuro</span>`,
    `<span className="text-[10px] text-[#7a6448] uppercase block">{isSpanish ? 'Ataque de Conjuro' : 'Spell Attack'}</span>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] uppercase block">Preparados/Conocidos</span>`,
    `<span className="text-[10px] text-[#7a6448] uppercase block">{isSpanish ? 'Preparados/Conocidos' : 'Prepared/Known'}</span>`
  ],
  [
    `Ranuras de Conjuro Disponibles:`,
    `{isSpanish ? 'Ranuras de Conjuro Disponibles:' : 'Available Spell Slots:'}`
  ],
  [
    `{lvlKey.toUpperCase().replace('LVL', 'Nivel ')}: {count} {count === 1 ? 'ranura' : 'ranuras'}`,
    `{lvlKey.toUpperCase().replace('LVL', isSpanish ? 'Nivel ' : 'Level ')}: {count} {count === 1 ? (isSpanish ? 'ranura' : 'slot') : (isSpanish ? 'ranuras' : 'slots')}`
  ],
  [
    `<Sparkles className="w-4 h-4 text-[#8c672b]" /> Trucos Conocidos (Nivel 0)`,
    `<Sparkles className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Trucos Conocidos (Nivel 0)' : 'Known Cantrips (Level 0)'}`
  ],
  [
    `<BookOpen className="w-4 h-4 text-[#8c672b]" /> Conjuros Nivelados Conocidos / Preparados`,
    `<BookOpen className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Conjuros Nivelados Conocidos / Preparados' : 'Known / Prepared Leveled Spells'}`
  ],
  [
    `Casteo: {spl.castingTime || '1 acción'} • Alcance: {spl.range || 'Cerca'}`,
    `{isSpanish ? 'Casteo:' : 'Cast:'} {spl.castingTime || (isSpanish ? '1 acción' : '1 action')} • {isSpanish ? 'Alcance:' : 'Range:'} {spl.range || (isSpanish ? 'Cerca' : 'Self/Close')}`
  ],
  [
    `? \`\${activeBackground.languagesCount || 1} a elegir entre: \${activeBackground.languageOptions.join(', ')}\`
                              : activeBackground?.languageNote
                              ? activeBackground.languageNote
                              : activeBackground?.languagesCount
                              ? \`\${activeBackground.languagesCount} idiomas adicionales a elección\`
                              : 'Idiomas estándar según raza'`,
    `? (isSpanish ? \`\${activeBackground.languagesCount || 1} a elegir entre: \${activeBackground.languageOptions.join(', ')}\` : \`\${activeBackground.languagesCount || 1} to choose from: \${activeBackground.languageOptions.join(', ')}\`)
                              : activeBackground?.languageNote
                              ? activeBackground.languageNote
                              : activeBackground?.languagesCount
                              ? (isSpanish ? \`\${activeBackground.languagesCount} idiomas adicionales a elección\` : \`\${activeBackground.languagesCount} additional languages of choice\`)
                              : (isSpanish ? 'Idiomas estándar según raza' : 'Standard racial languages')`
  ],
  // Maximized Modals & Exit Modal
  [
    `Compendio de Conjuración Ampliado • {activeClass?.name || 'Lanzador'}`,
    `{isSpanish ? \`Compendio de Conjuración Ampliado • \${activeClass?.name || 'Lanzador'}\` : \`Expanded Spellcasting Compendium • \${getClassDisplayName(activeClass) || 'Caster'}\`}`
  ],
  [
    `{spellLimits.explanation} • Organiza y selecciona tus conjuros en pantalla completa`,
    `{spellLimits.explanation} • {isSpanish ? 'Organiza y selecciona tus conjuros en pantalla completa' : 'Organize and select your spells in fullscreen'}`
  ],
  [
    `Grimorio: {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown}`,
    `{isSpanish ? 'Grimorio:' : 'Spellbook:'} {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown}`
  ],
  [
    `Listo / Minimizar`,
    `{isSpanish ? 'Listo / Minimizar' : 'Done / Minimize'}`
  ],
  [
    `TRUCOS DE MAGIA (Nivel 0 / Cantrips) — {displayedSpellsData.cantrips.length} disponibles`,
    `{isSpanish ? \`TRUCOS DE MAGIA (Nivel 0 / Cantrips) — \${displayedSpellsData.cantrips.length} disponibles\` : \`CANTRIPS (Level 0 Spells) — \${displayedSpellsData.cantrips.length} available\`}`
  ],
  [
    `{selectedCantripsCount} / {spellLimits.maxCantrips} Trucos Elegidos`,
    `{selectedCantripsCount} / {spellLimits.maxCantrips} {isSpanish ? 'Trucos Elegidos' : 'Cantrips Chosen'}`
  ],
  [
    `HECHIZOS CON ESPACIO DE CONJURO (Nivel 1 o Superior) — {displayedSpellsData.leveled.length} disponibles`,
    `{isSpanish ? \`HECHIZOS CON ESPACIO DE CONJURO (Nivel 1 o Superior) — \${displayedSpellsData.leveled.length} disponibles\` : \`LEVELED SPELLS (Level 1 & Higher) — \${displayedSpellsData.leveled.length} available\`}`
  ],
  [
    `{spells.filter((sp) => selectedSpells.some((s) => s.name.toLowerCase() === sp.name.toLowerCase())).length} elegidos de este nivel`,
    `{spells.filter((sp) => selectedSpells.some((s) => s.name.toLowerCase() === sp.name.toLowerCase())).length} {isSpanish ? 'elegidos de este nivel' : 'chosen from this level'}`
  ],
  [
    `Compendio de Razas y Linajes Ancestrales (30+ Razas Oficiales)`,
    `{isSpanish ? 'Compendio de Razas y Linajes Ancestrales (30+ Razas Oficiales)' : 'Ancestral Races & Lineages Compendium (30+ Official Races)'}`
  ],
  [
    `{activeRace ? \`Raza seleccionada: \${activeRace.name}\` : 'Selecciona la raza para tu héroe'}`,
    `{activeRace ? (isSpanish ? \`Raza seleccionada: \${activeRace.name}\` : \`Selected race: \${getRaceDisplayName(activeRace)}\`) : (isSpanish ? 'Selecciona la raza para tu héroe' : 'Select the race for your hero')}`
  ],
  [
    `<span>Raza Seleccionada:</span>`,
    `<span>{isSpanish ? 'Raza Seleccionada:' : 'Selected Race:'}</span>`
  ],
  [
    `<span className="text-[#8c672b] font-black">{activeRace?.name || 'Ninguna (haz clic en una tarjeta)'}</span>`,
    `<span className="text-[#8c672b] font-black">{activeRace ? getRaceDisplayName(activeRace) : (isSpanish ? 'Ninguna (haz clic en una tarjeta)' : 'None (click a card)')}</span>`
  ],
  [
    `<span>Confirmar y Configurar Linaje y Rasgos →</span>`,
    `<span>{isSpanish ? 'Confirmar y Configurar Linaje y Rasgos →' : 'Confirm & Configure Lineage and Traits →'}</span>`
  ],
  [
    `Compendio de Dotes Oficiales (Feats Oficiales de 5e)`,
    `{isSpanish ? 'Compendio de Dotes Oficiales (Feats Oficiales de 5e)' : 'Official Feats Compendium (5e Feats)'}`
  ],
  [
    `Asignando a Slot #{maximizedFeatSlotIdx + 1} • Elige tu dote táctica`,
    `{isSpanish ? \`Asignando a Slot #\${maximizedFeatSlotIdx + 1} • Elige tu dote táctica\` : \`Assigning to Slot #\${maximizedFeatSlotIdx + 1} • Choose your tactical feat\`}`
  ],
  [
    `placeholder="Buscar dote por nombre, beneficio o requisito..."`,
    `placeholder={isSpanish ? "Buscar dote por nombre, beneficio o requisito..." : "Search feat by name, benefit, or prerequisite..."}`
  ],
  [
    `Compendio Oficial de Trasfondos ({WIKIDOT_BACKGROUNDS.length} Trasfondos Canónicos)`,
    `{isSpanish ? \`Compendio Oficial de Trasfondos (\${WIKIDOT_BACKGROUNDS.length} Trasfondos Canónicos)\` : \`Official Backgrounds Compendium (\${WIKIDOT_BACKGROUNDS.length} Canonical Backgrounds)\`}`
  ],
  [
    `{activeBackground ? \`Trasfondo seleccionado: \${activeBackground.name}\` : 'Selecciona el trasfondo de tu personaje'}`,
    `{activeBackground ? (isSpanish ? \`Trasfondo seleccionado: \${activeBackground.name}\` : \`Selected background: \${getBgDisplayName(activeBackground)}\`) : (isSpanish ? 'Selecciona el trasfondo de tu personaje' : 'Select your character background')}`
  ],
  [
    `placeholder="Buscar trasfondo..."`,
    `placeholder={isSpanish ? "Buscar trasfondo..." : "Search background..."}`
  ],
  [
    `<span>Trasfondo Seleccionado:</span>`,
    `<span>{isSpanish ? 'Trasfondo Seleccionado:' : 'Selected Background:'}</span>`
  ],
  [
    `<span className="text-[#8c672b] font-black">{activeBackground?.name || 'Ninguno (haz clic en una tarjeta)'}</span>`,
    `<span className="text-[#8c672b] font-black">{activeBackground ? getBgDisplayName(activeBackground) : (isSpanish ? 'Ninguno (haz clic en una tarjeta)' : 'None (click a card)')}</span>`
  ],
  [
    `<span>Confirmar y Configurar Herramientas, Idiomas y Rasgos →</span>`,
    `<span>{isSpanish ? 'Confirmar y Configurar Herramientas, Idiomas y Rasgos →' : 'Confirm & Configure Tools, Languages, and Traits →'}</span>`
  ],
  [
    `¿Deseas guardar antes de salir?`,
    `{isSpanish ? '¿Deseas guardar antes de salir?' : 'Save before leaving?'}`
  ],
  [
    `Tienes selecciones y cambios en este personaje.`,
    `{isSpanish ? 'Tienes selecciones y cambios en este personaje.' : 'You have unsaved selections and changes on this character.'}`
  ],
  [
    `Puedes <strong>guardar tu progreso como borrador</strong> para reanudarlo más tarde exactamente desde este paso (<em>{STEPS.find((s) => s.id === currentStep)?.title}</em>), o salir sin guardar los cambios.`,
    `{isSpanish ? <>Puedes <strong>guardar tu progreso como borrador</strong> para reanudarlo más tarde exactamente desde este paso (<em>{STEPS.find((s) => s.id === currentStep)?.title}</em>), o salir sin guardar los cambios.</> : <>You can <strong>save your progress as a draft</strong> to resume later from this exact step (<em>{STEPS.find((s) => s.id === currentStep)?.title}</em>), or exit without saving.</>}`
  ],
  [
    `<Save className="w-4 h-4" /> 💾 Guardar Borrador y Salir`,
    `<Save className="w-4 h-4" /> 💾 {isSpanish ? 'Guardar Borrador y Salir' : 'Save Draft & Exit'}`
  ],
  [
    `❌ Salir sin Guardar Cambios`,
    `❌ {isSpanish ? 'Salir sin Guardar Cambios' : 'Exit Without Saving'}`
  ],
  [
    `Continuar Editando`,
    `{isSpanish ? 'Continuar Editando' : 'Continue Editing'}`
  ]
]);

// 2. CreatorCards.tsx
patchFile('src/components/CreatorCards.tsx', [
  // ClassProgressionCard
  [
    `export const ClassProgressionCard: React.FC<ClassProgressionCardProps> = ({
  feat,
  characterLevel,
  classNameStr,
  onInspect,
}) => {
  const isUnlocked = feat.level <= characterLevel;`,
    `export const ClassProgressionCard: React.FC<ClassProgressionCardProps> = ({
  feat,
  characterLevel,
  classNameStr,
  onInspect,
}) => {
  const { isSpanish } = useLanguageStore();
  const isUnlocked = feat.level <= characterLevel;`
  ],
  [
    `  const inspectData: CompendiumInspectData = {
    title: feat.name,
    subtitle: \`Rasgo de Nivel \${feat.level} de \${classNameStr}\`,
    category: \`Rasgo de \${classNameStr}\`,
    iconType: 'feature',
    description: feat.desc,
    badges: [
      { label: 'Clase', value: classNameStr },
      { label: 'Nivel Requerido', value: \`Nivel \${feat.level}\` },
      { label: 'Estado', value: isUnlocked ? 'Activo en tu PJ' : 'Bloqueado (Nivel superior)' },
    ],
  };`,
    `  const inspectData: CompendiumInspectData = {
    title: feat.name,
    subtitle: isSpanish ? \`Rasgo de Nivel \${feat.level} de \${classNameStr}\` : \`Level \${feat.level} \${classNameStr} Feature\`,
    category: isSpanish ? \`Rasgo de \${classNameStr}\` : \`\${classNameStr} Feature\`,
    iconType: 'feature',
    description: feat.desc,
    badges: [
      { label: isSpanish ? 'Clase' : 'Class', value: classNameStr },
      { label: isSpanish ? 'Nivel Requerido' : 'Required Level', value: \`\${isSpanish ? 'Nivel' : 'Level'} \${feat.level}\` },
      { label: isSpanish ? 'Estado' : 'Status', value: isUnlocked ? (isSpanish ? 'Activo en tu PJ' : 'Active on your PC') : (isSpanish ? 'Bloqueado (Nivel superior)' : 'Locked (Higher level)') },
    ],
  };`
  ],
  [
    `            Nv {feat.level}`,
    `            {isSpanish ? 'Nv' : 'Lv'} {feat.level}`
  ],
  [
    `          {isUnlocked ? (
            <span className="text-[10px] text-[#2e7d32] font-mono font-bold">Activo</span>
          ) : (
            <span className="text-[10px] text-[#7a6448] font-mono flex items-center gap-1">
              <Lock className="w-3 h-3" /> Bloqueado
            </span>
          )}`,
    `          {isUnlocked ? (
            <span className="text-[10px] text-[#2e7d32] font-mono font-bold">{isSpanish ? 'Activo' : 'Active'}</span>
          ) : (
            <span className="text-[10px] text-[#7a6448] font-mono flex items-center gap-1">
              <Lock className="w-3 h-3" /> {isSpanish ? 'Bloqueado' : 'Locked'}
            </span>
          )}`
  ],
  // FightingStyleCard
  [
    `export const FightingStyleCard: React.FC<FightingStyleCardProps> = ({
  style,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const inspectData: CompendiumInspectData = {`,
    `export const FightingStyleCard: React.FC<FightingStyleCardProps> = ({
  style,
  isSelected,
  onSelect,
  onInspect,
}) => {
  const { isSpanish } = useLanguageStore();
  const inspectData: CompendiumInspectData = {`
  ],
  [
    `    category: 'Estilo de Combate Oficial',
    iconType: 'style',
    description: style.detailedDesc,
    quote: style.shortDesc,
    badges: [
      { label: 'Clases que lo Aprenden', value: style.allowedClasses.join(', ') },
    ],
    actionButton: {
      label: isSelected ? 'Estilo Elegido' : 'Elegir este Estilo',
      onClick: onSelect,
      isSelected,
    },`,
    `    category: isSpanish ? 'Estilo de Combate Oficial' : 'Official Fighting Style',
    iconType: 'style',
    description: style.detailedDesc,
    quote: style.shortDesc,
    badges: [
      { label: isSpanish ? 'Clases que lo Aprenden' : 'Classes', value: style.allowedClasses.join(', ') },
    ],
    actionButton: {
      label: isSelected ? (isSpanish ? 'Estilo Elegido' : 'Style Chosen') : (isSpanish ? 'Elegir este Estilo' : 'Choose this Style'),
      onClick: onSelect,
      isSelected,
    },`
  ],
  // BackgroundCard orientation badge
  [
    `              <span className={\`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border \${getOrientationBadge(bg.orientation)}\`}>
                {bg.orientation}
              </span>`,
    `              <span className={\`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border \${getOrientationBadge(bg.orientation)}\`}>
                {isSpanish ? bg.orientation : ({ Magia: 'Magic', Combate: 'Combat', Sigilo: 'Stealth', Social: 'Social', Exploración: 'Exploration' }[bg.orientation] || bg.orientation)}
              </span>`
  ],
  // SpellCardComponent
  [
    `export const SpellCardComponent: React.FC<SpellCardComponentProps> = ({
  spell,
  isSelected,
  onToggle,
  onInspect,
  isHigherLevel,
  requiredCasterLevel,
}) => {`,
    `export const SpellCardComponent: React.FC<SpellCardComponentProps> = ({
  spell,
  isSelected,
  onToggle,
  onInspect,
  isHigherLevel,
  requiredCasterLevel,
}) => {
  const { isSpanish } = useLanguageStore();`
  ],
  [
    `              {spell.level === 0 ? 'Truco' : \`Nv \${spell.level}\`}`,
    `              {spell.level === 0 ? (isSpanish ? 'Truco' : 'Cantrip') : \`\${isSpanish ? 'Nv' : 'Lv'} \${spell.level}\`}`
  ],
  [
    `                Desbloquea a Nv {requiredCasterLevel || (spell.level * 2 - 1)}`,
    `                {isSpanish ? 'Desbloquea a Nv' : 'Unlocks at Lv'} {requiredCasterLevel || (spell.level * 2 - 1)}`
  ],
  [
    `                ✨ Magia Racial`,
    `                ✨ {isSpanish ? 'Magia Racial' : 'Racial Magic'}`
  ],
  [
    `          <Eye className="w-3 h-3" /> Ver detalles →`,
    `          <Eye className="w-3 h-3" /> {isSpanish ? 'Ver detalles →' : 'View details →'}`
  ]
]);

// 3. SubclassPickerModal.tsx
patchFile('src/components/SubclassPickerModal.tsx', [
  [
    `import { WikidotClass } from '../data/wikidotData';
import { CompendiumInspectData } from './CompendiumInspectModal';`,
    `import { WikidotClass } from '../data/wikidotData';
import { CompendiumInspectData } from './CompendiumInspectModal';
import { useLanguageStore } from '../hooks/useLanguageStore';`
  ],
  [
    `  const [searchQuery, setSearchQuery] = useState('');`,
    `  const { isSpanish } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState('');`
  ],
  [
    `                <h3 className="font-fantasy font-bold text-lg sm:text-xl text-[#f4e2bb] tracking-wide">
                  {activeClass.subclassesName} — {activeClass.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#b88c32]/25 text-[#ffd56b] border border-[#b88c32]/40">
                  {totalCount} {totalCount === 1 ? 'Opción' : 'Opciones Disponibles'}
                </span>
                {isCompact && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-[#d8c29d] border border-white/15">
                    Modo Compacto
                  </span>
                )}
              </div>
              <p className="text-xs text-[#c2ad8a] mt-0.5">
                {isSubclassUnlocked
                  ? \`Selecciona la especialización para tu \${activeClass.name} de Nivel \${characterLevel}.\`
                  : \`Tu personaje es Nivel \${characterLevel}. Esta clase consagra su especialización a Nivel \${subclassUnlockLevel}. Puedes explorar e inspeccionar cada senda.\`}
              </p>`,
    `                <h3 className="font-fantasy font-bold text-lg sm:text-xl text-[#f4e2bb] tracking-wide">
                  {isSpanish ? activeClass.subclassesName : 'Subclass / Specialization'} — {isSpanish ? activeClass.name : (activeClass.nameEn || activeClass.name)}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#b88c32]/25 text-[#ffd56b] border border-[#b88c32]/40">
                  {totalCount} {totalCount === 1 ? (isSpanish ? 'Opción' : 'Option') : (isSpanish ? 'Opciones Disponibles' : 'Available Options')}
                </span>
                {isCompact && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-[#d8c29d] border border-white/15">
                    {isSpanish ? 'Modo Compacto' : 'Compact Mode'}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#c2ad8a] mt-0.5">
                {isSubclassUnlocked
                  ? (isSpanish ? \`Selecciona la especialización para tu \${activeClass.name} de Nivel \${characterLevel}.\` : \`Select the specialization for your Level \${characterLevel} \${activeClass.nameEn || activeClass.name}.\`)
                  : (isSpanish ? \`Tu personaje es Nivel \${characterLevel}. Esta clase consagra su especialización a Nivel \${subclassUnlockLevel}. Puedes explorar e inspeccionar cada senda.\` : \`Your character is Level \${characterLevel}. This class chooses its specialization at Level \${subclassUnlockLevel}. You can browse and inspect every subclass now.\`)}
              </p>`
  ],
  [
    `              <span className="font-bold text-[#4a361c]">
                Especialización bloqueada por nivel (Nivel actual: {characterLevel} / Requerido: {subclassUnlockLevel}).
              </span>
              <span className="text-[11px] text-[#7a6448] ml-1">
                Puedes hacer clic en <em>Inspeccionar</em> para leer todos los rasgos detallados de cada opción.
              </span>`,
    `              <span className="font-bold text-[#4a361c]">
                {isSpanish ? \`Especialización bloqueada por nivel (Nivel actual: \${characterLevel} / Requerido: \${subclassUnlockLevel}).\` : \`Specialization locked by level (Current Level: \${characterLevel} / Required: \${subclassUnlockLevel}).\`}
              </span>
              <span className="text-[11px] text-[#7a6448] ml-1">
                {isSpanish ? <>Puedes hacer clic en <em>Rasgos</em> para leer todos los rasgos detallados de cada opción.</> : <>Click <em>Features</em> on any card to read all detailed traits for each option.</>}
              </span>`
  ],
  [
    `placeholder={\`Buscar en las \${totalCount} sendas de \${activeClass.name}...\`}`,
    `placeholder={isSpanish ? \`Buscar en las \${totalCount} sendas de \${activeClass.name}...\` : \`Search across \${totalCount} \${activeClass.nameEn || activeClass.name} subclasses...\`}`
  ],
  [
    `Mostrando {filteredSubclasses.length} de {totalCount}`,
    `{isSpanish ? \`Mostrando \${filteredSubclasses.length} de \${totalCount}\` : \`Showing \${filteredSubclasses.length} of \${totalCount}\`}`
  ],
  [
    `              <p className="font-fantasy text-sm font-bold">No se encontraron especializaciones con "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8c672b] underline hover:text-[#4a361c] cursor-pointer"
              >
                Limpiar búsqueda
              </button>`,
    `              <p className="font-fantasy text-sm font-bold">{isSpanish ? \`No se encontraron especializaciones con "\${searchQuery}"\` : \`No specializations found matching "\${searchQuery}"\`}</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#8c672b] underline hover:text-[#4a361c] cursor-pointer"
              >
                {isSpanish ? 'Limpiar búsqueda' : 'Clear search'}
              </button>`
  ],
  [
    `                  subtitle: \`Arquetipo de \${activeClass.name}\`,
                  category: \`Subclase de \${activeClass.name}\`,
                  iconType: 'subclass',
                  description: sub.description,
                  traits: sub.features,
                  badges: !isSubclassUnlocked
                    ? [{ label: 'Requisito', value: \`Desbloquea a Nivel \${subclassUnlockLevel}\`, variant: 'amber' }]
                    : undefined,
                  actionButton: !isSubclassUnlocked
                    ? {
                        label: \`Se desbloquea a Nivel \${subclassUnlockLevel}\`,
                        onClick: () => {},
                        disabled: true,
                      }
                    : {
                        label: isSelected ? 'Subclase Elegida' : 'Elegir esta Subclase',`,
    `                  subtitle: isSpanish ? \`Arquetipo de \${activeClass.name}\` : \`\${activeClass.nameEn || activeClass.name} Archetype\`,
                  category: isSpanish ? \`Subclase de \${activeClass.name}\` : \`\${activeClass.nameEn || activeClass.name} Subclass\`,
                  iconType: 'subclass',
                  description: sub.description,
                  traits: sub.features,
                  badges: !isSubclassUnlocked
                    ? [{ label: isSpanish ? 'Requisito' : 'Requirement', value: isSpanish ? \`Desbloquea a Nivel \${subclassUnlockLevel}\` : \`Unlocks at Level \${subclassUnlockLevel}\`, variant: 'amber' }]
                    : undefined,
                  actionButton: !isSubclassUnlocked
                    ? {
                        label: isSpanish ? \`Se desbloquea a Nivel \${subclassUnlockLevel}\` : \`Unlocks at Level \${subclassUnlockLevel}\`,
                        onClick: () => {},
                        disabled: true,
                      }
                    : {
                        label: isSelected ? (isSpanish ? 'Subclase Elegida' : 'Subclass Selected') : (isSpanish ? 'Elegir esta Subclase' : 'Choose this Subclass'),`
  ],
  [
    `                            <span className="text-[10px] text-[#7a6448] block">
                              Arquetipo de {activeClass.name}
                            </span>`,
    `                            <span className="text-[10px] text-[#7a6448] block">
                              {isSpanish ? \`Arquetipo de \${activeClass.name}\` : \`\${activeClass.nameEn || activeClass.name} Archetype\`}
                            </span>`
  ],
  [
    `                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#b88c32] text-white flex items-center gap-1 shrink-0">
                            <Check className="w-3 h-3" /> Elegida
                          </span>`,
    `                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#b88c32] text-white flex items-center gap-1 shrink-0">
                            <Check className="w-3 h-3" /> {isSpanish ? 'Elegida' : 'Selected'}
                          </span>`
  ],
  [
    `                      {/* CARD DESCRIPTION */}
                      <p className="text-xs text-[#5c4a35] leading-relaxed line-clamp-3">
                        {sub.description}
                      </p>`,
    `                      {/* CARD DESCRIPTION */}
                      <p className="text-xs text-[#5c4a35] leading-relaxed">
                        {sub.description}
                      </p>`
  ],
  [
    `                            <BookOpen className="w-3 h-3 text-[#8c672b]" /> Rasgos Principales:`,
    `                            <BookOpen className="w-3 h-3 text-[#8c672b]" /> {isSpanish ? 'Rasgos Principales:' : 'Key Features:'}`
  ],
  [
    `                                Nv.{feat.level}: {feat.name}`,
    `                                {isSpanish ? 'Nv.' : 'Lv.'}{feat.level}: {feat.name}`
  ],
  [
    `                                +{sub.features.length - 3} más`,
    `                                +{sub.features.length - 3} {isSpanish ? 'más' : 'more'}`
  ],
  [
    `                        <Eye className="w-3.5 h-3.5" /> Rasgos`,
    `                        <Eye className="w-3.5 h-3.5" /> {isSpanish ? 'Rasgos' : 'Features'}`
  ],
  [
    `                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Seleccionada
                            </>
                          ) : (
                            'Elegir esta Subclase'
                          )}`,
    `                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> {isSpanish ? 'Seleccionada' : 'Selected'}
                            </>
                          ) : (
                            isSpanish ? 'Elegir esta Subclase' : 'Choose Subclass'
                          )}`
  ],
  [
    `                          <Lock className="w-3 h-3" /> Nivel {subclassUnlockLevel}`,
    `                          <Lock className="w-3 h-3" /> {isSpanish ? 'Nivel' : 'Level'} {subclassUnlockLevel}`
  ],
  [
    `          <div className="text-xs text-[#5c4a35] flex items-center gap-2">
            <span className="font-bold text-[#382b20]">Selección actual:</span>
            {selectedSubclass ? (
              <span className="px-2.5 py-0.5 rounded-md bg-[#b88c32] text-white font-bold text-xs shadow-xs">
                {selectedSubclass.name}
              </span>
            ) : (
              <span className="italic text-[#8c7860]">Ninguna especialización seleccionada</span>
            )}
          </div>`,
    `          <div className="text-xs text-[#5c4a35] flex items-center gap-2">
            <span className="font-bold text-[#382b20]">{isSpanish ? 'Selección actual:' : 'Current selection:'}</span>
            {selectedSubclass ? (
              <span className="px-2.5 py-0.5 rounded-md bg-[#b88c32] text-white font-bold text-xs shadow-xs">
                {selectedSubclass.name}
              </span>
            ) : (
              <span className="italic text-[#8c7860]">{isSpanish ? 'Ninguna especialización seleccionada' : 'No specialization selected'}</span>
            )}
          </div>`
  ],
  [
    `                Quitar Selección`,
    `                {isSpanish ? 'Quitar Selección' : 'Clear Selection'}`
  ],
  [
    `              Cerrar y Continuar`,
    `              {isSpanish ? 'Cerrar y Continuar' : 'Close & Continue'}`
  ]
]);

// 4. CompendiumInspectModal.tsx
patchFile('src/components/CompendiumInspectModal.tsx', [
  [
    `                  Compendio Oficial D&D 5e`,
    `                  {isSpanish ? 'Compendio Oficial D&D 5e' : 'Official D&D Compendium'}`
  ],
  [
    `                  Requisito Previo`,
    `                  {isSpanish ? 'Requisito Previo' : 'Prerequisite'}`
  ],
  [
    `                      <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> Descripción`,
    `                      <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Descripción' : 'Description'}`
  ],
  [
    `                      <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> Lore y Reglas Detalladas (Wikidot)`,
    `                      <BookOpen className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Lore y Reglas Detalladas (Wikidot)' : 'Detailed Lore & Rules (Wikidot)'}`
  ],
  [
    `                <Award className="w-3.5 h-3.5 text-[#8c672b]" /> Beneficios y Reglas Completas ({data.benefits.length})`,
    `                <Award className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Beneficios y Reglas Completas' : 'Benefits & Complete Rules'} ({data.benefits.length})`
  ],
  [
    `                <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" /> Rasgos y Habilidades Especiales ({data.traits.length})`,
    `                <Sparkles className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Rasgos y Habilidades Especiales' : 'Special Traits & Features'} ({data.traits.length})`
  ],
  [
    `                Equipo Sugerido Inicial`,
    `                {isSpanish ? 'Equipo Sugerido Inicial' : 'Suggested Starting Equipment'}`
  ],
  [
    `            Cerrar`,
    `            {isSpanish ? 'Cerrar' : 'Close'}`
  ]
]);
