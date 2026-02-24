import { i18n } from 'i18next';
import { Store } from 'redux';

const PUBLIC_URL_INNER: string = import.meta.env.VITE_PUBLIC_URL || '/dashboard';
export const ENV = {
  STORE: {} as Store,
  i18n: {} as i18n,
  ENV: import.meta.env.VITE_ENV || 'development',
  PUBLIC_URL: PUBLIC_URL_INNER,

  ROUTES: {
    OVERVIEW: `${PUBLIC_URL_INNER}/:partyId`,
    USERS: `${PUBLIC_URL_INNER}/:partyId/users`,
    USERS_DETAIL: `${PUBLIC_URL_INNER}/:partyId/users/:userId`,
    PRODUCT_USERS: `${PUBLIC_URL_INNER}/:partyId/:productId/users`,
    GROUPS: `${PUBLIC_URL_INNER}/:partyId/groups`,
    GROUP_DETAIL: `${PUBLIC_URL_INNER}/:partyId/groups/:groupId`,
  },

  URL_FE: {
    LOGIN: import.meta.env.VITE_URL_FE_LOGIN || '',
    LOGOUT: import.meta.env.VITE_URL_FE_LOGOUT || '',
    ONBOARDING: import.meta.env.VITE_URL_FE_ONBOARDING || '',
    LANDING: import.meta.env.VITE_URL_FE_LANDING || '',
    ASSISTANCE: import.meta.env.VITE_URL_FE_ASSISTANCE || '',
  },

  DOCUMENTATION_LINKS: {
    SELFCARE: 'https://docs.pagopa.it/area-riservata/',
    ROLES: 'https://docs.pagopa.it/area-riservata/area-riservata/ruoli',
    USERS: 'https://docs.pagopa.it/area-riservata/area-riservata/come-funziona/utenti',
    PAGOPA_EC:
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-ec/manuale-operativo-back-office-pagopa-ente-creditore/funzionalita/matrice-ruoli-funzionalita',
    PAGOPA_PSP:
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-psp/manuale-operativo-pagamenti-pagopa-prestatore-di-servizi-di-pagamento/funzionalita',
    PAGOPA_PT:
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-pt/manuale-operativo-back-office-pagopa-partner-tecnologico/funzionalita/matrice-ruoli-funzionalita',
    SEND: 'https://developer.pagopa.it/send/guides/manuale-operativo/v1.1.3/piattaforma-notifiche-digitali-manuale-operativo/mittente',
    PDND: 'https://developer.pagopa.it/pdnd-interoperabilita/guides/pdnd-manuale-operativo/manuale-operativo/guida-alladesione#aggiungere-o-rimuovere-un-operatore-amministrativo-a-pdnd-interoperabilita',
  },

  URL_API: {
    API_DASHBOARD: import.meta.env.VITE_URL_API_DASHBOARD || '',
    API_ONBOARDING_V2: import.meta.env.VITE_URL_API_ONBOARDING_V2 || '',
  },

  API_TIMEOUT_MS: {
    DASHBOARD: import.meta.env.VITE_API_DASHBOARD_TIMEOUT_MS
      ? parseInt(import.meta.env.VITE_API_DASHBOARD_TIMEOUT_MS, 10)
      : 10000,
  },

  PARTY_USERS_PAGE_SIZE: import.meta.env.VITE_PARTY_USERS_PAGE_SIZE
    ? Number.parseInt(import.meta.env.VITE_PARTY_USERS_PAGE_SIZE, 10)
    : 10,
  PARTY_PRODUCT_USERS_PAGE_SIZE: import.meta.env.VITE_PARTY_PRODUCT_USERS_PAGE_SIZE
    ? Number.parseInt(import.meta.env.VITE_PARTY_PRODUCT_USERS_PAGE_SIZE, 10)
    : 10,

  MAX_ADMIN_COUNT: import.meta.env.VITE_MAX_ADMIN_COUNT || '4',
  ENABLE_MAX_ADMIN_LIMIT: import.meta.env.VITE_ENABLE_ADMIN_LIMIT === 'true',
};
