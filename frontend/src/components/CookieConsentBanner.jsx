import { useEffect, useState } from "react";
import { initGA } from "./analytics/ga4";
import { CONSENT_KEY, setConsent } from "./analytics/consent";

const CookieIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
    <path d="M8.5 8.5v.01" />
    <path d="M16 15.5v.01" />
    <path d="M12 12v.01" />
    <path d="M11 17v.01" />
    <path d="M7 14v.01" />
  </svg>
);

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);

    if (!consent) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 100);
    }
  }, []);

  const handleAction = (type) => {
    setAnimate(false);

    setTimeout(() => {
      setConsent(type);
      if (type === "accepted") {
        initGA();
      }
      setVisible(false);
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent"
      className={`
        fixed z-50 transition-all duration-500 ease-in-out
        bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6
        max-w-md w-full
        ${animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
      `}
    >
      <div className="bg-neutral-900/95 backdrop-blur-md border border-white/10 text-neutral-200 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="bg-neutral-800 p-2 rounded-full h-fit shrink-0 text-[var(--brand-primary)]">
            <CookieIcon className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-white text-lg leading-none">
              We value your privacy
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We use cookies to enhance your browsing experience, serve
              personalized content, and analyze our traffic.{" "}
              <a
                href="/privacy"
                className="underline hover:text-[var(--brand-primary)] transition-colors"
              >
                Read our Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => handleAction("rejected")}
            className="flex-1 px-4 py-2.5 rounded-lg text-black text-sm font-medium  transition-colors focus:outline-none focus:ring-2 hover:bg-[var(--brand-primary-hover-light)] hover:scale-[1.02]"
          >
            Decline
          </button>
          <button
            onClick={() => handleAction("accepted")}
            className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--brand-primary)] text-black text-sm font-bold shadow-lg shadow-orange-900/20 hover:bg-[var(--brand-primary-hover-light)] hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
