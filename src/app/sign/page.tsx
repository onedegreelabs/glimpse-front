'use client';

import styles from './page.module.scss';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import {useState} from 'react';
import {SessionProvider} from 'next-auth/react';

export default function Sign() {
  const [isSendMail, setIsSendMail] = useState(false);
  const [mailAddress, setMailAddress] = useState('');
  return (
    <div className={styles['sign-wrapper']}>
      <div className={styles['sign-header']}>
        <div className={styles['logo-area']}>
          <div className={styles['text-area']}>Glimpse</div>
        </div>
      </div>
      {!isSendMail ? (
        <SessionProvider>
          <SignIn
            setIsSendMail={setIsSendMail}
            mailAddress={mailAddress}
            setMailAddress={setMailAddress}
          />
        </SessionProvider>
      ) : (
        <SignUp mailAddress={mailAddress} />
      )}
    </div>
  );
}
