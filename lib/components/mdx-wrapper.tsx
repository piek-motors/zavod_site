import { Box, Container } from "@mui/joy"
import { BackgroundImageSetter } from "./background-image-setter"
import "../../app/global.css"

export function MDXWrapper({
  children,
  frontmatter,
}: {
  children: React.ReactNode
  frontmatter: any
}) {
  return (
    <>
      <BackgroundImageSetter bg={frontmatter.bg} />
      <Box
        sx={{
          py: 2,
        }}
      >
        <Container maxWidth="md">{children}</Container>
      </Box>
    </>
  )
}
