import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Users } from "lucide-react";

const ThreePillars = () => {
  const pillars = [
    {
      title: "Trading",
      icon: TrendingUp,
      description: "Master the art of disciplined trading with proven strategies, risk management, and real-time market analysis.",
      features: ["Technical Analysis", "Risk Management", "Position Sizing", "Market Psychology"],
      cta: "Explore Services",
      href: "/services",
    },
    {
      title: "Education",
      icon: BookOpen,
      description: "Comprehensive curriculum designed to transform beginners into confident traders through structured learning.",
      features: ["Live Sessions", "Recorded Modules", "Assignments", "Community Access"],
      cta: "View Courses",
      href: "/courses",
    },
    {
      title: "Mentorship",
      icon: Users,
      description: "Personalized guidance from experienced traders who have successfully navigated volatile markets.",
      features: ["1:1 Sessions", "Portfolio Review", "Strategy Development", "Ongoing Support"],
      cta: "Get Mentored",
      href: "/mentorship",
    },
  ];

  return (
    <section className="py-24 bg-background-secondary" aria-labelledby="pillars-heading">
      <div className="container">
        <div className="text-center mb-16">
          <h2 id="pillars-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Our <span className="text-gradient-copper">Three Pillars</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive approach to trading success built on education, practical application, and ongoing support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" itemScope itemType="https://schema.org/ItemList">
          {pillars.map((pillar, index) => (
            <Card key={pillar.title} className="group card-elevated hover-copper transition-all duration-300 hover:scale-105" itemProp="itemListElement">
              <meta itemProp="position" content={String(index + 1)} />
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center group-hover:animate-pulse-copper">
                  <pillar.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-heading text-copper-primary mb-2" itemProp="name">
                  {pillar.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed" itemProp="description">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-copper-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground transition-all duration-300"
                  asChild
                >
                  <Link href={pillar.href}>{pillar.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
