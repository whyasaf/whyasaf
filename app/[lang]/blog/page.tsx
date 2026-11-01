import React from "react";
import HeroSection from "../../../src/components/HeroSection";
import BlogList from "../../../src/components/BlogList";
import Footer from "../../../src/components/Footer";
import { Language, SITE_URL, localePath, pageAlternates } from "../../../src/lib/i18n";

const copy = {
  tr: {
    description: "Ömer Asaf Ak'ın kaleminden teknoloji, tasarım, sistem mimarileri ve yatırım üzerine kişisel notlar, derinlemesine analizler.",
    ogDescription: "Teknoloji, tasarım, sistem mimarileri ve yatırım üzerine kişisel notlar.",
    locale: "tr_TR",
  },
  en: {
    description: "Personal notes and in-depth analysis by Ömer Asaf Ak on technology, design, systems architecture and investing.",
    ogDescription: "Personal notes on technology, design, systems architecture and investing.",
    locale: "en_US",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;
  const t = copy[language];

  return {
    title: "Blog",
    description: t.description,
    alternates: pageAlternates(language, "/blog"),
    openGraph: {
      title: "Blog | whyasaf",
      description: t.ogDescription,
      url: `${SITE_URL}${localePath(language, "/blog")}`,
      siteName: "whyasaf",
      locale: t.locale,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "whyasaf | Blog" }],
    },
  };
}

export default function BlogPage() {
  return (
    <div className="space-y-[34px]">
      <HeroSection activeTab="blog" />
      
      <div className="max-w-5xl mx-auto pt-[21px] pb-6 animate-in fade-in duration-500">
        <BlogList />
      </div>

      <Footer type="blog" />
    </div>
  );
}
