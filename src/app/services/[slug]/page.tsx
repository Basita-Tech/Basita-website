import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import ServiceDetail from "@/components/service-detail";

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

export async function generateStaticParams() {
  const { services } = await import("@/data/services");
  return services.map((service) => ({
    slug: service.slug,
  }));
}
