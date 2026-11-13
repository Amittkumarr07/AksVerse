import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Instagram, Linkedin, Send } from 'lucide-react'
import { profile } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Layout>
      <PageHead
        title={
          <>
            Have a good idea?
            <br />
            <span className="dim">Let's talk.</span>
          </>
        }
        sub="For collaborations, project ideas, opportunities or a simple hello. My inbox is open."
      />

      <section className="wrap contact-layout">
        {/* Left: email + social links */}
        <div className="contact-main">
          <p className="contact-label">Email me directly</p>
          <a className="contact-email-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button className="pill-link copy-button" onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy email'}
          </button>

          <p className="contact-label">Find me online</p>
          <div className="contact-socials">
            <a className="pill-link" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a className="pill-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a className="pill-link" href={profile.instagram} target="_blank" rel="noreferrer">
              <Instagram size={16} /> Instagram
            </a>
          </div>
        </div>

        {/* Right: contact form card (opens an external Google Form) */}
        <div className="contact-form-card glass">
          <span className="form-icon">
            <Send size={20} />
          </span>
          <h3>Prefer a contact form?</h3>
          <p>Share a little about what you have in mind with a short form.</p>
          <a className="button button-primary" href={profile.form} target="_blank" rel="noreferrer">
            Open contact form <ArrowUpRight size={16} />
          </a>
          <span className="form-note">Opens Google Forms in a new tab.</span>
        </div>
      </section>
    </Layout>
  )
}
