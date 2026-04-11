import {  Container, Typography } from '@mui/joy'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты | Завод ПЭК',
}

export default function ContactUs() {
  return (
    <>
      <main>
        <Container maxWidth='sm'>
          <Typography>
            Email <Typography level='body-md' px={1} fontWeight={600}>info@piek.ru</Typography>
          </Typography>
        </Container>
      </main>
    </>
  )
}
