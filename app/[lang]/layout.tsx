import React from "react";
import ThemeSwitcher from "../../src/components/ThemeSwitcher";
import { LanguageProvider } from "../../src/context/LanguageContext";
import LanguageSwitcher from "../../src/components/LanguageSwitcher";
import { fontVariables, themeScript } from "../../src/lib/document";
import { Language, languages, pageAlternates, SITE_URL, localePath } from "../../src/lib/i18n";
import "../globals.css";

const copy = {
  tr: {
    title: "whyasaf | Yazılım Geliştirici ve Tasarımcı",
    description: "Ömer Asaf Ak'ın kişisel portfolyo ve blog sitesi. Yazılım mimarisi, AI ürün geliştirme ve arayüz tasarımı üzerine çalışmalar.",
    locale: "tr_TR",
    alternateLocale: "en_US",
  },
  en: {
    title: "whyasaf | Software Developer and Designer",
    description: "Personal portfolio and blog of Ömer Asaf Ak. Work on software architecture, AI product development and interface design.",
    locale: "en_US",
    alternateLocale: "tr_TR",
  },
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Pick<LayoutProps, "params">) {
  const { lang } = await params;
  const language = lang as Language;
  const t = copy[language];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.title,
      template: "%s | whyasaf",
    },
    description: t.description,
    alternates: pageAlternates(language, "/"),
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${SITE_URL}${localePath(language, "/")}`,
      siteName: "whyasaf",
      locale: t.locale,
      alternateLocale: t.alternateLocale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      creator: "@whyasaf",
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/assets/wa-favicon.png", media: "(prefers-color-scheme: light)" },
        { url: "/assets/wa-favicon-light.png", media: "(prefers-color-scheme: dark)" },
      ],
      shortcut: "/assets/wa-favicon-light.png",
      apple: "/assets/wa-favicon-light.png",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <html lang={language} className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/wa-favicon.png" media="(prefers-color-scheme: light)" type="image/png" />
        <link rel="icon" href="/assets/wa-favicon-light.png" media="(prefers-color-scheme: dark)" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/wa-favicon-light.png" />
        {/* Anti-flash theme script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${fontVariables} font-sans min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-[#f4f4f5] flex flex-col transition-colors duration-300 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-zinc-100`}>
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
              "image": "https://whyasaf.com/assets/cv_1.jpg",
              "description": "Ömer Asaf Ak (whyasaf) is a software engineering student and product developer building web apps such as Lecmic and CodeVocab.",
              "jobTitle": "Product Developer & Systems Architect",
              "sameAs": [
                "https://github.com/whyasaf",
                "https://lecmic.whyasaf.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "whyasaf",
              "url": "https://whyasaf.com",
              "inLanguage": ["tr", "en"],
              "author": { "@type": "Person", "name": "Ömer Asaf Ak", "url": "https://whyasaf.com" }
            })
          }}
        />
        <LanguageProvider language={language}>
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
