import React, { useState, useRef } from 'react';
import { Character } from './types';
import { useCharacterStore } from './hooks/useCharacterStore';
import { useUiScale } from './hooks/useUiScale';
import { useUiSkin } from './hooks/useUiSkin';
import { CharacterCreatorModal } from './components/CharacterCreatorModal';
import { CustomizableCharacterSheetModal } from './components/CustomizableCharacterSheetModal';
import { PdfCharacterImportModal } from './components/PdfCharacterImportModal';
import { UiScaleConfiguratorModal } from './components/UiScaleConfiguratorModal';
import { SkinSelectorModal } from './components/SkinSelectorModal';
import { CompendiumView } from './components/CompendiumView';
import { EquipmentBuilderModal } from './components/EquipmentBuilderModal';
import { WeaponDef, ArmorDef } from './data/weaponsAndArmorData';
import { FantasyAvatarFrame } from './components/FantasyAvatarFrame';
import { exportCharacterToOfficialPdf } from './utils/pdfCharacterExporter';
import {
  Swords,
  Shield,
  Plus,
  FileDown,
  Upload,
  Download,
  Trash2,
  Copy,
  Edit,
  Scroll,
  Sparkles,
  Sliders,
  Palette,
  Heart,
  Zap,
  Eye,
  Check,
  FolderDown,
  ExternalLink,
  BookOpen,
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

  const { scale, setScale, resetZoom } = useUiScale();
  const { skin, setSkin } = useUiSkin();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<'characters' | 'compendium'>('characters');

  // Modals state
  const [characterCreatorModalOpen, setCharacterCreatorModalOpen] = useState(false);
  const [creatorEditingCharacter, setCreatorEditingCharacter] = useState<Character | null>(null);
  const [sheetActiveCharacter, setSheetActiveCharacter] = useState<Character | null>(null);
  const [pdfImportModalOpen, setPdfImportModalOpen] = useState(false);
  const [uiScaleModalOpen, setUiScaleModalOpen] = useState(false);
  const [skinModalOpen, setSkinModalOpen] = useState(false);
  const [exportingPdfId, setExportingPdfId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Equipment Builder modal state
  const [equipmentBuilderOpen, setEquipmentBuilderOpen] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<WeaponDef | null>(null);
  const [editingArmor, setEditingArmor] = useState<ArmorDef | null>(null);

  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleExportPdf = async (char: Character) => {
    setExportingPdfId(char.id);
    try {
      await exportCharacterToOfficialPdf(char);
    } catch (e) {
      console.error('Error exportando PDF oficial:', e);
      alert('Hubo un error al exportar la hoja en PDF oficial.');
    } finally {
      setExportingPdfId(null);
    }
  };

  const handleJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          importCharacters(parsed);
        } else if (parsed && typeof parsed === 'object' && parsed.id) {
          importCharacters([parsed]);
        } else {
          alert('El archivo JSON no tiene un formato válido de ficha D&D 5e.');
        }
      } catch (err) {
        console.error('Error al importar JSON:', err);
        alert('Error al leer el archivo JSON.');
      }
      if (jsonFileInputRef.current) jsonFileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  // Sample hero generation for new users
  const handleLoadSampleHero = () => {
    const sampleChar: Character = {
      id: 'char-sample-' + Date.now(),
      campaignId: 'standalone',
      name: 'Valeros del Alba',
      playerName: 'Jugador',
      race: 'Humano',
      class: 'Guerrero',
      level: 3,
      background: 'Soldado (Soldier)',
      alignment: 'Legal Bueno (Lawful Good)',
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
        }
      ],
      languages: ['Común', 'Élfico'],
      isDraft: false,
      lastSavedAt: new Date().toISOString(),
      creatorState: {
        currentStep: 'review',
        characterName: 'Valeros del Alba',
        playerName: 'Jugador',
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
      className="min-h-screen flex flex-col text-[#f7f2ea] select-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(14, 10, 7, 0.94), rgba(10, 7, 5, 0.98)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
        backgroundRepeat: 'repeat',
        backgroundColor: '#0e0a07',
      }}
    >
      {/* ========================================================= */}
      {/* TOP CONSOLE HEADER                                        */}
      {/* ========================================================= */}
      <header
        className="w-full shrink-0 border-b border-[#8c672b]/70 shadow-2xl px-3 sm:px-6 py-2.5 sm:py-3 z-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(24, 15, 9, 0.95), rgba(16, 10, 6, 0.98)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
          backgroundColor: '#180e07',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#8c672b] to-[#4a361c] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#1c130b] rounded-[10px] flex items-center justify-center">
                <Swords className="w-5 h-5 text-[#ffd56b]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-fantasy font-black text-lg sm:text-xl text-[#f7e2a9] tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  MythWeaver
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#8c672b]/30 text-[#ffd56b] border border-[#8c672b]/60">
                  Forja de Héroes 5e
                </span>
              </div>
              <p className="text-[11px] text-[#c4aa82] hidden sm:block">
                Creador de personajes D&D 5e • 100% Client-Side • Sin Servidores • Offline
              </p>
            </div>
          </div>

          {/* Center Navigation Switcher: Characters vs Compendium */}
          <div className="flex items-center p-1 rounded-xl bg-[#120a05] border border-[#8c672b]/60 shadow-inner shrink-0">
            <button
              type="button"
              onClick={() => setCurrentTab('characters')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'characters'
                  ? 'bg-gradient-to-r from-[#8c672b] to-[#b88c32] text-white shadow-xs'
                  : 'text-[#dfbe7e] hover:text-[#ffd56b]'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Mis Aventureros ({characters.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('compendium')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'compendium'
                  ? 'bg-gradient-to-r from-[#8c672b] to-[#b88c32] text-white shadow-xs'
                  : 'text-[#dfbe7e] hover:text-[#ffd56b]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#ffd56b]" />
              <span>Compendio 5e & Armería</span>
            </button>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            <button
              type="button"
              onClick={handleOpenNewCharacter}
              className="px-4 py-1.5 rounded-xl font-fantasy font-extrabold text-xs text-[#1c130b] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:brightness-110 active:scale-95 border border-[#ffe28a]"
              style={{
                background: 'linear-gradient(180deg, #f5d47a 0%, #d4a73b 50%, #9e731e 100%)',
                boxShadow: '0 2px 14px rgba(212, 167, 59, 0.45)',
              }}
            >
              <Plus className="w-4 h-4 text-[#1c130b] stroke-[3]" />
              <span>Nuevo Héroe</span>
            </button>

            <button
              type="button"
              onClick={() => setPdfImportModalOpen(true)}
              className="px-3 py-1.5 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-xl text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#8c672b]/70 shadow-sm active:scale-95"
              title="Importar una hoja oficial de personaje desde PDF editable"
            >
              <FileDown className="w-3.5 h-3.5 text-[#dfbe7e]" />
              <span className="hidden md:inline">Importar PDF</span>
            </button>

            <button
              type="button"
              onClick={() => jsonFileInputRef.current?.click()}
              className="px-3 py-1.5 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-xl text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#8c672b]/70 shadow-sm active:scale-95"
              title="Cargar archivo .json de personaje"
            >
              <Upload className="w-3.5 h-3.5 text-[#dfbe7e]" />
              <span className="hidden md:inline">Cargar JSON</span>
            </button>
            <input
              type="file"
              ref={jsonFileInputRef}
              accept=".json"
              onChange={handleJsonFileChange}
              className="hidden"
            />

            {characters.length > 0 && (
              <button
                type="button"
                onClick={exportAllJson}
                className="px-3 py-1.5 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-xl text-xs font-fantasy font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#8c672b]/70 shadow-sm active:scale-95"
                title="Descargar copia de seguridad con todos tus personajes"
              >
                <FolderDown className="w-3.5 h-3.5 text-[#dfbe7e]" />
                <span className="hidden lg:inline">Copia de Seguridad</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setUiScaleModalOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-xl text-xs font-fantasy font-bold transition flex items-center gap-1 cursor-pointer border border-[#8c672b]/70 shadow-sm active:scale-95"
              title="Ajustar tamaño de interfaz (Zoom)"
            >
              <Sliders className="w-3.5 h-3.5 text-[#dfbe7e]" />
            </button>

            <button
              type="button"
              onClick={() => setSkinModalOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#24170d] hover:bg-[#382313] text-[#dfbe7e] hover:text-[#ffd56b] rounded-xl text-xs font-fantasy font-bold transition flex items-center gap-1 cursor-pointer border border-[#8c672b]/70 shadow-sm active:scale-95"
              title="Cambiar aspecto visual / tema de color"
            >
              <Palette className="w-3.5 h-3.5 text-[#dfbe7e]" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN CONTENT DASHBOARD                                    */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {currentTab === 'characters' ? (
          <>
            {/* Banner with Community & Reddit Sharing info */}
            <div
              className="rounded-2xl p-4 sm:p-5 border border-[#8c672b]/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
              style={{
                backgroundImage: 'linear-gradient(rgba(28, 18, 11, 0.92), rgba(19, 12, 7, 0.96)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
                backgroundColor: '#1a1009',
              }}
            >
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#ffd56b]" />
                  <h2 className="font-fantasy font-bold text-sm sm:text-base text-[#f5d47a] uppercase tracking-wide">
                    Bienvenido al Creador de Personajes D&D 5e
                  </h2>
                </div>
                <p className="text-xs text-[#d1bea3] max-w-2xl leading-relaxed">
                  Forja tu héroe paso a paso con las reglas oficiales de D&D 5e: 99 trasfondos mecánicos con equipamiento y monedas exactas de Wikidot, tiradas 4d6 interactivas, cálculo automático de CA, PG, conjuros y exportación directa a la <strong>Hoja Oficial Editable en PDF</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenNewCharacter}
                  className="px-4 py-2 rounded-xl font-fantasy font-bold text-xs text-[#1c130b] bg-gradient-to-r from-[#f5d47a] to-[#d4a73b] hover:brightness-110 transition shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Swords className="w-4 h-4" />
                  <span>Forjar Nuevo Héroe</span>
                </button>
              </div>
            </div>

        {/* Character Roster */}
        {characters.length === 0 ? (
          /* Empty State: Inviting Welcome Desk */
          <div
            className="rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[#8c672b]/50 text-center space-y-5 shadow-2xl max-w-2xl mx-auto my-8"
            style={{
              backgroundImage: 'linear-gradient(rgba(24, 15, 9, 0.92), rgba(16, 10, 6, 0.95)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
              backgroundColor: '#180e07',
            }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-[#2a1b10] border-2 border-[#8c672b] flex items-center justify-center shadow-inner">
              <Scroll className="w-10 h-10 text-[#d4af37]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-fantasy font-bold text-xl sm:text-2xl text-[#f7e2a9]">
                Tu Mesa de Aventureros está Vacía
              </h3>
              <p className="text-xs sm:text-sm text-[#bda485] max-w-md mx-auto leading-relaxed">
                Aún no has forjado ningún aventurero en este navegador. Puedes crear uno nuevo desde cero con el asistente guiado de 9 pasos o probar con un héroe de muestra.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleOpenNewCharacter}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-fantasy font-extrabold text-sm text-[#1c130b] bg-gradient-to-r from-[#f5d47a] to-[#d4a73b] hover:brightness-110 shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Crear Primer Personaje</span>
              </button>

              <button
                type="button"
                onClick={handleLoadSampleHero}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-fantasy font-bold text-sm text-[#dfbe7e] hover:text-[#ffd56b] bg-[#24170d] hover:bg-[#382313] border border-[#8c672b]/70 transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#ffd56b]" />
                <span>Cargar Héroe de Ejemplo</span>
              </button>
            </div>
          </div>
        ) : (
          /* Heroes Grid */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-fantasy font-bold text-base text-[#f5d47a] uppercase tracking-wider flex items-center gap-2">
                <Scroll className="w-4 h-4 text-[#8c672b]" />
                <span>Mis Aventureros ({characters.length})</span>
              </h3>
              <span className="text-[11px] font-mono text-[#b39978]">
                Guardados automáticamente en tu navegador
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {characters.map((char) => {
                const isDraft = char.isDraft;
                return (
                  <div
                    key={char.id}
                    className="group rounded-2xl border border-[#8c672b]/60 overflow-hidden shadow-xl hover:border-[#d4af37] transition-all flex flex-col relative"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(26, 17, 10, 0.95), rgba(18, 11, 7, 0.98)), url(/assets/backgrounds/bg_mahogany_table.jpg)',
                      backgroundColor: '#1a1009',
                    }}
                  >
                    {/* Top Hero Header: Avatar + Identity */}
                    <div className="p-3.5 flex items-start gap-3 border-b border-[#8c672b]/40">
                      <div className="shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                        <FantasyAvatarFrame
                          avatarUrl={char.avatarUrl}
                          name={char.name}
                          level={char.level || 1}
                          frameStyle={char.avatarFrame || 'frame-royal-gold'}
                          size="sm"
                          showLevelBadge={true}
                          onClick={() => handleOpenSheet(char)}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => handleOpenSheet(char)}
                            className="font-fantasy font-bold text-sm text-[#f7e2a9] hover:text-[#ffd56b] truncate cursor-pointer transition"
                            title={char.name}
                          >
                            {char.name || 'Sin Nombre'}
                          </h4>
                          {isDraft && (
                            <span className="text-[9px] font-mono bg-amber-900/60 text-amber-300 px-1.5 py-0.2 rounded border border-amber-600/50 shrink-0">
                              Borrador
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#dfbe7e] font-serif truncate mt-0.5">
                          {char.race || 'Sin Raza'} • {char.class || 'Clase'} {char.subclass ? `(${char.subclass})` : ''}
                        </p>

                        <p className="text-[10px] text-[#a89072] truncate">
                          {char.background || 'Aventurero'}
                        </p>
                      </div>
                    </div>

                    {/* Vitals Ribbon */}
                    <div className="grid grid-cols-4 gap-1 p-2 bg-[#120a05]/80 text-center border-b border-[#8c672b]/40 text-[10px] font-mono">
                      <div className="p-1 rounded bg-[#1c120a] border border-[#8c672b]/30">
                        <span className="text-[#a38b6d] block text-[8.5px]">PG</span>
                        <span className="font-fantasy font-bold text-[#5ce68b] text-xs">
                          {char.currentHp !== undefined ? char.currentHp : char.maxHp || 10}
                        </span>
                      </div>
                      <div className="p-1 rounded bg-[#1c120a] border border-[#8c672b]/30">
                        <span className="text-[#a38b6d] block text-[8.5px]">CA</span>
                        <span className="font-fantasy font-bold text-[#ffd56b] text-xs">
                          {char.ac || 10}
                        </span>
                      </div>
                      <div className="p-1 rounded bg-[#1c120a] border border-[#8c672b]/30">
                        <span className="text-[#a38b6d] block text-[8.5px]">INIC</span>
                        <span className="font-fantasy font-bold text-[#7ec5ff] text-xs">
                          {(char.initiativeBonus ?? 0) >= 0 ? `+${char.initiativeBonus ?? 0}` : char.initiativeBonus}
                        </span>
                      </div>
                      <div className="p-1 rounded bg-[#1c120a] border border-[#8c672b]/30">
                        <span className="text-[#a38b6d] block text-[8.5px]">PB</span>
                        <span className="font-fantasy font-bold text-[#dfbe7e] text-xs">
                          +{Math.floor(((char.level || 1) - 1) / 4) + 2}
                        </span>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="p-2.5 space-y-1.5 flex-1 flex flex-col justify-end">
                      {/* Main Interactive Sheet Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenSheet(char)}
                        className="w-full py-1.5 px-3 rounded-lg bg-[#2a1a0e] hover:bg-[#3d2715] text-[#ffd56b] hover:text-[#fff0a8] font-fantasy font-bold text-xs border border-[#8c672b]/80 shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Scroll className="w-3.5 h-3.5 text-[#ffd56b]" />
                        <span>Abrir Hoja de Personaje</span>
                      </button>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEditInCreator(char)}
                          className="py-1 px-2 rounded-lg bg-[#1a1009] hover:bg-[#2e1c10] text-[#dfbe7e] hover:text-[#ffd56b] font-fantasy font-semibold text-[11px] border border-[#8c672b]/50 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                          title="Continuar o editar personaje en el asistente de 9 pasos"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleExportPdf(char)}
                          disabled={exportingPdfId === char.id}
                          className="py-1 px-2 rounded-lg bg-[#1a1009] hover:bg-[#2e1c10] text-[#dfbe7e] hover:text-[#ffd56b] font-fantasy font-semibold text-[11px] border border-[#8c672b]/50 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95 disabled:opacity-50"
                          title="Descargar Hoja Oficial Editable en PDF (3 páginas)"
                        >
                          <FileDown className="w-3 h-3 text-[#58a6ff]" />
                          <span>{exportingPdfId === char.id ? 'PDF...' : 'PDF'}</span>
                        </button>
                      </div>

                      {/* Secondary utilities: Duplicate, JSON, Delete */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#8c672b]/30 text-[#8c7457]">
                        <button
                          type="button"
                          onClick={() => duplicateCharacter(char.id)}
                          className="p-1 hover:text-[#ffd56b] transition rounded cursor-pointer"
                          title="Duplicar personaje"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => exportSingleJson(char)}
                          className="p-1 hover:text-[#ffd56b] transition rounded cursor-pointer"
                          title="Descargar archivo JSON individual"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        {deleteConfirmId === char.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] text-red-400 font-mono">¿Borrar?</span>
                            <button
                              type="button"
                              onClick={() => deleteCharacter(char.id)}
                              className="px-1.5 py-0.5 bg-red-900/80 hover:bg-red-800 text-white text-[9px] rounded font-bold cursor-pointer"
                            >
                              Sí
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-1.5 py-0.5 bg-[#2c1d12] hover:bg-[#3d2715] text-[#dfbe7e] text-[9px] rounded cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(char.id)}
                            className="p-1 hover:text-red-400 transition rounded cursor-pointer"
                            title="Eliminar personaje"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
          </>
        ) : (
          /* ========================================================= */
          /* COMPENDIUM 5e VIEW (STANDALONE FOR PLAYERS)               */
          /* ========================================================= */
          <div className="bg-[#fcf9f2] text-[#2c221a] rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#d8c8af] overflow-hidden">
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
      {/* FOOTER                                                    */}
      {/* ========================================================= */}
      <footer className="w-full shrink-0 py-4 px-6 border-t border-[#8c672b]/50 text-center text-[11px] text-[#a38b6d] bg-[#120a05]/90 space-y-1 font-serif">
        <p>
          MythWeaver: Forja de Héroes 5e • Software libre y gratuito para la comunidad de D&D 5e y TTRPG.
        </p>
        <p className="text-[10px] text-[#7a6448]">
          Compatible con las reglas oficiales del System Reference Document (SRD 5.1). No requiere servidores, cuentas ni contraseñas.
        </p>
      </footer>

      {/* ========================================================= */}
      {/* MODALS: CHARACTER CREATOR (9 STEPS)                       */}
      {/* ========================================================= */}
      {characterCreatorModalOpen && (
        <CharacterCreatorModal
          campaignId="standalone-forge"
          initialCharacter={creatorEditingCharacter}
          onSave={(finalChar) => {
            saveCharacter(finalChar);
            setCharacterCreatorModalOpen(false);
            setCreatorEditingCharacter(null);
            // Open the character sheet immediately after forging!
            setSheetActiveCharacter(finalChar);
          }}
          onSaveDraft={(draftChar) => {
            saveCharacter(draftChar);
            setCharacterCreatorModalOpen(false);
            setCreatorEditingCharacter(null);
          }}
          onClose={() => {
            setCharacterCreatorModalOpen(false);
            setCreatorEditingCharacter(null);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODALS: CUSTOMIZABLE CHARACTER SHEET                      */}
      {/* ========================================================= */}
      {sheetActiveCharacter && (
        <CustomizableCharacterSheetModal
          character={sheetActiveCharacter}
          onClose={() => setSheetActiveCharacter(null)}
          onUpdateCharacter={(updatedChar: Character) => {
            saveCharacter(updatedChar);
            setSheetActiveCharacter(updatedChar);
          }}
          onEditInCreator={(char: Character) => {
            setCreatorEditingCharacter(char);
            setSheetActiveCharacter(null);
            setCharacterCreatorModalOpen(true);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODALS: PDF CHARACTER IMPORT                              */}
      {/* ========================================================= */}
      {pdfImportModalOpen && (
        <PdfCharacterImportModal
          campaignId="standalone"
          onClose={() => setPdfImportModalOpen(false)}
          onImportCharacter={(importedChar: Character) => {
            saveCharacter(importedChar);
            setPdfImportModalOpen(false);
            setSheetActiveCharacter(importedChar);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODALS: UI SCALE & SKIN                                   */}
      {/* ========================================================= */}
      {uiScaleModalOpen && (
        <UiScaleConfiguratorModal
          isOpen={uiScaleModalOpen}
          onClose={() => setUiScaleModalOpen(false)}
          scale={scale}
          onSetScale={setScale}
          onResetScale={resetZoom}
        />
      )}

      {skinModalOpen && (
        <SkinSelectorModal
          isOpen={skinModalOpen}
          onClose={() => setSkinModalOpen(false)}
          currentSkin={skin}
          onSelectSkin={setSkin}
        />
      )}

      {/* ========================================================= */}
      {/* MODALS: EQUIPMENT BUILDER (CUSTOM WEAPONS & ARMORS)       */}
      {/* ========================================================= */}
      {equipmentBuilderOpen && (
        <EquipmentBuilderModal
          isOpen={equipmentBuilderOpen}
          onClose={() => setEquipmentBuilderOpen(false)}
          initialWeapon={editingWeapon}
          initialArmor={editingArmor}
          onSaveWeapon={(weapon) => {
            saveCustomWeapon(weapon);
            setEquipmentBuilderOpen(false);
          }}
          onSaveArmor={(armor) => {
            saveCustomArmor(armor);
            setEquipmentBuilderOpen(false);
          }}
        />
      )}
    </div>
  );
}
