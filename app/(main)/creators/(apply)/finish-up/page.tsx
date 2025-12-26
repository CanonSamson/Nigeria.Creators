import Image from 'next/image'
import { ReactNode, Suspense } from 'react'
import FinishUpForm from './_components/FinishUpForm'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/landing-page/sections/Footer'
import { ResolvingMetadata } from 'next'

export async function generateMetadata (
  _: any,
  parent: ResolvingMetadata
) {
  const previousImages = (await parent).openGraph?.images || []

  const metadata = {
    title: 'Finish Up',
    description: "Connect with Nigeria's Content Creators.",
    keywords: ['Nigeria', 'Creators', 'Content Creators', 'Nigerian Creators'],
    openGraph: {
      title: 'Finish Up | Nigeria Creators',
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

function LeftPanel ({ children }: { children: ReactNode }) {
  return (
    <div className='w-full font-sans px-6 py-10 md:py-16 flex items-center justify-center'>
      <div className='w-full max-w-[480px]'>
        <h1 className='text-[18px] md:text-[22px] font-semibold text-black tracking-tight'>
          Finish up account set up
        </h1>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px] tracking-tight'>
          Creators building their brand with us.
        </p>
        {children}
      </div>
    </div>
  )
}

function RightPanel () {
  return (
    <div className='w-full  hidden md:flex h-full p-6 md:p-10'>
      <div className='relative bg-[#327468] w-full h-[420px] md:h-[560px] rounded-[20px] overflow-hidden'>
        <Image
          src='/images/0c837e91b9f09dd481144eb3e7a9ea56 1.png'
          alt='Creator holding camera'
          fill
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover  opacity-70'
          priority
        />
        <div className='absolute inset-0 bg-black/20' aria-hidden />
        <div className='absolute bottom-6 right-6 md:bottom-10 md:right-10'>
          <div className='relative'>
            <div
              className='absolute -bottom-8 -right-8 h-[140px] w-[180px] md:h-[180px] md:w-[240px] opacity-60'
              aria-hidden
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '10px 10px'
              }}
            />
            <Image
              src='/images/NIGERIA-CREATOR.svg'
              alt='Nigeria Creator typography'
              width={420}
              height={140}
              className='relative z-10 h-[100px] md:h-[150px] w-auto'
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FinishUpApplication () {
  return (
    <main>
      <Navbar />
      <div className='w-full  mt-[80px] md:min-h-[100dvh] font-sans'>
        <div className='mx-auto max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start md:items-center pt-[80px] md:pt-[120px] pb-12 md:pb-20'>
          <LeftPanel>
            <Suspense fallback={null}>
              <FinishUpForm />
            </Suspense>
          </LeftPanel>
          <RightPanel />
        </div>
      </div>
      <Footer />
    </main>
  )
}
