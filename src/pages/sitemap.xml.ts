import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl, escapeXml, normalizePath, staticSiteRoutes } from "../utils/seo";

type SitemapRoute = {
  path: string;
  lastmod?: Date;
  changefreq?: "weekly" | "monthly";
  priority?: number;
};

function staticRouteMetadata(path: string): Pick<SitemapRoute, "changefreq" | "priority"> {
  return {
    changefreq: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  };
}

export const GET: APIRoute = async () => {
  const [articles, scenarios, tools, californiaRules] = await Promise.all([
    getCollection("articles", ({ data }) => !data.draft),
    getCollection("scenarios", ({ data }) => !data.draft),
    getCollection("tools", ({ data }) => !data.draft),
    getCollection("californiaRules", ({ data }) => !data.draft),
  ]);

  const reservedToolPages = new Set([
    "board-packet-lab",
    "board-question-bank",
    "board-red-flags",
    "mature-board-self-assessment",
  ]);

  const routes: SitemapRoute[] = [
    ...staticSiteRoutes.map((path) => ({
      path,
      ...staticRouteMetadata(path),
    })),
    ...articles.map((entry) => ({
      path: `/articles/${entry.id}/`,
      lastmod: entry.data.updatedDate ?? entry.data.pubDate,
      changefreq: "monthly" as const,
      priority: 0.8,
    })),
    ...scenarios.map((entry) => ({
      path: `/scenarios/${entry.id}/`,
      lastmod: entry.data.updatedDate ?? entry.data.pubDate,
      changefreq: "monthly" as const,
      priority: 0.75,
    })),
    ...tools
      .filter((entry) => !reservedToolPages.has(entry.id))
      .map((entry) => ({
        path: `/tools/${entry.id}/`,
        changefreq: "monthly" as const,
        priority: 0.7,
      })),
    ...californiaRules.map((entry) => ({
      path: `/california-board-rules/${entry.id}/`,
      changefreq: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const uniqueRoutes = Array.from(
    new Map(routes.map((route) => [normalizePath(route.path), route])).values(),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map((route) => {
    const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod.toISOString().slice(0, 10)}</lastmod>` : "";
    const changefreq = route.changefreq ? `\n    <changefreq>${route.changefreq}</changefreq>` : "";
    const priority = route.priority ? `\n    <priority>${route.priority.toFixed(1)}</priority>` : "";

    return `  <url>
    <loc>${escapeXml(absoluteUrl(route.path))}</loc>${lastmod}${changefreq}${priority}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
