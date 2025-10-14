// app/calculators/cagr/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CAGRClient from "./CAGRClient";


// ---- STATIC SEO ----
export const metadata: Metadata = {
  metadataBase: new URL("https://sebencapital.com"),
  title: "CAGR Calculator (Compound Annual Growth Rate) – Free Online Tool",
  description:
    "Accurately calculate CAGR (Compound Annual Growth Rate) from initial value, final value, and years. Includes growth chart, examples, benchmarks, and FAQs.",
  alternates: { canonical: "https://sebencapital.com/calculators/cagr" },
  openGraph: {
    type: "website",
    url: "https://sebencapital.com/calculators/cagr",
    siteName: "Seben Capital",
    title: "CAGR Calculator – Compound Annual Growth Rate",
    description:
      "Free CAGR Calculator with chart and benchmarks. Understand annualized returns over time.",
    images: [{ url: "/og/cagr.jpg", width: 1200, height: 630, alt: "CAGR Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAGR Calculator – Compound Annual Growth Rate",
    description:
      "Calculate CAGR with chart, examples, and benchmarks. Free, instant, accurate.",
    images: ["/og/cagr.jpg"],
  },
  keywords: [
    "CAGR calculator",
    "compound annual growth rate",
    "annualised return calculator",
    "investment growth calculator",
    "mutual fund CAGR",
    "stock CAGR",
  ],
};

// ---- JSON-LD HELPERS ----
function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: "https://sebencapital.com/tools" },
      { "@type": "ListItem", position: 2, name: "CAGR Calculator", item: "https://sebencapital.com/calculators/cagr" },
    ],
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CAGR Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    url: "https://sebencapital.com/calculators/cagr",
    description:
      "Free online CAGR Calculator to compute compound annual growth rate with chart and examples.",
    publisher: {
      "@type": "Organization",
      name: "Seben Capital",
      url: "https://sebencapital.com",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is CAGR?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "CAGR (Compound Annual Growth Rate) is the constant annual rate of return that takes an initial value to a final value over a period of years, assuming compounding.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate CAGR?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "CAGR = (Final Value / Initial Value)^(1/Years) − 1. Multiply by 100 to express as a percentage.",
        },
      },
      {
        "@type": "Question",
        name: "Is CAGR guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. CAGR reflects historical or hypothetical growth and does not predict future returns.",
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


      {/* Breadcrumb (visible + matches JSON-LD) */}
      <nav aria-label="Breadcrumb" className="container max-w-6xl pt-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/tools" className="text-muted-foreground hover:text-copper-primary">Tools</Link>
          </li>
          <li aria-hidden className="text-muted-foreground">/</li>
          <li className="text-copper-primary">CAGR Calculator</li>
        </ol>
      </nav>

      {/* Client app (form + chart) */}
      <CAGRClient />

      {/* Related internal links for topical authority */}
      <section className="container max-w-6xl mt-12">
        <h2 className="text-xl font-semibold mb-4">More Investment Calculators</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground grid md:grid-cols-2 gap-2">
          <li><Link href="/calculators/sip" className="hover:text-copper-primary">SIP Return Calculator</Link></li>
          <li><Link href="/calculators/xirr" className="hover:text-copper-primary">XIRR Calculator</Link></li>
          <li><Link href="/calculators/lumpsum" className="hover:text-copper-primary">Lumpsum Return Calculator</Link></li>
          <li><Link href="/calculators/goal" className="hover:text-copper-primary">Goal Planning Calculator</Link></li>
        </ul>
      </section>

  
      <JsonLd />
    </div>
  );
}
