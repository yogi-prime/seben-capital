// app/about/page.tsx
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CANONICAL = "/about";
const TITLE =
  "About Seben Capital | Trading Education, Mentorship & Risk-First Portfolio Thinking";
const DESCRIPTION =
  "Seben Capital empowers traders with education, 1:1 mentorship, and risk-aware research. Learn our discipline-first approach to consistent, sustainable trading growth.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "Seben Capital",
    "about",
    "trading education",
    "trading mentorship",
    "risk management",
    "portfolio management",
    "options trading",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${CANONICAL}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [{ url: "/og/about.png", width: 1200, height: 630, alt: "About Seben Capital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/about.png"],
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
  // ----- Structured Data: AboutPage, Organization, Person (Founder), Breadcrumbs -----
  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Seben Capital",
    description: DESCRIPTION,
    url: `${SITE_URL}${CANONICAL}`,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og/about.png`,
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Seben Capital",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [] as string[], // add socials when ready
  };

  const founder = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Saurav Singh Tomar",
    jobTitle: "Founder & Mentor",
    worksFor: { "@type": "Organization", name: "Seben Capital" },
    url: `${SITE_URL}${CANONICAL}#leadership`,
    knowsAbout: [
      "Options Trading",
      "Risk Management",
      "Trading Psychology",
      "Systematic Trading",
    ],
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founder) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <AboutClient />
    </>
  );
}
