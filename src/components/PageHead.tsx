import type { ReactNode } from 'react'

interface PageHeadProps {
  /** Wrap the second line in <span className="dim"> to make it softer. */
  title: ReactNode
  sub: string
}

/** The big heading block at the top of every inner page. */
export function PageHead({ title, sub }: PageHeadProps) {
  return (
    <section className="page-head wrap">
      <h1>{title}</h1>
      <p>{sub}</p>
    </section>
  )
}
