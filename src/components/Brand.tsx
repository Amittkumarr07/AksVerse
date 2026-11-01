import { Link } from 'react-router-dom'

/** Logo mark + site name. Used in both the header and the footer. */
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="AksVerse home">
      <span className="brand-mark">a.</span>
      <span className="brand-name">AksVerse</span>
    </Link>
  )
}
