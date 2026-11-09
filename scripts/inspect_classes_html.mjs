import fs from 'fs';
const classesRaw = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/classes_raw.json', 'utf8'));
const barb = classesRaw.find(c => c.slug === 'barbarian');
console.log('BARBARIAN HTML SNIPPET:\n', barb.rawHtml.slice(0, 1500));
console.log('\nSubclasses:', barb.subclasses.map(s => s.name));
