"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, User, ArrowRight, Share, TrendingUp, Eye as EyeIcon } from "lucide-react";
import { API } from "@/lib/api";

type PostVM = {
  title: string;
  excerpt: string;
  author: string;
  authorBio: string;
  readTime: string;
  category: string;
  date: string;
  slug: string;
  image: string | null;
  imageAlt: string;
  contentHtml: string;
  tags: string[];
  views: number | null;
};

type RelatedVM = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  image: string | null;
};

function seededRandomInt(seed: string, min: number, max: number) {
  // simple deterministic hash → 0..1
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const r = (h % 1000) / 1000;
  return Math.floor(min + r * (max - min + 1));
}

export default function BlogPostClient({ post, related }: { post: PostVM; related: RelatedVM[] }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const views = useMemo(
    () => (typeof post.views === "number" ? post.views : seededRandomInt(post.slug, 120, 1200)),
    [post.slug, post.views]
  );

  // scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".article-content") as HTMLElement | null;
      if (!article) return;
      const scrollTop = window.scrollY;
      const docHeight = article.scrollHeight;
      const winHeight = window.innerHeight;
      const progress = Math.round((scrollTop / Math.max(1, docHeight - winHeight)) * 100);
      setReadingProgress(Math.max(0, Math.min(100, progress)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // html transformers (blockquote/tip/warning classes)
  const transformedHtml =
    (post.contentHtml || "")
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-copper-primary pl-4 italic bg-copper-primary/5 py-3 my-6 text-muted-foreground">')
      .replace(/<div class="tip-box">/g, '<div class="bg-success/10 border border-success/20 rounded-lg p-4 my-6">')
      .replace(/<div class="warning-box">/g, '<div class="bg-destructive/10 border border-destructive/20 rounded-lg p-4 my-6">');

  const shareUrl = typeof window !== "undefined" ? window.location.href : API.siteUrl(`/blog/${post.slug}`);


  // above the return (optional helper)
  const heroImage = post.image || "/images/blog/default-hero.jpg";
  const heroAlt = post.imageAlt || post.title || "Blog cover";
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-background/20 z-50">
        <div className="h-full bg-gradient-copper transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      <main>
        {/* Hero with darkened background, vignette + soft noise */}
        <section className="relative isolate overflow-hidden py-24">
          {/* BG image */}
            <div className="absolute inset-0 -z-10">
    <img
      src={heroImage}
      alt={heroAlt}
      className="h-full w-full object-cover object-center"
      style={{ filter: "brightness(0.55) saturate(0.95)" }} // ← uniform darkness
    />
    {/* optional tiny extra tint (very low) */}
    <div className="absolute inset-0 bg-black/40" />
  </div>

          {/* CONTENT */}
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge
                variant="outline"
                className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/10"
              >
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                {post.readTime ? (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readTime}</span>
                  </div>
                ) : null}
                <span>{post.date}</span>
              </div>

              {/* Views */}
              <div className="flex items-center justify-center gap-2 text-sm text-white/75 mb-8">
                <EyeIcon className="w-4 h-4" />
                <span>{views.toLocaleString()} views</span>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-copper-primary/40 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                  onClick={async () => {
                    if (navigator.share) {
                      await navigator.share({ title: post.title, text: post.excerpt, url: shareUrl });
                    } else {
                      await navigator.clipboard.writeText(shareUrl);
                      alert("Link copied!");
                    }
                  }}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </section>


        <section className="pb-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Article */}
              <div className="lg:col-span-3">
                <div className="max-w-3xl">
                  {/* Article Content */}
                  <div className="article-content prose prose-lg max-w-none [&_h2]:text-copper-primary [&_h3]:text-copper-primary [&_h2]:font-heading [&_h3]:font-heading [&_h2]:text-2xl [&_h3]:text-xl [&_h2]:mt-8 [&_h3]:mt-6 [&_h2]:mb-4 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_li]:mb-2">
                    <div dangerouslySetInnerHTML={{ __html: transformedHtml }} />
                  </div>

                  {/* Tags */}
                  {post.tags?.length ? (
                    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                      <span className="text-sm font-medium text-muted-foreground mr-2">Highlights:</span>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-copper-primary/30 text-copper-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  {/* Share Row */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                    <div className="text-sm text-muted-foreground">Share this article</div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        onClick={() =>
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
                            "_blank"
                          )
                        }
                      >
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              shareUrl
                            )}&text=${encodeURIComponent(post.title)}`,
                            "_blank"
                          )
                        }
                      >
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                              shareUrl
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 mt-10 space-y-8">
                  {/* Author */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-copper rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-heading text-copper-primary">
                            {post.author}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">Author</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{post.authorBio}</p>
                    </CardContent>
                  </Card>

                  {/* Related with images */}
                  {related?.length ? (
                    <Card className="card-elevated">
                      <CardHeader>
                        <CardTitle className="text-lg font-heading text-copper-primary">Related Posts</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {related.map((rp) => (
                          <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block group rounded-lg overflow-hidden border hover:shadow-md transition">
                            <div className="aspect-[16/9] bg-muted overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={rp.image || "/placeholder/blog-cover.png"}
                                alt={rp.title}
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder/blog-cover.png"; }}
                              />
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs border-copper-primary/20">
                                  {rp.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{rp.readTime || rp.date}</span>
                              </div>
                              <h3 className="text-sm font-medium group-hover:text-copper-primary transition-colors line-clamp-2">
                                {rp.title}
                              </h3>
                            </div>
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Risk Disclaimer */}
        <section className="py-8 bg-muted/20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Risk Disclaimer:</strong> Trading involves substantial risk of loss. Past performance or targets are not indicative of future results.
                The content on this blog is for educational purposes only and should not be considered as financial advice.
                Please trade responsibly and consider your risk tolerance.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
