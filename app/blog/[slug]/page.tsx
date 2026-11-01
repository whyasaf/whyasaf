import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { blogPosts } from "../../../src/data/posts";
import BlogPostContent from "../../../src/components/BlogPostContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı mevcut değil veya taşınmış olabilir.",
    };
  }

  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "tr";
  const content = lang === "en" ? post.en : post.tr;
  const pageTitle = content.title;
  const pageDescription = content.seoDescription;
  const canonicalUrl = `https://whyasaf.com/blog/${slug}`;
  const imageUrl = `https://whyasaf.com/${post.image.replace(/^\//, "")}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pageTitle} | whyasaf`,
      description: pageDescription,
      url: canonicalUrl,
      siteName: 'whyasaf',
      type: 'article',
      publishedTime: post.dateISO,
      authors: ['https://whyasaf.com'],
      images: [{ url: imageUrl, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | whyasaf`,
      description: pageDescription,
      creator: '@whyasaf',
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📭</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Yazı Bulunamadı
        </h1>
        <p className="text-zinc-550 dark:text-zinc-400 text-sm">
          Aradığınız blog yazısı mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-650 dark:text-zinc-350 hover:text-zinc-900 dark:hover:text-zinc-100 underline"
        >
          <ArrowLeft size={16} /> Bloga Geri Dön
        </Link>
      </div>
    );
  }

  const postUrl = `https://whyasaf.com/blog/${post.id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.tr.title,
      description: post.tr.seoDescription,
      image: `https://whyasaf.com/${post.image.replace(/^\//, "")}`,
      datePublished: post.dateISO,
      dateModified: post.dateISO,
      mainEntityOfPage: postUrl,
      author: { "@type": "Person", name: post.author, url: "https://whyasaf.com" },
      publisher: { "@type": "Person", name: "Ömer Asaf Ak", url: "https://whyasaf.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://whyasaf.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://whyasaf.com/blog" },
        { "@type": "ListItem", position: 3, name: post.tr.title, item: postUrl },
      ],
    },
  ];

  return (
    <div className="py-6 animate-in fade-in duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent post={post} blogPosts={blogPosts} />
    </div>
  );
}
