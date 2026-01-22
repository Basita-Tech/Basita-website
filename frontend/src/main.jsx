import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";
import { initGA } from "./components/analytics/ga4";
import { hasAnalyticsConsent } from "./components/analytics/consent";

if (hasAnalyticsConsent()) {
  initGA();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                icon: <CheckCircle2 className="h-5 w-5 text-green-600" />
              }
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
