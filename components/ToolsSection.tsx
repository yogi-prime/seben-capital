import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Calendar } from "lucide-react";

const ToolsSection = () => {
  const tools = [
    {
      title: "Position Size Calculator",
      icon: Calculator,
      description:
        "Calculate optimal position sizes based on your risk tolerance and account size. Manage risk effectively with proper position sizing.",
      features: ["Risk percentage input", "Account size calculation", "Stop-loss integration", "Real-time results"],
      href: "/tools/position-calculator",
    },
    {
      title: "Compounding Calculator",
      icon: TrendingUp,
      description:
        "Visualize the power of compound returns over time. See how consistent profits can grow your trading account exponentially.",
      features: ["Monthly return scenarios", "Time period analysis", "Growth visualization", "Withdrawal impact"],
      href: "/tools/compounding-calculator",
    },
    {
      title: "Economic Calendar",
      icon: Calendar,
      description:
        "Stay informed about market-moving events. Track important economic releases and plan your trading around key announcements.",
      features: ["Real-time updates", "Impact ratings", "Historical data", "Market timezone sync"],
      href: "/tools/economic-calendar",
    },
  ];

  return (
    <section className="py-24 bg-background-secondary" aria-labelledby="tools-heading">
      <div className="container">
        <div className="text-center mb-16">
          <h2 id="tools-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Trading <span className="text-gradient-copper">Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional trading calculators and tools to help you make informed decisions and manage risk effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" itemScope itemType="https://schema.org/ItemList">
          {tools.map((tool, idx) => (
            <Card key={tool.title} className="group card-elevated hover-copper transition-all duration-300 hover:scale-105" itemProp="itemListElement">
              <meta itemProp="position" content={String(idx + 1)} />
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center group-hover:animate-pulse-copper">
                  <tool.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-heading text-copper-primary mb-2" itemProp="name">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed" itemProp="description">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-copper-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground transition-all duration-300"
                  asChild
                >
                  <Link href={tool.href}>Use Calculator</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-muted/10 rounded-lg border border-copper-primary/20 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong>Educational Use Only:</strong> These tools are provided for educational purposes and should not be considered as financial advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
