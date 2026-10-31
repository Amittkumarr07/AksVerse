import { useState, type FormEvent } from 'react'
import { profile } from '../data'
import { HiddenHead } from '../components/HiddenHead'

const PROMPT = 'visitor@aksverse:~$'

/** What each command prints. `clear` and `github` are handled separately below. */
const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  about       A short introduction',
    '  projects    List selected projects',
    '  skills      Show the current toolkit',
    '  contact     Get in touch',
    '  github      Open GitHub profile',
    '  clear       Clear the terminal',
    '  date        Show the current year',
  ],
  about: [
    'Amit Kumar — CSE student, front-end developer and video editor.',
    'Currently studying at Government Polytechnic Raghopur, Supaul.',
  ],
  projects: ['01  AksVerse Portfolio', '02  Buyit E-commerce', '03  Simple Calculator in C'],
  skills: [
    'HTML · CSS · JavaScript · C · Python',
    'Currently exploring data structures and algorithms in C.',
  ],
  contact: ['Email: ' + profile.email, 'LinkedIn: linkedin.com/in/amittkumar7'],
  date: ['2026 — keep building.'],
}

const WELCOME = [
  'AKSVR TERMINAL [VERSION 2.0.0]',
  'Type `help` to see the available commands.',
  '',
]

export function TerminalPage() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>(WELCOME)
  const [commandCount, setCommandCount] = useState(0)

  const runCommand = (event: FormEvent) => {
    event.preventDefault()

    const command = input.trim().toLowerCase()
    if (!command) return

    setCommandCount((count) => count + 1)

    // `clear` wipes the screen and stops here.
    if (command === 'clear') {
      setHistory(['Terminal cleared.', ''])
      setInput('')
      return
    }

    let output: string[]
    if (command === 'github') {
      output = ['Opening GitHub profile in a new tab…']
      window.open(profile.github, '_blank', 'noopener,noreferrer')
    } else {
      output = COMMANDS[command] || [
        'Command not found: ' + command,
        'Type `help` to see what is available.',
      ]
    }

    setHistory((lines) => [...lines, `${PROMPT} ${input}`, ...output, ''])
    setInput('')
  }

  // Colour lines differently: the user's commands vs. the welcome banner.
  const lineClass = (line: string) => {
    if (line.startsWith('visitor@')) return 'terminal-command'
    if (line.startsWith('AKSVR')) return 'terminal-welcome'
    return ''
  }

  return (
    <div className="hidden-page terminal-page">
      <HiddenHead
        label="HIDDEN SPACE / 001"
        title="A terminal for the curious."
        desc="A tiny command line interface. No server, no tricks. Just a few commands and a little personality."
      />

      <div className="terminal-window">
        <div className="terminal-bar">
          <div className="traffic">
            <i />
            <i />
            <i />
          </div>
          <span className="mono">visitor@aksverse: ~</span>
          <span className="mono">SESSION {String(commandCount).padStart(3, '0')}</span>
        </div>

        {/* Clicking anywhere in the body focuses the input */}
        <div
          className="terminal-body"
          onClick={() => document.getElementById('terminal-input')?.focus()}
        >
          {history.map((line, index) => (
            <div key={index} className={lineClass(line)}>
              {line || ' '}
            </div>
          ))}

          <form onSubmit={runCommand} className="terminal-form">
            <span>{PROMPT}</span>
            <input
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command"
            />
            <span className="terminal-cursor" />
          </form>
        </div>
      </div>

      <p className="terminal-hint mono">TRY: HELP · ABOUT · PROJECTS · SKILLS · CONTACT</p>
    </div>
  )
}
