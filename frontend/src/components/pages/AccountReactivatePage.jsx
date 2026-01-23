import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { activateAccount } from "../../api/auth";

export function AccountReactivatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const message =
    location.state?.message ||
    "Your account is deactivated. Activate it to continue using Satfera.";

  const handleActivate = async () => {
    setLoading(true);
    try {
      const res = await activateAccount();
      if (res?.success) {
        toast.success("Account activated successfully");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(res?.message || "Activation failed. Please try again.");
      }
    } catch (err) {
      toast.error("Activation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5ed] via-white to-[#f9f5ed]">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Reactivate Account
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-[20px] shadow-lg p-6 sm:p-8 border border-[#EDE7D9]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FDF4EA] flex items-center justify-center text-[#C8A227]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Account Deactivated
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-[#f9f5ed] rounded-[16px] p-4 border border-[#E4D6B8]">
              <div className="flex items-center gap-2 text-sm text-gray-800 font-medium mb-2">
                <CheckCircle className="w-4 h-4 text-[#C8A227]" />
                What happens when you reactivate?
              </div>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Your profile becomes visible to others again</li>
                <li>You can chat with your matches</li>
                <li>All your preferences and data stay intact</li>
              </ul>
            </div>

            <div className="bg-[#f9f5ed] rounded-[16px] p-4 border border-[#E4D6B8]">
              <div className="flex items-center gap-2 text-sm text-gray-800 font-medium mb-2">
                <CheckCircle className="w-4 h-4 text-[#C8A227]" />
                Need a break instead?
              </div>
              <p className="text-sm text-gray-600">
                You can always deactivate again later from settings if you need
                a pause. We’ll keep your data safe.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              onClick={handleActivate}
              disabled={loading}
              className="bg-[#C8A227] hover:bg-[#B49520] text-white rounded-[12px] h-11 sm:h-12 px-6"
            >
              {loading ? "Activating..." : "Activate Account"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/contact")}
              className="rounded-[12px] h-11 sm:h-12 px-6 border-[#C8A227] text-[#3a2f00] hover:bg-[#C8A227]/10"
            >
              Need help? Contact support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
