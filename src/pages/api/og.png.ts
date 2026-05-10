import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs/promises";
import path from "node:path";
import satori from "satori";

export const prerender = false;

let fontsCache: { interBold: Buffer; jbMono: Buffer } | null = null;

async function loadFonts() {
  if (fontsCache) return fontsCache;
  const fontDir = path.join(process.cwd(), "src/assets/fonts");
  const [interBold, jbMono] = await Promise.all([
    fs.readFile(path.join(fontDir, "Inter-Bold.ttf")),
    fs.readFile(path.join(fontDir, "JetBrainsMono.ttf")),
  ]);
  fontsCache = { interBold, jbMono };
  return fontsCache;
}

interface Node {
  type: string;
  props: {
    style?: Record<string, string | number>;
    children?: Node | Node[] | string | (Node | string)[];
  };
}

function div(style: Record<string, string | number>, children?: Node["props"]["children"]): Node {
  return { type: "div", props: { style, children } };
}

function span(style: Record<string, string | number>, children: string): Node {
  return { type: "span", props: { style, children } };
}

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get("title") ?? "Stefan Braum";
  const focus = url.searchParams.get("focus");

  let subtitle = url.searchParams.get("subtitle") ?? "Digitale Transformation aus der Linie, nicht aus dem Slide.";
  let metaRight = "Teamleiter IT Apps & stellv. Global Head IT/SAP";
  if (focus === "consulting") {
    subtitle = "Beratung im Mittelstand: AI, Enterprise-Architektur, IT-Strategie.";
    metaRight = "braum.consulting";
  }

  const subtitleTrim = subtitle.slice(0, 160);

  const { interBold, jbMono } = await loadFonts();

  const tree: Node = div(
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      padding: "72px",
      background: "#030F0B",
      backgroundImage:
        "radial-gradient(circle at 18% 30%, rgba(26,93,70,0.42), transparent 50%), radial-gradient(circle at 85% 15%, rgba(0,200,150,0.1), transparent 45%), radial-gradient(circle at 85% 90%, rgba(5,30,22,0.55), transparent 60%)",
      color: "#F2EFE4",
      fontFamily: "Inter",
      position: "relative",
    },
    [
      // Top row: eyebrow with mint bar
      div(
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          fontFamily: "JetBrainsMono",
          fontSize: "18px",
          letterSpacing: "4px",
          textTransform: "uppercase",
        },
        [
          div(
            {
              display: "flex",
              alignItems: "center",
              gap: "18px",
              color: "#F2EFE4",
            },
            [
              div({ width: "3px", height: "22px", background: "#00C896" }),
              span({}, "Stefan Braum · IT-Führung"),
            ],
          ),
          div(
            {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "rgba(242,239,228,0.55)",
            },
            [
              div({
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#00C896",
                boxShadow: "0 0 12px #00C896",
              }),
              span({}, "Sinntal · DE"),
            ],
          ),
        ],
      ),

      // Spacer
      div({ flex: 1 }),

      // Title (name)
      div(
        {
          fontSize: "64px",
          fontWeight: 700,
          fontFamily: "Inter",
          letterSpacing: "-2px",
          lineHeight: 1,
          color: "rgba(242,239,228,0.6)",
          display: "flex",
          marginBottom: "8px",
        },
        title,
      ),

      // Headline (claim)
      div(
        {
          fontSize: subtitleTrim.length > 90 ? "52px" : "62px",
          fontWeight: 700,
          fontFamily: "Inter",
          letterSpacing: "-2px",
          lineHeight: 1.08,
          color: "#F2EFE4",
          display: "flex",
          maxWidth: "1040px",
        },
        subtitleTrim,
      ),

      // Spacer
      div({ flex: 1 }),

      // Bottom row: meta
      div(
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          fontFamily: "JetBrainsMono",
          fontSize: "16px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(242,239,228,0.45)",
          paddingTop: "28px",
          borderTop: "1px solid rgba(47,130,100,0.35)",
        },
        [
          span({}, "stefanbraum.de"),
          span({ color: "rgba(0,200,150,0.8)" }, metaRight),
        ],
      ),
    ],
  );

  // biome-ignore lint/suspicious/noExplicitAny: satori tree shape is intentionally loose
  const svg = await satori(tree as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: interBold, weight: 700, style: "normal" },
      { name: "JetBrainsMono", data: jbMono, weight: 500, style: "normal" },
    ],
  });

  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  })
    .render()
    .asPng();

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
};
