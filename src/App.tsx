import React, { useState, useRef, useMemo } from 'react';
import { Character } from './types';
import { useCharacterStore } from './hooks/useCharacterStore';
import { useUiScale } from './hooks/useUiScale';
import { useUiSkin } from './hooks/useUiSkin';
import { CharacterCreatorModal } from './components/CharacterCreatorModal';
import { CustomizableCharacterSheetModal } from './components/CustomizableCharacterSheetModal';
import { LevelUpModal } from './components/LevelUpModal';
import { GrimoireModal } from './components/GrimoireModal';
import { PdfCharacterImportModal } from './components/PdfCharacterImportModal';
import { UiScaleConfiguratorModal } from './components/UiScaleConfiguratorModal';
import { SkinSelectorModal } from './components/SkinSelectorModal';
import { CompendiumView } from './components/CompendiumView';
import { EquipmentBuilderModal } from './components/EquipmentBuilderModal';
import { PathfinderGothicCard } from './components/PathfinderGothicCard';
import { ThemedNotificationModal, ThemedModalType } from './components/ThemedNotificationModal';
import { WeaponDef, ArmorDef } from './data/weaponsAndArmorData';
import { exportCharacterToOfficialPdf } from './utils/pdfCharacterExporter';
import { getBarbarianMaxRages, getBarbarianRageDamageBonus } from './data/characterRulesEngine';
import {
  Swords,
  Shield,
  Plus,
  FileDown,
  Upload,
  Sparkles,
  Sliders,
  FolderDown,
  BookOpen,
  X,
  Settings,
  Layers,
  Scroll,
  ChevronsUp,
  ChevronsDown,
} from 'lucide-react';

export default function App() {
  const {
    characters,
    saveCharacter,
    deleteCharacter,
    duplicateCharacter,
    importCharacters,
    exportAllJson,
    exportSingleJson,
    customWeapons,
    customArmors,
    saveCustomWeapon,
    deleteCustomWeapon,
    saveCustomArmor,
    deleteCustomArmor,
  } = useCharacterStore();

  const { scale: uiScale, setScale: setUiScale, resetZoom } = useUiScale();
  const { skin, setSkin } = useUiSkin();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<'characters' | 'compendium'>('characters');

  // Header collapsed state
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(() => {
    try {
      return localStorage.getItem('mythweaver_header_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleHeaderCollapsed = () => {
    setIsHeaderCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('mythweaver_header_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  // Status Filter: all / completed / drafts
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'drafts'>('all');

  // Modals state
  const [characterCreatorModalOpen, setCharacterCreatorModalOpen] = useState(false);
  const [creatorEditingCharacter, setCreatorEditingCharacter] = useState<Character | null>(null);
  const [sheetActiveCharacter, setSheetActiveCharacter] = useState<Character | null>(null);
  const [levelUpCharacter, setLevelUpCharacter] = useState<Character | null>(null);
  const [grimoireCharacter, setGrimoireCharacter] = useState<Character | null>(null);
  const [pdfImportModalOpen, setPdfImportModalOpen] = useState(false);
  const [uiScaleModalOpen, setUiScaleModalOpen] = useState(false);
  const [skinModalOpen, setSkinModalOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  // Quick HP adjustments on cards
  const [quickDamageId, setQuickDamageId] = useState<string | null>(null);
  const [quickAmount, setQuickAmount] = useState<string>('');
  const [exportingPdfId, setExportingPdfId] = useState<string | null>(null);

  // Themed Alert & Confirmation Modals
  const [deleteTargetCharacter, setDeleteTargetCharacter] = useState<Character | null>(null);
  const [themedAlert, setThemedAlert] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    type: ThemedModalType;
    message: string;
  }>({
    isOpen: false,
    title: '',
    type: 'info',
    message: '',
  });

  // Equipment Builder modal state
  const [equipmentBuilderOpen, setEquipmentBuilderOpen] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<WeaponDef | null>(null);
  const [editingArmor, setEditingArmor] = useState<ArmorDef | null>(null);

  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);

  // Filtered Characters
  const draftCharacters = useMemo(() => characters.filter((c) => c.isDraft), [characters]);
  const completedCharacters = useMemo(() => characters.filter((c) => !c.isDraft), [characters]);

  const displayedCharacters = useMemo(() => {
    if (statusFilter === 'drafts') return draftCharacters;
    if (statusFilter === 'completed') return completedCharacters;
    return characters;
  }, [characters, draftCharacters, completedCharacters, statusFilter]);

  const handleOpenNewCharacter = () => {
    setCreatorEditingCharacter(null);
    setCharacterCreatorModalOpen(true);
  };

  const handleEditInCreator = (char: Character) => {
    setCreatorEditingCharacter(char);
    setCharacterCreatorModalOpen(true);
  };

  const handleOpenSheet = (char: Character) => {
    setSheetActiveCharacter(char);
  };

  const handleOpenGrimoire = (char: Character) => {
    setGrimoireCharacter(char);
  };

  const handleExportPdf = async (char: Character) => {
    setExportingPdfId(char.id);
    try {
      await exportCharacterToOfficialPdf(char);
    } catch (e) {
      console.error('Error exportando PDF oficial:', e);
      setThemedAlert({
        isOpen: true,
        title: 'Error de Exportación',
        subtitle: 'Hoja de Personaje Oficial D&D 5e',
        type: 'danger',
        message: 'Hubo un error al generar la hoja oficial en PDF. Por favor revisa los datos del héroe.',
      });
    } finally {
      setExportingPdfId(null);
    }
  };

  const handleUpdateHp = (id: string, newHp: number, tempHp?: number) => {
    const char = characters.find((c) => c.id === id);
    if (!char) return;
    const clampedHp = Math.max(0, Math.min(char.maxHp || 10, newHp));
    saveCharacter({
      ...char,
      currentHp: clampedHp,
      tempHp: tempHp !== undefined ? tempHp : char.tempHp,
    });
  };

  const applyQuickAdjustment = (char: Character, isDamage: boolean) => {
    const val = parseInt(quickAmount) || 0;
    if (val <= 0) return;
    const delta = isDamage ? -val : val;
    handleUpdateHp(char.id, char.currentHp + delta);
    setQuickAmount('');
    setQuickDamageId(null);
  };

  const handleToggleBarbarianRage = (char: Character) => {
    const isBarbarian =
      char.class.toLowerCase().includes('barb') || char.class.toLowerCase().includes('bárbaro');
    if (!isBarbarian) return;

    const barbarianLevel = char.level || 1;
    const maxRages = getBarbarianMaxRages(barbarianLevel);
    const rageDmg = getBarbarianRageDamageBonus(barbarianLevel);

    const currentResources = [...(char.classResources || [])];
    let rageResIndex = currentResources.findIndex((r) => r.id === 'res-furia');

    if (rageResIndex === -1) {
      currentResources.push({
        id: 'res-furia',
        name: 'Usos de Furia (Rage)',
        current: maxRages,
        max: maxRages,
        resetOn: 'long',
        description: `+${rageDmg} al daño cuerpo a cuerpo con FUE, ventaja en pruebas de Fuerza y resistencia a daño contundente, cortante y perforante.${
          barbarianLevel >= 20 ? ' (Furia ilimitada a Nivel 20)' : ''
        }`,
      });
      rageResIndex = currentResources.length - 1;
    }

    const currentAvailable = currentResources[rageResIndex].current;
    const nextRaging = !char.isRaging;

    if (nextRaging) {
      if (currentAvailable <= 0 && maxRages !== 999) {
        setThemedAlert({
          isOpen: true,
          title: 'Sin Usos de Furia',
          subtitle: 'Furia Primitiva Agotada',
          type: 'warning',
          message: `¡${char.name} no tiene usos de Furia disponibles! Realiza un descanso largo para recuperarlos.`,
        });
        return;
      }
      const newCurrent = maxRages === 999 ? 999 : Math.max(0, currentAvailable - 1);
      currentResources[rageResIndex] = {
        ...currentResources[rageResIndex],
        current: newCurrent,
      };
      saveCharacter({
        ...char,
        isRaging: true,
        classResources: currentResources,
      });
    } else {
      saveCharacter({
        ...char,
        isRaging: false,
        classResources: currentResources,
      });
    }
  };

  const handleDeleteCharacterRequest = (id: string) => {
    const target = characters.find((c) => c.id === id);
    if (target) {
      setDeleteTargetCharacter(target);
    }
  };

  const confirmDeleteCharacter = () => {
    if (deleteTargetCharacter) {
      deleteCharacter(deleteTargetCharacter.id);
      setDeleteTargetCharacter(null);
    }
  };

  const handleJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          importCharacters(parsed);
          setThemedAlert({
            isOpen: true,
            title: 'Importación Exitosa',
            subtitle: 'Respaldo Restaurado',
            type: 'success',
            message: `Se han importado correctamente ${parsed.length} personajes.`,
          });
        } else if (parsed && typeof parsed === 'object') {
          saveCharacter(parsed as Character);
          setThemedAlert({
            isOpen: true,
            title: 'Héroe Importado',
            subtitle: parsed.name || 'Nuevo Aventurero',
            type: 'success',
            message: `¡${parsed.name || 'El personaje'} ha sido importado con éxito!`,
          });
        }
      } catch (err) {
        console.error('Error importando JSON:', err);
        setThemedAlert({
          isOpen: true,
          title: 'Error de Lectura',
          subtitle: 'Archivo JSON Inválido',
          type: 'danger',
          message: 'El archivo seleccionado no tiene un formato JSON válido de MythWeaver.',
        });
      } finally {
        if (jsonFileInputRef.current) {
          jsonFileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleHero = () => {
    const sampleChar: Character = {
      id: 'sample-' + Date.now(),
      campaignId: 'standalone',
      name: 'Valeros del Alba',
      playerName: 'Aventurero',
      race: 'Humano',
      class: 'Guerrero',
      subclass: 'Campeón',
      background: 'Soldado',
      alignment: 'Legal Bueno',
      level: 3,
      maxHp: 28,
      currentHp: 28,
      tempHp: 0,
      ac: 18,
      initiativeBonus: 1,
      speed: '30 pies',
      passivePerception: 12,
      stats: { str: 16, dex: 12, con: 15, int: 10, wis: 13, cha: 9 },
      savingThrows: ['str', 'con'],
      skills: ['Atletismo', 'Intimidación', 'Percepción', 'Supervivencia'],
      avatarUrl: '',
      avatarFrame: 'frame-forge-iron',
      gold: 25,
      silver: 10,
      copper: 0,
      platinum: 0,
      inventory: ['Cota de Malla', 'Espada Larga', 'Escudo', 'Ballesta Ligera', '20 Virotes', 'Mochila de Explorador'],
      equippedItems: ['Cota de Malla', 'Espada Larga', 'Escudo'],
      attacks: [
        {
          id: 'atk-1',
          name: 'Espada Larga',
          bonus: '+5',
          damage: '1d8 + 3',
          type: 'Cortante',
        },
        {
          id: 'atk-2',
          name: 'Ballesta Ligera',
          bonus: '+3',
          damage: '1d8 + 1',
          type: 'Perforante',
        },
      ],
      languages: ['Común', 'Élfico'],
      isDraft: false,
      lastSavedAt: new Date().toISOString(),
      creatorState: {
        currentStep: 'review',
        characterName: 'Valeros del Alba',
        playerName: 'Aventurero',
        selectedRaceId: 'human',
        selectedClassId: 'fighter',
        selectedBackgroundId: 'soldier',
        characterLevel: 3,
      } as any,
    };
    saveCharacter(sampleChar);
  };

  return (
    <div
      className="min-h-screen text-[#f4ecd8] flex flex-col font-sans select-none selection:bg-[#b88c32] selection:text-[#fdfaf3]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(20, 12, 7, 0.30), rgba(20, 12, 7, 0.30)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: '700px auto',
        backgroundColor: '#1b1008',
      }}
    >
      {/* ========================================================= */}
      {/* TOP CONSOLE HEADER (Antique Wood & Sculpted Assets)        */}
      {/* ========================================================= */}
      <header
        className="sticky top-0 z-40 border-t-[3px] border-[#4a3d31] border-b border-[#8c672b]/70 shadow-2xl text-[#f5eee2]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(24, 15, 9, 0.7), rgba(16, 10, 6, 0.82)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '550px auto',
          backgroundColor: '#180e07',
        }}
      >
        {/* Upper Shelf: Dragon Crest + Fantasy Lettering on Left, Cartouche & Settings on Right */}
        <div
          className={`w-full transition-all duration-300 ease-in-out ${
            isHeaderCollapsed
              ? 'max-h-0 opacity-0 py-0 pointer-events-none overflow-hidden'
              : 'max-h-[500px] opacity-100 relative z-30 overflow-visible'
          }`}
        >
          <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Majestic Dragon Logo + Fantasy Name */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <img
              src="/assets/ui/logo_minimalist_mythweaver.png"
              alt="Mythweaver Dragon Crest"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_4px_24px_rgba(255,200,80,0.7)] shrink-0 transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase select-none leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                style={{
                  fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                  background: 'linear-gradient(180deg, #fff9e6 0%, #dfbe7e 40%, #b88c32 75%, #7a581e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 16px rgba(223,190,126,0.45))',
                }}
              >
                Mythweaver
              </span>
              <span className="text-[11px] sm:text-xs font-fantasy tracking-[0.25em] text-[#a89279] uppercase mt-1">
                Forja de Héroes 5e <span className="text-[#ffd56b] font-semibold lowercase">v2.0 • Standalone</span>
              </span>
            </div>
          </div>

          {/* Right: User Identity Cartouche & Consolidated Settings Gear */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* User Account / Identity Display - Heraldic Plaque Cartouche */}
            <div className="relative h-10 flex items-center shrink-0">
              <img
                src="/assets/ui/badge_user_identity_cartouche.png"
                alt=""
                className="h-full w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] pointer-events-none select-none"
              />
              {/* Medallion Socket (Circular frame on the left) */}
              <div className="absolute left-[3.5%] w-[21%] top-0 bottom-0 flex items-center justify-center pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd56b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
              </div>
              {/* Nameplate text container (Main plaque surface) */}
              <div className="absolute left-[24%] right-[5%] top-0 bottom-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-fantasy font-bold text-[#ffd56b] flex items-center gap-1 whitespace-nowrap">
                  <span className="text-[#a89279] text-[10px] uppercase tracking-wider font-semibold">
                    Modo:
                  </span>
                  <span className="text-[#f5eee2] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Local & Offline
                  </span>
                </span>
              </div>
            </div>

            {/* Consolidated Settings Gear (⚙️) Button */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                className="relative flex items-center justify-center w-10 h-10 transition-transform duration-150 cursor-pointer active:scale-95 group shrink-0"
                title="Ajustes del Portal (Escala de Interfaz y Apariencia)"
                aria-label="Ajustes del Portal"
              >
                <img
                  src={
                    settingsMenuOpen
                      ? '/assets/ui/btn_header_action_active.png'
                      : '/assets/ui/btn_header_action_normal.png'
                  }
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] group-hover:brightness-110 pointer-events-none select-none"
                />
                <Settings
                  className={`relative z-10 w-4 h-4 transition-transform duration-300 ${
                    settingsMenuOpen
                      ? 'text-[#2e1906] rotate-90 scale-110'
                      : 'text-[#dfbe7e] group-hover:text-[#ffd56b] group-hover:rotate-45'
                  }`}
                />
              </button>

              {/* Settings Dropdown Popover Plaque */}
              {settingsMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSettingsMenuOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-12 z-50 w-72 p-4 transition-all animate-in fade-in zoom-in-95 duration-150"
                    style={{
                      backgroundImage: 'url(/assets/ui/bg_ajustes_portal_frame.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'transparent',
                      filter: 'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.9))',
                    }}
                  >
                    <div className="space-y-3 pt-1">
                      {/* Popover Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#dfbe7e]/25 relative">
                        <span className="font-fantasy font-bold text-xs uppercase tracking-wider text-[#ffd56b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          Ajustes del Portal
                        </span>
                        <button
                          type="button"
                          onClick={() => setSettingsMenuOpen(false)}
                          className="text-[#a89279] hover:text-[#fdfaf3] p-1 rounded hover:bg-[#3d2717]/60 transition cursor-pointer"
                          aria-label="Cerrar ajustes"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Zoom / Scale Config */}
                      <div className="space-y-1.5 px-1">
                        <div className="flex items-center justify-between text-xs text-[#c0ad97] px-1.5">
                          <span className="flex items-center gap-1.5 font-fantasy">
                            <Sliders className="w-3.5 h-3.5 text-[#dfbe7e]" /> Escala de Vista
                          </span>
                          <span className="font-mono text-[#ffd56b] font-bold">
                            {Math.round(uiScale * 100)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          {[0.8, 0.9, 1.0, 1.1, 1.25].map((val) => {
                            const isSel = Math.round(uiScale * 100) === Math.round(val * 100);
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setUiScale(val)}
                                className="relative flex items-center justify-center w-[34px] h-[34px] transition-transform cursor-pointer active:scale-95 group shrink-0"
                                title={`Escala ${Math.round(val * 100)}%`}
                              >
                                <img
                                  src={
                                    isSel
                                      ? '/assets/ui/btn_scale_mini_active.png'
                                      : '/assets/ui/btn_scale_mini_normal.png'
                                  }
                                  alt=""
                                  className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] group-hover:brightness-110 pointer-events-none select-none"
                                />
                                <span
                                  className={`relative z-10 font-mono text-[10px] ${
                                    isSel
                                      ? 'text-[#1b1008] font-black'
                                      : 'text-[#dfbe7e] font-bold group-hover:text-[#ffd56b]'
                                  }`}
                                >
                                  {Math.round(val * 100)}%
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setUiScaleModalOpen(true);
                            setSettingsMenuOpen(false);
                          }}
                          className="w-full text-center text-[10.5px] text-[#dfbe7e] hover:text-[#ffd56b] hover:underline pt-0.5 cursor-pointer font-fantasy"
                        >
                          Ajuste fino de interfaz...
                        </button>
                      </div>

                      {/* Theme / Aspect Button */}
                      <div className="pt-2 border-t border-[#dfbe7e]/20 flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsMenuOpen(false);
                            setSkinModalOpen(true);
                          }}
                          style={{
                            backgroundImage: 'url(/assets/ui/btn_nav_normal.png)',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'transparent',
                          }}
                          className="w-[210px] h-8.5 flex items-center justify-center text-[11.5px] font-fantasy font-bold text-[#dfbe7e] hover:text-[#fff6db] hover:brightness-110 active:scale-95 transition cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none whitespace-nowrap"
                          title="Abrir selector de temas y aspectos visuales"
                        >
                          <span>Cambiar aspecto visual</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* Sculpted Console Navigation Bar */}
        <div
          className="w-full relative z-20 border-t border-[#4a3622]/60 shadow-[0_6px_20px_rgba(0,0,0,0.85)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(24, 15, 9, 0.50), rgba(16, 10, 6, 0.65)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '550px auto',
          }}
        >
          <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 py-1">
            <div className="flex items-center gap-2">
              {/* Tab 1: Mis Aventureros */}
              <button
                type="button"
                onClick={() => setCurrentTab('characters')}
                style={{
                  backgroundImage:
                    currentTab === 'characters'
                      ? 'url(/assets/ui/btn_nav_active.png)'
                      : 'url(/assets/ui/btn_nav_normal.png)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'transparent',
                  minWidth: '190px',
                  height: '40px',
                }}
                className={`flex items-center justify-center gap-2 px-4 transition cursor-pointer select-none ${
                  currentTab === 'characters'
                    ? 'text-[#2e1906] font-extrabold'
                    : 'text-[#dfbe7e] font-bold hover:text-[#fff6db] hover:brightness-110'
                } text-xs font-fantasy uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
              >
                <Swords className="w-4 h-4 shrink-0" />
                <span>Mis Aventureros ({characters.length})</span>
              </button>

              {/* Tab 2: Compendio 5e & Armería */}
              <button
                type="button"
                onClick={() => setCurrentTab('compendium')}
                style={{
                  backgroundImage:
                    currentTab === 'compendium'
                      ? 'url(/assets/ui/btn_nav_active.png)'
                      : 'url(/assets/ui/btn_nav_normal.png)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'transparent',
                  minWidth: '220px',
                  height: '40px',
                }}
                className={`flex items-center justify-center gap-2 px-4 transition cursor-pointer select-none ${
                  currentTab === 'compendium'
                    ? 'text-[#2e1906] font-extrabold'
                    : 'text-[#dfbe7e] font-bold hover:text-[#fff6db] hover:brightness-110'
                } text-xs font-fantasy uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Compendio 5e & Armería</span>
              </button>
            </div>

            {/* Right: Collapse / Expand Button with Forged Button Frame */}
            <button
              type="button"
              onClick={toggleHeaderCollapsed}
              className="relative flex items-center justify-center w-10 h-10 transition-transform duration-150 cursor-pointer active:scale-95 group shrink-0"
              title={isHeaderCollapsed ? "Expandir panel superior" : "Colapsar panel superior"}
              aria-label={isHeaderCollapsed ? "Expandir panel superior" : "Colapsar panel superior"}
            >
              <img
                src="/assets/ui/btn_header_action_normal.png"
                alt=""
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] group-hover:brightness-110 transition select-none"
              />
              {isHeaderCollapsed ? (
                <ChevronsDown className="relative z-10 w-5 h-5 text-[#dfbe7e] group-hover:text-[#ffd56b] group-hover:translate-y-0.5 transition-transform" />
              ) : (
                <ChevronsUp className="relative z-10 w-5 h-5 text-[#dfbe7e] group-hover:text-[#ffd56b] group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN CONTENT PANE                                         */}
      {/* ========================================================= */}
      <main className="flex-1 w-full max-w-[1480px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {currentTab === 'characters' ? (
          <div className="space-y-4">
            {/* Códice de Aventureros Header Bar */}
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-3 bg-[#1a0f08]/95 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border-2 border-[#7a532d] shadow-[0_12px_28px_rgba(0,0,0,0.7)] text-[#f5eedc] w-full">
              {/* Title Area */}
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                <h2
                  style={{ fontFamily: "'Cinzel', 'Cinzel Decorative', serif" }}
                  className="text-base sm:text-lg md:text-xl font-black text-[#f5eedc] tracking-wider uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                >
                  Códice de Aventureros
                </h2>
              </div>

              {/* Action Buttons with Sculpted Assets */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap shrink-0 justify-center">
                {/* Héroe de Ejemplo */}
                <button
                  type="button"
                  onClick={handleLoadSampleHero}
                  style={{
                    backgroundImage: 'url(/assets/ui/btn_nav_normal.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 h-9 text-[11px] sm:text-xs font-fantasy font-bold text-[#dfbe7e] hover:text-[#fff6db] hover:brightness-110 active:scale-95 transition cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none whitespace-nowrap"
                  title="Cargar un aventurero de ejemplo preconstruido"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd56b]" />
                  <span>Héroe de Ejemplo</span>
                </button>

                {/* Respaldo Completo JSON */}
                {characters.length > 0 && (
                  <button
                    type="button"
                    onClick={exportAllJson}
                    style={{
                      backgroundImage: 'url(/assets/ui/btn_nav_normal.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'transparent',
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 h-9 text-[11px] sm:text-xs font-fantasy font-bold text-[#dfbe7e] hover:text-[#fff6db] hover:brightness-110 active:scale-95 transition cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none whitespace-nowrap"
                    title="Descargar copia de seguridad con todos los personajes en .json"
                  >
                    <FolderDown className="w-3.5 h-3.5 text-[#dfbe7e]" />
                    <span>Respaldo ({characters.length})</span>
                  </button>
                )}

                {/* Import JSON */}
                <button
                  type="button"
                  onClick={() => jsonFileInputRef.current?.click()}
                  style={{
                    backgroundImage: 'url(/assets/ui/btn_nav_normal.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 h-9 text-[11px] sm:text-xs font-fantasy font-bold text-[#dfbe7e] hover:text-[#fff6db] hover:brightness-110 active:scale-95 transition cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none whitespace-nowrap"
                  title="Cargar archivo .json de personaje previamente guardado"
                >
                  <Upload className="w-3.5 h-3.5 text-[#dfbe7e]" />
                  <span>Importar JSON</span>
                </button>
                <input
                  type="file"
                  ref={jsonFileInputRef}
                  accept=".json"
                  onChange={handleJsonFileChange}
                  className="hidden"
                />

                {/* Import PDF */}
                <button
                  type="button"
                  onClick={() => setPdfImportModalOpen(true)}
                  style={{
                    backgroundImage: 'url(/assets/ui/btn_nav_normal.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 h-9 text-[11px] sm:text-xs font-fantasy font-bold text-[#dfbe7e] hover:text-[#fff6db] hover:brightness-110 active:scale-95 transition cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none whitespace-nowrap"
                  title="Importar hoja de personaje directamente desde un archivo PDF oficial"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#dfbe7e]" />
                  <span>Importar PDF</span>
                </button>

                {/* Crear Personaje (Active Golden Asset) */}
                <button
                  type="button"
                  onClick={handleOpenNewCharacter}
                  style={{
                    backgroundImage: 'url(/assets/ui/btn_nav_active.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                  }}
                  className="flex items-center justify-center text-center px-4 h-9 text-[11px] sm:text-xs font-fantasy font-extrabold text-[#2e1906] hover:text-[#1a0e03] hover:brightness-110 active:scale-95 transition cursor-pointer drop-shadow-[0_1px_2px_rgba(255,240,180,0.75)] select-none whitespace-nowrap leading-none"
                  title="Crear un nuevo personaje guiado en 9 pasos"
                >
                  <Plus className="w-4 h-4 stroke-[3] -ml-1 mr-1" />
                  <span>Crear Personaje</span>
                </button>
              </div>
            </div>

            {/* Status Filter Buttons: Discreet, elegant antique leather & bronze tabs */}
            <div className="flex items-center gap-1.5 px-1 py-0.5">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-md text-[11px] sm:text-xs font-fantasy tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'all'
                    ? 'bg-[#3d2716] text-[#ffd56b] font-bold border border-[#8c672b] shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
                    : 'text-[#a89279] hover:text-[#f5eee2] hover:bg-[#26170d]/60 border border-transparent'
                }`}
              >
                <span>Todos</span>
                <span className="text-[10px] font-mono opacity-80">({characters.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1 rounded-md text-[11px] sm:text-xs font-fantasy tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'completed'
                    ? 'bg-[#3d2716] text-[#ffd56b] font-bold border border-[#8c672b] shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
                    : 'text-[#a89279] hover:text-[#f5eee2] hover:bg-[#26170d]/60 border border-transparent'
                }`}
              >
                <span>Completos</span>
                <span className="text-[10px] font-mono opacity-80">({completedCharacters.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('drafts')}
                className={`px-3 py-1 rounded-md text-[11px] sm:text-xs font-fantasy tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'drafts'
                    ? 'bg-[#4a2414] text-[#ffb088] font-bold border border-[#b84a1c] shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
                    : 'text-[#a89279] hover:text-[#f5eee2] hover:bg-[#26170d]/60 border border-transparent'
                }`}
              >
                <span>Borradores</span>
                <span className={`text-[10px] font-mono ${draftCharacters.length > 0 ? 'text-[#ffb088] font-bold' : 'opacity-80'}`}>
                  ({draftCharacters.length})
                </span>
              </button>
            </div>

            {/* Character Cards Grid or Empty State */}
            {displayedCharacters.length === 0 ? (
              <div
                className="relative rounded-2xl border-2 border-[#8c672b]/60 p-8 sm:p-12 text-center shadow-2xl flex flex-col items-center justify-center gap-4 overflow-hidden"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(24, 15, 9, 0.94), rgba(16, 10, 6, 0.98)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
                  backgroundColor: '#180e07',
                }}
              >
                <img
                  src="/assets/ui/logo_minimalist_mythweaver.png"
                  alt=""
                  className="w-24 h-24 object-contain opacity-75 drop-shadow-[0_4px_16px_rgba(255,200,80,0.4)]"
                />
                <div className="max-w-md space-y-1">
                  <h3
                    style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif" }}
                    className="text-lg sm:text-xl font-black text-[#f5eedc] uppercase tracking-wider"
                  >
                    Tu Códice está Vacío
                  </h3>
                  <p className="text-xs text-[#c4aa82] leading-relaxed">
                    No tienes aventureros en esta categoría. Puedes forjar un nuevo personaje desde cero con el
                    asistente de 9 pasos, cargar un héroe de ejemplo o importar una hoja en PDF o JSON.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleOpenNewCharacter}
                    style={{
                      backgroundImage: 'url(/assets/ui/btn_nav_active.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'transparent',
                    }}
                    className="flex items-center justify-center gap-2 px-5 h-10 text-xs font-fantasy font-extrabold text-[#2e1906] hover:brightness-110 active:scale-95 transition cursor-pointer select-none drop-shadow-[0_1px_2px_rgba(255,240,180,0.75)]"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Crear Primer Personaje</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLoadSampleHero}
                    style={{
                      backgroundImage: 'url(/assets/ui/btn_nav_normal.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: 'transparent',
                    }}
                    className="flex items-center justify-center gap-2 px-5 h-10 text-xs font-fantasy font-bold text-[#dfbe7e] hover:text-[#fff6db] hover:brightness-110 active:scale-95 transition cursor-pointer select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                  >
                    <Sparkles className="w-4 h-4 text-[#ffd56b]" />
                    <span>Cargar Héroe de Ejemplo</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Grid of Authentic Pathfinder Gothic Parchment Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1480px] mx-auto mt-2">
                {displayedCharacters.map((char) => (
                  <PathfinderGothicCard
                    key={char.id}
                    char={char}
                    onOpenCustomSheet={handleOpenSheet}
                    onEditCharacter={handleOpenSheet}
                    onEditCharacterInCreator={handleEditInCreator}
                    onDeleteCharacter={handleDeleteCharacterRequest}
                    onUpdateHp={handleUpdateHp}
                    onOpenGrimoire={handleOpenGrimoire}
                    onUpdateCharacter={saveCharacter}
                    setLevelUpCharacter={setLevelUpCharacter}
                    handleExportPdf={handleExportPdf}
                    handleExportJson={exportSingleJson}
                    quickDamageId={quickDamageId}
                    setQuickDamageId={setQuickDamageId}
                    quickAmount={quickAmount}
                    setQuickAmount={setQuickAmount}
                    applyQuickAdjustment={applyQuickAdjustment}
                    handleToggleBarbarianRage={handleToggleBarbarianRage}
                    exportingCharId={exportingPdfId}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================= */
          /* COMPENDIUM 5E & EQUIPMENT FORGE                           */
          /* ========================================================= */
          <div className="space-y-4">
            <CompendiumView
              customWeapons={customWeapons}
              customArmors={customArmors}
              onOpenEquipmentBuilder={(weapon, armor) => {
                setEditingWeapon(weapon || null);
                setEditingArmor(armor || null);
                setEquipmentBuilderOpen(true);
              }}
              onDeleteCustomWeapon={deleteCustomWeapon}
              onDeleteCustomArmor={deleteCustomArmor}
            />
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODALS                                                    */}
      {/* ========================================================= */}

      {/* 1. Character Creator 9-Step Modal (with Quebracho wood desk & clamped bookmarks) */}
      {characterCreatorModalOpen && (
        <CharacterCreatorModal
          campaignId="standalone"
          onClose={() => {
            setCharacterCreatorModalOpen(false);
            setCreatorEditingCharacter(null);
          }}
          onSave={(char) => {
            saveCharacter(char);
            setCharacterCreatorModalOpen(false);
            setCreatorEditingCharacter(null);
          }}
          onSaveDraft={(char) => {
            saveCharacter(char);
            setCharacterCreatorModalOpen(false);
            setCreatorEditingCharacter(null);
          }}
          initialCharacter={creatorEditingCharacter || undefined}
        />
      )}

      {/* 2. Interactive Character Sheet Modal */}
      {sheetActiveCharacter && (
        <CustomizableCharacterSheetModal
          character={sheetActiveCharacter}
          onClose={() => setSheetActiveCharacter(null)}
          onUpdateCharacter={(updated: Character) => {
            saveCharacter(updated);
            setSheetActiveCharacter(updated);
          }}
          onEditInCreator={(char: Character) => {
            setSheetActiveCharacter(null);
            handleEditInCreator(char);
          }}
        />
      )}

      {/* 3. Level Up Modal (Nv+1) */}
      {levelUpCharacter && (
        <LevelUpModal
          character={levelUpCharacter}
          onSave={(updated) => {
            saveCharacter(updated);
            setLevelUpCharacter(null);
          }}
          onClose={() => setLevelUpCharacter(null)}
        />
      )}

      {/* 4. Grimoire / Class Codex Modal */}
      {grimoireCharacter && (
        <GrimoireModal
          character={grimoireCharacter}
          onUpdateCharacter={(updated) => {
            saveCharacter(updated);
            setGrimoireCharacter(updated);
          }}
          onClose={() => setGrimoireCharacter(null)}
        />
      )}

      {/* 5. PDF Character Import Modal */}
      {pdfImportModalOpen && (
        <PdfCharacterImportModal
          campaignId="standalone"
          onClose={() => setPdfImportModalOpen(false)}
          onImportCharacter={(imported: Character) => {
            saveCharacter(imported);
            setPdfImportModalOpen(false);
            setThemedAlert({
              isOpen: true,
              title: 'Hoja Importada con Éxito',
              subtitle: imported.name || 'Héroe desde PDF',
              type: 'success',
              message: `¡${imported.name || 'El personaje'} ha sido reconstruido desde el PDF y guardado en tu navegador!`,
            });
          }}
        />
      )}

      {/* 6. Equipment Builder Modal (Weapon & Armor Forge) */}
      {equipmentBuilderOpen && (
        <EquipmentBuilderModal
          isOpen={equipmentBuilderOpen}
          onClose={() => {
            setEquipmentBuilderOpen(false);
            setEditingWeapon(null);
            setEditingArmor(null);
          }}
          onSaveWeapon={(weapon) => {
            saveCustomWeapon(weapon);
            setEquipmentBuilderOpen(false);
            setEditingWeapon(null);
          }}
          onSaveArmor={(armor) => {
            saveCustomArmor(armor);
            setEquipmentBuilderOpen(false);
            setEditingArmor(null);
          }}
          initialWeapon={editingWeapon || undefined}
          initialArmor={editingArmor || undefined}
        />
      )}

      {/* 7. UI Scale Fine-Tune Modal */}
      {uiScaleModalOpen && (
        <UiScaleConfiguratorModal
          isOpen={uiScaleModalOpen}
          scale={uiScale}
          onSetScale={setUiScale}
          onResetScale={resetZoom}
          onClose={() => setUiScaleModalOpen(false)}
        />
      )}

      {/* 8. Skin / Visual Theme Selector Modal */}
      {skinModalOpen && (
        <SkinSelectorModal
          isOpen={skinModalOpen}
          currentSkin={skin}
          onSelectSkin={setSkin}
          onClose={() => setSkinModalOpen(false)}
        />
      )}

      {/* 9. Themed Notification Alert Modal */}
      <ThemedNotificationModal
        isOpen={themedAlert.isOpen}
        onClose={() => setThemedAlert((prev) => ({ ...prev, isOpen: false }))}
        title={themedAlert.title}
        subtitle={themedAlert.subtitle}
        type={themedAlert.type}
        message={themedAlert.message}
      />

      {/* 10. Delete Confirmation Modal */}
      {deleteTargetCharacter && (
        <ThemedNotificationModal
          isOpen={!!deleteTargetCharacter}
          onClose={() => setDeleteTargetCharacter(null)}
          title="¿Eliminar Aventurero?"
          subtitle={deleteTargetCharacter.name}
          type="danger"
          message={`¿Estás seguro de que deseas eliminar permanentemente a "${deleteTargetCharacter.name}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar Definitivamente"
          cancelText="Cancelar"
          onConfirm={confirmDeleteCharacter}
        />
      )}
    </div>
  );
}
