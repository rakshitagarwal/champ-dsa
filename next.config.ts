import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      { source: "/bank", destination: "/learn", permanent: false },
      { source: "/bank/bosscoder", destination: "/practice", permanent: false },
      {
        source: "/bank/patterns/:slug/concept",
        destination: "/learn/patterns/:slug",
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
    ];
  },
};

export default nextConfig;
