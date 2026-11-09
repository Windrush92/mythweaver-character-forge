import fs from 'fs';
const backgroundsRaw = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/backgrounds_raw.json', 'utf8'));
const soldier = backgroundsRaw.find(b => b.slug === 'soldier') || backgroundsRaw[0];
console.log('SOLDIER RAW HTML:\n', soldier.rawHtml);
