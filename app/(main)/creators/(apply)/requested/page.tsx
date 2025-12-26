import { Suspense } from 'react'
import RequestedContent from './RequestedContent'
import { ResolvingMetadata } from 'next'

export async function generateMetadata (
  _: any,
  parent: ResolvingMetadata
) {
  const previousImages = (await parent).openGraph?.images || []

  const metadata = {
    title: 'Requested',
    description: "Connect with Nigeria's Content Creators.",
    keywords: ['Nigeria', 'Creators', 'Content Creators', 'Nigerian Creators'],
    openGraph: {
      title: 'Requested | Nigeria Creators',
      description: "Connect with Nigeria's Content Creators.",
      images: [
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/meta/1200-675.png`,
        ...previousImages
      ].filter(Boolean),
      siteName: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
      locale: 'en_US',
      type: 'website'
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }

  return metadata
}

export default function Requested() {
  return (
    <Suspense fallback={null}>
      <RequestedContent />
    </Suspense>
  )
}
