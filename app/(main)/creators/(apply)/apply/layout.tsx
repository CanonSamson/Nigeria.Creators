import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageLayout from './_components/PageLayout'

export const metadata: Metadata = {
  title: 'Apply as Creator',
  description: "Apply to be a creator on Nigeria Creators.",
  openGraph: {
    title: 'Apply as Creator',
    description: "Apply to be a creator on Nigeria Creators.",
    images: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/meta/1200-675.png`
    ]
  }
}

export default function ApplyAsCreatorLayout ({
  children
}: Readonly<{ children: ReactNode }>) {
  return <PageLayout>{children}</PageLayout>
}
