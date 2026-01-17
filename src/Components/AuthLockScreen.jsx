import React from "react";

function AuthLockScreen({ onUnlock }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-white text-2xl mb-8">🔒 Tap to unlock</h1>
        <button
          onClick={onUnlock}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}

export default AuthLockScreen;