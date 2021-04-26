const withOffline = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')



const nextConfig = {
  pwa: {
    dest: 'public',
    disable: false,
    cacheOnFrontEndNav: true,
    runtimeCaching,
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
};

module.exports = withOffline(nextConfig);
