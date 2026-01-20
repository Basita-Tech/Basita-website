import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-CBKBDVDQ2G";

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("GA4 Measurement ID is missing");
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (action, category, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
