import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface PageHeadProps {
  eyebrow: string
  title: ReactNode
  sub: string
}

/** The big heading block at the top of every inner page. */
export function PageHead({ eyebrow, title, sub }: PageHeadProps) {
  return (
    <section className="page-head wrap">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{sub}</p>
    </section>
  )
}
