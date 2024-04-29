import Link from 'next/link';
import styles from './NotHostPage.module.scss';

export default function NotHostPage() {
  return (
    <div className={styles['container']}>
      You are not a host for this event!
      <Link className={styles['button']} href="/events/discover">
        Go to Discover
      </Link>
    </div>
  );
}
