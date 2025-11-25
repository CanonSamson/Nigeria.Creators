'use client'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const metrics = [
  {
    title: 'Engaged Brands',
    scope: 'All',
    value: '1,24k',
    change: 1.2
  },
  {
    title: 'Post Engagement',
    scope: 'All',
    value: '120',
    change: -4.5
  },
  {
    title: 'Page Impressions',
    scope: 'All',
    value: '1,67k',
    change: 4.3
  },
  {
    title: 'Post Impressions',
    scope: 'All',
    value: '456',
    change: 2.2
  },
  {
    title: 'Page Views',
    scope: 'All',
    value: '126',
    change: -4.5
  }
]

const MetricsCard = () => {
  return (
    <div className='rounded-[12px] border min-w-[500px] border-[#EFEFEF] bg-white p-4 md:p-6 '>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-[18px] md:text-[20px] font-semibold'>
            Performance Summary
          </h2>
          <p className='mt-1 text-[12px] md:text-[14px] text-text-color-200'>
            View your key profile performance metrics from the reporting
          </p>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-3 md:grid-cols-5 gap-6'>
        {metrics.map((m, idx) => {
          const isUp = m.change >= 0
          return (
            <div
              key={m.title}
              className={`flex flex-col ${
                idx < metrics.length - 1
                  ? 'md:border-r md:pr-6 border-[#EFEFEF]'
                  : ''
              }`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-[12px] text-text-color-200'>{m.title}</p>
                  <span className='text-[11px] text-text-color-200'>
                    {m.scope}
                  </span>
                </div>
              </div>
              <div className='mt-2'>
                <span className='text-[28px] md:text-[32px] font-semibold'>
                  {m.value}
                </span>
                <div className='mt-1'>
                  <span
                    className={
                      isUp
                        ? 'text-green-600 text-[12px] flex items-center gap-1'
                        : 'text-red-500 text-[12px] flex items-center gap-1'
                    }
                  >
                    {Math.abs(m.change)}%
                    {isUp ? (
                      <ArrowUpRight className='h-3 w-3' />
                    ) : (
                      <ArrowDownRight className='h-3 w-3' />
                    )}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MetricsCard
