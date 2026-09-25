/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/coding',
        destination: '/courses/coding',
        permanent: false,
      },
      {
        source: '/math',
        destination: '/courses/math',
        permanent: false,
      },
      {
        source: '/english',
        destination: '/courses/english',
        permanent: false,
      },
      {
        source: '/science',
        destination: '/courses/science',
        permanent: false,
      },
      {
        source: '/coding/online-coding-classes-for-kids',
        destination: '/courses/coding',
        permanent: false,
      },
      {
        source: '/math/online-math-classes-for-kids',
        destination: '/courses/math',
        permanent: false,
      },
      {
        source: '/english/online-english-classes-for-kids',
        destination: '/courses/english',
        permanent: false,
      },
      {
        source: '/science/online-science-classes-for-kids',
        destination: '/courses/science',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
