import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIContext } from "astro";
import { env } from "~/lib/env.ts";

export const prerender = true;

type Post = CollectionEntry<"blog">;

export async function GET(context: APIContext) {
  const all = (await getCollection("blog")) as Post[];
  const posts = all
    .filter((p) => !p.data.draft && p.data.date.valueOf() <= Date.now())
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const siteUrl =
    env("PUBLIC_SITE_URL") ?? context.site?.toString() ?? "https://stefanbraum.de";

  return rss({
    title: "Stefan Braum - Schreiben",
    description:
      "Notizen aus der Praxis: AI-Adoption, Mittelstands-IT, Compliance, Build-Notes.",
    site: siteUrl,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.excerpt,
      link: `/blog/${p.id}/`,
      categories: p.data.tags,
    })),
    customData: "<language>de-de</language>",
    stylesheet: false,
  });
}
