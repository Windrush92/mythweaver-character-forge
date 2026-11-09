import { useState, useEffect, useCallback } from 'react';

export type UiSkin = 'classic' | 'pathfinder-gothic' | 'dnd-beyond-dark' | 'shadowdark-grim';

export interface SkinOption {
  id: UiSkin;
  name: string;
  nameEn?: string;
  subtitle: string;
  subtitleEn?: string;
  icon: string;
  badge: string;
  badgeEn?: string;
  isAvailable: boolean;
}

export const SKIN_OPTIONS: SkinOption[] = [
  {
    id: 'pathfinder-gothic',
    name: 'Forja Mítica (Mesa Oscura)',
    nameEn: 'Mythic Forge (Dark Tabletop)',
    subtitle: 'Mesa de caoba noble, dossiers de pergamino, sellos de cera y medallones de bronce',
    subtitleEn: 'Noble mahogany tabletop, parchment dossiers, wax seals and forged bronze medallions',
    icon: '🛡️',
    badge: 'Predeterminado',
    badgeEn: 'Default',
    isAvailable: true,
  },
  {
    id: 'classic',
    name: 'Pergamino Dorado Clásico',
    nameEn: 'Classic Golden Parchment',
    subtitle: 'Diseño original con paleta suave de papel de pergamino claro',
    subtitleEn: 'Original theme with soft warm palette of light aged parchment',
    icon: '✨',
    badge: 'Clásico',
    badgeEn: 'Classic',
    isAvailable: true,
  },
  {
    id: 'dnd-beyond-dark',
    name: 'Cripta Arcana & Obsidiana',
    nameEn: 'Arcane Crypt & Obsidian',
    subtitle: 'Obsidiana profunda, runas violetas, gemas de rubí y marcos en relieve 3D',
    subtitleEn: 'Deep obsidian, violet runes, ruby gems and 3D relief frames',
    icon: '🔮',
    badge: 'En Desarrollo (WIP)',
    badgeEn: 'In Development (WIP)',
    isAvailable: false,
  },
  {
    id: 'shadowdark-grim',
    name: 'Taberna Clásica & Mazmorra',
    nameEn: 'Classic Tavern & Dungeon',
    subtitle: 'Piedra de calabozo, madera rústica a tinta, hierro forjado y antorchas',
    subtitleEn: 'Dungeon flagstones, inked rustic timber, wrought iron and torches',
    icon: '🗡️',
    badge: 'En Desarrollo (WIP)',
    badgeEn: 'In Development (WIP)',
    isAvailable: false,
  },
];

const STORAGE_KEY = 'mythweaver_ui_skin';

export function useUiSkin() {
  const [skin, setSkinState] = useState<UiSkin>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'pathfinder-gothic' || saved === 'dnd-beyond-dark' || saved === 'shadowdark-grim')) {
        return saved as UiSkin;
      }
    } catch (e) {
      console.warn('Error reading UI skin from localStorage:', e);
    }
    // Default to the new Pathfinder Gothic experience!
    return 'pathfinder-gothic';
  });

  const setSkin = useCallback((newSkin: UiSkin) => {
    setSkinState(newSkin);
    try {
      localStorage.setItem(STORAGE_KEY, newSkin);
      document.documentElement.setAttribute('data-skin', newSkin);
    } catch (e) {
      console.warn('Error saving UI skin:', e);
    }
  }, []);

  const toggleSkin = useCallback(() => {
    setSkin(skin === 'pathfinder-gothic' ? 'classic' : 'pathfinder-gothic');
  }, [skin, setSkin]);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-skin', skin);
    } catch (e) {
      // Ignore in non-browser environments
    }
  }, [skin]);

  return {
    skin,
    setSkin,
    toggleSkin,
    skinOptions: SKIN_OPTIONS,
    currentOption: SKIN_OPTIONS.find((o) => o.id === skin) || SKIN_OPTIONS[0],
  };
}
