// Idioma exclusivo: Español (D&D 5e / 5.5e oficial)
export type AppLanguage = 'es';

const STORAGE_KEY = 'mythweaver_app_language';

try {
  localStorage.setItem(STORAGE_KEY, 'es');
} catch {}

export function useLanguageStore() {
  return {
    language: 'es' as AppLanguage,
    isSpanish: true,
    isEnglish: false,
    setLanguage: (_lang?: any) => {},
    toggleLanguage: () => {},
    t: (es: string, _en?: string) => es,
  };
}
