import React, {useEffect, useRef, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {codeSchema} from '@/containers/sign/constants/sign.schema';
import {customAxios} from '@/services/headers';
import {useAuth} from '@/hooks/useAuth';
import {useRouter, useSearchParams} from 'next/navigation';

export default function SignCord() {
  const {email} = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const {control, setValue, watch} = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: ['', '', '', '', '', ''],
    },
  });
  const code = watch('code');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    const allFilled = code.every(c => c !== '');

    if (allFilled && code.join('').length === 6) {
      submitCode(code.join(''));
    }
  }, [code.join('')]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    pasteData.split('').forEach((value, i) => {
      setValue(`code.${i}`, value);
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = value;
      }
    });
    if (pasteData.length === 6) {
      inputRefs.current[pasteData.length - 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    setValue(`code.${index}`, value);
  };

  const submitCode = async (fullCode: string) => {
    const credentials = btoa(`${email}:${fullCode}`);
    try {
      const {data} = await customAxios.get('/auth/token', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      if (data) {
        router.replace('/my/profile');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setServerError('서버 에러가 발생하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div
        className="w-full flex justify-center space-x-2"
        onPaste={handlePaste}
      >
        {Array.from({length: 6}).map((_, index) => (
          <Controller
            key={index}
            name={`code.${index}`}
            control={control}
            render={({field}) => (
              <input
                {...field}
                ref={el => (inputRefs.current[index] = el)}
                onChange={e => handleChange(index, e)}
                onKeyDown={e => e.key === 'Backspace' && handleBackspace(index)}
                className="w-10 h-10 border border-solid border-[#D9D9D9] text-center rounded text-lg"
                style={{borderColor: '#D9D9D9', borderRadius: '4px'}}
                maxLength={1}
                type="text"
                pattern="\d*"
              />
            )}
          />
        ))}
      </div>
      {serverError ? (
        <div className="w-full text-red-600 text-[14px]">{serverError}</div>
      ) : null}
    </div>
  );
}
