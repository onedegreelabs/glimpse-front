/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Card from '@/components/Card/page';
import styles from './page.module.scss';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import getQueryString from '@/utils/getQueryString';
import _ from 'lodash';
import {verifyEmailCode, sendMailWithCode} from '@/network/api';
import {useRouter} from 'next/navigation';
import isTokenValid from '@/utils/isTokenValid';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    if (isTokenValid()) {
      router.replace('/glimpse-list');
    }
  }, []);

  const url = window.location.href;
  const query = getQueryString(url);
  const mailAddress = _.get(query, 'mailAddress');

  const [digitList, setDigitList] = useState<string[]>([]);
  const handleDigitList = function (index: number, num: string) {
    const copyArr: string[] = [...digitList];
    copyArr[index] = num;
    setDigitList(copyArr);
  };

  const refArr = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleInputChange = (index: number, value: string) => {
    if (value.length === 1 && index < 5) {
      refArr.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    let digitNum = '';
    for (let i = 0; i < 6; i++) {
      digitNum += digitList[i];
      if (digitNum.length === 6) {
        handleAPI(digitNum);
      }
    }
  }, [digitList]);

  const [isInvalidDigit, setIsInvalidDigit] = useState<Boolean>(false);
  const handleAPI = async function (num: string) {
    const response = await verifyEmailCode(mailAddress, num);
    if (response.status === 200) {
      const tokens = response.data;
      const accessToken = _.get(tokens, 'accessToken');
      const refreshToken = _.get(tokens, 'refreshToken');
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/glimpse-list');
    } else {
      alert('로그인에 실패하였습니다.');
    }
  };

  const onPaste = function () {
    navigator.clipboard
      .readText()
      .then(text => {
        if (text.length === 6) {
          refArr.current.forEach((v, i) => {
            if (v) v.value = text[i];
          });
          const textArr = [
            text[0],
            text[1],
            text[2],
            text[3],
            text[4],
            text[5],
          ];
          setDigitList(textArr);
        } else {
          alert('올바른 형식의 인증 번호가 아닙니다.');
        }
      })
      .catch(err => {
        alert('Failed to read text from clipboard:' + err);
      });
  };

  const resendTimerRef = useRef<HTMLDivElement>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const onResend = async function () {
    await sendMailWithCode(mailAddress);
    setIsTimerActive(true);
  };

  useEffect(() => {
    if (isTimerActive) {
      const resendTimerElement = resendTimerRef.current;
      if (resendTimerElement) {
        let seconds = 60;
        resendTimerElement.innerText = `resend code in ${seconds}s`;

        const countDown = setInterval(() => {
          seconds--;
          resendTimerElement.innerText = `resend code in ${seconds}s`;

          if (seconds < 0) {
            clearInterval(countDown);
            setIsTimerActive(false);
          }
        }, 1000);

        return () => clearInterval(countDown);
      }
    }
    return;
  }, [isTimerActive]);

  return (
    <div className={styles['signup-wrapper']}>
      <Card width={334} height={296}>
        <div className={styles['card-wrapper']}>
          <div className={styles['card-title']}>Enter code</div>
          <div className={styles['card-sub-title']}>
            Enter the six-digit code you sent to your email
          </div>
          <div className={styles['digit-area']}>
            {Array.from({length: 6}, (_, index) => (
              <input
                className={styles['input-box']}
                maxLength={1}
                key={index}
                ref={el => (refArr.current[index] = el)}
                onChange={e => {
                  handleInputChange(index, e.target.value);
                  handleDigitList(index, e.target.value);
                  setIsInvalidDigit(false);
                }}
              ></input>
            ))}
          </div>
          <div
            className={clsx(styles['invalid-check'], {
              [styles['show']]: isInvalidDigit,
            })}
          >
            The authentication number is incorrect.
          </div>
          <div className={styles['card-bottom']}>
            <div className={styles['paste-code']} onClick={onPaste}>
              <Image
                alt="icon"
                src="/icons/clipboard.svg"
                width={20}
                height={20}
              />
              paste code
            </div>
            {isTimerActive ? (
              <div
                className={styles['resend-timer']}
                ref={resendTimerRef}
              ></div>
            ) : (
              <div className={styles['resend-code']} onClick={onResend}>
                resend code
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
