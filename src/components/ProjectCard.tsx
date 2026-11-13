import type { PointerEvent } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../data'

interface ProjectCardProps {
  project: Project
  /** Put the preview on the right instead of the left. */
  flip?: boolean
}

/** "github.com/user/repo" or "theamitkumar.in" - shown in the fake browser bar. */
const shortUrl = (url: string) => url.replace(/^https?:\/\//, '')

export function ProjectCard({ project, flip = false }: ProjectCardProps) {
  // Tell the CSS where the pointer is, so the card can glow under the cursor.
  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`)
  }

  return (
    <article className={`project glass ${flip ? 'flip' : ''}`} onPointerMove={trackPointer}>
      {/* A small browser window standing in for a screenshot */}
      <div className={`project-preview tone-${project.tone}`}>
        <div className="browser">
          <div className="browser-bar">
            <span className="browser-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-url">{shortUrl(project.live ?? project.github)}</span>
          </div>
          {project.image ? (
            <img
              className="browser-shot"
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
            />
          ) : (
            <div className="browser-body">
              <span className="browser-mark">{project.mark}</span>
              <span className="browser-lines">
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="project-info">
        <p className="project-meta">
          {project.type}, {project.year}
        </p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <ul className="tag-row">
          {project.stack.map((tech) => (
            <li className="tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-links">
          <a className="pill-link" href={project.github} target="_blank" rel="noreferrer">
            <Github size={15} /> Source code
          </a>
          {project.live && (
            <a className="pill-link" href={project.live} target="_blank" rel="noreferrer">
              Live site <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
