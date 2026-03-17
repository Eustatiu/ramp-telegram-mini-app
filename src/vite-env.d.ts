/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_ASSET_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const NowRampForm: {
  mount(selector: string | Element, props: Record<string, unknown>): void;
  unmount(selector: string | Element): void;
};
