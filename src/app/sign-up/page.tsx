'use client';

import Card from '@/components/card/page';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';

export default function SignUp() {
  return (
    <div className={styles['signup-wrapper']}>
      <div className={styles['signin-header']}>
        <div className={styles['logo-area']}>
          <div className={styles['text-area']}>Glimpse</div>
        </div>
      </div>
      <Card width={334} height={415}>
        <div className={styles['card-wrapper']}>
          <div className={styles['card-title']}>Enter code</div>
          <div className={styles['card-sub-title']}>
            Enter the six-digit code you sent to your email
          </div>
          <div className={styles['digit-area']}>
            <input className={styles['input-box']} maxLength={1}></input>
            <input className={styles['input-box']} maxLength={1}></input>
            <input className={styles['input-box']} maxLength={1}></input>
            <input className={styles['input-box']} maxLength={1}></input>
            <input className={styles['input-box']} maxLength={1}></input>
            <input className={styles['input-box']} maxLength={1}></input>
          </div>
          <div className={styles['bottom-area']}>
            <div>paset code</div>
            <div>resend code</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
