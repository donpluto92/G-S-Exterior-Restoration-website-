export const SITE_URL = "https://gsrestoration.net";
export const BUSINESS_NAME = "G&S Exterior Restoration LLC";
export const BUSINESS_PHONE = "+13144670332";
export const BUSINESS_PHONE_DISPLAY = "(314) 467-0332";
export const BUSINESS_EMAIL = "contact@gsrestoration.net";
export const BUSINESS_LOGO = `${SITE_URL}/images/gs-logo.png`;

const DRIVEWAY_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/driveway-clean-miGtpBbYzGprrMxfiHWwZF.webp";

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  kind: "home" | "service" | "business";
  serviceName?: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
  lastModified: string;
};

export const SEO_ROUTES: Record<string, SeoRoute> = {
  "/": {
    path: "/",
    title: "Exterior Cleaning in Mexico, Missouri | G&S Exterior Restoration",
    description:
      "Owner-operated exterior cleaning for siding, concrete, decks, patios, walkways, and vehicles. Based in Mexico, Missouri, with free estimates and photo quotes.",
    image: "/images/siding-growth-before-after.webp",
    imageAlt: "Before and after siding cleaning by G&S Exterior Restoration",
    imageWidth: 1371,
    imageHeight: 1148,
    kind: "home",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: "2026-07-19",
  },
  "/siding-washing": {
    path: "/siding-washing",
    title: "House & Siding Washing in Mexico, Missouri | G&S",
    description:
      "House and siding washing with lower-pressure, surface-specific methods for dirt and organic buildup. Owner-operated service based in Mexico, Missouri.",
    image: "/images/siding-growth-before-after.webp",
    imageAlt:
      "Before and after house siding washing by G&S Exterior Restoration",
    imageWidth: 1371,
    imageHeight: 1148,
    kind: "service",
    serviceName: "House & Siding Washing",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-07-19",
  },
  "/driveway-cleaning": {
    path: "/driveway-cleaning",
    title: "Driveway & Concrete Cleaning in Mexico, Missouri | G&S",
    description:
      "Driveway and concrete cleaning for dirt, organic buildup, and common surface stains. Owner-operated service based in Mexico, Missouri.",
    image: DRIVEWAY_IMAGE,
    imageAlt: "Residential driveway and concrete cleaning",
    kind: "service",
    serviceName: "Driveway & Concrete Cleaning",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-07-19",
  },
  "/deck-cleaning": {
    path: "/deck-cleaning",
    title: "Deck & Patio Cleaning in Mexico, Missouri | G&S",
    description:
      "Deck and patio cleaning for wood, composite, concrete, and other outdoor surfaces. Methods are selected for the material and current condition.",
    image: "/images/deck-cleaning-before-after.webp",
    imageAlt:
      "Before and after composite deck cleaning by G&S Exterior Restoration",
    imageWidth: 1200,
    imageHeight: 1200,
    kind: "service",
    serviceName: "Deck & Patio Cleaning",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-07-19",
  },
  "/walkway-cleaning": {
    path: "/walkway-cleaning",
    title: "Walkway Cleaning in Mexico, Missouri | G&S",
    description:
      "Walkway and sidewalk cleaning for dirt, organic buildup, and common concrete discoloration. Free estimates from owner-operated G&S Exterior Restoration.",
    image: DRIVEWAY_IMAGE,
    imageAlt: "Concrete walkway and sidewalk cleaning",
    kind: "service",
    serviceName: "Walkway & Sidewalk Cleaning",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-07-19",
  },
  "/vehicle-washing": {
    path: "/vehicle-washing",
    title: "Vehicle & Fleet Washing in Mexico, Missouri | G&S",
    description:
      "Exterior washing for cars, trucks, work vehicles, and small fleets. Mobile, owner-operated service based in Mexico, Missouri.",
    image: "/images/vehicle-wash.jpg",
    imageAlt: "Exterior vehicle washing by G&S Exterior Restoration",
    imageWidth: 1536,
    imageHeight: 1024,
    kind: "service",
    serviceName: "Vehicle & Fleet Washing",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-07-19",
  },
  "/service-areas": {
    path: "/service-areas",
    title: "Exterior Cleaning Service Area | G&S Mexico, Missouri",
    description:
      "G&S Exterior Restoration is based in Mexico, Missouri. Out-of-town project availability depends on project size, distance, and scheduling.",
    image: "/images/siding-washing-before-after.webp",
    imageAlt:
      "Before and after exterior siding cleaning by G&S Exterior Restoration",
    imageWidth: 1200,
    imageHeight: 1200,
    kind: "business",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-07-19",
  },
  "/booking": {
    path: "/booking",
    title: "Schedule an Exterior Cleaning Estimate | G&S",
    description:
      "Schedule a free on-site exterior-cleaning estimate with G&S. Based in Mexico, Missouri, with out-of-town visits available by project and schedule.",
    image: "/images/gs-logo.png",
    imageAlt: "G&S Exterior Restoration LLC logo",
    imageWidth: 1536,
    imageHeight: 1024,
    kind: "business",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-07-19",
  },
};

export const INDEXABLE_ROUTES = Object.values(SEO_ROUTES);

export const SERVICE_AREAS = ["Mexico, Missouri"];

export const areaServedSchema = SERVICE_AREAS.map(name => ({
  "@type": "Place",
  name,
}));

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: BUSINESS_NAME,
  url: `${SITE_URL}/`,
  logo: BUSINESS_LOGO,
  image: `${SITE_URL}/images/siding-growth-before-after.webp`,
  telephone: BUSINESS_PHONE,
  email: BUSINESS_EMAIL,
  foundingDate: "2026",
  description:
    "Owner-operated exterior cleaning for siding, concrete, decks, patios, walkways, and vehicles, based in Mexico, Missouri.",
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
    "House & Siding Washing",
    "Driveway & Concrete Cleaning",
    "Deck & Patio Cleaning",
    "Walkway & Sidewalk Cleaning",
    "Vehicle & Fleet Washing",
    "Soft Washing",
  ].map(name => ({
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
  alternateName: "G&S Exterior Restoration",
  url: `${SITE_URL}/`,
  publisher: {
    "@id": `${SITE_URL}/#localbusiness`,
  },
};

export function serviceSchema(
  name: string,
  description: string,
  path: string,
  image: string
) {
  const normalizedImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    image: normalizedImage,
    provider: {
      "@id": `${SITE_URL}/#localbusiness`,
    },
    areaServed: areaServedSchema,
    serviceType: name,
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
  path: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function schemasForRoute(route: SeoRoute) {
  if (route.kind === "home") {
    return [localBusinessSchema, websiteSchema];
  }

  if (route.kind === "service" && route.serviceName) {
    return [
      localBusinessSchema,
      serviceSchema(
        route.serviceName,
        route.description,
        route.path,
        route.image
      ),
    ];
  }

  return [localBusinessSchema];
}
