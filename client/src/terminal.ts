import { Terminal } from '@xterm/xterm'

export function initTerminal() {
  const term = new Terminal()

  term.open(document.getElementById('terminal') as HTMLElement)

  term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

  term.onData((data) => {
    term.write(data)
  })
}
