import React, { useState } from 'react';
import { Character } from '../types';
import { parsePdfCharacterSheet } from '../utils/pdfCharacterReader';
import { useLanguageStore } from '../hooks/useLanguageStore';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  User,
  Shield,
  Heart,
  Zap,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

interface PdfCharacterImportModalProps {
  campaignId: string;
  onImportCharacter: (character: Character) => void;
  onClose: () => void;
}

export const PdfCharacterImportModal: React.FC<PdfCharacterImportModalProps> = ({
  campaignId,
  onImportCharacter,
  onClose,
}) => {
  const { isSpanish } = useLanguageStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedChar, setParsedChar] = useState<Character | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processPdf(file);
  };

  const processPdf = async (fileOrBuffer: File | ArrayBuffer) => {
    setLoading(true);
    setError(null);
    try {
      const char = await parsePdfCharacterSheet(fileOrBuffer, campaignId);
      setParsedChar(char);
    } catch (err) {
      console.error('Error parseando PDF:', err);
      setError(
        isSpanish
          ? 'No se pudo procesar el archivo PDF. Asegúrate de que sea una hoja de personaje válida.'
          : 'Could not process PDF file. Please ensure it is a valid 5e character sheet.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setSelectedAvatar(dataUrl);
          if (parsedChar) {
            setParsedChar({ ...parsedChar, avatarUrl: dataUrl });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!parsedChar) return;
    const finalChar: Character = {
      ...parsedChar,
      avatarUrl: selectedAvatar || customAvatarUrl || parsedChar.avatarUrl,
    };
    onImportCharacter(finalChar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#241e1a] border border-[#524334] rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-[#ece3d4]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3d3228] bg-[#1d1815]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#3e3124] text-[#d4ab59] rounded-lg border border-[#5a4835]">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold font-fantasy text-[#ebe3d5] tracking-wide">
                {isSpanish ? 'Lector de Hojas de Personaje en PDF' : 'PDF Character Sheet Importer'}
              </h2>
              <p className="text-xs text-[#a69986]">
                {isSpanish
                  ? 'Importa directamente tus archivos PDF de 5e (editables o escaneados) y extrae sus estadísticas.'
                  : 'Directly import your 5e PDF files (form-fillable or scanned) and automatically extract character stats.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a69986] hover:text-white hover:bg-[#332a22] rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Upload Zone */}
          <div className="border-2 border-dashed border-[#4d3e30] hover:border-[#c29947] bg-[#1c1815] rounded-xl p-6 text-center transition">
            <FileText className="w-12 h-12 text-[#c29947] mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-semibold text-[#ebe3d5] mb-1">
              {isSpanish
                ? 'Arrastra aquí tu Hoja de Personaje en PDF o selecciónala de tu equipo'
                : 'Drag and drop your PDF Character Sheet here or browse your device'}
            </h3>
            <p className="text-xs text-[#a69986] mb-4">
              {isSpanish
                ? 'Compatible con "Hoja de Personaje Editable.pdf", hojas oficiales de Wizards of the Coast y D&D 5e.'
                : 'Compatible with standard fillable PDF sheets, official Wizards of the Coast and D&D 5e forms.'}
            </p>

            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#8c672b] hover:bg-[#a67a33] text-white rounded-lg text-xs font-semibold shadow-md transition cursor-pointer">
              <Upload className="w-4 h-4" /> {isSpanish ? 'Seleccionar Archivo PDF' : 'Select PDF File'}
              <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
            </label>

            {loading && (
              <div className="mt-4 text-xs text-[#d4ab59] font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />{' '}
                {isSpanish ? 'Procesando y analizando campos del PDF...' : 'Parsing and extracting PDF form fields...'}
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-[#3a201f] border border-[#7a3230] rounded-lg text-xs text-[#e89b99] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#e89b99]" />
              {error}
            </div>
          )}

          {/* Parsed Result & Avatar Configuration */}
          {parsedChar && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center justify-between border-b border-[#3d3228] pb-2">
                <span className="text-xs font-bold text-[#d4ab59] uppercase tracking-wider flex items-center gap-1.5 font-fantasy">
                  <CheckCircle2 className="w-4 h-4 text-[#507a5d]" />{' '}
                  {isSpanish ? 'Datos Extraídos de la Hoja' : 'Extracted Character Data'}
                </span>
                <span className="text-xs text-[#a69986]">
                  {isSpanish
                    ? 'Revisa y asigna un avatar antes de guardar'
                    : 'Review and assign an avatar before saving'}
                </span>
              </div>

              {/* Avatar Selector Section */}
              <div className="bg-[#1c1815] p-4 rounded-xl border border-[#3d3228] space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#c29947]" />
                  <span className="text-xs font-bold text-[#ebe3d5] uppercase tracking-wide">
                    {isSpanish ? 'Avatar del Personaje' : 'Character Portrait / Avatar'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Current Avatar Circle */}
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-full border-2 border-[#c29947] shadow-xl overflow-hidden bg-[#2a221c] flex items-center justify-center">
                      {selectedAvatar || customAvatarUrl || parsedChar.avatarUrl ? (
                        <img
                          src={selectedAvatar || customAvatarUrl || parsedChar.avatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-[#7a6a57]" />
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex-1 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#a69986] block">
                        {isSpanish ? 'Avatar del personaje:' : 'Character avatar:'}
                      </span>
                      {(selectedAvatar || customAvatarUrl) && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAvatar('');
                            setCustomAvatarUrl('');
                          }}
                          className="text-[10px] text-red-400 hover:underline cursor-pointer"
                        >
                          {isSpanish ? 'Quitar avatar' : 'Remove avatar'}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <label className="px-3 py-1.5 bg-[#332a22] hover:bg-[#42372d] text-[#ece3d4] rounded border border-[#4d3f32] text-[11px] font-medium cursor-pointer transition shrink-0">
                        {isSpanish ? 'Subir Imagen Local' : 'Upload Local Image'}
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                      <span className="text-[11px] text-[#7a6a57]">{isSpanish ? 'o' : 'or'}</span>
                      <input
                        type="text"
                        placeholder={isSpanish ? "Pegar URL de imagen..." : "Paste image URL..."}
                        value={customAvatarUrl || (selectedAvatar && !selectedAvatar.startsWith('data:') ? selectedAvatar : '')}
                        onChange={(e) => {
                          setCustomAvatarUrl(e.target.value);
                          setSelectedAvatar(e.target.value);
                        }}
                        className="flex-1 bg-[#161311] border border-[#3d3228] rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Editable Quick Preview Form */}
              <div className="bg-[#1c1815] p-5 rounded-xl border border-[#3d3228] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#a69986] mb-1">
                      {isSpanish ? 'Nombre' : 'Name'}
                    </label>
                    <input
                      type="text"
                      value={parsedChar.name}
                      onChange={(e) => setParsedChar({ ...parsedChar, name: e.target.value })}
                      className="w-full bg-[#161311] border border-[#3d3228] rounded px-3 py-1.5 text-sm text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#a69986] mb-1">
                      {isSpanish ? 'Clase y Nivel' : 'Class & Level'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={parsedChar.class}
                        onChange={(e) => setParsedChar({ ...parsedChar, class: e.target.value })}
                        className="w-2/3 bg-[#161311] border border-[#3d3228] rounded px-3 py-1.5 text-xs text-white"
                      />
                      <input
                        type="number"
                        value={parsedChar.level}
                        onChange={(e) => setParsedChar({ ...parsedChar, level: parseInt(e.target.value) || 1 })}
                        className="w-1/3 bg-[#161311] border border-[#3d3228] rounded px-2 py-1.5 text-xs text-white text-center font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#a69986] mb-1">
                      {isSpanish ? 'Raza y Jugador' : 'Race & Player'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={parsedChar.race}
                        onChange={(e) => setParsedChar({ ...parsedChar, race: e.target.value })}
                        className="w-1/2 bg-[#161311] border border-[#3d3228] rounded px-2.5 py-1.5 text-xs text-white"
                        placeholder={isSpanish ? "Raza" : "Race"}
                      />
                      <input
                        type="text"
                        value={parsedChar.playerName}
                        onChange={(e) => setParsedChar({ ...parsedChar, playerName: e.target.value })}
                        className="w-1/2 bg-[#161311] border border-[#3d3228] rounded px-2.5 py-1.5 text-xs text-white"
                        placeholder={isSpanish ? "Jugador" : "Player"}
                      />
                    </div>
                  </div>
                </div>

                {/* Combat stats row */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-[#241e1a] p-2 rounded-lg border border-[#3d3228]">
                    <span className="text-[10px] text-[#657f99] font-bold block flex items-center justify-center gap-1">
                      <Shield className="w-3 h-3" /> {isSpanish ? 'Armadura' : 'Armor (AC)'}
                    </span>
                    <input
                      type="number"
                      value={parsedChar.ac}
                      onChange={(e) => setParsedChar({ ...parsedChar, ac: parseInt(e.target.value) || 10 })}
                      className="w-full text-center bg-transparent font-bold text-white text-sm"
                    />
                  </div>
                  <div className="bg-[#241e1a] p-2 rounded-lg border border-[#3d3228]">
                    <span className="text-[10px] text-[#b5524d] font-bold block flex items-center justify-center gap-1">
                      <Heart className="w-3 h-3" /> {isSpanish ? 'HP Máximo' : 'Max HP'}
                    </span>
                    <input
                      type="number"
                      value={parsedChar.maxHp}
                      onChange={(e) => setParsedChar({ ...parsedChar, maxHp: parseInt(e.target.value) || 10, currentHp: parseInt(e.target.value) || 10 })}
                      className="w-full text-center bg-transparent font-bold text-white text-sm"
                    />
                  </div>
                  <div className="bg-[#241e1a] p-2 rounded-lg border border-[#3d3228]">
                    <span className="text-[10px] text-[#9378af] font-bold block flex items-center justify-center gap-1">
                      <Zap className="w-3 h-3" /> {isSpanish ? 'Iniciativa' : 'Initiative'}
                    </span>
                    <input
                      type="number"
                      value={parsedChar.initiativeBonus}
                      onChange={(e) => setParsedChar({ ...parsedChar, initiativeBonus: parseInt(e.target.value) || 0 })}
                      className="w-full text-center bg-transparent font-bold text-white text-sm"
                    />
                  </div>
                  <div className="bg-[#241e1a] p-2 rounded-lg border border-[#3d3228]">
                    <span className="text-[10px] text-[#c29947] font-bold block">{isSpanish ? 'Velocidad' : 'Speed'}</span>
                    <input
                      type="text"
                      value={parsedChar.speed}
                      onChange={(e) => setParsedChar({ ...parsedChar, speed: e.target.value })}
                      className="w-full text-center bg-transparent font-bold text-white text-xs"
                    />
                  </div>
                </div>

                {/* Ability Scores */}
                <div>
                  <span className="text-[10px] font-bold text-[#a69986] uppercase block mb-1.5">
                    {isSpanish ? 'Puntuaciones de Característica' : 'Ability Scores'}
                  </span>
                  <div className="grid grid-cols-6 gap-2 text-center text-xs">
                    {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map((stat) => (
                      <div key={stat} className="bg-[#241e1a] p-1.5 rounded border border-[#3d3228]">
                        <span className="text-[10px] uppercase font-bold text-[#c29947] block">{stat}</span>
                        <input
                          type="number"
                          value={parsedChar.stats[stat]}
                          onChange={(e) =>
                            setParsedChar({
                              ...parsedChar,
                              stats: { ...parsedChar.stats, [stat]: parseInt(e.target.value) || 10 },
                            })
                          }
                          className="w-full text-center bg-transparent font-bold text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#3d3228] bg-[#1d1815] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-[#a69986] hover:text-white transition"
          >
            {isSpanish ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            type="button"
            disabled={!parsedChar}
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold bg-[#8c672b] hover:bg-[#a67a33] disabled:opacity-40 text-white rounded-lg shadow-lg shadow-[#402d12]/40 transition flex items-center gap-2 cursor-pointer font-fantasy"
          >
            {isSpanish ? 'Guardar en la Campaña' : 'Save to Campaign'}
          </button>
        </div>
      </div>
    </div>
  );
};
