import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Rethink_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://basita.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Basita Technology | Software & AI Solutions",
    template: "%s | Basita Technology",
  },
  description:
    "Basita Technology builds modern digital products, AI solutions, and scalable platforms for growing businesses.",
  applicationName: "Basita Technology",
  keywords: [
    "Basita Technology",
    "software development",
    "AI solutions",
    "web development",
    "mobile app development",
    "cloud services",
    "UI/UX design",
  ],
  authors: [{ name: "Basita Technology" }],
  creator: "Basita Technology",
  publisher: "Basita Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://basita.in",
    siteName: "Basita Technology",
    title: "Basita Technology | Software & AI Solutions",
    description:
      "Basita Technology builds modern digital products, AI solutions, and scalable platforms for growing businesses.",
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
    title: "Basita Technology | Software & AI Solutions",
    description:
      "Basita Technology builds modern digital products, AI solutions, and scalable platforms for growing businesses.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${rethinkSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
