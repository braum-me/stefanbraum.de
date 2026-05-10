import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  site: "https://stefanbraum.de",
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  server: {
    host: true,
    port: 5556,
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: "lightningcss",
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
  },
  image: {
    responsiveStyles: true,
  },
  experimental: {
    clientPrerender: true,
  },
});
