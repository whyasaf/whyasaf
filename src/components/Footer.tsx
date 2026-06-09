"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { Mail, Linkedin, FileText, Github, Globe, Sparkles, Rss, Twitter, Send, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface FooterProps {
  type: "about" | "projects" | "blog";
}

export default function Footer({ type }: FooterProps) {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Newsletter Form State
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Newsletter signed up!", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
      setShowNewsletterForm(false);
    }, 2500);
  };

  const [spread, setSpread] = useState(1);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const turnControls = useAnimation();

  const handleNextSpread = async () => {
    if (isTurning) return;
    setTurnDirection("next");
    setIsTurning(true);
    
    // Animate turning page to rotate -180deg (pivot is left edge of right page)
    await turnControls.start({
      rotateY: -180,
      transition: { duration: 0.55, ease: "easeInOut" }
    });
    
    setSpread((prev) => (prev === 2 ? 1 : prev + 1));
    setIsTurning(false);
    
    // Reset turnControls position instantly
    turnControls.set({ rotateY: 0 });
  };

  const handlePrevSpread = async () => {
    if (isTurning) return;
    setTurnDirection("prev");
    setIsTurning(true);
    
    // Start page on the left side (rotateY starts at -180deg)
    turnControls.set({ rotateY: -180 });
    
    // Animate turning page back to 0deg (unfolds to the right)
    await turnControls.start({
      rotateY: 0,
      transition: { duration: 0.55, ease: "easeInOut" }
    });
    
    setSpread((prev) => (prev === 1 ? 2 : prev - 1));
    setIsTurning(false);
  };

  const renderLeftPageContent = (pageIndex: number) => {
    if (pageIndex === 1) {
      return (
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <div className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-650 uppercase">
            Ömer Asaf Ak // Bio
          </div>
          <div className="flex-1 flex items-center pr-4">
            <p className="font-serif italic text-base md:text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
              "{t.notebookQuote}"
            </p>
          </div>
        </div>
      );
    }
    if (pageIndex === 2) {
      return (
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <div className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-650 uppercase">
            Social Links
          </div>
          <div className="flex-1 flex items-center justify-center">
            <a 
              href="https://www.linkedin.com/in/omer-asaf-ak/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-serif italic text-base md:text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 leading-relaxed cursor-pointer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderRightPageContent = (pageIndex: number, onAction?: () => void) => {
    if (pageIndex === 1) {
      return (
        <div className="flex-1 flex flex-col justify-between h-full relative z-10 pl-4">
          <div className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-655 uppercase">
            Social Links
          </div>
          <div className="flex-1 flex items-center justify-center">
            <a 
              href="https://x.com/whyasaf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-serif italic text-base md:text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 leading-relaxed cursor-pointer"
            >
              Twitter / X
            </a>
          </div>
          {onAction && (
            <div className="flex justify-end">
              <button 
                onClick={onAction}
                className="text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Next page"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      );
    }
    if (pageIndex === 2) {
      return (
        <div className="flex-1 flex flex-col justify-between h-full relative z-10 pl-4">
          <div className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-655 uppercase">
            Code
          </div>
          <div className="flex-1 flex items-center justify-center">
            <a 
              href="https://github.com/whyasaf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-serif italic text-base md:text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 leading-relaxed cursor-pointer"
            >
              GitHub
            </a>
          </div>
          {onAction && (
            <div className="flex justify-end">
              <button 
                onClick={onAction}
                className="text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Return to Page 1"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          )}
        </div>
      );
    }
    return null;
  };  if (type === "blog") {
    // Determine static contents during animations
    const activeLeftPage = isTurning
      ? (turnDirection === "next" ? spread : (spread === 1 ? 2 : spread - 1))
      : spread;
      
    const activeRightPage = isTurning
      ? (turnDirection === "next" ? (spread === 2 ? 1 : spread + 1) : spread)
      : spread;

    return (
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-900/60 py-16 mt-16 font-sans">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center">
          
          {/* 3D Notebook Component Container */}
          <div className="w-full flex h-64 md:h-72 perspective-[1500px] select-none relative z-10 mb-8">
            
            {/* Left Page (Static behind or active page) */}
            <div className="w-1/2 bg-[#fdfcfa] dark:bg-zinc-900/90 border border-r-0 border-zinc-200/80 dark:border-zinc-800/80 rounded-l-lg shadow-sm relative overflow-hidden flex flex-col justify-between p-6 text-left">
              {/* Sketch Grid Lines */}
              <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px"
                }}
              />
              {/* Notebook Margin Line */}
              <div className="absolute right-6 top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none" />
              
              {/* Left page content */}
              {renderLeftPageContent(activeLeftPage)}
            </div>

            {/* Spine with Spiral Binding Rings - Absolutely Centered */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[16px] md:w-[20px] -translate-x-1/2 bg-zinc-100 dark:bg-zinc-950 border-y border-x border-zinc-200/80 dark:border-zinc-800/80 z-50 shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]">
              {/* Spiral rings extending left/right */}
              <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-around py-4 pointer-events-none z-50">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-[5px] w-[26px] md:w-[32px] relative left-1/2 -translate-x-1/2 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-full border border-zinc-400/20 dark:border-zinc-900 shadow-sm" 
                  />
                ))}
              </div>
            </div>

            {/* Right Page (Static behind or active page) */}
            <div className="w-1/2 bg-[#fdfcfa] dark:bg-zinc-900/90 border border-l-0 border-zinc-200/80 dark:border-zinc-800/80 rounded-r-lg shadow-sm relative overflow-hidden flex flex-col justify-between p-6 text-left">
              {/* Sketch Grid Lines */}
              <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px"
                }}
              />
              {/* Notebook Margin Line */}
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none" />

              {/* Right page content (handles action events) */}
              {renderRightPageContent(
                activeRightPage, 
                spread === 2 ? handleNextSpread : handleNextSpread
              )}
            </div>

            {/* Dynamic Turning Page Overlay (only active when turning next) */}
            {isTurning && turnDirection === "next" && (
              <motion.div
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  left: "50%",
                  width: "50%",
                  height: "100%",
                  zIndex: 40,
                }}
                initial={{ rotateY: 0 }}
                animate={turnControls}
              >
                {/* Front Face (CONNECT/Current Right Page Content) */}
                <div 
                  className="absolute inset-0 bg-[#fdfcfa] dark:bg-zinc-900 border border-l-0 border-zinc-200/80 dark:border-zinc-800/80 rounded-r-lg p-6 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
                      `,
                      backgroundSize: "16px 16px"
                    }}
                  />
                  <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none" />
                  {renderRightPageContent(spread)}
                  
                  {/* Sweep Shadow for front page curling up */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.27, ease: "easeIn" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 dark:to-black/50 pointer-events-none z-25"
                  />
                </div>

                {/* Back Face (Connect Left Page Content for next page) */}
                <div 
                  className="absolute inset-0 bg-[#fdfcfa] dark:bg-zinc-900 border border-r-0 border-zinc-200/80 dark:border-zinc-800/80 rounded-l-lg p-6 flex flex-col justify-between overflow-hidden"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
                      `,
                      backgroundSize: "16px 16px"
                    }}
                  />
                  <div className="absolute right-6 top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none" />
                  {renderLeftPageContent(spread === 2 ? 1 : spread + 1)}

                  {/* Sweep Shadow for back page laying down */}
                  <motion.div 
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.27, delay: 0.27, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 dark:to-black/50 pointer-events-none z-25"
                  />
                </div>
              </motion.div>
            )}

            {/* Dynamic Turning Page Overlay (only active when turning prev) */}
            {isTurning && turnDirection === "prev" && (
              <motion.div
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  left: "0",
                  width: "50%",
                  height: "100%",
                  zIndex: 40,
                }}
                initial={{ rotateY: -180 }}
                animate={turnControls}
              >
                {/* Back Face (Right side, shows target right page content) */}
                <div 
                  className="absolute inset-0 bg-[#fdfcfa] dark:bg-zinc-900 border border-l-0 border-zinc-200/80 dark:border-zinc-800/80 rounded-r-lg p-6 flex flex-col justify-between overflow-hidden"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
                      `,
                      backgroundSize: "16px 16px"
                    }}
                  />
                  <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none" />
                  {renderRightPageContent(spread === 1 ? 2 : spread - 1)}

                  {/* Sweep Shadow for back page laying down to right */}
                  <motion.div 
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.27, delay: 0.27, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 dark:to-black/50 pointer-events-none z-25"
                  />
                </div>

                {/* Front Face (Left side, shows current left page content) */}
                <div 
                  className="absolute inset-0 bg-[#fdfcfa] dark:bg-zinc-900 border border-r-0 border-zinc-200/80 dark:border-zinc-800/80 rounded-l-lg p-6 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
                      `,
                      backgroundSize: "16px 16px"
                    }}
                  />
                  <div className="absolute right-6 top-0 bottom-0 w-[1px] bg-red-500/10 pointer-events-none" />
                  {renderLeftPageContent(spread)}

                  {/* Sweep Shadow for front page lifting up from left */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.27, ease: "easeIn" }}
                    className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 dark:to-black/50 pointer-events-none z-25"
                  />
                </div>
              </motion.div>
            )}

          </div>

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
                { text: "EMAIL", href: "mailto:whyasaf.wa@gmail.com", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-3xl md:text-5xl", top: "15%", left: "68%", factor: 0.03, rotate: -4, isLink: true },
                { text: "WEBSITE", href: "https://whyasaf.com", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-2xl md:text-4xl", top: "70%", left: "8%", factor: -0.03, rotate: 10, isLink: true },
                { text: "X", href: "https://x.com/whyasaf", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-3xl md:text-5xl", top: "65%", left: "74%", factor: 0.04, rotate: -6, isLink: true },
                { text: "CODEVOCAB", href: "https://codevocab.whyasaf.com", color: "text-zinc-400/45 dark:text-zinc-600/40 hover:text-cyan-500 dark:hover:text-cyan-400", size: "text-2xl md:text-4xl", top: "78%", left: "44%", factor: 0.05, rotate: -8, isLink: true },
                
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
                  target: "_blank",
                  rel: "noopener noreferrer",
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
