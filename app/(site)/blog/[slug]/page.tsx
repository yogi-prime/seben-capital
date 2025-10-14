// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://192.168.29.26:8000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://192.168.29.26:3000";

// Incremental revalidate (5 min)
export const revalidate = 300;

// ---------- Types matching Laravel showBySlug ----------
type ApiPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  author_name?: string | null;
  read_time?: string | null;
  content_html?: string | null;
  content_markdown?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  published_at?: string | null;
  primaryCategory?: { name: string; slug: string } | null;
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];

  // SEO fields from backend (preferred)
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  og_data?: { image?: string; title?: string; description?: string } | null;
  twitter_data?: { card?: string; image?: string } | null;
  schema_json?: any | null;
};

async function fetchPost(slug: string) {
  const res = await fetch(`${API_BASE}/posts/${slug}`, { next: { revalidate } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  const json = await res.json();
  return (json?.data as ApiPost) ?? null;
}

async function fetchRelated(primaryCategorySlug?: string, excludeSlug?: string) {
  const params = new URLSearchParams();
  params.set("status", "published");
  params.set("per_page", "3");
  if (primaryCategorySlug) params.set("category_slug", primaryCategorySlug);
  const res = await fetch(`${API_BASE}/posts?${params.toString()}`, { next: { revalidate } });
  if (!res.ok) return [];
  const json = await res.json();
  const rows: ApiPost[] = json?.data ?? [];
  return rows.filter((p) => p.slug !== excludeSlug).slice(0, 3);
}

function fmtDate(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function stripHtml(s: string) {
  return (s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function safeEllipsize(str: string, max: number) {
  const t = (str || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return (sp > 40 ? cut.slice(0, sp) : cut).trim() + "…";
}

function fallbackSeoTitle(p: ApiPost) {
  const base = p.title || "";
  const max = 60;
  const split = base.split(/:|–|—| - /);
  const compact = (split[0]?.length || 0) > 10 ? split[0]! : base;
  return safeEllipsize(compact, max) + " | Seben Capital";
}

function fallbackSeoDesc(p: ApiPost) {
  const max = 160;
  const source = p.excerpt || stripHtml(p.content_html || "") || stripHtml(p.content_markdown || "");
  return safeEllipsize(source, max);
}

// ------- Dynamic SEO --------
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const p = await fetchPost(params.slug);
  if (!p) {
    return {
      title: "Article Not Found | Seben Capital",
      robots: { index: false, follow: false },
    };
  }

  // prefer backend SEO; else fallback smartly
  const title = p.seo_title || fallbackSeoTitle(p);
  const description = p.seo_description || fallbackSeoDesc(p);

  const canonicalUrl = p.canonical_url || `${SITE_URL}/blog/${p.slug}`;
  const ogImg = p.og_data?.image || p.featured_image || undefined;
  const twImg = p.twitter_data?.image || ogImg;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${p.slug}`,
      title: p.og_data?.title || title,
      description: p.og_data?.description || description,
      images: ogImg ? [{ url: ogImg }] : undefined,
      siteName: "Seben Capital",
      authors: p.author_name ? [p.author_name] : undefined,
      publishedTime: p.published_at || undefined,
      tags: p.tags?.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twImg ? [twImg] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

// --------- Page (Server) ----------
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (!post) {
    // simple 404 UI
    return (
      <div className="container py-24">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="text-muted-foreground mt-2">The post you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  const related = await fetchRelated(post.primaryCategory?.slug || post.categories?.[0]?.slug, post.slug);

  // JSON-LD (prefer backend schema_json)
  const jsonLd =
    post.schema_json ||
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: safeEllipsize(post.title, 110),
      description: fallbackSeoDesc(post),
      url: `${SITE_URL}/blog/${post.slug}`,
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      image: post.featured_image ? [post.featured_image] : undefined,
      author: [{ "@type": "Person", name: post.author_name || "Seben Team" }],
      datePublished: post.published_at || undefined,
      dateModified: post.published_at || undefined,
      articleSection: post.primaryCategory?.name || post.categories?.[0]?.name || undefined,
      keywords: [
        ...(post.categories?.map((c) => c.name) || []),
        ...(post.tags?.map((t) => t.name) || []),
      ].join(", "),
    };

  const dataForClient = {
    title: post.title,
    excerpt: post.excerpt || "",
    author: post.author_name || "Seben Team",
    authorBio: "Expert trading team focused on education and risk management strategies.",
    readTime: post.read_time || "",
    category: post.primaryCategory?.name || post.categories?.[0]?.name || "General",
    date: fmtDate(post.published_at),
    slug: post.slug,
    image: post.featured_image || null,
    imageAlt: post.featured_image_alt || "",
    contentHtml: post.content_html || "",
    tags: post.tags?.map((t) => t.name) || [],
  };

  const relatedForClient = related.map((p) => ({
    title: p.title,
    excerpt: p.excerpt || "",
    slug: p.slug,
    category: p.primaryCategory?.name || p.categories?.[0]?.name || "General",
    readTime: p.read_time || "",
    date: fmtDate(p.published_at),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClient post={dataForClient} related={relatedForClient} />
    </>
  );
}
