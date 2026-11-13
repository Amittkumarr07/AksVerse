import { Layout } from '../components/Layout'
import { PageHead } from '../components/PageHead'
import { SkillList } from '../components/SkillList'

export function About() {
  return (
    <Layout>
      <PageHead
        title={
          <>
            A bit of context.
            <br />
            <span className="dim">A lot of curiosity.</span>
          </>
        }
        sub="A student, a builder, and someone who enjoys the process as much as the result."
      />

      <section className="wrap about-grid">
        {/* Written introduction */}
        <div className="prose">
          <h2>I like making the internet feel a little more human.</h2>
          <p>
            I'm a Computer Science & Engineering diploma student at Government Polytechnic Raghopur, Supaul. My
            focus is front-end web development and software logic: understanding how things work, then shaping
            them into experiences people can actually use.
          </p>
          <p>
            I've built projects from scratch with HTML, CSS and JavaScript, and I'm strengthening my programming
            foundation in C and Python. Outside the code editor, I also work as a video editor. That creative
            side influences how I think about rhythm, composition and detail.
          </p>
          <p>
            I'm still learning, still experimenting, and interested in the small decisions that make digital
            products feel considered.
          </p>
        </div>

        {/* Quick facts */}
        <dl className="facts glass">
          <div>
            <dt>Based in</dt>
            <dd>Bihar, India</dd>
          </div>
          <div>
            <dt>Studying</dt>
            <dd>Diploma in CSE</dd>
          </div>
          <div>
            <dt>Also doing</dt>
            <dd>Video editing</dd>
          </div>
          <div>
            <dt>Internship</dt>
            <dd>Tata Motors, 2026</dd>
          </div>
        </dl>
      </section>

      <section className="section wrap">
        <div className="section-heading">
          <h2>What I'm working with</h2>
        </div>
        <SkillList />
      </section>
    </Layout>
  )
}
