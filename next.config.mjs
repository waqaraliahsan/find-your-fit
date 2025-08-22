/** Next.js config for App Router */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }
    ]
  }
};
export default nextConfig;
