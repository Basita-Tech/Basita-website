import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import { AuthContextr } from "../context/AuthContext";
import { getOnboardingStatus } from "../../api/auth";
import Footer from "../Footer/Footer";

const colors = {
  maroon: "#800000",
  gold: "#D4A052",
  goldLight: "#E4C48A",
  beige: "#F4EEE4",
  white: "#FFFFFF"
};

const ContactPage = () => {
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

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F9F7F5]">
      {/* Home Navbar */}
      <header className="sticky top-0 z-50 shadow bg-[#ebe9e6]">
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
              <a href="/about" className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base">
                About Us
              </a>
              <a href="/contact" className="text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base border-b-2 border-[#D4A052]">
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
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm">
              About Us
            </a>
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 text-sm">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-[#F4EEE4] to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#800000] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700">
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[#D4A052]">
              <div className="w-16 h-16 bg-[#E4C48A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#800000]" />
              </div>
              <h3 className="text-xl font-bold text-[#800000] mb-4">Email Us</h3>
              <a 
                href="mailto:support@satfera.in" 
                className="text-gray-700 hover:text-[#D4A052] transition-colors text-lg font-medium break-all"
              >
                support@satfera.in
              </a>
              <p className="text-sm text-gray-500 mt-4">
                We'll respond within 24 hours
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[#D4A052]">
              <div className="w-16 h-16 bg-[#E4C48A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[#800000]" />
              </div>
              <h3 className="text-xl font-bold text-[#800000] mb-4">Call Us</h3>
              <a 
                href="tel:+919925203929" 
                className="text-gray-700 hover:text-[#D4A052] transition-colors text-lg font-medium"
              >
                +91 9925203929
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Mon-Sat, 9:00 AM - 6:00 PM IST
              </p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[#D4A052]">
              <div className="w-16 h-16 bg-[#E4C48A] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-[#800000]" />
              </div>
              <h3 className="text-xl font-bold text-[#800000] mb-4">Visit Us</h3>
              <p className="text-gray-700 text-lg font-medium mb-2">
                Ahmedabad, India
              </p>
              <a 
                href="https://www.google.com/maps/place/Ahmedabad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-[#D4A052] hover:underline mt-4 inline-block"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-gradient-to-r from-[#800000] to-[#A52A2A] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our support team is ready to help you find your perfect match. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@satfera.in"
                className="px-8 py-3 bg-white text-[#800000] rounded-full font-semibold hover:bg-[#E4C48A] transition"
              >
                Send Email
              </a>
              <a 
                href="tel:+919925203929"
                className="px-8 py-3 bg-[#D4A052] text-white rounded-full font-semibold hover:opacity-90 transition"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
