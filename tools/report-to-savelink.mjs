#!/usr/bin/env node
/**
 * report-to-savelink — turn a "GLYPH REPORT" payload into a portable save link.
 *
 * The link's #s= hash is the exact format Glyph's applyState() decodes:
 *   base64url( JSON.stringify({ d: deckId, a: [[box, seen, correct, best], ...] }) )
 * where the array is ordered by deck-card index and best = -1 means "not yet timed".
 *
 * Usage:
 *   pbpaste | node report-to-savelink.mjs [baseUrl]
 *   echo '<GLYPH REPORT ...>' | node report-to-savelink.mjs
 */
import { readFileSync } from "node:fs";

const BASE = process.argv[2] || "https://daveremy.github.io/glyph/";

let raw = readFileSync(0, "utf8").replace(/^\s*GLYPH REPORT\s*/i, "").trim();
let rep;
try {
  rep = JSON.parse(raw);
} catch (e) {
  console.error("Could not parse report JSON:", e.message);
  process.exit(1);
}
if (!rep.cards || !Array.isArray(rep.cards)) {
  console.error("Report has no cards[] array.");
  process.exit(1);
}

const a = rep.cards.map((c) => [c.b | 0, c.n | 0, c.c | 0, c.t == null ? -1 : c.t]);
const payload = JSON.stringify({ d: rep.deck || "set-notation", a });
const b64 = Buffer.from(payload, "utf8")
  .toString("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");

console.log(BASE + "#s=" + b64);
