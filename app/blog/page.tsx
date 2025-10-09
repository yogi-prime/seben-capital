// app/blog/page.tsx
import type { Metadata } from "next";
import BlogClient from "./BlogClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CANONICAL = "/blog";
const TITLE =
  "Trading Blog & Insights | Risk Management, Psychology, Strategies | Seben Capital";
const DESCRIPTION =
  "Actionable trading articles on risk management, psychology, technical vs fundamental analysis, options strategies, and building a winning trading plan.";

// ---- Static post data (same content as your UI) ----
export const BLOG_POSTS = [
  {
    title: "Risk Management: The Foundation of Profitable Trading",
    excerpt:
      "Learn why successful traders prioritize capital preservation over profit maximization and how proper risk management can transform your trading results.",
    author: "Seben Team",
    readTime: "8 min read",
    category: "Risk Management",
    date: "Dec 15, 2024",
    isoDate: "2024-12-15",
    slug: "risk-management-foundation",
    image: "/blog-1.jpg",
    featured: true,
  },
  {
    title: "Psychology of Trading: Mastering Your Emotions",
    excerpt:
      "Understand the psychological challenges every trader faces and discover practical strategies to maintain discipline in volatile markets.",
    author: "Seben Team",
    readTime: "12 min read",
    category: "Psychology",
    date: "Dec 12, 2024",
    isoDate: "2024-12-12",
    slug: "trading-psychology",
    image: "/blog-2.jpg",
    featured: false,
  },
  {
    title: "Technical Analysis vs Fundamental Analysis: Which Approach?",
    excerpt:
      "Compare the strengths and limitations of technical and fundamental analysis, and learn how to combine both approaches effectively.",
    author: "Seben Team",
    readTime: "10 min read",
    category: "Analysis",
    date: "Dec 8, 2024",
    isoDate: "2024-12-08",
    slug: "technical-vs-fundamental",
    image: "/blog-3.jpg",
    featured: false,
  },
  {
    title: "Options Trading Strategies for Beginners",
    excerpt:
      "Discover the fundamentals of options trading and learn safe strategies to generate consistent income while managing risk.",
    author: "Seben Team",
    readTime: "15 min read",
    category: "Options",
    date: "Dec 5, 2024",
    isoDate: "2024-12-05",
    slug: "options-trading-strategies",
    image: "/blog-4.jpg",
    featured: false,
  },
  {
    title: "Building a Winning Trading Plan",
    excerpt:
      "Every successful trader has a plan. Learn how to create a comprehensive trading plan that aligns with your goals and risk tolerance.",
    author: "Seben Team",
    readTime: "11 min read",
    category: "Strategy",
    date: "Dec 1, 2024",
    isoDate: "2024-12-01",
    slug: "building-trading-plan",
    image: "/blog-5.jpg",
    featured: false,
  },
  {
    title: "Market Volatility: Your Friend or Foe?",
    excerpt:
      "Understanding market volatility is crucial for trading success. Learn how to navigate volatile markets and turn uncertainty into opportunity.",
    author: "Seben Team",
    readTime: "9 min read",
    category: "Analysis",
    date: "Nov 28, 2024",
    isoDate: "2024-11-28",
    slug: "market-volatility-guide",
    image: "/blog-6.jpg",
    featured: false,
  },
] as const;

// ---- SEO metadata ----
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
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
    canonical: CANONICAL,
    types: {
      "application/rss+xml": `${CANONICAL}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${CANONICAL}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: "Seben Capital Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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

export default function Page() {
  // Blog schema + Breadcrumbs + Site SearchAction for fast indexing/rich results
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Seben Capital Trading Blog",
    description: DESCRIPTION,
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Seben Capital",
      url: SITE_URL,
    },
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.isoDate,
      dateModified: p.isoDate,
      image: p.image ? `${SITE_URL}${p.image}` : undefined,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${CANONICAL}` },
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
      {/* Keep UI in client component */}
      <BlogClient posts={BLOG_POSTS as unknown as any[]} />
    </>
  );
}
