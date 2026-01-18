import React from "react";
import OfflineScreen from "./OfflineScreen";
import useOnlineStatus from "../hooks/useOnlineStatus";

export default function LockScreen({ isAuthenticated, isPWA, children }) {
  const isOnline = useOnlineStatus();

  // 🌐 WEBSITE (not PWA) → show offline screen
  if (!isPWA && !isOnline) {
    return <OfflineScreen />;
  }

  // 🔒 PWA APP → lock screen has priority (even if offline)
  if (isPWA && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        {/* Optional: lock / fingerprint UI */}
      </div>
    );
  }

  // 🌐 WEBSITE (online)
  if (!isPWA) {
    return children;
  }

  // 🔐 PWA + authenticated (online OR offline)
  return children;
}
