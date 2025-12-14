import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAppStore from '@/store/useAppStore'

export type CreatorSearch = {
  name: string
  about: string
  image: string
  category: string
  tags: string[]
  location: string
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
  }
}

export function useCreatorsSearch () {
  const categories = useAppStore(s => s.brandFilters.categories)
  const others = useAppStore(s => s.brandFilters.others)
  const defaults = useAppStore(s => s.brandFilters.defaultCategories)
  const { data } = useQuery<{ success: boolean; data: ApiCreator[] }>({
    queryKey: ['creators-list', { categories, others, defaults }],
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
              : undefined
        }
      })
      return res.data
    }
  })

  const items = Array.isArray(data?.data) ? data!.data : []
  const creators: CreatorSearch[] = items.map(c => ({
    name: c.name,
    about: c.profile.description,
    image: c.profilePictureUrl ?? '',
    category: (c.profile?.categories && c.profile.categories[0]) || 'Others',
    tags: ['NG'],
    location: c.profile?.state || 'Nigeria'
  }))

  return {
    creators
  }
}
