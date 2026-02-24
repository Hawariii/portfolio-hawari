"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import projectsData from "@/data/projects.json";

type WebProject = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
};

type MinecraftProject = {
  id: number;
  title: string;
  description: string;
  type: string;
  version: string;
  curseforge: string;
  image: string;
};

export default function Projects() {
  const webProjects: WebProject[] = projectsData.web;
  const minecraftProjects: MinecraftProject[] = projectsData.minecraft;

  return (
    <section id="projects" className="bg-black py-24 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto">

        {/* Web Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Web Projects
          </span>
          <h2 className="text-4xl font-bold text-white mb-10">
            Project yang pernah gw bikin
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {webProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all group"
              >
                {/* Image */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-white/5 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Minecraft Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          id="minecraft"
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Minecraft Bedrock
          </span>
          <h2 className="text-4xl font-bold text-white mb-10">
            Addon & Texture Pack
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {minecraftProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-all group"
              >
                {/* Image */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-white/5 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Type badge */}
                <span className="text-xs px-3 py-1 rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20 mb-4 inline-block">
                  {project.type} · {project.version}
                </span>

                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {project.curseforge && (
                  <a
                    href={project.curseforge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    CurseForge →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}