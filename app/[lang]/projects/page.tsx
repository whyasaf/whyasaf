import React from "react";
import HeroSection from "../../../src/components/HeroSection";
import ProjectsGrid from "../../../src/components/ProjectsGrid";
import Footer from "../../../src/components/Footer";
import { Language, SITE_URL, localePath, pageAlternates } from "../../../src/lib/i18n";

const copy = {
  tr: {
    title: "Projeler",
    description: "Ömer Asaf Ak tarafından geliştirilmiş kurumsal, bireysel ve açık kaynak yazılım projeleri, web tasarımı ve yapay zeka entegrasyonu uygulamaları.",
    ogDescription: "Ömer Asaf Ak tarafından geliştirilmiş yazılım projeleri, web tasarımı ve yapay zeka uygulamaları.",
    locale: "tr_TR",
  },
  en: {
    title: "Projects",
    description: "Corporate, personal and open source software projects, web design and AI integration work built by Ömer Asaf Ak.",
    ogDescription: "Software projects, web design and AI applications built by Ömer Asaf Ak.",
    locale: "en_US",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;
  const t = copy[language];

  return {
    title: t.title,
    description: t.description,
    alternates: pageAlternates(language, "/projects"),
    openGraph: {
      title: `${t.title} | whyasaf`,
      description: t.ogDescription,
      url: `${SITE_URL}${localePath(language, "/projects")}`,
      siteName: "whyasaf",
      locale: t.locale,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `whyasaf | ${t.title}` }],
    },
  };
}

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
