export async function registerPasskey() {
  try {

    //one
    const publicKey = {
      challenge: crypto.getRandomValues(new Uint8Array(32)),

      //two
      rp: {
        name: "PWA Demo",
        id: "pwa-demo-react.vercel.app"
      },

      //three
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name: "pwa@gmail.com",
        displayName: "PWA USER"
      },

      //four
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }
      ],

      //five
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
      },

      //six
      timeout: 60000,

      //seven
      attestation: "none",
    };

    const cred = await navigator.credentials.create({ publicKey });
    
    if (cred) {
      const credId = btoa(String.fromCharCode(...new Uint8Array(cred.rawId)));
      localStorage.setItem("passkey-cred-id", credId);
      return true;
    }
    
    return false;
  } catch (e) {
    console.error("Registration failed:", e);
    return false;
  }
}