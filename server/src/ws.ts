import type { Context } from 'hono'
import type { WSEvents } from 'hono/ws'

export const wsHandler = (c: Context): WSEvents | Promise<WSEvents> => ({
  onOpen: (evt, ws) => {
    ws.send('Hello World!')
  },
  onMessage: (evt, ws) => {
    ws.send('Hello World!')
  },
  onClose: (evt, ws) => {},
  onError: (evt, ws) => {},
})
