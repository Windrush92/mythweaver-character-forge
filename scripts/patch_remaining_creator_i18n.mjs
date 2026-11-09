import fs from 'fs';

const file = 'C:/Users/natal/.gemini/antigravity/scratch/dnd-character-forge/src/components/CharacterCreatorModal.tsx';
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// 1. Add helper functions right after displayAttackType
const helperAnchor = `  const displayAttackType = (type: string) => isSpanish ? type : (DAMAGE_TYPE_EN[type] || type);`;
const helperAddition = `  const displayAttackType = (type: string) => isSpanish ? type : (DAMAGE_TYPE_EN[type] || type);
  const SUBCLASS_GROUP_EN: Record<string, string> = {
    'Senda Primitiva': 'Primal Path',
    'Colegio de Bardo': 'Bard College',
    'Dominio Divino': 'Divine Domain',
    'Círculo Druídico': 'Druid Circle',
    'Arquetipo Marcial': 'Martial Archetype',
    'Tradición Monástica': 'Monastic Tradition',
    'Juramento Sagrado': 'Sacred Oath',
    'Arquetipo de Explorador': 'Ranger Archetype',
    'Arquetipo Picaresco': 'Roguish Archetype',
    'Origen Hechicero': 'Sorcerous Origin',
    'Patrón Sobrenatural': 'Otherworldly Patron',
    'Tradición Arcana': 'Arcane Tradition',
    'Especializaciones de Artífice': 'Artificer Specialist',
    'Estilo de Boxeo (Boxing Style)': 'Boxing Style',
  };
  const getSubclassesGroupName = (cls?: { subclassesName?: string } | null) => {
    if (!cls?.subclassesName) return isSpanish ? 'Subclase' : 'Subclass';
    return isSpanish ? cls.subclassesName : (SUBCLASS_GROUP_EN[cls.subclassesName] || cls.subclassesName);
  };
  const getClassDisplayName = (cls?: { name: string; nameEn?: string } | null) => {
    if (!cls) return '';
    return isSpanish ? cls.name : (cls.nameEn || cls.name);
  };
  const getRaceDisplayName = (r?: { name: string; nameEn?: string } | null) => {
    if (!r) return '';
    return isSpanish ? r.name : (r.nameEn || r.name);
  };
  const getBgDisplayName = (b?: { name: string; nameEn?: string } | null) => {
    if (!b) return '';
    return isSpanish ? b.name : (b.nameEn || b.name);
  };`;

if (!content.includes('getSubclassesGroupName')) {
  content = content.replace(helperAnchor, helperAddition);
}

const replacements = [
  // Step 2: Subraces & Racial Traits
  [
    `Subraza / Linaje de {activeRace.name}`,
    `{isSpanish ? \`Subraza / Linaje de \${activeRace.name}\` : \`Subrace / Lineage of \${getRaceDisplayName(activeRace)}\`}`
  ],
  [
    `{activeSubrace ? activeSubrace.name : '(Opcional / Elige tu linaje)'}`,
    `{activeSubrace ? (isSpanish ? activeSubrace.name : (activeSubrace.nameEn || activeSubrace.name)) : (isSpanish ? '(Opcional / Elige tu linaje)' : '(Optional / Choose your lineage)')}`
  ],
  [
    `<Star className="w-4 h-4 text-[#8c672b]" /> Puntos de Característica a tu Elección ({activeRace.name})`,
    `<Star className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Puntos de Característica a tu Elección (\${activeRace.name})\` : \`Ability Score Increase of Choice (\${getRaceDisplayName(activeRace)})\`}`
  ],
  [
    `Tu linaje otorga <strong>+{raceAnyCount} puntos adicionales</strong> a repartir entre diferentes características.`,
    `{isSpanish ? <>Tu linaje otorga <strong>+{raceAnyCount} puntos adicionales</strong> a repartir entre diferentes características.</> : <>Your lineage grants <strong>+{raceAnyCount} bonus points</strong> to distribute among different ability scores.</>}`
  ],
  [
    `{Math.min(raceAnyCount, flexibleRacialChoices.length)} / {raceAnyCount} seleccionados`,
    `{Math.min(raceAnyCount, flexibleRacialChoices.length)} / {raceAnyCount} {isSpanish ? 'seleccionados' : 'selected'}`
  ],
  [
    `<span className="mt-0.5">{ABILITY_SCORE_EXPLANATIONS[st].name}</span>\n                              <span className="text-[9px] font-mono opacity-80">{isChosen ? '+1 Activo' : '+1'}</span>`,
    `<span className="mt-0.5">{getAbilityName(st)}</span>\n                              <span className="text-[9px] font-mono opacity-80">{isChosen ? (isSpanish ? '+1 Activo' : '+1 Active') : '+1'}</span>`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Competencias de Habilidad Adicionales ({activeRace.name})`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Competencias de Habilidad Adicionales (\${activeRace.name})\` : \`Bonus Skill Proficiencies (\${getRaceDisplayName(activeRace)})\`}`
  ],
  [
    `Tu raza te otorga competencia en habilidades a tu elección.`,
    `{isSpanish ? 'Tu raza te otorga competencia en habilidades a tu elección.' : 'Your race grants proficiency in skills of your choice.'}`
  ],
  [
    `{bonusRacialSkills.length} seleccionadas`,
    `{bonusRacialSkills.length} {isSpanish ? 'seleccionadas' : 'selected'}`
  ],
  [
    `<span className="truncate">{sk.name}</span>\n                              {isSelectedBonus && <Check className="w-3.5 h-3.5 text-white shrink-0" />}`,
    `<span className="truncate">{displaySkillName(sk.name)}</span>\n                              {isSelectedBonus && <Check className="w-3.5 h-3.5 text-white shrink-0" />}`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Rasgos Raciales de {activeRace.name} {activeSubrace ? \`(\${activeSubrace.name})\` : ''}`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Rasgos Raciales de \${activeRace.name}\` : \`Racial Traits of \${getRaceDisplayName(activeRace)}\`} {activeSubrace ? \`(\${isSpanish ? activeSubrace.name : (activeSubrace.nameEn || activeSubrace.name)})\` : ''}`
  ],
  [
    `{st.name} (Subraza)`,
    `{st.name} ({isSpanish ? 'Subraza' : 'Subrace'})`
  ],
  [
    `<Sparkles className="w-4 h-4 text-[#8c672b]" /> Magia Innata Ancestral & Dones Arcanos`,
    `<Sparkles className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Magia Innata Ancestral & Dones Arcanos' : 'Ancestral Innate Magic & Arcane Gifts'}`
  ],
  [
    `Tu linaje ({activeSubrace?.name || activeRace.name}) te otorga conjuros y trucos innatos (conforme a las reglas oficiales 5e). Estos conjuros no consumen ranuras de clase ni cuentan contra tu límite de conjuros preparados/conocidos.`,
    `{isSpanish ? \`Tu linaje (\${activeSubrace?.name || activeRace.name}) te otorga conjuros y trucos innatos (conforme a las reglas oficiales 5e). Estos conjuros no consumen ranuras de clase ni cuentan contra tu límite de conjuros preparados/conocidos.\` : \`Your lineage (\${getRaceDisplayName(activeRace)}) grants innate cantrips and spells under official rules. These spells do not consume class spell slots or count against your prepared/known limit.\`}`
  ],
  [
    `Reglas Oficiales 5e`,
    `{isSpanish ? 'Reglas Oficiales 5e' : 'Official 5e Rules'}`
  ],
  [
    `<span>🧠</span> Característica de Conjuración Racial:`,
    `<span>🧠</span> {isSpanish ? 'Característica de Conjuración Racial:' : 'Racial Spellcasting Ability:'}`
  ],
  [
    `CD de Salvación: 8 + PB ({profBonus}) + Mod`,
    `{isSpanish ? 'CD de Salvación:' : 'Save DC:'} 8 + PB ({profBonus}) + Mod`
  ],
  [
    `Elige qué aptitud mental gobierna tus conjuros de linaje ({racialSpellcastingInfo.config.abilityChoices.map((c) => c.toUpperCase()).join(' / ')}):`,
    `{isSpanish ? \`Elige qué aptitud mental gobierna tus conjuros de linaje (\${racialSpellcastingInfo.config.abilityChoices.map((c) => c.toUpperCase()).join(' / ')}):\` : \`Choose which mental ability governs your lineage spells (\${racialSpellcastingInfo.config.abilityChoices.map((c) => c.toUpperCase()).join(' / ')}):\`}`
  ],
  [
    `const names = { int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };`,
    `const names = isSpanish ? { int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' } : { int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma' };`
  ],
  [
    `Mod: {modStr} • CD {dc}`,
    `Mod: {modStr} • {isSpanish ? 'CD' : 'DC'} {dc}`
  ],
  [
    `<span>📖 Truco Racial a Elegir (Lista de {racialSpellcastingInfo.config.cantripChoiceClass || 'Mago'}):</span>\n                                <span className="text-[10px] text-amber-800 font-mono font-bold">1 Truco adicional</span>`,
    `<span>📖 {isSpanish ? \`Truco Racial a Elegir (Lista de \${racialSpellcastingInfo.config.cantripChoiceClass || 'Mago'}):\` : 'Racial Cantrip Choice (Wizard List):'}</span>\n                                <span className="text-[10px] text-amber-800 font-mono font-bold">{isSpanish ? '1 Truco adicional' : '1 Bonus Cantrip'}</span>`
  ],
  [
    `Conoces un truco de tu elección de la lista de conjuros de Mago:`,
    `{isSpanish ? 'Conoces un truco de tu elección de la lista de conjuros de Mago:' : 'You know one cantrip of your choice from the Wizard spell list:'}`
  ],
  [
    `<option value="">-- Selecciona un Truco de Mago --</option>`,
    `<option value="">{isSpanish ? '-- Selecciona un Truco de Mago --' : '-- Select a Wizard Cantrip --'}</option>`
  ],
  [
    `Conjuros Innatos de tu Linaje ({characterLevel >= 1 ? \`Nivel de personaje actual: \${characterLevel}\` : 'Nivel 1'}):`,
    `{isSpanish ? \`Conjuros Innatos de tu Linaje (Nivel actual: \${characterLevel}):\` : \`Innate Lineage Spells (Current Level: \${characterLevel}):\`}`
  ],
  [
    `{isUnlocked ? '✓ Desbloqueado' : \`Bloqueado (Nv \${entry.requiredLevel})\`}`,
    `{isUnlocked ? (isSpanish ? '✓ Desbloqueado' : '✓ Unlocked') : (isSpanish ? \`Bloqueado (Nv \${entry.requiredLevel})\` : \`Locked (Lv \${entry.requiredLevel})\`)}`
  ],
  [
    `{entry.traitName ? \`Rasgo: \${entry.traitName}\` : \`Desbloquea a Nivel \${entry.requiredLevel}\`}`,
    `{entry.traitName ? \`\${isSpanish ? 'Rasgo' : 'Trait'}: \${entry.traitName}\` : (isSpanish ? \`Desbloquea a Nivel \${entry.requiredLevel}\` : \`Unlocks at Level \${entry.requiredLevel}\`)}`
  ],
  [
    `✓ Elegido`,
    `{isSpanish ? '✓ Elegido' : '✓ Chosen'}`
  ],
  [
    `Truco de Mago (Linaje Élfico)`,
    `{isSpanish ? 'Truco de Mago (Linaje Élfico)' : 'Wizard Cantrip (Elven Lineage)'}`
  ],

  // Step 6: ASI & Feats
  [
    `{isVarHumanSlot\n                                    ? 'Elige la dote oficial adicional otorgada por tu linaje humano variante.'\n                                    : 'Elige entre aumentar tus puntuaciones (+2 o +1/+1) O seleccionar una dote oficial con beneficios tácticos.'}`,
    `{isVarHumanSlot\n                                    ? (isSpanish ? 'Elige la dote oficial adicional otorgada por tu linaje humano variante.' : 'Choose the bonus official feat granted by your Variant Human lineage.')\n                                    : (isSpanish ? 'Elige entre aumentar tus puntuaciones (+2 o +1/+1) O seleccionar una dote oficial con beneficios tácticos.' : 'Choose between increasing your ability scores (+2 or +1/+1) OR selecting an official feat with tactical benefits.')}`
  ],
  [
    `Mejora de Stats (+2 / +1+1)`,
    `{isSpanish ? 'Mejora de Stats (+2 / +1+1)' : 'Stat Increase (+2 / +1+1)'}`
  ],
  [
    `Elegir Dote (Feat)`,
    `{isSpanish ? 'Elegir Dote (Feat)' : 'Choose a Feat'}`
  ],
  [
    `<label className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">Modo de Distribución:</label>`,
    `<label className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">{isSpanish ? 'Modo de Distribución:' : 'Distribution Mode:'}</label>`
  ],
  [
    `+2 a una Característica`,
    `{isSpanish ? '+2 a una Característica' : '+2 to One Ability'}`
  ],
  [
    `+1 a dos Características distintas`,
    `{isSpanish ? '+1 a dos Características distintas' : '+1 to Two Different Abilities'}`
  ],
  [
    `Selecciona la característica que recibirá +2:`,
    `{isSpanish ? 'Selecciona la característica que recibirá +2:' : 'Select the ability score that receives +2:'}`
  ],
  [
    `<span className="mt-1">{ABILITY_SCORE_EXPLANATIONS[st].name}</span>`,
    `<span className="mt-1">{getAbilityName(st)}</span>`
  ],
  [
    `Primera Característica (+1):`,
    `{isSpanish ? 'Primera Característica (+1):' : 'First Ability (+1):'}`
  ],
  [
    `Segunda Característica (+1):`,
    `{isSpanish ? 'Segunda Característica (+1):' : 'Second Ability (+1):'}`
  ],
  [
    `<option value="" disabled>-- Elige característica (+1) --</option>`,
    `<option value="" disabled>{isSpanish ? '-- Elige característica (+1) --' : '-- Choose ability (+1) --'}</option>`
  ],
  [
    `{ABILITY_SCORE_EXPLANATIONS[st].name} ({ABILITY_SCORE_EXPLANATIONS[st].abbreviation})`,
    `{getAbilityName(st)} ({getAbilityAbbr(st)})`
  ],
  [
    `placeholder="Buscar dote (ej: Alerta, Tirador)..."`,
    `placeholder={isSpanish ? "Buscar dote (ej: Alerta, Tirador)..." : "Search feat (e.g., Alert, Sharpshooter)..."}`
  ],
  [
    `<span className="hidden sm:inline">Ampliar</span>`,
    `<span className="hidden sm:inline">{isSpanish ? 'Ampliar' : 'Expand'}</span>`
  ],

  // Step 4: Class & Subclass
  [
    `<span className="font-fantasy font-bold text-base text-[#4a361c] px-2 font-mono">\n                          Nivel {characterLevel}\n                        </span>`,
    `<span className="font-fantasy font-bold text-base text-[#4a361c] px-2 font-mono">\n                          {isSpanish ? 'Nivel' : 'Level'} {characterLevel}\n                        </span>`
  ],
  [
    `<Sword className="w-4 h-4 text-[#8c672b]" /> Subclase / Especialización ({activeClass.subclassesName})`,
    `<Sword className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Subclase / Especialización (\${activeClass.subclassesName})\` : \`Subclass / Specialization (\${getSubclassesGroupName(activeClass)})\`}`
  ],
  [
    `? \`(Opcional / \${activeClass.subclasses.length} sendas disponibles)\`\n                                : \`Disponible a Nivel \${subclassUnlockLevel}\``,
    `? (isSpanish ? \`(Opcional / \${activeClass.subclasses.length} sendas disponibles)\` : \`(Optional / \${activeClass.subclasses.length} subclasses available)\`)\n                                : (isSpanish ? \`Disponible a Nivel \${subclassUnlockLevel}\` : \`Unlocks at Level \${subclassUnlockLevel}\`)`
  ],
  [
    `{activeClass.subclassesName} consagrada de {activeClass.name}`,
    `{isSpanish ? \`\${activeClass.subclassesName} consagrada de \${activeClass.name}\` : \`\${getSubclassesGroupName(activeClass)} of \${getClassDisplayName(activeClass)}\`}`
  ],
  [
    `<Check className="w-3 h-3" /> Activa`,
    `<Check className="w-3 h-3" /> {isSpanish ? 'Activa' : 'Active'}`
  ],
  [
    `Rasgos desbloqueados para Nivel {characterLevel}:`,
    `{isSpanish ? \`Rasgos desbloqueados para Nivel \${characterLevel}:\` : \`Unlocked features for Level \${characterLevel}:\`}`
  ],
  [
    `Nv.{f.level}: {f.name}`,
    `{isSpanish ? 'Nv.' : 'Lv.'}{f.level}: {f.name}`
  ],
  [
    `Los rasgos de esta senda se activarán al subir a Nivel {subclassUnlockLevel}.`,
    `{isSpanish ? \`Los rasgos de esta senda se activarán al subir a Nivel \${subclassUnlockLevel}.\` : \`Features of this subclass unlock at Level \${subclassUnlockLevel}.\`}`
  ],
  [
    `<Sword className="w-3.5 h-3.5" /> Cambiar Subclase ({activeClass.subclasses.length} opciones)`,
    `<Sword className="w-3.5 h-3.5" /> {isSpanish ? \`Cambiar Subclase (\${activeClass.subclasses.length} opciones)\` : \`Change Subclass (\${activeClass.subclasses.length} options)\`}`
  ],
  [
    `<Eye className="w-3.5 h-3.5 text-[#8c672b]" /> Inspeccionar Rasgos (1-20)`,
    `<Eye className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Inspeccionar Rasgos (1-20)' : 'Inspect Features (1-20)'}`
  ],
  [
    `Quitar Selección`,
    `{isSpanish ? 'Quitar Selección' : 'Clear Selection'}`
  ],
  [
    `Especialización pendiente ({activeClass.subclassesName})`,
    `{isSpanish ? \`Especialización pendiente (\${activeClass.subclassesName})\` : \`Specialization Pending (\${getSubclassesGroupName(activeClass)})\`}`
  ],
  [
    `Tu personaje ha alcanzado el Nivel {characterLevel}. Hay <strong>{activeClass.subclasses.length} sendas oficiales</strong> disponibles para {activeClass.name} en el compendio.`,
    `{isSpanish ? <>Tu personaje ha alcanzado el Nivel {characterLevel}. Hay <strong>{activeClass.subclasses.length} sendas oficiales</strong> disponibles para {activeClass.name} en el compendio.</> : <>Your character has reached Level {characterLevel}. There are <strong>{activeClass.subclasses.length} official subclasses</strong> available for {getClassDisplayName(activeClass)}.</>}`
  ],
  [
    `<Sword className="w-4 h-4" /> Elegir Subclase ({activeClass.subclasses.length} opciones)`,
    `<Sword className="w-4 h-4" /> {isSpanish ? \`Elegir Subclase (\${activeClass.subclasses.length} opciones)\` : \`Choose Subclass (\${activeClass.subclasses.length} options)\`}`
  ],
  [
    `Las especializaciones ({activeClass.subclassesName}) se eligen a Nivel {subclassUnlockLevel}`,
    `{isSpanish ? \`Las especializaciones (\${activeClass.subclassesName}) se eligen a Nivel \${subclassUnlockLevel}\` : \`Specializations (\${getSubclassesGroupName(activeClass)}) are chosen at Level \${subclassUnlockLevel}\`}`
  ],
  [
    `Tu personaje actualmente es Nivel {characterLevel}. Puedes explorar previamente las {activeClass.subclasses.length} sendas disponibles para planificar su progresión.`,
    `{isSpanish ? \`Tu personaje actualmente es Nivel \${characterLevel}. Puedes explorar previamente las \${activeClass.subclasses.length} sendas disponibles para planificar su progresión.\` : \`Your character is currently Level \${characterLevel}. You can preview all \${activeClass.subclasses.length} available subclasses to plan your progression.\`}`
  ],
  [
    `<Eye className="w-3.5 h-3.5 text-[#8c672b]" /> Explorar ({activeClass.subclasses.length} Subclases)`,
    `<Eye className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? \`Explorar (\${activeClass.subclasses.length} Subclases)\` : \`Browse (\${activeClass.subclasses.length} Subclasses)\`}`
  ],
  [
    `{dec.title} (Elige {dec.countNeeded})`,
    `{dec.title} ({isSpanish ? 'Elige' : 'Choose'} {dec.countNeeded})`
  ],
  [
    `{selectedList.length} / {dec.countNeeded} elegidas`,
    `{selectedList.length} / {dec.countNeeded} {isSpanish ? 'elegidas' : 'selected'}`
  ],
  [
    `placeholder={\`Buscar en \${dec.title}...\`}`,
    `placeholder={isSpanish ? \`Buscar en \${dec.title}...\` : \`Search in \${dec.title}...\`}`
  ],
  [
    `<BookOpen className="w-4 h-4 text-[#8c672b]" /> Progresión Nivel a Nivel de {activeClass.name}`,
    `<BookOpen className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Progresión Nivel a Nivel de \${activeClass.name}\` : \`Level-by-Level Progression (\${getClassDisplayName(activeClass)})\`}`
  ],
  [
    `Hasta Nivel {characterLevel}`,
    `{isSpanish ? \`Hasta Nivel \${characterLevel}\` : \`Up to Level \${characterLevel}\`}`
  ],
  [
    `Ver Todos (1-20)`,
    `{isSpanish ? 'Ver Todos (1-20)' : 'View All (1-20)'}`
  ],
  [
    `Habilidades de Clase: Elige {classConfig.count} ({selectedClassSkills.length}/{classConfig.count} seleccionadas)`,
    `{isSpanish ? \`Habilidades de Clase: Elige \${classConfig.count} (\${selectedClassSkills.length}/\${classConfig.count} seleccionadas)\` : \`Class Skills: Choose \${classConfig.count} (\${selectedClassSkills.length}/\${classConfig.count} selected)\`}`
  ],
  [
    `<span className="font-fantasy font-bold text-xs block text-[#4a361c]">{sk}</span>\n                                        <span className="text-[9px] text-[#7a6448]">\n                                          {isFromBg ? 'Otorgado por Trasfondo' : isFromRace || isFromBonusRace ? 'Otorgado por Raza' : 'Disponible'}`,
    `<span className="font-fantasy font-bold text-xs block text-[#4a361c]">{displaySkillName(sk)}</span>\n                                        <span className="text-[9px] text-[#7a6448]">\n                                          {isFromBg ? (isSpanish ? 'Otorgado por Trasfondo' : 'Granted by Background') : isFromRace || isFromBonusRace ? (isSpanish ? 'Otorgado por Raza' : 'Granted by Race') : (isSpanish ? 'Disponible' : 'Available')}`
  ],
  [
    `Selecciona una clase para habilitar la selección de habilidades de clase.`,
    `{isSpanish ? 'Selecciona una clase para habilitar la selección de habilidades de clase.' : 'Select a class to enable class skill selection.'}`
  ],
  [
    `{expertiseConfig.desc} Tu bonificador de competencia se <strong>duplica (+{profBonus * 2} en lugar de +{profBonus})</strong> en las pruebas que hagas con estas habilidades.`,
    `{isSpanish ? <>{expertiseConfig.desc} Tu bonificador de competencia se <strong>duplica (+{profBonus * 2} en lugar de +{profBonus})</strong> en las pruebas que hagas con estas habilidades.</> : <>Choose your Expertise skills. Your proficiency bonus is <strong>doubled (+{profBonus * 2} instead of +{profBonus})</strong> for any ability check you make that uses any of the chosen proficiencies.</>}`
  ],
  [
    `{validExpertiseSkills.length} / {expertiseConfig.allowedCount} con Pericia`,
    `{validExpertiseSkills.length} / {expertiseConfig.allowedCount} {isSpanish ? 'con Pericia' : 'with Expertise'}`
  ],
  [
    `<span className="truncate">{sk}</span>\n                                    <span className="text-[10px] font-mono px-1 rounded bg-black/10">\n                                      {isExpert ? \`⭐ +\${profBonus * 2}\` : \`+\${profBonus}\`}`,
    `<span className="truncate">{displaySkillName(sk)}</span>\n                                    <span className="text-[10px] font-mono px-1 rounded bg-black/10">\n                                      {isExpert ? \`⭐ +\${profBonus * 2}\` : \`+\${profBonus}\`}`
  ],
  [
    `<Sword className="w-4 h-4 text-[#8c672b]" /> Estilo de Combate (Fighting Style)`,
    `<Sword className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Estilo de Combate (Fighting Style)' : 'Fighting Style'}`
  ],
  [
    `Especialización marcial y táctica de tu {activeClass.name} a nivel {characterLevel}.`,
    `{isSpanish ? \`Especialización marcial y táctica de tu \${activeClass.name} a nivel \${characterLevel}.\` : \`Martial and tactical specialization for your Level \${characterLevel} \${getClassDisplayName(activeClass)}.\`}`
  ],
  [
    `: 'Sin seleccionar'\n                              }`,
    `: (isSpanish ? 'Sin seleccionar' : 'None selected')\n                              }`
  ],

  // Step 3 (5e Background)
  [
    `Filtrar por Enfoque / Rol:`,
    `{isSpanish ? 'Filtrar por Enfoque / Rol:' : 'Filter by Role / Focus:'}`
  ],
  [
    `Compendio Oficial ({WIKIDOT_BACKGROUNDS.length} Trasfondos)`,
    `{isSpanish ? \`Compendio Oficial (\${WIKIDOT_BACKGROUNDS.length} Trasfondos)\` : \`Official Compendium (\${WIKIDOT_BACKGROUNDS.length} Backgrounds)\`}`
  ],
  [
    `Expandir Todo`,
    `{isSpanish ? 'Expandir Todo' : 'Expand All'}`
  ],
  [
    `Colapsar Todo`,
    `{isSpanish ? 'Colapsar Todo' : 'Collapse All'}`
  ],
  [
    `placeholder="Buscar trasfondo (ej: Soldado, Pirata, Noble)..."`,
    `placeholder={isSpanish ? "Buscar trasfondo (ej: Soldado, Pirata, Noble)..." : "Search background (e.g., Soldier, Pirate, Noble)..."}`
  ],
  [
    `No se encontraron trasfondos que coincidan con los filtros aplicados.`,
    `{isSpanish ? 'No se encontraron trasfondos que coincidan con los filtros aplicados.' : 'No backgrounds found matching the current filters.'}`
  ],
  [
    `<span>{isCollapsed ? 'Desplegar' : 'Colapsar'}</span>`,
    `<span>{isCollapsed ? (isSpanish ? 'Desplegar' : 'Expand') : (isSpanish ? 'Colapsar' : 'Collapse')}</span>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] font-fantasy uppercase block leading-none">Oro Inicial</span>`,
    `<span className="text-[10px] text-[#7a6448] font-fantasy uppercase block leading-none">{isSpanish ? 'Oro Inicial' : 'Starting Gold'}</span>`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Elección de Habilidades (Elige {activeBackground.skillChoices.count})`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Elección de Habilidades (Elige \${activeBackground.skillChoices.count})\` : \`Skill Choices (Choose \${activeBackground.skillChoices.count})\`}`
  ],
  [
    `{selectedBackgroundSkills.length} de {activeBackground.skillChoices.count} elegidas`,
    `{selectedBackgroundSkills.length} {isSpanish ? 'de' : 'of'} {activeBackground.skillChoices.count} {isSpanish ? 'elegidas' : 'selected'}`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Habilidades de Trasfondo:`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Habilidades de Trasfondo:' : 'Background Skills:'}`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Competencias en Herramientas (Fijas):`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Competencias en Herramientas (Fijas):' : 'Tool Proficiencies (Fixed):'}`
  ],
  [
    `(Otorga bonificador de competencia al usar estas herramientas en pruebas y tiradas)`,
    `{isSpanish ? '(Otorga bonificador de competencia al usar estas herramientas en pruebas y tiradas)' : '(Grants proficiency bonus when making ability checks with these tools)'}`
  ],
  [
    `<Star className="w-4 h-4 text-[#8c672b]" /> Rasgo Especial: {activeBackground.featureName}`,
    `<Star className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Rasgo Especial:' : 'Background Feature:'} {activeBackground.featureName}`
  ],
  [
    `<strong>Equipo Oficial:</strong> {activeBackground.suggestedEquipment}`,
    `<strong>{isSpanish ? 'Equipo Oficial:' : 'Official Equipment:'}</strong> {activeBackground.suggestedEquipment}`
  ],
  [
    `<Languages className="w-4 h-4 text-[#8c672b]" /> Idiomas de Trasfondo ({activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 0} en total)`,
    `<Languages className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Idiomas de Trasfondo (\${activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 0} en total)\` : \`Background Languages (\${activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 0} total)\`}`
  ],
  [
    `Tu historia y raíces te han enseñado a comunicarte en lenguas adicionales a las de tu linaje racial.`,
    `{isSpanish ? 'Tu historia y raíces te han enseñado a comunicarte en lenguas adicionales a las de tu linaje racial.' : 'Your history and roots have taught you additional languages beyond those of your racial lineage.'}`
  ],
  [
    `{selectedBackgroundLanguages.length} de {activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 1} seleccionados`,
    `{selectedBackgroundLanguages.length} {isSpanish ? 'de' : 'of'} {activeBackground.languagesCount || activeBackground.fixedLanguages?.length || 1} {isSpanish ? 'seleccionados' : 'selected'}`
  ],
  [
    `Idiomas conocidos por tu linaje racial ({activeRace?.name || 'Sin Raza'}):{' '}`,
    `{isSpanish ? \`Idiomas conocidos por tu linaje racial (\${activeRace?.name || 'Sin Raza'}): \` : \`Languages known from your racial lineage (\${getRaceDisplayName(activeRace) || 'No Race'}): \`}`
  ],
  [
    `✨ Ya dominados de nacimiento por tu raza. No consumen ninguna de las ranuras de tu trasfondo.`,
    `{isSpanish ? '✨ Ya dominados de nacimiento por tu raza. No consumen ninguna de las ranuras de tu trasfondo.' : '✨ Already known from your racial lineage. They do not consume background language slots.'}`
  ],
  [
    `Elige {Math.max(0, (activeBackground.languagesCount || 0) - (activeBackground.fixedLanguages?.length || 0))} idioma(s) adicional(es) a tu elección:`,
    `{isSpanish ? \`Elige \${Math.max(0, (activeBackground.languagesCount || 0) - (activeBackground.fixedLanguages?.length || 0))} idioma(s) adicional(es) a tu elección:\` : \`Choose \${Math.max(0, (activeBackground.languagesCount || 0) - (activeBackground.fixedLanguages?.length || 0))} additional language(s) of your choice:\`}`
  ],
  [
    `<span className="font-bold">{lang.name}</span>`,
    `<span className="font-bold">{isSpanish ? lang.name : (lang.nameEn || lang.name)}</span>`
  ],
  [
    `¿Tu ambientación o DM utiliza otro dialecto o idioma exótico? Escríbelo aquí:`,
    `{isSpanish ? '¿Tu ambientación o DM utiliza otro dialecto o idioma exótico? Escríbelo aquí:' : 'Does your setting or DM use another dialect or exotic language? Enter it here:'}`
  ],
  [
    `<Plus className="w-3.5 h-3.5" /> Añadir\n                              </button>`,
    `<Plus className="w-3.5 h-3.5" /> {isSpanish ? 'Añadir' : 'Add'}\n                              </button>`
  ],
  [
    `Personalidad, Convicciones & Rasgos de Rol`,
    `{isSpanish ? 'Personalidad, Convicciones & Rasgos de Rol' : 'Personality, Convictions & Roleplay Traits'}`
  ],
  [
    `Tablas de rol canónicas basadas en tu trasfondo ({activeBackground.name}). Tira dados para inspirarte o selecciona directamente en las listas.`,
    `{isSpanish ? \`Tablas de rol canónicas basadas en tu trasfondo (\${activeBackground.name}). Tira dados para inspirarte o selecciona directamente en las listas.\` : \`Canonical roleplay tables based on your background (\${getBgDisplayName(activeBackground)}). Roll dice for inspiration or select directly from the lists.\`}`
  ],
  [
    `🎲🎲 Tirar Todo con Dados`,
    `🎲🎲 {isSpanish ? 'Tirar Todo con Dados' : 'Roll All with Dice'}`
  ],
  [
    `<span>🎭</span> Rasgos de Personalidad & Virtudes`,
    `<span>🎭</span> {isSpanish ? 'Rasgos de Personalidad & Virtudes' : 'Personality Traits & Virtues'}`
  ],
  [
    `Elige 1 o 2 rasgos oficiales de la tabla o escribe abajo tus propias costumbres:`,
    `{isSpanish ? 'Elige 1 o 2 rasgos oficiales de la tabla o escribe abajo tus propias costumbres:' : 'Choose 1 or 2 official traits from the table or write your own below:'}`
  ],
  [
    `placeholder="Escribe o edita aquí los rasgos de personalidad..."`,
    `placeholder={isSpanish ? "Escribe o edita aquí los rasgos de personalidad..." : "Write or edit personality traits here..."}`
  ],
  [
    `<span>⚖️</span> Ideales & Convicciones Morales`,
    `<span>⚖️</span> {isSpanish ? 'Ideales & Convicciones Morales' : 'Ideals & Moral Convictions'}`
  ],
  [
    `¿Qué principio o deber moral guía tus decisiones más difíciles?`,
    `{isSpanish ? '¿Qué principio o deber moral guía tus decisiones más difíciles?' : 'What moral principle or duty guides your toughest decisions?'}`
  ],
  [
    `placeholder="Escribe o edita aquí el ideal..."`,
    `placeholder={isSpanish ? "Escribe o edita aquí el ideal..." : "Write or edit your ideal here..."}`
  ],
  [
    `<span>🔗</span> Vínculos & Lazos de Vida`,
    `<span>🔗</span> {isSpanish ? 'Vínculos & Lazos de Vida' : 'Bonds & Life Ties'}`
  ],
  [
    `¿Por quién o qué darías la vida? ¿A quién le debes tu lealtad?`,
    `{isSpanish ? '¿Por quién o qué darías la vida? ¿A quién le debes tu lealtad?' : 'Who or what would you give your life for? To whom do you owe your loyalty?'}`
  ],
  [
    `placeholder="Escribe o edita aquí el vínculo afectivo..."`,
    `placeholder={isSpanish ? "Escribe o edita aquí el vínculo afectivo..." : "Write or edit your bond here..."}`
  ],
  [
    `<span>⚠️</span> Defectos, Debilidades & Tentaciones`,
    `<span>⚠️</span> {isSpanish ? 'Defectos, Debilidades & Tentaciones' : 'Flaws, Weaknesses & Temptations'}`
  ],
  [
    `¿Qué vicio, miedo o tentación te hace cometer errores imprudentes?`,
    `{isSpanish ? '¿Qué vicio, miedo o tentación te hace cometer errores imprudentes?' : 'What vice, fear, or temptation makes you commit reckless mistakes?'}`
  ],
  [
    `placeholder="Escribe o edita aquí el defecto o debilidad..."`,
    `placeholder={isSpanish ? "Escribe o edita aquí el defecto o debilidad..." : "Write or edit your flaw or weakness here..."}`
  ],
  [
    `<span>📜</span> Historia, Pasado & Motivaciones del Héroe (Backstory)`,
    `<span>📜</span> {isSpanish ? 'Historia, Pasado & Motivaciones del Héroe (Backstory)' : 'Hero Backstory, Past & Motivations'}`
  ],
  [
    `¿De dónde vienes? ¿Quién fue tu familia o mentor? ¿Por qué decidiste salir de tu hogar y recorrer los Reinos Olvidados?`,
    `{isSpanish ? '¿De dónde vienes? ¿Quién fue tu familia o mentor? ¿Por qué decidiste salir de tu hogar y recorrer los Reinos Olvidados?' : 'Where do you come from? Who was your family or mentor? Why did you leave home to adventure across the realms?'}`
  ],
  [
    `placeholder="Escribe libremente el origen de tu personaje o notas clave para tu Dungeon Master..."`,
    `placeholder={isSpanish ? "Escribe libremente el origen de tu personaje o notas clave para tu Dungeon Master..." : "Freely write your character's origin or key notes for your Dungeon Master..."}`
  ],
  [
    `Selecciona un trasfondo arriba para ver su rasgo especial y equipo sugerido.`,
    `{isSpanish ? 'Selecciona un trasfondo arriba para ver su rasgo especial y equipo sugerido.' : 'Select a background above to view its special feature and starting equipment.'}`
  ],

  // Step 8: Equipment
  [
    `Basado en las opciones oficiales del Manual del Jugador y Reglas 5e para {activeClass?.name || 'tu clase'}, puedes elegir tus armas primarias, armadura y paquetes de aventurero. Además, se incluye el equipo de tu trasfondo y tus monedas iniciales.`,
    `{isSpanish ? \`Basado en las opciones oficiales del Manual del Jugador y Reglas 5e para \${activeClass?.name || 'tu clase'}, puedes elegir tus armas primarias, armadura y paquetes de aventurero. Además, se incluye el equipo de tu trasfondo y tus monedas iniciales.\` : \`Based on official Player's Handbook options for \${getClassDisplayName(activeClass) || 'your class'}, choose your primary weapons, armor, and adventurer's pack, plus your background equipment and starting gold.\`}`
  ],
  [
    `Elige una opción`,
    `{isSpanish ? 'Elige una opción' : 'Choose one option'}`
  ],
  [
    `🛡️ CA Base: {option.armorAcBase}`,
    `🛡️ {isSpanish ? 'CA Base:' : 'Base AC:'} {option.armorAcBase}`
  ],
  [
    `🛡️ Escudo: +{option.shieldBonus} CA`,
    `🛡️ {isSpanish ? \`Escudo: +\${option.shieldBonus} CA\` : \`Shield: +\${option.shieldBonus} AC\`}`
  ],
  [
    `<span>Arma elegida: <strong className="text-[#8c672b]">{customWeaponChoices[group.id].name}</strong></span>`,
    `<span>{isSpanish ? 'Arma elegida:' : 'Chosen weapon:'} <strong className="text-[#8c672b]">{customWeaponChoices[group.id].name}</strong></span>`
  ],
  [
    `<Sword className="w-3 h-3" /> Cambiar Arma...`,
    `<Sword className="w-3 h-3" /> {isSpanish ? 'Cambiar Arma...' : 'Change Weapon...'}`
  ],
  [
    `⚔️ Elegir Arma de Menú Compendio Oficial...`,
    `{isSpanish ? '⚔️ Elegir Arma de Menú Compendio Oficial...' : '⚔️ Choose Weapon from Official Compendium...'}`
  ],
  [
    `<Coins className="w-4 h-4 text-[#8c672b]" /> Riqueza y Equipo Fijo de {startingEquipmentConfig.className}`,
    `<Coins className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Riqueza y Equipo Fijo de \${startingEquipmentConfig.className}\` : \`Fixed Equipment & Wealth (\${getClassDisplayName(activeClass) || startingEquipmentConfig.className})\`}`
  ],
  [
    `💰 Oro Inicial: {startingGoldTotal} po`,
    `💰 {isSpanish ? \`Oro Inicial: \${startingGoldTotal} po\` : \`Starting Gold: \${startingGoldTotal} gp\`}`
  ],
  [
    `<Backpack className="w-4 h-4 text-[#8c672b]" /> Equipo Otorgado por el Trasfondo ({activeBackground.name})`,
    `<Backpack className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Equipo Otorgado por el Trasfondo (\${activeBackground.name})\` : \`Equipment Granted by Background (\${getBgDisplayName(activeBackground)})\`}`
  ],
  [
    `<Shield className="w-4 h-4 text-[#8c672b]" /> Armas, Armaduras y Equipo Activo (Equipar / Desequipar en Vivo)`,
    `<Shield className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Armas, Armaduras y Equipo Activo (Equipar / Desequipar en Vivo)' : 'Weapons, Armor & Active Gear (Live Equip / Unequip)'}`
  ],
  [
    `Haz clic en cada objeto para equiparlo o desequiparlo. La CA y los ataques de la ficha se actualizan automáticamente en tiempo real.`,
    `{isSpanish ? 'Haz clic en cada objeto para equiparlo o desequiparlo. La CA y los ataques de la ficha se actualizan automáticamente en tiempo real.' : 'Click each item to equip or unequip it. Your AC and weapon attacks on the sheet update automatically in real time.'}`
  ],
  [
    `<span>⚔️</span> Añadir Arma...`,
    `<span>⚔️</span> {isSpanish ? 'Añadir Arma...' : 'Add Weapon...'}`
  ],
  [
    `<span>🛡️</span> Añadir Armadura...`,
    `<span>🛡️</span> {isSpanish ? 'Añadir Armadura...' : 'Add Armor...'}`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] uppercase font-bold">Defensa Táctica:</span>\n                              <span className="font-fantasy font-bold text-sm sm:text-base text-[#8c672b]">{calculatedAc} CA</span>`,
    `<span className="text-[10px] text-[#7a6448] uppercase font-bold">{isSpanish ? 'Defensa Táctica:' : 'Tactical Defense:'}</span>\n                              <span className="font-fantasy font-bold text-sm sm:text-base text-[#8c672b]">{calculatedAc} {isSpanish ? 'CA' : 'AC'}</span>`
  ],
  [
    `<Check className="w-3.5 h-3.5" /> Equipado`,
    `<Check className="w-3.5 h-3.5" /> {isSpanish ? 'Equipado' : 'Equipped'}`
  ],
  [
    `<Shield className="w-3.5 h-3.5 text-[#8c672b]" /> Equipar`,
    `<Shield className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Equipar' : 'Equip'}`
  ],
  [
    `En inventario`,
    `{isSpanish ? 'En inventario' : 'In inventory'}`
  ],
  [
    `Selecciona una clase en el paso anterior para cargar su equipo inicial y opciones tácticas de armas y armaduras.`,
    `{isSpanish ? 'Selecciona una clase en el paso anterior para cargar su equipo inicial y opciones tácticas de armas y armaduras.' : 'Select a class in the previous step to load its starting equipment and tactical weapon/armor options.'}`
  ],

  // Step 7: Spells
  [
    `? \`Paso 7: Conjuración & Grimorio (\${activeClass?.name || 'Lanzador'})\`\n                          : \`Paso 7: Conjuración & Magia Innata / Racial (\${activeClass?.name || 'No lanzador'})\``,
    `? (isSpanish ? \`Paso 7: Conjuración & Grimorio (\${activeClass?.name || 'Lanzador'})\` : \`Step 7: Spellcasting & Grimoire (\${getClassDisplayName(activeClass) || 'Caster'})\`)\n                          : (isSpanish ? \`Paso 7: Conjuración & Magia Innata / Racial (\${activeClass?.name || 'No lanzador'})\` : \`Step 7: Spellcasting & Innate / Racial Magic (\${getClassDisplayName(activeClass) || 'Non-caster'})\`)`
  ],
  [
    `Capacidad 5e: <strong>{spellLimits.explanation}</strong>`,
    `{isSpanish ? 'Capacidad 5e:' : 'Spell Capacity:'} <strong>{spellLimits.explanation}</strong>`
  ],
  [
    `Trucos: {selectedCantripsCount} / {spellLimits.maxCantrips}`,
    `{isSpanish ? 'Trucos:' : 'Cantrips:'} {selectedCantripsCount} / {spellLimits.maxCantrips}`
  ],
  [
    `Grimorio / Repertorio: {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown}`,
    `{isSpanish ? 'Grimorio / Repertorio:' : 'Spellbook / Repertoire:'} {selectedLeveledCount} / {spellLimits.maxPreparedOrKnown}`
  ],
  [
    `Magia Innata / Racial: <strong>{selectedSpells.length > 0 ? \`\${selectedSpells.length} conjuro\${selectedSpells.length > 1 ? 's' : ''} registrado\${selectedSpells.length > 1 ? 's' : ''}\` : 'Sin conjuros de clase'}</strong>`,
    `{isSpanish ? 'Magia Innata / Racial:' : 'Innate / Racial Magic:'} <strong>{selectedSpells.length > 0 ? (isSpanish ? \`\${selectedSpells.length} conjuro\${selectedSpells.length > 1 ? 's' : ''} registrado\${selectedSpells.length > 1 ? 's' : ''}\` : \`\${selectedSpells.length} spell\${selectedSpells.length > 1 ? 's' : ''} recorded\`) : (isSpanish ? 'Sin conjuros de clase' : 'No class spells')}</strong>`
  ],
  [
    `Trucos: {selectedCantripsCount}`,
    `{isSpanish ? 'Trucos:' : 'Cantrips:'} {selectedCantripsCount}`
  ],
  [
    `Nivel 1+: {selectedLeveledCount}`,
    `{isSpanish ? 'Nivel 1+:' : 'Level 1+:'} {selectedLeveledCount}`
  ],
  [
    `Vía Marcial: El Acero y la Táctica son tu Poder`,
    `{isSpanish ? 'Vía Marcial: El Acero y la Táctica son tu Poder' : 'Martial Path: Steel and Tactics Are Your Power'}`
  ],
  [
    `Tu personaje (<strong className="text-[#3b2a14]">{activeRace?.name || 'Aventurero'} {activeClass?.name || 'Guerrero'}</strong>) no canaliza la urdimbre mágica ni posee ranuras de conjuros. Tu verdadera fuerza reside en tus armas, tu armadura, tus reflejos atléticos y tu disciplina táctica.`,
    `{isSpanish ? <>Tu personaje (<strong className="text-[#3b2a14]">{activeRace?.name || 'Aventurero'} {activeClass?.name || 'Guerrero'}</strong>) no canaliza la urdimbre mágica ni posee ranuras de conjuros. Tu verdadera fuerza reside en tus armas, tu armadura, tus reflejos atléticos y tu disciplina táctica.</> : <>Your character (<strong className="text-[#3b2a14]">{getRaceDisplayName(activeRace) || 'Adventurer'} {getClassDisplayName(activeClass) || 'Warrior'}</strong>) does not channel the magical Weave or use spell slots. Your true strength lies in your weapons, armor, athletic reflexes, and tactical discipline.</>}`
  ],
  [
    `No necesitas seleccionar conjuros de clase para avanzar. Tu ficha está lista para equiparse.`,
    `{isSpanish ? 'No necesitas seleccionar conjuros de clase para avanzar. Tu ficha está lista para equiparse.' : 'You do not need to select class spells to proceed. Your character sheet is ready to be equipped.'}`
  ],
  [
    `<span>Continuar a Inventario y Equipo (Paso 8)</span>`,
    `<span>{isSpanish ? 'Continuar a Inventario y Equipo (Paso 8)' : 'Continue to Inventory & Equipment (Step 8)'}</span>`
  ],
  [
    `<span>¿Tu Dungeon Master te otorgó un conjuro especial o regla casera (Homebrew)? (Opcional)</span>`,
    `<span>{isSpanish ? '¿Tu Dungeon Master te otorgó un conjuro especial o regla casera (Homebrew)? (Opcional)' : 'Did your Dungeon Master grant you a special or Homebrew spell? (Optional)'}</span>`
  ],
  [
    `placeholder="Buscar conjuro por nombre, escuela o efecto..."`,
    `placeholder={isSpanish ? "Buscar conjuro por nombre, escuela o efecto..." : "Search spell by name, school, or effect..."}`
  ],
  [
    `<span>Maximizar ({displayedSpellsData.totalCount} Conjuros)</span>`,
    `<span>{isSpanish ? \`Maximizar (\${displayedSpellsData.totalCount} Conjuros)\` : \`Maximize (\${displayedSpellsData.totalCount} Spells)\`}</span>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] font-fantasy font-bold uppercase mr-1">Repertorio:</span>`,
    `<span className="text-[10px] text-[#7a6448] font-fantasy font-bold uppercase mr-1">{isSpanish ? 'Repertorio:' : 'Scope:'}</span>`
  ],
  [
    `⚡ Disponibles para Elegir ({filteredSpells.availableToChoose.length})`,
    `⚡ {isSpanish ? \`Disponibles para Elegir (\${filteredSpells.availableToChoose.length})\` : \`Available to Choose (\${filteredSpells.availableToChoose.length})\`}`
  ],
  [
    `👁️ Consultar Niveles Superiores ({filteredSpells.higherLevelToBrowse.length})`,
    `👁️ {isSpanish ? \`Consultar Niveles Superiores (\${filteredSpells.higherLevelToBrowse.length})\` : \`Browse Higher Levels (\${filteredSpells.higherLevelToBrowse.length})\`}`
  ],
  [
    `📖 Compendio Completo ({OFFICIAL_SPELLS_COMPENDIUM.length})`,
    `📖 {isSpanish ? \`Compendio Completo (\${OFFICIAL_SPELLS_COMPENDIUM.length})\` : \`Full Compendium (\${OFFICIAL_SPELLS_COMPENDIUM.length})\`}`
  ],
  [
    `Todos ({displayedSpellsData.totalCount})`,
    `{isSpanish ? 'Todos' : 'All'} ({displayedSpellsData.totalCount})`
  ],
  [
    `Trucos ({displayedSpellsData.cantrips.length})`,
    `{isSpanish ? 'Trucos' : 'Cantrips'} ({displayedSpellsData.cantrips.length})`
  ],
  [
    `Nivel 1+ ({displayedSpellsData.leveled.length})`,
    `{isSpanish ? 'Nivel 1+' : 'Level 1+'} ({displayedSpellsData.leveled.length})`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] font-fantasy font-bold">Orden:</span>`,
    `<span className="text-[10px] text-[#7a6448] font-fantasy font-bold">{isSpanish ? 'Orden:' : 'Sort:'}</span>`
  ],
  [
    `<option value="level">Por Nivel (1 → 9)</option>\n                                  <option value="name">Alfabético (A → Z)</option>\n                                  <option value="school">Por Escuela de Magia</option>`,
    `<option value="level">{isSpanish ? 'Por Nivel (1 → 9)' : 'By Level (1 → 9)'}</option>\n                                  <option value="name">{isSpanish ? 'Alfabético (A → Z)' : 'Alphabetical (A → Z)'}</option>\n                                  <option value="school">{isSpanish ? 'Por Escuela de Magia' : 'By School of Magic'}</option>`
  ],
  [
    `<span className="text-[10px] text-[#7a6448] font-fantasy font-bold">Escuela:</span>`,
    `<span className="text-[10px] text-[#7a6448] font-fantasy font-bold">{isSpanish ? 'Escuela:' : 'School:'}</span>`
  ],
  [
    `<option value="all">Todas las Escuelas</option>`,
    `<option value="all">{isSpanish ? 'Todas las Escuelas' : 'All Schools'}</option>`
  ],
  [
    `Trucos de Magia (Nivel 0 / Cantrips)`,
    `{isSpanish ? 'Trucos de Magia (Nivel 0 / Cantrips)' : 'Cantrips (Level 0 Spells)'}`
  ],
  [
    `{selectedCantripsCount} / {spellLimits.maxCantrips} Trucos Elegidos • {displayedSpellsData.cantrips.length} disponibles`,
    `{selectedCantripsCount} / {spellLimits.maxCantrips} {isSpanish ? 'Trucos Elegidos' : 'Cantrips Chosen'} • {displayedSpellsData.cantrips.length} {isSpanish ? 'disponibles' : 'available'}`
  ],
  [
    `Hechizos con Espacio de Conjuro (Nivel 1 o Superior)`,
    `{isSpanish ? 'Hechizos con Espacio de Conjuro (Nivel 1 o Superior)' : 'Leveled Spells (Level 1 & Higher)'}`
  ],
  [
    `{selectedLeveledCount} / {spellLimits.maxPreparedOrKnown} en Grimorio / Repertorio`,
    `{selectedLeveledCount} / {spellLimits.maxPreparedOrKnown} {isSpanish ? 'en Grimorio / Repertorio' : 'in Spellbook / Repertoire'}`
  ],
  [
    `Hechizos de Nivel {level} ({spells.length} disponibles)`,
    `{isSpanish ? \`Hechizos de Nivel \${level} (\${spells.length} disponibles)\` : \`Level \${level} Spells (\${spells.length} available)\`}`
  ],
  [
    `Solo Consulta (Nivel Superior)`,
    `{isSpanish ? 'Solo Consulta (Nivel Superior)' : 'Browse Only (Higher Level)'}`
  ],
  [
    `{spells.filter((sp) => selectedSpells.some((s) => s.name.toLowerCase() === sp.name.toLowerCase())).length} elegidos de nivel {level}`,
    `{spells.filter((sp) => selectedSpells.some((s) => s.name.toLowerCase() === sp.name.toLowerCase())).length} {isSpanish ? \`elegidos de nivel \${level}\` : \`chosen at Level \${level}\`}`
  ],

  // Step 9: Review & Forge
  [
    `{characterName || 'Héroe sin Nombre'}`,
    `{characterName || (isSpanish ? 'Héroe sin Nombre' : 'Unnamed Hero')}`
  ],
  [
    `<span className="text-xs bg-[#2c221a] text-[#d4ab59] font-mono font-bold px-2 py-0.5 rounded shrink-0 self-center sm:self-auto">\n                            Nivel {characterLevel}\n                          </span>`,
    `<span className="text-xs bg-[#2c221a] text-[#d4ab59] font-mono font-bold px-2 py-0.5 rounded shrink-0 self-center sm:self-auto">\n                            {isSpanish ? 'Nivel' : 'Level'} {characterLevel}\n                          </span>`
  ],
  [
    `{activeRace ? \`\${activeRace.name} \${activeSubrace ? \`(\${activeSubrace.name})\` : ''}\` : 'Raza sin elegir'} •{' '}\n                          {activeClass\n                            ? isSubclassUnlocked && activeSubclass\n                              ? \`\${activeClass.name} (\${activeSubclass.name})\`\n                              : !isSubclassUnlocked\n                              ? \`\${activeClass.name} (Subclase a Nv \${subclassUnlockLevel})\`\n                              : activeClass.name\n                            : 'Clase sin elegir'}`,
    `{activeRace ? \`\${getRaceDisplayName(activeRace)} \${activeSubrace ? \`(\${isSpanish ? activeSubrace.name : (activeSubrace.nameEn || activeSubrace.name)})\` : ''}\` : (isSpanish ? 'Raza sin elegir' : 'No race selected')} •{' '}\n                          {activeClass\n                            ? isSubclassUnlocked && activeSubclass\n                              ? \`\${getClassDisplayName(activeClass)} (\${activeSubclass.name})\`\n                              : !isSubclassUnlocked\n                              ? \`\${getClassDisplayName(activeClass)} (\${isSpanish ? \`Subclase a Nv \${subclassUnlockLevel}\` : \`Subclass at Lv \${subclassUnlockLevel}\`})\`\n                              : getClassDisplayName(activeClass)\n                            : (isSpanish ? 'Clase sin elegir' : 'No class selected')}`
  ],
  [
    `Trasfondo: <strong>{activeBackground ? activeBackground.name : 'Sin elegir'}</strong> • Alineamiento: {alignment ? (ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name || alignment) : 'Neutral'} • Jugador: {playerName || 'Tú'}`,
    `{isSpanish ? 'Trasfondo:' : 'Background:'} <strong>{activeBackground ? getBgDisplayName(activeBackground) : (isSpanish ? 'Sin elegir' : 'None')}</strong> • {isSpanish ? 'Alineamiento:' : 'Alignment:'} {alignment ? (isSpanish ? (ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name || alignment) : (ALIGNMENT_LABELS_EN[alignment]?.name || alignment)) : 'Neutral'} • {isSpanish ? 'Jugador:' : 'Player:'} {playerName || (isSpanish ? 'Tú' : 'You')}`
  ],
  [
    `<span className="text-[9px] text-[#7a6448] uppercase block">Salud (PG)</span>\n                        <span className="font-fantasy font-bold text-base text-[#2e7d32]">\n                          {activeClass ? \`\${calculatedMaxHp} PG\` : '-'}`,
    `<span className="text-[9px] text-[#7a6448] uppercase block">{isSpanish ? 'Salud (PG)' : 'Health (HP)'}</span>\n                        <span className="font-fantasy font-bold text-base text-[#2e7d32]">\n                          {activeClass ? \`\${calculatedMaxHp} \${isSpanish ? 'PG' : 'HP'}\` : '-'}`
  ],
  [
    `<span className="text-[9px] text-[#7a6448] uppercase block">Armadura (CA)</span>\n                        <span className="font-fantasy font-bold text-base text-[#8c672b]">\n                          {calculatedAc} CA`,
    `<span className="text-[9px] text-[#7a6448] uppercase block">{isSpanish ? 'Armadura (CA)' : 'Armor (AC)'}</span>\n                        <span className="font-fantasy font-bold text-base text-[#8c672b]">\n                          {calculatedAc} {isSpanish ? 'CA' : 'AC'}`
  ],
  [
    `<span className="text-[9px] text-[#7a6448] uppercase block">Iniciativa</span>`,
    `<span className="text-[9px] text-[#7a6448] uppercase block">{isSpanish ? 'Iniciativa' : 'Initiative'}</span>`
  ],
  [
    `<span className="text-[9px] text-[#7a6448] uppercase block">Velocidad</span>\n                        <span className="font-fantasy font-bold text-base text-[#4a361c]">\n                          {calculatedSpeedResult.speedStr}`,
    `<span className="text-[9px] text-[#7a6448] uppercase block">{isSpanish ? 'Velocidad' : 'Speed'}</span>\n                        <span className="font-fantasy font-bold text-base text-[#4a361c]">\n                          {isSpanish ? calculatedSpeedResult.speedStr : calculatedSpeedResult.speedStr.replace('pies', 'ft')}`
  ],
  [
    `<span className="text-[9px] text-[#7a6448] uppercase block">Bono Comp.</span>`,
    `<span className="text-[9px] text-[#7a6448] uppercase block">{isSpanish ? 'Bono Comp.' : 'Prof. Bonus'}</span>`
  ],
  [
    `<span className="text-[9px] text-[#7a6448] uppercase block">Percep. Pasiva</span>`,
    `<span className="text-[9px] text-[#7a6448] uppercase block">{isSpanish ? 'Percep. Pasiva' : 'Passive Percep.'}</span>`
  ],
  [
    `<span>⚔️</span> Combate & Salvaciones`,
    `<span>⚔️</span> {isSpanish ? 'Combate & Salvaciones' : 'Combat & Saves'}`
  ],
  [
    `<span>🎯</span> Habilidades 5e ({totalSkills.length})`,
    `<span>🎯</span> {isSpanish ? 'Habilidades 5e' : 'Skills'} ({totalSkills.length})`
  ],
  [
    `<span>📜</span> Rasgos & Dotes`,
    `<span>📜</span> {isSpanish ? 'Rasgos & Dotes' : 'Traits & Feats'}`
  ],
  [
    `<span>🔮</span> Magia & Grimorio ({selectedSpells.length})`,
    `<span>🔮</span> {isSpanish ? 'Magia & Grimorio' : 'Spells & Grimoire'} ({selectedSpells.length})`
  ],
  [
    `<span>🎒</span> Inventario & Oro ({startingGoldTotal} po)`,
    `<span>🎒</span> {isSpanish ? \`Inventario & Oro (\${startingGoldTotal} po)\` : \`Inventory & Gold (\${startingGoldTotal} gp)\`}`
  ],
  [
    `<Dices className="w-4 h-4 text-[#8c672b]" /> Puntuaciones de Característica & Modificadores`,
    `<Dices className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Puntuaciones de Característica & Modificadores' : 'Ability Scores & Modifiers'}`
  ],
  [
    `<Shield className="w-4 h-4 text-[#8c672b]" /> Tiradas de Salvación Calculadas (D20 + Mod)`,
    `<Shield className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Tiradas de Salvación Calculadas (D20 + Mod)' : 'Calculated Saving Throws (d20 + Mod)'}`
  ],
  [
    `<span className="text-[#4a361c] font-bold block">{save.statName}</span>\n                                  <span className="text-[9px] text-[#7a6448]">\n                                    {save.isProficient ? \`Competente (+\${profBonus})\` : 'Modificador base'}`,
    `<span className="text-[#4a361c] font-bold block">{getAbilityName(save.stat)}</span>\n                                  <span className="text-[9px] text-[#7a6448]">\n                                    {save.isProficient ? (isSpanish ? \`Competente (+\${profBonus})\` : \`Proficient (+\${profBonus})\`) : (isSpanish ? 'Modificador base' : 'Base modifier')}`
  ],
  [
    `<Sword className="w-4 h-4 text-[#8c672b]" /> Armas & Acciones de Ataque Iniciales`,
    `<Sword className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Armas & Acciones de Ataque Iniciales' : 'Starting Weapons & Attack Actions'}`
  ],
  [
    `⚔️ {att.name}`,
    `⚔️ {displayAttackName(att.name)}`
  ],
  [
    `Ataque con arma vinculada a tu clase y equipo inicial`,
    `{isSpanish ? 'Ataque con arma vinculada a tu clase y equipo inicial' : 'Weapon attack linked to your class and starting equipment'}`
  ],
  [
    `Impacto: {att.bonus}\n                                </span>\n                                <span className="font-mono text-[#2e7d32] text-xs font-bold block">\n                                  Daño: {att.damage} ({att.type})`,
    `{isSpanish ? 'Impacto:' : 'Hit:'} {att.bonus}\n                                </span>\n                                <span className="font-mono text-[#2e7d32] text-xs font-bold block">\n                                  {isSpanish ? 'Daño:' : 'Damage:'} {att.damage} ({displayAttackType(att.type)})`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Las 18 Habilidades Oficiales 5e (Bonificador Calculado)`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Las 18 Habilidades Oficiales 5e (Bonificador Calculado)' : 'All 18 Official Skills (Calculated Bonus)'}`
  ],
  [
    `{totalSkills.length} con competencia activa`,
    `{totalSkills.length} {isSpanish ? 'con competencia activa' : 'proficient'}`
  ],
  [
    `? \`Pericia x2 (+\${2 * profBonus})\`\n                                      : sk.isProficient\n                                      ? \`Competente [\${sk.origin}] (+\${profBonus})\`\n                                      : 'Sin competencia'`,
    `? (isSpanish ? \`Pericia x2 (+\${2 * profBonus})\` : \`Expertise x2 (+\${2 * profBonus})\`)\n                                      : sk.isProficient\n                                      ? (isSpanish ? \`Competente [\${sk.origin}] (+\${profBonus})\` : \`Proficient [\${sk.origin}] (+\${profBonus})\`)\n                                      : (isSpanish ? 'Sin competencia' : 'Not proficient')`
  ],
  [
    `<User className="w-4 h-4 text-[#8c672b]" /> Identidad, Filosofía & Rol del Héroe`,
    `<User className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Identidad, Filosofía & Rol del Héroe' : 'Hero Identity, Philosophy & Roleplay'}`
  ],
  [
    `🎭 Rasgos de Personalidad & Virtudes:`,
    `🎭 {isSpanish ? 'Rasgos de Personalidad & Virtudes:' : 'Personality Traits & Virtues:'}`
  ],
  [
    `⚖️ Ideales & Convicciones Morales:`,
    `⚖️ {isSpanish ? 'Ideales & Convicciones Morales:' : 'Ideals & Moral Convictions:'}`
  ],
  [
    `🔗 Vínculos & Lealtades:`,
    `🔗 {isSpanish ? 'Vínculos & Lealtades:' : 'Bonds & Loyalties:'}`
  ],
  [
    `⚠️ Defectos, Debilidades & Tentaciones:`,
    `⚠️ {isSpanish ? 'Defectos, Debilidades & Tentaciones:' : 'Flaws, Weaknesses & Temptations:'}`
  ],
  [
    `📜 Historia y Pasado del Héroe:`,
    `📜 {isSpanish ? 'Historia y Pasado del Héroe:' : 'Hero Backstory & Past:'}`
  ],
  [
    `<BookOpen className="w-4 h-4 text-[#8c672b]" /> Rasgo de Trasfondo: {activeBackground.featureName}`,
    `<BookOpen className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Rasgo de Trasfondo:' : 'Background Feature:'} {activeBackground.featureName}`
  ],
  [
    `<strong>Equipo Sugerido:</strong> {activeBackground.suggestedEquipment}`,
    `<strong>{isSpanish ? 'Equipo Sugerido:' : 'Suggested Equipment:'}</strong> {activeBackground.suggestedEquipment}`
  ],
  [
    `<Star className="w-4 h-4 text-[#8c672b]" /> Dotes Oficiales Seleccionadas ({chosenFeatsList.length})`,
    `<Star className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Dotes Oficiales Seleccionadas (\${chosenFeatsList.length})\` : \`Selected Official Feats (\${chosenFeatsList.length})\`}`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Rasgos Raciales ({activeRace.name})`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Rasgos Raciales (\${activeRace.name})\` : \`Racial Traits (\${getRaceDisplayName(activeRace)})\`}`
  ],
  [
    `<strong>Visión en la Oscuridad:</strong> Puedes ver en la oscuridad hasta {activeRace.darkvision} pies en tonos de gris.`,
    `{isSpanish ? <><strong>Visión en la Oscuridad:</strong> Puedes ver en la oscuridad hasta {activeRace.darkvision} pies en tonos de gris.</> : <><strong>Darkvision:</strong> You can see in dim light and darkness up to {activeRace.darkvision} feet in shades of gray.</>}`
  ],
  [
    `<Shield className="w-4 h-4 text-[#8c672b]" /> Rasgos de Clase ({activeClass.name} Nv{characterLevel})`,
    `<Shield className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? \`Rasgos de Clase (\${activeClass.name} Nv\${characterLevel})\` : \`Class Features (\${getClassDisplayName(activeClass)} Lv\${characterLevel})\`}`
  ],
  [
    `<strong>{f.name} (Nv {f.level}):</strong> {f.desc}`,
    `<strong>{f.name} ({isSpanish ? 'Nv' : 'Lv'} {f.level}):</strong> {f.desc}`
  ],
  [
    `Bolsa de Monedas Inicial`,
    `{isSpanish ? 'Bolsa de Monedas Inicial' : 'Starting Coin Pouch'}`
  ],
  [
    `Fondos acumulados de clase y trasfondo`,
    `{isSpanish ? 'Fondos acumulados de clase y trasfondo' : 'Combined funds from class and background'}`
  ],
  [
    `<Backpack className="w-4 h-4 text-[#8c672b]" /> Equipamiento de Aventurero & Posesiones`,
    `<Backpack className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Equipamiento de Aventurero & Posesiones' : 'Adventurer Equipment & Possessions'}`
  ],
  [
    `{isEquipped ? '🛡️ Equipado' : 'Equipar'}`,
    `{isEquipped ? (isSpanish ? '🛡️ Equipado' : '🛡️ Equipped') : (isSpanish ? 'Equipar' : 'Equip')}`
  ],
  [
    `<Award className="w-4 h-4 text-[#8c672b]" /> Herramientas & Idiomas de Trasfondo`,
    `<Award className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Herramientas & Idiomas de Trasfondo' : 'Background Tools & Languages'}`
  ],
  [
    `<strong>Herramientas:</strong>{' '}\n                            {backgroundTools && backgroundTools.length > 0\n                              ? backgroundTools.join(', ')\n                              : 'Ninguna herramienta otorgada por este trasfondo'}`,
    `<strong>{isSpanish ? 'Herramientas:' : 'Tools:'}</strong>{' '}\n                            {backgroundTools && backgroundTools.length > 0\n                              ? backgroundTools.join(', ')\n                              : (isSpanish ? 'Ninguna herramienta otorgada por este trasfondo' : 'No tools granted by this background')}`
  ],
  [
    `<strong>Idiomas adicionales:</strong>{' '}`,
    `<strong>{isSpanish ? 'Idiomas adicionales:' : 'Additional Languages:'}</strong>{' '}`
  ],
];

let count = 0;
for (const [target, replacement] of replacements) {
  if (content.includes(target)) {
    content = content.replaceAll(target, replacement);
    count++;
  } else {
    console.log('NOT FOUND:', target.slice(0, 80));
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`Applied ${count} / ${replacements.length} replacements.`);
