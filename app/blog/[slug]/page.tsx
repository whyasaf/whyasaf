import React from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../src/data/posts";
import BlogPostContent from "../../../src/components/BlogPostContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  const pageTitle = post.tr.title;
  const pageDescription = post.tr.seoDescription;
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

  if (!post) notFound();

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
