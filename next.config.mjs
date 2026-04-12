import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  output: "standalone",
  // Add build ID for cache busting across deployments
  generateBuildId: async () => {
    return `${Date.now()}`
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
