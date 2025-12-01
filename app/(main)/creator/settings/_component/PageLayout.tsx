'use client'
import DashboardSideBar from '@/components/dashboard-sidebar'
import { UserContext } from '@/context/user'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContextSelector } from 'use-context-selector'

const PageLayout = ({ children }: { children: ReactNode }) => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )
  const logout = useContextSelector(UserContext, state => state.logout)
  const pathName = usePathname()
  const router = useRouter()

  return (
    <div
      className={cn(
        'min-h-[100dvh] flex  items-start justify-start w-full font-sans',
        '!min-h-[100dvh]'
      )}
    >
      <div
        className={cn(
          'min-h-[100dvh] flex font-sans items-start   overflow-x-hidden justify-start w-full max-w-[1200px] mx-auto ',
          '!min-h-[100dvh]'
        )}
      >
        <DashboardSideBar />
        <div className=' max-w-[1200px] w-full flex-1 mx-auto'>
          <div className='pt-10 md:pt-14 pl-22 md:pl-26 flex items-start  md:pr-10   w-full '>
            <div className='pt-10 md:pt-14  w-full sm:max-w-[80%] md:max-w-[90%]'>
              <div className=' '>
                <h1 className='text-[28px] md:text-[36px] font-bold tracking-tight'>
                  Account Settings
                </h1>
                <p className='mt-1 text-text-color-200 text-[14px] md:text-[16px]'>
                  Manage your creator profile and preferences
                </p>
              </div>

              <div className='   mt-8 flex items-center gap-4'>
                <div className='h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#EFEFEF] overflow-hidden' />
                <div>
                  <p className='text-[16px] md:text-[18px] font-medium text-black'>
                    {currentUser?.name || ''} / Creator
                  </p>
                  <p className='text-[12px] md:text-[14px] text-text-color-200'>
                    Update your username and manage your account
                  </p>
                </div>
              </div>
              <div className=' mt-10 flex flex-col  md:flex-row items-start gap-6 w-full'>
                <div className=' md:w-[250px]'>
                  <div>
                    <p className='text-[16px] md:text-[18px] font-medium text-black'>
                      General
                    </p>
                    <div className='mt-3 flex gap-3 overflow-x-auto whitespace-nowrap hide-scrollbar md:overflow-visible md:flex-col'>
                      <Link
                        href={'/creator/settings'}
                        className={cn(
                          'text-[14px] md:text-[16px] font-medium flex-none',
                          pathName === '/creator/settings'
                            ? 'text-[#327468]'
                            : 'text-black'
                        )}
                      >
                        Edit Profile
                      </Link>
                      <Link
                        href={'/creator/settings/password'}
                        className={cn(
                          'text-[14px] md:text-[16px] text-text-color-200 flex-none'
                        )}
                      >
                        Password
                      </Link>
                      <Link
                        href={'/creator/settings/social'}
                        className={cn(
                          'text-[14px] md:text-[16px] text-text-color-200 flex-none'
                        )}
                      >
                        Social Profiles
                      </Link>
                      <Link
                        href={'/creator/settings/notifications'}
                        className={cn(
                          'text-[14px] md:text-[16px] text-text-color-200 flex-none'
                        )}
                      >
                        Email Notifications
                      </Link>
                    </div>
                    <div className='my-4 h-px bg-[#EFEFEF]' />
                    <div className='mt-2 flex gap-3 overflow-x-auto whitespace-nowrap hide-scrollbar md:flex-col'>
                      <button
                        className='text-left flex-none w-auto md:w-full text-[14px] md:text-[16px] text-red-500'
                        onClick={() => logout({ redirect: true })}
                      >
                        Logout
                      </button>
                      <button
                        className='text-left flex-none w-auto md:w-full text-[14px] md:text-[16px] text-red-500'
                        onClick={() =>
                          router.push('/creator/settings/delete-account')
                        }
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
                <div className=' flex-1 w-full '>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
