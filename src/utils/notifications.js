import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/Firebase.js";

export async function enableNotifications() {
    try {
        // Request permission
        const permission = await Notification.requestPermission();

        if (permission === "denied") {
            alert("Notifications are blocked in this browser.");
            return null;
        }

        if (permission !== "granted") {
            alert("Notification permission not granted.");
            return null;
        }

        // Register your Firebase SW
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        await navigator.serviceWorker.ready;

        // Get VAPID key
        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

        // Generate token
        const token = await getToken(messaging, { 
            vapidKey,
            serviceWorkerRegistration: registration
        });

        if (!token) {
            alert("Failed to get notification token.");
            return null;
        }

        console.log("FCM TOKEN:", token);

        // SAVE TOKEN IN LOCAL STORAGE (💥 IMPORTANT)
        localStorage.setItem("fcmToken", token);
        localStorage.setItem("notificationsEnabled", "true");

        alert("Notifications enabled!");

        return token;

    } catch (error) {
        console.error("Notification Error:", error);
        alert("Error: " + error.message);
        return null;
    }
}
