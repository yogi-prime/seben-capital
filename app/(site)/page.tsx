// app/(site)/page.tsx
import type { Metadata } from 'next'
import HomeClient from '@/components/home/HomeClient'

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

export default function Page() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Seben Capital',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    logo: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/logo.png',
    sameAs: [
      'https://www.facebook.com/','https://www.instagram.com/','https://www.linkedin.com/','https://x.com/',
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
      <HomeClient />
    </>
  )
}
