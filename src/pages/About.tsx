import { motion } from 'framer-motion'
import { Eyebrow } from '../components/Eyebrow'
import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { SkillGrid } from '../components/SkillGrid'
import { reveal } from '../components/reveal'

export function About() {
  return (
    <Layout>
      <PageHead
        eyebrow="THE PERSON BEHIND THE PIXELS"
        title={
          <>
            A bit of context.
            <br />
            <span className="gradient-text">A lot of curiosity.</span>
          </>
        }
        sub="A student, a builder, and someone who enjoys the process as much as the result."
      />

      <motion.section className="wrap content-two" {...reveal()}>
        {/* Left: monogram card */}
        <div className="about-card">
          <div className="about-monogram">
            AK<span>.</span>
          </div>
          <div className="about-card-foot">
            <span className="mono">AMIT KUMAR</span>
            <span className="status">
              <i /> OPEN TO LEARNING
            </span>
          </div>
        </div>

        {/* Right: written introduction + quick facts */}
        <div className="prose">
          <Eyebrow>HELLO, I'M AMIT</Eyebrow>
          <h2>
            I like making the internet feel a little more{' '}
            <span className="gradient-text">human.</span>
          </h2>
          <p>
            I'm a Computer Science & Engineering diploma student at Government Polytechnic
            Raghopur, Supaul. My focus is front-end web development and software logic:
            understanding how things work, then shaping them into experiences people can
            actually use.
          </p>
          <p>
            I've built projects from scratch with HTML, CSS and JavaScript, and I'm
            strengthening my programming foundation in C and Python. Outside the code editor, I
            also work as a video editor. That creative side influences how I think about
            rhythm, composition and detail.
          </p>
          <p>
            I'm still learning, still experimenting, and interested in the small decisions that
            make digital products feel considered.
          </p>

          <div className="facts-grid">
            <div>
              <span>BASED IN</span>
              <strong>Bihar, India</strong>
            </div>
            <div>
              <span>STUDYING</span>
              <strong>Diploma in CSE</strong>
            </div>
            <div>
              <span>ALSO DOING</span>
              <strong>Video editing</strong>
            </div>
            <div>
              <span>INTERNSHIP</span>
              <strong>Tata Motors · 2026</strong>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section wrap" {...reveal()}>
        <div className="section-heading">
          <div>
            <Eyebrow>WHAT I'M WORKING WITH</Eyebrow>
            <h2>
              My current <span className="gradient-text">toolkit.</span>
            </h2>
          </div>
        </div>
        <SkillGrid />
      </motion.section>
    </Layout>
  )
}
