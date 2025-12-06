import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageLayout from './_components/PageLayout'

export const metadata: Metadata = {
  title: 'Register as Brand',
  description: 'Create your brand account on Nigeria Creators.',
  openGraph: {
    title: 'Register as Brand',
    description: 'Create your brand account on Nigeria Creators.',
    images: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/meta/1200-675.png`
    ]
  }
}

export default function RegisterBrandLayout ({
  children
}: Readonly<{ children: ReactNode }>) {
  return <PageLayout>{children}</PageLayout>
}
