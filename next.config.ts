import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/bank", destination: "/patterns", permanent: false },
      { source: "/learn", destination: "/patterns", permanent: false },
      {
        source: "/learn/patterns/:slug",
        destination: "/patterns/:slug",
        permanent: false,
      },
      { source: "/bank/bosscoder", destination: "/practice", permanent: false },
      {
        source: "/bank/patterns/:slug/concept",
        destination: "/patterns/:slug",
        permanent: false,
      },
      {
        source: "/bank/patterns/:slug/practice",
        destination: "/practice",
        permanent: false,
      },
      {
        source: "/bank/:patternSlug/:questionId",
        destination: "/practice/:questionId/notes",
        permanent: false,
      },
      {
        source: "/resources",
        destination: "/system-design",
        permanent: false,
      },
      {
        source: "/dsa-sheet",
        destination: "/system-design",
        permanent: false,
      },
      {
        source: "/dsa-sheet/:path*",
        destination: "/system-design",
        permanent: false,
      },
      {
        source: "/notes/system-design",
        destination: "/system-design/introduction",
        permanent: false,
      },
      {
        source: "/notes/system-design-hld",
        destination: "/system-design/introduction",
        permanent: false,
      },
      {
        source: "/notes/system-design-lld",
        destination: "/system-design/introduction",
        permanent: false,
      },
      {
        source: "/notes/message-brokers",
        destination: "/system-design/kafka",
        permanent: false,
      },
      {
        source: "/notes/data-stores",
        destination: "/system-design/redis",
        permanent: false,
      },
      {
        source: "/notes/:section/:page",
        destination: "/notes/javascript",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
