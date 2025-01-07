import { Footer } from '@/lib/footer'
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/joy'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blockchain Node RPC Provider | ChainRPC',
  description: `
Easily connect to blockchain networks with our Pay-as-You-Go RPC service. 
Whether you’re building apps or exploring blockchain technology, we provide simple, reliable access to major networks like Ethereum, Bitcoin, and TON.
No upfront costs—just fast, secure, and easy integration for all your blockchain needs
`,
}

export default function HomePage() {
  return (
    <main>
      <Container>
        <Box
          id="home"
          sx={{
            textAlign: 'center',
            my: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            gap={1}
            pt={1}
            pb={3}
            display="flex"
            justifyContent="center"
            sx={{
              flexDirection: {
                sm: 'row',
                xs: 'column-reverse',
              },
            }}
          >
            <Box
              minWidth={50}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src="/logo.png" alt="ChainRPC Logo" width="50" height="50" />
            </Box>
            <Typography level="h1" fontWeight={400}>
              The Block <Typography fontWeight={700}>Chain RPC</Typography>{' '}
              Service Provider
            </Typography>
          </Box>

          <Typography level="body-md" justifyContent="center">
            Your trusted partner for reliable, scalable, and efficient
            blockchain node services. Access blockchain networks quickly and
            securely with our easy-to-use API. Take advantage of our seamless{' '}
            <strong>Blockchain as a Service (BaaS)</strong> offering to
            integrate blockchain functionalities into your applications.
          </Typography>

          {/* Services List */}
          <List
            sx={{
              my: 2,
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ListItem>
              <Link href="/docs/ton" color="primary">
                The Open Network (TON) Node
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/docs/bitcoin" color="primary">
                Bitcoin (BTC) Node
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/docs/ethereum" color="primary">
                Ethereum (ETH) Node
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/docs/monero" color="primary">
                Monero (XMR) Node
              </Link>
            </ListItem>
          </List>
          <Link href="/sign-in">
            <Button
              variant="solid"
              color="primary"
              type="button"
              sx={{ borderRadius: 12, mb: 5 }}
            >
              Get API Key
            </Button>
          </Link>
          <Divider />
          <Box justifyContent="start" my={2} textAlign="center">
            <Typography level="h2" sx={{ mt: 4, mb: 2 }}>
              Pricing
            </Typography>

            <Typography level="body-md">
              Our flexible pricing options make it easy to get started with
              blockchain nodes, whether you're a startup, an enterprise, or an
              individual developer. Choose the plan that best fits your needs:
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                py: 5,
                maxWidth: 400,
                mx: 'auto',
                gap: 2,
              }}
            >
              <div>
                - <strong>Free Tier</strong>: Limited access to API, suitable
                for testing and development.
              </div>
              <div>
                - <strong>Startup Tier</strong>: Access to mainnet nodes with
                increased rate limits and 24/7 support.
              </div>
            </Box>
            <Link href={'/contact-us'}>
              <Button
                variant="solid"
                color="neutral"
                type="button"
                // center
                sx={{ borderRadius: 12, justifyContent: 'center' }}
              >
                Contact Sales
              </Button>
            </Link>
          </Box>
        </Box>
        {/* Footer */}
        <Footer />
      </Container>
    </main>
  )
}
