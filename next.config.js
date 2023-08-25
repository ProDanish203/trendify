/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        domains: ["lh3.googleusercontent.com"]
    },
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
}

module.exports = nextConfig
