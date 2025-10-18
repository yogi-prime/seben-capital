// app/(site)/bots/BotsClient.tsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Brain,
  TrendingUp,
  Shield,
  Zap,
  Activity,
  Target,
  BarChart3,
  Lock,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  Network,
  Database,
  LineChart,
  PieChart,
  Layers,
  Download,
  Calendar,
} from "lucide-react";

const TradingBots = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string; top: string; delay: string; duration: string}>>([]);

  // Live metrics simulation
  const [liveMetrics, setLiveMetrics] = useState({
    aum: 2847500,
    monthlyReturn: 3.2,
    sharpeRatio: 2.4,
    activeSignals: 23,
  });

  useEffect(() => {
    setIsClient(true);
    
    // Initialize particles only on client side
    setParticles(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`, 
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        aum: prev.aum + Math.random() * 1000 - 500,
        monthlyReturn: Math.max(0, Math.min(10, prev.monthlyReturn + (Math.random() - 0.5) * 0.1)),
        sharpeRatio: Math.max(1, Math.min(4, prev.sharpeRatio + (Math.random() - 0.5) * 0.05)),
        activeSignals: Math.floor(Math.random() * 10) + 18,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const bots = [
    {
      id: 1,
      name: "Alpha Hunter",
      specialization: "Momentum Breakouts",
      winRate: 68,
      trades: 142,
      status: "active",
      icon: TrendingUp,
      color: "copper",
    },
    {
      id: 2,
      name: "Mean Reversion",
      specialization: "Oversold Bounces",
      winRate: 72,
      trades: 98,
      status: "active",
      icon: Activity,
      color: "copper",
    },
    {
      id: 3,
      name: "Volatility Arbitrage",
      specialization: "Options Spreads",
      winRate: 64,
      trades: 76,
      status: "active",
      icon: BarChart3,
      color: "copper",
    },
    {
      id: 4,
      name: "Grid Master",
      specialization: "Range Trading",
      winRate: 71,
      trades: 203,
      status: "active",
      icon: Layers,
      color: "copper",
    },
    {
      id: 5,
      name: "Trend Rider",
      specialization: "Directional Bias",
      winRate: 66,
      trades: 88,
      status: "standby",
      icon: LineChart,
      color: "copper",
    },
    {
      id: 6,
      name: "Scalp Engine",
      specialization: "High-Frequency",
      winRate: 58,
      trades: 412,
      status: "active",
      icon: Zap,
      color: "copper",
    },
    {
      id: 7,
      name: "Options Oracle",
      specialization: "Theta Decay",
      winRate: 75,
      trades: 54,
      status: "active",
      icon: PieChart,
      color: "copper",
    },
    {
      id: 8,
      name: "Sentiment Analyzer",
      specialization: "News Trading",
      winRate: 62,
      trades: 67,
      status: "standby",
      icon: Brain,
      color: "copper",
    },
    {
      id: 9,
      name: "Risk Guardian",
      specialization: "Portfolio Hedging",
      winRate: 79,
      trades: 31,
      status: "active",
      icon: Shield,
      color: "copper",
    },
    {
      id: 10,
      name: "Market Maker",
      specialization: "Liquidity Provision",
      winRate: 69,
      trades: 187,
      status: "active",
      icon: Network,
      color: "copper",
    },
  ];

  const riskLayers = [
    {
      title: "Position Sizing",
      description: "0.5-2% risk per trade, dynamically adjusted",
      icon: Target,
    },
    {
      title: "Drawdown Control",
      description: "Auto-pause at 5% portfolio drawdown",
      icon: Shield,
    },
    {
      title: "Correlation Matrix",
      description: "Real-time cross-bot exposure monitoring",
      icon: Network,
    },
    {
      title: "Circuit Breakers",
      description: "Instant shutdown on anomalous conditions",
      icon: Lock,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section with Neural Network */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0%,transparent_50%)]" />
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(120,119,198,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Fixed Floating Particles - Only render on client */}
        {isClient && (
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-copper-primary/30 rounded-full animate-pulse"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
        )}

        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Status Badge */}
            <div className="flex justify-center mb-8">
              <Badge className="bg-copper-primary/10 text-copper-primary border-copper-primary/30 px-4 py-2">
                <Cpu className="w-4 h-4 mr-2 animate-pulse" />
                10 Specialized AI Trading Systems Active
              </Badge>
            </div>

            {/* Hero Content */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-copper-primary to-white bg-clip-text text-transparent leading-tight">
                The 10-Bot Fund
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                Institutional-grade AI trading ecosystem. Multi-strategy execution with
                military-grade risk controls.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-copper hover:scale-105 transition-transform text-white font-semibold px-8 py-6 text-lg group">
                      Join Exclusive Waitlist
                      <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-950 border-gray-800">
                    {!isSubmitted ? (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-white">Join The 10-Bot Fund</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Submit your details to access institutional-grade AI trading.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="name" className="text-white">Full Name</Label>
                            <Input
                              id="name"
                              required
                              className="bg-gray-900 border-gray-700 text-white"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              className="bg-gray-900 border-gray-700 text-white"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-white">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              className="bg-gray-900 border-gray-700 text-white"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <div>
                            <Label htmlFor="capital" className="text-white">Investment Capital (₹)</Label>
                            <Select required>
                              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 border-gray-700">
                                <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                                <SelectItem value="10-25">₹10-25 Lakhs</SelectItem>
                                <SelectItem value="25-50">₹25-50 Lakhs</SelectItem>
                                <SelectItem value="50+">₹50+ Lakhs</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="notes" className="text-white">Additional Notes</Label>
                            <Textarea
                              id="notes"
                              className="bg-gray-900 border-gray-700 text-white"
                              placeholder="Trading experience, goals, questions..."
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-gradient-copper hover:scale-105 transition-transform text-white font-semibold">
                            Submit Application
                          </Button>
                        </form>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <CheckCircle2 className="w-16 h-16 text-copper-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                        <p className="text-gray-400 mb-6">Our team will review and contact you within 48 hours.</p>
                        <Button
                          onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                          variant="outline"
                          className="border-copper-primary text-copper-primary hover:bg-copper-primary/10"
                        >
                          Connect on WhatsApp
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button size="lg" variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8 py-6 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  View Performance
                </Button>
              </div>
            </div>

            {/* Live Dashboard Preview */}
            <Card className="bg-gray-950/50 border-copper-primary/30 backdrop-blur-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-copper-primary font-mono mb-2">
                    ₹{(liveMetrics.aum / 100000).toFixed(2)}L
                  </div>
                  <div className="text-sm text-gray-500">Assets Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-copper-primary font-mono mb-2">
                    +{liveMetrics.monthlyReturn.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">Monthly Return</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-copper-primary font-mono mb-2">
                    {liveMetrics.sharpeRatio.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">Sharpe Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-copper-primary font-mono mb-2">
                    {liveMetrics.activeSignals}
                  </div>
                  <div className="text-sm text-gray-500">Active Signals</div>
                </div>
              </div>

              {/* Simplified Equity Curve */}
              <div className="mt-8 h-32 flex items-end gap-1">
                {[...Array(60)].map((_, i) => {
                  const height = 30 + Math.random() * 70 + (i * 0.5);
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-copper-primary/50 to-copper-primary rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Bot Showcase Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Bot Squadron</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                10 specialized AI systems, each optimized for specific market conditions and strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {bots.map((bot) => {
                const Icon = bot.icon;
                
                return (
                  <Card
                    key={bot.id}
                    className="bg-gray-950/80 border-copper-primary/20 hover:border-copper-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-copper-primary/10">
                          <Icon className="w-6 h-6 text-copper-primary" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-copper-primary/30 text-copper-primary text-xs"
                        >
                          {bot.status}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-copper-primary transition-colors">
                        {bot.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{bot.specialization}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Win Rate</span>
                          <span className="text-copper-primary font-mono font-semibold">{bot.winRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Trades</span>
                          <span className="text-gray-300 font-mono">{bot.trades}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Architecture */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-copper-primary/10 text-copper-primary border-copper-primary/30 mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Military-Grade Protection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Risk Architecture</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Multi-layered protection systems ensure capital preservation under all market conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riskLayers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <Card
                    key={index}
                    className="bg-gradient-to-b from-gray-950 to-black border-copper-primary/20 hover:border-copper-primary/50 transition-all duration-300 p-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 rounded-full bg-copper-primary/10 mb-4">
                        <Icon className="w-8 h-8 text-copper-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
                      <p className="text-sm text-gray-400">{layer.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-gray-950/50 border-copper-primary/30 p-6 inline-block">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Database className="w-4 h-4 text-copper-primary" />
                  <span>Recovery % {">"} Drawdown %</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-copper-primary">A 20% drawdown requires 25% to recover</span>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Institutional Performance</h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Our AI ecosystem delivers consistent, risk-adjusted returns through diversified
                  multi-strategy execution and sophisticated portfolio management.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-copper-primary flex-shrink-0" />
                    <span className="text-gray-300">Real-time position monitoring across all strategies</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-copper-primary flex-shrink-0" />
                    <span className="text-gray-300">Automated risk management with instant adjustments</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-copper-primary flex-shrink-0" />
                    <span className="text-gray-300">Transparent reporting with institutional-grade metrics</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-copper-primary flex-shrink-0" />
                    <span className="text-gray-300">24/7 market surveillance and opportunity detection</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-950/80 border-copper-primary/30 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Annualized Return</div>
                      <div className="text-4xl font-bold text-copper-primary font-mono">+42.7%</div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-copper-primary" />
                  </div>
                  <div className="text-xs text-gray-600">Past performance • Not guaranteed</div>
                </Card>

                <Card className="bg-gray-950/80 border-copper-primary/30 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Max Drawdown</div>
                      <div className="text-4xl font-bold text-copper-primary font-mono">-4.2%</div>
                    </div>
                    <Shield className="w-8 h-8 text-copper-primary" />
                  </div>
                  <div className="text-xs text-gray-600">Historical maximum • Risk-controlled</div>
                </Card>

                <Card className="bg-gray-950/80 border-copper-primary/30 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Win Rate (Blended)</div>
                      <div className="text-4xl font-bold text-copper-primary font-mono">67.3%</div>
                    </div>
                    <Target className="w-8 h-8 text-copper-primary" />
                  </div>
                  <div className="text-xs text-gray-600">Across all 10 bot strategies</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Access Institutional-Grade AI Trading
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join sophisticated investors who trust our AI ecosystem for consistent, risk-managed returns.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-copper hover:scale-105 transition-transform text-white font-semibold px-12 py-6 text-lg">
                    Apply for Access
                  </Button>
                </DialogTrigger>
              </Dialog>
              
              <Button size="lg" variant="outline" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-12 py-6 text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book Investor Call
              </Button>
            </div>

            <p className="text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
              Trading involves risk of loss. Past performance does not guarantee future results. We are not SEBI-registered
              investment advisors. All strategies subject to market risk.
            </p>
          </div>
        </div>
      </section>

      {/* Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-copper hover:scale-105 transition-transform text-white font-semibold shadow-2xl shadow-copper-primary/50 animate-pulse"
            >
              <Brain className="w-5 h-5 mr-2" />
              Join Waitlist
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
};

export default TradingBots;