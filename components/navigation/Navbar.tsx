'use client'
import { UserContext } from '@/context/user'
import { hasPermission } from '@/utils/permissions/auth-abac'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContextSelector } from 'use-context-selector'
import { mixpanelService } from '@/services/mixpanel'

const Navbar = () => {
  const router = useRouter()
  const isAuthenticated = useContextSelector(
    UserContext,
    state => state.isAuthenticated
  )
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  const isCreator = hasPermission(
    {
      blockedBy: [],
      role: currentUser?.role,
      id: currentUser?.id as string
    },
    'is-creator',
    'view',
    { userId: currentUser?.id as string }
  )

  return (
    <div className=' px-2 md:px-4 fixed w-full top-0 right-0 z-40'>
      <div className='  font-inter mx-auto w-full  mt-[16px] md:mt-[26px] max-w-[583px] items-center border border-[#EFEFEF] sticky top-0 flex justify-between bg-[#F8F8F8] rounded-[16px]  md:rounded-[20px]  p-[10px] md:p-[14px]'>
        <Link href='/'>
          <Image
            src='/logo/v1.png'
            alt='Nigeria Creators'
            height={100}
            width={100}
            className='duration-300 transition-all active:opacity-80 hover:opacity-80 h-[30px]  w-[30px]  md:h-[50px]  md:w-[50px] object-center object-cover rounded-[8px] md:rounded-[16px] '
          />
        </Link>

        <nav>
          <ul className=' inline-flex font font-medium  gap-[10px] text-[14px] md:text-[16px] md:gap-[16px]'>
            <li>
              <Link href='/creators/login'>Creators</Link>
            </li>
            <li>
              <Link href='/'>Brands</Link>
            </li>
            <li>
              <Link href='/'>Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  mixpanelService.track('NAV_DASHBOARD_CLICK', {
                    isCreator,
                    userId: currentUser?.id || null
                  })
                  if (isCreator) {
                    router.push('/creator')
                  } else {
                    router.push('/brand')
                  }
                }}
                className='duration-300 transition-all active:opacity-80 hover:opacity-80 md:h-[50px] text-[14px] md:text-[16px] bg-primary text-white font-medium md:rounded-[16px] rounded-[12px] px-3 py-3 md:px-4 md:py-2'
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button className='duration-300 transition-all active:opacity-80 hover:opacity-80 md:h-[50px] text-[14px] md:text-[16px] bg-primary text-white font-medium md:rounded-[16px] rounded-[12px] px-3 py-3 md:px-4 md:py-2'>
                I&apos;m a Brand
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
