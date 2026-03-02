// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'vitest';
import de from './locale/de';
import en from './locale/en';
import fr from './locale/fr';
import it from './locale/it';
import sl from './locale/sl';

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

beforeAll(async () => {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources: {
        it: { translation: it },
        en: { translation: en },
        fr: { translation: fr },
        de: { translation: de },
        sl: { translation: sl },
      },
      lng: 'it',
      fallbackLng: 'it',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
});

afterEach(() => {
  cleanup();
});
