'use client'

import { useMemo } from 'react'
import { Calendar, Eye } from 'lucide-react'
import dynamic from 'next/dynamic'
import DashboardSideBar from '@/components/dashboard-sidebar'
import { cn } from '@/lib/utils'
import MetricsCard from '@/components/creators/MetricsCard'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { useQuery } from '@tanstack/react-query'
import { supabaseService } from '@/utils/supabase/services'
import { useSettingModal } from '@/context/model-settings'

const CreatorEngagementsChart = dynamic(
  () => import('@/components/creators/charts/CreatorEngagementsChart'),
  { ssr: false }
)

const CreatorsDashboard = () => {
  

  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  const dateRange = useMemo(() => {
    const createdAt = currentUser?.createdAt
    const start = createdAt ? new Date(createdAt as unknown as string) : null
    if (!start || isNaN(start.getTime())) return ''
    const end = new Date()
    const fmt = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    return `${fmt.format(start)} - ${fmt.format(end)}`
  }, [currentUser?.createdAt])

  const { labels, startIso } = useMemo((): {
    labels: string[]
    startIso: string
  } => {
    const now = new Date()
    const months: string[] = []
    const formatter = new Intl.DateTimeFormat('en', {
      month: 'short',
      year: '2-digit'
    })
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push(formatter.format(d))
    }
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1)
    return { labels: months, startIso: start.toISOString() }
  }, [])

  const creatorId = currentUser?.id || ''
  const { data: engagements = [] } = useQuery({
    queryKey: ['creator-engagements-monthly', creatorId, startIso],
    enabled: !!creatorId,
    queryFn: async () => {
      const { data } = await supabaseService.client
        .from('metrics')
        .select('timestamp')
        .eq('creatorId', creatorId)
        .eq('eventName', 'POST_ENGAGEMENT')
        .gte('timestamp', startIso)
      const buckets = new Array(6).fill(0)
      const base = new Date(startIso)

      ;(data || []).forEach(r => {
        const t = new Date(r.timestamp)
        const idx =
          (t.getFullYear() - base.getFullYear()) * 12 +
          (t.getMonth() - base.getMonth())
        if (idx >= 0 && idx < buckets.length) buckets[idx]++
      })
      return buckets
    }
  })

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
        <div className=' pb-[100px] md:max-w-[80%] md:w-full  min-[800px]:max-w-[1200px] w-full flex-1 mx-auto'>
          <div className='pt-10 md:pt-14 '>
            <div className='pl-22 md:pl-0 md:pr-0 pr-10  flex items-center justify-between'>
              <h1 className='text-[28px] md:text-[36px] font-bold tracking-tight'>
                Welcome, {currentUser?.name || ''}
              </h1>
              <PreviewProfileButton />
            </div>
            <div className=' pl-22 md:pl-0 md:pr-0 pr-10  mt-6 flex items-center gap-3'>
              <button className='flex items-center gap-2 h-[40px] px-3 rounded-[12px] border border-[#EFEFEF] bg-white text-black'>
                <Calendar className='h-4 w-4 text-text-color-200' />
                <span className='text-[14px] md:text-[16px]'>{dateRange}</span>
              </button>
            </div>
            <div className='pl-22 flex items-start md:pl-0 pr-4 md:pr-0  mt-10 overflow-x-auto  md:w-full hide-scrollbar'>
              <MetricsCard />
              <span className=' flex w-4 md:w-0' />
            </div>{' '}
            <div className='pl-22   flex items-start md:pl-0 md:pr-0 pr-4   mt-10 overflow-x-auto  hide-scrollbar'>
              <CreatorEngagementsChart data={engagements} categories={labels} />
              <span className=' flex w-4 md:w-0' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorsDashboard

function PreviewProfileButton () {
  const { openModal } = useSettingModal()
  const currentUser = useContextSelector(UserContext, state => state.currentUser)
  const handleClick = () => {
    const userId = currentUser?.id || ''
    if (!userId) return
    openModal('creatorProfileModal', { userId })
  }
  return (
    <button
      onClick={handleClick}
      className='hidden md:flex items-center gap-2 h-[40px] px-4 rounded-[12px] border border-[#EFEFEF] bg-white text-black'
    >
      <Eye className='h-4 w-4 text-text-color-200' />
      Preview Profile
    </button>
  )
}
