"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Telescope,
  Shield,
  TrendingUp,
  Users,
  Award,
  Star,
  BookOpen,
  MessageCircle,
  BarChart3,
  Calculator,
} from "lucide-react";

const AboutUs = () => {
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setVisibleStats(true)),
      { threshold: 0.5 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({
    end,
    suffix = "",
    duration = 2000,
  }: {
    end: number;
    suffix?: string;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!visibleStats) return;
      let startTime: number | null = null;
      const animate = (t: number) => {
        if (startTime === null) startTime = t;
        const p = Math.min((t - startTime) / duration, 1);
        setCount(Math.floor(p * end));
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [visibleStats, end, duration]);
    return (
      <span aria-label={`${end}${suffix}`}>
        {count}
        {suffix}
      </span>
    );
  };

  const timelineEvents = [
    { year: "2022", title: "Foundation", description: "Founded with a belief in education-first investing." },
    { year: "2023", title: "Utkarsh Course Launch", description: "Launched comprehensive trading course → trained 500+ students." },
    { year: "2024", title: "Expansion", description: "Expanded into mentorship, tools, and capital management." },
    { year: "2025", title: "Future Ready", description: "Copy trading, algo bots, and global expansion plans." },
  ];

  const pillars = [
    { icon: Shield, title: "Discipline", description: "Risk-first strategies that prioritize capital preservation over quick gains." },
    { icon: Award, title: "Transparency", description: "Clear reporting & communication with complete openness in our methods." },
    { icon: TrendingUp, title: "Innovation", description: "Algo bots, advanced tools, and tech-driven solutions for modern trading." },
    { icon: Users, title: "Growth", description: "Combining skill development with steady, sustainable portfolio returns." },
  ];

  const achievements = [
    { number: 500, suffix: "+", label: "Students Trained" },
    { number: 95, suffix: "%", label: "Satisfaction Rate" },
    { number: 24, suffix: "/7", label: "Support Available" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      text: "Seben Capital transformed my trading approach. The discipline and risk management they teach is unmatched.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      text: "From complete beginner to confident trader. The mentorship program is worth every rupee.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      text: "Professional portfolio management with clear communication. Exactly what I was looking for.",
      rating: 5,
    },
  ];

  const offerings = [
    { icon: BookOpen, title: "Utkarsh Course", description: "Learn structured trading", link: "/courses/utkarsh" },
    {
      icon: MessageCircle,
      title: "Mentorship",
      description: "Personal guidance",
      link: "/courses/mentorship", // ensure route exists
    },
    {
      icon: BarChart3,
      title: "Portfolio Management",
      description: "Target steady returns",
      link: "/services/portfolio-management", // ensure route exists
    },
    { icon: Calculator, title: "Tools Hub", description: "Calculators & resources", link: "/tools" },
  ];

  return (
    <main className="min-h-screen bg-background" aria-labelledby="about-hero-heading">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-copper-primary/5 via-transparent to-copper-secondary/5" />
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-copper-primary/20 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-copper-secondary/20 rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h1
            id="about-hero-heading"
            className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent"
          >
            <span className="block">Building Smarter Traders.</span>
            <span className="block">Growing Stronger Portfolios.</span>
          </h1>
          <p className="text-base md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Seben Capital blends education, mentorship, and institutional-grade research to empower investors with skills, tools, and
            strategies for long-term growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/mentorship" aria-label="Talk to us about mentorship">
              <Button size="lg" className="bg-gradient-to-r from-copper-primary to-copper-secondary hover:shadow-lg hover:shadow-copper-primary/25">
                Talk to Us
              </Button>
            </Link>
            <Link href="/courses" aria-label="Explore courses">
              <Button size="lg" variant="outline" className="border-copper-primary text-copper-primary hover:bg-copper-primary hover:text-background">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-muted/5" aria-labelledby="mission-vision-heading">
        <div className="container mx-auto">
          <h2 id="mission-vision-heading" className="sr-only">
            Mission and Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-copper-primary/10 to-transparent border-copper-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-copper-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  To equip traders with discipline, education, and cutting-edge tools while offering risk-managed portfolio growth
                  opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-copper-secondary/10 to-transparent border-copper-secondary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper-secondary/10 flex items-center justify-center">
                  <Telescope className="w-8 h-8 text-copper-secondary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  To be India's most trusted name in trading education and risk-aware capital management.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story - Timeline */}
      <section className="py-20 px-4" aria-labelledby="our-story-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="our-story-heading" className="text-4xl font-bold mb-4 bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A journey of continuous learning, innovation, and empowerment in the trading world.</p>
          </div>

          {/* Mobile/Tablet */}
          <div className="relative md:hidden">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-copper-primary to-copper-secondary opacity-40" />
            <div className="space-y-8">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-12">
                  <span className="absolute left-4 top-3 -ml-1.5 w-3 h-3 rounded-full bg-copper-primary border-4 border-background shadow" />
                  <Card className="bg-muted/20 border-copper-primary/20">
                    <CardHeader>
                      <CardTitle className="text-copper-primary">{event.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{event.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="relative hidden md:block">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-copper-primary to-copper-secondary opacity-30" />
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <Card className="bg-muted/20 border-copper-primary/20 hover:border-copper-primary/40 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-copper-primary">{event.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{event.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-copper-primary rounded-full border-4 border-background shadow-lg" />
                <div className="w-full md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Pillars */}
      <section className="py-20 px-4 bg-muted/5" aria-labelledby="pillars-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="pillars-heading" className="text-4xl font-bold mb-4 bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent">
              Our Pillars
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The core values that guide everything we do at Seben Capital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => {
              const IconComponent = pillar.icon;
              return (
                <Card
                  key={i}
                  className="bg-gradient-to-b from-muted/20 to-transparent border-copper-primary/20 hover:border-copper-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-copper-primary/10"
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper-primary/10 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-copper-primary" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{pillar.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements & Trust */}
      <section id="stats-section" className="py-20 px-4" aria-labelledby="achievements-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="achievements-heading" className="text-4xl font-bold mb-4 bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent">
              Achievements &amp; Trust
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Numbers that speak to our commitment and success in empowering traders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {achievements.map((stat, i) => (
              <Card key={i} className="bg-gradient-to-br from-copper-primary/10 to-transparent border-copper-primary/20 text-center">
                <CardHeader>
                  <CardTitle className="text-5xl font-bold text-copper-primary">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </CardTitle>
                  <CardDescription className="text-lg font-medium">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-muted/20 border-copper-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2" aria-label={`${t.rating} star rating`}>
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-copper-primary text-copper-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{t.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="italic">"{t.text}"</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-20 px-4 bg-muted/5" aria-labelledby="leadership-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="leadership-heading" className="text-4xl font-bold mb-4 bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent">
              Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Led by a hands-on founder and mentor with a risk-first, process-driven approach.</p>
          </div>

          <Card className="max-w-4xl mx-auto card-elevated border-copper-primary/30 overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-copper-primary/30 to-copper-secondary/30 blur-md opacity-30" />
                    <div className="w-28 h-28 rounded-full ring-4 ring-copper-primary/30 bg-copper-primary/10 flex items-center justify-center relative">
                      <span className="text-2xl font-semibold text-copper-primary">SST</span>
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl font-heading text-copper-primary tracking-wide">Saurav Singh Tomar</h3>
                  <div className="text-sm text-muted-foreground">Founder &amp; Mentor</div>
                  <div className="text-xs text-muted-foreground mt-1">Senior Trading Strategist</div>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <span className="px-3 py-1 rounded-full text-xs border border-copper-primary/30 text-copper-primary bg-copper-primary/5">12+ Years</span>
                    <span className="px-3 py-1 rounded-full text-xs border border-copper-primary/30 text-copper-primary bg-copper-primary/5">Options &amp; Derivatives</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <blockquote className="text-lg md:text-xl leading-relaxed">“Manage risk first, returns will follow naturally. Consistency and discipline are the real edge.”</blockquote>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Saurav options trading, risk management aur systematic execution par focus karte hain. Dozenon traders ko live reviews, playbooks aur
                    accountability ke through consistent banaya hai.
                  </p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {[
                      "Risk-first frameworks & capital protection",
                      "Live market walkthroughs & trade reviews",
                      "Personalized strategy refinement",
                      "Performance tracking & accountability",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                        </svg>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/courses/mentorship" aria-label="Book intro call">
                      <Button size="lg" className="bg-gradient-to-r from-copper-primary to-copper-secondary hover:scale-105">Book Intro Call</Button>
                    </Link>
                    <Link href="/courses/mentorship#syllabus" aria-label="View mentor syllabus">
                      <Button size="lg" variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                        View Mentor Syllabus
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-xs text-muted-foreground">SEBI awareness • Risk-first approach • Process over prediction</div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-4" aria-labelledby="offerings-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="offerings-heading" className="text-4xl font-bold mb-4 bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent">
              What We Offer
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Comprehensive solutions for every stage of your trading journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offering, i) => {
              const IconComponent = offering.icon;
              return (
                <Link key={i} href={offering.link} aria-label={offering.title} className="block">
                  <Card className="bg-gradient-to-b from-muted/20 to-transparent border-copper-primary/20 hover:border-copper-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-copper-primary/10 cursor-pointer group">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper-primary/10 flex items-center justify-center group-hover:bg-copper-primary/20 transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-copper-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-copper-primary transition-colors duration-300">{offering.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">{offering.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-copper-primary to-copper-secondary relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-gradient-to-r from-copper-primary/90 to-copper-secondary/90" />
        <div className="container mx-auto text-center relative z-10">
          <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold mb-6 text-background">
            Ready to start your journey with Seben Capital?
          </h2>
          <p className="text-base md:text-xl text-background/90 max-w-2xl mx-auto mb-12">
            Join hundreds of successful traders who have transformed their approach to the markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/utkarsh" aria-label="Explore Utkarsh Course">
              <Button size="lg" variant="secondary" className="bg-background text-copper-primary hover:bg-background/90">
                Explore Utkarsh Course
              </Button>
            </Link>
            <Link href="/courses/mentorship" aria-label="Talk to us">
              <Button size="lg" variant="outline" className="border-background text-copper-primary hover:bg-background hover:text-copper-primary">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-8 px-4 bg-muted/10 border-t border-copper-primary/20" aria-labelledby="disclaimer-heading">
        <div className="container mx-auto text-center">
          <h2 id="disclaimer-heading" className="sr-only">
            Risk Disclaimer
          </h2>
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
            <strong>Risk Disclaimer:</strong> Trading and investing involve risk of loss. Past performance or targets are not indicative of future results. We are
            not SEBI-registered advisors. All educational content is for informational purposes only and should not be considered as financial advice. Please
            consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
