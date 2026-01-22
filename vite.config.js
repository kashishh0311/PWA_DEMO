import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    allowedHosts: [".", "rosia-boundless-meghan.ngrok-free.dev"],
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'firebase-messaging-sw.js',
      injectManifest: {
        injectionPoint: undefined,
      globPatterns: [
          '**/*.{js,css,html}',
          'Icons/*.png'  
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        name: "PWA Demo",
        short_name: "PWA",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0f172a",
        icons: [
          {
            src: "/Icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});