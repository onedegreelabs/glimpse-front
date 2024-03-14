'use client';

import Image from 'next/image';
import styles from './createRoundButton.module.scss';
export default function CreateRoundButton() {
  return (
    <div className={styles['button-wrapper']}>
      <Image
        src="/assets/profile/plus.svg"
        alt="닫기버튼"
        width={40}
        height={40}
      />
    </div>
  );
}
