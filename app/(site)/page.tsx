// app/(site)/page.tsx
import type { Metadata } from 'next'
import HomeClient from '@/components/home/HomeClient'
import { API } from '@/lib/api' // ⚠️ IMPORT KARNA BHOOL GAYE THE

export const metadata: Metadata = {
  title: 'Learn Trading, Mentorship & Portfolio Management',
  description:
    'Master disciplined trading with Seben Capital. Join the flagship Utkarsh course, get mentorship, and grow steadily with risk-first strategies.',
  keywords: [
    'trading course','utkarsh course','trading mentorship','portfolio management',
    'learn trading','stock market training','investment education','risk management',
  ],
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/' },
  openGraph: {
    title: 'Learn Trading, Mentorship & Portfolio Management',
    description:
      'Master disciplined trading with Seben Capital. Join the flagship Utkarsh course, get mentorship, and grow steadily with risk-first strategies.',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/',
    type: 'website',
    siteName: 'Seben Capital',
    images: [{ url: '/hero1.jpeg', width: 1200, height: 630, alt: 'Seben Capital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seben Capital — Utkarsh Trading Course & Mentorship',
    description:
      'Education-first trading with structured curriculum, live practice and accountability.',
    images: ['/hero1.jpeg'],
  },
}

// Type definition (same as before)
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

// Fetch function
async function fetchLatestPosts() {
  try {
    const params = new URLSearchParams();
    params.set("status", "published");
    params.set("per_page", "3");
    params.set("page", "1");
    params.set("sort", "published_at");
    params.set("order", "desc");

    const json = await API.get<Paginated<ApiPost>>(`/posts?${params.toString()}`);
    return json.data;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

// ✅ ASYNC BANAO PAGE COMPONENT KO
export default async function Page() {
  const posts = await fetchLatestPosts(); // ✅ Ab yeh kaam karega
  
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Seben Capital',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    logo: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/logo.png',
    sameAs: [
      'https://www.facebook.com/',
      'https://www.instagram.com/',
      'https://www.linkedin.com/',
      'https://x.com/',
    ],
  }

  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Seben Capital',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/search?q={query}',
      'query-input': 'required name=query',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      <HomeClient posts={posts} />
    </>
  )
}