'use client'

import DashboardSideBar from '@/components/dashboard-sidebar'
import { cn } from '@/lib/utils'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const BrandDashboard = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  console.log(currentUser?.id)

  return (
    <div
      className={cn(
        'min-h-[100dvh] flex  items-start justify-start w-full font-sans',
        '!min-h-[100dvh]'
      )}
    >
      <div
        className={cn(
          'min-h-[100dvh] flex items-start   overflow-x-hidden justify-start w-full max-w-[1200px] mx-auto ',
          '!min-h-[100dvh]'
        )}
      >
        <DashboardSideBar />
        <div className=' pb-[100px] md:max-w-[80%] md:w-full  min-[800px]:max-w-[1200px] w-full flex-1 mx-auto'></div>
      </div>
    </div>
  )
}

export default BrandDashboard
