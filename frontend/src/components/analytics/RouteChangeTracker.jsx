import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./ga4";

export default function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
