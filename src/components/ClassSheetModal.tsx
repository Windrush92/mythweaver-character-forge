import React, { useState } from 'react';
import { Character, Spell, CharacterSpellSlots, SpellSlotLevel, ClassResource } from '../types';
import {
  OFFICIAL_SPELLS_COMPENDIUM,
  filterSpellsForCharacter,
  isSpellcasterClass,
  getMaxSpellLevel,
  getSpellcastingLimits,
  SpellcastingLimits,
} from '../data/spellsData';
import { SpellDetailModal } from './SpellDetailModal';
import { RestModal, RestResult } from './RestModal';
import { ThemedNotificationModal, ThemedModalType } from './ThemedNotificationModal';
import {
  WIKIDOT_CLASSES,
  WIKIDOT_RACES,
  FULL_CASTER_SLOTS_TABLE,
  HALF_CASTER_SLOTS_TABLE,
  WARLOCK_PACT_SLOTS_TABLE,
} from '../data/wikidotData';
import {
  BookOpen,
  Sparkles,
  Search,
  Check,
  X,
  Zap,
  Plus,
  RefreshCw,
  Moon,
  Shield,
  Clock,
  Eye,
  Trash2,
  Flame,
  Sword,
  Heart,
  AlertCircle,
  HelpCircle,
  Dices,
  Lock,
} from 'lucide-react';

interface ClassSheetModalProps {
  character: Character;
  onUpdateCharacter: (updated: Character) => void;
  onClose: () => void;
  onLogAction?: (actor: string, action: string, type: 'spell' | 'attack' | 'damage' | 'heal' | 'condition' | 'system') => void;
}

const DEFAULT_SLOTS: CharacterSpellSlots = {
  lvl1: { max: 0, used: 0 },
  lvl2: { max: 0, used: 0 },
  lvl3: { max: 0, used: 0 },
  lvl4: { max: 0, used: 0 },
  lvl5: { max: 0, used: 0 },
  lvl6: { max: 0, used: 0 },
  lvl7: { max: 0, used: 0 },
  lvl8: { max: 0, used: 0 },
  lvl9: { max: 0, used: 0 },
};

export const ClassSheetModal: React.FC<ClassSheetModalProps> = ({
  character,
  onUpdateCharacter,
  onClose,
  onLogAction,
}) => {
  const isCaster = isSpellcasterClass(character.class);
  const classLower = character.class.toLowerCase();

  // Determine Class Archetype
  const isBarbarian = classLower.includes('barb') || classLower.includes('bárbaro') || classLower.includes('barbaro');
  const isPugilist = classLower.includes('pugilist') || classLower.includes('boxead') || classLower.includes('boxer');
  const isFighter = classLower.includes('guerr') || classLower.includes('fight');
  const isMonk = classLower.includes('monk') || classLower.includes('monje');
  const isRogue = classLower.includes('pícaro') || classLower.includes('picaro') || classLower.includes('rogue');
  const isPaladin = classLower.includes('palad');
  const isBard = classLower.includes('bard');
  const isDruid = classLower.includes('druid') || classLower.includes('dru');
  const isSorcerer = classLower.includes('hech') || classLower.includes('sorcer');
  const isWarlock = classLower.includes('bruj') || classLower.includes('warlock');
  const isWizard = classLower.includes('mag') || classLower.includes('wizard');
  const isCleric = classLower.includes('clér') || classLower.includes('cler') || classLower.includes('cleric');

  // Book Title based on class
  let bookTitle = 'Códice de Habilidades & Combate';
  let bookSubtitle = 'Compendio táctico de proezas marciales, técnicas y recursos.';
  if (isPugilist) {
    bookTitle = `Club de la Pelea & Cuadrilátero: ${character.name}`;
    bookSubtitle = 'Puntos de Flujo, golpes demoledores, trucos y cuadrilátero callejero.';
  } else if (isBarbarian) {
    bookTitle = `Códice Primitivo & Furia: ${character.name}`;
    bookSubtitle = 'Furia indómita, instinto de batalla y senda bárbara.';
  } else if (isMonk) {
    bookTitle = `Templo Interior & Disciplina del Ki: ${character.name}`;
    bookSubtitle = 'Flujo de energía Ki, artes marciales y técnicas sagradas.';
  } else if (isFighter) {
    bookTitle = `Manual Táctico & Maestría de Armas: ${character.name}`;
    bookSubtitle = 'Reservas de combate, segundo aire y maniobras marciales.';
  } else if (isRogue) {
    bookTitle = `Manual de Artimañas & Subterfugio: ${character.name}`;
    bookSubtitle = 'Ataque furtivo, acción astuta y secretos de infiltración.';
  } else if (isWizard) {
    bookTitle = `Grimorio Arcano & Libro de Conjuros: ${character.name}`;
    bookSubtitle = 'Fórmulas mágicas, preparación arcana y ranuras de conjuro.';
  } else if (isWarlock) {
    bookTitle = `Tomo del Pacto Oculto: ${character.name}`;
    bookSubtitle = 'Magia pactada con tu patrón de otro mundo y ranuras de pacto.';
  } else if (isCleric) {
    bookTitle = `Códice Sagrado & Plegarias Divinas: ${character.name}`;
    bookSubtitle = 'Canalizar divinidad, bendiciones de tu deidad y milagros.';
  } else if (isDruid) {
    bookTitle = `Círculo Silvano & Comunión Natural: ${character.name}`;
    bookSubtitle = 'Forma salvaje, conjuros de la naturaleza y equilibrio primordial.';
  } else if (isBard) {
    bookTitle = `Cancionero Arcano & Melodías: ${character.name}`;
    bookSubtitle = 'Inspiración bárdica, secretos mágicos y versos de poder.';
  } else if (isPaladin) {
    bookTitle = `Juramento Sagrado & Códice de Luz: ${character.name}`;
    bookSubtitle = 'Castigo divino, imposición de manos y plegarias consagradas.';
  } else if (isSorcerer) {
    bookTitle = `Grimorio de Magia Innata: ${character.name}`;
    bookSubtitle = 'Puntos de hechicería, metamagia y chispas arcanas.';
  }

  // Spell Slots setup
  const slots: CharacterSpellSlots = {
    ...DEFAULT_SLOTS,
    ...(character.spellSlots || {}),
  };

  const characterSpells: Spell[] = character.spells || [];

  // Tabs
  const [activeTab, setActiveTab] = useState<'prepared' | 'known' | 'compendium' | 'browse_higher'>('prepared');
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [compendiumSearch, setCompendiumSearch] = useState('');

  // Class Resources State (e.g. Rages, Ki points, Second Wind, Lay on Hands)
  const defaultResList: ClassResource[] = React.useMemo(() => {
    if (character.classResources && character.classResources.length > 0) {
      return character.classResources;
    }
    const res: ClassResource[] = [];
    if (isBarbarian) {
      const maxRages = character.level >= 17 ? 6 : character.level >= 12 ? 5 : character.level >= 6 ? 4 : character.level >= 3 ? 3 : 2;
      res.push({
        id: 'res-furia',
        name: 'Usos de Furia',
        current: maxRages,
        max: maxRages,
        resetOn: 'long',
        description: '+2 al daño cuerpo a cuerpo, ventaja en tiradas de Fuerza y resistencia a daño cortante, contundente y perforante.',
      });
    } else if (isMonk) {
      res.push({
        id: 'res-ki',
        name: 'Puntos de Ki',
        current: character.level,
        max: character.level,
        resetOn: 'short',
        description: 'Puntos de Ki para Ráfaga de Golpes, Defensa Paciente, Paso del Viento y Golpe Aturdidor.',
      });
    } else if (isFighter) {
      res.push({
        id: 'res-segundo-aire',
        name: 'Segundo Aire (Second Wind)',
        current: 1,
        max: 1,
        resetOn: 'short',
        diceType: '1d10',
        description: 'Acción adicional: recuperas 1d10 + nivel de guerrero puntos de golpe.',
      });
      res.push({
        id: 'res-oleada',
        name: 'Oleada de Acción (Action Surge)',
        current: character.level >= 17 ? 2 : 1,
        max: character.level >= 17 ? 2 : 1,
        resetOn: 'short',
        description: 'Toma una acción adicional completa en tu turno.',
      });
    } else if (isPaladin) {
      res.push({
        id: 'res-manos',
        name: 'Imposición de Manos (HP Pool)',
        current: character.level * 5,
        max: character.level * 5,
        resetOn: 'long',
        description: 'Pool de puntos de golpe curativos. Toca una criatura para curar o gasta 5 para sanar veneno/enfermedad.',
      });
    } else if (isBard) {
      const maxInsp = Math.max(1, Math.floor((character.stats.cha - 10) / 2) || 3);
      res.push({
        id: 'res-insp',
        name: 'Inspiración Bárdica',
        current: maxInsp,
        max: maxInsp,
        diceType: character.level >= 15 ? 'd12' : character.level >= 10 ? 'd10' : character.level >= 5 ? 'd8' : 'd6',
        resetOn: character.level >= 5 ? 'short' : 'long',
        description: 'Otorga un dado de inspiración a un aliado a 60 pies para ataque, prueba o salvación.',
      });
    } else if (isDruid) {
      res.push({
        id: 'res-forma-salvaje',
        name: 'Forma Salvaje (Wild Shape)',
        current: 2,
        max: 2,
        resetOn: 'short',
        description: 'Transfórmate en una bestia asumiendo sus HP y sentidos durante horas.',
      });
    } else if (isSorcerer && character.level >= 2) {
      res.push({
        id: 'res-sorcery-pts',
        name: 'Puntos de Hechicería',
        current: character.level,
        max: character.level,
        resetOn: 'long',
        description: 'Puntos para Metamagia o para canjear por ranuras de conjuro.',
      });
    } else if (isPugilist) {
      const flowMax = 2 + Math.floor((character.level - 1) / 4);
      res.push({
        id: 'res-flujo',
        name: 'Puntos de Flujo (Flow Points)',
        current: flowMax,
        max: flowMax,
        resetOn: 'short',
        description: 'Puntos de Flujo para Golpes de Poder (+1d6 por punto), trucos tácticos y salvaciones.',
      });
      res.push({
        id: 'res-cross',
        name: 'Contraataque Cruzado (Cross Counter)',
        current: 1,
        max: 1,
        resetOn: 'short',
        description: 'Reacción: absorbe 1d10 + Con + Nivel de daño entrante. Si lo anulas a 0, contraatacas y ganas 1 Flujo.',
      });
    }
    return res;
  }, [character.class, character.level, character.stats.cha, character.stats.con, character.classResources]);

  const [classResources, setClassResources] = useState<ClassResource[]>(defaultResList);

  const updateResourceCurrent = (resId: string, delta: number) => {
    const updated = classResources.map((r) => {
      if (r.id === resId) {
        const next = Math.max(0, Math.min(r.max, r.current + delta));
        if (onLogAction) {
          const actionWord = delta < 0 ? `gastó 1 uso de ${r.name}` : `recuperó 1 uso de ${r.name}`;
          onLogAction(character.name, actionWord, 'system');
        }
        return { ...r, current: next };
      }
      return r;
    });
    setClassResources(updated);
    onUpdateCharacter({ ...character, classResources: updated });
  };

  // Rest Modal state
  const [isRestModalOpen, setIsRestModalOpen] = useState(false);
  const [activeRestType, setActiveRestType] = useState<'short' | 'long'>('short');

  // Themed Alert state
  const [themedAlert, setThemedAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    subtitle?: string;
    type?: ThemedModalType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const handleOpenRest = (type: 'short' | 'long') => {
    setActiveRestType(type);
    setIsRestModalOpen(true);
  };

  const handleConfirmRest = (result: RestResult) => {
    setIsRestModalOpen(false);

    const restoredRes = classResources.map((r) => {
      if (result.restType === 'long' || r.resetOn === 'short') {
        return { ...r, current: r.max };
      }
      return r;
    });
    setClassResources(restoredRes);

    // If long rest or Warlock, restore spell slots
    let updatedSlots = { ...slots };
    const isWarlockClass =
      character.class.toLowerCase().includes('bruj') ||
      character.class.toLowerCase().includes('warlock');
    if ((result.restType === 'long' && isCaster) || isWarlockClass) {
      (Object.keys(updatedSlots) as Array<keyof CharacterSpellSlots>).forEach((k) => {
        updatedSlots[k] = { ...updatedSlots[k], used: 0 };
      });
    }

    const updatedChar: Character = {
      ...character,
      currentHp: result.newHp,
      tempHp: result.restType === 'long' ? 0 : character.tempHp,
      usedHitDice: result.newUsedHitDice,
      classResources: restoredRes,
      spellSlots: updatedSlots,
    };

    onUpdateCharacter(updatedChar);

    if (onLogAction) {
      onLogAction(
        character.name,
        `completó un ${result.restType === 'long' ? 'Descanso Largo (restauró PG, ranuras y recursos)' : `Descanso Corto (gastó ${result.hitDiceSpent} dados de golpe, recuperó ${result.hpRegained} PG y recursos de recarga corta)`}`,
        'heal'
      );
    }

    const restTitle = result.restType === 'long' ? 'Descanso Largo (8h)' : 'Descanso Corto (1h)';
    const totalHd = character.level || 1;
    const remainingHd = Math.max(0, totalHd - result.newUsedHitDice);

    setThemedAlert({
      isOpen: true,
      title: `¡${restTitle} Completado!`,
      subtitle:
        result.restType === 'long'
          ? 'Tus facultades de combate y recursos han sido revitalizados por completo.'
          : 'Has tomado un momento táctico para recobrar el aliento y curarte.',
      type: 'rest',
      message: (
        <div className="space-y-3 text-xs text-[#4a3928]">
          <div className="p-3 bg-[#eadecc]/70 rounded-xl border border-[#cbb396] grid grid-cols-2 gap-3 text-center">
            <div>
              <span className="text-[10px] text-[#7a644e] uppercase font-bold block">Puntos de Golpe</span>
              <span className="text-base font-fantasy font-bold text-[#8c2525]">
                {result.newHp} / {character.maxHp}
              </span>
              {result.hpRegained > 0 && (
                <span className="text-[10px] text-green-700 block font-semibold">
                  (+{result.hpRegained} PG recuperados)
                </span>
              )}
            </div>
            <div>
              <span className="text-[10px] text-[#7a644e] uppercase font-bold block">Dados de Golpe</span>
              <span className="text-base font-fantasy font-bold text-[#204a6e]">
                {remainingHd} / {totalHd} disp.
              </span>
              {result.hitDiceSpent > 0 && (
                <span className="text-[10px] text-[#8c672b] block font-semibold">
                  ({result.hitDiceSpent} gastados)
                </span>
              )}
            </div>
          </div>

          {result.restType === 'long' ? (
            <p className="text-[11px] text-[#5c4936] leading-relaxed">
              ✨ Se han restaurado por completo todas tus ranuras de conjuro y facultades especiales de clase.
            </p>
          ) : (
            <p className="text-[11px] text-[#5c4936] leading-relaxed">
              ☕ Se han recargado tus recursos de clase que se renuevan en descanso corto (Ki, Puntos de Flujo, Segundo Aire, ranuras de Brujo, etc.).
            </p>
          )}
        </div>
      ),
    });
  };

  // Barbarian Rage quick toggle
  const [isRaging, setIsRaging] = useState(false);
  const handleToggleRage = () => {
    if (!isRaging) {
      const rageRes = classResources.find((r) => r.id === 'res-furia');
      if (rageRes && rageRes.current <= 0) {
        setThemedAlert({
          isOpen: true,
          title: 'Sin Usos de Furia',
          subtitle: 'Furia Primitiva Agotada',
          type: 'warning',
          message: '¡No te quedan usos de Furia! Realiza un descanso largo para recuperarlos.',
        });
        return;
      }
      updateResourceCurrent('res-furia', -1);
      setIsRaging(true);
      if (onLogAction) {
        onLogAction(character.name, '¡ENTRÓ EN FURIA! (+2 daño cuerpo a cuerpo, resistencia a daño cortante/contundente/perforante)', 'condition');
      }
    } else {
      setIsRaging(false);
      if (onLogAction) {
        onLogAction(character.name, 'calmó su Furia de batalla', 'system');
      }
    }
  };

  // Pugilist special combat action handlers
  const handlePugilistPowerStrike = () => {
    const flowRes = classResources.find((r) => r.id === 'res-flujo');
    if (!flowRes || flowRes.current <= 0) {
      setThemedAlert({
        isOpen: true,
        title: 'Sin Puntos de Flujo',
        subtitle: 'Pugilista Exhausto',
        type: 'warning',
        message: '¡No te quedan Puntos de Flujo! Toma un descanso corto o asesta un golpe crítico para recargar.',
      });
      return;
    }
    updateResourceCurrent('res-flujo', -1);
    const d6Roll = Math.floor(Math.random() * 6) + 1;
    if (onLogAction) {
      onLogAction(
        character.name,
        `🥊 ¡GOLPE DE PODER! Gastó 1 Flujo para infligir +${d6Roll} de daño contundente adicional (Tirada d6: ${d6Roll})`,
        'attack'
      );
    }
  };

  const handlePugilistCrossCounter = () => {
    const crossRes = classResources.find((r) => r.id === 'res-cross');
    if (crossRes && crossRes.current <= 0) {
      setThemedAlert({
        isOpen: true,
        title: 'Contraataque Agotado',
        subtitle: 'Reacción no disponible',
        type: 'warning',
        message: '¡Ya usaste tu Contraataque Cruzado! Podrás volver a utilizarlo tras un descanso corto.',
      });
      return;
    }
    if (crossRes) {
      updateResourceCurrent('res-cross', -1);
    }
    const conMod = Math.floor((character.stats.con - 10) / 2);
    const d10Roll = Math.floor(Math.random() * 10) + 1;
    const mitigated = d10Roll + conMod + character.level;
    if (onLogAction) {
      onLogAction(
        character.name,
        `🥊 ¡CONTRAATAQUE CRUZADO! Redujo ${mitigated} de daño entrante (${d10Roll} en d10 + ${conMod} Con + ${character.level} Nivel). ¡Si redujo el daño a 0, contraataca gratis y gana 1 Flujo!`,
        'damage'
      );
    }
  };

  const handlePugilistTrick = (trickName: string, desc: string) => {
    const flowRes = classResources.find((r) => r.id === 'res-flujo');
    if (!flowRes || flowRes.current <= 0) {
      setThemedAlert({
        isOpen: true,
        title: 'Sin Puntos de Flujo',
        subtitle: 'Truco de Combate',
        type: 'warning',
        message: '¡No te quedan Puntos de Flujo para realizar este truco táctico!',
      });
      return;
    }
    updateResourceCurrent('res-flujo', -1);
    if (onLogAction) {
      onLogAction(character.name, `🥊 Usó Truco [${trickName}]: ${desc}`, 'system');
    }
  };

  const handlePugilistGainFlow = () => {
    const flowRes = classResources.find((r) => r.id === 'res-flujo');
    const flowMax = 2 + Math.floor((character.level - 1) / 4);
    if (flowRes && flowRes.current < flowRes.max) {
      updateResourceCurrent('res-flujo', 1);
      if (onLogAction) {
        onLogAction(character.name, `recuperó 1 Punto de Flujo por impulso en combate (${flowRes.current + 1}/${flowRes.max})`, 'heal');
      }
    } else {
      setThemedAlert({
        isOpen: true,
        title: 'Flujo al Máximo',
        subtitle: 'Pugilista en su auge',
        type: 'info',
        message: `¡Tus Puntos de Flujo ya están al máximo (${flowMax})!`,
      });
    }
  };

  // Spellcasting stats
  const ability = character.spellcastingAbility || (isCleric || isDruid ? 'wis' : isBard || isSorcerer || isWarlock || isPaladin ? 'cha' : 'int');
  const abilityScore = character.stats[ability] || 10;
  const abilityMod = Math.floor((abilityScore - 10) / 2);
  const profBonus = Math.floor((character.level - 1) / 4) + 2;
  const spellSaveDc = character.spellSaveDc || (8 + profBonus + abilityMod);
  const spellAttackBonus = character.spellAttackBonus !== undefined ? character.spellAttackBonus : (profBonus + abilityMod);

  // Filter compendium strictly by race and class
  const filteredCompendium = React.useMemo(() => {
    return filterSpellsForCharacter(character.class, character.level, character.race);
  }, [character.class, character.level, character.race]);

  const spellcastingLimits = React.useMemo(() => {
    return getSpellcastingLimits(character.class, character.level, character.stats, character.race);
  }, [character.class, character.level, character.stats, character.race]);

  const cantripsList = characterSpells.filter((s) => s.level === 0 && !s.isRacial);
  const leveledPreparedList = characterSpells.filter((s) => s.level > 0 && s.prepared && !s.isRacial);
  const leveledKnownList = characterSpells.filter((s) => s.level > 0 && !s.isRacial);
  const racialSpellsList = characterSpells.filter((s) => s.isRacial);

  const cantripLimitExceeded = isCaster && cantripsList.length > spellcastingLimits.maxCantrips;
  const preparedLimitExceeded =
    isCaster &&
    (spellcastingLimits.casterType === 'prepared'
      ? leveledPreparedList.length > spellcastingLimits.maxPreparedOrKnown
      : leveledKnownList.length > spellcastingLimits.maxPreparedOrKnown);

  // Toggle prepared status for a spell (racial spells are always innately prepared)
  const togglePrepared = (spellId: string) => {
    const updatedSpells = characterSpells.map((s) => {
      if (s.isRacial) return s;
      return s.id === spellId ? { ...s, prepared: !s.prepared } : s;
    });
    onUpdateCharacter({ ...character, spells: updatedSpells });
  };

  // Adjust spell slots
  const toggleSlotUsed = (lvlKey: keyof CharacterSpellSlots, slotIndex: number) => {
    const currentLevelSlot: SpellSlotLevel = slots[lvlKey] || { max: 0, used: 0 };
    let newUsed = currentLevelSlot.used;

    if (slotIndex < currentLevelSlot.used) {
      newUsed = slotIndex; // recover slot
    } else {
      newUsed = slotIndex + 1; // expend slot
    }

    const updatedSlots: CharacterSpellSlots = {
      ...slots,
      [lvlKey]: { ...currentLevelSlot, used: Math.min(currentLevelSlot.max, Math.max(0, newUsed)) },
    };

    onUpdateCharacter({ ...character, spellSlots: updatedSlots });
  };

  // Cast spell
  const handleCastSpell = (spell: Spell) => {
    if (spell.level > 0) {
      const slotKey = `lvl${spell.level}` as keyof CharacterSpellSlots;
      const currentLevelSlot = slots[slotKey];
      if (currentLevelSlot && currentLevelSlot.used < currentLevelSlot.max) {
        const updatedSlots: CharacterSpellSlots = {
          ...slots,
          [slotKey]: { ...currentLevelSlot, used: currentLevelSlot.used + 1 },
        };
        onUpdateCharacter({ ...character, spellSlots: updatedSlots });
      }
    }
    if (onLogAction) {
      onLogAction(character.name, `lanzó el conjuro: ${spell.name} (Nivel ${spell.level})`, 'spell');
    }
  };

  // Add spell from compendium into character's book
  const handleAddSpellFromCompendium = (spell: Spell) => {
    const alreadyExists = characterSpells.some((s) => s.name.toLowerCase() === spell.name.toLowerCase());
    if (alreadyExists) return;

    const newSpell: Spell = {
      ...spell,
      id: 'char-spl-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      prepared: spell.level === 0 ? true : false,
    };
    onUpdateCharacter({ ...character, spells: [...characterSpells, newSpell] });
  };

  // Remove spell from character
  const handleRemoveSpell = (spellId: string) => {
    onUpdateCharacter({
      ...character,
      spells: characterSpells.filter((s) => s.id !== spellId),
    });
  };

  const preparedSpells = characterSpells.filter((s) => s.prepared || s.level === 0);

  // Max spell level allowed
  const maxSpellLevel = filteredCompendium.maxSpellLevel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Ancient Leather-Bound Folio Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c672b] bg-[#2a221b] text-[#2c241b]">
        {/* Book Outer Leather Header with Brass Corner Rivets */}
        <div className="p-4 px-6 bg-gradient-to-r from-[#2e2319] via-[#3a2c1f] to-[#2e2319] border-b-2 border-[#b88c32] flex items-center justify-between text-[#f7f2ea]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1611] border border-[#c59b27]/70 flex items-center justify-center shadow-inner text-[#d4ab59]">
              {isBarbarian ? <Flame className="w-6 h-6 text-[#d9534f]" /> : isPugilist ? <span className="text-2xl">🥊</span> : isMonk ? <Zap className="w-6 h-6 text-[#5bc0de]" /> : isCaster ? <BookOpen className="w-6 h-6 text-[#c59b27]" /> : <Sword className="w-6 h-6 text-[#c59b27]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-[#f7f2ea] tracking-wide uppercase">
                  {bookTitle}
                </h2>
                <span className="text-[10px] bg-[#1a140f] text-[#c59b27] border border-[#7a5a22] font-semibold px-2 py-0.5 rounded font-mono uppercase">
                  {character.class} • Nivel {character.level}
                </span>
                {isRaging && (
                  <span className="text-[10px] bg-[#8a221f] text-white border border-[#c43f3b] font-bold px-2 py-0.5 rounded animate-pulse">
                    🔥 EN FURIA (+2 DAÑO)
                  </span>
                )}
              </div>
              <p className="text-xs text-[#c7b9a5] italic mt-0.5">
                {bookSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Stats or Rest Buttons */}
          <div className="flex items-center gap-2">
            {isCaster && (
              <div className="hidden md:flex items-center gap-3 bg-[#1c1611] px-3 py-1 rounded-lg border border-[#6b5229] text-xs">
                <div>
                  <span className="text-[10px] text-[#9c8b77] block leading-none">CD Salvación</span>
                  <span className="font-mono font-bold text-[#f7f2ea] text-sm">{spellSaveDc}</span>
                </div>
                <div className="border-l border-[#4a3920] pl-3">
                  <span className="text-[10px] text-[#9c8b77] block leading-none">Ataque Conjuro</span>
                  <span className="font-mono font-bold text-[#d4ab59] text-sm">
                    {spellAttackBonus >= 0 ? `+${spellAttackBonus}` : spellAttackBonus}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => handleOpenRest('short')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2b2118] hover:bg-[#382b20] text-[#cbb592] hover:text-[#f7f2ea] border border-[#5a4325] rounded-lg text-xs font-semibold transition cursor-pointer"
              title="Descanso Corto: Elige cuántos dados de golpe gastar y el método de tirada"
            >
              <Moon className="w-3.5 h-3.5 text-[#d4ab59]" />
              <span className="hidden sm:inline">Descanso Corto</span>
            </button>

            <button
              onClick={() => handleOpenRest('long')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2b20] hover:bg-[#2b3c2d] text-[#a4d4ad] hover:text-white border border-[#3b5e40] rounded-lg text-xs font-semibold transition cursor-pointer"
              title="Descanso Largo: Restaura PG, ranuras y recursos"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descanso Largo</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#c7b9a5] hover:text-white hover:bg-[#4a3a2a] rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-[#241c15] px-6 py-2 border-b border-[#4d3a24] flex items-center justify-between text-xs">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('prepared')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'prepared'
                  ? 'bg-[#c59b27] text-[#1c150e] shadow-md font-fantasy'
                  : 'text-[#baa995] hover:text-[#f7f2ea] hover:bg-[#362a20]'
              }`}
            >
              {isCaster ? (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Conjuros Preparados & Slots ({preparedSpells.length})
                </>
              ) : (
                <>
                  <Sword className="w-3.5 h-3.5" />
                  Habilidades Activas & Recursos
                </>
              )}
            </button>

            {isCaster && (
              <>
                <button
                  onClick={() => setActiveTab('known')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'known'
                      ? 'bg-[#c59b27] text-[#1c150e] shadow-md font-fantasy'
                      : 'text-[#baa995] hover:text-[#f7f2ea] hover:bg-[#362a20]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Mi Libro / Grimorio ({characterSpells.length})
                </button>

                <button
                  onClick={() => setActiveTab('compendium')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'compendium'
                      ? 'bg-[#c59b27] text-[#1c150e] shadow-md font-fantasy'
                      : 'text-[#baa995] hover:text-[#f7f2ea] hover:bg-[#362a20]'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Aprender Conjuros de {character.class} ({filteredCompendium.availableToChoose.length})
                </button>

                <button
                  onClick={() => setActiveTab('browse_higher')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'browse_higher'
                      ? 'bg-[#8a6b29] text-[#f7f2ea] shadow-md font-fantasy'
                      : 'text-[#c2ab7c] hover:text-[#f7f2ea] hover:bg-[#362a20]'
                  }`}
                  title="Chusmear conjuros de niveles más altos que aún no puedes elegir"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Chusmear Niveles Superiores 👁️ ({filteredCompendium.higherLevelToBrowse.length})
                </button>
              </>
            )}
          </div>

          {isCaster && (
            <div className="hidden md:flex items-center gap-2 text-[11px] shrink-0">
              <span
                className={`px-2 py-0.5 rounded font-mono font-bold ${
                  cantripLimitExceeded
                    ? 'bg-[#5e201b] text-[#f7cbc7] border border-[#a8423d]'
                    : 'bg-[#1c1611] text-[#d4ab59] border border-[#54412c]'
                }`}
                title={`Límite de trucos: ${spellcastingLimits.maxCantrips}`}
              >
                Trucos: {cantripsList.length}/{spellcastingLimits.maxCantrips}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-mono font-bold ${
                  preparedLimitExceeded
                    ? 'bg-[#5e201b] text-[#f7cbc7] border border-[#a8423d]'
                    : 'bg-[#1c1611] text-[#d4ab59] border border-[#54412c]'
                }`}
                title={spellcastingLimits.explanation}
              >
                {spellcastingLimits.casterType === 'prepared' ? 'Preparados' : 'Conocidos'}:{' '}
                {spellcastingLimits.casterType === 'prepared'
                  ? leveledPreparedList.length
                  : leveledKnownList.length}
                /{spellcastingLimits.maxPreparedOrKnown}
              </span>
            </div>
          )}
        </div>

        {/* Book Dual Pages Container (Authentic Cream/Parchment Paper) */}
        <div className="flex-1 overflow-y-auto bg-[#fbf6e9] text-[#2c241b] p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 font-serif">
          {/* ========================================================= */}
          {/* NON-CASTER / MARTIAL HEROES (BARBARIAN, FIGHTER, MONK, ROGUE) */}
          {/* ========================================================= */}
          {!isCaster && (
            <>
              {/* Left Page: Interactive Class Resource Tracker */}
              <div className="lg:col-span-5 border-r-0 lg:border-r border-[#d4c3a3] lg:pr-6 space-y-5">
                <div className="border-b-2 border-[#b88c32] pb-2 flex items-center justify-between">
                  <h3 className="text-base font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#b88c32]" />
                    Reservas de Clase
                  </h3>
                  <span className="text-xs text-[#7a6448] italic">Haz clic para gastar o recuperar</span>
                </div>

                {/* Barbarian Special Rage Widget */}
                {isBarbarian && (
                  <div className="p-4 bg-[#f4ebe1] rounded-xl border border-[#d9c0a3] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-[#b5403a]" />
                        <span className="font-bold font-fantasy text-[#5e2320] text-sm">Furia del Bárbaro</span>
                      </div>
                      <button
                        onClick={handleToggleRage}
                        className={`px-3 py-1 rounded-lg text-xs font-bold font-fantasy transition shadow cursor-pointer ${
                          isRaging
                            ? 'bg-[#b5403a] hover:bg-[#96322d] text-white animate-pulse'
                            : 'bg-[#5e2320] hover:bg-[#782f2b] text-[#fbf6e9]'
                        }`}
                      >
                        {isRaging ? '🔥 En Furia (Calmarse)' : '⚡ Entrar en Furia'}
                      </button>
                    </div>

                    <p className="text-xs text-[#6e5842] leading-relaxed">
                      Mientras dura tu furia (1 minuto / 10 rondas): ganas <strong>+2 al daño cuerpo a cuerpo</strong> con Fuerza, ventaja en tiradas/salvaciones de Fuerza y <strong>resistencia a daño contundente, perforante y cortante</strong>.
                    </p>
                  </div>
                )}

                {/* Pugilist Special Flow & Thick Skin Widget */}
                {isPugilist && (
                  <div className="p-4 bg-[#f8ede3] rounded-xl border-2 border-[#d49a6a] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🥊</span>
                        <div>
                          <span className="font-bold font-fantasy text-[#632c10] text-sm block">Club de la Pelea & Flujo</span>
                          <span className="text-[11px] text-[#93552d]">Piel Dura: CA {13 + Math.floor((character.stats.con - 10) / 2)} (13 + Con)</span>
                        </div>
                      </div>
                      <button
                        onClick={handlePugilistGainFlow}
                        className="px-2.5 py-1 bg-[#632c10] hover:bg-[#853c16] text-[#fdf6e2] rounded-lg text-xs font-bold font-fantasy transition shadow cursor-pointer flex items-center gap-1"
                        title="Recuperar 1 punto de Flujo al asestar un crítico o mitigar todo el daño con Contraataque"
                      >
                        <Plus className="w-3.5 h-3.5" /> +1 Flujo
                      </button>
                    </div>

                    {/* Quick Pugilist Combat Triggers */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={handlePugilistPowerStrike}
                        className="px-2.5 py-2 bg-[#8c3818] hover:bg-[#a6431e] text-white rounded-lg text-xs font-bold font-fantasy transition shadow text-center cursor-pointer"
                        title="Gasta 1 Flujo para sumar +1d6 al daño de tu ataque desarmado"
                      >
                        💥 Golpe Poder (+1d6)
                      </button>
                      <button
                        onClick={handlePugilistCrossCounter}
                        className="px-2.5 py-2 bg-[#2d5236] hover:bg-[#386b44] text-white rounded-lg text-xs font-bold font-fantasy transition shadow text-center cursor-pointer"
                        title="Reacción: absorbe 1d10 + Con + Nivel de daño entrante. Si lo anula, contraatacas gratis y ganas 1 Flujo."
                      >
                        🛡️ Contraataque Cruzado
                      </button>
                    </div>

                    <p className="text-[11px] text-[#70482d] leading-relaxed">
                      <strong>Dado de Pugilismo:</strong> 1d{character.level >= 17 ? '12' : character.level >= 11 ? '10' : character.level >= 5 ? '8' : '6'}. Cuando aciertes un ataque desarmado, puedes gastar hasta {character.level >= 17 ? '4' : character.level >= 11 ? '3' : character.level >= 5 ? '2' : '1'} puntos de Flujo para añadir +1d6 de daño por punto gastado.
                    </p>
                  </div>
                )}

                {/* Generic / Specific Class Resource Badges */}
                <div className="space-y-3">
                  {classResources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] shadow-sm flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-[#4a361c] font-fantasy uppercase flex items-center gap-1.5">
                          {res.name}
                        </span>
                        <span className="font-mono font-bold text-sm text-[#8c672b]">
                          {res.current} / {res.max} {res.diceType ? `(${res.diceType})` : ''}
                        </span>
                      </div>

                      {/* Interactive Crystal Badges */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {Array.from({ length: res.max }).map((_, idx) => {
                          const isAvailable = idx < res.current;
                          return (
                            <button
                              key={idx}
                              onClick={() => updateResourceCurrent(res.id, isAvailable ? -1 : 1)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform transform active:scale-95 shadow-sm cursor-pointer ${
                                isAvailable
                                  ? 'bg-[#c59b27] border-[#8c672b] text-[#1c150e]'
                                  : 'bg-[#dfd4c0] border-[#b0a086] text-[#8a7b66] opacity-60'
                              }`}
                              title={isAvailable ? 'Gastar 1 uso' : 'Recuperar 1 uso'}
                            >
                              {isAvailable ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                            </button>
                          );
                        })}
                      </div>

                      {res.description && (
                        <p className="text-[11px] text-[#705c43] mt-2 italic leading-snug">
                          {res.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Page: Martial Features & Action Cards */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b-2 border-[#b88c32] pb-2 flex items-center justify-between">
                  <h3 className="text-base font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-2">
                    <Sword className="w-4 h-4 text-[#b88c32]" />
                    Habilidades de Clase & Combate
                  </h3>
                  <span className="text-xs text-[#7a6448]">Reglas oficiales 5e (Wikidot)</span>
                </div>

                {/* Barbarian Features list */}
                {isBarbarian && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#5e2320] uppercase">
                        Ataque Temerario (Reckless Attack)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Al hacer tu primer ataque en tu turno, puedes atacar temerariamente: obtienes <strong>ventaja en todas las tiradas de ataque cuerpo a cuerpo</strong> con Fuerza este turno, pero los ataques contra ti tienen ventaja hasta el comienzo de tu siguiente turno.
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#5e2320] uppercase">
                        Sentido del Peligro (Danger Sense)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Tienes <strong>ventaja en tiradas de salvación de Destreza</strong> contra efectos que puedas ver, tales como trampas y conjuros, siempre que no estés cegado, ensordecido o incapacitado.
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#5e2320] uppercase">
                        Defensa sin Armadura
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Mientras no lleves armadura puesta, tu Clase de Armadura es igual a <strong>10 + Des ({character.stats.dex >= 10 ? '+' : ''}{Math.floor((character.stats.dex - 10) / 2)}) + Con ({character.stats.con >= 10 ? '+' : ''}{Math.floor((character.stats.con - 10) / 2)})</strong>. Puedes seguir usando escudo y obtener este beneficio.
                      </p>
                    </div>

                    {character.subclass?.toLowerCase().includes('berserk') && (
                      <div className="p-3.5 bg-[#fae8e6] rounded-xl border border-[#dfb3af]">
                        <h4 className="font-bold font-fantasy text-xs text-[#8a221f] uppercase">
                          Senda del Berserker: Frenesí (Frenzy)
                        </h4>
                        <p className="text-xs text-[#6e3532] mt-1 leading-relaxed">
                          Puedes entrar en un frenesí sanguinario al usar tu furia. Si lo haces, puedes realizar un ataque cuerpo a cuerpo adicional con tu acción adicional en cada uno de tus turnos. Al terminar la furia, sufres un nivel de agotamiento.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Monk Features list */}
                {isMonk && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#294c63] uppercase">
                        Ráfaga de Golpes (Flurry of Blows - 1 Ki)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Inmediatamente después de realizar la acción de Atacar en tu turno, puedes gastar 1 punto de Ki para realizar dos ataques desarmados como acción adicional.
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#294c63] uppercase">
                        Defensa Paciente (Patient Defense - 1 Ki)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Puedes gastar 1 punto de Ki para realizar la acción de Esquivar como acción adicional en tu turno.
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#294c63] uppercase">
                        Paso del Viento (Step of the Wind - 1 Ki)
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Gastas 1 punto de Ki para realizar la acción de Destrabarse o Correr como acción adicional, y tu distancia de salto se duplica durante el turno.
                      </p>
                    </div>

                    {character.level >= 5 && (
                      <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                        <h4 className="font-bold font-fantasy text-xs text-[#294c63] uppercase">
                          Golpe Aturdidor (Stunning Strike - 1 Ki)
                        </h4>
                        <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                          Al impactar con un ataque cuerpo a cuerpo, gasta 1 Ki: el objetivo debe superar salvación de Constitución (CD {8 + profBonus + Math.floor((character.stats.wis - 10) / 2)}) o quedar Aturdido hasta el final de tu siguiente turno.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pugilist Features list */}
                {isPugilist && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold font-fantasy text-xs text-[#632c10] uppercase flex items-center gap-1.5">
                          <span>🥊</span> Pugilismo & Daño Desarmado
                        </h4>
                        <span className="font-mono font-bold text-xs text-[#8c3818] bg-[#eedfcb] px-2 py-0.5 rounded">
                          Dado: 1d{character.level >= 17 ? '12' : character.level >= 11 ? '10' : character.level >= 5 ? '8' : '6'} + Fue ({character.stats.str >= 10 ? '+' : ''}{Math.floor((character.stats.str - 10) / 2)})
                        </span>
                      </div>
                      <p className="text-xs text-[#5c4a35] mt-1.5 leading-relaxed">
                        Tus ataques desarmados usan Fuerza y hacen daño contundente escalonado. Como <strong>acción adicional</strong> al realizar un ataque desarmado, puedes ejecutar un puñetazo desarmado adicional.
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#632c10] uppercase mb-1">
                        Trucos del Pugilista (Gasta 1 Flujo)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <button
                          onClick={() => handlePugilistTrick('Finta', 'Ventaja en el próximo ataque y el objetivo no puede reaccionar')}
                          className="p-2 bg-[#ece1cf] hover:bg-[#e2d3bd] text-left rounded-lg border border-[#cbb79a] transition cursor-pointer text-xs"
                        >
                          <span className="font-bold text-[#632c10] block">🎭 Finta (Feint)</span>
                          <span className="text-[10px] text-[#634e38] block mt-0.5">Acción adicional: ventaja en el siguiente ataque. El objetivo no puede usar reacciones contra ti este turno.</span>
                        </button>

                        <button
                          onClick={() => handlePugilistTrick('Guardia', 'Acción de Esquivar como acción adicional')}
                          className="p-2 bg-[#ece1cf] hover:bg-[#e2d3bd] text-left rounded-lg border border-[#cbb79a] transition cursor-pointer text-xs"
                        >
                          <span className="font-bold text-[#632c10] block">🛡️ Guardia (Cover Up)</span>
                          <span className="text-[10px] text-[#634e38] block mt-0.5">Acción adicional: realizas la acción de Esquivar (Dodge) hasta el comienzo de tu siguiente turno.</span>
                        </button>

                        <button
                          onClick={() => handlePugilistTrick('Arremetida', 'Destrabarse o Correr como acción adicional')}
                          className="p-2 bg-[#ece1cf] hover:bg-[#e2d3bd] text-left rounded-lg border border-[#cbb79a] transition cursor-pointer text-xs"
                        >
                          <span className="font-bold text-[#632c10] block">🏃 Arremetida (Rush)</span>
                          <span className="text-[10px] text-[#634e38] block mt-0.5">Acción adicional: realizas la acción de Destrabarse (Disengage) o Correr (Dash).</span>
                        </button>

                        <button
                          onClick={() => handlePugilistTrick('Presa Rápida', 'Intenta presa o derribo como acción adicional')}
                          className="p-2 bg-[#ece1cf] hover:bg-[#e2d3bd] text-left rounded-lg border border-[#cbb79a] transition cursor-pointer text-xs"
                        >
                          <span className="font-bold text-[#632c10] block">🤼 Presa Rápida (Grapple)</span>
                          <span className="text-[10px] text-[#634e38] block mt-0.5">Acción adicional: intentas agarrar o derribar a un oponente tras conectar un ataque.</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#632c10] uppercase">
                        Piel Dura (Thick Skin) & Fortaleza
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Sin armadura, tu CA es <strong>13 + Constitución ({13 + Math.floor((character.stats.con - 10) / 2)})</strong>. Además, puedes gastar 1 Flujo para añadir tu bonificador por competencia a cualquier tirada de salvación de Fuerza, Destreza o Constitución.
                      </p>
                    </div>

                    {character.level >= 3 && (
                      <div className="p-3.5 bg-[#eedfcb] rounded-xl border border-[#c7b090]">
                        <h4 className="font-bold font-fantasy text-xs text-[#632c10] uppercase">
                          Estilo de Boxeo: {character.subclass || 'Out-boxer / Slugger / Swarmer'}
                        </h4>
                        <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                          {character.subclass?.toLowerCase().includes('slugger')
                            ? 'Slugger: Tus golpes causan traumatismos graves. Aumentas el daño contundente y puedes aturdir con puñetazos de lleno.'
                            : character.subclass?.toLowerCase().includes('swarmer')
                            ? 'Swarmer: Presión constante a corta distancia. Golpes en ráfaga ininterrumpidos y ventaja al atrapar a tus presas.'
                            : 'Out-boxer: Juego de piernas impecable. Alcance aumentado en 5 pies al atacar y movimiento veloz que no provoca ataques de oportunidad.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Generic actions for other martials (Fighter, Rogue) */}
                {(!isBarbarian && !isMonk && !isPugilist) && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f4ece1] rounded-xl border border-[#d6c4aa]">
                      <h4 className="font-bold font-fantasy text-xs text-[#4a361c] uppercase">
                        Maestría de Combate 5e
                      </h4>
                      <p className="text-xs text-[#5c4a35] mt-1 leading-relaxed">
                        Ataques disponibles, maniobras tácticas y pericias de {character.class}. Consulta y usa tus recursos en el panel de la izquierda durante el combate.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ========================================================= */}
          {/* SPELLCASTERS (WIZARD, CLERIC, DRUID, BARD, PALADIN, ETC.) */}
          {/* ========================================================= */}
          {isCaster && (
            <>
              {/* PAGE 1: PREPARED SPELLS & MANA CRYSTAL SLOTS */}
              {activeTab === 'prepared' && (
                <>
                  {/* Left Column: Mana Crystal Slots (1 to 9) */}
                  <div className="lg:col-span-5 border-r-0 lg:border-r border-[#d4c3a3] lg:pr-6 space-y-4">
                    <div className="border-b-2 border-[#b88c32] pb-1.5 flex items-center justify-between">
                      <h3 className="text-sm font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#b88c32]" />
                        Espacios de Magia (Slots)
                      </h3>
                      <span className="text-[11px] text-[#7a6448] italic">Clic para gastar/recuperar</span>
                    </div>

                    <div className="space-y-2">
                      {([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((lvl) => {
                        const key = `lvl${lvl}` as keyof CharacterSpellSlots;
                        const slotData = slots[key] || { max: 0, used: 0 };
                        if (slotData.max === 0) return null;

                        return (
                          <div
                            key={lvl}
                            className="p-2.5 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] shadow-sm flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-xs text-[#4a361c] font-fantasy uppercase">
                                Nivel {lvl}
                              </div>
                              <span className="text-[10px] text-[#7a6448]">
                                Disponibles: {slotData.max - slotData.used} / {slotData.max}
                              </span>
                            </div>

                            {/* Mana Crystal Buttons */}
                            <div className="flex items-center gap-1.5">
                              {Array.from({ length: slotData.max }).map((_, slotIdx) => {
                                const isAvailable = slotIdx >= slotData.used;
                                return (
                                  <button
                                    key={slotIdx}
                                    onClick={() => toggleSlotUsed(key, slotIdx)}
                                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform transform active:scale-95 shadow-sm border cursor-pointer ${
                                      isAvailable
                                        ? 'bg-gradient-to-tr from-[#2d6fa8] to-[#4fa3e3] border-[#1d4d75] shadow-blue-500/30'
                                        : 'bg-[#d1c4ae] border-[#b0a086] opacity-40'
                                    }`}
                                    title={isAvailable ? `Gastar ranura Nivel ${lvl}` : `Recuperar ranura Nivel ${lvl}`}
                                  >
                                    <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-white shadow' : 'bg-[#8c7b64]'}`} />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Class Special Resource if caster has any (e.g. Channel Divinity or Lay on Hands) */}
                    {classResources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[#d4c3a3] space-y-2">
                        <div className="text-xs font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#b88c32]" /> Recursos Especiales de {character.class}
                        </div>
                        {classResources.map((res) => (
                          <div key={res.id} className="p-2 bg-[#f4ebe0] rounded-lg border border-[#d9c8b0] flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#4a361c]">{res.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[#8c672b]">{res.current} / {res.max}</span>
                              <button
                                onClick={() => updateResourceCurrent(res.id, -1)}
                                className="px-1.5 py-0.5 bg-[#3a2c1f] text-white rounded text-[10px] font-bold"
                              >
                                -1
                              </button>
                              <button
                                onClick={() => updateResourceCurrent(res.id, 1)}
                                className="px-1.5 py-0.5 bg-[#b88c32] text-white rounded text-[10px] font-bold"
                              >
                                +1
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                    {/* Right Column: Prepared Spells List */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="border-b-2 border-[#b88c32] pb-1.5 flex items-center justify-between">
                        <h3 className="text-sm font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#b88c32]" />
                          Conjuros Listos para el Combate ({preparedSpells.length})
                        </h3>
                        <button
                          onClick={() => setActiveTab('known')}
                          className="text-xs font-semibold text-[#8c672b] hover:text-[#5c4118] underline cursor-pointer"
                        >
                          Gestionar Preparados →
                        </button>
                      </div>

                      {/* Spell Capacity Status Banner */}
                      <div
                        className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs shadow-sm ${
                          cantripLimitExceeded || preparedLimitExceeded
                            ? 'bg-[#fdf3e2] border-[#d49a37] text-[#704911]'
                            : 'bg-[#f5ede0] border-[#d6c4aa] text-[#5e4a35]'
                        }`}
                      >
                        <AlertCircle
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            cantripLimitExceeded || preparedLimitExceeded ? 'text-[#b88c32]' : 'text-[#8c7457]'
                          }`}
                        />
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <span className="font-bold font-fantasy">
                              Capacidad 5e: {cantripsList.length}/{spellcastingLimits.maxCantrips} Trucos •{' '}
                              {spellcastingLimits.casterType === 'prepared' ? leveledPreparedList.length : leveledKnownList.length}/
                              {spellcastingLimits.maxPreparedOrKnown}{' '}
                              {spellcastingLimits.casterType === 'prepared' ? 'Preparados' : 'Conocidos'}
                            </span>
                            {(cantripLimitExceeded || preparedLimitExceeded) && (
                              <span className="block text-[11px] text-[#8c4f14] mt-0.5">
                                Has alcanzado el límite reglamentario ({spellcastingLimits.explanation}). Puedes mantener adicionales si tu DM o un objeto mágico te lo permite.
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#8c7457] italic shrink-0">
                            {spellcastingLimits.explanation}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 max-h-[54vh] overflow-y-auto pr-1">
                        {preparedSpells.map((spell) => (
                          <div
                            key={spell.id}
                            onClick={() => setSelectedSpell(spell)}
                            className="p-3 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] shadow-sm hover:border-[#b88c32] hover:bg-[#faf4ec] transition flex flex-col justify-between cursor-pointer group"
                            title="Haz clic para leer toda la información, componentes y escalado del conjuro"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold font-fantasy text-sm text-[#4a361c] group-hover:text-[#8c672b] transition">
                                    {spell.name}
                                  </h4>
                                  <span className="text-[10px] bg-[#e3d5be] text-[#6b553b] px-1.5 py-0.2 rounded border border-[#c4b399] font-mono">
                                    {spell.level === 0 ? 'Truco' : `Nivel ${spell.level}`} • {spell.school}
                                  </span>
                                  {spell.ritual && (
                                    <span className="text-[9px] bg-[#dfd2bd] text-[#70542c] px-1 rounded font-mono">
                                      Ritual
                                    </span>
                                  )}
                                  {spell.concentration && (
                                    <span className="text-[9px] bg-[#edd0ce] text-[#8c322b] px-1 rounded font-mono">
                                      Conc.
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-[11px] text-[#7a6448] mt-0.5">
                                  <span>⏳ {spell.castingTime}</span>
                                  <span>🎯 {spell.range}</span>
                                  <span>📜 {spell.duration}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCastSpell(spell);
                                  }}
                                  className="px-3 py-1.5 bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg text-xs font-bold font-fantasy shadow-sm transition cursor-pointer"
                                  title="Lanzar este conjuro y descontar espacio"
                                >
                                  Lanzar ✨
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-[#5c4a35] mt-2 line-clamp-2 leading-relaxed">
                              {spell.description}
                            </p>

                            <div className="mt-2 pt-1 border-t border-[#e2d5c2] flex items-center justify-between text-[11px] text-[#8c672b]">
                              <span className="flex items-center gap-1 group-hover:underline">
                                <Eye className="w-3 h-3" /> Ver detalles completos & componentes →
                              </span>
                              {spell.higherLevels && (
                                <span className="text-[10px] text-[#8c7457] italic">
                                  Escala a niveles superiores
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                      {preparedSpells.length === 0 && (
                        <div className="py-12 text-center text-[#8a765d] bg-[#f5ede0] rounded-xl border border-dashed border-[#cbbca3]">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm font-fantasy">No tienes conjuros preparados hoy.</p>
                          <p className="text-xs mt-1">Ve a la pestaña "Mi Libro / Grimorio" para preparar conjuros.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* PAGE 2: KNOWN SPELLS / GRIMOIRE (TOGGLE PREPARED) */}
              {activeTab === 'known' && (
                <div className="col-span-full space-y-4">
                  <div className="border-b-2 border-[#b88c32] pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#b88c32]" />
                        Grimorio de Conjuros Conocidos ({characterSpells.length})
                      </h3>
                      <p className="text-xs text-[#7a6448]">
                        Marca con la estrella qué conjuros tienes preparados para el día de hoy.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('compendium')}
                      className="px-3 py-1.5 bg-[#c59b27] hover:bg-[#b0871e] text-[#1c150e] rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Añadir Conjuros de {character.class}
                    </button>
                  </div>

                  {/* Capacity Info Banner in Grimoire */}
                  <div
                    className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs shadow-sm ${
                      cantripLimitExceeded || preparedLimitExceeded
                        ? 'bg-[#fdf3e2] border-[#d49a37] text-[#704911]'
                        : 'bg-[#f5ede0] border-[#d6c4aa] text-[#5e4a35]'
                    }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        cantripLimitExceeded || preparedLimitExceeded ? 'text-[#b88c32]' : 'text-[#8c7457]'
                      }`}
                    />
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="font-bold font-fantasy">
                          Capacidad de Grimorio: {cantripsList.length}/{spellcastingLimits.maxCantrips} Trucos •{' '}
                          {spellcastingLimits.casterType === 'prepared' ? leveledPreparedList.length : leveledKnownList.length}/
                          {spellcastingLimits.maxPreparedOrKnown}{' '}
                          {spellcastingLimits.casterType === 'prepared' ? 'Preparados' : 'Conocidos'}
                        </span>
                        {(cantripLimitExceeded || preparedLimitExceeded) && (
                          <span className="block text-[11px] text-[#8c4f14] mt-0.5">
                            Has alcanzado el límite oficial ({spellcastingLimits.explanation}). Puedes añadir más si tu DM o campaña lo autoriza.
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8c7457] italic shrink-0">
                        {spellcastingLimits.explanation}
                      </span>
                    </div>
                  </div>

                  {/* List of Known Spells */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[56vh] overflow-y-auto pr-1">
                    {characterSpells.map((spell) => (
                      <div
                        key={spell.id}
                        onClick={() => setSelectedSpell(spell)}
                        className={`p-3.5 rounded-xl border shadow-sm transition flex flex-col justify-between cursor-pointer group ${
                          spell.prepared || spell.level === 0
                            ? 'bg-[#f5ede0] border-[#b88c32] hover:bg-[#faf4ec]'
                            : 'bg-[#ede3d1] border-[#cfc0a7] opacity-85 hover:opacity-100 hover:bg-[#f2e9db]'
                        }`}
                        title="Haz clic para ver la descripción completa, componentes y escalar el conjuro"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold font-fantasy text-sm text-[#4a361c] group-hover:text-[#8c672b] transition">
                                {spell.name}
                              </h4>
                              <span className="text-[10px] bg-[#e3d5be] text-[#6b553b] px-1.5 py-0.2 rounded font-mono">
                                {spell.level === 0 ? 'Truco' : `Nv ${spell.level}`}
                              </span>
                              {spell.ritual && (
                                <span className="text-[9px] bg-[#dfd2bd] text-[#70542c] px-1 rounded font-mono">
                                  Ritual
                                </span>
                              )}
                              {spell.concentration && (
                                <span className="text-[9px] bg-[#edd0ce] text-[#8c322b] px-1 rounded font-mono">
                                  Conc.
                                </span>
                              )}
                              {spell.isRacial && (
                                <span
                                  className="text-[9px] bg-purple-100 text-purple-900 border border-purple-300 px-1 rounded font-mono font-bold"
                                  title={`Magia innata concedida por tu linaje (${spell.racialOrigin || 'Raza'})`}
                                >
                                  ✨ Magia Racial
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#7a6448] block mt-0.5">
                              {spell.school} • {spell.castingTime} • {spell.range}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {spell.isRacial ? (
                              <span
                                className="text-[10px] bg-purple-100 text-purple-900 border border-purple-300 px-2 py-1 rounded font-mono font-bold"
                                title={`Concedido por tu linaje (${spell.racialOrigin || 'Raza'}). Siempre preparado e innato.`}
                              >
                                Innato
                              </span>
                            ) : (
                              <>
                                {spell.level > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePrepared(spell.id);
                                    }}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                                      spell.prepared
                                        ? 'bg-[#c59b27] text-[#1c150e] font-bold shadow'
                                        : 'bg-[#dfd2be] text-[#6b553b] hover:bg-[#d4c5ae]'
                                    }`}
                                  >
                                    {spell.prepared ? '✓ Preparado' : '+ Preparar'}
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveSpell(spell.id);
                                  }}
                                  className="p-1 text-[#8c672b] hover:text-[#b5403a] rounded transition cursor-pointer"
                                  title="Eliminar de mi libro"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#5c4a35] mt-2 line-clamp-2 leading-relaxed">
                          {spell.description}
                        </p>

                        <div className="mt-2 pt-1 border-t border-[#e2d5c2] flex items-center justify-between text-[11px] text-[#8c672b]">
                          <span className="flex items-center gap-1 group-hover:underline">
                            <Eye className="w-3 h-3" /> Ver detalles completos & componentes →
                          </span>
                        </div>
                      </div>
                    ))}

                    {characterSpells.length === 0 && (
                      <div className="col-span-full py-16 text-center text-[#8a765d] bg-[#f5ede0] rounded-xl border border-dashed border-[#cbbca3]">
                        <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
                        <h4 className="font-fantasy text-base font-bold">Tu libro de conjuros está vacío</h4>
                        <p className="text-xs mt-1">Haz clic en "Añadir Conjuros de {character.class}" para copiar hechizos oficiales de tu clase a tu libro.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 3: COMPENDIUM STRICTLY FILTERED BY CLASS & LEVEL (CAN BE LEARNED) */}
              {activeTab === 'compendium' && (
                <div className="col-span-full space-y-4">
                  <div className="border-b-2 border-[#b88c32] pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold font-fantasy text-[#4a361c] uppercase flex items-center gap-2">
                        <Plus className="w-5 h-5 text-[#b88c32]" />
                        Conjuros Disponibles para {character.class} (Nivel {character.level})
                      </h3>
                      <p className="text-xs text-[#7a6448]">
                        Filtrado automáticamente según las reglas de Wikidot 5e: solo conjuros de tu clase hasta <strong>Nivel {maxSpellLevel === 0 ? 'Trucos' : maxSpellLevel}</strong>.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8c7b64]" />
                      <input
                        type="text"
                        placeholder="Buscar conjuro de clase..."
                        value={compendiumSearch}
                        onChange={(e) => setCompendiumSearch(e.target.value)}
                        className="w-full bg-[#f4ece1] border border-[#d6c4aa] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#4a361c] focus:outline-none focus:border-[#b88c32]"
                      />
                    </div>
                  </div>

                  {/* Capacity Status Banner in Compendium */}
                  <div
                    className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs shadow-sm ${
                      cantripLimitExceeded || preparedLimitExceeded
                        ? 'bg-[#fdf3e2] border-[#d49a37] text-[#704911]'
                        : 'bg-[#f5ede0] border-[#d6c4aa] text-[#5e4a35]'
                    }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        cantripLimitExceeded || preparedLimitExceeded ? 'text-[#b88c32]' : 'text-[#8c7457]'
                      }`}
                    />
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="font-bold font-fantasy">
                          Capacidad Oficial: {cantripsList.length}/{spellcastingLimits.maxCantrips} Trucos •{' '}
                          {spellcastingLimits.casterType === 'prepared' ? leveledPreparedList.length : leveledKnownList.length}/
                          {spellcastingLimits.maxPreparedOrKnown}{' '}
                          {spellcastingLimits.casterType === 'prepared' ? 'Preparados' : 'Conocidos'}
                        </span>
                        {(cantripLimitExceeded || preparedLimitExceeded) && (
                          <span className="block text-[11px] text-[#8c4f14] mt-0.5">
                            Has alcanzado el límite reglamentario ({spellcastingLimits.explanation}). Puedes seguir añadiendo conjuros si tu DM o trasfondo lo permite.
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8c7457] italic shrink-0">
                        {spellcastingLimits.explanation}
                      </span>
                    </div>
                  </div>

                  {/* List of spells that the character can actually learn */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[56vh] overflow-y-auto pr-1">
                    {filteredCompendium.availableToChoose
                      .filter((s) => s.name.toLowerCase().includes(compendiumSearch.toLowerCase()))
                      .map((spell) => {
                        const isAlreadyKnown = characterSpells.some((cs) => cs.name.toLowerCase() === spell.name.toLowerCase());
                        return (
                          <div
                            key={spell.id}
                            onClick={() => setSelectedSpell(spell)}
                            className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#dbcbb2] shadow-sm hover:border-[#b88c32] hover:bg-[#faf4ec] transition flex flex-col justify-between cursor-pointer group"
                            title="Haz clic para ver toda la información, componentes y escalado de este conjuro"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold font-fantasy text-sm text-[#4a361c] group-hover:text-[#8c672b] transition">
                                    {spell.name}
                                  </h4>
                                  <span className="text-[10px] bg-[#e3d5be] text-[#6b553b] px-1.5 py-0.2 rounded font-mono">
                                    {spell.level === 0 ? 'Truco' : `Nivel ${spell.level}`} • {spell.school}
                                  </span>
                                  {spell.ritual && (
                                    <span className="text-[9px] bg-[#dfd2bd] text-[#70542c] px-1 rounded font-mono">
                                      Ritual
                                    </span>
                                  )}
                                  {spell.concentration && (
                                    <span className="text-[9px] bg-[#edd0ce] text-[#8c322b] px-1 rounded font-mono">
                                      Conc.
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-[#7a6448] block mt-0.5">
                                  {spell.castingTime} • {spell.range} • {spell.duration}
                                </span>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddSpellFromCompendium(spell);
                                }}
                                disabled={isAlreadyKnown}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-fantasy shadow transition cursor-pointer shrink-0 ${
                                  isAlreadyKnown
                                    ? 'bg-[#dfd4c0] text-[#8a7b66] cursor-not-allowed'
                                    : 'bg-[#b88c32] hover:bg-[#8c672b] text-white'
                                }`}
                              >
                                {isAlreadyKnown ? '✓ En tu libro' : '+ Añadir'}
                              </button>
                            </div>

                            <p className="text-xs text-[#5c4a35] mt-2 line-clamp-3 leading-relaxed">
                              {spell.description}
                            </p>

                            <div className="mt-2 pt-1 border-t border-[#e2d5c2] flex items-center justify-between text-[11px] text-[#8c672b]">
                              <span className="flex items-center gap-1 group-hover:underline">
                                <Eye className="w-3 h-3" /> Ver detalles completos & componentes →
                              </span>
                              {spell.higherLevels && (
                                <span className="text-[10px] text-[#8c7457] italic">
                                  Escala a niveles superiores
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* PAGE 4: BROWSE HIGHER LEVEL SPELLS (READ ONLY / CHUSMEAR) */}
              {activeTab === 'browse_higher' && (
                <div className="col-span-full space-y-4">
                  <div className="p-3 bg-[#faecd6] rounded-xl border border-[#e5cfa8] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#7d561a]">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <div>
                        <h4 className="font-bold font-fantasy text-xs uppercase">
                          Modo Consulta de Niveles Superiores (Chusmear) 👁️
                        </h4>
                        <p className="text-xs leading-snug">
                          Estos conjuros pertenecen a la lista de {character.class}, pero requieren un nivel de personaje mayor que tu nivel actual (Nivel {character.level}). Haz clic en cualquiera para leer sus efectos completos y planificar tus tácticas futuras.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* List of Higher Level Spells */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
                    {filteredCompendium.higherLevelToBrowse.map((spell) => {
                      const requiredCharLevel = spell.level * 2 - 1;
                      return (
                        <div
                          key={spell.id}
                          onClick={() => setSelectedSpell(spell)}
                          className="p-3.5 bg-[#f3ede1] rounded-xl border border-[#d6c8b2] shadow-sm opacity-90 hover:opacity-100 hover:border-[#b88c32] hover:bg-[#faf4ec] transition flex flex-col justify-between cursor-pointer group"
                          title="Haz clic para leer todos los detalles del conjuro"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold font-fantasy text-sm text-[#4a361c] group-hover:text-[#8c672b] transition">
                                  {spell.name}
                                </h4>
                                <span className="text-[10px] bg-[#d94b45] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                                  Nivel {spell.level}
                                </span>
                                {spell.ritual && (
                                  <span className="text-[9px] bg-[#dfd2bd] text-[#70542c] px-1 rounded font-mono">
                                    Ritual
                                  </span>
                                )}
                                {spell.concentration && (
                                  <span className="text-[9px] bg-[#edd0ce] text-[#8c322b] px-1 rounded font-mono">
                                    Conc.
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#7a6448] block mt-0.5">
                                {spell.school} • {spell.castingTime} • {spell.range}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 bg-[#ecdcc6] text-[#78592c] border border-[#d4be9b] px-2 py-1 rounded text-[10px] font-bold font-mono shrink-0">
                              <Lock className="w-3 h-3" />
                              Req. Nv PJ {requiredCharLevel}+
                            </div>
                          </div>

                          <p className="text-xs text-[#5c4a35] mt-2 line-clamp-3 leading-relaxed">
                            {spell.description}
                          </p>

                          <div className="mt-2 pt-1 border-t border-[#e2d5c2] flex items-center justify-between text-[11px] text-[#8c672b]">
                            <span className="flex items-center gap-1 group-hover:underline">
                              <Eye className="w-3 h-3" /> Ver detalles completos & componentes →
                            </span>
                            {spell.higherLevels && (
                              <span className="text-[10px] text-[#8c7457] italic">
                                Escala a niveles superiores
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {filteredCompendium.higherLevelToBrowse.length === 0 && (
                      <div className="col-span-full py-12 text-center text-[#8a765d]">
                        <p className="text-sm font-fantasy">¡Ya tienes acceso a todos los niveles de conjuro de tu clase!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Bottom Parchment Bar */}
        <div className="p-3 px-6 bg-[#261d16] border-t border-[#4d3a24] flex items-center justify-between text-xs text-[#baa995]">
          <div className="flex items-center gap-2">
            <span className="font-fantasy font-bold text-[#f7f2ea]">Mythweaver</span>
            <span>• Conectado a reglas oficiales Wikidot 5e</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#b88c32] hover:bg-[#8c672b] text-[#1c150e] hover:text-white font-fantasy font-bold rounded-lg text-xs shadow transition cursor-pointer"
          >
            Cerrar Folio
          </button>
        </div>
      </div>

      {/* Full Spell Detail Reading Modal / Overlay */}
      <SpellDetailModal
        spell={selectedSpell}
        onClose={() => setSelectedSpell(null)}
        isKnown={
          selectedSpell
            ? characterSpells.some((cs) => cs.name.toLowerCase() === selectedSpell.name.toLowerCase())
            : false
        }
        isPrepared={
          selectedSpell
            ? characterSpells.find((cs) => cs.name.toLowerCase() === selectedSpell.name.toLowerCase())
                ?.prepared || selectedSpell.level === 0
            : false
        }
        canCast={
          selectedSpell
            ? selectedSpell.level === 0 ||
              characterSpells.some(
                (cs) => cs.name.toLowerCase() === selectedSpell.name.toLowerCase() && (cs.prepared || cs.level === 0)
              )
            : false
        }
        onTogglePrepared={
          selectedSpell && selectedSpell.level > 0
            ? () => {
                const existing = characterSpells.find(
                  (cs) => cs.name.toLowerCase() === selectedSpell.name.toLowerCase()
                );
                if (existing) togglePrepared(existing.id);
              }
            : undefined
        }
        onCastSpell={selectedSpell ? () => handleCastSpell(selectedSpell) : undefined}
        onAddSpell={selectedSpell ? () => handleAddSpellFromCompendium(selectedSpell) : undefined}
        onRemoveSpell={
          selectedSpell
            ? () => {
                const existing = characterSpells.find(
                  (cs) => cs.name.toLowerCase() === selectedSpell.name.toLowerCase()
                );
                if (existing) handleRemoveSpell(existing.id);
              }
            : undefined
        }
      />

      {/* Rest Modal */}
      <RestModal
        isOpen={isRestModalOpen}
        onClose={() => setIsRestModalOpen(false)}
        character={character}
        initialRestType={activeRestType}
        onConfirmRest={handleConfirmRest}
      />

      {/* Themed Notification Modal */}
      <ThemedNotificationModal
        isOpen={themedAlert.isOpen}
        onClose={() => setThemedAlert((prev) => ({ ...prev, isOpen: false }))}
        title={themedAlert.title}
        subtitle={themedAlert.subtitle}
        message={themedAlert.message}
        type={themedAlert.type}
        confirmText={themedAlert.confirmText}
        cancelText={themedAlert.cancelText}
        onConfirm={themedAlert.onConfirm}
      />
    </div>
  );
};
