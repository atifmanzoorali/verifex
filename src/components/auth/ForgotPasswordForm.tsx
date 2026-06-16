'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/services/auth.service';

const ForgotSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type ForgotFields = z.infer<typeof ForgotSchema>;

export function ForgotPasswordForm(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotFields>({ resolver: zodResolver(ForgotSchema) });

  async function onSubmit(data: ForgotFields): Promise<void> {
    setLoading(true);
    try {
      await resetPassword(data.email);
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email. Try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Verifex
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Check your inbox</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a reset link to{' '}
            <span className="font-medium text-foreground">{getValues('email')}</span>.
            If it doesn&apos;t arrive, check your spam folder.
          </p>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Verifex
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset your password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
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

        <Button
          type="submit"
          disabled={loading}
          className="mt-1 h-10 w-full rounded-sm text-sm font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            'Send reset link'
          )}
        </Button>
      </form>

      <div className="mt-6">
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
