/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Set your Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-VQSYD4QSG7';