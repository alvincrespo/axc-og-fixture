#!/usr/bin/env node
// Writes placeholder illustrations to src/images/og/src/<slug>.png, plus the
// site's default share image. The shapes are deterministic per slug, so
// re-running gives the same files. These stand in for the paid, model-made
// illustrations the axc-og-cards skill saves in the same place.
//
//   node scripts/make-illustrations.mjs slug-one slug-two ...
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";

const INK = "#0a0a0a";
const GREEN = "#15803d";

function rng(seed) {
  const bytes = createHash("sha256").update(seed).digest();
  let i = 0;
  return () => bytes[i++ % bytes.length] / 255;
}

function svg(slug) {
  const r = rng(slug);
  const parts = [];
  for (let n = 0; n < 5; n++) {
    const x = 120 + Math.floor(r() * 500), y = 120 + Math.floor(r() * 500);
    const w = 90 + Math.floor(r() * 260), h = 70 + Math.floor(r() * 200);
    parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="${INK}" stroke-width="3"/>`);
    if (n > 0) parts.push(`<line x1="${x}" y1="${y}" x2="${120 + Math.floor(r() * 700)}" y2="${120 + Math.floor(r() * 700)}" stroke="${INK}" stroke-width="2"/>`);
  }
  parts.push(`<circle cx="${300 + Math.floor(r() * 400)}" cy="${300 + Math.floor(r() * 400)}" r="${50 + Math.floor(r() * 60)}" fill="${GREEN}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="#ffffff"/>${parts.join("")}</svg>`;
}

mkdirSync("src/images/og/src", { recursive: true });
for (const slug of process.argv.slice(2)) {
  await sharp(Buffer.from(svg(slug))).png().toFile(`src/images/og/src/${slug}.png`);
  console.log(`wrote src/images/og/src/${slug}.png`);
}

const plain = (text) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#ffffff"/><rect x="88" y="270" width="12" height="90" fill="${GREEN}"/><text x="116" y="340" font-family="sans-serif" font-size="64" font-weight="700" fill="${INK}">${text}</text></svg>`;
await sharp(Buffer.from(plain("Fixture Site"))).jpeg().toFile("src/images/og-default.jpg");
await sharp(Buffer.from(plain("Custom share image"))).png().toFile("src/images/custom-share.png");
console.log("wrote src/images/og-default.jpg and src/images/custom-share.png");
