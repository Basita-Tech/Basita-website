import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Crown, Check, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMembershipPlans } from "../../api/auth";

export function PremiumUpgradePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notice = location.state?.message;
  
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansError, setPlansError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        setPlansError("");
        const res = await getMembershipPlans();
        const data = res?.data || res?.plans || [];
        if (Array.isArray(data) && data.length) {
          setPlans(data);
        } else {
          setPlans([]);
        }
      } catch (err) {
        console.error("Failed to fetch membership plans", err);
        setPlansError("Unable to load plans right now.");
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const features = [
    "Unlimited Chat with Matches",
    "View Contact Details",
    "See Income Information",
    "Priority Profile Visibility",
    "Advanced Filters",
    "Send Unlimited Requests",
    "Ad-Free Experience",
    "Verified Badge",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5ed] via-white to-[#f9f5ed]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-full bg-[#C8A227] text-white hover:bg-[#B49520]"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Upgrade to Premium</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {notice && (
          <div className="mb-4 rounded-[12px] border border-[#E4D6B8] bg-[#fdf8ef] px-4 py-3 text-sm text-gray-800">
            {notice}
          </div>
        )}
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#C8A227] via-[#D4A052] to-[#E4C48A] rounded-[20px] p-6 sm:p-8 text-center text-white relative overflow-hidden mb-6 shadow-lg">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-white">
              Upgrade to Premium
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
              Unlock exclusive features and find your perfect match faster
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Features List */}
          <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
              Premium Features
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C8A227]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8A227]" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
                Choose Your Plan
              </h3>

              {plansLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#C8A227]" />
                </div>
              )}

              {plansError && (
                <div className="text-center py-8 text-red-600 text-sm">
                  {plansError}
                </div>
              )}

              {!plansLoading && !plansError && plans.length === 0 && (
                <div className="text-center py-8 text-gray-600 text-sm">
                  No plans available at the moment.
                </div>
              )}

              {!plansLoading && plans.map((plan, index) => {
                const isPopular = plan.name?.toLowerCase().includes('year') || plan.duration === 12;
                return (
                  <div
                    key={plan._id || index}
                    className={`rounded-[16px] p-5 sm:p-6 mb-4 border-2 relative ${
                      isPopular
                        ? 'bg-gradient-to-br from-[#C8A227]/10 to-[#C8A227]/5 border-[#C8A227]'
                        : 'bg-[#f9f5ed] border-[#C8A227]/20'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 right-4 bg-[#C8A227] text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {plan.badge || 'Best Value'}
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">{plan.name}</span>
                      {!isPopular && (
                        <span className="text-xs text-gray-500">Most Flexible</span>
                      )}
                      {isPopular && (
                        <span className="text-xs text-[#C8A227] font-semibold">Best Value</span>
                      )}
                    </div>
                    <div className="mb-3">
                      <span className="text-3xl sm:text-4xl font-bold text-[#C8A227]">
                        ₹{plan.price}
                      </span>
                      <span className="text-gray-600 text-sm">/{plan.duration === 12 ? 'year' : 'month'}</span>
                    </div>
                    {plan.description && (
                      <p className="text-xs text-gray-600 mb-3">
                        {plan.description}
                      </p>
                    )}
                    <Button className="w-full bg-[#C8A227] hover:bg-[#B49520] text-white rounded-[12px] h-11 sm:h-12">
                      <Crown className="w-4 h-4 mr-2" />
                      Get {plan.name}
                    </Button>
                  </div>
                );
              })}
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}
