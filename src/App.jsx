import React, { useEffect, useState } from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import OfflineScreen from "./Components/OfflineScreen";
import FeatureGrid from "./Components/FeatureGrid";
import useOnlineStatus from "./hooks/useOnlineStatus";
import features from "./data/features.json";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const isOnline = useOnlineStatus();

  // Hide native splash screen with fade animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const nativeSplash = document.getElementById('native-splash');
      if (nativeSplash) {
        // Trigger fade-out animation
        nativeSplash.classList.add('fade-out');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
          nativeSplash.remove();
        }, 300);
      }
      setIsReady(true);
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  // Capture PWA install prompt
  useEffect(() => {
    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Don't render until ready (native splash handles loading)
  if (!isReady) return null;
  
  // Show offline screen if needed
  if (!isOnline) return <OfflineScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navbar deferredPrompt={deferredPrompt} onInstall={handleInstall} />
      <Hero deferredPrompt={deferredPrompt} onInstall={handleInstall} />
      <FeatureGrid features={features} />
      <footer className="text-center text-gray-400 mt-24 pb-8">
        © 2026 Simple PWA Demo
      </footer>
    </div>
  );
}

export default App;