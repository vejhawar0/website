import createMDX from '@next/mdx'
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['mdx','tsx'],
  // Optionally, add any other Next.js config below
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      }
    ]
  }
}
 
const withMDX = createMDX({
  // extension: /\.(md|mdx)$/,
  options: {
    // remarkPlugins: [remarkMath],
    // rehypePlugins: [rehypeKatex],
  },
  
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)

