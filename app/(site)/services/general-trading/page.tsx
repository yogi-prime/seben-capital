// app/(no-chrome)/services/general-trading/page.tsx
import type { Metadata } from "next";
import GeneralTradingClient from "./GeneralTradingClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PATH = "/services/general-trading";
const TITLE =
  "General Trading Desk – Discretionary & Rules-Based Services | Seben Capital";
const DESCRIPTION =
  "Comprehensive trading services combining discretionary expertise with systematic approaches. Professional execution, risk controls, and transparent reporting.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "general trading desk",
    "discretionary trading",
    "rules-based trading",
    "systematic trading",
    "multi-asset trading",
    "risk management",
    "Seben Capital services",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [{ url: "/og/services-general-trading.png", width: 1200, height: 630, alt: "Seben Capital General Trading" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/services-general-trading.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  category: "Finance",
  authors: [{ name: "Seben Capital" }],
  creator: "Seben Capital",
};

export const revalidate = 3600;

export default function Page() {
  const service = {
    "@context": "https://schema.org",
    "@type": ["Service", "FinancialService"],
    name: "General Trading Desk",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    areaServed: { "@type": "Country", name: "India" },
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    brand: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Strategy consultation & scoping session at no cost",
      availability: "https://schema.org/InStock",
    },
    potentialAction: {
      "@type": "ContactAction",
      target: `${SITE_URL}${PATH}#start-consultation`,
      name: "Schedule Consultation",
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "General Trading", item: `${SITE_URL}${PATH}` },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What assets do you trade?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Primarily equities, indices, and derivatives per mandate. We combine discretionary setups with rules-based models where appropriate.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a minimum amount?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the minimum is ₹2,00,000 for the General Trading Desk.",
        },
      },
      {
        "@type": "Question",
        name: "How do you manage risk?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Defined risk parameters, position sizing limits, stop frameworks, and correlation control. We emphasize capital protection first.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide daily reports?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "You receive daily snapshots and monthly detailed reporting with P/L metrics, exposure, and commentary.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <GeneralTradingClient />
    </>
  );
}
