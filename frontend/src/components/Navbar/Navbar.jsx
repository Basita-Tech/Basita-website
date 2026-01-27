import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContextr } from "../context/AuthContext";
import { getOnboardingStatus } from "../../api/auth";

export default function Navbar({ activePage = "" }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContextr);
  const [logoHighlighted, setLogoHighlighted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountNavLoading, setAccountNavLoading] = useState(false);

  const handleMyAccount = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (accountNavLoading) return;
    setAccountNavLoading(true);
    try {
      const onboarding = await getOnboardingStatus();
      const data = onboarding?.data?.data || onboarding?.data || {};
      const completedSteps = Array.isArray(data.completedSteps) ? data.completedSteps : [];
      const isOnboardingCompleted = typeof data.isOnboardingCompleted !== "undefined" ? data.isOnboardingCompleted : completedSteps.length >= 7;
      const steps = ["personal", "family", "education", "profession", "health", "expectation", "photos"];

      if (data.profileReviewStatus === "pending" || data.profileReviewStatus === "rejected") {
        navigate("/onboarding/review", { replace: true });
        return;
      }

      if (completedSteps.length === 7 && !data.profileReviewStatus) {
        navigate("/onboarding/user?step=photos", { replace: true });
        return;
      }

      if (!isOnboardingCompleted) {
        const firstUncompletedStep = steps.find((step) => !completedSteps.includes(step)) || "personal";
        navigate(`/onboarding/user?step=${firstUncompletedStep}`, { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Failed to route My Account click:", err);
      navigate("/login", { replace: true });
    } finally {
      setAccountNavLoading(false);
    }
  };

  const isActive = (page) => activePage === page;

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-nav-bg)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex justify-between items-center py-3 min-h-20">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <img
            src="/logo.png"
            alt="Satfera Logo"
            width={220}
            height={220}
            onClick={() => setLogoHighlighted((v) => !v)}
            className={`${logoHighlighted ? "border-2 border-[var(--brand-highlight)] shadow-[0_0_12px_var(--brand-highlight)]" : ""} object-contain rounded-lg transition duration-200 cursor-pointer h-12 sm:h-14 md:h-16 w-auto sm:scale-100 md:scale-125 origin-left`}
          />
        </div>

        <div className="flex">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 mx-6">
            <Link
              to="/"
              className={`font-semibold transition no-underline text-sm lg:text-base ${
                isActive("home") ? "text-[var(--brand-primary)] border-b-2 border-[var(--brand-primary)]" : "text-[var(--brand-maroon)] hover:text-[var(--brand-primary)]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-semibold transition no-underline text-sm lg:text-base ${
                isActive("about") ? "text-[var(--brand-primary)] border-b-2 border-[var(--brand-primary)]" : "text-[var(--brand-maroon)] hover:text-[var(--brand-primary)]"
              }`}
            >
              About Us
            </Link>
            <a
              href="/#membership"
              className="text-[var(--brand-maroon)] hover:text-[var(--brand-primary)] font-semibold transition no-underline text-sm lg:text-base"
            >
              Membership
            </a>
            <Link
              to="/contact"
              className={`font-semibold transition no-underline text-sm lg:text-base ${
                isActive("contact") ? "text-[var(--brand-primary)] border-b-2 border-[var(--brand-primary)]" : "text-[var(--brand-maroon)] hover:text-[var(--brand-primary)]"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Auth / CTA */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {isAuthenticated ? (
              <button
                onClick={handleMyAccount}
                className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-white bg-[var(--brand-primary)] hover:opacity-90 transition text-xs sm:text-sm lg:text-base whitespace-nowrap"
                disabled={accountNavLoading}
              >
                {accountNavLoading ? "Loading..." : "My Account"}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-[var(--brand-primary)] border border-[var(--brand-primary)] bg-transparent hover:bg-[var(--brand-primary)] hover:text-[var(--brand-maroon)] transition no-underline inline-block text-xs sm:text-sm lg:text-base whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md font-semibold bg-[var(--brand-primary)] text-white hover:opacity-90 transition no-underline inline-block text-xs sm:text-sm lg:text-base whitespace-nowrap"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-md text-[var(--brand-maroon)] bg-transparent hover:bg-[var(--brand-gold)] transition flex-shrink-0 ml-1 sm:ml-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden bg-[var(--brand-nav-bg)] border-t border-[var(--brand-primary)] transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col gap-0 px-4 py-2 w-full">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-semibold transition no-underline py-2.5 px-2 border-b border-[var(--brand-gold)] text-sm ${
              isActive("home") ? "text-[var(--brand-primary)]" : "text-[var(--brand-maroon)] hover:text-[var(--brand-primary)]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-semibold transition no-underline py-2.5 px-2 border-b border-[var(--brand-gold)] text-sm ${
              isActive("about") ? "text-[var(--brand-primary)]" : "text-[var(--brand-maroon)] hover:text-[var(--brand-primary)]"
            }`}
          >
            About Us
          </Link>
          <a
            href="/#membership"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[var(--brand-maroon)] hover:text-[var(--brand-primary)] font-semibold transition no-underline py-2.5 px-2 border-b border-[var(--brand-gold)] text-sm"
          >
            Membership
          </a>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-semibold transition no-underline py-2.5 px-2 text-sm ${
              isActive("contact") ? "text-[var(--brand-primary)]" : "text-[var(--brand-maroon)] hover:text-[var(--brand-primary)]"
            }`}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
