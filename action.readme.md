## 사전에 수정해야 할것.

1. next.config.js
```js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
		reactStrictMode: true, 
		swcMinify: true,
		output: 'export',
		basePath: '/blog-website-template-for-deploy',
		assetPrefix: '/blog-website-template-for-deploy/',
}

module.exports = withContentlayer(nextConfig)
```