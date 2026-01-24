import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthMonitor from "./components/auth/AuthMonitor";
import "./App.css";
import RouteChangeTracker from "./components/analytics/RouteChangeTracker";
import CookieConsentBanner from "./components/CookieConsentBanner";

// Eager load critical pages
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";

// Lazy load non-critical pages
const SuccessPage = lazy(() => import("./components/Home/SuccessPage"));
const VerifyOtp = lazy(() => import("./components/auth/VerifyOtp"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const ForgotUsername = lazy(() => import("./components/auth/ForgotUsername"));
const TermsPage = lazy(() => import("./components/pages/TermsPage"));
const PrivacyPolicyPage = lazy(() => import("./components/pages/PrivacyPolicyPage"));
const AboutUsPage = lazy(() => import("./components/pages/AboutUsPage"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));
const FAQPage = lazy(() => import("./components/Home/FAQPage"));
const PremiumUpgradePage = lazy(() => import("./components/pages/PremiumUpgradePage").then(m => ({ default: m.PremiumUpgradePage })));
const AccountReactivatePage = lazy(() => import("./components/pages/AccountReactivatePage").then(m => ({ default: m.AccountReactivatePage })));

// Lazy load heavy components
const ProfileCompletion = lazy(() => import("./components/forms/ProfileCompletion"));
const MultiStepForm = lazy(() => import("./components/MultiStepForm"));
const ReviewPage = lazy(() => import("./components/pages/ReviewPage"));
const UserDashboard = lazy(() => import("./components/pages/UserDashboard").then((module) => ({ default: module.UserDashboard })));
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-[#C8A227] mx-auto mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);
function App() {
  return (
    <>
      <RouteChangeTracker />
      <CookieConsentBanner />
      <ScrollToTop />
      <AuthMonitor />
      <Routes>
        {}
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/success" 
          element={
            <Suspense fallback={<PageLoader />}>
              <SuccessPage />
            </Suspense>
          } 
        />

        {}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route 
          path="/verify-otp" 
          element={
            <Suspense fallback={<PageLoader />}>
              <VerifyOtp />
            </Suspense>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ForgotPassword />
            </Suspense>
          } 
        />
        <Route 
          path="/reset-password" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ResetPassword />
            </Suspense>
          } 
        />
        <Route 
          path="/forgot-username" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ForgotUsername />
            </Suspense>
          } 
        />
        <Route 
          path="/terms" 
          element={
            <Suspense fallback={<PageLoader />}>
              <TermsPage />
            </Suspense>
          } 
        />
        <Route 
          path="/privacy" 
          element={
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicyPage />
            </Suspense>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutUsPage />
            </Suspense>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          } 
        />
        <Route 
          path="/faq" 
          element={
            <Suspense fallback={<PageLoader />}>
              <FAQPage />
            </Suspense>
          } 
        />
        <Route 
          path="/premium" 
          element={
            <Suspense fallback={<PageLoader />}>
              <PremiumUpgradePage />
            </Suspense>
          } 
        />
        <Route 
          path="/reactivate" 
          element={
            <Suspense fallback={<PageLoader />}>
              <AccountReactivatePage />
            </Suspense>
          } 
        />

        {}
        <Route
          path="/complete-profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfileCompletion />
            </Suspense>
          }
        />
        <Route
          path="/onboarding/user"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <MultiStepForm />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/review"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <ReviewPage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <UserDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        {}
        <Route
          path="/userdashboard/*"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <UserDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {}
      </Routes>
    </>
  );
}
export default App;
