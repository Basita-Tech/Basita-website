import React, { useState } from "react";
import { Search, Mail, Phone, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContextr } from "../context/AuthContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Footer from "../Footer/Footer";

const colors = {
  maroon: "#800000",
  gold: "#D4A052",
  goldLight: "#E4C48A",
  beige: "#F4EEE4",
  planBg: "#F9F7F5",
  white: "#FFFFFF"
};

const faqData = [
  {
    category: "About Satfera",
    questions: [
      {
        id: "about-1",
        question: "What is Satfera?",
        answer: "Satfera is a trusted matrimonial platform designed exclusively for Gujarati families seeking meaningful, lifelong relationships. Founded by Jisal & Parul Patel, we combine modern technology with traditional values to help you find your perfect life partner. Unlike typical dating apps, Satfera is focused purely on matrimonial connections, ensuring every member shares the same serious intent towards marriage."
      },
      {
        id: "about-2",
        question: "Which communities does Satfera serve?",
        answer: "Satfera is specifically designed for the Gujarati community, serving both Hindu and Jain families. We cater to the following communities: Hindu - Patel, Kadva Patel, and Desai families, as well as Jain - Digambar and Shwetambar communities. Whether you are based in India or are an NRI (Non-Resident Indian) living abroad, Satfera welcomes you to find your match within our trusted community."
      },
      {
        id: "about-3",
        question: "Is Satfera available on mobile?",
        answer: "Yes! Satfera is available on multiple platforms for your convenience. You can access Satfera through our website at satfera.in, download our app from the Google Play Store for Android devices, or get it from the Apple App Store for iOS devices. This means you can search for your life partner anytime, anywhere!"
      },
      {
        id: "about-4",
        question: "What makes Satfera different from other matrimony websites?",
        answer: "At Satfera, we believe in a personalized and secure approach to matchmaking. Every profile is manually verified by our admin team using government ID proof. Your personal contact details are never shared with other users - all communication happens through our admin team. Our smart matching algorithm recommends profiles based on your preferences with compatibility percentages. You can compare up to 5 profiles side-by-side, and our admin team personally coordinates meetings between matched families."
      }
    ]
  },
  {
    category: "Registration & Getting Started",
    questions: [
      {
        id: "reg-1",
        question: "How do I register on Satfera?",
        answer: "Getting started with Satfera is simple! Visit satfera.in or download our mobile app. Click on 'Register' and create your account with basic details. Once registered, log in to your account and you'll be guided through our comprehensive profile forms covering Personal details, Professional information, Health information, Family background, and Partner expectations. After completing all sections, submit your profile for review. Our admin team will verify your details within 24 hours to 2 days."
      },
      {
        id: "reg-2",
        question: "What is the minimum age requirement to register?",
        answer: "Following the legal marriage age in India, the minimum age to register on Satfera is 20 years for women and 21 years for men. This ensures all our members are eligible for marriage as per Indian law."
      },
      {
        id: "reg-3",
        question: "Can my parents or family members create a profile on my behalf?",
        answer: "Absolutely! We understand that in Indian culture, finding a life partner is often a family effort. Profiles can be created by yourself, your parents (for son or daughter), siblings (for brother or sister), or even close friends. We encourage family involvement as it reflects the traditional values we cherish."
      },
      {
        id: "reg-4",
        question: "Why does my profile need admin approval?",
        answer: "Your safety is our top priority! Every profile on Satfera goes through a manual verification process by our admin team. This typically takes 24 hours to 2 days. We verify your submitted ID proof (Aadhaar Card, PAN Card, or Passport) and review your profile information for authenticity. This process ensures that every profile on our platform is genuine, giving you peace of mind while searching for your life partner."
      }
    ]
  },
  {
    category: "Membership & Pricing",
    questions: [
      {
        id: "mem-1",
        question: "Is Satfera free to use?",
        answer: "Satfera is a premium matrimonial service that requires a paid membership. We believe in providing quality over quantity, and our paid model helps us maintain a platform with only serious, verified members who are genuinely looking for marriage. This investment reflects the importance of the life decision you're making."
      },
      {
        id: "mem-2",
        question: "What are the membership plans available?",
        answer: "We offer flexible membership plans to suit your needs: 1 Month Plan at ₹3,000 - Perfect if you want to try our services. 3 Months Plan at ₹5,000 - Our most popular plan with great value. 6 Months Plan at ₹7,000 - Extended time to find your perfect match. 12 Months Plan at ₹9,000 - Best value for comprehensive search. All plans include full access to all features including recommendations, search filters, profile comparison, and admin support."
      },
      {
        id: "mem-3",
        question: "What happens when my membership expires?",
        answer: "When your membership expires, you'll see an expiry notification on your account. Think of it like a Netflix subscription - once expired, you'll need to renew to continue accessing profiles and features. All your data, shortlisted profiles, and preferences remain saved. Simply renew your plan, and you can pick up right where you left off!"
      },
      {
        id: "mem-4",
        question: "What is the refund policy?",
        answer: "Since we invest significant resources in verifying profiles and providing personalized service, we don't have a standard refund policy. However, we understand that exceptional situations may arise. If you have any concerns about your membership, please raise a support ticket through your dashboard or contact our admin team. We review each case individually and do our best to help."
      }
    ]
  },
  {
    category: "Finding Your Match",
    questions: [
      {
        id: "match-1",
        question: "How does the recommendation system work?",
        answer: "Our smart recommendation system is designed to help you find the most compatible matches! During registration, you fill out an 'Expectations' form detailing what you're looking for in a partner. Our algorithm analyzes this information and matches it with other profiles on the platform. Each recommended profile shows a compatibility percentage - the higher the percentage, the more closely the profile matches your preferences. We prioritize showing you profiles with 80% or higher compatibility first!"
      },
      {
        id: "match-2",
        question: "What search filters are available?",
        answer: "Satfera offers comprehensive search filters to help you find exactly what you're looking for. You can filter profiles by: Age Range (18-60 years), Religion (Hindu/Jain), Caste (Patel, Kadva Patel, Desai, Digambar, Shwetambar), Height, Weight, Location (City, State, Country), Education Level, Profession, and Diet Preference (Vegetarian, Non-Vegetarian, Eggetarian, Jain, Swaminarayan). You can also search directly by Name or Profile ID."
      },
      {
        id: "match-3",
        question: "What is the 'Compare Profiles' feature?",
        answer: "This is one of our most loved features! The Compare Profiles feature allows you to view up to 5 profiles side-by-side in a detailed comparison table. You can compare attributes like Age, Height, Weight, Location, Religion, Caste, Education, Profession, and more all at once. This makes it much easier to make an informed decision when you have multiple promising matches. Simply click 'Add to Compare' on any profile."
      },
      {
        id: "match-4",
        question: "How do I save profiles I'm interested in?",
        answer: "You can save any profile to your 'Shortlisted' section by clicking the star icon or 'Add to Shortlist' button on their profile. Think of this as your personal favorites list! All shortlisted profiles are saved for easy access and comparison later. You can view your shortlisted profiles anytime from the 'Shortlisted' section in your dashboard."
      },
      {
        id: "match-5",
        question: "Can I see who viewed my profile?",
        answer: "Yes! Satfera has a 'Profile Views' feature in your dashboard that shows you who has viewed your profile recently. You can see the total number of profile views, views from this week, and a detailed list showing each viewer's name, age, location, profession, and when they viewed your profile. This helps you understand who is interested in your profile and take action accordingly!"
      }
    ]
  },
  {
    category: "Connecting with Matches",
    questions: [
      {
        id: "conn-1",
        question: "How do I express interest in a profile?",
        answer: "When you find a profile you like, simply click the 'Send Request' button on their profile. This sends an interest request to that person, letting them know you'd like to connect. You can track all your sent requests in the 'Requests' section under 'Requests Sent', where you'll see the status of each request - Pending, Accepted, or Rejected. If a request is still pending, you also have the option to 'Withdraw' it if you change your mind."
      },
      {
        id: "conn-2",
        question: "What happens when I receive a request?",
        answer: "When someone sends you an interest request, you'll be notified and can view it in the 'Requests' section under 'Requests Received'. For each request, you can see the sender's profile, their compatibility percentage with you, and their basic details. You have the option to 'Accept' if you're interested or 'Reject' if you're not. Take your time to view their full profile before deciding!"
      },
      {
        id: "conn-3",
        question: "What happens after both parties accept?",
        answer: "When you accept someone's request and they've also accepted yours, it becomes a mutual match! These mutual matches appear in your 'Approved' section. Our admin team steps in to coordinate between both families. The admin will contact both parties and help arrange meetings based on everyone's convenience - whether that's a phone call, video call, or in-person meeting."
      },
      {
        id: "conn-4",
        question: "Why can't I directly contact other users?",
        answer: "At Satfera, your privacy and safety are paramount. Unlike other platforms where your phone number and personal details might be visible to strangers, we keep all contact information strictly confidential. Only our admin team can see these details. When there's a mutual match, our admin acts as a trusted intermediary to coordinate between families - just like a traditional family matchmaker would."
      }
    ]
  },
  {
    category: "Privacy & Safety",
    questions: [
      {
        id: "safety-1",
        question: "How is my personal information protected?",
        answer: "We take your privacy very seriously! Your contact details (phone number, email, address) are never visible to other users - only our admin team can access them for verification and coordination. Your ID proof photo is hidden from other users and used only for verification purposes. You can upload up to 5 profile photos - these are visible to other members, but your ID documents remain confidential. All communication happens through our secure admin coordination system."
      },
      {
        id: "safety-2",
        question: "How do I block someone?",
        answer: "If you encounter someone you'd rather not interact with, you can easily block them. Go to Settings > Privacy & Safety > Block a User. Enter the User ID of the profile you want to block (you can find this ID when viewing their profile). Once blocked, that person cannot view your profile or send you any requests. You can view all blocked users in your 'Blocked Users List' and unblock them if needed. Please note: you can change block status for any profile once every 24 hours."
      },
      {
        id: "safety-3",
        question: "How do I report a suspicious profile?",
        answer: "If you come across any profile that seems fake, inappropriate, or violates our community guidelines, please report it immediately. Go to Settings > Privacy & Safety > Report a Profile. Provide the profile details and reason for reporting. Our admin team will investigate the matter promptly and take appropriate action. Your report helps us maintain a safe and trustworthy community for everyone!"
      },
      {
        id: "safety-4",
        question: "What information is visible on my profile to others?",
        answer: "Other members can see your profile photos (except ID proof photo), personal details like name, age, height, weight, location, religion, caste, education, profession, diet preference, and any dosh information you've declared. However, they CANNOT see your contact number, email address, physical address, or any identification documents. Your privacy is fully protected!"
      }
    ]
  },
  {
    category: "Account Management",
    questions: [
      {
        id: "acc-1",
        question: "How do I manage my notification settings?",
        answer: "Satfera gives you complete control over how you receive updates. Go to Settings > Notification Settings where you can toggle: Email Notifications - Receive updates via email, In-app/Push Notifications - Get alerts on your device, and SMS Notifications - Receive text messages on your phone. Simply turn ON the notifications you want and turn OFF those you don't. You can change these settings anytime."
      },
      {
        id: "acc-2",
        question: "How can I see where my account is logged in?",
        answer: "For your security, you can monitor all devices where your Satfera account is active. Go to Settings > Security > Recent Login Activity. Here you'll see details like the browser/device type, operating system, IP address, and when it was last active. If you see any unfamiliar device, you can click 'Logout' next to it to remove access, or use 'Logout All' to sign out from all devices at once."
      },
      {
        id: "acc-3",
        question: "Can I temporarily pause my profile?",
        answer: "Yes! If you've found a potential match and want to pause your search, or simply need a break, you can deactivate your profile temporarily. Go to Settings and click 'Deactivate Account'. Once deactivated, your profile becomes invisible - you can still log in, but you won't be able to see other profiles. After 24 hours, an 'Activate' option will appear in your settings. Simply click it to reactivate your profile. All your data and preferences remain saved!"
      },
      {
        id: "acc-4",
        question: "How do I permanently delete my account?",
        answer: "If you've found your life partner (congratulations!) or wish to leave Satfera permanently, you can delete your account. Go to Settings and click 'Delete Account'. Please note that this is a PERMANENT action - your account, profile data, shortlisted profiles, and all information will be completely removed from our system and cannot be recovered. If you're unsure, we recommend deactivating instead of deleting."
      }
    ]
  },
  {
    category: "Help & Support",
    questions: [
      {
        id: "help-1",
        question: "How do I contact Satfera support?",
        answer: "We're here to help! You can reach our support team in multiple ways: Through your Dashboard - Go to Settings > Help & Support > Contact Support to chat with our admin team directly. By raising a Ticket - Go to Settings > Help & Support > Your Tickets > Create New Ticket. Select a category (General, Billing, etc.), describe your issue, and submit. You can also find our contact details on the homepage of our website."
      },
      {
        id: "help-2",
        question: "How long does it take to get a response from support?",
        answer: "Our dedicated support team strives to respond to all queries as quickly as possible. For tickets raised through the dashboard, you can expect a response within 24-48 hours. Urgent matters related to billing or account access are prioritized. You can check the status of your ticket anytime in Settings > Help & Support > Your Tickets. We appreciate your patience and are committed to resolving your concerns!"
      },
      {
        id: "help-3",
        question: "Where can I find the Terms & Privacy Policy?",
        answer: "You can access our complete Terms of Service and Privacy Policy by going to Settings > Help & Support > Terms & Privacy Policy. We encourage all members to read these documents to understand how we operate and protect your information. If you have any questions about our policies, please don't hesitate to contact our support team."
      }
    ]
  },
  {
    category: "Additional Information",
    questions: [
      {
        id: "add-1",
        question: "Do I need to fill in astrological details like Kundli?",
        answer: "Satfera does not have a Kundli matching feature on the platform. However, during profile creation, you are required to declare if you have any astrological dosh (like Manglik or others). This information is displayed on your profile so that other members can consider it according to their preferences. Any detailed Kundli matching, if required, can be done by families after connecting through our admin coordination."
      },
      {
        id: "add-2",
        question: "What diet preferences are supported on Satfera?",
        answer: "We understand that dietary preferences are important, especially in our communities. Satfera supports multiple diet options including: Vegetarian, Non-Vegetarian, Eggetarian, Jain (no root vegetables), and Swaminarayan (specific dietary requirements). You can set your own diet preference in your profile and also filter potential matches based on their diet preferences."
      },
      {
        id: "add-3",
        question: "Are there plans for a Success Stories section?",
        answer: "Yes! We are working on adding a Success Stories section to our homepage where couples who found their match through Satfera can share their beautiful journey. Stay tuned for this feature - and if you find your life partner through Satfera, we'd love to hear from you and celebrate your story!"
      }
    ]
  }
];

function FAQCategory({ category, questions }) {
  return (
    <div className="mb-12">
      <h2
        className="text-3xl font-bold mb-6 pb-3 border-b-4"
        style={{ color: colors.maroon, borderColor: colors.gold }}
      >
        {category}
      </h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b last:border-b-0">
              <AccordionTrigger className="px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="text-gray-900 font-semibold text-base sm:text-lg">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(faqData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHighlighted, setLogoHighlighted] = useState(false);
  const [accountNavLoading, setAccountNavLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContextr);

  const handleMyAccount = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (accountNavLoading) return;
    setAccountNavLoading(true);
    try {
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Failed to route My Account click:", err);
      navigate("/login", { replace: true });
    } finally {
      setAccountNavLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredData(faqData);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(lowerQuery) ||
            q.answer.toLowerCase().includes(lowerQuery)
        )
      }))
      .filter((category) => category.questions.length > 0);

    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-beige w-full overflow-x-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 shadow bg-[#ebe9e6]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex justify-between items-center py-3 min-h-20">
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/logo.png"
              alt="Satfera Logo"
              width={220}
              height={220}
              onClick={() => setLogoHighlighted((v) => !v)}
              className={`${
                logoHighlighted ? "border-2 border-[#FFD700] shadow-[0_0_12px_#FFD700]" : ""
              } object-contain rounded-lg transition duration-200 cursor-pointer h-12 sm:h-14 md:h-16 w-auto sm:scale-100 md:scale-125 origin-left`}
            />
          </div>
          <div className="flex">
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 mx-6">
              <a
                href="/"
                className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base"
              >
                About Us
              </a>
              <a
                href="/#membership"
                className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline text-sm lg:text-base"
              >
                Membership
              </a>
              <span className="text-[#800000] font-semibold text-sm lg:text-base cursor-default">
                Contact Us
              </span>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
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

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 rounded-md text-[#800000] bg-transparent hover:bg-[#E4C48A] transition flex-shrink-0 ml-1 sm:ml-2"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-[#ebe9e6] border-t border-[#D4A052] transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-0 px-4 py-2 w-full">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm"
            >
              Home
            </a>
            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm"
            >
              About Us
            </a>
            <a
              href="/#membership"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#800000] hover:text-[#D4A052] font-semibold transition no-underline py-2.5 px-2 border-b border-[#E4C48A] text-sm"
            >
              Membership
            </a>
            <span className="text-[#800000] font-semibold py-2.5 px-2 text-sm cursor-default">
              Contact Us
            </span>
          </nav>
        </div>
      </header>

      {/* FAQ Header Section */}
      <div
        className="py-16 px-4 text-center"
        style={{ backgroundColor: colors.beige }}
      >
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: colors.maroon }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Find Your Lifetime Partner - Your Questions Answered
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search
              size={24}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-maroon"
              style={{ "--tw-ring-color": colors.maroon }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {filteredData.length > 0 ? (
          filteredData.map((category) => (
            <FAQCategory
              key={category.category}
              category={category.category}
              questions={category.questions}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              No results found for "{searchQuery}"
            </p>
            <button
              onClick={() => handleSearch("")}
              className="px-6 py-2 rounded-lg text-white transition-colors"
              style={{ backgroundColor: colors.maroon }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div
        className="py-16 px-4"
        style={{ backgroundColor: colors.planBg }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: colors.maroon }}
          >
            Still Have Questions?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Support */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Mail
                size={48}
                className="mx-auto mb-4"
                style={{ color: colors.maroon }}
              />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Reach out to our support team via email
              </p>
              <a
                href="mailto:support@satfera.in"
                className="inline-block px-6 py-2 rounded-lg text-white font-semibold transition-colors"
                style={{ backgroundColor: colors.maroon }}
              >
                support@satfera.in
              </a>
            </div>

            {/* Phone Support */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Phone
                size={48}
                className="mx-auto mb-4"
                style={{ color: colors.maroon }}
              />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team
              </p>
              <a
                href="tel:+919876543210"
                className="inline-block px-6 py-2 rounded-lg text-white font-semibold transition-colors"
                style={{ backgroundColor: colors.maroon }}
              >
                +91 9925203929
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
