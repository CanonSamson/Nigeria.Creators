import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageLayout from './_component/PageLayout'

export const metadata: Metadata = {
  title: 'Creator Settings',
  description: "Apply to be a creator on Nigeria Creators.",
  openGraph: {
    title: 'Creator Settings',
    description: "Manage your creator settings on Nigeria Creators.",
    images: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/meta/1200-675.png`
    ]
  }
}

export default function CreatorSettingsLayout ({
  children
}: Readonly<{ children: ReactNode }>) {
  return <PageLayout>{children}</PageLayout>
}
