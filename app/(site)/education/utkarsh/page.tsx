// app/courses/utkarsh/page.tsx
import type { Metadata } from "next";
import UtkarshClient from "./UtkarshClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CANONICAL = "/courses/utkarsh";
const TITLE =
  "Utkarsh – Complete Trading Mastery (1 Year) | Live Mentorship & Funding Path | Seben Capital";
const DESCRIPTION =
  "Utkarsh is Seben Capital’s flagship, risk-first trading program: live mentor-led sessions, structured syllabus, tools, community, and a clear funding pathway.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Seben Capital",
  },
  description: DESCRIPTION,
  keywords: [
    "Utkarsh",
    "trading course",
    "live trading mentorship",
    "funded trader path",
    "options trading",
    "risk management",
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
        url: "/og/utkarsh.png", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "Utkarsh – Complete Trading Mastery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/utkarsh.png"],
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
  // Course + Offers + Curriculum (as ItemList) + Breadcrumbs
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Utkarsh – Complete Trading Mastery",
    description:
      "Risk-first trading program with live mentor-led sessions, structured syllabus, tools, community, and funding pathway.",
    provider: {
      "@type": "Organization",
      name: "Seben Capital",
      url: SITE_URL,
    },
    inLanguage: "en",
    educationalLevel: "Beginner to Advanced",
    coursePrerequisites: "None",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${CANONICAL}`,
      price: "49999",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      category: "EducationalCourse",
      name: "Utkarsh – 1 Year Access",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
    hasPart: {
      "@type": "ItemList",
      name: "Syllabus Overview",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Level 1 – The Jungle Basics" },
        { "@type": "ListItem", position: 2, name: "Level 2 – The Strategy Core" },
        { "@type": "ListItem", position: 3, name: "Level 3 – Testing & Optimization" },
        { "@type": "ListItem", position: 4, name: "Level 4 – Execution & Reflection" },
      ],
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses` },
      { "@type": "ListItem", position: 3, name: "Utkarsh", item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // @ts-expect-error
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        // @ts-expect-error
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <UtkarshClient />
    </>
  );
}
