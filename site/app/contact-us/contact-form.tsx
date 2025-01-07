'use client'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy'
import { useState } from 'react'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries((formData as any).entries())

        fetch('/api/contact-us', {
          method: 'POST',
          body: JSON.stringify(formJson),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Data:', data)
            setSent(true)
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }}
    >
      {sent ? (
        <Typography level="body-md" sx={{ textAlign: 'center' }}>
          Thank you for your message! We will get back to you soon.
        </Typography>
      ) : (
        <Stack
          sx={{
            minWidth: {
              xs: '100%',
              sm: '400px',
            },
            width: '100%',
            display: 'flex',
            gap: 3,
          }}
        >
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input
              size="lg"
              type="email"
              name="email"
              placeholder="Email to contact with you"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Details</FormLabel>
            <Textarea
              size="lg"
              name="details"
              placeholder="Tell the specifics of your request or ask question"
            />
          </FormControl>
          <Button type="submit" size="lg" sx={{ borderRadius: 40 }}>
            Submit
          </Button>
        </Stack>
      )}
    </form>
  )
}
