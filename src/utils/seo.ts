import { site } from "../data/site";

export type SeoPageType = "website" | "article" | "scenario" | "tool" | "legal" | "training";

export type SeoInput = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  pageType?: SeoPageType;
  noindex?: boolean;
  publishedDate?: Date | string;
  modifiedDate?: Date | string;
};

export const defaultSeo = {
  title: site.name,
  description:
    "A practical boardroom field manual for California nonprofit directors reviewing budgets, reports, risk, minutes, and governance decisions.",
  imagePath: "/og-default.svg",
} as const;

export const staticSiteRoutes = [
  "/",
  "/working-board/",
  "/starting-a-nonprofit/",
  "/next-meeting/",
  "/money-audit/",
  "/executive-oversight/",
  "/risk-safety/",
  "/minutes-records/",
  "/articles/",
  "/scenarios/",
  "/tools/",
  "/tools/board-packet-lab/",
  "/tools/question-bank/",
  "/tools/red-flags/",
  "/tools/mature-board-self-assessment/",
  "/california-board-rules/",
  "/training/",
  "/training/board-training-program/",
  "/training/webinars/",
  "/training/in-person/",
  "/contact/",
] as const;

export function normalizePath(path = "/") {
  if (path === "") return "/";
  if (path === "/") return "/";
  const withoutHash = path.split("#")[0]?.split("?")[0] || "/";
  return withoutHash.endsWith("/") ? withoutHash : `${withoutHash}/`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function formatPageTitle(title: string = defaultSeo.title) {
  return title === site.name ? title : `${title} | ${site.name}`;
}

export function buildSeo(input: SeoInput = {}) {
  const canonicalPath = normalizePath(input.canonicalPath ?? "/");
  const title = input.title ?? defaultSeo.title;
  const description = input.description ?? defaultSeo.description;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(defaultSeo.imagePath);

  return {
    title,
    pageTitle: formatPageTitle(title),
    description,
    canonicalPath,
    canonicalUrl,
    imageUrl,
    pageType: input.pageType ?? "website",
    noindex: input.noindex ?? false,
    publishedDate: input.publishedDate ? new Date(input.publishedDate).toISOString() : undefined,
    modifiedDate: input.modifiedDate ? new Date(input.modifiedDate).toISOString() : undefined,
  };
}

export function buildJsonLd(input: ReturnType<typeof buildSeo>) {
  const organization = {
    "@type": "Organization",
    name: site.publisher,
    url: site.firmUrl,
  };

  if (input.pageType === "article" || input.pageType === "scenario" || input.pageType === "legal") {
    return {
      "@context": "https://schema.org",
      "@type": input.pageType === "legal" ? "Article" : "Article",
      headline: input.title,
      description: input.description,
      url: input.canonicalUrl,
      image: input.imageUrl,
      datePublished: input.publishedDate,
      dateModified: input.modifiedDate ?? input.publishedDate,
      author: organization,
      publisher: organization,
      mainEntityOfPage: input.canonicalUrl,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.productName,
    description: input.description,
    url: site.url,
    publisher: organization,
    inLanguage: "en-US",
  };
}

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
