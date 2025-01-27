import i18n from 'i18next';
import {initReactI18next,useTranslation} from 'react-i18next';
import translationEN from './en.json';
import translationSP from './sp.json';
import {Translations} from './localeTypes';

const resources = {
  en: {
    translation:translationEN,
   },
   sp: {
    translation:translationSP,
  },
};

i18n.use(initReactI18next).init({
  // compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources,
  lng: 'en', // Set initial language or use browser/user settings
  interpolation: {
    escapeValue: false,
  },
});

// Create the translate function
function translate(
  key: keyof Translations,
  options?: Record<string, any>,
): string {
  return i18n.t(key, options);
}

// Optionally, create a type-safe hook for React components

function useTypedTranslation() {
  const {t, ...rest} = useTranslation();

  const typedT = (key: keyof Translations, options?: Record<string, any>) => {
    return t(key, options);
  };

  return {t: typedT, ...rest};
}

export {translate, useTypedTranslation, i18n}; // Export both translate and the i18n instance

export default i18n;


// export default i18n;
