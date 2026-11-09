import fs from 'fs';

const filePath = 'C:/Users/natal/.gemini/antigravity/scratch/dnd-character-forge/src/components/CharacterCreatorModal.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Patch Background
const bgStartTarget = '                  {/* Entire Background Selection: Filters + Search + Catalog Accordion */}\n                  <div id="creator-background-catalog" className="space-y-3">';
const bgStartReplacement = `                  {/* 2024 BACKGROUND PICKER vs 5e BACKGROUND CATALOG */}
                  {selectedEdition === '5.5e' ? (
                    <Creator2024BackgroundPicker
                      selectedBackgroundId={selectedBackgroundId}
                      onSelectBackground={(id) => setSelectedBackgroundId(id)}
                      bgAsiMode={bgAsiMode2024}
                      setBgAsiMode={setBgAsiMode2024}
                      bgAsiStatPlusTwo={bgAsiStatPlusTwo}
                      setBgAsiStatPlusTwo={setBgAsiStatPlusTwo}
                      bgAsiStatPlusOne={bgAsiStatPlusOne}
                      setBgAsiStatPlusOne={setBgAsiStatPlusOne}
                    />
                  ) : (
                    <>
                  {/* Entire Background Selection: Filters + Search + Catalog Accordion */}
                  <div id="creator-background-catalog" className="space-y-3">`;

const bgEndTarget = `                    <div id="creator-background-subdecisions" className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona un trasfondo arriba para ver su rasgo especial y equipo sugerido.
                    </div>
                  )}

                </div>
              )}`;

const bgEndReplacement = `                    <div id="creator-background-subdecisions" className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona un trasfondo arriba para ver su rasgo especial y equipo sugerido.
                    </div>
                  )}
                    </>
                  )}

                </div>
              )}`;

if (code.includes(bgStartTarget)) {
  code = code.replace(bgStartTarget, bgStartReplacement);
  console.log('Patched bg start');
} else {
  console.log('bgStartTarget not found');
}

if (code.includes(bgEndTarget)) {
  code = code.replace(bgEndTarget, bgEndReplacement);
  console.log('Patched bg end');
} else {
  console.log('bgEndTarget not found');
}

// Patch Class Weapon Mastery
const classEndTarget = `                    <div className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona una clase de la lista para ver sus subclases, progresión y habilidades.
                    </div>
                  )}
                </div>
              )}`;

const classEndReplacement = `                    <div className="p-4 bg-[#f5ede0] rounded-xl border border-dashed border-[#d6c4aa] text-center text-xs text-[#7a6448]">
                      Selecciona una clase de la lista para ver sus subclases, progresión y habilidades.
                    </div>
                  )}

                  {/* 2024 WEAPON MASTERY PICKER (MARTIAL CLASSES) */}
                  {selectedEdition === '5.5e' && (
                    <Creator2024WeaponMasteryPicker
                      classNameString={activeClass?.name || ''}
                      characterLevel={characterLevel}
                      selectedMasteries={selectedWeaponMasteries}
                      onToggleMastery={(m) => {
                        setSelectedWeaponMasteries((prev) =>
                          prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                        );
                      }}
                    />
                  )}
                </div>
              )}`;

if (code.includes(classEndTarget)) {
  code = code.replace(classEndTarget, classEndReplacement);
  console.log('Patched class mastery');
} else {
  console.log('classEndTarget not found');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Done!');
