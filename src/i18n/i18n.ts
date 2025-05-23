import i18n from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { browser } from '$app/environment';

// Import translations directly
import en from '$lib/i18n/locales/en.json';
import fr from '$lib/i18n/locales/fr.json';
import de from '$lib/i18n/locales/de.json';

i18n
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['navigator']
    },
    load: 'languageOnly',
    fallbackLng: 'en',
    preload: ['en', 'fr', 'de'],
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de }
    }
  });

export const i18nStore = createI18nStore(i18n);
export default i18n;