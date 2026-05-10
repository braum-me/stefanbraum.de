/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTACT_MAIL?: string;
  readonly UMAMI_SCRIPT_URL?: string;
  readonly UMAMI_WEBSITE_ID?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
