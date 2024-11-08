import * as env from 'env-var';
import { Store } from 'redux';
import { i18n } from 'i18next';

const PUBLIC_URL_INNER: string | undefined = env.get('PUBLIC_URL').asString() || '/dashboard';
export const ENV = {
  STORE: {} as Store,
  i18n: {} as i18n,
  ENV: env.get('REACT_APP_ENV').required().asString(),
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
    LOGIN: env.get('REACT_APP_URL_FE_LOGIN').required().asString(),
    LOGOUT: env.get('REACT_APP_URL_FE_LOGOUT').required().asString(),
    ONBOARDING: env.get('REACT_APP_URL_FE_ONBOARDING').required().asString(),
    LANDING: env.get('REACT_APP_URL_FE_LANDING').required().asString(),
    ASSISTANCE: env.get('REACT_APP_URL_FE_ASSISTANCE').required().asString(),
  },

  DOCUMENTATION_LINKS : {
    SELFCARE: 'https://docs.pagopa.it/area-riservata/',
    USERS: 'https://docs.pagopa.it/area-riservata/area-riservata/come-funziona/utenti',
    PAGOPA_EC:
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-ec/manuale-operativo-back-office-pagopa-ente-creditore/funzionalita/matrice-ruoli-funzionalita',
    PAGOPA_PSP:
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-psp/manuale-operativo-pagamenti-pagopa-prestatore-di-servizi-di-pagamento/funzionalita',
    PAGOPA_PT:
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-pt/manuale-operativo-back-office-pagopa-partner-tecnologico/funzionalita/matrice-ruoli-funzionalita',
    SEND: 'https://docs.pagopa.it/manuale-operativo/piattaforma-notifiche-digitali-manuale-operativo/mittente',
    PDND: 'https://docs.pagopa.it/interoperabilita-1/manuale-operativo/guida-alladesione#aggiungere-o-rimuovere-un-operatore-amministrativo-a-pdnd-interoperabilita',
  },

  URL_API: {
    API_DASHBOARD: env.get('REACT_APP_URL_API_DASHBOARD').required().asString(),
    API_ONBOARDING_V2: env.get('REACT_APP_URL_API_ONBOARDING_V2').required().asString(),
  },

  API_TIMEOUT_MS: {
    DASHBOARD: env.get('REACT_APP_API_DASHBOARD_TIMEOUT_MS').required().asInt(),
  },

  USER: {
    ENABLE_USER_V2: env.get('REACT_APP_ENABLE_USER_V2').required().asBool(),
  },

  PARTY_USERS_PAGE_SIZE: env.get('REACT_APP_PARTY_USERS_PAGE_SIZE').required().asInt(),
  PARTY_PRODUCT_USERS_PAGE_SIZE: env
    .get('REACT_APP_PARTY_PRODUCT_USERS_PAGE_SIZE')
    .required()
    .asInt(),
};
