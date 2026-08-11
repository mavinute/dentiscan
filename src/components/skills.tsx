import Reveal from './reveal'
import { skillGroups } from '@/data/skills'

export default function Skills() {
  return (
    <section id="habilidades">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="kicker">HABILIDADES</span>
          <h2>O que já está nas mãos.</h2>
        </Reveal>
        <Reveal className="skill-groups">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              <div className="pills">
                {group.skills.map((skill) => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
