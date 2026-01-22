
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/Firebase";

export async function enableNotifications() {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            alert("Please allow notifications");
            return null;
        }

        await navigator.serviceWorker.ready;
        const registration = await navigator.serviceWorker.getRegistration();
        
        if (!registration) {
            alert("Service worker not registered");
            return null;
        }

        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
        const token = await getToken(messaging, { 
            vapidKey,
            serviceWorkerRegistration: registration
        });

        if (!token) {
            alert("Failed to get notification token.");
            return null;
        }

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