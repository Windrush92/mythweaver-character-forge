import fs from 'fs';
import path from 'path';

const dir = 'src/data/backgrounds';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
const backgrounds = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // extract objects
  const idMatches = [...content.matchAll(/id:\s*["']([^"']+)["']/g)];
  for (const m of idMatches) {
    const id = m[1];
    // extract nameEn, description
    const regex = new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?nameEn:\\s*["']([^"']+)["'][\\s\\S]*?description:\\s*["']([^"']+)["']`);
    const match = content.match(regex);
    if (match) {
      backgrounds.push({
        id,
        nameEn: match[1],
        descriptionEs: match[2],
      });
    }
  }
}

console.log('Parsed backgrounds count:', backgrounds.length);
fs.writeFileSync('scripts/parsed_bg.json', JSON.stringify(backgrounds, null, 2));
