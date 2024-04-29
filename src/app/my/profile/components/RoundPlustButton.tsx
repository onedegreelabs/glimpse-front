'use client';

import Image from 'next/image';
import styles from './roundPlusButton.module.scss';
import {Dispatch, SetStateAction} from 'react';
export default function RoundPlustButton({
  onClickBtn,
}: {
  onClickBtn: () => void;
}) {
  return (
    <div className={styles['button-wrapper']} onClick={onClickBtn}>
      <Image
        src="/assets/profile/plus.svg"
        alt="plus button"
        width={40}
        height={40}
      />
    </div>
  );
}
