import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileReviewStatus, deleteUserAccount } from "../../api/auth";
import toast from "react-hot-toast";
import { CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react";
const ReviewPage = () => {
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchReviewStatus();
  }, []);
  const fetchReviewStatus = async () => {
    try {
      setLoading(true);
      const res = await getProfileReviewStatus();
      if (res.success) {
        setReviewStatus(res.data);
      } else {
        setError("Failed to fetch review status");
        toast.error("Unable to load review status");
      }
    } catch (err) {
      console.error("Error fetching review status:", err);
      setError("Failed to fetch review status");
      toast.error("Unable to load review status");
    } finally {
      setLoading(false);
    }
  };
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };
  const handleRetryClick = () => {
    fetchReviewStatus();
  };
  const colors = {
    gold: "var(--brand-primary)",
    goldLight: "var(--brand-gold)",
    beige: "var(--brand-bg-beige)",
    planBg: "var(--brand-bg)",
    white: "var(--app-white)",
    green: "#27ae60",
    lightGreen: "#eafaf1",
    orange: "#e74c3c"
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{
      backgroundColor: colors.beige
    }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4" style={{
          borderColor: colors.gold
        }}></div>
          <p className="mt-4 text-lg font-semibold" style={{
          color: colors.gold
        }}>
            Loading your review status...
          </p>
        </div>
      </div>;
  }
  if (error || !reviewStatus) {
    return <div className="min-h-screen flex items-center justify-center px-4" style={{
      backgroundColor: colors.beige
    }}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border-t-4" style={{
        borderColor: colors.orange
      }}>
          <AlertCircle size={64} className="mx-auto mb-4" color={colors.orange} />
          <h1 className="text-2xl font-bold mb-2" style={{
          color: colors.gold
        }}>
            Unable to Load
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "There was an issue loading your review status. Please try again."}
          </p>
          <button onClick={handleRetryClick} className="w-full py-3 rounded-lg font-semibold text-white hover:brightness-90 transition" style={{
          backgroundColor: colors.gold
        }}>
            Retry
          </button>
        </div>
      </div>;
  }
  const {
    profileReviewStatus,
    reviewedAt,
    reviewNotes,
    reason,
    userName,
    email
  } = reviewStatus;
  const feedback = reviewNotes || reason;
  const isPending = profileReviewStatus === "pending";
  const isApproved = profileReviewStatus === "approved";
  const isRejected = profileReviewStatus === "rejected";
  const isRectification = profileReviewStatus === "rectification";
  
 
  if (!profileReviewStatus || profileReviewStatus === null) {
    navigate("/onboarding/user?step=photos", { replace: true });
    return null;
  }
  
  return <div className="min-h-screen flex items-center justify-center py-8 px-4" style={{
    backgroundColor: colors.beige
  }}>
      <div className="w-full max-w-2xl">
        {}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src="/logo.png" alt="Satfera" width={220} height={220} className="object-contain" />
          </div>
        </div>

        {}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{
        borderTop: `6px solid ${isRejected ? "#e74c3c" : colors.gold}`
      }}>
          {}
          <div className="p-8 text-center text-white" style={{
            backgroundColor: isPending ? colors.gold : isApproved ? colors.green : isRejected ? colors.orange : colors.gold
          }}>
            <div className="flex justify-center mb-4">
              {isPending ? <Clock size={64} className="animate-pulse" /> : isApproved ? <CheckCircle size={64} /> : isRectification ? <AlertCircle size={64} className="animate-pulse" /> : <AlertCircle size={64} />}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {isPending ? "Profile Under Review" : isApproved ? "Profile Approved!" : isRectification ? "Profile Updates Required" : "Review Required"}
            </h2>
            <p className="text-lg opacity-90">
              {isPending ? "Your profile is being reviewed by our team" : isApproved ? "You're all set to start connecting!" : isRectification ? "Please update your profile based on admin feedback" : "Please review the feedback below"}
            </p>
          </div>

          {}
          <div className="p-8 space-y-6">
            {}
            <div className="p-4 rounded-lg border-l-4" style={{
            backgroundColor: colors.planBg,
            borderColor: colors.gold
          }}>
              <p className="text-sm text-gray-600 mb-2">Dear {userName},</p>
              {isPending && <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Thank you for submitting your profile to{" "}
                    <strong>Satfera</strong>. We've received your details
                    successfully, and they are currently under review.
                  </p>
                  <div className="p-4 rounded-lg mt-4" style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.goldLight}`
              }}>
                    <p className="font-semibold mb-2" style={{
                  color: colors.gold
                }}>
                      What happens next?
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        ✓ Our team will verify your government ID and documents
                      </li>
                      <li>
                        ✓ We'll review your profile photos and personal
                        information
                      </li>
                      <li>
                        ✓ We'll check compliance with our community guidelines
                      </li>
                      <li>✓ Review typically takes 24-48 hours</li>
                    </ul>
                  </div>
                </>}

              {isApproved && <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Great news! Your profile has been <strong>approved</strong>{" "}
                    and is now
                    <strong> live on Satfera</strong>. You're all set to start
                    connecting with other members!
                  </p>
                  <div className="p-4 rounded-lg mt-4" style={{
                backgroundColor: colors.lightGreen,
                border: `1px solid ${colors.green}`
              }}>
                    <p className="font-semibold mb-2" style={{
                  color: colors.green
                }}>
                      Your Profile Status: APPROVED
                    </p>
                    <ul className="space-y-2 text-sm" style={{
                  color: colors.green
                }}>
                      <li>✓ View and browse other member profiles</li>
                      <li>✓ Send connection requests</li>
                      <li>✓ Receive and respond to matches</li>
                      <li>✓ Update your profile anytime</li>
                    </ul>
                  </div>
                </>}

              {isRejected && <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Thank you for your submission. We reviewed your profile and
                    need some additional information or corrections before we
                    can proceed.
                  </p>
                  <div className="p-4 rounded-lg mt-4 bg-red-50 border-l-4" style={{
                borderColor: colors.orange
              }}>
                    <p className="font-semibold mb-2" style={{
                  color: colors.orange
                }}>
                      Feedback
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {feedback || "Please update your profile and resubmit for review."}
                    </p>
                  </div>
                </>}

              {isRectification && <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our admin team has reviewed your profile and identified some areas that need updates.
                    Please review the feedback below and make the necessary changes.
                  </p>
                  <div className="p-4 rounded-lg mt-4 bg-red-200 border-l-4" style={{
                borderColor: colors.gold
              }}>
                    <p className="font-semibold mb-2" style={{
                  color: colors.gold
                }}>
                      Admin Feedback
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {feedback || "Please review and update your profile details."}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg mt-4" style={{
                backgroundColor: "#fffbf0",
                border: `1px solid ${colors.gold}`
              }}>
                    <p className="font-semibold mb-2" style={{
                  color: colors.gold
                }}>
                      What to do next?
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ Click "Edit Profile" button below</li>
                      <li>✓ Make the requested changes</li>
                      <li>✓ Review all information for accuracy</li>
                      <li>✓ Submit your profile for review again</li>
                    </ul>
                  </div>
                </>}
            </div>

            {}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{
            backgroundColor: colors.planBg
          }}>
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className="font-semibold text-lg capitalize" style={{
                color: colors.gold
              }}>
                  {profileReviewStatus}
                </p>
              </div>
              {reviewedAt && <div>
                  <p className="text-xs text-gray-600 mb-1">Reviewed On</p>
                  <p className="font-semibold text-lg">
                    {new Date(reviewedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
                  </p>
                </div>}
              {!reviewedAt && <div>
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-sm text-gray-700 truncate">
                    {email}
                  </p>
                </div>}
            </div>

            {}
            <div className="p-4 rounded-lg flex items-start gap-3" style={{
            backgroundColor: "#f0f8ff",
            border: `1px solid ${colors.goldLight}`
          }}>
              <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{
              backgroundColor: colors.gold
            }}>
                ✓
              </div>
              <div>
                <p className="font-semibold text-sm" style={{
                color: colors.gold
              }}>
                  Email Notification Sent
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  We'll send you an email update about your profile status at{" "}
                  <strong>{email}</strong>
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="px-8 py-6 flex gap-4 flex-col sm:flex-row" style={{
          backgroundColor: colors.planBg
        }}>
            {isApproved && <button onClick={handleDashboardClick} className="flex-1 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:brightness-90 transition" style={{
            backgroundColor: colors.gold
          }}>
                Go to Dashboard <ArrowRight size={20} />
              </button>}

            {isRejected && <>
                <button onClick={() => navigate("/")} className="flex-1 py-3 rounded-lg font-semibold border-2 bg-white transition hover:bg-gray-50" style={{
              borderColor: "#999"
            }}>
                  Return Home
                </button>
                <button onClick={() => {
                  toast((t) => (
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold">Are you sure you want to delete your account?</p>
                      <p className="text-sm text-gray-600">This action cannot be undone.</p>
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            toast.dismiss(t.id);
                            const loadingToast = toast.loading("Deleting account...");
                            
                            const result = await deleteUserAccount("Profile rejected");
                            
                            toast.dismiss(loadingToast);
                            
                            if (result.success) {
                              toast.success("Account deleted successfully");
                              setTimeout(() => {
                                navigate("/");
                              }, 1500);
                            } else {
                              toast.error(result.message || "Failed to delete account");
                            }
                          }}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => toast.dismiss(t.id)}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ), {
                    duration: 10000,
                  });
                }} className="flex-1 py-3 rounded-lg font-semibold text-white hover:brightness-90 transition bg-red-600">
                  Delete Account
                </button>
              </>}

            {isRectification && <button onClick={() => navigate("/onboarding/user?step=personal")} className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:brightness-90 transition" style={{
            backgroundColor: colors.gold
          }}>
                Edit Profile <ArrowRight size={20} />
              </button>}

            {isPending && <>
                <button onClick={handleRetryClick} className="flex-1 py-3 rounded-lg font-semibold text-white hover:brightness-90 transition" style={{
              backgroundColor: colors.gold
            }}>
                  Check Status
                </button>
                <button onClick={() => navigate("/")} className="flex-1 py-3 rounded-lg font-semibold border-2 bg-white transition" style={{
              border: `2px dashed ${colors.goldLight}`
            }}>
                  Return Home
                </button>
              </>}
          </div>

          {}
          <div className="px-8 py-4 text-center text-xs text-gray-600 border-t" style={{
          borderColor: colors.goldLight,
          backgroundColor: colors.white
        }}>
            <p>
              Need help? Contact our support team at{" "}
              <a href="mailto:support@satfera.com" className="font-semibold" style={{
              color: colors.gold
            }}>
                support@satfera.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default ReviewPage;