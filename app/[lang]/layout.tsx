import React from "react";
import ThemeSwitcher from "../../src/components/ThemeSwitcher";
import { LanguageProvider } from "../../src/context/LanguageContext";
import LanguageSwitcher from "../../src/components/LanguageSwitcher";
import { fontVariables, themeScript } from "../../src/lib/document";
import { Language, languages, pageAlternates, SITE_URL, localePath } from "../../src/lib/i18n";
import "../globals.css";

const TITLE = "Ömer Asaf Ak | whyasaf";
const PERSON_ID = `${SITE_URL}/#person`;

const copy = {
  tr: {
    description: "Ömer Asaf Ak (whyasaf), web uygulamaları ve yapay zekâ ürünleri geliştiren yazılım geliştirici ve tasarımcıdır. Lecmic ve Marki Labs'in kurucusudur.",
    jobTitle: "Yazılım Geliştirici ve Tasarımcı",
    locale: "tr_TR",
    alternateLocale: "en_US",
  },
  en: {
    description: "Ömer Asaf Ak (whyasaf) is a software developer and designer building web apps and AI products. Founder of Lecmic and Marki Labs.",
    jobTitle: "Software Developer and Designer",
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
      default: TITLE,
      template: "%s | Ömer Asaf Ak",
    },
    description: t.description,
    alternates: pageAlternates(language, "/"),
    openGraph: {
      title: TITLE,
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
          alt: TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
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
  const t = copy[language];

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
              "@id": PERSON_ID,
              "name": "Ömer Asaf Ak",
              "givenName": "Ömer Asaf",
              "familyName": "Ak",
              "alternateName": ["whyasaf", "Ömer Asaf"],
              "url": `${SITE_URL}/`,
              "image": `${SITE_URL}/assets/omer-asaf-ak.jpg`,
              "description": t.description,
              "jobTitle": t.jobTitle,
              "worksFor": [
                { "@type": "Organization", "name": "Lecmic", "url": "https://lecmic.whyasaf.com", "founder": { "@id": PERSON_ID } },
                { "@type": "Organization", "name": "Marki Labs", "founder": { "@id": PERSON_ID } }
              ],
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
              "alternateName": ["Ömer Asaf Ak"],
              "url": `${SITE_URL}/`,
              "inLanguage": ["tr", "en"],
              "author": { "@id": PERSON_ID }
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
