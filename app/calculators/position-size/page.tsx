// app/calculator/position-size/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PositionSizeClient from "./PositionSizeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebencapital.com"),
  title: "Position Size Calculator – Risk Based Sizing (1–2% Rule)",
  description:
    "Free Position Size Calculator that uses account size, risk %, entry and stop-loss to compute optimal quantity. Supports lot sizing for F&O. Includes formulas and best practices.",
  alternates: { canonical: "https://sebencapital.com/calculator/position-size" },
  openGraph: {
    type: "website",
    url: "https://sebencapital.com/calculator/position-size",
    siteName: "Seben Capital",
    title: "Position Size Calculator",
    description:
      "Calculate position size from account risk %. Works for stocks and derivatives with lot sizing.",
    images: [{ url: "/og/position-size.jpg", width: 1200, height: 630, alt: "Position Size Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Position Size Calculator",
    description:
      "Risk-based position sizing with account % risk and stop-loss distance.",
    images: ["/og/position-size.jpg"],
  },
  keywords: [
    "position size calculator",
    "risk per trade calculator",
    "1 percent rule",
    "2 percent rule",
    "lot size calculator",
    "trading risk management",
  ],
};

function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: "https://sebencapital.com/tools" },
      { "@type": "ListItem", position: 2, name: "Position Size Calculator", item: "https://sebencapital.com/calculator/position-size" },
    ],
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Position Size Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://sebencapital.com/calculator/position-size",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Web calculator that computes optimal position size from risk %, entry and stop-loss; supports lot sizing.",
    publisher: { "@type": "Organization", name: "Seben Capital", url: "https://sebencapital.com" },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate position size?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Risk Amount = Account Size × (Risk%/100). Risk per Unit = |Entry − Stop|. Position Size = Risk Amount ÷ Risk per Unit. For derivatives, divide by lot size.",
        },
      },
      {
        "@type": "Question",
        name: "What risk % should I use?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Many traders use 0.5%–2% of account equity per trade depending on volatility and experience.",
        },
      },
      {
        "@type": "Question",
        name: "Does this guarantee profits?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Position sizing manages risk; trade outcomes still depend on strategy and market conditions.",
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
      {/* visible breadcrumb matching JSON-LD */}
      <nav aria-label="Breadcrumb" className="container max-w-6xl pt-8">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/tools" className="text-muted-foreground hover:text-copper-primary">Tools</Link></li>
          <li aria-hidden className="text-muted-foreground">/</li>
          <li className="text-copper-primary">Position Size Calculator</li>
        </ol>
      </nav>

      {/* client UI (same design) */}
      <PositionSizeClient />

      {/* related internal links for topical authority */}
      <section className="container max-w-6xl mt-12">
        <h2 className="text-xl font-semibold mb-4">More Risk & Money Management Tools</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground grid md:grid-cols-2 gap-2">
          <li><Link href="/calculator/drawdown-recovery" className="hover:text-copper-primary">Drawdown & Recovery</Link></li>
          <li><Link href="/calculators/cagr" className="hover:text-copper-primary">CAGR Calculator</Link></li>
          <li><Link href="/calculators/xirr" className="hover:text-copper-primary">XIRR Calculator</Link></li>
          <li><Link href="/calculators/sip" className="hover:text-copper-primary">SIP Return Calculator</Link></li>
        </ul>
      </section>

      <JsonLd />
    </div>
  );
}
