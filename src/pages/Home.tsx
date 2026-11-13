import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { certificates, projects } from '../data'
import { Layout } from '../components/Layout'
import { ProjectCard } from '../components/ProjectCard'
import { SkillList } from '../components/SkillList'

/** Words that rotate inside the intro sentence. */
const ROLES = ['developer', 'designer', 'video editor']
const ROLE_CHANGE_MS = 2600

/** How the glass lens glides after the pointer. */
const LENS_SPRING = { type: 'spring', stiffness: 90, damping: 20, mass: 0.9 } as const

/** Page-load sequence: each piece comes into focus a little after the last. */
const focusIn = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(14px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: 'easeOut' as const },
})

export function Home() {
  const [roleIndex, setRoleIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const lensX = useMotionValue(0)
  const lensY = useMotionValue(0)

  // Swap the highlighted role word every few seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length)
    }, ROLE_CHANGE_MS)
    return () => window.clearInterval(timer)
  }, [])

  /** The lens rests slightly off-centre over the glowing sphere. */
  const restPosition = () => {
    const hero = heroRef.current?.getBoundingClientRect()
    const sphere = sphereRef.current?.getBoundingClientRect()
    if (!hero || !sphere) return { x: 0, y: 0 }
    return {
      x: sphere.left - hero.left + sphere.width * 0.52,
      y: sphere.top - hero.top + sphere.height * 0.92,
    }
  }

  const placeLensAtRest = () => {
    const rest = restPosition()
    lensX.set(rest.x)
    lensY.set(rest.y)
  }

  useLayoutEffect(() => {
    placeLensAtRest()
    window.addEventListener('resize', placeLensAtRest)
    return () => window.removeEventListener('resize', placeLensAtRest)
  }, [])

  // The lens follows the pointer while it is over the hero (not on touch / reduced motion).
  const followPointer = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return
    const hero = event.currentTarget.getBoundingClientRect()
    animate(lensX, event.clientX - hero.left, LENS_SPRING)
    animate(lensY, event.clientY - hero.top, LENS_SPRING)
  }

  const returnToRest = () => {
    const rest = restPosition()
    animate(lensX, rest.x, LENS_SPRING)
    animate(lensY, rest.y, LENS_SPRING)
  }

  return (
    <Layout>
      {/* ------------------------------------------------------------------ */}
      {/* Hero: the name, a glowing sphere and a glass lens that follows you */}
      {/* ------------------------------------------------------------------ */}
      <section className="hero wrap" ref={heroRef} onPointerMove={followPointer} onPointerLeave={returnToRest}>
        <div className="hero-sphere" ref={sphereRef} aria-hidden />
        <motion.div className="hero-lens" style={{ x: lensX, y: lensY }} aria-hidden />

        <div className="hero-copy">
          <h1 className="hero-name">
            <motion.span className="name-part" {...focusIn(0.05)}>
              Amit
            </motion.span>
            <motion.span className="name-part" {...focusIn(0.2)}>
              Kumar
            </motion.span>
          </h1>

          <motion.h2 className="hero-tagline" {...focusIn(0.45)}>
            Ideas into digital things.
          </motion.h2>

          <motion.p className="hero-lede" {...focusIn(0.6)}>
            CSE student and <span className="role-word">{ROLES[roleIndex]}</span> from Bihar, exploring the space
            between thoughtful design and useful code.
          </motion.p>

          <motion.div className="hero-buttons" {...focusIn(0.75)}>
            <Link className="button button-primary" to="/projects">
              See my work
            </Link>
            <Link className="button button-quiet" to="/about">
              About me
            </Link>
          </motion.div>
        </div>

        {/* Quick facts - the counts update automatically from data.ts */}
        <motion.div className="hero-stats glass" {...focusIn(0.95)}>
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
            <span>Internship, 2026</span>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Intro                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="section wrap intro">
        <p className="intro-text">
          Currently studying Computer Science & Engineering at{' '}
          <strong>Government Polytechnic Raghopur, Supaul.</strong> I like turning ideas into clean, useful
          experiences.
        </p>
        <Link className="text-link" to="/about">
          More about me <ArrowUpRight size={16} />
        </Link>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Selected work                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="section wrap">
        <div className="section-heading">
          <h2>Selected work</h2>
          <Link className="text-link" to="/projects">
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="project-list">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard key={project.title} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Toolkit                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="section wrap">
        <div className="section-heading">
          <h2>Toolkit</h2>
          <Link className="text-link" to="/about">
            More about my skills <ArrowUpRight size={16} />
          </Link>
        </div>
        <SkillList />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Closing call to action                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="section wrap">
        <div className="cta-panel glass">
          <h2>Have an idea? Let's build it.</h2>
          <p>A project, a collaboration, or just a conversation about building things.</p>
          <Link className="button button-primary" to="/contact">
            Get in touch
          </Link>
        </div>
      </section>
    </Layout>
  )
}
