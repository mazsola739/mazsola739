import type { Project } from '../data/projects.ts'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      {project.image && (
        <img
          className="aspect-16/10 w-full border-b border-line object-cover object-top"
          src={project.image}
          alt={`${project.title} – screenshot`}
          loading="lazy"
        />
      )}
      <div className="grid gap-2.5 p-5">
        <p className="text-xs font-semibold text-muted">{project.year}</p>
        <h4 className="text-lg leading-tight font-bold tracking-tight">{project.title}</h4>
        <p className="text-[0.95rem] text-muted">{project.description}</p>
        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-accent/12 px-2.5 py-0.5 text-xs">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {(project.live || project.repo) && (
          <p className="flex gap-4">
            {project.live && (
              <a
                className="font-semibold text-accent hover:underline"
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Live demo ↗
              </a>
            )}
            {project.repo && (
              <a
                className="font-semibold text-accent hover:underline"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                Code ↗
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  )
}
