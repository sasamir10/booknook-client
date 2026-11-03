import type { NextConfig } from "next";
import { loadServerEnvironment } from "./src/lib/server-env";

if (process.env.NODE_ENV === "production") loadServerEnvironment(process.env);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "image.ibb.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
