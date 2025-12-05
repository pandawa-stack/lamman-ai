/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },

  async rewrites() {
    return [
      {
        // Semua path single segment di root, kecuali route sistem
        source:
          '/:slug((?!api|auth|dashboard|s|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
        destination: '/s/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
