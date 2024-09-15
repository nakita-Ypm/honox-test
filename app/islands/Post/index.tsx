import { useState } from 'hono/jsx'
import { hc } from 'hono/client'
import { AddType } from '../../routes/api'
import { reqSchema } from '../../common/zod'
import { ReqType } from '../../common/types'

const client = hc<AddType>('/api/')

const Post = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<string[]>([])

  const handleChange = (e: Event) => setValue(e.target instanceof HTMLInputElement ? e.target.value : value)

  const valueValidate = (value: string): string | null => {
    const parseValue: ReqType = { post: value }
    const result = reqSchema.safeParse(parseValue)
    if (!result.success) {
      return '１文字以上１４０文字以内で入力して下さい。'
    }
    return null
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    const valueValidateError = valueValidate(value)
    if (valueValidateError) {
      setError(valueValidateError)
      return
    }

    try {
      setError(null)
      const res = await client.posts
        .$post({
          json: { post: value },
        })
        .then((res) => res.json())

      const resMessage = res.post
      setPosts([...posts, resMessage])
      setValue('')
    } catch {
      setError('投稿に失敗しました')
    }
  }

  return (
    <div>
      <h1>Post</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
      {error && <h1>{error}</h1>}
      {posts.map((post, index) => (
        <p key={index}>{post}</p>
      ))}
    </div>
  )
}

export default Post
