export type Roles = 'CREATOR' | 'BRAND'

export type UserType = {
  userId: string
  requestId: string
  email: string
  name: string
  roles: Roles[]
  profilePictureUrl: string
  phoneNumber: string
  isEmailVerified: boolean
 resident: 'yes' | 'no' | string
  isDisabled: boolean | null
  isDisabledAt: Date | null
  isSuspendedAt: Date | null
  isSuspended: boolean | null
}
export type UserProfileType = {
  description: string
  contentLink: string | null
  tiktokLink: string | null
  instagramLink: string | null
  categories: string[]
}
