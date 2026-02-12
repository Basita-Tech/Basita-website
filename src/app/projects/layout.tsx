import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

export const metadata: Metadata = {
  title: "Case Studies | Basita Technology",
  description:
    "Explore Basita Technology case studies and project outcomes across industries.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    siteName: "Basita Technology",
    title: "Case Studies | Basita Technology",
    description:
      "Explore Basita Technology case studies and project outcomes across industries.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Basita Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Basita Technology",
    description:
      "Explore Basita Technology case studies and project outcomes across industries.",
    images: ["/logo.png"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
