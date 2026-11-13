import { ArrowUpRight } from 'lucide-react'
import { profile, projects } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { ProjectCard } from '../components/ProjectCard'

export function Projects() {
  return (
    <Layout>
      <PageHead
        title={
          <>
            Built with intent.
            <br />
            <span className="dim">Learned by doing.</span>
          </>
        }
        sub="A small collection of projects, experiments and practical learning. Each one taught me something worth keeping."
      />

      <section className="wrap projects-page">
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} flip={index % 2 === 1} />
          ))}
        </div>

        <p className="projects-note">
          These projects are a snapshot of my learning journey. More experiments are always in progress.{' '}
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            See GitHub <ArrowUpRight size={15} />
          </a>
        </p>
      </section>
    </Layout>
  )
}
