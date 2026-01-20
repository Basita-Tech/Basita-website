import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { initGA } from "./components/analytics/ga4";
import { hasAnalyticsConsent } from "./components/analytics/consent";
import '@fontsource/rethink-sans/400-italic.css';
import '@fontsource/rethink-sans/500-italic.css';
import '@fontsource/rethink-sans/600-italic.css';
import '@fontsource/rethink-sans/700-italic.css';
import '@fontsource/rethink-sans/800-italic.css';
import '@fontsource/rethink-sans';
import '@fontsource/rethink-sans/400.css';
import '@fontsource/rethink-sans/500.css';
import '@fontsource/rethink-sans/600.css';
import '@fontsource/rethink-sans/700.css';
import '@fontsource/rethink-sans/800.css';

if (hasAnalyticsConsent()) {
  initGA();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
