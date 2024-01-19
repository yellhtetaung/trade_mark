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
                hostname: 'tm007.z191638-s32tf.ps01.zwhhosting.com',
                port: '',
                pathname: '/trademark_sample/*',
            },
        ],
    },
};

module.exports = nextConfig;
