import * as env from 'env-var';

const PUBLIC_URL_INNER: string | undefined = env.get('PUBLIC_URL').default('/dashboard').asString();
export const ENV = {
  ENV: env.get('REACT_APP_ENV').required().asString(),
  PUBLIC_URL: PUBLIC_URL_INNER,

  ROUTES: {
    OVERVIEW: '/dashboard/:institutionId',
    USERS: `${PUBLIC_URL_INNER}/:institutionId/users`,
    PRODUCT_USERS: `${PUBLIC_URL_INNER}/:institutionId/:productId/users`,
  },

  URL_FE: {
    LOGIN: env.get('REACT_APP_URL_FE_LOGIN').required().asString(),
    LOGOUT: env.get('REACT_APP_URL_FE_LOGOUT').required().asString(),
    ONBOARDING: env.get('REACT_APP_URL_FE_ONBOARDING').required().asString(),
    LANDING: env.get('REACT_APP_URL_FE_LANDING').required().asString(),
    ASSISTANCE: env.get('REACT_APP_URL_FE_ASSISTANCE').required().asString(),
  },

  URL_API: {
    API_DASHBOARD: env.get('REACT_APP_URL_API_DASHBOARD').required().asString(),
  },

  API_TIMEOUT_MS: {
    DASHBOARD: env.get('REACT_APP_API_DASHBOARD_TIMEOUT_MS').required().asInt(),
  },

  PARTY_USERS_PAGE_SIZE: env.get('REACT_APP_PARTY_USERS_PAGE_SIZE').required().asInt(),
  PARTY_PRODUCT_USERS_PAGE_SIZE: env
    .get('REACT_APP_PARTY_PRODUCT_USERS_PAGE_SIZE')
    .required()
    .asInt(),
};
