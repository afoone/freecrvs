const withOffline = require("next-pwa");


const nextConfig = {
  pwa: {
    dest: 'public',
    disable: false,
    cacheOnFrontEndNav: true
  },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/immunization",
        permanent: true,
      },
    ];
  },
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: 'self',
          },
        ],
      },
    ]
  },
};

module.exports = withOffline(nextConfig);
