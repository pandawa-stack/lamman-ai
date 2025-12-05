// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  env: {
    // Tambahkan ini untuk memastikan NEXT_PUBLIC_BACKEND_URL terbaca
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  }
  // ...
};
module.exports = nextConfig;