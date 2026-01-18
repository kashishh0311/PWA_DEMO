import { useEffect, useRef, useState } from "react";
import { authenticateUser } from "../utils/auth";
import { registerPasskey } from "../utils/registerPasskey";

// Check if running as installed PWA
export const isPWA = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

export default function usePasskeyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticating = useRef(false);

  const triggerAuth = async () => {
    if (isAuthenticating.current || !isPWA()) return; // ⛔ Only inside PWA
    isAuthenticating.current = true;

    try {
      const credId = localStorage.getItem("passkey-cred-id");

      const result = credId
        ? await authenticateUser()
        : await registerPasskey();

      if (result) {
        setIsAuthenticated(true);
      } else {
        setTimeout(() => {
          isAuthenticating.current = false;
          triggerAuth();
        }, 1000);
      }
    } catch (e) {
      console.error("Auth error:", e);
      setTimeout(() => {
        isAuthenticating.current = false;
        triggerAuth();
      }, 1000);
    }
  };

  useEffect(() => {
    if (isPWA()) triggerAuth();
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (!isPWA()) return;
      setIsAuthenticated(false);
      isAuthenticating.current = false;
      setTimeout(triggerAuth, 100);
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return { isAuthenticated, triggerAuth, isPWA };
}
