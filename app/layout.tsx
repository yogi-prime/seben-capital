// app/layout.tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Cinzel, Inter } from 'next/font/google'
import RouteLoader from '@/components/RouteLoader'   // ✅ add this

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://sebencapital.com'),
  title: {
    default: 'Seben Capital',
    template: '%s | Seben Capital',
  },
  description:
    'Education-first investing with structured trading courses, mentorship and risk-aware portfolio management.',
  keywords: [
    'Seben Capital',
    'Trading Course',
    'Utkarsh Course',
    'Trading Mentorship',
    'Portfolio Management',
    'Learn Trading India',
    'Stock Market Education',
    'Investment Strategies',
  ],
  openGraph: {
    type: 'website',
    url: 'https://sebencapital.com',
    siteName: 'Seben Capital',
    title: 'Seben Capital',
    description:
      'Education-first investing with structured trading courses, mentorship and risk-aware portfolio management.',
    images: [
      {
        url: '/hero1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Seben Capital - Trading education and mentorship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seben Capital',
    description:
      'Education-first investing with structured trading courses, mentorship and risk-aware portfolio management.',
    images: ['/hero1.jpeg'],
  },
  alternates: {
    canonical: 'https://sebencapital.com',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${cinzel.variable}`}>
        <RouteLoader />                      {/* ✅ global overlay loader */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}