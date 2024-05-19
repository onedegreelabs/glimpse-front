'use client';
import Card from '@/components/card/Card';
import styles from './index.module.scss';
import Button from '@/components/button/Button';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {sendMailWithCode} from '@/apis/signApi';
import {useIsLoginStore} from '@/stores/auth';
import {signIn} from 'next-auth/react';

interface SignInProps {
  setIsSendMail: React.Dispatch<React.SetStateAction<boolean>>;
  mailAddress: string;
  setMailAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignIn({
  setIsSendMail,
  mailAddress,
  setMailAddress,
}: SignInProps) {
  const router = useRouter();
  const isLogin = useIsLoginStore(state => state.isLogin);

  useEffect(() => {
    if (isLogin) {
      router.push('/events/discover');
    }
  }, [isLogin]);

  const [isInvalidMail, setIsInvalidMail] = useState<Boolean>(false);

  const onClickEmailButton = async function () {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (emailRegex.test(mailAddress)) {
      setIsSendMail(true);
      await sendMailWithCode(mailAddress);
    } else {
      setIsInvalidMail(true);
    }
  };

  const mailInputRef = useRef<HTMLInputElement | null>(null);
  const isRendered = useRef(false);
  useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true;
    } else {
      if (mailInputRef.current) {
        const mailButton = mailInputRef.current;
        const handleKeyDown = function (e: {
          key: string;
          preventDefault: () => void;
        }) {
          if (e.key === 'Enter') {
            e.preventDefault();
            onClickEmailButton();
          }
        };
        mailButton.addEventListener('keydown', handleKeyDown);
        return () => {
          mailButton.removeEventListener('keydown', handleKeyDown);
        };
      }
    }
    return;
  }, [mailAddress]);

  return (
    <div className={styles['signin-wrapper']}>
      <Card width={334} height={320}>
        <div className={styles['card-wrapper']}>
          <div className={styles['card-title']}>Welcome to glimpse!</div>
          <div className={styles['card-sub-title']}>
            Create a profile card to interact with participants!
          </div>
          <div className={styles['card-body']}>
            <input
              className={clsx(styles['email-input'], {
                [styles['invalid-mail']]: isInvalidMail,
              })}
              placeholder="email address"
              ref={mailInputRef}
              onChange={e => {
                setMailAddress(e.target.value);
                setIsInvalidMail(false);
              }}
            ></input>
            <div
              className={clsx(styles['invalid-text'], {
                [styles['show']]: isInvalidMail,
              })}
            >
              <Image
                alt="icon"
                src="/icons/warning_icon.svg"
                width={16}
                height={16}
              />
              <div className={styles['text-area']}>email is not valid</div>
            </div>
            <Button
              color="ffffff"
              bgColor="868686"
              text="Continue with email"
              clickEvent={onClickEmailButton}
            />
            <Button
              color="3D3F43"
              bgColor="ffffff"
              borderColor="D9D9D9"
              borderRadius="4"
              text="Sign in  with google"
              clickEvent={() => signIn('google')}
            >
              <Image
                src={'/icons/google_icon.svg'}
                alt="google"
                width={18}
                height={18}
              />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
