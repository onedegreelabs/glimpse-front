'use client';
import Image from 'next/image';
import styles from './emptyEvent.module.scss';
import {useRouter} from 'next/navigation';
export default function EmptyEvent({pageType}: {pageType: string}) {
  const router = useRouter();
  const resUrl = window.location.href;
  const eventCreateUrl = resUrl.replace(/\/my$/, '/new');
  const onClickButton = () => {
    router.push(eventCreateUrl);
  };
  return (
    <div className={styles['empty-event-wrapper']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['img-wrapper']}>
          <Image
            src={'/assets/events/noEventImage.png'}
            alt="file-icon"
            width={168}
            height={168}
          />
        </div>
        <div className={styles['main-title']}>
          {pageType === 'my'
            ? "You don't have any events"
            : 'There are no events to discover.'}
        </div>
        <div className={styles['sub-title']}>
          {'Would you like to create one?'}
        </div>
        <div className={styles['create-button']}>
          <Image
            src={'/icons/plus2_icon.svg'}
            alt="plus-icon"
            width={20}
            height={20}
          />
          <div onClick={onClickButton} className={styles['button-text']}>
            Create Event
          </div>
        </div>
      </div>
    </div>
  );
}
