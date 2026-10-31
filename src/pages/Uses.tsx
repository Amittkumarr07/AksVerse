import { Check, Coffee, Code2, Cpu, Layers3, Video } from 'lucide-react'
import { HiddenHead } from '../components/HiddenHead'

const GROUPS = [
  {
    title: 'Languages & web',
    icon: Code2,
    items: ['JavaScript', 'HTML5', 'CSS3', 'C', 'Python'],
  },
  {
    title: 'Development approach',
    icon: Layers3,
    items: [
      'Responsive-first thinking',
      'Vanilla web fundamentals',
      'Component-based UI',
      'Git & GitHub',
    ],
  },
  {
    title: 'Creative tools',
    icon: Video,
    items: ['Video editing software', 'Visual references', 'Typography & layout'],
  },
  {
    title: 'Learning focus',
    icon: Cpu,
    items: ['Data structures & algorithms', 'Programming fundamentals', 'Front-end engineering'],
  },
]

export function UsesPage() {
  return (
    <div className="hidden-page">
      <HiddenHead
        label="HIDDEN SPACE / 004"
        title="The things behind the work."
        desc="A living list of tools, habits and topics that are part of my current setup. It will change as I learn more."
      />

      <div className="uses-grid">
        {GROUPS.map((group) => (
          <div className="uses-card" key={group.title}>
            <group.icon size={22} />
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  {item}
                  <Check size={14} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="uses-note">
        <Coffee size={18} />
        <p>This page describes my current working toolkit, not a claim of mastery in every item.</p>
      </div>
    </div>
  )
}
