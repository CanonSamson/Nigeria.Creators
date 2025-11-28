'use client'
import { ReactNode } from 'react'

import { SettingModalProvider } from './model-settings'
import { UserProvider } from './user'

// ==============================|| APP, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper ({ children }: { children: ReactNode }) {
  return (
    <SettingModalProvider>
      <UserProvider>
        <>{children}</>
      </UserProvider>
    </SettingModalProvider>
  )
}
