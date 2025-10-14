// app/tools/options-pl/page.tsx
import type { Metadata } from "next";
import OptionsPLClient from "./OptionsPLClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PATH = "/tools/options-pl";
const TITLE =
  "Options P/L Calculator (INR) – Single-Leg Payoff, Breakeven, Max Profit/Loss | Seben Capital";
const DESCRIPTION =
  "Free Options Profit/Loss Calculator in INR. Analyze single-leg call/put (long/short), breakeven, max profit/loss, current P/L and payoff diagram at expiry.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "options P/L calculator",
    "options payoff calculator",
    "call put calculator",
    "options breakeven",
    "max profit max loss",
    "Nifty BankNifty options",
    "Seben Capital tools",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [
      {
        url: "/og/tools-options-pl.png",
        width: 1200,
        height: 630,
        alt: "Seben Capital Options P/L Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/tools-options-pl.png"],
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

// cache-friendly
export const revalidate = 3600;

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Options P/L Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}${PATH}`,
    description: DESCRIPTION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Options P/L Calculator", item: `${SITE_URL}${PATH}` },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ye calculator kya compute karta hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Single-leg calls/puts (long/short) ka expiry P/L, breakeven, current P/L, max profit/loss aur payoff diagram dikhata hai.",
        },
      },
      {
        "@type": "Question",
        name: "Kaun se inputs chahiye?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Option type (Call/Put), position (Long/Short), premium (₹), strike (₹), current spot (₹) aur quantity.",
        },
      },
      {
        "@type": "Question",
        name: "Kya Greeks aur IV impact include hote hain?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nahin. Ye tool sirf expiry payoff ko model karta hai; Greeks, time decay aur volatility changes include nahi hote. Educational purpose only.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <OptionsPLClient />
    </>
  );
}
