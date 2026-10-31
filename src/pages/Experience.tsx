import { motion } from 'framer-motion'
import { timeline } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { reveal } from '../components/reveal'

export function Experience() {
  return (
    <Layout>
      <PageHead
        eyebrow="THE JOURNEY SO FAR"
        title={
          <>
            Experience is built
            <br />
            <span className="gradient-text">one step at a time.</span>
          </>
        }
        sub="A timeline of education, practical exposure and milestones that have shaped my learning."
      />

      <section className="wrap timeline">
        {timeline.map((entry, index) => {
          const isLast = index === timeline.length - 1

          return (
            <motion.div className="timeline-item" key={entry.title} {...reveal()}>
              <div className="timeline-rail">
                <span className="timeline-dot" />
                {!isLast && <span className="timeline-line" />}
              </div>

              <div className="timeline-content">
                <span className="mono timeline-date">{entry.date}</span>
                <div className="timeline-title">
                  <entry.icon size={22} />
                  <h2>{entry.title}</h2>
                </div>
                <strong>{entry.place}</strong>
                <p>{entry.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </section>

      <motion.section className="wrap section" {...reveal()}>
        <div className="quote-card">
          <span className="quote-mark">“</span>
          <p>Build the foundation. Stay curious. Make the next thing a little better.</p>
          <span className="mono">A PERSONAL REMINDER</span>
        </div>
      </motion.section>
    </Layout>
  )
}
