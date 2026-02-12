import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

export const metadata: Metadata = {
  title: "Portfolio | Basita Technology",
  description:
    "Explore case studies and project highlights from Basita Technology.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/portfolio`,
    siteName: "Basita Technology",
    title: "Portfolio | Basita Technology",
    description:
      "Explore case studies and project highlights from Basita Technology.",
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
    title: "Portfolio | Basita Technology",
    description:
      "Explore case studies and project highlights from Basita Technology.",
    images: ["/logo.png"],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
