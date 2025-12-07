'use client'
import { UserContext } from '@/context/user'
import { cn } from '@/lib/utils'
import DashboardIcon from '@/public/icons/DashboardIcon'
import NotificationIcon from '@/public/icons/NotificationIcon'
import SettingsIcon from '@/public/icons/SettingsIcon'
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

  const isSettings = pathname.includes('/settings')

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
      href: isCreator
        ? '/creator/settings/notifications'
        : '/brand/settings/notifications',
      baseSrc: '/logo/logo-icon.svg',
      active: pathname.includes('/notifications') && !isSettings,
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
        '   fixed top-0 z-[50] left-4  flex  items-center justify-center py-4  duration-700 transition-all',
        isSettings
          ? ' w-full md:h-[100vh] md:w-auto md:flex-col md:!h-[100dvh]'
          : 'h-[100vh] flex-col !h-[100dvh]'
      )}
    >
      <div
        className={cn(
          ` bg-[#F8F8F8] border border-[#EFEFEF] rounded-[20px]  flex  items-center justify-between py-[12px] duration-700 transition-all`,
          isSettings
            ? 'h-[56px] w-full max-w-[300px]  md:flex-col md:w-[56px] md:h-full md:max-h-[300px]'
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
                  pathname === '/creator' ? 'opacity-100' : ' opacity-0'
                )}
              />
              <div className=' w-full h-full  flex justify-center items-center top-0 right-0  absolute rounded-[10px]  '>
                <DashboardIcon
                  stroke={pathname === '/creator' ? 'white' : '#303030'}
                />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={cn(
            ' flex  gap-2 duration-700 transition-all',
            isSettings ? ' md:flex-col' : 'flex-col'
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
