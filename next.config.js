const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
		reactStrictMode: true, 
		swcMinify: true,
		basePath: '/blog-website-template-for-deploy',
		assetPrefix: '/blog-website-template-for-deploy/',
}

module.exports = withContentlayer(nextConfig)
