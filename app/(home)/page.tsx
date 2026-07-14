import { Container, Stack } from "@mui/joy"
import type { Metadata } from "next"
import HomeContent from "@/content/home.mdx"
import { Footer } from "@/lib/components/footer"

export const metadata: Metadata = {
  title: "Контрактное производство и металлообработка полного цикла",
  description:
    "Изготовление сложных металлических деталей на ЧПУ: фрезерование до 5 осей, токарка, литье и термообработка — полный цикл",
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
