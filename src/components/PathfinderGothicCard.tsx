import React from 'react';
import { Character, Campaign } from '../types';
import { formatModifier } from '../utils/crCalculator';
import { isSpellcasterClass } from '../data/spellsData';
import { getBarbarianMaxRages, getBarbarianRageDamageBonus } from '../data/characterRulesEngine';
import { FantasyAvatarFrame } from './FantasyAvatarFrame';
import { useLanguageStore } from '../hooks/useLanguageStore';
import {
  localizeReactNode,
  localizeString,
  translateCharacterClassName,
  translateCharacterRaceName,
  translateDndTitle,
} from '../utils/dndEnglishTranslator';
import {
  Shield,
  Heart,
  Eye,
  Zap,
  Edit2,
  Trash2,
  Plus,
  Sparkles,
  Sword,
  Minus,
  User,
  BookOpen,
  Flame,
  FileDown,
  ArrowUp,
  Save,
} from 'lucide-react';

interface PathfinderGothicCardProps {
  char: Character;
  activeCampaign?: Campaign;
  activeCampaignId?: string;
  onOpenCustomSheet?: (char: Character) => void;
  onEditCharacter: (char: Character) => void;
  onEditCharacterInCreator?: (char: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onUpdateHp: (id: string, newHp: number, tempHp?: number) => void;
  onOpenGrimoire?: (char: Character) => void;
  onUpdateCharacter?: (char: Character) => void;
  setLevelUpCharacter: (char: Character) => void;
  handleExportPdf: (char: Character) => void;
  handleExportJson: (char: Character) => void;
  quickDamageId: string | null;
  setQuickDamageId: (id: string | null) => void;
  quickAmount: string;
  setQuickAmount: (val: string) => void;
  applyQuickAdjustment: (char: Character, isDamage: boolean) => void;
  handleToggleBarbarianRage: (char: Character) => void;
  exportingCharId: string | null;
}

const getClassAbbrev = (rawName: string, isSpanish: boolean): string => {
  const lower = (rawName || '').toLowerCase();
  if (lower.includes('barbar') || lower.includes('bárbar')) return isSpanish ? 'Bár' : 'Bar';
  if (lower.includes('bard')) return 'Brd';
  if (lower.includes('cler') || lower.includes('clér')) return 'Clr';
  if (lower.includes('druid')) return 'Dru';
  if (lower.includes('guerr') || lower.includes('fight')) return isSpanish ? 'Gue' : 'Ftr';
  if (lower.includes('monk') || lower.includes('monj')) return isSpanish ? 'Mon' : 'Mnk';
  if (lower.includes('palad')) return 'Pal';
  if (lower.includes('explor') || lower.includes('rang')) return isSpanish ? 'Exp' : 'Rgr';
  if (lower.includes('picar') || lower.includes('pícar') || lower.includes('rogue')) return isSpanish ? 'Píc' : 'Rog';
  if (lower.includes('hechic') || lower.includes('sorcer')) return isSpanish ? 'Hec' : 'Sor';
  if (lower.includes('bruj') || lower.includes('warlock')) return isSpanish ? 'Bru' : 'Wlk';
  if (lower.includes('mago') || lower.includes('wizard')) return isSpanish ? 'Mag' : 'Wiz';
  if (lower.includes('artif') || lower.includes('artíf')) return 'Art';
  if (lower.includes('pugil')) return 'Pug';
  if (lower.includes('blood') || lower.includes('sangre')) return isSpanish ? 'Caz' : 'Bld';
  const clean = rawName.split('(')[0].trim();
  return clean.slice(0, 3);
};

export const PathfinderGothicCard: React.FC<PathfinderGothicCardProps> = ({
  char,
  activeCampaign,
  activeCampaignId,
  onOpenCustomSheet,
  onEditCharacter,
  onEditCharacterInCreator,
  onDeleteCharacter,
  onUpdateHp,
  onOpenGrimoire,
  onUpdateCharacter,
  setLevelUpCharacter,
  handleExportPdf,
  handleExportJson,
  quickDamageId,
  setQuickDamageId,
  quickAmount,
  setQuickAmount,
  applyQuickAdjustment,
  handleToggleBarbarianRage,
  exportingCharId,
}) => {
  const { isSpanish } = useLanguageStore();

  const hpPercentage = Math.round(
    Math.max(0, Math.min(100, (char.currentHp / (char.maxHp || 1)) * 100))
  );

  const spellCount = char.spells?.length || 0;
  const isCaster = isSpellcasterClass(char.class);
  const classLower = char.class.toLowerCase();
  const isBarbarian = classLower.includes('barb') || classLower.includes('bárbaro');
  const barbarianLevel = char.level || 1;
  const maxRages = isBarbarian ? getBarbarianMaxRages(barbarianLevel) : 0;
  const rageDmg = isBarbarian ? getBarbarianRageDamageBonus(barbarianLevel) : 0;
  const rageRes = isBarbarian ? char.classResources?.find((r) => r.id === 'res-furia') : undefined;
  const availableRages = rageRes !== undefined ? rageRes.current : maxRages;
  const isRaging = !!char.isRaging;

  const isPugilist = classLower.includes('pugilist') || classLower.includes('boxead') || classLower.includes('boxer');
  const isMonk = classLower.includes('monk') || classLower.includes('monje');
  const isFighter = classLower.includes('guerr') || classLower.includes('fight');
  const isRogue = classLower.includes('pícaro') || classLower.includes('picaro') || classLower.includes('rogue');

  let folioButtonText = isSpanish ? 'Abrir Grimorio →' : 'Open Grimoire →';
  let folioTitle = isSpanish ? 'Grimorio Místico' : 'Mystic Grimoire';
  let FolioIcon = BookOpen;

  if (isPugilist) {
    folioButtonText = isSpanish ? 'Cuadrilátero & Flujo →' : 'Ring & Flow →';
    folioTitle = isSpanish ? 'Club de la Pelea' : 'Fight Club';
    FolioIcon = Shield;
  } else if (isBarbarian) {
    folioButtonText = isSpanish ? 'Furia & Combate →' : 'Rage & Combat →';
    folioTitle = isSpanish ? 'Códice de Furia' : 'Rage Codex';
    FolioIcon = Flame;
  } else if (isMonk) {
    folioButtonText = isSpanish ? 'Ki & Habilidades →' : 'Ki & Abilities →';
    folioTitle = isSpanish ? 'Disciplina del Ki' : 'Ki Discipline';
    FolioIcon = Zap;
  } else if (isFighter) {
    folioButtonText = isSpanish ? 'Tácticas & Segundo Aire →' : 'Tactics & Second Wind →';
    folioTitle = isSpanish ? 'Manual de Combate' : 'Combat Manual';
    FolioIcon = Sword;
  } else if (isRogue) {
    folioButtonText = isSpanish ? 'Furtivo & Artimañas →' : 'Sneak & Cunning →';
    folioTitle = isSpanish ? 'Manual de Subterfugio' : 'Subterfuge Manual';
    FolioIcon = Eye;
  } else if (isCaster) {
    folioButtonText = isSpanish ? 'Abrir Grimorio →' : 'Open Grimoire →';
    folioTitle = isSpanish
      ? `Grimorio de ${char.class.split(' ')[0]}`
      : `${translateCharacterClassName(char.class.split(' ')[0])} Grimoire`;
    FolioIcon = Sparkles;
  }

  const is2024 =
    char.edition === '5.5e' ||
    (char.creatorState as any)?.selectedEdition === '5.5e' ||
    (char as any).rulesEdition === '2024' ||
    (char as any).edition === '2024';

  // Multiclass & Class Breakdown extraction
  const classBreakdown = React.useMemo(() => {
    if (char.multiclass && char.multiclass.length > 1) {
      const items = char.multiclass.map((mc) => {
        const fullClassName = isSpanish ? mc.className : translateCharacterClassName(mc.className);
        const sub = mc.subclass ? (isSpanish ? mc.subclass : translateDndTitle(mc.subclass)) : '';
        const abbr = getClassAbbrev(mc.className, isSpanish);
        return {
          abbr,
          className: fullClassName,
          subclass: sub,
          level: mc.level,
        };
      });

      const shortSummary = items.map((it) => `${it.abbr} ${it.level}`).join(' / ');
      return {
        isMulticlass: true,
        shortSummary,
        items,
      };
    }

    // Single class
    const cleanPrimary = (char.class || '').split('/')[0].split('(')[0].trim() || (isSpanish ? 'Aventurero' : 'Adventurer');
    const fullClassName = isSpanish ? char.class : translateCharacterClassName(char.class);
    const sub = char.subclass ? (isSpanish ? char.subclass : translateDndTitle(char.subclass)) : '';
    const abbr = getClassAbbrev(cleanPrimary, isSpanish);

    return {
      isMulticlass: false,
      shortSummary: `${abbr} ${char.level}`,
      items: [
        {
          abbr,
          className: fullClassName,
          subclass: sub,
          level: char.level,
        },
      ],
    };
  }, [char.multiclass, char.class, char.subclass, char.level, isSpanish]);

  const detailedClassTitle = React.useMemo(() => {
    if (classBreakdown.isMulticlass) {
      return (
        (isSpanish
          ? `Multiclase (Nivel Total ${char.level}):\n`
          : `Multiclass (Total Level ${char.level}):\n`) +
        classBreakdown.items
          .map((it) => `• ${it.className} ${isSpanish ? 'Nivel' : 'Level'} ${it.level}${it.subclass ? ` (${it.subclass})` : ''}`)
          .join('\n')
      );
    }
    const single = classBreakdown.items[0];
    return isSpanish
      ? `${single?.className || char.class} Nivel ${char.level}${single?.subclass ? ` (${single.subclass})` : ''}`
      : `${single?.className || char.class} Level ${char.level}${single?.subclass ? ` (${single.subclass})` : ''}`;
  }, [classBreakdown, char.level, char.class, isSpanish]);

  const isInActiveCampaign =
    char.campaignId === activeCampaignId ||
    char.campaignIds?.includes(activeCampaignId || '') ||
    char.campaignIds?.includes('all');
  const isGlobalForAll = char.campaignIds?.includes('all');

  return localizeReactNode(
    <div
      className="relative flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 group"
      style={{
        backgroundImage: 'url(./assets/backgrounds/card_parchment_compact.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        border: 'none',
        filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.75))',
        padding: '20px 24px 16px 24px',
        minHeight: 'auto',
      }}
    >
      <div>
        {/* Hero Identity: Avatar Frame + Info + Direct Utility Stamped Icons */}
        <div>
          <div className="flex items-start gap-3.5">
            {/* Medallion Avatar Frame */}
            <div className="shrink-0 drop-shadow-[0_6px_10px_rgba(40,20,10,0.35)]">
              <FantasyAvatarFrame
                avatarUrl={char.avatarUrl}
                name={char.name}
                level={char.level}
                frameStyle={char.avatarFrame || 'frame-royal-gold'}
                size="md"
                avatarScale={char.avatarScale}
                avatarOffsetY={char.avatarOffsetY}
                onClick={() =>
                  char.isDraft
                    ? (onEditCharacterInCreator ? onEditCharacterInCreator(char) : onEditCharacter(char))
                    : (onOpenCustomSheet ? onOpenCustomSheet(char) : onEditCharacter(char))
                }
                showLevelBadge={true}
                showExpandHint={false}
              />
            </div>

            {/* Character Info & In-line Quick Stamped Action Icons */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <h3
                    onClick={() =>
                      char.isDraft
                        ? (onEditCharacterInCreator ? onEditCharacterInCreator(char) : onEditCharacter(char))
                        : (onOpenCustomSheet ? onOpenCustomSheet(char) : onEditCharacter(char))
                    }
                    className="text-base font-bold font-fantasy text-[#241308] hover:text-[#8c501c] cursor-pointer transition flex items-center gap-1.5 leading-snug break-words"
                    title={
                      char.isDraft
                        ? isSpanish
                          ? 'Reanudar borrador en el Creador'
                          : 'Resume draft in Creator'
                        : isSpanish
                        ? 'Abrir Hoja Completa'
                        : 'Open Full Sheet'
                    }
                  >
                    <span>{isSpanish ? char.name : localizeString(char.name, false)}</span>
                  </h3>
                  <p className="text-xs text-[#5c3e28] font-medium mt-0.5 leading-snug break-words">
                    {isSpanish ? char.race : translateCharacterRaceName(char.race)} •{' '}
                    {isSpanish ? char.class : translateCharacterClassName(char.class)}{' '}
                    {char.subclass
                      ? `(${isSpanish ? char.subclass : translateDndTitle(char.subclass)})`
                      : ''}
                  </p>
                </div>

                {/* Stamped Ink Utility Icons + Rules Edition Badge (Noticeable Emblem) */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-0.5 text-[#5c3e28]">
                    {char.isDraft ? (
                      <>
                        <button
                          onClick={() => onEditCharacterInCreator ? onEditCharacterInCreator(char) : onEditCharacter(char)}
                          className="p-1 hover:text-[#8c3514] hover:bg-[#8c3514]/10 rounded transition cursor-pointer"
                          title={isSpanish ? 'Reanudar Borrador' : 'Resume Draft'}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteCharacter(char.id)}
                          className="p-1 hover:text-[#9e2a2b] hover:bg-[#9e2a2b]/10 rounded transition cursor-pointer"
                          title={isSpanish ? 'Eliminar' : 'Delete'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleExportPdf(char)}
                          disabled={exportingCharId === char.id}
                          className="p-1 hover:text-[#1e140d] hover:bg-[#8c5e31]/15 rounded transition cursor-pointer disabled:opacity-30"
                          title={isSpanish ? 'Exportar Hoja Oficial de D&D 5e (PDF)' : 'Export Official D&D 5e Sheet (PDF)'}
                        >
                          <FileDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleExportJson(char)}
                          className="p-1 hover:text-[#321c40] hover:bg-[#8c5e31]/15 rounded transition cursor-pointer"
                          title={isSpanish ? 'Exportar Archivo .JSON' : 'Export .JSON File'}
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditCharacterInCreator ? onEditCharacterInCreator(char) : onEditCharacter(char)}
                          className="p-1 hover:text-[#8c501c] hover:bg-[#8c5e31]/15 rounded transition cursor-pointer"
                          title={isSpanish ? 'Editar en Creador' : 'Edit in Creator'}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteCharacter(char.id)}
                          className="p-1 hover:text-[#9e2a2b] hover:bg-[#9e2a2b]/10 rounded transition cursor-pointer"
                          title={isSpanish ? 'Eliminar' : 'Delete'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Rules Edition Badge (Notable fantasy stamp) */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-fantasy font-black text-[10.5px] uppercase tracking-wider border select-none transition-transform hover:scale-105 shadow-xs ${
                      is2024
                        ? 'bg-gradient-to-r from-[#6e410e] via-[#a86b1f] to-[#6e410e] text-[#fff0be] border-[#f0c058] shadow-[0_2px_6px_rgba(168,107,31,0.45)]'
                        : 'bg-gradient-to-r from-[#2c2016] via-[#423020] to-[#2c2016] text-[#e5d1a8] border-[#8a6834] shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
                    }`}
                    title={
                      is2024
                        ? (isSpanish ? 'Reglas Oficiales 2024 Revisadas (5.5e)' : 'Official 2024 Revised Rules (5.5e)')
                        : (isSpanish ? 'Reglas Oficiales 2014 Clásicas (5e)' : 'Official 2014 Classic Rules (5e)')
                    }
                  >
                    <span className="text-[10px]">{is2024 ? '✨' : '⚔️'}</span>
                    <span>{is2024 ? '5.5E (2024)' : '5E (2014)'}</span>
                  </div>
                </div>
              </div>

              {(char.playerName || char.ownerUsername) && (
                <p className="text-[10.5px] text-[#734e32] font-semibold truncate flex items-center gap-1 mt-1">
                  <User className="w-3 h-3 text-[#96673d]" />
                  <span>
                    {isSpanish ? 'Jugador:' : 'Player:'}{' '}
                    <strong>
                      {!isSpanish && (char.ownerUsername || char.playerName) === 'Aventurero'
                        ? 'Adventurer'
                        : char.ownerUsername || char.playerName}
                    </strong>
                  </span>
                </p>
              )}

              {/* Action Buttons: Hoja de Héroe + Nv+1 */}
              {!char.isDraft && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#8c5e31]/25">
                  {onOpenCustomSheet && (
                    <button
                      type="button"
                      onClick={() => onOpenCustomSheet(char)}
                      className="relative flex-1 h-9 px-3 transition-all duration-150 hover:brightness-110 active:scale-98 cursor-pointer flex items-center justify-center select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group"
                      style={{
                        backgroundImage: 'url(./assets/ui/btn_hoja_heroe.png)',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'transparent',
                      }}
                      title={isSpanish ? 'Abrir Hoja Completa' : 'Open Full Sheet'}
                    >
                      <span
                        className="ml-6 text-[11.5px] font-fantasy font-extrabold tracking-wider uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]"
                        style={{
                          background: 'linear-gradient(180deg, #fff2d1 0%, #dfbe7e 45%, #b38234 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {isSpanish ? 'Hoja de Héroe' : 'Hero Sheet'}
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setLevelUpCharacter(char)}
                    className="relative h-9 px-3.5 shrink-0 transition-all duration-150 hover:brightness-115 active:scale-98 cursor-pointer flex items-center justify-center select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group"
                    style={{
                      backgroundImage: 'url(./assets/ui/btn_level_up.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'transparent',
                      minWidth: '84px',
                    }}
                    title={isSpanish ? 'Subir Nivel (+1)' : 'Level Up (+1)'}
                  >
                    <span
                      className="ml-5 text-[11.5px] font-fantasy font-extrabold tracking-wide uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]"
                      style={{
                        background: 'linear-gradient(180deg, #f0fffa 0%, #7bf5b8 45%, #2bb873 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {isSpanish ? 'Nv+1' : 'Lv+1'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stamped Stats Row (Forged Armor Shield, Init Crest, Passive Perception Crest) */}
          <div className="grid grid-cols-3 gap-1 mt-3.5 pt-2.5 pb-2 border-t border-b border-[#8c5e31]/30">
            {/* Forged AC Shield */}
            <div className="flex items-center justify-center gap-2">
              <div
                className="relative w-9 h-10 shrink-0 flex items-center justify-center filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]"
              >
                <img
                  src="./assets/ui/badge_shield_ac.png"
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <span className="relative z-10 font-mono font-bold text-xs text-[#fff6e0] -mt-0.5 leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.95)]">
                  {char.ac}
                </span>
              </div>
              <div className="flex flex-col text-left leading-tight min-w-0">
                <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider">
                  {isSpanish ? 'Armadura' : 'Armor'}
                </span>
                <span className="font-fantasy font-bold text-xs text-[#241308]">
                  {isSpanish ? 'CA' : 'AC'} {char.ac}
                </span>
              </div>
            </div>

            {/* Init Forged Crest */}
            <div className="flex items-center justify-center gap-2 border-l border-[#8c5e31]/25 pl-1.5">
              <div
                className="relative w-9 h-9 shrink-0 flex items-center justify-center filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]"
              >
                <img
                  src="./assets/ui/coin_stat_medallion.png"
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <Zap className="relative z-10 w-3.5 h-3.5 text-[#f0c869] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]" />
              </div>
              <div className="flex flex-col text-left leading-tight min-w-0">
                <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider">
                  {isSpanish ? 'Iniciativa' : 'Initiative'}
                </span>
                <span className="font-fantasy font-bold text-xs text-[#241308]">
                  {char.initiativeBonus >= 0 ? `+${char.initiativeBonus}` : char.initiativeBonus}
                </span>
              </div>
            </div>

            {/* Perception Forged Crest */}
            <div className="flex items-center justify-center gap-2 border-l border-[#8c5e31]/25 pl-1.5">
              <div
                className="relative w-9 h-9 shrink-0 flex items-center justify-center filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]"
              >
                <img
                  src="./assets/ui/coin_stat_medallion.png"
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <Eye className="relative z-10 w-3.5 h-3.5 text-[#f0c869] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]" />
              </div>
              <div className="flex flex-col text-left leading-tight min-w-0">
                <span className="text-[8.5px] uppercase font-bold text-[#6b472e] tracking-wider">
                  {isSpanish ? 'Percepción' : 'Perception'}
                </span>
                <span className="font-fantasy font-bold text-xs text-[#241308]">{char.passivePerception}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Draft Progress Banner */}
        {char.isDraft ? (
          <div className="p-3 my-2 border border-[#8c5e31]/30 rounded-lg bg-[#8c3514]/5 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-fantasy font-bold text-[#803814] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#b8501c]" />{' '}
                {isSpanish ? 'Borrador en Pausa' : 'Draft Paused'}
              </span>
              <span className="font-mono font-bold text-[#803814] text-sm">
                {char.draftProgress || 0}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#d4c1a5] rounded-full overflow-hidden border border-[#b89e7e]">
              <div
                className="h-full bg-gradient-to-r from-[#b8501c] to-[#e07534] rounded-full transition-all duration-300"
                style={{ width: `${Math.max(10, char.draftProgress || 0)}%` }}
              />
            </div>
            <button
              onClick={() => onEditCharacterInCreator ? onEditCharacterInCreator(char) : onEditCharacter(char)}
              className="w-full py-2 bg-gradient-to-r from-[#803814] via-[#9e481c] to-[#803814] hover:from-[#944218] hover:to-[#b05322] text-[#fff2e5] font-fantasy font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-[#59260d]"
            >
              <Sparkles className="w-4 h-4 text-[#ffd8b8]" />
              <span>{isSpanish ? 'Reanudar en la Forja de Héroes' : 'Resume in Hero Forge'}</span>
            </button>
          </div>
        ) : (
          <>
            {/* Hit Points (HP) - Multi-State Alchemical Glass Vial */}
            <div className="py-2.5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-[#422917] font-bold font-fantasy">
                  <Heart className="w-4 h-4 text-[#99221b] fill-[#99221b]" />
                  <span>HP</span>
                </span>
                <span className="font-mono font-bold text-sm text-[#3b1710]">
                  {char.currentHp} / {char.maxHp}
                  {char.tempHp > 0 && (
                    <span className="text-[#18446b] text-xs ml-1">(+{char.tempHp} temp)</span>
                  )}
                </span>
              </div>

              {/* Sleek Elongated 3-Part Transparent Glass Vial with Exact Coded Liquid Fill Behind Glass */}
              <div className="relative w-full my-1 flex items-center select-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.45)]">
                {/* Left Forged Bronze Vial Cap */}
                <img
                  src="./assets/ui/hp_vial_cap_left.png"
                  alt=""
                  draggable={false}
                  className="h-6 w-auto object-contain shrink-0 z-20 pointer-events-none select-none -mr-2"
                />

                {/* Center Crystal Glass Tube with Exact Coded Progress Bar Inside */}
                <div className="relative flex-1 h-[15px] bg-[#140a09] rounded-xs overflow-hidden border-y border-[#5c4028]/90 shadow-[inset_0_2px_5px_rgba(0,0,0,0.95)]">
                  <div
                    className="h-full transition-all duration-500 ease-out relative"
                    style={{
                      width: `${hpPercentage}%`,
                      background:
                        hpPercentage <= 25
                          ? 'linear-gradient(180deg, #ff6b5b 0%, #c9241b 45%, #6e0d08 100%)'
                          : hpPercentage <= 50
                          ? 'linear-gradient(180deg, #f97352 0%, #b91c1c 45%, #631010 100%)'
                          : 'linear-gradient(180deg, #ff5a60 0%, #b81422 45%, #5e0810 100%)',
                      boxShadow: '0 0 10px rgba(220,38,38,0.6), inset 0 1px 2px rgba(255,220,220,0.6)',
                    }}
                  >
                    {hpPercentage > 0 && hpPercentage < 100 && (
                      <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#ffd5d5] via-[#ff7a7a] to-[#991b1b] shadow-[0_0_5px_#ff8080]" />
                    )}
                  </div>

                  {/* Transparent Alchemical Crystal Glass Cylinder Overlay */}
                  <img
                    src="./assets/ui/hp_vial_glass_center.png"
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 opacity-90 mix-blend-screen"
                  />
                  <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.35),inset_0_-2.5px_4px_rgba(0,0,0,0.75)]" />
                </div>

                {/* Right Forged Bronze Vial Cap */}
                <img
                  src="./assets/ui/hp_vial_cap_right.png"
                  alt=""
                  draggable={false}
                  className="h-6 w-auto object-contain shrink-0 z-20 pointer-events-none select-none -ml-2"
                />
              </div>

              {/* Quick Health Modifiers (-5, -1, ±, +1, +5) */}
              <div className="flex items-center justify-between mt-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateHp(char.id, char.currentHp - 5)}
                    className="px-2.5 py-0.5 bg-[#421d19] hover:bg-[#592621] text-[#f7d7d5] border border-[#7a2e27] rounded text-[11px] font-mono font-bold transition cursor-pointer shadow-xs"
                    title={isSpanish ? 'Restar 5 HP' : 'Subtract 5 HP'}
                  >
                    -5
                  </button>
                  <button
                    onClick={() => onUpdateHp(char.id, char.currentHp - 1)}
                    className="px-2 py-0.5 bg-[#421d19] hover:bg-[#592621] text-[#f7d7d5] border border-[#7a2e27] rounded text-[11px] font-mono font-bold transition cursor-pointer shadow-xs"
                    title={isSpanish ? 'Restar 1 HP' : 'Subtract 1 HP'}
                  >
                    -1
                  </button>
                </div>

                {quickDamageId === char.id ? (
                  <div className="flex items-center gap-1 bg-[#d9c5a7] p-1 rounded-md border border-[#8a6845]">
                    <input
                      type="number"
                      autoFocus
                      placeholder={isSpanish ? 'cant' : 'amt'}
                      value={quickAmount}
                      onChange={(e) => setQuickAmount(e.target.value)}
                      className="w-12 bg-white text-xs text-center border border-[#6b4728] rounded px-1 py-0.5 text-[#2c1a0e] font-bold"
                    />
                    <button
                      onClick={() => applyQuickAdjustment(char, true)}
                      className="p-1 bg-[#80221c] hover:bg-[#992a23] text-white rounded text-[10px]"
                      title={isSpanish ? 'Aplicar Daño' : 'Apply Damage'}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => applyQuickAdjustment(char, false)}
                      className="p-1 bg-[#265934] hover:bg-[#327344] text-white rounded text-[10px]"
                      title={isSpanish ? 'Aplicar Curación' : 'Apply Healing'}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setQuickDamageId(char.id);
                      setQuickAmount('');
                    }}
                    className="text-[11px] font-fantasy font-bold text-[#694324] hover:text-[#2e190a] underline cursor-pointer"
                  >
                    {isSpanish ? '± Daño / Cura' : '± Dmg / Heal'}
                  </button>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateHp(char.id, char.currentHp + 1)}
                    className="px-2 py-0.5 bg-[#1b3d24] hover:bg-[#255231] text-[#d6f2dc] border border-[#346b42] rounded text-[11px] font-mono font-bold transition cursor-pointer shadow-xs"
                    title={isSpanish ? 'Curar 1 HP' : 'Heal 1 HP'}
                  >
                    +1
                  </button>
                  <button
                    onClick={() => onUpdateHp(char.id, char.currentHp + 5)}
                    className="px-2.5 py-0.5 bg-[#1b3d24] hover:bg-[#255231] text-[#d6f2dc] border border-[#346b42] rounded text-[11px] font-mono font-bold transition cursor-pointer shadow-xs"
                    title={isSpanish ? 'Curar 5 HP' : 'Heal 5 HP'}
                  >
                    +5
                  </button>
                </div>
              </div>
            </div>

            {/* Class Codex / Grimoire Section (Subtle Inked Divider, No Thick Gradient) */}
            {onOpenGrimoire && (
              <div className="py-2 border-t border-b border-[#8c5e31]/25 flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 text-[#422917] font-medium text-[11px] min-w-0">
                  <span className="text-[#8c5e31] text-sm">᚛</span>
                  <FolioIcon className="w-3.5 h-3.5 text-[#8c5e31] shrink-0" />
                  <span className="font-bold font-fantasy truncate">{folioTitle}</span>
                  {isCaster && spellCount > 0 && (
                    <span className="text-[9.5px] bg-[#8c5e31]/15 text-[#422917] px-2 py-0.5 rounded-full border border-[#8c5e31]/30 font-mono font-bold whitespace-nowrap">
                      {spellCount} {isSpanish ? 'hechizos' : 'spells'}
                    </span>
                  )}
                  {isBarbarian && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-[9.5px] bg-[#debcae] text-[#632219] px-2 py-0.5 rounded-full border border-[#c48d7c] font-mono font-bold">
                        {availableRages}/{maxRages === 999 ? '∞' : maxRages}{' '}
                        {isSpanish ? 'Furias' : 'Rages'}
                      </span>
                      {onUpdateCharacter && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBarbarianRage(char);
                          }}
                          className={`text-[9.5px] px-2 py-0.5 rounded font-bold font-fantasy border transition cursor-pointer flex items-center gap-1 ${
                            isRaging
                              ? 'bg-[#5e1910] text-[#ffccc4] border-[#380e09]'
                              : 'bg-[#9e3323] text-white border-[#702115]'
                          }`}
                        >
                          <Flame className="w-2.5 h-2.5" />
                          {isRaging
                            ? isSpanish
                              ? 'Calmar Furia'
                              : 'End Rage'
                            : isSpanish
                            ? 'Furia'
                            : 'Rage'}
                        </button>
                      )}
                    </div>
                  )}
                  <span className="text-[#8c5e31] text-sm">᚜</span>
                </div>

                <button
                  onClick={() => onOpenGrimoire(char)}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#8c501c] hover:text-[#522c0b] transition cursor-pointer font-fantasy shrink-0 ml-auto"
                >
                  {folioButtonText}
                </button>
              </div>
            )}

            {/* Forged Octagonal Crests for Ability Scores */}
            <div className="pt-2.5">
              <div className="grid grid-cols-6 gap-1 text-center">
                {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((st) => (
                  <div
                    key={st}
                    className="relative flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-transform hover:scale-110"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <img
                      src="./assets/ui/coin_stat_medallion.png"
                      alt=""
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]"
                    />
                    <span className="relative z-10 text-[7.5px] font-extrabold uppercase text-[#e8d096] tracking-wider leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                      {st}
                    </span>
                    <span className="relative z-10 font-mono font-bold text-[11px] text-[#fff6e0] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
                      {formatModifier(char.stats[st])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Dossier Footer: Stamped Inscription Directly on Bottom of Parchment */}
      <div className="mt-3 pt-2.5 border-t border-[#8c5e31]/30 flex items-center justify-between gap-2 text-xs text-[#52331c]">
        {/* Left: Class Breakdown (Abbreviated, Interactive with Rich Hover Details) */}
        <div
          className="group/cls relative flex items-center gap-1.5 cursor-help select-none"
          title={detailedClassTitle}
        >
          <span className="text-[10px] text-[#8c5e31]">⚔️</span>
          <span className="text-[10.5px] font-fantasy font-bold text-[#5c3e28] hover:text-[#8c3514] transition-colors border-b border-dotted border-[#8c5e31]/60 tracking-wide uppercase">
            {classBreakdown.shortSummary}
          </span>

          {/* Floating Fantasy Tooltip on Hover */}
          <div className="pointer-events-none absolute bottom-full left-0 mb-2 z-50 opacity-0 group-hover/cls:opacity-100 group-hover/cls:pointer-events-auto transition-all duration-200 transform translate-y-1 group-hover/cls:translate-y-0 w-64 p-3 bg-[#1e1309] text-[#f7e6c4] border border-[#c59b27] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-left">
            <div className="flex items-center justify-between border-b border-[#8c5e31]/40 pb-1.5 mb-2">
              <span className="font-fantasy font-bold text-[11px] text-[#ffd56b] tracking-wider uppercase">
                {classBreakdown.isMulticlass
                  ? (isSpanish ? 'Progresión Multiclase' : 'Multiclass Progression')
                  : (isSpanish ? 'Detalle de Clase' : 'Class Details')}
              </span>
              <span className="font-fantasy font-black text-[10px] text-[#d4af37] px-1.5 py-0.5 bg-[#301c0b] rounded border border-[#8c5e31]/50">
                {isSpanish ? 'Total Nv.' : 'Total Lv.'} {char.level}
              </span>
            </div>
            <div className="space-y-1.5">
              {classBreakdown.items.map((it, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-[#fff3db] leading-snug truncate">
                      {it.className}
                    </div>
                    {it.subclass && (
                      <div className="text-[10px] text-[#d4b07b] italic leading-tight truncate">
                        {it.subclass}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 font-fantasy font-extrabold text-[#ffd56b] text-xs">
                    {isSpanish ? 'Nv.' : 'Lv.'} {it.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Total Level */}
        <div className="text-[10.5px] font-fantasy font-bold text-[#6b472e] tracking-wider uppercase shrink-0">
          {isSpanish ? 'Nivel' : 'Level'} {char.level}
        </div>
      </div>
    </div>,
    isSpanish
  ) as React.ReactElement;
};
