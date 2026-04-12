import { Container, Stack } from "@mui/joy"
import type { Metadata } from "next"
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
      <Stack direction={"row"}>
        <Container maxWidth="md">
          <Stack
            id="home"
            sx={{
              my: 4,
            }}
          >
            <HomeContent />
          </Stack>
          <Footer />
        </Container>
      </Stack>
    </main>
  )
}
