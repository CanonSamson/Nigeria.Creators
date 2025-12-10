import { Elysia, t } from 'elysia'
import { supabaseService } from '@/utils/supabase/services'

export const listOfCreatorsRoutes = new Elysia()
  .get(
    '/creators',
    async ({ query, set }) => {
      try {
        const isNonEmpty = (v: any) =>
          typeof v === 'string' ? v.trim().length > 0 : !!v
        const meetsRequired = (u: any) => {
          const p = u?.profile
          if (!p) return false
          const usersOk =
            isNonEmpty(u?.name) &&
            isNonEmpty(u?.email) &&
            isNonEmpty(u?.profilePictureUrl) &&
            isNonEmpty(u?.resident)
          const profileOk =
            isNonEmpty(p?.description) &&
            isNonEmpty(p?.contentLink) &&
            Array.isArray(p?.categories) &&
            p.categories.length > 0 &&
            (isNonEmpty(p?.tiktokLink) || isNonEmpty(p?.instagramLink))
          return usersOk && profileOk
        }
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
        .from('creator_profile')
        .select(
          'userId,description,contentLink,tiktokLink,instagramLink,categories,state'
        )
        .in('userId', ids)

      if (pErr) {
        set.status = 500
        return { success: false, error: pErr.message }
      }

      const profileMap = new Map(
        (profiles || []).map(p => {
          const { userId, ...rest } = p
          return [userId as string, rest]
        })
      )

      const merged = (users || []).map(u => ({
        ...u,
        profile: profileMap.get(u.id) || null
      }))
      const filtered = merged.filter(meetsRequired)

      const total = count ?? 0
      const currentPage = page ?? Math.floor(offset / limit) + 1
      const pageCount = total > 0 ? Math.ceil(total / limit) : 0
      const hasNext = offset + limit < total
      const hasPrev = offset > 0
      return {
        success: true,
        data: filtered,
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
  .get(
    '/creators/:id',
    async ({ params, set }) => {
      try {
        const id = params.id

        const { data: users, error } = await supabaseService.client
          .from('users')
          .select('id,email,name,profilePictureUrl,phoneNumber,resident')
          .eq('id', id)
          .eq('role', 'CREATOR')
          .not('isDisabled', 'eq', true)
          .not('isSuspended', 'eq', true)
          .limit(1)

        if (error) {
          set.status = 500
          return { success: false, error: error.message }
        }

        const user = (users || [])[0]
        if (!user) {
          set.status = 404
          return { success: false, error: 'Creator not found' }
        }

        const { data: profiles, error: pErr } = await supabaseService.client
          .from('creator_profile')
          .select('userId,description,contentLink,tiktokLink,instagramLink,categories,state')
          .eq('userId', id)
          .limit(1)

        if (pErr) {
          set.status = 500
          return { success: false, error: pErr.message }
        }

        const profile = (profiles || [])[0]
        const merged = {
          ...user,
          profile: profile
            ? {
                description: profile.description,
                contentLink: profile.contentLink,
                tiktokLink: profile.tiktokLink,
                instagramLink: profile.instagramLink,
                categories: profile.categories,
                state: (profile as any).state
              }
            : null
        }
        const isNonEmpty = (v: any) =>
          typeof v === 'string' ? v.trim().length > 0 : !!v
        const meetsRequired =
          merged.profile &&
          isNonEmpty(merged.name) &&
          isNonEmpty(merged.email) &&
          isNonEmpty(merged.profilePictureUrl) &&
          isNonEmpty(merged.resident) &&
          isNonEmpty(merged.profile.description) &&
          isNonEmpty(merged.profile.contentLink) &&
          Array.isArray(merged.profile.categories) &&
          merged.profile.categories.length > 0 &&
          (isNonEmpty(merged.profile.tiktokLink) ||
            isNonEmpty(merged.profile.instagramLink))
        if (!meetsRequired) {
          set.status = 404
          return { success: false, error: 'Creator not available' }
        }

        return { success: true, data: merged }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        set.status = 500
        return { success: false, error: msg }
      }
    },
    {
      params: t.Object({ id: t.String() })
    }
  )
