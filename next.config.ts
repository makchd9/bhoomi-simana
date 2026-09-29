import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90, 95], deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840, 5120, 7680] },
};
export default config;
