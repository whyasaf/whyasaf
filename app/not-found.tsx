import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Sayfa Bulunamadı",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="text-center py-24 space-y-4">
      <p className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">404</p>
      <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-zinc-900 dark:text-zinc-100">
        Sayfa bulunamadı
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. / This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 underline underline-offset-4"
      >
        <ArrowLeft size={16} /> Ana sayfa / Home
      </Link>
    </div>
  );
}
