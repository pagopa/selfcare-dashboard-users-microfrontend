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
  await i18n.changeLanguage('it');
});

afterEach(() => {
  cleanup();
});
