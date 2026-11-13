import { skills } from '../data'

/** All skills in one glass panel, one row per skill. Shared by Home and About. */
export function SkillList() {
  return (
    <div className="skill-list glass">
      {skills.map((skill) => (
        <div className="skill-row" key={skill.title}>
          <span className="skill-icon">
            <skill.icon size={20} />
          </span>

          <div className="skill-text">
            <h3>{skill.title}</h3>
            <p>{skill.note}</p>
          </div>

          <ul className="tag-row">
            {skill.items.map((item) => (
              <li className="tag" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
