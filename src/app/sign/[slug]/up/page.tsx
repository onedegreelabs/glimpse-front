/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Card from '@/components/Card/page';
import styles from './page.module.scss';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import getQueryString from '@/utils/getQueryString';
import _ from 'lodash';
import {verifyEmailCode} from '@/network/api';

export default function SignUp() {
  const url = window.location.href;
  const query = getQueryString(url);
  const mailAddress = _.get(query, 'mailAddress');

  const [digitList, setDigitList] = useState<string[]>([]);
  const handleDigitList = function (index: number, num: string) {
    const copyArr: string[] = [...digitList];
    copyArr[index] = num;
    setDigitList(copyArr);
  };
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const ref4 = useRef<any>(null);
  const ref5 = useRef<any>(null);
  const ref6 = useRef<any>(null);
  const refArr = [ref1, ref2, ref3, ref4, ref5, ref6];

  const handleInputChange = (index: number, value: string) => {
    if (value.length === 1 && index < 5) {
      refArr[index + 1].current.focus();
    }
  };

  useEffect(() => {
    let digitNum = '';
    for (let i = 0; i < 6; i++) {
      digitNum += digitList[i];
      if (digitNum.length === 6) {
        handleAPI(digitNum);
      } else {
        console.log('입력x');
      }
    }
  }, [digitList]);

  const testnum = 123456;

  const [isInvalidDigit, setIsInvalidDigit] = useState<Boolean>(false);
  const handleAPI = async function (num: string) {
    const response = await verifyEmailCode(mailAddress, num);
    console.log(response);
    // if (num === testnum) {
    //   alert('인증 완료!');
    // } else {
    //   setIsInvalidDigit(true);
    //   for (let i = 0; i < 6; i++) {
    //     refArr[i].current.value = '';
    //   }
    //   setDigitList([]);
    //   ref1.current.focus();
    // }
  };

  const onPaste = function () {
    navigator.clipboard
      .readText()
      .then(text => {
        alert('복사된 내용:' + text);
      })
      .catch(err => {
        alert('Failed to read text from clipboard:' + err);
      });
  };

  const onResend = function () {
    alert('인증문자 다시 보내기');
  };
  return (
    <div className={styles['signup-wrapper']}>
      <Card width={334} height={296}>
        <div className={styles['card-wrapper']}>
          <div className={styles['card-title']}>Enter code</div>
          <div className={styles['card-sub-title']}>
            Enter the six-digit code you sent to your email
          </div>
          <div className={styles['digit-area']}>
            {refArr.map((v, index) => {
              return (
                <input
                  className={styles['input-box']}
                  maxLength={1}
                  key={index}
                  ref={refArr[index]}
                  onChange={e => {
                    handleInputChange(index, e.target.value);
                    handleDigitList(index, e.target.value);
                    setIsInvalidDigit(false);
                  }}
                ></input>
              );
            })}
          </div>
          <div
            className={clsx(styles['invalid-check'], {
              [styles['show']]: isInvalidDigit,
            })}
          >
            The authentication number is incorrect.
          </div>
          <div className={styles['card-bottom']}>
            <div onClick={onPaste}>paset code</div>
            <div onClick={onResend}>resend code</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
