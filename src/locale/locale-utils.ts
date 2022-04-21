import { i18n } from 'i18next';
import it from './it';

export const configureI18n = (i18n: i18n) => {
  i18n.addResourceBundle('it', 'translation', it, true);
};
