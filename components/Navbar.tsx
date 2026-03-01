"use client";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-base font-semibold tracking-wide text-white">
          HawariiDev
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/Hawariii"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-4 py-1.5 text-xs uppercase tracking-widest text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            GitHub
          </a>
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

      {open && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm text-zinc-300">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
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
        </div>
      )}
    </header>
  );
}
