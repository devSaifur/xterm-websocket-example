import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { createNodeWebSocket } from '@hono/node-ws'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { wsHandler } from './ws'

const app = new Hono()

app.use(cors({ origin: '*' }))
app.use(logger())

const { upgradeWebSocket, injectWebSocket } = createNodeWebSocket({ app })

app.get('/', upgradeWebSocket(wsHandler))

const port = 3000
console.log(`Server is running on port ${port}`)

const server = serve({ fetch: app.fetch, port })

injectWebSocket(server)

export default server
