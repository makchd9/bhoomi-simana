import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/buyer-content";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_INDEXABLE === "true"
        ? { allow: "/" }
        : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
