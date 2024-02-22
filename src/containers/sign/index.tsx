'use client';

import SignCard from './components/sign-card';
import {useAuth} from '@/hooks/useAuth';
import {Button} from '@/components/ui/button';
import {useMutation} from '@tanstack/react-query';
import {signout} from '@/services/auth';

export default function SignContainer() {
  const {authType, email} = useAuth();

  const {mutateAsync: signoutMutation} = useMutation({
    mutationFn: async () => await signout({email}),
  });

  const signPayload =
    authType === 'in'
      ? {
          title: 'Welcome to glimpse!',
          subTitle: 'Create a profile card to interact with participants!',
          authType,
        }
      : {
          title: 'Enter code',
          subTitle: `Please enter the six-digit code sent to`,
          authType,
        };

  return (
    <div>
      <SignCard {...signPayload} />
      <Button
        variant="secondary"
        onClick={() => {
          if (email !== '') {
            signoutMutation();
          }
        }}
      >
        테스트 로그아웃
      </Button>
    </div>
  );
}
