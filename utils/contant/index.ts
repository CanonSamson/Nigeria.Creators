export const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@medvive.ng'
export const EMAILS_FROM = {
  noreply: EMAIL_FROM,
  creator: 'creator@nigeriacreators.com.ng',
  brand: 'brand@nigeriacreators.com.ng',
  wallet: 'wallet@nigeriacreators.com.ng',
  system: 'system@nigeriacreators.com.ng',
  onboarding: 'onboarding@nigeriacreators.com.ng',
  consumer: 'consumer@nigeriacreators.com.ng',
  waitlist: 'waitlist@nigeriacreators.com.ng',

}

export type EmailFrom = keyof typeof EMAILS_FROM