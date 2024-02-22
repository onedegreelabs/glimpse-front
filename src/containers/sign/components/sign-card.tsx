import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {SigninSchema} from '@/containers/sign/schemas/sign.schema';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useAuth} from '@/hooks/useAuth';
import {Clipboard} from 'lucide-react';
import {useMutation} from '@tanstack/react-query';
import {checkAuth, signupORsignin} from '@/services/auth';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

type SignCardType = {
  title: string;
  subTitle: string;
  authType: string;
};

export default function SignCard({title, subTitle}: SignCardType) {
  const router = useRouter();

  const {setEmail, email, setAuthType, authType} = useAuth();

  const [error, setError] = useState<string | null>(null);

  const {mutateAsync: checkAuthMutaion} = useMutation({
    mutationFn: async (email: string) => await checkAuth({email}),
    onError: (err: any) => {
      if (err?.response?.data?.data?.isAuthenticated) {
        router.push('/events/new');
      }

      setError(err.response.data.message || 'Error!!!');
    },
    onSuccess: ({data}) => {
      if (data.code) {
        setAuthType('up');
      }
    },
  });

  const {mutateAsync: signupMutation} = useMutation({
    mutationFn: async ({email, code}: {email: string; code: string}) =>
      await signupORsignin({email, code}),
    onSuccess: () => router.push('/my/profile'),
  });

  const signInForm = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      code: Array(6).fill(''),
    },
  });

  const signInSubmitHandler = (values: z.infer<typeof SigninSchema>) => {
    setEmail(values.email);

    checkAuthMutaion(values.email);
  };
  const signUpSubmitHandler = (values: {code: string[]}) => {
    const fullCode = values.code.join('');

    signupMutation({email, code: fullCode});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="mb-4 text-[24px]">{title}</h1>
        {authType === 'in' ? (
          <p className="text-[12px]">{subTitle}</p>
        ) : (
          <p className="text-[12px]">
            {subTitle}
            <br />
            <span className="font-semibold">{email}</span>
          </p>
        )}
      </div>
      {authType === 'in' ? (
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(signInSubmitHandler)}
            className="flex flex-col gap-9"
          >
            <FormField
              name="email"
              control={signInForm.control}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-[44px] w-[300px] rounded-[4px] border border-solid border-[#D9D9D9] placeholder:text-[16px] placeholder:font-normal placeholder:text-[#D9D9D9]"
                      placeholder="email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="ghost"
              size="lg"
              className="flex w-full items-center justify-center rounded-[4px] bg-[#868686] px-4 py-2.5 text-white"
            >
              Continue with email
            </Button>
          </form>
          <div className="text-[12px] text-red-700">{error}</div>
        </Form>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(signUpSubmitHandler)}
            className="flex items-center justify-center gap-2.5"
          >
            {Array.from({length: 6}).map((_, index) => (
              <Input
                key={index}
                {...register(`code.${index}`)}
                maxLength={1}
                onKeyUp={e => {
                  const value = watch(`code.${index}`);
                  if (e.key === 'Backspace' && !value) {
                    if (index > 0) {
                      const previousInput =
                        document.querySelector<HTMLInputElement>(
                          `input[name="code.${index - 1}"]`
                        );
                      if (previousInput) {
                        previousInput.focus();
                      }
                    }
                  } else if (value.length === 1 && index < 5) {
                    const nextInput = document.querySelector<HTMLInputElement>(
                      `input[name="code.${index + 1}"]`
                    );
                    if (nextInput) {
                      nextInput.focus();
                    }
                  } else if (index === 5 && value.length === 1) {
                    const isAllFilled = Array.from({length: 6}).every(
                      (_, idx) => watch(`code.${idx}`).length === 1
                    );
                    if (isAllFilled) {
                      e.preventDefault();
                      handleSubmit(signUpSubmitHandler)();
                    }
                  }
                }}
                className="h-[40px] w-[40px] border border-solid border-[#D9D9D9] text-center"
              />
            ))}
          </form>
          <div className="mt-9 flex items-center justify-between">
            <Button
              type="submit"
              variant="ghost"
              size="lg"
              className="flex items-center justify-around gap-1.5 bg-[#F3F3F3] px-2.5 py-1 text-[12px]"
            >
              <Clipboard className="h-5 w-5" />
              paste code
            </Button>
            <span className="cursor-pointer text-[12px]">resend code</span>
          </div>
        </>
      )}
    </div>
  );
}
