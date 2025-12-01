export type Roles = 'CREATOR' | 'BRAND'

export type UserType = {
  createdAt: Date
  id: string
  requestId: string
  email: string
  name: string
  role: Roles
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
  userId: string
  description: string
  contentLink: string | null
  tiktokLink: string | null
  instagramLink: string | null
  categories: string[]
}

export type UserSettingsType = {
  id: string
  userId: string
  isNotificationEnabled: boolean
  isWeeklyEmailEnabled: boolean
  isBrandEmailEnabled: boolean
}
