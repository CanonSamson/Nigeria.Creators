import { Elysia, t } from 'elysia'
import { supabaseService } from '@/utils/supabase/services'
import crypto from 'crypto'

type OtpRecord = {
  email: string
  otp: string
  createdAt: string
  expiresAt: string
}

type OtpRepo = {
  insert: (rec: OtpRecord) => Promise<void>
  getByEmail: (email: string) => Promise<OtpRecord | null>
  deleteByEmail: (email: string) => Promise<void>
}

const repo: OtpRepo = {
  insert: async rec => {
    await supabaseService.client.from('email_verification_otps').delete().eq('email', rec.email)
    const { error } = await supabaseService.client
      .from('email_verification_otps')
      .insert(rec)
    if (error) throw new Error(error.message)
  },
  getByEmail: async email => {
    const { data, error } = await supabaseService.client
      .from('email_verification_otps')
      .select('*')
      .eq('email', email)
      .limit(1)
    if (error) throw new Error(error.message)
    const row = Array.isArray(data) && data.length > 0 ? (data[0] as OtpRecord) : null
    return row
  },
  deleteByEmail: async email => {
    const { error } = await supabaseService.client
      .from('email_verification_otps')
      .delete()
      .eq('email', email)
    if (error) throw new Error(error.message)
  }
}

const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e)
const isValidOtp = (o: string) => /^\d{6}$/.test(o)

export const generateOtp = async (email: string, now: Date, r: OtpRepo = repo) => {
  const e = email.trim().toLowerCase()
  if (!isValidEmail(e)) return { ok: false, status: 400, error: 'Invalid email' }
  const otp = String(crypto.randomInt(100000, 1000000))
  const createdAt = now.toISOString()
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000).toISOString()
  await r.insert({ email: e, otp, createdAt, expiresAt })
  return { ok: true, status: 200, data: { email: e } }
}

export const verifyOtp = async (email: string, otp: string, now: Date, r: OtpRepo = repo) => {
  const e = email.trim().toLowerCase()
  const o = otp.trim()
  if (!isValidEmail(e) || !isValidOtp(o)) return { ok: false, status: 400, error: 'Invalid parameters' }
  const rec = await r.getByEmail(e)
  if (!rec) return { ok: false, status: 401, error: 'Incorrect OTP' }
  if (rec.otp !== o) return { ok: false, status: 401, error: 'Incorrect OTP' }
  if (new Date(rec.expiresAt).getTime() < now.getTime()) return { ok: false, status: 403, error: 'Expired OTP' }
  await r.deleteByEmail(e)
  return { ok: true, status: 200, data: { email: e } }
}

export const verifyUserEmailRoutes = new Elysia()
  .post('/generate-otp', async ({ body, set }) => {
    const email = String((body as any)?.email || '').trim()
    const res = await generateOtp(email, new Date())
    set.status = res.status
    if (!res.ok) return { success: false, error: res.error }
    return { success: true }
  }, {
    body: t.Object({ email: t.String() })
  })
  .post('/verify-otp', async ({ body, set }) => {
    const email = String((body as any)?.email || '').trim()
    const otp = String((body as any)?.otp || '').trim()
    const res = await verifyOtp(email, otp, new Date())
    set.status = res.status
    if (!res.ok) return { success: false, error: res.error }
    return { success: true }
  }, {
    body: t.Object({ email: t.String(), otp: t.String() })
  })

export const verifyUserEmailDocs = {
  endpoints: [
    {
      path: '/api/generate-otp',
      method: 'POST',
      request: { email: 'user@example.com' },
      responses: {
        200: { success: true },
        400: { success: false, error: 'Invalid email' }
      }
    },
    {
      path: '/api/verify-otp',
      method: 'POST',
      request: { email: 'user@example.com', otp: '123456' },
      responses: {
        200: { success: true },
        400: { success: false, error: 'Invalid parameters' },
        401: { success: false, error: 'Incorrect OTP' },
        403: { success: false, error: 'Expired OTP' }
      }
    }
  ]
}

