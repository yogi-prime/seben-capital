// app/blog/page.tsx
import type { Metadata } from "next";
import BlogClient from "./BlogClient";

// ----- CONFIG -----
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://192.168.29.26:8000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://192.168.29.26:3000";
const CANONICAL_BASE = "/blog";

// Revalidate listing every 5 minutes (ISR).
export const revalidate = 300;

// ---- Types matching Laravel PostController@index minimal shape ----
type ApiPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  read_time?: string | null;
  word_count?: number | null;
  is_featured?: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  published_at?: string | null;
  author_name?: string | null;
  primaryCategory?: { name: string; slug: string } | null;
  categories?: { name: string; slug: string }[];
};

type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

// ---- Helpers ----
function formatDate(d?: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function toClientPosts(api: ApiPost[]) {
  return api.map((p) => ({
    title: p.title,
    excerpt: p.excerpt ?? "",
    author: p.author_name ?? "Seben Team",
    readTime: p.read_time ?? "",
    category: p.primaryCategory?.name ?? p.categories?.[0]?.name ?? "General",
    date: formatDate(p.published_at),
    isoDate: p.published_at ?? undefined,
    slug: p.slug,
    image: p.featured_image ?? undefined, // can be "/storage/..." or full URL
    featured: !!p.is_featured,
  }));
}

async function fetchPosts({ page, q, category_slug }: { page: number; q?: string; category_slug?: string }) {
  const params = new URLSearchParams();
  params.set("status", "published");
  params.set("per_page", "12");
  params.set("page", String(page));
  if (q) params.set("q", q);
  if (category_slug) params.set("category_slug", category_slug);

  const res = await fetch(`${API_BASE}/posts?${params.toString()}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  const data = (await res.json()) as Paginated<ApiPost>;
  return data;
}

async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`, { next: { revalidate } });
  if (!res.ok) return [];
  const json = await res.json();
  return (json?.data as { name: string; slug: string }[]) ?? [];
}

// ---- Dynamic SEO for listing ----
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; page?: string };
}): Promise<Metadata> {
  const q = (searchParams.q || "").trim();
  const category = (searchParams.category || "").trim();

  const baseDesc =
    "Actionable trading articles on risk management, psychology, analysis, options, and building a winning trading plan.";

  const parts: string[] = ["Seben Capital Blog"];
  if (category) parts.unshift(`Category: ${category}`);
  if (q) parts.unshift(`Search: ${q}`);

  const title = parts.join(" | ");
  const description = baseDesc;

  const canonical = new URL(SITE_URL);
  canonical.pathname = CANONICAL_BASE;
  if (q) canonical.searchParams.set("q", q);
  if (category) canonical.searchParams.set("category", category);
  if (searchParams.page) canonical.searchParams.set("page", searchParams.page);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | Seben Capital" },
    description,
    keywords: [
      "trading blog",
      "risk management",
      "trading psychology",
      "options strategies",
      "technical analysis",
      "fundamental analysis",
      "trading plan",
      "Seben Capital",
    ],
    alternates: {
      canonical: canonical.pathname + (canonical.search ? canonical.search : ""),
    },
    openGraph: {
      type: "website",
      url: canonical.toString(),
      title,
      description,
      siteName: "Seben Capital",
      images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: "Seben Capital Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/blog.png"],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

// ---- Page Component ----
export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const q = searchParams.q?.trim() || undefined;
  const categorySlug = searchParams.category?.trim() || undefined;

  const [postsResp] = await Promise.all([
    fetchPosts({ page, q, category_slug: categorySlug }),
    // categories are not used by the client UI right now; keeping call if you need later
    // fetchCategories(),
  ]);

  const posts = toClientPosts(postsResp.data);

  // Blog JSON-LD
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Seben Capital Trading Blog",
    description: "Education on risk management, psychology, analysis, options, strategies and more.",
    url: `${SITE_URL}${CANONICAL_BASE}`,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.isoDate,
      dateModified: p.isoDate,
      // ✅ if relative => prefix SITE_URL, otherwise keep absolute
      image: p.image ? (p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`) : undefined,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${CANONICAL_BASE}` },
    ],
  };

  const siteSearch = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSearch) }} />
      <BlogClient posts={posts as any} />
    </>
  );
}
