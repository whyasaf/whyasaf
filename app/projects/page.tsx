import React from "react";
import HeroSection from "../../src/components/HeroSection";
import ProjectsGrid from "../../src/components/ProjectsGrid";
import Footer from "../../src/components/Footer";

export const metadata = {
  title: "Projeler",
  description: "Ömer Asaf Ak tarafından geliştirilmiş kurumsal, bireysel ve açık kaynak yazılım projeleri, web tasarımı ve yapay zeka entegrasyonu uygulamaları.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <HeroSection activeTab="projects" />
      
      <div className="max-w-5xl mx-auto py-6 animate-in fade-in duration-500">
        <ProjectsGrid />
      </div>

      <Footer type="projects" />
    </div>
  );
}
