/**
 * Every piece of copy on the site lives here.
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
  // Meta / SEO
  meta_title: string;
  meta_description: string;

  // Navigation
  nav_alterations: string;
  nav_workshops: string;
  nav_bespoke: string;
  nav_skip_to_content: string;
  nav_logo_alt: string;

  // Hero
  hero_kicker: string;
  hero_title: string;
  hero_intro: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

  // Services (shared labels)
  services_kicker: string;

  // Service: Alterations
  alterations_title: string;
  alterations_lead: string;
  alterations_body: string;
  alterations_image_alt: string;

  // Service: Workshops
  workshops_title: string;
  workshops_lead: string;
  workshops_body: string;
  workshops_image_alt: string;

  // Service: Bespoke
  bespoke_title: string;
  bespoke_lead: string;
  bespoke_body: string;
  bespoke_image_alt: string;

  // About
  about_kicker: string;
  about_title: string;
  about_body: string;
  about_image_alt: string;

  // Footer
  footer_tagline: string;
  footer_contact_heading: string;
  footer_follow_heading: string;
  footer_rights: string;

  // Language switcher
  language_switch_label: string;
  language_switch_text: string;
}

/**
 * Contact details.
 *
 * TODO: replace with the real details before launch.
 *
 * These are deliberately fake. The `.example` TLD is reserved by RFC 2606 and
 * can never resolve, so a message sent to one of these addresses cannot be
 * silently lost. They are locale independent, which is why they live outside
 * the translations object.
 */
export const contact = {
  email: "hello@thesewingstudio.example",
  phone: "+44 0000 000000",
  phoneHref: "tel:+440000000000",
  address: "Ribble Valley, Lancashire, UK",
  instagram: "#",
  instagramHandle: "@thesewingstudio",
} as const;

/**
 * Placeholder body copy.
 *
 * TODO: replace with the real copy before launch.
 *
 * Lorem Ipsum is used on purpose: it is unmistakably not real text, so the
 * template cannot be published by accident with invented content that reads
 * as if the studio had approved it.
 */
const lorem = {
  short:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt " +
    "sapien nec lacus dignissim, at tempor odio pulvinar.",
  medium:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut " +
    "laoreet dictum, massa nisl tempor urna, vel dignissim quam ligula quis mi. " +
    "Praesent hendrerit, sem in vulputate cursus, arcu massa vestibulum lorem, ac " +
    "vehicula justo enim in dui.",
  long:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum " +
    "sapien at lorem faucibus, non tincidunt nisl efficitur. Integer feugiat, augue " +
    "sit amet volutpat viverra, purus lorem posuere neque, eu bibendum arcu nulla " +
    "vitae felis. Donec vel tortor a nibh cursus dignissim. Nam consequat, urna eget " +
    "sollicitudin porta, dui augue vulputate mi, at lacinia justo velit nec risus.",
} as const;

export const translations: Record<Locale, Translations> = {
  en: {
    meta_title: "The Sewing Studio — Alterations, Workshops & Bespoke",
    meta_description:
      "The Sewing Studio offers alterations, sewing workshops and bespoke garment making in the Ribble Valley, Lancashire.",

    nav_alterations: "Alterations",
    nav_workshops: "Workshops",
    nav_bespoke: "Bespoke",
    nav_skip_to_content: "Skip to content",
    nav_logo_alt: "The Sewing Studio",

    hero_kicker: "Ribble Valley, Lancashire",
    hero_title: "The Sewing Studio",
    hero_intro: lorem.medium,
    hero_cta_primary: "Get in touch",
    hero_cta_secondary: "Our services",

    services_kicker: "Services",

    alterations_title: "Alterations",
    alterations_lead: lorem.short,
    alterations_body: lorem.long,
    alterations_image_alt: "",

    workshops_title: "Workshops",
    workshops_lead: lorem.short,
    workshops_body: lorem.long,
    workshops_image_alt: "",

    bespoke_title: "Bespoke",
    bespoke_lead: lorem.short,
    bespoke_body: lorem.long,
    bespoke_image_alt: "",

    about_kicker: "About",
    about_title: "A studio built on craft",
    about_body: lorem.long,
    about_image_alt: "",

    footer_tagline: "Alterations, workshops and bespoke making.",
    footer_contact_heading: "Contact",
    footer_follow_heading: "Follow",
    footer_rights: "All rights reserved.",

    language_switch_label: "Cambiar a español",
    language_switch_text: "ES",
  },

  es: {
    meta_title: "The Sewing Studio — Arreglos, talleres y hecho a medida",
    meta_description:
      "The Sewing Studio ofrece arreglos de ropa, talleres de costura y confección a medida en Ribble Valley, Lancashire.",

    nav_alterations: "Arreglos",
    nav_workshops: "Talleres",
    nav_bespoke: "A medida",
    nav_skip_to_content: "Saltar al contenido",
    nav_logo_alt: "The Sewing Studio",

    hero_kicker: "Ribble Valley, Lancashire",
    hero_title: "The Sewing Studio",
    hero_intro: lorem.medium,
    hero_cta_primary: "Contactar",
    hero_cta_secondary: "Nuestros servicios",

    services_kicker: "Servicios",

    alterations_title: "Arreglos",
    alterations_lead: lorem.short,
    alterations_body: lorem.long,
    alterations_image_alt: "",

    workshops_title: "Talleres",
    workshops_lead: lorem.short,
    workshops_body: lorem.long,
    workshops_image_alt: "",

    bespoke_title: "A medida",
    bespoke_lead: lorem.short,
    bespoke_body: lorem.long,
    bespoke_image_alt: "",

    about_kicker: "Sobre nosotras",
    about_title: "Un estudio hecho de oficio",
    about_body: lorem.long,
    about_image_alt: "",

    footer_tagline: "Arreglos, talleres y confección a medida.",
    footer_contact_heading: "Contacto",
    footer_follow_heading: "Síguenos",
    footer_rights: "Todos los derechos reservados.",

    language_switch_label: "Switch to English",
    language_switch_text: "EN",
  },
};

export function t(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

/** "" for the default locale, "/es" otherwise. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** "/" for the default locale, "/es/" otherwise. */
export function localeHomePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}
