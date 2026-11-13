import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data'
import { Brand } from './Brand'

export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Brand />
          <p>Building ideas into digital experiences.</p>
        </div>

        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AksVerse. Built with curiosity.</span>
        <span>Bihar, India</span>
      </div>
    </footer>
  )
}
