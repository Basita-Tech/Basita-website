import type { Metadata } from "next";
import Navigation from "@/homepage/navigation";
import Footer from "@/components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

export const metadata: Metadata = {
  title: "Services | Basita Technology",
  description:
    "Browse Basita Technology services across web, mobile, AI, cloud, and product development.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/services`,
    siteName: "Basita Technology",
    title: "Services | Basita Technology",
    description:
      "Browse Basita Technology services across web, mobile, AI, cloud, and product development.",
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
    title: "Services | Basita Technology",
    description:
      "Browse Basita Technology services across web, mobile, AI, cloud, and product development.",
    images: ["/logo.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
