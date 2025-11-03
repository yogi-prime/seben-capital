'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Chatbot from '@/components/Chatbot'
import Services from '@/components/Services'
import BlogSection from '@/components/BlogSection'
import RotatingMarketMini from '@/components/RotatingMarketMini'
import PerformancePhilosophy from '@/components/PerformancePhilosophy'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TrendingUp,
  Users,
  Clock,
  Star,
  BookOpen,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'


type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  read_time?: string | null;
  word_count?: number | null;
  is_featured?: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  published_at?: string | null;
  author_name?: string | null;
  primaryCategory?: { name: string; slug: string } | null;
  categories?: { name: string; slug: string }[];
};

interface HomeClientProps {
  posts: Post[];
}


export default function HomeClient({ posts }: HomeClientProps) {
  const [marketData, setMarketData] = useState({
    value: '+2.4%',
    trend: 'up' as 'up' | 'down',
  })

  const [currentStat, setCurrentStat] = useState(0)
  const stats = [
    { label: 'Students Trained', value: '500+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
    { label: 'Support', value: '24/7', icon: Clock },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  const pillars = [
    {
      title: 'Trading',
      icon: TrendingUp,
      description:
        'Master the art of disciplined trading with proven strategies, risk management, and real-time market analysis.',
      features: ['Technical Analysis', 'Risk Management', 'Position Sizing', 'Market Psychology'],
      cta: 'Explore Services',
      href: '/services',
    },
    {
      title: 'Education',
      icon: BookOpen,
      description:
        'Comprehensive curriculum designed to transform beginners into confident traders through structured learning.',
      features: ['Live Sessions', 'Recorded Modules', 'Assignments', 'Community Access'],
      cta: 'View Courses',
      href: '/education',
    },
    {
      title: 'Mentorship',
      icon: Users,
      description:
        'Personalized guidance from experienced traders who have successfully navigated volatile markets.',
      features: ['1:1 Sessions', 'Portfolio Review', 'Strategy Development', 'Ongoing Support'],
      cta: 'Get Mentored',
      href: '/education/mentorship',
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        itemScope
        itemType="https://schema.org/CreativeWork"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/hero1.jpeg"
            alt="Trading education and mentorship by Seben Capital"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container relative z-10">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <Badge
              variant="outline"
              className="border-copper-primary/30 text-copper-primary bg-copper-primary/5 px-4 py-2"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              SEBI Awareness • Risk-First Approach
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                Trade Smarter. <span className="text-gradient-copper">Grow Steadier.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed" itemProp="description">
                We blend education, research, and disciplined execution to help you navigate markets with confidence.
                Master risk management while building sustainable trading strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-copper hover:scale-105 transition-transform px-8 py-3 text-lg font-semibold"
                  asChild
                >
                  <Link href="/courses/utkarsh" aria-label="Explore Utkarsh course">
                    Explore Utkarsh
                  </Link>
                </Button>

                <a href="https://wa.me/919737965552" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:!text-primary-foreground px-8 py-3 text-lg"
                  >
                    Talk to Us
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`text-center transition-all duration-500 ${
                      index === currentStat ? 'scale-105 text-copper-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-bold text-2xl">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative flex justify-center">
              <div className="card-elevated p-6 max-w-sm w-full animate-fade-in">
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
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 bg-background-secondary" itemScope itemType="https://schema.org/ItemList">
        <meta itemProp="name" content="Three Pillars" />
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Our <span className="text-gradient-copper">Three Pillars</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive approach to trading success built on education, practical application, and ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="group card-elevated hover-copper transition-all duration-300 hover:scale-105"
                itemScope
                itemType="https://schema.org/Service"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center group-hover:animate-pulse-copper">
                    <pillar.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-heading text-copper-primary mb-2" itemProp="name">
                    {pillar.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed" itemProp="description">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {pillar.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-copper-primary rounded-full mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground transition-all duration-300"
                    asChild
                  >
                    <Link href={pillar.href} aria-label={pillar.cta}>
                      {pillar.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Course Spotlight */}
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Flagship Course
                </Badge>

                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                  Master Trading with <span className="text-gradient-copper">Utkarsh</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  A complete path from basics to execution. Our flagship program transforms beginners into confident traders through structured learning, live practice, and ongoing mentorship.
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-copper-primary">Course Curriculum</h3>
                  {[
                    'Market Foundations & Microstructure',
                    'Technical Analysis & Chart Patterns',
                    'Risk Management & Position Sizing',
                    'Strategy Development & Backtesting',
                    'Trading Psychology & Discipline',
                    'Live Market Application Labs',
                  ].map((module) => (
                    <div key={module} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{module}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-copper hover:scale-105 transition-transform" size="lg" asChild>
                    <Link href="/education/utkarsh">Enroll Now</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                  >
                    Download Syllabus
                  </Button>
                </div>
              </div>

              {/* Right Card */}
              <div className="relative">
                <Card className="card-elevated shadow-copper">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-copper rounded-2xl flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-heading text-copper-primary">Utkarsh</CardTitle>
                    <CardDescription className="text-base">Complete Trading Mastery</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { icon: Clock, label: '12 Weeks', detail: 'Duration' },
                        { icon: Users, label: 'Live + Recorded', detail: 'Sessions' },
                        { icon: TrendingUp, label: '₹49,999', detail: 'Fees' },
                        { icon: Star, label: '500+', detail: 'Students Successfully Trained' },
                      ].map((highlight) => (
                        <div key={highlight.label} className="text-center p-4 bg-muted/20 rounded-lg">
                          <highlight.icon className="w-6 h-6 mx-auto mb-2 text-copper-primary" />
                          <div className="font-bold text-lg text-copper-primary">{highlight.label}</div>
                          <div className="text-sm text-muted-foreground">{highlight.detail}</div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-copper-primary mb-2">₹49,999</div>
                      <div className="text-sm text-muted-foreground">Fees</div>
                    </div>
                  </CardContent>
                </Card>

                <div className="absolute -top-4 -right-4 bg-gradient-copper text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-copper">
                  Most Popular
                </div>
              </div>
            </div>
          </div>
        </section>
      {/* (rest of your sections unchanged; same as before) */}

      <Services />
      <PerformancePhilosophy />
      <BlogSection posts={posts} />
 {/* Offices & Maps */}
        <section className="py-24 bg-background-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Our <span className="text-gradient-copper">Offices</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Visit us at our India or Dubai office. Tap “Get Directions” for turn-by-turn navigation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Dubai */}
              <Card className="card-elevated border-copper-primary/20 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-copper-primary">
                    <MapPin className="w-5 h-5" />
                    Dubai Office
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <p>1209, 12th Floor, IT Plaza</p>
                    <p>Dubai Silicon Oasis</p>
                    <p>Dubai, UAE</p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-copper-primary/20">
                    <iframe
                      title="Seben Capital - Dubai"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=IT%20Plaza%2C%20Dubai%20Silicon%20Oasis%2C%20Dubai&output=embed"
                    />
                  </div>
                  <div className="flex gap-3">
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-copper text-primary-foreground"
                      href="https://www.google.com/maps/dir/?api=1&destination=IT+Plaza,+Dubai+Silicon+Oasis,+Dubai"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Directions <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                      href="mailto:hello@sebencapital.com"
                    >
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* India */}
              <Card className="card-elevated border-copper-primary/20 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-copper-primary">
                    <MapPin className="w-5 h-5" />
                    India Office
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <p>2nd Floor, Shakti Dhara Complex, above Real Paprika,</p>
                    <p>Opp. Kakadiya Hospital, Shaktidhara Society,</p>
                    <p>Bapunagar, Ahmedabad, Gujarat 382350</p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-copper-primary/20">
                    <iframe
                      title="Seben Capital - Ahmedabad"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=2nd%20Floor%2C%20Shakti%20Dhara%20Complex%2C%20above%20Real%20Paprika%2C%20opp.%20kakadiya%20hospital%2C%20Shaktidhara%20Society%2C%20Bapunagar%2C%20Ahmedabad%2C%20Gujarat%20382350&output=embed"
                    />
                  </div>
                  <div className="flex gap-3">
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-copper text-primary-foreground"
                      href="https://www.google.com/maps/dir/?api=1&destination=2nd+Floor,+Shakti+Dhara+Complex,+above+Real+Paprika,+opp.+kakadiya+hospital,+Shaktidhara+Society,+Bapunagar,+Ahmedabad,+Gujarat+382350"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Directions <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                      href="tel:+919737965552"
                    >
                      <Phone className="w-4 h-4" /> +91 97379 65552
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
 {/* CTA Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container">
            <Card className="card-elevated bg-gradient-subtle border-copper-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-copper opacity-5" />
              <CardContent className="relative z-10 py-16 px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                  Ready to Begin Your <span className="text-gradient-copper">Trading Journey?</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join hundreds of successful traders who have transformed their approach to the markets through our structured education and mentorship programs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-copper hover:scale-105 transition-transform px-8 py-3 text-lg font-semibold"
                    asChild
                  >
                    <Link href="/education/utkarsh">
                      join Utkarsh Course <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8 py-3 text-lg"
                  >
                    <a href="tel:+919737965552" aria-label="Call +91 97379 65552">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Schedule a Call
                    </a>
                  </Button>
                </div>

                <div className="inline-flex items-center justify-center p-3 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Risk Disclosure:</strong> Markets carry inherent risks. Past performance does not guarantee future results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      <Chatbot />
    </main>
  )
}
