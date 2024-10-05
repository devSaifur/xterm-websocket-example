import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'

export function initTerminal() {
  const terminalElement = <HTMLElement>document.getElementById('terminal')
  const ws = new WebSocket('ws://localhost:3000')

  ws.onopen = () => {
    console.log('WebSocket connection opened')
    ws.send(JSON.stringify({ type: 'command', data: '\n' }))
  }

  const term = new Terminal({
    cursorBlink: true,
    fontFamily: 'monospace',
    fontSize: 14,
    theme: {
      background: '#1e1e1e',
    },
  })
  const fitAddon = new FitAddon()

  term.loadAddon(fitAddon)
  term.open(terminalElement)
  term.focus()
  fitAddon.fit()
  term.element?.style.setProperty('padding', '0px 10px')

  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data)
    if (data.type === 'data') {
      term.write(data.data)
    }
  }

  term.onKey((e) => {
    const data = JSON.stringify({ type: 'command', data: e.key })
    ws.send(data)
  })

  window.addEventListener('resize', () => {
    fitAddon.fit()
    term.focus()
  })
}
