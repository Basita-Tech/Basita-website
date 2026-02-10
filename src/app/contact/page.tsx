"use client";

import Navigation from "@/homepage/navigation";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    setSubmitError("");

    const nextErrors = {
      name: formData.name.trim() ? "" : "Please enter your full name.",
      email: /\S+@\S+\.\S+/.test(formData.email) ? "" : "Please enter a valid email address.",
      message: formData.message.trim() ? "" : "Please enter your message.",
    };

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setErrors({ name: "", email: "", message: "" });
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form request failed", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    if (isSubmitted) {
      setIsSubmitted(false);
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
    
        <section
          className="relative w-full overflow-hidden bg-green-50 hero-light py-16 md:py-24"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 hero-glow rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 border rounded-full text-sm font-medium inline-flex items-center gap-2 hero-badge">
                  <MessageSquare className="w-4 h-4" />
                  Let&apos;s Connect
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight hero-heading">
                  Get In Touch
                  <span className="block text-transparent bg-clip-text hero-title-gradient">
                    With Our Experts
                  </span>
                </h1>

                <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto hero-text">
                  Let&apos;s discuss how we can help transform your business with cutting-edge solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px opacity-50 hero-divider"></div>
        </section>

     
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <p className="text-gray-600 mb-8">
                    Have a question or want to work together? We&apos;d love to hear from you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:contact@basita.in" className="text-gray-600 hover:text-teal-600 transition">
                        contact@basita.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href="tel:+919879003929" className="text-gray-600 hover:text-teal-600 transition">
                       +91 98790 03929
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600">
                        Ahmedabad, Gujarat<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

          
                <div className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                   
                    <a
                      href="https://www.linkedin.com/company/basita-technology"
                      className="bg-gray-100 hover:bg-teal-100 p-3 rounded-lg transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                  </div>
                </div>
              </div>

              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                          errors.name ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${
                          errors.email ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        aria-invalid={!!errors.message}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none ${
                          errors.message ? "border-red-400" : "border-gray-300"
                        }`}
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {isSubmitted && (
                      <div className="rounded-lg bg-teal-50 border border-teal-200 px-4 py-3 text-sm text-teal-700">
                        Thanks! Your message has been sent. We’ll get back to you soon.
                      </div>
                    )}
                    {submitError && (
                      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
