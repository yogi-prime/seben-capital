// app/api/admin/access/route.ts
import { NextResponse } from 'next/server'

const ADMIN_CODE = process.env.ADMIN_CODE || '7POM'
const COOKIE_NAME = 'admin_access'
const SIX_HOURS = 60 * 60 * 6

export async function POST(req: Request) {
  try {
    const { code } = await req.json()
    if (!code || String(code).trim() !== ADMIN_CODE) {
      return NextResponse.json({ ok: false, message: 'Invalid code' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, 'ok', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SIX_HOURS, // seconds
      path: '/admin',
    })
    return res
  } catch {
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 })
  }
}
