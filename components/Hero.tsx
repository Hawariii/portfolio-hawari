"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.section
      id="home"
      className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-36 md:pb-28 md:pt-44"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p
          className="text-xs uppercase tracking-[0.35em] text-zinc-400"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Portfolio {currentYear}
        </motion.p>

        <motion.h1
          className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Hawariii
          <span className="block text-zinc-300">Web Developer & Product Builder</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Saya bangun web app yang fokus ke performa, desain profesional, dan user
          experience yang jelas. Dari MVP sampai production system.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.a
            href="#projects"
            className="rounded-full border border-white bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Lihat Project
          </motion.a>
          <motion.a
            href="#dashboard"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Buka Dashboard GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
