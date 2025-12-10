import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { supabaseService } from '@/utils/supabase/services'

export default function CategoryTabs () {
  const currentUser = useContextSelector(UserContext, s => s.currentUser)

  const { data } = useQuery<{ categories: string[] } | null>({
    queryKey: ['brand-profile-categories', currentUser?.id],
    enabled: !!currentUser?.id,
    queryFn: async () => {
      const { data } = await supabaseService.client
        .from('brand_profile')
        .select('categories')
        .eq('userId', currentUser!.id)
        .limit(1)
      const row = (data || [])[0] as { categories: string[] } | undefined
      return row || null
    }
  })

  const categories = Array.isArray(data?.categories) ? data!.categories : []

  return (
    <div className='w-full overflow-x-auto max-md:px-2 scroll-smooth'>
      <div className='flex flex-nowrap md:flex-wrap gap-2 mt-4 min-w-max'>
        {categories.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className={cn(
              'px-3 py-2 rounded-full border text-[12px] md:text-[13px]',
              'bg-white border-[#EAEAEA] text-black'
            )}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
