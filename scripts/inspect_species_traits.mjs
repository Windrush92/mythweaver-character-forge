import fs from 'fs';

const speciesRaw = JSON.parse(fs.readFileSync('src/data/dnd2024/raw/species_raw.json', 'utf8'));

for (const sp of speciesRaw) {
  console.log(`\n================== ${sp.name.toUpperCase()} ==================`);
  // Look for Creature Type, Size, Speed, etc.
  const creatureType = sp.cleanText.match(/Creature Type:\s*([^\.]+)/i)?.[1]?.trim() || 'Humanoid';
  const size = sp.cleanText.match(/Size:\s*([^\.]+)/i)?.[1]?.trim() || 'Medium';
  const speed = sp.cleanText.match(/Speed:\s*(\d+\s*feet)/i)?.[1]?.trim() || '30 feet';
  console.log(`Type: ${creatureType} | Size: ${size} | Speed: ${speed}`);

  // Find headings or strong tags in rawHtml
  const traits = [...sp.rawHtml.matchAll(/<h[2-4][^>]*>([^<]+)<\/h[2-4]>([\s\S]*?)(?=<h[2-4]|$)/gi)];
  console.log(`Traits count: ${traits.length}`);
  for (const t of traits.slice(0, 6)) {
    const traitName = t[1].replace(/<[^>]+>/g, '').trim();
    const traitDesc = t[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
    console.log(`  * [${traitName}]: ${traitDesc}...`);
  }
}
