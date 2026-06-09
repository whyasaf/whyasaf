import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import ThemeSwitcher from "../src/components/ThemeSwitcher";
import { LanguageProvider } from "../src/context/LanguageContext";
import LanguageSwitcher from "../src/components/LanguageSwitcher";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  metadataBase: new URL('https://whyasaf.com'),
  title: {
    default: 'whyasaf | Yazılım Geliştirici ve Tasarımcı',
    template: '%s | whyasaf',
  },
  description: "Ömer Asaf Ak'ın kişisel portfolyo ve blog sitesi. Yazılım mimarisi, AI ürün geliştirme ve arayüz tasarımı üzerine çalışmalar.",
  openGraph: {
    title: 'whyasaf | Yazılım Geliştirici ve Tasarımcı',
    description: "Ömer Asaf Ak'ın kişisel portfolyo ve blog sitesi. Yazılım mimarisi, AI ürün geliştirme ve arayüz tasarımı üzerine çalışmalar.",
    url: 'https://whyasaf.com',
    siteName: 'whyasaf',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'whyasaf | Yazılım Geliştirici ve Tasarımcı',
    description: "Ömer Asaf Ak'ın kişisel portfolyo ve blog sitesi. Yazılım mimarisi, AI ürün geliştirme ve arayüz tasarımı üzerine çalışmalar.",
    creator: '@whyasaf',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        {/* Anti-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-[#f4f4f5] flex flex-col transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100`}>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ömer Asaf Ak",
              "alternateName": "whyasaf",
              "url": "https://whyasaf.com",
              "jobTitle": "Product Developer & Systems Architect",
              "sameAs": [
                "https://github.com/whyasaf",
                "https://www.linkedin.com/in/omer-asaf-ak/",
                "https://x.com/whyasaf"
              ],
              "knowsAbout": [
                "Next.js",
                "UI/UX Design",
                "Python",
                "Systems Architecture",
                "Software Engineering",
                "Web Development"
              ]
            })
          }}
        />
        <LanguageProvider>
          {/* Floating Switchers */}
          <LanguageSwitcher />
          <ThemeSwitcher />

          {/* Main Content */}
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
