import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import ServiceDetail from "@/components/service-detail";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.basita.in";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}

export async function generateMetadata(
  { params }: ServicePageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Basita Technology",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${service.title} | Basita Technology`;
  const description = service.shortDescription;
  const url = `${siteUrl}/services/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Basita Technology",
      title,
      description,
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
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

export async function generateStaticParams() {
  const { services } = await import("@/data/services");
  return services.map((service) => ({
    slug: service.slug,
  }));
}
