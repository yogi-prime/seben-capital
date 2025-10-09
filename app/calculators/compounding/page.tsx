// app/tools/compounding/page.tsx
import type { Metadata } from "next";
import CompoundingClient from "./CompoundingClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PATH = "/tools/compounding";
const TITLE =
  "Compounding Calculator (INR) – Project Future Value & Growth | Seben Capital";
const DESCRIPTION =
  "Free compounding calculator in INR. Enter starting capital, monthly SIP, expected annual return (CAGR) and years to project future value, contributions and growth.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "compounding calculator",
    "compound interest calculator",
    "SIP calculator",
    "future value calculator",
    "CAGR",
    "investment calculator India",
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
        url: "/og/tools-compounding.png",
        width: 1200,
        height: 630,
        alt: "Seben Capital Compounding Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/tools-compounding.png"],
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

// optional: static
export const revalidate = 3600;

export default function Page() {
  // JSON-LD: WebApplication (calculator)
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Compounding Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}${PATH}`,
    description: DESCRIPTION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
  };

  // JSON-LD: Breadcrumbs
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Compounding Calculator", item: `${SITE_URL}${PATH}` },
    ],
  };

  // JSON-LD: FAQ (matches visible sections: Formula / Key Principles / Disclaimer)
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Compounding future value kaise calculate hota hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Annual return ko 12 se divide karke monthly return nikalte hain. Har month current value par return add hota hai, phir monthly contribution add karte hain. Growth = Final Value − Total Contributions.",
        },
      },
      {
        "@type": "Question",
        name: "Is calculator ke liye kaun-kaun se inputs chahiye?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Starting capital, monthly contribution (SIP), expected annual return (%) aur investment period (years). Inse tool future value, total contributions aur total growth dikhata hai.",
        },
      },
      {
        "@type": "Question",
        name: "Kya ye financial advice hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nahi. Ye tool sirf educational purpose ke liye hai. Markets me risk hota hai, results guarantee nahi hote. Investment decisions se pehle qualified advisor se salaah lein.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <CompoundingClient />
    </>
  );
}
