'use client';

import styles from './page.module.scss';
import SignUp from './up';
import SignIn from './in';
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
        <SignUp />
      )}
    </div>
  );
}
