import { useEffect } from "react";
import { SEO_ROUTES, SITE_URL, schemasForRoute } from "./seo-config";

export {
  areaServedSchema,
  BUSINESS_EMAIL,
  BUSINESS_LOGO,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  faqSchema,
  INDEXABLE_ROUTES,
  localBusinessSchema,
  SEO_ROUTES,
  serviceSchema,
  SITE_URL,
  websiteSchema,
} from "./seo-config";

type SeoOptions = {
  path?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  schema?: unknown | unknown[];
  noIndex?: boolean;
};

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  let el = document.head.querySelector(selector) as
    | HTMLMetaElement
    | HTMLLinkElement
    | null;

  if (!el) {
    el = selector.startsWith('link[rel="')
      ? document.createElement("link")
      : document.createElement("meta");

    if (selector.startsWith('meta[name="')) {
      el.setAttribute(
        "name",
        selector.match(/meta\[name="([^"]+)"/)?.[1] ?? ""
      );
    } else if (selector.startsWith('meta[property="')) {
      el.setAttribute(
        "property",
        selector.match(/meta\[property="([^"]+)"/)?.[1] ?? ""
      );
    } else if (selector.startsWith('link[rel="')) {
      el.setAttribute("rel", selector.match(/link\[rel="([^"]+)"/)?.[1] ?? "");
    }

    document.head.appendChild(el);
  }

  el.setAttribute(attr, value);
};

const removeMeta = (selector: string) => {
  document.head.querySelector(selector)?.remove();
};

const normalizeImage = (image: string) => {
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
};

export function useSeo({
  path = "/",
  title,
  description,
  image,
  imageAlt,
  schema,
  noIndex = false,
}: SeoOptions) {
  const routeSeo = SEO_ROUTES[path];
  const resolvedTitle = routeSeo?.title ?? title ?? "G&S Exterior Restoration";
  const resolvedDescription = routeSeo?.description ?? description ?? "";
  const resolvedImage = normalizeImage(
    routeSeo?.image ?? image ?? "/images/gs-logo.png"
  );
  const resolvedImageAlt =
    routeSeo?.imageAlt ?? imageAlt ?? "G&S Exterior Restoration";
  const resolvedSchema =
    schema ?? (routeSeo ? schemasForRoute(routeSeo) : undefined);

  useEffect(() => {
    const canonicalUrl = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

    document.title = resolvedTitle;
    setMeta('meta[name="description"]', "content", resolvedDescription);
    setMeta(
      'meta[name="robots"]',
      "content",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:title"]', "content", resolvedTitle);
    setMeta('meta[property="og:description"]', "content", resolvedDescription);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", resolvedImage);
    setMeta('meta[property="og:image:alt"]', "content", resolvedImageAlt);
    setMeta('meta[property="og:locale"]', "content", "en_US");
    setMeta(
      'meta[property="og:site_name"]',
      "content",
      "G&S Exterior Restoration LLC"
    );
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", resolvedTitle);
    setMeta('meta[name="twitter:description"]', "content", resolvedDescription);
    setMeta('meta[name="twitter:image"]', "content", resolvedImage);
    setMeta('meta[name="twitter:image:alt"]', "content", resolvedImageAlt);

    if (routeSeo?.imageWidth && routeSeo.imageHeight) {
      setMeta(
        'meta[property="og:image:width"]',
        "content",
        String(routeSeo.imageWidth)
      );
      setMeta(
        'meta[property="og:image:height"]',
        "content",
        String(routeSeo.imageHeight)
      );
    } else {
      removeMeta('meta[property="og:image:width"]');
      removeMeta('meta[property="og:image:height"]');
    }

    document.head
      .querySelectorAll('script[data-seo-schema="true"]')
      .forEach(el => el.remove());

    if (resolvedSchema && !noIndex) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.textContent = JSON.stringify(
        Array.isArray(resolvedSchema) ? resolvedSchema : [resolvedSchema]
      );
      document.head.appendChild(script);
    }
  }, [
    noIndex,
    path,
    resolvedDescription,
    resolvedImage,
    resolvedImageAlt,
    resolvedSchema,
    resolvedTitle,
    routeSeo?.imageHeight,
    routeSeo?.imageWidth,
  ]);
}
