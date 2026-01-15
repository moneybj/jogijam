import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.SITE_URL ?? "http://localhost:3005").replace(
    /\/$/,
    "",
  );

  const routes = [
    "/",
    "/products",
    "/subscribe",
    "/shop",
    "/our-story",
    "/cafe-partners",
    "/faq",
    "/contact",
    "/llms.txt",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}


