import Link from 'next/link';
import styles from './NotHostPage.module.scss';

export default function NotHostPage() {
  return (
    <div className={styles['container']}>
      Only the host of this event can access.
      <Link className={styles['button']} href="/events/discover">
        Go to Discover
      </Link>
    </div>
  );
}
