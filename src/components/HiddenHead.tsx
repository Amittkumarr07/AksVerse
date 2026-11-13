import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HiddenHeadProps {
  label: string
  title: string
  desc: string
}

/** Heading block used by the hidden pages (terminal, lab, easter eggs, uses). */
export function HiddenHead({ label, title, desc }: HiddenHeadProps) {
  return (
    <div className="hidden-head">
      <span className="hidden-label">{label}</span>
      <h1>{title}</h1>
      <p>{desc}</p>
      <Link to="/" className="hidden-back">
        <ArrowLeft size={14} /> Back to AksVerse
      </Link>
    </div>
  )
}
