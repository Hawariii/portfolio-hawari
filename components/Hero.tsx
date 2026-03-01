"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type HeroGitHubProfile = {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
  };
};

export default function Hero() {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState<HeroGitHubProfile["user"] | null>(null);

  useEffect(() => {
    fetch("/api/github", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("failed");
        return response.json() as Promise<HeroGitHubProfile>;
      })
      .then((data) => setProfile(data.user))
      .catch(() => {
        setProfile(null);
      });
  }, []);

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

        {profile && (
          <motion.a
            href={`https://github.com/${profile.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:border-white/30"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            <Image
              src={profile.avatarUrl}
              alt={profile.login}
              width={38}
              height={38}
              className="rounded-full border border-white/20"
              unoptimized
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-white">{profile.name}</p>
              <p className="font-mono text-[11px] text-zinc-500">@{profile.login}</p>
            </div>
          </motion.a>
        )}

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
