import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

export const metadata: Metadata = {
  title: "About Us | Basita Technology",
  description:
    "Learn about Basita Technology, our values, and the team behind our software and AI solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    siteName: "Basita Technology",
    title: "About Us | Basita Technology",
    description:
      "Learn about Basita Technology, our values, and the team behind our software and AI solutions.",
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
    title: "About Us | Basita Technology",
    description:
      "Learn about Basita Technology, our values, and the team behind our software and AI solutions.",
    images: ["/logo.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
