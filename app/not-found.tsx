'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Chatbot from '@/components/Chatbot'

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', pathname)
  }, [pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-heading font-bold text-gradient-copper mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            className="bg-gradient-copper hover:scale-105 transition-transform"
            onClick={() => router.push('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>

          <div className="text-sm text-muted-foreground">
            <p>Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Link href="/courses" className="text-copper-primary hover:underline">Courses</Link>
              <span>•</span>
              <Link href="/services" className="text-copper-primary hover:underline">Services</Link>
              <span>•</span>
              <Link href="/blog" className="text-copper-primary hover:underline">Blog</Link>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  )
}
