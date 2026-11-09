import fs from 'fs';
import path from 'path';

const dir = 'src/data/backgrounds';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
let all = [];
for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = [...code.matchAll(/id:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*nameEn:\s*["']([^"']+)["']/g)];
  all.push(...matches.map(m => ({ id: m[1], name: m[2], nameEn: m[3] })));
}
console.log('Total backgrounds:', all.length);
console.log(JSON.stringify(all.slice(0, 15), null, 2));
