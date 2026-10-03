import type { Metadata } from 'next'
import { AuthPage } from '@/components/marketplace/auth-page'

export const metadata: Metadata = {
  title: 'Login | ShaadiSet',
  description: 'Login to your ShaadiSet account and continue planning your wedding.',
}

export default function LoginPage() {
  return <AuthPage mode="login" />
}
