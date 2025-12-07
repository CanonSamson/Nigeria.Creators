import { Elysia, t } from 'elysia'
import { waitEmailRoutes } from '@/app/api/_routes/waitEmail'
import { applyAsCreatorRoutes } from '@/app/api/_routes/applyAsCreator'
import { metricsRoutes } from '@/app/api/_routes/metrics'
import { listOfCreatorsRoutes } from '@/app/api/_routes/listOfCreators'
import { verifyUserEmailRoutes } from '@/app/api/_routes/verifyUserEmail'

const app = new Elysia({ prefix: '/api' })
  .get('/', 'Hello Nigeria Creators')
  .post('/', ({ body }) => body, {
    body: t.Object({
      name: t.String()
    })
  })
  .use(waitEmailRoutes)
  .use(applyAsCreatorRoutes)
  .use(metricsRoutes)
  .use(listOfCreatorsRoutes)
  .use(verifyUserEmailRoutes)

export const GET = app.fetch
export const POST = app.fetch
