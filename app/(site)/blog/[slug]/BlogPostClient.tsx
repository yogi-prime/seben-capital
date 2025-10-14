"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, ArrowRight, Share, TrendingUp, BookOpen } from "lucide-react";

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
};

type RelatedVM = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
};

export default function BlogPostClient({ post, related }: { post: PostVM; related: RelatedVM[] }) {
  const [readingProgress, setReadingProgress] = useState(0);

  // scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".article-content") as HTMLElement | null;
      if (!article) return;
      const scrollTop = window.scrollY;
      const docHeight = article.scrollHeight;
      const winHeight = window.innerHeight;
      const progress = Math.round((scrollTop / (docHeight - winHeight)) * 100);
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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background text-foreground">


      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-background/20 z-50">
        <div className="h-full bg-gradient-copper transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      <main>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle">
            <div className="absolute inset-0 bg-copper-primary/5" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">{post.title}</h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-8">
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

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
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
                  {/* Featured Image */}
                  <div className="aspect-video bg-gradient-copper/20 rounded-lg flex items-center justify-center mb-8 overflow-hidden">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt={post.imageAlt || post.title} className="w-full h-full object-cover" />
                    ) : (
                      <TrendingUp className="w-16 h-16 text-copper-primary/50" />
                    )}
                  </div>

                  {/* Article Content */}
                  <div className="article-content prose prose-lg max-w-none [&_h2]:text-copper-primary [&_h3]:text-copper-primary [&_h2]:font-heading [&_h3]:font-heading [&_h2]:text-2xl [&_h3]:text-xl [&_h2]:mt-8 [&_h3]:mt-6 [&_h2]:mb-4 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_li]:mb-2">
                    <div dangerouslySetInnerHTML={{ __html: transformedHtml }} />
                  </div>

                  {/* Tags */}
                  {post.tags?.length ? (
                    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                      <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-copper-primary/30 text-copper-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  {/* CTA */}
                  <Card className="mt-12 card-elevated bg-gradient-subtle border-copper-primary/20">
                    <CardContent className="p-8 text-center">
                      <BookOpen className="w-12 h-12 text-copper-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-heading font-bold mb-4">Ready to Apply These Concepts?</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Join our comprehensive Utkarsh trading course where you'll learn to implement these strategies in real market conditions.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-gradient-copper hover:scale-105 transition-transform">Explore Utkarsh Course</Button>
                        <Button variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                          Book Free Consultation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Share Row */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                    <div className="text-sm text-muted-foreground">Enjoyed this article? Share it with fellow traders</div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank")}
                      >
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, "_blank")}
                      >
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")}
                      >
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-copper rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-heading text-copper-primary">{post.author}</CardTitle>
                          <div className="text-sm text-muted-foreground">Author</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{post.authorBio}</p>
                    </CardContent>
                  </Card>

                  {/* Recent/Related */}
                  {related?.length ? (
                    <Card className="card-elevated">
                      <CardHeader>
                        <CardTitle className="text-lg font-heading text-copper-primary">Recent Posts</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {related.map((rp) => (
                          <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block group">
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium group-hover:text-copper-primary transition-colors line-clamp-2">
                                {rp.title}
                              </h3>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs border-copper-primary/20">
                                  {rp.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{rp.readTime || rp.date}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  ) : null}

                  {/* Newsletter */}
                  <Card className="card-elevated bg-gradient-subtle border-copper-primary/20">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-copper-primary mx-auto mb-3" />
                      <h3 className="font-heading font-bold mb-2 text-copper-primary">Stay Updated</h3>
                      <p className="text-sm text-muted-foreground mb-4">Get weekly trading insights delivered to your inbox</p>
                      <Button className="w-full bg-gradient-copper">Subscribe Now</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related section */}
        {related?.length ? (
          <section className="py-16 bg-background-secondary">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Related <span className="text-gradient-copper">Articles</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Continue your trading education with these related insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((rp) => (
                  <div key={rp.slug} className="group card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] rounded-lg border">
                    <div className="aspect-video bg-gradient-copper/20 flex items-center justify-center rounded-t-lg">
                      <TrendingUp className="w-8 h-8 text-copper-primary/50" />
                    </div>

                    <CardHeader className="pb-4">
                      <Badge variant="outline" className="w-fit border-copper-primary/30 text-copper-primary bg-copper-primary/5 mb-2">
                        {rp.category}
                      </Badge>
                      <CardTitle className="text-lg font-heading group-hover:text-copper-primary transition-colors line-clamp-2">
                        {rp.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-2">
                        {rp.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{rp.readTime || rp.date}</span>
                      </div>

                      <Link href={`/blog/${rp.slug}`}>
                        <Button variant="ghost" className="w-full justify-between text-copper-primary hover:text-primary-foreground hover:bg-copper-primary">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Bottom CTA */}
        <section className="py-16">
          <div className="container">
            <Card className="card-elevated bg-gradient-subtle border-copper-primary/20">
              <CardContent className="py-12 px-8 text-center">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Ready to Trade <span className="text-gradient-copper">Smarter?</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Apply the concepts you've learned in our comprehensive courses and mentorship programs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-copper hover:scale-105 transition-transform">Explore Courses</Button>
                  <Button variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                    Book Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
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

      <Chatbot />
    </div>
  );
}
