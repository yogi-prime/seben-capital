// app/courses/mentorship/page.tsx
import type { Metadata } from "next";
import MentorshipClient from "./MentorshipClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CANONICAL = "/courses/mentorship";
const TITLE =
  "1:1 Trading Mentorship Program | Personalized Guidance | Seben Capital";
const DESCRIPTION =
  "Get personalized 1:1 trading mentorship: strategy development, portfolio review, risk-first frameworks, and ongoing support. Tailored guidance for serious traders.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "trading mentorship",
    "1:1 trading mentor",
    "portfolio review",
    "strategy development",
    "risk management",
    "trading education",
    "Seben Capital",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${CANONICAL}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Seben Capital",
    images: [
      {
        url: "/og/mentorship.png", // add this image when you can (1200x630)
        width: 1200,
        height: 630,
        alt: "Seben Capital Mentorship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/mentorship.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export default function Page() {
  // Structured data (Service + Offers + Breadcrumbs + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Seben Capital Mentorship Program",
    url: `${SITE_URL}${CANONICAL}`,
    areaServed: "IN",
    serviceType: "Trading mentorship",
    provider: {
      "@type": "Organization",
      name: "Seben Capital",
      url: SITE_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mentorship Plans",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Monthly",
          price: "4999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Quarterly",
          price: "11999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Yearly",
          price: "39999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${SITE_URL}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Mentorship",
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  };

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is 1:1 mentorship different from group mentorship?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "1:1 mentorship offers personalized attention focused on your goals. Group mentorship includes peer learning with shared mentor attention.",
        },
      },
      {
        "@type": "Question",
        name: "Can I extend my mentorship sessions?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, you can add sessions or upgrade any time. Flexible extension packages are available.",
        },
      },
      {
        "@type": "Question",
        name: "Will mentors trade for me or manage my account?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Mentorship is educational. You keep full control of your account and decisions.",
        },
      },
      {
        "@type": "Question",
        name: "How are mentors assigned?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We match based on your style, experience and goals. You can request a specific mentor if available.",
        },
      },
      {
        "@type": "Question",
        name: "What if I'm not satisfied with my mentor?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We allow mentor reassignment within the first two sessions if there's a mismatch.",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // @ts-expect-error - JSON.stringify is fine here
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        // @ts-expect-error
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        // @ts-expect-error
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      {/* Client UI (unchanged look & feel) */}
      <MentorshipClient />
    </>
  );
}
