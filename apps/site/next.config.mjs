/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    // Contoh:
    // https://your-bucket-id.public.blob.vercel-storage.com
    BLOB_BASE_URL: process.env.BLOB_BASE_URL
  }
};

export default nextConfig;
