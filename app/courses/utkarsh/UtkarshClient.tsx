// app/courses/utkarsh/UtkarshClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BookOpen, Clock, Users, Award, Star, CheckCircle, PlayCircle,
  Download, MessageCircle, Target, BarChart3, Sparkles, Zap, ShieldCheck,
  ArrowRight, Check, X, Crown, Diamond
} from "lucide-react";

const brandGrad  = "bg-gradient-to-r from-copper-primary to-copper-secondary";
const brandText  = "bg-gradient-to-r from-copper-primary to-copper-secondary bg-clip-text text-transparent";
const brandDim   = "text-copper-primary";
const brandTint  = "bg-copper-primary/10";
const brandBorder= "border-copper-primary/40";
const darkCard   = "bg-zinc-900/60 backdrop-blur border border-zinc-800";

export default function UtkarshClient() {
  const [activeTab, setActiveTab] = useState("overview");

  const courseHighlights = [
    { icon: Clock, label: "Duration", value: "3 Months" },
    { icon: Users, label: "Live Sessions", value: "24+ Sessions" },
    { icon: Award, label: "Investment", value: "1 Year – ₹49,999" },
    { icon: Users, label: "Students", value: "500+" },
  ] as const;

  // Syllabus (from your spec)
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
        {
          title: "Survival Essentials",
          items: [
            "Understanding Global & Indian News (RBI, Budget, Results)",
            "Trading Objectives – Level 1 Wrap-Up",
            "Roadmap Rewards",
          ],
        },
        {
          title: "Market Deep Dive (Bridge Stage)",
          items: ["Advanced Market Knowledge", "Personal vs Institutional Approach", "Mindset Preparation"],
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
            "Trendlines & Structure",
            "Imbalances and 3-Point Turns",
            "ICT (Institutional Concepts) • SMC (Smart Money Concepts)",
            "Using DR/IDR for Support & Resistance",
            "Round Numbers (Basics, Setups, Options, Commodities)",
            "Forex & Currency Indices Bias",
            "Indian Market Bias – Nifty, Bank Nifty, USD/INR, Gold",
          ],
        },
        {
          title: "Entry & Strategy Development",
          items: [
            "Types of Entry Models (Conceptual vs Mechanical)",
            "Strategy Development Framework (Step-by-Step)",
            "Advanced Price Action Entry Triggers",
            "Options F&O: Entry Styles (Buy/Sell Setups)",
            "Intraday Scalping vs Swing Entry Plans",
            "Multi-Timeframe Confirmation Models",
            "Case Studies: Nifty/Bank Nifty Entry Triggers",
            "Strategy Showcase: 3 Line Strike, Fractal, DeLorean, etc.",
            "Consolidation: Create Your First Complete Strategy",
          ],
        },
        {
          title: "Risk & Reward Mastery",
          items: [
            "Introduction to Stop Losses",
            "Creative Stop Loss Models (ATR, Structure, Options Hedging)",
            "Profit-Taking Frameworks (Scalping vs Positional)",
            "F&O-Specific Risk/Reward Examples",
            "Level 2 Wrap-Up",
          ],
        },
        {
          title: "Strategy Lab",
          items: [
            "Keys to Building a Robust Trading Plan",
            "Preparing for Proprietary Trading & Indian Prop Desks",
            "Strategy Building Masterclass (Case Studies & 2024 Examples)",
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
            "Risk Management Plan (Position Sizing, Hedging, F&O Margins)",
            "Reward & Scaling Plan",
          ],
        },
        {
          title: "Backtesting & Refinement",
          items: [
            "Introduction to Backtesting & Practical Importance",
            "Tips, Guidance & Tools (TradingView, Python, Broker Data)",
            "Case Studies: Nifty/Bank Nifty Backtesting Examples",
          ],
        },
        { title: "Consolidation", items: ["Level 3 Wrap-Up"] },
      ],
    },
    {
      level: "Level 4 – Execution & Reflection",
      sections: [
        "Finalizing Your Edge (F&O, Forex, Equity, Commodities)",
        "Live Market Simulations – Time to Trade",
        "Reflection – Trade Review (Yes Trades & No Trades)",
        "Continuous Improvement Loop",
      ].map((t) => ({ title: t, items: [] })),
    },
  ] as const;

  const features = [
    "Live interactive sessions with experienced mentors",
    "24/7 community support and discussion forum",
    "Real-time market analysis and trade setups",
    "Personalized feedback on your trading performance",
    "Access to premium trading tools and calculators",
    "Lifetime access to course materials and updates",
    "Certificate of completion from Seben Capital",
    "Post-course mentorship and ongoing support",
  ] as const;

  const testimonials = [
    { name: "Rajesh Kumar", location: "Mumbai", rating: 5, text: "Utkarsh transformed my approach to trading. The structured curriculum and live sessions gave me the confidence to trade systematically." },
    { name: "Priya Sharma", location: "Delhi", rating: 5, text: "Best investment I made for my trading career. The risk management techniques alone are worth the entire course fee." },
    { name: "Amit Patel", location: "Ahmedabad", rating: 5, text: "The mentors are incredibly knowledgeable and patient. They make complex concepts easy to understand and implement." },
  ] as const;

  const valueRows = [
    { label: "Live Mentorship (24+ Sessions)", value: "₹39,000" },
    { label: "Premium Tools & Calculators", value: "₹12,000" },
    { label: "Community + Doubt Desk (1 Year)", value: "₹18,000" },
    { label: "Refresher Classes (Quarterly)", value: "₹9,999" },
    { label: "Funding Pathway Guidance", value: "₹14,999" },
  ] as const;

  return (
    <main className="min-h-screen bg-black text-zinc-100" aria-labelledby="utkarsh-hero-heading">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,113,84,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className={`uppercase tracking-[0.3em] text-xs md:text-sm ${brandText}`}>flagship program</p>
              <h1 id="utkarsh-hero-heading" className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
                <span className={brandText}>TRAIN. TRADE. GET FUNDED.</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-300 max-w-2xl">
                Structured training, live practice and a clear funding pathway. Learn, execute and scale with Seben Capital.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className={`${brandGrad} text-black font-semibold hover:opacity-90`}>
                  Join Utkarsh — 1 Year • ₹49,999
                </Button>
                <Button size="lg" variant="outline" className={`border-copper-primary/70 ${brandDim} hover:bg-copper-primary/10`}>
                  Talk to a Mentor
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {courseHighlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <div key={i} className={`rounded-xl px-4 py-3 ${darkCard}`}>
                      <div className="flex items-center gap-2">
                        <span className={`p-2 rounded-lg ${brandTint}`}><Icon className={`w-5 h-5 ${brandDim}`} /></span>
                        <p className="text-sm text-zinc-400">{h.label}</p>
                      </div>
                      <p className="mt-2 font-semibold">{h.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className={`rounded-2xl ${darkCard} ${brandBorder}`}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${brandTint} flex items-center justify-center`}>
                  <BookOpen className={`w-8 h-8 ${brandDim}`} />
                </div>
                <CardTitle className="text-2xl">Utkarsh</CardTitle>
                <CardDescription className="text-zinc-400">Complete Trading Mastery Program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-extrabold ${brandText}`}>1 Year – ₹49,999</div>
                  <Badge className={`mt-2 ${brandBorder} text-copper-primary bg-transparent`}>Most Popular</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* VALUE BREAKDOWN */}
      <section className="container mx-auto px-4 py-14" aria-labelledby="value-heading">
        <h2 id="value-heading" className="text-2xl md:text-3xl font-bold mb-6">What You Get</h2>
        <div className={`rounded-2xl overflow-hidden border ${brandBorder}`}>
          {valueRows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-4 sm:px-6 py-4 ${i % 2 ? "bg-zinc-900/40" : "bg-zinc-900/60"} border-b border-copper-primary/20 last:border-b-0`}
            >
              <span className="text-zinc-200">{row.label}</span>
              <span className={`font-semibold ${brandText}`}>{row.value}</span>
            </div>
          ))}
          <div className="px-4 sm:px-6 py-5 bg-zinc-950">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-zinc-300">
                Total Comparable Value <span className="text-zinc-500">(est.)</span>
              </div>
              <div className="text-right">
                <div className={`text-xl font-extrabold ${brandText}`}>₹93,998+</div>
                <div className={`text-sm font-bold ${brandText}`}>“Technically Free”</div>
                <div className="text-xs text-zinc-500">You pay ₹49,999 for 1 year; the rest you’d normally spend anyway.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container mx-auto px-4 py-14" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-2xl md:text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: "Train", text: "Live classes + playbooks + assessments." },
            { icon: ShieldCheck, title: "Practice", text: "Sim / micro-size trades with risk-first approach." },
            { icon: Zap, title: "Prove", text: "Consistency metrics & review with mentors." },
            { icon: Crown, title: "Get Funded", text: "Clear pathway to capital allocation." },
          ].map((s, i) => {
            const I = s.icon;
            return (
              <div key={i} className={`relative rounded-2xl p-6 ${darkCard}`}>
                <div className={`w-12 h-12 rounded-xl ${brandTint} flex items-center justify-center shadow-[0_0_30px_rgba(148,113,84,0.25)]`}>
                  <I className={`w-6 h-6 ${brandDim}`} />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEER PHILOSOPHY */}
      <section className="relative py-24 overflow-hidden" aria-labelledby="philosophy-heading">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,113,84,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative">
          <div className={`mx-auto w-24 h-24 rounded-full ${brandTint} flex items-center justify-center shadow-[0_0_60px_rgba(148,113,84,0.35)]`}>
            <Diamond className={`w-10 h-10 ${brandDim}`} />
          </div>
          <h2 id="philosophy-heading" className={`mt-6 text-3xl md:text-4xl font-extrabold ${brandText}`}>The Deer Philosophy</h2>
          <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
            Calm. Focused. Precise. We train traders to act with patience and strike with clarity—no noise, only edge.
          </p>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="container mx-auto px-4 py-14" aria-labelledby="compare-heading">
        <h2 id="compare-heading" className="text-2xl md:text-3xl font-bold mb-8">Utkarsh vs Others</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className={`rounded-2xl ${darkCard} ${brandBorder} shadow-[0_0_30px_rgba(148,113,84,0.15)]`}>
            <CardHeader>
              <CardTitle className={`${brandText}`}>Utkarsh</CardTitle>
              <CardDescription className="text-zinc-400">Built for execution and funding</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {[
                  "Live mentor-led sessions",
                  "Risk-first frameworks",
                  "Funding pathway & reviews",
                  "Community + accountability",
                  "Playbooks & tools included",
                  "1 Year access — ₹49,999",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-zinc-950 border border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-300">Typical Courses</CardTitle>
              <CardDescription className="text-zinc-500">Muted value. No pathway.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-zinc-400">
                {[
                  "Recorded-only content",
                  "No risk process",
                  "No funding path",
                  "Little/no community",
                  "Upsells for tools",
                  "Access limits & hidden fees",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-400 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TABS */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-10 bg-zinc-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="testimonials">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className={`text-2xl font-bold mb-6 ${brandText}`}>What You'll Learn</h3>
                  <div className="space-y-4">
                    {[
                      "Master the fundamentals of technical analysis and chart reading",
                      "Develop a systematic approach to risk management and position sizing",
                      "Learn options trading strategies for different market conditions",
                      "Build and manage a diversified trading portfolio",
                      "Understand market psychology and behavioral finance",
                      "Create your personal trading plan and strategy",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <p className="text-zinc-300">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className={`rounded-2xl ${darkCard} ${brandBorder}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className={`w-5 h-5 ${brandDim}`} />
                      Course Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-zinc-300">
                      <li>• Transform from beginner to systematic trader</li>
                      <li>• Develop risk-first trading mindset</li>
                      <li>• Build confidence through live practice</li>
                      <li>• Create sustainable trading strategies</li>
                      <li>• Join a community of successful traders</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="curriculum">
              <div className="space-y-10">
                <div className="text-center">
                  <h3 className={`text-3xl font-extrabold ${brandText}`}>Course Curriculum</h3>
                  <p className="text-lg text-zinc-400 max-w-2xl mx-auto mt-2">
                    Structured progression from foundations to live execution. Everything you need to build, test and scale a robust trading edge.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-6">
                  {syllabus.map((lvl, idx) => (
                    <AccordionItem key={lvl.level} value={`lvl-${idx}`} className="border-zinc-800 rounded-2xl overflow-hidden">
                      <AccordionTrigger className="px-5 py-4 bg-zinc-900/60 hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${brandTint}`}>
                            <BookOpen className={`w-4 h-4 ${brandDim}`} />
                          </span>
                          <span className="text-left font-semibold">{lvl.level}</span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="p-5 bg-black/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {lvl.sections.map((sec, i) => (
                            <Card key={i} className={`rounded-2xl ${darkCard}`}>
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base">{sec.title}</CardTitle>
                                  <Badge variant="outline" className={`${brandBorder} ${brandDim} bg-transparent`}>
                                    {sec.items.length > 0 ? `${sec.items.length} topics` : "Key Topic"}
                                  </Badge>
                                </div>
                              </CardHeader>
                              {sec.items.length > 0 && (
                                <CardContent className="pt-0">
                                  <ul className="space-y-2">
                                    {sec.items.map((it) => (
                                      <li key={it} className="flex items-start gap-2 text-zinc-300">
                                        <PlayCircle className={`w-4 h-4 ${brandDim} mt-0.5`} />
                                        <span>{it}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              )}
                            </Card>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div className={`h-full ${brandGrad}`} style={{ width: `${((idx + 1) / syllabus.length) * 100}%` }} />
                          </div>
                          <span className="text-xs text-zinc-400">
                            {idx + 1} / {syllabus.length} levels
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className={`text-sm ${brandDim}`}>Syllabus locked & loaded</div>
                    <div className="text-lg text-zinc-300">Download the full PDF or jump on a call to tailor your learning path.</div>
                  </div>
                  <div className="flex gap-3">
                    <Button size="lg" className={`${brandGrad} text-black font-semibold`}>
                      <Download className="w-4 h-4 mr-2" /> Download Syllabus
                    </Button>
                    <Button size="lg" variant="outline" className="border-copper-primary/70 text-copper-primary hover:bg-copper-primary/10">
                      <MessageCircle className="w-4 h-4 mr-2" /> Talk to Mentor
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className={`text-2xl font-bold mb-6 ${brandText}`}>Course Features</h3>
                  <div className="space-y-4">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <p className="text-zinc-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <Card className={`rounded-2xl ${darkCard}`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${brandDim}`}>
                        <BarChart3 className="w-5 h-5" />
                        Success Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between"><span className="text-zinc-400">Course Completion Rate</span><span className="font-semibold">92%</span></div>
                        <div className="flex justify-between"><span className="text-zinc-400">Student Satisfaction</span><span className="font-semibold">95%</span></div>
                        <div className="flex justify-between"><span className="text-zinc-400">Trading Consistency</span><span className="font-semibold">78%</span></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={`rounded-2xl ${darkCard}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className={`w-5 h-5 ${brandDim}`} />
                        Certification
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-300">
                        Receive a verified certificate of completion from Seben Capital, recognized in the trading community and valued by employers.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="testimonials">
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className={`text-3xl font-bold mb-3 ${brandText}`}>Student Success Stories</h3>
                  <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Hear from our graduates who have transformed their trading journey.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                    <Card key={t.name} className={`rounded-2xl ${darkCard}`}>
                      <CardHeader>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 fill-[currentColor] ${brandDim}`} />
                          ))}
                        </div>
                        <CardTitle className="text-lg">{t.name}</CardTitle>
                        <CardDescription className="text-zinc-400">{t.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-300 italic">"{t.text}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden" aria-labelledby="cta-heading">
        <div className={`${brandGrad} absolute inset-0 opacity-10`} />
        <div className="container mx-auto px-4 relative">
          <div className={`rounded-2xl p-8 md:p-12 bg-zinc-950/80 border ${brandBorder}`}>
            <h3 id="cta-heading" className={`text-3xl md:text-4xl font-extrabold ${brandText}`}>
              Ready to Transform Your Trading?
            </h3>
            <p className="mt-3 text-lg text-zinc-300 max-w-2xl">
              Join 500+ successful students. Limited seats for the next cohort.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className={`${brandGrad} text-black font-semibold`}>
                Enroll Now — 1 Year • ₹49,999 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-copper-primary/70 text-copper-primary hover:bg-copper-primary/10">
                <MessageCircle className="mr-2 w-4 h-4" />
                Talk to a Mentor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 px-4 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto text-center">
          <p className="text-sm text-zinc-400">
            <strong>Educational Disclaimer:</strong> This course is for educational purposes only. Trading involves risk of loss.
            Past performance results are not indicative of future returns. Please trade responsibly.
          </p>
        </div>
      </section>
    </main>
  );
}
