import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://dnd2024.wikidot.com';

async function fetchWikiHtml(endpoint) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[WARN] Failed to fetch ${url} (status: ${res.status})`);
      return null;
    }
    const html = await res.text();
    return html;
  } catch (err) {
    console.error(`[ERROR] Fetching ${url}:`, err.message);
    return null;
  }
}

function extractPageContent(html) {
  if (!html) return '';
  const match = html.match(/<div id="page-content">([\s\S]*?)<\/div>\s*<div id="page-info">/i)
    || html.match(/<div id="page-content">([\s\S]*?)<\/div>/i);
  return match ? match[1] : '';
}

function cleanHtmlToText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// 1. SCRAPE SPECIES (10 PHB 2024 species)
export async function scrapeAllSpecies() {
  console.log('\n==============================');
  console.log('1. Scraping 2024 Species...');
  console.log('==============================');
  const indexHtml = await fetchWikiHtml('/species:all');
  if (!indexHtml) return [];

  const content = extractPageContent(indexHtml);
  const links = [...content.matchAll(/href="(\/species:[^"#]+)"/g)].map(m => m[1]);
  const unique = [...new Set(links)];

  const results = [];
  for (const link of unique) {
    const slug = link.replace('/species:', '');
    console.log(` -> Fetching species: ${slug}...`);
    const pageHtml = await fetchWikiHtml(link);
    if (!pageHtml) continue;

    const pageContent = extractPageContent(pageHtml);
    results.push({
      id: `species-2024-${slug}`,
      slug,
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      rawHtml: pageContent,
      cleanText: cleanHtmlToText(pageContent),
      url: `${BASE_URL}${link}`,
      edition: '5.5e'
    });
  }
  return results;
}

// 2. SCRAPE BACKGROUNDS (16 PHB 2024 backgrounds)
export async function scrapeAllBackgrounds() {
  console.log('\n==============================');
  console.log('2. Scraping 2024 Backgrounds...');
  console.log('==============================');
  const indexHtml = await fetchWikiHtml('/background:all');
  if (!indexHtml) return [];

  const content = extractPageContent(indexHtml);
  const links = [...content.matchAll(/href="(\/background:[^"#]+)"/g)].map(m => m[1]);
  const unique = [...new Set(links)];

  const results = [];
  for (const link of unique) {
    const slug = link.replace('/background:', '');
    console.log(` -> Fetching background: ${slug}...`);
    const pageHtml = await fetchWikiHtml(link);
    if (!pageHtml) continue;

    const pageContent = extractPageContent(pageHtml);
    results.push({
      id: `bg-2024-${slug}`,
      slug,
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      rawHtml: pageContent,
      cleanText: cleanHtmlToText(pageContent),
      url: `${BASE_URL}${link}`,
      edition: '5.5e'
    });
  }
  return results;
}

// 3. SCRAPE FEATS (Origin, General, Fighting Style, Epic Boons)
export async function scrapeAllFeats() {
  console.log('\n==============================');
  console.log('3. Scraping 2024 Feats...');
  console.log('==============================');
  const indexHtml = await fetchWikiHtml('/feat:all');
  if (!indexHtml) return [];

  const content = extractPageContent(indexHtml);
  const links = [...content.matchAll(/href="(\/feat:[^"#]+)"/g)].map(m => m[1]);
  const unique = [...new Set(links)];

  const results = [];
  for (const link of unique) {
    const slug = link.replace('/feat:', '');
    console.log(` -> Fetching feat: ${slug}...`);
    const pageHtml = await fetchWikiHtml(link);
    if (!pageHtml) continue;

    const pageContent = extractPageContent(pageHtml);
    results.push({
      id: `feat-2024-${slug}`,
      slug,
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      rawHtml: pageContent,
      cleanText: cleanHtmlToText(pageContent),
      url: `${BASE_URL}${link}`,
      edition: '5.5e'
    });
  }
  return results;
}

// 4. SCRAPE WEAPONS & ARMOR WITH WEAPON MASTERY
export async function scrapeAllEquipment() {
  console.log('\n==============================');
  console.log('4. Scraping 2024 Weapons & Armor...');
  console.log('==============================');
  
  const weaponsHtml = await fetchWikiHtml('/equipment:weapon');
  const armorHtml = await fetchWikiHtml('/equipment:armor');
  const gearHtml = await fetchWikiHtml('/equipment:adventuring-gear');

  return {
    weapons: {
      rawHtml: extractPageContent(weaponsHtml),
      cleanText: cleanHtmlToText(extractPageContent(weaponsHtml))
    },
    armor: {
      rawHtml: extractPageContent(armorHtml),
      cleanText: cleanHtmlToText(extractPageContent(armorHtml))
    },
    adventuringGear: {
      rawHtml: extractPageContent(gearHtml),
      cleanText: cleanHtmlToText(extractPageContent(gearHtml))
    }
  };
}

// 5. SCRAPE CLASSES (12 PHB + Artificer and all subclasses)
export async function scrapeAllClasses() {
  console.log('\n==============================');
  console.log('5. Scraping 2024 Classes & Subclasses...');
  console.log('==============================');
  const homeHtml = await fetchWikiHtml('/');
  if (!homeHtml) return [];

  const classes = [
    'barbarian', 'bard', 'cleric', 'druid', 'fighter',
    'monk', 'paladin', 'ranger', 'rogue', 'sorcerer',
    'warlock', 'wizard', 'artificer'
  ];

  const results = [];
  for (const cls of classes) {
    console.log(` -> Fetching class: ${cls}:main...`);
    const mainHtml = await fetchWikiHtml(`/${cls}:main`);
    const pageContent = extractPageContent(mainHtml);
    
    // Find subclasses linked in class page or home
    const subMatches = [...(mainHtml || '').matchAll(new RegExp(`href="(/${cls}:[^"#]+)"`, 'g'))].map(m => m[1]);
    const uniqueSubs = [...new Set(subMatches)].filter(s => s !== `/${cls}:main` && !s.includes('spell-list'));

    const subclasses = [];
    for (const subLink of uniqueSubs) {
      const subSlug = subLink.replace(`/${cls}:`, '');
      console.log(`    * Subclass: ${subSlug}...`);
      const subHtml = await fetchWikiHtml(subLink);
      if (subHtml) {
        const subContent = extractPageContent(subHtml);
        subclasses.push({
          id: `subclass-2024-${cls}-${subSlug}`,
          slug: subSlug,
          name: subSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          rawHtml: subContent,
          cleanText: cleanHtmlToText(subContent),
          url: `${BASE_URL}${subLink}`
        });
      }
    }

    results.push({
      id: `class-2024-${cls}`,
      slug: cls,
      name: cls.charAt(0).toUpperCase() + cls.slice(1),
      rawHtml: pageContent,
      cleanText: cleanHtmlToText(pageContent),
      url: `${BASE_URL}/${cls}:main`,
      subclasses,
      edition: '5.5e'
    });
  }
  return results;
}

async function run() {
  const outputDir = path.resolve('src/data/dnd2024/raw');
  fs.mkdirSync(outputDir, { recursive: true });

  const species = await scrapeAllSpecies();
  fs.writeFileSync(path.join(outputDir, 'species_raw.json'), JSON.stringify(species, null, 2), 'utf-8');
  console.log(`Saved ${species.length} species to species_raw.json`);

  const backgrounds = await scrapeAllBackgrounds();
  fs.writeFileSync(path.join(outputDir, 'backgrounds_raw.json'), JSON.stringify(backgrounds, null, 2), 'utf-8');
  console.log(`Saved ${backgrounds.length} backgrounds to backgrounds_raw.json`);

  const feats = await scrapeAllFeats();
  fs.writeFileSync(path.join(outputDir, 'feats_raw.json'), JSON.stringify(feats, null, 2), 'utf-8');
  console.log(`Saved ${feats.length} feats to feats_raw.json`);

  const equipment = await scrapeAllEquipment();
  fs.writeFileSync(path.join(outputDir, 'equipment_raw.json'), JSON.stringify(equipment, null, 2), 'utf-8');
  console.log(`Saved equipment to equipment_raw.json`);

  const classes = await scrapeAllClasses();
  fs.writeFileSync(path.join(outputDir, 'classes_raw.json'), JSON.stringify(classes, null, 2), 'utf-8');
  console.log(`Saved ${classes.length} classes to classes_raw.json`);

  console.log('\n✅ ALL 2024 CORE DATA SCRAPED SUCCESSFULLY!');
}

run();
