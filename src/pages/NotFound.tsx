import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="not-found wrap">
      <span className="mono">ERROR / 404</span>
      <h1>
        This page wandered
        <br />
        <span className="gradient-text">off the map.</span>
      </h1>
      <p>The URL doesn't point to anything here.</p>
      <Link className="button button-primary" to="/">
        Back to home <ArrowLeft size={16} />
      </Link>
    </div>
  )
}
