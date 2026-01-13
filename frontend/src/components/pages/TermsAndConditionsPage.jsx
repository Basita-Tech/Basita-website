import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContextr } from "../context/AuthContext";
import { getOnboardingStatus } from "../../api/auth";
import Footer from "../Footer/Footer";

export default function TermsAndConditionsPage() {
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
      const isOnboardingCompleted = typeof data.isOnboardingCompleted !== "undefined" ? data.isOnboardingCompleted : completedSteps.length >= 6;
      const steps = ["personal", "family", "education", "profession", "health", "expectation", "photos"];

      if (!isOnboardingCompleted || !data.profileReviewStatus) {
        const firstUncompletedStep = steps.find((step) => !completedSteps.includes(step)) || "personal";
        navigate(`/onboarding/user?step=${firstUncompletedStep}`, { replace: true });
        return;
      } else if (data.profileReviewStatus === "pending" || data.profileReviewStatus === "rejected") {
        navigate("/onboarding/review", { replace: true });
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

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-beige">
      {/* Home Navbar */}
      <header className="sticky top-0 z-50 bg-[#ebe9e6]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex justify-between items-center py-3 min-h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/logo.png"
              alt="Satfera Logo"
              width={220}
              height={220}
              onClick={() => setLogoHighlighted((v) => !v)}
              className={`${logoHighlighted ? "border-2 border-[#FFD700] shadow-[0_0_12px_#FFD700]" : ""} object-contain rounded-lg transition duration-200 cursor-pointer h-12 sm:h-14 md:h-16 w-auto sm:scale-100 md:scale-125 origin-left`}
            />
          </div>

          <div className="flex">
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 mx-6">
              <a href="/" className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base">
                Home
              </a>
              <a href="/#membership" className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base">
                Membership
              </a>
              <a href="/#success-stories" className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base">
                Success Stories
              </a>
              <a href="/#contact" className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base">
                Contact
              </a>
            </nav>

            {/* Auth / CTA */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {isAuthenticated ? (
                <button
                  onClick={handleMyAccount}
                  className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-[#FFFFFF] bg-[#D4A052] hover:opacity-90 transition text-xs sm:text-sm lg:text-base whitespace-nowrap"
                  disabled={accountNavLoading}
                >
                  {accountNavLoading ? "Loading..." : "My Account"}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-[#D4A052] border border-[#D4A052] bg-transparent hover:bg-[#D4A052] hover:text-[#800000] transition no-underline inline-block text-xs sm:text-sm lg:text-base whitespace-nowrap"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md font-semibold bg-[#D4A052] text-white hover:opacity-90 transition no-underline inline-block text-xs sm:text-sm lg:text-base whitespace-nowrap"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 rounded-md text-[#800000] bg-transparent hover:bg-[#E4C48A] transition flex-shrink-0 ml-1 sm:ml-2"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden bg-[#ebe9e6] border-t border-[#D4A052] transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="flex flex-col gap-0 px-4 py-2 w-full">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm">
              Home
            </a>
            <a href="/#membership" onClick={() => setMobileMenuOpen(false)} className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm">
              Membership
            </a>
            <a href="/#success-stories" onClick={() => setMobileMenuOpen(false)} className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm">
              Success Stories
            </a>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 text-sm">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Terms & Conditions Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mb-3">Terms & Conditions</h1>
        <p className="text-sm text-gray-600 mb-10">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700 text-base leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using the SATFERA matrimony platform (the "Service"), you accept and agree to be bound by and comply with these Terms and Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years of age to use this Service.</li>
              <li>You are responsible for maintaining the confidentiality of your account and password.</li>
              <li>You agree not to provide false, inaccurate, or misleading information.</li>
              <li>You agree not to use the Service for any unlawful or prohibited purpose.</li>
              <li>All information provided must be truthful, accurate, and current.</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">3. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Harass, threaten, or abuse other users.</li>
              <li>Post offensive, vulgar, or inappropriate content.</li>
              <li>Attempt to manipulate or deceive other users.</li>
              <li>Use automated tools or bots to access the Service.</li>
              <li>Share another person's account or personal information without consent.</li>
              <li>Violate any applicable laws or regulations.</li>
              <li>Spam, scam, or engage in fraudulent activities.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">4. Intellectual Property Rights</h2>
            <p>
              All content on the SATFERA platform, including logos, designs, text, and images, is the property of SATFERA or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without prior written permission from SATFERA.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, SATFERA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses arising from your use or inability to use the Service.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">6. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites. SATFERA is not responsible for the content, accuracy, or practices of external sites. Your use of third-party sites is at your own risk and subject to their terms and conditions.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">7. Termination</h2>
            <p>
              SATFERA reserves the right to suspend or terminate your account at any time if you violate these terms, engage in prohibited activities, or for any reason at SATFERA's discretion. Upon termination, your access to the Service will be immediately revoked.
            </p>
          </section>

          {/* Modifications to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">8. Modifications to Terms</h2>
            <p>
              SATFERA reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes your acceptance of the modified terms. We recommend checking this page periodically for updates.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">9. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
            </p>
            <p className="mt-3">
              <strong>Email:</strong> <a href="mailto:support@satfera.com" className="text-[#D4A052] hover:underline">support@satfera.com</a>
              <br />
              <strong>Phone:</strong> <a href="tel:+919925203929" className="text-[#D4A052] hover:underline">+91 9925203929</a>
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">10. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in India.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
