import { timeline } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'

export function Experience() {
  return (
    <Layout>
      <PageHead
        title={
          <>
            Experience is built
            <br />
            <span className="dim">one step at a time.</span>
          </>
        }
        sub="A timeline of education, practical exposure and milestones that have shaped my learning."
      />

      {/* This one really is a sequence, so it gets a rail with dots */}
      <section className="wrap">
        <div className="timeline glass">
          {timeline.map((entry, index) => (
            <div className="timeline-item" key={entry.title}>
              <div className="timeline-rail">
                <span className="timeline-dot" />
                {index < timeline.length - 1 && <span className="timeline-line" />}
              </div>

              <div className="timeline-content">
                <span className="timeline-date">{entry.date}</span>
                <div className="timeline-title">
                  <entry.icon size={20} />
                  <h2>{entry.title}</h2>
                </div>
                <strong>{entry.place}</strong>
                <p>{entry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <p className="reminder">Build the foundation. Stay curious. Make the next thing a little better.</p>
      </section>
    </Layout>
  )
}
