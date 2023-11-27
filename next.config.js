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
                protocol: 'http',
                hostname: '192.168.1.3',
                port: '8000',
                pathname: '/*',
            },
        ],
    },
};

module.exports = nextConfig;
