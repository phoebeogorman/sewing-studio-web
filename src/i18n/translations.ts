/**
 * Interface chrome: the strings that are not page content.
 *
 * Page copy lives in src/content/home/<locale>.json and is edited as content.
 * What stays here is the furniture around it — skip link, language switcher,
 * footer headings — which belongs to the shell rather than to any block.
 *
 * `Record<Locale, Translations>` means that adding a key to the interface
 * below forces both locales to supply it: a missing translation is a compile
 * error rather than an empty string in production.
 *
 * Keys are always English identifiers. Values are the product content and are
 * written in the language of their locale.
 */

export const defaultLocale = "en" as const;
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export interface Translations {
  /** Fallback metadata. Each locale's content file overrides both. */
  meta_title: string;
  meta_description: string;

  // Navigation
  nav_skip_to_content: string;
  nav_logo_alt: string;
  /** Accessible name of the in-page section nav. */
  nav_sections_label: string;
  /** Accessible labels of the mobile menu toggle. */
  nav_menu_open: string;
  nav_menu_close: string;

  // Brand
  brand_name: string;

  // Footer
  footer_tagline: string;
  footer_contact_heading: string;
  footer_follow_heading: string;
  footer_rights: string;

  // Language switcher
  language_switch_label: string;
  language_switch_text: string;

  // Carousel controls. `{title}` is replaced with the block title.
  carousel_previous: string;
  carousel_next: string;
  carousel_go_to: string;

  // Lightbox
  /** Accessible name of the fullscreen image viewer. */
  lightbox_label: string;
  /** Button label on openable images, e.g. "View {title} image". */
  lightbox_open: string;
  lightbox_close: string;
  /** Photo navigation labels for galleries, shown as arrows. */
  lightbox_previous: string;
  lightbox_next: string;
}

/**
 * Contact details.
 *
 * The studio has its own address and Instagram account, separate from the
 * Phoebe O'Gorman brand site. Locale independent, hence outside the
 * translations object.
 */
export const contact = {
  email: "phoebe@thesewing-studio.com",
  instagram: "https://www.instagram.com/the_sewing_studio___/",
  instagramHandle: "@the_sewing_studio___",
  address: "Ribble Valley, Lancashire, UK",
} as const;

export const translations: Record<Locale, Translations> = {
  en: {
    meta_title: "The Sewing Studio — Alterations, Workshops & Bespoke",
    meta_description:
      "The Sewing Studio offers alterations, sewing workshops and bespoke garment making in the Ribble Valley, Lancashire.",

    nav_skip_to_content: "Skip to content",
    nav_logo_alt: "The Sewing Studio",
    nav_sections_label: "Sections",
    nav_menu_open: "Open menu",
    nav_menu_close: "Close menu",

    brand_name: "The Sewing Studio",

    footer_tagline: "Bespoke Garments, Alterations, Workshops.",
    footer_contact_heading: "Contact",
    footer_follow_heading: "Follow",
    footer_rights: "All rights reserved.",

    language_switch_label: "Cambiar a español",
    language_switch_text: "ES",

    carousel_previous: "Previous {title} image",
    carousel_next: "Next {title} image",
    carousel_go_to: "Go to {title} image {n}",

    lightbox_label: "Image viewer",
    lightbox_open: "View {title} image",
    lightbox_close: "Close",
    lightbox_previous: "Previous image",
    lightbox_next: "Next image",
  },

  es: {
    meta_title: "The Sewing Studio — Arreglos, talleres y hecho a medida",
    meta_description:
      "The Sewing Studio ofrece arreglos de ropa, talleres de costura y confección a medida en Ribble Valley, Lancashire.",

    nav_skip_to_content: "Saltar al contenido",
    nav_logo_alt: "The Sewing Studio",
    nav_sections_label: "Secciones",
    nav_menu_open: "Abrir menú",
    nav_menu_close: "Cerrar menú",

    brand_name: "The Sewing Studio",

    footer_tagline: "Confección a medida, arreglos y talleres.",
    footer_contact_heading: "Contacto",
    footer_follow_heading: "Síguenos",
    footer_rights: "Todos los derechos reservados.",

    language_switch_label: "Switch to English",
    language_switch_text: "EN",

    carousel_previous: "Imagen anterior de {title}",
    carousel_next: "Imagen siguiente de {title}",
    carousel_go_to: "Ir a la imagen {n} de {title}",

    lightbox_label: "Visor de imagen",
    lightbox_open: "Ver imagen de {title}",
    lightbox_close: "Cerrar",
    lightbox_previous: "Imagen anterior",
    lightbox_next: "Imagen siguiente",
  },
};

export function t(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** "/" for the default locale, "/es/" otherwise. */
export function localeHomePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}
