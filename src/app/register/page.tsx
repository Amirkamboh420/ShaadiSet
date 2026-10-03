import type { Metadata } from 'next'
import { AuthPage } from '@/components/marketplace/auth-page'

export const metadata: Metadata = {
  title: 'Create an account | ShaadiSet',
  description: 'Create a ShaadiSet account to save vendors and plan your wedding.',
}

export default function RegisterPage() {
  return <AuthPage mode="register" />
}
