// app/(site)/bots/page.tsx
import type { Metadata } from "next";
import BotsClient from "./BotsClient";
import { CONFIG } from "@/lib/api";

export const revalidate = 3600; // ISR 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const title = "The 10-Bot Fund | AI Trading Ecosystem | Seben Capital";
  const description = "Institutional-grade AI trading ecosystem with 10 specialized bots. Professional risk management, transparent performance, and sophisticated execution.";
  
  return {
    metadataBase: new URL(CONFIG.SITE_URL),
    title,
    description,
    keywords: [
      "AI trading",
      "automated trading",
      "trading bots",
      "algorithmic trading",
      "investment fund",
      "capital compounding",
      "risk management",
      "Seben Capital",
      "trading algorithms",
      "quantitative trading"
    ],
    alternates: {
      canonical: "/bots",
    },
    openGraph: {
      type: "website",
      url: `${CONFIG.SITE_URL}/bots`,
      title,
      description,
      siteName: "Seben Capital",
      images: [
        {
          url: "/og/bots.png",
          width: 1200,
          height: 630,
          alt: "Seben Capital - The 10-Bot Fund",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/bots.png"],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default function Page() {
  // JSON-LD structured data
  const botFundJsonLd = {
    "@context": "https://schema.org",
    "@type": "InvestmentFund",
    name: "Seben Capital - The 10-Bot Fund",
    description: "AI-driven automated trading fund with 10 proprietary algorithms working in synchronization",
    url: `${CONFIG.SITE_URL}/bots`,
    feesAndCommissionsSpecification: `${CONFIG.SITE_URL}/fees`,
    riskFactor: "Medium to High",
    annualPercentageYield: "24-36%",
    assetsUnderManagement: "Confidential",
    fundManager: {
      "@type": "Organization",
      name: "Seben Capital",
      url: CONFIG.SITE_URL
    }
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${CONFIG.SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "The 10-Bot Fund",
        item: `${CONFIG.SITE_URL}/bots`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(botFundJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <BotsClient />
    </>
  );
}