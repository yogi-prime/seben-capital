// app/services/portfolio-management/page.tsx
import type { Metadata } from "next";
import PortfolioManagementClient from "./PortfolioManagementClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PATH = "/services/portfolio-management";
const TITLE =
  "Portfolio Management – Risk-Aware Capital Management (T+1 Liquidity) | Seben Capital";
const DESCRIPTION =
  "Professional, risk-aware portfolio management focused on steady, sustainable growth. ≤5% max drawdown policy, T+1 liquidity, transparent monthly reporting.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "portfolio management",
    "risk aware investing",
    "T+1 liquidity",
    "drawdown control",
    "capital management",
    "hedging strategies",
    "Seben Capital services",
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
        url: "/og/services-portfolio-management.png",
        width: 1200,
        height: 630,
        alt: "Seben Capital Portfolio Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/services-portfolio-management.png"],
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

// cache-friendly revalidation
export const revalidate = 3600;

export default function Page() {
  // Service + FinancialService schema
  const service = {
    "@context": "https://schema.org",
    "@type": ["Service", "FinancialService"],
    name: "Portfolio Management",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    areaServed: { "@type": "Country", name: "India" },
    brand: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
    termsOfService: `${SITE_URL}/legal/terms`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Evaluation & onboarding consultation at no cost",
      availability: "https://schema.org/InStock",
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory: "https://schema.org/NoReturnsAccepted",
    },
    potentialAction: {
      "@type": "ContactAction",
      target: `${SITE_URL}${PATH}#start-evaluation`,
      name: "Start Evaluation",
    },
  };

  // Breadcrumbs
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "Portfolio Management", item: `${SITE_URL}${PATH}` },
    ],
  };

  // FAQ rich results
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is 3% monthly guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No—this is a target/objective only. Markets carry inherent risk and returns can never be guaranteed. We focus on risk-adjusted performance over time.",
        },
      },
      {
        "@type": "Question",
        name: "Can I redeem anytime?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We offer T+1 liquidity as per policy—redemption with one business day notice.",
        },
      },
      {
        "@type": "Question",
        name: "Do you use derivatives?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, for hedging and defined setups as per mandate to manage portfolio risk and enhance returns.",
        },
      },
      {
        "@type": "Question",
        name: "What risks should I know?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Market, liquidity, and gap risk are inherent. We operate with a risk-first approach and strict risk management protocols.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <PortfolioManagementClient />
    </>
  );
}
