import React from "react";

function Navbar({ deferredPrompt, onInstall }) {
  return (
    <nav className="px-10 py-6">
      <div
        className={`flex items-center ${
          deferredPrompt ? "justify-between" : "justify-center"
        }`}
      >
        <h1 className="text-2xl font-bold">PWA Demo</h1>

        {deferredPrompt && (
          <button
            onClick={onInstall}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Install App
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
