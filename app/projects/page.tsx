import React from "react";
import HeroSection from "../../src/components/HeroSection";
import ProjectsGrid from "../../src/components/ProjectsGrid";
import Footer from "../../src/components/Footer";

export const metadata = {
  title: "Projeler",
  description: "Ömer Asaf Ak tarafından geliştirilmiş kurumsal, bireysel ve açık kaynak yazılım projeleri, web tasarımı ve yapay zeka entegrasyonu uygulamaları.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projeler | whyasaf",
    description: "Ömer Asaf Ak tarafından geliştirilmiş yazılım projeleri, web tasarımı ve yapay zeka uygulamaları.",
    url: "https://whyasaf.com/projects",
    siteName: "whyasaf",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "whyasaf | Projeler" }],
  },
};

const projectList = [
  { name: "Lecmic", url: "https://lecmic.whyasaf.com", description: "Lecture assistant for university students: live transcription and translation, notes, recordings, PDFs, summaries and a vocabulary notebook.", category: "EducationalApplication" },
  { name: "CodeVocab AI", url: "https://codevocab.whyasaf.com", description: "Python & NLP platform that verifies English sentences instantly.", category: "EducationalApplication" },
  { name: "Neon Oto Kurtarma", url: "https://neonotokurtarma.com", description: "Website and logo design.", category: "WebApplication" },
  { name: "Cultivated Voice System", url: "https://www.cultivatedvoicesystem.com/", description: "English education system.", category: "EducationalApplication" },
  { name: "Plus Otoyol", url: "https://plusotoyol.com", description: "Transportation technologies.", category: "WebApplication" },
];

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "whyasaf projects",
  itemListElement: projectList.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: project.name,
      url: project.url,
      description: project.description,
      applicationCategory: project.category,
      author: { "@type": "Person", name: "Ömer Asaf Ak", url: "https://whyasaf.com" },
    },
  })),
};

export default function ProjectsPage() {
  return (
    <div className="space-y-[34px]">
      <HeroSection activeTab="projects" />
      
      <div className="max-w-5xl mx-auto pt-[21px] pb-6 animate-in fade-in duration-500">
        <ProjectsGrid />
      </div>

      <Footer type="projects" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
    </div>
  );
}
