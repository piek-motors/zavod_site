'use server'
import { isAuthenticated } from '@/lib/dal'
import { redirect } from 'next/navigation'
import SignInClientUI from './sign-in.client-ui'

export default async function SignIn() {
  const session = await isAuthenticated()
  if (session) {
    console.log('SignIn session validated. redirectind to dashboard')
    redirect('/dashboard')
  }

  return <SignInClientUI />
}
