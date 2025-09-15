import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL(
                "https://qgsmppcfumnnxyd6.public.blob.vercel-storage.com/**"
            ),
        ],
    },
};

export default nextConfig;
