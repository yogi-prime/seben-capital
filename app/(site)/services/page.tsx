// app/services/page.tsx
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CANONICAL = "/services";
const TITLE =
  "Trading & Investment Services | Portfolio Management, Trading Desk – Seben Capital";
const DESCRIPTION =
  "Professional trading & investment services by Seben Capital: risk-first Portfolio Management and a Discretionary + Rules-based Trading Desk. Transparent reporting, strict drawdown control, and disciplined execution.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "Seben Capital services",
    "portfolio management India",
    "trading desk",
    "copy trading",
    "algo trading",
    "risk management",
    "drawdown control",
    "investment services",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${CANONICAL}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [{ url: "/og/services.png", width: 1200, height: 630, alt: "Seben Capital Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/services.png"],
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
  // --------- Structured Data ---------
  const servicesItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Seben Capital Services",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: `${SITE_URL}/services/portfolio-management`,
        name: "Portfolio Management",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: `${SITE_URL}/services/general-trading`,
        name: "General Trading Desk",
      },
    ],
  };

  const portfolioManagement = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Portfolio Management",
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    url: `${SITE_URL}/services/portfolio-management`,
    areaServed: "IN",
    serviceType: "Portfolio management",
    description:
      "Professional capital management with risk-aware growth, transparent reporting, liquidity management and strict drawdown controls.",
    termsOfService: `${SITE_URL}/legal/terms`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/services/portfolio-management`,
      priceCurrency: "INR",
      // price is not advertised publicly; omit numeric to avoid misleading
    },
  };

  const tradingDesk = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "General Trading Desk",
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    url: `${SITE_URL}/services/general-trading`,
    areaServed: "IN",
    serviceType: "Trading desk (discretionary & rules-based)",
    description:
      "Comprehensive trading services backed by institutional-grade research, risk parameters, professional execution and daily reporting.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/services/general-trading`,
      priceCurrency: "INR",
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioManagement) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tradingDesk) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <ServicesClient />
    </>
  );
}
