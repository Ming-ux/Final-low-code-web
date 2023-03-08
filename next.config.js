/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // distDir: "build"
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/index.html'
            }
        ]
    }
}

module.exports = nextConfig
//将默认端口3000的页面指向index.html