import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { profile, projects } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { ProjectCard } from '../components/ProjectCard'
import { reveal } from '../components/reveal'

export function Projects() {
  return (
    <Layout>
      <PageHead
        eyebrow="SELECTED WORK · 2025—2026"
        title={
          <>
            Built with intent.
            <br />
            <span className="gradient-text">Learned by doing.</span>
          </>
        }
        sub="A small collection of projects, experiments and practical learning. Each one taught me something worth keeping."
      />

      <section className="wrap projects-page">
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div className="note-panel" {...reveal()}>
          <Sparkles size={19} />
          <p>
            These projects are a snapshot of my learning journey. More experiments are always in
            progress.
          </p>
          <a href={profile.github} target="_blank" rel="noreferrer">
            Explore GitHub <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </section>
    </Layout>
  )
}
