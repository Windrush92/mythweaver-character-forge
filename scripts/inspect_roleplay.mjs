import fs from 'fs';

const code = fs.readFileSync('src/data/roleplayData.ts', 'utf8');
const bgMatches = [...code.matchAll(/case\s+['"]([^'"]+)['"]:/g)].map(m => m[1]);
console.log('Background cases in roleplayData:', bgMatches);
