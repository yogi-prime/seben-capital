import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight } from "lucide-react";

const BlogSection = () => {
  const articles = [
    {
      title: "Risk Management: The Foundation of Profitable Trading",
      excerpt:
        "Learn why successful traders prioritize capital preservation over profit maximization and how proper risk management can transform your trading results.",
      author: "Seben Team",
      readTime: "8 min read",
      category: "Risk Management",
      date: "Dec 15, 2024",
      href: "/blog/risk-management-foundation",
    },
    {
      title: "Psychology of Trading: Mastering Your Emotions",
      excerpt:
        "Understand the psychological challenges every trader faces and discover practical strategies to maintain discipline in volatile markets.",
      author: "Seben Team",
      readTime: "12 min read",
      category: "Psychology",
      date: "Dec 12, 2024",
      href: "/blog/trading-psychology",
    },
    {
      title: "Technical Analysis vs Fundamental Analysis: Which Approach?",
      excerpt:
        "Compare the strengths and limitations of technical and fundamental analysis, and learn how to combine both approaches effectively.",
      author: "Seben Team",
      readTime: "10 min read",
      category: "Analysis",
      date: "Dec 8, 2024",
      href: "/blog/technical-vs-fundamental",
    },
  ];

  return (
    <section
      className="py-24"
      aria-labelledby="blog-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="name" content="Trading Insights" />
      <div className="container">
        <div className="text-center mb-16">
          <h2
            id="blog-heading"
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            Trading <span className="text-gradient-copper">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay ahead with our latest market insights, trading strategies, and educational content
            written by industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, idx) => (
            <Card
              key={article.title}
              className="group card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              itemScope
              itemType="https://schema.org/Article"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(idx + 1)} />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                    aria-label={`Category: ${article.category}`}
                  >
                    {article.category}
                  </Badge>
                  <time
                    className="text-sm text-muted-foreground"
                    itemProp="datePublished"
                    dateTime={new Date(article.date).toISOString()}
                  >
                    {article.date}
                  </time>
                </div>

                <CardTitle
                  className="text-xl font-heading group-hover:text-copper-primary transition-colors line-clamp-2"
                  itemProp="headline"
                >
                  {article.title}
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed line-clamp-3" itemProp="description">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <User className="w-4 h-4" />
                      <span itemProp="name">{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1" aria-label={`Read time ${article.readTime}`}>
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between text-copper-primary hover:text-primary-foreground hover:bg-copper-primary p-0 h-auto py-2"
                  asChild
                >
                  <Link href={article.href} aria-label={`Read: ${article.title}`} itemProp="url">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
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
