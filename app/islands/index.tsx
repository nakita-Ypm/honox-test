import { hc } from 'hono/client'
import { useState } from 'hono/jsx'
import { AddType } from '../routes/api'

const client = hc<AddType>('/api')

const Client = () => {
  const [message, setMessage] = useState('')

  const onSubmit = async () => {
    const res = await client.index.$get()
    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <>
      <h1>Get</h1>
      <button onClick={onSubmit}>Get Message</button>
      <h1>{message}</h1>
    </>
  )
}

export default Client
