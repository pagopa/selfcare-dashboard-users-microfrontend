import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import 'vitest';
import './i18n-test-setup';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
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
