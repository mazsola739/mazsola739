import { levels, projects } from '../data/projects.ts'
import { ProjectCard } from './ProjectCard.tsx'

export function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-title">
      <header className="section__header">
        <h2 id="projects-title">Projects</h2>
        <p>From my first small projects to complex systems.</p>
      </header>

      <ol className="levels">
        {levels.map((level) => {
          const items = projects.filter((project) => project.level === level.id)
          return (
            <li key={level.id} className="level">
              <div className="level__info">
                <span className="level__number">{String(level.id).padStart(2, '0')}</span>
                <h3>{level.title}</h3>
                <p className="level__period">{level.period}</p>
                <p className="level__description">{level.description}</p>
              </div>
              <div className="cards">
                {items.length > 0 ? (
                  items.map((project) => <ProjectCard key={project.title} project={project} />)
                ) : (
                  <div className="card card--placeholder">Projects for this level are coming soon.</div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
