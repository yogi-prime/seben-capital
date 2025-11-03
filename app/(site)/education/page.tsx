// app/courses/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";

// ---------- Per-page SEO (App Router) ----------
export const metadata: Metadata = {
  title: "Trading Courses in India | Utkarsh & Mentorship | Seben Capital",
  description:
    "Learn disciplined trading with Seben Capital. Utkarsh flagship trading course and 1:1 mentorship — structured curriculum, live sessions, risk management and ongoing support.",
  keywords: [
    "trading course",
    "stock market course",
    "mentorship trading",
    "risk management",
    "technical analysis",
    "beginner trading course",
    "trading education India",
    "Seben Capital Utkarsh",
  ],
  alternates: { canonical: "/courses" },
  openGraph: {
    type: "website",
    url: "/courses",
    title: "Trading Courses in India | Utkarsh & Mentorship | Seben Capital",
    description:
      "Structured trading education: Utkarsh course + Elite Mentorship. Learn risk-first execution, strategy, and psychology.",
    siteName: "Seben Capital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Courses | Seben Capital",
    description:
      "Learn disciplined trading with Utkarsh and 1:1 Mentorship at Seben Capital.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, maxSnippet: -1, maxImagePreview: "large", maxVideoPreview: -1 },
  },
};

type Course = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  sessions: string;
  students: string;
  rating: string;
  level: string;
  featured: boolean;
  description: string;
  curriculum: string[];
  features: string[];
};

const courses: Course[] = [
  {
    id: "utkarsh",
    title: "Utkarsh - Complete Trading Mastery",
    subtitle: "From Basics to Execution",
    price: "₹49,999",
    duration: "52 Weeks",
    sessions: "75+",
    students: "500+",
    rating: "4.9",
    level: "Beginner to Advanced",
    featured: true,
    description:
      "A comprehensive trading course that transforms beginners into confident traders through structured learning, live practice, and ongoing mentorship.",
    curriculum: [
      "Market Foundations & Microstructure",
      "Technical Analysis & Chart Patterns",
      "Risk Management & Position Sizing",
      "Strategy Development & Backtesting",
      "Trading Psychology & Discipline",
      "Live Market Application Labs",
    ],
    features: [
      "Live interactive sessions",
      "Recorded modules for revision",
      "Practical assignments",
      "Community access",
      "Mentor support",
      "Certificate completion",
    ],
  },
  {
    id: "mentorship",
    title: "Elite Mentorship Program",
    subtitle: "1:1 Personalized Guidance",
    price: "₹50,000",
    duration: "3 Months",
    sessions: "12",
    students: "100+",
    rating: "5.0",
    level: "Intermediate to Advanced",
    featured: false,
    description:
      "Personalized mentorship program for serious traders looking to accelerate their learning curve with direct guidance from experienced professionals.",
    curriculum: [
      "Personal trading assessment",
      "Customized strategy development",
      "Live trading supervision",
      "Portfolio optimization",
      "Advanced risk management",
      "Performance tracking & analysis",
    ],
    features: [
      "1:1 video sessions",
      "Personal WhatsApp support",
      "Portfolio review",
      "Custom strategy building",
      "Performance tracking",
      "Ongoing guidance",
    ],
  },
];

export default function CoursesPage() {
  // ---------- JSON-LD (Breadcrumb + Courses as ItemList) ----------
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://your-domain.com/" },
      { "@type": "ListItem", position: 2, name: "Courses", item: "https://your-domain.com/courses" },
    ],
  };

  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://your-domain.com/courses/${c.id}`,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.description,
        provider: {
          "@type": "Organization",
          name: "Seben Capital",
          url: "https://your-domain.com",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          location: { "@type": "VirtualLocation", url: `https://your-domain.com/courses/${c.id}` },
          offers: {
            "@type": "Offer",
            price: c.price.replace(/[^\d.]/g, ""),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `https://your-domain.com/courses/${c.id}`,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: c.rating,
          reviewCount: c.students.replace(/[^\d]/g, "") || "100",
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />

      <main id="main-content">
        {/* Hero Section */}
        <section aria-labelledby="courses-hero" className="py-24 bg-gradient-subtle">
          <div className="container">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                aria-label="Educational Excellence"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Educational Excellence
              </Badge>

              <h1 id="courses-hero" className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Master Trading with Our <span className="text-gradient-copper">Expert Courses</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive trading education designed to transform beginners into confident traders through structured
                learning, practical application, and ongoing support.
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section aria-labelledby="courses-list" className="py-24">
          <div className="container">
            <h2 id="courses-list" className="sr-only">
              Available trading courses
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className={`card-elevated hover-copper transition-all duration-300 hover:scale-[1.02] relative ${
                    course.featured ? "border-copper-primary/30" : ""
                  }`}
                >
                  {course.featured && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-copper text-primary-foreground" aria-label="Most Popular">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        className="border-copper-primary/30 text-copper-primary bg-copper-primary/5"
                        aria-label={`Difficulty: ${course.level}`}
                      >
                        {course.level}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm" aria-label={`Rating ${course.rating} out of 5`}>
                        <Star className="w-4 h-4 text-copper-primary fill-current" />
                        <span className="text-copper-primary font-semibold">{course.rating}</span>
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-heading text-copper-primary mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base mb-4">{course.subtitle}</CardDescription>

                    <p className="text-muted-foreground leading-relaxed mb-6">{course.description}</p>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" aria-label="Course statistics">
                      <div className="text-center p-3 bg-muted/20 rounded-lg">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-copper-primary" />
                        <div className="text-sm font-semibold">{course.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-lg">
                        <BookOpen className="w-5 h-5 mx-auto mb-1 text-copper-primary" />
                        <div className="text-sm font-semibold">{course.sessions}</div>
                        <div className="text-xs text-muted-foreground">Sessions</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-lg">
                        <Users className="w-5 h-5 mx-auto mb-1 text-copper-primary" />
                        <div className="text-sm font-semibold">{course.students}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-lg">
                        <div className="text-lg font-bold text-copper-primary">{course.price}</div>
                        <div className="text-xs text-muted-foreground">Investment</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Curriculum */}
                    <div className="mb-6" aria-labelledby={`${course.id}-learn`}>
                      <h3 id={`${course.id}-learn`} className="font-semibold mb-3 text-copper-primary">
                        What You'll Learn
                      </h3>
                      <div className="space-y-2">
                        {course.curriculum.map((item) => (
                          <div key={item} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6" aria-labelledby={`${course.id}-features`}>
                      <h3 id={`${course.id}-features`} className="font-semibold mb-3 text-copper-primary">
                        Course Features
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {course.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-copper-primary rounded-full flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs (as links for SEO; visual unchanged) */}
                    <div className="space-y-3">
                      <Button asChild className="w-full bg-gradient-copper hover:scale-105 transition-transform">
                        <Link href={`/education/${course.id}`} aria-label={`Enroll in ${course.title}`}>
                          Enroll Now - {course.price}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        >
                          <Link href={`/education/${course.id}#syllabus`} aria-label={`Download syllabus for ${course.title}`}>
                            Download Syllabus
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                        >
                          <Link href={`/courses/${course.id}#mentor`} aria-label={`Talk to mentor about ${course.title}`}>
                            Talk to Mentor
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section aria-labelledby="courses-cta" className="py-24 bg-background-secondary">
          <div className="container text-center">
            <h2 id="courses-cta" className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Start Your <span className="text-gradient-copper">Learning Journey?</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of successful traders and start building your expertise today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-copper hover:scale-105 transition-transform">
                <Link href="/courses/utkarsh" aria-label="Start with Utkarsh Course">
                  Start with Utkarsh Course
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
              >
                <Link href="/contact" aria-label="Book a free consultation">
                  Book Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Client sub-component (no SEO impact) */}
      <Chatbot />
    </div>
  );
}
