import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Copy, Bot, BarChart3, AlertTriangle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Portfolio Management",
      icon: PieChart,
      description:
        "Professional capital management with 3% monthly target returns. Risk-aware growth strategies with transparent reporting.",
      features: ["Risk Assessment", "Monthly Reporting", "Liquidity Management", "Drawdown Control"],
      cta: "Start Evaluation",
      status: "available",
      route: "/services/portfolio-management",
      disclaimer: "Target returns are objectives, not guarantees. Markets carry inherent risks.",
    },
    {
      title: "Copy Trading",
      icon: Copy,
      description:
        "Replicate successful trading strategies from experienced professionals. Automated execution with full transparency.",
      features: ["Real-time Copying", "Risk Controls", "Performance Analytics", "Strategy Selection"],
      cta: "Join Waitlist",
      status: "coming-soon",
      route: "",
    },
    {
      title: "Bot/Algo Trading",
      icon: Bot,
      description:
        "Systematic trading using proven algorithms and quantitative strategies for consistent execution.",
      features: ["Backtested Strategies", "24/7 Execution", "Risk Parameters", "Performance Monitoring"],
      cta: "Join Waitlist",
      status: "coming-soon",
      route: "",
    },
    {
      title: "General Trading Desk",
      icon: BarChart3,
      description:
        "Discretionary and rules-based trading services. Professional execution with detailed research pipeline.",
      features: ["Market Research", "Trade Execution", "Risk Management", "Daily Reports"],
      cta: "Learn More",
      status: "available",
      route: "/services/general-trading",
    },
  ] as const;

  return (
    <section className="py-24 bg-background-secondary" aria-labelledby="services-heading">
      <div className="container">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Our <span className="text-gradient-copper">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive trading and investment solutions designed to meet diverse financial goals while
            maintaining strict risk management protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" itemScope itemType="https://schema.org/ItemList">
          {services.map((service, idx) => (
            <Card
              key={service.title}
              className="group card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] relative"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Service"
            >
              <meta itemProp="position" content={String(idx + 1)} />
              {service.status === "coming-soon" && (
                <Badge className="absolute -top-2 -right-2 bg-copper-primary text-primary-foreground">Coming Soon</Badge>
              )}

              <CardHeader>
                <div className="w-16 h-16 mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center group-hover:animate-pulse-copper">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-heading text-copper-primary mb-2" itemProp="name">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed" itemProp="description">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-copper-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {"disclaimer" in service && service.disclaimer && (
                  <div className="flex items-start space-x-2 mb-6 p-3 bg-muted/20 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-copper-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{service.disclaimer}</p>
                  </div>
                )}

                {service.status === "available" && service.route ? (
                  <Button asChild className="w-full bg-gradient-copper hover:scale-105 transition-all duration-300">
                    <Link href={service.route}>{service.cta}</Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground transition-all duration-300"
                    disabled
                  >
                    {service.cta}
                  </Button>
                )}

                {service.status === "coming-soon" && (
                  <p className="text-xs text-center text-muted-foreground mt-2">Sign up for early access notifications.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
