'use client';

import React, { useState } from 'react';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { PasswordForm } from '@/components/settings/PasswordForm';
import { DeleteAccountDialog } from '@/components/settings/DeleteAccountDialog';
import { Button } from '@/components/ui/button';

export default function SettingsPage(): React.JSX.Element {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="border-b border-[#D9D3C5] pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#111111]">Settings</h1>
        <p className="mt-1.5 text-sm text-[#555047]">Manage your account preferences.</p>
      </div>

      {/* Profile */}
      <section className="mb-10">
        <h2 className="mb-1 text-xl font-semibold text-[#111111]">Profile</h2>
        <p className="mb-6 text-sm text-[#555047]">Update your display name.</p>
        <ProfileForm />
      </section>

      <div className="border-t border-[#D9D3C5] mb-10" />

      {/* Password */}
      <section className="mb-10">
        <h2 className="mb-1 text-xl font-semibold text-[#111111]">Password</h2>
        <p className="mb-6 text-sm text-[#555047]">Change your account password.</p>
        <PasswordForm />
      </section>

      <div className="border-t border-[#D9D3C5] mb-10" />

      {/* Danger zone */}
      <section>
        <h2 className="mb-1 text-xl font-semibold text-[#B83232]">Danger zone</h2>
        <p className="mb-6 text-sm text-[#555047]">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        <Button
          onClick={() => setDeleteOpen(true)}
          variant="outline"
          className="border-[#B83232] bg-white text-[#B83232] hover:bg-[#B83232] hover:text-white rounded-sm"
        >
          Delete account
        </Button>
      </section>

      <DeleteAccountDialog open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
