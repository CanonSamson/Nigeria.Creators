import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const PrivacyPolicy = () => {
  return (
    <main
      className={cn('w-full min-h-screen font-sans px-4', '!min-h-[100dvh]')}
    >
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
              <h1 className='text-[22px] md:text-[28px] font-bold tracking-tighter text-black'>
                Privacy Policy
              </h1>
              <p className='mt-2 text-[#40444C] tracking-tight text-[14px] md:text-[16px]'>
                We care about your privacy. This page will outline how we handle
                data once it’s finalized.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPolicy
