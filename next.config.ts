import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy socket.io requests (path "/" with XTransformPort query) to the chat mini-service.
        // Caddy gateway handles this in production; this rewrite enables direct port 3000 access in dev.
        {
          source: "/",
          has: [{ type: "query", key: "XTransformPort" }],
          destination: "http://localhost:3003/",
        },
      ],
    };
  },
};

export default nextConfig;
