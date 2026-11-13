/**
 * All the editable content of the portfolio lives in this file.
 * Change text, links or add items here and every page updates automatically.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BriefcaseBusiness,
  Braces,
  Cpu,
  GraduationCap,
  Globe2,
  Palette,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Profile & links
// ---------------------------------------------------------------------------
export const profile = {
  name: 'Amit Kumar',
  email: 'amitkumar9110311@gmail.com',
  github: 'https://github.com/Amittkumarr07',
  linkedin: 'https://www.linkedin.com/in/amittkumar7',
  instagram: 'https://www.instagram.com/amitt_kumar_7',
  form: 'https://forms.gle/NsfsUWU5ZkCr9MzB7',
}

// ---------------------------------------------------------------------------
// Navigation (label, path)
// ---------------------------------------------------------------------------
export const nav: [label: string, path: string][] = [
  ['About', '/about'],
  ['Projects', '/projects'],
  ['Experience', '/experience'],
  ['Certificates', '/certificates'],
  ['Contact', '/contact'],
]

// ---------------------------------------------------------------------------
// Projects
// `tone` picks the colour of the project card art: 'violet' | 'blue' | 'pink'
// `live` is optional - leave it out when a project has no hosted version.
// `image` is optional - a screenshot saved in the `public/projects/` folder,
//   e.g. image: '/projects/aksverse.png'. Without it, a placeholder is shown.
// ---------------------------------------------------------------------------
export interface Project {
  title: string
  type: string
  year: string
  description: string
  stack: string[]
  github: string
  live?: string
  image?: string
  mark: string
  tone: 'violet' | 'blue' | 'pink'
  number: string
}

export const projects: Project[] = [
  {
    title: 'AksVerse',
    type: 'Personal portfolio',
    year: '2026',
    description:
      'A responsive personal portfolio with custom themes, motion and a small digital playground.',
    stack: ['React', 'TypeScript', 'CSS'],
    github: 'https://github.com/Amittkumarr07/AksVerse',
    live: 'https://theamitkumar.in',
    image: '/projects/aksverse.png', 
    mark: 'A/',
    tone: 'violet',
    number: '01',
  },
  {
    title: 'Buyit',
    type: 'E-commerce experience',
    year: '2026',
    description:
      'An interactive e-commerce web application built from scratch, exploring front-end state and third-party API integration.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Amittkumarr07/Buyit',
    live: 'https://amittkumarr07.github.io/Buyit',
    image: '/projects/buyit.png',
    mark: 'B.',
    tone: 'blue',
    number: '02',
  },
  {
    title: 'Simple Calculator',
    type: 'C programming',
    year: '2025',
    description:
      'A command-line calculator handling the four core arithmetic operations with basic input and control flow.',
    stack: ['C', 'CLI'],
    github: 'https://github.com/Amittkumarr07/Simple-calculator',
    mark: '+−',
    tone: 'pink',
    number: '03',
  },
]

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------
export interface Certificate {
  title: string
  issuer: string
  date: string
  url: string
  tag: string
}

export const certificates: Certificate[] = [
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'March 2026',
    url: 'https://drive.google.com/file/d/1BJT2VEJ16rqidTtsv-nPBJXA5o8P_ZrZ/view?usp=drivesdk',
    tag: 'Security',
  },
  {
    title: '2nd Year Internship',
    issuer: 'Tata Motors',
    date: 'July 2026',
    url: 'https://drive.google.com/file/d/1T7KHaY__vCw7gqhrmDyDNO4qZYwUaRsA/view?usp=drivesdk',
    tag: 'Experience',
  },
  {
    title: '1st Year Rank',
    issuer: 'Govt. Polytechnic Raghopur, Supaul',
    date: '15 August 2026',
    url: 'https://drive.google.com/file/d/1PMWRA9GhsoEdLuBesFfVD3J_jywL0Ynm/view?usp=drivesdk',
    tag: 'Achievement',
  },
  {
    title: 'Web Technology',
    issuer: 'State Board of Technical Education, Bihar',
    date: 'January 2026',
    url: 'https://drive.google.com/file/d/1xVsskvdO_MdWraIfDVA3SD_SXMENlk5v/view?usp=drivesdk',
    tag: 'Web',
  },
  {
    title: 'C Programming',
    issuer: 'State Board of Technical Education, Bihar',
    date: 'March 2026',
    url: 'https://drive.google.com/file/d/1vbfNjIehzxhpXeldcPNMzduxjz30cPKG/view?usp=drivesdk',
    tag: 'Programming',
  },
]

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
export interface Skill {
  title: string
  items: string[]
  icon: LucideIcon
  note: string
}

export const skills: Skill[] = [
  {
    title: 'Web development',
    items: ['HTML5', 'CSS3', 'JavaScript'],
    icon: Globe2,
    note: 'Interfaces, responsive layouts and browser-side logic.',
  },
  {
    title: 'Programming',
    items: ['C', 'Python'],
    icon: Braces,
    note: 'Building a stronger foundation in programming fundamentals.',
  },
  {
    title: 'Core computer science',
    items: ['Data structures', 'Algorithms'],
    icon: Cpu,
    note: 'Learning problem-solving and implementation in C.',
  },
  {
    title: 'Creative work',
    items: ['Video editing', 'Visual design'],
    icon: Palette,
    note: 'A second lens for storytelling and digital experiences.',
  },
]

// ---------------------------------------------------------------------------
// Experience timeline
// ---------------------------------------------------------------------------
export interface TimelineEntry {
  date: string
  title: string
  place: string
  icon: LucideIcon
  desc: string
}

export const timeline: TimelineEntry[] = [
  {
    date: '2025 – present',
    title: 'Diploma in Computer Science & Engineering',
    place: 'Government Polytechnic Raghopur, Supaul · SBTE Bihar',
    icon: GraduationCap,
    desc: 'Studying computer science fundamentals, programming, web technologies and problem-solving.',
  },
  {
    date: 'June – July 2026',
    title: 'Second-year internship',
    place: 'Tata Motors',
    icon: BriefcaseBusiness,
    desc: 'Hands-on internship applying core engineering and technical skills in an industry setting.',
  },
  {
    date: '2023 – 2025',
    title: 'Matriculation · Class IX & X',
    place: 'Dini International School, Gaya · CBSE Delhi',
    icon: Award,
    desc: 'Completed school education before beginning a diploma in Computer Science & Engineering.',
  },
]
