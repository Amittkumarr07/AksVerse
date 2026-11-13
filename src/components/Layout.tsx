import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

/** Wraps every public page: scroll reset + page content + footer. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
    </>
  )
}
