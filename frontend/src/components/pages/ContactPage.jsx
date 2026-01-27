import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../Footer/Footer";
import HomeNavbar from "../HomeNavbar";
import SEO from "../SEO";

const colors = {
  maroon: "var(--brand-maroon)",
  gold: "var(--brand-primary)",
  goldLight: "var(--brand-gold)",
  beige: "var(--brand-bg-beige)",
  white: "var(--app-white)",
};

const ContactPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--brand-bg)]">
     <SEO
        title="Contact Satfera | Matrimony Support & Help"
        description="Get in touch with Satfera for matrimony support, inquiries, or assistance."
        path="/contact"
      />

      <HomeNavbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-[var(--brand-bg-beige)] to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-maroon)] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700">
            We're here to help! Reach out to us through any of the channels
            below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[var(--brand-primary)]">
              <div className="w-16 h-16 bg-[var(--brand-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[var(--brand-maroon)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-maroon)] mb-4">
                Email Us
              </h3>
              <a
                href="mailto:support@satfera.com"
                className="text-gray-700 hover:text-[var(--brand-primary)] transition-colors text-lg font-medium break-all"
              >
                support@satfera.com
              </a>
              <p className="text-sm text-gray-500 mt-4">
                We'll respond within 24 hours
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[var(--brand-primary)]">
              <div className="w-16 h-16 bg-[var(--brand-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[var(--brand-maroon)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-maroon)] mb-4">Call Us</h3>
              <a
                href="tel:+919879003964"
                className="text-gray-700 hover:text-[var(--brand-primary)] transition-colors text-lg font-medium"
              >
                +91 9879003964
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Mon-Sat, 9:00 AM - 6:00 PM IST
              </p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-t-4 border-[var(--brand-primary)]">
              <div className="w-16 h-16 bg-[var(--brand-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-[var(--brand-maroon)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--brand-maroon)] mb-4">
                Visit Us
              </h3>
              <p className="text-gray-700 text-lg font-medium mb-2">
                Ahmedabad, India
              </p>
              <span className="text-sm text-gray-500 mt-4 inline-block">
                Ahmedabad, Gujarat
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
