import { profile } from "@/data/profile";
import { Header } from "@/components/Header";
import { ContactForm as Contact } from "@/components/ContactForm";
import { Work } from "@/components/Explore";
import { Atmosphere } from "@/components/Atmosphere";
import styles from "./hero.module.scss";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className={styles.hero} id="home">
          <div className={styles.art} aria-hidden="true">
            <div className={styles.grid} />
            <div className={styles.orbit} />
            <Atmosphere />
          </div>
          <img
            className={styles.portrait}
            src="/assets/hero-cutout.webp"
            alt="Shashank standing with folded arms"
            fetchPriority="high"
            width="941"
            height="1672"
          />
          <div className={styles.copy}>
            <h1>
              Shashank
              <br />
              <em>Kumar Singh.</em>
            </h1>
            <p className={styles.role}>
              Full-stack developer &amp; AI/ML enthusiast
            </p>
            <p className={styles.intro}>{profile.introduction}</p>
            <div className="actions">
              <a className="button primary" href="#work">
                Explore my work
              </a>
              <a className="button secondary" href="#contact">
                Let’s connect
              </a>
            </div>
          </div>
          <div className={styles.caption}>
            <span>⌖ &nbsp; BANGALORE, INDIA</span>
            <span>↓ &nbsp; SCROLL TO EXPLORE</span>
          </div>
        </section>
        <div className="wrap">
          <Work />
          <section id="about" className="about">
            <img
              src="/assets/about.webp"
              width="1080"
              height="810"
              loading="lazy"
              alt="Formal headshot of Shashank Kumar Singh"
            />
            <div>
              <small>ABOUT ME</small>
              <h2>
                Curiosity, in practice<span>.</span>
              </h2>
              <p>
                I’m Shashank, a computer science student in Bangalore. Working
                on Workora has given me a concrete question to build around. How
                do you help someone find work nearby, in a language they’re
                comfortable speaking?
              </p>
              <p>
                That question brings together the things I want to learn most
                deeply — interface design, software engineering and machine
                learning. Outside coding, I read comics and enjoy exploring how
                visuals can tell a story.
              </p>
              <div id="education">
                <h3>Education</h3>
                <strong>{profile.institution}</strong>
                <p>
                  {profile.degree} · {profile.specialization}
                  <br />
                  Currently Bangalore, India
                </p>
              </div>
            </div>
          </section>
          <section id="skills">
            <small>SKILLS &amp; INTERESTS</small>
            <h2>
              My working toolkit<span>.</span>
            </h2>
            <div className="cards">
              {profile.skills.map((s) => (
                <article key={s.stage}>
                  <h3>{s.stage}</h3>
                  <p>{s.description}</p>
                  <div className="chips">
                    {s.items.map((i) => (
                      <span key={i}>{i}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="notes">
            <div id="experience">
              <small>PROJECT EXPERIENCE</small>
              <h3>Building with a team</h3>
              <p>
                Workora started with a local job discovery problem. The
                hackathon project has taken me from thinking about worker and
                employer journeys to investigating how voice, mapping and
                verification could support them.
              </p>
            </div>
            <div>
              <small>WHAT DRIVES ME</small>
              <h3>Learning through useful software</h3>
              <p>
                I want to grow into an engineer who can follow a problem from a
                user’s first interaction through to the data and systems behind
                it. I bring curiosity, product questions and a willingness to
                work through unfamiliar tools with a team.
              </p>
            </div>
            <div id="content">
              <small>CONTENT CREATION</small>
              <h3>Beyond the editor</h3>
              <p>
                I’m interested in the creative side of technology, from making
                content to explaining an idea visually.
              </p>
              <a href={profile.links.YouTube}>YouTube</a> ·{" "}
              <a href={profile.links.Instagram}>Instagram</a>
            </div>
          </section>
          {profile.achievements.length > 0 && (
            <section>
              <h2>Achievements</h2>
              {profile.achievements.map((x) => (
                <a key={x.url} href={x.url}>
                  {x.title}
                </a>
              ))}
            </section>
          )}
          <Contact />
        </div>
      </main>
      <footer>
        <span>{profile.name} · Bangalore</span>
        <div>
          {Object.entries(profile.links).map(([k, v]) => (
            <a key={k} href={v}>
              {k}
            </a>
          ))}
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </>
  );
}
