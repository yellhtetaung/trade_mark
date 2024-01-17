/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.echolive.ie',
                port: '',
                pathname: '/cms_media/module_img/**/**',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_BACKEND_URL,
                port: '',
                pathname: '/trademark_sample/*',
            },
        ],
    },
};

module.exports = nextConfig;
