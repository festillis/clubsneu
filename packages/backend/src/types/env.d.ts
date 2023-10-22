declare interface EnvVars {
  // Fastify JWT Secret
  FJWT_SECRET: string;

  // AWS
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  SMTP_USER: string;
  SMPT_PASSWORD: string;
  SENDER_EMAIL: string;

  // FIREBASE ADMIN
  FIREBASE_ADMIN_TYPE: string;
  FIREBASE_ADMIN_PROJECT_ID: string;
  FIREBASE_ADMIN_PRIVATE_KEY_ID: string;
  FIREBASE_ADMIN_PRIVATE_KEY: string;
  FIREBASE_ADMIN_CLIENT_EMAIL: string;
  FIREBASE_ADMIN_CLIENT_ID: string;
  FIREBASE_ADMIN_AUTH_URI: string;
  FIREBASE_ADMIN_TOKEN_URI: string;
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: string;
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL: string;

  // Microsoft
  MICROSOFT_CLIENT_ID: string;
  MICROSOFT_TENANT_ID: string;
  MICROSOFT_CLIENT_SECRET_VALUE: string;
  MICROSOFT_CLIENT_SECRET_ID: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvVars {}
}
