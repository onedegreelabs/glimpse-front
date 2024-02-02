'use client';
import Card from '@/components/Card/page';
import styles from './index.module.scss';
import Button from '@/components/button/page';
import {useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {loginWithLinkedin, profileApi, sendMailWithCode} from '@/network/api';
import Image from 'next/image';
import {signIn} from 'next-auth/react';
import _ from 'lodash';

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
  const isAlreadyLogin = async function () {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/profile');
      return;
    }
    const myUserData = await profileApi.getUserMe();
    const myUserId = _.get(myUserData, 'id');
    if (myUserId) {
      router.replace('/profile');
    }
  };

  useEffect(() => {
    isAlreadyLogin();
  }, []);

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

  const onClickGoogleButton = async function () {
    await signIn('google');
  };

  const onClickLinkedinButton = async function () {
    await loginWithLinkedin();
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
      <Card width={334} height={508}>
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
            <div className={styles['text-area']}>OR</div>
            <Button
              color="ffffff"
              bgColor="000000"
              text="Sign in with apple"
              clickEvent={onClickLinkedinButton}
            >
              <Image
                alt="icon"
                src="/icons/apple_icon.svg"
                width={20}
                height={20}
              />
            </Button>
            <Button
              color="ffffff"
              bgColor="0094FF"
              text="Sign in with google"
              clickEvent={onClickGoogleButton}
            >
              <Image
                alt="icon"
                src="/icons/google_icon.svg"
                width={20}
                height={20}
              />
            </Button>
            <Button
              color="ffffff"
              bgColor="0177B5"
              text="Sign in with linkedIn"
              clickEvent={onClickLinkedinButton}
            >
              <Image
                alt="icon"
                src="/icons/linkedIn_icon.svg"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
