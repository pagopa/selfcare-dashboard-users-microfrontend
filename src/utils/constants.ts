const IS_DEVELOP = process.env.NODE_ENV === 'development';

export const MOCK_USER = IS_DEVELOP;
export const LOG_REDUX_ACTIONS = IS_DEVELOP;

export const LOADING_TASK_PARTY_USERS = 'PARTY_USERS';
export const LOADING_TASK_SAVE_PARTY_USER = 'SAVE_PARTY_USER';
export const LOADING_TASK_FETCH_TAX_CODE = 'FETCH_TAX_CODE';
export const LOADING_TASK_FETCH_USER_ID = 'FETCH_USER_ID';
export const LOADING_TASK_ACTION_ON_PARTY_USER = 'ACTION_ON_PARTY_USER';
export const LOADING_TASK_UPDATE_PARTY_USER_STATUS = 'UPDATE_PARTY_USER_STATUS';
export const LOADING_TASK_DELETE_PARTY_USER = 'DELETE_PARTY_USER';
export const LOADING_TASK_FETCH_PARTY_USER = 'FETCH_PARTY_USER';
export const LOADING_TASK_FETCH_USER_REGISTRY = 'LOADING_TASK_FETCH_USER_REGISTRY';
export const LOADING_TASK_FETCH_USERS_LIST = 'LOADING_TASK_FETCH_USERs_LIST';
export const LOADING_TASK_CHECK_MANAGER = 'CHECK_MANAGER_IS_CHANGED';
export const LOADING_TASK_GET_LEGAL_REPRESENTATIVE = 'GET_LEGAL_REPRESENTATIVE';
export const LOADING_TASK_ONBOARDING_USER_WITH_LEGAL_REPRESENTATIVE =
  'ONBOARDING_USER_WITH_LEGAL_REPRESENTATIVE';
export const LOADING_TASK_GET_USER_ADMIN_COUNT = 'GET_USER_ADMIN_COUNT';

export const PRODUCT_IDS = {
  PAGOPA: 'prod-pagopa',
  PNPG: 'prod-pn-pg',
  SEND: 'prod-pn',
  IO: 'prod-io',
  INTEROP: 'prod-interop',
} as const;
