import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from "../locales/ar/ar.json";
import en from "../locales/en/en.json";
import fr from "../locales/fr/fr.json";
resources = {
    en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      ar: {
        translation: ar,
      },
};
i18next
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });


export default i18next;
