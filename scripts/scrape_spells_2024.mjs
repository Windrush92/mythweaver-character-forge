import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://dnd2024.wikidot.com';

async function fetchWikiHtml(endpoint) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
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

async function scrapeSpells() {
  console.log('Fetching spell index...');
  const indexHtml = await fetchWikiHtml('/spell:all');
  if (!indexHtml) return [];

  const content = extractPageContent(indexHtml);
  const links = [...content.matchAll(/href="(\/spell:[^"#]+)"/g)].map(m => m[1]);
  // Filter out school overview pages (ending in -school)
  const unique = [...new Set(links)].filter(l => !l.endsWith('-school'));
  console.log(`Found ${unique.length} individual spell pages to scrape.`);

  const spells = [];
  let count = 0;
  for (const link of unique) {
    const slug = link.replace('/spell:', '');
    const pageHtml = await fetchWikiHtml(link);
    if (!pageHtml) continue;

    const pageContent = extractPageContent(pageHtml);
    const text = cleanHtmlToText(pageContent);
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Extract level and school
    // Pattern: "Level 1 Abjuration" or "Evocation Cantrip"
    let level = 0;
    let school = 'Universal';
    const levelMatch = text.match(/(Cantrip|Level\s+(\d+))\s+([A-Za-z]+)/i);
    if (levelMatch) {
      if (levelMatch[1].toLowerCase() === 'cantrip') {
        level = 0;
      } else if (levelMatch[2]) {
        level = parseInt(levelMatch[2], 10);
      }
      school = levelMatch[3] || 'Universal';
    }

    spells.push({
      id: `spell-2024-${slug}`,
      slug,
      name,
      level,
      school,
      rawHtml: pageContent,
      cleanText: text,
      url: `${BASE_URL}${link}`,
      edition: '5.5e'
    });

    count++;
    if (count % 50 === 0 || count === unique.length) {
      console.log(` -> Scraped ${count}/${unique.length} spells...`);
    }
  }

  const outDir = path.resolve('src/data/dnd2024/raw');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'spells_raw.json'), JSON.stringify(spells, null, 2), 'utf-8');
  console.log(`✅ Saved ${spells.length} spells to spells_raw.json`);
}

scrapeSpells();
