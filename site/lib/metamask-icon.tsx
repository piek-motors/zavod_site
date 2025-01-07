'use client'
import { Box } from '@mui/joy'
import Image from 'next/image'

export default function MetaMaskIcon() {
  return (
    <Box fontSize="xl">
      <Image src="/meta-mask_icon.svg" alt="" width={30} height={30} />
    </Box>
  )
}
