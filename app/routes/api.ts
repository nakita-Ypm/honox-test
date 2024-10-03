import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { reqSchema } from '../zod'
import { ReqType } from '../types'

const app = new Hono()
  .get('/', async (c) => {
    return c.json({ message: 'HonoX🔥' })
  })
  .post(
    '/posts',
    validator('json', (value: ReqType, c) => {
      const parsed = reqSchema.safeParse(value)
      if (!parsed.success) {
        return c.json({ message: 'Bad Request' }, 400)
      }
      return parsed.data
    }),
    (c) => {
      const res = c.req.valid('json')

      return c.json(
        {
          message: 'Created',
          post: res.post,
        },
        201,
      )
    },
  )

export type AddType = typeof app
export default app
