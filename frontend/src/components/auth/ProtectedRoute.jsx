import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../api/http";
const API = import.meta.env.VITE_API_URL;
const ProtectedRoute = ({
  children
}) => {
  const [authState, setAuthState] = useState({
    status: "checking",
    redirect: null
  });
  const checkAuth = async () => {
    setAuthState({ status: "checking", redirect: null });
    try {
      const res = await axios.get(`${API}/auth/me`, {
        withCredentials: true
      });
      const data = res?.data || {};
      if (data?.success === false && data?.code) {
        const isPlan = data.code === "PLAN_UPGRADE";
        const path = isPlan ? "/premium" : "/reactivate";
        setAuthState({
          status: "redirect",
          redirect: {
            path,
            state: {
              message: data.message || (isPlan ? "Your premium plan has expired. Please upgrade to continue." : "Your account is deactivated. Please activate to continue.")
            }
          }
        });
        return;
      }
      setAuthState({ status: "authed", redirect: null });
    } catch (error) {
      const code = error?.response?.status;
      if (code === 401) {
        setAuthState({ status: "unauth", redirect: null });
      } else if (error?.response?.data?.code) {
        const data = error.response.data;
        const isPlan = data.code === "PLAN_UPGRADE";
        const path = isPlan ? "/premium" : "/reactivate";
        setAuthState({
          status: "redirect",
          redirect: {
            path,
            state: {
              message: data.message || (isPlan ? "Your premium plan has expired. Please upgrade to continue." : "Your account is deactivated. Please activate to continue.")
            }
          }
        });
      } else {
        setAuthState({ status: "offline", redirect: null });
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  if (authState.status === "checking") {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary-dark)]"></div>
      </div>;
  }
  if (authState.status === "redirect" && authState.redirect) {
    return <Navigate to={authState.redirect.path} state={authState.redirect.state} replace />;
  }
  if (authState.status === "unauth") {
    return <Navigate to="/login" replace />;
  }
  if (authState.status === "offline") {
    return <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
        <p className="text-lg font-medium">Connection issue. Please check your network and retry.</p>
        <button type="button" onClick={checkAuth} className="px-4 py-2 rounded bg-[var(--brand-primary-dark)] text-white hover:opacity-90">
          Retry
        </button>
      </div>;
  }
  return children;
};
export default ProtectedRoute;