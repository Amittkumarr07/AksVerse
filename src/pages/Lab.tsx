import { useState, type CSSProperties } from 'react'
import { Zap } from 'lucide-react'
import { HiddenHead } from '../components/HiddenHead'

// Default values - also used by the "Reset experiment" button.
const DEFAULT_HUE = 275
const DEFAULT_TEXT = 'Curiosity is a feature.'

export function LabPage() {
  const [glow, setGlow] = useState(true)
  const [orbitMotion, setOrbitMotion] = useState(true)
  const [hue, setHue] = useState(DEFAULT_HUE)
  const [text, setText] = useState(DEFAULT_TEXT)

  const reset = () => {
    setGlow(true)
    setOrbitMotion(true)
    setHue(DEFAULT_HUE)
    setText(DEFAULT_TEXT)
  }

  return (
    <div className="hidden-page">
      <HiddenHead
        label="Hidden page 2"
        title="The experiment lab."
        desc="A small sandbox for visual ideas. Change a few parameters and see what happens."
      />

      <div className="lab-layout">
        {/* Live preview - the --hue CSS variable drives all of its colours */}
        <div
          className={`lab-preview ${glow ? 'glow-on' : ''} ${orbitMotion ? 'motion-on' : ''}`}
          style={{ '--hue': hue } as CSSProperties}
        >
          <div className="lab-grid-bg" />
          <div className="lab-orbit lab-orbit-a" />
          <div className="lab-orbit lab-orbit-b" />
          <div className="lab-preview-core">
            a<span>.</span>
          </div>
          <div className="lab-preview-label">Live preview</div>
          <div className="lab-preview-caption">{text}</div>
        </div>

        {/* Controls */}
        <div className="lab-controls">
          <span className="lab-controls-title">Controls</span>

          <label className="control-row">
            <span>Ambient glow</span>
            <button
              className={`toggle ${glow ? 'on' : ''}`}
              onClick={() => setGlow(!glow)}
              aria-label="Toggle ambient glow"
            >
              <i />
            </button>
          </label>

          <label className="control-row">
            <span>Orbital motion</span>
            <button
              className={`toggle ${orbitMotion ? 'on' : ''}`}
              onClick={() => setOrbitMotion(!orbitMotion)}
              aria-label="Toggle orbital motion"
            >
              <i />
            </button>
          </label>

          <div className="control-group">
            <label htmlFor="hue">
              Accent hue <strong>{hue}°</strong>
            </label>
            <input
              id="hue"
              type="range"
              min="220"
              max="330"
              value={hue}
              onChange={(event) => setHue(Number(event.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="lab-text">Canvas message</label>
            <input
              id="lab-text"
              className="text-control"
              value={text}
              maxLength={34}
              onChange={(event) => setText(event.target.value)}
            />
          </div>

          <button className="button button-quiet reset-button" onClick={reset}>
            Reset experiment <Zap size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
