import { getLocales,  } from 'expo-localization';

import {I18n} from 'i18n-js';
import {Translations} from './localeTypes';

const translations: Record<string, Translations> = {
  en: {
    account: 'Account',
    browse: 'Browse',
    sign_up: 'Sign up',
    login: 'Login',
    toggle_theme: 'Toggle Theme',
    email:'Email',
    password:"Password"
  },
  sp: {
    account: 'Cuenta',
    browse: 'Navegar',
    sign_up: 'Registrarse',
    login: 'Login',
    toggle_theme: 'Toggle Theme',
    email:'Email',
    password:"Password"
  },
};

const localesInformation = getLocales() || [];
const {languageCode = 'en'} =
  localesInformation.length > 0 ? localesInformation[0] : {languageCode: 'en'}; // The preferred one
const i18n = new I18n();
i18n.locale = languageCode || 'en';
i18n.translations = translations;

// Type-safe wrapper for `i18n.t()` that only allows the valid keys defined in the `Translations` type
function translate(key: keyof Translations): string {
  return i18n.t(key);
}

export {translate, i18n};

// export default i18n;
