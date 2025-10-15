// app/(site)/blog/page.tsx
import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { API, CONFIG } from "@/lib/api";

export const revalidate = 300; // ISR 5 min

// ----- Types -----
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

// ----- Utils -----
function formatDate(d?: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
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
    image: p.featured_image ? API.img(p.featured_image) : null,
    featured: !!p.is_featured,
  }));
}

async function fetchPosts({
  page,
  q,
  category_slug,
}: {
  page: number;
  q?: string;
  category_slug?: string;
}) {
  const params = new URLSearchParams();
  params.set("status", "published");
  params.set("per_page", "12");
  params.set("page", String(page));
  if (q) params.set("q", q);
  if (category_slug) params.set("category_slug", category_slug);

  const json = await API.get<Paginated<ApiPost>>(`/posts?${params.toString()}`);
  return json;
}

// ----- Dynamic SEO (await searchParams) -----
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams; // ✅
  const q = (sp.q || "").trim();
  const category = (sp.category || "").trim();

  const baseDesc =
    "Actionable trading articles on risk management, psychology, analysis, options, and building a winning trading plan.";

  const parts: string[] = ["Seben Capital Blog"];
  if (category) parts.unshift(`Category: ${category}`);
  if (q) parts.unshift(`Search: ${q}`);

  const title = parts.join(" | ");
  const description = baseDesc;

  const canonical = new URL(CONFIG.SITE_URL);
  canonical.pathname = "/blog";
  if (q) canonical.searchParams.set("q", q);
  if (category) canonical.searchParams.set("category", category);
  if (sp.page) canonical.searchParams.set("page", sp.page);

  return {
    metadataBase: new URL(CONFIG.SITE_URL),
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
      images: [
        { url: "/og/blog.png", width: 1200, height: 630, alt: "Seben Capital Blog" },
      ],
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

// ----- Page (await searchParams) -----
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const sp = await searchParams; // ✅
  const page = Number(sp.page ?? 1);
  const q = sp.q?.trim() || undefined;
  const categorySlug = sp.category?.trim() || undefined;

  const postsResp = await fetchPosts({ page, q, category_slug: categorySlug });
  const posts = toClientPosts(postsResp.data);

  // JSON-LD
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Seben Capital Trading Blog",
    description:
      "Education on risk management, psychology, analysis, options, strategies and more.",
    url: `${CONFIG.SITE_URL}/blog`,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "Seben Capital", url: CONFIG.SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${CONFIG.SITE_URL}/blog/${p.slug}`,
      datePublished: p.isoDate,
      dateModified: p.isoDate,
      image: p.image || undefined,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${CONFIG.SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${CONFIG.SITE_URL}/blog` },
    ],
  };

  const siteSearch = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: CONFIG.SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${CONFIG.SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSearch) }}
      />
      <BlogClient posts={posts as any} />
    </>
  );
}
