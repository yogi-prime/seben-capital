// app/calculator/risk-reward/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import RiskRewardClient from "./RiskRewardClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebencapital.com"),
  title: "Risk/Reward & Expectancy Calculator – Win Rate, R:R, Breakeven",
  description:
    "Free Risk–Reward & Expectancy Calculator. Enter win rate, average win/loss, and trades per month to see expectancy, breakeven win rate, and monthly expectancy.",
  alternates: { canonical: "https://sebencapital.com/calculator/risk-reward" },
  openGraph: {
    type: "website",
    url: "https://sebencapital.com/calculator/risk-reward",
    siteName: "Seben Capital",
    title: "Risk/Reward & Expectancy Calculator",
    description:
      "Analyze trading profitability with win rate and risk-reward (R multiples or currency).",
    images: [{ url: "/og/risk-reward.jpg", width: 1200, height: 630, alt: "Risk/Reward & Expectancy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Risk/Reward & Expectancy Calculator",
    description:
      "Compute expectancy/ trade, monthly expectancy and breakeven win rate.",
    images: ["/og/risk-reward.jpg"],
  },
  keywords: [
    "risk reward calculator",
    "expectancy calculator",
    "trading win rate",
    "breakeven win rate",
    "R multiple calculator",
    "strategy profitability",
  ],
};

// ---- JSON-LD (Breadcrumb + SoftwareApplication + FAQ) ----
function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: "https://sebencapital.com/tools" },
      { "@type": "ListItem", position: 2, name: "Risk/Reward & Expectancy Calculator", item: "https://sebencapital.com/calculator/risk-reward" },
    ],
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Risk/Reward & Expectancy Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://sebencapital.com/calculator/risk-reward",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Web calculator to analyze strategy profitability using win rate and risk-reward. Supports R multiples and currency mode.",
    publisher: { "@type": "Organization", name: "Seben Capital", url: "https://sebencapital.com" },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is trading expectancy?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Expectancy estimates average outcome per trade: (Win Rate × Average Win) − (Loss Rate × Average Loss). Positive expectancy implies an edge.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find the breakeven win rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Breakeven Win Rate = Average Loss ÷ (Average Win + Average Loss). At this win rate, expectancy is zero.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use R multiples or currency?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Use R multiples to compare systems independent of instrument price; use currency to see absolute rupee results.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Visible breadcrumb matching JSON-LD */}
      <nav aria-label="Breadcrumb" className="container max-w-6xl pt-8">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/tools" className="text-muted-foreground hover:text-copper-primary">Tools</Link></li>
          <li aria-hidden className="text-muted-foreground">/</li>
          <li className="text-copper-primary">Risk/Reward &amp; Expectancy</li>
        </ol>
      </nav>

      {/* Client app (UI + logic) */}
      <RiskRewardClient />

      {/* Internal links to strengthen topical authority */}
      <section className="container max-w-6xl mt-12">
        <h2 className="text-xl font-semibold mb-4">More Strategy & Risk Tools</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground grid md:grid-cols-2 gap-2">
          <li><Link href="/calculator/position-size" className="hover:text-copper-primary">Position Size Calculator</Link></li>
          <li><Link href="/calculator/drawdown-recovery" className="hover:text-copper-primary">Drawdown &amp; Recovery</Link></li>
          <li><Link href="/calculators/cagr" className="hover:text-copper-primary">CAGR Calculator</Link></li>
          <li><Link href="/calculators/xirr" className="hover:text-copper-primary">XIRR Calculator</Link></li>
        </ul>
      </section>

      <JsonLd />
    </div>
  );
}
