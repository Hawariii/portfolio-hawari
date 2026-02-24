"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-white tracking-tight">
          hawari<span className="text-purple-400">.dev</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          
        <a href="https://github.com/Hawariii"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all"
        >
            GitHub
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm text-gray-400 border-t border-white/10 pt-4">
          <Link href="#about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">About</Link>
          <Link href="#projects" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Projects</Link>
          <Link href="#contact" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Contact</Link>
          
          <a href="https://github.com/Hawariii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400"
            onClick={() => setIsOpen(false)}
          >
            GitHub →
          </a>
        </div>
      )}
    </nav>
  );
}