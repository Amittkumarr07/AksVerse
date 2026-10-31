import { useEffect, useState } from 'react'
import { Check, Command, Sparkles } from 'lucide-react'
import { HiddenHead } from '../components/HiddenHead'

const CLUES = [
  { n: 1, title: 'The classic', desc: 'Try the keyboard shortcut: ↑ ↑ ↓ ↓ ← → ← → B A' },
  { n: 2, title: 'The little detail', desc: 'The logo is a tiny monogram, not just a letter.' },
  {
    n: 3,
    title: 'The hidden route',
    desc: 'You found a page that is intentionally absent from the menu.',
  },
]

/** The Konami code, written as one letter per key (u/d/l/r = arrows). */
const KONAMI = 'uuddlrlrba'

const KEY_TO_LETTER: Record<string, string> = {
  arrowup: 'u',
  arrowdown: 'd',
  arrowleft: 'l',
  arrowright: 'r',
  b: 'b',
  a: 'a',
}

export function EasterPage() {
  const [found, setFound] = useState<number[]>([])
  const [konamiShown, setKonamiShown] = useState(false)

  const uncover = (n: number) => {
    setFound((current) => (current.includes(n) ? current : [...current, n]))
  }

  // Listen for the Konami code while this page is open.
  useEffect(() => {
    let recentKeys = ''

    const onKeyDown = (event: KeyboardEvent) => {
      const letter = KEY_TO_LETTER[event.key.toLowerCase()] || ''
      recentKeys = (recentKeys + letter).slice(-KONAMI.length)

      if (recentKeys === KONAMI) {
        setKonamiShown(true)
        uncover(1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="hidden-page">
      <HiddenHead
        label="HIDDEN SPACE / 003"
        title="A few things are hidden."
        desc="A small collection of details for people who explore instead of just scrolling. Nothing serious. That's the point."
      />

      <div className="egg-grid">
        {CLUES.map((clue) => {
          const isFound = found.includes(clue.n)

          return (
            <button
              className={`egg-card ${isFound ? 'found' : ''}`}
              key={clue.n}
              onClick={() => uncover(clue.n)}
            >
              <span className="mono">SECRET 0{clue.n}</span>
              <div className="egg-symbol">{isFound ? <Check size={25} /> : <Command size={25} />}</div>
              <h3>{clue.title}</h3>
              <p>{isFound ? clue.desc : 'Click to uncover this detail.'}</p>
              <span className="egg-status">{isFound ? 'DISCOVERED' : 'UNDISCOVERED'}</span>
            </button>
          )
        })}
      </div>

      {konamiShown && (
        <div className="secret-message">
          <Sparkles size={18} />
          <p>Konami code detected. You have excellent keyboard instincts.</p>
        </div>
      )}

      <div className="egg-progress">
        <span className="mono">DISCOVERED</span>
        <strong>{found.length} / 3</strong>
        <div className="progress-track">
          <i style={{ width: `${(found.length / CLUES.length) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
