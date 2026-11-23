import type { NextConfig } from "next";

// 서버 없이 정적 호스팅(out/)으로 배포한다. 서버 기능(Route Handler, Server Action,
// cookies, rewrites/redirects/headers, 기본 이미지 최적화 등)은 쓸 수 없다.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
