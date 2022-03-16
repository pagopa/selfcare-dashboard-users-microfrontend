/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'uat' | 'production';

    REACT_APP_API_MOCK_PARTY_USERS: string;
  }
}
interface Window {
  Stripe: any;
}
