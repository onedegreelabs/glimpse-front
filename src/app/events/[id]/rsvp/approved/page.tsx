import Image from 'next/image';
import styles from './Approved.module.scss';

export default function Approved() {
  return (
    <div className={styles['guest-container']}>
      <div className={styles['title']}>
        Approved
        <p>Guest will be norified of the change of their status by email.</p>
      </div>
      <ul>
        <li>
          <div className={styles['card']}>
            <div className={styles['date']}>April 21, 4:28 PM</div>
            <div className={styles['row']}>
              <div>초이장군</div>
              <p>ahrdn2@gmail.com</p>
            </div>
            <div className={styles['button']}>
              <button className={styles['approve']}>
                <Image
                  src={'/assets/events/rsvp/approve.svg'}
                  alt="approve"
                  width={20}
                  height={20}
                />
                Approve
              </button>
            </div>
          </div>
        </li>
        <li>
          <div className={styles['card']}>
            <div className={styles['date']}>April 21, 4:28 PM</div>
            <div className={styles['row']}>
              <div>Emily Kim</div>
              <p>ahrdn2@gmail.com</p>
            </div>
            <div className={styles['button']}>
              <button className={styles['approve']}>
                <Image
                  src={'/assets/events/rsvp/approve.svg'}
                  alt="approve"
                  width={20}
                  height={20}
                />
                Approve
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
