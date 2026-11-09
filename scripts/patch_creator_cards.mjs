import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/components/CreatorCards.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// 1. Replace import of useLongPress with useLanguageStore
code = code.replace(
  "import { useLongPress } from '../hooks/useLongPress';",
  "import { useLanguageStore } from '../hooks/useLanguageStore';"
);

// 2. FeatCard
code = code.replace(
  /export const FeatCard: React\.FC<FeatCardProps> = \(\{([^}]+)\}\) => \{/,
  (m) => `${m}\n  const { isSpanish } = useLanguageStore();`
);
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3.5',
  '<div\n      onClick={onSelect}\n      className={`p-3.5'
);
code = code.replace(
  '{feat.name}',
  '{isSpanish ? feat.name : (feat.nameEn || feat.name)}'
);
code = code.replace(
  'title="Ver detalles completos (o mantén presionado)"',
  'title="Ver detalles completos"'
);

// 3. SubraceCard
code = code.replace(
  /export const SubraceCard: React\.FC<SubraceCardProps> = \(\{([^}]+)\}\) => \{/,
  (m) => `${m}\n  const { isSpanish } = useLanguageStore();`
);
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-lg border cursor-pointer',
  '<div\n      onClick={onSelect}\n      className={`p-3 rounded-lg border cursor-pointer'
);
code = code.replace(
  '<span className="text-[#4a361c]">{sub.name}</span>',
  '<span className="text-[#4a361c]">{isSpanish ? sub.name : (sub.nameEn || sub.name)}</span>'
);
code = code.replace(
  '{sub.description}',
  '{isSpanish ? sub.description : (sub.descriptionEn || sub.description)}'
);

// 4. RaceCard
code = code.replace(
  /export const RaceCard: React\.FC<RaceCardProps> = \(\{([^}]+)\}\) => \{/,
  (m) => `${m}\n  const { isSpanish } = useLanguageStore();`
);
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none',
  '<div\n      onClick={onSelect}\n      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none'
);
code = code.replace(
  '{race.name}',
  '{isSpanish ? race.name : (race.nameEn || race.name)}'
);
code = code.replace(
  '{race.category}',
  '{isSpanish ? race.category : (race.categoryEn || race.category)}'
);
code = code.replace(
  '{race.description}',
  '{isSpanish ? race.description : (race.descriptionEn || race.description)}'
);

// 5. ClassCard
code = code.replace(
  /export const ClassCard: React\.FC<ClassCardProps> = \(\{([^}]+)\}\) => \{/,
  (m) => `${m}\n  const { isSpanish } = useLanguageStore();`
);
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none',
  '<div\n      onClick={onSelect}\n      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none'
);
code = code.replace(
  '{cls.name}',
  '{isSpanish ? cls.name : (cls.nameEn || cls.name)}'
);
code = code.replace(
  '{cls.description}',
  '{isSpanish ? cls.description : (cls.descriptionEn || cls.description)}'
);

// 6. SubclassCard
code = code.replace(
  /export const SubclassCard: React\.FC<SubclassCardProps> = \(\{([^}]+)\}\) => \{/,
  (m) => `${m}\n  const { isSpanish } = useLanguageStore();`
);
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: isLocked \? handleInspect : onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-lg border transition select-none flex flex-col justify-between',
  '<div\n      onClick={isLocked ? handleInspect : onSelect}\n      className={`p-3 rounded-lg border transition select-none flex flex-col justify-between'
);

// 7. ClassProgressionCard
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: handleInspect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-2.5 rounded-lg border text-xs transition cursor-pointer select-none',
  '<div\n      onClick={handleInspect}\n      className={`p-2.5 rounded-lg border text-xs transition cursor-pointer select-none'
);

// 8. FightingStyleCard
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-lg border cursor-pointer transition select-none flex flex-col justify-between',
  '<div\n      onClick={onSelect}\n      className={`p-3 rounded-lg border cursor-pointer transition select-none flex flex-col justify-between'
);

// 9. BackgroundCard
code = code.replace(
  /export const BackgroundCard: React\.FC<BackgroundCardProps> = \(\{([^}]+)\}\) => \{/,
  (m) => `${m}\n  const { isSpanish } = useLanguageStore();`
);
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: handleInspect,\s*onClick: onSelect,\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none',
  '<div\n      onClick={onSelect}\n      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between select-none'
);
code = code.replace(
  '{bg.name}',
  '{isSpanish ? bg.name : (bg.nameEn || bg.name)}'
);

// 10. SpellCardComponent
code = code.replace(
  /const bind = useLongPress\(\{\s*onLongPress: \(\) => onInspect\(spell\),\s*onClick: \(\) => \{\s*if \(isHigherLevel\) \{\s*onInspect\(spell\);\s*\} else \{\s*onToggle\(\);\s*\}\s*\},\s*\}\);/,
  ''
);
code = code.replace(
  '<div\n      {...bind}\n      className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 select-none cursor-pointer',
  '<div\n      onClick={() => { if (isHigherLevel) onInspect(spell); else onToggle(); }}\n      className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 select-none cursor-pointer'
);

// Clean up any remaining references to 'mantén presionado' in titles
code = code.replace(/Mantén presionado o pulsa/g, 'Pulsa');
code = code.replace(/o mantén presionado/g, '');

fs.writeFileSync(filePath, code, 'utf-8');
console.log('CreatorCards.tsx successfully patched: removed useLongPress, wired bilingual support and eye buttons!');
