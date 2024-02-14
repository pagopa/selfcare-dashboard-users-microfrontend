/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'uat' | 'production';

    REACT_APP_API_MOCK_PARTY_USERS: string;
    REACT_APP_API_MOCK_PARTY_GROUPS: string;
    REACT_APP_API_USERS_ENABLE_V2: string;
  }
}
interface Window {
  Stripe: any;
}
