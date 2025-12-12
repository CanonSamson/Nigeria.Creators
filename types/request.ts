export type CreatorJoinRequestType = {
  id: string
  categories: string[]
  name: string
  email: string
  phone: string
  resident: 'yes' | 'no' | string
  isAccepted: boolean | null
  description: string
  contentLink: string
  instagram: string | null
  tiktok: string | null
  profilePictureUrl: string | null
  createdAt?: string
  minBudget?: number | null
}
