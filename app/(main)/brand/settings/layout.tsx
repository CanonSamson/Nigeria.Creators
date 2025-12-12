import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageLayout from './_component/PageLayout'

export const metadata: Metadata = {
  title: 'Brand Settings',
  description: 'Manage your brand settings on Nigeria Creators.',
  openGraph: {
    title: 'Brand Settings',
    description: 'Manage your brand settings on Nigeria Creators.',
    images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/meta/1200-675.png`]
  }
}

export default function BrandSettingsLayout ({
  children
}: Readonly<{ children: ReactNode }>) {
  return <PageLayout>{children}</PageLayout>
}

