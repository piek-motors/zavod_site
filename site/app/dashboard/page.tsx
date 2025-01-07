'use server'
import { isAuthenticated, logoutAndDeleteToken } from '@/lib/dal'
import { Box, Button, Container, Divider, Typography } from '@mui/joy'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await isAuthenticated()
  if (session == null) {
    console.log('Dashboard session not validated. redirecting to sign-in')
  }

  async function logout() {
    'use server'
    await logoutAndDeleteToken()
    redirect('/')
  }

  return (
    <main>
      <Container>
        <Box
          display="flex"
          flexDirection={'row'}
          gap={2}
          mt={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Link href="/">
            <Box minWidth={50}>
              <img src="/logo.png" alt="ChainRPC Logo" width="50" height="50" />
            </Box>
          </Link>
          <Typography level="h4">Account</Typography>

          <Box ml={2}>
            <Link href="/docs">Docs</Link>
          </Box>

          <Box
            sx={{ display: 'flex', gap: 5, ml: 'auto', alignItems: 'center' }}
          >
            <Button onClick={logout} color="danger" variant="soft">
              Log out
            </Button>
          </Box>
        </Box>
        <Box mt={6}>
          <Typography level="title-lg" gutterBottom mb={4}>
            Your Authorization API Key
          </Typography>
          <Typography gutterBottom>
            The API key is your unique identifier that grants access to our
            blockchain nodes.
          </Typography>

          <CodeBlock>
            <Pre>{session?.apiKey.api_key}</Pre>
          </CodeBlock>

          <Typography gutterBottom>
            You must include this API key in the header of every request you
            send to our servers. Here's an example of a complete cURL command
            using the API key:
          </Typography>

          <CodeBlock lang="bash">
            <Pre>
              {`
curl https://api.chain-rpc.online/bitcoin \\
  -X POST -H "Content-Type: application/json" \\
  -H "x-api-key: ${session?.apiKey.api_key}" \\
  -d '{ "jsonrpc": "2.0", "id": 1,
    "method": "getblockchaininfo",
    "params": []
}'
              `}
            </Pre>
          </CodeBlock>
          <Divider />
          <Typography level="body-xs" color="danger" gutterBottom mt={3}>
            Warning: Never share your API key in public or include it in
            unsecured code repositories. If you believe your API key has been
            compromised, please contact us immediately.
          </Typography>
        </Box>
      </Container>
    </main>
  )
}
