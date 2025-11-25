'use client'

import { useState } from 'react'
import { Calendar, Filter } from 'lucide-react'
import dynamic from 'next/dynamic'
import DashboardSideBar from '@/components/dashboard-sidebar'
import { cn } from '@/lib/utils'
import MetricsCard from '@/components/creators/MetricsCard'

const CreatorVisitorChart = dynamic(
  () => import('@/components/creators/charts/CreatorVisitorChart'),
  { ssr: false }
)

const CreatorsDashboard = () => {
  const [dateRange] = useState('Mar 5, 2024 - June 5, 2024')

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
        <div className=' max-w-[1200px] w-full flex-1 mx-auto'>
          <div className='pt-10 md:pt-14 '>
            <div className='pl-22 md:pl-0 md:pr-0 pr-10  flex items-center justify-between'>
              <h1 className='text-[28px] md:text-[36px] font-bold tracking-tight'>
                Welcome, Canon
              </h1>
              <button className='hidden md:flex items-center gap-2 h-[40px] px-4 rounded-[12px] border border-[#EFEFEF] bg-white text-black'>
                <Filter className='h-4 w-4 text-text-color-200' />
                Filter
              </button>
            </div>
            <div className=' pl-22 md:pl-0 md:pr-0 pr-10  mt-6 flex items-center gap-3'>
              <button className='flex items-center gap-2 h-[40px] px-3 rounded-[12px] border border-[#EFEFEF] bg-white text-black'>
                <Calendar className='h-4 w-4 text-text-color-200' />
                <span className='text-[14px] md:text-[16px]'>{dateRange}</span>
              </button>
            </div>
            <div className='pl-22 md:pl-0 mr-10 md:mr-0 pr-10 md:pr-0  mt-10 overflow-x-auto  hide-scrollbar'>
              
              <MetricsCard />
            </div>{' '}
            <div className='pl-22 mr-10 md:mr-0 md:pl-0 md:pr-0 pr-10  mt-10 overflow-x-auto  hide-scrollbar'>
              <CreatorVisitorChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorsDashboard
