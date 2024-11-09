/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns : [
            {
                hostname: 'phim.nguonc.com',
            },
        ],
    }
}

module.exports = nextConfig
