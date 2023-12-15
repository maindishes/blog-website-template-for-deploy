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

- next 에서 export 명령어를 쓰면 정적페이지를 따로 ./out 에 빼준다.
- 근데 최신 버전에선 next export 명령어가 removed가 되었다.
- https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
