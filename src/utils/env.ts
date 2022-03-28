import * as env from 'env-var';
import { Store } from 'redux';

const PUBLIC_URL_INNER: string | undefined = env.get('PUBLIC_URL').asString() || '/dashboard';
export const ENV = {
  STORE: {} as Store,
  ENV: env.get('REACT_APP_ENV').required().asString(),
  PUBLIC_URL: PUBLIC_URL_INNER,

  ROUTES: {
    OVERVIEW: `${PUBLIC_URL_INNER}/:institutionId`,
    USERS: `${PUBLIC_URL_INNER}/:institutionId/users`,
    USERS_DETAIL: `${PUBLIC_URL_INNER}/:institutionId/users/:userId`,
    PRODUCT_USERS: `${PUBLIC_URL_INNER}/:institutionId/:productId/users`,
    GROUPS: `${PUBLIC_URL_INNER}/:institutionId/groups`,
    GROUP_DETAIL: `${PUBLIC_URL_INNER}/:institutionId/groups/:groupId`,
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
