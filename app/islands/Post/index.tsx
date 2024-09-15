import { useState } from 'hono/jsx'
import { hc } from 'hono/client'
import { AddType } from '../../routes/api'
import { reqSchema } from '../../common/zod'

const client = hc<AddType>('/api/')

const Post = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<string[]>([])

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    const parsed = reqSchema.safeParse(value)
    if (!parsed.success) {
      setError('１文字以上１４０文字以内で入力して下さい。')
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

  const handleChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setValue(e.target.value)
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
