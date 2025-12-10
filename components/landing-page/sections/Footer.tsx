'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Youtube, Camera } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const Footer = () => {
  const pathname = usePathname()
  const router = useRouter()

  const hideCard = pathname === '/login'
  return (
    <footer
      aria-label='Footer'
      className={cn(
        'w-full ',
        hideCard ? ' pb-[200px] md:py-[200px]' : 'py-[200px]'
      )}
    >
      <div className='w-full px-6 md:px-10'>
        <div className='mx-auto max-w-[1100px]'>
          <div
            className={cn(
              'relative py-10 overflow-hidden rounded-[20px] bg-primary/80',
              hideCard ? 'hidden md:block' : ''
            )}
          >
            <div className='absolute inset-0 grid grid-cols-4 opacity-35'>
              <Image
                src='/hero/2.png'
                alt='Creator'
                height={200}
                width={200}
                className='h-full w-full object-cover'
              />
              <Image
                src='/hero/6.png'
                alt='Creator'
                height={200}
                width={200}
                className='h-full w-full object-cover'
              />
              <Image
                src='/hero/7.png'
                alt='Creator'
                height={200}
                width={200}
                className='h-full w-full object-cover'
              />
              <Image
                src='/hero/8.png'
                alt='Creator'
                height={200}
                width={200}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='relative p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
              <div className='max-w-[620px]'>
                <h2 className='text-white font-bold tracking-tighter text-[24px] md:text-[32px] leading-tight'>
                  Put your creativity to work
                  <br />
                  Become a Creator
                </h2>
                <div>
                  <button
                    onClick={() => router.push('/creators/apply')}
                    className='inline-flex mt-4 items-center justify-center h-[48px] md:h-[56px] px-4 rounded-[12px] bg-white text-black font-semibold border border-[#DFE2EB]'
                  >
                    Become A Creator
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-[100px] grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-8 items-start'>
            <div className='flex items-center gap-3'>
              <Image
                src='/logo/footer.png'
                alt='Nigeria Creators'
                height={200}
                width={200}
                className='h-[50px] w-auto  object-cover'
              />
              <span className='sr-only'>Nigeria Creators</span>
            </div>

            <nav
              className='grid grid-cols-2 gap-10'
              aria-label='Footer navigation'
            >
              <ul className='space-y-2 text-[14px] md:text-[16px]'>
                <li>
                  <Link href='/' className='hover:text-primary'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href='/login' className='hover:text-primary'>
                    Log In
                  </Link>
                </li>
                <li>
                  <Link href='/creators/apply' className='hover:text-primary'>
                    Apply as Creator
                  </Link>
                </li>
                <li>
                  <Link href='/brands/register' className='hover:text-primary'>
                    Register as Brand
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className='hover:text-primary'
                  >
                    Join Wait-List
                  </button>
                </li>
              </ul>
              <ul className='space-y-2 text-[14px] md:text-[16px]'>
                <li>
                  <Link href='/privacy-policy' className='hover:text-primary'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='/terms-of-service' className='hover:text-primary'>
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link href='/contact' className='hover:text-primary'>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className='flex items-center gap-4 md:justify-end'>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='h-9 w-9 rounded-full border border-[#DFE2EB] flex items-center justify-center hover:border-primary hover:text-primary'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='YouTube'
                className='h-9 w-9 rounded-full border border-[#DFE2EB] flex items-center justify-center hover:border-primary hover:text-primary'
              >
                <Youtube className='h-5 w-5' />
              </a>
              <a
                href='https://www.instagram.com/nigeriacreators?igsh=MXZyaGZ6dWpsMWg2cg%3D%3D&utm_source=qr'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Creators media'
                className='h-9 w-9 rounded-full border border-[#DFE2EB] flex items-center justify-center hover:border-primary hover:text-primary'
              >
                <Camera className='h-5 w-5' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
