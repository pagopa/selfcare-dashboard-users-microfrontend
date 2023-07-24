import { i18n } from 'i18next';
import it from './it';
import en from './en';
import fr from './fr';
import de from './de';
import sl from './sl';

export const configureI18n = (i18n: i18n) => {
  i18n.addResourceBundle('it', 'translation', it, true);
  i18n.addResourceBundle('en', 'translation', en, true);
  i18n.addResourceBundle('fr', 'translation', fr, true);
  i18n.addResourceBundle('de', 'translation', de, true);
  i18n.addResourceBundle('sl', 'translation', sl, true);
};
