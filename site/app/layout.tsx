import Header from '@/lib/components/header'
import type { ReactNode } from 'react'
import ThemeRegistry from '../lib/components/theme-registry'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <!-- Favicon --> */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Chain RPC" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta
          name="keywords"
          content="Blockchain, Node Provider, TON, Bitcoin, Ethereum, Monero, Blockchain as a Service, API Key, ChainRPC, Blockchain Network Access, Node Hosting"
        />
        <link rel="canonical" href="https://chain-rpc.online" />
      </head>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header/>
        <ThemeRegistry options={{ key: 'joy' }}>
            {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
