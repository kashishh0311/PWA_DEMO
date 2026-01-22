import React, { useEffect, useState } from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import FeatureGrid from "./Components/FeatureGrid";
import Footer from "./Components/Footer";
import features from "./data/features.json";
import usePasskeyAuth from "./hooks/usePasskeyAuth";
import LockScreen from "./Components/LockScreen";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [fcmToken, setFcmToken] = useState("");
  const { isAuthenticated, isPWA } = usePasskeyAuth();

  // ✅ First useEffect - Load FCM token
  useEffect(() => {
    const token = localStorage.getItem("fcmToken");
    if (token) {
      setFcmToken(token);
    }
  }, []);

  // ✅ Second useEffect - Install prompt listener
  useEffect(() => {
    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    
    return () =>
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <LockScreen isAuthenticated={isAuthenticated} isPWA={isPWA()}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Navbar deferredPrompt={deferredPrompt} onInstall={handleInstall} />
        <main>
          <Hero />
          <FeatureGrid features={features} />
        </main>
        <Footer />
        {fcmToken && (
          <p className="text-center text-xs text-gray-500 py-2">
            Token: {fcmToken}
          </p>
        )}
      </div>
    </LockScreen>
  );
}

export default App;