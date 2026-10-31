import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { nav } from '../data'
import { Brand } from './Brand'

interface HeaderProps {
  dark: boolean
  setDark: (value: boolean) => void
}

export function Header({ dark, setDark }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the page changes.
  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className="header">
      <div className="nav-wrap">
        <Brand />

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link to="/contact" className="nav-cta">
            Let's talk <ArrowUpRight size={15} />
          </Link>

          <button
            className="icon-btn mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
