"use client";

import React, { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Target,
  Shield,
  Clock,
  Users,
  Star,
  Headphones,
  CheckCircle,
  TrendingUp,
  BarChart3,
  FileText,
  Calculator,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

const HERO_BG_URL = "portfolio-hero2.webp"; // <- put your Ideogram export here

const processSteps = [
  { number: 1, title: "Consultation & Risk Profiling", description: "Understanding your goals, investment horizon, and risk constraints" },
  { number: 2, title: "Strategy Development", description: "Creating optimal asset allocation, position sizing, and hedging strategies" },
  { number: 3, title: "Execution & Monitoring", description: "Disciplined trade execution with continuous risk monitoring and controls" },
  { number: 4, title: "Reporting & Reviews", description: "Monthly performance reports and quarterly portfolio reviews" },
];

const features = [
  "Comprehensive risk assessment",
  "Monthly performance reporting",
  "Liquidity management & safety",
  "Strict drawdown controls",
  "Transparent communication (weekly snapshot, monthly detail)",
  "Tax-aware rebalancing (consult your tax advisor)",
];

const faqs = [
  {
    question: "Is 3% monthly guaranteed?",
    answer:
      "No—this is a target/objective only. Markets carry inherent risk and returns can never be guaranteed. Our focus is on risk-adjusted performance over time.",
  },
  { question: "Can I redeem anytime?", answer: "Yes, we offer T+1 liquidity as per our policy. You can redeem your investment with one business day notice." },
  { question: "Do you use derivatives?", answer: "Yes, we use derivatives for hedging and defined setups as per mandate to manage portfolio risk and enhance returns." },
  {
    question: "What risks should I know?",
    answer:
      "Market risk, liquidity risk, and gap risk are inherent. We operate with a risk-first approach and strict risk management protocols.",
  },
  {
    question: "How is performance reported?",
    answer:
      "Monthly reports with transparent metrics including P/L, risk metrics, top positions, and cash levels. You also get access to our secure client portal.",
  },
  { question: "What is the minimum investment?", answer: "₹5,00,000 to ensure effective portfolio diversification and risk management." },
  { question: "How long is the recommended investment horizon?", answer: "Minimum 12–24 months for optimal results (no lock-in periods)." },
  {
    question: "What documents are required for onboarding?",
    answer: "PAN card, Aadhaar card, bank details, and signed mandate letter. Processing typically takes 1–3 business days after verification.",
  },
];

export default function PortfolioManagementClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const pageTitle = "Portfolio Management | Seben Capital";
  const pageDesc =
    "Risk-aware portfolio management with disciplined execution, ≤5% drawdown policy, T+1 liquidity, and transparent reporting.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["Service", "FinancialService"],
    name: "Portfolio Management",
    description: "Risk-aware portfolio management with disciplined execution, ≤5% drawdown policy, T+1 liquidity, and transparent reporting.",
    provider: { "@type": "Organization", name: "Seben Capital" },
    areaServed: "IN",
    serviceType: "Portfolio Management",
    offers: {
      "@type": "Offer",
      priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "INR", name: "Minimum Investment", price: "500000" },
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href="https://sebencapital.com/services/portfolio-management" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          // @ts-ignore
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          // @ts-ignore
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="container max-w-6xl py-8 space-y-16">
        {/* HERO — copper-on-charcoal with image + overlay */}
        <section
          id="start-evaluation"
          aria-labelledby="pm-hero-title"
          className="relative overflow-hidden rounded-3xl border border-copper-primary/20"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15,15,18,.55), rgba(15,15,18,.85)), url(${HERO_BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 px-6 md:px-12 py-16 md:py-24 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-copper-primary/15 border border-copper-primary/30 text-copper-primary mb-5">
              <Shield className="w-3.5 h-3.5" /> Risk-First Approach
            </span>
            <h1 id="pm-hero-title" className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Portfolio <span className="text-gradient-copper">Management</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground mx-auto max-w-3xl">
              Professional, risk-aware capital management focused on steady, sustainable growth.
            </p>

            {/* KPI chips */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-background/60 backdrop-blur-md border-copper-primary/25 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">3% Monthly Target</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">(objective, not guaranteed)</p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-md border-copper-primary/25 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">≤5% Max Drawdown</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Policy</p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-md border-copper-primary/25 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">T+1 Liquidity</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-copper hover:opacity-90 hover:scale-[1.02] transition-all">
                    Start Evaluation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Portfolio Management Evaluation</DialogTitle>
                    <DialogDescription>Tell us about your goals and we’ll get back within 24 hours.</DialogDescription>
                  </DialogHeader>

                  {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="space-y-4" aria-label="Evaluation form">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input id="name" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="investment">Investment Amount (₹) *</Label>
                        <Input id="investment" type="number" placeholder="500000" required />
                      </div>
                      <div>
                        <Label htmlFor="horizon">Investment Horizon</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select horizon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6-12">6–12 months</SelectItem>
                            <SelectItem value="1-2">1–2 years</SelectItem>
                            <SelectItem value="2-5">2–5 years</SelectItem>
                            <SelectItem value="5+">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="risk">Risk Comfort</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea id="notes" placeholder="Any specific requirements or questions..." />
                      </div>
                      <Button type="submit" className="w-full">
                        Submit Evaluation Request
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center space-y-4" role="status" aria-live="polite">
                      <CheckCircle className="w-16 h-16 text-success mx-auto" />
                      <h3 className="text-lg font-semibold">Thank You!</h3>
                      <p className="text-muted-foreground">We’ve received your request. Our team will contact you within 24 hours.</p>
                      <Button
                        onClick={() => window.open("https://wa.me/your-number", "_blank")}
                        variant="outline"
                        className="w-full"
                        aria-label="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat on WhatsApp
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://wa.me/your-number", "_blank")}
                aria-label="Talk to us on WhatsApp"
                className="hover:scale-[1.02] transition-all"
              >
                Talk to Us
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">*Targets are objectives; markets carry risk.</div>
          </div>

          {/* soft vignette edge */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </section>

        {/* OVERVIEW */}
        <section aria-labelledby="overview-heading" className="space-y-8">
          <h2 id="overview-heading" className="text-3xl font-heading font-bold text-center">
            Why Choose <span className="text-gradient-copper">Our Portfolio Management</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our disciplined, risk-first approach combines thorough research with precise execution. We focus on consistent performance rather than
                chasing market hype, ensuring your capital is managed with the utmost care and professionalism.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="card-elevated text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">500+ Students Trained</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">95% Satisfaction</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Headphones className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">24/7 Support</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">Targets are objectives; markets carry risk.</p>
        </section>

        {/* PROCESS */}
        <section aria-labelledby="process-heading" className="space-y-8">
          <h2 id="process-heading" className="text-3xl font-heading font-bold text-center">
            Our <span className="text-gradient-copper">Process</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
              <Card key={step.number} className="card-elevated hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-copper flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-copper hover:opacity-90 hover:scale-[1.02] transition-all">
              Start Evaluation
            </Button>
          </div>
        </section>

        {/* FEATURES */}
        <section aria-labelledby="features-heading" className="space-y-8">
          <h2 id="features-heading" className="text-3xl font-heading font-bold text-center">
            Key <span className="text-gradient-copper">Features</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <Card key={i} className="card-elevated hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-0 h-0" aria-hidden="true" />
                    <CheckCircle className="w-5 h-5 text-copper-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* RISK FRAMEWORK */}
        <section aria-labelledby="risk-heading" className="space-y-8">
          <h2 id="risk-heading" className="text-3xl font-heading font-bold text-center">
            Risk <span className="text-gradient-copper">Framework</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Position Sizing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">0.5–2% risk per trade, based on mandate</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Max DD Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Soft stop at ≤5%; escalate to review at 7–8%</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Stops & Hedging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Defined exits; index hedge when required</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Correlation Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Diversify by instrument/strategy regime</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Cash as a Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Raise cash in adverse regimes</p>
                </CardContent>
              </Card>
              <Card className="card-elevated border-copper-primary/20 bg-copper-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-copper-primary mt-0.5" />
                    <p className="text-sm text-copper-primary">
                      <strong>Recovery Tip:</strong> Recovery % &gt; drawdown %. A 20% drawdown needs 25% to recover.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FEES */}
        <section aria-labelledby="fees-heading" className="space-y-8">
          <h2 id="fees-heading" className="text-3xl font-heading font-bold text-center">
            Fees & <span className="text-gradient-copper">Minimums</span>
          </h2>

          <Card className="card-elevated max-w-2xl mx-auto hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-copper-primary">₹5,00,000</h3>
                <p className="text-muted-foreground">Minimum Investment</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Management Fee:</span>
                  <span className="font-semibold">X% p.a.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Performance Fee:</span>
                  <span className="font-semibold">Y% on new highs (optional)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Lock-in Period:</span>
                  <span className="font-semibold text-success">No lock-in</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Liquidity:</span>
                  <span className="font-semibold text-success">T+1 redemptions</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Costs/fees reduce returns; full details in agreement.</p>
            </CardContent>
          </Card>
        </section>

        {/* REPORTING */}
        <section aria-labelledby="reporting-heading" className="space-y-8">
          <h2 id="reporting-heading" className="text-3xl font-heading font-bold text-center">
            Reporting & <span className="text-gradient-copper">Transparency</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-copper-primary" />
                    <span>Monthly Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Comprehensive P/L, risk metrics, top positions, and cash level analysis</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-copper-primary" />
                    <span>Client Portal Access</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Secure online portal with real-time access and email PDF reports</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-copper-primary" />
                    <span>Audit Trail</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Complete trade logs available on request (redacted for privacy)</p>
                </CardContent>
              </Card>
            </div>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Sample Report Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="h-16 bg-gradient-copper/20 rounded flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-copper-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Equity Curve</p>
                  </div>
                  <div>
                    <div className="h-16 bg-gradient-copper/20 rounded flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-copper-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Drawdown</p>
                  </div>
                  <div>
                    <div className="h-16 bg-gradient-copper/20 rounded flex items-center justify-center">
                      <Target className="w-8 h-8 text-copper-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Exposure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section aria-labelledby="eligibility-heading" className="space-y-8">
          <h2 id="eligibility-heading" className="text-3xl font-heading font-bold text-center">
            Eligibility & <span className="text-gradient-copper">Onboarding</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Who It's For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Long-term, risk-aware investors with minimum horizon of 12–24 months</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>KYC & Agreement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">PAN/Aadhaar, bank details, mandate letter required</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Processing Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">1–3 business days after document verification</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-copper hover:opacity-90 hover:scale-[1.02] transition-all">
                  Begin Onboarding
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQS */}
        <section aria-labelledby="faqs-heading" className="space-y-8">
          <h2 id="faqs-heading" className="text-3xl font-heading font-bold text-center">
            Frequently Asked <span className="text-gradient-copper">Questions</span>
          </h2>

          <Card className="card-elevated max-w-4xl mx-auto">
            <CardContent className="p-6 space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-border/60 pb-4">
                  <summary className="cursor-pointer list-none flex items-center justify-between font-medium hover:text-copper-primary">
                    <span>{faq.question}</span>
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* DISCLAIMER */}
        <section aria-labelledby="risk-disclosure-heading">
          <Card className="border-copper-primary/20 bg-copper-primary/5">
            <CardContent className="py-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-copper-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p id="risk-disclosure-heading" className="text-sm font-medium text-copper-primary mb-2">
                    Risk Disclosure
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Trading and investing involve risk of loss. Targets are objectives, not guarantees. Past performance is not indicative of future results. We are
                    not SEBI-registered investment advisors. Please invest responsibly and consider your risk tolerance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* FLOATING CTA */}
      <div className="fixed bottom-20 lg:bottom-8 right-4 z-50">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-copper hover:opacity-90 hover:scale-[1.03] transition-all shadow-lg rounded-full p-4"
          size="lg"
          aria-label="Open evaluation form"
        >
          Start Evaluation
        </Button>
      </div>
    </div>
  );
}
