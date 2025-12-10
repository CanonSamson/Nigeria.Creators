'use client'

import DashboardSideBar from '@/components/dashboard-sidebar'
import { cn } from '@/lib/utils'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import CategoryTabs from '@/components/brand/CategoryTabs'
import FilterBar from '@/components/brand/FilterBar'
import CreatorCard from '@/components/brand/card/CreatorCard'
import { useCreatorsSearch } from '@/hooks/useCreatorsSearch'

const BrandDashboard = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  console.log(currentUser?.id)
  const { creators } = useCreatorsSearch()

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
        <div
          className={cn(
            'pb-[100px] md:max-w-[80%] md:w-full  min-[800px]:max-w-[1200px] w-full flex-1 mx-auto'
          )}
        >
          <header className={'mt-4 mb-2'}>
            <div className=' max-md:px-2'>
              <h1 className='text-[28px] md:text-[34px] font-bold text-black'>
                Welcome, Canon
              </h1>
              <p className='mt-2 text-[#40444C] text-[14px] md:text-[16px]'>
                Find creative content creators ready to work with your brand
              </p>
            </div>
            <CategoryTabs />
            <div className=' w-full py-6'>
              <span className=' w-full h-[1px] bg-[#DFDFDF] flex' />
            </div>
            <FilterBar />
          </header>
          <section className={'grid grid-cols-1  px-2 gap-6 md:grid-cols-1'}>
            {creators.map(creator => (
              <CreatorCard
                key={creator.name + creator.image}
                creator={creator}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default BrandDashboard
