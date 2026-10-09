import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mpdreamevents.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/events",
    "/expo",
    "/vendors/register",
    "/accounting",
    "/gallery",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-10-10"),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
