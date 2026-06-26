import { useEffect } from "react";

export const SITE_URL = "https://gsrestoration.net";
export const BUSINESS_NAME = "G&S Exterior Restoration LLC";
export const BUSINESS_PHONE = "+13144670332";
export const BUSINESS_PHONE_DISPLAY = "(314) 467-0332";
export const BUSINESS_EMAIL = "contact@gsrestoration.net";
export const BUSINESS_LOGO = `${SITE_URL}/images/gs-logo.png`;
export const BUSINESS_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/hero-pressure-wash-5H7By3vYupAzNxdmLxcsg7.webp";

export const SERVICE_AREAS = [
  "Mexico, MO",
  "Audrain County, MO",
  "Centralia, MO",
  "Vandalia, MO",
  "Fulton, MO",
  "Columbia, MO",
  "Kingdom City, MO",
  "Moberly, MO",
];

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  schema?: unknown | unknown[];
};

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!el) {
    el = selector.startsWith('meta[property="')
      ? document.createElement("meta")
      : selector.startsWith('link[rel="')
        ? document.createElement("link")
        : document.createElement("meta");

    if (selector.startsWith('meta[name="')) {
      el.setAttribute("name", selector.match(/meta\[name="([^"]+)"/)?.[1] ?? "");
    } else if (selector.startsWith('meta[property="')) {
      el.setAttribute("property", selector.match(/meta\[property="([^"]+)"/)?.[1] ?? "");
    } else if (selector.startsWith('link[rel="')) {
      el.setAttribute("rel", selector.match(/link\[rel="([^"]+)"/)?.[1] ?? "");
    }

    document.head.appendChild(el);
  }

  el.setAttribute(attr, value);
};

const normalizeImage = (image: string) => {
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
};

export function useSeo({ title, description, path = "/", image = BUSINESS_IMAGE, schema }: SeoOptions) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
    const imageUrl = normalizeImage(image);

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", "index, follow, max-image-preview:large");
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", imageUrl);
    setMeta('meta[property="og:site_name"]', "content", BUSINESS_NAME);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", imageUrl);

    document.head.querySelectorAll('script[data-seo-schema="true"]').forEach((el) => el.remove());
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.textContent = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, schema]);
}

export const areaServedSchema = SERVICE_AREAS.map((name) => ({
  "@type": "Place",
  name,
}));

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: BUSINESS_LOGO,
  image: BUSINESS_IMAGE,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  priceRange: "$$",
  description:
    "G&S Exterior Restoration LLC provides pressure washing, soft washing, driveway cleaning, deck cleaning, siding washing, and vehicle washing in Mexico, Missouri and surrounding Mid-Missouri communities.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mexico",
    addressRegion: "MO",
    addressCountry: "US",
  },
  areaServed: areaServedSchema,
  sameAs: [
    "https://www.facebook.com/profile.php?id=61584880772273",
    "https://instagram.com/gandrestoration",
  ],
  makesOffer: [
    "Driveway Cleaning",
    "Deck Cleaning",
    "Siding & Exterior Washing",
    "Vehicle Washing",
    "Pressure Washing",
    "Soft Washing",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      areaServed: areaServedSchema,
    },
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#localbusiness`,
  },
};

export function serviceSchema(name: string, description: string, path: string, image: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    image: normalizeImage(image),
    provider: {
      "@id": `${SITE_URL}/#localbusiness`,
    },
    areaServed: areaServedSchema,
    serviceType: name,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
