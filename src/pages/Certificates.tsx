import { ArrowUpRight, Award } from 'lucide-react'
import { certificates } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'

export function Certificates() {
  return (
    <Layout>
      <PageHead
        title={
          <>
            Learning, documented.
            <br />
            <span className="dim">Milestones worth keeping.</span>
          </>
        }
        sub="Courses, recognition and practical experience. Open each original document to view its details."
      />

      <section className="wrap">
        <div className="cert-list glass">
          {certificates.map((certificate) => (
            <a className="cert-row" href={certificate.url} target="_blank" rel="noreferrer" key={certificate.title}>
              <span className="cert-icon">
                <Award size={20} />
              </span>

              <div className="cert-main">
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
              </div>

              <span className="tag cert-tag">{certificate.tag}</span>
              <span className="cert-date">{certificate.date}</span>
              <ArrowUpRight className="cert-open" size={18} />
            </a>
          ))}
        </div>
      </section>
    </Layout>
  )
}
