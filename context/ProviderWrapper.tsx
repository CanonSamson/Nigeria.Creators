'use client'
import { ReactNode } from 'react'

import { SettingModalProvider } from './model-settings'

// ==============================|| APP, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper ({ children }: { children: ReactNode }) {
  return (
    <SettingModalProvider>
      <>{children}</>
    </SettingModalProvider>
  )
}
