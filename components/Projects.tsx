"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

export default function Projects() {
  const projects = projectsData.projects as Project[];
  const webProjects = projects.filter((project) => project.category === "web");
  const minecraftProjects = projects.filter(
    (project) => project.category === "minecraft",
  );

  return (
    <motion.section
      id="projects"
      className="border-t border-white/10 px-6 py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Projects</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Project pilihan</h2>

        <div className="mt-10">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Web Projects
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {webProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.35)" }}
              >
                <div className="relative h-52 border-b border-white/10 bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-5">
                  <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-200 transition group-hover:border-white/35"
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
                        className="underline decoration-zinc-600 underline-offset-4 transition hover:text-white"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-zinc-600 underline-offset-4 transition hover:text-white"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Minecraft Projects
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {minecraftProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.35)" }}
              >
                <div className="relative h-52 border-b border-white/10 bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-5">
                  <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-200 transition group-hover:border-white/35"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-300">
                    {project.links.publish && (
                      <a
                        href={project.links.publish}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-zinc-600 underline-offset-4 transition hover:text-white"
                      >
                        Publish
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-zinc-600 underline-offset-4 transition hover:text-white"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
