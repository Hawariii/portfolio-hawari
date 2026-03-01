"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-base font-semibold tracking-wide text-white">
          HawariiDev
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="https://github.com/Hawariii"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-4 py-1.5 text-xs uppercase tracking-widest text-white transition hover:border-white hover:bg-white hover:text-black"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub
          </motion.a>
        </div>

        <button
          type="button"
          className="text-sm text-zinc-300 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-white/10 bg-black/95 px-6 py-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-4 text-sm text-zinc-300">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="transition hover:text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://github.com/Hawariii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
