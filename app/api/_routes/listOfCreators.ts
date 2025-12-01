import { Elysia, t } from 'elysia'
import { supabaseService } from '@/utils/supabase/services'

export const listOfCreatorsRoutes = new Elysia().get(
  '/creators',
  async ({ query, set }) => {
    try {
      const limit = query.limit ? Number(query.limit) : 20
      const offset = query.offset ? Number(query.offset) : 0

      const { data: users, error } = await supabaseService.client
        .from('users')
        .select('id,email,name,profilePictureUrl,phoneNumber,resident')
        .eq('role', 'CREATOR')
        .not('isDisabled', 'eq', true)
        .not('isSuspended', 'eq', true)
        .range(offset, offset + limit - 1)

      console.log(error)
      if (error) {
        set.status = 500
        return { success: false, error: error.message }
      }

      const ids = (users || []).map(u => u.id)
      if (ids.length === 0) {
        return { success: true, data: [] }
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

      return { success: true, data: merged }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      set.status = 500
      return { success: false, error: msg }
    }
  },
  {
    query: t.Object({
      limit: t.Optional(t.String()),
      offset: t.Optional(t.String())
    })
  }
)
