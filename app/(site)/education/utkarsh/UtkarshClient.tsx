// app/courses/utkarsh/UtkarshClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BookOpen, Clock, Users, Award, Star, CheckCircle, PlayCircle,
  Download, MessageCircle, Target, BarChart3, Sparkles, Zap, ShieldCheck,
  ArrowRight, Check, X, Crown, TrendingUp, DollarSign, Shield, Briefcase,
  Brain, FileText, Handshake, Settings, Trophy, ChevronRight, Video
} from "lucide-react";

const brandGrad = "bg-gradient-to-r from-copper-primary to-copper-secondary";
const brandText = "bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent";
const brandDim = "text-copper-primary";
const brandTint = "bg-copper-primary/10";
const brandBorder = "border-copper-primary/40";
const darkCard = "bg-zinc-900/60 backdrop-blur border border-zinc-800";

export default function UtkarshClient() {
  const courseHighlights = [
    { icon: Clock, label: "Duration", value: "1 Year" },
    { icon: Users, label: "Live Sessions", value: "24+ Sessions" },
    { icon: DollarSign, label: "Live Account", value: "$5,000" },
    { icon: Users, label: "Traders", value: "700+" },
  ] as const;

  // 5-Stage Deer Army Progression
  const deerStages = [
    {
      phase: "1. INITIATION",
      rank: "🦌 Novice Deer",
      goal: "Market basics, mindset, and risk control",
      color: "from-zinc-600 to-zinc-500"
    },
    {
      phase: "2. FORMATION",
      rank: "🦌 Tactical Deer",
      goal: "Build one rule-based trading edge",
      color: "from-blue-600 to-blue-500"
    },
    {
      phase: "3. COMBAT",
      rank: "🦌 Precision Deer",
      goal: "Execute live demo with targets",
      color: "from-purple-600 to-purple-500"
    },
    {
      phase: "4. MASTERY",
      rank: "🦌 Deer General",
      goal: "Transition to $5,000 live funded account",
      color: "from-amber-600 to-amber-500"
    },
    {
      phase: "5. LEGACY",
      rank: "👑 Deer Commander",
      goal: "Scale capital, earn, mentor others",
      color: "from-copper-primary to-copper-secondary"
    },
  ] as const;

  // Profit Sharing Structure
  const profitTiers = [
    { range: "First $100", split: "50/50", you: "$50", color: "bg-emerald-500/20 border-emerald-500/40" },
    { range: "Next $100", split: "60/40", you: "$60", color: "bg-blue-500/20 border-blue-500/40" },
    { range: "Next $100", split: "70/30", you: "$70", color: "bg-purple-500/20 border-purple-500/40" },
    { range: "Beyond $300", split: "80/20", you: "$80+", color: "bg-copper-primary/20 border-copper-primary/40" },
  ] as const;

  // Value Breakdown
  const valueRows = [
    { icon: Brain, label: "1-Year Mentorship", desc: "Direct access to mentor (worth ₹60,000/month included)", value: "₹60,000+" },
    { icon: FileText, label: "Blueprints (7 Trading Systems)", desc: "Complete SMC, PA, Momentum, Algo & Psychology playbooks", value: "₹1,00,000+" },
    { icon: DollarSign, label: "$5,000 Live Trading Account", desc: "Trade real markets after training with profit-sharing", value: "₹40,000+" },
    { icon: Settings, label: "Risk & Trade Tools", desc: "Calculators, journals, performance trackers", value: "₹15,000" },
    { icon: Handshake, label: "Community Access", desc: "Accountability, leaderboards, support", value: "₹10,000" },
    { icon: TrendingUp, label: "Post-Training Support", desc: "Reviews, upgrades, funding checkpoints", value: "₹20,000" },
  ] as const;

  // Utkarsh Edge Triangle
  const edgeTriangle = [
    { title: "Analytical Edge", desc: "Build your structure & setup mastery", icon: Target },
    { title: "Psychological Edge", desc: "Train emotional control & focus", icon: Brain },
    { title: "Execution Edge", desc: "Discipline, position sizing, timing", icon: Zap },
  ] as const;

  // Syllabus (preserved from original)
  const syllabus = [
    {
      level: "Level 1 – The Jungle Basics",
      sections: [
        {
          title: "Core Foundations",
          items: [
            "Trading Psychology",
            "Introduction to Forex & Indian Stock Market Basics",
            "Additional Market Knowledge (Forex + NSE/BSE)",
            "Breaking Down Candles (Nifty/Bank Nifty Examples)",
          ],
        },
        {
          title: "Market Ecosystem",
          items: [
            "Different Assets: Equities, Commodities, Currencies, Derivatives",
            "Trading Methods & Styles (Intraday, Swing, Positional)",
            "Indian Market Structure (NSE, BSE, MCX, SEBI)",
            "Broker Ecosystem – Indian & Global",
          ],
        },
        {
          title: "Tools & Platforms",
          items: [
            "Getting Started with MT4 & Indian Broker Platforms (Zerodha, Upstox, etc.)",
            "Risk Management Tools",
            "TradeLocker Tutorial",
          ],
        },
        {
          title: "Charting Mastery (TradingView)",
          items: [
            "TradingView Crash Course • Choosing Plans • Chart Settings",
            "Drawing Tools • Time Frames • Chart Types",
            "Searching Pairs & Indicators (Nifty, Bank Nifty, USD/INR)",
            "Alerts • Data Window • Object Tree • Layouts • Indicator Templates",
          ],
        },
      ],
    },
    {
      level: "Level 2 – The Strategy Core",
      sections: [
        {
          title: "Indicator Intelligence",
          items: ["Introduction to Indicators", "Utility Indicators", "Strategy Indicators"],
        },
        {
          title: "Building a Trading Bias",
          items: [
            "Price Action Core",
            "Fibonacci Explained (Nifty/Bank Nifty examples)",
            "Breakouts vs Retests",
            "ICT & SMC Concepts",
            "Round Numbers (Basics, Setups, Options, Commodities)",
          ],
        },
        {
          title: "Entry & Strategy Development",
          items: [
            "Types of Entry Models",
            "Strategy Development Framework",
            "Advanced Price Action Entry Triggers",
            "Create Your First Complete Strategy",
          ],
        },
      ],
    },
    {
      level: "Level 3 – Testing & Optimization",
      sections: [
        {
          title: "Trading Plan Design",
          items: [
            "End-to-End Trading Plan Creation",
            "Risk Management Plan (Position Sizing, Hedging)",
          ],
        },
        {
          title: "Backtesting & Refinement",
          items: [
            "Introduction to Backtesting",
            "Case Studies: Nifty/Bank Nifty Examples",
          ],
        },
      ],
    },
    {
      level: "Level 4 – Execution & Reflection",
      sections: [
        { title: "Finalizing Your Edge", items: [] },
        { title: "Live Market Simulations", items: [] },
        { title: "Trade Review & Reflection", items: [] },
      ],
    },
  ] as const;

  const testimonials = [
    { name: "Rajesh Kumar", location: "Mumbai", quote: "I earned back my fees in my first funded month." },
    { name: "Priya Sharma", location: "Delhi", quote: "Mentorship changed how I look at losses." },
    { name: "Amit Patel", location: "Ahmedabad", quote: "Utkarsh gave me direction — not noise." },
  ] as const;

  return (
    <main className="min-h-screen bg-black text-zinc-100" aria-labelledby="utkarsh-hero-heading">
      {/* HERO WITH VIDEO CONCEPT */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,113,84,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 lg:py-28 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Video Concept Placeholder */}
            <div className={`mb-8 mx-auto w-32 h-32 rounded-full ${brandTint} flex items-center justify-center shadow-[0_0_80px_rgba(148,113,84,0.4)]`}>
              <span className="text-6xl">🦌</span>
            </div>

            <p className={`uppercase tracking-[0.3em] text-xs md:text-sm ${brandText}`}>
              The Market is a Jungle
            </p>
            <h1 id="utkarsh-hero-heading" className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
              Train. Transform. Trade Live.<br />
              <span className={brandText}>Get $5,000 Funded Capital</span>
            </h1>
            <p className="mt-6 text-xl text-zinc-300 max-w-3xl mx-auto">
              1 Year of Mentorship + Blueprints + Funded Account → <span className={`font-bold ${brandText}`}>₹49,999</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={`${brandGrad} text-black font-semibold text-lg px-8 py-6 hover:opacity-90`}>
                🎯 Join the Deer Army
              </Button>
              <Button size="lg" variant="outline" className={`border-copper-primary/70 ${brandDim} hover:bg-copper-primary/10 px-8 py-6`}>
                💬 Talk to a Mentor
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>700+ Traders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>1-Year Mentorship</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>$5,000 Live Funding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SHOWCASE SECTION */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="video-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="video-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              See What Utkarsh Is All About
            </h2>
            <p className="mt-3 text-lg text-zinc-400">
              Watch how we transform traders from novices to funded professionals
            </p>
          </div>

          <Card className={`rounded-2xl ${darkCard} ${brandBorder} overflow-hidden`}>
            <CardContent className="p-0">
              {/* Video Placeholder - Replace with actual video embed */}
              <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
                <div className={`w-20 h-20 rounded-full ${brandTint} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_60px_rgba(148,113,84,0.4)]`}>
                  <Video className={`w-10 h-10 ${brandDim}`} />
                </div>
                {/* 
                  Replace above placeholder with actual video:
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="Utkarsh Program Introduction"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                */}
              </div>
            </CardContent>
          </Card>

          {/* Video Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Video Views", value: "50K+" },
              { label: "Success Stories", value: "500+" },
              { label: "Avg. Rating", value: "4.9/5" },
              { label: "Completion Rate", value: "92%" },
            ].map((stat, i) => (
              <Card key={i} className={`rounded-xl ${darkCard} text-center`}>
                <CardContent className="p-4">
                  <div className={`text-2xl font-bold ${brandText}`}>{stat.value}</div>
                  <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY UTKARSH - MORE THAN A COURSE */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="why-heading">
        <div className="text-center mb-12">
          <h2 id="why-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
            WHY UTKARSH — More Than a Course
          </h2>
          <p className="mt-3 text-lg text-zinc-400 max-w-3xl mx-auto">
            Forget "learn and hope." We train, test, and fund you to trade for real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "Training", desc: "1-Year Live Mentorship with 24+ Deep-Dive Sessions" },
            { icon: Target, title: "System", desc: "Proven Blueprints + Risk & Trade Management Tools" },
            { icon: DollarSign, title: "Funding", desc: "$5,000 Live Account with Profit Sharing" },
            { icon: Handshake, title: "Support", desc: "Deer Army Community + Weekly Evaluations" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} className={`rounded-2xl ${darkCard} hover:border-copper-primary/60 transition-all`}>
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${brandTint} flex items-center justify-center mb-3`}>
                    <Icon className={`w-7 h-7 ${brandDim}`} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* THE DEER ARMY - 5 STAGES */}
      <section className="relative py-20 overflow-hidden" aria-labelledby="stages-heading">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,113,84,0.08),transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 id="stages-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              THE UTKARSH BLUEPRINT
            </h2>
            <p className="mt-3 text-xl text-zinc-400">5 Stages of the Deer Army</p>
            <p className={`mt-4 italic text-lg ${brandDim}`}>
              "The Jungle doesn't reward luck — it rewards preparation."
            </p>
          </div>

          <div className="grid gap-6 max-w-5xl mx-auto">
            {deerStages.map((stage, idx) => (
              <Card key={idx} className={`rounded-2xl ${darkCard} border-l-4 hover:scale-[1.02] transition-transform`} style={{ borderLeftColor: `rgba(148,113,84,${0.3 + idx * 0.15})` }}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg bg-gradient-to-r ${stage.color} text-white text-sm font-bold`}>
                          Stage {idx + 1}
                        </span>
                        <span>{stage.phase}</span>
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">{stage.goal}</CardDescription>
                    </div>
                    <Badge className={`${brandBorder} text-copper-primary bg-transparent text-lg px-4 py-2`}>
                      {stage.rank}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDING STRUCTURE */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="funding-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="funding-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              💰 FUNDING STRUCTURE — Earn Back Your Fee
            </h2>
            <p className="mt-4 text-lg text-zinc-300 max-w-2xl mx-auto">
              Every Utkarsh trader gets a <span className="font-bold text-emerald-400">$5,000 live account</span> after completion.
              You can lose up to $500 — that's your safety net and fee refund opportunity.
            </p>
          </div>

          <Card className={`rounded-2xl ${darkCard} ${brandBorder}`}>
            <CardHeader>
              <CardTitle className="text-2xl">🎯 Profit Sharing Structure</CardTitle>
              <CardDescription className="text-zinc-400">
                No time restriction. Trade your pace, your edge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profitTiers.map((tier, i) => (
                  <div key={i} className={`rounded-xl border p-5 ${tier.color}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <div className="font-semibold text-lg">{tier.range}</div>
                        <div className="text-sm text-zinc-400">Split: {tier.split}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${brandText}`}>You keep {tier.you}</div>
                        {i === profitTiers.length - 1 && (
                          <div className="text-xs text-zinc-400">Lifetime till breach</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/40">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-rose-400 mt-0.5" />
                  <div>
                    <div className="font-semibold text-rose-300">Loss Limit</div>
                    <div className="text-sm text-zinc-400 mt-1">
                      $500 loss = account deactivated (can reapply after review)
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-6 p-5 rounded-xl ${brandTint} border ${brandBorder}`}>
                <div className="flex items-start gap-3">
                  <Trophy className={`w-6 h-6 ${brandDim} mt-0.5`} />
                  <div>
                    <div className={`font-bold text-lg ${brandText}`}>Meaning</div>
                    <div className="text-zinc-300 mt-1">
                      Your ₹49,999 fee isn't just spent — it's <span className="font-semibold">working capital</span> you get to earn back through real trading.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* VALUE BREAKDOWN */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="value-heading">
        <div className="text-center mb-12">
          <h2 id="value-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
            💼 What You Get in ₹49,999
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4">
            {valueRows.map((row, i) => {
              const Icon = row.icon;
              return (
                <Card key={i} className={`rounded-2xl ${darkCard} hover:border-copper-primary/60 transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl ${brandTint} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${brandDim}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg">{row.label}</div>
                        <div className="text-sm text-zinc-400 mt-1">{row.desc}</div>
                      </div>
                      <div className={`text-2xl font-extrabold ${brandText}`}>{row.value}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className={`mt-8 rounded-2xl p-8 ${brandGrad} text-black`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm font-semibold opacity-80">🔥 Total Value</div>
                <div className="text-4xl font-extrabold">₹2,45,000+</div>
              </div>
              <ArrowRight className="w-8 h-8 hidden md:block" />
              <div className="text-right">
                <div className="text-sm font-semibold opacity-80">💎 Your Investment</div>
                <div className="text-4xl font-extrabold">₹49,999</div>
                <div className="text-sm font-medium mt-1">(One-Time)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENTORSHIP STRUCTURE */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="mentorship-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="mentorship-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              🧠 MENTORSHIP STRUCTURE
            </h2>
            <p className="mt-3 text-xl text-zinc-400">You'll be guided like a soldier, not a student.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "12-Month Mentorship with direct mentor access",
              "Monthly 1:1 performance review",
              "Trading psychology & mental reset sessions",
              "Personalized strategy development",
              "Access to The Deer Room (exclusive trading chat)",
              "24/7 Support via Private Channel",
            ].map((feature, i) => (
              <Card key={i} className={`rounded-2xl ${darkCard}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-zinc-300">{feature}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* THE UTKARSH EDGE TRIANGLE */}
      <section className="relative py-20 overflow-hidden" aria-labelledby="edge-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(148,113,84,0.08),transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 id="edge-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              ⚡ THE UTKARSH EDGE TRIANGLE
            </h2>
            <p className={`mt-4 text-xl italic ${brandDim}`}>
              "When all three edges align — you're unstoppable."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {edgeTriangle.map((edge, i) => {
              const Icon = edge.icon;
              return (
                <Card key={i} className={`rounded-2xl ${darkCard} ${brandBorder} text-center hover:scale-105 transition-transform`}>
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto rounded-full ${brandTint} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${brandDim}`} />
                    </div>
                    <CardTitle className="text-xl">{edge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400">{edge.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="testimonials-heading">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
            🏅 WHY TRADERS LOVE UTKARSH
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <Card key={i} className={`rounded-2xl ${darkCard}`}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-4 h-4 fill-[currentColor] ${brandDim}`} />
                  ))}
                </div>
                <CardTitle className="text-lg">{t.name}</CardTitle>
                <CardDescription className="text-zinc-400">{t.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 italic text-lg">"{t.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CURRICULUM - NEW DESIGN */}
      <section className="py-20 px-4 bg-zinc-950/50" aria-labelledby="curriculum-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="curriculum-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              Complete Course Curriculum
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mt-3">
              Structured progression from foundations to live execution. Everything you need to build, test and scale a robust trading edge.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {syllabus.map((lvl, idx) => (
              <Card key={idx} className={`rounded-2xl ${darkCard} ${brandBorder} overflow-hidden hover:border-copper-primary/70 transition-all`}>
                <CardHeader className={`bg-gradient-to-r ${deerStages[idx]?.color || 'from-zinc-800 to-zinc-700'} text-white`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{lvl.level}</CardTitle>
                        <CardDescription className="text-white/80 mt-1">
                          {deerStages[idx]?.goal || "Master the fundamentals"}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 text-base px-4 py-2">
                      {lvl.sections.reduce((acc, sec) => acc + sec.items.length, 0)}+ Topics
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {lvl.sections.map((sec, i) => (
                      <div key={i} className={`rounded-xl p-5 bg-zinc-900/40 border border-zinc-800`}>
                        <div className="flex items-start gap-3 mb-4">
                          <Target className={`w-5 h-5 ${brandDim} mt-0.5 flex-shrink-0`} />
                          <div>
                            <h4 className="font-bold text-lg">{sec.title}</h4>
                            {sec.items.length > 0 && (
                              <p className="text-xs text-zinc-500 mt-1">{sec.items.length} modules</p>
                            )}
                          </div>
                        </div>
                        
                        {sec.items.length > 0 && (
                          <ul className="space-y-2.5">
                            {sec.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                                <PlayCircle className={`w-4 h-4 ${brandDim} mt-0.5 flex-shrink-0`} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${deerStages[idx]?.color || 'from-zinc-600 to-zinc-500'}`} 
                        style={{ width: `${((idx + 1) / syllabus.length) * 100}%` }} 
                      />
                    </div>
                    <span className="text-xs text-zinc-400 whitespace-nowrap">
                      Level {idx + 1} of {syllabus.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Download CTA */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card className={`rounded-2xl ${darkCard} ${brandBorder}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${brandTint} flex items-center justify-center flex-shrink-0`}>
                      <Download className={`w-7 h-7 ${brandDim}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Download Complete Syllabus</h3>
                      <p className="text-zinc-400 mt-1">Get the detailed PDF breakdown of all 4 levels</p>
                    </div>
                  </div>
                  <Button size="lg" className={`${brandGrad} text-black font-semibold whitespace-nowrap`}>
                    <Download className="w-4 h-4 mr-2" /> Get PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EVERYTHING INCLUDED */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="features-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="features-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              Everything You Get
            </h2>
            <p className="text-lg text-zinc-400 mt-3">
              Complete package with no hidden costs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Users, title: "Live Interactive Sessions", desc: "24+ mentor-led deep-dive sessions with Q&A" },
              { icon: MessageCircle, title: "The Deer Room Access", desc: "24/7 community support and exclusive trading chat" },
              { icon: BarChart3, title: "Real-Time Analysis", desc: "Daily market analysis and live trade setups" },
              { icon: Target, title: "1:1 Performance Reviews", desc: "Personalized feedback on your trading performance" },
              { icon: Settings, title: "Premium Tools Suite", desc: "Access to calculators, journals, and trackers" },
              { icon: FileText, title: "7 Trading Blueprints", desc: "Complete system playbooks (SMC, PA, Momentum, Algo)" },
              { icon: Handshake, title: "Post-Course Mentorship", desc: "Ongoing support even after program completion" },
              { icon: DollarSign, title: "$5,000 Funded Account", desc: "Live trading capital with profit sharing (50-80%)" },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className={`rounded-2xl ${darkCard} hover:border-copper-primary/60 transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${brandTint} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${brandDim}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                        <p className="text-zinc-400 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container mx-auto px-4 py-20" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-zinc-400 mt-3">
              Everything you need to know about Utkarsh
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "When do I get the $5,000 funded account?",
                a: "After completing the 4-level training program and passing the evaluation criteria. Most students reach this stage within 3-6 months of dedicated learning and practice."
              },
              {
                q: "What happens if I lose money in the funded account?",
                a: "You have a $500 loss limit as your safety net. If this limit is reached, the account is deactivated, but you can reapply after a comprehensive review session with your mentor to identify and fix issues."
              },
              {
                q: "Is there a time limit on the funded account?",
                a: "No time restrictions whatsoever. Trade at your own pace following your strategy. We believe in quality over speed—focus on consistency, not rushing."
              },
              {
                q: "Can I really earn back my ₹49,999 fee?",
                a: "Absolutely. Through our profit sharing structure (50-80% depending on performance tier), many disciplined traders recover their investment within their first few months of funded trading and continue earning thereafter."
              },
              {
                q: "What if I'm a complete beginner with no trading experience?",
                a: "Perfect! Utkarsh is designed for all levels. We start from absolute basics in Level 1 (The Jungle Basics) and systematically build you up through all 5 stages. No prior experience required."
              },
              {
                q: "How much time do I need to commit per week?",
                a: "We recommend 8-12 hours per week—including live sessions, self-study, and practice. The program is flexible and designed for working professionals who want to transition to trading."
              },
              {
                q: "What's the difference between Utkarsh and other trading courses?",
                a: "Unlike typical courses, Utkarsh provides: (1) Live funded capital ($5,000), (2) Real profit sharing (not paper trading), (3) Military-style structured progression, (4) 1-year full mentorship access, and (5) Post-training support."
              },
              {
                q: "Do I need to pay anything beyond the ₹49,999 fee?",
                a: "No hidden costs. The ₹49,999 one-time payment covers everything: 1-year mentorship, all tools, community access, blueprints, and your funded account. No monthly subscriptions or surprise fees."
              },
              {
                q: "What markets can I trade with the funded account?",
                a: "You can trade Forex, Indian equities (Nifty/Bank Nifty), commodities, and indices based on your strategy and the systems you develop during training."
              },
              {
                q: "Is there a refund policy?",
                a: "We offer a 14-day review period. If you attend the first two sessions and feel Utkarsh isn't right for you, we provide a full refund—no questions asked."
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className={`border-zinc-800 rounded-2xl overflow-hidden ${darkCard}`}>
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <div className="flex items-start gap-3 pr-4">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${brandTint} flex-shrink-0 mt-0.5`}>
                      <span className={`text-xs font-bold ${brandDim}`}>{i + 1}</span>
                    </span>
                    <span className="font-semibold text-lg">{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0">
                  <div className="pl-9">
                    <p className="text-zinc-300 leading-relaxed">{item.a}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions CTA */}
          <Card className={`rounded-2xl ${darkCard} ${brandBorder} mt-10`}>
            <CardContent className="p-8 text-center">
              <MessageCircle className={`w-12 h-12 ${brandDim} mx-auto mb-4`} />
              <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-zinc-400 mb-6">Talk directly with our mentors to get all your doubts cleared</p>
              <Button size="lg" className={`${brandGrad} text-black font-semibold`}>
                💬 Schedule a Call
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 overflow-hidden" aria-labelledby="cta-heading">
        <div className={`${brandGrad} absolute inset-0 opacity-10`} />
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-4xl mx-auto rounded-2xl p-8 md:p-12 bg-zinc-950/90 border ${brandBorder} text-center`}>
            <div className="text-6xl mb-6">🦌</div>
            <h3 id="cta-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              ₹49,999 — One Plan. One Mission.
            </h3>
            <p className="mt-4 text-xl text-zinc-300">
              Mentorship • Blueprints • Live Account • Funding Path
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={`${brandGrad} text-black font-bold text-lg px-10 py-7`}>
                🎯 Join the Deer Army <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-copper-primary/70 text-copper-primary hover:bg-copper-primary/10 px-10 py-7">
                💬 Talk to a Mentor
              </Button>
            </div>
            <p className="mt-6 text-sm text-zinc-400">
              Limited Live Funding Slots per Month | Next Batch Starts Soon
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER TAGLINE */}
      <section className="py-12 px-4 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto text-center">
          <p className={`text-2xl font-bold ${brandText} mb-2`}>
            Forget Bulls and Bears — Become the Mighty Deer. 🦌
          </p>
          <p className="text-zinc-400">
            Utkarsh — Take Charge of Your Life.
          </p>
          <p className="text-sm text-zinc-500 mt-4">
            Powered by Seben Capital
          </p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 px-4 bg-black border-t border-zinc-900">
        <div className="container mx-auto text-center">
          <p className="text-xs text-zinc-500">
            <strong>Educational & Risk Disclaimer:</strong> This course is for educational purposes only. Trading involves substantial risk of loss.
            Past performance results are not indicative of future returns. The $5,000 funded account is subject to terms, conditions, and performance criteria.
            Please trade responsibly and only risk capital you can afford to lose.
          </p>
        </div>
      </section>
    </main>
  );
}