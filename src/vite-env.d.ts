/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.json' {
  // JSON imports are treated as unknown to avoid `any`.
  // Consumers should narrow/cast as needed.
  const value: unknown;
  export default value;
}
