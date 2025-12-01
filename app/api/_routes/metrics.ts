import { Elysia, t } from 'elysia'
import { supabaseService } from '@/utils/supabase/services'

export const metricsRoutes = new Elysia()
  .get(
    '/metrics/monthly',
    async ({ query }) => {
      const { creatorId, start, end } = query as {
        creatorId: string
        start: string
        end: string
      }
      const { data } = await supabaseService.client
        .from('metrics')
        .select('timestamp')
        .eq('creatorId', creatorId)
        .eq('eventName', 'POST_ENGAGEMENT')
        .gte('timestamp', start)
        .lt('timestamp', end)
      const startDate = new Date(start)
      const endDate = new Date(end)
      const count =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth())
      const buckets = new Array(count + 1).fill(0)
      const labels: string[] = []
      const fmt = new Intl.DateTimeFormat('en', {
        month: 'short',
        year: '2-digit'
      })
      for (let i = 0; i <= count; i++) {
        const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1)
        labels.push(fmt.format(d))
      }
      ;(data || []).forEach(r => {
        const t = new Date(r.timestamp as string)
        const idx =
          (t.getFullYear() - startDate.getFullYear()) * 12 +
          (t.getMonth() - startDate.getMonth())
        if (idx >= 0 && idx < buckets.length) buckets[idx]++
      })
      return { labels, data: buckets }
    },
    {
      query: t.Object({
        creatorId: t.String(),
        start: t.String(),
        end: t.String()
      })
    }
  )
  .get(
    '/metrics/summary',
    async ({ query }) => {
      const { creatorId, start, end } = query as {
        creatorId: string
        start: string
        end: string
      }
      const startDate = new Date(start)
      const endDate = new Date(end)
      const prevEnd = new Date(startDate)
      const prevStart = new Date(startDate)
      const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1
      prevStart.setMonth(prevStart.getMonth() - months)
      const distinctBrands = async (s: string, e: string) => {
        const { data } = await supabaseService.client
          .from('metrics')
          .select('brandId')
          .eq('creatorId', creatorId)
          .eq('eventName', 'BRAND_ENGAGEMENT')
          .gte('timestamp', s)
          .lt('timestamp', e)
        return new Set((data || []).map(r => r.brandId as string)).size
      }
      const countBy = async (eventName: string, s: string, e: string) => {
        const { count } = await supabaseService.client
          .from('metrics')
          .select('eventName', { count: 'exact', head: true })
          .eq('creatorId', creatorId)
          .eq('eventName', eventName)
          .gte('timestamp', s)
          .lt('timestamp', e)
        return count || 0
      }
      const curBrands = await distinctBrands(start, end)
      const prevBrands = await distinctBrands(
        prevStart.toISOString(),
        prevEnd.toISOString()
      )
      const curPostEng = await countBy('POST_ENGAGEMENT', start, end)
      const prevPostEng = await countBy(
        'POST_ENGAGEMENT',
        prevStart.toISOString(),
        prevEnd.toISOString()
      )
      const curPostViews = await countBy('POST_VIEW', start, end)
      const prevPostViews = await countBy(
        'POST_VIEW',
        prevStart.toISOString(),
        prevEnd.toISOString()
      )
      const curPageViews = await countBy('PROFILE_VIEW', start, end)
      const prevPageViews = await countBy(
        'PROFILE_VIEW',
        prevStart.toISOString(),
        prevEnd.toISOString()
      )
      const curImpressions = curPostViews + curPageViews
      const prevImpressions = prevPostViews + prevPageViews
      const pct = (c: number, p: number) =>
        p === 0 ? (c > 0 ? 100 : 0) : Number((((c - p) / p) * 100).toFixed(1))
      return {
        engagedBrands: { value: curBrands, change: pct(curBrands, prevBrands) },
        postEngagements: {
          value: curPostEng,
          change: pct(curPostEng, prevPostEng)
        },
        postImpressions: {
          value: curPostViews,
          change: pct(curPostViews, prevPostViews)
        },
        pageViews: {
          value: curPageViews,
          change: pct(curPageViews, prevPageViews)
        },
        pageImpressions: {
          value: curImpressions,
          change: pct(curImpressions, prevImpressions)
        }
      }
    },
    {
      query: t.Object({
        creatorId: t.String(),
        start: t.String(),
        end: t.String()
      })
    }
  )

