// app/(site)/bots/BotsClient.tsx
'use client';

import { useState, useEffect } from "react";
import RotatingMarketMini from '@/components/RotatingMarketMini'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Brain,
  Shield,
  TrendingUp,
  Zap,
  Activity,
  Lock,
  BarChart3,
  Clock,
  Target,
  Layers,
  Network,
  Eye,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Download,
  Phone,
  FileText,
  AlertTriangle,
  DollarSign,
  Globe,
  Pause,
  BarChart2,
  Cpu
} from "lucide-react";

const TradingBots = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investmentAmount: "",
    horizon: "",
    riskComfort: "",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const marketData = [
    { pair: "EURUSD", value: "1.0845", change: "+0.34%", trend: "up" },
    { pair: "XAUUSD", value: "2,045.30", change: "+1.2%", trend: "up" },
    { pair: "NAS100", value: "16,234", change: "-0.18%", trend: "down" },
    { pair: "GBPUSD", value: "1.2634", change: "+0.52%", trend: "up" },
    { pair: "USDJPY", value: "149.82", change: "-0.27%", trend: "down" }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMarketIndex((prev) => (prev + 1) % marketData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [marketData.length]);

  const tenEAs = [
    { name: "GUARDIAN", role: "Equity & Risk Control", tagline: "Protects capital, enforces discipline." },
    { name: "HERMES", role: "News Orchestrator", tagline: "Knows when to stay silent." },
    { name: "HUNTER", role: "SMC Execution", tagline: "Targets institutional liquidity." },
    { name: "TITAN", role: "Trend Engine", tagline: "Rides macro moves with patience." },
    { name: "ORACLE", role: "Mean Reversion", tagline: "Finds order in chaos." },
    { name: "PHOENIX", role: "Breakout Engine", tagline: "Ignites at volatility shifts." },
    { name: "HYDRA", role: "Multi-Pair Scalper", tagline: "Small profits, big consistency." },
    { name: "CRONUS", role: "Session Reversal", tagline: "Captures London & NY traps." },
    { name: "ATLAS", role: "Macro Swing", tagline: "Thinks in weeks, not minutes." },
    { name: "ECHO", role: "Copier & Balancer", tagline: "Keeps portfolio in harmony." }
  ];

  const howItWorks = [
    {
      icon: Network,
      title: "One Terminal, Ten Minds",
      description: "Each EA specializes in trend, mean-reversion, breakout, or SMC."
    },
    {
      icon: Brain,
      title: "AI Coordination Layer",
      description: "Proprietary event-bus connects all bots instantly."
    },
    {
      icon: Shield,
      title: "Guardian Protocol",
      description: "Drawdown limits, daily loss caps, and auto-pause functions."
    },
    {
      icon: Zap,
      title: "Fully Automated Execution",
      description: "24/7 monitoring, news filtering, equity balancing."
    }
  ];

  const riskArchitecture = [
    { icon: Pause, title: "Daily Loss Cap", description: "3% auto-pause" },
    { icon: AlertTriangle, title: "Max Drawdown", description: "10% shutdown" },
    { icon: Lock, title: "News Lock", description: "Disables pre/post events" },
    { icon: BarChart2, title: "Equity Sync", description: "All bots obey Guardian" },
    { icon: Target, title: "Bias Alignment", description: "All follow ATLAS bias" }
  ];

  const marketCoverage = [
    { category: "Forex", pairs: ["EURUSD", "GBPUSD", "USDJPY"] },
    { category: "Metals", pairs: ["Gold", "Silver"] },
    { category: "Indices", pairs: ["NAS100", "US30"] },
    { category: "Crypto", pairs: ["Optional future layer"] }
  ];

  const investorProps = [
    {
      icon: Zap,
      title: "Fully Automated Execution",
      description: "No human emotion, just data."
    },
    {
      icon: Shield,
      title: "Institutional-Grade Risk Model",
      description: "Prop-firm style controls."
    },
    {
      icon: Eye,
      title: "Transparent Performance",
      description: "Real-time dashboards."
    },
    {
      icon: Layers,
      title: "Scalable Deployment",
      description: "1 terminal → 10 charts → 100+ sub-accounts."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsWaitlistOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Redesigned */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Trading chart texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          
          {/* Neural grid glow */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-copper-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Faint deer silhouette */}
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-5">
            <div className="w-full h-full flex items-end justify-end">
              <div className="w-64 h-64 bg-copper-primary/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start mb-6">
                <Badge 
                  variant="outline" 
                  className="border-copper-primary/30 text-copper-primary bg-copper-primary/5 px-4 py-2"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  SEBI Awareness • Risk-First Approach
                </Badge>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                Let the Bots Trade.{" "}
                <span className="text-gradient-copper">
                  Let Your Capital Compound.
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                10 proprietary trading algorithms. One synchronized ecosystem — precision-engineered for consistent, risk-controlled returns.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  onClick={() => setIsWaitlistOpen(true)}
                  className="bg-gradient-copper hover:scale-105 transition-transform text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-copper-primary/20"
                >
                  Join the Waitlist
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary/10 px-8 py-3 text-lg"
                >
                  <Download className="mr-2 w-5 h-5" />
                  Download Investor Deck
                </Button>
              </div>
            </div>

            {/* Right Side - Live Market Data Widget */}
            <div className="relative flex justify-center lg:justify-end">
              <Card className="card-elevated p-6 max-w-md w-full backdrop-blur-xl bg-card/50 border-copper-primary/20">
                <div className="relative flex justify-center">
                              <div className="p-6 max-w-sm w-full animate-fade-in">
                                <div className="flex items-center justify-between mb-4">
                                  <h3 className="font-semibold text-lg">Live Market Data</h3>
                                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                                </div>
                
                                <RotatingMarketMini
                                  intervalMs={5000}
                                  height={260}
                                  items={[
                                    { label: 'USD/INR', symbol: 'FX_IDC:USDINR' },
                                    { label: 'EUR/USD', symbol: 'FX:EURUSD' },
                                    { label: 'Gold (XAUUSD)', symbol: 'FX_IDC:XAUUSD' },
                                    { label: 'USD/JPY', symbol: 'FX:USDJPY' },
                                    { label: 'GBP/USD', symbol: 'FX:GBPUSD' },
                                    { label: 'UKOIL (Brent)', symbol: 'TVC:UKOIL' },
                                    { label: 'USOIL (WTI)', symbol: 'TVC:USOIL' },
                                    { label: 'India (INDA ETF)', symbol: 'AMEX:INDA' },
                                    { label: 'US Dollar Index (UUP)', symbol: 'AMEX:UUP' },
                                  ]}
                                />
                
                                <div className="mt-3 text-[11px] text-muted-foreground text-center">
                                  Live via TradingView • rotates every 5s
                                </div>
                              </div>
                            </div>
              </Card>

              {/* Floating neural nodes */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-copper-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-copper-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-copper-primary/10 text-copper-primary border-copper-primary/20">
              <Brain className="w-4 h-4 mr-2" />
              System Architecture
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four pillars of automated trading excellence
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-copper-primary/20 via-copper-primary to-copper-primary/20"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="relative card-hover backdrop-blur-sm bg-card/50 border-copper-primary/20">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-copper flex items-center justify-center mx-auto mb-4 relative z-10">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg text-center">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Ten EAs */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-copper-primary/10 text-copper-primary border-copper-primary/20">
              <Cpu className="w-4 h-4 mr-2" />
              Trading Ecosystem
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              The Ten EAs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each algorithm plays a specialized role in our trading orchestra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tenEAs.map((ea, index) => (
              <Card 
                key={index} 
                className="group card-hover backdrop-blur-sm bg-card/50 border-copper-primary/20 hover:border-copper-primary/50 hover:shadow-lg hover:shadow-copper-primary/10 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-copper-primary rounded-full group-hover:animate-pulse"></div>
                    <CardTitle className="text-2xl font-heading text-gradient-copper">{ea.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base font-semibold text-foreground/80">{ea.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{ea.tagline}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Overview */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-copper-primary/10 text-copper-primary border-copper-primary/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Track Record
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Performance Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* Left - Metrics */}
            <div className="space-y-6">
              <Card className="card-elevated backdrop-blur-sm bg-card/50 border-copper-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-copper-primary" />
                    Annualized Return
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-copper-primary">64%</div>
                </CardContent>
              </Card>

              <Card className="card-elevated backdrop-blur-sm bg-card/50 border-copper-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Max Drawdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-amber-500">&lt;10%</div>
                </CardContent>
              </Card>

              <Card className="card-elevated backdrop-blur-sm bg-card/50 border-copper-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-copper-primary" />
                    Win Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-copper-primary">65%</div>
                </CardContent>
              </Card>

              <Card className="card-elevated backdrop-blur-sm bg-card/50 border-copper-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-blue-500" />
                    Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">70/20/10</div>
                  <p className="text-sm text-muted-foreground mt-2">Forex / Metals / Indices</p>
                </CardContent>
              </Card>
            </div>

            {/* Right - Equity Curve */}
            <div className="relative">
              <Card className="card-elevated backdrop-blur-sm bg-card/50 border-copper-primary/20 overflow-hidden">
                <CardHeader>
                  <CardTitle>Equity Growth</CardTitle>
                  <CardDescription>Illustrative performance curve</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Animated equity curve */}
                  <div className="h-80 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgb(217, 119, 6)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="rgb(217, 119, 6)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,250 L50,240 L100,220 L150,230 L200,200 L250,180 L300,150 L350,130 L400,100"
                        fill="none"
                        stroke="rgb(217, 119, 6)"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      <path
                        d="M0,250 L50,240 L100,220 L150,230 L200,200 L250,180 L300,150 L350,130 L400,100 L400,300 L0,300 Z"
                        fill="url(#equityGradient)"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    * For illustration only. Past performance does not guarantee future results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Architecture */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-copper-primary/10 text-copper-primary border-copper-primary/20">
              <Shield className="w-4 h-4 mr-2" />
              Protection Systems
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Risk Architecture
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multi-layered safeguards protecting your capital 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {riskArchitecture.map((item, index) => (
              <Card key={index} className="card-hover backdrop-blur-sm bg-card/50 border-copper-primary/20 text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-copper-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-8 h-8 text-copper-primary" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Coverage */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-copper-primary/10 text-copper-primary border-copper-primary/20">
              <Globe className="w-4 h-4 mr-2" />
              Global Markets
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Market Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {marketCoverage.map((market, index) => (
              <Card key={index} className="card-hover backdrop-blur-sm bg-card/50 border-copper-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient-copper">{market.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {market.pairs.map((pair, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-copper-primary" />
                        {pair}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Proposition */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-copper-primary/10 text-copper-primary border-copper-primary/20">
              <DollarSign className="w-4 h-4 mr-2" />
              Investment Benefits
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Investor Proposition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {investorProps.map((prop, index) => (
              <Card key={index} className="card-hover backdrop-blur-sm bg-card/50 border-copper-primary/20 text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-copper flex items-center justify-center mx-auto mb-4">
                    <prop.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{prop.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{prop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-copper hover:scale-105 transition-transform">
              <FileText className="mr-2 w-5 h-5" />
              Request Investor Portal
            </Button>
            <Button size="lg" variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary/10">
              <Download className="mr-2 w-5 h-5" />
              Download Deck
            </Button>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <Card className="max-w-4xl mx-auto card-elevated backdrop-blur-sm bg-card/50 border-copper-primary/30 border-2">
            <CardContent className="p-12">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-copper flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💬</span>
                </div>
                <Badge className="bg-copper-primary/10 text-copper-primary border-copper-primary/20">
                  Founder's Note
                </Badge>
              </div>
              <blockquote className="text-2xl md:text-3xl font-heading text-center leading-relaxed mb-6 text-gradient-copper italic">
                "We've spent years building, breaking, and rebuilding this system. It's not luck — it's architecture."
              </blockquote>
              <p className="text-center text-muted-foreground">
                — <span className="font-semibold text-foreground">Sauravsingh Tomar</span>, Founder – Seben Capital
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-copper-primary/20 via-background to-copper-primary/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Ready to let the bots{" "}
            <span className="text-gradient-copper">work for you?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the Seben Capital Investor Network
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsWaitlistOpen(true)}
              className="bg-gradient-copper hover:scale-105 transition-transform text-white px-10 py-6 text-xl font-semibold shadow-xl shadow-copper-primary/30"
            >
              <Phone className="mr-2 w-6 h-6" />
              Book Investor Call
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary/10 px-10 py-6 text-xl hover:scale-105 transition-transform"
            >
              <FileText className="mr-2 w-6 h-6" />
              View Performance Deck
            </Button>
          </div>
        </div>
      </section>

     

      {/* Lead Capture Modal */}
      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="backdrop-blur-xl bg-card/95 border-copper-primary/20">
          {!isSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Join the Waitlist</DialogTitle>
                <DialogDescription>
                  Start your evaluation for The 10-Bot Fund investment opportunity.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Investment Amount (₹)</Label>
                  <Select
                    value={formData.investmentAmount}
                    onValueChange={(value) => setFormData({ ...formData, investmentAmount: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10L">₹5-10 Lakhs</SelectItem>
                      <SelectItem value="10-25L">₹10-25 Lakhs</SelectItem>
                      <SelectItem value="25-50L">₹25-50 Lakhs</SelectItem>
                      <SelectItem value="50L+">₹50+ Lakhs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="horizon">Investment Horizon</Label>
                  <Select
                    value={formData.horizon}
                    onValueChange={(value) => setFormData({ ...formData, horizon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select horizon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-12m">6-12 months</SelectItem>
                      <SelectItem value="1-2y">1-2 years</SelectItem>
                      <SelectItem value="2-3y">2-3 years</SelectItem>
                      <SelectItem value="3y+">3+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="risk">Risk Comfort Level</Label>
                  <Select
                    value={formData.riskComfort}
                    onValueChange={(value) => setFormData({ ...formData, riskComfort: value })}
                  >
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
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any specific questions or requirements..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-copper hover:scale-105 transition-transform text-white">
                  Submit Application
                </Button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-copper-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest. We'll review your application and contact you within 48 hours.
              </p>
              <Button
                onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                variant="outline"
                className="border-copper-primary text-copper-primary hover:bg-copper-primary/10"
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                Connect on WhatsApp
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradingBots;