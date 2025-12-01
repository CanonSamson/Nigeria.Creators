'use client'
import React, { useEffect } from 'react'
import { createContext } from 'use-context-selector'

import { useRouter } from 'next/navigation'
import { UserType } from '@/types/users'
import { supabaseService } from '@/utils/supabase/services'

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
}

// Create the UserContext
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  isLoading: true,
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

console.log('UserProvider mounted', isOnline, currentUser?.createdAt)
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

  async function logout ({ redirect = true }: { redirect?: boolean }) {
    try {
      setAllowRedirect(false)
      await supabaseService.client.auth.signOut()
      if (redirect) {
        router.push('/')
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
        setAllowRedirect
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
