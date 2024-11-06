/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      },
      {
        hostname: 'bookquiz.s3.amazonaws.com'
      },
      {
        hostname: 'bookquiz.s3.us-east-1.amazonaws.com'
      }
    ]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.optimization.minimize = true;

    return config;
  },
};

export default nextConfig;
