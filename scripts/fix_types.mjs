import fs from 'fs';

const file = 'C:/Users/natal/.gemini/antigravity/scratch/dnd-character-forge/src/components/CharacterCreatorModal.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace activeRace
const startRace = code.indexOf('  const activeRace = useMemo');
const endRace = code.indexOf('  const activeSubrace = useMemo(');

if (startRace !== -1 && endRace !== -1) {
  const oldActiveRace = code.substring(startRace, endRace);
  const newActiveRace = `  const activeRace = useMemo(() => {
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
  }, [selectedRaceId, selectedEdition]);

`;
  code = code.replace(oldActiveRace, newActiveRace);
  console.log('Updated activeRace with exact size and abilityScoreBonuses');
}

// Fix raceAnyCount
code = code.replace(
  'if (activeRace?.abilityScoreBonuses?.any) count += activeRace.abilityScoreBonuses.any;\n    if (activeSubrace?.abilityScoreBonuses?.any) count += activeSubrace.abilityScoreBonuses.any;',
  'if ((activeRace?.abilityScoreBonuses as any)?.any) count += (activeRace!.abilityScoreBonuses as any).any;\n    if ((activeSubrace?.abilityScoreBonuses as any)?.any) count += (activeSubrace!.abilityScoreBonuses as any).any;'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Done!');
