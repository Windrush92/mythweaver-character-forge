import fs from 'fs';
const eq = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/equipment_raw.json', 'utf8'));
console.log('WEAPONS HTML SNIPPET:\n', eq.weapons.rawHtml.slice(0, 2000));
