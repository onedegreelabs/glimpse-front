'use client';

import Image from 'next/image';
import styles from './createRoundButton.module.scss';
import {useRouter} from 'next/navigation';
export default function CreateRoundButton() {
  const router = useRouter();
  const resUrl = window.location.href;
  const eventCreateUrl = resUrl.replace(/\/my$/, '/new');
  const onClickButton = () => {
    router.push(eventCreateUrl);
  };
  return (
    <div className={styles['button-wrapper']} onClick={onClickButton}>
      <Image
        src="/assets/profile/plus.svg"
        alt="plus button"
        width={40}
        height={40}
      />
    </div>
  );
}
