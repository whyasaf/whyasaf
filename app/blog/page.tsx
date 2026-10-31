import React from "react";
import HeroSection from "../../src/components/HeroSection";
import BlogList from "../../src/components/BlogList";
import Footer from "../../src/components/Footer";

export const metadata = {
  title: "Blog",
  description: "Ömer Asaf Ak'ın kaleminden teknoloji, tasarım, sistem mimarileri ve yatırım üzerine kişisel notlar, derinlemesine analizler.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | whyasaf",
    description: "Teknoloji, tasarım, sistem mimarileri ve yatırım üzerine kişisel notlar.",
    url: "https://whyasaf.com/blog",
    siteName: "whyasaf",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "whyasaf | Blog" }],
  },
};

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
