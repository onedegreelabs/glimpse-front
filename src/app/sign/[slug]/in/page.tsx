import Card from '@/components/card/page';
import styles from './page.module.scss';
import Button from '@/components/button/page';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import clsx from 'clsx';
export default function SignIn() {
  const router = useRouter();

  const [mailAddress, setMailAddress] = useState<string>('');
  const [isInvalidMail, setIsInvalidMail] = useState<Boolean>(false);

  const onClickEmailButton = function () {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (emailRegex.test(mailAddress)) {
      // 백엔드 인증코드 발송 api 실행
      router.push('/sign/up');
    } else {
      setIsInvalidMail(true);
    }
  };

  const mailButton = document.getElementById('mail-button');
  mailButton?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickEmailButton();
    }
  });
  return (
    <div className={styles['signin-wrapper']}>
      <Card width={334} height={448}>
        <div className={styles['card-wrapper']}>
          <div className={styles['card-title']}>Welcome to glimpse!</div>
          <div className={styles['card-sub-title']}>
            Create a profile card to interact with participants!
          </div>
          <div className={styles['card-body']}>
            <input
              className={styles['email-input']}
              placeholder="email address"
              id="mail-button"
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
              email is not valid
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
              clickEvent={null}
            />
            <Button
              color="ffffff"
              bgColor="0094FF"
              text="Sign in with google"
              clickEvent={null}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
