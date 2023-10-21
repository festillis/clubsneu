/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  // FIREBASE
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
