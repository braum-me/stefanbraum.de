import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── DIY SplitText ───────────────────────────────────────────────
   Wickelt jedes Wort in <span class="split-word" style="display:
   inline-block; white-space:nowrap"> und die Buchstaben darin in
   <span class="split-char">. Browser bricht NUR an Wort-Grenzen.
   Bestehende Inline-Elemente (z.B. tailwind-Spans wie
   <span class="text-cream/55">) bleiben intakt; ihr Text wird
   genauso zerlegt. */
function splitChars(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>(".split-char"));
  }
  const collect: HTMLElement[] = [];

  const wrapWord = (word: string): HTMLElement => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "split-word";
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";
    for (const ch of word) {
      const charSpan = document.createElement("span");
      charSpan.className = "split-char";
      charSpan.textContent = ch;
      charSpan.style.display = "inline-block";
      charSpan.style.willChange = "transform, opacity";
      wordSpan.appendChild(charSpan);
      collect.push(charSpan);
    }
    return wordSpan;
  };

  const splitNode = (node: Node, target: HTMLElement) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue ?? "";
      if (text.length === 0) return;
      const frag = document.createDocumentFragment();
      // Whitespace (auch nbsp) als Trenner behandeln, dabei als Text-Node
      // erhalten, damit Browser dort umbrechen darf.
      const parts = text.split(/(\s+)/);
      for (const part of parts) {
        if (part.length === 0) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          frag.appendChild(wrapWord(part));
        }
      }
      target.replaceChild(frag, node);
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const inner = node as HTMLElement;
      const children = Array.from(inner.childNodes);
      children.forEach((c) => splitNode(c, inner));
    }
  };

  const children = Array.from(el.childNodes);
  children.forEach((c) => splitNode(c, el));
  el.dataset.split = "1";
  return collect;
}

/* ── Init ──────────────────────────────────────────────────────── */
function initAnimations(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());

  if (reduced()) {
    document.querySelectorAll<HTMLElement>(".split-char").forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    return;
  }

  /* 1. Hero title — SplitText reveal (Char-für-Char fade-up) */
  const heroTitles = document.querySelectorAll<HTMLElement>('[data-anim="hero-title"]');
  heroTitles.forEach((target) => {
    const chars = splitChars(target);
    // Parent muss sichtbar sein, GSAP animiert nur die chars innerhalb
    target.style.opacity = "1";
    if (chars.length > 0) {
      gsap.fromTo(
        chars,
        { opacity: 0, y: "0.4em" },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.022,
        },
      );
    }
  });

  /* 2. Hero group: stagger reveal aller Hero-Items (Eyebrow, Subline, CTA, Portrait) */
  document.querySelectorAll<HTMLElement>('[data-anim-group="hero"]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(
      '[data-anim="eyebrow"], [data-anim="sub"], [data-anim="meta"], [data-anim="cta"], [data-anim="portrait"]',
    );
    if (items.length === 0) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.25,
      },
    );
  });

  /* 3. Live signals strip (MicroMetrics) */
  document.querySelectorAll<HTMLElement>('[data-anim-group="meta"]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-anim="meta-cell"]');
    if (items.length === 0) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.07,
        delay: 0.6,
      },
    );
  });

  /* 4. Section titles (heading-giant) — SplitText reveal beim Eintritt in Viewport */
  const sectionTitles = document.querySelectorAll<HTMLElement>('[data-anim="section-title"]');
  sectionTitles.forEach((target) => {
    const chars = splitChars(target);
    // Parent muss sichtbar sein, GSAP animiert nur die chars innerhalb
    target.style.opacity = "1";
    if (chars.length === 0) return;
    gsap.fromTo(
      chars,
      { opacity: 0, y: "0.35em" },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.018,
        scrollTrigger: {
          trigger: target,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  /* 5. Tiles & Cards — ScrollTrigger fade-up mit Stagger */
  const tileGroups = document.querySelectorAll<HTMLElement>('[data-anim-group="tiles"]');
  tileGroups.forEach((group) => {
    const tiles = group.querySelectorAll<HTMLElement>('[data-anim="tile"]');
    if (tiles.length === 0) return;
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  /* 6. Generic fade-up sections (für Bodies / Standalone-Blocks) */
  const fadeUpEls = document.querySelectorAll<HTMLElement>('[data-anim="fade-up"]');
  fadeUpEls.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

/* Failsafe: nach 3s alle data-anim Elements sichtbar machen,
   falls JS-Fehler oder verzögerte Lazy-Init Animation blockiert. */
function failsafeReveal(): void {
  document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  });
}

/* Initial run + Astro view-transitions hook */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}
document.addEventListener("astro:page-load", initAnimations);
window.setTimeout(failsafeReveal, 3000);
