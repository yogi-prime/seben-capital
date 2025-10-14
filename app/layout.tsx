// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Cinzel, Inter } from 'next/font/google'

const inter  = Inter({ subsets: ['latin'],  variable: '--font-body',    display: 'swap' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  // keep root minimal; per-route groups will override
  title: { default: 'Seben Capital', template: '%s | Seben Capital' },
  description: 'Seben Capital',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable}`}>{children}</body>
    </html>
  )
}
