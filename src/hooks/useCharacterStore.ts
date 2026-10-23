import { useState, useEffect } from 'react';
import { Character } from '../types';

const CHARACTERS_STORAGE_KEY = 'mythweaver_standalone_characters_v1';

export function useCharacterStore() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(CHARACTERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading characters from localStorage:', e);
    }
    return [];
  });

  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(characters));
    } catch (e) {
      console.error('Error saving characters to localStorage:', e);
    }
  }, [characters]);

  const saveCharacter = (char: Character) => {
    setCharacters((prev) => {
      const index = prev.findIndex((c) => c.id === char.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...char, lastSavedAt: new Date().toISOString() };
        return next;
      }
      return [{ ...char, lastSavedAt: new Date().toISOString() }, ...prev];
    });
  };

  const deleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    if (activeCharacterId === id) {
      setActiveCharacterId(null);
    }
  };

  const duplicateCharacter = (id: string): Character | null => {
    const existing = characters.find((c) => c.id === id);
    if (!existing) return null;
    const duplicated: Character = {
      ...existing,
      id: 'char-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: `${existing.name} (Copia)`,
      lastSavedAt: new Date().toISOString(),
    };
    saveCharacter(duplicated);
    return duplicated;
  };

  const importCharacters = (newChars: Character[]) => {
    setCharacters((prev) => {
      const existingIds = new Set(prev.map((c) => c.id));
      const filtered = newChars.map((c) => {
        if (existingIds.has(c.id)) {
          return {
            ...c,
            id: 'char-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
            name: `${c.name} (Importado)`,
          };
        }
        return c;
      });
      return [...filtered, ...prev];
    });
  };

  const exportAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(characters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mythweaver_heroes_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportSingleJson = (char: Character) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(char, null, 2));
    const downloadAnchor = document.createElement('a');
    const safeName = (char.name || 'Heroe').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${safeName}_dnd5e.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return {
    characters,
    activeCharacterId,
    setActiveCharacterId,
    saveCharacter,
    deleteCharacter,
    duplicateCharacter,
    importCharacters,
    exportAllJson,
    exportSingleJson,
  };
}
