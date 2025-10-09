// app/calculator/drawdown-recovery/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import DrawdownClient from "./DrawdownClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebencapital.com"),
  title: "Drawdown & Recovery Calculator – Required Gain and Time to Recover",
  description:
    "Calculate portfolio drawdown %, required gain to recover, and time to break even at different monthly returns. Learn why recovery % is greater than drawdown %.",
  alternates: { canonical: "https://sebencapital.com/calculator/drawdown-recovery" },
  openGraph: {
    type: "website",
    url: "https://sebencapital.com/calculator/drawdown-recovery",
    siteName: "Seben Capital",
    title: "Drawdown & Recovery Calculator",
    description:
      "Find your drawdown, required gain to recover, and estimated months/years to break even.",
    images: [{ url: "/og/drawdown.jpg", width: 1200, height: 630, alt: "Drawdown & Recovery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drawdown & Recovery Calculator",
    description:
      "Compute drawdown %, recovery gain %, and time to recover at various monthly returns.",
    images: ["/og/drawdown.jpg"],
  },
  keywords: [
    "drawdown calculator",
    "recovery calculator",
    "required gain after loss",
    "portfolio drawdown",
    "break even calculator",
    "trading risk management",
  ],
};

// ---- JSON-LD for rich results ----
function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: "https://sebencapital.com/tools" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Drawdown & Recovery Calculator",
        item: "https://sebencapital.com/calculator/drawdown-recovery",
      },
    ],
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Drawdown & Recovery Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://sebencapital.com/calculator/drawdown-recovery",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@type": "Organization", name: "Seben Capital", url: "https://sebencapital.com" },
    description:
      "Web calculator that computes drawdown %, recovery gain %, and time needed to recover at different monthly returns.",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why is the required gain higher than the drawdown?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Because recovery is calculated on the reduced base. For example, a 50% loss from ₹100,000 to ₹50,000 needs a 100% gain to return to ₹100,000.",
        },
      },
      {
        "@type": "Question",
        name: "Does this predict future performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. It illustrates mathematics of compounding and recovery. Markets are uncertain and results can vary.",
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
      {/* visible breadcrumb that matches JSON-LD */}
      <nav aria-label="Breadcrumb" className="container max-w-6xl pt-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/tools" className="text-muted-foreground hover:text-copper-primary">
              Tools
            </Link>
          </li>
          <li aria-hidden className="text-muted-foreground">/</li>
          <li className="text-copper-primary">Drawdown &amp; Recovery</li>
        </ol>
      </nav>

      {/* client calculator */}
      <DrawdownClient />

      {/* related internal links for topical authority */}
      <section className="container max-w-6xl mt-12">
        <h2 className="text-xl font-semibold mb-4">More Risk & Return Calculators</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground grid md:grid-cols-2 gap-2">
          <li><Link href="/calculators/cagr" className="hover:text-copper-primary">CAGR Calculator</Link></li>
          <li><Link href="/calculators/xirr" className="hover:text-copper-primary">XIRR Calculator</Link></li>
          <li><Link href="/calculators/sip" className="hover:text-copper-primary">SIP Return Calculator</Link></li>
          <li><Link href="/calculators/goal" className="hover:text-copper-primary">Goal Planning Calculator</Link></li>
        </ul>
      </section>

      <JsonLd />
    </div>
  );
}
