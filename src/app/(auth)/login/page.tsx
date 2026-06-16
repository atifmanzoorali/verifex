import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in — Verifex',
};

export default function LoginPage(): React.JSX.Element {
  return <LoginForm />;
}
