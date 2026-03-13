// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import it from './locale/it';

beforeAll(async () => {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources: {
        it: { translation: it },
      },
      lng: 'it',
      fallbackLng: 'it',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  } else {
    i18n.addResourceBundle('it', 'translation', it, true, true);
    await i18n.changeLanguage('it');
  }
});