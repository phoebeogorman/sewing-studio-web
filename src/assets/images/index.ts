/**
 * Pre-built map of every content image so Astro can optimise them at build
 * time. Vite resolves import.meta.glob eagerly at build, which means Astro
 * knows the real dimensions and generates the correct srcset without any
 * runtime work.
 *
 * Usage:
 *   import { contentImages } from "../assets/images";
 *   const img = contentImages["bg-1.webp"];   // ImageMetadata | undefined
 */

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "./*.{webp,jpg,jpeg,png,avif,WEBP,JPG,JPEG,PNG,AVIF}",
  { eager: true }
);

/**
 * Maps a bare filename ("bg-1.webp") to its Astro ImageMetadata.
 * Returns undefined for unknown filenames so callers can fail gracefully.
 */
export const contentImages: Record<string, ImageMetadata | undefined> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.replace("./", ""),
    mod.default,
  ])
);

/**
 * Resolves a JSON content path ("/images/bg-1.webp") to ImageMetadata.
 * Throws at build time if the file does not exist, making missing images
 * a build error rather than a broken <img> in production.
 */
export function resolveContentImage(src: string): ImageMetadata {
  const filename = src.replace(/^\/images\//, "");
  const meta = contentImages[filename];
  if (!meta) {
    throw new Error(
      `Content image not found: "${src}". ` +
      `Add the file to src/assets/images/ or correct the path in the content JSON.`
    );
  }
  return meta;
}
