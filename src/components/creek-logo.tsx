import Image from "next/image";

type CreekLogoProps = {
  className?: string;
};

export default function CreekLogo({ className = "" }: CreekLogoProps) {
  return (
    <div className={`w-full h-14 md:h-16 flex items-center justify-start ${className}`}>
      <Image
        src="/creek-logo.svg"
        alt="Creekjob logo"
        width={260}
        height={72}
        unoptimized
        className="h-full w-auto max-w-full object-contain object-left"
        priority
      />
    </div>
  );
}
