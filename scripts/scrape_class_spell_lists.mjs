import fs from 'fs';
import path from 'path';

const classes = ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard', 'artificer'];
const BASE_URL = 'https://dnd2024.wikidot.com';

async function run() {
  const allSpells = new Map();

  for (const cls of classes) {
    const url = `${BASE_URL}/${cls}:spell-list`;
    console.log(`Fetching ${cls} spell list...`);
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      const content = html.match(/<div id="page-content">([\s\S]*?)<\/div>/)?.[1] || '';
      
      // Match all spell links
      const matches = [...content.matchAll(/<a href="(\/spell:[^"#]+)">([^<]+)<\/a>/g)];
      for (const m of matches) {
        const link = m[1];
        const name = m[2].trim();
        const slug = link.replace('/spell:', '');
        if (!allSpells.has(slug)) {
          allSpells.set(slug, {
            slug,
            name,
            link,
            classes: [cls]
          });
        } else {
          allSpells.get(slug).classes.push(cls);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log(`Total unique spells across all class lists: ${allSpells.size}`);
  const outDir = path.resolve('src/data/dnd2024/raw');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'class_spell_catalog.json'), JSON.stringify(Array.from(allSpells.values()), null, 2));
}

run();
