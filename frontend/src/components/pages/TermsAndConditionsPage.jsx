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
              <Link to="/contact" className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base">
                Contact Us
              </Link>
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
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 text-sm">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Terms of Service Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-10">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-700 text-base leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">Introduction</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Satfera is a matrimonial platform operated by Jisal &amp; Parul Patel</li>
              <li>Designed exclusively for Gujarati families seeking meaningful, lifelong relationships</li>
              <li>This platform is strictly for matrimonial purposes only — NOT a dating website</li>
              <li>By using Satfera, you agree to be bound by these Terms of Service</li>
              <li>If you do not agree to these terms, please do not use our platform</li>
            </ul>
          </section>

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using the SATFERA matrimony platform (the "Service"), you accept and agree to be bound by and comply with these Terms and Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">2. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Women must be at least 20 years of age</li>
              <li>Men must be at least 21 years of age</li>
              <li>
                You must belong to one of the following communities:
                <ul className="list-disc pl-6 mt-2">
                  <li>Hindu: Patel, Kadva Patel, Desai-Patel</li>
                  <li>Jain: Digambar, Shwetambar</li>
                </ul>
              </li>
              <li>You must be a Gujarati residing in India or an NRI (Non-Resident Indian)</li>
              <li>You must be legally eligible to marry and not currently married (unless divorced or widowed)</li>
              <li>Divorced, widowed, and separated individuals are welcome to register</li>
              <li>You must have genuine intent to find a life partner for marriage</li>
            </ul>
          </section>

          {/* Registration & Verification */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">3. Registration & Verification</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Register by visiting satfera.com and creating an account</li>
              <li>Complete profile forms covering:
                <ul className="list-disc pl-6 mt-2">
                  <li>Personal details & Educational background</li>
                  <li>Professional information & Health information</li>
                  <li>Family background & Partner expectations</li>
                </ul>
              </li>
              <li>Upload required photos:
                <ul className="list-disc pl-6 mt-2">
                  <li>One closer photo, one family photo, one normal photo, and two optional photos</li>
                </ul>
              </li>
              <li>Submit valid government ID proof (Aadhaar Card, PAN Card, or Passport)</li>
              <li>Admin team will verify your profile within 24 hours to 2 days</li>
              <li>Satfera reserves the right to reject profiles that do not meet verification standards</li>
            </ul>
          </section>

          {/* Membership */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">4. Membership</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Currently, Satfera is completely FREE to use</li>
              <li>Future plans: 1 Month, 3 Months, 6 Months, and 12 Months membership options</li>
              <li>All users will be notified before any paid plans are introduced</li>
              <li>When membership expires, renew to continue using premium features</li>
              <li>All your data, shortlisted profiles, and preferences remain saved after expiry</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">5. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information in your profile</li>
              <li>Use the platform with genuine intent to find a life partner</li>
              <li>Treat all members with respect and dignity</li>
              <li>Maintain only one account per person</li>
              <li>Disclose health conditions honestly during registration</li>
              <li>Update your profile if any details change</li>
              <li>Keep your login credentials secure and do not share with others</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">6. Prohibited Activities</h2>
            <p className="mb-3">The following activities are strictly prohibited and may result in permanent ban:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing fake or false information — user will be reported and permanently banned</li>
              <li>Creating multiple accounts for the same person</li>
              <li>Harassment, abusive language, or threatening behavior</li>
              <li>Using the platform for dating or casual relationships</li>
              <li>Commercial activities, advertising, or solicitation</li>
              <li>Uploading obscene, inappropriate, or offensive content</li>
              <li>Financial transactions with prospects before marriage</li>
              <li>Impersonating another person or creating fake profiles</li>
              <li>Any activity that violates applicable laws</li>
            </ul>
          </section>

          {/* Profile Visibility & Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">7. Profile Visibility & Contact</h2>
            <p className="mb-3"><strong>Visible to all members:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Profile photos (except ID proof photo), name, age, height, weight, city</li>
              <li>Religion, caste, education, profession, diet preference</li>
              <li>Partner expectations and dosh information</li>
            </ul>
            <p className="mb-3"><strong>Visible only after mutual acceptance:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Phone number, email address, full residential address</li>
            </ul>
            <p><strong>Never visible to other members:</strong></p>
            <ul className="list-disc pl-6">
              <li>ID proof documents (Aadhaar, PAN, Passport) — admin access only</li>
            </ul>
          </section>

          {/* Blocking & Reporting */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">8. Blocking & Reporting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Block any user from Settings &gt; Privacy &amp; Safety &gt; Block a User</li>
              <li>Blocked users cannot view your profile or send you requests</li>
              <li>You can change block status once every 24 hours</li>
              <li>Report suspicious profiles from Settings &gt; Privacy &amp; Safety &gt; Report a Profile</li>
              <li>Admin team will investigate and take appropriate action</li>
            </ul>
          </section>

          {/* Marriage Finalization */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">9. Marriage Finalization</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>If your marriage is finalized, you must inform Satfera</li>
              <li>Delete or deactivate your account after marriage finalization</li>
              <li>This helps maintain an active and genuine member base</li>
            </ul>
          </section>

          {/* Account Deactivation & Deletion */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">10. Account Deactivation & Deletion</h2>
            <p className="mb-3"><strong>Deactivation (Temporary):</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Go to Settings &gt; Deactivate Account</li>
              <li>Your profile becomes invisible but data is preserved</li>
              <li>You can reactivate after 24 hours</li>
            </ul>
            <p className="mb-3"><strong>Deletion (Permanent):</strong></p>
            <ul className="list-disc pl-6">
              <li>Go to Settings &gt; Delete Account</li>
              <li>All your data will be permanently removed</li>
              <li>This action cannot be undone</li>
            </ul>
          </section>

          {/* Termination by Satfera */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">11. Termination by Satfera</h2>
            <p className="mb-3">Satfera reserves the right to suspend or terminate your account without prior notice for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violation of these Terms of Service</li>
              <li>Providing false or misleading information</li>
              <li>Engaging in prohibited activities</li>
              <li>Complaints from other members regarding misconduct</li>
              <li>Any activity harmful to the platform or its members</li>
            </ul>
          </section>

          {/* Disclaimer & Liability */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">12. Disclaimer & Liability</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Satfera does not guarantee that you will find a suitable match</li>
              <li>Verify all information independently before proceeding with any match</li>
              <li>Do not share bank account or financial details with prospects</li>
              <li>All decisions and actions are at user's own risk</li>
              <li>Satfera is not liable for any loss, fraud, or damages arising from interactions</li>
              <li>The platform is provided 'as is' without warranties of any kind</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">13. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All content on Satfera (text, graphics, logos, design) is owned by Satfera</li>
              <li>You may not reproduce, distribute, or create derivative works without permission</li>
              <li>By uploading content, you grant Satfera license to use it for providing services</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">14. Changes to Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Satfera may update these Terms at any time</li>
              <li>Users will be notified of significant changes via email or platform notification</li>
              <li>Continued use of the platform constitutes acceptance of updated terms</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
