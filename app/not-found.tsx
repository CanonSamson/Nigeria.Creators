import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function NotFound () {
  return (
    <main className={cn('w-full min-h-screen font-sans', 'min-h-[100dvh]')}>
      <div className='mx-auto max-w-[1100px] flex min-h-[100dvh] flex-col w-full'>
        <section className='flex flex-col justify-center items-start flex-1 w-full'>
          <div className='max-w-[500px] px-6 text-left'>
            <Image
              src='/logo/footer.png'
              alt='Nigeria Creators logo'
              width={400}
              height={400}
              className='rounded-[12px] h-[120px] md:h-[100px] w-auto object-contain'
            />
            <h1 className='mt-6 text-[24px] md:text-[32px] font-bold tracking-tighter text-black'>
              Page Not Found
            </h1>
            <p className='mt-2 text-[#40444C] tracking-tight text-[14px] md:text-[16px]'>
              It’s like you’re looking for something we don’t have yet.
            </p>
            <div className='mt-6'>
              <Link
                href='/'
                aria-label='Go to homepage'
                className='inline-flex items-center justify-center px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-primary text-white hover:bg-primary-dark'
              >
                Go home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
