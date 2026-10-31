import { motion } from 'framer-motion'
import { ArrowUpRight, Award } from 'lucide-react'
import { certificates } from '../data'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { reveal } from '../components/reveal'

export function Certificates() {
  return (
    <Layout>
      <PageHead
        eyebrow="PROOF OF PROGRESS"
        title={
          <>
            Learning, documented.
            <br />
            <span className="gradient-text">Milestones worth keeping.</span>
          </>
        }
        sub="Courses, recognition and practical experience. Open each original document to view its details."
      />

      <section className="wrap certificate-list">
        {certificates.map((certificate, index) => (
          <motion.a
            className="certificate-row"
            href={certificate.url}
            target="_blank"
            rel="noreferrer"
            key={certificate.title}
            {...reveal()}
          >
            <div className="cert-icon">
              <Award size={21} />
            </div>

            <div className="cert-main">
              <span className="mono">
                {certificate.tag} · 0{index + 1}
              </span>
              <h3>{certificate.title}</h3>
              <p>{certificate.issuer}</p>
            </div>

            <div className="cert-date">{certificate.date}</div>

            <span className="cert-open">
              <ArrowUpRight size={18} />
            </span>
          </motion.a>
        ))}
      </section>
    </Layout>
  )
}
