/** @type {import('next').NextConfig} */

const HOOFDDOMEIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://totbloeicoaching.nl')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');

const nextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      /* www → hoofddomein. Geen lus: de voorwaarde geldt alleen voor de
         www-host, en het doel is de kale host. */
      {
        source: '/:pad*',
        has: [{ type: 'host', value: `www.${HOOFDDOMEIN}` }],
        destination: `https://${HOOFDDOMEIN}/:pad*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:pad*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
