import React, { useEffect, useState } from "react";
import {enableNotifications} from "../utils/notifications";

function Hero() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("fcmToken");
    if (token) {
      setToken(token);
    }
  }, []);
    const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera Access Granted:", stream);
      alert("Camera Access Enabled");
    } catch (error) {
      console.error("Camera Access Denied:", error);
      alert("Camera Access Denied");
    }
  };
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
         
        <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 hover:translate-x-[4px] transition-all duration-300 ease-out hover:shadow-2xl shadow-lg"
        onClick={enableNotifications}>
          Enable Notifications
        </button>

      
          <button
            className="px-8 py-4 rounded-xl border border-white hover:bg-white hover:text-black hover:translate-x-[4px] transition-all duration-300 ease-out hover:shadow-2xl shadow-lg"
            onClick={handleCameraAccess}
          >
            Camera Access
          </button>
        
      </div>
      {token && <p className="mt-4 text-gray-300">FCM Token: {token}</p>}
    </section>
  );
}

export default Hero;
