import fs from 'fs';

const modalPath = 'src/components/CharacterCreatorModal.tsx';
let code = fs.readFileSync(modalPath, 'utf8');

// 1. Add import for useLanguageStore if not present
if (!code.includes("import { useLanguageStore }")) {
  code = code.replace(
    "import { useUserStore } from '../hooks/useUserStore';",
    "import { useUserStore } from '../hooks/useUserStore';\nimport { useLanguageStore } from '../hooks/useLanguageStore';"
  );
}

// 2. Add useLanguageStore() and helpers inside CharacterCreatorModal component
const componentMarker = "const currentLoggedUserName = userStore.currentUser?.username || '';";
if (!code.includes("const { language, isSpanish, isEnglish, setLanguage, t } = useLanguageStore();")) {
  const insertHook = `const currentLoggedUserName = userStore.currentUser?.username || '';
  const { language, isSpanish, isEnglish, setLanguage, t } = useLanguageStore();
  const getAbilityAbbr = (st: string) => isSpanish ? ABILITY_SCORE_EXPLANATIONS[st]?.abbreviation || st.toUpperCase() : (st === 'str' ? 'STR' : st === 'dex' ? 'DEX' : st === 'con' ? 'CON' : st === 'int' ? 'INT' : st === 'wis' ? 'WIS' : 'CHA');
  const getAbilityName = (st: string) => isSpanish ? ABILITY_SCORE_EXPLANATIONS[st]?.name || st : (st === 'str' ? 'Strength' : st === 'dex' ? 'Dexterity' : st === 'con' ? 'Constitution' : st === 'int' ? 'Intelligence' : st === 'wis' ? 'Wisdom' : 'Charisma');
  const SKILL_TRANSLATIONS_5E: Record<string, string> = {
    'Acrobacias': 'Acrobatics',
    'Atletismo': 'Athletics',
    'Conocimiento Arcano': 'Arcana',
    'Arcanos': 'Arcana',
    'Engaño': 'Deception',
    'Historia': 'History',
    'Interpretación': 'Performance',
    'Intimidación': 'Intimidation',
    'Investigación': 'Investigation',
    'Juego de Manos': 'Sleight of Hand',
    'Medicina': 'Medicine',
    'Naturaleza': 'Nature',
    'Percepción': 'Perception',
    'Perspicacia': 'Insight',
    'Persuasión': 'Persuasion',
    'Religión': 'Religion',
    'Sigilo': 'Stealth',
    'Supervivencia': 'Survival',
    'Trato con Animales': 'Animal Handling',
  };
  const displaySkillName = (name: string) => isSpanish ? name : (SKILL_TRANSLATIONS_5E[name] || name);`;
  code = code.replace(componentMarker, insertHook);
}

// 3. Localize STEPS definition
const oldStepsRegex = /const STEPS: \{ id: CreatorStep; num: number; title: string; subtitle: string; icon: any \}\[\] = useMemo\(\(\) => \{[\s\S]*?return \[[\s\S]*?\];\s*\}, \[isCaster\]\);/;
const newSteps = `const STEPS: { id: CreatorStep; num: number; title: string; subtitle: string; icon: any }[] = useMemo(() => {
    return [
      { id: 'identity', num: 1, title: isSpanish ? 'Identidad' : 'Identity', subtitle: isSpanish ? 'Nombre & Apariencia' : 'Name & Appearance', icon: User },
      { id: 'race', num: 2, title: isSpanish ? 'Raza & Linaje' : 'Race & Species', subtitle: isSpanish ? 'Atributos & Rasgos' : 'Traits & Biology', icon: Award },
      { id: 'background', num: 3, title: isSpanish ? 'Trasfondo & Rol' : 'Background', subtitle: isSpanish ? 'Historia & Convicciones' : 'History & Ability Scores', icon: BookOpen },
      { id: 'class', num: 4, title: isSpanish ? 'Clase & Nivel' : 'Class & Level', subtitle: isSpanish ? 'Clase, Rasgos & Hab.' : 'Features & Proficiencies', icon: Sword },
      { id: 'abilities', num: 5, title: isSpanish ? 'Puntuaciones' : 'Ability Scores', subtitle: isSpanish ? 'Tirada 4d6 & Stats' : 'Roll 4d6 / Point Buy', icon: Dices },
      { id: 'asi_feats', num: 6, title: isSpanish ? 'Dotes & Stats' : 'Feats & ASI', subtitle: isSpanish ? 'Puntuaciones & Dotes' : 'Scores & Feats', icon: Star },
      { id: 'spells', num: 7, title: isSpanish ? 'Conjuración' : 'Spellcasting', subtitle: isCaster ? (isSpanish ? 'Trucos & Grimorio' : 'Cantrips & Spellbook') : (isSpanish ? 'Magia Innata / Opcional' : 'Innate Magic / Optional'), icon: Sparkles },
      { id: 'equipment', num: 8, title: isSpanish ? 'Inventario' : 'Inventory & Equipment', subtitle: isSpanish ? 'Equipo Inicial & Oro' : 'Starting Gear & Gold', icon: Backpack },
      { id: 'review', num: 9, title: isSpanish ? 'Forjar Personaje' : 'Forge Character', subtitle: isSpanish ? 'Ficha Final & Dossier' : 'Final Sheet & Dossier', icon: Check },
    ];
  }, [isCaster, isSpanish]);`;

code = code.replace(oldStepsRegex, newSteps);

// 4. Update savingThrowDetails abbreviations and names
code = code.replace(
  `const statName = ABILITY_SCORE_EXPLANATIONS[stat].name;
      const isProficient = savingThrows.includes(statName);
      const statMod = getMod(finalStats[stat]);
      const totalBonus = statMod + (isProficient ? profBonus : 0);
      const bonusStr = totalBonus >= 0 ? \`+\${totalBonus}\` : \`\${totalBonus}\`;
      return {
        stat,
        statName,
        abbreviation: ABILITY_SCORE_EXPLANATIONS[stat].abbreviation,`,
  `const statName = getAbilityName(stat);
      const esStatName = ABILITY_SCORE_EXPLANATIONS[stat].name;
      const isProficient = savingThrows.includes(esStatName) || savingThrows.includes(statName);
      const statMod = getMod(finalStats[stat]);
      const totalBonus = statMod + (isProficient ? profBonus : 0);
      const bonusStr = totalBonus >= 0 ? \`+\${totalBonus}\` : \`\${totalBonus}\`;
      return {
        stat,
        statName,
        abbreviation: getAbilityAbbr(stat),`
);

// 5. Update Creator Header title and add language selector pill
const oldTitle = `Creador de Héroes {selectedEdition === '5.5e' ? '5.5e' : '5e'}`;
const newTitle = `{isSpanish ? 'Creador de Héroes' : 'Hero Forge'} {selectedEdition === '5.5e' ? '5.5e' : '5e'}`;
code = code.replace(oldTitle, newTitle);

// Add language switcher right after edition selector pill
const oldEditionSelector = `              {/* Edition Selector Pill in Creator Header */}
              <div className="flex items-center p-0.5 bg-[#180e07] rounded-lg border border-[#8c672b]/60 shadow-xs">
                <button
                  type="button"
                  onClick={() => setSelectedEdition('5e')}
                  className={\`px-2 py-0.5 rounded text-[10px] font-fantasy font-bold transition cursor-pointer \${
                    selectedEdition === '5e'
                      ? 'bg-[#8c672b] text-[#ffd56b] shadow-xs'
                      : 'text-[#baa892] hover:text-[#f7f2ea]'
                  }\`}
                >
                  5e (2014)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEdition('5.5e')}
                  className={\`px-2 py-0.5 rounded text-[10px] font-fantasy font-bold transition cursor-pointer flex items-center gap-1 \${
                    selectedEdition === '5.5e'
                      ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400'
                      : 'text-[#baa892] hover:text-[#f7f2ea]'
                  }\`}
                >
                  <span>5.5e (2024)</span>
                  <span className="text-[8px] bg-amber-400 text-stone-900 px-0.5 rounded font-black">PHB</span>
                </button>
              </div>`;

const newEditionAndLang = `${oldEditionSelector}

              {/* Language Switcher Pill in Creator Header */}
              <div className="flex items-center p-0.5 bg-[#180e07] rounded-lg border border-[#8c672b]/60 shadow-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={\`px-1.5 py-0.5 rounded text-[10px] font-fantasy font-bold transition cursor-pointer \${
                    isSpanish
                      ? 'bg-[#8c672b] text-[#ffd56b] shadow-xs'
                      : 'text-[#baa892] hover:text-[#f7f2ea]'
                  }\`}
                  title="Cambiar a Español"
                >
                  🇪🇸 Esp
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={\`px-1.5 py-0.5 rounded text-[10px] font-fantasy font-bold transition cursor-pointer \${
                    isEnglish
                      ? 'bg-[#8c672b] text-[#ffd56b] shadow-xs'
                      : 'text-[#baa892] hover:text-[#f7f2ea]'
                  }\`}
                  title="Switch to English"
                >
                  🇬🇧 Eng
                </button>
              </div>`;

code = code.replace(oldEditionSelector, newEditionAndLang);

// Localize Borrador in header
code = code.replace(
  `<span>📝 Borrador</span>`,
  `<span>📝 {isSpanish ? 'Borrador' : 'Draft'}</span>`
);
code = code.replace(
  `<span className="hidden sm:inline">Borrador</span>`,
  `<span className="hidden sm:inline">{isSpanish ? 'Borrador' : 'Draft'}</span>`
);
code = code.replace(
  `<span className="hidden sm:inline">{isSidebarOpen ? 'Ocultar Hoja' : 'Ver Hoja'}</span>`,
  `<span className="hidden sm:inline">{isSidebarOpen ? (isSpanish ? 'Ocultar Hoja' : 'Hide Sheet') : (isSpanish ? 'Ver Hoja' : 'Show Sheet')}</span>`
);
code = code.replace(
  `<span className="text-[9px] font-fantasy font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">\n                Hoja en Vivo\n              </span>`,
  `<span className="text-[9px] font-fantasy font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">\n                {isSpanish ? 'Hoja en Vivo' : 'Live Sheet'}\n              </span>`
);

// Quick stats in top bar
code = code.replace(
  `<span className="text-[#ffd56b] font-fantasy font-semibold truncate max-w-[140px]">{characterName || 'Héroe'} (Nv {characterLevel})</span>`,
  `<span className="text-[#ffd56b] font-fantasy font-semibold truncate max-w-[140px]">{characterName || (isSpanish ? 'Héroe' : 'Hero')} ({isSpanish ? 'Nv' : 'Lv'} {characterLevel})</span>`
);

// 6. Step 2 Raza banner and Category Tabs
code = code.replace(
  `>Paso 2: Raza y Linaje Ancestral<`,
  `>{isSpanish ? 'Paso 2: Raza y Linaje Ancestral' : 'Step 2: Race & Ancestral Lineage'}<`
);
code = code.replace(
  `Tu linaje determina tus bonificadores a las características, tu velocidad básica, sentidos especiales (como visión en la oscuridad) y dones mágicos innatos.`,
  `{isSpanish ? 'Tu linaje determina tus bonificadores a las características, tu velocidad básica, sentidos especiales (como visión en la oscuridad) y dones mágicos innatos.' : 'Your lineage determines your ability score increases, basic speed, special senses (like darkvision), and innate racial traits.'}`
);

// Category tabs in Step 2:
const oldRaceTabs = `                          {(
                            [
                              { id: 'Todos', label: 'Todas las Razas', count: raceCounts.Todos },
                              { id: 'Común', label: 'Comunes (PHB)', count: raceCounts.Común },
                              { id: 'Exótica', label: 'Exóticas', count: raceCounts.Exótica },
                              { id: 'Monstruosa', label: 'Monstruosas', count: raceCounts.Monstruosa },
                              { id: 'Planar', label: 'Planares & Entornos', count: raceCounts.Planar },
                            ] as const
                          ).map((tab) => (`;

const newRaceTabs = `                          {(
                            [
                              { id: 'Todos', label: isSpanish ? 'Todas las Razas' : 'All Races', count: raceCounts.Todos },
                              { id: 'Común', label: isSpanish ? 'Comunes (PHB)' : 'Common (PHB)', count: raceCounts.Común },
                              { id: 'Exótica', label: isSpanish ? 'Exóticas' : 'Exotic', count: raceCounts.Exótica },
                              { id: 'Monstruosa', label: isSpanish ? 'Monstruosas' : 'Monstrous', count: raceCounts.Monstruosa },
                              { id: 'Planar', label: isSpanish ? 'Planares & Entornos' : 'Planar & Environments', count: raceCounts.Planar },
                            ] as const
                          ).map((tab) => (`;

code = code.replace(oldRaceTabs, newRaceTabs);

// Race search placeholder & Maximize
code = code.replace(
  `placeholder="Buscar raza o linaje..."`,
  `placeholder={isSpanish ? "Buscar raza o linaje..." : "Search race or lineage..."}`
);
code = code.replace(
  `<span>Maximizar Catálogo</span>`,
  `<span>{isSpanish ? 'Maximizar Catálogo' : 'Maximize Catalog'}</span>`
);

// Empty race prompt
code = code.replace(
  `Selecciona una raza de la lista para ver sus rasgos, bonificadores y linajes.`,
  `{isSpanish ? 'Selecciona una raza de la lista para ver sus rasgos, bonificadores y linajes.' : 'Select a race from the list to view its traits, ability bonuses, and lineages.'}`
);

// 7. Step 3 Background banner & wire onInspect to Creator2024BackgroundPicker
code = code.replace(
  `>Paso 3: Tu Trasfondo Oficial (99 Disponibles)<`,
  `>{isSpanish ? 'Paso 3: Tu Trasfondo Oficial (99 Disponibles)' : 'Step 3: Official Background (99 Available)'}<`
);
code = code.replace(
  `<Creator2024BackgroundPicker\n                      selectedBackgroundId={selectedBackgroundId}\n                      onSelectBackground={(id) => setSelectedBackgroundId(id)}\n                      bgAsiMode={bgAsiMode2024}\n                      setBgAsiMode={setBgAsiMode2024}\n                      bgAsiStatPlusTwo={bgAsiStatPlusTwo}\n                      setBgAsiStatPlusTwo={setBgAsiStatPlusTwo}\n                      bgAsiStatPlusOne={bgAsiStatPlusOne}\n                      setBgAsiStatPlusOne={setBgAsiStatPlusOne}\n                    />`,
  `<Creator2024BackgroundPicker\n                      selectedBackgroundId={selectedBackgroundId}\n                      onSelectBackground={(id) => setSelectedBackgroundId(id)}\n                      bgAsiMode={bgAsiMode2024}\n                      setBgAsiMode={setBgAsiMode2024}\n                      bgAsiStatPlusTwo={bgAsiStatPlusTwo}\n                      setBgAsiStatPlusTwo={setBgAsiStatPlusTwo}\n                      bgAsiStatPlusOne={bgAsiStatPlusOne}\n                      setBgAsiStatPlusOne={setBgAsiStatPlusOne}\n                      onInspect={(data) => setInspectingCompendium(data)}\n                    />`
);

// 8. Step 4 Class banner
code = code.replace(
  `>Paso 4: Tu Clase, Nivel, Estilos & Competencias<`,
  `>{isSpanish ? 'Paso 4: Tu Clase, Nivel, Estilos & Competencias' : 'Step 4: Class, Level, Styles & Proficiencies'}<`
);

// 9. Step 5 Abilities banner
code = code.replace(
  `>Paso 5: Puntuaciones de Característica (Los 6 Pilares del Héroe)<`,
  `>{isSpanish ? 'Paso 5: Puntuaciones de Característica (Los 6 Pilares del Héroe)' : 'Step 5: Ability Scores (The 6 Pillars of the Hero)'}<`
);

// 10. Step 6 ASI & Feats banner
code = code.replace(
  `>Paso 6: Dotes Oficiales & Mejoras de Puntuación (ASI)<`,
  `>{isSpanish ? 'Paso 6: Dotes Oficiales & Mejoras de Puntuación (ASI)' : 'Step 6: Official Feats & Ability Score Improvements (ASI)'}<`
);

// 11. Step 8 Equipment banner
code = code.replace(
  `>Paso 8: Inventario, Equipo Inicial & Riqueza<`,
  `>{isSpanish ? 'Paso 8: Inventario, Equipo Inicial & Riqueza' : 'Step 8: Inventory, Starting Equipment & Wealth'}<`
);

// 12. Bottom Navigation Footer buttons
code = code.replace(
  `<ChevronLeft className="w-4 h-4" /> Paso Anterior`,
  `<ChevronLeft className="w-4 h-4" /> {isSpanish ? 'Paso Anterior' : 'Previous Step'}`
);
code = code.replace(
  `Paso {currentStepIndex + 1} de {STEPS.length}`,
  `{isSpanish ? 'Paso' : 'Step'} {currentStepIndex + 1} {isSpanish ? 'de' : 'of'} {STEPS.length}`
);
code = code.replace(
  `<span className="hidden md:inline">Guardar Borrador</span>`,
  `<span className="hidden md:inline">{isSpanish ? 'Guardar Borrador' : 'Save Draft'}</span>`
);
code = code.replace(
  `<span>Siguiente Paso</span> <ChevronRight className="w-4 h-4" />`,
  `<span>{isSpanish ? 'Siguiente Paso' : 'Next Step'}</span> <ChevronRight className="w-4 h-4" />`
);
code = code.replace(
  `{initialCharacter && !initialCharacter.isDraft\n                      ? 'Guardar Cambios'\n                      : '¡Forjar Personaje!'}`,
  `{initialCharacter && !initialCharacter.isDraft\n                      ? (isSpanish ? 'Guardar Cambios' : 'Save Changes')\n                      : (isSpanish ? '¡Forjar Personaje!' : 'Forge Character!')}`
);

// 13. Right Live Sheet sidebar
code = code.replace(
  `<Scroll className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />\n                  <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-[#ffd56b] truncate">\n                    Hoja en Vivo\n                  </span>`,
  `<Scroll className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />\n                  <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-[#ffd56b] truncate">\n                    {isSpanish ? 'Hoja en Vivo' : 'Live Sheet'}\n                  </span>`
);
code = code.replace(
  `<span className="hidden sm:inline">Colapsar</span>`,
  `<span className="hidden sm:inline">{isSpanish ? 'Colapsar' : 'Collapse'}</span>`
);
code = code.replace(
  `{characterName || 'Sin Nombre'}`,
  `{characterName || (isSpanish ? 'Sin Nombre' : 'Unnamed')}`
);
code = code.replace(
  `Marco 🎨`,
  `{isSpanish ? 'Marco 🎨' : 'Frame 🎨'}`
);
code = code.replace(
  `{activeRace ? activeRace.name : 'Raza sin elegir'}`,
  `{activeRace ? (isSpanish ? activeRace.name : (activeRace.nameEn || activeRace.name)) : (isSpanish ? 'Raza sin elegir' : 'No race selected')}`
);
code = code.replace(
  `: 'Clase sin elegir'}`,
  `: (isSpanish ? 'Clase sin elegir' : 'No class selected')}`
);
code = code.replace(
  `{activeBackground ? activeBackground.name : 'Trasfondo sin elegir'}`,
  `{activeBackground ? (isSpanish ? activeBackground.name : (activeBackground.nameEn || activeBackground.name)) : (isSpanish ? 'Trasfondo sin elegir' : 'No background selected')}`
);

// Live Sheet Tabs
code = code.replace(`⚔️ Combate`, `⚔️ {isSpanish ? 'Combate' : 'Combat'}`);
code = code.replace(`🎯 Hab (`, `🎯 {isSpanish ? 'Hab' : 'Skills'} (`);
code = code.replace(`📜 Rasgos`, `📜 {isSpanish ? 'Rasgos' : 'Traits'}`);
code = code.replace(`🔮 Magia (`, `🔮 {isSpanish ? 'Magia' : 'Spells'} (`);
code = code.replace(`🎒 Equipo`, `🎒 {isSpanish ? 'Equipo' : 'Equipment'}`);

// Combat tab metrics
code = code.replace(
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Armadura</span>`,
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">{isSpanish ? 'Armadura' : 'Armor'}</span>`
);
code = code.replace(
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Iniciativa</span>`,
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">{isSpanish ? 'Iniciativa' : 'Initiative'}</span>`
);
code = code.replace(
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Comp.</span>`,
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">{isSpanish ? 'Comp.' : 'Prof.'}</span>`
);
code = code.replace(
  `+{profBonus} Bono`,
  `+{profBonus} {isSpanish ? 'Bono' : 'Bonus'}`
);

// HP Vial
code = code.replace(
  `<span>PUNTOS DE GOLPE (PG MÁX)</span>`,
  `<span>{isSpanish ? 'PUNTOS DE GOLPE (PG MÁX)' : 'HIT POINTS (MAX HP)'}</span>`
);
code = code.replace(
  `<span>Dado de Golpe: 1d{activeClass ? activeClass.hitDie : 8}</span>`,
  `<span>{isSpanish ? 'Dado de Golpe:' : 'Hit Die:'} 1d{activeClass ? activeClass.hitDie : 8}</span>`
);
code = code.replace(
  `<span>Mod CON: {getModStr(finalStats.con)}</span>`,
  `<span>{isSpanish ? 'Mod CON:' : 'CON Mod:'} {getModStr(finalStats.con)}</span>`
);

// Ability Scores Header & Abbreviation in Medallion
code = code.replace(
  `<span className="font-fantasy tracking-wider">Atributos & Modificadores</span>\n                      <span className="text-[9px]">Base + Bonos</span>`,
  `<span className="font-fantasy tracking-wider">{isSpanish ? 'Atributos & Modificadores' : 'Ability Scores & Modifiers'}</span>\n                      <span className="text-[9px]">{isSpanish ? 'Base + Bonos' : 'Base + Bonuses'}</span>`
);
code = code.replace(
  `<span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider">\n                              {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}\n                            </span>`,
  `<span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider">\n                              {getAbilityAbbr(st)}\n                            </span>`
);

// Saving Throws Header
code = code.replace(
  `<Shield className="w-3.5 h-3.5 text-[#8c672b]" /> Tiradas de Salvación`,
  `<Shield className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Tiradas de Salvación' : 'Saving Throws'}`
);
code = code.replace(
  `<span className="text-[9px] text-[#7a6448] font-mono">★ = Competente</span>`,
  `<span className="text-[9px] text-[#7a6448] font-mono">{isSpanish ? '★ = Competente' : '★ = Proficient'}</span>`
);

// Live synced footer
code = code.replace(
  `Sincronizado en Vivo`,
  `{isSpanish ? 'Sincronizado en Vivo' : 'Live Synced'}`
);

fs.writeFileSync(modalPath, code);
console.log('Successfully patched CharacterCreatorModal.tsx with bilingual support!');
