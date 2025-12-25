'use client'
import React, { useEffect, useMemo } from 'react'
import { createContext } from 'use-context-selector'

import { usePathname, useRouter } from 'next/navigation'
import { UserType } from '@/types/users'
import { supabaseService } from '@/utils/supabase/services'
import { toast } from 'sonner'
import { APP_DEFAULT_GUEST_PATHS } from '@/config'

export interface UserContextType {
  currentUser: UserType | null
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
  isAuthenticated: boolean | undefined
  setIsAuthenticated: (value: undefined | boolean) => void
  logout: ({ redirect }: { redirect?: boolean }) => void
  fetchCurrentUser: ({ load }: { load: boolean }) => Promise<UserType | null>
  setAllowRedirect: React.Dispatch<React.SetStateAction<boolean>>
  allowRedirect: boolean
  isOnline: boolean
  isGuestPath: boolean
}

// Create the UserContext
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  isLoading: true,
  isGuestPath: true,
  setIsLoading: () => {},
  setCurrentUser: () => {},
  isAuthenticated: undefined,
  setIsAuthenticated: () => {},
  logout: () => {},
  allowRedirect: true,
  isOnline: true,
  setAllowRedirect: () => {},
  fetchCurrentUser: async () => null
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = React.useState<UserType | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState<
    boolean | undefined
  >(undefined)
  const [isOnline, setIsOnline] = React.useState(true)

  const router = useRouter()
  const pathName = usePathname()

  const isGuestPath = useMemo(() => {
    return APP_DEFAULT_GUEST_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path?.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  useEffect(() => {
    const init = async () => {
      await fetchCurrentUser({ load: true })
    }
    const { data } = supabaseService.client.auth.onAuthStateChange(
      (_event, session) => {
        const authed = !!session?.user
        setIsAuthenticated(authed)
        if (authed) {
          const u = session!.user
          ;(async () => {
            const user = await getUser(u.id)
            if (user) {
              setCurrentUser(user)
            } else {
              setCurrentUser(null)
              toast.error(
                'Account not found. Sign in is limited to existing users.'
              )

              await logout({
                redirect: !isGuestPath,
                redirectionPath: '/login'
              })
            }
          })()
        } else {
          setCurrentUser(null)
        }
      }
    )
    init()
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const fetchCurrentUser = async ({ load = true }: { load: boolean }) => {
    try {
      if (load) setIsLoading(true)
      const {
        data: { session }
      } = await supabaseService.client.auth.getSession()
      if (!session?.user) {
        setIsAuthenticated(false)
        setCurrentUser(null)
        return null
      }
      const u = session.user
      const user = await getUser(u.id)
      if (!user) {
        setIsAuthenticated(false)
        setCurrentUser(null)
        return null
      }
      setIsAuthenticated(true)
      setCurrentUser(user)
      return user
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setCurrentUser(null)
      setIsAuthenticated(false)
      return null
    } finally {
      if (load) setIsLoading(false)
    }
  }

  const getUser = async (id: string): Promise<UserType | null> => {
    try {
      const userRes = await supabaseService.getDB<UserType>('users', {
        filters: { id },
        single: true
      })
      if (!userRes) return null
      return userRes as UserType
    } catch {
      return null
    }
  }

  async function logout ({
    redirect = true,
    redirectionPath = '/'
  }: {
    redirect?: boolean
    redirectionPath?: string
  }) {
    try {
      setAllowRedirect(false)
      await supabaseService.client.auth.signOut()
      if (redirect) {
        router.push(redirectionPath)
      }
    } finally {
      setTimeout(() => setAllowRedirect(true), 50)
    }
  }

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        isOnline,
        currentUser,
        isLoading,
        setIsLoading,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        fetchCurrentUser,
        allowRedirect,
        isGuestPath,
        setAllowRedirect
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
