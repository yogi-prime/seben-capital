// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://sebencapital.com";
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, "") || "https://app.sebencapital.com/api";

// Helpers
function abs(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// ---- 1) STATIC ROUTES (from your folder structure) ----
const staticPaths: Array<{ url: string; priority?: number; changefreq?: MetadataRoute.Sitemap[0]["changeFrequency"] }> = [
  // top-level
  { url: "/" , priority: 1.0, changefreq: "weekly" },
  { url: "/about", priority: 0.7, changefreq: "monthly" },
  { url: "/blog", priority: 0.9, changefreq: "daily" },

  // tools root (if you have a landing)
  { url: "/tools", priority: 0.6, changefreq: "monthly" },

  // calculators (based on your screenshot)
  { url: "/calculators", priority: 0.7, changefreq: "monthly" },
  { url: "/calculators/cagr" },
  { url: "/calculators/compounding" },
  { url: "/calculators/drawdown-recovery" },
  { url: "/calculators/options-pl" },
  { url: "/calculators/position-size" },
  { url: "/calculators/risk-reward" },
  { url: "/calculators/sip-goal" },
  { url: "/calculators/trader-metrics" },

  // courses
  { url: "/courses", priority: 0.7, changefreq: "monthly" },
  { url: "/courses/mentorship" },
  { url: "/courses/utkarsh" },

  // services
  { url: "/services", priority: 0.7, changefreq: "monthly" },
  { url: "/services/general-trading" },
  { url: "/services/portfolio-management" },
];

// ---- 2) BLOG ROUTES FROM LARAVEL (paginated) ----
type ApiPost = {
  slug: string;
  published_at?: string | null;
  updated_at?: string | null;
  status: "draft" | "scheduled" | "published" | "archived";
};

type Paginated<T> = { data: T[]; current_page: number; last_page: number };

async function fetchAllPublishedPosts(maxPages = 50, perPage = 100): Promise<ApiPost[]> {
  const out: ApiPost[] = [];
  let page = 1;

  while (page <= maxPages) {
    const qs = new URLSearchParams();
    qs.set("status", "published");
    qs.set("per_page", String(perPage));
    qs.set("page", String(page));

    const res = await fetch(`${API_BASE}/posts?${qs.toString()}`, {
      // sitemap should reflect fresh content; skip Next cache
      cache: "no-store",
      // If your API needs headers/cookies, add here.
    });

    if (!res.ok) break;

    const json = (await res.json()) as Paginated<ApiPost>;
    const rows = json?.data || [];
    out.push(...rows);

    if (json.current_page >= json.last_page) break;
    page += 1;
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1) static items
  const now = new Date();
  const items: MetadataRoute.Sitemap = staticPaths.map((r) => ({
    url: abs(r.url),
    lastModified: now,
    changeFrequency: r.changefreq || "weekly",
    priority: r.priority ?? 0.6,
  }));

  // 2) dynamic blog posts
  try {
    const posts = await fetchAllPublishedPosts();
    for (const p of posts) {
      items.push({
        url: abs(`/blog/${p.slug}`),
        lastModified: p.updated_at ? new Date(p.updated_at) : (p.published_at ? new Date(p.published_at) : now),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  } catch {
    // ignore API errors; static sitemap will still work
  }

  return items;
}
