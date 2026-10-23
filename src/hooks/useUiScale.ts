import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'mythweaver_ui_scale_v3';
const DEFAULT_SCALE = 1.0; // 100% zoom by default as requested by user

export function useUiScale() {
  const [scale, setScaleState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.6) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading UI scale from localStorage:', e);
    }
    return DEFAULT_SCALE;
  });

  const applyScale = useCallback((newScale: number) => {
    const clamped = Math.round(Math.min(1.6, Math.max(0.5, newScale)) * 100) / 100;
    setScaleState(clamped);

    try {
      localStorage.setItem(STORAGE_KEY, String(clamped));
    } catch (e) {
      console.warn('Error saving UI scale:', e);
    }

    // 1. Electron Native Zoom
    if (window.electronAPI && typeof window.electronAPI.setZoomFactor === 'function') {
      window.electronAPI.setZoomFactor(clamped);
    }

    // 2. Browser / WebView zoom CSS
    try {
      // Clear any legacy zoom on documentElement that breaks position:fixed in Chromium
      (document.documentElement.style as any).zoom = '';
      document.documentElement.style.setProperty('--ui-scale', String(clamped));
    } catch (e) {
      console.warn('Error applying CSS zoom:', e);
    }
  }, []);

  // Initialize scale on mount
  useEffect(() => {
    applyScale(scale);
  }, []);

  // Listen for keyboard zoom shortcuts (Ctrl +, Ctrl -, Ctrl 0)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd') {
          e.preventDefault();
          applyScale(scale + 0.05);
        } else if (e.key === '-' || e.key === '_' || e.code === 'NumpadSubtract') {
          e.preventDefault();
          applyScale(scale - 0.05);
        } else if (e.key === '0' || e.code === 'Numpad0') {
          e.preventDefault();
          applyScale(DEFAULT_SCALE);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scale, applyScale]);

  return {
    scale,
    setScale: applyScale,
    zoomIn: () => applyScale(scale + 0.05),
    zoomOut: () => applyScale(scale - 0.05),
    resetZoom: () => applyScale(DEFAULT_SCALE),
  };
}
