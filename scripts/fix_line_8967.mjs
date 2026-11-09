import fs from 'fs';

let code = fs.readFileSync('src/components/CharacterCreatorModal.tsx', 'utf8');
code = code.replace(
  "<span>{isSpanish ? '{isSpanish ? 'Sincronizado en Vivo' : 'Live Synced'}' : 'Live Synced'}</span>",
  "<span>{isSpanish ? 'Sincronizado en Vivo' : 'Live Synced'}</span>"
);
code = code.replace(
  "{characterName || 'Héroe'} (Nv {characterLevel})",
  "{characterName || (isSpanish ? 'Héroe' : 'Hero')} ({isSpanish ? 'Nv' : 'Lv'} {characterLevel})"
);
fs.writeFileSync('src/components/CharacterCreatorModal.tsx', code);
console.log('Fixed line 8967');
