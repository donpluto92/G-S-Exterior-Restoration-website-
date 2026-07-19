import fs from "node:fs";
import path from "node:path";
import {
  INDEXABLE_ROUTES,
  schemasForRoute,
  SITE_URL,
  type SeoRoute,
} from "../client/src/lib/seo-config";

const outputDirectory = path.resolve(process.cwd(), "dist", "public");
const homepagePath = path.join(outputDirectory, "index.html");

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const absoluteImage = (image: string) =>
  image.startsWith("http") ? image : `${SITE_URL}${image}`;

const upsertMeta = (
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string
) => {
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${key.replaceAll(":", "\\:")}["'][^>]*>`,
    "i"
  );
  const tag = `    <meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `${tag}\n  </head>`);
};

const removeMeta = (
  html: string,
  attribute: "name" | "property",
  key: string
) =>
  html.replace(
    new RegExp(
      `\\s*<meta\\s+[^>]*${attribute}=["']${key.replaceAll(":", "\\:")}["'][^>]*>`,
      "gi"
    ),
    ""
  );

const setCanonical = (html: string, canonicalUrl: string) => {
  const tag = `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`;
  const pattern = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `${tag}\n  </head>`);
};

const renderRouteHtml = (template: string, route: SeoRoute) => {
  const canonicalUrl =
    route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  const imageUrl = absoluteImage(route.image);
  const schemaJson = JSON.stringify(schemasForRoute(route)).replaceAll(
    "<",
    "\\u003c"
  );

  let html = template
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(route.title)}</title>`
    )
    .replace(/\s*<meta\s+[^>]*name=["']keywords["'][^>]*>/gi, "")
    .replace(
      /\s*<script\s+type=["']application\/ld\+json["'][^>]*data-static-seo=["']true["'][^>]*>[\s\S]*?<\/script>/gi,
      ""
    );

  html = setCanonical(html, canonicalUrl);
  html = upsertMeta(html, "name", "description", route.description);
  html = upsertMeta(
    html,
    "name",
    "robots",
    "index, follow, max-image-preview:large"
  );
  html = upsertMeta(html, "property", "og:title", route.title);
  html = upsertMeta(html, "property", "og:description", route.description);
  html = upsertMeta(html, "property", "og:type", "website");
  html = upsertMeta(html, "property", "og:url", canonicalUrl);
  html = upsertMeta(html, "property", "og:image", imageUrl);
  html = upsertMeta(html, "property", "og:image:alt", route.imageAlt);
  html = upsertMeta(html, "property", "og:locale", "en_US");
  html = upsertMeta(
    html,
    "property",
    "og:site_name",
    "G&S Exterior Restoration LLC"
  );
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:title", route.title);
  html = upsertMeta(html, "name", "twitter:description", route.description);
  html = upsertMeta(html, "name", "twitter:image", imageUrl);
  html = upsertMeta(html, "name", "twitter:image:alt", route.imageAlt);

  if (route.imageWidth && route.imageHeight) {
    html = upsertMeta(
      html,
      "property",
      "og:image:width",
      String(route.imageWidth)
    );
    html = upsertMeta(
      html,
      "property",
      "og:image:height",
      String(route.imageHeight)
    );
  } else {
    html = removeMeta(html, "property", "og:image:width");
    html = removeMeta(html, "property", "og:image:height");
  }

  return html.replace(
    "</head>",
    `    <script type="application/ld+json" data-static-seo="true">${schemaJson}</script>\n  </head>`
  );
};

const render404Html = (template: string) => {
  let html = template
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      "<title>Page Not Found | G&S Exterior Restoration</title>"
    )
    .replace(/\s*<meta\s+[^>]*name=["']keywords["'][^>]*>/gi, "");

  html = setCanonical(html, `${SITE_URL}/404`);
  html = upsertMeta(
    html,
    "name",
    "description",
    "The requested page could not be found. Return to G&S Exterior Restoration for exterior-cleaning services and estimates."
  );
  html = upsertMeta(html, "name", "robots", "noindex, nofollow");
  return html;
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXABLE_ROUTES.map(
  route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`
).join("\n")}
</urlset>
`;

if (!fs.existsSync(homepagePath)) {
  throw new Error(`Missing Vite output at ${homepagePath}`);
}

const template = fs.readFileSync(homepagePath, "utf8");

for (const route of INDEXABLE_ROUTES) {
  const html = renderRouteHtml(template, route);
  const routeDirectory =
    route.path === "/"
      ? outputDirectory
      : path.join(outputDirectory, route.path.slice(1));

  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.writeFileSync(path.join(routeDirectory, "index.html"), html);
}

fs.writeFileSync(
  path.join(outputDirectory, "404.html"),
  render404Html(template)
);
fs.writeFileSync(path.join(outputDirectory, "sitemap.xml"), sitemap);

console.log(`Generated SEO HTML for ${INDEXABLE_ROUTES.length} routes.`);
