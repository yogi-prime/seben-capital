// components/BlogSection.tsx
'use client'; // Add this

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight, TrendingUp } from "lucide-react";
import { API } from "@/lib/api";

// Types
type ApiPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  read_time?: string | null;
  word_count?: number | null;
  is_featured?: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  published_at?: string | null;
  author_name?: string | null;
  primaryCategory?: { name: string; slug: string } | null;
  categories?: { name: string; slug: string }[];
};

interface BlogSectionProps {
  posts: ApiPost[];
}

// Utils
function formatDate(d?: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// NOW IT'S A CLIENT COMPONENT WITH PROPS
const BlogSection = ({ posts }: BlogSectionProps) => {
  // If no posts, show fallback
  if (!posts || posts.length === 0) {
    return (
      <section className="py-24" aria-labelledby="blog-heading">
        <div className="container">
          <div className="text-center mb-16">
            <h2 id="blog-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Trading <span className="text-gradient-copper">Insights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay ahead with our latest market insights, trading strategies, and educational content.
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-6">No articles available at the moment.</p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8"
            >
              <Link href="/blog">Visit Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24"
      aria-labelledby="blog-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* ... rest of your BlogSection JSX remains exactly the same ... */}
      <meta itemProp="name" content="Trading Insights" />
      <div className="container">
        <div className="text-center mb-16">
          <h2 id="blog-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Trading <span className="text-gradient-copper">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay ahead with our latest market insights, trading strategies, and educational content
            written by industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, idx) => {
            const imageUrl = post.featured_image ? API.img(post.featured_image) : null;
            const hasImage = !!imageUrl;
            const category = post.primaryCategory?.name || post.categories?.[0]?.name || "General";
            const author = post.author_name || "Seben Team";
            const readTime = post.read_time || "5 min read";
            const date = formatDate(post.published_at);

            return (
              <Card
                key={post.id}
                className="group card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                itemScope
                itemType="https://schema.org/Article"
                itemProp="itemListElement"
              >
                <meta itemProp="position" content={String(idx + 1)} />

                {hasImage && (
                  <div className="relative aspect-video rounded-t-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={post.featured_image_alt || post.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                )}

                {!hasImage && (
                  <div className="relative aspect-video rounded-t-lg overflow-hidden bg-gradient-copper/20 flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-copper-primary/50" />
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className="border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                      aria-label={`Category: ${category}`}
                    >
                      {category}
                    </Badge>
                    <time
                      className="text-sm text-muted-foreground"
                      itemProp="datePublished"
                      dateTime={post.published_at || undefined}
                    >
                      {date}
                    </time>
                  </div>

                  <CardTitle
                    className="text-xl font-heading group-hover:text-copper-primary transition-colors line-clamp-2"
                    itemProp="headline"
                  >
                    {post.title}
                  </CardTitle>

                  <CardDescription 
                    className="text-sm leading-relaxed line-clamp-3" 
                    itemProp="description"
                  >
                    {post.excerpt || "Read more to discover insights..."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="flex items-center space-x-1" 
                        itemProp="author" 
                        itemScope 
                        itemType="https://schema.org/Person"
                      >
                        <User className="w-4 h-4" />
                        <span itemProp="name">{author}</span>
                      </div>
                      <div 
                        className="flex items-center space-x-1" 
                        aria-label={`Read time ${readTime}`}
                      >
                        <Clock className="w-4 h-4" />
                        <span>{readTime}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between text-copper-primary hover:text-primary-foreground hover:bg-copper-primary p-0 h-auto py-2 px-2"
                    asChild
                  >
                    <Link 
                      href={`/blog/${post.slug}`} 
                      aria-label={`Read: ${post.title}`} 
                      itemProp="url"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8"
          >
            <Link href="/blog" aria-label="View more articles">
              View More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;