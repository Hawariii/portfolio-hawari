"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js", "React", "TypeScript", "Laravel",
  "PHP", "MySQL", "Tailwind CSS", "MCPE/BE (Minecraft)",
];

export default function About() {
  return (
    <section id="about" className="bg-black py-24 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Programmer yang suka<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              bikin hal keren
            </span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Gw Hawari, programmer asal Indonesia yang fokus di web development
            dari skala kecil sampai project industri. Gw seneng bangun sesuatu
            dari nol sampai jadi produk yang beneran bisa dipakai.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Di luar web, gw juga aktif di komunitas Minecraft sebagai Creator —
            bikin addon dan texture pack yang udah dinikmatin banyak player.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4 block">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300 text-sm hover:bg-purple-400/20 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}