/**
 * Guard gegen vertrauliche Anbieter-/Herstellernamen im öffentlichen Inhalt.
 *
 * Die Namen selbst stehen bewusst nicht im Repository: geprüft wird gegen
 * SHA-256-Hashes einzelner, kleingeschriebener Wörter. Neue Begriffe:
 *   printf '%s' 'begriff' | sha256sum
 * Ausnahme laut Freigabe: SoSafe (darf genannt werden, daher nicht gelistet).
 */
import { createHash } from "node:crypto";

export const CONFIDENTIAL_TERM_HASHES = new Set([
  "806a7e7b173c799ef93ec90b450953651fe2d3db2468a560bb1a42fa16125ae8", // SOC-Anbieter
  "8972e3be1d252a951d8c7773212f09973399daff4c9554ce48e2702e0864a36b", // IAM-Hersteller
  "9b89025ce7a6d932b28f6e15132a70d402f723874a425e9b4c7cc3b179fa66ce", // Endpoint-Produkt
]);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

/** Liefert die gefundenen vertraulichen Wörter (als Hash-Präfix, nicht im Klartext). */
export function findConfidentialTerms(text) {
  const words = new Set(text.toLowerCase().match(/[a-z0-9äöüß]+/g) ?? []);
  const hits = [];
  for (const word of words) {
    const hash = sha256(word);
    if (CONFIDENTIAL_TERM_HASHES.has(hash)) hits.push(hash.slice(0, 12));
  }
  return hits;
}
