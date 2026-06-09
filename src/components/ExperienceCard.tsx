"use client";

import React, { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface ExperienceCardProps {
  videoSrc?: string;
  imageSrc?: string;
  imageMode?: "cover" | "contain" | "center";
  logo: React.ReactNode;
  title: string;
  period: string;
  subtitle: string;
  description: string;
}

export default function ExperienceCard({
  videoSrc,
  imageSrc,
  imageMode = "cover",
  logo,
  title,
  period,
  subtitle,
  description,
}: ExperienceCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 rounded-3xl p-4 md:p-6 transition-all duration-300 hover:border-cyan-500/30 shadow-sm flex flex-col gap-6 text-left group">
      
      {/* Media Showcase Container */}
      <div className="relative aspect-[16/9] w-full bg-zinc-50 dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${title} Medya`}
            className={`w-full h-full select-none ${
              imageMode === "contain"
                ? "object-contain p-8"
                : imageMode === "center"
                ? "object-none scale-75"
                : "object-cover"
            }`}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover rounded-2xl select-none"
            />
            
            {/* Mute/Unmute Float Trigger */}
            <button
              onClick={toggleMute}
              className="absolute bottom-3 right-3 p-2 bg-black/60 dark:bg-zinc-900/80 text-zinc-100 hover:bg-cyan-600 rounded-full transition-all duration-300 shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="space-y-3 px-1">
        
        {/* Header Row */}
        <div className="flex justify-between items-end gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-cyan-950/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              {logo}
            </div>
            <h3 
              className="text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-none"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
            >
              {title}
            </h3>
          </div>
          <span className="text-sm font-light text-zinc-400 dark:text-zinc-500 tracking-wide font-mono mb-0.5 shrink-0">
            {period}
          </span>
        </div>

        {/* Subtitle */}
        <div className="text-xs font-semibold text-zinc-650 dark:text-zinc-350 tracking-wider uppercase">
          {subtitle}
        </div>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400/95 text-sm md:text-base leading-relaxed font-light">
          {description}
        </p>

      </div>
    </div>
  );
}
