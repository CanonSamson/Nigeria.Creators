'use client'
import { UserContext } from '@/context/user'
import { cn } from '@/lib/utils'
import { hasPermission } from '@/utils/permissions/auth-abac'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContextSelector } from 'use-context-selector'

const DashboardSideBar = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  const pathname = usePathname()

  const isCreator = hasPermission(
    {
      blockedBy: [],
      roles: currentUser?.roles || [],
      id: currentUser?.id as string
    },
    'is-creator',
    'view',
    { userId: currentUser?.id as string }
  )
  return (
    <div
      className={cn(
        '   fixed top-0 z-[50] left-4 h-[100vh] flex flex-col items-center justify-center py-4',
        ' !h-[100dvh]'
      )}
    >
      <div className='  w-[56px] h-full max-h-[300px] bg-[#F8F8F8] border border-[#EFEFEF] rounded-[20px]  flex flex-col items-center justify-between py-[12px]'>
        <div className='flex flex-col items-center gap-6'>
          <div className='h-10 w-10 rounded-full '>
            <Link href={isCreator ? '/creator' : '/brand'}>
              <Image
                src='/logo/logo-icon.svg'
                alt='avatar'
                width={40}
                height={40}
                className='object-contain'
              />
            </Link>
          </div>
        </div>
        <div className=' flex flex-col gap-2'>
          <div className='flex flex-col bg-[#F1F1F1] h-10 w-10  rounded-[10px] items-center justify-center p-1'>
            <Image
              src='/icons/notification-bing.svg'
              alt='avatar'
              width={40}
              height={40}
              className=' w-[24px] h-[24px] object-contain'
            />
          </div>
          <Link href={isCreator ? '/creator/settings' : ''}>
            <div
              className={cn(
                'flex flex-col bg-[#F1F1F1] h-10 w-10  rounded-[10px] items-center justify-center p-1',
                pathname.includes('/settings') ? '' : ''
              )}
            >
              <Image
                src='/icons/setting-2.svg'
                alt='avatar'
                width={40}
                height={40}
                className=' w-[24px] h-[24px] object-contain'
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardSideBar
