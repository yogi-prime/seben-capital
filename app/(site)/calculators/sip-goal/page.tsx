// app/tools/sip-goal/page.tsx
import type { Metadata } from "next";
import SIPGoalClient from "./SIPGoalClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PATH = "/tools/sip-goal";
const TITLE =
  "SIP Goal Planner – Monthly SIP Needed to Reach Target | Free Calculator by Seben Capital";
const DESCRIPTION =
  "Plan your SIP to hit a target corpus. Compute required monthly SIP, contributions vs growth, and yearly progress with realistic compounding. Free SIP goal calculator.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "SIP goal calculator",
    "SIP planner",
    "monthly SIP required",
    "SIP to reach target",
    "mutual fund SIP calculator",
    "compounding calculator India",
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
        url: "/og/tools-sip-goal.png",
        width: 1200,
        height: 630,
        alt: "SIP Goal Planner – Seben Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/tools-sip-goal.png"],
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

// Cache-friendly revalidation
export const revalidate = 3600;

export default function Page() {
  // WebApplication schema
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SIP Goal Planner",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}${PATH}`,
    description: DESCRIPTION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: "Seben Capital", url: SITE_URL },
  };

  // Breadcrumbs schema
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "SIP Goal Planner", item: `${SITE_URL}${PATH}` },
    ],
  };

  // FAQ schema
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "SIP Goal Planner kya karta hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Ye tool aapke target corpus tak pahunchne ke liye required monthly SIP, total contributions, expected growth aur yearly progress compute karta hai.",
        },
      },
      {
        "@type": "Question",
        name: "Kaun-se inputs chahiye?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Target amount, time horizon (years), expected annual return (%), aur optional current savings. Output me monthly SIP aur growth breakdown milta hai.",
        },
      },
      {
        "@type": "Question",
        name: "Kya ye financial advice hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Nahi. Ye educational calculator hai. Market risk rehta hai; past performance future returns ki guarantee nahi hoti.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <SIPGoalClient />
    </>
  );
}
