import MobileFiltersModal from '@/components/modals/MobileFiltersModal'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Brand',
  description: 'Manage your brand settings on Nigeria Creators.',
  openGraph: {
    title: 'Brand',
    description: 'Manage your brand settings on Nigeria Creators.',
    images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/meta/1200-675.png`]
  }
}

export default function BrandLayout ({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <MobileFiltersModal />
    </>
  )
}
