declare module "*.mdx" {
  import type { FC } from "react"
  const component: FC
  export default component
  export const frontmatter: Record<string, any>
}
