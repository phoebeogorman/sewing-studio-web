/**
 * Content schema for the home page.
 *
 * The page is a free-form list of blocks: each entry in `blocks` picks a
 * `type` and supplies only the fields that type declares. A discriminated
 * union keeps that honest, so an unknown type or a missing field fails the
 * build instead of rendering an empty section.
 *
 * One entry per locale, `home/en.json` and `home/es.json`, mirroring the
 * duplicated routes under src/pages. The block list is expected to stay
 * parallel between locales but is not forced to: a locale may legitimately
 * carry an extra block.
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** Background tint applied to a block, alternating down the page. */
const surface = z.enum(["page", "cream"]).default("page");

/** Which side the media column sits on in a two-column block. */
const mediaSide = z.enum(["start", "end"]).default("end");

const imageRef = z.object({
  /** Path under public/ or src/assets/images/, e.g. "/images/bg-1.webp". */
  src: z.string().transform((val) => {
    if (val.startsWith("/images/")) return val;
    if (val.startsWith("images/")) return `/${val}`;
    return `/images/${val.replace(/^\/+/, "")}`;
  }),
  /** Empty string marks the image as decorative. */
  alt: z.string().default(""),
});

/**
 * Body copy as one or more paragraphs.
 *
 * The CMS stores body copy as a single string with paragraphs separated by
 * blank lines (`text` widget), so the transform splits on those. Plain arrays
 * are still accepted for backward compatibility with older content files.
 */
const body = z
  .union([z.string(), z.array(z.string()).min(1)])
  .transform((val) =>
    Array.isArray(val)
      ? val
      : val
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter((paragraph) => paragraph.length > 0),
  );

/**
 * Price line shown after the copy, e.g. "From £20". Free text rather than a
 * number: several services are quoted per session or on application.
 */
const price = z.string().optional();

/**
 * Small label of a mailto link rendered next to the price, used when the
 * price is not a number, e.g. "Priced on application".
 */
const priceCta = z.string().optional();

/** Anchor-safe identifier: lowercase, starts with a letter, hyphens allowed. */
const blockId = z.string().transform((val) => {
  const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "");
  return clean || "section";
});

/** Full-bleed opening section: photograph behind display type. */
const heroBlock = z.object({
  type: z.literal("hero"),
  /** Defaults to "hero"; required to be unique if a second hero is added. */
  id: blockId.default("hero"),
  kicker: z.string(),
  title: z.string(),
  tagline: z.string(),
  intro: body,
  image: imageRef,
  ctaPrimaryLabel: z.string(),
  ctaSecondaryLabel: z.string(),
  /** Anchor the secondary CTA scrolls to, e.g. "#alterations". Auto-prefixes # if omitted. */
  ctaSecondaryTarget: z.string().transform((val) => {
    if (val.startsWith("#") || val.startsWith("http") || val.startsWith("mailto:") || val.startsWith("/")) {
      return val;
    }
    return `#${val}`;
  }),
});

/**
 * Label this block contributes to the navbar. Omitted or empty keeps the
 * block out of the navigation, so the nav follows the block list instead of
 * being a second, hand-maintained copy of it.
 */
const navLabel = z.string().optional();

/** Two columns: copy on one side, an image carousel on the other. */
const textMediaBlock = z.object({
  type: z.literal("text-media"),
  /** Anchor id; also builds the heading id and must be unique on the page. */
  id: blockId,
  navLabel,
  kicker: z.string(),
  title: z.string(),
  lead: z.string().optional(),
  body,
  price,
  priceCta,
  gallery: z.array(imageRef).min(1),
  mediaSide,
  surface,
  /** Show the "01", "02" counter before the kicker. */
  numbered: z.boolean().default(false),
});

/** Two columns with a single still image rather than a carousel. */
const textImageBlock = z.object({
  type: z.literal("text-image"),
  id: blockId,
  navLabel,
  kicker: z.string(),
  title: z.string(),
  body,
  image: imageRef,
  mediaSide,
  surface,
});

/** Copy only, centred, no media. */
const textBlock = z.object({
  type: z.literal("text"),
  id: blockId,
  navLabel,
  kicker: z.string().optional(),
  title: z.string(),
  body,
  surface,
});

export const blockSchema = z.discriminatedUnion("type", [
  heroBlock,
  textMediaBlock,
  textImageBlock,
  textBlock,
]);

/** Derived from the schema itself: `z` is exported as a value, not a namespace. */
export type Block = (typeof blockSchema)["_output"];
export type BlockType = Block["type"];

const home = defineCollection({
  loader: glob({ base: "src/content/home", pattern: "*.json" }),
  schema: z.object({
    /** Overrides the default title from the translations file. */
    metaTitle: z.string(),
    metaDescription: z.string(),
    blocks: z
      .array(blockSchema)
      .min(1)
      .superRefine((blocks, ctx) => {
        const seen = new Set<string>();
        blocks.forEach((block, index) => {
          if (!("id" in block)) return;
          if (seen.has(block.id)) {
            ctx.addIssue({
              code: "custom",
              message: `Duplicate block id "${block.id}"`,
              path: [index, "id"],
            });
          }
          seen.add(block.id);
        });
      }),
  }),
});

export const collections = { home };
