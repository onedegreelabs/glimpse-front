import styles from './emptyUser.module.scss';
import Image from 'next/image';
export default function EmptyUser() {
  return (
    <div className={styles['empty-user-wrapper']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['img-wrapper']}>
          <Image
            src={'/assets/events/EmptyUserImg.svg'}
            alt="empty-user-img"
            width={168}
            height={168}
          />
        </div>
        <div className={styles['main-title']}>No matching results</div>
        <div className={styles['sub-title']}>expand your search.</div>
      </div>
    </div>
  );
}
