import { useState, useCallback } from "react";
import { authenticateUser } from "../utils/auth";
import { registerPasskey } from "../utils/registerPasskey";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = useCallback(async () => {
    try {
      const credId = localStorage.getItem("passkey-cred-id");

      let success;
      if (!credId) {
        success = await registerPasskey();
      } else {
        success = await authenticateUser();
      }

      if (success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  }, []);

  return { isAuthenticated, authenticate };
}

export default useAuth;