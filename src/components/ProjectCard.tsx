import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../data'
import { reveal } from './reveal'

interface ProjectCardProps {
  project: Project
  /** Position in the grid - used to stagger the reveal animation. */
  index?: number
}

/** "github.com/user/repo" or "theamitkumar.in" - shown in the fake browser bar. */
const shortUrl = (url: string) => url.replace(/^https?:\/\//, '')

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article className="project-card" {...reveal((index % 2) * 0.1)}>
      {/* Decorative art: a small browser window with the project's mark inside */}
      <div className={`project-art ${project.tone}`}>
        <span className="art-index">{project.number} / SELECTED WORK</span>
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />

        <div className="art-window">
          <div className="art-window-bar">
            <span className="art-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="art-url">{shortUrl(project.live ?? project.github)}</span>
          </div>
          <div className="art-window-body">
            <span className="art-mark">{project.mark}</span>
            <span className="art-lines">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        <span className="art-corner">
          <ArrowUpRight size={19} />
        </span>
      </div>

      <div className="project-info">
        <div className="project-meta">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="tag-row">
          {project.stack.map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer">
            <Github size={15} /> Source code <ArrowUpRight size={13} />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live site <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
