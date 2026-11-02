import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so Turbopack doesn't walk up and pick the
  // parent folder's lockfile (this project lives in a subfolder).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

