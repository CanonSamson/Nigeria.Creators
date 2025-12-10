import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
  const { data } = useQuery<{ success: boolean; data: ApiCreator[] }>({
    queryKey: ['creators-list'],
    queryFn: async () => {
      const res = await axios.get('/api/creators')
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
