import { Box, Container,  Stack } from "@mui/joy"
import { Metadata } from "next"
import HomeContent from "@/content/home.mdx"
import { Footer } from "@/lib/components/footer"
import Sidenav from "@/lib/components/sidenav"

export const metadata: Metadata = {
  title: "Контрактное производство и металлообработка на ЧПУ | ООО ПЭК",
  description:
    "Высокоточная обработка металла любой сложности: фрезерование до 5 осей, токарные работы, литье и термообработка",
}

export default function HomePage() {
  return (
    <main>
      <Stack direction={'row'}>
      <Sidenav/>
      <Container maxWidth='md'>
        <Box
          id="home"
          sx={{
             my: 4,
          }}
        >
            <HomeContent />
        </Box>
        <Footer />
      </Container>
      </Stack>
    </main>
  )
}
