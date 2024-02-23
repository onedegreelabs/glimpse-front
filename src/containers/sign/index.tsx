'use client';

import SignCard from './components/sign-card';
import {useAuth} from '@/hooks/useAuth';
import {Button} from '@/components/ui/button';
import {useMutation} from '@tanstack/react-query';
import {signout} from '@/services/auth';
import SoicalLogin from './components/soical-login';

export default function SignContainer({
  user,
}: {
  user: {user: {id: number; email: string; isAuthenticated: boolean}} | null;
}) {
  const {authType} = useAuth();

  const {mutateAsync: signoutMutation} = useMutation({
    mutationFn: async () => await signout({email: user!.user.email}),
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
      <div className="text-[12px] font-semibold text-center mb-4">OR</div>
      <SoicalLogin />
      <Button
        variant="secondary"
        onClick={() => {
          if (user) {
            signoutMutation();
          }
        }}
        className="mt-6"
      >
        테스트 로그아웃
      </Button>
    </div>
  );
}
