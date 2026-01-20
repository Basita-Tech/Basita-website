import React from "react";
import Footer from "../Footer/Footer";
import HomeNavbar from "../HomeNavbar";
import SEO from "../SEO";

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-beige">
      <SEO
        title="Terms & Conditions | Satfera Matrimony"
        description="Read Satfera’s terms and conditions for using the platform."
        path="/terms"
      />

      <HomeNavbar />

      {/* Terms Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mb-3">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-600 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            By registering on <strong>SATFERA</strong>, you give us permission
            to use your photos, profile details, and other shared information on
            our website, mobile application, and for sharing with suitable
            profiles for matchmaking purposes.
          </p>
          <p>
            You confirm that all personal details provided by you, including
            name, age, contact number, education, financial details, and any
            other information, are true, correct, and updated.
          </p>
          <p>
            <strong>SATFERA</strong> is only a matchmaking platform. We do not
            guarantee marriage, engagement, or confirmation of any relationship.
          </p>
          <p>
            If you are interested in any profile, it is your sole responsibility
            to verify their past, present, financial capacity, family
            background, and other necessary details before making any decision.
            SATFERA is not responsible for the authenticity of users' claims.
          </p>
          <p>
            SATFERA will not be held responsible for any issues, disputes,
            frauds, or misunderstandings arising after marriage, engagement, or
            any personal interactions. We cannot interfere in the personal life
            of any member.
          </p>
          <p>
            SATFERA strongly advises all members to exercise caution, conduct
            independent verification, and use their own judgment before sharing
            personal, financial, or sensitive information with other members.
          </p>
          <p>
            SATFERA does not conduct criminal background checks or financial
            verifications of its members. Users are responsible for due
            diligence.
          </p>
          <p>
            SATFERA will not be liable for any loss, damage, fraud, or
            emotional/financial harm arising out of interactions with other
            members.
          </p>
          <p>
            Membership fees or charges paid to SATFERA are non-refundable under
            any circumstances.
          </p>
          <p>
            By using SATFERA, you agree to abide by our Terms & Conditions and
            Privacy Policy.
          </p>

          <section className="mt-8 pt-8 border-t border-gray-300">
            <h2 className="text-2xl font-bold text-[#800000] mb-4">
              Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions about these Terms & Conditions, please
              contact us at:
            </p>
            <div className="ml-4 space-y-1">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@satfera.in"
                  className="text-[#D4A052] hover:underline"
                >
                  support@satfera.in
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+919925203929"
                  className="text-[#D4A052] hover:underline"
                >
                  +91 9925203929
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
