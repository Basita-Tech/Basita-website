import Link from "next/link";

type GetStartedCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function GetStartedCTA({
  title = "Get Ready to Start?",
  description = "Let's discuss how Basita Technology can transform your business.",
  primaryLabel = "Schedule Free Consultation",
  primaryHref = "/contact",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: GetStartedCTAProps) {
  return (
    <section className="relative w-full overflow-hidden bg-green-50 hero-light py-16 md:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 hero-heading">{title}</h2>
          <p className="text-lg mb-8 hero-text">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hero-primary-btn"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 border-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hero-secondary-btn"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px opacity-50 hero-divider" />
    </section>
  );
}
