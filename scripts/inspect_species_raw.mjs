import fs from 'fs';
import path from 'path';

const speciesRaw = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/species_raw.json', 'utf8'));

for (const sp of speciesRaw) {
  console.log(`\n================== SPECIES: ${sp.name} ==================`);
  console.log('Snippet:', sp.cleanText.slice(0, 300));
}
