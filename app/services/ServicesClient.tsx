"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Copy, Bot, BarChart3, AlertTriangle, CheckCircle, ArrowRight, Filter } from "lucide-react";
import { useMemo } from "react";

export default function ServicesClient() {
  const mainServices = useMemo(
    () => [
      {
        id: "portfolio-management",
        title: "Portfolio Management",
        icon: PieChart,
        subtitle: "Professional Capital Management",
        target: "3% Monthly Target Returns",
        minInvestment: "₹5,00,000",
        status: "available",
        description:
          "Professional capital management with risk-aware growth strategies. Our disciplined approach focuses on consistent returns while maintaining strict risk management protocols.",
        features: [
          "Comprehensive risk assessment",
          "Monthly performance reporting",
          "Professional liquidity management",
          "Strict drawdown controls",
          "Transparent fee structure",
          "Regular portfolio rebalancing",
        ],
        process: [
          "Initial consultation & risk profiling",
          "Portfolio strategy development",
          "Execution & ongoing management",
          "Regular monitoring & reporting",
        ],
        riskNote:
          "Target returns are objectives, not guarantees. Markets carry inherent risks. Past performance does not indicate future results.",
      },
      {
        id: "general-trading",
        title: "General Trading Desk",
        icon: BarChart3,
        subtitle: "Discretionary & Rules-Based Services",
        target: "Customized Solutions",
        minInvestment: "₹2,00,000",
        status: "available",
        description:
          "Comprehensive trading services combining discretionary expertise with systematic approaches. Professional execution backed by institutional-grade research.",
        features: [
          "Market research & analysis",
          "Professional trade execution",
          "Comprehensive risk management",
          "Daily performance reports",
          "Multi-asset capability",
          "Dedicated relationship manager",
        ],
        process: ["Strategy consultation", "Risk parameter setup", "Trade execution & monitoring", "Performance analysis & optimization"],
      },
    ],
    []
  );

  const comingSoonServices = useMemo(
    () => [
      {
        id: "copy-trading",
        title: "Copy Trading",
        icon: Copy,
        subtitle: "Replicate Successful Strategies",
        description:
          "Automatically replicate trades from experienced professionals with full transparency and risk control.",
        features: [
          "Real-time trade copying",
          "Advanced risk controls",
          "Performance analytics",
          "Strategy selection tools",
          "Transparent fee structure",
          "24/7 automated execution",
        ],
        launchDate: "Q2 2024",
      },
      {
        id: "algo-trading",
        title: "Bot/Algo Trading",
        icon: Bot,
        subtitle: "Systematic Quantitative Strategies",
        description:
          "Algorithmic trading solutions using proven quantitative strategies for consistent market execution.",
        features: [
          "Backtested trading algorithms",
          "24/7 automated execution",
          "Customizable risk parameters",
          "Real-time performance monitoring",
          "Multiple strategy options",
          "Advanced portfolio optimization",
        ],
        launchDate: "Q3 2024",
      },
    ],
    []
  );

  return (
    <main aria-labelledby="services-hero-title" className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/5" aria-label="Professional Services">
              <PieChart className="w-4 h-4 mr-2" />
              Professional Services
            </Badge>
            <h1 id="services-hero-title" className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Comprehensive Trading <span className="text-gradient-copper">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional trading and investment solutions designed to meet diverse financial goals while maintaining strict risk management protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="py-24" aria-labelledby="available-services-heading">
        <div className="container">
          <h2 id="available-services-heading" className="text-4xl font-heading font-bold mb-12 text-center">
            Available <span className="text-gradient-copper">Services</span>
          </h2>

          <div className="space-y-16">
            {mainServices.map((service) => (
              <Card key={service.id} className="card-elevated border-copper-primary/20 overflow-hidden">
                <article aria-labelledby={`${service.id}-title`} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Content */}
                  <div className="p-8">
                    <header className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-copper rounded-2xl flex items-center justify-center" aria-hidden="true">
                        <service.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 id={`${service.id}-title`} className="text-2xl font-heading font-bold text-copper-primary">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground">{service.subtitle}</p>
                      </div>
                    </header>

                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6" role="list">
                      <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <div className="font-bold text-copper-primary">{service.target}</div>
                        <div className="text-sm text-muted-foreground">Objective</div>
                      </div>
                      <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <div className="font-bold text-copper-primary">{service.minInvestment}</div>
                        <div className="text-sm text-muted-foreground">Min. Investment</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-copper-primary">Key Features</h4>
                      {service.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {service.id === "portfolio-management" ? (
                      <Link href="/services/portfolio-management" aria-label="Start Portfolio Management evaluation">
                        <Button className="w-full bg-gradient-copper hover:scale-105 transition-transform mb-4">
                          Start Evaluation
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/services/general-trading" aria-label="Explore General Trading Desk">
                        <Button className="w-full bg-gradient-copper hover:scale-105 transition-transform mb-4">
                          Start Evaluation
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}

                    {"riskNote" in service && service.riskNote && (
                      <div className="flex items-start space-x-2 p-3 bg-copper-primary/10 rounded-lg border border-copper-primary/20" role="note" aria-label="Risk note">
                        <AlertTriangle className="w-4 h-4 text-copper-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{service.riskNote}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Process */}
                  <div className="p-8 bg-muted/5">
                    <h4 className="font-semibold text-copper-primary mb-6">Our Process</h4>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={step} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-copper rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm" aria-hidden="true">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-muted-foreground">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-background rounded-lg border border-copper-primary/20">
                      <h5 className="font-semibold text-copper-primary mb-3">Complete Feature Set</h5>
                      <div className="space-y-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-copper-primary rounded-full" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 bg-background-secondary" aria-labelledby="coming-soon-heading">
        <div className="container">
          <h2 id="coming-soon-heading" className="text-4xl font-heading font-bold mb-12 text-center">
            Coming <span className="text-gradient-copper">Soon</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonServices.map((service) => (
              <Card key={service.id} className="card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] relative">
                <Badge className="absolute -top-2 -right-2 bg-copper-primary text-primary-foreground">{service.launchDate}</Badge>

                <CardHeader>
                  <div className="w-16 h-16 mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center opacity-70" aria-hidden="true">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-heading text-copper-primary mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.subtitle}</CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-copper-primary/60 rounded-full" />
                        <span className="text-sm text-muted-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                    disabled
                    aria-disabled="true"
                  >
                    Join Waitlist - {service.launchDate}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-2">Sign up for early access notifications.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24" aria-labelledby="services-cta-heading">
        <div className="container text-center">
          <h2 id="services-cta-heading" className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your investment objectives and find the right service for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" aria-label="Schedule consultation">
              <Button size="lg" className="bg-gradient-copper hover:scale-105 transition-transform">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/assets/seben-services-brochure.pdf" aria-label="Download service brochure">
              <Button
                variant="outline"
                size="lg"
                className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
              >
                Download Service Brochure
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
