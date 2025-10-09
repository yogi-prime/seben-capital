"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, User, ArrowRight, Share, TrendingUp, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
// import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    title: "Risk Management: The Foundation of Profitable Trading",
    excerpt: "Learn why successful traders prioritize capital preservation over profit maximization and how proper risk management can transform your trading results.",
    author: "Seben Team",
    authorBio: "Expert trading team with 10+ years of market experience, focused on education and risk management strategies.",
    readTime: "8 min read",
    category: "Risk Management",
    date: "December 15, 2024",
    slug: "risk-management-foundation",
    content: `
      <p>Risk management isn't just a component of successful trading—it's the foundation upon which all profitable trading strategies are built. While many new traders focus obsessively on finding the perfect entry point or the next big winner, experienced professionals know that how you manage risk determines your long-term success far more than any single trade.</p>

      <h2>Why Most Traders Fail: The Psychology of Risk</h2>
      
      <p>The statistics are sobering: approximately 80% of day traders lose money, and even fewer maintain consistent profitability over multiple years. The primary reason isn't a lack of market knowledge or poor timing—it's inadequate risk management coupled with psychological biases that lead to poor decision-making.</p>

      <blockquote>
        "Risk comes from not knowing what you're doing." - Warren Buffett
      </blockquote>

      <p>Most traders enter the market with dreams of quick wealth, focusing on potential profits while ignoring potential losses. This creates a dangerous mindset where risk management becomes an afterthought rather than the cornerstone of their strategy.</p>

      <h2>The Core Principles of Effective Risk Management</h2>

      <h3>1. Position Sizing: Your First Line of Defense</h3>
      
      <p>Position sizing determines how much capital you risk on each trade. The most successful traders risk only 1-2% of their total capital on any single position. This might seem conservative, but it's what allows them to survive losing streaks and compound their returns over time.</p>

      <div class="tip-box">
        <strong>Quick Tip:</strong> If you have $10,000 in trading capital, risking 2% means your maximum loss on any trade should be $200. This requires careful calculation of position size based on your stop-loss distance.
      </div>

      <h3>2. Stop-Loss Orders: Defining Your Maximum Risk</h3>
      
      <p>A stop-loss order automatically closes your position when it reaches a predetermined price level. This removes emotion from the equation and ensures you stick to your risk parameters even when the market moves against you.</p>

      <p>The key is setting stops based on technical analysis or volatility measures, not arbitrary percentages. Your stop should be placed where your analysis suggests the trade idea is wrong, not just where you feel comfortable losing money.</p>

      <h3>3. Risk-Reward Ratios: Making Mathematics Work for You</h3>
      
      <p>Professional traders focus on trades where the potential reward significantly exceeds the potential risk. A minimum risk-reward ratio of 1:2 means that for every dollar you risk, you aim to make at least two dollars.</p>

      <p>This mathematical advantage means you can be wrong more often than you're right and still be profitable. If you win 40% of your trades with a 1:3 risk-reward ratio, you'll still generate substantial profits.</p>

      <h2>Advanced Risk Management Strategies</h2>

      <h3>Portfolio-Level Risk Management</h3>
      
      <p>Beyond individual trade risk, consider your overall portfolio exposure. Avoid concentrating too much risk in correlated assets or sectors. Diversification across different markets, timeframes, and strategies can help smooth your equity curve.</p>

      <h3>Dynamic Position Sizing</h3>
      
      <p>Consider adjusting your position sizes based on market conditions and your recent performance. During volatile periods or after a string of losses, reducing position size can help preserve capital and maintain emotional equilibrium.</p>

      <div class="warning-box">
        <strong>Important:</strong> Never increase position sizes to "make back" losses quickly. This is one of the fastest ways to blow up a trading account.
      </div>

      <h2>Implementing Risk Management in Practice</h2>

      <h3>Create a Risk Management Checklist</h3>
      
      <p>Before entering any trade, run through a standardized checklist:</p>
      
      <ul>
        <li>What percentage of my capital am I risking?</li>
        <li>Where will I place my stop-loss?</li>
        <li>What is my target profit level?</li>
        <li>What is the risk-reward ratio?</li>
        <li>How does this trade fit with my overall portfolio risk?</li>
      </ul>

      <h3>Keep Detailed Records</h3>
      
      <p>Track not just your wins and losses, but your risk metrics for each trade. This data will help you identify patterns and continuously improve your risk management approach.</p>

      <h2>The Psychological Aspect</h2>
      
      <p>Risk management isn't just about numbers—it's about managing your emotions and biases. Fear and greed can quickly derail even the best risk management plan. Successful traders develop the discipline to stick to their rules even when their emotions are telling them otherwise.</p>

      <p>Remember that taking a loss according to your plan isn't a failure—it's successful risk management in action. Every stopped-out trade that keeps your loss small is preserving capital for future opportunities.</p>

      <h2>Conclusion: Building Long-Term Success</h2>
      
      <p>Effective risk management is what separates professional traders from gamblers. It's not exciting, and it won't make you rich overnight, but it will keep you in the game long enough to develop your skills and find consistent profitability.</p>

      <p>Start implementing these principles today, and remember: in trading, survival comes first, profits come second. Master risk management, and the profits will follow.</p>
    `,
    tags: ["Risk Management", "Trading Psychology", "Position Sizing", "Stop Loss"]
  };

  const relatedPosts = [
    {
      title: "Psychology of Trading: Mastering Your Emotions",
      excerpt: "Understand the psychological challenges every trader faces and discover practical strategies to maintain discipline.",
      slug: "trading-psychology",
      category: "Psychology",
      readTime: "12 min read"
    },
    {
      title: "Building a Winning Trading Plan",
      excerpt: "Every successful trader has a plan. Learn how to create a comprehensive trading plan that aligns with your goals.",
      slug: "building-trading-plan", 
      category: "Strategy",
      readTime: "11 min read"
    },
    {
      title: "Technical Analysis vs Fundamental Analysis",
      excerpt: "Compare the strengths and limitations of technical and fundamental analysis approaches.",
      slug: "technical-vs-fundamental",
      category: "Analysis", 
      readTime: "10 min read"
    }
  ];

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('.article-content');
      if (!article) return;
      
      const scrollTop = window.scrollY;
      const docHeight = article.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      
      setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-background/20 z-50">
        <div 
          className="h-full bg-gradient-copper transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle">
            <div className="absolute inset-0 bg-copper-primary/5"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                {blogPost.category}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{blogPost.readTime}</span>
                </div>
                <span>{blogPost.date}</span>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
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
              {/* Main Article Content */}
              <div className="lg:col-span-3">
                <div className="max-w-3xl">
                  {/* Featured Image Placeholder */}
                  <div className="aspect-video bg-gradient-copper/20 rounded-lg flex items-center justify-center mb-8">
                    <TrendingUp className="w-16 h-16 text-copper-primary/50" />
                  </div>

                  {/* Article Content */}
                  <div className="article-content prose prose-lg max-w-none [&_h2]:text-copper-primary [&_h3]:text-copper-primary [&_h2]:font-heading [&_h3]:font-heading [&_h2]:text-2xl [&_h3]:text-xl [&_h2]:mt-8 [&_h3]:mt-6 [&_h2]:mb-4 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_li]:mb-2">
                    <div dangerouslySetInnerHTML={{ 
                      __html: blogPost.content
                        .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-copper-primary pl-4 italic bg-copper-primary/5 py-3 my-6 text-muted-foreground">')
                        .replace(/<div class="tip-box">/g, '<div class="bg-success/10 border border-success/20 rounded-lg p-4 my-6">')
                        .replace(/<div class="warning-box">/g, '<div class="bg-destructive/10 border border-destructive/20 rounded-lg p-4 my-6">')
                    }} />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                    <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                    {blogPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-copper-primary/30 text-copper-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA Section */}
                  <Card className="mt-12 card-elevated bg-gradient-subtle border-copper-primary/20">
                    <CardContent className="p-8 text-center">
                      <BookOpen className="w-12 h-12 text-copper-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-heading font-bold mb-4">
                        Ready to Apply These Concepts?
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Join our comprehensive Utkarsh trading course where you'll learn to implement these risk management strategies in real market conditions.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-gradient-copper hover:scale-105 transition-transform">
                          Explore Utkarsh Course
                        </Button>
                        <Button variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                          Book Free Consultation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Share Section */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Enjoyed this article? Share it with fellow traders
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author Bio */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-copper rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-heading text-copper-primary">
                            {blogPost.author}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">Author</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {blogPost.authorBio}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Recent Posts */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="text-lg font-heading text-copper-primary">Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedPosts.map((post) => (
                        <Link 
                          key={post.slug} 
                          to={`/blog/${post.slug}`}
                          className="block group"
                        >
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium group-hover:text-copper-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs border-copper-primary/20">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {post.readTime}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Newsletter CTA */}
                  <Card className="card-elevated bg-gradient-subtle border-copper-primary/20">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-copper-primary mx-auto mb-3" />
                      <h3 className="font-heading font-bold mb-2 text-copper-primary">Stay Updated</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get weekly trading insights delivered to your inbox
                      </p>
                      <Button className="w-full bg-gradient-copper">
                        Subscribe Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-background-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Related <span className="text-gradient-copper">Articles</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continue your trading education with these related insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Card key={post.slug} className="group card-elevated hover-copper transition-all duration-300 hover:scale-[1.02]">
                  <div className="aspect-video bg-gradient-copper/20 flex items-center justify-center rounded-t-lg">
                    <TrendingUp className="w-8 h-8 text-copper-primary/50" />
                  </div>
                  
                  <CardHeader className="pb-4">
                    <Badge variant="outline" className="w-fit border-copper-primary/30 text-copper-primary bg-copper-primary/5 mb-2">
                      {post.category}
                    </Badge>
                    
                    <CardTitle className="text-lg font-heading group-hover:text-copper-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{post.readTime}</span>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between text-copper-primary hover:text-primary-foreground hover:bg-copper-primary"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
                  <Button className="bg-gradient-copper hover:scale-105 transition-transform">
                    Explore Courses
                  </Button>
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

      <Footer />
      <Chatbot />
    </div>
  );
};

export default BlogPost;