import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\natal\\OneDrive\\Documentos\\D&D Herramientas y cosas\\Manuales y herramientas completo 5.5E\\MANUALS-20261030T142123Z-1-001\\MANUALS\\D&D 5e - Players Handbook 2024.pdf';

async function readPdfInfo() {
  console.log('Testing PDF load:', pdfPath);
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer, { max: 6 });
  console.log('PDF loaded! Total pages:', data.numpages);
  console.log('Sample text:\n', data.text.slice(0, 800));
}

readPdfInfo().catch(console.error);
