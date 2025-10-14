// app/calculator/trader-metrics/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import TraderMetricsClient from "./TraderMetricsClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebencapital.com"),
  title: "Trader Metrics Calculator – Win Rate, Profit Factor, Expectancy",
  description:
    "Paste or enter your trades and instantly compute win rate, average win/loss, risk–reward, profit factor, expectancy, and equity curve.",
  alternates: { canonical: "https://sebencapital.com/calculator/trader-metrics" },
  openGraph: {
    type: "website",
    url: "https://sebencapital.com/calculator/trader-metrics",
    siteName: "Seben Capital",
    title: "Trader Metrics Calculator",
    description:
      "Analyze trading performance: win rate, RR, profit factor, expectancy, and cumulative equity.",
    images: [{ url: "/og/trader-metrics.jpg", width: 1200, height: 630, alt: "Trader Metrics Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trader Metrics Calculator",
    description:
      "Compute win rate, average win/loss, RR, profit factor, expectancy, and equity curve from your trades.",
    images: ["/og/trader-metrics.jpg"],
  },
  keywords: [
    "trader metrics",
    "win rate calculator",
    "profit factor calculator",
    "expectancy calculator",
    "risk reward ratio",
    "equity curve",
    "trading journal analytics",
  ],
};

// ---- JSON-LD for rich results ----
function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: "https://sebencapital.com/tools" },
      { "@type": "ListItem", position: 2, name: "Trader Metrics Calculator", item: "https://sebencapital.com/calculator/trader-metrics" },
    ],
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Trader Metrics Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://sebencapital.com/calculator/trader-metrics",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Web calculator to analyze trading performance: win rate, average win/loss, risk–reward, profit factor, expectancy, and equity curve.",
    publisher: { "@type": "Organization", name: "Seben Capital", url: "https://sebencapital.com" },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which metrics matter most for system quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Focus on expectancy (edge per trade), profit factor (gross profits ÷ gross losses), win rate, and average risk–reward. Combined, they indicate robustness.",
        },
      },
      {
        "@type": "Question",
        name: "How is expectancy calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Expectancy = (Win Rate × Average Win) − (Loss Rate × Average Loss). Positive expectancy implies a statistical edge.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good profit factor?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Many traders consider a profit factor above 1.3 acceptable and above 1.6 strong, but it depends on sample size and market regime.",
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
    <div className="min-h-screen">
      {/* visible breadcrumb to match JSON-LD */}
      <nav aria-label="Breadcrumb" className="container max-w-6xl pt-8">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/tools" className="text-muted-foreground hover:text-copper-primary">Tools</Link></li>
          <li aria-hidden className="text-muted-foreground">/</li>
          <li className="text-copper-primary">Trader Metrics</li>
        </ol>
      </nav>

      {/* client component (keeps your UI exactly) */}
      <TraderMetricsClient />

      {/* internal links to strengthen topical authority */}
      <section className="container max-w-6xl mt-12">
        <h2 className="text-xl font-semibold mb-4">More Strategy & Risk Tools</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground grid md:grid-cols-2 gap-2">
          <li><Link href="/calculator/position-size" className="hover:text-copper-primary">Position Size Calculator</Link></li>
          <li><Link href="/calculator/risk-reward" className="hover:text-copper-primary">Risk/Reward &amp; Expectancy</Link></li>
          <li><Link href="/calculator/drawdown-recovery" className="hover:text-copper-primary">Drawdown &amp; Recovery</Link></li>
          <li><Link href="/calculators/cagr" className="hover:text-copper-primary">CAGR Calculator</Link></li>
        </ul>
      </section>

      <JsonLd />
    </div>
  );
}
