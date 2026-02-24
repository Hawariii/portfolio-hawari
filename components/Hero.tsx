"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-400 text-sm"
        >
          Web Developer & Minecraft Creator
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Halo, gw{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Hawari
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Programmer dari Indonesia yang suka bikin web dari skala kecil sampai besar,
          sekaligus aktif bikin addons & texture pack Minecraft.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          
            <a href="#projects"
            className="px-8 py-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-medium transition-all"
          >
            Lihat Projects
          </a>
          
            <a href="#minecraft"
            className="px-8 py-3 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-medium transition-all"
          >
            Minecraft Works
          </a>
        </motion.div>

      </div>
    </section>
  );
}