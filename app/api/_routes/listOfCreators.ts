import { Elysia, t } from 'elysia'
import { supabaseService } from '@/utils/supabase/services'

export const listOfCreatorsRoutes = new Elysia()
  .get(
    '/creators',
    async ({ query, set }) => {
      try {
        const brandId =
          query?.brandId && String(query.brandId).trim().length > 0
            ? String(query.brandId).trim()
            : undefined
        const selectedCategories =
          query?.categories && String(query.categories).trim().length > 0
            ? String(query.categories)
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            : []
        const othersOnly =
          typeof query?.others === 'string' &&
          String(query.others).toLowerCase() === 'true'
        let excludeCategories =
          query?.excludeCategories && String(query.excludeCategories).trim().length > 0
            ? String(query.excludeCategories)
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            : []
        if (othersOnly && excludeCategories.length === 0 && brandId) {
          const { data: brandRows, error: brandErr } = await supabaseService.client
            .from('brand_profile')
            .select('categories')
            .eq('userId', brandId)
            .limit(1)
          if (!brandErr) {
            const row = (brandRows || [])[0] as { categories?: string[] } | undefined
            excludeCategories = Array.isArray(row?.categories) ? (row!.categories as string[]) : []
          }
        }
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

      const profileQuery = supabaseService.client
        .from('creator_profile')
        .select(
          'userId,description,contentLink,tiktokLink,instagramLink,categories,state,minBudget'
        )
        .in('userId', ids)
      const { data: profiles, error: pErr } = await profileQuery

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
      const filteredBySelection = (othersOnly || selectedCategories.length > 0)
        ? merged.filter(u => {
            const cats = Array.isArray((u.profile as any)?.categories)
              ? ((u.profile as any).categories as string[])
              : []
            if (othersOnly && excludeCategories.length > 0) {
              return cats.every(c => !excludeCategories.includes(c))
            }
            if (selectedCategories.length > 0) {
              return cats.some(c => selectedCategories.includes(c))
            }
            return true
          })
        : merged
      const loc = typeof (query as any)?.location === 'string' ? String((query as any).location).trim() : ''
      const filteredByLocation = loc.length > 0
        ? filteredBySelection.filter(u => {
            const st = String(((u.profile as any)?.state || '')).trim().toLowerCase()
            return st.length > 0 && st === loc.toLowerCase()
          })
        : filteredBySelection
      const minQ =
        typeof (query as any)?.minBudget === 'string' &&
        String((query as any).minBudget).trim().length > 0
          ? Number(String((query as any).minBudget).trim())
          : undefined
      const maxQ =
        typeof (query as any)?.maxBudget === 'string' &&
        String((query as any).maxBudget).trim().length > 0
          ? Number(String((query as any).maxBudget).trim())
          : undefined
      const filteredByBudget =
        typeof minQ === 'number' || typeof maxQ === 'number'
          ? filteredByLocation.filter(u => {
              const mbStr = String(((u.profile as any)?.minBudget || '')).trim()
              const mb = mbStr.length > 0 ? Number(mbStr) : undefined
              if (typeof mb !== 'number' || !Number.isFinite(mb)) return false
              if (typeof minQ === 'number' && typeof maxQ === 'number') {
                return mb >= minQ && mb <= maxQ
              }
              if (typeof minQ === 'number') return mb >= minQ
              if (typeof maxQ === 'number') return mb <= maxQ
              return true
            })
          : filteredByLocation
      const filtered = filteredByBudget.filter(meetsRequired)

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
      console.log(e)
      const msg = e instanceof Error ? e.message : String(e)
      set.status = 500
      return { success: false, error: msg }
    }
    },
    {
      query: t.Object({
        limit: t.Optional(t.String()),
        offset: t.Optional(t.String()),
        page: t.Optional(t.String()),
        categories: t.Optional(t.String()),
        others: t.Optional(t.String()),
        excludeCategories: t.Optional(t.String()),
        brandId: t.Optional(t.String()),
        location: t.Optional(t.String()),
        minBudget: t.Optional(t.String()),
        maxBudget: t.Optional(t.String())
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
          .select('userId,description,contentLink,tiktokLink,instagramLink,categories,state,minBudget')
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
