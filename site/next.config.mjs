import createMDX from "@next/mdx"
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    jsx: true,
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm]
  }
})
/** @type {import('next').NextConfig} */
const config = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  experimental: {
    // mdxRs: true,
  },
  output: "standalone",
}

export default withMDX(config)
