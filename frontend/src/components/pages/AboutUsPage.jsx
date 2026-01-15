import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Target, Award, Mail, Phone, MapPin } from "lucide-react";
import Footer from "../Footer/Footer";
import HomeNavbar from "../HomeNavbar";

const colors = {
  maroon: "#800000",
  gold: "#D4A052",
  goldLight: "#E4C48A",
  beige: "#F4EEE4",
  planBg: "#F9F7F5",
  white: "#FFFFFF"
};

const AboutUsPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-beige">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#800000] to-[#600000] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Satfera</h1>
          <p className="text-xl text-[#E4C48A] max-w-3xl mx-auto">
            Bringing together hearts with values, respect, and the promise of meaningful connections
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#800000] mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-4">
                Satfera was founded with a simple yet profound mission: to revolutionize the way people find meaningful relationships in our modern world. We believe that finding the right partner isn't just about chance—it's about connecting with someone who shares your values, dreams, and vision for life.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Our platform was created by Jisal and Parul Patel, two visionaries who understood the challenges of traditional matrimony services and wanted to build something better. With a deep commitment to privacy, security, and authentic connections, Satfera has become a trusted platform for thousands of individuals seeking their perfect match.
              </p>
              <p className="text-gray-600 text-lg">
                We're not just a matrimony platform—we're your trusted companion in one of life's most important journeys.
              </p>
            </div>
            <div className="bg-[#F9F7F5] rounded-2xl p-8 flex items-center justify-center h-64">
              <Heart className="w-24 h-24 text-[#D4A052]" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-[#F9F7F5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#800000] mb-16 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Trust & Transparency",
                description: "We believe in complete transparency and have implemented robust verification processes to ensure genuine connections. Your trust is our most valuable asset."
              },
              {
                icon: Target,
                title: "Meaningful Matches",
                description: "Our advanced algorithm considers personality, values, and compatibility—not just demographics. We're committed to quality over quantity."
              },
              {
                icon: Award,
                title: "Privacy & Security",
                description: "Your personal information is sacred. We use enterprise-grade encryption and never share your data with third parties without consent."
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#E4C48A]">
                  <Icon className="w-16 h-16 text-[#D4A052] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#800000] mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#800000] mb-16 text-center">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Jisal Patel",
                role: "Co-founder & CEO",
                description: "With a passion for technology and human connection, Jisal leads Satfera's vision with innovation and integrity."
              },
              {
                name: "Parul Patel",
                role: "Co-founder & Creative Director",
                description: "Parul's dedication to creating meaningful user experiences has shaped Satfera into the compassionate platform it is today."
              }
            ].map((founder, index) => (
              <div key={index} className="bg-[#F9F7F5] rounded-2xl p-8 text-center">
                <div className="w-32 h-32 bg-[#E4C48A] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-16 h-16 text-[#800000]" />
                </div>
                <h3 className="text-2xl font-bold text-[#800000] mb-2">{founder.name}</h3>
                <p className="text-[#D4A052] font-semibold mb-4">{founder.role}</p>
                <p className="text-gray-600">{founder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-[#F9F7F5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#800000] mb-16 text-center">Why Choose Satfera?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Verified profiles with genuine users",
              "Advanced matching algorithm based on values and compatibility",
              "24/7 customer support and community moderation",
              "Mobile-first design for convenience",
              "Premium features for enhanced experience",
              "Success stories from thousands of happy couples",
              "Regular safety workshops and relationship tips",
              "Completely private and confidential platform"
            ].map((reason, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#D4A052] text-white">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#800000]">{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#F4EEE4] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-[#800000] mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of individuals who have found meaningful relationships through Satfera.
          </p>
          <Link to="/signup" className="bg-[#D4A052] px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition no-underline inline-block">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#800000] mb-16 text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "support@satfera.in",
                href: "mailto:support@satfera.in"
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+91 9925203929",
                href: "tel:+919925203929"
              },
              {
                icon: MapPin,
                title: "Address",
                value: "Ahmedabad, India",
                href: "https://www.google.com/maps/place/Ahmedabad"
              }
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <a key={index} href={contact.href} target={contact.title === "Address" ? "_blank" : undefined} rel={contact.title === "Address" ? "noopener noreferrer" : undefined} className="bg-[#F9F7F5] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                  <Icon className="w-12 h-12 text-[#D4A052] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#800000] mb-2">{contact.title}</h3>
                  <p className="text-gray-600 hover:text-[#D4A052] transition">{contact.value}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
