import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Datum einer inhaltlichen Aktualisierung (JSON-LD dateModified). */
    updated: z.coerce.date().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
