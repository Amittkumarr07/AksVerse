import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

export function NotFound() {
  return (
    <Layout>
      <section className="not-found wrap">
        <p className="contact-label">Error 404</p>
        <h1>
          This page wandered
          <br />
          <span className="dim">off the map.</span>
        </h1>
        <p>That address doesn't lead anywhere on this site.</p>
        <Link className="button button-primary" to="/">
          Back to home
        </Link>
      </section>
    </Layout>
  )
}
