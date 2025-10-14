// app/(admin)/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Admin' },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    'max-image-preview': 'none',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>
}
