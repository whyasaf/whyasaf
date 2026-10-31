"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  animate,
  motion,
  motionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { CONTACT_EMAIL, mailtoHref } from "../lib/contact";
import { getReadPosts, getSortedPosts } from "../lib/blog";

const TURN = { duration: 0.75, ease: [0.645, 0.045, 0.355, 1] as const };
const hiddenFace = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;

// Lined paper: every row of handwriting sits on one 28px rule
const LINES = "repeating-linear-gradient(to bottom, transparent 0 27px, rgba(6, 182, 212, 0.14) 27px 28px)";

function Paper({
  side,
  lined = true,
  children,
}: {
  side: "left" | "right";
  lined?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-[#fdfcfa] dark:bg-[#1a1a1d] ring-1 ring-inset ring-black/[0.07] dark:ring-white/[0.04] text-zinc-800 dark:text-zinc-200 ${
        side === "right" ? "rounded-r-lg" : "rounded-l-lg"
      }`}
    >
      {lined && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: LINES, backgroundPosition: "0 13px" }}
        />
      )}
      {/* Shadow of the page falling into the binding */}
      <div
        className={`absolute inset-y-0 w-10 pointer-events-none ${
          side === "right"
            ? "left-0 bg-gradient-to-r from-black/[0.09] dark:from-black/40 to-transparent"
            : "right-0 bg-gradient-to-l from-black/[0.09] dark:from-black/40 to-transparent"
        }`}
      />
      <div className="relative h-full px-[26px] pt-[13px] pb-[21px] flex flex-col font-hand text-[21px] leading-[28px]">
        {children}
      </div>
    </div>
  );
}

function Sheet({
  rotation,
  index,
  count,
  single,
  front,
  back,
}: {
  rotation: MotionValue<number>;
  index: number;
  count: number;
  single: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  // Each stack keeps its own order, and everything stays in front of the book's
  // own plane: anything behind it would look fine but could not be clicked
  const z = useTransform(rotation, (r) => 1 + (r < -90 ? index + 1 : count - index) * 0.5);
  const shade = useTransform(rotation, [0, -90, -180], [0, 0.3, 0]);
  // On phones there is no left page, so a turned sheet leaves the screen
  const opacity = useTransform(rotation, [-180, -130], [single ? 0 : 1, 1]);

  return (
    <motion.div
      className="absolute top-0 h-full"
      style={{
        left: single ? 0 : "50%",
        width: single ? "100%" : "50%",
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        rotateY: rotation,
        z,
        opacity,
      }}
    >
      <div className="absolute inset-0" style={hiddenFace}>
        {front}
        <motion.div
          className="absolute inset-0 bg-black rounded-r-lg pointer-events-none"
          style={{ opacity: shade }}
        />
      </div>
      <div className="absolute inset-0" style={{ ...hiddenFace, transform: "rotateY(180deg)" }}>
        {back}
        <motion.div
          className="absolute inset-0 bg-black rounded-l-lg pointer-events-none"
          style={{ opacity: shade }}
        />
      </div>
    </motion.div>
  );
}

/** Text that appears word by word, as if it is being written. */
function Handwritten({ text, play, delay = 0 }: { text: string; play: boolean; delay?: number }) {
  const reduceMotion = useReducedMotion();
  let start = delay;

  return (
    <>
      {text.split(" ").map((word, i) => {
        const duration = 0.08 + word.length * 0.05;
        const wordDelay = start;
        start += duration;
        return (
          <React.Fragment key={i}>
            <motion.span
              className="inline-block"
              initial={{ clipPath: reduceMotion ? "inset(-20% 0% -20% 0)" : "inset(-20% 100% -20% 0)" }}
              animate={play ? { clipPath: "inset(-20% 0% -20% 0)" } : undefined}
              transition={{ duration, delay: wordDelay, ease: "linear" }}
            >
              {word}
            </motion.span>{" "}
          </React.Fragment>
        );
      })}
    </>
  );
}

const handwritingTime = (text: string) =>
  text.split(" ").reduce((sum, word) => sum + 0.08 + word.length * 0.05, 0);

// ── Paper plane ──────────────────────────────────────────────

type Point = [number, number];

const polygon = (points: Point[]) =>
  `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

const TEETH = 12;

/** The left edge running from `from` to `to`, with a torn zigzag of size `tear`. */
const leftEdge = (from: Point, to: Point, tear: number): Point[] =>
  Array.from({ length: TEETH }, (_, i) => {
    const t = (i + 1) / (TEETH + 1);
    return [from[0] + (to[0] - from[0]) * t + (i % 2 ? tear : 0), from[1] + (to[1] - from[1]) * t];
  });

// Same point count in every stage, so the sheet can morph between them
const SHEET = polygon([[50, 0], [100, 0], [100, 100], [50, 100], [0, 100], ...leftEdge([0, 100], [0, 0], 2.4), [0, 0]]);
const NOSE = polygon([[50, 0], [100, 18], [100, 100], [50, 100], [0, 100], ...leftEdge([0, 100], [0, 18], 0), [0, 18]]);
const DART = polygon([[50, 0], [56, 60], [100, 100], [50, 82], [0, 100], ...leftEdge([0, 100], [44, 60], 0), [44, 60]]);
const FOLDED_SCALE = 0.22;

function PaperPlane({ rect, text, onDone }: { rect: DOMRect; text: string; onDone: () => void }) {
  const [stage, setStage] = useState<"fold" | "fly">("fold");
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const route = useMemo(() => {
    const points: Point[] = [
      [0, 0],
      [-120, 80],
      [-190, -30],
      [-50, -170],
      [230, -130],
      [window.innerWidth - centerX + 160, -centerY - 160],
    ];
    const headings = points.slice(1).map((point, i) => {
      const [fromX, fromY] = points[i];
      return (Math.atan2(point[0] - fromX, fromY - point[1]) * 180) / Math.PI;
    });
    return {
      x: points.map((point) => point[0]),
      y: points.map((point) => point[1]),
      rotate: [0, ...headings],
    };
  }, [centerX, centerY]);

  if (stage === "fold") {
    return (
      <motion.div
        className="fixed z-[100] overflow-hidden bg-[#fdfcfa] dark:bg-[#2a2a2f] text-zinc-800 dark:text-zinc-200 shadow-2xl"
        style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
        initial={{ clipPath: SHEET }}
        animate={{
          clipPath: [SHEET, SHEET, NOSE, DART],
          y: [0, -16, -16, -16],
          rotate: [0, -2.5, -2.5, 0],
          scale: [1, 1, 0.8, FOLDED_SCALE],
        }}
        transition={{ duration: 1.15, times: [0, 0.22, 0.55, 1], ease: "easeInOut" }}
        onAnimationComplete={() => setStage("fly")}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: LINES, backgroundPosition: "0 13px" }}
        />
        <p className="relative px-[26px] pt-[69px] font-hand text-[21px] leading-[28px] whitespace-pre-wrap break-words">
          {text}
        </p>
      </motion.div>
    );
  }

  const width = rect.width * FOLDED_SCALE;
  const height = rect.height * FOLDED_SCALE;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="fixed z-[100] drop-shadow-xl"
      style={{ left: centerX - width / 2, top: centerY - height / 2 - 16, width, height }}
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{ ...route, scale: [1, 1.1, 1.2, 1, 0.8, 0.45] }}
      transition={{ duration: 1.9, ease: "easeInOut" }}
      onAnimationComplete={onDone}
      aria-hidden="true"
    >
      <polygon points="50,0 44,60 0,100 50,82" fill="#fdfcfa" stroke="#a1a1aa" strokeWidth="0.8" />
      <polygon points="50,0 56,60 100,100 50,82" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="0.8" />
      <polygon points="50,0 56,60 50,82 44,60" fill="#a1a1aa" />
    </motion.svg>
  );
}

// ── Notebook ─────────────────────────────────────────────────

export default function Notebook() {
  const { language } = useLanguage();
  const t = translations[language];
  const reduceMotion = useReducedMotion();

  const [single, setSingle] = useState<boolean | null>(null);
  const [flipped, setFlipped] = useState(0);
  const [bandOff, setBandOff] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [flight, setFlight] = useState<{ rect: DOMRect; text: string } | null>(null);
  const [sentHref, setSentHref] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const bookRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    side: "left" | "right";
    direction: "next" | "prev" | null;
    sheet: number;
    progress: number;
  } | null>(null);

  const posts = useMemo(() => getSortedPosts(), []);
  const recent = posts.slice(0, 5);
  const readCount = recent.filter((post) => readIds.includes(post.id)).length;

  const sheetCount = single ? 6 : 3;
  const rotations = useMemo(
    () => Array.from({ length: sheetCount }, () => motionValue(0)),
    [sheetCount]
  );
  const bookOpacity = useMemo(() => motionValue(1), []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 699px)");
    const update = () => {
      setSingle(query.matches);
      setFlipped(0);
      setBandOff(false);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setReadIds(getReadPosts());
  }, [flipped]);

  const flipTo = (target: number) => {
    const next = Math.min(sheetCount, Math.max(0, target));
    rotations.forEach((rotation, i) => {
      const value = i < next ? -180 : 0;
      if (reduceMotion) rotation.set(value);
      else animate(rotation, value, TURN);
    });
    if (reduceMotion) animate(bookOpacity, [0.3, 1], { duration: 0.3 });
    setFlipped(next);
    if (next === 0) setBandOff(false);
  };

  const openBook = () => {
    if (flipped > 0 || bandOff) return;
    setBandOff(true);
    setTimeout(() => flipTo(1), reduceMotion ? 0 : 200);
  };

  // Turning a page by hand: the sheet follows the pointer, then finishes or falls back
  const onPointerDown = (e: React.PointerEvent) => {
    if (flipped === 0 || !bookRef.current) return;
    if ((e.target as Element).closest("a, button, textarea")) return;
    const rect = bookRef.current.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      side: e.clientX < rect.left + rect.width / 2 ? "left" : "right",
      direction: null,
      sheet: 0,
      progress: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || !bookRef.current) return;
    const dx = e.clientX - drag.startX;

    if (!drag.direction) {
      if (Math.abs(dx) < 8) return;
      const direction = dx < 0 ? "next" : "prev";
      const wrongSide = !single && (direction === "next" ? drag.side !== "right" : drag.side !== "left");
      if (wrongSide || (direction === "next" && flipped >= sheetCount)) {
        dragRef.current = null;
        return;
      }
      drag.direction = direction;
      drag.sheet = direction === "next" ? flipped : flipped - 1;
      bookRef.current.setPointerCapture(e.pointerId);
    }

    drag.progress = Math.min(1, Math.abs(dx) / bookRef.current.offsetWidth);
    rotations[drag.sheet].set(drag.direction === "next" ? -180 * drag.progress : -180 * (1 - drag.progress));
  };

  const onPointerUp = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag?.direction) return;
    if (drag.progress > 0.35) {
      flipTo(drag.direction === "next" ? flipped + 1 : flipped - 1);
    } else {
      animate(rotations[drag.sheet], drag.direction === "next" ? 0 : -180, TURN);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as Element).closest("textarea") || flipped === 0) return;
    if (e.key === "ArrowRight") flipTo(flipped + 1);
    if (e.key === "ArrowLeft") flipTo(flipped - 1);
  };

  const sendNote = () => {
    const text = note.trim();
    if (!text || flight || !noteRef.current) return;
    const href = mailtoHref(language, text);
    setNote("");
    if (reduceMotion) {
      setSentHref(href);
      window.location.href = href;
      return;
    }
    setFlight({ rect: noteRef.current.getBoundingClientRect(), text });
    setSentHref(href);
  };

  const onLanded = () => {
    setFlight(null);
    if (sentHref) window.location.href = sentHref;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  // Reserves the height until the layout (one page or two) is known
  if (single === null) return <div className="h-[500px] mb-[89px]" />;

  const coverPage = (
    <div
      role="button"
      tabIndex={0}
      aria-label={t.notebookOpen}
      onClick={openBook}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openBook();
        }
      }}
      className="absolute inset-0 rounded-r-lg rounded-l-[4px] overflow-hidden cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{ background: "linear-gradient(150deg, #dccbad 0%, #cfbc99 55%, #c2ab86 100%)" }}
    >
      {/* Leather grain */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Hinge and stitching */}
      <div className="absolute inset-y-0 left-0 w-[18px] bg-gradient-to-r from-[#6b5436]/40 via-white/20 to-[#6b5436]/25" />
      <div className="absolute top-[13px] bottom-[13px] left-[30px] right-[13px] border border-dashed border-[#6b5436]/40 rounded" />

      <div className="absolute inset-0 pl-[18px] flex flex-col items-center justify-center gap-[21px]">
        <img
          src="/assets/wa_com2.png"
          alt=""
          className="h-9 w-auto opacity-75"
          style={{ filter: "sepia(1) drop-shadow(0 1px 0 rgba(255,255,255,0.45)) drop-shadow(0 -1px 0 rgba(76,58,34,0.25))" }}
        />
        <span className="font-hand text-[26px] text-[#5b4629]/80">{t.notebookTitle}</span>
      </div>

      {/* Elastic band: drag it off, or just tap the cover */}
      <motion.div
        className="absolute inset-y-0 right-[34px] w-[13px]"
        animate={bandOff ? { x: 90, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.22, ease: "easeIn" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 56 }}
          dragElastic={0.12}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.x > 28) openBook();
          }}
          className="h-full w-full cursor-grab active:cursor-grabbing bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-700 shadow-[2px_0_6px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </div>
  );

  const ownerPage = (
    <Paper side={single ? "right" : "left"} lined={false}>
      <div className="flex-1 flex flex-col justify-center gap-[21px]">
        <span className="text-zinc-500 dark:text-zinc-400">{t.notebookOwner}</span>
        <span className="text-[34px] leading-[42px] text-zinc-900 dark:text-zinc-100">Ömer Asaf Ak</span>
        <span className="block w-[89px] h-px bg-cyan-500/50" />
        <span className="text-zinc-500 dark:text-zinc-400">{t.notebookFinder}</span>
      </div>
    </Paper>
  );

  const quoteVisible = flipped >= (single ? 2 : 1);
  const quotePage = (
    <Paper side="right" lined={false}>
      <div className="flex-1 flex flex-col justify-center">
        <p key={language} className="text-[38px] leading-[46px] text-zinc-900 dark:text-zinc-100">
          <Handwritten text={t.notebookQuote} play={quoteVisible} delay={0.6} />
        </p>
        <svg viewBox="0 0 220 14" className="w-[200px] h-[14px] mt-[13px] text-cyan-500" fill="none" aria-hidden="true">
          <motion.path
            key={language}
            d="M3 9C42 3 78 12 118 7s72-3 98 2"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            animate={quoteVisible ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.7 + handwritingTime(t.notebookQuote) }}
          />
        </svg>
      </div>
      <span className="self-end text-zinc-500 dark:text-zinc-400">— whyasaf</span>
    </Paper>
  );

  const contentsPage = (
    <Paper side={single ? "right" : "left"}>
      <h4 className="text-[30px] leading-[56px] font-bold text-zinc-900 dark:text-zinc-100">
        {t.notebookContents}
      </h4>
      <ol className="flex-1">
        {recent.map((post) => {
          const isRead = readIds.includes(post.id);
          return (
            <li key={post.id} className="h-[56px]">
              <Link
                href={`/blog/${post.id}`}
                className="flex items-start gap-2 h-full text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <span className="relative shrink-0 w-[18px] h-[18px] mt-[5px] rounded-[3px] border border-zinc-400/60">
                  {isRead && (
                    <svg viewBox="0 0 24 24" className="absolute -inset-1 text-cyan-500" fill="none" aria-hidden="true">
                      <motion.path
                        d="M4 13l5 6L21 4"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: reduceMotion ? 1 : 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      />
                    </svg>
                  )}
                </span>
                <span className="line-clamp-2 min-w-0">{language === "tr" ? post.tr.title : post.en.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <span className="text-zinc-500 dark:text-zinc-400 text-[18px]">
        {readCount === 0
          ? t.notebookReadEmpty
          : `${readCount}/${recent.length} ${t.notebookReadSome}`}
      </span>
    </Paper>
  );

  const stickyNotes = [
    { label: "X", detail: "@whyasaf", href: "https://x.com/whyasaf", color: "#fdf0a6", tilt: -4, shift: "self-start" },
    { label: "LinkedIn", detail: "omer-asaf-ak", href: "https://www.linkedin.com/in/omer-asaf-ak/", color: "#bdeefa", tilt: 3, shift: "self-end" },
    { label: "GitHub", detail: "whyasaf", href: "https://github.com/whyasaf", color: "#ffd6e0", tilt: -2, shift: "self-start ml-4" },
  ];

  const linksPage = (
    <Paper side="right" lined={false}>
      <h4 className="text-[30px] leading-[56px] font-bold text-zinc-900 dark:text-zinc-100">
        {t.notebookLinks}
      </h4>
      <div className="flex-1 flex flex-col justify-around pb-[13px]">
        {stickyNotes.map((sticky) => (
          // The tilt lives on an inner span: a transformed link inside a 3D page stops taking clicks
          <motion.a
            key={sticky.label}
            href={sticky.href}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            className={`block w-[176px] ${sticky.shift}`}
          >
            <motion.span
              variants={{
                rest: { rotate: sticky.tilt, scale: 1 },
                hover: { rotate: 0, scale: 1.06 },
              }}
              className="relative block px-[16px] py-[10px] text-zinc-800 shadow-md"
              style={{ backgroundColor: sticky.color }}
            >
              {/* Tape */}
              <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 -rotate-2 w-[55px] h-[18px] bg-white/55 dark:bg-white/25 shadow-sm" />
              <span className="block text-[25px] leading-[28px] font-bold">{sticky.label}</span>
              <span className="block text-[17px] leading-[22px] opacity-60">{sticky.detail}</span>
            </motion.span>
          </motion.a>
        ))}
      </div>
    </Paper>
  );

  const noteIntroPage = (
    <Paper side={single ? "right" : "left"} lined={false}>
      <div className="flex-1 flex flex-col justify-center gap-[13px]">
        <h4 className="text-[34px] leading-[40px] font-bold text-zinc-900 dark:text-zinc-100">
          {t.notebookNoteTitle}
        </h4>
        <p className="text-zinc-500 dark:text-zinc-400">{t.notebookNoteDesc}</p>
        <svg viewBox="0 0 240 120" className="w-full mt-[13px] text-cyan-500" fill="none" aria-hidden="true">
          <motion.path
            d="M6 104C46 112 92 96 102 68c8-24-26-34-34-12-10 28 58 44 118-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 9"
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -26] }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
          />
          <path d="M226 6l-44 16 16 7 5 17 9-11 14 5z" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M226 6l-28 23" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <button
        onClick={copyAddress}
        className="self-start flex items-center gap-1.5 text-[18px] text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? t.notebookCopied : t.notebookCopy}
      </button>
    </Paper>
  );

  const notePage = (
    <div ref={noteRef} className="absolute inset-0">
      <Paper side="right">
        {sentHref ? (
          <div className="flex-1 flex flex-col justify-center gap-[13px]">
            <span className="text-[38px] leading-[46px] text-zinc-900 dark:text-zinc-100">{t.notebookSent}</span>
            {!flight && (
              <>
                <a href={sentHref} className="text-zinc-500 dark:text-zinc-400 underline underline-offset-4 hover:text-cyan-600 dark:hover:text-cyan-400">
                  {t.notebookSentHint}
                </a>
                <button
                  onClick={() => setSentHref(null)}
                  className="self-start text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-4"
                >
                  {t.notebookAgain}
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.notebookPlaceholder}
              aria-label={t.notebookNoteTitle}
              maxLength={800}
              className="flex-1 mt-[56px] w-full resize-none bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
            <button
              onClick={sendNote}
              disabled={!note.trim()}
              className="self-end mt-[13px] px-[21px] py-[3px] rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              {t.notebookSend}
            </button>
          </>
        )}
      </Paper>
    </div>
  );

  const blank = <Paper side="left" lined={false} />;
  const faces: [React.ReactNode, React.ReactNode][] = single
    ? [
        [coverPage, blank],
        [ownerPage, blank],
        [quotePage, blank],
        [contentsPage, blank],
        [linksPage, blank],
        [noteIntroPage, blank],
      ]
    : [
        [coverPage, ownerPage],
        [quotePage, contentsPage],
        [linksPage, noteIntroPage],
      ];

  // Hidden faces stay out of the tab order and away from screen readers
  const face = (visible: boolean, content: React.ReactNode) => (
    <div {...(visible ? {} : ({ inert: "" } as object))}>{content}</div>
  );

  return (
    <div
      role="region"
      aria-label={t.notebookTitle}
      onKeyDown={onKeyDown}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={reduceMotion ? false : { y: 55, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ perspective: 2000 }}
      >
        <motion.div
          ref={bookRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          initial={false}
          animate={{ x: flipped > 0 || single ? 0 : "-25%", rotate: flipped > 0 ? 0 : -2 }}
          transition={TURN}
          className={`relative h-[500px] select-none ${single ? "w-[309px]" : "w-[618px]"}`}
          style={{ transformStyle: "preserve-3d", touchAction: "pan-y", opacity: bookOpacity }}
        >
          {/* Last page, glued to the back cover */}
          <div
            className="absolute top-0 h-full rounded-r-lg"
            style={{
              left: single ? 0 : "50%",
              width: single ? "100%" : "50%",
              transform: "translateZ(0.5px)",
              boxShadow:
                "1px 1px 0 #e7e5e0, 2px 2px 0 #d6d3cd, 3px 3px 0 #e7e5e0, 5px 6px 0 #c2ab86, 0 34px 55px -21px rgba(0, 0, 0, 0.55)",
            }}
          >
            {face(flipped === sheetCount, notePage)}
          </div>

          {faces.map(([front, back], i) => (
            <Sheet
              key={i}
              rotation={rotations[i]}
              index={i}
              count={sheetCount}
              single={single}
              front={face(i === flipped, front)}
              back={face(!single && i === flipped - 1, back)}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Page controls */}
      <div
        className={`flex items-center gap-[13px] h-[34px] mt-[55px] text-zinc-500 dark:text-zinc-400 font-mono text-xs transition-opacity duration-300 ${
          flipped > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => flipTo(flipped - 1)}
          aria-label={t.notebookPrev}
          className="p-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="select-none">
          {flipped} / {sheetCount}
        </span>
        <button
          onClick={() => flipTo(flipped + 1)}
          disabled={flipped >= sheetCount}
          aria-label={t.notebookNext}
          className="p-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => flipTo(0)}
          aria-label={t.notebookClose}
          className="p-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {flight &&
        createPortal(
          <PaperPlane rect={flight.rect} text={flight.text} onDone={onLanded} />,
          document.body
        )}
    </div>
  );
}
