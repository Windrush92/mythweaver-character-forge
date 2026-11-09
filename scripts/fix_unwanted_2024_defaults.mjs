import fs from 'fs';

function patch(filePath, replacements) {
  let text = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  for (const [target, replacement] of replacements) {
    if (!text.includes(target)) {
      console.error(`[${filePath}] TARGET NOT FOUND:\n${target.slice(0, 100)}...`);
      process.exit(1);
    }
    text = text.replace(target, replacement);
  }
  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`[${filePath}] Successfully applied all replacements.`);
}

// 1. CharacterCreatorModal.tsx
const creatorPath = 'src/components/CharacterCreatorModal.tsx';
const creatorTarget1 = `  useEffect(() => {
    if (selectedEdition === '5.5e') {
      if (!DND_2024_SPECIES.some((s) => s.id === selectedRaceId)) {
        setSelectedRaceId(DND_2024_SPECIES[0].id);
        setSelectedSubraceId('');
      }
      if (!DND_2024_BACKGROUNDS.some((b) => b.id === selectedBackgroundId)) {
        setSelectedBackgroundId(DND_2024_BACKGROUNDS[0].id);
      }
    }
  }, [selectedEdition]);`;

const creatorReplacement1 = `  useEffect(() => {
    if (selectedEdition === '5.5e') {
      if (selectedRaceId) {
        if (!DND_2024_SPECIES.some((s) => s.id === selectedRaceId)) {
          const map5eTo2024Species: Record<string, string> = {
            'humano': 'species-2024-human',
            'elfo': 'species-2024-elf',
            'enano': 'species-2024-dwarf',
            'gnomo': 'species-2024-gnome',
            'mediano': 'species-2024-halfling',
            'draconido': 'species-2024-dragonborn',
            'tiflin': 'species-2024-tiefling',
            'goliat': 'species-2024-goliath',
            'aasimar': 'species-2024-aasimar',
            'orco': 'species-2024-orc',
            'semiorco': 'species-2024-orc',
          };
          setSelectedRaceId(map5eTo2024Species[selectedRaceId] || '');
          setSelectedSubraceId('');
        }
      }
      if (selectedBackgroundId) {
        if (!DND_2024_BACKGROUNDS.some((b) => b.id === selectedBackgroundId)) {
          const found = DND_2024_BACKGROUNDS.find((b) => selectedBackgroundId.includes(b.slug) || b.id.includes(selectedBackgroundId));
          setSelectedBackgroundId(found ? found.id : '');
        }
      }
    } else {
      if (selectedRaceId) {
        if (!WIKIDOT_RACES.some((r) => r.id === selectedRaceId)) {
          const map2024To5eSpecies: Record<string, string> = {
            'species-2024-human': 'humano',
            'species-2024-elf': 'elfo',
            'species-2024-dwarf': 'enano',
            'species-2024-gnome': 'gnomo',
            'species-2024-halfling': 'mediano',
            'species-2024-dragonborn': 'draconido',
            'species-2024-tiefling': 'tiflin',
            'species-2024-goliath': 'goliat',
            'species-2024-aasimar': 'aasimar',
            'species-2024-orc': 'semiorco',
          };
          setSelectedRaceId(map2024To5eSpecies[selectedRaceId] || '');
          setSelectedSubraceId('');
        }
      }
      if (selectedBackgroundId) {
        if (!WIKIDOT_BACKGROUNDS.some((b) => b.id === selectedBackgroundId)) {
          const slug = selectedBackgroundId.replace('bg-2024-', '');
          const found = WIKIDOT_BACKGROUNDS.find((b) => b.id.includes(slug));
          setSelectedBackgroundId(found ? found.id : '');
        }
      }
    }
  }, [selectedEdition]);`;

const creatorTarget2 = `  const activeRace = useMemo(() => {
    if (!selectedRaceId) return null;
    if (selectedEdition === '5.5e') {
      const sp = DND_2024_SPECIES.find((s) => s.id === selectedRaceId);
      if (sp) {
        const base = WIKIDOT_RACES[0];
        return {
          ...base,
          id: sp.id,
          name: sp.name,
          category: 'Común' as const,
          description: sp.description,
          traits: sp.traits,
          size: (sp.size.includes('Pequeño') ? 'Pequeño' : 'Mediano') as 'Pequeño' | 'Mediano',
          speed: '30 pies',
          languages: ['Común'],
          abilityScoreBonuses: base.abilityScoreBonuses,
          subraces: [],
          innateSpells: [],
          spellcastingConfig: undefined,
        };
      }
    }
    return WIKIDOT_RACES.find((r) => r.id === selectedRaceId) || null;
  }, [selectedRaceId, selectedEdition]);`;

const creatorReplacement2 = `  const activeRace = useMemo(() => {
    if (!selectedRaceId) return null;
    if (selectedEdition === '5.5e') {
      const sp = DND_2024_SPECIES.find((s) => s.id === selectedRaceId);
      if (sp) {
        return {
          id: sp.id,
          name: isSpanish ? sp.name : (sp.nameEn || sp.name),
          nameEn: sp.nameEn || sp.name,
          category: 'Común' as const,
          description: isSpanish ? sp.description : (sp.descriptionEn || sp.description),
          traits: (sp.traits || []).map((t) => ({
            name: isSpanish ? t.name : (t.nameEn || t.name),
            desc: isSpanish ? t.desc : (t.descEn || t.desc),
          })),
          size: (sp.size.includes('Pequeño') || sp.sizeEn?.toLowerCase().includes('small') ? 'Pequeño' : 'Mediano') as 'Pequeño' | 'Mediano',
          speed: isSpanish ? sp.speed : sp.speed.replace('pies', 'feet'),
          languages: isSpanish ? ['Común'] : ['Common'],
          abilityScoreBonuses: {},
          darkvision: sp.darkvision || 0,
          subraces: [],
          innateSpells: [],
          spellcastingConfig: undefined,
        } as unknown as (typeof WIKIDOT_RACES)[number];
      }
    }
    return WIKIDOT_RACES.find((r) => r.id === selectedRaceId) || null;
  }, [selectedRaceId, selectedEdition, isSpanish]);`;

const creatorTarget3 = `                  <p className="text-[11px] text-[#8c521f] font-mono font-bold truncate mt-0.5">
                    {activeRace ? (isSpanish ? activeRace.name : ((activeRace as any).nameEn || activeRace.name)) : (isSpanish ? 'Raza sin elegir' : 'No race selected')} •{' '}
                    {activeClass
                      ? isSubclassUnlocked && activeSubclass
                        ? \`\${isSpanish ? activeClass.name : ((activeClass as any).nameEn || activeClass.name)} (\${isSpanish ? activeSubclass.name.split('(')[0].trim() : ((activeSubclass as any).nameEn || activeSubclass.name)})\`
                        : (isSpanish ? activeClass.name : ((activeClass as any).nameEn || activeClass.name))
                      : (isSpanish ? 'Clase sin elegir' : 'No class selected')}
                  </p>
                  <p className="text-[10px] text-[#6b472e] truncate">
                    {activeBackground ? (isSpanish ? activeBackground.name : (activeBackground.nameEn || activeBackground.name)) : (isSpanish ? 'Trasfondo sin elegir' : 'No background selected')} •{' '}`;

const creatorReplacement3 = `                  <p className="text-[11px] text-[#8c521f] font-mono font-bold truncate mt-0.5">
                    {activeRace ? getRaceDisplayName(activeRace) : (isSpanish ? 'Raza sin elegir' : 'No race selected')} •{' '}
                    {activeClass
                      ? isSubclassUnlocked && activeSubclass
                        ? \`\${getClassDisplayName(activeClass)} (\${isSpanish ? activeSubclass.name.split('(')[0].trim() : ((activeSubclass as any).nameEn || activeSubclass.name)})\`
                        : getClassDisplayName(activeClass)
                      : (isSpanish ? 'Clase sin elegir' : 'No class selected')}
                  </p>
                  <p className="text-[10px] text-[#6b472e] truncate">
                    {activeBackground ? getBgDisplayName(activeBackground) : (isSpanish ? 'Trasfondo sin elegir' : 'No background selected')} •{' '}`;

patch(creatorPath, [
  [creatorTarget1, creatorReplacement1],
  [creatorTarget2, creatorReplacement2],
  [creatorTarget3, creatorReplacement3],
]);

// 2. Creator2024SpeciesPicker.tsx
const speciesPath = 'src/components/Creator2024SpeciesPicker.tsx';
const speciesTarget1 = `  const activeSpecies = useMemo<Species2024>(() => {
    return DND_2024_SPECIES.find((s) => s.id === selectedSpeciesId) || DND_2024_SPECIES[0];
  }, [selectedSpeciesId]);`;

const speciesReplacement1 = `  const activeSpecies = useMemo<Species2024 | null>(() => {
    if (!selectedSpeciesId) return null;
    return DND_2024_SPECIES.find((s) => s.id === selectedSpeciesId) || null;
  }, [selectedSpeciesId]);`;

const speciesTarget2 = `      {/* Selected Species Detail Dossier */}
      {activeSpecies && (
        <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm">`;

const speciesReplacement2 = `      {/* Selected Species Detail Dossier */}
      {activeSpecies ? (
        <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-3 shadow-sm">`;

const speciesTarget3 = `          </div>
        </div>
      )}
    </div>
  );
};`;

const speciesReplacement3 = `          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
          {t('Selecciona una especie de la lista para ver sus rasgos y características.', 'Select a species from the list above to view its traits and characteristics.')}
        </div>
      )}
    </div>
  );
};`;

patch(speciesPath, [
  [speciesTarget1, speciesReplacement1],
  [speciesTarget2, speciesReplacement2],
  [speciesTarget3, speciesReplacement3],
]);

// 3. Creator2024BackgroundPicker.tsx
const bgPath = 'src/components/Creator2024BackgroundPicker.tsx';
const bgTarget1 = `  const activeBackground = useMemo<Background2024>(() => {
    return DND_2024_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || DND_2024_BACKGROUNDS[0];
  }, [selectedBackgroundId]);`;

const bgReplacement1 = `  const activeBackground = useMemo<Background2024 | null>(() => {
    if (!selectedBackgroundId) return null;
    return DND_2024_BACKGROUNDS.find((b) => b.id === selectedBackgroundId) || null;
  }, [selectedBackgroundId]);`;

const bgTarget2 = `  // Ensure default stats selected for +2/+1 mode
  const allowedStats = activeBackground.abilityScores;
  const effectiveStat2 = (bgAsiStatPlusTwo && allowedStats.includes(bgAsiStatPlusTwo) ? bgAsiStatPlusTwo : allowedStats[0]) as keyof AbilityScores;
  const validForStat1 = allowedStats.filter((s) => s !== effectiveStat2);
  const effectiveStat1 = (bgAsiStatPlusOne && bgAsiStatPlusOne !== effectiveStat2 && allowedStats.includes(bgAsiStatPlusOne)
    ? bgAsiStatPlusOne
    : validForStat1[0] || allowedStats[1]) as keyof AbilityScores;`;

const bgReplacement2 = `  // Ensure default stats selected for +2/+1 mode
  const allowedStats = activeBackground?.abilityScores || [];
  const effectiveStat2 = (bgAsiStatPlusTwo && allowedStats.includes(bgAsiStatPlusTwo) ? bgAsiStatPlusTwo : allowedStats[0]) as keyof AbilityScores | undefined;
  const validForStat1 = allowedStats.filter((s) => s !== effectiveStat2);
  const effectiveStat1 = (bgAsiStatPlusOne && bgAsiStatPlusOne !== effectiveStat2 && allowedStats.includes(bgAsiStatPlusOne)
    ? bgAsiStatPlusOne
    : validForStat1[0] || allowedStats[1]) as keyof AbilityScores | undefined;`;

const bgTarget3 = `      {/* Selected Background Customization Dossier */}
      {activeBackground && (
        <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-4 shadow-sm">`;

const bgReplacement3 = `      {/* Selected Background Customization Dossier */}
      {activeBackground ? (
        <div className="p-4 bg-[#f5ede0] rounded-xl border-2 border-[#b88c32] space-y-4 shadow-sm">`;

const bgTarget4 = `            </div>
          </div>
        </div>
      )}
    </div>
  );
};`;

const bgReplacement4 = `            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
          {t('Selecciona un trasfondo de la lista para ver su dote de origen y configurar tus mejoras de característica.', 'Select a background from the list above to view its origin feat and configure your ability score increases.')}
        </div>
      )}
    </div>
  );
};`;

patch(bgPath, [
  [bgTarget1, bgReplacement1],
  [bgTarget2, bgReplacement2],
  [bgTarget3, bgReplacement3],
  [bgTarget4, bgReplacement4],
]);
