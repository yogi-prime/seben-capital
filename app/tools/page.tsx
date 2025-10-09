// app/tools/page.tsx
import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CANONICAL = "/tools";
const TITLE =
  "Trading Calculators & Tools | Position Size, CAGR, Options P/L – Seben Capital";
const DESCRIPTION =
  "Free trading calculators by Seben Capital: Position Size, Compounding, CAGR, Options P/L, Drawdown Recovery & more. Plan risk and size trades before you enter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "trading calculators",
    "position size calculator",
    "options P/L calculator",
    "CAGR calculator",
    "drawdown recovery",
    "risk reward expectancy",
    "SIP goal planner",
    "Seben Capital tools",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${CANONICAL}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [{ url: "/og/tools.png", width: 1200, height: 630, alt: "Seben Capital Trading Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/tools.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  category: "Finance",
  creator: "Seben Capital",
  authors: [{ name: "Seben Capital" }],
};

export default function Page() {
  // --- Structured Data ---
  const tools = [
    { id: "position-size", name: "Position Size Calculator", url: `${SITE_URL}/tools/position-size`, description: "Calculate optimal position sizes based on risk tolerance and account size." },
    { id: "compounding", name: "Compounding Calculator", url: `${SITE_URL}/tools/compounding`, description: "Visualize the power of compound returns over time periods." },
    { id: "sip-goal-planner", name: "SIP Goal Planner", url: `${SITE_URL}/tools/sip-goal-planner`, description: "Plan SIP investments to reach specific goals." },
    { id: "rr-expectancy", name: "Risk/Reward & Expectancy", url: `${SITE_URL}/tools/rr-expectancy`, description: "Compute trading expectancy and RR ratios." },
    { id: "options-pl", name: "Options P/L Calculator", url: `${SITE_URL}/tools/options-pl`, description: "P/L for single & multi-leg options strategies." },
    { id: "drawdown-recovery", name: "Drawdown & Recovery", url: `${SITE_URL}/tools/drawdown-recovery`, description: "Recovery needed after portfolio drawdowns." },
    { id: "cagr", name: "CAGR Calculator", url: `${SITE_URL}/tools/cagr`, description: "Compound Annual Growth Rate calculator." },
  ];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Seben Capital Trading Tools",
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: t.url,
    })),
  };

  const webApps = tools.map((t) => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: t.url,
    description: t.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
  }));

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {webApps.map((w, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(w) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <ToolsClient />
    </>
  );
}
