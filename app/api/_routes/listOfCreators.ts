import { Elysia, t } from 'elysia'
import { supabaseService } from '@/utils/supabase/services'

export const listOfCreatorsRoutes = new Elysia().get(
  '/creators',
  async ({ query, set }) => {
    try {
      const limit = query.limit ? Math.max(1, Number(query.limit)) : 20
      const pageNum = query.page ? Number(query.page) : undefined
      const page = pageNum && pageNum > 0 ? pageNum : undefined
      const offset = page ? (page - 1) * limit : query.offset ? Number(query.offset) : 0

      const { data: users, count, error } = await supabaseService.client
        .from('users')
        .select('id,email,name,profilePictureUrl,phoneNumber,resident', {
          count: 'exact'
        })
        .eq('role', 'CREATOR')
        .not('isDisabled', 'eq', true)
        .not('isSuspended', 'eq', true)
        .range(offset, offset + limit - 1)

      if (error) {
        set.status = 500
        return { success: false, error: error.message }
      }

      const ids = (users || []).map(u => u.id)
      if (ids.length === 0) {
        const total = count ?? 0
        const currentPage = page ?? Math.floor(offset / limit) + 1
        const pageCount = total > 0 ? Math.ceil(total / limit) : 0
        const hasNext = offset + limit < total
        const hasPrev = offset > 0
        return {
          success: true,
          data: [],
          pagination: {
            total,
            limit,
            offset,
            page: currentPage,
            pageCount,
            hasNext,
            hasPrev
          }
        }
      }

      const { data: profiles, error: pErr } = await supabaseService.client
        .from('user_profile')
        .select(
          'userId,description,contentLink,tiktokLink,instagramLink,categories'
        )
        .in('userId', ids)

      if (pErr) {
        set.status = 500
        return { success: false, error: pErr.message }
      }

      const profileMap = new Map(
        (profiles || []).map(p => [p.userId as string, p])
      )

      const merged = (users || []).map(u => ({
        ...u,
        profile: profileMap.get(u.id) || null
      }))

      const total = count ?? 0
      const currentPage = page ?? Math.floor(offset / limit) + 1
      const pageCount = total > 0 ? Math.ceil(total / limit) : 0
      const hasNext = offset + limit < total
      const hasPrev = offset > 0
      return {
        success: true,
        data: merged,
        pagination: {
          total,
          limit,
          offset,
          page: currentPage,
          pageCount,
          hasNext,
          hasPrev
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      set.status = 500
      return { success: false, error: msg }
    }
  },
  {
    query: t.Object({
      limit: t.Optional(t.String()),
      offset: t.Optional(t.String()),
      page: t.Optional(t.String())
    })
  }
)
