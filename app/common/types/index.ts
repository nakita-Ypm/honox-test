import { z } from 'zod'
import { reqSchema } from '../zod'

export type ReqType = z.infer<typeof reqSchema>
