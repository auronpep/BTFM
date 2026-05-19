import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { absoluteUrl, escapeXml } from "../utils/seo";

export const GET: APIRoute = async () => {
  const [articles, scenarios] = await Promise.all([
    getCollection("articles", ({ data }) => !data.draft),
    getCollection("scenarios", ({ data }) => !data.draft),
  ]);

  const items = [
    ...articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: absoluteUrl(`/articles/${entry.id}/`),
      date: entry.data.updatedDate ?? entry.data.pubDate,
    })),
    ...scenarios.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: absoluteUrl(`/scenarios/${entry.id}/`),
      date: entry.data.updatedDate ?? entry.data.pubDate,
    })),
  ].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
${items
  .map((item) => {
    const pubDate = item.date ? `\n      <pubDate>${new Date(item.date).toUTCString()}</pubDate>` : "";

    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>${pubDate}
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
