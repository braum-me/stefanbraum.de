import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

/**
 * Rehype-Plugin ohne Dependency: Bilder in Markdown-Posts laden nach dem ersten
 * (Hero/LCP-Kandidat) lazy, alle dekodieren asynchron. Spart Bandbreite beim Erstaufruf.
 */
function rehypeLazyImages() {
  return (tree) => {
    let index = 0;
    const visit = (node) => {
      if (node.type === "element" && node.tagName === "img") {
        node.properties = node.properties ?? {};
        node.properties.decoding ??= "async";
        if (index > 0) node.properties.loading ??= "lazy";
        index++;
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}

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
  markdown: {
    rehypePlugins: [rehypeLazyImages],
  },
  integrations: [
    sitemap({
      // Fehlerseiten gehören nicht in die Sitemap
      filter: (page) => !/\/404\/?$/.test(new URL(page).pathname),
    }),
  ],
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
    // Kleine Site: CSS inline spart render-blockierende Requests (Mobile-LCP).
    inlineStylesheets: "always",
    assets: "_astro",
  },
  image: {
    responsiveStyles: true,
  },
  experimental: {
    clientPrerender: true,
  },
});
