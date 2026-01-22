import { useEffect, useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Camera access denied or not available");
      console.error(err);
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-sm rounded-lg shadow-lg"
      ></video>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
