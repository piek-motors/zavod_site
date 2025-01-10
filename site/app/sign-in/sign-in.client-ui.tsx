'use client'
import { Footer } from '@/lib/components/footer'
import MetaMaskIcon from '@/lib/metamask-icon'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Web3 } from 'web3'

type Status = 'none' | 'loading' | 'waiting for approval' | 'error'

export default function SignInClientUI() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('none')

  async function requestMetaMaskAccount() {
    try {
      setStatus('loading')
      // @ts-ignore
      const provider = window.ethereum || window.web3?.provider || null
      if (!provider) {
        console.error('!provider')
        alert('Please install MetaMask to log in to ChainRPC')
        return
      }

      const web3 = new Web3(provider)
      const accounts = await web3.eth.requestAccounts()

      // request a nonce from server
      const res = await fetch('/api/metamask/nonce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: accounts[0],
        }),
      }).then((res) => res.json())

      const nonce = res.nonce
      const walletAddress = accounts[0]
      const password = ''
      setStatus('waiting for approval')
      const signature = await web3.eth.personal.sign(
        nonce,
        walletAddress,
        password,
      )

      // send signatur to the our backend
      setStatus('loading')
      const verifyRes = await fetch('/api/metamask/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sign: signature,
          address: walletAddress,
          nonce,
        }),
      }).then((res) => res.json())

      if (verifyRes.status === 'ok') {
        router.replace('/dashboard')
        return
      } else {
        alert('Authentication failed')
      }
    } catch (error: any) {
      console.log(`Error connecting to MetaMask: ${error.message}`)
      setStatus('error')
    } finally {
    }
  }

  const actionOrStatus = () => {
    if (status === 'error') {
      return (
        <Typography level="body-md" sx={{ textAlign: 'center' }} color="danger">
          Authentication failed
        </Typography>
      )
    }

    if (status === 'waiting for approval') {
      return (
        <Typography level="body-md" sx={{ textAlign: 'center' }}>
          Waiting for approval
        </Typography>
      )
    }

    if (status === 'loading') {
      return (
        <Typography level="body-md" sx={{ textAlign: 'center' }}>
          Loading...
        </Typography>
      )
    }

    if (status === 'none') {
      return (
        <>
          {/* <Button
          size="lg"
          variant="soft"
          color="neutral"
          fullWidth
          startDecorator={<GoogleIcon />}
        >
          Continue with Google
        </Button> */}
          <Button
            size="lg"
            variant="soft"
            color="neutral"
            fullWidth
            onClick={requestMetaMaskAccount}
            startDecorator={<MetaMaskIcon />}
          >
            Continue with MetaMask
          </Button>
        </>
      )
    }
  }

  return (
    <>
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                {actionOrStatus()}
              </Stack>
            </Stack>
          </Box>
          <Footer />
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          // [theme.getColorSchemeSelector('dark')]: {
          //   backgroundImage:
          //     'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          // },
        })}
      />
    </>
  )
}
