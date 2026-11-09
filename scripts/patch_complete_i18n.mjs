import fs from 'fs';

const modalPath = 'src/components/CharacterCreatorModal.tsx';
let code = fs.readFileSync(modalPath, 'utf8').replace(/\r\n/g, '\n');

let replacedCount = 0;
let missedTargets = [];

function replaceExact(label, target, replacement, replaceAll = false) {
  const normTarget = target.replace(/\r\n/g, '\n');
  const normReplacement = replacement.replace(/\r\n/g, '\n');
  if (!code.includes(normTarget)) {
    missedTargets.push(label);
    console.warn(`[WARN] Target not found for: ${label}`);
    return false;
  }
  if (replaceAll) {
    code = code.replaceAll(normTarget, normReplacement);
  } else {
    code = code.replace(normTarget, normReplacement);
  }
  replacedCount++;
  return true;
}

// 1. Ensure useLanguageStore is imported
if (!code.includes("import { useLanguageStore }")) {
  replaceExact(
    'import useLanguageStore',
    "import { useUserStore } from '../hooks/useUserStore';",
    "import { useUserStore } from '../hooks/useUserStore';\nimport { useLanguageStore } from '../hooks/useLanguageStore';"
  );
}

// 2. Define i18n helpers at top of component
const hookMarker = "const currentLoggedUserName = userStore.currentUser?.username || '';";
const helpersDef = `const currentLoggedUserName = userStore.currentUser?.username || '';
  const { language, isSpanish, isEnglish, setLanguage, t } = useLanguageStore();

  const getAbilityAbbr = (st: string) => isSpanish ? ABILITY_SCORE_EXPLANATIONS[st]?.abbreviation || st.toUpperCase() : (st === 'str' ? 'STR' : st === 'dex' ? 'DEX' : st === 'con' ? 'CON' : st === 'int' ? 'INT' : st === 'wis' ? 'WIS' : 'CHA');
  const getAbilityName = (st: string) => isSpanish ? ABILITY_SCORE_EXPLANATIONS[st]?.name || st : (st === 'str' ? 'Strength' : st === 'dex' ? 'Dexterity' : st === 'con' ? 'Constitution' : st === 'int' ? 'Intelligence' : st === 'wis' ? 'Wisdom' : 'Charisma');
  const getAbilityDesc = (st: string) => {
    if (isSpanish) return ABILITY_SCORE_EXPLANATIONS[st]?.description || '';
    const map: Record<string, string> = {
      str: 'Natural muscular power, athletic prowess, and raw physical force in melee combat.',
      dex: 'Physical agility, feline reflexes, balance, stealth, and precision with ranged or finesse weapons.',
      con: 'Vitality, endurance, physical toughness, resistance to poison, and hit point pool.',
      int: 'Mental acuity, deductive reasoning, memory, and mastery of arcane lore and wizardry.',
      wis: 'Perceptive awareness of your surroundings, intuition, willpower, and divine or primal connection.',
      cha: 'Force of personality, persuasive eloquence, leadership presence, and innate magical projection.',
    };
    return map[st] || ABILITY_SCORE_EXPLANATIONS[st]?.description || '';
  };

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
  const displaySkillName = (name: string) => isSpanish ? name : (SKILL_TRANSLATIONS_5E[name] || name);

  const DAMAGE_TRANSLATIONS_5E: Record<string, string> = {
    'Contundente Mágico': 'Magical Bludgeoning',
    'Perforante Mágico': 'Magical Piercing',
    'Cortante Mágico': 'Magical Slashing',
    'Contundente': 'Bludgeoning',
    'Perforante': 'Piercing',
    'Cortante': 'Slashing',
    'Fuego': 'Fire',
    'Frío': 'Cold',
    'Relámpago': 'Lightning',
    'Trueno': 'Thunder',
    'Veneno': 'Poison',
    'Ácido': 'Acid',
    'Radiante': 'Radiant',
    'Necrótico': 'Necrotic',
    'Fuerza': 'Force',
    'Psíquico': 'Psychic',
    'Sutil': 'Finesse',
    'Ligera': 'Light',
    'Pesada': 'Heavy',
    'A dos manos': 'Two-Handed',
    'Versátil': 'Versatile',
    'Arrojadiza': 'Thrown',
    'Alcance': 'Reach',
    'Carga': 'Loading',
    'Munición': 'Ammunition',
    'Especial': 'Special',
  };

  const displayAttackName = (name: string) => {
    if (isSpanish) return name;
    if (name.toLowerCase().includes('desarmado') || name.toLowerCase().includes('unarmed')) return 'Unarmed Strike';
    const weapon = findWeaponByName(name);
    if (weapon && weapon.nameEn) return weapon.nameEn;
    return name;
  };

  const displayAttackType = (typeStr: string) => {
    if (isSpanish) return typeStr;
    let res = typeStr;
    Object.entries(DAMAGE_TRANSLATIONS_5E).forEach(([es, en]) => {
      res = res.replaceAll(es, en);
    });
    return res;
  };

  const ALIGNMENT_LABELS_EN: Record<string, { name: string; abbr: string; tagline: string; desc: string }> = {
    'LB': { name: 'Lawful Good', abbr: 'LG', tagline: 'The Crusader', desc: 'Acts with compassion, honor, and a sense of duty. Believes that an orderly, lawful society is the best way to protect the innocent.' },
    'NB': { name: 'Neutral Good', abbr: 'NG', tagline: 'The Benefactor', desc: 'Does the best that a good person can do according to their needs, without feeling bound by strict orders or open rebellion.' },
    'CB': { name: 'Chaotic Good', abbr: 'CG', tagline: 'The Rebel', desc: 'Follows their own moral compass with a noble heart. Detests tyranny, oppressive rules, and unjust bureaucracies.' },
    'LN': { name: 'Lawful Neutral', abbr: 'LN', tagline: 'The Judge', desc: 'Law, tradition, and personal oaths stand above compassion or whim. Keeps their word without hesitation.' },
    'N': { name: 'True Neutral', abbr: 'N', tagline: 'The Undecided', desc: 'Prefers to steer clear of moral questions and doesn\\'t take sides, or seeks to preserve the cosmic balance of nature.' },
    'CN': { name: 'Chaotic Neutral', abbr: 'CN', tagline: 'The Free Spirit', desc: 'Values their own personal freedom above all else. Follows their whims and does not easily commit to others\\' causes.' },
    'LM': { name: 'Lawful Evil', abbr: 'LE', tagline: 'The Dominator', desc: 'Methodically takes what they want within the limits of a code of tradition, loyalty, or order, using hierarchy to rule.' },
    'LE': { name: 'Lawful Evil', abbr: 'LE', tagline: 'The Dominator', desc: 'Methodically takes what they want within the limits of a code of tradition, loyalty, or order, using hierarchy to rule.' },
    'NM': { name: 'Neutral Evil', abbr: 'NE', tagline: 'The Malefactor', desc: 'Does whatever they can get away with, without compassion or qualms, betraying anyone for personal gain.' },
    'NE': { name: 'Neutral Evil', abbr: 'NE', tagline: 'The Malefactor', desc: 'Does whatever they can get away with, without compassion or qualms, betraying anyone for personal gain.' },
    'CM': { name: 'Chaotic Evil', abbr: 'CE', tagline: 'The Destroyer', desc: 'Actuated by greed, hatred, and bloodlust. Enjoys sowing chaos and destruction across the world.' },
    'CE': { name: 'Chaotic Evil', abbr: 'CE', tagline: 'The Destroyer', desc: 'Actuated by greed, hatred, and bloodlust. Enjoys sowing chaos and destruction across the world.' },
  };`;

if (!code.includes("const ALIGNMENT_LABELS_EN:")) {
  replaceExact('hookMarker helpersDef', hookMarker, helpersDef);
}

// 2b. Sync default playerName ('Aventurero' <-> 'Adventurer') when switching language
replaceExact(
  'playerName sync useEffect',
  `  // Sync logged in user if playerName was empty or pending userStore load
  useEffect(() => {
    if (!playerName && currentLoggedUserName && !initialCharacter?.playerName) {
      setPlayerName(currentLoggedUserName);
    }
  }, [currentLoggedUserName, initialCharacter?.playerName]);`,
  `  // Sync logged in user if playerName was empty or pending userStore load
  useEffect(() => {
    if (!playerName && currentLoggedUserName && !initialCharacter?.playerName) {
      setPlayerName(!isSpanish && currentLoggedUserName === 'Aventurero' ? 'Adventurer' : currentLoggedUserName);
    }
  }, [currentLoggedUserName, initialCharacter?.playerName, isSpanish]);

  useEffect(() => {
    if (!isSpanish && playerName === 'Aventurero') {
      setPlayerName('Adventurer');
    } else if (isSpanish && playerName === 'Adventurer') {
      setPlayerName('Aventurero');
    }
  }, [isSpanish, playerName]);`
);

// 3. Localize equippedAttacks default unarmed strike (occurs twice in equippedAttacks + once in buildFinalCharacterObject)
replaceExact(
  'equippedAttacks unarmed strike',
  `          id: 'unarmed-strike',
          name: 'Ataque Desarmado',
          bonus: \`+\${Math.max(0, getMod(finalStats.str) + profBonus)}\`,
          damage: \`1 + \${getMod(finalStats.str)}\`,
          type: 'Contundente',`,
  `          id: 'unarmed-strike',
          name: isSpanish ? 'Ataque Desarmado' : 'Unarmed Strike',
          bonus: \`+\${Math.max(0, getMod(finalStats.str) + profBonus)}\`,
          damage: \`1 + \${getMod(finalStats.str)}\`,
          type: isSpanish ? 'Contundente' : 'Bludgeoning',`,
  true
);

replaceExact(
  'equippedAttacks unarmed strike 12-space indent',
  `            id: 'unarmed-strike',
            name: 'Ataque Desarmado',
            bonus: \`+\${Math.max(0, getMod(finalStats.str) + profBonus)}\`,
            damage: \`1 + \${getMod(finalStats.str)}\`,
            type: 'Contundente',`,
  `            id: 'unarmed-strike',
            name: isSpanish ? 'Ataque Desarmado' : 'Unarmed Strike',
            bonus: \`+\${Math.max(0, getMod(finalStats.str) + profBonus)}\`,
            damage: \`1 + \${getMod(finalStats.str)}\`,
            type: isSpanish ? 'Contundente' : 'Bludgeoning',`,
  true
);

// 4. Localize savingThrowDetails & skillDetails
replaceExact(
  'savingThrowDetails',
  `  // Saving Throw details with numeric bonus
  const savingThrowDetails = useMemo(() => {
    return (['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((stat) => {
      const statName = ABILITY_SCORE_EXPLANATIONS[stat].name;
      const isProficient = savingThrows.includes(statName);
      const statMod = getMod(finalStats[stat]);
      const totalBonus = statMod + (isProficient ? profBonus : 0);
      const bonusStr = totalBonus >= 0 ? \`+\${totalBonus}\` : \`\${totalBonus}\`;
      return {
        stat,
        statName,
        abbreviation: ABILITY_SCORE_EXPLANATIONS[stat].abbreviation,
        isProficient,
        totalBonus,
        bonusStr,
      };
    });
  }, [finalStats, savingThrows, profBonus]);`,
  `  // Saving Throw details with numeric bonus
  const savingThrowDetails = useMemo(() => {
    return (['str', 'dex', 'con', 'int', 'wis', 'cha'] as (keyof AbilityScores)[]).map((stat) => {
      const statName = getAbilityName(stat);
      const esStatName = ABILITY_SCORE_EXPLANATIONS[stat].name;
      const isProficient = savingThrows.includes(esStatName) || savingThrows.includes(statName);
      const statMod = getMod(finalStats[stat]);
      const totalBonus = statMod + (isProficient ? profBonus : 0);
      const bonusStr = totalBonus >= 0 ? \`+\${totalBonus}\` : \`\${totalBonus}\`;
      return {
        stat,
        statName,
        abbreviation: getAbilityAbbr(stat),
        isProficient,
        totalBonus,
        bonusStr,
      };
    });
  }, [finalStats, savingThrows, profBonus, isSpanish]);`
);

replaceExact(
  'skillDetails localization',
  `      let origin = '';
      if (isBg) origin = 'Trasfondo';
      else if (isRace) origin = 'Raza';
      else if (isClass) origin = 'Clase';
      else if (isProficient) origin = 'Dote/Otro';`,
  `      let origin = '';
      if (isBg) origin = isSpanish ? 'Trasfondo' : 'Background';
      else if (isRace) origin = isSpanish ? 'Raza' : 'Race';
      else if (isClass) origin = isSpanish ? 'Clase' : 'Class';
      else if (isProficient) origin = isSpanish ? 'Dote/Otro' : 'Feat/Other';`
);

// 5. Localize completionMetrics items & STEPS
replaceExact('completionMetrics Nombre', `pendingItems.push('Nombre');`, `pendingItems.push(isSpanish ? 'Nombre' : 'Name');`);
replaceExact('completionMetrics Subraza', `pendingItems.push('Subraza');`, `pendingItems.push(isSpanish ? 'Subraza' : 'Subrace');`);
replaceExact('completionMetrics Raza', `pendingItems.push('Raza');`, `pendingItems.push(isSpanish ? 'Raza' : 'Race');`);
replaceExact('completionMetrics Clase', `pendingItems.push('Clase');`, `pendingItems.push(isSpanish ? 'Clase' : 'Class');`);
replaceExact('completionMetrics Atributos', `pendingItems.push('Atributos');`, `pendingItems.push(isSpanish ? 'Atributos' : 'Ability Scores');`);
replaceExact('completionMetrics Trasfondo', `pendingItems.push('Trasfondo');`, `pendingItems.push(isSpanish ? 'Trasfondo' : 'Background');`);
replaceExact('completionMetrics Alineamiento', `pendingItems.push('Alineamiento');`, `pendingItems.push(isSpanish ? 'Alineamiento' : 'Alignment');`);
replaceExact(
  'completionMetrics pendingSummary',
  `pendingSummary: pendingItems.length > 0 ? \`Falta: \${pendingItems.slice(0, 3).join(', ')}\${pendingItems.length > 3 ? '...' : ''}\` : '¡Héroe listo para la batalla!',`,
  `pendingSummary: pendingItems.length > 0 ? \`\${isSpanish ? 'Falta: ' : 'Missing: '}\${pendingItems.slice(0, 3).join(', ')}\${pendingItems.length > 3 ? '...' : ''}\` : (isSpanish ? '¡Héroe listo para la batalla!' : 'Hero ready for battle!'),`
);

const oldStepsRegex = /const STEPS: \{ id: CreatorStep; num: number; title: string; subtitle: string; icon: any \}\[\] = useMemo\(\(\) => \{[\s\S]*?return \[[\s\S]*?\];\s*\}, \[isCaster\]\);/;
if (oldStepsRegex.test(code)) {
  code = code.replace(oldStepsRegex, `const STEPS: { id: CreatorStep; num: number; title: string; subtitle: string; icon: any }[] = useMemo(() => {
    return [
      { id: 'identity', num: 1, title: isSpanish ? 'Identidad' : 'Identity', subtitle: isSpanish ? 'Nombre & Apariencia' : 'Name & Appearance', icon: User },
      { id: 'race', num: 2, title: isSpanish ? 'Raza & Linaje' : 'Race & Species', subtitle: isSpanish ? 'Atributos & Rasgos' : 'Traits & Biology', icon: Award },
      { id: 'background', num: 3, title: isSpanish ? 'Trasfondo & Rol' : 'Background', subtitle: isSpanish ? 'Historia & Convicciones' : 'History & Ability Scores', icon: BookOpen },
      { id: 'class', num: 4, title: isSpanish ? 'Clase & Nivel' : 'Class & Level', subtitle: isSpanish ? 'Clase, Rasgos & Hab.' : 'Features & Proficiencies', icon: Sword },
      { id: 'abilities', num: 5, title: isSpanish ? 'Puntuaciones' : 'Ability Scores', subtitle: isSpanish ? 'Tirada 4d6 & Stats' : 'Roll 4d6 / Standard Array', icon: Dices },
      { id: 'asi_feats', num: 6, title: isSpanish ? 'Dotes & Stats' : 'Feats & ASI', subtitle: isSpanish ? 'Puntuaciones & Dotes' : 'Scores & Feats', icon: Star },
      { id: 'spells', num: 7, title: isSpanish ? 'Conjuración' : 'Spellcasting', subtitle: isCaster ? (isSpanish ? 'Trucos & Grimorio' : 'Cantrips & Spellbook') : (isSpanish ? 'Magia Innata / Opcional' : 'Innate Magic / Optional'), icon: Sparkles },
      { id: 'equipment', num: 8, title: isSpanish ? 'Inventario' : 'Inventory & Equipment', subtitle: isSpanish ? 'Equipo Inicial & Oro' : 'Starting Gear & Gold', icon: Backpack },
      { id: 'review', num: 9, title: isSpanish ? 'Forjar Personaje' : 'Forge Character', subtitle: isSpanish ? 'Ficha Final & Dossier' : 'Final Sheet & Dossier', icon: Check },
    ];
  }, [isCaster, isSpanish]);`);
  replacedCount++;
}

// 6. Top Leather Header + Edition & Language Switchers
replaceExact(
  'Header Title Creador de Héroes',
  `Creador de Héroes {selectedEdition === '5.5e' ? '5.5e' : '5e'}`,
  `{isSpanish ? 'Creador de Héroes' : 'Hero Forge'} {selectedEdition === '5.5e' ? '5.5e' : '5e'}`
);

replaceExact(
  'Header Edition + Language Switcher',
  `                  <span>5.5e (2024)</span>
                  <span className="text-[8px] bg-amber-400 text-stone-900 px-0.5 rounded font-black">PHB</span>
                </button>
              </div>`,
  `                  <span>5.5e (2024)</span>
                  <span className="text-[8px] bg-amber-400 text-stone-900 px-0.5 rounded font-black">PHB</span>
                </button>
              </div>

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
              </div>`
);

replaceExact(
  'Header Draft Badge',
  `<span>📝 Borrador</span>`,
  `<span>📝 {isSpanish ? 'Borrador' : 'Draft'}</span>`
);

replaceExact(
  'Header Center Hero (Nv X)',
  `<span className="text-[#ffd56b] font-fantasy font-semibold truncate max-w-[140px]">{characterName || 'Héroe'} (Nv {characterLevel})</span>`,
  `<span className="text-[#ffd56b] font-fantasy font-semibold truncate max-w-[140px]">{characterName || (isSpanish ? 'Héroe' : 'Hero')} ({isSpanish ? 'Nv' : 'Lv'} {characterLevel})</span>`
);

replaceExact(
  'Header Export PDF Button',
  `<span className="hidden md:inline">{isExportingPdf ? 'Exportando PDF...' : 'Exportar PDF'}</span>`,
  `<span className="hidden md:inline">{isExportingPdf ? (isSpanish ? 'Exportando PDF...' : 'Exporting PDF...') : (isSpanish ? 'Exportar PDF' : 'Export PDF')}</span>`
);

replaceExact(
  'Header Save Draft Button',
  `<span className="hidden sm:inline">Borrador</span>`,
  `<span className="hidden sm:inline">{isSpanish ? 'Borrador' : 'Draft'}</span>`
);

replaceExact(
  'Header Hide/Show Sheet Button',
  `<span className="hidden sm:inline">{isSidebarOpen ? 'Ocultar Hoja' : 'Ver Hoja'}</span>`,
  `<span className="hidden sm:inline">{isSidebarOpen ? (isSpanish ? 'Ocultar Hoja' : 'Hide Sheet') : (isSpanish ? 'Ver Hoja' : 'Show Sheet')}</span>`
);

// 7. Bookmark Flyout Cards
replaceExact(
  'Bookmark dynamicPreview',
  `                let dynamicPreview = '';
                if (step.id === 'identity') {
                  dynamicPreview = characterName.trim() ? characterName : 'Sin definir';
                } else if (step.id === 'race') {
                  dynamicPreview = activeRace ? activeRace.name + (activeSubrace ? \` (\${activeSubrace.name})\` : '') : 'Sin seleccionar';
                } else if (step.id === 'background') {
                  dynamicPreview = activeBackground ? activeBackground.name : 'Sin seleccionar';
                } else if (step.id === 'class') {
                  dynamicPreview = activeClass ? \`\${activeClass.name} Nv\${characterLevel}\` : 'Sin seleccionar';
                } else if (step.id === 'abilities') {
                  const assigned = Object.keys(assignedStats).length;
                  dynamicPreview = \`\${assigned}/6 Atributos listos\`;
                } else if (step.id === 'asi_feats') {
                  dynamicPreview = chosenFeatsList.length > 0 ? \`\${chosenFeatsList.length} Dotes elegidas\` : 'Dotes & Mejoras';
                } else if (step.id === 'spells') {
                  dynamicPreview = !isCaster ? 'Opcional (No lanzador)' : \`\${selectedSpells.length} Conjuros listos\`;
                } else if (step.id === 'equipment') {
                  dynamicPreview = \`\${chosenEquipmentList.length} Objetos • \${startingGoldTotal} po\`;
                } else if (step.id === 'review') {
                  dynamicPreview = \`\${completionMetrics.percentage}% Completado\`;
                }`,
  `                let dynamicPreview = '';
                if (step.id === 'identity') {
                  dynamicPreview = characterName.trim() ? characterName : (isSpanish ? 'Sin definir' : 'Not set');
                } else if (step.id === 'race') {
                  dynamicPreview = activeRace ? (isSpanish ? activeRace.name : ((activeRace as any).nameEn || activeRace.name)) + (activeSubrace ? \` (\${isSpanish ? activeSubrace.name : ((activeSubrace as any).nameEn || activeSubrace.name)})\` : '') : (isSpanish ? 'Sin seleccionar' : 'Unselected');
                } else if (step.id === 'background') {
                  dynamicPreview = activeBackground ? (isSpanish ? activeBackground.name : (activeBackground.nameEn || activeBackground.name)) : (isSpanish ? 'Sin seleccionar' : 'Unselected');
                } else if (step.id === 'class') {
                  dynamicPreview = activeClass ? \`\${isSpanish ? activeClass.name : ((activeClass as any).nameEn || activeClass.name)} \${isSpanish ? 'Nv' : 'Lv'}\${characterLevel}\` : (isSpanish ? 'Sin seleccionar' : 'Unselected');
                } else if (step.id === 'abilities') {
                  const assigned = Object.keys(assignedStats).length;
                  dynamicPreview = isSpanish ? \`\${assigned}/6 Atributos listos\` : \`\${assigned}/6 Scores ready\`;
                } else if (step.id === 'asi_feats') {
                  dynamicPreview = chosenFeatsList.length > 0 ? (isSpanish ? \`\${chosenFeatsList.length} Dotes elegidas\` : \`\${chosenFeatsList.length} Feats chosen\`) : (isSpanish ? 'Dotes & Mejoras' : 'Feats & ASI');
                } else if (step.id === 'spells') {
                  dynamicPreview = !isCaster ? (isSpanish ? 'Opcional (No lanzador)' : 'Optional (Non-caster)') : (isSpanish ? \`\${selectedSpells.length} Conjuros listos\` : \`\${selectedSpells.length} Spells ready\`);
                } else if (step.id === 'equipment') {
                  dynamicPreview = isSpanish ? \`\${chosenEquipmentList.length} Objetos • \${startingGoldTotal} po\` : \`\${chosenEquipmentList.length} Items • \${startingGoldTotal} gp\`;
                } else if (step.id === 'review') {
                  dynamicPreview = isSpanish ? \`\${completionMetrics.percentage}% Completado\` : \`\${completionMetrics.percentage}% Completed\`;
                }`
);

replaceExact(
  'Bookmark Flyout Header',
  `                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffd56b] flex items-center gap-1">
                            <span>Paso {step.num}</span>
                            <span className="text-[#786450]">/ 9</span>
                          </span>
                          {isCurrent ? (
                            <span className="text-[9px] bg-amber-950/90 text-amber-300 border border-amber-500/50 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                              Actual
                            </span>
                          ) : isCompleted ? (
                            <span className="text-[9px] bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              Listo
                            </span>
                          ) : (
                            <span className="text-[9px] bg-[#291e15] text-[#9c8975] border border-[#4d3620] px-1.5 py-0.2 rounded-full font-mono">
                              Pendiente
                            </span>
                          )}`,
  `                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffd56b] flex items-center gap-1">
                            <span>{isSpanish ? 'Paso' : 'Step'} {step.num}</span>
                            <span className="text-[#786450]">/ 9</span>
                          </span>
                          {isCurrent ? (
                            <span className="text-[9px] bg-amber-950/90 text-amber-300 border border-amber-500/50 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                              {isSpanish ? 'Actual' : 'Current'}
                            </span>
                          ) : isCompleted ? (
                            <span className="text-[9px] bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" />
                              {isSpanish ? 'Listo' : 'Ready'}
                            </span>
                          ) : (
                            <span className="text-[9px] bg-[#291e15] text-[#9c8975] border border-[#4d3620] px-1.5 py-0.2 rounded-full font-mono">
                              {isSpanish ? 'Pendiente' : 'Pending'}
                            </span>
                          )}`
);

replaceExact(
  'Bookmark Estado label',
  `<span className="text-[#8c7862] text-[9px] uppercase font-mono">Estado:</span>`,
  `<span className="text-[#8c7862] text-[9px] uppercase font-mono">{isSpanish ? 'Estado:' : 'Status:'}</span>`
);

// 8. Step 1: Identity, Edition Switcher, Avatar, and Alignment
replaceExact(
  'Step 1 Breadcrumb',
  `<strong>Paso 1: Identidad & Apariencia</strong> — Define nombre, nivel, retrato y alineamiento.`,
  `<strong>{isSpanish ? 'Paso 1: Identidad & Apariencia' : 'Step 1: Identity & Appearance'}</strong> — {isSpanish ? 'Define nombre, nivel, retrato y alineamiento.' : 'Define name, level, portrait, and alignment.'}`
);

replaceExact(
  'Step 1 Edition Switcher Box',
  `                        <span className="text-xs font-fantasy font-bold text-[#4a361c] block">
                          Edición de Reglas de Juego:
                        </span>
                        <span className="text-[10px] text-[#7a6448]">
                          {selectedEdition === '5.5e' 
                            ? '✨ Reglas Revisadas 2024: Especies sin ASI fijo, Trasfondos con Dotes de Origen y Subclases a nivel 3.'
                            : '⚔️ Quinta Edición Clásica 2014: Razas con atributos fijos y trasfondos tradicionales.'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center p-1 bg-[#282019] rounded-xl border border-[#b88c32]/60 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedEdition('5e')}
                        className={\`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 \${
                          selectedEdition === '5e'
                            ? 'bg-gradient-to-r from-[#c59b27] to-[#8c672b] text-white shadow-md'
                            : 'text-[#d8c8af] hover:text-white'
                        }\`}
                      >
                        <span>⚔️ 5e Clásico (2014)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedEdition('5.5e')}
                        className={\`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 \${
                          selectedEdition === '5.5e'
                            ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-white shadow-md ring-1 ring-amber-300'
                            : 'text-[#d8c8af] hover:text-white'
                        }\`}
                      >
                        <span>✨ 5.5e Revisado (2024)</span>`,
  `                        <span className="text-xs font-fantasy font-bold text-[#4a361c] block">
                          {isSpanish ? 'Edición de Reglas de Juego:' : 'Game Rules Edition:'}
                        </span>
                        <span className="text-[10px] text-[#7a6448]">
                          {selectedEdition === '5.5e' 
                            ? (isSpanish ? '✨ Reglas Revisadas 2024: Especies sin ASI fijo, Trasfondos con Dotes de Origen y Subclases a nivel 3.' : '✨ 2024 Revised Rules: Species without fixed ASI, Backgrounds with Origin Feats & Level 3 Subclasses.')
                            : (isSpanish ? '⚔️ Quinta Edición Clásica 2014: Razas con atributos fijos y trasfondos tradicionales.' : '⚔️ 2014 Classic 5th Edition: Races with fixed ability score bonuses and traditional backgrounds.')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center p-1 bg-[#282019] rounded-xl border border-[#b88c32]/60 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedEdition('5e')}
                        className={\`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 \${
                          selectedEdition === '5e'
                            ? 'bg-gradient-to-r from-[#c59b27] to-[#8c672b] text-white shadow-md'
                            : 'text-[#d8c8af] hover:text-white'
                        }\`}
                      >
                        <span>{isSpanish ? '⚔️ 5e Clásico (2014)' : '⚔️ 5e Classic (2014)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedEdition('5.5e')}
                        className={\`px-3 py-1 rounded-lg text-xs font-fantasy font-bold transition cursor-pointer flex items-center gap-1.5 \${
                          selectedEdition === '5.5e'
                            ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-white shadow-md ring-1 ring-amber-300'
                            : 'text-[#d8c8af] hover:text-white'
                        }\`}
                      >
                        <span>{isSpanish ? '✨ 5.5e Revisado (2024)' : '✨ 5.5e Revised (2024)'}</span>`
);

replaceExact('Step 1 Nombre del Personaje *', `Nombre del Personaje *`, `{isSpanish ? 'Nombre del Personaje *' : 'Character Name *'}`);
replaceExact('Step 1 placeholder Nombre del personaje', `placeholder="Nombre del personaje..."`, `placeholder={isSpanish ? "Nombre del personaje..." : "Character name..."}`);
replaceExact('Step 1 El nombre con el que te conocerán', `El nombre con el que te conocerán en la campaña.`, `{isSpanish ? 'El nombre con el que te conocerán en la campaña.' : 'The name by which you will be known in the campaign.'}`);
replaceExact('Step 1 Nombre del Jugador (Tú)', `Nombre del Jugador (Tú)`, `{isSpanish ? 'Nombre del Jugador (Tú)' : 'Player Name (You)'}`);
replaceExact('Step 1 placeholder Nombre del jugador', `placeholder="Nombre del jugador..."`, `placeholder={isSpanish ? "Nombre del jugador..." : "Player name..."}`);
replaceExact('Step 1 Para identificar qué jugador', `Para identificar qué jugador controla al héroe.`, `{isSpanish ? 'Para identificar qué jugador controla al héroe.' : 'Identifies which player controls the hero.'}`);
replaceExact('Step 1 Nivel del Personaje *', `Nivel del Personaje *`, `{isSpanish ? 'Nivel del Personaje *' : 'Character Level *'}`);
replaceExact('Step 1 Nivel {lvl} (PB +{pb})', `Nivel {lvl} (PB +{pb})`, `{isSpanish ? 'Nivel' : 'Level'} {lvl} (PB +{pb})`);
replaceExact(
  'Step 1 Tier description',
  `                        {characterLevel <= 4 ? 'Tier 1: Héroes Locales (1-4)' :
                         characterLevel <= 10 ? 'Tier 2: Héroes del Reino (5-10)' :
                         characterLevel <= 16 ? 'Tier 3: Maestros del Reino (11-16)' :
                         'Tier 4: Leyendas del Multiverso (17-20)'}`,
  `                        {characterLevel <= 4 ? (isSpanish ? 'Tier 1: Héroes Locales (1-4)' : 'Tier 1: Local Heroes (1-4)') :
                         characterLevel <= 10 ? (isSpanish ? 'Tier 2: Héroes del Reino (5-10)' : 'Tier 2: Heroes of the Realm (5-10)') :
                         characterLevel <= 16 ? (isSpanish ? 'Tier 3: Maestros del Reino (11-16)' : 'Tier 3: Masters of the Realm (11-16)') :
                         (isSpanish ? 'Tier 4: Leyendas del Multiverso (17-20)' : 'Tier 4: Multiverse Legends (17-20)')}`
);

replaceExact('Step 1 Retrato del Héroe', `Retrato del Héroe`, `{isSpanish ? 'Retrato del Héroe' : 'Hero Portrait'}`);
replaceExact('Step 1 Marco personalizable', `Marco personalizable`, `{isSpanish ? 'Marco personalizable' : 'Customizable frame'}`);
replaceExact('Step 1 Subir', `<span>Subir</span>`, `<span>{isSpanish ? 'Subir' : 'Upload'}</span>`);
replaceExact('Step 1 Marco', `<span>Marco</span>`, `<span>{isSpanish ? 'Marco' : 'Frame'}</span>`);
replaceExact('Step 1 placeholder URL', `placeholder="O pega URL de imagen..."`, `placeholder={isSpanish ? "O pega URL de imagen..." : "Or paste image URL..."}`);
replaceExact('Step 1 JPG, PNG, WEBP, GIF auto-ajustable', `JPG, PNG, WEBP, GIF auto-ajustable`, `{isSpanish ? 'JPG, PNG, WEBP, GIF auto-ajustable' : 'JPG, PNG, WEBP, GIF auto-scalable'}`);

// Step 1 Alignment Box (EXACT match of lines 3142-3179)
replaceExact(
  'Step 1 Alignment Section',
  `                          <label className="block text-[11px] font-bold font-fantasy text-[#4a361c] uppercase">
                            Alineamiento Moral & Filosófico
                          </label>
                          <span className="text-[10px] text-[#8c672b] font-mono font-bold">
                            {alignment ? ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name : 'Sin seleccionar'}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5">
                          {ALIGNMENT_OPTIONS.map((al) => (
                            <div
                              key={al.id}
                              onClick={() => setAlignment(al.id)}
                              className={\`py-0.5 px-1.5 rounded-md border text-left cursor-pointer transition \${
                                alignment === al.id
                                  ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-xs'
                                  : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
                              }\`}
                            >
                              <div className="font-fantasy font-bold text-[11px] flex items-center justify-between">
                                <span className="truncate">{al.name.split(' ')[0]} {al.name.split(' ')[1]}</span>
                                <span className="text-[9px] text-[#8c672b] font-mono font-bold shrink-0">{al.id}</span>
                              </div>
                              <p className="text-[9px] text-[#7a6448] mt-0.5 leading-tight truncate">{al.tagline}</p>
                            </div>
                          ))}
                        </div>

                        {alignment ? (
                          <p className="text-[10.5px] text-[#4a361c] bg-[#fcf9f2] py-1.5 px-2.5 rounded border border-[#dbcbb2] italic leading-relaxed break-words whitespace-normal shadow-2xs">
                            "{ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.description}"
                          </p>
                        ) : (
                          <p className="text-[10.5px] text-[#7a6448] bg-[#fcf9f2] py-1.5 px-2.5 rounded border border-[#dbcbb2] italic leading-relaxed break-words whitespace-normal shadow-2xs">
                            Selecciona el compás ético y moral que mejor represente las convicciones de tu personaje.
                          </p>
                        )}`,
  `                          <label className="block text-[11px] font-bold font-fantasy text-[#4a361c] uppercase">
                            {isSpanish ? 'Alineamiento Moral & Filosófico' : 'Moral & Philosophical Alignment'}
                          </label>
                          <span className="text-[10px] text-[#8c672b] font-mono font-bold">
                            {alignment ? (isSpanish ? ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name : (ALIGNMENT_LABELS_EN[alignment]?.name || alignment)) : (isSpanish ? 'Sin seleccionar' : 'Unselected')}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5">
                          {ALIGNMENT_OPTIONS.map((al) => (
                            <div
                              key={al.id}
                              onClick={() => setAlignment(al.id)}
                              className={\`py-0.5 px-1.5 rounded-md border text-left cursor-pointer transition \${
                                alignment === al.id
                                  ? 'bg-[#ebdcc4] border-2 border-[#8c672b] text-[#2c241b] shadow-xs'
                                  : 'bg-[#fcf9f2] border-[#d6c4aa] text-[#5c4a35] hover:border-[#8c672b]'
                              }\`}
                            >
                              <div className="font-fantasy font-bold text-[11px] flex items-center justify-between">
                                <span className="truncate">{isSpanish ? \`\${al.name.split(' ')[0]} \${al.name.split(' ')[1]}\` : (ALIGNMENT_LABELS_EN[al.id]?.name || al.name)}</span>
                                <span className="text-[9px] text-[#8c672b] font-mono font-bold shrink-0">{isSpanish ? al.id : (ALIGNMENT_LABELS_EN[al.id]?.abbr || al.id)}</span>
                              </div>
                              <p className="text-[9px] text-[#7a6448] mt-0.5 leading-tight truncate">{isSpanish ? al.tagline : (ALIGNMENT_LABELS_EN[al.id]?.tagline || al.tagline)}</p>
                            </div>
                          ))}
                        </div>

                        {alignment ? (
                          <p className="text-[10.5px] text-[#4a361c] bg-[#fcf9f2] py-1.5 px-2.5 rounded border border-[#dbcbb2] italic leading-relaxed break-words whitespace-normal shadow-2xs">
                            "{isSpanish ? ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.description : (ALIGNMENT_LABELS_EN[alignment]?.desc || ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.description)}"
                          </p>
                        ) : (
                          <p className="text-[10.5px] text-[#7a6448] bg-[#fcf9f2] py-1.5 px-2.5 rounded border border-[#dbcbb2] italic leading-relaxed break-words whitespace-normal shadow-2xs">
                            {isSpanish ? 'Selecciona el compás ético y moral que mejor represente las convicciones de tu personaje.' : 'Select the ethical and moral compass that best represents your character\\'s convictions.'}
                          </p>
                        )}`
);

// 9. Step 5 (Ability Scores)
replaceExact(
  'Step 5 Banner',
  `Paso 5: Puntuaciones de Característica (Los 6 Pilares del Héroe)`,
  `{isSpanish ? 'Paso 5: Puntuaciones de Característica (Los 6 Pilares del Héroe)' : 'Step 5: Ability Scores (The 6 Pillars of the Hero)'}`
);
replaceExact(
  'Step 5 Banner Desc',
  `Tus 6 características definen tus aptitudes físicas y mentales. Los bonificadores de tu Raza y Dotes se suman automáticamente al valor base que asignes aquí.`,
  `{isSpanish ? 'Tus 6 características definen tus aptitudes físicas y mentales. Los bonificadores de tu Raza y Dotes se suman automáticamente al valor base que asignes aquí.' : 'Your 6 ability scores define your physical and mental aptitudes. Bonuses from your Race/Background and Feats are automatically added to the base scores you assign here.'}`
);
replaceExact(
  'Step 5 Roller Mode Buttons',
  `<Dices className="w-4 h-4" /> Lanzador Virtual (4d6 x 6)`,
  `<Dices className="w-4 h-4" /> {isSpanish ? 'Lanzador Virtual (4d6 x 6)' : 'Virtual Roller (4d6 x 6)'}`
);
replaceExact(
  'Step 5 Physical Dice Button',
  `🎲 Dados Físicos (Entrada Manual)`,
  `🎲 {isSpanish ? 'Dados Físicos (Entrada Manual)' : 'Physical Dice (Manual Entry)'}`
);
replaceExact(
  'Step 5 Standard Array Button',
  `⚖️ Matriz Estándar (15, 14, 13, 12, 10, 8)`,
  `⚖️ {isSpanish ? 'Matriz Estándar (15, 14, 13, 12, 10, 8)' : 'Standard Array (15, 14, 13, 12, 10, 8)'}`
);
replaceExact(
  'Step 5 Virtual Roller Header',
  `<Dices className="w-4 h-4 text-[#8c672b]" /> Bandeja de Tiradas (4d6 descartando el menor)`,
  `<Dices className="w-4 h-4 text-[#8c672b]" /> {isSpanish ? 'Bandeja de Tiradas (4d6 descartando el menor)' : 'Dice Roll Tray (4d6 drop lowest)'}`
);
replaceExact(
  'Step 5 Virtual Roller Sub',
  `Arrastra cada resultado a una característica abajo, o haz clic en un dado y luego en el atributo.`,
  `{isSpanish ? 'Arrastra cada resultado a una característica abajo, o haz clic en un dado y luego en el atributo.' : 'Drag each result to an ability score below, or click a roll and then click the target ability.'}`
);
replaceExact(
  'Step 5 Roll 4d6 Button',
  `{isRollingAnimation ? 'Lanzando Dados...' : 'Lanzar Dados 4d6'}`,
  `{isRollingAnimation ? (isSpanish ? 'Lanzando Dados...' : 'Rolling Dice...') : (isSpanish ? 'Lanzar Dados 4d6' : 'Roll 4d6 Dice')}`
);
replaceExact(
  'Step 5 Empty Roll Prompt',
  `Aún no has tirado los dados para este personaje. Haz clic en <strong>Lanzar Dados 4d6</strong> arriba o selecciona <strong>Matriz Estándar</strong> para comenzar.`,
  `{isSpanish ? <>Aún no has tirado los dados para este personaje. Haz clic en <strong>Lanzar Dados 4d6</strong> arriba o selecciona <strong>Matriz Estándar</strong> para comenzar.</> : <>You haven't rolled the dice for this character yet. Click <strong>Roll 4d6 Dice</strong> above or select <strong>Standard Array</strong> to begin.</>}`
);
replaceExact(
  'Step 5 Assigned Roll Badge Abbr',
  `<span>{ABILITY_SCORE_EXPLANATIONS[assignedToStat].abbreviation}</span>`,
  `<span>{getAbilityAbbr(assignedToStat)}</span>`,
  true
);
replaceExact(
  'Step 5 Manual Entry Abbr',
  `<span className="text-xs font-bold font-fantasy text-[#4a361c] uppercase block mb-1">
                                  {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}
                                </span>`,
  `<span className="text-xs font-bold font-fantasy text-[#4a361c] uppercase block mb-1">
                                  {getAbilityAbbr(st)}
                                </span>`
);
replaceExact(
  'Step 5 Distribution Title',
  `Distribución y Asignación de Características`,
  `{isSpanish ? 'Distribución y Asignación de Características' : 'Ability Score Distribution & Assignment'}`
);
replaceExact(
  'Step 5 Recommended For Class',
  `                            Recomendado para {activeClass.name}:{' '}
                            <strong className="text-[#8c672b]">
                              {classConfig.recommendedPrimaryStats
                                .map((s) => ABILITY_SCORE_EXPLANATIONS[s].name)
                                .join(', ')}
                            </strong>`,
  `                            {isSpanish ? 'Recomendado para' : 'Recommended for'} {isSpanish ? activeClass.name : ((activeClass as any).nameEn || activeClass.name)}:{' '}
                            <strong className="text-[#8c672b]">
                              {classConfig.recommendedPrimaryStats
                                .map((s) => getAbilityName(s))
                                .join(', ')}
                            </strong>`
);
replaceExact(
  'Step 5 No class recommendation',
  `<span className="italic">Elige una clase en el paso 4 para ver estadísticas primarias recomendadas</span>`,
  `<span className="italic">{isSpanish ? 'Elige una clase en el paso 4 para ver estadísticas primarias recomendadas' : 'Choose a class in Step 4 to see recommended primary ability scores'}</span>`
);
replaceExact(
  'Step 5 Target Stat Card Name & Desc & Primary',
  `                                    <h6 className="font-fantasy font-bold text-sm text-[#4a361c]">
                                      {info.name}
                                    </h6>
                                    {isPrimary && (
                                      <span className="text-[9px] bg-[#8c672b] text-white px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                                        Primario
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#6e5c4a] mt-0.5 leading-relaxed">
                                    {info.description}
                                  </p>`,
  `                                    <h6 className="font-fantasy font-bold text-sm text-[#4a361c]">
                                      {getAbilityName(statKey)}
                                    </h6>
                                    {isPrimary && (
                                      <span className="text-[9px] bg-[#8c672b] text-white px-1.5 py-0.2 rounded font-mono font-bold uppercase">
                                        {isSpanish ? 'Primario' : 'Primary'}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#6e5c4a] mt-0.5 leading-relaxed">
                                    {getAbilityDesc(statKey)}
                                  </p>`
);
replaceExact(
  'Step 5 Target Stat Unassigned/Race Label',
  `                                      : raceBonus > 0
                                      ? \`+\${raceBonus} Raza\`
                                      : 'Sin asignar'}`,
  `                                      : raceBonus > 0
                                      ? (isSpanish ? \`+\${raceBonus} Raza\` : \`+\${raceBonus} Race\`)
                                      : (isSpanish ? 'Sin asignar' : 'Unassigned')}`
);
replaceExact(
  'Step 5 Target Stat Footer',
  `                              {isAssigned ? (
                                <>
                                  <span className="text-[11px] text-[#5c4a35]">
                                    Valor base asignado: <strong className="text-[#8c672b]">{baseVal}</strong>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      unassignStat(statKey);
                                    }}
                                    className="px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                    title="Quitar asignación y devolver tirada"
                                  >
                                    ✕ Desasignar
                                  </button>
                                </>
                              ) : (
                                <span className="text-[11px] text-[#8c672b] italic flex items-center gap-1">
                                  ⬇ {selectedRollIndex !== null ? 'Haz clic aquí para asignar el dado seleccionado' : 'Suelta aquí una tirada (Drag & Drop)'}
                                </span>
                              )}`,
  `                              {isAssigned ? (
                                <>
                                  <span className="text-[11px] text-[#5c4a35]">
                                    {isSpanish ? 'Valor base asignado:' : 'Assigned base score:'} <strong className="text-[#8c672b]">{baseVal}</strong>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      unassignStat(statKey);
                                    }}
                                    className="px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-fantasy font-bold transition flex items-center gap-1 cursor-pointer"
                                    title={isSpanish ? "Quitar asignación y devolver tirada" : "Unassign score"}
                                  >
                                    ✕ {isSpanish ? 'Desasignar' : 'Unassign'}
                                  </button>
                                </>
                              ) : (
                                <span className="text-[11px] text-[#8c672b] italic flex items-center gap-1">
                                  ⬇ {selectedRollIndex !== null ? (isSpanish ? 'Haz clic aquí para asignar el dado seleccionado' : 'Click here to assign selected value') : (isSpanish ? 'Suelta aquí una tirada (Drag & Drop)' : 'Drop a roll here (Drag & Drop)')}
                                </span>
                              )}`
);

// 10. Step 2 (Race & Lineage)
replaceExact(
  'Step 2 Banner',
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 2: Raza y Linaje Ancestral
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tu linaje determina tus bonificadores a las características, tu velocidad básica, sentidos especiales (como visión en la oscuridad) y dones mágicos innatos.
                      </p>`,
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        {isSpanish ? 'Paso 2: Raza y Linaje Ancestral' : 'Step 2: Race & Ancestral Lineage'}
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        {isSpanish ? 'Tu linaje determina tus bonificadores a las características, tu velocidad básica, sentidos especiales (como visión en la oscuridad) y dones mágicos innatos.' : 'Your lineage determines your ability score bonuses, base speed, special senses (such as Darkvision), and innate magical gifts.'}
                      </p>`
);

replaceExact(
  'Step 2 Category Tabs',
  `                            [
                              { id: 'Todos', label: 'Todas las Razas', count: raceCounts.Todos },
                              { id: 'Común', label: 'Comunes (PHB)', count: raceCounts.Común },
                              { id: 'Exótica', label: 'Exóticas', count: raceCounts.Exótica },
                              { id: 'Monstruosa', label: 'Monstruosas', count: raceCounts.Monstruosa },
                              { id: 'Planar', label: 'Planares & Entornos', count: raceCounts.Planar },
                            ] as const`,
  `                            [
                              { id: 'Todos', label: isSpanish ? 'Todas las Razas' : 'All Races', count: raceCounts.Todos },
                              { id: 'Común', label: isSpanish ? 'Comunes (PHB)' : 'Common (PHB)', count: raceCounts.Común },
                              { id: 'Exótica', label: isSpanish ? 'Exóticas' : 'Exotic', count: raceCounts.Exótica },
                              { id: 'Monstruosa', label: isSpanish ? 'Monstruosas' : 'Monstrous', count: raceCounts.Monstruosa },
                              { id: 'Planar', label: isSpanish ? 'Planares & Entornos' : 'Planar & Settings', count: raceCounts.Planar },
                            ] as const`,
  true
);

replaceExact(
  'Step 2 Search & Maximize',
  `placeholder="Buscar raza o linaje..."`,
  `placeholder={isSpanish ? "Buscar raza o linaje..." : "Search race or lineage..."}`,
  true
);
replaceExact(
  'Step 2 Maximize Button',
  `<span>Maximizar Catálogo</span>`,
  `<span>{isSpanish ? 'Maximizar Catálogo' : 'Maximize Catalog'}</span>`,
  true
);

// 11. Step 3 (Background)
replaceExact(
  'Step 3 Banner',
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 3: Tu Trasfondo Oficial (99 Disponibles)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tu trasfondo representa de dónde vienes y qué hacías antes de convertirte en aventurero. Te otorga <strong>2 competencias fijas</strong>, idiomas o herramientas y un <strong>Rasgo Especial de Trasfondo</strong> para interactuar con el mundo.
                      </p>`,
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        {isSpanish ? 'Paso 3: Tu Trasfondo Oficial (99 Disponibles)' : 'Step 3: Official Background'}
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        {isSpanish ? <>Tu trasfondo representa de dónde vienes y qué hacías antes de convertirte en aventurero. Te otorga <strong>2 competencias fijas</strong>, idiomas o herramientas y un <strong>Rasgo Especial de Trasfondo</strong> para interactuar con el mundo.</> : <>Your background reveals where you came from and your place in the world before becoming an adventurer, granting skill and tool proficiencies plus an origin feature.</>}
                      </p>`
);

// 12. Step 4 (Class & Level)
replaceExact(
  'Step 4 Banner',
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 4: Tu Clase, Nivel, Estilos & Competencias
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tu clase determina tu profesión heroica, tu dado de vida, tus competencias con armas y armaduras y la totalidad de tus poderes especiales. Puedes inspeccionar la tabla completa nivel a nivel para planificar tu personaje a futuro.
                      </p>`,
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        {isSpanish ? 'Paso 4: Tu Clase, Nivel, Estilos & Competencias' : 'Step 4: Class, Level, Styles & Proficiencies'}
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        {isSpanish ? 'Tu clase determina tu profesión heroica, tu dado de vida, tus competencias con armas y armaduras y la totalidad de tus poderes especiales. Puedes inspeccionar la tabla completa nivel a nivel para planificar tu personaje a futuro.' : 'Your class defines your heroic calling, Hit Die, weapon and armor proficiencies, and special features. Inspect the full 1-20 progression table to plan your build.'}
                      </p>`
);
replaceExact(
  'Step 4 Starting Level Header',
  `                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                          Nivel Inicial del Personaje
                        </h5>
                        <span className="text-[11px] text-[#7a6448]">
                          La mayoría de las campañas inician en nivel 1, pero puedes empezar a niveles mayores.
                        </span>`,
  `                        <h5 className="font-fantasy font-bold text-xs text-[#4a361c] uppercase">
                          {isSpanish ? 'Nivel Inicial del Personaje' : 'Starting Character Level'}
                        </h5>
                        <span className="text-[11px] text-[#7a6448]">
                          {isSpanish ? 'La mayoría de las campañas inician en nivel 1, pero puedes empezar a niveles mayores.' : 'Most campaigns start at Level 1, or you can build a higher-level adventurer.'}
                        </span>`
);
replaceExact(
  'Step 4 Select Class Prompt',
  `Selecciona una clase de la lista para ver sus subclases, progresión y habilidades.`,
  `{isSpanish ? 'Selecciona una clase de la lista para ver sus subclases, progresión y habilidades.' : 'Select a class from the list above to configure its subclasses, progression, and skills.'}`
);

// 13. Step 8 (Equipment)
replaceExact(
  'Step 8 Banner',
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        Paso 8: Inventario, Equipo Inicial & Riqueza
                      </h4>`,
  `                      <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                        {isSpanish ? 'Paso 8: Inventario, Equipo Inicial & Riqueza' : 'Step 8: Inventory, Starting Equipment & Wealth'}
                      </h4>`
);

// 14. Step 9 (Review & Forge)
replaceExact(
  'Step 9 Banner',
  `                        <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                          ¡Todo listo para comenzar la aventura!
                        </h4>
                        <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                          Revisa la ficha definitiva de tu aventurero antes de forjarla. Al presionar <strong>"¡Forjar Personaje!"</strong>, tu héroe se integrará de inmediato a la campaña activa con todas sus estadísticas, rasgos, conjuros y equipo.
                        </p>`,
  `                        <h4 className="font-fantasy font-bold text-sm text-[#4a361c] uppercase tracking-wide">
                          {isSpanish ? '¡Todo listo para comenzar la aventura!' : 'Ready to Begin the Adventure!'}
                        </h4>
                        <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                          {isSpanish ? <>Revisa la ficha definitiva de tu aventurero antes de forjarla. Al presionar <strong>"¡Forjar Personaje!"</strong>, tu héroe se integrará de inmediato a la campaña activa con todas sus estadísticas, rasgos, conjuros y equipo.</> : <>Review your adventurer's final character sheet before forging. Press <strong>"Forge Character!"</strong> to save your hero with all stats, traits, spells, and equipment.</>}
                        </p>`
);
replaceExact(
  'Step 9 Export Official Sheet Button',
  `<span>{isExportingPdf ? 'Generando PDF...' : 'Exportar Hoja Oficial (PDF)'}</span>`,
  `<span>{isExportingPdf ? (isSpanish ? 'Generando PDF...' : 'Generating PDF...') : (isSpanish ? 'Exportar Hoja Oficial (PDF)' : 'Export Official Sheet (PDF)')}</span>`
);
replaceExact(
  'Step 9 Dossier Ability Abbr',
  `                                <span className="font-fantasy font-bold text-xs text-[#4a361c] block">
                                  {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}
                                </span>`,
  `                                <span className="font-fantasy font-bold text-xs text-[#4a361c] block">
                                  {getAbilityAbbr(st)}
                                </span>`
);
replaceExact(
  'Step 9 Skills Abbr & Name',
  `                                  <span className="font-bold text-[#4a361c] truncate block">
                                    {sk.name}{' '}
                                    <span className="text-[10px] text-[#7a6448] font-mono font-normal">
                                      ({ABILITY_SCORE_EXPLANATIONS[sk.ability].abbreviation})
                                    </span>
                                  </span>`,
  `                                  <span className="font-bold text-[#4a361c] truncate block">
                                    {displaySkillName(sk.name)}{' '}
                                    <span className="text-[10px] text-[#7a6448] font-mono font-normal">
                                      ({getAbilityAbbr(sk.ability)})
                                    </span>
                                  </span>`
);

// 15. Bottom Navigation Bar (Previous / Step X of 9 / Save Draft / Next Step / Forge)
replaceExact(
  'Bottom Nav Previous Step',
  `<ChevronLeft className="w-4 h-4" /> Paso Anterior`,
  `<ChevronLeft className="w-4 h-4" /> {isSpanish ? 'Paso Anterior' : 'Previous Step'}`
);
replaceExact(
  'Bottom Nav Step X of Y',
  `Paso {currentStepIndex + 1} de {STEPS.length}`,
  `{isSpanish ? 'Paso' : 'Step'} {currentStepIndex + 1} {isSpanish ? 'de' : 'of'} {STEPS.length}`
);
replaceExact(
  'Bottom Nav Save Draft',
  `<span className="hidden md:inline">Guardar Borrador</span>`,
  `<span className="hidden md:inline">{isSpanish ? 'Guardar Borrador' : 'Save Draft'}</span>`
);
replaceExact(
  'Bottom Nav Next Step',
  `<span>Siguiente Paso</span> <ChevronRight className="w-4 h-4" />`,
  `<span>{isSpanish ? 'Siguiente Paso' : 'Next Step'}</span> <ChevronRight className="w-4 h-4" />`
);
replaceExact(
  'Bottom Nav Forge Character',
  `                    {initialCharacter && !initialCharacter.isDraft
                      ? 'Guardar Cambios'
                      : '¡Forjar Personaje!'}`,
  `                    {initialCharacter && !initialCharacter.isDraft
                      ? (isSpanish ? 'Guardar Cambios' : 'Save Changes')
                      : (isSpanish ? '¡Forjar Personaje!' : 'Forge Character!')}`
);

// 16. RIGHT PERSISTENT SIDEBAR: LIVE SHEET PREVIEW (100% Localization)
replaceExact(
  'Floating Collapsed Hoja en Vivo Button',
  `              <span className="text-[9px] font-fantasy font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
                Hoja en Vivo
              </span>`,
  `              <span className="text-[9px] font-fantasy font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
                {isSpanish ? 'Hoja en Vivo' : 'Live Sheet'}
              </span>`
);

replaceExact(
  'Live Sheet Header & Collapse',
  `                <div className="flex items-center gap-2 min-w-0">
                  <Scroll className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />
                  <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-[#ffd56b] truncate">
                    Hoja en Vivo
                  </span>
                  <span className="text-[9.5px] bg-[#24170d] text-[#dfbe7e] font-mono font-bold px-1.5 py-0.2 rounded border border-[#8c672b]/60 shadow-xs">
                    Nv{characterLevel} • +{profBonus}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-[#dfbe7e] hover:text-[#ffd56b] hover:bg-[#3d2714] rounded-md transition cursor-pointer flex items-center gap-0.5 text-[10px] font-fantasy active:scale-95"
                  title="Colapsar previsualización para tener más espacio"
                >
                  <span className="hidden sm:inline">Colapsar</span>
                  <ChevronRight className="w-4 h-4 text-[#ffd56b]" />
                </button>`,
  `                <div className="flex items-center gap-2 min-w-0">
                  <Scroll className="w-3.5 h-3.5 text-[#ffd56b] shrink-0" />
                  <span className="text-[11px] font-fantasy font-bold uppercase tracking-wider text-[#ffd56b] truncate">
                    {isSpanish ? 'Hoja en Vivo' : 'Live Sheet'}
                  </span>
                  <span className="text-[9.5px] bg-[#24170d] text-[#dfbe7e] font-mono font-bold px-1.5 py-0.2 rounded border border-[#8c672b]/60 shadow-xs">
                    {isSpanish ? 'Nv' : 'Lv'}{characterLevel} • +{profBonus}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-[#dfbe7e] hover:text-[#ffd56b] hover:bg-[#3d2714] rounded-md transition cursor-pointer flex items-center gap-0.5 text-[10px] font-fantasy active:scale-95"
                  title={isSpanish ? "Colapsar previsualización para tener más espacio" : "Collapse preview for more space"}
                >
                  <span className="hidden sm:inline">{isSpanish ? 'Colapsar' : 'Collapse'}</span>
                  <ChevronRight className="w-4 h-4 text-[#ffd56b]" />
                </button>`
);

replaceExact(
  'Live Sheet Hero Identity Card',
  `                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-fantasy font-bold text-sm text-[#241308] truncate tracking-wide">
                      {characterName || 'Sin Nombre'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setAvatarModalOpen(true)}
                      className="text-[9px] font-fantasy font-bold text-[#8c672b] hover:text-[#5c3e1e] underline cursor-pointer shrink-0"
                    >
                      Marco 🎨
                    </button>
                  </div>
                  <p className="text-[11px] text-[#8c521f] font-mono font-bold truncate mt-0.5">
                    {activeRace ? activeRace.name : 'Raza sin elegir'} •{' '}
                    {activeClass
                      ? isSubclassUnlocked && activeSubclass
                        ? \`\${activeClass.name} (\${activeSubclass.name.split('(')[0].trim()})\`
                        : activeClass.name
                      : 'Clase sin elegir'}
                  </p>
                  <p className="text-[10px] text-[#6b472e] truncate">
                    {activeBackground ? activeBackground.name : 'Trasfondo sin elegir'} •{' '}
                    {alignment
                      ? ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name.split(' ')[0] || alignment
                      : 'Alineamiento'}
                  </p>
                </div>`,
  `                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-fantasy font-bold text-sm text-[#241308] truncate tracking-wide">
                      {characterName || (isSpanish ? 'Sin Nombre' : 'Unnamed')}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setAvatarModalOpen(true)}
                      className="text-[9px] font-fantasy font-bold text-[#8c672b] hover:text-[#5c3e1e] underline cursor-pointer shrink-0"
                    >
                      {isSpanish ? 'Marco 🎨' : 'Frame 🎨'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#8c521f] font-mono font-bold truncate mt-0.5">
                    {activeRace ? (isSpanish ? activeRace.name : ((activeRace as any).nameEn || activeRace.name)) : (isSpanish ? 'Raza sin elegir' : 'No race selected')} •{' '}
                    {activeClass
                      ? isSubclassUnlocked && activeSubclass
                        ? \`\${isSpanish ? activeClass.name : ((activeClass as any).nameEn || activeClass.name)} (\${isSpanish ? activeSubclass.name.split('(')[0].trim() : ((activeSubclass as any).nameEn || activeSubclass.name)})\`
                        : (isSpanish ? activeClass.name : ((activeClass as any).nameEn || activeClass.name))
                      : (isSpanish ? 'Clase sin elegir' : 'No class selected')}
                  </p>
                  <p className="text-[10px] text-[#6b472e] truncate">
                    {activeBackground ? (isSpanish ? activeBackground.name : (activeBackground.nameEn || activeBackground.name)) : (isSpanish ? 'Trasfondo sin elegir' : 'No background selected')} •{' '}
                    {alignment
                      ? (isSpanish ? (ALIGNMENT_OPTIONS.find((a) => a.id === alignment)?.name.split('(')[0].trim() || alignment) : (ALIGNMENT_LABELS_EN[alignment]?.name || alignment))
                      : (isSpanish ? 'Alineamiento' : 'Alignment')}
                  </p>
                </div>`
);

// Live Sheet Tabs
replaceExact('Live Sheet Tab Combat', `⚔️ Combate`, `⚔️ {isSpanish ? 'Combate' : 'Combat'}`);
replaceExact('Live Sheet Tab Skills', `🎯 Hab ({totalSkills.length})`, `🎯 {isSpanish ? 'Hab' : 'Skills'} ({totalSkills.length})`);
replaceExact('Live Sheet Tab Traits', `📜 Rasgos`, `📜 {isSpanish ? 'Rasgos' : 'Traits'}`);
replaceExact('Live Sheet Tab Spells', `🔮 Magia ({selectedSpells.length})`, `🔮 {isSpanish ? 'Magia' : 'Spells'} ({selectedSpells.length})`);
replaceExact('Live Sheet Tab Inventory', `🎒 Equipo`, `🎒 {isSpanish ? 'Equipo' : 'Equipment'}`);

// Live Sheet Combat Metrics Grid
replaceExact(
  'Live Sheet Armor Shield',
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Armadura</span>`,
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">{isSpanish ? 'Armadura' : 'Armor'}</span>`
);
replaceExact(
  'Live Sheet CA {calculatedAc}',
  `<span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">CA {calculatedAc}</span>`,
  `<span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">{isSpanish ? 'CA' : 'AC'} {calculatedAc}</span>`
);
replaceExact(
  'Live Sheet Initiative Crest',
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Iniciativa</span>`,
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">{isSpanish ? 'Iniciativa' : 'Initiative'}</span>`
);
replaceExact(
  'Live Sheet Prof Crest',
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">Comp.</span>`,
  `<span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider mb-0.5">{isSpanish ? 'Comp.' : 'Prof.'}</span>`
);
replaceExact(
  'Live Sheet +profBonus Bono',
  `<span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">+{profBonus} Bono</span>`,
  `<span className="text-[9px] font-fantasy font-bold text-[#3d2714] mt-0.5">+{profBonus} {isSpanish ? 'Bono' : 'Bonus'}</span>`
);

// Live Sheet HP Vial
replaceExact(
  'Live Sheet HP Vial Header & PG',
  `                    <div className="flex items-center justify-between text-xs font-fantasy font-bold text-[#4a361c]">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-600 fill-red-500" />
                        <span>PUNTOS DE GOLPE (PG MÁX)</span>
                      </span>
                      <span className="font-mono text-sm text-[#2e7d32] font-bold">
                        {activeClass ? \`\${calculatedMaxHp} / \${calculatedMaxHp} PG\` : '0 PG'}
                      </span>
                    </div>`,
  `                    <div className="flex items-center justify-between text-xs font-fantasy font-bold text-[#4a361c]">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-red-600 fill-red-500" />
                        <span>{isSpanish ? 'PUNTOS DE GOLPE (PG MÁX)' : 'HIT POINTS (MAX HP)'}</span>
                      </span>
                      <span className="font-mono text-sm text-[#2e7d32] font-bold">
                        {activeClass ? \`\${calculatedMaxHp} / \${calculatedMaxHp} \${isSpanish ? 'PG' : 'HP'}\` : (isSpanish ? '0 PG' : '0 HP')}
                      </span>
                    </div>`
);
replaceExact(
  'Live Sheet Hit Die & CON Mod',
  `                    <div className="flex items-center justify-between text-[10px] text-[#7a5538] font-mono">
                      <span>Dado de Golpe: 1d{activeClass ? activeClass.hitDie : 8}</span>
                      <span>Mod CON: {getModStr(finalStats.con)}</span>
                    </div>`,
  `                    <div className="flex items-center justify-between text-[10px] text-[#7a5538] font-mono">
                      <span>{isSpanish ? 'Dado de Golpe:' : 'Hit Die:'} 1d{activeClass ? activeClass.hitDie : 8}</span>
                      <span>{isSpanish ? 'Mod CON:' : 'CON Mod:'} {getModStr(finalStats.con)}</span>
                    </div>`
);

// Live Sheet Ability Scores Medallions
replaceExact(
  'Live Sheet Ability Scores Header',
  `                    <div className="flex items-center justify-between text-[10px] text-[#7a6448] uppercase font-mono border-b border-[#e2d5c2] pb-1 font-bold">
                      <span className="font-fantasy tracking-wider">Atributos & Modificadores</span>
                      <span className="text-[9px]">Base + Bonos</span>
                    </div>`,
  `                    <div className="flex items-center justify-between text-[10px] text-[#7a6448] uppercase font-mono border-b border-[#e2d5c2] pb-1 font-bold">
                      <span className="font-fantasy tracking-wider">{isSpanish ? 'Atributos & Modificadores' : 'Ability Scores & Modifiers'}</span>
                      <span className="text-[9px]">{isSpanish ? 'Base + Bonos' : 'Base + Bonuses'}</span>
                    </div>`
);
replaceExact(
  'Live Sheet Ability Medallion Abbr',
  `                            <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider">
                              {ABILITY_SCORE_EXPLANATIONS[st].abbreviation}
                            </span>`,
  `                            <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase tracking-wider">
                              {getAbilityAbbr(st)}
                            </span>`
);

// Live Sheet Saving Throws
replaceExact(
  'Live Sheet Saving Throws Header',
  `                    <div className="flex items-center justify-between text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-[#8c672b]" /> Tiradas de Salvación
                      </span>
                      <span className="text-[9px] text-[#7a6448] font-mono">★ = Competente</span>
                    </div>`,
  `                    <div className="flex items-center justify-between text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Tiradas de Salvación' : 'Saving Throws'}
                      </span>
                      <span className="text-[9px] text-[#7a6448] font-mono">{isSpanish ? '★ = Competente' : '★ = Proficient'}</span>
                    </div>`
);

// Live Sheet Weapons & Attacks
replaceExact(
  'Live Sheet Weapons & Attacks Header',
  `                      <span className="flex items-center gap-1">
                        <Sword className="w-3.5 h-3.5 text-[#8c672b]" /> Armas & Ataques
                      </span>`,
  `                      <span className="flex items-center gap-1">
                        <Sword className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Armas & Ataques' : 'Weapons & Attacks'}
                      </span>`
);
replaceExact(
  'Live Sheet No weapons equipped',
  `<p className="text-[10px] text-[#7a6448] italic py-1 text-center">Sin armas equipadas</p>`,
  `<p className="text-[10px] text-[#7a6448] italic py-1 text-center">{isSpanish ? 'Sin armas equipadas' : 'No weapons equipped'}</p>`
);
replaceExact(
  'Live Sheet Attack Name & Type',
  `                                <span className="font-bold text-[#4a361c] truncate">{att.name}</span>
                              </div>
                              <span className="font-mono text-[#8c672b] font-bold text-[11px] shrink-0">
                                {att.bonus} • {att.damage} ({att.type})
                              </span>`,
  `                                <span className="font-bold text-[#4a361c] truncate">{displayAttackName(att.name)}</span>
                              </div>
                              <span className="font-mono text-[#8c672b] font-bold text-[11px] shrink-0">
                                {att.bonus} • {att.damage} ({displayAttackType(att.type)})
                              </span>`
);

// Live Sheet Tab 2: Skills
replaceExact(
  'Live Sheet Skills Tab Header',
  `                    <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      Habilidades 5e
                    </span>
                    <div className="flex items-center gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setLiveSkillFilter('all')}
                        className={\`px-2 py-0.5 rounded font-bold transition cursor-pointer \${
                          liveSkillFilter === 'all'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                        }\`}
                      >
                        Todas (18)
                      </button>
                      <button
                        type="button"
                        onClick={() => setLiveSkillFilter('proficient')}
                        className={\`px-2 py-0.5 rounded font-bold transition cursor-pointer \${
                          liveSkillFilter === 'proficient'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                        }\`}
                      >
                        Competentes ({totalSkills.length})
                      </button>`,
  `                    <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase">
                      {isSpanish ? 'Habilidades' : 'Skills'}
                    </span>
                    <div className="flex items-center gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setLiveSkillFilter('all')}
                        className={\`px-2 py-0.5 rounded font-bold transition cursor-pointer \${
                          liveSkillFilter === 'all'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                        }\`}
                      >
                        {isSpanish ? 'Todas (18)' : 'All (18)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setLiveSkillFilter('proficient')}
                        className={\`px-2 py-0.5 rounded font-bold transition cursor-pointer \${
                          liveSkillFilter === 'proficient'
                            ? 'bg-[#8c672b] text-white shadow-xs'
                            : 'bg-white text-[#4a361c] border border-[#d6c4aa]'
                        }\`}
                      >
                        {isSpanish ? \`Competentes (\${totalSkills.length})\` : \`Proficient (\${totalSkills.length})\`}
                      </button>`
);

replaceExact(
  'Live Sheet Skill Item Name & Abbr',
  `                                <span className="text-[#4a361c] font-bold truncate block">
                                  {sk.name}{' '}
                                  <span className="text-[9px] text-[#7a6448] font-mono font-normal">
                                    ({ABILITY_SCORE_EXPLANATIONS[sk.ability].abbreviation})
                                  </span>
                                </span>
                                <span className="text-[8px] text-[#7a6448] block">
                                  {sk.isExpertise
                                    ? '[Pericia x2]'
                                    : sk.isProficient
                                    ? \`[\${sk.origin}]\`
                                    : 'Base'}
                                </span>`,
  `                                <span className="text-[#4a361c] font-bold truncate block">
                                  {displaySkillName(sk.name)}{' '}
                                  <span className="text-[9px] text-[#7a6448] font-mono font-normal">
                                    ({getAbilityAbbr(sk.ability)})
                                  </span>
                                </span>
                                <span className="text-[8px] text-[#7a6448] block">
                                  {sk.isExpertise
                                    ? (isSpanish ? '[Pericia x2]' : '[Expertise x2]')
                                    : sk.isProficient
                                    ? \`[\${sk.origin}]\`
                                    : 'Base'}
                                </span>`
);

// Live Sheet Tab 5: Inventory
replaceExact(
  'Live Sheet Inventory Gold & Header',
  `                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-[#8c672b]" />
                      <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">Oro Inicial</span>
                    </div>
                    <span className="font-mono text-base font-bold text-[#b45309]">
                      {startingGoldTotal} po
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                      <Backpack className="w-3.5 h-3.5 text-[#8c672b]" /> Equipo Inicial & Posesiones
                    </span>`,
  `                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-[#8c672b]" />
                      <span className="text-xs font-fantasy font-bold text-[#4a361c] uppercase">{isSpanish ? 'Oro Inicial' : 'Starting Gold'}</span>
                    </div>
                    <span className="font-mono text-base font-bold text-[#b45309]">
                      {startingGoldTotal} {isSpanish ? 'po' : 'gp'}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="bg-[#fbf6ed] rounded-xl p-2.5 border border-[#c4a982] space-y-1.5 shadow-2xs">
                    <span className="text-[10px] font-fantasy font-bold text-[#4a361c] uppercase flex items-center gap-1">
                      <Backpack className="w-3.5 h-3.5 text-[#8c672b]" /> {isSpanish ? 'Equipo Inicial & Posesiones' : 'Starting Equipment & Possessions'}
                    </span>`
);
replaceExact(
  'Live Sheet Equipped/Backpack Badge',
  `{isEquipped ? 'Equipado' : 'Mochila'}`,
  `{isEquipped ? (isSpanish ? 'Equipado' : 'Equipped') : (isSpanish ? 'Mochila' : 'Backpack')}`
);

// Live Sheet Footer
replaceExact(
  'Live Sheet Footer Synced & Hero (Nv X)',
  `            {/* Sleek Bottom Bar with Live Sync Indicator */}
            <div className="h-6 w-full shrink-0 flex items-center justify-between px-3 bg-[#f5ede0]/95 border-t border-[#d6c4aa] text-[9px] text-[#7a6448] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sincronizado en Vivo</span>
              </span>
              <span className="truncate max-w-[150px]">{characterName || 'Héroe'} (Nv {characterLevel})</span>
            </div>`,
  `            {/* Sleek Bottom Bar with Live Sync Indicator */}
            <div className="h-6 w-full shrink-0 flex items-center justify-between px-3 bg-[#f5ede0]/95 border-t border-[#d6c4aa] text-[9px] text-[#7a6448] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isSpanish ? 'Sincronizado en Vivo' : 'Live Synced'}</span>
              </span>
              <span className="truncate max-w-[150px]">{characterName || (isSpanish ? 'Héroe' : 'Hero')} ({isSpanish ? 'Nv' : 'Lv'} {characterLevel})</span>
            </div>`
);

fs.writeFileSync(modalPath, code);
console.log(`[DONE] Replaced ${replacedCount} sections. Missed targets: ${missedTargets.length}`);
if (missedTargets.length > 0) {
  console.error('Missed targets:', missedTargets);
  process.exit(1);
}
