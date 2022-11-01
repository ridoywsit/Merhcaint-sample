const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  async redirects() {
    return [
      {
        source: '/member-add',
        destination: '/on-boarding',
        permanent: true,
      },
    ];
  },
};

module.exports = withPlugins([withSvgr], nextConfig);
