'use client'
import { ReactNode } from 'react'

import { SettingModalProvider } from './model-settings'
import { UserProvider } from './user'
import AuthGuard from '@/utils/route-guard/AuthGuard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MixPanelProvider } from './mixpanel'

// ==============================|| APP, ROUTER, LOCAL ||============================== //

export const queryClient = new QueryClient()

export default function ProviderWrapper ({ children }: { children: ReactNode }) {
  return (
    <MixPanelProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AuthGuard>
            <SettingModalProvider>
              <>{children}</>
            </SettingModalProvider>
          </AuthGuard>
        </UserProvider>
      </QueryClientProvider>
    </MixPanelProvider>
  )
}
