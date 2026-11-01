import React from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../../src/data/posts";
import BlogPostContent from "../../../../src/components/BlogPostContent";
import { Language, SITE_URL, localePath, pageAlternates } from "../../../../src/lib/i18n";

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  const language = lang as Language;
  const pageTitle = post[language].title;
  const pageDescription = post[language].seoDescription;
  const canonicalUrl = `${SITE_URL}${localePath(language, `/blog/${slug}`)}`;
  const imageUrl = `https://whyasaf.com/${post.image.replace(/^\//, "")}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: pageAlternates(language, `/blog/${slug}`),
    openGraph: {
      title: `${pageTitle} | whyasaf`,
      description: pageDescription,
      url: canonicalUrl,
      siteName: 'whyasaf',
      locale: language === "en" ? 'en_US' : 'tr_TR',
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
  const { lang, slug } = await params;
  const post = blogPosts[slug];

  if (!post) notFound();

  const language = lang as Language;
  const content = post[language];
  const postUrl = `${SITE_URL}${localePath(language, `/blog/${post.id}`)}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: content.title,
      description: content.seoDescription,
      inLanguage: language,
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
        { "@type": "ListItem", position: 1, name: language === "en" ? "Home" : "Ana Sayfa", item: `${SITE_URL}${localePath(language, "/")}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${localePath(language, "/blog")}` },
        { "@type": "ListItem", position: 3, name: content.title, item: postUrl },
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
