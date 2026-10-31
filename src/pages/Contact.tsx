import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Github, Instagram, Linkedin, Send } from 'lucide-react'
import { profile } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { reveal } from '../components/reveal'

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
        eyebrow="THE NEXT TAB COULD BE A CONVERSATION"
        title={
          <>
            Have a good idea?
            <br />
            <span className="gradient-text">Let's talk.</span>
          </>
        }
        sub="For collaborations, project ideas, opportunities or a simple hello. My inbox is open."
      />

      <motion.section className="wrap contact-layout" {...reveal()}>
        {/* Left: email + social links */}
        <div className="contact-main">
          <div className="contact-email">
            <span className="mono">EMAIL ME DIRECTLY</span>
            <a href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={20} />
            </a>
            <button className="copy-button" onClick={copyEmail}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>

          <div className="contact-socials">
            <span className="mono">FIND ME ONLINE</span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github />
              GitHub
              <ArrowUpRight size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin />
              LinkedIn
              <ArrowUpRight size={15} />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              <Instagram />
              Instagram
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Right: contact form card (opens an external Google Form) */}
        <div className="contact-form-card">
          <div className="form-icon">
            <Send size={22} />
          </div>
          <h3>Prefer a contact form?</h3>
          <p>
            Use the short form and share a little about what you have in mind. It opens the
            contact form configured for this portfolio.
          </p>
          <a className="button button-primary" href={profile.form} target="_blank" rel="noreferrer">
            Open contact form <ArrowUpRight size={16} />
          </a>
          <span className="mono form-note">EXTERNAL GOOGLE FORM</span>
        </div>
      </motion.section>
    </Layout>
  )
}
