"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Contrib = {
  date: string;
  count: number;
  level: number;
};

type TopRepo = {
  name: string;
  stars: number;
  language: string;
  url: string;
};

type Language = {
  lang: string;
  count: number;
};

type MonthlyCommit = {
  month: string;
  count: number;
};

type GHData = {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    publicRepos: number;
  };
  stats: {
    totalStars: number;
    totalCommits2025: number;
    totalCommits2026: number;
    publicRepos: number;
  };
  weeklyDist: number[];
  monthlyCommits: MonthlyCommit[];
  languages: Language[];
  topRepos: TopRepo[];
  contributions: Contrib[];
  usesToken: boolean;
  contributionSource: string;
};

const LEVELS = ["#1a1a1a", "#2e2e2e", "#474747", "#6e6e6e", "#f5f5f5"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildLinePath(data: MonthlyCommit[], width: number, height: number, pad = 12) {
  if (data.length === 0) return "";

  const max = Math.max(...data.map((d) => d.count), 1);
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  return data
    .map((item, i) => {
      const x = pad + (i / (data.length - 1 || 1)) * innerW;
      const y = pad + innerH - (item.count / max) * innerH;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export default function GitHubDashboard() {
  const [data, setData] = useState<GHData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    fetch("/api/github", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed");
        }
        return r.json() as Promise<GHData>;
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setErr(true);
        setLoading(false);
      });
  }, []);

  function up(delay: number) {
    return {
      initial: { opacity: 0, y: 14 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { delay, duration: 0.45 },
    };
  }

  const grid: Contrib[][] = [];
  if (data?.contributions?.length) {
    const flat = [...data.contributions];
    const firstDate = flat[0]?.date;

    if (firstDate) {
      const pad = new Date(firstDate).getDay();
      for (let i = 0; i < pad; i += 1) {
        flat.unshift({ date: "", count: 0, level: 0 });
      }
    }

    for (let w = 0; w < Math.ceil(flat.length / 7); w += 1) {
      grid.push(flat.slice(w * 7, w * 7 + 7));
    }
  }

  const weeklyData = data
    ? data.weeklyDist.map((count, i) => ({ day: DAYS[i], commits: count }))
    : [];

  const statCards = data
    ? [
        { label: "Commits 2025", value: data.stats.totalCommits2025 },
        { label: "Commits 2026", value: data.stats.totalCommits2026 },
        { label: "Public repos", value: data.stats.publicRepos },
        { label: "Total stars", value: data.stats.totalStars },
      ]
    : [];

  const maxWeekly = Math.max(...weeklyData.map((w) => w.commits), 1);
  const linePath = buildLinePath(data?.monthlyCommits ?? [], 560, 160);
  const totalContributions = data
    ? data.stats.totalCommits2025 + data.stats.totalCommits2026
    : 0;

  return (
    <section id="dashboard" ref={ref} className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          03 github
        </p>
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Activity Dashboard
        </h2>

        {loading && (
          <p className="animate-pulse font-mono text-xs text-zinc-500">
            fetching github.com/Hawariii…
          </p>
        )}

        {err && (
          <p className="font-mono text-xs text-zinc-300">
            failed to load. optional: tambahkan GITHUB_TOKEN di .env.local
          </p>
        )}

        {data && (
          <div className="space-y-3">
            <motion.div
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
              {...up(0.03)}
            >
              <Image
                src={data.user.avatarUrl}
                alt={data.user.login}
                width={36}
                height={36}
                className="rounded-full border border-white/20"
                unoptimized
              />
              <div className="leading-tight">
                <p className="text-sm font-medium text-white">{data.user.name}</p>
                <p className="font-mono text-[11px] text-zinc-500">@{data.user.login}</p>
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-3 md:grid-cols-4" {...up(0.05)}>
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <p className="mb-1 font-mono text-[10px] text-zinc-500">{card.label}</p>
                  <p className="font-mono text-2xl font-semibold text-white">
                    {card.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div className="rounded-xl border border-white/10 bg-white/[0.03] p-5" {...up(0.1)}>
              <p className="mb-4 font-mono text-[11px] text-zinc-500">
                contribution graph · years 2025-2026
              </p>
              <div className="flex gap-[3px] overflow-x-auto pb-1">
                {grid.map((week, wi) => (
                  <div key={`week-${wi}`} className="flex shrink-0 flex-col gap-[3px]">
                    {week.map((day, di) => (
                      <div
                        key={`day-${wi}-${di}`}
                        title={day.date ? `${day.date}: ${day.count}` : ""}
                        className="h-[10px] w-[10px] cursor-default rounded-[2px] transition-transform hover:scale-125"
                        style={{ background: LEVELS[day.level] ?? LEVELS[0] }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-end gap-1.5">
                <span className="font-mono text-[10px] text-zinc-500">less</span>
                {LEVELS.map((color) => (
                  <div
                    key={color}
                    className="h-[10px] w-[10px] rounded-[2px]"
                    style={{ background: color }}
                  />
                ))}
                <span className="font-mono text-[10px] text-zinc-500">more</span>
              </div>
            </motion.div>

            <div className="grid gap-3 md:grid-cols-2">
              <motion.div className="rounded-xl border border-white/10 bg-white/[0.03] p-5" {...up(0.15)}>
                <p className="mb-4 font-mono text-[11px] text-zinc-500">monthly commits · 2026</p>
                <div className="h-[160px] w-full">
                  <svg viewBox="0 0 560 160" className="h-full w-full" role="img" aria-label="Monthly commits line chart">
                    <path d={linePath} fill="none" stroke="#f5f5f5" strokeWidth="2" />
                    {(data.monthlyCommits ?? []).map((m, i) => {
                      const max = Math.max(...(data.monthlyCommits ?? []).map((x) => x.count), 1);
                      const x = 12 + (i / ((data.monthlyCommits.length || 1) - 1 || 1)) * (560 - 24);
                      const y = 12 + (136 - (m.count / max) * 136);

                      return (
                        <g key={m.month}>
                          <circle cx={x} cy={y} r="3" fill="#f5f5f5" />
                          <text x={x} y="156" textAnchor="middle" fontSize="9" fill="#777" fontFamily="monospace">
                            {m.month}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </motion.div>

              <motion.div className="rounded-xl border border-white/10 bg-white/[0.03] p-5" {...up(0.2)}>
                <p className="mb-4 font-mono text-[11px] text-zinc-500">weekly commit distribution</p>
                <div className="flex h-[160px] items-end gap-2">
                  {weeklyData.map((item) => {
                    const height = Math.max((item.commits / maxWeekly) * 120, 4);
                    return (
                      <div key={item.day} className="group flex flex-1 flex-col items-center">
                        <div className="mb-2 text-[10px] font-mono text-zinc-500">{item.commits}</div>
                        <div className="relative flex h-[120px] w-full items-end justify-center rounded bg-white/5">
                          <motion.div
                            className="w-[70%] rounded-t-[3px] bg-white/80"
                            initial={{ height: 0 }}
                            animate={inView ? { height } : {}}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="mt-2 font-mono text-[10px] text-zinc-500">{item.day}</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <motion.div className="rounded-xl border border-white/10 bg-white/[0.03] p-5" {...up(0.25)}>
                <p className="mb-4 font-mono text-[11px] text-zinc-500">top languages</p>
                <div className="space-y-3">
                  {data.languages.map((lang, i) => {
                    const total = data.languages.reduce((a, b) => a + b.count, 0) || 1;
                    const pct = Math.round((lang.count / total) * 100);
                    return (
                      <div key={lang.lang}>
                        <div className="mb-1 flex justify-between">
                          <span className="font-mono text-xs text-white">{lang.lang}</span>
                          <span className="font-mono text-[10px] text-zinc-500">{pct}%</span>
                        </div>
                        <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-white"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${pct}%` } : {}}
                            transition={{ delay: 0.4 + i * 0.07, duration: 0.7 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div className="rounded-xl border border-white/10 bg-white/[0.03] p-5" {...up(0.3)}>
                <p className="mb-4 font-mono text-[11px] text-zinc-500">top repositories</p>
                <div className="space-y-2">
                  {data.topRepos.map((repo) => (
                    <a
                      href={repo.url}
                      key={repo.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded border border-white/10 bg-black/30 px-3 py-2.5 transition-all hover:border-white/35"
                    >
                      <span className="truncate font-mono text-xs text-white transition-colors group-hover:text-zinc-200">
                        {repo.name}
                      </span>
                      <span className="ml-3 shrink-0 font-mono text-[11px] text-zinc-500">
                        ⭐ {repo.stars}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            <p className="font-mono text-[10px] text-zinc-500">
              source: {data.contributionSource} {data.usesToken ? "(token enabled)" : "(no token)"}
            </p>
            {totalContributions === 0 && (
              <p className="font-mono text-[10px] text-zinc-500">
                note: 2025-2026 contribution count masih 0. Kemungkinan kontribusi kamu private
                atau di luar range tahun yang dipilih.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
