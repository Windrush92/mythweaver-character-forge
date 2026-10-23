import { useState, useEffect } from 'react';
import { Character } from '../types';
import { WeaponDef, ArmorDef } from '../data/weaponsAndArmorData';

const CHARACTERS_STORAGE_KEY = 'mythweaver_standalone_characters_v1';
const WEAPONS_STORAGE_KEY = 'mythweaver_standalone_custom_weapons_v1';
const ARMORS_STORAGE_KEY = 'mythweaver_standalone_custom_armors_v1';

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

  const [customWeapons, setCustomWeapons] = useState<WeaponDef[]>(() => {
    try {
      const saved = localStorage.getItem(WEAPONS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading custom weapons:', e);
    }
    return [];
  });

  const [customArmors, setCustomArmors] = useState<ArmorDef[]>(() => {
    try {
      const saved = localStorage.getItem(ARMORS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading custom armors:', e);
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

  useEffect(() => {
    try {
      localStorage.setItem(WEAPONS_STORAGE_KEY, JSON.stringify(customWeapons));
    } catch (e) {
      console.error('Error saving custom weapons:', e);
    }
  }, [customWeapons]);

  useEffect(() => {
    try {
      localStorage.setItem(ARMORS_STORAGE_KEY, JSON.stringify(customArmors));
    } catch (e) {
      console.error('Error saving custom armors:', e);
    }
  }, [customArmors]);

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

  const saveCustomWeapon = (weapon: WeaponDef) => {
    setCustomWeapons((prev) => {
      const idx = prev.findIndex((w) => w.id === weapon.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = weapon;
        return next;
      }
      return [...prev, weapon];
    });
  };

  const deleteCustomWeapon = (id: string) => {
    setCustomWeapons((prev) => prev.filter((w) => w.id !== id));
  };

  const saveCustomArmor = (armor: ArmorDef) => {
    setCustomArmors((prev) => {
      const idx = prev.findIndex((a) => a.id === armor.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = armor;
        return next;
      }
      return [...prev, armor];
    });
  };

  const deleteCustomArmor = (id: string) => {
    setCustomArmors((prev) => prev.filter((a) => a.id !== id));
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
    customWeapons,
    customArmors,
    saveCustomWeapon,
    deleteCustomWeapon,
    saveCustomArmor,
    deleteCustomArmor,
  };
}
