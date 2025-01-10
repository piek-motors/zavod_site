"use client"

import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  ModalDialogProps,
  Typography,
} from "@mui/joy"
import Link from "next/link"
import React from "react"

export const MobileHeader = () => {
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined)

  const LinkButton = ({
    children,
    href,
    buttonProps,
  }: {
    children: React.ReactNode
    href: string
    buttonProps?: React.ComponentProps<typeof Button>
  }) => {
    return (
      <Link href={href}>
        <Button
          sx={{ width: "100%", borderRadius: 15 }}
          size="lg"
          {...buttonProps}
          onClick={() => setLayout(undefined)}
        >
          {children}
        </Button>
      </Link>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          alignItems: "center",
          p: 1,
          gap: {
            sm: 1,
            md: 3,
          },
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography fontWeight={700}>Chain RPC</Typography>
        </Link>
        <Button
          sx={{ ml: "auto" }}
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("fullscreen")
          }}
        >
          =
        </Button>
      </Box>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>Chain RPC</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
          >
            <LinkButton
              href="contact-us"
              buttonProps={{ size: "lg", variant: "soft" }}
            >
              Contact us
            </LinkButton>
            <LinkButton
              href="sign-in"
              buttonProps={{ size: "lg", color: "neutral" }}
            >
              Sign in
            </LinkButton>
            <Divider sx={{ my: 2}} />
            <LinkButton href="/docs" buttonProps={{ variant: "plain" }}>
              Documentation
            </LinkButton>
            <LinkButton href="/blog" buttonProps={{ variant: "plain" }}>
              Blog
            </LinkButton>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  )
}
