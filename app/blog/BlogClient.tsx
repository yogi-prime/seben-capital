"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, User, ArrowRight, Search, Filter, TrendingUp } from "lucide-react";

type Post = {
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  date: string;
  slug: string;
  image?: string;
  featured?: boolean;
};

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesSearch =
        !s ||
        post.title.toLowerCase().includes(s) ||
        post.excerpt.toLowerCase().includes(s);
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const popularPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground" aria-labelledby="blog-hero-heading">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjIyIDEyJSAxOCUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 bg-copper-primary/20 animate-pulse"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + Math.random() * 40}%`,
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <Badge
            aria-label="Trading Education Hub"
            variant="outline"
            className="mb-6 border-copper-primary/30 text-copper-primary bg-copper-primary/5 px-4 py-2"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trading Education Hub
          </Badge>

          <h1 id="blog-hero-heading" className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Insights & <span className="text-gradient-copper">Strategies</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Stay updated with trading psychology, strategies, market trends, and Seben Capital research to enhance your trading journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-gradient-copper hover:scale-105 transition-transform">
              Subscribe for Updates
            </Button>
            <div className="text-sm text-muted-foreground">Join 1000+ traders getting weekly insights</div>
          </div>
        </div>
      </section>

      <section className="pb-24" aria-labelledby="blog-listing-heading">
        <div className="container">
          <h2 id="blog-listing-heading" className="sr-only">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8" role="search">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
                  <Input
                    placeholder="Search articles..."
                    aria-label="Search articles"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-copper-primary/20 focus:border-copper-primary"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0" aria-label="Filter by category">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-gradient-copper hover:bg-gradient-copper/90 whitespace-nowrap"
                          : "border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground whitespace-nowrap"
                      }
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Featured Post */}
              {filteredPosts.find((p) => p.featured) && (
                <div className="mb-12">
                  <h3 className="text-2xl font-heading font-bold mb-6 text-copper-primary">Featured Article</h3>
                  {(() => {
                    const featured = filteredPosts.find((p) => p.featured)!;
                    return (
                      <Card className="card-elevated hover-copper transition-all duration-300 overflow-hidden group cursor-pointer">
                        <div className="md:flex">
                          <div className="md:w-1/2">
                            <div className="aspect-video bg-gradient-copper/20 flex items-center justify-center" aria-label="Featured cover">
                              <TrendingUp className="w-12 h-12 text-copper-primary/50" />
                            </div>
                          </div>
                          <div className="md:w-1/2 p-6">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                                {featured.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{featured.date}</span>
                            </div>

                            <CardTitle className="text-2xl font-heading group-hover:text-copper-primary transition-colors mb-3">
                              {featured.title}
                            </CardTitle>

                            <CardDescription className="text-base leading-relaxed mb-4">{featured.excerpt}</CardDescription>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{featured.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{featured.readTime}</span>
                                </div>
                              </div>

                              <Link href={`/blog/${featured.slug}`} aria-label={`Read article: ${featured.title}`}>
                                <Button variant="ghost" className="text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                                  Read Article
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })()}
                </div>
              )}

              {/* All Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts
                  .filter((p) => !p.featured)
                  .map((post) => (
                    <Card
                      key={post.slug}
                      className="group card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="aspect-video bg-gradient-copper/20 flex items-center justify-center rounded-t-lg" aria-label="Article cover">
                        <TrendingUp className="w-8 h-8 text-copper-primary/50" />
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{post.date}</span>
                        </div>

                        <CardTitle className="text-xl font-heading group-hover:text-copper-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>

                        <CardDescription className="text-sm leading-relaxed line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <Link href={`/blog/${post.slug}`} aria-label={`Read article: ${post.title}`}>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-copper-primary hover:text-primary-foreground hover:bg-copper-primary p-0 h-auto py-2"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Load More (stub) */}
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8"
                  aria-label="Load more articles"
                >
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Sidebar">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-copper-primary">Stay Updated</CardTitle>
                    <CardDescription>Get weekly trading insights delivered to your inbox</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      placeholder="Enter your email"
                      aria-label="Email address"
                      type="email"
                      className="bg-background border-copper-primary/20 focus:border-copper-primary"
                    />
                    <Button className="w-full bg-gradient-copper">Subscribe</Button>
                  </CardContent>
                </Card>

                {/* Popular Posts */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-copper-primary">Popular Posts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {popularPosts.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="block group" aria-label={`Open: ${post.title}`}>
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 bg-gradient-copper/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-6 h-6 text-copper-primary/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium group-hover:text-copper-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {post.readTime} • {post.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-copper-primary">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories
                        .filter((c) => c !== "All")
                        .map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md hover:bg-copper-primary/10 transition-colors"
                            aria-pressed={selectedCategory === category}
                            aria-label={`Filter by ${category}`}
                          >
                            <span className="text-sm">{category}</span>
                            <Badge variant="outline" className="text-xs border-copper-primary/20">
                              {posts.filter((p) => p.category === category).length}
                            </Badge>
                          </button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
