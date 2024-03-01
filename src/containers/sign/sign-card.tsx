'use client';

import {useAuth} from '@/hooks/useAuth';
import SignForm from './sign-form';
import SignCord from './sign-cord';

export default function SignCard() {
  const {status, email} = useAuth();

  const textInfo =
    status === 'email'
      ? {
          title: 'Welcome to glimpse!',
          subTitle: 'Create a profile card to interact with participants!',
        }
      : {
          title: 'Enter code',
          subTitle: `Please enter the six-digit code sent to ${email}.`,
        };

  return (
    <div className="h-full w-full gap-4 flex flex-col items-center justify-center">
      <div className="text-center gap-4 flex flex-col w-full">
        <h1 className="text-[24px]">{textInfo.title}</h1>
        <p className="text-[12px]">{textInfo.subTitle}</p>
      </div>
      {status === 'email' ? <SignForm /> : <SignCord />}
    </div>
  );
}
