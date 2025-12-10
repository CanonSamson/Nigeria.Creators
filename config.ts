// ==============================|| APP CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/'
export const APP_CREATOR_DEFAULT_PATH = '/creator'
export const APP_BRAND_DEFAULT_PATH = '/brand'

export const APP_DEFAULT_BRAND_GUEST_PATHS = ['/login', , '/brands/register']

export const APP_DEFAULT_CREATOR_GUEST_PATHS = [
  '/creators/finish-up',
  '/login',
  '/creators/forget-pass',
  '/creators/forget-pass/reset',
  '/creators/apply',
  '/creators/requested'
]

export const APP_DEFAULT_GUEST_PATHS= [
  ...new Set([
    ...APP_DEFAULT_CREATOR_GUEST_PATHS,
    ...APP_DEFAULT_BRAND_GUEST_PATHS
  ])
]

export const DONT_ALLOW_LOADING_SCREEN_PATHS = [
  '/creators/finish-up',
  '/',
  ...APP_DEFAULT_GUEST_PATHS
]

export const APP_DEFAULT_CREATOR_AUTH_PATHS = [
  '/creator',
  '/creator/settings',
  '/creator/settings/password',
  '/creator/settings/social',
  '/creator/settings/notifications',
  '/creator/settings/delete-account'
]
export const APP_DEFAULT_BRAND_AUTH_PATHS = [
  '/brands/verify-email',
  '/brand',
  '/brand/settings',
  '/brand/settings/password',
  '/brand/settings/social',
  '/brand/settings/notifications',
  '/brand/settings/delete-account'
]
export const APP_DEFAULT_AUTH_PATHS = [
  ...APP_DEFAULT_CREATOR_AUTH_PATHS,
  ...APP_DEFAULT_BRAND_AUTH_PATHS
]

// ==============================|| APP CONFIG ||============================== //

const config = {}

export default config
