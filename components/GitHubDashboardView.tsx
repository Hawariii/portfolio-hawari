"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { GitHubDashboardData } from "@/lib/github";

type Props = {
  username: string;
  data: GitHubDashboardData;
};

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

const dayLabel = (isoDate: string) =>
  new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(new Date(isoDate));

export default function GitHubDashboardView({ username, data }: Props) {
  const currentYear = new Date().getFullYear();
  const maxBarValue = Math.max(...data.recent7Days.map((item) => item.count), 1);

  return (
    <motion.section
      id="dashboard"
      className="border-t border-white/10 px-6 py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Dashboard</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          Aktivitas GitHub {username}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Kontribusi tahunan dalam bentuk kotak per tahun dan grafik kontribusi 7 hari
          terakhir. Data di-refresh otomatis setiap 1 jam.
        </p>

        {!data.profile ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-300">
            Data GitHub tidak bisa diambil saat ini. Coba refresh beberapa saat lagi.
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={data.profile.avatar_url}
                    alt={data.profile.login}
                    width={56}
                    height={56}
                    className="rounded-full border border-white/20"
                    unoptimized
                  />
                  <div>
                    <p className="text-sm text-zinc-400">Akun</p>
                    <p className="text-lg font-semibold text-white">
                      {data.profile.name ?? data.profile.login}
                    </p>
                    <p className="text-xs text-zinc-500">@{data.profile.login}</p>
                  </div>
                </div>
                {data.profile.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{data.profile.bio}</p>
                )}
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Commit {currentYear}
                </p>
                <p className="mt-3 text-3xl font-bold text-white">{data.yearlyCommits}</p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">7 Hari Total</p>
                <p className="mt-3 text-3xl font-bold text-white">
                  {data.recent7Days.reduce((sum, day) => sum + day.count, 0)}
                </p>
              </motion.div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {data.yearlyContributions.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.35)" }}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.year}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.total}</p>
                  <p className="mt-1 text-xs text-zinc-500">contributions</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white">Grafik Kontribusi 7 Hari Terakhir</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Hover bar untuk melihat detail kontribusi harian.
              </p>

              <div className="mt-5 grid grid-cols-7 gap-3">
                {data.recent7Days.map((item, index) => {
                  const height = Math.max((item.count / maxBarValue) * 140, item.count > 0 ? 14 : 8);

                  return (
                    <motion.div
                      key={`${item.date}-${index}`}
                      className="group relative flex flex-col items-center"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <div className="mb-2 text-xs text-zinc-500">{dayLabel(item.date)}</div>
                      <motion.div
                        className="relative flex h-40 w-full max-w-[56px] items-end justify-center rounded-lg border border-white/10 bg-black/40"
                        whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.45)" }}
                        transition={{ duration: 0.18 }}
                      >
                        <div
                          className="w-7 rounded-md bg-white/85 transition-all duration-200 group-hover:bg-white"
                          style={{ height: `${height}px` }}
                        />

                        <div className="pointer-events-none absolute -top-10 rounded-md border border-white/20 bg-black px-2 py-1 text-xs text-zinc-200 opacity-0 transition group-hover:opacity-100">
                          {item.count} kontribusi
                        </div>
                      </motion.div>
                      <div className="mt-2 text-[10px] text-zinc-500">
                        {new Date(item.date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <motion.div
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Public Repos</p>
                <p className="mt-2 text-2xl font-semibold text-white">{data.profile.public_repos}</p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Active Repos</p>
                <p className="mt-2 text-2xl font-semibold text-white">{data.activeRepos}</p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total Stars</p>
                <p className="mt-2 text-2xl font-semibold text-white">{data.totalStars}</p>
              </motion.div>
            </div>

            <motion.div
              className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">Top Repository</h3>
                <Link
                  href={data.profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-300 underline decoration-zinc-500 underline-offset-4 hover:text-white"
                >
                  Buka profil GitHub
                </Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {data.topRepos.length === 0 && (
                  <p className="text-sm text-zinc-400">Belum ada repo yang bisa ditampilkan.</p>
                )}
                {data.topRepos.map((repo, index) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/30 hover:bg-black/50"
                    >
                      <p className="font-medium text-white">{repo.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Updated {new Date(repo.updated_at).toLocaleDateString("id-ID")}
                      </p>
                      <p className="mt-3 text-sm text-zinc-300">{repo.stargazers_count} stars</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                Last sync: {formatDateTime(data.lastUpdated)}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
}
