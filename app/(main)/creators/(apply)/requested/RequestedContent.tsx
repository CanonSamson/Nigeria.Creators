'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseService } from '@/utils/supabase/services'

const RequestedContent = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || ''
  const router = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    const handleIsRequested = async () => {
      if (!id) {
        router.replace('/')
        return
      }
      try {
        const { data, error } = await supabaseService.client
          .from('creators_join_request')
          .select('id')
          .eq('id', id)
          .single()
        if (error || !data) {
          router.replace('/')
          return
        }
      } catch {
        router.replace('/')
      }
    }
    handleIsRequested()
  }, [id, pathName, router])

  return (
    <main className={cn('w-full min-h-screen font-sans', 'min-h-[100dvh]')}>
      <div className='mx-auto max-w-[1100px] flex min-h-[100dvh] flex-col  w-full '>
        <div className=' w-full flex py-4 justify-end'>
          <Link
            href='/'
            className=' font-semibold text-[14px] px-4 md:text-[16px] hover:text-primary'
          >
            Go back
          </Link>
        </div>
        <section className=' flex flex-col   justify-center items-center flex-1 w-full'>
          <div className='max-w-[400px] mx-auto'>
            <Image
              src='/logo/footer.png'
              alt='Nigeria Creators logo'
              width={400}
              height={400}
              className='rounded-[12px] h-[120px] md:h-[100px] w-auto object-contain'
            />

            <div className='mt-4 w-full'>
              <h2 className='text-[18px] tracking-tighter  md:text-[22px] font-semibold text-black'>
                Thank you for your interest in Nigeria Creator!
              </h2>
              <p className='mt-2 text-[#40444C] tracking-tight text-[14px] md:text-[16px]'>
                We will review your request to ensure you are a good fit to our
                community. You will be notified within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default RequestedContent
