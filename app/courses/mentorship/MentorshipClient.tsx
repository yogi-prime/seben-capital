// app/courses/mentorship/MentorshipClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  UserCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function MentorshipClient() {
  const mentorshipFeatures = [
    {
      icon: UserCheck,
      title: "1:1 Private Sessions",
      description:
        "Personalized guidance tailored to your specific trading style and goals",
    },
    {
      icon: TrendingUp,
      title: "Portfolio Review & Feedback",
      description:
        "Detailed analysis of your trades and portfolio performance",
    },
    {
      icon: MessageCircle,
      title: "Strategy Development",
      description:
        "Build custom trading strategies that match your risk profile",
    },
    {
      icon: Clock,
      title: "Ongoing Support",
      description:
        "Chat and email support between sessions for continuous guidance",
    },
  ] as const;

  const plans = [
    { name: "Monthly", price: "₹4,999", duration: "1 Month", popular: false },
    { name: "Quarterly", price: "₹11,999", duration: "3 Months", popular: true },
    { name: "Yearly", price: "₹39,999", duration: "12 Months", popular: false },
  ] as const;

  const sharedFeatures = [
    "1-on-1 Mentorship Sessions",
    "Strategy Development",
    "Portfolio Review & Feedback",
    "Risk Management Guidance",
    "Chat + Email Support",
    "Community Access",
  ] as const;

  const mentors = [
    {
      name: "Saurav Singh Tomar",
      title: "Senior Trader",
      experience: "12+ Years",
      specialization: "Options & Derivatives",
      image: "/api/placeholder/100/100",
      bio: "Specialized in options trading and risk management with over a decade of market experience.",
    },
  ] as const;

  const faqs = [
    {
      question:
        "How is 1:1 mentorship different from group mentorship?",
      answer:
        "1:1 mentorship provides personalized attention focused solely on your trading challenges and goals. Group mentorship offers peer learning opportunities and diverse perspectives, but with shared attention from the mentor.",
    },
    {
      question: "Can I extend my mentorship sessions?",
      answer:
        "Yes, you can purchase additional sessions or upgrade to a higher plan at any time. We also offer flexible extension packages based on your needs.",
    },
    {
      question: "Will mentors trade for me or manage my account?",
      answer:
        "No, our mentorship is purely educational and advisory. Mentors provide guidance, strategy development, and feedback, but you maintain full control of your trading decisions and account.",
    },
    {
      question: "How are mentors assigned?",
      answer:
        "We match mentors based on your trading style, experience level, and specific goals. You can also request a specific mentor if available.",
    },
    {
      question: "What if I'm not satisfied with my mentor?",
      answer:
        "We offer mentor reassignment within the first two sessions if there's a compatibility issue. Your satisfaction is our priority.",
    },
  ] as const;

  return (
    <main>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden"
        aria-labelledby="mentorship-hero-heading"
      >
        <div className="absolute inset-0 bg-gradient-subtle">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjIyIDEyJSAxOCUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 border-copper-primary/30 text-copper-primary bg-copper-primary/5 px-4 py-2"
          >
            <Users className="w-4 h-4 mr-2" />
            Personalized Mentorship
          </Badge>

          <h1
            id="mentorship-hero-heading"
            className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight"
          >
            Personalized <span className="text-gradient-copper">Mentorship</span>{" "}
            for Serious Traders
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Get one-on-one or cohort-based mentorship tailored to your trading
            journey. Learn from experienced professionals who have successfully
            navigated volatile markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-copper hover:scale-105 transition-transform px-8"
            >
              Apply for Mentorship
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to Us
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-24 bg-background-secondary"
        aria-labelledby="features-heading"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2
              id="features-heading"
              className="text-4xl md:text-5xl font-heading font-bold mb-6"
            >
              Mentorship <span className="text-gradient-copper">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive guidance designed to accelerate your trading journey
              through personalized attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentorshipFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-heading text-copper-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="text-center mb-16">
            <h2
              id="pricing-heading"
              className="text-4xl md:text-5xl font-heading font-bold mb-6"
            >
              Plans & <span className="text-gradient-copper">Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose a plan that fits your commitment. All plans include the same
              benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`card-elevated transition-all duration-300 hover:scale-[1.02] relative ${
                  plan.popular ? "border-copper-primary/40 shadow-copper" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-copper text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-heading text-copper-primary mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-copper-primary mb-1">
                      {plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {plan.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-copper  hover:scale-105"
                        : "variant-outline border-copper-primary/30  hover:bg-copper-primary hover:text-primary-foreground"
                    } transition-all duration-300`}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Shared features */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="card-elevated border-copper-primary/30">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-heading text-copper-primary">
                  What’s Included in Every Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sharedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentor spotlight */}
      <section
        className="relative py-24 bg-background-secondary overflow-hidden"
        aria-labelledby="mentor-heading"
      >
        <div className="pointer-events-none absolute -inset-x-10 -top-24 h-72 bg-gradient-to-b from-copper-primary/10 to-transparent blur-3xl" />
        <div className="container relative">
          <div className="text-center mb-16">
            <h2
              id="mentor-heading"
              className="text-4xl md:text-5xl font-heading font-bold mb-6"
            >
              Meet Your <span className="text-gradient-copper">Mentor</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Learn from a senior practitioner with a proven record of
              disciplined, risk-first trading.
            </p>
          </div>

          <Card className="card-elevated border-copper-primary/30 overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-copper blur-md opacity-30" />
                    <Avatar className="w-28 h-28 relative ring-4 ring-copper-primary/30">
                      <AvatarImage
                        src={mentors[0].image}
                        alt={mentors[0].name}
                      />
                      <AvatarFallback className="bg-gradient-copper text-primary-foreground text-xl font-semibold">
                        {mentors[0].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <h3 className="mt-5 text-2xl font-heading text-copper-primary tracking-wide">
                    {mentors[0].name}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {mentors[0].title}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center mt-4">
                    <Badge
                      variant="outline"
                      className="border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                    >
                      {mentors[0].experience}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                    >
                      {mentors[0].specialization}
                    </Badge>
                  </div>

                  {/* Mobile CTAs */}
                  <div className="mt-6 flex w-full gap-3 lg:hidden">
                    <Button className="flex-1 bg-gradient-copper">
                      Book Intro Call
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                    >
                      View Syllabus
                    </Button>
                  </div>
                </div>

                {/* Right */}
                <div className="lg:col-span-2">
                  <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                    “I don’t chase returns — I chase consistency. Manage risk
                    first, and the returns follow.”
                  </blockquote>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-background/60 border border-border/50 p-4 text-center">
                      <div className="text-2xl font-bold text-copper-primary">
                        500+
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Traders Trained
                      </div>
                    </div>
                    <div className="rounded-xl bg-background/60 border border-border/50 p-4 text-center">
                      <div className="text-2xl font-bold text-copper-primary">
                        95%
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Course Satisfaction
                      </div>
                    </div>
                    <div className="rounded-xl bg-background/60 border border-border/50 p-4 text-center">
                      <div className="text-2xl font-bold text-copper-primary">
                        24/7
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Support Access
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-muted-foreground leading-relaxed">
                    {mentors[0].bio}
                  </p>

                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {[
                      "Risk-first frameworks & capital protection",
                      "Live market walkthroughs & trade reviews",
                      "Personalized strategy refinement",
                      "Performance tracking & accountability",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Desktop CTAs */}
                  <div className="mt-8 hidden lg:flex gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-copper hover:scale-105"
                    >
                      Book Intro Call
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                    >
                      View Syllabus
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            SEBI awareness • Risk-first approach • Process over prediction
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" aria-labelledby="cta-heading">
        <div className="container">
          <Card className="card-elevated bg-gradient-subtle border-copper-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-copper opacity-5" />
            <CardContent className="relative z-10 py-16 px-8 text-center">
              <h2
                id="cta-heading"
                className="text-4xl md:text-5xl font-heading font-bold mb-6"
              >
                Ready to Start Your{" "}
                <span className="text-gradient-copper">Mentorship Journey?</span>
              </h2>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Take the next step in your trading career with personalized
                guidance from industry experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-copper hover:scale-105 transition-transform px-8 py-3 text-lg font-semibold"
                >
                  Apply for Mentorship
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8 py-3 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-24 bg-background-secondary"
        aria-labelledby="faq-heading"
      >
        <div className="container">
          <div className="text-center mb-16">
            <h2
              id="faq-heading"
              className="text-4xl md:text-5xl font-heading font-bold mb-6"
            >
              Frequently Asked <span className="text-gradient-copper">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-copper-primary hover:text-copper-primary/80">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}
