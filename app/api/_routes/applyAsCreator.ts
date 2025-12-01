import { Elysia, t } from 'elysia'
import { sendEmail } from '@/utils/emailService'

export const applyAsCreatorRoutes = new Elysia()
  .post(
    '/apply-as-creator',
    async ({ body, set }) => {
      try {
        const email = String(body?.values?.email || body?.email || '')
          .trim()
          .toLowerCase()
        const name = String(body?.values?.name || body?.name || '')
          .trim()
          .toLowerCase()

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          set.status = 400
          return { success: false, error: 'Invalid email' }
        }

        await sendEmail(
          email,
          'Thanks for Applying to Join Nigeria Creators',
          'apply-as-creator',
          { name },
          'onboarding'
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
            email: t.Optional(t.String()),
            name: t.Optional(t.String())
          })
        ),
        email: t.Optional(t.String()),
        name: t.Optional(t.String())
      })
    }
  )

