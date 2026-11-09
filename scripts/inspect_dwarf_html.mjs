import fs from 'fs';
const speciesRaw = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/species_raw.json', 'utf8'));
const dwarf = speciesRaw.find(s => s.slug === 'dwarf');
console.log('DWARF RAW HTML:\n', dwarf.rawHtml);
