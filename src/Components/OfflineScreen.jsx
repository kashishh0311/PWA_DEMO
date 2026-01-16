import React from "react";

function OfflineScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white text-center px-6">
      <img
        src="/Icons/icon-512.png"
        alt="Offline"
        className="w-32 h-32 mb-6 opacity-90 rounded-[20px]"
      />
      <h2 className="flex items-center gap-2 text-2xl font-semibold">
        You are offline
      </h2>

      <p className="text-gray-400">Please check your internet connection</p>
    </div>
  );
}

export default OfflineScreen;
