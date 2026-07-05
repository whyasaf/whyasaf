"use client";

import React from "react";
import { GraduationCap, Code2, Rocket, Mail, Linkedin } from "lucide-react";
import HeroSection from "../src/components/HeroSection";
import ExperienceCard from "../src/components/ExperienceCard";
import { useLanguage } from "../src/context/LanguageContext";
import { translations } from "../src/lib/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <HeroSection activeTab="about" />
      
      <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto py-6">
        {/* Intro Text */}
        <div 
          className="text-zinc-500 dark:text-zinc-400/80 text-lg md:text-xl leading-relaxed text-center py-2 max-w-3xl mx-auto font-sans italic"
        >
          {t.aboutIntro}
        </div>

        {/* Vertical Premium Experience Cards */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Experience 1: Istanbul University */}
          <ExperienceCard
            videoSrc="/assets/ist_uni.mp4"
            logo={<GraduationCap size={18} />}
            title={t.exp1Title}
            period={t.exp1Period}
            subtitle={t.exp1Subtitle}
            description={t.exp1Desc}
          />

          {/* Experience 2: CodeVocab AI */}
          <ExperienceCard
            videoSrc="/assets/codevocab.mp4"
            logo={<Code2 size={18} />}
            title={t.exp2Title}
            period={t.exp2Period}
            subtitle={t.exp2Subtitle}
            description={t.exp2Desc}
          />

          {/* Experience 3: Marki Corp & Ventures */}
          <ExperienceCard
            imageSrc="/assets/marki_wa.png"
            imageMode="cover"
            logo={<Rocket size={18} />}
            title={t.exp3Title}
            period={t.exp3Period}
            subtitle={t.exp3Subtitle}
            description={t.exp3Desc}
          />
        </div>

        {/* Curations Stacked Gallery */}
        <div className="pt-12 border-t border-zinc-200/50 dark:border-zinc-900/50 space-y-6 max-w-4xl mx-auto text-left">
          <h3 className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-serif">
            {t.galleryTitle}
          </h3>

          <div className="relative h-[380px] md:h-[420px] w-full flex items-center justify-center select-none py-4 overflow-visible">
            {/* Card 1: Book (Left) */}
            <div className="absolute w-[185px] h-[270px] md:w-[230px] md:h-[340px] bg-white dark:bg-[#0f0f11] border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-3 shadow-lg transition-all duration-500 ease-out z-10 -rotate-6 -translate-x-20 md:-translate-x-36 translate-y-2 hover:rotate-0 hover:-translate-x-[135px] md:hover:-translate-x-[275px] hover:-translate-y-8 hover:z-30 hover:shadow-2xl flex flex-col justify-between cursor-pointer">
              <div className="relative w-full h-[68%] bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden">
                <img
                  src="/assets/yeraltindan_notlar.jpg"
                  alt={t.curation2Title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 px-1 text-left">
                <span className="block text-[8px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest font-sans">
                  {language === 'tr' ? 'KİTAP' : 'BOOK'}
                </span>
                <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-100 font-sans truncate">
                  {t.curation2Title}
                </h4>
                <p className="text-[10px] text-zinc-450 dark:text-zinc-500 leading-snug line-clamp-2 mt-0.5 font-sans font-light">
                  {t.curation2Desc}
                </p>
              </div>
            </div>

            {/* Card 2: Film (Center) */}
            <div className="absolute w-[185px] h-[270px] md:w-[230px] md:h-[340px] bg-white dark:bg-[#0f0f11] border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-3 shadow-xl transition-all duration-500 ease-out z-20 rotate-0 translate-x-0 translate-y-0 hover:scale-105 hover:-translate-y-6 hover:z-30 hover:shadow-2xl flex flex-col justify-between cursor-pointer">
              <div className="relative w-full h-[68%] bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden">
                <img
                  src="/assets/john_wick_4.jpg"
                  alt={t.curation1Title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 px-1 text-left">
                <span className="block text-[8px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest font-sans">
                  {language === 'tr' ? 'FİLM' : 'FILM'}
                </span>
                <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-100 font-sans truncate">
                  {t.curation1Title}
                </h4>
                <p className="text-[10px] text-zinc-450 dark:text-zinc-500 leading-snug line-clamp-2 mt-0.5 font-sans font-light">
                  {t.curation1Desc}
                </p>
              </div>
            </div>

            {/* Card 3: Music (Right) */}
            <div className="absolute w-[185px] h-[270px] md:w-[230px] md:h-[340px] bg-white dark:bg-[#0f0f11] border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-3 shadow-lg transition-all duration-500 ease-out z-10 rotate-6 translate-x-20 md:translate-x-36 translate-y-2 hover:rotate-0 hover:translate-x-[135px] md:hover:translate-x-[275px] hover:-translate-y-8 hover:z-30 hover:shadow-2xl flex flex-col justify-between cursor-pointer">
              <div className="relative w-full h-[68%] bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden">
                <img
                  src="/assets/ben_guzelden_anlarim.jpg"
                  alt={t.curation3Title}
                  className="w-full h-full object-cover shadow-inner"
                />
              </div>
              <div className="pt-2 px-1 text-left">
                <span className="block text-[8px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest font-sans">
                  {language === 'tr' ? 'MÜZİK' : 'MUSIC'}
                </span>
                <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-100 font-sans truncate">
                  {t.curation3Title}
                </h4>
                <p className="text-[10px] text-zinc-450 dark:text-zinc-500 leading-snug line-clamp-2 mt-0.5 font-sans font-light">
                  {t.curation3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="pt-12 border-t border-zinc-200/50 dark:border-zinc-900/50 space-y-6 max-w-4xl mx-auto text-left">
          <h3 className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-serif">
            {t.connectTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <a
              href="mailto:whyasaf.wa@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 shrink-0">
                <Mail size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
                  Email
                </span>
                <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-sans font-light">
                  whyasaf.wa@gmail.com
                </span>
              </div>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/whyasaf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
                  X
                </span>
                <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-sans font-light">
                  @whyasaf
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/omer-asaf-ak/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/40 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 shrink-0">
                <Linkedin size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
                  LinkedIn
                </span>
                <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-sans font-light">
                  in/omer-asaf-ak
                </span>
              </div>
            </a>
          </div>

          {/* Connect Quote Note */}
          <div className="pt-4 text-center w-full max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-zinc-400/80 dark:text-zinc-500/80 leading-relaxed font-serif italic">
              {t.aboutFooterQuote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
