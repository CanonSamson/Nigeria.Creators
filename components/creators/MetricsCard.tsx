'use client'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import {  useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { supabaseService } from '@/utils/supabase/services'

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(2)}k`
  return n.toLocaleString()
}

const MetricsCard = () => {
  const currentUser = useContextSelector(UserContext, state => state.currentUser)
  const [engagedBrands, setEngagedBrands] = useState(0)
  const [postEngagements, setPostEngagements] = useState(0)
  const [postImpressions, setPostImpressions] = useState(0)
  const [pageViews, setPageViews] = useState(0)
  const [pageImpressions, setPageImpressions] = useState(0)
  const [prevPostImpressions, setPrevPostImpressions] = useState(0)
  const [prevPageViews, setPrevPageViews] = useState(0)
  const [changes, setChanges] = useState({
    engagedBrands: 0,
    postEngagements: 0,
    postImpressions: 0,
    pageViews: 0,
    pageImpressions: 0
  })

  const windows = useMemo(() => {
    const now = new Date()
    const currentStart = new Date(now)
    currentStart.setDate(now.getDate() - 7)
    const prevStart = new Date(now)
    prevStart.setDate(now.getDate() - 14)
    const prevEnd = currentStart
    return { currentStart, prevStart, prevEnd }
  }, [])

  const creatorId = currentUser?.id || ''

  useQuery({
    queryKey: ['metrics-brands', creatorId, windows.currentStart.toISOString()],
    enabled: !!creatorId,
    queryFn: async () => {
      const { data: cur } = await supabaseService.client
        .from('metrics')
        .select('brandId')
        .eq('creatorId', creatorId)
        .eq('eventName', 'BRAND_ENGAGEMENT')
        .gte('timestamp', windows.currentStart.toISOString())
      const { data: prev } = await supabaseService.client
        .from('metrics')
        .select('brandId')
        .eq('creatorId', creatorId)
        .eq('eventName', 'BRAND_ENGAGEMENT')
        .gte('timestamp', windows.prevStart.toISOString())
        .lt('timestamp', windows.prevEnd.toISOString())
      const curCount = new Set((cur || []).map(r => r.brandId)).size
      const prevCount = new Set((prev || []).map(r => r.brandId)).size
      setEngagedBrands(curCount)
      const pct = prevCount === 0 ? (curCount > 0 ? 100 : 0) : Number((((curCount - prevCount) / prevCount) * 100).toFixed(1))
      setChanges(s => ({ ...s, engagedBrands: pct }))
      return true
    }
  })

  useQuery({
    queryKey: ['metrics-post-eng', creatorId, windows.currentStart.toISOString()],
    enabled: !!creatorId,
    queryFn: async () => {
      const { count: curCount } = await supabaseService.client
        .from('metrics')
        .select('eventName', { count: 'exact', head: true })
        .eq('creatorId', creatorId)
        .eq('eventName', 'POST_ENGAGEMENT')
        .gte('timestamp', windows.currentStart.toISOString())
      const { count: prevCount } = await supabaseService.client
        .from('metrics')
        .select('eventName', { count: 'exact', head: true })
        .eq('creatorId', creatorId)
        .eq('eventName', 'POST_ENGAGEMENT')
        .gte('timestamp', windows.prevStart.toISOString())
        .lt('timestamp', windows.prevEnd.toISOString())
      const cur = curCount || 0
      const prev = prevCount || 0
      setPostEngagements(cur)
      const pct = prev === 0 ? (cur > 0 ? 100 : 0) : Number((((cur - prev) / prev) * 100).toFixed(1))
      setChanges(s => ({ ...s, postEngagements: pct }))
      return true
    }
  })

  useQuery({
    queryKey: ['metrics-post-views', creatorId, windows.currentStart.toISOString()],
    enabled: !!creatorId,
    queryFn: async () => {
      const { count: curCount } = await supabaseService.client
        .from('metrics')
        .select('eventName', { count: 'exact', head: true })
        .eq('creatorId', creatorId)
        .eq('eventName', 'POST_VIEW')
        .gte('timestamp', windows.currentStart.toISOString())
      const { count: prevCount } = await supabaseService.client
        .from('metrics')
        .select('eventName', { count: 'exact', head: true })
        .eq('creatorId', creatorId)
        .eq('eventName', 'POST_VIEW')
        .gte('timestamp', windows.prevStart.toISOString())
        .lt('timestamp', windows.prevEnd.toISOString())
      const cur = curCount || 0
      const prev = prevCount || 0
      setPostImpressions(cur)
      setPrevPostImpressions(prev)
      const pct = prev === 0 ? (cur > 0 ? 100 : 0) : Number((((cur - prev) / prev) * 100).toFixed(1))
      setChanges(s => ({ ...s, postImpressions: pct }))
      return true
    }
  })

  useQuery({
    queryKey: ['metrics-profile-views', creatorId, windows.currentStart.toISOString()],
    enabled: !!creatorId,
    queryFn: async () => {
      const { count: curCount } = await supabaseService.client
        .from('metrics')
        .select('eventName', { count: 'exact', head: true })
        .eq('creatorId', creatorId)
        .eq('eventName', 'PROFILE_VIEW')
        .gte('timestamp', windows.currentStart.toISOString())
      const { count: prevCount } = await supabaseService.client
        .from('metrics')
        .select('eventName', { count: 'exact', head: true })
        .eq('creatorId', creatorId)
        .eq('eventName', 'PROFILE_VIEW')
        .gte('timestamp', windows.prevStart.toISOString())
        .lt('timestamp', windows.prevEnd.toISOString())
      const cur = curCount || 0
      const prev = prevCount || 0
      setPageViews(cur)
      setPrevPageViews(prev)
      const pct = prev === 0 ? (cur > 0 ? 100 : 0) : Number((((cur - prev) / prev) * 100).toFixed(1))
      setChanges(s => ({ ...s, pageViews: pct }))
      return true
    }
  })

  useEffect(() => {
    const cur = postImpressions + pageViews
    const prev = prevPostImpressions + prevPageViews
    setPageImpressions(cur)
    const pct = prev === 0 ? (cur > 0 ? 100 : 0) : Number((((cur - prev) / prev) * 100).toFixed(1))
    setChanges(s => ({ ...s, pageImpressions: pct }))
  }, [postImpressions, pageViews, prevPostImpressions, prevPageViews])
  return (
    <div className='rounded-[12px] border min-w-[500px] border-[#EFEFEF] bg-white p-4 md:p-6 md:w-full '>
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
        {[
          { title: 'Engaged Brands', value: engagedBrands, change: changes.engagedBrands },
          { title: 'Post Engagement', value: postEngagements, change: changes.postEngagements },
          { title: 'Page Impressions', value: pageImpressions, change: changes.pageImpressions },
          { title: 'Post Impressions', value: postImpressions, change: changes.postImpressions },
          { title: 'Page Views', value: pageViews, change: changes.pageViews }
        ].map((m, idx) => {
          const isUp = m.change >= 0
          return (
            <div
              key={m.title}
              className={`flex flex-col ${
                idx < 5 - 1
                  ? 'md:border-r md:pr-6 border-[#EFEFEF]'
                  : ''
              }`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-[12px] text-text-color-200'>{m.title}</p>
                  <span className='text-[11px] text-text-color-200'>
                    Last 7 days
                  </span>
                </div>
              </div>
              <div className='mt-2'>
                <span className='text-[28px] md:text-[32px] font-semibold'>
                  {formatNumber(m.value)}
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
