import React, { useEffect } from 'react';
import { Spell } from '../types';
import { findSpellByNameOrAlias, getSpellForEdition } from '../data/spellsData';
import { useLanguageStore } from '../hooks/useLanguageStore';
import {
  translateDndTitle,
  translateDndText,
  translateSpellSchool,
  translateSpellMeta,
  translateSpellClass,
} from '../utils/dndEnglishTranslator';
import { Sparkles, X, Plus, Trash2, Check } from 'lucide-react';

interface SpellDetailModalProps {
  spell: Spell | null;
  edition?: '5e' | '5.5e';
  onClose: () => void;
  isKnown?: boolean;
  isPrepared?: boolean;
  canCast?: boolean;
  onTogglePrepared?: () => void;
  onCastSpell?: () => void;
  onAddSpell?: () => void;
  onRemoveSpell?: () => void;
}

export const SpellDetailModal: React.FC<SpellDetailModalProps> = ({
  spell,
  edition,
  onClose,
  isKnown,
  isPrepared,
  canCast,
  onTogglePrepared,
  onCastSpell,
  onAddSpell,
  onRemoveSpell,
}) => {
  const { isSpanish, t } = useLanguageStore();

  useEffect(() => {
    if (!spell) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spell, onClose]);

  if (!spell) return null;

  const activeSpell = edition ? getSpellForEdition(spell, edition) : spell;
  const canonical = (!activeSpell.descriptionEn || !activeSpell.castingTimeEn)
    ? findSpellByNameOrAlias(activeSpell.id || activeSpell.nameEn || activeSpell.name, edition || '5e')
    : undefined;
  const castingTimeEn = activeSpell.castingTimeEn || canonical?.castingTimeEn;
  const rangeEn = activeSpell.rangeEn || canonical?.rangeEn;
  const componentsEn = activeSpell.componentsEn || canonical?.componentsEn;
  const durationEn = activeSpell.durationEn || canonical?.durationEn;
  const descriptionEn = activeSpell.descriptionEn || canonical?.descriptionEn;
  const higherLevelsEn = activeSpell.higherLevelsEn || canonical?.higherLevelsEn;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#fdfaf3] text-[#2c221a] cursor-default"
      >
        {/* Ancient Leather-Bound Header */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#2e2319] via-[#3a2c1f] to-[#2e2319] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1611] border border-[#c59b27]/70 flex items-center justify-center text-[#d4ab59] shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-fantasy text-[#f7f2ea] tracking-wide flex items-baseline gap-2 flex-wrap">
                <span>{isSpanish ? activeSpell.name : (activeSpell.nameEn || translateDndTitle(activeSpell.name))}</span>
                {isSpanish && activeSpell.nameEn && activeSpell.nameEn.toLowerCase() !== activeSpell.name.toLowerCase() && (
                  <span className="text-xs font-serif font-normal italic text-[#d4ab59]">
                    ({activeSpell.nameEn})
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#c7b9a5] mt-0.5">
                <span className="font-mono uppercase font-bold text-[#d4ab59]">
                  {activeSpell.level === 0 ? t('Truco (Cantrip)', 'Cantrip') : `${t('Nivel', 'Level')} ${activeSpell.level}`}
                </span>
                <span>•</span>
                <span className="font-fantasy font-medium">{isSpanish ? activeSpell.school : translateSpellSchool(activeSpell.school)}</span>
                {edition === '5.5e' && (
                  <span className="bg-[#3d2e14] text-[#ffd56b] px-1.5 py-0.2 rounded text-[10px] border border-[#c59b27]/60 font-mono font-bold">
                    5.5e (2024)
                  </span>
                )}
                {activeSpell.ritual && (
                  <span className="bg-[#41311b] text-[#ecd89f] px-1.5 py-0.2 rounded text-[10px] border border-[#75592e] font-mono">
                    Ritual
                  </span>
                )}
                {activeSpell.concentration && (
                  <span className="bg-[#59231f] text-[#f7d6d4] px-1.5 py-0.2 rounded text-[10px] border border-[#8a3934] font-mono">
                    {t('Concentración', 'Concentration')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#c7b9a5] hover:text-white hover:bg-[#4a3a2a] rounded-lg transition cursor-pointer"
            title={t('Cerrar detalles', 'Close details')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Parchment Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-serif bg-[#fbf6e9]">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                {t('Tiempo de Lanzamiento', 'Casting Time')}
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">
                {isSpanish ? activeSpell.castingTime : (castingTimeEn || translateSpellMeta(activeSpell.castingTime))}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                {t('Alcance / Área', 'Range / Area')}
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">
                {isSpanish ? activeSpell.range : (rangeEn || translateSpellMeta(activeSpell.range))}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                {t('Componentes', 'Components')}
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">
                {isSpanish ? activeSpell.components : (componentsEn || translateDndText(activeSpell.components))}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8c672b] uppercase block font-fantasy">
                {t('Duración', 'Duration')}
              </span>
              <span className="font-semibold text-[#3b2b1b] mt-0.5 block">
                {isSpanish ? activeSpell.duration : (durationEn || translateSpellMeta(activeSpell.duration))}
              </span>
            </div>
          </div>

          {/* Classes allowed */}
          {activeSpell.classes && activeSpell.classes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-[#6e5842] font-fantasy">{t('Clases autorizadas:', 'Available to Classes:')}</span>
              {activeSpell.classes.map((cls: string) => (
                <span
                  key={cls}
                  className="bg-[#ede1ce] text-[#543b18] px-2 py-0.5 rounded-full border border-[#cfbe9f] text-[11px] font-semibold font-mono"
                >
                  {isSpanish ? cls : translateSpellClass(cls)}
                </span>
              ))}
            </div>
          )}

          {/* Full Description */}
          <div className="p-4 bg-[#f8f2e4] rounded-xl border border-[#d6c4aa] shadow-inner">
            <h4 className="text-xs font-bold font-fantasy text-[#63451d] uppercase mb-2">
              {t('Efecto Completo del Conjuro', 'Full Spell Effect')}
            </h4>
            <p className="text-sm text-[#3a2c1f] leading-relaxed whitespace-pre-line">
              {isSpanish ? activeSpell.description : (descriptionEn || translateDndText(activeSpell.description))}
            </p>
          </div>

          {/* Higher Levels Scaling */}
          {activeSpell.higherLevels && (
            <div className="p-3.5 bg-[#faecd6] rounded-xl border border-[#deb87a]">
              <h4 className="text-xs font-bold font-fantasy text-[#7d561a] uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#b88c32]" /> {t('A Niveles Superiores', 'At Higher Levels')}
              </h4>
              <p className="text-xs text-[#5e3f10] leading-relaxed">
                {isSpanish ? activeSpell.higherLevels : (higherLevelsEn || translateDndText(activeSpell.higherLevels))}
              </p>
            </div>
          )}

          {/* Quick Actions Footer inside Modal */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#d8c8af]">
            <span className="text-xs text-[#8c7457] italic">
              {edition === '5.5e'
                ? t('Compendio Oficial D&D 5.5e (2024)', 'Official D&D 5.5e (2024) Compendium')
                : t('Compendio Oficial', 'Official Spell Compendium')}
            </span>

            <div className="flex items-center gap-2">
              {onTogglePrepared && isKnown && activeSpell.level > 0 && (
                <button
                  type="button"
                  onClick={onTogglePrepared}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1 ${
                    isPrepared
                      ? 'bg-[#c59b27] text-[#1c150e]'
                      : 'bg-[#dfd2be] text-[#5e4b37] hover:bg-[#d4c5ae]'
                  }`}
                >
                  {isPrepared ? <Check className="w-3.5 h-3.5" /> : null}
                  {isPrepared ? t('Preparado', 'Prepared') : t('+ Preparar', '+ Prepare')}
                </button>
              )}

              {onCastSpell && canCast && (
                <button
                  type="button"
                  onClick={() => {
                    onCastSpell();
                    onClose();
                  }}
                  className="px-4 py-1.5 bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> {t('Lanzar Conjuro', 'Cast Spell')}
                </button>
              )}

              {onAddSpell && !isKnown && (
                <button
                  type="button"
                  onClick={() => {
                    onAddSpell();
                    onClose();
                  }}
                  className="px-4 py-1.5 bg-[#b88c32] hover:bg-[#8c672b] text-white rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> {t('Añadir al Libro', 'Add to Spellbook')}
                </button>
              )}

              {onRemoveSpell && isKnown && (
                <button
                  type="button"
                  onClick={() => {
                    onRemoveSpell();
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-[#963833] hover:bg-[#b0403a] text-white rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1"
                  title={t('Eliminar de mi libro de conjuros', 'Remove from spellbook')}
                >
                  <Trash2 className="w-3.5 h-3.5" /> {t('Quitar', 'Remove')}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#4a361c] rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                {t('Cerrar', 'Close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
