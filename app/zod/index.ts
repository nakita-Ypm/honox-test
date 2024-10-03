import { z } from 'zod'

export const reqSchema = z.object({
  post: z.string().min(1).max(140),
})
