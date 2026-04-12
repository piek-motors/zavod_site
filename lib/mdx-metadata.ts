export type Params = Promise<{ slug: string }>

export function createMetadataFactory(subDirectory: string) {
  return async function generateMetadataLib({ params }: { params: Params }) {
    let { slug } = await params
    if (!slug) {
      slug = "index"
    }

    const { frontmatter } = (await import(`@/content/${subDirectory}/${slug}.mdx`)) as any
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    }
  }
}
