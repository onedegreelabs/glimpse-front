'use client';
import clsx from 'clsx';
import styles from './successModal.module.scss';
import {useRouter} from 'next/navigation';

interface SucessModalProps {
  handle: string;
}

export default function SuccessModal({handle}: SucessModalProps) {
  const router = useRouter();
  const resUrl = window.location.href;
  const eventUrl = resUrl.replace(/\/new$/, `/${handle}`);

  const onClickViewButton = () => {
    router.push(eventUrl);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onClickCopyUrl = () => {
    copyToClipboard(eventUrl || '');
  };

  return (
    <div className={styles['success-modal-wrapper']}>
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal-header']}>Congratulations!</div>
        <div className={styles['modal-content']}>
          <div>Your event has been successfully</div>
          <div>created and ready to share!</div>
        </div>
        <div className={styles['modal-img']}>🎉</div>
        <div className={styles['modal-bottom']}>
          <div
            className={clsx(styles['modal-button'], styles['view-type'])}
            onClick={onClickViewButton}
          >
            View Event
          </div>
          <div
            className={clsx(styles['modal-button'], styles['copy-type'])}
            onClick={onClickCopyUrl}
          >
            Copy URL
          </div>
        </div>
      </div>
    </div>
  );
}
