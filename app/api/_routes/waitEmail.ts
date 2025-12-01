import { Elysia, t } from 'elysia'
import { sendEmail } from '@/utils/emailService'

export const waitEmailRoutes = new Elysia()
  .post(
    '/wait-email',
    async ({ body, set }) => {
      try {
        const email = String(body?.values?.email || body?.email || '')
          .trim()
          .toLowerCase()

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          set.status = 400
          return { success: false, error: 'Invalid email' }
        }

        await sendEmail(
          email,
          'Waitlist Confirmation',
          'waitlist-confirmation',
          {},
          'waitlist'
        )

        return { success: true }
      } catch (error) {
        set.status = 500
        return { success: false, error: (error as Error).message }
      }
    },
    {
      body: t.Object({
        values: t.Optional(
          t.Object({
            email: t.Optional(t.String())
          })
        ),
        email: t.Optional(t.String())
      })
    }
  )

