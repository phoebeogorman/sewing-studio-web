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
  hero_tagline: string;
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

    nav_alterations: "Alterations",
    nav_workshops: "Workshops",
    nav_bespoke: "Bespoke",
    nav_skip_to_content: "Skip to content",
    nav_logo_alt: "The Sewing Studio",

    hero_kicker: "Ribble Valley, Lancashire",
    hero_title: "The Sewing Studio",
    // Recovered from the studio's previous Wix site, extended for the new site.
    hero_tagline: "Slow luxury. Pure artistry.",
    hero_intro:
      "We champion making that outlasts trends: noble textiles, exacting " +
      "hand-finishing and garments built to be kept. From our Ribble Valley " +
      "studio we care for the clothes you already love, teach the craft " +
      "behind them, and cut one-off pieces from scratch.",
    hero_cta_primary: "Get in touch",
    hero_cta_secondary: "Our services",

    services_kicker: "Services",

    alterations_title: "Alterations",
    alterations_lead: "New life for the clothes you already love.",
    alterations_body:
      "From a simple hem to a full reshape, alterations are the quiet heart " +
      "of the studio. We take in, let out, shorten, repair and reinvent, " +
      "tailoring each garment to the person who wears it rather than to a " +
      "size label. Bring us the jacket that never quite sat right, the dress " +
      "worth saving, the trousers worn thin at the cuff: every piece is " +
      "measured, discussed and finished by hand.",
    alterations_image_alt: "",

    workshops_title: "Workshops",
    workshops_lead: "Small groups, real skills, unhurried teaching.",
    workshops_body:
      "Our workshops are hands-on sessions for beginners and improvers " +
      "alike: threading a machine, mastering seams and hems, reading a " +
      "pattern, altering your own clothes with confidence. Groups are kept " +
      "deliberately small so everyone gets the bench space and the attention " +
      "they need, and every session ends with something finished by your own " +
      "hands. Machines and tools are provided; you bring the curiosity.",
    workshops_image_alt: "",

    bespoke_title: "Bespoke",
    // Recovered from the studio's previous Wix site, extended for the new site.
    bespoke_lead:
      "A garment designed around one person, from first sketch to final fitting.",
    bespoke_body:
      "Our bespoke process is a collaborative dialogue between form and " +
      "fabric, executed with precision and a deep respect for sewing. Each " +
      "commission begins with a conversation — how you live, how you move, " +
      "what you want the piece to become — followed by measurements, toile " +
      "fittings and patient hand-work until the garment belongs to you alone.",
    bespoke_image_alt: "",

    about_kicker: "About",
    about_title: "A studio built on craft",
    // Recovered from the studio's previous Wix site, extended for the new site.
    about_body:
      "We believe in the quiet power of the slow fashion movement. Within " +
      "our studio, each garment serves as an enduring testament to " +
      "meticulous making. Our philosophy is rooted in a timeless pursuit of " +
      "perfection, where every stitch is a deliberate creative act. Whether " +
      "we are reshaping a treasured coat, guiding someone through their " +
      "first seam or cutting a pattern from scratch, the standard never " +
      "changes: take the time the work needs, and let it speak.",
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
    // Recuperado de la anterior web del estudio en Wix, ampliado para la nueva.
    hero_tagline: "Lujo pausado. Arte puro.",
    hero_intro:
      "Defendemos lo que se hace para durar: tejidos nobles, acabados a mano " +
      "exactos y prendas pensadas para conservarse. Desde nuestro estudio en " +
      "Ribble Valley cuidamos la ropa que ya quieres, enseñamos el oficio " +
      "que hay detrás y cortamos piezas únicas desde cero.",
    hero_cta_primary: "Contactar",
    hero_cta_secondary: "Nuestros servicios",

    services_kicker: "Servicios",

    alterations_title: "Arreglos",
    alterations_lead: "Nueva vida para la ropa que ya quieres.",
    alterations_body:
      "De un bajo sencillo a una remodelación completa, los arreglos son el " +
      "corazón sereno del estudio. Entallamos, ampliamos, acortamos, " +
      "reparamos y reinventamos, adaptando cada prenda a quien la lleva y no " +
      "a una etiqueta de talla. Traenos la chaqueta que nunca sentó del todo " +
      "bien, el vestido que merece salvarse, los pantalones desgastados en " +
      "el dobladillo: cada pieza se mide, se comenta y se termina a mano.",
    alterations_image_alt: "",

    workshops_title: "Talleres",
    workshops_lead: "Grupos reducidos, oficio real, enseñanza sin prisa.",
    workshops_body:
      "Nuestros talleres son sesiones prácticas tanto para quienes empiezan " +
      "como para quienes quieren mejorar: enhebrar la máquina, dominar " +
      "costuras y bajos, leer un patrón, arreglar tu propia ropa con " +
      "confianza. Los grupos se mantienen pequeños a propósito, para que " +
      "cada persona tenga su espacio y su atención, y cada sesión termina " +
      "con algo hecho por tus propias manos. Máquinas y herramientas van de " +
      "nuestra parte; la curiosidad, de la tuya.",
    workshops_image_alt: "",

    bespoke_title: "A medida",
    // Recuperado de la anterior web del estudio en Wix, ampliado para la nueva.
    bespoke_lead:
      "Una prenda diseñada para una sola persona, del primer boceto al último probador.",
    bespoke_body:
      "Nuestro proceso a medida es un diálogo entre forma y tejido, " +
      "ejecutado con precisión y un profundo respeto por la costura. Cada " +
      "encargo empieza con una conversación: cómo vives, cómo te mueves, qué " +
      "quieres que llegue a ser esa pieza; siguen las medidas, las pruebas " +
      "de patronaje y un trabajo paciente a mano hasta que la prenda es solo tuya.",
    bespoke_image_alt: "",

    about_kicker: "Sobre nosotras",
    about_title: "Un estudio hecho de oficio",
    // Recuperado de la anterior web del estudio en Wix, ampliado para la nueva.
    about_body:
      "Creemos en la fuerza serena de la moda lenta. En nuestro estudio, " +
      "cada prenda es un testimonio duradero del trabajo meticuloso. Nuestra " +
      "filosofía parte de una búsqueda atemporal de la perfección, donde cada " +
      "puntada es un acto creativo deliberado. Ya sea remodelar un abrigo " +
      "querido, acompañar a alguien en su primera costura o trazar un patrón " +
      "desde cero, el estándar nunca cambia: darle al trabajo el tiempo que " +
      "pide y dejar que hable.",
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
