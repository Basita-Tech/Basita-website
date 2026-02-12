import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

export const metadata: Metadata = {
  title: "Contact | Basita Technology",
  description:
    "Contact Basita Technology for software, AI, and digital product development. Get a free consultation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    siteName: "Basita Technology",
    title: "Contact | Basita Technology",
    description:
      "Contact Basita Technology for software, AI, and digital product development. Get a free consultation.",
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
    title: "Contact | Basita Technology",
    description:
      "Contact Basita Technology for software, AI, and digital product development. Get a free consultation.",
    images: ["/logo.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
