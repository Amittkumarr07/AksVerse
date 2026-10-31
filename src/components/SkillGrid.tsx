import { skills } from '../data'

/** The four skill tiles, shared by the Home and About pages. */
export function SkillGrid() {
  return (
    <div className="skill-grid">
      {skills.map((skill) => (
        <div className="skill-tile" key={skill.title}>
          <skill.icon size={21} />
          <h3>{skill.title}</h3>
          <p>{skill.note}</p>
          <div className="tag-row">
            {skill.items.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
