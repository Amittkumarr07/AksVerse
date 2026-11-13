import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav } from '../data'
import { Brand } from './Brand'

interface HeaderProps {
  dark: boolean
  setDark: (value: boolean) => void
}

/** Floating glass pill with the logo, page links and theme toggle. */
export function Header({ dark, setDark }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the page changes.
  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className="header">
      <div className="nav-wrap glass">
        <Brand />

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {({ isActive }) => (
                <>
                  {/* The highlight slides between links when you change page */}
                  {isActive && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                  <span className="nav-label">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link to="/contact" className="nav-cta">
            Let's talk
          </Link>

          <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
