import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          if (norm.includes('node_modules')) {
            if (norm.includes('pdf-lib') || norm.includes('pdfjs-dist') || norm.includes('pdf-parse')) {
              return 'vendor-pdf';
            }
            if (norm.includes('react-dom') || norm.includes('/react/')) {
              return 'vendor-react';
            }
            if (norm.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-libs';
          }
          if (norm.includes('spellsData')) {
            return 'dnd-spells-data';
          }
          if (
            norm.includes('/data/wikidot') ||
            norm.includes('/data/characterCreatorData') ||
            norm.includes('/data/levelUpDecisionsData') ||
            norm.includes('/data/magicItemsData') ||
            norm.includes('/data/srdMonstersData') ||
            norm.includes('/data/conditionsRulesData')
          ) {
            return 'dnd-compendium-data';
          }
          if (norm.includes('/data/characterRulesEngine')) {
            return 'dnd-rules-engine';
          }
        },
      },
    },
  },
})
