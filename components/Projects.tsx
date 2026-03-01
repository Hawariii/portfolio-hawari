import Image from "next/image";
import projectsData from "@/data/projects.json";

type ProjectCategory = "web" | "minecraft";

type Project = {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  image: string;
  links: {
    github?: string;
    demo?: string;
    publish?: string;
  };
};

const categoryLabel: Record<ProjectCategory, string> = {
  web: "Web App",
  minecraft: "Minecraft",
};

export default function Projects() {
  const projects = projectsData.projects as Project[];

  return (
    <section id="projects" className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Projects</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          Project pilihan
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <div className="relative h-52 border-b border-white/10 bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {categoryLabel[project.category]}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-300">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-zinc-600 underline-offset-4 hover:text-white"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-zinc-600 underline-offset-4 hover:text-white"
                    >
                      Demo
                    </a>
                  )}
                  {project.links.publish && (
                    <a
                      href={project.links.publish}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-zinc-600 underline-offset-4 hover:text-white"
                    >
                      Publish
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
