const withOffline = require("next-offline");

const nextConfig = {
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
