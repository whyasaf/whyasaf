"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Instagram, Globe, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedInfo: string;
  cover: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  links: {
    github?: string;
    website?: string;
    instagram?: string;
  };
  gridClass: string;
  imageMode?: "cover" | "contain";
  darkInvert?: boolean;
}

export default function ProjectsGrid() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "codevocab",
      title: "CodeVocab AI",
      subtitle: "Python & NLP Platform",
      description: t.projCodeVocabDesc,
      detailedInfo: t.projCodeVocabDetailed,
      cover: "/assets/cv.png",
      mediaType: "video",
      mediaSrc: "/assets/codevocab.mp4",
      links: {
        website: "https://codevocab.whyasaf.com",
        github: "https://github.com/whyasaf/CodeVocab"
      },
      gridClass: "md:col-span-2 md:row-span-1"
    },
    {
      id: "neonotokurtarma",
      title: "Neon Oto Kurtarma",
      subtitle: language === "tr" ? "Website & Logo Tasarımı" : "Website & Logo Design",
      description: t.projNeonDesc,
      detailedInfo: t.projNeonDetailed,
      cover: "/assets/neon.png",
      mediaType: "image",
      mediaSrc: "/assets/neon.png",
      links: {
        website: "https://neonotokurtarma.com",
        github: "https://github.com/whyasaf",
        instagram: "https://www.instagram.com/neonotokurtarma"
      },
      gridClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: "cultivatedvoicesystem",
      title: "Cultivated Voice System",
      subtitle: "English Education System",
      description: t.projCvsDesc,
      detailedInfo: t.projCvsDetailed,
      cover: "/assets/zach_andre_home.jpeg",
      mediaType: "image",
      mediaSrc: "/assets/zach_andre_home.jpeg",
      links: {
        website: "https://www.cultivatedvoicesystem.com/",
        github: "https://github.com/whyasaf"
      },
      gridClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: "kacisalanif1",
      title: "Kaçış Alanı F1",
      subtitle: language === "tr" ? "Instagram Sayfası" : "Instagram Page",
      description: t.projKacisDesc,
      detailedInfo: t.projKacisDetailed,
      cover: "/assets/maxtek.png",
      mediaType: "image",
      mediaSrc: "/assets/maxtek.png",
      links: {
        instagram: "https://www.instagram.com/kacisalanif1/"
      },
      gridClass: "md:col-span-2 md:row-span-1"
    },
    {
      id: "zerpfinance",
      title: "zerP Finance",
      subtitle: language === "tr" ? "Finansal Takip Sistemi" : "Financial Tracker System",
      description: t.projZerpDesc,
      detailedInfo: t.projZerpDetailed,
      cover: "/assets/zerp_pdf.png",
      mediaType: "image",
      mediaSrc: "/assets/zerp_pdf.png",
      links: {
        github: "https://github.com/whyasaf"
      },
      gridClass: "md:col-span-1 md:row-span-1",
      imageMode: "contain",
      darkInvert: true
    },
    {
      id: "focusvalley",
      title: "Focus Valley",
      subtitle: language === "tr" ? "Odaklanma & Oyunlaştırma" : "Focus & Gamification",
      description: t.projFocusValleyDesc,
      detailedInfo: t.projFocusValleyDetailed,
      cover: "/assets/fv_logo_wa.png",
      mediaType: "image",
      mediaSrc: "/assets/fv_logo_wa.png",
      links: {
        github: "https://github.com/whyasaf"
      },
      gridClass: "md:col-span-2 md:row-span-1",
      imageMode: "contain",
      darkInvert: true
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const projectUrl =
            project.links.website ||
            project.links.github ||
            project.links.instagram ||
            "#";
          return (
            <ProjectCard
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              mediaType={project.mediaType}
              mediaSrc={project.mediaSrc}
              imageMode={project.imageMode}
              darkInvert={project.darkInvert}
              href={projectUrl}
              onDetailClick={() => setSelectedProject(project)}
            />
          );
        })}
      </div>

      {/* Detail Modal (Apple App Store style split modal) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[90vh] md:h-[500px] cursor-default text-zinc-900 dark:text-zinc-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 bg-white/80 dark:bg-black/60 border border-zinc-200/50 dark:border-zinc-800/60 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={15} />
              </button>

              {/* Left Side: Media Showcase (50% width on desktop) */}
              <div className="w-full md:w-1/2 h-48 md:h-full bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden select-none border-b md:border-b-0 md:border-r border-zinc-150 dark:border-zinc-900 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
                {selectedProject.mediaType === "video" ? (
                  <video
                     src={selectedProject.mediaSrc}
                     autoPlay
                     loop
                     muted
                     playsInline
                     className="w-full h-full object-cover rounded-t-3xl md:rounded-t-none md:rounded-l-3xl"
                  />
                ) : (
                  <img
                    src={selectedProject.mediaSrc}
                    alt={selectedProject.title}
                    className={`w-full h-full rounded-t-3xl md:rounded-t-none md:rounded-l-3xl ${
                      selectedProject.imageMode === "contain" 
                        ? "object-contain p-8" 
                        : "object-cover"
                    } ${selectedProject.darkInvert ? "dark:invert" : ""}`}
                  />
                )}
              </div>

              {/* Right Side: Typography & Metadata (50% width on desktop) */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between h-[calc(90vh-12rem)] md:h-full overflow-hidden">
                <div className="space-y-4 overflow-y-auto pr-1">
                  <div>
                    <span className="block text-[10px] md:text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 font-sans mb-1.5">
                      {(() => {
                        const hasTrChars = /[ışğçöüİŞĞÇÖÜ]/.test(selectedProject.subtitle);
                        return selectedProject.subtitle.toLocaleUpperCase(hasTrChars ? "tr-TR" : "en-US");
                      })()}
                    </span>
                    <h2 className="text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-serif leading-none tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                    {selectedProject.detailedInfo}
                  </p>
                </div>

                {/* Footer Action Button & Links */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900/60 mt-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const projectUrl = selectedProject.links.website || selectedProject.links.github || selectedProject.links.instagram;
                      return projectUrl ? (
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-cyan-600 dark:bg-zinc-100 dark:hover:bg-cyan-500 text-zinc-100 dark:text-zinc-900 hover:text-zinc-100 dark:hover:text-zinc-100 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02] shrink-0"
                        >
                          {t.projectInspect}
                          <ArrowUpRight size={13} />
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 italic">
                          {t.projectNoLink}
                        </span>
                      );
                    })()}

                    {/* Secondary Social/Source Links */}
                    <div className="flex items-center gap-2">
                      {selectedProject.links.website && (
                        <a
                          href={selectedProject.links.website}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 border border-zinc-200 dark:border-zinc-800 rounded-full transition-colors inline-flex items-center justify-center shadow-sm"
                          title={t.projectWebsite}
                        >
                          <Globe size={13} />
                        </a>
                      )}
                      {selectedProject.links.github && (
                        <a
                          href={selectedProject.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 border border-zinc-200 dark:border-zinc-800 rounded-full transition-colors inline-flex items-center justify-center shadow-sm"
                          title={t.projectGithub}
                        >
                          <Github size={13} />
                        </a>
                      )}
                      {selectedProject.links.instagram && (
                        <a
                          href={selectedProject.links.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 border border-zinc-200 dark:border-zinc-800 rounded-full transition-colors inline-flex items-center justify-center shadow-sm"
                          title={t.projectInstagram}
                        >
                          <Instagram size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Logo branding inside modal */}
                  <img
                    src="/assets/wa_com2.png"
                    alt="WhyAsaf Logo"
                    className="h-6 w-auto invert-0 dark:invert opacity-20 object-contain select-none"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
