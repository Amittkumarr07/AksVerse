import type { ReactNode } from 'react'

/** Small uppercase label with a glowing dot, shown above headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </div>
  )
}
