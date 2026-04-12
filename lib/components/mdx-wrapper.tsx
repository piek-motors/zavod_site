import { Box, Container, Typography } from "@mui/joy"
import { BackgroundImageSetter } from "./background-image-setter"
import "../../app/global.css"

export function MDXWrapper({
  children,
  frontmatter,
}: {
  children: React.ReactNode
  frontmatter: any
}) {
  const { title, description, bg } = frontmatter

  return (
    <>
      <BackgroundImageSetter bg={bg} />
      <Box
        sx={{
          pb: 5,
        }}
      >
        <Container maxWidth="md">
          <Box my={3}>
            <Typography sx={{ my: 2 }} level="h1">
              {title}
            </Typography>
            <Typography level="body-lg">{description}</Typography>
          </Box>
          {children}
        </Container>
      </Box>
    </>
  )
}
