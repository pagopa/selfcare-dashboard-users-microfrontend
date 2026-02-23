/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'uat' | 'production';

    VITE_API_MOCK_PARTY_USERS: string;
    VITE_API_MOCK_PARTY_GROUPS: string;
  }
}
interface Window {
  Stripe: any;
}
