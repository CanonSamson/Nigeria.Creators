// ==============================|| APP CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/'
export const APP_DEFAULT_GUEST_PATHS = [
  '/creators/finish-up',
  '/creators/login',
  '/creators/forget-pass',
  '/creators/forget-pass/reset'
]

export const DONT_ALLOW_LOADING_SCREEN_PATHS = [
  '/creators/finish-up',
  '/',
  ...APP_DEFAULT_GUEST_PATHS
]

export const APP_DEFAULT_AUTH_PATHS = [
  '/creator',
  '/creator/settings',
  '/creator/settings/password',
  '/creator/settings/social',
  '/creator/settings/notifications',
  '/creator/settings/delete-account'
]

// ==============================|| APP CONFIG ||============================== //

const config = {}

export default config
