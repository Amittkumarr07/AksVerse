import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Github,
  Instagram,
  Linkedin,
  Palette,
  Play,
} from 'lucide-react'
import { certificates, profile, projects } from '../data'
import { Eyebrow } from '../components/Eyebrow'
import { Layout } from '../components/Layout'
import { ProjectCard } from '../components/ProjectCard'
import { SkillGrid } from '../components/SkillGrid'
import { reveal } from '../components/reveal'

/** Words that rotate inside the intro sentence. */
const ROLES = ['developer', 'designer', 'video editor']
const ROLE_CHANGE_MS = 2600

export function Home() {
  const [roleIndex, setRoleIndex] = useState(0)

  // Swap the highlighted role word every few seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length)
    }, ROLE_CHANGE_MS)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <Layout>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="hero wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <Eyebrow>INDEPENDENT MIND · BUILDING IN PUBLIC</Eyebrow>

            {/* The name is the main heading of the page */}
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {profile.name}
            </motion.h1>

            <motion.h2
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Ideas into <span className="gradient-text">digital things.</span>
            </motion.h2>

            <p className="hero-lede">
              CSE student and <span className="role-word">{ROLES[roleIndex]}</span> from Bihar,
              exploring the space between thoughtful design and useful code.
            </p>

            <div className="hero-buttons">
              <Link className="button button-primary" to="/projects">
                Explore my work <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-quiet" to="/about">
                More about me <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick facts - the counts update automatically from data.ts */}
            <div className="hero-stats">
              <div>
                <strong>{projects.length}</strong>
                <span>Projects</span>
              </div>
              <div>
                <strong>{certificates.length}</strong>
                <span>Certificates</span>
              </div>
              <div>
                <strong>Tata Motors</strong>
                <span>Internship · 2026</span>
              </div>
            </div>

            <div className="hero-social">
              <span className="mono">FIND ME ELSEWHERE</span>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Decorative card on the right */}
          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="visual-grid" />

            <div className="visual-top mono">
              <span>AK / 001</span>
              <span>CREATIVE DEVELOPER</span>
            </div>

            <div className="visual-center">
              <div className="visual-ring ring-a" />
              <div className="visual-ring ring-b" />
              <div className="visual-core">
                a<span>.</span>
              </div>
              <span className="float-chip chip-code">
                <Code2 size={14} /> CODE
              </span>
              <span className="float-chip chip-design">
                <Palette size={14} /> DESIGN
              </span>
              <span className="float-chip chip-edit">
                <Play size={13} /> EDIT
              </span>
            </div>

            <div className="visual-bottom">
              <span>CURIOUS BY DEFAULT</span>
            </div>
            <div className="visual-side mono">AKSVERSE / EST. 2026</div>
          </div>
        </div>

        <div className="hero-foot">
          <span className="scroll-cue">
            <ArrowDownRight size={15} /> SCROLL TO EXPLORE
          </span>
          <span className="mono">PORTFOLIO — 2026</span>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Intro strip                                                        */}
      {/* ------------------------------------------------------------------ */}
      <motion.section className="intro-strip" {...reveal()}>
        <div className="wrap intro-inner">
          <span className="mono">A LITTLE ABOUT ME</span>
          <p>
            Currently studying Computer Science & Engineering at{' '}
            <strong>Government Polytechnic Raghopur, Supaul.</strong> I like turning ideas into
            clean, useful experiences.
          </p>
          <Link to="/about">
            Get to know me <ArrowUpRight size={15} />
          </Link>
        </div>
      </motion.section>

      {/* ------------------------------------------------------------------ */}
      {/* Selected work                                                      */}
      {/* ------------------------------------------------------------------ */}
      <motion.section className="section wrap" {...reveal()}>
        <div className="section-heading">
          <div>
            <Eyebrow>SELECTED WORK</Eyebrow>
            <h2>
              Things I've <span className="gradient-text">put together.</span>
            </h2>
          </div>
          <Link className="text-link" to="/projects">
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="project-grid">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </motion.section>

      {/* ------------------------------------------------------------------ */}
      {/* Toolkit                                                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.section className="section skill-band" {...reveal()}>
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>THE TOOLKIT</Eyebrow>
              <h2>
                Curiosity, then <span className="gradient-text">craft.</span>
              </h2>
            </div>
            <Link className="text-link" to="/about">
              Explore skills <ArrowUpRight size={16} />
            </Link>
          </div>
          <SkillGrid />
        </div>
      </motion.section>

      {/* ------------------------------------------------------------------ */}
      {/* Call to action                                                     */}
      {/* ------------------------------------------------------------------ */}
      <motion.section className="cta-section wrap" {...reveal()}>
        <div className="cta-panel">
          <div className="cta-orb" />
          <Eyebrow>HAVE SOMETHING IN MIND?</Eyebrow>
          <h2>
            Let's make
            <br />
            <span className="gradient-text">it real.</span>
          </h2>
          <p>Have an idea, a project, or just want to talk about building things?</p>
          <Link className="button button-primary" to="/contact">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
          <span className="cta-index mono">AK / 2026</span>
        </div>
      </motion.section>
    </Layout>
  )
}
