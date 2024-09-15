import { createRoute } from 'honox/factory'
import Client from '../islands'
import Post from '../islands/Post'

export default createRoute((c) => {
  return c.render(
    <>
      <h1>HonoX</h1>
      <Client />
      <Post />
    </>,
  )
})
