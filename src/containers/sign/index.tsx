'use client';

import styles from './index.module.scss';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import {useState} from 'react';

export default function SignContainer() {
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
        <SignIn
          setIsSendMail={setIsSendMail}
          mailAddress={mailAddress}
          setMailAddress={setMailAddress}
        />
      ) : (
        <SignUp mailAddress={mailAddress} />
      )}
    </div>
  );
}
