import fs from 'fs';
import path from 'path';

const filePath = 'C:/Users/natal/.gemini/antigravity/scratch/dnd-character-forge/src/components/CharacterCreatorModal.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Imports
const importMarker = "import { SkillTooltip } from './SkillTooltip';";
const newImports = `import { SkillTooltip } from './SkillTooltip';
import { Creator2024SpeciesPicker } from './Creator2024SpeciesPicker';
import { Creator2024BackgroundPicker } from './Creator2024BackgroundPicker';
import { Creator2024WeaponMasteryPicker } from './Creator2024WeaponMasteryPicker';
import {
  DND_2024_SPECIES,
  DND_2024_BACKGROUNDS,
  DND_2024_FEATS,
  DND_2024_CLASSES,
  DND_2024_WEAPONS,
  DND_2024_WEAPON_MASTERIES,
} from '../data/dnd2024';`;

if (!code.includes('Creator2024SpeciesPicker')) {
  code = code.replace(importMarker, newImports);
  console.log('Added 2024 imports');
}

// 2. State variables inside CharacterCreatorModal
const stateMarker = "const [currentStep, setCurrentStep] = useState<CreatorStep>(initState?.currentStep || 'identity');";
const newState = `const [currentStep, setCurrentStep] = useState<CreatorStep>(initState?.currentStep || 'identity');
  const [selectedEdition, setSelectedEdition] = useState<'5e' | '5.5e'>(
    (initState as any)?.selectedEdition || (initialCharacter?.creatorState as any)?.selectedEdition || (initialCharacter?.edition) || '5e'
  );
  const [bgAsiMode2024, setBgAsiMode2024] = useState<'+2+1' | '+1+1+1'>(
    (initState as any)?.bgAsiMode2024 || (initialCharacter?.creatorState as any)?.bgAsiMode2024 || '+2+1'
  );
  const [bgAsiStatPlusTwo, setBgAsiStatPlusTwo] = useState<keyof AbilityScores | ''>(
    (initState as any)?.bgAsiStatPlusTwo || (initialCharacter?.creatorState as any)?.bgAsiStatPlusTwo || ''
  );
  const [bgAsiStatPlusOne, setBgAsiStatPlusOne] = useState<keyof AbilityScores | ''>(
    (initState as any)?.bgAsiStatPlusOne || (initialCharacter?.creatorState as any)?.bgAsiStatPlusOne || ''
  );
  const [selectedWeaponMasteries, setSelectedWeaponMasteries] = useState<string[]>(
    (initState as any)?.selectedWeaponMasteries || (initialCharacter?.creatorState as any)?.selectedWeaponMasteries || (initialCharacter?.weaponMasteries) || []
  );`;

if (!code.includes('selectedEdition, setSelectedEdition')) {
  code = code.replace(stateMarker, newState);
  console.log('Added 2024 states');
}

// 3. activeSpecies2024, activeBackground2024, background2024Bonuses, and updated activeRace & activeBackground
const activeRaceMarker = `  const activeRace = useMemo(() => {
    if (!selectedRaceId) return null;
    return WIKIDOT_RACES.find((r) => r.id === selectedRaceId) || null;
  }, [selectedRaceId]);`;

const newActiveRace = `  const activeSpecies2024 = useMemo(() => {
    if (selectedEdition !== '5.5e' || !selectedRaceId) return null;
    return DND_2024_SPECIES.find((s) => s.id === selectedRaceId) || null;
  }, [selectedEdition, selectedRaceId]);

  const activeBackground2024 = useMemo(() => {
    if (selectedEdition !== '5.5e' || !selectedBackgroundId) return null;
    return DND_2024_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || null;
  }, [selectedEdition, selectedBackgroundId]);

  const background2024Bonuses = useMemo(() => {
    const bonuses: Record<keyof AbilityScores, number> = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    if (selectedEdition !== '5.5e' || !activeBackground2024) return bonuses;
    const allowed = activeBackground2024.abilityScores;
    if (bgAsiMode2024 === '+2+1') {
      const st2 = (bgAsiStatPlusTwo && allowed.includes(bgAsiStatPlusTwo) ? bgAsiStatPlusTwo : allowed[0]) as keyof AbilityScores;
      const validSt1 = allowed.filter((s) => s !== st2);
      const st1 = (bgAsiStatPlusOne && bgAsiStatPlusOne !== st2 && allowed.includes(bgAsiStatPlusOne) ? bgAsiStatPlusOne : (validSt1[0] || allowed[1])) as keyof AbilityScores;
      if (st2 in bonuses) bonuses[st2] += 2;
      if (st1 in bonuses) bonuses[st1] += 1;
    } else {
      allowed.forEach((st) => {
        if (st in bonuses) bonuses[st as keyof AbilityScores] += 1;
      });
    }
    return bonuses;
  }, [selectedEdition, activeBackground2024, bgAsiMode2024, bgAsiStatPlusTwo, bgAsiStatPlusOne]);

  useEffect(() => {
    if (selectedEdition === '5.5e') {
      if (!DND_2024_SPECIES.some((s) => s.id === selectedRaceId)) {
        setSelectedRaceId(DND_2024_SPECIES[0].id);
        setSelectedSubraceId('');
      }
      if (!DND_2024_BACKGROUNDS.some((b) => b.id === selectedBackgroundId)) {
        setSelectedBackgroundId(DND_2024_BACKGROUNDS[0].id);
      }
    }
  }, [selectedEdition]);

  const activeRace = useMemo(() => {
    if (!selectedRaceId) return null;
    if (selectedEdition === '5.5e') {
      const sp = DND_2024_SPECIES.find((s) => s.id === selectedRaceId);
      if (sp) {
        return {
          id: sp.id,
          name: sp.name,
          category: 'PHB 2024',
          description: sp.description,
          traits: sp.traits,
          size: sp.size,
          speed: sp.speed,
          languages: ['Común'],
          abilityScoreBonuses: {},
          subraces: [],
        } as any;
      }
    }
    return WIKIDOT_RACES.find((r) => r.id === selectedRaceId) || null;
  }, [selectedRaceId, selectedEdition]);`;

if (code.includes(activeRaceMarker)) {
  code = code.replace(activeRaceMarker, newActiveRace);
  console.log('Replaced activeRace with 2024 support');
}

// activeBackground
const activeBackgroundMarker = `  const activeBackground = useMemo(() => {
    if (!selectedBackgroundId) return null;
    return WIKIDOT_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || null;
  }, [selectedBackgroundId]);`;

const newActiveBackground = `  const activeBackground = useMemo(() => {
    if (!selectedBackgroundId) return null;
    if (selectedEdition === '5.5e') {
      const bg = DND_2024_BACKGROUNDS.find((b) => b.id === selectedBackgroundId);
      if (bg) {
        return {
          id: bg.id,
          name: bg.name,
          nameEn: bg.nameEn,
          orientation: 'PHB 2024',
          description: \`\${bg.description}\\n\\n**Dote de Origen (2024):** \${bg.feat}\\n**Atributos Permitidos:** \${bg.abilityScores.map((a) => a.toUpperCase()).join(', ')}\`,
          skillProficiencies: bg.skillProficiencies.split(',').map((s) => s.trim()),
          toolProficiencies: [bg.toolProficiency],
          equipmentText: bg.equipment,
          fixedLanguages: [],
          copper: 0,
          silver: 0,
          gold: 50,
          platinum: 0,
        } as any;
      }
    }
    return WIKIDOT_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || null;
  }, [selectedBackgroundId, selectedEdition]);`;

if (code.includes(activeBackgroundMarker)) {
  code = code.replace(activeBackgroundMarker, newActiveBackground);
  console.log('Replaced activeBackground with 2024 support');
}

// subclassUnlockLevel
const subclassLevelMarker = `  const subclassUnlockLevel = useMemo(() => {
    return activeClass ? getClassSubclassLevel(activeClass) : 3;
  }, [activeClass]);`;

const newSubclassLevel = `  const subclassUnlockLevel = useMemo(() => {
    if (selectedEdition === '5.5e') return 3;
    return activeClass ? getClassSubclassLevel(activeClass) : 3;
  }, [selectedEdition, activeClass]);`;

if (code.includes(subclassLevelMarker)) {
  code = code.replace(subclassLevelMarker, newSubclassLevel);
  console.log('Replaced subclassUnlockLevel with 2024 rule');
}

// finalStats
const finalStatsMarker = `  const finalStats: AbilityScores = useMemo(() => {
    return {
      str: Math.min(20, baseStats.str + racialBonuses.str + asiStatBonuses.str),
      dex: Math.min(20, baseStats.dex + racialBonuses.dex + asiStatBonuses.dex),
      con: Math.min(20, baseStats.con + racialBonuses.con + asiStatBonuses.con),
      int: Math.min(20, baseStats.int + racialBonuses.int + asiStatBonuses.int),
      wis: Math.min(20, baseStats.wis + racialBonuses.wis + asiStatBonuses.wis),
      cha: Math.min(20, baseStats.cha + racialBonuses.cha + asiStatBonuses.cha),
    };
  }, [baseStats, racialBonuses, asiStatBonuses]);`;

const newFinalStats = `  const finalStats: AbilityScores = useMemo(() => {
    const is2024 = selectedEdition === '5.5e';
    return {
      str: Math.min(20, baseStats.str + (is2024 ? 0 : racialBonuses.str) + asiStatBonuses.str + background2024Bonuses.str),
      dex: Math.min(20, baseStats.dex + (is2024 ? 0 : racialBonuses.dex) + asiStatBonuses.dex + background2024Bonuses.dex),
      con: Math.min(20, baseStats.con + (is2024 ? 0 : racialBonuses.con) + asiStatBonuses.con + background2024Bonuses.con),
      int: Math.min(20, baseStats.int + (is2024 ? 0 : racialBonuses.int) + asiStatBonuses.int + background2024Bonuses.int),
      wis: Math.min(20, baseStats.wis + (is2024 ? 0 : racialBonuses.wis) + asiStatBonuses.wis + background2024Bonuses.wis),
      cha: Math.min(20, baseStats.cha + (is2024 ? 0 : racialBonuses.cha) + asiStatBonuses.cha + background2024Bonuses.cha),
    };
  }, [baseStats, racialBonuses, asiStatBonuses, background2024Bonuses, selectedEdition]);`;

if (code.includes(finalStatsMarker)) {
  code = code.replace(finalStatsMarker, newFinalStats);
  console.log('Replaced finalStats with 2024 background ASI support');
}

// 4. Modal Header: Edition Switcher Pill
const headerTitleMarker = `                Creador de Héroes 5e
              </span>`;

const newHeaderTitle = `                Creador de Héroes {selectedEdition === '5.5e' ? '5.5e' : '5e'}
              </span>

              {/* Edition Selector Pill in Creator Header */}
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

if (code.includes(headerTitleMarker)) {
  code = code.replace(headerTitleMarker, newHeaderTitle);
  console.log('Added edition switcher to modal header');
}

// 5. Step 1: Edition Switcher bar
const step1BreadcrumbMarker = `                  {/* Compact Header Breadcrumb */}
                  <div className="py-0.5 px-2.5 rounded-lg bg-[#f5ede0]/90 border border-[#d6c4aa] flex items-center justify-between gap-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs text-[#5c4a35] min-w-0">
                      <Info className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />
                      <span className="truncate"><strong>Paso 1: Identidad & Apariencia</strong> — Define nombre, nivel, retrato y alineamiento.</span>
                    </div>
                  </div>`;

const newStep1Breadcrumb = `                  {/* Compact Header Breadcrumb */}
                  <div className="py-0.5 px-2.5 rounded-lg bg-[#f5ede0]/90 border border-[#d6c4aa] flex items-center justify-between gap-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs text-[#5c4a35] min-w-0">
                      <Info className="w-3.5 h-3.5 text-[#8c672b] shrink-0" />
                      <span className="truncate"><strong>Paso 1: Identidad & Apariencia</strong> — Define nombre, nivel, retrato y alineamiento.</span>
                    </div>
                  </div>

                  {/* Edition Switcher Bar in Step 1 */}
                  <div className="py-2 px-3 bg-[#ede2cf] rounded-xl border-2 border-[#b88c32]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#8c672b] shrink-0" />
                      <div>
                        <span className="text-xs font-fantasy font-bold text-[#4a361c] block">
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
                        <span>✨ 5.5e Revisado (2024)</span>
                        <span className="text-[9px] bg-amber-400 text-stone-900 px-1 rounded font-mono font-black uppercase">PHB</span>
                      </button>
                    </div>
                  </div>`;

if (code.includes(step1BreadcrumbMarker)) {
  code = code.replace(step1BreadcrumbMarker, newStep1Breadcrumb);
  console.log('Added edition switcher to Step 1');
}

// 6. Step 2 (Race): Switcher between 2024 and 5e
const raceCatalogMarker = `                  {/* Entire Race Selection: Filters + Search + Race Cards Grid */}
                  <div id="creator-race-catalog" className="space-y-3">`;

const newRaceCatalog = `                  {/* 2024 SPECIES PICKER vs 5e RACE CATALOG */}
                  {selectedEdition === '5.5e' ? (
                    <Creator2024SpeciesPicker
                      selectedSpeciesId={selectedRaceId}
                      onSelectSpecies={(id) => {
                        setSelectedRaceId(id);
                        setSelectedSubraceId('');
                        setFlexibleRacialChoices([]);
                        setBonusRacialSkills([]);
                      }}
                      onInspect={(data) => setInspectingCompendium(data)}
                    />
                  ) : (
                    <>
                  {/* Entire Race Selection: Filters + Search + Race Cards Grid */}
                  <div id="creator-race-catalog" className="space-y-3">`;

const raceCatalogCloseMarker = `                  {/* Race Traits, Subraces & Customizations Container */}
                  <div id="creator-race-traits" className="space-y-4">`;

// We also need to close the `<>` before closing Step 2
// Let's locate the end of currentStep === 'race'
const raceEndMarker = `                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 5: CLASS & LEVEL PROGRESSION */}`;

if (code.includes(raceCatalogMarker) && code.includes(raceEndMarker)) {
  code = code.replace(raceCatalogMarker, newRaceCatalog);
  code = code.replace(raceEndMarker, `                    </>
                  )}
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 5: CLASS & LEVEL PROGRESSION */}`);
  console.log('Wrapped Step 2 Race catalog with Creator2024SpeciesPicker');
}

// 7. Step 3 (Background): Switcher between 2024 and 5e
const bgCatalogMarker = `                  {/* Entire Background Selection: Filters + Search + Catalog Accordion */}
                  <div id="creator-background-catalog" className="space-y-3">`;

const newBgCatalog = `                  {/* 2024 BACKGROUND PICKER vs 5e BACKGROUND CATALOG */}
                  {selectedEdition === '5.5e' ? (
                    <Creator2024BackgroundPicker
                      selectedBackgroundId={selectedBackgroundId}
                      onSelectBackground={(id) => setSelectedBackgroundId(id)}
                      bgAsiMode={bgAsiMode2024}
                      setBgAsiMode={setBgAsiMode2024}
                      bgAsiStatPlusTwo={bgAsiStatPlusTwo}
                      setBgAsiStatPlusTwo={setBgAsiStatPlusTwo}
                      bgAsiStatPlusOne={bgAsiStatPlusOne}
                      setBgAsiStatPlusOne={setBgAsiStatPlusOne}
                    />
                  ) : (
                    <>
                  {/* Entire Background Selection: Filters + Search + Catalog Accordion */}
                  <div id="creator-background-catalog" className="space-y-3">`;

const bgEndMarker = `                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 4: ABILITIES & ASSIGNMENT */}`;

if (code.includes(bgCatalogMarker) && code.includes(bgEndMarker)) {
  code = code.replace(bgCatalogMarker, newBgCatalog);
  code = code.replace(bgEndMarker, `                    </>
                  )}
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 4: ABILITIES & ASSIGNMENT */}`);
  console.log('Wrapped Step 3 Background catalog with Creator2024BackgroundPicker');
}

// 8. Step 4 (Class): Add Weapon Mastery picker for martial classes in 2024
const classEndMarker = `                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 6: CLASS SPECIAL FEATURES & SUBCLASS CHOICES (IF ANY) */}`;

const newClassMastery = `                  {/* 2024 WEAPON MASTERY PICKER (MARTIAL CLASSES) */}
                  {selectedEdition === '5.5e' && (
                    <Creator2024WeaponMasteryPicker
                      classNameString={activeClass?.name || ''}
                      characterLevel={characterLevel}
                      selectedMasteries={selectedWeaponMasteries}
                      onToggleMastery={(m) => {
                        setSelectedWeaponMasteries((prev) =>
                          prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                        );
                      }}
                    />
                  )}
                </div>
              )}

              {/* ----------------------------------------------------- */}
              {/* STEP 6: CLASS SPECIAL FEATURES & SUBCLASS CHOICES (IF ANY) */}`;

if (code.includes(classEndMarker)) {
  code = code.replace(classEndMarker, newClassMastery);
  console.log('Added 2024 Weapon Mastery picker to Step 4 Class');
}

// 9. buildFinalCharacterObject: save edition and weaponMasteries
const finalCharMarker = `      isDraft: false,
      lastSavedAt: new Date().toISOString(),
      creatorState: {`;

const newFinalChar = `      edition: selectedEdition,
      weaponMasteries: selectedWeaponMasteries,
      isDraft: false,
      lastSavedAt: new Date().toISOString(),
      creatorState: {
        selectedEdition,
        bgAsiMode2024,
        bgAsiStatPlusTwo,
        bgAsiStatPlusOne,
        selectedWeaponMasteries,`;

if (code.includes(finalCharMarker)) {
  code = code.replace(finalCharMarker, newFinalChar);
  console.log('Saved edition and weaponMasteries in final character object and creatorState');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('CharacterCreatorModal.tsx successfully patched!');
