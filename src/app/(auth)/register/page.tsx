import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create account — Verifex',
};

export default function RegisterPage(): React.JSX.Element {
  return <RegisterForm />;
}
