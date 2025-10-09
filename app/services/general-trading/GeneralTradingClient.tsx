"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart3,
  Target,
  Users,
  Shield,
  FileText,
  Calculator,
  AlertTriangle,
  CheckCircle,
  LineChart,
  ClipboardList,
  MessageSquare,
} from "lucide-react";

const processSteps = [
  { n: 1, t: "Strategy Consultation", d: "Understand goals, constraints, and preferred instruments" },
  { n: 2, t: "Rules & Risk Setup", d: "Define position sizing, stop rules, R:R thresholds, and exposure caps" },
  { n: 3, t: "Execution & Monitoring", d: "Discretionary + rules-based execution with live monitoring" },
  { n: 4, t: "Review & Optimize", d: "Monthly reports, quarterly reviews, and iteration" },
];

const features = [
  "Discretionary + rules-based blend",
  "Multi-asset capability (per mandate)",
  "Defined risk parameters & sizing",
  "Daily snapshots, monthly deep reports",
  "Hedging when required",
  "Transparent fee structure",
];

const faqs = [
  { q: "Is performance guaranteed?", a: "No, markets carry risk. We optimize for risk-adjusted outcomes and capital protection." },
  { q: "What’s the minimum?", a: "₹2,00,000 for General Trading." },
  { q: "How often do you report?", a: "Daily snapshot + monthly detailed reporting." },
  { q: "Do you use algos?", a: "Where fit; we also run discretionary and hybrid models as per mandate." },
];

export default function GeneralTradingClient() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
   <div className="min-h-screen bg-background overflow-x-clip">
      <main className="space-y-16 md:space-y-24">
        {/* HERO — full-bleed image with gradient overlay */}
          <section id="start-consultation" className="relative isolate overflow-x-clip">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/service-gt.jpeg" // <- replace with your asset
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
            {/* decorative glows – allowed to bleed but clipped by parent */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-copper-primary/10 blur-2xl" />
         <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-copper-secondary/10 blur-2xl" />
          </div>

          <div className="container py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h1 id="gt-hero" className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                General <span className="text-gradient-copper">Trading Desk</span>
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-xl text-muted-foreground leading-relaxed">
                Discretionary & rules-based trading services with professional execution, research-backed setups, and strict risk controls.
              </p>

              {/* KPIs */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="card-elevated hover-copper transition-all">
                  <CardContent className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <BarChart3 className="w-5 h-5 text-copper-primary" />
                      <span className="font-semibold">Customized Solutions</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Per mandate & objectives</p>
                  </CardContent>
                </Card>
                <Card className="card-elevated hover-copper transition-all">
                  <CardContent className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Target className="w-5 h-5 text-copper-primary" />
                      <span className="font-semibold">Defined Risk Parameters</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Sizing • Stops • Exposure</p>
                  </CardContent>
                </Card>
                <Card className="card-elevated hover-copper transition-all">
                  <CardContent className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-5 h-5 text-copper-primary" />
                      <span className="font-semibold">Dedicated RM</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Clear communication</p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-copper hover:opacity-90">
                      Schedule Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>General Trading – Consultation</DialogTitle>
                      <DialogDescription>Tell us your requirements; we’ll respond within 24 hours.</DialogDescription>
                    </DialogHeader>

                    {!submitted ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSubmitted(true);
                        }}
                        className="space-y-4"
                        aria-label="Consultation form"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <Label htmlFor="amount">Budget / Capital (₹) *</Label>
                          <Input id="amount" type="number" placeholder="200000" required />
                        </div>
                        <div>
                          <Label>Preferred Style</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="discretionary">Discretionary</SelectItem>
                              <SelectItem value="rules">Rules-based</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea id="notes" placeholder="Instruments, constraints, time horizon..." />
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                      </form>
                    ) : (
                      <div className="text-center space-y-4" role="status" aria-live="polite">
                        <CheckCircle className="w-16 h-16 text-success mx-auto" />
                        <h3 className="text-lg font-semibold">Thank you!</h3>
                        <p className="text-muted-foreground">We’ll get back within 24 hours.</p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open("https://wa.me/your-number", "_blank")}
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
                  aria-label="WhatsApp"
                >
                  Talk to Us
                </Button>
              </div>

              <div className="text-xs text-muted-foreground mt-3">
                *Markets involve risk; outcomes not guaranteed.
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="container space-y-8" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-3xl font-heading font-bold text-center">
            Why Our <span className="text-gradient-copper">General Trading Desk</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We blend discretionary experience with rules-based discipline—using clear risk parameters, transparent reporting, and a
                process-first approach. The result is consistent, risk-aware execution aligned to your objectives.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="card-elevated text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <ClipboardList className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">Daily Snapshot</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">Monthly Report</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5 text-copper-primary" />
                    <span className="font-semibold">Risk Controls</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="container space-y-8" aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-3xl font-heading font-bold text-center">
            Our <span className="text-gradient-copper">Process</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((s) => (
              <Card key={s.n} className="card-elevated hover-copper">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-copper flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{s.n}</span>
                    </div>
                    <CardTitle className="text-lg">{s.t}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button className="bg-gradient-copper hover:opacity-90" onClick={() => setOpen(true)}>
              Schedule Consultation
            </Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container space-y-8" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-heading font-bold text-center">
            Key <span className="text-gradient-copper">Features</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <Card key={i} className="card-elevated hover-copper">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-0 h-0" aria-hidden="true" />
                    <CheckCircle className="w-5 h-5 text-copper-primary mt-0.5" />
                    <span className="text-sm">{f}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Risk Controls */}
        <section id="risk" className="container space-y-8" aria-labelledby="risk-heading">
          <h2 id="risk-heading" className="text-3xl font-heading font-bold text-center">
            Risk <span className="text-gradient-copper">Controls</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader><CardTitle className="text-lg">Position Sizing</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">0.5–2% risk/trade (mandate dependent)</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader><CardTitle className="text-lg">Stops & Hedging</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">Pre-defined stops; index/option hedges when required</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader><CardTitle className="text-lg">Correlation Control</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">Diversify instruments/strategies; cap correlated exposure</p></CardContent>
            </Card>
            <Card className="card-elevated border-copper-primary/20 bg-copper-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-copper-primary mt-0.5" />
                  <p className="text-sm text-copper-primary">
                    <strong>Note:</strong> Recovery % is higher than drawdown %; manage adverse regimes proactively.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Deliverables */}
        <section id="deliverables" className="container space-y-8" aria-labelledby="deliverables-heading">
          <h2 id="deliverables-heading" className="text-3xl font-heading font-bold text-center">
            What You <span className="text-gradient-copper">Get</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-copper-primary" />
                  Daily Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent><p className="text-muted-foreground">P/L, exposure & notes</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-copper-primary" />
                  Monthly Report
                </CardTitle>
              </CardHeader>
              <CardContent><p className="text-muted-foreground">Detailed P/L, risk metrics, commentary</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-copper-primary" />
                  Audit Trail
                </CardTitle>
              </CardHeader>
              <CardContent><p className="text-muted-foreground">Trade logs (redacted) on request</p></CardContent>
            </Card>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="container space-y-8" aria-labelledby="eligibility-heading">
          <h2 id="eligibility-heading" className="text-3xl font-heading font-bold text-center">
            Eligibility & <span className="text-gradient-copper">Onboarding</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader><CardTitle>Minimum & Horizon</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">Minimum ₹2,00,000; recommended horizon 12–24 months</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader><CardTitle>KYC & Agreement</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">PAN/Aadhaar, bank details, mandate letter</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader><CardTitle>Processing Time</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">1–3 business days post verification</p></CardContent>
            </Card>
            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <Button className="bg-gradient-copper hover:opacity-90" onClick={() => setOpen(true)}>
                  Begin Onboarding
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="container space-y-8" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="text-3xl font-heading font-bold text-center">
            Frequently Asked <span className="text-gradient-copper">Questions</span>
          </h2>
          <Card className="card-elevated max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left hover:text-copper-primary">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Disclaimer */}
        <section className="container" aria-labelledby="disclaimer-heading">
          <Card className="border-copper-primary/20 bg-copper-primary/5">
            <CardContent className="py-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-copper-primary mt-0.5" />
                <div>
                  <p id="disclaimer-heading" className="text-sm font-medium text-copper-primary mb-2">Risk Disclosure</p>
                  <p className="text-sm text-muted-foreground">
                    Trading and investing involve risk of loss. Outcomes are not guaranteed. We are not SEBI-registered investment advisors.
                    Evaluate your risk tolerance before investing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-20 lg:bottom-8 right-4 z-50">
        <Button
          onClick={() => setOpen(true)}
          className="bg-gradient-copper hover:opacity-90 shadow-lg animate-pulse rounded-full p-4"
          size="lg"
          aria-label="Open consultation form"
        >
          Schedule Consultation
        </Button>
      </div>
    </div>
  );
}
