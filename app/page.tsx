import About from "@/components/About";
import Contact from "@/components/Contact";
import GitHubDashboard from "@/components/GitHubDashboard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <GitHubDashboard />
      <Projects />
      <Contact />
    </main>
  );
}
