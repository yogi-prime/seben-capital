// app/robots.ts
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://sebencapital.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow everything by default
      { userAgent: "*", allow: "/" },

      // Disallow admin and API paths on the main site
      { userAgent: "*", disallow: ["/admin", "/api", "/api/*"] },
    ],
    // IMPORTANT: absolute URL
    sitemap: [`${SITE_URL}/sitemap.xml`],
  };
}
