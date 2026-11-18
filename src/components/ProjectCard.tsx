import type { Project } from '../data/projects.ts'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      {project.image && (
        <img className="card__image" src={project.image} alt={`${project.title} – screenshot`} loading="lazy" />
      )}
      <div className="card__body">
        <p className="card__year">{project.year}</p>
        <h4>{project.title}</h4>
        <p className="card__description">{project.description}</p>
        {project.tags.length > 0 && (
          <ul className="tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        {(project.live || project.repo) && (
          <p className="card__links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                Live demo ↗
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer">
                Code ↗
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  )
}
