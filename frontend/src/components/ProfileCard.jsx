import React from "react";
import { Button } from "./ui/button";
import { Star, Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getViewProfiles } from "../api/auth";
import toast from "react-hot-toast";

const PROFILE_PHOTO_ASPECT_RATIO = 1;
const isValidProfileId = (id) => {
  if (id === null || id === undefined) return false;
  const str = String(id).trim();
  if (!str) return false;
  if (str === "undefined" || str === "null") return false;
  // requires at least 6-8 chars depending on your ids; original used <10 — keep that guard
  if (str.length < 10) return false;
  return true;
};

export function ProfileCard({
  id,
  name = "Unknown",
  age = null,
  state = "",
  country = "",
  visaType = "",
  profession = "",
  religion = null,
  caste = null,
  image = "",
  compatibility = 0,
  status = null,
  variant = "browse",
  onSendRequest,
  onView,
  onWithdraw,
  hideMatch,
  onAccept,
  onReject,
  onAddToCompare,
  onRemoveCompare,
  isInCompare = false,
  isShortlisted = false,
  onToggleShortlist,
  hideStatus = false,
  profile,
  onChat,
  onDownloadPDF,
  isVerified: isVerifiedProp,
  photoAspectRatio,
}) {
  const navigate = useNavigate();
  const [optimisticInCompare, setOptimisticInCompare] = React.useState(false);
  const isUiInCompare = isInCompare || optimisticInCompare;
  const isVerified =
    isVerifiedProp !== undefined ? Boolean(isVerifiedProp) : true;

  // Resolve location strings defensively
  const resolvedState =
    state ||
    profile?.state ||
    profile?.full_address?.state ||
    profile?.fullAddress?.state ||
    profile?.location?.state ||
    "";
  const resolvedCountry =
    country ||
    profile?.country ||
    profile?.full_address?.country ||
    profile?.fullAddress?.country ||
    profile?.location?.country ||
    (Array.isArray(profile?.livingInCountry)
      ? profile.livingInCountry.map((c) => c?.value ?? c).find(Boolean) || ""
      : typeof profile?.livingInCountry === "string"
        ? profile?.livingInCountry
        : "") ||
    "";

  // Resolve visa type and residing country (props first, then profile fallback)
  const resolvedVisaType =
    visaType || profile?.visaType || profile?.personal?.visaType || "";
  const residingCountry =
    country ||
    resolvedCountry ||
    profile?.personal?.country ||
    profile?.residingCountry ||
    "";

  const locationParts = [resolvedState].filter(Boolean);
  const detailParts = [];
  if (locationParts.length) detailParts.push(locationParts.join(", "));

  // Always show country; add visa type for non-Indian users when available
  if (residingCountry) {
    if (resolvedVisaType && residingCountry.toLowerCase() !== "india") {
      detailParts.push(`${residingCountry} (${resolvedVisaType})`);
    } else {
      detailParts.push(residingCountry);
    }
  }

  if (profession) detailParts.push(profession);
  const detailLine = detailParts.join(" • ");

  const handleSendRequestClick = async (e) => {
    try {
      e?.stopPropagation?.();
    } catch {}
    try {
      if (typeof onSendRequest === "function") {
        await onSendRequest(id);
      }
    } catch (err) {
      console.error("Send request error:", err);
      try {
        toast.error("Failed to send request");
      } catch {}
    }
  };

  const handleToggleShortlistClick = async (e) => {
    try {
      e?.stopPropagation?.();
    } catch {}
    try {
      if (typeof onToggleShortlist === "function") {
        await onToggleShortlist(id);
      }
    } catch (err) {
      console.error("Shortlist toggle error:", err);
      try {
        toast.error("Failed to toggle shortlist");
      } catch {}
    }
  };

  const handleAddClick = async (e) => {
    try {
      e?.stopPropagation?.();
    } catch {}
    setOptimisticInCompare(true);
    try {
      if (typeof onAddToCompare === "function") {
        const resp = await onAddToCompare(id, profile);
        // handle backend response shape if present
        if (resp && resp.success === false) {
          toast.error(resp?.message || "Failed to add to compare");
          setOptimisticInCompare(false);
        }
      } else {
        // No handler: revert optimistic state
        setOptimisticInCompare(false);
      }
    } catch (err) {
      console.warn("Add to compare failed", err);
      setOptimisticInCompare(false);
      try {
        toast.error("Failed to add to compare");
      } catch {}
    }
  };

  const handleRemoveClick = async (e) => {
    try {
      e?.stopPropagation?.();
    } catch {}
    setOptimisticInCompare(false);
    try {
      if (typeof onRemoveCompare === "function") {
        await onRemoveCompare(id);
      }
    } catch (err) {
      console.warn("Remove compare failed", err);
      // restore optimistic if removal failed
      setOptimisticInCompare(true);
      try {
        toast.error("Failed to remove from compare");
      } catch {}
    }
  };

  const renderActions = () => {
    switch (variant) {
      case "browse":
        return (
          <div className="mt-3 space-y-3">
            <div className="flex gap-2 w-full">
              <Button
                onClick={() => {
                  const profileId = String(profile?.id || id || "").trim();
                  if (!isValidProfileId(profileId)) {
                    toast.error("Invalid profile ID");
                    console.error("Invalid profile ID:", profileId);
                    return;
                  }
                  navigate(`/dashboard/profile/${profileId}`);
                }}
                className="flex-1 bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.5px] border-[var(--brand-primary-dark)] rounded-full font-medium hover:bg-[var(--brand-primary-dark)] hover:text-white transition-all duration-200 flex items-center justify-center gap-1 h-10 text-sm"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>

              <Button
                className="flex-1 bg-[var(--brand-primary-dark)] border-[1.5px] border-[var(--brand-primary-dark)] text-white rounded-full font-medium hover:bg-[var(--brand-primary-dark-hover-4)] transition-all duration-200 h-10 text-sm"
                onClick={handleSendRequestClick}
              >
                Send Request
              </Button>
            </div>

            <div className="w-full">
              {isUiInCompare ? (
                <Button
                  onClick={handleRemoveClick}
                  className="w-full bg-[var(--brand-primary-dark)] text-white rounded-full hover:bg-[var(--brand-primary-dark-hover-4)] font-medium h-10 text-sm"
                >
                  Remove Compare
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleAddClick}
                  className="w-full border-[1.5px] border-[var(--brand-primary-dark)] text-[var(--brand-primary-dark)] font-medium rounded-full bg-[var(--brand-bg-soft)] hover:bg-[var(--brand-primary-dark)] hover:text-white transition-all duration-200 h-10 text-sm"
                >
                  Add to Compare
                </Button>
              )}
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                const profileId = String(profile?.id || id || "").trim();
                if (!isValidProfileId(profileId)) {
                  toast.error("Invalid profile ID");
                  console.error("Invalid profile ID:", profileId);
                  return;
                }
                navigate(`/dashboard/profile/${profileId}`);
              }}
              className="flex-1 bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] border-[var(--brand-border-gold)] rounded-full font-medium 
              hover:bg-[var(--brand-primary-dark)] hover:text-white hover:border-[var(--brand-primary-dark)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Eye size={16} />
              <span>View Profile</span>
            </Button>
            <Button
              size="sm"
              onClick={handleSendRequestClick}
              className="flex-1 bg-[var(--brand-primary-dark)] text-white rounded-[12px]"
            >
              Send Request
            </Button>
          </div>
        );

      case "sent":
        return (
          <div className="flex gap-2 mt-2 pr-6 pb-6 items-center">
            <Button
              onClick={() => onView?.(profile || { id })}
              className="flex-1 h-[38px] bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] border-[var(--brand-primary-dark)] rounded-full font-medium 
              hover:bg-[var(--brand-primary-dark)] hover:text-white hover:border-[var(--brand-primary-dark)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Eye size={16} />
              <span>View </span>
            </Button>
            {onWithdraw &&
              (() => {
                const s = String(status || "").toLowerCase();
                if (s === "rejected" || s === "withdrawn") {
                  return (
                    <Button
                      disabled
                      className="flex-1 h-[38px] bg-gray-100 text-gray-500 border-[1.3px] border-gray-300 rounded-full font-medium cursor-not-allowed opacity-60"
                    >
                      {s === "withdrawn" ? "Withdrawn" : "Rejected"}
                    </Button>
                  );
                }
                return (
                  <Button
                    onClick={() => onWithdraw?.(id)}
                    className=" flex-1  h-[38px] bg-[var(--brand-bg-soft)] text-[#d64545] border-[1.3px] border-[#d64545] rounded-full font-medium 
                  hover:bg-[#d64545] hover:text-white hover:border-[#d64545] transition-all duration-200"
                  >
                    Withdraw
                  </Button>
                );
              })()}
          </div>
        );

      case "received":
        return (
          <div className="flex flex-col gap-2 mt-2 pr-6 pb-6">
            <Button
              onClick={() => onView?.(profile || { id })}
              className="w-full h-[38px] bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] border-[var(--brand-primary-dark)] rounded-full font-medium 
              hover:bg-[var(--brand-primary-dark)] hover:text-white hover:border-[var(--brand-primary-dark)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Eye size={16} />
              <span>View </span>
            </Button>

            {(() => {
              const currentStatus = String(status || "").toLowerCase();
              if (currentStatus === "rejected") {
                return (
                  <Button
                    onClick={() => onAccept?.(profile || { id })}
                    className="w-full h-[38px] bg-[var(--brand-primary-dark)] text-white rounded-full font-medium 
                    hover:bg-[var(--brand-primary-dark-hover-3)] transition-all duration-200"
                  >
                    ✓ Accept
                  </Button>
                );
              }
              if (currentStatus === "accepted") {
                return (
                  <Button
                    variant="outline"
                    onClick={() => onReject?.(profile || { id })}
                    className="w-full h-[38px] bg-[var(--brand-bg-soft)] text-[#d64545] border-[1.3px] border-[#d64545] rounded-full font-medium 
                    hover:bg-[#d64545] hover:text-white hover:border-[#d64545] transition-all duration-200"
                  >
                    ✕ Reject
                  </Button>
                );
              }
              return (
                <div className="flex gap-2">
                  <Button
                    onClick={() => onAccept?.(profile || { id })}
                    className="flex-1 h-[38px] bg-[var(--brand-primary-dark)] text-white rounded-full font-medium 
                    hover:bg-[var(--brand-primary-dark-hover-3)] transition-all duration-200"
                  >
                    ✓ Accept
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onReject?.(profile || { id })}
                    className="flex-1 h-[38px] bg-[var(--brand-bg-soft)] text-[#d64545] border-[1.3px] border-[#d64545] rounded-full font-medium 
                    hover:bg-[#d64545] hover:text-white hover:border-[#d64545] transition-all duration-200"
                  >
                    ✕ Reject
                  </Button>
                </div>
              );
            })()}
          </div>
        );

      case "approved":
        return (
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => onView?.(profile || { id })}
                    className="flex-1 bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)]  hover:text-white  border-[1.3px] border-[var(--brand-primary-dark)] rounded-full font-medium py-2 
                  hover:bg-[var(--brand-primary-dark)] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                <span>View </span>
              </Button>

              <Button
                onClick={(e) => {
                  if (isUiInCompare) handleRemoveClick(e);
                  else handleAddClick(e);
                }}
                className={`flex-1 rounded-full font-medium py-2 px-3 border transition-all duration-200 whitespace-nowrap ${
                  isUiInCompare
                    ? "bg-[var(--brand-primary-dark)] text-white border-[var(--brand-primary-dark)] hover:bg-[var(--brand-primary-dark)]"
                    : "bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)]  border-[1.3px] hover:text-white border-[var(--brand-primary-dark)] hover:bg-[var(--brand-primary-dark)]"
                }`}
              >
                {isUiInCompare ? "Remove Compare" : "Add to Compare"}
              </Button>
            </div>

            {status === "accepted" && (onReject || onDownloadPDF) && (
              <div className="flex items-center gap-2">
                {onReject && (
                  <Button
                    onClick={() => onReject?.(profile || { id })}
                      className="flex-1 bg-[var(--brand-bg-soft)] text-[#d64545] border-[1.3px] border-[#d64545] rounded-full py-2 font-medium flex items-center justify-center gap-2 
                    hover:bg-[#d64545] hover:text-white transition-all duration-200"
                  >
                    ✕ Reject
                  </Button>
                )}
                {onDownloadPDF && (
                  <Button
                    onClick={() => onDownloadPDF?.(profile || { id })}
                      className="flex-1 bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] border-[var(--brand-primary-dark)] rounded-full py-2 font-medium flex items-center justify-center gap-2 
                    hover:bg-[var(--brand-primary-dark)] hover:text-white transition-all duration-200"
                  >
                    <Download size={16} />
                    PDF
                  </Button>
                )}
              </div>
            )}
          </div>
        );

      case "shortlisted":
        return (
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onView?.(profile || { id })}
                className="flex-1 h-11 bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] border-[var(--brand-primary-dark)] rounded-full font-medium text-[14px] 
                  hover:bg-[var(--brand-primary-dark)] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                <span>View </span>
              </Button>

              <Button
                onClick={(e) => {
                  if (isUiInCompare) handleRemoveClick(e);
                  else handleAddClick(e);
                }}
                className={`flex-1 h-11 rounded-full font-medium text-[14px] border transition-all duration-200 ${
                  isUiInCompare
                    ? "bg-[var(--brand-primary-dark)] text-white border-[var(--brand-primary-dark)]"
                    : "bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] hover:bg-[var(--brand-primary-dark)] hover:text-white border-[var(--brand-primary-dark)]"
                }`}
              >
                {isUiInCompare ? "Remove From Compare" : "Add toCompare"}
              </Button>
              <Button
                onClick={(e) => {
                  if (isUiInCompare) handleRemoveClick(e);
                  else handleAddClick(e);
                }}
                className={`flex-1 h-[38px] rounded-full font-medium text-[13px] border transition-all duration-200 px-4 ${
                  isUiInCompare
                    ? "bg-[var(--brand-primary-dark)] text-white border-[var(--brand-primary-dark)]"
                    : "bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)]  border-[1.3px] border-[var(--brand-primary-dark)] hover:bg-[var(--brand-primary-dark)] hover:text-white"
                }`}
              >
                {isUiInCompare ? "Remove From Compare" : "Add to Compare"}
              </Button>
            </div>
          </div>
        );

      case "newprofiles":
        return (
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Button
                onClick={() => {
                  const profileId = String(profile?.id || id || "").trim();
                  if (!isValidProfileId(profileId)) {
                    toast.error("Invalid profile ID");
                    console.error("Invalid profile ID:", profileId);
                    return;
                  }
                  navigate(`/dashboard/profile/${profileId}`);
                }}
                    className="flex-1 h-[38px] bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[1.3px] border-[var(--brand-primary-dark)] rounded-full 
                  font-medium text-[13px] hover:bg-[var(--brand-primary-dark)] hover:text-white hover:border-[var(--brand-primary-dark)] 
                  transition-all duration-200 px-4 flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                <span>View </span>
              </Button>

              <Button
                onClick={handleSendRequestClick}
                    className="w-full h-[38px] bg-[var(--brand-primary-dark)] text-white rounded-full font-medium text-[13px] 
                  hover:bg-[var(--brand-primary-dark-hover-3)] transition-all duration-200 px-4"
              >
                Send Request
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  if (isUiInCompare) handleRemoveClick(e);
                  else handleAddClick(e);
                }}
                className={`flex-1 h-[38px] rounded-full font-medium text-[13px] border transition-all duration-200 px-4 ${
                  isUiInCompare
                    ? "bg-[var(--brand-primary-dark)] text-white border-[var(--brand-primary-dark)]"
                    : "bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)]  border-[1.3px] border-[var(--brand-primary-dark)] hover:bg-[var(--brand-primary-dark)] hover:text-white"
                }`}
              >
                {isUiInCompare ? "Remove From Compare" : "Add to Compare"}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-[20px] overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col w-full max-w-[380px] mx-auto h-full"
    >
      <div
        className="relative w-full overflow-visible rounded-t-[20px]"
        style={{ aspectRatio: photoAspectRatio || PROFILE_PHOTO_ASPECT_RATIO }}
      >
        {image ? (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-t-[20px]"
              onError={(e) => {
                try {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "flex";
                } catch {}
              }}
            />
            <div
              style={{ display: "none" }}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-[var(--brand-bg-softest)] via-[var(--brand-bg-soft)] to-[var(--brand-bg-alt)] flex items-center justify-center rounded-t-[20px] border-b-2 border-[var(--brand-border-soft)]"
            >
              <div className="text-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white to-[var(--brand-bg-softer)] shadow-md flex items-center justify-center mx-auto border-4 border-[rgb(var(--brand-gold-rgb)/0.2)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-[var(--brand-primary-dark)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-semibold">
                  No Photo Available
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[var(--brand-bg-softest)] via-[var(--brand-bg-soft)] to-[var(--brand-bg-alt)] flex items-center justify-center rounded-t-[20px] border-b-2 border-[var(--brand-border-soft)]">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white to-[var(--brand-bg-softer)] shadow-md flex items-center justify-center mx-auto border-4 border-[rgb(var(--brand-gold-rgb)/0.2)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[var(--brand-primary-dark)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 font-semibold">
                No Photo Available
              </p>
            </div>
          </div>
        )}

        {/* single compatibility badge (fixed duplicate bug) */}
        {!["newprofiles"].includes(variant) && compatibility ? (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-[var(--brand-primary-dark)] backdrop-blur-md text-white text-[13px] font-semibold px-3 py-[4px] rounded-full shadow border border-[rgb(var(--brand-border-gold-rgb)/0.8)]">
              {compatibility}% Match
            </div>
          </div>
        ) : null}

        {/* status badge */}
        {!["browse", "newprofiles"].includes(variant) &&
        !hideStatus &&
        status &&
        status !== "None"
          ? (() => {
              const s = String(status || "").toLowerCase();
              const badgeClass =
                s === "accepted"
                  ? "bg-[var(--brand-bg-soft)] text-[var(--brand-primary-dark)] border-[var(--brand-border-gold-soft)]"
                  : s === "pending"
                    ? "bg-yellow-50 text-[#f54800] border-yellow-200"
                    : s === "rejected"
                      ? "bg-[#fdecec] text-[#d64545] border-[#f5c2c2]"
                      : "bg-gray-100 text-gray-700 border-gray-200";
              const label = s.charAt(0).toUpperCase() + s.slice(1);
              return (
                <div className="absolute top-3 right-3 z-20">
                  <div
                    className={`inline-flex items-center justify-center rounded-full px-3 py-[4px] text-[13px] font-medium border ${badgeClass}`}
                  >
                    {label}
                  </div>
                </div>
              );
            })()
          : null}
      </div>

      <div className="px-6 pb-6 pt-3 relative flex flex-col flex-1">
        {onToggleShortlist && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleShortlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full flex items-center justify-center w-auto
    shadow-none border-none bg-transparent hover:bg-[rgb(var(--brand-like-bg-rgb)/0.6)] transition-all z-50
    ${isShortlisted ? "bg-[rgb(var(--brand-like-bg-rgb)/0.8)]" : ""}`}
          >
            <Star
              size={20}
              className={`transition-all duration-200 ${isShortlisted ? "text-[var(--brand-primary-dark)] fill-[var(--brand-primary-dark)]" : "text-[var(--brand-primary-dark)]"}`}
              strokeWidth={2}
            />
          </motion.button>
        )}

        {name.length > 18 ? (
          <div className="flex flex-col mb-1 min-w-0">
            <span className="text-lg font-semibold text-gray-900 leading-snug break-words w-full">
              {name}
            </span>
            <span className="flex items-center flex-shrink-0 mt-0.5">
              {typeof age === "number" && (
                <span className="whitespace-nowrap">, {age}</span>
              )}
              {isVerified && (
                <img
                  src="/badge.png"
                  alt="Verified"
                  className="w-4 h-4 object-contain ml-1 inline-block align-middle"
                />
              )}
            </span>
          </div>
        ) : (
          <div className="flex items-center flex-wrap mb-1 min-w-0">
            <span className="text-lg font-semibold text-gray-900 leading-snug break-words">
              {name}
            </span>
            {typeof age === "number" && (
              <span className="whitespace-nowrap">, {age}</span>
            )}
            {isVerified && (
              <img
                src="/badge.png"
                alt="Verified"
                className="w-4 h-4 object-contain ml-1 inline-block align-middle"
              />
            )}
          </div>
        )}

        <p className="text-sm text-gray-600 mb-1">{detailLine}</p>

        <div className="flex gap-2 mb-1 mt-0.5 h-[36px] items-start">
          {religion && (
            <span
              className="text-black px-4 py-[4px] rounded-full text-sm font-semibold max-w-[160px] h-7 flex items-center overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ backgroundColor: "var(--brand-badge-bg)" }}
              title={religion}
            >
              {religion}
            </span>
          )}
          {caste && (
            <span
              className="text-black px-3 min-w-0 max-w-[160px] h-7 flex items-center justify-center rounded-full text-sm font-semibold bg-[var(--brand-badge-bg)] truncate"
              title={caste}
            >
              {caste}
            </span>
          )}
        </div>

        <div className="">{renderActions()}</div>
      </div>
    </div>
  );
}
