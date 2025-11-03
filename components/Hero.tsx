'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [marketData, setMarketData] = useState({ value: "+2.4%", trend: "up" as "up" | "down" });
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { label: "Students Trained", value: "500+", icon: Users },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Support", value: "24/7", icon: Clock },
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentStat((p) => (p + 1) % stats.length), 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Seben Capital" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-subtle">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjIyIDEyJSAxOCUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container relative z-10">
        {/* Trust Badge */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" aria-hidden="true" />
            SEBI Awareness • Risk-First Approach
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Trade Smarter. <span className="text-gradient-copper">Grow Steadier.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed" itemProp="slogan">
              We blend education, research, and disciplined execution to help you navigate markets with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="bg-gradient-copper hover:scale-105 transition-transform px-8 py-3 text-lg font-semibold" asChild>
                <Link href="/education/utkarsh">Explore Utkarsh</Link>
              </Button>
              <a href="https://wa.me/919737965552" target="_blank" rel="noopener noreferrer" aria-label="Talk to us on WhatsApp">
                <Button variant="outline" size="lg" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8 py-3 text-lg">
                  Talk to Us
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0" aria-label="Key highlights">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-500 ${index === currentStat ? "scale-105 text-copper-primary" : "text-muted-foreground"}`}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2" aria-hidden="true" />
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center">
            <div className="card-elevated p-6 max-w-sm w-full animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Live Market Data</h3>
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" aria-hidden="true" />
              </div>

              <div className="flex items-center space-x-3 mb-6" aria-label="Market change example">
                <div className={`text-3xl font-bold ${marketData.trend === "up" ? "text-success" : "text-destructive"}`}>{marketData.value}</div>
                <TrendingUp className={`w-6 h-6 ${marketData.trend === "up" ? "text-success" : "text-destructive rotate-180"}`} aria-hidden="true" />
              </div>

              {/* Sparkline placeholder */}
              <div className="h-20 bg-muted/20 rounded-lg flex items-end justify-center space-x-1 p-4" role="img" aria-label="Illustrative market sparkline">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-copper opacity-60 rounded-sm animate-pulse"
                    style={{ height: `${Math.random() * 60 + 20}%`, width: "3px", animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              <div className="mt-4 text-sm text-muted-foreground text-center">* Illustrative data for demonstration</div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-copper rounded-full opacity-20 animate-pulse-copper" />
            <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-copper rounded-full opacity-10 animate-pulse-copper" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
