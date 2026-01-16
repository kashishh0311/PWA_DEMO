import React from "react";

function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white relative">

      {/* App Icon */}
      <img
        src="/Icons/icon-512.png"
        alt="App Logo"
        className="w-32 h-32 rounded-[20px]"
      />

      {/* App Name at Bottom Center */}
      <h1 className="absolute bottom-10 text-2xl font-bold tracking-wide">
        PWA Demo
      </h1>
    </div>
  );
}

export default SplashScreen;
