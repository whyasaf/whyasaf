import React from "react";
import HeroSection from "../../src/components/HeroSection";
import BlogList from "../../src/components/BlogList";
import Footer from "../../src/components/Footer";

export const metadata = {
  title: "Blog",
  description: "Ömer Asaf Ak'ın kaleminden teknoloji, tasarım, sistem mimarileri ve yatırım üzerine kişisel notlar, derinlemesine analizler.",
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <HeroSection activeTab="blog" />
      
      <div className="max-w-5xl mx-auto py-6 animate-in fade-in duration-500">
        <BlogList />
      </div>

      <Footer type="blog" />
    </div>
  );
}
