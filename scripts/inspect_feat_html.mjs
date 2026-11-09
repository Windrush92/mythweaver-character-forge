import fs from 'fs';
const featsRaw = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/feats_raw.json', 'utf8'));
const alertFeat = featsRaw.find(f => f.slug === 'alert') || featsRaw[0];
console.log('ALERT FEAT RAW HTML:\n', alertFeat.rawHtml);
