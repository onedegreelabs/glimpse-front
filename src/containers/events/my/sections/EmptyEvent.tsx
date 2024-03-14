import Image from 'next/image';
import styles from './emptyEvent.module.scss';

export default function EmptyEvent() {
  return (
    <div className={styles['empty-event-wrapper']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['img-wrapper']}>
          <Image
            src={'/icons/file_icon.svg'}
            alt="file-icon"
            width={168}
            height={168}
          />
        </div>
        <div className={styles['main-title']}>
          {"You don't have any events"}
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
          <div className={styles['button-text']}>Create Event</div>
        </div>
      </div>
    </div>
  );
}
