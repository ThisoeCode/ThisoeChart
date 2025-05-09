import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://yt3.ggpht.com/**'),
      new URL('https://pbs.twimg.com/**'),
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
  // allowedDevOrigins: ['192.168.0.27', 'local-origin.dev', '*.local-origin.dev'],
}

export default nextConfig
