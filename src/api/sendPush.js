import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST method allowed" });
    }

    const { token, title, body } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing FCM token" });
    }

    // Read service account from Vercel Env
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      ["https://www.googleapis.com/auth/firebase.messaging"]
    );

    const authToken = await jwtClient.authorize();

    // FCM endpoint
    const projectId = serviceAccount.project_id;
    const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

// FCM message (data-only, prevents double notifications)
const message = {
  message: {
    token,
    data: {
      title: title || "Hello!",
      body: body || "This is a push message.",
    },
  },
};


    // Send message
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Push API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
