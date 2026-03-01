export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-36 md:pb-28 md:pt-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Portfolio 2026</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-7xl">
          Hawariii
          <span className="block text-zinc-300">Web Developer & Product Builder</span>
        </h1>
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-lg">
          Saya bangun web app yang fokus ke performa, desain profesional, dan user
          experience yang jelas. Dari MVP sampai production system.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full border border-white bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Lihat Project
          </a>
          <a
            href="#dashboard"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white"
          >
            Buka Dashboard GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
