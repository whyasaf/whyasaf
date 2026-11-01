import NotFoundContent from "../src/components/NotFoundContent";
import { fontVariables, themeScript } from "../src/lib/document";
import "./globals.css";

export const metadata = {
  title: "Sayfa Bulunamadı | whyasaf",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${fontVariables} font-sans min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-[#f4f4f5] flex flex-col`}>
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
