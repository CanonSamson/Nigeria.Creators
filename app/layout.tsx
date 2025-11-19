import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CustomRootLayout from '@/components/layout/CustomRootLayout'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export const metadata: Metadata = {
  title: 'Nigeria Creators',
  description: "Connect with Nigeria's Content Creators."
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
      </body>
    </html>
  )
}
