/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bglkwchvahqordyeevox.supabase.co",
            },
        ],
    },
};

export default nextConfig;
