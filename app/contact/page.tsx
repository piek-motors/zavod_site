import { Container, Divider, Link, Typography } from "@mui/joy"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты | Завод ПЭК",
}

export default function ContactUs() {
  return (
    <>
      <main>
        <Container maxWidth="sm">
          <Typography>
            Email:{" "}
            <Link level="body-md" px={0.5} type="email">
              info@piek.ru
            </Link>
          </Typography>
          <Divider orientation="horizontal" />
          <Typography>
            Адрес: Россия, 428037 Чувашская Республика, г. Чебоксары, пр. Машиностроителей, 17
          </Typography>
        </Container>
      </main>
    </>
  )
}
