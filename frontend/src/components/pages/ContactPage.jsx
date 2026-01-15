import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../Footer/Footer";
import HomeNavbar from "../HomeNavbar";

const colors = {
  maroon: "#800000",
  gold: "#D4A052",
  goldLight: "#E4C48A",
  beige: "#F4EEE4",
  white: "#FFFFFF"
};

const ContactPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F9F7F5]">
      <HomeNavbar />

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
