"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "React",
  "Node.js",
  "Laravel",
  "MySQL",
  "REST API",
  "GitHub Actions",
  "Vercel",
];

export default function About() {
  return (
    <motion.section
      id="about"
      className="border-t border-white/10 px-6 py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">About</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
            Profil singkat HawariiDev
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-zinc-400 md:text-base">
            Saya programmer dari Indonesia yang fokus di fullstack web development.
            Skill utama saya ada di Next.js, TypeScript, dan Laravel untuk membangun
            aplikasi yang scalable dan siap dipakai secara real.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            Selain website, saya juga aktif membuat addon dan resource pack Minecraft
            Bedrock. Pengalaman ini bantu saya menjaga detail UX dan performa produk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Skills</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs text-zinc-200 sm:text-sm"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04, duration: 0.25 }}
                whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.35)" }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
