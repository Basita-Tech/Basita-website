import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/http";
import SEO from "../SEO";
const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, mobile } = location.state || {};
  const [userData, setUserData] = useState({
    name: name || "",
    email: email || "",
    mobile: mobile || "",
  });
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const me = await axios.get(`${API}/auth/me`, {
          withCredentials: true,
        });

        // If user is authenticated, check their profile status
        if (me?.data?.success) {
          const user = me.data.data;

          // Check if onboarding is completed
          if (user?.isOnboardingCompleted) {
            // Check if profile is approved (handle both isApproved and profileReviewStatus)
            const isApproved =
              user?.isApproved === true ||
              user?.profileReviewStatus === "approved";

            if (isApproved) {
              // Profile is approved, redirect to dashboard
              navigate("/userdashboard", { replace: true });
            } else {
              // Profile is pending approval, redirect to review page
              navigate("/onboarding/review", { replace: true });
            }
          } else {
            // Onboarding not completed, go to onboarding
            navigate("/onboarding/user", { replace: true });
          }
          return;
        }
      } catch (err) {
        // User not authenticated or error occurred
        if (err?.response?.status === 401) {
          // Not authenticated, check if we have state data
          if (!userData.name && !userData.email && !userData.mobile) {
            navigate("/signup");
          }
        }
      }
    };

    if (!userData.name && !userData.email && !userData.mobile) {
      checkAuthAndRedirect();
    }
  }, [userData, navigate]);
  const handleCompleteProfile = () => {
    navigate("/onboarding/user", {
      state: userData,
    });
  };
  const handleSkip = () => {
    navigate("/");
  };
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div
        className="shadow-xl rounded-3xl max-w-lg w-full p-8 md:p-10 text-center"
        style={{
          backgroundColor: "#FBFAF7",
        }}
      >
        <SEO
          title="Registration Successful | Satfera"
          description="You have successfully joined Satfera."
          noIndex
        />

        {}
        <div className="flex items-center justify-center mb-6">
          <img
            src="/logo.png"
            alt="Satfera"
            className="h-20 md:h-24 w-auto drop-shadow-sm"
            style={{
              filter: "brightness(1) saturate(1)",
            }}
            loading="lazy"
          />
        </div>

        {}
        <div className="mb-6">
          <div
            className="inline-flex p-4 rounded-full"
            style={{
              backgroundColor: "var(--brand-bg-welcome)",
            }}
          >
            <i
              className="bi bi-check-circle-fill text-4xl"
              style={{
                color: "var(--brand-primary)",
              }}
            ></i>
          </div>
        </div>

        {}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome, {userData?.name}!
          </h2>
          <h3 className="text-[var(--brand-primary)] font-semibold mb-2">
            Account Created Successfully!
          </h3>
          <p className="text-gray-600">
            Your account is now active with Satfera. Let’s complete your profile
            to find the best matches.
          </p>
        </div>

        {}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleCompleteProfile}
            style={{
              backgroundColor: "var(--brand-primary)",
            }}
            className="hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
          >
            Complete Profile <i className="bi bi-arrow-right"></i>
          </button>
          <button
            onClick={handleSkip}
            className="border-2 border-[var(--brand-primary)] bg-white text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white py-3 rounded-lg transition-all font-semibold shadow-sm"
          >
            Skip for Now
          </button>
        </div>

        {}
        <div className="text-left p-4 bg-white/70 rounded-lg shadow-inner mb-4 max-h-64 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-2">
            Next Steps to Complete Your Profile:
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Full Name:</strong> {userData.name}
            </li>
            <li>
              <strong>Email:</strong> {userData.email || "Not Provided"}
            </li>
            <li>
              <strong>Mobile:</strong>{" "}
              {userData.mobile ? `+${userData.mobile}` : "Not Provided"}
            </li>
            <li>Login to your SATFERA account using these details.</li>
            <li>
              Upload your ID proof (Aadhar, Driving Licence, or Passport).
            </li>
            <li>Upload clear face & full-length photographs.</li>
            <li>
              Complete personal details – education, profession, lifestyle, etc.
            </li>
          </ul>
          <p className="text-gray-500 mt-2 text-sm">
            A verified profile increases your chances of better matches.
          </p>
        </div>

        {}
        <div className="bg-[var(--brand-bg-welcome-2)] text-[var(--brand-primary)] rounded-lg p-3 text-sm">
          We’ve sent a welcome email to your registered email address.
        </div>
      </div>
    </main>
  );
};
export default SuccessPage;
