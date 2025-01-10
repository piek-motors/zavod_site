import { Box, Container, Typography } from "@mui/joy"

export function MDXWrapper({
  children,
  frontmatter,
}: {
  children: React.ReactNode
  frontmatter: any
}) {
  const { title, description, lastUpdated } = frontmatter

  return (
    <>
      <Container maxWidth="md">
        <Box my={3} mb={6}>
          <Typography sx={{ my: 2 }} level="h1">
            {title}
          </Typography>
          <Typography sx={{ my: 2 }} level="body-lg">
            {description}
          </Typography>
        </Box>

        {children}

        {lastUpdated && (
          <Typography sx={{ my: 2 }} level="body-sm">
            Last updated: {lastUpdated}
          </Typography>
        )}
      </Container>
    </>
  )
}

// Metadata setup
export function generateMetadataFactory(subDirectory: string) {
  return async function generateMetadataLib({
    params,
  }: {
    params: { slug: string }
  }) {
    let slug = params.slug
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
