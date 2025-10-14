'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react'

export default function AdminAccessPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const next = sp.get('next') || '/admin'
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Invalid code')
      }
      setOk(true)
      setTimeout(() => router.replace(next), 600) // small success feedback
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-background">
      <Card className="w-full max-w-md card-elevated">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-copper-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-copper-primary" />
          </div>
          <CardTitle className="font-heading text-2xl">Admin Access</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter the access code to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input
              inputMode="text"
              pattern="[A-Za-z0-9]{4}"
              maxLength={8}
              placeholder="Enter code e.g. SHIVI"
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              className="text-center text-lg tracking-widest"
              autoFocus
            />
            {error ? (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            ) : ok ? (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Verified. Redirecting…
              </div>
            ) : null}

            <Button type="submit" className="w-full bg-gradient-copper" disabled={loading}>
              {loading ? 'Verifying…' : 'Unlock Admin'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Access expires automatically after <strong>6 hours</strong>.
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
