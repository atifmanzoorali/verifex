'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/services/auth.service';

const RegisterSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

type RegisterFields = z.infer<typeof RegisterSchema>;

export function RegisterForm(): React.JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>({ resolver: zodResolver(RegisterSchema) });

  async function onSubmit(data: RegisterFields): Promise<void> {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      toast.success('Check your email to confirm your account.');
      router.push('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed. Try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Verifex
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Already have one?{' '}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Full name
          </Label>
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Atif Manzoor"
            className="rounded-sm border-border bg-surface focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="rounded-sm border-border bg-surface focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            className="rounded-sm border-border bg-surface focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-1 h-10 w-full rounded-sm text-sm font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      <p className="mt-6 text-xs text-muted-foreground">
        By creating an account you agree to the terms of service.
      </p>
    </div>
  );
}
