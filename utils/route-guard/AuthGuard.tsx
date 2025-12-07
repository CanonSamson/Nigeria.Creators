'use client'

import React, { useEffect, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import {
  APP_DEFAULT_AUTH_PATHS,
  APP_DEFAULT_BRAND_AUTH_PATHS,
  APP_DEFAULT_CREATOR_AUTH_PATHS,
  APP_DEFAULT_GUEST_PATHS,
  DONT_ALLOW_LOADING_SCREEN_PATHS
} from '@/config'

import { useContextSelector } from 'use-context-selector'
import { MAINTENANCE_MODE } from '../contant'
import { UserContext } from '@/context/user'
import Loading from '@/components/Loader'
import { hasPermission } from '../permissions/auth-abac'

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathName = usePathname()

  const isLoading = useContextSelector(UserContext, state => state.isLoading)
  const isAuthenticated = useContextSelector(
    UserContext,
    state => state.isAuthenticated
  )

  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  const isCreator = hasPermission(
    {
      blockedBy: [],
      role: currentUser?.role,
      id: currentUser?.id as string
    },
    'is-creator',
    'view',
    { userId: currentUser?.id as string }
  )

  const isBrand = hasPermission(
    {
      blockedBy: [],
      role: currentUser?.role,
      id: currentUser?.id as string
    },
    'is-brand',
    'view',
    { userId: currentUser?.id as string }
  )

  const allowRedirect = useContextSelector(
    UserContext,
    state => state.allowRedirect
  )
  const isOnline = useContextSelector(UserContext, state => state.isOnline)

  const isGuestPath = useMemo(() => {
    return APP_DEFAULT_GUEST_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  const isAuthPath = useMemo(() => {
    return APP_DEFAULT_AUTH_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  const isBrandAuthPath = useMemo(() => {
    return APP_DEFAULT_BRAND_AUTH_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  const isCreatorAuthPath = useMemo(() => {
    return APP_DEFAULT_CREATOR_AUTH_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  useEffect(() => {
    if (
      MAINTENANCE_MODE ||
      isAuthenticated === undefined ||
      isLoading === undefined ||
      isLoading ||
      !isOnline
    )
      return

    if (!allowRedirect) return

    if (!isAuthenticated) {
      if (!isGuestPath) {
        router.replace('/')
        return
      }
    } else {
      if (isGuestPath && !isAuthPath) {
        if (isCreator) {
          router.replace('/creator')
          return
        } else if (isBrand) {
          router.replace('/brand')
          return
        }
      } else if (isBrandAuthPath && !isBrand) {
        router.replace('/creator')
        return
      } else if (isCreatorAuthPath && !isCreator) {
        router.replace('/brand')
        return
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    isGuestPath,
    MAINTENANCE_MODE,
    isOnline,
    isBrandAuthPath,
    isCreatorAuthPath
  ])

  const isDontAllowLoadingScreenPath = useMemo(() => {
    return DONT_ALLOW_LOADING_SCREEN_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  if (
    (isLoading && !MAINTENANCE_MODE && !isDontAllowLoadingScreenPath) ||
    !isOnline
  ) {
    return <Loading />
  }

  return children
}

export default AuthGuard
