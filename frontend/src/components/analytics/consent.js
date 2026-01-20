export const CONSENT_KEY = "satfera_cookie_consent";

export const getConsent = () => {
  return localStorage.getItem(CONSENT_KEY);
};

export const setConsent = (value) => {
  localStorage.setItem(CONSENT_KEY, value);
};

export const hasAnalyticsConsent = () => {
  return getConsent() === "accepted";
};
