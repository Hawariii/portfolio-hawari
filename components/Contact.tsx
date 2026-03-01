"use client";

import { motion } from "framer-motion";

const contacts = [
  { label: "GitHub", href: "https://github.com/Hawariii" },
  { label: "Email", href: "mailto:hawari.dev@gmail.com" },
  { label: "YouTube", href: "https://youtube.com/@siaizhu" },
  { label: "Discord", href: "https://discord.com/users/hawari" },
];

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="border-t border-white/10 px-6 py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Contact Me</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          Let&apos;s build something
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Terbuka untuk freelance, kolaborasi produk, dan pengembangan web app end-to-end.
          Hubungi saya lewat channel di bawah.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {contacts.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-zinc-200 transition hover:border-white hover:bg-white hover:text-black"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <motion.footer
          className="mt-16 border-t border-white/10 pt-6 text-xs text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          © {new Date().getFullYear()} HawariiDev. Built with Next.js, TypeScript, and Tailwind CSS.
        </motion.footer>
      </div>
    </motion.section>
  );
}
