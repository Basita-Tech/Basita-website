import ReactGA from "react-ga4";
import { hasAnalyticsConsent } from "./consent";

const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-CBKBDVDQ2G";
let initialized = false;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID || initialized) return;

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {
      anonymize_ip: true,
    },
  });

  initialized = true;
};

export const trackPageView = (path) => {
  if (!hasAnalyticsConsent()) return;

  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (eventName, params = {}) => {
  if (!hasAnalyticsConsent()) return;

  ReactGA.event(eventName, params);
};
