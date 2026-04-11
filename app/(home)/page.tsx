import { Box, Container, Divider } from "@mui/joy"
import { Metadata } from "next"
import HomeContent from "@/content/home.mdx"
import { Footer } from "@/lib/components/footer"

export const metadata: Metadata = {
  title: "Контрактное производство и металлообработка на ЧПУ | ООО ПЭК",
  description:
    "Высокоточная обработка металла любой сложности: фрезерование до 5 осей, токарные работы, литье и термообработка",
}

export default function HomePage() {
  return (
    <main>
      <Container maxWidth='md'>
        <Box
          id="home"
          sx={{
            // textAlign: "center",
            // my: 4,
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
            <HomeContent />
        </Box>
        <Footer />
      </Container>
    </main>
  )
}
