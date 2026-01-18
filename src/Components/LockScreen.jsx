import React from "react";
import OfflineScreen from "./OfflineScreen";
import useOnlineStatus from "../hooks/useOnlineStatus";

export default function LockScreen({ isAuthenticated, isPWA, children }) {
  const isOnline = useOnlineStatus();

  // 🔒 Step 1 — PWA always shows LOCK FIRST
  if (isPWA && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        {/* fingerprint or blank */}
      </div>
    );
  }

  // 🌐 Step 2 — After unlocking → if offline, show offline page
  if (!isOnline) {
    return <OfflineScreen />;
  }

  // 🟩 Step 3 — Otherwise show app normally
  return children;
}
