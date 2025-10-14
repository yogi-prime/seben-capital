"use client";

import { useState } from "react";
import Link from "next/link";

import Chatbot from "@/components/Chatbot";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Calculator, TrendingUp, Target, BarChart3, DollarSign, TrendingDown, Percent,
  Calendar, Activity, Network, Search, Filter
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address")
});

export default function ToolsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");

  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { name: "", phone: "", email: "" }
  });

  const availableTools = [
    {
      id: "position-size",
      title: "Position Size Calculator",
      icon: Calculator,
      description: "Calculate optimal position sizes based on risk tolerance and account size.",
      tags: ["Risk", "Portfolio"],
      href: "/calculators/position-size"
    },
    {
      id: "compounding",
      title: "Compounding Calculator",
      icon: TrendingUp,
      description: "Visualize the power of compound returns over time periods.",
      tags: ["Returns", "Portfolio"],
      href: "/calculators/compounding"
    },
    {
      id: "sip-goal-planner",
      title: "SIP Goal Planner",
      icon: Target,
      description: "Plan your SIP investments to reach specific financial goals.",
      tags: ["SIP", "Planning"],
      href: "/calculators/sip-goal-planner"
    },
    {
      id: "rr-expectancy",
      title: "Risk/Reward & Expectancy",
      icon: BarChart3,
      description: "Calculate trading expectancy and risk-reward ratios.",
      tags: ["Risk", "Strategy"],
      href: "/calculators/rr-expectancy"
    },
    {
      id: "options-pl",
      title: "Options P/L Calculator",
      icon: DollarSign,
      description: "Calculate profit/loss for single and multi-leg option strategies.",
      tags: ["Options", "Risk"],
      href: "/calculators/options-pl"
    },
    {
      id: "drawdown-recovery",
      title: "Drawdown & Recovery",
      icon: TrendingDown,
      description: "Calculate recovery requirements after portfolio drawdowns.",
      tags: ["Risk", "Recovery"],
      href: "/calculators/drawdown-recovery"
    },
    {
      id: "cagr",
      title: "CAGR Calculator",
      icon: Percent,
      description: "Calculate compound annual growth rate for investments.",
      tags: ["Returns", "Analysis"],
      href: "/calculators/cagr"
    }
  ];

  const comingSoonTools = [
    {
      id: "economic-calendar",
      title: "Economic Calendar",
      icon: Calendar,
      description: "Real-time global macro events, India & US filters, impact badges.",
      tags: ["News", "Analysis"],
      features: ["Real-time global events", "India & US market focus", "Impact ratings", "Custom alerts"]
    },
    {
      id: "strategy-backtester",
      title: "Strategy Backtester",
      icon: Activity,
      description: "Import CSV data, test rules like MA crossover, RSI strategies.",
      tags: ["Strategy", "Analysis"],
      features: ["CSV data import", "Technical indicators", "Equity curves", "Performance metrics"]
    },
    {
      id: "correlation-matrix",
      title: "Correlation Matrix",
      icon: Network,
      description: "Upload tickers or choose NIFTY50 subset, visual heatmaps.",
      tags: ["Portfolio", "Analysis"],
      features: ["Stock correlations", "Interactive heatmaps", "Rolling correlations", "NIFTY50 presets"]
    }
  ];

  const allFilters = ["all", "risk", "portfolio", "returns", "options", "strategy", "analysis"];

  const filteredAvailableTools = availableTools.filter(tool => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
    const matchesFilter = selectedFilter === "all" || tool.tags.some(tag => tag.toLowerCase() === selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const filteredComingSoonTools = comingSoonTools.filter(tool => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
    const matchesFilter = selectedFilter === "all" || tool.tags.some(tag => tag.toLowerCase() === selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const handleWaitlistSubmit = (values: z.infer<typeof waitlistSchema>) => {
    console.log("Waitlist submission:", { ...values, tool: selectedTool });
    setIsWaitlistOpen(false);
    form.reset();
  };

  const openWaitlist = (toolTitle: string) => {
    setSelectedTool(toolTitle);
    setIsWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
  
      <main aria-labelledby="tools-hero-title">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-subtle">
          <div className="container">
            <div className="text-center mb-16">
              <h1 id="tools-hero-title" className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Trading <span className="text-gradient-copper">Tools</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional calculators and resources for informed, risk-aware decisions.
                Plan your risk, size your trades, project outcomes — before you click buy.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-12" role="search" aria-label="Tools search and filter">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                  <Input
                    placeholder="Search tools by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-card border-copper-primary/20 focus:border-copper-primary"
                    aria-label="Search tools"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto" aria-label="Filter tags">
                  {allFilters.map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter)}
                      className={
                        selectedFilter === filter
                          ? "bg-gradient-copper hover:scale-105"
                          : "border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                      }
                      aria-pressed={selectedFilter === filter}
                    >
                      <Filter className="w-4 h-4 mr-1" />
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <p className="sr-only" aria-live="polite">
                {filteredAvailableTools.length} available tools, {filteredComingSoonTools.length} coming soon.
              </p>
            </div>
          </div>
        </section>

        {/* Available Tools */}
        <section className="py-16" aria-labelledby="available-tools-heading">
          <div className="container">
            <div className="mb-12">
              <h2 id="available-tools-heading" className="text-3xl font-heading font-bold mb-4 text-copper-primary">
                Available Tools ({filteredAvailableTools.length})
              </h2>
              <p className="text-muted-foreground">Fully functional calculators ready to use right now.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredAvailableTools.map((tool) => (
                <Card key={tool.id} className="group card-elevated hover-copper transition-all duration-300 hover:scale-105">
                  <article aria-labelledby={`${tool.id}-title`}>
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center group-hover:animate-pulse-copper" aria-hidden="true">
                        <tool.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <CardTitle id={`${tool.id}-title`} className="text-xl font-heading text-copper-primary mb-2">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button asChild className="w-full bg-gradient-copper hover:scale-105 transition-transform" aria-label={`Use ${tool.title}`}>
                        <Link href={tool.href}>Use Calculator</Link>
                      </Button>
                    </CardContent>
                  </article>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Tools */}
        <section className="py-16 bg-background-secondary" aria-labelledby="coming-tools-heading">
          <div className="container">
            <div className="mb-12">
              <h2 id="coming-tools-heading" className="text-3xl font-heading font-bold mb-4 text-copper-primary">
                Coming Soon ({filteredComingSoonTools.length})
              </h2>
              <p className="text-muted-foreground">Advanced tools currently in development. Join the waitlist to be notified.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredComingSoonTools.map((tool) => (
                <Card key={tool.id} className="card-elevated opacity-80">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center" aria-hidden="true">
                      <tool.icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl font-heading text-copper-primary mb-2">{tool.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-6">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline"
                      className="w-full border-muted-foreground/30 text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => openWaitlist(tool.title)}
                      aria-label={`Join waitlist for ${tool.title}`}
                    >
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" aria-labelledby="tools-cta-heading">
          <div className="container">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-6 bg-muted/10 rounded-lg border border-copper-primary/20 max-w-2xl mx-auto">
                <div>
                  <h3 id="tools-cta-heading" className="text-xl font-heading font-bold text-copper-primary mb-2">
                    Need a Custom Tool?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    New tools are added regularly based on user feedback. Suggest a tool or request a custom calculator.
                  </p>
                  <Link href="/contact" aria-label="Contact us for custom tool">
                    <Button className="bg-gradient-copper hover:scale-105 transition-transform">Talk to Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Disclaimer */}
        <section className="py-8 bg-background-secondary">
          <div className="container">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Educational Use Only:</strong> These tools are provided for educational purposes and should not be considered as financial advice.
                Markets involve risk; results are not guaranteed. Always consult with qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Waitlist Modal */}
      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-copper-primary">Join Waitlist</DialogTitle>
            <DialogDescription>
              Be the first to know when <strong>{selectedTool}</strong> becomes available.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleWaitlistSubmit)} className="space-y-4" aria-label="Waitlist form">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105">
                  Join Waitlist
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsWaitlistOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Chatbot />
    </div>
  );
}
