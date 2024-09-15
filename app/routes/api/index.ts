import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { reqSchema } from '../../common/zod'
import { ReqType } from '../../common/types'

const app = new Hono()
  .get('/', async (c) => {
    return c.json({ message: 'HonoX🔥' })
  })
  .post(
    '/posts',
    validator('json', (value: ReqType, c) => {
      const parsed = reqSchema.safeParse(value)
      if (!parsed.success) {
        return c.json({ message: 'Bad Request', error: '１文字以上１４０文字以内で入力して下さい。' }, 400)
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
