import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CookieOptions, createServerClient } from '@supabase/ssr'

const PUBLIC_API_PREFIXES = ['/api/creators', '/api/verify-email', '/api/payments/alatpay']

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll () {
          return req.cookies.getAll().map(c => ({
            name: c.name,
            value: c.value
          })) as { name: string; value: string }[]
        },
        setAll (
          cookiesToSet: {
            name: string
            value: string
            options: CookieOptions
          }[]
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const pathname = new URL(req.url).pathname
  const isApi = pathname.startsWith('/api')
  const isPublicApi = PUBLIC_API_PREFIXES.some(p => pathname.startsWith(p))

  if (isApi && !isPublicApi && !session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return res
}

export const config = {
  matcher: ['/api/:path*']
}
