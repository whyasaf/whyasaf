"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { mailtoHref } from "../lib/contact";
import { Mail, Linkedin, FileText, Github, Globe, Sparkles, Rss, Twitter, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Notebook from "./Notebook";

interface FooterProps {
  type: "about" | "projects" | "blog";
}

export default function Footer({ type }: FooterProps) {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Mouse position state for kinetic typography parallax & blueprint grid
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [localCoords, setLocalCoords] = useState({ x: 0, y: 0 });
  const [mouseInContainer, setMouseInContainer] = useState(false);
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  useEffect(() => {
    if (type !== "projects") return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if mouse is inside the container
      const isInside = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      setMouseInContainer(isInside);

      if (isInside) {
        // Center-relative for parallax
        const px = e.clientX - rect.left - rect.width / 2;
        const py = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x: px, y: py });

        // Absolute-relative inside container for crosshair and live coords
        const lx = e.clientX - rect.left;
        const ly = e.clientY - rect.top;
        setLocalCoords({ x: lx, y: ly });
      } else {
        setMouseInContainer(false);
      }
    };

    const handleMouseLeaveGlobal = () => {
      setMouseInContainer(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveGlobal);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveGlobal);
    };
  }, [type]);

  if (type === "blog") {
    return (
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-900/60 py-[55px] mt-16 font-sans overflow-x-clip">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-[34px]">
          <Notebook />

          {/* Small copyright at bottom */}
          <div className="text-[10px] text-zinc-400 dark:text-zinc-655 font-mono tracking-wider select-none">
            © {new Date().getFullYear()} ÖMER ASAF AK. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-900/60 py-12 mt-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-10 text-zinc-500 dark:text-zinc-400">
        
        {/* Connect Section for Projects Page (Kinetic Typography Cloud) */}
        {type === "projects" && (
          <div className="space-y-6 text-left animate-in fade-in duration-500">
            <div>
              <h3 className="text-4xl md:text-5xl font-serif italic skew-x-12 text-zinc-950 dark:text-white tracking-tight select-none origin-left inline-block mb-2">
                Connect
              </h3>
            </div>

            {/* Cloud typography container */}
            <div 
              ref={containerRef} 
              className="relative w-full h-[350px] md:h-[400px] overflow-hidden select-none border border-zinc-200/30 dark:border-zinc-800/40 rounded-3xl bg-zinc-50/10 dark:bg-zinc-950/10 backdrop-blur-sm cursor-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            >
              {/* AutoCAD Crosshair Lines */}
              {mouseInContainer && (
                <>
                  <div 
                    className="absolute left-0 right-0 h-[1px] bg-cyan-500/20 dark:bg-cyan-500/20 pointer-events-none z-0" 
                    style={{ top: localCoords.y }}
                  />
                  <div 
                    className="absolute top-0 bottom-0 w-[1px] bg-cyan-500/15 pointer-events-none z-0" 
                    style={{ left: localCoords.x }}
                  />
                </>
              )}
              
              {[
                // Interactive links (Column 1, 2, 3 aligned)
                { text: "GITHUB", href: "https://github.com/whyasaf", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-3xl md:text-5xl", top: "15%", left: "8%", factor: 0.04, rotate: -8, isLink: true },
                { text: "LINKEDIN", href: "https://www.linkedin.com/in/omer-asaf-ak/", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-2xl md:text-4xl", top: "45%", left: "38%", factor: -0.05, rotate: 6, isLink: true },
                { text: "EMAIL", href: mailtoHref(language), color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-3xl md:text-5xl", top: "15%", left: "68%", factor: 0.03, rotate: -4, isLink: true },
                { text: "WEBSITE", href: "https://whyasaf.com", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-2xl md:text-4xl", top: "70%", left: "8%", factor: -0.03, rotate: 10, isLink: true },
                { text: "X", href: "https://x.com/whyasaf", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-3xl md:text-5xl", top: "65%", left: "74%", factor: 0.04, rotate: -6, isLink: true },
                { text: "LECMIC", href: "https://lecmic.whyasaf.com", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-2xl md:text-4xl", top: "78%", left: "44%", factor: 0.05, rotate: -8, isLink: true },
                
                // Decorative minimalist context tags
                { text: "NEXT.JS", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-zinc-950 dark:hover:text-white", size: "text-xl md:text-2xl", top: "12%", left: "38%", factor: 0.06, rotate: 12 },
                { text: "PYTHON", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-zinc-950 dark:hover:text-white", size: "text-lg md:text-xl", top: "88%", left: "12%", factor: -0.02, rotate: -15 },
                { text: "UI/UX", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-zinc-950 dark:hover:text-white", size: "text-lg md:text-xl", top: "40%", left: "70%", factor: -0.04, rotate: 5 },
                { text: "MINIMAL", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-zinc-950 dark:hover:text-white", size: "text-xl md:text-2xl", top: "42%", left: "10%", factor: 0.03, rotate: 14 },
                { text: "ARCH", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-zinc-950 dark:hover:text-white", size: "text-3xl md:text-4xl", top: "85%", left: "78%", factor: 0.04, rotate: -6 },
              ].map((word, idx) => {
                const xOffset = mousePosition.x * word.factor;
                const yOffset = mousePosition.y * word.factor;
                
                const Component = word.isLink ? motion.a : motion.div;
                const linkProps = word.isLink ? {
                  href: word.href,
                  ...(word.href?.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" }),
                } : {};

                const isHovered = hoveredWordIndex === idx;

                return (
                  <Component
                    key={idx}
                    {...linkProps}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: xOffset,
                      y: yOffset,
                    }}
                    whileHover={{ 
                      scale: 1.12, 
                      rotate: word.rotate + 6,
                    }}
                    onMouseEnter={() => setHoveredWordIndex(idx)}
                    onMouseLeave={() => setHoveredWordIndex(null)}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 18 
                    }}
                    style={{
                      position: "absolute",
                      top: word.top,
                      left: word.left,
                      rotate: word.rotate,
                    }}
                    className={`skew-x-12 uppercase italic font-black tracking-tight select-none cursor-none ${word.size} ${word.color} transition-colors duration-250 z-10`}
                  >
                    <span className="relative inline-block">
                      {word.text}

                      {/* Bounding box / technical layout lines (only for links) */}
                      {word.isLink && isHovered && (
                        <span className="absolute -inset-x-3 -inset-y-1.5 border border-dashed border-cyan-500/50 dark:border-cyan-400/50 pointer-events-none block font-mono font-normal not-italic">
                          {/* Plus ticks at corners */}
                          <span className="absolute -top-2 -left-1 text-[8px] leading-none text-cyan-500 dark:text-cyan-400 select-none">+</span>
                          <span className="absolute -top-2 -right-1 text-[8px] leading-none text-cyan-500 dark:text-cyan-400 select-none">+</span>
                          <span className="absolute -bottom-1 -left-1 text-[8px] leading-none text-cyan-500 dark:text-cyan-400 select-none">+</span>
                          <span className="absolute -bottom-1 -right-1 text-[8px] leading-none text-cyan-500 dark:text-cyan-400 select-none">+</span>

                          {/* Coordinates Indicator */}
                          <span className="absolute -top-5 left-0 bg-cyan-500 text-white text-[7px] px-1 py-0.5 rounded font-mono leading-none scale-90 origin-bottom-left select-none shadow-sm">
                            X:{Math.round(localCoords.x)} Y:{Math.round(localCoords.y)}
                          </span>

                          {/* Dimension Indicator */}
                          <span className="absolute -bottom-4 right-0 text-cyan-500/80 dark:text-cyan-400/80 text-[7px] font-mono leading-none scale-90 origin-top-right select-none">
                            d:{word.text.length * 10}px
                          </span>
                        </span>
                      )}
                    </span>
                  </Component>
                );
              })}
            </div>
          </div>
        )}

        {type !== "projects" && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-zinc-500 dark:text-zinc-400 w-full">
            
            {/* Left branding or status indicator */}
            <div className="flex items-center gap-2 text-xs select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium tracking-wide">
                {language === "tr" ? "İş Birliklerine Açık" : "Open for projects"}
              </span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
