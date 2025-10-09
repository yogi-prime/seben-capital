import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Star, BookOpen, TrendingUp } from "lucide-react";

const CourseSpotlight = () => {
  const curriculum = [
    "Market Foundations & Microstructure",
    "Technical Analysis & Chart Patterns",
    "Risk Management & Position Sizing",
    "Strategy Development & Backtesting",
    "Trading Psychology & Discipline",
    "Live Market Application Labs",
  ];

  const highlights = [
    { icon: Clock, label: "6 Weeks", detail: "Duration" },
    { icon: Users, label: "Live + Recorded", detail: "Sessions" },
    { icon: TrendingUp, label: "₹15,999", detail: "One-time Investment" },
    { icon: Star, label: "500+", detail: "Students Successfully Trained" },
  ];

  return (
    <section
      className="py-24"
      aria-labelledby="utkarsh-heading"
      itemScope
      itemType="https://schema.org/Course"
    >
      <meta itemProp="name" content="Utkarsh - Complete Trading Mastery" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge variant="outline" className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/5">
              <Star className="w-4 h-4 mr-2" />
              Flagship Course
            </Badge>

            <h2 id="utkarsh-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Master Trading with <span className="text-gradient-copper">Utkarsh</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" itemProp="description">
              A complete path from basics to execution. Our flagship program transforms beginners into confident traders
              through structured learning, live practice, and ongoing mentorship.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-copper-primary">Course Curriculum</h3>
              {curriculum.map((module) => (
                <div key={module} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{module}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-copper hover:scale-105 transition-transform" asChild>
                <Link href="/courses/utkarsh">Enroll Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
              >
                Download Syllabus
              </Button>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative">
            <Card className="card-elevated shadow-copper">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-heading text-copper-primary" itemProp="provider" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">Utkarsh</span>
                </CardTitle>
                <CardDescription className="text-base">Complete Trading Mastery</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {highlights.map((highlight) => (
                    <div key={highlight.label} className="text-center p-4 bg-muted/20 rounded-lg">
                      <highlight.icon className="w-6 h-6 mx-auto mb-2 text-copper-primary" />
                      <div className="font-bold text-lg text-copper-primary">{highlight.label}</div>
                      <div className="text-sm text-muted-foreground">{highlight.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-copper-primary mb-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <span itemProp="priceCurrency" content="INR" />
                    <span itemProp="price">15999</span>
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </div>
                  <div className="text-sm text-muted-foreground">One-time Investment</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Complete Course Duration</span>
                    <span className="font-semibold">6 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Live Trading Sessions</span>
                    <span className="font-semibold">20+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Students Successfully Trained</span>
                    <span className="font-semibold">500+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Community Support Access</span>
                    <span className="font-semibold">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -top-4 -right-4 bg-gradient-copper text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-copper">
              Most Popular
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSpotlight;
