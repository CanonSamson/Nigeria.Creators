'use client'
import GoogleIcon from '@/public/icons/GoogleIcon'
import { supabaseAuthService } from '@/utils/supabase/services/auth'
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseService } from '@/utils/supabase/services'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
 

const GoogleAuthButton = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )
  const [hashTokenPresent, setHashTokenPresent] = useState(false)

  useEffect(() => {
    const check = () => {
      const h = window.location.hash || ''
      setHashTokenPresent(h.includes('access_token='))
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  const hasQueryToken = useMemo(
    () => Boolean(searchParams?.has('access_token')),
    [searchParams]
  )

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const res = await supabaseAuthService.signInWithGoogle()
      if (!res.success) {
        setErrorMessage(res.message || 'Failed to sign in with Google')
      }
    } catch {
      setErrorMessage('Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const hasToken = hasQueryToken || hashTokenPresent
    if (!hasToken) return
    const run = async () => {
      await supabaseService.client.auth.getSession()
      const user = await fetchCurrentUser({ load: false })
      if (!user) {
        setErrorMessage('Account not found. Sign in is limited to existing users.')
        return
      }
      const dest = user.role === 'BRAND' ? '/brand' : '/creator'
      router.replace(dest)
    }
    run()
  }, [hasQueryToken, hashTokenPresent, fetchCurrentUser, router])

  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className='w-auto px-5 py-[12px]  hover:opacity-80 duration-300 transition-all text-[16px] font-medium rounded-[12px]  border border-gray-200 disabled:opacity-60'
      >
        <GoogleIcon />
      </button>
      {errorMessage ? (
        <span className='text-[13px] text-red-600'>{errorMessage}</span>
      ) : null}
    </div>
  )
}

export default GoogleAuthButton
