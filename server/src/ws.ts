import type { Context } from 'hono'
import type { WSEvents } from 'hono/ws'
import * as os from 'node:os'
import * as pty from 'node-pty'

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

const term = pty.spawn(shell, [], {
  name: 'xterm',
  cols: 100,
  handleFlowControl: true,
  env: process.env,
})

export const wsHandler = (c: Context): WSEvents | Promise<WSEvents> => ({
  onOpen: (evt, ws) => {
    console.log('Websocket connection opened')

    term.onData((data) => {
      const dataJson = JSON.stringify({ type: 'data', data })
      ws.send(dataJson)
    })
  },
  onMessage: (evt, ws) => {
    const data = JSON.parse(evt.data.toString())
    console.log(data)
    if (data.type === 'command') {
      term.write(data.data)
    }
  },
  onClose: (evt, ws) => {
    console.log('Websocket connection closed')
    term.clear()
  },
  onError: (evt, ws) => {
    console.log('Websocket error')
    term.clear()
  },
})
