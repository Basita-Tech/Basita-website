import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContextr } from "../context/AuthContext";
import { Heart, Mail, Phone } from "lucide-react";
import weddingCoupleImage from "../../assets/wedding.png";
import couple1 from "../../assets/couple1.png";
import couple2 from "../../assets/couple2.png";
import couple3 from "../../assets/couple3.png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { getOnboardingStatus, getProfileReviewStatus } from "../../api/auth";
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
const featuredProfiles = [{
  id: 1,
  name: "Amit & Priya",
  age: "26 & 24 yrs",
  location: "Bangalore",
  img: couple1
}, {
  id: 2,
  name: "Rahul & Anjali",
  age: "29 & 27 yrs",
  location: "Mumbai",
  img: couple2
}, {
  id: 3,
  name: "Vikram & Neha",
  age: "31 & 28 yrs",
  location: "Delhi",
  img: couple3
}];
const successStories = [{
  id: 1,
  name: "Rohan & Sneha",
  story: "Met through Satfera, now happily married!",
  img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80"
}, {
  id: 2,
  name: "Aakash & Meera",
  story: "Found true love and companionship.",
  img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
}];
export default function HomePage() {
  const navigate = useNavigate();
  const {
    isAuthenticated
  } = useContext(AuthContextr);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
   
    if (isAuthenticated) {
      
      try {
        const onboarding = await getOnboardingStatus();
        const data = onboarding?.data?.data || onboarding?.data || {};
        const completedSteps = Array.isArray(data.completedSteps) ? data.completedSteps : [];
        const isOnboardingCompleted = typeof data.isOnboardingCompleted !== "undefined" ? data.isOnboardingCompleted : completedSteps.length >= 7;
        const steps = ["personal", "family", "education", "profession", "health", "expectation", "photos"];
        
        
        if (data.profileReviewStatus === "pending" || data.profileReviewStatus === "rejected") {
          navigate("/onboarding/review");
          return;
        }
        
        
        if (completedSteps.length === 7 && !data.profileReviewStatus) {
          navigate("/onboarding/user?step=photos");
          return;
        }
        
        if (!isOnboardingCompleted) {
          const firstUncompletedStep = steps.find(step => !completedSteps.includes(step)) || "personal";
          navigate(`/onboarding/user?step=${firstUncompletedStep}`);
          return;
        }
        
        
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to get onboarding status:", err);
       
        navigate("/dashboard");
      }
    } else {
      
      navigate("/signup");
    }
  };
  
  return <div className="min-h-screen w-full overflow-x-hidden bg-beige">
      <HomeNavbar />
      {}
      <section id="hero" className="relative flex items-center justify-center h-[450px] md:h-[600px] w-full overflow-hidden">
        <img src={weddingCoupleImage} alt="Wedding Couple" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4">
            Find Your Perfect Life Partner
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6">
            Join millions of people on India's most trusted matrimony platform
          </p>

          {}
          <div className="bg-[#FFFFFF] rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6 max-w-3xl mx-auto border border-[#E4C48A]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4">
              <select className="border-2 border-[#E4C48A] rounded-md p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-[#D4A052] bg-white">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select className="border-2 border-[#E4C48A] rounded-md p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-[#D4A052] bg-white">
                <option>Age</option>
                <option>20-25</option>
                <option>26-30</option>
                <option>31-35</option>
                <option>36-40</option>
              </select>
              <select className="border-2 border-[#E4C48A] rounded-md p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:border-[#D4A052] bg-white">
                <option>Religion</option>
                <option>Hindu</option>
                <option>Jain</option>
              </select>
              <button 
                onClick={handleSearch}
                className="bg-[#D4A052] text-white rounded-md font-semibold hover:opacity-90 transition py-2.5 sm:py-3 text-sm sm:text-base"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="featured-profiles" className="py-24 bg-[#F4EEE4]">
        {" "}
        {}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#800000] mb-14">
            Featured Profiles
          </h2>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProfiles.map(p => <div key={p.id} className="rounded-3xl shadow-2xl bg-white border border-[#E4C48A] overflow-hidden hover:shadow-3xl hover:scale-[1.04] transition-transform duration-300">
                {}
                <div className="w-full h-96 overflow-hidden">
                  {" "}
                  {}
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-[#800000] text-xl">{p.name}</h3>
                  <p className="text-gray-600 text-base">
                    {p.age} | {p.location}
                  </p>
                  <button onClick={handleSearch} className="mt-6 w-full bg-[#D4A052] text-white py-3 rounded-md font-semibold hover:opacity-90 transition">
                    View Profile
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {}
      <section id="membership" className="py-20 bg-[#F9F7F5]">
        {" "}
        {}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#800000] mb-4">
            Membership Plans
          </h2>
          <p className="text-gray-700 mb-12">
            Choose a plan that fits your needs and start connecting with your
            perfect match today.
          </p>

          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            title: "Basic",
            desc: "Free access to basic features. Browse profiles and send limited interest requests."
          }, {
            title: "Premium",
            desc: "Full access including messaging, profile highlights, and priority support."
          }, {
            title: "Gold",
            desc: "Includes Premium + personalized matchmaking recommendations."
          }, {
            title: "Platinum",
            desc: "All features + VIP support, spotlight profile, and premium visibility."
          }].map((plan, i) => <div key={i} className="bg-white rounded-2xl shadow-lg border border-[#E4C48A] p-8 hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-3 text-[#800000]">
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">{plan.desc}</p>
                <button onClick={handleSearch} className="bg-[#D4A052] text-white w-full py-3 rounded-md font-semibold hover:opacity-90 transition">
                  Select
                </button>
              </div>)}
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-[#F4EEE4] text-center">
        <h2 className="text-3xl font-bold text-[#800000] mb-6">
          Your Perfect Match Awaits
        </h2>
        <button onClick={handleSearch} className="bg-[#D4A052] px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition no-underline inline-block">
          Register Free Now
        </button>
      </section>

      {}
      <Footer />
    </div>;
}