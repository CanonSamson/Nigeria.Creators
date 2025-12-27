import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAppStore from '@/store/useAppStore'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

export type CreatorSearch = {
  id: string
  name: string
  about: string
  image: string
  category: string
  tags: string[]
  location: string
  minBudget?: string
  instagramLink?: string
  tiktokLink?: string
  contentLink?: string
}

type ApiCreator = {
  id: string
  name: string
  email: string
  profilePictureUrl?: string
  resident?: string
  profile: {
    description: string
    categories: string[]
    instagramLink?: string | null
    tiktokLink?: string | null
    contentLink: string | null
    state?: string | null
    minBudget?: string | null
  }
}

export function useCreatorsSearch () {
  const categories = useAppStore(s => s.brandFilters.categories)
  const others = useAppStore(s => s.brandFilters.others)
  const defaults = useAppStore(s => s.brandFilters.defaultCategories)
  const location = useAppStore(s => s.brandFilters.location)
  const budgetRange = useAppStore(s => s.brandFilters.budgetRange)
  const currentUser = useContextSelector(UserContext, s => s.currentUser)
  const brandId = currentUser?.id || ''
  const { data } = useQuery<{ success: boolean; data: ApiCreator[] }>({
    queryKey: ['creators-list', { categories, others, defaults, location, brandId, budgetRange }],
    queryFn: async () => {
      const res = await axios.get('/api/creators', {
        params: {
          categories:
            !others && categories && categories.length > 0
              ? categories.join(',')
              : undefined,
          others: others ? 'true' : undefined,
          excludeCategories:
            others && defaults && defaults.length > 0
              ? defaults.join(',')
              : undefined,
          location: location || undefined,
          minBudget: typeof budgetRange?.min === 'number' ? String(budgetRange.min) : undefined,
          maxBudget: typeof budgetRange?.max === 'number' ? String(budgetRange.max) : undefined,
          brandId: brandId || undefined
        }
      })
      return res.data
    }
  })

  const items = Array.isArray(data?.data) ? data!.data : []
  const creators: CreatorSearch[] = items.map(c => ({
    id: c.id,
    name: c.name,
    about: c.profile.description,
    image: c.profilePictureUrl ?? '',
    category: (c.profile?.categories && c.profile.categories[0]) || 'Others',
    tags: ['NG'],
    location: c.profile?.state || 'Nigeria',
    minBudget: c.profile?.minBudget || '',
    instagramLink: c.profile?.instagramLink || undefined,
    tiktokLink: c.profile?.tiktokLink || undefined,
    contentLink: c.profile?.contentLink || undefined
  }))

  return {
    creators
  }
}
