'use client'
import { UserContext } from '@/context/user'
import { cn } from '@/lib/utils'
import DashboardIcon from '@/public/icons/DashboardIcon'
import NotificationIcon from '@/public/icons/NotificationIcon'
import SettingsIcon from '@/public/icons/SettingsIcon'
import WalletIcon from '@/public/icons/WalletIcon'
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

  const isBottomSider =
    pathname.includes('/settings') || pathname.includes('/brand')

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
  type SidebarItem = {
    key: string
    href: string
    baseSrc: string
    active: boolean
    Overlay?: (props: { stroke: string; size?: string }) => React.ReactNode
  }

  const items: SidebarItem[] = [
    {
      key: 'notifications',
      href: isCreator ? '/creator' : '/brand',
      baseSrc: '/logo/logo-icon.svg',
      active:
        pathname.includes('/notifications') && !pathname.includes('/settings'),
      Overlay: NotificationIcon
    },
    {
      key: 'settings',
      href: isCreator ? '/creator/settings' : '/brand/settings',
      baseSrc: '/logo/logo-icon.svg',
      active: pathname.includes('/settings'),
      Overlay: SettingsIcon
    }
  ]
  return (
    <div
      className={cn(
        '   fixed  z-[50]  flex  items-center justify-center py-4  duration-700 transition-all',
        isBottomSider
          ? ' w-full max-md:bottom-0 md:h-[100vh] left-0 md:left-4 max-md:right-0 md:w-auto md:flex-col md:!h-[100dvh]'
          : 'h-[100vh] top-0 flex-col left-4 !h-[100dvh]'
      )}
    >
      <div
        className={cn(
          ` bg-[#F8F8F8] border border-[#EFEFEF] overflow-hidden rounded-[20px]  flex  items-center justify-between py-[12px] duration-700 transition-all`,
          isBottomSider
            ? 'h-[56px] w-full max-w-[300px] max-md:overflow-x-auto max-md:px-2  md:flex-col md:w-[56px] md:h-full md:max-h-[300px]'
            : 'flex-col w-[56px] h-full max-h-[300px]'
        )}
      >
        <div className='flex flex-col items-center gap-6'>
          <div className='h-10 w-10 flex justify-center items-center relative bg-[#F1F1F1]   rounded-[10px]  '>
            <Link href={isCreator ? '/creator' : '/brand'}>
              <Image
                src='/logo/logo-icon.svg'
                alt='avatar'
                width={40}
                height={40}
                className={cn(
                  'object-contain duration-300 transition-opacity',
                  pathname === '/creator' || pathname === '/brand'
                    ? 'opacity-100'
                    : ' opacity-0'
                )}
              />
              <div className=' w-full h-full  flex justify-center items-center top-0 right-0  absolute rounded-[10px]  '>
                <DashboardIcon
                  stroke={
                    pathname === '/creator' || pathname === '/brand'
                      ? 'white'
                      : '#303030'
                  }
                />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={cn(
            ' flex  gap-2 duration-700 transition-all',
            isBottomSider
              ? ' max-md:flex-row md:flex-col min-w-max'
              : 'flex-col'
          )}
        >
          {items.map(item => (
            <div
              key={item.key}
              className='h-10 w-10 flex justify-center items-center relative bg-[#F1F1F1] rounded-[10px]'
            >
              <Link href={item.href}>
                <Image
                  src={item.baseSrc}
                  alt='avatar'
                  width={40}
                  height={40}
                  className={cn(
                    'object-contain duration-300 transition-opacity',
                    item.Overlay
                      ? item.active
                        ? 'opacity-100'
                        : 'opacity-0'
                      : 'opacity-100'
                  )}
                />
                <div className=' w-full h-full  flex justify-center items-center top-0 right-0  absolute rounded-[10px]'>
                  {item.Overlay ? (
                    <item.Overlay stroke={item.active ? 'white' : '#303030'} />
                  ) : null}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardSideBar
