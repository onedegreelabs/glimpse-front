'use client';

import { useState } from 'react';
import SignCard from './components/sign-card';
import { useAuth } from '@/hooks/useAuth';

export default function SignContainer() {
  const { authType } = useAuth();

  const signPayload =
    authType === 'in'
      ? {
          title: 'Welcome to glimpse!',
          subTitle: 'Create a profile card to interact with participants!',
          authType
        }
      : {
          title: 'Enter code',
          subTitle: `Please enter the six-digit code sent to`,
          authType
        };

  return (
    <div>
      <SignCard {...signPayload} />
    </div>
  );
}
