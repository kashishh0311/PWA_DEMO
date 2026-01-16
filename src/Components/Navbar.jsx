import React from "react";

function Navbar({ deferredPrompt, onInstall }) {
  return (
    <nav className="flex flex-col gap-4 sm:flex-row justify-between items-center px-10 py-6">
      <h1 className="text-2xl font-bold tracking-wide">PWA Demo</h1>

      {deferredPrompt && (
        <button
          onClick={onInstall}
          className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          Install App
        </button>
      )}
    </nav>
  );
}

export default Navbar;
