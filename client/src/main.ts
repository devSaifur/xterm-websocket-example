import './style.css'
import '@xterm/xterm/css/xterm.css'

import { initTerminal } from './terminal.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="terminal"></div>
  </div>
`

initTerminal()
