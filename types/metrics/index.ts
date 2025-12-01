export type MetricsNameType =
  | 'PROFILE_VIEW'
  | 'POST_VIEW'
  | 'POST_ENGAGEMENT'
  | 'BRAND_ENGAGEMENT'

export type MetricsType = {
  id: string
  eventName: MetricsNameType
  creatorId: string
  timestamp: Date
  brandId: string
}
