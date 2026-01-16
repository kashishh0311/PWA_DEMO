import React from "react";

function Hero({ deferredPrompt, onInstall }) {
  return (
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
            onClick={onInstall}
            className="px-8 py-4 rounded-xl border border-white hover:bg-white hover:text-black transition shadow-lg"
          >
            Download
          </button>
        )}
      </div>
    </section>
  );
}

export default Hero;
