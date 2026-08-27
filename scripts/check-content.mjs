/**
 * Post-CMS content sanity check.
 *
 * Sveltia CMS writes straight to main, so a save that flattens a paragraph
 * array or drops a price would deploy silently. This script re-checks both
 * locales for the failure modes observed in production:
 *
 *   1. `body`/`intro` flattened by a CMS save (the old `text`-widget bug).
 *      Both locales were migrated to newline-delimited strings in parallel, so
 *      if one locale's paragraph count diverges from the other's, a save
 *      collapsed paragraphs — error.
 *   2. Price fields missing on the three service blocks.
 *   3. Block id lists drifted out of sync between `en` and `es`.
 *
 * Exit code is 1 on failure so CI can fail the build. Purely read-only.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = import.meta.dirname ? import.meta.dirname : ".";
const dir = resolve(root, "..", "src", "content", "home");

const read = (locale) =>
  JSON.parse(readFileSync(resolve(dir, `${locale}.json`), "utf8"));

const paragraphs = (value) =>
  Array.isArray(value)
    ? value
    : value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const errors = [];

const files = {
  en: read("en"),
  es: read("es"),
};

for (const [locale, data] of Object.entries(files)) {
  for (const block of data.blocks) {
    if (["bespoke", "alterations", "workshops"].includes(block.id)) {
      if (!block.price) {
        errors.push(`${locale}.blocks.${block.id}: missing "price"`);
      }
    }
  }
}

// A CMS save with the old single-line `text` schema used to collapse the
// multi-paragraph body into only its first paragraph. Both locales were
// migrated to newline-delimited strings in parallel, so if a save regresses
// one locale the paragraph counts will drift apart. Any such divergence is a
// real signal (a flattened save), unlike the raw count itself.
const enMap = Object.fromEntries(
  files.en.blocks.map((b) => [b.id, paragraphs(b.body ?? b.intro).length]),
);
const esMap = Object.fromEntries(
  files.es.blocks.map((b) => [b.id, paragraphs(b.body ?? b.intro).length]),
);

for (const id of Object.keys(enMap)) {
  if (enMap[id] !== esMap[id]) {
    errors.push(
      `blocks.${id}: paragraph count differs en=${enMap[id]} es=${esMap[id]} — possible flattened CMS save`,
    );
  }
}

const enIds = files.en.blocks.map((b) => b.id).join(",");
const esIds = files.es.blocks.map((b) => b.id).join(",");

if (enIds !== esIds) {
  errors.push(`Block id lists differ between locales:\n  en: ${enIds}\n  es: ${esIds}`);
}

for (const e of errors) {
  console.error(`error ${e}`);
}

if (errors.length) {
  console.error(`\ncheck-content: ${errors.length} error(s) — see above.`);
  process.exit(1);
}

console.log(
  `check-content: OK (${files.en.blocks.length} en blocks, ${files.es.blocks.length} es blocks)`,
);