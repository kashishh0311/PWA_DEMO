import React, { useEffect, useState } from "react";

function App() {
  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Online / Offline state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const features = [
    { title: "App Installation", desc: "Install like a mobile app" },
    { title: "Offline Support", desc: "Works without internet" },
    { title: "Push Notifications", desc: "Engage users easily" },
  ];

  // Capture PWA install event
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

  // Online / Offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Trigger install
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  {
    /* Offline Banner */
  }
  {
    !isOnline && (
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white flex items-center justify-center gap-3 py-3 shadow-lg">
        <img src="/Icons/icon-512.png" alt="Offline" className="w-6 h-6" />
        <span className="font-medium">You are offline</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navbar */}
      <nav className="flex flex-col gap-4 sm:flex-row justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">PWA Demo</h1>

        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Install App
          </button>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Progressive Web App
        </h2>
        <p className="text-gray-300 max-w-xl mb-10">
          This is a simple PWA hosted on Vercel with offline support,
          installation, and push notifications.
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg">
            Enable Notifications
          </button>

          {deferredPrompt && (
            <button
              onClick={handleInstall}
              className="px-8 py-4 rounded-xl border border-white hover:bg-white hover:text-black transition shadow-lg"
            >
              Download
            </button>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 px-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-slate-700 hover:bg-slate-600 hover:-translate-y-2 transition-all duration-300 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 mt-24 pb-8">
        © 2026 Simple PWA Demo
      </footer>
    </div>
  );
}

export default App;
