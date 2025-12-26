import { Inter } from 'next/font/google'
import './globals.css'
import CustomRootLayout from '@/components/layout/CustomRootLayout'
import { ResolvingMetadata } from 'next'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no'
}

type RootProps = {
  params?: Record<string, string>
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata (
  _: RootProps,
  parent: ResolvingMetadata
) {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  // generate metadata
  const metadata = {
    title: { default: 'Nigeria Creators', template: '%s | Nigeria Creators' },
    description: "Connect with Nigeria's Content Creators.",
    keywords: ['Nigeria', 'Creators', 'Content Creators', 'Nigerian Creators'],
    openGraph: {
      title: 'Nigeria Creators',
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

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <CustomRootLayout>{children}</CustomRootLayout>
        <Toaster />
      </body>
    </html>
  )
}
