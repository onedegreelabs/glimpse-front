import {useState} from 'react';
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {emailScema} from './sign.schema';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {customAxios} from '@/services/headers';
import {cn} from '@/lib/utils';
import {useAuth} from '@/hooks/useAuth';

export default function SignForm() {
  const {setStatus, setEmail} = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof emailScema>>({
    resolver: zodResolver(emailScema),
    defaultValues: {
      email: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof emailScema>) => {
    setServerError(null);

    try {
      await customAxios.post('/auth/email/request-code', {
        ...values,
      });
      setEmail(values.email);
      setStatus('code');
    } catch (error) {
      console.log(error);
      setServerError('서버 에러가 발생하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="w-full flex flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email address"
                  disabled={isLoading}
                  {...field}
                  className={cn(
                    'w-full h-[44px] border border-solid rounded-[4px] text-[16px] placeholder:text-[#D9D9D9]',
                    form.getFieldState('email').error
                      ? 'border-[#F52D2D]'
                      : 'border-[#D9D9D9]'
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="ghost"
          size="default"
          className="bg-[#868686] w-full py-2.5 h-[44px] px-4 font-semibold text-white text-[16px]"
        >
          Continue with email
        </Button>
        {serverError ? (
          <div className="w-full text-red-600 text-[14px]">{serverError}</div>
        ) : null}
      </form>
    </Form>
  );
}
