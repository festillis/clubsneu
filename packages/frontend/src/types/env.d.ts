/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  // BASE URL
  readonly VITE_BASE_URL: string;

  // API CLIENT
  readonly VITE_API_CLIENT_BASE_URL: string;

  // FIREBASE
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;

  // MICROSOFT
  readonly VITE_MICROSOFT_CLIENT_ID: string;
  readonly VITE_MICROSOFT_CLIENT_SECRET_VALUE: string;
  readonly VITE_MICROSOFT_CLIENT_SECRET_ID: string;
  readonly VITE_MICROSOFT_TENANT_ID: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
