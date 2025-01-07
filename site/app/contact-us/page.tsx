import { Box, Container, Typography } from '@mui/joy'
import { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact us | ChainRPC',
  description: `
Easily connect to blockchain networks with our Pay-as-You-Go RPC service. 
Whether you’re building apps or exploring blockchain technology, we provide simple, reliable access to major networks like Ethereum, Bitcoin, and TON.
No upfront costs—just fast, secure, and easy integration for all your blockchain needs
`,
}

export default function ContactUs() {
  return (
    <>
      <main>
        <Container>
          {/* create a contact page with form with email and message */}
          <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              maxWidth: 400,
              gap: 2,
              margin: '0 auto',
            }}
          >
            <Link href="/">
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src="/logo.png" alt="ChainRPC Logo" width="100" />
              </Box>
            </Link>

            <Typography level="h1" fontWeight={400} mb={5} textAlign={'center'}>
              Contact with <b>The Block Chain RPC Service Provider</b>
            </Typography>

            <ContactForm />
          </Box>
        </Container>
      </main>
    </>
  )
}
